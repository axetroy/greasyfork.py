// ==UserScript==
// @name        reddit: switch URL and title field
// @namespace   mailto:morten.with@gmail.com
// @locale      en
// @include     *reddit.com/*submit*
// @version     0.2
// @run-at      document-start
// @grant       none
// @description switches title and url field so it is consistent between link and self posts
// ==/UserScript==

(function()
{
'use strict';

document.addEventListener("DOMContentLoaded", function()
{
var urlField = document.getElementById("url-field");
var urlFieldSpacer = urlField.parentElement;

var titleField = document.getElementById("title-field");
var titleFieldSpacer = titleField.parentElement;

urlFieldSpacer.removeChild(urlFieldSpacer.childNodes[0]);
titleFieldSpacer.removeChild(titleFieldSpacer.childNodes[0]);

urlFieldSpacer.appendChild(titleField);
titleFieldSpacer.appendChild(urlField);
});
})();
