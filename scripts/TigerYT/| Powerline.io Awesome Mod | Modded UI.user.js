// ==UserScript==
// @name         | Powerline.io Awesome Mod | Modded UI
// @version      1.0
// @description  Modded UI | FIRST EVER POWERLINE MOD!
// @author       TigerYT
// @match        http://powerline.io/*
// @match        https://powerline.io/*
// @grant        none
// @connect      powerline.io
// @namespace    https://greasyfork.org/en/users/150424
// ==/UserScript==

//Modded UI

$(document).ready(function(){ 
    $("footer").removeClass("bannerBox");
    $("footer").removeClass("leftBottomBox");
    $("footer").removeClass("rightBoxNews");
    $("footer").removeAttr("class");
});

//footers

$(document).ready(function(){
    $("img").removeAttr("src");
}); //Remove the image of the App Section

//images

$(document).ready(function(){;
    $("font").removeAttr("style");
    $("font").removeAttr("class");
    $("font").remove()
});

//fonts

$(document).ready(function(){
    $("iframe").removeAttr("src");
    $("iframe").removeAttr("id");
});

//iframes

