// ==UserScript==
// @name         YouTube.com Videos View instead of Channel View
// @namespace    yt_vv_io_chv 
// @version      1.0
// @description  Fuck channel view, only videos view!
// @author       obscenelysad@gmail.com
// @include      *://*youtube*/*
// @grant        GM_xmlhttpRequest

// ==/UserScript==



	var anchors = document.getElementsByTagName('a');


	for(var i=0; i < anchors.length; i++){


		if (anchors[i].href.indexOf('https://www.youtube.com/channel/') !=-1) {

			anchors[i].href = anchors[i].href + '/videos';

		}


		if (anchors[i].href.indexOf('https://www.youtube.com/user/') !=-1) {

			anchors[i].href = anchors[i].href + '/videos';

		}


	}