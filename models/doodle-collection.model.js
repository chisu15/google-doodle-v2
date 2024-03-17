const mongoose = require('mongoose')

const doodleCollectionSchema = mongoose.Schema({
    title: String,
    description: String,
    views: Number,
    doodles: [{
        doodle_id: mongoose.Schema.Types.ObjectId
    }],    
    slug: {
        type: String,
        slug: "title",
        unique: true
    }
},{
    timestamps: true
})
doodleCollectionSchema.pre('save', function (next) {
    let title = this.title;
    if (title && typeof title === 'string') {
        this.slug = slugify(title, {
            lower: true
        })
        next();
    }
})
doodleCollectionSchema.pre('updateOne', function (next) {
    let title = this._update.title;
    if (title && typeof title === 'string') {
        this._update.$set.slug = slugify(title, {
            lower: true
        });
        next();
    }
})
const doodleCollection = mongoose.model("doodle-collection", doodleCollectionSchema);
module.exports = doodleCollection;