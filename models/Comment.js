const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: {
        type: String,
        maxlength: 300
    }
});

var article = mongoose.model("comment", commentSchema);

module.exports = article;