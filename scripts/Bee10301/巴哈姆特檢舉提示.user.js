// ==UserScript==
// @name         巴哈姆特檢舉提示
// @namespace    Bee10301
// @version      1.3
// @description  有檢舉時跳出提醒，點確定進入後台。
// @author       Bee10301
// @match        https://forum.gamer.com.tw/B.php?*
// @homepage    https://home.gamer.com.tw/home.php?owner=bee10301
// ==/UserScript==

(function() {
    'use strict';
    window.onload=function(){
        if(document.body.outerHTML.match(/檢舉待處理/g).length>3){
            Dialogify.confirm('有檢舉，進入後台?',{
                ok: function(){
                    window.open('gemadmin/accuse_B_2k14.php?bsn='+window.location.href.match(/bsn=(\d*)/)[1],'','');
                }
            });
        }
    }
})();