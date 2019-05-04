// ==UserScript==
// @name        FIMFiction - Comment ID
// @namespace   Selbi
// @include     http*://*fimfiction.net/*
// @version     1.2
// @description Adds a button with the ID of a comment next to it, which also doesn't automatically scroll to the reply box when clicked.
// ==/UserScript==


$("#story_comments > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1)").append('<li><a id="refresh_comments_ids" title="Refresh Comment IDs"><i class="fa fa-refresh"></i> ID</a></li>');
refreshIDs();

$(".AddQuote_NoScroll").click(function(){
	var a = this.getAttribute("commentid");
	var field = $("#comment_entry textarea")[0];
	var text = ">>"+a;

	// The following stuff was taken straight from knighty's own code.
	if (field.selectionStart || field.selectionStart == '0') {
		var startPos = field.selectionStart;
		var endPos = field.selectionEnd;
		var begin = field.value.substring(0, startPos);
		var middle = ( ( endPos - startPos ) > 0 ) ? field.value.substring(startPos, endPos) : "";
		var end = field.value.substring(endPos, field.value.length);
		field.value = begin + text + end;
		field.selectionStart = startPos + text.length;
		field.selectionEnd = startPos + text.length;
	} else 	{
		field.value += text;
	}
});

$("#refresh_comments_ids").click(function(){
	refreshIDs();
});

function refreshIDs(){
	var commentID = 0;
	$(".reply_button").each(function(){
		commentID = $(this).attr("data-comment-id");
		$(this).before('<a title="Add comment to reply textbox" class="AddQuote_NoScroll" href="javascript:void();" commentid="' + commentID + '">>>' + commentID + '</a>&nbsp;');
	});
}
