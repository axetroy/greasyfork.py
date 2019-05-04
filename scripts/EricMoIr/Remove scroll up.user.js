// ==UserScript==
// @name         Remove scroll up
// @version      1
// @description  Remove the auto scroll up when clicking the CB or Music links
// @author       A Meaty Alt
// @include      /fairview.deadfrontier.com/
// @grant        none
// @namespace https://greasyfork.org/users/150647
// ==/UserScript==

(function() {
    'use strict';
    var imgs = document.getElementsByTagName("img");
    for(var i=0; i<imgs.length; i++){
        if("Turn CB Radio On" == imgs[i].alt || "Turn Music On" == imgs[i].alt)
            imgs[i].setAttribute("onclick",  imgs[i].getAttribute("onclick")+ ";return false;");
    }
})();