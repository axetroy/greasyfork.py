// ==UserScript==
// @name         Trello Rainbow
// @namespace    http://kings-dev.io/
// @version      1.2
// @description  Colorize your trello board
// @author       Jurien Hamaker <jurien@kings-dev.io>
// @match        https://trello.com/b/*/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.1.4/js.cookie.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

    // Your code here...

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */

(function() {
    'use strict';
    let trelloApi = "https://trello.com/1/boards/";
    let currentColorIndex = 0;
    let interval = 1000;
    let colors = ['blue', 'red', 'orange', 'green', 'purple', 'pink', 'lime', 'sky', 'grey'];
    let boardId;
    let changeInterval;

    let startScript = (shortId) => {
        console.log("Starting rotation for shortId: " + shortId);
        if(changeInterval) {
            clearInterval(changeInterval);
        }

        $.ajax({
            type: "GET",
            url: trelloApi + shortId + "?lists=open",
            success: (res) => {
                boardId = res.id;

                changeInterval = setInterval(() => {
                    let token = Cookies.get("token");

                    currentColorIndex += 1;
                    if(currentColorIndex > colors.length) {
                        currentColorIndex = 0;
                    }

                    $.ajax({
                        type: 'PUT',
                        url: trelloApi + boardId,
                        data: {
                            "prefs/background": colors[currentColorIndex],
                            "token": token,
                            "invitationTokens": ""
                        },
                        success: () => {
                            console.log("Changed background to " + colors[currentColorIndex]);
                        }
                    });
                }, interval);
            }
        });
    };

    let currentLocation = window.location.pathname;
    let currentId = currentLocation.split('/')[2];

    let locationChangeInterval = setInterval(() => {
        let currentLocation = window.location.pathname;
        let tempCheckId = currentLocation.split('/')[2];

        if(tempCheckId !== currentId) {
            currentId = tempCheckId;
            console.log("Board changed, new shortId: " + currentId);
            startScript(currentId);
        }
    }, interval);

    startScript(currentId);
})();

