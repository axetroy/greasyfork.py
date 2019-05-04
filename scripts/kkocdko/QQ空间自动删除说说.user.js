// ==UserScript==
// @name         QQ空间自动删除说说
// @description  一键删除QQ空间所有说说
// @namespace    https://greasyfork.org/users/197529
// @version      0.7.1
// @author       kkocdko
// @include      *://user.qzone.qq.com/*
// @noframes
// ==/UserScript==

function addButton(showText, callBack) {
    let button = document.createElement('button');
    button.style = 'float:left;margin:5px 10px 0 0;padding:0 9px;height:31px;border:0;background:#eee;';
    button.addEventListener('click', callBack);
    button.innerText = showText;
    let container = document.querySelector('#QZ_Toolbar_Container>.top-fix-wrap');
    container.insertBefore(button, container.firstElementChild);
}

addButton('Delete all', async () => {
    let frameDocument = document.querySelector('.app_canvas_frame').contentWindow.document;
    while (true) {
        frameDocument.querySelectorAll('.del_btn').forEach(item => item.click());
        await sleep(1000);
        document.querySelectorAll('.qz_dialog_layer_sub').forEach(item => item.click());
        await sleep(1000);
        nextPage();
        await sleep(1000);
    }

    function nextPage() {
        let aTags = frameDocument.querySelector('.mod_pagenav_main>a');
        for (let item of aTags) {
            if (item.innerText == '下一页') {
                item.click();
                break;
            }
        }
    }

    function sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
});
