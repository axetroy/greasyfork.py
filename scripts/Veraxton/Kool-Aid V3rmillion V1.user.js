// ==UserScript==
// @name          Kool-Aid V3rmillion V1
// @namespace     https://v3rmillion.net
// @description	  The Kool-Aid theme for Vermillion
// @author        Kool-Aid
// @homepage      https://userstyles.org/styles/163090
// @include       https://v3rmillion.net*
// @include       https://v3rmillion.net/siterules.php
// @include       https://v3rmillion.net/legal.html
// @include       https://v3rmillion.net/removals/
// @run-at        document-start
// @version       1.69
// ==/UserScript==
(function() {var css = "";
if (false || (document.location.href.indexOf("https://v3rmillion.net") == 0))
	css += [
		"#logo img, .logo",
		"  {",
		"    content: url(http://tinyimg.io/i/m5JSRN6.png) !important;",
		"  }",
		"",
		"  .pm_new, .alert_new, ul.menu li a.active",
		"  {",
		"    background:  #0061ff !important;",
		"  }",
		"",
		"  #bridge",
		"  {",
		"    border-bottom: 5px solid #0061ff;",
		"  }",
		"",
		"  ul.menu li ul, .panel_buttons",
		"  {",
		"    border-top: 5px solid  #0061ff;",
		"  }",
		"",
		"  .pagination .pagination_current",
		"  {",
		"    background: #0061ff;",
		"    border: 1px solid #0061ff;",
		"    border-radius: 2px;",
		"  }",
		"",
		"  .pagination a",
		"  {",
		"    background:  #0061ff;",
		"    border: 1px solid  #0061ff;",
		"  }",
		"",
		"  .pagination a:hover",
		"  {",
		"    transition: background 0.2s ease, border 0.2s ease;",
		"    background: #0061ff;",
		"    border: 1px solid  #0061ff;",
		"  }",
		"",
		"  .thead",
		"  {",
		"    background:  #0061ff;",
		"  }",
		"",
		"  .popup_menu .popup_item:hover",
		"  {",
		"    color: #0061ff;",
		"  }",
		"",
		"  .buttons:hover",
		"  {",
		"    transition: border 0.2s ease;",
		"    background: #0061ff;",
		"    cursor: pointer;",
		"  }",
		"",
		"  .buttons",
		"  {",
		"    border: #0061ff;",
		"  }",
		"",
		"  a.postbit_qdelete, a.postbit_website, a.postbit_reply_pm, a.postbit_forward_pm, a.postbit_delete_pm, a.postbit_email, a.postbit_pm, a.postbit_find, a.postbit_edit, a.postbit_quote, a.postbit_multiquote, a.postbit_multiquote_on, a.postbit_report",
		"  {",
		"    background: #0061ff !important;",
		"    border: 1px solid #0061ff !important;",
		"  }",
		"",
		"  a.button.new_thread_button, button, input.button, a.button:link, a.button:visited, a.button:active",
		"  {",
		"    background: #0061ff;",
		"    border: 1px solid #0061ff;",
		"  }",
		"",
		"  a.button.new_thread_button:hover, button, input.button:hover, a.button:hover",
		"  {",
		"    transition: background 0.2s ease, border 0.2s ease;",
		"    background: #ffffff;",
		"    border: 1px solid #ffffff;",
		"  }",
		"",
		"  .tfoot",
		"  {",
		"    background: #0061ff;",
		"  }",
		"",
		"  .usercp_nav_item:before",
		"  {",
		"    color: #0061ff;",
		"  }",
		"",
		"  .thead input.textbox, .thead select",
		"  {",
		"    border: #0061ff;",
		"  }",
		"",
		"  ul.menu li a:hover, .panel_buttons a:hover, ul.menu li ul li a:hover",
		"  {",
		"    transition: background 0.5s ease;",
		"    background: #0061ff;",
		"  }",
		"",
		"  .thread_head",
		"  {",
		"    border-bottom: 5px solid #0061ff !important;",
		"  }",
		"",
		"  #footer",
		"  {",
		"    border-top: 5px solid #0061ff;",
		"  }",
		"",
		"  .forum_on",
		"  {",
		"    color: #0061ff;",
		"  }",
		"",
		"  .forum_off",
		"  {",
		"    color: #0061ff;",
		"  }",
		"",
		"  .cRem a:visited, .cRem a:link",
		"  {",
		"    color: #0061ff !important;",
		"  }",
		"",
		"  .inline_row a:visited, .inline_row a",
		"  {",
		"    color: #0061ff !important;",
		"  }",
		"",
		"  input.textbox:focus",
		"  {",
		"    transition: border 0.2s ease, box-shadow 0.2s ease;",
		"    border: 1px solid #0061ff;",
		"    box-shadow: 0 0 10px #0061ff;",
		"  }",
		"",
		"  form #message:focus",
		"  {",
		"    transition: border 0.2s ease, box-shadow 0.2s ease;",
		"    border: 1px solid #0061ff;",
		"    box-shadow: 0 0 10px #0061ff;",
		"  }",
		"",
		"  div#container span.smalltext a span strong",
		"  {",
		"    color: #FF8C00 !important;",
		"  }",
		"",
		"  .red_alert",
		"  {",
		"    background: #ff002a;",
		"  }",
		"",
		"  .red_alert:hover",
		"  {",
		"    transition: background 0.5s ease;",
		"    background: #ff002a;",
		"  }"
	].join("\n");
if (false || (location.href.replace(location.hash,'') == "https://v3rmillion.net/siterules.php") || (location.href.replace(location.hash,'') == "https://v3rmillion.net/legal.html") || (location.href.replace(location.hash,'') == "https://v3rmillion.net/removals/"))
	css += [
		"img",
		"  {",
		"    content: url(http://tinyimg.io/i/m5JSRN6.png) !important;",
		"  }",
		"",
		"  .wrap",
		"  {",
		"    border: 1px solid #0061ff;",
		"  }",
		"",
		"  .wrap a",
		"  {",
		"    color: #0061ff;",
		"  }",
		"",
		"  .footer",
		"  {",
		"    background-color: #0061ff;",
		"  }",
		"",
		"  .footer a",
		"  {",
		"    color: #0061ff;",
		"  }",
		"",
		"  .footer a:hover",
		"  {",
		"    transition: color 0.1s ease;",
		"    color: #0061ff;",
		"  }",
		"",
		"  a:link, a:visited",
		"  {",
		"    color: #0061ff;",
		"  }",
		"",
		"  a:link:hover, a:visited:hover",
		"  {",
		"    color: #0061ff;",
		"  }"
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
