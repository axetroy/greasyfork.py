// ==UserScript==
// @name        NexusPHP PT Helper
// @name:zh-CN  NexusPHP PT 助手
// @namespace   https://greasyfork.org/zh-CN/users/163820-ysc3839
// @version     0.1.4
// @description Helper script for NexusPHP based PT sites.
// @description:zh-CN 适用于基于 NexusPHP 的 PT 站的辅助脚本
// @author      ysc3839
// @match       *://hdhome.org/*
// @match       *://bt.byr.cn/*
// @require     https://cdn.jsdelivr.net/npm/jquery@3.3
// @grant       GM_setClipboard
// @run-at      document-end
// ==/UserScript==

(function($) {
  'use strict';

  function extend(object, method, callback) {
    const original = object[method];

    object[method] = function(...args) {
      const value = original ? original.apply(this, args) : undefined;

      callback.apply(this, [value].concat(args));

      return value;
    };

    Object.assign(object[method], original);
  }
  
  function override(object, method, newMethod) {
    const original = object[method];

    object[method] = function(...args) {
      return newMethod.apply(this, [original.bind(this)].concat(args));
    };

    Object.assign(object[method], original);
  }

  $('html > head').append($(`<style>
.my_selected { background-color: #7c98ae; }
td.rowfollow button { font-size: 9pt; }
</style>`));

  function createTorrentAnchor(title, href, text, nocopy) {
    const a = $('<a>');
    if (!nocopy) {
      a.click(function(event) {
        event.preventDefault();
        GM_setClipboard(this.href);
        if (!$(this).data('copied'))
          $(this).data('copied', true).parent().prev().append('(已复制)');
      });
    }
    return a.addClass('altlink_blue').attr('title', title).attr('href', href).text(text);
  }

  function addTrSelect(trlist) {
    trlist.first().prepend('<td class="colhead" align="center">选中</td><td class="colhead" align="center">链接</td>');

    const seltd = $('<td class="rowfollow nowrap" style="padding: 0px;" align="center"></td>');
    const copytd = seltd.clone();
    seltd.append($('<input type="checkbox" style="zoom: 1.5;">').click(function(event) {
      $(this).parents().eq(1).toggleClass('my_selected');
    }).mousedown(function(e) { e.stopPropagation(); }));
    copytd.append($('<button class="btn">复制</button>').click(function() {
      passkey = localStorage.getItem('passkey');
      if (!passkey) {
        alert('No passkey!');
        return;
      }
      GM_setClipboard(getTorrentURL($(this).parent().nextAll().eq(1).find('a').get(0).href));
      if (!$(this).data('copied'))
        $(this).data('copied', true).parent().append('<br>(已复制)');
    }));

    let mousedown = false;
    seltd.mousedown(function(event) {
      event.preventDefault();
      mousedown = true;
      $(this).children().click();
    }).mouseenter(function() {
      if (mousedown)
        $(this).children().click();
    });
    $(document).mouseup(function(event) {
      event.preventDefault();
      mousedown = false;
    });

    trlist.not(':first').prepend(copytd).prepend(seltd);
  }

  if (location.pathname === '/details.php') {
    const tr = $('#outer > table > tbody > tr:eq(5)');
    if (location.hostname === 'bt.byr.cn') {
      const newtr = $('<tr><td class="rowhead nowrap" valign="top" align="right">种子链接</td><td class="rowfollow" valign="top" align="left"><a></a></td></tr>');
      const passkey = localStorage.getItem('passkey');
      let title = '没有 passkey, 点此打开控制面板获取 passkey';
      let href = '/usercp.php';
      let text = title;
      let nocopy = true;
      if (passkey) {
        const url = new URL($('#outer > table > tbody > tr:eq(3) a').get(0).href);
        url.searchParams.append('passkey', passkey);
        text = href = url.href;
        title = '';
        nocopy = false;
      }
      newtr.find('a').replaceWith(createTorrentAnchor(title, href, text, nocopy));
      tr.before(newtr);
    } else {
      const b = tr.find('b');
      const url = new URL(b.text());
      localStorage.setItem('passkey', url.searchParams.get('passkey'));
      b.replaceWith(createTorrentAnchor(b.attr('title'), b.text(), b.text(), false));
    }
  } else if (location.pathname === '/usercp.php') {
    const url = new URL(location);
    if(!url.searchParams.get('action')) {
      let passkey = null;
      $('#outer > table > tbody:eq(1) > tr:gt(2)').each(function() {
        const names = ['passkey', '密钥'];
        const name = $(this).children().eq(0).text();
        if (names.includes(name)) {
          passkey = $(this).children().eq(1).text();
          return false;
        }
      });
      if (passkey)
        localStorage.setItem('passkey', passkey);
      else
        localStorage.removeItem('passkey');
    }
  } else if (location.pathname === '/torrents.php') {
    const trlist = $('.torrents > tbody > tr');
    addTrSelect(trlist);
    trlist.first().children().first().css('padding', '0px').text('').append($('<button style="font-size: 9pt;">复制</button>').click(function() {
      passkey = localStorage.getItem('passkey');
      if (!passkey) {
        alert('No passkey!');
        return;
      }
      let text = '';
      $(this).parents().eq(1).siblings('.my_selected').find('a:nth(1)').each(function() {
        text += getTorrentURL(this.href) + '\n';
      });
      GM_setClipboard(text);
    }));
  }

  let passkey = null;

  function getTorrentURL(urltext) {
    const url = new URL(urltext);
    const id = url.searchParams.get('id');
    url.pathname = '/download.php';
    url.search = '';
    url.searchParams.set('id', id);
    url.searchParams.set('passkey', passkey);
    return url.href;
  }

  override(unsafeWindow, 'getusertorrentlistajax', function(original, userid, type, blockid) {
    if (original(userid, type, blockid)) {
      const blockdiv = $('#' + blockid);

      /*blockdiv.prepend($('<button class="btn">打开选中</button>').click(function() {
      }));*/
      blockdiv.prepend($('<button class="btn">复制选中链接</button>').click(function() {
        passkey = localStorage.getItem('passkey');
        if (!passkey) {
          alert('No passkey!');
          return;
        }
        let text = '';
        $(this).parent().find('tr.my_selected > td:nth-child(4) > a').each(function() {
          text += getTorrentURL(this.href) + '\n';
        });
        GM_setClipboard(text);
      }));

      const trlist = blockdiv.find('table > tbody > tr');
      addTrSelect(trlist);
    }
    return true;
  });
})($.noConflict());
