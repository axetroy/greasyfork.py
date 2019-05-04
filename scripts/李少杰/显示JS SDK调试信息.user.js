// ==UserScript==
// @name         显示JS SDK调试信息
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  console.log("start printing messages");
  var jsonstringify = JSON.stringify;
  window._vds_data = [];
  window._save_vds_data = false;
  JSON.stringify = function(value, replacer, space) {
    if (value && value instanceof Array && (value = value.filter(function(t){return t;})) && value[0] && value[0].d == location.host) {
      if (value[0].t != 'imp') {
        console.warn(jsonstringify(value, 0, 2));
      } else {
        console.log(jsonstringify(value, 0, 2));
      }
      if (_save_vds_data) _vds_data.push(value);
    }
    return jsonstringify(value, replacer, space);
  };
})();
