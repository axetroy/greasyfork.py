// ==UserScript==
// @name         SB Toolbar Auto V2
// @version      2.2.0
// @compatible   Firefox
// @compatible   Chrome
// @description  Automatically goes to the next video for SB Toolbar.
// @author       Mattwmaster58
// @match        https://toolbartv.swagbucks.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/css-element-queries/0.4.0/ResizeSensor.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdn.rawgit.com/marcuswestin/store.js/135422d25b331dee3312abea90494a6e11557b2e/dist/store.everything.min.js
// @namespace    https://greasyfork.org/users/107214
// @license      MIT
// @grant        window.close
// ==/UserScript==

//JSHint directives
/* globals store, ResizeSensor*/

this.$ = this.jQuery = jQuery.noConflict(true);

//MIN/MAX wait value UI
var xa = "<details id='sbToolbarAutoSettings'><summary>SB Toolbar Auto settings</summary>",
xb = "<p class='descriptionText'>Set the minimum and maximum delays (respectively) in seconds for the script below.</p>",
xc = '<input id="apply" type="button" value="Apply"/>',
xd = '<input id="min" min="0" max="15" type="number"/>',
xe = '<input id="max" min="0" max="25" type="number"/>',
xf = '<div><input id="closeOnFinish" type="checkbox" label="hey"/>',
xg = "<span id='closeOnFinishTxt'>Close tab after all videos are finished</span><div/>",
today = new Date();

var cntuScrpt = true;

Date.prototype.stdTimezoneOffset = function () {
	var jan = new Date(this.getFullYear(), 0, 1);
	var jul = new Date(this.getFullYear(), 6, 1);
	return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

Date.prototype.dst = function () {
	return this.getTimezoneOffset() < this.stdTimezoneOffset();
};

$(document).ready(function () {
	if (!window.frameElement) { //if we're not running in iframe continue
		init();
	} else {
		console.log("Not running in iFrame (URL=" + location.href + ")");
	}
});

function oTSetup() {
	if (store.get("consecCat") === undefined) {
		store.set("consecCat", 0);
	}
	if (store.get("min") === undefined && store.get("max") === undefined) {
		store.set("max", 3000);
		store.set("min", 1500);
	}
	if (store.get("usedVideoIDs") === undefined) {
		store.set("usedVideoIDs", []);
	}
	if (store.get("dayMonth") === undefined) {
		store.set("dayMonth", today.getDay() + "" + today.getMonth());
	}
	if(store.get("closeOnFinish") === undefined){
		store.set("closeOnFinish", false);
	}
}

function init() {
	$("#adIframe").remove();
	$("#content").remove();
	$("#banner_ad").remove();
	$("#screen_in").remove();
	$("#videoPlayerComponent").remove();
	//Undefined 'local storage' var init
	if (store.get("firstRun") === undefined) {
		store.set("firstRun", false);
		oTSetup();
	} else if (store.get("dayMonth") != today.getDay() + "" + today.getMonth()) {
		console.log("SB Toolbar Auto: Another day, another 60 SB. Resetting day");
		store.remove("usedVideoIDs");
		store.set("usedVideoIDs", []);
		store.set("dayMonth", today.getDay() + "" + today.getMonth());
	}
	// all vids watched
	if (store.get("consecCat") >= $("[id^=menuFeed").length) {
		console.log("SB Toolbar: All possible videos watched");
		if (store.get("closeOnFinish")) {
			window.close();
		} else {
			alert("SB Toolbar: All possible videos watched. Waiting " + mSecToTime(millisToMidnight()) + " to reload");
			setTimeout(function () {
				location.reload();
			}, millisToMidnight());
			cntuScrpt = false;
		}
	}
	//logged out
	if ($("#meterLoggedOut").is(":visible")) {
		console.warn("SB Toolbar Auto: You are not logged in. Script stopped");
		alert("SB Toolbar Auto: You are not logged in. Script stopped");
		setTimeout(function () {
			location.reload();
		}, 60 * 1000 * 15);
		cntuScrpt = false;
	} // over limit
	if ($("#meterOverlimit").is(":visible")) {
		if (store.get("closeOnFinish")) {
			window.close();
		} else {
			console.log("SB Toolbar Auto: Daily limit reached waiting " + millisToMidnight());
			alert("Daily limit reached. Waiting " + mSecToTime(millisToMidnight()) + " to reload");
			setTimeout(function () {
				location.reload();
			}, millisToMidnight());
			cntuScrpt = false;
		}
	}
	//MIN/MAX value setup
	$("#realtedCont").prepend(xa + xb + xc + xd + xe + xf + xg);
	$(".descriptionText").css("font-size", "13px");
	$("#sbToolbarAutoSettings").css("font-size", "15px");
	$("#apply").css({
		"margin": "2px",
		"padding": "2px"
	});
	$("#min,#max,#closeOnFinish,#closeOnFinishTxt").css({
		"margin": "2px",
		"padding": "1px"
	});
	$("#max").change(function () {
		$("#min").prop("max", $("#max").val());
	});
	$("#min").change(function () {
		$("#max").prop("min", $("#max").val());
	});
	$("#closeOnFinish").change(function () {
		if ($(this).prop("checked")) {
			store.set("closeOnFinish", true);
		} else {
			store.set("closeOnFinish", false);
		}
	});
	if (store.get("closeOnFinish") !== undefined) {
		$("#closeOnFinish").prop("checked", store.get("closeOnFinish"));
	} else {
		store.set("closeOnFinish", false);
	}
	$("#min").val(store.get("min") / 1000);
	$("#max").val(store.get("max") / 1000);
	//apply function
	$("#apply").click(function () {
		settingsApply();
	});
	if (cntuScrpt !== false) {
		if ($("#meterDuplicateVideo").is(":visible")) {
			console.log("SB Toolbar Auto: Duplicate video");
			if (store.get("usedVideoIDs").indexOf(getVideoID(location.href)) === -1) {
				store.push("usedVideoIDs", getVideoID(location.href));
			}
			nxtVid();
		} else {
			mtrUp();
		}
	}

}

function rInt(min, max) {
	//defualt to value from local storage
	min = (min === undefined ? min = store.get("min") : min);
	max = (max === undefined ? max = store.get("max") : max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function settingsApply() {
	var min = parseFloat($("#min").val());
	var max = parseFloat($("#max").val());
	//'sanitize' inputs
	if (max < min) {
		console.warn("SB Toolbar Auto: Max greater than Min");
		// 1 second over min
		while (max < min) {
			max++;
		}
		max += 1000;
	}
	if (max < 0 || min < 0) {
		if (max < 0) {
			store.set("max", 0);
			$("#max").attr("value", 0);
			max = 0;
		}
		if (min < 0) {
			store.set("min", 0);
			$("#min").attr("value", 0);
			max = 0;
		}
	}
	if (max >= 25 || min >= 15) {
		if (max >= 25) {
			if (confirm("A maximum delay longer than 25 seconds is not reccomended. Click OK to continue and Cancel to revert to default settings") === false) {
				max = 6;
				$("#max").val(max);
			}
		}
		if (min >= 15) {
			if (confirm("A minimum delay longer than 15 seconds is not reccomended. Click OK to continue and Cancel to revert to default settings") === false) {
				min = 2;
				$("#max").val(min);
			}
		}
	}
	store.set("min", min * 1000);
	store.set("max", max * 1000);
}

function millisToMidnight() {
	//Swagbucks clock resets @ 12:00am CT. It also observes DST
	var now = new Date();
	if (now.dst()) {
		console.log("SB Toolbar Auto: DST is active, Adding 1h to time");
	}
	var tmzOfst = now.getTimezoneOffset() - 360;
	now.setHours(now.getHours() + tmzOfst);
	var then = new Date(now);
	then.setHours(24, 0, 0, 0);
	return (then - now);
}

function mSecToTime(ms) {
	var seconds = (ms / 1000).toFixed(0);
	var minutes = Math.floor(seconds / 60);
	var hours = "";
	if (minutes > 59) {
		hours = Math.floor(minutes / 60);
		hours = (hours >= 10) ? hours : "0" + hours;
		minutes = minutes - (hours * 60);
		minutes = (minutes >= 10) ? minutes : "0" + minutes;
	}

	seconds = Math.floor(seconds % 60);
	seconds = (seconds >= 10) ? seconds : "0" + seconds;
	if (hours !== "") {
		return hours + " hours, " + minutes + "minutes, and " + seconds + " seconds.";
	}
	return minutes + " minutes and " + seconds + " seconds";
}

function mtrUp() {
	var sensor;
	var tmO = setTimeout(function () {
			console.warn("SB Toolbar Auto:  Meter didn't go up within alloted time");
			sensor.detach();
			nxtVid();
		}, 50000);
	setTimeout(function () {
		sensor = new ResizeSensor($("#meterFill"), function () {
				sensor.detach();
				console.log("SB Toolbar Auto: Meter increased");
				clearTimeout(tmO);
				nxtVid();
			});
		console.log("SB Toolbar Auto: Sensor attached");
	}, 2000);
}

function getVideoID(VURL) {
	var lastSIndex = VURL.lastIndexOf("/");
	return VURL.substring(lastSIndex + 1);
}

function nxtVid(crtVidID) {
	var crtVid;
	if (crtVidID === undefined) {
		crtVid = $(".thumb-container.active");
	} else {
		crtVid = $("[href$=" + crtVidID + "]").parents().eq(1);
	}
	var nxtVURL = crtVid.next().children().eq(4).prop("href");
	if (crtVid.hasClass("lastItem")) {
		if (!$(".feed-ajax-next").is(":visible")) {
			console.log("SB Toolbar Auto: Out of Videos in this category");
			setTimeout(function () {
				window.location.href = nxtCat();
			}, rInt());
		} else {
			$(".feed-ajax-next").click();
			console.log("SB Toolbar Auto: Going to next group of 4 vids");
			setTimeout(function () {
				nxtVURL = $(".thumb-container").eq(0).children().eq(4).prop("href");
				if (store.get("usedVideoIDs").indexOf(getVideoID(nxtVURL)) !== -1) {
					console.log("SB Toolbar Auto: Used Videos found! Going to next one");
					nxtVid(getVideoID(nxtVURL));
				} else {
					store.set("newCat", false);
					console.log("SB Toolbar Auto: Going to video with ID# " + getVideoID(nxtVURL));
					store.push("usedVideoIDs", getVideoID(nxtVURL));
					setTimeout(function () {
						window.location.href = nxtVURL;
					}, rInt());
				}
			}, 2150);
		}
	} else {
		if (store.get("usedVideoIDs").indexOf(getVideoID(nxtVURL)) !== -1) {
			console.log("SB Toolbar Auto: Used Videos found! Going to next one");
			nxtVid(getVideoID(nxtVURL));
		} else {
			store.set("newCat", false);
			console.log("SB Toolbar Auto: Going to video with ID# " + getVideoID(nxtVURL));
			store.push("usedVideoIDs", getVideoID(nxtVURL));
			setTimeout(function () {
				window.location.href = nxtVURL;
			}, rInt());
		}
	}
}

function nxtCat() {
	if (store.get("newCat") === true) {
		store.set("consecCat", store.get("consecCat") + 1);
	} else {
		store.set("newCat", true);
	}
	var nxtPURL = $(".selected").parents().eq(0).next().children().prop("href");
	if (nxtPURL === undefined) {
		if ($(".selected").parents().eq(0).siblings().children().prop("href") === undefined) {
			console.warn("SB Toolbar Auto: Fatal error: Couldn't get next playlist");
			setTimeout(function () {
				return "//toolbartv.swagbucks.com";
			}, rInt());
		} else {
			return $(".selected").parents().eq(0).siblings().children().prop("href");
		}
	} else {
		return nxtPURL;
	}
}
