// ==UserScript==
// @name         Onlinesequencer triplet
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Saren
// @match        https://onlinesequencer.net/(\d+)
// @grant        none
// ==/UserScript==

$(function() {
    $('#grid_select').append('<option value="0.75">1/3</option>');
    $('#grid_select').append('<option value="1.5">1/6</option>');
})();