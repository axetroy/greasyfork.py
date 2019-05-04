// ==UserScript==
// @name         掌阅自动签到脚本
// @namespace    http://ah2.zhangyue.com
// @version      0.1
// @description  只需要将下边的idName更改成你自己掌阅的id，每次浏览器在启动的时候都会自动帮助签到,注意每次开启浏览器脚本都会运行一次
// @author       Michael Zhao
// @include         *
// @grant       GM_getValue
// @grant       GM_setValue
// @require         https://code.jquery.com/jquery-1.11.2.min.js
// ==/UserScript==

(function() {
    'use strict';
    //更改自己用户名的地方
    //例子：
    //  var diName="i469821021"
    var idName="i46821021";
    var alreadyRun = GM_getValue ("alreadyRun",  new Date().getDate()-1);
    if(alreadyRun!=new Date().getDate()){
        var url='http://ah2.zhangyue.com/zyam/app/app.php?ca=Sign.Index&pca=sign.index&usr=+'+idName+'&rgt=7';
        $('body').append($('<iframe>', {src:url, id:'zhangyue_sign', css:{display:'inline'}}));
        //判断当前url是否在签到的位置
        if(location.href==url){
            //通过setTimeout执行一次并且完成签到功能
            setTimeout(function(){
                var sign=$('#doSign')[0];
                //触发签到按钮click事件判断
                sign.click();
                var text=sign.innerText;
                if(text[0]!="今"){
                    var p;
                    if((p=$('.content')[0])!==null&&p!==undefined){
                        p.click();
                        alert('账号为'+idName+'的用户签到成功！');
                        //对签到进行标记
                        GM_setValue ("alreadyRun",  new Date().getDate());
                    }else{
                        alert('账号为'+idName+'出现未知错误,无法完成签到操作！！');
                    }
                }else{
                    alert('账号为'+idName+'的用户已经签到过了！！'+'\n'+sign.innerText);
                     GM_setValue ("alreadyRun",  new Date().getDate());
                }
            },0);
        }
    }
})();