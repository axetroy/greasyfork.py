// ==UserScript==
// @name           tieba autosign v2
// @description    貼吧自動簽到
// @include        http://tieba.baidu.com/f?*
// @version 0.0.2
// @namespace https://greasyfork.org/users/6037
// ==/UserScript==
if(document.querySelector(".cancel_focus")){
    if(document.querySelector(".j_cansign")){
        document.querySelector(".j_cansign").onclick=undefined;
        document.querySelector(".j_cansign").click();
    }}
