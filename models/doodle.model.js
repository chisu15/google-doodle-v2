const mongoose = require('mongoose')
const slugify = require('slugify')
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
    timeStart: Date,
    timeEnd: Date,
    slug: {
        type: String,
        slug: "title",
        unique: true
    }
}, {
    timestamps: true
})
doodleSchema.pre('save', function (next) {
    let title = this.title;
    if (title && typeof title === 'string') {
        this.slug = slugify(title, {
            lower: true
        })
        next();
    }
})
doodleSchema.pre('updateOne', function (next) {
    let title = this._update.title;
    if (title && typeof title === 'string') {
        this._update.$set.slug = slugify(title, {
            lower: true
        });
        next();
    }
})

const Doodle = mongoose.model('doodle', doodleSchema)

module.exports = Doodle;