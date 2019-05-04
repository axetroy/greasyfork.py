// ==UserScript==
// @name         'Time Display' Button
// @namespace    https://greasyfork.org/en/scripts/13470-time-display-button
// @version      2.0
// @description  This Displays The Time If used Correctly. Displays at the bottom of the page.
// @author       articuno032
// ==/UserScript==

// Button and paragraph to Display the Time
var b = document.createElement("Button");
var p = document.createElement("P");
// Styling the button
b.style.font = "16px arial,serif";
b.style.width = "50%";
b.style.marginLeft = "25%";
b.style.marginRight = "25%";
//styling the P tag
p.style.font = "16px arial,serif";
p.style.width = "50%";
p.style.marginLeft = "25%";
p.style.marginRight = "25%";
p.style.textAlign = "center";
// Attaching The Button to the HTML
document.body.appendChild(b);
document.body.appendChild(p);
// Telling what Is on the Button
b.innerHTML = "Display The Time";
// An 'onclick' function to display the time
b.onclick = function(){bfunc();};
// The function that displays the time
function bfunc() {
    p.innerHTML = "-------------------------------------------------------" + "<br>" + new Date() + "<br>" + "-------------------------------------------------------";
}