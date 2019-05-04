// ==UserScript==
// @name        IMDb: Show Metacritc Metascore
// @namespace   http://w9p.co/userscripts/
// @description Inserts Metacritic data into old-style IMDb pages.
// @version     2017.10.8
// @author      kuehlschrank
// @include     http*://*.imdb.com/title/*/
// @include     http*://*.imdb.com/title/*/reference*
// @include     http*://*.imdb.com/title/*/maindetails*
// @include     http*://*.imdb.com/title/*/combined*
// @exclude     http*://*.imdb.com/title/*/board/*
// @icon        https://s3.amazonaws.com/uso_ss/icon/83602/large.png
// @grant       GM_xmlhttpRequest
// @connect-src metacritic.com
// @noframes
// ==/UserScript==

'use strict';

function parseTitle() {
	var m = document.title.match(/(.*) \((\d{4})/);
	return {
		name: clean(m[1]),
		year: parseInt(m[2]),
		type: $('meta[property="og:type"]').content.replace('_show', '')
	};
}

function search(title, onLoad, onError, isLastTry) {
	GM_xmlhttpRequest({
		method:  'GET',
		url:     'http://www.metacritic.com/search/' + title.type + '/' + title.name.replace(/[\s\/\-\u00b7]+/g, '+').replace(/[^a-z0-9'+.]+/ig, '') + '/results?date_range_from=01-01-' + title.year + (isLastTry ? '' : '&date_range_to=07-01-' + (title.year + 1)) + '&search_type=advanced',
		headers: {'Referer': 'http://www.metacritic.com/advanced-search'},
		onload:  function(req) {
			if(req.status != 200)
				return onError(req);
			var links = $('.result a[href]', doc(req.responseText), true);
			if(!links.length)
				return isLastTry ? onLoad(false) : search(title, onLoad, onError, true);
			var list = [];
			for(var i = 0; i < links.length; i++) {
				var a = links[i], href = a.getAttribute('href');
				list.push({
					name: a.textContent,
					url:  href[0] == '/' && href[1] != '/' ? 'http://www.metacritic.com' + href : href
				});
			}
			onLoad(list);
		},
		onerror: onError
	});
}

function load(url, onLoad, onError) {
	GM_xmlhttpRequest({
		method:  'GET',
		url:     url,
		headers: {Referer:'http://www.metacritic.com/'},
		onload:  function(req) {
			if(req.status != 200)
				return onError(req);
			var page = doc(req.responseText), info = {url:url};
			try {
				info.name = $('meta[property="og:title"]', page).content.trim();
			} catch(ex) { log('Parse error: name'); }
			try {
				info.critics = $('.phead_summary .based_on', page).textContent.match(/\d+/);
				info.score = parseInt($('.phead_summary .metascore_w', page).textContent);
			} catch(ex) { log('Parse error: critics'); }
			try {
				var blurbs = $('.critic_reviews .summary a:first-of-type, .critic_reviews2 .summary a:first-of-type', page, true);
				info.blurb = blurbs[Math.floor((blurbs.length-1)/2)].textContent;
				if(info.score) {
					for(var i = blurbs.length, closest = 100; i--;) {
						var score = parseInt($('.metascore_w', blurbs[i].parentNode.parentNode.parentNode).textContent), diff = Math.abs(info.score - score);
						if(diff < closest || diff == closest && info.blurb.length < blurbs[i].textContent.length) {
							info.blurb = blurbs[i].textContent;
							closest = diff;
						}
					}
				}
			} catch(ex) { log('Parse error: blurb'); }
			try {
				info.userscore = Math.round(parseFloat($('.metascore_w.user', page).textContent) * 10);
				info.users = parseInt($('a[href*="/user-reviews"] .based_on', page).textContent.replace(/\D/g, ''));
			} catch(ex) { log('Parse error: users'); }
			onLoad(info);
		},
		onerror: onError
	});
}

function showInfo(info) {
	var html;
	if(info.score) {
		html = '<span class="score ' + meaning(info.score) + '">' + info.score + '</span><span class="count">based on ' + info.critics + ' critics</span>';
		if(info.users > 10 && Math.abs(info.score - info.userscore) > 10)
			html += '<span class="score ' + meaning(info.userscore) + '">' + info.userscore + '</span><span class="count">based on ' + info.users + ' users</span>';
	} else {
		html = 'No score yet.';
	}
	if(info.blurb) {
		html += '<div class="blurb">' + info.blurb + '</div>';
	}
	out('<a class="scorelink" href="' + info.url + '">' + html + '</a>');
}

function showChoices(results) {
	out('');
	var f = function(e) { e.preventDefault(); out('Fetching...'); load(this.href, handleInfo, handleError); };
	for(var i = 0; i < results.length; i++) {
		var a = document.createElement('a');
		a.innerHTML = results[i].name;
		a.href = results[i].url;
		a.addEventListener('click', f, false);
		out(a);
		if(results.length > i + 1)
			out(document.createTextNode(', '));
	}
}

function handleInfo(info) {
	showInfo(info);
	sessionStorage.setItem(document.title, JSON.stringify(info));
}

function handleError(req) {
	out('<a class="error" href="' + req.finalUrl + '">Request failed - HTTP status: ' + req.status + '</a>');
	if([429, 500].indexOf(req.status) > -1) setTimeout(main, 5000);
}

function out(content) {
	var inner = $('#metacritic');
	if(!inner) {
		var style = document.createElement('style');
		style.textContent = '\
			#metacritic .scorelink { text-decoration:none; color:#333333; }\
			#metacritic .score { padding:1px 5px; font-weight:bold }\
			#metacritic .count { margin-left:4px; color:#333333; margin-right:30px; }\
			#metacritic .good { color:#ffffff; background:#66cc33 }\
			#metacritic .average { color:#333333; background:#ffcc33 }\
			#metacritic .bad { color:#ffffff; background:#ff0000 }\
			#metacritic .error { font-weight:bold; color:#ff0000 }\
			#metacritic .blurb { margin-top:6px; }';
		document.head.appendChild(style);
		inner = document.createElement('div');
		inner.id = 'metacritic';
		inner.className  = 'info-content';
		var outer = document.createElement('div');
		outer.className = 'info metacritic';
		outer.innerHTML = '<h5>Metacritic:</h5>\n';
		outer.appendChild(inner);
		var node = $('#tn15rating + *') || $('#tn15content > h3 + *');
		if(!node)
			throw 'Unexpected layout';
		node.parentNode.insertBefore(outer, node);
	}
	if(typeof content == 'object')
		inner.appendChild(content);
	else
		inner.innerHTML = content;
}

function doc(html) {
	var d = document.implementation.createHTMLDocument('mc-doc');
	d.documentElement.innerHTML = html;
	return d;
}

function $(q, node, all) {
	return (node || document)[all ? 'querySelectorAll' : 'querySelector'](q);
}

function clean(s) {
	return s.replace(/[:,"]|Vol(ume|\.) /g, '').trim().toLowerCase();
}

function log(s) {
	console.log(s);
}

function meaning(x) {
	if(x > 60)
		return 'good';
	if(x > 39)
		return 'average';
	return 'bad';
}

function main() {
	var data = JSON.parse(sessionStorage.getItem(document.title));
	if(data) {
		data.length ? showChoices(data) : showInfo(data);
	} else {
		var title = parseTitle();
		out('Searching...');
		search(title,
			function(results) {
				if(!results)
					return out('<a href="https://www.google.com/search?q=' + encodeURIComponent('site:www.metacritic.com ' + title.name) + '">N/A</a>');
				out('Fetching...');
				if(results[0].name && clean(results[0].name) != title.name) {
					var chunk = results.slice(0, 10);
					showChoices(chunk);
					sessionStorage.setItem(document.title, JSON.stringify(chunk));
				} else {
					load(results[0].url, handleInfo, handleError);
				}
			}, handleError);
	}
}

main();
