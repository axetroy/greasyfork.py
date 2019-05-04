// ==UserScript==
// @name         微信文章编辑器查看源码
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  在微信图文编辑器里面加入直接查看和编辑HTML的功能
// @author       Rika
// @match        https://mp.weixin.qq.com/cgi-bin/appmsg*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let fixed_frame = '<textarea style="position: fixed;left:0;bottom: 0;z-index: 1000;" id="code-area"></textarea>'
    $('body').append($(fixed_frame))
    fixed_frame = $('#code-area')
    let last_refresh = new Date(), last_edit = new Date()
    fixed_frame[0].oninput = () => {
        last_edit = new Date()
    }
    setInterval(() => {
        try {
            if (last_edit > last_refresh)
                UE.instants["ueditorInstant0"].setContent(fixed_frame.val())
            else
                fixed_frame.val(UE.instants["ueditorInstant0"].getContent())
            last_refresh = new Date()
        } catch (e) {
        }
    }, 500)
})();
