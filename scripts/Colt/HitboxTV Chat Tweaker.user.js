// ==UserScript==
// @name         HitboxTV Chat Tweaker
// @namespace    https://twitter.com/BitOBytes
// @version      0.4
// @description  Hitbox Chat is nasty; fixed it
// @author       https://twitter.com/BitOBytes
// @include        *://www.hitbox.tv/*
// @grant        none
// ==/UserScript==

var chat, head;

function getStorage() {
    try {
        if (typeof(localStorage) !== 'undefined')
            return localStorage;
        else if ('localStorage' in window && window['localStorage'] !== null)
            return window['localStorage'];
    } catch (e) {
    }
    return null;
}

function hasHtml5Storage() {
    return getStorage() !== null;
}

function getColor() {
    if (hasHtml5Storage()) {
        var temp = getStorage().getItem('casperColor');
        if (temp && temp !== null && temp !== '') {
            return temp.toString();
        }
    }
    return '#FF00FF';
}

function updateColor() {
    if (hasHtml5Storage()) {
        var temp = document.getElementById('casper-input').value.toString();
        if (!temp || temp === null || temp === '') {
            temp = getColor();
        }
        
        getStorage().setItem('casperColor', temp);
        setTimeout(run, 200);
    }
}

function refresh() {
    var temp = document.getElementById('casper-name-style');
    temp.parentNode.removeChild(temp);
    
    setTimeout(run, 200);
}

var addButton = function () {
    var label = document.createElement('label');
    label.setAttribute('class', 'new-switch');

    var span = document.createElement('span');
    span.setAttribute('style', 'float: left;');
    span.innerHTML = 'G Color:';

    var input = document.createElement('input');
    input.setAttribute('id', 'casper-input');
    input.setAttribute('type', 'text');
    input.setAttribute('style', 'margin-left: 4px; width: 45%; height: 20px; float: left; border: 1px solid black !important;');
    input.setAttribute('value', getColor());

    var button = document.createElement('button');
    button.setAttribute('style', 'float: left; width: 40px; height: 25px; padding: 4px !important; margin: 0 0 0 4px; line-height: 0;');
    button.innerHTML = 'Go';
    button.addEventListener('click', updateColor);

    label.appendChild(span);
    label.appendChild(input);
    label.appendChild(button);

    document.getElementById('chatSettingsPopoverId').appendChild(label);
};

var run = function () {
    if (!chat || chat === null) {
        chat = document.getElementsByClassName('chatBody')[0];
    } else {
        var temp = document.getElementById('casper-name-style');
        if (temp && temp !== null) {
            temp.parentNode.removeChild(temp);
        }
        
        var style = document.createElement('style');
        style.setAttribute('id', 'casper-name-style');
        style.innerHTML = '.chatBody .name {color: ' + getColor().toString() + ' !important; font-size: 16px !important; font-weight: bold !important;}';
        
        document.getElementsByTagName('head')[0].appendChild(style);
        return;
    }
    setTimeout(run, 200);
};

var bg = function () {
    if (!head || head === null) {
        head = document.getElementsByTagName('head')[0];
    } else {
        var temp = document.createElement('style');
        temp.setAttribute('type', 'text/css');
        temp.innerHTML = '.chat-messages.normal li{padding:0!important}.chat-messages.normal li>div{padding:2px    20px!important}ul.chatBody li{background:#1a1a1a!important;border-bottom:1px solid #fff}';
        
        head.appendChild(temp);
        return;
    }
    setTimeout(bg, 200);
};

window.onload = function () {
    document.getElementsByClassName('settings-btn')[0].addEventListener('click', function () {
        setTimeout(addButton, 50);
    });
    setTimeout(bg, 50);
    setTimeout(run, 50);
};