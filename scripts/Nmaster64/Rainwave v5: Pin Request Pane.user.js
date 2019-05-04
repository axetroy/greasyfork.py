// ==UserScript==
// @version      1.0.3
// @author       Nmaster64
// @namespace    http://twitter.com/nmaster64
// @match        https://*.rainwave.cc/*
// @name         Rainwave v5: Pin Request Pane
// @description  Adds a pin/close button to the top-right of the requests pane. Pane stays fully open w/o hovering when pinned.
// @grant        GM_addStyle
// @require      https://code.jquery.com/jquery.min.js
// ==/UserScript==

// Style Updates
var css = [
    'body.full div.panel.requests.pinned { transform:translateX(-100%) !important; background: rgba(38, 39, 42, .9); }',
    'body.full div.panel.requests.pinned ul.request_icons li { visibility:visible !important; opacity:.5; }',

    'body.full div.panel.requests > div.close:first-child { display:block !important; }',
    'body.full div.panel.requests > div.close:first-child > img.close { display:none; }',
    'body.full div.panel.requests > div.close:first-child > img.pin  { display:block; }',
    'body.full div.panel.requests.pinned > div.close:first-child > img.close { display:block; }',
    'body.full div.panel.requests.pinned > div.close:first-child > img.pin {  display:none; }',

    'body.full .timeline { overflow-y: hidden !important; }',
    'body.full .timeline .history_header { margin-top: -5px; }',
    'body.full .timeline .progress { margin-top: -5px; }',
    'body.full .timeline .progress:nth-child(2) { margin-top: -10px; }',
    'body.full .timeline_event.sched_current { margin-top: -15px; }',
    'body.full .timeline_event.sched_next { margin-top: -20px; }',
    'body.full .timeline_event.sched_next:last-child { margin-top: -45px; }',
    'body.full .timeline_event.sched_next .timeline_header { display:none !important; }'
];
GM_addStyle(css.join("\n"));

// Close Button
jQuery(document).ready(function($) {
    var closeBtn = $('body.full div.panel.requests > div.close:first-child');
    closeBtn.find('img').addClass('close').clone().attr('src', 'https://rainwave.cc/static/images4/request_pause.png').attr('class', 'pin').appendTo(closeBtn);
    closeBtn.off().click(function() {
        $('body.full div.panel.requests').toggleClass('pinned');
    });
});