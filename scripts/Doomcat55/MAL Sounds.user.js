// ==UserScript==
// @name         MAL Sounds
// @namespace    Doomcat55
// @version      0.1
// @description  Add sounds to anime/manga list
// @author       Doomcat55
// @match        *://myanimelist.net/*list/Doomcat55*
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.2/howler.core.min.js
// @require      https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

const soundLinks = new Map([
    ['backgroundMusic', 'https://youtubeinmp3.com/fetch/?video=https://www.youtube.com/watch?v=TG1pRNQAByI'],
    ['clickSound', 'https://youtubeinmp3.com/fetch/?video=https://www.youtube.com/watch?v=NiMJ6FChRfw'],
    ['hoverSound', 'https://youtubeinmp3.com/fetch/?video=https://www.youtube.com/watch?v=5YYvpWvxUaM']
]);

// Settings

const config = {
    audio: {
        format: 'mp3'
    },
    bgm: {
        defaultPosition: 0,
        defaultVolume: 1,
        minutesBeforeReset: 5,
        controls: {
            defaultPosition: {top: 50, left: 300}
        }
    },
    fadeConstant: 2000
};

// jQueryUI

$('head').prepend($('<link rel="stylesheet" type="text/css" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">'));

// Storage

function setValue(key, value, expiration) {
    const expirationTime = expiration ? expiration.getTime() : null;
    const stampedObj = {
        value: value,
        expiration: expirationTime
    };
    GM_setValue(key, JSON.stringify(stampedObj));
}

function getValue(key) {
    const plainValue = GM_getValue(key);
    if (!plainValue) {
        return;
    }
    const stampedObj = JSON.parse(plainValue);
    if (stampedObj.expiration) {
        stampedObj.expiration = new Date(stampedObj.expiration);
    }
    if (stampedObj.expiration && stampedObj.expiration <= new Date()) {
        GM_deleteValue(key);
        return;
    }
    return stampedObj.value;
}

function minutesFromNow(n) {
    const date = new Date();
    date.setMinutes(date.getMinutes() + n);
    return date;
}

// Background

function fadeDuration(volumeDifference, constant=config.fadeConstant) {
    return volumeDifference * constant;
}

const backgroundAudio = new Howl({
    src: [soundLinks.get('backgroundMusic')],
    format: config.audio.format,
    autoplay: function() {
        const isPlaying = getValue('backgroundAudioIsPlaying');
        return (isPlaying !== undefined) ? isPlaying : true;
    }(),
    loop: true,
    onload: setUpBackgroundAudio,
    html5: true
});

function setUpBackgroundAudio() {
    const position = getValue('backgroundAudioPosition') || config.bgm.defaultPosition,
          volume = getValue('backgroundAudioVolume') || config.bgm.defaultVolume,
          fadeDurationTime = fadeDuration(volume);
    backgroundAudioVolume.slider('value', volume);
    backgroundAudio.seek(position);
    backgroundAudio.fade(0, volume, fadeDurationTime);

    backgroundAudioControls.append(backgroundAudioToggle).append(backgroundAudioVolume);
    backgroundAudioControls.hide().appendTo($('body')).fadeIn(fadeDurationTime);
}

function backgroundAudioIsPlaying() {
    return !backgroundAudio._sounds[0]._paused;
}

function toggleBackgroundAudioState() {
    if (backgroundAudioIsPlaying()) {
        backgroundAudio.pause();
        backgroundAudioToggle.button('option', 'icon', 'ui-icon-play');
    } else {
        backgroundAudio.play();
        backgroundAudioToggle.button('option', 'icon', 'ui-icon-pause');
    }
}

GM_registerMenuCommand('Play/pause background music', toggleBackgroundAudioState, 'p');

const backgroundAudioControls = $('<div id="us-sounds-bg-audio-controls">')
    .width(300)
    .addClass('ui-widget-header')
    .css({
        display: 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
        position: 'fixed',
        padding: '.8em',
        'z-index': 100
    })
    .css(getValue('backgroundAudioUIPosition') || config.bgm.controls.defaultPosition)
    .draggable({
        stop: (event, ui) => {
            setValue('backgroundAudioUIPosition', ui.position);
        }
    });
const backgroundAudioToggle = $('<div>')
    .css('margin-right', '20px')
    .button({ icon: backgroundAudio._autoplay ? 'ui-icon-pause' : 'ui-icon-play' });
const backgroundAudioVolume = $('<div>')
    .css({ flex: '1', 'margin-right': '10px' })
    .slider({
        value: backgroundAudio.volume(),
        min: 0,
        max: 1,
        step: 0.01,
        slide: (event, ui) => {
            backgroundAudio.volume(ui.value);
        }
    });

backgroundAudioToggle.click(toggleBackgroundAudioState);

function cleanUpBackgroundAudio() {
    const valueTimeout = minutesFromNow(config.bgm.minutesBeforeReset),
        isPlaying = backgroundAudioIsPlaying();
    setValue(
        'backgroundAudioIsPlaying',
        isPlaying,
        valueTimeout
    );
    setValue(
        'backgroundAudioVolume',
        backgroundAudio.volume(),
        valueTimeout
    );
    if (isPlaying) {
        backgroundAudio.fade(backgroundAudio.volume(), 0, 600);
    }
    setValue(
        'backgroundAudioPosition',
        backgroundAudio.seek(),
        valueTimeout
    );
}

window.addEventListener('beforeunload', cleanUpBackgroundAudio);

// Status buttons

const [hoverAudio, clickAudio] = ['hoverSound', 'clickSound'].map(key => {
    return new Howl({
        src: [soundLinks.get(key)],
        format: config.audio.format,
        preload: true,
        html5: true
    });
});

const statusButtons = document.querySelectorAll('.status-button');

statusButtons.forEach(button => {

    // - Hover

    button.addEventListener('mouseover', () => {
        hoverAudio.play();
    });

    // - Click

    button.addEventListener('click', () => {
        clickAudio.play();
    });
});

console.log(backgroundAudio, hoverAudio, clickAudio);
