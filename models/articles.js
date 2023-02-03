const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');

const { JSDOM } = require('jsdom');

const dompurify = createDomPurify( new JSDOM().window);

const articleSchema = new mongoose.Schema({
    title :{
        type: String,
        required: true
    },
    wisdom: {
        type: String
    },
    weight: {
        type: Number,
        required: true
    },
    exercise: {
        type: String
    },
    stomach: {
        type: String
    },
    breakfast: {
        type: String
    },
    lunch: {
        type: String
    },
    dinner: {
        type: String
    },
    snacks: {
        type: String
    },
    fruit: {
        type: String
    },
    drinks: {
        type: String
    },
    booze: {
        type: String
    },
    reviewed: {
        type: Boolean
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

articleSchema.pre('validate', function(next) {
        if (this.title)
        {
            this.slug = slugify(this.title, {lower: true, strict: true})
        }

        if(this.markdown) {
            this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown))
        }

        next();
});

module.exports = mongoose.model('Article', articleSchema);