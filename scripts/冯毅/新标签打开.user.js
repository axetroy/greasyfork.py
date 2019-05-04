// ==UserScript==
// @name         新标签打开
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  常用网站新标签页打开
// @author       hxtgirq710@qq.com
// @match        http*://*.github.com/*
// @match        http*://laravel-china.org/*
// @match        http*://packagist.org/*
// @match        http*://cnodejs.org/*
// @require      https://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(function(){
		switch(window.location.host) {
			case "packagist.org":
				setInterval(function(){
					$(".package-item h4>a").attr("target", "_blank");
				}, 1000);
				break;
            case "cnodejs.org":
                $(".cell a").attr("target", "_blank");
                break;
            case "laravel-china.org":
                $(".list-group-item a").attr("target", "_blank");
                break;
			default:
				$(".repo-list h3>a,#user-repositories-list h3>a").attr("target", "_blank");
				break;
		}
		
    });
})();