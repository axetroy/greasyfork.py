// ==UserScript==
// @name         跳过计时弹窗
// @description  自动跳过讨厌的计时弹窗，解放双眼
// @namespace    http://study.yanxiu.jsyxsq.com/
// @version      2017.3.16
// @author       zhd 
// @match        http://study.yanxiu.jsyxsq.com/proj/studentwork/*
// @grant        none
// ==/UserScript==

setTimeout(function(){
  function confirm(){
    return true;
  }
  
  window.confirm = confirm;
  
  function alert(){
  }
  
  window.alert = alert;
}, 5 * 1000)