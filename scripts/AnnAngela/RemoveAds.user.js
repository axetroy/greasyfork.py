// ==UserScript==
// @name            RemoveAds
// @name:en         RemoveAds
// @version         1.7.7
// @description     需要配合AdBlockPro使用！该脚本可以移除那些规避ABP反广告功能或要求解除ABP反广告功能的广告，仅此而已。
// @description:en  This script can remove the ads which avoiding or requesting you to stop AdBlockPro to block them. Just it.
// @author          AnnAngela
// @match           *://*/*
// @run-at          document-start
// @grant           unsafeWindow
// @grant           none
// @namespace       https://greasyfork.org/users/129402
// ==/UserScript==

(function() {
    "use strict";
    /* 防止重复加载 */
    if (unsafeWindow.RemoveAds) return;
    console.info('RemoveAds running.');
    unsafeWindow.removedAds = [];

    if ((location.host.includes('bbs.nga.cn') || location.host.includes('bbs.ngacn.cc')) && location.pathname.includes('adpage_insert')) {
        var stylesheet = document.createElement('style');
        stylesheet.innerText = 'html, body, * { display: none!important; }';
        unsafeWindow.document.body.appendChild(stylesheet);
        var jump = function jump() {
            if (unsafeWindow.getJump) {
                var _getJump = unsafeWindow.getJump.bind(unsafeWindow);
                unsafeWindow.getJump = function() {};
                _getJump();
            }
        };
        setInterval(jump, 10);
    } else if (location.hostname === "www.ruanyifeng.com") {
        console.info("RemoveAds: removed the anti-adb checker.");
        Object.defineProperty(unsafeWindow, "checker", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function() {
                console.info("RemoveAds: Got a call to the anti-adb checker but denied.");
            }
        });
    }
    var props = {
        admiral: {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function() {
                console.info("RemoveAds: Got a call to admiral but denied.");
            }
        },
        blockAdBlock: {
            configurable: false,
            enumerable: false,
            writable: false,
            value: {
                on: function(detected, fn) {
                    this[(detected === true ? 'onDetected' : 'onNotDetected')](fn);
                },
                onDetected: function(fn) {
                    console.info("RemoveAds: Got a call to blockAdBlock.onDetected but denied, with callback function", fn);
                },
                onNotDetected: function(fn) {
                    console.info("RemoveAds: Got a call to blockAdBlock.onNotDetected but denied, with callback function", fn);
                },
            }
        },
        BlockAdBlock: {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function(options) {
                console.info("RemoveAds: Got a call to BlockAdBlock but denied, with setting", options);
            }
        },
    };
    Object.defineProperties(unsafeWindow, props);

    var blockBlockAdBlockFlag = false;
    unsafeWindow.removeAd = function removeAd() {
        if (!location.host.includes("getadmiral.com")) Array.from(unsafeWindow.document.querySelectorAll('body > :not([rmAd-admiral])')).forEach(function(that) {
            that.setAttribute('rmAd-admiral', '')
            if (that.querySelector('a[href^="https://getadmiral.com/pb"]')) {
                console.info('RemoveAds: ', removedAds.push(that), '\n', that, '\n', that.parentNode, '\n', that.innerText);
                that.remove();
            }
        });
        if (unsafeWindow.document.body.dataset.blockBlockAdBlock !== "true") {
            unsafeWindow.document.body.dataset.blockBlockAdBlock = "true";
            Object.defineProperty(unsafeWindow.document.body, 'innerHTML', {
                configurable: false,
                enumerable: false,
                get: function() {
                    var temp = document.createElement("div");
                    temp.innerHTML = unsafeWindow.document.body.outerHTML;
                    return temp.innerHTML;
                },
                set: function(value) {
                    if (value === '') {
                        blockBlockAdBlockFlag = true;
                        throw new Error("RemoveAds: Got a call from blockAdBlock tring removing the content of page.");
                    }
                    var temp = document.createElement("div");
                    temp.innerHTML = unsafeWindow.document.body.outerHTML;
                    var tag = unsafeWindow.document.body.outerHTML.replace(temp.innerHTML, '$$$$$$$$$$$$');
                    tag = tag.replace('$$$$$$</body>', value + '</body>');
                    unsafeWindow.document.body.outerHTML = tag;
                }
            });
        }
        if (blockBlockAdBlockFlag) {
            Array.from(unsafeWindow.document.querySelectorAll('style:not([rmAd-blockAdBlock])')).forEach(function(that) {
                that.setAttribute('rmAd-blockAdBlock', '');
                if (that.innerText.includes("#yui3-css-stamp.cssreset{display:none}")) {
                    console.info('RemoveAds: Remove the blockAdBlock CSS', removedAds.push(that), '\n', that);
                    that.remove();
                }
            });
        }
        if (location.host.endsWith("baidu.com")) Array.from(unsafeWindow.document.querySelectorAll('span')).forEach(function(that) {
            if (/^(广告)+$/.test(that.innerText.replace(/s/g, ''))) {
                console.info('RemoveAds: ', removedAds.push(that), '\n', that, '\n', that.parentNode, '\n', that.innerText);
                that.remove();
            }
        });
        else if (location.host.endsWith('gamepedia.com')) {
            var siderail = document.querySelector('#siderail');
            if (siderail) siderail.remove();
            var globalWrapper = document.querySelector('#global-wrapper.with-siderail');
            if (globalWrapper) globalWrapper.classList.remove('with-siderail');
        }
        var nodes = Array.from(unsafeWindow.document.querySelectorAll('[style*="important"]:not([removeAd-has-checked-for-inline-style])'));
        if (!nodes.length) return;
        nodes.forEach(function(that) {
            that.setAttribute('removeAd-has-checked-for-inline-style', '')
            var style = (that.attributes.style.textContent + '').replace(/\s/g, '');
            var display = (style.match(/display:([a-z\-]+)\!important/ig) || []).map(n => n.match(/display:([a-z\-]+)\!important/i)[1]);
            var displayCheck = [];
            display.forEach(function(n) {
                if (n !== 'none') displayCheck.push(n);
            });
            if (displayCheck.length === 0) return;
            that.attributes.style.textContent = style.replace(/display:([a-z\-]+)\!important/ig, '');
            if (getComputedStyle(that).display === 'none' || /^(广告)+$/.test(that.innerText.replace(/s/g, ''))) {
                that.attributes.style.textContent = style + '';
                console.info('RemoveAds: ', removedAds.push(that), '\n', that, '\n', that.parentNode, '\n', that.innerText);
                that.remove();
            } else that.attributes.style.textContent = style + '';
        });
    };
    document.addEventListener('DOMContentLoaded', function() {
        if (location.href.indexOf('www.baidu.com/s') !== -1) setInterval(function() {
            removeAd();
            Array.from(unsafeWindow.document.querySelectorAll('#content_left .c-container')).forEach(function(ele) {
                if (ele.querySelector('.icon-unsafe-icon')) ele.remove();
                if (!ele.createShadowRoot) {
                    console.info('RemoveAds (shadowRoot): ', removedAds.push(ele), '\n', ele, '\n', ele.parentNode, '\n', ele.innerText);
                    var html = ele.outerHTML;
                    var node = unsafeWindow.document.createElement('div');
                    ele.before(node);
                    node.outerHTML = html;
                    ele.remove();
                }
            });
        }, 100);
        else setInterval(function() { removeAd(); }, 100);
    });
})();