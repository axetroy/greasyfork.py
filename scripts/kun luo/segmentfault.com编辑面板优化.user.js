// ==UserScript==
// @name         segmentfault.com编辑面板优化
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  编辑高度提高到800px，历史版本添加滚动条，屏蔽广告
// @author       https://github.com/1uokun
// @match        https://segmentfault.com/n/*/edit
// @match        https://segmentfault.com/record
// @match        https://segmentfault.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var defaultHeight = document.documentElement.clientHeight
    console.log('defaultHeight',defaultHeight)
    /**
    var observer = new ResizeObserver(function(entries) {
        entries.forEach(function(entry) {
            defaultHeight = entry.contentRect.height
        });
    });
    observer.observe(noteText);
    **/

    var _url = window.location.href;
    if(_url.indexOf('record')>-1 || _url.indexOf('edit')>-1){
        noteText.style.minHeight = defaultHeight+'px'
        revisionList.style.maxHeight = defaultHeight+'px'
        revisionList.style.overflowY = 'auto'
    }else {
        document.querySelectorAll('ins').forEach(function(item){
            item.style.display = 'none'
        })

        document.querySelector('.job-recommend').style.display='none'
    }

    setTimeout(function(){
        //去iframe类型的广告
        if($('iframe')){
            window.stop()
        }
    },1000)
})();