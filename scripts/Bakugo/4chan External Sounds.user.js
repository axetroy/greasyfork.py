// ==UserScript==
// @name 4chan External Sounds
// @namespace b4k
// @description Plays audio associated with images on 4chan.
// @author Bakugo
// @version 1.0.0
// @match *://boards.4chan.org/*
// @run-at document-start
// ==/UserScript==

(function() {
	var regexFileURL;
	var regexTrigger;
	var audioPlayers;
	var processFile;
	var processFiles;
	var getFileKey;
	var playFile;
	
	regexFileURL = /\/\/i.4cdn.org\/(.+?)\/(\d+?)\.(.+?)$/;
	regexTrigger = /\[audio[\|\$](.*?)\]/i;
	
	audioPlayers = {};
	
	document.addEventListener("4chanXInitFinished", function (event) {
		if (!document.documentElement.classList.contains("fourchan-x")) {
			return;
		}
		
		processFiles(document.body);
		
		(new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if (mutation.type === "childList") {
					mutation.addedNodes.forEach(function (node) {
						if (node.nodeType === Node.ELEMENT_NODE) {
							processFiles(node);
							playFile(node);
						}
					});
				}
			});
		})).observe(document.body, {
			childList: true,
			subtree: true
		});
	});
	
	processFile = function (file) {
		var fileLink;
		var fileKey;
		var fileName;
		var fileNameEls;
		var fileNameMatch;
		var audioURL;
		var audioPlayer;
		
		if (!file.classList.contains("file")) {
			return;
		}
		
		fileLink =
			file.querySelector(".file-info > a");
		
		if (!fileLink) {
			return;
		}
		
		fileKey =
			getFileKey(fileLink.href);
		
		if (!fileKey) {
			return;
		}
		
		fileName = null;
		
		fileNameEls = [
			file.querySelector(".file-info .fnfull"),
			file.querySelector(".file-info > a")
		];
		
		fileNameEls.forEach(function (node) {
			if (fileName) {
				return;
			}
			
			if (node && node.textContent) {
				fileName = node.textContent;
			}
		});
		
		if (!fileName) {
			return;
		}
		
		fileNameMatch =
			fileName.match(regexTrigger);
		
		if (!fileNameMatch) {
			return;
		}
		
		audioURL = fileNameMatch[1];
		audioURL = window.decodeURIComponent(audioURL);
		audioURL = (audioURL.match(/^(https?\:)?\/\//) ? audioURL : ("http://" + audioURL));
		
		audioPlayer = document.createElement("audio");
		audioPlayer.src = audioURL;
		audioPlayer.preload = "none";
		
		audioPlayers[fileKey] = audioPlayer;
	};
	
	processFiles = function (target) {
		target.querySelectorAll(".post")
			.forEach(function (post) {
				if (post.parentElement.parentElement.id === "qp") {
					return;
				}
				
				if (post.parentElement.classList.contains("noFile")) {
					return;
				}
				
				post.querySelectorAll(".file")
					.forEach(function (file) {
						processFile(file);
					});
			});
	};
	
	getFileKey = function (fileURL) {
		var fileURLMatch;
		
		fileURLMatch =
			fileURL.match(regexFileURL);
		
		if (!fileURLMatch) {
			return null;
		}
		
		return (fileURLMatch[1] + "." + fileURLMatch[2]);
	};
	
	playFile = function (target) {
		var fileKey;
		var audioPlayer;
		var checkInterval;
		
		if (!(target.id === "ihover" || target.className === "full-image")) {
			return;
		}
		
		fileKey =
			getFileKey(target.src);
		
		if (!fileKey) {
			return;
		}
		
		audioPlayer =
			audioPlayers[fileKey];
		
		if (!audioPlayer) {
			return;
		}
		
		if (!audioPlayer.paused) {
			return;
		}
		
		switch (target.tagName) {
			case "IMG":
				audioPlayer.currentTime = 0;
				audioPlayer.loop = true;
				audioPlayer.play();
				
				break;
			
			case "VIDEO":
				audioPlayer.currentTime = target.currentTime;
				audioPlayer.loop = false;
				audioPlayer.play();
				
				break;
			
			default:
				return;
		}
		
		checkInterval =
			window.setInterval(function () {
				if (document.body.contains(target)) {
					if (target.tagName === "VIDEO") {
						if (audioPlayer.duration) {
							if (target.currentTime > audioPlayer.duration) {
								audioPlayer.pause();
							} else {
								if (Math.abs(target.currentTime - audioPlayer.currentTime) > 0.1) {
									audioPlayer.currentTime = target.currentTime;
								}
								
								if (!target.paused && audioPlayer.paused) {
									audioPlayer.play();
								}
								
								if (target.paused && !audioPlayer.paused) {
									audioPlayer.pause();
								}
							}
						}
					}
				} else {
					window.clearInterval(checkInterval);
					audioPlayer.pause();
				}
			}, 10);
	};
})();
