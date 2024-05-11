const Category = require('../models/doodle-category.model');
const generate = require('../helpers/generate');

// [GET] VIEW
module.exports.index = async (req, res) => {
    try {
        const category = await Category.find();
        // console.log(req.body); 
        // res.send(req.body);
        res.status(200).json(category);
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
        const category = await Category.findById(id);
        res.status(200).json(category);
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
        const cate = new Category ({
            ...req.body
        })
        await cate.save();
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
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                message: `Không tìm thấy Category với ID: ${id}`
            });
        }
        category.title = req.body.title;
        category.description = req.body.description;
        await category.save()
        
        res.json({
            code: 200,
            message: "Cập nhật thành công!",
            data: Category
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
            const category = await Category.findById(id);
            if (!Category) {
                return res.status(404).json({
                    message: `Không tìm thấy Category với ID: ${id}`
                });
            }

            return Category.findByIdAndUpdate(id, {
                ...req.body,
                information: information[index]
            }, {
                new: true
            });
        });


        const updatedCategorys = await Promise.all(updatePromises);

        res.json({
            code: 200,
            message: "Cập nhật thành công!",
            data: updatedCategorys
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
        const category = await Category.findById(id);
        console.log(Category, "id: ", id);

        const deletedCategory = await category.deleteOne();
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
