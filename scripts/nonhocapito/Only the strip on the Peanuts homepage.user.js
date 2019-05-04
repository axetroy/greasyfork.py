// ==UserScript==
// @name        Only the strip on the Peanuts homepage
// @namespace   peanuts-nonhocapito
// @include     http://www.peanuts.com/
// @version     1
// @grant       none
// @description Hides everything but the daily strip from peanuts.com
// ==/UserScript==

//main function 
(function(){ 
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}	
	
	//parts of the page to hide
	var cssStyle = '#wrapper, .ui-header, .container, .follow-us-container, footer, .buy-this {display:none !important}';
	
	//a little make-up
  cssStyle += '.home-comic-strip {margin-top:100px !important;} #jqm-home {background-color:#FFF !important}'; 

  //add CSS
	addGlobalStyle(cssStyle);
	  
}

)()