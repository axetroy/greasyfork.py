// ==UserScript==
// @name        マクロミルのアンケートを旧UIで表示する
// @namespace   macromill old ui
// @include     https://monitor.macromill.com/airs/exec/smartRsAction.do?rid=*
// @description マクロミルのアンケートを旧UIで表示します
// @version     1.01
// @grant       none
// ==/UserScript==
location.replace(location.href.replace("smartR", "r"));