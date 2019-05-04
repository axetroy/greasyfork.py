// ==UserScript==
// @name           nicoranking restyle
// @namespace      nicoranking
// @description    ニコニコランキングページのサイドバーデザインを変更する
// @grant          none
// @author         TNB
// @match          *://www.nicovideo.jp/ranking/fav/*
// @version        1.9.81
// @run-at         document-start
// ==/UserScript==

'use strict';

var setting = {                // trueでオン、falseでオフ切り替え
  adCommentFilter: true,       // ランキング動画のポップアップコメントを非表示にする
  trendTagRestyle: true,       // トレンドランキングのコンテンツを上側にする
  trendTagCommentFilter: true  // トレンドランキングのポップアップコメントを非表示にする
};

var nicorankingRestyle = {
  order: '',
  style: '',
  control: '',
  save: function() {
    localStorage.setItem('nicorankingRestyle', JSON.stringify(this.order));
  },
  load: function(num) {
    var title = this.getHeader(num).getElementsByClassName('title')[0].textContent;
    for (var i = 0; i < this.order.length; i++) {
      if (title == this.order[i].title) return i;
    }
  },
  isLoaded: function() {
    var t = setInterval(() => {
      if (document.getElementsByClassName('content list').length) {
        clearInterval(t);
        this.init();
      }
    }, 100);
  },
  init: function() {
    this.order = localStorage.nicorankingRestyle? JSON.parse(localStorage.nicorankingRestyle): this.createData();
    this.style = document.head.appendChild(document.createElement('style'));
    this.createIcon();
  },
  createData: function() {
    var title,
        a = [],
        header = document.getElementsByClassName('content list');
    for (var i = 0; i < header.length; i++) {
      title = header[i].getElementsByClassName('title')[0].textContent;
      a[i] = {'title': title, 'hide': false};
    }
    return a;
  },
  addStyle: function() {
    var cssRules = {
      adCommentFilter: '.adComment,.itemThumbWrap:before{display:none !important;}',
      trendTagRestyle: '#trendtag>div{position:absolute;top:-297px;border-top:1px dotted #DBDBDB;border-radius:4px;}',
      trendTagCommentFilter: '.discriptionBox{display:none !important;}'
    };
    this.style.innerHTML += '.arrowRcolumn{position:relative;margin-left:25px;float:left !important;z-index:999;}.ads{display:none !important;}.toFeedback{top:5px !important;}.contentsHide{overflow-y:hidden;max-height:0;opacity:0;padding:0 0 0 12px !important;transition:all .5s;}';
    for (var i in setting) if(setting[i]) this.style.innerHTML += cssRules[i];
  },
  createIcon: function() {
    var s = '',
        clone = [],
        cloneOrder = [],
        header = document.getElementsByClassName('content list'),
        icon = [
      ['', 'position:absolute;left:0;width:34px;height:34px;'],
      [String.fromCodePoint(0x2B06), 'float:right;color:#666;font-size:22px;width:15px;margin:0 3px;'],
      [String.fromCodePoint(0x2B07), 'float:right;color:#666;font-size:22px;width:15px;margin:0 3px;']
    ],
    addVisibleClass = p => {
      var h = p.lastElementChild.offsetHeight;
      p.lastElementChild.classList.add('contentsVisible_' + i);
      s += '.contentsVisible_' + i + ' {max-height:' + h + 'px;opacity: 1;transition:all .5s ease-in;}';
    };

    for (var i = 0; i < header.length; i++) {
      var ele = header[i],
          title = ele.getElementsByClassName('title')[0].textContent;
      for (var j = 0, l = this.order.length; j < l; j++) {
        if (this.order[j].title == title) {
          addVisibleClass(ele);
          if (this.order[j].hide) ele.lastElementChild.classList.add('contentsHide');
          cloneOrder[j] = ele.cloneNode(true);
          break;
        }
        if (j == l - 1) {
          addVisibleClass(ele);
          cloneOrder.splice(this.order.length - 1, 0, ele);
          this.order.splice(this.order.length - 1, 0, {'title': title, 'hide': false});
        }
      }
    }

    clone = cloneOrder.filter(e => e != '');

    for (var m = 0; m < clone.length; m++) {
      var c = clone[m],
          w = c.firstElementChild.appendChild(document.createElement('div'));
      w.control = m;
      w.style.cssText = 'position:relative;width:100%;height:34px;';
      w.addEventListener('click', this, false);
      for (var n = 0; n < icon.length; n++) {
        var div = w.appendChild(document.createElement('div'));
        div.textContent = icon[n][0];
        div.style.cssText = 'display:inline-block;cursor:pointer;' + icon[n][1];
        header[m].parentElement.replaceChild(c, header[m]);
        if (c.id == 'trendtag') break;
      }
    }
    this.style.innerHTML += s;
    this.save();
    this.addStyle();
  },
  getHeader: function(num) {
    return document.getElementsByClassName('content list')[num];
  },
  contentsReplace: function(sign) {
    var pos = 0,
        num = this.control,
        next = sign == 11015? 1: -1,
        current = next * -1,
        nextHeader = this.getHeader(num + next),
        thisHeader = this.getHeader(num),
        nh = nextHeader.getBoundingClientRect().top,
        th = thisHeader.getBoundingClientRect().top,
        tc = thisHeader.cloneNode(true),
        nc = nextHeader.cloneNode(true),
        end = Math.abs(nh - th),
        addClone = () => {
      var getPane = ele => ele.firstElementChild.lastElementChild,
          tp = getPane(tc),
          np = getPane(nc),
          nextNum = this.load(getPane(nextHeader).control),
          currentNum = this.load(num),
          nextOrder = this.order[nextNum],
          currentOrder = this.order[currentNum];
      tp.control = num + next;
      np.control = num;
      tp.addEventListener('click', this, false);
      np.addEventListener('click', this, false);
      thisHeader.parentElement.replaceChild(nc, thisHeader);
      nextHeader.parentElement.replaceChild(tc, nextHeader);
      this.order[nextNum] = currentOrder;
      this.order[currentNum] = nextOrder;
      this.save();
    };

    if (!nextHeader || nextHeader.id == 'trendtag') return;
    nextHeader.style.cssText += 'position:relative;';
    thisHeader.style.cssText += 'position:relative;';
    var t = setInterval(() => {
      pos = end - pos <= pos? end: pos + Math.floor(end / 10);
      nextHeader.style.top = pos * current + 'px';
      thisHeader.style.top = pos * next + 'px';
      if (end <= pos) {
        clearInterval(t);
        addClone();
      }
    }, 25);
  },
  contentToggle: function() {
    var orderNum,
        num = this.control,
        header = this.getHeader(num),
        content = header.lastElementChild;
    content.classList.toggle('contentsHide');
    orderNum = this.load(num);
    this.order[orderNum].hide = this.order[orderNum].hide? false: true;
    this.save();
  },
  toggle: function(e) {
    if (e.textContent.length > 1) return;
    var t = e.textContent.charCodeAt(0);
    this.control = e.parentElement.control;
    if (t) this.contentsReplace(t);
    else this.contentToggle();
  },
  readAhead: function() {
    window.addEventListener('DOMContentLoaded', this, false);
  },
  handleEvent: function(e) {
    switch(e.type) {
      case 'DOMContentLoaded':
        this.isLoaded();
        break;
      case 'click':
        this.toggle(e.target);
        break;
    }
  }
};
nicorankingRestyle.readAhead();
