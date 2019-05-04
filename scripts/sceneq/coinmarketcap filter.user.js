// ==UserScript==
// @name         coinmarketcap filter
// @version      0.1
// @description  try to take over the world!
// @author       sceneq
// @match        https://coinmarketcap.com/currencies/views/all/*
// @grant        none
// @namespace https://greasyfork.org/users/138919
// ==/UserScript==

(function() {
    'use strict';
	const $$ = s=>Array.prototype.slice.call(document.querySelectorAll(s));
	const tbody = document.querySelector("#currencies-all > tbody");
	const remove = s=>tbody.removeChild(s);
	const marketcapSelector = ".market-cap";
	const volumeSelector = ".volume";

	const baseCurrency = "usd"; //"btc";
	const minVolume = 40000;
	const minMarketcap = 400000;

	function removeCurrencies(){
		$$("#currencies-all > tbody > tr")
			.filter(s=>{
				try{
					const cap = parseFloat(s.querySelector(marketcapSelector).dataset[baseCurrency], 10);
					const vol = parseFloat(s.querySelector(volumeSelector).dataset[baseCurrency], 10);
					return isNaN(cap) || isNaN(vol) || cap < minMarketcap || vol < minVolume;
				} catch (e){
					return true;
				}
			})
			.forEach(remove);
	}
	removeCurrencies();
	$$("#currencies-all > thead > tr > th")
	    .forEach(s=>s.addEventListener("click", removeCurrencies));
})();