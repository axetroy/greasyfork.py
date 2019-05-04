// ==UserScript==
// @name         Google Apps
// @namespace    http://tampermonkey.net/
// @version      0.6.2
// @description  Add some Google Apps to your Browser
// @author       Nils
// @match        https://www.google.de/
// @match        https://www.google.de/*
// @match        https://www.google.com/
// @match        https://www.google.com/*
// @grant        none
// ==/UserScript==

var image_youtube = document.createElement('img');
    image_youtube = new Image(25, 25);
    image_youtube.setAttribute('src', 'https://lh3.googleusercontent.com/Ned_Tu_ge6GgJZ_lIO_5mieIEmjDpq9kfgD05wapmvzcInvT4qQMxhxq_hEazf8ZsqA=w300');

var image_translate = document.createElement('img');
    image_translate = new Image(25, 20);
    image_translate.setAttribute('src', 'https://lh3.googleusercontent.com/ZrNeuKthBirZN7rrXPN1JmUbaG8ICy3kZSHt-WgSnREsJzo2txzCzjIoChlevMIQEA=w300'); 

var image_gmail = document.createElement('img');
    image_gmail = new Image(25, 20);
    image_gmail.setAttribute('src', 'https://image.flaticon.com/icons/svg/281/281769.svg');

    var link_youtube = document.createElement("a");
    link_youtube.setAttribute('href', 'https://www.youtube.com/?gl=DE');
    
    var link_translate = document.createElement("a");
    link_translate.setAttribute('href', 'https://translate.google.de/?hl=de&tab=iT');
    
    var link_gmail = document.createElement("a");
    link_gmail.setAttribute('href', 'https://www.google.com/gmail/');
    //var node = document.createTextNode("Youtube");
    //link.appendChild(node);


    var div = document.getElementById("swml");
    div.appendChild(image_youtube);
    link_youtube.appendChild(image_youtube);
    div.appendChild(link_youtube);
    div.style="position:absolute; left:47.5%; top:37%;";
    
    div.appendChild(image_translate);
    link_translate.appendChild(image_translate);
    div.appendChild(link_translate);
    
    div.appendChild(image_gmail);
    link_gmail.appendChild(image_gmail);
    div.appendChild(link_gmail)