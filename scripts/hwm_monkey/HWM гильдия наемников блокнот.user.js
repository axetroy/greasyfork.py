// ==UserScript==
// @name         HWM гильдия наемников блокнот
// @version      1.0.3
// @description  Поле для оставления памяток о стремных наемах
// @author       incognito
// @grant        GM_setValue
// @grant        GM_getValue
// @include      https://www.heroeswm.ru/mercenary_guild.php
// @require      https://code.jquery.com/jquery-3.1.1.slim.min.js
// @namespace https://greasyfork.org/users/237404
// ==/UserScript==

(function (undefined) {

    if( GM_getValue("mercenary_guild_notepad") ){
        var blknt = GM_getValue("mercenary_guild_notepad");
    }else{
        var blknt = 'внесите записи...';
    }
    var lines = blknt.split("\n").length;

    configHtml = '<div style="width:50vw;margin:0 auto;">';
    configHtml += '<textarea id="blknt" style="width:100%;font-size:11px;" rows="'+lines+'">'+blknt+'</textarea>';
    $('body').append(configHtml);

    $(document).on('change click keyup', '#blknt ', function() {
        GM_setValue('mercenary_guild_notepad', $('#blknt').val() );
        $('#blknt').attr('rows', $('#blknt').val().split("\n").length );
    });

}());
