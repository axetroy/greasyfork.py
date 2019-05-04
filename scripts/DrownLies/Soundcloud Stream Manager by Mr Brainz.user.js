// ==UserScript==
// @name         Soundcloud Stream Manager by Mr Brainz
// @namespace    http://mrbrainz.github.io/Soundcloud-Stream-Manager/
// @version      1.1
// @description  Code from bookmarklet created by Mr Brainz
// @author       DrownLies
// @include      *soundcloud.com/stream
// @grant        none
// ==/UserScript==



(function(){

    var rnd = Math.floor(Math.random()*9999999999);
    scrape=document.createElement('SCRIPT');
    scrape.type='text/javascript';
    scrape.id='nssc-script';
    scrape.src='https://mrbrainz.github.io/Soundcloud-Stream-Manager/src/scsm-min.js?'+rnd;
    var nsscs=document.getElementById('nssc-script');

    if (nsscs == null){
        document.getElementsByTagName('head')[0].appendChild(scrape);
    }

})();