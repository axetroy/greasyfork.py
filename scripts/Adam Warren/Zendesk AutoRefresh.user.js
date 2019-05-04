// ==UserScript==
// @name         Zendesk AutoRefresh
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Refreshes Zendesk in list view every 15 seconds.
// @author       Adam Warren (thanks to vashidu)
// @match        https://*.zendesk.com/agent/filters/*
// @grant        none
// ==/UserScript==

(function () {
        'use strict';

        //Injected function
        function timerMethod() {
                //Refresh function
                $('.action_button:not(.reload_apps,.pin_control)').click();
                //Log it
                console.log("Zendesk Refresh Triggered");
        }

        //Refresh every 15 seconds
        var timerId = setInterval(timerMethod, 15 * 1000);
})();