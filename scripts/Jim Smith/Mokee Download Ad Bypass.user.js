// ==UserScript==
// @name         Mokee Download Ad Bypass
// @namespace    download.mokeedev.com
// @version      0.2
// @description  skip ads and bypass ads check for download.mokeedev.com
// @license      MIT
// @include      http://download.mokeedev.com/ad-dl.php
// @include      http://download.mokeedev.com/download.php
// @include      https://download.mokeedev.com/ad-dl.php
// @include      https://download.mokeedev.com/download.php
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  var key = document.body.innerHTML.match(/[0-9a-fA-F]{32,32}/).toString();
  if (key) $.post("link.php", {
    key: key
  }, function (data, status) {
    location.href = data;
    document.body.innerHTML = data;
  });
})();