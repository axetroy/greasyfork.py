// ==UserScript==
// @name         115 Player Enhancer
// @namespace    https://greasyfork.org/scripts/376536-115-player-enhancer
// @version      0.4
// @description  115播放器增强
// @author       zaypen
// @match        http*://115.com/*
// @match        http*://*/*
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

/*jslint browser:true*/
/*global GM_config, _, $ */

var defaultOpeningDuration = 125;

var fieldDefs = {
    'OpeningDuration': {
        'label': 'OP 时长',
        'type': 'unsigned int',
        'default': defaultOpeningDuration
    }
};

GM_config.init({
  id: 'GM_config',
  title: '115 Player Enhancer',
  fields: fieldDefs
});

function appendElement(current, next) {
    console.log('add ', next);
    return current.insertAdjacentElement('afterend', next);
}

function registerHotkey(key, fn) {
    document.body.addEventListener('keyup', function(e) {
        if (e.key === key) {
            fn();
        }
    });
}

function retry(fn, interval, times) {
    var ret = fn();
    if (!ret && times) {
        setTimeout(function () {
            retry(fn, interval, times--);
        }, interval);
    }
}

function createButton(onclick, alt) {
    var button = document.createElement('a');
    button.href = 'javascript:;';
    button.className = 'btn-switch';
    button.alt = alt;
    button.onclick = onclick;
    return button;
}

function getPlayer() {
    return $('#js-video')[0];
}

function getNextItem() {
    var items = Array.apply(null, document.querySelectorAll('.video-playlist .vpl-container .item-list li'));
    var remainingItems = _.dropWhile(items, function (item) {
        return item.className !== 'hover';
    });
    return _.head(_.tail(remainingItems));
}

(function() {
    'use strict';

    function main() {
        var video = getPlayer();
        var configration = function() {
            GM_config.open();
        };

        var playButton = document.querySelector('.operate-bar a[btn="play"]');
        var currentButton = playButton;

        var skipOp = function() {
            video.currentTime += GM_config.get('OpeningDuration');
        };
        var skipOpButton = createButton(skipOp, '跳过OP');
        skipOpButton.innerHTML = '<i class="icon-operate iop-playing" style="background-size: 450% 200%;"></i>';
        currentButton = appendElement(currentButton, skipOpButton);
        registerHotkey('End', skipOp);

        var nextItem = getNextItem();
        var playNext = function() {
            window.location.href = nextItem.querySelector('a').href;
        };
        var nextButton = createButton(playNext, '下一集');
        nextButton.innerHTML = '<i class="icon-operate iop-playing" style="background-size: 400% 200%;"></i>';
        nextButton.onclick = playNext;
        if (nextItem) {
            currentButton = appendElement(currentButton, nextButton);
            registerHotkey('PageDown', playNext);
        }

        var configButton = createButton(configration, '设置');
        configButton.innerHTML = '<i class="icon-operate iop-setting"></i>';
        currentButton = appendElement(currentButton, configButton);
        return true;
    }

    function inject() {
        var video = getPlayer();
        if (video) {
            video.addEventListener('playing', main, { once: true });
            return true;
        }
    }

    retry(inject, 500, 10);
})();