// ==UserScript==
// @name             Zoom Shortcuts
// @namespace        https://greasyfork.org/users/30701-justins83-waze
// @version          2019.04.22.01
// @description      Adds configurable shortcuts for all zoom levels
// @author           JustinS83
// @include          https://www.waze.com/editor*
// @include          https://www.waze.com/*/editor*
// @include          https://beta.waze.com/editor*
// @include          https://beta.waze.com/*/editor*
// @exclude          https://www.waze.com/*user/editor*
// @grant            none
// @require          https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js
// @contributionURL  https://github.com/WazeDev/Thank-The-Authors
// ==/UserScript==

/* global W */
/* ecmaVersion 2017 */
/* global $ */
/* global WazeWrap */
/* eslint curly: ["warn", "multi-or-nest"] */

(function() {
    'use strict';

    var settings = {};

    function bootstrap(tries = 1) {
        if (W &&
            W.map &&
            W.model &&
            W.loginManager.user &&
            $ && WazeWrap.Ready)
            init();
        else if (tries < 1000)
            setTimeout(function () {bootstrap(tries++);}, 200);
    }

    bootstrap();

    function init(){
        loadSettings();
        new WazeWrap.Interface.Shortcut('Zoom0Shortcut', 'Zoom to 0', 'wmezoomshortcuts', 'Zoom Shortcuts', settings.Zoom0Shortcut, function(){W.map.zoomTo(0);}, null).add();
        new WazeWrap.Interface.Shortcut('Zoom1Shortcut', 'Zoom to 1', 'wmezoomshortcuts', 'Zoom Shortcuts', settings.Zoom1Shortcut, function(){W.map.zoomTo(1);}, null).add();
        new WazeWrap.Interface.Shortcut('Zoom2Shortcut', 'Zoom to 2', 'wmezoomshortcuts', 'Zoom Shortcuts', settings.Zoom2Shortcut, function(){W.map.zoomTo(2);}, null).add();
        new WazeWrap.Interface.Shortcut('Zoom3Shortcut', 'Zoom to 3', 'wmezoomshortcuts', 'Zoom Shortcuts', settings.Zoom3Shortcut, function(){W.map.zoomTo(3);}, null).add();
        new WazeWrap.Interface.Shortcut('Zoom4Shortcut', 'Zoom to 4', 'wmezoomshortcuts', 'Zoom Shortcuts', settings.Zoom4Shortcut, function(){W.map.zoomTo(4);}, null).add();
        new WazeWrap.Interface.Shortcut('Zoom5Shortcut', 'Zoom to 5', 'wmezoomshortcuts', 'Zoom Shortcuts', settings.Zoom5Shortcut, function(){W.map.zoomTo(5);}, null).add();
        new WazeWrap.Interface.Shortcut('Zoom6Shortcut', 'Zoom to 6', 'wmezoomshortcuts', 'Zoom Shortcuts', settings.Zoom6Shortcut, function(){W.map.zoomTo(6);}, null).add();
        new WazeWrap.Interface.Shortcut('Zoom7Shortcut', 'Zoom to 7', 'wmezoomshortcuts', 'Zoom Shortcuts', settings.Zoom7Shortcut, function(){W.map.zoomTo(7);}, null).add();
        new WazeWrap.Interface.Shortcut('Zoom8Shortcut', 'Zoom to 8', 'wmezoomshortcuts', 'Zoom Shortcuts', settings.Zoom8Shortcut, function(){W.map.zoomTo(8);}, null).add();
        new WazeWrap.Interface.Shortcut('Zoom9Shortcut', 'Zoom to 9', 'wmezoomshortcuts', 'Zoom Shortcuts', settings.Zoom9Shortcut, function(){W.map.zoomTo(9);}, null).add();
        new WazeWrap.Interface.Shortcut('Zoom10Shortcut', 'Zoom to 10', 'wmezoomshortcuts', 'Zoom Shortcuts', settings.Zoom10Shortcut, function(){W.map.zoomTo(10);}, null).add();

        window.addEventListener("beforeunload", function() {
            saveSettings();
        }, false);
    }

    function loadSettings() {
        var loadedSettings = $.parseJSON(localStorage.getItem("WMEZoomShortcuts_Settings"));
        var defaultSettings = {
            Zoom1Shortcut: '',
            Zoom2Shortcut: '',
            Zoom3Shortcut: '',
            Zoom4Shortcut: '',
            Zoom5Shortcut: '',
            Zoom6Shortcut: '',
            Zoom7Shortcut: '',
            Zoom8Shortcut: '',
            Zoom9Shortcut: '',
            Zoom10Shortcut: '',
            Zoom0Shortcut: ''
        };
        settings = $.extend({}, defaultSettings, loadedSettings)
    }

    function saveSettings(){
        if (localStorage) {
            var localsettings = {
                Zoom1Shortcut: settings.Zoom1Shortcut,
                Zoom2Shortcut: settings.Zoom2Shortcut,
                Zoom3Shortcut: settings.Zoom3Shortcut,
                Zoom4Shortcut: settings.Zoom4Shortcut,
                Zoom5Shortcut: settings.Zoom5Shortcut,
                Zoom6Shortcut: settings.Zoom6Shortcut,
                Zoom7Shortcut: settings.Zoom7Shortcut,
                Zoom8Shortcut: settings.Zoom8Shortcut,
                Zoom9Shortcut: settings.Zoom9Shortcut,
                Zoom10Shortcut: settings.Zoom10Shortcut,
                Zoom0Shortcut: settings.Zoom0Shortcut
            };

            for (var name in W.accelerators.Actions) {
                var TempKeys = "";
                if (W.accelerators.Actions[name].group == 'wmezoomshortcuts') {
                    if (W.accelerators.Actions[name].shortcut) {
                        if (W.accelerators.Actions[name].shortcut.altKey === true)
                            TempKeys += 'A';
                        if (W.accelerators.Actions[name].shortcut.shiftKey === true)
                            TempKeys += 'S';
                        if (W.accelerators.Actions[name].shortcut.ctrlKey === true)
                            TempKeys += 'C';
                        if (TempKeys !== "")
                            TempKeys += '+';
                        if (W.accelerators.Actions[name].shortcut.keyCode)
                            TempKeys += W.accelerators.Actions[name].shortcut.keyCode;
                    } else
                        TempKeys = "-1";
                    localsettings[name] = TempKeys;
                }
            }

            localStorage.setItem("WMEZoomShortcuts_Settings", JSON.stringify(localsettings));
        }
    }
})();
