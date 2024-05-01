const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug);

const topicSchema = new mongoose.Schema({
    name: String,
    slug: { type: String, slug: "name" },
});

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;
