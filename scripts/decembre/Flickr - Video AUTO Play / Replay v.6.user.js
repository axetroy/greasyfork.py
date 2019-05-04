// ==UserScript==
// @name          Flickr - Video AUTO Play / Replay v.6
// @version       v.6.01
// @description	  Video Auto Play and Replay (author of the Library in use: Brock Adams)
//
// @namespace https://greasyfork.org/fr/users/8-decembre?sort=updated

// @include   https://www.flickr.com/photos/*

// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @autor      Brock Adams
// @autor      decembre

// @grant      GM_addStyle

// ==/UserScript==

// FROM a script of Brock Adams (Thanks to him!)
// in stackoverflow : 
// http://stackoverflow.com/questions/12252701/how-do-i-click-on-this-button-with-greasemonkey?lq=1
// with :
// https://gist.github.com/raw/2625891/waitForKeyElements.js

/*- The @grant directive is needed to work around a major design change
introduced in GM 1.0.
It restores the sandbox.
*/


/*--- waitForKeyElements(): 

FIND IT HERE :
https://gist.github.com/raw/2625891/waitForKeyElements.js

A utility function, for Greasemonkey scripts,
that detects and handles AJAXed content.

Usage example:

waitForKeyElements (
"div.comments"
, commentCallbackFunction
);

//--- Page-specific function to do what we want when the node is found.
function commentCallbackFunction (jNode) {
jNode.text ("This comment changed by waitForKeyElements().");
}

IMPORTANT: This function requires your script to have loaded jQuery.
*/
function waitForKeyElements (
selectorTxt, /* Required: The jQuery selector string that
specifies the desired element(s).
*/
actionFunction, /* Required: The code to run when elements are
found. It is passed a jNode to the matched
element.
*/
bWaitOnce, /* Optional: If false, will continue to scan for
new elements even after the first match is
found.
*/
iframeSelector /* Optional: If set, identifies the iframe to
search.
*/
) {
var targetNodes, btargetsFound;

if (typeof iframeSelector == "undefined")
targetNodes = $(selectorTxt);
else
targetNodes = $(iframeSelector).contents ()
.find (selectorTxt);

if (targetNodes && targetNodes.length > 0) {
btargetsFound = true;
/*--- Found target node(s). Go through each and act if they
are new.
*/
targetNodes.each ( function () {
var jThis = $(this);
var alreadyFound = jThis.data ('alreadyFound') || false;

if (!alreadyFound) {
//--- Call the payload function.
var cancelFound = actionFunction (jThis);
if (cancelFound)
btargetsFound = false;
else
jThis.data ('alreadyFound', true);
}
} );
}
else {
btargetsFound = false;
}

//--- Get the timer-control variable for this selector.
var controlObj = waitForKeyElements.controlObj || {};
var controlKey = selectorTxt.replace (/[^\w]/g, "_");
var timeControl = controlObj [controlKey];

//--- Now set or clear the timer as appropriate.
if (btargetsFound && bWaitOnce && timeControl) {
//--- The only condition where we need to clear the timer.
clearInterval (timeControl);
delete controlObj [controlKey]
}
else {
//--- Set a timer, if needed.
if ( ! timeControl) {
timeControl = setInterval ( function () {
waitForKeyElements ( selectorTxt,
actionFunction,
bWaitOnce,
iframeSelector
);
},
300
);
controlObj [controlKey] = timeControl;
}
}
waitForKeyElements.controlObj = controlObj;
}



//--- Note that contains() is CASE-SENSITIVE.
//waitForKeyElements ("a.simplebutton:contains('follow')", clickOnFollowButton);
// .view-all-contexts-of-type>a


// Flickr Auto Video Play
// .vjs-big-play-button
// .vjs-play-control.vjs-control.vjs-button.vjs-paused
// FROM : Greasemonkey script to automatically replay finshed songs in youtube 
// https://gist.github.com/aniket91/7d1da89190beb1446a3c7bcf53b181b7

/*
waitForKeyElements (".vjs-big-play-button", clickPlay);
function clickPlay (jNode) {
    var clickEvent  = document.createEvent ('MouseEvents');
    clickEvent.initEvent ('click', true, true);
    jNode[0].dispatchEvent (clickEvent);
};

*/
	
(function(){
function actionBigPlay(node){
console.log ("Found play Big button. Clicking it!");
//node.click();
var clickEvent = document.createEvent ('MouseEvents');
clickEvent.initEvent ('click', true, true);
node[0].dispatchEvent (clickEvent);
return true;
}
console.log ("Waiting for play Big button");
//waitForKeyElements(".vjs-big-play-button", actionPlay);
//waitForKeyElements(".video-js:not(.vjs-playing):not(.vjs-paused):not(.vjs-has-started):not(.vjs-ended) .vjs-big-play-button", actionBigPlay);
waitForKeyElements(".video-js.vjs-controls-enabled.vjs-workinghover.vjs-paused:not(.vjs-has-started)  .vjs-big-play-button", actionBigPlay);
})();

(function(){
function actionPlay(node){
console.log ("Found play button. Clicking it!");
//node.click();
var clickEvent = document.createEvent ('MouseEvents');
clickEvent.initEvent ('click', true, true);
node[0].dispatchEvent (clickEvent);
return true;
}
console.log ("Waiting for play button");
//waitForKeyElements(".vjs-big-play-button", actionPlay);
waitForKeyElements(".vjs-play-control.vjs-control.vjs-button:not(.vjs-playing):not(.vjs-paused)", actionPlay);
})();
(function(){
function actionReplay(node){
console.log ("Found replay button. Clicking it!");
//node.click();
var clickEvent = document.createEvent ('MouseEvents');
clickEvent.initEvent ('click', true, true);
node[0].dispatchEvent (clickEvent);
return true;
}
// title="Pause" or title="Play Video" - REPLAY :.vjs-ended
console.log ("Waiting for replay button");
waitForKeyElements(".vjs-play-control.vjs-control.vjs-button.vjs-ended", actionReplay);
})();