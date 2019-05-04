// ==UserScript==
// @name        Reddit timestring highlight
// @description Highlight recent time strings on reddit
// @namespace   8cccc9 + kmc
// @include     *reddit.com/r/*
// @version     1
// @grant       none
// ==/UserScript==
var elements = document.getElementsByClassName("live-timestamp");
for(var i = 0; i < elements.length; i++){
    elements[i].style.fontWeight = "bold";
    var time = elements[i].innerHTML;
    if(time.match(/just now/g)){
        elements[i].style.color = "lime";
    } else if(time.match(/\d+ minute/g)){
    	elements[i].style.color = "green";
    } else if(time.match(/1 hour/g)){
    	elements[i].style.color = "teal";
    } else if(time.match(/2 hour/g)){
    	elements[i].style.color = "cornflowerblue";
    } else if(time.match(/3 hour/g)){
    	elements[i].style.color = "mediumblue";
    } else if(time.match(/4 hour/g)){
    	elements[i].style.color = "indigo";
    }
}