// ==UserScript==
// @name         MyAnimeList(MAL) - Move Favorites
// @version      1.2.7
// @description  Show your favorites in the left panel again.
// @author       Cpt_mathix
// @include      *://myanimelist.net/profile*
// @exclude      *://myanimelist.net/profile/*/reviews
// @exclude      *://myanimelist.net/profile/*/recommendations
// @exclude      *://myanimelist.net/profile/*/clubs
// @exclude      *://myanimelist.net/profile/*/friends
// @grant        none
// @namespace https://greasyfork.org/users/16080
// ==/UserScript==

var class1 = document.getElementsByClassName('content-container');
for (var i = 0; i < class1.length; i++) {
    class1[i].classList.add('movedFavorites');
}

var class2 = document.getElementsByClassName('mb12');
for (var i = 0; i < class2.length; i++) {
    class2[i].classList.add('movedFavorites');
}

var containerRight = document.getElementsByClassName('container-right');
for (var i = 0; i < containerRight.length; i++) {
    containerRight[i].style.width = "800px";
}

// delete favorites header
var header = document.getElementsByClassName("mb12 movedFavorites");
for(var i = 0; i < header.length; i++) {
    if (header[i].innerHTML.indexOf("avorites") > -1) {
        header[i].style.display = 'none';
        break;
    }
}

// get favorites container (you also need to move favoritesOuter, otherwise images will not load)
var favoritesOuter = document.getElementsByClassName('user-favorites-outer js-truncate-outer')[0];
var favoritesInner = document.getElementsByClassName('user-favorites js-truncate-inner')[0];


// get info from favorites container
var favorites = favoritesInner.childNodes;
// console.log(favorites) => use this to see which containers in the array you need (#text is not needed)
var favAnime = favorites[1];
var favManga = favorites[3];
var favChar = favorites[5];
var favPerson = favorites[7];

// add hover information
var images = favoritesInner.getElementsByClassName('image');
for(var l = 0; l < images.length; l++) {
    var href = images[l].href;
    images[l].title = decodeURIComponent(href.substr(href.lastIndexOf('/') + 1).replace(/_/g," "));
}

// create Panels, we will put these in the left panel of our profile.
favoritesInner.innerHTML = "";
favoritesInner.className = favoritesInner.className.replace("mb24","");
var animePanel = favoritesInner.cloneNode(true);
animePanel.appendChild(favAnime);
var mangaPanel = favoritesInner.cloneNode(true);
mangaPanel.appendChild(favManga);
var charPanel = favoritesInner.cloneNode(true);
charPanel.appendChild(favChar);
var personPanel = favoritesInner.cloneNode(true);
personPanel.appendChild(favPerson);

// change maximum height of favoritesOuter
favoritesOuter.setAttribute("style", "max-height: 10000px;");
favoritesOuter.innerHTML = "";

// add created pannels to the main container favoritesOuter
favoritesOuter.appendChild(animePanel);
favoritesOuter.appendChild(mangaPanel);
favoritesOuter.appendChild(charPanel);
favoritesOuter.appendChild(personPanel);

// get leftPanel
var leftPanel = document.getElementsByClassName('user-profile')[0];

// get Also Available At (favorites will be inserted before "Also Available At")
var available = leftPanel.getElementsByTagName('h4');
for(var j = 0; j < available.length; j++) {
    if (available[j].outerHTML.indexOf("Available") > -1) {            // display above Available At
  //if (available[j].outerHTML.indexOf("Friends") > -1) {              // display above Friends
  //if (available[j].outerHTML.indexOf("RSS") > -1) {                  // display above RSS
        available = available[j];
        break;
    }
}
// if no Available at is present on the pofile, display above RSS
if( Object.prototype.toString.call(available) === '[object HTMLCollection]' ) {
    for(var j = 0; j < available.length; j++) {
        if (available[j].outerHTML.indexOf("RSS") > -1) {                  // display above RSS
            available = available[j];
            break;
        }
    }
}

// small visual change
var favTitles = favoritesOuter.getElementsByTagName('h5');
while(favTitles.length !== 0) {
    favTitles[0].innerHTML = "Favorite " + favTitles[0].innerHTML;
    favTitles[0].outerHTML = favTitles[0].outerHTML.replace(/h5/g,"h4").replace("mr8","");
}

// add favoritesOuter to the leftPannel
leftPanel.insertBefore(favoritesOuter, available);

// finished!!