  // ==UserScript==
// @name        GMail to Google Inbox
// @description Automaticaly redirects to Google Inbox if gmail is visited
// @author      Petr Katerinak
// @include     http*mail.google.com*
// @version     1
// @namespace https://greasyfork.org/users/12565
// ==/UserScript==

window.location.replace("https://inbox.google.com");
