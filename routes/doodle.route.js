const express = require('express');
const router = express.Router();
const Doodle = require('../models/doodle.model');

router.post('/', async (req, res) => {
    try {
        const doodles = await Doodle.create(req.body);
        // console.log(req.body); 
        // res.send(req.body);
        res.status(200).json(doodles);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
router.get('/', async (req, res) => {
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
});
router.get('/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const doodles = await Doodle.findById(id);
        // console.log(req.body); 
        // res.send(req.body);
        res.status(200).json(doodles);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
router.patch('/edit/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const doodles = await Doodle.findByIdAndUpdate(id, {
            ...req.body,
            updatedAt: new Date()
        }, {
            new: true
        });
        // console.log(req.body); 
        // res.send(req.body);
        if (!doodles) {
            return res.status(404).json({
                message: `Cannot find any doodle with ID: ${id}`
            })
        }
        const updatedDoodle = await Doodle.findById(id);
        res.status(200).json(updatedDoodle);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const doodles = await Doodle.findByIdAndDelete(id);
        // console.log(req.body); 
        // res.send(req.body);
        const updatedDoodleList = await Doodle.find();
        res.status(200).json(updatedDoodle);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
module.exports = router