// ==UserScript==
// @name        OK Auto Like Одноклассники odnoklassniki
// @description Одноклассники Ставим Класс автоматом всем
// @include     *ok.ru/*
// @version     15.0
// @grant       none
// @require     http://code.jquery.com/jquery-2.1.1.min.js
// @author      drakulaboy  
// @icon        http://i.imgur.com/wEsWOox.png   
// @namespace https://greasyfork.org/users/213
// ==/UserScript==

jQuery(document).ready(function ($) {

		$('body').append("<button style='cursor: pointer; repeat scroll 0% 0% / auto padding-box border-box; padding: 5px 10px; vertical-align: middle; position:fixed; bottom: 15px; left: 25px; z-index:9999;' id='klassbt'><img src='https://i.imgur.com/FZVGMkw.png' height='45' border=0><br/></button>");


	$("#klassbt").click(function(t) {
	$(document).ready(function(){
        $('.widget_tx').filter(function() {
    var colormatch= 'rgb(235, 114, 46)'; // match color
    return ( $(this).css('color') == colormatch);
}).click(function(){return false;});
        setTimeout(function(){
                   $('span:contains("Класс")').click();
                    }, 500);
});
	});
});