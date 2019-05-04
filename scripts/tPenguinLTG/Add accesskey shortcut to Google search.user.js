// ==UserScript==
// @name        Add accesskey shortcut to Google search
// @namespace   tpenguinltg
// @description Adds accesskey+f as shortcut for accessing Google search bar
// @include     https://www.google.*
// @version     1
// @grant       none
// ==/UserScript==

var searchBar = document.querySelector("input[name=q]");
if (searchBar) {
  searchBar.accessKey="f";
}
