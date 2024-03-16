const mongoose = require('mongoose')

const doodleCategorySchema = new mongoose.Schema({
    title: String,
    description: String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    }
},{
    timestamps: true
})

doodleCategorySchema.pre('save', function (next) {
    let title = this.title;
    if (title && typeof title === 'string') {
        this.slug = slugify(title, {
            lower: true
        })
        next();
    }
})
doodleCategorySchema.pre('updateOne', function (next) {
    let title = this._update.title;
    if (title && typeof title === 'string') {
        this._update.$set.slug = slugify(title, {
            lower: true
        });
        next();
    }
})

const doodleCategory = mongoose.model("doodle-category", doodleCategorySchema);
module.exports = doodleCategory;