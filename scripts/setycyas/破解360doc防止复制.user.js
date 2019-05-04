// ==UserScript==
// @name        破解360doc防止复制
// @namespace   https://greasyfork.org/users/14059
// @description 可直接复制360doc网站的资料
// @include     http://www.360doc.com/*
// @require     http://cdn.staticfile.org/jquery/3.1.1/jquery.min.js
// @author      setycyas
// @version     0.1
// @grant       none
// @run-at      document-end
// @license     MIT
// ==/UserScript==
"use strict";
console.log("A gm script-360doc_killer is running!");

/****************************************
######## version 2017/1/13 ###########
######## 脚本正式开始 ###################
****************************************/

/* Functions */

//解锁方法
function clearOnCopy(){
  console.log('解锁复制成功!若还是不行可再次解锁.');
  document.body.oncopy=(function(){
    console.log("已清除了原来的防复制!现在可随意复制内容!");
  });
}

//添加解锁按钮
function addButton(){
  var newDiv="<div style='position:fixed;top:100px;left:20px'>"
  newDiv+="<button id='360kill' style='border-radius:4px;font-size:14px;padding:6px 12px;"
  newDiv+="color:#ffffff;background-color:#337ab7;'>解锁复制</button></div>"
  $(newDiv).appendTo($('body')); 
  $('#360kill').click(clearOnCopy);
}
                        
function main(){
  $("#LayerLogin").remove();
  addButton();
}

/* Main Script */
$(document).ready(main);