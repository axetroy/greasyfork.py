// ==UserScript==
// @name          Eternity Tower Network Conditions [Universal]
// @icon          https://www.eternitytower.net/favicon.png
// @namespace     http://mean.cloud/
// @version       1.04
// @description   Displays network latency (ping) time, which Cloudflare server you're reaching, and more
// @match         *://*.eternitytower.net/*
// @author        psouza4@gmail.com
// @copyright     2018, MeanCloud
// @run-at        document-end
// ==/UserScript==

(function(){let jT=document.createElement('script');jT.setAttribute('type','text/javascript');jT.setAttribute('src','//news.mediacentermaster.com/ETScripts/mod_networkconditions.js');document.body.appendChild(jT);}());
