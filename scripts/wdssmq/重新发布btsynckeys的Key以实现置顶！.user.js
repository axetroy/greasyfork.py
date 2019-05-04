// ==UserScript==
// @name         重新发布btsynckeys的Key以实现置顶！
// @namespace    http://沉冰浮水.tk/
// @version      0.3
// @description  此脚本在删除旧Key的同时会将相应的Key及说明保存至浏览器内供自动填充！！
// @author       沉冰浮水
// @match        https://www.btsynckeys.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  if (location.href == "https://www.btsynckeys.com/do/addkey") {
    setTimeout(function () {
      location.href = "https://www.btsynckeys.com/account_show";
    }, 3000);
  }
  $("button.btn-primary").click(function () {
    if (localStorage.skey == $("#keystring").val())
      localStorage.lock = 0;
  });

  if (localStorage.lock && parseInt(localStorage.lock) === 1) {
    $(".btn-group .btn-secondary").attr("href", "#");
    //$(".btn-group .btn-secondary").hide();
    if (localStorage.skey && localStorage.title) {
      $("#keystring").val(localStorage.skey);
      $("#title").val(localStorage.title);
      return false;
    }
  }

  $(".btn-group .btn-secondary").mouseenter(function () {
    //if (localStorage.lock && parseInt(localStorage.lock) === 1)
    if ($(".btn-group .btn-secondary").attr("href") == "#")
      return false;
    localStorage.lock = 1;
    localStorage.skey = $(this).parents("tr").find("td:nth-child(2)").html();
    localStorage.title = $(this).parents("tr").find("td:first-child").html();
    $("#keystring").val(localStorage.skey);
    $("#title").val(localStorage.title);
    //$(".btn-group .btn-secondary").attr("href", "#");
    // console.log($(this).parents("tr").find("td:first-child").html());
    // console.log($(this).parents("tr").find("td:nth-child(2)").html());
  });
  // Your code here...
})();
