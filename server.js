var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var fs = require('fs');
var recipeData = require('./recipeData');
var filterFoods = require('./views/partials/filterFoods');


var app = express();

var port = process.env.PORT || 3000;

var search_button_event = false;

function get_percentage(a1, a2)
{
	var match = 0;
	console.log("a1: " + a1);
	console.log	("a2: " + a2);
	/*for (var i = 0; i < a1.length; i++)
	{
		for (var j = 0; j < a2.length; i++)
		{
			if (a1[i].toLowerCase().includes(a2[j].toLowerCase()))
			{
				match += 1;
			}
		}
	}
	*/
	return (match/a2.length)*100;
}

function bubbleSort(arr1, arr2){
   var len = arr1.length;
   for (var i = len-1; i>=0; i--){
     for(var j = 1; j<=i; j++){
       if(arr1[j-1]<arr1[j]){
           var temp1 = arr1[j-1];
           arr1[j-1] = arr1[j];
           arr1[j] = temp1;

           var temp2 = arr2[j-1];
           arr2[j-1] = arr2[j];
           arr2[j] = temp2;
        }
     }
   }
   return arr2;
}


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
    //var search_result = [];
    var sub = text_input.split(" ");
    var ingre_match = [];
    var match = 0;
    //var result_added = false;
    if (sub.length != 0 && text_input != ""){
        //filter text

        for (var i = 0; i < recipeData.length; i++) {
        	match = 0;
        	for (var x = 0; x < sub.length; x++)
			{
				console.log(match);
				for (var j = 0; j < recipeData[i].ingredients.length; j++)
				{
					console.log("sub[x]:" + sub[x]);
					console.log("recipeData[i].ingredients[j]: " + recipeData[i].ingredients[j]);
					if (recipeData[i].ingredients[j].toLowerCase().includes(sub[x].toLowerCase()))
					{
						match += 1;
					}
				}
			}

            ingre_match.push((parseFloat(match) / parseFloat(recipeData[i].ingredients.length) * 100));
        }



	    var search_result = bubbleSort(ingre_match, recipeData);
	    console.log("Sorted result is: " + ingre_match);

			for (var k = 0; k < search_result.length; k++)
			{
				search_result[k].percent = ingre_match[k];
			}

	    res.status(200).render('searchResults', {
	    	recipes: search_result,
	      filter: filterFoods
      })
    }
    else
    {
    	res.status(200).render('searchResults', {
	   	recipes: recipeData,
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
