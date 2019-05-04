// ==UserScript==
// @name        Remove Watched Shows From Trakt Calendar v2
// @namespace   Christopher Greulich
// @description Remove Specials from the Trakt Calendar
// @include     http://trakt.tv/calendars/*
// @version     1
// ==/UserScript==   
document.addEventListener('DOMAttrModified', function() { 
var count = 0; 
var listOfStrongs = document.getElementsByClassName('watch selected');
for (var i = 0; i < listOfStrongs.length; i++) {
      listOfStrongs[i].parentNode.parentNode.parentNode.style.display = 'none';
}

//counts the numbers of shows and adjusts the number airing
var listOfGridItems = document.getElementsByClassName('grid-item');
  for (var i = 0; i < listOfGridItems.length; i++) {
    if(listOfGridItems[i].style.display != 'none'){++count;}
    
  }
    var listOfh2 = document.querySelectorAll('h2 strong');
    listOfh2[0].innerHTML = count;

}, false);