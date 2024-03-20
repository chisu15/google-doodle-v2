const Doodle = require('../models/doodle.model');
const {S3Client,
    PutObjectCommand,
    CreateBucketCommand,
    DeleteObjectCommand,
    DeleteBucketCommand,
    paginateListObjectsV2,
    GetObjectCommand
} = require('@aws-sdk/client-s3');
const {
    access
} = require('fs');
const multer = require('multer');
const generate = require('../helpers/generate');
const {
    getSignedUrl
} = require('@aws-sdk/s3-request-presigner');

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
});

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
})

// [GET] VIEW
module.exports.index = async (req, res) => {
    try {
        const doodles = await Doodle.find();
        // console.log(req.body); 
        // res.send(req.body);
        const getParams = {
            Bucket: bucketName,
            Key: '27. 05-12.png',
        }
        const commandGet = new GetObjectCommand(getParams);
        const url = await getSignedUrl(s3, commandGet, {
            expiresIn: 60
        })
        console.log(url);
        res.status(200).json(doodles);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
// [GET] DETAIL
module.exports.detail = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const doodle = await Doodle.findById(id);
        res.status(200).json(doodle);
    } catch (error) {
        res.json({
            code: 400,
            message: error.message
        });
    }
}
// [POST] CREATE
module.exports.create = async (req, res) => {
    try {
        // UPLOAD IMAGE TO AWS S3
        const imageName = generate.generateRandomString(32);
        const paramsSend = {
            Bucket: bucketName,
            Key: imageName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        }
        const commandPut = new PutObjectCommand(paramsSend);
        await s3.send(commandPut);

        // GET IMAGE FROM AWS S3
        const getParams = {
            Bucket: bucketName,
            Key: imageName,
        }
        const commandGet = new GetObjectCommand(getParams);
        const url = await getSignedUrl(s3, commandGet, {
            expiresIn: 60
        })

        const doodle = new Doodle({
            ...req.body,
            image: url
        });
        await doodle.save();
        res.json({
            code: 200,
            message: "Tạo thành công!"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Tạo sản phẩm thất bại",
            error: error.message
        })

    }
}
// [PATCH] EDIT
module.exports.edit = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const doodle = await Doodle.updateOne({
            _id: id
        }, req.body, {
            new: true
        });
        if (!doodle) {
            return res.status(404).json({
                message: `Cannot find any doodle with ID: ${id}`
            })
        }
        res.json({
            code: 200,
            message: "Cập nhật thành công!"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Cập nhật thất bại!",
            error: error.message
        })
    }
}
// [DELETE] DELETE
module.exports.delete = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const doodle = await Doodle.findByIdAndDelete(id);
        res.json({
            code: 200,
            message: "Xóa thành công!"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Xóa thất bại!"
        })
    }

}