// ==UserScript==
// @name         cnblog "deleteButton"++
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://i.cnblogs.com/EditDiary.aspx*
// @grant        none
// require       //cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js
// ==/UserScript==

(function() {
    $('#Listing').find('tr').each(function(){
        $(this).children('td:last').css('font-size','20px');
        $(this).children('td:nth-child(5)').css('font-size','20px');
        $(this).find('a.titlelink').css('font-size','20px');
    })
//
  //
  //
})();
