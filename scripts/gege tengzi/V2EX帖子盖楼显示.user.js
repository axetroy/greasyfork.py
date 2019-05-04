// ==UserScript==
// @name         V2EX帖子盖楼显示
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  V2EX帖子盖楼,浏览帖子更直观！
// @author       why2fly@aliyun.com
// @match        *://www.v2ex.com/*
// @icon         http://www.v2ex.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var a = $('div.cell > table > tbody > tr > td:nth-child(3) > div.fr > span').get().map(i=>i.innerHTML);
    var b = $('div.cell > table > tbody > tr > td:nth-child(3) > div.reply_content').get().map(i=>i.innerHTML);
    var c = $('div.cell > table > tbody > tr > td:nth-child(3) > strong > a').get().map(i=>i.innerHTML);

    var d = $('div.cell > table > tbody > tr > td:nth-child(3) > div.reply_content');
    var m = $('#Main > div:nth-child(4) > div[id].cell');

    var e = $('div.cell > table > tbody > tr > td:nth-child(3) > strong > a');
    var x = $('#Main > div:nth-child(2) > div.header > small > a')[0].innerHTML;
    var y = $('#Rightbar > div:nth-child(2) > div:nth-child(1) > table:nth-child(1) > tbody > tr > td:nth-child(3) > span > a')
    y = y.length?y[0].innerHTML :null ;
    var z = "why2fly";

    var i = 1;
    while(i< m.length){

        if( c[i] == x )
        {
            e[i].setAttribute('style','color:blue');
        }
        else if( c[i] == y )
        {
            e[i].setAttribute('style','color:red');
        }
        else if( c[i] == z )
        {
            e[i].setAttribute('style','color:yellow');
        }

        if(b[i].match("楼上"))
        {
            console.log(a[i]+" have @楼上 #"+i);
            d[i-1].append(m[i]);
        }

        for(var j=i-1;j>=0;j--){
            if(b[i].match(c[j])){
                console.log(a[i]+" have @"+c[j] + " #"+(j+1));
                d[j].append(m[i]);
                break;
            }
        }
        i++;
    }
})();