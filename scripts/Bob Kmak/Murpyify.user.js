// ==UserScript==
// @name       Murpyify
// @namespace  http://www.murpy.pw
// @description Turns all images on a page into one of murpy the cat!
// @author 	   KMakBlob
// @version    1.5
// @match      *://*/*
// ==/UserScript==

(function(e, s) {
    e.src = s;
    e.onload = function() {
        jQuery.noConflict();
        jQuery('img').each(function() {
        	jQuery(this).attr('src', 'http://www.murpy.pw/murpy8.JPG');
    	});
    };
    document.head.appendChild(e);
})(document.createElement('script'), '//code.jquery.com/jquery-latest.min.js');