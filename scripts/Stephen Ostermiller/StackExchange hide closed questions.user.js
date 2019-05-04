// ==UserScript==
// @name StackExchange hide closed questions
// @namespace http://ostermiller.org/
// @version 1.11
// @description Hide closed questions on the home page and in other lists of questions.   Put a link showing the number of closed questions that have been hidden that shows the closed questions again.
// @include /https?\:\/\/([a-z\.]*\.)?stackexchange\.com\/.*/
// @include /https?\:\/\/([a-z\.]*\.)?askubuntu\.com\/.*/
// @include /https?\:\/\/([a-z\.]*\.)?superuser\.com\/.*/
// @include /https?\:\/\/([a-z\.]*\.)?serverfault\.com\/.*/
// @include /https?\:\/\/([a-z\.]*\.)?stackoverflow\.com\/.*/
// @include /https?\:\/\/([a-z\.]*\.)?answers.onstartups\.com\/.*/
// @grant none
// ==/UserScript==
function closedQuestionVisibility(show){
    var numberOfClosed=0;
    $('.question-summary').each(function(){
        var e = $(this);
        var t = e.find('h3 a').text();
        if (t.match(/\]$/)){
            e.addClass('closed');
            if(show){
                e.show();
            } else {
                e.hide();
            }
            numberOfClosed++;
        }
    });
    return numberOfClosed;
}

function run(){
    if ($('.question-summary').length){  // if it has a list of questions
        var numberHidden=closedQuestionVisibility(false);
        if (numberHidden > 0){
            $('.question-summary:first').parent().prepend(" <a href='#' id='unhideclosedlink'>(" + numberHidden + " hidden closed)</a>");
            $('#unhideclosedlink').click(function(){
                closedQuestionVisibility(true);
                $('#unhideclosedlink').hide();
                return false;
            });
            $('html > head').append("<style>.question-summary.closed .status * { text-decoration: line-through; }</style>");
        }
    }
}

run();

$('.page-numbers').click(function(){
    setTimeout(run, 2000);  
});