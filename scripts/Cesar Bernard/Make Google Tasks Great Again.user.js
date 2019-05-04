// ==UserScript==
// @name         Make Google Tasks Great Again
// @author       CennoxX
// @contact      cesar.bernard@gmx.de
// @namespace    https://greasyfork.org/users/21515
// @description  Shows the embedded Google Tasks page on an own page
// @version      0.5
// @match        https://tasks.google.com/*
// @match        https://gsuite.google.com/learning-center/products/apps/keep-track-of-tasks/
// @grant        GM.addStyle
// @noframes
// @license      MIT
// ==/UserScript==
(function() {
    'use strict';
    //redirect to correct page
    if (document.URL == "https://gsuite.google.com/learning-center/products/apps/keep-track-of-tasks/#!/" || (document.getElementsByTagName("div")[0].getAttribute("id") == "af-error-container")) {
        window.location.replace("https://tasks.google.com/embed/?origin=https://mail.google.com");
    } else {
        GM.addStyle("body{display:inherit!important}");//display body
        GM.addStyle(".CTxcDf{width:100%}");//add task full width
        GM.addStyle(".oXBvod{width:100%}");//done tasks full width
        GM.addStyle(".Sze5Fc{width:100%}");//done tasks full width
        GM.addStyle(".G4zhSc{width:35%}");//left column width 35 %
        GM.addStyle(".llhEMd{width:65%;left:auto}");//right column width 65%, not till the left border of the page
        GM.addStyle(".Nm5pwe{width:236px}");//set width of option box for tasks
        GM.addStyle(".gv11ue .mUbCce:nth-child(1){transform: rotate(180deg);}");//set arrow of task in other direction
        GM.addStyle(".FmmzFc .mUbCce{display:none;}");//hide left close button
        GM.addStyle(".gv11ue .mUbCce:nth-child(4){display:none;}");//hide right close button

        var mainLoop = setInterval(function(){
            //hide task if another one is opened
            var tasks = document.getElementsByClassName('llhEMd iWO5td');
            for (var i = 0; i<tasks.length-1;i++){
                if (i != tasks.length-2 || tasks[i+1].getAttribute("isfullscreen")=="true"){//don't hide if last page is popup
                    document.getElementById('yDmH0d').removeChild(tasks[0]);
                }
            }
        }, 500);
    }
})();