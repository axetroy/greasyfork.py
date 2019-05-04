// ==UserScript==
// @name         Cookie Clicker Minihack
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Adding some basic hack features to Orteil's Cookie Clicker games
// @author       You
// @match        *orteil.dashnet.org/cookieclicker/*
// @grant        none
// ==/UserScript==

// yes, I do use ES6, so plz just ignore the "use esversion: 6" warnings
(function() {
    'use strict';
    // variables
    const config = {
        goldenCookies: true, // autoclick all golden cookies
        hideNotes: true, // notes/notifications
        autoClickSpeed: 20, // false to disable - number to choose clicks per secound
        autoshop: 200, // number of each item you want to have before it stops buying automatically
        skipGrandma: false // skip buying Grandma in the autoshop function
    };

    // elements to use again, and again, and still again
    const shimmers = document.getElementById('shimmers'),
          notes = document.getElementById('notes'),
          bigCookie = document.getElementById('bigCookie'),
          upgrades = document.getElementById('upgrades'),
          shop = document.getElementById('products');

    // autoclick any golden cookies
    if (config.goldenCookies) {
        setInterval(() => {
            let goldenCookies = shimmers.childNodes;
            if (goldenCookies.length === 0) return;
            for (let i = 0; i < goldenCookies.length; i++) {
                goldenCookies[i].click();
            }
        }, 500);
    }

    // hide annoying notes/notifications located in bottom center
    if (config.hideNotes) {
        notes.style.display = 'none';
    }

    // autoclick the cookie - limit to x times every secound for preventing overload
    if (typeof config.autoClickSpeed === 'number' && config.autoClickSpeed >= 0) {
        setInterval(() => {
            bigCookie.click();
        }, 1000 / config.autoClickSpeed);
    }

    // auto upgrade
    setInterval(() => {
        const enabledEls = upgrades.childNodes;
        for (let i = 0; i < enabledEls.length; i++) {
            enabledEls[i].click();
        }
    }, 100);

    // autoshop
    if (typeof config.autoshop === 'number' && config.autoshop >= 0) {
        setInterval(() => {
            // will toggle on the "buy" if "sell" is choosen
            Game.storeBulkButton(0); // eslint-disable-line
            // choose to buy only 1 when clicking items - because this code is based on clicking the elements
            Game.storeBulkButton(2); // eslint-disable-line
            const items = shop.childNodes;
            for (let i = 1; i < items.length; i++) {
                const item = items[i];
                let amountNode = item.getElementsByClassName('content')[0].childNodes[4];
                if (amountNode.innerText*1 < config.autoshop) {
                    item.click(); // click item if you can afford it, and you don't have the amount you want
                }
            }
        }, 200);
    }
})();