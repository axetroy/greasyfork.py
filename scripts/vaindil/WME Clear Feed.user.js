// ==UserScript==
// @name            WME Clear Feed
// @description     Adds a link to the sidebar to clear your WME feed
// @namespace       vaindil
// @version         1.2
// @grant           none
// @include         https://www.waze.com/editor/*
// @include         https://www.waze.com/*/editor/*
// @include         https://beta.waze.com/editor/*
// @include         https://beta.waze.com/*/editor/*
// @exclude         https://www.waze.com/user/*
// @exclude         https://www.waze.com/*/user/*
// @author          vaindil
// ==/UserScript==

function getReadyToParty() {
    try {
        var element = $('#sidepanel-prefs');
        if ($(element).length) {
            hereWeGoBoiz();
        } else {
            setTimeout(hereWeGoBoiz, 1000);
        }
    } catch (err) {
        console.log("WMEClearFeed - " + err);
        setTimeout(hereWeGoBoiz, 1000);
    }
}

function hereWeGoBoiz() {
	$('#sidepanel-feed').prepend('<a id="wme-clear-feed-link" style="font-weight:bold;cursor:pointer">Clear feed</a>' +
								 '<div id="wme-clear-feed-msg" style="font-weight:bold;display:none"></div>');
	$('#wme-clear-feed-link').click(dewIt);
}

function dewIt() {
	var link = $('#wme-clear-feed-link');
	var msg = $('#wme-clear-feed-msg');
	var loadMore = $('.feed-load-more');
	var lastTry = false;

	link.hide();
	msg.text('Clearing feed, just a moment...').css('color', 'orange').show();

	// use lastTry because the feed occasionally loads things after a second click when the list was already empty
	var intervalID = setInterval(function() {
		loadMore.click();
		if ($('.feed-list > li').length === 0) {
			if (lastTry) {
				clearInterval(intervalID);
				finishUp();
				return;
			} else {
				lastTry = true;
				return;
			}
		}
		$('.feed-list > .feed-item > .inner > .delete').click();
	}, 1000);
}

function finishUp() {
	var link = $('#wme-clear-feed-link');
	var msg = $('#wme-clear-feed-msg');

	msg.text('Feed cleared!').css('color', 'green');
	setTimeout(function() {
		msg.fadeOut(500, 'swing', function() {
			msg.text('').hide();
			link.show();
		});
	}, 1500);
}

getReadyToParty();