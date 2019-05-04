// ==UserScript==
// @name         DLD courier power assistant
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  help to filter the courier power lower than you when you click the refresh button
// @author       You
// @match        http://dld.qzapp.z.qq.com/qpet/cgi-bin/phonepk?zapp_uin=&sid=&channel=0&g_ut=*&cmd=cargo&op=3
// @grant        none
// ==/UserScript==
function request(url, callback){
    var test;
    if(window.XMLHttpRequest){
        test = new XMLHttpRequest();
    }else if(window.ActiveXObject){
        test = new window.ActiveXObject();
    }else{
        alert("请升级至最新版本的浏览器");
    };
    if(test !=null){
        try{
            test.open("GET",url,false);
            test.send(null);
            if(test.readyState==4&&test.status==200){
                var data = test.responseText;
                return typeof(callback) === 'function' ? callback(data) : data ;
            }else{
                return null;
            };
        }
        catch(error){
            return null;
        };
    };
};

function insertAfter(newElement, targetElement){
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        // 如果最后的节点是目标元素，则直接添加。因为默认是最后
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
        //如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
    };
};
(function() {
    'use strict';

    var selfPower = window.sessionStorage.getItem("selfPower"),
        autoHijack = !!window.sessionStorage.getItem("autoHijack"),
        powerList = window.sessionStorage.getItem("powerList");
    if(!!powerList){
        powerList = JSON.parse(powerList);
    }else{
        powerList = {};
    };
    if(!selfPower){
        var pageData = request("http://dld.qzapp.z.qq.com/qpet/cgi-bin/phonepk?zapp_uin=&B_UID=0&sid=&channel=0&g_ut=1&cmd=viewselfpower&type=1");
        if( !!pageData ){
            selfPower = parseFloat(pageData.match(/综合战斗力：(.*)<br \/>/)[1]);
            window.sessionStorage.setItem("selfPower", selfPower);
        };
    };

    var $a = document.getElementsByTagName("a");
    for(let i=0; i< $a.length; i++ ){
        if($a[i].text == "刷新"){
            var $refresh = $a[i];
        };
        var href = $a[i].getAttribute("href");
        if( href.indexOf("cmd=cargo&op=18&passerby_uin=") != -1 ){
            var name = $a[i].previousSibling.previousSibling.previousSibling.previousSibling.textContent,
                hijackUrl = $a[i].previousSibling.previousSibling.getAttribute("href");
            if(name.indexOf("温良恭") != -1){
                var uid = href.match(/passerby_uin=(\d*)$/)[1],
                    power = powerList[uid];
                if(!power){
                    let infoUrl = `http://dld.qzapp.z.qq.com/qpet/cgi-bin/phonepk?zapp_uin=&sid=&channel=0&g_ut=1&cmd=totalinfo&B_UID=${uid}&page=1&type=9&from_pf_list=1`;
                    pageData = request(infoUrl);
                    if( !!pageData && pageData.match(/战斗力<\/a>:(.*) 胜率:/)){
                        power = parseFloat(pageData.match(/战斗力<\/a>:(.*) 胜率:/)[1]);
                    }else{
                        power = 9999;
                    };
                    powerList[uid] = power;
                };
                if( power < selfPower ){
                    var $i = document.createElement("i"),
                        $text = document.createTextNode(power);
                    $i.appendChild( $text );
                    $i.style.color = "red";
                    insertAfter($i, $a[i]);
                    if( autoHijack ){
                        pageData = request(hijackUrl);
                        if( pageData.indexOf("剩余拦截次数：0") != -1 ){
                            autoHijack = false;
                            window.sessionStorage.clear();
                            $refresh.click();
                        };
                    };
                };
            };

        };
    };
    window.sessionStorage.setItem("powerList", JSON.stringify(powerList));
    var $a2 = document.createElement("a"), $text2;
    if(!autoHijack){
        $text2 = document.createTextNode("自动(温)");
        $a2.appendChild( $text2 );
        $a2.addEventListener('click', function(e) {
            window.sessionStorage.setItem("autoHijack", 1);
            $refresh.click();
        });
    }else{
        $text2 = document.createTextNode("取消");
        $a2.appendChild( $text2 );
        $a2.addEventListener('click', function(e) {
            window.sessionStorage.clear();
            $refresh.click();
        });
    };
    $a2.style.color = "red";
    insertAfter($a2,$refresh);
    if( autoHijack ){
        setTimeout( function(){
            $refresh.click();
        }, 20000 );
    }
    /*window.onunload = function(){
        window.sessionStorage.clear();
    };*/
})();