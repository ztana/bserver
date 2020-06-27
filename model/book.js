const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    description: String,
    link: String,
    imageCount: String
});

module.exports = mongoose.model('Book', bookSchema);
