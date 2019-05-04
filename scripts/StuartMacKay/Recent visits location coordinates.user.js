// ==UserScript==
// @name     Recent visits location coordinates
// @version  1.0.0
// @description Hide checklists where the location name contains latitude and longitude
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

    const coords = /\-?\d{1,2}[.,]\d{1,4}[,x] ?\-?\d{1,2}[.,]\d{1,4}/;

    $('td[headers="location"]').each(function () {
      let name = $(this).contents().text().trim();
      if (coords.test(name)) {
          console.log(name);
          $(this).parent().addClass('hidden');
      }
    });

})();
