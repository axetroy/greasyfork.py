// ==UserScript==
// @name            Danbooru : Misc Edition
// @namespace       danbooru
// @version         1.0.9
// @description     Add some elements
// @icon            https://i.imgur.com/88HP9ik.png
// @include         http://danbooru.donmai.us*
// @include         https://danbooru.donmai.us*
// @grant           none
// ==/UserScript==

// Danbooru Trigger Header Menu Button : Add a button (with the danbooru logo) in header that will open the menu once clicked
var navigation = document.getElementById('nav');
var trigger = document.createElement('button');
trigger.id = 'trigger-btn';
var text_trigger = document.createTextNode('MENU');
trigger.appendChild(text_trigger);
navigation.appendChild(trigger);
var value = false;
trigger.onclick = function() {
    if(value == false) {
       value = true;
       navigation.style.left = '0px';
    }
    else if(value == true) {
       value = false;
       navigation.style.left = '-200px';
    }
};

// Danbooru Listing Bigger Thumbnails : Make the Scroll Thumbnails Bigger (Listing/Favorites/Pools/Etc pages), Add the dimensions of the original illustration, Change the colors of the default borders for the illustration who have children/parent/etc 
var thumbnail = document.getElementsByClassName('post-preview');
var thumbnail_comment = document.getElementsByClassName('preview');
for(var i=0; i < thumbnail.length; i++) {
    var bookmark = thumbnail[i].getAttribute('data-is-favorited');
    if(bookmark == 'true') {
        var heart = document.createElement('div');
        heart.id = 'heart-icon';
        heart.style.width = heart.style.height = '20px';
        heart.style.position = 'absolute';
        heart.style.top = '10px';
        heart.style.right = '10px';
        thumbnail[i].getElementsByTagName('a')[0].appendChild(heart);
    }
    var child = thumbnail[i].getAttribute('data-has-children');
    if(child == 'true') {
        thumbnail[i].getElementsByTagName('img')[0].style.border = '2px solid #97CE68';
    }  
    var parent = thumbnail[i].getAttribute('data-parent-id');
     if(parent != '') {
        thumbnail[i].getElementsByTagName('img')[0].style.border = '2px solid #EDD834';
    }    
    var pending = thumbnail[i].getAttribute('data-flags');
     if(pending == 'pending') {
        thumbnail[i].getElementsByTagName('img')[0].style.border = '2px solid #0073FF';
    }     
}
