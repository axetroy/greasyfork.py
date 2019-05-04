// ==UserScript==
// @name        FIMFiction - A/N at Top
// @namespace   Selbi
// @include     http*://www.fimfiction.net/story/*/*/*
// @include     http*://www.fimfiction.net/chapter/*
// @version     1.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @description Displays a spoilered copy of the Author's Notes at the top of a story page.
// ==/UserScript==

var chaptercontent = document.getElementsByClassName('chapter_content')[0];
var AN = document.getElementsByClassName('authors-note')[0];

chaptercontent.innerHTML = '<div class="authors-note" style="margin-bottom:30px;text-align:center;"><a href="javascript:void()" id="showAN"><i>Expand Author\'s Note</i></a><div id="customAN" style="display:none;text-align:left;">' + AN.innerHTML + '</div></div>' + chaptercontent.innerHTML;

// Author's Notes at Top
$("#showAN").click(function() {
	if (document.getElementById('customAN').style.display == '') {
		document.getElementById('showAN').innerHTML = "<i>Expand Author\'s Note</i>";
		document.getElementById('customAN').style.display = 'none';
	} else {
		document.getElementById('showAN').innerHTML = "<i>Collapse Author\'s Note</i>";
		document.getElementById('customAN').style.display = '';
	}
});