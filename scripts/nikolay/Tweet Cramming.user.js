// ==UserScript==
// @name         Tweet Cramming
// @namespace    http://tampermonkey.net/
// @version      0.2.0
// @description  Allow 280 characters in a Tweet sent from TweetDeck automatically
// @author       Nikolay Kolev
// @run-at       document-idle
// @match        https://tweetdeck.twitter.com/*
// @grant        *
// ==/UserScript==

TD.services.TwitterClient.prototype.makeTwitterCall = function(
	b,
	e,
	f,
	g,
	c,
	d,
	h
) {
	c = c || function() {};
	d = d || function() {};
	var i =
		b == "https://api.twitter.com/1.1/statuses/update.json"
			? Object.assign(e, { weighted_character_count: !0 })
			: e;
	b = this.request(b, { method: f, params: i, processor: g, feedType: h });
	return (
		b.addCallbacks(
			function(a) {
				c(a.data);
			},
			function(a) {
				d(a.req, "", a.msg, a.req.errors);
			}
		),
		b
	);
};

twttrTxt = Object.assign({}, twttr.txt, {
	isInvalidTweet: function() {
		return !1;
	},
	getTweetLength: function() {
		var l = twttr.txt.getTweetLength.apply(this, arguments);
		return l > 140 ? l - 140 : l;
	}
});