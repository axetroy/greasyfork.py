// ==UserScript==
// @name               KissNotify - Kissanime Release Notifier
// @namespace          https://greasyfork.org/en/users/10118-drhouse
// @version            2.1
// @description        Get a browser notification based on anime titles you pick and when the site updates the latest episodes of them.
// @run-at             document-idle
// @include            *
// @require            http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_deleteValue
// @grant              GM_registerMenuCommand
// @grant              GM_notification
// @grant              none  
// @author             drhouse
// @icon               data:image/x-icon;base64,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
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

$(document).ready(function () {

	//GM_setValue ("timeout", ''); // uncomment to disable 15 minute wait time
	var notify_length = GM_getValue("notify_length");
	var notify = GM_getValue("notify");

	function timer(){
		GM_setValue ("timeout", new Date().getTime() + 15*60*1000);
		var timeout_val = GM_getValue("timeout"); 
	}

	function ajax(){
		var kissanime_feed = 'https://www.kimonolabs.com/api/json/89hjqgim?apikey=c3ce041daa44ca55a1afad623e2b287e';

		$.ajax({
			url: kissanime_feed,
			crossDomain: true,
			dataType: 'jsonp',
			error: function(xhr, status, error) {
				console.log(error.message);
			},
			success:function (response) {
				if (notify_length > 0){
					process(response);
				}
			},
		});
	}

	function process(response){
		timer();
		console.log("self.location.href: " + top.location.href); 
		console.log("window.top.location.href: " + window.top.location.href);
		$.each(response.results.collection1, function(i, item){

			for (n=0; n < notify_length; n++){

				var retrieve = GM_getValue("notify"+n);
				var kisstitle = response.results.collection1[i * 2].property1.text;
				var notified = GM_getValue("notified");

				if (response.results.collection1[i * 2].property1.text.toString().toLowerCase().indexOf(retrieve) != -1 ){	

					if (response.results.collection1[i * 2 + 1].property1.text.indexOf('Completed') != -1){
						GM_notification(
							"Kissanime - New Episode Detected", 
							response.results.collection1[i * 2].property1.text + ' - ' +  
							response.results.collection1[i * 2 + 1].property1.text,  
							'http://blog.honeyfeed.fm/wp-content/uploads/2015/11/kissanime-300x300.png', 
							function(){window.open(response.results.collection1[i * 2].property1.href, '_blank');
									  }, 0);

						GM_registerMenuCommand(response.results.collection1[i * 2].property1.text + ' - ' +  
											   response.results.collection1[i * 2 + 1].property1.text, 
											   function(){window.open(response.results.collection1[i * 2].property1.href, '_blank');
														 });
					} else { 
						GM_notification(
							"Kissanime - New Episode Detected", 
							response.results.collection1[i * 2].property1.text + ' - ' +  
							response.results.collection1[i * 2 + 1].property1.text,  
							'http://blog.honeyfeed.fm/wp-content/uploads/2015/11/kissanime-300x300.png', 
							function(){window.open(response.results.collection1[i * 2 + 1].property1.href, '_blank');
									  }, 0);

						GM_registerMenuCommand(response.results.collection1[i * 2].property1.text + ' - ' +  
											   response.results.collection1[i * 2 + 1].property1.text, 
											   function(){window.open(response.results.collection1[i * 2 + 1].property1.href, '_blank');
														 });
					}
					GM_setValue("notified", true);
				}
			}
		});
	}

	function start(){

		GM_setValue("notified", false);

		var notify_set = [];

		if (document.location.toString().indexOf('BookmarkList') != '-1'){

			GM_registerMenuCommand("KissNotify Grab Bookmarks", function(){

				var bookmark = $('#container > div.bigBarContainer > div.barContent > div:nth-child(2) > table > tbody > tr > td:nth-child(1) > a').text();
				bookmark = bookmark.replace(/(?:\r\n|\r|\n)/g, ', ').trim();
				bookmark = bookmark.replace(/                /g,'');
				bookmark = bookmark.substring(2);

				//notify = prompt ('Enter anime titles to track (comma separated, case insensitive):', bookmark);

				GM_setValue("notify", bookmark);

				notify_set = notify.split(",");
				var notify_length = notify_set.length;
				if (!notify){
					notify_set.length = 0;
				}
				GM_setValue ("notify_length", notify_set.length);
				//console.log("length1: " + GM_getValue("notify_length"));
				var i = 0;
				for (var a in notify_set ) {
					GM_setValue ("notify"+i, notify_set[a].trim().toLowerCase());
					//console.log(GM_getValue("notify"+i));
					i++;
				}
				//location.reload();
				GM_notification("Bookmark list successfully loaded","Kissnotify Updated",  
								'http://blog.honeyfeed.fm/wp-content/uploads/2015/11/kissanime-300x300.png', 
								function(){window.open(response.results.collection1[i * 2 + 1].property1.href, '_blank');
										  }, 0);
			});
		}
		
		GM_registerMenuCommand("KissNotify", function(){

			notify = prompt ('Enter anime titles to track (comma separated, case insensitive):', notify);


			if (notify === null || notify === false) { // Canceled
				notify = GM_getValue("notify");
			}
			if (notify === "") { 
				notify = '';
			} else {
				notify = notify;
			}

			GM_setValue("notify", notify);

			notify_set = notify.split(",");
			var notify_length = notify_set.length;
			if (!notify){
				notify_set.length = 0;
			}
			GM_setValue ("notify_length", notify_set.length);
			//console.log("length1: " + GM_getValue("notify_length"));
			var i = 0;
			for (var a in notify_set ) {
				GM_setValue ("notify"+i, notify_set[a].trim().toLowerCase());
				//console.log(GM_getValue("notify"+i));
				i++;
			}
			location.reload();
		});

		notify_length = GM_getValue("notify_length");
		if (!notify){
			notify_set.length = 0;
		}
	}

	start();
	var timeout = GM_getValue("timeout");
	if (!timeout)
		timeout = new Date().getTime() - 1;
	if(new Date().getTime() > timeout)
		if (!frameElement) 
			ajax();
});