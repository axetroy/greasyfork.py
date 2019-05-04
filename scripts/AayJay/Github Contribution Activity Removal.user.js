// ==UserScript==
// @name       Github Contribution Activity Removal
// @version    1.0
// @description  Removes the Github Contribution activity statistics for those who may not wish to see it. This is useful for people who may feel down for not contributing anything to a codebase for some time.
// @match      https://*github.com/*
// @copyright  2015+, AJ
// @namespace https://greasyfork.org/users/10111
// ==/UserScript==



$('.contributions-tab > .boxed-group.flush').remove();
$('.contributions-tab > .activity-listing').remove();