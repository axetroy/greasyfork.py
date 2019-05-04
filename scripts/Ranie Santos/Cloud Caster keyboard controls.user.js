// ==UserScript==
// @name         Cloud Caster keyboard controls
// @namespace    https://greasyfork.org/en/users/84694
// @version      2.1.2
// @description  _
// @author       Ranie Santos
// @include      http://www.cloud-caster.com/player/*
// @grant        none
// ==/UserScript==

const runScript = () => {
    const $cc = {
        audio: document.querySelector('#jp_audio_0'),
        fn: {
            volume: function () {
                document.querySelector('#currentVolume').innerText = ($cc.audio.volume * 100).toFixed() + '%';
            },
            playbackRate: function () {
                document.querySelector('#currentPlaybackRate').innerText = 'x ' + $cc.audio.playbackRate.toFixed(1);
            }
        },
        btn: {
            play: document.querySelector('.jp-play'),
            pause: document.querySelector('.jp-pause'),
            jumpBack: document.querySelector('#back30'),
            jumpAhead: document.querySelector('#skip30'),
            slowDown: document.querySelector('#lowerPlaybackRate'),
            speedUp: document.querySelector('#higherPlaybackRate'),
            volumeDown: document.querySelector('#volumeDown'),
            volumeUp: document.querySelector('#volumeUp')
        }
    };

    const styles = 'style="display: inline-block; padding: 0 5px 0 10px; color: #2b5797;"';

    $cc.btn.volumeDown.insertAdjacentHTML('afterend', `<div id="currentVolume" ${styles}></div>`);
    $cc.btn.slowDown.insertAdjacentHTML('afterend', `<div id="currentPlaybackRate" ${styles}></div>`);
    $cc.fn.volume();
    $cc.fn.playbackRate();

    $cc.btn.volumeDown.addEventListener('click', $cc.fn.volume);
    $cc.btn.volumeUp.addEventListener('click', $cc.fn.volume);
    $cc.btn.speedUp.addEventListener('click', $cc.fn.playbackRate);
    $cc.btn.slowDown.addEventListener('click', $cc.fn.playbackRate);

    window.addEventListener('keydown', function (e) {
        if (['Space', 'ArrowLeft', 'ArrowRight', 'BracketLeft', 'BracketRight', 'ArrowDown', 'ArrowUp'].includes(e.code)) {
            e.preventDefault();
        }
        const isPlaying = $cc.btn.play.style.display === 'none';

        switch (e.code) {
        case 'Space':
            $cc.btn[(isPlaying ? 'pause' : 'play')].click();
            break;
        case 'ArrowLeft':
        case 'KeyJ':
            $cc.btn.jumpBack.click();
            break;
        case 'ArrowRight':
        case 'KeyL':
            $cc.btn.jumpAhead.click();
            break;
        case 'BracketLeft':
            $cc.btn.slowDown.click();
            break;
        case 'BracketRight':
            $cc.btn.speedUp.click();
            break;
        case 'ArrowDown':
            $cc.btn.volumeDown.click();
            break;
        case 'ArrowUp':
            $cc.btn.volumeUp.click();
            break;
        }
    });
};

if (['complete', 'loaded', 'interactive'].includes(document.readyState)) {
    runScript();
} else {
    document.addEventListener('DOMContentLoaded', runScript);
}
