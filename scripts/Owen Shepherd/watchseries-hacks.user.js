// ==UserScript==
// @name        watchseries-hacks
// @namespace   414owen
// @include     /^https?://(?:www.)?watchseriesfree\.to/episode/\.*/
// @include     /^https?://(?:www.)?onwatchseries\.to/episode/\.*/
// @include     /^https?://(?:www.)?watchseriesgo\.to/episode/\.*/
// @include     /^https?://(?:www.)?watch-?series\.ac/episode\.*/
// @version     2.5.0
// @license     GPL
// @description Scrapes direct video links from watchseriesfree.to and inserts them onto the page
// @grant       GM_xmlhttpRequest
// ==/UserScript==

console.log("watchseries-hacks is live");
// Remove other scripts
[].slice.call(document.getElementsByTagName('SCRIPT')).forEach(function (el) {
	el.parentNode.removeChild(el);
});

// Unpacker for Dean Edward's p.a.c.k.e.r, a part of javascript beautifier
// written by Einar Lielmanis <einar@jsbeautifier.org>
var P_A_C_K_E_R = {
	detect: function (str) {
		return (P_A_C_K_E_R.get_chunks(str).length > 0);
	},
	get_chunks: function (str) {
		var chunks = str.match(/eval\(\(?function\(.*?(,0,\{\}\)\)|split\('\|'\)\)\))($|\n)/g);
		return chunks ? chunks : [
		];
	},
	unpack: function (str) {
		var chunks = P_A_C_K_E_R.get_chunks(str),
			chunk;
		for (var i = 0; i < chunks.length; i++) {
			chunk = chunks[i].replace(/\n$/, '');
			str = str.split(chunk).join(P_A_C_K_E_R.unpack_chunk(chunk));
		}
		return str;
	},
	unpack_chunk: function (str) {
		var unpacked_source = '';
		var __eval = eval;
		if (P_A_C_K_E_R.detect(str)) {
			try {
				eval = function (s) {
					unpacked_source += s;
					return unpacked_source;
				};
				__eval(str);
				if (typeof unpacked_source === 'string' && unpacked_source) {
					str = unpacked_source;
				}
			} catch (e) { }
		}
		eval = __eval;
		return str;
	},
};

function unpack(str) {
	if (P_A_C_K_E_R.detect(str)) return P_A_C_K_E_R.unpack(str);
	else return str;
}

function detectplayer(str) {
	var items = [
		'jwplayer',
		'file'
	];
	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		if (str.indexOf(item) === -1) {
			return false;
		}
	};
	return true;
}

function inDocAt(src, todo, arg) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: src,
		data: '',
		headers: {},
		onload: function (response) {
			var parser = new DOMParser();
			var htmldoc = parser.parseFromString(response.responseText, 'text/html');
			todo(htmldoc, response.responseText, arg);
		}
	});
}

function getsources(doc, src, url, todo) {
	[].slice.call(doc.getElementsByTagName('SCRIPT')).forEach(function (el) {
		var code = unpack(el.innerText);
		if (detectplayer(code)) {
			var reg = /file\s*:\s*["']([^'"]*.mp4)['"]/g;
			for (var i = 0; i < 10; i++) {
				var match = reg.exec(code);
				if (match == null) break;
				todo(match[1]);
			}
		}
	});
}

function havePageLink(link, url) {
	var lstyle = link.style;
	if (url == null) {
		lstyle.backgroundColor = '#ff7777';
		return;
	}
	link.href = url;
	lstyle.backgroundColor = '#ffc100';
	inDocAt(url, function (streampage, src) {
		var added = 0;
		getsources(streampage, src, url, function(source) {
			var videolink = document.createElement('a');
			videolink.innerText = "video";
			videolink.href = source;
			var style = videolink.style;
			videolink.className = "buttonlink";
			style.display = "inline-block";
			style.backgroundColor = '#3b3';
			style.margin = "5px";
			if (added % 2 === 0) {
				var br = document.createElement('br');
				link.parentNode.appendChild(br);
			}
			added++;
			link.parentNode.appendChild(videolink)
		});
	});
}

function middle_page(getnext, link, href, todo) {
	inDocAt(href, function (interpage) {
		todo(link, getnext(interpage));
	});
}

function cls(name, doc) {return doc.getElementsByClassName(name);}
function tag(name, doc) {return doc.getElementsByTagName(name);  }
function  id(name, doc) {return doc.getElementById(name);        }

var myButton = middle_page.bind(null, function(doc) {return cls('myButton', doc)[0].href;});
var frame_or_butt = middle_page.bind(null, function(doc) {
	var thing = id('video-embed', doc).children[0];
	return thing.src || thing.href;
});

function buttonlink() {
	return [].slice.call(document.getElementsByClassName('buttonlink'));
}

function removePremium() {
	var buttons = buttonlink();
	for (var ind = 0; ind < buttons.length; ind++) {
		var button = buttons[ind];
		for (var i = 0; i < button.classList.length; i++) {
			if (button.classList[i] === "premium") {
				while (button.tagName != "TR") button = button.parentNode;
				button.parentNode.removeChild(button);
				break;
			}
		}
	}
}

function uptorow(link) {
	var el = link;
	while (el.tagName != "TR") el = el.parentNode;
	return el;
}

function provider(n, l) {
	return uptorow(l).cells[0].children[0].childNodes[n].data;
}

function expand() {
	window.setTimeout(function() {
		[].slice.call(document.getElementsByClassName('showmore')).forEach(
			function(el) {el.click();});
	}, 1000);
}

// regex match, find links to streaming page, setup
var page_settings = [
	{
		reg: "^https?://(?:www.)?watchseriesfree\.to/episode\.*", 
		setup: removePremium,
		getlinks: buttonlink,
		pagefromlink: myButton,
		provider: provider.bind(null, 0)
	},
	{
		reg: "^https?://(?:www.)?watch-?series\.ac/episode\.*", 
		setup: expand,
		getlinks: buttonlink,
		pagefromlink: frame_or_butt,
		provider: provider.bind(null, 2) 
	},
	{
		reg: "^https?://(?:www.)?onwatchseries\.to/episode\.*", 
		getlinks: buttonlink,
		pagefromlink: function(link, href, todo) {todo(link, window.atob(href.replace(/^.*\?../, "")));},
		provider: provider.bind(null, 1)
	},
	{
		reg: "^https?://(?:www.)?watchseriesgo\.to/episode\.*", 
		setup: expand,
		getlinks: buttonlink,
		pagefromlink: frame_or_butt,
		provider: provider.bind(null, 2) 
	}
];

for (var i = 0; i < page_settings.length; i++) {
	var e = page_settings[i];
}

var priority_sites = [
	"watchers", "speedvid", "vidzi.tv", "vidto"
].map(function(p) {return new RegExp("^\\s*" + p + ".*");});

function blueandpagelink(func, link, url, todo) {
	link.style.backgroundColor = "#7777ff";
	func(link, url, todo);
}

for (var i = 0; i < page_settings.length; i++) {
	var page = page_settings[i];
	if (!(new RegExp(page.reg)).test(window.location)) continue;
	console.log("Page config found");
	if (page.setup) page.setup();
	var links = page.getlinks();
	var curr_ind = 0;
	for (var j = 0; j < links.length; j++) {
		var link = links[j];
		for (var k = 0; k < priority_sites.length; k++) {
			var reg = priority_sites[k];
			if (reg.test(page.provider(link))) {
				for (var l = j; l > curr_ind; l--) {
					var tmp = links[l - 1];
					links[l - 1] = link;
					links[l] = tmp;
				}
				break;
			}
		}
	}
	var tmp = blueandpagelink.bind(null, page.pagefromlink);
	page.pagefromlink = tmp;
	for (var j = 0; j < links.length; j++) {
		var link = links[j];
		window.setTimeout(page.pagefromlink.bind(null, link, link.href, havePageLink),
			j * 600);
	}
}
