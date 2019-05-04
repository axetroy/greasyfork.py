// ==UserScript==
// @name 翻译去回车
// @description 翻译去回车啊
// @namespace Violentmonkey Scripts
// @match https://translate.google.cn/* 
// @match https://translate.google.com/*
// @grant none
// @require http://code.jquery.com/jquery-1.12.4.min.js
// @run-at document-end
// @version 0.0.1.20190117130806
// ==/UserScript==zz

function deleteEnter(){
  txtarea = $("#source")[0]
  txt = txtarea.value;
  //console.log(txt)

  for (var i=0;i<txt.length;i++)
  {
    if(txt.indexOf("\n"))txt = txt.replace("\n"," ");
  }
  //console.log(txt)
  txtarea.value = txt;
}
function helloworld(){
  let buttonParent = $(".tlid-input-button-container.focus-wrapper")
  let button = $('<div class="tlid-input-button input-button header-button tlid-input-button-docs documents-icon" role="tab" tabindex="-1"><div class="text">去回车</div></div>')
  button.click(deleteEnter)
  buttonParent.append(button)
}
//window.onload=function(){
  helloworld()
  //window.setTimeout(helloworld,1000);
//}