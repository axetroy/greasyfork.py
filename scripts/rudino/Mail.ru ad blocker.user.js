// ==UserScript==
// @name         Mail.ru ad blocker
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Blocks mail.ru ads
// @author       mail.ru group
// @match        https://e.mail.ru/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var worked = false;
    $(document).on("DOMNodeInserted",function(e){
        if (!worked && $(".b-layout__col_1_2").length) {
        	var upperBlockerFunc = function(e){
                if ($(".b-datalist__head").length) {
                    $(".b-datalist__head").remove();
                }
                if ($(".b-letter__head__rb").length) {
                    $(".b-letter__head__rb").remove();
                }
            };
            $(".b-layout__col_2_2").on("DOMNodeInserted", upperBlockerFunc);
            $(".b-layout__col_2_2").on("DOMCharacterDataModified", upperBlockerFunc);
            $(".b-layout__col_1_2").on("DOMNodeInserted",function(e){
                var children = $(".b-layout__col_1_2").children();
                if (children[5]) children[5].remove();
            });
            worked = true;
        }
    });
})();
