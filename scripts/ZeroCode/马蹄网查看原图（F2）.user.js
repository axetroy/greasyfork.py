// ==UserScript==
// @name         马蹄网查看原图（F2）
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  ======================
// @author       Zero
// @match        http://www.mt-bbs.com/*
// @grant        none
// ==/UserScript==

(function() {
    jQuery(window).keydown(function(event){
        if(event.keyCode == 113){
            jQuery(".pcb img").attr({
                src:    function(){return this.src.replace(/.thumb.jpg/, "");},
                width:  function(){return Math.max(this.width, 700);}
            });
            jQuery(".pcb img").before("<div>Size:" + jQuery(this).width() + "X" + jQuery(this).height() + "</div>");
        }
    });
})();