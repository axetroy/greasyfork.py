// ==UserScript==
// @name		Auto Agree Tumblr's Privacy Policy
// @description	Loved Tumblr
// @namespace   21a01ff2cc8918079577034bd5290315
// @include     https://www.tumblr.com/privacy/consent?redirect=*
// @author			ejin
// @version     2018.11.28
// @grant        none
// ==/UserScript==


setTimeout(function (){
    if ( document.getElementsByClassName("btn yes").length>0 ) {
		document.getElementsByClassName("btn yes")[0].click()
	}
},0);
