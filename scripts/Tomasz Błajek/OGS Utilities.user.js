// ==UserScript==
// @name         OGS Utilities
// @description  Small improvements of online-go.com
// @author       TPReal
// @namespace    https://greasyfork.org/users/9113
// @version      0.4.1
// @match        *://online-go.com/*
// @grant        none
// ==/UserScript==

/* jshint esnext:true */
(()=>{
'use strict';

const TITLE_MATCHER=/^(?:\[\d+\] )?(.*)$/;

var tick=()=>{
  const counterElem=document.querySelector(".turn-indicator");
  if(counterElem)
    document.title=`[${counterElem.innerText.trim()||"0"}] ${TITLE_MATCHER.exec(document.title)[1]}`;
  setTimeout(tick,1000);
};
tick();

})();
