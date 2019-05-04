// ==UserScript==
// @name       IMDB Score Hider
// @author     Assil Ksiksi
// @namespace  http://assil.me
// @version    0.3
// @description  Hides all TV and movie scores from IMDB.
// @match      http://www.imdb.com/title/*
// @copyright  2012+, Assil Ksiksi
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

// If movie title area is clicked, toggle ratings manually
$('div.titleBar').click(function() {
    toggleRatings();
});

function toggleRatings()
{
    // Hide main IMDB rating for current title
    $('div.imdbRating').toggle();
    $('.star-box-details').toggle();
    
    // Hide Metacritic score below the main rating
    $('div.metacriticScore').toggle();
    
    // Hide ratings for related title
    $('span.rating-imdb').toggle();
    $('span.rating-rating').toggle();

    // Hide rating in siderbar sharing widget
    $('div#ratingWidget').toggle();
}

// Hide all ratings on page load
toggleRatings();