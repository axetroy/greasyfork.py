// ==UserScript==
// @name         steam一键移除
// @version      0.4.1
// @description  steam一键取关鉴赏家，取关游戏，清空愿望单。
// @namespace    https://greasyfork.org/users/133492
// @author       HCLonely
// @match        *://store.steampowered.com/*
// @match        *://steamcommunity.com/*
// @include      *://store.steampowered.com/app/*
// @supportURL   https://steamcn.com/t455167-1-1
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @run-at       document-end
// @connect      steamcommunity.com
// @connect      steampowered.com
// ==/UserScript==

(function() {
    'use strict';

    var url=window.location.href;
    var userName="";
    var div=document.createElement("div");
    div.setAttribute("id", "remove");
    div.setAttribute("style", "background-color: #181f27;position:fixed;border-radius: 20px;width: 800px;height: 500px;margin: auto;top: 0;left: 0;right: 0;bottom: 0;z-index: 99999999999;display:none");
    div.innerHTML=`<div class="button_container" style="margin:50px 45px 15px 45px;">
<div class="btn_wrapper">
<a id="unf_c" href="javascript:void(0)" class="big_button" style="cursor:pointer">
取关鉴赏家					</a>
</div>
<div class="btn_wrapper">
<a id="unf_g" href="javascript:void(0)" class="big_button" style="cursor:pointer">
取关游戏					</a>
</div>
<div class="btn_wrapper">
<a id="rem_g" href="javascript:void(0)" class="big_button" style="cursor:pointer">
移除愿望单					</a>
</div>
</div>
<h2 id="pro" style="margin: 0 45px;"></h2>
<div id="info" style="background-color: #1e3a4c;border-radius: 3px;border: 1px solid rgba( 0, 0, 0, 0.3);box-shadow: 1px 1px 0px rgba( 255, 255, 255, 0.2);color: #fff;margin:0 55px 0 45px;overflow-y:auto;height:320px;padding:0 5px"><\/div>
<a href="javascript:void(0)" style="position:absolute;top:5px;right:5px;font-size:24px;cursor:pointer" onClick="document.getElementById('remove').style.display='none'">X</a>`;
    document.getElementsByTagName("body")[0].appendChild(div);
    var a=document.createElement("a");
    a.setAttribute("id", "remove_btn");
    a.setAttribute("class", "menuitem supernav");
    a.setAttribute("style", "cursor:pointer");
    a.innerHTML="一键移除";
    document.getElementsByClassName("supernav_container")[0].appendChild(a);
    var queue=document.createElement("a");
    queue.setAttribute("id", "auto_queue");
    queue.setAttribute("class", "menuitem supernav");
    queue.setAttribute("style", "cursor:pointer");
    queue.innerHTML="探索队列";
    document.getElementsByClassName("supernav_container")[0].appendChild(queue);

    a.onclick=function(){
        var username=document.getElementsByClassName("username");
        if(username.length>0){
            document.getElementById('remove').style.display='block';
            var user=jQuery('a[data-miniprofile]');
            if(user.length>0){
                userName=user[0].innerText;
            }else{
                if(confirm("请先登录！")){
                    window.open("https://store.steampowered.com/login/","_self");
                }
            }
        }else{
            if(confirm("请先登录！")){
                window.open("https://store.steampowered.com/login/","_self");
            }
        }
    };
    queue.onclick=skipQueue;
    document.getElementById("unf_c").onclick=function(){
        if(confirm("请确认是否取关所有鉴赏家？ \n！！！此操作不可恢复请谨慎选择！")){
            get_curators();
        }
    };
    document.getElementById("unf_g").onclick=function(){
        if(confirm("请确认是否取关所有游戏？ \n！！！此操作不可恢复请谨慎选择！")){
            get_follow_games();
        }
    };

    document.getElementById("rem_g").onclick=function(){
        if(confirm("请确认是否移除所有愿望单游戏？ \n！！！此操作不可恢复请谨慎选择！")){
            get_wishlist();
        }
    };

    //一键取关+移除愿望单
    if(/https?:\/\/store.steampowered.com\/app\/[\w\W]*/.test(url)){
        jQuery("div.queue_control_button.queue_btn_ignore").after(`
<div class="queue_control_button queue_btn_remove">
<div class="btnv6_blue_hoverfade  btn_medium queue_btn_inactive" style="" data-tooltip-text="移除愿望单和取消关注。">
<span>一键移除</span>
</div>
</div>
`);
        jQuery(".queue_btn_remove>.queue_btn_inactive").click(function(){
            removeWishlist();
            unFollow();
        });
    }
    var curators=[];
    var unfC=0;
    var unfG=0;
    var remG=0;
    var page=1;
    var sessionid=getCookie("sessionid");
    var session_id;
    //获取鉴赏家列表
    function get_curators(){
        var p=document.createElement("p");
        p.setAttribute("id", "p_curator");
        p.setAttribute("style", "font-size:15px");
        p.innerHTML=`获取鉴赏家列表...`;
        document.getElementById("info").appendChild(p);
        p.scrollIntoView();
        jQuery.ajax({
            type: "get",
            cache: false,
            url: "https://store.steampowered.com/dynamicstore/userdata/?id="+userName,
            timeout: 1000*30,
            datatype: "json",
            complete: function (data) {
                if(data.status==200){
                    var responseJSON=eval('('+data.responseText+')');
                    var curator=responseJSON.rgCurators;
                    var curators=[];
                    document.getElementById("p_curator").innerHTML+='<font style="color:green">成功！</font>';
                    Object.keys(curator).forEach(function(key){
                        curators.push(curator[key]);
                    });
                    if(curators.length>0){
                        unfollow_curators(0,curators);
                    }else{
                        document.getElementById("p_curator").innerHTML+="<br/>关注鉴赏家列表为空！";
                    }
                }else{
                    document.getElementById("p_curator").innerHTML+='<font style="color:green">失败！</font>请刷新重试';
                }
            }
        });
    }
    //读取cookie
    function getCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            return unescape(arr[2]);
        }else{
            return null;
        }
    }
    //取关鉴赏家
    function unfollow_curators(i=0,curators){
        if(i==0){
            document.getElementById("pro").innerHTML=`取关鉴赏家进度: <font id="ard">${i}</font> / ${curators.length}`;
        }else{
            document.getElementById("ard").innerHTML=`${i}`;
        }
        var p=document.createElement("p");
        p.setAttribute("id", "c_"+curators[i].clanid);
        p.innerHTML=`取关鉴赏家<a style="cursor:pointer" href=${curators[i].link} target="_blank">${curators[i].name}</a>...`;
        document.getElementById("info").appendChild(p);
        p.scrollIntoView();
        GM_xmlhttpRequest({
            method : "POST",
            url: "https://store.steampowered.com/curators/ajaxfollow",
            timeout: 1000*30,
            cache: false,
            responseType: "json",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            data:`clanid=${curators[i].clanid}&sessionid=${sessionid}&follow=0`,
            onload: function (data) {
                if(data.status==200){
                    if(data.response.success==1){
                        document.getElementById("c_"+curators[i].clanid).innerHTML+='<font style="color:green">成功！</font>';
                        unfC++;
                    }else{
                        document.getElementById("c_"+curators[i].clanid).innerHTML+='<font style="color:red">失败！</font>';
                    }
                }else{
                    document.getElementById("c_"+curators[i].clanid).innerHTML+='<font style="color:red">失败！</font>';
                }
                document.getElementById("ard").innerHTML=`${i+1}`;
                if(i<curators.length-1){
                    i++;
                    unfollow_curators(i,curators);
                }else{
                    var pe=document.createElement("p");
                    pe.setAttribute("style", "font-size:15px");
                    pe.innerHTML=`取关所有鉴赏家完成,${unfC}个鉴赏家取关成功,${curators.length-unfC}个鉴赏家取关失败!<a href="https://store.steampowered.com/curators/mycurators/" target="_blank" style="cursor:pointer">点此</a>查看结果`;
                    document.getElementById("info").appendChild(pe);
                    pe.scrollIntoView();
                }
            }
        });
    }

    //获取关注游戏列表
    function get_follow_games(){
        var p=document.createElement("p");
        p.setAttribute("id", "p_follow");
        p.setAttribute("style", "font-size:15px");
        p.innerHTML=`获取已关注游戏列表...`;
        document.getElementById("info").appendChild(p);
        p.scrollIntoView();
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://steamcommunity.com/id/"+userName+"/followedgames/",
            cache: false,
            timeout: 1000*30,
            onload: function (data) {
                if(data.status==200){
                    document.getElementById("p_follow").innerHTML+='<font style="color:green">成功！</font>';
                    var followGame=data.responseText.match(/\<div class=\"gameListRow followed\" data-appid=\"[\d]+?\"\>/gim);
                    if(followGame&&(followGame.length>0)){
                        session_id = data.responseText.match(/g_sessionID = \"(.+?)\";/)[1];
                        unfollow_games(0,unique(followGame.map((e)=>{return e.match(/[\d]+/gim)[0]})));
                    }else{
                        document.getElementById("p_follow").innerHTML+="<br/>关注游戏列表为空！";
                    }
                }else{
                    document.getElementById("p_follow").innerHTML+='<font style="color:green">失败！</font>请刷新重试';
                }
            }
        });
    }
    //取关游戏
    function unfollow_games(i=0,games){
        if(i==0){
            document.getElementById("pro").innerHTML=`取关游戏进度: <font id="ard">${i}</font> / ${games.length}`;
        }else{
            document.getElementById("ard").innerHTML=`${i}`;
        }
        var gameId=games[i];
        var p=document.createElement("p");
        p.setAttribute("id", "g_"+gameId);
        p.innerHTML=`取关游戏<a style="cursor:pointer" href="https://store.steampowered.com/app/${gameId}" target="_blank">${gameId}</a>...`;
        document.getElementById("info").appendChild(p);
        p.scrollIntoView();
        GM_xmlhttpRequest({
            method : "POST",
            url: "https://steamcommunity.com/app/"+gameId+"/stopfollowing",
            cache: false,
            timeout: 1000*30,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            data:`sessionid=${session_id}`,
            onload: function (data) {
                if(data.status==200&&(data.responseText=='null')){
                    document.getElementById("g_"+gameId).innerHTML+='<font style="color:green">成功！</font>';
                    unfG++;
                }else{
                    document.getElementById("g_"+gameId).innerHTML+='<font style="color:red">失败！</font>';
                }
                document.getElementById("ard").innerHTML=`${i+1}`;
                if(i<games.length-1){
                    i++;
                    unfollow_games(i,games);
                }else{
                    var pe=document.createElement("p");
                    pe.setAttribute("style", "font-size:15px");
                    pe.innerHTML=`取关所有游戏完成,${unfG}个游戏取关成功,${games.length-unfG}个游戏取关失败!<a href="https://steamcommunity.com/id/${userName}/followedgames/" target="_blank" style="cursor:pointer">点此</a>查看结果`;
                    document.getElementById("info").appendChild(pe);
                    pe.scrollIntoView();
                }
            }
        });
    }

    //获取愿望单列表
    function get_wishlist(){
        var p=document.createElement("p");
        p.setAttribute("id", "p_wishlist");
        p.setAttribute("style", "font-size:15px");
        p.innerHTML=`获取愿望单列表...`;
        document.getElementById("info").appendChild(p);
        p.scrollIntoView();
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://store.steampowered.com/dynamicstore/userdata/?id="+userName,
            timeout: 1000*30,
            cache: false,
            responseType: "json",
            onload: function (data) {
                if(data.status==200){
                    var wishlistGame=data.response.rgWishlist;
                    document.getElementById("p_wishlist").innerHTML+='<font style="color:green">成功！</font>';
                    if(wishlistGame.length>0){
                        remove_wishlist(0,wishlistGame);
                    }else{
                        document.getElementById("p_wishlist").innerHTML+="<br/>愿望单为空！";
                    }
                }else{
                    document.getElementById("p_wishlist").innerHTML+='<font style="color:green">失败！</font>请刷新重试';
                }
            }
        });
    }
    //移除愿望单
    function remove_wishlist(i=0,wishlist){
        if(i==0){
            document.getElementById("pro").innerHTML=`取关游戏进度: <font id="ard">${i}</font> / ${wishlist.length}`;
        }else{
            document.getElementById("ard").innerHTML=`${i}`;
        }
        var p=document.createElement("p");
        p.setAttribute("id", "w_"+wishlist[i]);
        p.innerHTML=`移除游戏<a style="cursor:pointer" href="https://store.steampowered.com/app/${wishlist[i]}" target="_blank">${wishlist[i]}</a>...`;
        document.getElementById("info").appendChild(p);
        p.scrollIntoView();
        GM_xmlhttpRequest({
            method : "POST",
            url: "https://store.steampowered.com/api/removefromwishlist",
            timeout: 1000*30,
            cache: false,
            responseType: "json",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            data:`appid=${wishlist[i]}&sessionid=${sessionid}`,
            onload: function (data) {
                if(data.status==200){
                    if(data.response.success==1){
                        document.getElementById("w_"+wishlist[i]).innerHTML+='<font style="color:green">成功！</font>';
                        remG++;
                    }else{
                        document.getElementById("w_"+wishlist[i]).innerHTML+='<font style="color:red">失败！</font>';
                    }
                }else{
                    document.getElementById("w_"+wishlist[i]).innerHTML+='<font style="color:red">失败！</font>';
                }
                document.getElementById("ard").innerHTML=`${i+1}`;
                if(i<wishlist.length-1){
                    i++;
                    remove_wishlist(i,wishlist);
                }else{
                    var pe=document.createElement("p");
                    pe.setAttribute("style", "font-size:15px");
                    pe.innerHTML=`移除愿望单游戏完成,${remG}个游戏移除成功,${wishlist.length-remG}个游戏移除失败!<a href="https://store.steampowered.com/wishlist/id/${userName}" target="_blank" style="cursor:pointer">点此</a>查看结果`;
                    document.getElementById("info").appendChild(pe);
                    pe.scrollIntoView();
                }
            }
        });
    }

    //一键取关+移除愿望单
    function getAppid(){
        var appid=url.replace("https://store.steampowered.com/app/","");
        appid=appid.match(/[\d]+?\//)[0];
        appid=appid.replace("/","");
        return appid;
    }
    function removeWishlist(){
        jQuery.ajax({
            type: "post",
            url: '//store.steampowered.com/api/removefromwishlist',
            datatype: "json",
            cache: false,
            data:{
                sessionid:getCookie("sessionid"),
                appid:getAppid(),
            },
            crossDomain:true,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                if(data.success==true){
                    jQuery("#add_to_wishlist_area").show();
                    jQuery("#add_to_wishlist_area_success").hide();
                }
            },
        });
    }
    function unFollow(){
        jQuery.ajax({
            type: "post",
            url: '//store.steampowered.com/explore/followgame/',
            datatype: "json",
            cache: false,
            data:{
                sessionid:getCookie("sessionid"),
                appid:getAppid(),
                unfollow: '1',
            },
            crossDomain:true,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                if(data==true){
                    jQuery("div.queue_control_button.queue_btn_follow>.queue_btn_inactive").show();
                    jQuery("div.queue_control_button.queue_btn_follow>.queue_btn_active").hide();
                }
            }
        });
    }

    function skipQueue(){
        var appids,
            running = true,
            queueNumber,
            progressDialog = ShowAlertDialog('探索中', $J('<div/>').append($J('<div/>', {'class': 'waiting_dialog_throbber'}) ).append( $J('<div/>', {'id': 'progressContainer'}).text('获取进度...') ), '停止').done(abort);
        function abort(){
            running = false;
            progressDialog.Dismiss();
        }
        function retry(){
            abort();
            ShowConfirmDialog('错误', '是否重试?', '重试', '放弃').done(_exec)
        }
        function clearApp(){
            if(!running)
                return;
            showProgress();
            var appid = appids.shift();
            !appid ? generateQueue() : $J.post( appids.length ? '/app/' + appid : '/explore/next/', {sessionid: g_sessionID, appid_to_clear_from_queue: appid} ).done(clearApp).fail(retry);
        }
        function generateQueue(){
            running && $J.post('/explore/generatenewdiscoveryqueue', {sessionid: g_sessionID, queuetype: 0}).done(beginQueue).fail(retry);
        }
        function beginQueue(){
            if(!running)
                return;
            $J.get('/explore/').done(function(htmlText){
                var cardInfo = htmlText.match(/<div class="subtext">\D+(\d)\D+<\/div>/);
                if( !cardInfo ){
                    abort();
                    ShowAlertDialog('完成','已完成全部3轮探索队列');
                    return;
                }
                var matchedAppids = htmlText.match(/0,\s+(\[.*\])/);
                if( !matchedAppids ){
                    retry();
                    return;
                }
                appids = JSON.parse(matchedAppids[1]);
                queueNumber = cardInfo[1];
                appids.length == 0 ? generateQueue() : clearApp();
                showProgress();
            })
        }
        function showProgress(){
            $J('#progressContainer').html( '<br>剩余' + queueNumber + '个待探索队列, 当前队列剩余' + appids.length + '个待探索游戏' );
        }
        beginQueue();
    }

    //数组去重
    function unique(arr){
        var x = new Set(arr);
        return [...x];
    }

    GM_addStyle(`
.btn_wrapper {
margin-right: 8px;
display: inline-block;
}
.big_button {
width: 226px;
height: 58px;
font-family: "Motiva Sans", Sans-serif;
font-weight: 300;
display: inline-block;
font-size: 18px;
line-height: 56px;
color: #66c0f4;
text-align: center;
background-image: url(//steamstore-a.akamaihd.net/public/images/v6/home/background_spotlight.jpg);
background-position-y: -105px;
border-radius: 3px;
box-shadow: 0 0 4px #000;
}
`);

})();