// ==UserScript==
// @name     Checklist hide age table
// @version  1.0.2
// @description Hide the table showing the counts for age and sex
// @include  https://ebird.org/view/checklist/*
// @include  https://ebird.org/*/view/checklist/*
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

    $('.sd-data-age-sex').each(function () {
        $(this).parent().addClass('hidden');
    });

})();
