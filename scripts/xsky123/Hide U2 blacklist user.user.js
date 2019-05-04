// ==UserScript==
// @name         Hide U2 blacklist user
// @namespace    https://xsky123.com
// @version      2.0
// @description  Hide blacklist users' words
// @author       XSky123
// @match        https://u2.dmhy.org
// @match        https://u2.dmhy.org/*
// @match        http://u2.dmhy.org
// @match        http://u2.dmhy.org/*
// @noframes
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // GLOBAL SETTINGS
    // 1. Disable async in ajax
    $.ajaxSetup({
        async : false
    });

    // 2. Set empty blacklist
    var blacklist = [];
    var URL_ = window.location.href;

    function get_date() {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        return `${year}-${month < 10 ? "0"+month : month}-${day < 10 ? "0"+day : day} ${hour < 10 ? "0"+hour : hour}:${minute < 10 ? "0"+minute : minute}:${second < 10 ? "0"+second : second}`;
    }


    // Step 1: Fetch blacklist from localStorage
    function init_blacklist(){
        if(!localStorage.getItem('u2_blacklist')){ // not storaged
            get_blacklist();
        }else{
            // check refresh
            if(localStorage.getItem('u2_blacklist_update_at')){
                var now = get_date();
                var last_update_at = new Date(localStorage.getItem('u2_blacklist_update_at'));
                if(now - last_update_at > 24 * 3600 * 1000){ // if over 1 day fetch new
                    get_blacklist();
                }else{                                       // else use local data
                    blacklist = JSON.parse(localStorage.getItem('u2_blacklist'));
                }
            }else{
                get_blacklist();
            }
        }
        if(URL_.search("friends") !== -1){ // if visit friends page, update.
            get_blacklist();
        }
    }


    function get_blacklist(){
        blacklist = fetch_blacklist();
        localStorage.setItem('u2_blacklist', JSON.stringify(blacklist));
        localStorage.setItem('u2_blacklist_update_at', get_date());
        console.log("Blacklist has refreshed");
    }


    function fetch_blacklist(){
        var black_list = [];
        var friend_page = "";
        var all_blocked = [];
        var finish_flag = 0;
        $.get("https://u2.dmhy.org/friends.php", function(data, status){
            // alert("Data: " + data + "\nStatus: " + status);
            if(status === "success"){
                friend_page = data;
                all_blocked = friend_page.match(/type=block.*?ltr'>(.*?)<\/bdo/g);
                all_blocked.forEach(function(each){
                    black_list.push(each.match(/targetid=(.*?)"/)[1]);
                });
                finish_flag = 1;
            }else{
                throw new Error("Can not access friends page.");
            }
        });
        return black_list;

    }




    // Step 2.1: Hide MotherFxxker's words in shoutbox
    function hide_shoutbox_dirty_words(){
        var shoutbox = document.getElementsByTagName('iframe')[0];
        if(shoutbox.contentWindow.document.getElementsByTagName("head")[0].innerHTML === "")
            ;
        else{
            var shoutrow = shoutbox.contentWindow.document.getElementsByClassName("shoutrow");
            var shoutrows = shoutrow[0].getElementsByTagName("div");
            var uid;
            var i;
            var count = 0;
            for(i=0;i<shoutrows.length;i++)
            {
                var each = shoutrows[i];

                uid = each.innerHTML.match(/sbat\((.*?)\)/);
                if(!uid)
                    continue;

                if(blacklist.indexOf(uid[1]) !== -1){ // find blocked user
                    var target = each.getElementsByTagName("bdo");
                    target[target.length-1].innerHTML = "<i>黑名单用户发言，已屏蔽</i>";
                    count++;
                }
            }
            console.log("Blocked " + count + " messages.")
        }
    }

    // Step 2.2 Hide MotherFxxker's words in forum
    function hide_forum_dirty_posts(){
        var blocked_html = '<div style="background-color:#AEAEAE ; border:1px solid #949494; width:95%; padding:8px">' +
            '<strong>[已屏蔽]</strong>' +
            '<br><br>' +
            '本层内容为您黑名单中用户发布，已由' +
            '<a href="https://greasyfork.org/zh-CN/scripts/376316-hide-u2-blacklist-user">' +
            '<b>Hide U2 blacklist user脚本</b>' +
            '</a>为您自动屏蔽。' +
            '</div>';
        var all_rows = document.querySelectorAll('table[id^=pid]');
        if(all_rows.length === 0)
            all_rows = document.querySelectorAll('table[id^=cid]'); // if no pid try cid (torrent comment)
        var uid;
        var i;
        for(i=0;i<all_rows.length;i++) {
            var each = all_rows[i];

            uid = each.querySelector("a[class$=_Name]")["href"].match(/id=(\d+)/)[1];
            if(blacklist.indexOf(uid) !== -1) { // find blocked user
                var content = each.parentElement.nextElementSibling.getElementsByClassName("rowfollow")[1];
                content.innerHTML = blocked_html;
            }
        }

    }

    window.addEventListener("load", init, false);
    init_blacklist();

    if(URL_.search("forums") !== -1 || URL_.search("/details.php")) {
        hide_forum_dirty_posts();
    }

    function init(){
        document.getElementsByTagName('iframe')[0].onload = function () {
            hide_shoutbox_dirty_words()
        };
        hide_shoutbox_dirty_words();
    }
})();