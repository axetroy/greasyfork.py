// ==UserScript==
// @name        Steam Comments ErrorProofing
// @namespace   steam
// @author      伟大鱼塘
// @description 防止留言被误删
// @include     https://steamcommunity.com/
// @match       https://steamcommunity.com/*
// @version     1.0.1
// ==/UserScript==

{
    const appendModal = fun => {
        const html = '<div id="del_modal" class="newmodal" style="position: fixed; z-index: 1000; width: 280px;left:50%;top:50%;transform: translate(-50%,-50%);">' +
            '<div class="newmodal_header_border">' +
            '<div class="newmodal_header">' +
            '<div data-action="close" class="newmodal_close close_modal"></div>' +
            '<div class="ellipsis">确认删除</div>' +
            '</div>' +
            '</div>' +
            '<div class="newmodal_content_border">' +
            '<div class="newmodal_content" style="text-align:center;">' +
            '<a class="btn_profile_action btn_medium" href="javascript:;" style="margin:0 10px;border-radius: 2px;color: #fff !important;padding: 1px;display: inline-block;text-decoration: none;cursor: pointer;border: 1px solid #212121;background: #373f4f;background: -webkit-linear-gradient( top, #7a8494 5%, #282f3d 95%);background: linear-gradient( to bottom, #7a8494 5%, #282f3d 95%);">' +
            '<span data-action="del" style="padding: 0 65px;border-radius: 2px;display: block;background: #2e394c;background: -webkit-linear-gradient( top, #33425a 5%, #282f3d 95%);background: linear-gradient( to bottom, #33425a 5%, #282f3d 95%);">是</span>' +
            '</a>' +
            '<a class="btn_profile_action btn_medium" href="javascript:;" style="margin:0 10px;border-radius: 2px;color: #fff !important;padding: 1px;display: inline-block;text-decoration: none;cursor: pointer;border: 1px solid #212121;background: #373f4f;background: -webkit-linear-gradient( top, #7a8494 5%, #282f3d 95%);background: linear-gradient( to bottom, #7a8494 5%, #282f3d 95%);">' +
            '<span data-action="close" style="padding: 0 65px;border-radius: 2px;display: block;background: #2e394c;background: -webkit-linear-gradient( top, #33425a 5%, #282f3d 95%);background: linear-gradient( to bottom, #33425a 5%, #282f3d 95%);">否</span>' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</div>';
        document.querySelector('body').insertAdjacentHTML('afterBegin', html);
        bindEvent(fun);
    }

    const bindEvent = fun => {
        const modal = document.querySelector('#del_modal');
        modal.addEventListener('click', (e) => {
            const t = e.target;
            if (t.dataset.action == 'del') {
                const eventFun = new Function(fun);
                eventFun();
            }
            document.querySelector('body').removeChild(modal);
        });
    }

    const resetClickEvent = () => {
        const del_nodeList = document.querySelectorAll('.actionlink');
        for (let el of del_nodeList) {
            const fun = el.href.substring(11);
            el.href = 'javascript:;'
            el.addEventListener('click', () => {
                appendModal(fun);
            });
        }
    }

    const obs = () => {
        const targetList = document.querySelectorAll('.commentthread_comments');
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                resetClickEvent();
            });
        });
        for (let el of targetList) {
            observer.observe(el, {
                childList: true,
                subtree: true
            });
        }
    }

    resetClickEvent();
    obs();
}
