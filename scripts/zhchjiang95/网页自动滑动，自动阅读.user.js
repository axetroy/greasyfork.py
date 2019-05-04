// ==UserScript==
// @name         网页自动滑动，自动阅读
// @namespace    https://github.com/zhchjiang95
// @version      1.1.2
// @description  自定义速度，速度范围-10~10（默认速度为1），空格键随时开始/暂停，上下键实时调节速度，反方向运动。
// @author       zhchjiang95 <zhchjiang99@outlook.com>
// @include      http://*
// @include	     https://*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @match        http://*
// @match        https://*
// @grant        none
// ==/UserScript==

if(location.href.indexOf('https://www.baidu.com/s') == 0 || location.href.indexOf('http://www.baidu.com/s') == 0){
    var jq = jQuery.noConflict();
    Compatible(jq);
}else{
    Compatible(jQuery);
}

function Compatible(jq){
    var box = jq('<div class="move-box"><input type="number" class="move-val" value="1" title="速度"/><p class="start" title="开始/暂停">▶</p><p class="reverse" title="反方向">▼</p></div>');
    jq('body').append(box);
    (function(){
        jq('.move-box').css({
            'width': '40px',
            'height': '90px',
            'background': '#fff',
            'box-shadow': '0 0 4px 0 #ccc',
            'border-radius': '8px',
            'overflow': 'hidden',
            'position': 'fixed',
            'top': '80px',
            'left': '4px',
            'z-index': 99999999
        });
        jq('.move-val').css({
            'width': '100%',
            'height': '30px',
            'padding': 0,
            'color': '#000',
            'border': 'none',
            'outline': 'none',
            'font-size': '18px',
            'text-align': 'center'
        })
        jq('.start').css({
            'margin': 0,
            'width': '100%',
            'height': '30px',
            'line-height': '30px',
            'text-align': 'center',
            'background': 'red',
            'color': '#fff',
            'font-size': '20px',
            'cursor': 'pointer'
        })
        jq('.reverse').css({
            'margin': 0,
            'width': '100%',
            'height': '30px',
            'line-height': '30px',
            'text-align': 'center',
            'color': '#ccc',
            'cursor': 'pointer'
        })
    }())
    var elinput = document.getElementsByClassName('move-val')[0],
        elstart = document.getElementsByClassName('start')[0],
        elreverse = document.getElementsByClassName('reverse')[0],
        speed = 1,
        timer = null,
        isMove = false,
        isHide = true;
    elinput.oninput = setIn;
    function setIn(){
        if(this.value > 10){
            this.value = 10;
        }
        if(this.value < -10){
            this.value = -10;
        }
        if(this.value == ''){
            this.value = 0;
        }
        speed = Number(this.value);
        speed < 0 ? elreverse.innerText = '▲' : elreverse.innerText = '▼';
    }
    elstart.onclick = function(){
        if(isMove){
            this.innerText = '▶';
            clearInterval(timer);
            isMove = false;
            isHide = true;
        }else{
            this.innerText = '◉';
            timer = setInterval(move,20);
            isMove = true;
            isHide = false;
        }
        hideShow();
    }
    elreverse.onclick = function(){
        speed = -speed;
        speed < 0 ? this.innerText = '▲' : this.innerText = '▼';
    }
    function move(){
        window.scrollBy(0,speed);
        if(jq(window).height()+jq(window).scrollTop()>=jq(document).height()-2 || jq(window).scrollTop() == 0){
            elstart.innerText = '▶';
            clearInterval(timer);
            isMove = false;
            isHide = true;
            hideShow();
        }
    }
    jq(document).keydown((e) => {
        var event = e || window.event;
        if(event.keyCode == 32){
            elstart.click();
            return false;
        }
        if(event.keyCode == 38){
            elinput.value++;
        }
        if(event.keyCode == 40){
            elinput.value--;
        }
        setIn.call(elinput);
    })
    // 隐藏
    hideShow()
    function hideShow(){
        //  if(!isHide) return;
        var timer2 = null;
        function hide(){
            jq('.move-box').stop().animate({
                'left': '-30px'
            },400)
        }
        timer2 = setTimeout(hide,6000);
        jq('.move-box').hover(function(){
            //  if(!isHide) return;
            clearInterval(timer2);
            jq(this).stop().animate({
                'left': '4px'
            },600)
        },function(){
            //  if(!isHide) return;
            timer2 = setTimeout(hide,6000);
        })
    }
}