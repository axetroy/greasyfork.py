// ==UserScript==
// @name         法宣在线挂课辅助
// @namespace    http://www.tech200.net
// @version      1.0.2
// @description  法宣在线-纯挂课辅助,不会有风险,倒计时10分钟后播放音乐提醒提交!
// @author       Chinario
// @match        http://xf.faxuan.net/sps/courseware*
// @grant        none

// ==/UserScript==

(function() {
    var Rio_TimeOut=setInterval(sense_time,1000);
    function sense_time(){
        console.log('Okay');
       if(sps.onlineTime>600 && ($('#tam-audio-init').html()==undefined)){
       var src="<div id='tam-audio-con'><audio id='tam-audio-init' src='http://www.w3school.com.cn/i/song.ogg' autoplay loop></audio><div>";
       $("body").append(src);
       clearInterval(Rio_TimeOut);
       }
    }
}
)();