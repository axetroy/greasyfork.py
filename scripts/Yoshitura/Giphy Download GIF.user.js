// ==UserScript==
// @name         Giphy Download GIF
// @namespace    https://floof.me/
// @version      1.0
// @description  Allows you to download GIFs direcly from GIPHY
// @author       Yoshitura
// @match        https://*.giphy.com/media/*/giphy.gif
// @match        http://*.giphy.com/media/*/giphy.gif
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    var gif_url = window.location.pathname.split('/');
var download_button = document.createElement('div');
    download_button.setAttribute('style','position:absolute;left:0;top:0;margin:5px;');
    download_button.innerHTML = "<a download style='text-decoration:none;color:#FFFFFF;' href='https://i.giphy.com/"+gif_url[2]+".gif'>DOWNLOAD GIF</a>";
    document.body.appendChild(download_button);
})();