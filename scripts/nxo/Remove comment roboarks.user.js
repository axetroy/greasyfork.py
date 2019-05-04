// ==UserScript==
// @name Remove comment roboarks
// @description:ja ブログ「ロボアークス風情のPSO2日記帳」においてコメント欄・コメント数・最近のコメントを削除します。
// @match https://pso2roboarks.jp/*
// @match https://pso2roboarks.jp
// @require https://code.jquery.com/jquery-3.3.1.min.js
// @grant none
// @version 0.1.2
// @namespace https://greasyfork.org/users/244063
// @description ブログ「ロボアークス風情のPSO2日記帳」においてコメント欄・コメント数・最近のコメントを削除します。
// ==/UserScript==

$(".widget_recent_comments").remove();
$(".come_countlist").remove();
$(".come_count").remove();
$("#comments-thread").remove();
