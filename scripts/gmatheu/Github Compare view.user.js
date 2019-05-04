// ==UserScript==
// @name       Github Compare view
// @namespace  http://gmatheu.github.io/
// @version    0.1
// @description Increases Github width on compare view
// @match      https://github.com/**/compare/*
// @copyright  2014, Gonzalo Matheu
// ==/UserScript==

$(".container").width("95%");
$("#js-repo-pjax-container").width("95%");
$(".meta").css("padding","0px 10px");
$(".file").css("margin-bottom","3px");
