
// Array to hold all the recipes
var completeRecipeList = [];


// Function to show Expanded result when expand button is clicked
function showExpandedResult() {
    var showExpandedResult = document.getElementById('result-expanded');
    showExpandedResult.classList.remove('hidden');
    var expandButton = document.getElementById('expand-button');
    expandButton.classList.add('hidden');
    var expandButton = document.getElementById('minimize-button');
    expandButton.classList.remove('hidden');
}


// Function to hide Expanded result when minimze button is clicked
function hideExpandedResult() {
    var hideExpandedResult = document.getElementById('result-expanded');
    hideExpandedResult.classList.add('hidden');
    var expandButton = document.getElementById('expand-button');
    expandButton.classList.remove('hidden');
    var expandButton = document.getElementById('minimize-button');
    expandButton.classList.add('hidden');
}


// Function to Insert Recipe into Dom 
function insertRecipe(name, shortDescription, longDescription ,photoURL, time, difficulty, percent, vegetarian, vegan) {

    var recipeContent = {
        name: name,
        shortDescription: shortDescription,
        longDescription: longDescription,
        photoURL: photoURL,
        time: time,
        difficulty: difficulty,
        percent: percent,
        vegetarian: vegetarian,
        vegan: vegan
      };


    //Insterts recipe html into DOM using template
    var recipeHTML = Handlebars.templates.recipeResult(recipeContent);
    var recipeContainer = document.getElementById('results');
    recipeContainer.insertAdjacentHTML('beforeend', recipeHTML);

}


// Function to filter recipes based on filter input
function filterRecipes() {

    var recipeContainer = document.getElementById('results');
    var recipes = document.getElementsByClassName('recipeResult');

    // Remove all recipes currently in the dom
    while(recipeContainer.lastChild) {
        recipeContainer.removeChild(recipeContainer.lastChild);
    }

    // Add all original recipes back to the dom
    completeRecipeList.forEach(function (recipe) {
        insertRecipe(recipe.name, recipe.shortDescription, recipe.longDescription, recipe.photoURL, recipe.time, recipe.difficulty, recipe.percent, recipe.vegetarian, recipe.vegan);
    });


    console.log("completeRecipeList.length:" + completeRecipeList.length);

    // Time Filtering
    if(!document.getElementById('filter-time-short').checked){
        for(var i = 0; i < recipes.length; i++){
            if(recipes[i].getAttribute('data-time') == "Short"){
                recipeContainer.removeChild(recipes[i]);
                i--;
            }
        }
    }
    if(!document.getElementById('filter-time-medium').checked){
        for(var i = 0; i < recipes.length; i++){
            if(recipes[i].getAttribute('data-time') == "Medium"){
                recipeContainer.removeChild(recipes[i]);
                i--;
            }
        }
    }
    if(!document.getElementById('filter-time-long').checked){
        for(var i = 0; i < recipes.length; i++){
            if(recipes[i].getAttribute('data-time') == "Long"){
                recipeContainer.removeChild(recipes[i]);
                i--;
            }
        }
    }

    // Difficulty Filtering
    if(!document.getElementById('filter-difficulty-easy').checked){
        for(var i = 0; i < recipes.length; i++){
            if(recipes[i].getAttribute('data-difficulty') == "Easy"){
                recipeContainer.removeChild(recipes[i]);
                i--;
            }
        }
    }
    if(!document.getElementById('filter-difficulty-moderate').checked){
        for(var i = 0; i < recipes.length; i++){
            if(recipes[i].getAttribute('data-difficulty') == "Moderate"){
                recipeContainer.removeChild(recipes[i]);
                i--;
            }
        }
    }
    if(!document.getElementById('filter-difficulty-hard').checked){
        for(var i = 0; i < recipes.length; i++){
            if(recipes[i].getAttribute('data-difficulty') == "Hard"){
                recipeContainer.removeChild(recipes[i]);
                i--;
            }
        }
    }


    console.log(document.getElementById('filter-diet').value);
    // Dietary Filtering
    if(document.getElementById('filter-diet').value != ""){
 
        if(document.getElementById('filter-diet').value == "Vegan"){
            for(var i = 0; i < recipes.length; i++){
                if(recipes[i].getAttribute('data-vegan') == "false"){
                    recipeContainer.removeChild(recipes[i]);
                    i--;
                }
            }
        }

        if(document.getElementById('filter-diet').value == "Vegetarian"){
            for(var i = 0; i < recipes.length; i++){
                if(recipes[i].getAttribute('data-vegetarian') == "false"){
                    recipeContainer.removeChild(recipes[i]);
                    i--;
                }
            }
        }
    }

}

// Function to parse recipe
function parseRecipe(recipeElem){
    var recipe = {
        name: recipeElem.getAttribute('data-name'),
        shortDescription: recipeElem.getAttribute('data-short-description'),
        longDescription: recipeElem.getAttribute('data-long-description'),
        time: recipeElem.getAttribute('data-time'),
        difficulty: recipeElem.getAttribute('data-difficulty'),
        vegetarian: recipeElem.getAttribute('data-vegetarian'),
        vegan: recipeElem.getAttribute('data-vegan'),
        percent: recipeElem.getAttribute('data-percent'),
        photoURL: recipeElem.getAttribute('data-photoURL')
    }
    
    return recipe;
}


// Event listener for button functionallity
window.addEventListener('DOMContentLoaded', function () {

    var recipes = document.getElementsByClassName('recipeResult');
    for (var i = 0; i < recipes.length; i++) {
        completeRecipeList.push(parseRecipe(recipes[i]));
    }
    console.log("completeRecipeList.length:" + completeRecipeList.length);

    var expandButton = document.getElementById('expand-button');
    if (expandButton) {
        expandButton.addEventListener('click', showExpandedResult);
    }

    var minimizeButton = document.getElementById('minimize-button');
    if (minimizeButton) {
        minimizeButton.addEventListener('click', hideExpandedResult);
    }

    var filterButton = document.getElementById('filter-submit-button');
    if (filterButton) {
        filterButton.addEventListener('click', filterRecipes);
    }
});