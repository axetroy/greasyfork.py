// ==UserScript==
// @name         Youtube Play Next Queue
// @version      1.2.12
// @description  Don't like the youtube autoplay suggestion? This script can create a queue with videos you want to play after your current video has finished!
// @author       Cpt_mathix
// @match        https://www.youtube.com/*
// @license      GPL-2.0+; http://www.gnu.org/licenses/gpl-2.0.txt
// @namespace    https://greasyfork.org/users/16080
// @run-at       document-start
// @grant        none
// @noframes
// ==/UserScript==

function youtube_play_next_queue() {
	var script = {
		ytplayer: null,
		playnext: true,
		instantplay: true,
		queue: new Queue(),
		suggestion: "",
		version: "1.2.0",
		search_timeout: null,
		search_suggestions: [],
		debug: false
	};

	// callback function for search results
    window.search_callback = search_callback;

	// youtube search parameters
	const GeoLocation = window.yt.config_.INNERTUBE_CONTEXT_GL;
	const HostLanguage = window.yt.config_.INNERTUBE_CONTEXT_HL;

	// reload script on page change using youtube spf events (http://youtube.github.io/js/documentation/events/)
	window.addEventListener("spfdone", function(e) {
		if (script.debug) { console.log("new page loaded"); }
		clearSearchRequests();
		if (isPlayerAvailable()) {
			startScript(2);
		}
	});

	main();
	function main() {
		initGlobalScrollListener();
		initButtonGenerators();
		injectCSS();

		if (isPlayerAvailable()) {
			if (script.debug) { console.log("player available"); }
			startScript(5);
		} else {
			if (script.debug) { console.log("player unavailable"); }
		}
	}

	function startScript(retry) {
		script.ytplayer = getVideoPlayer();
		if (script.debug) { console.log("ytplayer: ", script.ytplayer); }
		if (script.ytplayer && !isPlaylist()) {
			if (getVideoInfoFromUrl(document.location.href, "t") == "0s") {
				script.ytplayer.seekTo(0);
			}
			if (script.debug) { console.log("initializing queue"); }
			initQueue();
			if (script.debug) { console.log("initializing search"); }
			initSearch();
			if (script.debug) { console.log("initializing video statelistener"); }
			initVideoStateListener();
			if (script.debug) { console.log("initializing queue buttons"); }
			initQueueButtons();
		} else if (script.ytplayer && isPlaylist()) {
			if (script.debug) { console.log("initializing search"); }
			initSearch();
		} else if (retry > 0) { // fix conflict with Youtube+ script
			setTimeout( function() {
				startScript(--retry);
			}.bind(retry), 1000);
		}
	}

	// *** LISTENERS *** //

	function initVideoStateListener() {
		if (!script.ytplayer.classList.contains('initialized-listeners')) {
			script.ytplayer.classList.add('initialized-listeners');

			// play next video in queue if current video has finished playing (state equal to 0)
			script.ytplayer.addEventListener("onStateChange", function(videoState) {
				if (script.debug) { console.log("state changed: ", videoState); }
				if (script.debug) { console.log("playnext: ", script.playnext); }
				if (script.debug) { console.log("instantplay: ", script.instantplay); }
				if (script.debug) { console.log("queue empty: ", script.queue.isEmpty()); }
				const FINISHED_STATE = 0;
				if (videoState === FINISHED_STATE && script.playnext === true && script.instantplay === true && !script.queue.isEmpty()) {
					script.queue.playNow();
				} else if (videoState !== FINISHED_STATE) {
					script.playnext = true;
				}
			});
		} else {
			if (script.debug) { console.log("statelistener already initialized"); }
		}
	}

	// Did new content load? Triggered everytime you scroll
	function initGlobalScrollListener() {
		document.addEventListener("scroll", function scroll(event) {
			// temporarily remove scroll listener to prevent multiple events
			event.currentTarget.removeEventListener(event.type, scroll);
			if (script.debug) { console.log("scroll"); }

			if (isPlayerAvailable()) {
				if (script.ytplayer === null) {
					startScript(0);
				} else if (!isPlaylist()) {
					initQueueButtons();
				}
			}

			setTimeout( function() {
				initGlobalScrollListener();
			}, 1000);
		});
	}

	// *** OBJECTS *** //

	// video object
	function ytVideo(title, id, html, anchor, author, time, stats, thumb) {
		this.title = title;
		this.id = id;
		this.html = html;
		this.buttonAnchor = anchor;
		this.author = author;
		this.time = time;
		this.length_seconds = hmsToSecondsOnly(time);
		this.stats = stats;
		this.iurlhq = thumb;
		this.iurlmq = thumb;
	}

	// hh:mm:ss => only seconds
	function hmsToSecondsOnly(str) {
		var p = str.split(":"),
			s = 0, m = 1;

		while (p.length > 0) {
			s += m * parseInt(p.pop(), 10);
			m *= 60;
		}

		return s;
	}

	// Queue object
	function Queue() {
		var queue = [];

		this.get = function() {
			return queue;
		};

		this.set = function(newQueue) {
			queue = newQueue;
			setCache("queue", this.get());
		};

		this.isEmpty = function() {
			return 0 === queue.length;
		};

		this.reset = function() {
			queue = [];
			this.update(0);
			this.show(0);
		};

		this.peek = function() {
			return queue[0];
		};

		this.enqueue = function(item) {
			queue.push(item);
			this.update();
			this.show(500);
		};

		this.dequeue = function() {
			var item = queue.shift();
			this.update();
			if (script.debug) { console.log("dequeued: ", item); }
			return item;
		};

		this.remove = function(index) {
			queue.splice(index, 1);
			this.update();
			this.show(250);
		};

		this.playNext = function(index) {
			var video = queue.splice(index, 1);
			queue.unshift(video[0]);
			this.update();
			this.show(0);
		};

		this.playNow = function() {
			script.playnext = false;
			var video = this.dequeue();
			playNextVideo(video.id);
		};

		this.html = function() {
			var html = "";
			queue.forEach( function(item) {
				html += item.html;
			});
			return html;
		};

		this.update = function() {
			setCache("queue", this.get());
			if (script.debug) { console.log("updated queue: ", this.get().slice()); }
		};

		this.show = function(delay) {
			setTimeout(function() {
				displayQueue();
			}, delay);
		};
	}

	// *** VIDEO & PLAYER *** //

	function getVideoPlayer() {
		return document.getElementById('movie_player');
	}

	function isPlayerAvailable() { // available on video pages without playlist or live chat
		return (/https:\/\/www\.youtube\.com\/watch\?v=.*/.test(document.location.href));
	}

	function isPlaylist() {
		return getVideoInfoFromUrl(document.location.href, "list");
	}

    function isLivePlayer() {
        return document.getElementById('live-chat-iframe') !== null;
    }

	function isPlayerFullscreen() {
		return (script.ytplayer.classList.contains('ytp-fullscreen'));
	}

	// play next video behavior depending on if you're watching fullscreen
	function playNextVideo(nextVideoId) {
		if (script.debug) { console.log("playing next song"); }
		if (isPlayerFullscreen()) {
			script.ytplayer.loadVideoById(nextVideoId, 0);
		} else {
			window.spf.navigate("https://www.youtube.com/watch?v=" + nextVideoId + "&t=0s");
		}
	}

	// reconfigure the next video button (video player)
	function changeNextVideo(video) {
		if (script.debug) { console.log("changing next video button"); }

		// next video autoplay settings
		var related_vid_config = window.yt.config_.RELATED_PLAYER_ARGS;
		var related_vids_params = related_vid_config.rvs.split(",");
		var first_vid_params = related_vids_params[0];
		var other_vid_params = related_vids_params.slice(1).join(",");

		// changing next video with first from queue
		var params = ["author", "id", "title", "iurlhq", "iurlmq", "length_seconds", "short_view_count_text"];
		for (var i = 0; i < params.length; i++) {
			var re = new RegExp("(" + params[i] + ")=(.[^&]+)", "g");
			first_vid_params = first_vid_params.replace(re, function($0, param, value) {
				return param + "=" + encodeURIComponent(video[param] || "");
			});
		}

		script.ytplayer.updateVideoData(JSON.parse('{"rvs":"' + first_vid_params + ',' + other_vid_params + '"}'));
	}

	function getPlayType() {
		return (script.instantplay) ? "Instantplay" : "Autoplay";
	}

	function getVideoInfoFromUrl(url, info) {
		if (url.indexOf("?") === -1) {
			return null;
		}

		var urlVariables = url.split("?")[1].split("&"),
			varName;

		for (var i = 0; i < urlVariables.length; i++) {
			varName = urlVariables[i].split("=");

			if (varName[0] === info) {
				return varName[1] === undefined ? null : varName[1];
			}
		}
	}

	// extracting video information and creating a video object (that can be added to the queue)
	function findVideoInformation(video, selector) {
		var anchor = video.querySelector(selector + ' .yt-uix-sessionlink:not(.related-playlist)');
		if (anchor) {
			var title = video.querySelector('span.title').textContent.trim();
			var author = video.querySelector('span.author') ? video.querySelector('span.author').textContent.trim() : video.querySelector('span.attribution').textContent.trim();
			var time = video.querySelector('span.video-time') ? video.querySelector('span.video-time').textContent.trim() : "0";
			var thumb = video.querySelector('span.yt-uix-simple-thumb-related > img').dataset.thumb || video.querySelector('span.yt-uix-simple-thumb-related > img').src;
			var id = getVideoInfoFromUrl(video.querySelector('a.yt-uix-sessionlink').href, "v");
			var newVidObject = new ytVideo(title, id, video.outerHTML, anchor, author, time, null, thumb);
			return newVidObject;
		}
		return null;
	}

	// *** QUEUE *** //

	function initQueue() {
		var cachedQueue = getCache("queue");

		if (cachedQueue) {
			script.queue.set(cachedQueue);
		} else {
			setCache("queue", script.queue.get());
		}

		// instantplay settings
		script.instantplay = getCache("instantplay") || script.instantplay;

		// prepare html for queue
		var queue = document.getElementsByClassName('autoplay-bar')[0];
		queue.classList.add('video-list');
		queue.id = 'watch-queue';

		// add class to suggestion video so it doesn't get queue related buttons
		var suggestion = queue.getElementsByClassName('related-list-item')[0];
		suggestion.classList.add('suggestion');
		script.suggestion = suggestion.outerHTML;

		// show the queue if not empty
		if (!script.queue.isEmpty()) {
			// dequeue video from the queue if it is playing
			if (script.ytplayer.getVideoData().video_id === script.queue.peek().id) {
				script.queue.dequeue();
				script.ytplayer.seekTo(0);
			}

			displayQueue();
		}
	}

	function displayQueue() {
		if (script.debug) { console.log("showing queue: ", script.queue.get()); }

		var html = script.queue.html();
		var queue = document.querySelector('.autoplay-bar');
		var anchor = document.querySelector('.watch-sidebar-head');
		var suggestion;
		var suggestion_anchor = document.querySelector('.watch-sidebar-body > .video-list');

		// cleanup current queue
		var li = document.querySelectorAll('.autoplay-bar > li.video-list-item');
		if (li) {
			for (var i = li.length - 1; i >= 0; i--) {
				li[i].remove();
			}
		}

		// display new queue
		if (html !== null && !script.queue.isEmpty() && queue !== null && anchor !== null) {
			// insert new queue
			anchor.insertAdjacentHTML("afterend", html);

			// button generators
			var playNextButtonGenerator = new PlayNextButtonGenerator();
			var playNowButtonGenerator = new PlayNowButtonGenerator();
			var removeButtonGenerator = new RemoveButtonGenerator();
			var suggestionAddButtonGenerator = new SuggestionAddButtonGenerator();

			// add remove buttons
			var items = queue.querySelectorAll('.related-list-item:not(.suggestion)');
			for (var z = 0; z < items.length; z++) {
				var video = findVideoInformation(items[z], '#watch-queue');

				// remove addbutton if there is one
				var addedButton = items[z].querySelector('.queue-add, .queue-add-suggestion');
				if (addedButton) { addedButton.remove(); }

				if (video) {
					if (z > 0) {
						playNextButtonGenerator.build(video, z);
					} else {
						playNowButtonGenerator.build(video);
					}
					removeButtonGenerator.build(video, z);
				}
			}

			// replace autoplay options with remove queue button
			var autoplay = queue.querySelector('.checkbox-on-off');
			if (autoplay) {
				removeQueueButton(autoplay);
				// changePlayTypeButton(autoplay);
			}

			// add queue button to suggestion video
			suggestion = queue.querySelector('.suggestion:not(.processed)');
			if (suggestion) {
				var suggestionVideo = findVideoInformation(suggestion, '#watch-queue');
				suggestion.classList.add('processed');
				suggestionAddButtonGenerator.build(suggestionVideo);
			}

			// triggering lazyload
			window.scrollTo(window.scrollX, window.scrollY + 1);
			window.scrollTo(window.scrollX, window.scrollY - 1);

			// remove not interested menu
			var menu = queue.getElementsByClassName('yt-uix-menu-trigger');
			for (var j = menu.length - 1; j >= 0; j--) {
				menu[j].remove();
			}

			// change next video button of the youtube player
			setTimeout( function() {
				var autoplay = script.queue.peek();
				if (autoplay) {
					changeNextVideo(autoplay);
				}
			}, 1000);
		} else if (suggestion_anchor.children.length === 0) {
			suggestion_anchor.insertAdjacentHTML("afterbegin", script.suggestion);

			// triggering lazyload
			window.scrollTo(window.scrollX, window.scrollY + 1);
			window.scrollTo(window.scrollX, window.scrollY - 1);

			// change next video button of the youtube player
			changeNextVideo(findVideoInformation(suggestion_anchor.firstChild, '#watch-queue'));
		} else {
			suggestion = document.querySelector('.suggestion');
			if (suggestion.querySelector('.queue-add-suggestion')) {
				suggestion.classList.remove('processed', 'processed-buttons');
				suggestion.querySelector('.queue-add-suggestion').remove();
			}

			// change next video button of the youtube player
			changeNextVideo(findVideoInformation(suggestion, '#watch-queue'));
		}
	}

	// *** BUTTONS *** //

	// initialize Button Generators (Template design)
	function initButtonGenerators() {
		AddButtonGenerator.prototype = new ButtonGenerator();
		SuggestionAddButtonGenerator.prototype = new ButtonGenerator();
		RemoveButtonGenerator.prototype = new ButtonGenerator();
		PlayNextButtonGenerator.prototype = new ButtonGenerator();
		PlayNowButtonGenerator.prototype = new ButtonGenerator();
	}

	// finding video's and adding the queue buttons
	function initQueueButtons() {
		var addButtonGenerator = new AddButtonGenerator();
		var videos = document.querySelectorAll('.related-list-item:not(.processed-buttons)');
		for (var j = 0; j < videos.length; j++) {
			try {
				var video = findVideoInformation(videos[j], '#watch-related');
				videos[j].classList.add('processed-buttons');
				if (video) {
					addButtonGenerator.build(video);
				}
			} catch(error) {
				console.error("Couldn't initialize \"Add to queue\" buttons for a video \n" + error.message);
			}
		}
	}

	// Button template
	function ButtonGenerator() {
		this.build = function(video, index) {
			var anchor = video.buttonAnchor;
			var html = "<div class=\"queue-button " + this.type + " yt-uix-button yt-uix-button-default yt-uix-button-size-default\"><button class=\"yt-uix-button-content\">" + this.text + "</button></div>";
			anchor.insertAdjacentHTML("beforeend", html);
			var button = this;

			anchor.getElementsByClassName(this.type)[0].addEventListener("click", function handler(e) {
				e.preventDefault();
				button.clickBehavior(this, video, index);
				e.currentTarget.removeEventListener(e.type, handler);
				if (button.type !== "queue-add-suggestion") {
					this.addEventListener("click", function(e) {
						e.preventDefault();
					});
				}
			});
		};
	}

	function AddButtonGenerator() {
		this.type = "queue-add";
		this.text = "Add to queue";
		this.clickBehavior = function(element, video, index) {
			element.textContent = "Queued!";
			script.queue.enqueue(video);
		};
	}

	function SuggestionAddButtonGenerator() {
		this.type = "queue-add-suggestion";
		this.text = "Add to queue";
		this.clickBehavior = function(element, video, index) {
			element.textContent = "Queued!";
			var suggestion = document.getElementsByClassName('suggestion')[0];
			suggestion.classList.remove('suggestion');
			video.html = suggestion.outerHTML;
			script.queue.enqueue(video);
			suggestion.remove();
		};
	}

	function RemoveButtonGenerator() {
		this.type = "queue-remove";
		this.text = "Remove";
		this.clickBehavior = function(element, video, index) {
			element.textContent = "Removed!";
			script.queue.remove(index);
			restoreAddButton(video.id);
		};
	}

	function PlayNextButtonGenerator() {
		this.type = "queue-next";
		this.text = "Play Next";
		this.clickBehavior = function(element, video, index) {
			this.textContent = "To the top!";
			script.queue.playNext(index);
		};
	}

	function PlayNowButtonGenerator() {
		this.type = "queue-now";
		this.text = "Play Now";
		this.clickBehavior = function(element, video, index) {
			this.textContent = "Playing!";
			script.queue.playNow();
		};
	}

	// The "remove queue and all its videos" button
	function removeQueueButton(anchor) {
		var html = "<div class=\"queue-button remove-queue yt-uix-button yt-uix-button-default yt-uix-button-size-default\"><button class=\"yt-uix-button-content\">Remove Queue</button></div>";
		anchor.innerHTML = html;

		anchor.getElementsByClassName('remove-queue')[0].addEventListener("click", function handler(e) {
			e.preventDefault();
			this.textContent = "Removed!";
			script.queue.reset();
			restoreAddButton("*"); // restore all
			e.currentTarget.removeEventListener(e.type, handler);
			this.addEventListener("click", function (e) {
				e.preventDefault();
			});
		});
	}

	function changePlayTypeButton(anchor) {
		var html = "<div class=\"queue-button toggle-play-type yt-uix-button yt-uix-button-default yt-uix-button-size-default\"><button class=\"yt-uix-button-content\">" + getPlayType() + "</button></div>";
		var button = anchor.getElementsByClassName('toggle-play-type')[0];
		if (button) {
			button.outerHTML = html;
		} else {
			anchor.insertAdjacentHTML("afterbegin", html);
		}

		anchor.getElementsByClassName('toggle-play-type')[0].addEventListener("click", function handler(e) {
			e.preventDefault();
			script.instantplay = !script.instantplay;
			setCache("instantplay", script.instantplay);
			e.currentTarget.removeEventListener(e.type, handler);
			changePlayTypeButton(anchor);
		});
	}

	function restoreAddButton(id) {
		var addButtonGenerator = new AddButtonGenerator();
		var videos = document.querySelectorAll('.related-list-item');
		for (var j = 0; j < videos.length; j++) {
			if (id === "*" || id === getVideoInfoFromUrl(videos[j].querySelector('a.yt-uix-sessionlink').href, "v")) {
				// remove current addbutton if there is one
				var addedButton = videos[j].querySelector('.queue-add');
				if (addedButton) { addedButton.remove(); }

				// make new addbutton
				var video = findVideoInformation(videos[j], '#watch-related');
				if (video) {
					addButtonGenerator.build(video);
				}
			}
		}
	}

	// *** SEARCH *** //

	// initialize search
	function initSearch() {
		if (!document.getElementById('masthead-queue-search')) {
			var anchor, html;
			if (isPlaylist()) {
				anchor = document.querySelector('#watch7-sidebar-modules');
				html = "<input id=\"masthead-queue-search\" class=\"search-term yt-uix-form-input-bidi playlist-or-live\" type=\"search\" placeholder=\"Search\">";
			} else {
				anchor = document.querySelector('#watch7-sidebar-modules > div:nth-child(2)');
				html = "<input id=\"masthead-queue-search\" class=\"search-term yt-uix-form-input-bidi\" type=\"search\" placeholder=\"Search\">";
			}

			anchor.insertAdjacentHTML("afterbegin", html);

            // add class to current suggestions, so we can toggle hide/show
            var ul = document.getElementById('watch-related');
            var li = ul.querySelectorAll('li.video-list-item');
            if (li) {
                for (var i = li.length - 1; i >= 0; i--) {
                    li[i].classList.add('suggestion-queue');
                }
            }

			var input = document.getElementById('masthead-queue-search');

			// suggestion dropdown init
			new autoComplete({
				selector: '#masthead-queue-search',
				minChars: 1,
				delay: 250,
				source: function(term, suggest) {
					suggest(script.search_suggestions);
				},
				onSelect: function(event, term, item) {
					prepareNewSearchRequest(term);
				}
			});

            input.addEventListener('search', function(event) {
                if(this.value === "") {
                    showSuggestions(true);
                }
            });

			input.addEventListener("keydown", function(event) {
				const ENTER = 13;
				const BACKSPACE = 8;
				if (this.value !== "" && event.keyCode === ENTER) {
					prepareNewSearchRequest(this.value);
				} else if (this.value !== "" && event.keyCode === BACKSPACE) {
					searchSuggestions(this.value);
				} else {
					searchSuggestions(this.value + event.key);
				}
			});

            input.addEventListener("keyup", function(event) {
                if (this.value === "") {
                    showSuggestions(true);
                }
            });

			input.addEventListener("focus", function(event) {
				this.select();
			});
		}
	}

	// callback from search suggestions attached to window
	function search_callback(data) {
		var raw = data[1]; // extract relevant data from json
		script.search_suggestions = raw.map(function(array) {
			return array[0]; // change 2D array to 1D array with only suggestions
		});
	}

	// get search suggestions
	function searchSuggestions(value) {
		if (script.search_timeout !== null) { clearTimeout(script.search_timeout); }

		// only allow 1 search request every 100 milliseconds
		script.search_timeout = setTimeout( function() {
			if (script.debug) { console.log("search request send"); }
			var scriptElement = document.createElement("script");
			scriptElement.type = "text/javascript";
			scriptElement.className = "search-request";
			scriptElement.src = "https://clients1.google.com/complete/search?client=youtube&hl=" + HostLanguage + "&gl=" + GeoLocation + "&gs_ri=youtube&ds=yt&q=" + encodeURIComponent(value) + "&callback=search_callback";
			document.head.appendChild(scriptElement);
		}.bind(value), 100);
	}

	// send new search request (with the search bar)
	function prepareNewSearchRequest(value) {
		if (script.debug) { console.log("searching for " + value); }

		document.getElementById('masthead-queue-search').blur(); // close search suggestions dropdown
		script.search_suggestions = []; // clearing the search suggestions

		sendSearchRequest("https://www.youtube.com/results?disable_polymer=1&q=" + encodeURIComponent(value));
	}

	// given the url, retrieve the search results
	function sendSearchRequest(url) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				var container = document.implementation.createHTMLDocument().documentElement;
				container.innerHTML = xmlHttp.responseText;
				processSearch(container);
			}
		};
		xmlHttp.open("GET", url, true); // true for asynchronous
		xmlHttp.send(null);
	}

	function clearSearchRequests() {
		var requests = document.getElementsByClassName('search-request');
		if (requests) {
			for (var i = requests.length - 1; i >= 0; i--) {
				requests[i].remove();
			}
		}
	}

    function showSuggestions(boolean) {
        var ul = document.getElementById('watch-related');
        var li = ul.querySelectorAll('li.video-list-item');
        if (li) {
            for (var i = li.length - 1; i >= 0; i--) {
                var el = li[i];
                if (el.classList.contains('suggestion-queue')) {
                    if (boolean) {
                        el.style.display = "block";
                    } else {
                        el.style.display = "none";
                    }
                } else {
                    el.remove();
                }
            }
        }

        var currNavigation = ul.parentNode.getElementsByClassName('search-pager')[0];
		if (currNavigation) { currNavigation.remove(); } // remove navigation

        var seperation_line = ul.parentNode.getElementsByClassName('watch-sidebar-separation-line')[0];
        if (seperation_line) { seperation_line.remove(); } // remove seperation line

        // toggle hide/show the "More Suggestions" link
        var nextPage = document.getElementById('watch-more-related-button');
		if (nextPage !== null) {
            if (boolean) {
                nextPage.style.display = "block";
            } else {
                nextPage.style.display = "none";
            }
        }
    }

	// process search request
	function processSearch(container) {
		var videoList = container.getElementsByClassName('item-section')[0];
        var ul = document.getElementById('watch-related');

		// hide current suggestions and remove searched videos if any (and replace with new searched videos later)
		showSuggestions(false);

		// insert searched videos
		var videos = videoList.querySelectorAll('.yt-lockup-video');
		for (var j = videos.length - 1; j >= 0; j--) {
			var video = videos[j];
			if (video.querySelector('.yt-badge-live') === null) {
				try {
					var videoId = video.dataset.contextItemId;
					var videoTitle = video.querySelector('.yt-lockup-title > a').title;
					var videoStats = video.querySelector('.yt-lockup-meta').innerHTML;
					var videoTime = video.querySelector('.video-time') ? video.querySelector('.video-time').textContent : "0";
					var author = video.querySelector('.yt-lockup-byline') ? video.querySelector('.yt-lockup-byline').textContent : "";
					var videoThumb = video.querySelector('div.yt-lockup-thumbnail img').dataset.thumb || video.querySelector('div.yt-lockup-thumbnail img').src;

					var videoObject = new ytVideo(videoTitle, videoId, null, null, author, videoTime, videoStats, videoThumb);
					if (script.debug) { console.log(videoObject); }

					ul.insertAdjacentHTML("afterbegin", videoQueueHTML(videoObject).html);
				} catch (error) {
					console.error("failed to process video " + error.message, video);
				}
			}
		}

		// insert navigation buttons
		var navigation = container.getElementsByClassName('search-pager')[0];
		var buttons = navigation.getElementsByTagName('a');
		for (var k = 0; k < buttons.length; k++) {
			buttons[k].addEventListener("click", function handler(e) {
				e.preventDefault();
				document.getElementById('masthead-queue-search').scrollIntoView();
				window.scrollBy(0, -1 * document.getElementById('yt-masthead-container').clientHeight);
				sendSearchRequest(this.href);
			});
		}

		var currNavigation = ul.parentNode.getElementsByClassName('search-pager')[0];
		ul.parentNode.appendChild(navigation); // append new navigation
        ul.insertAdjacentHTML("afterend", "<hr class=\"watch-sidebar-separation-line\">"); // insert separation line between videos and navigation

		// only add queue buttons with normal video player
		if (!isPlaylist()) {
			initQueueButtons();
		}
	}

	// *** LOCALSTORAGE *** //

	function getCache(key) {
		return JSON.parse(localStorage.getItem("YTQUEUE#" + script.version + "#" + key));
	}

	function deleteCache(key) {
		localStorage.removeItem("YTQUEUE#" + script.version + "#" + key);
	}

	function setCache(key, value) {
		localStorage.setItem("YTQUEUE#" + script.version + "#" + key, JSON.stringify(value));
	}

	// *** HTML & CSS *** //

	function videoQueueHTML(video) {
		var strVar="";
		strVar += "<li class=\"video-list-item related-list-item show-video-time related-list-item-compact-video\">";
		strVar += "    <div class=\"related-item-dismissable\">";
		strVar += "        <div class=\"content-wrapper\">";
		strVar += "            <a href=\"\/watch?v=" + video.id + "\" class=\"yt-uix-sessionlink content-link spf-link spf-link\" rel=\"spf-prefetch\" title=\"" + video.title + "\">";
		strVar += "                <span dir=\"ltr\" class=\"title\">" + video.title + "<\/span>";
		strVar += "				   <span class=\"stat author\">" + video.author + "<\/span>";
		strVar += "				   <div class=\"yt-lockup-meta stat\">" + video.stats + "<\/div>";
		strVar += "            <\/a>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"thumb-wrapper\">";
		strVar += "	           <a href=\"\/watch?v=" + video.id + "\" class=\"yt-uix-sessionlink thumb-link spf-link spf-link\" rel=\"spf-prefetch\" tabindex=\"-1\" aria-hidden=\"true\">";
		strVar += "                <span class=\"yt-uix-simple-thumb-wrap yt-uix-simple-thumb-related\" tabindex=\"0\" data-vid=\"" + video.id + "\">";
		strVar += "                    <img aria-hidden=\"true\" alt=\"\" src=\"" + video.iurlhq + "\">";
		strVar += "                <\/span>";
		strVar += "            <\/a>";
		strVar += "	           <span class=\"video-time\">"+ video.time +"<\/span>";
		strVar += "            <button class=\"yt-uix-button yt-uix-button-size-small yt-uix-button-default yt-uix-button-empty yt-uix-button-has-icon no-icon-markup addto-button video-actions spf-nolink hide-until-delayloaded addto-watch-later-button yt-uix-tooltip\" type=\"button\" onclick=\";return false;\" title=\"Watch Later\" role=\"button\" data-video-ids=\"" + video.id + "\" data-tooltip-text=\"Watch Later\"><\/button>";
		strVar += "        <\/div>";
		strVar += "    <\/div>";
		strVar += "<\/li>";

		video.html = strVar;
		return video;
	}

	// injecting css
	function injectCSS() {
		var css = `
.autocomplete-suggestions {
text-align: left; cursor: default; border: 1px solid #ccc; border-top: 0; background: #fff; box-shadow: -1px 1px 3px rgba(0,0,0,.1);
position: absolute; display: none; z-index: 9999; max-height: 254px; overflow: hidden; overflow-y: auto; box-sizing: border-box;
}
.autocomplete-suggestion { position: relative; padding: 0 .6em; line-height: 23px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 1.02em; color: #333; }
.autocomplete-suggestion b { font-weight: normal; color: #b31217; }
.autocomplete-suggestion.selected { background: #f0f0f0; }

.yt-uix-simple-thumb-wrap > img { top: 0px; width: 168px; height: 94px; }
.watch-sidebar-body > div.search-pager { width: 97.5%; padding: 5px 5px; display: flex; justify-content: center; }
.watch-sidebar-body > div.search-pager > .yt-uix-button { margin: 0 1px; }

#masthead-queue-search { outline: none; width: 98%; padding: 5px 5px; margin: 0 4px; }
#masthead-queue-search.playlist-or-live { width: 97%; margin: 0 10px 10px 10px; }

#watch-queue { list-style: none; }
#watch-queue .standalone-collection-badge-renderer-icon { display: none; }
#watch-queue .standalone-collection-badge-renderer-text { display: none; }
#watch-queue .related-list-item span.title { max-height: 2.3em; }

#watch-related .queue-add { display: none; }
#watch-related .processed-buttons:hover .queue-add { display: inline-block; }
#watch-related .processed-buttons:hover .standalone-collection-badge-renderer-icon { display: none; }
#watch-related .processed-buttons:hover .standalone-collection-badge-renderer-text { display: none; }

.related-list-item:hover span.title { max-height: 2.3em; }
.queue-button { height: 15px; padding: 0.2em 0.4em 0.2em 0.4em; margin: 2px 0; }
.queue-remove { margin-left: 4px; }
.remove-queue { margin-top: -3px; }
.toggle-play-type { margin-right: 4px; margin-top: -3px; }
`;

		var style = document.createElement("style");
		style.type = "text/css";
		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}

		document.documentElement.appendChild(style);
	}
}

var autoCompleteScript = document.createElement('script');
autoCompleteScript.src = "https://cdnjs.cloudflare.com/ajax/libs/JavaScript-autoComplete/1.0.4/auto-complete.min.js";
(document.body || document.head || document.documentElement).appendChild(autoCompleteScript);

document.addEventListener("DOMContentLoaded", function() {
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ youtube_play_next_queue +')();'));
    (document.body || document.head || document.documentElement).appendChild(script);
});