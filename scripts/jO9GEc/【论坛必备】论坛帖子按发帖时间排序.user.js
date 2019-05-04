// ==UserScript==
// @name                【论坛必备】论坛帖子按发帖时间排序
// @namespace        a@b.c
// @author                jasake
// @description        论坛自动按发帖时间排序，支持 discuz 和 phpwind
// @include                */forum-*
// @include                */forum.php?mod=forumdisplay*
// @include                */thread-*
// @include                */thread/*
// @include                */thread.php?fid*
// @include                */index.php?c=thread&fid=*
// @grant          none
// @charset                UTF-8
// @version                1.2
// ==/UserScript==
var bydate = document.querySelector('#filter_dateline_menu > .pop_moremenu a[href*="orderby=dateline"], #filter_threadsort_menu > .pop_moremenu a[href*="orderby=dateline"], #filter_orderby_menu a[href*="orderby=dateline"], .colplural .author a[href*="orderby=dateline"], a[href$="orderby=dateline"]') || document.querySelector('.content_filter a[href*="orderby=postdate"], .thread_sort a[href*="orderway"][href*="postdate"], #threadlist .mr20 a[href][onclick^="orderThreads(\'postdate\')"]');
if (bydate && !/\#tabA|-orderway-|orderby=/.test(location.href)) bydate.click();