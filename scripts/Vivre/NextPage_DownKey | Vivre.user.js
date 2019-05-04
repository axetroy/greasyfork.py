// ==UserScript==
// @name           NextPage_DownKey | Vivre
// @description    Calls next result/list page with PageDown-key when end of page is reached 
// @version        0.2 - 06.04.2016
// @author          Vivre
// @namespace   https://greasyfork.org/en/users/31346-vivre
// @include        *//greasyfork.org/*
// @include        *//www.youtube.com/results*
// @grant       none
// ==/UserScript==
// https://greasyfork.org/en/scripts/18472-nextpage-downkey-vivre

// Note: if the determined page-height is not enough in your case, you can apply additional heights 
// by setting values to the  extraHeight variables below.

// ***********************************************************************
// 
// version  0.2 - 06.04.2016: new: enabled for GF user + moderator lists. Condensed check-routine.
// version  0.1 - 03.04.2016: initial release
// 
// ***********************************************************************


// ****** special SETTING 

var extraHeight_GF = 0; 		// pixel-value to encrease evaluated page-height
var extraHeight_YT = 0;

// ****************************************


function pageDown() {
	var getLink = "";

				//  greasyfork.org - scripts + forum

	var tryClass = ['next_page', 'Next', 'next'];

	for each(var thisClass in tryClass) {
		try {
			element = document.getElementsByClassName(thisClass)[0];
			if (element) {
				getLink = element;
			}
		} catch (e) {}
	}


	try {				//  youtube.com - results?search
		var ytLink = document.getElementsByTagName('a');

		for (var i = 0; i < ytLink.length; i++) {
			if (ytLink[i].href.match('search_query')) {
				try {
					isAttr = ytLink[i].getAttribute('data-link-type');
					if (isAttr.match('next')) {
						getLink = ytLink[i]
					}
				} catch (e) {};
			}
		}
	} catch (e) {};


	if (getLink) {
		window.location.href = getLink.href;
	}
};



function getKey(evt) {
	var curViewHeight = window.innerHeight;
	var curScrolled = document.documentElement.scrollTop;
	
	if (document.location.href.match('youtube.com/results')) {
		var thisDocHeight = document.getElementsByClassName("yt-uix-pager search-pager branded-page-box spf-link")[0].offsetTop + extraHeight_YT; 	//  alert(thisDocHeight)
	} else {
		var thisDocHeight = document.body.scrollHeight + extraHeight_GF;
	}

	evt = evt || window.event;
	switch (evt.keyCode) {
	case 34:
		if ((thisDocHeight - curScrolled) > curViewHeight) {
			//	alert('end not reached');
		} else {
			//	alert('doc-end reached')
			evt.preventDefault();
			pageDown();
			break;
		};
		break;
	}
};


document.addEventListener('keydown', getKey, false)


// alert('end of script');