// ==UserScript==
// @name         Faster Media
// @namespace    http://tampermonkey.net/
// @version      0.2.11.1
// @description  Set Youtube & Overcast & Youku PlaybackRate to 1.6 by default
// @author       Decradish
// @match        *www.youtube.com/watch?v=*
// @match        *overcast.fm/+*
// @match        *v.youku.com/v_show/id_*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	var iPlaybackRate = 1.6, //rate
		tmVideo = document.getElementsByTagName("video")[0],
		tmAudio = document.getElementsByTagName("audio")[0],
		tmMedia = false,
		OcRange = document.getElementById('speedcontrol'), //Overcast
		youkuDom = document.getElementById('module_basic_player'); //优酷

	if(youkuDom){
		var youkuInterval = setInterval(function(){
			var ykPlayer = document.getElementById('ykPlayer'),
				videos = document.getElementsByTagName('video');
			if(ykPlayer && videos && videos.length > 0){
				clearInterval(youkuInterval);
				for(var i=0;i<videos.length;i++){
					videos[i].playbackRate = iPlaybackRate;
					videos[i].oncanplay = function(){
						this.playbackRate = iPlaybackRate;
					}
				}

				document.getElementsByClassName('h5player-dashboard')[0].style.display = 'none';
			}
		}, 10);
		
		return false;
	}

	if(!!tmVideo){
		tmMedia = tmVideo;

		var youTubePlayBtn = document.getElementsByClassName('ytp-play-button')

		if(youTubePlayBtn.length > 0){
			document.getElementsByClassName('ytp-play-button')[0].focus()
		}
	}

	if(!!OcRange){
		OcRange.stepUp(4)
		document.getElementById('speedlabel0').style.color = '#000'
		document.getElementById('speedlabel1500').style.color = '#fff'
	}

	if(!tmMedia){
		return false;
	}

	tmMedia.playbackRate = iPlaybackRate;

	tmMedia.onplay = function(){
		tmMedia.playbackRate = iPlaybackRate;
	};

	tmMedia.oncanplay = function(){
		tmMedia.playbackRate = iPlaybackRate;
	};
})();