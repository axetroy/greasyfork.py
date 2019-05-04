// ==UserScript==
// @name         qqmail_jump
// @version      0.0.1
// @include      https://mail.qq.com/*
// @include      https://en.mail.qq.com/*
// @description  skip link check
// @grant        unsafeWindow
// @namespace    https://greasyfork.org/users/164996a
// ==/UserScript==
const o = window.open
unsafeWindow.open = (u, ...args) => {
  u = new URL(u).searchParams
  if (u.get('action') === 'check_link') {
    u = u.get('url')
  } else {
    u = u.href
  }
  o(u, ...args)
}
