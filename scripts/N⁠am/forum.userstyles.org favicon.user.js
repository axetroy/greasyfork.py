// ==UserScript==
// @name           forum.userstyles.org favicon
// @version        1.0
// @description    For put the shortcut on bookmarkbar without title of the page.
// @include        https://forum.userstyles.org/*
// @namespace https://greasyfork.org/users/201299
// ==/UserScript==

var favicon_link_html = document.createElement('link');
favicon_link_html.rel = 'icon';
favicon_link_html.href = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAe5JREFUWAntV7FOAkEQnVmOwmBlAlhK6C0IhMZoYYsdwUBhIcFKO3vXL7A1JrYUhJgYbE2MscEQiLYWVyKQmBhjJdw4exECp8DlgLvGTe5ud2f2zdu9mc0MwlCTJMVV4z2DBDkgiLMoRAC+IZWR7nP8DNVEM7XBan83ROyxpA1ANUAshmPbJZTS6GubAGqw/nQcga9embuxvnDa1w6BXxiIdQRMr1budSUT6qWMY7dX5a5t42qdo0YUI6Lq685mRK0X6tjVzokg6AjQ0SIKElCZpBTiuvGxyxiL37mVKJ9Eq36bEQYZWavMtTFRTvx4u2s2Rw1hXDlhaHTS1VFITIrzRVPhaPCZYbhoQ5PwtUlCuzLehbSra9WbC4HwzcOpFdjueC4EEhf6ll2DVr25ECCje2cFtjv23An/CfyfgMZpkrTrsYvQG6Rks4DHz1/G5oTTcLXPy5WTaUrj5IH8m+MbsI+pGeT8HmeQmQl4HwWIoPJ2T5qqGTglQy4avGnsuW31C2remAdArpY4JcOiVwSISzWxnD8s8b+ou06CbaYK0ZLgi9Dw+bU034gd10ggdITQ0hLRMMNwaa+la34t6cpJ8M6F8CcfC2u62vDgHlAkAvtHCZ7KcvVa4ac5jxA1y3M0sSogMJs6iCb6xhWBbzc2h0a44FEWAAAAAElFTkSuQmCC';
favicon_link_html.type = 'image/x-icon';

try {
  document.getElementsByTagName('head')[0].appendChild( favicon_link_html );
}
catch(e) { }