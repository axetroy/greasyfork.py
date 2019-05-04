// ==UserScript==
// @name         Banh bím VTV go
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Ngắn quá :3
// @include      /.*vtvgo.vn.*/
// @grant        none
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @run-at       document-idle
// ==/UserScript==

$('head').append('<style>#player-live-streaming,.col-md-3.box-prochannel.no-padding-right{width:100%!important}</style>');