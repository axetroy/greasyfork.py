// ==UserScript==
// @name        Video_Player_Replace
// @namespace   none@none.no
// @version     201707290750
// @author      VoToV
// @include     http://*/*
// @include     https://*/*
// @grant       GM_xmlhttpRequest
// @description Through the way of replace SWF player to solve video advertising and black screen
// @exclude     *.microsoft.*
// @exclude     *.qiniu.*
// @exclude     *.staticfile.org/*
// @exclude     *ouku.com/v_show/id_XMT*
// @exclude     /ouku\.com/v_show/id_XM.*([^\d=]\.[^\.]+$|from=y1.3-[^t].+)/
// ==/UserScript==

//This is the amended version,Thanks for OGG, Harv, kawaiiushio

(function() {
	Function.prototype.bind = function() {
		var fn = this, args = Array.prototype.slice.call(arguments), obj = args.shift();
		return function() {
			return fn.apply(obj, args.concat(Array.prototype.slice.call(arguments)));
		};
	};
    function VideoAntiADs() {}
    VideoAntiADs.prototype = {
	_players: null,
        _rules: null,
        _done: null,
        get players() {
            if(!this._players) {
                this._players = {
			'youku': 'http://7lrwpw.com1.z0.glb.clouddn.com/aa/loader.swf',
			'youkup': 'http://7lrwpw.com1.z0.glb.clouddn.com/aa/player.swf',
			'tudou': 'http://7lrwpw.com1.z0.glb.clouddn.com/aa/tudou.swf',
			'tudou_olc': 'http://7lrwpw.com1.z0.glb.clouddn.com/aa/olc_8.swf',
			'tudou_sp': 'http://7lrwpw.com1.z0.glb.clouddn.com/aa/sp.swf',
			'ku6': 'http://7lrwra.com1.z0.glb.clouddn.com/bb/ku6.swf',
			'ku62': 'http://7lrwra.com1.z0.glb.clouddn.com/bb/ku62.swf',
			'letv': 'http://7lrwra.com1.z0.glb.clouddn.com/bb/letv.swf',
			'letv4': 'http://7lrwra.com1.z0.glb.clouddn.com/bb/letv4.swf',
			'letvl': 'http://7lrwra.com1.z0.glb.clouddn.com/bb/letvl.swf',
			'letvd': 'http://yuntv.letv.com/bcloud.swf',
			'iqiyi2': 'http://7lrwra.com1.z0.glb.clouddn.com/bb/iqiyi2.swf',
			'iqiyi4': 'http://7lrwra.com1.z0.glb.clouddn.com/bb/iqiyi4.swf',
			'iqiyi5': 'http://7lrwra.com1.z0.glb.clouddn.com/bb/iqiyi5.swf',
			'iqiyil': 'http://7lrwra.com1.z0.glb.clouddn.com/bb/iqiyil.swf',
			'pps': 'http://7lrwra.com1.z0.glb.clouddn.com/bb/pps.swf',
			'17173v': 'http://7pumyt.com1.z0.glb.clouddn.com/bb/17173v.swf',
			'17173l': 'http://7pumyt.com1.z0.glb.clouddn.com/bb/17173l.swf',
			'17173v2': 'http://7pumyt.com1.z0.glb.clouddn.com/bb/17173v2.swf',
			'17173l2': 'http://7pumyt.com1.z0.glb.clouddn.com/bb/17173l2.swf',
			'sohu': 'http://7lrwra.com1.z0.glb.clouddn.com/bb/sohu.swf',
			'sohul': 'http://7lrwra.com1.z0.glb.clouddn.com/bb/sohul.swf'
                };
            }
            return this._players;
        },
        get rules() {
            if(!this._rules) {
                this._rules = {
			'youku': {
				'find': /^ttp:\/\/static\.youku\.com(\/v[\d\.]+)?\/v\/.*\/loaders?\.swf/i,
				'replace': this.players['youku']
			},
			'youkup': {
				'find': /^http:\/\/static\.youku\.com(\/v[\d\.]+)?\/v\/.*\/(\w{7,}|q?player[^\.]+)\.swf/i,
				'replace': this.players['youkup']
			},
			'youku2': {
				'find': /^ttp:\/\/player\.youku\.com\/player\.php\/.*sid\/([\w=]+).*(\/v)?\.swf.*/i,
				'replace': this.players['youku'] + '?showAd=0&VideoIDS=$1'
			},
			'youku22': {
				'find': /^ttp:\/\/player\.youku\.com\/player\.php\/.*sid\/(\w+)/i,
				'replace': this.players['youku'] + '?VideoIDS=$1'
			},
			'tudou': {
				'find': /^http:\/\/js\.tudouui\.com\/.*PortalPlayer\w*\.swf/i,
				'replace': this.players['tudou']
			},
			'tudou2': {
				'find': /^http:\/\/www\.tudou\.com\/.*(\/v\.swf)?/i,
				'replace': this.players['tudou_olc'] + '?tvcCode=-1&swfPath=' + this.players['tudou_sp']
			},
			'ku6': {
				'find': /^http:\/\/player\.ku6cdn\.com\/default\/.*\/\d+\/\w+\.swf.*/i,
				'replace': this.players['ku6']
			},
			'ku62': {
				'find': /^http:\/\/player\.ku6\.com\/(inside|refer)\/([^\/]+)\/v\.swf.*/i,
				'replace': this.players['ku62'] + '?vid=$2'
			},
			'letv': {
				'find': /^ttp:\/\/.*letv[\w]*\.com[^\.]*\/(.*player\/(?!Live).*Player[^\.]*\.swf|hzplayer\.swf.*$)/i,
				'replace': this.players['letv']
			},
			'letv2': {
				'find': /^ttp:\/\/.*letv[\w]*\.com\/.*\/v_list=[\d]+\/vid=(\w+)/i,
				'replace': this.players['letv'] + '?vid=$1'
			},
			'letv22': {
				'find': /^ttp:\/\/.*letv[\w]*\.com\/(.*[\/\?]v_list=\w+$|.*\/(letvbili|lbplayer|letv-wrapper|acfunletv[^\.]*)\.swf)/i,
				'replace': this.players['letv']
			},
			'letv4': {
				'find': /^ttp:\/\/.*letv[\w]*\.com\/[^lib]\w+\.swf[^\/]/i,
				'replace': this.players['letv4']
			},
			'letvl': {
				'find': /^ttp:\/\/.*letv[\w]*\.com\/live\.swf/i,
				'replace': this.players['letvl']
			},
			'iqiyi': {
				'find': /^https?:\/\/www\.iqiyi\.com\/(common\/flash)?player\/\d+\/(\w*player\w+|\d\w+)\.swf/i,
				'replace': this.players['iqiyi4']
			},
			'iqiyi2': {
				'find': /^https?:\/\/(player|dispatcher)\.video\.i?qiyi\.com\/(.*vid=)?(\w{8,}).*tvId=(\w+).*/i,
				'replace': this.players['iqiyi2'] + '?vid=$3&tvId=$4&autoPlay=1'
			},
			'iqiyi42': {
				'find': /^https?:\/\/(player|dispatcher)\.video\.i?qiyi\.com\/(.*\/shareplayer\.swf|qiyi)/i,
				'replace': this.players['iqiyi4']
			},
			'iqiyi43': {
				'find': /^https?:\/\/[\w-]+.bilibili\.(tv|com)\/iqiyi\.swf/i,
				'replace': this.players['iqiyi4']
			},
			'iqiyil': {
				'find': /^https?:\/\/www\.iqiyi\.com\/common\/flashplayer\/\d+\/LivePlayer[\w\.]+\.swf/i,
				'replace': this.players['iqiyil']
			},
			'pps': {
				'find': /^https?:\/\/www\.iqiyi\.com\/player\/cupid\/\w+\/pps\w+play\w+\.swf/i,
				'replace': this.players['pps']
			},
			'17173v': {
				'find': /^http:\/\/f\.v\.17173cdn\.com\/\d+\/flash\/PreloaderFile\.swf/i,
				'replace': this.players['17173v']
			},
			'17173v2': {
				'find': /^http:\/\/17173\.tv\.sohu\.com\/player[^\.]*\.swf/i,
				'replace': this.players['17173v2']
			},
			'17173v22': {
				'find': /^http:\/\/f\.v\.17173cdn\.com\/player_f2[^\.]*\/(\w+)\.swf/i,
				'replace': this.players['17173v2'] + '?cid=$1'
			},
			'17173l': {
				'find': /^http:\/\/f\.v\.17173cdn\.com\/\d+\/flash\/Player_stream(_firstpage)?\.swf/i,
				'replace': this.players['17173l']
			},
			'17173l2': {
				'find': /^http:\/\/v\.17173\.com\/live\/playerVideo\/PreloaderFileCustomer\.swf/i,
				'replace': this.players['17173_out_Live'] + '?'
			},
			'17173l3': {
				'find': /^http:\/\/v\.17173\.com\/live\/player\/Player_stream_(custom)?Out\.swf/i,
				'replace': this.players['17173_out_Live'] + '?'
			},
			'sohul': {
				'find': /^http:\/\/(tv\.sohu\.com\/upload\/swf\/(p2p\/)?\d+|(\d+\.){3}\d+\/\w+player)\/Main\d*\.swf/i,
				'replace': this.players['sohul']
			},
			'sohu2': {
				'find': /^http:\/\/.*\.sohu\.com\/my\/v\.swf(.*)/i,
				'replace': this.players['sohu'] + '?$1'
			},
			'sohu22': {
				'find': /^http:\/\/.*\.sohu\.com\/(\d+)\/v\.swf/i,
				'replace': this.players['sohu'] + '?vid=$1'
			}
                }
            }
            return this._rules;
        },
        get done() {
            if(!this._done) {
                this._done = new Array();
            }
            return this._done;
        },
        initPreHandlers: function() {
            this.rules['iqiyi']['preHandle'] = function(elem, find, replace, player) {
                if(document.querySelector('span[data-flashplayerparam-flashurl]')) {
                    replace = this.players['iqiyi5'];
                }
                this.reallyReplace.bind(this, elem, find, replace)();
            }
            this.rules['tudou2']['preHandle'] = function(elem, find, replace, player) {
                var fn = this;
                var isFx = /firefox/i.test(navigator.userAgent);
                GM_xmlhttpRequest({
                    method: isFx ? 'HEAD' : 'GET',
                    url: isFx ? player : 'https://query.yahooapis.com/v1/public/yql?format=json&q=' + encodeURIComponent('use"https://haoutil.googlecode.com/svn/trunk/firefox/tudou_redirect.yql.xml" as tudou; select * from tudou where url="' + player + '" and referer="' + window.location.href + '"'),
                    onload: function(response) {
                        var finalUrl = (isFx ? response.finalUrl : response.responseText);
                        var match = finalUrl.match(/(iid|youkuid|resourceid|autoplay|snap_pic|code)=[^&]+/ig);
                        if(match && !/error/i.test(finalUrl)) {
                            replace += '&' + match.join('&');
                            fn.reallyReplace.bind(fn, elem, find, replace)();
                        }
                    }
                });
            }
        },
        addAnimations: function() {
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = 'object,embed{\
-webkit-animation-duration:.001s;-webkit-animation-name:playerInserted;\
-ms-animation-duration:.001s;-ms-animation-name:playerInserted;\
-o-animation-duration:.001s;-o-animation-name:playerInserted;\
animation-duration:.001s;animation-name:playerInserted;}\
@-webkit-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}\
@-ms-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}\
@-o-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}\
@keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}';
            document.getElementsByTagName('head')[0].appendChild(style);
        },
        animationsHandler: function(e) {
            if(e.animationName === 'playerInserted') {
                this.replace(e.target);
            }
        },
        replace: function(elem) {
            if(this.done.indexOf(elem) != -1) return;
            this.done.push(elem);

            var player = elem.data || elem.src;
            if(!player) return;

            var i, find, replace, isReplacing = false;
            for(i in this.rules) {
                find = this.rules[i]['find'];
                if(find.test(player)) {
                    replace = this.rules[i]['replace'];
                    if('function' === typeof this.rules[i]['preHandle']) {
                        isReplacing = true;
                        this.rules[i]['preHandle'].bind(this, elem, find, replace, player)();
                    }
                    if(!isReplacing) {
                        this.reallyReplace.bind(this, elem, find, replace)();
                    }
                    break;
                }
            }
        },
        reallyReplace: function(elem, find, replace) {
            elem.data && (elem.data = elem.data.replace(find, replace)) || elem.src && ((elem.src = elem.src.replace(find, replace)) && (elem.style.display = 'block'));
            this.reloadPlugin(elem);
        },
        reloadPlugin: function(elem) {
            var nextSibling = elem.nextSibling;
            var parentNode = elem.parentNode;
            parentNode.removeChild(elem);
            var newElem = elem.cloneNode(true);
            this.done.push(newElem);
            if(nextSibling) {
                parentNode.insertBefore(newElem, nextSibling);
            } else {
                parentNode.appendChild(newElem);
            }
        },
        init: function() {
            this.initPreHandlers();

            var handler = this.animationsHandler.bind(this);
            var events = ['webkitAnimationStart', 'msAnimationStart', 'oAnimationStart', 'animationstart'];
            for (var i in events)
                document.body.addEventListener(events[i], handler, false);

            this.addAnimations();
        }
    };

    new VideoAntiADs().init();
})();