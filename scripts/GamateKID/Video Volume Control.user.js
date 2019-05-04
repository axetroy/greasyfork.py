// ==UserScript==
// @name         Video Volume Control
// @namespace    GamateKID
// @version      1
// @author       GamateKID
// @description  Adds volume control with mouse scroll on page video.
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {

    'use strict';

    function secondsElapsed(){
        var endTime = new Date();
        var timeDiff = endTime - startTime; //in ms
        timeDiff /= 1000;
        // return seconds
        return Math.round(timeDiff);
    }

    function onReady(){
        console.log(secondsElapsed());
        if(secondsElapsed()<15){
            window.condition()?setTimeout(onReady,9):window.callback();
        }
    }

    var startTime = new Date();

    window.condition = function () {
        return (document.readyState == 'complete');
    };
    window.callback = function () {

        let VOLUME_STEP = 0.1;

        const style = document.createElement('style');
        document.querySelector('head').appendChild(style);

        initStyles();

        window.condition = function () {
            return (document.getElementsByTagName('video')[0]==null);
        };
        window.callback = function(){
            var video = document.getElementsByTagName('video')[0];

            console.log(video);

            var volume = document.createElement('div');
            volume.className = 'myvolume'

            var container = video.parentNode;
            container.appendChild(volume);

            var isMouseOverVideo = false;

            video.addEventListener('loadeddata', function() {
                volume.innerText = parseInt(video.volume * 100);
                volume.style.display = 'block';
                setTimeout(function() { volume.style.display = 'none' }, 2500);
            }, false);

            video.addEventListener("mouseover", (event) => {
                isMouseOverVideo = true;
            }, false);

            video.addEventListener("mouseleave", (event) => {
                isMouseOverVideo = false;
            }, false);

            document.addEventListener("wheel", (event) => {
                if(isMouseOverVideo){
                    event.preventDefault();
                    volume.style.display = 'block';
                    if (event.deltaY < 0) {
                        if(video.muted) video.muted = false;
                        if(video.volume <= (1-VOLUME_STEP)){
                            video.volume += VOLUME_STEP;
                        }else{
                            video.volume = 1;
                        }
                    }
                    if (event.deltaY > 0) {
                        if(video.volume >= VOLUME_STEP){
                            video.volume -= VOLUME_STEP;
                        }else{
                            video.volume = 0;
                        }
                    }
                    volume.innerText = parseInt(video.volume * 100);
                    setTimeout(function() { volume.style.display = 'none' }, 2500);
                }
            }, false);

            document.addEventListener("keydown", (event) => {

                if (event.keyCode === 37 /*left*/ || event.keyCode === 65 /*left*/ ) {
                    video.currentTime -= 5;
                }

                if(event.keyCode === 39 /*right*/ || event.keyCode === 68 /*right*/){
                    video.currentTime += 5;
                }

            }, false);

        };
        onReady();
        //CSS styles override
        function initStyles() {
            style.innerHTML = `
.myvolume {
display: none;
position: absolute;
color: orangered;
left: 1em;
font-size: xx-large;
font-weight: bold;
top: 0.7em;
}
`;}
    };
    onReady();
})();