// ==UserScript==
// @name         Panda Crazy <---> Overwatch (Panda Crazy Liason) [ROLE: SERVER/CHILD]
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Plants into Panda Crazy. Sends messages to Overwatch and takes the appropriate actions within Panda Crazy for messages received from Overwatch.
// @author       salembeats (Cuyler Stuwe)
// @include      https://www.mturk.com/mturk/welcome?pandacrazy*
// @include      https://worker.mturk.com/?filters[search_term]=pandacrazy=on
// @icon         https://i.imgur.com/AXkYfFV.jpg
// @grant        none
// ==/UserScript==

// Kill alerts.
alert = function() {};

// Kill console.
// console.log = function() {};
// console.error = function() {};
// console.dir = function() {};
// console.info = function() {};

// Messaging parameters.
const MSG_ASK_RESPOND_WHEN_READY = {messageType: "handshake", detail: "respond when ready"};
const MSG_REPLY_READY = {messageType: "handshake", detail: "ready"};
const MSG_REPLY_WILL_REPLY_WHEN_READY = {messageType: "handshake", detail: "will reply when ready"};
const ORIGIN_ANY = "*";

// Console styles.
const NETWORKING_CONSOLE_COLOR_CSS = "color: white; background: green;";
const SALEMBEATS_CONSOLE_COLOR_CSS = "color: white; background: blue;";

// Keycodes.
const KEYCODE_ESCAPE = 27;

var PandaCrazyStatus = (function() {

	var ready = false;

	function isReady() {return ready;}
	function setReady() {ready = true;}

	return {
		isReady,
		setReady
	};
})();

var OverwatchStatus = (function() {

	var ready = false;
	var windowHandle;
	var readyCallback = function() {};
	var hasReadyCallbackRun = false;

	function isReady() {return ready;}
	function setReady() {
		ready = true;
		if(!hasReadyCallbackRun) {
			readyCallback();
			hasReadyCallbackRun = true;
		}
	}
	function onReady(func) {readyCallback = func;}
	function setWindowHandle(handle) {
		if(windowHandle === undefined) {
			windowHandle = handle;
		}
		else {
			console.error("Tried to set Overwatch window handle when it was already set up.");
		}
	}
	function getWindowHandle() {
		if(windowHandle === undefined) {console.error("Tried to grab an undefined Overwatch window handle.");}
		return windowHandle;
	}

	return {
		isReady,
		setReady,
		onReady,
		setWindowHandle,
		getWindowHandle
	};

})();

function doUserTriggeredTests() {
	console.log("%cDoing user-triggered tests.", SALEMBEATS_CONSOLE_COLOR_CSS);
	let testModule = findHITModuleByGroupID("3K3X4GGOSLN9WHITSDB41LMDI6SMCK");
	hitModuleSetCollectStatus(testModule, !isHITModuleCollecting(testModule));
}

function findHITModuleByGroupID(groupID) {

	let allHITModules = document.querySelectorAll("div[id*='JRCellNum_']");

	for(let currentHITModule of allHITModules) {
		let currentHITTitleText = currentHITModule.querySelector(".myTitle.hasTooltip").title.trim();
		if( currentHITTitleText.endsWith(groupID) ) {return currentHITModule;}
	}

	return undefined;
}

// Let's not break the software over a stupid capitalization typo.
function isHitModuleCollecting(hitModule) {
	return isHITModuleCollecting(hitModule);
}

function isHITModuleCollecting(hitModule) {
    if(hitModule === undefined) {return undefined;}
	let hitModuleCollectButtonCollecting = hitModule.querySelector(".nonselectable.JRCollectButton.JRButton.JRMButton.hasHelptip[style*='color: rgb(255, 255, 255);']");
	return Boolean(hitModuleCollectButtonCollecting);
}

function hitModuleClickCollectButton(hitModule) {

    if(hitModule === undefined) {return undefined;}
	let hitModuleCollectButton = hitModule.querySelector(".nonselectable.JRCollectButton.JRButton.JRMButton.hasHelptip");
	hitModuleCollectButton.click();

}

function hitModuleSetCollectStatus(hitModule, isCollectWanted) {
    if(hitModule === undefined) {return undefined;}
	if(isHITModuleCollecting(hitModule)) {
		if(!isCollectWanted) {hitModuleClickCollectButton(hitModule);}
	}
	else {
		if(isCollectWanted) {hitModuleClickCollectButton(hitModule);}
	}
}

function handleDocumentMutation(mutationRecords, observerInstance) {
	// This will react to all of the changes in the DOM that Overwatch goes through.
	console.info("DOM Changed");
	for(let mutationRecord of mutationRecords) {
		handleIndividualMutationRecord(mutationRecord);
	}
}

function handleIndividualMutationRecord(record) {
	switch(record.type) {
		case "attributes":
			handleAttributeMutation(record);
			break;
		case "childList":
			handleChildListMutation(record);
			break;
		default:
			console.error("Mutation record problem!");
	}
}

function handleAttributeMutation(record) {
	// Update our Overwatch status based on relevant attributes which have changed.
	console.log(`Attribute mutation detected.`);
}

function handleChildListMutation(record) {
	// Update our Overwatch status based on relevant child nodes which have been added or deleted.
	console.log(`Child list mutation detected in ${record.target.id}.`);

	switch(record.target.id) {
		case "ui-id-7":
			if(!PandaCrazyStatus.isReady()) {
				PandaCrazyStatus.setReady();
				OverwatchStatus.getWindowHandle().postMessage(MSG_REPLY_READY, ORIGIN_ANY);
			}
			break;
		default:
			console.error(`We don't have a handler for child list mutations for ${record.target.id}`);
			break;
	}
}

(function main() {
	'use strict';

	var overwatchOpenerWindow = window.opener;
	if(overwatchOpenerWindow === undefined) {return;}
	OverwatchStatus.setWindowHandle(overwatchOpenerWindow);

	var documentObserver = new MutationObserver(handleDocumentMutation);
	documentObserver.observe(document.body, { childList : true, subtree : true, attributes : true});

	window.addEventListener('message', handleMessage);

	document.addEventListener('keydown', e => {if(e.keyCode === KEYCODE_ESCAPE) doUserTriggeredTests();} );
})();

function handleHandshake(message) {
	if(message.hasOwnProperty("detail")) {
		if(message.detail === "respond when ready") {
			console.log("%cMSG RCVD: [respond when ready]", NETWORKING_CONSOLE_COLOR_CSS);
			if(PandaCrazyStatus.isReady()) {
				OverwatchStatus.getWindowHandle().postMessage(MSG_REPLY_READY,
															  ORIGIN_ANY);
			}
			else {
				OverwatchStatus.getWindowHandle().postMessage(MSG_REPLY_WILL_REPLY_WHEN_READY,
															  ORIGIN_ANY);
			}
		}
		else if(message.detail === "ready") {
			console.log("%cMSG RCVD: [ready]", NETWORKING_CONSOLE_COLOR_CSS);
			OverwatchStatus.setReady();
		}
		else {
			console.error(`Panda Crazy Liason received a handshake message it didn't understand. Detail (${message.detail}) not understood.`);
		}
	}
	else {
		console.error("Panda Crazy Liason received a handshake message it didn't understand. Detail was expected but doesn't exist.");
	}
}

function handleUndefinedMessageType(message) {
	console.error(`Panda Crazy Liason received a message type it didn't understand. (${message.messageType})`);
}

function handlePandasMessage(message) {
	if(message.hasOwnProperty("detail")) {
		console.dir(message.detail);
		let groupIDList = message.detail;
		for(let groupID of groupIDList) {
			hitModuleSetCollectStatus(findHITModuleByGroupID(groupID), true);
		}
	}
	else {
		console.error("Received a pandas message with no details.");
	}
}

function handleMessage(event) {
	let receivedMessage = event.data;
	if(receivedMessage.hasOwnProperty("messageType")) {
		switch(receivedMessage.messageType) {
			case "handshake":
				handleHandshake(receivedMessage);
				break;
			case "pandas":
				handlePandasMessage(receivedMessage);
				break;
			default:
				handleUndefinedMessageType(receivedMessage);
				break;
		}
	}
	else {
		console.error("Panda Crazy Liason received a message it didn't understand.");
	}
}