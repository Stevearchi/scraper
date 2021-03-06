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
    },
    // This allows us to populate the Article with an associated Note
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "comment"
    }]
});

var article = mongoose.model("article", articleSchema);

module.exports = article;