// ==UserScript==
// @name         Реванда хейдер ответов.
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Revanda скрытие ответов!
// @author       eXponenta (rondo.devil<a>gmail.com)
// @match        http://ravanda.ru/*
// @grant        none
// ==/UserScript==

(function($){
    $.fn.shuffle = function() {
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
            });
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
        return $(shuffled);
    };

})(jQuery);

(function() {
    'use strict';

    var text = $(".solution_block .tema_text").css("display","none");

    $(".plus-min").each(function(){
        $(this).css("display","none");
    });

    var ans = $(".otvet");
    var isInput = false;

    if(ans.length > 1){
        var cls = "radio";
        if(ans.filter(".yes").length > 1)
            cls = "checkbox";
        $('<input name = "answ" class = "answ_b">').prop("type", cls).insertAfter(".plus-min");
        ans.css("color","black").shuffle();
    }else{
        ans.css({"color":"black","display":"none"});
        ans.parent().append($("<span id = 'answer_hiden'>Ответ скрыт</span>"));
        isInput = true;
    }

    $("<input>")
        .prop({type:"button",value:"Показать"})
        .css({"margin":"auto", "display":"block"})
        .click(function()
               {

        text.css("display","");
        $(".plus-min").each(function(){
            $(this).css("display","");
        });
        $(this).css("display","none");

        if(isInput){
            ans.css("display","");
            $("#answer_hiden").css("display","none");
        }else{
            $(".otvet").not(".yes").children('.answ_b:checked').parent().css('color','red');
        }
    })
        .appendTo( $(".solution_block"));



})();