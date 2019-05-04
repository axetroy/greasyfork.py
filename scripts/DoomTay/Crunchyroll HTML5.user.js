// ==UserScript==
// @name        Crunchyroll HTML5
// @namespace   DoomTay
// @description Replaces Crunchyroll's Flash player with an HTML5 equivalent
// @include     http://www.crunchyroll.com/*
// @include     https://www.crunchyroll.com/*
// @require     https://cdn.rawgit.com/peterolson/BigInteger.js/979795b450bcbc9d1d06accb6ab57417501edb08/BigInteger.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/pako/1.0.6/pako_inflate.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/aes-js/3.1.0/index.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/video.js/7.0.3/video.min.js
// @require     https://cdn.jsdelivr.net/npm/videojs-ima@1.5.1/dist/videojs.ima.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-ads/6.3.0/videojs-contrib-ads.js
// @require     https://cdn.rawgit.com/Arnavion/libjass/b13173112df83073e03fdd209b87de61f7eb7726/demo/libjass.js
// @resource    vjsCSS https://cdnjs.cloudflare.com/ajax/libs/video.js/7.0.3/video-js.min.css
// @resource    libjassCSS https://cdn.rawgit.com/Arnavion/libjass/b13173112df83073e03fdd209b87de61f7eb7726/demo/libjass.css
// @resource    vjsASSCSS https://cdn.rawgit.com/SunnyLi/videojs-ass/a884c6b8fcc8bab9e760214bb551601f54cd769f/src/videojs.ass.css
// @resource    vjsASSJS https://cdn.rawgit.com/SunnyLi/videojs-ass/a884c6b8fcc8bab9e760214bb551601f54cd769f/src/videojs.ass.js
// @resource    imaCSS https://cdn.jsdelivr.net/npm/videojs-ima@1.5.1/dist/videojs.ima.min.css
// @version     1.1.0
// @grant       none
// @run-at      document-start
// @no-frames
// ==/UserScript==

window.videojs = videojs;
//As we're loading from document-start, it will be much harder to get access to the page's "built in" libjass variable, so we'll set up our own.
if(!window.libjass) window.libjass = libjass;

//Load needed CSS.
createCSS(GM_getResourceURL("vjsCSS"));
createCSS(GM_getResourceURL("libjassCSS"));
createCSS(GM_getResourceURL("vjsASSCSS"));
createCSS(GM_getResourceURL("imaCSS"));

//Adding custom stylesheet after video is initialized so that the "default" stylesheet doesn't override it
var newStyleSheet = document.createElement("style");
newStyleSheet.rel = "stylesheet";
newStyleSheet.innerHTML = `.vjs-volume-panel.vjs-volume-panel-horizontal
{
	width: 9em;
}

.vjs-volume-panel .vjs-volume-control.vjs-volume-horizontal
{
	width: 5em;
	height: 3em;
	padding-right: 10px;}

.vjs-volume-panel .vjs-volume-control
{
	opacity: 1 !important;
}

.video-js .vjs-control-bar
{
	background-color:#333;
}

.video-js .vjs-play-progress, .video-js .vjs-volume-level, .video-js .vjs-load-progress div
{
	background-color:#f7931e;
}

.video-js .vjs-current-time
{
	display:block;
	padding-right: 0;
}

.video-js .vjs-time-divider
{
	display:block;
}

.video-js .vjs-duration
{
	display:block;
	padding-left: 0;
}

.newMarker
{
	width: 5px;
	height: 100%;
	background-color: white;
	position: absolute;
}`;
document.head.appendChild(newStyleSheet);

var subXSL = new DOMParser().parseFromString(`<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:fo="http://www.w3.org/1999/XSL/Format" >
<xsl:output method="text" omit-xml-declaration="yes" indent="no"/>
<xsl:strip-space elements="*"/>

<xsl:template match="subtitle_script">[Script Info]
<xsl:value-of select="concat('Title: ', @title,'&#xA;',
	'ScriptType: v4.00+','&#xA;',
	'WrapStyle: ', @wrap_style,'&#xA;',
	'PlayResX: ', @play_res_x,'&#xA;',
	'PlayResY: ', @play_res_y,'&#xA;',
	'Subtitle ID: ', @id,'&#xA;',
	'Language: ', @lang_string,'&#xA;',
	'Created: ', @created)"/>
<xsl:variable name="langCode" select="@lang_code"/>

[V4+ Styles]
Format: Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,OutlineColour,BackColour,Bold,Italic,Underline,StrikeOut,ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding
<xsl:for-each select="styles/style">
<xsl:variable name="formattedName" select="concat(translate(@name,' ','_'),'_',$langCode)"/>
<xsl:value-of select="concat('Style: ',
	$formattedName,',',
	@font_name,',',
	@font_size,',',
	@primary_colour,',',
	@secondary_colour,',',
	@outline_colour,',',
	@back_colour,',',
	@bold,',',
	@italic,',',
	@underline,',',
	@strikeout,',',
	@scale_x,',',
	@scale_y,',',
	@spacing,',',
	@angle,',',
	@border_style,',',
	@outline,',',
	@shadow,',',
	@alignment,',',
	@margin_l,',',
	@margin_r,',',
	@margin_v,',',
	@encoding,'&#xA;')"/>
</xsl:for-each>
[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
<xsl:for-each select="events/event">
<xsl:variable name="formattedName" select="concat(translate(@style,' ','_'),'_',$langCode)"/>
<xsl:value-of select="concat('Dialogue: 0,',
	@start,',',
	@end,',',
	$formattedName,',',
	@name,',',
	@margin_l,',',
	@margin_r,',',
	@margin_v,',',
	@effect,',',
	@text,'&#xA;')"/>
</xsl:for-each>
</xsl:template>
</xsl:stylesheet>`,"text/xml");

//@require won't really work for some of the plugins, so instead we'll load it in the page.
function loadPlugins()
{
	return Promise.all([createJS(GM_getResourceURL("vjsASSJS")),
	createJS("https://imasdk.googleapis.com/js/sdkloader/ima3.js")]);

	function createJS(scriptPath)
	{
		return new Promise(function(resolve)
		{
			var newScript = document.createElement("script");
			newScript.type = "text/javascript";
			newScript.src = scriptPath;
			newScript.onload = resolve;
			document.head.appendChild(newScript);
		})
	}
}

//Find the script that powers the embedSWF function so we can overwrite. This is why the script is set to load at document-start. This way, we have access to the function parameters, and more importantly, the function can be overwritten before the Flash plugin has a chance to load.
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		mutation.addedNodes.forEach(findSWFScript);
	});
});

var config = { childList: true, subtree: true };
observer.observe(document, config);

var callbackCount = 0;
var lastPing = 0;
var pingIntervals = [];
var previousTime = 0;
var elapsed = 0;
var affiliateCode = "";

for(var i = 0; i < document.scripts.length; i++)
{
	findSWFScript(document.scripts[i]);
}

function findSWFScript(start)
{
	if(start.nodeName == "SCRIPT" && (start.src.includes("http://static.ak.crunchyroll.com/versioned_assets/js/modules/www/application") || start.src.includes("https://www.crunchyroll.com/versioned_assets/js/modules/view_templates/affiliate_iframe_embed")))
	{
		observer.disconnect();

		if(window.swfobject) redoFunction();
		else start.addEventListener("load",function()
		{
			redoFunction();
		});

		function redoFunction()
		{
			window.swfobject.embedSWF = function(swf,id,width,height,version,downloadURL,params)
			{
				var placeholder = document.getElementById(id);

				var newVideo = document.createElement("video");
				newVideo.id = id;
				newVideo.className = "video-js vjs-default-skin";
				newVideo.controls = true;
				newVideo.width = width;
				newVideo.height = height;
				newVideo.style.visibility = "visible";
				newVideo.style.overflow = "hidden";

				if(width.includes("%")) newVideo.style.width = width;
				if(height.includes("%")) newVideo.style.height = height;

				placeholder.parentNode.replaceChild(newVideo,placeholder);

				var configURL = decodeURIComponent(params.config_url);
				if(document.location.protocol == "https:") configURL = configURL.replace("http:","https:");


				Promise.all([loadPlugins(),getConfig(configURL)]).then(results => results[1]).then(function(config)
				{
					var streamInfo = config.querySelector("stream_info");

					var mediaID = config.getElementsByTagName("default:mediaId")[0].textContent;
					var autoplay = config.getElementsByTagName("default:isAutoPlay")[0].textContent == 1;
					var streamFile = streamInfo.querySelector("file").textContent;
					if(document.location.protocol == "https:") streamFile = streamFile.replace("http:","https:");
					var subtitleTag = config.querySelector("subtitle:not([link])");
					var scriptObject = subtitleTag ? parseSubtitles(subtitleTag) : null;
					var initialVolume = config.getElementsByTagName("default:initialVolume")[0].textContent;
					var initialMute = config.getElementsByTagName("default:initialMute")[0].textContent == "true";
					var duration = parseFloat(config.querySelector("metadata duration").textContent);
					affiliateCode = config.getElementsByTagName("default:affiliateCode")[0].textContent;

					var streamObject = {};
					streamObject.media_id = mediaID;
					streamObject.video_encode_id = streamInfo.querySelector("video_encode_id").textContent;
					streamObject.media_type = streamInfo.querySelector("media_type").textContent;
					streamObject.ping_back_hash = streamInfo.querySelector("pingback").querySelector("hash").textContent;
					streamObject.ping_back_hash_time = streamInfo.querySelector("pingback").querySelector("time").textContent;

					pingIntervals = config.getElementsByTagName("default:pingBackIntervals")[0].textContent.split(" ");

					if(autoplay) newVideo.autoplay = true;

					var adSlots = config.getElementsByTagName("adSlots")[0];

					var player = window.videojs(id, {
						sources: [
							{src: streamFile,type: 'application/x-mpegURL'}
						],
						poster: config.getElementsByTagName("default:backgroundUrl")[0].textContent,
						controlBar: {
							children: [
								'playToggle',
								'progressControl',
								'currentTimeDisplay',
								'timeDivider',
								'durationDisplay',
								'playbackRateMenuButton',
								'chaptersButton',
								'subtitlesButton',
								'captionsButton',
								'fullscreenToggle',
								'volumePanel'
							]
						}},function()
						{
						jumpAhead();
						if(autoplay) player.play();

						if(scriptObject)
						{
							var convertedSubs = convertSubFile(scriptObject);
							var subtitleBlob = URL.createObjectURL(new Blob([convertedSubs], {type : "text/plain"}));

							var vjs_ass = player.ass({
								"src": [subtitleBlob],
								"label": scriptObject.getAttribute("title"),
								"srclang": scriptObject.getAttribute("lang_code").substring(0,2),
								"enableSvg": false,
								"delay": 0
							});

							var otherSubs = config.querySelectorAll("subtitle[link]");

							if(otherSubs)
							{
								for(var s = 0; s < otherSubs.length; s++)
								{
									if(otherSubs[s].id == scriptObject.id) continue;

									var subs = new XMLHttpRequest();
									subs.onload = function () {
										var response = this.response;

										var parsedSubtitle = parseSubtitles(response.children[0]);
										var convertedScript = convertSubFile(parsedSubtitle);
										var subtitleBlob = URL.createObjectURL(new Blob([convertedScript], {type : "text/plain"}));

										vjs_ass.loadNewSubtitle(subtitleBlob,parsedSubtitle.getAttribute("title"),parsedSubtitle.getAttribute("lang_code").substring(0,2),false);
									};
									subs.open("GET", otherSubs[s].getAttribute("link"), true);
									subs.responseType = "document";
									subs.send();
								}
							}
						}
					});

					if(adSlots && adSlots.children.length > 0)
					{
						var slots = adSlots.getElementsByTagName("adSlot");

						var midrollGroupCount = 0;
						var midrollCount = 0;

						var markers = [];

						var vmapString = '<\?xml version="1.0" encoding="UTF-8"?><vmap:VMAP xmlns:vmap="http://www.iab.net/videosuite/vmap" version="1.0">';
						for(var s = 0; s < slots.length; s++)
						{
							var adUrls = Array.from(slots[s].getElementsByTagName("vastAd"),ad => ad.getAttribute("url"));

							var selectedUrl = adUrls[adUrls.length - 1];

							switch(slots[s].getAttribute("type"))
							{
								case "preroll":
									vmapString += '<vmap:AdBreak timeOffset="start" breakId="preroll"><vmap:AdSource id="preroll-ad-1" allowMultipleAds="false" followRedirects="true"><vmap:AdTagURI templateType="vast2"><![CDATA[' + selectedUrl + ']]></vmap:AdTagURI></vmap:AdSource></vmap:AdBreak>';
									break;
								case "midroll":
									var adTime = slots[s].getAttribute("time");

									if(!markers.includes(adTime))
									{
										markers.push(adTime);

										var newMarker = document.createElement("div");
										newMarker.className = "newMarker";
										newMarker.style.left = ((adTime / duration) * 100) - 0.5 + "%";
										player.el().querySelector('.vjs-progress-holder').appendChild(newMarker);
									}

									var minutes = Math.floor(adTime / 60);
									var seconds = adTime % 60;
									var hours = Math.floor(adTime / 3600);

									function padToTwo(number)
									{
										return ("0" + number).slice(-2);
									}

									var timeToReal = padToTwo(hours) + ":" + padToTwo(minutes) + ":" + padToTwo(seconds) + ".000";

									if(slots[s - 1].getAttribute("type") == "midroll" && adTime != slots[s - 1].getAttribute("time"))
									{
										midrollCount = 0;
										midrollGroupCount++;
									}

									vmapString += '<vmap:AdBreak timeOffset="' + timeToReal + '" breakId="midroll-' + (midrollGroupCount + 1) + '"><vmap:AdSource id="midroll-' + (midrollGroupCount + 1) + '-ad-' + (midrollCount + 1) + '" allowMultipleAds="false" followRedirects="true"><vmap:AdTagURI templateType="vast2"><![CDATA[' + selectedUrl + ']]></vmap:AdTagURI></vmap:AdSource></vmap:AdBreak>';
									midrollCount++;
									break;
								case "postroll":
									vmapString += '<vmap:AdBreak timeOffset="end" breakId="postroll"><vmap:AdSource id="postroll-ad-1" allowMultipleAds="false" followRedirects="true"><vmap:AdTagURI templateType="vast2"><![CDATA[' + selectedUrl + ']]></vmap:AdTagURI></vmap:AdSource></vmap:AdBreak>';
									break;
								default:
									break;
							}
						}

						vmapString += '</vmap:VMAP>';

						var options = {
							adsResponse: vmapString,
							vpaidMode: google.ima.ImaSdkSettings.VpaidMode.INSECURE
						};

						player.ima(options);
					}

					player.volume(initialVolume / 100);
					if(initialMute) player.muted(true);

					player.on("seeking", function()
					{
						previousTime = this.currentTime();
					});

					player.on("timeupdate", function()
					{
						if(!player.seeking())
						{
							var delta = this.currentTime() - previousTime;
							elapsed += delta;
							previousTime = this.currentTime();

							testPing();
						}
					});

					function jumpAhead()
					{
						var startTime = config.getElementsByTagName("default:startTime")[0];
						if(startTime && startTime.textContent > 0) player.currentTime(startTime.textContent);
						previousTime = player.currentTime();
					}

					function testPing()
					{
						var currentInterval = Math.min(pingIntervals.length - 1, callbackCount);
						if((elapsed * 1000) >= pingIntervals[currentInterval])
						{
							ping(streamObject,(elapsed * 1000),player.currentTime());
							elapsed -= (pingIntervals[currentInterval] / 1000);
						}
					}
				});
			};

			//In Chrome, the function replacing will have come "too late", and embedSWF will have to be called again.
			var initScript = Array.prototype.find.call(document.scripts, script => script.textContent.includes("embedSWF"));

			if(initScript)
			{
				var newScript = document.createElement("script");
				newScript.innerHTML = initScript.innerHTML;

				var parentNode = initScript.parentNode;

				parentNode.replaceChild(newScript,initScript);
			}
		}
	}
}

function setData(newCallCount,newPing)
{
	callbackCount = newCallCount;
	lastPing = newPing;
}

function createCSS(css)
{
	var newStyleSheet = document.createElement("link");
	newStyleSheet.rel = "stylesheet";
	newStyleSheet.href = css;
	document.head.appendChild(newStyleSheet);
}

function parseSubtitles(subtitles)
{
	var iv = bytesToNumbers(atob(subtitles.getElementsByTagName("iv")[0].textContent));
	var subData = bytesToNumbers(atob(subtitles.getElementsByTagName("data")[0].textContent));
	var id = parseInt(subtitles.getAttribute("id"));

	var key = createKey(id);

	//CryptoJS's AES decrypting cuts off the resulting string sometimes, so we're using something else instead.
	var aesCbc = new aesjs.ModeOfOperation.cbc(bytesToNumbers(key.toString(CryptoJS.enc.Latin1)), iv);
	var decrypted = aesCbc.decrypt(subData);

	var deflated = pako.inflate(decrypted, {to: "string"});

	var script = new DOMParser().parseFromString(deflated,"text/xml").querySelector("subtitle_script");

	return script;

	function bytesToNumbers(bytes)
	{
		return Uint8Array.from(bytes,(letter,i) => bytes.charCodeAt(i));
	}

	function createKey(id)
	{
		function magic()
		{
			var hash = bigInt(88140282).xor(id).toJSNumber();
			var multipliedHash = bigInt(hash).multiply(32).toJSNumber();
			return bigInt(hash).xor(hash >> 3).xor(multipliedHash).toJSNumber();
		}

		var hash = "$&).6CXzPHw=2N_+isZK" + magic();
		var shaHashed = CryptoJS.SHA1(hash);

		var keyString = shaHashed.toString(CryptoJS.enc.Latin1);
		var recodedKey = CryptoJS.enc.Latin1.parse(keyString.padEnd(32,"\u0000"));

		return recodedKey;
	}
}

function getConfig(configURL)
{
	return new Promise(function(resolve,reject)
	{
		var config = new XMLHttpRequest();
		config.onload = function()
		{
			if(this.status == 200) resolve(this.response);
			else if(this.status == 502) resolve(getConfig(configURL));
			else reject(this);
		};
		config.onerror = reject;
		config.open("POST", configURL, true);
		config.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		config.responseType = "document";
		config.send("current_page=" + window.location.href);
	});
}

function ping(streamData, newLastPing, playhead)
{
	var newCallCount = callbackCount + 1;
	var sinceLastPing = newLastPing - lastPing;
	sendPing(streamData,newCallCount,sinceLastPing,playhead);
	setData(newCallCount,newLastPing);
}

function sendPing(entry, callCount, timeSinceLastPing, playhead)
{
	var params = new URLSearchParams();
	params.set("current_page",window.location.href);
	params.set("req","RpcApiVideo_VideoView");
	params.set("media_id",entry.media_id);
	params.set("video_encode_id",entry.video_encode_id);
	params.set("media_type",entry.media_type);
	params.set("h",entry.ping_back_hash);
	params.set("ht",entry.ping_back_hash_time);
	params.set("cbcallcount",callCount);
	params.set("cbelapsed",Math.floor(timeSinceLastPing / 1000));
	if(!isNaN(playhead)) params.set("playhead",playhead);
	if(affiliateCode) params.set("affiliate_code",affiliateCode);

	var ping = new XMLHttpRequest();
	ping.open("POST", "/ajax/", true);
	ping.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ping.send(params);
}

function convertSubFile(subs)
{
	var xsltProcessor = new XSLTProcessor();
	xsltProcessor.importStylesheet(subXSL);
	var resultDocument = xsltProcessor.transformToFragment(subs, document);

	return resultDocument.textContent;
}

function GM_getResourceURL(resourceName)
{
	if(GM_info.script.resources[resourceName]) return GM_info.script.resources[resourceName].url;
	else
	{
		//The "built in" mimetype tends to be inaccurate, so we're doing something simpler to determine the mimetype of the resource
        var resourceObject = GM_info.script.resources.find(resource => resource.name == resourceName);
		var mimetype;
		if(resourceObject.url.endsWith(".swf")) mimetype = "application/x-shockwave-flash";
		else mimetype = resourceObject.meta;
		var dataURL = "data:" + mimetype + "," + encodeURIComponent(resourceObject.content);
		return dataURL;
	}
}