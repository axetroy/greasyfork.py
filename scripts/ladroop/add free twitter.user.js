// ==UserScript==

// @name        add free twitter
// @namespace   twitter_goes_droopy
// @description hides promoted tweets and promoted trends
// @include     https://twitter.com/*
// @include     https://twitter.com
// @version     1.1
// @run-at      document-start
// @grant       none
// ==/UserScript==


	function start(){
		if (run==0){
			setInterval(function(){
				cleanup();
				},1000);
			run=1;
			cleanup();
		}
	}

	function cleanup(){
		adds=document.getElementsByClassName("Icon Icon--promoted");
		for (n=0;n<adds.length ; n++){
			adds[n].parentNode.parentNode.parentNode.style.display="none";
		}
	}

run=0;
start();
