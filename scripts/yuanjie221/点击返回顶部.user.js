// ==UserScript==
// @name        点击返回顶部
// @namespace    http://tampermonkey.net/
// @version      0.42
// @description  click the arrow-up pic to jump to the top of page.
// @author       kilin
// @include      *
// @match        *
// @grant        none
// @name:zh-CN       点击返回顶部
// @description:zh-CN  点击向上的箭头按钮返回到页面顶部
// ==/UserScript==

(function(){window.onload = function(){
    console.log('DOM already loaded.');
    if(window.top == window.self){ 
        var aNode = document.createElement('a');
        aNode.href = 'javascript:;';
        aNode.id = 'click-to-top';
        aNode.title = 'Click it to go to the top';
        var availHeight = window.screen.availHeight; // 获取可用高度
        var css = '#click-to-top{ display:none; position: fixed; right: 0.1%; bottom: 50%; opacity: 0.5; z-index: 9999; } #click-to-top:hover{ position: fixed; right: 0.1%; bottom: 50%; opacity: 30; z-index: 9999; }';
        //滚出一屏以后才显示返回顶部按钮
        window.onscroll = function(){
            var curPos = (document.documentElement.scrollTop == 0) ? document.body.scrollTop : document.documentElement.scrollTop; //document.documentElement.scrollTop; //preparation for hack (document.documentElement.scrollTop == 0) ? document.body.scrollTop : document.documentElement.scrollTop; 
            if(curPos > availHeight){
                aNode.style.display = 'block';
            }else {
                aNode.style.display = 'none';
            }
        };
        //图片相关
        var img = document.createElement('img');
        img.src = 'http://i2.bvimg.com/621084/6d5a66cf8fae9c8b.png';
        img.style = 'width: 29px; height: 20px;';
        //样式相关
        var style = document.createElement('style');
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        document.getElementsByTagName('head')[0].appendChild(style);
        aNode.append(img);
        aNode.addEventListener('click', function(){
            document.body.scrollIntoView();
            /*var timer = setInterval(function(){
            document.documentElement.scrollTop -= 500;
                if(document.documentElement.scrollTop < 100){
                    clearInterval(timer);
                }
            }, 50);
        }, true);*/
        });
        var eBody = document.querySelector('body');
        eBody.append(aNode);
    }
};})();