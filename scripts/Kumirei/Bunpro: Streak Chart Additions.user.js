// ==UserScript==
// @name         Bunpro: Streak Chart Additions
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  Adds a bar for unlearned items and a bar for items with streak 0.
// @author       Kumirei
// @include      *bunpro.jp/user/profile/stats
// @grant        none
// ==/UserScript==

(function() {
		//ads the bars
		function editChart() {
				//change styling of stamps to make room for the two new ones
				$('head').append('<style id="ChartScriptStyle">'+
								 '.bunpro-hanko-stats .col-xs-1 {width: 7.14% !important; padding: 0;}'+
								 '@media (min-width: 768px) {'+
								     '.bunpro-hanko-stats {padding-left: 33px !important; padding-right: 13px !important;}'+
								 '}'+
								 '@media (min-width: 1200px) {'+
								     '.bunpro-hanko-stats {padding-left: 38px !important; padding-right: 8px !important;}'+
								 '}'+
								 '</style>');
				var config = myChart.chart.config;
				var dataset = config.data.datasets[0];
				var unlearned = total - learned;
				var zeroStreak = learned - dataset.data.reduce(function(a,b){return a+b;});
				dataset.data.unshift(unlearned, zeroStreak);                                      //add the bars
				config.data.labels.unshift(" ", "0");                                             //label the bars
				config.options.tooltips.displayColors = false;                                    //removes color box from tooltip label
				config.options.tooltips.callbacks = {title: function(item, data) {                //add interval info to tooltip
						return ["Unlearned", "Now", "4h", "8h", "24h", "2d", "4d", "8d", "2w", "1m", "2m", "4m", "6m", "Never"][item[0].index];}};
				dataset.label = "Count";                                                          //changes "Streak" to "Count" in tooltip
				var gradient = ctx.createLinearGradient(0, 0, 0, 400);
				gradient.addColorStop(0, 'rgb(227, 191, 127)');
				gradient.addColorStop(1, 'rgb(219, 32, 35)');
				dataset.backgroundColor = ["#1b2437", ...Array(13).fill(gradient)];               //make unlearned bar a different color
				myChart.update();                                                      //update chart
				$('.bunpro-hanko-stats').prepend('<div class="col-xs-1 streak hanko-grey"></div><div class="col-xs-1 streak hanko-1"></div>');
		}


		//get number of learned items and total number of items
		var url = $('#logo')[0].href; //profile page url
		var learned = 0;
		var total = 0;
		$.get(url, function(data) {
				$(data).find('.progress-count').each(function(i, e) {
						var LearnedTotal = e.innerText.split('/');
						learned += Number(LearnedTotal[0]);
						total += Number(LearnedTotal[1]);
				});
		}).then(editChart);
})();