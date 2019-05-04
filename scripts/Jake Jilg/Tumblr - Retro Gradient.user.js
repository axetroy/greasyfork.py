// ==UserScript==
// @name         Tumblr - Retro Gradient
// @namespace    https://jaketheblog.tumblr.com/retrogradient
// @description  Give Tumblr a semi-retro look
// @include      https://www.tumblr.com/*
// @version      1
// @grant        none
// ==/UserScript==

(function(){
	var css = [
    '*{margin:0;padding:0;}',
    '.settings_group_wrapper,',
    '#settings_form{',
    'background-color:#fff;',
    '}',
    'body{',// I use a whole lot of !important, because I'm a lazy narcissist.
    'background-image:linear-gradient(to bottom, #426482 0%,#31506e 100%)!important;',
    'background-attachment: fixed !important;',
    '}',
    '.l-header-container,',
    '.l-content{',
	  'background-color:#31506e!important;',
    '}',
    '.identity .controls_section li,',
    '.identity .right_column .small_links,',
    '.identity .controls_section.user_list li .follow_list_item_blog::before,',
    '.identity .controls_section.user_list li .follow_list_item_blog::before,',
    '.radar .radar_footer .radar_avatar::before,',
    '.identity .right_column::after,',
    '.l-container.l-container--two-column-dashboard .right_column,',
    '.l-container.l-container--two-column .right_column,',
    '#left_column.left_column,',
    '#left_column.right_column,',
    '.post_avatar{',
    'background-color:transparent!important;',
    'background-image:none!important;',
    'border:0 none !important;',
    '}',
    '#left_column.left_column{',
    'padding-top:10px;',
    '}',
    '#right_column.right_column{',
    'background-color:rgba(255,255,255,0.09)!important;',
    'max-width:320px;',
    'position:relative;',
    'top:12px;',
    'border-radius:7px;',
    'box-shadow:0px 0px 0px 2px #254361;',
		'}',
    '#right_column.right_column li:nth-child(0),',
    '#right_column.right_column li:nth-child(1){',
    'border-radius: 7px 7px 0px 0px;',
    '}',
    '#right_column.right_column li{',
    'box-shadow:1px 1px 0px 1px rgba(255,255,255,0.09),',
    					 '0px 0px 0px 1px rgba(0,0,0,0.1);',
    '}',
    '#right_column.right_column *{',
    'color:rgba(255,255,255,0.7)!important;',
    'text-shadow:0 0 1px rgba(0,0,0,0.5);',
    '}',
    '#right_column.right_column .tumblelog_title{',
    'font-weight:bold;',
    '}',
    '#right_column.right_column .selected,',
    '#right_column.right_column .small_links,',
    '#right_column.right_column .controls_section_radar{',
    'background-color:#2e4b67!important;',
    'box-shadow:inset 0px 2px 2px 1px rgba(0,0,0,0.1);',
    '}'
  ];
  var style = document.createElement("style");
  style.type = "text/css";
  style.id = "retro-gradient";
  for(var i = 0; i < css.length; i++){
  	style.appendChild(document.createTextNode(css[i] + "\n"));
  }
  document.head.appendChild(style);
})();