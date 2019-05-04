// ==UserScript==
// @name        JewTube
// @namespace   JewTubeLogo
// @description JewTube Logo For YouTube
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @include     http://youtube.com/*
// @include     https://youtube.com/*
// @version     2
// @grant       none
// ==/UserScript==

(function init(){
  var counter = document.getElementById('logo');
   if (counter) {
       document.getElementById('logo').innerHTML = '<a href="./"><img src="data:image/png;base64,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"></a>';
     document.getElementById('masthead').style = "--yt-swatch-primary:rgb(35,35,35); --yt-swatch-primary-darker:rgb(32,32,32); --yt-swatch-text:rgb(255,255,255); --yt-swatch-important-text:rgb(255,255,255); --yt-swatch-input-text:rgba(255,255,255,1); --yt-swatch-textbox-bg:rgba(19,19,19,1); --yt-swatch-logo-override:rgb(255,255,255); --yt-swatch-icon-color:rgba(136,136,136,1);";
   } else {
     setTimeout(init, 0);
   }
})();