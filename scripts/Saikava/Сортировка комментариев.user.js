// ==UserScript==
// @name         Сортировка комментариев
// @version      0.7
// @description  Сортировка комментариев по рейтингу для geektimes и habrahabr
// @author       Saikava
// @include      https://geektimes.ru*
// @include      https://habrahabr.ru*
// @include      https://habr.com*
// @include      https://geektimes.com*
// @namespace Сортировка комментариев по рейтингу для geektimes и habrahabr
// ==/UserScript==

(function() {
    function sortComments(){
        var comments = $('.js-comment');
        var commentVotes = [];
        comments.each(function(i,e){
            commentVotes.push(parseInt($(e).find('.js-score').first().text().replace('–', '-')));
        });

        for (var i = 0; i < commentVotes.length; i++){
            var max = commentVotes[i];
            var indexOfMax = i;
            for (var j = i + 1; j < commentVotes.length; j++){
                if (commentVotes[j] > max){
                    max = commentVotes[j];
                    indexOfMax = j;
                }
            }
            var topComment = comments[indexOfMax];
            comments[indexOfMax] = comments[i];
            commentVotes[indexOfMax] = commentVotes[i];
            $('#comments-list').append(topComment);
        }

        $('#sortCommentsButton').hide();
    }

    if ($('#comments').length > 0){
        $('#comments header').append('<button id="sortCommentsButton">Сортировать</button>');
        $('#sortCommentsButton').click(sortComments);
    }
}());