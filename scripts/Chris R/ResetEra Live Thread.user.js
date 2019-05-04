// ==UserScript==
// @name ResetEra Live Thread
// @description Automatically update a thread with new posts.
// @version 2.6
// @icon icon32.png
// @match https://*.resetera.com/threads/*
// @grant none
// @namespace ResetEra
// ==/UserScript==

// JSLint edition 2018-11-13
/*jslint browser, long */
/*global window, DOMParser, CustomEvent */

function liveThreadUpdate(url, edit) {
    "use strict";

    const update = {
        edit: false,
        next: false,
        url: location.href
    };

    if (url.startsWith(location.href)) {
        update.url = url;
    }

    if (edit === true) {
        update.edit = true;
    }

    const next_page = document.querySelector(".pageNav-jump--next");

    if (next_page) {
        update.next = true;
        update.url = next_page.href;
    }

    function request(url) {
        return new Promise(function (resolve, reject) {
            const req = new XMLHttpRequest();
            req.addEventListener("error", reject);
            req.addEventListener("timeout", reject);
            req.addEventListener("load", function (e) {
                if (e.target.status >= 200 && e.target.status <= 299) {
                    return resolve(e.target.response);
                }
                return reject();
            });
            req.open("GET", url, true);
            req.responseType = "document";
            req.timeout = 10000;
            req.send(null);
        });
    }

    function add_page_events(post) {
        try {
            // embeds
            Array.from(post.querySelectorAll("iframe[data-s9e-lazyload-src]")).forEach(function (el) {
                el.setAttribute("src", el.getAttribute("data-s9e-lazyload-src"));
                el.setAttribute("onload", `var c=new MessageChannel;c.port1.onmessage=function(e){style.height=e.data+'px'};contentWindow.postMessage('s9e:init','https://s9e.github.io',[c.port2])`);
            });
            // quotes
            Array.from(post.querySelectorAll(".bbCodeBlock--expandable")).forEach((el) => el.classList.add("is-expandable"));
        } catch (ignore) {}
        return post;
    }

    function edit_post(new_post) {
        function message_text(message) {
            const node = message.cloneNode(true);
            Array.from(node.querySelectorAll("iframe, img"), (el) => el.replaceWith(el.src));
            return node.textContent.split("\n").map((t) => t.trim()).filter((t) => t !== "").join("\n");
        }
        const cur_post = document.getElementById(new_post.id);
        if (cur_post && update.edit === true && update.next === false) {
            try {
                const cur_message = cur_post.querySelector(".message-content");
                const new_message = new_post.querySelector(".message-content");
                if (cur_message.isEqualNode(new_message) || message_text(cur_message) === message_text(new_message)) {
                    return false;
                }
                cur_message.replaceWith(add_page_events(new_message));
                return true;
            } catch (ignore) {}
        }
        return false;
    }

    function update_page(response) {
        const posts = Array.from(response.querySelectorAll(".message--post"));
        const new_posts = posts.filter((el) => document.getElementById(el.id) === null).map((el) => add_page_events(el));
        const edited_posts = posts.filter((el) => edit_post(el));
        if (new_posts.length) {
            const fragment = document.createDocumentFragment();
            new_posts.forEach((el) => fragment.appendChild(el));
            document.querySelector(".message--post").parentNode.appendChild(fragment);
        }
        const page_nav = response.querySelector(".pageNav");
        if (page_nav) {
            const current_page_nav = Array.from(document.querySelectorAll(".pageNav"));
            if (current_page_nav.length) {
                current_page_nav.forEach((el) => el.replaceWith(page_nav.cloneNode(true)));
            } else {
                const page_nav_head = response.querySelector(".block--messages .block-outer:first-of-type");
                const page_nav_foot = response.querySelector(".block--messages .block-outer--after");
                const current_page_nav_head = document.querySelector(".block--messages .block-outer:first-of-type");
                const current_page_nav_foot = document.querySelector(".block--messages .block-outer--after");
                if (page_nav_head && current_page_nav_head) {
                    current_page_nav_head.replaceWith(page_nav_head);
                }
                if (page_nav_foot && current_page_nav_foot) {
                    current_page_nav_foot.replaceWith(page_nav_foot);
                }
            }
        }
        const page_number = (function () {
            try {
                const current_page = parseInt(response.querySelector(".pageNav-page--current").textContent, 10);
                if (Number.isInteger(current_page)) {
                    return current_page;
                }
            } catch (ignore) {}
        }());
        const update_info = {
            edited_posts: edited_posts.map((el) => el.id),
            new_posts: new_posts.map((el) => el.id),
            next_page: update.next,
            page_number: page_number,
            page_title: response.title,
            page_url: update.url
        };
        try {
            document.dispatchEvent(new CustomEvent("LiveThreadUpdate", {detail: update_info}));
        } catch (ignore) {}
        return update_info;
    }

    return new Promise(function (resolve, reject) {
        request(update.url).then(update_page).then(resolve).catch(reject);
    });
}

(function liveThreadControl() {
    "use strict";

    Object.defineProperty(document.body, "livescroll", {
        enumerable: false,
        configurable: false,
        writable: false,
        value: {
            title: document.title,
            url: location.href
        }
    });

    const timer = {
        active: false,
        pending: false,
        timeout: null,
        url: location.href
    };

    const options = {
        auto: [],
        delay: 60,
        edit: true,
        scroll: false
    };

    const thread_id = (function () {
        try {
            return parseInt(location.href.match(/\/threads\/.*?(?=\d+\/)(\d+)\//)[1], 10);
        } catch (ignore) {}
    }());

    const theme = (function () {
        try {
            const background = window.getComputedStyle(document.documentElement, null).getPropertyValue("background-color");
            // https://www.w3.org/TR/AERT/#color-contrast
            const rgb = background.match(/(\d+),\s(\d+),\s(\d+)/);
            const r = parseInt(rgb[0], 10) * 299;
            const g = parseInt(rgb[1], 10) * 587;
            const b = parseInt(rgb[2], 10) * 114;
            if (Math.floor((r + g + b) / 1000) <= 127) {
                return "dark";
            }
        } catch (ignore) {}
        return "light";
    }());

    ///////////////////////////////////////////////////////////////////////////
    // ui
    ///////////////////////////////////////////////////////////////////////////

    const ui_css = `.live-theme-light{--live-theme-background:#f9f9f9;--live-theme-surface-1:#fff;--live-theme-surface-2:#f1f0f1;--live-theme-surface-3:#e0e0e0;--live-theme-on-surface:#333;--live-theme-primary-1:#8050bf;--live-theme-primary-2:#7348ab;--live-theme-primary-3:#653f96;--live-theme-on-primary:#fff;--live-theme-shadow-button:1px 2px 2px 0 rgba(0,0,0,0.25);--live-theme-shadow-container:0 20px 20px 0 rgba(0,0,0,0.08);}.live-theme-dark{--live-theme-background:#1c1b1b;--live-theme-surface-1:#232323;--live-theme-surface-2:#2a2a2c;--live-theme-surface-3:#343436;--live-theme-on-surface:#e2e2e2;--live-theme-primary-1:#372056;--live-theme-primary-2:#45286b;--live-theme-primary-3:#522f80;--live-theme-on-primary:#e2e2e2;--live-theme-shadow-button:1px 2px 2px 0 rgba(0,0,0,0.2);--live-theme-shadow-container:0 20px 20px 0 rgba(0,0,0,0.3);}.live-button{--live-button-background:var(--live-theme-primary-1);--live-button-text:var(--live-theme-on-primary);--live-button-focus-background:var(--live-theme-primary-2);--live-button-hover-background:var(--live-theme-primary-3);--live-button-active-background:var(--live-theme-primary-3);align-items:center;background-color:var(--live-button-background);border:none;border-radius:99em;box-sizing:border-box;color:var(--live-button-text);cursor:pointer;display:inline-flex;font-family:inherit;font-size:inherit;height:2em;justify-content:center;line-height:1;margin:0;outline:none;padding:0 1em;}.live-button__icon{fill:currentColor;height:1em;margin-left:.5em;order:1;pointer-events:none;width:auto;}.live-button::-moz-focus-inner{border:none;}.live-button:focus{background-color:var(--live-button-focus-background);}.live-button:hover{background-color:var(--live-button-hover-background);}.live-button:active{background-color:var(--live-button-active-background);transform:translateY(1px);}.live-button--control{border-radius:.25em;box-shadow:var(--live-theme-shadow-button);height:2.8em;margin:0 .25em;width:8em;}.live-button--toggle{--live-button-background:var(--live-theme-surface-1);--live-button-text:var(--live-theme-on-surface);--live-button-focus-background:var(--live-theme-surface-2);--live-button-hover-background:var(--live-theme-surface-3);--live-button-active-background:var(--live-theme-surface-3);box-shadow:var(--live-theme-shadow-button);height:2.5em;}.live-button--toggle .live-button__icon{height:1.5em;margin:0 .5em 0 -.5em;order:-1;}@keyframes live-spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}.live-button--toggle.is-active{--live-button-background:var(--live-theme-primary-1);--live-button-text:var(--live-theme-on-primary);--live-button-focus-background:var(--live-theme-primary-2);--live-button-hover-background:var(--live-theme-primary-3);--live-button-active-background:var(--live-theme-primary-3);}.live-button--toggle.is-active .live-button__icon{animation:4s linear infinite live-spin;}.live-button--settings{--live-button-background:var(--live-theme-surface-1);--live-button-text:var(--live-theme-on-surface);--live-button-focus-background:var(--live-theme-surface-2);--live-button-hover-background:var(--live-theme-surface-3);--live-button-active-background:var(--live-theme-surface-3);}.live-button--settings .live-button__icon{height:.75em;transition:transform 120ms linear;}.live-button--settings.is-active .live-button__icon{transform:rotate(180deg);}.live-checkbox{align-items:center;cursor:pointer;display:inline-flex;position:relative;}.live-checkbox::before{bottom:0;content:"";left:0;overflow:hidden;position:absolute;right:0;top:0;white-space:nowrap;z-index:1;}.live-checkbox__input{left:0;margin:0;opacity:0;position:absolute;top:0;}.live-checkbox__label{padding:0 .5em;z-index:2;}.live-checkbox__label--off{display:inline;}.live-checkbox__label--on{display:none;}.live-checkbox__switch{--live-checkbox__switch-background:var(--live-theme-primary-1);--live-checkbox__switch-thumb:var(--live-theme-on-primary);--live-checkbox__switch-focus-background:var(--live-theme-primary-2);--live-checkbox__switch-hover-background:var(--live-theme-primary-3);--live-checkbox__switch-active-background:var(--live-theme-primary-3);background-color:var(--live-checkbox__switch-background);border-radius:99em;display:inline-block;height:calc(2em - 8px);outline:none;position:relative;width:calc(4em - 8px);z-index:2;}.live-checkbox__switch::before{background-color:var(--live-checkbox__switch-thumb);border-radius:100%;content:"";display:block;height:calc(2em - 16px);left:4px;position:absolute;top:4px;transition:transform 120ms linear;width:calc(2em - 16px);}.live-checkbox__input:focus ~ .live-checkbox__switch{background-color:var(--live-checkbox__switch-focus-background);}.live-checkbox__switch:hover,.live-checkbox__input:focus ~ .live-checkbox__switch:hover{background-color:var(--live-checkbox__switch-hover-background);}.live-checkbox__switch:active,.live-checkbox__input:active ~ .live-checkbox__switch,.live-checkbox__input:active ~ .live-checkbox__switch:hover{background-color:var(--live-checkbox__switch-active-background);transform:translateY(1px);}.live-checkbox__input:checked ~ .live-checkbox__label--off{display:none;}.live-checkbox__input:checked ~ .live-checkbox__label--on{display:inline;}.live-checkbox__input:checked ~ .live-checkbox__switch{filter:none;}.live-checkbox__input:checked ~ .live-checkbox__switch::before{transform:translateX(2em);}.live-select{align-items:center;display:inline-flex;position:relative;}.live-select__icon{display:inline-block;fill:currentColor;height:.75em;pointer-events:none;position:absolute;right:1em;width:auto;}.live-select__input{--live-select__input-background:var(--live-theme-surface-1);--live-select__input-border:var(--live-theme-on-surface);--live-select__input-text:var(--live-theme-on-surface);--live-select__input-focus-background:var(--live-theme-surface-2);--live-select__input-hover-background:var(--live-theme-surface-2);-moz-appearance:none;-webkit-appearance:none;appearance:none;background:var(--live-select__input-background);border:2px solid var(--live-select__input-border);box-sizing:border-box;color:var(--live-select__input-text);cursor:pointer;flex:1;font-family:inherit;font-size:inherit;height:2em;line-height:1;margin:0;outline:none;padding:0 4em 0 .25em;}@-moz-document url-prefix(){.live-select__input{padding-left:0;}}.live-select__input:focus{background-color:var(--live-select__input-focus-background);}.live-select__input:hover{background-color:var(--live-select__input-hover-background);}.live-timer{display:flex;flex-direction:column;font-size:1em;line-height:1;-webkit-user-select:none;user-select:none;}.live-timer__toggle{padding:.5em 0;}@media (max-width:480px){.live-timer__toggle{margin:0 auto;}}.live-timer__panel{--live-timer__panel-background:var(--live-theme-surface-1);--live-timer__panel-text:var(--live-theme-on-surface);background-color:var(--live-timer__panel-background);border-radius:6px;box-shadow:var(--live-theme-shadow-container);color:var(--live-timer__panel-text);margin:1em auto;width:24em;}.live-timer__panel.is-hidden{display:none;}.live-control{align-items:center;display:flex;flex-direction:column;padding:.5em;}.live-control__message{padding:1em;}.live-control__actions{display:flex;padding:.5em;}.live-settings{display:flex;flex-direction:column;}.live-settings__toggle{align-self:center;margin-bottom:1em;}.live-settings__panel{display:flex;flex-direction:column;margin:0 1em 1em 1em;}.live-settings__panel.is-hidden{display:none;}.live-option{--live-option-background:var(--live-theme-surface-2);background:var(--live-option-background);display:flex;flex-direction:column;margin-bottom:2px;padding:1em;}.live-option__description{order:-1;line-height:1.5;margin-bottom:.5em;}.live-option__input{order:1;}.live-feedback{--live-feedback-background:var(--live-theme-surface-3);background-color:var(--live-feedback-background);padding:1em;}.live-feedback a{font-weight:500;text-decoration:none;}.live-spacer{--live-spacer-background:var(--live-theme-primary-1);--live-spacer-text:var(--live-theme-on-primary);align-items:center;background-color:var(--live-spacer-background);border-radius:6px;box-shadow:var(--live-theme-shadow-container);color:var(--live-spacer-text);display:flex;flex-direction:column;font-size:1em;line-height:1;margin:2em 0;padding:.5em;-webkit-user-select:none;user-select:none;}.live-spacer a{color:currentColor;font-weight:bold;text-decoration:none;}.live-spacer a:focus,.live-spacer a:hover{color:currentColor;text-decoration:underline;}.live-spacer__page{margin:.5em 0;order:-1;}.live-spacer__collapse{order:1;}`;

    const ui_html = `<style id="live-js-stylesheet">${ui_css}</style><style id="live-js-stylesheet-override">.block--messages .js-newMessagesIndicator{display:none!important}</style><div class="live-timer" id="live-js-timer-container"><div class="live-timer__toggle"><button class="live-button live-button--toggle" id="live-js-timer-toggle" type="button">Live Thread<svg class="live-button__icon" viewBox="0 0 18 18" height="16" width="16"><path d="M14.6,7.7c0.1,0.4,0.2,0.9,0.2,1.3c0,3.2-2.6,5.8-5.8,5.8c-1.5,0-2.9-0.6-3.9-1.6l-2,1.2C4.5,15.9,6.6,17,9,17c4.4,0,8-3.6,8-8c0-0.9-0.2-1.7-0.4-2.5L14.6,7.7z M3.4,10.3C3.3,9.9,3.2,9.4,3.2,9c0-3.2,2.6-5.8,5.8-5.8c1.5,0,2.9,0.6,3.9,1.6l2-1.2C13.5,2.1,11.4,1,9,1C4.6,1,1,4.6,1,9c0,0.9,0.2,1.7,0.4,2.5L3.4,10.3z"/></svg></button></div><div class="live-timer__panel is-hidden" id="live-js-timer-panel"><div class="live-control"><div class="live-control__message" id="live-js-timer-message"></div><div class="live-control__actions"><button class="live-button live-button--control" id="live-js-timer-start" type="button">Start</button><button class="live-button live-button--control" id="live-js-timer-stop" type="button">Stop</button></div></div><div class="live-settings"><div class="live-settings__toggle"><button class="live-button live-button--settings" id="live-js-settings-toggle" type="button">Settings<svg class="live-button__icon" viewBox="0 0 16 16" height="16" width="16"><path d="M1.9,3L8,9.2L14.1,3L16,4.9L8,13L0,4.9L1.9,3z"/></svg></button></div><div class="live-settings__panel is-hidden" id="live-js-settings-panel"><div class="live-option"><div class="live-option__description">Automatically start for this thread</div><div class="live-option__input"><label class="live-checkbox"><input class="live-checkbox__input" id="live-js-option-auto" type="checkbox"><span class="live-checkbox__switch"></span><span class="live-checkbox__label live-checkbox__label--off">Off</span><span class="live-checkbox__label live-checkbox__label--on">On</span></label></div></div><div class="live-option"><div class="live-option__description">Delay between updates</div><div class="live-option__input"><span class="live-select"><select class="live-select__input" id="live-js-option-delay"><option value="2">2 seconds</option><option value="15">15 seconds</option><option value="60" selected>60 seconds</option><option value="120">2 minutes</option><option value="300">5 minutes</option></select><svg class="live-select__icon" viewBox="0 0 16 16" height="16" width="16"><path d="M1.9,3L8,9.2L14.1,3L16,4.9L8,13L0,4.9L1.9,3z"/></svg></span></div></div><div class="live-option"><div class="live-option__description">Check for edits</div><div class="live-option__input"><label class="live-checkbox"><input class="live-checkbox__input" id="live-js-option-edit" type="checkbox" checked><span class="live-checkbox__switch"></span><span class="live-checkbox__label live-checkbox__label--off">Off</span><span class="live-checkbox__label live-checkbox__label--on">On</span></label></div></div><div class="live-option"><div class="live-option__description">Scroll to first new post</div><div class="live-option__input"><label class="live-checkbox"><input class="live-checkbox__input" id="live-js-option-scroll" type="checkbox"><span class="live-checkbox__switch"></span><span class="live-checkbox__label live-checkbox__label--off">Off</span><span class="live-checkbox__label live-checkbox__label--on">On</span></label></div></div><div class="live-feedback"><a href="https://www.resetera.com/threads/2061/">Feedback thread</a></div></div></div></div></div><div class="live-spacer livescroll" id="live-js-spacer"><div class="live-spacer__page"><a href="">Next page</a></div><div class="live-spacer__collapse"><button class="live-button" type="button">Remove posts above</button></div></div>`;

    const ui_doc = (new DOMParser()).parseFromString(ui_html, "text/html");

    const ui = {
        option_auto: ui_doc.getElementById("live-js-option-auto"),
        option_delay: ui_doc.getElementById("live-js-option-delay"),
        option_edit: ui_doc.getElementById("live-js-option-edit"),
        option_scroll: ui_doc.getElementById("live-js-option-scroll"),
        settings_panel: ui_doc.getElementById("live-js-settings-panel"),
        settings_toggle: ui_doc.getElementById("live-js-settings-toggle"),
        spacer: ui_doc.getElementById("live-js-spacer"),
        stylesheet: ui_doc.getElementById("live-js-stylesheet"),
        stylesheet_override: ui_doc.getElementById("live-js-stylesheet-override"),
        timer_container: ui_doc.getElementById("live-js-timer-container"),
        timer_message: ui_doc.getElementById("live-js-timer-message"),
        timer_panel: ui_doc.getElementById("live-js-timer-panel"),
        timer_start: ui_doc.getElementById("live-js-timer-start"),
        timer_stop: ui_doc.getElementById("live-js-timer-stop"),
        timer_toggle: ui_doc.getElementById("live-js-timer-toggle")
    };

    function toggle_settings_panel() {
        ui.settings_panel.classList.toggle("is-hidden");
        ui.settings_toggle.classList.toggle("is-active");
    }

    ///////////////////////////////////////////////////////////////////////////
    // browser actions
    ///////////////////////////////////////////////////////////////////////////

    const update_browser_icon = (function () {
        const favicon = document.head.querySelector("link[rel=icon]");
        const icon_default = favicon.href;
        const icon_active = "data:image/png;base64,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";
        const icon_notify = "data:image/png;base64,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";
        let notification = false;
        return function (notify) {
            if (document.hidden === false) {
                notification = false;
            }
            if ((notify === true || notification === true) && document.hidden) {
                favicon.href = icon_notify;
                notification = true;
                return;
            }
            if (timer.active && notification === false) {
                favicon.href = icon_active;
                return;
            }
            favicon.href = icon_default;
        };
    }());

    const update_browser_url = (function () {
        function update_url() {
            let markers = Array.from(document.querySelectorAll(".livescroll"));
            if (markers.length) {
                markers.unshift(document.body);
                const y = window.scrollY + Math.floor(window.innerHeight / 3);
                while (markers.length > 1) {
                    const half = markers.splice(0, Math.floor(markers.length / 2));
                    if (markers[0].offsetTop >= y) {
                        markers = half;
                    }
                }
                const m = markers[0];
                if (m.hasOwnProperty("livescroll")) {
                    history.replaceState({}, m.livescroll.title, m.livescroll.url);
                    document.title = m.livescroll.title;
                    return;
                }
            }
        }
        let timeout;
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(() => window.requestAnimationFrame(update_url), 500);
        };
    }());

    ///////////////////////////////////////////////////////////////////////////
    // spacer
    ///////////////////////////////////////////////////////////////////////////

    function collapse_page_spacer(spacer) {
        window.requestAnimationFrame(function () {
            Array.from(spacer.parentNode.children).some(function (el) {
                el.remove();
                if (el === spacer) {
                    const title = el.livescroll.title;
                    const url = el.livescroll.url;
                    document.body.livescroll.title = title;
                    document.body.livescroll.url = url;
                    window.history.replaceState({}, title, url);
                    document.title = title;
                    window.scrollTo(0, 0);
                    return true;
                }
            });
        });
    }

    function create_page_spacer(page_number, page_title, page_url) {
        const spacer = ui.spacer.cloneNode(true);
        spacer.removeAttribute("id");
        spacer.livescroll = {title: page_title, url: page_url};
        const link = spacer.querySelector("a");
        link.href = page_url;
        if (Number.isInteger(page_number)) {
            link.textContent = `Page ${page_number}`;
        }
        const button = spacer.querySelector("button");
        button.addEventListener("click", () => collapse_page_spacer(spacer));
        return spacer;
    }

    ///////////////////////////////////////////////////////////////////////////
    // timer
    ///////////////////////////////////////////////////////////////////////////

    function page_update_resolved(response) {
        timer.url = response.page_url;
        switch (response.new_posts.length) {
        case 0:
            ui.timer_message.textContent = "No new posts";
            return;
        case 1:
            ui.timer_message.textContent = "1 new post";
            break;
        default:
            ui.timer_message.textContent = `${response.new_posts.length} new posts`;
        }
        if (response.next_page) {
            const page_spacer = create_page_spacer(response.page_number, response.page_title, response.page_url);
            document.getElementById(response.new_posts[0]).insertAdjacentElement("beforebegin", page_spacer);
        }
        if (options.scroll) {
            document.getElementById(response.new_posts[0]).scrollIntoView({behavior: "smooth", block: "nearest"});
        }
        update_browser_icon(true);
    }

    function page_update_rejected() {
        // console.log(e);
        ui.timer_message.textContent = "Error";
    }

    function restart_timer(start_timer) {
        setTimeout(function () {
            timer.pending = false;
            timer.timeout = clearTimeout(timer.timeout);
            if (timer.active) {
                return start_timer();
            }
            ui.timer_message.textContent = "Stopped";
        }, 2000);
    }

    function update_timer(next_update, start_timer) {
        const time_left = Math.floor((next_update - Date.now()) / 1000);
        if (time_left > 0) {
            timer.timeout = setTimeout(() => update_timer(next_update, start_timer), 1000);
            ui.timer_message.textContent = time_left;
            return;
        }
        timer.active = true;
        timer.pending = true;
        ui.timer_message.textContent = "Updating...";
        liveThreadUpdate(timer.url, options.edit).then(page_update_resolved).catch(page_update_rejected).then(() => restart_timer(start_timer));
    }

    function start_timer() {
        if (timer.pending) {
            timer.active = true;
            ui.timer_message.textContent = "¯\\_(ツ)_/¯";
            return;
        }
        if (timer.timeout) {
            timer.timeout = clearTimeout(timer.timeout);
            return update_timer(0, start_timer);
        }
        const next_update = Date.now() + (options.delay * 1000);
        timer.active = true;
        timer.timeout = setTimeout(() => update_timer(next_update, start_timer), 1000);
        ui.timer_message.textContent = "Starting...";
        ui.timer_panel.classList.remove("is-hidden");
        ui.timer_start.textContent = "Update";
        ui.timer_stop.textContent = "Stop";
        ui.timer_toggle.classList.add("is-active");
        document.addEventListener("scroll", update_browser_url, {passive: true});
        document.addEventListener("visibilitychange", update_browser_icon);
        document.head.appendChild(ui.stylesheet_override);
        update_browser_icon();
    }

    function stop_timer(force_close) {
        if (timer.active === false || force_close === true) {
            timer.pending = false;
            ui.settings_panel.classList.add("is-hidden");
            ui.settings_toggle.classList.remove("is-active");
            ui.timer_panel.classList.add("is-hidden");
        }
        timer.active = false;
        timer.timeout = clearTimeout(timer.timeout);
        ui.timer_message.textContent = "Stopped";
        ui.timer_start.textContent = "Start";
        ui.timer_stop.textContent = "Close";
        ui.timer_toggle.classList.remove("is-active");
        update_browser_icon();
    }

    function toggle_timer() {
        if (timer.active) {
            return stop_timer(true);
        }
        return start_timer();
    }

    ///////////////////////////////////////////////////////////////////////////
    // options
    ///////////////////////////////////////////////////////////////////////////

    function get_saved_options() {
        try {
            const saved_options = JSON.parse(localStorage.getItem("LiveThread"));
            if (saved_options !== null && Array.isArray(saved_options) === false && typeof saved_options === "object") {
                return saved_options;
            }
        } catch (ignore) {}
        return options;
    }

    function save_options() {
        try {
            localStorage.setItem("LiveThread", JSON.stringify(options));
        } catch (ignore) {}
    }

    function set_option_auto(auto) {
        if (Array.isArray(auto)) {
            options.auto = auto.filter((id) => Number.isInteger(id)).slice(0, 99);
            if (thread_id && options.auto.includes(thread_id)) {
                ui.option_auto.checked = true;
            }
        }
    }

    function save_option_auto() {
        if (thread_id) {
            const auto_checked = ui.option_auto.checked;
            const saved_options = get_saved_options();
            set_option_auto(saved_options.auto);
            ui.option_auto.checked = auto_checked;
            const auto = options.auto.filter((id) => id !== thread_id);
            if (auto_checked) {
                auto.unshift(thread_id);
            }
            options.auto = auto;
            return save_options();
        }
    }

    function set_option_delay(delay) {
        if (Number.isInteger(delay) && delay > 0) {
            Array.from(ui.option_delay.options).some(function (el) {
                if (parseInt(el.value, 10) === delay) {
                    options.delay = delay;
                    el.selected = true;
                    return true;
                }
            });
        }
    }

    function save_option_delay() {
        const delay = parseInt(ui.option_delay.options[ui.option_delay.selectedIndex].value, 10);
        if (Number.isInteger(delay) && delay > 0) {
            options.delay = delay;
            return save_options();
        }
    }

    function set_option_edit(edit) {
        if (edit === true || edit === false) {
            options.edit = edit;
            ui.option_edit.checked = edit;
        }
    }

    function save_option_edit() {
        options.edit = ui.option_edit.checked;
        return save_options();
    }

    function set_option_scroll(scroll) {
        if (scroll === true || scroll === false) {
            options.scroll = scroll;
            ui.option_scroll.checked = scroll;
        }
    }

    function save_option_scroll() {
        options.scroll = ui.option_scroll.checked;
        return save_options();
    }

    ///////////////////////////////////////////////////////////////////////////

    ui.option_auto.addEventListener("change", save_option_auto);
    ui.option_delay.addEventListener("change", save_option_delay);
    ui.option_edit.addEventListener("change", save_option_edit);
    ui.option_scroll.addEventListener("change", save_option_scroll);
    ui.settings_toggle.addEventListener("click", toggle_settings_panel);
    ui.timer_start.addEventListener("click", start_timer);
    ui.timer_stop.addEventListener("click", stop_timer);
    ui.timer_toggle.addEventListener("click", toggle_timer);

    document.head.appendChild(ui.stylesheet);

    document.body.classList.add("live-theme", `live-theme-${theme}`);

    Array.from(document.querySelectorAll(".block--messages")).pop().insertAdjacentElement("afterend", ui.timer_container);

    const saved_options = get_saved_options();
    set_option_auto(saved_options.auto);
    set_option_delay(saved_options.delay);
    set_option_edit(saved_options.edit);
    set_option_scroll(saved_options.scroll);
    save_options();

    if (thread_id && options.auto.includes(thread_id)) {
        start_timer();
    }

}());
