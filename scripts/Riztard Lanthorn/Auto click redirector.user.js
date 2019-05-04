// ==UserScript==
// @name         Auto click redirector
// @namespace    https://greasyfork.org/en/users/158832
// @version      1.1
// @description  Skip kurosafety, pafpaf
// @author       Riztard
// @match        *kurosafety.menantisenja.com*
// @include      *kurosafety.menantisenja.com*
// @match        *pafpaf.info*
// @include      *pafpaf.info*
// @match        *gametime.web.id*
// @include      *gametime.web.id*
// @grant        none
// @icon         https://www.shareicon.net/download/2015/08/23/89640_forward.ico
// ==/UserScript==

if (window.top != window.self) //-- Don't run on frames or iframes
return;

(function() {
    'use strict';

	if (window.location.href.indexOf("kurosafety") != -1) {

		$('#mybutton')[0].click();

    }
	
	else if (window.location.href.indexOf("pafpaf") != -1) {

		window.location.href = $('#mybutton').attr('href');
		
    }
	
	else if (window.location.href.indexOf("gametime") != -1) {
		
		$('#klik')[0].click();
		window.location.href = $('#generate a').attr('href');
		
    }
	
	
	
	
	
})();