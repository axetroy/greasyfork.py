// ==UserScript==
// @name        FIMFiction - Preview Button
// @namespace   Selbi
// @include     http*://*fimfiction.net/manage_user/messages/*
// @include     http*://*fimfiction.net/group/*threads*
// @version     1.3
// @description Adds a button to preview PMs and new threads.
// ==/UserScript==

var previewButton = '<a class="styled_button styled_button_blue" href="javascript:void(0);" id="preview_comment"><i class="fa fa-eye"></i> Preview Reply</a></div></div></form>';
var previewBox = '<div id="comment_preview" class="hidden" style="border-top:1px solid #BBB;"></div><script>$(document).on( "click", "#preview_comment", function( e ){$.post(\'/ajax/preview_comment.php\',{ "comment" : $("#comment_comment").val( ) },function( data ) { if ( "error" in data ){ShowErrorWindow( data.error );}else{ $("#comment_preview").html( data.comment ); $("#comment_preview").fadeIn( );}} );} );</script>';

if (window.location.href.search("messages") != -1) previewButton = "  " + previewButton;

$("button.styled_button").after(previewButton);
$(".add_comment_toolbar").after(previewBox);