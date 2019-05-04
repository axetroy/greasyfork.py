// ==UserScript==
// @name         hi-pda background color adjuster
// @namespace    http://www.hi-pda.com/
// @version      0.1
// @description  hi-pda论坛背景色修改器
// @author       mark
// @include      http://www.hi-pda.com/forum/*
// @run-at       document-start
// ==/UserScript==


function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

var css = ''
    + '.viewthread td.postcontent {background-color: #f5f5f5;}'
    + '#wrap td.postauthor {background-color: #f5f5f5;}'
    + '.forumcontrol .modaction {background-color: #f5f5f5;}'
    + '.content {background-color: #f5f5f5;}';

addGlobalStyle(css);

