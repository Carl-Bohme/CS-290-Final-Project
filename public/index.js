
// Array to hold all the recipes
var completeRecipeList = [];


// Function to show Expanded result when expand button is clicked
function showExpandedResult(i) {
    var expandedResults = document.getElementsByClassName('result-expanded');
    expandedResults[i].classList.remove('hidden');
    var expandButtons = document.getElementsByClassName('expand-button');
    expandButtons[i].classList.add('hidden');
    var minimizeButtons = document.getElementsByClassName('minimize-button');
    minimizeButtons[i].classList.remove('hidden');
}


// Function to hide Expanded result when minimze button is clicked
function hideExpandedResult(i) {
    var expandedResults = document.getElementsByClassName('result-expanded');
    expandedResults[i].classList.add('hidden');
    var expandButtons = document.getElementsByClassName('expand-button');
    expandButtons[i].classList.remove('hidden');
    var minimizeButtons = document.getElementsByClassName('minimize-button');
    minimizeButtons[i].classList.add('hidden');
}


// Function to Insert Recipe into Dom 
function insertRecipe(name, shortDescription, longDescription ,photoURL, time, difficulty, percent, vegetarian, vegan, id) {

    var recipeContent = {
        name: name,
        shortDescription: shortDescription,
        longDescription: longDescription,
        photoURL: photoURL,
        time: time,
        difficulty: difficulty,
        percent: percent,
        vegetarian: vegetarian,
        vegan: vegan,
        id: id
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
        insertRecipe(recipe.name, recipe.shortDescription, recipe.longDescription, recipe.photoURL, recipe.time, recipe.difficulty, recipe.percent, recipe.vegetarian, recipe.vegan, recipe.id);
    });



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
        photoURL: recipeElem.getAttribute('data-photoURL'),
        id: recipeElem.getAttribute('data-id')
    }
    
    return recipe;
}

//showExpandedResult(0);
//showExpandedResult(2);

// Event listener for button functionallity
window.addEventListener('DOMContentLoaded', function () {

    var recipes = document.getElementsByClassName('recipeResult');
    for (var i = 0; i < recipes.length; i++) {
        completeRecipeList.push(parseRecipe(recipes[i]));
    }


    // Event listiner for expand buttons
    var expandButtons = document.getElementsByClassName('expand-button');
    for (var i = 0; i < expandButtons.length; i++) {
        expandButtons[i].addEventListener('click', showExpandedResult(i));
    }
    
    // Event listiner for minimize buttons
    var minimizeButtons = document.getElementsByClassName('expand-button');
    for (var i = 0; i < minimizeButtons.length; i++) {
       minimizeButtons[i].addEventListener('click', hideExpandedResult(i));
    }


    var filterButton = document.getElementById('filter-submit-button');
    if (filterButton) {
        filterButton.addEventListener('click', filterRecipes);
    }
});