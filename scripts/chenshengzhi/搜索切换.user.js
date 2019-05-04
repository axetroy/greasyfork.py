// ==UserScript==
// @name        搜索切换
// @namespace   https://github.com/chenshengzhi
// @description 搜索切换, g键: google, y键: 有道单词, s键: 搜狗搜索, e键: 搜狗英文, b键: 百度, a键: 当前搜索增加 site:developer.apple.com
// @version     0.0.2
// @require     http://cdn.staticfile.org/jquery/2.1.1/jquery.min.js
// @grant       GM_openInTab
// @license     GPL version 3
// @homepageURL https://greasyfork.org/scripts/13501/
// @include     *www.baidu.com*
// @include     *dict.youdao.com*
// @include     *www.google.com.hk*
// @include     *.sogou.com*
// ==/UserScript==

$(document).ready(function() {
    function isBaiduSearch() {
        return location.href.indexOf('www.baidu.com/s?') != -1;
    }

    function isYoudaoDictSearch() {
        return location.href.indexOf('dict.youdao.com/search?') != -1;
    }

    function isGoogleSearch() {
        return location.host.indexOf('google.com') != -1 && location.href.indexOf('/search?') != -1;
    }

    function isSogouSearch() {
        return location.href.indexOf('www.sogou.com/web?query=') != -1;
    }

    function isSogouEnglishSearch() {
        return location.href.indexOf('english.sogou.com/english?query=') != -1;
    }

    function getCurrentSearchTypeKey() {
        if (isBaiduSearch()) {
            return 'b';
        } else if (isGoogleSearch()) {
            return 'g';
        } else if (isYoudaoDictSearch()) {
            return 'y';
        } else if (isSogouSearch()) {
            return 's';
        } else if (isSogouEnglishSearch()) {
            return 'e'
        } else {
            return '';
        }
    }

    var searchUrlPrefixs = {
        'b': 'https://www.baidu.com/s?ie=utf-8&wd=',
        'g': 'https://www.google.com.hk/search?q=',
        'y': 'http://dict.youdao.com/search?q=',
        's': 'https://www.sogou.com/web?query=',
        'e': 'https://english.sogou.com/english?query='
    };

    var searchInputIdentifier = {
        'b': '#kw',
        'g': '#lst-ib',
        'y': '#query',
        's': '#upquery',
        'e': '#upquery',
    };

    document.body.onkeypress = function(e) {
        if (!document.activeElement) {
            return false;
        }

        //正在输入
        if (document.activeElement.tagName.toLowerCase() == 'input') {
            return true;
        }

        console.log(e.key);

        var keyChar = e.key.toLowerCase();
        var currentKey = getCurrentSearchTypeKey();

        if (keyChar == 'a') {
            if (currentKey.length > 0 && currentKey != 'y') {
                console.log('+++', currentKey);
                var prefix = searchUrlPrefixs[currentKey];
                GM_openInTab(encodeURI(prefix + $(searchInputIdentifier[currentKey]).val() + ' site:developer.apple.com'));
            }
            return false;
        } else {
            var prefix = searchUrlPrefixs[keyChar];
            console.log(prefix);
            if (prefix.length > 0) {
                GM_openInTab(encodeURI( prefix + $(searchInputIdentifier[currentKey]).val() ));
            }
            return false;
        }
    }
});
