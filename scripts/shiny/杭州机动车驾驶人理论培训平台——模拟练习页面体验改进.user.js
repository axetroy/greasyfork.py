// ==UserScript==
// @name         杭州机动车驾驶人理论培训平台——模拟练习页面体验改进
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @description  模拟练习页面体验改进
// @author       Daijie
// @match        http://hz.5u5u5u5u.com/exercise.action*
// @grant        GM_addStyle
// ==/UserScript==

    'use strict';
const jump = function() {
  setTimeout(() => {
    if($('#remined').hasClass('zhengque')) {
      $('.nest_btn').click()
    }
  }, 300);
};
$('#option').on('click', 'li', (e) => {
  $(e.target).find('input').click();
  if(e.target.tagName === 'INPUT') {
    jump();
  }
}).css({ cursor: 'pointer', float:'left', clear: 'both'});
$(document).keydown((e) => {
  const chars = ['A', 'B', 'C', 'D'];
  const mapping = {
    "a": "A",
    "A": "A",
    "1": "A",
    "b": "B",
    "B": "B",
    "2": "B",
    "c": "C",
    "C": "C",
    "3": "C",
    "d": "D",
    "D": "D",
    "4": "D",
  };
  if(mapping[e.key] && !(e.ctrlKey || e.metaKey)) {
    const index = chars.indexOf(mapping[e.key]);
    $('#option li').eq( index ).find('input').click();
  }
});
GM_addStyle(`#option li:hover{
    color: #01257d
}`);