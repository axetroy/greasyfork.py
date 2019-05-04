// ==UserScript==
// @name         WaniKani Forums: Like counter
// @namespace    http://tampermonkey.net/
// @version      1.0.10.
// @description  Keeps track of the likes you've used and how many you have left... supposedly.
// @author       Kumirei
// @include      https://community.wanikani.com*
// @require      https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js
// @grant        none
// ==/UserScript==

(function() {
		//OPTIONS
		var showAmPmTimes = false;
		var showLikesReceivedCounter = true;

		//no touchie
		var likes, likesLeft, totalLikes, trustLevel;
		var dailyLikes, dailyAverage;
		var runOutCount;
		var likesReceived;
		var doneOnce = false;

		console.log('Like Counter: Starting');
		setTriggers(); //sets triggers for initialiseScript
		initialiseScript(); //retreives data and set up the script on the page
		$('head').append('<style id=like_counter>.wanikani-app-nav ul li {color: #545454;}'+
						 'body[theme="dark"] .wanikani-app-nav ul li {color:#999;}</style>');

		//set the triggers for when the script should fire
		function setTriggers() {
				//when loading the window
				window.addEventListener('load', initialiseScript);

				//when using back and forth buttons
				window.addEventListener('popstate', initialiseScript);

				//when navigating
				(function(history){
						var pushState = history.pushState;
						history.pushState = function(state) {
								initialiseScript();
								return pushState.apply(history, arguments);
						};
				})(window.history);
		}

		//set up the script for continued running
		function initialiseScript() {
				//fetches stored data
				fetchData();

				//do only once
				if (!doneOnce) {
						doneOnce = true;

						//add bubbles in header
						addBubbles();

						//set update interval
						setInterval(function() {updateNumbers();}, 30000); //updates numbers every 30 seconds

						//set timers for each like
						for (var i = 0; i < likes.length; i++) {setCountDown(likes[i] + 1000*60*60*24 - 1000*61);}
				}

				//set like detection
				detectLikes();

				//update things and stuff... you know
				updateNumbers();
		}

		//fetches the needed stored and external data
		function fetchData() {
				//get stored data
				likes = fetchFromLocalStorage('WKFlikeCounter', []);
				totalLikes = fetchFromLocalStorage('WKFlikeCounterTotalLikes', [0, 0]);
				trustLevel = fetchFromLocalStorage('WKFlikeCounterTrustLevel', ['none', 50*2, 0]); //assume user has max 50*2 likes as fallback
				dailyLikes = fetchFromLocalStorage('WKFlikeCounterDailyLikes', []);
				runOutCount = fetchFromLocalStorage('WKFlikeCounterRunOut', [0, 0, 0]);
				likesReceived = fetchFromLocalStorage('WKFlikeCounterLikesReceived', []);

				//calculates likes left
				likesLeft = trustLevel[1] - likes.length;

				//finds the average used likes per day
				var count = 0;
				$(dailyLikes).each(function() {count += this[1];});
				dailyAverage = Math.round(count / dailyLikes.length);

				//updates with data from the user's summary page
				fetchSummaryData();
				updateNumbers();
		}

		function fetchFromLocalStorage(key, fallback) {
				var temp = localStorage.getItem(key);
				if (temp == 'undefined' || !temp) { //if nothing stored
						temp = fallback;
						localStorage.setItem(key, JSON.stringify(temp));
				}
				else {
						temp = $.parseJSON(temp);
				}
				return temp;
		}

		//fetches total number of likes and the trust level from the user's summary page
		function fetchSummaryData() {
				if (trustLevel[0] == 'none' || totalLikes[1] + 1000*60*10 < Date.now()) { //if it has been more than ten minutes since last check
						totalLikes[1] = Date.now();
						var userName = $('#current-user a').attr('href').split('/u/')[1];
						var url = 'https://community.wanikani.com/u/'+userName+'/summary';
						var setVariables = function(data) {
								var change = data.user_summary.likes_given - totalLikes[0];
								if (totalLikes[0] == 0 || totalLikes[1] + 1000*60*60*24 < Date.now()) {//if no prior data or data is old
										totalLikes = [data.user_summary.likes_given, Date.now()];
										updateNumbers();
								}
								else {
										addLikes(change);
								}
								localStorage.setItem('WKFlikeCounterTotalLikes', JSON.stringify(totalLikes));


								//fetches the trust level
								var TL = data.badges[0].id;
								if (TL == 1) {
										trustLevel = ['basic', 50*2, Date.now()];
								}
								else if (TL == 2) {
										trustLevel = ['member', 75*2, Date.now()];
								}
								else if (TL == 3) {
										trustLevel = ['regular', 100*2, Date.now()];
								}
								else {
										trustLevel = ['some kind of god or something', 42, Date.now()];
								}
								likesLeft = trustLevel[1] - likes.length;
								localStorage.setItem('WKFlikeCounterTrustLevel', JSON.stringify(trustLevel));

								//fetches like count
								likesReceived.push([Date.now(), data.user_summary.likes_received]);
								localStorage.setItem('WKFlikeCounterLikesReceived', JSON.stringify(likesReceived));
						};
						loadAjax(url, setVariables);
				}
		}

		//loads a page in the background and calls the given function upon success
		function loadAjax(url, func) {
				$.ajax({
						url: url,
						type:'GET',
						dataType: "json",
						success: function(data) {func(data);}
				});
		}

		//adds the infobubbles to rfindley's header bar
		function addBubbles() {
				waitForKeyElements('#next_review', function() {
						var bubbleReceivedLikes = findReceivedLikes();
						var bubbleLikesLeft = likesLeft;
						if (likesLeft < 0){bubbleLikesLeft = 0;}
						var bubbleRunOut = parseRunOut();
						var nextHour = findNext(1000*60*60);
						var highlights = [true, true, true];
						if (bubbleReceivedLikes == 0) highlights[0] = false;
						if (bubbleLikesLeft == 0) highlights[1] = false;
						if (parseTime(likes[0]) == 'N/A') highlights[2] = false;
						if (showLikesReceivedCounter) {//if user wants to show this info
								$('.wanikani-app-nav ul').append('<li data-highlight="'+highlights[0]+'" title="' + bubbleReceivedLikes + ' likes received in past day\n' +
																 (likesReceived[likesReceived.length-1] || [0, 1]) [1] + ' total likes received">Likes Received' +
																 '<span id="likes_received" class="dashboard_bubble">'+bubbleReceivedLikes+'</span></li>');
						}
						$('.wanikani-app-nav ul').append('<li data-highlight="'+highlights[1]+'" title="' + dailyAverage + ' likes given per day on average &#13;' +
														 totalLikes[0] + ' total likes given&#13;&#13;' +
														 bubbleRunOut +'">Likes Left' +
														 '<span id="likes_left" class="dashboard_bubble">'+bubbleLikesLeft+'</span></li>');
						$('.wanikani-app-nav ul').append('<li data-highlight="'+highlights[2]+'" title="'+nextHour+'">Next Like' +
														 '<span id="next_like" class="dashboard_bubble">'+parseTime(likes[0])+
														 '</span></li>');

						//add class if no likes left or all likes left
						if (likesLeft == 0) {
								$('#likes_left').closest('li').attr('data-highlight', false);
								$('#likes_left').toggleClass('zero');
						}
						if (parseTime(likes[0]) == 'N/A') {
								$('#next_like').closest('li').attr('data-highlight', false);
								$('#next_like').toggleClass('zero');
						}

						//set padding on main outlet in case use already has rfindley's lesson and review count script
						$('#main-outlet').css('padding-top', '107px');
				});
		}

		//updates varaibles, info bubbles, and localstorage
		function updateNumbers() {
				//check if there are any unregistered likes used in another tab
				var storedLikes = $.parseJSON(localStorage.getItem('WKFlikeCounter'));
				for (var i = 0; i < storedLikes.length; i++) {
						if (!likes.includes(storedLikes[i])) {
								totalLikes[0] += 1;
								likes.push(storedLikes[i]);
						}
				}

				//delete old likes from list
				$(likes).each(function(){
						if (this + 1000*60*60*24 < Date.now() || isNaN(this)) {
								likes.splice(0,1);
						}
						else {return false;}
				});

				//update critical variables
				fetchSummaryData();
				likesLeft = trustLevel[1] - likes.length;
				var nextLike = parseTime(likes[0]);

				//updates the average if it's been 24 hours since last update
				if (dailyLikes.length == 0 || dailyLikes[dailyLikes.length - 1][0] + 1000*60*60*24 < Date.now()) {//if it's been more than a day
						dailyLikes.push([Date.now(), likes.length]); //add new info
						localStorage.setItem('WKFlikeCounterDailyLikes', JSON.stringify(dailyLikes));
				}

				//update max likes used
				if (likes.length > runOutCount[1]) {
						runOutCount[1] = likes.length;
				}

				//update bubbles
				if ($('#likes_left')[0] && $('#next_like')[0]) { //if they exist
						if (showLikesReceivedCounter) {
								var bubbleReceivedLikes = findReceivedLikes();
								$('#likes_received')[0].innerHTML = bubbleReceivedLikes;
								$('#likes_received').closest('li').attr('title', bubbleReceivedLikes + ' likes received in past day\n' + (likesReceived[likesReceived.length-1] || [0, 0])[1] + ' total likes received');
						}
						if (likesLeft < 0) { //fallback if you get demoted in trust level
								$('#likes_left')[0].innerHTML = 0;
						}
						else {
								$('#likes_left')[0].innerHTML = likesLeft;
						}
						$('#next_like')[0].innerHTML = nextLike;

						//change class if 0 or N/A (to match rfindley's script)
						if (likesLeft == 0) {
								if (!$('#likes_left').hasClass('zero')) {
										$('#likes_left').closest('li').attr('data-highlight', false);
										$('#likes_left').toggleClass('zero');
								}
						}
						else if ($('#likes_left').hasClass('zero')) {
								$('#likes_left').closest('li').attr('data-highlight', true);
								$('#likes_left').toggleClass('zero');
						}
						if (nextLike == 'N/A') {
								if (!$('#next_like').hasClass('zero')) {
										$('#next_like').closest('li').attr('data-highlight', false);
										$('#next_like').toggleClass('zero');
								}
						}
						else if ($('#next_like').hasClass('zero')) {
								$('#next_like').closest('li').attr('data-highlight', true);
								$('#next_like').toggleClass('zero');
						}

						//updates tooltip
						var nextHour = findNext(1000*60*60); //likes in next hour
						$('#next_like').closest('li').attr('title', nextHour);

						var bubbleRunOut = parseRunOut();
						$('#likes_left').closest('li').attr('title', dailyAverage+' likes given per day on average \n' + totalLikes[0] + ' total likes given \n\n' + bubbleRunOut);
				}

				//update storage
				localStorage.setItem('WKFlikeCounter', JSON.stringify(likes));
				localStorage.setItem('WKFlikeCounterTotalLikes', JSON.stringify(totalLikes));
				localStorage.setItem('WKFlikeCounterRunOut', JSON.stringify(runOutCount));
		}

		//makes sense of unix time
		function parseTime(time) {
				var timeLeft = time + 1000*60*60*24 - Date.now();
				if (timeLeft === undefined || isNaN(timeLeft)) {//the given timestamp doesn't make any sense
						return 'N/A';
				}
				else if (timeLeft/1000 < 60) {//only seconds left
						//return '<1m';
						if (timeLeft/1000 < 0) {//there are somehow negtive seconds left
								return '0s';
						}
						return Math.floor(timeLeft/1000) + 's';
				}
				else if (timeLeft/1000/60 < 60) {//only minutes left
						return Math.floor(timeLeft/1000/60) + 'm';
				}
				else {//hours until your next like, poor user
						return Math.floor(timeLeft/1000/60/60) + 'h';
				}
		}

		//decides what the Likes Left tooltip should say in the middle row
		function parseRunOut() {
				var bubbleRunOut;
				if (runOutCount[2] !== 0) {//if you have ran out of likes sometime
						//tells how many times you have ran out of likes
						if (runOutCount[2] == 1) {//if you hav ran out exactly one time
								bubbleRunOut = '1 time have you ran out';
						}
						else {
								bubbleRunOut = runOutCount[2] + ' times have you ran out of likes';
						}
						//tells how long it has been since you last got laid... I mean ran out of likes
						if (Math.floor((Date.now() - runOutCount[0])/1000/60/60/24) == 1) {//if you have ran out exactly one time
								bubbleRunOut += '\n1 day since you last ran out';
						}
						else {
								bubbleRunOut += '\n' + Math.floor((Date.now() - runOutCount[0])/1000/60/60/24) + ' days since you last ran out';
						}
				}
				//if you have not ran out, then display the number of likes you've most used in a day
				else {
						bubbleRunOut = runOutCount[1] + ' likes most given in a day';
				}
				return bubbleRunOut;
		}

		//finds the number of likes which will expire in the given amount of time
		function findNext(interval) {
				var date, hours, minutes;
				var AmPm = "";
				var nextInt = 0;
				for (var k = 0; k < likes.length; k++) {
						if (likes[k] + 1000*60*60*24 < Date.now() + interval) { //if like expires within 60 minutes
								nextInt++;
						}
				}
				//get time of next like
				date = new Date(likes[0]);
				hours = date.getHours();
				minutes = date.getMinutes();
				if (showAmPmTimes) {//if user wants times to be shown in the 12 hour format
						AmPm = ' AM';
						if (hours > 11) {
								AmPm = ' PM';
								if (hours != 12) {
										hours -= 12;
								}
						}
						else if (hours == 0) {
								hours += 12;
						}
				}
				if (!showAmPmTimes) {
						if (hours < 10) {
								hours = '0' + hours;
						}
				}
				if (minutes < 10) {
						minutes = '0' + minutes;
				}
				var nextLikeInfo = 'Next like at ' + hours + ':' + minutes + AmPm;
				if (nextInt == 0) {return nextLikeInfo;}
				else if (nextInt == 1) {return '1 like in next hour\n' + nextLikeInfo;}
				else {return nextInt + ' likes in next hour\n' + nextLikeInfo;}
		}

		//finds the number of likes received today
		function findReceivedLikes() {
				var min = 0;
				$(likesReceived).each(function(){
						if (this[0] + 1000*60*60*24 < Date.now()) {//if this data is old, remove it
								likesReceived.splice(0,1);
						}
						else {//if data is fresh, choose the oldest data
								min = this[1];
								return false;
						}
				});
				localStorage.setItem('WKFlikeCounterLikesReceived', JSON.stringify(likesReceived));
				if (likesReceived.length == 0) {return 0;}
				else {return likesReceived[likesReceived.length-1][1] - min;}
		}

		//adds likes to list of used likes
		addLikes = function(change) {
				if (!isNaN(change)) {//make sure change is a number
						totalLikes[0] += change;
						if (change < 0) {
								for (var i = 0; i < -change; i++) {
										likes.pop();
										localStorage.setItem('WKFlikeCounter', JSON.stringify(likes));
								}
						}
						else {
								for (var j = 0; j < change; j++) {
										if (likes.length == trustLevel[1]) {
												break;
										}
										likes.push(Date.now());
										setCountDown(Date.now() + 1000*60*60*24 - 1000*61);
								}
						}
				}

				//track the times you've run out of likes
				if (likes.length >= trustLevel[1] && runOutCount[0] + 1000*60*60*24 < Date.now()) {//if no likes left and it's been 24 hours since last time
						runOutCount[2]++; //increase number of times user has run out
						runOutCount[0] = Date.now();
				}
				updateNumbers();
		};

		//adds the event listener which detects the action of liking something
		function detectLikes() {
				waitForKeyElements('#topic-bottom', function() {
						$('.post-stream').on('click', '.toggle-like[title="like this post"]', function() {
								if (likesLeft != 0) {
										setTimeout(function(){ //if like did not go through delete the last one
												if ($('.bootbox').length) {// I do it this way so it will still update right away if it goes through
														if ($('.bootbox .modal-body')[0].innerText.includes('reached the maximum number of likes')) {
																addLikes(-1);
														}
												}
										},1000);
										addLikes(1);
								}
						});
				});
		}

		//set countdown towards time
		function setCountDown(timestamp) {
				var timeLeft = timestamp - Date.now();
				setTimeout(function() {
						var n = 0;
						//update next like relative time every second for the last minute
						var updateSeconds = setInterval(function() {
								n++;
								$('#next_like')[0].innerHTML = parseTime(likes[0]);
								if (n >= 61) {//stop updating after 61 seconds
										clearInterval(updateSeconds);
										updateNumbers();
								}}, 1000);
				}, timeLeft);
		}
})();