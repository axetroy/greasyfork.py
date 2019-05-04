// ==UserScript==
// @name         CSDN 博客自动展开去除限制及广告
// @namespace    http://tampermonkey.net/
// @version      0.21
// @description  CSDN 博客自动展开，并去除阅读次数限制，隐藏未登入底部提示框，去除界面广告，以及其他优化
// @author       So
// @match        *://blog.csdn.net/*/article/details/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function (){

    'use strict';

    // 去除展开次数限制 （下请选择一条 或 保持默认）
    // window.localStorage.anonymousUserLimit = `{"number":0,"lastTime":45}`; // 展开次数永远保持一次
    window.localStorage.anonymousUserLimit = ''; // 禁止写入展开次数

    // 自动展开
    let btn_readmore = document.getElementById('btn-readmore');
    if (btn_readmore) btn_readmore.click();

    // 广告元素或其他元素处理配置
    // 固然这里已经删除所有广告元素，但我还是推荐安装广告拦截拓展
    var config = [{
        // 底部登入注册框提示及广告
        selector: '.pulllog-box',
    }, {
        // 最新评论列表
        selector: '#asideNewComments',
    }, {
        // 热门文章列表
        selector: '#asideHotArticle',
    }, {
        // 推荐文章列表广告
        selector: '.recommend-ad-box',
    }, {
        // 推荐文章列表广告
        selector: '.p4courset3_target',
    }, {
        // 广告块
        selector: '#adContent',
    }, {
        // 侧边栏广告
        selector: 'aside > .csdn-tracking-statistics',
    }, {
        // 仅保留部分文章推荐
        selector: '.recommend-box>div',
        isAll: true,
        start: 5,
    }, {
        // 博文底部广告
        selector: '.mediav_ad',
        isAll: true,
        parentNodeNum: 3,
    }, {
        // 广告块2
        selector: '#ad_unit',
        isAll: true,
        parentNodeNum: 2,
    }, {
        // 侧边栏广告块
        selector: 'aside iframe',
        isAll: true,
        parentNodeNum: 2,
    }];

    // 元素删除处理
    for (let item of config) {
        // 选择表达式
        if (typeof item.selector == 'undefined') {
            continue;
        }

        // 设置参数
        let selector = item.selector;
        let isAll = typeof item.isAll != 'undefined' ? item.isAll : false;
        let parentNodeNum = typeof item.parentNodeNum != 'undefined' ? item.parentNodeNum : 0;
        let start = typeof item.start != 'undefined' ? item.start : -1;
        let end = typeof item.end != 'undefined' ? item.end : -1;

        // 批量选择器
        if (isAll) {
            let els = document.querySelectorAll(selector);
            if (els) {
                for (let i in els) {
                    // 开始节点，结束节点
                    if ((start > -1 && i > start && (i < end || end == -1)) || start == -1) {
                        let el = els[i];
                        if (typeof el == 'object') {
                            // 追溯父节点
                            while (parentNodeNum > 0) {
                                el = el.parentNode;
                                parentNodeNum--;
                            }
                            el.remove();
                        }
                    }
                }
            }
            continue;
        }

        // 单节点选择器
        let el = document.querySelector(selector);
        if (el) {
            // 追溯父节点
            if (parentNodeNum > 0) {
                while (parentNodeNum > 0) {
                    el = el.parentNode;
                    parentNodeNum--;
                }
            }
            el.remove();
        }
    }
})();
