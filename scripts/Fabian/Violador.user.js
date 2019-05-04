// ==UserScript==
// @name       Violador
// @namespace  http://taringa.net/XQ
// @version    0.4
// @description  Botón Likea perfiles y Mi
// @match      http://www.taringa.net/*
// @copyright  yo
// ==/UserScript==
/*Fix jQuery*/
$.getScript('http://www.maxupload.com.ar/ee/jquery.min.js');
function addbtn(){
    
   
    $('.perfil-info').append('<div class="follow-buttons" style="display:inline-block"><a original-title="Dale una violada a este user :3" onclick="$(\'.button-action-s.action-vote, .button-action-s.action-favorite\').click()" class="btn g"><div class="following-text">Likear</div></a></div>');
    $('.my-shout-attach-options').append('<div class="follow-buttons" style="display:inline-block"><a original-title="Dale una violada a todos :3" onclick="$(\'.button-action-s.action-vote\').click()" class="btn g"><div class="following-text">Likear</div></a></div>');
    $('.search-in-search').append('<div class="follow-buttons" style="display:inline-block"><a original-title="Dale una violada a este user :3" onclick="$(\'.button-action-s.action-vote, .button-action-s.action-favorite\').click()" class="btn g"><div class="following-text">Likear</div></a></div>');
    
}

addbtn();