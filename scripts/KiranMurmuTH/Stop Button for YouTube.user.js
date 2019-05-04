/**
MIT License

Copyright (c) 2019+, KiranMurmuTH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
**/

// ==UserScript==
// @name            Stop Button for YouTube
// @namespace       io.github.kiranmurmuth.user-script.stop-button-for-youtube
// @version         1.2.2
// @description     A custom 'Stop Button' for YouTube video player, This allows you to end video (ad) or stop live stream by simply clicking on it.
// @author          KiranMurmuTH
// @copyright       2019+, KiranMurmuTH
// @match           *://www.youtube.com/*
// @source          https://kiranmurmuth.github.io/user-script/stop-button-for-youtube
// @license         MIT
// @grant           none
// ==/UserScript==

var _ytp_thread_handler = 0;
var _ytp_thread_stopped = false;
var _ytp_player_main_control = null;
var _ytp_player_main_video = null;
var _ytp_player_stop_button = null;
var _ytp_player_create_button = null;
var _ytp_player_left_control = null;

const _ytp_selector = {
    watch: 'ytd-player.style-scope.ytd-watch-flexy',
    channel: 'ytd-player.style-scope.ytd-channel-video-player-renderer',
    main_control: 'div#movie_player',
    main_video: 'video.video-stream.html5-main-video',
    hide_control: 'ytp-hide-controls',
    stop_button: 'button.ytp-stop-button.ytp-button',
    player_control: 'div.ytp-left-controls'
};

const _ytp_button_property = {
    class_value: 'ytp-stop-button ytp-button',
    title_value: 'Stop or skip video',
    label_value: 'Stop or skip video',
    html5_value: '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-91">' +
    '</use><path class="ytp-svg-fill" d="M 12,12 v 12 h 12 V 12 h -2 z M 12,12 v 12 h 12 V 12 h -2 z" id="ytp-id-91"></path></svg>'
};

function _ytp_player_main_thread() {
    if (_ytp_button_create(_ytp_selector.watch) || _ytp_button_create(_ytp_selector.channel)) {
        console.log("ytp-create-control-button: 'button-name: ytp-stop-button', status: 201 Created");
    }
    _ytp_thread_stopped = true;
    _ytp_thread_handler = 0;
}

function _ytp_player_stop_video(_ytd_player_element) {
    _ytp_player_main_video = document.querySelector(_ytd_player_element + ' ' + _ytp_selector.main_video);
    if (typeof _ytp_player_main_video !== 'undefined' && _ytp_player_main_video) {
        _ytp_player_main_control = document.querySelector(_ytd_player_element + ' ' + _ytp_selector.main_control);
        if (typeof _ytp_player_main_control !== 'undefined' && _ytp_player_main_control) {
            if (_ytp_player_main_control.isAtLiveHead()) {
                _ytp_player_main_control.stopVideo();
                _ytp_player_main_control.classList.remove(_ytp_selector.hide_control);
                console.log("ytp-main-video-player: 'mode-name: ytp-unstarted-mode', status: 200 Ok");
            } else {
                _ytp_player_main_video.currentTime = _ytp_player_main_video.getDuration();
                _ytp_player_main_video.ended = true;
                _ytp_player_main_video.paused = true;
                console.log("ytp-main-video-player: 'mode-name: ytp-ended-mode', status: 200 Ok");
            }
        } else {
            console.log("ytp-main-video-player: 'mode-name: ytp-unstarted-mode', status: 404 Not Found");
        }
    } else {
        console.log("ytp-main-video-player: 'mode-name: ytp-ended-mode', status: 404 Not Found");
    }
}

function _ytp_button_create(_ytd_player_element) {
    _ytp_player_stop_button = document.querySelector(_ytd_player_element + ' ' + _ytp_selector.stop_button);
    if (typeof _ytp_player_stop_button !== 'undefined' && !_ytp_player_stop_button) {
        _ytp_player_left_control = document.querySelector(_ytd_player_element + ' ' + _ytp_selector.player_control);
        if (typeof _ytp_player_left_control !== 'undefined' && _ytp_player_left_control) {
            _ytp_player_create_button = document.createElement('BUTTON');
            if (typeof _ytp_player_create_button !== 'undefined' && _ytp_player_create_button) {
                _ytp_player_create_button.setAttribute('class', _ytp_button_property.class_value);
                _ytp_player_create_button.setAttribute('title', _ytp_button_property.title_value);
                _ytp_player_create_button.setAttribute('aria-label', _ytp_button_property.label_value);
                _ytp_player_create_button.innerHTML = _ytp_button_property.html5_value;
                _ytp_player_create_button.addEventListener('click', function () { _ytp_player_stop_video(_ytd_player_element);});
                _ytp_player_left_control.appendChild(_ytp_player_create_button);
                _ytp_player_stop_button = document.querySelector(_ytd_player_element + ' ' + _ytp_selector.stop_button);
                if (typeof _ytp_player_stop_button !== 'undefined' && _ytp_player_stop_button) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

(function () {
    'use strict';
    if (!_ytp_thread_stopped) {
        _ytp_thread_handler = setInterval(_ytp_player_main_thread, 1000);
    }
})();
