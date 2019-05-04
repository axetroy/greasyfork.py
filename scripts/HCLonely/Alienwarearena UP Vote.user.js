// ==UserScript==
// @name         Alienwarearena UP Vote
// @namespace    http://tampermonkey.net/
// @version      0.7.0
// @description  外星人网站自动UP vote
// @author       HCLonely
// @include      /https?:\/\/.*?alienwarearena.com\/forums\//
// @grant        document-end
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_openInTab
// @grant        GM_log
// @require      https://greasyfork.org/scripts/379868-jquery-not/code/jQuery%20not%20$.js?version=681281
// ==/UserScript==

(function() {
    'use strict';
    if(/https?:\/\/de.alienwarearena.com\/forums\//.test(location.href)){
        location.href="https://www.alienwarearena.com/forums/";
    }
    try{
        $jq(".text-uppercase").removeClass("text-uppercase");
        var time=1500;//默认投票延时
        $jq("ul.breadcrumb").append(`<li class="current first last" id="vote" style="z-index:99999">
<a href="javascript:void(0)" style="color:#00a0f0;font-weight:900;"><i class="fa fa-home"></i> Vote Up</a>
</li><ul style="color:rgb(0, 126, 189);margin-top:10px">投票间隔：
<select id="timelist" name="timelist" form="timeform" style="color:rgb(0, 126, 189)">
<option value="0.5">0.5</option>
<option value="1.0">1.0</option>
<option value="1.5" selected="selected">1.5</option>
<option value="2.0">2.0</option>
<option value="2.5">2.5</option>
<option value="3.0">3.0</option>
<option value="4.0">4.0</option>
<option value="5.0">5.0</option>
</select>  秒</ul>`);
        var pro;
        var tr=$jq("div.toast-body").find("tr");
        if(tr.length==0){
            if(confirm("请先登录！")){
                window.location="/login";
            }
            return;
        }
        for(var t=0;t<tr.length;t++){
            //console.log($jq(tr[t]).children());
            if(/Vote on Content/i.test($jq(tr[t]).children().eq(0).text())){
                pro=$jq(tr[t]).children().eq(1).text();
                break;
            }
        }
        pro=pro.replace(/ [\w]*? /i," / ");
        $jq("ul.breadcrumb").after(`<ul id="result" class="breadcrumb">投票进度：${pro}</ul><ul id="message" class="breadcrumb"></ul>`);
        var i,ok=0,errlen;
        var num=(Math.floor(new Date().getTime()/(24*3600*1000))-17897)*20+1007001;
        ok=pro.split(" ")[0];
        var errid=[];
        function voteup(){
            $jq.ajax({
                type: "post",
                url: "/ucf/vote/up/"+i,
                datatype: "json",
                crossDomain:true,
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    console.log(data);
                    if(data){
                        if(data.success == true){
                            var progressAll=$jq("#result").html();
                            progressAll=progressAll.replace(/投票进度：/i,"");
                            var progressSplit=progressAll.split(" ");
                            var progress=Number(progressSplit[0]);
                            progress++;
                            progressAll=`${progress} / ${progressSplit[2]}`;
                            $jq("#result").html("投票进度："+progressAll);
                        }else{
                            $jq("#message").prepend(`<div class="forum-last-post"><a href="https://eu.alienwarearena.com/ucf/show/${i}" target="_blank">${i}</a>:${data.message}`);
                        }
                    }
                    setTimeout(function(){
                        pd();
                    },time);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $jq("#message").prepend(`<div class="forum-last-post">投票失败${textStatus}:${jqXHR.status}-${errorThrown}`);
                    errid.push(i);
                    setTimeout(function(){
                        pd();
                    },time);
                }
            });
        }
        function pd(){
            errlen=errid.length;
            if(i<num+19){
                i++;
                voteup();
            }else if(errlen==0){
                $jq("#timeout").after(`<ul class="breadcrumb">投票完成，刷新查看结果！</ul>`);
            }else{
                $jq("#timeout").after(`<ul id="fail" class="breadcrumb">投票完成！${errlen}个帖子投票失败，请手动投票：</ul>`);
                $jq("#fail").after(`<ul id="errid" class="breadcrumb"></ul>`);
                for(var j=0;j<errlen;j++){
                    $jq("#errid").append(`<ul><a href="https://eu.alienwarearena.com/ucf/show/${errid[j]}" target="_blank">${errid[j]}</a></ul>`);
                }
            }
        }
        $jq("#vote").click(function(){
            time=Number(document.getElementById("timelist").value)*1000;
            var voteTime=$jq("#result").html().split(" ");
            voteTime=voteTime[0].match(/[\d]+/gim,"")[0];
            if(Number(voteTime)>=20){
                alert("今天已经投票完成了！");
            }else{
                i=num+Number(ok);
                voteup();
                $jq("#result").after(`<ul id="timeout" class="breadcrumb" style="text-transform:lowercase">即将开始投票，每次投票间隔${time/1000}s.</ul>`);
            }
        });
    }catch(e){
        alert(`
Alienwarearena UP Vote
脚本执行出错：
${e.stack}
`);
        document.getElementsByClassName("col-lg-4 col-lg-pull-8")[0].innerHTML+=`
<p>错误信息：</p>
<textarea id="err" style="width:360px;height:200px" readonly="readonly" onClick="document.getElementById('err').focus();document.getElementById('err').select();document.execCommand('copy');alert('复制成功！');">${String(err)}</textarea>
<p style="color:red">↑点击文本框即可复制↑</p>`;
    }
})();