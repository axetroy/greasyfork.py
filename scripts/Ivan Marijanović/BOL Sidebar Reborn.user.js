// ==UserScript==
// @name        BOL Sidebar Reborn
// @description Sidebar prikaz "tema u kojima sudjelujem"/"tema koje pratim" a koje imaju neprocitanih poruka.
// @namespace   bol-sidebar-reborn
// @include     http://www.bug.hr/forum/*
// @version     2.0.2
// ==/UserScript==

if ( 0 === window.location.href.indexOf( 'http://www.bug.hr/forum/newpost/' ) ) {

	return;

}

!function(){"use strict";function t(t){if("string"!=typeof t&&(t=String(t)))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function e(t){return"string"!=typeof t&&(t=String(t)),t}function r(t){this.map={},t instanceof r?t.forEach(function(t,e){this.append(e,t)},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function o(t){return t.bodyUsed?Promise.reject(new TypeError("Already read")):void(t.bodyUsed=!0)}function n(t){return new Promise(function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function s(t){var e=new FileReader;return e.readAsArrayBuffer(t),n(e)}function i(t){var e=new FileReader;return e.readAsText(t),n(e)}function a(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,"string"==typeof t)this._bodyText=t;else if(p.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(p.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(t){if(!p.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t))throw new Error("unsupported BodyInit type")}else this._bodyText=""},p.blob?(this.blob=function(){var t=o(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this.blob().then(s)},this.text=function(){var t=o(this);if(t)return t;if(this._bodyBlob)return i(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)}):this.text=function(){var t=o(this);return t?t:Promise.resolve(this._bodyText)},p.formData&&(this.formData=function(){return this.text().then(f)}),this.json=function(){return this.text().then(JSON.parse)},this}function u(t){var e=t.toUpperCase();return c.indexOf(e)>-1?e:t}function h(t,e){e=e||{};var o=e.body;if(h.prototype.isPrototypeOf(t)){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new r(t.headers)),this.method=t.method,this.mode=t.mode,o||(o=t._bodyInit,t.bodyUsed=!0)}else this.url=t;if(this.credentials=e.credentials||this.credentials||"omit",(e.headers||!this.headers)&&(this.headers=new r(e.headers)),this.method=u(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(o)}function f(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var r=t.split("="),o=r.shift().replace(/\+/g," "),n=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(o),decodeURIComponent(n))}}),e}function d(t){var e=new r,o=t.getAllResponseHeaders().trim().split("\n");return o.forEach(function(t){var r=t.trim().split(":"),o=r.shift().trim(),n=r.join(":").trim();e.append(o,n)}),e}function l(t,e){e||(e={}),this._initBody(t),this.type="default",this.status=e.status,this.ok=this.status>=200&&this.status<300,this.statusText=e.statusText,this.headers=e.headers instanceof r?e.headers:new r(e.headers),this.url=e.url||""}if(!self.fetch){r.prototype.append=function(r,o){r=t(r),o=e(o);var n=this.map[r];n||(n=[],this.map[r]=n),n.push(o)},r.prototype["delete"]=function(e){delete this.map[t(e)]},r.prototype.get=function(e){var r=this.map[t(e)];return r?r[0]:null},r.prototype.getAll=function(e){return this.map[t(e)]||[]},r.prototype.has=function(e){return this.map.hasOwnProperty(t(e))},r.prototype.set=function(r,o){this.map[t(r)]=[e(o)]},r.prototype.forEach=function(t,e){Object.getOwnPropertyNames(this.map).forEach(function(r){this.map[r].forEach(function(o){t.call(e,o,r,this)},this)},this)};var p={blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in self,arrayBuffer:"ArrayBuffer"in self},c=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];h.prototype.clone=function(){return new h(this)},a.call(h.prototype),a.call(l.prototype),l.prototype.clone=function(){return new l(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new r(this.headers),url:this.url})},l.error=function(){var t=new l(null,{status:0,statusText:""});return t.type="error",t};var y=[301,302,303,307,308];l.redirect=function(t,e){if(-1===y.indexOf(e))throw new RangeError("Invalid status code");return new l(null,{status:e,headers:{location:t}})},self.Headers=r,self.Request=h,self.Response=l,self.fetch=function(t,e){return new Promise(function(r,o){function n(){return"responseURL"in i?i.responseURL:/^X-Request-URL:/m.test(i.getAllResponseHeaders())?i.getResponseHeader("X-Request-URL"):void 0}var s;s=h.prototype.isPrototypeOf(t)&&!e?t:new h(t,e);var i=new XMLHttpRequest;i.onload=function(){var t=1223===i.status?204:i.status;if(100>t||t>599)return void o(new TypeError("Network request failed"));var e={status:t,statusText:i.statusText,headers:d(i),url:n()},s="response"in i?i.response:i.responseText;r(new l(s,e))},i.onerror=function(){o(new TypeError("Network request failed"))},i.open(s.method,s.url,!0),"include"===s.credentials&&(i.withCredentials=!0),"responseType"in i&&p.blob&&(i.responseType="blob"),s.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),i.send("undefined"==typeof s._bodyInit?null:s._bodyInit)})},self.fetch.polyfill=!0}}();

+( function() {

	var isAuthenticated = !! document.getElementById( 'ctl00_ctl20_oAvatar' );

	if ( ! isAuthenticated ) {

		return;

	}

	// sets the debug flag
	var debug = false;

	// url we check for unread messages
	var urlToCheck = 'http://www.bug.hr/forum/tasks/?n=connect';

	// cache time in seconds
	var cacheTime = 15 * 1000;

	// cache key
	var cacheThreadsKey = 'bol_sidebar_reborn_unread';
	var cacheTimestampKey = 'bol_sidebar_reborn_timestamp';


	// our main object for fetching threads
	var threadsFetcher = {
		init: function() {

			// temporary storage for all unread threads
			this.tempUnreadThreads = [];

			// temporary storage for all unread threads ids (used for avoiding duplicates)
			this.tempUnreadThreadsIds = [];

			// url we will be checking
			this.urlToCheck = urlToCheck;

		},
		// starter function
		getUnreadThreads: function( cb ) {

			this.init();

			// check if we have fresh enough cache
			if ( this.isCacheFreshEnough() ) {

				debug && console.log( 'Data served from cache' );

				this.removeThreadFromCacheOnVisit();

				return cb.call( this, this.getFromCache() );;

			}

			this.fetchUnreadThreads( function() {

				debug && console.log( 'Fresh data served' );

				cb.call( this, this.tempUnreadThreads );

			});

		},
		// determines if cache is fresh enough
		isCacheFreshEnough: function() {

			var lastCached = localStorage.getItem( cacheTimestampKey );

			if ( ! lastCached ) {

				return false;

			}

			lastCached = parseInt( lastCached, 10 );

			var date = new Date();

			if ( date.getTime() > ( lastCached + cacheTime ) ) {

				return false;

			}

			// cache is fresh enough
			return true;

		},
		// gets unread threads from cache
		getFromCache: function() {

			return JSON.parse( localStorage.getItem( cacheThreadsKey ) );

		},
		// saves data to cache
		saveToCache: function( data, updateTimestamp ) {

			if ( 'undefined' === typeof updateTimestamp ) {

				updateTimestamp = true;

			}

			localStorage.setItem( cacheThreadsKey, JSON.stringify( data ) );

			if ( updateTimestamp ) {

				// we save the timestamp as well
				var date = new Date();

				localStorage.setItem( cacheTimestampKey, date.getTime() );

			}

		},
		// checks if the current url belongs to a cached thread and removes it from the cache
		removeThreadFromCacheOnVisit: function() {

			var self = this;

			var threadsCache = JSON.parse( localStorage.getItem( cacheThreadsKey ) );

			if ( ! threadsCache.length ) {

				return;

			}

			if ( 0 !== window.location.href.indexOf( 'http://www.bug.hr/forum/topic/' ) ) {

				// we are not currently browsing the forum thread
				return;

			}

			var currentThreadId = window.location.href.split( '/' ).slice( -1 )[0].split( '?' )[0].split( '.' )[0];

			if ( ! currentThreadId ) {

				return;

			}

			for ( var i = 0; i < threadsCache.length; i++ ) {


				var threadObject = threadsCache[ i ],
					threadId = threadObject.url.split( '/' ).slice( -1 )[0].split( '?' )[0].split( '.' )[0];

				if ( threadId === currentThreadId ) {

					threadsCache.splice( i, 1 );

					self.saveToCache( threadsCache, false );

					return false;

				}

			}

		},
		// fetch unread threads
		fetchUnreadThreads: function( cb ) {

			var self = this;

			fetch( this.urlToCheck, {
				method     : 'GET',
				credentials: 'include'
			})
			.then( function( response ) {

				// format response to json
				return response.json();

			})
			.then( function( jsonResponse ) {

				self.extractUnreadThreads( jsonResponse );

				self.saveToCache( self.tempUnreadThreads );

				if ( 'function' === typeof cb ) {

					cb.call( self );

				}

			});

		},
		// extract and format the unread threads from the json
		extractUnreadThreads: function( data ) {

			var self = this;

			// check if data is missing
			if ( ! data || ! data.numNewContribMessages || ! data.numNewFavMessages ) {

				return;

			}

			// check if there are no new messages
			if ( '0' === data.numNewContribMessages && '0' === data.numNewFavMessages ) {

				return;

			}

			if ( '0' !== data.numNewContribMessages ) {

				for ( var i = 0; i < data.newContribTopicListIDs.length; i++ ) {

					// check if this thread is already processed, avoid duplicating it!
					if ( -1 !== self.tempUnreadThreadsIds.indexOf( data.newContribTopicListIDs[ i ] ) ) {

						continue;

					}

					var threadObject = {
						title: data.newContribTopicList[ i ],
						url  : 'http://www.bug.hr/forum/topicunread/' + data.newContribTopicListIDs[ i ] + '.aspx'
					}

					self.tempUnreadThreads.push( threadObject );
					self.tempUnreadThreadsIds.push( data.newContribTopicListIDs[ i ] );

				}

			}

			if ( '0' !== data.numNewFavMessages ) {

				for ( var i = 0; i < data.newFavTopicListIDs.length; i++ ) {

					// check if this thread is already processed, avoid duplicating it!
					if ( -1 !== self.tempUnreadThreadsIds.indexOf( data.newFavTopicListIDs[ i ] ) ) {

						continue;

					}

					var threadObject = {
						title: data.newFavTopicList[ i ],
						url  : 'http://www.bug.hr/forum/topicunread/' + data.newFavTopicListIDs[ i ] + '.aspx'
					}

					self.tempUnreadThreads.push( threadObject );
					self.tempUnreadThreadsIds.push( data.newFavTopicListIDs[ i ] );

				}

			}

			return;

		}
	};

	var sidebarWidget = {
		init: function() {

			// insert widget into DOM
			this.insertToDOM();

			// populate initial data
			this.insertData( true );

			// bind events
			this.bindEvents();

		},
		// inserts widget structue into DOM
		insertToDOM: function() {

			var insertAfter = document.getElementsByClassName( 'loginbox' )[0],
				html = '';

			html += '<div class="listbox">';

				html += '<div class="header headerZuti"><a href="#">Nove poruke</a></div>';

				html += '<div class="content alt"><ul></ul></div>';

			html += '</div>';

			var tempDiv = document.createElement( 'div' );

			tempDiv.innerHTML = html;

			var htmlToInsert = tempDiv.firstChild;

			insertAfter.parentNode.insertBefore( htmlToInsert, insertAfter.nextSibling );

			this.dom = insertAfter.nextSibling;
			this.threadsDom = this.dom.getElementsByClassName( 'content' )[0].firstChild;

		},
		// inserts data to the table
		insertData: function( scheduleRefresh ) {


			var self = this;

			if ( 'undefined' === typeof scheduleRefresh ) {

				scheduleRefresh = false;

			}

			if ( ! this.threadsDom ) {

				return;

			}

			threadsFetcher.getUnreadThreads( function( unreadThreads ) {

				debug && console.table( unreadThreads );

				self.threadsDom.innerHTML = '';

				var toInsert = '';

				if ( unreadThreads.length ) {

					for ( var i = 0; i < unreadThreads.length; i++ ) {

						toInsert += '<li><a href="' + unreadThreads[ i ].url + '">' + unreadThreads[ i ].title + '</a></li>';

					}

				} else {

					// no unread threads, display the appropriate message
					toInsert += '<li>Nema novih poruka</li>';

				}

				self.threadsDom.innerHTML = toInsert;

				if ( scheduleRefresh ) {

					self.dataRefreshTimeout = setTimeout( self.scheduleDataRefresh.bind( self ), 2000 );

				}

			});

		},
		// schedules data refreshing
		scheduleDataRefresh: function() {

			this.dataRefreshInterval = setInterval( this.insertData.bind( this ), cacheTime + 500 );

		},
		// clears internal widget timers
		clearTimers: function() {

			clearInterval( this.dataRefreshInterval );
			clearTimeout( this.dataRefreshTimeout );

		},
		// set up the event listeners on the DOM
		bindEvents: function() {

			var self = this;

			this.dom.getElementsByClassName( 'header' )[0].firstChild.addEventListener( 'click', function( e ) {

				e.preventDefault();

				localStorage.removeItem( cacheTimestampKey );

				self.clearTimers();

				self.insertData( true );

			});

		}

	};

	sidebarWidget.init();

})();
