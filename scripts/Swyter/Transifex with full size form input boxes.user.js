// ==UserScript==
// @name        Transifex with full size form input boxes
// @namespace   userscripts.org/user/swyter
// @author      Swyter
// @homepage    https://swyterzone.appspot.com
// @description Allows you to send messages in Transifex like a normal person, instead of having a tiny-ass box because their front end developer sucks.
// @match       https://www.transifex.com/*
// @version     1.1.1
// @grant       GM_addStyle
// @icon        https://i.imgur.com/CfwMb7y.png
// ==/UserScript==

GM_addStyle(" input, textarea, .tx-form-error \
            {                                 \
                width:  100% !important;      \
                resize: both !important;      \
            }");