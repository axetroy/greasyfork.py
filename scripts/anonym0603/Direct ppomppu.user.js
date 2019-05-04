// ==UserScript==
// @name           Direct ppomppu
// @namespace      https://greasyfork.org/users/2425
// @description    뽐뿌에서 외부링크를 클릭하면 경유주소로 연결돼 쇼핑몰 바로접속이 해제되는 문제가 있습니다. 이 스크립트는 링크를 항상 다이렉트로 연결해줍니다.
// @include        http://*.ppomppu.co.kr/*
// @include        http://ppomppu.co.kr/*
// @author         anonymous
// @version        1.4
// @grant          none
// @run-at         document-end
// @id             fix@ppomppu
// @license        public domain
// ==/UserScript==


var anchors = document.getElementsByTagName('a');
var regexp = /target=([^&#]*)/g;

for (i in anchors) {
  if (!anchors[i].href) continue;

  if (anchors[i].href.match(/http:\/\/s.ppomppu.co.kr\S*target=/)) {
    while (match=regexp.exec(anchors[i].href))
      target = match[1];

    if (anchors[i].href.match(/&encode=on/)) {
      var decoded = atob(decodeURIComponent(target.replace(/\\/g,'')));
      // use dummy textarea to decode HTML entities
      // http://stackoverflow.com/questions/3700326/decode-amp-back-to-in-javascript
      var dummyel = document.createElement('textarea');
      dummyel.innerHTML = decoded;
      anchors[i].href = dummyel.innerText;
    }
    else
      anchors[i].href = target;
  }
}