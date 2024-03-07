const express = require('express');
const Doodle = require('../models/doodle.model');
const moment = require('moment')
// VIEW
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
// DETAIL
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
// CREATE
module.exports.create = async (req, res) => {
    try {
        const doodle = new Doodle(req.body);
        const data = await doodle.save();
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
// EDIT
module.exports.edit = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const doodle = await Doodle.updateOne({_id: id}, req.body, {
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
// DELETE
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