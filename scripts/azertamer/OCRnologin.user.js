// ==UserScript==
// @name        OCRnologin
// @namespace   azertamer
// @description Remove limitation banner in Open Classrooms
// @name:fr      OCRnologin
// @description:fr Enlève la bannière de limitation sur Open Classrooms
// @include     https://openclassrooms.com/*
// @version     1
// @grant       none
// ==/UserScript==

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

document.getElementsByClassName("fancybox-overlay").remove();
document.getElementsByClassName("fancybox-wrap fancybox-desktop fancybox-type-inline fancybox-opened").remove();
