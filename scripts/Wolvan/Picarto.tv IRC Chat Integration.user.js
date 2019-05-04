// ==UserScript==
// @name         Picarto.tv IRC Chat Integration
// @namespace    Wolvan_PicartoTV_IRC_Chat_Integration
// @version      1.2
// @description  This Script adds an IRC Chat that links to a private channel for each stream channel (#picarto_CHANNELNAME on irc.rizon.net/6667) to the Picarto chat
// @author       Wolvan
// @match        *://*.picarto.tv/live/channel.php?*watch=*
// @match        *://*.picarto.tv/live/multistream.php?*watch=*
// @grant        none
// ==/UserScript==

// Get Picarto's jQuery instance, no need to polute it with our own
var $ = window.jQuery;

// A function to conveniently access the URL Get parameters
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(window.location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// A function to inject CSS into the site
function addCSS(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Get Channel Name
var channel = getParameterByName("watch");

// Get Username
var username = channel + "_?";
if ($("#loginlink").length === 0) {
    username = $("[value='My Channel']").parent().attr("href").replace("/live/channel.php?watch=", "");
}

// Insert Chat with IRC Iframe & Button
$("#chatContainer").after('<div id="ircContainer"><iframe src="https://kiwiirc.com/client/irc.rizon.net/?nick=' + username + '&theme=basic#picarto_' + channel + '" style="width: 100%;height: 100%;"></iframe></div>');
$(".mainchatButton").after('<div class="ircButton" title="IRC"><div class="marker" id="markerIRC" style="display: none;"></div></div>');

// Insert CSS for IRC IFrame
addCSS('#ircContainer {height:400px;}');
addCSS('#ircContainer{ \
	overflow:auto; \
	overflow:hidden; \
	word-wrap:break-word; \
	background-color:#E4E4E4; \
	color:#000000; \
	padding:0px 0px 0px 0px; \
}');
addCSS('#ircContainer { display: none; }');

addCSS('.ircButton{ \
	float:right; \
	width:15px; \
	height:15px; \
	margin:0px; \
	background-image:url(../chatv1/img/chaticon.png); \
	background-repeat:no-repeat; \
	background-position:center; \
	-webkit-touch-callout:none; \
	-webkit-user-select:none; \
	-khtml-user-select:none; \
	-moz-user-select:none; \
	-ms-user-select:none; \
	cursor:pointer; \
	user-select:none; \
	margin-right:10px; \
}');

// Hook Click Events
$(".ircButton").click(function (){
    if($("#ircContainer").is(':visible')){}
    else{
        $("#ircContainer").hide().fadeIn(200);
        $("#chatContainer").hide();
        $("#peopleContainer").hide();
        $(".bubble").hide();
        $("#markerSettings").hide();
        $("#markerIRC").show()
        $("#markerUserlist").hide();
        $("#markerChat").hide();
    }
});
$(".peopleButton").click(function () {
    if(!popout)
        $("#ircContainer").hide();
    $("#markerIRC").hide();
});
$(".settingsButton").click(function () {
    if(!popout)
        $("#ircContainer").hide();
    $("#markerIRC").hide();
});
$(".mainchatButton").click(function () {
    $("#ircContainer").hide();
    $("#markerIRC").hide();
});