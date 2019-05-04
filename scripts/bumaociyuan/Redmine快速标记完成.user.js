// ==UserScript==
// @name         Redmine快速标记完成
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://developer.mozilla.org/en-US/docs/Web/API
// @grant        none
// @include     http*://redmine.*.com/issues/*
// ==/UserScript==

(function() {
	'use strict';
	document.getElementsByClassName("contextual")[1].innerHTML = '<button type="button" class="icon icon-edit" >标记已完成</button>' + document.getElementsByClassName("contextual")[1].innerHTML;

document.getElementsByClassName("contextual")[1].children[0].onclick = function () { 
  // 状态->已完成
  document.getElementById("issue_status_id").selectedIndex = 2;

  // 指派给发起人
  var userId = document.getElementsByClassName("user active")[2].attributes.href.value.split('/')[2];
  var children = document.getElementById("issue_assigned_to_id").children;
  var issue_assigned_to_idIndex = 0;
  for (var i = 0, len = children.length; i < len; i++) {
    var node = children.item(i);
    if (node.attributes.value.value == userId) {
      issue_assigned_to_idIndex = i;
      break;
    }
  }

  document.getElementById("issue_assigned_to_id").selectedIndex = issue_assigned_to_idIndex;

  // %完成->90%
  document.getElementById("issue_done_ratio").selectedIndex = 9;

  // 耗时
  // document.getElementById("time_entry_hours").value = prompt('耗时');
  document.getElementById("time_entry_hours").value = 1;

  // 活动->应用开发
  document.getElementById("time_entry_activity_id").selectedIndex = 3;

  // 注释
  document.getElementById("time_entry_comments").value = "已修复";

  // 提交
  document.getElementById("issue-form").submit();

};

})();

