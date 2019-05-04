// ==UserScript==
// @name Copy Redmine task title
// @namespace Redmine
// @icon https://dev.framgia.com/favicon.ico?1528612569
// @description Copy Redmine task title to clipboard
// @run-at document-start
// @match *://dev.framgia.com/issues/*
// @grant GM_setClipboard
// @grant GM_notification
// @version 0.0.1.20190123121740
// ==/UserScript==

document.addEventListener("DOMContentLoaded", function(event) {
    let contentEl = $('#content'),
    ticketNumber = contentEl.children('.contextual').siblings('h2').text(),
    ticketTitle = contentEl.find('.subject h3').text(),
    ticketURL = location.protocol + '//' + location.host + location.pathname,
    progress = contentEl.find('.attributes .percent').text(),
    textToCopy = ticketNumber + ' - ' + ticketTitle + ' ' + '(' + ticketURL + ')';
    if (progress.split('%')[0] > 0) textToCopy += ' => (' + progress  + ')';
  
    GM_setClipboard(textToCopy);
    GM_notification ( {title: 'Redmine copied', text: textToCopy, image: 'https://dev.framgia.com/favicon.ico?1528612569'} );
});

