// ==UserScript==
// @name            Youtube Logo - Link to subscriptions feed
// @namespace       Youtube Logo - Link to subscriptions feed
// @description     Change YouTube logo link to user"s subscription feed instead of homepage (only when logged in)
// @version         1.2.4
// @include         *://*.youtube.tld/*
// @supportURL      https://greasyfork.org/en/scripts/13582/feedback
// @author          aciid
// ==/UserScript==
//console.info("Running Youtube Logo - Link to subscriptions feed");

function checkLogo() {
    var loopCount = 1;
    var loop = setInterval(function() {
        var Logo = document.getElementById("logo");
        var LogoElement = Logo.getElementsByTagName("a")[0];
        var UserLoggedIn = (document.getElementById("end").getElementsByTagName("ytd-notification-topbar-button-renderer").length > 0);
        try {Logo.getElementsByTagName("area")[0].href = "/feed/subscriptions";} catch (e) {}

        //console.info("Searching for logo! - Loop: " + loopCount + " Logo: " + (Logo !== null) + " LogoElement: " + (LogoElement !== null) + " UserLoggedIn: " + UserLoggedIn);

        if (Logo !== null && LogoElement !== null) {
            if (loopCount >= 120) {
                clearInterval(loop);
            } else if (UserLoggedIn) {
                LogoElement.href = "/feed/subscriptions";
                LogoElement.addEventListener("click", function() { window.location.href = "/feed/subscriptions"; });
                clearInterval(loop);        
            } else {
            
            }
        }
        loopCount++;
    }, 500);
}

function runScript() {
    var LogoElement = document.getElementById("logo-container");
    var UserLoggedIn = (document.getElementById("yt-masthead-user") !== null || document.getElementById("end").getElementsByTagName("ytd-notification-topbar-button-renderer") !== null);
    try {LogoElement.getElementsByTagName("area")[0].href = "/feed/subscriptions";} catch (e) {}

    //console.info("Searching for logo-container! - LogoElement: " + (LogoElement !== null) + " UserLoggedIn: " + UserLoggedIn);

    if (LogoElement !== null) {
        if (UserLoggedIn) {
            LogoElement.href = "/feed/subscriptions";
        }
    } else {
        try {checkLogo();} catch (e) {}
    }
}

//window.onload = setTimeout(function () {runScript();}, 1000);
document.getElementsByTagName("body")[0].addEventListener("yt-navigate-finish", runScript);
window.addEventListener("spfdone", runScript);
runScript();