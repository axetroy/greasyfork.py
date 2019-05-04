// ==UserScript==
// @name         CartoonCrazy | Full Screen View
// @version      1.1
// @description  Makes the whole webpage full of the video that you're watching
// @author       TigerYT
// @match        *://*.cartooncrazy.tv/watch/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        none
// @namespace    https://greasyfork.org/users/137913
// ==/UserScript==

var css = `
body {
    overflow: hidden;
    background: #000;
}

iframe {
    height: 48.1vw!important;
    width: 100%!important;
}
`;
setInterval(function(){
  $('iframe[height="380"] ~ *:not(.dacss), iframe:not(iframe[height="380"])').remove();
}, 0);
$('iframe[height="380"]').insertBefore('#cointeiner');
$('body').prepend('<style class="dacss"></style>');
$('.dacss').html(css).insertAfter('iframe[height="380"]');