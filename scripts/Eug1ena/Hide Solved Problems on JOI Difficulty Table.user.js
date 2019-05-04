// ==UserScript==
// @name         Hide Solved Problems on JOI Difficulty Table
// @version      1.0
// @description  https://joi.goodbaton.com/でACした問題を非表示にできる
// @author       euglenese
// @match        https://joi.goodbaton.com/*
// @namespace https://greasyfork.org/users/201019
// ==/UserScript==

$("#btn").after('　　<button id="ac_shita_problem_wo_hide" size="20" type="button">ACした問題を隠す</button>');
var ac_shita_problem_wo_hide_shiteiruka = 0;
$("#ac_shita_problem_wo_hide").click(function(){
    if(!ac_shita_problem_wo_hide_shiteiruka){
        $("#ac_shita_problem_wo_hide").text("ACした問題を表示する");
    }else{
        $("#ac_shita_problem_wo_hide").text("ACした問題を隠す");
    }
    $(".ac-none").parent().toggle();
    ac_shita_problem_wo_hide_shiteiruka ^= 1;
});