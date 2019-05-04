// ==UserScript==
// @name         HMMC - How Much Money Do I Cost On Steam
// @namespace    https://akakanch.com/hmmc/
// @version      0.4
// @description  just buy games,steam sales are great deals. why this script?
// @author       Kanch
// @match        https://store.steampowered.com/account/history/
// @grant        none
// @name:zh-CN   HMMC - 我在Steam上花了多少钱了
// @description:zh-cn 本脚本可以帮助你计算你在Steam上的总花费
// ==/UserScript==

(function() {
    'use strict';
function hmmc(){

	//currency exchange
	var CUR = ['¥','$','€','£','₽','CDN$','₩'];
	var CUR_RMB = [1.0,6.3,7.7,8.8,0.1,5,0.0059];
	
	//box to show info
	var loading = `<div class="home_area_spotlight" style="height:80px;width:100%;display:inline-block;">
				   <div class="spotlight_content" style="width:100%;text-align:center;">
					  <h2>Loading the costs in </h2>
					  <div class="spotlight_body">RMB </div>
					  <div class="spotlight_body spotlight_price price">
						 <div class="discount_block discount_block_spotlight discount_block_large">
							<div class="discount_pct" id="spent_money">wait few seconds...</div>
						 </div>
					  </div>
				   </div>
				   <div class="ds_options">
					  <div></div>
				   </div>
				</div>`;

	var donestr = `<div class="home_area_spotlight" style="height:80px;width:100%;display:inline-block;">
				   <div class="spotlight_content" style="width:100%;text-align:center;">
					  <h2>You have spent</h2>
					  <div class="spotlight_body">RMB </div>
					  <div class="spotlight_body spotlight_price price">
						 <div class="discount_block discount_block_spotlight discount_block_large">
							<div class="discount_pct" id="spent_money">@SPENT@</div>
						 </div>
					  </div>
				   </div>
				   <div class="ds_options">
					  <div></div>
				   </div>
				</div>`;
	// target div before our box
	var ppt = document.querySelector("body > div.page_header_ctn.account_management");
	ppt.insertAdjacentHTML("afterend", loading);
	
	//load all wallet transactions
	
	console.log("Loading all transactions...."); 
	WalletHistory_LoadMore();
	
	console.log("done.\r\nWaiting for 8 seconds..."); 
	 setTimeout(function() {
		//extract all transactions
		var costRM = [];
		var cc = document.getElementsByClassName('wht_wallet_change');
		var change = document.getElementsByClassName('wht_total');
		var balance = document.getElementsByClassName('wht_wallet_balance');
		for (var i = 1; i < cc.length; i++) {
			if(change[i].textContent.length >1){
				//check if it is expenditure
				if((cc[i].textContent.length > 3 && cc[i].textContent[0]=='-') || (cc[i].textContent.length < 2 && balance[i].textContent.length < 2)){
					var vv =  change[i].textContent.replace(/[^\-+.0-9]/g,'');
					var oly = change[i].textContent.replace(/[^\-+.0-9฿₵¢₡B₫€ƒ₲Kč₭£₤₥₦₱₨₽$₮₩¥₴₪֏¥]/g,'');
					//convert currency to RMB 
					vv = CUR_RMB[CUR.indexOf(oly[0])]*parseFloat(vv);
					costRM.push( parseFloat(vv) );
				}
			}
		}
		
		// compute all cost
		var X = costRM.reduce(function(a, b) { return a + b; }, 0);
		console.log('done.\r\n-\r\n-\r\nYou have cost ¥ ' + Number((X).toFixed(2)) + ' RMB on Steam so far.\r\n-\r\n-\r\n');
		document.querySelector("body > div.home_area_spotlight").remove();
		ppt.insertAdjacentHTML("afterend", donestr.replace("@SPENT@",Number((X).toFixed(2))));
	 },8888);
}
    hmmc();
})();