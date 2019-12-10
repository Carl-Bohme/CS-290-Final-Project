var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var recipeData = require('./recipeData');
var filterFoods = require('./views/partials/filterFoods');


var app = express();

var port = process.env.PORT || 3000;

var search_button_event = false;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

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

app.post('/search', function(req, res, next){
    console.log("Advance Search Button Pressed");
    var text_input = req.body.searchText;
    console.log("Your input is: " + text_input);
    console.log(recipeData.length);
    var search_result = [];
    var sub = text_input.split(" ");
    var result_added = false;
    if (sub.length != 0){
        //filter text
        
          for (var i = 0; i < recipeData.length; i++) {
            result_added = false;
            for (var j = 0; j < recipeData[i].ingredients.length; j++){
                console.log(recipeData[i].ingredients[j]);
                if (result_added == true){
                    break;
                }

                for (var x = 0; x < sub.length; x++)
                {
                    if (!recipeData[i].ingredients[j].toLowerCase().includes(sub[x].toLowerCase())){
                     //do nothing   
                    }
                    else{
                        console.log("Found data: " + recipeData[i]);
                        search_result.push(recipeData[i]);
                        result_added = true;
                        break;
                    }
                } 
            }
 
          }

    }
    
    if (search_result.length == 0){
        res.status(404).render('404');
    }
    else{ 
        res.status(200).render('searchResults', {
            recipes: search_result,
            filter: filterFoods
        })
    }

});

app.get('*', function (req, res) {
    res.status(404).render('404');
});

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});

