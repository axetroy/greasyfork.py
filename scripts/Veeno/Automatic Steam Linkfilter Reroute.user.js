// ==UserScript==
// @name        Automatic Steam Linkfilter Reroute
// @namespace   no-steam-linkfilter
// @author      Veeno
// @description Automatically redirects from the Steam link filter page.
// @include     *steamcommunity.com/linkfilter*
// @version     1.0
// @grant       none
// @run-at      document-start
// ==/UserScript==

window.location.replace(location.search.replace('?url=', ''));