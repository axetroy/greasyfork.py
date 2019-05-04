// ==UserScript==
// @name       Manual Page Refresh (F5)
// @author not zingy
// @version    0.1
// @description  manually refresh page with middle mouse click
// @require http://code.jquery.com/jquery-latest.min.js
// @copyright  you baby
// @namespace https://greasyfork.org/users/2698
// ==/UserScript==

//middle mouse click=refresh

$(window).mousedown(function (e) {
var oph = (e.keyCode ? e.keyCode : e.which);
switch (oph) {
case 2:
document.location.reload(true)
return false;
}
});

//switch keycodes for difference