// ==UserScript==
// @name         Return Github Light Header
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Light header enabling
// @author       Alex Naiman
// @match        https://*.github.com/
// @match        https://github.com/*

// @grant        none
// @run-at       document-start
// ==/UserScript==
// 
// 
function addGlobalStyle(css) {
  var head,
  style;
  head = document.getElementsByTagName('head') [0];
  if (!head) {
    return;
  }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
};
addGlobalStyle('.header {
	padding-top: 8px;
	padding-bottom: 8px;
	background-color: #f5f5f5 !important;
	border-bottom: 1px solid #e5e5e5 !important
}
.header-logged-out {
	padding-top: 15px;
	padding-bottom: 15px
}
.read-only-mode-banner {
	text-align: center;
	background-color: #f8e45f;
	border-bottom-color: #f6dc2e
}
.header-logo-invertocat {
	float: left;
	margin-right: 10px;
	margin-left: -2px;
	color: #555;
	white-space: nowrap
}

.header-logo-invertocat:hover {
	color: #4078c0;
	text-decoration: none
}

.header-logo-wordmark {
	position: relative;
	float: left;
	height: 26px;
	margin-right: 15px;
	color: #555
}
.header-logo-wordmark .octicon {
	float: left
}
.header-logo-wordmark:hover {
	color: #4078c0 !important
}
.notification-indicator .mail-status {
	position: absolute;
	top: -2px;
	right: 3px;
	z-index: 2;
	display: none;
	width: 14px;
	height: 14px;
	color: #fff;
	text-align: center;
	background-image: -webkit-linear-gradient(#1cafff, #0086ce);
	background-image: linear-gradient(#1cafff, #0086ce);
	background-clip: padding-box;
	border: 2px solid #f3f3f3 !important;
	border-radius: 50%
}
.notification-indicator .mail-status.unread {
	display: inline-block
}
.notification-indicator:hover .mail-status {
	background-color: #4078c0
}
.header-search-scope {
	display: none;
	width: 1%;
	padding-right: 8px;
	padding-left: 8px;
	font-size: 12px;
	color: #767676 !important;
	white-space: nowrap;
	vertical-align: middle;
	border-right: 1px solid #eee;
	
}

.scoped-search .form-control.focus .header-search-scope {
	color: #4078c0;
	background-color: #edf2f9 !important;
	border-color: #c6d7ec
}
.header-nav-item .dropdown-menu {
	width: 180px;
	margin-top: 15px
}
.header-nav-link {
	color: #555 !important
}
.header-nav-link:hover, .header-nav-link:focus {
	color: #4078c0;
	text-decoration: none
}
.header-nav-link:hover .dropdown-caret, .header-nav-link:focus .dropdown-caret {
	border-top-color: #4078c0
}
.header .header-search-input {
	color: #333;
	background-color: white !important
}
.header .header-search-wrapper {
	background-color: rgb(231, 231, 231)
}
.header .header-search-scope {
	border-right-color: #d3d3d3;
}');
