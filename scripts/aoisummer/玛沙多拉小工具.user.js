// ==UserScript==
// @name               Masadora Tools
// @name:zh-CN         玛沙多拉小工具
// @namespace          https://github.com/aoisummer/algenib/tree/master/masadora-tools
// @version            0.3.0
// @description        Fix some image display *problem* and show CNY on search list page.
// @description:zh-CN  修复一些图片显示「错误」，在部分搜索页面上显示计算后的人民币价格。
// @author             aoi
// @match              http://*.masadora.jp/*
// @grant              none
// @noframes
// ==/UserScript==

(function () {
    // NodeList forEach Polyfill
    window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = Array.prototype.forEach);

    // MutationObserver mapping
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    // Image fix functions
    var fixAmazonR18Image = function () {
        var getNewImageUrl = function (url, size) {
            size = typeof size !== 'undefined' ? size : 500;
            var urls = url.split('/');
            var filenames = urls.slice(-1)[0].split('.');
            var filename2 = [filenames.slice(0, 1)[0], '_SX%s_'.replace('%s', size), filenames.slice(-1)[0]].join('.');
            urls.splice(-1, 1, filename2);
            return urls.join('/');
        };
        var img = document.querySelector('#main-image-container>.list>.item img');
        var altImages = document.querySelector('#altImages>ul');
        if (!img || !img.src.match(/r18-mask\.jpg$/)) {
            return;
        }
        altImages.querySelectorAll('.item img').forEach(function (i) {
            i.removeAttribute('src');
        });
        if (img.getAttribute('data-old-hires')) {
            var url1 = getNewImageUrl(img.getAttribute('data-old-hires'));
            var url2 = getNewImageUrl(img.getAttribute('data-old-hires'), 38);
            img.removeAttribute('style');
            img.src = url1;
            altImages.querySelector('.item img').src = url2;
        } else {
            var observer = new MutationObserver(function (mutationList) {
                mutationList.forEach(function (mutation) {
                    mutation.addedNodes.length !== 0 && mutation.addedNodes.forEach(function (el) {
                        if (el.classList.contains('item')) {
                            img.removeAttribute('style');
                            img.src = getNewImageUrl(el.querySelector('img').src);
                            observer.disconnect();
                        }
                    });
                });
            });
            observer.observe(altImages, {childList: true});
        }
        altImages.removeAttribute('style');

        // Non product image
        document.querySelectorAll('img[src$="r18-mask.jpg"]').forEach(function (el) {
            var orig = el.getAttribute('data-a-hires');
            if (orig) {
                el.src = orig;
            }
        });
    };
    var fixSurugayaR18Image = function () {
        if (location.pathname.indexOf('/product/detail/') !== 0) {
            return;
        }
        var el = document.querySelector('#imagecaption');
        el.src.match(/r18-mask\.jpg$/) && (el.src = el.parentNode.href);
    };
    var fixMelonbooksR18Image = function () {
        if (location.pathname.indexOf('/detail/detail.php') !== 0) {
            return;
        }
        var observer = new MutationObserver(function (mutationList) {
            mutationList.forEach(function (mutation) {
                var el = mutation.target;
                if (el.tagName === 'IMG' && el.src.match(/r18-mask\.jpg$/)) {
                    el.src = el.parentNode.href;
                }
            });
        });
        observer.observe(document.querySelector('.trnn-img-box'), {attributes: true, subtree: true});
    };

    // Show CNY functions
    var getExRate = function () {
        var find1 = function() {
            var el = document.querySelector('#exchangeRateData');
            var r = el ? el.textContent.match(/([0-9\.]+)\sRMB/) : null;
            return r ? r[1] : r;
        };
        var find2 = function() {
            var el = document.querySelector('.right_main .rate .rmb .font14');
            return el ? el.textContent : null;
        };
        var find3 = function() {
            var el = document.querySelector('.msd-price-inline-block>p[color]');
            var r = el ? el.textContent.match(/([0-9\.]+)\sRMB/) : null;
            return r ? r[1] : r;
        };
        var find4 = function() {
            var el = document.querySelector('.single-info-rate-box>.value-box');
            var r = el ? el.textContent.match(/([0-9\.]+)\sRMB/) : null;
            return r ? r[1] : r;
        };

        switch (location.host) {
            case 'amz.masadora.jp':
                return find1();
            case 'toranoana.masadora.jp':
            case 'cqueen.masadora.jp':
            case 'melonbooks.masadora.jp':
            case 'animate.masadora.jp':
            case 'meikido.masadora.jp':
                return find2();
            case 'surugaya.masadora.jp':
            case 'bookoff.masadora.jp':
                return find3();
            case 'booth.masadora.jp':
                return find2() || find4();
            case 'movic.masadora.jp':
                return find4();
        }
    };
    var loadStyle = function (text) {
        var style = document.createElement('style');
        style.textContent = text;
        document.querySelector('head').appendChild(style);
    };
    var showAmazonCNY = function (exRate) {
        var render = function () {
            document.querySelectorAll('.a-size-base.a-color-price.a-text-bold').forEach(function (el) {
                if (el.getAttribute('data-showcny')) {
                    return;
                } else {
                    el.setAttribute('data-showcny', 1);
                }

                var row = el.parentNode;
                while (!row.classList.contains('a-row') && row !== null) {
                    row = row.parentNode;
                }
                if (!row) {
                    return;
                }

                var p1 = Number(el.textContent.replace(/[^0-9]/g, ''));
                var p2 = Math.ceil(p1 * Number(exRate));
                var newEl = document.createElement('div');
                newEl.className = 'a-row a-spacing-mini x-cny x-cny-amazon';
                newEl.textContent = p2 + ' CNY';
                row.parentNode.insertBefore(newEl, row.nextSibling);
            });
        };
        render();

        var observer = new MutationObserver(function (mutationList) {
            mutationList.forEach(function (mutation) {
                mutation.addedNodes.length !== 0 && mutation.addedNodes.forEach(function (el) {
                    ['centerMinus', 'centerBelowPlus'].indexOf(el.id) !== -1 && render();
                });
            });
        });
        observer.observe(document.querySelector('#resultsCol'), {childList: true});
    };
    var showToranoanaCNY = function (exRate) {
        if (location.pathname.indexOf('/search.htm') !== 0) {
            return;
        }
        document.querySelectorAll('.goods_list .price>big').forEach(function (el) {
            var p1 = Number(el.textContent.trim());
            var p2 = Math.ceil(p1 * Number(exRate));
            var newEl = document.createElement('div');
            newEl.className = 'x-cny x-cny-toranoana';
            newEl.textContent = p2 + ' CNY';
            el.parentNode.parentNode.insertBefore(newEl, el.parentNode.nextSibling);
        });
    };
    var showSuragayaCNY = function (exRate) {
        if (location.pathname.indexOf('/search') !== 0) {
            return;
        }
        var result = document.querySelector('#search_result');
        result.querySelectorAll('.item_price>.price').forEach(function (el) {
            var p1 = Number(el.textContent.replace(/[^0-9]/g, ''));
            var p2 = Math.ceil(p1 * Number(exRate));
            var newEl = document.createElement('div');
            newEl.className = 'x-cny x-cny-suragaya';
            newEl.textContent = p2 + ' CNY';
            el.parentNode.appendChild(newEl);
        });
    };
    var showCqueenCNY = function (exRate) {
        var list = document.querySelector('.search-result-list');
        if (!list) {
            return;
        }
        list.querySelectorAll('li>.meta:last-of-type').forEach(function (el) {
            var p1 = Number(el.textContent.replace(/[^0-9]/g, ''));
            var p2 = Math.ceil(p1 * Number(exRate));
            var newEl = document.createElement('div');
            newEl.className = 'x-cny x-cny-cqueen';
            newEl.textContent = p2 + ' CNY';
            el.parentNode.appendChild(newEl);
        });
    };
    var showBookoffCNY = function (exRate) {
        var list = document.querySelector('#resList');
        if (!list) {
            return;
        }
        list.querySelectorAll('.details .mainprice').forEach(function (el) {
            var el2 = el.cloneNode(true);
            el2.removeChild(el2.querySelector('span'));
            var p1 = Number(el2.textContent.replace(/[^0-9]/g, ''));
            var p2 = Math.ceil(p1 * Number(exRate));
            var newEl = document.createElement('div');
            newEl.className = 'x-cny x-cny-bookoff';
            newEl.textContent = p2 + ' CNY';
            el.appendChild(newEl);
        });
    };
    var showMelonbooksCNY = function (exRate) {
        if (location.pathname.indexOf('/search/search.php') !== 0) {
            return;
        }
        document.querySelectorAll('.goods_list .goods .price>big').forEach(function (el) {
            var p1 = Number(el.textContent);
            var p2 = Math.ceil(p1 * Number(exRate));
            var newEl = document.createElement('div');
            newEl.className = 'x-cny x-cny-melonbooks';
            newEl.textContent = p2 + ' CNY';
            el.parentNode.parentNode.insertBefore(newEl, el.parentNode.nextSibling);
        });
    };
    var showAnimateCNY = function (exRate) {
        if (location.pathname.indexOf('/products/list.php') !== 0) {
            return;
        }
        document.querySelectorAll('.goods_list .goods .price>big').forEach(function (el) {
            var p1 = Number(el.textContent);
            var p2 = Math.ceil(p1 * Number(exRate));
            var newEl = document.createElement('div');
            newEl.className = 'x-cny x-cny-animate';
            newEl.textContent = p2 + ' CNY';
            el.parentNode.parentNode.insertBefore(newEl, el.parentNode.nextSibling);
        });
    };
    var showBoothCNY = function (exRate) {
        if (location.pathname.indexOf('/search/') !== 0) {
            return;
        }
        document.querySelectorAll('.goods_list .goods .price>big').forEach(function (el) {
            var p1 = Number(el.textContent);
            var p2 = Math.ceil(p1 * Number(exRate));
            var newEl = document.createElement('div');
            newEl.className = 'x-cny x-cny-booth';
            newEl.textContent = p2 + ' CNY';
            el.parentNode.parentNode.insertBefore(newEl, el.parentNode.nextSibling);
        });
    };
    var showMovicCNY = function (exRate) {
        var list = document.querySelector('.msd-goods-box');
        if (!list) {
            return;
        }
        list.querySelectorAll('.goods-item .price .color-orange').forEach(function (el) {
            var p1 = Number(el.textContent);
            var p2 = Math.ceil(p1 * Number(exRate));
            var row = el.parentNode.parentNode;
            var newEl = document.createElement('div');
            newEl.className = 'x-cny x-cny-movic';
            newEl.textContent = p2 + ' CNY';
            row.parentNode.insertBefore(newEl, row.nextSibling);
            row.style.marginTop = '-8px';
        });
    };

    // Main
    var styleRules = [
        '.x-cny-amazon{color:#888;}',
        '.x-cny-toranoana{padding:0 7px;color:#888;}',
        '.x-cny-suragaya{margin:.25em 0;color:#888;}.list_style .x-cny-suragaya{text-align:right;}',
        '.x-cny-queen{margin-top:.25em;color:#888;}',
        '.x-cny-bookoff{margin-top:.25em;font-size:1rem;font-weight:400;color:#888;}',
        '.x-cny-melonbooks{padding:0 7px;color:#888;}',
        '.x-cny-animate{padding:0 7px;color:#888;}',
        '.x-cny-booth{padding:0 7px;color:#888;}',
        '.x-cny-movic{color:#888;}'
    ];
    var exRate = getExRate() || localStorage.getItem('_exRate');

    if (!!exRate) {
        localStorage.setItem('_exRate', exRate);
        loadStyle(styleRules.join(''));
    }
    switch (location.host) {
        case 'amz.masadora.jp':
            fixAmazonR18Image();
            !!exRate && showAmazonCNY(exRate);
            break;
        case 'toranoana.masadora.jp':
            !!exRate && showToranoanaCNY(exRate);
            break;
        case 'surugaya.masadora.jp':
            fixSurugayaR18Image();
            !!exRate && showSuragayaCNY(exRate);
            break;
        case 'cqueen.masadora.jp':
            !!exRate && showCqueenCNY(exRate);
            break;
        case 'bookoff.masadora.jp':
            !!exRate && showBookoffCNY(exRate);
            break;
        case 'melonbooks.masadora.jp':
            fixMelonbooksR18Image();
            !!exRate && showMelonbooksCNY(exRate);
            break;
        case 'animate.masadora.jp':
            !!exRate && showAnimateCNY(exRate);
            break;
        case 'booth.masadora.jp':
            !!exRate && showBoothCNY(exRate);
            break;
        case 'movic.masadora.jp':
            !!exRate && showMovicCNY(exRate);
            break;
    }
})();
