// ==UserScript==
// @name MarkOwnedInIgGiftLink
// @namespace    http://tampermonkey.net/
// @version    	 1.0b
// @author       Benzi
// @match        https://www.indiegala.com/gift?gift_id=*
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @connect      store.steampowered.com
// @icon         http://store.steampowered.com/favicon.ico
// @description /master/js/MarkOwnedInIgGiftLink.js
// ==/UserScript==

(function(){
	function attachOnReady(callback) 
	{
        callback();
	}
	
    function randNum(min, max)
	{
		return Math.round(Math.random() * (max - min) + min);
	}
	
	function markOwned(query, markOwnedCallback)
	{		
        var rgxId = /[0-9]{3,}/g;
		var rgxApp = /:\/\/((store\.steampowered|steamcommunity)\.com\/app)\/[0-9]+/i;
		var rgxSub = /:\/\/store\.steampowered\.com\/sub\/[0-9]+/i;
		GM_xmlhttpRequest(
		{
			method: "GET",
			url: "https://store.steampowered.com/dynamicstore/userdata/?t=" + randNum(1000, 9999),
			onload: function(response) 
			{
				var dataRes = JSON.parse(response.responseText);
				var countOwned = [0, 0];
				var countAll = [0, 0];
				
				if (typeof dataRes["rgOwnedApps"] !== "undefined"
					&& typeof dataRes["rgOwnedPackages"] !== "undefined"
					&& typeof dataRes["rgIgnoredApps"] !== "undefined")
				{
					var eleApps = document.querySelectorAll(query);
					for (var i = 0; i < eleApps.length; i++)
					{
						var attrHref = eleApps[i].getAttribute("href") || eleApps[i].getAttribute("src") || eleApps[i].getAttribute("style") || eleApps[i].getAttribute("title");
						var ids = attrHref.match(rgxId);
						if (ids != null)
						{
							var valId = parseInt(ids[0]);
							if (rgxApp.test(attrHref))
							{
								if (dataRes["rgOwnedApps"].indexOf(valId) > -1)
								{
									markOwnedCallback(eleApps[i]);
									countOwned[0]++;
								}
								countAll[0]++;
							}
							else if (rgxSub.test(attrHref))
							{								
								if (dataRes["rgOwnedPackages"].indexOf(valId) > -1)
								{
									markOwnedCallback(eleApps[i]);
									countOwned[1]++;
								}
								countAll[1]++;
							}
						}
					}
				}
			} // End onload
		});
	}
	
	function main(){
		GM_addStyle(" .bh_owned { background-color: #7CA156 !important;transition: background 500ms ease 0s; }");
		markOwned("a[class='game-steam-url']",function(ele){
			ele.classList.add("bh_owned");
		});
	}
	attachOnReady(main);
})();
