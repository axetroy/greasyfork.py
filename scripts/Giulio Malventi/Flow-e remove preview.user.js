// ==UserScript==
// @name         Flow-e remove preview
// @namespace    http://tampermonkey.net/
// @version      0.2
// @author       giulio.malventi@gmail.com
// @match        https://flow-e.com/workflow*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @description  Disables displaying attachments in a dialog, reverts to opening a new tab.
// @locale       en
// ==/UserScript==

(function() {
    'use strict';

    $('body').on('DOMNodeInserted', 'div.email-details', function () {
        $('a.js-preview-attachment').addClass('js-upload-attachment-to-drive');
        $('a.js-preview-attachment').removeClass('js-preview-attachment');
    })
})();
