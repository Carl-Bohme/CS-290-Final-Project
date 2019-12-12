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

// Middleware function to handle viewing home page
app.get('/', function (req, res, next) {
    res.status(200).render('homePage');
});

// Middleware function to handle viewing recipe adding page
app.get('/addRecipe', function (req, res, next) {
    res.status(200).render('addRecipePage');
});

// Middleware function to handle viewing results page
app.get('/results', function (req, res, next) {
    res.status(200).render('searchResults', {
        recipes: recipeData,
        filter: filterFoods
    });
});

// Middleware function to handle viewing a recipe page
app.get('/:id', function (req, res, next) {
	var id = Math.floor(req.params.id); //Saves id entered in url rounded down if float
	if (id >= 0 && id < Object.keys(recipeData).length) {
		res.status(200).render('recipePage', recipeData[id]);
	} else {
		next();
	}
});

// Middleware function to Searching
app.post('/search', function(req, res, next){
		var new_order = [];
		for (var i = 0; i < recipeData.length; i++)
		{
			new_order.push(recipeData[i]);
		}
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



	    var search_result = bubbleSort(ingre_match, new_order);
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
		//if the user enter nothing part
    else
    {
			for (var k = 0; k < recipeData.length; k++)
			{
				recipeData[k].percent = 0;
			}
    	res.status(200).render('searchResults', {
	   	recipes: recipeData,
	    filter: filterFoods
        	})
    }

});

app.post('/addRecipeToFile', function(req, res, next){

	var JSONItems = [];
	JSONItems = JSON.parse(fs.readFileSync('recipeData.json'));

	ingredientsString = req.body.recipeIngredients;
	ingredientsArray = ingredientsString.split(",");

	instructionsString = req.body.recipeInstructions;
	instructionsArray = instructionsString.split(",");


	console.log("recipeDiet: " + req.body.recipeDietVegan);
	console.log("recipeDiet: " + req.body.recipeDietVegetarian);
	var vegan = "false";
	if(req.body.recipeDietVegan == "Vegan"){
		vegan = "true"
	}
	var vegetarian = "false";
	if(req.body.recipeDietVegetarian == "Vegetarian"){
		vegetarian = "true"
	}

	var newRecipeData = {
		"name": req.body.recipeName,
		"photoURL": req.body.recipePhotoURL,
		"shortDescription": req.body.recipeShortDescription,
		"longDescription": req.body.recipelongDescription,
		"ingredients": ingredientsArray,
		"instructions": instructionsArray,
		"comments": [],
		"rating": "",
		"percent": "",
		"time": req.body.recipeTime,
		"difficulty": req.body.recipeDifficulty,
		"vegetarian": vegetarian,
		"vegan": vegan,
		"id": JSONItems.length
	};

	JSONItems.push(newRecipeData);

	var allRecipeData = JSON.stringify(JSONItems);
	console.log(JSONItems);
	

	fs.writeFile('recipeData.json', allRecipeData, (err) => {
		if (err) throw err;
		console.log('Data written to file');
	});

	//Reloads json file
	//recipeData[recipeData.length[newRecipeData]];

	//Sends User back to home page
	res.status(200).render('homePage');
});

app.post('/addComment/:id', function(req, res, next){
	var id = Math.floor(req.params.id);

	if(req.body.commentInput != ""){
		var JSONItems = [];
		JSONItems = JSON.parse(fs.readFileSync('recipeData.json'));

		JSONItems[id].comments[JSONItems[id].comments.length] = req.body.commentInput;
		
		var allRecipeData = JSON.stringify(JSONItems);

		fs.writeFile('recipeData.json', allRecipeData, (err) => {
			if (err) throw err;
			console.log('Data written to file');
		});
	}
	//Sends User back to home page
	res.status(200).render('recipePage', recipeData[id]);
});

// Middleware function to handle requests not dealt with above
app.get('*', function (req, res) {
    res.status(404).render('404');
});

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});
