// ==UserScript==
// @name           Barefoot Essentials for GOG.com
// @namespace      http://userscripts.org/users/274735
// @description    Adds many enhancemnts to the GOG.com website
// @include        https://www.gog.com/*
// @exclude        https://www.gog.com/upload/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @version        2.27.1
// @grant          GM.getValue
// @grant          GM.setValue
// @grant          GM.xmlHttpRequest
// @grant          GM.deleteValue
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// ==/UserScript==

/*-- constants --*/
var branch = 'Barefoot_Monkey/GreaseMonkey'	// author/platform. If you fork this then please change this as appropriate. Please also change the @namespace to your own.
var version = '2.27.1'
var default_prev_version = '2.26'	// On first use, all versions after this will be shown in the chanelog
var last_BE_version

// Greasemonkey 4 compatibility

var storage = {
	set: (typeof GM_setValue == 'function')
	? function(key, value) {
		GM_setValue(key, value)
	} : function(key, value) {
		GM.setValue(key, value)
	},

	get: (typeof GM_getValue == 'function')
	? function(key, callback) {
		var value = GM_getValue(key)
		callback(value)
	} : function(key, callback) {
		var promise = GM.getValue(key)
		promise.then(callback)
	},

	delete: (typeof GM_deleteValue == 'function')
	? function(key, callback) {
		GM_deleteValue(key)
	} : function(key, callback) {
		GM.deleteValue(key)
	}
}
if (typeof GM_xmlhttpRequest == 'undefined') {
	window.GM_xmlhttpRequest = function(args) {
		GM.xmlHttpRequest(args)
	}
}
function inject_request(args) {
	var meta_prefix = "BFM-meta-"

	function unique_id() {
		while (true) {
			var id = "rnd-id-" + Date.now() + "-" + Math.floor(Math.random() * 10000000)
			if (document.getElementById(id) === null) return id
		}
	}
	var id = unique_id()

	var script = document.createElement('script')

	script.appendChild(document.createTextNode(
		'var request = new XMLHttpRequest();'
		+'request.open('+ JSON.stringify(args.method) +', ' + JSON.stringify(args.url) +');'
		+'request.addEventListener("load", function() {'
		+'	var meta = document.head.querySelector("meta[name=' + meta_prefix + id + ']");'
		+'	meta.setAttribute("value", JSON.stringify({status: this.status, statusText: this.statusText, responseText: this.responseText}));'
		+'});'
		+'request.addEventListener("error", function() {'
		+'	var meta = document.head.querySelector("meta[name=' + meta_prefix + id + ']");'
		+'	meta.setAttribute("value", JSON.stringify({status: this.status, statusText: this.statusText, responseText: this.responseText}));'
		+'});'
		+'request.send();'
	))

	var meta = document.createElement('meta')
	meta.setAttribute("name", meta_prefix + id)
	meta.setAttribute("value", meta_prefix + id)
	document.head.appendChild(meta)

	function gen_callback(args, script, meta) {
		return function(mutations) {
			for (var i in mutations) {
				var mutation = mutations[i]
				if (mutation.type == 'attributes' && mutation.attributeName == 'value') {
					observer.disconnect()
					document.head.removeChild(meta)
					document.body.removeChild(script)

					var value = mutation.target.getAttribute('value')
					var response = JSON.parse(value)
					if (response.status == 200) {
						if (args.onload) {
							args.onload.call(args, response)
						}
					} else if (args.onerror) {
						args.onerror.call(args, response)
					}
				}
			}
		}
	}
	
	var callback = gen_callback(args, script, meta)

	var observer = new MutationObserver(callback)
	observer.observe(meta, {attributes: true})
	
	document.body.appendChild(script)
}



var config = {
	'Changelog': [
	],
	'Navigation bar': [
		{ type: 'choice', options: ['fixed (normal)', 'absolute'], def: 'fixed (normal)', key: 'navbar-position', label: 'Navigation bar position' },
		// { type: 'range', min: 0, max: 1, step: 0.1, def: 1, key: 'navbar-opacity', label: 'Fadeout opacity' },
		{ type: 'choice', options: ['Default theme', 'Default without the stripe', 'GOG Classic 2012', 'GOG Classic 2014', "Bright black"], def: 'Bright black', key: 'navbar-theme', label: 'Navigation bar theme' },
		{ type: 'bool', def: true, key: 'nav-hide-overlay', label: 'Remove the dark menu overlay' },
		{ type: 'bool', def: false, key: 'nav-display-notifications', label: 'Display notification for forum replies and chat' },
		{ type: 'bool', def: false, key: 'nav-display-updates', label: 'Display notification new game updates' },
		{ type: 'multibool', options: { 'Facebook': true, 'Twitter': true, 'Twitch': true }, key:'navbar-community-links', label:'Community menu links'},
		{ type: 'multibool', options: { 'GOG Galaxy': true, 'GOG Downloader': true, 'GOG Connect': true }, key:'navbar-about-links', label:'About menu links'},
		{ type: 'multibool', options: { 'Alerts': false, 'Friends': false }, key:'nav-hide-icons', label:'Hide notification icons'},
		{ type: 'multibool', options: { 'Activity feed': false, 'Forum replies': false }, key:'nav-hide-notification-dot', label:'Hide notification dot for'},
		{ type: 'choice', options: ['GOG.com', 'GOG Galaxy', 'GOG Connect', 'GOG Downloader'], def: 'GOG.com', key: 'navbar-about-menu-link', label: 'Clicking on \"About\" takes you to a page about' },
		{ type: 'choice', options: ['All forums', 'General forum', 'Forum replies', 'Chat', 'Friends'], def: 'All forums', key: 'navbar-community-menu-link', label: 'Clicking on \"Community\" takes you to' },
		{ type: 'choice', options: ['Activity feed', 'Profile', 'Games library'], def: 'Activity feed', key: 'navbar-account-menu-link', label: 'Clicking on your account takes you to your' },
	],
	'Forums': [
		{ type: 'bool', def: true, key: 'forum-username-link', label: 'make usernames link to GOGWiki' },
		{ type: 'bool', def: true, key: 'forum-avatar-zoom', label: 'click on avatars to view at original size' },
		{ type: 'bool', def: true, key: 'forum-title-settings', label: 'click on own title to change forum settings' },
		{ type: 'bool', def: true, key: 'forum-move-edit-note', label: 'restyle "post edited" note on edited posts' },
		{ type: 'choice', options: ['normal', 'distinct', 'clear'], def: 'distinct', key: 'forum-quotation-style', label: 'quotation style' },
		{ type: 'bool', def: true, key: 'forum-post-preview', label: 'preview on post/reply window' },
		{ type: 'bool', def: true, key: 'forum-quick-post', label: 'enable quick post' },
		{ type: 'bool', def: true, key: 'forum-hide-spoilers', label: 'hide spoilers' },
		{ type: 'bool', def: true, key: 'forum-bold-text', label: 'enhanced bold text' },
		{ type: 'choice', options: ['leave as they are', 'group and collapse', 'group and expand', 'group below other topics', 'hide'], def: 'group below other topics', key: 'forum-group-giveaways', label: 'giveaway topics (page refresh required)' },
		{ type: 'bool', def: false, key: 'forum-show-hover-elements', label: 'Always show on-hover elements in forum posts', comment: 'Online/Offline status, PM button, and post link number' },
		// { type: 'bool', def: false, key: 'forum-collapsible-footer', label: 'Collapsible footer in forum topics' },
		// { type: 'bool', def: false, key: 'bugfix-footer-spacer', label: 'Smaller spacer before the footer', comment: 'Corrects the large space which appears above the footer in some browsers. Leave this unchecked if you do not experience this problem.' },
		{ type: 'bool', def: true, key: 'forum-remove-fragment', label: 'Remove the #fragment at the end of topic list URLs' },
		{ type: 'bool', def: true, key: 'forum-detect-necro', label: 'Detect "necroposts"', comment: 'This option scans forum topics for posts made more than 30 days after the previous post, and visibly labels them.' },
		{ type: 'bool', def: false, key: 'forum-move-online-offline-status', label: 'Move online/offline status to its original position' },
		{ type: 'choice', options: ['square', 'rounded corners', 'circle'], def: 'square', key: 'forum-avatar-style', label: 'Avatar style' },
		{ type: 'bool', def: true, key: 'forum-embed-videos', label: 'Video frames on posts with YouTube video links' },
		{ type: 'bool', def: false, key: 'forum-old-gog-avatar', label: 'Replace the official "GOG.com" user\'s avatar with old green-and-yellow GOG logo' },
	],
	'Library': [
		{ type: 'bool', def: true, key: 'library-always-show-count', label: 'Always show total games/movies in library' },
		{ type: 'bool', def: false, key: 'library-hide-galaxy-banner', label: 'Hide the GOG Galaxy banner in library' },
		{ type: 'bool', def: false, key: 'library-hide-galaxy-button', label: 'Hide the "TRY GOG GALAXY" button in library' },
	],
	'Product pages': [
		{ type: 'bool', def: true, key: 'gamecard-show-descriptions', label: 'Automatically expand game and movie descriptions' },
		{ type: 'bool', def: true, key: 'gamecard-gogwiki-link', label: 'Show GOGWiki link' },
		{ type: 'bool', def: true, key: 'gamecard-forum-link', label: 'Show forum link' },
		{ type: 'bool', def: true, key: 'gamecard-gogdb-link', label: 'Show GOG DB link' },
		{ type: 'multibool', options: {'Forum': true, 'GOG Wiki': true, 'GOG Database': true, 'PCGamingWiki': true, 'Wikipedia': true}, def: 'GOG.com', key: 'gamecard-additional-information-links', label: 'Additional information links' },
	],
	'Promotions': [
		{ type: 'bool', def: true, key: 'promo-show-discount', label: 'Display discount % on promo pages' },
		{ type: 'bool', def: false, key: 'frontpage-hide-sale-owned', label: 'Hide owned games from the mosaic that is displayed on the front page during special sales' },
	],
	'Misc': [
		{ type: 'choice', options: ['light'], def: 'light', key: 'BE-style', label: 'Barefoot Essentials style' },
		{ type: 'choice', options: ['current', 'v1', 'v2', 'v3'], def: 'v1', key: 'favicon', label: 'Favicon' },
		{ type: 'bool', def: false, key: 'catalogue-hide-owned', label: 'Hide owned games and movies in catalogue' },
		{ type: 'bool', def: true, key: 'catalogue-show-hide-owned-toggle', label: 'Add "hide owned" toggle switch to catalogues' },
		{ type: 'bool', def: true, key: 'paging-shortcut-keys', label: 'Shortcut keys Ctrl + Left/Right arrow to change page' },
		{ type: 'bool', def: false, key: 'frontpage-hide-galaxy-banner', label: 'Hide the GOG Galaxy banner on front page' },
		{ type: 'bool', def: false, key: 'frontpage-hide-email-verify', label: 'Hide "Is your email address correct?" on front page' },
		{ type: 'bool', def: true, key: 'BE-show-changelog', label: 'Show changelog after Barefoot Essentials is updated' },
		{ type: 'bool', def: true, key: 'connect-autocheck', label: 'Automatically check for GOG Connect offers' },
	],
	'Bugfixes': [
		// { type: 'bool', def: true, key: 'bugfix-activity-feed-overflow', label: "Avoid letting long activity feed text overflow." },
		{ type: 'bool', def: true, key: 'bugfix-forum-footer-columns', label: "Keep the 5 columns in the footer in a single row" },
		{ type: 'bool', def: true, key: 'bugfix-footer-position', label: "Keep the footer at the bottom of the page" },
	],
	'Share on GOGWiki': [
	]
}

var changelog = [
	{
		version: '2.27.1',
		date: '2018-07-18',
		changes: [
			"Fixed: made a quick adjustment to the \"Bugfixes-&gt;Keep the footer at the bottom of the page\" style to make it compatible with a recent change to the forum.",
			"Disabled the \"Avoid letting long activity feed text overflow.\" feature, as I believe the GOG staff have already fixed this issue some time ago."
		]
	},
	{
		version: '2.27',
		date: '2018-07-14',
		changes: [
			"New feature: you can now change the official GOG.com user's new avatar back to the old one. Disabled by default, you can enable this in the \"forum\" section of the settings. Thank you to MarkoH01 for the feature request.",
			"Improved youtube video embedding: now handles start time correctly.",
			"New presentation for additional information links on game pages.",
			"In addition to forum, GOG Wiki and GOG database links, there are now also links to PC Gaming Wiki and Wikipedia. Thank you to benpo for suggesting PC Gaming Wiki.",
		]
	},
	{
		version: '2.26',
		date: '2018-06-13',
		changes: [
			"GOG DB links on game pages. Thank you to drmike for the suggestion.",
			"Prevent dropdown menus (such the ones when viewing your library on list mode) from being hidden by the footer. Thank you to MarkoH01 for finding this and to HypersomniacLive for pointing it out to me.",
			"Fading already-owned games on front-page promotions now works in the new \"Notable\", \"Today's highlights\" and \"Recommended for you\" sections. Thank you to Vitek for the suggestion.",
			"Discount tags added by BE are now coloured according to how good the discount is. Thank you to PromZA for the suggestion. Unfortunately this does not yet apply to \"partner\" promos, as GOG adds its own discount tags to those.",
		]
	},
	{
		version: '2.25',
		date: '2018-04-24',
		changes: [
			"New feature: option to hide the little activity feed notification to the left of your avatar which tells you that there is new activity on your feed. This is disabled by default - you can enable it in the \"Navigation bar\" section of the Barefoot Essentials settings.",
			"The menu item to open the Barefoot Essentials settings has finally been removed from the account menu. It can now be found in the About menu.",
			"<small>2.25.1</small> The new feature to hide notification dots on the navigation bar has been reworked so that you can now control the visibility of the activity feed dot and the forum replies dot individually.",
			"<small>2.25.1</small> <b>New feature:</b> You can now change where the navigation bar links for About, Community and Account take you.",
			"<small>2.25.2</small> A correction was made to the implementation of the \"hide notification dots\" feature.",
			"<small>2.25.2</small> Fixed broken link when the \"Clicking on 'Community' takes you to Forum replies\" option is used. (Thanks to HypersomniacLive for pointing this out)",
			"<small>2.25.2</small> New \"Bugfix\" section for changes which simply fix apparent bugs in the site.",
			"<small>2.25.2</small> Removed \"Collapsible footer in forum posts\" and \"smaller spacer before the footer\" options as they would interfere with new bugfixes. Collapsible footers may get re-added in a compatible form.",
			"<small>2.25.2</small> New bugfix: option to keep the page footer at the bottom of the page, even if the page is smaller than the browser.",
			"<small>2.25.2</small> New bugfix: Keep the 5 columns in the footer in a single row. (In some parts of the site, the COMMUNITY column would break to a new row)",
			"<small>2.25.2</small> New bugfix: Avoid letting long activity feed text overflow. Currently this applies to the \"started a topic\" feed items."
		]
	},
	{
		version: '2.24',
		date: '2018-01-09',
		changes: [
			"Now compatible with GreaseMonkey 4 and Firefox 57",
			"Restored feature: navigation bar position absolute/fixed",
			"Dropped z-index of forum headings so that they don't appear over the menu overlay",
			"The menu no longer automatically closes when the BE settings window opens, as this was interfering subtly with the menu overlay",
			"<small>2.24.1</small> Compatibility update: custom navbar themes in the forum are working again.",
			"<small>2.24.2</small> Additional fix for 2014 navbar theme.",
			"<small>2.24.3</small> On game pages, discussion links are no longer added if those links point to the General Discussions forum.",
		]
	},
	{
		version: '2.23',
		date: '2017-08-31',
		changes: [
			"New feature: add click-to-play video frames to forum posts that contain links to YouTube videos.",
			"<small>2.23.1</small> Changed the appearance of video widget to be much smaller.",
			"<small>2.23.2</small> Hovering the mouse over a \"Click to play video\" widget will now highlight the original link to that video.",
			"<small>2.23.2</small> Video frames now have a \"close\" button.",
			"<small>2.23.3</small> Bugfix: prevent the menu overlay from sticking around after the Barefoot Essentials settings popup is opened (those who had the \"remove dark menu overlay\" option enabled were never affected by this)",
			"<small>2.23.3</small> New feature: option to hide the new alerts and friends icons on the nav bar (disabled by default)"
		]
	},
	{
		version: '2.22',
		date: '2017-05-16',
		changes: [
			"Restored forum reply notifications.",
			"<small>2.22.1</small> Raised the z-index of the footer to prevent quoted text from being rendered on top of it when \"Collapsible footer in forum topics\" is enabled.",
		]
	},
	{
		version: '2.21',
		date: '2017-05-10',
		changes: [
			"The shadows under forum avatars were replaced with a pure CSS equivalent.",
			"New feature: Forum avatar style. This gives you the option of giving forum avatars rounded corners or making them circular.",
			"Bugfix: removed extra tab character that was being added to the end of URLs in quotes when using quick reply.",
			"<small>2.21.1</small> Raised z-index on Connect alert so that it is not concealed by the new navigation bar.",
			"<small>2.21.1</small> Extended avatar styles so that they work on the small avatars in forum quotes.",
			"<small>2.21.2</small> Updated notifications in response to the website's API changing. For now forum reply notifications are gone, but chat and friend request notifications are restored.",
		]
	},
	{
		version: '2.20',
		date: '2017-05-06',
		changes: [
			"New feature: display notofication for new game updates, enabled by default.",
			"Copied the \'Barefoot Essentials\" menu item from the Account menu to the About menu. It's a more appropriate place, and it avoids making the already-long Account menu even longer. For the time being, the Account menu item will remain, but with a deprecation notice, to avoid potential confusion when it gets removed.",
			"<small>2.20.1</small> Added styling for update alerts to GOG Classic themes.",
			"<small>2.20.1</small> Made various other improvements to the GOG Classic 2012 and 2014 themes",
		]
	},
	{
		version: '2.19',
		date: '2017-04-29',
		changes: [
			"Added new navigation bar theme, \"Bright black\", which is based on the current dark design but without the stripe and replacing the logo with the original logo from 2008 to brighten things up. This is now the default theme for new users.",
			"New feature: option to remove Facebook/Twitter/Twitch links from the Community menu. By default, none of these links are removed.",
			"New feature: option to add GOG Downloader/GOG Connect links to the About menu, as well as remove the GOG Galaxy link if you wish. By default, the new links are added and none are removed.",
			"New feature: notifications for chat messages and forum replies are restored.",
		]
	},
	{
		version: '2.18',
		date: '2017-04-27',
		changes: [
			"Refactored to entirely avoid angular injection entirely, as it was causing problems on many Firefox 53 browsers",
			"New feature: themes for the navigation bar",
			"Option to remove the purple stripe has been removed, as this functionality is now handled by themes",
			"<small>2.18.1</small> Historical themes are now more accurate, thanks to archive.org. We now have <i>Second GOG design</i> and <i>Third GOG design, plus colour</i>",
			"<small>2.18.2</small> Renamed the navigation bar themes. Unfortunately, this will revert your theme selection back to the default, so you will need to select your preferred theme again.",
			"<small>2.18.2</small> Several improvements to the <i>GOG Classic 2014</i> theme.",
			"<small>2.18.2</small> Bugfix: the option to disable the dark menu overlay was not working for everyone. It should be fixed now.",
		]
	},
	{
		version: '2.17',
		date: '2017-04-26',
		changes: [
			"New feature: option to remove the purple stripe from above the navigation bar",
			"New feature: option to hide the menu overlay, so that the screen no longer goes dark when you open a menu from the navigation bar",
		]
	},
	{
		version: '2.16',
		date: '2017-04-26',
		changes: [
			"The purpose of this update is to make Barefoot Essentials compatible with GOG's new navigation system",
			"\"Essentials\" link on the account menu has been restored",
			"All options pertaining to the navigation bar have been removed, as none of them apply to the new navigation system. Features will be added later to allow you to customise the new navigation bar.",
		]
	},
	{
		version: '2.15',
		date: '2017-04-26',
		changes: [
			"Compatibility fix for Firefox 53",
			"The Connect alert can now be dismissed until new games are avaialble without having to disable the entire feature",
			"Known issue: GOG is currently changing their navigation bar as I am writing this. Compatibility with the new navigation system will be added in the next update",
		]
	},
	{
		version: '2.14',
		date: '2017-04-20',
		changes: [
			"New feature: Automatically check for GOG Connect offers",
			"Added code to quick post feature to avoid double-posting",
		]
	},
	{
		version: '2.13',
		date: '2017-02-25',
		changes: [
			"Compatibility fix for forum \"Always show hover elements\" option.",
			"Added option to move the forum online/offline status to its original position, below the user's username and title.",
			"Forum hotkeys can no longer be used while the Alt key is pressed, to avoid conflicts on German keyboards.",
		]
	},
	{
		version: '2.12',
		date: '2017-01-05',
		changes: [
			"Added \"Library\" tab in options.",
			"Added option to hide the \"TRY GOG GALAXY\" button when viewing a game in your library.",
		]
	},
	{
		version: '2.11',
		date: '2016-11-14',
		changes: [
			"Displaying this changelog after updates is now optional. To disable it, uncheck the \"Show changelog after Barefoot Essentials is updated\" option in the \"Misc\" tab of the options.",
			"Fixed a bug that was stopping the \"display discount % on promo pages\" from working in certain cases.",
		]
	},
	{
		version: '2.10',
		date: '2016-11-01',
		changes: [
			"New feature: control the visibility of the GOG Galaxy banner on the front page (from the \"Misc\" tab in the settings)",
			"<small>2.10.1</small> New feature: hide \"Is your email address correct\" notice on the front page. Thank you to HypersomniacLive for the suggestion.",
			"<small>2.10.1</small> Changed Galaxy banner control to a simple checkbox for hiding/showing",
			"<small>2.10.2</small> The Galaxy banner in the library page can now also be hidden. Thank you to Melvinica for the suggestion.",
			"<small>2.10.3</small> Updated the feature to fade out tiles for already-owned game tiles from sale mosaic, to work with the 2016 Fall sale",
			"<small>2.10.4</small>Extended the feature for hiding owned games in the sale mosaic to also hide owned games listed under \" Highlights &amp; Bundles \"",
		]
	},
	{
		version: '2.9',
		date: '2016-10-15',
		changes: [
			"Added forum \"necro\" detection option, enabled by default",
			"<small>2.9.2.1</small> Bugfixes, compatibility with older Chrome versions, some improvement to code correctness (thanks, uchristensen)",
			"<small>2.9.2.3</small> Replaced the \"necropost\" marker on posts more than 30 days newer than the previous post with a separator between the posts indicating how much time has passed. Thank you to Bookwyrm627 for the idea.",
		]
	},
	{
		version: '2.8',
		date: '2016-06-30',
		changes: [
			"Displaying forum and wiki links on product pages now works on Google Chrome",
			"Removed \"Firefox-only\" notice on the option to enable the discount on promo pages, as the Firefox dependency was actually eliminated prior to version 2.7's release",
		]
	},
	{
		version: '2.7',
		date: '2016-06-26',
		changes: [
			"New feature: option to display discount % on promo pages, enabled by default",
		]
	},
	{
		version: '2.6',
		date: '2016-06-13',
		changes: [
			"New \"Promotions\" tab on options screen, for setting features specific to promo pages and special promo displays on the front page",
			"New feature: option to fade out any owned items on the mosaic that appears on the front page during special sales, disabled by default",
			"<small>2.6.1</small> New \"Product pages\" tab on options screen, for setting features specific movie and game product pages",
			"<small>2.6.1</small> New feature: forum link on game produt pages (Firefox-only for now)",
		]
	},
	{
		version: '2.5',
		date: '2016-06-01',
		changes: [
			"Restored the ability to send library/wishlist information to gogwiki using the Chrome extension",
			"Removed \"Force HTTP\" option; it is no longer useful as GOG is now pure HTTPS"
		]
	},
	{
		version: '2.4',
		date: '2016-02-19',
		changes: [
			"New feature: option to force HTTP links in navigation bar",
			"New feature: replace ACCOUNT menu text with username",
			"Compatibility fix: now sends correct join date to GOGWiki when syncing",
			"<small>2.4.1</small> Bugfix: \"Display your username in the ACCOUNT menu\" now works in HTTPS pages",
			"<small>2.4.1</small> Bugfix: gogwiki sync no longer stops when \"Display your username in the ACCOUNT menu\" is disbled",
			"<small>2.4.2</small> Known issue: On Chrome, ACCOUNT menu changes don't always work properly on first load after installing a 2.4 version of this extension. This is a once-off problem that shouldn't affect you again, but nonetheless will be fixed in the near future.",
			"<small>2.4.2</small> Known issue: On Chrome, the feature to add a wiki link on game cards is temporarily disabled",
			"<small>2.4.2</small> Known issue: When quoting a developer's post in the forum, the special developer text colour is not shown inside the blockquote",
		]
	},
	{
		version: '2.3.7',
		date: '2016-01-21',
		changes: [
			"New implementation for nav bar notification hiding; should fix issues with incorrect totals",
			"(2.3.7) Friend request alerts on the navigation bar can now be hidden",
		]
	},
	{
		version: '2.3.6',
		date: '2015-08-01',
		changes: [
			"New feature: <b>Foelist</b>, which you can use to mark users you want to be cautious around. You'll see a mark on their usernames in the forum, and you can hover over their usernames to see a reminder of why you marked them. This mark can survive even if they change username.",
			"New feature: Automatically bury posts from users on your foelist.",
			"<small>2.3.6.1</small> bugfix to foelist not persisting across sessions or tabs.",
			"<small>2.3.6.2</small> compatilbility fix for GOGWiki sharing.",
		]
	},
	{
		version: '2.3.3',
		date: '2015-07-06',
		changes: [
			"Compatibility fix: Share on GOGWiki is back",
			"Compatibility fix: click-to-zoom on forum avatars",
			"Overall better compatibility with post-Galaxy GOG website",
			"New feature: Shortcut keys on the redeem page - when there are multiple pages of items you can now use the left/right arrow keys to change pages",
			"<small>2.3.1</small> Corrected the date in the previous changelog entry (thanks, mrkgnao)",
			"<small>2.3.1</small> Bugfix: corrected issue that may have prevented fresh installs of the script from running correctly",
			"<small>2.3.2</small> Temporarily removed the feature to add icons below the LIBRARY item of the ACCOUNT menu, as the pages linked no longer apply",
			"<small>2.3.2</small> Implemented a workaround to whatever was keeping the ESSENTIALS menu item from workin in non-legacy pages",
			"<small>2.3.3</small> fixed games being sent to gogwiki in the wrong order",
			"<small>2.3.4</small> Experimental feature: Press Ctrl+left/right arrow key to change to the next/previous page almost anywhere on the site where a next/previous page exists.",
			"<small>2.3.4</small> Feature: Option to remove the #fragment that GOG adds to the end of the URL in the forum.",
			"<small>2.3.5</small> \"Share on GOGWiki\" feature now correctly handles wishlists over 100 items long",
		]
	},
	{
		version: '2.2',
		date: '2014-11-15',
		changes: [
			"Shortcut keys in the forum restored for Chrome users",
			"Fixed: navigation bar transparency not being applied in the catalogue",
			"<small>2.2.1</small> Fixed: collapsible footer appearing too high in certain cases",
			"<small>2.2.2</small> Fixed: collapsible footer appearing too high in certain cases (Act 2)",
			"<small>2.2.2</small> Old favicons are back",
		]
	},
	{
		version: '2.1.10',
		date: '2014-11-08',
		changes: [
			"The collapsible-footer feature is back, and now affects the forum topic lists too",
			"Custom icon added for the giveaways topic group",
		]
	},
	{
		version: '2.1.9.1',
		date: '2014-11-07',
		changes: [
			"This is mainly a compatibility update so that the script copes with some recent changes to the gog.com website",
			"GOGWiki links on gamecards are restored",
			"The collapsible-footer feature is temporarily disabled",
			"Icon added to \"gifts\" button in account menu",
		]
	},
	{
		version: '2.1.9',
		date: '2014-11-04',
		changes: [
			"New feature: collapsible footer (default: off)",
			"New feature: Fix the huge space that appears before the footer in forum topics on some browsers (default: off)",
			"Fixed: \"hide owned games and movies in catalogue\" not working when filtering games by genre",
			"Fixed: \"Click here to sync with GOGWiki again\" not working reliably",
			"Account menu now get a \"gifts\" button alongside the \"shelf\" and \"list\" buttons. The blank icon is temporary - I'll add an icon later.",
		]
	},
	{
		version: '2.1.8',
		date: '2014-10-04',
		changes: [
			"New feature: toggle visibility of owned games/movies directly from the catalogue",
			"Restored feature: Hide specific navigation bar notifications (new/updated games, forum replies, new private messages)",
		]
	},
	{
		version: '2.1.7',
		date: '2014-09-26',
		changes: [
			"New feature: option to hide owned games and movies from the catalogue",
			"New feature: option to always show Online/Offline status, PM button, and post link number in forum topics",
		]
	},
	{
		version: '2.1.6',
		date: '2014-09-25',
		changes: [
			"Improved styling for absolute navigation bar position",
			"Fixed old-school navigation bar style when logged out"
		]
	},
	{
		version: '2.1.5',
		date: '2014-09-20',
		changes: [
			"New feature: Navigation bar position, which allows you to pin the navigation bar to the top of the page",
			"Compatiblity with Violent Monkey and Tampermonkey restored",
		]
	},
	{
		version: '2.1.4',
		date: '2014-09-17',
		changes: [
			"Fixed incorrect URLs on account menu shelf/list icons",
			"Restored feature: always show total games/movies in library",
		]
	},
	{
		version: '2.1.3',
		date: '2014-09-17',
		changes: [
			"Quotes are properly styled inside post previews",
			"Post previews no longer obstruct the button to attach images to posts",
		]
	},
	{
		version: '2.1.2',
		date: '2014-09-17',
		changes: [
			"Fixed: forum enhancements not being applied when the URL points to any specific post",
			"Fixed: account menu library icons not appearing in HTTPS pages",
			"\"Automatically expand descriptions\" feature now applies to both movie and game cards",
		]
	},
	{
		version: '2.1.1',
		date: '2014-09-17',
		changes: [
			'Fixed: In the settings, checkboxes initially set to default instead of actual setting',
			'Feature restored: extra-bold bold text in forums',
			'Feature restored: quick reply',
			'Feature restored: spoilers',
			'New option for green account notifications in the navigation bar',
			'Position of the "Essentials" account menu item can now be either "top" or "bottom"',
			'Fixed: duplicating the summary paragraph when expanding gamecard descriptions',
		]
	},
	{
		version: '2.1',
		date: '2014-09-16',
		changes: [
			'Compatible with 2014 GOG website redesign.',
			'COLOUR',
			'Complete rewrite of the Barefoot Essentials UI. I think it looks better than before, but there will be additional themes for this too.',
			'*All* features are now optional, and can be toggled without requiring a page refresh.',
			'The navigation bar links "GAMES" and "MOVIES" can be hidden if you so desire.',
			'The old favicon is back!',
			'Alternate navigation bar styles.',
			'Direct links to your shelf and game list in the account menu are now presented as compact icons.',
			'Descriptions on gamecards can be automatically expanded.',
			'The feature to suppress notification for new/updated games, forum replies or messages is temporarily removed. I\'ll re-add this when I can.',
			'The feature to force your library to display your game count even when there are no games new/updates is also temporarily removed',
		]
	},
	{
		version: '2.0',
		date: '2014-05-11',
		changes: [
			'New feature: Discrete "Post edited" notes in forum (enabled by default).',
			'Keyboard shortcuts are now displayed next to the quick post area.',
			'The configuration now uses HTML 5 input boxes. What this means is that mouse-users can edit numbers without needing to reach for their keyboards.',
			'Fixed minor css issue from previous version, which had been causing the Edit / Add new post page to be slightly larger than the window displaying it.'
		]
	},
	{
		version: '1.11',
		date: '2014-03-27',
		changes: [
			'In Reply/New Post/New Topic popup windows, the preview area now occupies all available space instead of having a fixed height.'
		]
	},
	{
		version: '1.10',
		date: '2013-12-11',
		changes: [
			"New feature: Ability to group together giveaway threads on forums.",
			"<small>1.10.1</small> The experimental \"Always display shelf/list game count \" feature should now be working correctly. This option requires browser features added in Firefox 14, Chrome 26 and Opera 15, and will have no effect on browsers older than that.",
			"<small>1.10.2</small> Fixed: game count on shelf was incorrectly rounding up to the nearest 5 when \"Always display shelf/list game count \" is enabled.",
			"<small>1.10.3</small> Syncing to GOGWiki now takes into account the sort-order selection in your wishlist",
			"<small>1.10.4</small> In the forums you can now click on your forum title to go to your settings page.",
			"<small>1.10.5</small> Fixed issue with some users not being able to sync since GOGWiki's PHP update.",
			"<small>1.10.6</small> Added option to share your birthday on GOGWiki. If you have this option enabled when syncing then you will be listed on the wiki's new Special:Birthdays page when it is your birthday.",
			'<small>1.10.6</small> "Always display shelf/list game count" is no longer marked as experimental.'
		]
	},
	{
		version: '1.9',
		date: '2013-10-27',
		changes: [
			"Options added to ignore game updates, private messages and/or forum replies.",
			"(All that this does is prevent the \"ignored\" updates from counting toward the number in the alert displayed next to \"My Account\" on the top bar. You will still be able to see the updates in the dropdown menu.)",
			"<small>1.9.1</small> Wiki links in game cards now correctly handle titles containing \"en\" dashes",
			"<small>1.9.2</small> Fixed: bug causing wishlists sent to gogwiki to be limited to 50 items",
			"<small>1.9.3</small> Fixed: notifications not being correctly hidden on pages with delayed top navigation bar",
			"<small>1.9.4</small> New feature: On the game list and shelf pages, always display the counter indicating the total games and the number of games new/updated. This feature is off by default and marked as experimental for now because I haven't yet had an opportunity to test when there are updates."
		]
	},
	{
		version: '1.8',
		date: '2013-10-08',
		changes: [
			"Click on an avatar in the forum to view it full-size",
			"3 forum quote styles are available to choose between",
			"Blank lines in and around spoilers are now trimmed",
			"Deeply-nested spoilers now have significantly less padding",
			"<small>1.8.1</small> Cursors to indicate that avatars are clickable",
			'<small>1.8.1</small> "Full-size" avatars now have a limit of 420 pixels in height, and their z-index is raised so that they don\'t go underneath the bottom bookend thingy on the forum',
			"<small>1.8.1</small> Now clicking on an avatar will also shrink any currently-enlarged avatars back to normal size",
		]
	},
	{
		version: '1.7',
		date: '2013-07-21',
		changes: [
			"Spoilers! Hotkey Ctrl+L",
			"Fixed: promo link on gamecards used to be unclickable during promotions.",
			"<small>1.7.1</small> Fixed: wishlist images on the wiki.",
			"<small>1.7.1</small> Fixed: wiki links appear on game pages again.",
			"<small>1.7.1</small> Thanks to adambiser for the patch to handle the recent changes to gog.com",
		]
	},
	{
		version: '1.6',
		date: '2013-05-23',
		changes: [
			"Restyle of forum quotes is now optional.",
			"Fixed: wrong preview text colour in new/edit post window when using light forum style."
		]
	},
	{
		version: '1.5',
		date: '2013-05-10',
		changes: [
			"Shortcut keys from quick posts are now also supported in regular post/edit windows",
			"Quick-posting a reply to another post now properly causes a forum reply notification. Due to technical limitations, only the first quote in a quick post generates a notification.",
			"Submit quick post button is now disabled during post, and has a new \"disabled\" style.",
			"Varius CSS changes. Some fixes to changes in light theme, quoted text in dark theme is now closer to its regular colour, and the preview in post/reply window has been reorganised.",
		]
	},
	{
		version: '1.4',
		date: '2013-04-07',
		changes: [
			"This changelog now automatically appears once after each update so that you know when new features are available. Don't worry - I'll add an option to disable this in a future version in case you'd rather not have it keep appearing.",
			'Quick reply added.',
			"New shortcut: ctrl+space to jump to quick post.",
			"New shortcuts: ctrl+I, ctrl+B, ctrl+U and ctrl+Y in quick post to add [i], [b], [u] and [url] tags. (Y is for hYperlink - all the more obvious letters conflicted with some-or-other browser hotkey.)",
			"New shortcut: ctrl+enter in quick post to submit your post.",
			'Style change to quotes and bold text in forum posts. This change will become optional once in the next version.',
			'New, improved parser for generating better previews. Now handles quotes and nested tags, and points out missing/incorrect closing tags.',
			"Improvements to changelog.",
		]
	},
	{
		version: '1.3',
		date: '2013-02-27',
		changes: [
			'Brand new UI system added, along with this changelog. This looks better, and also allow some functions to be moved out of the over-long "My Account" menu.',
			'Username links are now coloured appropriately when using the light colour scheme',
			'Wishlist is now sent to GOGWiki in alphabetical order',
			'Default settings for hiding the navigation bar have been changed (I found that the sliding effect gets old)',
			'Navigation bar no longer hides when you move the mouse away while typing in the search box',
			'Wiki links no longer disappear, due to better handling of elements that appear only after pageload (thanks, adambiser)',
			'<small>1.3.2</small> Live preview when writing a forum post.',
			'<small>1.3.3</small> Fixed wiki link on KKnD2 gamecard.',
			'<small>1.3.5</small> Inline "Quick Post" feature added.',
			'<small>1.3.5.2</small> Changed textbox shrinking behaviour on "Quick Post" to avoid the post button having to be clicked twice.',
			'<small>1.3.5.3</small> Fixed ajax regression in wiki sync.'
		]
	}
]


/*-- global variables - don't judge me --*/
var forum_skin = null
var gog_sync_element = null
var sync_status_account = null
var sync_status_movies = null
var sync_status_games = null
var sync_status_wishlist = null
var sync_status_progress = null
var sync_status_start = null
var sync_status_restart = null
var sync_status_send = null
var sync_status_output = null

var global_user_info

var sessionStorage_forum_check_key = "BE forum check user:"
var sessionStorage_forum_check_timeout = 1000*60*2

var style_discount_colour_huge = '#4a2cc3'
var style_discount_colour_large = '#2ca3c3'
var style_discount_colour_medium = '#58b600'
var style_discount_colour_small = '#9b8e02'


/*-- utility functions --*/
function cmpVersion(a, b) {
	var i, cmp, len, re = /(\.0)+[^\.]*$/;
	a = (a + '').replace(re, '').split('.');
	b = (b + '').replace(re, '').split('.');
	len = Math.min(a.length, b.length);
	for( i = 0; i < len; i++ ) {
		cmp = parseInt(a[i], 10) - parseInt(b[i], 10);
		if( cmp !== 0 ) {
			return cmp;
		}
	}
	return a.length - b.length;
}
function inject_script(source) {
	var script_text = source
 	var script = unsafeWindow.document.createElement('script')
	script.appendChild(unsafeWindow.document.createTextNode(script_text))
	unsafeWindow.document.body.appendChild(script)
	function remove_element() {
		this.parentElement.removeChild(this)
	}
	setTimeout(remove_element.bind(script), 1)
}


var popup = {
	show: function(section) {
		// $('.is-expanded.animation-mode--long').removeClass('is-expanded animation-mode--long')
		// $('.menu-overlay').removeClass('is-visible')

		var popup = $('aside.BE-popup')
		if (popup.length == 0) {
			popup = $('<aside class="BE-popup"><div>')

			var nav = $('<nav>').appendTo(popup)
			var navlist = $('<ul>').appendTo(nav)

			// close button
			$('<li>')
			.text('Close')
			.click(function() { $('.BE-popup').remove() } )
			.prependTo(navlist)

			// dynamic sections
			for (var section_name in config) {
				$('<li>').appendTo(navlist).text(section_name).click(this.show_section.bind(this, section_name))
			}

			popup.appendTo(document.body)
		}

		this.show_section(section)
	},
	checkbox_change_event: function(key, subkey, e) {
		var setting = settings.get(key)
		setting[subkey] = e.target.checked
		settings.onchange(key)
	},
	change_event: function(key, e) {
		if (e.target.type == 'checkbox') settings.set(key, e.target.checked)
		else settings.set(key, e.target.value)
	},
	show_section: function(section) {
		var popup = $('aside.BE-popup')
		var root = popup.find('>div')
		root.empty()

		popup.find('>nav>ul>li').removeClass('active').each(function() {
			if (this.textContent == section) $(this).addClass('active')
		})

		$('<h1>').text('Barefoot Essentials - '+section).appendTo(root)

		switch (section) {
			case 'Share on GOGWiki':
				root.append(gog_sync_element)
				break
			case 'Changelog': {
				var old_versions = $('<div class="BE-older-changes">').hide()

				changelog.forEach(function(entry) {
					var p = $('<h2>')
					.text("Version " + entry.version)
					.append($('<small>').text(" - released on " + entry.date))
					
					var list = $('<ul>').addClass('BE-changelog')
					
					entry.changes.forEach(function(change) {
						$('<li>').html(change).appendTo(list)
					})
					
					if (entry.version == version || cmpVersion(last_BE_version, entry.version) < 0) {
						root.append(p, list)
					} else {
						old_versions.append(p, list)
					}
				})
				if (old_versions.children().length > 0) {
					var older = $('<p>').append($('<a>').html('older changes&hellip;').click(function() { old_versions.toggle() }))
					root.append(older, old_versions)
				}
				break;
			}
			default:
				var fields = config[section]
				var value, i
				for (i in fields) {
					var field = fields[i]
					var p = $('<p>')
					$('<label>').text(field.label).appendTo(p)

					switch (field.type) {
						case 'range': {

							var e = $('<input type="range">')
							.attr('min', field.min)
							.attr('max', field.max)
							.attr('step', field.step)
							.val(settings.get(field.key))
							.appendTo(p)

							e.on('input', this.change_event.bind(this, field.key))

							break
						}
						case 'multibool': {
							var group = $('<div class="BE-multibool">')

							value = settings.get(field.key)
							for (var option in field.options) {
								$('<label>')
								.text(option)
								.prepend(
									$('<input type="checkbox">')
									.prop('checked', value[option])
									.on('change', this.checkbox_change_event.bind(this, field.key, option))
								)
								.appendTo(group)
							}
							group.appendTo(p)
							break
						}
						case 'bool': {
							$('<input type="checkbox">')
							.prop('checked', settings.get(field.key))
							.on('change', this.change_event.bind(this, field.key))
							.appendTo(p)
							break
						}
						case 'choice': {

							var select = $('<select>')
							value = settings.get(field.key)

							for (i in field.options) {
								$('<option>')
								.text(field.options[i])
								.appendTo(select)
							}

							select.val(value)
							select.appendTo(p)

							select.on('change', this.change_event.bind(this, field.key))

							break
						}
					}

					if (field.comment !== undefined) {
						$('<small>').text(field.comment).appendTo(p)
					}

					p.appendTo(root)
				}
		}

		root.focus()
	}
}



var settings = {
	get: function(key) {
		var setting = this.settings[key]
		if (setting) return setting.value
		else return undefined
	},
	set: function(key, value) {
		var setting = this.settings[key]

		if (setting) {
			if (setting.value != value) {
				setting.value = value
				this.save()

				for (var i in setting.onchange) {
					setting.onchange[i](value)
				}
			}
		}
	},
	save: function() {
		var saved_settings = {}
		for (var key in this.settings) {
			saved_settings[key] = this.settings[key].value
		}
		storage.set('settings', JSON.stringify(saved_settings))
	},
	onchange: function(key, callback) {
		var setting = this.settings[key]
		if (setting) {
			if (callback) {
				setting.onchange.push(callback)
				callback(setting.value)
			} else {
				this.save()

				for (var i in setting.onchange) {
					var setting_callback = setting.onchange[i]
					setting_callback(setting.value)
				}
			}
		}
	},

	initialise: function(initial_values, done) {

		storage.get('settings', (function(s) {
			var saved_settings = null

			try {
				if (s !== undefined) saved_settings = JSON.parse(s)
			} catch (exception) {
				console.log(exception)
				storage.delete('settings')
			}

			if (!saved_settings) saved_settings = {}

			for (var section_name in initial_values) {
				for (var i in initial_values[section_name]) {
					var item = initial_values[section_name][i]

					if (item.type == 'multibool') {
						item.def = item.options
					}

					var setting = {
						onchange: [],
						value: (saved_settings[item.key] !== undefined) ? saved_settings[item.key] : item.def
					}

					// for "choice" items, verify that the selected value is a valid option
					if (item.type == 'choice') {
						var valid = false
						for (var j in item.options) {
							var option = item.options[j]
							if (option == setting.value) valid = true
						}
						if (!valid) setting.value = item.def
					}
					
					if (item.type == 'multibool') {
						if (setting.value === undefined) {
							setting.value = item.options
						} else {
							// give default to any undefined options
							var keys = Object.keys(item.options)
							for (j = 0; j < keys.length; j += 1) {
								var key = keys[j]
									if (setting.value[key] === undefined) {
									setting.value[key] = item.options[key]
								}
							}
						}
					}

					this.settings[item.key] = setting
				}
			}

			if (done) done()
		}).bind(this))
	},

	settings: {}
}



function detect_forum_skin() {
	if (document.head.querySelector('link[href*="forum_carbon"]')) forum_skin = 0
	else forum_skin = 1
}


/*-- Quick post/post preview --*/
function submit_quick_post() {
	if (submit_quick_post.submitted) return
	if (location.pathname == "/forum/ajax/popUp") {
		$('.kontent>.submit>div.gog_btn:first-child').click()
	} else {
		var post_text_e = $('.quick_post textarea')
	
		if (post_text_e.length < 1 || post_text_e.val() == '') return
	
		var post_text = post_text_e.val()
		var reply_to = post_text.match(/\[quote_([0-9]+)\]/)
		var reply_to_pid = (reply_to === null) ? undefined : reply_to[1]
					
		$('.submit-quick-post')[0].disabled = true
					
		// submit the post
		submit_quick_post.submitted = true
		$.ajax({
			type:"POST",
			url:"/forum/ajax",
			timeout:15000,
			data:{
				a:"addPost",
				f:$("#f").val(),
				f_arr:$("#f_arr").val(),
				w:$("#w").val(),
				pid:reply_to_pid,
				text:post_text,
				added_images_ids:"",
				added_images_names:"",
				kap:undefined,
				guest_name:undefined,
				btn:"0"
			}
		})
		.done(function(data, textStatus, jqXHR){
			submit_quick_post.submitted = false
			var response = JSON.parse(data)
			if (response.error) {
				alert("A problem occurred while submitting this Quick Post. Try again using a regular post.")
				$('.submit-quick-post')[0].disabled = false
			} else {
				window.location = response.result
			}
		})
		.fail(function(data, textStatus, jqXHR){
			submit_quick_post.submitted = false
			$('.submit-quick-post')[0].disabled = false
			alert("A problem occurred while submitting this Quick Post. Try again using a regular post.")
		})
	}
}
function tag_input_text(input, begin_tag, end_tag) {
	var start = input.selectionStart, end = input.selectionEnd
	input.value = (
		input.value.substring(0, start) 
		+ begin_tag
		+ input.value.substring(start, end)
		+ end_tag
		+ input.value.substring(end)
	)
						
	input.selectionStart = start + begin_tag.length
	input.selectionEnd = end + begin_tag.length
}

function parse_node(node) {
	switch (node.nodeType) {
		case 3: { // text node
			return node.nodeValue
		}
		case 1: { // element
			
			var result = ""
			var after = ""
			
			if (node.tagName == 'BR') return "\n"
			else if (node.tagName == 'DIV') {
				if (node.classList.contains('post_text_c')) {
				} else return ""
			} else if (node.tagName == 'A') {
				result = "[url="+encodeURI(node.getAttribute('href'))+"]"
				after = "[/url]"
			} else if (node.tagName == 'I') {
				result = "[i]"
				after = "[/i]"
			} else if (node.tagName == 'SPAN') {
				if (node.classList.contains('podkreslenie')) {
					result = "[u]"
					after = "[/u]"
				} else if (node.classList.contains('bold')) {
					result = "[b]"
					after = "[/b]"
				} else return ""
			} else return ""
			
			
			var child = node.firstChild
			while (!!child) {
				result += parse_node(child)
				child = child.nextSibling
			}
			
			return result + after
		}
	}
	return ""
}

function parse_post(post) {
	return parse_node(post.find('.post_text_c')[0])
}
function post_keydown_handler(event) {
	if (event.ctrlKey && !event.altKey) {
		switch (event.which) {
			case 66:
			case 98: if (!event.repeat) tag_input_text(this, '[b]', '[/b]'); event.preventDefault(); break
					
			case 85:
			case 117: if (!event.repeat) tag_input_text(this, '[u]', '[/u]'); event.preventDefault(); break
					
			case 73:
			case 105: if (!event.repeat) tag_input_text(this, '[i]', '[/i]'); event.preventDefault(); break
					
			case 76:
			case 108: if (!event.repeat) tag_input_text(this, '\n\n[spoiler]\n\n\n\n', '\n\n\n\n[/spoiler]\n\n'); event.preventDefault(); break
					
			case 81:
			case 113: if (!event.repeat) tag_input_text(this, '[quote]', '[/quote]'); event.preventDefault(); break
					
			case 89:
			case 121: {
				if (!event.repeat) {
					var selected_text = this.value.substring(this.selectionStart, this.selectionEnd)
							
					var url = prompt("Enter the URL for the link", selected_text)
					if (!!url) {
						tag_input_text(this, '[url='+encodeURI(url)+']', '[/url]')
					}
				}
				event.preventDefault()
				break
			}
					
			case 13: {
				if (!event.repeat) submit_quick_post();
				event.preventDefault()
				break
			}
					
			default: return true
		}
		
		event.stopPropagation();
		show_preview()
				
		return false
	}
}
function post_preview_html(source) {
	var tokenexp = /\[\/?(?:[ibu]|(?:url(?:=[^\n\]]*)?|quote(?:_[0-9]*)?))\]/g
	
	var text_tokens = source.split(tokenexp)
	if (!text_tokens) text_tokens = []
	var tag_tokens = source.match(tokenexp)
	if (!tag_tokens) tag_tokens = []
	
	var text_i = 0, tag_i = 0
	var tag_stack = []
	var preview = ""
	var top_tag = null
	var ignore_first_linebreak = false;
	
	while (true) {
		if (text_i < text_tokens.length) {
		
			var text_token = text_tokens[text_i++]
			.replace(/&/g, '&amp;')
			.replace(/\>/g, '&gt;')
			.replace(/\</g, '&lt;')
			.replace(/\n/g, '<br/>')
			
			preview += ignore_first_linebreak ? text_token.replace(/^<br\/>/, '') : text_token
			
		} else break;
		
		if (tag_i < tag_tokens.length) {
		
			var tag = tag_tokens[tag_i++].match(/^\[(\/?)([^=_\]]*)(?:[=_](.*))?\]/)			
			if (tag[2] === undefined) continue
			
			ignore_first_linebreak = false
			
			if (tag[1] == '/') {
			
				if (!!top_tag) {
					preview += top_tag.closing
					
					if (top_tag.tag == 'quote') ignore_first_linebreak = true
					
					if (tag[2] != top_tag.tag)
					preview += '<span class="syntax-warning">[/'+top_tag.tag+']</span>';
					
					top_tag = tag_stack.pop()
				}
				
			} else {
				tag_stack.push(top_tag)
				switch (tag[2]) {
					case 'i': {
						preview += '<i>'
						top_tag = {
							tag: tag[2],
							closing: '</i>'
						}
					} break;
					case 'b': {
						preview += '<b>'
						top_tag = {
							tag: tag[2],
							closing: '</b>'
						}
					} break;
					case 'u': {
						preview += '<u>'
						top_tag = {
							tag: tag[2],
							closing: '</u>'
						}
					} break;
					case 'quote': {
						preview += '<blockquote>';
						ignore_first_linebreak = true
						top_tag = {
							tag: tag[2],
							closing: '</blockquote>'
						}
					} break;
					case 'url': {
						preview +=	(tag[3] === undefined)? '<a href="">' : ('<a href="'+encodeURI(tag[3])+'">');
						top_tag = {
							tag: tag[2],
							closing: '</a>'
						}
					} break;
					default: top_tag = tag_stack.pop();
				}
			}
		}
	}

	while (!!top_tag) {
		preview += top_tag.closing
		preview += '<span class="syntax-warning">[/'+top_tag.tag+']</span>';
		top_tag = tag_stack.pop()
	}

	return preview
}
function show_preview() {
	$('.BE-preview').html(post_preview_html($('.quick_post textarea, form#f_text>textarea#text').val()))
}

/*-- Feature functions --*/

function feature_navbar_theme() {
	function on_update(value) {
		switch (value) {
			case 'Default without the stripe':
				style.text(
					"body .menu {"
					+"	top: -4px;"
					+"}"
				)
				break
			case 'Bright black':
				style.text(
					"body .menu {"
					+"	top: -4px;"
					+"}"
					+"body .menu__logo:hover {"
					+"	transform: scale(1.075, 1);"
					+"}"
					+"body .menu__logo {"
					+"	transition: transform 0.5s, left 0.6s ease, top 0.5s ease;"
					+"	background: url(https://static.gog.com/www/default/-img/_nav.3d8b0378.png);"
					+"	background-position: 0 -54px;"
					+"	top: 0;"
					+"	left: 0;"
					+"	height: 0;"
					+"	width: 98px;"
					+"	overflow: hidden;"
					+"	content: '';"
					+"	display: block;"
					+"	position: relative;"
					+"	padding-top: 23px;"
					+"	margin-top: 17px;"
					+"}"
				)
				break
			case 'GOG Classic 2012':
				style.text(
					"body .menu {"
					+"	top: -4px;"
					+"}"
					+"body .menu::before {"
					+"	background: linear-gradient(to bottom, #c4c4c4, #c4c4c4 4px, #9b9b9b);"
					+"}"
					+"body .menu__logo {"
					+"	background: url(https://static.gog.com/www/default/-img/_nav.3d8b0378.png);"
					+"	background-position: 0 -54px;"
					+"	height: 0;"
					+"	width: 98px;"
					+"	overflow: hidden;"
					+"	content: '';"
					+"	display: block;"
					+"	position: static;"
					+"	padding-top: 23px;"
					+"	margin-top: 17px;"
					+"}"
					+"body .menu-link {"
					+"	color: #222;"
					+"}"
					+"body .menu-search-input__clear {"
					+"	color: #fff;"
					+"}"
					+"body .menu-search-input__field {"
					+"	color: #222;"
					+"}"
					+"body .menu-item:hover .menu-search-toolbar__close:hover .menu-icon-svg {"
					+"	fill: #fff;"
					+"}"
					+"body .menu-item:hover .menu-search-toolbar__close .menu-icon-svg,"
					+"body .menu-search-icon {"
					+"	fill: #222;"
					+"}"
					+"body .menu-link__dropdown-icon,"
					+"body .menu-icon-svg {"
					+"	fill: #222;"
					+"}"
					+"body .is-expanded .menu-icon-svg, body .menu-icon-svg {"
					+"	fill: #222;"
					+"}"
					+"body .menu-item__count {"
					+"	opacity: 1;"
					+"}"
					+"body #menuUsername[data-BE-updates]:before {"
					+"	color: #0825ff;"
					+"}"
				)
				break
			case 'GOG Classic 2014':
				style.text(
					"body .menu {"
					+"	top: -4px;"
					+"}"
					+"body .menu::before {"
					+"	background: #E1E1E1;"
					+"}"
					+"body .menu-link__dropdown-icon {"
					+"	display: none;"
					+"}"
					+"body .menu-main .menu-link {"
					+"	border-left: #CECECE 1px solid;"
					+"	padding: 0 35px;"
					+"	font-size: 12px;"
					+"}"
					+"body .menu__logo {"
					+"	padding-top: 3px;"
					+"	height: 42px;"
					+"	width: 42px;"
					+"}"
					+"body .menu__logo::before {"
					+"	display: block;"
					+"	content: '';"
					+"	background: linear-gradient(to bottom, #87c101, #c4da13 14px, #f5d815 18px, #eea803 27px);"
					+"	position: absolute;"
					+"	height: 30px;"
					+"	bottom: 4px;"
					+"	left: 3px;"
					+"	right: 3px;"
					+"	z-index: -1;"
					+"}"
					+"body .menu-search-input__clear {"
					+"	color: #fff;"
					+"}"
					+"body .menu-search-input__field {"
					+"	color: #222;"
					+"}"
					+"body .menu-item:hover .menu-search-toolbar__close:hover .menu-icon-svg {"
					+"	fill: #fff;"
					+"}"
					+"body .menu-item:hover .menu-search-toolbar__close .menu-icon-svg,"
					+"body .menu-search-icon {"
					+"	fill: #222;"
					+"}"
					+"body .menu__logo-icon {"
					+"	fill: #000;"
					+"	height: 42px;"
					+"	width: 42px;"
					+"}"
					+"body .menu-item {"
					+"	line-height: 52px;"
					+"}"
					+"body .menu-link, body .is-expanded .menu-link {"
					+"	color: #222;"
					+"}"
					+"body .menu-main .menu-link:hover {"
					+"	color: #222;"
					+"	background: #EBEBEB;"
					+"}"
					+"body .is-expanded .menu-icon-svg, body .menu-icon-svg {"
					+"	fill: #222;"
					+"}"
					+"body .menu-item__count {"
					+"	opacity: 1;"
					+"}"
					+"body #menuUsername[data-BE-updates]:before {"
					+"	color: #1e9fd2;"
					+"	font-size: 12px;"
					+"	float: right;"
					+"	margin-left: 0.5em;"
					+"	position: static;"
					+"}"
				)
				break
			default:
				style.text('')
		}
	}

	var style = $('<style>').appendTo(document.head)

	settings.onchange('navbar-theme', on_update)
}

function feature_navbar_opacity() {
	function on_update(value) {
		style.text(
			'body nav.top-nav {'
			+	'opacity: '+value+';'
			+	'transition: opacity 0.5s linear;'
			+'}'
			+'body nav.top-nav:hover {'
			+	'opacity: 1;'
			+'}'
		)
	}

	var style = $('<style>').appendTo(document.head)

	settings.onchange('navbar-opacity', on_update)
}

function feature_notification_style() {
	function on_update(value) {
		switch (value) {
			case 'red':
				style.text(
					'.top-nav__item-count {'
					+	'background: #BF0B0B;'
					+	'padding-bottom: 1px;'
					+'}'
				)
				break;
			case 'green':
				style.text(
					'.top-nav__item-count {'
					+	'background: #008500;'
					+	'padding-bottom: 1px;'
					+'}'
				)
				break;
			default:
				style.text('')
		}
	}

	var style = $('<style>').appendTo(document.head)

	settings.onchange('navbar-notification-style', on_update)
}

function feature_BE_style() {
	function on_update(value) {
		switch (value) {
			default:
				style.text(
					'.BE-error {'
					+	'color: #B80000;'
					+	'font-weight: bold;'
					+'}'
					+'.BE-in-progress {'
					+	'color: #808000;'
					+	'font-weight: bold;'
					+'}'
					+'.BE-success {'
					+	'color: #006000;'
					+	'font-weight: bold;'
					+'}'
					+'.BE-sync-progress>p {'
					+	'margin: 1em 0;'
					+'}'
					+'.BE-sync-progress p>span:nth-child(1) {'
					+	'display: inline-block;'
					+	'text-align: right;'
					+	'margin-right: 0.5em;'
					+	'min-width: 25%;'
					+'}'
					+'.BE-popup h2 {'
					+	'font-size: 14px;'
					+	'font-weight: bold;'
					+	'margin: 1.5em 0 0.5em;'
					+'}'
					+'.BE-popup .BE-changelog + p {'
					+	'margin: 1em;'
					+	'font-style: italic;'
					+	'-moz-user-select: none;'
					+	'user-select: none;'
					+'}'
					+'.BE-older-changes {'
					+	'padding-top: 1px;'
					+'}'
					+'.BE-changelog li:before {'
					+	'content: "•";'
					+	'margin-left: -1em;'
					+	'position: absolute;'
					+'}'
					+'.BE-changelog li small {'
					+	'font-weight: bold;'
					+	'font-family: monospace;'
					+	'color: #000;'
					+	'display: inline-block'
					+'}'
					+'.BE-changelog li {'
					+	'margin: 0.3em 0;'
					+	'display: block;'
					+	'padding-left: 1em;'
					+	'line-height: 1.4;'
					+	'position: relative;'
					+'}'
					+'.BE-changelog {'
					+	'list-style: disc inside none;'
					+	'font-size: 12px;'
					+	'display: block;'
					+	'margin-right: 2em;'
					+'}'
					+'.BE-popup a {'
					+	'cursor: pointer;'
					+	'color: blue;'
					+'}'
					+'.BE-popup a:hover {'
					+	'text-decoration: underline'
					+'}'
					+'.BE-popup input[type=checkbox] {'
					+	'width: auto;'
					+	'margin: 2px 0 0 6px;'
					+'}'
					+'.BE-popup .BE-multibool input[type=checkbox] {'
					+	'vertical-align: middle;'
					+	'margin: 0 0.5em 0 0;'
					+	'line-height: 1'
					+'}'
					+'.BE-popup .BE-multibool label {'
					+	'float: none;'
					+	'width: auto;'
					+	'text-align: left;'
					+	'line-height: 1;'
					+	'margin-bottom: 0.2em'
					+'}'
					+'.BE-popup .BE-multibool {'
					+	'overflow: hidden;'
					+	'padding: 0 0 0 0.5em;'
					+	'border-left: 1px solid #676767;'
					+	'margin-top: 5px;'
					+'}'
					+'.BE-popup input[type=range]::-moz-focus-outer {'
					+	'border: none;'
					+	'border-right: 2px solid #808080;'
					+	'border-left: 2px solid #808080;'
					+'}'
					+'.BE-popup input[type=range] {'
					+	'padding: 0 4px;'
					+	'margin-top: 2px;'
					+	'border: none;'
					+'}'
					+'.BE-popup select {'
					+	'border: 1px solid #808080;'
					+	'font-family: "Lucida Grande",Arial,Verdana,sans-serif;'
					+'}'
					+'.BE-popup select, .BE-popup input, .BE-popup .BE-multibool {'
					+	'font-size: 11px;'
					+	'width: 20em;'
					+	'max-width: 70%;'
					+	'box-sizing: border-box;'
					+'}'
					+'.BE-popup p small {'
					+	'display: block;'
					+	'font-style: italic;'
					+	'clear: both;'
					+'}'
					+'.BE-popup p {'
					+	'margin: 0.5em 0;'
					+	'overflow: hidden;'
					+	'padding-bottom: 2px;'
					+'}'
					+'.BE-popup label {'
					+	'float: left;'
					+	'display: block;'
					+	'width: 40%;'
					+	'clear: both;'
					+	'text-align: right;'
					+	'margin-right: 1em;'
					+	'line-height: 1.8em;'
					+	'cursor: default;'
					+	'-moz-user-select: none'
					+'}'
					+'.BE-popup h1 {'
					+	'font-size: 14pt;'
					+	'font-weight: normal;'
					+	'padding: 0.5em 0 .3em 2em;'
					+	'margin: 0 0 0.7em;'
					+	'line-height: normal;'
					+	'border-bottom: 1px solid #676767;'
					+'}'
					+'.BE-popup {'
					+	'background: #E1E1E1;'
					+	'width: 850px;'
					+	'position: fixed;'
					+	'top: 10%;'
					+	'height: 85%;'
					+	'right: calc(50% - 425px);'
					+	'z-index: 600;'
					+	'box-shadow: 1px 1px 10px 0 black;'
					+	'box-sizing: border-box;'
					+	'display: flex;'
					+	'font-size: 11px;'
					+	'font-family: "Lucida Grande",Arial,Verdana,sans-serif;'
					+	'color: #212121;'
					+'}'
					+'.BE-popup>div {'
					+	'flex: 1 1 auto;'
					+	'padding: 1em;'
					+	'overflow: auto;'
					+'}'
					+'.BE-popup>nav>ul>li:hover {'
					+	'color: inherit;'
					+'}'
					+'.BE-popup>nav>ul>li+li {'
					+	'border-top: 1px solid #676767;'
					+'}'
					+'.BE-popup>nav>ul>li.active {'
					+	'background: #E1E1E1;'
					+	'color: #4A4A4A'
					+'}'
					+'.BE-popup>nav>ul>li:not(.active):hover {'
					+	'color: #fff;'
					+	'text-shadow: 1px 1px 0px black;'
					+	'background: #606060;'
					+'}'
					+'.BE-popup>nav>ul>li {'
					+	'padding: 1em 2em;'
					+	'cursor: pointer;'
					+	'line-height: 1;'
					+	'color: #ffffff;'
					+'}'
					+'.BE-popup>nav>ul {'
					+	'margin: 0;'
					+	'padding: 0;'
					+	'display: block;'
					+'}'
					+'.BE-popup>nav {'
					+	'background: #4A4A4A;'
					+	'color: #E1E1E1;'
					+	'font-size: 11px;'
					+	'font-family: "Lucida Grande",Arial,Verdana,sans-serif;'
					+	'min-width: 145px;'
					+	'-moz-user-select: none;'
					+	'-webkit-user-select: none;'
					+	'user-select: none;'
					+'}'
					+'.main-footer {'
					+	'z-index: 0;'
					+'}'
					+'.BE-video-frame {'
					+	'margin: 0 0 0.5em;'
					+	'display: block;'
					+'}'
					+'div.list_bar_h {'
					+	'z-index: 1;'
					+'}'
				)
				break;
		}
	}

	var style = $('<style>').appendTo(document.head)

	settings.onchange('BE-style', on_update)
}
/*
function feature_cart_style() {
	function on_update(value) {
		switch (value) {
			case 'green':
				style.text(
					'.top-nav__count {'
					+	'background-color: #008500;'
					+	'font-size: 10px;'
					+	'border-radius: 2px;'
					+	'vertical-align: middle;'
					+	'line-height: 1;'
					+	'color: #FFF;'
					+	'padding: 3px 3px 3px 4px;'
					+	'margin-bottom: 4px;'
					+'}'
				)
				break;
			default:
				style.text('')
		}
	}

	var style = $('<style>').appendTo(document.head)

	settings.onchange('navbar-cart-style', on_update)
}
*/

/*-- sync functions --*/
function shelf_url(page, order, timestamp) { return "https://www.gog.com/account/ajax?a=gamesShelfMore&p="+page+"	&s="+order+"	&q=&t="+timestamp }
function list_url(page, order, timestamp) { return "https://www.gog.com/account/ajax?a=gamesListMore&p="+page+"	&s="+order+"	&q=&t="+timestamp }
function wishlist_url(page, order, timestamp) { return "https://www.gog.com/account/ajax?a=wishlistSearch&p="+page+"	&s="+order+"	&q=&t="+timestamp }


function get_account_join_date(job) {
	sync_status_join.attr('class', 'BE-in-progress').text("Starting...")
	
	setTimeout(function() {
		if (!global_user_info) {
			sync_status_join.attr('class', 'BE-error').text("User info not yet retrieved. Wait a few secs while and try again.").addClass('error')
			job.errors = true
			gogwiki_sync_countdown(job)
		} else if (global_user_info.userSince) {
			job.join_date = global_user_info.userSince
			sync_status_join.attr('class', 'BE-success').text("Done")
			gogwiki_sync_countdown(job)
		} else {
			inject_request({
				method: "GET",
				url: '/users/info/'+global_user_info.id+'?expand=none',
				onload: function(response) {
					var user_info = JSON.parse(response.responseText)
					if (user_info && user_info.userSince) {
						global_user_info.userSince = user_info.userSince
						job.join_date = global_user_info.userSince
						sync_status_join.attr('class', 'BE-success').text("Done")
						gogwiki_sync_countdown(job)
					} else {
						sync_status_join.attr('class', 'BE-error').text("There was a problem loading your account data. Please try again later.").addClass('error')
						job.errors = true
						gogwiki_sync_countdown(job)
					}
				},
				onerror: function(response) {
					sync_status_join.attr('class', 'BE-error').text("There was a problem loading your account data. Please try again later.").addClass('error')
					job.errors = true
					gogwiki_sync_countdown(job)
				}
			})
		}
	})
}

function get_account_information(job) {
	sync_status_account.attr('class', 'BE-in-progress').text("Starting...")
	
	setTimeout(function() {
		if (!global_user_info) {
			sync_status_account.attr('class', 'BE-error').text("User info not yet retrieved. Wait a few secs while and try again.").addClass('error')
			job.errors = true
			gogwiki_sync_countdown(job)
		} else {
			job.avatar_url = global_user_info.avatar.replace(/^https?\:\/\/[^\/]*\//, '')+'_forum_avatar.jpg'
			job.gogname = global_user_info.username
			sync_status_account.attr('class', 'BE-success').text("Done")
			gogwiki_sync_countdown(job)
		}
	})
}

function getgame(id, games) {
	var game = games[id]
	if (game === undefined) {
		game = {id:id}
		games[id] = game
	}
	return game
}

function write_fragment(fragment, element) {
	switch (typeof(fragment)) {
		case 'string': {
			element.append(fragment)
			break;
		}
		case 'object': {
			if (fragment instanceof Array) {
				for (var i = 0; i < fragment.length; i += 1) {
					write_fragment(fragment[i], element)
				}
			} else {
				var link = fragment.link
				var text = fragment.text
				if (link && text) element.append(
					$('<a>').attr('href', link).attr('target', '_blank').text(text)
				)
			}
			break;
		}
	}
}
function write(paragraphs, container) {
	for (var i = 0; i < paragraphs.length; i += 1) {
		var p = $('<p>').appendTo(container)
		write_fragment(paragraphs[i], p)
	}
}

function purge_user_page(job) {
	GM_xmlhttpRequest({
		url:'https://gogwiki.com/wiki/Special:GOGUser/'+escape(job.gogname)+'/purge',
		method:'POST'
	})
}

function send_to_gogwiki(job) {
	sync_status_send.text("Sending...")

	var data = {
		version: version,
		branch: branch,
		games: [],
		movies: [],
		wishlist: job.wishlist,
		avatar_url: job.avatar_url,
		birthday: job.birthday,
		gogname: job.gogname,
		join_date: job.join_date,
		compatibility: 1455832023455
	}
	for	(var i in job.games) {
		data.games.push(job.games[i])
	}
	for	(var i in job.movies) {
		data.movies.push(job.movies[i])
	}

	GM_xmlhttpRequest({
		url:'https://gogwiki.com/wiki/Special:GOGSync',
		method:'POST',
		context: job,
		data: $.param({data: JSON.stringify(data)}),
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		onload: function(response) {
			sync_status_send.text("Done").attr('class', 'BE-success')
			purge_user_page(response.context)
			try {
				sync_status_output.empty()
				write(JSON.parse(response.responseText), sync_status_output)
			} catch (exception) {
				console.log(exception)
				console.log(response.responseText)
				sync_status_output.html("<p>There was a problem communicating with GOGWiki. It's possible that your information did not get updated this time. Please try again later.</p>")
			}

			gogwiki_sync_countdown(response.context)
		},
		onerror:function(response) {
			sync_status_send.text("Error").attr('class', 'BE-error')
			gogwiki_sync_countdown(response.context)
			response.errors = true
		}
	})
}

function collect_wishlist(job) {	
	sync_status_wishlist.text("Starting...").attr('class', 'BE-in-progress')
	var position = 0


	inject_request({
		method: "GET",
		url:"/account/wishlist",
		context: job,
		onload:function(response) {
			var gogData_src = /var gogData = (\{.*\});/.exec(response.responseText)[1]
			var gogData = JSON.parse(gogData_src)
			this.context.wishlist = Array(gogData.totalProducts)
			for (var i = 0; i < gogData.products.length; i += 1) {
				// read current page
				var product = gogData.products[i]
				var title = product.title.replace(/ ?[\u00AE\u2122]/g, '')
				var item = {
					image: product.image,
					url: product.url,
					shelf_pos: i,
					title: title.replace(/^(.*), The$/, 'The $1'),
					sort_title: title.replace(/^The (.*)$/, '$1, The'),
					slug: product.slug,
					id: product.id
				}
				this.context.wishlist[(gogData.page - 1) * gogData.productsPerPage + i] = item
			}

			// read other pages
			this.context.wishlist_pages_to_read = gogData.totalPages - 1
			this.context.wishlist_list_errors = false
			function complete(job) {
				job.wishlist_pages_to_read -= 1
				if (job.wishlist_pages_to_read <= 0) {
					if (job.wishlist_list_errors) {
						job.errors = true
						sync_status_wishlist.text("Error").attr('class', 'BE-error')
					} else {
							sync_status_wishlist.text("Done").attr('class', 'BE-success')
					}
					gogwiki_sync_countdown(job)
				}
			}
			for (var page = 1; page <= gogData.totalPages; page += 1) {
				if (page != gogData.page) {
					inject_request({
						method: 'GET',
						url: '/account/wishlist/search?hasHiddenProducts=false&hiddenFlag=0&isUpdated=0&mediaType=0&page='+encodeURIComponent(page)+'&sortBy='+encodeURIComponent(gogData.sortBy)+'&totalPages='+encodeURIComponent(gogData.totalPages),
						context: job,
						onload:function(response) {
							var result = JSON.parse(response.responseText)
							for (var i = 0; i < result.products.length; i += 1) {
								var product = result.products[i]
								var title = product.title.replace(/ ?[\u00AE\u2122]/g, '')
								var item = {
									image: product.image,
									url: product.url,
									shelf_pos: i,
									title: title.replace(/^(.*), The$/, 'The $1'),
									sort_title: title.replace(/^The (.*)$/, '$1, The'),
									slug: product.slug,
									id: product.id
								}
								this.context.wishlist[(result.page - 1) *result.productsPerPage + i] = item
							}

							complete(this.context)

						},
						onerror:function(response) {
							console.log("error", response)
							this.contenxt.wishlist_list_errors = true
							complete(this.context)
						}
					})
				}
			}
			if (gogData.totalPages <= 1) complete(this.context)
		},
		onerror:function(response) {
			sync_status_wishlist.text("Error").attr('class', 'BE-error')
			this.context.errors = true
			gogwiki_sync_countdown(this.context)
		}
	})
}

function collect_movies(job) {	
	sync_status_movies.text("Starting...").attr('class', 'BE-in-progress')
	var position = 0


	inject_request({
		method: "GET",
		url:"/account/movies",
		context: job,
		onload:function(response) {
			var gogData_src = /var gogData = (\{.*\});/.exec(response.responseText)[1]
			var gogData = JSON.parse(gogData_src)
			this.context.movies = Array(gogData.totalProducts)
			for (var i = 0; i < gogData.accountProducts.length; i += 1) {
				// read current page
				var product = gogData.accountProducts[i]
				var title = product.title.replace(/ ?[\u00AE\u2122]/g, '')
				var movie = {
					image: product.image,
					url: product.url,
					shelf_pos: i,
					title: title.replace(/^(.*), The$/, 'The $1'),
					sort_title: title.replace(/^The (.*)$/, '$1, The'),
					slug: product.slug,
					id: product.id
				}
				this.context.movies[(gogData.page - 1) * gogData.productsPerPage + i] = movie
			}

			// read other pages
			this.context.movie_pages_to_read = gogData.totalPages - 1
			this.context.movie_list_errors = false
			function complete(job) {
				job.movie_pages_to_read -= 1
				if (job.movie_pages_to_read <= 0) {
					if (job.movie_list_errors) {
						job.errors = true
						sync_status_movies.text("Error").attr('class', 'BE-error')
					} else {
							sync_status_movies.text("Done").attr('class', 'BE-success')
					}
					gogwiki_sync_countdown(job)
				}
			}
			for (var page = 1; page <= gogData.totalPages; page += 1) {
				if (page != gogData.page) {
					inject_request({
						method: 'GET',
						url: '/account/getFilteredProducts?hasHiddenProducts=false&hiddenFlag=0&isUpdated=0&mediaType=2&page='+encodeURIComponent(page)+'&sortBy='+encodeURIComponent(gogData.sortBy)+'&totalPages='+encodeURIComponent(gogData.totalPages),
						context: job,
						onload:function(response) {
							var result = JSON.parse(response.responseText)
							for (var i = 0; i < result.products.length; i += 1) {
								var product = result.products[i]
								var title = product.title.replace(/ ?[\u00AE\u2122]/g, '')
								var movie = {
									image: product.image,
									url: product.url,
									shelf_pos: i,
									title: title.replace(/^(.*), The$/, 'The $1'),
									sort_title: title.replace(/^The (.*)$/, '$1, The'),
									slug: product.slug,
									id: product.id
								}
								this.context.movies[(result.page - 1) *result.productsPerPage + i] = movie
							}

							complete(this.context)

						},
						onerror:function(response) {
							console.log("error", response)
							this.contenxt.movie_list_errors = true
							complete(this.context)
						}
					})
				}
			}
			if (gogData.totalPages <= 1) complete(this.context)
		},
		onerror:function(response) {
			sync_status_movies.text("Error").attr('class', 'BE-error')
			this.context.errors = true
			gogwiki_sync_countdown(this.context)
		}
	})
}

function collect_games(job) {	
	sync_status_games.text("Starting...").attr('class', 'BE-in-progress')
	var position = 0


	inject_request({
		method: "GET",
		url:"/account",
		context: job,
		onload:function(response) {
			var gogData_src = /var gogData = (\{.*\});/.exec(response.responseText)[1]
			var gogData = JSON.parse(gogData_src)
			this.context.games = Array(gogData.totalProducts)
			for (var i = 0; i < gogData.accountProducts.length; i += 1) {
				// read current page
				var product = gogData.accountProducts[i]
				var title = product.title.replace(/ ?[\u00AE\u2122]/g, '')
				var game = {
					image: product.image,
					url: product.url,
					shelf_pos: i,
					title: title.replace(/^(.*), The$/, 'The $1'),
					sort_title: title.replace(/^The (.*)$/, '$1, The'),
					slug: product.slug,
					id: product.id
				}
				this.context.games[(gogData.page - 1) * gogData.productsPerPage + i] = game
			}

			// read other pages
			this.context.game_pages_to_read = gogData.totalPages - 1
			this.context.game_list_errors = false
			function complete(job) {
				job.game_pages_to_read -= 1
				if (job.game_pages_to_read <= 0) {
					if (job.game_list_errors) {
						job.errors = true
						sync_status_games.text("Error").attr('class', 'BE-error')
					} else {
							sync_status_games.text("Done").attr('class', 'BE-success')
					}
					gogwiki_sync_countdown(job)
				}
			}
			for (var page = 1; page <= gogData.totalPages; page += 1) {
				if (page != gogData.page) {
					inject_request({
						method: 'GET',
						url: '/account/getFilteredProducts?hasHiddenProducts=false&hiddenFlag=0&isUpdated=0&mediaType=1&page='+encodeURIComponent(page)+'&sortBy='+encodeURIComponent(gogData.sortBy)+'&totalPages='+encodeURIComponent(gogData.totalPages),
						context: job,
						onload:function(response) {
							var result = JSON.parse(response.responseText)
							for (var i = 0; i < result.products.length; i += 1) {
								var product = result.products[i]
								var title = product.title.replace(/ ?[\u00AE\u2122]/g, '')
								var game = {
									image: product.image,
									url: product.url,
									shelf_pos: i,
									title: title.replace(/^(.*), The$/, 'The $1'),
									sort_title: title.replace(/^The (.*)$/, '$1, The'),
									slug: product.slug,
									id: product.id
								}
								this.context.games[(result.page - 1) *result.productsPerPage + i] = game
							}

							complete(this.context)

						},
						onerror:function(response) {
							console.log("error", response)
							this.contenxt.game_list_errors = true
							complete(this.context)
						}
					})
				}
			}
			if (gogData.totalPages <= 1) complete(this.context)
		},
		onerror:function(response) {
			sync_status_games.text("Error").attr('class', 'BE-error')
			this.context.errors = true
			gogwiki_sync_countdown(this.context)
		}
	})
}


function feature_forum_username_link() {
	function on_update(value) {
		switch (value) {
			case true:
				$('.big_user_info .b_u_name').each(function() {
					var div = $(this)
					var name = div.text()
					div.text("")
					
					$("<a>")
					.text(name)
					.attr("href", "https://gogwiki.com/wiki/Special:GOGUser/"+escape(name))
					.attr("target", "_blank")
					.appendTo(div)
				})
				break;
			default:
				$('.big_user_info .b_u_name>a').each(function() {
					var a = $(this)
					var div = a.parent()
					var name = a.text()
					div.empty().text(name)
				})
				break;
		}
	}


	$('<style>')
	.text(
		'.b_u_name>a {'
		+	'color: inherit;'
		+'}'
	)
	.appendTo(document.head)

	settings.onchange('forum-username-link', on_update)
}

function feature_forum_group_giveaways() {
	function on_update(value) {

		if (value == 'group below other topics') {
			giveaway_topics.remove().insertAfter($('#t_norm'))
			.find('.list_bar_h')
			.click(function() {
				$(this).siblings('.list_row_h').slideToggle()
			})
			$('.list_bottom_bg').remove().appendTo(giveaway_topics)
		} else {
			giveaway_topics.remove().insertBefore($('#t_norm'))
			.find('.list_bar_h')
			.click(function() {
				$(this).siblings('.list_row_h').slideToggle()
			})
			$('.list_bottom_bg').remove().appendTo($('#t_norm'))
		}

		switch (value) {
			case 'hide':
				style.text(
					'.BE-giveaway-topics, .BE-giveaway-topic {'
					+	'display: none;'
					+'}'
				)
				break
			case 'group and collapse':
				style.text(
					'.BE-giveaway-topics {'
					+	'display: block;'
					+'}'
					+'.BE-giveaway-topic {'
					+	'display: none;'
					+'}'
				)
				giveaway_topics.children('.list_row_h').hide()
				break
			case 'group and expand':
			case 'group below other topics':
				style.text(
					'.BE-giveaway-topics {'
					+	'display: block;'
					+'}'
					+'.BE-giveaway-topic {'
					+	'display: none;'
					+'}'
				)
				giveaway_topics.children('.list_row_h').show()
				break
			default:
				style.text(
					'.BE-giveaway-topics {'
					+	'display: none;'
					+'}'
					+'.BE-giveaway-topic {'
					+	'display: block;'
					+'}'
				)
		}
	}

	var setting = settings.get('forum-group-giveaways')
	
	var giveaway_topics = $('<div class="favourite_h BE-giveaway-topics">')

	var list = $('<div class="list_row_h">')

	var giveaway_count = 0

	$('#t_norm').find('div.topic_s>a').each(function() {
		if (/giveaway[^/]*$/.test(this.getAttribute('href'))) {
			var row = $(this).closest('.list_row_odd')
			row.clone().appendTo(list)
			row.addClass('BE-giveaway-topic')
			giveaway_count += 1
		}
	})

	if (giveaway_count > 0) {

		var bar = $('<div class="list_bar_h">')
		.append(
			$('<div class="lista_icon_3">').attr('style', 'background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADREAAA0RARg5FhkAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAEWSURBVDhPfdC7SoNBEAXg+cHCUrzgK+RB8iKKhCARERTSiHYWCikCpkgRSJPOYCliYyEWgoriC3hB8hLHc342ywozKT427Nk5ycQA2Nxs0xrUodN0NpTxc5O6SbOcqYcZLNGIPmmYCnR+0Te901nyxvOWljU7L9gpL4tftMf7GbWKO33ZlNplQTsoOEgF9eOiRAWdskCtk7TCIK2gUyv80kuxwvO/FXrXFSJ8CFn0xs6vKkR+Ngyy6E291/aJwTNdMUiU5//g6NLgeVgzSJTnguNxBc/HukGiPBd0RxU8rxyWKM8Fh0OD54nDEuW5YH9g8DyuGiTKc8Fu3+C557BEeS5o9QyeOw5LlOeCrQuD54bDEuUq+AOV2hZAAh3hiwAAAABJRU5ErkJggg==") no-repeat scroll 0px 0px transparent'),
			$('<div class="lista_bar_text">').text("Topics which appear to be giveaways ("+giveaway_count+"	)")
		)
		.css('cursor', 'pointer')
	
		giveaway_topics
		.append(bar, list)
	}

	var style = $('<style>').appendTo(document.head)

	settings.onchange('forum-group-giveaways', on_update)
}

/*function feature_hide_alerts() {
	function on_update(value) {

		var expression = "0"
		var show_expression = "false"

		if (value["friend requests"]) {
			expression += "+notifications.friendRequests"
			show_expression += "||notifications.has.friendRequests"
		}
		if (value["game updates"]) {
			expression += "+notifications.productUpdates"
			show_expression += "||notifications.has.productUpdates"
		}
		if (value["forum replies"]) {
			expression += "+notifications.forumUpdates"
			show_expression += "||notifications.has.forumUpdates"
		}
		if (value["new messages"]) {
			expression += "+notifications.chatMessages"
			show_expression += "||notifications.has.chatMessages"
		}


		// inject angular script into the page, then remove it after execution
		setTimeout(inject_script.bind(null, "angular.element(document).injector().invoke(function($compile) {var account_menu = document.querySelector('.top-nav__dropdown--account>a:first-child'); var item_count = account_menu.querySelector('span.top-nav__item-count'); if (item_count) account_menu.removeChild(item_count); var scope = angular.element(document.querySelector('[ng-app]')).injector().get('$rootScope'); var html = '<span ng-controller=\"notificationsCtrl as notifications\" ng-show=\""+show_expression+"	\" class=\"top-nav__item-count\" ng-bind=\""+expression+"	\"></span>'; var result = $compile(html)(scope); angular.element(account_menu).append(result); scope.$apply() }) "), 1)
	}

	setTimeout(settings.onchange.bind(settings, 'navbar-show-alerts', on_update), 1)
}
*/
/*function feature_show_sections() {
	function on_update(value) {
		$('.top-nav__items>.top-nav__dropdown--games>a[href="/games"]').parent().toggle(value.games)
		$('.top-nav__items>.top-nav__item[href="/movies"]').toggle(value.movies)
	}

	settings.onchange('navbar-show-sections', on_update)
}
*/
function feature_favicon() {
	function on_update(value) {
		favicon.remove()
		switch (value) {
			case 'v1':
				favicon.attr('href', 'data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxMTG4MTEx/y8vL/8wMDD/MTEx/zAwMP8vLy//Ly8v/zExMf8xMTH/MTEx/zExMf8xMTH/MTEx/zExMf8xMTG4MTEx/y0tLf8rKyv/LS0t/y4uLv8sLCz/Kysr/ysrK/8sLCz/Li4u/y0tLf8tLS3/LS0t/y4uLv8uLi7/MDAw/zAwMP8im8L/Ksb9/yrG/f8qQEf/I6LM/yrG/f8qxv3/IpvC/ywsLP8qxv3/KDQ3/yi+8f8sLCz/KL7x/y8vL/8wMDD/KMDq/yszNP8wMDD/Li4u/yrK9/8qNDb/KTY4/ynG8v8sLCz/K8/+/yczNv8pxvH/Kioq/ynG8v8vLy//MTEx/yrL6P8qLS3/LS0t/y4uLv8s1vT/Ki8w/yovMP8r0/L/Li4u/y3e/v8oOTz/LNX0/ykuL/8r0/L/MDAw/zIyMv8qydj/MOz//zDs//8sR0n/K8/f/zDs//8w7P//KsnY/zExMf8r0+T/MOz//zDs//8w7P//LuHz/zIyMv8yMjL/MDAw/y8vL/8vLy//MTEx/zIyMv8zMzP/MzMz/zMzM/8zMzP/MjIy/zAwMP8vLy//Ly8v/zExMf8yMjL/MTEx/y0tLf8rKyv/Kysr/ywsLP8xMTH/MzMz/zMzM/8zMzP/MzMz/zExMf8tLS3/Kysr/ysrK/8sLCz/MTEx/zExMf8et4P/HreD/x63g/8cmXD/Ly8v/zAwMP8vLy//Ly8v/zAwMP8wMDD/Hq9+/x63g/8et4P/HJdv/zAwMP8wMDD/LCws/ywsLP8rNDL/IcKQ/y0tLf8sLCz/Kysr/yoqKv8sLCz/Li4u/ywsLP8sLCz/KT03/yC5iv8vLy//Ly8v/yG0jv8l0aP/Kzg1/yXRo/8rKyv/IbSO/yXRo/8l0aP/Ir6V/ysuLf8hsIv/JMic/ys4Nf8kyJz/Ly8v/y8vL/8p4rn/KjUz/ywsLP8p4rn/LCws/yniuf8qMjH/KjIx/yjbtP8pNzT/KNex/yk9Of8pNzT/KNex/y8vL/8wMDD/LfLM/yk0Mv8pMjH/LfLM/y4uLv8t8sz/KTIx/ykxMP8s68b/Kzo3/yvmw/8oPjr/Jz05/yvmw/8xMTH/MjIy/yrYvP8w/dr/MP3a/yrYvP8xMTH/Kti8/zD92v8w/dr/LOXG/zAzM/8p0bb/MP3a/zD92v8q1Lj/MjIy/zMzM/8zMzP/MzMz/zMzM/8zMzP/MzMz/zMzM/8zMzP/MzMz/zMzM/8zMzP/MzMz/zMzM/8zMzP/MzMz/zMzM/8xMTG9MzMz/zMzM/8zMzP/MzMz/zMzM/8zMzP/MzMz/zMzM/8zMzP/MzMz/zMzM/8zMzP/MzMz/zMzM/8xMTG9AAAAAAAAAAAAAFQAAAAAAAAAW0gAAHQgAABjQgAAay0AAG8tAABsbwAAbF0AAFNlAABlcgAAYW4AAEJhAAAEAA==').appendTo(document.head)
				break
			case 'v2':
				favicon.attr('href', 'data:image/vnd.microsoft.icon;base64,AAABAAIAICAAAAEAIACoEAAAJgAAABAQAAABACAAaAQAAM4QAAAoAAAAIAAAAEAAAAABACAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAJiYm2SYmJtkAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/JiYm2SYmJtkmJibZJiYm2QAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8mJibZJiYm2QAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/////////////////////////////////wAAAP8AAAD///////////////////////////////////////////8AAAD/AAAA////////////AAAA/wAAAP///////////wAAAP8AAAD///////////8AAAD/AAAA/wAAAP8AAAD/////////////////////////////////AAAA/wAAAP///////////////////////////////////////////wAAAP8AAAD///////////8AAAD/AAAA////////////AAAA/wAAAP///////////wAAAP8AAAD/AAAA/wAAAP///////////wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA////////////AAAA/wAAAP8AAAD/AAAA////////////AAAA/wAAAP///////////wAAAP8AAAD///////////8AAAD/AAAA////////////AAAA/wAAAP8AAAD/AAAA////////////AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD///////////8AAAD/AAAA/wAAAP8AAAD///////////8AAAD/AAAA////////////AAAA/wAAAP///////////wAAAP8AAAD///////////8AAAD/AAAA/wAAAP8AAAD///////////8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP///////////wAAAP8AAAD/AAAA/wAAAP///////////wAAAP8AAAD///////////8AAAD/AAAA////////////AAAA/wAAAP///////////wAAAP8AAAD/AAAA/wAAAP///////////wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA////////////AAAA/wAAAP8AAAD/AAAA////////////AAAA/wAAAP///////////wAAAP8AAAD///////////8AAAD/AAAA////////////AAAA/wAAAP8AAAD/AAAA/////////////////////////////////wAAAP8AAAD///////////////////////////////////////////8AAAD/AAAA//////////////////////////////////////////////////////8AAAD/AAAA/wAAAP8AAAD/////////////////////////////////AAAA/wAAAP///////////////////////////////////////////wAAAP8AAAD//////////////////////////////////////////////////////wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA////////////////////////////////////////////AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD///////////////////////////////////////////8AAAD/AAAA/wAAAP8AAAD///////////////////////////////////////////8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP///////////////////////////////////////////wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP///////////wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA////////////AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA////////////AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD///////////8AAAD/AAAA/wAAAP8AAAD//////////////////////wAAAP8AAAD///////////8AAAD/AAAA////////////////////////////////////////////AAAA/wAAAP//////////////////////AAAA/wAAAP///////////wAAAP8AAAD/AAAA/wAAAP//////////////////////AAAA/wAAAP///////////wAAAP8AAAD///////////////////////////////////////////8AAAD/AAAA//////////////////////8AAAD/AAAA////////////AAAA/wAAAP8AAAD/AAAA////////////AAAA/wAAAP8AAAD/AAAA////////////AAAA/wAAAP///////////wAAAP8AAAD/AAAA/wAAAP///////////wAAAP8AAAD///////////8AAAD/AAAA/wAAAP8AAAD///////////8AAAD/AAAA/wAAAP8AAAD///////////8AAAD/AAAA/wAAAP8AAAD///////////8AAAD/AAAA////////////AAAA/wAAAP8AAAD/AAAA////////////AAAA/wAAAP///////////wAAAP8AAAD/AAAA/wAAAP///////////wAAAP8AAAD/AAAA/wAAAP///////////wAAAP8AAAD/AAAA/wAAAP///////////wAAAP8AAAD///////////8AAAD/AAAA/wAAAP8AAAD///////////8AAAD/AAAA////////////AAAA/wAAAP8AAAD/AAAA////////////AAAA/wAAAP8AAAD/AAAA////////////AAAA/wAAAP8AAAD/AAAA////////////AAAA/wAAAP///////////wAAAP8AAAD/AAAA/wAAAP///////////wAAAP8AAAD///////////8AAAD/AAAA/wAAAP8AAAD///////////8AAAD/AAAA/wAAAP8AAAD///////////////////////////////////////////8AAAD/AAAA////////////////////////////////////////////AAAA/wAAAP///////////////////////////////////////////wAAAP8AAAD/AAAA/wAAAP///////////////////////////////////////////wAAAP8AAAD///////////////////////////////////////////8AAAD/AAAA////////////////////////////////////////////AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/ICAg3iAgIN4AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/JiYm2SYmJtkgICDeICAg3gAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8mJibZJiYm2QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAABAAAAAgAAAAAQAgAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAACYmJtkAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/yYmJtkAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/////////////////wAAAP//////////////////////AAAA//////8AAAD//////wAAAP//////AAAA/wAAAP//////AAAA/wAAAP8AAAD//////wAAAP8AAAD//////wAAAP//////AAAA//////8AAAD//////wAAAP8AAAD//////wAAAP8AAAD/AAAA//////8AAAD/AAAA//////8AAAD//////wAAAP//////AAAA//////8AAAD/AAAA/////////////////wAAAP//////////////////////AAAA////////////////////////////AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA//////////////////////8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP//////////////////////AAAA/wAAAP8AAAD/AAAA/wAAAP//////AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD//////wAAAP8AAAD///////////8AAAD//////wAAAP//////////////////////AAAA////////////AAAA//////8AAAD/AAAA//////8AAAD/AAAA//////8AAAD//////wAAAP8AAAD//////wAAAP//////AAAA/wAAAP//////AAAA/wAAAP//////AAAA/wAAAP//////AAAA//////8AAAD/AAAA//////8AAAD//////wAAAP8AAAD//////wAAAP8AAAD//////////////////////wAAAP//////////////////////AAAA//////////////////////8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/yAgIN4AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/yYmJtkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA').appendTo(document.head)
				break
			case 'v3':
				favicon.attr('href', 'data:image/vnd.microsoft.icon;base64,AAABAAIAEBAAAAAAAABoBQAAJgAAACAgAAAAAAAAqAgAAI4FAAAoAAAAEAAAACAAAAABAAgAAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wDTQXAAixYrALgqRADtYIsAuDFoAJ0fQADSSIsAyT1XAKonNgDjU5EAxC9PAMY1ZgCUHjMAtSpcAJUcJADmVYQA00V+ANxIaQCxKE8A3EyEAKAgMgCpHz8AwTdcAK0qRACfIUoAvCxPAKMkPADLQG8AkRcxAMM1VADQRXcAxztrAL4yTACdHzgAsiZCAKsoPgCvJkkAtilLAKwhOgC9M2UAkhstAKUeNADSR3IAlxspAMY4WgCXHC8ApSY2ALQuXwC5LVsAqCQ6ANdHgACbIjUAwDNQAMExVACkIjQAiRUuAKkfOQCnITwAsCxFAK0kOgCTGTAAoyA2AMs/VwCQGC8AxTZkAMAxTQC5K0YAjRYqAKgfPQCmIzwAqylAALwuTgCxKk4AjRYsAJ0gNwCkJDsAqCE9AKgfPgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAU1HOwEXT0ZOAToBKAErAQE8AQEBDAEBRAEkAQQBPQEBFAEBARMBAR8BGwE3AUkBAQ8yAgEFESwYAQ0hHSASAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBATgHGkoBAQEBAQEVCzQIAQEBAQEzAQEBAQEBAQEBJwEBLRABCgEZSCU/ATZDASYBAQMBARYBTAEBIwFAAQExAQE5AQE+AS8BARwBCQEBBgEBHkFLRQEqDjUwASIuQikBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAACAAAABAAAAAAQAIAAAAAACABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AzT9xAIwWLQDmacQAtilGAOtflADUTI0AtjBjAKUjMwDjXq0AyjdWAOVVfgCjIEcA3EpvAN1ToACoME8A1UBgAJgdJwDdWpEAxTpkALUrVQDRR30AvTVLAJYeNQCvIzwA5GCgAMAwWADeT4YA6FuJAK4zRgCrJlUAoiM8AMpAXQDYUZUAxDpuANRFdACrKUIAvzRpALssTQDMQHsA4FqlAMM5UQCxKk0AlBouANxOjgDDM18Anh4zANNHhwC5LlwApCNOAMU7WgCpITgA6FmQAMk9aQCoI0AApCpOAKYnOACxJUQAwjZWAOBdlgC0L0YA21alAOJbnQC/MlAAryk9AN9PgAC5MEkAniM3ALszZACbHSwA1EmCALQtWgC6MmkAkBcwANBCdgDEOGkA3FSbALEqQwC+L0oAtSxKAMg9bwC/NVoAxjpfAONbqgDNQ24AsSpIAKAhMACaHTEAmiE2ANdNkwClIUMAqSVEALMrUQDIOWwA4lmhAKYkPADVS4cArCVAALsqSgDBNWUAwjhfAN9NcACzJkEAqzJJAM9FeQDSPV8A51eIANRHegDDM1EAyTxZAJAYLADnWIAAqic5AKsiPADMQXYAvS5QALsyUAC/Nk8Ati9fAL0vXADCNFoAxTZjAJYdMQCkIzYA4V2wANVIdgDLPmAAyDpoAJYaKwDXS4oAryNAALUpTADKPXEAxTZVAMAzYQDWSIgAtClCAL0ySQC+MU0AtS5XALgtWgDBM1UAoSI6AKgmPwCvK0IAuCpJALstSgDNQFwAwjdaAI0XMADqXYoAnB81AJ4gNwCkIjoAqyM5ALAoQQCzLkQAtCtHALkwTADJNlgAwTRTAJgcKwDXT5EApCU4AKcmPADNQXMAsylKAMQ3WADsYJYA31ShAI0XLACWHCgAkhkvAJQcMACXGzAAmB4yALAlPQCqKEAArShBAMtAdAC0KEcArytJALosSQCzK0wAtitNALUrWQC6MmcAtyxbALgxZADFOF4Aui1eAME0XgDiWKMAjhcuAJMaLACZHSkAlhsuAJscKgCUHTIA1EqMAJ4hOQCmJD4A0ER1AKomPgCwJUAAryRCALIoQgDJP28AtCdDALYoRACzK0UAqyhUALMsSQCzKEwAuzJIALw0SQC5LEwAvDNLALMqVAC8M2YAxTlZAMI1UQC+NE8AwzNUAL8wVgCUGjAAlh4zAJ4jOQCkJToApiY+AK0jPACuJUAAyDxnAMg2VgDDNFwA1U2OAJweKwCZIDUAoyM7AK0kPwCsJ0AAtypIALovSwC0KlIAty9iALQrVgCKFi4AjRYvAI8YLgCRGC8AlxwnAJEXMQCWGi0AnB0qAJcfNQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQHmkLJiYugBATo6Os6Dg+jwAQFy5wEBsRkBATQ0AQEBASWRkZzP0QEBY2OSBdLS0c8BAYPNAQGJZwEB55sBAQEBttUBAQEBAQEL6gEBAQFPkwEBtfIBAbe3AQHRzwEBAQEruAEBAQEBARFqAQEBAd5AAQHZJwEBdHQBAZKSAQEBAdv0AQEBAQEBZg4BAQEB3TsBAeEbAQF56wEBeXkBAQEBvLoBAQEBAQFwDAEBAQFTlQEBLnoBAYA2AQECAgEBAQG/jY14gCQBAZcda0J+VRRlAQFehYW0c2kWR2GCAQEBATEV9BVkSwEBqQY1HGymUdABATDIyAfsoyJNKQoBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAfE3Ww0fCCPLAQEBAQEBAQEBAQEBX8FUVKoPfQQBAQEBHmgQODLUjFIBAQEBAQEBAQEBAQETPBo/LYhaPgEBAQEBAQEBAQFcngEBAQEBAQEBAQEBAQEBAQEBAYUoAQEBAQEBAQEBAcrTAQEBAQEBAQEBAQEBAQEBAQEBwIcBAQEB7f7ErKIBfE4BAYrX2Bfan1BWAQGOoKCGoQG5hAEBAQFGxhL7xAEJQQEBPZ2dPZ1Os8wBAXXgbYvzAafWAQEBAf2BAQEBAQlxAQGy5gEBAQFgmgEBdYYBAQEBXfYBAQEBb28BAQEBV3wBAe/JAQEBAY+PAQF2bgEBAQFIdwEBAQEDqwEBAQFYLwEBmZgBAQEBIO8BASqUAQEBAfW9AQEBAfcDAQEBAeKvAQFYsAEBAQEgYAEBKiEBAQEBSbsBAQEBlvjC+fr6rSwBAcV74/9Z5OWlAQHfM3/pTCZJuwEBAQH8Skr5wsJvbwEBw67HGO5EpDkBAUOhqL56ZNxFAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=').appendTo(document.head)
				break
			default:
				favicon.attr('href', favicon_url).appendTo(document.head)
		}
	}

	var favicon = $('head link[rel=icon]')
	if (favicon.length == 0) favicon = $('<link rel="icon" type="image/vnd.microsoft.icon" href="/favicon.ico" />')
	var favicon_url = favicon.attr('href')

	settings.onchange('favicon', on_update)
}

function feature_gamecard_show_descriptions() {
	function on_update(value) {
		if (value) {
			style.text(
				'.description__text a.description__more {'
				+	'display: none;'
				+'}'
				+'.description__text[ng-hide=showAll] {'
				+	'display: none !important;'
				+'}'
				+'.description__text[ng-show=showAll] {'
				+	'display: block !important;'
				+'}'
			)
		} else {
			style.text('')
		}
	}

	var style = $('<style>').appendTo(document.head)
	settings.onchange('gamecard-show-descriptions', on_update)
}

function feature_navbar_library_links() {
	function on_update(value) {
		if (value) {
			style.text(
				// +'.BE-navbar-library-links:hover {'
				// +	'background: #c3c3c3;'
				// + '}'
				// +'.top-nav__dd-item._dropdown__item:hover + .BE-navbar-library-links {'
				// +	'background: #B3B3B3;'
				// + '}'
				+'.is-contracted .BE-navbar-library-links {'
				+	'display: none;'
				+ '}'
				+'.BE-navbar-library-links {'
				+	'cursor: default;'
				+	'height: 25px !important;'
				+	'text-align: center;'
				+	'border-top: none !important;'
				+	'margin-bottom: 5px;'
				+ '}'
				+'.BE-navbar-library-links a {'
				+	'width: 16px;'
				+	'height: 12px;'
				+	'display: inline-block;'
				+	'margin: 0px 9px;'
				+	'border: 1px solid #A1A1A1;'
				+	'padding: 5px;'
				+	'background-clip: content-box, padding-box;'
				+	'vertical-align: top;'
				+	'border-radius: 3px;'
				+	'background-image: url("/www/default/-img/acc_sprt.2b08c763.png"), linear-gradient(to bottom, #E6E6E6, #CCC);'
				+ '}'
				+'.BE-navbar-library-links a:hover {'
				+	'background-image: url("/www/default/-img/acc_sprt.2b08c763.png"), linear-gradient(to bottom, #666, #939393);'
				+ '}'
				+'.BE-navbar-library-links a:nth-child(1) {'
				+	'background-position: -11px -52px, 0 0;'
				+ '}'
				+'.BE-navbar-library-links a:nth-child(2) {'
				+	'background-position: -11px -64px, 0 0;'
				+ '}'
				+'.BE-navbar-library-links a:nth-child(3) {'
				+	'background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAMCAYAAACEJVa/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADREAAA0RARg5FhkAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAABSSURBVDhPY/j//z8DOi4pKfkPwyA5dD66epwGYNOMbDCyQXgNgRkE04DXEGTnorPRXYRNHuwSqhiCLXBJEYOHCS7X4HMpzKJRQ1BTMyhcqBImALz+Fw+lXh8rAAAAAElFTkSuQmCC") no-repeat, linear-gradient(to bottom, #E6E6E6, #CCC) repeat-x;'
				+	'background-position: center 4px, 0 0;'
				+ '}'
				+'.BE-navbar-library-links a:nth-child(1):hover {'
				+	'background-position: 5px -52px, 0 0;'
				+ '}'
				+'.BE-navbar-library-links a:nth-child(2):hover {'
				+	'background-position: 5px -65px, 0 0;'
				+ '}'
				+'.BE-navbar-library-links a:nth-child(3):hover {'
				+	'background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAMCAYAAACEJVa/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADREAAA0RARg5FhkAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAACFSURBVDhPnZExCsAgEAT9/8MsbGy0EAv9yYYNKPFyOSXFgOcsi3gOgJP03jGgk7PMvwpqrSAMjrOctyU5Z5ARlOfnPDL3S2KM+OLE3yUhBHxx4l9/on307m6WtNagwQLL0c+SUgo0GLLcUpJSggZDlltK/mxnWbG1gZ1bXuK9hwZDlqO/ABlumP/ZvW7rAAAAAElFTkSuQmCC") no-repeat, linear-gradient(to bottom, #666, #939393) repeat-x;'
				+	'background-position: center 4px, 0 0;'
				+ '}'
			)
		} else {
			style.text(
				'.BE-navbar-library-links {'
				+	'display: none'
				+ '}'
			)
		}
	}

	$('<div class="top-nav__dd-item _dropdown__item BE-navbar-library-links">')
	.append($('<a href="https://www.gog.com/account/games/shelf">'))
	.append($('<a href="https://www.gog.com/account/games/list">'))
	.append($('<a href="https://www.gog.com/account/gifts">'))
	.insertAfter($('.top-nav__dropdown--account .top-nav__dd-item._dropdown__item[href$="/account"]'))

	var style = $('<style>').appendTo(document.head)
	settings.onchange('navbar-library-links', on_update)
}

function compat_get_gogData() {
	var gogData = window.gogData
	if (undefined === gogData) {
		var scripts = document.querySelectorAll('body>script:not([src])')
		for (var i = 0; i < scripts.length; i += 1) {
			var script = scripts[i];
			script = script.firstChild
			if (script.nodeType == 3) {
				var text = script.textContent
				if (text.search('var gogData = ') >= 0) {
					eval(text + ';window.gogData = gogData')
					break
				}
			}
		}
	}
}

function feature_gamecard_gogwiki_link() {
	function on_update(value) {
		if (value) {
			$('div.product-details')
			.append(row)
		} else {
			row.remove()
		}
	}

	var row = $('<div class="product-details-row">')
	
	$('<div class="product-details__category">').text("GOGWiki").appendTo(row)

	var gogData = unsafeWindow.gogData

	if (gogData) {
		var title = unsafeWindow.gogData.gameProductData.title
			.replace(/[\u2122\u00ae\u2018]/g, '')
			.replace("\u2019", "'")
			.replace("\u2013", "-")
			.replace(/^(.*), The/, 'The $1')
				
		$('<div class="product-details__data">')
		.appendTo(row)
		.append(
			$('<a target="_blank" class="un">')
			.attr('href', "https://gogwiki.com/wiki/"+escape(title))
			.text('Article on ' + title)
		)

		var style = $('<style>').appendTo(document.head)
		settings.onchange('gamecard-gogwiki-link', on_update)
	}
}

function feature_gamecard_gogdb_link() {
	function on_update(value) {
		if (value) {
			$('div.product-details')
			.append(row)
		} else {
			row.remove()
		}
	}

	var row = $('<div class="product-details-row">')
	
	$('<div class="product-details__category">').text("GOG DB").appendTo(row)

	var gogData = unsafeWindow.gogData

	if (gogData) {
		var title = gogData.gameProductData.title
			.replace(/[\u2122\u00ae\u2018]/g, '')
			.replace("\u2019", "'")
			.replace("\u2013", "-")
			.replace(/^(.*), The/, 'The $1')
				
		;$('<div class="product-details__data">')
		.appendTo(row)
		.append(
			$('<a target="_blank" class="un">')
			.attr('href', "https://www.gogdb.org/product/"+gogData.gameProductData.id)
			.text('DB entry for ' + title)
		)

		var style = $('<style>').appendTo(document.head)
		settings.onchange('gamecard-gogdb-link', on_update)
	}
}

function feature_avatar_zoom() {
	var zoom_on_click

	function on_update(value) {
		zoom_on_click = value
		if (value) {
			style.text(
				'.spot_h:first-child+.BE-fullsize-avatar {'
				+	'margin-top: 13px;'
				+'}'
				+'.BE-fullsize-avatar {'
				+	'box-shadow: 1px 1px 3px 0px #000000;'
				+	'z-index: 101;'
				+	'margin-left: 12px;'
				+	'margin-top: 30px;'
				+	'max-height: 420px;'
				+	'cursor: zoom-out;'
				+	'position: absolute;'
				+'}'
				+'.b_p_avatar_h img {'
				+	'cursor: zoom-in;'
				+'}'
			)
		} else {
			style.text('')
			$('.BE-fullsize-avatar').click()
		}
	}

	$('.b_p_avatar_h img').click(function() {
		if (!zoom_on_click) return

		var img = $(this)
		var src = img.attr('src')

		if (!img.data('BE-zoomed')) {
		
			img.data('BE-zoomed', true)
			
			// clear all fullsize avatars
			$('.BE-fullsize-avatar').data('BE-thumb', null).remove()
			$('.b_p_avatar_h img').data('BE-zoomed', false)
		
			var post = img.closest('.spot_h')
			
			var fullsize = $('<img alt="" class="BE-fullsize-avatar">')
			.attr('src', src.replace(/_forum_avatar\.jpg$/, '.jpg'))
			.insertBefore(post)
			.one('click', function() {
				$(this).data('BE-thumb').data('BE-zoomed', false)
				$(this).data('BE-thumb', null)
				$(this).remove()
			})
			
			fullsize.data('BE-thumb', img)
			
		}
	})

	var style = $('<style>').appendTo(document.head)

	settings.onchange('forum-avatar-zoom', on_update)
}


function feature_forum_quick_post() {
	function on_update(value) {
		if (value) {
			style.text(
				'.quick_post .BE-hints p {'
				+	'margin: 7px 0;'
				+'}'
				+'.quick_post .BE-hints key {'
				+	'border: 1px solid;'
				+	'margin: 0 1px;'
				+	'padding: 1px 4px;'
				+	'border-radius: 4px;'
				+	'font-family: serif;'
				+'}'
				+'.quick_post.BE-focus .BE-hints.BE-focus {'
				+	'opacity: 1;'
				+'}'
				+'.quick_post.BE-focus .BE-hints {'
				+	'opacity: 0;'
				+'}'
				+'.quick_post .BE-hints.BE-focus {'
				+	'opacity: 0;'
				+'}'
				+'.quick_post .BE-hints {'
				+	'color: ' + ((forum_skin==0)?'#aaa': '#878787')+';'
				+	'position: absolute;'
				+	'margin-top: 13px;'
				+'}'
				+'.quick_post textarea:invalid {'
				+	'box-shadow: none;'
				+	'height: 30px;'
				+'}'
				+'.quick_post > textarea:invalid ~ * {'
				+	'opacity: 0;'
				+'}'
				+'.quick_post > * {'
				+	'transition: opacity ease 0.5s;'
				+'}'
				+'.quick_post {'
				+	'background: url("'+((forum_skin==0)?"/www/forum_carbon/-img/post_bg.851b4700.gif": "/www/forum_alu/-img/post_bg.b7d2258c.gif")+'") repeat-x scroll 0 -161px transparent;'
				+	'border-radius: 5px 5px 5px 5px;'
				+	'margin: 0 auto;'
				+	'min-height: 90px;'
				+	'overflow: hidden;'
				+	'padding: 2px 12px;'
				+	'width: 926px;'
				+'}'
				+'.quick_post h1 {'
				+	'color: ' + ((forum_skin==0)?'#aaa': '#878787')+';'
				+	'font-family: "Lucida Grande",Arial,Verdana,sans-serif;'
				+	'font-size: 10px;'
				+	'font-weight: normal;'
				+	'margin: 10px 0 0 58px;'
				+	'clear: both;'
				+'}'
				+'.quick_post textarea:focus, .quick_post textarea:hover {'
				+	'border: 1px solid '+((forum_skin==0)?'#DBDBDB': '#4C4C4C')+';'
				+'}'
				+'.quick_post textarea:focus {'
				+	'height: 150px;'
				+'}'
				+'.quick_post textarea {'
				+	'background: none repeat scroll 0 0 '+((forum_skin==0)?'#676767': '#D1D1D1')+';'
				+	'border: 1px solid '+((forum_skin==0)?'#929292': '#929292')+';'
				+	'color: ' + ((forum_skin==0)?'#DBDBDB':'#4C4C4C')+';'
				+	'height: 150px;'
				+	'transition: height 0.5s ease 0s;'
				+	'margin: 0 0 5px 168px;'
				+	'padding: 2px;'
				+	'width: 751px;'
				+	'font-family: Arial;'
				+	'font-size: 12px;'
				+'}'
				+'button.BE-button::-moz-focus-inner,'
				+'button.submit-quick-post::-moz-focus-inner {'
				+	'border: none;'
				+'}'
				+'button.BE-button:focus,'
				+'button.submit-quick-post:focus {'
				+	'color: #ffffff;'
				+'}'
				+'button.BE-button:hover,'
				+'button.submit-quick-post:hover {'
				+	'background: linear-gradient(#303030, #393939) repeat scroll 0 0 transparent;'
				+	'background: ' + ((forum_skin==0)?"-webkit-linear-gradient(#303030, #393939)": "-webkit-linear-gradient(#959595, #646464)")+' repeat scroll 0 0 transparent;'
				+	'background: ' + ((forum_skin==0)?"linear-gradient(#303030, #393939)": "linear-gradient(#959595, #646464)")+' repeat scroll 0 0 transparent;'
				+'}'
				+'button.BE-button:active,'
				+'button.submit-quick-post:active {'
				+	'background: ' + ((forum_skin==0)?"#4c4c4c": "")+';'
				+'}'
				+'button.BE-button:disabled,'
				+'button.submit-quick-post:disabled {'
				+	'background: linear-gradient(#757575, #828282) repeat scroll 0 0 transparent;'
				+	'box-shadow: none;'
				+	'color: #525252;'
				+'}'
				+'button.BE-button,'
				+'button.submit-quick-post {'
				+	'background: ' + ((forum_skin==0)?"-webkit-linear-gradient(#393939, #434343)": "-webkit-linear-gradient(#646464, #959595)")+' repeat scroll 0 0 transparent;'
				+	'background: ' + ((forum_skin==0)?"linear-gradient(#393939, #434343)": "linear-gradient(#646464, #959595)")+"	 repeat scroll 0 0 transparent;"
				+	'border: medium none;'
				+	'border-radius: 12px 12px 12px 12px;'
				+	'color: ' + ((forum_skin==0)?"#BEBEBE": "#F0F0F0")+';'
				+	'font-family: arial, sans-serif;'
				+	'font-size: 11px;'
				+	'font-weight: normal;'
				+	'line-height: 25px;'
				+	'cursor: pointer;'
				+	'margin: 10px 0;'
				+	'display: block;'
				+	'padding: 0 15px;'
				+	'vertical-align: middle;'
				+	'transition: color 0.3s ease;'
				+'}'
				+'.quick_post div.submit {'
				+	'float: right;'
				+	'clear: none;'
				+	'overflow: visible;'
				+	'padding: 11px 3px 0 0;'
				+'}'
				+'.big_post_h:hover .BE-quick-reply {'
				+	'display: inline-block;'
				+'}'
				+'.BE-quick-reply:hover {'
				+	'color: ' + ((forum_skin==0)?"#E0E0E0": "#606060")+';'
				+'}'
				+'.BE-quick-reply {'
				+	'background: ' + ((forum_skin==0)?"-webkit-linear-gradient(#656566, rgba(101, 101, 102, 0))": "-webkit-linear-gradient(#E5E5E5, rgba(229, 229, 229, 0))")+';'
				+	'background: ' + ((forum_skin==0)?"linear-gradient(#656566, rgba(101, 101, 102, 0))": "linear-gradient(#E5E5E5, rgba(229, 229, 229, 0))")+';'
				+	'border-radius: 3px 3px 3px 3px;'
				+	'color: ' + ((forum_skin==0)?"#B8B8B8": "#606060")+';'
				+	'display: none;'
				+	'height: 23px;'
				+	'margin: 8px 0 0;'
				+	'padding: 4px 3px 0;'
				+	'text-align: center;'
				+	'text-shadow: ' + ((forum_skin==0)?"0px 1px 1px #333333": "none")+';'
				+	'width: 60px;'
				+	'cursor: pointer;'
				+'}'
			)

			$('.p_button_right_h').each(function() {
				$('<div class="BE-quick-reply">')
				.text('quick reply')
				.appendTo(this)
				.click(function() {
				
					window.scrollTo(0, $('.quick_post').position().top - Math.round(window.innerHeight*0.4))
					
					var textarea = $('.quick_post textarea').focus()
					
					var quoted = $(this).closest('.big_post_h')
					var quote_nr = quoted.find('.post_nr').text()
					
					var val = textarea.val()
					textarea.val(
						((val.length==0)?"":(val+"	\n\n"))
						+ '[quote_'+quote_nr+']'
						+ parse_post(quoted)
						+'[/quote]\n'
					)
					
					show_preview()
				})
			})

		} else {
			$('.BE-quick-reply').remove()

			style.text(
				'.quick_post {'
				+	'display: none;'
				+'}'
			)
		}
	}

	var last_post = $('.spot_h:last')
	if (last_post.length > 0) {
		var new_post = $('<textarea required>')
		var preview = $('<p class="BE-preview">')
		var post_button = $('<button class="submit-quick-post">').text('submit quick post')

		$('<div class="quick_post">')
		.append(
			$('<h1>').text('Quick Post'),

			'<div class="BE-hints"><p>Shortcut: <key>Ctrl</key> <key>Space</key></p></div>',
			'<div class="BE-hints BE-focus">'
			+'<p><key>Ctrl</key> <key>I</key>: Italic</p>'
			+'<p><key>Ctrl</key> <key>B</key>: Bold</p>'
			+'<p><key>Ctrl</key> <key>U</key>: Underline</p>'
			+'<p><key>Ctrl</key> <key>Y</key>: Hyperlink</p>'
			+'<p><key>Ctrl</key> <key>L</key>: Spoiler</p>'
			+'<p><key>Ctrl</key> <key>Enter</key>: Submit</p>'
			+'</div>',

			new_post,
			
			$('<div class="submit">')
			.append(
				post_button
			),
			
			$('<h1>').text('Preview'),
			preview
		)
		.insertAfter(last_post)

		// hints respond to focus
		new_post
		.focus( function() { $(this).closest('.quick_post').addClass('BE-focus') } )
		.blur( function() { $(this).closest('.quick_post').removeClass('BE-focus') } )

		// handle shortcut keys in quick post
		new_post.keydown(post_keydown_handler)
		
		// refresh the preview on quic post input
		new_post[0].addEventListener('input', show_preview)
		
		post_button.click(submit_quick_post)
	}

	$(document).keydown(function(event) {
		if (event.ctrlKey && !event.altKey && !event.repeat && event.which == 32) {
			window.scrollTo(0, $('.quick_post').position().top - Math.round(window.innerHeight*0.4))
			$('.quick_post textarea').focus()
			return false
		}
	})

	var style = $('<style>').appendTo(document.head)

	settings.onchange('forum-quick-post', on_update)
}

function feature_post_preview() {
	function on_update(value) {
		if (value) {
			style.text(
				'.text_1, .text_1_bad {'
				+	'height: 180px;'
				+'}'
				+'div.files {'
				+	'z-index: 1;'
				+'}'
				+'div.submit {'
				+	'float: right;'
				+	'clear: none;'
				+	'overflow: visible;'
				+	'padding: 11px 3px 0 0;'
				+'}'
				+'html {'
				+	'height: 100%;'
				+	'overflow: auto;'
				+'}'
				+'div.files {'
				+	'float: left;'
				+	'width: 460px;'
				+	'overflow: hidden;'
				+	'height: auto;'
				+'}'
				+'.zawartosc {'
				+	'height: 100%;'
				+'}'
				+'.zawartosc .kontent {'
				+	'height: initial;'
				+'}'
			)

			var message = document.getElementById('text')
			var preview = $('<p class="BE-preview">').insertAfter($('.kontent>.submit'))
		
			var refresh_preview = function() {
				var text = post_preview_html(message.value)
			
				preview.html(text)
			}

			// capture the offset of the preview and make it absolute
			preview.css({
				'position': 'absolute',
				'bottom': '0px',
				'height': 'auto',
				'top': preview.offset().top + 'px'
			})
		
			$(message).keydown(post_keydown_handler)
			message.addEventListener('input', refresh_preview)
		
			$('.btn_h>.btn').click(refresh_preview)

			refresh_preview()
		} else {
			$('.BE-preview').remove()
			style.text('')
		}
	}

	var style = $('<style>').appendTo(document.head)
	
	settings.onchange('forum-post-preview', on_update)
}

function add_preview_styles() {
	var style = $('<style>')
	.text(
		'.BE-preview a {'
		+	'background: url("'+((forum_skin==0)?"/www/forum_carbon/-img/post_un.a8689b98.gif":"http://static.gog.com/www/forum_alu/-img/zig_underl.8b625731.gif")+'") repeat-x scroll center bottom transparent;'
		+	'color: ' + ((forum_skin==0)?'#DBDBDB':'#4C4C4C')+';'
		+'}'
		+'.quick_post .BE-preview {'
		+	'margin: 0 0 0 168px;'
		+	'padding: 3px;'
		+	'width: 751px;'
		+	'height: auto;'
		+	'overflow: hidden;'
		+'}'
		+'.BE-preview {'
		+	'height: 150px;'
		+	'overflow: auto;'
		+	'margin: 0 0 0 143px;'
		+	'padding: 5px;'
		+	'clear: both;'
		+	'width: 650px;'
		+	'word-wrap: break-word;'
		+	'color: ' + ((forum_skin==0)?'#DBDBDB':'#4C4C4C')+';'
		+	'transition: height 0.5s ease 0s;'
		+	'font-family: Arial;'
		+	'font-size: 12px;'
		+'}'
		+'.BE-preview .syntax-warning {'
		+	'background: #6F3E3E;'
		+	'border-radius: 5px 5px 5px 5px;'
		+	'color: #DBDBDB;'
		+	'display: inline-block;'
		+	'font-size: 11px;'
		+	'font-weight: normal;'
		+	'font-style: normal;'
		+	'font-family: monospace, sans-serif;'
		+	'margin: 0 5px;'
		+	'padding: 0 2px;'
		+'}'
		+'.BE-preview blockquote {'
		+	'border-left: 1px solid #929292;'
		+	'padding: 0 0 0 8px;'
		+	'margin: 0;'
		+'}'
	)
	.appendTo(document.head)
}

function feature_click_own_title() {
	function on_update(value) {
		if (value) {
			$('.edit_h_EN').each(function() {
				var post = $(this).closest('.big_post_main')
				if (post) {
				var stat = post.find('.b_u_stat')
				if (stat) {
					var stat_text = stat.text()
					stat.empty().append($('<a href="/forum/mysettings" title="Click here to change your forum title">').text(stat_text))
				}
				}
			})
		} else {
			$('.b_u_stat>a').each(function() {
				var parent = $(this).parent()
				$(this).remove()
				parent.text($(this).text())
			})
		}
	}

	$('<style>').text('.b_u_stat>a { color: inherit; }').appendTo(document.head)

	settings.onchange('forum-title-settings', on_update)
}

function feature_forum_move_edit_note() {
	function on_update(value) {
		if (value) {
			style.text(
				'.big_post_main:hover .BE-edit-note .pencil_text {'
				+	'visibility: visible;'
				+'}'
				+'.BE-edit-note .pencil_text {'
				+	'visibility: hidden;'
				+'}'
				+'.BE-edit-note {'
				+	'padding-top: 4px;'
				+	'left: 180px;'
				+	'position: absolute;'
				+'}'
			)
			$('.post_attaczments .pencil_text').each(
				function() {
					var element = $(this).parent()

					var edit_note = $('<div class="BE-edit-note">')

					element.closest('.big_post_main').find('.post_header_h .p_button_left_h')
					.after(edit_note)

					element.remove()
					element.appendTo(edit_note)
				}
			)
		} else {
			style.text('')
			$('.BE-edit-note .post_attaczments').each(
				function() {
					var element = $(this)
					var parent = element.parent()
					element.remove()

					parent.closest('.big_post_main').find('.post_text')
					.after(element)

					parent.remove()
				}
			)
		}
	}

	var style = $('<style>').appendTo(document.head)

	settings.onchange('forum-move-edit-note', on_update)
}

function feature_forum_quotation_style() {
	function on_update(value) {
		switch (value) {
			case 'distinct':
				style.text(
					'.post_text_c div.quot {'
					+	'font-style: normal;'
					+'}'
					+'.post_text_c div.quot:not(.gog_color),'
					+'.post_text_c div.quot:not(.gog_color) a,'
					+'.post_text_c div.quot:not(.gog_color) span.bold,'
					+'.BE-preview blockquote,'
					+'.BE-preview blockquote a {'
					+	'color: ' + ((forum_skin==0)?'#A8A8A8':'#686868')+';'
					+'}'
				)
				break;
			case 'clear':
				style.text(
					'.post_text_c div.quot div.quot {'
					+	'background: transparent;'
					+'}'
					+'.post_text_c div.quot {'
					+	'font-style: normal;'
					+	'padding: 2px 5px 2px 7px;'
					+	'background: ' + ((forum_skin==0)?'rgba(0, 0, 0, 0.1)':'rgba(255, 255, 255, 0.2)')+';'
					+'}'
					+'.post_text_c div.quot:not(.gog_color),'
					+'.post_text_c div.quot:not(.gog_color) a,'
					+'.post_text_c div.quot:not(.gog_color) span.bold,'
					+'.BE-preview blockquote,'
					+'.BE-preview blockquote a {'
					+	'font-size: 12px;'
					+'}'
				)
				break;
			default:
				style.text('')
		}
	}

	var style = $('<style>').appendTo(document.head)

	settings.onchange('forum-quotation-style', on_update)
}

function gogwiki_sync_countdown(job) {
	job.countdown -= 1
	if (job.countdown == 0) {
		if (job.errors) {
			sync_status_output
			.html("<p>It seems that there were problems collecting information from your account. Try again later - it might just be temporary issue. If you keep having this problem then <a href=\"https://www.gog.com/forum/general/barefoot_essentials_2_gogcom_enhancement\" target=\"blank\">let me know</a>.</p>")
			.show()
		
			sync_status_send.text('Stopped').attr('class', 'BE-error')
			sync_status_restart.show()//.appendTo(gog_sync_element)
		} else {
			send_to_gogwiki(job)
		}
	} else if (job.countdown < 0) {
		sync_status_restart.show()//.appendTo(gog_sync_element)
		sync_status_output.show()
	}
}

function feature_wiki_sync() {

	function collect_data() {
		if (!global_user_info || !global_user_info.id) {
			sync_status_output.html(
				global_user_info.id
				? "<p>User account information isn't finished loading yet. Please wait a few seconds and try again.</p>"
				: "<p>You need to be logged in to sync your account with GOGWiki.</p>"
			)

			sync_status_output.show()
			sync_status_restart.show()
			sync_status_start.remove()
			sync_status_progress.hide()
			return
		}
		var data = {
			wishlist: [],
			games: {},
			movies: {},
			errors: false,
			countdown: 5,
			timestamp: (new Date()).getTime(),
		// 	count_down: function() {
		// 		this.countdown -= 1
		// 		if (this.countdown == 0) {
		// 			if (this.errors) {
		// 				sync_status_output
		// 				.html("<p>It seems that there were problems collecting information from your account. Try again later - it might just be temporary issue. If you keep having this problem then <a href=\"https://www.gog.com/forum/general/barefoot_essentials_2_gogcom_enhancement\" target=\"blank\">let me know</a>.</p>")
		// 				.show()
					
		// 				sync_status_send.text('Stopped').attr('class', 'BE-error')
		// 				sync_status_restart.show()//.appendTo(gog_sync_element)
		// 			} else {
		// 				send_to_gogwiki(this)
		// 			}
		// 		} else if (this.countdown < 0) {
		// 			sync_status_restart.show()//.appendTo(gog_sync_element)
		// 			sync_status_output.show()
		// 		}
		// 	}
		}

		get_account_information(data)
		get_account_join_date(data)
		collect_wishlist(data)
		collect_games(data)
		collect_movies(data)
		sync_status_send.text('Waiting...').attr('class', 'BE-in-progress')

		sync_status_start.remove()
		sync_status_restart.hide()
		sync_status_output.hide()
		sync_status_progress.show()
	}

	gog_sync_element = $('<div>')

	sync_status_start = $('<p><a>Click here to share your library and wishlist on GOGWiki</a></p>')
	.click(collect_data)
	.appendTo(gog_sync_element)

	sync_status_progress = $('<div class="BE-sync-progress">')
	.hide()
	.appendTo(gog_sync_element)
	.append(
		'<h2>Sync progress</h2>',
		$('<p><span>Loading your GOG account:</span>').append(sync_status_account = $('<span>')),
		$('<p><span>Loading more account information:</span>').append(sync_status_join = $('<span>')),
		$('<p><span>Reading your game collection:</span>').append(sync_status_games = $('<span>')),
		$('<p><span>Reading your movie collection:</span>').append(sync_status_movies = $('<span>')),
		$('<p><span>Reading your wishlist:</span>').append(sync_status_wishlist = $('<span>')),
		$('<p><span>Sending to GOGWiki:</span>').append(sync_status_send = $('<span>'))
	)

	sync_status_output = $('<div>')
	.hide()
	.appendTo(gog_sync_element)

	sync_status_restart = $('<p><a>Click here to try to send to GOGWiki again</a></p>')
	.click(collect_data)
	.hide()
	.appendTo(gog_sync_element)
}


function feature_enhance_bold_text() {
	function on_update(value) {
		if (value) style.text(
			'.post_text span.bold, .BE-preview b {'
			+	'font-weight: 800;'
			+'}'
		)
		else style.text('')
	}
	var style = $('<style>').appendTo(document.head)
	
	settings.onchange('forum-bold-text', on_update)
}

function feature_hide_spoilers() {
	if (!settings.get('forum-hide-spoilers')) return

	var style = $('<style>').appendTo(document.head)
	style.text(
		'.BE-spoiler {'
		+	'height: 0;'
		+	'display: none;'
		+'}'
		+'.BE-spoiler.BE-visible {'
		+	'height: auto;'
		+	'display: block;'
		+	'border: 1px solid '+((forum_skin==0)?"#676767": "#9a9a9a")+';'
		+	'padding: 1em;'
		+	'margin: 1em;'
		+	'background: ' + ((forum_skin==0)?"#585858": "#D7D7D7")+';'
		+	'border-radius: 0.5em;'
		+'}'
		+'.BE-spoiler .BE-spoiler .BE-spoiler.BE-visible {'
		+	'padding: 1em 5px;'
		+	'margin: 1em 1px;'
		+'}'
	)


	function traverse_to_hide_spoilers(parent) {
		function toggle_spoiler() {
			var visible = !$(this).data('visible')
			$(this).data('visible', visible)
			if (visible) {
				$(this).text("hide spoiler")
				.next("div.BE-spoiler").addClass('BE-visible')
			} else {
				$(this).text("show spoiler")
				.next("div.BE-spoiler").removeClass('BE-visible')
			}
		}
		var openings = []
		for (var n = parent.firstChild; n !== null; n = n.nextSibling) {
			if (n.nodeType == 3) {
				
				if (/^\s*\[spoiler\]\s*$/.test(n.nodeValue)) {
					openings.push(n)
				} else if (/^\s*\[\/spoiler\]\s*$/.test(n.nodeValue)) {
					var opening = openings.pop()
					if (opening === null) continue
					
					var spoiler_button = $('<button class="BE-button">')
					.text("show spoiler")
					.click(toggle_spoiler)
					.insertBefore(opening)
					var spoiler_content = $('<div class="BE-spoiler">')
					.insertAfter(spoiler_button)
					
					var next = opening.nextSibling
					for (nn = opening; nn !== null; nn = next) {
						next = nn.nextSibling
						parent.removeChild(nn)
						if (nn !== opening && nn !== n) spoiler_content.append(nn)
						if (nn === n) break
					}
					
					n = spoiler_content.get(0)
				}
			} else if (n.nodeType == 1) {
				traverse_to_hide_spoilers(n)
			}
		}
	}

	$('.post_text_c').each(function() {
		if (0 <= this.textContent.indexOf('[spoiler]')) {
			traverse_to_hide_spoilers(this)
		}
	})
	
	// remove all extra linebreaks around spoilers
	$('.BE-button').each(function() {
		for (var prev = this.previousSibling; prev; prev = this.previousSibling) {
		
			if (prev.nodeType == 1) {
				if (prev.nodeName != 'BR') break
			} else if (prev.nodeType == 3) {
				if (!/^[\s]*$/.test(prev.nodeValue)) break
			} else break
			this.parentElement.removeChild(prev)
		}
	})
	$('.BE-spoiler').each(function() {
	
		// strip after the spoiler
		for (var next = this.nextSibling; next; next = this.nextSibling) {
		
			if (next.nodeType == 1) {
				if (next.nodeName != 'BR') break
			} else if (next.nodeType == 3) {
				if (!/^[\s]*$/.test(next.nodeValue)) break
			} else break
			this.parentElement.removeChild(next)
		}
		
		// strip the front
		for (var next = this.firstChild; next; next = this.firstChild) {
			if (next.nodeType == 1) {
				if (next.nodeName != 'BR') break
			} else if (next.nodeType == 3) {
				if (!/^[\s]*$/.test(next.nodeValue)) break
			} else break
			this.removeChild(next)
		}
		// strip the tail
		for (var next = this.lastChild; next; next = this.lastChild) {
			if (next.nodeType == 1) {
				if (next.nodeName != 'BR') break
			} else if (next.nodeType == 3) {
				if (!/^[\s]*$/.test(next.nodeValue)) break
			} else break
			this.removeChild(next)
		}
	})
}


function feature_add_essentials_link() {
	separator = $('.js-menu-about .menu-submenu-separator.menu-submenu-extension-settings')
	if (separator.length == 0) {
		separator = $('<div class="menu-submenu-separator menu-submenu-extension-settings"></div>')
		separator.insertAfter($('.js-menu-about .menu-submenu-separator').last())
	}

	$('<a class="menu-submenu-link">').text('Barefoot Essentials')
	.appendTo(
		$('<div class="menu-submenu-item menu-submenu-item--hover">')
		.insertBefore(separator)
	)
	.click(popup.show.bind(popup, 'Changelog'))
}

function feature_library_always_show_count() {
	if (settings.get('library-always-show-count')) {
		try {
			var observer = new MutationObserver(function(mutations) {
	
				mutations.forEach(function(mutation) {
				
					var target = mutation.target
				
					if (mutation.attributeName == 'class') switch (target.className) {
						case 'middle_btns': {
							if (!(target.childElementCount > 0)) {
						
								// count games
								var num_games = document.querySelectorAll('#shelfGamesList .shelf_game:not(.empty), #hiddenGamesList .shelf_game:not(.empty)').length
		
								// display game count
								document.querySelector('#tagButtons').innerHTML = '<span class="shelf_btn css3pie new tag-btn">NEW &amp; UPDATED <span class="count">0</span></span><span class="shelf_btn css3pie all active tag-btn">ALL <span class="count">'+num_games+'</span></span>'
							}
						} break;
						case 'list_header': {
							if (!(target.childElementCount > 0)) {
						
								// count games
								var num_games = document.querySelectorAll('#gamesList .game-item, #hiddenGamesList .game-item').length
						
								// display game count
								document.querySelector('#tagButtons').innerHTML = 'My collection <span class="list_btn css3pie new tag-btn">NEW &amp; UPDATED <span class="count">0</span></span><span class="list_btn css3pie all active tag-btn">ALL <span class="count">'+num_games+'</span></span>'
							}
						} break;
					}
				})
		
			})
			observer.observe(document.querySelector('#tagButtons'), {attributes: true})
		} catch (exception) {
			// no action necessary
		}
	}
}

function feature_navbar_position() {
	function on_update(value) {
		switch (value) {
			case 'absolute':
				style.text(
					'nav.menu {'
					+	'position: absolute;'
					+'}'
				)
				break;
			default:
				style.text('')
		}
	}
	var style = $('<style>').appendTo(document.head)
	
	settings.onchange('navbar-position', on_update)
}

function feature_catalogue_hide_owned() {
	function on_update(value) {
		if (value) {
			style.text(
				'.product-row.is-owned {'
				+	'display: none;'
				+'}'
			)
		} else {
			style.text('')
		}
	}
	var style = $('<style>').appendTo(document.head)

	settings.onchange('catalogue-hide-owned', on_update)
}

function feature_catalogue_add_hide_owned_toggle() {
	function on_update(value) {
		toggle.toggle(value)
	}
	function on_show_or_hide(value) {
		state.text(value ? 'HIDDEN' : 'SHOWN')
	}
	var toggle = $('<div class="header__switch">')
	.text('OWNED: ')

	var state = $('<span class="header__dropdown module-header-dd _dropdown is-contracted">')
	.text('SHOW')
	.click(function() {
		settings.set('catalogue-hide-owned', !settings.get('catalogue-hide-owned'))
	})
	.appendTo(toggle)

	toggle.appendTo($('.header__switches'))

	settings.onchange('catalogue-show-hide-owned-toggle', on_update)
	settings.onchange('catalogue-hide-owned', on_show_or_hide)
}

function feature_forum_show_hover_elements() {
	function on_update(value) {
		if (value) {
			style.text(
				'div.on_off_stat {'
				+	'visibility: visible;'
				+'}'
				+'div.p_button_left_h {'
				+	'display: block;'
				+'}'
				+'.BE-edit-note .pencil_text {'
				+	'visibility: visible;'
				+'}'
			)
		} else {
			style.text('')
		}
	}
	var style = $('<style>').appendTo(document.head)

	settings.onchange('forum-show-hover-elements', on_update)
}

function feature_forum_move_online_offline_status() {
	function on_update(value) {
		if (value) {
			style.text(
				'div.on_off_stat {'
				+	'position: relative;'
				+'}'
				+'div.b_u_on, div.b_u_off {'
				+	'position: absolute;'
				+	'top: -24px;'
				+	'left: 64px;'
				+'}'
			)
		} else {
			style.text('')
		}
	}
	var style = $('<style>').appendTo(document.head)

	settings.onchange('forum-move-online-offline-status', on_update)
}

function feature_topic_collapsible_footer() {
	function on_update(value) {
		if (value) {
			style.text(
				'.main-footer__dark-footer {'
				+	'position: absolute;'
				+	'left: 0;'
				+	'right: 0;'
				+	'bottom: 16px;'
				+'}'
				+'.main-footer {'
				+	'min-height: 0;'
				+	'height: 98px;'
				+	'transition: height 0.5s linear, margin-top 0.5s linear;'
				+	'position: absolute;'
				+	'left: 0;'
				+	'right: 0;'
				+'}'
				+'.main-footer:hover {'
				+	'height: 410px;'
				+	'margin-top: -312px;'
				+'}'
				+'body {'
				+	'height: 100%;'
				+	'height: calc(100% - 103px);'
				+'}'
				+'html {'
				+	'height: auto;'
				+	'min-height: 100%;'
				+'}'
				+'div.sta_container {'
				+	'overflow: hidden;'
				+'}'
			)
		} else {
			style.text('')
		}
	}
	var style = $('<style>').appendTo(document.head)

	settings.onchange('forum-collapsible-footer', on_update)
}

function feature_forum_collapsible_footer() {
	function on_update(value) {
		if (value) {
			style.text(
				'.main-footer__dark-footer {'
				+	'position: absolute;'
				+	'left: 0;'
				+	'right: 0;'
				+	'bottom: 16px;'
				+'}'
				+'.main-footer {'
				+	'min-height: 0;'
				+	'height: 98px;'
				+	'transition: height 0.5s linear, margin-top 0.5s linear;'
				+	'position: absolute;'
				+	'left: 0;'
				+	'right: 0;'
				+'}'
				+'.main-footer:hover {'
				+	'height: 410px;'
				+	'margin-top: -312px;'
				+'}'
				+'.footer-spacer {'
				+	'height: 102px;'
				+'}'
				+'.content {'
				+	'margin-bottom: -97px;'
				+'}'
			)
		} else {
			style.text('')
		}
	}
	var style = $('<style>').appendTo(document.head)

	settings.onchange('forum-collapsible-footer', on_update)
}

function feature_reduce_footer_spacer() {
	function on_update(value) {
		if (value) {
			style.text(
				// "@media (min-width: 66.25em) {"
				""
				+'.footer-spacer {'
				+	'height: 150px;'
				+'}'
				// +'}'
			)
		} else {
			style.text('')
		}
	}
	var style = $('<style>').appendTo(document.head)

	settings.onchange('bugfix-footer-spacer', on_update)
}

function feature_forum_hide_fragment() {
	function on_update(value) {
		if (value) {
			history.replaceState(null, document.title, location.pathname)
		} else {
			history.replaceState(null, document.title, location.pathname + feature_forum_hide_fragment.fragment)
		}
	}

	feature_forum_hide_fragment.fragment = location.hash
	setTimeout(settings.onchange.bind(settings, 'forum-remove-fragment', on_update), 1)
	
}

function feature_paging_shortcut_keys() {

	feature_paging_shortcut_keys.callback = 
	document.querySelector('.pagin.list__pagination') ? (function(event) {
		if (event.ctrlKey && !event.altKey && !event.shiftKey) {
			var active = document.activeElement
			if (active.tagName == 'TEXTAREA' || (active.tagName == 'INPUT' && active.getAttribute('type') != 'submit')) {
				return
			}

			switch (event.key) {
				case 'ArrowLeft': {
					var element = document.querySelector('.pagin.list__pagination>.pagin__prev')
					if (element) element.click()
					break;
				}
				case 'ArrowRight': {
					var element = document.querySelector('.pagin.list__pagination>.pagin__next')
					if (element) {
						element.click()
					}
					break;
				}
			}
		}
	})
	: document.querySelector('.n_b_b_nr_h') ? (function(event) {
		if (event.ctrlKey && !event.altKey && !event.shiftKey) {
			var active = document.activeElement
			if (active.tagName == 'TEXTAREA' || (active.tagName == 'INPUT' && active.getAttribute('type') != 'submit')) {
				return
			}

			switch (event.key) {
				case 'ArrowLeft': {
					var element = document.querySelector('.n_b_b_nr_active')
					if (element) {
						var previous = document.querySelector('.n_b_b_nr_active').parentElement.previousElementSibling
						if (previous) {
							var a = previous.querySelector('a.n_b_b_nr')
							if (a) a.click()
						}
					}
					break;
				}
				case 'ArrowRight': {
					var element = document.querySelector('.n_b_b_nr_active')
					if (element) {
						var next = document.querySelector('.n_b_b_nr_active').parentElement.nextElementSibling
						if (next) {
							var a = next.querySelector('a.n_b_b_nr')
							if (a) a.click()
						}
					}
					break;
				}
			}
		}
	})
	: null

	function on_update(value) {
		if (feature_paging_shortcut_keys.callback) {
			if (value) {
				document.addEventListener('keypress', feature_paging_shortcut_keys.callback)
			} else {
				document.removeEventListener('keypress', feature_paging_shortcut_keys.callback)
			}
		}
	}

	settings.onchange('paging-shortcut-keys', on_update)
}


function feature_navbar_force_http() {
	function on_update(value) {
		if (value) {
			$('.top-nav__items').find('[href^="https://www.gog.com/games"], [href^="https://www.gog.com/movies"], [href^="https://www.gog.com/forum"], [href^="https://www.gog.com/support"]')
			.each(function() {
				this.href = this.href.replace(/^https/, 'http')
			})

			feature_navbar_force_http.prev_value = true
		} else {

			if (feature_navbar_force_http.prev_value) {
				$('.top-nav__items').find('[href^="http://www.gog.com/games"], [href^="http://www.gog.com/movies"], [href^="http://www.gog.com/forum"], [href^="http://www.gog.com/support"]')
				.each(function() {
					this.href = this.href.replace(/^http/, 'https')
				})
			}

			feature_navbar_force_http.prev_value = false
		}
	}

	feature_navbar_force_http.prev_value = false
	setTimeout(settings.onchange.bind(settings, 'nav-force-http', on_update), 1)
}


function fetch_user_id(then) {
	inject_request({
		method: "GET",
		url: '/userData.json',
		onload: function(response) {
			var user_info = JSON.parse(response.responseText)
			global_user_info = {
				id: user_info.userId,
				galaxy_id: user_info.galaxyUserId,
				avatar: user_info.avatar,
				username: user_info.username,
				updates: user_info.updates,
				timestamp: Date.now()
			}
			if (then) setTimeout(then, 1)
		},
		onerror: function(response) {
			console.log("Barefoot Essentials: could not load user data")
		}
	})

}

function feature_promo_show_discount() {
	function on_update(value) {
		if (value) {
			style.appendTo(document.head)
		} else {
			style.remove()
		}
	}

	var style = $('<style>').text(
		".product-row-price--old {"
		+"		position: relative;"
		+"}"
		+".product-row-price--old[data-discount]::before {"
		+"	display: inline-block;"
		+"	content: attr(data-discount);"
		+"	color: #f2f2f2;"
		+"	background: #788795;"
		+"	position: absolute;"
		+"	right: 0;"
		+"	bottom: -1.4em;"
		+"	bottom: calc(-5px - 1em);"
		+"	line-height: 1em;"
		+"	padding: 3px 7px 3px;"
		+"	vertical-align: middle;"
		+"	border-radius: 2px;"
		+"}"
		+".product-row-price--old[data-discount][data-discount-size=huge]::before {"
		+"	background: "+ style_discount_colour_huge  +";"
		+"}"
		+".product-row-price--old[data-discount][data-discount-size=large]::before {"
		+"	background: "+ style_discount_colour_large  + ";"
		+"}"
		+".product-row-price--old[data-discount][data-discount-size=medium]::before {"
		+"	background: "+ style_discount_colour_medium  + ";"
		+"}"
		+".product-row-price--old[data-discount][data-discount-size=small]::before {"
		+"	background: "+ style_discount_colour_small  + ";"
		+"}"
	)

	var price_map = new WeakMap()
	function update_price(old_price, new_price) {
		if (old_price && new_price) {
			var discount = Math.round(new_price.textContent / old_price.textContent * 100 - 100)
			if (isNaN(discount)) {
				old_price.removeAttribute('data-discount')
				old_price.removeAttribute('data-discount-size')
			}
			else {
				old_price.setAttribute('data-discount', discount + '%')
				if (-discount >= 80) old_price.setAttribute('data-discount-size', 'huge')
				else if (-discount >= 60) old_price.setAttribute('data-discount-size', 'large')
				else if (-discount >= 30) old_price.setAttribute('data-discount-size', 'medium')
				else old_price.setAttribute('data-discount-size', 'small')
			}
		}
	}

	function mutation_callback(mutations) {
		mutations.forEach(function(mutation) {

			var target = mutation.target
			var old_price = price_map.get(mutation.target)
			update_price(old_price, mutation.target)
		})
	}

	setTimeout(function() {
		$('.product-row__price').each(function() {
			var old_price = this.querySelector('.product-row-price--old')
			var new_price = this.querySelector('.product-row-price--new>._price')
			if (old_price && new_price) {
				price_map.set(new_price, old_price)
				
				var observer = new MutationObserver(mutation_callback.bind(old_price))
				observer.observe(new_price, {childList: true})
				update_price(old_price, new_price)
			}
		})

		settings.onchange('promo-show-discount', on_update)
	}, 500)

}

function feature_frontpage_hide_sale_owned() {
	function on_update(value) {
		if (value) {
			style.appendTo(document.head);
		} else {
			style.remove();
		}

		feature_promo_show_discount.prev_value = value
	}

	$('<style>').text(".promo-item.is-owned, .mosaic__product.is-owned, .highlights__product.is-owned {"
		+"	  transition: 0.5s opacity;"
		+"}"
	).appendTo(document.head);

	var style = $('<style>').text(".promo-item.is-owned, .mosaic__product.is-owned, .highlights__product.is-owned {"
		+"	  opacity: 0.075;"
		+"}"
		+"	.promo-item.is-owned:hover, .mosaic__product.is-owned:hover, .highlights__product.is-owned:hover {"
		+"	  opacity: 1;"
		+"}"
	)

	setTimeout(settings.onchange.bind(settings, 'frontpage-hide-sale-owned', on_update), 1)
}

function feature_forum_detect_necro() {
	function on_update(value) {
		if (value) {
			$(document.body).addClass("BEfeature-forum-detect-necro")
		} else {
			$(document.body).removeClass("BEfeature-forum-detect-necro")
		}

		feature_promo_show_discount.prev_value = value
	}

	$('<style>').text('body.BEfeature-forum-detect-necro .BE-necro::before {'
	+'content: attr(data-be-necro);'
	+'display: block;'
	+'margin: 1em 4em;'
	+'text-align: center;'
	+'background: #ffcf00;'
	+'color: #000;'
	+'padding: 0.5em 2em;'
	+'line-height: 1;'
	+'border-radius: 1em;'
	+'font-weight: bold;'
	+'z-index: 1;'
	+'}'
	).appendTo(document.head);

	var necro_time = 1000*60*60*24*30

	var now = (new Date()).getTime()
	var relative_date_regex = /^([0-9]+) (hour|minute|day)s? ago$/
	var prev_timestamp = null
	var elements = document.querySelectorAll('.post_date')
	for (var i = 0; i < elements.length; i += 1) {
		var e = elements[i]
		var text = e.textContent.replace('Posted ', '').trim()
		var timestamp = null
		if (text == 'now') timestamp = now
		else if (text == 'Yesterday') timestamp = now - 1000*60*60*24
		else if (text.endsWith(' ago')) {
			var regex_result = relative_date_regex.exec(text)
			if (regex_result.length > 2) {
				var difference = null
				switch (regex_result[2]) {
					case "minute": difference = regex_result[1]*1000*60; break
					case "hour": difference = regex_result[1]*1000*60*60; break
					case "day": difference = regex_result[1]*1000*60*60*24; break
				}
				timestamp = now - difference
			}
		} else timestamp = (new Date(text)).getTime()

		if (timestamp) {
			if (prev_timestamp && timestamp - prev_timestamp > necro_time) {
				$(e).closest('.spot_h').addClass('BE-necro').attr('data-BE-necro', Math.round((timestamp - prev_timestamp) / (1000*60*60*24)) + " days later...")
			}
			prev_timestamp = timestamp
		} else prev_timestamp = null
	}

	setTimeout(settings.onchange.bind(settings, 'forum-detect-necro', on_update), 1)
}

function feature_forum_necro_reply_guard() {
	var necro_guard_on = false
	function on_update(value) {
		var necro_guard_on = value
	}

	$('.replay_h_EN').each(function() {
		var onclick = this.getAttribute('onclick').replace(/(openPostReply\('[0-9]+'\))/, 'if (!confirm()) $1')
		this.setAttribute('onclick', onclick)
	})
	
	setTimeout(settings.onchange.bind(settings, 'forum-necro-reply-guard', on_update), 1)
}


function feature_gamecard_forum_link() {
	function on_update(value) {
		if (value) {
			$('div.product-details')
			.append(row)
		} else {
			row.remove()
		}
	}

	var row

	var gogData = unsafeWindow.gogData
	if (gogData && gogData.gameProductData && gogData.gameProductData.forumUrl)
	{
		var url = gogData.gameProductData.forumUrl
		if (url != 'https://www.gog.com/forum/general') {
			row = $('<div class="product-details-row">')
			
			$('<div class="product-details__category">').text("Discussions").appendTo(row)

			var title = 
				(gogData.gameProductData.forumUrl == "https://www.gog.com/forum/general")
				?
				"General"
				:
				(unsafeWindow?unsafeWindow:window).gogData.gameProductData.title
				.replace(/[\u2122\u00ae\u2018]/g, '')
				.replace("\u2019", "'")
				.replace("\u2013", "-")
				.replace(/^(.*), The/, 'The $1')
					
			$('<div class="product-details__data">')
			.appendTo(row)
			.append(
				$('<a target="_blank" class="un">')
				.attr('href', url)
				.text(title + ' forum')
			)

			var style = $('<style>').appendTo(document.head)
			settings.onchange('gamecard-forum-link', on_update)
		}
	}
}

// Polyfills
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.lastIndexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}

function feature_frontpage_hide_galaxy_banner() {
	function on_update(value) {
		if (value) style.appendTo(document.head)
		else style.remove()
	}

	var style = $('<style>').text('.frontpage__galaxy-banner { display: none; }')

	settings.onchange('frontpage-hide-galaxy-banner', on_update)
}

function feature_library_hide_galaxy_banner() {
	function on_update(value) {
		if (value) style.appendTo(document.head)
		else style.remove()
	}

	var style = $('<style>').text('.galaxy-banner { display: none; }')

	settings.onchange('library-hide-galaxy-banner', on_update)
}
function feature_library_hide_galaxy_button() {
	function on_update(value) {
		if (value) style.appendTo(document.head)
		else style.remove()
	}

	var style = $('<style>').text('.game-details__header__button.btn--galaxy { display: none; }')

	settings.onchange('library-hide-galaxy-button', on_update)
}
function feature_frontpage_hide_email_verify() {
	function on_update(value) {
		if (value) style.appendTo(document.head)
		else style.remove()
	}

	var style = $('<style>').text(".container.verify-email {display: none; }")

	settings.onchange('frontpage-hide-email-verify', on_update)
}
function feature_navbar_hide_overlay() {
	function on_update(value) {
		if (value) style.appendTo(document.head)
		else style.remove()
	}

	var style = $('<style>').text(""
		+"	.menu-overlay {"
		+"	display: none !important;"
		+"}"
	)

	settings.onchange('nav-hide-overlay', on_update)
}

function feature_connect_autocheck() {
	var connect_dismissed = null

	function dismiss_alert(items) {
		var dismissed = {
			timestamp: Date.now(),
			items: []
		}
		for (var id in items) {
			dismissed.items.push(id)
		}
		storage.set('connect_dismissed', JSON.stringify(dismissed))

		$('.BE-connect-alert').remove()
	}

	function on_update(value) {
		if (value) style.appendTo(document.head)
		else style.remove()

		if (value && !feature_connect_autocheck.already_checked) {
			feature_connect_autocheck.already_checked = true
		
			if (global_user_info && global_user_info.id) inject_request({
				method: "GET",
				url: "/api/v1/users/"+global_user_info.id+"	/gogLink/steam/exchangeableProducts",
				onload: function(response) {
					var result = JSON.parse(response.responseText)
					if (result) {
						if (result.items && Object.keys(result.items).length > 0) {
							// check to see if current set of games has already been dismissed
							var anything_new = true
							if (connect_dismissed) {
								anything_new = false
								for (var id in result.items) {
									if (-1 == $.inArray(id, connect_dismissed.items)) {
										anything_new = true
										break
									}
								}
							}

							// add alert
							if (anything_new) {
								var connect_notice = $('<div class="BE-connect-alert">')
								var link = $('<a href="https://www.gog.com/connect" target="_blank">').html('New games on <b>GOG Connect</b>').appendTo(connect_notice)
								var dismiss = $('<span>').appendTo(connect_notice)
								connect_notice.appendTo(document.body)

								// add dismiss action
								dismiss.on('click', dismiss_alert.bind(null, result.items))
							}
						}
					} else if (connect_dismissed) {
						storage.delete('connect_dismissed')
						connect_dismissed = null
					}
				},
				onerror: function(response) {
					console.log("could not check Connect")
				}
			})

			$('<style>').text(""
			+"	.BE-connect-alert a {"
			+"	color: #E7B8FF;"
			+"}"
			+"	.BE-connect-alert a:hover {"
			+"	color: #fff;"
			+"}"
			+"	.BE-connect-alert {"
			+"	animation: BE-connect-alert 0.75s;"
			+"	background: #261b5f;"
			+"	position: fixed;"
			+"	z-index: 1000;"
			+"	font-size: 11px;"
			+"	top: 0;"
			+"	left: 75px;"
			+"	padding: 0.2em 1.5em 0.3em;"
			+"	border-radius: 0 0 0.3em 0.3em;"
			+"}"
			+"	.BE-connect-alert span:hover:after {"
			+"	content: 'Click to dismiss';"
			+"}"
			+"	.BE-connect-alert span:hover {"
			+"	color: #fff;"
			+"}"
			+"	.BE-connect-alert span:before {"
			+"	content: '\u274C ';"
			+"}"
			+"	.BE-connect-alert span {"
			+"	color: #E7B8FF;"
			+"	line-height: 1;"
			+"	cursor: pointer;"
			+"	padding-left: 1em;"
			+"	box-sizing: border-box;"
			+"}"
			+"	.BE-connect-alert:hover {"
			+"	background: #5a2269;"
			+"}"
			+"	@keyframes BE-connect-alert {"
			+"	from {"
			+"	opacity: 0;"
			+"}"
			+"	to {"
			+"	opacity: 1;"
			+"}"
			+"}"
			).appendTo(document.head)
		}
	}

	$('<style>').text(".BE-connect-alert { display: none; }").appendTo(document.head)
	var style = $('<style>').text(".BE-connect-alert { display: block; }")

	storage.get("connect_dismissed", function(connect_dismissed_json) {
		if (connect_dismissed_json) {
			connect_dismissed = JSON.parse(connect_dismissed_json)
			if (!connect_dismissed || !connect_dismissed.timestamp || connect_dismissed.timestamp < Date.now() - 3600000 * 24 * 56) {
				connect_dismissed = null
				storage.delete('connect_dismissed')
			}
		}

		settings.onchange('connect-autocheck', on_update)
	})
}

function feature_nav_community_links() {
	function on_update(value) {

		facebook.toggle(value["Facebook"])
		twitch.toggle(value["Twitch"])
		twitter.toggle(value["Twitter"])

		separator.toggle(value["Facebook"] || value["Twitter"] || value["Twitch"])
		
	}

	var community_menu = $('.js-menu-community')
	var facebook = community_menu.find('a.menu-submenu-link[href="https://www.facebook.com/gogcom"]').parent()
	var twitter = community_menu.find('a.menu-submenu-link[href="https://twitter.com/GOGcom"]').parent()
	var twitch = community_menu.find('a.menu-submenu-link[href="https://www.twitch.tv/gogcom"]').parent()
	var separator = facebook.prev('.menu-submenu-separator')

	setTimeout(settings.onchange.bind(settings, 'navbar-community-links', on_update), 1)
}

function feature_nav_about_links() {
	function on_update(value) {

		galaxy.toggle(value["GOG Galaxy"])
		downloader.toggle(value["GOG Downloader"])
		connect.toggle(value["GOG Connect"])

		separator.toggle(value["GOG Galaxy"] || value["GOG Downloader"] || value["GOG Connect"])
		
	}

	var about_menu = $('.js-menu-about')
	var galaxy = about_menu.find('a.menu-submenu-link[href="/galaxy"]').parent()
	var downloader = $('<div class="menu-submenu-item menu-submenu-item--hover">')
	var connect = $('<div class="menu-submenu-item menu-submenu-item--hover">')
	var separator = galaxy.nextAll('.menu-submenu-separator')

	connect.hide().append($('<a class="menu-submenu-link" href="/connect">').text("GOG Connect")).insertAfter(galaxy)
	downloader.hide().append($('<a class="menu-submenu-link" href="/downloader">').text("GOG Downloader")).insertAfter(galaxy)

	setTimeout(settings.onchange.bind(settings, 'navbar-about-links', on_update), 1)
}

function feature_nav_display_notifications() {
	function on_update(value) {
		chat.toggle(value)
		replies.toggle(value)
		friend.toggle(value)

		var total_alerts = (global_user_info.updates.unreadChatMessages || 0) + (global_user_info.updates.forum || 0) + (global_user_info.updates.pendingFriendRequests || 0)
		if (value && total_alerts > 0) {
			$('#menuUsername').attr('data-BE-alerts', total_alerts)
		} else $('#menuUsername').removeAttr('data-BE-alerts')
	}

	function scrape_forum_replies() {
		var key = sessionStorage_forum_check_key + global_user_info.id

		function perform_scrape() {
			inject_request({
				method: "GET",
				url: '/forum',
				onload: function(response) {
					var parser = new DOMParser();
					var root = parser.parseFromString(response.responseText, "text/html");
					var element = root.querySelector('#mainTemplateHolder>.sta_container>.hr>a.replies b')
					
					if (element) {

						global_user_info.updates.forum = Number.parseInt(element.textContent.trim().replace(/[^0-9]*$/, ''))
						update_forum_replies()
						sessionStorage.setItem(key, JSON.stringify({timestamp: Date.now(), forum: global_user_info.updates.forum}))

					} else {
						global_user_info.updates.forum = 0
						update_forum_replies()
						sessionStorage.setItem(key, JSON.stringify({timestamp: Date.now(), forum: 0}))
					}
				},
				onerror: function(response) {
					// console.log("Barefoot Essentials: could not load forum page")
				}
			})
		}

		function update_forum_replies(num_replies) {
			var replies = $('<span class="menu-submenu-item__label">').text(global_user_info.updates.forum)

			if (global_user_info.updates.forum) replies.appendTo($('.js-menu-account .menu-submenu-item a[href="/forum/myrecentposts"]'))

			on_update(settings.get('nav-display-notifications'))
		}

		var json = sessionStorage.getItem(key)
		if (json) {
			var last_check = JSON.parse(json)
			if (last_check) {
				if (last_check.timestamp + sessionStorage_forum_check_timeout < Date.now()) {
					perform_scrape()
					return
				} else {
					global_user_info.updates.forum = last_check.forum
					update_forum_replies()
					return
				}
			}
		}
		perform_scrape()
	}

	var chat = $('<span class="menu-submenu-item__label">').text(global_user_info.updates.unreadChatMessages)
	if (global_user_info.updates.unreadChatMessages) chat.appendTo($('.js-menu-account .menu-submenu-item a[href="/account/chat"]'))

	var replies = $('<span class="menu-submenu-item__label">').text(global_user_info.updates.forum)
	if (global_user_info.updates.forum) replies.appendTo($('.js-menu-account .menu-submenu-item a[href="/forum/myrecentposts"]'))

	var friend = $('<span class="menu-submenu-item__label">').text(global_user_info.updates.pendingFriendRequests)
	if (global_user_info.updates.pendingFriendRequests) friend.appendTo($('.js-menu-account .menu-submenu-item a[href="/account/friends"]'))

	$('<style>')
	.text(
		"#menuUsername[data-BE-alerts]:after {"
		+"	content: attr(data-BE-alerts);"
		+"	display: inline-block;"
		+"	color: #ddd;"
		+"	background-color: #a00;"
		+"	line-height: 1;"
		+"	padding: 0.25em 0.25em 0.15em;"
		+"	border-radius: 0.25em;"
		+"	margin: 0 0 0 0.5em;"
		+"	font-size: 11px;"
		+"	position: relative;"
		+"	bottom: 1px;"
		+"}"
	)
	.appendTo(document.head)

	if (global_user_info.updates.forum === undefined) scrape_forum_replies()
	setTimeout(settings.onchange.bind(settings, 'nav-display-notifications', on_update), 1)
}

function feature_nav_display_updates() {
	function on_update(value) {
		if (value && global_user_info.updates.products > 0) {
			$('#menuUsername').attr('data-BE-updates', global_user_info.updates.products)
		} else $('#menuUsername').removeAttr('data-BE-updates')
	}

	$('<style>')
	.text(
		"#menuUsername[data-BE-updates]:before {"
		+"	content: '↑ ' attr(data-BE-updates);"
		+"	color: #F4D514;"
		+"	position: absolute;"
		+"	left: 100%;"
		+"	white-space: nowrap;"
		+"	font-size: 14px;"
		+"	padding: 0;"
		+"	margin-left: 25px;"
		+"}"
		+"#menuUsername {"
		+"	position: relative;"
		+"	display: inline-block;"
		+"}"
	)
	.appendTo(document.head)

	setTimeout(settings.onchange.bind(settings, 'nav-display-updates', on_update), 1)
}

function feature_forum_avatar_style() {
	function on_update(value) {
		switch (value) {
			case 'rounded corners':
				settings.set('forum-improve-avatar-shadow', true)
				style.text(
					"div.b_p_avatar_h img, div.small_avatar_2_h img {"
					+"	border-radius: 15%;"
					+"}"
				)
				break
			case 'circle':
				settings.set('forum-improve-avatar-shadow', true)
				style.text(
					"div.b_p_avatar_h img, div.small_avatar_2_h img {"
					+"	border-radius: 50%;"
					+"}"
				)
				break
			default:
				style.text("")
		}
	}

	$('<style>')
	.text(
		"div.b_p_avatar_h img, div.small_avatar_2_h img {"
		+"	box-shadow: 1px 1px 2px 0px #3B3B3B;"
		+"}"
		+"div.b_p_avatar_h, div.small_avatar_2_h {"
		+"	background: none;"
		+"}"
	)
	.appendTo(document.head)

	var style = $('<style>')
	.appendTo(document.head)

	setTimeout(settings.onchange.bind(settings, 'forum-avatar-style', on_update), 1)
}

function feature_embed_youtube() {

	$('<style>')
	.text(
		".BE-video-click-to-play span::before {"
		+"	content: '►';"
		+"	font-size: 2em;"
		+"	vertical-align: middle;"
		+"	margin-right: 0.5em;"
		+"}"
		+".BE-video-click-to-play span:active {"
		+"	color: #808080;"
		+"}"
		+".BE-video-click-to-play span:hover {"
		+"	background: #111;"
		+"}"
		+".BE-video-click-to-play span {"
		+"	display: inline-block;"
		+"	background: #222;"
		+"	margin: 1em 1em 1em 0;"
		+"	padding: 0.5em 1em;"
		+"	border-radius: 0.5em;"
		+"	color: #dadada;"
		+"	cursor: pointer;"
		+"	-moz-user-select: none;"
		+"	user-select: none;"
		+"}"
		+".BE-link-highlight {"
		+"	outline: 2px solid yellow;"
		+"	outline-offset: 5px;"
		+"}"
		+".BE-video-close {"
		+"	margin-left: auto;"
		+"	display: block;"
		+"	background: #222;"
		+"	width: 2em;"
		+"	text-align: center;"
		+"	margin-top: 1em;"
		+"	cursor: pointer;"
		+"}"
		+".BE-video-close:hover {"
		+"	background: #111;"
		+"}"
	)
	.appendTo(document.head)

	function click_to_play_youtube() {
		var a = $(this)
		unhighlight_link.call(this)
		var code = a.data('video-code')
		var link = a.data('video-link')
		var time = a.data('video-time')

		var close = $('<div class="BE-video-close">').text('×')
		.on('click', hide_video_frame)
		.data('video-code', code)
		.data('video-link', link)
		.data('video-time', time)
		.insertAfter(a.parent())

		$('<iframe class="BE-video-frame" width="751" height="422" frameborder="0" allowfullscreen class="BE-video-frame">')
		.attr('src', 'https://www.youtube.com/embed/' + code + "?start=" + time)
		.insertAfter(close)

		a.remove()
	}

	function hide_video_frame() {
		var close = $(this)
		var code = close.data('video-code')
		var link = close.data('video-link')
		var time = close.data('video-time')
		close.next().remove()
		close.remove()
		embed_youtube_video(code, link, time)
	}

	function highlight_link() {
		var link = $(this).data('video-link')
		if (link && link.nodeType == 1) $(link).addClass('BE-link-highlight')
	}

	function unhighlight_link() {
		var link = $(this).data('video-link')
		if (link && link.nodeType == 1) $(link).removeClass('BE-link-highlight')
	}

	function embed_youtube_video(code, a, time) {
		if ($(a).closest('.quot').length == 0) {
			var comment = $(a).closest('.post_text_c')
			var videos = comment.find('.BE-video-click-to-play')
			if (videos.length == 0) {
				videos = $('<div class="BE-video-click-to-play">').appendTo(comment)
			}

			$('<span>').text("Click to play video")
			.data('video-code', code)
			.data('video-link', a)
			.data('video-time', time)
			.on('click', click_to_play_youtube)
			.on('mouseenter', highlight_link)
			.on('mouseleave', unhighlight_link)
			.appendTo(videos)
			
		}
	}

	function remove_video_embedding() {
		$('.BE-video-frame, .BE-video-click-to-play, .BE-video-close').remove()
	}

	function add_video_embedding() {
		remove_video_embedding()

		// embed www.youtube.com/embed links
		$('.post_text_c a[href^="https://www.youtube.com/embed/"]').each(function() {
			var result = /https?\:\/\/www.youtube.com\/embed\/([^#?]*).*(?:[&?]t=([0-9]*))?/.exec(this.href)
			if (result.length > 1) embed_youtube_video(result[1], this, result[2] ? parseInt(result[2]) : 0)
		})

		// embed youtu.be links
		$('.post_text_c a[href^="https://youtu.be"]').each(function() {
			var result = /https?\:\/\/youtu\.be\/([^?]*).*[?&]t=(?:([0-9]+)h)?(?:([0-9]+)m)?(?:([0-9]+)s)?/.exec(this.href)
			if (result.length > 1) {
				var time = 0
					if (result[4]) time += parseInt(result[4])
					if (result[3]) time += parseInt(result[3]) * 60
					if (result[2]) time += parseInt(result[2]) * 3600
				embed_youtube_video(result[1], this, time)
			}
		})

		// embed www.youtube.com/watch links
		$('.post_text_c a[href^="http://www.youtube.com/watch"], .post_text_c a[href^="https://www.youtube.com/watch"]').each(function() {
			var result = /https?\:\/\/www.youtube.com\/watch.*[?&]v=([^&]*)/.exec(this.href)
			if (result.length > 1)  {
				var code = result[1]
				var time = 0
				result = /https?\:\/\/www.youtube.com\/watch.*[?&]t=(?:([0-9]+)h)?(?:([0-9]+)m)?(?:([0-9]+)s)?/.exec(this.href)
				if (result && result.length > 1)  {
					if (result[3]) time += parseInt(result[3])
					if (result[2]) time += parseInt(result[2]) * 60
					if (result[1]) time += parseInt(result[1]) * 3600
				}
				embed_youtube_video(code, this, time)
			}
		})
	}

	function on_update(value) {
		if (value) add_video_embedding()
		else remove_video_embedding()
	}

	settings.onchange('forum-embed-videos', on_update)
}

function feature_hide_menu_icons() {
	function on_update(values) {
		if (values.Alerts) {
			$('.menu-notifications').hide()
		} else {
			$('.menu-notifications').show()
		}
		if (values.Friends) {
			$('.menu-friends').hide()
		} else {
			$('.menu-friends').show()
		}
	}

	settings.onchange('nav-hide-icons', on_update)
}

function feature_nav_notification_dot() {
	function on_update(values) {
		var rules = "";

		if (values['Activity feed']) 
		rules += ".menu-item.js-menu-account > .menu-link--pending-notifications::before {"
		+"	display: none;"
		+"} "

		if (values['Forum replies']) 
		rules += ".menu-item.js-menu-community > .menu-link--pending-notifications::before {"
		+"	display: none;"
		+"} "

		style.text(rules)
	
	}

	var style = $('<style>').appendTo(document.head)
	settings.onchange('nav-hide-notification-dot', on_update)
}

function feature_nav_menu_links() {
	settings.onchange('navbar-account-menu-link', function on_update(value) {
		switch (value) {
			case 'Profile': $('.menu-item.menu-account > a.menu-link').attr('href', '/u'); break
			case 'Games library': $('.menu-item.menu-account > a.menu-link').attr('href', '/account'); break
			default: $('.menu-item.menu-account > a.menu-link').attr('href', '/feed')
		}
	})
	settings.onchange('navbar-about-menu-link', function on_update(value) {
		switch (value) {
			case 'GOG Galaxy': $('.menu-item.js-menu-about > a.menu-link').attr('href', '/galaxy'); break
			case 'GOG Connect': $('.menu-item.js-menu-about > a.menu-link').attr('href', '/connect'); break
			case 'GOG Downloader': $('.menu-item.js-menu-about > a.menu-link').attr('href', '/downloader'); break
			default: $('.js-menu-about > a.menu-link').attr('href', '/about_gog')
		}
	})
	settings.onchange('navbar-community-menu-link', function on_update(value) {
		switch (value) {
			case 'General forum': $('.menu-item.js-menu-community > a.menu-link').attr('href', '/forum/general'); break
			case 'Forum replies': $('.menu-item.js-menu-community > a.menu-link').attr('href', '/forum/myrecentposts'); break
			case 'Chat': $('.menu-item.js-menu-community > a.menu-link').attr('href', '/account/chat'); break
			case 'Friends': $('.menu-item.js-menu-community > a.menu-link').attr('href', '/account/friends'); break
			default: $('.menu-item.js-menu-community > a.menu-link').attr('href', '/forum')
		}
	})
}

function bugfix_feed_overflow() {
	function on_update(value) {
		if (value) style.appendTo(document.head)
		else style.remove()
	}

	var style = $('<style>')
	.text(
		".prof-forum-activity {"
		+"	overflow: hidden;"
		+"}"
	)

	settings.onchange('bugfix-activity-feed-overflow', on_update)
}

function bugfix_footer_columns() {
	function on_update(value) {
		if (value) style.appendTo(document.head)
		else style.remove()
	}

	var style = $('<style>')
	.text(
		".main-footer__sitemap {"
		+"	float: left;"
		+"}"
	)

	settings.onchange('bugfix-forum-footer-columns', on_update)
}

function bugfix_footer_at_bottom() {
	function on_update(value) {
		if (value) style.appendTo(document.head)
		else style.remove()
	}

	var style = $('<style>')
	.text(
		"body.page_forum {"
		+"	display: flex;"
		+"	flex-direction: column;"
		+"}"
		+"#mainTemplateHolder {"
		+"	margin-bottom: 0;"
		+"}"
		+"#templateStaContainer {"
		+"	min-height: 0;"
		+"	flex-grow: 1;"
		+"	max-height: none;"
		+"	height: auto;"
		+"	overflow: hidden;"
		+"	display: block;"
		+"	position: static;"
		+"	flex-shrink: 0;"
		+"}"
		+"body.page_forum .main-footer {"
		+"	position: relative;"
		+"}"
		+"#mainTemplateHolder .footer-spacer,"
		+"#mainTemplateHolder + .footer-spacer {"
		// +"	height: 0;"
		+"}"

		+"body {"
		+"	display: flex;"
		+"	flex-direction: column;"
		+"	min-height: 100vh;"
		+"}"
		+"body > div.layout {"
		+"	min-height: 0;"
		+"	flex-grow: 1;"
		+"	flex-shrink: 0;"
		+"}"

		+".universe .wrapper.cf {"
		+"	min-height: 100vh;"
		+"	display: flex;"
		+"	flex-direction: column;"
		+"}"
		+""
		+".universe .wrapper.cf > .content.cf {"
		+"	flex-grow: 1;"
		+"	flex-shrink: 0;"
		+"}"
	)

	settings.onchange('bugfix-footer-position', on_update)
}


function feature_forum_old_gog_avatar() {
	function on_update(value) {
		if (value) {
			$('img[src="https://images.gog.com/67bea49d4dd1f2ce362f3a482f39d9236acd058dac6d2ba91f25eab737126df5_forum_avatar.jpg"]').attr('src', 'https://images.gog.com/9b1aae00838bf648d83b017801d926f025abf226278d1263e20fd8d0df154445_forum_avatar.jpg')
			style.appendTo(document.head)
		} else {
			$('img[src="https://images.gog.com/9b1aae00838bf648d83b017801d926f025abf226278d1263e20fd8d0df154445_forum_avatar.jpg"]').attr('src', 'https://images.gog.com/67bea49d4dd1f2ce362f3a482f39d9236acd058dac6d2ba91f25eab737126df5_forum_avatar.jpg')
			style.remove()
		}
	}

	var style = $("<style>")
	.text(".general_img { background: url(https://images.gog.com/9b1aae00838bf648d83b017801d926f025abf226278d1263e20fd8d0df154445_forum_avatar.jpg) 0 0; background-size: 100%; }")
	
	settings.onchange('forum-old-gog-avatar', on_update)
}

function feature_gamecard_additional_information_links() {
	function on_update(value) {
		row.remove()
		list.empty()

		var any_shown = false
		if (value["Forum"]) {
			var url = gogData.gameProductData.forumUrl
			if (url != 'https://www.gog.com/forum/general') {
				any_shown = true
				list.append(
					$("<li>").append(
						$('<a target="_blank" class="un">')
						.attr('href', url)
						.text('Discuss this product on the forum')
					)
				)
			}
		}
		if (value["GOG Database"]) {
			any_shown = true
			list.append(
				$("<li>").append(
					$('<a target="_blank" class="un">')
					.attr('href', "https://www.gogdb.org/product/"+gogData.gameProductData.id)
					.text('GOG Database')
				)
			)
		}
		if (value["GOG Wiki"]) {
			any_shown = true
			list.append(
				$("<li>").append(
					$('<a target="_blank" class="un">')
					.attr('href', "https://gogwiki.com/wiki/"+escape(title))
					.text('GOG Wiki')
				)
			)
		}
		if (value["PCGamingWiki"]) {
			any_shown = true
			list.append(
				$("<li>").append(
					$('<a target="_blank" class="un">')
					.attr('href', "https://pcgamingwiki.com/wiki/"+escape(title))
					.text('PCGamingWiki')
				)
			)
		}
		if (value["Wikipedia"]) {
			any_shown = true
			list.append(
				$("<li>").append(
					$('<a target="_blank" class="un">')
					.attr('href', "https://en.wikipedia.org/wiki/"+escape(title))
					.text('Wikipedia')
				)
			)
		}

		if (any_shown) $('div.product-details').append(row)
	}

	var row = $('<div class="product-details-row">')
	
	$('<div class="product-details__category">').text("More info").appendTo(row)

	var gogData = unsafeWindow.gogData

	if (gogData) {
		var title = gogData.gameProductData.title
			.replace(/[\u2122\u00ae\u2018]/g, '')
			.replace("\u2019", "'")
			.replace("\u2013", "-")
			.replace(/^(.*), The/, 'The $1')

		var list = $("<ul>")

		$('<div class="product-details__data">')
		.appendTo(row)
		.append(
			list
		)

		var style = $('<style>').appendTo(document.head)
		settings.onchange('gamecard-additional-information-links', on_update)
	}
}

// entry code
if (location.hostname == 'www.gog.com') {
	settings.initialise(config, function() {
		fetch_user_id(function() {
			feature_connect_autocheck()
			feature_nav_display_notifications()
			feature_nav_display_updates()
		})
		feature_favicon()
		feature_BE_style()
		feature_wiki_sync()
		feature_paging_shortcut_keys()

		bugfix_footer_at_bottom()
		bugfix_footer_columns()

		// navbar
		feature_navbar_position()
		feature_navbar_theme()
		// feature_navbar_opacity() // removed in 2.16
		// feature_navbar_force_http()
		// feature_notification_style() // removed in 2.16
		// feature_cart_style() // removed in 2.16
		// feature_hide_alerts() // removed in 2.16
		// feature_show_sections() // removed in 2.16
		// feature_navbar_library_links()
		feature_nav_notification_dot()
		feature_nav_menu_links()
		feature_add_essentials_link()
		feature_nav_about_links()
		feature_nav_community_links()
		// feature_navbar_show_username() // removed in 2.16
		// feature_navbar_hide_strip()
		feature_navbar_hide_overlay()
		feature_hide_menu_icons()

		// 404
		if (document.title == "404 - Page not found - GOG.com") {
		}

		// forum
		else if (/^\/forum/.test(window.location.pathname)) {

			detect_forum_skin()
			add_preview_styles()
			feature_forum_old_gog_avatar()


			// forum section
			if (/^\/forum\/[^/]*(?:\/(?:page[0-9]+)?)?$/.test(window.location.pathname)) {
				feature_forum_hide_fragment()
				feature_forum_group_giveaways()
				feature_forum_collapsible_footer()
				feature_forum_old_gog_avatar()
			}

			// forum popup
			else if (location.pathname == "/forum/ajax/popUp") {
				feature_post_preview()
			}

			// forum topic
			else if (/^\/forum\/[^/]*\/[^/]*(?:\/(?:page[0-9]+|post[0-9]+)?)?$/.test(window.location.pathname)) {
				feature_forum_username_link()
				feature_avatar_zoom()
				feature_forum_quick_post()
				feature_click_own_title()
				feature_forum_move_edit_note()
				feature_forum_quotation_style()
				feature_enhance_bold_text()
				feature_hide_spoilers()
				feature_forum_show_hover_elements()
				// feature_topic_collapsible_footer()
				// feature_reduce_footer_spacer()
				feature_forum_detect_necro()
				feature_forum_move_online_offline_status()
				feature_forum_avatar_style()
				feature_embed_youtube()
				// feature_forum_necro_reply_guard()
			}
		}

		// front page
		else if (window.location.pathname == '/') {
			feature_frontpage_hide_galaxy_banner()
			feature_frontpage_hide_email_verify()
			feature_frontpage_hide_sale_owned()
		}

		// moviecard
		else if (/^\/movie\/[^/]*$/.test(window.location.pathname)) {
			feature_gamecard_show_descriptions()
			feature_gamecard_additional_information_links()
		}
		// gamecard
		else if (/^\/game\/[^/]*$/.test(window.location.pathname)) {
			feature_gamecard_show_descriptions()
			compat_get_gogData()
			// feature_gamecard_gogwiki_link()
			// feature_gamecard_gogdb_link()
			// feature_gamecard_forum_link()
			feature_gamecard_additional_information_links()
		}
		// library
		else if ((new RegExp("^/account(?:/(?:games|movies)(?:/(?:shelf|list))?)?$")).test(window.location.pathname)) {
			feature_library_always_show_count()
			feature_library_hide_galaxy_banner()
			feature_library_hide_galaxy_button()
		}
		// catalogue
		else if ((new RegExp('^/(?:games|movies)(?:/.*)?$')).test(window.location.pathname)) {
			feature_catalogue_hide_owned()
			feature_catalogue_add_hide_owned_toggle()
		}
		// promo
		else if (/^\/promo\/[^/]*$/.test(window.location.pathname)) {
			feature_promo_show_discount()
		}
		// feed
		// else if (/^\/feed$/.test(window.location.pathname)) {
		// 	bugfix_feed_overflow()
		// }

		// check version, and show changelog if new
		storage.get('last_BE_version', function(last_BE_version) {
			if (last_BE_version === undefined) last_BE_version = default_prev_version
			else if (settings.get('BE-show-changelog') !== false && cmpVersion(last_BE_version, version) < 0) {
				popup.show('Changelog')
			}
			storage.set('last_BE_version', version)
		})
	})
}
