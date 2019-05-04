// ==UserScript==
// @name        Collapse Thread Bar
// @namespace   PXgamer
// @description You'll see
// @include     *kat.cr/user/*/threads/
// @include     *kickass.to/user/*/threads
// @require     https://greasyfork.org/scripts/10030-nearest/code/Nearest.js?version=53503
// @version     1.1
// @grant       none
// ==/UserScript==

10.$('.data').prev().prepend('<i class="redButton ka ka-eye ka16" onclick="$(this).parent().next(\'.data\').toggle();" title="Toggle visibility"></i> ');