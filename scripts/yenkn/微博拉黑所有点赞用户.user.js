// ==UserScript==
// @name         微博拉黑所有点赞用户
// @namespace    http://yenkn.com/
// @version      0.1
// @description  批量拉黑微博点赞用户
// @author       Yenkn
// @match        *://weibo.com/*
// @require      https://cdn.bootcss.com/xhook/1.4.9/xhook.min.js
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.blockAll = async () => {
  const users = document.querySelectorAll('ul[node-type="commentLikeList"] li[uid]');
  const uids = Array.from(users).map(x => x.attributes.uid.value);

  for(const uid of uids) {
    const res = await fetch('https://weibo.com/aj/filter/block?ajwvr=6', {
      method: 'POST',
      body: `uid=${uid}&filter_type=1&status=1&interact=1&follow=1`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    const data = await res.json()
    const item = document.querySelector(`li[uid="${uid}"]`)
    item.style.height = 'auto'
    item.style.lineHeight = 'inherit'
    item.appendChild(document.createTextNode(data.msg))
  }
}

xhook.after(function(request, response) {
  if(request.url.indexOf('/aj/like/object/big') !== -1) {
    response.text = response.text.replace('<\\/ul>','<\\/ul><div><a href=\\"javascript:blockAll();\\">拉黑本页全部<\\/a><\\/div>');
  }
});
})();