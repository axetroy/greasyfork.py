// ==UserScript==
// @name         Elearning 助手
// @version      1.0.0
// @description 你可以看到你的论坛活跃度，你可以导出已获得评分的作业题目并可以直接导入刷题宝（仅支持单选和多选），你可能会遇到权限问题，请务必点击允许
// @author       elearning
// @license       MIT
// @date           2018-04-08
// @modified    2018-04-08

// @match        *://elearning.njmu.edu.cn/G2S/CourseLive/Test/viewResults?TestID=*


// @match        *://elearning.njmu.edu.cn/G2S/CourseLive/Forum/index*
// @run-at       document-idle
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @namespace undefined
// ==/UserScript==

(function() {
    'use strict';
    function ExportHomework(){
        var data,TestID,saveName,url;
        this.init=function(){
            TestID=getTestID();
            data=getPaper();
            saveName=data.d.paper.Papername.replace("的试卷","");

            toExcel();
        };
        function addButton(){
            $('.paper_tit > h4').append('<button style="margin-left:10px;" class="btn btn-primary" onclick="exportExcel();" type="button">导出题目(可直接导入刷题宝)</button>');
        }
        //get homework URL TestID
        function getTestID(){
            var regx = /TestID=([0-9]+)/;
            var page = location.search.match(regx);
            return page[1];
        }
        //get homework data
        function getPaper(){
            var result;
            $.ajax({
                url:location.protocol+"//"+location.host+"/G2S/DataProvider/CourseLive/Test/MarkingProvider.aspx/Test_Get",
                async:false,
                cache:false,
                processData:false,
                dataType:'json',
                type:"post",
                data:JSON.stringify({TestID:TestID}),
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                success:function(data){
                    result=data;
                }
            });
            $.ajax({
                url:location.protocol+"//"+location.host+"/G2S/DataProvider/CourseLive/Test/MarkingProvider.aspx/PaperInfo_Get",
                async:false,
                cache:false,
                processData:false,
                dataType:'json',
                type:"post",
                data:JSON.stringify({TestID:TestID,PaperID:parseInt(result.d.PaperID)}),
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                success:function(data){
                    result=data;
                }
            });
            return result;
        }
        //导出excel
        function toExcel(){
            var server="http://101.132.155.253";
            data.d.paper.TestID=TestID;
            GM_xmlhttpRequest({
                url:server+"/Home/Export/toExcel",
                responseType:'json',
                method:'POST',
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                data:'data='+encodeURIComponent(JSON.stringify(data)),
                onload:response=>{
                    var data=eval('('+response.responseText+')');
                    if(data && !data.error){
                        url=server+data.msg;
                        unsafeWindow.exportExcel=DownFile;
                        addButton();
                    }
                }
            });
        }
        //显示下载路径
        function DownFile(){
            if(typeof url == 'object' && url instanceof Blob)
            {
                url = URL.createObjectURL(url);
            }
            var aLink = document.createElement('a');
            aLink.href = url;
            console.log(url);
            var event;
            if(window.MouseEvent) event = new MouseEvent('click');
            else
            {
                event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            }
            aLink.dispatchEvent(event);
        }
    }

    function Forum(){
        var OCID,data,userData,rateData;
        this.init=function(){
            get();
            unsafeWindow.refresh=refresh;
        };
        function get(){
            OCID=getOCID();
            data=getData();
            userData=getUserData();
            rateData=getRate();
            showRate();
        }
        function refresh(){
            $("#refresh-rate").addClass('disabled');
            get();
            $("#refresh-rate").removeClass('disabled');
        }
        function getOCID(){
            var OCID;
            try {
                OCID = $(".exercise_nav_list .active a").attr("href").split("?")[1].split("=")[1];
            } catch (e) {
                OCID = unsafeWindow.$G2S.request("currentoc");
            }
            return OCID;
        }
        function getUserData(){
            var result;
            $.ajax({
                url:location.protocol+"//"+location.host+"/G2S/DataProvider/CourseLive/Forum/ForumProvider.aspx/User_Info",
                async:false,
                cache:false,
                processData:false,
                dataType:'json',
                type:"post",
                data:JSON.stringify({}),
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                success:function(data){
                    result=data;
                }
            });
            return result;
        }
        function getData(){
            var result;
            $.ajax({
                url:location.protocol+"//"+location.host+"/G2S/DataProvider/Analysis/AnalysisProvider.aspx/StudentLiveness_Get",
                async:false,
                cache:false,
                processData:false,
                dataType:'json',
                type:"post",
                data:JSON.stringify({OCID:OCID,TopCount:9999}),
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                success:function(data){
                    result=data;
                }
            });
            return result;
        }
        function getMyUserId(){
            return userData.d.UserID;
        }
        function getRate(){
            var myUserId=getMyUserId();
            var order,allCount,tmpCnt;
            for(var i=0;i<data.d.length;i++){
                if(i==0){
                    allCount=data.d[i].AllCount;
                    order=0;
                    tmpCnt=1;
                }
                if(data.d[i].AllCount<allCount){
                    order+=tmpCnt;
                    tmpCnt=1;
                    allCount=data.d[i].AllCount;
                }else{
                    tmpCnt++;
                }
                if(data.d[i].UserID==myUserId){
                    data.d[i].order=order;
                    return data.d[i];
                }
            }
            return false;
        }
        function showRate(){
            if(rateData){
                $("div[ng-controller='ForumCtrl'] .alert").remove();
                var rate=$('<div class="alert"></div>');
                var rateContent=rateData.UserName+"，你的活跃度是:&nbsp;资料阅读&nbsp;"+rateData.FileReadCount+"&nbsp;发帖回复&nbsp;"+rateData.ForumCount+"&nbsp;参与测试&nbsp;"+rateData.TestCount+"&nbsp;活跃度&nbsp;"+rateData.AllCount+"&nbsp;目前排名&nbsp;"+rateData.order;
                rate.html(rateContent);
                rate.append('<a class="btn btn-info btn-small" id="refresh-rate" onclick="refresh();" target="_self" style="margin-left:10px;">刷新</a>');
                $("div[ng-controller='ForumCtrl']").prepend(rate);
            }
        }
    }
    //detect the page
    function detectPage(){
       // var regx = /\/[a-zA-Z]+\/([a-zA-Z]+)\/[a-zA-Z\.]+/;
        //var page = location.pathname.match(regx);
        return location.pathname.toLowerCase();
    }
    //load
    function load(){
        switch(detectPage()){
            case '/g2s/courselive/test/viewresults':
                var exportHomework=new ExportHomework();
                exportHomework.init();
                break;
            case "/g2s/courselive/forum/index":
                var forum= new Forum();
                forum.init();
                break;
        }
    }
    load();
})();