// ==UserScript==
// @name         R1 Script Support
// @version      0.2.2
// @description  Provide a noice lil platform so that R1 userscripts can work together n reuse shiz for minimal redundancy.
// @author       Limit
// @match        *://*.rewards1.com/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/vex-js/4.1.0/js/vex.combined.min.js
// @namespace    https://greasyfork.org/users/141657
// ==/UserScript==

/////////
/////////
///////// everything here is terribly organized
///////// honestly just ignore all the section header comments if ur actually trying to use this, too much stuff overlaps to categorize anything
/////////
/////////

/*******/

// TODOS:
// X add custom alert popup thingies
// X add navigation tracking
// X add cors token to sp object
// o add user id, uname, country, email, etc. to sp object
// o add wrappers for http api endpoints
// - implement creation of another socket connection, instead of trying to use the one r1 itself creates, in order to have full control over the socket
// - --- add balance, etc. to sp object
// - --- add balance change events, offer credit events, other notification events, etc.
// - --- add chat features and events
// - --- add other stuff and events that are now possible with a full fledged socket connection
// -
// -
// o everything in this script would probably break if u loaded the page while logged out, and then logged in, so look into that and make it *not* happen
// - --- probably fixed, needs more testing

/*******/

// Initialize global sp store
window.sp = {};

// promises for async intialization stuff
var initPromises = [];

// Helper getCookie function
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

// CustomEvent polyfill (https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)
(function () {
    if (typeof window.CustomEvent === "function") return false;
    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();

// Inject vex css (for consistently-styled, non-blocking alerts/popups)
var shiz = document.createElement("link");
shiz.href = "https://cdnjs.cloudflare.com/ajax/libs/vex-js/4.1.0/css/vex-theme-top.min.css";
shiz.type = "text/css";
shiz.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(shiz);
shiz = document.createElement("style");
shiz.type = "text/css";
shiz.innerHTML = 'div.vex{z-index:1002;position:relative}';
document.getElementsByTagName("head")[0].appendChild(shiz);
window.vex.defaultOptions.className = 'vex-theme-top';

// Autosize input script
// Initialized to window.sp.autosizeInput instead of window.autosizeInput
// https://www.npmjs.com/package/autosize-input
// https://wzrd.in/standalone/autosize-input@1.0.2
((window) => {
    //eslint-disable-next-line
    !function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.autosizeInput=t()}}(function(){return function t(e,n,i){function r(f,d){if(!n[f]){if(!e[f]){var a="function"==typeof require&&require;if(!d&&a)return a(f,!0);if(o)return o(f,!0);var u=new Error("Cannot find module '"+f+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[f]={exports:{}};e[f][0].call(l.exports,function(t){var n=e[f][1][t];return r(n?n:t)},l,l.exports,t,e,n,i)}return n[f].exports}for(var o="function"==typeof require&&require,f=0;f<i.length;f++)r(i[f]);return r}({1:[function(t,e,n){function i(t){return"&"+d[t]+";"}function r(t){return t.replace(/\s|<|>/g,i)}function o(){var t=document.createElement("div");return t.id=f,t.style.cssText="display:inline-block;height:0;overflow:hidden;position:absolute;top:0;visibility:hidden;white-space:nowrap;",document.body.appendChild(t),t}var f="__autosizeInputGhost",d={" ":"nbsp","<":"lt",">":"gt"};e.exports=function(t,e){function n(){var e=t.value||t.getAttribute("placeholder")||"",n=document.getElementById(f)||o();n.style.cssText+=d,n.innerHTML=r(e);var i=window.getComputedStyle(n).width;return t.style.width=i,i}var i=window.getComputedStyle(t),d="box-sizing:"+i.boxSizing+";border-left:"+i.borderLeftWidth+" solid red;border-right:"+i.borderRightWidth+" solid red;font-family:"+i.fontFamily+";font-feature-settings:"+i.fontFeatureSettings+";font-kerning:"+i.fontKerning+";font-size:"+i.fontSize+";font-stretch:"+i.fontStretch+";font-style:"+i.fontStyle+";font-variant:"+i.fontVariant+";font-variant-caps:"+i.fontVariantCaps+";font-variant-ligatures:"+i.fontVariantLigatures+";font-variant-numeric:"+i.fontVariantNumeric+";font-weight:"+i.fontWeight+";letter-spacing:"+i.letterSpacing+";margin-left:"+i.marginLeft+";margin-right:"+i.marginRight+";padding-left:"+i.paddingLeft+";padding-right:"+i.paddingRight+";text-indent:"+i.textIndent+";text-transform:"+i.textTransform;t.addEventListener("input",n);var a=n();return e&&e.minWidth&&"0px"!==a&&(t.style.minWidth=a),function(){t.removeEventListener("input",n);var e=document.getElementById(f);e&&e.parentNode.removeChild(e)}}},{}]},{},[1])(1)});
})(window.sp)

// Getter method, cause why not
function spGet(k) {
    return window.sp[k];
}

// Setter method, cause why not
function spSet(k, v) {
    return (window.sp[k] = v);
}

// spEvent(event, detail)
// Dispatches a CustomEvent on window.
// Name of event is ('sp' + event) transformed to camelCase
// Detail is detail
function spEvent(e, d) {
    window.dispatchEvent(new CustomEvent('sp' + e[0].toUpperCase() + e.substr(1), { detail: d }));
}

// ========== FUNCTIONS ==========

// sp.alert(msg)
// Intended to replace native window.alert, since it's kind of ugly, and halts everything on the page when called
spSet('alert', msg => {
    window.vex.dialog.alert({message: msg});
});

// sp.alertHTML(msg)
// Like sp.alert, but parses html in msg
// Make sure you sanitize any potentially dangerous inputs when using
spSet('alertHTML', msg => {
    window.vex.dialog.alert({unsafeMessage: msg});
});

// sp.updateStatus(status)
// only supported settable statuses by r1 rn are online/away,
spSet('updateStatus', status => {
    window.r1Socket.emit('updateUserStatus', {status: status});
});

// ===============================


// ========== HTTP API WRAPPERS ==========

// Returns a promise of various shiz
spSet('getYourSurveys', async () => {
	return (await fetch('/ajax/offers.php?function=getYourSurveys', { headers: { 'x-csrftoken': spGet('csrfToken') } }).then(res => res.json())).data
});

// =======================================


// ========== EVENTS ==========

// spNavigation
// detail: route
// detail ex: '/survey-portal/ys'
// Intercept history.pushState so that an event may be pushed out to scripts when a route change occurs
(function(history){
    var pushState = history.pushState;
    history.pushState = function(state) {
        spEvent('navigation', arguments[2]);
        return pushState.apply(history, arguments);
    };
})(window.history);

// spYsLoaded
// spYsUnloaded
// (prevRoute/route setting)
// userId, csrfToken reset on nav
window.addEventListener('spNavigation', e => {
    spSet('prevRoute', spGet('route'));
    spSet('route', e.detail);

    var userId = getCookie('user_id'),
        csrfToken = getCookie('csrftoken');
    if (userId) spSet('userId', userId);
    if (csrfToken) spSet('csrfToken', csrfToken);

    if (e.detail === '/survey-portal/ys') {
        var observer = new MutationObserver(() => {
            var target = document.getElementsByClassName('ys-api')[0] &&
                document.getElementsByClassName('ys-api')[0].children[0].children[0];
            if (target && target.children && target.children.length > 1) {
                observer.disconnect()
                spEvent('ysLoaded');
            }
        });
        observer.observe(document.getElementById('appBodyWrapper'), { attributes: false, childList: true, subtree: true });
    } else if (spGet('prevRoute') === '/survey-portal/ys') {
        spEvent('ysUnloaded');
    }
});

// spChatLoaded
var chatLoadObserver = new MutationObserver(() => {
    var target = document.getElementsByClassName('chat_input')[0];
    if (target) {
        chatLoadObserver.disconnect()
        spEvent('chatLoaded');
    }
});

var chatLoadInterval = setInterval(() => {
    var chatApp = document.getElementsByClassName('chat_app')[0];
    if (chatApp) {
        clearInterval(chatLoadInterval);
        chatLoadObserver.observe(chatApp, { attributes: false, childList: true, subtree: true });
    }
}, 100);

// spPreMsgSent
// detail = { msg: 'current msg text', setMsg: newMsg => { changes msg to newMsg } }
// spMsgSent
// detail = { msg: 'sent msg text' }
// replace chat input in order to gain complete control
initPromises.push(new Promise((resolve, reject) => {
    window.addEventListener('spChatLoaded', () => {
        var chatInput = window.sp.chatInput = document.getElementsByClassName('chat_input')[0].getElementsByTagName('textarea')[0];
        var fakeInput = window.sp.fakeChatInput = chatInput.cloneNode(true);
        chatInput.style.opacity = 0;
        fakeInput.id = "spFakeChatInput";
        chatInput.parentNode.appendChild(fakeInput);

        document.getElementsByClassName('chat_app')[0].addEventListener('click', () => {
            if (fakeInput.value !== chatInput.value) {
                fakeInput.value = chatInput.value;
                fakeInput.rows = chatInput.rows;
            }
            if (document.activeElement === chatInput) {
                fakeInput.focus();
            }
            setTimeout(() => console.log('AA', document.activeElement), 500);
        });

        fakeInput.addEventListener('input', () => {
            chatInput.value = fakeInput.value;
            chatInput.dispatchEvent(new Event('input'));
            fakeInput.rows = chatInput.rows;
        });

        fakeInput.addEventListener('keydown', e => {
            if (e.keyCode == 13 && !e.shiftKey) {
                e.preventDefault();
                return false;
            }
        });

        fakeInput.addEventListener('keyup', e => {
            if (e.keyCode == 13 && !e.shiftKey) {
                chatInput.value = fakeInput.value;
                spEvent('preMsgSent', {
                        msg: chatInput.value,
                        setMsg: msg => { chatInput.value = msg }
                });
                chatInput.dispatchEvent(new Event('input'));
                var evt = new Event('keyup');
                evt.keyCode = 13;
                chatInput.dispatchEvent(evt);
                fakeInput.value = '';
                fakeInput.rows = 1;
                spEvent('msgSent');
            }
        });
        resolve();
    });
}));

// ============================

// Trigger an spNavigation event with the current route
spEvent('navigation', window.location.pathname);

// Add csrfToken to sp object
spSet('csrfToken', getCookie('csrftoken'));

// Add userId to sp object
spSet('userId', getCookie('user_id'));

// Alert client scripts that everything is initialized and ready
Promise.all(initPromises).then(() => {
    spSet('ready', true);
    spEvent('ready');
});