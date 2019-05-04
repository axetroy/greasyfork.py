// ==UserScript==
// @name        NicoNico Tsuu
// @namespace   knoa.jp
// @description ニコニコライフを快適に。
// @include     https://live2.nicovideo.jp/watch/*
// @version     0.1.6
// @grant       none
// ==/UserScript==
/*
(コメントJSONの例)
anonymity : 1
content : "/hb ifseetno 686"
date : 1556109561
date_usec : 880193
mail : "184"
premium : 3
thread : 1649308673
user_id : "SaMpLe"
vpos : 4256100
yourpost : 1
*/

(function(){
  const SCRIPTNAME = 'NicoNicoTsuu';
  const DEBUG = true;/*

  */
  if(window === top && console.time) console.time(SCRIPTNAME);
  const API = {
    LIVEMSG: 'wss://msg.live2.nicovideo.jp/',
  };
  const PREMIUM = {
    USER: 1,
    USERAD: 2,/*広告(?)*/
    OPERATOR: 3,
    GUEST: 7,/*公式ゲストコメント(?)*/
    CHANNEL8: 8,/*チャンネル会員(?)*/
    CHANNEL9: 9,/*チャンネル会員(?)*/
    CHANNEL24: 24,/*未入会(?)*/
    CHANNEL25: 25,/*未入会(?)*/
  };
  const RETRY = 10;
  let site = {
    targets: {
      playerDisplayHeader: () => $('[class*="_player-display-header_"]'),/*運営コメント*/
      playerDisplayScreen: () => $('[class*="_player-display-screen_"]'),
      interactionLayerContent: () => $('[class*="_interaction-layer_"] > [data-content-visibility]'),/*アンケート*/
      fullscreenButton: () => $('[class*="_fullscreen-button_"]'),
      commentTextBox: () => $('[class*="_comment-text-box_"]'),
      commentsTable: () => $('[class*="_comment-panel_"] [class*="_table_"]'),
      embeddedData: () => $('#embedded-data'),
    },
    get: {
      announcement: (playerDisplayHeader) => playerDisplayHeader.querySelector('[class*="_announcement-renderer_"]'),
      content: (comment) => comment.querySelector('[class*="_comment-text_"]'),
      time: (comment) => comment.querySelector('[class*="_comment-time_"]'),
      props: (embeddedData) => JSON.parse(embeddedData.dataset.props),
    },
    addedNodes: {
      comment: (node) => (['normal', 'trialWatch'].includes(node.dataset.commentType)) ? node : null,
    },
  };
  let html, elements = {}, storages = {}, timers = {}, props, chats = [], users = {}/*id検索用テーブル*/;
  let core = {
    initialize: function(){
      html = document.documentElement;
      html.classList.add(SCRIPTNAME);
      core.ready();
      core.addStyle();
    },
    ready: function(){
      core.getTargets(site.targets, RETRY).then(() => {
        log("I'm ready.");
        core.getProps();
        core.listenUserActions();
        core.listenComments();
        core.listenEnquete();
        core.observeCommentTable();
      });
    },
    getProps: function(){
      props = site.get.props(elements.embeddedData);
      log(props);
    },
    listenUserActions: function(){
      /* キーボード */
      window.addEventListener('keypress', function(e){
        switch(true){
          /* 以下、テキスト入力中は反応しない */
          case(['input', 'textarea'].includes(document.activeElement.localName)):
            return;
          /* Alt/Shift/Ctrl/Metaキーが押されていたら反応しない */
          case(e.altKey || e.shiftKey || e.ctrlKey || e.metaKey):
            return;
          case(e.key === ' '):
            /* コメント入力欄にフォーカス */
            return elements.commentTextBox.focus();
        }
      });
      /* 映像クリックで常にコメント入力欄にフォーカス */
      elements.playerDisplayScreen.addEventListener('click', function(e){
        elements.commentTextBox.focus();
      });
      /* ウィンドウフォーカス */
      window.addEventListener('focus', function(e){
        /* 常にコメント入力欄にフォーカス */
        elements.commentTextBox.focus();
      });
      /* フルスクリーン状態の変化 */
      observe(html, function(records){
        if(html.dataset.browserFullscreen) return;/*フルスクリーン化したときは何もしない*/
        setTimeout(window.scrollTo.bind(window, 0, 0), 0);/*スクロール位置がずれるのを即補正*/
        setTimeout(core.observeCommentTable, 1000);/*commentsTableが復活するのでもう一度監視する*/
      }, {attributes: true});
      /* ウィンドウリサイズ */
      window.addEventListener('resize', function(e){
        /* ニコ生コメント一覧付き全画面シアターとの連携(なめらかスクロールをこちらで引き受ければ本来不要な処理のはず) */
        clearTimeout(window.resizing), window.resizing = setTimeout(function(){
          if(document.fullscreenElement) return;/*モニタフルスクリーン時は何もしない*/
          elements.fullscreenButton.click();
          elements.fullscreenButton.click();
          window.resizing = null;
        }, 250);/*リサイズ中の連続起動を避ける*/
      });
    },
    listenComments: function(){
      /* 公式の通信内容を取得 */
      window.WebSocket = new Proxy(WebSocket, {
        construct(target, arguments){
          const ws = new target(...arguments);
          log(ws, arguments);
          if(ws.url.startsWith(API.LIVEMSG)) ws.addEventListener('message', function(e){
            let json = JSON.parse(e.data);
            //log(json);
            if(![1,3,undefined].includes(json.chat.premium)) log(json.chat);
            if(json.chat === undefined) return;
            if(json.chat.premium === PREMIUM.OPERATOR) return;
            chats.push(json.chat);
            if(users[json.chat.user_id] === undefined) users[json.chat.user_id] = [];
            users[json.chat.user_id].push(json.chat);
          });
          return ws;
        }
      });
    },
    listenEnquete: function(){
      /* アンケートの表示を捉える */
      Notification.requestPermission();
      let notification, title = props.program.title;
      observe(elements.interactionLayerContent, function(records){
        if(notification) notification.close();/*古い通知が出たままなら閉じる*/
        if(elements.interactionLayerContent.dataset.contentVisibility === 'false') return;/*閉じたときは何もしない*/
        notification = new Notification(title, {body: site.get.announcement(elements.playerDisplayHeader).textContent});
        notification.addEventListener('click', function(e){
          notification.close();
        });
      }, {attributes: true});
    },
    observeCommentTable: function(){
      if(!elements.commentsTable || !elements.commentsTable.isConnected) elements.commentsTable = site.targets.commentsTable();
      if(elements.commentsTable.observing) return;/*起こりえないけど重複を避ける*/
      elements.commentsTable.observing = true;
      Array.from(elements.commentsTable.children).forEach(c => core.modifyComment(c));
      observe(elements.commentsTable, function(records){
        //log(records);
        records.forEach(r => {
          if(r.addedNodes.length === 0) return;
          if(site.addedNodes.comment(r.addedNodes[0]) === null) return;
          core.modifyComment(r.addedNodes[0]);
        });
      });
    },
    modifyComment: function(commentNode){
      const additionalVpos = props.program.beginTime - props.program.openTime;
      const toVpos = function(time){
        let sign = (time[0] === '-') ? -1 : +1;
        let p = time.split(':').map(d => parseFloat(d)), s = 100, m = 60*s, h = 60*m;
        if(p[2]) return additionalVpos + sign * (sign*p[0]*h + p[1]*m + p[2]*s);
        if(p[1]) return additionalVpos + sign * (sign*p[0]*m + p[1]*s);
        if(p[0]) return additionalVpos + sign * (sign*p[0]*s);
      };
      let contentNode = site.get.content(commentNode), timeNode = site.get.time(commentNode);
      let content = contentNode.textContent, vpos = toVpos(timeNode.textContent);
      linkify(contentNode);/*URLをリンク化*/
      for(let i = chats.length - 1, chat; chat = chats[i]; i--){
        if(!between(vpos, chat.vpos, vpos + 100)) continue;
        if(chat.content !== content) continue;
        if(chat.commentNode && chat.commentNode.isConnected) continue;
        /* 晴れてペアとなるchatを見つけられたので */
        chats[i].commentNode = commentNode;
        commentNode.dataset.score = chat.score || 0;
        commentNode.dataset.premium = chat.premium || 0;
        commentNode.dataset.user_id = chat.user_id;
        timeNode.parentNode.insertBefore(createElement(core.html.score(commentNode.dataset.score)), timeNode);
        //commentNode.addEventListener('click', core.showUserHistory.bind(commentNode), {capture: true});
        break;
      }
    },
    showUserHistory: function(e){
      let commentNode = this, user_id = commentNode.dataset.user_id;
      log(this, user_id, users[user_id]);
    },
    getTargets: function(targets, retry = 0){
      const get = function(resolve, reject, retry){
        for(let i = 0, keys = Object.keys(targets), key; key = keys[i]; i++){
          let selected = targets[key]();
          if(selected){
            if(selected.length) selected.forEach((s) => s.dataset.selector = key);
            else selected.dataset.selector = key;
            elements[key] = selected;
          }else{
            if(--retry < 0) return reject(log(`Not found: ${key}, I give up.`));
            log(`Not found: ${key}, retrying... (left ${retry})`);
            return setTimeout(get, 1000, resolve, reject, retry);
          }
        }
        resolve();
      };
      return new Promise(function(resolve, reject){
        get(resolve, reject, retry);
      });
    },
    addStyle: function(name = 'style'){
      let style = createElement(core.html[name]());
      document.head.appendChild(style);
      if(elements[name] && elements[name].isConnected) document.head.removeChild(elements[name]);
      elements[name] = style;
    },
    html: {
      score: (score) => `<span class="___comment-score___${SCRIPTNAME}">${score}</span>`,
      style: () => `
        <style type="text/css">
          dummy [class*="_comment-panel_"] [class*="_table-row_"][data-comment-type="normal"]{
            cursor: pointer;/*ユーザー発言一覧用*/
          }
          [class*="_comment-panel_"] [class*="_table-row_"] [class="___comment-score___${SCRIPTNAME}"]{
            visibility: hidden;
            margin: 0 .25em;
          }
          [class*="_comment-panel_"] [class*="_table-row_"]:hover [class="___comment-score___${SCRIPTNAME}"]{
            visibility: visible;
            color: #808080;
          }
        </style>
      `,
    },
  };
  if(!('isConnected' in Node.prototype)) Object.defineProperty(Node.prototype, 'isConnected', {get: function(){return document.contains(this)}});
  if(!('fullscreenElement' in document)) Object.defineProperty(document, 'fullscreenElement', {get: function(){return document.mozFullScreenElement}});
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
  const linkify = function(node){
    split(node);
    function split(n){
      if(['style', 'script', 'a'].includes(n.localName)) return;
      if(n.nodeType === Node.TEXT_NODE){
        let pos = n.data.search(linkify.RE);
        if(0 <= pos){
          let target = n.splitText(pos);/*pos直前までのnとpos以降のtargetに分割*/
          let rest = target.splitText(RegExp.lastMatch.length);/*targetと続くrestに分割*/
          /* この時点でn(処理済み),target(リンクテキスト),rest(次に処理)の3つに分割されている */
          let a = document.createElement('a');
          let match = target.data.match(linkify.RE);
          switch(true){
            case(match[1] !== undefined): a.href = (match[1][0] == 'h') ? match[1] : 'h' + match[1]; break;
            case(match[2] !== undefined): a.href = 'http://' + match[2]; break;
            case(match[3] !== undefined): a.href = 'mailto:' + match[4] + '@' + match[5]; break;
          }
          a.appendChild(target);/*textContent*/
          rest.parentNode.insertBefore(a, rest);
        }
      }else{
        for(let i = 0; n.childNodes[i]; i++) split(n.childNodes[i]);/*回しながらchildNodesは増えていく*/
      }
    }
  };
  linkify.RE = new RegExp([
    '(h?ttps?://[-\\w_./~*%$@:;,!?&=+#]+[-\\w_/~*%$@:;&=+#])',/*通常のURL*/
    '((?:\\w+\\.)+\\w+/[-\\w_./~*%$@:;,!?&=+#]*)',/*http://の省略形*/
    '((\\w[-\\w_.]+)(?:@|＠)(\\w[-\\w_.]+\\w))',/*メールアドレス*/
  ].join('|'));
  const secondsToTime = function(seconds){
    let floor = Math.floor, zero = (s) => s.toString().padStart(2, '0');
    let h = floor(seconds/3600), m = floor(seconds/60)%60, s = floor(seconds%60);
    if(h) return h + '時間' + zero(m) + '分' + zero(s) + '秒';
    if(m) return m + '分' + zero(s) + '秒';
    if(s) return s + '秒';
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
  const time = function(label){
    const BAR = '|', TOTAL = 100;
    switch(true){
      case(label === undefined):/* time() to output total */
        let total = 0;
        Object.keys(time.records).forEach((label) => total += time.records[label].total);
        Object.keys(time.records).forEach((label) => {
          console.log(
            BAR.repeat((time.records[label].total / total) * TOTAL),
            label + ':',
            (time.records[label].total).toFixed(3) + 'ms',
            '(' + time.records[label].count + ')',
          );
        });
        time.records = {};
        break;
      case(!time.records[label]):/* time('label') to start the record */
        time.records[label] = {count: 0, from: performance.now(), total: 0};
        break;
      case(time.records[label].from === null):/* time('label') to re-start the lap */
        time.records[label].from = performance.now();
        break;
      case(0 < time.records[label].from):/* time('label') to add lap time to the record */
        time.records[label].total += performance.now() - time.records[label].from;
        time.records[label].from = null;
        time.records[label].count += 1;
        break;
    }
  };
  time.records = {};
  core.initialize();
  if(window === top && console.timeEnd) console.timeEnd(SCRIPTNAME);
})();