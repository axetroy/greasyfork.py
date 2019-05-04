// ==UserScript==
// @name         Omega Price converter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Price converter for e-sim omega
// @author       You
// @match        https://omega.e-sim.org/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    var citizenship = document.querySelector('#userMenu > div > div:nth-child(43) > div:nth-child(11) > div:nth-child(4)');
    var citizenshipClass = citizenship.querySelector('.xflagsSmall').classList[1];
    var priceNodes = document.querySelectorAll('*:not(.sidebar-money) > .' + citizenshipClass + ' + b');
    var prices = Array.from(priceNodes).map(p => parseFloat(p.title));

    function createBreak() {
        return document.createElement('br');
    }

    function createPrice(price, rate) {
        var goldPrice = price * rate;
        var flagNode = document.createElement('div');
        flagNode.classList.add('xflagsSmall', 'xflagsSmall-Gold');
        var bNode = document.createElement('b');
        bNode.title = goldPrice;
        bNode.innerText = goldPrice.toFixed(2);
        return [flagNode, bNode];
    }

    function updatePrices(rate) {
        for (var i = 0; i < priceNodes.length; i++) {
            var p = createPrice(prices[i], rate);
            var b = createBreak();
            priceNodes[i].parentNode.insertAdjacentElement('beforeend', b);
            b.insertAdjacentElement('afterend', p[0]);
            p[0].insertAdjacentElement('afterend', p[1]);
        }
    }

    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://omega.e-sim.org/monetaryMarket.html',
        onload: function(arg) {
            var doc = (new DOMParser()).parseFromString(arg.responseText, 'text/html');
            var rateNode = doc.querySelector('.dataTable tr:nth-child(2) td:nth-child(3) b');
            var rate = parseFloat(rateNode.innerText);
            updatePrices(rate);
        }
    });

})();