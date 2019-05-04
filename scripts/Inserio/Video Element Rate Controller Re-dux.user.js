// ==UserScript==
// @name         Video Element Rate Controller Re-dux
// @namespace    https://github.com/mirnhoj/video-element-playbackrate-setter
// @version      2.2
// @description  Add keyboard shortcuts that will increase/decrease the playback rate for video elements.
// @include      http*://*.youtube.com/*
// @include      http*://*.gfycat.com/*
// @include      http*://*.vimeo.com/*
// @include      https://www.facebook.com/video.php*
// @include      https://www.facebook.com/*/videos/*
// @include      https://www.kickstarter.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/big.js/5.1.2/big.js
// @grant        GM_registerMenuCommand

// ==/UserScript==
/* jshint esversion: 6 */
//
// if you want to extend the functionality of this script to other sites
// besides youtube, add additional @include keys to the metadata block.
//
// if you want to change the default playback rate from 1x, change the line
// "var currentPlaybackRate = 1;" to equal something other than 1, like 1.3 to
// have all videos start playing at an increased speed, or 0.7 to have all
// videos start playing at a decreased speed.
//
// if you want change the granularity of the playback rate adjustment, change
// the line "var speedStep = 0.1;" to equal something other than 0.1, like 0.01
// for more granular adjustments, or 0.25 for less granular adjustments.


// These values are the default values for initialization
let speedStep = 0.1;
let displayTimeMilliSec = 1500;
let enhancerExtention = true;
let pref = 'preference-changed';
let eventName = 'speed';

let timeoutID;
const infobox = document.createElement('h1');
let showDisplay = false;
let keyIncreaseSpeed = ']';
let keyReduceSpeed = '[';
let keyResetSpeed = '\\';

function getVal(variable) {
    let value;
    let storage = (localStorage || (sessionStorage ||
        (window.content.localStorage ? window.content.localStorage : null)));
    try {
        switch (variable) {
        case 'speedStep':
            value = storage.getItem('VERCRspeedStep');
            //                 console.log('Variable "' + variable + '" is ' + value);
            return Number(value);
        case 'displayTimeMilliSec':
            value = storage.getItem('VERCRdisplayTimeMS');
            //                 console.log('Variable "' + variable + " is " + value);
            return Number(value);
        case 'enhancerExtention':
            value = storage.getItem('VERCRenhancerExtention');
            //                 console.log('Variable "' + variable + " is " + value);
            return value;
        case 'pref':
            value = storage.getItem('VERCRpref');
            //                 console.log('Variable "' + variable + " is " + value);
            return value;
        case 'eventName':
            value = storage.getItem('VERCReventName');
            //                 console.log('Variable "' + variable + " is " + value);
            return value;
        case 'keyIncreaseSpeed':
            return value;
        case 'keyReduceSpeed':
            return value;
        case 'keyResetSpeed':
            return value;
        default:
            return null;
        }
    } catch (e) {
        if (e.name === 'NS_ERROR_FILE_CORRUPTED') {
            storage = sessionStorage || null; // set the new storage if fails
            storage.setItem('VERCRspeedStep', speedStep);
            storage.setItem('VERCRdisplayTimeMS', displayTimeMilliSec);
            storage.setItem('VERCRenhancerExtention', enhancerExtention);
            storage.setItem('VERCRpref', pref);
            storage.setItem('VERCReventName', eventName);
        }
    }
}

function setVal(variable, value) {
    let storage = (localStorage || (sessionStorage ||
        (window.content.localStorage ? window.content.localStorage : null)));
    try {
        switch (variable) {
        case 'speedStep':
            storage.setItem('VERCRspeedStep', Number(value));
            console.log(`Setting "${variable}" to ${value}`);
            return value;
        case 'displayTimeMilliSec':
            storage.setItem('VERCRdisplayTimeMS', Number(value));
            console.log(`Setting "${variable}" to ${value}`);
            return value;
        case 'enhancerExtention':
            storage.setItem('VERCRenhancerExtention', value);
            console.log(`Setting "${variable}" to ${value}`);
            return value;
        case 'pref':
            storage.setItem('VERCRpref', value);
            console.log(`Setting "${variable}" to ${value}`);
            return value;
        case 'eventName':
            storage.setItem('VERCReventName', value);
            console.log(`Setting "${variable}" to ${value}`);
            return value;
        default:
            return null;
        }
    } catch (e) {
        if (e.name === 'NS_ERROR_FILE_CORRUPTED') {
            storage = sessionStorage || null; // set the new storage if fails
            storage.setItem('VERCRspeedStep', speedStep);
            storage.setItem('VERCRdisplayTimeMS', displayTimeMilliSec);
            storage.setItem('VERCRenhancerExtention', enhancerExtention);
            storage.setItem('VERCRpref', pref);
            storage.setItem('VERCReventName', eventName);
        }
    }
}

function GMsetup() {
    if (GM_registerMenuCommand) {
        GM_registerMenuCommand('Video Rate Re-dux: Set adjustment rate', () => {
            const curEntry = getVal('speedStep');
            speedStep = prompt('New adjustment rate:\n(e.g., 0.1 = 10% faster)', curEntry);
            if (speedStep !== null) {
                while (isNaN(speedStep)) {
                    speedStep = prompt('Please input a valid number!\n\nNew adjustment rate:\n(e.g., 0.1 = 10% faster)', curEntry);
                }
                setVal('speedStep', speedStep);
            }
        });
        // GM_registerMenuCommand('Video Rate Re-dux: Set keyboard shortcuts', () => {
        //     const curEntry = `${getVal('keyIncreaseSpeed')}, ${getVal('keyReduceSpeed')}, ${getVal('keyResetSpeed')}`;
        //     // W.I.P.
        // });
        GM_registerMenuCommand('Video Rate Re-dux: Set display timeout', () => {
            const curEntry = getVal('displayTimeMilliSec');
            displayTimeMilliSec = prompt('New display timeout length (in milliseconds):', curEntry);
            if (displayTimeMilliSec !== null) {
                while (isNaN(displayTimeMilliSec)) {
                    displayTimeMilliSec = prompt('Please input a valid number!\n\nNew display timeout length (in milliseconds):', curEntry);
                }
                setVal('displayTimeMilliSec', displayTimeMilliSec);
            }
        });
        GM_registerMenuCommand('Video Rate Re-dux: Set extention usage', () => {
            let curEntry = getVal('enhancerExtention');
            curEntry = curEntry === true ? 'Yes' : 'No';
            enhancerExtention = prompt('Are you using Enhancer for YouTube?:', curEntry);
            if (enhancerExtention !== null) {
                if (typeof (enhancerExtention) === 'string') {
                    const regex = /ye?s?|true|i am/i;
                    enhancerExtention = regex.test(enhancerExtention);
                    const enhancerExtentionOutput = regex.test(enhancerExtention) === true ? 'Yes' : 'No';
                    alert(`Extention use has been set to: "${enhancerExtentionOutput}"\n`);
                } else {
                    enhancerExtention = false;
                }
                setVal('enhancerExtention', enhancerExtention);
            }
        });
    }
}

function init() {
    let VERCRspeedStep = localStorage.getItem('VERCRspeedStep');
    let VERCRdisplayTimeMS = localStorage.getItem('VERCRdisplayTimeMS');
    let VERCRenhancerExtention = localStorage.getItem('VERCRenhancerExtention');
    let VERCRpref = localStorage.getItem('VERCRpref');
    let VERCReventName = localStorage.getItem('VERCReventName');
    if (!VERCRspeedStep) {
        VERCRspeedStep = speedStep;
        localStorage.setItem('VERCRspeedStep', Number(VERCRspeedStep));
    }
    if (!VERCRdisplayTimeMS) {
        VERCRdisplayTimeMS = displayTimeMilliSec;
        localStorage.setItem('VERCRdisplayTimeMS', Number(VERCRdisplayTimeMS));
    }
    if (!VERCRenhancerExtention) {
        VERCRenhancerExtention = enhancerExtention;
        localStorage.setItem('VERCRenhancerExtention', VERCRenhancerExtention);
    }
    if (!VERCRpref) {
        VERCRpref = pref;
        localStorage.setItem('VERCRpref', VERCRpref);
    }
    if (!VERCReventName) {
        VERCReventName = 'speed';
        localStorage.setItem('VERCReventName', VERCReventName);
    }
}

function showInfobox(rate) {
    const bigRate = new Big(rate);
    // update rate indicator.
    infobox.innerHTML = `${bigRate}x`;
    // show infobox
    infobox.style.visibility = 'visible';
    // clear out any previous timers and have the infobox hide after the pre-set time period
    window.clearTimeout(timeoutID);
    timeoutID = window.setTimeout(() => {
        infobox.style.visibility = 'hidden';
    }, getVal('displayTimeMilliSec'));
}

function setPlaybackRate(rate, shouldShowInfobox) {
    showDisplay = false;
    // grab the video elements and set their playback rate.
    const videoElement = document.getElementsByTagName('video')[0];
    videoElement.playbackRate = rate;
    // add infobox to dom if it doesn't already exist.
    if (videoElement && !document.getElementById('playbackrate-indicator')) {
        videoElement.parentElement.appendChild(infobox);
    }
    if (shouldShowInfobox) {
        showInfobox(rate);

    }
}

// mimic vlc keyboard shortcuts
function addKeyListener() {
    window.addEventListener('keydown', (event) => {
        const key = event.key;
        const videoElement = document.getElementsByTagName('video')[0];
        let currentPlaybackRate = new Big(videoElement.playbackRate);
        speedStep = new Big(getVal('speedStep'));
        if (key === keyReduceSpeed) {
            // decrease playback rate if '[' is pressed
            //                 currentPlaybackRate -= speedStep;
            currentPlaybackRate = currentPlaybackRate.minus(speedStep);
            //                 console.log('Setting "currentPlaybackRate" to ' + currentPlaybackRate);
            showDisplay = true;
            setPlaybackRate(currentPlaybackRate, showDisplay);
        } else if (key === keyIncreaseSpeed) {
            // increase playback rate if ']' is pressed
            //                 currentPlaybackRate += speedStep;
            currentPlaybackRate = currentPlaybackRate.add(speedStep);
            //                 console.log('Setting "currentPlaybackRate" to ' + currentPlaybackRate);
            showDisplay = true;
            setPlaybackRate(currentPlaybackRate, showDisplay);
        } else if (key === keyResetSpeed) {
            // reset playback rate to default (1) if '\' is pressed
            currentPlaybackRate = 1;
            showDisplay = true;
            setPlaybackRate(currentPlaybackRate, showDisplay);
        }
        if (getVal('enhancerExtention') === true) {
            pref = getVal('pref');
            eventName = getVal('eventName');
            window.postMessage({
                enhancerforyoutube: pref,
                name: eventName,
                value: currentPlaybackRate,
            }, '*');
        }
    });
}

// show the current speed display on the video when mouse wheel is rolled on the speed element if using Enhancer For Youtube
function addWheelListener() {
    const enhancerToolbar = document.getElementById('enhancer-for-youtube-toolbar');
    const enhancerToolbarChildren = enhancerToolbar.children[0].children;
    let speedChild;
    eventName = getVal('eventName');
    for (let i = 0; i < enhancerToolbarChildren.length; i++) {
        if (enhancerToolbarChildren[i].dataset.name === eventName) {
            speedChild = enhancerToolbarChildren[i];
        }
    }
    if (speedChild) {
        speedChild.addEventListener('wheel', (event) => {
            const wDelta = event.wheelDelta < 0 ? 'down' : 'up';
            const videoElement = document.getElementsByTagName('video')[0];
            const currentPlaybackRate = videoElement.playbackRate;
            switch (wDelta) {
            case 'down':
                // currentPlaybackRate -= speedStep; // uncomment to actually modify the playback speed
                showInfobox(currentPlaybackRate);
                break;
            case 'up':
                // currentPlaybackRate += speedStep; // uncomment to actually modify the playback speed
                showInfobox(currentPlaybackRate);
                break;
            default:
                break;
            }
        });
    }
}

function onExtentionReady() {
    addWheelListener();
}

async function onReady() {
    addKeyListener();
    if (getVal('enhancerExtention') === true) {
        let i = 0;
        do {
            await wait(200);
            i++;
        } while (!document.getElementById('enhancer-for-youtube-toolbar') && i < 50);
        onExtentionReady(); // Or setTimeout(onReady, 0); if you want it consistently async
    }
}

function wait(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

function Ext_Detect_NotInstalled(ExtName, ExtID, obj) {
    console.log(`${ExtName} Not Installed`);
    setVal('enhancerExtention', false);
    obj.parentNode.removeChild(obj);
}

function Ext_Detect_Installed(ExtName, ExtID, obj) {
    console.log(`${ExtName} Installed`);
    setVal('enhancerExtention', true);
    obj.parentNode.removeChild(obj);
}

const Ext_Detect = function (ExtName, ExtID) {
    const IsFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    const IsChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    if (IsFirefox === true) {
        const sMoz = document.createElement('script');
        sMoz.onload = function () { Ext_Detect_Installed(ExtName, ExtID, sMoz); };
        sMoz.onerror = function () { Ext_Detect_NotInstalled(ExtName, ExtID, sMoz); };
        sMoz.src = `moz-extension://${ExtID}/resources/youtube-polymer.js`;
        document.body.appendChild(sMoz);
    } else if (IsChrome === true) {
        const sChrome = document.createElement('script');
        sChrome.onload = function () { Ext_Detect_Installed(ExtName, ExtID); };
        sChrome.onerror = function () { Ext_Detect_NotInstalled(ExtName, ExtID); };
        sChrome.src = `chrome-extension://${ExtID}/resources/youtube-polymer.js`;
        document.body.appendChild(sChrome);
    }
};

function main() {
    init();
    //     window.onload = function() { Ext_Detect("Enhancer for YouTube", addonID); };
    GMsetup();
    infobox.setAttribute('id', 'playbackrate-indicator');
    infobox.style.position = 'absolute';
    infobox.style.top = '10%';
    infobox.style.right = '10%';
    infobox.style.color = 'rgba(255, 0, 0, 1)';
    infobox.style.zIndex = '99999'; // ensures that it shows above other elements.
    infobox.style.visibility = 'hidden';
    infobox.style.marginTop = '3%';
    if (document.readyState !== 'loading') {
        onReady(); // Or setTimeout(onReady, 0); if you want it consistently async
    } else {
        document.addEventListener('DOMContentLoaded', onReady);
    }
}

main();
