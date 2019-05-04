// ==UserScript==
// @name            DakarCZ
// @namespace       thetomcz.dakar
// 
// @version         1.2
// 
// @description     Select CZE riders on official Dakar GAPS
// 
// @include         http://gaps.dakar.com/*
// @include         https://gaps.dakar.com/*
// 
// @creator         TheTomCZ <hejl.tomas@gmail.com>
// 
// @require       http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==

var DakarCZE = {
    run: function(){
        jQuery("th:contains('CZE')").parent().find("td.p").each(function(){
            if( !$(this).parent().is(".s") ){
            	$(this).click();
            }
        });
    }
};

$(document).ready(function(){
	DakarCZE.run();
});
