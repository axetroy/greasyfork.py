// ==UserScript==
// @name     Recent visits observer blacklist
// @version  2.0.2
// @description Hide checklists from selected observers on the recent visits page for a region or hotspot
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

    function hideObserver(name) {
        $('td[headers="observer"]').each(function () {
            if (name ===  $(this).attr('data-observer')) {
                $(this).closest('tr').addClass('hidden');
            }
        });
    }

    $('td[headers="observer"]').each(function () {
        let name = $(this).contents().text().trim().replace(/\s{2,}/, ' ');
        $(this).prepend('<span style="font-weight: normal;" title="Hide all checklists from ' + name + '">x</span> ');
        $(this).attr('data-observer', name);
        $(this).children(":first").click(function () {
            hideObserver(name);
        });
    });

})();
