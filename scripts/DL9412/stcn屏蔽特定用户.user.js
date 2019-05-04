// ==UserScript==
// @name         stcn屏蔽特定用户
// @namespace    acngamer.com
// @version      0.21
// @description  本脚本用于屏蔽stcn指定用户的主题以及回复
// @author       DL9412
// @match        https://steamcn.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //重写ajax添加监听
    function ajaxEventTrigger(event) {
        var ajaxEvent = new CustomEvent(event, { detail: this });
        window.dispatchEvent(ajaxEvent);
    }
    var oldXHR = window.XMLHttpRequest;
    function newXHR() {
        var realXHR = new oldXHR();
        realXHR.addEventListener('abort', function () { ajaxEventTrigger.call(this, 'ajaxAbort'); }, false);
        realXHR.addEventListener('error', function () { ajaxEventTrigger.call(this, 'ajaxError'); }, false);
        realXHR.addEventListener('load', function () { ajaxEventTrigger.call(this, 'ajaxLoad'); }, false);
        realXHR.addEventListener('loadstart', function () { ajaxEventTrigger.call(this, 'ajaxLoadStart'); }, false);
        realXHR.addEventListener('progress', function () { ajaxEventTrigger.call(this, 'ajaxProgress'); }, false);
        realXHR.addEventListener('timeout', function () { ajaxEventTrigger.call(this, 'ajaxTimeout'); }, false);
        realXHR.addEventListener('loadend', function () { ajaxEventTrigger.call(this, 'ajaxLoadEnd'); }, false);
        realXHR.addEventListener('readystatechange', function() { ajaxEventTrigger.call(this, 'ajaxReadyStateChange'); }, false);
        return realXHR;
    }
    window.XMLHttpRequest = newXHR;

    window.addEventListener('ajaxReadyStateChange', function (e) {
        if(e.detail.readyState == 4){
            setTimeout(function(){hideuser();},1000)
        }
    });
    window.addEventListener('ajaxAbort', function (e) {
    });

    //此处填写stcn用户uid，单人格式为[xxxxx]，多人格式为[xxxxxx,xxxxxx]
    var uid=[];
    var hidetitle=1;
    var hidereply=1;
    hideuser();
    function hideuser(){
        console.info('hidestart');
        var type=0;
        var bd = document.getElementById('nv_forum');
        if(!bd){return;}
        if(bd.className == 'pg_forumdisplay'){
            type = 0;
        }else if(bd.className == 'pg_viewthread'){
            type = 1;
        }else if(bd.className == 'pg_index'){
            type = 2;
        }
        if(type == 0 && hidetitle == 1){
            for(var i=0;i<uid.length;i++){
                var nowuid = uid[i];
                var reg = new RegExp("uid="+nowuid,'g');
                var replylist = document.getElementsByClassName('by-author');
                for(var j=0;j<replylist.length;j++){
                    var author = replylist[j].getElementsByClassName('threadlist-blue-text');
                    if(reg.test(author[0].href)){
                        replylist[j].parentNode.style.display = 'none';
                    }
                }
            }
        }else if(type == 1 && hidereply == 1){
            for(var m=0;m<uid.length;m++){
                var nowuid1 = uid[m];
                var reg1 = new RegExp("suid-"+nowuid1,'g');
                var replylist1 = document.getElementsByClassName('xw1');
                for(var n=0;n<replylist1.length;n++){
                    if(reg1.test(replylist1[n].href)){
                        replylist1[n].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
                    }
                }
            }
        }else if(type == 2 && hidetitle == 1){
            console.info(333);
            for(var x=0;x<uid.length;x++){
                var nowuid2 = uid[x];
                var reg2 = new RegExp("suid-"+nowuid2,'g');
                var replylist2 = document.getElementsByTagName('em');
                for(var z=0;z<replylist2.length;z++){
                    var ema = replylist2[z].getElementsByTagName('a');
                    if(ema.length>0){
                        if(reg2.test(ema[0].href)){
                            replylist2[z].parentNode.style.display = 'none';
                        }
                    }
                }
            }
        }
    }
})();