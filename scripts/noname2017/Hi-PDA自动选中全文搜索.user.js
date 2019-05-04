// ==UserScript==
// @name         Hi-PDA自动选中全文搜索
// @namespace    https://www.hi-pda.com/forum/search.php*
// @version      0.2
// @description    Hi-PDA自动添加选中全文搜索
// @author       inmyfree
// @match        https://www.hi-pda.com/forum/search.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var elements =  document.getElementsByName("srchtype");
    var selectedelement;
    if(elements.length==1){
        selectedelement = elements[0];
    }else if(elements.length==2){
        selectedelement = elements[1];
    }
    selectedelement.options.add(new Option("全文","fulltext"));
    selectedelement.options[selectedelement.options.length-1].selected='selected';
})();