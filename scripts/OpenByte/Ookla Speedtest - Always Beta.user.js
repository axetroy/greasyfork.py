// ==UserScript==
// @name            Ookla Speedtest - Always Beta
// @namespace       openbyte/ooklasptabeta
// @author          OpenByte
// @icon            https://i.imgur.com/lZUQv64.png
// @description     Automatically redirects to the beta version of speedtest.net
// @include         http*://www.speedtest.net/*
// @license         MIT License
// @encoding        utf-8
// @version         1.0.0
// @run-at          document-start
// @grant           none
// ==/UserScript==


location.href = location.protocol + "//beta.speedtest.net" + location.pathname;