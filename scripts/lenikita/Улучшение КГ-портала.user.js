// ==UserScript==
// @name         Улучшение КГ-портала
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Добавляет кнопку к каждой новости для загрузки остального содержимого
// @author       You
// @match        https://kg-portal.ru/
// @grant        none
// ==/UserScript==

(function($) {
    'use strict';

    // прячем ссылки, растянутые на всю новость - они будут мешать кликать на кнопку,
    // а открыть всю новость все равно можно будет через заголовок
    $('.news_card_link').hide();

    // добавляем кнопку "Читать всё"
    $('.news_box .news_text').append(
        '<div style="text-align: center;margin: 10px 0 0 0;">' 
            + '<a class="kg-improve-more-btn" href="" style="display: inline-block;background-color: #c6f4c6;color: #000;padding: 3px 13px;border-radius: 3px;box-shadow: 1px 1px 2px #999;">Читать всё</a>'
            + '<div class="kg-improve-spinner">'
                + '<div class="bounce1"></div>'
                + '<div class="bounce2"></div>'
                + '<div class="bounce3"></div>'
            + '</div>'
        + '</div>'
    );

    // действия при нажатии на кнопку "Читать всё"
    $('.news_box').on('click', '.kg-improve-more-btn', function(e){
        e.preventDefault();
        var btn = $(this),
            box = btn.parents('.news_box:first'),
            newsId = box.find('.news_output[id]').attr('id'),
            spinner = box.find('.kg-improve-spinner');
        btn.hide();
        spinner.addClass('show');
        $.ajax({
            url: box.find('.news_card_link').attr('href'),
            type: 'get',
            success: function(response) {
                box.find('.news_text').replaceWith($(response).find('.news_text'));
                // передвинем страницу на начало новости
                $('html, body').animate({
                    scrollTop: box.offset().top - 30
                }, 400);          
            },
            error: function() {
                spinner.removeClass('show');
                btn.show();
            }
        });
    });

    // добавляем необходимый CSS
    $("<div />", {
        html: '&shy;<style>'
                + '.kg-improve-spinner {'
                + '  display: none;'
                + '  width: 70px;'
                + '  text-align: center;'
                + '}'
                + '.kg-improve-spinner.show {'
                + '  display: inline-block;'
                + '}'
                + ''
                + '.kg-improve-spinner > div {'
                + '  width: 16px;'
                + '  height: 16px;'
                + '  margin: 0 2px;'
                + '  background-color: #c8c9c8;'
                + ''
                + '  border-radius: 100%;'
                + '  display: inline-block;'
                + '  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;'
                + '  animation: sk-bouncedelay 1.4s infinite ease-in-out both;'
                + '}'
                + ''
                + '.kg-improve-spinner .bounce1 {'
                + '  -webkit-animation-delay: -0.32s;'
                + '  animation-delay: -0.32s;'
                + '}'
                + ''
                + '.kg-improve-spinner .bounce2 {'
                + '  -webkit-animation-delay: -0.16s;'
                + '  animation-delay: -0.16s;'
                + '}'
                + ''
                + '@-webkit-keyframes sk-bouncedelay {'
                + '  0%, 80%, 100% { -webkit-transform: scale(0) }'
                + '  40% { -webkit-transform: scale(1.0) }'
                + '}'
                + ''
                + '@keyframes sk-bouncedelay {'
                + '  0%, 80%, 100% { '
                + '    -webkit-transform: scale(0);'
                + '    transform: scale(0);'
                + '  } 40% { '
                + '    -webkit-transform: scale(1.0);'
                + '    transform: scale(1.0);'
                + '  }'
                + '}'
            + '</style>'
    }).appendTo("body");
    
})(jQuery);