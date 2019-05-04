// ==UserScript==
// @name         vk 'xD' bez graficznego emoji
// @description  no napisalem przeciez
// @version      1.0
// @author       Niqueish
// @match        *://*vk.com/*
// @grant        none
// @require      https://greasyfork.org/scripts/21845-arrive-js/code/Arrivejs.js?version=139217
// @namespace https://greasyfork.org/users/31125
// ==/UserScript==

(function() {
   const xDemojiSelector = 'img[emoji="D83DDE06"]'
   const xDElementHTML = '<span class="xD">xD</span>'

   document.body.arrive(xDemojiSelector, {fireOnAttributesModification: false, existing: true}, function() {
    this.outerHTML = xDElementHTML
   })
})()