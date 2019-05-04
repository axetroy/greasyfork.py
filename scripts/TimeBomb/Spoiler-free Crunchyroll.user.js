// ==UserScript==
// @name          Spoiler-free Crunchyroll
// @description   Hide name and description of episodes
// @author        TimeBomb
// @namespace     https://greasyfork.org/users/160017
// @version       0.3
// @copyright     2018
// @run-at        document-start
// @match         http://www.crunchyroll.com/*
// ==/UserScript==

// USER CONFIGS BEGIN
var USER_CONFIG = {
	// Filter for series episode listing pages (e.g. http://www.crunchyroll.com/naruto-shippuden)
	FILTER_EPISODES: {
		EPISODE_IMAGES: true, // true: Hide episode images
		EPISODE_NAMES: true, // true: Hide episode names
		EPISODE_HOVER: true, // true: Hide tooltip showing episode names and descriptions on hover
	},

	// Filter for your Queue page (http://www.crunchyroll.com/home/queue)
	FILTER_MY_QUEUE: {
		EPISODE_IMAGES: true, // true: Hide episode images on main queue page
		EPISODE_NAME: true, // true: Hide episode name
		EPISODE_DESCRIPTION: true, // Hide episode description
		EPISODES_CAROUSEL_IMAGES: true, // true: Hide images on series episode carousel (when clicking down arrow)
		EPISODES_CAROUSEL_NAME: true, // true: Hide episode name on series episode carousel
		EPISODES_CAROUSEL_HOVER: true, // true: Hide tooltip showing episode name and description when hovering over episode on series episode carousel
	},

	// Filter for episode player pages (e.g. http://www.crunchyroll.com/rwby/episode-1-ruby-rose-643525)
	FILTER_EPISODE_PLAYER: {
		EPISODE_NAME: true, // true: Hide episode name in title above player and right sidebar below player
		EPISODE_DESCRIPTION: true, // true: Hide episode description in right sidebar below player
		EPISODES_CAROUSEL_IMAGES: true, // true: Hide images on episode carousel below player
		EPISODES_CAROUSEL_NAME: true, // true: Hide episode names on episode carousel
		EPISODES_CAROUSEL_HOVER: true, // true: Hide tooltip showing episode name and description when hovering over episode on episode carousel
	}
};
// USER CONFIGS END, DO NOT EDIT ANYTHING BELOW

var DEBUG = false;
var EPISODE_DELIMITER= '–'; // Not a normal hyphen, sometimes part of episode title+number, used for truncating episode title
var QUEUE_URI = '/home/queue';
var PAGES = {
	EPISODES: 'EPISODES',
	QUEUE: 'QUEUE',
	PLAYER: 'PLAYER',
};

// We very briefly hide the <html> tag here, to ensure the user doesn't see unfiltered content
// The performance impact of applying our custom CSS is so minimal that users shouldn't notice this
// Once we finish applying our CSS below, we show the page and apply some final filters to truncate episode names that contain the episode number or link
document.documentElement.style.display = 'none';

var currentPage;
var currentPath = window.location.pathname;
var currentPathChunksLength = currentPath.split('/').length;
// We could check the DOM to further identify the page, but we don't want to hamper performance; this is good enough. False positives shouldn't matter.
if (currentPathChunksLength === 2) {
	currentPage = PAGES.EPISODES;
} else if (currentPath === QUEUE_URI) {
	currentPage = PAGES.QUEUE;
} else if (currentPathChunksLength === 3) {
	currentPage = PAGES.PLAYER;
}

// Developer Note:
// We are extra performant because most of our filters are just CSS we apply to the <head> prior to loading.
// We avoid jQuery and try to avoid function calls for performance's sake.
// Previous, less optimized versions of this script noticably slowed down the page; our performance is great as of 0.3 though.
// Super fragile custom CSS incoming, good luck if Crunchyroll changes their DOM.

if (currentPage === PAGES.EPISODES) {
	var cssE = '';

	if (USER_CONFIG.FILTER_EPISODES.EPISODE_IMAGES) {
		cssE = cssE + '.episode img { visibility: hidden }';
	}

	if (USER_CONFIG.FILTER_EPISODES.EPISODE_NAMES) {
		cssE = cssE + '.episode .short-desc { visibility: hidden }';
	}

	if (USER_CONFIG.FILTER_EPISODES.EPISODE_HOVER) {
		cssE = cssE + '.portrait-bubble { visibility: hidden }';
	}

	try {
		var $newStyleE = document.createElement('style');
		var cssNodeE = document.createTextNode(cssE);
		$newStyleE.appendChild(cssNodeE);
		document.head.appendChild($newStyleE);
	} catch (e) {
		if (DEBUG) {
			console.error('Episodes CSS Error:', e);
		}
	}
}

if (currentPage === PAGES.QUEUE) {
	var cssQ = '';

	// We hide the entire episode name and number, and add back in the episode number below, once the DOM loads
	if (USER_CONFIG.FILTER_MY_QUEUE.EPISODE_NAME) {
		cssQ = cssQ + '.episode .series-data { visibility: hidden }';
	}

	if (USER_CONFIG.FILTER_MY_QUEUE.EPISODE_DESCRIPTION) {
		cssQ = cssQ + '.episode .short-desc { visibility: hidden }';
	}

	if (USER_CONFIG.FILTER_MY_QUEUE.EPISODE_IMAGES) {
		cssQ = cssQ + '.episode img { visibility: hidden }';
	}

	if (USER_CONFIG.FILTER_MY_QUEUE.EPISODES_CAROUSEL_HOVER) {
		cssQ = cssQ + '.portrait-bubble { visibility: hidden }';
	}

	if (USER_CONFIG.FILTER_MY_QUEUE.EPISODES_CAROUSEL_IMAGES) {
		cssQ = cssQ + '.mug { visibility: hidden }';
	}

	if (USER_CONFIG.FILTER_MY_QUEUE.EPISODES_CAROUSEL_NAME) {
		cssQ = cssQ + '.collection-carousel-overlay-bottom { visibility: hidden }';
	}

	try {
		var $newStyleQ = document.createElement('style');
		var cssNodeQ = document.createTextNode(cssQ);
		$newStyleQ.appendChild(cssNodeQ);
		document.head.appendChild($newStyleQ);
	} catch (e) {
		if (DEBUG) {
			console.error('My Queue Filter Issue:', e);
		}
	}
}

if (currentPage === PAGES.PLAYER) {
	var cssP = '';

	if (USER_CONFIG.FILTER_EPISODE_PLAYER.EPISODES_CAROUSEL_NAME) {
		cssP = cssP + '.collection-carousel-overlay-bottom { visibility: hidden }';
	}

	if (USER_CONFIG.FILTER_EPISODE_PLAYER.EPISODES_CAROUSEL_IMAGES) {
		cssP = cssP + '.collection-carousel-media-thumb img { visibility: hidden }';
	}

	if (USER_CONFIG.FILTER_EPISODE_PLAYER.EPISODES_CAROUSEL_HOVER) {
		cssP = cssP + '.portrait-bubble { visibility: hidden }';
	}

	if (USER_CONFIG.FILTER_EPISODE_PLAYER.EPISODE_NAME) {
		cssP = cssP + 'h1.ellipsis { visibility: hidden }' +
			'#showmedia_about_name { visibility: hidden }';
	}

	if (USER_CONFIG.FILTER_EPISODE_PLAYER.EPISODE_DESCRIPTION) {
		cssP = cssP + '.description.medium-margin-bottom { visibility: hidden}';
	}

	try {
		var $newStyleP = document.createElement('style');
		var cssNodeP = document.createTextNode(cssP);
		$newStyleP.appendChild(cssNodeP);
		document.head.appendChild($newStyleP);
	} catch (e) {
		if (DEBUG) {
			console.error('Episode Player Filter Issue:', e);
		}
	}
}

document.documentElement.style.display = '';

// This is faster than any sort of window.onload, as that waits for all scripts/images/etc to be loaded
// where this is only waiting for the literal HTML to be loaded into the DOM
document.addEventListener('DOMContentLoaded', function () {
	if (currentPage === PAGES.QUEUE) {
		try {
			// Truncate episode name but keep episode number
			if (USER_CONFIG.FILTER_MY_QUEUE.EPISODE_NAME) {
				var $episodesQ = document.getElementsByClassName('episode');
				var episodesLengthQ = $episodesQ.length;
				for (var q1 = 0; q1 < episodesLengthQ; q1++) {
					var $episodeQ = $episodesQ[q1];
					var $titleQ = $episodeQ.getElementsByClassName('series-data')[0];
					var textQ = $titleQ.innerHTML;
					var textTruncateIndexQ = textQ.indexOf(EPISODE_DELIMITER);
					if (textTruncateIndexQ > -1) {
						$titleQ.innerHTML = textQ.substr(0, textTruncateIndexQ);
					}

					$titleQ.style.visibility = 'visible';
				}
			}
		} catch (e) {
			console.error('My Queue DOM-Loaded Filter Issue:', e);
		}
	}

	if (currentPage === PAGES.PLAYER) {
		try {
			if (USER_CONFIG.FILTER_EPISODE_PLAYER.EPISODE_NAME) {
				// Hide episode name in title above player
				var $h1s = document.getElementsByTagName('h1');
				var h1sLen = $h1s.length;
				for (var p1 = 0; p1 < h1sLen; p1++) {
					var $h1 = $h1s[p1];
					if (!$h1.classList.contains('ellipsis')) {
						continue;
					}

					var textP = $h1.innerHTML;
					if (!textP) {
						continue; // Slightly ugly way to handle errors, should clean this up...
					}
					var textTruncateIndexP = textP.indexOf(EPISODE_DELIMITER);
					if (textTruncateIndexP > -1) {
						$h1.innerHTML = textP.substr(0, textTruncateIndexP);
					}

					$h1.style.visibility = 'visible';
				}
			}
		} catch (e) {
			if (DEBUG) {
				console.error('Episode Player DOM-Loaded Filter Issue:', e);
			}
		}
	}
});