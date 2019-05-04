// ==UserScript==
// @name         drive.google Image LNK
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://drive.google.com/drive/folders/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// @grant       GM_xmlhttpRequest
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setClipboard
// ==/UserScript==
let $=window.$;
(function($) {
    'use strict';
    //$('head').append('<link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet">');
    //.parent()
    var intervalID = window.setInterval(imgLnkAdd, 1000);
    function imgLnkAdd(){
        let arImg=$('.a-b-ta-Ua'), loadList=[];
        $.each(arImg, function( index, img ) {
            img=$(img);
            if( img.data('showed')=="Y"){
                let lnk=$('#'+img.data('lnk_id'));
                if(lnk.length==0){
                    img.data('showed','');
                    img.data('lnk_id','N');
                }
            }else{
                img.data('lnk_id','N');
            }
            if(img.data('lnk_id')=='N'){
                img.data('showed', 'Y');
                let src=img.prop('src');
                let id=Math.round(Math.random() * (9999 - 1000) + 1000);
                id='lnk_'+id;
                img.data('lnk_id', id);
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: src,
                    data:{'id':id},
                    synchronous: true,
                    onreadystatechange: function(res) {
                    },
                    onload: function (results) {
                        let url=encodeURIComponent(results.finalUrl).replace(/%20/g,'+');
                        //         url=url.match(/http:\/\/([\w.]+)/gm)[0];
                        let content = results.responseText;
                        try {
                            $('#'+id+' .google_search').prop('href','https://www.google.com/searchbyimage?image_url='+url).show();
                            $('#'+id+' .ya_search').prop('href','https://yandex.ru/images/search?rpt=imageview&cbird=1&img_url='+url).show();
                        }
                        catch (err) {}
                    },
                    onerror: function(res) {
                        GM_log("Error!");
                    }});
                let block='<div id="'+id+'" style="background:#fff;padding:0 5px;position: absolute;z-index: 10000;left: 10px;top: 10px;">'+
                    '<a href="'+src+'" target="_blank">Ссылка на картинку</a><br>'+
                    '<a class="google_search" style="display:none" href="#" target="_blank">Искать в гугле</a><br>'+
                    '<a class="ya_search" style="display:none" href="#" target="_blank">Искать в яндекс</a>'+
                    '</div>'
                img.parent().append(block);
            }
        });

    }
    // Your code here...
})($);