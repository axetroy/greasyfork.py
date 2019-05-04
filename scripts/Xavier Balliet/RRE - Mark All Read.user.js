// ==UserScript==
// @name        RRE - Mark All Read
// @description Marque tous les sujets comme lus sur le forum RRE
// @include     http://forum-landroverevoque.soforums.com/*
// @icon        http://www.autoprofessionals.org/images/icons/Land+Rover.png
// @version     1.1
// @grant       none
// @namespace https://greasyfork.org/users/16866
// ==/UserScript==

var markAsReadButton = document.createElement('input');
markAsReadButton.setAttribute('type', 'submit');
markAsReadButton.setAttribute('name', 'btnMarkAsRead');
markAsReadButton.setAttribute('id', 'btnMarkAsRead');
markAsReadButton.setAttribute('value', 'Marquer tous les forums comme lus');
markAsReadButton.setAttribute('style', 'font-family: "Trebuchet MS",Verdana, Arial, Helvetica, sans-serif; font-size: 22px; font-weight: bold; position: absolute; left: 50px; top: 110px; width: 400px; height: 35px; cursor: pointer;');
markAsReadButton.addEventListener('click', function(){location.href='http://forum-landroverevoque.soforums.com/markf';});
document.body.appendChild(markAsReadButton);
