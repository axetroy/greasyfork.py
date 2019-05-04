// ==UserScript==
// @name          fokse's BNP Cleaner
// @author        Fokse
// @description   Remove trash tread & post
// @namespace     BNPCleaner
// @include https://forums.d2jsp.org/forum.php?f=104
// @include https://forums.d2jsp.org/forum.php?f=104&o=*
// @include       https://forums.d2jsp.org/topic.php?t=*&f=104*
// @include	      https://forums.d2jsp.org/topic.php?t=*
// @require https://code.jquery.com/jquery-latest.js
// @version 1.70

// ==/UserScript==
(function() {
	'use strict';
	var trash_user_personnal = [603646];

	var checkUser = function(user){
		var _this = this;
		if (~trash_user_personnal.indexOf(user)){
			console.log(`Removing ${$('td:nth-child(3) > a', this).text()} (Reason: Personnal Blacklist)`)
			this.remove();
		}
		else{
			$.ajax({
				type: 'GET',
				url: `https://poker.bettor-status.net/individual_status.php?user_id=${user}`,
				dataType: 'JSON',
				error: function(httpCode) {
					console.log("[BNP Cleaner] Error getting live data")

				},
				success: function(jsonResult) {
					if (jsonResult['results'] != false){
						if (jsonResult['results'][1] >= 5){
							console.log(`Removing ${jsonResult['results'][0]} (Reason: Welcher/Blacklist)`)
							_this.remove();
						}
					}

				}
			});
		}
	}

	if (window.location.href.match(/\/topic\.php/)){
		$('body > form > dl').each(function(){
			if (typeof $('dt > a', this).attr('href') !== 'undefined' && ~$('dt > a', this).attr('href').indexOf('user.php')){
				checkUser.call(this, parseInt($('dt > a', this).attr('href').split('=')[1]));
			}
		})
	}
	else if (window.location.href.match(/\/forum\.php\?f\=104/)){
		$('body dl dd table.ftb tbody tr').each(function(){
			var userid = $('td:nth-child(3) > a', this).attr('href')
			if (typeof userid !== 'undefined'){
				checkUser.call(this, parseInt(userid.split("=")[1]))
			}
		});
	}

})();