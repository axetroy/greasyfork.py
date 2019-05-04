// ==UserScript==
// @name:en zfilm-hd.club zFilmHD - Resposive WideScreen Design CSS+JS
// @name zfilm-hd.club Адаптивный дизайн для больших экранов
// @namespace zfilm-hd.club Адаптивный дизайн для больших экранов
// @description:en For datalifeEngine TV-Agregators FullPage widescreen design CSS+JS.
// @description Полностью переработанный дизайн веб-сайта адаптированный под разные разрешения экрана. Специально для фанатов портала Zfilm-HD от пользователя bOok1.
// Для тех кто в танке, АдБлок работает неверно, нужно устанавливать АдБлок Плюс + "RU AdList JS Fixes"
// @grant boOk1
// @include http*://*zhd.life/*
// @resource jqUI_CSS  https://dl.dropbox.com/s/wq50hrk5xv5txah/book1style.css
// @grant    GM_addStyle
// @grant    GM_getResourceText
// @version 0.0.2.20170708102251
// ==/UserScript==

var jqUI_CssSrc = GM_getResourceText ("jqUI_CSS");
GM_addStyle (jqUI_CssSrc);

$( "body" ).prepend( $('<!-- Preloader --><div id="preloader-book1"><div id="status-book1">&nbsp;</div></div><!-- /Preloader -->') );
/* Preloader */
$(window).on('load', function() {
  $('#status-book1').fadeOut();
  $('#preloader-book1').delay(250).fadeOut('fast');
  $('body').delay(350).css({'overflow':'visible'});
  $//('html,body').scrollTop($(".book1-poster").offset().top); #iframe_daily
  //$('html,body').animate({scrollTop: 210});
  $('html, body').animate({ scrollTop: $("h1").offset().top}, 250);

});
/* end Preloader */

$('div.zcomm-ava img').each(function(){
  var DDid = $(this).attr("src");
  DDid = DDid.replace('/uploads/fotos/foto_', "");
  DDid = DDid.replace('.jpg', "");
  if(DDid != "/templates/Default/dleimages/noavatar.png"){
    $(this).after('<a class="zcomm-quoteuser" href="http://zfilm-hd.club/index.php?do=lastcomments&userid=' + DDid + '">Коммент.</a>');
  }
});

$(".conteiner .left-material").prependTo($(".conteiner"));

$( ".left-material" ).append($( "<div class='book1-row'></div>" ));

$( ".left-material" ).prepend($( "<div class='book1-zvuk'></div>" ));
$( ".left-material" ).prepend($( "<div class='book1-addit'></div>" ));
$( ".left-material" ).prepend($( "<div class='book1-rew'></div>" ));
$( ".left-material" ).prepend($( "<div class='book1-poster'></div>" ));

$( ".book1-zvuk" ).append($( "<div class='book1-zvuk-h'>Выбрать озвучку</div>" ));
$( ".book1-addit" ).append($( "<div class='book1-addit-h'>О фильме</div>" ));
$( ".book1-poster" ).append($( "<div class='book1-poster-h'>Постер и рейтинг</div>" ));

$( ".book1-zvuk" ).append($( "<div class='book1-zvuk-h2'><span>Развернуть</span></div>" ));
$( ".book1-addit" ).append($( "<div class='book1-addit-h2'><span>Развернуть</span></div>" ));
$( ".book1-poster" ).append($( "<div class='book1-poster-h2'><span>Развернуть</span></div>" ));

$( ".book1-zvuk" ).append($( "<div class='book1-zvuk-c'></div>" ));
$( ".book1-addit" ).append($( "<div class='book1-addit-c'></div>" ));
$( ".book1-poster" ).append($( "<div class='book1-poster-c'></div>" ));

$( ".left-material>.poster-video" ).appendTo($( ".book1-poster-c" )); $( ".book1-poster>.poster-video-c" ).after( '<div class="clear"></div>' );
$( '.left-material>div[title="Эта информация выводится только для вас."]' ).appendTo($( ".book1-poster-c" ));
$( ".left-material>.playlist-add-area" ).appendTo($( ".book1-poster-c" )); $( ".book1-poster-c>.playlist-add-area" ).after( '<div class="clear"></div>' );
$( ".left-material>.section" ).appendTo($( ".book1-poster-c" ));
$( '.left-material>div[itemtype="http://data-vocabulary.org/Review-aggregate"]' ).appendTo($( ".book1-poster-c" )); //$( '.book1-poster-c>div[itemtype="http://data-vocabulary.org/Review-aggregate"]' ).after( '<hr />' );

//$(".right-material>article").css('display', 'block !important');
$(".right-material>article").css("display", "block");
$("article").prepend($( "<div class='book1-article'></div>" ));
//<article class="book1-article">
$( "ul.favbutts" ).appendTo($('.book1-article')); //$( "ul.favbutts" ).appendTo($( ".book1-poster-c" ));
$( "ul.favbutts" ).after( '<div class="clear"></div>' ); // $( ".book1-poster>ul.favbutts" ).after( '<div class="clear"></div>' );


var book1okino = parseInt($(".view-info-title").length);
for (i = 0; i < book1okino; i++) { 
  $( '.left-material .view-info-title:eq('+i+')' ).appendTo($( ".book1-addit-c" ));
  $( '.left-material .view-info-content:eq('+i+')' ).appendTo($( ".book1-addit-c" ));
}


$( ".left-material>ul.content-video3" ).appendTo($( ".book1-zvuk-c" ));

$('.left-material').children().not('.book1-poster, .book1-addit, .book1-zvuk').remove(); $('.pl1, .e991, .podelitca').remove(); $('a[href="#content-video3"]').remove(); $('div.title-full:contains("Случайные кинофильмы")').remove();
$('div.content> ul.content-video').remove();

$(".book1-zvuk-c, .book1-addit-c, .book1-poster-c").css("display", "none"); 

$(".book1-zvuk-h2, .book1-addit-h2, .book1-poster-h2").click(function () {
    $header3 = $(this);
    $content3 = $header3.next();
    $content3.slideToggle(500, function () {
        $header3.text(function () {
            return $content3.is(":visible") ? "Свернуть" : "Развернуть";
        });
    });
});

//$(".poster-video").attr('class', 'poster-video-book1');
//$('.poster-video:hover').css("opacity", "");
$(".book1-poster").appendTo(".book1-row");
$(".book1-addit").appendTo(".book1-row");
$(".book1-zvuk").appendTo(".book1-row");
$(".book1-rew").appendTo(".book1-row");