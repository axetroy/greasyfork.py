// ==UserScript==
// @name         Tom Turkleton the Mexican Mechanical Turkey @ TurkerHub
// @namespace    salembeats
// @version      3
// @description  .
// @author       Cuyler Stuwe (salembeats)
// @match        https://turkerhub.com/threads/*/page-*
// @grant        GM_addStyle
// ==/UserScript==

const UPDATE_FLAPS_INTERVAL_MS = 300;
const TURKEY_SIZE_MULTIPLIER = 0.8;
const TURKEY_OPACITY_MULTIPLIER = 0.5;

const TURKEY_SELECTOR_CSS = "div.creature-holder";
const TURKEY_BOTTOM_BEAK_CSS = "div.turkey-beak-bottom";
const MESSAGE_MODULE_CSS = "li.message";
const MESSAGE_USERNAME_CSS = "a.username";

const ANIMATED_TURKEY_CLASS_NAME = "chicken-talk";
const ANIMATED_TURKEY_ANIMATION_NAME = "talking-chicken-animation";
const ANIMATED_TURKEY_ANIMATION_RATE_SECONDS = 0.15;
const ANIMATED_TURKEY_MAX_FLAP_GAPE_PX = 10;

const TTS_SEARCH_TERM = "español";
const TTS_SPEECH_RATE = 1;

let creatureDiv = document.querySelector(TURKEY_SELECTOR_CSS);
let ttsVoices = [];
let readyToTalk = false;
let speechBacklog = [];

function applyTurkeyAccessibilityDefaults() {
    creatureDiv.style.opacity = `${TURKEY_OPACITY_MULTIPLIER}`;
    creatureDiv.style.pointerEvents = "none";
}

function applyTurkeySizeDefaults(scaleFactor) {
    creatureDiv.style.transform = `rotateY(180deg) rotateZ(0deg) scale(${scaleFactor})`;
}

function reactToNewPostNotification() {
    announceLastUsernameOnPage();
}

function initTTS() {
    window.speechSynthesis.cancel();
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = function fillTTSVoicesArray() {
        ttsVoices = window.speechSynthesis.getVoices();
        readyToTalk = true;
        for(let backlogFunction of speechBacklog) {
            backlogFunction();
        }
        speechBacklog = [];
    };
}

function initMutationObserver() {
    let mutationObserver = new MutationObserver( function mutationObserverHandler(mutations) {
        for(let mutation of mutations) {
            if(mutation.type === "childList") {
                for(let addedNode of mutation.addedNodes) {
                    if(addedNode.id === "StackAlerts") {reactToNewPostNotification();}
                    else if(addedNode.classList && addedNode.classList.contains("message")) {reactToNewPostNotifications();}
                }
            }
        }
    });

    mutationObserver.observe(document.body, {childList: true});
}

function announceLastUsernameOnPage() {
    var messageModules = document.querySelectorAll(MESSAGE_MODULE_CSS);
    var lastMessageModuleIndex = messageModules.length-1;
    var lastUsername = messageModules[lastMessageModuleIndex].querySelector(MESSAGE_USERNAME_CSS).innerText;

    var talkFunction = function() {
        var msg = new SpeechSynthesisUtterance(lastUsername);
        msg.voice = ttsVoices.filter(function(voice) {return voice.name.toLowerCase().includes(TTS_SEARCH_TERM);})[0];
        msg.rate = TTS_SPEECH_RATE;
        window.speechSynthesis.speak(msg);
    };

    if(readyToTalk) {
        talkFunction();
    }
    else {
        speechBacklog.push(talkFunction);
    }
}

function initFlapsLogic() {
    setInterval( function updateFlaps() {
        let turkeyDiv = document.querySelector(TURKEY_SELECTOR_CSS);

        if(window.speechSynthesis.speaking && !window.speechSynthesis.paused && !window.speechSynthesis.pending) {
            turkeyDiv.classList.add(ANIMATED_TURKEY_CLASS_NAME);
        }
        else {
            turkeyDiv.classList.remove(ANIMATED_TURKEY_CLASS_NAME);
        }
    }, UPDATE_FLAPS_INTERVAL_MS);
}

function initFlapsStyling() {

    GM_addStyle(`.${ANIMATED_TURKEY_CLASS_NAME} ${TURKEY_BOTTOM_BEAK_CSS} {`+
                `animation: ${ANIMATED_TURKEY_ANIMATION_NAME} ${ANIMATED_TURKEY_ANIMATION_RATE_SECONDS}s infinite linear;`+
                `}`);

    GM_addStyle(`${TURKEY_SELECTOR_CSS}.${ANIMATED_TURKEY_CLASS_NAME} {`+
                `transition: 0.5s all !important;` +
                `transform: scale(5) !important;`+
                `left: 25% !important;` +
                `top: 25% !important;` +
                `opacity: 0.1 !important;` +
                `}`);

    GM_addStyle(`@keyframes ${ANIMATED_TURKEY_ANIMATION_NAME} {`+
                `0% {transform: translateY(0px)}`+
                `50% {transform: translateY(${ANIMATED_TURKEY_MAX_FLAP_GAPE_PX}px)}`+
                `100% {transform: translateY(0px)}`+
                `}`);
}

(function main() {
    initTTS();
    initFlapsStyling();
    initFlapsLogic();
    initMutationObserver();

    announceLastUsernameOnPage();

    applyTurkeyAccessibilityDefaults();
    applyTurkeySizeDefaults(TURKEY_SIZE_MULTIPLIER);
})();