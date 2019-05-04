// ==UserScript==
// @name         过滤rarbg中IMDB小于7分的内容
// @namespace    http://babesun.com/
// @version      0.1
// @description  try to get good torrents!
// @author       Babesun
// @match        http*://rarbg.to/torrents.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    $('tr.lista2 td+td.lista span[style^=color]').each(function(){
      if($(this).html().match(/IMDB: (.*)\/10/)){
          var substr = $(this).html().match(/IMDB: (.*)\/10/)[1];
      };
      if(Number(substr)<7 || substr==undefined){
          $(this).parent().parent().remove();
      }else{
          $(this).html($(this).html().replace('IMDB:','IMDB:<b style="color:red">'));
          $(this).html($(this).html().replace('/10','</b>/10'));
      }
    });
})();