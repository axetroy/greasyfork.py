// ==UserScript==
// @name         Pjax Everywhere
// @name:zh-CN      Pjax加速网页访问
// @namespace    https://github.com/slaier/pjax-everywhere
// @version      0.1
// @author       newbie <newbie@noobshelter.xyz>
// @description  enable pjax for some sites, speed up access to the site.
// @description:zh-cn 为一些网站开启pjax, 加速访问该网站。
// @include      https://git-scm.com/book/*
// @require      https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/jquery-pjax@2.0.1/jquery.pjax.min.js
// @require      https://cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.js
// @resource     nprogressCSS     https://cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.css
// @resource     loadingCSS     https://raw.githubusercontent.com/slaier/pjax-everywhere/master/loading.css?t=1546656015
// @resource     config     https://raw.githubusercontent.com/slaier/pjax-everywhere/master/config.json
// @grant       GM_addStyle
// @grant       GM_getResourceText
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    // 加载nprogress的CSS
    let nprogressCSS = GM_getResourceText ("nprogressCSS");
    GM_addStyle (nprogressCSS);
    // loading 动画
    let loadingCSS = GM_getResourceText ("loadingCSS");
    GM_addStyle (loadingCSS);
    let loading = '<div id="loading-wrap" style="display: none;"  ontouchmove="event.preventDefault()" onscroll="event.preventDefault()"><div id="loading-anime" style="background-image:url(https://raw.githubusercontent.com/slaier/pjax-everywhere/master/loading.png)"></div></div>';
    $('body').append(loading);
    // 读取配置文件
    let config = GM_getResourceText('config');
    config = JSON.parse(config);
    $.pjax.defaults.timeout = config['timeout'];

    let configs = config['config'];
    for(let i = 0; i < configs.length; ++i){
        let arg = configs[i];
        let href = location.href;
        let reg = new RegExp(arg['match'], "gi");
        if (reg.test(href)){
            $(document).pjax(arg['selector'], arg['options']);
            break;
        }
    }
    $(document).on('pjax:start', function() {
        NProgress.start();
        $("#loading-wrap").show();
    });
    $(document).on('pjax:end',   function() {
        NProgress.done();
        $("#loading-wrap").fadeOut(300);
    });
})();