var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var recipeData = require('./recipeData');
var filterFoods = require('./views/partials/filterFoods');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function (req, res, next) {
    res.status(200).render('homePage');
});

app.get('/addRecipe', function (req, res, next) {
    res.status(200).render('addRecipePage');
});

app.get('/results', function (req, res, next) {
    res.status(200).render('searchResults', {
        recipes: recipeData,
        filter: filterFoods
    });
});

app.get('*', function (req, res) {
    res.status(404).render('404');
});

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});