// ==UserScript==
// @name Youtube Best Video Downloader 2
// @description Download every YouTube video you want and you can download them as Full-HD MP4, FLV, 3GP formats. Easy & Fast!
// @author volkan-k
// @version 9.3
// @date 05-25-2018
// @namespace BVD2
// @match https://www.youtube.com/*
// @require http://code.jquery.com/jquery-1.12.4.min.js
// @grant none
// @license MIT License
// ==/UserScript==
function go() {
	//console.log("go() called"); // for debug
    start();
}

window.addEventListener('spfdone', go, false);
window.addEventListener('DOMContentLoaded', go, false);
window.addEventListener('yt-navigate-finish', go, false);
go();
//setInterval(go,1000);

function start() {
    var lasturl = "";

    function check() {
        if (location.href == lasturl) return;
        lasturl = location.href;
        if (lasturl.indexOf("watch?v=")) removeframe();
    }
    setInterval(check, 1000);

    function removeframe() {
        var frm_div = document.getElementById('EXT_DIV');
        if (frm_div) {
			frm_div.parentElement.removeChild(frm_div);
        }
    }

	function loadStringVar (sVar, mystring) {
		if ( !(/^[&?]/.test(mystring)) ) {
			mystring="?"+mystring;
		}
		return unescape(mystring.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:Error! Hyperlink reference not valid.", "i"), "$1"));
	}

	function loadPageVar (sVar) {
		return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:Error! Hyperlink reference not valid.", "i"), "$1"));
	}

	function get_video_id_from_yturl (yturl) {
		var parser = document.createElement('a');
		parser.href = yturl;
		return loadStringVar("v", parser.search);
	}

    bvd2_btn_onclick = function() {
        var url = window.location.href;
		var VIDEO_ID = get_video_id_from_yturl (url);
		var is_mp3 = confirm("Click OK to download MP3, cancel to download videos with audio!");
		if (is_mp3===true){
			var video_url = 'https://youtubemp3api.com/@api/button/mp3/' + VIDEO_ID;
		} else {
			var video_url = 'https://youtubemp3api.com/@api/button/videos/' + VIDEO_ID;
		}
		removeframe();
        addiframe(video_url, '250');
    };

    getSpan = function(text, className) {
        var _tn = document.createTextNode(text);
        var span = document.createElement("span");
        span.className = className;
        span.appendChild(_tn);
        return span;
    };

    createButton = function() {
        var obj = document.querySelector('#meta-contents #top-row #subscribe-button');
		if (obj === null) {
			var obj = document.querySelector('button.action-panel-trigger-share');
			var old = true;
		} else {
			var old = false;
		}
        if (obj !== null) {
            // check if the button has already been created
            var btnRow = document.getElementById('bestvd2');
            if (btnRow === null) {
				if (old===true) {
					var bestvd2 = document.createElement("span");
					bestvd2.id = "bestvd2";
					bestvd2.className = "";

					var bvd2_btn = document.createElement("button");
					bvd2_btn.className = "yt-uix-button  yt-uix-button-size-default yt-uix-button-opacity yt-uix-tooltip";
					bvd2_btn.setAttribute("data-tooltip-text","Download this video");
					bvd2_btn.style="font-weight: bold;";

					var span_icon = document.createElement("span");
					bvd2_btn.appendChild(span_icon);
					span_icon.outerHTML='<span class="yt-uix-button-icon-wrapper"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="yt-uix-button-icon" style="width:20px;height:20px;background-size:20px 20px;background-repeat:no-repeat;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABG0lEQVRYR+2W0Q3CMAxE2wkYAdiEEWADmIxuACMwCmzABpCTEmRSO7YTQX+ChECV43t2nF7GYeHPuLD+0AKwC/DnWMAp/N5qimkBuAfBdRTF/+2/AV6ZYFUxVYuicAfoHegd6B3oHfhZB+ByF+JyV8FkrAB74pqH3DU5L3iGoBURhdVODIQF4EjEkWLmmhYALOQgNIBcHHke4buhxXAAaFnaAhqbQ5QAOHHkwhZ8balkx1ICCiEBWNZ+CivdB7REHIC2ZjZK2oWklDDdB1NSdCd/Js2PqQMpSIKYVcM8kE6QCwDBNRCqOBJrW0CL8kCYxL0A1k6YxWsANAiXeC2ABOEWbwHAWrwxpzgkmA/JtIqnxTOElmPnjlkc4A3FykAhA42AxwAAAABJRU5ErkJggg==);"></span>';
					bvd2_btn.appendChild(getSpan("Download", ""));
					bvd2_btn.onclick = bvd2_btn_onclick;

					obj.parentNode.insertBefore(bestvd2, obj.parentNode.firstChild);
					bestvd2.appendChild(bvd2_btn);
				} else {
					var bestvd2 = document.createElement("div");
					bestvd2.id = "bestvd2";
					bestvd2.className = "style-scope";

					var bvd2_btn = document.createElement("div");
					bvd2_btn.className = "style-scope bvd2_btn";

					bvd2_btn.style = "background-color: green; border: solid 2px green; border-radius: 2px; color: white; padding: 0px 15px; font-size: 14px; cursor:pointer; height:33px;margin-right: 7px;margin-top: 7px;line-height: 33px;font-weight: 500; display:inline-block;";

					bvd2_btn.appendChild(getSpan("Download", ""));
					bvd2_btn.onclick = bvd2_btn_onclick;

					obj.parentNode.insertBefore(bestvd2, obj);
					bestvd2.appendChild(bvd2_btn);
				}
            }
        }
    };

    function addiframe(src, height) {
        try {
            var pegPlace = document.getElementById('watch-description');
            if (pegPlace === null) {
                pegPlace = document.getElementById('playnav-video-details');
                if (pegPlace === null)
                    pegPlace = document.getElementById('watch7-action-panels');
                if (pegPlace === null)
                    pegPlace = document.getElementById('watch8-secondary-actions');
            }
            var iframe = document.getElementById('EXT_FRAME');
            if (iframe === null) {
                div = CreateIframeDiv(height);
                iframe = CreateIframe(height);
                div.appendChild(iframe);
                ele = document.querySelector('#main>#info');
				if (ele === null ) {
					ele = document.getElementById("watch-header");
				}
                ele.parentNode.insertBefore(div, ele.nextSibling);
				jQuery( "#EXT_FRAME" ).get(0).style.setProperty("display", "inline", "important");
            } 
            src += '&type=Download';
            src += '';
            iframe.setAttribute("src", src);
        } catch (err) {
            console.log(err);
        }
    }

    function CreateIframe(height,id) {
        iframe = document.createElement('iframe');
        iframe.setAttribute("id", "EXT_FRAME");
        iframe.setAttribute("width", "100%");
        iframe.setAttribute("height", height);
        iframe.setAttribute("border", "0");
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("style", "border: 0 none;");
        iframe.setAttribute("sandbox", "allow-scripts allow-popups allow-same-origin");
        return iframe;
    }

    function CreateIframeDiv(height) {
        var div = document.createElement('div');
        div.setAttribute("id", "EXT_DIV");
        div.style.width = '640px';
        div.style.margin = '5px 0px 5px 0px';
        div.style.padding = '0px';
        div.style.height = '90px';
        div.style.overflow = 'visible';
        return div;
    }
    var intervalCheck = setInterval(function() {
        createButton();
    }, 250);
}
