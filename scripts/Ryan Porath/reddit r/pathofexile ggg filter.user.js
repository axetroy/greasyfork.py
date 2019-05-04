// ==UserScript==
// @name         reddit r/pathofexile ggg filter
// @namespace    http://porath.org/
// @version      0.13
// @description  Allows you to filter comments by ggg employees on r/pathofexile
// @author       porath
// @include      *.reddit.com/r/pathofexile*
// @grant        none
// ==/UserScript==

$('.panestack-title').append('<a class="gggsort" style="color: red" href="">&nbsp;sort GGG comments to the top</span>');

$('.gggsort').on('click', function (e) {
    e.preventDefault();
    
    $('.entry > p > em').each(function () {
        $(this).siblings('.expand').click();
    });
    
    var GGGEmployees = ['chris_wilson', 'Bex_GGG', 'Negitivefrags', 'qarldev', 'BrianWeissman_GGG', 'Rory_Rackham', 'Omnitect', 'Mark_GGG', 'Daniel_GGG', 'Blake_GGG'];
    
    $('.entry > p > .author').each(function () {
        if (GGGEmployees.indexOf($(this).html()) !== -1) {
            $(this).closest('.nestedlisting').prepend($(this).parents('.nestedlisting > .thing'));
            
            $(this)[0].scrollIntoView();
            $('body').scrollTop($('body').scrollTop() - 30);
        }
    });
});
