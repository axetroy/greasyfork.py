// ==UserScript==
// @name         Shoutbox Utilities
// @namespace    http://ssilicon.net16.net
// @version      1.5.6
// @description  Utilities for WWT Shoutbox
// @author       superiorSilicon
// @include      *worldwidetorrents.eu/index.php*
// @include      *worldwidetorrents.eu/shoutbox.php*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant        none
// ==/UserScript==

// Settings
var shoutBoxHeight = 200; //Set to whatever you want. Default is 200. This allows you to change the shoutbox height.
var showReqThreads = 'yes'; //'yes' or 'no'. Default is 'yes'. Allows you to show/hide the "Request Thread" dropdown.
var showMsgs = 'yes'; //'yes' or 'no'. Default is 'yes'. Allows you to show/hide the "Messages" dropdown.
var showLinks = 'yes'; //'yes' or 'no'. Default is 'yes'. Allows you to show/hide the "Links" dropdown.
var showSearch = 'yes'; //'yes' or 'no'. Default is 'yes'. Allows you to show/hide the "Search Torrent" box.
var removeNotice = 'no'; //'yes' or 'no'. Default is 'no'. Allows you to show/hide the "Notice".

// Main Code

var shoutInput = $('.shoutbox_messageboxback');

var sUtilities = '<td id="shoutUtilBox" colspan="2" style="text-align:center;border: solid #000;border-width: 0px 1px 1px 1px;"><h3 class="w3-card-4 w3-allerta w3-theme-l1"><center>Shoutbox Utilities</center></h3></td>';
var reqDrop = 'Request Threads: <select id="request-dropdown"></select>';
var reqOpt = '<option class="su-opt" value="def">Select</option>'; //Default
reqOpt += '<option class="su-opt" value="mag">Magazine</option>'; //Magazine Thread
reqOpt += '<option class="su-opt" value="e-book">E-Book</option>'; //E-Book Thread
reqOpt += '<option class="su-opt" value="comic">Comic</option>'; //Comic Thread
reqOpt += '<option class="su-opt" value="sports">Sports</option>'; //Sports Thread
reqOpt += '<option class="su-opt" value="tv">TV</option>'; //TV Thread
reqOpt += '<option class="su-opt" value="music">Music</option>'; //Music Thread
reqOpt += '<option class="su-opt" value="audio">Audio Book</option>'; //Audio Book Thread
reqOpt += '<option class="su-opt" value="software">Software</option>'; //Software Thread
reqOpt += '<option class="su-opt" value="app">App</option>'; //App Thread
reqOpt += '<option class="su-opt" value="manga">Manga</option>'; //Manga Thread
reqOpt += '<option class="su-opt" value="cartoon">Cartoon</option>'; //Cartoon Thread
reqOpt += '<option class="su-opt" value="anime">Anime</option>'; //Anime Thread
reqOpt += '<option class="su-opt" value="games">Games</option>'; //Games Thread
reqOpt += '<option class="su-opt" value="tut">Tutorial</option>'; //Tutorial Thread
reqOpt += '<option class="su-opt" value="ass">Asset</option>'; //Asset Thread
var reqAddButt = '<button class="w3-btn w3-teal" type="button" id="req-butt">Add</button>';

var MsgDrop = '&nbsp;&nbsp;&nbsp;&nbsp;Messages: <select id="msg-dropdown"></select>';
var MsgOpt = '<option value="def">Select</option>'; //Default
MsgOpt += '<option value="noout">No Outside Link</option>';
MsgOpt += '<option value="noargue">No Argument</option>';
MsgOpt += '<option value="noswear">No Swearing</option>';
MsgOpt += '<option value="novulgar">No Vulgar Discussion</option>';
MsgOpt += '<option value="nodiscrim">No Discrimination</option>';
MsgOpt += '<option value="nobug">No Discussion of Bugs</option>';
MsgOpt += '<option value="noreq">No Requests</option>';
MsgOpt += '<option value="yt">YouTube Links</option>';
MsgOpt += '<option value="imgsize">Image Size</option>';
MsgOpt += '<option value="nopol">No Political/Religious Talk</option>';
MsgOpt += '<option value="allcap">No All Caps</option>';
MsgOpt += '<option value="diffname">Username</option>';
MsgOpt += '<option value="search">Search Is Above</option>';
/* Add new message options below: */
/* Format: MsgOpt += '<option value="value_here">name_here</option>'; */
var msgAddButt = '<button class="w3-btn w3-teal" type="button" id="msg-butt">Add</button>';

var LinkDrop = '&nbsp;&nbsp;&nbsp;&nbsp;Other Links: <select id="link-dropdown"></select>';
var LinkOpt = '<option value="def">Select</option>'; //Default
LinkOpt += '<option value="idea">Idea Box</option>'; //Default
LinkOpt += '<option value="prob">Site Problems</option>'; //Default
var linkAddButt = '<button class="w3-btn w3-teal" type="button" id="link-butt">Add</button>';


shoutInput.after(sUtilities); //Adds The Utilities

// Adds the request threads when set to 'yes'
if(showReqThreads == 'yes'){
    $('#shoutUtilBox').append(reqDrop);
    $('#request-dropdown').prepend(reqOpt);
    $('#request-dropdown').after(reqAddButt);
}

// Adds the messages when set to 'yes'
if(showMsgs == 'yes'){
    $('#shoutUtilBox').append(MsgDrop);
    $('#msg-dropdown').prepend(MsgOpt);
    $('#msg-dropdown').after(msgAddButt);
}

if(showLinks == 'yes'){
    $('#shoutUtilBox').append(LinkDrop);
    $('#link-dropdown').prepend(LinkOpt);
    $('#link-dropdown').after(linkAddButt);
}

$('#req-butt').click(function(){ //Request Thread Function
    var shoutbox = $('#shout_message');
    var optSelect = $('#request-dropdown option:selected').attr('value');
    if (optSelect == 'mag') {
      shoutbox.val("Request Here: https://worldwidetorrents.eu/forums.php?action=viewtopic&topicid=579 ");
    } else if (optSelect == 'e-book') {
      shoutbox.val("Request Here: https://worldwidetorrents.eu/forums.php?action=viewtopic&topicid=805 ");
    } else if (optSelect == 'comic') {
      shoutbox.val("Request Here: https://worldwidetorrents.eu/forums.php?action=viewtopic&topicid=577 ");
    } else if (optSelect == 'sports') {
      shoutbox.val("Request Here: https://worldwidetorrents.eu/forums.php?action=viewtopic&topicid=698 ");
    } else if (optSelect == 'tv') {
      shoutbox.val("Request Here: https://worldwidetorrents.eu/forums.php?action=viewtopic&topicid=58 ");
    } else if (optSelect == 'music') {
      shoutbox.val("Request Here: https://worldwidetorrents.eu/forums.php?action=viewtopic&topicid=42 ");
    } else if (optSelect == 'audio') {
      shoutbox.val("Request Here: https://worldwidetorrents.eu/forums.php?action=viewtopic&topicid=154 ");
    } else if (optSelect == 'software') {
      shoutbox.val("Request Here: https://worldwidetorrents.eu/forums.php?action=viewtopic&topicid=219 ");
    } else if (optSelect == 'app') {
      shoutbox.val("Request Here: https://worldwidetorrents.eu/forums.php?action=viewtopic&topicid=45 ");
    } else if (optSelect == 'manga') {
      shoutbox.val("Request Here: https://worldwidetorrents.eu/forums.php?action=viewtopic&topicid=124 ");
    } else if (optSelect == 'cartoon') {
      shoutbox.val("Request Here: https://worldwidetorrents.eu/forums.php?action=viewtopic&topicid=130 ");
    } else if (optSelect == 'anime') {
      shoutbox.val("Request Here: https://worldwidetorrents.eu/forums.php?action=viewtopic&topicid=44 ");
    } else if (optSelect == 'games') {
      shoutbox.val("Request Here: https://worldwidetorrents.eu/forums.php?action=viewtopic&topicid=47 ");
    } else if (optSelect == 'tut') {
      shoutbox.val("Request Here: https://worldwidetorrents.eu/forums.php?action=viewtopic&topicid=160 ");
    } else if (optSelect == 'ass') {
      shoutbox.val("Request Here: https://worldwidetorrents.eu/forums.php?action=viewtopic&topicid=43 ");
    }
});

var messages = [
    'No Outside Torrent Links Allowed', //0
    'No Arguing In The Shoutbox If Your Having A Disagreement Take It To A Pm', //1
    'No Swearing (As We Have Members Of All Ages)', //2
    'No Discussion Of Vulgar/Sexually Explicit Topics (We Have Members Of All Ages)', //3
    'We Will Not Tolerate Any Discrimination To LGBT Members Or Anyone Else For That Matter', //4
    'No Discussions About Server,Bugs,Suggestions Etc. Are Allowed. We Have Threads For That Or Through A Pm', //5
    'No requests For Tweaks/Apps/Support (We Have A Requests Thread For That)', //6
    'Youtube Links Are Allowed Just Use Common Sense', //7
    'Images Are Allowed But No Taller Than 200 Pixels', //8
    'No Political or Religious Discussions As This Can Lead To Conflict That Can Get Out Of Control', //9
    'No ALL CAPS allowed As Thats Considered Screaming', //10
    "Never Refer Or Use A User's Name Other Than The One They Are Registered With", //11
    "↑ The search box is above ↑ Just enter your search keyword and hit Search Torrent, thanks.", //12
    //Add another message below (don't forget the quotes and a comma after them)
];

$('#msg-butt').click(function(){
    var shoutbox = $('#shout_message');
    var optSelect = $('#msg-dropdown option:selected').attr('value');
    switch (optSelect) {
        case 'noout':
            shoutbox.val(messages[(0)]);
            break;
        case 'noargue':
            shoutbox.val(messages[(1)]);
            break;
        case 'noswear':
            shoutbox.val(messages[(2)]);
            break;
        case 'novulgar':
            shoutbox.val(messages[(3)]);
            break;
        case 'nodiscrim':
            shoutbox.val(messages[(4)]);
            break;
        case 'nobug':
            shoutbox.val(messages[(5)]);
            break;
        case 'noreq':
            shoutbox.val(messages[(6)]);
            break;
        case 'yt':
            shoutbox.val(messages[(7)]);
            break;
        case 'imgsize':
            shoutbox.val(messages[(8)]);
            break;
        case 'nopol':
            shoutbox.val(messages[(9)]);
            break;
        case 'allcap':
            shoutbox.val(messages[(10)]);
            break;
        case 'diffname':
            shoutbox.val(messages[(11)]);
            break;
        case 'search':
            shoutbox.val(messages[(12)]);
            break;
        //Add extra messages below. Format:
        // case '(value added above)':
        // shoutbox.val(messages[(number)]);
        // break;
    }
});

$('#link-butt').click(function(){
    var shoutbox = $("#shout_message");
    var optSelect = $('#link-dropdown option:selected').attr('value');
    if (optSelect == 'idea'){
        shoutbox.val('Post an idea here: https://worldwidetorrents.eu/forums.php?action=viewtopic&topicid=19 ');
    } else if (optSelect == 'prob') {
        shoutbox.val('Post an issue here: https://worldwidetorrents.eu/forums.php?action=viewtopic&topicid=12 ');
    }
});

$( document ).ready(function() {
    // Sets the shoutbox height
    $("#shout_frame").attr("height",shoutBoxHeight+10);
    $(".shoutbox_contain").attr("style", "overflow-y: scroll; height: " + shoutBoxHeight + "px;");
});

// Show/Hide Search:-
if (showSearch == 'no') {
    $('form[action="/torrents-search.php"]').remove();
}

// Remove Notice:-
if (removeNotice == 'yes') {
    $('h3')[0].remove();
    $('td[valign="top"] > br').remove();
}