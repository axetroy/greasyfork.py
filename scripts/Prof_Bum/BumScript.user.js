// ==UserScript==
// @name         BumScript
// @namespace    http://tampermonkey.net/
// @version      1.6.2
// @description  Show images/video directly in chat!
// @author       Bum
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @match        https://www.twitch.tv/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var SupportedImageFormats = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    var SupportedVideoFormats = [".mp4",".webm"];

    var maxHeight = "240";
    var maxWidth = "320";

    // Select the node that will be observed for mutations
    var targetNode = document.getElementById('root');

    // Options for the observer (which mutations to observe)
    var config = { attributes: false, childList: true, subtree: true };

    function isSupportedImage(url) {
        var length = SupportedImageFormats.length;
        while(length--) {
            if (url.indexOf(SupportedImageFormats[length])!=-1) {
                return true;
            }
        }
        return false;
    }
    function isSupportedVideo(url) {
        var length = SupportedVideoFormats.length;
        while(length--) {
            if (url.indexOf(SupportedVideoFormats[length])!=-1) {
                return true;
            }
        }
        return false;
    }

    function alterNode(node) {
        var thisUrl = $(node).text();
        var parentToScroll = $(node).parent().parent().parent().parent();
        if (isSupportedImage(thisUrl)){
            $(node).html("<br><img src='" + thisUrl + "' width='" + maxWidth +"px'/>");
            parentToScroll.animate({scrollTop:parentToScroll.scrollTop() + 500}, 'slow');
        }
        else if (thisUrl.indexOf("www.youtube") > 0 ){
           $(node).html('<br><iframe width="'+ maxWidth +'" height="'+ maxHeight +'" src="' + thisUrl.replace("watch?v=", "embed/") +'"></iframe>');
            parentToScroll.animate({scrollTop:parentToScroll.scrollTop() + 500}, 'slow');
        }
        else if (isSupportedVideo(thisUrl)){
           $(node).html('<br><video width="'+ maxWidth +'" height="'+ maxHeight +'" controls autoplay muted><source src="'+thisUrl +'" type="video/mp4"></video>');
            parentToScroll.animate({scrollTop:parentToScroll.scrollTop() + 500}, 'slow');
        }
        else if (thisUrl.indexOf("https://gyazo.com") > -1 ){
           $(node).html("<br><img src='" + thisUrl.replace("https://gyazo.com", "https://i.gyazo.com") +".png' width='" + maxWidth +"px'/>");
            parentToScroll.animate({scrollTop:parentToScroll.scrollTop() + 500}, 'slow');
        }
        else if (thisUrl.indexOf("imgur") > -1){
            var imgurId = thisUrl.match('a\/([a-zA-Z0-9_.-]*)')[1];
            $(node).html('<div style="width:200"><blockquote class="imgur-embed-pub" lang="en" data-id="a/'+ imgurId +'"><a href="//imgur.com/'+ imgurId +'" ></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script></div>');
            parentToScroll.animate({scrollTop:parentToScroll.scrollTop() + 500}, 'slow');
        }
        else if (thisUrl.indexOf("clips.twitch.tv") > -1){
            var clipId = thisUrl.match('.tv\/(.*)')[1];
            $(node).html('<iframe src="https://clips.twitch.tv/embed?clip='+clipId+'" frameborder="0" allowfullscreen="true" height="'+maxHeight+'" width="'+maxWidth+'"></iframe>');
            parentToScroll.animate({scrollTop:parentToScroll.scrollTop() + 500}, 'slow');
        }
    }
    // Callback function to execute when mutations are observed
    var callback = function(mutationsList, observer) {
        for(var mutation of mutationsList) {
            mutation.addedNodes.forEach(function(node) {
                if (node.classList != undefined && node.classList.contains('link-fragment')) {
                    alterNode(node);
                }
                if (node.querySelectorAll){
                    node.querySelectorAll('.link-fragment').forEach(function(node) {
                        alterNode(node);
                    })
                    node.querySelectorAll('.text-fragment').forEach(function(node) {
                        alterNode(node);
                    })
                }
            });
        }
    };

    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
})();