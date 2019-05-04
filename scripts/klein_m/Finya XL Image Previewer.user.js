// ==UserScript==
// @name           Finya XL Image Previewer
// @include        http://*.finya.de/*
// @description    Preview Finya userimages without leaving a trace in the "last visited by" section of that user
// @version 4.00
// @namespace      https://greasyfork.org/users/8629
// ==/UserScript==

var allIMGs, thisIMG, xTop, leftOffset, topOffset;
matchRegEx = /_1[0-2].jpg/i; // Identifies image sources for small images
replaceString = '_4.jpg' // Replacement so we can find the large images
leftOffset = 20; // X-axis offset to the mouse pointer
topOffset = -50; // Y-axis offset to the mouse pointer
borderWidth = 1; // Large image border width
toWatch = new Array('appstage','content','sidebar','list-online','searchbar-wrapper','voting-history-wrapper','header-content'); // Elements which have dynamic img content
toWatchClasses = new Array('userpic','searchbar-thumb'); // Image style classes containing relevant images
toWatchParentClasses = new Array('morepics'); // Style classes of parent elements containing relevant images
imgCache = new Object(); // Used for pre-loading images

// Event functions
function animate (e, tagetXL) {
    xTop = (document.documentElement.scrollTop || document.body.scrollTop); // cross-browser top
    
	// horizontal position	
	if ((e.pageX + leftOffset + (2 * borderWidth))>(document.documentElement.clientWidth + document.documentElement.scrollLeft - targetXL.width)) {
		if ((e.pageX + (2 * borderWidth) + 2)<(document.documentElement.clientWidth + document.documentElement.scrollLeft - targetXL.width)) {
			targetXL.style.left = document.documentElement.clientWidth + document.documentElement.scrollLeft - targetXL.width - (2 * borderWidth) + 'px';
		} else {
			targetXL.style.left = e.pageX - targetXL.width - leftOffset + 'px';
		}
	} else {
		targetXL.style.left = e.pageX + leftOffset + 'px';
	}

	// vertical position	
	if ((e.pageY - topOffset + (2 * borderWidth))>(document.documentElement.clientHeight + xTop)) {
		targetXL.style.top = document.documentElement.clientHeight + xTop - targetXL.height - (2 * borderWidth) + 'px';
	} else if ((e.pageY - targetXL.height - topOffset)<xTop) {
		targetXL.style.top = xTop + 'px';
	} else {
		targetXL.style.top = e.pageY - targetXL.height - topOffset + 'px';
	}
}

function mouseOver(e) {
    targetXL = document.getElementById('ImgElem');
	if (targetXL.src != this.getAttribute('targetSrc')) {
		targetXL.src = this.getAttribute('targetSrc');
	}
	animate (e, targetXL);

	targetXL.style.display='block';
}

function mouseMove(e) {
	targetXL = document.getElementById('ImgElem');
	if (targetXL.src != this.getAttribute('targetSrc')) {
		targetXL.src = this.getAttribute('targetSrc');
	}
	
	animate (e, targetXL);
}

function mouseOut() {
	document.getElementById('ImgElem').style.display='none';
	document.getElementById('ImgElem').src='';
}

// Add big-sized preview images for all small preview images
function addPrvImg() {
	var smallIMGs = new Array();
	var usedIMGs = new Array();
	
	// identify all relevant small images
	// a) search for images via their classes
	for (var i = 0; i < toWatchClasses.length; i++) {
		var possibleImages = document.getElementsByClassName(toWatchClasses[i]);

		for (var j = 0; j < possibleImages.length; j++) {
			if (possibleImages[j].nodeName == 'IMG' && possibleImages[j].src.search(matchRegEx)>0) {
				smallIMGs.push(possibleImages[j]);
			}
		}
	}
	
	// b) search for images via their parents' classes
	for (var i = 0; i < toWatchClasses.length; i++) {
		possibleParents = document.getElementsByClassName(toWatchParentClasses[i]);

		for (var j = 0; j < possibleParents.length; j++) {
		var possibleImages = possibleParents[j].getElementsByTagName('IMG');

			for (var k = 0; k < possibleImages.length; k++) {
				if (possibleImages[k].src.search(matchRegEx)>0) {
					smallIMGs.push(possibleImages[k]);
				}
			}

		}
	}

	// loop small images
	for (var i = 0; i < smallIMGs.length; i++) {
		var thisIMG = smallIMGs[i];
		
		// get target source from  image source file name
		var targetSrc = thisIMG.src.replace(matchRegEx,replaceString);

		// Collect target sources for images which are still active in the document
		usedIMGs.push(targetSrc);

		if (thisIMG.getAttribute("targetSrc")!=targetSrc) {
			// set "targetSrc" attribute to the target's source. it will be used by the event functions to locate the big preview image
			thisIMG.setAttribute("targetSrc", targetSrc);

			// only cache preview image if it does not already exist (somewhere else in the document)
			if (!(imgCache.hasOwnProperty(targetSrc))) {
				imgCache[targetSrc] = new Image();
				imgCache[targetSrc].src = targetSrc;
			}
	
			// activate event listeners for small preview image
			thisIMG.title = thisIMG.alt;
			thisIMG.addEventListener('mouseover', mouseOver, false);
			thisIMG.addEventListener('mousemove', mouseMove, false);
			thisIMG.addEventListener('mouseout', mouseOut, false);
			
			// (Re-)activate pointer events in case there were disabled (as is the case for the favorites submenu) 
			if (thisIMG.style.pointerEvents = "none") {
				thisIMG.style.pointerEvents = "auto";
			}
			
		}
	}
	
	// remove unused images from imgCache
	for (image in imgCache) {
		if (usedIMGs.indexOf(image)<0) {
			delete imgCache[image];
		}
	}
}

// initial execution
addPrvImg();

// Create blank image element. It will be filled with actual XL images and unhidden during execution
var imgXL = document.createElement('img');

imgXL.setAttribute('style', 'z-index:10000; overflow:hidden; position:absolute; display:none; border-width:' + borderWidth + 'px; box-shadow: 0px 0px 16px #036; border-style:solid; border-color:#FFF;');
imgXL.setAttribute('id', 'ImgElem');
document.body.insertBefore(imgXL, document.body.firstChild);

// add event listeners to dynamic elements
for (var i = 0; i < toWatch.length; i++) {
	if (thisElem = document.getElementById(toWatch[i])) {
		thisElem.addEventListener('DOMSubtreeModified', addPrvImg, false);
	}
}