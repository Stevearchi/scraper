var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    headline: {
        type: String,
        unique: 'Must be a unique article' 
    },
    summary: {
        type: String
    },
    link: {
        type: String
    }
});

var article = mongoose.model("article", articleSchema);

module.exports = article;