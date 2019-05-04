// ==UserScript==
// @name        RTP Play Downloader
// @author      jcalado <joelcalado@gmail.com>
// @namespace   https://jcalado.github.io/
// @description Userscript to download media from RTP Play
// @include     http*://*rtp.pt/play/p*
// @version     1
// @grant       none
// @copyright   2018, Joel Calado
// @license     GPL 3, https://www.gnu.org/licenses/
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('load', function() {
        var link = 'http://cdn-ondemand.rtp.pt' + player1.fileKey;
        var div = document.getElementsByClassName('col-xs-1 col-sm-4 margin-top-20 margin-bottom-20 text-right')[0];
        var a = document.createElement('a');
        a.setAttribute('href',link);
        a.setAttribute('class', 'btn btn-success');
        a.appendChild(document.createTextNode('Download'));
        div.appendChild(a);
    }, false);
})();