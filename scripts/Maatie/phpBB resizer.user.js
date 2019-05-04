// ==UserScript==
// @name        phpBB resizer
// @name:nl        phpBB verkleiner
// @namespace   http://www.maatie.nl/
// @description     Resize the images of user posted images to make them fit within the layout.
// @description:nl  Verkleint de afbeeldingen zodat ze in het geheel te zien zijn.
// @version     0.2
// @run-at      window-load
// @grant       GM_addStyle
// @grant       GM_deleteValue
// ==/UserScript==

GM_addStyle("div.postbody > img {max-width:50%}");