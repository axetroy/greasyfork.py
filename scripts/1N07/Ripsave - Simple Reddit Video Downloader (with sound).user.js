// ==UserScript==
// @name         Ripsave - Simple Reddit Video Downloader (with sound)
// @namespace    1N07
// @version      0.1
// @description  Lets you download reddit videos with sound using ripsave
// @author       1N07
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @match        https://www.reddit.com/r/*/comments/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var baseUrl = "https://ripsave.com/download?video=";

    //if there's a video
    if($(".reddit-video-player-root").length > 0) {
        $(".gQtTTf").after($(".gQtTTf").clone().prop("id", "downloadVid"));
        $("#downloadVid i.icon").removeClass("icon-save").addClass("icon-downvote");
        $("#downloadVid span").html('Download');
        $("#downloadVid").click(function(e){
            e.preventDefault();
            let dlUrl = window.location.href.split("#")[0].split("?")[0];
            window.open(baseUrl + dlUrl, "_blank");
        });
    }

})();