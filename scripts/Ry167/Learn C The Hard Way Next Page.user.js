// ==UserScript==
// @name       Learn C The Hard Way Next Page
// @namespace  http://cyanium.com/
// @version    0.1
// @description  Add a next page button to the bottom of Learn C The Hard Way
// @match      http://c.learncodethehardway.org/book/*
// @grant none
// @copyright  2012+, Ry167
// ==/UserScript==
(function(){
    var loc = window.location.href;
    var number = parseInt(loc.match(/\d+/)[0])+1;
    var href = "http://c.learncodethehardway.org/book/ex"+number+".html";
    var link = document.createElement('a');
    link.setAttribute('href', href);
    link.innerText = "Next Page";
    link.setAttribute('style',"font-size:69px");
 
    document.getElementById("extra-credit").appendChild(link);
})();
