// ==UserScript==
// @name        Ellipsis fix [C&C]
// @description It prevents ellipsis for long texts in C&C Tiberium Alliances
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1.0.0
// @grant none
// @author mehdi
// ==/UserScript==

(function(){
    var ellipsisFix = function() {
        for (i = 0; i < document.getElementsByTagName("div").length; i++) { 
            document.getElementsByTagName("div")[i].style["text-overflow"] = "";
        }
    }
    
    document.getElementsByTagName("html")[0].addEventListener("click", ellipsisFix);
})();