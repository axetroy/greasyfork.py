// ==UserScript==
// @name               Bilibili 视频默认选择最高清晰度
// @name:zh-CN         哔哩哔哩视频默认选择最高清晰度
// @name:zh-SG         哔哩哔哩视频默认选择最高清晰度
// @name:zh-TW         嗶哩嗶哩影片自動選擇最高解析度
// @name:zh-HK         嗶哩嗶哩影片自動選擇最高解析度
// @name:zh-MO         嗶哩嗶哩影片自動選擇最高解析度
// @namespace          http://tampermonkey.net/
// @version            1.2019.4.14
// @description:zh-CN  之前哔哩哔哩切换视频，清晰度会默认调成自动。
// @description:zh-SG  之前哔哩哔哩切换视频，清晰度会默认调成自动。
// @description:zh-TW  從前嗶哩嗶哩切換影片，解析度會莫名其妙調成自動。為了不用每次都手動調回去，就寫了這個。
// @description:zh-HK  從前嗶哩嗶哩切換影片，解析度會莫名其妙調成自動。為了不用每次都手動調回去，就寫了這個。
// @description:zh-MO  從前嗶哩嗶哩切換影片，解析度會莫名其妙調成自動。為了不用每次都手動調回去，就寫了這個。
// @require            https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js
// @contributionURL    https://qr.alipay.com/lpx05806vmqruupocs1du1b
// @contributionAmount 0.618
// @icon               https://www.bilibili.com//favicon.ico
// @supportURL         zimongmu@gmail.com
// @author             Zimongmu
// @match              *://www.bilibili.com/video/av*
// @run-at             document-idle
// @grant              none
// @license            Anti 996 License Version 1.0
// @description try to take over the world!
// ==/UserScript==
"use strict";

/**
 * 将函数里的代码转换成字符串。
 * @param    {Function}  fn    待转换的函数。
 * @returns  {String}          函数里的代码。
 */
function functionToString(fn) {
    var str = fn.toString().split("\n");
    return str.slice(1, str.length - 1).join("\n");
}


eval(Babel.transform(functionToString(function() {

    let search = '?p=0';
    const MutationObserver = window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver;
    const observerOptions = {
        'subtree': true,
        'attributes': true,
        'attributeFilter': ['src']
    };
    const execute = (mutationRecords, mutationObserver) => {

        const bilibiliPlayer = document.getElementById('bilibiliPlayer');
        const profileInfo = document.querySelector('.profile-info');
        const bannerAd = document.getElementById('bannerAd');
        const selectListWrap = bilibiliPlayer.querySelectorAll(
            '.bui-select-list-wrap li'
        );
        let loginStatus = '';

        if (
            profileInfo === null ||
            search == location.search ||
            selectListWrap.length === 0 ||
            !bilibiliPlayer.hasAttribute('data-login')
        ) {
            setTimeout(execute, 500, mutationRecords, mutationObserver);
            mutationRecords = mutationObserver.takeRecords();
            return;
        } else if (profileInfo.querySelector('.vip') !== null) {
            loginStatus = '$.^';
        } else if (bilibiliPlayer.getAttribute('data-login') == 'true') {
            loginStatus = '大会员';
        } else if (bilibiliPlayer.getAttribute('data-login') == 'false') {
            loginStatus = '(大会员|登录)';
        } else {
            console.error(
                '\n你可能需要更新或者反馈问题给作者了！',
                '\n\n你可能需要更新或者反饋問題給作者了！'
            );
        }
        for (const wrap of selectListWrap) {
            if (!new RegExp(loginStatus).test(wrap.innerHTML)) {
                if (!wrap.classList.contains('bui-select-item-active')) {
                    setTimeout(
                        () => wrap.click(),
                        location.search === '' || search == '?p=0' ? 0 : 1000
                    );
                }
                if (bannerAd !== null && bannerAd.style.display != 'none') {
                    bannerAd.style.display = 'none';
                }
                break;
            }
        }
        search = location.search;
        mutationRecords = mutationObserver.takeRecords();
    };

    MutationObserver === null ?
        execute() :
        new MutationObserver(execute).observe(document.body, observerOptions);

}), { presets: ["es2015", "es2016"] }).code);