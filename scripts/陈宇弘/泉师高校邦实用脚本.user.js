// ==UserScript==
// @name         泉师高校邦实用脚本
// @namespace    i-meto.com
// @version      0.1.3
// @description  关闭视频独占限制，自动勾选测验题答案，感谢原作者，这是修改版的脚本。
// @author      ChenYuhs
// @match       *://qztc.class.gaoxiaobang.com/class/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
'use strict';

(function(){
    var lock=false;
    function moocHacker(){
        // 解放视频
        var vid=document.getElementById("vjs_video_3_html5_api");
        if(vid!=undefined)vid.play();
        // 自动填写答案
        var chk=document.getElementById("quizSubmit");
        if(chk!=undefined&&!lock){
            questionList.forEach(function(item,index){
                item.answerList.forEach(function(item,index){
                    if(item.correct=="1"){
                        var answerId=item.answerId;
                        Array.prototype.forEach.call(document.getElementsByTagName('i'),function(item,index){
                            if(item.getAttribute('answer_id')==answerId)item.click();
                        });
                    }
                });
            });
            alert("答案填写完毕");
            lock=true;
        }
    }
    window.setInterval(moocHacker,1000);
})();