var express = require("express");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");
var logger = require("morgan");
var routes = require("./controllers/articlesController")
var path = require("path");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// These are used for scraping
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 8080;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));


// connect to mongo database
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
});


// scraping from npr.org
axios.get('https://www.npr.org').then(function (content) {
    var $ = cheerio.load(content.data);
    $('.story-text').each(function (i, element) {
        var result = {};
        result.headline = $(element).find('a').find('h3.title').text();
        result.summary = $(element).find(':last-child').find('p').text();
        result.link = $(element).find(':nth-child(3n)').attr('href');
        if (result.link != undefined) {
            db.article.create(result)
                .then(function (article) {
                    
                })
                .catch(function (err) {
                    throw err;
                })
        }
    });
});

app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.article.find({})
      .then(function(articles) {
        // If we were able to successfully find Articles, send them back to the client
        console.log(articles)
        res.json(articles);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

// Import routes and give the server access to them
// app.use(routes);

app.get("/comment", function(req, res) {

    res.sendFile(path.join(__dirname, "public/comment.html"));
  });

// Start the server
app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
})