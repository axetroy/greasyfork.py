// ==UserScript==
// @name         CHH出售发布区新帖监控 BY:Aochong
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.chiphell.com/forum.php?mod=forumdisplay&fid=26&filter=author&orderby=dateline
// @grant        none
// ==/UserScript==

(function() {
    if(! ('Notification' in window) ){
        alert('Sorry bro, your browser is not good enough to display notification');
        return;
	}
    window.Notification.requestPermission();

    var $$ = jQuery;
    var list = $$(".s.xst");
    var idArray = new Array();
    for(var i=0;i<list.length;i++) {
        var a =list[i];
        var href = $$(a).attr("href");
        var id = new RegExp("\\d{7}").exec(href);
        idArray.push(id);
    }
    idArray.sort();
    var max = localStorage.getItem("maxId");
    if(max == null) {
        localStorage.setItem("maxId",idArray[idArray.length-1]);
    } else {
        for(var j=0;j<idArray.length;j++) {
            if(idArray[j] > max) {
                sendNotif(idArray[j]);
            }
        }
    }
    localStorage.setItem("maxId",idArray[idArray.length-1]);

    // 显示通知
    function sendNotif(id) {
        var obj = jQuery("#normalthread_"+id).find(".s.xst");
        var title = obj.text();
        var url = obj.attr("href");
        console.log(title+":"+url);
        var notif = new Notification(title,{body:'CHH出售发布区',dir:'auto'});

        //消息框被点击时被调用
        notif.onclick = function() {
            window.open(url,"_blank");
        }
    }

    setInterval(function(){
        history.go(0);
    }, 60000);
})();