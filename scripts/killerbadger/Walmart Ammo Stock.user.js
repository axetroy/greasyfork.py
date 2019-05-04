// ==UserScript==
// @name       Walmart Ammo Stock
// @namespace  https://greasyfork.org/users/2329-killerbadger
// @version    0.1
// @description  Shows if Ammo is in stock on Walmart.com
// @match      http://*.walmart.com/*
// ==/UserScript==

	var elmModify = document.getElementById("STORE_MSG");
	if (elmModify.style.display === 'none') {
		elmModify.style.display="inline";
        document.getElementById("INFO_NOT_AVAILABLE").style.display="none";
    }