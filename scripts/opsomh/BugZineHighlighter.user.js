// ==UserScript==
// @name            BugZineHighlighter
// @description     Highlight visited bugzilla links on mozillazine forum
// @version         2017.10.13.0101
// @author          opsomh
// @namespace       https://greasyfork.org/users/30-opsomh
// @match           http://forums.mozillazine.org/viewtopic.php?*
// @grant           GM_addStyle
// ==/UserScript==

GM_addStyle('a:visited[href^="https://bugzilla.mozilla.org/show_bug.cgi"]{color: red !important;}')
