// ==UserScript==
// @name         Ultimate 9Anime Mod!
// @namespace    Ultimate 9Anime Mod!
// @version      1
// @description  Removes all Ads from 9Anime and provides you with a new and better view to watch anime.
// @author       TigerYT
// @match        *://*.9anime.ru/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

$(".text-center").css('display','block'); 
$(".player").attr("id","video");
$(".exo-native-widget").css('display','block'); 

(function() {var css = [
    "#p_2401696 {",
    "  display: none;",
    "}",
    "",
    "div > div > div > a, iframe {",
    "  display: none;",
    "}",
    "",
    ".player {",
    "z-index: 4;",
    "}",
    "",
    ".videotitle {",
    "background: linear-gradient(rgb(6,6,6) 85%, rgb(0,0,0)) !important;",
    "border-top-left-radius: 25px;",
    "border-top-right-radius: 25px;",
    "}",
    "",
    ".videobody {",
    "background: rgb(6,6,6) !important;",
    "border-bottom-left-radius: 25px;",
    "border-bottom-right-radius: 25px;",
    "}",
    "",
    "body.dark .video  {",
    "background: #000;",
    "}",
    "",
    "div[style*='z-index: 3;'] {",
    "opacity: 1 !important;",
    "}",
    "",
    "::-webkit-scrollbar {",
    "  background: linear-gradient(to right, #000,#16151D);",
    "  border-right: 3px solid #694BA1;",
    "  width: 10px;",
    "}",
    "",
    "::-webkit-scrollbar-thumb {",
    "  background: #0B0A0D;",
    "  border: 2px solid #694BA1;",
    "  border-right: 0px solid transparent;",
    "}",
    "",
    "iframe[src*='https://www.rapidvideo.com/e/'] {",
    "  display: block !important;",
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

document.addEventListener('keydown', function (e) {
    if (e.keyCode === 84) {
         document.getElementById('video').scrollIntoView(true);
         $('div[style*="opacity: 0.97"]').css('display', 'block');
         $("#video").addClass("video");
         $("#video > .widget-title").addClass("videotitle");
         $("#video > .widget-body").addClass("videobody");
    }
});

document.addEventListener('keydown', function (e) {
    if (e.keyCode === 89) {
         $('div[style*="opacity: 0.97"]').css('display', 'none');
         $("#video").removeClass("video");
         $("#video > .widget-title").removeClass("videotitle");
         $("#video > .widget-body").removeClass("videobody");
    }
});