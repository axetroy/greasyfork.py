// ==UserScript==
// @name            Microsoft Edge Ad Blocker
// @namespace       http://microsoft.com/
// @version         0.5
// @description     This is blocker for Edge ads on Microsoft websites. DISCLAIMER! Author isn't affiliated with Google, Apple and other Microsoft haters. Suсk it! We all love Microsoft, but sometimes their pushes are a bit annoying
// @copyright       Okaïdo53
// @author          Okaïdo53
// @Secure          Okaïdo53
// @compatible      firefox
// @compatible      chrome
// @compatible      opera
// @compatible      Safari
// @homepage        https://greasyfork.org/fr/scripts/30975-microsoft-edge-ad-blocker
// @homepageURL     https://gist.github.com/Okaido53/104cc9050aead733c2ce492734efdf67
// @supportURL      https://support.microsoft.com/fr-fr/help/
// @supportURL 2    https://support.microsoft.com/fr-fr/contactus/
// @license         https://creativecommons.org/licence/by-nc-nd/4.0
// @contributionURL https://www.paypal.com/
// @icon            https://c.s-microsoft.com/fr-fr/CMSImages/Windows_Apps_v3d_1920_Edge_img.jpg?version=4365ffc3-69f3-f988-7ad0-aaa03ad66c90
// @iconURL         https://c.s-microsoft.com/fr-fr/CMSImages/Windows_Apps_v3d_1920_Edge_img.jpg?version=4365ffc3-69f3-f988-7ad0-aaa03ad66c90
// @defaulticon     https://c.s-microsoft.com/fr-fr/CMSImages/Windows_Apps_v3d_1920_Edge_img.jpg?version=4365ffc3-69f3-f988-7ad0-aaa03ad66c90
// @icon64          https://c.s-microsoft.com/fr-fr/CMSImages/Windows_Apps_v3d_1920_Edge_img.jpg?version=4365ffc3-69f3-f988-7ad0-aaa03ad66c90
// @icon64URL       https://c.s-microsoft.com/fr-fr/CMSImages/Windows_Apps_v3d_1920_Edge_img.jpg?version=4365ffc3-69f3-f988-7ad0-aaa03ad66c90
// @include         http://outlook.live.com/*
// @include         https://outlook.live.com/*
// @include         http://*.outlook.live.com/*
// @include         https://*.outlook.live.com/*
// @match           https://*.live.com/*
// @match           http*://*.office.com/*
// @match           http*://*.microsoft.com/*
// @match           http*://*.xbox.com/*
// @match           http*://*.skype.com/*
// @match           http*://*.mixer.com/*
// @match           http*://*.outlook.com/*
// @match           http*://*.msn.com/*
// @match           http*://*.bing.com/*
// @resource        ccs_https://gist.github.com/Okaido53/104cc9050aead733c2ce492734efdf67ccs_.css?v=0.5
// @require         https://code.jquery.com/jquery-2.2.4.js#md5=ac56d...,sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI=
// @run-at          document-start
// @run-at          document-end
// @run-at          document-body
// @run-at          document-end
// @run-at          document-idle
// @run-at          context-menu
// @connect         <value>
// @nocompat        Chrome
// @noframes
// @grant           none
// @grant           GM_setClipboard
// @grant           GM_log
// @grant           GM_deleteValue
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_registerMenuCommand
// @grant           GM_xmlhttpRequest
// @grant           unsafeWindow
// @grant           window.focus
// @grant           window.close
// @unwrap
// ==/UserScript==

(function() {var css = [
	"@namespace url(http://www.w3.org/1999/xhtml);",
	"#owaadbar {",
	"    display: none !important;",
	"    width: 0px !important;",
        "._n_h {display: none; width: 0 !important; position: absolute}",
        "#primaryContainer > div:nth-child(7){ right: 0 !important; width: 100% !important;}",
        "._n_15 {display: none; width: 0 !important; position: absolute}",
        "._2qPmszDwBfYpF7PO9Mn3KN {display: none; width: 0 !important; position: absolute}"
	"  }"
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

(function () {
    'use strict';

    var adList = [
        "#epb",
        "#edgePromotion",
        "ohp-announcement",
        ".ms-bgc-ns.notificationBarSlideIn"
    ];

    for (var i = 0; i < adList.length; i++) {
        try {
            document.querySelector(adList[i]).style.display = "none";
            console.log("Microsoft Edge Ad Blocker successfully blocker the banner '" + adList[i] + "'"); 
        //production::enable
        } catch (err) {}
        }
        })();