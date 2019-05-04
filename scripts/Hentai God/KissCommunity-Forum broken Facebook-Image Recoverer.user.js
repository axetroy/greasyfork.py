// ==UserScript==
// @name         KissCommunity-Forum broken Facebook-Image Recoverer
// @namespace    http://cl.1ck.me
// @version      1.0
// @description  Replaces some of the broken facebook images on the forum!
// @author       You
// @match        http://forum.kissanime.com/index.php?*
// @grant        none
// ==/UserScript==

window.addEventListener('load', function() {

var img = document.getElementsByClassName("bbCodeImage");
    
    
function isImageOk(img) {
    
    if (!img.complete) {
        return true;
    }

    if (typeof img.naturalWidth != "undefined" && img.naturalWidth == 0) {
        return true;
    }

    return false;
}

for(var i = 0; i < img.length; i++) {
    if(img[i].src.lastIndexOf("https://scontent", 0) === 0 || img[i].src.lastIndexOf("https://fbcdn", 0) === 0 ) {
        
      if(isImageOk(img[i])) {
        var link = img[i].src;
        var cut = link.split("_");
        var id = cut[1];
        img[i].src = "http://cl.1ck.me/projects/fbimg/fetch.php?id="+id;
      }
        
    }
}
    
}, false);