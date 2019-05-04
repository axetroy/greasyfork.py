// ==UserScript==
// @name Steamsefswfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// @namespace Royalgamer06
// @version 1.1.5
// @description Adds an option to kick all members of your steam community group at once.
// @author Royalgamer06
// @include /^http(s):\/\/steamcommunity.com\/groups\/(?!.+(#|\/)).$/
// @grant unsafeWindow
// @run-at document-idle
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
var members = [],
total = 0,
modal = null;

unsafeWindow.initKicking = function() {
if (confirm("Are you sure you want to kick all members of your group?")) {
modal = ShowBlockingWaitDialog("Executing...", "Gathered " + members.length + "/" + total + " steamID's of " + g_strGroupName + " members.");
getMembers(1);
}
};

function getMembers(p) {
$.get(g_strGroupURL + "/memberslistxml/?xml=1&p=" + p, function(xml) {
var xmlmembers = Array.from($("steamID64", xml));
var memberxmll = xml.getElementsByTagName("steamID64");
for (var i = 0; i < memberxmll.length; i++) {
members.push(memberxmll[i].innerHTML);
}
modal.Dismiss();
modal = ShowBlockingWaitDialog("Executing...", "Gathered " + members.length + "/" + total + " steamID's of " + g_strGroupName + " members.");
if (xmlmembers.length == 1000) {
getMembers(p+1);
} else {
kickMembers();
}
});
}

function kickMembers() {
var kicked = 0;
var n = 0;
members.forEach(function(member) {
if (member != g_steamID) {
$.post(g_strGroupURL + "/membersManage", { sessionID: g_sessionID, action: "kick", memberId: member, queryString: "" }, function() {
kicked++;
modal.Dismiss();
modal = ShowBlockingWaitDialog("Executing...", "Kicked " + kicked + "/" + members.length + " members of " + g_strGroupName + ".");
}).always(function() {
n++;
if (n == members.length) {
modal.Dismiss();
ShowAlertDialog("All done!", "Kicked " + kicked + " members of " + g_strGroupName + ".
" + (n-kicked) + " Members failed to kick.

I hope you found this userscript useful.
Please rate this userscript.
Feedback is also appreciated.
Thank you");
}
});
}
});
}

$(document).ready(function() {
if (!!location.href.match(/^https?:\/\/steamcommunity.com\/groups\/.$/) && $(".admin_option_icon").length > 0) {
total = parseInt($(".members .count").first().text().match(/[0-9]+/g).join("")) - 1;
if (total <= 1) {
$("[href=ConfirmLeaveGroup]").text("Delete Group");
} else {
$(".admin_option_icon").last().parent().after('

imageKick All Group Members
');
}
}
});