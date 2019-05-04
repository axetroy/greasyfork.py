// ==UserScript==
// @name         Dropout.tv/VHX.tv playback speed toggle button
// @namespace    https://foolmoron.io/
// @version      0.4
// @description  Add 1x/1.25x/1.5x/2x speed button to vimeo player (like on Dropout.tv)
// @author       foolmoron
// @include      *embed.vhx.tv*
// @grant        none
// ==/UserScript==

var html = `
<div class="vjs-control vjs-button" style="
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
">1x</div>
`;

(function() {
    'use strict';
    var poll = setInterval(function() {
        var video = document.querySelector('video');
        var container = video && video.parentNode.querySelector('.vjs-play-control') &&video.parentNode.querySelector('.vjs-play-control').parentNode;
        if (video && container) {
            clearInterval(poll);
            video.playbackRate = 1;
            var d = document.createElement('div');
            d.innerHTML = html;
            var button = d.querySelector('div');
            container.appendChild(button);
            button.onclick = e => {
                switch (video.playbackRate) {
                    case 1:
                        video.playbackRate = 1.25;
                        button.textContent = "1.25x";
                    break;
                    case 1.25:
                        video.playbackRate = 1.5;
                        button.textContent = "1.5x";
                    break;
                    case 1.5:
                        video.playbackRate = 2;
                        button.textContent = "2x";
                    break;
                    default:
                        video.playbackRate = 1;
                        button.textContent = "1x";
                }
            };
        }
    }, 500);
})();