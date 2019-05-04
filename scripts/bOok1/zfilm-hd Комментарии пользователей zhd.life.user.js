// ==UserScript==
// @name zfilm-hd Комментарии пользователей zhd.life
// @namespace zfilm-hd.club Комментарии пользователей
// @grant boOk1
// @description:ru Специально для фанатов портала Zfilm-HD. Отображении ссылки на комментарии пользователя.
// @require https://code.jquery.com/jquery-2.2.4.min.js
// @include https://zfilm-hd.org/*
// @version 0.1.3.20180112
// @description Специально для фанатов портала Zfilm-HD. Отображении ссылки на комментарии пользователя.
// ==/UserScript==


$("div#djasss_pl").prependTo(".conteiner");
$(".djasss_pl").attr({ "style" : "width : 980px; float: inherit !important; background-position: 425px 225px !important; " });
$("#iframe_daily").attr({ "width" : "970px", "height": "545px" });

$('div.zcomm-ava img').each(function(){
  var DDid = $(this).attr("src");
  if(DDid != "/templates/Default/dleimages/noavatar.png"){
    DDid = DDid.replace('/uploads/fotos/foto_', "");
    DDid = DDid.replace('http://', "");
    DDid = DDid.replace('https://', "");
    DDid = DDid.replace('zfilm-hd.org', "");
    DDid = DDid.replace('.jpg', "");
    DDid = DDid.replace('.png', "");
    $(this).after('<a class="zcomm-quoteuser" href="https://zfilm-hd.org/index.php?do=lastcomments&userid=' + DDid + '">Коммент.</a>');
  }
});



