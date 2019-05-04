// ==UserScript==
// @name         GDocs Display blank form after submit
// @version      0.2
// @description  Redirects back to empty form after displaying the confirmation message for 1 seconds (modified from Melgior)
// @author       Coach
// @match        https://docs.google.com/*/formResponse*
// @grant        none
// @namespace https://greasyfork.org/users/96224
// ==/UserScript==

if (!document.querySelector("input[type=submit]")) {
    setTimeout(function(){
        document.location = document.location.href.replace("formResponse", "viewform");
    }, 0000);
}