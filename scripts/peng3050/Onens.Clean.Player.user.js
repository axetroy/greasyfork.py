// ==UserScript==
// @name        Onens.Clean.Player
// @namespace   http://onens.com/
// @description Thanks to OpenGG, Harv.c, KaFan15536900
// @version     2.1.8.1126
// @include     http://*/*
// @include     https://*/*
// @grant       GM_xmlhttpRequest
// @run-at      document-end
// ==/UserScript==

if (typeof GM_xmlhttpRequest == 'undefined') {
	var GM_xmlhttpRequest = function(obj) {
		var xhr = new XMLHttpRequest();
		xhr.open(obj.method, obj.url, true);
		xhr.send();
		xhr.onreadystatechange = function() {
			xhr.readyState == 4 && typeof obj.onload == 'function' && obj.onload(xhr);
		};
	};
}

Function.prototype.bind = function() {
	var fn = this,
		arg = Array.prototype.slice.call(arguments),
		obj = arg.shift();
	return function() {
		return fn.apply(obj, arg.concat(Array.prototype.slice.call(arguments)));
	};
};

var aHost = 'http://dxdragon.cwsurf.de/cleanplayer/player/';
var OCPlayer = {
	host: 'http://gesion.duapp.com/player/',
	list: [],
	done: [],
	rule: [{ // YOUKU_COM
		find: /^http:\/\/static\.youku\.com(\/v[\d\.]*)?\/v\/swf\/q?(player|loader)([^\.]+)?\.swf/i,
		replace: 'loader.swf'
	}, { // YOUKU_OUT
		find: /^http:\/\/player\.youku\.com\/player\.php\/.*sid\/([\w=]+).*(\/v)?\.swf.*/i,
		replace: 'loader.swf?showAd=0&VideoIDS=$1'
	}, { // KU6_COM
		find: /^http:\/\/player\.ku6cdn\.com\/default\/.*\/\d+\/(v|player)\.swf/i,
		replace: 'ku6.swf'
	}, { // KU6_OUT
		find: /^http:\/\/player\.ku6\.com\/(inside|refer)\/([^\/]+)\/v\.swf.*/i,
		replace: 'ku6_out.swf?vid=$2'
	}, { // IQIYI_COM
		find: /^https?:\/\/www\.iqiyi\.com\/(player\/\d+\/player|common\/flashplayer\/\d+\/(main)?player_.*)\.swf/i,
		replace: function(el, find) {
			var url = 'iqiyi.swf';
			if (!/(^((?!baidu|61|178).)*\.iqiyi\.com|pps\.tv)/i.test(window.location.host))
				url = 'iqiyi_out.swf';
			else if (document.querySelector('span[data-flashplayerparam-flashurl]'))
				url = 'iqiyi5.swf';

			this.Reload.bind(this, el, find, url)();
		}
	}, { // IQIYI_BILIBILI
		find: /^http:\/\/www\.bilibili\.tv\/iqiyi\.swf/i,
		replace: 'iqiyi.swf'
	}, { // IQIYI_PPS
		find: /^http:\/\/www\.iqiyi\.com\/player\/cupid\/.*\/pps[\w]+.swf/i,
		replace: 'pps.swf'
	}, { // IQIYI_OUT
		find: /^http:\/\/(player|dispatcher)\.video\.i?qiyi\.com\/(.*[\?&]vid=)?([^\/&]+).*/i,
		replace: function(el, find) {
			var url = 'iqiyi_out.swf?vid=$3',
				match = (el.data || el.src).match(/(autoplay)=\d+/ig);
			if (match)
				url += '&' + match.join('&');

			this.Reload.bind(this, el, find, url)();
		}
	}, { // TUDOU_COM
		find: /^http:\/\/js\.tudouui\.com\/.*PortalPlayer[^\.]*\.swf/i,
		replace: 'tudou.swf'
	}, { // TUDOU_OUT
		find: /^http:\/\/www\.tudou\.com\/.*(\/v\.swf)?/i,
		replace: function(el, find) {
			var isFF = /firefox/i.test(navigator.userAgent),
				player = el.data || el.src;

			GM_xmlhttpRequest({
				url: isFF ? player : 'http://gesion.duapp.com/tudou.php?' + encodeURIComponent(player),
				method: isFF ? 'HEAD' : 'GET',
				onload: function(response) {
					var url = isFF ? response.finalUrl : response.responseText;
					if (url) {
						url = url.replace(/http:\/\/js\.tudouui\.com\/.*?\/olc_[^.]*?\.swf/i, this.host + 'olc_8.swf');
						url = url.replace(/http:\/\/js\.tudouui\.com\/.*?\/SocialPlayer_[^.]*?\.swf/i, this.host + 'sp.swf');
						this.Reload.bind(this, el, find, url)();
					}
				}.bind(this)
			});
		}
	}, { // LETV_COM
		find: /^http:\/\/.*letv[\w]*\.com\/(hz|.*\/((?!(Live|seed|Disk))(S[\w]{2,3})?(?!Live)[\w]{4}|swf))Player*\.swf/i,
		replace: function(el, find) {
			/^baidu\.hz\.letv\.com/i.test(window.location.host) || this.Reload.bind(this, el, find, 'letv.swf')();
		}
	}, { // LETV_COM
		find: /^http:\/\/.*letv[\w]*\.com\/.*\/(letv-wrapper|letvbili|lbplayer)\.swf/i,
		replace: 'letv.swf'
	}, { // LETV_SKIN
		find: /^http:\/\/.*letv[\w]*\.com\/p\/\d+\/\d+\/(?!15)\d*\/newplayer\/\d+\/S?SLetvPlayer\.swf/i,
		replace: 'http://player.letvcdn.com/p/201407/24/15/newplayer/1/SSLetvPlayer.swf'
	}, { // LETV_CLOUD
		find: /^http:\/\/assets\.dwstatic\.com\/video\/vpp\.swf/i,
		replace: 'http://yuntv.letv.com/bcloud.swf'
	}, { // LETV_OUT
		find: /^http:\/\/.*letv\.com\/player\/swfplayer\.swf(\?.*)/i,
		replace: 'letv.swf$1'
	}, { // PPLIVE
		find: /^http:\/\/player\.pplive\.cn\/ikan\/.*\/player4player2\.swf/i,
		replace: 'pplive.swf'
	}, { // PPLIVE_LIVE
		find: /^http:\/\/player\.pplive\.cn\/live\/.*\/player4live2\.swf/i,
		replace: 'pplive_live.swf'
	}, { // SOHU_COM
		find: /^http:\/\/tv\.sohu\.com\/upload\/swf\/(?!(live|\d+)).*\d+\/(Main|PlayerShell)\.swf/i,
		replace: 'sohu/sohu.swf'
	}, { // SOHU_LIVE
		find: /^http:\/\/(tv\.sohu\.com\/upload\/swf\/(live\/|)\d+|(\d+\.){3}\d+(:\d+)?\/(.*player))\/(main|PlayerShell)\.swf/i,
		replace: aHost + 'sohu/sohu_live.swf'
	}, { // SOHU_Bilibili
		find: /^http:\/\/static\.hdslb\.com\/sohu\.swf/i,
		replace: aHost + 'sohu/sohu_live.swf'
	}, { // SOHU_OUT_1
		find: /^http:\/\/.*\.sohu\.com\/my\/v\.swf(.*)/i,
		replace: aHost + 'sohu/sohu_live.swf' + '?$1'
	}, { // SOHU_OUT_2
		find: /^http:\/\/.*\.sohu\.com\/(\d+)\/v\.swf/i,
		replace: aHost + 'sohu/sohu_live.swf' + '?vid=$1'
	}, { // SOHU_OUT_2
		find: /^http:\/\/.*\.sohu\.com\/(\d+)\/v\.swf/i,
		replace: aHost + 'sohu/sohu_live.swf' + '?vid=$1'
	}, { // 17173_in_Vod
		find: /^http:\/\/f\.v\.17173cdn\.com\/\d+\/flash\/PreloaderFile(Customer)?\.swf/i,
		replace: aHost + '17173/17173.in.Vod.swf'
	}, { // 17173_out_Vod_1
		find: /^http:\/\/f\.v\.17173cdn\.com\/player_f2\/(\w+)\.swf/i,
		replace: aHost + '17173/17173.out.Vod.swf' + '?cid=$1'
	}, { // 17173_out_Vod_2
		find: /^http:\/\/17173\.tv\.sohu\.com\/player[^\.]*\.swf/i,
		replace: aHost + '17173/17173.out.Vod.swf'
	}, { // 17173_in_Live
		find: /^http:\/\/f\.v\.17173cdn\.com\/\d+\/flash\/Player_stream(_firstpage)?\.swf/i,
		replace: aHost + '17173/17173.in.Live.swf'
	}, { // 17173_out_Live
		find: /^http:\/\/v\.17173\.com\/live\/player\/Player_stream_(custom)?Out\.swf/i,
		replace: aHost + '17173/17173.out.Live.swf' + '?'
	}],

	style: 'object,embed{-webkit-animation-duration:.001s;-webkit-animation-name:playerInserted;-ms-animation-duration:.001s;-ms-animation-name:playerInserted;-o-animation-duration:.001s;-o-animation-name:playerInserted;animation-duration:.001s;animation-name:playerInserted;}@-webkit-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}@-ms-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}@-o-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}@keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}',

	tips_html: '<span style="color:green">Onens.Clean.Player \u5DF2\u542F\u7528</span> &nbsp; <a href="http://gesion.duapp.com/script/onens.clean.player.user.js" style="color:red" title="\u5347\u7EA7\u65B0\u7248" target="_blank">\u5347\u7EA7</a> &nbsp; <a href="http://blog.onens.com/onens-clean-player.html" style="color:blue" title="\u53CD\u9988\u95EE\u9898" target="_blank">\u53CD\u9988</a> &nbsp; <a href="http://blog.onens.com/donation" style="color:orange" title="\u6350\u52A9\u9879\u76EE" target="_blank">\u6350\u52A9</a> &nbsp; <a href="javascript:;" class="tip_close" style="color:gray" title="\u9690\u85CF\u63D0\u793A">\u9690\u85CF</a>',

	tips_style: '.tips_container{font:12px Arial, Verdana;padding:0 8px;cursor:default;border:1px solid #d5d5d5;line-height:25px;opacity:.2;background:#f5f5f5;position:fixed;right:0;bottom:-1px;z-index:999999}.tips_container:hover{opacity:.8}',

	Handler: function(e) {
		if (e.animationName != 'playerInserted')
			return;

		var el = e.target;
		if (this.done.indexOf(el) != -1)
			return;

		this.done.push(el);

		var player = el.data || el.src;
		if (!player)
			return;

		for (var i in this.rule) {
			var find = this.rule[i]['find'];
			if (find.test(player)) {
				var replace = this.rule[i]['replace'];
				typeof replace == 'function' ? this.list.push(replace.bind(this, el, find)) : this.Reload.bind(this, el, find, replace)();
			}
		}
	},

	Reload: function(el, find, replace) {
		replace = /^https?:\/\//i.test(replace) ? replace : this.host + replace;
		el.data && (el.data = el.data.replace(find, replace)) || el.src && ((el.src = el.src.replace(find, replace)) && (el.style.display = 'block'));
		var next = el.nextSibling,
			node = el.parentNode,
			elem = el.cloneNode(true);
		this.done.push(elem);
		if (node) {
			node.removeChild(el);
			next ? node.insertBefore(elem, next) : node.appendChild(elem);
		}
		this.Tips();
	},

	Style: function(css) {
		var style = document.createElement('style');
		style.setAttribute('type', 'text/css');
		style.innerHTML = css || this.style;
		document.getElementsByTagName('head')[0].appendChild(style);
	},

	Timer: function() {
		setInterval(function() {
			this.list.length && this.list.shift()();
		}.bind(this), 100);
	},

	Tips: function() {
		if (this.done.indexOf('tips') != -1)
			return;

		this.done.push('tips');

		this.Style(this.tips_style);

		var div = document.createElement('div');
		div.className = 'tips_container';
		div.innerHTML = this.tips_html;
		div.querySelector('.tip_close').addEventListener('click', function(e) {
			e.stopPropagation && e.stopPropagation();
			e.preventDefault && e.preventDefault();
			div.parentNode.removeChild(div);
		}, false);
		(document.documentElement || document.body).appendChild(div);
	},

	Init: function() {
		var events = ['webkitAnimationStart', 'msAnimationStart', 'oAnimationStart', 'animationstart'];
		for (var i in events)
			document.addEventListener(events[i], this.Handler.bind(this), false);

		this.Style();
		this.Timer();
	}
};

OCPlayer.Init();
