// ==UserScript==
// @author 				hunlongyu
// @version 			0.0.2
// @lilcense 			WTFPL
// @grant 				none
// @encoding 			utf-8
// @namespace 			https://github.com/Hunlongyu
// @icon		 		http://7xo0rb.com1.z0.glb.clouddn.com/public/16-12-5/39527384.jpg
// @require 	 		http://cdn.bootcss.com/jquery/2.2.4/jquery.js

// @name 				tiny

// @description 		tinypng and tinyjpg 网站简化

// @match 				https://tinyjpg.com/
// @match 				https://tinypng.com/
// @run-at 				document-end
// @date 				09/21/2017
// ==/UserScript==

(function() {
    'use strict';

    $('header nav').hide();
    $('.highlight').hide();
    $('.customerlogos').hide();
    $('footer').hide();
})();