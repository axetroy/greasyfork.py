// ==UserScript==
// @name         nCore - Spooky Dayz
// @namespace    http://tampermonkey.net/
// @version      1
// @description  idén meglesz az összes
// @author       vacsati
// @match        https://ncore.cc/*
// @require      https://code.jquery.com/jquery-1.12.4.min.js
// @require      https://greasyfork.org/scripts/373944-sutikezeles/code/Sutikezeles.js?version=642233
// @require      https://greasyfork.org/scripts/373945-hangkeszlet/code/Hangkeszlet.js?version=642238
// ==/UserScript==

(function() {
    'use strict';
    //https://ncore.cc/static/images/spooky2013_3.png
    //https://ncore.cc/static/smilies/jacko.gif
    //ID:
    //BOT:
    var db=0;
    var styleElem = document.createElement('style');
    styleElem.type = 'text/css';
    styleElem.innerHTML = '#jlzhely{position:absolute;width:200px;top:25px;right:0px;opacity:0.8;display:none;z-index:1;}';
    styleElem.innerHTML+= '#jlzhely label{width:80px;display:inline-block;}';
    styleElem.innerHTML+= '#jlzhely input[type="text"]{width:100px;border:1px solid black;padding:2px;border-radius:2px;box-sizing:border-box;}';
    styleElem.innerHTML+= '#jlzhely input[type="checkbox"]{margin:0;vertical-align:middle;}';
    styleElem.innerHTML+= '#hnghely{position:absolute;right:0px;opacity:0.8;transform:scale(0.6,0.6);}';
    document.getElementsByTagName('head')[0].appendChild(styleElem);
    var scriptSuti = document.createElement('script');
    scriptSuti.type = 'text/javaScript';
    scriptSuti.src = 'https://greasyfork.org/scripts/373944-sutikezeles/code/Sutikezeles.js?version=642233';
    document.getElementsByTagName('head')[0].appendChild(scriptSuti);
    var scriptHang = document.createElement('script');
    scriptHang.type = 'text/javaScript';
    scriptHang.src = 'https://greasyfork.org/scripts/373945-hangkeszlet/code/Hangkeszlet.js?version=642238';
    document.getElementsByTagName('head')[0].appendChild(scriptHang);

    $(document).ready( function() {
        setTimeout(function(){
            if (!$('script[src="https://static.ncore.cc/static/js/spookyd.js"]').length) {
                alert('Nincs veszély, kikapcsolhatod a „nCore - Spooky Dayz” jelzőt!');
            }
        }, 2000);
        var ico_jlz='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="rgba(255,255,255,0.8)" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>';
        var ico_hng='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="rgba(255,255,255,0.8)" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
        var ico_kld='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="rgba(255,255,255,0.8)" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>';
        $("#infosav_extra").prepend('<a href="javascript: var da=$(\'#jlzhely\').css(\'display\'),dc=(da==\'none\') ? (\'block\') : (\'none\'); $(\'#jlzhely\').css(\'display\',dc); void(0)" style="float:left;margin-right: 5px;">'+ico_jlz+'</a>');
        $("#infosav_extra").append('<div id="jlzhely"></div>');
        $("#jlzhely").append('<label>Telegram <input type="checkbox" id="tg_inp" '+((getCookie('tg_inp')=='1') ? ('checked') : (''))+' onchange="$(\'#tghely\').css(\'display\',(this.checked) ? (\'block\') : (\'none\'));setCookie(\'tg_inp\',((this.checked) ? (\'1\') : (\'0\')),365);"></label><br>');
        $("#jlzhely").append('<div id="tghely" style="display:'+((getCookie('tg_inp')=='1') ? ('block') : ('none'))+';"></div>');
        $("#tghely").append('<label>Telegram ID</label> <input type="text" id="tg_id" onkeyup="setCookie(\'tg_id\',this.value,365);" value="'+getCookie('tg_id')+'" placeholder="Telegram ID"><br>');
        $("#tghely").append('<label>Telegram BOT</label> <input type="text" id="tg_bot" onkeyup="setCookie(\'tg_bot\',this.value,365);" value="'+getCookie('tg_bot')+'" placeholder="Telegram BOT"><br>');
        var hng_kiv=getCookie('hng'); if(hng_kiv=="")hng_kiv=0;
        $("#jlzhely").append('<label>Hang</label>');for (var i=0;i<hng.length;i++){$("#jlzhely").append('<input type="radio" name="hng" '+((hng_kiv==i) ? ('checked') : (''))+' value="hng_'+i+'" onclick="$(\'#vuhuhu\').attr(\'src\', \'data:audio/ogg;base64,\'+hng['+i+']);setCookie(\'hng\','+i+',365)">');}
        $("#jlzhely").append('<div id="hnghely"></div>');
        $("#hnghely").append('<audio controls="" id="vuhuhu" style="position:absolute;right:0px;" src="data:audio/ogg;base64,'+hng[hng_kiv]+'"></audio>');
        $('body').bind("DOMSubtreeModified",function(e){
            setTimeout(function(){
                if ($('#spo0kyD img').length && $("#spo0kyD").data('votma')===undefined){
                    if($('#tg_inp').prop('checked')&&$('#tg_id').val()!=''&&$('#tg_bot').val()!='')$("#main_all").prepend('<img src="https://api.telegram.org/bot'+$('#tg_bot').val()+'/sendmessage?chat_id='+$('#tg_id').val()+'&text=t%C3%B6k" style="width:0px;height:0px">');
                    db++;var id="toktar"+db, src=$('#spo0kyD img').attr('src');
                    if (!$('#main_all #'+id).length){$("#main_all").prepend('<img id="'+id+'" title="'+db+'. rém" src="'+src+'" style="height:32px;opacity:0.5">');}
                    $("#spo0kyD").click(function(){var tokjel=$(this).data('votma'); $('#'+tokjel).css('opacity',1); setTimeout(function(){var tortenet=$("#spo0kyD").text();$('#'+$("#spo0kyD").data('votma')).prop('title', tortenet.replace("bezár", ""));},1000);}).data('votma',id);
                    var vuh_hng=document.getElementById('vuhuhu').play();
                    setTimeout(function(){
                        console.log('Kapd már el!!!');
                    }, Math.floor(Math.random() * (2000 - 1500) + 1500));
                    if (vuh_hng !== undefined) {
                        vuh_hng.then(_ => {/*console.log('vuhuhu');*/}).catch(error => {/*console.log('beragadt');*/$('#jlzhely').css('display','block');alert('Nem tudom elindítani a hangot, egyszer indítsd el kézzel! Nyitom a panelt.');});
                    }
                }else{console.log('csak árnyék');}
            }, 1000);
        });
    });
})();