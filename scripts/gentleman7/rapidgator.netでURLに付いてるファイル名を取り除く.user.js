// ==UserScript==
// @name        rapidgator.netでURLに付いてるファイル名を取り除く
// @description 文字化けしたファイル名が付いているとダウンロードできないので余計なURLを取り除く
// @namespace   gentleman7
// @include     http://rapidgator.net/file/*/*
// @version     1.0
// @run-at      document-start
// ==/UserScript==

'use strict';

let m = location.pathname.match(String.raw`^/file/([\d\w]+)/.+`);

if (m !== null) {
  location.replace(`http://rapidgator.net/file/${m[1]}/`);
}

