// ==UserScript==
// @name          SaveFrom.Net Menu (Dark-Transparent) by БлагоЯр
// @namespace     http://userstyles.org
// @description	  Тёмно-прозрачное меню для расширения <a href="http://ru.savefrom.net/user.php?vid=387#helper_install">SaveFromNet</a>
// @author        БлагоЯр
// @homepage      https://userstyles.org/styles/153107
// @run-at        document-start
// @version       0.20180921152825
// ==/UserScript==
(function() {var css = [
	"/* i really want this to be global */",
	"",
	"#dl_confirm_box_popup, #sf_progress_popup, .sf-select-btn {",
	"  background-color:rgba(26,26,26,.8) !important;",
	"}",
	"#sf-popupMenu, #sf-popupMenu a:hover, a>.sf-feed-btn, div>.sf-feed-btn, span>.sf-feed-btn, div > .sf-dl-current-photo-btn, #photoDlMenu, .sf-feed-dl-btn, #sf-single-video-menu, .sf-popupMenu .sf-menu-item, .sf-popupMenu .sf-menu-item, #sfYtFrameBtn, .sf-select-btn:hover {",
	"  background-color:rgba(20,20,20,.7) !important;",
	"}",
	"#sf-popupMenu a:hover, #sf-popupMenu .sf-menu-item span div, #sf-single-video-menu a:hover, .savefrom_ok_download>a, .savefrom_ok_download, #sf-single-video-menu .sf-menu-item span div, .sf-popupMenu .sf-menu-item span div {",
	"  background-color:transparent !important;",
	"}",
	"#savefrom__yt_btn button, #savefrom__yt_btn .sf-quick-dl-btn, a>.sf-feed-btn:hover, div>.sf-feed-btn:hover, span>.sf-feed-btn:hover, div>.sf-dl-current-photo-btn:hover, #photoDlMenu a:hover {",
	"  background-color:#1b1b1b !important;",
	"}",
	".sf-infoPopupTemplate style+button+button, .sf-infoPopupTemplate style+button {",
	"background-color:rgba(49,49,49,.5) !important;",
	"}",
	".sf-quick-btn {",
	"background-color:rgba(171,222,67, .5) !important;",
	"}",
	".sf-quick-btn:hover {",
	"background-color:rgba(171,222,67, .7) !important;",
	"}",
	"#savefrom__yt_btn button:hover, #savefrom__yt_btn .sf-quick-dl-btn:hover, #sf-popupMenu a:hover, #photoDlMenu a:hover, #sf-single-video-menu>a:hover, #sf-single-video-menu .sf-menu-item:hover span, .sf-infoPopupTemplate div p, #photoDlMenu a.sf-menu-item:hover>span, .sf-menu-item:hover span, div.sf-menu-item:hover {",
	"  color:#fff !important;",
	"}",
	".sf-infoPopupTemplate style+button+button:hover, .sf-infoPopupTemplate style+button:hover {",
	"  color:#000 !important;",
	"  text-shadow:0 0 1px #000 !important",
	"}",
	".sf-infoPopupTemplate div p>a {",
	"  color:#9ACD32 !important;",
	"}",
	".sf-infoPopupTemplate div p>a:hover {",
	"  text-shadow:0 0 1px #9ACD32 !important;",
	"}",
	"#sf-popupMenu .sf-menu-item span div {",
	"  color:rgba(253,99,71,.5) !important;",
	"}",
	"#sf-popupMenu .sf-menu-item:hover span div, #sf-single-video-menu .sf-menu-item:hover>span>div, .sf-popupMenu .sf-menu-item:hover span div {",
	"  color:rgba(253,99,71,1.0) !important;",
	"}",
	"#savefrom__yt_btn button, #savefrom__yt_btn .sf-quick-dl-btn {",
	"  color:#888 !important;",
	"}",
	"#sf-popupMenu .sf-menu-item, .sf-menu-item, #sf-single-video-menu .sf-menu-item>span>div, #photoDlMenu a.sf-menu-item>span, .sf-popupMenu .sf-menu-item span div {",
	"  color:#666 !important;",
	"}",
	"#sf-popupMenu .sf-menu-item:hover span div, #sf-single-video-menu .sf-menu-item:hover>span>div, .sf-popupMenu .sf-menu-item:hover span div {",
	"  text-shadow:0 0 1px #fd6347 !important;",
	"}",
	".sf-popupMenu {",
	"  border:1px solid #000 !important;",
	"}",
	"#savefrom__yt_btn button, #savefrom__yt_btn .sf-quick-dl-btn, a>.sf-feed-btn, div>.sf-feed-btn, span>.sf-feed-btn {",
	"  border-color:#1b1b1b !important;",
	"}",
	"#sf-popupMenu, div[style*=\"border-top: 1px solid rgb(214, 214, 214)\"], #sf-popupMenu .sf-menu-item span div, div>.sf-dl-current-photo-btn, #photoDlMenu, #sf-single-video-menu, #dl_confirm_box_popup, .sf-infoPopupTemplate style+button+button, .sf-infoPopupTemplate style+button, #sf_progress_popup, .sf-select-btn, .sf-quick-btn {",
	"  border-color:#000 !important;",
	"}",
	"#sf-popupMenu {",
	"  border-radius:5px !important;",
	"}",
	".sf-btn-ctr.sf-hide-ui, #sfYtFrameBtn {",
	"  border-radius:3px !important;",
	"}",
	"#sf-popupMenu, #dl_confirm_box_popup, #sf_progress_popup, .sf-popupMenu {",
	"  box-shadow:0 0 10px 1px #000 !important;",
	"}",
	"#sf-popupMenu .sf-menu-item span div {",
	"  height:19px !important;",
	"}",
	".savefrom_ok_download {",
	"  right: 110px !important;",
	"}",
	"#sf-single-video-menu .sf-menu-item>span>div, .sf-popupMenu .sf-menu-item span div {",
	"margin-top:-3px !important;",
	"}",
	"#savefrom__yt_btn button, #savefrom__yt_btn .sf-quick-dl-btn, #sf-popupMenu a, #sf-popupMenu .sf-menu-item span div, #photoDlMenu a, .sf-feed-dl-btn, #sf-single-video-menu .sf-menu-item *, .sf-infoPopupTemplate div p>a, .sf-infoPopupTemplate button, #photoDlMenu a.sf-menu-item>span, .sf-menu-item * {",
	"transition-duration: 0.05s !important;",
	"transition-property:color, text-shadow !important;",
	"transition-timing-function: ease-in-out !important;",
	"-webkit-transition: all linear 0.3s !important;",
	"-moz-transition: all linear 0.3s !important;",
	"-ms-transition: all linear 0.3s !important;",
	"-o-transition: all linear 0.3s !important;",
	"transition: all linear 0.3s !important;",
	"}",
	".sf-infoPopupTemplate div p>a {",
	"  text-shadow:none !important;",
	"}",
	".savefrom_ok_download, .sf-feed-dl-btn {",
	"border:none !important",
	"}",
	"#sf-conv-btn, a[href^=\"ummy\"], #sf-ummy-btn {",
	"  display:none !important;",
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
