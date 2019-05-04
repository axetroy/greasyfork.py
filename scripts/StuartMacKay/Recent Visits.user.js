// ==UserScript==
// @name     Recent Visits
// @version  1.0.0
// @description Various fixes to make the Recent Visits page usable.
// @include  https://ebird.org/region/*/activity*
// @include  https://ebird.org/hotspot/*/activity*
// @require  https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js
// @namespace https://github.com/ProjectBabbler/ebird/
// @author smackay
// @copyright 2018 Stuart MacKay (https://github.com/ProjectBabbler/ebird-superscripts)
// @license MIT
// @homepage https://github.com/ProjectBabbler/ebird-superscripts
// @grant GM_addStyle
// ==/UserScript==

// This script contains all the fixes and changes needed to make the Recent Visits
// page for a given region or hotspot readable once more. This script contains the
// functions found in:
//
//   recent_visits_blacklist
//   recent_visits_coordinates
//   recent_visits_new_tab
//   recent_visits_restore_visited


// Show visited link so you can see what checklists you have read.
// This performs the same function as the recent_visits_restore_visited script.
GM_addStyle('td.obstable-date > a:visited { color: darkorange; }');

(function() {
  'use strict';

  // Hide all checklists from selected observers.
  // This performs the same function as the recent_visits_blacklist script.

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

  // Hide all checklists that contain latitude and longitude in the name.
  // This performs the same function as the recent_visits_coordinates script.

  const coords = /\-?\d{1,2}[.,]\d{1,4}[,x] ?\-?\d{1,2}[.,]\d{1,4}/;

  $('td[headers="location"]').each(function () {
    let name = $(this).contents().text().trim();
    if (coords.test(name)) {
      $(this).parent().addClass('hidden');
    }
  });

  // Open checklists in a new tab view.
  // This performs the same function as the recent_visits_new_tab script.

  $('td.obstable-date a').each(function () {
    $(this).attr('target', '_blank');
  });

})();
