// ==UserScript==
// @name         chengxin28.com
// @namespace    https://www.chengxin28.com
// @version      1.0
// @description  28游戏N余几，投注同选功能
// @author       蓝天碧海；QQ：86886306
// @match        https://www.chengxin28.com/game.php
// @grant        none
// ==/UserScript==

(function () {
   'use strict';

function loadScriptString(code) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    try {
        script.appendChild(document.createTextNode(code));
    } catch (ex) {
        script.text = code;
    }
     window.document.body.appendChild(script);
    

}
    loadScriptString('function getContent(url){if(typeof(timerid)!="undefined")clearInterval(timerid);$.get(url,{},function(ret){$("#divContent").html(ret).prepend("<script type=\\"text/javascript\\">function useModel(o){var istart=0;var imore=0;var tmpscore=0;if(GTYPE==16){istart=3;imore=5}if(GTYPE==17){istart=3;imore=6}if(GTYPE==10){istart=1;imore=1}if(GTYPE==11){istart=2;imore=2}if(GTYPE==22){istart=6;imore=6}if(GTYPE==7){istart=1;imore=1}var data=PRESSNUM.split(\\",\\");var cc=parseInt(data.length);if(o==0){$(\\"[name = \'tbChk\']:checkbox\\").attr(\\"checked\\",true);for(var i=0;i<cc;i++){$(\\"#tbNum\\"+i).val(parseInt(data[i]))}}if(o==1){for(var i=0;i<cc;i++){if((i+istart)%2==0){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==2){for(var i=0;i<cc;i++){if((i+istart)%2==1){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==3){var num=data.length/2;for(var i=0;i<cc;i++){if(GTYPE==11||GTYPE==7){if(i<num-1){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}else{if(i<num){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}}if(o==4){var num=data.length/2;for(var i=0;i<cc;i++){if(GTYPE==11||GTYPE==7){if(i>=num-1){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}else{if(i>=num){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}}if(o==5){var num=data.length/3;for(var i=0;i<cc;i++){if(GTYPE==16||GTYPE==17){if(i>=num-1&i<2*num){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}else if(GTYPE==10||GTYPE==7){if(i>=num-1&i<=2*num){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}else if(GTYPE==22){if(i>num-1&&i<2*num){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}else if(GTYPE==11){if(i>num-1&&i<2*num){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}else{if(i>=num&i<2*num-1){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}}if(o==6){var num=data.length/4;for(var i=0;i<cc;i++){if(GTYPE==10||GTYPE==7){if(i<num||i>=3*num-1){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}else if(GTYPE==16||GTYPE==17){if(i<=num||i>=3*num-1){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}else if(GTYPE==11){if(i<=num||i>2*num+2){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}else if(GTYPE==22){if(i<=num+1||i>=3*num-2){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}else{if(i<num+3||i>3*num-4){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}}if(o==7){var num=(data.length+imore)/2;for(var i=0;i<cc;i++){if(GTYPE==22){if((i+istart)>num+2&&(i+istart)%2==1){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}else{if((i+istart)>num&&(i+istart)%2==1){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}}if(o==8){var num=(data.length+imore)/2;for(var i=0;i<cc;i++){if(GTYPE==22){if((i+istart)<num+2&&(i+istart)%2==1){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}else{if((i+istart)<num&&(i+istart)%2==1){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}}if(o==9){var num=(data.length+imore)/2;for(var i=0;i<cc;i++){if(GTYPE==22){if((i+istart)>num+3&&(i+istart)%2==0){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}else{if((i+istart)>=num&&(i+istart)%2==0){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}}if(o==10){var num=(data.length+imore)/2;for(var i=0;i<cc;i++){if(GTYPE==22){if((i+istart)<num+4&&(i+istart)%2==0){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}else{if((i+istart)<num&&(i+istart)%2==0){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}}if(o==11){var num=(data.length+imore)/3;if(GTYPE==10||GTYPE==7){istart--}for(var i=0;i<cc;i++){if(GTYPE==22){if((i+istart)>2*num+2){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}else if(GTYPE==11){if((i+istart)>2*num+1){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}else{if((i+istart)>2*num-1){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}}if(o==12){var num=(data.length+imore)/3;for(var i=0;i<cc;i++){if(GTYPE==22){if((i+istart)<=num+3){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}else{if((i+istart)<=num){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}}if(o==13){for(var i=0;i<cc;i++){if((i+istart)%10==0){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==14){for(var i=0;i<cc;i++){if((i+istart)%10==1){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==15){for(var i=0;i<cc;i++){if((i+istart)%10==2){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==16){for(var i=0;i<cc;i++){if((i+istart)%10==3){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==17){for(var i=0;i<cc;i++){if((i+istart)%10==4){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==18){if(GTYPE==10){for(var i=0;i<cc;i++){if((i+istart)%10<5&&(i+istart)%10>=0){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}else{for(var i=0;i<cc;i++){if((i+istart)%10<5){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}}if(o==19){for(var i=0;i<cc;i++){if((i+istart)%10==5){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==20){for(var i=0;i<cc;i++){if((i+istart)%10==6){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==21){for(var i=0;i<cc;i++){if((i+istart)%10==7){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==22){for(var i=0;i<cc;i++){if((i+istart)%10==8){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==23){for(var i=0;i<cc;i++){if((i+istart)%10==9){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==24){if(GTYPE==10){for(var i=0;i<cc;i++){if((i+istart)%10>=5){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}else{for(var i=0;i<cc;i++){if((i+istart)%10>=5){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}}if(o==25){for(var i=0;i<cc;i++){if((i+istart)%3==0){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==26){for(var i=0;i<cc;i++){if((i+istart)%3==1){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==27){for(var i=0;i<cc;i++){if((i+istart)%3==2){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==28){for(var i=0;i<cc;i++){if((i+istart)%4==0){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==29){for(var i=0;i<cc;i++){if((i+istart)%4==1){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==30){for(var i=0;i<cc;i++){if((i+istart)%4==2){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==31){for(var i=0;i<cc;i++){if((i+istart)%4==3){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==32){for(var i=0;i<cc;i++){if((i+istart)%5==0){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==33){for(var i=0;i<cc;i++){if((i+istart)%5==1){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==34){for(var i=0;i<cc;i++){if((i+istart)%5==2){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==35){for(var i=0;i<cc;i++){if((i+istart)%5==3){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==36){for(var i=0;i<cc;i++){if((i+istart)%5==4){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==37){for(var i=0;i<cc;i++){if((i+istart)%2==0){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==38){for(var i=0;i<cc;i++){if((i+istart)%2==1){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==39){var num=parseInt(data.length/2);for(var i=0;i<cc;i++){if(i>=num){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==40){var num=parseInt(data.length/2);for(var i=0;i<cc;i++){if(i<num){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==41){for(var i=0;i<cc;i++){if(i>0&i<4){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}if(o==42){for(var i=0;i<cc;i++){if(i==0||i==4){$(\\"#tbNum\\"+i).val(parseInt(data[i]));$(\\"#tbChk\\"+i).attr(\\"checked\\",\\"checked\\")}}}$(\\"input[name=\'tbNum[]\']\\").each(function(){if($(this).val()!=\\"\\")tmpscore+=parseInt($(this).val())});$(\\"#tbTotal\\").html(tmpscore)}</script>")})}')
    
    })();