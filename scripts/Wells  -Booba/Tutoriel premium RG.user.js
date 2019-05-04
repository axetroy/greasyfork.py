// ==UserScript==
// @name         Tutoriel premium RG
// @namespace    https://realitygaming.fr/
// @version      0.1
// @description  Réponse prédéfinie sur RG
// @author       Paradise
// @include      https://realitygaming.fr/chatbox/*
// @include      https://realitygaming.fr/chatbox/*
// @grant        none
// ==/UserScript==
​
function reply(txt){
        $('iframe.redactor_textCtrl').contents().find('body').html(txt);
        $('iframe.redactor_textCtrl').contents().find('body').select();
        $('iframe.redactor_textCtrl').contents().find('body').focus();
    }
​
$(document).ready(function(){
​
        function reply_bonjour(){
     var rl = '<br>\n';
     var txt = "Bonjour" + rl + "Salut :membre: ";
     reply(txt);
        }
function reply_bonjour(){
     var rl = '<br>\n';
     var txt = "Bonjour" + rl + "Comment ça va ?";
     reply(txt); 
​
            var style= '<style>#barre{text-align:center;border-radius:5px;border:1px solid rgb(210,210,210);padding:10px;}#barre a{margin-right:8px;margin-left:8px;}</style>';
            var bjr = '<a href="javascript:void(0);" style="color:#3c5365;text-decoration:none;" data-action="bjr" data-message=""><i class="fa fa-terminal"> Salut</i> </a>';
​
​
    $('#QuickReply').find('.submitUnit').before('<br>' + style + '<div class="barre" id="barre">' + bjr + '</div></br>');
​
    $('#barre a').on('click', function(){
        if($(this).data('action') == "bjr"){
           reply_bonjour();
        }
    });
});