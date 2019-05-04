// ==UserScript==
// @name               NeedRom - Anti-Anti-adblock
// @name:zh-CN         NeedRom - 禁用 “禁用广告屏蔽插件” 的提示。
// @namespace          moe.jixun.anti-anti-adblock
// @version            1.1.1
// @description        See @name. You still need an account to download.
// @description:zh-CN  See @name. You still need an account to download.
// @author             Jixun
// @include            http://needrom.com/*
// @include            http://www.needrom.com/*
// @grant              none
// @run-at             document-start
// ==/UserScript==

/* jshint esnext: true */

function loader ($) {
    //// PATCH 1 - Network Patch
    var _post = $.post;
    $.post = function (url, data, opts) {
        var args = Array.prototype.slice.call(arguments);
        if (url === ajaxurl)  {
            if (data.action === 'standard_count') {
                changeFalse(data, 'blocked');
                changeFalse(data, 'ba_count_jsFile');
                changeFalse(data, 'ba_count_banner');
            }
            args[1] = data;
            console.info('Data patched.');
        }
        return _post.apply(this, args);
    };

    function changeFalse (data, key) {
        if (data.hasOwnProperty(key)) {
            data[key] = false;
        }
    }

    //// PATCH 2 - Script Check
    $.adblockJsFile = true;

    //// PATCH 3 - Banner Check
    var _getElementById = document.getElementById;
    document.getElementById = function (id) {
        var r = _getElementById.apply(this, arguments);

        if (id.indexOf('banner') != -1) {
            r.style.borderTop = '1px solid';
            if (r.offsetHeight === 0) {
                return fakeBanner();
            }
        }

        return r;
    };

    function fakeBanner () {
        var r = document.createElement('div');
        r.style.borderTop = '1px solid';
        document.body.appendChild(r);
        return r;
    }
}

addEventListener('DOMContentLoaded', () => {
    var script = document.createElement('script');
    script.textContent = `(${loader})(jQuery);`;
    script.onload = () => {
        document.head.removeChild(script);
    };
    document.head.appendChild(script);
}, false);