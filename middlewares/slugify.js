const slugify = require('slugify')

function AutoSlug(syntax, schema){
    schema.pre(syntax, function (next){
        let title = this.title;
        if (syntax == "updateOne")
        {
            title = this._update.title;
            this._update.$set.slug = slugify(title, { lower: true });
        }
        this.slug = slugify(title, {
            lower: true
        })
        next();
    })
    
}
module.exports = AutoSlug;