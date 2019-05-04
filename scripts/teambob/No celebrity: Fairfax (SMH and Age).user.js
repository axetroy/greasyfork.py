// ==UserScript==
// @name         No celebrity: Fairfax (SMH and Age)
// @namespace    https://github.com/teambob
// @version      0.1
// @description  Get rid of sport and celebrity news in the above-the-fold section on Fairfax websites (Sydney Morning Herald and The Age)
// @author       Usable Efficiency
// @include      http://*smh.com.au/
// @include      http://*theage.com.au/
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var celebrity = ['/lifestyle/celebrity/', '/entertainment/tv-and-radio/', '/sport/'];

for (var key in celebrity) {
    $('.top-page a[href*="'+celebrity[key]+'"]').hide();
}