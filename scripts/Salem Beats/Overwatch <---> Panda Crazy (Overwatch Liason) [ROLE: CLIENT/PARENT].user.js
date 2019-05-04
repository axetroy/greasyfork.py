// ==UserScript==
// @name         Overwatch <---> Panda Crazy (Overwatch Liason) [ROLE: CLIENT/PARENT]
// @namespace    salembeats
// @version      1
// @description  Plants into Overwatch. Sends messages to Panda Crazy and takes the appropriate actions within Overwatch for messages received from Panda Crazy.
// @author       salembeats (Cuyler Stuwe)
// @include      https://worker.mturk.com/overwatch
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

// URL and window opening parameters.
const OLD_PANDA_CRAZY_URL = "http://www.mturk.com/mturk/welcome?pandacrazy=on";
const NEW_PANDA_CRAZY_URL = "http://worker.mturk.com/?filters[search_term]=pandacrazy=on";
const CHILD_WINDOW_NAME = "Opened-by-Overwatch";

// Messaging parameters.
const MSG_ASK_RESPOND_WHEN_READY = {messageType: "handshake", detail: "respond when ready"};
const MSG_REPLY_READY = {messageType: "handshake", detail: "ready"};
const MSG_REPLY_WILL_REPLY_WHEN_READY = {messageType: "handshake", detail: "will reply when ready"};
const ORIGIN_ANY = "*";

// Console styles.
const NETWORKING_CONSOLE_COLOR_CSS = "color: white; background: green;";
const SALEMBEATS_CONSOLE_COLOR_CSS = "color: white; background: blue;";

// DOM id parameters.
const HIT_LIST_ID = "rightWindow";

// Keycodes.
const KEYCODE_ESCAPE = 27;

var PandaCrazyStatus = (function() {

	var ready = false;
	var readyCallback = function() {};
	var hasReadyCallbackRun = false;
	var windowHandle;

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
			console.error("Tried to set Panda Crazy window handle when it was already set up.");
		}
	}
	function getWindowHandle() {
		if(windowHandle === undefined) {console.error("Tried to grab an undefined Panda Crazy window handle.");}
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

var OverwatchStatus = (function() {

	var ready = false;

	var foundHITGroupIDs = [];

	function isReady() {return ready;}
	function setReady() {ready = true;}
	function updateFoundGroupIDs() {
		foundHITGroupIDs = [];
		let foundGroupIDNodes = document.querySelectorAll(".logBox div a[href*='tasks/accept_random?']");
		for(let groupIDNode of foundGroupIDNodes) {
			let groupIDNodeParentDiv = groupIDNode.parentElement.parentElement.parentElement;
			let groupIDValue = groupIDNodeParentDiv.id.substr(2);
			foundHITGroupIDs.push(groupIDValue);
		}
	}
	function getFoundGroupIDs() {return foundHITGroupIDs;}

	return {
		updateFoundGroupIDs,
		getFoundGroupIDs,
		isReady,
		setReady,
	};

})();

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
		case "leftWindow":
			if(!OverwatchStatus.isReady()) {
				OverwatchStatus.setReady();
				PandaCrazyStatus.getWindowHandle().postMessage(MSG_REPLY_READY, ORIGIN_ANY);
			}
			break;
		case HIT_LIST_ID:
			handleHITListMutation(record);
			break;
		default:
			console.error(`We don't have a handler for child list mutations for ${record.target.id}`);
			break;
	}
}

function handleHITListMutation(record) {
	console.log("Hit list mutation detected.");
	OverwatchStatus.updateFoundGroupIDs();

	if(PandaCrazyStatus.isReady()) {
		PandaCrazyStatus.getWindowHandle().postMessage({messageType: "pandas", detail: OverwatchStatus.getFoundGroupIDs()},
													   ORIGIN_ANY);
	}
}

function doUserTriggeredTests() {
	// console.log("%cDoing user-triggered tests.", SALEMBEATS_CONSOLE_COLOR_CSS);

	// PandaCrazyStatus.getWindowHandle().postMessage(MSG_ASK_RESPOND_WHEN_READY,
	//											   ORIGIN_ANY);

	console.dir(OverwatchStatus.getFoundGroupIDs());
}

(function main() {
	'use strict';

	PandaCrazyStatus.onReady( () => alert("Panda Crazy says it's ready!") );

	var documentObserver = new MutationObserver(handleDocumentMutation);
	documentObserver.observe(document.body, { childList : true, subtree : true, attributes : true});

	window.addEventListener('message', handleMessage);

	var pandaCrazyURL = NEW_PANDA_CRAZY_URL;
	var pandaCrazyChild = window.open(pandaCrazyURL, CHILD_WINDOW_NAME);

	PandaCrazyStatus.setWindowHandle(pandaCrazyChild);

	PandaCrazyStatus.getWindowHandle().postMessage(MSG_ASK_RESPOND_WHEN_READY,
												   ORIGIN_ANY);

	document.addEventListener('keydown', e => {if(e.keyCode === KEYCODE_ESCAPE) doUserTriggeredTests();} );

})();

function handleHandshake(message) {
	if(message.hasOwnProperty("detail")) {
		if(message.detail === "ready") {
			console.log("%cMSG RCVD: [ready]", NETWORKING_CONSOLE_COLOR_CSS);
			PandaCrazyStatus.setReady();
		}
		else if(message.detail === "will reply when ready") {
			console.log("%cMSG RCVD: [will reply when ready]", NETWORKING_CONSOLE_COLOR_CSS);
		}
		else {
			console.error(`Overwatch Liason received a handshake message it didn't understand. Detail (${message.detail}) not understood.`);
		}
	}
	else {
		console.error("Overwatch Liason received a handshake message it didn't understand. Detail was expected but doesn't exist.");
	}
}

function handleUndefinedMessageType(message) {
	console.error(`Overwatch Liason received a message type it didn't understand. (${message.messageType})`);
}

function handleMessage(event) {
	let receivedMessage = event.data;
	if(receivedMessage.hasOwnProperty("messageType")) {
		switch(receivedMessage.messageType) {
			case "handshake":
				handleHandshake(receivedMessage);
				break;
			default:
				handleUndefinedMessageType(receivedMessage);
				break;
		}
	}
	else {
		console.error("Overwatch Liason received a message it didn't understand.");
	}
}