// ==UserScript==
// @name         【学城】调整首页布局
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  try to take over the world!
// @author       李少杰
// @match        https://km.sankuai.com/*
// @grant        none
// ==/UserScript==

(function() {
    // 取消最小宽度限制
    var timeout = 5;
    function clearMinWidth() {
        var content = document.querySelector('#app > div');
        content.style.minWidth = '';
        console.log('!cleared km article min width!');
    }
    setTimeout(clearMinWidth, 1000);

    // 添加左中括号快捷键
    document.addEventListener("keydown", function(e) {
        if (e.target != document.body) {
            return;
        }
        if (!e.metaKey && e.key == '[') {
            var expand = document.querySelector("div.sidebar-control > div > svg");
            var evt = document.createEvent('MouseEvents');
            evt.initEvent('click', true, false);
            expand.dispatchEvent(evt);
            setTimeout(clearMinWidth, 100);
        }
    });

    // 修改首页布局
    let s = document.createElement('style');
    s.innerHTML = `
.ct-drawio.ct-image-border {
outline: 0px solid white;
}
.ct-index .index-content:last-child {
width: 50%;
max-width: initial;
transform: translateX(-100%);
}
.ct-index .index-content:first-child {
width: initial;
transform: translateX(100%);
}
.stared-container .sp-table-list-container .sp-table-list-body .sp-row-item.title {
font-weight: 400;
}
.recent-list .list-item {
margin-bottom: 54px;
}
.recent-list .list-item .list-info.date {
font-size: 20px;
}
`;
    document.head.appendChild(s);


    // 添加定位at你的位置
    let locStyle = document.createElement('style');
    const ANIM_DELAY = 900;
    locStyle.innerHTML = `
._locate_where_at_you {
transition: all ease .5s;
position: fixed;
right: 32px;
bottom: 140px;
width: 40px;
height: 40px;
padding: 7px;
}
._locate_tooltip {
position: fixed;
border: solid 2px red;
border-radius: 2px;
transition: all linear ${ANIM_DELAY}ms;
opacity: 0;
color: gray;
font-size: 80%;
}
`;
    let loc = document.createElement('div');
    loc.className = '_locate_where_at_you ant-back-top';
    loc.innerHTML = '<svg t="1555491214458" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1822" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M129.511765 479.910017a383.928013 383.928013 0 0 1 351.67806-350.654252V32.761857a31.994001 31.994001 0 0 1 63.988002 0v96.621884a383.928013 383.928013 0 0 1 349.694432 351.550084h97.261764a31.994001 31.994001 0 1 1 0 63.988002h-97.453728A384.05599 384.05599 0 0 1 544.154019 894.552271v97.453728a31.994001 31.994001 0 1 1-63.988002 0V894.552271A383.992001 383.992001 0 0 1 129.511765 543.898019H31.994049a31.994001 31.994001 0 1 1 0-63.988002h97.645692z m64.307942 0h30.458289a31.994001 31.994001 0 1 1 0 63.988002h-30.458289A320.003999 320.003999 0 0 0 480.166017 830.244329v-29.626445a31.994001 31.994001 0 0 1 63.988002 0v29.626445a320.067987 320.067987 0 0 0 286.282322-285.322502h-30.394301a31.994001 31.994001 0 1 1 0-63.988002h30.586265a319.940011 319.940011 0 0 0-285.450478-287.30613v30.074361a31.994001 31.994001 0 1 1-63.988002 0v-30.266325A319.684059 319.684059 0 0 0 193.883695 479.910017zM448.172016 511.904018a63.988002 63.988002 0 1 1 127.976004 0 63.988002 63.988002 0 0 1-127.976004 0z" p-id="1823" fill="#707070"></path></svg>';
    document.body.appendChild(loc);
    document.head.appendChild(locStyle);
    let currentLocating = -1;
    loc.addEventListener('click', () => {
        let ats = document.querySelectorAll('a.myself');
        if (ats.length === 0) {loc.style.opacity = 0; setTimeout(() => loc.style.opacity = 1, 2000)}
        currentLocating++;
        if (currentLocating > ats.length - 1) currentLocating = 0;
        let target = ats[currentLocating];
        target.scrollIntoViewIfNeeded();
        setTimeout(() => highlight(target, `${currentLocating+1} / ${ats.length}`), 100);
    });
    function highlight(el, content) {
        let bounds = el.getBoundingClientRect();
        let tip = document.createElement('div');
        tip.className = '_locate_tooltip';
        tip.style.left = bounds.left+'px';
        tip.style.top = bounds.top+'px';
        tip.style.width = bounds.width+'px';
        tip.style.height = bounds.height+'px';
        tip.style.transform = 'scale(8)';
        tip.textContent = content;
        document.body.appendChild(tip);
        const frameDelay = 20;
        setTimeout(() => {
            tip.style.transform = 'scale(3)';
            tip.style.opacity = 1;
            setTimeout(() => {
                tip.style.transform = 'scale(1)';
                tip.style.opacity = 0;
                setTimeout(() => document.body.removeChild(tip), ANIM_DELAY);
            }, ANIM_DELAY);
        }, frameDelay);

    }
})();