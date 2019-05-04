// ==UserScript==
// @name        AutoExpander for Moodle
// @namespace   autoexpandermoodleopb
// @description This script automatically expands the course list on the Moodle Dashboard.
// @icon        https://image.ibb.co/iwn9km/Oygi_Eh_QE6rcn8_KW1e3b_LUPXt67_A6_QEOKy_Eqv_W_Qx_UT8v_N_BEtt_ODh2c_YPrk2d_S7hjy_A_w300.png
// @include     http://moodle.*/my/
// @include     https://moodle.*/my/
// @include     http://www.moodle.*/my/
// @include     https://www.moodle.*/my/
// @include     http://moodle.*.*/my/
// @include     https://moodle.*.*/my/
// @include     http://www.moodle.*.*/my/
// @include     https://www.moodle.*.*/my/
// @include     http://moodle.*.*.*/my/
// @include     https://moodle.*.*.*/my/
// @include     http://www.moodle.*.*.*/my/
// @include     https://www.moodle.*.*.*/my/
// @version     1.1.1
// @grant       none
// ==/UserScript==


if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }
    
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

var a = document.getElementsByTagName("a");
for(var e of a) {
  var url = e.getAttribute("href");
  if(typeof url == "string" && url.includes("index.php?mynumber="))
    location.href = url;
}
  