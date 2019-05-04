// ==UserScript==
// @name         Tutoriel premium iHax
// @namespace    https://ihax.fr/
// @version      0.1
// @description  Réponse prédéfinie sur iHax
// @author       Paradise
// @include      https://ihax.fr/threads/*
// @include      https://ihax.fr/conversations/*
// @grant        none
// ==/UserScript==

$(document).ready(function(){

        function reply_bonjour(){
     var rl = '<br>\n';
     var txt = "Bonjour" + rl + "Salut :) 
Bienvenue sur iHax ! Si tu a des question, Contact te moi en privé :) 
Ou utilise les Support : Question & Aide :) 

Je t'invite à lire le règlement du forum ainsi que celui de la shoubox ​";
     reply(txt);
        }

            var style= '<style>#barre{text-align:center;border-radius:5px;border:1px solid rgb(210,210,210);padding:10px;}#barre a{margin-right:8px;margin-left:8px;}</style>';
            var bjr = '<a href="javascript:void(0);" style="color:#3c5365;text-decoration:none;" data-action="bjr" data-message=""><i class="fa fa-angellist"></i>  Bonjour</a>';


    $('#QuickReply').find('.submitUnit').before('<br>' + style + '<div class="barre" id="barre">' + bjr + '</div></br>');

    $('#barre a').on('click', function(){
        if($(this).data('action') == "bjr"){
           reply_bonjour();
        }
    });
});