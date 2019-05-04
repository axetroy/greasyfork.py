// ==UserScript==
// @name         Sort Comments
// @namespace    https://greasyfork.org/ru/scripts/46629-sort-comments
// @version      1.1
// @description  Add sort button to comments on myshows.me
// @author       Sarge
// @match        https://myshows.me/view/episode/*
// @grant        none
// ==/UserScript==

var $comments = $("#comments");

//including trees
$("#comments > .commBlock").each(function() {
    var $this = $( this );
    $this.next().appendTo($this);
});

//sort comments
var sortComments = function (){
    $("#comments > .commBlock").sort(function(a,b) {
        var one = +$(a).find(">.commBlockBody>._contr").text() || 0;
        var two = +$(b).find(">.commBlockBody>._contr").text() || 0;
        return two - one;
    }).appendTo($comments);
};

//add sort button
$comments.prepend('<button class="_rect _big" onclick="sortComments()">Сортировать</button>');

window.sortComments = sortComments;