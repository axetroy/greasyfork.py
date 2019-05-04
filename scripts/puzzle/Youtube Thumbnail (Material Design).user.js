// ==UserScript==
// @name         Youtube Thumbnail (Material Design)
// @namespace    Youtube.com
// @version      1.2.7
// @description  Adds clickable preview thumbnail next to the vids title. When clicked opens new window with original size image from thumbnail (will pick the maximum available size). Script works with youtube material design only.
// @author       Puzzle
// @include      *://*.youtube.com/*
// @match        *://*.youtube.com/*
// @noframes
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function buildApiRequest(params,fn) {
        var videoAPI = new URL("https://www.googleapis.com/youtube/v3/videos");
        var defaultParams = {
            key: 'AIzaSyAD1EeHpZCEVdmEjBwd6QB3K_4Q_HEgS1s',
            part: 'statistics'
        };

        params = Object.assign({},defaultParams,params);

        Object.keys(params).forEach(key => videoAPI.searchParams.append(key, params[key]));

        fetch(videoAPI,{method: 'get'})
            .then(function(res) {
            return res.json();
        })
            .then(function(data) {
            fn(data);
        })
    }

    function waitUntilExists(selector,fn) {
        var el = document.querySelector(selector);
        if (el) {
            fn(el);
            return;
        }
        setTimeout(function() {
            waitUntilExists(selector,fn);
        },100);
    }

    function createStyle(parent) {
        var style = `
.title.ytd-video-primary-info-renderer { max-height: initial !important; }
/* profile image author */
#avatar.ytd-video-owner-renderer {  width: 88px; height: 88px;}
#avatar.ytd-video-owner-renderer #img { width: 100%; }
`;
        parent.insertAdjacentHTML('afterEnd',`<style>${style}</style>`);
    }


    function createImage(parent) {
        var	img_type = ['maxres','standard','high','medium','default'],
            video_id = window.location.href.match(/watch\?.*v=([\w-]+)/)[1];

        var img = document.getElementById('myThumb');
        if (img) img.src = '';
        else {
            img = new Image();
            img.id = 'myThumb';
            img.style = 'display:none;margin-right:10px;height:90px;cursor:pointer;float:left;';
            parent.insertAdjacentElement('afterBegin',img);
        }

        buildApiRequest({
            id:video_id,
            fields:'items/snippet/thumbnails',
            part: 'snippet'
        }, function(r) {
            r = r.items[0].snippet.thumbnails;
            for (let i=0; i < img_type.length; i++) {
                if (r[img_type[i]]) {
                    img.src = r[img_type[i]].url;
                    img.style.display = 'inline-block';
                    break;
                }
            }
        })

        img.onclick = function() { window.open(img.src); };

    }

    createStyle(document.body);

    document.addEventListener('yt-navigate-finish',function(e) {
        if (location.pathname == '/watch') {
            waitUntilExists('#top-row ytd-video-owner-renderer',createImage);
        }
    });
})();