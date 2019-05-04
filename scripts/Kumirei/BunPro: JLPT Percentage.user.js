// ==UserScript==
// @name         BunPro: JLPT Percentage
// @namespace    http://tampermonkey.net/
// @version      0.2.4
// @description  Adds percentages to the progress bars.
// @author       Kumirei
// @include      http://bunpro.jp/users*
// @include      https://bunpro.jp/users*
// @require      https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=115012
// @grant        none
// ==/UserScript==

(function() {
		$('head').append('<style id="BunProPercentageScript">' +
						 '    .profile-jlpt-level .progress .percentage {' +
						 '        position: absolute; '+
						 '        left: 50%;' +
						 '        line-height: 15px;' +
						 '        transform: translate(-50%,0);' +
						 '        text-shadow: 1px 0px black;' +
						 '    }' +
						 '</style>');
		waitForKeyElements('.profile-jlpt-level .progress-bar', function(e) {
				var percentage = String(Math.round(e.attr('aria-valuenow')*10)/10) + "%";
				$(e[0].parentNode).append('<span class="percentage">' + percentage + '</span>');
		});

		waitForKeyElements('.user_info', function(e) {
				var bar = e.find('.profile-jlpt-level')[0].cloneNode(true);
				$(bar).find('.percentage').remove();
				bar.childNodes[1].innerText = "Total";
				var barelem = $(bar).find('.progress-bar');
				var total = 0;
				var learned = 0;
				$('.row > .progress-count').each(function(i,e) {
						var counts = e.innerText.split(" ")[0].split("/");
						console.log(counts);
						total += Number(counts[1]);
						learned += Number(counts[0]);
				});
				barelem.attr('aria-valuenow', learned/total*100);
				barelem.attr('style', 'width: ' + learned/total*100 + '%;');
				$(bar).find('.progress-count')[0].innerText = String(learned) + '/' + String(total);
				var lastbar = $('.profile-jlpt-level');
				$(lastbar[lastbar.length-1]).after(bar);
		});
})();