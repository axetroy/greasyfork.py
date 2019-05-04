// ==UserScript==
// @name     Restore visited checklists links colour
// @version  1.0.0
// @description Change the colour of links to checklists you have seen.
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

GM_addStyle('td.obstable-date > a:visited { color: darkorange; }');

