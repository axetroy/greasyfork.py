// ==UserScript==
// @name          Altiros dark theme
// @namespace     http://userstyles.org
// @description	  cool description
// @author        TaskForce141
// @include       http://altiros.net/*
// @include       https://altiros.net/*
// @include       http://*.altiros.net/*
// @include       https://*.altiros.net/*
// @grant         none
// @run-at        document-end
// @version       0.20161003215843
// ==/UserScript==

(function() {

//попытка добавить возможность редактировать свои сообщения на форуме
	var current_user_name = document.querySelector('.right-user-nav .user-info').innerText;
	var all_posts = document.querySelectorAll('.body_message');

	for (var i=0; i<all_posts.length; i++) {

		var post = all_posts[i];

		var post_info = post.querySelector('[id$=\'extra_info\']');
		var post_number = post_info.id.match(/\d+/);
		var poster_name = post_info.querySelector('h4 a').innerText;

		if (poster_name == current_user_name) {

			var dropdown = post.querySelector('.navbar-right .dropdown-menu');
			$(dropdown).append(
				$('<li>').attr('class','edit_button').append(
					$('<a>').attr('onclick','return oQuickModify.modifyMsg('+post_number+')').append(
						("Редактировать")
			)));
		}
	}

	var css = [
	"* {",
	"	color: #8A8A8A !important",
	"}",
	"span ,",
	"a:link {",
	"	color: #82A77F !important;",
	"}",
	"",
	"a:active {",
	"	color: #559A5A !important;",
	"}",
	"",
	"a:visited {",
	"	color: #5BA350 !important;",
	"}",
	"",
	"a:hover {",
	"	color: #4C6D53 !important;",
	"}",
	"",
	"body {",
	"background-color: #2F2F2F !important;",
	"}",
	"",
	".header {",
	"background-color: #3F3F3F !important;",
	"}",
	"",
	"#slide-out,",
	".copy-right {",
	"	background-color: #3F3F3F !important;",
	"}",
	"",
	".right-nav {",
	"	background-color: #3F3F3F !important;",
	"}",
	"",
	".body_message,",
	".body_content {",
	"	background-color: #1F1F1F !important;",
	"}",
	"",
	".fa-circle-o[style*=\"color: #b9fb5a;\"] {",
	"	color: #2299EE !important;",
	"}",
	"",
	".smalltext {",
	"	color: #BBBBFF !important;",
	"}",
	"",
	".inner {",
	"	color: #CCCCCC !important;",
	"}",
	"",
	"#help_popup .windowbg {",
	"	background:",
	"		repeating-linear-gradient(",
	"			-45deg,",
	"			#1F1F1F,",
	"			#1F1F1F 5px,",
	"			#393F45 5px,",
	"			#393F45 10px",
	"		) top left fixed;",
	"	background-size: 15px 15px;",
	"}",
	"",
	"#help_popup .description {",
	"	color: #EEEECC",
	"}",
	"div.topic_table tbody tr td {",
	"	border-color: #666 !important",
	"}",
	"div.topic_table tbody tr :not(.whos_viewing) {",
	"	background-color: #1F1F1F !important",
	"}",
	".tborder .description,",
	"#display_jump_to.plainbox {",
	"	border-color: #393F45 !important",
	"}",
	"#topic_icons .description,",
	"#display_jump_to {",
	"	background-color: #393F45 !important",
	"}",
	"select,",
	"input {",
	"	background-color: #555 !important",
	"}",
	"input[type=\"button\"] {",
	"	border-color: #555 !important",
	"}",
	"[id$=\"_jump_to_select\"] {",
	"	border-color: #666 !important",
	"}",
	".pagelinks {",
	"	color: #82A77F !important",
	"}",
	".user-info {",
	"	color: #DDD !important",
	"}",
	"#poll .windowbg {",
	"	background-color: #1F1F1F !important",
	"}",
	".core_posts {",
	"	background-color: #1F1F1F !important",
	"}",
	".roundframe {",
	"	background-color: #1F1F1F !important",
	"}",
	"[id^=\"newicon\"] span.label.label-warning {",
	"	background-color: #2D7883 !important;",
	"	color: #fff !important;",
	"}",
	".navPages {",
	"	margin: 0 2px",
	"}",
	".pagelinks.floatleft a {",
	"	margin: 0 5px",
	"}",
	".poster a[title^=\"Просмотр профиля\"] {",
	"	margin: 0 5px",
	"}",
	".right-user-nav .user-img {",
	"	margin: 0 15px",
	"}",
	".right-nav {",
	"	max-width: 225px",
	"}",
	".right-user-nav.user-box.tooltip::before {",
	"	margin-right: 100px",
	"}",
	".postcount .fa {",
	"	margin-bottom: 10px",
	"}",
	".postcount span {",
	"	margin: 0 5px",
	"}",
	"#drop-user-nav .user-box-bott {",
	"	margin-left: -30px",
	"}",
	".table_list tr{",
	"	background-color: #1F1F1F !important;",
	"}",
	".table_list tr>td{",
	"	background-color: #1F1F1F !important;",
	"	border-color: #1F1F1F !important;",
	"}",
	".quickReplyContent textarea {",
	"	background-color: #1F1F1F !important;",
	"}",

	"#bbcBox_message img {",
	"	filter: invert(1) hue-rotate(180deg) !important;",
	"}",

	".card .m_mgroup,",
	".card .m_mlink {",
	"	display: inline-block;",
	"	width: 125px;",
	"	overflow: hidden;",
	"	text-overflow: ellipsis;",
	"	white-space: nowrap;",
	"}",
	".card {",
	"	background-color: #1F1F1F !important;",
	"}",
	".card {",
	"	border-color: transparent !important;",
	"}",
	".card .content {",
	"	background-color: #393F45 !important;",
	"}",

	"#quick_edit_body_container .editor {",
	"	height: 100px; !important",
	"}",


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
