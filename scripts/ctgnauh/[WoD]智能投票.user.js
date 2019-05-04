// ==UserScript==
// @id          huangtc@outlook.com
// @name        [WoD]智能投票
// @namespace   http://github.com/huangtc
// @author      Tristan Huang
// @description 不错过任何一点荣誉。
// @include     http://canto.world-of-dungeons.org/wod/spiel/rewards/vote.php*
// @version     0.1.1
// @grant       none
// ==/UserScript==
var votes = $('div[class=\'vote banner\']>a');
var texts = $('div[class=\'vote reward\']');
var i;
for (i in votes) {
  var vote = votes[i];
  var text = texts[i].textContent.slice(0, 7);
  if (text !== '你可以再次获得') {
    vote.onclick.call();
    console.log('voted: ' + vote.href);
  }
}
