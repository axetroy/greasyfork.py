// ==UserScript==
// @name         淘宝天猫整点抢购
// @namespace    http://tampermonkey.net/
// @version      4.9.3
// @description  各凭本事吧
// @author       Wuxie
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
//@match       https://detail.tmall.com/item.htm?*
//@match       https://item.taobao.com/item.htm?*
// @match      https://buy.tmall.com/order/*
// @match      https://buy.taobao.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //商品页面显示，提交订单时不显示
    $(function () {
        var timer;
        var url=window.location.href;
        var cart= document.getElementById('J_LinkBuy') || document.getElementsByClassName('J_LinkBuy')[0];
        var cartParentClass;
        if(cart){ //立即购买按钮存在的情况下，查询其父元素
            cartParentClass= cart.parentNode.className;
        } else{
            cartParentClass ='meiyou';
        }
        if(url.indexOf('buy') === -1 && url.indexOf('reload') === -1){
            var info=prompt('兄dei，几点开始啊？');
        }
        if(url.indexOf('reload') === -1 && url.indexOf('buy') === -1) { //没有reload标志，第一次进入页面。 并且不是提交订单页面
            //页面第一次加载时就选择规格，避免刷新后执行。
            var ul=$('.J_TSaleProp');
            //有商品选项时，默认选择第一个
            if(ul.length !==0){
                for(var i= 0;i < ul.length; i++){ // 遍历选项组
                    console.log(i+'开始');
                    var aTag=$('.J_TSaleProp')[i].getElementsByTagName('a'); //每个ul下面的a， 相当于li
                    var li=$('.J_TSaleProp')[i].getElementsByTagName('li');
                    for(var j=0; j < aTag.length; j++) {//遍历选项组中的选项
                        if(li[j].className !== 'tb-selected' && li[j].className.indexOf('tb-selected') === -1){ //默认没有选中(idnexOf=-1)    并且没有隐藏
                            if( li[j].style.display !== 'none'){
                                aTag[j].click();  //点击以后直接break ,避免继续遍历、点击。
                                console.log('就选这个了');
                                break;
                            }
                        }else {
                            console.log('已经默认选择');
                        }
                    }
                }
                console.log('已选择商品');
            }
            url=window.location.href;
            var getTime=function() {
                clearTimeout(timer);
                var date=new Date();
                var hour=date.getHours();
                var minute=date.getMinutes();
                var second=date.getSeconds();
                console.log(hour + '时' + minute + '分' + second + '秒');
                timer=setTimeout(getTime,100); //循环获取时间并进行判断
                if(hour == info){ //如果当前时间等于设定时间
                    window.location.href= url + '&reload=1';
                }
            };
            getTime();
        }else if(url.indexOf('reload') !== -1 && cartParentClass.indexOf('tb-hidden') !== -1){ //网页已刷新，但是因为时间误差，没有购买按钮，再次进行刷新
            window.location.href=url;
        }else if (url.indexOf('reload') !== -1 && cartParentClass.indexOf('tb-hidden') === -1) { //刷新后页面,出现按钮
            //点击加入购物车
            cart.click();
            console.log('已加入购物车');
        } else {
            //提交订单
            var submit=$('.go-btn');
            if(submit.length !== 0){
                submit[0].click();
            }
        }
    });
})();
