// ==UserScript==
// @name           Redmine Username Shorten
// @description:en Shorten username
// @version        0.1
// @namespace      http://twitter.com/foldrr/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @match          http://*/redmine/projects/*/issues*
// @description Shorten username
// ==/UserScript==

(function(){
    function takeFirstName(i, elem){
        $(elem).text($(elem).text().split(" ")[0]);
    }
    $('.author a').each(takeFirstName);
    $('.assigned_to a').each(takeFirstName);
})();