// ==UserScript==
// @name     Case converter
// @version  0.2
// @author   Noneangel
// @description swap the case of the selected text
// @include http://*
// @include https://*
// @namespace https://gist.github.com/Noneangel/a865645a27e04fbff2843df560ca1dbb
// ==/UserScript==
/* do modify */
// test if one of the key code is pressed
var keyCodes = [114]; //F3
// with the following modifier key pressed
//(note : set to false if modifier should not be pressed)
var modifierKey = {
    shiftKey: true
}; // {altKey: false, shiftKey: true, ctrlKey = false}
//which transformation to apply to the text
var transform = invertCase; // invertCase, upperCase, lowerCase


/* modify at your own risk */

/* case transformation */
function invertCase(text) {
    return text.split('').map(function(c) {
        return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()
    }).join('');
}

function upperCase(text) {
    return text.toUpperCase();
}

function lowerCase(text) {
    return text.toLowerCase();
}

/* get active selection */
//source https://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text
function getSelectionText(activeEl) {
    var text = "";
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
        (activeElTagName == "textarea") || (activeElTagName == "input" &&
            /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
        (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}

/* repalce selected text with a replacementText */
//source https://stackoverflow.com/questions/3997659/replace-selected-text-in-contenteditable-div
function replaceSelectedText(replacementText) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(replacementText));
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = replacementText;
    }
}
// same but for textarea only
function setInputSelection(elem, text) {
    var activeElTagName = elem ? elem.tagName.toLowerCase() : null;
    if (
        (activeElTagName == "textarea") || (activeElTagName == "input" &&
            /^(?:text|search|password|tel|url)$/i.test(elem.type)) &&
        (typeof elem.selectionStart == "number")
    ) {
        var indiceStart = elem.selectionStart;
        var indiceEnd = elem.selectionEnd;
        var s = elem.selectionStart;
        var e = elem.selectionEnd;
        elem.value = elem.value.substring(0, s) + text + elem.value.substring(e);
        elem.setSelectionRange(indiceStart, indiceEnd);
    }
}

/* test if obj has the every member of option with the same value */
function validate(option, obj) {
    for (var member in option) {
        if (option[member] !== obj[member]) {
            return false;
        }
    }
    return true;
}

function into(e, array) {
    return array.reduce(function(acc, val) {
        return acc || (e == val)
    }, false);
}


function shortcut(e) {
    if (validate(modifierKey, e) && into(e.keyCode, keyCodes)) {
        var id = document.activeElement;
        var selection = getSelectionText(id);
        var transformed = transform(selection);
        replaceSelectedText(transformed);
        setInputSelection(id, transformed);
        e.stopPropagation();
        e.preventDefault();
    }
}

document.addEventListener('keydown', shortcut, true);