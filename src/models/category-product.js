const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug);

const categorySchema = new mongoose.Schema({
    name: String,
    slug: { type: String, slug: "name" },
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
