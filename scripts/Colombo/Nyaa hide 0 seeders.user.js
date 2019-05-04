// ==UserScript==
// @name         Nyaa hide 0 seeders
// @namespace    zeusex81@gmail.com
// @version      1.1
// @description  Hide torrent with 0 seeders
// @include      https://nyaa.si/*
// @include      https://sukebei.nyaa.si/*
// @license      MIT
// @grant        none
// ==/UserScript==

(function() {
    var today = new Date().toISOString().slice(0, 10);
    var nodes = document.querySelectorAll('td[style="color: green;"]');
    for(var i = 0; i < nodes.length; ++i) {
        if(nodes[i].textContent == "0")
            nodes[i].parentNode.remove();
        else if(nodes[i].previousElementSibling.textContent.startsWith(today))
            nodes[i].previousElementSibling.style = "font-weight: bold;";
    }
})();