// ==UserScript==
// @name FAST SELL STEAM
// @include  http*://steamcommunity.com/profiles/*/inventory*
// @include  http*://steamcommunity.com/id/*/inventory*
// @description Fast sell Steam items with current price
// @version 0.13
// @namespace https://greasyfork.org/users/6507
// ==/UserScript==
// 
// 
// 
(function (window, undefined) {  
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow
    } else {
        w = window;
    }

    if (w.self != w.top) {
        return;
    }




	jQuery(document).ready(function($) { 
		$('.item_desc_content').append('<a style="background: linear-gradient(to bottom, rgba(33,101,138,1) 5%,rgba(23,67,92,1) 95%)"class="item_market_action_button_contents item_market_action_button fs" href="#">FAST SELL</a>');
		$('.fs').on('click', sellOne);
	});





	

	

})(window);

		
function sellOne() {

	inf = jQuery('div.inventory_iteminfo:visible').find('.item_market_actions').text();	

	expr = /(\d+(?:\.|,?)\d+)/;
	price = expr.exec(inf);
	price = price[1];

	SellCurrentSelection();
	document.getElementById('market_sell_buyercurrency_input').value = price;
	SellItemDialog.OnBuyerPriceInputKeyUp();
	document.getElementById("market_sell_dialog_accept_ssa").checked = true;
	document.getElementById("market_sell_dialog_accept").click();

	document.getElementById("market_sell_dialog_ok").click();
}
