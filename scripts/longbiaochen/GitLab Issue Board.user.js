// ==UserScript==
// @name         GitLab Issue Board
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  change the list order in GitLab Issue Boards
// @author       Longbiao CHEN
// @match        gitlab.longbiaochen.com/*
// @grant        GM_addStyle
// @license      GPLv3
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

GM_addStyle ( `
    div.boards-list > div:nth-child(1) {
    	display:none !important;
    }
` );

showIssueBoard();
function showIssueBoard(){
	console.log('showIssueBoard');
	var p = $('.project-details > h3 > a');
	for(var i = 0; i < p.length; i++){
		var pi = p[i];
		pi.href += '/boards';
	}
}