// ==UserScript==
// @name           auto show more for YouTube
// @name:ja        YouTubeの「もっと見る」ボタンを自動で押す
// @description    this plugin will press "show more" button when it displayed by scrolling.
// @description:ja YouTube.comの「もっと見る」ボタンが、スクロールによって画面に表示された瞬間、自動で押されます。
// @namespace      https://twitter.com/sititou70
// @license        MIT
// @include        /https*:\/\/www\.youtube\.com\/.*/
// @version        2.2.0
// @grant          none
// ==/UserScript==

//settings
let scroll_event_interval = 200;
const adjust_scroll_px = 0;
const target_infos = [
    {
        name: "comment reply",
        selector: "ytd-expander.ytd-comment-replies-renderer > paper-button#more",
        click_times: 1,
    },
    {
        name: "more comment replies",
        selector: "yt-next-continuation.ytd-comment-replies-renderer > paper-button",
        click_times: Infinity,
    },
    {
        name: "comment more",
        selector: "ytd-expander.ytd-comment-renderer > paper-button#more",
        click_times: 1,
    },
    {
        name: "related videos",
        selector: "yt-next-continuation.ytd-watch-next-secondary-results-renderer > paper-button",
        click_times: 1,
    },
    {
        name: "video info",
        selector: "ytd-expander.style-scope.ytd-video-secondary-info-renderer > paper-button#more",
        click_times: 1,
    },
];

//global variables
let button_caches = {};
const initButtonCaches = () =>
    target_infos.forEach(x => {
        button_caches[x.name] = [];
    });
initButtonCaches();

//utils
const user_agent = window.navigator.userAgent.toLowerCase();
const fireClickEvent = (elem) => {
    if( user_agent.match(/(msie|MSIE)/) || user_agent.match(/(T|t)rident/) ) {
        elem.fireEvent("onclick");
    } else {
        const event = document.createEvent("MouseEvents");
        event.initEvent("click", true, true);
        elem.dispatchEvent(event);
    }
};

//events
const scrollHandler = () =>
    target_infos.forEach(target_info => {
        document.querySelectorAll(target_info.selector).forEach(elem => {
            let button_cahce = button_caches[target_info.name].find(y => y.elem === elem);

            if(button_cahce === undefined){
                button_cahce = {
                    elem,
                    click_times: 0,
                };
                button_caches[target_info.name].push(button_cahce);
            }

            const click_times_flg = button_cahce.click_times < target_info.click_times;
            const button_position_flg = elem.getBoundingClientRect().y - window.innerHeight + adjust_scroll_px < 0;
            if(click_times_flg && button_position_flg){
                fireClickEvent(elem);
                button_cahce.click_times++;

                //highlight clicked button for debugging
                //x.style.border = "1px solid #f00";
            }
        });
    });

let waiting_for_scroll_event_interval = false;
document.addEventListener("scroll", () => {
    if(waiting_for_scroll_event_interval)return;
    waiting_for_scroll_event_interval = true;
    setTimeout(() => {
        waiting_for_scroll_event_interval = false;
    }, scroll_event_interval);

    scrollHandler();
});

document.addEventListener("click", function(e){
    let target = e.target;
    while(target !== document.body){
        if(target.tagName === "A"){
            initButtonCaches();
            return;
        }
        target = target.parentElement;
    }
});
