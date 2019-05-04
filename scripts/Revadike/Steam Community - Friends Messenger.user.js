// ==UserScript==
// @name         Steam Community - Friends Messenger
// @namespace    Royalgamer06
// @version      1.2
// @description  Send a message to multiple steam friends at once through steam web chat (https://steamcommunity.com/chat)
// @author       Royalgamer06
// @include      /^https?:\/\/steamcommunity.com\/chat\/?$/
// @grant        none
// @run-at       document-idle
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==
$(".friendslist_entry").before('<input type="checkbox" style="float: left; margin-top: 12px; margin-left: -12px;">');
$(".chatform_footer").append("<button id='spamFriends' class='btn_darkblue_white_innerfade btn_medium'><span>SEND TO SELECTED FRIENDS</span></button>");
$(".chatform_footer").append("<button id='invertSelection' class='btn_darkblue_white_innerfade btn_medium'><span>INVERT SELECTION</span></button>");
$("#invertSelection").click(function(ev) {
    ev.preventDefault();
    $("[type=checkbox]").each(function() {
        this.checked = !this.checked;
    });
    return false;
});
$("#spamFriends").click(function(ev) {
    ev.preventDefault();
    var msg = $("#chatmessage").val();
    $("[type=checkbox]:checked").each(function(i) {
        $(this).next().click();
        $("#chatmessage").val(msg);
        $(".chatform_footer button").first().click();
    });
    return false;
});