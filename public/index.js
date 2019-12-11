
// Function to show Expanded result when expand button is clicked
function showExpandedResult() {
    var showExpandedResult = document.getElementById('result-expanded');
    showExpandedResult.classList.remove('hidden');
    var expandButton = document.getElementById('expand-button');
    expandButton.classList.add('hidden');
}

// Function to hide Expanded result when minimze button is clicked
function hideExpandedResult() {
    var hideExpandedResult = document.getElementById('result-expanded');
    hideExpandedResult.classList.add('hidden');
    var expandButton = document.getElementById('expand-button');
    expandButton.classList.remove('hidden');
}


// Event listener for button functionallity
window.addEventListener('DOMContentLoaded', function () {

    var expandButton = document.getElementById('expand-button');
    if (expandButton) {
        expandButton.addEventListener('click', showExpandedResult);
    }

    var minimizeButton = document.getElementById('minimize-button');
    if (minimizeButton) {
        minimizeButton.addEventListener('click', hideExpandedResult);
    }
});