// ==UserScript==
// @name     Recent visit checklists in new tab
// @version  1.0.0
// @description Links on the Recent Visits page opens each checklist in a new tab.
// @include  https://ebird.org/region/*/activity*
// @include  https://ebird.org/hotspot/*/activity*
// @require  https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js
// @namespace https://github.com/ProjectBabbler/ebird/
// @author smackay
// @copyright 2018 Stuart MacKay (https://github.com/ProjectBabbler/ebird-superscripts)
// @license MIT
// @homepage https://github.com/ProjectBabbler/ebird-superscripts
// @grant    none
// ==/UserScript==

(function() {
    'use strict';

    $('td.obstable-date a').each(function () {
     $(this).attr('target', '_blank');
    });

})();
