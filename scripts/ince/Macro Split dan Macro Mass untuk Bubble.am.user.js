// ==UserScript==
// @name         Macro Split dan Macro Mass untuk Bubble.am
// @namespace    ince
// @Version      1
// @version      2
// @description  Shift is split, Q is macro
// @author       HoaxNya1Up
// @match        http://bubble.am/*
// @grant        Vicky Hernando
// ==/UserScript==
/ jshint -W097 /
'use strict';

var SplitInterval;
var MacroInterval;
var SplitDebounce = false;
var MacroDebounce = false;
$(document).on('keydown', function(input) {
    console.log("got keydown")
    if (input.keyCode == 16) {
        if (SplitDebounce) {
            return;
        }
        SplitDebounce = true;
        SplitInterval = setInterval(function() {
            $("body").trigger($.Event("keydown", {
                keyCode: 32
            }));
            $("body").trigger($.Event("keyup", {
                keyCode: 32
            }));
        }, 0);
    } else if (input.keyCode == 81) {
  if (MacroDebounce) {
            return;
        }
        MacroDebounce = true;
        MacroInterval = setInterval(function() {
            $("body").trigger($.Event("keydown", {
                keyCode: 87
            }));
            $("body").trigger($.Event("keyup", {
                keyCode: 87
            }));
        }, 0);
 }
})

$(document).on('keyup', function(input) {
    if (input.keyCode == 16) {
        SplitDebounce = false;
        clearInterval(SplitInterval);
        return;
    } else if (input.keyCode == 81) {
        MacroDebounce = false;
        clearInterval(MacroInterval);
        return;
    }
})https://greasyfork.org/id/scripts/22519-scrip-and-macro-by-mizadark-gardajacku