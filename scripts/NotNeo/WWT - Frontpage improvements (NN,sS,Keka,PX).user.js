// ==UserScript==
// @name        WWT - Frontpage improvements (NN,sS,Keka,PX)
// @namespace   NotNeo
// @description All* scripts for the WWT front page combined and improved
// @author      NotNeo, superiorSilicon, Keka_Umans, PXgamer
// @include     *worldwidetorrents.to/home.php
// @include     *worldwidetorrents.to/home.php#
// @include     *worldwidetorrents.to/shoutbox.php
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require      https://greasyfork.org/scripts/34465-notification-js/code/Notificationjs.js?version=225717
// @version      1.9.9.24
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @icon         https://i.imgur.com/M2WJhlj.png
// ==/UserScript==
/*
*/
//YOU SHOULDN'T NEED TO EDIT THE SCRIPT TO CHANGE SETTINGS ANYMORE.
//SETTINGS ARE ON THE PAGE IN THE HEADER

/*
var keys = GM_listValues();
for (var i=0, key=null; key=keys[i]; i++) {
  GM_deleteValue(key);
}
alert(GM_listValues());
*/

//var start = +new Date();

var shoutBoxHeight = 200;
if(GM_getValue("shoutBoxHeight") != null) {
    shoutBoxHeight = GM_getValue("shoutBoxHeight");
}

if (window.top != window.self) {
    //Set new shoutbox height
    //$('#shout_frame').attr('height', shoutBoxHeight * 1);
    $('head').append('<link rel="stylesheet" type="text/css" href="https://worldwidetorrents.to/css/glyphicons.css" />');
    $('.shoutbox_contain').attr('style', 'overflow-y: scroll; height: 100% !important');
    return;
}

////Shoutbox Smileys Settings////
////////////////////////////////
var usingShoutSmileys = true; //Set this to false to completely disable the Shoutbox Smileys feature.
//Too much has become dependent on this, so it is not included in the options menu. If you still want to disable it, know that it might break other functionality. Same goes for the option below.

//Just like the WWT default smileys, you can now use your custom smileys by their "alt" names. (i.e. :hi)
var usingCustomAltToImage = true; //set this to false to disable the ability to use custom smiley alts

//////////////////////////////////////////////////////
var Csmileys = ''; // leave this as is
/************************/
// Customizable Settings
/************************/

////Shoutbox Smileys////
////////////////////////
/************************/
// this is where you can
// add your own custom images
// use the template below - just fill in and uncomment (remove // from the line)
// copy/paste as needed
// NO LONGER RECOMMENDED. USE THE OPTIONS MENU INSTEAD
/************************/
// Csmileys += '    <img title="NAME" class="cusSmile" alt="NAME" src="https://URL.gif" />';


////////////////// DO NOT EDIT BELOW THIS LINE EXCEPT TO REMOVE A SMILEY /////////////////

var isChrome = (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase()));

var NCsmileysArray = [ //declaring array
	"",
];
var NCSArrayString = GM_getValue("NCSArrayString"); //get array from storage as string
if(NCSArrayString) {
    NCsmileysArray = JSON.parse(NCSArrayString); //parse the string to an array
}

var NCsmileys = ''; //declaring use string
for(let i = 1; i < NCsmileysArray.length; i++) { //building use string from array
	NCsmileys += '    '+ NCsmileysArray[i].replace(/http:/g, "https:");
}

var notificationArray = [];
var notificationArrayString = GM_getValue("notificationArrayString");
if(notificationArrayString) { notificationArray = JSON.parse(notificationArrayString); }

var shoutUtiXMsgArray = [];
var shoutUtiXMsgArrayString = GM_getValue("shoutUtiXMsgArrayString");
if(shoutUtiXMsgArrayString) {
    shoutUtiXMsgArray = JSON.parse(shoutUtiXMsgArrayString);
    for(let i = 0; i < shoutUtiXMsgArray.length; i++) {
        shoutUtiXMsgArray[i] = shoutUtiXMsgArray[i].replace(/http:/g, "https:");
    }
}

var shoutUtiXMsgNameArray = [];
var shoutUtiXMsgNameArrayString = GM_getValue("shoutUtiXMsgNameArrayString");
if(shoutUtiXMsgNameArrayString) { shoutUtiXMsgNameArray = JSON.parse(shoutUtiXMsgNameArrayString); }

if(true){ //Setting options to defaults
	var usingVisibleSearch = true;
	var autoHideNotice = true;
	var autoHideSearch = false;
	var autoHideShout = false;
	var autoHideMovies = true;
	var autoHideTV = true;
	var autoHideMusic = true;
	var autoHideGames = true;
	var autoHideApps = true;
	var autoHideAnime = true;
	var autoHideBooks = true;
	var autoHideComics = true;
	var autoHideSports = true;
	var autoHideOthers = true;
	var autoHideDisclaimer = true;
	var fullHideNotice = false;
	var fullHideSearch = false;
	var fullHideShout = false;
	var fullHideMovies = false;
	var fullHideTV = false;
	var fullHideMusic = false;
	var fullHideGames = false;
	var fullHideApps = false;
	var fullHideAnime = false;
	var fullHideBooks = false;
	var fullHideComics = false;
	var fullHideSports = false;
	var fullHideOthers = false;
	var fullHideDisclaimer = false;
	var usingHide = true;
	var UsingShoutUtil = true;
	var showReqThreads = 'yes';
	var showMsgs = 'yes';
	var showLinks = 'yes';
	var centerSSMessages = false;
	var allTextGetsReplaced = false;
	var usingShoutUserInfo = true;
	var userInfoFloatNextToName = true;
	var usingJukebox = true;
	var stickyJukebox = false;
	var emViHeight = 202;
	var jukeboxOff = false;
	var UsingAutoplay = false;
	var usingShoutHistory = true;
	var usingPMFromShout = true;
	var accInfo = true;
	var icoColor = '#FFF';
	var msgColor = '#FFF';
	var bbColor = '#000000';
	var boldColor = true;
	var italicColor = false;
	var UseNbbCodeDefaultStyle = true;
	var alwaysUsingSize = '';
	var alwaysUsingFont = '';
	var alwaysUsingAlign = '';
	var alwaysItalic = false;
	var alwaysBold = false;
	var alwaysUnderlined = false;
	var alwaysAutoColor = false;
	var KS = true;
	var WS = true;
	var ES = true;
	var HS = true;
	var NCsmileyRemoveConfirm = true;
	var usingMentions = true;
	var mentionVolume = 0.5;
	var mentionURL = 'https://k003.kiwi6.com/hotlink/r8244tqu9h/what.mp3';
	var mentionNicks = '';
	var mentionDesktopN = true;
	var usingPMAudio = true;
	var usingPMNoti = true;
	var PMNotiAudioVolume = 0.5;
	var PMNotiAudioURL = 'https://k003.kiwi6.com/hotlink/deewhztt1h/arpeggio.mp3';
	var jukeboxLimit = 8;
	var mentionAll = true;
	var forumReloadInterval = 60000;
	var usingForumReload = false;
	var usingQuoteButtons = true;
	var usingOnlineUsers = true;
    var updateOnlineUserInterval = 60;
    var startHexCol = "#FF0000";
    var endHexCol = "#0000FF";
    var PMFromShoutIconSize = 15;
    var quoteFromShoutIconSize = 15;
    var quoteFromShoutPosAfter = true;
    var usingSmileyHide4Hover = true;
}

if(true){ //replacing default values with saved values whereever available
	if(GM_getValue("usingHide") != null) {
		var usingHide = GM_getValue("usingHide");
	}
	if(GM_getValue("usingVisibleSearch") != null) {
		var usingVisibleSearch = GM_getValue("usingVisibleSearch");
	}
	if(GM_getValue("autoHideNotice") != null) {
		var autoHideNotice = GM_getValue("autoHideNotice");
	}
	if(GM_getValue("autoHideSearch") != null) {
		var autoHideSearch = GM_getValue("autoHideSearch");
	}
	if(GM_getValue("autoHideShout") != null) {
		var autoHideShout = GM_getValue("autoHideShout");
	}
	if(GM_getValue("autoHideMovies") != null) {
		var autoHideMovies = GM_getValue("autoHideMovies");
	}
	if(GM_getValue("autoHideTV") != null) {
		var autoHideTV = GM_getValue("autoHideTV");
	}
	if(GM_getValue("autoHideMusic") != null) {
		var autoHideMusic = GM_getValue("autoHideMusic");
	}
	if(GM_getValue("autoHideGames") != null) {
		var autoHideGames = GM_getValue("autoHideGames");
	}
	if(GM_getValue("autoHideApps") != null) {
		var autoHideApps = GM_getValue("autoHideApps");
	}
	if(GM_getValue("autoHideAnime") != null) {
		var autoHideAnime = GM_getValue("autoHideAnime");
	}
	if(GM_getValue("autoHideBooks") != null) {
		var autoHideBooks = GM_getValue("autoHideBooks");
	}
	if(GM_getValue("autoHideComics") != null) {
		var autoHideComics = GM_getValue("autoHideComics");
	}
	if(GM_getValue("autoHideSports") != null) {
		var autoHideSports = GM_getValue("autoHideSports");
	}
	if(GM_getValue("autoHideDisclaimer") != null) {
		var autoHideDisclaimer = GM_getValue("autoHideDisclaimer");
	}
	if(GM_getValue("fullHideNotice") != null) {
		var fullHideNotice = GM_getValue("fullHideNotice");
	}
	if(GM_getValue("fullHideSearch") != null) {
		var fullHideSearch = GM_getValue("fullHideSearch");
	}
	if(GM_getValue("fullHideShout") != null) {
		var fullHideShout = GM_getValue("fullHideShout");
	}
	if(GM_getValue("fullHideMovies") != null) {
		var fullHideMovies = GM_getValue("fullHideMovies");
	}
	if(GM_getValue("fullHideTV") != null) {
		var fullHideTV = GM_getValue("fullHideTV");
	}
	if(GM_getValue("fullHideMusic") != null) {
		var fullHideMusic = GM_getValue("fullHideMusic");
	}
	if(GM_getValue("fullHideGames") != null) {
		var fullHideGames = GM_getValue("fullHideGames");
	}
	if(GM_getValue("fullHideApps") != null) {
		var fullHideApps = GM_getValue("fullHideApps");
	}
	if(GM_getValue("fullHideAnime") != null) {
		var fullHideAnime = GM_getValue("fullHideAnime");
	}
	if(GM_getValue("fullHideBooks") != null) {
		var fullHideBooks = GM_getValue("fullHideBooks");
	}
	if(GM_getValue("fullHideComics") != null) {
		var fullHideComics = GM_getValue("fullHideComics");
	}
	if(GM_getValue("fullHideSports") != null) {
		var fullHideSports = GM_getValue("fullHideSports");
	}
	if(GM_getValue("fullHideDisclaimer") != null) {
		var fullHideDisclaimer = GM_getValue("fullHideDisclaimer");
	}
	if(GM_getValue("UsingShoutUtil") != null) {
		var UsingShoutUtil = GM_getValue("UsingShoutUtil");
	}
	if(GM_getValue("showReqThreads") != null) {
		var showReqThreads = GM_getValue("showReqThreads");
	}
	if(GM_getValue("showMsgs") != null) {
		var showMsgs = GM_getValue("showMsgs");
	}
	if(GM_getValue("showLinks") != null) {
		var showLinks = GM_getValue("showLinks");
	}
	if(GM_getValue("centerSSMessages") != null) {
		var centerSSMessages = GM_getValue("centerSSMessages");
	}
	if(GM_getValue("allTextGetsReplaced") != null) {
		var allTextGetsReplaced = GM_getValue("allTextGetsReplaced");
	}
	if(GM_getValue("usingShoutUserInfo") != null) {
		var usingShoutUserInfo = GM_getValue("usingShoutUserInfo");
	}
	if(GM_getValue("userInfoFloatNextToName") != null) {
		var userInfoFloatNextToName = GM_getValue("userInfoFloatNextToName");
	}
	if(GM_getValue("usingJukebox") != null) {
		var usingJukebox = GM_getValue("usingJukebox");
	}
	if(GM_getValue("stickyJukebox") != null) {
		var stickyJukebox = GM_getValue("stickyJukebox");
	}
	if(GM_getValue("emViHeight") != null) {
		var emViHeight = GM_getValue("emViHeight");
	}
	if(GM_getValue("jukeboxOff") != null) {
		var jukeboxOff = GM_getValue("jukeboxOff");
	}
	if(GM_getValue("UsingAutoplay") != null) {
		var UsingAutoplay = GM_getValue("UsingAutoplay");
	}
	if(GM_getValue("usingShoutHistory") != null) {
		var usingShoutHistory = GM_getValue("usingShoutHistory");
	}
	if(GM_getValue("usingPMFromShout") != null) {
		var usingPMFromShout = GM_getValue("usingPMFromShout");
	}
	if(GM_getValue("accInfo") != null) {
		var accInfo = GM_getValue("accInfo");
	}
	if(GM_getValue("icoColor") != null) {
		var icoColor = GM_getValue("icoColor");
	}
	if(GM_getValue("msgColor") != null) {
		var msgColor = GM_getValue("msgColor");
	}
	if(GM_getValue("bbColor") != null) {
		var bbColor = GM_getValue("bbColor");
	}
	if(GM_getValue("boldColor") != null) {
		var boldColor = GM_getValue("boldColor");
	}
	if(GM_getValue("italicColor") != null) {
		var italicColor = GM_getValue("italicColor");
	}
	if(GM_getValue("alwaysUsingSize") != null) {
		var alwaysUsingSize = GM_getValue("alwaysUsingSize");
	}
	if(GM_getValue("alwaysUsingFont") != null) {
		var alwaysUsingFont = GM_getValue("alwaysUsingFont");
	}
	if(GM_getValue("alwaysUsingAlign") != null) {
		var alwaysUsingAlign = GM_getValue("alwaysUsingAlign");
	}
	if(GM_getValue("alwaysItalic") != null) {
		var alwaysItalic = GM_getValue("alwaysItalic");
	}
	if(GM_getValue("alwaysBold") != null) {
		var alwaysBold = GM_getValue("alwaysBold");
	}
	if(GM_getValue("alwaysUnderlined") != null) {
		var alwaysUnderlined = GM_getValue("alwaysUnderlined");
	}
	if(GM_getValue("alwaysAutoColor") != null) {
		var alwaysAutoColor = GM_getValue("alwaysAutoColor");
	}
	if(GM_getValue("KS") != null) {
		var KS = GM_getValue("KS");
	}
	if(GM_getValue("WS") != null) {
		var WS = GM_getValue("WS");
	}
	if(GM_getValue("ES") != null) {
		var ES = GM_getValue("ES");
	}
	if(GM_getValue("HS") != null) {
		var HS = GM_getValue("HS");
	}
	if(GM_getValue("NCsmileyRemoveConfirm") != null) {
		var NCsmileyRemoveConfirm = GM_getValue("NCsmileyRemoveConfirm");
	}
	if(GM_getValue("usingMentions") != null) {
		var usingMentions = GM_getValue("usingMentions");
	}
	if(GM_getValue("mentionVolume") != null) {
		var mentionVolume = GM_getValue("mentionVolume");
	}
	if(GM_getValue("mentionURL") != null) {
		var mentionURL = GM_getValue("mentionURL");
	}
	if(GM_getValue("mentionNicks") != null) {
		var mentionNicks = GM_getValue("mentionNicks");
	}
	if(GM_getValue("mentionDesktopN") != null) {
		var mentionDesktopN = GM_getValue("mentionDesktopN");
	}
	if(GM_getValue("usingPMAudio") != null) {
		var usingPMAudio = GM_getValue("usingPMAudio");
	}
	if(GM_getValue("usingPMNoti") != null) {
		var usingPMNoti = GM_getValue("usingPMNoti");
	}
	if(GM_getValue("PMNotiAudioVolume") != null) {
		var PMNotiAudioVolume = GM_getValue("PMNotiAudioVolume");
	}
	if(GM_getValue("PMNotiAudioURL") != null) {
		var PMNotiAudioURL = GM_getValue("PMNotiAudioURL");
	}
	if(GM_getValue("jukeboxLimit") != null) {
		var jukeboxLimit = GM_getValue("jukeboxLimit");
	}
	if(GM_getValue("UseNbbCodeDefaultStyle") != null) {
		var UseNbbCodeDefaultStyle = GM_getValue("UseNbbCodeDefaultStyle");
	}
	if(GM_getValue("mentionAll") != null) {
		var mentionAll = GM_getValue("mentionAll");
	}
	if(GM_getValue("forumReloadInterval") != null) {
		var forumReloadInterval = GM_getValue("forumReloadInterval");
	}
	if(GM_getValue("usingForumReload") != null) {
		var usingForumReload = GM_getValue("usingForumReload");
	}
	if(GM_getValue("usingQuoteButtons") != null) {
		var usingQuoteButtons = GM_getValue("usingQuoteButtons");
	}
    if(GM_getValue("PMFromShoutIconSize") != null) {
		var PMFromShoutIconSize = GM_getValue("PMFromShoutIconSize");
	}
    if(GM_getValue("quoteFromShoutIconSize") != null) {
		var quoteFromShoutIconSize = GM_getValue("quoteFromShoutIconSize");
	}
    if(GM_getValue("quoteFromShoutPosAfter") != null) {
		var quoteFromShoutPosAfter = GM_getValue("quoteFromShoutPosAfter");
	}
    if(GM_getValue("usingOnlineUsers") != null) {
		var usingOnlineUsers = GM_getValue("usingOnlineUsers");
	}
    if(GM_getValue("updateOnlineUserInterval") != null) {
		var updateOnlineUserInterval = GM_getValue("updateOnlineUserInterval");
	}
    if(GM_getValue("usingSmileyHide4Hover") != null) {
		var usingSmileyHide4Hover = GM_getValue("usingSmileyHide4Hover");
	}
}

if(true){ //Default smileys
	var KSsmileys = '';
	var WSsmileys = '';
	var ESsmileys = '';
	var HSsmileys = '';

	// KAT Smileys
	KSsmileys += '    <img title="katdarky" class="cusSmile" src="https://i.imgur.com/6e8WWMO.gif" alt="katdarky" />';
	KSsmileys += '    <img title="Biggrin" class="cusSmile" alt="biggrin" src="https://i.imgur.com/yrmrqBr.gif" />';
	KSsmileys += '    <img title="Cry" class="cusSmile" alt="cry" src="https://i.imgur.com/31QyqdW.gif" />';
	KSsmileys += '    <img title="Dizzy" class="cusSmile" alt="dizzy" src="https://i.imgur.com/Dab19mK.gif" />';
	KSsmileys += '    <img title="Funk" class="cusSmile" alt="funk" src="https://i.imgur.com/OelvgkH.gif" />';
	KSsmileys += '    <img title="Huffy" class="cusSmile" alt="huffy" src="https://i.imgur.com/e1xCAZp.gif" />';
	KSsmileys += '    <img title="LOL" class="cusSmile" alt="lol" src="https://i.imgur.com/Y2IB7c1.gif" />';
	KSsmileys += '    <img title="Lovliness" class="cusSmile" alt="lovliness" src="https://i.imgur.com/OUzdHNF.gif" />';
	KSsmileys += '    <img title="Mad" class="cusSmile" alt="mad" src="https://i.imgur.com/zZuLIGb.gif" />';
	KSsmileys += '    <img title="Sad" class="cusSmile" alt="sad" src="https://i.imgur.com/xarqUB1.gif" />';
	KSsmileys += '    <img title="Shocked" class="cusSmile" alt="shocked" src="https://i.imgur.com/qi4A3nr.gif" />';
	KSsmileys += '    <img title="Shy" class="cusSmile" alt="shy" src="https://i.imgur.com/xFFGTfU.gif" />';
	KSsmileys += '    <img title="Sleepy" class="cusSmile" alt="sleepy" src="https://i.imgur.com/16gZbHY.gif" />';
	KSsmileys += '    <img title="Smile" class="cusSmile" alt="smile" src="https://i.imgur.com/jDCmN5k.gif" />';
	KSsmileys += '    <img title="Sweat" class="cusSmile" alt="sweat" src="https://i.imgur.com/gOXCcif.gif" />';
	KSsmileys += '    <img title="Titter" class="cusSmile" alt="titter" src="https://i.imgur.com/3mUNmP8.gif" />';
	KSsmileys += '    <img title="Tongue" class="cusSmile" alt="tongue" src="https://i.imgur.com/Au91JBC.gif" />';
	KSsmileys += '    <img title="Pirate" class="cusSmile" alt="pirate" src="https://i.imgur.com/c0gTgBS.gif" />';
	KSsmileys += '    <img title="Boo" class="cusSmile" alt="boo" src="https://i.imgur.com/Rl6QHXw.gif" />';
	KSsmileys += '    <img title="Wink" class="cusSmile" alt="wink" src="https://i.imgur.com/ZoWgkuV.gif" />';
	KSsmileys += '    <img title="Dull" class="cusSmile" alt="dull" src="https://i.imgur.com/5T7B0wl.gif" />';
	KSsmileys += '    <img title="Chuckle" class="cusSmile" alt="chuckle" src="https://i.imgur.com/UQxpJbL.gif" />';
	KSsmileys += '    <img title="Clap" class="cusSmile" alt="clap" src="https://i.imgur.com/vBzTQec.gif" />';
	KSsmileys += '    <img title="Drunk" class="cusSmile" alt="drunk" src="https://i.imgur.com/6amPLB3.gif" />';
	KSsmileys += '    <img title="Finger" class="cusSmile" alt="finger" src="https://i.imgur.com/Zcq1str.gif" />';
	KSsmileys += '    <img title="Inlove" class="cusSmile" alt="inlove" src="https://i.imgur.com/DjKkEX7.gif" />';
	KSsmileys += '    <img title="Nerd" class="cusSmile" alt="nerd" src="https://i.imgur.com/gu5gvMk.gif" />';
	KSsmileys += '    <img title="No" class="cusSmile" alt="no" src="https://i.imgur.com/VKctnGI.gif" />';
	KSsmileys += '    <img title="ROFL" class="cusSmile" alt="rofl" src="https://i.imgur.com/BRNDUiY.gif" />';
	KSsmileys += '    <img title="Lipssealed" class="cusSmile" alt="lipssealed" src="https://i.imgur.com/S29lZ3e.gif" />';
	KSsmileys += '    <img title="Smirk" class="cusSmile" alt="smirk" src="https://i.imgur.com/8Bzq4I8.gif" />';
	KSsmileys += '    <img title="Think" class="cusSmile" alt="think" src="https://i.imgur.com/fLaLJRx.gif" />';
	KSsmileys += '    <img title="Yes" class="cusSmile" alt="yes" src="https://i.imgur.com/1Mge3YI.gif" />';
	KSsmileys += '    <img title="Wait" class="cusSmile" alt="wait" src="https://i.imgur.com/tkKjFsA.gif" />';
	KSsmileys += '    <img title="Wave" class="cusSmile" alt="wave" src="https://i.imgur.com/vHrmADf.gif" />';
	KSsmileys += '    <img title="Cool" class="cusSmile" alt="cool" src="https://i.imgur.com/bFSKaxa.gif" />';
	KSsmileys += '    <img title="Evil" class="cusSmile" alt="evil" src="https://i.imgur.com/zX9yKQn.gif" />';
	KSsmileys += '    <img title="Punch" class="cusSmile" alt="punch" src="https://i.imgur.com/jcSMOIz.gif" />';
	KSsmileys += '    <img title="DOH!" class="cusSmile" alt="doh" src="https://i.imgur.com/LQqhK7F.gif" />';
	KSsmileys += '    <img title="Yawn" class="cusSmile" alt="yawn" src="https://i.imgur.com/EItEozy.gif" />';
	KSsmileys += '    <img title="TMI" class="cusSmile" alt="tmi" src="https://i.imgur.com/UHp9eQR.gif" />';
	KSsmileys += '    <img title="Fubar" class="cusSmile" alt="fubar" src="https://i.imgur.com/2S7ahGT.gif" />';
	KSsmileys += '    <img title="Rock" class="cusSmile" alt="rock" src="https://i.imgur.com/jNciQTr.gif" />';
	KSsmileys += '    <img title="Bandit" class="cusSmile" alt="bandit" src="https://i.imgur.com/GS4Lctd.gif" />';
	KSsmileys += '    <img title="Swear" class="cusSmile" alt="swear" src="https://i.imgur.com/Qef0xw8.gif" />';
	KSsmileys += '    <img title="Facepalm" class="cusSmile" alt="facepalm" src="https://i.imgur.com/ky63riP.gif" />';
	KSsmileys += '    <img title="Thumbup" class="cusSmile" alt="thumbup" src="https://i.imgur.com/xxtKctj.gif" />';
	KSsmileys += '    <img title="Thumbdown" class="cusSmile" alt="thumbdown" src="https://i.imgur.com/bkv4kfO.gif" />';
	KSsmileys += '    <img title="HeadWall" class="cusSmile" alt="headwall" src="https://i.imgur.com/QnhNsQD.gif" />';
	var KSsmileys4use = KSsmileys;
	if(GM_getValue("KSsmileys4use") != null) {
		KSsmileys4use = GM_getValue("KSsmileys4use");
	}

	// WWT Smileys
	WSsmileys += '    <img data-code=":brb" title="brb" class="cusSmile" alt="brb" src="https://i.imgur.com/ZMJORZ3.gif" />';
	WSsmileys += '    <img data-code=":cwl" title="Crying While Laughing" class="cusSmile" alt=":cwl" src="https://i.imgur.com/2oE7Tzm.gif" />';
	WSsmileys += '    <img data-code=":love" title="Heart" class="cusSmile" alt=":love" src="https://i.imgur.com/ebsLKQ5.gif" />';
	WSsmileys += '    <img data-code=":bandit" title="bandit" class="cusSmile" alt="bandit" src="https://i.imgur.com/C0VKxsk.gif" />';
	WSsmileys += '    <img data-code=":brokenheart" title="brokenheart" class="cusSmile" alt="brokenheart" src="https://i.imgur.com/ekBiQPm.gif" />';
	WSsmileys += '    <img data-code=":doh" title="doh" class="cusSmile" alt="doh" src="https://i.imgur.com/lEcKUVS.gif" />';
	WSsmileys += '    <img data-code=":envy" title="envy" class="cusSmile" alt="envy" src="https://i.imgur.com/sQ0rGHJ.gif" />';
	WSsmileys += '    <img data-code=":fubar" title="fubar" class="cusSmile" alt="fubar" src="https://i.imgur.com/l8fFTKB.gif" />';
	WSsmileys += '    <img data-code=":headbang" title="headbang" class="cusSmile" alt="headbang" src="https://i.imgur.com/kpB9Kak.gif" />';
	WSsmileys += '    <img data-code=":lipssealed" title="lipssealed" class="cusSmile" alt="lipssealed" src="https://i.imgur.com/ADpoLy9.gif" />';
	WSsmileys += '    <img data-code=":smile" title="smile" class="cusSmile" alt="smile" src="https://i.imgur.com/Ysi2LMy.gif" />';
	WSsmileys += '    <img data-code=":sad" title="sad" class="cusSmile" alt="sad" src="https://i.imgur.com/RF66uF3.gif" />';
	WSsmileys += '    <img data-code=":wink" title="wink" class="cusSmile" alt="wink" src="https://i.imgur.com/sfnQ7xF.gif" />';
	WSsmileys += '    <img data-code=":tongue" title="tongue" class="cusSmile" alt="tongue" src="https://i.imgur.com/6O58m4l.gif" />';
	WSsmileys += '    <img data-code=":laugh" title="laugh" class="cusSmile" alt="laugh" src="https://i.imgur.com/sdvt3UE.gif" />';
	WSsmileys += '    <img data-code=":dull" title="dull" class="cusSmile" alt="dull" src="https://i.imgur.com/xHzh5z8.gif" />';
	WSsmileys += '    <img data-code=":surprised" title="surprised" class="cusSmile" alt="surprised" src="https://i.imgur.com/lLvTNAx.gif" />';
	WSsmileys += '    <img data-code=":confused" title="confused" class="cusSmile" alt="confused" src="https://i.imgur.com/tR4rnAZ.gif" />';
	WSsmileys += '    <img data-code=":nerd" title="nerd" class="cusSmile" alt="nerd" src="https://i.imgur.com/8vIFuHY.gif" />';
	WSsmileys += '    <img data-code=":smirk" title="smirk" class="cusSmile" alt="smirk" src="https://i.imgur.com/1ogvf3K.gif" />';
	WSsmileys += '    <img data-code=":cool" title="cool" class="cusSmile" alt="cool" src="https://i.imgur.com/fmvFhFU.gif" />';
	WSsmileys += '    <img data-code=":facepalm" title="facepalm" class="cusSmile" alt="facepalm" src="https://i.imgur.com/JaHw9OR.gif" />';
	WSsmileys += '    <img data-code=":cry" title="cry" class="cusSmile" alt="cry" src="https://i.imgur.com/lzb7GJ8.gif" />';
	WSsmileys += '    <img data-code=":kiss" title="kiss" class="cusSmile" alt="kiss" src="https://i.imgur.com/gsi4E1N.gif" />';
	WSsmileys += '    <img data-code=":finger" title="finger" class="cusSmile" alt="finger" src="https://i.imgur.com/dsypZnn.gif" />';
	WSsmileys += '    <img data-code=":evil" title="evil" class="cusSmile" alt="evil" src="https://i.imgur.com/Znb6ePG.gif" />';
	WSsmileys += '    <img data-code=":angry" title="angry" class="cusSmile" alt="angry" src="https://i.imgur.com/s9oymwF.gif" />';
	WSsmileys += '    <img data-code=":inlove" title="inlove" class="cusSmile" alt="inlove" src="https://i.imgur.com/Jhmvtw0.gif" />';
	WSsmileys += '    <img data-code=":blush" title="blush" class="cusSmile" alt="blush" src="https://i.imgur.com/oKA6Jdc.gif" />';
	WSsmileys += '    <img data-code=":clap" title="clap" class="cusSmile" alt="clap" src="https://i.imgur.com/4xWo5SW.gif" />';
	WSsmileys += '    <img data-code=":think" title="think" class="cusSmile" alt="think" src="https://i.imgur.com/9lBXdDC.gif" />';
	WSsmileys += '    <img data-code=":yes" title="yes" class="cusSmile" alt="yes" src="https://i.imgur.com/Q75Tyor.gif" />';
	WSsmileys += '    <img data-code=":no" title="no" class="cusSmile" alt="no" src="https://i.imgur.com/AHb96dA.gif" />';
	WSsmileys += '    <img data-code=":hi" title="hi" class="cusSmile" alt="hi" src="https://i.imgur.com/MrQFrBn.gif" />';
	WSsmileys += '    <img data-code=":drunk" title="drunk" class="cusSmile" alt="drunk" src="https://i.imgur.com/fDQdXt8.gif" />';
	WSsmileys += '    <img data-code=":giggle" title="giggle" class="cusSmile" alt="giggle" src="https://i.imgur.com/sx4M2qz.gif" />';
	WSsmileys += '    <img data-code=":punch" title="punch" class="cusSmile" alt="punch" src="https://i.imgur.com/wTLJTPx.gif" />';
	WSsmileys += '    <img data-code=":wait" title="wait" class="cusSmile" alt="wait" src="https://i.imgur.com/QJXfg4V.gif" />';
	WSsmileys += '    <img data-code=":swear" title="swear" class="cusSmile" alt="swear" src="https://i.imgur.com/3EiyVGe.gif" />';
	WSsmileys += '    <img data-code=":sweat" title="sweat" class="cusSmile" alt="sweat" src="https://i.imgur.com/imxo4Qw.gif" />';
	WSsmileys += '    <img data-code=":tmi" title="tmi" class="cusSmile" alt="tmi" src="https://i.imgur.com/AmHD24F.gif" />';
	if(GM_getValue("WSsmileys4use") != null) {
		var WSsmileys4use = GM_getValue("WSsmileys4use");
	} else {
		var WSsmileys4use = WSsmileys;
	}

	// Extra Smileys
	ESsmileys += '    <img title="Smoking" class="cusSmile" alt="smoke" src="https://i.imgur.com/8NM4PSG.gif" />';
	ESsmileys += '    <img title="Devil" class="cusSmile" alt="devil" src="https://i.imgur.com/6O0oZBV.gif" />';
	ESsmileys += '    <img title="Mooning" class="cusSmile" alt="mooning" src="https://i.imgur.com/RP9b7FS.gif" />';
	ESsmileys += '    <img title="Poop" class="cusSmile" alt="poop" src="https://i.imgur.com/az3Ks2S.gif" />';
	ESsmileys += '    <img title="Squirrel" class="cusSmile" alt="squirrel" src="https://i.imgur.com/xCBvpyM.gif" />';
	ESsmileys += '    <img title="Ninja" class="cusSmile" alt="ninja" src="https://i.imgur.com/qAcWv6r.gif" />';
	ESsmileys += '    <img title="Beer" class="cusSmile" alt="beer" src="https://i.imgur.com/oEkVt3Q.gif" />';
	ESsmileys += '    <img title="Drink" class="cusSmile" alt="drink" src="https://i.imgur.com/Ny8qrd5.gif" />';
	ESsmileys += '    <img title="Coffee" class="cusSmile" alt="coffee" src="https://i.imgur.com/VXVdBNW.gif" />';
	ESsmileys += '    <img title="Cake" class="cusSmile" alt="cake" src="https://i.imgur.com/Qe18IlM.gif" />';
	ESsmileys += '    <img title="Pizza" class="cusSmile" alt="pizza" src="https://i.imgur.com/5Lbz27k.gif" />';
	ESsmileys += '    <img title="Rain" class="cusSmile" alt="rain" src="https://i.imgur.com/jcir7SZ.gif" />';
	ESsmileys += '    <img title="Mail" class="cusSmile" alt="mail" src="https://i.imgur.com/u6mnOPE.gif" />';
	ESsmileys += '    <img title="Music" class="cusSmile" alt="music" src="https://i.imgur.com/jE9cvcV.gif" />';
	ESsmileys += '    <img title="Phone" class="cusSmile" alt="phone" src="https://i.imgur.com/uG1L8TY.gif" />';
	ESsmileys += '    <img title="Weed" class="cusSmile" alt="weed" src="https://i.imgur.com/hAKWhAc.gif" />';
	if(GM_getValue("ESsmileys4use") != null) {
		var ESsmileys4use = GM_getValue("ESsmileys4use");
	} else {
		var ESsmileys4use = ESsmileys;
	}

	// Holiday Smileys
	// Halloween
	HSsmileys += '    <img title="Pumpkin" class="cusSmile" alt="pumpkin" src="https://i.imgur.com/hIebJ9L.gif" />';
	HSsmileys += '    <img title="Ghost" class="cusSmile" alt="ghost" src="https://i.imgur.com/k9hVp65.gif" />';
	HSsmileys += '    <img title="Vampire" class="cusSmile" alt="vampire" src="https://i.imgur.com/HJIvULF.gif" />';
	// Christmas
	HSsmileys += '    <img title="Holiday Spirit" class="cusSmile" alt="holiday spirit" src="https://i.imgur.com/iIUWTtG.gif" />';
	HSsmileys += '    <img title="Santa" class="cusSmile" alt="santa" src="https://i.imgur.com/RKEPzpK.gif" />';
	HSsmileys += '    <img title="Xmas Tree" class="cusSmile" alt="xmas tree" src="https://i.imgur.com/y67jIX4.gif" />';
	HSsmileys += '    <img title="Gift" class="cusSmile" alt="gift" src="https://i.imgur.com/uLQdktu.gif" />';
	// other
	HSsmileys += '    <img title="Clover" class="cusSmile" alt="clover" src="https://i.imgur.com/kVlnXlC.gif" />';
	if(GM_getValue("HSsmileys4use") != null) {
		var HSsmileys4use = GM_getValue("HSsmileys4use");
	} else {
		var HSsmileys4use = HSsmileys;
	}

	var smileys = '';
	if(KS) {
		smileys += KSsmileys4use;
	}
	if(WS) {
		smileys += WSsmileys4use;
	}
	if(ES) {
		smileys += ESsmileys4use;
	}
	if(HS) {
		smileys += HSsmileys4use;
	}
}

if(usingMentions){
	var auPlayer = document.createElement('audio');
	auPlayer.src = mentionURL;
	auPlayer.preload = 'auto';
	auPlayer.volume = mentionVolume;
	if(mentionDesktopN) {
		if(Notification.permission !== 'granted'){
			Notification.requestPermission();
		}
	}
}
if(usingPMAudio){
	var PMauPlayer = document.createElement('audio');
	PMauPlayer.src = PMNotiAudioURL;
	PMauPlayer.preload = 'auto';
	PMauPlayer.volume = PMNotiAudioVolume;
}

var collectedCodes = "";
var forcedLoad = false; //setting to false to start with

//Set new shoutbox height
//$('#shout_frame').attr('height', shoutBoxHeight * 1);
$('#shout_frame').css('height', shoutBoxHeight * 1);
$('.shoutbox_contain').attr('style', 'overflow-y: scroll; height: 100% !important');

// Needed for glyphicon icon
$('head').append('<link rel="stylesheet" type="text/css" href="https://worldwidetorrents.to/css/glyphicons.css" />');

if(true){ //Blogblob
	var scrollDirection = 2300; //0=up 2300=down
	var storedMarqueeDiv = $("#marqueecontainer").html();
	//$("#marqueecontainer").attr("style", $("#marqueecontainer").attr("style") + " overflow-y: scroll;");
	$("#marqueecontainer").html($("#vmarquee").html());
	$("#marqueecontainer").attr("style", "overflow-y: scroll; height: 250px;");
	$("#marqueecontainer").mouseenter(function(){
		$("#marqueecontainer").stop("fx", true, false);
	});
	$("#marqueecontainer").mouseleave(function(){
		if(scrollDirection == 2300) {
			var howFast2Scroll = (2300 - $("#marqueecontainer").scrollTop())*52;
		} else {
			var howFast2Scroll = $("#marqueecontainer").scrollTop()*52;
		}
		$("#marqueecontainer").animate({scrollTop: scrollDirection}, howFast2Scroll, "swing", function() {
			if(scrollDirection == 0) { //if up...
				scrollDirection = 2300; //change to down
			} else { //if down...
				scrollDirection = 0; //change to up
			}
			$("#marqueecontainer").animate({scrollTop: scrollDirection}, 120000, "swing", function(){
				if(scrollDirection == 0) { //if up...
					scrollDirection = 2300; //change to down
				} else { //if down...
					scrollDirection = 0; //change to up
				}
				$("#marqueecontainer").animate({scrollTop: scrollDirection}, 120000);
			});
		});
	});
}

if(true){ //Options menu
	$("ul.w3-navbar").append(' <li class="w3-hide-small"><a href="#" id="FPIOptions" class="w3-padding-large w3-hover-white class1" title="Frontpage Improvements Script Options"><i class="fa fa-cog"></i> FPI Options</a></li> '); //Appending FPI Options Button
	$("#FPIOptions").click(function(e){ //FPI Options
		e.preventDefault();
		if(true) { //options menu visual
			if($("#optionsDiv").length >= 0) { //If already open, close it before opening a new one.
				$("#optionsDiv").remove();
			}
			var optionsDiv = '<div id="optionsDiv" style="position: fixed; left:25%; top: 46px; display: block;"><div class="w3-modal-content w3-card-8" id="div2RS" style="background-color: #7d97a5; max-width:700px; max-height: 90vh; overflow-y: auto; font-size: 18px;">'; //making the options div
			optionsDiv += '<div class="w3-center"><h1>Frontpage Improvements Options</h1></div><br>';
			optionsDiv += '<center>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="usingOnlineUsers" title="Enable to show the number of online users in the site header.">  <label for="usingOnlineUsers" title="Enable to show the number of online users in the site header.">Display # online users</label><br>';
			optionsDiv += '<input type="number" title="How often to update the number of online users (in seconds 10-999)" id="updateOnlineUserInterval" style="width: 50px; text-align: center; font-size: 15px;" min="10" max="999"> <label for="updateOnlineUserInterval" title="How often to update the number of online users (in seconds 10-999)">Online users update interval</label><br>';
			optionsDiv += 'Hide/Remove sections settings <button style="font-size: 15px;" id="hideSetButt">Show/Hide</button><br>';
			optionsDiv += '<div id="hideSetDiv" style="display: none; height: 360px; padding: 10px 100px; font-size: 15px; background-color: #5c7684;">'; //hideSetDiv start
			optionsDiv += '<div style="float: left; text-align: left;">'; //left side
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="usingHide" title="Entirely disable/enable the part of the script that hides parts of the page. (Overrides all other hide settings)">  <label for="usingHide" title="Entirely disable/enable the part of the script that hides parts of the page. (Overrides all other hide settings)">Using Hide Section Functionality</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" title="New look for the search. Disable to use the site default." id="usingVisibleSearch">  <label for="usingVisibleSearch" title="New look for the search. Disable to use the site default.">Using Visible Search</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="autoHideNotice" title="Automatically Hides/Minimizes Notice">  <label for="autoHideNotice" title="Automatically Hides/Minimizes Notice">Auto Hide Notice</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="autoHideSearch" title="Automatically Hides/Minimizes Search">  <label for="autoHideSearch" title="Automatically Hides/Minimizes Search">Auto Hide Search</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="autoHideShout" title="Automatically Hides/Minimizes Shout">  <label for="autoHideShout" title="Automatically Hides/Minimizes Shout">Auto Hide Shout</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="autoHideMovies" title="Automatically Hides/Minimizes Movies">  <label for="autoHideMovies" title="Automatically Hides/Minimizes Movies">Auto Hide Movies</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="autoHideTV" title="Automatically Hides/Minimizes TV">  <label for="autoHideTV" title="Automatically Hides/Minimizes TV">Auto Hide TV</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="autoHideMusic" title="Automatically Hides/Minimizes Music">  <label for="autoHideMusic" title="Automatically Hides/Minimizes Music">Auto Hide Music</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="autoHideGames" title="Automatically Hides/Minimizes Games">  <label for="autoHideGames" title="Automatically Hides/Minimizes Games">Auto Hide Games</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="autoHideApps" title="Automatically Hides/Minimizes Apps">  <label for="autoHideApps" title="Automatically Hides/Minimizes Apps">Auto Hide Apps</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="autoHideAnime" title="Automatically Hides/Minimizes Anime">  <label for="autoHideAnime" title="Automatically Hides/Minimizes Anime">Auto Hide Anime</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="autoHideBooks" title="Automatically Hides/Minimizes Books">  <label for="autoHideBooks" title="Automatically Hides/Minimizes Books">Auto Hide Books</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="autoHideComics" title="Automatically Hides/Minimizes Comics">  <label for="autoHideComics" title="Automatically Hides/Minimizes Comics">Auto Hide Comics</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="autoHideSports" title="Automatically Hides/Minimizes Sports">  <label for="autoHideSports" title="Automatically Hides/Minimizes Sports">Auto Hide Sports</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="autoHideDisclaimer" title="Automatically Hides/Minimizes the footer">  <label for="autoHideDisclaimer" title="Automatically Hides/Minimizes the footer">Auto Hide Footer</label>';
			optionsDiv += '</div><div style="float:right; text-align: left;">'; //right side
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="fullHideNotice" title="Fully Hides/Removes Notice">  <label for="fullHideNotice" title="Fully Hides/Removes Notice">Full Hide Notice</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="fullHideSearch" title="Fully Hides/Removes Search">  <label for="fullHideSearch" title="Fully Hides/Removes Search">Full Hide Search</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="fullHideShout" title="Fully Hides/Removes Shout">  <label for="fullHideShout" title="Fully Hides/Removes Shout">Full Hide Shout</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="fullHideMovies" title="Fully Hides/Removes Movies">  <label for="fullHideMovies" title="Fully Hides/Removes Movies">Full Hide Movies</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="fullHideTV" title="Fully Hides/Removes TV">  <label for="fullHideTV" title="Fully Hides/Removes TV">Full Hide TV</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="fullHideMusic" title="Fully Hides/Removes Music">  <label for="fullHideMusic" title="Fully Hides/Removes Music">Full Hide Music</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="fullHideGames" title="Fully Hides/Removes Games">  <label for="fullHideGames" title="Fully Hides/Removes Games">Full Hide Games</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="fullHideApps" title="Fully Hides/Removes Apps">  <label for="fullHideApps" title="Fully Hides/Removes Apps">Full Hide Apps</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="fullHideAnime" title="Fully Hides/Removes Anime">  <label for="fullHideAnime" title="Fully Hides/Removes Anime">Full Hide Anime</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="fullHideBooks" title="Fully Hides/Removes Books">  <label for="fullHideBooks" title="Fully Hides/Removes Books">Full Hide Books</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="fullHideComics" title="Fully Hides/Removes Comics">  <label for="fullHideComics" title="Fully Hides/Removes Comics">Full Hide Comics</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="fullHideSports" title="Fully Hides/Removes Sports">  <label for="fullHideSports" title="Fully Hides/Removes Sports">Full Hide Sports</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="fullHideDisclaimer" title="Fully Hides/Removes the footer">  <label for="fullHideDisclaimer" title="Fully Hides/Removes the footer">Full Hide Footer</label></div>';
			optionsDiv += '</div>'; //hideSetDiv end
			optionsDiv += 'Shoutbox- and Shoutbox Utilities Settings <button style="font-size: 15px;" id="ShUtSetButt">Show/Hide</button><br>';
			optionsDiv += '<div id="ShUtSetDiv" style="display: none; height: 200px; padding: 10px; font-size: 15px; background-color: #5c7684;">'; //Shoutbox Utilities Settings start
			optionsDiv += '<div style="float: left; text-align: left;">'; //left side
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="UsingShoutUtil" title="Entirely disable/enable Shoutbox Utilities (Overrides all other Shoutbox Utilities settings)">  <label for="UsingShoutUtil" title="Entirely disable/enable Shoutbox Utilities (Overrides all other Shoutbox Utilities settings)">Use Shoutbox Utilities</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" class="shoutUtiChildren" id="showReqThreads" title="Include Request Threads dropdown in the Utilities">  <label for="showReqThreads" class="shoutUtiChildren" title="Include Request Threads dropdown in the Utilities">Request Threads in Utilities</label><br>'; //needs yes/no string
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" class="shoutUtiChildren" id="showMsgs" title="Include Messages dropdown in the Utilities">  <label for="showMsgs" class="shoutUtiChildren" title="Include Messages dropdown in the Utilities">Messages in Utilities</label><br><br>'; //needs yes/no string
			optionsDiv += '<input type="number" title="This allows you to change the shoutbox height (in pixels). The default and minimum is 200." id="shoutBoxHeight" placeholder="200" style="width: 50px; text-align: center; font-size: 15px;" min="200"> <label for="shoutBoxHeight" title="This allows you to change the shoutbox height (in pixels). The default and minimum is 200.">Shoutbox Height</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="usingShoutHistory" title="Enable the history link next to the shoutbox">  <label for="usingShoutHistory" title="Enable the history link next to the shoutbox">Enable Shout History</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="usingQuoteButtons" title="Enable Quote buttons in the shoutbox. (Also has better handling than the quote button in the bbCode section)">  <label for="usingQuoteButtons" title="Enable Quote buttons in the shoutbox. (Supports images and links inside the quote)">Enable Quote Buttons in Shout</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="quoteFromShoutPosAfter" title="Check this to position the (in-shout)quote button AFTER the user\'s message, or uncheck to position it next to the PM button">  <label for="quoteFromShoutPosAfter" title="Check this to position the (in-shout)quote button AFTER the user\'s message, or uncheck to position it next to the PM button">Position Quote Button After User Message</label><br>';
            optionsDiv += '</div><div style="float:right; text-align: left;">'; //right side
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" class="shoutUtiChildren" id="showLinks" title="Include Other Links dropdown in the Utilities">  <label for="showLinks" class="shoutUtiChildren" title="Include Other Links dropdown in the Utilities">Other Links in Utilities</label><br>'; //needs yes/no string
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" class="shoutUtiChildren" id="centerSSMessages" title="Center all messages added by Shoutbox utilities in the shoutbox">  <label for="centerSSMessages" class="shoutUtiChildren" title="Center all messages added by Shoutbox utilities in the shoutbox">Center Utilities Messages</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" class="shoutUtiChildren" id="allTextGetsReplaced" title="Replace all current text in the messagebox with the selected Utilities message. Leave disabled to add Utilities messages after current text.">  <label for="allTextGetsReplaced" class="shoutUtiChildren" title="Replace all current text in the messagebox with the selected Utilities message. Leave disabled to add Utilities messages after current text.">Replace text with Utilities message</label><br><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="usingShoutUserInfo" title="Enable/Disable display of user info when you hover over a username in the shoutbox.">  <label for="usingShoutUserInfo" title="Enable/Disable display of user info when you hover over a username in the shoutbox.">Floating User Info in Shoutbox</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="userInfoFloatNextToName" title="Enable to display the floating user info next to username. Disable to display user info in the lower right corner of the shoutbox.">  <label for="userInfoFloatNextToName" title="Enable to display the floating user info next to username. Disable to display user info in the lower right corner of the shoutbox.">Show floating user info next to username</label><br>';
			optionsDiv += '<input type="number" title="Set the (in shout)quote button size (in pixels)" id="quoteFromShoutIconSize" placeholder="15" style="width: 50px; text-align: center; font-size: 15px;" min="1" max="35"> <label for="quoteFromShoutIconSize" title="Set the (in shout)quote button size (in pixels)">Quote button size</label><br>';
            optionsDiv += '</div></div>'; //Shoutbox Utilities Settings end

			optionsDiv += '<div id="ShUtCustomDiv" style="display: none; padding: 10px; font-size: 15px; background-color: #5c7684;">'; //Shoutbox Utilities Settings start
			optionsDiv += '<button id="newShUt">Add a new custom message</button><br><b style="font-size: 20px;">Custom Messages:</b><br><br>';

			for(i = 0; i < shoutUtiXMsgArray.length; i++) {
				optionsDiv += '<span NumInArray="'+i+'"><img src="https://i.imgur.com/oB3LVF5.png" title="Remove this message" style="cursor: pointer; display: inline-block; position: relative; right: 10px;" class="removeShUtMsg" height="15" width="15">Message:<br><input type="text" class="shoutUtiCusMessages" size="'+(shoutUtiXMsgArray[i].length+5)+'" style="text-align: center; max-width: 100%; font-size: 15px;"><br>Menu text:<br><input type="text" class="shoutUtiCusNames" size="'+(shoutUtiXMsgNameArray[i].length+5)+'" style="text-align: center; max-width: 100%; font-size: 15px;"></span><br><br>';
			}
			optionsDiv += '</div>';
			optionsDiv += 'Jukebox Settings <button style="font-size: 15px;" id="JukeSetButt">Show/Hide</button><br>'; //Jukebox Settings start
			optionsDiv += '<div id="JukeSetDiv" style="display: none; height: 95px; padding: 10px; font-size: 15px; background-color: #5c7684;">';
			optionsDiv += '<div style="float: left; text-align: left;">'; //left side
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="usingJukebox" title="Entirely enable/disable Jukebox">  <label for="usingJukebox" title="Entirely enable/disable Jukebox">Use Jukebox</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="stickyJukebox" title="Makes the Jukebox stick to the bottom of the screen. Follows the screen when scrolling.">  <label for="stickyJukebox" title="Makes the Jukebox stick to the bottom of the screen. Follows the screen when scrolling.">Sticky Jukebox</label><br>';
			optionsDiv += '<input type="text" title="Sets the height of the videos in the jukebox. (width will be calculated to match a 16:9 ratio) This directly affects the height of the Jukebox. 201 or below will disable volume control, but you can still control the volume by clicking on the video an then pressing Up/Down on the keyboard. If you are using &quot;FYTE&quot; anything below 225 or so will not fit properly. Using a size lower than that is still not a problem, the bottom of the video along with the controls will just not be visible. You can still play/pause the video by just clicking on it and change the volume with up/down." id="emViHeight" maxlength="3" placeholder="202" style="width: 45px; text-align: center; font-size: 15px;"> <label for="emViHeight" title="Sets the height of the videos in the jukebox. (width will be calculated to match a 16:9 ratio) This directly affects the height of the Jukebox. 201 or below will disable volume control, but you can still control the volume by clicking on the video an then pressing Up/Down on the keyboard. If you are using &quot;FYTE&quot; anything below 225 or so will not fit properly. Using a size lower than that is still not a problem, the bottom of the video along with the controls will just not be visible. You can still play/pause the video by just clicking on it and change the volume with up/down.">Video/Jukebox height</label><br>';
			optionsDiv += '</div><div style="float:right; text-align: left;">'; //right side jukeboxOff
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="jukeboxOff" title="With this enabled the jukebox is turned off by default. (but still available on the page and ready to be turned on whenever)">  <label for="jukeboxOff" title="With this enabled the jukebox is turned off by default. (but still available on the page and ready to be turned on whenever)">Jukebox is off by default, but available</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="UsingAutoplay" title="With this enabled autoplay is turned off by default. (but still available on the page and ready to be turned on whenever)">  <label for="UsingAutoplay" title="With this enabled autoplay is turned off by default. (but still available on the page and ready to be turned on whenever)">Autoplay is off by default, but available</label><br>';
			optionsDiv += '<input type="number" title="Limit the number of collected videos in the jukebox to X" id="jukeboxLimit" style="width: 50px; text-align: center; font-size: 15px;" min="0" max="99"> <label for="jukeboxLimit" title="Limit the number of collected videos in the jukebox to X">Limit number of videos collected</label></div>';
			optionsDiv += '</div>'; // Jukebox Settings end
			optionsDiv += 'bbCode Settings <button style="font-size: 15px;" id="bbSettingsButt">Show/Hide</button><br>'; //bb Settings start
			optionsDiv += '<div id="bbSettings" style="display: none; height: 110px; padding: 10px; font-size: 15px; background-color: #5c7684;">';
			optionsDiv += '<div style="float: left; text-align: left;">'; //left side
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="accInfo" title="Enable/Disable buttons above shoutbox (message count, my torrents etc.)">  <label for="accInfo" title="Enable/Disable buttons above shoutbox (message count, my torrents etc.)">Enable buttons above shout</label><br>';
			optionsDiv += '<input type="color" style="width: 25px; height: 25px;" id="icoColorPicker" title="Sets the icon color (buttons on top of the shout) using a color picker"><input type="text" title="Sets the icon color (buttons on top of the shout). Use color hex code (with or without #). Invalid codes will not be saved." id="icoColor" maxlength="7" placeholder="#FFF" style="width: 75px; text-align: center; font-size: 15px;"> <label for="icoColor" title="Sets the icon color (buttons on top of the shout). Use color hex code  (with or without #). Invalid codes will not be saved.">Icon color</label><br>';
			optionsDiv += '<input type="color" style="width: 25px; height: 25px;" id="msgColorPicker" title="Sets the new PM count (buttons on top of the shout) color using a color picker"><input type="text" title="Sets the new message notification color. Use color hex code  (with or without #). Invalid codes will not be saved." id="msgColor" maxlength="7" placeholder="#FFF" style="width: 75px; text-align: center; font-size: 15px;"> <label for="msgColor" title="Sets the new PM count (buttons on top of the shout) color. Use color hex code  (with or without #). Invalid codes will not be saved.">New message color</label><br>';
			optionsDiv += '</div><div style="float:right; text-align: left;">'; //right side
			optionsDiv += '<input type="color" style="width: 25px; height: 25px;" id="bbColorPicker" title="Sets the custom bbCode color tag color using a color picker"><input type="text" title="Sets the custom bbCode color tag color. Use color hex code  (with or without #). Invalid codes will not be saved." id="bbColor" maxlength="7" placeholder="#FFF" style="width: 75px; text-align: center; font-size: 15px;"> <label for="bbColor" title="Sets the custom bbCode color tag color. Use color hex code  (with or without #). Invalid codes will not be saved.">Custom bbCode color</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="boldColor" title="Colored messages (manual) are bold">  <label for="boldColor" title="Colored messages (manual) are bold">(manually)colored text is bold</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="italicColor" title="Colored messages (manual) are italic">  <label for="italicColor" title="Colored messages (manual) are italic">(manually)colored text is italic</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" title="Enable to use default bbCode button style" id="UseNbbCodeDefaultStyle"> <label for="UseNbbCodeDefaultStyle" title="Enable to use default bbCode button style">Use Default bbCode button style</label></div>';
			optionsDiv += '</div>'; // bb Settings end
			optionsDiv += '"Always Use" Settings <button style="font-size: 15px;" id="AUSettingsButt">Show/Hide</button><br>'; //AU Settings start
			optionsDiv += '<div id="AUSettings" style="display: none; height: 110px; padding: 10px; font-size: 15px; background-color: #5c7684;">';
			optionsDiv += '<div style="float: left; text-align: left;">'; //left side
			optionsDiv += '<select id="alwaysUsingFont" name="fonts" class="bb_icon" style="padding-bottom:1px;"><option>Disabled</option><option value="Arial" style="font-family: arial">Arial</option><option value="Arial Black" style="font-family: Arial Black">Arial Black</option><option value="Comic Sans MS" style="font-family: Comic Sans MS">Comic Sans MS</option><option value="Courier New" style="font-family: Courier New">Courier New</option><option value="Franklin Gothic Medium" style="font-family: Franklin Gothic Medium">Franklin Gothic Medium</option><option value="Georgia" style="font-family: Georgia">Georgia</option><option value="Helvetica" style="font-family: Helvetica">Helvetica</option><option value="Impact" style="font-family: Impact">Impact</option><option value="Lucida Console" style="font-family: Lucida Console">Lucida Console</option><option value="Lucida Sans Unicode" style="font-family: Lucida Sans Unicode">Lucida Sans Unicode</option><option value="Microsoft Sans Serif" style="font-family: Microsoft Sans Serif">Microsoft Sans Serif</option><option value="Palatino Linotype" style="font-family: Palatino Linotype">Palatino Linotype</option><option value="Tahoma" style="font-family: Tahoma">Tahoma</option><option value="Times New Roman" style="font-family: Times New Roman">Times New Roman</option><option value="Trebuchet MS" style="font-family: Trebuchet MS">Trebuchet MS</option><option value="Verdana" style="font-family: Verdana">Verdana</option><option value="Symbol" style="font-family: Symbol">Symbol</option></select> <label for="alwaysUsingFont" title="Always use the given font for messages.">Always use font</label><br>';
			optionsDiv += '<select id="alwaysUsingAlign" name="aligns" class="bb_icon" style="padding-bottom:1px;"><option>Disabled</option><option value="center" style="text-align: center">Center</option><option value="right" style="text-align: right">Right</option><option value="justify" style="text-align: justify">Justify</option></select> <label for="alwaysUsingAlign" title="Always use the given alignment for messages.">Always use alignment</label><br>';
			optionsDiv += '<input type="number" title="Always use the given size for messages. leave empty to not use" id="alwaysUsingSize" style="width: 50px; text-align: center; font-size: 15px;" min="0" max="7"> <label for="alwaysUsingSize" title="Always use the given size for messages. leave empty to not use">Always use size</label><br>';
			optionsDiv += '</div><div style="float:right; text-align: left;">'; //right side
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="alwaysItalic" title="Always use italic"> <label for="alwaysItalic" title="always use italic">Always italic</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="alwaysBold" title="Always use bold"> <label for="alwaysBold" title="always use bold">Always bold</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="alwaysUnderlined" title="Always use underline"> <label for="alwaysUnderlined" title="always use underline">Always underlined</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="alwaysAutoColor" title="Always use colored text. (uses the custom color from bbCode Settings)"> <label for="alwaysAutoColor" title="Always use colored text. (uses the custom color from bbCode Settings)"><span>Always colored </span><span style="color: '+ bbColor +'">(custom)</span></label><br>';
			optionsDiv += '</div></div>'; // AU Settings end
			optionsDiv += 'Mention Settings <button style="font-size: 15px;" id="mentionSettingsButt">Show/Hide</button><br>'; //Mention Settings start
			optionsDiv += '<div id="mentionSettings" style="display: none; height: 95px; padding: 10px; font-size: 15px; background-color: #5c7684;">';
			optionsDiv += '<div style="float: left; text-align: left;">'; //left side
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="usingMentions" title="Enable/Disable Mentions (@username)"> <label for="usingMentions" title="Enable/Disable Mentions (@username)">Enable Mentions</label><br>';
			optionsDiv += '<input type="number" placeholder="100" title="Mention volume. (0-100)" id="mentionVolume" style="width: 50px; text-align: center; font-size: 15px;" min="0" max="100"> <label for="mentionVolume" title="Mention volume. (0-100)">Mention Volume</label><br>';
			optionsDiv += '<input style=" margin-top: 6px; transform: scale(1.3);" type="checkbox" id="mentionDesktopN" title="Enable/Disable desktop notifications for mentions"> <label for="mentionDesktopN" title="Enable/Disable desktop notifications for mentions">Enable Desktop Notifications</label><br>';
			optionsDiv += '</div><div style="float:right; text-align: left;">'; //right side
			optionsDiv += '<input type="text" title="Enter the URL for your mention sound effect here. (Direct URL. Meaning it has to end with .mp3)" id="mentionURL" placeholder="https://customSoundEffectUrl.com/file.mp3" style="width: 250px; text-align: center; font-size: 15px;"> <label for="mentionURL" title="Enter the URL for your mention sound effect here. (Direct URL. Meaning it has to end with .mp3)">Mention Audio URL</label><br>';
			optionsDiv += '<input type="text" title="Enter your nicknames here. (Separated by , ) Your assigned nicknames can be used to mention you. i.e. @yourNickName will work just like @yourUsername. Nicknames are case insensitive." id="mentionNicks" placeholder="NickName, Nick, NN" style="width: 250px; text-align: center; font-size: 15px;"> <label for="mentionNicks" title="Enter your nicknames here. (Separated by , ) Your assigned nicknames can be used to mention you. i.e. @yourNickName will work just like @yourUsername. Nicknames are case insensitive.">Nicknames</label><br>';
			optionsDiv += '<input style="margin-top: 6px; transform: scale(1.3);" type="checkbox" id="mentionAll" title="Enable to respond to @all and @everyone"> <label for="mentionAll" title="Enable to respond to @all and @everyone">Respond to @all</label><br>';
			optionsDiv += '</div></div>'; //Mention Settings end
			optionsDiv += 'PM Settings <button style="font-size: 15px;" id="PMSettingsButt">Show/Hide</button><br>'; //PM Settings start
			optionsDiv += '<div id="PMSettings" style="display: none; height: 125px; padding: 10px; font-size: 15px; background-color: #5c7684;">';
			optionsDiv += '<div style="float: left; text-align: left;">'; //left side
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="usingPMFromShout" title="Enable the PM button next to usernames in the shoutbox.">  <label for="usingPMFromShout" title="Enable the PM button next to usernames in the shoutbox.">Enable PM from shout</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="usingPMNoti" title="Enable desktop notifications for PMs">  <label for="usingPMNoti" title="Enable desktop notifications for PMs">Desktop Notifications for PMs</label><br>';
            optionsDiv += '<input type="text" title="Enter the URL for your PM sound effect here. (Direct URL. Meaning it has to end with .mp3)" id="PMNotiAudioURL" placeholder="https://customSoundEffectUrl.com/file.mp3" style="width: 250px; text-align: center; font-size: 15px;"> <label for="PMNotiAudioURL" title="Enter the URL for your PM sound effect here. (Direct URL. Meaning it has to end with .mp3)">PM Audio URL</label><br>';
			optionsDiv += '</div><div style="float:right; text-align: left;">'; //right side
            optionsDiv += '<input type="number" placeholder="15" title="PM-From-Shout Button Size. (in pixels)" id="PMFromShoutButtSize" style="width: 50px; text-align: center; font-size: 15px;" min="1" max="30"> <label for="PMFromShoutButtSize" title="PM-From-Shout Button Size. (in pixels)">PM From Shout Button Size</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="usingPMAudio" title="Enable Audio for PM notifications">  <label for="usingPMAudio" title="Enable Audio for PM notifications">Enable Audio for PMs</label><br>';
			optionsDiv += '<input type="number" placeholder="100" title="PM Notification volume. (0-100)" id="PMNotiAudioVolume" style="width: 50px; text-align: center; font-size: 15px;" min="0" max="100"> <label for="PMNotiAudioVolume" title="PM Notification Volume. (0-100)">PM Notification Volume</label><br>';
			optionsDiv += '</div></div>'; //PM Settings end

			optionsDiv += 'Smileys Settings <button style="font-size: 15px;" id="smiSettingsButt">Show/Hide</button><br>'; //Smiley Settings start
			optionsDiv += '<div id="smiSettings" style="display: none; height: 120px; padding: 10px; font-size: 15px; background-color: #5c7684;">';
			optionsDiv += '<div style="float: left; text-align: left;">'; //left side
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="KS" title="Enable KAT Smileys"> <label for="KS" title="Enable KAT Smileys">Enable KAT Smileys</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="WS" title="Enable WWT Smileys"> <label for="WS" title="Enable WWT Smileys">Enable WWT Smileys</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="ES" title="Enable Extra Smileys"> <label for="ES" title="Enable Extra Smileys">Enable Extra Smileys</label><br>';
			optionsDiv += '</div><div style="float:right; text-align: left;">'; //right side
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="HS" title="Enable Holiday Smileys"> <label for="HS" title="Enable Holiday Smileys">Enable Holiday Smileys</label><br>';
			optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="NCsmileyRemoveConfirm" title="Enable to ask for confirmation when removing smileys."> <label for="NCsmileyRemoveConfirm" title="Enable to ask for confirmation when removing smileys.">Confirm removal of smileys</label><br>';
            optionsDiv += '<input style="transform: scale(1.3);" type="checkbox" id="usingSmileyHide4Hover" title="Enable to only show the smileys under the shout on hover. (Big performace boost)"> <label for="usingSmileyHide4Hover" title="Enable to only show the smileys under the shout on hover. (Big performace boost)">Only show smileys under shout on hover</label><br>';
			optionsDiv += '<button id="smileysButt" title="Click to edit the default smileys.">Edit Default smileys</button><br>';
			optionsDiv += '</div></div>'; //Smileys Settings end
			optionsDiv += 'Custom Smileys <button style="font-size: 15px;" id="CsmileysButt">Show/Hide</button><br>'; //Custom Smileys start
			optionsDiv += '<div id="Csmileys" style="display: none; padding: 10px; font-size: 15px; background-color: white;">';
			optionsDiv += '<button style="font-size: 15px;" id="newSmile">Make a new smiley</button> <a href="#" id="altNameInstructions">Name instructions(important)</a> <button style="font-size: 15px;" id="newLegacySmile">Legacy</button> <a href="#" id="movingInstructions">Re-order smileys?</a><br><br>';
			for(i = 1; i < (NCsmileysArray.length); i++) {
				optionsDiv += '<span NumInArray="'+ i +'"><div style="display: inline-block;"><i><img src="https://i.imgur.com/oB3LVF5.png" title="Remove this smiley" style="cursor: pointer; position: relative; left: 15px; bottom: 10px;" class="removeSmile" height="15" width="15"></i> '+ NCsmileysArray[i] +'</div></span>&nbsp;'
			}
			optionsDiv += '</div><br>'; //Custom Smileys end
			optionsDiv += '<br><button id="setOptionsR" title="Saves the options and reloads the page to apply them">Save&Apply</button> <button id="setOptions" title="Saves the options, but does NOT reload the page to apply them">Save</button> <button id="cancelOptions">Cancel</button><br>' +
			'<a style="font-size: 15px; cursor: pointer;" onclick="Javascript:alert(\'Hover over the options to see more info about each.\')">HELP</a><br>' +
			'<span style="float: right; padding: 0px 5px; font-size: 15px;"><a style="cursor: pointer;" id="expButt">Export</a> / <a style="cursor: pointer;" id="impButt">Import</a><br><span style="position: relative; bottom: 7px;">Settings</span></span>' +
			'<span style="float: left; position: relative; top: 25px; padding: 0px 5px; font-size: 10px;"><a style="cursor: pointer;" href="https://worldwidetorrents.to/mailbox.php?compose&amp;id=8668">More help? Click to PM NotNeo</a></span>';
			optionsDiv += '</center>';
			optionsDiv += '</div></div>';
			$("body").append(optionsDiv); //appending the options div
			$("#Csmileys > span > div > .cusSmile").css("max-height", "25px");
		}

		if(true) { //load saved settings
			for(i = 0; i < shoutUtiXMsgArray.length; i++) {
				$("#ShUtCustomDiv > span > input.shoutUtiCusMessages").eq(i).val(shoutUtiXMsgArray[i]);
				$("#ShUtCustomDiv > span > input.shoutUtiCusNames").eq(i).val(shoutUtiXMsgNameArray[i]);
			}

			$("#usingHide").prop('checked', usingHide);
			$("#usingVisibleSearch").prop('checked', usingVisibleSearch);
			$("#autoHideNotice").prop('checked', autoHideNotice);
			$("#autoHideSearch").prop('checked', autoHideSearch);
			$("#autoHideShout").prop('checked', autoHideShout);
			$("#autoHideMovies").prop('checked', autoHideMovies);
			$("#autoHideTV").prop('checked', autoHideTV);
			$("#autoHideMusic").prop('checked', autoHideMusic);
			$("#autoHideGames").prop('checked', autoHideGames);
			$("#autoHideApps").prop('checked', autoHideApps);
			$("#autoHideAnime").prop('checked', autoHideAnime);
			$("#autoHideBooks").prop('checked', autoHideBooks);
			$("#autoHideComics").prop('checked', autoHideComics);
			$("#autoHideSports").prop('checked', autoHideSports);
			$("#autoHideDisclaimer").prop('checked', autoHideDisclaimer);
			$("#fullHideNotice").prop('checked', fullHideNotice);
			$("#fullHideSearch").prop('checked', fullHideSearch);
			$("#fullHideShout").prop('checked', fullHideShout);
			$("#fullHideMovies").prop('checked', fullHideMovies);
			$("#fullHideTV").prop('checked', fullHideTV);
			$("#fullHideMusic").prop('checked', fullHideMusic);
			$("#fullHideGames").prop('checked', fullHideGames);
			$("#fullHideApps").prop('checked', fullHideApps);
			$("#fullHideAnime").prop('checked', fullHideAnime);
			$("#fullHideBooks").prop('checked', fullHideBooks);
			$("#fullHideComics").prop('checked', fullHideComics);
			$("#fullHideSports").prop('checked', fullHideSports);
			$("#fullHideDisclaimer").prop('checked', fullHideDisclaimer);
			$("#usingJukebox").prop('checked', usingJukebox);
			$("#stickyJukebox").prop('checked', stickyJukebox);
			$("#jukeboxOff").prop('checked', jukeboxOff);
			$("#UsingAutoplay").prop('checked', !UsingAutoplay);

			$("#emViHeight").val(emViHeight);
			$("#shoutBoxHeight").val(shoutBoxHeight);
			$("#UsingShoutUtil").prop('checked', UsingShoutUtil);
			if(showReqThreads == "yes") {
				$("#showReqThreads").prop('checked', "true");
			} else {
				$("#showReqThreads").prop('checked', "false");
			}
			if(showMsgs == "yes") {
				$("#showMsgs").prop('checked', "true");
			} else {
				$("#showMsgs").prop('checked', "false");
			}
			if(showLinks == "yes") {
				$("#showLinks").prop('checked', "true");
			} else {
				$("#showLinks").prop('checked', "false");
			}
			$("#centerSSMessages").prop('checked', centerSSMessages);
			$("#allTextGetsReplaced").prop('checked', allTextGetsReplaced);
			$("#usingShoutUserInfo").prop('checked', usingShoutUserInfo);
			$("#userInfoFloatNextToName").prop('checked', userInfoFloatNextToName);
			$("#usingShoutHistory").prop('checked', usingShoutHistory);
			$("#usingPMFromShout").prop('checked', usingPMFromShout);
			$("#accInfo").prop('checked', accInfo);
			$("#icoColor").val(icoColor);
			$("#icoColorPicker").val(icoColor);
			$("#msgColor").val(msgColor);
			$("#msgColorPicker").val(msgColor);
			$("#bbColor").val(bbColor);
			$("#bbColorPicker").val(bbColor);
			$("#boldColor").prop('checked', boldColor);
			$("#italicColor").prop('checked', italicColor);
			$("#UseNbbCodeDefaultStyle").prop('checked', UseNbbCodeDefaultStyle);
			$("#alwaysUsingSize").val(alwaysUsingSize);
			if(alwaysUsingFont == "") {
				$("#alwaysUsingFont").val("Disabled");
			} else {
				$("#alwaysUsingFont").val(alwaysUsingFont);
			}
			if(alwaysUsingAlign == "") {
				$("#alwaysUsingAlign").val("Disabled");
			} else {
				$("#alwaysUsingAlign").val(alwaysUsingAlign);
			}
			$("#alwaysItalic").prop('checked', alwaysItalic);
			$("#alwaysBold").prop('checked', alwaysBold);
			$("#alwaysUnderlined").prop('checked', alwaysUnderlined);
			$("#alwaysAutoColor").prop('checked', alwaysAutoColor);
			$("#KS").prop('checked', KS);
			$("#WS").prop('checked', WS);
			$("#ES").prop('checked', ES);
			$("#HS").prop('checked', HS);
			$("#NCsmileyRemoveConfirm").prop('checked', NCsmileyRemoveConfirm);
			$("#usingMentions").prop('checked', usingMentions);
			$("#mentionVolume").val(mentionVolume*100);
			$("#mentionURL").val(mentionURL);
			$("#mentionNicks").val(mentionNicks);
			$("#mentionDesktopN").prop('checked', mentionDesktopN);
			$("#usingPMNoti").prop('checked', usingPMNoti);
			$("#usingPMAudio").prop('checked', usingPMAudio);
			$("#PMNotiAudioVolume").val(PMNotiAudioVolume*100);
			$("#PMNotiAudioURL").val(PMNotiAudioURL);
			$("#jukeboxLimit").val(jukeboxLimit);
			$("#mentionAll").prop('checked', mentionAll);
			$("#updateOnlineUserInterval").val(updateOnlineUserInterval);
			$("#usingOnlineUsers").prop('checked', usingOnlineUsers);
			$("#usingQuoteButtons").prop('checked', usingQuoteButtons);
            $("#PMFromShoutButtSize").val(PMFromShoutIconSize);
            $("#quoteFromShoutIconSize").val(quoteFromShoutIconSize);
            $("#quoteFromShoutPosAfter").prop('checked', quoteFromShoutPosAfter);
            $("#usingSmileyHide4Hover").prop('checked', usingSmileyHide4Hover);
		}

		if(true) { //button listeners

			$("#optionsDiv").find("input").change(function() {
				disOrEnableStuff();
			});

			$("#bbColorPicker").change(function() {
				$("#bbColor").val($(this).val());
			});
			$("#msgColorPicker").change(function() {
				$("#msgColor").val($(this).val());
			});
			$("#icoColorPicker").change(function() {
				$("#icoColor").val($(this).val());
			});

			$("#setOptions").click(function(e){ //when "Save" is pressed the options close and the values are saved
				e.preventDefault();
				saveValues();
				$("#optionsDiv").remove(); //closing options
			});
			$("#setOptionsR").click(function(e){ //when "Save" is pressed the options close, the values are saved and the page reloads
				e.preventDefault();
				saveValues();
				$("#optionsDiv").remove(); //closing options
				location.reload(); //refresh page
			});
			$("#cancelOptions").click(function(e){ //when "cancel" is pressed options close and nothing is saved
				e.preventDefault();
				$("#optionsDiv").remove();
			});
			$("#hideSetButt").click(function(e){
				e.preventDefault();
				$("#hideSetDiv").toggle();
			});
			$("#ShUtSetButt").click(function(e){
				e.preventDefault();
				$("#ShUtSetDiv").toggle();
				$("#ShUtCustomDiv").toggle();
			});
			$("#JukeSetButt").click(function(e){
				e.preventDefault();
				$("#JukeSetDiv").toggle();
			});
			$("#bbSettingsButt").click(function(e){
				e.preventDefault();
				$("#bbSettings").toggle();
			});
			$("#AUSettingsButt").click(function(e){
				e.preventDefault();
				$("#AUSettings").toggle();
			});
			$("#mentionSettingsButt").click(function(e){
				e.preventDefault();
				$("#mentionSettings").toggle();
			});
			$("#PMSettingsButt").click(function(e){
				e.preventDefault();
				$("#PMSettings").toggle();
			});
			$("#smiSettingsButt").click(function(e){
				e.preventDefault();
				$("#smiSettings").toggle();
			});
			$("#CsmileysButt").click(function(e){
				e.preventDefault();
				$("#Csmileys").toggle();
			});
			$("#newShUt").click(function(e){
				e.preventDefault();
				var newShUtMsg = prompt("New message:");
				if(newShUtMsg != null && newShUtMsg != "") {
					var newShUtMsgName = prompt("Menu name:");
					if(newShUtMsgName != null && newShUtMsgName != "") {
						shoutUtiXMsgArray.push(newShUtMsg);
						shoutUtiXMsgNameArray.push(newShUtMsgName);
						$("#ShUtCustomDiv").append('<span NumInArray="'+(shoutUtiXMsgArray.length-1)+'">New Message to be saved:<br>Message: "'+newShUtMsg+'" Menu text: "'+newShUtMsgName+'"</span><br><br>');
					}
				}
			});
			$(".removeShUtMsg").click(function(e){
				e.preventDefault();
				var num2RemoveShUt = $(this).parent().attr("NumInArray");
				shoutUtiXMsgArray.splice(num2RemoveShUt, 1);
				shoutUtiXMsgNameArray.splice(num2RemoveShUt, 1);
				$(this).parent().remove();
				$("#ShUtCustomDiv > span").each(function(i){ //update NumInArray's
					$(this).attr("NumInArray", i);
				});
			});
			$("#smileysButt").click(function(e){
				e.preventDefault();
				if($("#defSmileysDiv").length < 1) { //if not already open
					var defSmiDiv = '<div id="defSmileysDiv" style="position: fixed; left:25%; top: 50px; display: block;"><div class="w3-modal-content w3-card-8" style="padding: 10px; background-color: #7d97a5; width: 700px; max-height: 90vh; max-height: 90vh; overflow-y: auto; font-size: 21px;">';
					defSmiDiv += '<center><div id="defSmileContainer">';
					defSmiDiv += 'KAT Smileys:<br><div id="KSsmileys">';
					defSmiDiv += KSsmileys4use;
					defSmiDiv += '</div>WWT Smileys:<br><div id="WSsmileys">';
					defSmiDiv += WSsmileys4use;
					defSmiDiv += '</div>Extra Smileys:<br><div id="ESsmileys">';
					defSmiDiv += ESsmileys4use;
					defSmiDiv += '</div>Holiday Smileys:<br><div id="HSsmileys">';
					defSmiDiv += HSsmileys4use;
					defSmiDiv += '</div></div><br>';
					defSmiDiv += '<button id="defSmiSave">Save</button> <button id="defSmiCancel">Cancel</button> <button id="restoreSmileys">Restore defaults</button>';
					defSmiDiv += '</center></div></div>';
					$("body").append(defSmiDiv);
					$("#defSmileContainer").find(".cusSmile").attr("style", "max-height: 25px; cursor: url(https://i.imgur.com/s1Rrwb9.png), auto;");
					$("#defSmileContainer").find(".cusSmile").each(function(){
						$(this).attr("title", "DELETE "+$(this).attr("title"));
					});

					$("#defSmileContainer").find(".cusSmile").click(function(){
						$(this).remove();
					});
					$("#defSmiSave").click(function(e){
						e.preventDefault();
						$("#defSmileContainer").find(".cusSmile").each(function(){
							$(this).attr("title", $(this).attr("title").replace("DELETE ", ""));
							$(this).removeAttr("style");
						});

						GM_setValue("KSsmileys4use", ""+$("#KSsmileys").html().replace(/>/g, " />"));
						GM_setValue("WSsmileys4use", ""+$("#WSsmileys").html().replace(/>/g, " />"));
						GM_setValue("ESsmileys4use", ""+$("#ESsmileys").html().replace(/>/g, " />"));
						GM_setValue("HSsmileys4use", ""+$("#HSsmileys").html().replace(/>/g, " />"));
						KSsmileys4use = GM_getValue("KSsmileys4use");
						WSsmileys4use = GM_getValue("WSsmileys4use");
						ESsmileys4use = GM_getValue("ESsmileys4use");
						HSsmileys4use = GM_getValue("HSsmileys4use");
						$("#defSmileysDiv").remove();
					});
					$("#defSmiCancel").click(function(e){
						e.preventDefault();
						$("#defSmileysDiv").remove();
					});
					$("#restoreSmileys").click(function(e){
						e.preventDefault();
						GM_setValue("KSsmileys4use", KSsmileys);
						GM_setValue("WSsmileys4use", WSsmileys);
						GM_setValue("ESsmileys4use", ESsmileys);
						GM_setValue("HSsmileys4use", HSsmileys);
						$("#defSmileysDiv").remove();
						KSsmileys4use = GM_getValue("KSsmileys4use");
						WSsmileys4use = GM_getValue("WSsmileys4use");
						ESsmileys4use = GM_getValue("ESsmileys4use");
						HSsmileys4use = GM_getValue("HSsmileys4use");
						$("#smileysButt").click();
					});
				}
			});

			$("#expButt").click(function(){
				var exportSettDiv = '<div id="exportSettDiv" style="position: fixed; left:20%; top: 50px; display: block;">' +
				'<div class="w3-modal-content w3-card-8" style="padding: 10px; background-color: #7d97a5; width: 50vw; max-height: 90vh; overflow-y: auto; font-size: 45px;">' +
				'<center>Click on the text below to export.' +
				'<textarea rows="35" autofocus style="font-size: 15px; width: 95%;" id="exportSettText"></textarea><br>' +
				'<button id="exportSettClose">Close</button>' +
				'</center></div></div>';
				$("body").append(exportSettDiv);

                var toExport = 'usingVisibleSearch:|:'+usingVisibleSearch+'\nautoHideNotice:|:'+autoHideNotice+'\nautoHideSearch:|:'+autoHideSearch+'\nautoHideShout:|:'+autoHideShout+'\nautoHideMovies:|:'+autoHideMovies+'\nautoHideTV:|:'+
                    autoHideTV+'\nautoHideMusic:|:'+autoHideMusic+'\nautoHideGames:|:'+autoHideGames+'\nautoHideApps:|:'+autoHideApps+'\nautoHideAnime:|:'+autoHideAnime+'\nautoHideBooks:|:'+autoHideBooks+'\nautoHideComics:|:'+
                    autoHideComics+'\nautoHideSports:|:'+autoHideSports+'\nautoHideOthers:|:'+autoHideOthers+'\nautoHideDisclaimer:|:'+autoHideDisclaimer+'\nfullHideNotice:|:'+fullHideNotice+'\nfullHideSearch:|:'+
                    fullHideSearch+'\nfullHideShout:|:'+fullHideShout+'\nfullHideMovies:|:'+fullHideMovies+'\nfullHideTV:|:'+fullHideTV+'\nfullHideMusic:|:'+fullHideMusic+'\nfullHideGames:|:'+fullHideGames+
                    '\nfullHideApps:|:'+fullHideApps+'\nfullHideAnime:|:'+fullHideAnime+'\nfullHideBooks:|:'+fullHideBooks+'\nfullHideComics:|:'+fullHideComics+'\nfullHideSports:|:'+fullHideSports+
                    '\nfullHideOthers:|:'+fullHideOthers+'\nfullHideDisclaimer:|:'+fullHideDisclaimer+'\nusingHide:|:'+usingHide+'\nshoutBoxHeight:|:'+shoutBoxHeight+'\nUsingShoutUtil:|:'+UsingShoutUtil+
                    '\nshowReqThreads:|:'+showReqThreads+'\nshowMsgs:|:'+showMsgs+'\nshowLinks:|:'+showLinks+'\ncenterSSMessages:|:'+centerSSMessages+'\nallTextGetsReplaced:|:'+allTextGetsReplaced+
                    '\nusingShoutUserInfo:|:'+usingShoutUserInfo+'\nuserInfoFloatNextToName:|:'+userInfoFloatNextToName+'\nusingJukebox:|:'+usingJukebox+'\nstickyJukebox:|:'+stickyJukebox+
                    '\nemViHeight:|:'+emViHeight+'\njukeboxOff:|:'+jukeboxOff+'\nUsingAutoplay:|:'+UsingAutoplay+'\nusingShoutHistory:|:'+usingShoutHistory+'\nusingPMFromShout:|:'+usingPMFromShout+
                    '\naccInfo:|:'+accInfo+'\nicoColor:|:'+icoColor+'\nmsgColor:|:'+msgColor+'\nbbColor:|:'+bbColor+'\nboldColor:|:'+boldColor+'\nitalicColor:|:'+italicColor+
                    '\nUseNbbCodeDefaultStyle:|:'+UseNbbCodeDefaultStyle+'\nalwaysUsingSize:|:'+alwaysUsingSize+'\nalwaysUsingFont:|:'+alwaysUsingFont+'\nalwaysUsingAlign:|:'+alwaysUsingAlign+
                    '\nalwaysItalic:|:'+alwaysItalic+'\nalwaysBold:|:'+alwaysBold+'\nalwaysUnderlined:|:'+alwaysUnderlined+'\nalwaysAutoColor:|:'+alwaysAutoColor+'\nKS:|:'+KS+'\nWS:|:'+WS+
                    '\nES:|:'+ES+'\nHS:|:'+HS+'\nNCsmileyRemoveConfirm:|:'+NCsmileyRemoveConfirm+'\nusingMentions:|:'+usingMentions+'\nmentionVolume:|:'+mentionVolume+'\nmentionURL:|:'+mentionURL+
                    '\nmentionNicks:|:'+mentionNicks+'\nmentionDesktopN:|:'+mentionDesktopN+'\nusingPMAudio:|:'+usingPMAudio+'\nusingPMNoti:|:'+usingPMNoti+
                    '\nPMNotiAudioVolume:|:'+PMNotiAudioVolume+'\nPMNotiAudioURL:|:'+PMNotiAudioURL+'\nshoutUtiXMsgArrayString:|:'+shoutUtiXMsgArrayString+'\nshoutUtiXMsgNameArrayString:|:'+shoutUtiXMsgNameArrayString+
                    '\nNCSArrayString:|:'+NCSArrayString+'\nKSsmileys4use:|:'+KSsmileys4use+'\nWSsmileys4use:|:'+WSsmileys4use+'\nESsmileys4use:|:'+ESsmileys4use+'\nHSsmileys4use:|:'+HSsmileys4use+
                    '\njukeboxLimit:|:'+jukeboxLimit+'\nmentionAll:|:'+mentionAll+'\nupdateOnlineUserInterval:|:'+updateOnlineUserInterval+'\nusingOnlineUsers:|:'+usingOnlineUsers+'\nusingQuoteButtons:|:'+usingQuoteButtons+
                    '\nstartHexCol:|:'+startHexCol+'\nendHexCol:|:'+endHexCol+'\nPMFromShoutIconSize:|:'+PMFromShoutIconSize+'\nquoteFromShoutIconSize:|:'+quoteFromShoutIconSize+'\nquoteFromShoutPosAfter:|:'+quoteFromShoutPosAfter+
                    '\nusingSmileyHide4Hover:|:'+usingSmileyHide4Hover;
                $("#exportSettText").val(toExport);
				$("#exportSettText").click(function(){
					$(this).select();
					try {
						document.execCommand('copy');
						alert("Copied to clipboard");
						$("#exportSettClose").click();
					} catch (err) {
						alert("Failed to copy to clipboard! please copy manually.");
					}
				});

				$("#exportSettClose").click(function(){
					$("#exportSettDiv").remove();
				});
			});

			$("#impButt").click(function(){
				var importSettDiv = '<div id="importSettDiv" style="position: fixed; left:20%; top: 50px; display: block;">' +
				'<div class="w3-modal-content w3-card-8" style="padding: 10px; background-color: #7d97a5; width: 50vw; max-height: 90vh; overflow-y: auto; font-size: 30px;">' +
				'<center>Paste settings import text below.' +
				'<textarea rows="35" autofocus style="font-size: 15px; width: 95%;" id="importSettText"></textarea><br>' +
				'<button id="importSettSave">Save&Apply</button> ' +
				'<button id="importSettCancel">Cancel</button>' +
				'</center></div></div>';
				$("body").append(importSettDiv);

				$("#importSettCancel").click(function(){
					$("#importSettDiv").remove();
				});

				$("#importSettSave").click(function(){
					var importedText = $("#importSettText").val();
                    try {
                        GM_setValue("usingVisibleSearch", JSON.parse(importedText.split("usingVisibleSearch:|:")[1].split("\n")[0]));
                        GM_setValue("autoHideNotice", JSON.parse(importedText.split("autoHideNotice:|:")[1].split("\n")[0]));
                        GM_setValue("autoHideSearch", JSON.parse(importedText.split("autoHideSearch:|:")[1].split("\n")[0]));
                        GM_setValue("autoHideShout", JSON.parse(importedText.split("autoHideShout:|:")[1].split("\n")[0]));
                        GM_setValue("autoHideMovies", JSON.parse(importedText.split("autoHideMovies:|:")[1].split("\n")[0]));
                        GM_setValue("autoHideTV", JSON.parse(importedText.split("autoHideTV:|:")[1].split("\n")[0]));
                        GM_setValue("autoHideMusic", JSON.parse(importedText.split("autoHideMusic:|:")[1].split("\n")[0]));
                        GM_setValue("autoHideGames", JSON.parse(importedText.split("autoHideGames:|:")[1].split("\n")[0]));
                        GM_setValue("autoHideApps", JSON.parse(importedText.split("autoHideApps:|:")[1].split("\n")[0]));
                        GM_setValue("autoHideAnime", JSON.parse(importedText.split("autoHideAnime:|:")[1].split("\n")[0]));
                        GM_setValue("autoHideBooks", JSON.parse(importedText.split("autoHideBooks:|:")[1].split("\n")[0]));
                        GM_setValue("autoHideComics", JSON.parse(importedText.split("autoHideComics:|:")[1].split("\n")[0]));
                        GM_setValue("autoHideSports", JSON.parse(importedText.split("autoHideSports:|:")[1].split("\n")[0]));
                        GM_setValue("autoHideOthers", JSON.parse(importedText.split("autoHideOthers:|:")[1].split("\n")[0]));
                        GM_setValue("autoHideDisclaimer", JSON.parse(importedText.split("autoHideDisclaimer:|:")[1].split("\n")[0]));
                        GM_setValue("fullHideNotice", JSON.parse(importedText.split("fullHideNotice:|:")[1].split("\n")[0]));
                        GM_setValue("fullHideSearch", JSON.parse(importedText.split("fullHideSearch:|:")[1].split("\n")[0]));
                        GM_setValue("fullHideShout", JSON.parse(importedText.split("fullHideShout:|:")[1].split("\n")[0]));
                        GM_setValue("fullHideMovies", JSON.parse(importedText.split("fullHideMovies:|:")[1].split("\n")[0]));
                        GM_setValue("fullHideTV", JSON.parse(importedText.split("fullHideTV:|:")[1].split("\n")[0]));
                        GM_setValue("fullHideMusic", JSON.parse(importedText.split("fullHideMusic:|:")[1].split("\n")[0]));
                        GM_setValue("fullHideGames", JSON.parse(importedText.split("fullHideGames:|:")[1].split("\n")[0]));
                        GM_setValue("fullHideApps", JSON.parse(importedText.split("fullHideApps:|:")[1].split("\n")[0]));
                        GM_setValue("fullHideAnime", JSON.parse(importedText.split("fullHideAnime:|:")[1].split("\n")[0]));
                        GM_setValue("fullHideBooks", JSON.parse(importedText.split("fullHideBooks:|:")[1].split("\n")[0]));
                        GM_setValue("fullHideComics", JSON.parse(importedText.split("fullHideComics:|:")[1].split("\n")[0]));
                        GM_setValue("fullHideSports", JSON.parse(importedText.split("fullHideSports:|:")[1].split("\n")[0]));
                        GM_setValue("fullHideOthers", JSON.parse(importedText.split("fullHideOthers:|:")[1].split("\n")[0]));
                        GM_setValue("fullHideDisclaimer", JSON.parse(importedText.split("fullHideDisclaimer:|:")[1].split("\n")[0]));
                        GM_setValue("usingHide", JSON.parse(importedText.split("usingHide:|:")[1].split("\n")[0]));
                        GM_setValue("shoutBoxHeight", importedText.split("shoutBoxHeight:|:")[1].split("\n")[0]);
                        GM_setValue("UsingShoutUtil", JSON.parse(importedText.split("UsingShoutUtil:|:")[1].split("\n")[0]));
                        GM_setValue("showReqThreads", importedText.split("showReqThreads:|:")[1].split("\n")[0]);
                        GM_setValue("showMsgs", importedText.split("showMsgs:|:")[1].split("\n")[0]);
                        GM_setValue("showLinks", importedText.split("showLinks:|:")[1].split("\n")[0]);
                        GM_setValue("centerSSMessages", JSON.parse(importedText.split("centerSSMessages:|:")[1].split("\n")[0]));
                        GM_setValue("allTextGetsReplaced", JSON.parse(importedText.split("allTextGetsReplaced:|:")[1].split("\n")[0]));
                        GM_setValue("usingShoutUserInfo", JSON.parse(importedText.split("usingShoutUserInfo:|:")[1].split("\n")[0]));
                        GM_setValue("userInfoFloatNextToName", JSON.parse(importedText.split("userInfoFloatNextToName:|:")[1].split("\n")[0]));
                        GM_setValue("usingJukebox", JSON.parse(importedText.split("usingJukebox:|:")[1].split("\n")[0]));
                        GM_setValue("stickyJukebox", JSON.parse(importedText.split("stickyJukebox:|:")[1].split("\n")[0]));
                        GM_setValue("emViHeight", importedText.split("emViHeight:|:")[1].split("\n")[0]);
                        GM_setValue("jukeboxOff", JSON.parse(importedText.split("jukeboxOff:|:")[1].split("\n")[0]));
                        GM_setValue("UsingAutoplay", JSON.parse(importedText.split("UsingAutoplay:|:")[1].split("\n")[0]));
                        GM_setValue("usingShoutHistory", JSON.parse(importedText.split("usingShoutHistory:|:")[1].split("\n")[0]));
                        GM_setValue("usingPMFromShout", JSON.parse(importedText.split("usingPMFromShout:|:")[1].split("\n")[0]));
                        GM_setValue("accInfo", JSON.parse(importedText.split("accInfo:|:")[1].split("\n")[0]));
                        GM_setValue("icoColor", importedText.split("icoColor:|:")[1].split("\n")[0]);
                        GM_setValue("msgColor", importedText.split("msgColor:|:")[1].split("\n")[0]);
                        GM_setValue("bbColor", importedText.split("bbColor:|:")[1].split("\n")[0]);
                        GM_setValue("boldColor", JSON.parse(importedText.split("boldColor:|:")[1].split("\n")[0]));
                        GM_setValue("italicColor", JSON.parse(importedText.split("italicColor:|:")[1].split("\n")[0]));
                        GM_setValue("UseNbbCodeDefaultStyle", importedText.split("UseNbbCodeDefaultStyle:|:")[1].split("\n")[0]);
                        GM_setValue("alwaysUsingSize", importedText.split("alwaysUsingSize:|:")[1].split("\n")[0]);
                        GM_setValue("alwaysUsingFont", importedText.split("alwaysUsingFont:|:")[1].split("\n")[0]);
                        GM_setValue("alwaysUsingAlign", importedText.split("alwaysUsingAlign:|:")[1].split("\n")[0]);
                        GM_setValue("alwaysItalic", JSON.parse(importedText.split("alwaysItalic:|:")[1].split("\n")[0]));
                        GM_setValue("alwaysBold", JSON.parse(importedText.split("alwaysBold:|:")[1].split("\n")[0]));
                        GM_setValue("alwaysUnderlined", JSON.parse(importedText.split("alwaysUnderlined:|:")[1].split("\n")[0]));
                        GM_setValue("alwaysAutoColor", JSON.parse(importedText.split("alwaysAutoColor:|:")[1].split("\n")[0]));
                        GM_setValue("KS", JSON.parse(importedText.split("KS:|:")[1].split("\n")[0]));
                        GM_setValue("WS", JSON.parse(importedText.split("WS:|:")[1].split("\n")[0]));
                        GM_setValue("ES", JSON.parse(importedText.split("ES:|:")[1].split("\n")[0]));
                        GM_setValue("HS", JSON.parse(importedText.split("HS:|:")[1].split("\n")[0]));
                        GM_setValue("NCsmileyRemoveConfirm", JSON.parse(importedText.split("NCsmileyRemoveConfirm:|:")[1].split("\n")[0]));
                        GM_setValue("usingMentions", JSON.parse(importedText.split("usingMentions:|:")[1].split("\n")[0]));
                        GM_setValue("mentionVolume", importedText.split("mentionVolume:|:")[1].split("\n")[0]);
                        GM_setValue("mentionURL", importedText.split("mentionURL:|:")[1].split("\n")[0]);
                        GM_setValue("mentionNicks", importedText.split("mentionNicks:|:")[1].split("\n")[0]);
                        GM_setValue("mentionDesktopN", JSON.parse(importedText.split("mentionDesktopN:|:")[1].split("\n")[0]));
                        GM_setValue("usingPMAudio", JSON.parse(importedText.split("usingPMAudio:|:")[1].split("\n")[0]));
                        GM_setValue("usingPMNoti", JSON.parse(importedText.split("usingPMNoti:|:")[1].split("\n")[0]));
                        GM_setValue("PMNotiAudioVolume", importedText.split("PMNotiAudioVolume:|:")[1].split("\n")[0]);
                        GM_setValue("PMNotiAudioURL", importedText.split("PMNotiAudioURL:|:")[1].split("\n")[0]);
                        GM_setValue("shoutUtiXMsgArrayString", importedText.split("shoutUtiXMsgArrayString:|:")[1].split("\n")[0]);
                        GM_setValue("shoutUtiXMsgNameArrayString", importedText.split("shoutUtiXMsgNameArrayString:|:")[1].split("\n")[0]);
                        GM_setValue("NCSArrayString", importedText.split("NCSArrayString:|:")[1].split("\n")[0]);
                        GM_setValue("KSsmileys4use", importedText.split("KSsmileys4use:|:")[1].split("\n")[0]);
                        GM_setValue("WSsmileys4use", importedText.split("WSsmileys4use:|:")[1].split("\n")[0]);
                        GM_setValue("ESsmileys4use", importedText.split("ESsmileys4use:|:")[1].split("\n")[0]);
                        GM_setValue("HSsmileys4use", importedText.split("HSsmileys4use:|:")[1].split("\n")[0]);
                        GM_setValue("jukeboxLimit", importedText.split("jukeboxLimit:|:")[1].split("\n")[0]);
                        GM_setValue("mentionAll", importedText.split("mentionAll:|:")[1].split("\n")[0]);
                        GM_setValue("updateOnlineUserInterval", importedText.split("updateOnlineUserInterval:|:")[1].split("\n")[0]);
                        GM_setValue("usingOnlineUsers", importedText.split("usingOnlineUsers:|:")[1].split("\n")[0]);
                        GM_setValue("usingQuoteButtons", importedText.split("usingQuoteButtons:|:")[1].split("\n")[0]);
                        GM_setValue("startHexCol", importedText.split("startHexCol:|:")[1].split("\n")[0]);
                        GM_setValue("endHexCol", importedText.split("endHexCol:|:")[1].split("\n")[0]);
                        GM_setValue("PMFromShoutIconSize", importedText.split("PMFromShoutIconSize:|:")[1].split("\n")[0]);
                        GM_setValue("quoteFromShoutIconSize", importedText.split("quoteFromShoutIconSize:|:")[1].split("\n")[0]);
                        GM_setValue("quoteFromShoutPosAfter", importedText.split("quoteFromShoutPosAfter:|:")[1].split("\n")[0]);
                        GM_setValue("usingSmileyHide4Hover", importedText.split("usingSmileyHide4Hover:|:")[1].split("\n")[0]);
                    }
                    catch(err) {
                        console.log(err);
                    }
					location.reload(); //refresh page
				});

			});

			$("#newSmile").click(function(e){
				e.preventDefault();
				var newSmileURL = prompt("Give the URL of the smiley:");
				if(newSmileURL !== null && newSmileURL != "") {
					var altTit = prompt("Give the alt name of the smiley:");
					if(altTit !== null && altTit != "") {
						var newSmile2Add = '<img title="'+ altTit +'" class="cusSmile" style="max-height: 25px;" alt="'+ altTit +'" src="'+ newSmileURL +'" />';
						NCsmileysArray.push(newSmile2Add);
						//Add to list
						$(this).parent().append('<span NumInArray="'+ (NCsmileysArray.length - 1) +'"><div style="display: inline-block;"><i><img src="https://i.imgur.com/oB3LVF5.png" title="Remove this smiley" style="cursor: pointer; position: relative; left: 15px; bottom: 10px;" class="removeSmile" height="15" width="15"></i> '+ NCsmileysArray[(NCsmileysArray.length - 1)] +'</div></span>&nbsp;');

						$(".removeSmile").click(function(e){
							e.preventDefault();
							var numInArray2Remove = $(this).parent().parent().parent().attr("NumInArray"); //getting number in array
							NCsmileysArray.splice(numInArray2Remove, 1); //removing from array with number
							$(this).parent().parent().parent().remove(); //removing visual
						});
					}
				}
			});
			$(".removeSmile").click(function(e){
				e.preventDefault();
				if(NCsmileyRemoveConfirm) {
					if (confirm("Are you sure you want to remove :"+$(this).parent().next().attr("alt")+" ???") == true) {
						var numInArray2Remove = $(this).parent().parent().parent().attr("NumInArray"); //getting number in array
						NCsmileysArray.splice(numInArray2Remove, 1); //removing from array with number
						$(this).parent().parent().parent().remove(); //removing visual
					}
				} else {
					var numInArray2Remove = $(this).parent().parent().parent().attr("NumInArray"); //getting number in array
					NCsmileysArray.splice(numInArray2Remove, 1); //removing from array with number
					$(this).parent().parent().parent().remove(); //removing visual
				}
			});
			$("#newLegacySmile").click(function(e){
				e.preventDefault();
				var legacySmileys = prompt("Paste your old smileys here. All at once is fine. In this format:\n\nCsmileys += '    <img title=\"a\" class=\"cusSmile\" alt=\"a\" src=\"https://url.com/imgA.gif\" />';\nCsmileys += '    <img title=\"b\" class=\"cusSmile\" alt=\"b\" src=\"https://url.com/imgB.gif\" />';\nCsmileys += '    <img title=\"c\" class=\"cusSmile\" alt=\"c\" src=\"https://url.com/imgC.gif\" />';");
				if (legacySmileys !== null && legacySmileys != "") {
					var legacyArray = legacySmileys.split(';');
					legacyArray.splice(-1,1); //removing last item (empty)
					for(i = 0; i < legacyArray.length; i++) { //cleaning up the array
						//alert(legacyArray[i]);
						legacyArray[i] = legacyArray[i].split("<")[1];
						legacyArray[i] = "<" + legacyArray[i];
						//alert(legacyArray[i]);
						legacyArray[i] = legacyArray[i].split(">")[0];
						legacyArray[i] = legacyArray[i] + ">";
						//alert(legacyArray[i]);
					}
					NCsmileysArray = NCsmileysArray.concat(legacyArray);
					alert("Smileys added.\nThe smileys will show up in the list after saving and refreshing the page.\n(Save&Apply)");
				}
			});
			$("#altNameInstructions").click(function(e){
				e.preventDefault();
				alert('-Do not use duplicate alt names.\n-If an alt name contains another alt name they must be in order.\n\nLets say you have three smileys called "hello", "helloHat" and "helloHat2". \nYou must have them in that exact order.\nWhy?\nThey get checked in reverse order. Meaning the script will first check for a ":helloHat2" before ":hello".\nIf you had "hello" last, the script would check for ":hello" before ":helloHat2".\nWith that wrong order, if you typed "Hello there :helloHat2 NotNeo!" the script would turn it to "Hello there [img]address/hello.png[/img]Hat2 NotNeo!"\n\nTo avoid all that, you can always just name them so they do not contain eachother. You could use numbers for example.\ni.e. "hello1" "helloHat1" "helloHat2". That way none of them contain eachother.');
			});
			$("#movingInstructions").click(function(e){
				e.preventDefault();
				alert('To re-order smileys, highlight one by clicking on it, then click on another. Those two will swap place. \nMoving a smiley will reverse all unsaved settings, so If you are doing other changes to the options, save those before re-ordering smileys.');
			});
			var numInArray2Replace;
			var numInArray2ReplaceWith;
			$("#Csmileys").find(".cusSmile").click(function() { //-------------------------------use some sort of move button instead?
				if( $(this).attr("selected") == "true" || $(this).attr("selected") == "selected" ) { //If this is already selected, de-select it
					numInArray2Replace = null;
					$(this).removeAttr("selected");
					$(this).attr("style", "max-height: 25px; border-style: none;");
				} else { //if this is not selected...
					if(!numInArray2Replace) { //...and no others are selected, select this one.
						numInArray2Replace = $(this).parent().parent().attr("NumInArray");
						$(this).attr("selected", "true");
						$(this).attr("style", "max-height: 25px; border-style: solid; border-width: 3px; border-color: #348FAB;");
					} else { //...but another one is, replace that one with this
						numInArray2ReplaceWith = $(this).parent().parent().attr("NumInArray");
						//alert("replacing " + numInArray2Replace + " with " + numInArray2ReplaceWith);
						//switcharoo
						var smiMoveTemp = NCsmileysArray[numInArray2Replace];
						NCsmileysArray[numInArray2Replace] = NCsmileysArray[numInArray2ReplaceWith];
						NCsmileysArray[numInArray2ReplaceWith] = smiMoveTemp;

						$("#FPIOptions").click();
						$("#CsmileysButt").click();
					}
				}
			});
			$("#ShUtCustomDiv > span > input").keyup(function(){ //ShUt custom Msg input resizer
				$(this).attr('size', $(this).val().length+5);
			}).change(function(){
				$(this).attr('size', $(this).val().length+5);
			});
		}

		disOrEnableStuff();
		function disOrEnableStuff(){
			if(!($("#usingOnlineUsers").is(':checked'))) {
				$("#updateOnlineUserInterval").prop('disabled', true);
				$("label[for='updateOnlineUserInterval']").attr("style", "color: rgba(0, 0, 0, 0.5);");
			} else {
				$("#updateOnlineUserInterval").prop('disabled', false);
				$("label[for='updateOnlineUserInterval']").removeAttr("style");
			}
			if(!($("#usingHide").is(':checked'))) {
				$("#hideSetDiv").find("input").not("#usingHide").prop('disabled', true);
				$("#hideSetDiv").find("label").not("[for='usingHide']").attr("style", "color: rgba(0, 0, 0, 0.5);");
			} else {
				$("#hideSetDiv").find("input").not("#usingHide").prop('disabled', false);
				$("#hideSetDiv").find("label").not("[for='usingHide']").removeAttr("style");
			}
			//should probably add fullHide/autoHide disabling here
			if(!($("#UsingShoutUtil").is(':checked'))) {
				$("input.shoutUtiChildren").prop('disabled', true);
				$("label.shoutUtiChildren").attr("style", "color: rgba(0, 0, 0, 0.5);");
			} else {
				$("input.shoutUtiChildren").prop('disabled', false);
				$("label.shoutUtiChildren").removeAttr("style");
			}
			if(!($("#usingShoutUserInfo").is(':checked'))) {
				$("#userInfoFloatNextToName").prop('disabled', true);
				$("label[for='userInfoFloatNextToName']").attr("style", "color: rgba(0, 0, 0, 0.5);");
			} else {
				$("#userInfoFloatNextToName").prop('disabled', false);
				$("label[for='userInfoFloatNextToName']").removeAttr("style");
			}
			if(!($("#usingJukebox").is(':checked'))) {
				$("#JukeSetDiv").find("input").not("#usingJukebox").prop('disabled', true);
				$("#JukeSetDiv").find("label").not("[for='usingJukebox']").attr("style", "color: rgba(0, 0, 0, 0.5);");
			} else {
				$("#JukeSetDiv").find("input").not("#usingJukebox").prop('disabled', false);
				$("#JukeSetDiv").find("label").not("[for='usingJukebox']").removeAttr("style");
			}
			if(!($("#usingMentions").is(':checked'))) {
				$("#mentionSettings").find("input").not("#usingMentions").prop('disabled', true);
				$("#mentionSettings").find("label").not("[for='usingMentions']").attr("style", "color: rgba(0, 0, 0, 0.5);");
			} else {
				$("#mentionSettings").find("input").not("#usingMentions").prop('disabled', false);
				$("#mentionSettings").find("label").not("[for='usingMentions']").removeAttr("style");
			}
			if(!($("#usingPMAudio").is(':checked'))) {
				$("#PMNotiAudioVolume").prop('disabled', true);
				$("label[for='PMNotiAudioVolume']").attr("style", "color: rgba(0, 0, 0, 0.5);");
				$("#PMNotiAudioURL").prop('disabled', true);
				$("label[for='PMNotiAudioURL']").attr("style", "color: rgba(0, 0, 0, 0.5);");
			} else {
				$("#PMNotiAudioVolume").prop('disabled', false);
				$("label[for='PMNotiAudioVolume']").removeAttr("style");
				$("#PMNotiAudioURL").prop('disabled', false);
				$("label[for='PMNotiAudioURL']").removeAttr("style");
			}
            if(!($("#usingPMFromShout").is(":checked"))) {
                $("#PMFromShoutButtSize").prop("disabled", true);
                $("label[for='PMFromShoutButtSize']").attr("style", "color: rgba(0, 0, 0, 0.5);");
            } else {
                $("#PMFromShoutButtSize").prop('disabled', false);
				$("label[for='PMFromShoutButtSize']").removeAttr("style");
            }
            if(!($("#usingQuoteButtons").is(":checked"))) {
                $("#quoteFromShoutIconSize").prop("disabled", true);
                $("label[for='quoteFromShoutIconSize']").attr("style", "color: rgba(0, 0, 0, 0.5);");
                $("#quoteFromShoutPosAfter").prop("disabled", true);
                $("label[for='quoteFromShoutPosAfter']").attr("style", "color: rgba(0, 0, 0, 0.5);");
            } else {
                $("#quoteFromShoutIconSize").prop('disabled', false);
				$("label[for='quoteFromShoutIconSize']").removeAttr("style");
                $("#quoteFromShoutPosAfter").prop('disabled', false);
				$("label[for='quoteFromShoutPosAfter']").removeAttr("style");
            }
		}

		function saveValues() {
			GM_setValue("usingVisibleSearch", $("#usingVisibleSearch").is(':checked'));
			GM_setValue("autoHideNotice", $("#autoHideNotice").is(':checked'));
			GM_setValue("autoHideSearch", $("#autoHideSearch").is(':checked'));
			GM_setValue("autoHideShout", $("#autoHideShout").is(':checked'));
			GM_setValue("autoHideMovies", $("#autoHideMovies").is(':checked'));
			GM_setValue("autoHideTV", $("#autoHideTV").is(':checked'));
			GM_setValue("autoHideMusic", $("#autoHideMusic").is(':checked'));
			GM_setValue("autoHideGames", $("#autoHideGames").is(':checked'));
			GM_setValue("autoHideApps", $("#autoHideApps").is(':checked'));
			GM_setValue("autoHideAnime", $("#autoHideAnime").is(':checked'));
			GM_setValue("autoHideBooks", $("#autoHideBooks").is(':checked'));
			GM_setValue("autoHideComics", $("#autoHideComics").is(':checked'));
			GM_setValue("autoHideSports", $("#autoHideSports").is(':checked'));
			GM_setValue("autoHideDisclaimer", $("#autoHideDisclaimer").is(':checked'));
			GM_setValue("fullHideNotice", $("#fullHideNotice").is(':checked'));
			GM_setValue("fullHideSearch", $("#fullHideSearch").is(':checked'));
			GM_setValue("fullHideShout", $("#fullHideShout").is(':checked'));
			GM_setValue("fullHideMovies", $("#fullHideMovies").is(':checked'));
			GM_setValue("fullHideTV", $("#fullHideTV").is(':checked'));
			GM_setValue("fullHideMusic", $("#fullHideMusic").is(':checked'));
			GM_setValue("fullHideGames", $("#fullHideGames").is(':checked'));
			GM_setValue("fullHideApps", $("#fullHideApps").is(':checked'));
			GM_setValue("fullHideAnime", $("#fullHideAnime").is(':checked'));
			GM_setValue("fullHideBooks", $("#fullHideBooks").is(':checked'));
			GM_setValue("fullHideComics", $("#fullHideComics").is(':checked'));
			GM_setValue("fullHideSports", $("#fullHideSports").is(':checked'));
			GM_setValue("fullHideDisclaimer", $("#fullHideDisclaimer").is(':checked'));
			GM_setValue("usingHide", $("#usingHide").is(':checked'));
			if ($("#shoutBoxHeight").val() > 199) {
				GM_setValue("shoutBoxHeight", $("#shoutBoxHeight").val());
			}
			GM_setValue("UsingShoutUtil", $("#UsingShoutUtil").is(':checked'));
			GM_setValue("centerSSMessages", $("#centerSSMessages").is(':checked'));
			GM_setValue("allTextGetsReplaced", $("#allTextGetsReplaced").is(':checked'));
			if($("#showReqThreads").is(':checked')) {
				GM_setValue("showReqThreads", "yes");
			} else {
				GM_setValue("showReqThreads", "no");
			}
			if($("#showMsgs").is(':checked')) {
				GM_setValue("showMsgs", "yes");
			} else {
				GM_setValue("showMsgs", "no");
			}
			if($("#showLinks").is(':checked')) {
				GM_setValue("showLinks", "yes");
			} else {
				GM_setValue("showLinks", "no");
			}
			GM_setValue("usingShoutUserInfo", $("#usingShoutUserInfo").is(':checked'));
			GM_setValue("userInfoFloatNextToName", $("#userInfoFloatNextToName").is(':checked'));
			GM_setValue("usingJukebox", $("#usingJukebox").is(':checked'));
			GM_setValue("stickyJukebox", $("#stickyJukebox").is(':checked'));
			GM_setValue("jukeboxOff", $("#jukeboxOff").is(':checked'));
			GM_setValue("UsingAutoplay", !($("#UsingAutoplay").is(':checked')));
			if(/^[0-9]+$/.test($("#emViHeight").val())) { //If it's a number
				if($("#emViHeight").val() > 500) { //anything above 500 = 500
					$("#emViHeight").val("500");
				} else if($("#emViHeight").val() < 50) { //anything below 50 = 50 -----------------------------------is this good?
					$("#emViHeight").val("50");
				}
				GM_setValue("emViHeight", $("#emViHeight").val());
			}
			GM_setValue("usingShoutHistory", $("#usingShoutHistory").is(':checked'));
			GM_setValue("usingPMFromShout", $("#usingPMFromShout").is(':checked'));
            GM_setValue("quoteFromShoutPosAfter", $("#quoteFromShoutPosAfter").is(':checked'));
			GM_setValue("accInfo", $("#accInfo").is(':checked'));
			if(/[0-9A-F]{6}/i.test($("#icoColor").val()) && $("#icoColor").val().length <= 7) {
				if( $("#icoColor").val().substring(0,1) == "#" ) { //if starts with #, remove it
					$("#icoColor").val($("#icoColor").val().substring(1));
				}
				if($("#icoColor").val().length == 6) { //if length == 6 without #, then add # and save
					$("#icoColor").val("#" + $("#icoColor").val());
					GM_setValue("icoColor", $("#icoColor").val());
				}
			}
			if(/[0-9A-F]{6}/i.test($("#msgColor").val()) && $("#msgColor").val().length <= 7) {
				if( $("#msgColor").val().substring(0,1) == "#" ) { //if starts with #, remove it
					$("#msgColor").val($("#msgColor").val().substring(1));
				}
				if($("#msgColor").val().length == 6) { //if length == 6 without #, then add # and save
					$("#msgColor").val("#" + $("#msgColor").val());
					GM_setValue("msgColor", $("#msgColor").val());
				}
			}
			if(/[0-9A-F]{6}/i.test($("#bbColor").val()) && $("#bbColor").val().length <= 7) {
				if( $("#bbColor").val().substring(0,1) == "#" ) { //if starts with #, remove it
					$("#bbColor").val($("#bbColor").val().substring(1));
				}
				if($("#bbColor").val().length == 6) { //if length == 6 without #, then add # and save
					$("#bbColor").val("#" + $("#bbColor").val());
					GM_setValue("bbColor", $("#bbColor").val());
				}
			}
			GM_setValue("boldColor", $("#boldColor").is(':checked'));
			GM_setValue("italicColor", $("#italicColor").is(':checked'));
			GM_setValue("UseNbbCodeDefaultStyle", $("#UseNbbCodeDefaultStyle").is(':checked'));
			if($("#alwaysUsingSize").val() == 0) {
				$("#alwaysUsingSize").val("");
			}
			GM_setValue("alwaysUsingSize", $("#alwaysUsingSize").val());
			if ($("#alwaysUsingFont").val() == "Disabled") {
				GM_setValue("alwaysUsingFont", "");
			} else {
				GM_setValue("alwaysUsingFont", $("#alwaysUsingFont").val());
			}
			if ($("#alwaysUsingAlign").val() == "Disabled") {
				GM_setValue("alwaysUsingAlign", "");
			} else {
				GM_setValue("alwaysUsingAlign", $("#alwaysUsingAlign").val());
			}
            if ($("#PMFromShoutButtSize").val() > 0 && $("#PMFromShoutButtSize").val() < 36) {
                PMFromShoutIconSize = $("#PMFromShoutButtSize").val();
				GM_setValue("PMFromShoutIconSize", PMFromShoutIconSize);
			}
            if ($("#quoteFromShoutIconSize").val() > 0 && $("#quoteFromShoutIconSize").val() < 36) {
                quoteFromShoutIconSize = $("#quoteFromShoutIconSize").val();
				GM_setValue("quoteFromShoutIconSize", quoteFromShoutIconSize);
			}
			GM_setValue("alwaysItalic", $("#alwaysItalic").is(':checked'));
			GM_setValue("alwaysBold", $("#alwaysBold").is(':checked'));
			GM_setValue("alwaysUnderlined", $("#alwaysUnderlined").is(':checked'));
			GM_setValue("alwaysAutoColor", $("#alwaysAutoColor").is(':checked'));
			GM_setValue("KS", $("#KS").is(':checked'));
			GM_setValue("WS", $("#WS").is(':checked'));
			GM_setValue("ES", $("#ES").is(':checked'));
			GM_setValue("HS", $("#HS").is(':checked'));
			GM_setValue("NCsmileyRemoveConfirm", $("#NCsmileyRemoveConfirm").is(':checked'));
			GM_setValue("usingMentions", $("#usingMentions").is(':checked'));
			GM_setValue("mentionURL", $("#mentionURL").val());
			GM_setValue("mentionNicks", $("#mentionNicks").val());
			GM_setValue("mentionDesktopN", $("#mentionDesktopN").is(':checked'));
			if ($("#mentionVolume").val() > 0 && $("#mentionVolume").val() < 101) {
				mentionVolume = $("#mentionVolume").val() / 100; //from 1-100 to 0.01-1
				GM_setValue("mentionVolume", mentionVolume);
			} else if($("#mentionVolume").val() == 0){
				GM_setValue("mentionVolume", $("#mentionVolume").val());
			}
			GM_setValue("usingPMNoti", $("#usingPMNoti").is(':checked'));
			GM_setValue("usingPMAudio", $("#usingPMAudio").is(':checked'));
			if ($("#PMNotiAudioVolume").val() > 0 && $("#PMNotiAudioVolume").val() < 101) {
				PMNotiAudioVolume = $("#PMNotiAudioVolume").val() / 100; //from 1-100 to 0.01-1
				GM_setValue("PMNotiAudioVolume", PMNotiAudioVolume);
			} else if($("#PMNotiAudioVolume").val() == 0){
				GM_setValue("PMNotiAudioVolume", $("#PMNotiAudioVolume").val());
			}
			GM_setValue("PMNotiAudioURL", $("#PMNotiAudioURL").val());
			GM_setValue("jukeboxLimit", $("#jukeboxLimit").val());
			GM_setValue("mentionAll", $("#mentionAll").is(':checked'));
			if ($("#updateOnlineUserInterval").val() > 19 && $("#updateOnlineUserInterval").val() < 1000) {
				updateOnlineUserInterval = $("#updateOnlineUserInterval").val();
				GM_setValue("updateOnlineUserInterval", updateOnlineUserInterval);
			}
			GM_setValue("usingOnlineUsers", $("#usingOnlineUsers").is(':checked'));
			GM_setValue("usingQuoteButtons", $("#usingQuoteButtons").is(':checked'));
            GM_setValue("usingSmileyHide4Hover", $("#usingSmileyHide4Hover").is(':checked'));

			$(".shoutUtiCusMessages").each(function(){
				shoutUtiXMsgArray[$(this).parent().attr("NumInArray")] = $(this).val();
			});
			$(".shoutUtiCusNames").each(function(){
				shoutUtiXMsgNameArray[$(this).parent().attr("NumInArray")] = $(this).val();
			});

			var NCSArrayString = JSON.stringify(NCsmileysArray); //turn array into a single string
			GM_setValue("NCSArrayString", NCSArrayString); //save that string to local storage

			var shoutUtiXMsgArrayString = JSON.stringify(shoutUtiXMsgArray); //turn array into a single string
			GM_setValue("shoutUtiXMsgArrayString", shoutUtiXMsgArrayString); //save that string to local storage

			var shoutUtiXMsgNameArrayString = JSON.stringify(shoutUtiXMsgNameArray); //turn array into a single string
			GM_setValue("shoutUtiXMsgNameArrayString", shoutUtiXMsgNameArrayString); //save that string to local storage
		}
	})
}

if(usingOnlineUsers) {
	$("ul.w3-navbar > .w3-right > a[title='My Account']").parent().after('<li class="w3-right w3-theme-l1 w3-round-large" style="font-size: 17px; padding: 5px 10px; position: relative; top: 5px; right: 5px;" id="onlineUserSpan"><span>Online Users: #</span></li>');
    updateOnlineUsers();
    setInterval(updateOnlineUsers, updateOnlineUserInterval*1000);
}
//if(usingForumReload) {setInterval(reloadLatestForum, forumReloadInterval);}

//PM From Shout and Jukebox//-------------------------------------
//----------------------------------------------------
//----------------------------------------------------
if(usingJukebox || usingPMFromShout) {
    if(!isChrome) {
        OnShoutFrameLoad(true); //calling manually since shout load doesn't fire for the load of the full page? Only on Firefox?
    }
	$('#shout_frame').on("load", function() {
		if(forcedLoad) { OnShoutFrameLoad(true); } else { OnShoutFrameLoad(false); } //if load has been forced (by turning jukebox on) the function is called with firstLoad
	});
}
function OnShoutFrameLoad(firstLoad) {
	$("#marqueecontainer").stop("fx", true, false);
	if(scrollDirection == 2300) {
		var howFast2Scroll = (2300 - $("#marqueecontainer").scrollTop())*52;
	} else {
		var howFast2Scroll = $("#marqueecontainer").scrollTop()*52;
	}
	$("#marqueecontainer").animate({scrollTop: scrollDirection}, howFast2Scroll, "swing", function() {
		if(scrollDirection == 0) { //if up...
			scrollDirection = 2300; //change to down
		} else { //if down...
			scrollDirection = 0; //change to up
		}
		$("#marqueecontainer").animate({scrollTop: scrollDirection}, 120000, "swing", function(){
			if(scrollDirection == 0) { //if up...
				scrollDirection = 2300; //change to down
			} else { //if down...
				scrollDirection = 0; //change to up
			}
			$("#marqueecontainer").animate({scrollTop: scrollDirection}, 120000);
		});
	});

	if(firstLoad) {
		autoplayOn = false;
	} //Preventing autoplay for the first load so as not to autoplay the potentially many videos added to the jukebox at once
	jQuery.fn.reverse = [].reverse; //setting up the reverse plugin
	if(usingMentions){
		if(/[^\s]/g.test(mentionNicks)){ //if mentionNicks contains anything that's not whitespace
			var nicksInUse = mentionNicks.split(","); //putting the nicks into an array
			for(i=0; i < nicksInUse.length; i++){
				nicksInUse[i].replace(" ", ""); //removing possible leading spaces from nicks
			}
			if(mentionAll){
				nicksInUse.push("all");
				nicksInUse.push("everyone");
			}
		}
		var theUser = $("#main > center > table > tbody > tr > td:eq(1)").children("div:first").children("center:first").children("h3").text();
		theUserRegx = new RegExp("@" + theUser, 'i');
	}

	$('#shout_frame').contents().find('tr').reverse().each(function(i) {
		var tdHTML = $(this).html();
		var tdText = $(this).children("td:first").text() + "\n" + $(this).children("td:eq(1)").text();
		if(usingMentions) {
			if( $(this).find("td:last").find("a:first").text() != theUser+":") { //mentions only checked for comments not made by you.
				if(/[^\s]/g.test(mentionNicks)){
					var nicksFound = false;
					for(i=0; i < nicksInUse.length; i++){
						nickRegx = new RegExp("@" + nicksInUse[i], 'i');
						if(nickRegx.test(tdHTML)) {
							nicksFound = true;
						}
					}
				}
				if(theUserRegx.test(tdHTML) || nicksFound){ //If comment contains mention of you (case insensitive)
					if(isItOldNoti(tdHTML) != true){
						notificationArray.push(tdHTML);
						//remove last item in array if it's over 20 large
						if(notificationArray.length > 20){
							notificationArray.splice(0, 1);
						}
						notificationArrayString = JSON.stringify(notificationArray); //turn array into a single string
						GM_setValue("notificationArrayString", notificationArrayString); //save that string to local storage
						auPlayer.play();
						if(mentionDesktopN){
							if(Notification.permission === 'granted') {
								n = new Notification( "New mention", {
									body: tdText,
									icon : "star.ico"
								});
							} else if(Notification.permission === 'denied') {
								Notification.requestPermission();
							} else {
								alert("There's something wrong with the desktop notifications. \nMaybe your browser doesn't support it?");
							}
						}
					}
				}
			}
		}
		function isItOldNoti(currentTD) {
			for(x = 0; x < notificationArray.length; x++){ //If comment is found in an array of things already notified
				if(currentTD == notificationArray[x]){
					var toReturn = true;
				}
			}
			if(toReturn == true) {
			    return true;
			} else {
				return false;
			}
		}

        $(this).find('td:eq(1) a[data-userid]').on("dragstart", function(e) {
            e.originalEvent.dataTransfer.setData("Text", "@" + $(this).text().substr(0, $(this).text().length - 1));
        });

        if(usingPMFromShout) {
            // Get user ID
            var id = $(this).find('td:eq(1) a').data('userid');
            // Use for glyphicon Icon
            $(this).find('td:eq(1) a b').before('<a href="/mailbox.php?compose&amp;id='+id+'" target="blank"><span style="color:#C0C0C0; padding-right: 1px; font-size: '+PMFromShoutIconSize+'px;" title="PM User" class="pmFromShout glyphicon glyphicon-envelope"></span></a>');
            // Use for large PM Icon
            //$(this).find('td:eq(1) a b').before('<a href="/mailbox.php?compose&amp;id='+id+'" target="blank"><img src="/images/button_pm.gif" border="0" /></a>');
        }
		if(usingQuoteButtons){
            if (quoteFromShoutPosAfter) {
                $(this).find('td:eq(1)').append('<a class="inShoutQuote" title="Quote"><img style="cursor: pointer;" src="https://i.imgur.com/FcI2Cak.png" height="'+quoteFromShoutIconSize+'px"></a>');
            } else {
                $(this).find(".pmFromShout").parent().parent().before(' <a class="inShoutQuote" title="Quote" style="margin-right: -4px;"><img style="cursor: pointer;" src="https://i.imgur.com/FcI2Cak.png" height="'+quoteFromShoutIconSize+'px"></a> ');
            }
		}
		if(usingJukebox) {
			if(!jukeboxOff) {
				var justLinksArray = tdHTML.match(/(href|src)="(https:\/\/|http:\/\/)(m\.|www\.)?youtu(\.be|be\.com)\/(watch\?v=)?(.*)" (target="_blank"|frameborder="0")/g); //find all youtube links
				if(!!justLinksArray) {
					for(i=0;justLinksArray.length > i;i++) {
						var foundYoutubeLink = justLinksArray[i].substring(6, justLinksArray[i].length - 17);
						foundYoutubeLink = foundYoutubeLink.split("&")[0]; //cleaning out youtube url arguments
						if(foundYoutubeLink.indexOf("youtu.be") > 0) { foundYoutubeLink = foundYoutubeLink.split("?")[0]; } //cleaning out youtube url arguments
						var videoCode = foundYoutubeLink.substring(foundYoutubeLink.length - 11, foundYoutubeLink.length); //taking just the video code from the url
						addToJukeBox(videoCode);
					}
				}
			}
		}
	});
	//Shoutbox user Info//----------------------------------
	//------------------------------------------------------
	//------------------------------------------------------
	if(usingShoutUserInfo) {
		'use strict';
		var user_id = '';
		var info = null;
		$('body').append('<div class="info_popup" style="display: none; float: right; position: absolute; border-radius: 5px 0px 0px 0px; bottom: 0px; width: 225px; height: 200px; background: black; color: white; padding: 5px;">' +
                         '<div><b class="username" style="color: aqua;"></b><img class="avatar" src="" height="50px" style="float: right;"/></div><div><ul><li class="reputation"></li><li class="torrents"></li><li class="forumposts"></li><li class="comments"><li class="joindate"></li><li class="class"></li><li class="extra"></li></ul></div></div>');
		$('#shout_frame').contents().find('a[data-userid]').hover(function(e) {
            user_id = $(this).data('userid');
            $.ajax({
                type: "GET",
                url: "/api/user/?id="+user_id,
                async: false,
                success: function (data) {
                    info = data;
                },
                returnData: "json"
            });
            //alert(JSON.stringify(info));
            $('.info_popup div .username').text(info.username);
            $('.info_popup div .avatar').attr('src', info.avatar);
            $('.info_popup div .username').text(info.username);
            $('.info_popup div .reputation').text('Rep: ' + info.reputation);
            $('.info_popup div .joindate').text('Joined: ' + info.added);
            $('.info_popup div .torrents').text('Torrents: ' + info.torrents);
            $('.info_popup div .forumposts').text('Forum Posts: ' + info.forum_posts);
            $('.info_popup div .comments').text('Comments: ' + info.comments);
            $('.info_popup div .class').text('Class: ' + info.class);
            if(info.username == "Deep61") {
                $('.info_popup div .extra').text('#1 FPI beta tester :)');
                $('.info_popup div .username').text('Deep "great idea" 61');
            } else if (info.username == "NotNeo") {
                $('.info_popup div .extra').text('Maker of FPI');
            } else {
                $('.info_popup div .extra').text('');
            }
            //$('.info_popup div .uitest').text('Age: ' + );
            if(userInfoFloatNextToName) {  //New option added by NotNeo --------
                var userInfoPosY = e.pageY+130;
                if(userInfoPosY > shoutBoxHeight-30) {
                    userInfoPosY = shoutBoxHeight-30;
                }
                if(userInfoPosY < 140) {
                    userInfoPosY = 140;
                }
                $('.info_popup').css("left", e.pageX+60);
                $('.info_popup').css("top", userInfoPosY);
            } else {
                $('.info_popup').css("left", "60%");
                $('.info_popup').css("top", "40%");
            } // ---------------------------------------------------------------
            $('.info_popup').show();
		}, function() {
			$('.info_popup').hide();
		});
	}
	//------------------------------------------------------
	//------------------------------------------------------

	/*

	<td style="font-size: 16px; padding-left: 5px"><a href="https://worldwidetorrents.to/account-details.php?id=8668" data-userid="8668" target="_parent"><a href="/mailbox.php?compose&amp;id=8668" target="blank"><span style="color:#C0C0C0;" title="PM User" class="glyphicon glyphicon-envelope"></span></a><b><font color="#5876b4">NotNeo</font>:</b></a>&nbsp;&nbsp;

	<font color="#007A28"><i><b><br><img src="images/plus.gif" id="pic76100" title="Spoiler" onclick="klappe_torrent(&quot;76100&quot;)" alt=""><b>testing spoiler</b><div id="k76100" style="display: none;">for quotes<br></div></b></i></font><a class="inShoutQuote" title="Quote"><img style="cursor: pointer;" src="https://i.imgur.com/FcI2Cak.png" height="15px"></a></td>

	*/

	if(usingQuoteButtons){
		$('#shout_frame').contents().find('.inShoutQuote').click(function(e){
			e.preventDefault();
			var inShoutQName = $(this).parent().text().split(":")[0];
			var inShoutQText = $(this).parent().html().split("</b></a>&nbsp;&nbsp;")[1].split('<a class="inShoutQuote"')[0];
			while(inShoutQText.indexOf("&nbsp;") > -1){
				inShoutQText = inShoutQText.replace("&nbsp;", " ");
			}
			/*if( inShoutQText.search(/<img.+?title="Spoiler".+?>/g) > -1 ) { //if there are spoilers
				var qFoundSpoilers = inShoutQText.match(/<img.+?title="Spoiler".+?><b>.+?<\/b><div.+?<\/div>/g);
				for(i=0; i < qFoundSpoilers.length; i++){ //...and tag them...
                    var qSpoilerVisible = qFoundSpoilers[i].split("<b>")[1].split("</b>")[0];
					var qSpoilerInner = qFoundSpoilers[i].split("<div")[1].split(">")[1].split("</div>")[0]; //something wrong here
					alert(qSpoilerInner);
					inShoutQText = inShoutQText.replace(qFoundSpoilers[i], "[spoiler="+qSpoilerVisible+"]"+qSpoilerInner+"[/spoiler]");
				}
			}*/
			if( inShoutQText.search(/<img src=".+?"/g) > -1 ) { //if there are images...
				var qFoundImages = inShoutQText.match(/<img.+?src=".+?".+?>/g); //...find them...
				for(i=0; i < qFoundImages.length; i++){ //...and tag them...
                    var innerImage = /src=".+?"/.exec(qFoundImages[i]);
					inShoutQText = inShoutQText.replace(qFoundImages[i], "[img]"+qFoundImages[i].substring(innerImage.index+5, (innerImage.index + innerImage[0].length - 1))+"[/img]");
				}
			}
			if( inShoutQText.search(/<a href=".+?"/g) > -1 ) { //if there are links...
				var qFoundLinks = inShoutQText.match(/<a href=".+?".*?<\/a>/g); //...find them...
				for(i=0; i < qFoundLinks.length; i++){ //...and tag them...
					var qCLinkText = qFoundLinks[i].match(/target="_blank">.*?<\/a>/g); //gets the visual text for the link
					qCLinkText = qCLinkText[0].substring(16, qCLinkText[0].length - 4); //gets the visual text for the link
					var qCLink = qFoundLinks[i].match(/href=".+?"/g); //gets the link
					qCLink = qCLink[0].substring(6, qCLink[0].length - 1); //gets the link
					inShoutQText = inShoutQText.replace(qFoundLinks[i], "[url="+qCLink+"]"+qCLinkText+"[/url]");
				}
			}
			if( inShoutQText.search(/<p class="sub">.+<\/table>/g) > -1 ) { //if there are quotes
				var qFoundQuotes = inShoutQText.match(/<p class="sub">.+<\/table>/g); //...find them...
				//alert(qFoundQuotes.length);
				for(i=0; i < qFoundQuotes.length; i++) { //...and tag them...
					var qQuoter = qFoundQuotes[i].split(" wrote:")[0].replace('<p class="sub">', ''); //get the quoter name
					qQuoter = qQuoter.replace('<b>', ''); //get the quoter name

					var qQuote = qFoundQuotes[i].split(/<td style="border: 1px black dotted;.+?>/g)[1]; //get the quote
					qQuote = qQuote.substring(0, qQuote.lastIndexOf("</td>")); // get the quote
					inShoutQText = inShoutQText.replace(qFoundQuotes[i], "[quote="+qQuoter+"]"+qQuote+"[/quote]");
				}
			}
			if( inShoutQText.search(/<font.+?>/g) > -1 ) { //if there are fonts
				var qFoundFonts = inShoutQText.match(/<font.+?>/g); //...find them...
				for(i=0; i < qFoundFonts.length; i++) { //...and tag them...

					if(qFoundFonts[i].split(" ")[1].split("=")[0] == "size") { //if it's a size tag
						var qSize = qFoundFonts[i].split('"')[1].split('"')[0];
						inShoutQText = inShoutQText.replace(qFoundFonts[i], "[size="+qSize+"]");
						var lastClosingFontIndex = inShoutQText.lastIndexOf("</font>");
						inShoutQText = inShoutQText.substring(0, lastClosingFontIndex) + "[/size]" + inShoutQText.substring(lastClosingFontIndex+7);
					}
					else if(qFoundFonts[i].split(" ")[1].split("=")[0] == "face") { //if it's a font/face tag
						var qFace = qFoundFonts[i].split('"')[1].split('"')[0];
						inShoutQText = inShoutQText.replace(qFoundFonts[i], "[font="+qFace+"]");
						var lastClosingFontIndex = inShoutQText.lastIndexOf("</font>");
						inShoutQText = inShoutQText.substring(0, lastClosingFontIndex) + "[/font]" + inShoutQText.substring(lastClosingFontIndex+7);
					}
					else if(qFoundFonts[i].split(" ")[1].split("=")[0] == "color") { //if it's a color tag
						var qColor = qFoundFonts[i].split('"')[1].split('"')[0];
						inShoutQText = inShoutQText.replace(qFoundFonts[i], "[color="+qColor+"]");
						var lastClosingFontIndex = inShoutQText.lastIndexOf("</font>");
						inShoutQText = inShoutQText.substring(0, lastClosingFontIndex) + "[/color]" + inShoutQText.substring(lastClosingFontIndex+7);
					}
				}
			}
			/*
			while( inShoutQText.search(/<font color=".*?">/g) > -1 ) {
				inShoutQText = inShoutQText.replace(/<font color=".*?">/g, ""); //remove font colors
			}
			while( inShoutQText.search(/<font size=".*?">/g) > -1 ) {
				inShoutQText = inShoutQText.replace(/<font size=".*?">/g, ""); //remove font sizes
			}
			while( inShoutQText.search(/<font face=".*?">/g) > -1 ) {
				inShoutQText = inShoutQText.replace(/<font face=".*?">/g, ""); //remove font faces
			}
			while( inShoutQText.search(/<\/font>/g) > -1 ) {
				inShoutQText = inShoutQText.replace(/<\/font>/g, ""); //remove font closing tags
			}
			*/
			while( inShoutQText.search(/<b>/g) > -1 ) {
				inShoutQText = inShoutQText.replace(/<b>/g, "[b]"); //replace <b> with [b]
			}
			while( inShoutQText.search(/<\/b>/g) > -1 ) {
				inShoutQText = inShoutQText.replace(/<\/b>/g, "[/b]"); //replace </b> with [/b]
			}
			while( inShoutQText.search(/<i>/g) > -1 ) {
				inShoutQText = inShoutQText.replace(/<i>/g, "[i]"); //replace <i> with [i]
			}
			while( inShoutQText.search(/<\/i>/g) > -1 ) {
				inShoutQText = inShoutQText.replace(/<\/i>/g, "[/i]"); //replace </i> with [/i]
			}
			while( inShoutQText.search(/<u>/g) > -1 ) {
				inShoutQText = inShoutQText.replace(/<u>/g, "[u]"); //replace <u> with [u]
			}
			while( inShoutQText.search(/<\/u>/g) > -1 ) {
				inShoutQText = inShoutQText.replace(/<\/u>/g, "[/u]"); //replace </u> with [/u]
			}
			while( inShoutQText.search(/<s>/g) > -1 ) {
				inShoutQText = inShoutQText.replace(/<s>/g, "[s]"); //replace <s> with [s]
			}
			while( inShoutQText.search(/<\/s>/g) > -1 ) {
				inShoutQText = inShoutQText.replace(/<\/s>/g, "[/s]"); //replace </s> with [/s]
			}
			while( inShoutQText.search(/<br>/g) > -1 ) {
				inShoutQText = inShoutQText.replace(/<br>/g, ""); //remove <br>
			}

			shoutMsg.insertAtCaret('[quote='+inShoutQName+']'+inShoutQText+'[/quote]');
		});
	}

	if(UsingAutoplay) {autoplayOn = true;} //if using autoplay it gets turned on (it was off for the first load)
	forcedLoad = false; //if the function was called because of a forced load the indicator resets to false at the end
}
//----------------------------------------------------
//----------------------------------------------------

//Shoutbox Utilities code//----------------------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------
if(UsingShoutUtil) {
	if(centerSSMessages) {
			var centerMes1 = "[align=center]";
			var centerMes2 = "[/align]";
	} else {
			var centerMes1 = "";
			var centerMes2 = "";
	}

	if(usingCustomAltToImage || alwaysAutoColor) { //directing to fake message box (for intercepting enter on chrome)
		var shoutInput = $("#fakeShout");
	} else {
		var shoutInput = $('.shoutbox_messageboxback');
	} //changed colspan in the below line to 3 from 2 to make the box full size. Also wrapped in <tr> (NotNeo)
	var sUtilities = '<tr><td id="shoutUtilBox" colspan="3" style="text-align:center;"><h3 class="w3-card-4 w3-allerta w3-theme-l1 w3-round-large"><center>Shoutbox Utilities</center></h3></td></tr>';
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
	for(i=0;i<shoutUtiXMsgNameArray.length;i++){
		MsgOpt += '<option value="'+i+'">'+shoutUtiXMsgNameArray[i]+'</option>';
	}
	//--------------------------------------------------------------------------------------------------------------
	/* Add new message options below: */
	/* Format: MsgOpt += '<option value="value_here">name_here</option>'; */
	var msgAddButt = '<button class="w3-btn w3-teal" type="button" id="msg-butt">Add</button>';

	var LinkDrop = '&nbsp;&nbsp;&nbsp;&nbsp;Other Links: <select id="link-dropdown"></select>';
	var LinkOpt = '<option value="def">Select</option>'; //Default
	LinkOpt += '<option value="idea">Idea Box</option>'; //Default
	LinkOpt += '<option value="prob">Site Problems</option>'; //Default
	var linkAddButt = '<button class="w3-btn w3-teal" type="button" id="link-butt">Add</button>';


	$('.shoutbox_messageboxback').after(sUtilities); //Adds The Utilities

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
		if(usingCustomAltToImage || alwaysAutoColor) { //directing to fake message box (for intercepting enter on chrome)
			var shoutbox = $("#fakeShout");
		} else {
			var shoutbox = $('#shout_message');
		}
		var optSelect = $('#request-dropdown option:selected').attr('value');
		if(allTextGetsReplaced) {
			if (optSelect == 'mag') {
				shoutbox.val(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=579]Request Magazines Here[/url] "+centerMes2);
			} else if (optSelect == 'e-book') {
				shoutbox.val(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=805]Request Ebooks Here[/url] "+centerMes2);
			} else if (optSelect == 'comic') {
				shoutbox.val(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=1109]Request Comics Here[/url] "+centerMes2);
			} else if (optSelect == 'sports') {
				shoutbox.val(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=698]Request Sports Here[/url] "+centerMes2);
			} else if (optSelect == 'tv') {
				shoutbox.val(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=58]Request TV Here[/url] "+centerMes2);
			} else if (optSelect == 'music') {
				shoutbox.val(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=42]Request Music Here[/url] "+centerMes2);
			} else if (optSelect == 'audio') {
				shoutbox.val(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=154]Request Audiobooks Here[/url] "+centerMes2);
			} else if (optSelect == 'software') {
				shoutbox.val(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=219]Request Software Here[/url] "+centerMes2);
			} else if (optSelect == 'app') {
				shoutbox.val(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=45]Request Apps Here[/url] "+centerMes2);
			} else if (optSelect == 'manga') {
				shoutbox.val(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=124]Request Manga Here[/url] "+centerMes2);
			} else if (optSelect == 'cartoon') {
				shoutbox.val(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=130]Request Cartoons Here[/url] "+centerMes2);
			} else if (optSelect == 'anime') {
				shoutbox.val(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=44]Request Anime Here[/url] "+centerMes2);
			} else if (optSelect == 'games') {
				shoutbox.val(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=47]Request Games Here[/url] "+centerMes2);
			} else if (optSelect == 'tut') {
				shoutbox.val(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=160]Request Tutorials Here[/url] "+centerMes2);
			} else if (optSelect == 'ass') {
				shoutbox.val(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=43]Request Assets Here[/url] "+centerMes2);
			}
		} else {
			if (optSelect == 'mag') {
				shoutbox.insertAtCaret(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=579]Request Magazines Here[/url] "+centerMes2);
			} else if (optSelect == 'e-book') {
				shoutbox.insertAtCaret(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=805]Request Ebooks Here[/url] "+centerMes2);
			} else if (optSelect == 'comic') {
				shoutbox.insertAtCaret(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=577]Request Comics Here[/url] "+centerMes2);
			} else if (optSelect == 'sports') {
				shoutbox.insertAtCaret(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=698]Request Sports Here[/url] "+centerMes2);
			} else if (optSelect == 'tv') {
				shoutbox.insertAtCaret(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=58]Request TV Here[/url] "+centerMes2);
			} else if (optSelect == 'music') {
				shoutbox.insertAtCaret(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=42]Request Music Here[/url] "+centerMes2);
			} else if (optSelect == 'audio') {
				shoutbox.insertAtCaret(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=154]Request Audiobooks Here[/url] "+centerMes2);
			} else if (optSelect == 'software') {
				shoutbox.insertAtCaret(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=219]Request Software Here[/url] "+centerMes2);
			} else if (optSelect == 'app') {
				shoutbox.insertAtCaret(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=45]Request Apps Here[/url] "+centerMes2);
			} else if (optSelect == 'manga') {
				shoutbox.insertAtCaret(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=124]Request Manga Here[/url] "+centerMes2);
			} else if (optSelect == 'cartoon') {
				shoutbox.insertAtCaret(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=130]Request Cartoons Here[/url] "+centerMes2);
			} else if (optSelect == 'anime') {
				shoutbox.insertAtCaret(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=44]Request Anime Here[/url] "+centerMes2);
			} else if (optSelect == 'games') {
				shoutbox.insertAtCaret(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=47]Request Games Here[/url] "+centerMes2);
			} else if (optSelect == 'tut') {
				shoutbox.insertAtCaret(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=160]Request Tutorials Here[/url] "+centerMes2);
			} else if (optSelect == 'ass') {
				shoutbox.insertAtCaret(centerMes1+"[url=https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=43]Request Assets Here[/url] "+centerMes2);
			}
		}
	});

	var messages = [
		centerMes1+'No Outside Torrent Links Allowed'+centerMes2, //0
		centerMes1+'No Arguing In The Shoutbox If Your Having A Disagreement Take It To A Pm'+centerMes2, //1
		centerMes1+'No Swearing (As We Have Members Of All Ages)'+centerMes2, //2
		centerMes1+'No Discussion Of Vulgar/Sexually Explicit Topics (We Have Members Of All Ages)'+centerMes2, //3
		centerMes1+'We Will Not Tolerate Any Discrimination To LGBT Members Or Anyone Else For That Matter'+centerMes2, //4
		centerMes1+'No Discussions About Server,Bugs,Suggestions Etc. Are Allowed. We Have Threads For That Or Through A Pm'+centerMes2, //5
		centerMes1+'No requests For Tweaks/Apps/Support (We Have A Requests Thread For That)'+centerMes2, //6
		centerMes1+'Youtube Links Are Allowed Just Use Common Sense'+centerMes2, //7
		centerMes1+'Images Are Allowed But No Taller Than 200 Pixels'+centerMes2, //8
		centerMes1+'No Political or Religious Discussions As This Can Lead To Conflict That Can Get Out Of Control'+centerMes2, //9
		centerMes1+'No ALL CAPS allowed As Thats Considered Screaming'+centerMes2, //10
		centerMes1+"Never Refer Or Use A User's Name Other Than The One They Are Registered With"+centerMes2, //11
		centerMes1+"↑ The search box is above ↑ Just enter your search keyword and hit Search Torrent, thanks."+centerMes2, //12
		//Add another message below (don't forget the quotes and a comma after them)
	];

	$('#msg-butt').click(function(){
		if(usingCustomAltToImage || alwaysAutoColor) { //directing to fake message box (for intercepting enter on chrome)
			var shoutbox = $("#fakeShout");
		} else {
			var shoutbox = $('#shout_message');
		}
		var optSelect = $('#msg-dropdown option:selected').attr('value');
		if(allTextGetsReplaced) {
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
				default:
					for(i=0;i<shoutUtiXMsgArray.length;i++){
						if(optSelect == i){
							shoutbox.val(shoutUtiXMsgArray[i]);  //-------------------------------
						}
					}
					break;
					//Add extra messages below. Format:
					// case '(value added above)':
					// shoutbox.val(messages[(number)]);
					// break;
			}
		} else {
			switch (optSelect) {
				case 'noout':
					shoutbox.insertAtCaret(messages[(0)]);
					break;
				case 'noargue':
					shoutbox.insertAtCaret(messages[(1)]);
					break;
				case 'noswear':
					shoutbox.insertAtCaret(messages[(2)]);
					break;
				case 'novulgar':
					shoutbox.insertAtCaret(messages[(3)]);
					break;
				case 'nodiscrim':
					shoutbox.insertAtCaret(messages[(4)]);
					break;
				case 'nobug':
					shoutbox.insertAtCaret(messages[(5)]);
					break;
				case 'noreq':
					shoutbox.insertAtCaret(messages[(6)]);
					break;
				case 'yt':
					shoutbox.insertAtCaret(messages[(7)]);
					break;
				case 'imgsize':
					shoutbox.insertAtCaret(messages[(8)]);
					break;
				case 'nopol':
					shoutbox.insertAtCaret(messages[(9)]);
					break;
				case 'allcap':
					shoutbox.insertAtCaret(messages[(10)]);
					break;
				case 'diffname':
					shoutbox.insertAtCaret(messages[(11)]);
					break;
				case 'search':
					shoutbox.insertAtCaret(messages[(12)]);
					break;
				default:
					for(i=0;i<shoutUtiXMsgArray.length;i++){
						if(optSelect == i){
							shoutbox.insertAtCaret(centerMes1+shoutUtiXMsgArray[i]+centerMes2);  //-------------------------------
						}
					}
					break;
					//Add extra messages below. Format:
					// case '(value added above)':
					// shoutbox.val(messages[(number)]);
					// break;
			}
		}
	});

	$('#link-butt').click(function(){
		if(usingCustomAltToImage || alwaysAutoColor) { //directing to fake message box (for intercepting enter on chrome)
			var shoutbox = $("#fakeShout");
		} else {
			var shoutbox = $('#shout_message');
		}
		var optSelect = $('#link-dropdown option:selected').attr('value');
		if(allTextGetsReplaced) {
			if (optSelect == 'idea'){
				shoutbox.val(centerMes1+'Post an idea here: https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=19 '+centerMes2);
			} else if (optSelect == 'prob') {
				shoutbox.val(centerMes1+'Post an issue here: https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=12 '+centerMes2);
			}
		} else {
			if (optSelect == 'idea'){
				shoutbox.insertAtCaret(centerMes1+'Post an idea here: https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=19 '+centerMes2);
			} else if (optSelect == 'prob') {
				shoutbox.insertAtCaret(centerMes1+'Post an issue here: https://worldwidetorrents.to/forums.php?action=viewtopic&topicid=12 '+centerMes2);
			}
		}
	});
}
//-----------------------------------------------------------------
//-----------------------------------------------------------------

//Shoutbox Smileys//----------------------------------
//----------------------------------------------------
//----------------------------------------------------
if(usingShoutSmileys) {
	if(usingCustomAltToImage || alwaysAutoColor) { //Creating fake message box (for intercepting enter on chrome) (NotNeo)
		$("#shout_message").hide();
		$("#shout_message").after(' <input autocomplete="off" type="text" style="float: left;" placeholder="Type your shout message here" id="fakeShout" name="fakeShout" class="shoutbox_msgbox"> ');
	}
	// Main Element classes
	var userID = $("a[title|='My Account']");
	var shoutHeader = $('.w3-allerta.w3-theme-l1:contains("Shoutbox"):first');
	if(usingCustomAltToImage || alwaysAutoColor) { //directing to fake message box (for intercepting enter on chrome)
		var shoutInput = $("#fakeShout");
	} else {
		var shoutInput = $('.shoutbox_messageboxback');
	}
	if(usingCustomAltToImage || alwaysAutoColor) { //directing to fake message box (for intercepting enter on chrome)
		var shoutMsg = $("#fakeShout");
	} else {
		var shoutMsg = $('.shoutbox_msgbox');
	}
	var shoutSubmit = $('#submit_shout');
	////////////////////////
	// Shout Toolbar
	////////////////////////
	// Adding Account infos
	if(accInfo){
		var uid = userID.attr('href'); // get user ID
		uid = uid.replace('/account-details.php?id=','');
		// this is to get message count (needed for live count)
		function gmc() {
			'use strict';
			let pmcount = $(".pmButton > span").text() || 0;
			return pmcount;
		}
		// get initial message count
		var msgCount = gmc();
		if(msgCount > 0 && msgCount != "E"){
			var notiPMCount = msgCount;
			if(usingPMAudio) {
				PMauPlayer.play();
			}
			if(usingPMNoti){
				if(Notification.permission === 'granted') {
					n = new Notification( "Unread PMs", {
						body: "You have "+notiPMCount+" unread PM(s)",
						icon : "star.ico"
					});
				} else if(Notification.permission === 'denied') {
					Notification.requestPermission();
				} else {
					alert("There's something wrong with the desktop notifications. \nMaybe your browser doesn't support it?");
				}
			}
		} else if (msgCount != "E") { //if message count == "E", nothing should be done
			var notiPMCount = 0;
		}
		// Defining Buttons
		buttons = '&nbsp;&nbsp;<a class="profile" href="/account-details.php?id='+uid+'"><span style="color:'+icoColor+';" title="Your Account" class="glyphicon glyphicon-user"></span></a>&nbsp;';
		buttons += '<a class="account" href="/account.php"><span style="color:'+icoColor+';" title="Account Settings" class="glyphicon glyphicon-wrench"></span></a>&nbsp;';
		buttons += '<a class="torrents" href="/account.php?action=mytorrents"><span style="color:'+icoColor+';" title="Your Torrents" class="glyphicon glyphicon-download-alt"></span></a>&nbsp;';
		buttons += '<a id="KU-mail" href="/mailbox.php'+((msgCount!=0) ? '?inbox' : '')+'"><span style="color:'+icoColor+';" title="Your Messages" class="glyphicon glyphicon-envelope"></span><sup id="KU-count" style="font-weight:bold;color:'+msgColor+';margin-left:5px;">'+((msgCount!=0) ? '('+msgCount+')' : '')+'</sup></a>';
		// Adding the buttons
		shoutHeader.html('<center><span style="float:left;">'+buttons+'</span><span style="position:relative;left:-65px;">Shoutbox</span></center>');
		// this will keep the count updated
		function liveCount(){
			var newMsgCount = gmc();
			var mailBox = '/mailbox.php'+((newMsgCount!=0) ? '?inbox' : '')+'';
			// update shout bar;
			$('#KU-mail').prop('href',''+mailBox+'');
			$('#KU-count').text(''+((newMsgCount!=0) ? '('+newMsgCount+')' : '')+'');
			if(newMsgCount > notiPMCount) {
				notiPMCount = newMsgCount;
				if(usingPMAudio){
					PMauPlayer.play();
				}
				if(usingPMNoti){
					if(Notification.permission === 'granted') {
						n = new Notification( "New PM", {
							body: "You got a new PM!\nYou have "+notiPMCount+" unread PM(s).",
							icon : "star.ico"
						});
					} else if(Notification.permission === 'denied') {
						Notification.requestPermission();
					} else {
						alert("There's something wrong with the desktop notifications. \nMaybe your browser doesn't support it?");
					}
				}
			} else if(newMsgCount < notiPMCount) {
				notiPMCount = newMsgCount;
			}
		}
		setInterval(liveCount, 200);
	}
	////////////////////////
	// Add Smileys
	////////////////////////
	// Adding smiley sets
	$('.shoutbox_messageboxback').after('<tr><td id="cusSmileBox" style="vertical-align:top;">'+smileys+Csmileys+NCsmileys+'</td></tr>');
	// CSS for smileys
	$('.cusSmile').css({'cursor': 'pointer', 'max-height': '25px'});

    //making sure the titles are the same as alts
    let demSmileys = $(".cusSmile");
    $.each(demSmileys, function() {
        $(this).attr("title", $(this).attr("alt"));
    });

    if(usingSmileyHide4Hover) {
		$("#cusSmileBox").before('<td id="smileyHoverArea" style="color: #d9d9d9; vertical-align: top; font-size: 4vh;">HOVER OVER HERE TO SHOW THE SMILEYS</td>');
		$("#cusSmileBox").hide();
		$("#cusSmileBox").parent().hover(function(){
			$("#smileyHoverArea").hide();
			$("#cusSmileBox").show();
		}, function(){
			$("#cusSmileBox").hide();
			$("#smileyHoverArea").show();
		});
	}

	////////////////////////
	// Buttons
	////////////////////////
	if(!UseNbbCodeDefaultStyle){ // add colorize button
		if(!alwaysAutoColor) { $('#submit_shout').after('&nbsp;<button type="submit" class="w3-btn" style="background-color:'+bbColor+';" id="color_shout">Shout in Color</button>'); } //Disabling shout in color button if using autocolor
	}
	else{ // replace submit + add colorize button
		if(usingCustomAltToImage || alwaysAutoColor) { //Added option by NotNeo
			//shoutSubmit.replaceWith('<input id="submit_shout" type="button" onclick="" value="Shout">'); ----------------------------------
			$("#submit_shout").replaceWith('<input id="submit_shout" type="button" onclick="submit_shout();" value="Shout">');
			$("#submit_shout").hide();
			$("#submit_shout").after('<input id="fake_submit_shout" type="button" onclick="" value="Shout">');
			$("#fake_submit_shout").click(function(e){
				e.preventDefault();
				beforeSubmit();
			})
		} else { //original Keka way :)
			shoutSubmit.replaceWith('<input id="submit_shout" type="button" onclick="submit_shout();" value="Shout">');
		}
		if(!alwaysAutoColor) { $('#submit_shout').after('&nbsp;<input style="background-color:'+bbColor+';" id="color_shout" value="Shout in Color" type="button" title="Wraps entire post in predefined color and submits">'); } //Disabling shout in color button if using autocolor
	}
	/*
	if(usingCustomAltToImage || alwaysAutoColor) { //Added option by NotNeo
	  $("#submit_shout").click(function() {
		  beforeSubmit();
	  });
	}
	*/

	////////////////////////
	// BBCode Box
	////////////////////////
	// Defining Buttons
	var bbButtons = '<td id="BBCBox" colspan="2" style="position: relative; text-align:center;">';
	bbButtons += '<h3 class="w3-card-4 w3-allerta w3-theme-l1 w3-round-large"><center>BBCode Functions</center></h3><div style="padding: 10px 0px;">';
	if(!UseNbbCodeDefaultStyle){
		bbButtons += '<div style="display:inline-block; padding: 3px;"><button type="submit" class="bbImg w3-btn w3-teal" title="Add an image">IMG</button></div>';
		bbButtons += '<div style="display:inline-block; padding: 3px;"><button type="submit" class="bbUrl w3-btn w3-teal" title="Add a link">URL</button></div>';
		bbButtons += '<div style="display:inline-block; padding: 3px;"><button type="submit" class="bbCol w3-btn" style="background-color:'+bbColor+';" title="Wraps selected text in selected(from popup) color">Color</button></div>'; //Improved by NotNeo
		bbButtons += '<div style="display:inline-block; padding: 3px;"><button type="submit" class="bbBold w3-btn w3-teal" title="Wraps selected text in bold">Bold</button></div>';
		bbButtons += '<div style="display:inline-block; padding: 3px;"><button type="submit" class="bbItal w3-btn w3-teal" title="Wraps selected text in italics">Italic</button></div>';
		bbButtons += '<div style="display:inline-block; padding: 3px;"><button type="submit" class="bbUnder w3-btn w3-teal" title="Underlines selected text">Underline</button></div>';//Added by NotNeo
		bbButtons += '<div style="display:inline-block; padding: 3px;"><button type="submit" class="bbStrike w3-btn w3-teal" style="text-decoration: line-through;" title="Strikethrough selected text">Strike</button></div>';
		bbButtons += '<div style="display:inline-block; padding: 3px;"><button type="submit" class="bbFont w3-btn w3-teal" title="Wraps selected text in the selected(from popup) font">Font</button></div>'; //Added by NotNeo
		bbButtons += '<div style="display:inline-block; padding: 3px;"><button type="submit" class="bbSize w3-btn w3-teal" title="Sizes selected text to selected size">Size</button></div>'; //Added by NotNeo
		bbButtons += '<div style="display:inline-block; padding: 3px;"><button type="submit" class="bbSpoil w3-btn w3-teal" title="Hides selected text under a spoiler tag">Spoiler</button></div>'; //Added by NotNeo
		bbButtons += '<div style="display:inline-block; padding: 3px;"><button type="submit" class="bbQuot w3-btn w3-teal" title="Make a quote">Quote</button></div>'; //Added by NotNeo
		bbButtons += '<div style="display:inline-block; padding: 3px;"><button type="submit" class="bbAlign w3-btn w3-teal" title="Align selected text">Align</button></div>'; //Added by NotNeo
	} else { // Added by NotNeo (Default)
		bbButtons += '<div style="display:inline-block; padding: 3px;"><input class="bbImg" type="submit" value="IMG" title="Add an image" /></div>';
		bbButtons += '<div style="display:inline-block; padding: 3px;"><input class="bbUrl" type="submit" value="URL" title="Make selected text into a link" /></div>';
		bbButtons += '<div style="display:inline-block; padding: 3px;"><input class="bbCol" style="background-color:'+bbColor+';" type="submit" value="Colour" title="Wraps selected text in selected(from popup) color" /></div>';
		bbButtons += '<div style="display:inline-block; padding: 3px;"><input class="bbBold" style="min-width: 30px; font-weight: bold;" type="submit" value="B" title="Wraps selected text in bold" /></div>';
		bbButtons += '<div style="display:inline-block; padding: 3px;"><input class="bbItal" style="min-width: 30px; font-style: italic;" type="submit" value="I" title="Wraps selected text in italic" /></div>';
		bbButtons += '<div style="display:inline-block; padding: 3px;"><input class="bbUnder" style="min-width: 30px; text-decoration: underline;" type="submit" value="U" title="Underlines selected text" /></div>';
		bbButtons += '<div style="display:inline-block; padding: 3px;"><input class="bbStrike" style="text-decoration: line-through;" type="submit" value="s" title="Strikethrough selected text" /></div>';
		bbButtons += '<div style="display:inline-block; padding: 3px;"><input class="bbSize" type="submit" style="min-width:30px;" value="S↕" title="Sizes selected text to selected size" /></div>';
		bbButtons += '<div style="display:inline-block; padding: 3px;"><input class="bbFont" style="font: Georgia;" type="submit" value="Font" title="Wraps selected text in the selected(from popup) font" /></div>';
		bbButtons += '<div style="display:inline-block; padding: 3px;"><input class="bbSpoil" type="submit" value="Spoiler" title="Hides selected text under a spoiler tag" /></div>';
		bbButtons += '<div style="display:inline-block; padding: 3px;"><input class="bbQuot" type="submit" value="Quote" title="Make a quote" /></div>';
		bbButtons += '<div style="display:inline-block; padding: 3px;"><input class="bbAlign" type="submit" value="Align" title="Align selected text" /></div>';
	}
	bbButtons += '</div></td>';
	// Adding Buttons
	$('#cusSmileBox').after(bbButtons);

    shoutMsg.on("drop", function(e) {
        if (e.originalEvent.dataTransfer.getData("Text").length > 4) {
            var dataEnd = e.originalEvent.dataTransfer.getData("Text").substr(e.originalEvent.dataTransfer.getData("Text").length - 4, 4);
            var dataBegin = e.originalEvent.dataTransfer.getData("Text").substr(0, 5);
            if(dataEnd == ".gif" || dataEnd == ".png" || dataEnd == ".jpg" || dataEnd == "jpeg") { //if text end is image format, tag it as such
                e.preventDefault();
                shoutMsg.insertAtCaret("[img]" + e.originalEvent.dataTransfer.getData("Text") + "[/img]");
            } else if (dataBegin == "http:" || dataBegin == "https") { //if text doesn't end in image format, but is a link tag it as such
                e.preventDefault();
                var DropInnerURLText = prompt("Give inner link text (link's visible text): ");
                shoutMsg.insertAtCaret("[url=" + e.originalEvent.dataTransfer.getData("Text") + "]" + DropInnerURLText + "[/url]");
            }
        }
    });

	////////////////////////
	// Click Events
	////////////////////////
	// Click for smiley
	$('.cusSmile').click(function(){
		var code = $(this).data('code');
		if(code){code = code;}
		else{code = '[img]'+ $(this).attr('src') +'[/img]';}
		shoutMsg.insertAtCaret(''+code+'');
	});
	// Click for AutoColorize
	$('#color_shout').click(function(){
		var text = shoutMsg.val();
		if(text!==''){
			if(boldColor){text = '[b]'+text+'[/b]';}
			if(italicColor){text = '[i]'+text+'[/i]';}
			shoutMsg.val('[color='+bbColor+']'+text+'[/color]');
			if(usingCustomAltToImage || alwaysAutoColor) { beforeSubmit(); } else { submit_shout(); } //Added option by NotNeo (else = original Keka way)
		}
	});
	////////////////////////
	// fix for ff submits
	////////////////////////
	if (navigator.userAgent.search("Firefox") >= 0 || usingCustomAltToImage || alwaysAutoColor) {
		shoutInput.keydown(function(e) {
			if(e.keyCode === 13 && !e.shiftKey) { // enter not shift+enter
				e.preventDefault();
				if(usingCustomAltToImage || alwaysAutoColor) { beforeSubmit(); } else { submit_shout(); } //Added option by NotNeo (else = original Keka way)
			}
		});
		// Shift+Enter submit
		shoutInput.keydown(function(e) {
			if(e.keyCode === 13 && e.shiftKey) {
				e.preventDefault();
				$('#color_shout').click();
			}
		});
	}
	////////////////////////
	// BBCode clicks
	////////////////////////
	// Click for IMG
	$('.bbImg').click(function(){
		r=prompt('PLEASE_ENTER_THE_FULL_URL_FOR_YOUR_IMAGE\n\rONLY .png, .jpg, .gif images');
		if(r!==null && r!==''){shoutMsg.insertAtCaret('[img]'+r+'[/img]');}
	});
	// Click for URL
	$('.bbUrl').click(function(){
		var t = getSelectedText(); //If there is highlighted text, use that as the visible text of the link (NotNeo), + youtube handling
		var l=prompt('PLEASE_ENTER_THE_FULL_URL');
		if(l!==null && l!==''){

            //If youtube link, get title automatically
            if(l.indexOf("youtube.com/") > -1 || l.indexOf("youtu.be/") > -1) {
                $.ajax({
                    url: 'https://noembed.com/embed',
                    dataType: 'json',
                    data: {format: 'json', url: l},
                    timeout: 3000 //3 second timeout
                }).success(function(data) {
                    t = data.title;
                    t = prompt('PLEASE_ENTER_THE_TITLE', t);
                    t = "[img]https://i.imgur.com/jxRomN3.png[/img]" + t;
                    shoutMsg.insertAtCaret('[url='+l+']'+t+'[/url]');
                }).fail(function() {
                    if(t===null || t==='') { t=prompt('PLEASE_ENTER_THE_TITLE'); }
                    t = "[img]https://i.imgur.com/jxRomN3.png[/img]" + t;
                    shoutMsg.insertAtCaret('[url='+l+']'+t+'[/url]');
                });
            }
            else {
                if(t===null || t==='') { t=prompt('PLEASE_ENTER_THE_TITLE'); }
                if(t===null || t===''){shoutMsg.insertAtCaret('[url]'+l+'[/url]');}
                else{shoutMsg.insertAtCaret('[url='+l+']'+t+'[/url]');}
            }
		}
	});
	// Click for Spoiler
	$('.bbSpoil').click(function(){
		var text = hasText();
		var heading=prompt('Enter the title(visible) for the spoiler');
		if(heading==null) { return false; } else if(heading=='') {
			shoutMsg.insertAtCaret('[spoiler]'+text+'[/spoiler]');
		} else { shoutMsg.insertAtCaret('[spoiler='+heading+']'+text+'[/spoiler]'); }
	});
	// Click for Align
	$('.bbAlign').click(function(){
		//reloadLatestForum();
		if( $('.bbACenter').length > 0 ) {
			$('.bbACenter').parent().prev('br').remove();
			$('.bbACenter').parent().remove();
			$('.bbALeft').parent().remove();
			$('.bbAJustify').parent().remove();
			$('.bbARight').parent().remove();
		} else {
			$(this).parent().parent().append('<br>');
			$(this).parent().parent().append('<div style="display:inline-block; padding: 3px;"><input class="bbACenter" type="submit" value="Center" title="Center align selected text" /></div>');
			$(this).parent().parent().append('<div style="display:inline-block; padding: 3px;"><input class="bbAJustify" type="submit" value="Justify" title="Justify align selected text" /></div>');
			$(this).parent().parent().append('<div style="display:inline-block; padding: 3px;"><input class="bbARight" type="submit" value="Right" title="Right align selected text" /></div>');

			$('.bbACenter').click(function(){
				var text = hasText();
				shoutMsg.insertAtCaret('[align=center]'+text+'[/align]');
				$('.bbACenter').parent().prev('br').remove();
				$('.bbACenter').parent().remove();
				$('.bbALeft').parent().remove();
				$('.bbAJustify').parent().remove();
				$('.bbARight').parent().remove();
			});
			$('.bbAJustify').click(function(){
				var text = hasText();
				shoutMsg.insertAtCaret('[align=justify]'+text+'[/align]');
				$('.bbACenter').parent().prev('br').remove();
				$('.bbACenter').parent().remove();
				$('.bbALeft').parent().remove();
				$('.bbAJustify').parent().remove();
				$('.bbARight').parent().remove();
			});
			$('.bbARight').click(function(){
				var text = hasText();
				shoutMsg.insertAtCaret('[align=right]'+text+'[/align]');
				$('.bbACenter').parent().prev('br').remove();
				$('.bbACenter').parent().remove();
				$('.bbALeft').parent().remove();
				$('.bbAJustify').parent().remove();
				$('.bbARight').parent().remove();
			});
		}
	});
	// Click for Quote
	$('.bbQuot').click(function(){
		var text = hasText();
		var whoQuote=prompt('Enter the name of the person you\'re quoting. \n(\'?\' for drag-and-drop instructions)');
		if(whoQuote == '?') {
			$("body").append(' <div id="quoteTut" class"w3-modal" style="position: fixed; left:30%; top: 30%; display: block;"><div class="w3-modal-content w3-card-8 w3-animate-zoom" style="background-color: #7d97a5; max-width:400px"><div class="w3-center"><h3>How to drag-and-drop quote:</h3><br><br>Highlight their message like so:<br><img src="https://i.imgur.com/NzEiK5I.png"><br>(Note that the name is also highlighted)<br>(You can highlight the entire message by triple-clicking it)<br>Then, drag the highlighted text on to the "Quote" button.<br>Done.<br>If you leave out the name from the highlighted text, you will be prompted for it.<br><button id="quoteTutOk">OK</button></div></div></div> ');
			$("#quoteTutOk").click(function(){
				$("#quoteTut").remove();
				return false;
			})
		}else if(whoQuote==null) { return false; } else if(whoQuote=='') {
			shoutMsg.insertAtCaret('[quote]'+text+'[/quote]');
		} else { shoutMsg.insertAtCaret('[quote='+whoQuote+']'+text+'[/quote]'); }
	});
	//Drag-and-drop quote
	$('.bbQuot').bind('dragover', function (e) { e.preventDefault(); });
	$('.bbQuot').bind('drop', function (e) {
		e.preventDefault();
		var droppedQuote = e.originalEvent.dataTransfer.getData('Text');
		if( /.*:  .*/.test(droppedQuote) ) {
			var whoQuote = droppedQuote.split(":")[0];
			text = droppedQuote.split(":  ")[1];
			shoutMsg.insertAtCaret('[quote='+whoQuote+']'+text+'[/quote]');
		} else {
			text = droppedQuote;
			var whoQuote=prompt('Enter the name of the person you\'re quoting');
			if(whoQuote==null) { return false; } else if(whoQuote=='') {
				shoutMsg.insertAtCaret('[quote]'+text+'[/quote]');
			} else { shoutMsg.insertAtCaret('[quote='+whoQuote+']'+text+'[/quote]'); }
		}
	});
	// Click for Color. Now with color picker (NotNeo)
	$('.bbCol').click(function() {
		if($("#color").length > 0 || $("#colorHexDiv").length > 0) {
			$("#color").remove();
			$("#colorHexDiv").remove();
		} else {
			var text = hasText();
			if(text!==null && text!=='') {
				var colorPicker = '<div id="color" class"w3-modal" style="position: fixed; left:40%; top: 30%; display: block;"><div class="w3-modal-content w3-card-8 w3-animate-zoom" style="background-color: #7d97a5; max-width:150px"><div class="w3-center"> Choose Color<br><br>';
				colorPicker += '<select id="colorSelector" name="couleur" class="bb_icon" style="padding-bottom:1px;">';
				colorPicker += '<option>Color</option>';
				colorPicker += '<option value="'+bbColor+'" style="color:'+bbColor+'">bbColor</option>';
				colorPicker += '<option value="skyblue" style="color:skyblue">Skyblue</option>';
				colorPicker += '<option value="royalblue" style="color:royalblue">Royalblue</option>';
				colorPicker += '<option value="blue" style="color:blue">Blue</option>';
				colorPicker += '<option value="darkblue" style="color:darkblue">Darkblue</option>';
				colorPicker += '<option value="orange" style="color:orange">Orange</option>';
				colorPicker += '<option value="orangered" style="color:orangered">Orangered</option>';
				colorPicker += '<option value="crimson" style="color:crimson">Crimson</option>';
				colorPicker += '<option value="red" style="color:red">Red</option>';
				colorPicker += '<option value="firebrick" style="color:firebrick">Firebrick</option>';
				colorPicker += '<option value="darkred" style="color:darkred">Darkred</option>';
				colorPicker += '<option value="green" style="color:green">Green</option>';
				colorPicker += '<option value="limegreen" style="color:limegreen">Limegreen</option>';
				colorPicker += '<option value="seagreen" style="color:seagreen">Seagreen</option>';
				colorPicker += '<option value="deeppink" style="color:deeppink">Deeppink</option>';
				colorPicker += '<option value="tomato" style="color:tomato">Tomato</option>';
				colorPicker += '<option value="coral" style="color:coral">Coral</option>';
				colorPicker += '<option value="purple" style="color:purple">Purple</option>';
				colorPicker += '<option value="indigo" style="color:indigo">indigo</option>';
				colorPicker += '<option value="burlywood" style="color:burlywood">Burlywood</option>';
				colorPicker += '<option value="sandybrown" style="color:sandybrown">Sandybrown</option>';
				colorPicker += '<option value="sienna" style="color:sienna">Sienna</option>';
				colorPicker += '<option value="chocolate" style="color:chocolate">Chocolate</option>';
				colorPicker += '<option value="teal" style="color:teal">Teal</option>';
				colorPicker += '<option value="silver" style="color:silver">Silver</option>';
				colorPicker += '<option value="rainbow">Rainbow</option>';
				colorPicker += '<option value="rainbowSine">Sine Rainbow</option>';
				colorPicker += '<option value="gradient">Gradient</option>';
				colorPicker += '<option value="custom">Custom</option>';
				colorPicker += '</select><br><br><button id="colorPick">Pick</button><button id="colorCancel">Cancel</button><div></div></div>';
				$("#BBCBox").append(colorPicker);
				$("#colorCancel").click(function(){
					$("#color").remove();
					return false;
				});
				$("#colorPick").click(function() {
					var colorToUse = $("#colorSelector").val();
					if(colorToUse == "Color") {
						$("#color").remove();
						return false;
					}
					else if(colorToUse == "rainbow") {
						var colorAnyway = true;
						if(/.*?\[\/.+?\].*?/g.test(text)) {
							var colorAnywayP = prompt("This coloring wil break tags if applied on them.\nTry coloring only the text INSIDE the tags.\n\nTo color anyway, press 'OK'. To cancel, press 'Cancel'");
							if(colorAnywayP === null) {
								colorAnyway = false;
							} else {
								colorAnyway = true;
							}
						}
						if(colorAnyway){
							var rainbowtext = '';
							var hue=0;
							var step=0;

							// hue is 360 degrees
							if (text.length > 0)
							step = 360 / (text.length);

							// iterate the whole 360 degrees
							for (var i = 0; i < text.length; i++)
							{
								rainbowtext = rainbowtext + '[color=' + color_from_hue(hue) + ']' + text.charAt(i) + '[/color]';
								hue += step;
							}
							shoutMsg.insertAtCaret(rainbowtext);
						}
						$("#color").remove();
					}
					else if(colorToUse == "rainbowSine") {
						var colorAnyway = true;
						if(/.*?\[\/.+?\].*?/g.test(text)) {
							var colorAnywayP = prompt("This coloring wil break tags if applied on them.\nTry coloring only the text INSIDE the tags.\n\nTo color anyway, press 'OK'. To cancel, press 'Cancel'");
							if(colorAnywayP === null) {
								colorAnyway = false;
							} else {
								colorAnyway = true;
							}
						}
						if(colorAnyway){
							var rainbowtext = '';
							var frequency = 10/(text.length);
							if(frequency > 0.999) { frequency = 0.999; }
							if(frequency < 0.1) { frequency = 0.1; }

							for (var i = 0; i < text.length; i++)
							{
								var red = Math.sin(frequency*i + 0) * 127 + 128;
								var grn = Math.sin(frequency*i + 2) * 127 + 128;
								var blu = Math.sin(frequency*i + 4) * 127 + 128;
								rainbowtext = rainbowtext + '[color=' + rgb_to_hex(red, grn, blu) + ']' + text.charAt(i) + '[/color]';
							}
							shoutMsg.insertAtCaret(rainbowtext);
						}
						$("#color").remove();
					}
					else if(colorToUse == "gradient") {
						var colorAnyway = true;
						if(/.*?\[\/.+?\].*?/g.test(text)) {
							var colorAnywayP = prompt("This coloring wil break tags if applied on them.\nTry coloring only the text INSIDE the tags.\n\nTo color anyway, press 'OK'. To cancel, press 'Cancel'");
							if(colorAnywayP === null) {
								colorAnyway = false;
							} else {
								colorAnyway = true;
							}
						}
						if(colorAnyway){
							var startHexCol = "";
							if(GM_getValue("startHexCol") != null) {
								startHexCol = GM_getValue("startHexCol");
							}
							do {
								startHexCol = prompt("Give the starting color for the gradient. (hex)", startHexCol);
								startHexCol = startHexCol.replace("#", "");
								if(startHexCol.length == 3) {
									startHexCol = startHexCol.substring(0,1) + startHexCol.substring(0,1) + startHexCol.substring(1,2) + startHexCol.substring(1,2) + startHexCol.substring(2,3) + startHexCol.substring(2,3);
								}
								if(!/[0-9A-F]{6}/i.test(startHexCol)) {
									alert("Not a valid HEX!");
								}
							} while(!/[0-9A-F]{6}/i.test(startHexCol));
							startHexCol = "#"+startHexCol;
							GM_setValue("startHexCol", startHexCol);

							var endHexCol = "";
							if(GM_getValue("endHexCol") != null) {
								endHexCol = GM_getValue("endHexCol");
							}
							do {
								endHexCol = prompt("Give the ending color for the gradient. (hex)", endHexCol);
								endHexCol = endHexCol.replace("#", "");
								if(endHexCol.length == 3) {
									endHexCol = endHexCol.substring(0,1) + endHexCol.substring(0,1) + endHexCol.substring(1,2) + endHexCol.substring(1,2) + endHexCol.substring(2,3) + endHexCol.substring(2,3);
								}
								if(!/[0-9A-F]{6}/i.test(endHexCol)) {
									alert("Not a valid HEX!");
								}
							} while(!/[0-9A-F]{6}/i.test(endHexCol));
							endHexCol = "#"+endHexCol;
							GM_setValue("endHexCol", endHexCol);

							var startRGB = hexToRGB(startHexCol);
							var endRGB = hexToRGB(endHexCol);

							var gradtext = '';
							var curR = startRGB[0];
							var curG = startRGB[1];
							var curB = startRGB[2];
							var endR = endRGB[0];
							var endG = endRGB[1];
							var endB = endRGB[2];
							var stepR = ((endR-curR)/text.length);
							var stepG = ((endG-curG)/text.length);
							var stepB = ((endB-curB)/text.length);


							for (var i = 0; i < (text.length); i++)
							{
								if(i != 0) {
									curR += stepR;
									curG += stepG;
									curB += stepB;
								}
								gradtext = gradtext + '[color=' + rgb_to_hex(curR, curG, curB) + ']' + text.charAt(i) + '[/color]';
							}
							shoutMsg.insertAtCaret(gradtext);
						}
						$("#color").remove();
					}
					else if(colorToUse == "custom") {
						$("#color").after(`<div id="colorHexDiv" class"w3-modal" style="position: fixed; left:40%; top: 30%; display: block;">
						<div class="w3-modal-content w3-card-8 w3-animate-zoom" style="background-color: #7d97a5; max-width:150px; padding: 5px;">
						<div class="w3-center">
						<input type="color" style="width:60px; height:60px;" id="customColorInput">
						<button id="colorHex" style="position: absolute; top: 5px;">OK</button>
						<button id="colorHexCancel">Cancel</button>
						</div></div>`);
						$("#color").remove();

						$("#colorHex").click(function(){
							colorToUse = $("#customColorInput").val();
							shoutMsg.insertAtCaret('[color='+colorToUse+']'+text+'[/color]');
							$("#color").remove();
							$("#colorHexDiv").remove();
						});
						$("#colorHexCancel").click(function(){
							$("#colorHexDiv").remove();
							return false;
						});
					} else {
						shoutMsg.insertAtCaret('[color='+colorToUse+']'+text+'[/color]');
						$("#color").remove();
					}
				});
			}
		}
		//var text = hasText();
		//if(text!==null && text!==''){shoutMsg.insertAtCaret('[color='+bbColor+']'+text+'[/color]');}
	});
	// Click for Bold
	$('.bbBold').click(function(){
		var text = hasText();
		if(text!==null && text!==''){shoutMsg.insertAtCaret('[b]'+text+'[/b]');}
	});
	// Click for Italics
	$('.bbItal').click(function(){
		var text = hasText();
		if(text!==null && text!==''){shoutMsg.insertAtCaret('[i]'+text+'[/i]');}
	});
	// Click for Underlines
	$('.bbUnder').click(function(){
		var text = hasText();
		if(text!==null && text!==''){shoutMsg.insertAtCaret('[u]'+text+'[/u]');}
	});
	// Click for Strikethrough
	$('.bbStrike').click(function(){
		var text = hasText();
		if(text!==null && text!==''){shoutMsg.insertAtCaret('[s]'+text+'[/s]');}
	});
	// Click for Fonts (NotNeo)
	$('.bbFont').click(function(){
		if($("#fontDiv").length > 0) {
			$("#fontDiv").remove();
		} else {
			var text = hasText();
			if(text!==null && text!=='') {
				var fontPicker = '<div id="fontDiv" class"w3-modal" style="position: fixed; left:40%; top: 30%; display: block;"><div class="w3-modal-content w3-card-8 w3-animate-zoom" style="background-color: #7d97a5; max-width:250px"><div class="w3-center"> Choose Font<br><br>';
				fontPicker += '<select id="fontSelector" name="fonts" class="bb_icon" style="padding-bottom:1px;">';
				fontPicker += '<option>Font</option>';
				fontPicker += '<option value="Arial" style="font-family: arial">Arial</option>';
				fontPicker += '<option value="Arial Black" style="font-family: Arial Black">Arial Black</option>';
				fontPicker += '<option value="Comic Sans MS" style="font-family: Comic Sans MS">Comic Sans MS</option>';
				fontPicker += '<option value="Courier New" style="font-family: Courier New">Courier New</option>';
				fontPicker += '<option value="Franklin Gothic Medium" style="font-family: Franklin Gothic Medium">Franklin Gothic Medium</option>';
				fontPicker += '<option value="Georgia" style="font-family: Georgia">Georgia</option>';
				fontPicker += '<option value="Helvetica" style="font-family: Helvetica">Helvetica</option>';
				fontPicker += '<option value="Impact" style="font-family: Impact">Impact</option>';
				fontPicker += '<option value="Lucida Console" style="font-family: Lucida Console">Lucida Console</option>';
				fontPicker += '<option value="Lucida Sans Unicode" style="font-family: Lucida Sans Unicode">Lucida Sans Unicode</option>';
				fontPicker += '<option value="Microsoft Sans Serif" style="font-family: Microsoft Sans Serif">Microsoft Sans Serif</option>';
				fontPicker += '<option value="Palatino Linotype" style="font-family: Palatino Linotype">Palatino Linotype</option>';
				fontPicker += '<option value="Tahoma" style="font-family: Tahoma">Tahoma</option>';
				fontPicker += '<option value="Times New Roman" style="font-family: Times New Roman">Times New Roman</option>';
				fontPicker += '<option value="Trebuchet MS" style="font-family: Trebuchet MS">Trebuchet MS</option>';
				fontPicker += '<option value="Verdana" style="font-family: Verdana">Verdana</option>';
				fontPicker += '<option value="Symbol" style="font-family: Symbol">Symbol</option>';
				fontPicker += '</select><br><br><button id="fontPick">Pick</button><button id="fontCancel">Cancel</button><div></div></div>';
				$("#BBCBox").append(fontPicker);
				$("#fontCancel").click(function(){
					$("#fontDiv").remove();
					return false;
				});
				$("#fontPick").click(function() {
					var fontToUse = $("#fontSelector").val();
					if(fontToUse == "Font") {
						return false;
					} else {
						shoutMsg.insertAtCaret('[font='+fontToUse+']'+text+'[/font]');
						$("#fontDiv").remove();
					}
				});
			}
		}
	});
	// Click for Size (NotNeo)
	$('.bbSize').click(function(){
		var text = hasText();
		if(text == null) { return false; }
		var notANumber = true;
		while(notANumber) {
			var givenSize=prompt("Set the size (1-7)");
			if(givenSize == null) { return false; }
			givenSize = parseInt(givenSize, 10);
			if(Number.isInteger(givenSize)) { notANumber = false; } else { alert("Not a number! Try again."); }
		}
		if(givenSize > 7) { givenSize = 7; }
		if(givenSize < 1) { givenSize = 1; }
		if(text!==null && text!==''){shoutMsg.insertAtCaret('[size='+givenSize+']'+text+'[/size]');}
	});
	////////////////////////
	// Insert Function
	////////////////////////
	jQuery.fn.extend({
		insertAtCaret: function(myValue){
			return this.each(function(i) {
				if (document.selection) {
					//For browsers like Internet Explorer
					this.focus();
					var sel = document.selection.createRange();
					sel.text = myValue;
				}
				else if (this.selectionStart || this.selectionStart == '0') {
					//For browsers like Firefox and Webkit based
					var startPos = this.selectionStart;
					var endPos = this.selectionEnd;
					//var scrollTop = this.scrollTop;
					this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
					this.focus();
					this.selectionStart = startPos + myValue.length;
					this.selectionEnd = startPos + myValue.length;
					//this.scrollTop = scrollTop;
				}
				else {
					this.value += myValue;
					this.focus();
				}
			});
		}
	}); //all done

	function beforeSubmit() { //Added option by NotNeo
		if(usingCustomAltToImage) {
		  jQuery.fn.reverse = [].reverse; //setting up the reverse plugin
		  var finalMsg = $("#fakeShout").val();
		  $(".cusSmile").reverse().each(function(){
			  var toReplace = ":" + $(this).attr("alt");
			  var replaceWith = "[img]" + $(this).attr("src") + "[/img]";
			  finalMsg = finalMsg.replace( toReplace, replaceWith);
		  });
		} else { var finalMsg = $("#fakeShout").val(); }
		if(alwaysBold && finalMsg.indexOf("[/b]") < 1){finalMsg = '[b]'+finalMsg+'[/b]';}
		if(alwaysItalic && finalMsg.indexOf("[/i]") < 1){finalMsg = '[i]'+finalMsg+'[/i]';}
		if(alwaysUnderlined && finalMsg.indexOf("[/u]") < 1){finalMsg = '[u]'+finalMsg+'[/u]';}
		if(alwaysUsingFont !== '' && finalMsg.indexOf("[/font]") < 1){finalMsg = '[font='+alwaysUsingFont+']'+finalMsg+'[/font]';}
		if(alwaysUsingSize !== '' && finalMsg.indexOf("[/size]") < 1){finalMsg = '[size='+alwaysUsingSize+']'+finalMsg+'[/size]';}
		if(alwaysUsingAlign !== '' && finalMsg.indexOf("[/align]") < 1){finalMsg = '[align='+alwaysUsingAlign+']'+finalMsg+'[/align]';}
		if(alwaysAutoColor && finalMsg.indexOf("[/color]") < 1){ finalMsg = '[color='+bbColor+']'+finalMsg+'[/color]'; }

		$("#shout_message").val(finalMsg);
		shoutSubmit.click();
		$("#fakeShout").val("");
        //setTimeout(function(){ location.reload(); }, 500);
	}
}
//----------------------------------------------------
//----------------------------------------------------
//});


//Add the minimize buttons and do the things
if(usingHide) {
	//remove some useless spaces
	$("div.myFrame-caption:contains('Notice')").parent().next().next("br").remove();
	$("div.myFrame-caption:contains('Shoutbox'):first").parent().next().next("br").remove();
	$("div.myFrame-caption:contains('Shoutbox'):first").parent().next().next("br").remove();

    $(".myTable").attr("style", "margin-top: 46px;"); //removed pointless whitespace from the top of the page
    $(".w3-navbar.w3-theme-d2.w3-left-align").attr("style", "max-height: 46px;"); //restricted header height
    $(".w3-navbar.w3-theme-d2.w3-left-align > li").find("[title='My Account']").removeClass("w3-padding-large"); //removed large padding from profile pic

	if(usingVisibleSearch) {
		$('[name=\'search\']').parent().wrap('<div class="w3-allerta w3-theme-l1" style="width:65%"></div>');
		$('[name=\'search\']').parent().before('<p style="font-size:2em;">Search</p>');
		$('[name=\'search\']').parent().after('<br>');
        $('[name=\'search\']').removeAttr("size");
        $('[name=\'search\']').attr("style", "float: center; width: 70%; text-align: center");
	}
	if(fullHideNotice){
		$("div.myFrame-caption:contains('Notice')").parent().next().next("br").remove();
		$("div.myFrame-caption:contains('Notice')").parent().remove();
	} else {
		$("div.myFrame-caption:contains('Notice')").find('center').replaceWith('<center><span style="position:relative; left:10px;">Notice</span><a id="hideNotice" style="float:right; color: white; font-size: 30px; position: relative; right: 10px; bottom: 7px;" href="#">-</a></center>');
		if (autoHideNotice) {
			$("div.myFrame-caption:contains('Notice')").next().toggle();
		}
		$('#hideNotice').click(function (e) {
			e.preventDefault();
			$("div.myFrame-caption:contains('Notice')").next().toggle();
		});
	}
	if(fullHideSearch){
		$('input[name=\'search\']').parentsUntil('center').parent().next("br").remove();
		$('input[name=\'search\']').parentsUntil('center').parent().remove();
	} else {
		$('input[name=\'search\']:first').parentsUntil('center').parent().prev().replaceWith('<span><a href="#" id="hideSearch" style="float: right;">>Search<</a></span><br>');
		if (autoHideSearch) {
			$('input[name=\'search\']').parentsUntil('center').parent().toggle();
		}
		$('#hideSearch').click(function (e) {
			e.preventDefault();
			$('input[name=\'search\']').parentsUntil('center').parent().toggle();
		});
	}
	if(fullHideShout){
		$("div.myFrame-caption:contains('Shoutbox'):first").parent().next().next("br").remove();
		$("div.myFrame-caption:contains('Shoutbox'):first").parent().remove();
	} else {
		$("div.myFrame-caption:contains('Shoutbox'):first").find('center').children("span:last").attr("style", "position: relative; left: -55px;");
		$("div.myFrame-caption:contains('Shoutbox'):first").find('center').append('<a id="hideShout" style="float:right;  color: white; font-size: 30px; position: relative; right: 10px; bottom: 7px;" href="#">-</a>');
		if (autoHideShout) {
			$("div.myFrame-caption:contains('Shoutbox'):first").next().toggle();
		}
		$('#hideShout').click(function (e) {
			e.preventDefault();
			$("div.myFrame-caption:contains('Shoutbox'):first").next().toggle();
		});
	}
	if(fullHideMovies && fullHideTV && fullHideMusic && fullHideAnime && fullHideBooks && fullHideComics && fullHideSports){
		$("div.myFrame-caption:contains('Movies'):first").parent().next().remove();
		$("div.myFrame-caption:contains('Movies'):first").parent().remove();
	} else {
		if(fullHideMovies){
			$("div.myFrame-caption:contains('Movies'):first").parent().next().children("br:first").remove();
			$("div.myFrame-caption:contains('Movies'):first").parent().remove();
		} else {
			$("div.myFrame-caption:contains('Movies')").find('center').replaceWith('<center><span style="position:relative; left:10px;">Movies</span><a id="hideMovies" style="float:right; color: white; font-size: 30px; position: relative; right: 10px; bottom: 7px;" href="#">-</a></center>');
			if (autoHideMovies) {
				$("div.myFrame-caption:contains('Movies')").next().toggle();
			}
			$('#hideMovies').click(function (e) {
				e.preventDefault();
				$("div.myFrame-caption:contains('Movies')").next().toggle();
			});
		}
		if(fullHideTV){
			$("div.myFrame-caption:contains('TV'):first").parent().next().children("br:first").remove();
			$("div.myFrame-caption:contains('TV'):first").parent().remove();
		} else {
			$("div.myFrame-caption:contains('TV')").find('center').replaceWith('<center><span style="position:relative; left:10px;">TV</span><a id="hideTV" style="float:right; color: white; font-size: 30px; position: relative; right: 10px; bottom: 7px;" href="#">-</a></center>');
			if (autoHideTV) {
				$("div.myFrame-caption:contains('TV')").next().toggle();
			}
			$('#hideTV').click(function (e) {
				e.preventDefault();
				$("div.myFrame-caption:contains('TV')").next().toggle();
			});
		}
		if(fullHideMusic){
			$("div.myFrame-caption:contains('Music'):first").parent().next().children("br:first").remove();
			$("div.myFrame-caption:contains('Music'):first").parent().remove();
		} else {
			$("div.myFrame-caption:contains('Music')").find('center').replaceWith('<center><span style="position:relative; left:10px;">Music</span><a id="hideMusic" style="float:right; color: white; font-size: 30px; position: relative; right: 10px; bottom: 7px;" href="#">-</a></center>');
			if (autoHideMusic) {
				$("div.myFrame-caption:contains('Music')").next().toggle();
			}
			$('#hideMusic').click(function (e) {
				e.preventDefault();
				$("div.myFrame-caption:contains('Music')").next().toggle();
			});
		}
		if(fullHideAnime){
			$("div.myFrame-caption:contains('Anime'):first").parent().next().children("br:first").remove();
			$("div.myFrame-caption:contains('Anime'):first").parent().remove();
		} else {
			$("div.myFrame-caption:contains('Anime')").find('center').replaceWith('<center><span style="position:relative; left:10px;">Anime</span><a id="hideAnime" style="float:right; color: white; font-size: 30px; position: relative; right: 10px; bottom: 7px;" href="#">-</a></center>');
			if (autoHideAnime) {
				$("div.myFrame-caption:contains('Anime')").next().toggle();
			}
			$('#hideAnime').click(function (e) {
				e.preventDefault();
				$("div.myFrame-caption:contains('Anime')").next().toggle();
			});
		}
		if(fullHideBooks){
			$("div.myFrame-caption:contains('Books'):first").parent().next().children("br:first").remove();
			$("div.myFrame-caption:contains('Books'):first").parent().remove();
		} else {
			$("div.myFrame-caption:contains('Books')").find('center').replaceWith('<center><span style="position:relative; left:10px;">Books</span><a id="hideBooks" style="float:right; color: white; font-size: 30px; position: relative; right: 10px; bottom: 7px;" href="#">-</a></center>');
			if (autoHideBooks) {
				$("div.myFrame-caption:contains('Books')").next().toggle();
			}
			$('#hideBooks').click(function (e) {
				e.preventDefault();
				$("div.myFrame-caption:contains('Books')").next().toggle();
			});
		}
		if(fullHideComics){
			$("div.myFrame-caption:contains('Comics'):first").parent().next().children("br:first").remove();
			$("div.myFrame-caption:contains('Comics'):first").parent().remove();
		} else {
			$("div.myFrame-caption:contains('Comics')").find('center').replaceWith('<center><span style="position:relative; left:10px;">Comics</span><a id="hideComics" style="float:right; color: white; font-size: 30px; position: relative; right: 10px; bottom: 7px;" href="#">-</a></center>');
			if (autoHideComics) {
				$("div.myFrame-caption:contains('Comics')").next().toggle();
			}
			$('#hideComics').click(function (e) {
				e.preventDefault();
				$("div.myFrame-caption:contains('Comics')").next().toggle();
			});
		}
		if(fullHideSports){
			$("div.myFrame-caption:contains('Sports'):first").parent().next().children("br:first").remove();
			$("div.myFrame-caption:contains('Sports'):first").parent().remove();
		} else {
			$("div.myFrame-caption:contains('Sports')").find('center').replaceWith('<center><span style="position:relative; left:10px;">Sports</span><a id="hideSports" style="float:right; color: white; font-size: 30px; position: relative; right: 10px; bottom: 7px;" href="#">-</a></center>');
			if (autoHideSports) {
				$("div.myFrame-caption:contains('Sports')").next().toggle();
			}
			$('#hideSports').click(function (e) {
				e.preventDefault();
				$("div.myFrame-caption:contains('Sports')").next().toggle();
			});
		}
	}
	if(fullHideDisclaimer){
		$("footer").remove();
	} else {
		$("#main").append('<span style="float: left;"><a href="#" id="hideFooter">>Footer<</a></span>');
		if(autoHideDisclaimer) {
			$("footer").toggle();
		}
		$("#hideFooter").click(function(e){
			e.preventDefault()
			$("footer").toggle();
		});
	}
}


//Shoutbox history//-----------------------------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------
if(usingShoutHistory) {
	var place = $(".shoutbox_messageboxback > td:nth-child(3)");

	var thing = ` - <a href="https://worldwidetorrents.to/shoutbox.php?history=1" target="_blank"><small>History</small></a>`;

	place.append(thing);
}
//-----------------------------------------------------------------
//-----------------------------------------------------------------

//Jukebox//--------------------------------------------------------
//-----------------------------------------------------------------
if(usingJukebox) {
    if(!jukeboxOff) {
        if(stickyJukebox) {
            $(".shoutbox_messageboxback").parent().append('<tr><td id="jukeBoxWrap" colspan="3" style="z-index:500; text-align:center; position: fixed; left: 0%; bottom: 0%; width: 100%;"><h3 class="w3-card-4 w3-allerta w3-theme-l1" style="font-size: 20px; padding:5px"><a id="jukeboxOnOff" style="height: 30px; float:left; cursor: pointer;"><img id="jukeboxButtonPic" height="30px" src="https://i.imgur.com/4dWhbtr.png"/></a><input id="autoplayCheckbox" type="checkbox" style="-ms-transform: scale(1.5); -moz-transform: scale(1.5); -webkit-transform: scale(1.5); -o-transform: scale(1.5); margin-top:10px; float:right;"><span style="float:right; padding-top: 2px; margin-right:5px; font-size:17px;">Autoplay</span></input><center>Jukebox</center></h3><div id="jukeBox"></div></td></tr> ');
        } else {
            $(".shoutbox_messageboxback").parent().append('<tr><td id="jukeBoxWrap" colspan="3" style="z-index:500; text-align:center;"><h3 class="w3-card-4 w3-allerta w3-theme-l1 w3-round-large" style="padding: 0px 5px 0px 5px"><a id="jukeboxOnOff" style="height: 30px; float:left; cursor: pointer; padding-top:3px;"><img id="jukeboxButtonPic" height="30px" src="https://i.imgur.com/4dWhbtr.png"/></a><input id="autoplayCheckbox" type="checkbox" style="-ms-transform: scale(1.5); -moz-transform: scale(1.5); -webkit-transform: scale(1.5); -o-transform: scale(1.5); margin-top:10px; float:right;"><span style="float:right; padding-top: 2px; margin-right:5px; font-size:17px;">Autoplay</span></input><center style="margin-left: 100px;">Jukebox</center></h3><div id="jukeBox"></div></td></tr> ');
        }
    } else {
        if(stickyJukebox) {
            $(".shoutbox_messageboxback").parent().append('<tr><td id="jukeBoxWrap" colspan="3" style="z-index:500; text-align:center; position: fixed; left: 0%; bottom: 0%; width: 100%;"><h3 class="w3-card-4 w3-allerta w3-theme-l1" style="font-size: 20px; padding:5px;"><a id="jukeboxOnOff" style="height: 30px; float:left; cursor: pointer;"><img id="jukeboxButtonPic" height="30px" src="https://i.imgur.com/h0Zb2IY.png"/></a><input id="autoplayCheckbox" type="checkbox" style="-ms-transform: scale(1.5); -moz-transform: scale(1.5); -webkit-transform: scale(1.5); -o-transform: scale(1.5); margin-top:10px; float:right;"><span style="float:right; padding-top: 2px; margin-right:5px; font-size:17px;">Autoplay</span></input><center>Jukebox</center></h3><div id="jukeBox"></div></td></tr> ');
        } else {
            $(".shoutbox_messageboxback").parent().append('<tr><td id="jukeBoxWrap" colspan="3" style="z-index:500; text-align:center;"><h3 class="w3-card-4 w3-allerta w3-theme-l1 w3-round-large" style="padding: 0px 5px 0px 5px"><a id="jukeboxOnOff" style="height: 30px; float:left; cursor: pointer; padding-top:3px;"><img id="jukeboxButtonPic" height="30px" src="https://i.imgur.com/h0Zb2IY.png"/></a><input id="autoplayCheckbox" type="checkbox" style="-ms-transform: scale(1.5); -moz-transform: scale(1.5); -webkit-transform: scale(1.5); -o-transform: scale(1.5); margin-top:10px; float:right;"><span style="float:right; padding-top: 2px; margin-right:5px; font-size:17px;">Autoplay</span></input><center style="margin-left: 100px;">Jukebox</center></h3><div id="jukeBox"></div></td></tr> ');
        }
    }
    if(UsingAutoplay) { $("#autoplayCheckbox").attr("checked", true); } else { $("#autoplayCheckbox").attr("checked", false); }
    $("#autoplayCheckbox").change(function() {
        if(UsingAutoplay) {
			UsingAutoplay = false;
		} else {
			UsingAutoplay = true;
		}
        if(autoplayOn) {
			autoplayOn = false;
		} else {
			autoplayOn = true;
		}
        //alert("autoplayOn = "+autoplayOn+" UsingAutoplay = "+UsingAutoplay);
    });
    $("#jukeboxOnOff").click(function() {
        if(!jukeboxOff) { //if it's on, turn it off
            //darken visually or something
            $("#jukeBox").hide(500);
            $("#jukeboxButtonPic").attr("src", "https://i.imgur.com/h0Zb2IY.png");
            jukeboxOff = true;
        } else { //if it's off, turn it on
            $("#jukeBox").show(500);
            $("#jukeboxButtonPic").attr("src", "https://i.imgur.com/4dWhbtr.png");
            jukeboxOff = false;
            forcedLoad = true;
            document.getElementById('shout_frame').contentWindow.location.reload(true);
        }
    });
}
//-----------------------------------------------------------------
//-----------------------------------------------------------------

//Shoutbox Smileys Functions//----------------------------------------
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// needed for getting selected text
function getSelectedText(){
  var textComponent = document.getElementById("fakeShout");
  var startPos = textComponent.selectionStart;
  var endPos = textComponent.selectionEnd;
  return textComponent.value.substring(startPos, endPos);
}
// for prompt if no selected text
function hasText(){
  var text = getSelectedText();
  if(text === ''){text = prompt('Please Enter Text');}
  return text;
}

function addToJukeBox(videoCode, jukeboxPlaylist = false) {
    if(collectedCodes.indexOf(videoCode) > 0)  { //if video code found, don't add it
        return false;
    } else {
        collectedCodes += "." + videoCode;
        if(jukeboxPlaylist) {
            $("#jukeBox").prepend(' <div style="display: inline-block; width: '+emViHeight*1.78+'px; height: '+emViHeight+'px; padding-left: 10px; padding-top: 5px; padding-bottom: 5px; padding-right: 0px;"><iframe style="min-height: 0px; min-height: 0px; height:100%;" src="https://www.youtube.com/embed?listType=playlist&list='+videoCode+'" frameborder="1" allowfullscreen="1"></iframe></div><input width="15px" height="15px" style="display: inline-block; position: relative; bottom: '+(emViHeight-25)+'px;" title="Remove video on the left from the Jukebox." class="removeVid" src="https://i.imgur.com/HLgOB2l.png" type="image">');
        } else {
            //fallback for missing autoplayOn (definitelly not good practice, but whatever, I'll probably fix it properly later)
            if (autoplayOn == null) {
                var autoplayOn = UsingAutoplay ? true : false;
            }
            if(autoplayOn) {
                $("#jukeBox").prepend(' <div style="display: inline-block; width: '+emViHeight*1.78+'px; height: '+emViHeight+'px; padding-left: 10px; padding-top: 5px; padding-bottom: 5px; padding-right: 0px;"><iframe style="min-height: 0px; min-height: 0px; height:100%;" src="https://www.youtube.com/embed/'+videoCode+'?controls=1&modestbranding=1&autoplay=1" frameborder="1" allowfullscreen="1"></iframe></div><input width="15px" height="15px" style="display: inline-block; position: relative; bottom: '+(emViHeight-25)+'px;" title="Remove video on the left from the Jukebox." class="removeVid" src="https://i.imgur.com/HLgOB2l.png" type="image">');
            } else {
                $("#jukeBox").prepend(' <div style="display: inline-block; width: '+emViHeight*1.78+'px; height: '+emViHeight+'px; padding-left: 10px; padding-top: 5px; padding-bottom: 5px; padding-right: 0px;"><iframe style="min-height: 0px; min-height: 0px; height:100%;" src="https://www.youtube.com/embed/'+videoCode+'?controls=1&modestbranding=1" frameborder="1" allowfullscreen="1"></iframe></div><input width="15px" height="15px" style="display: inline-block; position: relative; bottom: '+(emViHeight-25)+'px;" title="Remove video on the left from the Jukebox." class="removeVid" src="https://i.imgur.com/HLgOB2l.png" type="image">');
            }
        }

		var videosInJukebox = $("#jukeBox > input").length;
		if(videosInJukebox > jukeboxLimit) {
			$("#jukeBox > input:last").prev().remove();
			$("#jukeBox > input:last").remove();
		}

        $(".removeVid").click(function(){
            $(this).prev().remove();
            $(this).remove();
        });
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
function updateOnlineUsers(){
    //alert("start");
	$.ajax({
	   url:'https://worldwidetorrents.to/forums.php',
	   type:'GET',
	   dataType: 'text', //can't seem to get proper jquery traversal to work here for some reason, so using text strings instead.
	   success: function(data){
		   let guestCount = data.split("<center>Online Users in the past 15 minutes:<b> ")[1].split("</b>")[0];
           let memberCount = data.split("<center>Online Users in the past 15 minutes:<b> ")[1].split("<b>")[1].split("</b>")[0];
           $("#onlineUserSpan").html("<span>Online Users: "+guestCount+" Guests, "+memberCount+" Members</span>");
	   }
	});
}
/*
function reloadLatestForum(){
	$.ajax({
	   url:'https://worldwidetorrents.to/home.php',
	   type:'GET',
	   dataType: 'text', //can't seem to get proper jquery traversal to work here for some reason, so using strings instead.
	   success: function(data){
		   var newForumContent = data.split('Add Blog</button></a><input type=hidden name=class value=></form></center></center>\n</div><br><div class="w3-card-2 w3-round w3-white w3-padding-large">')[1].split('</div>')[0];
		   $("td[valign='top'] > .w3-card-2.w3-round.w3-white.w3-padding-large:eq(1)").html(newForumContent);
	   }
	});
}
*/
function color_from_hue(hue) {
  var h = hue/60;
  var c = 255;
  var x = (1 - Math.abs(h%2 - 1))*255;
  var color;

  var i = Math.floor(h);
  if (i == 0) color = rgb_to_hex(c, x, 0);
  else if (i == 1) color = rgb_to_hex(x, c, 0);
  else if (i == 2) color = rgb_to_hex(0, c, x);
  else if (i == 3) color = rgb_to_hex(0, x, c);
  else if (i == 4) color = rgb_to_hex(x, 0, c);
  else color = rgb_to_hex(c, 0, x);

  return color;
}

function rgb_to_hex(red, green, blue) {
  var h = ((red << 16) | (green << 8) | (blue)).toString(16);
  // add the beginning zeros
  while (h.length < 6) h = '0' + h;
  return '#' + h;
}

function hexToRGB(hex) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
	var myArray = new Array(3);
	myArray[0] = r;
	myArray[1] = g;
	myArray[2] = b;
	return myArray;
}

//var end = +new Date();// log end timestamp
//var diff = end - start;
//
//window.alert(diff);
//
//document.title=' FPI + ' + diff + ' ms.................. ' + window.location.href.slice(29,222) + ' ...';