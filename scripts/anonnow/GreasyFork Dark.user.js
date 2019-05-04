// ==UserScript==
// @name          GreasyFork Dark
// @namespace     http://userstyles.org
// @description	  Simple dark style for greasyfork and sleazyfork
// @author        reeds
// @homepage      https://userstyles.org/styles/138919
// @include       http://greasyfork.org/*
// @include       https://greasyfork.org/*
// @include       http://*.greasyfork.org/*
// @include       https://*.greasyfork.org/*
// @include       http://sleazyfork.org/*
// @include       https://sleazyfork.org/*
// @include       http://*.sleazyfork.org/*
// @include       https://*.sleazyfork.org/*
// @run-at        document-start
// @version       0.20170215213552
// ==/UserScript==
(function() {var css = [
	"* {",
	"    border-radius: 0 !important;",
	"}",
	"html,",
	"body,",
	"body:not(.Settings) {",
	"    background: #101010;",
	"    color: #c5c5c5;",
	"}",
	"#main-header,",
	"body:not(.Settings) #Head {",
	"    background: #222;",
	"}",
	"#main-header .subtitle,",
	".subtitle {",
	"    text-shadow: none;",
	"}",
	".script-list,",
	".user-list,",
	".text-content,",
	"#script-info,",
	".list-option-group ul,",
	"#Panel .FilterMenu,",
	"#Panel .PanelCategories,",
	"#Panel .MeBox,",
	"#Content,",
	".pagination>*,",
	".script-list+.pagination>*,",
	".user-list+.pagination>* {",
	"    background: #222;",
	"    box-shadow: none;",
	"    border: transparent;",
	"}",
	".script-list li {",
	"    border: transparent;",
	"}",
	".list-option-group .list-current,",
	"#script-links .current,",
	"#Panel .FilterMenu .Active a, ",
	"#Panel .PanelCategories .Active a {",
	"    background: #1b1b1b;",
	"    border-color: #9BAED2;",
	"}",
	".list-option-group a:hover,",
	".list-option-group a:focus,",
	"#Panel .FilterMenu a:hover, ",
	"#Panel .PanelCategories a:hover, ",
	"#Panel .FilterMenu a:focus, ",
	"#Panel .PanelCategories a:focus,",
	".pagination>a:hover,",
	".pagination>a:focus {",
	"    background: #1b1b1b;",
	"    box-shadow: none;",
	"}",
	"form.external-login-form,",
	"form.new_user {",
	"    background: #1b1b1b;",
	"    border-color: transparent;",
	"}",
	"form.new_user input[type=\"submit\"] {",
	"    background: #336399;",
	"    border-color: #336399;",
	"}",
	"#additional-info>div {",
	"    background: #1b1b1b !important;",
	"    border-color: #333;",
	"}",
	"#install-stats-chart-container-canvas,",
	"#weekly-install-stats-chart-container-canvas,",
	"#update-check-stats-chart-container-canvas{",
	"  filter: invert(100%);",
	"}",
	"a,",
	"body:not(.Settings) a:not(.Button):not(.ChangePicture) {",
	"    color: #9BAED2;",
	"}",
	"a:visited {",
	"    color: #B8A7C3;",
	"}",
	"    ",
	"/*! Code */",
	".Message pre,",
	".Message pre ol {",
	"    background: #aaaaaa;",
	"    border-color: #343434;",
	"}",
	"pre, code, #code-container,",
	"#code-container {",
	"    background: #2B2B2B;",
	"    border-color: #343434;",
	"}",
	".CodeRay .line-numbers pre, .CodeRay .line-numbers pre a, .CodeRay .line-numbers {",
	"    background: #2B2B2B !important;",
	"    border-color: #2B2B2B !important;",
	"}",
	".CodeRay {",
	"    background: #2B2B2B !important;",
	"    color: #E6E1DC !important;",
	"}",
	".highlight {",
	"    background: #2B2B2B!important;",
	"    color: #E6E1DC!important;",
	"}",
	".CodeRay .line-numbers {",
	"    background-color: #2B2B2B;",
	"    color: #E6E1DC;",
	"}",
	".CodeRay .char {",
	"    color: #A5C261 !important;",
	"}",
	".CodeRay .comment {",
	"    color: #A6C6FF !important;",
	"}",
	".CodeRay .function {",
	"    color: #757aD8 !important;",
	"}",
	".CodeRay .integer {",
	"    color: #A5C261 !important;",
	"}",
	".CodeRay .key {",
	"    color: #757aD8 !important;",
	"}",
	".CodeRay .keyword {",
	"    color: #757aD8 !important;",
	"}",
	".CodeRay .predefined-constant {",
	"    color: #A5C261 !important;",
	"}",
	".CodeRay .regexp .content {",
	"    color: #AEB2F8 !important;",
	"}",
	".CodeRay .string .content {",
	"    color: #757aD8 !important;",
	"}",
	".CodeRay .string .delimiter {",
	"    color: #AD9361 !important;",
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
