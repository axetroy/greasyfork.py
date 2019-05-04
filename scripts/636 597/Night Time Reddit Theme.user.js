// ==UserScript==
// @name          Night Time Reddit Theme
// @namespace     http://userstyles.org
// @description	  Removes Advertisements from Reddit
// @author        ceberous
// @homepage      https://creatitees.info
// @include       https://www.reddit.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @run-at        document-start
// @version       1.1
// ==/UserScript==
'use strict';
(function(){
  
    $(document).ready( function() {

		$(document.body).css("background" , "black");

        $('.usertext-body p').each(function( index , element ) {
            $(this).css("color","green !important");
        });
        // children().children().css("color","green !important");

	});

	var css = [
	
		".content{ background: black !important; }",
		"#header{ background: black !important; }",
		".side {background: black !important;}",
		".grippy {background: black !important;}",
		".listing-chooser {background: black !important;}",
		".RES-keyNlev-activeElement {background: green !important;}",
		".sitetable {background: black !important;}",
		".madeVisible {background: black !important;}",
        ".usertext {background: black !important;}",
		".title {color: green !important;}",
        ".entry {color: black !important;}",
        ".expando {color: black !important;}",

	
	].join("\n");

    var node = document.createElement("style");
    node.type = "text/css";
    node.appendChild(document.createTextNode(css));
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
        heads[0].appendChild(node); 
    } else {
        document.documentElement.appendChild(node);
    }
  
    
})();