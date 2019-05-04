// ==UserScript==
// @name         巴哈姆特公會新串通知
// @namespace    http://www.isaka.idv.tw/
// @version      0.2
// @description  公會有新串的時候就會發出通知呦～
// @author       Isaka(jason21716@巴哈姆特)
// @match        https://guild.gamer.com.tw/*
// @match        http://guild.gamer.com.tw/*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// ==/UserScript==
var config = {
    showDesktopNotifications: true,
    reload_time: 5000,
    guild_id: []
};
var newestContent = {};

(function() {
    'use strict';

    if (Notification.permission !== 'granted' && config.showDesktopNotifications) {
        Notification.requestPermission();
    }

    var status = false;

    $('.BH-menuE').append('<li id="script_li_btn"><a>啟動新串通知</a></li>');

    var intervalArr = [];

    $('#script_li_btn').click(function(){
        if(!status){
            var gsnRegex =  /(?:guild\.php\?sn|&gsn)\=([\d]*)/;
            var url = window.location.href;
            var currentGsn = url.match(gsnRegex);
            if(currentGsn != undefined){
                if(config.guild_id.indexOf(currentGsn[1]) == -1)
                    config.guild_id.push(currentGsn[1]);
            }
            if(config.guild_id.length == 0){
                alert('你尚未在腳本裡設定公會編號，或者是沒有在特定公會內啟動！');
                return;
            }

            $.each(config.guild_id, function( index, value ) {
                var intervalName = window.setInterval(function(){
                    //console.log(config);
                    //console.log("starting readContent in " + value);
                    readContent(value);
                }, config.reload_time);
                intervalArr.push(intervalName);
            });
            $('#script_li_btn a').text('關閉新串通知');
            status = true;
        }
        else{
            $.each(intervalArr, function( index, value ) {
                clearInterval(value);
            });
            $('#script_li_btn a').text('啟動新串通知');
        }
    });

})();

function readContent(guild_id){
    'use strict';

    var request_url = 'https://guild.gamer.com.tw/guild.php?sn=' + guild_id;
    $.get(request_url,function(data,status){
        if(status!='success'){
            console.log('link error in guild_id');
            console.log(data);
        }
        //console.log(data);
        var re = /^msgArr = (.*);$/m;
        var contentJsonArr = data.match(re);
        var contentObj = JSON.parse(contentJsonArr[1]);
        //console.log(contentObj);
        if(newestContent[guild_id] == undefined){
            newestContent[guild_id] = contentObj[0];
        }
        else if(newestContent[guild_id].sn !== contentObj[0].sn ){
            var notificationTitle = "來自" + contentObj[0].nick + "的新訊息!";
            var notificationText = contentObj[0].content.substring(0,30);
            newestContent[guild_id] = contentObj[0];
            notifyMe(guild_id, contentObj[0].sn, notificationTitle, notificationText);
        }
    });
}

function notifyMe(guild_id, sn, title, message) {
    'use strict';
    if (!config.showDesktopNotifications || !Notification) {
        return;
    } else {
        var icon_url = 'https://p2.bahamut.com.tw/B/GUILD/c/4/'+guild_id.padStart(10,"0")+'.PNG';
        var notification = new Notification(title, {
            icon: icon_url,
            body: message,
        });

        notification.onclick = function () {
            var url = 'https://guild.gamer.com.tw/singleACMsg.php?sn='+sn+'&gsn='+guild_id;
            GM_openInTab(url, false);
            this.close();
        };
    }
}