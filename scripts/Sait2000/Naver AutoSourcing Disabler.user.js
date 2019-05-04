// ==UserScript==
// @name Naver AutoSourcing Disabler
// @namespace https://greasyfork.org/users/3115-sait2000
// @author Sait2000
// @description Naver AutoSourcing Disabler disable AutoSourcing in Blog, etc.
// @version 0.1
// @include http*://*naver.com/*
// ==/UserScript==
 
if(typeof AutoSourcing !== 'undefined') {
  AutoSourcing.getParentElement = function() {};
  AutoSourcing.getRange = AutoSourcing.cloneRange = function() {return {};};
  AutoSourcing.getId = function() {return -1;};
}