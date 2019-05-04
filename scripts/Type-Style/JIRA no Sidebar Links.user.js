// ==UserScript==
// @name        JIRA no Sidebar Links
// @namespace   jira
// @include     https://jira.arvato-support.com/*
// @version     1
// @grant       none
// @description Overwrites the default behavior for Issue-Links which open in the sidebar by default
// ==/UserScript==




doIt = function() {  
  var links = document.querySelectorAll('.js-key-link');
  if (links) {
    for (var i = 0; i <= links.length; i++) {
      links[i].onclick = function() {
        window.location.href = this.href;
      }  
    };
  }
}

window.setTimeout(doIt,4500);