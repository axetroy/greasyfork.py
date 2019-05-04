// ==UserScript==
// @name DeviantBlocker
// @namespace brandrock.co.za
// @author Peter Brand
// @description DeviantArt gallery - block images from selected artists
// @license GNU GPLv3
// @include http://www.deviantart.com/*
// @include https://www.deviantart.com/*
// @version 3.6
// @grant GM_getValue
// @grant GM_setValue
// @run-at document-start
// ==/UserScript==

// @grant GM_log
(function() {
	//first time scan on load
	document.addEventListener ('DOMContentLoaded', pageInit);
	
	function buttonAdd(parent, label, title, style, clickEvent){
		var elem = document.createElement('button');
		elem.type = 'button';
		elem.style = style;
		elem.style.zIndex = '99';
		elem.style.position = 'absolute';
		elem.title = title;
		elem.innerHTML = label;
		parent.appendChild(elem);
		elem.addEventListener('click', clickEvent);
		return elem;
	}
	
	function pageInit() {
		//button to reveal blacklist
		var bdiv = document.getElementById('browse-results');
		var blackText = document.createElement('textarea');
		blackText.style = 'position: absolute; display: none; top:0px; right: 0px; z-index: 99;';
		bdiv.appendChild(blackText);
		buttonAdd(bdiv, '?', 'Click to show blacklisted artists'
			, 'top:0px; right: 0px', function(e){
			var blacklist = GM_getValue('DAGbl2', '|');
			blackText.innerHTML = blacklist;
			blackText.style.display='inline-block';
		});
		blackText.addEventListener('change', function (){
			GM_setValue('DAGbl2', blackText.value)
		});
	}
	
	function scanImages() {
		var thumbs = document.querySelectorAll('img[data-sigil]');
		var blacklist = GM_getValue('DAGbl2', '|');
		var count = 0;
		//scan all IMG elements that have a data-sigil attribute (seems unique to gallery images)
		for(var i = thumbs.length; i--;) {
			var img = thumbs[i];
			//quick check to see if src has been specified and haven't done this image already
			if (!img.devblok && img.getAttribute('src')>''){
				img.devblok = true;
				img.setAttribute("data-blocked", -1);
				var a = img.parentNode;
				var div = a.parentNode; //is a span now
				var userid = a.href;
				if (userid.indexOf("://") > -1) {
					userid = userid.split('/')[3];
				}
				userid = userid.split('.')[0];
				//create a button on the page to toggle the state of the artist
				var elem = buttonAdd(div, 'x', 'Click to hide/show images from this artist'
					, 'bottom:0px; right: 0px', function(e){
					artistToggle(e, this);
					});
				elem.userid = userid;
				img.setAttribute('data-userid', userid);
				img.userid = userid;
				var useridD = '|' + userid + '|';
				if (blacklist.indexOf(useridD) > -1){
					imgHide(img);
					elem.isBlocked = true;
					img.setAttribute('data-blocked', 1);
					count++;
				} else {
					elem.isBlocked = false;
					img.setAttribute('data-blocked', 0);
				}
			}
		}
	}

	function artistToggle(e, button) {
		//show or hide the images for this artist
		var i, img;
		var blacklist = GM_getValue('DAGbl2', '|');
		var thumbs = document.querySelectorAll('img[data-sigil]');
		if (button.isBlocked){
			//remove from blacklist string - could have used an array, but string is fast enough
			blacklist = blacklist.replace(button.userid + '|', '');
			GM_setValue('DAGbl2', blacklist);
			//scan page for all images for this artist and show them
			for(i = thumbs.length; i--;) {
				img = thumbs[i];
				if(img.userid == button.userid){
					imgShow(img);
				}
			}
			button.isBlocked = false;
		} else {
			//add to blacklist
			blacklist = blacklist + button.userid + '|';
			GM_setValue('DAGbl2', blacklist);
			//scan page for all images for this artist and hide them
			for(i = thumbs.length; i--;) {
				img = thumbs[i];
				if(img.userid == button.userid){
					imgHide(img);
				}
			}
			button.isBlocked = true;
		}
		var event = e || window.event;
		if (!event) return;
		event.cancelBubble = true;
		if (event.stopPropagation) event.stopPropagation();
	}
	function imgHide(img){
		//img.style.opacity = '0.05';
		img.style.visibility = 'hidden';
	}
	function imgShow(img){
		//img.style.opacity = '1';
		img.style.visibility = 'visible';
	}
	setInterval(function() {scanImages();}, 1000);
})();