// ==UserScript==
// @name         LocalStorage Checker
// @namespace    https://kat.cr/user/Sasidhar.
// @version      0.1
// @description  Checks your browser for Local Storage
// @author       Sasidhar
// @match        http://*/*
// @include      http://*/*
// @include      https://*/*
// @grant        none
// ==/UserScript==
if(window.localStorage) {
    alert('local Storage exists ');
} else {
    alert('local storage does not exist in your browser');
}