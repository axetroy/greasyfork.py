// ==UserScript==
// @name         虎扑论坛评分计算
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.1.0
// @description  专区贴子的评分计算
// @author       pana
// @include        http*://bbs.hupu.com/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	const titleStr = $("head title").text();
	const valueReg = /\(([0-9\.]+)%\)$/i;
	const NBA_Array = [0.1, 0.09, 0.08, 0.07, 0.06, 0.05];
	const QMS_Array = [0.1, 0.09, 0.08, 0.07, 0.06, 0.05, 0.04, 0.03, 0.02, 0.01];
	const YPR_Array = [0.1, 0.09, 0.08, 0.07, 0.06, 0.04, 0.02, 0.01];

	function AfterGameScore(scoreArray, fixedNum) {
		$("div#tpc table.case div.vote_box a.blue").each(function() {
			if ($(this).parent().find("u.avgText").length === 0) {
				let scoreSum = 0;
				$(this).parents("div.vote_box").find("div.votebox_w a").each(function(j) {
					let valueText = valueReg.exec($(this).text())[1];
					scoreSum = scoreSum + (Number(valueText) * scoreArray[j])
				});
				let avgText = '<u class="avgText" style="margin-left: 20px;">平均分: ' + scoreSum.toFixed(fixedNum) + '</u>';
				$(this).after(avgText)
			}
		})
	}
	function VideoScore(scoreArray, fixedNum) {
		$("div#tpc table.case div.vote_box a.blue").each(function() {
			if ($(this).parent().find("u.avgText").length === 0) {
				let scoreSum = 0;
				let nullNum = 0;
				let voteBox = $(this).parents("div.vote_box").find("div.votebox_w a");
				let voteNum = voteBox.length;
				for (let j = voteNum - 1; j >= 0; j--) {
					if (j === voteNum - 1) {
						nullNum = Number(valueReg.exec(voteBox.eq(j).text())[1]);
						nullNum = nullNum * scoreArray[j]
					} else {
						let valueText = valueReg.exec(voteBox.eq(j).text())[1];
						scoreSum = scoreSum + (Number(valueText) / (1 - nullNum) * scoreArray[j])
					}
				}
				let avgText = '<u class="avgText" style="margin-left: 20px;">平均分: ' + scoreSum.toFixed(fixedNum) + '</u>';
				$(this).after(avgText)
			}
		})
	}
	if (titleStr.indexOf("赛后评分") !== -1) {
		AfterGameScore(NBA_Array, 3);
		$("div#tpc table.case div.vote_box input[type='button']").on('click', function() {
			setTimeout(function() {
				AfterGameScore(NBA_Array, 3)
			}, 1000)
		})
	} else if (titleStr.indexOf("秋名山论美") !== -1) {
		AfterGameScore(QMS_Array, 3);
		$("div#tpc table.case div.vote_box input[type='button']").on('click', function() {
			setTimeout(function() {
				AfterGameScore(QMS_Array, 3)
			}, 1000)
		})
	} else if (titleStr.indexOf("影评人") !== -1) {
		VideoScore(YPR_Array, 3);
		$("div#tpc table.case div.vote_box input[type='button']").on('click', function() {
			setTimeout(function() {
				VideoScore(YPR_Array, 3)
			}, 1000)
		})
	}
})();