// ==UserScript==
// @name         RecoPoringa!
// @namespace    RecoPoringa!
// @version      0.4
// @description  Botón para recomendar posts en Poringa!
// @author       @Cazador4ever
// @match        *://www.poringa.net/posts/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
(function ($) {
        var boton = '<a rel="nofollow" id="reco" class="btn a" title="Compartir en Mi Taringa!"><span class="nombre" style="color:#fff"><i class="ico-shout icon-shouts" title="Share"></i>&nbsp;&nbsp;Recomendar</span></a><img src="https://k61.kn3.net/C/D/5/D/5/3/500.gif" id="loading" width="45" hight="45" style="display:none" /><img src="https://k61.kn3.net/7/B/6/E/4/C/AEA.png" width="45" hight="45" id="listo" style="display:none" /><img src="https://k60.kn3.net/F/2/3/9/A/1/9A1.png" width="45" hight="45" id="error" style="display:none" /></div>';
        $('.social-bar.top').append(boton);
        $('.social-bar.bottom').prepend(boton);
        $('#reco').on('click', function shout() {
            var link = ''+document.URL+'';
            var $split = link.split('/');
            var urlFinal = $split[$split.length-1];
            var urlReplace = link.replace(urlFinal, "");
            var usuario = $('.textlimit').prop('href').replace(/.*?:\/\/www.poringa.net/, "").substring(1).trim();
            var cont = '['+'['+'['+'['+ usuario +']'+']'+']'+']\n'+'@'+ usuario +'';
            var $loading = $('#loading');
            $("#reco").hide();
            $loading.show();
            $.ajax({
                type    : 'POST',
                dataType: 'json',
                url     : '/ajax/shout/attach',
                data    : {
                    url : urlReplace
                },
                success: function(data){
                    $loading.hide();
                    $('#listo').show();
                    $.ajax({
                        type     : 'POST',
                        dataType : 'json',
                        url      : '/ajax/shout/add',
                        data     : {
                            key             : global_data.user_key,
                            body            : cont,
                            privacy         : 0,
                            attachment_type : 3,
                            attachment      : data.data.id

                        } 
                    });
                },
                error: function(){
                    $('#error').show();
                },
                complete: function(){
                    $loading.hide();
                }
            });
        });
})(jQuery);