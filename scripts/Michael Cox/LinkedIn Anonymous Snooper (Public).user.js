// ==UserScript==
// @name         LinkedIn Anonymous Snooper (Public)
// @namespace    https://www.michaelcox.eu
// @version      0.2
// @description  Look at public linkedin profiles without logging in
// @author       Michael Cox
// @domain       linkedin.com
// @domain       www.linkedin.com
// @include      http://linkedin.com/authwall*
// @include      http://www.linkedin.com/authwall*
// @include      https://linkedin.com/authwall*
// @include      https://www.linkedin.com/authwall*
// @include      http://linkedin.com/in/*
// @include      http://www.linkedin.com/in/*
// @include      https://linkedin.com/in/*
// @include      https://www.linkedin.com/in/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var send_cookies = 0; // 1=enable cookies , 0 =disable cookies
    var root = document.getElementsByTagName( 'html' )[0]; // '0' to assign the first (and only `HTML` tag)

    function remove_advocate_modal(){ // remove the div with id advocate-modal if it exists
        var element = document.getElementById("advocate-modal");
        if (element){
            element.parentNode.removeChild(element);
        }
    }
	remove_advocate_modal(); // execute the funcion defined above
    root.setAttribute( "style", "overflow-y: scroll;" ); // add style to the html tag
})();