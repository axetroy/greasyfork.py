// ==UserScript==
// @name        Autohide tieba guide
// @namespace   minhill.com
// @description 折叠贴吧指引
// @include http://tieba.baidu.com/f?kw=*
// @include http://tieba.baidu.com/f?tp=*
// @include http://tieba.baidu.com/f?ie=*
// @include http://tieba.baidu.com/f?ct=*
// @version     1.2
// @grant       none
// ==/UserScript==

if(guidePoint=document.querySelectorAll(".inlineBlock")){
  guidePoint[0].click();
}
