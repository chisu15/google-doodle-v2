const mongoose = require('mongoose')
const AutoSlug = require('../middlewares/slugify')
const doodleSchema = new mongoose.Schema({
    title: {
        type: String,
        require
    },
    image: {
        type: String,
        require
    },
    description: String,
    likes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    doodle_category_id: [{
        type: String,
        default: ""
    }],
    uploadBy: {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        updatedAt: Date
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    }
}, {
    timestamps: true
})
AutoSlug('save',doodleSchema);
AutoSlug('updateOne', doodleSchema);


const Doodle = mongoose.model('doodle', doodleSchema)

module.exports = Doodle;