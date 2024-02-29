const express = require("express");
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
