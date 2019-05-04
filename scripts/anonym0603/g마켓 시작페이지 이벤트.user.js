// ==UserScript==
// @id             startpageEventForNon-IE@gmarketEventFix
// @name           g마켓 시작페이지 이벤트
// @description    IE가 아닌 브라우저(파이어폭스, 크롬 등)에서 g마켓 시작페이지 설정 이벤트에 참여합니다 
// @author         anonymous
// @version        1.0
// @license         public domain
// @include        http://www.gmarket.co.kr/eventzone/startpage.asp
// @include        http://www.gmarket.co.kr/eventzone/ifrmStartpage.asp
// @run-at         document-end
// @namespace https://greasyfork.org/users/2425
// ==/UserScript==

var scriptNode = document.createElement('script');
scriptNode.type = 'text/javascript';
scriptNode.textContent  = "\
var gmktMainIsIE=true; \
var GMKTHomePage={isHomePage:function(){return true}};";
document.body.appendChild(scriptNode);

