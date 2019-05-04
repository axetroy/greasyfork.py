// ==UserScript==
// @name         Oyunkeyi助手
// @namespace    http://tampermonkey.net/
// @version      0.1.9
// @description  Oyunkeyi giveaway便捷加入，一键加入
// @author       HCLonely
// @include      *://www.oyunkeyi.com/*
// @run-at       document-end
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @require      https://greasyfork.org/scripts/379868-jquery-not/code/jQuery%20not%20$.js?version=678461
// @require      https://greasyfork.org/scripts/376437-hclonely-function/code/HCLonely_function.js?version=678463
// ==/UserScript==

'use strict';

oyunkeyi($jq);
GM_addStyle(`cloudflare-app{visibility: hidden !important}`);

function oyunkeyi($){
    addBtn();
    HCL.ele({ele:"button",class:"btn autoJoin",style:"position:fixed;top:70px;right:10px",text:"一键加入","title":"一键加入当前页面所有赠key",onclick:function(){autoJoin(0,$(".join"))},parent:$("body")[0]});
    HCL.ele({ele:"button",class:"btn autoEnter",style:"position:fixed;top:110px;right:10px",text:"一键抽奖",onclick:function(){autoEnter(0,$(".join"))},parent:$("body")[0]});

    $(".col-md-12>.row>.col-md-9").prepend(`<ul class="pagination HCLonely" role="navigation">`+$("ul.pagination").html()+"</ul>");

    $(".pagination").not(".HCLonely").before(`<a class="pagination page-item page-link next-page" style="background:#b9ddb9;text-align: center;" role="navigation" href="javascript:void(0)">
<span id="next-span">下一页</span><span id="load-span" style="display:none">加载中<img style="width: 25px;height: auto;" src='data:image/gif;base64,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' />
<span>
</a>`);
    $(".next-page").data("page",parseInt(getUrlQuery().page)||1);
    $(".next-page").click(function(){
        this.style.background="white";
        $("#next-span").hide();
        $("#load-span").show();
        pageLoad($(".next-page").data("page")+1);
    });


    function addBtn(){
        $(".col-md-9").children(".card").map(function(i,e){
            if($(e).children("button").length==0){
                if(empty(e.style.background)){
                    HCL.ele({ele:"button",class:"join btn",style:"position:absolute;right:0;width:15%;height:100%;",parent:e,text:"加入",onclick:function(){
                        this.className="joining btn";
                        join(e);
                    }});
                }else{
                    HCL.ele({ele:"button",class:"remove btn",style:"position:absolute;right:0;width:15%;height:100%;",parent:e,text:"移除",onclick:function(){
                        this.className="removing btn";
                        remove(e)
                    }});
                }
                var time=$(e).find(".fas.fa-clock").parent().text().split('\n')[0];
                if(/hour/ig.test(time)){
                    $(e).find(".fas.fa-clock").parent()[0].innerHTML=$(e).find(".fas.fa-clock").parent()[0].innerHTML.replace(/hour[\w\W]*?\|/gm,"hour remaining |");
                }else if(/minute/ig.test(time)){
                    $(e).find(".fas.fa-clock").parent()[0].innerHTML=$(e).find(".fas.fa-clock").parent()[0].innerHTML.replace(/minute[\w\W]*?\|/gm,"minute remaining |");
                }
            }
        });
    }

    function pageLoad(page){
        httpSend({
            type:"get",
            url:location.href.replace(/\?.*/gim,"")+"?page="+page,
            callback:function(data){
                if(data.status==200){
                    var html="";
                    if(/urunler/gim.test(location.href)){
                        html=data.text.match(/\<tbody\>[\w\W]*?\<\/tbody\>/gim)[0];
                        if(!empty(html)){
                            html=html.replace(/\<\/?tbody\>/gim,"");
                            $("tbody").append(html);
                            $(".next-page").data("page",$(".next-page").data("page")+1);
                        }else{
                            swal({"timer":3000,"title":"加载失败","text":"","showConfirmButton":false,"type":"error"});
                        }
                    }else{
                        html=data.text.match(/\<div class\=\"col-md-9\" style\=\"border\-left\:1px solid \#d3d3d3\"\>[\w\W]*?\<\/br\>/gim)[0];
                        if(!empty(html)){
                            html=html.replace(/\<div class\=\"col-md-9\" style\=\"border\-left\:1px solid \#d3d3d3\"\>/gim,"");
                            $(".next-page").before(html);
                            addBtn();
                            $(".next-page").data("page",$(".next-page").data("page")+1);
                        }else{
                            swal({"timer":3000,"title":"加载失败","text":"","showConfirmButton":false,"type":"error"});
                        }
                    }
                }else{
                    swal({"timer":3000,"title":"加载失败:"+data.status,"text":"","showConfirmButton":false,"type":"error"});
                }
                $(".next-page")[0].style.background="#b9ddb9";
                $("#next-span").show();
                $("#load-span").hide();
            }
        });
    }

    function join(e,auto=0){
        httpSend({
            type:"get",
            url:$(e).find("a")[0].href.replace("cekilis","katil"),
            callback:function(data){
                if(data.status==200){
                    if(/You are in/gim.test(data.text)){
                        !auto&&(swal({"timer":1000,"title":"加入成功","text":"","showConfirmButton":false,"type":"success"}));
                        HCL.ele({ele:$(e).find("button")[0],class:"remove btn",text:"移除",onclick:function(){remove(e)}});
                        e.style.background="#cdcccc";
                        $("#dropdown01").find("span").text(data.text.match(/\(Point:.*?[\d]+?\)/gim)[0]);
                    }else{
                        error(data,e,auto);
                    }
                }else{
                    !auto&&(swal({"timer":3000,"title":"加入失败:"+data.status,"text":"","showConfirmButton":false,"type":"error"}));
                    HCL.ele({ele:$(e).find("button")[0],text:"出错"+data.status,class:"err btn"});
                }
            }
        });
    }

    function remove(e){
        httpSend({
            type:"get",
            url:$(e).find("a")[0].href.replace("cekilis","cik"),
            callback:function(data){
                if(data.status==200){
                    if(/You are out/gim.test(data.text)){
                        swal({"timer":1000,"title":"移除成功","text":"","showConfirmButton":false,"type":"success"});
                        HCL.ele({ele:$(e).find("button")[0],class:"join btn",text:"加入",onclick:function(){join(e)}});
                        e.style.background="";
                        $("#dropdown01").find("span").text(data.text.match(/\(Point:.*?[\d]+?\)/gim)[0]);
                    }else{
                        error(data,e);
                    }
                }else{
                    swal({"timer":3000,"title":"移除失败:"+data.status,"text":"","showConfirmButton":false,"type":"error"});
                    HCL.ele({ele:$(e).find("button")[0],text:"出错"+data.status,class:"err btn"});
                }
            }
        });
    }

    function error(data,e,auto=0){
        var err;
        err=data.text.match(/swal\(\{[\w\W]*?\}\)/gim);
        if(err.length>0){
            err=err[0].match(/\"title\"\:\".*?\"\,/gim);
            if(err.length>0){
                err=":"+err[0].replace(/\"title\"\:\"|\"\,/gim,"");
            }else{
                err="";
            }
        }else{
            err="";
        }
        !auto&&(swal({"timer":3000,"title":"出错"+err,"text":"","showConfirmButton":false,"type":"error"}));
        HCL.ele({ele:$(e).find("button")[0],text:"出错"+err,class:"err btn"});
        e.style.background="red";
    }

    function autoJoin(i,joinBtn){
        if(i<joinBtn.length){
            if(parseInt($("#dropdown01").find("span").text().match(/[\d]+/gim)[0])>=parseInt($(joinBtn[i]).parent().find(".col-md-9").find("a")[0].innerText.match(/\([\d]+.*?\)/gim)[0].match(/[\d]+/gim)[0])){
                join($(joinBtn[i]).parent()[0],1);
                i++;
                setTimeout(function(){autoJoin(i,joinBtn);},2000);
            }else{
                joinBtn[i].innerText="P点不够，自动跳过";
                i++;
                autoEnter(i,joinBtn);
            }
        }else{
            swal({"timer":3000,"title":"当前页面未拥有游戏赠key已全部加入！","text":"","showConfirmButton":false,"type":"success"})
        }
    }

    function autoEnter(j,joinBtn){
        if(j<joinBtn.length){
            if(/✘/gim.test($(joinBtn[j]).parent().find("span")[0].innerText)){
                if(parseInt($("#dropdown01").find("span").text().match(/[\d]+/gim)[0])>=parseInt($(joinBtn[j]).parent().find(".col-md-9").find("a")[0].innerText.match(/\([\d]+.*?\)/gim)[0].match(/[\d]+/gim)[0])){
                    join($(joinBtn[j]).parent()[0],1);
                    j++;
                    setTimeout(function(){autoEnter(j,joinBtn);},2000);
                }else{
                    joinBtn[j].innerText="P点不够，自动跳过";
                    j++;
                    autoEnter(j,joinBtn);
                }
            }else{
                j++;
                autoEnter(j,joinBtn);
            }
        }else{
            swal({"timer":3000,"title":"当前页面未拥有游戏赠key已全部加入！","text":"","showConfirmButton":false,"type":"success"})
        }
    }

    if(/Wait [\d]min/gim.test($(".nav-item")[0].innerText)){
        HCL.showTest();
        var newG=setInterval(function(){webRe(newG)},60*1000);
    }

    function webRe(n){
        httpSend({
            url:location.href,
            type:"get",
            callback:function(data){
                if(/New GiveAway/gim.test(data.text)){
                    clearInterval(n);
                    $(".nav-item").eq(0).html(`<a href="http://www.oyunkeyi.com/cekilisyap" class="nav-link" style="float:left"><span style="color:#d3d3d3;">New GiveAway</span></a>`);
                    HCL.show({
                        title:"Oyunkeyi助手通知",
                        msg:"Oyunkeyi赠key冷却结束!",
                        time:0,
                        onclick:function(){
                            location.reload(true);
                        }
                    });
                }
            }
        });
    }

    HCL.css.gm(`.card-body{margin: 0 15% 0 0;}.autoEnter,.autoJoin,.join,.joining{background:#30db30;color:black} .remove,.removing{background:#f02929;color:black} .err{background:#3a3a3a;color:black} cloudflare-app{display:none}`);
}