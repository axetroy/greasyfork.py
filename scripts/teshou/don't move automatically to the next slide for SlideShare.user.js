// ==UserScript==
// @name       don't move automatically to the next slide for SlideShare
// @namespace  
// @version    0.1
// @description  don't move automatically to the next slide for slideshare
// @match      http://www.slideshare.net/*
// ==/UserScript==

'use strict';
!function(t){t.parentNode.removeChild(t)}(document.querySelector(".next-container"));
