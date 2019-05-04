// ==UserScript==
// @name        Selectable text on FF.net
// @description Exactly what it looks like.
// @namespace   asdf
// @match       http://www.fanfiction.net/*
// @match       https://www.fanfiction.net/*
// @version     1
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle(" .storytext, .storytextp                    \
            {                                            \
                   -moz-user-select: inherit !important; \
                -webkit-user-select: inherit !important; \
                        user-select: inherit !important; \
            }");