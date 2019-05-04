// ==UserScript==
// @name        Super Fast YouTube to MP3 Converter & Online Video Downloader
// @namespace   https://yt2mp3.ws
// @version     1.1
// @description Download any video and music (audio) 320 kbps from Youtube, Twitter, Vimeo, Facebook, Instagram, SoundCloud, Dailymotion, Liveleak, Break, Imgur, Mashable, Reddit, 1TV, 9gag, VK, TED, youku, bilibili, pornhub, xvideos, youporn and 10,000 more sites for free. Also support to download subtitles. Free, fast and easy to use. No need to install any annoying softwares. Supporting MP4, WEBM, AVI, 3GP, FLV, H64, ACC, FLA, MP3, M4A, 8K, 6K,4K, 2K, 1080, 720, 480, 360, etc.
// @author      Mark J. Fulghum
// @copyright   2018, YT2MP3 Online Video Downloader
// @icon        https://yt2mp3.ws/css/img/logo128.png
// @icon64      https://yt2mp3.ws/css/img/logo64.png
// @homepage    https://www.yt2mp3.ws/browser-extensions.html
// @include     http*://*.youtube.com/*
// @include     http*://youtube.com/*
// @include     http*://*.youtu.be/*
// @include     http*://youtu.be/*
// @run-at      document-end
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var domain_run = 'www.yt2mp3.ws';
var ext_version = '1.1';
if("undefined" == typeof (yt2mp3)) {
	var yt2mp3 = {

        userUrl: 'https://'+domain_run+'/',
        saveUrl: 'https://'+domain_run+'/',
        currentMediaUrl: null,

		getParam : function (document, variable){
			 var query = document.location.search.substring(1);
			 var vars = query.split("&");
			  for (var i=0;i<vars.length;i++) {
					var pair = vars[i].split("=");
					if(pair[0] == variable){return pair[1];}
			   }       return(false);
		},

		init : function() {
			yt2mp3.onPageLoad();
		},

		addButtons: function(document) {
				var icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACVVBMVEX/AAAAAAD/AAD/AAD/AAD/AAD/AAD/AAD+AAD/AAD/AAD+AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD7AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD////3QPzBAAAAxnRSTlMAAAAAAAAAAAAAAAAAAAAAADoHBC4fBAAAB9GwGgKg0zwEAAAGG0S+OJlCqWYDAQAlvU2OKgSihQIAAQ0EDqWiBQGEogcDD5sCAoiVAQBjthwEEagCAgJxshNCwTcQpAIAAAAEQ7wjBR60VBGlAgAAAAQ5wSQFFbVYAgEDY7oYNMNApQIBAn2lBwFQvigEEaUFAJmaAANtshIDEKkPsmh+K4ufAgMAE5glvFidK5iHAQIACsq9OAOi018DAQB0IgYAW0sEAACxbbIWAAAAAWJLR0TG+gJ6zQAAAAd0SU1FB+EIFgEgBbDimx8AAAEPSURBVBjTDc/TYsMAAAXQm25Jltm2batj29m20dm20dm2bfu/ltfzdgAFRShBWQWqUFMnCAIamlra0NHV04eBIYxAwNjE1MycY2FpZS1mYytuB4Dk2Ds4Ojm7uLoB7vCAp5c3fHy5fv4ICAyigmnw+IIQIDQsPAKRUdFUDGLj4smERCQlp0ggNS2dRkZmVnZObh6TX1BYxBSXlEJYVl5RWVWNmtq6ejQ0NrHQjJZWybb2Dinpzq5uGQh7evv6mYHBoWFyZHQM4xBNTGJqemZ2DvMLi9QSsLyC1bX1jU1sbe/I7tJ72D84PDpmTk7PzuUuLuWvgOub2zvcPzw+4fkFr2wOb+/4+Pz6xs8v/tj+Pwk0Tbr8wm1AAAAAD3RFWHRBdXRob3IATG9nYXN0ZXL0WrQKAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA4LTIyVDAxOjMyOjA1LTA0OjAwDh/9+gAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wOC0yMlQwMTozMjowNS0wNDowMH9CRUYAAAAASUVORK5CYII=';
				var yt2mp3path = yt2mp3.userUrl + "?url=" + decodeURIComponent(document.URL);
                var div_embed = null;
                var target= '_blank';

				if(document.getElementById('meta-contents')) {
                    var div_embed=document.getElementById('meta-contents').querySelector('#top-row ytd-video-owner-renderer.ytd-video-secondary-info-renderer #sponsor-button');
                    div_embed.innerHTML += ' <a href="' + yt2mp3path + '" target="' + target + '" style="text-decoration: none; color: inherit;" class="style-scope ytd-subscribe-button-renderer"><paper-button subscribed id="yt2mp3" style="float:right" class="ytd-subscribe-button-renderer"><img  style="margin-right: 3px; vertical-align: bottom;" src="' + icon + '"> <strong style="color:#000000;">Download</strong></paper-button></a>'+ div_embed.innerHTML;
				} else if(document.getElementById('watch8-sentiment-actions')) {
					var div_embed = document.getElementById('watch8-sentiment-actions');
					var buttonclass = "yt-uix-button yt-uix-button-default yt-uix-tooltip";
					var spanclass="yt-uix-button-group";
                    div_embed.innerHTML = ' <span id="yt2mp3" class="' + spanclass + '"><a href="' + yt2mp3path + '" target="' + target + '"><button class="start ' + buttonclass + '" type="button" title="Record video with yt2mp3"><img alt="" class="" style="" src="' + icon + '"> <span class="yt-uix-button-content"><strong>yt2mp3</strong></span></button></a>' + '<a href="' + yt2mp3path + '&format=mp3" target="' + target + '"><button class="' + buttonclass + '" type="button" title="Record audio as MP3">MP3</span></button></a>' + '<a href="' + yt2mp3path + '&format=mp4" target="' + target + '"><button class="end ' + buttonclass + '" type="button" title="Record video as MP4">MP4</span></button></a></span>' + div_embed.innerHTML;
				}
		},

		onPageLoad : function() {


			if(document.body && document.domain == 'www.youtube.com') {

					setInterval(yt2mp3.check, 1000);
                    yt2mp3.check();
			}
		},

        check: function() {

            if(yt2mp3.currentMediaUrl != document.URL) {
                // new video detected
                yt2mp3.currentMediaUrl = document.URL;
                //yt2mp3.saveUrlMap();
                if(document.getElementById('yt2mp3')) {
                    document.getElementById('yt2mp3').outerHTML="";
                }
			}

            if(!document.getElementById('yt2mp3')) {
                yt2mp3.addButtons(document);
            }
        },
	};
}
yt2mp3.init();