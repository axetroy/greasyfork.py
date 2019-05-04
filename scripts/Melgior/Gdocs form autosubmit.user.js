// ==UserScript==
// @name         Gdocs form autosubmit
// @namespace    https://greasyfork.org/users/5660
// @version      0.1
// @description  Automatically submits the form if a barcode scanner (or user) presses enter on the first text field
// @author       Melgior
// @match        https://docs.google.com/*/viewform*
// @grant        none
// ==/UserScript==

document.querySelector("input[type=text]").addEventListener('keypress', function(e){
    if (e.keyCode == 13) {
        window.onbeforeunload = null;
        e.target.form.submit();
    }
});