// ==UserScript==
// @name         Embedded Youtube Video Full HD and No Annotations
// @version      3.2
// @namespace    http://userscripts.org/users/zackton
// @include      *
// @run-at      document-start
// @grant        none
// @description Auto selects the highest resolution on all Youtube Videos AND embedded youtube videos on ALL webpages!
// ==/UserScript==

//Change the default quality to what you would prefer.
//"small","medium","large","hd720","hd1080","highres" <-- change to one of these
// 240p       360p      480p     720p      1080p      1440p and above (highest quality)

var defaultQuality = "hd1080";

defaultQuality = verifyDefaultQuality(defaultQuality);

//console.log(window.location.href); //DEBUG

//On /v/ or /embed/ pages (loaded directly or via an iframe)
if ((/^(https?\:\/\/(www\.)?youtube(-nocookie)?.com\/(v|embed|e)\/[a-zA-Z0-9+\-\_]{11})/).test(window.location.href)){
	document.addEventListener('DOMContentLoaded', function(){
		//console.log("embed"); //DEBUG
		var interval = setInterval(function(){
			var player = document.getElementById("player").childNodes[0];
			if (player != undefined){
				if(player.nodeName.toLowerCase() != "embed"){	
					//console.log("html5 embed"); //DEBUG
					ensureSetQuality(player);
				}
				clearInterval(interval);
			}
		},10);
	}, false);
//All the other pages
} else {
	// Continue after the page is fully loaded
	document.addEventListener('DOMContentLoaded', execOnPageLoad, false);
}

function execOnPageLoad(){
	//console.log("execOnPageLoad"); // DEBUG
	
	if ((/^(https?\:\/\/(www\.)?youtube.com\/(watch|user\/|channel\/))/).test(window.location.href)){
		//console.log("watch"); //DEBUG
		
		if (document.getElementById("gm-YAPiHQ") == null){
			var scr = document.createElement("script");
			scr.id = "gm-YAPiHQ";
			scr.innerHTML = 
				["var tag = document.createElement('script');",
				"tag.src = '//www.youtube.com/iframe_api';",
				"var firstScriptTag = document.getElementsByTagName('script')[0];",
				"firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);",
				"var ytplayer0;",
				"function onYouTubePlayerReady(playerId){",
				//"	console.log('onReady1');", //DEBUG
				"   ytplayer0 = window.top.document.getElementById('movie_player') || window.top.document.getElementById('movie_player-html5') || window.top.document.getElementById('movie_player-flash') || window.top.document.getElementById('video-player-flash') || window.top.document.getElementById('video-player');",
				"	ytplayer0.setPlaybackQuality('" + defaultQuality + "');",
				"	waitSetHQ();",
				"};",
				"function ytPlayerOnYouTubePlayerReady(playerId){",
				//"	console.log('onReady2');", //DEBUG
				"   ytplayer0 = window.top.document.getElementById('movie_player') || window.top.document.getElementById('movie_player-html5') || window.top.document.getElementById('movie_player-flash') || window.top.document.getElementById('video-player-flash') || window.top.document.getElementById('video-player');",
				"	ytplayer0.setPlaybackQuality('" + defaultQuality + "');",
				"	waitSetHQ();",
				"};",
				"var c;",
				"function waitSetHQ(wStart){",
				//"	console.log('WSHQ');", //DEBUG
				"	if (wStart==undefined)",
				"		wStart = new Date();",
				"   ytplayer0 = window.top.document.getElementById('movie_player') || window.top.document.getElementById('movie_player-html5') || window.top.document.getElementById('movie_player-flash') || window.top.document.getElementById('video-player-flash') || window.top.document.getElementById('video-player');",
				"  	ytplayer0.setPlaybackQuality('" + defaultQuality + "');",
				"	if (c==undefined){",
				//"		console.log(c);", //DEBUG
				"		c='" + defaultQuality + "';",
				"		var q = ['small','medium','large','hd720','hd1080','highres'];",
				"		var avq = ytplayer0.getAvailableQualityLevels();",
				"		for (var i=q.lastIndexOf('" + defaultQuality + "');i>=0;--i){",
				"			if (avq.lastIndexOf(q[i]) >= 0){",
				"				c=q[i];",
				"				break;",
				"			}", 
				"		}",
				"	}",
				"	if (c==ytplayer0.getPlaybackQuality()){",
				//"		console.log(c+' '+ytplayer0.getPlaybackQuality());", //DEBUG
				"		c=undefined;",
				"		return;",
				"   } else if ((new Date())-wStart<10000)",
				"      setTimeout(function(){waitSetHQ(wStart)},10);",
				"}",
				].join('\n');
			//console.log(scr.innerHTML); // DEBUG
			document.getElementsByTagName("body")[0].appendChild(scr);
		}
		var target = document.getElementById("player");
		var observer;
		try {
			observer = new MutationObserver(waitSetHQ); //Firefox (Gecko)
		} catch (e){
			observer = new WebKitMutationObserver(waitSetHQ); //Chrome (WebKit)
		}
		var config = { attributes: true, childList: false, characterData: true, subtree: false };
		observer.observe(target, config); // register observer
		
	} else if ((/^(https?\:\/\/(www\.)?youtube.com\/channels)/).test(window.location.href)){
	
		var target = document.body;
		var observer;
		try {
			observer = new MutationObserver(onChannelsMutation); //Firefox (Gecko)
		} catch (e){
			observer = new WebKitMutationObserver(onChannelsMutation); //Chrome (WebKit)
		}
		var config = { attributes: true, childList: true, characterData: true, subtree: true };
		observer.observe(target, config);
		
	//Everywhere else
	} else {
		searchAndReplace(); // Look for embedded videos
		
		// Keep watching for changes in page content, pass changed/inserted nodes to searchAndReplace()
		// https://developer.mozilla.org/en-US/docs/DOM/MutationObserver
		var target = document.body;
		var observer;
		try {
			observer = new MutationObserver(onMutation); //Firefox (Gecko)
		} catch (e){
			observer = new WebKitMutationObserver(onMutation); //Chrome (WebKit)
		}
		var config = { attributes: true, childList: true, characterData: true, subtree: true };
		observer.observe(target, config); // register observer
	}
}

//Caller must make sure that videoObj.setPlaybackQuality will be defined at some point, 
// if not, the function will keep calling itself every 100ms on videoObj until the 10s timeout.
function ensureSetQuality(videoObj,highestAQ,firstCalledAt){
	//console.log("ensureSetQuality()" + firstCalledAt); //DEBUG
	if (firstCalledAt==undefined)
		firstCalledAt = new Date();
	else if ((new Date()-firstCalledAt) > 10000)
		return;
	if (typeof(videoObj.setPlaybackQuality) == "function"){
		videoObj.setPlaybackQuality(defaultQuality);
		if (videoObj.getPlayerState() == 1 || videoObj.getPlayerState() == 3)
			videoObj.playVideo(); // to avoid reload glitch after pausing/starting again
		
		//Store the defaultQuality or the next highest available quality in highestAQ
		if (highestAQ==undefined){
			var q = ["small","medium","large","hd720","hd1080","highres"];
			for (var i=q.lastIndexOf(defaultQuality);i>=0;--i){
				if ((videoObj.getAvailableQualityLevels()).lastIndexOf(q[i]) >= 0){
					highestAQ=q[i];
					break;
				} 
			}
		}
		if (videoObj.getPlaybackQuality() != highestAQ){
			setTimeout(function(){ensureSetQuality(videoObj,highestAQ,firstCalledAt)},100)
		} 
	} else
		setTimeout(function(){ensureSetQuality(videoObj,highestAQ,firstCalledAt)},100);
}

function onChannelsMutation(mutations){
	mutations.forEach(function(mutation) {
		if (mutation.type === "attributes"){
			if (mutation.target.nodeName.toLowerCase() == "embed"){
				if (typeof(mutation.target.setPlaybackQuality == "function")){
					//console.log("attr hit"); //DEBUG
					ensureSetQuality(ensureSetQuality);
				}
			}
		} else if (mutation.type === "childList"){
			for (var i=0;i<mutation.addedNodes.length;++i)
				if (mutation.addedNodes[i].nodeName.toLowerCase() == "embed"){
					if (typeof(mutation.addedNodes[i].setPlaybackQuality == "function")){
						//console.log("added hit"); //DEBUG
						ensureSetQuality(mutation.addedNodes[i]);
				}
			}
		}
	});    
}

function onMutation(mutations){
	var significantNodes = [];
	mutations.forEach(function(mutation) {
		//console.log(mutation.type); // DEBUG
		if (mutation.type === "attributes"){
			significantNodes[significantNodes.length] = mutation.target;
		} else if (mutation.type === "childList"){
			//console.log("onMutation: childList"); //DEBUG
			for (var i=0;i<mutation.addedNodes.length;++i)
				significantNodes[significantNodes.length] = mutation.addedNodes[i];
		}
	});    
	//console.log("significantNodes length: " + significantNodes.length); // DEBUG
	if (significantNodes.length>0)
		searchAndReplace(significantNodes);
}

function recAddToArr(obj,array){
	array.push(obj);
}

function onMutation(mutations){
	var significantNodes = [];
	mutations.forEach(function(mutation) {
		//console.log(mutation.type); // DEBUG
		if (mutation.type === "attributes"){
			significantNodes[significantNodes.length] = mutation.target;
		} else if (mutation.type === "childList"){
			//console.log("onMutation: childList"); //DEBUG
			for (var i=0;i<mutation.addedNodes.length;++i)
				significantNodes[significantNodes.length] = mutation.addedNodes[i];
		}
	});    
	//console.log("significantNodes length: " + significantNodes.length); // DEBUG
	if (significantNodes.length>0)
		searchAndReplace(significantNodes);
}

function searchAndReplace(pNodes){
//	console.log("searchAndReplace()"); //DEBUG
if (typeof pNodes == "object")	//if searchAndReplace() was called because the page content changed and the function received the changed nodes
	{
//		console.log("searchAndReplace(pNodes) : " + pNodes.length); // DEBUG
		for (var i=0;i<pNodes.length;++i){
//			console.log(pNodes[i].nodeName.toLowerCase());
//			console.log(pNodes[i].getElementsByTagName("object").length); //DEBUG
			
			if ((/^embed$/i).test(pNodes[i].nodeName)){
//				console.log("embed mutation"); //DEBUG
				var embedSrc = pNodes[i].getAttribute("src");
				if (!embedSrc)
					continue;
//				console.log("embedSrc: " + embedSrc); //DEBUG
				var replaceUrl = replaceSrc(embedSrc);
				if (embedSrc != replaceUrl)
					pNodes[i].setAttribute("src",replaceUrl);
			} else if ((/^iframe$/i).test(pNodes[i].nodeName)){
//				console.log("iframe mutation"); //DEBUG
				var iframeSrc = pNodes[i].getAttribute("src");
				if (!iframeSrc)
					continue;
//				console.log("iframeSrc: " + iframeSrc); //DEBUG
				var replaceUrl = replaceSrc(iframeSrc);
				if (iframeSrc != replaceUrl)
					pNodes[i].setAttribute("src",replaceUrl);
			} else if ((/^object$/i).test(pNodes[i].nodeName)){
				var objectData = pNodes[i].getAttribute("data");
				if (!objectData)
					continue;
//				console.log("objectData: " + objectData); //DEBUG
				var replaceUrl = replaceSrc(objectData);
				if (objectData != replaceUrl)
					pNodes[i].setAttribute("data",replaceUrl);
				var objectChildren = pNodes[i].getElementsByTagName("param");
				for (var j=0;j<objectChildren.length;++j){
					if (objectChildren[j].getAttribute("name") != "movie")
						continue;
					var paramMovie = objectChildren[j].getAttribute("value");
					if (paramMovie){
//						console.log("paramMovie: " + paramMovie); //DEBUG
						var replaceUrl = replaceSrc(paramMovie);
						if (paramMovie != replaceUrl)
							objectChildren[j].setAttribute("movie",replaceUrl);
					} // if
				} // for j
			} // else if
		} // for i
	} else {
		//console.log("searchAndReplace()"); // DEBUG

		var lElems = new Array();
		lElems["object"] = "data";
		lElems["embed"] = "src";
		lElems["param"] = "value";
		lElems["iframe"] = "src";

		for (var cTag in lElems){
			var cParam = lElems[cTag];
			var tagArr = document.getElementsByTagName(cTag);
			for (var i=0;i<tagArr.length;++i){
				var tagParam = tagArr[i].getAttribute(cParam);
				if (!tagParam
                    || (cTag == "param" && tagArr[i].getAttribute("name") != "movie"))
						continue;
				var replaceUrl = replaceSrc(tagParam);
				if (tagParam != replaceUrl)
					tagArr[i].setAttribute(cParam,replaceUrl);
			} // for i 
		} //for key
	} // else
}

function replaceSrc(src){
	if ((/^(https?\:\/\/(www\.)?youtube(-nocookie)?\.com\/(v|e|embed)\/[a-zA-Z0-9+\-\_]{11})/).test(src)){
		//insert / modify vq parameter
		if ((new RegExp("(\\?|\\&)vq=[^#^&]*(\\#|\\&)?")).test(src))
			src = src.replace(new RegExp("(\\?|\\&)vq=[^#^&]*(\\#|\\&)?"),"$1vq=" +defaultQuality+ "$2");
		else 
			src = src.replace(/^(https?\:\/\/(www\.)?youtube(-nocookie)?\.com\/(v|e|embed)\/[a-zA-Z0-9+\-\_]{11})\??/,"$1?vq=" +defaultQuality+ "&iv_load_policy=3&");
			
		//insert / modify enablejsapi parameter (set its value to 1)
		if ((new RegExp("(\\?|\\&)enablejsapi=[^#^&]*(\\#|\\&)?")).test(src))
			src = src.replace(new RegExp("(\\?|\\&)enablejsapi=[^#^&]*(\\#|\\&)?"),"$1enablejsapi=1$2");
		else 
			src = src.replace(/^(https?\:\/\/(www\.)?youtube(-nocookie)?\.com\/(v|e|embed)\/[a-zA-Z0-9+\-\_]{11})\??/,"$1?enablejsapi=1&");
	}
	return src;
}

function verifyDefaultQuality(quality){
	if (["small","medium","large","hd720","hd1080","highres"].indexOf(quality) < 0)
		return "hd1080";
	return quality;
}