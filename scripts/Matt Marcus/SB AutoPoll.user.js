// ==UserScript==
// @name         SB AutoPoll
// @description  Does the poll automatically when you go to it
// @compatible   Chrome
// @include      http://www.swagbucks.com/*
// @author       Mattwmaster58
// @version      0.3.3
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @icon         https://pichoster.net/images/2017/03/11/6832b44dc990d3deea52ce1b2592a13b.png
// @license      MIT
// @namespace    https://greasyfork.org/users/107214
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var noReVoteCntr = 0;
var noReVote = false;
var nop = $(".pollCheckbox").length;
var option = rInt(0, nop);

init();

function init() {
	if (window.location.href !== "http://www.swagbucks.com/polls") {
		dlyPlElem = $(".sbMainNavSectionListCta:contains('Daily Poll')");
		if (dlyPlElem.length > 0) {
			//create auto button
			var btn1 = $('<input/>').attr({
					type: "button",
					name: "btn1",
					value: "AutoPoll"
				});
			btn1.attr("id", "pollBtnForDayz");
			btn1.css("margin", "6px");
			$("#sbMainNavSectionToDoListCopy").append(btn1);
			if (dlyPlElem.parents().eq(0).hasClass("itemtrue")) {
				$("#pollBtnForDayz").prop("disabled", "true");
			}
			btn1.click(function () {
				console.log("SB AutoPoll: Auto button clicked");
				$("#pollBtnForDayz").prop("disabled", "true");
				GM_setValue("auto", true);
				GM_openInTab("http://www.swagbucks.com/polls");
			});
		}
	} else {
		if ((".pollCheckbox").length < 1) {
			alert("SB AutoPoll: Poll has already been done");
			window.close();
		} else {
			console.log("SB AutoPoll: Doing poll right now");
			doPoll();
		}
	}
}

function rInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function doPoll() {
	 $(window).on( "load", function() {
		if (rInt(0, 5) < 1 && noReVote === false) { //25% chance vote will be changed every time
			console.log("SB AutoPoll: Randomizing vote");
			option = rInt(0, nop);
			noReVoteCntr++;
			if (noReVoteCntr >= 2) {
				noReVote = true;
				doPoll();
			}
			doPoll();
		} else {
			//create a bunch of random delays
			var tm1 = rInt(50, 75);
			var tm2 = rInt(tm1, (tm1 + 175));
			setTimeout(function () {
				$(".pollCheckbox").eq(option).click();
			}, tm1);
			setTimeout(function () {
				$("#btnVote").click();
			}, tm2);
			if (GM_getValue("auto") === true) {
				var tm3 = rInt((tm2 + 500), (tm2 + 650));
				GM_setValue("auto", false);
				setTimeout(function () {
					window.close();
				}, tm3);
			}
		}
	});
}
