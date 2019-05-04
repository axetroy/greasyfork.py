// ==UserScript==
// @name         Removes the delete clan button! - by /u/HighNoon643
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Prevents you from accidentally deleting your clan. If you wish to leave/delete your clan, you'll need to disable the script to make absolute sure. This won't interfere with other scripts or slow your pc down.
// @author       You
// @match        http://vertix.io/
// @grant        none
// ==/UserScript==

function removeclanButton() {
    var elem = document.getElementById('leaveClanButton'); // Finds the button
    elem.parentNode.removeChild(elem); // deletes parant
    return false;
}

setTimeout(removeclanButton, 5000);