const Doodle = require('../models/doodle.model');
const fs = require('fs');
const multer = require('multer');
const generate = require('../helpers/generate');

const cloudinary = require('cloudinary');
require('dotenv').config();
const {
    resolve
} = require('path');
const path = require('path');

const {
    log
} = require('console');


cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});

// [GET] VIEW
module.exports.index = async (req, res) => {
    try {
        const doodles = await Doodle.find();
        // console.log(req.body); 
        // res.send(req.body);
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
        console.log(1);
        if (!req.file) {
            return res.status(400).json({
                code: 400,
                message: "Vui lòng chọn một tệp hình ảnh"
            });
        }
        console.log(__dirname);
        // const imagePath = path.join(__dirname, "../tmp/", req.file.filename);       
        const imagePath = path.join("/tmp/", req.file.filename);
        const readStream = fs.createReadStream(imagePath);
        console.log("Path: ", imagePath);
        const checkDoodle = await Doodle.findOne({
            title: req.body.title
        });
        if (checkDoodle) {
            await fs.promises.unlink(imagePath);
            console.log('File deleted successfully');
            return res.status(400).json({
                code: 400,
                message: "Tên doodle đã tồn tại!"
            });
        } else {
            const result = await new Promise((resolve, reject) => {
                readStream.pipe(cloudinary.v2.uploader.upload_stream((error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }));
            });
            const imageUrl = await result.secure_url;
            console.log(imageUrl);
            const doodle = new Doodle({
                ...req.body,
                image: imageUrl,
                public_id: result.public_id,
            });
            await doodle.save();
            res.json({
                code: 200,
                message: "Tạo thành công!"
            })
            await fs.promises.unlink(imagePath);
            console.log('File deleted successfully');
        }
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
        const doodle = await Doodle.findById(id);
        if (!doodle) {
            return res.status(404).json({
                message: `Không tìm thấy doodle với ID: ${id}`
            });
        }
        if (req.file) {
            // const imagePath = path.join(__dirname, "../tmp/", req.file.filename);
            const imagePath = path.join("/tmp/", req.file.filename);
            await cloudinary.v2.uploader.destroy(doodle.public_id);
            const result = await cloudinary.v2.uploader.upload(imagePath);
            const imageUrl = result.secure_url;
            // Cập nhật thông tin của doodle
            const updatedDoodle = await Doodle.findByIdAndUpdate(id, {
                ...req.body,
                image: imageUrl,
                public_id: result.public_id,
            }, {
                new: true
            });
            await fs.promises.unlink(imagePath);
            console.log('File deleted successfully');
        } else {
            // Cập nhật thông tin của doodle
            const updatedDoodle = await Doodle.findByIdAndUpdate(id, {
                ...req.body
            }, {
                new: true
            });
        }
        res.json({
            code: 200,
            message: "Cập nhật thành công!",
            data: doodle
        });
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: "Cập nhật thất bại!",
            error: error.message
        });
    }
};

// [PATCH] MULTI CHANGE
module.exports.multiChange = async (req, res) => {
    try {
        const ids = req.body.ids;
        const { information } = req.body;

        const updatePromises = ids.map(async (id, index) => {
            const doodle = await Doodle.findById(id);
            if (!doodle) {
                return res.status(404).json({
                    message: `Không tìm thấy doodle với ID: ${id}`
                });
            }

            return Doodle.findByIdAndUpdate(id, {
                ...req.body,
                information: information[index]
            }, {
                new: true
            });
        });


        const updatedDoodles = await Promise.all(updatePromises);

        res.json({
            code: 200,
            message: "Cập nhật thành công!",
            data: updatedDoodles
        });
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: "Cập nhật thất bại!",
            error: error.message
        });
    }
}

// [DELETE] DELETE
module.exports.delete = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const doodle = await Doodle.findById(id);
        console.log(doodle, "id: ", id);
        const result = await cloudinary.v2.uploader.destroy(doodle.public_id);
        console.log("Delete on cloud success!");
        const deletedDoodle = await doodle.deleteOne();
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
// [GET]POPULAR
module.exports.popular = async (req, res) => {
    try {
        const doodleList = await Doodle.aggregate([{
                $sort: {
                    views: -1
                },
            },
            {
                $limit: 12,
            },
        ]);
        res.status(200).json(doodleList);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: error.message,
        });
    }
};

// [GET]NEWEST
module.exports.newest = async (req, res) => {
    try {
        const doodleList = await Doodle.find().sort({
            createdAt: -1
        });
        console.log(doodleList);
        res.json(doodleList);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: error.message,
        });
    }
};

// [GET]SPECIAL
module.exports.special = async (req, res) => {
    try {
        const currentDate = new Date(Date.now());
        const currentMonth = (currentDate.getMonth() + 1).toString();
        const doodleList = await Doodle.aggregate([{
                $unwind: '$doodle_category_id',
            },
            {
                $match: {
                    doodle_category_id: currentMonth,
                },
            },
            {
                $limit: 6,
            },
        ]);
        res.status(200).json(doodleList);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};