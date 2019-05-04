// ==UserScript==
// @name            Steam yuge link
// @namespace       mikanSyl
// @version         1.1
// @description     Steamのストアページに、最安値が調べられるサイトYugeへのリンクを設置します。
// @author          mikan-megane
// @grant           none
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @include         http://store.steampowered.com/app/*
// ==/UserScript==

var id = document.URL.replace(/http:\/\/(?:www\.)?store\.steampowered\.com\/app\/(\d+)(?:$|\/.*|\?.*)/, "$1");

jQuery.noConflict();
(function($){
    $(function(){
		$(".details_block .linkbar:last-child ").after('<a class="linkbar" target="_blank" href="http://www.srytk.com/a/yuge/items/?id='+id+'">最安値を表示 <img src="http://store.akamai.steamstatic.com/public/images/v5/ico_external_link.gif" align="bottom" border="0"></a>');
    });
})(jQuery);