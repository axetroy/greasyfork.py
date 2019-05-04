// ==UserScript==
// @name         清空微博
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  empty your weibo
// @author       pipi
// @include      https://weibo.com/*/profile*
// @run-at       document-idle
// @grant        none
// ==/UserScript==
'use strict';

window.setTimeout(checkStstus,1000);
function checkStstus(){
    console.log(document.readyState)
    if(document.readyState=='complete'||document.readyState=='interactive'){
        var dom = document.getElementsByTagName("div");
        var match = new Array();
        var ids = new Array();
        for (var i in dom) {
            if ((typeof dom[i]) === "object"){
                if (dom[i].getAttribute("action-type") === "feed_list_item"){
                    //console.log(dom[i]);
                    match.push(dom[i]);
                    for( let k of dom[i].attributes){
                        if(k.name === "mid"){
                            ids.push(k.nodeValue);
                        }
                    }
                }
            }
        }
        for (var j in ids){
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://weibo.com/aj/mblog/del?ajwvr=6');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(encodeURI('mid=' + ids[j]));
        }
        if(ids !=null){
            location.reload();
        }
    }
}