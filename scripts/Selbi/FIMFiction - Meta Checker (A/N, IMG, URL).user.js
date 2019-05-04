// ==UserScript==
// @name        FIMFiction - Meta Checker (A/N, IMG, URL)
// @namespace   Selbi
// @include     http*://fimfiction.net/story/*
// @include     http*://www.fimfiction.net/story/*
// @version     1.1
// @require     http://code.jquery.com/jquery-1.11.0.min.js
// @description Checks for certain meta content per chapter (author's notes, images, links).
// ==/UserScript==

var URLx = (document.URL).slice(0,(document.URL).indexOf("/",32));
var readstax = [];
var chapterstotal = 0;
var MetaInfo = [];
var words, int, intx, chaptersource, churl, chaptercontent, readstatus;
var alluls = document.getElementsByTagName('ul');
var yAN = '<span style="color:black"><b>A/N</b></span>';
var nAN = '<span style="font-size:75%"><i><s>A/N</s></i></span>';
var yIMG = '<span style="color:black"><b>IMG</b></span>';
var nIMG = '<span style="font-size:75%"><i><s>IMG</s></i></span>';
var yURL = '<span style="color:black"><b>URL</b></span>';
var nURL = '<span style="font-size:75%"><i><s>URL</s></i></span>';
var progImage = '<img src="http://www.fimfiction-static.net/images/icons/spinner_dark_16.gif">';
	var totalAN=0, totalIMG=0, totalURL=0;
var AllMetaButtonInside = 'Meta: <a href="javascript:void()" id="getAllMetaInfo" onclick="$(\'#info_1\').click();">All</a> / <a href="javascript:void()" id="getAllMetaInfoUnread">Unread</a>';
var AllMetaButton = ''; //'<hr><span style="font-size:80%;font-style:italic;text-align:right;font-weight:bold;" id="allMeta">' + AllMetaButtonInside + '</span>';

for (var int=0; int<alluls.length; int++) {
	if (alluls[int].className == "chapters") {
		churl = document.getElementsByClassName('story')[0].value;
		readstatus = alluls[int].getElementsByTagName('img');
		words = alluls[int].getElementsByClassName('word_count');
		for (intx=0; intx<(words.length-1);intx++) {
			MetaInfo.push($('<a href="javascript:void()" id="info_' + (intx+1) + '">m</a>').append("&nbsp;&nbsp;"));
			$(words[intx]).prepend(MetaInfo[intx]);
		}
		$(AllMetaButton).insertBefore("." + alluls[int].className);
	}
	
}

$(".chapter-read-icon").each(function() {
	if ($(this).hasClass("chapter-read")) {
		readstax[chapterstotal] = true;
		chapterstotal++;
	} else {
		readstax[chapterstotal] = false;
		chapterstotal++;
	}
});



for (var i=0; i<MetaInfo.length; i++){
	MetaInfo[i].click(function() {
		var btnID = $(this).attr("id");
		var chapterID = btnID.replace("info_", "");
		$("#info_" + chapterID).html(progImage);

		var AN = nAN, IMG = nIMG, URL = nURL;
		$("#" + btnID).before('<div id="result' + btnID + '" style="display:none"></div>');
		$("#result" + btnID).load(URLx + "/" + chapterID + " .chapter", function(){
			if ($("#result" + btnID + " .chapter_content .authors-note").length != 0) {
				AN = '<span style="color:black;" onmouseover="$(\'div\', this).show()" onmouseout="$(\'div\', this).hide()"><b>A/N</b><div style="z-index:10;display:none;background:#F8F8F8;border:5px solid #DFDFDF;width:650px;white-space:pre-line;position:absolute;padding-left:10px;">' + $("#result" + btnID + " .chapter_content .authors-note").html() + '</div></span>';
				totalAN++;
			}
			if ($("#result" + btnID + " .chapter_content #chapter_container img").length != 0) {
				IMG = '<acronym title="' + $("#result" + btnID + " #chapter_container img").length + '">' + yIMG + '</acronym>';
				totalIMG++;
			}
			if ($("#result" + btnID + " .chapter_content #chapter_container a").length != 0) {
				URL = '<acronym title="' + $("#result" + btnID + " #chapter_container a").length + '">' + yURL + '</acronym>';
				totalURL++;
			}

			var regx = /[0-9,]+/;
			var viewCount = '<span style="font-size:80%">(' + regx.exec($("#result" + btnID + " .chapter_footer").html().toString()) + ')</i></span>';
			$("#" + btnID).replaceWith('<span id="' + btnID + '">' + viewCount + "&nbsp;&nbsp;" + AN + "&nbsp;&nbsp;" + IMG + "&nbsp;&nbsp;" + URL + '</span>');

			$("#result" + btnID).remove();
			
			var regex = /[ ]+\d+[ ]+/g;
			var matches = $(".chapters").html().toString().match(regex);
			if (readstax[chapterID-1] == false) {
				unsafeWindow.ToggleRead(parseInt(matches[chapterID-1]));
			}
			$("#allMeta").empty().html(AllMetaButtonInside + '&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size:90%;">A/N</span> <b>' + totalAN + '</b>&nbsp;&nbsp;<span style="font-size:90%;">IMG</span> <b>' + totalIMG + '</b>&nbsp;&nbsp;<span style="font-size:90%;">URL</span> <b>' + totalURL + '</b>');
		});
	});
}

$("#getAllMetaInfo").click(function() {
	for (int=1;int<=chapterstotal;int++) {
		$("#info_" + int)[0].click();
	}
});

$("#getAllMetaInfoUnread").click(function() {
	for (int=1;int<=chapterstotal;int++) {
		if (readstax[int-1] == false) {
			$("#info_" + int)[0].click();
		}
	}
});