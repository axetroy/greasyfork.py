// ==UserScript==
// @name           FF pe FB by Mandy
// @include        http://*
// @version        1.0.5e
// @namespace https://greasyfork.org/users/1584
// @description Removes https links of facebook from frendzforum
// ==/UserScript==


	var links = document.getElementsByTagName('img');			
			for(var i=links.length; i--;) {
				var img_ = links[i].src;
					img_ = img_.replace('https://m.ak.fbcdn.net/', 'http://m.ak.fbcdn.net/');
					links[i].src = img_;
					}