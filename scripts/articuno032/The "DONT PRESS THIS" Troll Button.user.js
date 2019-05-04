// ==UserScript==
// @name         The "DONT PRESS THIS" Troll Button
// @namespace    https://greasyfork.org/en/scripts/13570-the-dont-press-this-troll-button
// @version      1.1
// @description  makes a button that DESTROYS THE PAGE!(not literaly)
// @author       articuno032
// @grant        none
// ==/UserScript==

// Getting the Varibles set up
var d = document.createElement("Button");
var x = document.getElementsByTagName("BODY")[0];
// Appending some stuff to the page
x.appendChild(d);
// Setting the Appended button's text to "DON'T CLICK ME!"
d.innerHTML = "DON'T CLICK ME!";
// making an "onclick" function to activate the button
d.onclick = function() {otherfunc()};
// calling the function and maikng the page turn into this: "I Told You 'DON'T CLICK ME!'", and setting the background to white.
function otherfunc() {
  x.innerHTML = "I told you 'DON'T CLICK ME!'";
  x.style.background = "white";
}