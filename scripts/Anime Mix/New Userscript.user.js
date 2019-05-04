// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Moo Moo</title>
	<link rel='shortcut icon' type="image/png" href="../.././img/favicon.png?v=1"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="description" content="MooMoo.io is a brand new Survival IO Game. Build and Survive with your friends">
	<meta name="keywords" content="game,games,gaming,online,io,multiplayer,moomoo,village,farm">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="pragma" content="no-cache">
	<link rel="stylesheet" href="css/main.css" />
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Hammersmith+One" rel="stylesheet">
	<script>
	    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
	    ga('create', 'UA-69264675-3', 'auto');
	    ga('send', 'pageview');
	</script>
	<script data-cfasync="false" type="text/javascript">
		if (typeof admob == "undefined") {
			var freestar = freestar || {};
			freestar.hitTime = Date.now();
			freestar.queue = freestar.queue || [];
			freestar.config = freestar.config || {};
			freestar.debug = window.location.search.indexOf('fsdebug') === -1 ? false : true;
			freestar.config.enabled_slots = [
			    "moomooio_300x250_1"
			];
			!function(a,b){var c=b.getElementsByTagName("script")[0],d=b.createElement("script"),e="https://a.pub.network/moomoo-io";e+=freestar.debug?"/qa/pubfig.min.js":"/pubfig.min.js",d.async=!0,d.src=e,c.parentNode.insertBefore(d,c)}(window,document);
		}
	</script>
	<script>
		window.twttr = (function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0],
		    t = window.twttr || {};
		  if (d.getElementById(id)) return t;
		  js = d.createElement(s);
		  js.id = id;
		  js.src = "https://platform.twitter.com/widgets.js";
		  fjs.parentNode.insertBefore(js, fjs);
		  t._e = [];
		  t.ready = function(f) {
		    t._e.push(f);
		  };
		  return t;
		}(document, "script", "twitter-wjs"));
	</script>

	<!-- ERROR REPORTING -->
	<script>
		var reportedErrors = 0;
		window.addEventListener("error", err => {
			if (reportedErrors > 5) {
				console.log("Too many errors reported.");
				return;
			}

			if (err.filename.indexOf("bundle.js") != -1 && reportedErrors == 0) {
				errorNotification.style.display = "block";
			}

            console.log("Reporting error...", err);

			var finalData = JSON.stringify({
                game: "moomoo",
                error: {
                    message: err.message,
                    filename: err.filename,
                    lineno: err.lineno,
                    colno: err.colno,
                    error: err.error,
                    stack: err.error && err.error.stack && err.error.stack.toString()
                },
                client: {
                    userAgent: navigator.userAgent,
                    platform: navigator.platform,
                    doNotTrack: navigator.doNotTrack,
                    connection: navigator.connection ? {
                        downlink: navigator.connection.downlink,
                        effectiveType: navigator.connection.effectiveType,
                        rtt: navigator.connection.rtt,
                        saveData: navigator.connection.saveData
                    } : null,
                    language: navigator.language,
                    languages: navigator.languages,
                },
                extra: {
                    pingTime: window.pingTime,
                    storage: localStorage
                }
            });

            const xhr = new XMLHttpRequest();
			xhr.open("POST", "//error_reporting.scrunch.io/error", true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.send(finalData);

			reportedErrors++;
        });
	</script>

	<!-- SERVER LIST -->
	<script src="/serverData.js"></script>
</head>
<body>

	<!-- SCRIPTS -->
	<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.4/howler.core.min.js"></script>
	<!-- <script async src="http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> -->
	<script src="https://apis.google.com/js/platform.js"></script>

	<!-- PLAYWIRE -->
	<div id="my-content" style="display: none;"><!-- You watched an ad --></div>
	<div id="pre-content-container" style="display: none">

	</div>

	<!-- CONFIRM CLOSE PAGE -->
	<script>
	    window.onbeforeunload = function(e) {
	       return 'Are you sure?';
	    };
	</script>

	<!-- ERROR NOTIFICATION -->
	<div id="errorNotification" class="menuCard" style="display: none">
		<div>It looks like MooMoo ran in to a problem. Please try <a target="_blank" href="https://www.computerhope.com/issues/ch001411.htm">disabling all of your browser extensions</a> and reloading the page. If the issue persists, please report the issue to us on Reddit or Discord.</div>
		<div style="text-align: center"><a onclick="errorNotification.style.display = 'none'" style="cursor:pointer">Hide</a></div>
	</div>

	<!-- MAIN MENU -->
	<div id="mainMenu">
		<div id="menuContainer">

			<!-- GAME NAME -->
			<div id="gameName">MOOMOO.io</div>

			<!-- LOADING TEXT -->
			<div id="loadingText">Loading...</div>

			<!-- MENU CARDS -->
			<div id="menuCardHolder" style="display:none;">
				<div class="menuCard" id="adCard">
					<!-- <ins class="adsbygoogle"
					     style="display:inline-block;width:300px;height:250px"
					     data-ad-client="ca-pub-4505182558467475"
					     data-ad-slot="4965955347"></ins>
					<script>
						(adsbygoogle = window.adsbygoogle || []).push({});
					</script> -->
					<div align="center" id="moomooio_300x250_1">
						<script data-cfasync="false" type="text/javascript">
						    freestar.queue.push(function () { googletag.display('moomooio_300x250_1'); });
						</script>
					</div>
				</div>
				<div style="display:inline-block;">
					<div class="menuCard" id="setupCard">
						<input type="text" id="nameInput" placeholder="Enter Name" maxlength="15"></input>
						<div id="enterGame" class="menuButton"><span>Enter Game</span></div>
						<div id="mobileDownloadButtonContainer">
							<a class="downloadBadge" href="https://itunes.apple.com/us/app/moomoo-io-mobile/id1236581367?ls=1&mt=8" target="_blank"><img src="./img/badges/ios.svg"></a></img>
							<a class="downloadBadge" href="https://play.google.com/store/apps/details?id=com.yendis.moomoo_mobile" target="_blank"><img src="./img/badges/android.png"></img></a>
						</div>
					</div>
					<div id="promoImgHolder" class="menuCard" style="display:block;margin-top:14px;padding-bottom:12px;" id="setupCard">
						<img id="promoImg" src='./img/promotion/banner_3.png' style="width:300px;cursor:pointer"></img>
					</div>
				</div>
				<div id="rightCardHolder">
					<div class="menuCard" id="guideCard">
						<div class="menuHeader">Servers</div>
						<select id="serverBrowser"></select>
						<div id="altServer"></div>
						<div class="menuHeader" style="margin-top:10px">Select Color</div>
						<div id="skinColorHolder"></div>
						<div class="menuHeader" style="margin-top:10px">How To Play</div>
						<div class="menuText">Collect resources around the map to build a village.
							Your Windmills generate gold over time. But make sure to protect them from other players.</div>
						<div class="menuHeader">Controls</div>
						<div id="desktopInstructions" class="menuText">
							Movement: W, A, S, D<br/>
							Look: Mouse<br/>
							Gather/Attack: Mouse or Space<br/>
							Auto Attack: E<br/>
							Select Item: 1-9 or Click<br/>
							Quick Select Food: Q<br/>
							Lock Rotation: X<br/>
							Ping Minimap: R<br/>
							Add Map Marker: C<br/>
							Chat: Enter Key<br/>
							Close Windows: ESC
						</div>
						<div id="mobileInstructions" class="menuText">
							Movement: Drag on left side of screen<br/>
							Gather/Attack: Drag on right side of screen<br/>
							Select Item: Touch item at bottom<br/>
							Ping Minimap: Touch map<br/>
						</div>
						<div class="menuHeader">Settings</div>
						<div class="settingRadio"><input id="nativeResolution" type="checkbox" /> Use Native Resolution</div>
						<div class="settingRadio"><input id="showPing" type="checkbox" /> Show Ping</div>
						<div id="smallLinks">
							<div class="menuHeader">Links</div>
							<div class="menuText">
								<a href="./docs/versions.txt" target="_blank" class="menuLink">v1.6.6</a> |
								<a href="https://discord.gg/rhEybn5" target="_blank" class="menuLink">Discord</a> |
								<a href="https://www.reddit.com/r/moomooio/" target="_blank" class="menuLink">Reddit</a> |
								<a href="./docs/terms.txt" target="_blank" class="menuLink">Terms</a> |
								<a href="./docs/privacy.txt" target="_blank" class="menuLink">Privacy</a> |
								<a href="http://iogames.space" target="_blank" class="menuLink">More Games</a>
							</div>
							<div class="menuText">
								Created by <a href="https://twitter.com/Sidney_de_Vries" target="_blank" class="menuLink">Sidney de Vries</a>
							</div>
						</div>
					</div>
					<div id="downloadButtonContainer" class="menuCard">
						<a class="downloadBadge" href="https://itunes.apple.com/us/app/moomoo-io-mobile/id1236581367?ls=1&mt=8" target="_blank"><img src="./img/badges/ios.svg"></a></img>
						<a class="downloadBadge" href="https://play.google.com/store/apps/details?id=com.yendis.moomoo_mobile" target="_blank"><img src="./img/badges/android.png"></img></a>
					</div>
				</div>
			</div>
		</div>

		<!-- SETTINGS -->
		<div id="settingsButton" class="ytLink">
			<i class="material-icons" style="font-size:30px;vertical-align:middle">&#xE8B8;</i>
			<span>Settings</span>
		</div>

		<!-- PARTY INTO -->
		<div id="partyButton" class="inParty"><span></span>
			<i class="material-icons" style="font-size:30px;vertical-align:middle">&#xE8D3;</i>
		</div>

		<!-- JOIN PARTY -->
		<div id="joinPartyButton" class="ytLink"><span>Join Party</span>
			<i class="material-icons" style="font-size:30px;vertical-align:middle">&#xE0DA;</i>
		</div>

		<!-- PING -->
		<div id="pingDisplay" hidden>Not connected</div>

		<!-- YOUTUBER OF THE DAY -->
		<div id="youtuberOf">
		    Featured Mootuber:
		    <div class="spanLink" id="featuredYoutube">
		    </div>
		</div>

		<!-- FOLLOW TEXT -->
		<div id="followText">Start with more Resources:</div>

		<!-- TWITTER BUTTON -->
		<div id="twitterFollow">
			<a class="twitter-share-button"
		  		href="https://twitter.com/share"
				data-text="Come play moomoo with me"
				data-hashtags="moomooio,gaming,youtube"
		  		data-size="large">Share
			</a>
			<a href="https://twitter.com/Sidney_de_Vries" class="twitter-follow-button"
				data-show-screen-name="false" data-size="large" data-show-count="true">Follow</a>
		</div>
		<script>
			twttr.ready(function (twttr) {
			    twttr.events.bind('follow', function(event) {
			        follmoo();
			    });
			});
		</script>

		<!-- YOUTUBE BUTTON -->
		<div id="youtubeFollow">
			<div class="g-ytsubscribe" data-channelid="UCo-hjA9tDF5Sdfnp6eQD0XA" data-layout="default"
				data-count="default"></div>
			<div id="youtubeContainer" hidden></div>
		</div>
		<script>
	        function onYtEvent(payload) {
		        if (payload.eventType == 'subscribe') {
			        follmoo();
			    }
		    }
		</script>

		<!-- LINKS CONTAINERS -->
		<div id="linksContainer2">
			<a href="./docs/versions.txt" target="_blank" class="menuLink">v1.6.6</a> |
			<a href="https://discord.gg/rhEybn5" target="_blank" class="menuLink">Discord</a> |
			<a href="https://www.reddit.com/r/moomooio/" target="_blank" class="menuLink">Reddit</a> |
			<a href="./docs/terms.txt" target="_blank" class="menuLink">Terms</a> |
			<a href="./docs/privacy.txt" target="_blank" class="menuLink">Privacy</a> |
			<a href="http://iogames.space" target="_blank" class="menuLink">More Games</a>
		</div>

	</div>

	<!-- DEATH TEXT -->
	<div id="diedText">YOU DIED</div>

	<!-- GAME UI -->
	<div id="gameUI" style="display: none;">
		<div id="chatHolder" style="display:none;">
			<input id="chatBox" type="text" placeholder="Enter Message" maxlength="30"></input>
		</div>
		<div id="upgradeHolder"></div>
		<div id="upgradeCounter"></div>
		<div id="ageText"></div>
		<div id="ageBarContainer">
			<div id="ageBar">
				<div id="ageBarBody"></div>
			</div>
		</div>
		<div id="topInfoHolder">
			<div id="leaderboard">
				Leaderboard
				<div id="leaderboardData"></div>
			</div>
			<div></div>
			<div id="killCounter" class="resourceDisplay"></div>
		</div>
		<div id="itemInfoHolder" class="uiElement">
		</div>
		<div id="resDisplay">
			<div id="foodDisplay" class="resourceDisplay"></div>
			<div id="woodDisplay" class="resourceDisplay"></div>
			<div id="stoneDisplay" class="resourceDisplay"></div>
			<div id="scoreDisplay" class="resourceDisplay"></div>
		</div>
		<div id="actionBar"></div>
		<div id="noticationDisplay" style="display:none"></div>
		<div id="allianceButton" class="uiElement gameButton">
			<i class="material-icons" style="font-size:40px;vertical-align:middle">&#xE8D3;</i>
		</div>
		<div id="storeButton" class="uiElement gameButton">
			<i class="material-icons" style="font-size:40px;vertical-align:middle">&#xE8D1;</i>
		</div>
		<div id="chatButton" class="uiElement gameButton">
			<i class="material-icons" style="font-size:40px;vertical-align:middle">&#xE8AF;</i>
		</div>
		<canvas id="mapDisplay">
		</canvas>
		<div id="storeMenu">
			<div style="padding-bottom:15px">
				<div class="storeTab" style="margin-right:10px" onclick="changeStoreIndex(0)">Hats</div>
				<div class="storeTab" onclick="changeStoreIndex(1)">Accessories</div>
			</div>
			<div id="storeHolder">
			</div>
		</div>
		<div id="allianceMenu">
			<div id="allianceHolder"></div>
			<div id="allianceManager"></div>
		</div>
	</div>

	<!-- GAME CANVAS -->
	<canvas id="gameCanvas"></canvas>

	<!-- LOAD SCRIPTS -->
	<div id='cdm-zone-end'></div>

	<!-- INIT SCRIPT -->
	<script>
		var loadedScript = false;

		setTimeout(function() {
			if (!loadedScript) {
				alert("Bundle could not load. Could be an issue with the party key.");
				window.location.href = "/";
			}
		}, 45000);
	</script>

	<script src="bundle.js"></script>
</body>
</html>