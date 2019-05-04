// ==UserScript==
// @name         洛谷冬日绘版自动绘图
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  在洛谷冬日绘版中自动绘图
// @author       frank-xjh
// @match        https://www.luogu.org/paintBoard
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(document.getElementById("zoom-tool")).append("<button id='autodraw' class='am-btn am-btn-warning am-radius'>自动绘图</button><link href='https://cdn.jsdelivr.net/gh/frank-xjh/Luogu-AutoPaint@latest/spop.min.css'><script src='https://cdn.jsdelivr.net/gh/frank-xjh/Luogu-AutoPaint@latest/spop.min.js'></script>")
    $(document.getElementsByTagName("head")).append("<link rel='stylesheet' href='https://cdn.jsdelivr.net/gh/frank-xjh/Luogu-AutoPaint@latest/spop.min.css'>")
    var btn=$("#autodraw")[0];
    var recording=0,autodrawing=0;
    var queue=new Array();
    function autodraw(pos){
        /*if (pos>=queue.length){
            btn.innerText="绘制完成！";
            return;
        }*/
        var now=queue[pos];
        $.post("/paintBoard/paint", {
            x: now[0],
            y: now[1],
            color: now[2]
        }, function(resp) {
            if (resp.status!==200) {
                $("#autodraw").attr('disabled',true);
                $('#autodraw').click(window.location.reload());
                btn.innerText="错误";
                spop({
                        template  : '出错，自动刷新页面',
                        style     : 'error',
                        autoclose : false,// miliseconds
                        position  : 'bottom-right'
                });
            }else {
                $("#autodraw").attr('disabled',true);
                btn.innerText="绘制中";
                spop({
                    template  : "正在等待绘制第"+(pos+2)+"个点，共"+queue.length+"个点，预计还需要"+((queue.length-pos-1)*30)+"秒",
                    style     : 'default',
                    autoclose : false,// miliseconds
                    position  : 'bottom-right'
                });
                lasttime=(new Date())/1000;
                getCountDown(lasttime+timelimit);
                if (pos+1>=queue.length){
                    btn.innerText="绘制完毕";
                    spop({
                        template  : '绘制完毕，如需继续绘制请刷新页面',
                        style     : 'success',
                        autoclose : false,// miliseconds
                        position  : 'bottom-right'
                    });
                }else{
                    setTimeout(function(){autodraw(pos+1)},31000);
                }
            }
        });
    }
    btn.onclick=function(){
        if (autodrawing){
            return;
        }
        if (recording){
            initialPaint();
            autodrawing=1;
            var wait=(lasttime+timelimit)*1000-new Date()+2000;
            if (wait<0){
                wait=0;
            }
            $("#autodraw").attr('disabled',true);
            btn.innerText="等待绘制中...";
            spop({
                        template  : "正在等待绘制第一个点，将在"+wait/1000+"秒后开始自动绘图，共"+queue.length+"个点",
                        style     : 'warning',
                        autoclose : false,// miliseconds
                        position  : 'bottom-right'
                    });
            setTimeout(function(){autodraw(0)},wait);
            return;
        }
        recording=1;
        btn.innerText="结束记录";
        spop({
                        template  : '正在记录,点击结束并自动绘图"',
                        style     : 'default',
                        autoclose : false,// miliseconds
                        position  : 'bottom-right'
                    });
        $('#mycanvas').unbind("click");
        $('#mycanvas').bind("click", function () {
            var x = parseInt(event.offsetX / scale);
            var y = parseInt(event.offsetY / scale);
            var newitem=new Array(x,y,nowcolor);
            queue.push(newitem);
            console.log(queue);
            console.log("已记录当前坐标和颜色(x/y/color)",x,y,colorlist[nowcolor]);
            update(y,x,colorlist[nowcolor]);
        })
    };
})();