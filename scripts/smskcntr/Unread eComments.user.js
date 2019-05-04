// ==UserScript==
// @name        Unread eComments
// @namespace   http://www.erepublik.com
// @description	Shows unread comments on eRepublik articles
// @include     http://www.erepublik.com/*/article/*
// @include     https://www.erepublik.com/*/article/*
// @version     0.0.6
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_listValues
// @grant		GM_deleteValue
// ==/UserScript==

init();

function init() {
	start(true);
	observeNewComments();
	deleteOldValues();
}

function deleteOldValues() {
    
	var maxArticles = 200;
    
	var storedValues = GM_listValues();
	console.log('Unread eComments: currently tracking ' + storedValues.length + ' article(s)');
    
	if(storedValues.length > maxArticles ){
		storedValues.sort(
			function sortFunction(a, b) {
				return getStoredData(a).registeredAt - getStoredData(b).registeredAt;
			}
		);
		
		var valuesToDelete = storedValues.length - maxArticles;
		
		console.log('Deleting comment info for ' + valuesToDelete + ' old article(s)');
		
		for(var i = 0; i < valuesToDelete; i++) {
			GM_deleteValue(storedValues[i]);
		}
	}
}


function start(isCountUnread) {
	var articleId = findArticleId();
	var commentsRead = getStoredData(articleId);

	if(commentsRead.registeredAt <= 0) {
		commentsRead.registeredAt = Math.round(new Date().getTime() / 1000); // timestamp in seconds
	}
	
	if(isCountUnread) {
		countUnread(commentsRead);
	}
	
	scanComments(commentsRead);
        
	setStoredData(articleId, commentsRead);
}


function observeNewComments() {
	var target = document.querySelector('#loadMoreComments');
	var observer = new MutationObserver(function(mutations) {
            start(false);
		});
	var config = { childList: true };
	observer.observe(target, config);
}

function scanComments(commentsRead) {
	
	var unreadComments = $('.comment-holder')
		.filter( function(index) {
					var commentId = $(this).attr('id').replace(/comment/, '');
					if(commentId in commentsRead.ids) {
						return false;
					} else {
						commentsRead.ids[commentId] = true;
						return true;
					}
				});
				
	unreadComments.css('background-color', '#e6f3f9');
	unreadComments.children('.comments-right')
		.children().andSelf()
		.css('background-color', '#e6f3f9');
}

function countUnread(commentsRead) {
	var nbrOfComments = parseInt($('#comments_button_on>span').text().match(/\d+/), 10);

	var unreadCount = nbrOfComments - commentsRead.commentsLastVisit;
	commentsRead.commentsLastVisit = nbrOfComments;

	if(unreadCount > 0){    
		$('#comments_button_on>span').append(' *** ' + unreadCount + ' ***');
	}
}

function getStoredData(articleId) {
	
	var commentsRead = JSON.parse( GM_getValue(articleId, '{"registeredAt": 0, "commentsLastVisit": 0, "ids": {}}') ); 

	if(!commentsRead) {
		console.log('The stored data is likely to be corrupted.');
	}
	
	return commentsRead;
}

function setStoredData(articleId, commentsRead) {
	GM_setValue(articleId, JSON.stringify(commentsRead));
}

function findArticleId() {
	var id = $('.post_content > h2 > a').attr('href').replace(/\/1\/20/, '');
	id = id.substring(id.lastIndexOf('-')+1);
	return id;
}