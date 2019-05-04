// ==UserScript==
// @name         Export HJ Words
// @namespace    http://blog.nocode.site/
// @version      0.5
// @description  从沪江生词本导出单词
// @author       Ecat
// @match        http*://www.hjdict.com/scb
// @match        http*://dict.hjenglish.com/scb
// @connect      www.hjdict.com
// @grant        GM_log
// ==/UserScript==

(function() {
    'use strict';
    // 获取log函数
    let log;
    if (typeof GM_log == "function"){
        log = GM_log;
    }else{
        log = console.log;
    }
    // 获取xmlHttp对象
    let xmlHttp = null;
    if (window.XMLHttpRequest)
    {// code for IE7, Firefox, Opera, etc.
        xmlHttp = new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {// code for IE6, IE5
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    // 导出回调函数
    let export_fn = function(){
        // 获取单词列表
        let words = document.querySelectorAll(".wordlist td a");
        if (words.length == 0){
            alert("没有需要导出的单词哟");
            return;
        }
        // 开始导出处理
        this.setAttribute("disabled","disabled");
        this.innerText="导出中";
        words=Array.prototype.map.call(words,(w)=>{
            xmlHttp.open("GET",w.href,false);
            xmlHttp.send(null);
            let res = xmlHttp.responseText.replace(/\n/g,"");
            // 抽出单词
            let wordinfo = res.match(/class=\"word-info\".*?<h2>(.*?)</)[1];
            this.innerText = wordinfo;
            // 抽出音标 替换掉多余空格
            wordinfo += "\t" + res.match(/class=\"pronounces\">(.*?)<\Sdiv/)[1].replace(/<.*?>/g,"").replace(/^\s+/,"").replace(/\s+/g," ");
            // 抽出简单释义 保留html标签
            wordinfo += "\t" + res.match(/class=\"simple\">(.*?)<\Sdiv>/)[1];
            return wordinfo;
        });
        // 创建下载链接
        let words_b = new Blob([words.join("\n")],{type:"text/plain",endings:"native"});
        let dw_url = URL.createObjectURL(words_b);
        let a = document.createElement("a");
        a.href = dw_url;
        a.download = "out.txt";
        a.innerText = "下载";
        a.style.display="none";
        this.parentElement.appendChild(a);
        a.click();
        // 复原按钮状态
        this.removeAttribute("disabled");
        this.innerText="导出";
        log(dw_url);
    }
    // 添加导出按钮
    let rank_fix = document.querySelector(".rank");
    let export_btn = document.createElement("button");
    export_btn.setAttribute("class","button");
    export_btn.style.right="125px";
    export_btn.innerText = "导出";
    export_btn.addEventListener("click",export_fn);
    rank_fix.parentElement.appendChild(export_btn);
    log(rank_fix);

})();