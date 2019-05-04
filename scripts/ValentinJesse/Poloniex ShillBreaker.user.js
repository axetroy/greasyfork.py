// ==UserScript==
// @name         Poloniex ShillBreaker
// @namespace    https://poloniex.com/*
// @version      0.5
// @description  Poloniex ShillsAreRekt
// @author       You
// @match        https://poloniex.com/*
// @grant        none
// ==/UserScript==
function step(timestamp) {

$('.reputation.r00').closest('tr').hide();
                  
  window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);