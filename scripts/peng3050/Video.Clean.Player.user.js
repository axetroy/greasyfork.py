// ==UserScript==
// @name        Video.Clean.Player
// @namespace   https://github.com/dxdragon/CleanPlayer
// @author      Original By yndoc, Mod By dxdragon,Thanks to OpenGG, cinhoo, KaFan15536900, gesion,catcat520,jc3213,etc
// @description 去除国内常见视频网站的播放前视频广告
// @version     3.14.1126
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

(function() {
    Function.prototype.bind = function() {
        var fn = this, args = Array.prototype.slice.call(arguments), obj = args.shift();
        return function() {
            return fn.apply(obj, args.concat(Array.prototype.slice.call(arguments)));
        };
    };

    function YoukuAntiAds() {}
    YoukuAntiAds.prototype = {
        iURL: 'http://dxdragon.cwsurf.de/cleanplayer/player/',
        _players: null,
        _rules: null,
        _done: null,
        get players() {
            if(!this._players) {
                this._players = {
                    'youku_loader': this.iURL + 'loader.swf',
                    'youku_player': this.iURL + 'player.swf',
                    'ku6': this.iURL + 'ku6.swf',
                    'ku6_out': this.iURL + 'ku6_out.swf',
                    'iqiyi': this.iURL + 'iqiyi.swf',
                    'iqiyi5': this.iURL + 'iqiyi5.swf',
                    'iqiyi_out': this.iURL + 'iqiyi_out.swf',
                    'pps': this.iURL + 'pps.swf',
                    'pptv': this.iURL + 'pptv.in.Ikan.swf',
                    'pptv_live': this.iURL + 'pptv.in.Live.swf',
                    'tudou': this.iURL + 'tudou.swf',
                    'tudou_olc': this.iURL + 'olc_8.swf',
                    'tudou_sp': this.iURL + 'sp.swf',
                    'baidu_call': this.iURL + 'baidu.call.swf',
                    'letv': this.iURL + 'letv.swf',
                    'letv_cloud': this.iURL + 'letv_cloud.swf',
                    'sohu':this.iURL + 'sohu/sohu.swf',
                    'sohu_live':this.iURL + 'sohu/sohu_live.swf',
                    '17173_in_Vod': this.iURL + '17173/17173.in.Vod.swf', 
                    '17173_in_Live': this.iURL + '17173/17173.in.Live.swf',
                    '17173_out_Vod': this.iURL + '17173/17173.out.Vod.swf',
                    '17173_out_Live': this.iURL + '17173/17173.out.Live.swf',
               };
            }
            return this._players;
        },
        get rules() {
            if(!this._rules) {
                this._rules = {
                    'youku_loader': {
                        'find': /^http:\/\/static\.youku\.com(\/v[\d\.]*)?\/v\/swf\/loaders?\.swf/i,
                        'replace': this.players['youku_loader']
                    },
                    'youku_player': {
                        'find': /^http:\/\/static\.youku\.com(\/v[\d\.]*)?\/v\/swf\/(q?player.*|\w{13})\.swf/i,
                        'replace': this.players['youku_loader']
                    },
                    'youku_out': {
                        'find': /^http:\/\/player\.youku\.com\/player\.php\/.*sid\/([\w=]+).*(\/v)?\.swf.*/i,
                        'replace': this.players['youku_loader'] + '?showAd=0&VideoIDS=$1'
                    },
                    'ku6': {
                        'find': /^http:\/\/player\.ku6cdn\.com\/default\/.*\/\d+\/(v|player)\.swf/i,
                        'replace': this.players['ku6']
                    },
                    'ku6_out': {
                        'find': /^http:\/\/player\.ku6\.com\/(inside|refer)\/([^\/]+)\/v\.swf.*/i,
                        'replace': this.players['ku6_out'] + '?vid=$2'
                    },
                    'iqiyi': {
                        'find': /^https?:\/\/www\.iqiyi\.com\/(player\/(\d+\/Player|[a-z0-9]*)|common\/flashplayer\/\d+\/((PPS)?Main|Share)?Player.*_(.|ad\d+))\.swf/i,
                        'replace': this.players['iqiyi']
                    },
                    'iqiyi_out': {
                        'find': /^https?:\/\/player\.video\.i?qiyi\.com\/([^\/]*)\/.*tvId=([^-]*).*/i,
                        'replace': this.players['iqiyi_out'] + '?vid=$1&tvId=$2'
                    },
                    'iqiyi_out_2': {
                        'find': /^https?:\/\/(player|dispatcher)\.video\.i?qiyi\.com\/(.*\/shareplayer\.swf|qiyi)/i,
                        'replace': this.players['iqiyi_out']
                    },
                    'pps': {
                        'find': /^https?:\/\/www\.iqiyi\.com\/common\/.*\/pps[\w]+.swf/i,
                        'replace': this.players['iqiyi_out']
                    },
                    'pptv': {
                        'find': /^http:\/\/player\.pplive\.cn\/ikan\/.*\/player4player2\.swf/i,
                        'replace': this.players['pptv']
                    },
                    'pptv_live': {
                        'find': /^http:\/\/player\.pplive\.cn\/live\/.*\/player4live2\.swf/i,
                        'replace': this.players['pptv_live']
                    },
                    'tudou': {
                        'find': /^http:\/\/js\.tudouui\.com\/.*PortalPlayer[^\.]*\.swf/i,
                        'replace': this.players['tudou']
                    },
                    'tudou_out': {
                        'find': /^http:\/\/www\.tudou\.com\/.*(\/v\.swf)?/i,
                        'replace': this.players['tudou_olc'] + '?tvcCode=-1&swfPath=' + this.players['tudou_sp']
                    },
                    'baidu_call': {
                        'find': /^http\:\/\/list\.video\.baidu\.com\/swf\/advPlayer\.swf/i,
                        'replace': this.players['baidu_call']
                    },
                    'letv': {
                        'find': /^http:\/\/.*letv[\w]*\.com\/.*\/((?!(Live|seed|Disk))(S[\w]{2,3})?(?!Live)[\w]{4}|swf|VLetv)Player[^\.]*\.swf/i,
                        'replace': this.players['letv']
                    },
                    'letv_hz': {
                        'find': /^http:\/\/.*letv[\w]*\.com\/(hz|.*player\/(s)?sdkletv)player\.swf.*/i,
                        'replace': this.players['letv']
                    },
                    'letv_cloud': {
                        'find': /^http:\/\/.*letv[\w]*\.com\/.*cloud(?!(_bili).*)?\.swf|http:\/\/assets\.dwstatic\.com\/.*\/vppp\.swf/i,
                        'replace': this.players['letv_cloud']
                    },
                    'letv_out': {
                        'find': /^http:\/\/.*\.letvimg\.com\/.*\/(letvbili|lbplayer|letv-wrapper|acfunletv[^\.]*)\.swf/i,
                        'replace': this.players['letv']
                    },
                    'letv_skin': {
                        'find': /^http:\/\/.*letv[\w]*\.com\/p\/\d+\/\d+\/(?!15)\d*\/newplayer\/\d+\/S?SLetvPlayer\.swf/i,
                        'replace': 'http://player.letvcdn.com/p/201407/24/15/newplayer/1/SSLetvPlayer.swf'
                    },
                    'sohu': {
                        'find': /^http:\/\/tv\.sohu\.com\/upload\/swf\/(?!(live|\d+)).*\d+\/(main|PlayerShell)\.swf/i,
                        'replace': this.players['sohu']
                    },
                    'sohu_live': {
                        'find': /^http:\/\/(tv\.sohu\.com\/upload\/swf\/(live\/|)\d+|(\d+\.){3}\d+(:\d+)?\/(.*player))\/(main|PlayerShell)\.swf/i,
                        'replace': this.players['sohu_live']
                    },
                    'sohu_bilibili': {
                        'find': /^http:\/\/static\.hdslb\.com\/sohu\.swf/i,
                        'replace': this.players['sohu_live']
                    },
                    'sohu_out_1': {
                        'find': /^http:\/\/.*\.sohu\.com\/my\/v\.swf(.*)/i,
                        'replace': this.players['sohu_live'] + '?$1'
                    },
                    'sohu_out_2': {
                        'find': /^http:\/\/.*\.sohu\.com\/(\d+)\/v\.swf/i,
                        'replace': this.players['sohu_live'] + '?vid=$1'
                    },
                    '17173_in_Vod': {
                        'find': /^http:\/\/f\.v\.17173cdn\.com\/\d+\/flash\/PreloaderFile(Customer)?\.swf/i,
                        'replace': this.players['17173_in_Vod'] 
                    },
                    '17173_out_Vod_1': {
                        'find': /^http:\/\/f\.v\.17173cdn\.com\/player_f2\/(\w+)\.swf/i,
                        'replace': this.players['17173_out_Vod'] + '?cid=$1'
                    },
                    '17173_out_Vod_2': {
                        'find': /^http:\/\/17173\.tv\.sohu\.com\/player[^\.]*\.swf/i,
                        'replace': this.players['17173_out_Vod']
                    },
                    '17173_in_Live': {
                        'find': /^http:\/\/f\.v\.17173cdn\.com\/\d+\/flash\/Player_stream(_firstpage)?\.swf/i,
                        'replace': this.players['17173_in_Live']
                    },
                    '17173_out_Live': {
                        'find': /^http:\/\/v\.17173\.com\/live\/player\/Player_stream_(custom)?Out\.swf/i,
                        'replace': this.players['17173_out_Live'] + '?'
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
            this.rules['iqiyi_out']['preHandle'] = function(elem, find, replace, player) {
                var match = player.match(/(autoplay)=[^&]+/ig);
                if(match) {
                    replace += '&' + match.join('&');
                }
                this.reallyReplace.bind(this, elem, find, replace)();
            }
            this.rules['tudou_out']['preHandle'] = function(elem, find, replace, player) {
                var fn = this;
                var isFx = /firefox/i.test(navigator.userAgent);
                GM_xmlhttpRequest({
                    method: isFx ? 'HEAD' : 'GET',
                    url: isFx ? player : 'https://query.yahooapis.com/v1/public/yql?format=json&q=' + encodeURIComponent('use"http://dxdragon.cwsurf.de/cleanplayer/firefox/tudou_redirect.yql.xml" as tudou; select * from tudou where url="' + player + '" and referer="' + window.location.href + '"'),
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

        style: 'object,embed{-webkit-animation-duration:.001s;-webkit-animation-name:playerInserted;-ms-animation-duration:.001s;-ms-animation-name:playerInserted;-o-animation-duration:.001s;-o-animation-name:playerInserted;animation-duration:.001s;animation-name:playerInserted;}@-webkit-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}@-ms-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}@-o-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}@keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}',

        tips_html: '<span style="color:green">Video.Clean.Player \u5DF2\u542F\u7528</span> &nbsp; <a href="https://github.com/dxdragon/CleanPlayer/blob/master/Video.Clean.Player.user.js" style="color:red" title="\u5347\u7EA7\u65B0\u7248" target="_blank">\u5347\u7EA7</a> &nbsp; <a href="http://bbs.kafan.cn/thread-1514537-1-1.html" style="color:blue" title="\u53CD\u9988\u95EE\u9898" target="_blank">\u53CD\u9988</a> &nbsp; <a href="javascript:;" class="tip_close" style="color:gray" title="\u9690\u85CF\u63D0\u793A">\u9690\u85CF</a>',

        tips_style: '.tips_container{font:12px Arial, Verdana;padding:0 8px;cursor:default;border:1px solid #d5d5d5;line-height:25px;opacity:.2;background:#f5f5f5;position:fixed;right:0;bottom:-1px;z-index:999999}.tips_container:hover{opacity:.8}',

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

        init: function() {
            this.initPreHandlers();

            var events = ['webkitAnimationStart', 'msAnimationStart', 'oAnimationStart', 'animationstart'];
            for (var i in events)
                document.addEventListener(events[i], this.animationsHandler.bind(this), false);
            
            this.Style();
            this.Timer();
        }
    };

    new YoukuAntiAds().init();
})();
