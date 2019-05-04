// ==UserScript==
// @name         czhen-Acfun用户信息扩展
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Acfun用户信息扩展，查看性别，注册日期，uid，最后登录时间，新标签页打开头像。
// @author       czhen
// @supportURL   784354310@qq.com
// @match        *://www.acfun.cn/v/*
// @match        *://www.acfun.cn/a/*
// @match        *://www.acfun.cn/member/*
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle('#area-window #win-info .gender{color:#fa7d3c;font-weight:700;font-size:18px;}#area-window #win-info .gender.female{color:#f00;}#area-window #win-info .gender.male{color:#1d72f0;}#area-window #win-info .mainer .l{width:90px;}#area-window #win-info .mainer{width:430px;}#area-window #win-info .mainer .r{width:330px;height:110px;}#area-window #win-info .thumb{margin:8px 0 3px 8px;}');

    $(function(){
        //标记区分DOM结构改变，限制只在原始更改时触发事件，本脚本插入或更改节点不触发事件。
        var flag=true;

        //在用户信息弹框的DOM结构中发生任何变化时触发
        $(document).on('DOMSubtreeModified','#area-window #win-info .mainer',function(){
            if(flag){
                var $self=$(this),
                    $left=$(this).find('.l');
                //用户信息弹框会先显示默认“少女请求中”,此时DOM结构虽然更改，但是无需触发事件。
                if($left.length==1){
                    //进入事件后，把flag更改为false。
                    flag=false;

                    //添加查看头像
                    var imgSrc=$left.find('img').attr('src');
                    $left.append('<a target="_blank" href="'+imgSrc+'" style="margin-left:8px;">查看头像</a>');

                    //添加用户注册登录信息
                    var $rightInfo=$('.r a',$self),
                        titleInfoArr=$rightInfo.attr("title").split(' ');
                    //因为用户登录信息过长，导致下行的来自区域显示不全，故而删除掉用户登录信息中的详细的时、分时间，只保留粗略的哪一天登录注册。
                    var registerData=titleInfoArr[1],
                        registerData_simple=registerData.substring(0,registerData.length-5),
                        uid=titleInfoArr[3],
                        uid_simple=uid.substring(0,uid.length-5),
                        lastLoginData=titleInfoArr[4],
                        lastLoginData_simple=lastLoginData.length>5? lastLoginData.substring(0,lastLoginData.length-5):lastLoginData;
                    $rightInfo.after('<p>注册:'+registerData_simple+uid_simple+'最后登录:'+lastLoginData_simple+'</p>');

                    //用户性别
                    var $gender=$rightInfo.find('.gender'),
                        genderText=$gender.text();
                    if(genderText.indexOf('♀')!=-1){
                        $gender.addClass('female').text('妹子');
                    }else if(genderText.indexOf('♂')!=-1){
                        $gender.addClass('male').text('汉子');
                    }
                    //脚本更改完DOM结构后重置。
                    flag=true;
                };
            }
        });
    });
})();