// ==UserScript==
// @name         Bypass YouTube age verification
// @namespace    vvrvhxnk.qpe
// @version      1.4
// @description  Watch restricted YouTube videos without having to log in. Slightly modified version of https://greasyfork.org/en/scripts/375525-youtube-age-verification-bypass, all credit to original author https://greasyfork.org/en/users/221926
// @include      *youtube.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    "use strict";
  
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    const OLD_PLAYER_ID = "player-container";
    const ERROR_SCREEN_ID = "error-screen";
    const NEW_LAYOUT_RELATED_ITEM_TEMPLATE = p => '<div style="display:flex;flex-direction:row;font-family:Roboto,Arial,sans-serif;font-size:10px;margin-bottom:8px;position:relative"><div style="background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border-bottom-color:#000;border-bottom-style:none;border-bottom-width:0;border-image-outset:0;border-image-repeat:stretch stretch;border-image-slice:100%;border-image-source:none;border-image-width:1;border-left-color:#000;border-left-style:none;border-left-width:0;border-right-color:#000;border-right-style:none;border-right-width:0;border-top-color:#000;border-top-style:none;border-top-width:0;display:flex;flex-direction:row;font-family:Roboto,Arial,sans-serif;font-size:10px;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;width:402px;-moz-border-bottom-colors:none;-moz-border-left-colors:none;-moz-border-right-colors:none;-moz-border-top-colors:none"><div style="display:block;flex-basis:auto;flex-grow:0;flex-shrink:0;font-family:Roboto,Arial,sans-serif;font-size:10px;height:94px;margin-right:8px;position:relative;width:168px"> <a href="/watch?v=' + p.id + '" style="bottom:0;color:#0a0a0a;cursor:pointer;display:block;font-family:Roboto,Arial,sans-serif;font-size:10px;height:94px;left:0;margin-left:0;margin-right:0;overflow:hidden;overflow-x:hidden;overflow-y:hidden;position:absolute;right:0;text-decoration:none;text-decoration-color:#0a0a0a;text-decoration-line:none;text-decoration-style:solid;top:0"><div style="background-color:rgba(0,0,0,0);color:#0a0a0a;cursor:pointer;display:block;flex-basis:auto;flex-grow:0;flex-shrink:0;font-family:Roboto,Arial,sans-serif;font-size:10px;left:0;opacity:1;position:absolute;top:47px;transform:matrix(1,0,0,1,0,-47);transition-delay:0s;transition-duration:0s;transition-property:none;transition-timing-function:ease;width:168px"> <img alt="" src="' + p.iurlmq + '" style="background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border-bottom-color:#0a0a0a;border-bottom-style:none;border-bottom-width:0;border-image-outset:0;border-image-repeat:stretch stretch;border-image-slice:100%;border-image-source:none;border-image-width:1;border-left-color:#0a0a0a;border-left-style:none;border-left-width:0;border-right-color:#0a0a0a;border-right-style:none;border-right-width:0;border-top-color:#0a0a0a;border-top-style:none;border-top-width:0;color:#0a0a0a;cursor:pointer;display:block;font-family:Roboto,Arial,sans-serif;font-size:10px;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;max-height:none;max-width:100%;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;-moz-border-bottom-colors:none;-moz-border-left-colors:none;-moz-border-right-colors:none;-moz-border-top-colors:none"></div><div style="background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border-bottom-color:#0a0a0a;border-bottom-style:none;border-bottom-width:0;border-image-outset:0;border-image-repeat:stretch stretch;border-image-slice:100%;border-image-source:none;border-image-width:1;border-left-color:#0a0a0a;border-left-style:none;border-left-width:0;border-right-color:#0a0a0a;border-right-style:none;border-right-width:0;border-top-color:#0a0a0a;border-top-style:none;border-top-width:0;color:#0a0a0a;cursor:pointer;display:block;font-family:Roboto,Arial,sans-serif;font-size:10px;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;-moz-border-bottom-colors:none;-moz-border-left-colors:none;-moz-border-right-colors:none;-moz-border-top-colors:none"><div style="align-items:center;background-color:rgba(0,0,0,0.8);border-bottom-left-radius:2px;border-bottom-right-radius:2px;border-top-left-radius:2px;border-top-right-radius:2px;bottom:0;color:#ffffff;cursor:pointer;display:flex;flex-direction:row;font-family:Roboto,Arial,sans-serif;font-size:12px;font-weight:500;letter-spacing:.5px;line-height:12px;margin-bottom:4px;margin-left:4px;margin-right:4px;margin-top:4px;padding-bottom:2px;padding-left:4px;padding-right:4px;padding-top:2px;position:absolute;right:0"> <span style="background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border-bottom-color:#fff;border-bottom-style:none;border-bottom-width:0;border-image-outset:0;border-image-repeat:stretch stretch;border-image-slice:100%;border-image-source:none;border-image-width:1;border-left-color:#fff;border-left-style:none;border-left-width:0;border-right-color:#fff;border-right-style:none;border-right-width:0;border-top-color:#fff;border-top-style:none;border-top-width:0;color:#fff;cursor:pointer;font-family:Roboto,Arial,sans-serif;font-size:12px;font-weight:500;letter-spacing:.5px;line-height:12px;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;-moz-border-bottom-colors:none;-moz-border-left-colors:none;-moz-border-right-colors:none;-moz-border-top-colors:none">' + p.duration + '</span></div></div> </a></div> <a href="/watch?v=' + p.id + '" style="color:#0a0a0a;cursor:pointer;display:block;flex-basis:0;flex-grow:1;flex-shrink:1;font-family:Roboto,Arial,sans-serif;font-size:10px;min-width:0;padding-right:24px;text-decoration:none;text-decoration-color:#0a0a0a;text-decoration-line:none;text-decoration-style:solid"><h3 style="background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border-bottom-color:#0a0a0a;border-bottom-style:none;border-bottom-width:0;border-image-outset:0;border-image-repeat:stretch stretch;border-image-slice:100%;border-image-source:none;border-image-width:1;border-left-color:#0a0a0a;border-left-style:none;border-left-width:0;border-right-color:#0a0a0a;border-right-style:none;border-right-width:0;border-top-color:#0a0a0a;border-top-style:none;border-top-width:0;color:#0a0a0a;cursor:pointer;font-family:Roboto,Arial,sans-serif;font-size:11.7px;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;-moz-border-bottom-colors:none;-moz-border-left-colors:none;-moz-border-right-colors:none;-moz-border-top-colors:none"> <span style="background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border-bottom-color:#0a0a0a;border-bottom-style:none;border-bottom-width:0;border-image-outset:0;border-image-repeat:stretch stretch;border-image-slice:100%;border-image-source:none;border-image-width:1;border-left-color:#0a0a0a;border-left-style:none;border-left-width:0;border-right-color:#0a0a0a;border-right-style:none;border-right-width:0;border-top-color:#0a0a0a;border-top-style:none;border-top-width:0;color:#0a0a0a;cursor:pointer;display:-webkit-box;font-family:Roboto,Arial,sans-serif;font-size:14px;font-weight:500;line-height:16px;margin-bottom:4px;margin-left:0;margin-right:0;margin-top:0;max-height:32px;overflow:hidden;overflow-x:hidden;overflow-y:hidden;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-overflow:ellipsis;white-space:normal;-moz-border-bottom-colors:none;-moz-border-left-colors:none;-moz-border-right-colors:none;-moz-border-top-colors:none;-moz-box-orient:vertical">' + p.title + '</span></h3><div style="color:#0a0a0a;cursor:pointer;display:flex;flex-direction:column;font-family:Roboto,Arial,sans-serif;font-size:10px"><div style="background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border-bottom-color:#0a0a0a;border-bottom-style:none;border-bottom-width:0;border-image-outset:0;border-image-repeat:stretch stretch;border-image-slice:100%;border-image-source:none;border-image-width:1;border-left-color:#0a0a0a;border-left-style:none;border-left-width:0;border-right-color:#0a0a0a;border-right-style:none;border-right-width:0;border-top-color:#0a0a0a;border-top-style:none;border-top-width:0;color:#0a0a0a;cursor:pointer;display:flex;flex-direction:column;flex-wrap:wrap;font-family:Roboto,Arial,sans-serif;font-size:10px;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;-moz-border-bottom-colors:none;-moz-border-left-colors:none;-moz-border-right-colors:none;-moz-border-top-colors:none"><div style="align-items:center;background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border-bottom-color:#0a0a0a;border-bottom-style:none;border-bottom-width:0;border-image-outset:0;border-image-repeat:stretch stretch;border-image-slice:100%;border-image-source:none;border-image-width:1;border-left-color:#0a0a0a;border-left-style:none;border-left-width:0;border-right-color:#0a0a0a;border-right-style:none;border-right-width:0;border-top-color:#0a0a0a;border-top-style:none;border-top-width:0;color:#0a0a0a;cursor:pointer;display:flex;flex-direction:row;flex-wrap:wrap;font-family:Roboto,Arial,sans-serif;font-size:13px;font-weight:400;line-height:18px;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;max-height:18px;max-width:100%;overflow:hidden;overflow-x:hidden;overflow-y:hidden;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-transform:none;-moz-border-bottom-colors:none;-moz-border-left-colors:none;-moz-border-right-colors:none;-moz-border-top-colors:none"><div style="align-items:center;background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border-bottom-color:#0a0a0a;border-bottom-style:none;border-bottom-width:0;border-image-outset:0;border-image-repeat:stretch stretch;border-image-slice:100%;border-image-source:none;border-image-width:1;border-left-color:#0a0a0a;border-left-style:none;border-left-width:0;border-right-color:#0a0a0a;border-right-style:none;border-right-width:0;border-top-color:#0a0a0a;border-top-style:none;border-top-width:0;color:#0a0a0a;cursor:pointer;display:flex;flex-direction:row;font-family:Roboto,Arial,sans-serif;font-size:13px;font-weight:400;line-height:18px;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;max-width:100%;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-transform:none;-moz-border-bottom-colors:none;-moz-border-left-colors:none;-moz-border-right-colors:none;-moz-border-top-colors:none"><div style="color:#606060;cursor:pointer;display:flex;font-family:Roboto,Arial,sans-serif;font-size:13px;font-weight:400;line-height:18px;overflow:hidden;overflow-x:hidden;overflow-y:hidden;text-overflow:ellipsis;text-transform:none;white-space:nowrap">' + p.author + '</div></div></div><div style="background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border-bottom-color:#606060;border-bottom-style:none;border-bottom-width:0;border-image-outset:0;border-image-repeat:stretch stretch;border-image-slice:100%;border-image-source:none;border-image-width:1;border-left-color:#606060;border-left-style:none;border-left-width:0;border-right-color:#606060;border-right-style:none;border-right-width:0;border-top-color:#606060;border-top-style:none;border-top-width:0;color:#606060;cursor:pointer;display:flex;flex-wrap:wrap;font-family:Roboto,Arial,sans-serif;font-size:13px;font-weight:400;line-height:18px;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;max-height:36px;max-width:100%;overflow:hidden;overflow-x:hidden;overflow-y:hidden;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-transform:none;-moz-border-bottom-colors:none;-moz-border-left-colors:none;-moz-border-right-colors:none;-moz-border-top-colors:none"> <span style="background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border-bottom-color:#606060;border-bottom-style:none;border-bottom-width:0;border-image-outset:0;border-image-repeat:stretch stretch;border-image-slice:100%;border-image-source:none;border-image-width:1;border-left-color:#606060;border-left-style:none;border-left-width:0;border-right-color:#606060;border-right-style:none;border-right-width:0;border-top-color:#606060;border-top-style:none;border-top-width:0;color:#606060;cursor:pointer;display:block;font-family:Roboto,Arial,sans-serif;font-size:13px;font-weight:400;line-height:18px;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-transform:none;-moz-border-bottom-colors:none;-moz-border-left-colors:none;-moz-border-right-colors:none;-moz-border-top-colors:none">' + p.short_view_count_text + '</span></div></div></div> </a></div></div>';
    const OLD_LAYOUT_RELATED_ITEM_TEMPLATE = p => '<div class="video-list-item related-list-item show-video-time related-list-item-compact-video"><div class="content-wrapper"><a href="/watch?v=' + p.id + '" class="content-link spf-link yt-uix-sessionlink spf-link"><span dir="ltr" class="title">' + p.title + '</span><span class="stat attribution"><span class="">' + p.author + '</span></span><span class="stat view-count">' + p.short_view_count_text + '</span></a></div><div class="thumb-wrapper"><a href="/watch?v=' + p.id + '" class="thumb-link spf-link yt-uix-sessionlink" tabindex="-1" rel=" spf-prefetch nofollow" aria-hidden="true"><span class="yt-uix-simple-thumb-wrap yt-uix-simple-thumb-related"><img alt="" src="' + p.iurlmq + '" style="top: 0px" aria-hidden="true" width="168" height="94"><span class="video-time">' + p.duration + '</span></span></a></div></div>';

    let player = null;
    let related = null;
    let currentVideoId = null;

    // General
    function getParameters(str) {
        const r = {};
        str.split("&").forEach(str => {
            const split = str.split("=");
            r[split[0]] = decodeURIComponent(split[1]);
        });
        return r;
    }

    // DOM
    function removeNode(n) {
        if(n != null && n.parentNode != null) { n.parentNode.removeChild(n); }
    }

    function asyncQuerySelector(querySelector, token) {
        return new Promise((resolve, reject) => {
            const ival = setInterval(function() {
                const e = document.querySelector(querySelector);
                if (e != null) { clearInterval(ival); resolve(e); }
            }, 100);
            (token || {}).cancel = () => { clearInterval(ival); reject(); }
        });
    }

    // YouTube
    function getVideoId() {
        return getParameters(location.search.substr(1)).v;
    }

    // App
    function createPlayer(videoId, parentNode, id, className) {
        addGlobalStyle('#player { display: contents !important; }');
        player = document.createElement("iframe");
        player.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&showinfo=0&rel=0";
        player.id = id;
        player.className = className;
        player.style = "border:0;width:100%;height:100%";
        player.setAttribute('allowfullscreen', "");
        parentNode.appendChild(player);
    }

    function showRelatedVideos(videoId, parentNode, itemTemplate) {
        return fetch("https://www.youtube.com/get_video_info?asv=3&video_id=" + videoId).then(response => response.text()).then(text => {
            let innerHTML = "";
            getParameters(text).rvs.split(",").forEach(e => {
                const parameters = getParameters(e.replace(/\+/g, " "));
                Object.keys(parameters).map(function(key) { parameters[key] = unescape(parameters[key]); });
                if (parameters.title != null) {
                    parameters.duration = Math.floor(parameters.length_seconds / 60) + ':' + ('0' + (parameters.length_seconds % 60)).substr(-2);
                    innerHTML += itemTemplate(parameters);
                }
            });
            related = document.createElement("div");
            related.innerHTML = innerHTML;
            parentNode.appendChild(related);
          parentNode.appendChild(related);
        });
    }

    function reset() {
        removeNode(player);
        removeNode(related);
        (document.getElementById(OLD_PLAYER_ID) || {style:{}}).style.display = "";
        (document.getElementById(ERROR_SCREEN_ID) || {style:{}}).style.display = "";
    }

    const restrictedVideoIds = [];
    function checkAndUnrestrict() {
        const videoId = getVideoId();
        if (videoId == currentVideoId) { return; }
        currentVideoId = videoId;
        reset(); // useful when coming back from a restricted video
        if (videoId == null) { return; }
        // tokens
        const newLayoutToken = {cancel:()=>{}};
        const oldLayoutToken = {cancel:()=>{}};
        // new layout
        asyncQuerySelector("#" + ERROR_SCREEN_ID, newLayoutToken).then((errorScreen) => {
            oldLayoutToken.cancel();
            // signInButton may not have been recreated while navigating back/forward, check array too
            const signInButton = document.querySelector("#error-screen #info yt-button-renderer");
            if (signInButton == null && restrictedVideoIds.indexOf(videoId) == -1) { return; }
            if (signInButton != null) { restrictedVideoIds.push(videoId); }
            removeNode(signInButton); // avoid false positives
            // pause video (useful when coming back from an unrestricted video)
            document.querySelectorAll("video").forEach(e => e.pause());
            // player
            const oldPlayer = document.getElementById(OLD_PLAYER_ID);
            createPlayer(videoId, oldPlayer.parentNode, oldPlayer.id, oldPlayer.className);
            player.src += "&fs=1";
            // related
            const rs = document.getElementById("related-skeleton");
            if (rs != null && rs.parentNode != null) {
                rs.style.display = "none";
                showRelatedVideos(videoId, rs.parentNode, NEW_LAYOUT_RELATED_ITEM_TEMPLATE);
            }
            // remove/hide blocking elements
            document.querySelectorAll("[player-unavailable]").forEach(e => e.removeAttribute("player-unavailable"));
            removeNode(document.querySelector("#player.skeleton"));
            oldPlayer.style.display = "none";
            errorScreen.style.display = "none";
        }).catch(()=>{});
        // old layout
        asyncQuerySelector("#watch7-sidebar-modules", oldLayoutToken).then((relatedParent) => {
            newLayoutToken.cancel();
            if (!document.getElementById("watch7-player-age-gate-content")) { return; }
            const playerParentNode = document.getElementById("player-unavailable");
            playerParentNode.innerHTML = "";
            createPlayer(videoId, playerParentNode, "", "");
            showRelatedVideos(videoId, relatedParent, OLD_LAYOUT_RELATED_ITEM_TEMPLATE).then(() => { related.className = "video-list" });
        }).catch(()=>{});
    }

    // new layout; getEventListeners(window)
    addEventListener("yt-navigate-start", reset);
    addEventListener("yt-navigate-finish", checkAndUnrestrict);
    // old layout; getEventListeners(window)
    addEventListener("spfdone", checkAndUnrestrict);
    // fallback
    setTimeout(checkAndUnrestrict, 100);
    setTimeout(checkAndUnrestrict, 2000);
    (new MutationObserver(checkAndUnrestrict)).observe(document.getElementsByTagName("title")[0] || document, {childList: true, subtree: true});
})();