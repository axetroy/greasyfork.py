// ==UserScript==
// @name         蒸汽动力 - 展现所有内容
// @namespace    moe.jixun.steamcn
// @version      1.0
// @description  在蒸汽动力攻略页面一次性展开所有内容。
// @author       Jixun Moe<https://jixun.moe/>
// @include      http://steamcn.com/t*
// @include      http://steamcn.com/forum.php?mod=viewthread&*
// @grant        none
// @run-at       document-start
// @homepage     https://jixun.moe/
// @connect      self
// @nocompat     Chrome
// @require      https://greasyfork.org/scripts/20844/code/20844.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js#md5=d0212568ce69457081dacf84e327fa5c,sha256=266bcea0bb58b26aa5b16c5aee60d22ccc1ae9d67daeb21db6bad56119c3447d
// ==/UserScript==

/* jshint esnext:true, jquery: true */

$(($) => {
    'use strict';
    $.noConflict();
    var logger = new Logger();

    //// 填充元素
    var _dummy = $('<div>');

    //// 帖子数据
    var postContainer = $('#postlist>div').first();
    var tid = window.tid;
    var pid = getFirstPid();

    //// 检测帖子目录是否存在
    var threadIndex = postContainer.find('.tindex');
    if (threadIndex.length !== 1)
        return ;

    //// 开始获取数据
    var threadTitles = threadIndex.find('li');
    var threadOffset = 0;
    if (threadTitles.first().attr('onclick').indexOf('cp=1') == -1) {
        threadOffset = -1;
    }
    var maxPage = threadTitles.length;

    //// 隐藏之前的帖子数据
    var postCell = postContainer.find('.t_f');
    var postTable = postCell.closest('table');
    var cacheText = postCell.find('.pstatus').text() || '_raw';

    getPageContent(1);

    //// 辅助函数
    function getFirstPid () {
        return parseInt(postContainer.attr('id').replace('post_', ''));
    }

    function getTitleOfPage (page) {
        var index = page - 1 + threadOffset;
        if (index < 0) {
            return _dummy;
        }
        return threadTitles.eq(index);
    }

    function getPageName (page) {
        return getTitleOfPage(page).text();
    }

    function updatePageIndex (page) {
        var title = getTitleOfPage(page);
        title.prop('onclick', null);

        var link = $('<a>').text(title.text());
        link.attr('href', `${location.pathname}${location.search}#page_${page}`);

        title.html(link);
    }

    function tryLoadCache (page) {
        // cacheText
        var cache = localStorage[`_cache_${tid}_${pid}_${page}`];
        if (!cache) return false;

        var data;
        try {
            data = JSON.parse(cache);
        } catch (err) {
            return false;
        }

        if (data.cache == cacheText) {
            showPage(page, data.html);
            return true;
        }

        return false;
    }

    function saveCache (page, html) {
        var data = {
            cache: cacheText,
            html: html.wrapAll('<div>').parent().html()
        };
        localStorage[`_cache_${tid}_${pid}_${page}`] = JSON.stringify(data);
    }

    function showPage (page, html) {
        var pageName = getPageName(page);
        var threadContent = $(html);

        var header = $('<h2>').text(pageName);
        threadContent.prepend(header);
        threadContent.append(document.createElement('hr'));

        // threadContent 是 td, 把父 tr 插进去。
        postTable.append(threadContent.wrap('<tr>').parent());
        header.attr('id', `page_${page}`);
        updatePageIndex(page);

        // 藏起来
        postCell.hide();
    }

    function nextPage (page) {
        if (page >= maxPage) {
            logger.show('全部数据载入完毕!');
        } else {
            getPageContent(page + 1);
        }
    }

    function getPageContent (page) {
        if (tryLoadCache (page)) {
            nextPage (page);
            return ;
        }

        var pageName = getPageName(page);
        var logLoadingPage = logger.stick(`正在读取第 ${page} 页 - ${pageName} ...`);
        var url = `/forum.php?mod=viewthread&threadindex=yes&tid=${tid}&viewpid=${pid}&cp=${page}`;

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'xml'
        }).done((doc) => {
            var cell = $(doc.getElementsByTagName('root')[0].textContent).find('.t_f');
            saveCache(page, cell);
            showPage(page, cell);
        }).always(() => {
            logger.remove(logLoadingPage);
            nextPage(page);
        });
    }
});