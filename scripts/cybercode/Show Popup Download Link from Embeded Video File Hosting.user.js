// ==UserScript==
// @name       Show Popup Download Link from Embeded Video File Hosting
// @version    0.4
// @description  Support: acefile.net, aisfile.com, tusfiles.net, other file hosting  with embed video /embed-xxxxyy-size.html
// @author       Like Riasa @cybercode
// @include        http://*
// @include        https://*
// @grant GM_openInTab
// @namespace https://greasyfork.org/en/scripts/8421-show-popup-download-link-from-embeded-video-file-hosting
// @copyright  2015+, cybercode
// ==/UserScript==

var m = null;
var m = /(embed-)([^\/]+)(-[^\.]+)(\.html)/;
if (m.test(location.href))

GM_openInTab(location.href.replace(m, "$2$4"));