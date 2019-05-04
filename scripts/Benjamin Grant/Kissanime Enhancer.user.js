// ==UserScript==
// @icon          http://kissanime.com/Content/images/favicon.ico
// @namespace     http://benjamingrant.cf/
// @name          Kissanime Enhancer
// @version       0.7
// @include       http*://kissanime.com/*
// @grant         none
// @author        GRA0007
// @grant	      GM_registerMenuCommand
// @grant	      GM_setValue
// @grant	      GM_getValue
// @description   Style's and removes the ads of Kissanime
// ==/UserScript==

GM_registerMenuCommand("Kissanime Enhancer",function() { openSettings(); });
$('#menu_box').append('<a href="javascript:console.log(\'Open settings\');" id="kissEnhancer">&nbsp;&nbsp;<img style="height:16px; width:16px;" src="http://floatingcube.web44.net/more/kissEnhancer/settings.svg">&nbsp;Kissanime Enhancer</a>');
$('#navcontainer > ul').append('<li id="kissanimeEnhancerSettingsTab"><a rel="nofollow" target="_blank" href="javascript:console.log(\'Open settings\');">KissEnhancer</a></li>');
$('#menu_box').on('click', '#kissEnhancer', function() {
    openSettings();
});
$('#navcontainer > ul').on('click', '#kissanimeEnhancerSettingsTab', function() {
    openSettings();
});

//INIT
if (GM_getValue("kissEnhancerAds") == undefined) {
    GM_setValue("kissEnhancerAds", "true");
}
if (GM_getValue("kissEnhancerMaterial") == undefined) {
    GM_setValue("kissEnhancerMaterial", "true");
}

//DEFINITIONS
function clickLinkWithText (linkText) {
    var targetLink = $("a:contains('" + linkText + "')");
    if (targetLink.length) {
        triggerMouseEvent (targetLink[0], "click");
    }
}

function triggerMouseEvent (node, eventType) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent (eventType, true, true);
    node.dispatchEvent (clickEvent);
}

function openSettings() {
    $('body').append("<div id='kissEnhancerSettings' style='display:none; z-index:99999999999999; position:fixed; top:0; left:0; height:100vh; width:100vw; background-color:rgba(0,0,0,0.5);'><div id='kissEnhancerInner' style='position:fixed; height:200px; width:400px; top:50vh; left:50vw; margin-top:-100px; margin-left:-200px; background-color:#FFF; border-radius:3px; box-sizing:border-box; -moz-box-sizing:border-box; padding:20px;'><span style='display:block; font-family:Roboto, Arial; color:#000; font-size:30px; margin-bottom:25px; font-weight:bold; text-align:center;'>Kissanime Enhancer</span><input id='kissEnhancerMaterial' type='checkbox' /><label for='kissEnhancerMaterial' style='font-size:24px; font-family:Roboto, Arial; color:#000;'>Material Design</label><br /><br /><input id='kissEnhancerAds' type='checkbox' /><label for='kissEnhancerAds' style='font-size:24px; font-family:Roboto, Arial; color:#000;'>Hide ads</label><br /><br /><br /><center><button type='button' style='border:0; background-color:#8BC34A; padding:5px 10px; font-size:18px; font-family:Roboto, Arial; cursor:pointer; border-radius:2px; color:#FFF;' id='kissEnhancerClose'>Save</button></center></div></div>");
    if (GM_getValue("kissEnhancerMaterial") == 'true') {
        $('#kissEnhancerMaterial').attr('checked', 'checked');
    }
    if (GM_getValue("kissEnhancerAds") == 'true') {
        $('#kissEnhancerAds').attr('checked', 'checked');
    }
    $('#kissEnhancerSettings').fadeIn();
}

$('body').on('click', '#kissEnhancerClose', function() {
    if ($('#kissEnhancerMaterial').attr('checked') !== undefined && $('#kissEnhancerMaterial').attr('checked') !== false) {
        GM_setValue("kissEnhancerMaterial", "true");
    } else {
        GM_setValue("kissEnhancerMaterial", "false");
    }
    if ($('#kissEnhancerAds').attr('checked') !== undefined && $('#kissEnhancerAds').attr('checked') !== false) {
        GM_setValue("kissEnhancerAds", "true");
    } else {
        GM_setValue("kissEnhancerAds", "false");
    }
    $('#kissEnhancerSettings').fadeOut(function() {
        location.reload();
    });
});

//HIDE ADS
if (GM_getValue("kissEnhancerAds") == 'true') {
    setTimeout (clickLinkWithText, 333, "Hide");
    setTimeout (clickLinkWithText, 444, "Hide");
    setTimeout (clickLinkWithText, 555, "Hide");
    setTimeout (clickLinkWithText, 666, "Hide");
    setTimeout (clickLinkWithText, 777, "Hide");
    $("#divFloatLeft").remove();
    $("#divFloatRight").remove();
    $("#divAds").remove();
    $("#divAds2").remove();
    $("#adsIfrme2").remove();
}
if (GM_getValue("kissEnhancerMaterial") == 'true') {
    $('head link[href="http://kissanime.com/Content/css/tpl_style.css?v=5"]').attr('href', 'http://floatingcube.web44.net/more/kissEnhancer/style.css');
}