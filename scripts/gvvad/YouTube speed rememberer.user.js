// ==UserScript==
// @name           YouTube speed rememberer
// @version        0.3.2
// @description    Remembers playback speed.
// @description:ru Запоминает скорость воспроизведения.
// @author         gvvad
// @match          *.youtube.com/*
// @run-at         document-body
// @license        GPL-3.0+; http://www.gnu.org/licenses/gpl-3.0.txt
// @namespace      https://greasyfork.org/users/100160
// ==/UserScript==

(function() {
    'use strict';
    const PLAYER_SELECTOR = "#movie_player";
    let store = {
        get rate() {
            return parseFloat(localStorage.getItem("pl-rate")) || 1.0;
        },
        set rate(v) {
            localStorage.setItem("pl-rate", v);
        }
    }

    //  set button on video player
    //  _msg - lable string
    let setLabel = function(_msg, _mp) {
        let label = document.querySelector("#_ytp-label");
        if (_msg === undefined) {
            if (label) label.parentElement.removeChild(label);
            return;
        }
        if (label) {
            label.innerText = _msg;
            return;
        }

        let cls = document.querySelector(PLAYER_SELECTOR).querySelector(".ytp-right-controls");

        let span = document.createElement('span');
        span.setAttribute('id','_ytp-label');
        span.setAttribute('class','ytp-button');
        span.onclick = function() {
            _mp.setPlaybackRate(1);
        };
        span.innerText = _msg;

        cls.insertBefore(span, cls.firstChild);
    };

    //  set or remove button
    let setSpeedLabel = function(rate, mp) {
        setLabel((rate==1)? undefined : 'x'+rate, mp);
    };

    //  modificate player object and store play rate
    //  mp - movieplayer object
    let worker = function(mp) {
        if (store.rate != 1.0) {
            mp.setPlaybackRate(store.rate);
            setSpeedLabel(mp.getPlaybackRate(), mp);
        }

        mp.addEventListener("onPlaybackRateChange", function(){
            store.rate = mp.getPlaybackRate();
            setSpeedLabel(mp.getPlaybackRate(), mp);
        });
    };

    let observer = new MutationObserver(function(mRecord){
        let pl = document.querySelector(PLAYER_SELECTOR);
        if (pl) {
            worker(pl);
            this.disconnect();
        }
    });
    observer.observe(document.body, {attributes: false, childList: true, characterData: false});
})();
