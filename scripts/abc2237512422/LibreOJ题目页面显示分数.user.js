// ==UserScript==
// @name         LibreOJ题目页面显示分数
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  在 LibreOJ 中题目页面显示分数
// @author       abc2237512422
// @match        https://loj.ac/problem/*
// @match        http://loj.ac/problem/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function getHTML(url) {
        var req = false;
        if (window.XMLHttpRequest) {
            try {
                req = new XMLHttpRequest();
            } catch (e) {
                req = false;
            }
        } else if (window.ActiveXObject) {
            try {
                req = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    req = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    req = false;
                }
            }
        }
        if (req) {
            req.open('GET', url, false);
            req.send(null);
            if (req.status == 404) {
                return "error";
            } else {
                return req.responseText;
            }
        } else {
            return "error";
        }
    }
    var allMaxScore=-1;
    function getMaxScore(json){
        var maxScore=-1;
        var obj=eval(json);
        for(var i=0;i<obj.length;i++){
            maxScore=Math.max(maxScore,obj[i].result.score);
            //console.log(obj[i].result.score);
        }
        return maxScore;
    }
    function hasNextPage(html){
        var patt=new RegExp("<a class=.disabled icon item. id=(.?)page_next(.?)>(.*?)</a>");//下一页被禁用(已到最后)
        var patt1=new RegExp("page_next");//没有下一页按钮(只有一页)
        if (patt1.exec(html)==null){
            return false;
        }
        if (patt.exec(html)==null){
            return true;
        }else{
            return false;
        }
    }
    function getStatus(problemid,user,page){
        var res=document.createElement('html');
        var ishttps='https:'==document.location.protocol?true:false;
        var tarurl="loj.ac/submissions?problem_id="+problemid+"&submitter="+user+"&page="+page;
        //"loj.ac/submissions?contest=&problem_id="+problemid+"&submitter="+user+"&page="+page;
        if (ishttps){
            tarurl="https://"+tarurl;
        }else{
            tarurl="http://"+tarurl;
        }
        var html=getHTML(tarurl);
        var patt=new RegExp("const itemList = (.*?);");
        allMaxScore=Math.max(allMaxScore,getMaxScore(patt.exec(html)[1]));
        //console.log(patt.exec(html)[1]);
        if (hasNextPage(html)){
            setTimeout(function(){getStatus(problemid,user,page+1)},1);
        }else{
            /*更改DOM*/
            var title=document.getElementsByTagName("h1")[0];
            var scoreLevel=parseInt(allMaxScore/10);
            var css="margin-right:8px;padding:2px 8px;";
            if (allMaxScore==-1){
                allMaxScore="-";
                css+="color:#1678c2;";
                scoreLevel="";
            }
            title.innerHTML="<span style='"+css+"' class='score score_"+scoreLevel+"'>"+allMaxScore+"</span>"+title.innerHTML;
            console.log("finish,page="+page+" "+allMaxScore);
        }
    }
    function getProblemId(){
        var str=location.href+"#";
        while (str.indexOf("/")!=-1){
            str=str.replace("/","#");
        }
        var patt=new RegExp("problem#(.*?)#");//下一页被禁用(已到最后)
        return patt.exec(str)[1];
    }
    function getUser(){
        var str=document.getElementsByClassName("right menu")[0].getElementsByClassName("ui simple dropdown item")[0].getElementsByTagName("a")[0].innerText;
        return str.replace(/(\s*$)/g,"");
    }
    var problemid=getProblemId();//TO-DO
    var user=getUser();
    var page=1;
    var nowHtml=getStatus(problemid,user,page);
})();