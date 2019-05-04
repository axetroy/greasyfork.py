// ==UserScript==
// @name         Unlimited Medium Articles
// @version      1
// @description  Remove paywall and annoying popups from Medium
// @author       Severin Paar
// @include      *
// @grant        GM_addStyle
/* jshint esversion: 6 */
// @namespace https://greasyfork.org/users/168788
// ==/UserScript==

/*

This script allows you to view unlimited medium articles with the free tier,
so no more switching to incognito mode. :D

Also, annoying popups and banners are hidden.

*/


// change this variable to false, to show popups and banners
const hide_popups = true;


// check if website is a medium domain,
// we need this because of custom medium domains
let isMedium = false;
let isAuthenticated = false;
try {
    isMedium = GLOBALS.productName === "Medium";
    isAuthenticated = GLOBALS.isAuthenticated;
} catch(e){}



// execute script if website is a medium domain
if(isMedium) {

    // hide popups and banners
    if(hide_popups) {

        // hide sign up popup
        // to do this, we have to set the last seen timestamp to now
        localStorage.setItem("post-article|last-seen-prompt-timestamp", Date.now());

        GM_addStyle(
            // hide cookie warning
            '.butterBar { display: none; }' +

            // hide medium premium banner
            '.postMeterBar { display: none; }' +

            // hide sign up banner
            '.js-stickyFooter { display: none; }'
        );
    }


    // remove paywall
    const paywall = document.querySelector('div.js-paywall');
    window.onload = () => {

        // remove "mpids" cookie, which stores the paywall value
        // to do so, we have to set the expires date to now
        // path is needed to overwrite the right cookie
        document.cookie = `mpids=;expires=${new Date().toUTCString()};path=/`;


        // if paywall is detected, eg on first installation, reload the page to apply new cookies.
        if(paywall) {
            // some articles require authentication. It is impossible to bypass the paywall then.
            if(isAuthenticated) {
                alert("You need to be signed out to bypass the paywall.\nIf this article is for members only, there is not much I can do. :(");
            } else {
                console.log("Paywall detected. Reloading...");
                location.reload();
            }
        }
    };
}