// ==UserScript==
// @name         ICONFont图标页批量加入购物车
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  ICONFont图标页批量加入购物车，免除手动一个一个点的麻烦
// @author       loli@lolikon.cn
// @match        http://www.iconfont.cn/collections/*
// @match        http://iconfont.cn/collections/*
// @run-at	     document-end
// @grant        none
// ==/UserScript==
(function () {
    var div = document.querySelector('body');
    var observer = new MutationObserver(function (mutations) {
        mutations.some(function (mutation) {
            if (mutation.target.querySelector('.block-radius-btn-group')) {
                observer.disconnect();
                var box = document.querySelector('.block-radius-btn-group');
                box.innerHTML += `<span class="iconfont radius-btn radius-btn-share"><span class="radius-btn-share-inner">添加</span></span>`;
                var icons = document.querySelectorAll('.icon-gouwuche1');
                return box.onclick = function () {
                    auto_click(0, icons);
                }
            }
        });
    });
    var config = {
        childList: true,
    };

    observer.observe(div, config);
    var auto_click = function (i, ele) {
            Promise.all([].map.call(ele,(v,j)=>{return new Promise(res=>{
                  v.click();
                res('success');
            })})).then(()=>{
                setTimeout(()=>{
                     alert("success");
                },20)
            })
    };
})();