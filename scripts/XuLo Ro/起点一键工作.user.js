// ==UserScript==
// @name         起点一键工作
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  自动领取每日经验 自动投推荐票 自动发帖 自动领取活跃度 自动访问书友 每日自动重新开始工作 新增删除和编辑评论的功能
// @author       You
// @match        https://my.qidian.com/level*
// @require	http://cdn.staticfile.org/jquery/2.1.4/jquery.min.js
// @grant        GM_xmlhttpRequest
// @run-at      document-end
// ==/UserScript==
(function() {
    'use strict';

    var _csrfToken;//登录识别码 自动获取
    var forumId = "11193884803419603";//书评区编号
    var bookIDs = ["1010734492","1012613581"];//分别是(1)男频和(2)女频的书编号
    var hour = 8;
    var minute = 0;
    var date = new Date();
    var arrCookie = document.cookie.split(";");
    var url =window.location.href;
    for(var i=0;i<arrCookie.length;i++){
        var c=arrCookie[i].split("=");
        if(c[0].trim()=="_csrfToken"){
            _csrfToken = c[1];
        }
    }
    var interval= setInterval(function(){
        if($('.elGetExp').length>0){
            $('.elGetExp')[0].click();
        }else{
            if($('.elIsCurrent').length === 0){
                clearInterval(interval);
            }
        }
    },5000);
    function reload(){
        var allsecond = hour*60*60+minute*60;
        hour = date.getHours();
        minute = date.getMinutes();
        var second = date.getSeconds();
        var nowSecond = hour * 60 * 60 + minute * 60 + second;
        var leftMs = (allsecond - nowSecond) * 1000;
        if(leftMs<0){
            leftMs = leftMs + 60*60*1000*24;
        }
        setTimeout(function(){
            window.location=window.location.href;
        },leftMs);
    }
    reload();
    ajaxGet("https://my.qidian.com/ajax/userActivity/missionList?_csrfToken="+_csrfToken+"&pageIndex=1&pageSize=20",executeTask );
    ajaxGet("https://my.qidian.com/ajax/userActivity/mission?_csrfToken="+_csrfToken,receivingActivity);
    ajaxGet("https://my.qidian.com/ajax/bookReview/myTopics?_csrfToken="+_csrfToken+"&pageIndex=1&pageSize=20&_="+date.getTime(),myTopics);
    ajaxGet("https://my.qidian.com/ajax/bookReview/myTopics?_csrfToken="+_csrfToken+"&pageIndex=1&pageSize=20&_="+date.getTime(),addEditAndDel);

    function myTopics(result){
        var listInfo = result.data.listInfo;
        if(listInfo.length === 0 || listInfo[0].lastReplyTime.indexOf('今天') == -1){
            //发帖
            ajaxPost("https://forum.qidian.com/ajax/my/BookForum/publishTopic",{"_csrfToken":_csrfToken,"forumId":forumId,"topicId":"","content":"每日一贴，希望书越写越好"});
        }
    }
    function GMGet(url,data){
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            data:data,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            onload: response => {
            }
        });
    }
    function ajaxGet(url,functionName){
        $.ajax({
            url:url,
            type: "GET",
            xhrFields: {
                withCredentials: true
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            success: function (result, status) {
                if(functionName !== undefined){
                    functionName(result);
                }
            }
        });
    }
    function ajaxPost(url,data){
        $.ajax({
            url: url,
            type: "POST",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            headers: {
                //"Content-Type": "application/json;charset=UTF-8",
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                //"Accept":"application/json, text/javascript, */*; q=0.01",
                //"Access-Control-Allow-Origin": "*"
            },
            dataType:"text",//返回参数的类型 text/html
            data: data,
            success: function (result, status) {
                console.log(result);
            }
        });
    }
    function executeTask(result){
        var data = result.data.listInfo;
        if(data[0].status === 0){
            //登录奖励
            document.body.innerHTML += '<iframe name="xxx" id="a_iframe"  src="https://my.qidian.com/" marginwidth="0" marginheight="0" scrolling="no"  frameborder="0" WIDTH="100%" height="100%"></iframe>';
        }

        if(data[1].status === 0){
            $.ajax({
                url:"https://my.qidian.com/ajax/follow/myFollow?_csrfToken="+_csrfToken+"&pageIndex=1&pageSize=20",
                type: "GET",
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                success: function (result, status) {
                    var firend = result.data.listInfo;
                    for(var j = 0; j < 5;j++){
                        var friendUrl = "https:" + firend[j].linkUrl+"?targetTab=0";
                        var name = "iframe"+j;
                        document.body.innerHTML += '<iframe name="'+name+'" id="a_iframe"  src="'+friendUrl+'" marginwidth="0" marginheight="0" scrolling="no"  frameborder="0" WIDTH="100%" height="100%"></iframe>';
                    }
                }
            });
        }
        if(data[3].status === 0){
            //获取推荐票数量
            var recomCnt = $('div.qdp-border.exp-level-bg > div:nth-child(4) > div:nth-child(2) > span').eq(0).text().replace(/[^\d]/g,"");
            //投推荐票
            ajaxPost("https://vipreader.qidian.com/ajax/book/VoteRecomTicket",{"_csrfToken":_csrfToken,"bookId":bookIDs[0],"cnt":recomCnt,"enableCnt":recomCnt});
            //投推荐票
            ajaxPost("https://vipreader.qidian.com/ajax/book/VoteRecomTicket",{"_csrfToken":_csrfToken,"bookId":bookIDs[1],"cnt":recomCnt,"enableCnt":recomCnt});
        }
    }
    //添加编辑和删除按钮
    function addEditAndDel(result){
        if(url.indexOf('comment')>-1){
            var interval = setInterval(function(){
                var trs = $('#tableTarget1 > div.table-size.ui-loading-animation > table > tbody > tr');
                if(trs.length>0){
                    clearInterval(interval);
                    $('.table-size').css('height','');
                    var data = result.data.listInfo;
                    for(var i=0;i<data.length;i++){
                        var forumId = data[i].forumId;
                        var topicId = data[i].id;
                        var edit = $('<li><a target="_blank" href="//forum.qidian.com/send/'+forumId+'?topicId='+topicId+'">编辑</a></li>');
                        var del = $('<li><a href="javascript:;" data-forumId="'+forumId+'" data-topicId="'+topicId+'" class="del">删除</a></li>');
                        var ul = $('<ul style="font-weight: 600;"></ul>');
                        ul.append(edit);
                        ul.append(del);
                        var div = $('<div class="tools fr mr20"></div>');
                        div.append(ul);
                        var td = $('<td></td>');
                        td.append(div);
                        trs.eq(i).append(td);
                    }
                    $('.del').bind('click', function (e) {deleteComment(this);});
                }
            },100);
        }
    }

    //删除评论
    function deleteComment(e){
        var forumId = $(e).attr('data-forumId');
        var topicList = $(e).attr('data-topicId');
        ajaxPost("https://forum.qidian.com/ajax/my/BookForumManage/updateTopicStatus",{"_csrfToken":_csrfToken,"forumId":forumId,"action":"delete","confirm":"1","topicList":topicList});
        console.log($(e).parents('tr').hide(300));
    }
    //自动领取活跃度
    function receivingActivity(result){
        var data =result.data.bagList;
        for(var i = 0;i<data.length;i++){
            if(data[i].status===1){
                ajaxPost("https://my.qidian.com/ajax/userActivity/take",{"_csrfToken":_csrfToken,"bagId":data[i].bagId});
            }
        }
    }
})();