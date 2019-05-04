// ==UserScript==
// @name            pikabu.ru Comment Colorizer
// @description     Colorizes comments by rating
// @author          Sanya_Zol (Alexander Zolotarev)
// @license         Public domain
// @icon            https://cs.pikabu.ru/mobile/img/apple-touch-icon-152x152.png
// @homepageURL     https://greasyfork.org/en/scripts/519-pikabu-ru-comment-colorizer
// @namespace       Sanya_Zol
// @version         0.2.3
// @include         http://pikabu.ru/*
// @include         https://pikabu.ru/*
// @run-at          document-end
// @grant           none
// @require         https://code.jquery.com/jquery-3.3.1.slim.js
// ==/UserScript==

(function($){
    var filterstr='.comment__rating-count:not([data-pkbcolored])';
    var elfunc=function(){
        var a = $(this).closest('.comment__body');
        var c = ZolCalcColor( parseInt($(this).html()) );
        a.css({backgroundColor:c,padding:'3px',marginTop:'4px',marginBottom:'4px',borderRadius:'4px'});
        a.find('.comment__content').css({
           background: '#fff',padding: '0 3px',borderRadius: '4px',opacity:'.9' 
        });
        // ZolGradient( a.find('td.comment_b'), 'top, '+c+' 0%,#ffffff 100%' );
        $(this).attr('data-pkbcolored','yes');
    };
    // var ZolCalcColor = function(r){var sub = (255-Math.min( Math.round( Math.abs(r)*10 ), 255 )+256).toString(16).substr(1); return '#'+( (r>0)?(sub+'ff'+sub):('ff'+sub+sub) );};
    var ZolCalcColor_max = 255/Math.log(1000);
    var ZolCalcColor = function(r){
        var sub = (255-Math.min( Math.round( Math.log(Math.abs(r)+1)*ZolCalcColor_max ), 255 )+256).toString(16).substr(1);
        return '#'+( (r>0)?(sub+'ff'+sub):('ff'+sub+sub) );
    };
    var ZolGradient = function(a,gr){
        // http://stackoverflow.com/a/16697618/870183
        // a.css("background-image", "-webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #333), color-stop(100%, #222))");
        a
        .css('background-image', '-webkit-linear-gradient('+gr+')')
        .css('background-image', '-moz-linear-gradient('+gr+')')
        .css('background-image', '-o-linear-gradient('+gr+')')
        .css('background-image', 'linear-gradient('+gr+')');
    };
    $(filterstr).each(elfunc);
    $(document).on('DOMNodeInserted','.comments',function(e){
        $(e.originalEvent.relatedNode).find(filterstr).each(elfunc);
    });
})(jQuery);