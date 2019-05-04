// ==UserScript==
// @name         Youtube - Fix channel links in sidebar recommendations
// @namespace    1N07
// @version      0.3
// @description  Fixes the channel links for the "Up next" and recommendated videos below it on youtube.
// @author       1N07
// @match        https://www.youtube.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    var videoSectionOption;
    var videoSection = GM_getValue("videoSection", true);
    SetVidSecOption();

    addGlobalStyle(`
		ytd-compact-video-renderer #byline:hover {
			text-decoration: underline;
		}
		.loading-channel-link-fix * {
			cursor: progress;
		}
	`);

    setInterval(AddListeners, 200); //fairly stupid way to do this, but hey, it works so this is how I'm doing it for now...

    function AddListeners() {
        $("ytd-compact-video-renderer #byline-container").off(); //take out old listeners
        $("ytd-compact-video-renderer #byline-container").on("mouseup click", function(e){ //add new listeners
            e.preventDefault();
            e.stopPropagation();
            if(e && (e.which == 2 || e.which == 1)) {
                $("body").addClass("loading-channel-link-fix");
                let getUrl = $(this).parentsUntil("#dismissable", "a.yt-simple-endpoint").prop("href") || "error"; //url of the video for the ajax
                if(getUrl != "error") {
                    $.get(getUrl, function(data){
                        let foundChannel = data.split('"/channel/')[1].split('"')[0] || "error"; //finding the channel code from the returned data
                        if(foundChannel != "error") {
                            window.open("https://www.youtube.com/channel/" + foundChannel + (videoSection ? "/videos" : ""),(e.which == 2 ? "_blank" : "_self")); //open channel page using channel code
                        }
                        else {
                            alert("parsing error");
                        }
                    }).fail(function(){
                        alert("load error");
                    }).always(function(){
                        $("body").removeClass("loading-channel-link-fix");
                    });
                }
                else {
                    alert("getUrl error");
                }
            }
        });
    }

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    function SetVidSecOption() {
        GM_unregisterMenuCommand(videoSectionOption);
        videoSectionOption = GM_registerMenuCommand("Fix channel links- videos section (" + (videoSection ? "yes" : "no") + ") -click to change-", function(){
            videoSection = !videoSection;
            GM_setValue("videoSection", videoSection);
            SetVidSecOption();
        });
    }
})();