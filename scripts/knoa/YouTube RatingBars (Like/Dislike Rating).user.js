// ==UserScript==
// @name        YouTube RatingBars (Like/Dislike Rating)
// @name:ja     YouTube RatingBars (Like/Dislike Rating)
// @namespace   knoa.jp
// @description It shows RatingBars which represents Like/Dislike Rating ratio.
// @description:ja 動画へのリンクに「高く評価」された比率を示すバーを表示します。
// @include     https://www.youtube.com/*
// @version     3.2.0
// @grant       none
// @noframes
// en:
// API limits 1M queries/day. (approximately 100 views by 10,000 users.)
// You can use your own APIKEY to support this script.
// (But now, far from usage limit.)
// https://console.developers.google.com/apis/
// ja:
// APIの制限は1日あたり100万クエリ(1万ユーザーなら1人あたり100ビュー)です。
// 各自でAPIKEYを書き換えてくれるとスクリプトの寿命が延びます。
// (ただ、いまのところ制限に達しそうにはありません)
// https://console.developers.google.com/apis/
// ==/UserScript==

(function(){
  const SCRIPTNAME = 'YouTubeRatingBars';
  const DEBUG = false;/*
  [update] 
  Now available on channel pages, trending, etc.

  [to do]

  [to research]
  全部にバーを付与した上で中身の幅だけを更新する手も
    URL変わるたびに中身を一度0幅にすれば更新時のアニメーションも不自然ではないか
  IntersectionObserver ?
  GM4+で動かない報告は不思議では？

  [memo]
  要素はとことん再利用されるので注意。
  API Document:
  https://developers.google.com/youtube/v3/docs/videos/list
  API Quotas:
  https://console.developers.google.com/apis/api/youtube.googleapis.com/quotas?project=test-173300
  */
  if(window === top && console.time) console.time(SCRIPTNAME);
  const INTERVAL = 1000;/*for core.observeItems*/
  const HEIGHT = 2;/*bar height(px)*/
  const THINHEIGHT = 1;/*bar height(px) for videos with few ratings*/
  const RELIABLECOUNT = 10;/*ratings less than this number has less reliability*/
  const LIKECOLOR = 'rgb(6, 95, 212)';
  const DISLIKECOLOR = 'rgb(204, 204, 204)';
  const FLAG = SCRIPTNAME.toLowerCase();/*dataset name to add for videos to append a RatingBar*/
  const MAXRESULTS = 48;/* API limits 50 videos per request */
  const APIKEY = 'AIzaSyAyOgssM7s_vvOUDV0ZTRvk6LrTwr_1f5k';
  const API = `https://www.googleapis.com/youtube/v3/videos?id={ids}&part=statistics&fields=items(id,statistics)&maxResults=${MAXRESULTS}&key=${APIKEY}`;
  const VIEWS = {
    home:    /^https:\/\/www\.youtube\.com\/(\?.+)?$/,
    feed:    /^https:\/\/www\.youtube\.com\/feed\//,
    results: /^https:\/\/www\.youtube\.com\/results\?/,
    watch:   /^https:\/\/www\.youtube\.com\/watch\?/,
    channel: /^https:\/\/www\.youtube\.com\/channel\//,
    default: /^https:\/\/www\.youtube\.com\//,
  };
  const VIDEOID = /\?v=([^&]+)/;/*video id in URL parameters*/
  let site = {
    targets: {
      home: {
        videos: () => [...$$('ytd-grid-video-renderer'), ...$$('ytd-video-renderer')],
        anchor: (item) => item.querySelector('a'),
        insertAfter: (item) => item.querySelector('#metadata-line'),
      },
      feed: {
        videos: () => [...$$('ytd-grid-video-renderer'), ...$$('ytd-video-renderer')],
        anchor: (item) => item.querySelector('a'),
        insertAfter: (item) => item.querySelector('#metadata-line'),
      },
      results: {
        videos: () => $$('ytd-video-renderer'),
        anchor: (item) => item.querySelector('a'),
        insertAfter: (item) => item.querySelector('#metadata-line'),
      },
      watch: {
        videos: () => $$('ytd-compact-video-renderer'),
        anchor: (item) => item.querySelector('a'),
        insertAfter: (item) => item.querySelector('#metadata-line'),
      },
      channel: {
        videos: () => [...$$('ytd-grid-video-renderer'), ...$$('ytd-video-renderer')],
        anchor: (item) => item.querySelector('a'),
        insertAfter: (item) => item.querySelector('#metadata-line'),
      },
      default: {
        videos: () => [...$$('ytd-grid-video-renderer'), ...$$('ytd-video-renderer')],
        anchor: (item) => item.querySelector('a'),
        insertAfter: (item) => item.querySelector('#metadata-line'),
      },
    },
    get: {
      api: (ids) => API.replace('{ids}', ids.join()),
      bar: (item) => item.querySelector('#container'),
    },
  };
  let html, elements = {}, storages = {}, timers = {}, targets, cache = {}, videoIdTable = {}, queue = [];
  let core = {
    initialize: function(){
      html = document.documentElement;
      html.classList.add(SCRIPTNAME);
      core.observeItems();
      core.addStyle();
    },
    observeItems: function(){
      let previousUrl = '';
      timers.observeItems = setInterval(function(){
        if(document.hidden) return;
        /* get target of the current page */
        if(location.href !== previousUrl){
          let key = Object.keys(VIEWS).find(label => location.href.match(VIEWS[label]));
          targets = site.targets[key];
          previousUrl = location.href;
        }
        /* get the target videos of the current page */
        if(targets){
          core.getVideos(targets);
        }
        /* get ratings from the API */
        if(queue[0] && queue[0].length){
          core.getRatings(queue.shift());
        }
      }, INTERVAL);
    },
    getVideos: function(targets){
      let items = targets.videos();
      if(items.length === 0) return;
      /* pushes id to the queue */
      const push = function(id){
        for(let i = 0; true; i++){
          if(queue[i] === undefined) queue[i] = [];
          if(queue[i].length < MAXRESULTS){
            queue[i].push(id);
            break;
          }
        }
      };
      /* push ids to the queue */
      for(let i = 0, item; item = items[i]; i++){
        let a = targets.anchor(item);
        if(!a || !a.href) continue;
        let m = a.href.match(VIDEOID), id = m ? m[1] : null;
        if(id === null) continue;
        if(item.dataset[FLAG] === id) continue;/*sometimes DOM was reused for a different video*/
        item.dataset[FLAG] = id;/*flag for video found*/
        if(!videoIdTable[id]) videoIdTable[id] = [item];
        else videoIdTable[id].push(item);
        if(cache[id]) core.appendBar(item, cache[id]);
        else push(id);
      }
    },
    getRatings: function(ids){
      fetch(site.get.api(ids))
      .then(response => response.json())
      .then(json => {
        log(json);
        let items = json.items;
        if(!items || !items.length) return;
        for(let i = 0, item; item = items[i]; i++){
          videoIdTable[item.id] = videoIdTable[item.id].filter(v => v.isConnected);
          videoIdTable[item.id].forEach(v => {
            core.appendBar(v, item.statistics);
          });
          cache[item.id] = item.statistics;
        }
      });
    },
    appendBar: function(item, statistics){
      let s = statistics, likes = parseInt(s.likeCount), dislikes = parseInt(s.dislikeCount);
      if(s.likeCount === undefined) return;
      if(likes === 0 && dislikes === 0) return;
      let height = (RELIABLECOUNT < likes + dislikes) ? HEIGHT : THINHEIGHT;
      let percentage = (likes / (likes + dislikes)) * 100;
      let bar = createElement(core.html.bar(height, percentage));
      let insertAfter = targets.insertAfter(item);
      if(site.get.bar(item)){/*bar already exists*/
        insertAfter.parentNode.replaceChild(bar, insertAfter.nextElementSibling);
      }else{
        insertAfter.parentNode.insertBefore(bar, insertAfter.nextElementSibling);
      }
    },
    addStyle: function(name = 'style'){
      let style = createElement(core.html[name]());
      document.head.appendChild(style);
      if(elements[name] && elements[name].isConnected) document.head.removeChild(elements[name]);
      elements[name] = style;
    },
    html: {
      bar: (height, percentage) => `
        <div id="container" class="style-scope ytd-sentiment-bar-renderer" style="height:${height}px; background-color:${DISLIKECOLOR}">
          <div id="like-bar" class="style-scope ytd-sentiment-bar-renderer" style="height:${height}px; width:${percentage}%; background-color:${LIKECOLOR}"></div>
        </div>
      `,
      style: () => `
        <style type="text/css">
          /* maximize bar width */
          #container.ytd-sentiment-bar-renderer,
          .metadata.ytd-compact-video-renderer{
            width: 100%;
          }
          /* rating bars */
          #container.ytd-sentiment-bar-renderer{
            margin-bottom: 1px;/*gap for LIVE, NEW banner*/
            animation: ${SCRIPTNAME}-show 250ms 1;/*softly show bars*/
          }
          @keyframes ${SCRIPTNAME}-show{
            from{
              opacity: 0;
            }
            to{
              opacity: 1;
            }
          }
        </style>
      `,
    },
  };
  if(!('isConnected' in Node.prototype)) Object.defineProperty(Node.prototype, 'isConnected', {get: function(){return document.contains(this)}});
  class Storage{
    static key(key){
      return (SCRIPTNAME) ? (SCRIPTNAME + '-' + key) : key;
    }
    static save(key, value, expire = null){
      key = Storage.key(key);
      localStorage[key] = JSON.stringify({
        value: value,
        saved: Date.now(),
        expire: expire,
      });
    }
    static read(key){
      key = Storage.key(key);
      if(localStorage[key] === undefined) return undefined;
      let data = JSON.parse(localStorage[key]);
      if(data.value === undefined) return data;
      if(data.expire === undefined) return data;
      if(data.expire === null) return data.value;
      if(data.expire < Date.now()) return localStorage.removeItem(key);
      return data.value;
    }
    static delete(key){
      key = Storage.key(key);
      delete localStorage.removeItem(key);
    }
    static saved(key){
      key = Storage.key(key);
      if(localStorage[key] === undefined) return undefined;
      let data = JSON.parse(localStorage[key]);
      if(data.saved) return data.saved;
      else return undefined;
    }
  }
  const $ = function(s){return document.querySelector(s)};
  const $$ = function(s){return document.querySelectorAll(s)};
  const animate = function(callback, ...params){requestAnimationFrame(() => requestAnimationFrame(() => callback(...params)))};
  const wait = function(ms){return new Promise((resolve) => setTimeout(resolve, ms))};
  const createElement = function(html = '<span></span>'){
    let outer = document.createElement('div');
    outer.innerHTML = html;
    return outer.firstElementChild;
  };
  const observe = function(element, callback, options = {childList: true, attributes: false, characterData: false}){
    let observer = new MutationObserver(callback.bind(element));
    observer.observe(element, options);
    return observer;
  };
  const atLeast = function(min, b){
    return Math.max(min, b);
  };
  const atMost = function(a, max){
    return Math.min(a, max);
  };
  const between = function(min, b, max){
    return Math.min(Math.max(min, b), max);
  };
  const log = function(){
    if(!DEBUG) return;
    let l = log.last = log.now || new Date(), n = log.now = new Date();
    let error = new Error(), line = log.format.getLine(error), callers = log.format.getCallers(error);
    //console.log(error.stack);
    console.log(
      SCRIPTNAME + ':',
      /* 00:00:00.000  */ n.toLocaleTimeString() + '.' + n.getTime().toString().slice(-3),
      /* +0.000s       */ '+' + ((n-l)/1000).toFixed(3) + 's',
      /* :00           */ ':' + line,
      /* caller.caller */ (callers[2] ? callers[2] + '() => ' : '') +
      /* caller        */ (callers[1] || '') + '()',
      ...arguments
    );
  };
  log.formats = [{
      name: 'Firefox Scratchpad',
      detector: /MARKER@Scratchpad/,
      getLine: (e) => e.stack.split('\n')[1].match(/([0-9]+):[0-9]+$/)[1],
      getCallers: (e) => e.stack.match(/^[^@]*(?=@)/gm),
    }, {
      name: 'Firefox Console',
      detector: /MARKER@debugger/,
      getLine: (e) => e.stack.split('\n')[1].match(/([0-9]+):[0-9]+$/)[1],
      getCallers: (e) => e.stack.match(/^[^@]*(?=@)/gm),
    }, {
      name: 'Firefox Greasemonkey 3',
      detector: /\/gm_scripts\//,
      getLine: (e) => e.stack.split('\n')[1].match(/([0-9]+):[0-9]+$/)[1],
      getCallers: (e) => e.stack.match(/^[^@]*(?=@)/gm),
    }, {
      name: 'Firefox Greasemonkey 4+',
      detector: /MARKER@user-script:/,
      getLine: (e) => e.stack.split('\n')[1].match(/([0-9]+):[0-9]+$/)[1] - 500,
      getCallers: (e) => e.stack.match(/^[^@]*(?=@)/gm),
    }, {
      name: 'Firefox Tampermonkey',
      detector: /MARKER@moz-extension:/,
      getLine: (e) => e.stack.split('\n')[1].match(/([0-9]+):[0-9]+$/)[1] - 6,
      getCallers: (e) => e.stack.match(/^[^@]*(?=@)/gm),
    }, {
      name: 'Chrome Console',
      detector: /at MARKER \(<anonymous>/,
      getLine: (e) => e.stack.split('\n')[2].match(/([0-9]+):[0-9]+\)$/)[1],
      getCallers: (e) => e.stack.match(/[^ ]+(?= \(<anonymous>)/gm),
    }, {
      name: 'Chrome Tampermonkey',
      detector: /at MARKER \((userscript\.html|chrome-extension:)/,
      getLine: (e) => e.stack.split('\n')[2].match(/([0-9]+)\)$/)[1] - 6,
      getCallers: (e) => e.stack.match(/[^ ]+(?= \((userscript\.html|chrome-extension:))/gm),
    }, {
      name: 'Edge Console',
      detector: /at MARKER \(eval/,
      getLine: (e) => e.stack.split('\n')[2].match(/([0-9]+):[0-9]+\)$/)[1],
      getCallers: (e) => e.stack.match(/[^ ]+(?= \(eval)/gm),
    }, {
      name: 'Edge Tampermonkey',
      detector: /at MARKER \(Function/,
      getLine: (e) => e.stack.split('\n')[2].match(/([0-9]+):[0-9]+\)$/)[1] - 4,
      getCallers: (e) => e.stack.match(/[^ ]+(?= \(Function)/gm),
    }, {
      name: 'Safari',
      detector: /^MARKER$/m,
      getLine: (e) => 0,/*e.lineが用意されているが最終呼び出し位置のみ*/
      getCallers: (e) => e.stack.split('\n'),
    }, {
      name: 'Default',
      detector: /./,
      getLine: (e) => 0,
      getCallers: (e) => [],
    }];
  log.format = log.formats.find(function MARKER(f){
    if(!f.detector.test(new Error().stack)) return false;
    //console.log('//// ' + f.name + '\n' + new Error().stack);
    return true;
  });
  core.initialize();
  if(window === top && console.timeEnd) console.timeEnd(SCRIPTNAME);
})();