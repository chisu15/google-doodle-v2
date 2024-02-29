const mongoose = require('mongoose')

const doodleSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    likes: {
        type: BigInt,
        default: 0
    },
    views: {
        type: BigInt,
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
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    updatedBy: {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
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

const Doodle = mongoose.model('doodle', doodleSchema)

module.exports = Doodle;