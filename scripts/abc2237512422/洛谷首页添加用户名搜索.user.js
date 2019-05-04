// ==UserScript==
// @name         洛谷首页添加用户名搜索
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  在洛谷的首页添加用户名搜索功能
// @author       abc2237512422
// @match        https://www.luogu.org/
// @match        http://www.luogu.org/
// @match        https://www.luogu.org
// @match        http://www.luogu.org
// @match        https://www.luogu.org/#feed
// @match        http://www.luogu.org/#feed
// @match        https://www.luogu.org/#feed/
// @match        http://www.luogu.org/#feed/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var tar=document.getElementsByClassName("lg-index-content")[0].getElementsByClassName("lg-article lg-index-stat")[0].parentNode;
    var ele="<div class='am-u-md-3'><div class='lg-article lg-index-stat'><h2>用户名搜索</h2><div class='am-input-group am-input-group-primary am-input-group-sm'><input type='text' class='am-form-field' placeholder='输入要搜索的用户名' id='usernamesearchbox'></div><p><button class='am-btn am-btn-danger am-btn-sm' id='usernamesearch'>进入用户主页</button></p></div></div>";
    $(tar).after(ele);
    document.getElementsByClassName("lg-index-content")[0].getElementsByClassName("am-u-md-9")[0].setAttribute("class","am-u-md-6");

    function searchname(){
        var username=document.getElementById("usernamesearchbox").value;
        $.get("/space/ajax_getuid?username=" + username,
              function (data) {
            var arr = eval('(' + data + ')');
            if (arr['code']=="404"){
                show_alert("提示","找不到用户")
                return;
            }
            var tarid = arr['more']['uid'];
            location.href="https://www.luogu.org/space/show?uid="+tarid;
        }
             );
    }
    document.getElementById("usernamesearch").onclick=function(){
        searchname();
    };
    $(document.getElementById("usernamesearchbox")).keydown(function (e) {
        if (e.keyCode==13){
            searchname();
        }
    });
    $('#container').highcharts().reflow();
    $('#container2').highcharts().reflow();
})();