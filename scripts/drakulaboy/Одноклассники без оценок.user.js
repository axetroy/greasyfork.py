// ==UserScript==
// @name          Одноклассники без оценок
// @namespace     http://userstyles.org
// @description	  Бывает иногда жмешь не на ту оценку ну или просто не хочешь видеть их
// @author        drakulaboy
// @homepage      https://userstyles.org/styles/92104
// @include       http://ok.ru/*
// @include       https://ok.ru/*
// @include       http://*.ok.ru/*
// @include       https://*.ok.ru/*
// @run-at        document-start
// @version       0.20180428102325
// ==/UserScript==
(function() {var css = [
	"@namespace url(http://www.w3.org/1999/xhtml);",
	".marks.__photo-card {",
	"    display: none;",
	"}",
	"",
	"#hook_Block_PopLayerViewFriendPhotoRating {",
	"    display: none;",
	"}    ",
	"",
	"div.photo-bg.foh-s {",
	"    display: none;",
	"}"
].join("\n");
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node);
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
