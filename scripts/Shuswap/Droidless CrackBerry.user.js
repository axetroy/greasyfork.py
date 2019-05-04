// ==UserScript==
// @name Droidless CrackBerry
// @namespace http://userstyles.org
// @description     Eliminates Android devices from the CrackBerry Forums Index
// @author Shuswap
// @include http://crackberry.com/*
// @include https://crackberry.com/*
// @include http://*.crackberry.com/*
// @include https://*.crackberry.com/*
// @run-at document-start
// @version 0.1
// ==/UserScript==
(function() {var css = [
     "@namespace url(http://www.w3.org/1999/xhtml);",
// To hide a section, remove the double slashes at the beginning of the line beneath the section name
// Ad Header Space
"#Leaderboard_Header_ATF-wrap {display:none !important;}",
// Get Help and Give Help
"#cat433 {display:none !important;}",
// Popular at CrackBerry
// "#cat285 {display:none !important;}",
// CrackBerry Community
// "#cat76 {display:none !important;}",
// Android BlackBerry Phones & OS
"#cat442 {display:none !important;}",
// BlackBerry 10 Phones & OS
// "#cat273 {display:none !important;}",
// BlackBerry PlayBook
"#cat242 {display:none !important;}",
// BBM Central
"#cat403 {display:none !important;}",
// BlackBerry OS Phones
// "#cat1 {display:none !important;}",
// BlackBerry Services and Extras
// "#cat84 {display:none !important;}",
// BlackBerry Carrier Discussion
// "#cat67 {display:none !important;}",
// Enterprise
"#cat87 {display:none !important;}",
// BlackBerry Developers
// "#cat301 {display:none !important;}",
// CrackBerry.com Site Related Talk
// "#cat18 {display:none !important;}",
].join("\n");
if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
    PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
    addStyle(css);
} else {
    var node = document.createElement("style");
    node.type = "text/css";
    node.appendChild(document.createTextNode(css));
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
        heads[0].appendChild(node);
    } else {
      		// no head yet, stick it whereever
        document.documentElement.appendChild(node);
    }
}
})();