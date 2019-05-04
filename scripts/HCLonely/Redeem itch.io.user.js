// ==UserScript==
// @name         Redeem itch.io
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  自动激活itch.io key链接和免费itch.io游戏
// @author       HCLonely
// @include      *://*.com/giveaway.php?id=*
// @include      *://*itch.io/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    var closeWindow=1;//激活完成后不自动关闭页面，改为1则为自动关闭
    var url = location.href;

    /***************************检测itch.io key链接***************************/
    if (/^https?:\/\/[\w]{1,}.com\/giveaway\.php\?id\=[\d]{0,}/i.test(url)){
        $("div.panel-body").append('<div class="col-md-6">' + '<h4 class="text-center">' +
                                   '<button id="redeemItch" style="width: 160px;" class="btn btn-danger btn-sm">' +
                                   '<i class="fa fa-gamepad">' + '</i>' + '激活' + '</button></h4></div>');
        var redeemurl=document.getElementsByClassName("text-center");
        for(var c=0;c<redeemurl.length;c++){
            var redeemurl1=redeemurl[c].innerHTML;
            if (/https:\/\/[\w]{1,}\.itch\.io\/[\w]{1,}(-[\w]{1,}){0,}\/download\/[\d\w]{1,}(-[\d\w]{1,}){1,}/i.test(redeemurl1)){
                if (confirm("检测到itch.io激活链接,是否前往激活？")){
                    window.open(redeemurl1, "_blank");
                }
                break;
            }
            if(/No more keys left sorry \:\([ ]{0,}/.test(redeemurl1)){
                if (confirm("没有key了，是否关闭？")){
                    window.close();
                }
                break;
            }
        }
        jQuery('#redeemItch').click(function(){
            window.open(redeemurl1,"_blank");
        });
    }

    /***************************自动激活itch.io游戏链接***************************/
    if (/^https?:\/\/[\w\W]{1,}\.itch\.io\/[\w]{1,}(-[\w]{1,}){0,}\/download\/[\w\W]{0,}/i.test(url)){
        $("button.button").map(function(i,e){
            /(link)|(claim)/gim.test($(e).text())&&(e.click());
            return 1;
        });
        ((/This page is linked/gim.test($("div.inner_column").text())||$("a.button.download_btn[data-upload_id]").length>0)&&closeWindow==1)&&(window.close());
    }

    /***********************领取免费itch.io游戏***************************/
    if(/^https?:\/\/.*?itch\.io\/.*?\/purchase(\?.*?)?$/.test(url)){         //点击No thanks...
        /No thanks\, just take me to the downloads/i.test($("a.direct_download_btn").text())&&($("a.direct_download_btn")[0].click());
    }else{                                                                             //加载No thanks...页面
        (/0\.00/gim.test($(".button_message").eq(0).find(".dollars[itemprop]").text())||/Name your own price/gim.test($(".button_message").eq(0).find(".buy_message").text()))&&(window.open(url+"/purchase","_self"))
    }

    /************************限时免费游戏包*****************************/
    if(/https?:\/\/itch.io\/s\/[\d]{1,}\/[\w\W]{1,}/.test(url)){
        var gameLink=document.getElementsByClassName("thumb_link game_link");
        for(var x=0,y=gameLink.length;x<y;x++){
            if(x!=y-1){
                window.open(gameLink[x].href+"/purchase","_blank");
            }else{
                window.open(gameLink[x].href+"/purchase","_self");
            }
        }
    }
})();