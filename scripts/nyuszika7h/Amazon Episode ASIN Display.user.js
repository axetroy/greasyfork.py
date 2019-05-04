// ==UserScript==
// @name         Amazon Episode ASIN Display
// @namespace    nyuszika7h@gmail.com
// @version      0.1.4
// @description  Show ASINs for individual episodes on Amazon Prime Video
// @author       nyuszika7h
// @match        https://www.amazon.com/*
// @match        https://www.amazon.co.uk/*
// @match        https://www.amazon.de/*
// @match        https://www.amazon.co.jp/*
// @match        https://www.primevideo.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  let style = document.createElement('style');
  let styleText = document.createTextNode(`
.x-episode-asin {
  margin: 0.5em 0;
  color: #ff0000;
}`);
  style.appendChild(styleText);
  document.head.appendChild(style);

  // Amazon old style
  document.querySelectorAll('.dv-episode-container').forEach(el => {
    let asins = el.dataset.aliases.replace(/,/g, ' / ');

    let asinEl = document.createElement('div');
    let text = document.createTextNode(asins);
    asinEl.className = 'x-episode-asin';
    asinEl.appendChild(text);

    let parent = el.querySelector('.dv-el-title-data');
    let before = parent.querySelector('.dv-el-synopsis-wrapper');
    parent.insertBefore(asinEl, before);
  });

  // Amazon new style + PrimeVideo
  document.querySelectorAll('.js-node-episode-container > input, .avu-context-card > input').forEach(el => {
    let asin = el.id.replace(/^(?:selector|av-episode-expand-toggle)-/, '');

    let asinEl = document.createElement('div');
    let text = document.createTextNode(asin);
    asinEl.className = 'x-episode-asin';
    asinEl.appendChild(text);

    el.parentNode.querySelector('.js-eplist-episode, .av-episode-playback, .js-ep-playback-wrapper').appendChild(asinEl);
  });
}());