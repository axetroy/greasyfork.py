const meta = (function () {
// ==UserScript==
// @name         多瑙影院去广告 & 增强
// @namespace    moe.jixun.dn-noad
// @version      1.84
// @description  多瑙网站视频与网站广告去除，以及其他增强功能。
// @author       Jixun Moe<https://jixun.moe/>
// @include      http://*.dnvod.eu/*
// @include      https://*.dnvod.eu/*
// @include      http://*.dnvod.tv/*
// @include      https://*.dnvod.tv/*
// @include      http://*.duonao.tv/*
// @include      https://*.duonao.tv/*
// @grant        none
// @compatible   Firefox  TamperMonkey
// @compatible   Chrome   TamperMonkey
// @compatible   Opera    ViolentMonkey
// @run-at       document-start
// ==/UserScript==
}).toString();

const DEBUG = true;

const icon_info = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAABiVBMVEUAA" +
  "AArW7gmTqctYL8nUq0qWbUzctUxassvZcQnUKomTqczctUxbM4mTqYlTKQqWbUybtAtYcAoUqwmTaUlTKQ6ets6eto2eN0l" +
  "S6M1dts1dtr///80ZdA0ZtE0adM3btY2bNUnZdQkYNIgWs8vb9oratdDi+g4fOA0dt05dNk4cdg+bNIiXdFMl+5Ikeo+heQ" +
  "9guM2ed4wcds1a9QmXM4dV84cVMwsXLva4/dXpPNOmu9Gj+pBh+ZeluU6fuJ9m94ydNw1ctoycNotbdkybtcpaNZKdNJoiN" +
  "ExV60mT6lWj+E9d9k5atEsZNA/aMUrWLN1vvqHxfd6vPZYp/ZTofJSn/Jnpu1Kk+xloulIjOdGiOJMguBrjtpIedpih9hsj" +
  "tdZgNdmidUmY9RihtMlYtMzas4wXsssW8sZUctSeMowackvZ8dYesY0YMU3XLCNzPtbq/d9uPFRnvF6tPBVmOpTlulUiuJ+" +
  "nN9QgNt0k9pyktowZ9M/atEYUMouYsEsX747Y70rWbguWbNBsoHBAAAAG3RSTlMAICC/v2Ag7+/v77+/v7+fgICAgGDv75+" +
  "fYGBU+R17AAABsUlEQVQoz73NZVvCYBTGccrujsEYDjZ0IaMm3V12d3d36yf3DJ5dgPqa/9vfdZ+jqFGqnrbmVKpJ0636D9" +
  "uTp4nnja2do/y3Rvlbe5OJwHqc0WqzTDyeL9RV6+B5YBVMq1vT4TjOvIodVdvzwKaEuglsAsdtNiIrVuxVSaQ4hmEEQej1e" +
  "kIs/29PrJYUhzXYGLSnLo8fmJLaiEew0WLv8rzndB0pnI1Go+FoOBQK7XUhbkvEgUFfMMgUMRrDVmtIL19vfmIkzbHsLrDR" +
  "GjSbBUFYa0Sc2oDTOZJkRwzAQbNA034/vXIi85ZWZ3c6QGPAAu23jEPpY8RNO1nnoYNkt2MRYEAvRVFLvgbEmqODN6eDHDG" +
  "YjMAWL+Xhef7W14q4+/Ps0Emyu7GIFdhL8Quc2z2f7kSsKuSlMdwOAlM8556bdV1l6hUozdl+6bbEngX3rGtmerFFIacs7N" +
  "uLbJaYu3ZdTk71wViu7uvADgyvIW5uZvJieUhRUYcIDGva4vVwrump5QEE8l60G0xh4KW7+ZvF/uGyoP/qjxyRWbn3+dKZF" +
  "vj7J2WXuvHkuKG1E7Am/QBa713U657dWwAAAABJRU5ErkJggg==";

const SCRIPT_NAME = meta.match(/@name \s+(.+)/)[1];
const SCRIPT_VERSION = meta.match(/@version \s+(.+)/)[1];

const MOCKED_UA = "Mozilla/5.0 (iPad; CPU OS 9_3_3 like Mac OS X) AppleWebKit/602.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1";

const _reqH = XMLHttpRequest.prototype.setRequestHeader;
const _send = XMLHttpRequest.prototype.send;
const _open = XMLHttpRequest.prototype.open;

const blacklist = [
    "/template/popup.html",
    "/template/slider.html",
];

function check(url, rule) {
    if (typeof rule === "string") {
        return url.toLowerCase().includes(rule.toLowerCase());
    } else if (typeof rule === "function") {
        return rule(url);
    } else if (rule instanceof RegExp) {
        return rule.test(url);
    }

    if (DEBUG) console.error("未知规则：", rule);
}

XMLHttpRequest.prototype.send = function (payload) {
    if (typeof payload === "string") {
        if (payload.includes("action=PublicRedirect")) {
            return ;
        }
    }

    return _send.apply(this, arguments);
};

XMLHttpRequest.prototype.open = function (method, url) {
    const xhr = this;
    const strUrl = String(url);
    const block = blacklist.reduce(function (block, rule) {
        return block || check(strUrl, rule);
    }, false);
    console.debug("OPEN(%s, %s) blocked: (%s)", method, url, block);

    if (block) {
        this.send = function () {
            setTimeout(function () {
                ctx.onerror.call(ctx);
            }, 300);
        };
    } else {
        const result = _open.apply(this, arguments);
        // Firefox 43+ 支持修改 UA
        if (url.includes("/Movie/GetResource.ashx")) {
            _reqH.call(this, "User-Agent", MOCKED_UA);
        }
        return result;
    }
};

const w = window;

const each = Array.prototype.forEach;

function remove (el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
}

function h (tag, attr = null, child = null) {
    const element = document.createElement(tag);
    if (attr) {
        Object.keys(attr).forEach(function (key) {
            element[key] = attr[key];
        });
    }
    if (child) {
        const children = child instanceof Array ? child : [child];
        children.forEach(child => {
            if (typeof child === "string") {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        });
    }
    return element;
}

function playNextEp () {
    let query = location.search.replace(/&.+/, '');
    let currentEp = document.querySelector('.bfan-n>a[href*="' + query + '"]');
    if (!currentEp) return ; // 未找到当前播放剧集

    let nextEp = currentEp.parentNode.parentNode.parentNode.nextElementSibling;
    if (!nextEp) return ; // 未找到下一播放剧集

    nextEp = nextEp.querySelector('a');
    if (nextEp) nextEp.click(); // 切换到下一剧集
}

// 更新播放器配置
function updateConfig (config) {
    let p = config;
    p.l = p.r = p.d = p.u = p.pub_link = p.pub_surl = p.z = p.t = p.te = '';
    p.e = 6;

    let q = config.mobile;
    q.sl = q.sr = q.ste = '';
}

function removeAd() {
    var counter = 100;
    function skipAds() {
        if (DEBUG) console.info('发送跳过广告事件...');
        document.body.dispatchEvent(new CustomEvent('filterAds'));
    }

    function waitForAds() {
        if (window.loadedHandler) {
            let loaded = window.loadedHandler;
            window.loadedHandler = function () {
                loaded();
                setTimeout(skipAds, 50);
            };
            setTimeout(skipAds, 50);
        } else if (counter --> 0) {
            setTimeout(waitForAds, 200);
        } else {
            if (DEBUG) console.warn('等待广告加载代码失败。');
        }
    }
    waitForAds();
}

function removePlayerLogo () {
    // 改成内置水印也是挺恶心的。
    let ckstyle = w.ckstyle();
    ckstyle.logo = 'null';
    ckstyle.advmarquee = '';
    w.ckstyle = function () { return ckstyle; };
}


// Player AD removal.
// 劫持播放器的广告参数
var bakCallback;
var jQuery;

function performHook () {
    let theCallback = w._vp.theCallBack;
    let myCallback  = w._vp.myCallBack ;
    w._vp.theCallBack = function (v) {
        callbackHook(v);
        return theCallback(v);
    };
    w._vp.myCallBack = function (v) {
        callbackHook(v);
        return myCallback(v);
    };
}

function callbackHook(v) {
    updateConfig(v.container);
    var dl_btn = document.querySelector('a[href="#vidDownload"]');
    if (!dl_btn) {
        console.warn("未找到下载按钮。");
        return ;
    }
    if (v.http === null) {
        console.warn("缺少插件伪装 UA，无法获取下载地址。");
        dl_btn.addEventListener("click", function (e) {
            if (confirm("缺少插件伪装浏览器环境，是否阅读博客文章获取详细？")) {
                e.preventDefault();
                window.open("https://s.jixun.moe/duonao-ua");
            }
        });
        return ;
    }
    try {
        var dl_url = w.Decrypt(v.http.provider);
        dl_btn.target = '_blank';
        dl_btn.href = dl_url;
    } catch (error) {
        console.error(error);
    }
}

if (w.$) {
    console.info('late_hook');
    jQuery = w.$;
    jQuery(performHook);
} else {
    console.info('good hook');
    Object.defineProperty(w, '$', {
        get: function () { return jQuery; },
        set: function ($) {
            jQuery = $;
            let ready = $.fn.ready;
            $.fn.ready = function (fn) {
                if (fn.toString().indexOf('PlayVideo') != -1) {
                    performHook();
                }
                return ready.apply(this, arguments);
            };
        }
    });
}

function smartNav () {
    // 智能隐藏导航条
    const nav = document.querySelector(".fdtop");
    const isPlayerPage = document.getElementsByClassName("bfq").length === 1;
    if (isPlayerPage && nav) {
        document.body.classList.add("player-page");

        let lastY = window.scrollY;
        let mouseY = 0;
        const canHide = () => mouseY > 80;

        window.addEventListener("scroll", function () {
            const y = window.scrollY;
            if (canHide() && y > lastY) {
                // 向下滚动
                nav.classList.add("hide");
            } else {
                // 向上滚动
                nav.classList.remove("hide");
            }
            lastY = y;
        });
        document.body.addEventListener("mousemove", function (e) {
            mouseY = e.clientY;

            if (canHide()) {
                nav.classList.add("hide");
            } else {
                nav.classList.remove("hide");
            }
        });

        setInterval(function () {
            if (canHide()) {
                nav.classList.add("hide");
            }
        }, 5000);
    }
}

function addScriptButton () {
    const blockItems = ["VIP", "广告"];
    const blocks = document.evaluate("//div[@class='fdss']/table/tbody/tr", document, null, XPathResult.ANY_TYPE, null);
    const row = blocks.iterateNext();
    if (!row) return ;

    const toRemove = [];
    each.call(row.children, function (child) {
        console.info(child, child.textContent.trim());
        if (blockItems.includes(child.textContent.trim())) {
            toRemove.push(child);
        }
    });
    each.call(toRemove, remove);

    const scriptInfoPanel = h("div", {
        className: "script-info-container hide",
        onclick: () => scriptInfoPanel.classList.add("hide"),
    }, [
        h("div", {
            className: "script-info",
            onclick: (e) => e.stopPropagation(),
        }, [
            h("a", {
                className: "close-btn",
                href: `javascript:;`,
                onclick: () => scriptInfoPanel.classList.add("hide"),
            }, "[x]"),
            h("h2", { className: "title" }, `${SCRIPT_NAME} v${SCRIPT_VERSION}`),
            h("div", { className: "script-info-content" }, [
                h("p", null, [
                    "脚本开发：",
                    h("a", {
                        href: "https://jixun.moe/",
                        target: "_blank",
                    }, "Jixun"),
                ]),
                h("p", null, [
                    "项目首页：",
                    h("a", {
                        href: "https://s.jixun.moe/enhanced-dnvod",
                        target: "_blank",
                    }, "季寻日志"),
                    "，",
                    "发布于：",
                    h("a", {
                        href: "https://greasyfork.org/scripts/27013",
                        target: "_blank",
                    }, "GreasyFork.org"),
                    "。",
                ]),
                h("p", null, [
                    "你也可以通过",
                    h("a", {
                        href: "https://jixun.paypal.me/",
                        target: "_blank",
                    }, " Paypal 赞助 "),
                    "支持我。",
                ]),
                h("h2", null, "增强功能"),
                h("ul", null, [
                    h("li", null, "去除页面广告 - 主要清理位于首页的横幅广告"),
                    h("li", null, "去除播放器广告 - 看片再也不用等啦"),
                    h("li", null, "自动下一集 - 自动切换到下一集"),
                    h("li", null, "影院模式 - 扩充播放器、自动隐藏导航栏"),
                ]),
                h("h2", null, [
                    "脚本",
                    h("b", null, "不支援"),
                    "的功能",
                ]),
                h("ul", null, [
                    h("li", null, "高清片源破解"),
                    h("li", null, "抹除片源内置的水印"),
                ]),
                h("h2", null, "致谢"),
                h("p", null, "感谢各位的反馈，使脚本更完善："),
                h("ul", null, [
                    h("li", null, "heluq"),
                    h("li", null, "金铁"),
                    h("li", null, "maymayw"),
                    h("li", null, "amerson"),
                ]),
            ])
        ]),
    ]);

    const scriptButton = h("td", null, [
        h("a", {
            className: "fa fa-info",
            href: "https://s.jixun.moe/userscript-dnvod",
            target: "_blank",
            title: `关于：${SCRIPT_NAME} v${SCRIPT_VERSION}`,
            onclick: () => scriptInfoPanel.classList.toggle("hide"),
        }, `关于脚本`),
    ]);

    const styleContent = `
@import url('https://fonts.googleapis.com/css?family=Alegreya');

.fa {
    margin-left: 4px;
    padding-right: 12px;
}

.fa-info {
    background: url("${icon_info}") no-repeat 0 0;
}

.script-info-container {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.3);
    opacity: 1;
    transition: top 0s 0.3s, opacity 0.3s 0s;
}
.script-info-container,
.script-info-container a {
    font: 14px Alegreya, "Noto Sans CJK SC", "Microsoft YaHei UI", serif;
}
.script-info-container.hide {
    top: -100vh;
    opacity: 0;
}

.script-info-container > .script-info {
    position: relative;
    line-height: 1.5;
    background: white;
    max-width: 30rem;
    padding: 1rem 0;
    border-radius: 1em;
    border: 1px solid #aaa;
    box-shadow: 3px 3px 5px rgba(0,0,0,0.3);
}
.script-info >
.script-info-content {
    max-height: 20rem;
    padding: 0.5rem 1rem;
    overflow: auto;
}

.script-info .close-btn {
    padding: 0.5em;
    position: absolute;
    right: 0;
    top: 0;
    font-family: monospace;
    line-height: 1;
}

.script-info h2 {
    margin-top: 1em;
}
.script-info .title {
    text-align: center;
    margin: 0 1rem;
    padding-bottom: .25em;
    border-bottom: 1px dashed #ccc;
}

.script-info ul {
    padding-left: 1.5em;
}
.script-info ul>li {
    list-style-type: square;
}
.script-info a {
    color: #3f7ff1;
}
`;

    row.insertBefore(scriptButton, row.firstChild);
    const nav = document.querySelector(".fdtop");
    nav.appendChild(scriptInfoPanel);

    const style = document.createElement("style");
    style.textContent = styleContent;
    document.head.appendChild(style);
}

addEventListener('DOMContentLoaded', function() {
    'use strict';

    const ads = window.dnpub ? `${window.dnpub.element}` : "";
    const staticAds = `
a[style*='visibility'],
.ggwdetail-non,
.i-cp > .float-right,
.button-vip > .button-toggle,
a[href*="/Adult/"],
li:empty,

app-video-user-data-bar + .d-block,
vg-pause-ads,
.player-side a
`;

    // 去广告与播放器调整
    var style = document.createElement('style');
    style.textContent = `
${ads} { display: none !important; }
${staticAds} { display: none !important; }
.ggw-r.trailer { margin-top: -258px; }
.ggw-r.trailer iframe { height: 210px; }
.bfq { background: black; margin-top: 0; }
.bfq-l { width: 100%; }
.bfq, .bfq-l { height: auto !important; padding: 0 !important; }
#video > #a1 { margin: auto; text-align: center; }
#bfy_title { padding: 0.3rem 1rem; height: auto;  }
.button-vip { margin-top: 0; }
body.player-page { padding-top: 45px; }
#video { margin-top: 0; }
iframe+.i-cp .ggw-r { width: auto; }
.fdtop { top: 0px; transition: top 0.3s; }
.fdtop.hide { top: -48px; }

.video-player {
  width: 80% !important;
  width: calc(100% - 20rem) !important;
  height: 100% !important;
}
.video-player .video-box {
  height: 100% !important;
}
`;
    document.body.appendChild(style);

    // 删除广告元素
    const trap = document.getElementById("a1");
    if (trap) trap.className = "";
    if (ads) each.call(document.querySelectorAll(ads), remove);
    if (staticAds) each.call(document.querySelectorAll(staticAds), remove);

    // 检测是否需要移除播放器 Logo
    if (w.ckstyle) {
        console.info('移除 Logo');
        try {
            removePlayerLogo();
        } catch (err) {
            console.info('移除 Logo 失败: ', err);
        }
    }

    // 检测是否需要实现播放下一集功能
    if (w.playerstop) {
        console.info('注册下一集事件成功。');
        window.playerstop = playNextEp;
    }

    smartNav();
    addScriptButton();
    if (window.jQuery) jQuery(window).resize();
});