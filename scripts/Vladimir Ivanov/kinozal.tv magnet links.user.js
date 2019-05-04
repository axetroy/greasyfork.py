// ==UserScript==
// @name         kinozal.tv magnet links
// @namespace    none
// @version      0.1
// @description  add magnet links near to torrent links for kinozal.tv pages
// @author       vike
// @include      /^http:\/\/kinozal.tv\/details\.php\?id=\d+$/
// @grant        none
// ==/UserScript==

$(function(){
    var imgURL = 'http://upload.wikimedia.org/wikipedia/commons/7/72/TPB_Magnet_Icon.gif';
    $("td[class='nw']").after('<td style="width: 20px"> <a id="magnetLink" title="Скачать раздачу используя magnet ссылку" href="#"> <img src="' + imgURL + '"/> </a> </td>');

    $("#magnetLink").click(function(){
        var result = new RegExp('id=(\\d+)').exec(window.location.href);
        var id = result[1];
        $.get('/get_srv_details.php?id=' + id + '&action=2', function(s){
            var result = new RegExp('Инфо хеш: (.\{40\})').exec(s);
            var hash = result[1];
            document.location = 'magnet:?xt=urn:btih:' + hash;
        });
    });
});
