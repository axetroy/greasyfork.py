// ==UserScript==
// @name         prnt.sc/lighshot - copy screen shot link
// @version      1.3
// @description  add a button to copy the image link quickly
// @author       slothbear
// @namespace    https://greasyfork.org/users/64880
// @include      http*://prnt.sc/*
// @grant        GM_setClipboard
// @grant        GM_notification


// ==UserScript==
// @run-at        document-start
// ==/UserScript==

//fun little picture to click on
const COPY_IMAGE = "data:image/png;base64,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";


function imagePage(screenshot) {
	let link = getImageLink(screenshot);
	let copyImage = addCopyImageElement();
	clickListener(copyImage, link);
}

function getImageLink(screenshot) {
	let imageLink = screenshot.src;
	return imageLink;
}

function addCopyImageElement() {
	var copyImage = document.createElement('img');
	copyImage.id = 'copyLinkImage';
	copyImage.src = COPY_IMAGE;

	let screenshotBox = document.getElementsByClassName('image-constrain')[0];
	insertAfter(copyImage, screenshotBox);
	return copyImage;
}

function insertAfter(newNode, referenceNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function clickListener(copyImage, link) {
	copyImage.addEventListener("click", function() {
		GM_setClipboard(link);
		let notificationDetails = getNotificationDetails(link);
		GM_notification(notificationDetails);
	});
}

function getNotificationDetails(link){
	let notificationDetails={
		text:     link,
		title:    'Image Link Copied.',
		timeout:  500
	};
	return notificationDetails;
}



//run script after neccessary elements are loaded.
//sometimes the site load extraneous elements slowly.
function watchForLoad() {
	let pageloadWatcher = setInterval(function(){
		let screenshot = document.getElementById('screenshot-image');
		let footer = document.getElementsByClassName('page-contsrain')[0];
		if (!screenshot && !footer) return false;
		clearInterval(pageloadWatcher);
		imagePage(screenshot);
	}, 100);
}


(function() {

	watchForLoad();

})();
