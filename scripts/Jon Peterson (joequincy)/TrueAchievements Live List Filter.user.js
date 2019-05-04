// ==UserScript==
// @name         TrueAchievements Live List Filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds filter/search capability for achievement titles.
// @author       joequincy
// @match        https://www.trueachievements.com/game/*/achievements
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var insertPoint = $("table.achievementwonoptions")[0];
    var insertBlock = document.createElement("div");
    var insertStyles = document.createElement("style");
    document.head.appendChild(insertStyles);
    insertStyles.sheet.insertRule("div.tmfilter{padding-bottom:15px}",0);
    insertStyles.sheet.insertRule("div.tmfilter span{padding-right:5px}",0);
    insertStyles.sheet.insertRule("div.tmfilter input{color:#bbb;background-color:#444;border-color:#555}",0);
    insertStyles.sheet.insertRule("div.tmhidden{display:none!important;}",0);
    insertBlock.classList.add("tmfilter");
    insertBlock.appendChild(document.createElement("span"));
    insertBlock.appendChild(document.createElement("input"));
    insertBlock.children[0].innerHTML = "Filter/Search achievement names: ";
    insertPoint.parentElement.insertBefore(insertBlock, insertPoint.nextSibling);
    insertBlock.children[1].addEventListener("input",filterList);
    var aSearch = $("div.achievementpanel");
    var aElms = [];
    for(var i in aSearch){
        if(typeof(aSearch[i])=="object"&&typeof(aSearch[i].tagName)!=="undefined"){
            aElms.push(aSearch[i]);
        }
    }
    function filterList(e){
        var f = new RegExp(RegExp.escape(e.target.value), "i");
        for(let elm of aElms){
            var t = elm.querySelector("a.mainlink").textContent;
            elm.classList.toggle("tmhidden",!f.test(t));
        }
    }
    RegExp.escape= function(s) {
        return s.replace(/[-\/\\$*+?.()|[\]{}]/g, '\\$&');
    };
})();