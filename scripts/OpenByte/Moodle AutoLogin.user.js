// ==UserScript==
// @name        		Moodle AutoLogin
// @namespace   		autologinmoodleobp
// @description 		This script automatically performs a login on Moodle pages.
// @icon        		https://image.ibb.co/iwn9km/Oygi_Eh_QE6rcn8_KW1e3b_LUPXt67_A6_QEOKy_Eqv_W_Qx_UT8v_N_BEtt_ODh2c_YPrk2d_S7hjy_A_w300.png
// @require     		https://greasyfork.org/scripts/34555-greasemonkey-4-polyfills/code/Greasemonkey%204%20Polyfills.js?version=227108
// @require     		https://greasyfork.org/scripts/28366-userscript-config-page-api/code/Userscript%20Config%20Page%20API.js?version=227297
// @exclude     		http*://moodle.*/my/
// @exclude     		http*://*.moodle.*/my/
// @include     		http*://moodle.*/
// @include     		http*://*.moodle.*/
// @exclude     		http*://moodle.*.*/my/
// @exclude     		http*://*.moodle.*.*/my/
// @include     		http*://moodle.*.*/
// @include     		http*://*.moodle.*.*/
// @exclude     		http*://moodle.*.*.*/my/
// @exclude     		http*://*.moodle.*.*.*/my/
// @include     		http*://moodle.*.*.*/
// @include     		http*://*.moodle.*.*.*/
// @include     		http*://moodle.*/login/index.php
// @include     		http*://*.moodle.*/login/index.php
// @include     		http*://moodle.*.*/login/index.php
// @include     		http*://*.moodle.*.*/login/index.php
// @include     		http*://moodle.*.*.*/login/index.php
// @include     		http*://*.moodle.*.*.*/login/index.php
// @include     		http*://*.greasyfork.org/*/scripts/27387-moodle-autologin
// @include     		http*://greasyfork.org/*/scripts/27387-moodle-autologin
// @include     		http*://*.greasyfork.org/*/scripts/27387-moodle-autologin/*
// @include     		http*://greasyfork.org/*/scripts/27387-moodle-autologin/*
// @version     		1.6.0
// @run-at      		document-end
// @grant       		GM_setValue
// @grant       		GM_getValue
// @grant       		GM_addStyle
// @grant       		GM.setValue
// @grant       		GM.getValue
// @grant       		GM.addStyle
// ==/UserScript==
/*jshint esversion: 6 */


(async () => {
    await CONFIG.GREASYFORK.init(27387, [
        await CONFIG.generateTextOption("USER", "Username: ", "", 1, "text"),
        await CONFIG.generateTextOption("PASS", "Password: ", "", 2, "password"),
        await CONFIG.generateCheckboxOption("WAIT_FOR_BROWSER_TO_SET_DATA", "WAIT_FOR_BROWSER_TO_SET_DATA: ", false, 3),
        await CONFIG.generateCheckboxOption("REDIRECT_HTTP_TO_SECURE", "REDIRECT_HTTP_TO_SECURE: ", true, 3),
        await CONFIG.generateSelectOption("ACTION_ON_ALREADY_LOGGED_IN", "ACTION_ON_ALREADY_LOGGED_IN: ", 2, 3, [
            {label: "NOOP", value: "0"},
            {label: "LOGOUT", value: "1"},
            {label: "CANCEL", value: "2"}
        ]),
    ]);

    var WAIT_FOR_BROWSER_TO_SET_DATA = await CONFIG.getValue("WAIT_FOR_BROWSER_TO_SET_DATA");
    var ACTION_ON_ALREADY_LOGGED_IN = await CONFIG.getValue("ACTION_ON_ALREADY_LOGGED_IN"); //0 -> NOOP, 1 -> LOGOUT, 2 -> CANCEL
    var REDIRECT_HTTP_TO_SECURE = await CONFIG.getValue("REDIRECT_HTTP_TO_SECURE");

    var user = await CONFIG.getValue("USER");
    var pass = await CONFIG.getValue("PASS");



    function notEmpty(ar, f) {
        if (typeof ar.length != "undefined" && ar.length > 0)
            f(ar);
    }

    function ensureHTTPS(href) {
        if (href.startsWith("https://"))
            return href;
        if (href.startsWith("http://"))
            return "https://" + href.substring(7);
        if (href.startsWith("//"))
            return "https:" + href;
        return href;
    }

    if (!location.href.includes("login")) {
        notEmpty(document.querySelectorAll("a[href*=login]"), function (a) {
            var href = a[0].getAttribute("href");
            location.href = REDIRECT_HTTP_TO_SECURE ? ensureHTTPS(href) : href;
        });
    } else {
        notEmpty(document.querySelectorAll("form[id*=login], form[action*=login]"), function (form) {
            form = form[0];
            var u = document.getElementsByName("username");
            var p = document.getElementsByName("password");
            if (u.length > 0) u = u[0];
            else u = document.getElementById("username");
            if (p.length > 0) p = p[0];
            else p = document.getElementById("password");

            if (u !== null && p !== null) {
                if (WAIT_FOR_BROWSER_TO_SET_DATA) {
                    var iid = setInterval(function () {
                        if (u.value.trim() !== "") {
                            clearInterval(iid);
                            form.submit();
                        }
                    }, 100);
                } else {
                    u.setAttribute("value", "");
                    p.setAttribute("value", "");
                    u.setAttribute("value", user);
                    p.setAttribute("value", pass);

                    form.submit();
                }
            }
        });
        if (ACTION_ON_ALREADY_LOGGED_IN === "1") {
            notEmpty(document.querySelectorAll("form[action*=logout]"), function (e) {
                e[0].submit();
            });
        } else if (ACTION_ON_ALREADY_LOGGED_IN === "2") {
            notEmpty(document.querySelectorAll("form input[name=cancel]"), function (e) {
                e[0].form.submit();
            });
        }
    }
})();