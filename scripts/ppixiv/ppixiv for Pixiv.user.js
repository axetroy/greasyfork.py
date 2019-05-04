// ==UserScript==
// @name        ppixiv for Pixiv
// @author      ppixiv
// @description Better Pixiv viewing | Fullscreen images | Faster searching | Bigger thumbnails | Download ugoira MKV | Ugoira seek bar | Download manga ZIP | One-click like, bookmark, follow | One-click zoom and pan | Light and dark themes
// @include     http://*.pixiv.net/*
// @include     https://*.pixiv.net/*
// @run-at      document-start
// @grant       GM.xmlHttpRequest
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_getValue
// @connect     pixiv.net
// @connect     i.pximg.net
// @connect     self
// @version     40
// @namespace   ppixiv
// ==/UserScript==

(function() {

var resources = 
{
    "disabled.html": "<div class=ppixiv-disabled-ui>\r\n    <!-- The top-level template must contain only one node and we only create one\r\n         of these, so we just put this style in here. -->\r\n    <style>\r\n    .ppixiv-disabled-ui {\r\n        position: fixed;\r\n        top: 4px;\r\n        left: 4px;\r\n    }\r\n    .ppixiv-disabled-ui > a {\r\n        border: none;\r\n        display: block;\r\n        width: 46px;\r\n        height: 44px;\r\n        cursor: pointer;\r\n        background-color: transparent;\r\n        opacity: 0.7;\r\n        text-decoration: none;\r\n    }\r\n    .ppixiv-disabled-ui > a:hover {\r\n        opacity: 1;\r\n    }\r\n    </style>\r\n\r\n    <a href=\"#ppixiv\"></a>\r\n</div>\r\n", 
    "main.css": "* { box-sizing: border-box; }\r\nhtml {\r\n    overflow: hidden;\r\n}\r\nbody {\r\n    font-family: \"Helvetica Neue\", arial, sans-serif;\r\n}\r\n\r\na {\r\n    text-decoration: none;\r\n    /*color: #fff;*/\r\n    color: inherit;\r\n}\r\n\r\n/* Work around a bad Firefox browser style.  It sets transform-origin to 0 0\r\n * on :not(svg), which is wrong because it includes things *inside* svgs, breaking\r\n * our <line transform-origin>s. */\r\n:not(svg), :not(foreignObject) > svg {\r\n    transform-origin: inherit;\r\n}\r\n\r\n/* Theme colors: */\r\nbody {\r\n    --button-color: #888;\r\n    --button-highlight-color: #eee;\r\n\r\n    /* Colors for major UI boxes */\r\n    --ui-bg-color: #222;\r\n    --ui-fg-color: #fff;\r\n    --ui-border-color: #000;\r\n    --ui-shadow-color: #000; /* the shadow around some major UI elements */\r\n    --ui-bg-section-color: #555; /* color for sections within UI, like the description box */\r\n\r\n    --toggle-button-fg-disabled-color: #666;\r\n    --toggle-button-fg-dim-color: #888;\r\n    --toggle-button-fg-color: #fff;\r\n    --toggle-button-bg-dim-color: #222;\r\n    --toggle-button-bg-color: #444;\r\n\r\n    /* Color for frames like popup menus */\r\n    --frame-bg-color: #000;\r\n    --frame-fg-color: #fff;\r\n    --frame-border-color: #444;\r\n\r\n    --dropdown-menu-hover-color: #444;\r\n\r\n    /* Box links used for selection in the search UI: */\r\n    --box-link-fg-color: var(--frame-fg-color);\r\n    --box-link-bg-color: var(--frame-bg-color);\r\n    --box-link-disabled-color: #888;\r\n    --box-link-hover-color: #222;\r\n    --box-link-selected-color: #008;\r\n\r\n    /* Color for the minor text style, eg. the bookmark and like counts.\r\n     * This is smaller text, with a text border applied to make it readable. */\r\n    --minor-text-fg-color: #aaa;\r\n    --minor-text-shadow-color: #000;\r\n\r\n    --title-fg-color: #fff; /* title strip in image-ui */\r\n    --title-bg-color: #444;\r\n\r\n    --like-button-color: #888;\r\n    --like-button-liked-color: #ccc;\r\n    --like-button-hover-color: #fff;\r\n}\r\n\r\nbody.light {\r\n    --ui-bg-color: #eee;\r\n    --ui-fg-color: #222;\r\n    --ui-border-color: #ccc;\r\n    --ui-shadow-color: #fff;\r\n    --ui-bg-section-color: #ccc; /* color for subsections */\r\n\r\n    --button-color: #666;\r\n    --button-highlight-color: #222;\r\n\r\n    --toggle-button-fg-dim-color: #222;\r\n    --toggle-button-fg-color: #000;\r\n    --toggle-button-bg-dim-color: #eee;\r\n    --toggle-button-bg-color: #ccc;\r\n\r\n    --frame-bg-color: #fff;\r\n    --frame-fg-color: #222;\r\n\r\n    --dropdown-menu-hover-color: #ccc;\r\n\r\n    --box-link-hover-color: #eee;\r\n    --box-link-selected-color: #ffc;\r\n\r\n    --minor-text-fg-color: #555; /* 555 */\r\n    --minor-text-shadow-color: #fff; /* fff */\r\n\r\n    --title-fg-color: #fff;\r\n    --title-bg-color: #888;\r\n\r\n    --like-button-liked-color: #222;\r\n    --like-button-hover-color: #000;\r\n}\r\nul {\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n.view:focus {\r\n    /* Views have tabindex: -1 set.  This causes Chrome to put a blue outline around them\r\n     * when they're focused, which just puts a weird border around the whole window.  Remove\r\n     * it. */\r\n    outline: none;\r\n}\r\n.view-illust-container {\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n.image-container {\r\n    width: 100%;\r\n    height: 100%;\r\n    user-select: none;\r\n    -moz-user-select: none;\r\n    cursor: pointer;\r\n}\r\n[hidden] {\r\n    display: none !important;\r\n}\r\n\r\ntextarea:focus, input:focus, a:focus {\r\n    outline: none;\r\n}\r\n\r\n.hide-cursor { cursor: none !important; }\r\n.hide-cursor * { cursor: inherit !important; }\r\n\r\n.main-container {\r\n    position: fixed;\r\n    top: 0px;\r\n    left: 0px;\r\n    width: 100%;\r\n    height: 100%;\r\n    overflow: hidden;\r\n}\r\n.progress-bar {\r\n    position: absolute;\r\n    pointer-events: none;\r\n    background-color: #00F;\r\n    bottom: 0px;\r\n    left: 0px;\r\n    width: 100%;\r\n    height: 2px;\r\n}\r\n@keyframes flash-progress-bar { to { opacity: 0; } }\r\n.progress-bar.hide {\r\n    animation: flash-progress-bar 500ms linear 1 forwards;\r\n}\r\n\r\n.loading-progress-bar .progress-bar {\r\n    z-index: 100;\r\n}\r\n\r\n/* .seek-bar is the outer seek bar area, which is what can be dragged. */\r\n.seek-bar {\r\n    position: absolute;\r\n    bottom: 0px;\r\n    left: 0px;\r\n    width: 100%;\r\n\r\n    box-sizing: content-box;\r\n    height: 12px;\r\n    padding-top: 25px;\r\n\r\n    cursor: pointer;\r\n}\r\n\r\n.seek-bar .seek-empty {\r\n    height: 100%;\r\n    background-color: rgba(0,0,0,0.25);\r\n}\r\n\r\n.seek-bar .seek-fill {\r\n    background-color: #F00;\r\n    height: 100%;\r\n}\r\n\r\n.seek-bar .seek-empty {\r\n    transition: transform .25s;\r\n    transform: translate(0, 12px);\r\n}\r\n\r\n.seek-bar.visible .seek-empty {\r\n    transform: translate(0, 6px);\r\n}\r\n.seek-bar.dragging .seek-empty {\r\n    transform: translate(0, 0);\r\n}\r\n\r\n.title-font {\r\n    font-weight: 700;\r\n    font-size: 20px;\r\n    font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,\r\n        Droid Sans, Helvetica Neue, Hiragino Kaku Gothic ProN, Meiryo, sans-serif;\r\n}\r\n\r\n.small-font {\r\n    font-size: 0.8em;\r\n}\r\n\r\n.hover-message {\r\n    width: 100%;\r\n    position: absolute;\r\n    bottom: 0px;\r\n    display: flex;\r\n    justify-content: center;    \r\n    pointer-events: none;\r\n    opacity: 0;\r\n    transition: opacity .25s;\r\n    z-index: 100;\r\n}\r\n\r\n.hover-message.show {\r\n    opacity: 1;\r\n}\r\n\r\n.hover-message.centered {\r\n    bottom: 50%;\r\n}\r\n\r\n.hover-message > .message {\r\n    background-color: var(--frame-bg-color);\r\n    color: var(--frame-fg-color);\r\n    font-size: 1.4em;\r\n    padding: 6px 15px;\r\n    margin: 4px;\r\n    max-width: 600px;\r\n    text-align: center;\r\n    border-radius: 5px;\r\n    box-shadow: 0 0 10px 5px #aaa;\r\n}\r\n\r\n.view-illust-container .ui {\r\n    position: absolute;\r\n    top: 0px;\r\n    left: 0px;\r\n    min-width: 450px;\r\n    max-height: 500px;\r\n    width: 30%;\r\n    height: auto;\r\n\r\n    /* Disable events on the top-level container, so it doesn't block clicks on the\r\n     * image when the UI isn't visible.  We'll reenable events on the hover-box and ui-box\r\n     * below it where we actually want pointer events. */\r\n    pointer-events: none;\r\n}\r\n.view-illust-container .ui-box {\r\n    pointer-events: none;\r\n}\r\n.view-illust-container .ui.disabled {\r\n    display: none;\r\n}\r\n\r\n/*\r\n * This is the box that triggers the UI to be displayed.  We use this rather than\r\n * ui-box for this so we can give it a fixed size.  That way, the UI box won't suddenly\r\n * appear when changing to another image because a longer description caused the box\r\n * to become bigger.\r\n *\r\n * This is a little tricky.  Hovering over either hover-box or the UI makes it visible.\r\n * When the UI is hidden, it's set to pointer-events: none, so it can't be hovered,\r\n * but once you hover over hover-box and cause the UI to be visible, pointer events\r\n * are reenabled so hovering over anywhere in the UI keeps it visible.  The UI is\r\n * over hover-box in the Z order, so we don't need to disable pointer events on hover-box\r\n * to prevent it from blocking the UI.\r\n *\r\n * We also disable pointer-events on the UI until it's visible, so it doesn't receive\r\n * clicks until it's visible.\r\n */\r\n.hover-box {\r\n    width: 400px;\r\n    height: 200px;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    pointer-events: auto; /* reenable pointer events that are disabled on .ui */\r\n}\r\n.hover-sphere {\r\n    width: 500px;\r\n    height: 500px;\r\n\r\n    /* Clamp the sphere to a percentage of the viewport width, so it gets smaller for\r\n     * small windows. */\r\n    max-width: 30vw;\r\n    max-height: 30vw;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n}\r\n.hover-sphere circle {\r\n    pointer-events: auto; /* reenable pointer events that are disabled on .ui */\r\n}\r\n.hover-sphere > svg {\r\n    width: 100%;\r\n    height: 100%;\r\n    transform: translate(-50%,-50%)\r\n}\r\n.ui-box {\r\n    background-color: var(--ui-bg-color);\r\n    color: var(--ui-fg-color);\r\n    border: solid 2px var(--ui-border-color);\r\n    padding: 1em;\r\n    border-radius: 8px;\r\n    position: relative;\r\n}\r\n\r\n.view-illust-container .ui-box {\r\n    margin: .5em;\r\n}\r\n\r\n.view-manga-container .ui-container {\r\n    width: 600px;\r\n    max-width: 90%;\r\n    pointer-events: auto;\r\n}\r\n\r\n/* Since the UI isn't a popup on the manga page, hide the description and\r\n * tag list to make it smaller.  These can be viewed while viewing a page. */\r\n.view-manga-container .ui-box > .description,\r\n.view-manga-container .ui-box > .tag-list\r\n{\r\n    display: none;\r\n}\r\n\r\n.view-illust-container .ui-box {\r\n    transition: transform .25s, opacity .25s;\r\n    opacity: 0;\r\n    transform: translate(-50px, 0);\r\n    pointer-events: none;\r\n}\r\n\r\n/* Debugging: */\r\nbody.force-ui .view-illust-container .ui > .ui-box {\r\n    opacity: 1;\r\n    transform: translate(0, 0);\r\n    pointer-events: inherit;\r\n}\r\n\r\n/* Show the UI on hover when hide-ui isn't set. */\r\nbody:not(.hide-ui) .view-illust-container .ui-box.hovering-over-box,\r\nbody:not(.hide-ui) .view-illust-container .ui-box.hovering-over-sphere {\r\n    opacity: 1;\r\n    transform: translate(0, 0);\r\n    pointer-events: auto;\r\n}\r\n\r\n.button-row {\r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: center;\r\n    height: 32px;\r\n    margin-top: 5px;\r\n    margin-bottom: 4px;\r\n}\r\n.ui-box > .button-row .button.enabled {\r\n    cursor: pointer;\r\n}\r\n\r\n/* An icon in a button strip. */\r\n.icon-button {\r\n    display: block;\r\n    width: 32px;\r\n    height: auto;\r\n}\r\n\r\n/* If this is an icon-button with an svg inside, set the svg to block. */\r\n.icon-button > svg {\r\n    display: block;\r\n}\r\n.disable-ui-button:hover > .icon-button {\r\n    color: #0096FA;\r\n}\r\n.navigate-out-button {\r\n    cursor: pointer;\r\n}\r\n\r\n.popup-menu-box .menu-toggle {\r\n    display: block;\r\n}\r\n.menu-slider input {\r\n    vertical-align: middle;\r\n    width: 100%;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\n.popup.avatar-popup:hover:after {\r\n    left: auto;\r\n    bottom: auto;\r\n    top: 60px;\r\n    right: -10px;\r\n}\r\n.follow-container .avatar {\r\n    transition: filter .25s;\r\n    display: block;\r\n    position: relative;\r\n}\r\n/* .avatar contains an image, and a canvas overlaid on top for hover effects. */\r\n.follow-container .avatar > canvas {\r\n    border-radius: 5px;\r\n    object-fit: cover;\r\n    width: 100%;\r\n    height: 100%;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n}\r\n.follow-container .avatar > canvas.highlight {\r\n    opacity: 0;\r\n    transition: opacity .25s;\r\n}\r\n.follow-container .avatar:hover > canvas.highlight {\r\n    opacity: 1;\r\n}\r\n.follow-container:not(.big) .avatar {\r\n    width: 50px;\r\n    height: 50px;\r\n}\r\n/* For the avatar in the popup menu, use the same size as the other popup menu buttons. */\r\n\r\n.avatar-widget-container .follow-container .avatar {\r\n    width: 44px;\r\n    height: 44px;\r\n}\r\n.follow-container.big .avatar {\r\n    width: 170px;\r\n    height: 170px;\r\n}\r\n\r\n/* The API doesn't tell us whether a follow is private or not, so we can't show\r\n * it.  The lock is only used to distinguish the \"follow\" and \"follow privately\"\r\n * buttons. */\r\n.follow-icon .lock {\r\n    stroke: #888;\r\n}\r\n.follow-icon:not(.private) .lock {\r\n    display: none !important;\r\n}\r\n.follow-container .follow-icon:not(:hover) .outline1 {\r\n    stroke: none !important;\r\n}\r\n\r\n/* Hide the following icon if we're not following. */\r\n.follow-container:not(.followed) .follow-icon.following-icon {\r\n    display: none;\r\n}\r\n/* Hide the follow buttons if we're already following. */\r\n.follow-container.followed .follow-icon.follow-button {\r\n    display: none;\r\n}\r\n\r\n/* Only show the follow buttons on hover (but always show the following icon). */\r\n.follow-container:not(:hover) .follow-icon.follow-button {\r\n    display: none;\r\n}\r\n/* If use-dropdown is set, this avatar is using the dropdown UI and doesn't show the\r\n * follow/unfollow overlay buttons. */\r\n.follow-container[data-mode=\"dropdown\"] .follow-icon.follow-button {\r\n    display: none;\r\n}\r\n/* Don't show follow buttons or the follow popup for the user. */\r\n.follow-container.self .follow-icon,\r\n.follow-container.self .follow-popup\r\n{\r\n    display: none;\r\n}\r\n\r\n.follow-container .follow-icon {\r\n    position: absolute;\r\n    bottom: 0;\r\n    text-align: center;\r\n    height: auto;\r\n}\r\n.follow-container .follow-icon {\r\n    width: 50%; /* half the size of the container */\r\n    max-width: 50px; /* limit the size for larger avatar displays */\r\n}\r\n\r\n.follow-container .follow-icon.bottom-left {\r\n    left: 0;\r\n}\r\n.follow-container .follow-icon.bottom-right {\r\n    right: 0;\r\n}\r\n\r\n/* In small avatar buttons, nudge the follow buttons down off of the\r\n * avatar, so they don't appear right under the cursor when you're trying\r\n * to click the avatar itself.  Only do this with the follow buttons that\r\n * appears on hover, not the following icon (unfollow button), and don't\r\n * do it with the big avatars. */\r\n.follow-container:not(.big) .follow-button {\r\n    top: calc(100% - 5px);\r\n}\r\n\r\n.follow-container .follow-icon > svg {\r\n    display: block;\r\n    width: 100%;\r\n    height: auto;\r\n    transition: opacity .25s;\r\n\r\n    /* Move the icon down, so the bottom of the eye is along the bottom of the\r\n     * container and the lock (if visible) overlaps. */\r\n    margin-bottom: -20%;\r\n}\r\n.follow-container:not(:hover) .follow-icon > svg {\r\n    opacity: 0.5;\r\n}\r\n.follow-container .follow-icon > svg .middle {\r\n    transition: transform .1s ease-in-out;\r\n    transform: translate(0px, -2px);\r\n}\r\n.follow-container .follow-icon.unfollow-button > svg .middle {\r\n    transform: translate(-2px, -5px);\r\n}\r\n.follow-container .follow-icon.unfollow-button:hover > svg .middle {\r\n    transform: translate(2px, 5px);\r\n}\r\n/* Don't fade the icons in the context menu, since it's too small and it makes\r\n * it too hard to see at a glance. */\r\n.popup-context-menu .follow-container .follow-icon > svg {\r\n    opacity: 1;\r\n}\r\n\r\n.follow-popup {\r\n    margin-top: 10px;\r\n    right: 0px;\r\n}\r\n.follow-container .hover-area {\r\n    top: -12px;\r\n}\r\n.follow-container .avatar-link {\r\n    display: block;\r\n}\r\n.follow-popup .folder {\r\n    display: block;\r\n}\r\n\r\n.follow-container.followed .follow-popup .not-following { display: none; }\r\n.follow-container:not(.followed) .follow-popup .following { display: none; }\r\n\r\n/* Hide the follow dropdown when following, since there's nothing in it. */\r\n.follow-container.followed.popup-visible .popup-menu-box.hover-menu-box {\r\n    visibility: hidden;\r\n}\r\n\r\n.title-block {\r\n    display: inline-block;\r\n    padding: 0 10px;\r\n    color: var(--title-fg-color);\r\n    background-color: var(--title-bg-color);\r\n    margin-right: 1em;\r\n    border-radius: 8px 0;\r\n}\r\n.title-block.popup:hover:after {\r\n    top: 40px;\r\n    bottom: auto;\r\n}\r\n.author {\r\n    vertical-align: top;\r\n}\r\n/* When .dot is set, show images with nearest neighbor filtering. */\r\nbody.dot img.filtering,\r\nbody.dot canvas.filtering {\r\n    image-rendering: -moz-crisp-edges;\r\n    image-rendering: crisp-edges;\r\n    image-rendering: pixelated;\r\n}\r\n.similar-illusts-button:hover > .icon-button {\r\n    color: #FF0 !important; /* override grey-icon hover color */\r\n}\r\n\r\nbody.light .similar-illusts-button:hover > .icon-button {\r\n    stroke: #000;\r\n}\r\n\r\n.similar-illusts-button > .icon-button {\r\n    margin-top: -3px;\r\n}\r\n\r\n.post-info > * {\r\n    display: inline-block;\r\n    background-color: var(--box-link-bg-color);\r\n    color: var(--box-link-fg-color);\r\n    padding: 2px 10px;\r\n\r\n    /* Use a smaller, heavier font to distinguish these from tags. */\r\n    font-size: .8em;\r\n    font-weight: bold;\r\n}\r\n.description {\r\n    border: solid 1px var(--ui-border-color);\r\n    padding: .35em;\r\n    background-color: var(--ui-bg-section-color);\r\n    max-height: 10em;\r\n    overflow-y: auto;\r\n}\r\nbody.light .description {\r\n    border: none;\r\n}\r\n/* Override obnoxious colors in descriptions.  Why would you allow this? */\r\n.description * {\r\n    color: var(--ui-fg-color);\r\n}\r\n\r\n.popup {\r\n    position: relative;\r\n}\r\n\r\n.popup:hover:after {\r\n    pointer-events: none;\r\n    background: #111;\r\n    border-radius: .5em;\r\n    left: 0em;\r\n    top: -2.0em;\r\n    color: #fff;\r\n    content: attr(data-popup);\r\n    display: block;\r\n    padding: .3em 1em;\r\n    position: absolute;\r\n    text-shadow: 0 1px 0 #000;\r\n    white-space: nowrap;\r\n    z-index: 98;\r\n}\r\n.popup-bottom:hover:after {\r\n    top: auto;\r\n    bottom: -2em;\r\n}\r\n\r\nbody:not(.premium) .premium-only { display: none; }\r\nbody.hide-r18 .r18 { display: none; }\r\nbody.hide-r18g .r18g { display: none; }\r\n\r\n.popup-menu-box {\r\n    position: absolute;\r\n    min-width: 10em;\r\n    background-color: var(--frame-bg-color);\r\n    border: 1px solid var(--frame-border-color);\r\n    padding: .25em .5em;\r\n    z-index: 1;\r\n}\r\n\r\n.menu-button {\r\n    cursor: pointer;\r\n}\r\n\r\n.popup-menu-box.hover-menu-box {\r\n    visibility: hidden;\r\n}\r\n.popup-visible .popup-menu-box.hover-menu-box {\r\n    visibility: inherit;\r\n}\r\n\r\n/* This is an invisible block underneath the hover zone to keep the hover UI visible. */\r\n.hover-area {\r\n    position: absolute;\r\n    top: -50%;\r\n    left: -33%;\r\n    width: 150%;\r\n    height: 200%;\r\n    z-index: -1;\r\n}\r\n/* This one is under the bookmark popup.  Extend over the bottom, so the list doesn\\'t disappear\r\n * when deleting a recent bookmark at the bottom of the list, but don\\'t extend over the top, so\r\n * we don\\'t block the mouse hovering over other things.\r\n *\r\n * Note that the positioning of this is important: we want to fully close the gap between the\r\n * popup and the bottom that opened it, but we don't want to overlap the button and block it. */\r\n.navigation-menu-box .hover-area,\r\n.settings-menu-box .hover-area,\r\n.image-settings-menu-box .hover-area\r\n{\r\n    top: -2px;\r\n    height: 125%;\r\n}\r\n\r\n.follow-popup input{\r\n    margin: .25em;\r\n    padding: .25em;\r\n}\r\n.popup-menu-box .button {\r\n    padding: .25em;\r\n    cursor: pointer;\r\n    width: 100%;\r\n}\r\n\r\n.popup-menu-box .button:hover {\r\n    background-color: var(--dropdown-menu-hover-color);\r\n}\r\n\r\n.view-search-container {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    top: 0;\r\n    left: 0;\r\n    overflow-x: hidden;\r\n    /* Always show the vertical scrollbar, so we don't relayout as images load. */\r\n    overflow-y: scroll;\r\n    color: #fff;\r\n}\r\n\r\n.view-search-container .thumbnail-ui,\r\n.view-manga-container .ui\r\n{\r\n    /* This places the thumbnail UI at the top, so the thumbnails sit below it when\r\n     * scrolled all the way up, and scroll underneath it. */\r\n    position: sticky;\r\n    top: 0;\r\n    width: 100%;\r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: center;\r\n    padding-top: 1em;\r\n    margin-bottom: .5em;\r\n    z-index: 1;\r\n    pointer-events: none;\r\n}\r\n\r\n.view-search-container .thumbnail-ui-box {\r\n    width: 50%;\r\n    /* Make sure this doesn't get too narrow, or it'll overlap too much of the thumbnail area. */\r\n    min-width: 800px;\r\n    background-color: var(--ui-bg-color);\r\n    color: var(--ui-fg-color);\r\n    box-shadow: 0 0 15px 10px var(--ui-shadow-color);\r\n    border-radius: 4px;\r\n\r\n    padding: 10px;\r\n    pointer-events: auto;\r\n}\r\n\r\n.view-search-container .thumbnail-ui-box .displaying {\r\n    padding-bottom: 4px;\r\n}\r\n\r\n.view-search-container .thumbnail-ui-box .bookmarks-link {\r\n    display: block;\r\n}\r\n\r\n.view-search-container .thumbnail-ui-box .contact-link {\r\n    display: block;\r\n    width: 31px;\r\n    height: 31px;\r\n    margin: 0 3px;\r\n}\r\n\r\n.view-search-container .thumbnail-ui-box .webpage-link {\r\n    display: block;\r\n    margin: 0 2px;\r\n    width: 26px;\r\n    height: 26px;\r\n}\r\n\r\n.view-search-container .thumbnail-ui-box .twitter-icon,\r\n.view-search-container .thumbnail-ui-box .pawoo-icon {\r\n    display: block;\r\n    width: 32px;\r\n    height: 32px;\r\n    margin: 0 1px;\r\n}\r\n\r\n/* .thumbnails is the actual thumbnail list. */\r\n.view-search-container .thumbnails {\r\n    user-select: none;\r\n    -moz-user-select: none;\r\n    padding: 0;\r\n    text-align: center;\r\n}\r\n\r\n.view-search-container ul {\r\n    margin: 0;\r\n    margin: 0 auto; /* center */\r\n}\r\n\r\nli.thumbnail-box {\r\n    display: inline-block;\r\n    padding: 1em;\r\n}\r\n/* Hide pending images (they haven't been set up yet). */\r\nli.thumbnail-box[data-pending] {\r\n    visibility: hidden;\r\n}\r\nli.thumbnail-box .thumbnail-inner {\r\n    position: relative;\r\n}\r\n\r\nli.thumbnail-box a.thumbnail-link {\r\n    display: block;\r\n\r\n    border-radius: 4px;\r\n    overflow: hidden;\r\n    position: relative;\r\n    text-decoration: none;\r\n    color: #fff;\r\n}\r\n\r\n.page-count-box {\r\n    pointer-events: none;\r\n    position: absolute;\r\n    right: 2px;\r\n    bottom: 2px;\r\n    padding: 4px 8px;\r\n    background-color: rgba(0,0,0,.6);\r\n    border-radius: 6px;\r\n}\r\n\r\n.page-count-box .page-icon {\r\n    width: 16px;\r\n    height: 16px;\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n}\r\n\r\n.page-count-box {\r\n    transition: opacity .5s;\r\n}\r\n.thumbnail-inner:hover .page-count-box {\r\n    opacity: 0.5;\r\n}\r\n\r\n.page-count-box .page-count {\r\n    vertical-align: middle;\r\n    margin-left: -4px;\r\n}\r\n\r\n/* The similar illusts button on top of thumbnails. */\r\n.view-search-container li.thumbnail-box .similar-illusts-button {\r\n    display: block;\r\n    width: 32px;\r\n    height: 32px;\r\n    margin-top: -2px;\r\n}\r\n.view-search-container li.thumbnail-box:not(:hover) .similar-illusts-button {\r\n    visibility: hidden;\r\n}\r\n.view-search-container li.thumbnail-box .similar-illusts-button {\r\n    color: #FF0 !important; /* override grey-icon hover color */\r\n    opacity: 0.5;\r\n\r\n    /* Use a very subtle stroke when not hovered, so it's not completely invisible\r\n     * on light backgrounds. */\r\n    stroke: rgba(0,0,0,0.5);\r\n}\r\n.view-search-container li.thumbnail-box .similar-illusts-button:hover {\r\n    opacity: 1;\r\n    stroke: #000;\r\n}\r\n\r\n.view-search-container li.thumbnail-box .thumbnail-bottom-left {\r\n    position: absolute;\r\n    display: flex;\r\n    left: 0px;\r\n    bottom: 0px;\r\n}\r\n.view-search-container li.thumbnail-box .heart {\r\n    pointer-events: none;\r\n    width: 32px;\r\n    height: 32px;\r\n}\r\n.view-search-container li.thumbnail-box .heart > svg {\r\n    transition: opacity .5s;\r\n}\r\n\r\n.thumbnail-inner:hover .heart > svg {\r\n    opacity: 0.5;\r\n}\r\n.view-search-container li.thumbnail-box .ugoira-icon {\r\n    pointer-events: none;\r\n    width: 32px;\r\n    height: 32px;\r\n    right: 0px;\r\n    bottom: 0px;\r\n    color: #fff;\r\n    position: absolute;\r\n    transition: opacity .5s;\r\n}\r\n\r\n.thumbnail-inner:hover .ugoira-icon {\r\n    opacity: 0.5;\r\n}\r\n\r\n.view-search-container li.thumbnail-box[data-pending] a {\r\n    /* Don't show a grey box while an image is pending.  It just causes extra\r\n     * flicker. */\r\n/*    opacity: 0.5;\r\n    background-color: #444;*/\r\n}\r\n\r\n/* The popup title below thumbs: */\r\n.thumbnail-inner > .thumbnail-label {\r\n    position: absolute;\r\n    pointer-events: none;\r\n    visibility: hidden;\r\n    height: 25px;\r\n    white-space: nowrap;\r\n    width: 100%;\r\n    padding-top: 4px;\r\n}\r\n\r\n.thumbnail-inner > .thumbnail-label > div {\r\n    color: var(--frame-fg-color);\r\n    background-color: var(--frame-bg-color);\r\n    left: 50%;\r\n    position: absolute;\r\n    transform: translate(-50%, 0);\r\n    padding: 0 10px;\r\n    max-width: 400px;\r\n    overflow: hidden;\r\n    border-radius: 2px;\r\n    text-overflow: ellipsis;\r\n}\r\n.thumbnail-inner:hover .thumbnail-label {\r\n    visibility: visible;\r\n}\r\n\r\n/* Hide the img while it's pending so we don't show a broken image icon. */\r\nli.thumbnail-box[data-pending] a img.thumb {\r\n    display: none;\r\n}\r\n\r\n.thumbnail-box .thumb {\r\n    object-fit: cover;\r\n\r\n    /* Show the top-center of the thunbnail.  This generally makes more sense\r\n     * than cropping the center. */\r\n    object-position: 50% 0%;    \r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n/* Be careful not to set any transform: scale if zooming is disabled.  A scale of 1\r\n * will cause thumbnails to shift around in Firefox. */\r\nbody:not(.disable-thumbnail-zooming) .view-search-container .thumbnail-box .thumb {\r\n    transition: transform .5s;\r\n    transform: scale(1.25, 1.25);\r\n}\r\n\r\nbody:not(.disable-thumbnail-zooming) .view-search-container .thumbnail-box .thumbnail-inner:hover .thumb {\r\n    transform: scale(1, 1);\r\n}\r\n\r\n.thumbnail-box.vertical-panning .thumb,\r\n.thumbnail-box.horizontal-panning .thumb\r\n{\r\n    animation-duration: 4s;\r\n    animation-timing-function: ease-in-out;\r\n    animation-iteration-count: infinite;\r\n}\r\n\r\n.thumbnail-box .thumbnail-inner:not(:hover) .thumb {\r\n    animation-play-state: paused;\r\n}\r\n\r\nbody:not(.disable-thumbnail-panning) .thumbnail-box.horizontal-panning .thumb {\r\n    animation-name: pan-thumbnail-horizontally;\r\n    object-position: left top;\r\n\r\n    /* The full animation is 4 seconds, and we want to start 20% in, at the halfway\r\n     * point of the first left-right pan, where the pan is exactly in the center where\r\n     * we are before any animation.  This is different from vertical panning, since it\r\n     * pans from the top, which is already where we start (top center). */\r\n    animation-delay: -.8s;\r\n\r\n}\r\nbody:not(.disable-thumbnail-panning) .thumbnail-box.vertical-panning .thumb {\r\n    animation-name: pan-thumbnail-vertically;\r\n}\r\n\r\n@keyframes pan-thumbnail-horizontally {\r\n    /* This starts in the middle, pans left, pauses, pans right, pauses, returns to the middle, then pauses again. */\r\n    0%   { object-position: left top; } /* left */\r\n    40%  { object-position: right top; } /* pan right */\r\n    50%  { object-position: right top; } /* pause */\r\n    90%  { object-position: left top; } /* pan left */\r\n    100%  { object-position: left top; } /* pause */\r\n}\r\n\r\n@keyframes pan-thumbnail-vertically {\r\n    /* This starts at the top, pans down, pauses, pans back up, then pauses again. */\r\n    0%   { object-position: 50% 0%; }\r\n    40%  { object-position: 50% 100%; }\r\n    50%  { object-position: 50% 100%; }\r\n    90%  { object-position: 50% 0%; }\r\n    100% { object-position: 50% 0%; }\r\n}\r\n\r\n.view-search-container .thumbnail-box:not(.muted) .muted {\r\n    display: none;\r\n}\r\n.view-search-container .thumbnail-box .muted {\r\n    pointer-events: none;\r\n    left: 0;\r\n    top: 50%;\r\n    width: 100%;\r\n    height: 32px;\r\n    color: #000;\r\n    position: absolute;\r\n    text-shadow: 0px 1px 1px #fff, 0px -1px 1px #fff, 1px 0px 1px #fff, -1px 0px 1px #fff;\r\n    font-size: 22px;\r\n}\r\n\r\n/* Zoom muted images in a little, and zoom them out on hover, which is the opposite\r\n * of other images.  This also helps hide the black bleed around the edge caused by\r\n * the blur. */\r\n.view-search-container .thumbnail-box.muted .thumb {\r\n    filter: blur(10px);\r\n    transform: scale(1.25, 1.25);\r\n}\r\nbody:not(.disable-thumbnail-zooming) .view-search-container .thumbnail-box.muted .thumb:hover {\r\n    transform: scale(1, 1);\r\n}\r\n\r\n/* Hide the fake thumbnail used to detect when we've scrolled to the bottom.\r\n * Note that we need to hide something inside the <li>, not the whole entry,\r\n * or offsetTop will be 0, which breaks get_visible_thumbnails. */\r\n.view-search-container .next-page-placeholder > .thumbnail-inner {\r\n    display: none !important;\r\n}\r\n\r\n.view-search-container .dot img.thumb {\r\n    /* This doesn't work as well on thumbnails. */\r\n    /*\r\n    image-rendering: -moz-crisp-edges;\r\n    image-rendering: crisp-edges;\r\n    image-rendering: pixelated;\r\n    */\r\n}\r\n\r\n@keyframes flash-thumbnail {\r\n    0% {\r\n        filter: brightness(200%);\r\n    }\r\n}\r\n\r\n.view-search-container .flash a {\r\n    animation-name: flash-thumbnail;\r\n    animation-duration: 300ms;\r\n    animation-timing-function: ease-out;\r\n    animation-iteration-count: 1;\r\n}    \r\n\r\n.box-link {\r\n    display: inline-block;\r\n    cursor: pointer;\r\n    text-decoration: none;\r\n    padding: .25em .5em;\r\n    margin: .25em .25em;\r\n    color: var(--box-link-fg-color);\r\n    background-color: var(--box-link-bg-color);\r\n    user-select: none;\r\n    -moz-user-select: none;\r\n    white-space: nowrap;\r\n}\r\n\r\n.box-link.disabled {\r\n    color: var(--box-link-disabled-color);\r\n}\r\n\r\n.box-link:hover {\r\n    background-color: var(--box-link-hover-color);\r\n}\r\n\r\n.box-link.selected {\r\n    background-color: var(--box-link-selected-color);\r\n}\r\n\r\n.view-search-container .following-tag {\r\n    text-decoration: none;\r\n}\r\n\r\n.view-search-container .search-options-row {\r\n    display: flex;\r\n    flex-direction: row;\r\n}\r\n\r\n.view-search-container .search-options-row .hover-area {\r\n    top: -10px;\r\n    height: 150%;\r\n}\r\n.option-list {\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n.search-options-row > div.active > .box-link {\r\n    background-color: var(--box-link-selected-color);\r\n}\r\n.search-box {\r\n    white-space: nowrap;\r\n    margin-bottom: 4px;\r\n    position: relative; /* to position the search dropdown */\r\n}\r\n\r\n/* The block around the input box and submit button.  A history dropdown widget will\r\n * be placed in here. */\r\n.tag-search-box {\r\n    display: inline-block;\r\n    position: relative;\r\n}\r\n\r\ninput.search-tags {\r\n    font-size: 1.2em;\r\n    padding: 6px 10px;\r\n    padding-right: 30px; /* extra space for the submit button */\r\n    vertical-align: middle;\r\n}\r\n\r\n.view-search-container .search-submit-button {\r\n    display: inline-block;\r\n    margin-left: -30px; /* overlap the input */\r\n    vertical-align: middle;\r\n    cursor: pointer;\r\n}\r\n\r\n.thumbnail-ui-box .avatar-container {\r\n    float: right;\r\n    position: relative;\r\n    margin-left: 25px;\r\n}\r\n\r\n.image-for-suggestions {\r\n    float: right;\r\n    margin-left: 25px;\r\n}\r\n.image-for-suggestions > img {\r\n    display: block;\r\n    max-height: 150px;\r\n    border-radius: 5px; /* matches the avatar display */\r\n}\r\n\r\n.grey-icon {\r\n    color: var(--button-color);\r\n}\r\n:hover > .grey-icon {\r\n    color: var(--button-highlight-color);\r\n}\r\n/* If a grey-icon is directly inside a visible popup menu, eg. the navigation icon: */\r\n.popup-visible > .grey-icon {\r\n    color: var(--button-highlight-color);\r\n}\r\n\r\n.mute-display .muted-image {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    object-fit: cover;\r\n    filter: blur(20px);\r\n    opacity: .75;\r\n}\r\n\r\n.mute-display .muted-text {\r\n    position: absolute;\r\n    width: 100%;\r\n    top: 50%;\r\n    left: 0;\r\n    text-align: center;\r\n    font-size: 30px;\r\n    color: #000;\r\n    text-shadow: 0px 1px 1px #fff, 0px -1px 1px #fff, 1px 0px 1px #fff, -1px 0px 1px #fff;\r\n}\r\n\r\n/* Tag lists are usually inline.  Make the tag filter a vertical list. */\r\n.member-tags-box .post-tag-list,\r\n.search-tags-box .related-tag-list {\r\n    max-height: 300px;\r\n    display: block;\r\n    overflow-x: hidden;\r\n    overflow-y: auto;\r\n    white-space: nowrap;\r\n}\r\n.member-tags-box .post-tag-list .following-tag,\r\n.search-tags-box .related-tag-list .tag {\r\n    display: block;\r\n}\r\n\r\n.member-tags-box .post-tag-list .following-tag:hover:after,\r\n.search-tags-box .related-tag-list .tag:hover:after {\r\n    left: auto;\r\n    right: 0px;\r\n}\r\n\r\n.input-dropdown {\r\n    width: 100%;\r\n    margin: 1px;\r\n\r\n    /* This is used for the search tag dropdown, which is in a fixed position at the top of the\r\n     * screen.  Limit the height to the size of the window minus (roughly) its position. */\r\n    max-height: 400px;\r\n    max-height: calc(100vh - 200px);\r\n    overflow-x: hidden;\r\n    overflow-y: auto;\r\n    position: absolute;\r\n    background-color: #fff;\r\n}\r\n\r\n.input-dropdown > .input-dropdown-list {\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n.input-dropdown > .input-dropdown-list > .entry {\r\n    display: flex;\r\n    flex-direction: row;\r\n    color: #000;\r\n    align-items: center;\r\n}\r\n.input-dropdown > .input-dropdown-list > .entry.selected {\r\n    background-color: #ffa;\r\n}\r\n\r\n.input-dropdown > .input-dropdown-list > .entry:hover {\r\n    background-color: #ddd;\r\n}\r\n\r\n/* Hide the button to remove history entries from non-history entries. */\r\n.input-dropdown > .input-dropdown-list > .entry:not(.history) .remove-history-entry {\r\n    display: none;\r\n}\r\n\r\n.input-dropdown > .input-dropdown-list > .entry > A.tag {\r\n    color: #000;\r\n    flex: 1;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    padding: 4px;\r\n    padding-left: 7px;\r\n}\r\n\r\n.input-dropdown > .input-dropdown-list > .entry .suggestion-icon {\r\n    margin: 2px -2px 0 2px;    \r\n}\r\n\r\n.input-dropdown > .input-dropdown-list > .entry:not(.autocomplete) .suggestion-icon {\r\n    display: none;\r\n}\r\n\r\n.input-dropdown > .input-dropdown-list .remove-history-entry {\r\n    padding: 0 8px 0px 5px;\r\n}\r\n.input-dropdown > .input-dropdown-list .remove-history-entry:hover {\r\n    color: #f33;\r\n}\r\n\r\n.manga-thumbnail-container\r\n{\r\n    position: absolute;\r\n    bottom: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 240px;\r\n    max-height: 30%;\r\n    user-select: none;\r\n    -moz-user-select: none;\r\n}\r\n\r\nbody.hide-ui .manga-thumbnail-container\r\n{\r\n    display: none;\r\n}\r\n\r\n/* The .strip container is the overall strip.  This is a flexbox that puts the nav\r\n * arrows on the outside, and the thumb strip stretching in the middle.  The thumb\r\n * strip itself is also a flexbox, for the actual thumbs. */\r\n.manga-thumbnail-container > .strip\r\n{\r\n    background-color: var(--ui-bg-color);\r\n    height: 100%;\r\n    display: flex;\r\n    flex-direction: row;\r\n\r\n    opacity: 0;\r\n    transition: transform .15s, opacity .15s;\r\n    transform: translate(0, 25px);\r\n}\r\n\r\n.manga-thumbnail-container.visible > .strip\r\n{\r\n    opacity: 1;\r\n    transform: translate(0, 0);\r\n}\r\n\r\n.manga-thumbnail-container > .strip > .manga-thumbnails {\r\n    flex: 1;\r\n\r\n    display: flex;\r\n    flex-direction: row;\r\n    overflow: hidden;\r\n    justify-content: left;\r\n    scroll-behavior: smooth;\r\n    height: 100%;\r\n    padding: 5px 0;\r\n}\r\n\r\n.manga-thumbnail-container .manga-thumbnail-box\r\n{\r\n    cursor: pointer;\r\n    height: 100%;\r\n    margin: 0 5px;\r\n\r\n    /* The first entry has the cursor inside it.  Set these to relative, so the\r\n     * cursor position is relative to it. */\r\n    position: relative;\r\n}\r\n\r\n.manga-thumbnail-container .manga-thumbnail-box img.manga-thumb\r\n{\r\n    height: 100%;\r\n    width: auto;\r\n    border-radius: 3px;\r\n\r\n    /* This will limit the width to 300px, cropping if needed.  This prevents\r\n     * very wide aspect ratio images from breaking the layout.  Only a fixed\r\n     * size will work here, percentage values won't work. */\r\n    max-width: 400px;\r\n    object-fit: cover;\r\n}\r\n\r\n.manga-thumbnail-arrow\r\n{\r\n    height: 100%;\r\n    width: 30px;\r\n    margin: 0 6px;\r\n}\r\n\r\n.manga-thumbnail-arrow > svg\r\n{\r\n    fill: #888;\r\n}\r\n.manga-thumbnail-arrow:hover > svg\r\n{\r\n    fill: #ff0;\r\n}\r\nbody.light .manga-thumbnail-arrow:hover > svg\r\n{\r\n    stroke: #aa0;\r\n}\r\n\r\n.manga-thumbnail-arrow > svg\r\n{\r\n    display: block;\r\n    height: 100%;\r\n    width: 100%;\r\n    padding: 4px;\r\n}\r\n\r\n.thumb-list-cursor\r\n{\r\n    position: absolute;\r\n    left: 0;\r\n    bottom: -6px;\r\n    width: 40px;\r\n    height: 4px;\r\n    background-color: var(--ui-fg-color);\r\n    border-radius: 2px;\r\n}\r\n\r\n/* The right click context menu for the image view: */\r\n.popup-context-menu {\r\n    color: #fff;\r\n    position: fixed;\r\n    top: 100px;\r\n    left: 350px;\r\n    text-align: left;\r\n    padding: 10px;\r\n    border-radius: 8px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    user-select: none;\r\n    -moz-user-select: none;\r\n}\r\n\r\n/* Hide the normal tooltips.  The context menu shows them differently. */\r\n.popup-context-menu .popup:hover:after {\r\n    display: none;\r\n}\r\n\r\n.popup-context-menu .tooltip-display {\r\n    display: flex;\r\n    align-items: stretch;\r\n    padding: 10px 0 0 8px;\r\n    pointer-events: none;\r\n}\r\n.popup-context-menu .tooltip-display .tooltip-display-text {\r\n    background-color: var(--frame-bg-color);\r\n    color: var(--frame-fg-color);\r\n    padding: 2px 8px;\r\n    border-radius: 4px;\r\n}\r\n\r\n.popup-context-menu .button-strip {\r\n    display: flex;\r\n    align-items: stretch;\r\n}\r\n.popup-context-menu .button-strip > .button-block {\r\n    display: inline-block;\r\n    background-color: var(--frame-bg-color);\r\n    padding: 12px;\r\n}\r\n\r\n/* Remove the double horizontal padding: */\r\n.popup-context-menu .button-strip > .button-block:not(:first-child) { padding-left: 0px; }\r\n\r\n/* Remove the double vertical padding.  Do this with a negative margin instead of zeroing\r\n * the padding, so the rounded black background stays the same size. */\r\n.popup-context-menu .button-strip:not(:last-child) > .button-block { margin-bottom: -12px; }\r\n\r\n/* Round the outer corners of each strip. */\r\n.popup-context-menu .button-strip > .button-block:first-child { border-radius: 5px 0 0 5px; }\r\n.popup-context-menu .button-strip > .button-block:last-child { border-radius: 0 5px 5px 0; }\r\n\r\n.popup-context-menu .button-strip .button {\r\n    border-radius: 4px;\r\n    padding: 6px;\r\n    height: 100%;\r\n    text-align: center;\r\n    cursor: pointer;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    background-color: var(--toggle-button-bg-dim-color);\r\n    color: var(--toggle-button-fg-dim-color);\r\n}\r\n\r\n/* Grey out the buttons if this strip isn't enabled. */\r\n.popup-context-menu .button-strip .button:not(.enabled)\r\n{\r\n    cursor: inherit;\r\n    color: var(--toggle-button-fg-disabled-color);\r\n}\r\n.popup-context-menu .button-strip .button > * {\r\n    min-width: 32px;\r\n}\r\n.popup-context-menu .button-strip .button > svg {\r\n    width: 32px;\r\n    height: 32px;\r\n}\r\n\r\n.popup-context-menu .button-strip .button.enabled:hover {\r\n    color: var(--toggle-button-fg-color);\r\n}\r\n.popup-context-menu .button-strip .button.enabled.selected {\r\n    background-color: var(--toggle-button-bg-color);\r\n    color: var(--toggle-button-fg-color);\r\n}\r\n\r\n/* We don't have a way to add classes to inlined SVGs yet, so for now just use nth-child.\r\n   The first child is the + icon and the second child is -. */\r\n.popup-context-menu .button-strip .button.button-zoom:not(.selected) > :nth-child(1) { display: none; }\r\n.popup-context-menu .button-strip .button.button-zoom.selected > :nth-child(2) { display: none; }\r\n\r\n/* Popup menu bookmarking */\r\n.popup-context-menu .button-strip .button .tag-dropdown-arrow {\r\n    width: 0; \r\n    height: 0; \r\n    border-top: 10px solid #222;\r\n    border-left: 10px solid transparent;\r\n    border-right: 10px solid transparent;\r\n}\r\nbody.light .popup-context-menu .button-strip .button .tag-dropdown-arrow {\r\n    border-top-color: #ccc;\r\n}\r\n\r\n.popup-context-menu .context-menu-image-info {\r\n    /* Bottom align within the row. */\r\n    align-self: flex-end;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    background-color: var(--box-link-bg-color);\r\n    padding-right: 8px;\r\n}\r\n.popup-context-menu .context-menu-image-info > * {\r\n    background-color: var(--box-link-bg-color);\r\n    color: var(--box-link-fg-color);\r\n    padding: 2px 0 0px 0px;\r\n    font-size: .8em;\r\n    font-weight: bold;\r\n}\r\n\r\n.popup-bookmark-tag-dropdown {\r\n    background-color: var(--frame-bg-color);\r\n    color: var(--frame-fg-color);\r\n    position: absolute;\r\n    padding: 4px;\r\n    top: calc(100%);\r\n    left: 0;\r\n    border-radius: 0px 0px 4px 4px;\r\n\r\n    /* Put this on top of other elements, like the image-ui tag list. */\r\n    z-index: 1;\r\n}\r\n/* In the context menu version, nudge the tag dropdown up slightly to cover\r\n * the rounded corners. */\r\n.popup-context-menu .popup-bookmark-tag-dropdown {\r\n    top: calc(100% - 4px);\r\n}\r\n\r\n.popup-bookmark-tag-dropdown > .tag-list {\r\n    display: flex;\r\n    flex-direction: column;\r\n    max-height: 200px;\r\n    min-width: 200px;\r\n    overflow-x: hidden;\r\n    overflow-y: auto;\r\n}\r\n\r\n.popup-bookmark-tag-dropdown > .tag-right-button-strip {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 100%;\r\n    background-color: var(--frame-bg-color);\r\n    color: var(--frame-fg-color);\r\n    display: flex;\r\n    flex-direction: column;    \r\n}\r\n.popup-bookmark-tag-dropdown > .tag-right-button-strip .tag-button {\r\n    cursor: pointer;\r\n}\r\n\r\n.button.button-bookmark,\r\n.button.button-like\r\n{\r\n    /* Center the count text. */\r\n}\r\n.button.button-bookmark .count,\r\n.button.button-like .count\r\n{\r\n    color: var(--minor-text-fg-color);\r\n\r\n    text-shadow:\r\n        0px 1px 1px var(--minor-text-shadow-color),\r\n        0px -1px 1px var(--minor-text-shadow-color),\r\n        1px 0px 1px var(--minor-text-shadow-color),\r\n        -1px 0px 1px var(--minor-text-shadow-color);\r\n    font-size: .7em;\r\n    font-weight: bold;\r\n    position: absolute;\r\n    top: calc(100% - 14px);\r\n    left: 0;\r\n    width: 100%;\r\n    text-align: center;\r\n}\r\n\r\n.ui-box .button > svg {\r\n    display: block;\r\n}\r\n\r\n.ui-box .button.button-bookmark .count,\r\n.ui-box .button.button-like .count\r\n{\r\n    top: calc(100% - 11px);\r\n    left: calc(-50px + 50%)\r\n    width: 100px;\r\n    pointer-events: none;\r\n}\r\n\r\n/* Nudge the public heart icon up a bit to make room for the bookmark count. \r\n * Only do this on the popup menu, not image-ui. */\r\n.popup-context-menu .button.button-bookmark.public > svg\r\n{\r\n    margin-top: -10px;\r\n}\r\n.popup-context-menu .button.button-like > svg\r\n{\r\n    margin-top: -2px;\r\n}\r\n\r\n/* Bookmark buttons.  These appear in image_ui and the popup menu. */\r\n.button.button-bookmark.will-delete.enabled:hover svg.heart-image .delete {\r\n    display: inline;\r\n}\r\n\r\n/* Hide the \"delete\" stroke over the heart icon unless clicking the button will\r\n * remove the bookmark. */\r\nsvg.heart-image .delete {\r\n    display: none;\r\n}\r\n\r\n/* These are !important to override the default white coloring in the context\r\n * menu. */\r\n.button-bookmark {\r\n    color: #400 !important;\r\n}\r\n.button-bookmark.enabled {\r\n    color: #800 !important;\r\n    stroke: none;\r\n}\r\n.button-bookmark.bookmarked,\r\n.button-bookmark.enabled:hover {\r\n    color: #f00 !important;\r\n    stroke: none;\r\n}\r\n/* Add a stroke around the heart on thumbnails for visibility.  Don't\r\n * change the black lock. */\r\n.view-search-container .thumbnails .button-bookmark svg > .heart {\r\n    stroke: #000;\r\n    stroke-width: .5px;\r\n}\r\n\r\n/* This is a pain due to transition bugs in Firefox.  It doesn't like having\r\n * transition: transform on both an SVG and on individual paths inside the\r\n * SVG and clips the image incorrectly during the animation.  Work around this\r\n * by only placing transitions on the paths. */\r\n.button.button-like > svg {\r\n    color: var(--like-button-color);\r\n}\r\n\r\n.button.button-like.liked > svg {\r\n    color: var(--like-button-liked-color);\r\n}\r\n.button.button-like.enabled:hover > svg {\r\n    color: var(--like-button-hover-color);\r\n}\r\n\r\n.button.button-like               > svg > * {\r\n    transition: transform ease-in-out .15s;\r\n    transform: translate(0, 0px);\r\n}\r\n.button.button-like               > svg > .mouth {\r\n    transform: scale(1, .75);\r\n}\r\n\r\n.button.button-like.liked         > svg > * {\r\n    transform: translate(0, -3px);\r\n}\r\n.button.button-like.liked         > svg > .mouth {\r\n    transform: scale(1, 1.1) translate(0, -3px);\r\n}\r\n.button.button-like.enabled:hover > svg > * {\r\n    transform: translate(0, -2px);\r\n}\r\n.button.button-like.enabled:hover > svg > .mouth {\r\n    transform: scale(1, .9) translate(0, -3px);\r\n}\r\n.button-bookmark.public svg.heart-image .lock {\r\n    display: none;\r\n}\r\n.button-bookmark svg.heart-image .lock {\r\n    stroke: #888;\r\n}\r\n.view-manga-container {\r\n    width: 100%;\r\n    height: 100%;\r\n    overflow-x: hidden;\r\n    overflow-y: scroll;\r\n}\r\n\r\n.view-manga-container > .thumbnails {\r\n    width: 100%;\r\n    text-align: center;\r\n\r\n    /* If we don't fill the screen, center. */\r\n    margin: 0 auto;\r\n}\r\n.view-manga-container > .thumbnails {\r\n    width: 100%;\r\n}\r\n\r\n.view-manga-container li.thumbnail-box {\r\n    /* The size of .thumbnail-box is set to the dimensions of each thumb, not\r\n     * including padding, so set box-sizing to content-box. */\r\n//    box-sizing: content-box;\r\n}\r\n/* .thumbnail-inner centers each thumb in the box, and aligns it to the bottom. */\r\n/*\r\n * .view-manga-container li.thumbnail-box > .thumbnail-inner {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    height: 100%;\r\n    width: 100%;\r\n}\r\n\r\n.view-manga-container img.thumb {\r\n    border-radius: 4px;\r\n    display: block;\r\n}\r\n.view-manga-container li.thumbnail-box {\r\n    display: inline-block;\r\n    padding: .5em;\r\n    vertical-align: bottom;\r\n}\r\n*/\r\n", 
    "main.html": "<div class=\"main-container noise-background\">\r\n    <div class=hover-message>\r\n        <div class=message></div>\r\n    </div>\r\n\r\n    <div class=loading-progress-bar></div>\r\n\r\n    <!-- main_ui: -->\r\n    <div class=\"view view-illust-container\">\r\n        <div class=image-container data-context-menu-target></div>\r\n\r\n        <div class=ugoira-seek-bar></div>\r\n\r\n        <!-- This covers the progress bar. -->\r\n        <div class=manga-thumbnail-container hidden>\r\n            <div class=strip>\r\n                <div class=manga-thumbnail-arrow data-direction=left>\r\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"100\" viewBox=\"0 0 20 100\">\r\n                        <path d=\"M 0 50 L 20 0 L 20 100 L 0 50\" />\r\n                    </svg>\r\n                </div>\r\n\r\n                <div class=manga-thumbnails></div>\r\n\r\n                <div class=manga-thumbnail-arrow data-direction=right>\r\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"100\" viewBox=\"0 0 20 100\">\r\n                        <path d=\"M 20 50 L 0 0 L 0 100 L 20 50\" />\r\n                    </svg>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=ui>\r\n            <div class=hover-sphere>\r\n                <svg viewBox=\"0 0 1 1\" preserveAspectRatio=\"none\">\r\n                    <circle class=hover-circle cx=\"0.5\" cy=\"0.5\" r=\".5\" fill-opacity=\"0\" />\r\n                </svg>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- thumbnail_view: -->\r\n    <div class=\"view view-search-container\" data-context-menu-target hidden>\r\n        <div class=thumbnail-ui>\r\n            <div style=\"flex: 1;\"></div>\r\n\r\n            <div class=thumbnail-ui-box data-context-menu-target=off>\r\n                <div class=\"data-source-specific avatar-container\" data-datasource=\"artist illust bookmarks\"></div>\r\n                <a href=# class=\"data-source-specific image-for-suggestions\" data-datasource=related-illusts>\r\n                    <!-- A blank image, so we don't load anything: -->\r\n                    <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==\">\r\n                </a>\r\n\r\n                <div style=\"display: flex; flex-direction: row; align-items: center;\">\r\n                    <div class=\"displaying title-font\"></div>\r\n                    <div style=\"flex: 1;\"></div>\r\n                    <div>\r\n                        <a href=# rel=noreferrer class=\"webpage-link grey-icon popup popup-bottom\" data-popup=\"Webpage\" hidden>\r\n                            <svg viewBox=\"0 0 391.08 391.08\" style=\"fill: currentColor;\">\r\n                                <path d=\"M326.67,203.55L200.38,91.71,74,203.6V363.47a7.44,7.44,0,0,0,7.46,7.45h79v-70.1a7.44,7.44,0,0,1,7.45-7.46h64.88a7.44,7.44,0,0,1,7.45,7.46v70.1h79a7.42,7.42,0,0,0,7.45-7.45V203.55Z\" transform=\"translate(-4.8 -5.17)\"/>\r\n                                <path d=\"M199.65,30.51L20.44,189.19l18.88,21.29L200.38,67.86l161,142.62,18.84-21.29L201.08,30.51l-0.7.81-0.73-.81h0Z\" transform=\"translate(-4.8 -5.17)\"/>\r\n                            </svg>\r\n                        </a>\r\n                    </div>\r\n                    <div>\r\n                        <a href=# rel=noreferrer class=\"twitter-icon grey-icon popup popup-bottom\" data-popup=\"Twitter\" hidden>\r\n                            <svg viewBox=\"0 0 32 32\" style=\"fill: currentColor;\">\r\n                                <path d=\"M3,24.3115115 C3.43335894,24.361638 3.8743224,24.3872818 4.32140898,24.3872818 C6.9166246,24.3872818 9.30513552,23.5195519 11.2009327,22.063852 C8.77696697,22.0200155 6.73125206,20.4508052 6.02640184,18.2943991 C6.36455613,18.3577829 6.71159881,18.391749 7.0685175,18.391749 C7.57377373,18.391749 8.0631296,18.325462 8.52799298,18.2014038 C5.99381104,17.7028486 4.0844837,15.5090896 4.0844837,12.8792882 C4.0844837,12.8564507 4.0844837,12.8337099 4.08487874,12.8110659 C4.83180072,13.2175936 5.68587732,13.4617424 6.59397564,13.4899022 C5.10763744,12.5165971 4.12961703,10.8552624 4.12961703,8.97222947 C4.12961703,7.97753828 4.40278723,7.04516649 4.87960057,6.24352996 C7.61169757,9.52729793 11.6933502,11.6881554 16.2971469,11.9144987 C16.2027324,11.5172609 16.1536486,11.1029917 16.1536486,10.6775941 C16.1536486,7.68016635 18.6339076,5.25 21.6931965,5.25 C23.2863931,5.25 24.7260178,5.90919218 25.7365302,6.96407385 C26.9982882,6.7206024 28.1838034,6.26888351 29.2540656,5.64694749 C28.8404587,6.91433445 27.9621859,7.97802213 26.8184462,8.64979431 C27.9389773,8.5185752 29.006573,8.22681589 30,7.79512823 C29.2573247,8.88358883 28.318117,9.83957232 27.2359048,10.6048236 C27.2465708,10.8375537 27.2519039,11.0716385 27.2519039,11.3069813 C27.2519039,18.4794219 21.680259,26.75 11.4913859,26.75 C8.36316252,26.75 5.45142105,25.8514974 3,24.3115115 Z\"></path>\r\n                            </svg>\r\n\r\n                        </a>\r\n                    </div>\r\n\r\n                    <div>\r\n                        <a href=# rel=noreferrer class=\"pawoo-icon grey-icon popup popup-bottom\" data-popup=\"Pawoo\" hidden>\r\n                            <svg viewBox=\"0 0 32 32\" style=\"fill: currentColor;\">\r\n                                <path d=\"M10.3476651,20.4315053 C10.236482,20.1792053 10.1733587,19.8903171 10.1733587,19.5833313 C10.1733587,18.5973729 10.8244928,17.7980957 11.6277074,17.7980957 C12.4309221,17.7980957 13.0820562,18.5973729 13.0820562,19.5833313 C13.0820562,20.3254493 12.7131643,20.9618053 12.1881895,21.231173 C12.819893,21.2267209 13.5009406,21.0038384 13.9222139,20.4926667 C14.3477875,19.976277 14.5364049,19.090237 14.5364049,18.2444046 C14.5364049,16.5948203 13.4764192,15.2575681 12.1688604,15.2575681 C10.8613017,15.2575681 9.80131596,16.5948203 9.80131596,18.2444046 C9.80131596,19.0237627 9.91081955,19.8357213 10.2983538,20.3675564 C10.3141301,20.3892071 10.3305786,20.4105263 10.3476651,20.4315053 Z M8.13963596,11.0814764 C8.8405586,10.089699 10.2489357,8.48847029 11.698583,7.6886383 C13.1482303,6.88880632 15.2673577,6.22130239 18.2564056,6.46548663 C21.2454536,6.70967086 22.8162796,7.96301699 23.5927252,8.58716521 C24.3691709,9.21131343 25.365798,10.5724763 25.9412244,12.2185477 C26.5166508,13.864619 27.0041475,15.5937822 26.9990127,18.2190273 C26.9938779,20.8442725 26.4501111,22.9685845 25.1117422,24.1927619 C25.0779164,24.2237017 25.0437394,24.2540809 25.0092259,24.2838991 C23.6781605,25.433881 21.8465608,25.7492991 20.3552956,25.1953478 C18.825363,24.6270329 18.4868407,24.0816021 18.0402519,22.9515738 C17.5936631,21.8215455 17.4095505,20.0833607 17.4119551,18.8539433 C17.4143598,17.6245259 17.4847587,17.4976298 17.4859864,16.8699608 C17.4872141,16.2422917 17.0925209,16.2866811 17.0181495,16.8545227 C16.943778,17.4223642 16.8999846,18.1219102 16.8991489,18.5491704 C16.8980863,19.0924745 16.9318342,20.5023058 17.0095249,21.2639909 C17.0872155,22.0256759 17.3250405,23.186485 17.5639667,23.742337 C17.8028929,24.2981891 18.2596324,24.969782 18.2596324,24.969782 C18.2596324,24.969782 17.2268799,25.5232236 15.1979421,25.5638493 C13.1690043,25.604475 12.0354896,25.5888525 10.3448228,25.4037017 C8.65415608,25.2185509 6.60359439,24.7683126 5.23999895,24.2321671 C3.87640351,23.6960216 3.18815991,23.2009837 2.22325411,22.3077434 C1.25834832,21.414503 0.483604407,20.0592237 1.3922294,19.429012 C2.30085438,18.7988004 2.60049796,19.3514851 3.02157079,19.6960499 C3.2957586,19.9204183 3.83490894,20.4853046 4.65914893,20.7784678 C5.48338892,21.0716311 5.7352815,21.0703736 6.17206905,20.7754677 C6.77989521,20.3650817 6.49337645,18.1572476 6.49481705,17.6582474 C6.49625766,17.1592472 6.42964834,15.4386273 6.79203089,14.1605028 C7.15441345,12.8823783 7.43871331,12.0732538 8.13963596,11.0814764 Z\"></path>\r\n                            </svg>\r\n                        </a>\r\n                    </div>\r\n                    \r\n                    <div>\r\n                        <a class=\"bookmarks-link grey-icon popup popup-bottom\" href=# rel=noreferrer data-popup=\"View bookmarks\" hidden>\r\n                            <svg viewBox=\"0 0 510 510\" style=\"width: 28px; fill: currentColor;\">\r\n                                <path d=\"M510,197.472l-183.37-15.734L255,12.75l-71.629,168.988L0,197.472l139.103,120.539L97.41,497.25L255,402.186 l157.59,95.064l-41.692-179.239L510,197.472z M255,354.348l-95.957,57.886l25.398-109.166l-84.736-73.389l111.69-9.588 L255,117.172l43.605,102.918l111.689,9.588l-84.711,73.389l25.398,109.166L255,354.348z\"\r\n                                />\r\n                            </svg>\r\n                        </a>\r\n                    </div>\r\n                    <div>\r\n                        <a class=\"contact-link grey-icon popup popup-bottom\" href=# rel=noreferrer data-popup=\"Send a message\" hidden>\r\n                            <svg viewBox=\"0 0 114 114\" stroke=\"currentColor\">\r\n                                <path stroke-width=\"7\" fill=\"none\" d=\"m7,20h98v72H7zl44,44q5,4 10,0l44-44M7,92l36-36m26,0 36,36\"/>\r\n                            </svg>\r\n                        </a>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=button-row>\r\n                    <a class=\"disable-ui-button popup\" data-popup=\"Return to Pixiv\" href=\"#no-ppixiv\" style=\"margin-right: -2px;\">\r\n<svg xmlns=\"http://www.w3.org/2000/svg\"\r\n    class=\"pixiv-icon icon-button grey-icon\"\r\n    width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"currentColor\">\r\n    <path d=\"\r\n    M 21.965 8.432\r\n    a 7.341 7.341 0 0 1 2.5435 5.5925\r\n    c 0.0065 2.2265 -1.059 4.174 -2.712 5.4785\r\n    c -1.653 1.312 -3.875 2.038 -6.318 2.038\r\n    c -2.78 0 -5.359 -1.0115 -5.359 -1.0115\r\n    v 3.2635\r\n    c 0.4765 0.1395 1.2585 0.438 0.762 0.9345\r\n    H 7.12\r\n    c -0.4915 -0.4915 0.23 -0.781 0.775 -0.935\r\n    V 9.959\r\n    c -1.265 0.9715 -1.9135 1.8135 -2.245 2.4385\r\n    c 0.384 1.2235 -0.3405 1.163 -0.3405 1.163\r\n    L 4 11.4825\r\n    s 4.647 -5.2685 11.4785 -5.2685\r\n    c 2.621 0 4.8765 0.8115 6.4865 2.218\r\n    z\r\n    m -1.993 9.979\r\n    c 1.143 -1.1375 1.785 -2.6205 1.792 -4.4215\r\n    c -0.0055 -1.848 -0.6065 -3.438 -1.7065 -4.635\r\n    c -1.1025 -1.1895 -2.7325 -1.9735 -4.8085 -1.975\r\n    c -1.709 -0.0035 -3.825 0.5675 -5.1295 1.494\r\n    v 10.379\r\n    c 1.189 0.585 2.99 0.9995 5.1295 0.998\r\n    c 3.835.003 3.58 -0.712 4.723 -1.84\r\n    z\r\n    M 23.835 6.214\r\n    \"/>\r\n</svg>\r\n\n                    </a>\r\n\r\n                    <div class=\"navigation-menu-box popup\" data-popup=\"Search\">\r\n                        <svg class=\"menu-button icon-button grey-icon\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" style=\"fill: currentColor;\">\r\n                            <path d=\"M 6 7 h 20 v 4 h -20 v -4\"/>\r\n                            <path d=\"M 6 14 h 20 v 4 h -20 v -4\"/>\r\n                            <path d=\"M 6 21 h 20 v 4 h -20 v -4\"/>\r\n                        </svg>\r\n                        <div class=\"popup-menu-box\">\r\n                            <div class=option-list>\r\n                                <a class=box-link href=\"/new_illust.php#ppixiv\">New works</a>\r\n                                <a class=box-link href=\"/bookmark_new_illust.php#ppixiv\">New works by following</a>\r\n                                <div style=\"display: flex; flex-direction: row; align-items: baseline;\">\r\n                                    <a class=box-link href=\"/bookmark.php?p=1#ppixiv\">Bookmarks</a>\r\n                                    <div style=\"flex: 1;\"></div>\r\n                                    <a class=\"box-link small-font\" href=\"/bookmark.php?p=1#ppixiv\">all</a>\r\n                                    <a class=\"box-link small-font\" href=\"/bookmark.php?p=1#ppixiv?show-all=0\">public</a>\r\n                                    <a class=\"box-link small-font\" href=\"/bookmark.php?p=1&rest=hide#ppixiv?show-all=0\">private</a>\r\n                                </div>\r\n                                <a class=box-link href=\"/discovery#ppixiv\">Recommended works</a>\r\n                                <a class=box-link href=\"/ranking.php#ppixiv\">Rankings</a>\r\n\r\n                                <div class=\"navigation-search-box\" style=\"padding: .25em; margin: .25em;\">\r\n                                    <div class=search-box>\r\n                                        <input class=\"search-tags keep-menu-open\" placeholder=Search>\r\n                                        <span class=search-submit-button>\ud83d\udd0d</span>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"refresh-search-button popup\" data-popup=\"Refresh\">\r\n                        <div class=\"menu-button grey-icon icon-button\">\r\n<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<svg\r\n   xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\r\n   xmlns:cc=\"http://creativecommons.org/ns#\"\r\n   xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\r\n   xmlns:svg=\"http://www.w3.org/2000/svg\"\r\n   xmlns=\"http://www.w3.org/2000/svg\"\r\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\r\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\r\n   width=\"32px\"\r\n   height=\"32px\"\r\n   viewBox=\"0 0 32 32\"\r\n   fill=\"currentColor\"\r\n   version=\"1.1\"\r\n   id=\"svg1420\"\r\n   sodipodi:docname=\"refresh-icon.svg\"\r\n   inkscape:version=\"0.92.3 (2405546, 2018-03-11)\">\r\n  <metadata\r\n     id=\"metadata1426\">\r\n    <rdf:RDF>\r\n      <cc:Work\r\n         rdf:about=\"\">\r\n        <dc:format>image/svg+xml</dc:format>\r\n        <dc:type\r\n           rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\" />\r\n      </cc:Work>\r\n    </rdf:RDF>\r\n  </metadata>\r\n  <defs\r\n     id=\"defs1424\" />\r\n  <sodipodi:namedview\r\n     pagecolor=\"#ffffff\"\r\n     bordercolor=\"#666666\"\r\n     borderopacity=\"1\"\r\n     objecttolerance=\"10\"\r\n     gridtolerance=\"10\"\r\n     guidetolerance=\"10\"\r\n     inkscape:pageopacity=\"0\"\r\n     inkscape:pageshadow=\"2\"\r\n     inkscape:window-width=\"1920\"\r\n     inkscape:window-height=\"1137\"\r\n     id=\"namedview1422\"\r\n     showgrid=\"false\"\r\n     inkscape:zoom=\"20\"\r\n     inkscape:cx=\"15.106191\"\r\n     inkscape:cy=\"12.284971\"\r\n     inkscape:window-x=\"1912\"\r\n     inkscape:window-y=\"-8\"\r\n     inkscape:window-maximized=\"1\"\r\n     inkscape:current-layer=\"svg1420\" />\r\n  <path\r\n     d=\"m 26.276037,5.3768832 c -1.025134,1.0011097 -2.02431,2.0295002 -3.045196,3.0348589 -0.04956,0.058054 -0.106666,-0.00755 -0.14584,-0.040119 C 21.928138,7.2398222 20.508951,6.3760574 18.96837,5.877697 17.193738,5.3037727 15.265759,5.2136254 13.444872,5.6138616 10.203806,6.3062518 7.36529,8.6372987 6.0612647,11.683911 c 0.00146,6.57e-4 0.00293,0.0011 0.0044,0.0018 -0.1085548,0.214135 -0.1701475,0.456213 -0.1701475,0.712685 0,0.871977 0.7068799,1.57881 1.5788103,1.57881 0.7471862,0 1.3726975,-0.519269 1.5365211,-1.216426 0.9324853,-1.981309 2.7767344,-3.5136299 4.9070024,-4.0366749 2.46372,-0.6215932 5.256407,0.062775 7.051336,1.8898429 -1.039766,1.030325 -2.095153,2.045548 -3.130623,3.080121 2.809206,-0.01511 5.619357,-0.0066 8.429036,-0.0043 0.02356,-2.770504 0.0065,-5.5419533 0.0085,-8.3129769 z\"\r\n     id=\"path1416\"\r\n     inkscape:connector-curvature=\"0\"\r\n     style=\"stroke-width:0.0471977\" />\r\n  <path\r\n     d=\"m 23.993462,17.899375 c -0.690029,0 -1.276273,0.442856 -1.491023,1.05973 -4.1e-4,-1.89e-4 -9.03e-4,-3.84e-4 -0.0013,-5.76e-4 -0.901948,2.010149 -2.717172,3.59736 -4.853811,4.161892 -2.491991,0.675447 -5.354578,0.01412 -7.182498,-1.843116 1.034573,-1.027022 2.094115,-2.029973 3.123969,-3.061668 -2.817703,0.0023 -5.6358774,0.0014 -8.45358,4.67e-4 -0.00661,2.765785 -0.00751,5.53105 5.212e-4,8.296835 1.0345736,-1.034101 2.0648989,-2.072451 3.105136,-3.100841 0.6659124,0.650808 1.4046034,1.230444 2.2145168,1.692933 2.583554,1.508958 5.824147,1.821926 8.651289,0.844414 2.712782,-0.910774 5.006402,-2.981856 6.192904,-5.584336 0.172054,-0.252838 0.272633,-0.558065 0.272633,-0.886987 4.6e-5,-0.871882 -0.706833,-1.578763 -1.578764,-1.578763 z\"\r\n     id=\"path1418\"\r\n     inkscape:connector-curvature=\"0\"\r\n     style=\"stroke-width:0.0471977\" />\r\n</svg>\r\n\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"thumbnail-settings-menu-box settings-menu-box popup\" data-popup=\"Preferences\">\r\n                        <div class=\"menu-button grey-icon icon-button\">\r\n<svg xmlns=\"http://www.w3.org/2000/svg\"\r\n    class=\"menu-button grey-icon icon-button\" width=\"32\" height=\"32\" viewbox=\"0 0 32 32\" style=\"fill: currentColor; transform-origin: 16px 16px;\">\r\n    <path d=\"\r\n    m 27,17.88\r\n    l 0,-4.112\r\n    l -2.52,-0.4224\r\n    c -0.1872,-0.704 -0.4672,-1.3568 -0.7936,-1.92\r\n    l 1.488,-2.056\r\n    l -2.896,-2.944\r\n    l -2.096,1.4528\r\n    c -0.608,-0.328 -1.264,-0.608 -1.9136,-0.7952\r\n    l -0.4144,-2.4832\r\n    l -4.1088,0\r\n    l -0.4208,2.5248\r\n    c -0.6992,0.1872 -1.3056,0.4688 -1.9136,0.7952\r\n    l -2.0512,-1.448\r\n    l -2.9408,2.896\r\n    l 1.4944,2.0592\r\n    c -0.32,0.608 -0.6016,1.264 -0.7888,1.9648\r\n    l -2.5248,0.376\r\n    l 0,4.112\r\n    l 2.52,0.4224\r\n    c 0.1872,0.7008 0.4672,1.3088 0.7936,1.9168\r\n    l -1.488,2.104\r\n    l 2.8944,2.9008\r\n    l 2.0992,-1.5008\r\n    c 0.608,0.328 1.2592,0.608 1.9584,0.7952\r\n    l 0.416,2.4816\r\n    l 4.1056,0\r\n    l 0.4208,-2.5248\r\n    c 0.6528,-0.1872 1.3072,-0.4688 1.9136,-0.7952\r\n    l 2.104,1.496\r\n    l 2.896,-2.8992\r\n    l -1.496,-2.104\r\n    c 0.3248,-0.608 0.608,-1.216 0.792,-1.92\r\n    l 2.4704,-0.368\r\n    l 0,-0.0048\r\n    z\r\n    m -11.2,2.2512\r\n    c -2.3808,0 -4.2928,-1.92 -4.2928,-4.304\r\n    s 1.96,-4.304 4.2928,-4.304\r\n    c 2.3328,0 4.2928,1.9168 4.2928,4.304\r\n    c 0,2.384 -1.912,4.3008 -4.2928,4.3008\r\n    l 0,0.0032\r\n    z\"/>\r\n</svg>\r\n\r\n\n                        </div>\r\n                        \r\n                        <div class=\"popup-menu-box keep-menu-open\">\r\n                            <div class=option-list></div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"data-source-specific\" data-datasource=discovery>\r\n                    <a class=\"box-link popup\" data-type=all data-popup=\"Show all works\" href=\"?mode=all#ppixiv\">All</a>\r\n                    <a class=\"box-link popup\" data-type=safe data-popup=\"Show all-ages works\" href=\"?mode=safe#ppixiv\">All ages</a>\r\n                    <a class=\"box-link popup r18\" data-type=r18 data-popup=\"Show R18 works\" href=\"?mode=r18#ppixiv\">R18</a>\r\n                </div>\r\n\r\n                <div class=\"data-source-specific\" data-datasource=new_illust>\r\n                    <a class=\"box-link popup\" data-type=new-illust-type-all data-popup=\"Show all works\" href=\"#\">All</a>\r\n                    <a class=\"box-link popup\" data-type=new-illust-type-illust data-popup=\"Show illustrations only\" href=\"#\">Illustrations</a>\r\n                    <a class=\"box-link popup\" data-type=new-illust-type-manga data-popup=\"Show manga only\" href=\"#\">Manga</a>\r\n                    <a class=\"box-link popup\" data-type=new-illust-type-ugoira data-popup=\"Show ugoira only\" href=\"#\">Ugoira</a>\r\n\r\n                    <a class=\"box-link popup\" data-type=new-illust-ages-all data-popup=\"Show all-ages works\" href=\"#\">All ages</a>\r\n                    <a class=\"box-link popup r18\" data-type=new-illust-ages-r18 data-popup=\"Show R18 works\" href=\"#\">R18</a>\r\n                </div>\r\n                \r\n                <div class=\"data-source-specific\" data-datasource=rankings>\r\n                    <div>\r\n                        <span class=nav-tomorrow>\r\n                            <a class=\"box-link popup\" data-popup=\"Show the next day\" href=\"#\">Next day</a>\r\n                        </span>\r\n\r\n                        <span class=nav-today></span>\r\n\r\n                        <span class=nav-yesterday> <!-- so box-link's display style doesn't override hidden -->\r\n                            <a class=\"box-link popup\" data-popup=\"Show the previous day\" href=\"#\">Previous day</a>\r\n                        </span>\r\n                    </div>\r\n\r\n                    <div class=\"checked-links\">\r\n                        <a class=\"box-link popup\" data-type=content-all data-popup=\"Show all works\" href=\"#\">All</a>\r\n                        <a class=\"box-link popup\" data-type=content-illust data-popup=\"Show illustrations only\" href=\"#\">Illustrations</a>\r\n                        <a class=\"box-link popup\" data-type=content-ugoira data-popup=\"Show ugoira only\" href=\"#\">Ugoira</a>\r\n                        <a class=\"box-link popup\" data-type=content-manga data-popup=\"Show manga only\" href=\"#\">Manga</a>\r\n                    </div>\r\n\r\n                    <div class=\"checked-links\">\r\n                        <a class=\"box-link popup\" data-type=mode-daily data-popup=\"Daily rankings\" href=\"#\">Daily</a>\r\n                        <a class=\"box-link popup r18\" data-type=mode-daily-r18 data-popup=\"Show R18 works (daily only)\" href=\"#\">R18</a>\r\n                        <a class=\"box-link popup r18g\" data-type=mode-r18g data-popup=\"Show R18G works (weekly only)\" href=\"#\">R18G</a>\r\n                        <a class=\"box-link popup\" data-type=mode-weekly data-popup=\"Weekly rankings\" href=\"#\">Weekly</a>\r\n                        <a class=\"box-link popup\" data-type=mode-monthly data-popup=\"Monthly rankings\" href=\"#\">Monthly</a>\r\n                        <a class=\"box-link popup\" data-type=mode-rookie data-popup=\"Rookie rankings\" href=\"#\">Rookie</a>\r\n                        <a class=\"box-link popup\" data-type=mode-male data-popup=\"Popular among males\" href=\"#\">Male</a>\r\n                        <a class=\"box-link popup\" data-type=mode-female data-popup=\"Popular among females\" href=\"#\">Female</a>\r\n                    </div>\r\n                </div>\r\n                 \r\n                <div class=\"data-source-specific\" data-datasource=bookmarks>\r\n                    <div class=bookmarks-public-private>\r\n                        <a class=\"box-link popup\" data-type=all data-popup=\"Show all bookmarks\" href=#>All</a>\r\n                        <a class=\"box-link popup\" data-type=public data-popup=\"Show public bookmarks\" href=#>Public</a>\r\n                        <a class=\"box-link popup\" data-type=private data-popup=\"Show private bookmarks\" href=#>Private</a>\r\n                    </div>\r\n                </div>                \r\n\r\n                <div class=\"data-source-specific\" data-datasource=\"bookmarks bookmarks_new_illust\">\r\n                    <div class=bookmark-tag-selection>\r\n                        <span>Bookmark tags:</span>\r\n                        <span class=bookmark-tag-list></span>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"data-source-specific\" data-datasource=artist>\r\n                    <div class=search-options-row>\r\n                        <a class=\"box-link popup\" data-type=artist-works data-popup=\"Show all works\" href=#>Works</a>\r\n                        <a class=\"box-link popup\" data-type=artist-illust data-popup=\"Show illustrations only\" href=#>Illusts</a>\r\n                        <a class=\"box-link popup\" data-type=artist-manga data-popup=\"Show manga only\" href=#>Manga</a>\r\n\r\n                        <div class=member-tags-box>\r\n                            <div class=\"menu-button box-link\">Tags</div>\r\n                            <div class=\"popup-menu-box post-tag-list\"></div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                 \r\n                <div class=\"data-source-specific\" data-datasource=search>\r\n                    <div class=\"search-page-tag-entry search-box\">\r\n                        <div class=\"tag-search-box hover-menu-box\">\r\n                            <input class=search-tags placeholder=Tags>\r\n                            <span class=search-submit-button>\ud83d\udd0d</span>\r\n                        </div>\r\n\r\n                        <div class=search-tags-box style=\"display: inline-block;\">\r\n                            <div class=\"menu-button box-link\">Related tags</div>\r\n                            <div class=\"popup-menu-box related-tag-list\"></div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <!-- We don't currently have popup text for these, since it's a little annoying to\r\n                         have it pop over the menu. -->\r\n                    <div class=search-options-row>\r\n                        <div class=ages-box>\r\n                            <span class=\"menu-button box-link\">Ages</span>\r\n                            <div class=\"popup-menu-box\">\r\n                                <div class=option-list>\r\n                                    <a class=box-link data-type=ages-all data-default=1 href=\"?mode=all#ppixiv\">All</a>\r\n                                    <a class=box-link data-type=ages-safe href=\"?mode=safe#ppixiv\">All ages</a>\r\n                                    <a class=\"box-link r18\" data-type=ages-r18 href=\"?mode=r18#ppixiv\">R18</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                       \r\n                        <div class=popularity-box>\r\n                            <span class=\"menu-button box-link\">Popularity</span>\r\n                            <div class=\"popup-menu-box\">\r\n                                <div class=option-list>\r\n                                    <a class=box-link data-type=order-newest data-default=1 href=\"?order=all#ppixiv\">Newest</a>\r\n                                    <a class=box-link data-type=order-oldest data-default=1 href=\"?order=all#ppixiv\">Oldest</a>\r\n                                    <a class=\"box-link premium-only\" data-type=order-male href=\"?order=popular_male_d#ppixiv\">Male</a>\r\n                                    <a class=\"box-link premium-only\" data-type=order-female href=\"?order=popular_female_d#ppixiv\">Female</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=type-box>\r\n                            <span class=\"box-link menu-button\">Type</span>\r\n                            <div class=\"popup-menu-box\">\r\n                                <div class=option-list>\r\n                                    <a class=box-link data-type=search-type-all data-default=1 href=\"?type=all#ppixiv\">All</a>\r\n                                    <a class=box-link data-type=search-type-illust href=\"?type=illust#ppixiv\">Illustrations</a>\r\n                                    <a class=box-link data-type=search-type-manga href=\"?type=manga#ppixiv\">Manga</a>\r\n                                    <a class=box-link data-type=search-type-ugoira href=\"?type=ugoira#ppixiv\">Ugoira</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=search-mode-box>\r\n                            <div class=\"box-link menu-button\">Search mode</div>\r\n                            <div class=\"popup-menu-box\">\r\n                                <div class=option-list>\r\n                                    <a class=box-link data-type=search-all data-default=1 href=\"?#ppixiv\">Tag</a>\r\n                                    <a class=box-link data-type=search-exact href=\"?s_mode=s_tag_full#ppixiv\">Exact tag match</a>\r\n                                    <a class=box-link data-type=search-text href=\"?s_mode=s_tc#ppixiv\">Text search</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=size-box>\r\n                            <span class=\"box-link menu-button\">Image size</span>\r\n                            <div class=\"popup-menu-box\">\r\n                                <div class=option-list>\r\n                                    <a class=box-link data-type=res-all data-default=1 href=\"#\">All</a>\r\n                                    <a class=box-link data-type=res-high href=\"?wlt=3000&hlt=3000#ppixiv\">High-res</a>\r\n                                    <a class=box-link data-type=res-medium href=\"?wlt=1000&wgt=2999&hlt=1000&hgt=2999#ppixiv\">Medium-res</a>\r\n                                    <a class=box-link data-type=res-low href=\"?wgt=999&hgt=999#ppixiv\">Low-res</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        \r\n                        <div class=aspect-ratio-box>\r\n                            <span class=\"box-link menu-button\">Aspect ratio</span>\r\n                            <div class=\"popup-menu-box\">\r\n                                <div class=option-list>\r\n                                    <a class=box-link data-type=aspect-ratio-all data-default=1 href=\"?ratio=0.5#ppixiv\">All</a>\r\n                                    <a class=box-link data-type=aspect-ratio-landscape href=\"?ratio=0.5#ppixiv\">Landscape</a>\r\n                                    <a class=box-link data-type=aspect-ratio-portrait href=\"?ratio=-0.5#ppixiv\">Portrait</a>\r\n                                    <a class=box-link data-type=aspect-ratio-square href=\"?ratio=0#ppixiv\">Square</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"bookmarks-box premium-only\">\r\n                            <span class=\"menu-button box-link\">Bookmarks</span>\r\n                            <div class=\"popup-menu-box\">\r\n                                <!-- The Pixiv search form shows 300-499, 500-999 and 1000-.  That's not\r\n                                     really useful and the query parameters let us filter differently, so we\r\n                                     replace it with a more useful \"minimum bookmarks\" filter. -->\r\n                                <div class=\"option-list min-bookmarks\">\r\n                                    <a class=box-link data-type=bookmarks-all data-default=1 href=\"#ppixiv\">All</a>\r\n                                    <a class=box-link data-type=bookmarks-100 href=#>100+</a>\r\n                                    <a class=box-link data-type=bookmarks-250 href=#>250+</a>\r\n                                    <a class=box-link data-type=bookmarks-500 href=#>500+</a>\r\n                                    <a class=box-link data-type=bookmarks-1000 href=#>1000+</a>\r\n                                    <a class=box-link data-type=bookmarks-2500 href=#>2500+</a>\r\n                                    <a class=box-link data-type=bookmarks-5000 href=#>5000+</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                       \r\n\r\n                        <div class=\"time-box premium-only\">\r\n                            <div class=\"menu-button box-link\">Time</div>\r\n                            <div class=\"popup-menu-box\">\r\n                                <div class=option-list>\r\n                                    <a class=box-link data-type=time-all data-default=1 href=\"#\">All</a>\r\n                                    <a class=box-link data-type=time-week href=\"#\">This week</a>\r\n                                    <a class=box-link data-type=time-month href=\"#\">This month</a>\r\n                                    <a class=box-link data-type=time-year href=\"#\">This year</a>\r\n                                    <style>\r\n                                        .years-ago {\r\n                                            padding: .25em;\r\n                                            margin: .25em;\r\n                                            white-space: nowrap;\r\n                                        }\r\n                                        /* These links are mostly the same as box-link, but since the\r\n                                         * menu background is the same as the box-link background color,\r\n                                         * we shift it a little to make it clear these are buttons. */\r\n                                        .years-ago > a {\r\n                                            padding: 4px 10px;\r\n                                            background-color: #444;\r\n                                        }\r\n                                        body.light .years-ago > a {\r\n                                            background-color: #ccc;\r\n                                        }\r\n                                    </style>\r\n                                    <div class=years-ago>\r\n                                        <a class=box-link data-type=time-years-ago-1 href=\"#\">1</a>\r\n                                        <a class=box-link data-type=time-years-ago-2 href=\"#\">2</a>\r\n                                        <a class=box-link data-type=time-years-ago-3 href=\"#\">3</a>\r\n                                        <a class=box-link data-type=time-years-ago-4 href=\"#\">4</a>\r\n                                        <a class=box-link data-type=time-years-ago-5 href=\"#\">5</a>\r\n                                        <a class=box-link data-type=time-years-ago-6 href=\"#\">6</a>\r\n                                        <a class=box-link data-type=time-years-ago-7 href=\"#\">7</a>\r\n                                        <span>years ago</span>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        \r\n                        <a href=# class=\"reset-search box-link popup\" data-popup=\"Clear all search options\">Reset</a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div style=\"flex: 1;\">\r\n            </div>\r\n        </div>\r\n\r\n        <ul class=thumbnails></ul>\r\n    </div>\r\n\r\n    <div class=\"view view-manga-container\" data-context-menu-target hidden>\r\n        <div class=ui style=\"display: flex; width: 100%; justify-content: center;\">\r\n            <div class=ui-container data-context-menu-target=off></div>\r\n        </div>\r\n        \r\n        <ul class=thumbnails></ul>\r\n    </div>\r\n    \r\n    <!-- Templates: -->\r\n    <div>\r\n        <template class=template-thumbnail>\r\n            <li class=thumbnail-box>\r\n                <div class=thumbnail-inner>\r\n                    <a class=thumbnail-link href=#>\r\n                        <img class=thumb>\r\n                    </a>\r\n\r\n                    <div class=\"thumbnail-label\" hidden>\r\n                        <div class=label></div>\r\n                    </div>\r\n                    <div class=thumbnail-bottom-left>\r\n                        <div class=\"heart button-bookmark public bookmarked\" hidden>\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" class=\"heart-image\" fill=\"currentColor\">\r\n    <g class=\"heart\">\r\n        <path d=\"M21,5.5 C24.8659932,5.5 28,8.63400675 28,12.5 C28,18.2694439 24.2975093,23.1517313 17.2206059,27.1100183 C16.4622493,27.5342993 15.5379984,27.5343235 14.779626,27.110148 C7.70250208,23.1517462 4,18.2694529 4,12.5 C4,8.63400691 7.13400681,5.5 11,5.5 C12.829814,5.5 14.6210123,6.4144028 16,7.8282366 C17.3789877,6.4144028 19.170186,5.5 21,5.5 Z\" />\r\n    </g>\r\n    <g class=\"delete\">\r\n        <line x1=\"5\" y1=\"27\" x2=\"28\" y2=\"4\" stroke-width=\"3\" stroke=\"white\" />\r\n    </g>\r\n\r\n    <g class=\"lock\" fill=\"#000\" style=\"fill-rule: evenodd;\">\r\n        <path d=\"\r\n            M 30 22\r\n            c 1 0, 2 1, 2 2\r\n            v 4\r\n            c 0 1, -1 2, -2 2\r\n            h -7\r\n            c -1 0, -2 -1, -2 -2\r\n            v -4\r\n            c 0 -1, 1 -2, 2 -2\r\n            v -1\r\n            c 0 -2, 2 -3.5, 3.5 -3.5 \r\n            c 2.5 0, 3.5 2.5, 3.5 3.5\r\n            v 1\r\n            Z\r\n\r\n            M 25 21\r\n            c 0 -1, 1 -1.5, 1.5 -1.5\r\n            c .5 0, 1.5 .5, 1.5 1.5\r\n            v 1\r\n            h -3\r\n            v -1\r\n            Z\"\r\n        />\r\n    </g>   \r\n</svg>\r\n\n                        </div>\r\n                        <div class=\"heart button-bookmark private bookmarked\" hidden>\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" class=\"heart-image\" fill=\"currentColor\">\r\n    <g class=\"heart\">\r\n        <path d=\"M21,5.5 C24.8659932,5.5 28,8.63400675 28,12.5 C28,18.2694439 24.2975093,23.1517313 17.2206059,27.1100183 C16.4622493,27.5342993 15.5379984,27.5343235 14.779626,27.110148 C7.70250208,23.1517462 4,18.2694529 4,12.5 C4,8.63400691 7.13400681,5.5 11,5.5 C12.829814,5.5 14.6210123,6.4144028 16,7.8282366 C17.3789877,6.4144028 19.170186,5.5 21,5.5 Z\" />\r\n    </g>\r\n    <g class=\"delete\">\r\n        <line x1=\"5\" y1=\"27\" x2=\"28\" y2=\"4\" stroke-width=\"3\" stroke=\"white\" />\r\n    </g>\r\n\r\n    <g class=\"lock\" fill=\"#000\" style=\"fill-rule: evenodd;\">\r\n        <path d=\"\r\n            M 30 22\r\n            c 1 0, 2 1, 2 2\r\n            v 4\r\n            c 0 1, -1 2, -2 2\r\n            h -7\r\n            c -1 0, -2 -1, -2 -2\r\n            v -4\r\n            c 0 -1, 1 -2, 2 -2\r\n            v -1\r\n            c 0 -2, 2 -3.5, 3.5 -3.5 \r\n            c 2.5 0, 3.5 2.5, 3.5 3.5\r\n            v 1\r\n            Z\r\n\r\n            M 25 21\r\n            c 0 -1, 1 -1.5, 1.5 -1.5\r\n            c .5 0, 1.5 .5, 1.5 1.5\r\n            v 1\r\n            h -3\r\n            v -1\r\n            Z\"\r\n        />\r\n    </g>   \r\n</svg>\r\n\n                        </div>\r\n\r\n                        <!-- I don't like having no popup here, but it's too intrusive over the thumbnail.\r\n                             Hopefully the popup over the equivalent button in the image UI is enough to tell\r\n                             people what this does. -->\r\n                        <a href=# class=\"similar-illusts-button grey-icon\">\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"10 5 80 60\" fill=\"currentColor\">\r\n    <g class=\"plug\">\r\n        <path d=\"M52.084,56.25H43.75c-1.151,0-2.083-0.932-2.083-2.083s0.932-2.084,2.083-2.084h8.334  c1.151,0,2.083,0.933,2.083,2.084S53.235,56.25,52.084,56.25z\"></path>\r\n        <path d=\"M52.084,58.333H43.75c-1.151,0-2.083,0.933-2.083,2.084S42.599,62.5,43.75,62.5h1.042  c0,1.151,0.932,2.083,2.083,2.083h2.084c1.151,0,2.083-0.932,2.083-2.083h1.042c1.151,0,2.083-0.932,2.083-2.083  S53.235,58.333,52.084,58.333z\"></path>\r\n    </g>\r\n    <g class=\"shine\">\r\n        <path d=\"M47.917,12.5c-1.151,0-2.083-0.932-2.083-2.083V2.083C45.834,0.932,46.766,0,47.917,0S50,0.932,50,2.083  v8.333C50,11.568,49.068,12.5,47.917,12.5z\"></path>\r\n        <path d=\"M29.167,31.25h-8.333c-1.151,0-2.084-0.932-2.084-2.083s0.933-2.084,2.084-2.084h8.333  c1.151,0,2.083,0.933,2.083,2.084S30.318,31.25,29.167,31.25z\"></path>\r\n        <path d=\"M34.375,17.708c-0.532,0-1.065-0.203-1.473-0.61l-5.895-5.892c-0.813-0.814-0.813-2.132,0-2.946  c0.813-0.814,2.132-0.814,2.946,0l5.895,5.892c0.813,0.814,0.813,2.132,0,2.946C35.441,17.505,34.908,17.708,34.375,17.708z\"></path>\r\n        <path d=\"M61.459,17.708c-0.533,0-1.066-0.203-1.474-0.61c-0.813-0.813-0.813-2.132,0-2.946l5.893-5.895  c0.813-0.814,2.132-0.814,2.945,0c0.814,0.814,0.814,2.132,0,2.946l-5.892,5.895C62.524,17.505,61.991,17.708,61.459,17.708z\"></path>\r\n        <path d=\"M75,31.25h-8.333c-1.151,0-2.083-0.932-2.083-2.083s0.932-2.084,2.083-2.084H75  c1.151,0,2.084,0.933,2.084,2.084S76.151,31.25,75,31.25z\"></path>\r\n    </g>\r\n\r\n    <path class=\"bulb\" d=\"M58.655,39.01c2.38-2.596,3.845-6.045,3.845-9.843c0-8.055-6.529-14.583-14.583-14.583  s-14.583,6.529-14.583,14.583c0,3.674,1.369,7.021,3.61,9.584c0.975,1.097,4.723,5.54,4.723,9.166c0,1.151,0.932,2.083,2.083,2.083  h8.334c1.151,0,2.083-0.932,2.083-2.083V47.8C54.237,44.439,57.441,40.416,58.655,39.01z\"></path>\r\n</svg>\r\n\n                        </a>\r\n                    </div>\r\n                    \r\n                    <div class=ugoira-icon hidden></div>\r\n                    <div class=page-count-box hidden>\r\n                        <span class=page-icon></span>\r\n                        <span class=page-count></span>\r\n                    </div>\r\n                    <div class=muted>\r\n                        <span>Muted:</span>\r\n                        <span class=muted-label></span>\r\n                    </div>\r\n                </div>\r\n            </li>\r\n        </template>\r\n\r\n        <template class=template-image-ui>\r\n            <div class=ui-box>\r\n                <!-- The avatar icon in the top-right.  This is absolutely positioned, since we don't\r\n                     want this to push the rest of the UI down. -->\r\n                <div class=\"avatar-popup\" style=\"position: absolute; top: 1em; right: 1em;\"></div>\r\n\r\n                <!-- The title and author.  The margin-right here is to prevent this from\r\n                     overlapping the absolutely-positioned avatar icon above. -->\r\n                <div style=\"display: flex; flex-direction: row; margin-right: 4em;\">\r\n                    <div>\r\n                        <span class=\"title-block\">\r\n                            <!-- Put the title and author in separate inline-blocks, to encourage\r\n                                 the browser to wrap between them if possible, putting the author\r\n                                 on its own line if they won\\'t both fit, but still allowing the\r\n                                 title to wrap if it\\'s too long by itself. -->\r\n                            <span style=\"display: inline-block;\" class=\"title-font\">\r\n                                <a class=\"title\"></a>\r\n                            </span>\r\n                            <span style=\"display: inline-block;\" class=\"author-block title-font\">\r\n                                <span style=\"font-size: 12px;\">by</span>\r\n                                <a class=\"author\"></a>\r\n                            </span>\r\n                            <a class=edit-post href=#>Edit post</a>\r\n                        </span>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=button-row>\r\n                    <a class=\"disable-ui-button popup\" data-popup=\"Return to Pixiv\" href=\"#no-ppixiv\">\r\n<svg xmlns=\"http://www.w3.org/2000/svg\"\r\n    class=\"pixiv-icon icon-button grey-icon\"\r\n    width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"currentColor\">\r\n    <path d=\"\r\n    M 21.965 8.432\r\n    a 7.341 7.341 0 0 1 2.5435 5.5925\r\n    c 0.0065 2.2265 -1.059 4.174 -2.712 5.4785\r\n    c -1.653 1.312 -3.875 2.038 -6.318 2.038\r\n    c -2.78 0 -5.359 -1.0115 -5.359 -1.0115\r\n    v 3.2635\r\n    c 0.4765 0.1395 1.2585 0.438 0.762 0.9345\r\n    H 7.12\r\n    c -0.4915 -0.4915 0.23 -0.781 0.775 -0.935\r\n    V 9.959\r\n    c -1.265 0.9715 -1.9135 1.8135 -2.245 2.4385\r\n    c 0.384 1.2235 -0.3405 1.163 -0.3405 1.163\r\n    L 4 11.4825\r\n    s 4.647 -5.2685 11.4785 -5.2685\r\n    c 2.621 0 4.8765 0.8115 6.4865 2.218\r\n    z\r\n    m -1.993 9.979\r\n    c 1.143 -1.1375 1.785 -2.6205 1.792 -4.4215\r\n    c -0.0055 -1.848 -0.6065 -3.438 -1.7065 -4.635\r\n    c -1.1025 -1.1895 -2.7325 -1.9735 -4.8085 -1.975\r\n    c -1.709 -0.0035 -3.825 0.5675 -5.1295 1.494\r\n    v 10.379\r\n    c 1.189 0.585 2.99 0.9995 5.1295 0.998\r\n    c 3.835.003 3.58 -0.712 4.723 -1.84\r\n    z\r\n    M 23.835 6.214\r\n    \"/>\r\n</svg>\r\n\n                    </a>\r\n\r\n                    <div class=\"navigate-out-button popup\" data-popup=\"Show all\">\r\n                        <div class=\"grey-icon icon-button\">\r\n<svg width=\"32\" height=\"32\" viewBox=\"0 -1 32 32\" fill=\"currentColor\">\r\n    <path d=\"M 4 3 h 10 v 10 h -10 v -10\"/>\r\n    <path d=\"M 18 3 h 10 v 10 h -10 v -10\"/>\r\n    <path d=\"M 4 17 h 10 v 10 h -10 v -10\"/>\r\n    <path d=\"M 18 17 h 10 v 10 h -10 v -10\"/>\r\n</svg>\r\n\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"download-button popup\">\r\n                        <div class=\"grey-icon icon-button button enabled\">\r\n\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" stroke=\"currentColor\" stroke-width=\"2\">\r\n    <line x1=\"8\" y1=\"26\" x2=\"24\" y2=\"26\" />\r\n    <line x1=\"16\" y1=\"6\" x2=\"16\" y2=\"22\" />\r\n    <path d=\"M10 15 L 16 22 L 22 15\" fill=\"none\" stroke-width=\"3\" />\r\n</svg>\r\n\n                        </div>\r\n                    </div>\r\n\r\n                    <!-- position: relative positions the tag dropdown. -->\r\n                    <div style=\"position: relative;\">\r\n                        <!-- position: relative positions the bookmark count. -->\r\n                        <div class=\"button button-bookmark public popup\" style=\"position: relative;\">\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" class=\"heart-image\" fill=\"currentColor\">\r\n    <g class=\"heart\">\r\n        <path d=\"M21,5.5 C24.8659932,5.5 28,8.63400675 28,12.5 C28,18.2694439 24.2975093,23.1517313 17.2206059,27.1100183 C16.4622493,27.5342993 15.5379984,27.5343235 14.779626,27.110148 C7.70250208,23.1517462 4,18.2694529 4,12.5 C4,8.63400691 7.13400681,5.5 11,5.5 C12.829814,5.5 14.6210123,6.4144028 16,7.8282366 C17.3789877,6.4144028 19.170186,5.5 21,5.5 Z\" />\r\n    </g>\r\n    <g class=\"delete\">\r\n        <line x1=\"5\" y1=\"27\" x2=\"28\" y2=\"4\" stroke-width=\"3\" stroke=\"white\" />\r\n    </g>\r\n\r\n    <g class=\"lock\" fill=\"#000\" style=\"fill-rule: evenodd;\">\r\n        <path d=\"\r\n            M 30 22\r\n            c 1 0, 2 1, 2 2\r\n            v 4\r\n            c 0 1, -1 2, -2 2\r\n            h -7\r\n            c -1 0, -2 -1, -2 -2\r\n            v -4\r\n            c 0 -1, 1 -2, 2 -2\r\n            v -1\r\n            c 0 -2, 2 -3.5, 3.5 -3.5 \r\n            c 2.5 0, 3.5 2.5, 3.5 3.5\r\n            v 1\r\n            Z\r\n\r\n            M 25 21\r\n            c 0 -1, 1 -1.5, 1.5 -1.5\r\n            c .5 0, 1.5 .5, 1.5 1.5\r\n            v 1\r\n            h -3\r\n            v -1\r\n            Z\"\r\n        />\r\n    </g>   \r\n</svg>\r\n\n \r\n                            <div class=count></div>\r\n                        </div>\r\n\r\n                        <div class=popup-bookmark-tag-dropdown-container></div>\r\n                    </div>\r\n\r\n                    <div class=\"button button-bookmark private popup\">\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" class=\"heart-image\" fill=\"currentColor\">\r\n    <g class=\"heart\">\r\n        <path d=\"M21,5.5 C24.8659932,5.5 28,8.63400675 28,12.5 C28,18.2694439 24.2975093,23.1517313 17.2206059,27.1100183 C16.4622493,27.5342993 15.5379984,27.5343235 14.779626,27.110148 C7.70250208,23.1517462 4,18.2694529 4,12.5 C4,8.63400691 7.13400681,5.5 11,5.5 C12.829814,5.5 14.6210123,6.4144028 16,7.8282366 C17.3789877,6.4144028 19.170186,5.5 21,5.5 Z\" />\r\n    </g>\r\n    <g class=\"delete\">\r\n        <line x1=\"5\" y1=\"27\" x2=\"28\" y2=\"4\" stroke-width=\"3\" stroke=\"white\" />\r\n    </g>\r\n\r\n    <g class=\"lock\" fill=\"#000\" style=\"fill-rule: evenodd;\">\r\n        <path d=\"\r\n            M 30 22\r\n            c 1 0, 2 1, 2 2\r\n            v 4\r\n            c 0 1, -1 2, -2 2\r\n            h -7\r\n            c -1 0, -2 -1, -2 -2\r\n            v -4\r\n            c 0 -1, 1 -2, 2 -2\r\n            v -1\r\n            c 0 -2, 2 -3.5, 3.5 -3.5 \r\n            c 2.5 0, 3.5 2.5, 3.5 3.5\r\n            v 1\r\n            Z\r\n\r\n            M 25 21\r\n            c 0 -1, 1 -1.5, 1.5 -1.5\r\n            c .5 0, 1.5 .5, 1.5 1.5\r\n            v 1\r\n            h -3\r\n            v -1\r\n            Z\"\r\n        />\r\n    </g>   \r\n</svg>\r\n\n                    </div>\r\n                    \r\n                    <div style=\"position: relative;\">\r\n                        <div class=\"button button-bookmark-tags grey-icon popup\" data-popup=\"Bookmark tags\">\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" fill=\"#000\">\r\n    <defs>\r\n        <mask id=\"mask\">\r\n            <rect width=\"100%\" height=\"100%\" fill=\"white\" />\r\n            <circle cx=\"22\" cy=\"10\" r=\"2\" fill=\"black\" />\r\n        </mask>\r\n    </defs>\r\n    \r\n    <path id=\"tag\" d=\"M2 18 L 16 4 L 28 4 L 28 16 L 14 30 L2 18\" mask=\"url(#mask)\" fill=\"currentColor\" />\r\n    <circle id=\"hole\" cx=\"22\" cy=\"10\" r=\"2\" fill=\"#444\" />\r\n</svg>\r\n\n                            <div style=\"position: absolute; bottom: 2px; left: 4px;\">\r\n                                <div class=tag-dropdown-arrow hidden></div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"button button-like enabled popup\" style=\"position: relative;\">\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" fill=\"currentColor\">\r\n    <path class=\"mouth\" stroke-width=\"1\" stroke-linecap=\"round\"\r\n    transform-origin=\"50% 50%\"\r\n    d=\"\r\n        M 6 14\r\n        A 4 4.5 0 0 0 26 14\r\n        M 26 14\r\n        C 26 10, 6 10, 6 14\" />\r\n    <ellipse class=\"eye\" cx=\"6\" cy=\"9\" rx=\"1.5\" ry=\"1.5\" transform-origin=\"6 9\" stroke=\"none\" />\r\n    <ellipse class=\"eye\" cx=\"26\" cy=\"9\" rx=\"1.5\" ry=\"1.5\" transform-origin=\"26 9\" stroke=\"none\" />\r\n</svg>\r\n\n\r\n                        <div class=count></div>\r\n                    </div>\r\n\r\n                    <a class=\"similar-illusts-button popup\" data-popup=\"Similar illustrations\" href=#>\r\n                        <div class=\"grey-icon icon-button\">\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"10 5 80 60\" fill=\"currentColor\">\r\n    <g class=\"plug\">\r\n        <path d=\"M52.084,56.25H43.75c-1.151,0-2.083-0.932-2.083-2.083s0.932-2.084,2.083-2.084h8.334  c1.151,0,2.083,0.933,2.083,2.084S53.235,56.25,52.084,56.25z\"></path>\r\n        <path d=\"M52.084,58.333H43.75c-1.151,0-2.083,0.933-2.083,2.084S42.599,62.5,43.75,62.5h1.042  c0,1.151,0.932,2.083,2.083,2.083h2.084c1.151,0,2.083-0.932,2.083-2.083h1.042c1.151,0,2.083-0.932,2.083-2.083  S53.235,58.333,52.084,58.333z\"></path>\r\n    </g>\r\n    <g class=\"shine\">\r\n        <path d=\"M47.917,12.5c-1.151,0-2.083-0.932-2.083-2.083V2.083C45.834,0.932,46.766,0,47.917,0S50,0.932,50,2.083  v8.333C50,11.568,49.068,12.5,47.917,12.5z\"></path>\r\n        <path d=\"M29.167,31.25h-8.333c-1.151,0-2.084-0.932-2.084-2.083s0.933-2.084,2.084-2.084h8.333  c1.151,0,2.083,0.933,2.083,2.084S30.318,31.25,29.167,31.25z\"></path>\r\n        <path d=\"M34.375,17.708c-0.532,0-1.065-0.203-1.473-0.61l-5.895-5.892c-0.813-0.814-0.813-2.132,0-2.946  c0.813-0.814,2.132-0.814,2.946,0l5.895,5.892c0.813,0.814,0.813,2.132,0,2.946C35.441,17.505,34.908,17.708,34.375,17.708z\"></path>\r\n        <path d=\"M61.459,17.708c-0.533,0-1.066-0.203-1.474-0.61c-0.813-0.813-0.813-2.132,0-2.946l5.893-5.895  c0.813-0.814,2.132-0.814,2.945,0c0.814,0.814,0.814,2.132,0,2.946l-5.892,5.895C62.524,17.505,61.991,17.708,61.459,17.708z\"></path>\r\n        <path d=\"M75,31.25h-8.333c-1.151,0-2.083-0.932-2.083-2.083s0.932-2.084,2.083-2.084H75  c1.151,0,2.084,0.933,2.084,2.084S76.151,31.25,75,31.25z\"></path>\r\n    </g>\r\n\r\n    <path class=\"bulb\" d=\"M58.655,39.01c2.38-2.596,3.845-6.045,3.845-9.843c0-8.055-6.529-14.583-14.583-14.583  s-14.583,6.529-14.583,14.583c0,3.674,1.369,7.021,3.61,9.584c0.975,1.097,4.723,5.54,4.723,9.166c0,1.151,0.932,2.083,2.083,2.083  h8.334c1.151,0,2.083-0.932,2.083-2.083V47.8C54.237,44.439,57.441,40.416,58.655,39.01z\"></path>\r\n</svg>\r\n\n                        </div>\r\n                    </a>\r\n\r\n                    <div class=\"image-settings-menu-box settings-menu-box popup\" data-popup=\"Preferences\">\r\n<svg xmlns=\"http://www.w3.org/2000/svg\"\r\n    class=\"menu-button grey-icon icon-button\" width=\"32\" height=\"32\" viewbox=\"0 0 32 32\" style=\"fill: currentColor; transform-origin: 16px 16px;\">\r\n    <path d=\"\r\n    m 27,17.88\r\n    l 0,-4.112\r\n    l -2.52,-0.4224\r\n    c -0.1872,-0.704 -0.4672,-1.3568 -0.7936,-1.92\r\n    l 1.488,-2.056\r\n    l -2.896,-2.944\r\n    l -2.096,1.4528\r\n    c -0.608,-0.328 -1.264,-0.608 -1.9136,-0.7952\r\n    l -0.4144,-2.4832\r\n    l -4.1088,0\r\n    l -0.4208,2.5248\r\n    c -0.6992,0.1872 -1.3056,0.4688 -1.9136,0.7952\r\n    l -2.0512,-1.448\r\n    l -2.9408,2.896\r\n    l 1.4944,2.0592\r\n    c -0.32,0.608 -0.6016,1.264 -0.7888,1.9648\r\n    l -2.5248,0.376\r\n    l 0,4.112\r\n    l 2.52,0.4224\r\n    c 0.1872,0.7008 0.4672,1.3088 0.7936,1.9168\r\n    l -1.488,2.104\r\n    l 2.8944,2.9008\r\n    l 2.0992,-1.5008\r\n    c 0.608,0.328 1.2592,0.608 1.9584,0.7952\r\n    l 0.416,2.4816\r\n    l 4.1056,0\r\n    l 0.4208,-2.5248\r\n    c 0.6528,-0.1872 1.3072,-0.4688 1.9136,-0.7952\r\n    l 2.104,1.496\r\n    l 2.896,-2.8992\r\n    l -1.496,-2.104\r\n    c 0.3248,-0.608 0.608,-1.216 0.792,-1.92\r\n    l 2.4704,-0.368\r\n    l 0,-0.0048\r\n    z\r\n    m -11.2,2.2512\r\n    c -2.3808,0 -4.2928,-1.92 -4.2928,-4.304\r\n    s 1.96,-4.304 4.2928,-4.304\r\n    c 2.3328,0 4.2928,1.9168 4.2928,4.304\r\n    c 0,2.384 -1.912,4.3008 -4.2928,4.3008\r\n    l 0,0.0032\r\n    z\"/>\r\n</svg>\r\n\r\n\n                        <div class=\"popup-menu-box keep-menu-open\"></div>\r\n                    </div>\r\n                </div>\r\n                <div class=post-info>\r\n                    <div class=\"post-age popup\" hidden></div>\r\n                    <div class=page-count hidden></div>\r\n                    <div class=ugoira-duration hidden></div>\r\n                    <div class=ugoira-frames hidden></div>\r\n                    <div class=image-info hidden></div>\r\n                </div>\r\n               \r\n                <div class=tag-list></div>\r\n                <div class=description></div>\r\n            </div>\r\n        </template>\r\n\r\n        <template class=template-muted>\r\n            <div class=mute-display>\r\n                <img class=muted-image>\r\n                <div class=muted-text>\r\n                    <Span>Muted:</span>\r\n                    <span class=muted-label></span>\r\n                </div>\r\n            </div>\r\n        </template>\r\n\r\n        <!-- A user avatar, with a follow/unfollow UI. -->\r\n        <template class=\"template-avatar\">\r\n            <div class=\"follow-container\">\r\n                <a href=# class=avatar-link style=\"position: relative;\">\r\n                    <div class=\"avatar popup popup-bottom\">\r\n                        <canvas class=main></canvas>\r\n                        <canvas class=highlight></canvas>\r\n                    </div>\r\n\r\n                    <!-- We either show the following icon if we're already following (which acts as the unfollow\r\n                         button), or the public and private follow buttons.  The follow button is only shown on hover. -->\r\n                    <div class=\"follow-icon follow-button public bottom-left popup popup-bottom\" data-popup=\"Follow publically\">\r\n<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<svg\r\n   xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\r\n   xmlns:cc=\"http://creativecommons.org/ns#\"\r\n   xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\r\n   xmlns:svg=\"http://www.w3.org/2000/svg\"\r\n   xmlns=\"http://www.w3.org/2000/svg\"\r\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\r\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\r\n   viewBox=\"0 0 32 32\"\r\n   width=\"32\"\r\n   height=\"32\"\r\n   class=\"eye-image\"\r\n   fill=\"currentColor\"\r\n   version=\"1.1\"\r\n   id=\"svg32\"\r\n   sodipodi:docname=\"eye-icon.svg\"\r\n   inkscape:version=\"0.92.3 (2405546, 2018-03-11)\">\r\n  <metadata\r\n     id=\"metadata38\">\r\n    <rdf:RDF>\r\n      <cc:Work\r\n         rdf:about=\"\">\r\n        <dc:format>image/svg+xml</dc:format>\r\n        <dc:type\r\n           rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\" />\r\n        <dc:title />\r\n      </cc:Work>\r\n    </rdf:RDF>\r\n  </metadata>\r\n  <defs\r\n     id=\"defs36\">\r\n    <mask\r\n       maskUnits=\"userSpaceOnUse\"\r\n       id=\"mask1075\">\r\n      <g\r\n         inkscape:label=\"eye-mask\"\r\n         style=\"display:inline\"\r\n         id=\"g1081\">\r\n        <rect\r\n           y=\"1.5105144\"\r\n           x=\"1.5820016\"\r\n           height=\"28.811605\"\r\n           width=\"29.818333\"\r\n           id=\"rect1077\"\r\n           style=\"fill:#020202;fill-opacity:1;stroke:none;stroke-width:3;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\" />\r\n        <path\r\n           inkscape:label=\"outline1-mask\"\r\n           inkscape:connector-curvature=\"0\"\r\n           id=\"path1079\"\r\n           d=\"m 4.1355932,15.966102 c 0,0 5.4237288,-6.2033899 12.0000008,-6.1016949 6.576271,0.101695 11.559322,6.0338979 11.559322,6.0338979 0,0 -2.745763,6 -11.423729,6.101695 C 7.5932203,22.101695 4.1355932,15.966102 4.1355932,15.966102 Z\"\r\n           style=\"display:inline;fill:#ffffff;fill-opacity:1;stroke:#ffffff;stroke-width:0.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\" />\r\n      </g>\r\n    </mask>\r\n    <filter\r\n       inkscape:collect=\"always\"\r\n       style=\"color-interpolation-filters:sRGB\"\r\n       id=\"filter4556\"\r\n       x=\"-0.074548502\"\r\n       width=\"1.149097\"\r\n       y=\"-0.1446944\"\r\n       height=\"1.2893888\">\r\n      <feGaussianBlur\r\n         inkscape:collect=\"always\"\r\n         stdDeviation=\"0.73179676\"\r\n         id=\"feGaussianBlur4558\" />\r\n    </filter>\r\n  </defs>\r\n  <sodipodi:namedview\r\n     pagecolor=\"#ffffff\"\r\n     bordercolor=\"#666666\"\r\n     borderopacity=\"1\"\r\n     objecttolerance=\"10\"\r\n     gridtolerance=\"10\"\r\n     guidetolerance=\"10\"\r\n     inkscape:pageopacity=\"0\"\r\n     inkscape:pageshadow=\"2\"\r\n     inkscape:window-width=\"1920\"\r\n     inkscape:window-height=\"1137\"\r\n     id=\"namedview34\"\r\n     showgrid=\"false\"\r\n     inkscape:zoom=\"41.7193\"\r\n     inkscape:cx=\"14.867981\"\r\n     inkscape:cy=\"15.247435\"\r\n     inkscape:window-x=\"1912\"\r\n     inkscape:window-y=\"-8\"\r\n     inkscape:window-maximized=\"1\"\r\n     inkscape:current-layer=\"svg32\" />\r\n  <rect\r\n     x=\"0\"\r\n     y=\"0\"\r\n     width=\"32\"\r\n     height=\"32\"\r\n     id=\"bg\"\r\n     style=\"display:none;fill:#000088;fill-opacity:1\"\r\n     inkscape:label=\"bg\" />\r\n  <path\r\n     inkscape:label=\"shadow\"\r\n     inkscape:connector-curvature=\"0\"\r\n     id=\"shadow\"\r\n     d=\"m 4.1355932,15.966102 c 0,0 5.4237288,-6.20339 12.0000008,-6.101695 6.576271,0.101695 11.559322,6.033898 11.559322,6.033898 0,0 -2.745763,6 -11.423729,6.101695 C 7.5932203,22.101695 4.1355932,15.966102 4.1355932,15.966102 Z\"\r\n     style=\"display:inline;fill:none;fill-opacity:1;stroke:#fbfbfb;stroke-width:3.77952756;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;filter:url(#filter4556);stroke-miterlimit:4;stroke-dasharray:none\" />\r\n  <path\r\n     inkscape:label=\"outline1\"\r\n     inkscape:connector-curvature=\"0\"\r\n     id=\"outline1\"\r\n     class=\"outline1\"\r\n     d=\"m 4.1355932,15.966102 c 0,0 5.4237288,-6.2033899 12.0000008,-6.1016949 6.576271,0.101695 11.559322,6.0338979 11.559322,6.0338979 0,0 -2.745763,6 -11.423729,6.101695 C 7.5932203,22.101695 4.1355932,15.966102 4.1355932,15.966102 Z\"\r\n     style=\"display:inline;fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:3;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\" />\r\n  <g\r\n     id=\"eye\"\r\n     inkscape:label=\"eye\"\r\n     style=\"display:inline\"\r\n     mask=\"url(#mask1075)\">\r\n    <path\r\n       style=\"display:inline;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1.37283087px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"\r\n       d=\"m 1.5948027,16.654121 c 0,0 6.825353,-9.2904337 15.1010963,-9.1381313 8.27574,0.1523023 14.546535,9.0365953 14.546535,9.0365953 0,0 -3.455336,8.985827 -14.375902,9.13813 C 5.9459657,25.843018 1.5948027,16.654121 1.5948027,16.654121 Z\"\r\n       id=\"fill\"\r\n       inkscape:connector-curvature=\"0\"\r\n       inkscape:label=\"fill\" />\r\n    <g\r\n       id=\"layer1\"\r\n       class=\"middle\"\r\n       inkscape:label=\"middle\"\r\n       style=\"display:inline;opacity:1\"\r\n       inkscape:groupmode=\"layer\">\r\n      <path\r\n         style=\"fill:#00a8ff;fill-opacity:1;stroke:#000000;stroke-width:1.02918112px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"\r\n         d=\"m 15.980909,9.5250445 c -2.223727,-3.144e-4 -3.075583,3.5258445 -3.007786,6.8291555 0.05898,2.873784 0.921431,5.825346 2.991275,5.877994 2.369776,-0.04304 3.052389,-2.967868 2.974827,-5.98571 -0.08375,-3.258728 -0.510428,-6.7210934 -2.958316,-6.7214395 z\"\r\n         id=\"middle-outline\"\r\n         inkscape:connector-curvature=\"0\"\r\n         sodipodi:nodetypes=\"sscss\"\r\n         inkscape:label=\"middle-outline\" />\r\n      <path\r\n         style=\"fill:#000012;fill-opacity:1;stroke:none;stroke-width:1.02918112px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"\r\n         d=\"m 15.939865,11.878838 c -0.822379,0.0033 -1.404285,1.981256 -1.404284,4.065998 10e-7,2.084742 0.499108,4.40718 1.459244,4.407179 0.960136,-1e-6 1.524881,-2.19813 1.527042,-4.398093 0.0022,-2.199963 -0.759623,-4.078404 -1.582002,-4.075084 z\"\r\n         id=\"iris\"\r\n         inkscape:connector-curvature=\"0\"\r\n         sodipodi:nodetypes=\"zzzzz\"\r\n         inkscape:label=\"iris\" />\r\n    </g>\r\n  </g>\r\n  <path\r\n     inkscape:label=\"outline2\"\r\n     inkscape:connector-curvature=\"0\"\r\n     id=\"outline2\"\r\n     d=\"m 4.1355932,15.966102 c 0,0 5.4237288,-6.2033901 12.0000008,-6.1016951 6.576271,0.101695 11.559322,6.0338981 11.559322,6.0338981 0,0 -2.745763,6 -11.423729,6.101695 C 7.5932203,22.101695 4.1355932,15.966102 4.1355932,15.966102 Z\"\r\n     style=\"display:inline;fill:none;fill-opacity:1;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;font-variant-east_asian:normal;opacity:1;vector-effect:none;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0\" />\r\n  <g\r\n     class=\"lock\"\r\n     style=\"display:inline;fill:#000000;fill-rule:evenodd\"\r\n     id=\"lock\"\r\n     fill-opacity=\"var(--eye-opacity)\"\r\n     inkscape:label=\"lock\">\r\n    <path\r\n       d=\"m 30,22 c 1,0 2,1 2,2 v 4 c 0,1 -1,2 -2,2 h -7 c -1,0 -2,-1 -2,-2 v -4 c 0,-1 1,-2 2,-2 v -1 c 0,-2 2,-3.5 3.5,-3.5 2.5,0 3.5,2.5 3.5,3.5 z m -5,-1 c 0,-1 1,-1.5 1.5,-1.5 0.5,0 1.5,0.5 1.5,1.5 v 1 h -3 z\"\r\n       id=\"path28\"\r\n       inkscape:connector-curvature=\"0\" />\r\n  </g>\r\n</svg>\r\n\n                    </div>\r\n                    <div class=\"follow-icon follow-button private bottom-right popup popup-bottom\" data-popup=\"Follow privately\">\r\n<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<svg\r\n   xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\r\n   xmlns:cc=\"http://creativecommons.org/ns#\"\r\n   xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\r\n   xmlns:svg=\"http://www.w3.org/2000/svg\"\r\n   xmlns=\"http://www.w3.org/2000/svg\"\r\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\r\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\r\n   viewBox=\"0 0 32 32\"\r\n   width=\"32\"\r\n   height=\"32\"\r\n   class=\"eye-image\"\r\n   fill=\"currentColor\"\r\n   version=\"1.1\"\r\n   id=\"svg32\"\r\n   sodipodi:docname=\"eye-icon.svg\"\r\n   inkscape:version=\"0.92.3 (2405546, 2018-03-11)\">\r\n  <metadata\r\n     id=\"metadata38\">\r\n    <rdf:RDF>\r\n      <cc:Work\r\n         rdf:about=\"\">\r\n        <dc:format>image/svg+xml</dc:format>\r\n        <dc:type\r\n           rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\" />\r\n        <dc:title />\r\n      </cc:Work>\r\n    </rdf:RDF>\r\n  </metadata>\r\n  <defs\r\n     id=\"defs36\">\r\n    <mask\r\n       maskUnits=\"userSpaceOnUse\"\r\n       id=\"mask1075\">\r\n      <g\r\n         inkscape:label=\"eye-mask\"\r\n         style=\"display:inline\"\r\n         id=\"g1081\">\r\n        <rect\r\n           y=\"1.5105144\"\r\n           x=\"1.5820016\"\r\n           height=\"28.811605\"\r\n           width=\"29.818333\"\r\n           id=\"rect1077\"\r\n           style=\"fill:#020202;fill-opacity:1;stroke:none;stroke-width:3;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\" />\r\n        <path\r\n           inkscape:label=\"outline1-mask\"\r\n           inkscape:connector-curvature=\"0\"\r\n           id=\"path1079\"\r\n           d=\"m 4.1355932,15.966102 c 0,0 5.4237288,-6.2033899 12.0000008,-6.1016949 6.576271,0.101695 11.559322,6.0338979 11.559322,6.0338979 0,0 -2.745763,6 -11.423729,6.101695 C 7.5932203,22.101695 4.1355932,15.966102 4.1355932,15.966102 Z\"\r\n           style=\"display:inline;fill:#ffffff;fill-opacity:1;stroke:#ffffff;stroke-width:0.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\" />\r\n      </g>\r\n    </mask>\r\n    <filter\r\n       inkscape:collect=\"always\"\r\n       style=\"color-interpolation-filters:sRGB\"\r\n       id=\"filter4556\"\r\n       x=\"-0.074548502\"\r\n       width=\"1.149097\"\r\n       y=\"-0.1446944\"\r\n       height=\"1.2893888\">\r\n      <feGaussianBlur\r\n         inkscape:collect=\"always\"\r\n         stdDeviation=\"0.73179676\"\r\n         id=\"feGaussianBlur4558\" />\r\n    </filter>\r\n  </defs>\r\n  <sodipodi:namedview\r\n     pagecolor=\"#ffffff\"\r\n     bordercolor=\"#666666\"\r\n     borderopacity=\"1\"\r\n     objecttolerance=\"10\"\r\n     gridtolerance=\"10\"\r\n     guidetolerance=\"10\"\r\n     inkscape:pageopacity=\"0\"\r\n     inkscape:pageshadow=\"2\"\r\n     inkscape:window-width=\"1920\"\r\n     inkscape:window-height=\"1137\"\r\n     id=\"namedview34\"\r\n     showgrid=\"false\"\r\n     inkscape:zoom=\"41.7193\"\r\n     inkscape:cx=\"14.867981\"\r\n     inkscape:cy=\"15.247435\"\r\n     inkscape:window-x=\"1912\"\r\n     inkscape:window-y=\"-8\"\r\n     inkscape:window-maximized=\"1\"\r\n     inkscape:current-layer=\"svg32\" />\r\n  <rect\r\n     x=\"0\"\r\n     y=\"0\"\r\n     width=\"32\"\r\n     height=\"32\"\r\n     id=\"bg\"\r\n     style=\"display:none;fill:#000088;fill-opacity:1\"\r\n     inkscape:label=\"bg\" />\r\n  <path\r\n     inkscape:label=\"shadow\"\r\n     inkscape:connector-curvature=\"0\"\r\n     id=\"shadow\"\r\n     d=\"m 4.1355932,15.966102 c 0,0 5.4237288,-6.20339 12.0000008,-6.101695 6.576271,0.101695 11.559322,6.033898 11.559322,6.033898 0,0 -2.745763,6 -11.423729,6.101695 C 7.5932203,22.101695 4.1355932,15.966102 4.1355932,15.966102 Z\"\r\n     style=\"display:inline;fill:none;fill-opacity:1;stroke:#fbfbfb;stroke-width:3.77952756;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;filter:url(#filter4556);stroke-miterlimit:4;stroke-dasharray:none\" />\r\n  <path\r\n     inkscape:label=\"outline1\"\r\n     inkscape:connector-curvature=\"0\"\r\n     id=\"outline1\"\r\n     class=\"outline1\"\r\n     d=\"m 4.1355932,15.966102 c 0,0 5.4237288,-6.2033899 12.0000008,-6.1016949 6.576271,0.101695 11.559322,6.0338979 11.559322,6.0338979 0,0 -2.745763,6 -11.423729,6.101695 C 7.5932203,22.101695 4.1355932,15.966102 4.1355932,15.966102 Z\"\r\n     style=\"display:inline;fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:3;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\" />\r\n  <g\r\n     id=\"eye\"\r\n     inkscape:label=\"eye\"\r\n     style=\"display:inline\"\r\n     mask=\"url(#mask1075)\">\r\n    <path\r\n       style=\"display:inline;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1.37283087px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"\r\n       d=\"m 1.5948027,16.654121 c 0,0 6.825353,-9.2904337 15.1010963,-9.1381313 8.27574,0.1523023 14.546535,9.0365953 14.546535,9.0365953 0,0 -3.455336,8.985827 -14.375902,9.13813 C 5.9459657,25.843018 1.5948027,16.654121 1.5948027,16.654121 Z\"\r\n       id=\"fill\"\r\n       inkscape:connector-curvature=\"0\"\r\n       inkscape:label=\"fill\" />\r\n    <g\r\n       id=\"layer1\"\r\n       class=\"middle\"\r\n       inkscape:label=\"middle\"\r\n       style=\"display:inline;opacity:1\"\r\n       inkscape:groupmode=\"layer\">\r\n      <path\r\n         style=\"fill:#00a8ff;fill-opacity:1;stroke:#000000;stroke-width:1.02918112px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"\r\n         d=\"m 15.980909,9.5250445 c -2.223727,-3.144e-4 -3.075583,3.5258445 -3.007786,6.8291555 0.05898,2.873784 0.921431,5.825346 2.991275,5.877994 2.369776,-0.04304 3.052389,-2.967868 2.974827,-5.98571 -0.08375,-3.258728 -0.510428,-6.7210934 -2.958316,-6.7214395 z\"\r\n         id=\"middle-outline\"\r\n         inkscape:connector-curvature=\"0\"\r\n         sodipodi:nodetypes=\"sscss\"\r\n         inkscape:label=\"middle-outline\" />\r\n      <path\r\n         style=\"fill:#000012;fill-opacity:1;stroke:none;stroke-width:1.02918112px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"\r\n         d=\"m 15.939865,11.878838 c -0.822379,0.0033 -1.404285,1.981256 -1.404284,4.065998 10e-7,2.084742 0.499108,4.40718 1.459244,4.407179 0.960136,-1e-6 1.524881,-2.19813 1.527042,-4.398093 0.0022,-2.199963 -0.759623,-4.078404 -1.582002,-4.075084 z\"\r\n         id=\"iris\"\r\n         inkscape:connector-curvature=\"0\"\r\n         sodipodi:nodetypes=\"zzzzz\"\r\n         inkscape:label=\"iris\" />\r\n    </g>\r\n  </g>\r\n  <path\r\n     inkscape:label=\"outline2\"\r\n     inkscape:connector-curvature=\"0\"\r\n     id=\"outline2\"\r\n     d=\"m 4.1355932,15.966102 c 0,0 5.4237288,-6.2033901 12.0000008,-6.1016951 6.576271,0.101695 11.559322,6.0338981 11.559322,6.0338981 0,0 -2.745763,6 -11.423729,6.101695 C 7.5932203,22.101695 4.1355932,15.966102 4.1355932,15.966102 Z\"\r\n     style=\"display:inline;fill:none;fill-opacity:1;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;font-variant-east_asian:normal;opacity:1;vector-effect:none;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0\" />\r\n  <g\r\n     class=\"lock\"\r\n     style=\"display:inline;fill:#000000;fill-rule:evenodd\"\r\n     id=\"lock\"\r\n     fill-opacity=\"var(--eye-opacity)\"\r\n     inkscape:label=\"lock\">\r\n    <path\r\n       d=\"m 30,22 c 1,0 2,1 2,2 v 4 c 0,1 -1,2 -2,2 h -7 c -1,0 -2,-1 -2,-2 v -4 c 0,-1 1,-2 2,-2 v -1 c 0,-2 2,-3.5 3.5,-3.5 2.5,0 3.5,2.5 3.5,3.5 z m -5,-1 c 0,-1 1,-1.5 1.5,-1.5 0.5,0 1.5,0.5 1.5,1.5 v 1 h -3 z\"\r\n       id=\"path28\"\r\n       inkscape:connector-curvature=\"0\" />\r\n  </g>\r\n</svg>\r\n\n                    </div>\r\n                    <div class=\"follow-icon following-icon unfollow-button bottom-right popup popup-bottom\" data-popup=\"Unfollow\">\r\n<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<svg\r\n   xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\r\n   xmlns:cc=\"http://creativecommons.org/ns#\"\r\n   xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\r\n   xmlns:svg=\"http://www.w3.org/2000/svg\"\r\n   xmlns=\"http://www.w3.org/2000/svg\"\r\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\r\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\r\n   viewBox=\"0 0 32 32\"\r\n   width=\"32\"\r\n   height=\"32\"\r\n   class=\"eye-image\"\r\n   fill=\"currentColor\"\r\n   version=\"1.1\"\r\n   id=\"svg32\"\r\n   sodipodi:docname=\"eye-icon.svg\"\r\n   inkscape:version=\"0.92.3 (2405546, 2018-03-11)\">\r\n  <metadata\r\n     id=\"metadata38\">\r\n    <rdf:RDF>\r\n      <cc:Work\r\n         rdf:about=\"\">\r\n        <dc:format>image/svg+xml</dc:format>\r\n        <dc:type\r\n           rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\" />\r\n        <dc:title />\r\n      </cc:Work>\r\n    </rdf:RDF>\r\n  </metadata>\r\n  <defs\r\n     id=\"defs36\">\r\n    <mask\r\n       maskUnits=\"userSpaceOnUse\"\r\n       id=\"mask1075\">\r\n      <g\r\n         inkscape:label=\"eye-mask\"\r\n         style=\"display:inline\"\r\n         id=\"g1081\">\r\n        <rect\r\n           y=\"1.5105144\"\r\n           x=\"1.5820016\"\r\n           height=\"28.811605\"\r\n           width=\"29.818333\"\r\n           id=\"rect1077\"\r\n           style=\"fill:#020202;fill-opacity:1;stroke:none;stroke-width:3;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\" />\r\n        <path\r\n           inkscape:label=\"outline1-mask\"\r\n           inkscape:connector-curvature=\"0\"\r\n           id=\"path1079\"\r\n           d=\"m 4.1355932,15.966102 c 0,0 5.4237288,-6.2033899 12.0000008,-6.1016949 6.576271,0.101695 11.559322,6.0338979 11.559322,6.0338979 0,0 -2.745763,6 -11.423729,6.101695 C 7.5932203,22.101695 4.1355932,15.966102 4.1355932,15.966102 Z\"\r\n           style=\"display:inline;fill:#ffffff;fill-opacity:1;stroke:#ffffff;stroke-width:0.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\" />\r\n      </g>\r\n    </mask>\r\n    <filter\r\n       inkscape:collect=\"always\"\r\n       style=\"color-interpolation-filters:sRGB\"\r\n       id=\"filter4556\"\r\n       x=\"-0.074548502\"\r\n       width=\"1.149097\"\r\n       y=\"-0.1446944\"\r\n       height=\"1.2893888\">\r\n      <feGaussianBlur\r\n         inkscape:collect=\"always\"\r\n         stdDeviation=\"0.73179676\"\r\n         id=\"feGaussianBlur4558\" />\r\n    </filter>\r\n  </defs>\r\n  <sodipodi:namedview\r\n     pagecolor=\"#ffffff\"\r\n     bordercolor=\"#666666\"\r\n     borderopacity=\"1\"\r\n     objecttolerance=\"10\"\r\n     gridtolerance=\"10\"\r\n     guidetolerance=\"10\"\r\n     inkscape:pageopacity=\"0\"\r\n     inkscape:pageshadow=\"2\"\r\n     inkscape:window-width=\"1920\"\r\n     inkscape:window-height=\"1137\"\r\n     id=\"namedview34\"\r\n     showgrid=\"false\"\r\n     inkscape:zoom=\"41.7193\"\r\n     inkscape:cx=\"14.867981\"\r\n     inkscape:cy=\"15.247435\"\r\n     inkscape:window-x=\"1912\"\r\n     inkscape:window-y=\"-8\"\r\n     inkscape:window-maximized=\"1\"\r\n     inkscape:current-layer=\"svg32\" />\r\n  <rect\r\n     x=\"0\"\r\n     y=\"0\"\r\n     width=\"32\"\r\n     height=\"32\"\r\n     id=\"bg\"\r\n     style=\"display:none;fill:#000088;fill-opacity:1\"\r\n     inkscape:label=\"bg\" />\r\n  <path\r\n     inkscape:label=\"shadow\"\r\n     inkscape:connector-curvature=\"0\"\r\n     id=\"shadow\"\r\n     d=\"m 4.1355932,15.966102 c 0,0 5.4237288,-6.20339 12.0000008,-6.101695 6.576271,0.101695 11.559322,6.033898 11.559322,6.033898 0,0 -2.745763,6 -11.423729,6.101695 C 7.5932203,22.101695 4.1355932,15.966102 4.1355932,15.966102 Z\"\r\n     style=\"display:inline;fill:none;fill-opacity:1;stroke:#fbfbfb;stroke-width:3.77952756;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;filter:url(#filter4556);stroke-miterlimit:4;stroke-dasharray:none\" />\r\n  <path\r\n     inkscape:label=\"outline1\"\r\n     inkscape:connector-curvature=\"0\"\r\n     id=\"outline1\"\r\n     class=\"outline1\"\r\n     d=\"m 4.1355932,15.966102 c 0,0 5.4237288,-6.2033899 12.0000008,-6.1016949 6.576271,0.101695 11.559322,6.0338979 11.559322,6.0338979 0,0 -2.745763,6 -11.423729,6.101695 C 7.5932203,22.101695 4.1355932,15.966102 4.1355932,15.966102 Z\"\r\n     style=\"display:inline;fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:3;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\" />\r\n  <g\r\n     id=\"eye\"\r\n     inkscape:label=\"eye\"\r\n     style=\"display:inline\"\r\n     mask=\"url(#mask1075)\">\r\n    <path\r\n       style=\"display:inline;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1.37283087px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"\r\n       d=\"m 1.5948027,16.654121 c 0,0 6.825353,-9.2904337 15.1010963,-9.1381313 8.27574,0.1523023 14.546535,9.0365953 14.546535,9.0365953 0,0 -3.455336,8.985827 -14.375902,9.13813 C 5.9459657,25.843018 1.5948027,16.654121 1.5948027,16.654121 Z\"\r\n       id=\"fill\"\r\n       inkscape:connector-curvature=\"0\"\r\n       inkscape:label=\"fill\" />\r\n    <g\r\n       id=\"layer1\"\r\n       class=\"middle\"\r\n       inkscape:label=\"middle\"\r\n       style=\"display:inline;opacity:1\"\r\n       inkscape:groupmode=\"layer\">\r\n      <path\r\n         style=\"fill:#00a8ff;fill-opacity:1;stroke:#000000;stroke-width:1.02918112px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"\r\n         d=\"m 15.980909,9.5250445 c -2.223727,-3.144e-4 -3.075583,3.5258445 -3.007786,6.8291555 0.05898,2.873784 0.921431,5.825346 2.991275,5.877994 2.369776,-0.04304 3.052389,-2.967868 2.974827,-5.98571 -0.08375,-3.258728 -0.510428,-6.7210934 -2.958316,-6.7214395 z\"\r\n         id=\"middle-outline\"\r\n         inkscape:connector-curvature=\"0\"\r\n         sodipodi:nodetypes=\"sscss\"\r\n         inkscape:label=\"middle-outline\" />\r\n      <path\r\n         style=\"fill:#000012;fill-opacity:1;stroke:none;stroke-width:1.02918112px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"\r\n         d=\"m 15.939865,11.878838 c -0.822379,0.0033 -1.404285,1.981256 -1.404284,4.065998 10e-7,2.084742 0.499108,4.40718 1.459244,4.407179 0.960136,-1e-6 1.524881,-2.19813 1.527042,-4.398093 0.0022,-2.199963 -0.759623,-4.078404 -1.582002,-4.075084 z\"\r\n         id=\"iris\"\r\n         inkscape:connector-curvature=\"0\"\r\n         sodipodi:nodetypes=\"zzzzz\"\r\n         inkscape:label=\"iris\" />\r\n    </g>\r\n  </g>\r\n  <path\r\n     inkscape:label=\"outline2\"\r\n     inkscape:connector-curvature=\"0\"\r\n     id=\"outline2\"\r\n     d=\"m 4.1355932,15.966102 c 0,0 5.4237288,-6.2033901 12.0000008,-6.1016951 6.576271,0.101695 11.559322,6.0338981 11.559322,6.0338981 0,0 -2.745763,6 -11.423729,6.101695 C 7.5932203,22.101695 4.1355932,15.966102 4.1355932,15.966102 Z\"\r\n     style=\"display:inline;fill:none;fill-opacity:1;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;font-variant-east_asian:normal;opacity:1;vector-effect:none;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0\" />\r\n  <g\r\n     class=\"lock\"\r\n     style=\"display:inline;fill:#000000;fill-rule:evenodd\"\r\n     id=\"lock\"\r\n     fill-opacity=\"var(--eye-opacity)\"\r\n     inkscape:label=\"lock\">\r\n    <path\r\n       d=\"m 30,22 c 1,0 2,1 2,2 v 4 c 0,1 -1,2 -2,2 h -7 c -1,0 -2,-1 -2,-2 v -4 c 0,-1 1,-2 2,-2 v -1 c 0,-2 2,-3.5 3.5,-3.5 2.5,0 3.5,2.5 3.5,3.5 z m -5,-1 c 0,-1 1,-1.5 1.5,-1.5 0.5,0 1.5,0.5 1.5,1.5 v 1 h -3 z\"\r\n       id=\"path28\"\r\n       inkscape:connector-curvature=\"0\" />\r\n  </g>\r\n</svg>\r\n\n                    </div>\r\n                </a>\r\n                <div class=\"popup-menu-box hover-menu-box follow-popup\">\r\n                    <div class=hover-area></div>\r\n                    <div class=not-following>\r\n                        <div class=\"button follow-button public\">\r\n                            Follow\r\n                        </div>\r\n                        <div class=\"button follow-button private\">\r\n                            Follow&nbsp;Privately\r\n                        </div>\r\n                        <input class=\"folder premium-only\" placeholder=\"Folder\">\r\n                        </input>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </template>\r\n\r\n        <!-- bookmark_tag_list_widget -->\r\n        <template class=template-popup-bookmark-tag-dropdown>\r\n            <div class=popup-bookmark-tag-dropdown>\r\n                <div class=tag-list></div> <!-- tag list is inserted here -->\r\n                <div class=tag-right-button-strip>\r\n                    <div class=\"tag-button popup add-tag\" data-popup=\"Add a different tag\" style=\"padding: 4px 8px; text-align: center;\">\r\n                        <div class=grey-icon>\r\n                            +\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"tag-button popup sync-tags\" data-popup=\"Load common tags from bookmarks\" style=\"padding: 4px 8px; \">\r\n                        <div class=grey-icon>\r\n<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<svg\r\n   xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\r\n   xmlns:cc=\"http://creativecommons.org/ns#\"\r\n   xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\r\n   xmlns:svg=\"http://www.w3.org/2000/svg\"\r\n   xmlns=\"http://www.w3.org/2000/svg\"\r\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\r\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\r\n   width=\"32px\"\r\n   height=\"32px\"\r\n   viewBox=\"0 0 32 32\"\r\n   fill=\"currentColor\"\r\n   version=\"1.1\"\r\n   id=\"svg1420\"\r\n   sodipodi:docname=\"refresh-icon.svg\"\r\n   inkscape:version=\"0.92.3 (2405546, 2018-03-11)\">\r\n  <metadata\r\n     id=\"metadata1426\">\r\n    <rdf:RDF>\r\n      <cc:Work\r\n         rdf:about=\"\">\r\n        <dc:format>image/svg+xml</dc:format>\r\n        <dc:type\r\n           rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\" />\r\n      </cc:Work>\r\n    </rdf:RDF>\r\n  </metadata>\r\n  <defs\r\n     id=\"defs1424\" />\r\n  <sodipodi:namedview\r\n     pagecolor=\"#ffffff\"\r\n     bordercolor=\"#666666\"\r\n     borderopacity=\"1\"\r\n     objecttolerance=\"10\"\r\n     gridtolerance=\"10\"\r\n     guidetolerance=\"10\"\r\n     inkscape:pageopacity=\"0\"\r\n     inkscape:pageshadow=\"2\"\r\n     inkscape:window-width=\"1920\"\r\n     inkscape:window-height=\"1137\"\r\n     id=\"namedview1422\"\r\n     showgrid=\"false\"\r\n     inkscape:zoom=\"20\"\r\n     inkscape:cx=\"15.106191\"\r\n     inkscape:cy=\"12.284971\"\r\n     inkscape:window-x=\"1912\"\r\n     inkscape:window-y=\"-8\"\r\n     inkscape:window-maximized=\"1\"\r\n     inkscape:current-layer=\"svg1420\" />\r\n  <path\r\n     d=\"m 26.276037,5.3768832 c -1.025134,1.0011097 -2.02431,2.0295002 -3.045196,3.0348589 -0.04956,0.058054 -0.106666,-0.00755 -0.14584,-0.040119 C 21.928138,7.2398222 20.508951,6.3760574 18.96837,5.877697 17.193738,5.3037727 15.265759,5.2136254 13.444872,5.6138616 10.203806,6.3062518 7.36529,8.6372987 6.0612647,11.683911 c 0.00146,6.57e-4 0.00293,0.0011 0.0044,0.0018 -0.1085548,0.214135 -0.1701475,0.456213 -0.1701475,0.712685 0,0.871977 0.7068799,1.57881 1.5788103,1.57881 0.7471862,0 1.3726975,-0.519269 1.5365211,-1.216426 0.9324853,-1.981309 2.7767344,-3.5136299 4.9070024,-4.0366749 2.46372,-0.6215932 5.256407,0.062775 7.051336,1.8898429 -1.039766,1.030325 -2.095153,2.045548 -3.130623,3.080121 2.809206,-0.01511 5.619357,-0.0066 8.429036,-0.0043 0.02356,-2.770504 0.0065,-5.5419533 0.0085,-8.3129769 z\"\r\n     id=\"path1416\"\r\n     inkscape:connector-curvature=\"0\"\r\n     style=\"stroke-width:0.0471977\" />\r\n  <path\r\n     d=\"m 23.993462,17.899375 c -0.690029,0 -1.276273,0.442856 -1.491023,1.05973 -4.1e-4,-1.89e-4 -9.03e-4,-3.84e-4 -0.0013,-5.76e-4 -0.901948,2.010149 -2.717172,3.59736 -4.853811,4.161892 -2.491991,0.675447 -5.354578,0.01412 -7.182498,-1.843116 1.034573,-1.027022 2.094115,-2.029973 3.123969,-3.061668 -2.817703,0.0023 -5.6358774,0.0014 -8.45358,4.67e-4 -0.00661,2.765785 -0.00751,5.53105 5.212e-4,8.296835 1.0345736,-1.034101 2.0648989,-2.072451 3.105136,-3.100841 0.6659124,0.650808 1.4046034,1.230444 2.2145168,1.692933 2.583554,1.508958 5.824147,1.821926 8.651289,0.844414 2.712782,-0.910774 5.006402,-2.981856 6.192904,-5.584336 0.172054,-0.252838 0.272633,-0.558065 0.272633,-0.886987 4.6e-5,-0.871882 -0.706833,-1.578763 -1.578764,-1.578763 z\"\r\n     id=\"path1418\"\r\n     inkscape:connector-curvature=\"0\"\r\n     style=\"stroke-width:0.0471977\" />\r\n</svg>\r\n\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </template>\r\n\r\n        <template class=template-tag-dropdown>\r\n            <div>\r\n                <!-- This is to make sure there isn't a gap between the input and the dropdown,\r\n                     so we don't consider the mouse out of the box when it moves from the input\r\n                     to the autocomplete box. -->\r\n                <div class=hover-box style=\"top: -10px; width: 100%; z-index: -1;\"></div>\r\n                    \r\n                <div class=input-dropdown>\r\n                    <div class=input-dropdown-list>\r\n                        <!-- template-tag-dropdown-entry instances will be added here. -->\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </template>\r\n\r\n        <template class=template-tag-dropdown-entry>\r\n            <div class=entry>\r\n                <div class=suggestion-icon>\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" width=\"16\" height=\"16\" fill=\"black\">\r\n    <rect x=\"2\" y=\"12\" width=\"3\" height=\"3\" />\r\n    <rect x=\"7\" y=\"7\" width=\"3\" height=\"3\" />\r\n    <rect x=\"12\" y=\"2\" width=\"3\" height=\"3\" />\r\n</svg>\r\n\n                </div>\r\n                \r\n                <a class=tag></a>\r\n                <a class=\"remove-history-entry keep-menu-open\" href=#>X</a>\r\n            </div>\r\n        </template>\r\n\r\n        <template class=template-manga-thumbnail>\r\n            <div class=manga-thumbnail-box>\r\n                <img class=manga-thumb>\r\n            </div>\r\n        </template>\r\n\r\n        <template class=template-manga-view-thumbnail>\r\n            <li class=thumbnail-box>\r\n                <div class=thumbnail-inner>\r\n                    <a class=thumbnail-link href=#>\r\n                        <img class=thumb>\r\n                    </a>\r\n                </div>\r\n            </li>\r\n        </template>\r\n        \r\n        <template class=template-context-menu>\r\n            <div class=popup-context-menu>\r\n                <div class=button-strip>\r\n                    <div class=button-block>\r\n                        <div class=\"button button-return-to-search\" data-level=0 data-popup=\"Return to search\">\r\n<svg width=\"32\" height=\"32\" viewBox=\"0 -1 32 32\" fill=\"currentColor\">\r\n    <path d=\"M 4 3 h 10 v 10 h -10 v -10\"/>\r\n    <path d=\"M 18 3 h 10 v 10 h -10 v -10\"/>\r\n    <path d=\"M 4 17 h 10 v 10 h -10 v -10\"/>\r\n    <path d=\"M 18 17 h 10 v 10 h -10 v -10\"/>\r\n</svg>\r\n\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=button-block>\r\n                        <div class=\"button button-fullscreen enabled\" data-level=0 data-popup=\"Fullscreen\">\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" stroke-width=\"2\" fill=\"none\" stroke=\"currentColor\">\r\n    <path d=\"M 7 13 l 0 -6 l  6 0 m -6 0 l  5  5\" />\r\n    <path d=\"M25 13 l 0 -6 l -6 0 m  6 0 l -5  5\" />\r\n    <path d=\"M 7 19 l 0 +6 l  6 0 m -6 0 l  5 -5\" />\r\n    <path d=\"M25 19 l 0 +6 l -6 0 m  6 0 l -5 -5\" />\r\n</svg>\r\n\n                        </div>\r\n                    </div>\r\n                    <div class=context-menu-image-info>\r\n                        <div style=\"flex: 1;\"></div>\r\n                        <div class=page-count hidden></div>\r\n                        <div class=image-info hidden></div>\r\n                        <div style=\"flex: 1;\"></div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"button-strip zoom-strip\">\r\n                    <div class=button-block>\r\n                        <div class=\"button button-zoom\" data-popup=\"Zoom lock\">\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" stroke-width=\"2\" stroke=\"currentColor\">\r\n    <circle cx=\"16\" cy=\"16\" r=\"10\" fill=\"none\" />\r\n    <line x1=\"12\" y1=\"16\" x2=\"20\" y2=\"16\" />\r\n    <line x1=\"16\" y1=\"12\" x2=\"16\" y2=\"20\" />\r\n</svg>\r\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" stroke-width=\"2\" stroke=\"currentColor\">\r\n    <circle cx=\"16\" cy=\"16\" r=\"10\" fill=\"none\" />\r\n    <line x1=\"12\" y1=\"16\" x2=\"20\" y2=\"16\" />\r\n</svg>\r\n\n                        </div>\r\n                    </div>\r\n                    <div class=button-block>\r\n                        <div class=\"button button-zoom-level\" data-level=0 data-popup=\"Zoom to full\">\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" stroke-width=\"3\" fill=\"none\" stroke=\"currentColor\">\r\n    <path d=\"M8 14 l 0 -6 l 6 0\" />\r\n    <path d=\"M24 14 l 0 -6 l -6 0\" />\r\n    <path d=\"M8 18 l 0 +6 l 6 0\" />\r\n    <path d=\"M24 18 l 0 +6 l -6 0\" />\r\n</svg>\r\n\n                        </div>\r\n                    </div>\r\n                    <div class=button-block>\r\n                        <div class=\"button button-zoom-level\" data-level=1 data-popup=\"2x zoom\">\r\n                            <div>2x</div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=button-block>\r\n                        <div class=\"button button-zoom-level\" data-level=2 data-popup=\"4x zoom\">\r\n                            <div>4x</div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=button-block>\r\n                        <div class=\"button button-zoom-level\" data-level=3 data-popup=\"8x zoom\">\r\n                            <div>8x</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=button-strip>\r\n                    <!-- position: relative positions the popup menu. -->\r\n                    <div class=button-block style=\"position: relative;\">\r\n                        <!-- position: relative positions the bookmark count. -->\r\n                        <div class=\"button button-bookmark public\" style=\"position: relative;\">\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" class=\"heart-image\" fill=\"currentColor\">\r\n    <g class=\"heart\">\r\n        <path d=\"M21,5.5 C24.8659932,5.5 28,8.63400675 28,12.5 C28,18.2694439 24.2975093,23.1517313 17.2206059,27.1100183 C16.4622493,27.5342993 15.5379984,27.5343235 14.779626,27.110148 C7.70250208,23.1517462 4,18.2694529 4,12.5 C4,8.63400691 7.13400681,5.5 11,5.5 C12.829814,5.5 14.6210123,6.4144028 16,7.8282366 C17.3789877,6.4144028 19.170186,5.5 21,5.5 Z\" />\r\n    </g>\r\n    <g class=\"delete\">\r\n        <line x1=\"5\" y1=\"27\" x2=\"28\" y2=\"4\" stroke-width=\"3\" stroke=\"white\" />\r\n    </g>\r\n\r\n    <g class=\"lock\" fill=\"#000\" style=\"fill-rule: evenodd;\">\r\n        <path d=\"\r\n            M 30 22\r\n            c 1 0, 2 1, 2 2\r\n            v 4\r\n            c 0 1, -1 2, -2 2\r\n            h -7\r\n            c -1 0, -2 -1, -2 -2\r\n            v -4\r\n            c 0 -1, 1 -2, 2 -2\r\n            v -1\r\n            c 0 -2, 2 -3.5, 3.5 -3.5 \r\n            c 2.5 0, 3.5 2.5, 3.5 3.5\r\n            v 1\r\n            Z\r\n\r\n            M 25 21\r\n            c 0 -1, 1 -1.5, 1.5 -1.5\r\n            c .5 0, 1.5 .5, 1.5 1.5\r\n            v 1\r\n            h -3\r\n            v -1\r\n            Z\"\r\n        />\r\n    </g>   \r\n</svg>\r\n\n \r\n                            <div class=count></div>\r\n                        </div>\r\n\r\n                        <div class=popup-bookmark-tag-dropdown-container></div>\r\n                    </div>\r\n\r\n                    <div class=button-block>\r\n                        <div class=\"button button-bookmark private\">\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" class=\"heart-image\" fill=\"currentColor\">\r\n    <g class=\"heart\">\r\n        <path d=\"M21,5.5 C24.8659932,5.5 28,8.63400675 28,12.5 C28,18.2694439 24.2975093,23.1517313 17.2206059,27.1100183 C16.4622493,27.5342993 15.5379984,27.5343235 14.779626,27.110148 C7.70250208,23.1517462 4,18.2694529 4,12.5 C4,8.63400691 7.13400681,5.5 11,5.5 C12.829814,5.5 14.6210123,6.4144028 16,7.8282366 C17.3789877,6.4144028 19.170186,5.5 21,5.5 Z\" />\r\n    </g>\r\n    <g class=\"delete\">\r\n        <line x1=\"5\" y1=\"27\" x2=\"28\" y2=\"4\" stroke-width=\"3\" stroke=\"white\" />\r\n    </g>\r\n\r\n    <g class=\"lock\" fill=\"#000\" style=\"fill-rule: evenodd;\">\r\n        <path d=\"\r\n            M 30 22\r\n            c 1 0, 2 1, 2 2\r\n            v 4\r\n            c 0 1, -1 2, -2 2\r\n            h -7\r\n            c -1 0, -2 -1, -2 -2\r\n            v -4\r\n            c 0 -1, 1 -2, 2 -2\r\n            v -1\r\n            c 0 -2, 2 -3.5, 3.5 -3.5 \r\n            c 2.5 0, 3.5 2.5, 3.5 3.5\r\n            v 1\r\n            Z\r\n\r\n            M 25 21\r\n            c 0 -1, 1 -1.5, 1.5 -1.5\r\n            c .5 0, 1.5 .5, 1.5 1.5\r\n            v 1\r\n            h -3\r\n            v -1\r\n            Z\"\r\n        />\r\n    </g>   \r\n</svg>\r\n\n                        </div>\r\n                    </div>\r\n                    \r\n                    <div class=button-block style=\"position: relative;\">\r\n                        <div class=\"button button-bookmark-tags\" data-popup=\"Bookmark tags\">\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" fill=\"#000\">\r\n    <defs>\r\n        <mask id=\"mask\">\r\n            <rect width=\"100%\" height=\"100%\" fill=\"white\" />\r\n            <circle cx=\"22\" cy=\"10\" r=\"2\" fill=\"black\" />\r\n        </mask>\r\n    </defs>\r\n    \r\n    <path id=\"tag\" d=\"M2 18 L 16 4 L 28 4 L 28 16 L 14 30 L2 18\" mask=\"url(#mask)\" fill=\"currentColor\" />\r\n    <circle id=\"hole\" cx=\"22\" cy=\"10\" r=\"2\" fill=\"#444\" />\r\n</svg>\r\n\n                            <div style=\"position: absolute; bottom: 2px; left: 4px;\">\r\n                                <div class=tag-dropdown-arrow hidden></div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=button-block>\r\n                        <div class=\"button button-like enabled\" style=\"position: relative;\">\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" fill=\"currentColor\">\r\n    <path class=\"mouth\" stroke-width=\"1\" stroke-linecap=\"round\"\r\n    transform-origin=\"50% 50%\"\r\n    d=\"\r\n        M 6 14\r\n        A 4 4.5 0 0 0 26 14\r\n        M 26 14\r\n        C 26 10, 6 10, 6 14\" />\r\n    <ellipse class=\"eye\" cx=\"6\" cy=\"9\" rx=\"1.5\" ry=\"1.5\" transform-origin=\"6 9\" stroke=\"none\" />\r\n    <ellipse class=\"eye\" cx=\"26\" cy=\"9\" rx=\"1.5\" ry=\"1.5\" transform-origin=\"26 9\" stroke=\"none\" />\r\n</svg>\r\n\n \r\n                            <div class=count></div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=button-block>\r\n                        <div class=\"avatar-widget-container\"></div>\r\n                    </div>\r\n                </div>\r\n                               \r\n                <!--\r\n                <div style=\"display: flex; flex-direction: column; text-align: left;\">\r\n                    <div>\r\n                        <span style=\"fill: #fff;\">\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"10 5 80 60\" fill=\"currentColor\">\r\n    <g class=\"plug\">\r\n        <path d=\"M52.084,56.25H43.75c-1.151,0-2.083-0.932-2.083-2.083s0.932-2.084,2.083-2.084h8.334  c1.151,0,2.083,0.933,2.083,2.084S53.235,56.25,52.084,56.25z\"></path>\r\n        <path d=\"M52.084,58.333H43.75c-1.151,0-2.083,0.933-2.083,2.084S42.599,62.5,43.75,62.5h1.042  c0,1.151,0.932,2.083,2.083,2.083h2.084c1.151,0,2.083-0.932,2.083-2.083h1.042c1.151,0,2.083-0.932,2.083-2.083  S53.235,58.333,52.084,58.333z\"></path>\r\n    </g>\r\n    <g class=\"shine\">\r\n        <path d=\"M47.917,12.5c-1.151,0-2.083-0.932-2.083-2.083V2.083C45.834,0.932,46.766,0,47.917,0S50,0.932,50,2.083  v8.333C50,11.568,49.068,12.5,47.917,12.5z\"></path>\r\n        <path d=\"M29.167,31.25h-8.333c-1.151,0-2.084-0.932-2.084-2.083s0.933-2.084,2.084-2.084h8.333  c1.151,0,2.083,0.933,2.083,2.084S30.318,31.25,29.167,31.25z\"></path>\r\n        <path d=\"M34.375,17.708c-0.532,0-1.065-0.203-1.473-0.61l-5.895-5.892c-0.813-0.814-0.813-2.132,0-2.946  c0.813-0.814,2.132-0.814,2.946,0l5.895,5.892c0.813,0.814,0.813,2.132,0,2.946C35.441,17.505,34.908,17.708,34.375,17.708z\"></path>\r\n        <path d=\"M61.459,17.708c-0.533,0-1.066-0.203-1.474-0.61c-0.813-0.813-0.813-2.132,0-2.946l5.893-5.895  c0.813-0.814,2.132-0.814,2.945,0c0.814,0.814,0.814,2.132,0,2.946l-5.892,5.895C62.524,17.505,61.991,17.708,61.459,17.708z\"></path>\r\n        <path d=\"M75,31.25h-8.333c-1.151,0-2.083-0.932-2.083-2.083s0.932-2.084,2.083-2.084H75  c1.151,0,2.084,0.933,2.084,2.084S76.151,31.25,75,31.25z\"></path>\r\n    </g>\r\n\r\n    <path class=\"bulb\" d=\"M58.655,39.01c2.38-2.596,3.845-6.045,3.845-9.843c0-8.055-6.529-14.583-14.583-14.583  s-14.583,6.529-14.583,14.583c0,3.674,1.369,7.021,3.61,9.584c0.975,1.097,4.723,5.54,4.723,9.166c0,1.151,0.932,2.083,2.083,2.083  h8.334c1.151,0,2.083-0.932,2.083-2.083V47.8C54.237,44.439,57.441,40.416,58.655,39.01z\"></path>\r\n</svg>\r\n\n                        </span>\r\n                        <span>See similar images</span>\r\n                    </div>\r\n                    <div>Save image</div>\r\n                    <div>Save all images (ZIP)</div>\r\n                </div>\r\n                -->\r\n                <div class=tooltip-display>\r\n                    <div class=tooltip-display-text></div>\r\n                </div>\r\n            </div>\r\n        </template>\r\n\r\n        <!-- Recent bookmark tags in the popup menu: -->\r\n        <style>\r\n        .popup-bookmark-tag-entry {\r\n            padding: 2px 8px;\r\n            display: flex;\r\n            cursor: pointer;\r\n        }\r\n                   .popup-bookmark-tag-entry.active {\r\n            background-color: #004;\r\n        }\r\n        body.light .popup-bookmark-tag-entry.active {\r\n            background-color: #00c;\r\n            color: #fff;\r\n        }\r\n                   .popup-bookmark-tag-entry.active:hover {\r\n            background-color: #00a;\r\n        }\r\n        body.light .popup-bookmark-tag-entry.active:hover {\r\n            background-color: #00a;\r\n        }\r\n                   .popup-bookmark-tag-entry:not(.active):hover {\r\n            background-color: #222;\r\n        }\r\n        body.light .popup-bookmark-tag-entry:not(.active):hover {\r\n            background-color: #ccc;\r\n        }\r\n\r\n        .popup-bookmark-tag-entry > .tag-name {\r\n            flex: 1;\r\n        }\r\n        </style>\r\n        <template class=template-popup-bookmark-tag-entry>\r\n            <div class=popup-bookmark-tag-entry style=\"display: flex; flex-direction: row; align-items: center; \">\r\n                <span class=tag-name></span>\r\n            </div>\r\n        </template>\r\n        \r\n        <template class=template-menu-slider>\r\n            <div class=\"menu-slider thumbnail-size-box\">\r\n                <div class=\"box-section\">\r\n                    <span class=label></span>\r\n                </div>\r\n                <div class=\"box-section\">\r\n                    <input class=thumbnail-size type=range>\r\n                </div>\r\n            </div>\r\n        </template>\r\n        <template class=template-menu-toggle>\r\n            <div class=\"menu-toggle box-link\">\r\n                <span class=on>\u2611</span>\r\n                <span class=off>\u2610</span>\r\n                <span class=label style=\"margin-left: 2px;\"></span>\r\n            </div>\r\n        </template>\r\n\r\n        <!-- The \"add tag\" popup.  This isn't generalized since this is the only overlay prompt\r\n             we have right now. -->\r\n        <style>\r\n        .tag-entry-popup {\r\n            position: fixed;\r\n            top: 0;\r\n            left: 0;\r\n            width: 100%;\r\n            height: 100%;\r\n            background-color: rgba(0,0,0,0.5);\r\n        }\r\n        .tag-entry-popup > .strip {\r\n            display: flex;\r\n            flex-direction: column;\r\n            align-items: center;\r\n            height: 100%;\r\n            justify-content: center;\r\n        }\r\n        .tag-entry-popup > .strip > .box {\r\n            background-color: #222;\r\n            padding: 10px;\r\n            color: #eee;\r\n            position: relative;\r\n        }\r\n        body.light .tag-entry-popup > .strip > .box {\r\n            background-color: #ddd;\r\n            color: #222;\r\n        }\r\n        .tag-entry-popup .close-button {\r\n            position: absolute;\r\n            top: 0px;\r\n            right: 0px;\r\n            padding: 8px;\r\n            cursor: pointer;\r\n        }\r\n        .tag-entry-popup .tag-input-box {\r\n            position: relative;\r\n            display: flex;\r\n            align-items: center;\r\n        }\r\n        .tag-entry-popup .tag-input-box > .add-tag-input {\r\n            flex: 1;\r\n            padding: 4px;\r\n        }\r\n        .tag-entry-popup .tag-input-box > .submit-button {\r\n            cursor: pointer;\r\n            display: inline-block;\r\n            width: 20px;\r\n            text-align: center;\r\n            margin-left: 6px;\r\n            border: 1px solid white;\r\n        }\r\n        body.light .tag-entry-popup .tag-input-box > .submit-button {\r\n            border-color: #444;\r\n        }\r\n        .tag-entry-popup .tag-input-box > .submit-button:hover {\r\n            background-color: #444;\r\n        }\r\n        body.light .tag-entry-popup .tag-input-box > .submit-button:hover {\r\n            background-color: #aaa;\r\n        }\r\n        </style>\r\n        <template class=template-add-tag-prompt>\r\n            <div class=\"tag-entry-popup\">\r\n                <div class=strip>\r\n                    <div class=box>\r\n                        <div class=close-button>X</div>\r\n                        <div style=\"margin-bottom: 4px;\">\r\n                            New tag:\r\n                        </div>\r\n                        <div class=tag-input-box>\r\n                            <input class=add-tag-input>\r\n                            <span class=submit-button>+</span>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </template>\r\n    </div>\r\n</div>\r\n"
};
var binary_data = 
{
    "activate-icon.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAsCAYAAAAacYo8AAAACXBIWXMAAC4jAAAuIwF4pT92AAAGU2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wNi0yN1QwMjoyMjoyOS0wNTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDYtMjdUMDI6MjY6MjAtMDU6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDYtMjdUMDI6MjY6MjAtMDU6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MWU4MmI3MjgtOTVjNi1mNzQyLWJjOWQtMjIwMTM5NzJkNDBlIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6N2ZkYzUwY2ItYjgzMy1hNzQzLTllMjYtNzQ1NmM4NDFlNjM0IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MzMyMzRmNjktNjk2OS1jNjQ1LWI0MjgtYmM1NDUwYTM3NDAzIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozMzIzNGY2OS02OTY5LWM2NDUtYjQyOC1iYzU0NTBhMzc0MDMiIHN0RXZ0OndoZW49IjIwMTgtMDYtMjdUMDI6MjI6MjktMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MWU4MmI3MjgtOTVjNi1mNzQyLWJjOWQtMjIwMTM5NzJkNDBlIiBzdEV2dDp3aGVuPSIyMDE4LTA2LTI3VDAyOjI2OjIwLTA1OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmQ/KUAAAAQhSURBVFiF7ZlNTxtHGMd/s/aaGGqDHRRLwQergko+lJhW4pJDqdQLpzSfoOHqU/sJGj5By8VXkk8QcuqlUtxjckBWLxxaqVYFVQnCdWiDYy/e6WG8Zr07a68X8xIpfwmtZp6Z2d8+fuaZF4SUkvdRxnUDRNV7Cx4HEEJMbsRKpwTMAc7TUb3316ScqEUd3gltIaW8GHil8zXwBbCGgg2rKvAc2KGcqIftdDHwSmcN+AZ4NF7HQO0AW5QT1VENo4FXOo+A74GCzizaDWg3EN1TOGsNGuNJZOI2cioL8eSwD9ignGhOBnwIsGgdIt4dIlqvwbaGj+O8fCqLTC+pj/Cr2YPfiQ6uJtoPqPj1ARtv9vyeHUMymcPOfAqGqTNvUE488fUZCV7pPEZ52SfRbmAcvYwMPKB4Evv2Z0gzrbP64IPBK5054BkaLzsKAy6TOWR60Qek7WuYdO/cD4r9FXf6dMDjA01UaLxgMP82PeXhwDML2JnlfvnjuzESpqBjSQ6ObNpk6ebXVagd76pGtoVxvIudu68bchtY8Vaer5xqAnqha8BGWOhufh07s0wmZbBaNFktmszPGqSnBfOzBvcW46wWVTzLZA45s9DvK6wTxH913bClHpsGXBm2PdA7lBMrKI8PB777Fd38er+8lI8Nbe/A25nlAS8bJ78HdfHNNcfj2576GiE93c2vg2EiWodhmvf1+Sc9z7vngG0h3h7omhd6K3RfDvimq64JPBy2CPjUi9FxFHP9KO45Id4FOuCBu+CA/4jaAAFUx9k7GEcvEda/YZtrNRDr7UZQs9LAewF63nVCY26cl040p4NaffUrcMldOM8qaoOzCTydHEVIeVbfML/gYB4vJx5PkiesjDd74RqqdaYG13gCerWnwkG0G+EzkmsFvRZwBxrb0s4PaaZGjhEf2SKCXu1ZTN8SLMwbZFLnvvnzsMvfDbtfjv31s7+zYQbtFuvuwqWAG//8yulskd/2TaDrtx/vBoaHTN4JGrbqLlwKuHh7QEy/Ao6UnM4HmZ67CzfqekJOZYNORXXviehSwN0brnEk54pBpk1vxURDJbb/U+S+dmY56BRU1R3hbkSoyI8KA/sVl5rAQ53hUiZnaBkm9mxxGPSXQbvUSODSTGGnlzBO9yOf8uXMAnZqKeicWUdtrWtB/aN53DCR6UW66UWEdQKt1+p51lLPINiprDqy3cpd6FIoOrgbxkyDmcZ7yy6sE7DPem1SQauhW3Xgu6CLIK+igteALdSpZA3NHj4gQ+i0AzwNC+woKnizl6KeAM4laAm4h7qmK6E/kDRRH10DfkGlumYUgMlkFXUIqU5krJC6EXk8ij6AX7WGg6sL0AcaS6E3Ia9Nozz+B/Ctpr4AvKDS0dmuRKOyytYIe21CHGNLfPjP8hXrf5SZd4NRInfBAAAAAElFTkSuQmCC", 
    "eye-icon.svg": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgdmlld0JveD0iMCAwIDMyIDMyIgogICB3aWR0aD0iMzIiCiAgIGhlaWdodD0iMzIiCiAgIGNsYXNzPSJleWUtaW1hZ2UiCiAgIGZpbGw9ImN1cnJlbnRDb2xvciIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0ic3ZnMzIiCiAgIHNvZGlwb2RpOmRvY25hbWU9ImV5ZS1pY29uLnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45Mi4zICgyNDA1NTQ2LCAyMDE4LTAzLTExKSI+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhMzgiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgICAgPGRjOnRpdGxlIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxkZWZzCiAgICAgaWQ9ImRlZnMzNiIgLz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgICAgb2JqZWN0dG9sZXJhbmNlPSIxMCIKICAgICBncmlkdG9sZXJhbmNlPSIxMCIKICAgICBndWlkZXRvbGVyYW5jZT0iMTAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE5MjAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTEzNyIKICAgICBpZD0ibmFtZWR2aWV3MzQiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOnpvb209IjQxLjcxOTMiCiAgICAgaW5rc2NhcGU6Y3g9IjExLjU5NTE2NyIKICAgICBpbmtzY2FwZTpjeT0iMTcuNzAxOTg0IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIxOTEyIgogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzMyIiAvPgogIDxyZWN0CiAgICAgeD0iMCIKICAgICB5PSIwIgogICAgIHdpZHRoPSIzMiIKICAgICBoZWlnaHQ9IjMyIgogICAgIGZpbGw9IiMwMDgiCiAgICAgaWQ9InJlY3QyNCIKICAgICBzdHlsZT0iZmlsbDojMDAwMDg4O2ZpbGwtb3BhY2l0eTowIiAvPgogIDxwYXRoCiAgICAgc3R5bGU9ImZpbGw6bm9uZTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6I2ZmZmZmZjtzdHJva2Utd2lkdGg6MztzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lIgogICAgIGQ9Im0gNC4xMzU1OTMyLDE1Ljk2NjEwMiBjIDAsMCA1LjQyMzcyODgsLTYuMjAzMzkgMTIuMDAwMDAwOCwtNi4xMDE2OTUgNi41NzYyNzEsMC4xMDE2OTUgMTEuNTU5MzIyLDYuMDMzODk4IDExLjU1OTMyMiw2LjAzMzg5OCAwLDAgLTIuNzQ1NzYzLDYgLTExLjQyMzcyOSw2LjEwMTY5NSBDIDcuNTkzMjIwMywyMi4xMDE2OTUgNC4xMzU1OTMyLDE1Ljk2NjEwMiA0LjEzNTU5MzIsMTUuOTY2MTAyIFoiCiAgICAgaWQ9Im91dGxpbmUxIgogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgaW5rc2NhcGU6bGFiZWw9IiIgLz4KICA8cGF0aAogICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjFweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgIGQ9Im0gNC4xMzU1OTMyLDE1Ljk2NjEwMiBjIDAsMCA1LjQyMzcyOCwtNi4yMDMzOTAxIDExLjk5OTk5OTgsLTYuMTAxNjk1MSA2LjU3NjI3MSwwLjEwMTY5NSAxMS41NTkzMjIsNi4wMzM4OTgxIDExLjU1OTMyMiw2LjAzMzg5ODEgMCwwIC0yLjc0NTc2Myw2IC0xMS40MjM3MjksNi4xMDE2OTUgQyA3LjU5MzIyMDIsMjIuMTAxNjk1IDQuMTM1NTkzMiwxNS45NjYxMDIgNC4xMzU1OTMyLDE1Ljk2NjEwMiBaIgogICAgIGlkPSJmaWxsIgogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgaW5rc2NhcGU6bGFiZWw9IiIgLz4KICA8ZwogICAgIGNsYXNzPSJsb2NrIgogICAgIHN0eWxlPSJmaWxsLXJ1bGU6IGV2ZW5vZGQ7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgLTJweCk7IGRpc3BsYXk6IG5vbmU7IgogICAgIGlkPSJnMzAiCiAgICAgZmlsbD0iIzAwMCI+CiAgICA8cGF0aAogICAgICAgZD0iICAgICAgICAgICAgIE0gMzAgMjIgICAgICAgICAgICAgYyAxIDAsIDIgMSwgMiAyICAgICAgICAgICAgIHYgNCAgICAgICAgICAgICBjIDAgMSwgLTEgMiwgLTIgMiAgICAgICAgICAgICBoIC03ICAgICAgICAgICAgIGMgLTEgMCwgLTIgLTEsIC0yIC0yICAgICAgICAgICAgIHYgLTQgICAgICAgICAgICAgYyAwIC0xLCAxIC0yLCAyIC0yICAgICAgICAgICAgIHYgLTEgICAgICAgICAgICAgYyAwIC0yLCAyIC0zLjUsIDMuNSAtMy41ICAgICAgICAgICAgICBjIDIuNSAwLCAzLjUgMi41LCAzLjUgMy41ICAgICAgICAgICAgIHYgMSAgICAgICAgICAgICBaICAgICAgICAgICAgICBNIDI1IDIxICAgICAgICAgICAgIGMgMCAtMSwgMSAtMS41LCAxLjUgLTEuNSAgICAgICAgICAgICBjIC41IDAsIDEuNSAuNSwgMS41IDEuNSAgICAgICAgICAgICB2IDEgICAgICAgICAgICAgaCAtMyAgICAgICAgICAgICB2IC0xICAgICAgICAgICAgIFoiCiAgICAgICBpZD0icGF0aDI4IiAvPgogIDwvZz4KICA8ZwogICAgIGlkPSJsYXllcjEiCiAgICAgaW5rc2NhcGU6bGFiZWw9Im1pZGRsZSIKICAgICBzdHlsZT0iZGlzcGxheTppbmxpbmU7b3BhY2l0eToxIgogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOiMwMGE4ZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuMDI5MTgxMTJweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0ibSAxMy40ODgwNTgsMTAuMTcyMjI3IGMgMCwwIC0wLjYwNjcwMiwwLjU3NzU2OSAtMC41Mzg5MDUsMy44ODA4OCAwLjA1ODk4LDIuODczNzg0IDAuOTIxNDMxLDUuODI1MzQ2IDIuOTkxMjc1LDUuODc3OTk0IDIuMzY5Nzc2LC0wLjA0MzA0IDIuOTkwODc1LC0yLjk2NjkxNCAyLjk3NDgyNywtNS45ODU3MSAtMC4wMTY3OCwtMy4xNTYxMDUgLTAuNDk5MTkyLC0zLjc0MTI0IC0wLjQ5OTE5MiwtMy43NDEyNCIKICAgICAgIGlkPSJwYXRoNDIiCiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjc2NzYyIgLz4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDojMDAwMDEyO2ZpbGwtb3BhY2l0eTowLjkyOTY0ODI1O3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxLjAyOTE4MTEycHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Im0gMTUuMTQ4ODY0LDkuNzkzNDcyNCBjIDAsMCAtMC43MzMxMzIsMS43MTc1ODg2IC0wLjYzNzI1MywzLjg1MDI3MDYgMC4wOTU4OCwyLjEzMjY4IDAuNDUyNTE2LDQuMzU2NDAxIDEuNDU5MjQ0LDQuNDA3MTc5IDAuOTEwODUsLTAuMDUwNzggMS40NzQ3OCwtMi4wMTE2MjQgMS41MjcwNDIsLTQuMzk4MDkzIDAuMDQ3OTQsLTIuMTg5MDkxIC0wLjY5NTEyMiwtMy44ODQ3NDU1IC0wLjY5NTEyMiwtMy44ODQ3NDU1IgogICAgICAgaWQ9ImlyaXMiCiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjc2NzYyIKICAgICAgIGlua3NjYXBlOmxhYmVsPSIiIC8+CiAgPC9nPgogIDxwYXRoCiAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MXB4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjE7ZmlsbC1vcGFjaXR5OjEiCiAgICAgZD0ibSA0LjEzNTU5MzIsMTUuOTY2MTAyIGMgMCwwIDUuNDIzNzI4OCwtNi4yMDMzOTAxIDEyLjAwMDAwMDgsLTYuMTAxNjk1MSA2LjU3NjI3MSwwLjEwMTY5NSAxMS41NTkzMjIsNi4wMzM4OTgxIDExLjU1OTMyMiw2LjAzMzg5ODEgMCwwIC0yLjc0NTc2Myw2IC0xMS40MjM3MjksNi4xMDE2OTUgQyA3LjU5MzIyMDMsMjIuMTAxNjk1IDQuMTM1NTkzMiwxNS45NjYxMDIgNC4xMzU1OTMyLDE1Ljk2NjEwMiBaIgogICAgIGlkPSJvdXRsaW5lMiIKICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgIGlua3NjYXBlOmxhYmVsPSIjcGF0aDQ0IiAvPgo8L3N2Zz4K", 
    "favorited_icon.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAGbWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wNi0yMFQwMDo1NjoyOS0wNTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDYtMjBUMDE6MjM6NTktMDU6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDYtMjBUMDE6MjM6NTktMDU6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTFkYzgwNjgtMDM1Ny0xNzRlLTlmMDAtNThjYjk4NTQ4OWQ2IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NzdlYmJlZGEtYjQ4Yy0yYzRkLTk2MTQtYmM3NmZmN2VjYTU5IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZDFkMGQ2NzQtMTBkNC00MDQ1LTliZGQtNTY2ZDYxZTNlYTU0Ij4gPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8cmRmOkJhZz4gPHJkZjpsaSBwaG90b3Nob3A6TGF5ZXJOYW1lPSLimIUiIHBob3Rvc2hvcDpMYXllclRleHQ9IuKYhSIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDFkMGQ2NzQtMTBkNC00MDQ1LTliZGQtNTY2ZDYxZTNlYTU0IiBzdEV2dDp3aGVuPSIyMDE4LTA2LTIwVDAwOjU2OjI5LTA1OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMWRjODA2OC0wMzU3LTE3NGUtOWYwMC01OGNiOTg1NDg5ZDYiIHN0RXZ0OndoZW49IjIwMTgtMDYtMjBUMDE6MjM6NTktMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+LpZUDAAABwxJREFUeJzlm29sG2cdxz93tnOOHedP4yZuq7QpibsSBeKWsVWZyqAQaWKTJmBVEjQoSBOVKAiYqkkVlYbGEO94AWKiiGkvOmnrRMUfsSpNUatVtEQg1JCkLWFZk5JiO2qSJk5jJznfHS98h52ssc/2+W6wr2RZ57t7nu/zfb6/3/NPFjj+FhvgA14GngMCG2/+jyIF/B74NnA394a44cGjwCLwPf5/Gg9QDfQCM8DPAcG4kSvAb4FfAG47mdkMAfgm8A/0thsCHAWedoiUE9gD/A4yAviBVxyl4wyeAlpF4Je8Pxd8WPCmCHzRaRYOYr8IeJ1m4SA8jmR8yS1T5UojudOspt2sKW5W0x4nqDgz5LXUz9HeGKc9GGdiNsTEXIiJ2ZATVOwXwONSONQ+xtEDF9i/Y4q/R3dyaqiH6YVGR1xge/YP+hN8q3uA/TsmARdd22/znYPn2OpP2E0FcECAjuY7fGzbv8jORgUe2hqlMzRtNxXAZgE8LoWe8Ih+Jaz7/mx4FI9LsZMOYLMAQX+CIw+/s6HqzPdXP3GZoANhYKsAHc13CAUWyFmM6RBoqlmko/mOnXQAGwV4sP1Zd90THrE9DGwT4MH2X0/jyMPv2B4Gtgmwuf0NCIQCC7aHgS0C5Lc/6363OwxsEaDeu0z/visFqnQmDGwRYM/WGDvrZ9m89w3YHwYVF8AlqhzcfVO/KiwAwKG2MVyiWlFeBiouQJ03SW/kqn5VSIAMncNdQ9R5kxXlZaDgatDjUvBXrdDou0+tN0m1Z61gM3IR2T5FZPuUfmXuzXAwRn/kCsPRVtP1aEBKriKx4mMuWcPymhdZcRV8T+D4W1q+BwJSisj2KXojV3nukYtIbtk0qfUQMWc4Vf8Uj9W0h1/95RBnhrsZjraytFptilVeeN0ynaFpjnUPIrnTZHqx1I8ZlF6+5E5zrHuQztA0XpMdVTAENARqpBUyJnMV0ZBSIej1lAINUKiRVtBM8izogJRcxWhsJ/GlekChVHtWHiqgEF+qZzS2k5RcZeqtggKspD2MxVt46cIz6yr6YCHbMS9deIaxeAsrJrfXCiZBAwEpxSdb3uNHT7zBgV3v6r/aERL5kLE8wNDtMN8f6Oev022mkp8BF92Hf2DmwTXFQzTRwOVbHSRlicdax3UC4IwI2dHiJ5ef4sXBXkZiu0jKUlGlmHaAAVHQaPQt0bNnhNd6X6HKZYwMpSauUqAAGpomcOTMMQb/2cXd+7WoWvEdYdoBBjQEkrLErflmzo9H2FE3T3swTqY3ihnuSkHW8ufHu/jamWNceq+Teym/6ay/EUULYEBW3MSXGrh6+yHmkgE+03ZdJ6hRmRl2NtH98I9f4seXvsCNGfPJbjMUHQIbIQoaW3z3+XTbdX769Gtsq72n37EqQWpkGq6xuOLj6K+/wcWJTuaSgZIsvxFlnwypmsDscoBzN/cxOd/E6/0/Y2/Tv8n0mBUHTxnLT8430ff6dxmLtxSd6PLBMq8mZYmxeAvnx7ssLjpTzvnxLssbny3dIvirVjn4EbNrf7MwDk7GqKu2folsqQDtjXH9zA+sFUAgHIxVZKfIMgFcosrjbTesLlZH5TZMLWNa503SFzE2Pq2eC1Ruw9QyASpj/1xUZsPUEgFKs78KpDG/vK5MGFgiQHH2N6azRsON5XWh+VhlwsASAczb32i8xsWJTo7/4StcnOhc93t+WB8GZU/VzNs/28CTA328MfwY8UQ9vxl7hP7IFV5+4k39mXwrSwHQ6AmPcPlWh6ld30Io2wGF7Z/t3dnlAIdPP8+poR6m5ptIyhJT802cGurh8OnnmV0OkN8N1odB2QLkt3+2MWdHH+XJV09w7uY+ZpezC5nctcSTr57g7Oij5BfB2jAoS4D89lcwFjInB/p44e1nuRbdvelcPilLXIvu5oW3n+XkQN/7ysjC2tGgLAECUorPhUf1K6P3N7d8oZiVFZeJkMhQ/vzea2zx3S+Hfk5pJaLOm9RPfcFIUIUsXwj5Q8IYOgV2Ndwl6Cs/D5QlgNctMznfRKbxxVn+AUjr3yqg5obEiXNfzrmVGSkm5kL4qtbKoQ+UsSUGUO1ZQ9FEtviWcQkqF979OC8O9nJ29ACxRAOKWpS+xsP/3VhUNZHFFT/XZ1q4MrUXl6gS9Ce4vdDE6b99iuFoK/PJmlLp65WVsSUWkFI0BxZprllE0URmluqYWaqzfNMCMm7bVnuPbbX38LplYokGYkv1LKT8ZZVblgCioCEIGqKgoWoCmiZYsk9nZ31lzQRVTQBNsO2grBL1iXzwDvrshCICf3aahYOYFMn8o/LDiq+LQBQ44zQTB3AL+JMx9vYDzvxjwRksAx+F7ORDA1qBSw4RshMTQCOwBuunwipwCOhwgFSloQA3gMeBMLBq3PgPsH6q+iD6RQEAAAAASUVORK5CYII=", 
    "noise-light.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAD1BMVEXo6Ojn5+fo6Ojn5+fn5+cbG+42AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF62lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wNi0yNlQyMzowMjo0My0wNTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDctMDFUMTc6MjI6MzctMDU6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDctMDFUMTc6MjI6MzctMDU6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIyIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OWM1ZTI1ZTktNmM0Ny1lMTRkLWI1NmYtMWM3MWRhOTk3NzAxIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ODcxMzVhMGQtMTYwMy1hODRhLTliZWMtNGJhMDllZDE1NGQ2IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MTEzYjRiYTgtMmYzNC0zZTQ2LTgyZmUtNTM2ZDNlZDgzYTlmIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMTNiNGJhOC0yZjM0LTNlNDYtODJmZS01MzZkM2VkODNhOWYiIHN0RXZ0OndoZW49IjIwMTgtMDYtMjZUMjM6MDI6NDMtMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjljNWUyNWU5LTZjNDctZTE0ZC1iNTZmLTFjNzFkYTk5NzcwMSIgc3RFdnQ6d2hlbj0iMjAxOC0wNy0wMVQxNzoyMjozNy0wNTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5BpB4MAAAWVUlEQVR4nKWb25osuXGrfyD4/k9cBHwRzDXy/rw9GvmuR+pVncWMA04cTq2C5I5wXU5HHRDgnmL11BVjMK4BMHY1cFAFTCU4OQVOjEd2ZVdIs3/JPZURwhpF2KoYUDUXMDkXJGlQVHxVixbXtqIpo5rpJArIBQtfh4FiEairACgUaaIgcHGYwQRcpVJ8B1oQnOJQdQD1BDuI1CkuwZf4GnRUVVKLW3D3b8oR/U4TI4JVFeFqptSFY4AWWWIaWRSpakdWc3yd/TVMcPfPnKjnJ1edVgj3KGIouqjAAe+HqaLaf23gICRG+HCMZIE0GGGMtO/nSIPH2n+h8QFsg3QkAYP2B/ZLwwgbhJGNYYyNbQbPSTFVXAqRjXMqCjiyHKjVUtx0VE6mIZLUuqAOlba0wENlSVWx+ypILWoBOSrqpGiPEUmZtOn5TTsaA9l2KALTURVMqxNX1GDNJUK0ruL6FlH0ykHKRCChCrtBljqcgFQNvoD39RRRSY50OeK4pexfYFrV6WSoahXrO8aqCtLUrZCDwlwxouIYRZMKCXSExmZ0wAySYeSzvT6MhNH7b8bnGDiy9pcN1tbDjL3vX8egM0doOOcwgGUADbOfDZ067lxnsDtVPIVMrVIBQo2RKmV+mSCk8grS2WptVPA4JoCTFjA3THnnJYAJYgRVpHbiyk2mkMKooMl+MuhPO++LFVuolagclxqQ0mjocVUGcZRTh/0R1QgyyghTqZ07glSn0sBMKAd9dTsUJKzgClUxp1Lp1y8FE4EoEeHcKY1KVZeGU9nBJh6oTnHltlQEo7szxkmsjF6/CITjUEGNrqrKilt3j1ej8o1cEU8OlUQR01ahvn++0X1FX80P1fse20NaDck+TanrH3KrbJtJ9Q8p7Ai45oLA15kG0PwEVIqcb5JWFN/ZF3myc7MnuEyl6iRIRCoqhsJ+pNlPUutk6gBWdKGcOurUmVhOTyVhRzlSjAmKqo7ZAqJ4+9Z2K4brSEHtUN4pYUup7lRGqk1OxeDtDIFy3nccoNRhl9RcIlWxcqg9Ffb9Xo7rzmVrIqKFE2e6q97OG9Fon2eboxUEGEXApLP/g1qd/cVR5hqo+rpf7wl337qMqqoj9M56h1/anTbdXqxOWw5OsV9rjhr2wd2myBS1mrhzK1oLy9TxPQo+eKzDSJakebPqwIA5oBECwegIbAnNTkCLGWSwvasUfHaOImxjjkYWx9qpysEgM1Rz6+CIanbrML5vukVvpg2TsmevutOpUdyiTmdxTU8sXVxLeC49+Hr3a9Td9tFErsbSnVZwMlSyKeyr4VX6qE5E0dmBt02k6g1H6I4KFCngqKLzU9VGdWSKd2tVFMUahbPzNciivpEmeQB1ZLXjeyK2m/e9TtS66sQunYKMenzVgTr1fWDIivOeuy1GU1yxy07iSHPA2jU2u7J4+GKX5lbDQeDRgH12D75jsDzIfigLS2Mk7z9hmP3tEUcM8qnuzlW4hSwwPtcj7giEnDM/sLmiYZdRx9lvrd3NGrVFinx2eGhadkeRuLrahpPTqTstB8k7hrC3fXvuOG4NkpMYLyivOiUs3pF/b0qq6GrBcB1fMcH0hOgBI1ev7luGRz/a1pfKjibeuZc4O5BAi2Vn31mRuyBouGh3duc14aH6s61irovd6kTZHVod4UtnBjmuqSWglWs7HPBc1WMyMfY9F5yFcaNUurPfsKi6UaU8hNdt83cm+1zu7GANZrI46mExDDOIgcEAC6MljgZpZA72oCPbmoPwyDrIW5dnxhrBGe/QGo4k6Wwt6+N1wPHIleIuq7tConPhtbw9Fu2ohKpCZVql1uVkFBGDmLu7pzW+yjyoT/Ww0u567SjTbBHD7hn/IRPgAzPLHpdEnMVWgw+ah0W3wf6WvYwl9jwY2yOQhOShHueo+Cvr2iUmk/HioHQuiKlR5QtGO7XF6zjFThbtqUYd5BsmOEg4Lpbve4CeB5P/Iaz2v8DqJXLI5y9Ib0seYYZz9il3ohxxRpJ1xhZ4Oq7DeaiQ1B9UW3SYpSKNYEKncjHQxU7AqHVMVCHoYzHq6Go69KEw0J0FD1NpMpM6Ol2gqTeN6sE5KeVIi7MkMYsnXVpFc+UIV+e3OGrPunYeglcz8UTFW3o7JAQmnaIwDe/hVSuTLhfV4LT7XLWUolEcuYhOJpq4mTK06kKewpgeYOIbI4OUg9z9rwTN/mFxsvoJjhVX5XTIfJT2FPVOVToswzc51512qcX++U+puVPSiWAkheXZ6DpbvFKRfQb8n8oEXi7+j2QCPZnA9hlVpW9gQj03s8ChrveUC6N48oDKcqHiaZHqwr4KYEeVzIQRO4K8xzbd/1ucKAvtPfvFJcvbNeMHAoBjefwwwUeG5bO/jg4HYx8L8XrO3wfY9qJFvKoYswcJOhiGuXi/B1ugXtFoSfmur1KerjRxK+osyXeYqz1COWeXjFTPwkUj5ROPZimOKpg7SIM8gikMFUyWzanAtMY90XTKFBHmsaIF9+RkVv960luYi2+dk21FIpieu3tge6hsPfMpX/CHhDV4+X8LRNNWBzdMx84UjB/DUlbsfPLP/FxX+GJ9xGHuIaKVaMVUsxDYl0Sm3Up+4BWuaqP6rDz32xPlJpMBe7/JrJYxT3OZ3jHXtMeJm8uEq1+o0SwWvYWr0U4OVE8Lzk4QkacvTVucCkftMMrCZGgVk9nfoJqqjhXhrh6V4yizdeNAEHbrZHVCm2NmjhGzB/Znq4A80kicA7IPeFYh1EHWnHNYLKJz/ix0rRy1FOu8PsIzKwBjbM74IiBzkagCEj2d69E92h1FEffjpnM1ecIKarqPHvlSjqba0rNKpJjWGFDExGjuguX5C1udGSx/j2pkSwcWPyxpGCR0LD1WiN+e/c+w3QzU+LcIvkuZ7DhIO8hh3AKn5YlM9UJZcDQ7IirFqiZP1dru0An0bcd0TKtxqlaeaknWmLhLM9ppVfVcHOTbbvMP8+tTPhdev2Y1HRelqEdxtiNWSvNb8kcOuqCmUM0d11eKdFc6hakcTRZ1zS4unU5otbBVYMbyLe08XTSr5Omu9lqzo292+lFuaHZX6HRhCWtJlAktJ07L/LztcGVnP00FrMl+rYp8mMik84Nd6aNS90SlE6ZlSIcueGaqukJnJF+e47Dz56Kjxde6XmVCdWM/DZJR5oNdO1JnRaBljXnKk1uvPKeni89O6waGCGWW8lVOdEIj47s+kpXOKocdlNmd4mnnQu0+OT7qrMI99Ox48lUFPa2dKmgavPPqUx+mOJ46g6/1SOSD2eu21O1qUqVGbVlXqNOjavXwZRgUeu4+WDhlhfX3xXWuXDxasYgRdSP79pHlDmsquVMvsDEr5IWKo8xnAqw67SC20QTjUM37N/LCiMAIXXZIL1EUs7tn7lZWyig5iOl6Ifqg5Eqpku7iBoYy+6aEJp9R9cDXbmJTvxpXpR46nczVIvsxq6xvP295+3ZVPLQlhlJ/taZ6xfotr6KcPBOM8+nAXn1OE+HMcK2KpudqPQ8LMdLrdc4nz0nDxJfXvKomR9e8/r/B69p0TaF1EjCzJiNUK5kpEpmw63HE+aES3xLnDfn/A0H9t+21fyGoswYNSIxpUE/rHcp/+bMKtEa+D+2ESk5x8ErCde31lvypz2u+rsxYYdU1q6d3aKqwGM8rDZYn98M8fFnOBXHu6VJZq+jUF2ahVs/qSS1/RPb1PJ7KU1ti0l3Pa1xanXDIGDK7BJ8Wzmk0azZU6GRlbqdvA67GV7eu59da6ro/O63AJSqtZFLmd6qwf5NOaz+3YoWlrnBHp1LMM2CZorksQtwZwGRFtrpMVgxd8X+hiq58/VxGvEhldzxq54qa9IPUVy4dHYidOicLfxA/UyB1m9G+daAOw5mUnj080zWLLsSyTRHRocnxQss5Qu19iF7zgzXcD+C1r0dG0nB8pPPooQaxTvt26443JHnA0gouRzMWg89iIq8ywXbCaqrbOzrPsZytT5iVGKh2xLLWEXr1uCSYiSLhHKZM5yLJ7XSyOFmV7uiyooef27OYakSZeH4jFY8f+D7p5guwXbnzQ0vSVrd/dja71DupxV0nMlLrSC4WbzwP9Oh2eao9IaYT27RKXC+BhMPsPFobYfmjtKrQ2Z/1x7bgIdOPgO6bWHrO+hMW5jt2znoWyJbPcvdPmJqFxKs+LWIXsl85DDrzHmGfbvDxWSd5qfE5o+eqsMLfCltbOyOdJXpzQNYrKTzyDCqZWA/Q5T3znjsdJwsN7blgeq6MWte6GyTJAxhGu49OeJjMeYhQvmU7WBOrkzrMDm79p7bBdyb/xDaYv2wDpshXs/mEdRa5u9yI1i4HnbwdtwXpiOyDSSmNgzivrS8KTkdV5+I8V7neuVFFT1zQSLFCV7VyfFeHUMbKjjp1xYEqp3UrR40D7qHPLn58ZT3mmviZNOJoxX6JNoA3EjPnl0W8VfdEL9N9oifoPZd5pdcdBUc5jzCohMO1/lKBopVByfa/1EwjP1txVhd/esg20pXLobPCRdYJG6JOmJy8MrWXlfeL8WjqW5W56yWLUe8ynHoCltde1uq3ux1qPRb6f+hjvzIU1urG6AyWNOKMeZ23liWrOOuNAMYjVWo/SzYSE99VEfsEyfd+Jd/ZLNLiK6VaULxt63Jq3tIUUWA6VBvxmcRmm6xm5eysvvmyPutosYB5nYVPfWWBhbLTX4TpuZ6rahfKIj7f56q7aKqG05Wkim7t0E5GS/3poAW7fcKtkHW3qZYTDmXhGCvXLpBYU0prsk+cw0Yb5PskTVqRNcczEiszK3LKvI2uWb8FxH4b/zaaJnry8B99UsD04Oo8NLCqXwJvnWb8o2ZzWAtXQS9w0toZJ7irCfsN55cg+kfLwXDMmLE48j9YDp7z6KpAPc8vWGlwBYKVIVhcZVFXUkL8MkZeqX4jAwp1TgI9fyHsVV7ZCMLKJWxd7YT/M8T/A+HbOg8dnXlgwsPMvLU+u2l8vNSQ7xN98LGZdTHY5CUTh7ZH2oSELDaj4udS6dzjq2/ppBtzdGJnG1qkZnzVPpakCCp9UVGnh8w9+H8YLv8MpOxw8RsuYvx3IIU33ODM7AjZLTIRj1EoONZdMqHlNp2VHLSiVKdBJwq2LehRlb70Wa0FhIFzfd866uam9gwZ14tD62zcbIHoFgJz+zQL7wR8PGIWIw6TWtM0jnXrPmTYzyxvOf6xoUPZyTOSvFmIvzMG52/yfn9jDOp/yPstwGEXk/53+Pa3E+J47GH9jech6byB8P+ZEP6XCbEBrvdOVJp92K6fVfL2wVy0uAa341KOadfPq7LJhKr7NiVpfhUvcDEZtWlxVzoETQbNek53y1LpEJN9IvXsys/h8+SA+J42mTCz3HDFiLuDmpc7M9KGIH23KjV5/qOnWycvY/sfmnf/yQzTXxlfjeTY4m0GmBiGrH1K2eyzY/Ey0kV9yVrtpujTLLrrfEebor5gpb9gZc/GkXoUJmYcvXCgVtRi1geCHadtbMh52bAvX2TTtftWf91FsSrHpqyvDVk2vsZJMxv7dFNO1ozmKMv4KqEdGCAn80boGi0ncwvnuh7gytwnhn2Opstm7iPq+wppLp1esDdaMHWVSQ/+x6P3v/PDf2f0/r+4kr9Gv6YsvqGzj73+6BqUqx1K/aTd4jVkn5K5K3gVybmzynR4uLLez+70j0a7ijLZEeDsNhzf7dcHwCRfevoBJMkr70J7VoqOMFaZNVRWydQfdadeLrSjQXMhO5+fa952cp7c2tY9KOdBWEvzY5umJ5IUtUcmTntQnxi/guPMD4EOZTOZL/8E1bRdqLt81Z3WmktlwqBeDr/zM6uMb1/N3dUN6w39QD2/8+ewNjwNnFTL1TaXyIaPfdmg+ZCufKzSuSuxlxkZhZS5VZh7ursKjXAkRVt+G/ibu2yvUqbestdl7oZf682FcqK0z/J3v04DvuiqcGYvVVgtkuauQRKrc1+uzeswa1nHnWUxzjTrBQ5ZmztIfuXTuhyosqztSyK8INhb2zM9fdWyt1AsK2xO5A9M7+banuUNrmaFi6servCmatxmLcx9/+EZGsb7QrtC/+Z1dKfncurPKDbxtdXQ002uul6UyLPhN1SCnc2raDR3avotVufr4cq0ozC/NQPFuZtgXovp2cN/LgvIHCGGnT3S5mfXh9Bo5PFZ/IdXBuRdPxCHY0v2LqqjYeO56z7LDz4uKPTMZn6QMnEXILQnCnlMAHUT/tXm3ojSWU13T86bBDroktbDH/PdjlbDENv6QXAWY2aEwkkzbZG7A6aqmPRQHdrN7PNeyNnp9ycSqX3I5wMJS5sOr1/846m5j1xKutLjzm+gstswK55H+3JEJ0G8q1R1IxHQsApNDh27pRPpFeutRfa+yhMst4ex3Nsd9uPOTPZ2FNoc9zzkY9OU8jiGZjOHoqenNFqTd82AwGHDvu65GoLd9il68buGBekibM39TuBlRF/zqNKUjaOCNmrsqw3sQ96lqZy+tFhXBjzNOhPVRgS80DNvaedp9wpTm5ZhzbEsRvczZew4G4ZdmCJdqemmT5yK6vF47bqrzm/olv9r1ufD8crBK1Ku3KeUkxESxe38uQ9QdDdu2ZPz4tsmXYu8866rnRfD4l8HTbrpccKm4KdrI7/LVcM4HGVjjujf06Q5e60Qc9D4TQDr39Sy/hvm+RRWxJmHp81fSs6KpgNmwmNkC2u/Y98ImvZKhJ3SqXXRlzehq95PxfjueATrRzGTsVAz4+tai+BTabD1QgkpY69X/wxOhxO9KykKPbfro06+oVW5frmRPMVn11Mcyx3q3ijvx3PrTkTHum4Ydc0ipZnVZDekeHGH+SOtrZWy9ANtkMPvXtJLeGpFtMqh+3WuVgnsG+G23yvX+J+xvaWoswvDMoPm3ciwxdHB53BmS+dbISvOnJVNFmPKjnxrMgrvHhd0qHJ+uBPfvbElEa3084I2ed/7vmmoeWCyLkr2Ok4eKe6GTO/eS6xTc5PxZYJu3IO6CDHaRCbgeuVlZaVSdVZxuHvn48PAr3qHW1+6+Yr44mqUtlPszKxBr7VlhXgpVd8lFmWVRsXvh1ZsUDlF5GX8PgS6cbGKCefXF9+803f8SyWzeRZ1mNa7za4gbodrYslKPXl/tHtlDMynz+kj2n97J09eaXUiSLMtvXkJaaPKnVLHtLNXEBRNYi30GoWuGcHpXNs5dJu/wg6n8ypnLWXvTdOza3tmc8ov4tuONJZkgqZf6MK0Q+1rglOmeYBA9to1u+kdaflQnYyky9krZo+DrEm1958TNr0IFScGTxV8v9TgshKmXNXtahbNvNzWovnpQr2hnT7gJ1Suqmbk7pN5XZLK8KL8epqF74R3qcvuidDegdxbgXvPokFEk8cUSF7AYPNheyGG2ZqYOzF9tsleQ9nrRSJPPpOUlkOO4jAWpI3bg3S196c6lZq6rufuLYhnia/Jc3PYO4yZWzfuM2fEO5U+knO+MLk252/pMpFw59McVCTTHmXuPibfXbUiVpCql+2TvXJVGOULa3K+fAMraX6qSzdvw/FGcjaEVaJZGBktDF189N2+sNRzV+CZTvTdl37T0xuhWqZpFiytSWE+T4bvJmxd3+WZok/t4r8AFfaHiXZkyrwAAAAASUVORK5CYII=", 
    "noise.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA9QTFRFIiIiISEhIyMjHx8fICAgSEHIqwAAC3FJREFUeNrEWwmS4zgM46H/v3lFALKdtA9ZqdrZ2eruOLYOigTBw2bNI8zMPSyj/+gfmmf/4Ob9evRPFvUz+ufsV3FTfVV/pXm/1CJwc//Uf7V6pH7171tmv1i39a8yMVMN5uE1Pp7jF+59lOxP1MD9oYZF1dVW9wTurgvh2Vq/ln2KrK/rEQ2Me2p5juVn7UibqhtqkX1Ex68aAHtyzI4d9IVm7dxwvdaZfbC61P/Dx5qrj9Oidmu1in5nTeh9MRinFuv4xrDzaBQXpUmhjY2XxEq0/ck+ZotaRq2iL7rVOI0rq8my1YZbiRXDY5Kxijqd/kU6lu0YsGRUR4pJa/utpg5+dNyF1eDEuBivxTbtwrD5Einur7XWRHWxRsUTXXQ4r1IhCHZoAf7Qpg0D1x01UHA7UVfquZqjBaXKhfUffbONmolN9mkSCseF1+JKlRqVFDqBLZY61OJrV9gM5tOMdeyRLl0ZKoARjbpGlcWaalgM3+XeSqz4QY0MN4kREtGia9pmQ6JUuuRMVMw6lJCosWytpizEptW9SbA1IY6qnky7VffQXmvU3M2tydyitMKgcFmbd9hTUkFkkbiQPBx97kJodXDQX2mTUdW7DDMJK0Zb6daB8a32khST0X5SgqoVZP0ri6s11sKjbKJugUJCIJAu9Le23uoyBInvqNMewKnSgEbF0k8YpBGfiD51KoVwFFYJiDYfsHA+BN0pOQSUiVrNfVIJeBXajbOrcQsyaOWtbJGy9PqrCfwa4LKG7EKAygk76mMQZaIEkHi6JOhcZ0qFMbfzWAoxpu0Fplb3AtJKF1LncWrgCVk6BqSKDHG3zZoi4tTAC7biGmBcAKMjTYEz7Y8DQlus0BEYiVtLU7k2T6Injo9X5M/6uSYtEHae2iDRSUdNdYLZlIUBO2pi7pBgj2NygHN9gh3VzriJ2h1NBCdj0GfKnstqtDkidHnCOqc6VKgAdI2QTPMpmUPRqUZd9yCvhEXKkulPAqBS5+H8sgZKumPYEUEJqNPtsQZNInUOJUqTvuIeaiFNBMCBk2lE1+HGahfcUw0tadKTBCSZmx7D7HFctSg5f4nS4cxyc42FqWMGcAo4RsBuf6alnN4zytTTKXQBrkH83LI8s8GWB8JBQrVoK3SCspb+l7G4VI2jAWhr81yg88BLTIBqI6GwRyWhQ2o4ZqMsiONh44RfK95xzAXFkwU0I5isuMADC5p2gSEX6JnaOFE51smQbzt+SYbokxpvt3vKZzJWOk1qQyN/hBKcUT7fKR8M8ZJykhOSDjl8xvCOL7bVSMbqofKlMPLi6hCZwatA5WgUIXdA/5Yh39CVphWI4hTcpRF0qU98JykPkXHAPOAJHLl0ETSDdE80eVALKOdmrHc0+k6mvygwlphECXoxuOPSrBoXgjFAM+iLK1xJMekMEZtB6hRqkHEkhsEJiJg0Wm9NnIiCAEGUOmMb6DyW+Mq9FMErxQzqZStgLFVrSWdefGxz46UxJI7SpDqA3TAXuPGsrhyBwQQMACI/kosRTAChFYnW6gJPJglVEMJk1lPRyxe5GVzSBD+FMqkztWFHODXLLfZJ+eVWaJVGqic8u2BrPqh1Uj2CTjxpOLBJOM/3tDoOtPrC4fnB4fmNw2XcNEM+r7ZzRz5d5BOzH8iv7+TXOd4pXLQdLvwarhihQ8VJMMWcUsSSxPwcrhoW9kGWXGTJ5CCeyZo12jx2MnyI4oonsubiRjDl1UxNY8blVaZGCZUQr35i8feG9hEmTaYJ5OgLeZv4zQIAQK7NXwGAuH8IFsW6llIrg034nduNEVbCC/x1+zbI57sc12fQ37bTg/qD0kCfEiBjigxIZ6BIJhNJ41cF9jR3xtYMXhtDpood7jV9hVKHjRzdWPZ8GPAHFSfCgD+oGELFICMZ7A4ZAaRGsIwGo0Mupt8YDFv/et7phOKBXTaxy7K3c8V6QZNX+GTsig2HPuLEJsK0OdqRoUlkPhBI0emHvCSkMZXLajbCkgJ2HJkwN45+0nc/WUYy46eXsiq7YwNFu4qgbCp1QM/XfJHb0Vt8pz2SaUyJ2CjYGKYw9sS1n6c9btMutqddQCiecEPpBcRBf3LzoNLURMJ0yQqL46qc1gONhv2G/L7cOaznK5H5qm5ws7ZHTJW6vix3xF7uALSNVA3oS5JkUlfluuFPcHIZYi2xOfEG5Xo653sZv0+vpfRMudSLsHcSGFcrLTsBgD/zCpaSCZE2IN1HdjbodZzRBSkAoK38SxpTV4J4rnaEktJmMEbaWMMtUPkgOf3fDwDBDAw9XCrxjkp+5v2+clZwjbMOfk83vxA5U4iDD0bMiDwlcmpWY4GgwduDTE3x/6sQdIb/f6crlOp0AvV39vslP50urx34ae78dLCfp/qsjWwhnTNJtsONTwLWMeowRR3yWd+JN6UPGKsVMoJVbQWmZJIkVAhZYTQmRtOo0NJ+2Cc535uA7zZ2DxF3RVooICRWioQ5uJUvINgxceg/JLnaoOe/VO5WyLTtKQZBF/UwRJIY9Eajx4T5cKlJ5QlW8lS5JVwRFRtS9wY5ZI48ECsCm2i2FDllmGd3hO5g9Hq7wq2AmFtKCiIhaXSW0i5WCL7DlLuKivIBoCTtkK+4qYmsMOl+fiPcTAaQRp4bPODBIyB9uCj+7VuMZWKmIwBdL/vYPH5e5G8wTUt/Y86K5IpO5JoMUzKE7CajEVM0gv8ZDcH4c8n6d/60kuLOnT9hS/cFnofw5JD6nQ5PQuEJnaC4+sscwxYrrNAoU6wQAqHpvN6ZXn7BvHB/Wi8JNK/D26NC3bRqXEU4sUc4qTreevn2Gar+lm9t8BBLFjjOG2x8qsHnO2tXYMvWi+sGH1eDjyvJ/G+zZH5Odp2w81yYPpDd6fgmRbYbe0p+coa24gxN7lpK/IsR0hBWjZBSPjBcHrkahtJEdEP82Qf+i0iHVOdtB6SGNHJW1Tb+9gfN9sdd9Adl3PQnmfqT4M9zoUryESW9rJKwYLMdZGMT0ElvyDxJ2XtDQr0hTyTFBG7ixctlY/rHhbKxq/uTe1WD5yozXMmxtp3V+HNh8ClqeCgMnkUNOTp5MNj7aOxDsSajsQ+EiCNC2E2X10yXmfRODXxAYkHndZeZH7rMlGE/Ted5TNTk3nZ+4RiVThzdjFMteFdJiBUM870F0JnBuQeu28bKkRB+01hpAk6gx11FbqZwclGRuy2cuOp1Q76vz/2YlZk996s0MpX+h/hwBnq/eaXt0O/DOT40jl6nzlZKzq7UGZpMXrQB0+N8tSF/9zmrRBlUo2DfjMswtD3xXQe2+utK4WePzm99aNzfY8fcXeJutsZ9ZlGIOeO3gkksFEy2rgcI0yezm1fcbwm/tTusP992MH6dx0rPgek8mnT9b5/Ni3LoyksZivBteF+Y3fayAASIw5vqknubWw7RR7VOsIzw1AF534rB8nNjYlTpkpbi7YFivSPmCOrf3oFJRHupwX90bLbh6OArmnzFaHD9iZaulP5zT1gyS/aTGLeUpTX1WqKGlGFbI/GoMquPmYV33wLopfzkHjktlBtMBJfSnn5D7DxGWXk9yfYYxfSu1HLFJlaoVBPQ2Whnm8hJXx7wi1cRNs7jO+dpQ7DLOfuV7hdTZDYq5L90Fdv7ruLqpOCJjszty+TsZ7PEZI37o5HDlVqzrQ61UnvThfO+2ft+ICXqYrwxNv9q3Um+9vHVupN8bagjhWfwz3vJXhfdvrOIM+/kfWYRc88ixu07oVPx6tQ7eZ/xqo6X7MhftGSfqtZ9D/Mpt8qdW9H+n7kLI8oz7rRCJ00oHwSn/52PROyxK0O3y/chZ9IGtcoWzHwyX6hA7DptYEobqCx2ipa+o+X9OyAPJ3TKbkNozXfOliMCOuqXXcgfjppt5f+4m+4/AQYA7rFTSAXDOQYAAAAASUVORK5CYII=", 
    "page-icon.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFwmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wNi0zMFQwMjowMToxNy0wNTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0wNi0zMFQwMjowMToxNy0wNTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDYtMzBUMDI6MDE6MTctMDU6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjE2Mzg1YjEtMDhiNS1kMjRhLWI0MzItNzAzYjBmNDFjNjE5IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YmNlMzU0ZTgtMDE3Zi1iMjRkLTg4MTYtOGZkZTZlYTgyZDg5IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZTAzMzRhNzEtMmQ2Mi1lNDRjLWFiMjUtZGJjZTNlYTcwNTYwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZTAzMzRhNzEtMmQ2Mi1lNDRjLWFiMjUtZGJjZTNlYTcwNTYwIiBzdEV2dDp3aGVuPSIyMDE4LTA2LTMwVDAyOjAxOjE3LTA1OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTYzODViMS0wOGI1LWQyNGEtYjQzMi03MDNiMGY0MWM2MTkiIHN0RXZ0OndoZW49IjIwMTgtMDYtMzBUMDI6MDE6MTctMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+1Ie7qQAAADpJREFUOI1j/P//PwMlgIki3dQwgAWNT8g/jNRwAYolAx8GowZgpgOMeCbVAAYGwomJoAEkuWLgAxEAc7EGJRNwU4UAAAAASUVORK5CYII=", 
    "play-button.svg": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIiBmaWxsPSIjNDQ0IiBzdHJva2U9IiNlZWUiPg0KICAgIDxwYXRoIGQ9Ik0yNiAxNiBMIDggNCBMIDggMjggTCAyNiAxNiIvPg0KPC9zdmc+DQoNCg==", 
    "regular_pixiv_icon.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAF62lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wNi0yMFQwMDo1NjoyOS0wNTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDYtMjBUMDE6MDA6MDEtMDU6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDYtMjBUMDE6MDA6MDEtMDU6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZDA2Zjg3ZjUtMzY1MC1lMzRmLWFjY2UtZTFjYzY4OGVkMjY4IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZGU4MTZkODItNmVkNi1mNTQxLTg3MTEtMGZlZTZkN2EwMWI5IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6Y2YxNWJkY2QtOGJhZi0wMjQwLWI4NTktM2VjMGI0MDJlZjE1Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjZjE1YmRjZC04YmFmLTAyNDAtYjg1OS0zZWMwYjQwMmVmMTUiIHN0RXZ0OndoZW49IjIwMTgtMDYtMjBUMDA6NTY6MjktMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmQwNmY4N2Y1LTM2NTAtZTM0Zi1hY2NlLWUxY2M2ODhlZDI2OCIgc3RFdnQ6d2hlbj0iMjAxOC0wNi0yMFQwMTowMDowMS0wNTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7IMKLyAAAFYUlEQVR4nO3aWcgcRRAH8N9Oji/xTDzxQBMhAfXFCxVBxTx4IQQvRAQ1ICiKihJRUFBBQfFNUIyIgiLexgMUEVTwBI34oohK4n0gajzivbs+1Iy72ezMN7uzm/3G+IdhZ6d7aqqqq6uruqth5cN6sBVuwHnYtrexpvgNT+FifNvdkPR0PB8/4jL/HeFhPs7AN7gNjayhWwFP4A7M3pycbWY0cCHel8qeKeB8LJ8QU5PAUjxJKGBr3D5RdiaDk7AowZ029QVbCh5McMqkuZggDkowb9JcTBBztlTT/xdbvALGuea3uu6nU/QgfUeKUSogEyIRoec6vIxn8QG+x69oop32m4ftsATH4wQsxlRKb+zKaFj5cLvC+xmTTbyDG/ESfqjEE7vhElyA7Y1RGcMSzUb7IywTI3YIVqsmPGEdX+IqLBBR25qe744Mg06BlmDwLlwpEqci2nvjKJwoBFmAufgTP4mY/Gk8JxKVfvgQh2JXvIJ9jNAayiqgmf5eh5vxV06/+Tgd12MvwWieg2thPxGIZX7jIZGJru9D+xvhK07GYzp+pBLKeuf7hHA36C/87nhVOLl7dITPvpHY9Fu9z+fjbDGFnk//98Nq7ICfjWBKFCmghbXpx1boL/hWQvAvcHgXzWFHJnvvGPyS/vbD+pSvtTrWWemD3cjm+WnC5Iqc2tc4rIDWsJiV0nsBN+X0aQn+PlHBEnp9QFOM5v5iBIrQEOv4rGE/XhJXCMd5eU77EmERQ+1g9Y7aKuG5pxM+w8iXpT5IcKlwfnk8LK5CPMMyXNSn/YRhiY8QCR7Hwpz274SSBh6QRKzJi/FiT9tcEb7ePSjRMaElos083IoNgxLNtsQ+7nm+jZhXUyJgmQlIsCcOKOiz3IBWkODvnmdTYu98SljBTMPqgrYX8fsgxHqdYAOfCcFn4l5BgkUiQcrDKgNYQa+QD4gAYyYKn6GJcwrabzEA/90ddxenJ+Ne16uiIc4x8vAV/ihLLBHhbHZfBySmX/fXKTkNEpHTE5qrC+YpdtBvlyWUYBeR5q6oxtNmRUNx6PtWWUKzxZy/tipHE0CRBXxZlkhd5n0/NAraSqfIdVZAkadfUJZIXRXQFjtCeTiwLKG6KuBXkcTl4YiyhOqogBbem6bPUiVlq6MCiAOYPOykE9xNizoqoIFnCtpXGmAVqFtBVFOUu+WdSxClcKXzmbpZwCycVdB+kgELPuqkgKbYs/wtp72BRwwoU10U0MS7iqvZ7jbEDlYdfEBTbM4WBTcH4NxhiM90C2iKxGY3+fn9TgZIf3tRVQFzjPdw5Clx0Jq3rC0U+xhDF3lUUUAbV+soYBSKaKXXjzhYcQ3jErF7PVsFOapawE3C8RyJ13Ti81bXNR26+32OY0U2V2TWl4i6o8r7l6Nwgm1RuXGkWIp2EUflp4pR3FWEpnPS9kb6zl86VSKrRKVIUYZH+II3xAHJSFBVAVM2zsvbopLjyfTqRkNYXEN568iwEPeLc8qRFkxVIdQQh5KfisqOosMKQjlNcRJVRviGKLx6SyyDx6XPR7pyVSU2V5wn3CPOEteLRGW5MNdB5miCHdN3XxVHXG/qrP9jWbKrToGWmNsZthcjdZxOgdQG4a0/FxbzvZj7C8Uavif2SP/PtnHBZffvWDCOSDDpud82vRaVfK+2pbLTYUZGnTOSqc2J/xWgYp1dzdFM8PqkuZgg1iWiJmBLxYpE5NsPTZqTCWAtXsmc4JmiNqgXbflFy2wcuNQJG7AvnVWgLQKV3lrBBPfmEGmLkLVuK8lHIuT+k03r95eJGv41eFRsMV9TQOxo7Gzm1BLmoSmO044WGyn/ZrD/AKixCmbSPqIVAAAAAElFTkSuQmCC"
};
// Global actions.
class actions
{
    // Set a bookmark.  Any existing bookmark will be overwritten.
    static async _bookmark_add_internal(illust_info, options)
    {
        if(options == null)
            options = {};

        console.log("Add bookmark:", options);

        // If auto-like is enabled, like an image when we bookmark it.
        if(!options.disable_auto_like && helpers.get_value("auto-like"))
        {
            console.log("Automatically liking image as well as bookmarking it due to auto-like preference");
            actions.like_image(illust_info, true /* quiet */);
        }
         
        // Remember whether this is a new bookmark or an edit.
        var was_bookmarked = illust_info.bookmarkData != null;

        var illust_id = illust_info.illustId;

        var request = {
            "illust_id": illust_id,
            "tags": options.tags || [],
            "comment": options.comment || "",
            "restrict": options.private? 1:0,
        }
        var result = await helpers.post_request("/ajax/illusts/bookmarks/add", request);

        // If this is a new bookmark, last_bookmark_id is the new bookmark ID.
        // If we're editing an existing bookmark, last_bookmark_id is null and the
        // bookmark ID doesn't change.
        var new_bookmark_id = result.body.last_bookmark_id;
        if(new_bookmark_id == null)
            new_bookmark_id = illust_info.bookmarkData? illust_info.bookmarkData.id:null;
        if(new_bookmark_id == null)
            throw "Didn't get a bookmark ID";

        // last_bookmark_id seems to be the ID of the new bookmark.  We need to store this correctly
        // so the unbookmark button works.
        //
        // Update bookmark info in image data.
        //
        // Even if we weren't given tags or a comment, we still know that they're unset,
        // so set comment and tags so we won't need to request bookmark details later.
        illust_info.bookmarkData = {
            id: new_bookmark_id,
            private: !!request.restrict,
            comment: request.comment,
            tags: request.tags,
        }
        console.log("Updated bookmark data:", illust_info.bookmarkData);

        if(!was_bookmarked)
            illust_info.bookmarkCount++;

        // If this image's thumbnail info is loaded, update that too.
        var thumbnail_info = thumbnail_data.singleton().get_one_thumbnail_info(illust_id);
        if(thumbnail_info != null)
        {
            thumbnail_info.bookmarkData = {
                id: result.body.last_bookmark_id,
                private: !!request.restrict,
            }
        }
        
        message_widget.singleton.show(
                was_bookmarked? "Bookmark edited":
                options.private? "Bookmarked privately":"Bookmarked");

        image_data.singleton().call_illust_modified_callbacks(illust_id);
    }

    static bookmark_edit(illust_info, options)
    {
        return actions.bookmark_add(illust_info, options);
    }

    // Create or edit a bookmark.
    //
    // Create or edit a bookmark.  options can contain any of the fields tags, comment
    // or private.  Fields that aren't specified will be left unchanged on an existing
    // bookmark.
    //
    // This is a headache.  Pixiv only has APIs to create a new bookmark (overwriting all
    // existing data), except for public/private which can be changed in-place, and we need
    // to do an extra request to retrieve the tag list and comment if we need them.  We
    // try to avoid making the extra bookmark details request if possible.
    static async bookmark_add(illust_info, options)
    {
        if(options == null)
            options = {};

        console.log("Edit bookmark options:", options);

        // This is a mess, since Pixiv's APIs are all over the place.
        //
        // If the image isn't bookmarked, just use bookmark_add.
        if(illust_info.bookmarkData == null)
        {
            console.log("Initial bookmark");
            if(options.tags != null)
                helpers.update_recent_bookmark_tags(options.tags);
        
            return await actions._bookmark_add_internal(illust_info, options);
        }
        
        // Special case: If we're not setting anything, then we just want this image to
        // be bookmarked.  Since it is, just stop.
        if(options.tags == null && options.comment == null && options.private == null)
        {
            console.log("Already bookmarked");
            return;
        }

        // Special case: If all we're changing is the private flag, use bookmark_set_private
        // so we don't fetch bookmark details.
        if(options.tags == null && options.comment == null && options.private != null)
        {
            // If the image is already bookmarked, use bookmark_set_private to edit the
            // existing bookmark.  This won't auto-like.
            console.log("Only editing private field", options.private);
            return await actions.bookmark_set_private(illust_info, options.private);
        }

        // If we're modifying tags or comments, we need bookmark details loaded.
        // This will insert the info into illust_info.bookmarkData.  We could skip
        // this if we're setting both tags and comments, but we don't currently do
        // that.
        await image_data.singleton().load_bookmark_details(illust_info);

        var bookmark_params = {
            // Don't auto-like if we're editing an existing bookmark.
            disable_auto_like: true,
        };

        // Copy any of these keys that are in options to our bookmark_add arguments.
        // Copy any fields that aren't being set from the current value.
        for(var key of ["private", "comment", "tags"])
        {
            var value = options[key];
            if(value == null)
                value = illust_info.bookmarkData[key];

            bookmark_params[key] = value;
        }

        // Only update recent tags if we're modifying tags.
        if(options.tags != null)
        {
            // Only add new tags to recent tags.  If a bookmark has tags "a b" and is being
            // changed to "a b c", only add "c" to recently-used tags, so we don't bump tags
            // that aren't changing.
            for(var tag of options.tags)
            {
                var is_new_tag = illust_info.bookmarkData.tags.indexOf(tag) == -1;
                console.log("new tag:", is_new_tag, tag);
                if(is_new_tag)
                    helpers.update_recent_bookmark_tags([tag]);
            }
        }
        
        return await actions._bookmark_add_internal(illust_info, bookmark_params);
    }

    static async bookmark_remove(illust_info)
    {
        if(illust_info.bookmarkData == null)
        {
            console.log("Not bookmarked");
            return;
        }

        var illust_id = illust_info.illustId;
        var bookmark_id = illust_info.bookmarkData.id;
        
        console.log("Remove bookmark", bookmark_id, illust_info);
        
        var result = await helpers.rpc_post_request("/rpc/index.php", {
            mode: "delete_illust_bookmark",
            bookmark_id: bookmark_id,
        });

        console.log("Removing bookmark finished");

        illust_info.bookmarkData = null;
        illust_info.bookmarkCount--;

        var thumbnail_info = thumbnail_data.singleton().get_one_thumbnail_info(illust_id);
        if(thumbnail_info != null)
            thumbnail_info.bookmarkData = null;
         
        message_widget.singleton.show("Bookmark removed");

        image_data.singleton().call_illust_modified_callbacks(illust_id);
    }

    // Change an existing bookmark to public or private.
    static async bookmark_set_private(illust_info, private_bookmark)
    {
        var illust_id = illust_info.illustId;
        var bookmark_id = illust_info.bookmarkData.id;
        
        // We're mimicing a form submission here, since there doesn't seem to be any
        // API call for it.
        var params = new URLSearchParams();
        params.set("book_id[]", bookmark_id);
        params.set("type", "");
        params.set("untagged", 0);

        // "rest" is actually the bookmark page the user is viewing, not the new state.
        // We just mimic the value in the form (it probably only affects the redirect that
        // we don't use).
        params.set("rest", private_bookmark? "show":"hide");
        if(private_bookmark)
            params.set("hide", "Private");
        else
            params.set("show", "Public");
        params.set("tag", "");
        params.set("p", "1");
        params.set("order", "");
        params.set("add_tag", "");
        params.toString();

        // This returns an HTML page that we don't care about.
        var result = await helpers.post_form_request("/bookmark_setting.php", params);

        // If this image's info is loaded, update its bookmark info.  Leave fields other
        // than private_bookmark alone.
        if(illust_info.bookmarkData != null)
            illust_info.bookmarkData.private = private_bookmark;

        // If this image's thumbnail info is loaded, update that too.
        var thumbnail_info = thumbnail_data.singleton().get_one_thumbnail_info(illust_id);
        if(thumbnail_info != null)
            thumbnail_info.bookmarkData.private = private_bookmark;
        
        message_widget.singleton.show(private_bookmark? "Bookmarked privately":"Bookmarked");

        image_data.singleton().call_illust_modified_callbacks(illust_id);
    }

    // If quiet is true, don't print any messages.
    static async like_image(illust_data, quiet)
    {
        var illust_id = illust_data.illustId;
        console.log("Clicked like on", illust_id);
        if(illust_data.likeData)
        {
            if(!quiet)
                message_widget.singleton.show("Already liked this image");
            return;
        }
        
        var result = await helpers.post_request("/ajax/illusts/like", {
            "illust_id": illust_id,
        });

        // Update the image data.
        illust_data.likeData = true;
        illust_data.likeCount++;
        image_data.singleton().call_illust_modified_callbacks(illust_id);

        if(!quiet)
            message_widget.singleton.show("Illustration liked");
    }

    static async follow(user_data, follow_privately, tags)
    {
        var result = await helpers.rpc_post_request("/bookmark_add.php", {
            mode: "add",
            type: "user",
            user_id: user_data.userId,
            tag: tags,
            restrict: follow_privately? 1:0,
            format: "json",
        });

        // This doesn't return any data.  Record that we're following and refresh the UI.
        user_data.isFollowed = true;
        image_data.singleton().call_user_modified_callbacks(user_data.userId);

        var message = "Followed " + user_data.name;
        if(follow_privately)
            message += " privately";
        message_widget.singleton.show(message);
    }
   
    static async unfollow(user_data)
    {
        var result = await helpers.rpc_post_request("/rpc_group_setting.php", {
            mode: "del",
            type: "bookuser",
            id: user_data.userId,
        });

        // Record that we're no longer following and refresh the UI.
        user_data.isFollowed = false;
        image_data.singleton().call_user_modified_callbacks(user_data.userId);

        message_widget.singleton.show("Unfollowed " + user_data.name);
    }
    
    // Image downloading
    //
    // Download illust_data.
    static download_illust(illust_data, progress_bar_controller)
    {
        var download_type = actions.get_download_type_for_image(illust_data);
        if(download_type == null)
        {
            console.error("No download types are available");
            return;
        }

        console.log("Download", illust_data.illustId, "with type", download_type);

        if(download_type == "MKV")
        {
            new ugoira_downloader_mjpeg(illust_data, progress_bar_controller);
            return;
        }

        if(download_type != "image" && download_type != "ZIP")
        {
            console.error("Unknown download type " + download_type);
            return;
        }

        // Download all images.
        var images = [];
        for(var page of illust_data.mangaPages)
            images.push(page.urls.original);

        var user_data = illust_data.userInfo;
        helpers.download_urls(images, function(results) {
            // If there's just one image, save it directly.
            if(images.length == 1)
            {
                var url = images[0];
                var buf = results[0];
                var blob = new Blob([results[0]]);
                var ext = helpers.get_extension(url);
                var filename = user_data.name + " - " + illust_data.illustId + " - " + illust_data.illustTitle + "." + ext;
                helpers.save_blob(blob, filename);
                return;
            }

            // There are multiple images, and since browsers are stuck in their own little world, there's
            // still no way in 2018 to save a batch of files to disk, so ZIP the images.
            console.log(results);
       
            var filenames = [];
            for(var i = 0; i < images.length; ++i)
            {
                var url = images[i];
                var blob = results[i];

                var ext = helpers.get_extension(url);
                var filename = i.toString().padStart(3, '0') + "." + ext;
                filenames.push(filename);
            }

            // Create the ZIP.
            var zip = new create_zip(filenames, results);
            var filename = user_data.name + " - " + illust_data.illustId + " - " + illust_data.illustTitle + ".zip";
            helpers.save_blob(zip, filename);
        });
    }

    static is_download_type_available(download_type, illust_data)
    {
        // Single image downloading only works for single images.
        if(download_type == "image")
            return illust_data.illustType != 2 && illust_data.pageCount == 1;

        // ZIP downloading only makes sense for image sequences.
        if(download_type == "ZIP")
            return illust_data.illustType != 2 && illust_data.pageCount > 1;

        // MJPEG only makes sense for videos.
        if(download_type == "MKV")
        {
            if(illust_data.illustType != 2)
                return false;

            // All of these seem to be JPEGs, but if any are PNG, disable MJPEG exporting.
            // We could encode to JPEG, but if there are PNGs we should probably add support
            // for APNG.
            if(illust_data.ugoiraMetadata.mime_type != "image/jpeg")
                return false;

            return true;
        }
        throw "Unknown download type " + download_type;
    };

    static get_download_type_for_image(illust_data)
    {
        var download_types = ["image", "ZIP", "MKV"];
        for(var type of download_types)
            if(actions.is_download_type_available(type, illust_data))
                return type;

        return null;
    }

    static async load_recent_bookmark_tags()
    {
        var doc = await helpers.load_data_in_iframe("/bookmark.php");

        var bookmark_tags = [];
        for(var element of doc.querySelectorAll("#bookmark_list a[href*='bookmark.php']"))
        {
            var tag = new URL(element.href).searchParams.get("tag");
            if(tag != null)
                bookmark_tags.push(tag);
        }
        return bookmark_tags;
    }
}

// This handles querying whether a tag or a user is muted.  We don't handle
// editing this list currently.
class muting
{
    static get singleton()
    {
        if(muting._singleton == null)
            muting._singleton = new muting();
        return muting._singleton;
    };

    constructor()
    {
    }

    set_muted_tags(muted_tags)
    {
        this.muted_tags = muted_tags;
    }

    set_muted_user_ids(muted_user_ids)
    {
        this.muted_user_ids = muted_user_ids;
    }

    is_muted_user_id(user_id)
    {
        return this.muted_user_ids.indexOf(user_id) != -1;
    };

    // Return true if any tag in tag_list is muted.
    any_tag_muted(tag_list)
    {
        for(var tag of tag_list)
        {
            if(tag.tag)
                tag = tag.tag;
            if(this.muted_tags.indexOf(tag) != -1)
                return tag;
        }
        return null;
    }
}

/* pako/lib/zlib/crc32.js, MIT license: https://github.com/nodeca/pako/ */
var crc32 = (function() {
    // Use ordinary array, since untyped makes no boost here
    function makeTable() {
        var c, table = [];

        for(var n =0; n < 256; n++){
            c = n;
            for(var k =0; k < 8; k++){
                c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
            }
            table[n] = c;
        }

        return table;
    }

    // Create table on load. Just 255 signed longs. Not a problem.
    var crcTable = makeTable();

    return function(buf) {
        var crc = 0;
        var t = crcTable, end = buf.length;

        crc = crc ^ (-1);

        for (var i = 0; i < end; i++ ) {
            crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
        }

        return (crc ^ (-1)); // >>> 0;
    };
})();

// Get and set values in localStorage.
//
// We don't use helpers.set_value/helpers.get_value since GreaseMonkey is inconsistent and changed
// these functions unnecessarily.  We could polyfill those with this, but that would cause
// the storage to change if those functions are restored.  Doing it this way also allows
// us to share settings if a user switches from GM to TM.
class settings
{
    static get_change_callback_list(key)
    {
        if(settings._callbacks == null)
            settings._callbacks = {};
        var callbacks = settings._callbacks[key];
        if(callbacks == null)
            callbacks = settings._callbacks[key] = new callback_list();
        return callbacks;
    }

    static get(key, default_value)
    {
        key = "_ppixiv_" + key;

        if(!(key in localStorage))
            return default_value;

        var result = localStorage[key];
        try {
            return JSON.parse(result);
        } catch(e) {
            // Recover from invalid values in localStorage.
            console.warn(e);
            console.log("Removing invalid setting:", result);
            delete localStorage.key;
            return default_value;
        }
    }

    static set(key, value)
    {
        // JSON.stringify incorrectly serializes undefined as "undefined", which isn't
        // valid JSON.  We shouldn't be doing this anyway.
        if(value === undefined)
            throw "Key can't be set to undefined: " + key;

        var setting_key = "_ppixiv_" + key;

        var value = JSON.stringify(value);
        localStorage[setting_key] = value;

        // Call change listeners for this key.
        settings.get_change_callback_list(key).call(key);
    }

    static register_change_callback(key, callback)
    {
        settings.get_change_callback_list(key).register(callback);
    }

    static unregister_change_callback(key, callback)
    {
        settings.get_change_callback_list(key).unregister(callback);
    }
}

var helpers = {
    get_value: function(key, default_value)
    {
        return settings.get(key, default_value);
    },

    set_value: function(key, value)
    {
        return settings.set(key, value);
    },

    // Preload an array of images.
    preload_images: function(images)
    {
        // We don't need to add the element to the document for the images to load, which means
        // we don't need to do a bunch of extra work to figure out when we can remove them.
        var preload = document.createElement("div");
        for(var i = 0; i < images.length; ++i)
        {
            var img = document.createElement("img");
            img.src = images[i];
            preload.appendChild(img);
        }
    },

    move_children: function(parent, new_parent)
    {
        for(var child = parent.firstChild; child; )
        {
            var next = child.nextSibling;
            new_parent.appendChild(child);
            child = next;
        }
    },
    
    remove_elements: function(parent)
    {
        for(var child = parent.firstChild; child; )
        {
            var next = child.nextElementSibling;
            parent.removeChild(child);
            child = next;
        }
    },

    // Return true if ancestor is one of descendant's parents, or if descendant is ancestor.
    is_above(ancestor, descendant)
    {
        var node = descendant;
        while(descendant != null && descendant != ancestor)
            descendant = descendant.parentNode;
        return descendant == ancestor;
    },

    create_style: function(css)
    {
        var style = document.createElement("style");
        style.textContent = css;
        return style;
    },

    create_from_template: function(type)
    {
        var template;
        if(typeof(type) == "string")
        {
            template = document.body.querySelector(type);
            if(template == null)
                throw "Missing template: " + type;
        }
        else
            template = type;

        var node = document.importNode(template.content, true).firstElementChild;

        // Make all IDs in the template we just cloned unique.
        for(var svg of node.querySelectorAll("svg"))
            helpers.make_svg_ids_unique(svg);

        return node;
    },

    // SVG has a big problem: it uses IDs to reference its internal assets, and that
    // breaks if you inline the same SVG more than once in a while.  Making them unique
    // at build time doesn't help, since they break again as soon as you clone a template.
    // This makes styling SVGs a nightmare, since you can only style inlined SVGs.
    //
    // <use> doesn't help, since that's just broken with masks and gradients entirely.
    // Broken for over a decade and nobody cares: https://bugzilla.mozilla.org/show_bug.cgi?id=353575
    //
    // This seems like a basic feature of SVG, and it's just broken.
    //
    // Work around it by making IDs within SVGs unique at runtime.  This is called whenever
    // we clone SVGs.
    _svg_id_sequence: 0,
    make_svg_ids_unique(svg)
    {
        let id_map = {};
        let idx = helpers._svg_id_sequence;

        // First, find all IDs in the SVG and change them to something unique.
        for(let def of svg.querySelectorAll("[id]"))
        {
            let old_id = def.id;
            let new_id = def.id + "_" + idx;
            idx++;
            id_map[old_id] = new_id;
            def.id = new_id;
        }

        // Search for all URL references within the SVG and point them at the new IDs.
        for(let node of svg.querySelectorAll("*"))
        {
            for(let attr of node.getAttributeNames())
            {
                let value = node.getAttribute(attr);
                
                // See if this is an ID reference.  We don't try to parse all valid URLs
                // here.
                var re = /url\(#.*?\)/;
                var new_value = value.replace(re, (str) => {
                    var re = /url\(#(.*)\)/;
                    var old_id = str.match(re)[1];
                    let new_id = id_map[old_id];
                    if(new_id == null)
                    {
                        console.warn("Unmatched SVG ID:", old_id);
                        return str;
                    }
                    // Replace the ID.
                    return "url(#" + new_id + ")";
                });

                node.setAttribute(attr, new_value);
            }
        }

        // Store the index, so the next call will start with the next value.
        helpers._svg_id_sequence = idx;
    },

    // Fetch a simple data resource, and call callback with the result.
    //
    // In principle this is just a simple XHR.  However, if we make two requests for the same
    // resource before the first one finishes, browsers tend to be a little dumb and make a
    // whole separate request, instead of waiting for the first to finish and then just serving
    // the second out of cache.  This causes duplicate requests when prefetching video ZIPs.
    // This works around that problem by returning the existing XHR if one is already in progress.
    _fetches: {},
    async fetch_resource(url, options)
    {
        if(options == null)
            options = {};

        // If there's an abort signal and it's already signalled, do nothing.
        if(options.signal && options.signal.aborted)
            throw "Aborted by signal";


        // If there's no ongoing fetch for this URL, create one.  Otherwise, we'll just wait
        // on the existing request.
        if(this._fetches[url] == null)
        {
            // options.signal may be an abort signal, but it only aborts this instance of the
            // request.  abort_actual_request is our internal signal to abort the actual request,
            // which we only do if every fetch for this request is aborted.
            var abort_actual_request = new AbortController();
            var request = helpers.send_pixiv_request({
                "method": "GET",
                "url": url,
                "responseType": "arraybuffer",

                "headers": {
                    "Accept": "application/json",
                },
                signal: abort_actual_request.signal,

                onprogress: function(e) {
                    for(var options of request.callers.slice())
                    {
                        try {
                            if(options.onprogress)
                                options.onprogress(e);
                        } catch(exc) {
                            console.error(exc);
                        }
                    }
                },
            });        
            request.abort_actual_request = abort_actual_request;
            this._fetches[url] = request;

            // Remember the number of times fetch_resource has been called on this URL.
            request.fetch_count = 0;
            request.callers = [];
            request.callers.push(options);
        }
        else
        {
            var request = this._fetches[url];
        }
        // Remember that another fetch was made for this resource.
        request.fetch_count++;

        // Override request.abort to reference count fetching, so we only cancel the load if
        // every caller cancels.
        request.callers.push(options);
        if(options.signal)
        {
            options.signal.addEventListener("abort", (e) => {
                // Remove this caller's callbacks, if any.
                if(options != null)
                {
                    var idx = request.callers.indexOf(options);
                    if(idx != -1)
                        request.callers.splice(idx, 1);
                }
                
                if(request.fetch_count == 0)
                {
                    console.error("Fetch was aborted more times than it was started:", url);
                    return;
                }

                request.fetch_count--;
                if(request.fetch_count > 0)
                    return;
                delete this._fetches[url];

                // Abort the underlying request.
                abort_actual_request.abort();
            });
        }

        try {
            return await request;
        } finally {
            delete helpers._fetches[url];
        }
    },

    // Prompt to save a blob to disk.  For some reason, the really basic FileSaver API disappeared from
    // the web.
    save_blob: function(blob, filename)
    {
        var blobUrl = URL.createObjectURL(blob);

        var a = document.createElement("a");
        a.hidden = true;
        document.body.appendChild(a);
        a.href = blobUrl;

        a.download = filename;
        
        a.click();

        // Clean up.
        //
        // If we revoke the URL now, or with a small timeout, Firefox sometimes just doesn't show
        // the save dialog, and there's no way to know when we can, so just use a large timeout.
        setTimeout(function() {
            window.URL.revokeObjectURL(blobUrl);
            a.parentNode.removeChild(a);
        }.bind(this), 1000);
    },

    // Return a Uint8Array containing a blank (black) image with the given dimensions and type.
    create_blank_image: function(image_type, width, height)
    {
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        var blank_frame = canvas.toDataURL(image_type, 1);
        if(!blank_frame.startsWith("data:" + image_type))
            throw "This browser doesn't support encoding " + image_type;

        var binary = atob(blank_frame.slice(13 + image_type.length));

        // This is completely stupid.  Why is there no good way to go from a data URL to an ArrayBuffer?
        var array = new Uint8Array(binary.length);
        for(var i = 0; i < binary.length; ++i)
            array[i] = binary.charCodeAt(i);
        return array;
    },

    // Stop the underlying page from sending XHR requests, since we're not going to display any
    // of it and it's just unneeded traffic.  For some dumb reason, Pixiv sends error reports by
    // creating an image, instead of using a normal API.  Override window.Image too to stop it
    // from sending error messages for this script.
    //
    // Firefox is now also bad and seems to have removed beforescriptexecute.  The Web is not
    // much of a dependable platform.
    block_network_requests: function()
    {
        RealXMLHttpRequest = window.XMLHttpRequest;        
        window.Image = function() { };

        dummy_fetch = function() { };
        dummy_fetch.prototype.ok = true;
        dummy_fetch.prototype.sent = function() { return this; }
        window.fetch = function() { return new dummy_fetch(); }

        window.XMLHttpRequest = function() { }
    },

    // Stop all scripts from running on the page.  This only works in Firefox.  This is a basic
    // thing for a userscript to want to do, why can't you do it in Chrome?
    block_all_scripts: function()
    {
        window.addEventListener("beforescriptexecute", function(e) {
            e.stopPropagation();
            e.preventDefault();
        }, true);
    },

    add_style: function(css)
    {
        var head = document.getElementsByTagName('head')[0];

        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    },

    // Create a node from HTML.
    create_node: function(html)
    {
        var temp = document.createElement("div");
        temp.innerHTML = html;
        return temp.firstElementChild;
    },

    // Set or unset a class.
    set_class: function(element, className, enable)
    {
        if(element.classList.contains(className) == enable)
            return;

        if(enable)
            element.classList.add(className);
        else
            element.classList.remove(className);
    },

    date_to_string: function(date)
    {
        var date = new Date(date);
        var day = date.toLocaleDateString();
        var time = date.toLocaleTimeString();
        return day + " " + time;
    },

    age_to_string: function(seconds)
    {
        var to_plural = function(label, places, value)
        {
            var factor = Math.pow(10, places);
            var plural_value = Math.round(value * factor);
            if(plural_value > 1)
                label += "s";
            return value.toFixed(places) + " " + label;
        };
        if(seconds < 60)
            return to_plural("sec", 0, seconds);
        var minutes = seconds / 60;
        if(minutes < 60)
            return to_plural("min", 0, minutes);
        var hours = minutes / 60;
        if(hours < 24)
            return to_plural("hour", 0, hours);
        var days = hours / 24;
        if(days < 30)
            return to_plural("day", 0, days);
        var months = days / 30;
        if(months < 12)
            return to_plural("month", 0, months);
        var years = months / 12;
        return to_plural("year", 1, years);
    },

    get_extension: function(fn)
    {
        var parts = fn.split(".");
        return parts[parts.length-1];
    },

    encode_query: function(data) {
        var str = [];
        for (var key in data)
        {
            if(!data.hasOwnProperty(key))
                continue;
            str.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        }    
        return str.join("&");
    },

    // Sending requests in user scripts is a nightmare:
    // - In TamperMonkey you can simply use unsafeWindow.XMLHttpRequest.  However, in newer versions
    // of GreaseMonkey, the request will be sent, but event handlers (eg. load) will fail with a
    // permissions error.  (That doesn't make sense, since you can assign DOM events that way.)
    // - window.XMLHttpRequest will work, but won't make the request as the window, so it will
    // act like a cross-origin request.  We have to use GM_xmlHttpRequest/GM.XMLHttpRequest instead.
    // - But, we can't use that in TamperMonkey (at least in Chrome), since ArrayBuffer is incredibly
    // slow.  It seems to do its own slow buffer decoding: a 2 MB ArrayBuffer can take over half a
    // second to decode.  We need to use regular XHR with TamperMonkey.
    // - GM_xmlhttpRequest in GreaseMonkey doesn't send a referer by default, and we need to set it
    // manually.  (TamperMonkey does send a referer by default.)

    // send_request_gm: Send a request with GM_xmlhttpRequest.
    //
    // The returned object will have an abort method that might abort the request.
    // (TamperMonkey provides abort, but GreaseMonkey doesn't.)
    //
    // Only the following options are supported:
    //
    // - headers
    // - method
    // - data
    // - responseType
    // - onload
    // - onprogress
    //
    // The returned object will only have abort, which is a no-op in GM.
    //
    // onload will always be called (unless the request is aborted), so there's always just
    // one place to put cleanup handlers when a request finishes.
    //
    // onload will be called with only resp.response and not the full response object.  On
    // error, onload(null) will be called rather than onerror.
    //
    // We use a limited interface since we have two implementations of this, one using XHR (for TM)
    // and one using GM_xmlhttpRequest (for GM), and this prevents us from accidentally
    // using a field that's only implemented with GM_xmlhttpRequest and breaking TM.
    send_request_gm: function(options)
    {
        if(options == null)
            options = {};

        return new Promise((resolve, reject) => {
            if(options.signal && options.signal.aborted)
            {
                reject("Aborted by signal");
                return;
            }
            
            var req_options = {};
            for(var key of ["url", "headers", "method", "data", "responseType", "onload", "onprogress"])
            {
                if(!(key in options))
                    continue;

                // We'll override onload.
                if(key == "onload")
                {
                    req_options.real_onload = options.onload;
                    continue;
                }
                req_options[key] = options[key];
            }

            // Set the referer, or some requests will fail.
            var url = new URL(document.location);
            url.hash = "";
            req_options.headers["Referer"] = url.toString();

            req_options.onload = function(response)
            {
                resolve(response.response);
            };

            // When is this ever called?
            req_options.onerror = function(response)
            {
                console.log("Request failed:", response);
                reject(e);
            }        

            var actual_request = GM_xmlhttpRequest(req_options);

            if(options.signal)
            {
                options.signal.addEventListener("abort", (e) => {
                    console.log("Aborting XHR");

                    // actual_request is null with newer, broken versions of GM, in which case
                    // we only pretend to cancel the request.
                    if(actual_request != null)
                        actual_request.abort();

                    // Remove real_onload, so if we can't actually cancel the request, we still
                    // won't call onload, since the caller is no longer expecting it.
                    delete req_options.real_onload;

                    reject("Aborted by signal");
                });        
            }
        });        
    },

    // The same as send_request_gm, but with XHR.
    send_request_xhr: function(options)
    {
        if(options == null)
            options = {};

        return new Promise((resolve, reject) => {
            if(options.signal && options.signal.aborted)
            {
                reject("Aborted by signal");
                return;
            }
            
            var xhr = new RealXMLHttpRequest();        

            if(options.signal)
            {
                options.signal.addEventListener("abort", (e) => {
                    console.log("Aborting XHR");
                    xhr.abort();
                    reject("Aborted by signal");
                });        
            }

            xhr.open(options.method || "GET", options.url);

            if(options.headers)
            {
                for(var key in options.headers)
                    xhr.setRequestHeader(key, options.headers[key]);
            }
            
            if(options.responseType)
                xhr.responseType = options.responseType;

            xhr.addEventListener("load", (e) => {
                resolve(xhr.response);
            });
            xhr.addEventListener("error", (e) => {
                reject(e);
            });

            xhr.addEventListener("progress", function(e) {
                if(options.onprogress)
                {
                    try {
                        options.onprogress(e);
                    } catch(exc) {
                        console.error(exc);
                    }
                }
            });
            
            if(options.method == "POST")
                xhr.send(options.data);
            else
                xhr.send();
        });
    },

    async send_request(options)
    {
        // In GreaseMonkey, use send_request_gm.  Otherwise, use send_request_xhr.  If
        // GM_info.scriptHandler doesn't exist, assume we're in GreaseMonkey, since 
        // TamperMonkey always defines it.
        //
        // We also assume that if GM_info doesn't exist we're in GreaseMonkey, since it's
        // GM that has a nasty habit of removing APIs that people are using, so if that
        // happens we're probably in GM.
        var greasemonkey = true;
        try
        {
            greasemonkey = GM_info.scriptHandler == null || GM_info.scriptHandler == "Greasemonkey";
        } catch(e) {
            greasemonkey = true;
        }

        if(greasemonkey)
            return await helpers.send_request_gm(options);
        else
            return await helpers.send_request_xhr(options);
    },

    // Send a request with the referer, cookie and CSRF token filled in.
    async send_pixiv_request(options)
    {
        if(options.headers == null)
            options.headers = {};

        // Only set x-csrf-token for requests to www.pixiv.net.  It's only needed for API
        // calls (not things like ugoira ZIPs), and the request will fail if we're in XHR
        // mode and set headers, since it'll trigger CORS.
        var hostname = new URL(options.url, document.location).hostname;
        if(hostname == "www.pixiv.net")
            options.headers["x-csrf-token"] = global_data.csrf_token;

        return await helpers.send_request(options);
    },

    // Why does Pixiv have 300 APIs?
    async rpc_post_request(url, data)
    {
        var result = await helpers.send_pixiv_request({
            "method": "POST",
            "url": url,

            "data": helpers.encode_query(data),
            "responseType": "json",

            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            },
        });

        console.log(result);
        if(result && result.error)
            throw "Error in XHR request (" + url + "): "+ result.message;

        return result;
    },

    async rpc_get_request(url, data, options)
    {
        if(options == null)
            options = {};

        var params = new URLSearchParams();
        for(var key in data)
            params.set(key, data[key]);
        var query = params.toString();
        if(query != "")
            url += "?" + query;
        
        var result = await helpers.send_pixiv_request({
            "method": "GET",
            "url": url,
            "responseType": "json",
            "signal": options.signal,

            "headers": {
                "Accept": "application/json",
            },
        });

        if(result.error)
            throw "Error in XHR request (" + url + "): "+ result.message;

        return result;
    },

    async post_request(url, data)
    {
        var result = await helpers.send_pixiv_request({
            "method": "POST",
            "url": url,
            "responseType": "json",

            "data" :JSON.stringify(data),

            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
            },
        });        

        if(result.error)
            throw "Error in XHR request (" + url + "): "+ result.message;

        return result;
    },

    async get_request(url, data, options)
    {
        var params = new URLSearchParams();
        for(var key in data)
            params.set(key, data[key]);
        var query = params.toString();
        if(query != "")
            url += "?" + query;

        if(options == null)
            options = {};

        var result = await helpers.send_pixiv_request({
            "method": "GET",
            "url": url,
            "responseType": "json",
            "signal": options.signal,

            "headers": {
                "Accept": "application/json",
            },
        });

        // If the result isn't valid JSON, we'll get a null result.
        if(result == null)
            result = { error: true, message: "Invalid response" };
        if(result.error)
            throw "Error in XHR request (" + url + "): "+ result.message;

        return result;
    },

    async post_form_request(url, params)
    {
        params.set("tt", global_data.csrf_token);
        
        var result = await helpers.send_pixiv_request({
            "method": "POST",
            "url": url,

            "data": params.toString(),

            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        return result;
    },
    
    // Download all URLs in the list.  Call callback with an array containing one ArrayData for each URL.  If
    // any URL fails to download, call callback with null.
    //
    // I'm not sure if it's due to a bug in the userscript extension or because we need to specify a
    // header here, but this doesn't properly use cache and reloads the resources from scratch, which
    // is really annoying.  We can't read the images directly since they're on a different domain.
    //
    // We could start multiple requests to pipeline this better.  However, the usual case where we'd download
    // lots of images is downloading a group of images, and in that case we're already preloading them as
    // images, so it's probably redundant to do it here.
    download_urls: function(urls, callback)
    {
        // Make a copy.
        urls = urls.slice(0);

        var results = [];
        var start_next = function()
        {
            var url = urls.shift();
            if(url == null)
            {
                callback(results);
                return;
            }

            // FIXME: This caches in GreaseMonkey, but not in TamperMonkey.  Do we need to specify cache
            // headers or is TamperMonkey just broken?
            GM_xmlhttpRequest({
                "method": "GET",
                "url": url,
                "responseType": "arraybuffer",

                "headers": {
                    "Cache-Control": "max-age=360000",
                },

                onload: function(result) {
                    results.push(result.response);
                    start_next();
                }.bind(this),
            });
        };

        start_next();
    },

    // Load a page in an iframe, and call callback on the resulting document.
    // Remove the iframe when the callback returns.
    async load_data_in_iframe(url)
    {
        if(GM_info.scriptHandler == "Tampermonkey")
        {
            // If we're in Tampermonkey, we don't need any of the iframe hijinks and we can
            // simply make a request with responseType: document.  This is much cleaner than
            // the Greasemonkey workaround below.
            var result = await helpers.send_pixiv_request({
                "method": "GET",
                "url": url,
                "responseType": "document",
            });
            return result;
        }

        // The above won't work with Greasemonkey.  It returns a document we can't access,
        // raising exceptions if we try to access it.  Greasemonkey's sandboxing needs to
        // be shot into the sun.
        //
        // Instead, we load the document in a sandboxed iframe.  It'll still load resources
        // that we don't need (though they'll mostly load from cache), but it won't run
        // scripts.
        return new Promise((resolve, reject) => {
            var iframe = document.createElement("iframe");

            // Enable sandboxing, so scripts won't run in the iframe.  Set allow-same-origin, or
            // we won't be able to access it in contentDocument (which doesn't really make sense,
            // sandbox is for sandboxing the iframe, not us).
            iframe.sandbox = "allow-same-origin";
            iframe.src = url;
            iframe.hidden = true;
            document.body.appendChild(iframe);

            iframe.addEventListener("load", function(e) {
                try {
                    resolve(iframe.contentDocument);
                } finally {
                    // Remove the iframe.  For some reason, we have to do this after processing it.
                    setTimeout(() => {
                        document.body.removeChild(iframe);
                    }, 0);
                }
            });
        });
    },

    set_recent_bookmark_tags(tags)
    {
        helpers.set_value("recent-bookmark-tags", JSON.stringify(tags));
    },

    get_recent_bookmark_tags()
    {
        var recent_bookmark_tags = helpers.get_value("recent-bookmark-tags");
        if(recent_bookmark_tags == null)
            return [];
        return JSON.parse(recent_bookmark_tags);
    },

    // Move tag_list to the beginning of the recent tag list, and prune tags at the end.
    update_recent_bookmark_tags: function(tag_list)
    {
        // Move the tags we're using to the top of the recent bookmark tag list.
        var recent_bookmark_tags = helpers.get_recent_bookmark_tags();
        for(var i = 0; i < tag_list.length; ++i)
        {
            var tag = tag_list[i];
            var idx = recent_bookmark_tags.indexOf(tag_list[i]);
            if(idx != -1)
                recent_bookmark_tags.splice(idx, 1);
        }
        for(var i = 0; i < tag_list.length; ++i)
            recent_bookmark_tags.unshift(tag_list[i]);

        // Remove tags that haven't been used in a long time.
        recent_bookmark_tags.splice(20);
        helpers.set_recent_bookmark_tags(recent_bookmark_tags);
    },

    // Add tag to the recent search list, or move it to the front.
    add_recent_search_tag(tag)
    {
        var recent_tags = helpers.get_value("recent-tag-searches") || [];
        var idx = recent_tags.indexOf(tag);
        if(idx != -1)
            recent_tags.splice(idx, 1);
        recent_tags.unshift(tag);

        // Trim the list.
        recent_tags.splice(50);
        helpers.set_value("recent-tag-searches", recent_tags);

        window.dispatchEvent(new Event("recent-tag-searches-changed"));
    },

    remove_recent_search_tag(tag)
    {
        // Remove tag from the list.  There should normally only be one.
        var recent_tags = helpers.get_value("recent-tag-searches") || [];
        while(1)
        {
            var idx = recent_tags.indexOf(tag);
            if(idx == -1)
                break;
            recent_tags.splice(idx, 1);
        }
        helpers.set_value("recent-tag-searches", recent_tags);
        
        window.dispatchEvent(new Event("recent-tag-searches-changed"));
    },

    // Find globalInitData in a document, evaluate it and return it.  If it can't be
    // found, return null.
    get_global_init_data(doc)
    {
        // Find a script element that sets globalInitData.  This is the only thing in
        // the page that we use.
        var init_element;
        for(var element of doc.querySelectorAll("script"))
        {
            if(element.innerText == null || element.innerText.indexOf("globalInitData") == -1)
                continue;

            init_element = element
            break;
        }

        if(init_element == null)
            return null;
       
        // This script assigns globalInitData.  Wrap it in a function to return it.
        init_script = init_element.innerText;
        init_script = "(function() { " + init_script + "; return globalInitData; })();";

        var data = eval(init_script);

        // globalInitData is frozen, which we don't want.  Deep copy the object to undo this.
        data = JSON.parse(JSON.stringify(data))
        
        return data;
    },

    // If this is an older page (currently everything except illustrations), the CSRF token,
    // etc. are stored on an object called "pixiv".  We aren't actually executing scripts, so
    // find the script block.
    get_pixiv_data(doc)
    {
        // Find all script elements that set pixiv.xxx.  There are two of these, and we need
        // both of them.
        var init_elements = [];
        for(var element of doc.querySelectorAll("script"))
        {
            if(element.innerText == null)
                continue;
            if(!element.innerText.match(/pixiv.*(token|id) = /))
                continue;

            init_elements.push(element);
        }

        if(init_elements.length < 1)
            return null;
        
        // Create a stub around the scripts to let them execute as if they're initializing the
        // original object.
        var init_script = "";
        init_script += "(function() {";
        init_script += "var pixiv = { config: {}, context: {}, user: {} }; ";
        for(var element of init_elements)
            init_script += element.innerText;
        init_script += "return pixiv;";
        init_script += "})();";
        return eval(init_script);
    },

    get_tags_from_illust_data(illust_data)
    {
        // illust_data might contain a list of dictionaries (data.tags.tags[].tag), or
        // a simple list (data.tags[]), depending on the source.
        if(illust_data.tags.tags == null)
            return illust_data.tags;

        var result = [];
        for(var tag_data of illust_data.tags.tags)
            result.push(tag_data.tag);
            
        return result;
    },

    // Return true if the given illust_data.tags contains the pixel art (ドット絵) tag.
    tags_contain_dot(illust_data)
    {
        var tags = helpers.get_tags_from_illust_data(illust_data);
        for(var tag of tags)
            if(tag.indexOf("ドット") != -1)
                return true;

        return false;
    },

    // Find all links to Pixiv pages, and set a #ppixiv anchor.
    //
    // This allows links to images in things like image descriptions to be loaded
    // internally without a page navigation.
    make_pixiv_links_internal(root)
    {
        for(var a of root.querySelectorAll("A"))
        {
            var url = new URL(a.href, document.location);
            if(url.hostname != "pixiv.net" && url.hostname != "www.pixiv.net" || url.hash != "")
                continue;

            url.hash = "#ppixiv";
            a.href = url.toString();
        }
    },

    fix_pixiv_links: function(root)
    {
        for(var a of root.querySelectorAll("A[target='_blank']"))
            a.target = "";

        for(var a of root.querySelectorAll("A"))
        {
            if(a.relList == null)
                a.rel += " noreferrer noopener"; // stupid Edge
            else
            {
                a.relList.add("noreferrer");
                a.relList.add("noopener");
            }
        }

        for(var a of root.querySelectorAll("A[href*='jump.php']"))
        {
            // These can either be /jump.php?url or /jump.php?url=url.
            var url = new URL(a.href);
            if(url.searchParams.has("url"))
                a.href = url.searchParams.get("url");
            else
            {
                var target = url.search.substr(1); // remove "?"
                target = decodeURIComponent(target);
                a.href = target;
            }
        }
    },

    set_page_title: function(title)
    {
        document.querySelector("title").textContent = title;
    },

    set_page_icon: function(url)
    {
        document.querySelector("link[rel='icon']").href = url;
    },

    // Watch for clicks on links inside node.  If a search link is clicked, add it to the
    // recent search list.
    add_clicks_to_search_history: function(node)
    {
        node.addEventListener("click", function(e) {
            if(e.defaultPrevented)
                return;
            if(e.target.tagName != "A")
                return;

            var url = new URL(e.target.href);
            if(url.pathname != "/search.php")
                return;

            var tag = url.searchParams.get("word");
            console.log("Adding to tag search history:", tag);
            helpers.add_recent_search_tag(tag);
        });
    },

    // Add a basic event handler for an input:
    //
    // - When enter is pressed, submit will be called.
    // - Event propagation will be stopped, so global hotkeys don't trigger.
    //
    // Note that other event handlers on the input will still be called.
    input_handler: function(input, submit)
    {
        input.addEventListener("keydown", function(e) {
            // Always stopPropagation, so inputs aren't handled by main input handling.
            e.stopPropagation();

            if(e.keyCode == 13) // enter
                submit(e);
        });
    },

    // Parse the hash portion of our URL.  For example,
    //
    // #ppixiv?a=1&b=2
    //
    // returns { a: "1", b: "2" }.
    //
    // If this isn't one of our URLs, return null.
    parse_hash: function(url)
    {
        var ppixiv_url = url.hash.startsWith("#ppixiv");
        if(!ppixiv_url)
            return null;
        
        // Parse the hash of the current page as a path.  For example, if
        // the hash is #ppixiv/foo/bar?baz, parse it as /ppixiv/foo/bar?baz.
        var adjusted_url = url.hash.replace(/#/, "/");
        return new URL(adjusted_url, url);
    },

    get_hash_args: function(url)
    {
        var hash_url = helpers.parse_hash(url);
        if(hash_url == null)
            return new unsafeWindow.URLSearchParams();

        var query = hash_url.search;
        if(!query.startsWith("?"))
            return new unsafeWindow.URLSearchParams();

        query = query.substr(1);

        // Use unsafeWindow.URLSearchParams to work around https://bugzilla.mozilla.org/show_bug.cgi?id=1414602.
        var params = new unsafeWindow.URLSearchParams(query);
        return params;
    },
    
    // Set the hash portion of url to args, as a ppixiv url.
    //
    // For example, given { a: "1", b: "2" }, set the hash to #ppixiv?a=1&b=2.
    set_hash_args: function(url, hash_params)
    {
        url.hash = "#ppixiv";

        var hash_string = hash_params.toString();
        if(hash_string != "")
            url.hash += "?" + hash_string;
    },

    // Given a URLSearchParams, return a new URLSearchParams with keys sorted alphabetically.
    sort_query_parameters(search)
    {
        var search_keys = unsafeWindow.Array.from(search.keys()); // GreaseMonkey encapsulation is bad
        search_keys.sort();

        var result = new URLSearchParams();
        for(var key of search_keys)
            result.set(key, search.get(key));
        return result;
    },

    // This is incremented whenever we navigate forwards, so we can tell in onpopstate
    // whether we're navigating forwards or backwards.
    current_history_state_index()
    {
        return (history.state && history.state.index != null)? history.state.index: 0;
    },

    get_args: function(url)
    {
        var url = new URL(url, document.location);
        return {
            path: url.pathname,
            query: url.searchParams,
            hash: helpers.get_hash_args(url),
        }
    },

    set_args(args, add_to_history, cause)
    {
        var url = new URL(document.location);
        url.pathname = args.path;
        url.search = args.query.toString();
        helpers.set_hash_args(url, args.hash);
        helpers.set_page_url(url, add_to_history, cause);
    },
    
    // Set document.href, either adding or replacing the current history state.
    //
    // window.onpopstate will be synthesized if the URL is changing.
    //
    // If cause is set, it'll be included in the popstate event as navigationCause.
    // This can be used in event listeners to determine what caused a navigation.
    // For browser forwards/back, this won't be present.
    set_page_url(url, add_to_history, cause)
    {
        var old_url = document.location.toString();

        // history.state.index is incremented whenever we navigate forwards, so we can
        // tell in onpopstate whether we're navigating forwards or backwards.
        var current_history_index = helpers.current_history_state_index();

        var new_history_index = current_history_index;
        if(add_to_history)
            new_history_index++;

        var history_data = {
            index: new_history_index
        };

        // console.log("Changing state to", url.toString());
        if(add_to_history)
            history.pushState(history_data, "", url.toString());
        else
            history.replaceState(history_data, "", url.toString());

        // Chrome is broken.  After replacing state for a while, it starts logging
        //
        // "Throttling history state changes to prevent the browser from hanging."
        //
        // This is completely broken: it triggers with state changes no faster than the
        // user can move the mousewheel (much too sensitive), and it happens on replaceState
        // and not just pushState (which you should be able to call as fast as you want).
        //
        // People don't think things through.
        console.log("Set URL to", document.location.toString(), add_to_history);

        if(document.location.toString() != old_url)
        {
            // Browsers don't send onpopstate for history changes, but we want them, so
            // send a synthetic one.
            // console.log("Dispatching popstate:", document.location.toString());
            var event = new PopStateEvent("popstate");

            // Set initialNavigation to true.  This indicates that this event is for a new
            // navigation, and not from browser forwards/back.
            event.navigationCause = cause;

            window.dispatchEvent(event);
        }
    },

    setup_popups(container, selectors)
    {
        var setup_popup = function(box)
        {
            box.addEventListener("mouseover", function(e) { helpers.set_class(box, "popup-visible", true); });
            box.addEventListener("mouseout", function(e) { helpers.set_class(box, "popup-visible", false); });
        }

        for(var selector of selectors)
        {
            var box = container.querySelector(selector);
            if(box == null)
            {
                console.warn("Couldn't find", selector);
                continue;
            }
            setup_popup(box);
        }
    },

    // Return the offset of element relative to an ancestor.
    get_relative_pos(element, ancestor)
    {
        var x = 0, y = 0;
        while(element != null && element != ancestor)
        {
            x += element.offsetLeft;
            y += element.offsetTop;
            // Advance through parents until we reach the offsetParent or the ancestor
            // that we're stopping at.  We do this rather than advancing to offsetParent,
            // in case ancestor isn't an offsetParent.
            var search_for = element.offsetParent;
            while(element != ancestor && element != search_for)
                element = element.parentNode;
        }
        return [x, y];
    },
    
    clamp(value, min, max)
    {
        return Math.min(Math.max(value, min), max);
    },

    // Return a promise that resolves when img finishes loading, or rejects if it
    // fails to load.
    wait_for_image_load(img, abort_signal)
    {
        return new Promise((resolve, reject) => {
            // Resolve immediately if the image is already loaded.
            if(img.complete)
            {
                resolve();
                return;
            }

            if(abort_signal && abort_signal.aborted)
            {
                reject("Aborted");
                return;
            }

            var onabort = (e) => {
                remove_listeners();
                reject("Aborted");
            };

            var onerror = (e) => {
                remove_listeners();
                reject("Load error");
            };

            var onload = (e) => {
                remove_listeners();
                resolve();
            };

            var remove_listeners = () => {
                img.removeEventListener("error", onerror);
                img.removeEventListener("load", onload);
                if(abort_signal)
                    abort_signal.addEventListener("abort", onabort);
            };

            img.addEventListener("error", onerror);
            img.addEventListener("load", onload);
            if(abort_signal)
                abort_signal.addEventListener("abort", onabort);
        });
    },

    // If image.decode is available, asynchronously decode url.
    async decode_image(url, abort_signal)
    {
        var img = document.createElement("img");
        img.src = url;

        var onabort = (e) => {
            // If we're aborted, set the image to a small PNG, which cancels the previous load
            // in Firefox and Chrome.
            img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
        };

        if(abort_signal)
            abort_signal.addEventListener("abort", onabort);
        
        try {
            await helpers.wait_for_image_load(img, abort_signal);
        } catch(e) {
            // Ignore load errors, since this is just a load optimization.
            // console.error("Ignoring error in decode:", e);
            return;
        } finally {
            // Remove the abort listener.
            if(abort_signal)
                abort_signal.removeEventListener("abort", onabort);
        }

        // If we finished by aborting, don't bother decoding the blank PNG we changed the
        // image to.
        if(abort_signal && abort_signal.aborted)
            return;
        
        if(HTMLImageElement.prototype.decode == null)
        {
            // If we don't have img.decode, fake it by drawing the image into an offscreen canvas
            // to force the browser to decode it.
            var canvas = document.createElement("canvas");
            canvas.width = 1;
            canvas.height = 1;

            var context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);
        }
        else
        {
            try {
                await img.decode();
            } catch(e) {
                // console.error("Ignoring error in decode:", e);
            }
        }
    },

    // Return a CSS style to specify thumbnail resolutions.
    //
    // Based on the dimensions of the container and a desired pixel size of thumbnails,
    // figure out how many columns to display to bring us as close as possible to the
    // desired size.
    //
    // container is the containing block (eg. ul.thumbnails).
    // top_selector is a CSS selector for the thumbnail block.  We should be able to
    // simply create a scoped stylesheet, but browsers don't understand the importance
    // of encapsulation.
    make_thumbnail_sizing_style(container, top_selector, options)
    {
        // The total pixel size we want each thumbnail to have:
        var desired_size = options.size || 300;
        var ratio = options.ratio || 1;
        var max_columns = options.max_columns || 5;

        var desired_pixels = desired_size*desired_size / window.devicePixelRatio;
        var container_width = container.parentNode.clientWidth;
        var padding = container_width / 100;
        padding = Math.min(padding, 10);
        padding = Math.round(padding);
        if(options.min_padding)
            padding = Math.max(padding, options.min_padding);
        
        var closest_error_to_desired_pixels = -1;
        var best_size = [0,0];
        var best_columns = 0;
        for(var columns = max_columns; columns >= 1; --columns)
        {
            // The amount of space in the container remaining for images, after subtracting
            // the padding around each image.
            var remaining_width = container_width - padding*columns*2;
            var max_width = remaining_width / columns;
            var max_height = max_width;
            if(ratio < 1)
                max_width *= ratio;
            else if(ratio > 1)
                max_height /= ratio;

            max_width = Math.floor(max_width);
            max_height = Math.floor(max_height);

            var pixels = max_width * max_height;
            var error = Math.abs(pixels - desired_pixels);
            if(closest_error_to_desired_pixels == -1 || error < closest_error_to_desired_pixels)
            {
                closest_error_to_desired_pixels = error;
                best_size = [max_width, max_height];
                best_columns = columns;
            }
        }

        max_width = best_size[0];
        max_height = best_size[1];

        // If we want a smaller thumbnail size than we can reach within the max column
        // count, we won't have reached desired_pixels.  In this case, just clamp to it.
        // This will cause us to use too many columns, which we'll correct below with
        // container_width.
        if(max_width * max_height > desired_pixels)
        {
            max_height = max_width = Math.round(Math.sqrt(desired_pixels));

            if(ratio < 1)
                max_width *= ratio;
            else if(ratio > 1)
                max_height /= ratio;
        }

        // Clamp the width of the container to the number of columns we expect.
        var container_width = max_columns * (max_width+padding*2);

        var css = 
            top_selector + " .thumbnail-link { " +
                "width: " + max_width + "px; " +
                "height: " + max_height + "px; " +
            "} " + 
            top_selector + " li.thumbnail-box { padding: " + padding + "px; }";
        if(container_width != null)
            css += top_selector + " > .thumbnails { max-width: " + container_width + "px; }";
        return css;
    },
    
    // If the aspect ratio is very narrow, don't use any panning, since it becomes too spastic.
    // If the aspect ratio is portrait, use vertical panning.
    // If the aspect ratio is landscape, use horizontal panning.
    //
    // If it's in between, don't pan at all, since we don't have anywhere to move and it can just
    // make the thumbnail jitter in place.
    //
    // Don't pan muted images.
    //
    // container_aspect_ratio is the aspect ratio of the box the thumbnail is in.  If the
    // thumb is in a 2:1 landscape box, we'll adjust the min and max aspect ratio accordingly.
    set_thumbnail_panning_direction(thumb, width, height, container_aspect_ratio)
    {
        var aspect_ratio = width / height;
        aspect_ratio /= container_aspect_ratio;
        var min_aspect_for_pan = 1.1;
        var max_aspect_for_pan = 4;
        var vertical_panning = aspect_ratio > (1/max_aspect_for_pan) && aspect_ratio < 1/min_aspect_for_pan;
        var horizontal_panning = aspect_ratio > min_aspect_for_pan && aspect_ratio < max_aspect_for_pan;
        helpers.set_class(thumb, "vertical-panning", vertical_panning);
        helpers.set_class(thumb, "horizontal-panning", horizontal_panning);
    },

    set_title(illust_data, user_data)
    {
        if(user_data == null && illust_data != null)
            user_data = illust_data.userInfo;

        if(illust_data == null)
        {
            helpers.set_page_title("Loading...");
            return;
        }

        var page_title = "";
        if(illust_data.bookmarkData)
            page_title += "★";

        page_title += user_data.name + " - " + illust_data.illustTitle;
        helpers.set_page_title(page_title);
    },

    set_icon(illust_data, user_data)
    {
        if(user_data == null && illust_data != null)
            user_data = illust_data.userInfo;

        helpers.set_page_icon(user_data && user_data.isFollowed? binary_data['favorited_icon.png']:binary_data['regular_pixiv_icon.png']);
    },

    set_title_and_icon(illust_data, user_data)
    {
        helpers.set_title(illust_data, user_data)
        helpers.set_icon(illust_data, user_data)
    },

    // Return 1 if the given keydown event should zoom in, -1 if it should zoom
    // out, or null if it's not a zoom keypress.
    is_zoom_hotkey(e)
    {
        if(!e.ctrlKey)
            return null;
        
        if(e.code == "NumpadAdd" || e.code == "Equal") /* = */
            return +1;
        if(e.code == "NumpadSubtract" || e.code == "Minus") /* - */ 
            return -1;
        return null;
    },

    // https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas/3368118#3368118
    /*
     * Draws a rounded rectangle using the current state of the canvas.
     * If you omit the last three params, it will draw a rectangle
     * outline with a 5 pixel border radius
     */
    draw_round_rect(ctx, x, y, width, height, radius)
    {
        if(typeof radius === 'undefined')
            radius = 5;
        if(typeof radius === 'number') {
            radius = {tl: radius, tr: radius, br: radius, bl: radius};
        } else {
            var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
            for(var side in defaultRadius)
                radius[side] = radius[side] || defaultRadius[side];
        }

        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
    },
};

// Handle maintaining and calling a list of callbacks.
class callback_list
{
    constructor()
    {
        this.callbacks = [];
    }

    // Call all callbacks, passing all arguments to the callback.
    call()
    {
        for(var callback of this.callbacks.slice())
        {
            try {
                callback.apply(null, arguments);
            } catch(e) {
                console.error(e);
            }
        }
    }

    register(callback)
    {
        if(callback == null)
            throw "callback can't be null";

        if(this.callbacks.indexOf(callback) != -1)
            return;

        this.callbacks.push(callback);
    }

    unregister(callback)
    {
        if(callback == null)
            throw "callback can't be null";

        var idx = this.callbacks.indexOf(callback);
        if(idx == -1)
            return;

        this.callbacks.splice(idx, 1);
    }
}

// Listen to viewhidden on element and each of element's parents.
//
// When a view is hidden (eg. a top-level view or a UI popup), we send
// viewhidden to it so dropdowns, etc. inside it can close.
class view_hidden_listener
{
    static send_viewhidden(element)
    {
        var event = new Event("viewhidden", {
            bubbles: false
        });
        element.dispatchEvent(event);
    }

    constructor(element, callback)
    {
        this.onviewhidden = this.onviewhidden.bind(this);
        this.callback = callback;

        // There's no way to listen on events on any parent, so we have to add listeners
        // to each parent in the tree.
        this.listening_on_elements = [];
        while(element != null)
        {
            this.listening_on_elements.push(element);
            element.addEventListener("viewhidden", this.onviewhidden);

            element = element.parentNode;
        }
    }

    // Remove listeners.
    shutdown()
    {
        for(var element of this.listening_on_elements)
            element.removeEventListener("viewhidden", this.onviewhidden);
        this.listening_on_elements = [];
    }

    onviewhidden(e)
    {
        this.callback(e);
    }
};

// Filter an image to a canvas.
//
// When an image loads, draw it to a canvas of the same size, optionally applying filter
// effects.
//
// If base_filter is supplied, it's a filter to apply to the top copy of the image.
// If overlay(ctx, img) is supplied, it's a function to draw to the canvas.  This can
// be used to mask the top copy.
class image_canvas_filter
{
    constructor(img, canvas, base_filter, overlay)
    {
        this.img = img;
        this.canvas = canvas;
        this.base_filter = base_filter || "";
        this.overlay = overlay;
        this.ctx = this.canvas.getContext("2d");

        this.img.addEventListener("load", this.update_canvas.bind(this));

        // For some reason, browsers can't be bothered to implement onloadstart, a seemingly
        // fundamental progress event.  So, we have to use a mutation observer to tell when
        // the image is changed, to make sure we clear it as soon as the main image changes.
        this.observer = new MutationObserver((mutations) => {
            for(var mutation of mutations) {
                if(mutation.type == "attributes")
                {
                    if(mutation.attributeName == "src")
                    {
                        this.update_canvas();
                    }
                }
            }
        });

        this.observer.observe(this.img, { attributes: true });
        
        this.update_canvas();
    }

    clear()
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    update_canvas()
    {
        this.canvas.width = this.img.naturalWidth;
        this.canvas.height = this.img.naturalHeight;

        this.clear();

        // If the image is still loading, just clear any previous image from the canvas.
        if(!this.img.complete)
            return;

        // Draw the image onto the canvas.
        this.ctx.save();
        this.ctx.filter = this.base_filter;
        this.ctx.drawImage(this.img, 0, 0);
        this.ctx.restore();

        // Composite on top of the base image.
        this.ctx.save();

        if(this.overlay)
            this.overlay(this.ctx, this.img);

        this.ctx.restore();
        
        // Use destination-over to draw the image underneath the overlay we just drew.
        this.ctx.globalCompositeOperation = "destination-over";
        this.ctx.drawImage(this.img, 0, 0);
    }
}

// Fix Chrome's click behavior.
//
// Work around odd, obscure click behavior in Chrome: releasing the right mouse
// button while the left mouse button is held prevents clicks from being generated
// when the left mouse button is released (even if the context menu is cancelled).
// This causes lost inputs when quickly right-left clicking our context menu.
//
// Unfortunately, we have to reimplement the click event in order to do this.
// We only attach this handler where it's really needed (the popup menu).
//
// We mimic Chrome's click detection behavior: an element is counted as a click if
// the mouseup event is an ancestor of the element that was clicked, or vice versa.
// This is different from Firefox which uses the distance the mouse has moved.
class fix_chrome_clicks
{
    constructor(container)
    {
        // Don't do anything if we're not in Chrome.
        this.enabled = navigator.userAgent.indexOf("Chrome") != -1;
        if(!this.enabled)
            return;

        this.onpointer = this.onpointer.bind(this);
        this.onclick = this.onclick.bind(this);
        this.oncontextmenu = this.oncontextmenu.bind(this);

        this.container = container;
        this.pressed_node = null;

        // Since the pointer events API is ridiculous and doesn't send separate pointerdown
        // events for each mouse button, we have to listen to all clicks in window in order
        // to find out if button 0 is pressed.  If the user presses button 2 outside of our
        // container we still want to know about button 0, but that button 0 event might happen
        // in another element that we don't care about, 
        // for each 
        this.container.addEventListener("pointerdown", this.onpointer, true);
        this.container.addEventListener("pointerup", this.onpointer, true);
        this.container.addEventListener("pointermove", this.onpointer, true);
        this.container.addEventListener("contextmenu", this.oncontextmenu);
        this.container.addEventListener("click", this.onclick, true);
    }

    // We have to listen on window as well as our container for events, since a
    // mouse up might happen on another node after the mouse down happened in our
    // node.  We only register these while a button is pressed in our node, so we
    // don't have global pointer event handlers installed all the time.
    start_waiting_for_release()
    {
        if(this.pressed_node != null)
        {
            console.warn("Unexpected call to start_waiting_for_release");
            return;
        }
        window.addEventListener("pointerup", this.onpointer, true);
        window.addEventListener("pointermove", this.onpointer, true);
    }

    stop_waiting_for_release()
    {
        if(this.pressed_node == null)
            return;

        window.removeEventListener("pointerup", this.onpointer, true);
        window.removeEventListener("pointermove", this.onpointer, true);
        this.pressed_node = null;
    }

    // The pointer events API is nonsensical: button presses generate pointermove
    // instead of pointerdown or pointerup if another button is already pressed.  That's
    // completely useless, so we have to just listen to all of them the same way and
    // deduce what's happening from the button mask.
    onpointer(e)
    {
        if(e.pointerType != "mouse")
            return;

        if(e.type == "pointerdown")
        {
            // Start listening to move events.  We only need this while a button
            // is pressed.
            this.start_waiting_for_release();
        }

        if(e.buttons & 1)
        {
            // The primary button is pressed, so remember what element we were on.
            if(this.pressed_node == null)
            {
                // console.log("mousedown", e.target.id);
                this.pressed_node = e.target;
            }
            return;
        }

        if(this.pressed_node == null)
            return;

        var pressed_node = this.pressed_node;

        // The button was released.  Unregister our temporary event listeners.
        this.stop_waiting_for_release();

        // console.log("released:", e.target.id, "after click on", pressed_node.id);

        var released_node = e.target;
        var click_target = null;
        if(helpers.is_above(released_node, pressed_node))
            click_target = released_node;
        else if(helpers.is_above(pressed_node, released_node))
            click_target = pressed_node;

        if(click_target == null)
        {
            // console.log("No target for", pressed_node, "and", released_node);
            return;
        }

        // If the click target is above our container, stop.
        if(helpers.is_above(click_target, this.container))
            return;

        // Why is cancelling the event not preventing mouse events and click events?
        e.preventDefault();
        // console.log("do click on", click_target.id, e.defaultPrevented, e.type);
        this.send_click_event(click_target, e);
    }

    oncontextmenu(e)
    {
        if(this.pressed_node != null && !e.defaultPrevented)
        {
            console.log("Not sending click because the context menu was opened");
            this.pressed_node = null;
        }
    }

    // Cancel regular mouse clicks.
    //
    // Pointer events is a broken API.  It sends mouse button presses as pointermove
    // if another button is already pressed, which already doesn't make sense and
    // makes it a headache to use.  But, to make things worse, pointermove is defined
    // as having the same default event behavior as mousemove, despite the fact that it
    // can correspond to a mouse press or release.  Also, preventDefault just seems to
    // be broken in Chrome and has no effect.
    //
    // So, we just cancel all button 0 click events that weren't sent by us.
    onclick(e)
    {
        if(e.button != 0)
            return;

        // Ignore synthetic events.
        if(!e.isTrusted)
            return;

        e.preventDefault();
        e.stopImmediatePropagation();
    }

    send_click_event(target, source_event)
    {
        var e = new MouseEvent("click", source_event);
        e.synthetic = true;
        target.dispatchEvent(e);
    }


    shutdown()
    {
        if(!this.enabled)
            return;

        this.stop_waiting_for_release();
        this.pressed_node = null;

        this.container.removeEventListener("pointerup", this.onpointer, true);
        this.container.removeEventListener("pointerdown", this.onpointer, true);
        this.container.removeEventListener("pointermove", this.onpointer, true);
        this.container.removeEventListener("contextmenu", this.oncontextmenu);
        this.container.removeEventListener("click", this.onclick, true);
    }
}

// This installs some minor tweaks that aren't related to the main viewer functionality.
(function() {
    // If this is an iframe, don't do anything.  This may be a helper iframe loaded by
    // load_data_in_iframe, in which case the main page will do the work.
    if(window.top != window.self)
        return;

    window.addEventListener("DOMContentLoaded", function(e) {
        try {
            if(window.location.pathname.startsWith("/bookmark.php"))
            {
                // On the follow list, make the user links point at the works page instead
                // of the useless profile page.
                var links = document.documentElement.querySelectorAll('A');
                for(var i = 0; i < links.length; ++i)
                {
                    var a = links[i];
                    a.href = a.href.replace(/member\.php/, "member_illust.php");
                }
            };
        } catch(e) {
            // GM error logs don't make it to the console for some reason.
            console.log(e);
        }
    });
})();
// A basic widget base class.
class widget
{
    constructor(container)
    {
        this.container = container;

        // Let the caller finish, then refresh.
        setTimeout(() => {
            this.refresh();
        }, 0);
    }

    async refresh()
    {
    }
}

// A widget that shows info for a particular illust_id.
//
// An illust_id can be set, and we'll refresh when it changes.
class illust_widget extends widget
{
    constructor(container)
    {
        super(container);

        // Refresh when the image data changes.
        image_data.singleton().illust_modified_callbacks.register(this.refresh.bind(this));
    }

    set illust_id(value)
    {
        if(this._illust_id == value)
            return;
        this._illust_id = value;
        this.refresh();
    }
    get illust_id() { return this._illust_id; }

    get visible()
    {
        return !this.container.hidden;
    }
     
    async refresh()
    {
        // Grab the illust info.
        var illust_id = this._illust_id;
        var illust_data = null;
        if(this._illust_id != null)
            illust_data = await image_data.singleton().get_image_info(this._illust_id);

        // Stop if the ID changed while we were async.
        if(this._illust_id != illust_id)
            return;

        await this.refresh_internal(illust_data);
    }

    refresh_internal(illust_data)
    {
        throw "Not implemented";
    }
}

// Display messages in the popup widget.  This is a singleton.
class message_widget
{
    static get singleton()
    {
        if(message_widget._singleton == null)
            message_widget._singleton = new message_widget();
        return message_widget._singleton;
    }

    constructor()
    {
        this.container = document.body.querySelector(".hover-message");
        this.timer = null;
    }

    show(message)
    {
        this.clear_timer();

        this.container.querySelector(".message").innerHTML = message;

        this.container.classList.add("show");
        this.container.classList.remove("centered");
        this.timer = setTimeout(function() {
            this.container.classList.remove("show");
        }.bind(this), 3000);
    }

    // Center the current message instead of showing it at the bottom.
    center()
    {
        this.container.classList.add("centered");
    }

    clear_timer()
    {
        if(this.timer != null)
        {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    hide()
    {
        this.clear_timer();
        this.container.classList.remove("show");
    }
}

// Call a callback on any click not inside a list of nodes.
//
// This is used to close dropdown menus.
class click_outside_listener
{
    constructor(node_list, callback)
    {
        this.window_onmousedown = this.window_onmousedown.bind(this);

        this.node_list = node_list;
        this.callback = callback;

        window.addEventListener("mousedown", this.window_onmousedown, true);
    }

    // Return true if node is below any node in node_list.
    is_node_in_list(node)
    {
        for(var ancestor of this.node_list)
        {
            if(helpers.is_above(ancestor, node))
                return true;
        }
        return false;
    }
    window_onmousedown(e)
    {
        // Close the popup if anything outside the dropdown is clicked.  Don't
        // prevent the click event, so the click still happens.
        //
        // If this is a click inside the box or our button, ignore it.
        if(this.is_node_in_list(e.target))
            return;

        this.callback();
    }

    shutdown()
    {
        window.removeEventListener("mousedown", this.window_onmousedown, true);
    }
}

// Show popup menus when a button is clicked.
class dropdown_menu_opener
{
    static create_handlers(container, selectors)
    {
        for(var selector of selectors)
        {
            var item = container.querySelector(selector);
            if(item == null)
            {
                console.warn("Couldn't find", selector);
                continue;
            }
            dropdown_menu_opener.create_handler(item);
        }
    }

    // A shortcut for creating an opener for our common button/popup layout.
    static create_handler(container)
    {
        var button = container.querySelector(".menu-button");
        var box = container.querySelector(".popup-menu-box");
        if(button == null)
        {
            console.error("Couldn't find menu button for " + container);
            return;
        }
        if(box == null)
        {
            console.error("Couldn't find menu box for " + container);
            return;
        }
        new dropdown_menu_opener(button, box);
    }

    constructor(button, box)
    {
        this.box_onclick = this.box_onclick.bind(this);

        this.button = button;
        this.box = box;

        this.visible = false;

        this.button.addEventListener("click", (e) => { this.button_onclick(e); });

        // Hide popups when any containing view is hidden.
        new view_hidden_listener(this.button, (e) => {
            this.visible = false;
        });
    }

    // The viewhidden event is sent when the enclosing view is no longer visible, and
    // all menus in it should be hidden.
    onviewhidden(e)
    {
        this.visible = false;
    }

    get visible()
    {
        return !this.box.hidden;
    }

    set visible(value)
    {
        if(this.box.hidden == !value)
            return;

        this.box.hidden = !value;
        helpers.set_class(this.box, "popup-visible", value);

        if(value)
        {
            this.listener = new click_outside_listener([this.button, this.box], () => {
                this.visible = false;
            });

            if(this.close_on_click_inside)
                this.box.addEventListener("click", this.box_onclick, true);
        }
        else
        {
            if(this.listener)
            {
                this.listener.shutdown();
                this.listener = null;
            }

            this.box.removeEventListener("click", this.box_onclick, true);
        }
    }

    // Return true if this popup should close when clicking inside it.  If false,
    // the menu will stay open until something else closes it.
    get close_on_click_inside()
    {
        return true;
    }

    box_onclick(e)
    {
        if(e.target.closest(".keep-menu-open"))
            return;

        this.visible = false;
    }

    // Toggle the popup when the button is clicked.
    button_onclick(e)
    {
        e.preventDefault();
        e.stopPropagation();
        this.visible = !this.visible;
    }
};

// A pointless creepy eye.  Looks away from the mouse cursor when hovering over
// the unfollow button.
class creepy_eye_widget
{
    constructor(eye)
    {
        this.onevent = this.onevent.bind(this);

        this.eye = eye;

        this.eye.addEventListener("mouseenter", this.onevent);
        this.eye.addEventListener("mouseleave", this.onevent);
        this.eye.addEventListener("mousemove", this.onevent);
        this.eye_middle = this.eye.querySelector(".middle");
    }

    onevent(e)
    {
        if(e.type == "mouseenter")
            this.hover = true;
        if(e.type == "mouseleave")
            this.hover = false;

        if(!this.hover)
        {
            this.eye_middle.style.transform = "";
            return;
        }
        var mouse = [e.pageX, e.pageY];

        var bounds = this.eye.getBoundingClientRect();
        var eye = [bounds.x + bounds.width/2, bounds.y + bounds.height/2];

        var vector_length = function(vec)
        {
            return Math.sqrt(vec[0]*vec[0] + vec[1]*vec[1]);
        }
        // Normalize to get a direction vector.
        var normalize_vector = function(vec)
        {
            var length = vector_length(vec);
            if(length < 0.0001)
                return [0,0];
            return [vec[0]/length, vec[1]/length];
        };

        var pos = [mouse[0] - eye[0], mouse[1] - eye[1]];
        pos = normalize_vector(pos);

        if(Math.abs(pos[0]) < 0.5)
        {
            var negative = pos[0] < 0;
            pos[0] = 0.5;
            if(negative)
                pos[0] *= -1;
        }
//        pos[0] = 1 - ((1-pos[0]) * (1-pos[0]));
        pos[0] *= -3;
        pos[1] *= -6;
        this.eye_middle.style.transform = "translate(" + pos[0] + "px, " + pos[1] + "px)";
    }
}

class avatar_widget
{
    // options:
    // parent: node to add ourself to (required)
    // changed_callback: called when a follow or unfollow completes
    // big: if true, show the big avatar instead of the small one
    constructor(options)
    {
        this.options = options;
        if(this.options.mode != "dropdown" && this.options.mode != "overlay")
            throw "Invalid avatar widget mode";

        this.clicked_follow = this.clicked_follow.bind(this);
        this.user_changed = this.user_changed.bind(this);

        this.root = helpers.create_from_template(".template-avatar");
        helpers.set_class(this.root, "big", this.options.big);

        image_data.singleton().user_modified_callbacks.register(this.user_changed);

        var element_author_avatar = this.root.querySelector(".avatar");

        this.img = document.createElement("img");

        // A canvas filter for the avatar.  This has no actual filters.  This is just to kill off any
        // annoying GIF animations in people's avatars.
        this.base_filter = new image_canvas_filter(this.img, element_author_avatar.querySelector("canvas.main"));

        // The actual highlight filter:
        this.highlight_filter = new image_canvas_filter(this.img, element_author_avatar.querySelector("canvas.highlight"), "brightness(150%)", (ctx, img) => {
            ctx.globalCompositeOperation = "destination-in";

            var feather = 25;
            var radius = 15;
            ctx.filter = "blur(" + feather + "px)";
            helpers.draw_round_rect(ctx, feather, feather + this.img.naturalHeight/2, this.img.naturalWidth - feather*2, this.img.naturalHeight - feather*2, radius);
            ctx.fill();
        });
        
        this.root.dataset.mode = this.options.mode;

        // Show the favorite UI when hovering over the avatar icon.
        var avatar_popup = this.root; //container.querySelector(".avatar-popup");
        if(this.options.mode == "dropdown")
        {
            avatar_popup.addEventListener("mouseover", function(e) { helpers.set_class(avatar_popup, "popup-visible", true); }.bind(this));
            avatar_popup.addEventListener("mouseout", function(e) { helpers.set_class(avatar_popup, "popup-visible", false); }.bind(this));
        }

        new creepy_eye_widget(this.root.querySelector(".unfollow-button .eye-image"));

        for(var button of avatar_popup.querySelectorAll(".follow-button.public"))
            button.addEventListener("click", this.clicked_follow.bind(this, false), false);
        for(var button of avatar_popup.querySelectorAll(".follow-button.private"))
            button.addEventListener("click", this.clicked_follow.bind(this, true), false);
        for(var button of avatar_popup.querySelectorAll(".unfollow-button"))
            button.addEventListener("click", this.clicked_follow.bind(this, true), false);
        this.element_follow_folder = avatar_popup.querySelector(".folder");

        // Follow publically when enter is pressed on the follow folder input.
        helpers.input_handler(avatar_popup.querySelector(".folder"), this.clicked_follow.bind(this, false));

        this.options.parent.appendChild(this.root);
    }

    shutdown()
    {
        image_data.singleton().user_modified_callbacks.unregister(this.user_changed);
    }

    // Refresh when the user changes.
    user_changed(user_id)
    {
        if(this.user_data == null || this.user_data.userId != user_id)
            return;

        this.set_from_user_data(this.user_data);
    }

    set_from_user_data(user_data)
    {
        // Clear the previous image.  Do this even if we're going to set it below, so we show
        // black while loading a new image rather than showing the previous image.
        this.base_filter.clear();
        this.highlight_filter.clear();

        this.user_data = user_data;
        if(this.user_data == null)
        {
            this.root.hidden = true;
            return;
        }
        this.root.hidden = false;

        helpers.set_class(this.root, "self", user_data.userId == global_data.user_id);

        // We can't tell if we're followed privately or not, only that we're following.
        helpers.set_class(this.root, "followed", this.user_data.isFollowed);

        this.root.querySelector(".avatar-link").href = "/member_illust.php?id=" + user_data.userId + "#ppixiv";
        this.root.querySelector(".avatar").dataset.popup = "View " + user_data.name + "'s posts";

        // Hide the popup in dropdown mode, since it covers the dropdown.
        if(this.options.mode == "dropdown")
            this.root.querySelector(".avatar").classList.remove("popup");

        // If we don't have an image because we're loaded from a source that doesn't give us them,
        // just hide the avatar image.
        var key = "imageBig";
        if(user_data[key])
            this.img.src = user_data[key];
    }
    
    async follow(follow_privately)
    {
        if(this.user_data == null)
            return;

        var tags = this.element_follow_folder.value;
        await actions.follow(this.user_data, follow_privately, tags);
    }

    async unfollow()
    {
        if(this.user_data == null)
            return;

        await actions.unfollow(this.user_data);
    }

    // Note that in some cases we'll only have the user's ID and name, so we won't be able
    // to tell if we're following.
    clicked_follow(follow_privately, e)
    {
        e.preventDefault();
        e.stopPropagation();

        if(this.user_data == null)
            return;

        if(this.user_data.isFollowed)
        {
            // Unfollow the user.
            this.unfollow();
            return;
        }

        // Follow the user.
        this.follow(follow_privately);
    }

    handle_onkeydown(e)
    {
        if(this.user_data == null)
            return;
        
        if(e.keyCode == 70) // f
        {
            // f to follow publically, F to follow privately, ^F to unfollow.
            e.stopPropagation();
            e.preventDefault();

            if(this.user_data == null)
                return;

            if(e.ctrlKey)
            {
                // Remove the bookmark.
                if(!this.user_data.isFollowed)
                {
                    message_widget.singleton.show("Not following this user");
                    return;
                }

                this.unfollow();
                return;
            }

            if(this.user_data.isFollowed)
            {
                message_widget.singleton.show("Already following (^F to unfollow)");
                return;
            }
            
            this.follow(e.shiftKey);
            return;
        }
    }
};

// A list of tags, with translations in popups where available.
class tag_widget
{
    // options:
    // parent: node to add ourself to (required)
    // format_link: a function to format a tag to a URL
    constructor(options)
    {
        this.options = options;
        this.container = this.options.parent;
        this.tag_list_container = this.options.parent.appendChild(document.createElement("div"));
        this.tag_list_container.classList.add("tag-list-widget");
    };

    format_tag_link(tag)
    {
        if(this.options.format_link)
            return this.options.format_link(tag);

        var search_url = new URL("/search.php", window.location.href);
        search_url.search = "s_mode=s_tag_full&word=" + tag.tag;
        search_url.hash = "#ppixiv";
        return search_url.toString();
    };

    set(tags)
    {
        // Remove any old tag list and create a new one.
        helpers.remove_elements(this.tag_list_container);

        var tags = tags.tags;
        for(var tag of tags)
        {
            var a = this.tag_list_container.appendChild(document.createElement("a"));
            a.classList.add("tag");
            a.classList.add("box-link");

            // They really can't decide how to store tag translations:
            var popup = null;
            if(tag.translation && tag.translation.en)
                popup = tag.translation.en;
            else if(tag.romaji != null && tag.romaji != "")
                popup = tag.romaji;
            else if(tag.tag_translation != null & tag.tag_translation != "")
                popup = tag.tag_translation;

            var tag_text = tag.tag;

            if(popup && false)
            {
                var swap = tag_text;
                tag_text = popup;
                popup = swap;
            }

            if(popup)
            {
                a.classList.add("popup");
                a.classList.add("popup-bottom");
                a.dataset.popup = popup;
            }

            a.dataset.tag = tag_text;
            a.dataset.translatedTag = popup;

            a.textContent = tag_text;

            a.href = this.format_tag_link(tag);
        }

    }
};

// A helper for a simple right-click context menu.
//
// The menu opens on right click and closes when the button is released.
class popup_context_menu
{
    constructor(container)
    {
        this.onmousedown = this.onmousedown.bind(this);
        this.onmouseup = this.onmouseup.bind(this);
        this.oncontextmenu = this.oncontextmenu.catch_bind(this);
        this.onmouseover = this.onmouseover.bind(this);
        this.onmouseout = this.onmouseout.bind(this);

        this.container = container;

        this.container.addEventListener("mousedown", this.onmousedown);

        // Create the menu.  The caller will attach event listeners for clicks.
        this.menu = helpers.create_from_template(".template-context-menu");

        // Work around glitchiness in Chrome's click behavior (if we're in Chrome).
        new fix_chrome_clicks(this.menu);

        this.menu.addEventListener("mouseover", this.onmouseover, true);
        this.menu.addEventListener("mouseout", this.onmouseout, true);

        // Whether the left and right mouse buttons are pressed:
        this.buttons_down = [false, false, false];
    }

    context_menu_enabled_for_element(element)
    {
        while(element != null && element instanceof Element)
        {
            if(element.dataset.contextMenuTarget == "off")
                return false;

            if("contextMenuTarget" in element.dataset)
                return true;

            element = element.parentNode;
        }
        return false;
    }

    // This is only registered when we actually want to be blocking the context menu.
    oncontextmenu(e)
    {
        e.preventDefault();
        e.stopPropagation();
    }

    onmousedown(e)
    {
        if(this.displayed_menu == null && !this.context_menu_enabled_for_element(e.target))
            return;
        
        if(this.displayed_menu == null && e.button != 2)
            return;

        this.buttons_down[e.button] = true;
        if(e.button != 2)
            return;

        // If invert-popup-hotkey is true, hold shift to open the popup menu.  Otherwise,
        // hold shift to suppress the popup menu so the browser context menu will open.
        //
        // Firefox doesn't cancel the context menu if shift is pressed.  This seems like a
        // well-intentioned but deeply confused attempt to let people override pages that
        // block the context menu, making it impossible for us to let you choose context
        // menu behavior and probably making it impossible for games to have sane keyboard
        // behavior at all.
        this.shift_was_pressed = e.shiftKey;
        if(navigator.userAgent.indexOf("Firefox/") == -1 && helpers.get_value("invert-popup-hotkey"))
            this.shift_was_pressed = !this.shift_was_pressed;
        if(this.shift_was_pressed)
            return;

        e.preventDefault();
        e.stopPropagation();

        this.show(e.pageX, e.pageY, e.target);
    }

    // Releasing the left or right mouse button hides the menu if both the left
    // and right buttons are released.  Pressing right, then left, then releasing
    // right won't close the menu until left is also released.  This prevents lost
    // inputs when quickly right-left clicking.
    onmouseup(e)
    {
        this.buttons_down[e.button] = false;
        if(!this.buttons_down[0] && !this.buttons_down[2])
        {
            // Run the hide asynchronously.  If we close it immediately and this
            // release would have triggered a click event, the click won't happen.
            setTimeout(this.hide.bind(this), 0);
        }
    }

    // Return the element that should be under the cursor when the menu is opened.
    get element_to_center()
    {
        return null;
    }
    get visible()
    {
        return this.displayed_menu != null;
    }
    show(x, y, target)
    {
        this.menu.hidden = false;

        if(this.displayed_menu != null)
            return;

        this.start_preventing_context_menu();

        this.displayed_menu = this.menu;
        this.container.appendChild(this.displayed_menu);

        // Disable popup UI while a context menu is open.
        document.body.classList.add("hide-ui");
        
        window.addEventListener("mouseup", this.onmouseup);

        var centered_element = this.element_to_center;
        if(centered_element == null)
            centered_element = this.displayed_menu;
        var pos = helpers.get_relative_pos(centered_element, this.displayed_menu);
        x -= pos[0];
        y -= pos[1];
        x -= centered_element.offsetWidth / 2;
        y -= centered_element.offsetHeight * 3 / 4;
        this.displayed_menu.style.left = x + "px";
        this.displayed_menu.style.top = y + "px";

        hide_mouse_cursor_on_idle.disable_all();
    }

    // If element is within a button that has a tooltip set, show it.
    show_tooltip_for_element(element)
    {
        if(element != null)
            element = element.closest("[data-popup]");
        
        if(this.tooltip_element == element)
            return;

        this.tooltip_element = element;
        this.refresh_tooltip();

        if(this.tooltip_observer)
        {
            this.tooltip_observer.disconnect();
            this.tooltip_observer = null;
        }

        if(this.tooltip_element == null)
            return;

        // Refresh the tooltip if the popup attribute changes while it's visible.
        this.tooltip_observer = new MutationObserver((mutations) => {
            for(var mutation of mutations) {
                if(mutation.type == "attributes")
                {
                    if(mutation.attributeName == "data-popup")
                        this.refresh_tooltip();
                }
            }
        });
        
        this.tooltip_observer.observe(this.tooltip_element, { attributes: true });
    }

    refresh_tooltip()
    {
        var element = this.tooltip_element;
        if(element != null)
            element = element.closest("[data-popup]");
        this.menu.querySelector(".tooltip-display").hidden = element == null;
        if(element != null)
            this.menu.querySelector(".tooltip-display-text").textContent = element.dataset.popup;
    }

    onmouseover(e)
    {
        this.show_tooltip_for_element(e.target);
    }

    onmouseout(e)
    {
        this.show_tooltip_for_element(e.relatedTarget);
    }

    get hide_temporarily()
    {
        return this.menu.hidden;
    }

    set hide_temporarily(value)
    {
        this.menu.hidden = value;
    }

    hide()
    {
        if(this.displayed_menu == null)
            return;

        // Let menus inside the context menu know we're closing.
        view_hidden_listener.send_viewhidden(this.menu);
        
        this.stop_preventing_context_menu_after_delay();
        
        this.displayed_menu.parentNode.removeChild(this.displayed_menu);
        this.displayed_menu = null;
        hide_mouse_cursor_on_idle.enable_all();
        this.buttons_down = [false, false, false];
        document.body.classList.remove("hide-ui");
        window.removeEventListener("mouseup", this.onmouseup);
    }

    shutdown()
    {
        this.hide();

        // Remove any mutation observer.
        this.show_tooltip_for_element(null);

        this.container.removeEventListener("mousedown", this.onmousedown);
        this.container.removeEventListener("click", this.onclick);
        this.stop_preventing_context_menu();
    }

    // Work around bad Firefox oncontextmenu behavior (seen in 62).  In Chrome and older
    // versions of Firefox, contextmenu is always sent to the same element as mousedown,
    // even if you move the mouse before releasing the button.  Current versions of Firefox
    // send contextmenu to the element the mouse is over at the time of the mouse release.
    // This makes it impossible to tell what element was clicked on in the first place.
    // That's bad, since you want to be able to prevent the context menu if you did something
    // else with the right mouse button, like our popup menus.
    //
    // Work around this by temporarily blocking all contextmenu events in the document
    // after our popup closes.  That blocks the context menu regardless of which element
    // it goes to.  This is brief enough that it won't interfere with other real context
    // menus.
    cancel_stop_preventing_context_menu_after_delay()
    {
        if(this.timer == null)
            return;

        clearTimeout(this.timer);
        this.timer = null;
    }

    stop_preventing_context_menu_after_delay()
    {
        this.cancel_stop_preventing_context_menu_after_delay();

        this.timer = setTimeout(function() {
            this.timer = null;
            this.stop_preventing_context_menu();
        }.bind(this), 100);
    }

    start_preventing_context_menu()
    {
        this.cancel_stop_preventing_context_menu_after_delay();

        if(this.preventing_context_menu)
            return;

        this.preventing_context_menu = true;
        window.addEventListener("contextmenu", this.oncontextmenu);
    }

    stop_preventing_context_menu()
    {
        if(!this.preventing_context_menu)
            return;

        this.preventing_context_menu = false;
        window.removeEventListener("contextmenu", this.oncontextmenu);
    }
}

// A popup for inputting text.
//
// This is currently special purpose for the add tag prompt.
class text_prompt
{
    constructor()
    {
        this.submit = this.submit.bind(this);
        this.close = this.close.bind(this);
        this.onkeydown = this.onkeydown.bind(this);

        this.result = new Promise((completed, cancelled) => {
            this._completed = completed;
            this._cancelled = cancelled;
        });

        this.root = helpers.create_from_template(".template-add-tag-prompt");
        document.body.appendChild(this.root);
        this.input = this.root.querySelector("input.add-tag-input");
        this.input.value = "";
        this.input.focus();

        this.root.querySelector(".close-button").addEventListener("click", this.close);
        this.root.querySelector(".submit-button").addEventListener("click", this.submit);

        this.root.addEventListener("click", (e) => {
            // Clicks that aren't inside the box close the dialog.
            if(e.target.closest(".box") != null)
                return;

            e.preventDefault();
            e.stopPropagation();
            this.close();
        });

        window.addEventListener("keydown", this.onkeydown);

        // This disables global key handling and hotkeys.
        document.body.dataset.popupOpen = "1";
    }

    onkeydown(e)
    {
        if(e.key == "Escape")
        {
            e.preventDefault();
            e.stopPropagation();

            this.close();
        }

        if(e.key == "Enter")
        {
            e.preventDefault();
            e.stopPropagation();
            this.submit();
        }
    }

    // Close the popup and call the completion callback with the result.
    submit(e)
    {
        var result = this.input.value;
        console.log("submit", result);
        this._remove();

        this._completed(result);
    }

    close()
    {
        this._remove();

        // Cancel the promise.  If we're actually submitting a result, 
        this._cancelled("Cancelled by user");
    }

    _remove()
    {
        window.removeEventListener("keydown", this.onkeydown);

        delete document.body.dataset.popupOpen;
        this.root.remove();
    }

}

// Widget for editing bookmark tags.
class bookmark_tag_list_widget extends illust_widget
{
    constructor(container)
    {
        super(container);

        this.container.hidden = true;

        this.container.appendChild(helpers.create_from_template(".template-popup-bookmark-tag-dropdown"));

        this.container.addEventListener("click", this.clicked_bookmark_tag.bind(this), true);

        this.container.querySelector(".add-tag").addEventListener("click", (e) => {
            this.add_new_tag();
        });

        this.container.querySelector(".sync-tags").addEventListener("click", async (e) => {
            var bookmark_tags = await actions.load_recent_bookmark_tags();
            console.log("refreshed", bookmark_tags);
            helpers.set_recent_bookmark_tags(bookmark_tags);
        });

        // Close if our containing widget is closed.
        new view_hidden_listener(this.container, (e) => {
            this.visible = false;
        });

        image_data.singleton().illust_modified_callbacks.register(this.refresh.bind(this));
        settings.register_change_callback("recent-bookmark-tags", this.refresh.bind(this));
    }

    // Return an array of tags selected in the tag dropdown.
    get selected_tags()
    {
        var tag_list = [];
        var bookmark_tags = this.container;
        for(var entry of bookmark_tags.querySelectorAll(".popup-bookmark-tag-entry"))
        {
            if(!entry.classList.contains("active"))
                continue;
            tag_list.push(entry.dataset.tag);
        }
        return tag_list;
    }

    get visible()
    {
        return !this.container.hidden;
    }
    
    // Why can't setters be async?
    set visible(value) { this._set_tag_dropdown_visible(value); }

    // Hide the dropdown without committing anything.  This happens if a bookmark
    // button is pressed to remove a bookmark: if we just close the dropdown normally,
    // we'd readd the bookmark.
    hide_without_sync()
    {
        this._set_tag_dropdown_visible(false, true);
    }

    async _set_tag_dropdown_visible(value, skip_save)
    {
        if(this.container.hidden == !value)
            return;

        this.container.hidden = !value;

        if(value)
        {
            // We only load existing bookmark tags when the tag list is open, so refresh.
            await this.refresh();
        }
        else
        {
            if(!skip_save)
            {
                // Save any selected tags when the dropdown is closed.
                this.save_current_tags();
            }

            // Clear the tag list when the menu closes, so it's clean on the next refresh.
            var bookmark_tags = this.container.querySelector(".tag-list");
            helpers.remove_elements(bookmark_tags);
        }
    }

    async refresh_internal(illust_data)
    {
        // Store which tags were selected, before we clear the list.
        var old_selected_tags = this.selected_tags;

        var bookmark_tags = this.container.querySelector(".tag-list");
        helpers.remove_elements(bookmark_tags);

        var bookmarked = illust_data && illust_data.bookmarkData != null;
        var public_bookmark = illust_data && illust_data.bookmarkData && !illust_data.bookmarkData.private;
        var private_bookmark = illust_data && illust_data.bookmarkData && illust_data.bookmarkData.private;

        // Make sure the dropdown is hidden if we have no image.
        if(illust_data == null)
            this.visible = false;

        if(illust_data == null || !this.visible)
            return;

        // Create a temporary entry to show loading while we load bookmark details.
        var entry = document.createElement("span");
        bookmark_tags.appendChild(entry);
        entry.innerText = "Loading...";

        // If the tag list is open, populate bookmark details to get bookmark tags.
        // If the image isn't bookmarked this won't do anything.
        await image_data.singleton().load_bookmark_details(illust_data);

        // Remove elements again, in case another refresh happened while we were async
        // and to remove the loading entry.
        helpers.remove_elements(bookmark_tags);
        
        // Put tags that are set on the bookmark first in alphabetical order, followed by
        // all other tags in order of recent use.
        var active_tags = illust_data.bookmarkData? Array.from(illust_data.bookmarkData.tags):[];

        // If we're refreshing the list while it's open, make sure that any tags the user
        // selected are still in the list, even if they were removed by the refresh.  Put
        // them in active_tags, so they'll be marked as active.
        for(var tag of old_selected_tags)
        {
            if(active_tags.indexOf(tag) == -1)
                active_tags.push(tag);
        }

        var shown_tags = Array.from(active_tags); // copy
        shown_tags.sort();

        var recent_bookmark_tags = Array.from(helpers.get_recent_bookmark_tags()); // copy
        for(var tag of recent_bookmark_tags)
            if(shown_tags.indexOf(tag) == -1)
                shown_tags.push(tag);

        console.log("Showing tags:", shown_tags);

        for(var i = 0; i < shown_tags.length; ++i)
        {
            var tag = shown_tags[i];
            var entry = helpers.create_from_template(".template-popup-bookmark-tag-entry");
            entry.dataset.tag = tag;
            bookmark_tags.appendChild(entry);
            entry.querySelector(".tag-name").innerText = tag;

            var active = active_tags.indexOf(tag) != -1;
            helpers.set_class(entry, "active", active);
        }
    }

    // Save the selected bookmark tags to the current illust.
    async save_current_tags()
    {
        if(this._illust_id == null)
            return;

        // Read new_tags before going async, since our caller will clear the list.
        var new_tags = this.selected_tags;

        // Get the tags currently on the bookmark to compare.
        var illust_data = await image_data.singleton().get_image_info(this._illust_id);
        await image_data.singleton().load_bookmark_details(illust_data);
        var old_tags = illust_data.bookmarkData? illust_data.bookmarkData.tags:[];

        var equal = new_tags.length == old_tags.length;
        for(var tag of new_tags)
        {
            if(old_tags.indexOf(tag) == -1)
                equal = false;
        }
        // If the selected tags haven't changed, we're done.
        if(equal)
            return;
        
        // Save the tags.  If the image wasn't bookmarked, this will create a public bookmark.
        console.log("Tag list closing and tags have changed");
        console.log("Old tags:", old_tags);
        console.log("New tags:", new_tags);
        var is_bookmarked = illust_data.bookmarkData != null;

        await actions.bookmark_edit(illust_data, {
            tags: new_tags,
        });
    }

    // Show a prompt to enter tags, so the user can add tags that aren't already in the
    // list.  Add the bookmarks to recents, and bookmark the image with the entered tags.
    async add_new_tag()
    {
        var illust_id = this._illust_id;
        var illust_data = await image_data.singleton().get_image_info(this._illust_id);

        console.log("Show tag prompt");

        // Hide the popup when we show the prompt.
        this.hide_temporarily = true;

        var prompt = new text_prompt();
        try {
            var tags = await prompt.result;
        } catch {
            // The user cancelled the prompt.
            return;
        }

        // Split the new tags.
        var tags = tags.split(" ");
        tags = tags.filter((value) => { return value != ""; });
        console.log("New tags:", tags);

        // This should already be loaded, since the only way to open this prompt is
        // in the tag dropdown.
        await image_data.singleton().load_bookmark_details(illust_data);

        // Add each tag the user entered to the tag list to update it.
        var active_tags = illust_data.bookmarkData? Array.from(illust_data.bookmarkData.tags):[];

        for(var tag of tags)
        {
            if(active_tags.indexOf(tag) != -1)
                continue;

            // Add this tag to recents.  bookmark_edit will add recents too, but this makes sure
            // that we add all explicitly entered tags to recents, since bookmark_edit will only
            // add tags that are new to the image.
            helpers.update_recent_bookmark_tags([tag]);
            active_tags.push(tag);
        }
        console.log("All tags:", active_tags);
        
        // Edit the bookmark.
        await actions.bookmark_edit(illust_data, {
            tags: active_tags,
        });
    }

    // Toggle tags on click.  We don't save changes until we're closed.
    async clicked_bookmark_tag(e)
    {
        var a = e.target.closest(".popup-bookmark-tag-entry");
        if(a == null)
            return;

        e.preventDefault();
        e.stopPropagation();

        // Toggle this tag.  Don't actually save it immediately, so if we make multiple
        // changes we don't spam requests.
        var tag = a.dataset.tag;
        helpers.set_class(a, "active", !a.classList.contains("active"));
    }
}

// The button that shows and hides the tag list.
class toggle_bookmark_tag_list_widget extends illust_widget
{
    constructor(container, bookmark_tag_widget)
    {
        super(container);

        this.bookmark_tag_widget = bookmark_tag_widget;

        // XXX
        // this.menu.querySelector(".tag-dropdown-arrow").hidden = !value;

        this.container.addEventListener("click", (e) => {
            e.preventDefault();

            // Ignore clicks if this button isn't enabled.
            if(!this.container.classList.contains("enabled"))
                return;
            
            this.bookmark_tag_widget.visible = !this.bookmark_tag_widget.visible;
        });
    }

    async refresh_internal(illust_data)
    {
        helpers.set_class(this.container, "enabled", illust_data != null);
    }
}

class bookmark_button_widget extends illust_widget
{
    constructor(container, private_bookmark, bookmark_tag_widget)
    {
        super(container);

        this.private_bookmark = private_bookmark;
        this.bookmark_tag_widget = bookmark_tag_widget;

        this.container.addEventListener("click", this.clicked_bookmark.bind(this));

        image_data.singleton().illust_modified_callbacks.register(this.refresh.bind(this));
    }

    async refresh_internal(illust_data)
    {
        var count = this.container.querySelector(".count");
        if(count)
            count.textContent = illust_data? illust_data.bookmarkCount:"---";

        var bookmarked = illust_data && illust_data.bookmarkData != null;
        var our_bookmark_type = illust_data && illust_data.bookmarkData && illust_data.bookmarkData.private == this.private_bookmark;

        // Set up the bookmark buttons.
        helpers.set_class(this.container,  "enabled",     illust_data != null);
        helpers.set_class(this.container,  "bookmarked",  our_bookmark_type);
        helpers.set_class(this.container,  "will-delete", our_bookmark_type);
        
        // Set the tooltip.
        var type_string = this.private_bookmark? "private":"public";
        this.container.dataset.popup =
            illust_data == null? "":
            !bookmarked? (this.private_bookmark? "Bookmark privately":"Bookmark image"):
            our_bookmark_type? "Remove bookmark":
            "Change bookmark to " + type_string;
    }
    
    // Clicked one of the top-level bookmark buttons or the tag list.
    async clicked_bookmark(e)
    {
        // See if this is a click on a bookmark button.
        var a = e.target.closest(".button-bookmark");
        if(a == null)
            return;

        e.preventDefault();
        e.stopPropagation();

        // If the tag list dropdown is open, make a list of tags selected in the tag list dropdown.
        // If it's closed, leave tag_list null so we don't modify the tag list.
        var tag_list = null;
        if(this.bookmark_tag_widget && this.bookmark_tag_widget.visible)
            tag_list = this.bookmark_tag_widget.selected_tags;

        // If we have a tag list dropdown, close it before saving the bookmark.
        //
        // When the tag list bookmark closes, it'll save the bookmark with its current tags
        // if they're different, creating the bookmark if needed.  If we leave it open when
        // we save, it's possible to click the private bookmark button in the context menu,
        // then release the right mouse button to close the context menu before the bookmark
        // finishes saving.  The tag list won't know that the bookmark is already being saved
        // and will save.  This can cause private bookmarks to become public bookmarks.  Just
        // tell the tag list to close without saving, since we're committing the tag list now.
        if(this.bookmark_tag_widget)
            this.bookmark_tag_widget.hide_without_sync();

        // If the image is bookmarked and the same privacy button was clicked, remove the bookmark.
        var illust_data = await image_data.singleton().get_image_info(this._illust_id);
        if(illust_data.bookmarkData && illust_data.bookmarkData.private == this.private_bookmark)
        {
            await actions.bookmark_remove(illust_data);

            // If the current image changed while we were async, stop.
            if(this._illust_id != illust_data.illustId)
                return;
            
            // Hide the tag dropdown after unbookmarking, without saving any tags in the
            // dropdown (that would readd the bookmark).
            if(this.bookmark_tag_widget)
                this.bookmark_tag_widget.hide_without_sync();
            
            return;
        }

        // Add or edit the bookmark.
        await actions.bookmark_edit(illust_data, {
            private: this.private_bookmark,
            tags: tag_list,
        });

        // If the current image changed while we were async, stop.
        if(this._illust_id != illust_data.illustId)
            return;
    }
}

class like_button_widget extends illust_widget
{
    constructor(container, private_bookmark)
    {
        super(container);

        this.private_bookmark = private_bookmark;

        this.container.addEventListener("click", this.clicked_like.bind(this));

        image_data.singleton().illust_modified_callbacks.register(this.refresh.bind(this));
    }

    async refresh_internal(illust_data)
    {
        // Update the like button highlight and tooltip.
        this.container.querySelector(".count").textContent = illust_data? illust_data.likeCount:"---";
        helpers.set_class(this.container, "liked", illust_data && illust_data.likeData);
        helpers.set_class(this.container, "enabled", illust_data != null && !illust_data.likeData);

        this.container.dataset.popup =
            illust_data && !illust_data.likeData? "Like image":
            illust_data && illust_data.likeData? "Already liked image":"";
    }
    
    async clicked_like(e)
    {
        e.preventDefault();
        e.stopPropagation();

        var illust_data = await image_data.singleton().get_image_info(this._illust_id);
        actions.like_image(illust_data);
    }
}

// Simple menu settings widgets.
class menu_option
{
    constructor(container, options)
    {
        this.refresh = this.refresh.bind(this);

        this.container = container;
        this.options = options;

        settings.register_change_callback(this.options.setting, this.refresh);
    }

    get value()
    {
        return settings.get(this.options.setting);
    }

    set value(value)
    {
        settings.set(this.options.setting, value);
    }

    refresh()
    {
        if(this.options.onchange)
            this.options.onchange();
    }            
}

class menu_option_toggle extends menu_option
{
    constructor(container, options)
    {
        super(container, options);

        this.onclick = this.onclick.bind(this);

        this.item = helpers.create_from_template(".template-menu-toggle");
        this.container.appendChild(this.item);
        this.item.addEventListener("click", this.onclick);
        this.item.querySelector(".label").innerText = options.label;

        this.refresh();
    }

    refresh()
    {
        super.refresh();

        var value = this.value;
        if(this.options.invert_display)
            value = !value;
        
        this.item.querySelector(".on").hidden = !value;
        this.item.querySelector(".off").hidden = value;
    }

    onclick(e)
    {
        e.preventDefault();
        e.stopPropagation();

        this.value = !this.value;
    }
}

// A special case for the theme, which is just a light/dark toggle but stored
// as a string.
class menu_option_toggle_light_theme extends menu_option_toggle
{
    get value()
    {
        var value = super.value;
        return value == "light";
    }

    set value(value)
    {
        super.value = value? "light":"dark";
    }
}

class menu_option_slider extends menu_option
{
    constructor(container, options)
    {
        super(container, options);

        this.oninput = this.oninput.bind(this);

        this.item = helpers.create_from_template(".template-menu-slider");
        this.item.addEventListener("input", this.oninput);
        this.item.querySelector(".label").innerText = options.label;

        this.slider = this.item.querySelector("input");
        this.slider.min = this.options.min;
        this.slider.max = this.options.max;
        this.container.appendChild(this.item);
    }
    
    refresh()
    {
        this._slider_value = this.value;
        super.refresh();
    }

    oninput(e)
    {
        this.value = this._slider_value;
    }

    get value()
    {
        return parseInt(super.value);
    }
    
    set value(value)
    {
        super.value = value;
    }

    set _slider_value(value)
    {
        if(this.slider.value == value)
            return;

        this.slider.value = value;
    }

    get _slider_value()
    {
        return parseInt(this.slider.value);
    }
}


// A widget to control the thumbnail size slider.
class thumbnail_size_slider_widget extends menu_option_slider
{
    constructor(container, options)
    {
        super(container, options);

        this.onwheel = this.onwheel.bind(this);
        this.onkeydown = this.onkeydown.bind(this);

        var view = this.container.closest(".view");
        view.addEventListener("wheel", this.onwheel);
        view.addEventListener("keydown", this.onkeydown);

        this.refresh();
    }

    get min_value() { return this.options.min; }
    get max_value() { return this.options.max; }

    onkeydown(e)
    {
        var zoom = helpers.is_zoom_hotkey(e);
        if(zoom != null)
        {
            e.preventDefault();
            e.stopImmediatePropagation();
            this.move(zoom < 0);
        }
    }

    onwheel(e)
    {
        if(!e.ctrlKey)
            return;

        e.preventDefault();
        e.stopImmediatePropagation();

        this.move(e.deltaY > 0);
    }

    // Increase or decrease zoom.
    move(down)
    {
        var value = this._slider_value;
        value += down?-1:+1;
        value = helpers.clamp(value, 0, 5);
        this._slider_value = value;
        this.value = this._slider_value;
    }

    get value()
    {
        var value = super.value;
        if(typeof(value) != "number" || isNaN(value))
            value = 4;
        return value;
    }
    
    set value(value)
    {
        super.value = value;
    }

    get thumbnail_size()
    {
        var width = 100 * Math.pow(1.3, this.slider.value);
        return width;
    }
};


// A global right-click popup menu.
//
// This is only active when right clicking over items with the context-menu-target
// class.
//
// Not all items are available all the time.  This is a singleton class, so it's easy
// for different parts of the UI to tell us when they're active.
//
// This also handles alt-mousewheel zooming.
class context_menu_image_info_widget extends illust_widget
{
    context_menu_image_info_widget(container)
    {
        this.container = container;
    }

    set_illust_and_page(illust_id, page)
    {
        if(this._illust_id == illust_id && this._page == page)
            return;

        console.log("set xxx", illust_id, page);
        this._illust_id = illust_id;
        this._page = page;
        this.refresh();
    }

    refresh_internal(illust_data)
    {
        this.container.hidden = (illust_data == null || this._page == null);
        if(this.container.hidden)
            return;

        var set_info = (query, text) =>
        {
            var node = this.container.querySelector(query);
            node.innerText = text;
            node.hidden = text == "";
        };
        
        // Add the page count for manga.
        var page_text = "";
        if(illust_data.pageCount > 1)
            page_text = "Page " + (this._page+1) + "/" + illust_data.pageCount;
        set_info(".page-count", page_text);

        var info = "";
        var page_info = illust_data.mangaPages[this._page];
        info += page_info.width + "x" + page_info.height;
        set_info(".image-info", info);
    }
}

class main_context_menu extends popup_context_menu
{
    // Return the singleton.
    static get get()
    {
        return main_context_menu._singleton;
    }

    constructor(container)
    {
        super(container);

        if(main_context_menu._singleton != null)
            throw "Singleton already exists";
        main_context_menu._singleton = this;

        this.onwheel = this.onwheel.bind(this);
        this.onkeydown = this.onkeydown.bind(this);

        this._on_click_viewer = null;
        this._page = 0;

        // Refresh the menu when the view changes.
        this.mode_observer = new MutationObserver(function(mutationsList, observer) {
            for(var mutation of mutationsList) {
                if(mutation.type == "attributes")
                {
                    if(mutation.attributeName == "data-current-view")
                        this.refresh();
                }
            }
        }.bind(this));

        this.mode_observer.observe(document.body, {
            attributes: true, childList: false, subtree: false
        });

        this.menu.querySelector(".button-return-to-search").addEventListener("click", this.clicked_return_to_search.bind(this));
        this.menu.querySelector(".button-fullscreen").addEventListener("click", this.clicked_fullscreen.bind(this));
        this.menu.querySelector(".button-zoom").addEventListener("click", this.clicked_zoom_toggle.bind(this));
        window.addEventListener("wheel", this.onwheel, true);
        window.addEventListener("keydown", this.onkeydown);

        for(var button of this.menu.querySelectorAll(".button-zoom-level"))
            button.addEventListener("click", this.clicked_zoom_level.bind(this));

        this.bookmark_tag_widget = new bookmark_tag_list_widget(this.menu.querySelector(".popup-bookmark-tag-dropdown-container"));
        this.toggle_tag_widget = new toggle_bookmark_tag_list_widget(this.menu.querySelector(".button-bookmark-tags"), this.bookmark_tag_widget);
        this.like_button = new like_button_widget(this.menu.querySelector(".button-like"));
        this.image_info_widget = new context_menu_image_info_widget(this.menu.querySelector(".context-menu-image-info"));

        this.avatar_widget = new avatar_widget({
            parent: this.menu.querySelector(".avatar-widget-container"),
            mode: "overlay",
        });

        // The bookmark buttons, and clicks in the tag dropdown:
        this.bookmark_buttons = [];
        for(var a of this.menu.querySelectorAll(".button-bookmark"))
            this.bookmark_buttons.push(new bookmark_button_widget(a, a.classList.contains("private"), this.bookmark_tag_widget));

        this.element_bookmark_tag_list = this.menu.querySelector(".bookmark-tag-list");

        this.refresh();
    }

    // Return the illust ID active in the context menu, or null if none.
    //
    // If we're opened by right clicking on an illust, we'll show that image's
    // info.  Otherwise, we'll show the info for the illust we're on, if any.
    get effective_illust_id()
    {
        if(this._clicked_illust_info != null)
            return this._clicked_illust_info.illustId;
        else
            return this._illust_id;
    }

    get effective_page()
    {
        if(this._clicked_page != null)
            return this._clicked_page;
        else
            return this._page;
    }
    
    // When the effective illust ID changes, let our widgets know.
    _effective_illust_id_changed()
    {
        // If we're not visible, don't refresh until we are, so we don't trigger
        // data loads.
        if(!this.visible)
            return;

        var illust_id = this.effective_illust_id;

        this.like_button.illust_id = illust_id;
        this.bookmark_tag_widget.illust_id = illust_id;
        this.toggle_tag_widget.illust_id = illust_id;
        for(var button of this.bookmark_buttons)
            button.illust_id = illust_id;

        this.image_info_widget.set_illust_and_page(this.effective_illust_id, this.effective_page);
    }

    set illust_id(value)
    {
        if(this._illust_id == value)
            return;

        this._illust_id = value;
        this._effective_illust_id_changed();
    }

    set page(value)
    {
        if(this._page == value)
            return;

        this._page = value;
        this._effective_illust_id_changed();
    }
    
    shutdown()
    {
        this.mode_observer.disconnect();
        window.removeEventListener("wheel", this.onwheel, true);
        super.shutdown();
    }

    // Set the current viewer, or null if none.  If set, we'll activate zoom controls.
    get on_click_viewer()
    {
        return this._on_click_viewer;
    }
    set on_click_viewer(viewer)
    {
        this._on_click_viewer = viewer;
        this.refresh();
    }

    // Set the related user currently being viewed, or null if none.
    get user_info()
    {
        return this._user_info;
    }
    set user_info(user_info)
    {
        if(this._user_info == user_info)
            return;
        this._user_info = user_info;

        this.refresh();
    }

    // Put the zoom toggle button under the cursor, so right-left click is a quick way
    // to toggle zoom lock.
    get element_to_center()
    {
        return this.displayed_menu.querySelector(".button-zoom");
    }
        
    get _is_zoom_ui_enabled()
    {
        var view = document.body.dataset.currentView;
        return view == "illust" && this._on_click_viewer != null;
    }

    set_data_source(data_source)
    {
        if(this.data_source == data_source)
            return;

        this.data_source = data_source;
        this.refresh();
    }

    onkeydown(e)
    {
        if(this._is_zoom_ui_enabled)
        {
            var zoom = helpers.is_zoom_hotkey(e);
            if(zoom != null)
            {
                e.preventDefault();
                e.stopImmediatePropagation();
                this.handle_zoom_event(e, zoom < 0);
            }
        }
    }

    onwheel(e)
    {
        // Stop if zooming isn't enabled.
        if(!this._is_zoom_ui_enabled)
            return;

        // Only mousewheel zoom if control is pressed, or if the popup menu is visible.
        if(!e.ctrlKey && !this.visible)
            return;

        // We want to override almost all mousewheel events while the popup menu is open, but
        // don't override scrolling the popup menu's tag list.
        if(e.target.closest(".popup-bookmark-tag-dropdown"))
            return;

        e.preventDefault();
        e.stopImmediatePropagation();
        
        var down = e.deltaY > 0;
        this.handle_zoom_event(e, down);
    }
    
    // Handle both mousewheel and control-+/- zooming.
    handle_zoom_event(e, down)
    {
        e.preventDefault();
        e.stopImmediatePropagation();

        if(!this.hide_temporarily)
        {
            // Hide the poopup menu.  It remains open, so hide() will still be called when
            // the right mouse button is released and the overall flow remains unchanged, but
            // the popup itself will be hidden.
            this.hide_temporarily = true;
        }

        // If e is a keyboard event, use null to use the center of the screen.
        var keyboard = e instanceof KeyboardEvent;
        var pageX = keyboard? null:e.pageX;
        var pageY = keyboard? null:e.pageY;
        let center = this._on_click_viewer.get_image_position([pageX, pageY]);
        
        // If mousewheel zooming is used while not zoomed, turn on zooming and set
        // a 1x zoom factor, so we zoom relative to the previously unzoomed image.
        if(!this._on_click_viewer.zoom_active)
        {
            this._on_click_viewer.zoom_level = 4; // level 4 is 1x
            this._on_click_viewer.locked_zoom = true;
            this._on_click_viewer.relative_zoom_level = 0;
            this.refresh();
        }

        this._on_click_viewer.relative_zoom_level += down? -1:+1;

        // As a special case, if we're in 1x zoom from above and we return to 1x relative zoom
        // (eg. the user mousewheeled up and then back down), switch to another zoom mode.
        // Otherwise, if you zoom up and then back down, the zoom level is left at 1x, so click
        // zooming seems to be broken.  We don't know what the old zoom setting was to restore it,
        // so we just switch to fill zoom.
        if(this._on_click_viewer.relative_zoom_level == 0 && this._on_click_viewer.zoom_level == 4)
        {
            this._on_click_viewer.zoom_level = 0;
            this._on_click_viewer.locked_zoom = false;
        }

        this._on_click_viewer.set_image_position([pageX, pageY], center);
        this.refresh();
    }

    show(x, y, target)
    {
        // If RMB is pressed while dragging LMB, stop dragging the window when we
        // show the popup.
        if(this.on_click_viewer != null)
            this.on_click_viewer.stop_dragging();

        // See if an element representing a user and/or an illust was under the cursor.
        if(target != null)
        {
            var user_target = target.closest("[data-user-id]");
            if(user_target != null)
                this._set_temporary_user(user_target.dataset.userId);

            var illust_target = target.closest("[data-illust-id]");
            if(illust_target != null)
                this._set_temporary_illust(illust_target.dataset.illustId, illust_target.dataset.pageIdx);
        }

        super.show(x, y, target);

        // Make sure we're up to date if we deferred an update while hidden.
        this._effective_illust_id_changed();
    }

    // Set an alternative illust ID to show.  This is effective until the context menu is hidden.
    async _set_temporary_illust(illust_id, page)
    {
        // If this object is null or changed, we know we've been hidden since we
        // started this request.
        var show_sentinel = this.load_illust_sentinel = new Object();

        // Read illust info to see if we're following the user.
        console.log("get", illust_id);
        var illust_info = await image_data.singleton().get_image_info(illust_id);

        // If the popup was closed while we were waiting, ignore the results.
        if(show_sentinel != this.load_illust_sentinel)
            return;
        this.load_illust_sentinel = null;

        if(page != null)
            page = parseInt(page);

        this._clicked_illust_info = illust_info;
        this._clicked_page = page;
        this._effective_illust_id_changed();
    }

    // Set an alternative user ID to show.  This is effective until the context menu is hidden.
    async _set_temporary_user(user_id)
    {
        // Clear the avatar widget while we load user info, so we don't show the previous
        // user's avatar while the new avatar loads.
        this.avatar_widget.set_from_user_data(null);
        
        // If this object is null or changed, we know we've been hidden since we
        // started this request.
        var show_sentinel = this.load_user_sentinel = new Object();

        // Read user info to see if we're following the user.
        var user_info = await image_data.singleton().get_user_info(user_id);

        // If the popup was closed while we were waiting, ignore the results.
        if(show_sentinel != this.load_user_sentinel)
            return;
        this.load_user_sentinel = null;

        this._clicked_user_info = user_info;
        this.refresh();
    }

    hide()
    {
        this.load_illust_sentinel = null;
        this.load_user_sentinel = null;
        this._clicked_user_info = null;
        this._clicked_illust_info = null;
        this._clicked_page = null;

        // Even though we're hiding, update widgets so they don't show the last image's
        // bookmark count, etc. the next time we're displayed.
        this._effective_illust_id_changed();

        super.hide();
    }
    
    // Update selection highlight for the context menu.
    refresh()
    {
        var view = document.body.dataset.currentView;

        // Update the tooltip for the thumbnail toggle button.
        var navigate_out_label = main_controller.singleton.navigate_out_label;
        var title = navigate_out_label != null? ("Return to " + navigate_out_label):"";
        this.menu.querySelector(".button-return-to-search").dataset.popup = title;
        helpers.set_class(this.menu.querySelector(".button-return-to-search"), "enabled", navigate_out_label != null);
        this.refresh_tooltip();

        // Enable the zoom buttons if we're in the image view and we have an on_click_viewer.
        for(var element of this.menu.querySelectorAll(".zoom-strip .button"))
            helpers.set_class(element, "enabled", this._is_zoom_ui_enabled);

        // Set the avatar button.
        this.avatar_widget.set_from_user_data(this._clicked_user_info || this._user_info);

        if(this._is_zoom_ui_enabled)
        {
            helpers.set_class(this.menu.querySelector(".button-zoom"), "selected", this._on_click_viewer.locked_zoom);

            var zoom_level = this._on_click_viewer.zoom_level;
            for(var button of this.menu.querySelectorAll(".button-zoom-level"))
                helpers.set_class(button, "selected", parseInt(button.dataset.level) == zoom_level);
        }
    }

    clicked_return_to_search(e)
    {
        main_controller.singleton.navigate_out();
    }

    clicked_fullscreen(e)
    {
        if(!document.fullscreenElement)
            document.documentElement.requestFullscreen();
        else
            document.exitFullscreen(); 
    }

    clicked_zoom_toggle(e)
    {
        if(!this._is_zoom_ui_enabled)
            return;
        
        let center = this._on_click_viewer.get_image_position([e.pageX, e.pageY]);
        this._on_click_viewer.locked_zoom = !this._on_click_viewer.locked_zoom;
        this._on_click_viewer.set_image_position([e.pageX, e.pageY], center);

        this.refresh();
    }

    clicked_zoom_level(e)
    {
        if(!this._is_zoom_ui_enabled)
            return;

        var level = parseInt(e.currentTarget.dataset.level);

        // If the zoom level that's already selected is clicked and we're already zoomed,
        // just toggle zoom as if the toggle zoom button was pressed.
        if(this._on_click_viewer.zoom_level == level && this._on_click_viewer.relative_zoom_level == 0 && this._on_click_viewer.locked_zoom)
        {
            this.on_click_viewer.locked_zoom = false;
            this.refresh();
            return;
        }


        let center = this._on_click_viewer.get_image_position([e.pageX, e.pageY]);
        
        // Each zoom button enables zoom lock, since otherwise changing the zoom level would
        // only have an effect when click-dragging, so it looks like the buttons don't do anything.
        this._on_click_viewer.zoom_level = level;
        this._on_click_viewer.locked_zoom = true;
        this._on_click_viewer.relative_zoom_level = 0;

        this._on_click_viewer.set_image_position([e.pageX, e.pageY], center);
        
        this.refresh();
    }
}


// Create an uncompressed ZIP from a list of files and filenames.
create_zip = function(filenames, files)
{
    if(filenames.length != files.length)
        throw "Mismatched array lengths";

    // Encode the filenames.
    var filename_blobs = [];
    for(var i = 0; i < filenames.length; ++i)
    {
        var filename = new Blob([filenames[i]]);
        filename_blobs.push(filename);
    }

    // Make CRC32s, and create blobs for each file.
    var blobs = [];
    var crc32s = [];
    for(var i = 0; i < filenames.length; ++i)
    {
        var data = files[i];
        var crc = crc32(new Int8Array(data));
        crc32s.push(crc);
        blobs.push(new Blob([data]));
    }

    var parts = [];
    var file_pos = 0;
    var file_offsets = [];
    for(var i = 0; i < filenames.length; ++i)
    {
        var filename = filename_blobs[i];
        var data = blobs[i];
        var crc = crc32s[i];

        // Remember the position of the local file header for this file.
        file_offsets.push(file_pos);

        var local_file_header = this.create_local_file_header(filename, data, crc);
        parts.push(local_file_header);
        file_pos += local_file_header.size;

        // Add the data.
        parts.push(data);
        file_pos += data.size;
    }

    // Create the central directory.
    var central_directory_pos = file_pos;
    var central_directory_size = 0;
    for(var i = 0; i < filenames.length; ++i)
    {
        var filename = filename_blobs[i];
        var data = blobs[i];
        var crc = crc32s[i];

        var file_offset = file_offsets[i];
        var central_record = this.create_central_directory_entry(filename, data, file_offset, crc);
        central_directory_size += central_record.size;
        parts.push(central_record);
    }

    var end_central_record = this.create_end_central(filenames.length, central_directory_pos, central_directory_size);
    parts.push(end_central_record);
    return new Blob(parts, {
        "type": "application/zip",
    });
};

create_zip.prototype.create_local_file_header = function(filename, file, crc)
{
    var data = struct("<IHHHHHIIIHH").pack(
        0x04034b50, // local file header signature
        10, // version needed to extract
        0, // general purpose bit flag
        0, // compression method
        0, // last mod file time
        0, // last mod file date
        crc, // crc-32
        file.size, // compressed size
        file.size, // uncompressed size
        filename.size, // file name length
        0 // extra field length
    );

    return new Blob([data, filename]);
};

create_zip.prototype.create_central_directory_entry = function(filename, file, file_offset, crc)
{
    var data = struct("<IHHHHHHIIIHHHHHII").pack(
        0x02014b50, // central file header signature
        10, // version made by
        10, // version needed to extract
        0, // general purpose bit flag
        0, // compression method
        0, // last mod file time
        0, // last mod file date
        crc,
        file.size, // compressed size
        file.size, // uncompressed size
        filename.size, // file name length
        0, // extra field length
        0, // file comment length
        0, // disk number start
        0, // internal file attributes
        0, // external file attributes
        file_offset // relative offset of local header
    );

    return new Blob([data, filename]);
}

create_zip.prototype.create_end_central = function(num_files, central_directory_pos, central_directory_size)
{
    var data = struct("<IHHHHIIH").pack(
        0x06054b50, // end of central dir signature
        0, // number of this disk
        0, // number of the disk with the start of the central directory
        num_files, // total number of entries in the central directory on this disk
        num_files, // total number of entries in the central directory
        central_directory_size, // size of the central directory
        central_directory_pos, // offset of start of central directory with respect to the starting disk number
        0 // .ZIP file comment length
    );
    return new Blob([data]);
} 
// A list of illustration IDs by page.
//
// Store the list of illustration IDs returned from a search, eg. bookmark.php?p=3,
// and allow looking up the next or previous ID for an illustration.  If we don't have
// data for the next or previous illustration, return the page that should be loaded
// to make it available.
//
// We can have gaps in the pages we've loaded, due to history navigation.  If you load
// page 1, then jump to page 3, we'll figure out that to get the illustration before the
// first one on page 3, we need to load page 2.
//
// One edge case is when the underlying search changes while we're viewing it.  For example,
// if we're viewing page 2 with ids [1,2,3,4,5], and when we load page 3 it has ids
// [5,6,7,8,9], that usually means new entries were added to the start since we started.
// We don't want the same ID to occur twice, so we'll detect if this happens, and clear
// all other pages.  That way, we'll reload the previous pages with the updated data if
// we navigate back to them.
class illust_id_list
{
    constructor()
    {
        this.illust_ids_by_page = {};
    };

    get_all_illust_ids()
    {
        // Make a list of all IDs we already have.
        var all_ids = [];
        for(var page of Object.keys(this.illust_ids_by_page))
        {
            var ids = this.illust_ids_by_page[page];
            all_ids = all_ids.concat(ids);
        }
        return all_ids;
    }

    get_highest_loaded_page()
    {
        var max_page = 1;
        for(var page of Object.keys(this.illust_ids_by_page))
            max_page = Math.max(max_page, page);
        return max_page;
    }

    // Add a page of results.
    //
    // If the page cache has been invalidated, return false.  This happens if we think the
    // results have changed too much for us to reconcile it.
    add_page(page, illust_ids)
    {
        if(this.illust_ids_by_page[page] != null)
        {
            console.warn("Page", page, "was already loaded");
            return true;
        }

        // Make a list of all IDs we already have.
        var all_illusts = this.get_all_illust_ids();

        // Special case: If there are any entries in this page which are also in the previous page,
        // just remove them from this page.
        //
        // For fast-moving pages like new_illust.php, we'll very often get a few entries at the
        // start of page 2 that were at the end of page 1 when we requested it, because new posts
        // have been added to page 1 that we haven't seen.  If we don't handle this, we'll clear
        // the page cache below on almost every page navigation.  Instead, we just remove the
        // duplicate IDs and end up with a slightly shorter page 2.
        var previous_page_illust_ids = this.illust_ids_by_page[page-1];
        if(previous_page_illust_ids)
        {
            var ids_to_remove = [];
            for(var new_id of illust_ids)
            {
                if(previous_page_illust_ids.indexOf(new_id) != -1)
                    ids_to_remove.push(new_id);
            }

            if(ids_to_remove.length > 0)
                console.log("Removing duplicate illustration IDs:", ids_to_remove.join(", "));
            illust_ids = illust_ids.slice();
            for(var new_id of ids_to_remove)
            {
                var idx = illust_ids.indexOf(new_id);
                illust_ids.splice(idx, 1);
            }
        }

        // If there's nothing on this page, don't add it, so this doesn't increase
        // get_highest_loaded_page().
        // FIXME: If we removed everything, the data source will appear to have reached the last
        // page and we won't load any more pages, since thumbnail_view assumes that a page not
        // returning any data means we're at the end.
        if(illust_ids.length == 0)
            return true;

        // See if we already have any IDs in illust_ids.
        var duplicated_id = false;
        for(var new_id of illust_ids)
        {
            if(all_illusts.indexOf(new_id) != -1)
            {
                duplicated_id = true;
                break;
            }
        }

        var result = true;
        if(duplicated_id)
        {
            console.info("Page", page, "duplicates an illustration ID.  Clearing page cache.");
            this.illust_ids_by_page = {};

            // Return false to let the caller know we've done this, and that it should clear
            // any page caches.
            result = false;
        }

        this.illust_ids_by_page[page] = illust_ids;
        return result;
    };

    // Return the page number illust_id is on, or null if we don't know.
    get_page_for_illust(illust_id)
    {
        for(var page of Object.keys(this.illust_ids_by_page))
        {
            var ids = this.illust_ids_by_page[page];
            page = parseInt(page);
            if(ids.indexOf(illust_id) != -1)
                return page;
        };
        return null;
    };

    // Return the next or previous illustration.  If we don't have that page, return null.
    get_neighboring_illust_id(illust_id, next)
    {
        var page = this.get_page_for_illust(illust_id);
        if(page == null)
            return null;

        var ids = this.illust_ids_by_page[page];
        var idx = ids.indexOf(illust_id);
        var new_idx = idx + (next? +1:-1);
        if(new_idx < 0)
        {
            // Return the last illustration on the previous page, or null if that page isn't loaded.
            var prev_page_no = page - 1;
            var prev_page_illust_ids = this.illust_ids_by_page[prev_page_no];
            if(prev_page_illust_ids == null)
                return null;
            return prev_page_illust_ids[prev_page_illust_ids.length-1];
        }
        else if(new_idx >= ids.length)
        {
            // Return the first illustration on the next page, or null if that page isn't loaded.
            var next_page_no = page + 1;
            var next_page_illust_ids = this.illust_ids_by_page[next_page_no];
            if(next_page_illust_ids == null)
                return null;
            return next_page_illust_ids[0];
        }
        else
        {
            return ids[new_idx];
        }
    };

    // Return the page we need to load to get the next or previous illustration.  This only
    // makes sense if get_neighboring_illust returns null.
    get_page_for_neighboring_illust(illust_id, next)
    {
        var page = this.get_page_for_illust(illust_id);
        if(page == null)
            return null;

        var ids = this.illust_ids_by_page[page];
        var idx = ids.indexOf(illust_id);
        var new_idx = idx + (next? +1:-1);
        if(new_idx >= 0 && new_idx < ids.length)
            return page;

        page += next? +1:-1;
        return page;
    };

    // Return the first ID, or null if we don't have any.
    get_first_id()
    {
        var keys = Object.keys(this.illust_ids_by_page);
        if(keys.length == 0)
            return null;

        var page = keys[0];
        return this.illust_ids_by_page[page][0];
    }

    // Return true if the given page is loaded.
    is_page_loaded(page)
    {
        return this.illust_ids_by_page[page] != null;
    }
};

// A data source asynchronously loads illust_ids to show.  The callback will be called
// with:
// {
//     'illust': {
//         illust_id1: illust_data1,
//         illust_id2: illust_data2,
//         ...
//     },
//     illust_ids: [illust_id1, illust_id2, ...]
//     next: function,
// }
//
// Some sources can retrieve user data, some can retrieve only illustration data, and
// some can't retrieve anything but IDs.
//
// The callback will always be called asynchronously, and data_source.callback can be set
// after creation.
//
// If "next" is included, it's a function that can be called to create a new data source
// to load the next page of data.  If there are no more pages, next will be null.

// A data source handles a particular source of images, depending on what page we're
// on:
//
// - Retrieves batches of image IDs to display, eg. a single page of bookmark results
// - Load another page of results with load_more()
// - Updates the page URL to reflect the current image
//
// Not all data sources have multiple pages.  For example, when we're viewing a regular
// illustration page, we get all of the author's other illust IDs at once, so we just
// load all of them as a single page.
class data_source
{
    constructor(url)
    {
        this.url = new URL(url);
        this.id_list = new illust_id_list();
        this.update_callbacks = [];
        this.loading_pages = {};
        this.first_empty_page = -1;
        this.update_callbacks = [];
    };

    // If a data source returns a name, we'll display any .data-source-specific elements in
    // the thumbnail view with that name.
    get name() { return null; }
    
    // Return a canonical URL for this data source.  If the canonical URL is the same,
    // the same instance of the data source should be used.
    //
    // A single data source is used eg. for a particular search and search flags.  If
    // flags are changed, such as changing filters, a new data source instance is created.
    // However, some parts of the URL don't cause a new data source to be used.  Return
    // a URL with all unrelated parts removed, and with query and hash parameters sorted
    // alphabetically.
    //
    // Due to some quirkiness in data_source_current_illust, this is async.
    static async get_canonical_url(url)
    {
        // Make a copy of the URL.
        var url = new URL(url);
        this.remove_ignored_url_parts(url);

        // Sort query parameters.  We don't use multiple parameters with the same key.
        url.search = helpers.sort_query_parameters(url.searchParams).toString();

        // Sort hash parameters.
        var new_hash = helpers.sort_query_parameters(helpers.get_hash_args(url));
        helpers.set_hash_args(url, new_hash);        
        
        return url.toString();
    }

    // This is overridden by subclasses to remove parts of the URL that don't affect
    // which data source instance is used.
    static remove_ignored_url_parts(url)
    {
        // If p=1 is in the query, it's the page number, which doesn't affect the data source.
        url.searchParams.delete("p");

        var hash_args = helpers.get_hash_args(url);

        // #x=1 is a workaround for iframe loading.
        hash_args.delete("x");

        // The manga page doesn't affect the data source.
        hash_args.delete("page");

        // #view=thumbs controls which view is active.
        hash_args.delete("view");

        // illust_id in the hash is always just telling us which image within the current
        // data source to view.  data_source_current_illust is different and is handled in
        // the subclass.
        hash_args.delete("illust_id");

        // Any illust_id in the search or the hash doesn't require a new data source.
        // bluh
        // but the user underneath it does

        helpers.set_hash_args(url, hash_args);        
    }

    // startup() is called when the data source becomes active, and shutdown is called when
    // it's done.  This can be used to add and remove event handlers on the UI.
    startup() 
    {
        this.active = true;
    }

    shutdown()
    {
        this.active = false;
    }

    // Load the given page, or the page of the current history state if page is null.
    // Call callback when the load finishes.
    //
    // If we synchronously know that the page doesn't exist, return false and don't
    // call callback.  Otherwise, return true.
    load_page(page)
    {
        var result = this.loading_pages[page];
        if(result == null)
        {
            console.log("started loading page", page);
            var result = this._load_page_async(page);
            this.loading_pages[page] = result;
            result.finally(() => {
            console.log("finished loading page", page);
                delete this.loading_pages[page];
            });
        }

        return result;
    }

    async _load_page_async(page)
    {
        // Check if we're trying to load backwards too far.
        if(page < 1)
        {
            console.info("No pages before page 1");
            return false;
        }

        // If we know there's no data on this page (eg. we loaded an earlier page before and it
        // was empty), don't try to load this one.  This prevents us from spamming empty page
        // requests.
        if(this.first_empty_page != -1 && page >= this.first_empty_page)
        {
            console.info("No pages after", this.first_empty_page);
            return false;
        }

        // If the page is already loaded, stop.
        if(this.id_list.is_page_loaded(page))
            return true;
        
        // Check if this is past the end.
        if(!this.load_page_available(page))
            return false;
        
        // Start the actual load.
        var result = await this.load_page_internal(page);

        // If there were no results, then we've loaded the last page.  Don't try to load
        // any pages beyond this.
        if(this.id_list.illust_ids_by_page[page] == null)
        {
            console.log("No data on page", page);
            if(this.first_empty_page == -1 || page < this.first_empty_page)
                this.first_empty_page = page;
        };

        return true;
    }

    // Return the illust_id to display by default.
    //
    // This should only be called after the initial data is loaded.
    get_current_illust_id()
    {
        // If we have an explicit illust_id in the hash, use it.  Note that some pages (in
        // particular illustration pages) put this in the query, which is handled in the particular
        // data source.
        var hash_args = helpers.get_hash_args(document.location);
        if(hash_args.has("illust_id"))
            return hash_args.get("illust_id");
        
        return this.id_list.get_first_id();
    };

    // Return the page title to use.
    get page_title()
    {
        return "Pixiv";
    }

    // This is implemented by the subclass.
    async load_page_internal(page)
    {
        throw "Not implemented";
    }

    // Return true if page is an available page (not past the end).
    //
    // We'll always stop if we read a page and it's empty.  This allows the extra
    // last request to be avoided if we know the last page earlier.
    load_page_available(page)
    {
        return true;
    }

    // This is called when the currently displayed illust_id changes.  The illust_id should
    // always have been loaded by this data source, so it should be in id_list.  The data
    // source should update the history state to reflect the current state.
    set_current_illust_id(illust_id, query_args, hash_args)
    {
        // By default, put the illust_id in the hash.
        hash_args.set("illust_id", illust_id);
    }

    // Return the estimated number of items per page.  This is used to pad the thumbnail
    // list to reduce items moving around when we load pages.
    get estimated_items_per_page()
    {
        return 10;
    };

    // Return the view that should be displayed by default, if no "view" field is in the URL.
    get default_view()
    {
        return "search";
    }

    // If we're viewing a page specific to a user (an illustration or artist page), return
    // the user ID we're viewing.  This can change when refreshing the UI.
    get viewing_user_id()
    {
        return null;
    };

    // Add or remove an update listener.  These are called when the data source has new data,
    // or wants a UI refresh to happen.
    add_update_listener(callback)
    {
        this.update_callbacks.push(callback);
    }

    remove_update_listener(callback)
    {
        var idx = this.update_callbacks.indexOf(callback);
        if(idx != -1)
            this.update_callbacks.splice(idx);
    }

    // Register a page of data.
    add_page(page, illust_ids)
    {
        var result = this.id_list.add_page(page, illust_ids);

        // Call update listeners asynchronously to let them know we have more data.
        setTimeout(function() {
            this.call_update_listeners();
        }.bind(this), 0);
        return result;
    }

    call_update_listeners()
    {
        var callbacks = this.update_callbacks.slice();
        for(var callback of callbacks)
        {
            try {
                callback();
            } catch(e) {
                console.error(e);
            }
        }
    }

    // Refresh parts of the UI that are specific to this data source.  This is only called
    // when first activating a data source, to update things like input fields that shouldn't
    // be overwritten on each refresh.
    initial_refresh_thumbnail_ui(container, view) { }

    // Each data source can have a different UI in the thumbnail view.  container is
    // the thumbnail-ui-box container to refresh.
    refresh_thumbnail_ui(container, view) { }

    // A helper for setting up UI links.  Find the link with the given data-type,
    // set all {key: value} entries as query parameters, and remove any query parameters
    // where value is null.  Set .selected if the resulting URL matches the current one.
    //
    // If default_values is present, it tells us the default key that will be used if
    // a key isn't present.  For example, search.php?s_mode=s_tag is the same as omitting
    // s_mode.  We prefer to omit it rather than clutter the URL with defaults, but we
    // need to know this to figure out whether an item is selected or not.
    //
    // If a key begins with #, it's placed in the hash rather than the query.
    set_item(container, type, fields, default_values)
    {
        var link = container.querySelector("[data-type='" + type + "']");
        if(link == null)
        {
            console.warn("Couldn't find button with selector", type);
            return;
        }

        // This button is selected if all of the keys it sets are present in the URL.
        var button_is_selected = true;

        // Adjust the URL for this button.
        var url = new URL(document.location);
        var hash_args = helpers.get_hash_args(url);
        for(var key of Object.keys(fields))
        {
            var original_key = key;
            var value = fields[key];

            // If key begins with "#", it means it goes in the hash.
            var hash = key.startsWith("#");
            if(hash)
                key = key.substr(1);

            var params = hash? hash_args:url.searchParams;

            // The value we're setting in the URL:
            var this_value = value;
            if(this_value == null && default_values != null)
                this_value = default_values[original_key];

            // The value currently in the URL:
            var selected_value = params.get(key);
            if(selected_value == null && default_values != null)
                selected_value = default_values[original_key];

            // If the URL didn't have the key we're setting, then it isn't selected.
            if(this_value != selected_value)
                button_is_selected = false;

            // If the value we're setting is the default, delete it instead.
            if(default_values != null && this_value == default_values[original_key])
                value = null;

            if(value != null)
                params.set(key, value);
            else
                params.delete(key);
        }
        helpers.set_hash_args(url, hash_args);

        helpers.set_class(link, "selected", button_is_selected);

        link.href = url.toString();
    };

    // Highlight search menu popups if any entry other than the default in them is
    // selected.
    //
    // selector_list is a list of selectors for each menu item.  If any of them are
    // selected and don't have the data-default attribute, set .active on the popup.
    // Search filters 
    // Set the active class on all top-level dropdowns which have something other than
    // the default selected.
    set_active_popup_highlight(container, selector_list)
    {
        for(var popup of selector_list)
        {
            var box = container.querySelector(popup);
            var selected_item = box.querySelector(".selected");
            if(selected_item == null)
            {
                // There's no selected item.  If there's no default item then this is normal, but if
                // there's a default item, it should have been selected by default, so this is probably
                // a bug.
                var default_entry_exists = box.querySelector("[data-default]") != null;
                if(default_entry_exists)
                    console.warn("Popup", popup, "has no selection");
                continue;
            }

            var selected_default = selected_item.dataset["default"];
            helpers.set_class(box, "active", !selected_default);
        }
    }

    // Return true of the thumbnail view should show bookmark icons for this source.
    get show_bookmark_icons()
    {
        return true;
    }
};

// Load a list of illust IDs, and allow retriving them by page.
function paginate_illust_ids(illust_ids, items_per_page)
{
    // Paginate the big list of results.
    var pages = [];
    var page = null;
    for(var illust_id of illust_ids)
    {
        if(page == null)
        {
            page = [];
            pages.push(page);
        }
        page.push(illust_id);
        if(page.length == items_per_page)
            page = null;
    }
    return pages;
}

// This extends data_source with local pagination.
//
// A few API calls just return all results as a big list of IDs.  We can handle loading
// them all at once, but it results in a very long scroll box, which makes scrolling
// awkward.  This artificially paginates the results.
class data_source_fake_pagination extends data_source
{
    get estimated_items_per_page() { return 30; }

    async load_page_internal(page)
    {
        if(this.pages == null)
        {
            var illust_ids = await this.load_all_results();
            this.pages = paginate_illust_ids(illust_ids, this.estimated_items_per_page);
        }

        // Register this page.
        var illust_ids = this.pages[page-1] || [];
        this.add_page(page, illust_ids);
    }

    // Implemented by the subclass.  Load all results, and return the resulting IDs.
    async load_all_results()
    {
        throw "Not implemented";
    }
}

// /discovery
//
// This is an actual API call for once, so we don't need to scrape HTML.  We only show
// recommended works (we don't have a user view list).
//
// The API call returns 1000 entries.  We don't do pagination, we just show the 1000 entries
// and then stop.  I haven't checked to see if the API supports returning further pages.
class data_source_discovery extends data_source_fake_pagination
{
    get name() { return "discovery"; }

    // Implement data_source_fake_pagination:
    async load_all_results()
    {
        // Get "mode" from the URL.  If it's not present, use "all".
        var query_args = this.url.searchParams;
        var mode = query_args.get("mode") || "all";
        
        var data = {
            type: "illust",
            sample_illusts: "auto",
            num_recommendations: 1000,
            page: "discovery",
            mode: mode,
        };

        var result = await helpers.get_request("/rpc/recommender.php", data);

        // Unlike other APIs, this one returns IDs as ints rather than strings.  Convert back
        // to strings.
        var illust_ids = [];
        for(var illust_id of result.recommendations)
            illust_ids.push(illust_id + "");

        return illust_ids;
    };

    get page_title() { return "Discovery"; }
    get_displaying_text() { return "Recommended Works"; }

    refresh_thumbnail_ui(container)
    {
        // Set .selected on the current mode.
        var current_mode = new URL(document.location).searchParams.get("mode") || "all";
        helpers.set_class(container.querySelector(".box-link[data-type=all]"), "selected", current_mode == "all");
        helpers.set_class(container.querySelector(".box-link[data-type=safe]"), "selected", current_mode == "safe");
        helpers.set_class(container.querySelector(".box-link[data-type=r18]"), "selected", current_mode == "r18");
    }
}


// bookmark_detail.php
//
// We use this as an anchor page for viewing recommended illusts for an image, since
// there's no dedicated page for this.
//
// This returns a big chunk of results in one call, so we use data_source_fake_pagination
// to break it up.
class data_source_related_illusts extends data_source_fake_pagination
{
    get name() { return "related-illusts"; }
   
    async _load_page_async(page)
    {
        // The first time we load a page, get info about the source illustration too, so
        // we can show it in the UI.
        if(!this.fetched_illust_info)
        {
            this.fetched_illust_info = true;

            // Don't wait for this to finish before continuing.
            var query_args = this.url.searchParams;
            var illust_id = query_args.get("illust_id");
            image_data.singleton().get_image_info(illust_id).then((illust_info) => {
                this.illust_info = illust_info;
                this.call_update_listeners();
            }).catch((e) => {
                console.error(e);
            });
        }

        return await super._load_page_async(page);
    }
     
    // Implement data_source_fake_pagination:
    async load_all_results()
    {
        var query_args = this.url.searchParams;
        var illust_id = query_args.get("illust_id");

        var data = {
            type: "illust",
            sample_illusts: illust_id,
            num_recommendations: 1000,
        };

        var result = await helpers.get_request("/rpc/recommender.php", data);

        // Unlike other APIs, this one returns IDs as ints rather than strings.  Convert back
        // to strings.
        var illust_ids = [];
        for(var illust_id of result.recommendations)
            illust_ids.push(illust_id + "");

        return illust_ids;
    };

    get page_title() { return "Similar Illusts"; }
    get_displaying_text() { return "Similar Illustrations"; }

    refresh_thumbnail_ui(container)
    {
        // Set the source image.
        var source_link = container.querySelector(".image-for-suggestions");
        source_link.hidden = this.illust_info == null;
        if(this.illust_info)
        {
            source_link.href = "/member_illust.php?mode=medium&illust_id=" + this.illust_info.illustId + "#ppixiv";

            var img = source_link.querySelector(".image-for-suggestions > img");
            img.src = this.illust_info.urls.thumb;
        }
    }
}

// /ranking.php
//
// This one has an API, and also formats the first page of results into the page.
// They have completely different formats, and the page is updated dynamically (unlike
// the pages we scrape), so we ignore the page for this one and just use the API.
//
// An exception is that we load the previous and next days from the page.  This is better
// than using our current date, since it makes sure we have the same view of time as
// the search results.
class data_source_rankings extends data_source
{
    constructor(url)
    {
        super(url);

        this.max_page = 999999;
    }
    
    get name() { return "rankings"; }

    load_page_available(page)
    {
        return page <= this.max_page;
    }

    async load_page_internal(page)
    {

        /*
        "mode": "daily",
        "content": "all",
        "page": 1,
        "prev": false,
        "next": 2,
        "date": "20180923",
        "prev_date": "20180922",
        "next_date": false,
        "rank_total": 500        
        */

        // Get "mode" from the URL.  If it's not present, use "all".
        var query_args = this.url.searchParams;
        
        var data = {
            format: "json",
            p: page,
        };

        var date = query_args.get("date");
        if(date)
            data.date = date;

        var content = query_args.get("content");
        if(content)
            data.content = content;

        var mode = query_args.get("mode");
        if(mode)
            data.mode = mode;

        var result = await helpers.get_request("/ranking.php", data);

        // If "next" is false, this is the last page.
        if(!result.next)
            this.max_page = Math.min(page, this.max_page);

        // Fill in the next/prev dates for the navigation buttons, and the currently
        // displayed date.
        if(this.today_text == null)
        {
            this.today_text = result.date;

            // This is "YYYYMMDD".  Reformat it.
            if(this.today_text.length == 8)
            {
                var year = this.today_text.slice(0,4);
                var month = this.today_text.slice(4,6);
                var day = this.today_text.slice(6,8);
                this.today_text = year + "/" + month + "/" + day;
            }
        }

        if(this.prev_date == null && result.prev_date)
            this.prev_date = result.prev_date;
        if(this.next_date == null && result.next_date)
            this.next_date = result.next_date;
    
        // This returns a struct of data that's like the thumbnails data response,
        // but it's not quite the same.
        var illust_ids = [];
        for(var item of result.contents)
        {
            // Most APIs return IDs as strings, but this one returns them as ints.
            // Convert them to strings.
            var illust_id = "" + item.illust_id;
            var user_id = "" + item.user_id;
            illust_ids.push(illust_id);
        }

        // Register this as thumbnail data.
        thumbnail_data.singleton().loaded_thumbnail_info(result.contents, "rankings");
        
        // Register the new page of data.
        this.add_page(page, illust_ids);
    };

    get estimated_items_per_page() { return 50; }

    get page_title() { return "Rankings"; }
    get_displaying_text() { return "Rankings"; }

    refresh_thumbnail_ui(container)
    {
        var query_args = this.url.searchParams;
        
        this.set_item(container, "content-all", {content: null});
        this.set_item(container, "content-illust", {content: "illust"});
        this.set_item(container, "content-ugoira", {content: "ugoira"});
        this.set_item(container, "content-manga", {content: "manga"});

        this.set_item(container, "mode-daily", {mode: null}, {mode: "daily"});
        this.set_item(container, "mode-daily-r18", {mode: "daily_r18"});
        this.set_item(container, "mode-r18g", {mode: "r18g"});
        this.set_item(container, "mode-weekly", {mode: "weekly"});
        this.set_item(container, "mode-monthly", {mode: "monthly"});
        this.set_item(container, "mode-rookie", {mode: "rookie"});
        this.set_item(container, "mode-male", {mode: "male"});
        this.set_item(container, "mode-female", {mode: "female"});

        if(this.today_text)
            container.querySelector(".nav-today").innerText = this.today_text;

        // This UI is greyed rather than hidden before we have the dates, so the UI doesn't
        // shift around as we load.
        var yesterday = container.querySelector(".nav-yesterday");
        helpers.set_class(yesterday.querySelector(".box-link"), "disabled", this.prev_date == null);
        if(this.prev_date)
        {
            var url = new URL(window.location);
            url.searchParams.set("date", this.prev_date);
            yesterday.querySelector("a").href = url;
        }

        var tomorrow = container.querySelector(".nav-tomorrow");
        helpers.set_class(tomorrow.querySelector(".box-link"), "disabled", this.next_date == null);
        if(this.next_date)
        {
            var url = new URL(window.location);
            url.searchParams.set("date", this.next_date);
            tomorrow.querySelector("a").href = url;
        }

        // Not all combinations of content and mode exist.  For example, there's no ugoira
        // monthly, and we'll get an error page if we load it.  Hide navigations that aren't
        // available.  This isn't perfect: if you want to choose ugoira when you're on monthly
        // you need to select a different time range first.  We could have the content links
        // switch to daily if not available...
        var available_combinations = [
            "all/daily",
            "all/daily_r18",
            "all/r18g",
            "all/weekly",
            "all/monthly",
            "all/rookie",
            "all/male",
            "all/female",

            "illust/daily",
            "illust/daily_r18",
            "illust/r18g",
            "illust/weekly",
            "illust/monthly",
            "illust/rookie",

            "ugoira/daily",
            "ugoira/weekly",
            "ugoira/daily_r18",

            "manga/daily",
            "manga/daily_r18",
            "manga/r18g",
            "manga/weekly",
            "manga/monthly",
            "manga/rookie",
        ];

        // Check each link in both checked-links sections.
        for(var a of container.querySelectorAll(".checked-links a"))
        {
            var url = new URL(a.href, document.location);
            var link_content = url.searchParams.get("content") || "all";
            var link_mode = url.searchParams.get("mode") || "daily";
            var name = link_content + "/" + link_mode;

            var available = available_combinations.indexOf(name) != -1;

            var is_content_link = a.dataset.type.startsWith("content");
            if(is_content_link)
            {
                // If this is a content link (eg. illustrations) and the combination of the
                // current time range and this content type isn't available, make this link
                // go to daily rather than hiding it, so all content types are always available
                // and you don't have to switch time ranges just to select a different type.
                if(!available)
                {
                    url.searchParams.delete("mode");
                    a.href = url;
                }
            }
            else
            {
                // If this is a mode link (eg. weekly) and it's not available, just hide
                // the link.
                a.hidden = !available;
            }
        }
    }
}

// This is a base class for data sources that work by loading a regular Pixiv page
// and scraping it.
//
// This wouldn't be needed if we could access the mobile APIs, but for some reason those
// use different authentication tokens and can't be accessed from the website.
//
// All of these work the same way.  We keep the current URL (ignoring the hash) synced up
// as a valid page URL that we can load.  If we change pages or other search options, we
// modify the URL appropriately.
class data_source_from_page extends data_source
{
    // The constructor receives the original HTMLDocument.
    constructor(url, doc)
    {
        super(url);

        console.log("ctor", url, doc);
        if(url == null)
            throw "url can't be null";

        this.original_doc = doc;
        this.items_per_page = 1;

        // Remember the URL that original_doc came from.
        this.original_url = url;
    }

    // Return true if the two URLs refer to the same data.
    is_same_page(url1, url2)
    {
        var cleanup_url = function(url)
        {
            var url = new URL(url);

            // p=1 and no page at all is the same.  Remove p=1 so they compare the same.
            if(url.searchParams.get("p") == "1")
                url.searchParams.delete("p");

            // Any "x" parameter is a dummy that we set to force the iframe to load, so ignore
            // it here.
            url.searchParams.delete("x");

            // The hash doesn't affect the page that we load.
            url.hash = "";
            return url.toString();
        };

        var url1 = cleanup_url(url1);
        var url2 = cleanup_url(url2);
        return url1 == url2;
    }

    load_page_available(page)
    {
        return true;
    }
    
    async load_page_internal(page)
    {
        // Our page URL looks like eg.
        //
        // https://www.pixiv.net/bookmark.php?p=2
        //
        // possibly with other search options.  Request the current URL page data.
        var url = new unsafeWindow.URL(this.original_url);

        // Update the URL with the current page.
        var params = url.searchParams;
        params.set("p", page);

        if(this.original_doc != null && this.is_same_page(url, this.original_url))
        {
            this.finished_loading_illust(page, this.original_doc);
            return true;
        }

        // Work around a browser issue: loading an iframe with the same URL as the current page doesn't
        // work.  (This might have made sense once upon a time when it would always recurse, but today
        // this doesn't make sense.)  Just add a dummy query to the URL to make sure it's different.
        //
        // This usually doesn't happen, since we'll normally use this.original_doc if we're reading
        // the same page.  Skip it if it's not needed, so we don't throw weird URLs at the site if
        // we don't have to.
        if(this.is_same_page(url, this.original_url))
            params.set("x", 1);
                
        url.search = params.toString();

        console.log("Loading:", url.toString());

        var doc = await helpers.load_data_in_iframe(url.toString());
        this.finished_loading_illust(page, doc);
    };

    get estimated_items_per_page() { return this.items_per_page; }

    // We finished loading a page.  Parse it and register the results.
    finished_loading_illust(page, doc)
    {
        var illust_ids = this.parse_document(doc);
        if(illust_ids == null)
        {
            // The most common case of there being no data in the document is loading
            // a deleted illustration.  See if we can find an error message.
            console.error("No data on page");
            var error = doc.querySelector(".error-message");
            var error_message = "Error loading page";
            if(error != null)
                error_message = error.textContent;
            message_widget.singleton.show(error_message);
            message_widget.singleton.clear_timer();
            return;
        }

        // Assume that if the first request returns 10 items, all future pages will too.  This
        // is usually correct unless we happen to load the last page last.  Allow this to increase
        // in case that happens.  (This is only used by the thumbnail view.)
        if(this.items_per_page == 1)
            this.items_per_page = Math.max(illust_ids.length, this.items_per_page);

        // Register the new page of data.
        if(!this.add_page(page, illust_ids))
        {
            // The page list was cleared because the underlying results have changed too much,
            // which means we want to re-request pages when they're viewed next.  Clear original_doc,
            // or we won't actually do that for page 1.
            this.original_doc = null;
            this.original_url = null;
        }
    }

    // Parse the loaded document and return the illust_ids.
    parse_document(doc)
    {
        throw "Not implemented";
    }

    set_current_illust_id(illust_id, query_args, hash_args)
    {
        // Use the default behavior for illust_id.
        super.set_current_illust_id(illust_id, query_args, hash_args);

        // Update the current page.  (This can be undefined if we're on a page that isn't
        // actually loaded for some reason.)
        var original_page = this.id_list.get_page_for_illust(illust_id);
        if(original_page != null)
            query_args.set("p", original_page);
    };
};

// There are two ways we can show images for a user: from an illustration page
// (member_illust.php?mode=medium&illust_id=1234), or from the user's works page
// (member_illust.php?id=1234).
//
// The illustration page is better, since it gives us the ID of every post by the
// user, so we don't have to fetch them page by page, but we have to know the ID
// of a post to get to to that.  It's also handy because we can tell where we are
// in the list from the illustration ID without having to know which page we're on,
// the page has the user info encoded (so we don't have to request it separately,
// making loads faster), and if we're going to display a specific illustration, we
// don't need to request it separately either.
//
// However, we can only do searching and filtering on the user page, and that's
// where we land when we load a link to the user.
class data_source_artist extends data_source
{
    get name() { return "artist"; }
  
    constructor(url)
    {
        super(url);
    }

    get viewing_user_id()
    {
        var query_args = this.url.searchParams;
        return query_args.get("id");
    };

    startup()
    {
        super.startup();

        // While we're active, watch for the tags box to open.  We only poopulate the tags
        // dropdown if it's opened, so we don't load user tags for every user page.
        var popup = document.body.querySelector(".member-tags-box > .popup-menu-box");
        this.src_observer = new MutationObserver((mutation_list) => {
            if(popup.classList.contains("popup-visible"))
                this.tag_list_opened();
        });
        this.src_observer.observe(popup, { attributes: true });
    }

    shutdown()
    {
        super.shutdown();

        // Remove our MutationObserver.
        this.src_observer.disconnect();
        this.src_observer = null;
    }
    
    async load_page_internal(page)
    {
        // Make sure the user info is loaded.  This should normally be preloaded by globalInitData
        // in main.js, and this won't make a request.
        this.user_info = await image_data.singleton().get_user_info_full(this.viewing_user_id);

        // Update to refresh our page title, which uses user_info.
        this.call_update_listeners();

        var query_args = this.url.searchParams;
        var hash_args = helpers.get_hash_args(this.url);
        var tag = query_args.get("tag") || "";
        if(tag == "")
        {
            // If we're not filtering by tag, use the profile/all request.  This returns all of
            // the user's illust IDs but no thumb data.
            //
            // We can use the "illustmanga" code path for this by leaving the tag empty, but
            // we do it this way since that's what the site does.
            if(this.pages == null)
            {
                var illust_ids = await this.load_all_results();
                this.pages = paginate_illust_ids(illust_ids, this.estimated_items_per_page);
            }

            // Register this page.
            var illust_ids = this.pages[page-1] || [];
            this.add_page(page, illust_ids);
        }
        else
        {
            // We're filtering by tag.
            var type = query_args.get("type");

            // For some reason, this API uses a random field in the URL for the type instead of a normal
            // query parameter.
            var type_for_url =
                type == null? "illustmanga":
                type == "illust"?"illusts":
                "manga";

            var url = "/ajax/user/" + this.viewing_user_id + "/" + type_for_url + "/tag";
            var result = await helpers.get_request(url, {
                tag: tag,
                offset: (page-1)*48,
                limit: 48,
            });

            // This data doesn't have profileImageUrl or userName.  Presumably that's because it's
            // used on user pages which get that from user data, but this seems like more of an
            // inconsistency than an optimization.  Fill it in for thumbnail_data.
            for(var item of result.body.works)
            {
                item.userName = this.user_info.name;
                item.profileImageUrl = this.user_info.imageBig;
            }

            var illust_ids = [];
            for(var illust_data of result.body.works)
                illust_ids.push(illust_data.id);
            
            // This request returns all of the thumbnail data we need.  Forward it to
            // thumbnail_data so we don't need to look it up.
            thumbnail_data.singleton().loaded_thumbnail_info(result.body.works, "normal");

            // Register the new page of data.
            this.add_page(page, illust_ids);
        }
    }
    
    async load_all_results()
    {
        this.call_update_listeners();

        var query_args = this.url.searchParams;
        var type = query_args.get("type");

        console.error("loading");
        var result = await helpers.get_request("/ajax/user/" + this.viewing_user_id + "/profile/all", {});

        var illust_ids = [];
        if(type == null || type == "illust")
            for(var illust_id in result.body.illusts)
                illust_ids.push(illust_id);
        if(type == null || type == "manga")
            for(var illust_id in result.body.manga)
                illust_ids.push(illust_id);

        // Sort the two sets of IDs back together, putting higher (newer) IDs first.
        illust_ids.sort(function(lhs, rhs)
        {
            return parseInt(rhs) - parseInt(lhs);
        });

        return illust_ids;
    };

    refresh_thumbnail_ui(container, thumbnail_view)
    {
        if(this.user_info)
        {
            thumbnail_view.avatar_widget.set_from_user_data(this.user_info);
        }

        this.set_item(container, "artist-works", {type: null});
        this.set_item(container, "artist-illust", {type: "illust"});
        this.set_item(container, "artist-manga", {type: "manga"});
        
        // Refresh the post tag list.
        var query_args = this.url.searchParams;
        var current_query = query_args.toString();
        
        var tag_list = container.querySelector(".post-tag-list");
        helpers.remove_elements(tag_list);
        
        var add_tag_link = function(tag)
        {
            var a = document.createElement("a");
            a.classList.add("box-link");
            a.classList.add("following-tag");
            a.innerText = tag;

            var url = new URL(document.location);
            url.hash = "#ppixiv";

            if(tag != "All")
                url.searchParams.set("tag", tag);
            else
            {
                url.searchParams.delete("tag");
                a.dataset["default"] = 1;
            }

            a.href = url.toString();
            if(url.searchParams.toString() == current_query)
                a.classList.add("selected");
            tag_list.appendChild(a);
        };

        if(this.post_tags != null)
        {
            add_tag_link("All");
            for(var tag of this.post_tags || [])
                add_tag_link(tag);
        }
        else
        {
            // Tags aren't loaded yet.  We'll be refreshed after tag_list_opened loads tags.
            var span = document.createElement("span");
            span.innerText = "Loading...";
            tag_list.appendChild(span);
        }

        // Set whether the tags menu item is highlighted.  We don't use set_active_popup_highlight
        // here so we don't need to load the tag list.
        var box = container.querySelector(".member-tags-box");
        helpers.set_class(box, "active", query_args.has("tag"));
    }

    // This is called when the tag list dropdown is opened.
    async tag_list_opened()
    {
        // Only do this once.
        if(this.loaded_tags)
        {
            console.log("already loaded");
            return;
        }
        this.loaded_tags = true;

        // Get user info.  We probably have this on this.user_info, but that async load
        // might not be finished yet.
        var user_info = await image_data.singleton().get_user_info_full(this.viewing_user_id);
        console.log("Loading tags for user", user_info.userId);

        // Load the user's common tags.
        this.post_tags = await this.get_user_tags(user_info);

        // If we became inactive before the above request finished, stop.
        if(!this.active)
            return;

        // Trigger refresh_thumbnail_ui to fill in tags.
        this.call_update_listeners();
    }

    async get_user_tags(user_info)
    {
        if(user_info.frequentTags)
            return user_info.frequentTags;

        var result = await helpers.get_request("https://www.pixiv.net/ajax/user/" + user_info.userId + "/illustmanga/tags", {});
        if(result.error)
        {
            console.error("Error fetching tags for user " + user_info.userId + ": " + result.error);
            user_info.frequentTags = [];
            return user_info.frequentTags;
        }

        // Sort most frequent tags first.
        result.body.sort(function(lhs, rhs) {
            return rhs.cnt - lhs.cnt;
        })

        var tags = [];
        for(var tag_info of result.body)
            tags.push(tag_info.tag);

        // Cache the results on the user info.
        user_info.frequentTags = tags;
        return tags;
    }

    get page_title()
    {
        if(this.user_info)
            return this.user_info.name;
        else
            return "Loading...";
    }

    get_displaying_text()
    {
        if(this.user_info)
            return this.user_info.name + "'s Illustrations";
        else
            return "Illustrations";
    };
}

// Viewing a single illustration.
//
// This page gives us all of the user's illustration IDs, so we can treat this as
// a data source for a user without having to make separate requests.
//
// This reads data from a page, but we don't use data_source_from_page here.  We
// don't need its pagination logic, and we do want to have pagination from data_source_fake_pagination.
class data_source_current_illust extends data_source_fake_pagination
{
    get name() { return "illust"; }

    // The constructor receives the original HTMLDocument.
    constructor(url, doc)
    {
        super(url);

        this.original_doc = doc;
        this.original_url = url;
    }

    // Show the illustration by default.
    get default_view()
    {
        return "illust";
    }

    // Implement data_source_fake_pagination:
    async load_all_results()
    {
        if(this.original_doc != null)
            return this.load_all_results_from(this.original_doc);

        var url = new unsafeWindow.URL(this.original_url);

        // Work around browsers not loading the iframe properly when it has the same URL.
        url.searchParams.set("x", 1);
        
        console.log("Loading:", url.toString());

        var doc = await helpers.load_data_in_iframe(url.toString());
        return this.load_all_results_from(doc);
    };

    load_all_results_from(doc)
    {
        var illust_ids = this.parse_document(doc);
        if(illust_ids != null)
            return illust_ids;

        // The most common case of there being no data in the document is loading
        // a deleted illustration.  See if we can find an error message.
        console.error("No data on page");
        var error = doc.querySelector(".error-message");
        var error_message = "Error loading page";
        if(error != null)
            error_message = error.textContent;
        message_widget.singleton.show(error_message);
        message_widget.singleton.clear_timer();

        return [];
    }

    parse_document(doc)
    {
        var data = helpers.get_global_init_data(doc);
        if(data == null)
        {
            console.error("Couldn't find globalInitData");
            return;
        }

        var illust_id = Object.keys(data.preload.illust)[0];
        var user_id = Object.keys(data.preload.user)[0];
        this.user_info = data.preload.user[user_id];
        var this_illust_data = data.preload.illust[illust_id];

        // Stash the user data so we can use it in get_displaying_text.
        this.user_info = data.preload.user[user_id];

        // Add the image list.
        var illust_ids = [];
        for(var related_illust_id in this_illust_data.userIllusts)
        {
            if(related_illust_id == illust_id)
                continue;
            illust_ids.push(related_illust_id);
        }

        // Make sure our illustration is in the list.
        if(illust_ids.indexOf(illust_id) == -1)
            illust_ids.push(illust_id);

        // Sort newest first.
        illust_ids.sort(function(a,b) { return b-a; });
        
        return illust_ids;
    };

    // Unlike most data_source_from_page implementations, we only have a single page.
    get_current_illust_id()
    {
        // ?illust_id should always be an illustration ID on illustration pages.
        var query_args = new URL(document.location).searchParams;
        return query_args.get("illust_id");
    };

    // data_source_current_illust is tricky.  Since it returns posts by the user
    // of an image, we remove the illust_id (since two images with the same user
    // can use the same data source), and add the user ID.
    //
    // This requires that get_canonical_url be asynchronous, since we might need
    // to load the image info.
    static async get_canonical_url(url, callback)
    {
        var url = new URL(url);
        var illust_id = url.searchParams.get("illust_id");
        var illust_info = await image_data.singleton().get_image_info(illust_id);

        var hash_args = helpers.get_hash_args(url);
        hash_args.set("user_id", illust_info.userId);
        helpers.set_hash_args(url, hash_args);

        url.searchParams.delete("illust_id");
        
        return await data_source.get_canonical_url(url);
    }

    // Unlike most data sources, data_source_current_illust puts the illust_id
    // in the query rather than the hash.
    set_current_illust_id(illust_id, query_args, hash_args)
    {
        query_args.set("illust_id", illust_id);
    };

    get page_title()
    {
        if(this.user_info)
            return this.user_info.name;
        else
            return "Illustrations";
    }

    get_displaying_text()
    {
        if(this.user_info)
            return this.user_info.name + "'s Illustrations";
        else
            return "Illustrations";
    };

    refresh_thumbnail_ui(container, thumbnail_view)
    {
        if(this.user_info)
        {
            thumbnail_view.avatar_widget.set_from_user_data(this.user_info);
        }
    }

    get page_title()
    {
        if(this.user_info)
            return this.user_info.name;
        else
            return "Illustrations";
    }

    get viewing_user_id()
    {
        if(this.user_info == null)
            return null;
        return this.user_info.userId;
    };
};

// bookmark.php
//
// If id is in the query, we're viewing another user's bookmarks.  Otherwise, we're
// viewing our own.
//
// Pixiv currently serves two unrelated pages for this URL, using an API-driven one
// for viewing someone else's bookmarks and a static page for viewing your own.  We
// always use the API in either case.
//
// For some reason, Pixiv only allows viewing either public or private bookmarks,
// and has no way to just view all bookmarks.
class data_source_bookmarks_base extends data_source
{
    get name() { return "bookmarks"; }
  
    constructor(url)
    {
        super(url);
        this.bookmark_tags = [];
    }

    async load_page_internal(page)
    {
        this.fetch_bookmark_tags();
        
        // Make sure the user info is loaded.  This should normally be preloaded by globalInitData
        // in main.js, and this won't make a request.
        var user_info = await image_data.singleton().get_user_info_full(this.viewing_user_id);

        this.user_info = user_info;
        this.call_update_listeners();

        await this.continue_loading_page_internal(page);
    };

    // If we haven't done so yet, load bookmark tags for this bookmark page.  This
    // happens in parallel with with page loading.
    async fetch_bookmark_tags()
    {
        if(this.fetched_bookmark_tags)
            return;
        this.fetched_bookmark_tags = true;

        // Fetch bookmark tags.  We can do this in parallel with everything else.
        var url = "https://www.pixiv.net/ajax/user/" + this.viewing_user_id + "/illusts/bookmark/tags";
        var result = await helpers.get_request(url, {});

        var tag_counts = {};
        for(var bookmark_tag of result.body.public)
        {
            // Skip "uncategorized".  This is always the first entry.  There's no clear
            // marker for it, so just check the tag name.  We don't assume it'll always
            // be the first entry in case this changes.
            if(bookmark_tag.tag == "未分類")
                continue;
            tag_counts[bookmark_tag.tag] = parseInt(bookmark_tag.cnt);
        }

        for(var bookmark_tag of result.body.private)
        {
            if(bookmark_tag.tag == "未分類")
                continue;
            if(!(bookmark_tag.tag in tag_counts))
                tag_counts[bookmark_tag.tag] = 0;
            tag_counts[bookmark_tag.tag] += parseInt(bookmark_tag.cnt);
        }

        var all_tags = [];
        for(var tag in tag_counts)
            all_tags.push(tag);

        // Sort tags by count, so we can trim just the most used tags.
        all_tags.sort(function(lhs, rhs) {
            return tag_counts[rhs] - tag_counts[lhs];
        });

        // Trim the list.  Some users will return thousands of tags.
        all_tags.splice(20);
        all_tags.sort();
        this.bookmark_tags = all_tags;

        // Update the UI with the tag list.
        this.call_update_listeners();
    }
    
    // Get API arguments to query bookmarks.
    //
    // If force_rest isn't null, it's either "show" (public) or "hide" (private), which
    // overrides the search parameters.
    get_bookmark_query_params(page, force_rest)
    {
        var query_args = this.url.searchParams;
        var rest = query_args.get("rest") || "show";
        if(force_rest != null)
            rest = force_rest;
        var tag = query_args.get("tag") || "";

        return {
            tag: tag,
            offset: (page-1)*48,
            limit: 48,
            rest: rest, // public or private (no way to get both)
        };
    }

    // This is implemented by the subclass to do the main loading.
    async continue_loading_page_internal(page)
    {
        throw "Not implemented";
    }

    get page_title()
    {
        if(!this.viewing_own_bookmarks())
        {
            if(this.user_info)
                return this.user_info.name + "'s Bookmarks";
            else
                return "Loading...";
        }

        return "Bookmarks";
    }

    get_displaying_text()
    {
        if(!this.viewing_own_bookmarks())
        {
            if(this.user_info)
                return this.user_info.name + "'s Bookmarks";
            return "User's Bookmarks";
        }

        var query_args = this.url.searchParams;
        var hash_args = helpers.get_hash_args(this.url);

        var private_bookmarks = query_args.get("rest") == "hide";
        var displaying = this.viewing_all_bookmarks? "All Bookmarks":
            private_bookmarks? "Private Bookmarks":"Public Bookmarks";

        var tag = query_args.get("tag");
        if(tag)
            displaying += " with tag \"" + tag + "\"";

        return displaying;
    };

    get viewing_all_bookmarks() { return false; }

    refresh_thumbnail_ui(container, thumbnail_view)
    {
        // The public/private button only makes sense when viewing your own bookmarks.
        var public_private_button_container = container.querySelector(".bookmarks-public-private");
        public_private_button_container.hidden = !this.viewing_own_bookmarks();

        // Set up the public and private buttons.
        this.set_item(public_private_button_container, "all", {"#show-all": 1}, {"#show-all": 1});
        this.set_item(container, "public", {rest: null, "#show-all": 0}, {"#show-all": 1});
        this.set_item(container, "private", {rest: "hide", "#show-all": 0}, {"#show-all": 1});

        // Refresh the bookmark tag list.
        var current_query = new URL(document.location).searchParams.toString();

        var tag_list = container.querySelector(".bookmark-tag-list");
        
        helpers.remove_elements(tag_list);

        var add_tag_link = function(tag)
        {
            var a = document.createElement("a");
            a.classList.add("box-link");
            a.classList.add("following-tag");
            a.innerText = tag;

            var url = new URL(document.location);
            if(tag == "Uncategorized")
                url.searchParams.set("untagged", 1);
            else
                url.searchParams.delete("untagged", 1);

            if(tag != "All" && tag != "Uncategorized")
                url.searchParams.set("tag", tag);
            else
                url.searchParams.delete("tag");

            a.href = url.toString();
            if(url.searchParams.toString() == current_query)
                a.classList.add("selected");
            tag_list.appendChild(a);
        };

        add_tag_link("All");
        add_tag_link("Uncategorized");
        for(var tag of this.bookmark_tags || [])
            add_tag_link(tag);

        if(this.user_info)
            thumbnail_view.avatar_widget.set_from_user_data(this.user_info);
    }

    get viewing_user_id()
    {
        // If there's no user ID in the URL, view our own bookmarks.
        var query_args = this.url.searchParams;
        var user_id = query_args.get("id");
        if(user_id == null)
            return window.global_data.user_id;
        
        return query_args.get("id");
    };

    // Return true if we're viewing our own bookmarks.
    viewing_own_bookmarks()
    {
        return this.viewing_user_id == window.global_data.user_id;
    }

    // Don't show bookmark icons for the user's own bookmarks.  Every image on that page
    // is bookmarked, so it's just a lot of noise.
    get show_bookmark_icons()
    {
        return !this.viewing_own_bookmarks();
    }
}

// Normal bookmark querying.  This can only retrieve public or private bookmarks,
// and not both.
class data_source_bookmarks extends data_source_bookmarks_base
{
    async continue_loading_page_internal(page)
    {
        var data = this.get_bookmark_query_params(page);

        var url = "/ajax/user/" + this.viewing_user_id + "/illusts/bookmarks";
        var result = await helpers.get_request(url, data);

        var illust_ids = [];
        for(var illust_data of result.body.works)
            illust_ids.push(illust_data.id);

        // This request returns all of the thumbnail data we need.  Forward it to
        // thumbnail_data so we don't need to look it up.
        thumbnail_data.singleton().loaded_thumbnail_info(result.body.works, "normal");

        // Register the new page of data.
        this.add_page(page, illust_ids);
    }
};

// Merged bookmark querying.  This makes queries for both public and private bookmarks,
// and merges them together.
class data_source_bookmarks_merged extends data_source_bookmarks_base
{
    get viewing_all_bookmarks() { return true; }

    constructor(url)
    {
        super(url);

        this.max_page_per_type = [-1, -1]; // public, private
        this.bookmark_illust_ids = [[], []]; // public, private
    }

    async continue_loading_page_internal(page)
    {
        // Request both the public and private bookmarks on the given page.  If we've
        // already reached the end of either of them, don't send that request.
        var request1 = this.request_bookmarks(page, "show");
        var request2 = this.request_bookmarks(page, "hide");

        // Wait for both requests to finish.
        await Promise.all([request1, request2]);

        // Both requests finished.  Combine the two lists of illust IDs into a single page
        // and register it.
        var illust_ids = [];
        for(var i = 0; i < 2; ++i)
            if(this.bookmark_illust_ids[i] != null)
                illust_ids = illust_ids.concat(this.bookmark_illust_ids[i][page]);
        
        this.add_page(page, illust_ids);
    }

    async request_bookmarks(page, rest)
    {
        var is_private = rest == "hide"? 1:0;
        var max_page = this.max_page_per_type[is_private];
        if(max_page != -1 && page > max_page)
        {
            // We're past the end.
            console.log("page", page, "beyond", max_page, rest);
            return;
        }

        var data = this.get_bookmark_query_params(page, rest);

        var url = "/ajax/user/" + this.viewing_user_id + "/illusts/bookmarks";
        var result = await helpers.get_request(url, data);

        // Put higher (newer) bookmarks first.
        result.body.works.sort(function(lhs, rhs)
        {
            return parseInt(rhs.bookmarkData.id) - parseInt(lhs.bookmarkData.id);
        });

        var illust_ids = [];
        for(var illust_data of result.body.works)
            illust_ids.push(illust_data.id);

        // This request returns all of the thumbnail data we need.  Forward it to
        // thumbnail_data so we don't need to look it up.
        thumbnail_data.singleton().loaded_thumbnail_info(result.body.works, "normal");

        // If there are no results, remember that this is the last page, so we don't
        // make more requests for this type.
        if(illust_ids.length == 0)
        {
            if(this.max_page_per_type[is_private] == -1)
                this.max_page_per_type[is_private] = page;
            else
                this.max_page_per_type[is_private] = Math.min(page, this.max_page_per_type[is_private]);
            console.log("max page", this.max_page_per_type[is_private]);
        }

        // Store the IDs.  We don't register them here.
        this.bookmark_illust_ids[is_private][page] = illust_ids;
    }
}

// new_illust.php
class data_source_new_illust extends data_source_from_page
{
    get name() { return "new_illust"; }

    // Parse the loaded document and return the illust_ids.
    parse_document(document)
    {
        var items = document.querySelectorAll("A.work[href*='member_illust.php']");

        var illust_ids = [];
        for(var item of items)
        {
            var url = new URL(item.href);
            illust_ids.push(url.searchParams.get("illust_id"));
        }
        return illust_ids;
    }

    get page_title()
    {
        return "New Works";
    }

    get_displaying_text()
    {
        return "New Works";
    };

    refresh_thumbnail_ui(container)
    {
        this.set_item(container, "new-illust-type-all", {type: null});
        this.set_item(container, "new-illust-type-illust", {type: "illust"});
        this.set_item(container, "new-illust-type-manga", {type: "manga"});
        this.set_item(container, "new-illust-type-ugoira", {type: "ugoira"});

        // These links are different from anything else on the site: they switch between
        // two top-level pages, even though they're just flags and everything else is the
        // same.
        var all_ages_link = container.querySelector("[data-type='new-illust-ages-all']");
        var r18_link = container.querySelector("[data-type='new-illust-ages-r18']");

        var button_is_selected = true;

        var url = new URL(document.location);
        url.pathname = "/new_illust.php";
        all_ages_link.href = url;

        var url = new URL(document.location);
        url.pathname = "/new_illust_r18.php";
        r18_link.href = url;

        var url = new URL(document.location);
        var currently_all_ages = url.pathname == "/new_illust.php";
        helpers.set_class(currently_all_ages? all_ages_link:r18_link, "selected", button_is_selected);
    }
}

// bookmark_new_illust.php
class data_source_bookmarks_new_illust extends data_source_from_page
{
    get name() { return "bookmarks_new_illust"; }

    constructor(url, doc)
    {
        super(url, doc);
        this.bookmark_tags = [];
    }

    // Parse the loaded document and return the illust_ids.
    parse_document(doc)
    {
        this.bookmark_tags = [];
        for(var element of doc.querySelectorAll(".menu-items a[href*='bookmark_new_illust.php?tag'] span.icon-text"))
            this.bookmark_tags.push(element.innerText);
        
        var element = doc.querySelector("#js-mount-point-latest-following");
        var items = JSON.parse(element.dataset.items);

        // Populate thumbnail data with this data.
        thumbnail_data.singleton().loaded_thumbnail_info(items, "following");

        var illust_ids = [];
        for(var illust of items)
            illust_ids.push(illust.illustId);

        return illust_ids;
    }

    get page_title()
    {
        return "Following";
    }

    get_displaying_text()
    {
        return "Following";
    };

    refresh_thumbnail_ui(container)
    {
        // Refresh the bookmark tag list.
        var current_tag = new URL(document.location).searchParams.get("tag") || "All";

        var tag_list = container.querySelector(".bookmark-tag-list");
        helpers.remove_elements(tag_list);

        var add_tag_link = function(tag)
        {
            var a = document.createElement("a");
            a.classList.add("box-link");
            a.classList.add("following-tag");
            a.innerText = tag;

            var url = new URL(document.location);
            if(tag != "All")
                url.searchParams.set("tag", tag);
            else
                url.searchParams.delete("tag");

            a.href = url.toString();
            if(tag == current_tag)
                a.classList.add("selected");
            tag_list.appendChild(a);
        };

        add_tag_link("All");
        for(var tag of this.bookmark_tags)
            add_tag_link(tag);
    }
};

// search.php
class data_source_search extends data_source_from_page
{
    get name() { return "search"; }

    constructor(url, doc)
    {
        super(url, doc);

        // Add the search tags to tag history.  We only do this at the start when the
        // data source is created, not every time we navigate back to the search.
        var query_args = this.url.searchParams;
        var tag = query_args.get("word");
        if(tag)
            helpers.add_recent_search_tag(tag);
    }
     
    parse_document(doc)
    {
        // The actual results are encoded in a string for some reason.
        var result_list_json = doc.querySelector("#js-mount-point-search-result-list").dataset.items;
        var illusts = JSON.parse(result_list_json);

        // Store related tags.  Only do this the first time and don't change it when we read
        // future pages, so the tags don't keep changing as you scroll around.
        if(this.related_tags == null)
        {
            var related_tags_json = doc.querySelector("#js-mount-point-search-result-list").dataset.relatedTags;
            var related_tags = JSON.parse(related_tags_json);
            this.related_tags = related_tags;
        }

        if(this.tag_translation == null)
        {
            var span = doc.querySelector(".search-result-information .translation-column-title");
            if(span != null)
                this.tag_translation = span.innerText;
        }
        
        // Populate thumbnail data with this data.  This has the same format as
        // bookmark_new_illust.php.
        thumbnail_data.singleton().loaded_thumbnail_info(illusts, "following");

        var illust_ids = [];
        for(var illust of illusts)
            illust_ids.push(illust.illustId);

        return illust_ids;
    }

    get page_title()
    {
        var query_args = this.url.searchParams;

        var displaying = "Search: ";
        var tag = query_args.get("word");
        if(tag)
            displaying += tag;
        
        return displaying;
    }

    get_displaying_text()
    {
        var displaying = this.page_title;

        // Add the tag translation if there is one.  We only put this in the page and not
        // the title to avoid cluttering the title.
        if(this.tag_translation != null)
            displaying += " (" + this.tag_translation + ")";
        
        return displaying;
    };

    initial_refresh_thumbnail_ui(container, view)
    {
        // Fill the search box with the current tag.
        var query_args = this.url.searchParams;
        var tag = query_args.get("word");
        container.querySelector(".search-page-tag-entry .search-tags").value = tag;
    }
    
    refresh_thumbnail_ui(container, thumbnail_view)
    {
        if(this.related_tags)
        {
            thumbnail_view.tag_widget.set({
                tags: this.related_tags
            });
        }

        this.set_item(container, "ages-all", {mode: null});
        this.set_item(container, "ages-safe", {mode: "safe"});
        this.set_item(container, "ages-r18", {mode: "r18"});

        this.set_item(container, "order-newest", {order: null}, {order: "date_d"});
        this.set_item(container, "order-oldest", {order: "date"});
        this.set_item(container, "order-male", {order: "popular_male_d"});
        this.set_item(container, "order-female", {order: "popular_female_d"});

        this.set_item(container, "search-type-all", {type: null});
        this.set_item(container, "search-type-illust", {type: "illust"});
        this.set_item(container, "search-type-manga", {type: "manga"});
        this.set_item(container, "search-type-ugoira", {type: "ugoira"});

        this.set_item(container, "search-all", {s_mode: null}, {s_mode: "s_tag"});
        this.set_item(container, "search-exact", {s_mode: "s_tag_full"});
        this.set_item(container, "search-text", {s_mode: "s_tc"});

        this.set_item(container, "res-all", {wlt: null, hlt: null, wgt: null, hgt: null});
        this.set_item(container, "res-high", {wlt: 3000, hlt: 3000, wgt: null, hgt: null});
        this.set_item(container, "res-medium", {wlt: 1000, hlt: 1000, wgt: 2999, hgt: 2999});
        this.set_item(container, "res-low", {wlt: null, hlt: null, wgt: 999, hgt: 999});

        this.set_item(container, "aspect-ratio-all", {ratio: null});
        this.set_item(container, "aspect-ratio-landscape", {ratio: "0.5"});
        this.set_item(container, "aspect-ratio-portrait", {ratio: "-0.5"});
        this.set_item(container, "aspect-ratio-square", {ratio: "0"});
       
        this.set_item(container, "bookmarks-all", {blt: null, bgt: null});
        this.set_item(container, "bookmarks-5000", {blt: 5000, bgt: null});
        this.set_item(container, "bookmarks-2500", {blt: 2500, bgt: null});
        this.set_item(container, "bookmarks-1000", {blt: 1000, bgt: null});
        this.set_item(container, "bookmarks-500", {blt: 500, bgt: null});
        this.set_item(container, "bookmarks-250", {blt: 250, bgt: null});
        this.set_item(container, "bookmarks-100", {blt: 100, bgt: null});

        // The time filter is a range, but I'm not sure what time zone it filters in
        // (presumably either JST or UTC).  There's also only a date and not a time,
        // which means you can't actually filter "today", since there's no way to specify
        // which "today" you mean.  So, we offer filtering starting at "this week",
        // and you can just use the default date sort if you want to see new posts.
        // For "this week", we set the end date a day in the future to make sure we
        // don't filter out posts today.
        this.set_item(container, "time-all", {scd: null, ecd: null});

        var format_date = function(date)
        {
            var f = (date.getYear() + 1900).toFixed();
            return (date.getYear() + 1900).toFixed().padStart(2, "0") + "-" +
                    (date.getMonth() + 1).toFixed().padStart(2, "0") + "-" +
                    date.getDate().toFixed().padStart(2, "0");
        };

        var set_date_filter = function(name, start, end)
        {
            var start_date = format_date(start);
            var end_date = format_date(end);
            this.set_item(container, name, {scd: start_date, ecd: end_date});
        }.bind(this);

        var tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
        var last_week = new Date(); last_week.setDate(last_week.getDate() - 7);
        var last_month = new Date(); last_month.setMonth(last_month.getMonth() - 1);
        var last_year = new Date(); last_year.setFullYear(last_year.getFullYear() - 1);
        set_date_filter("time-week", last_week, tomorrow);
        set_date_filter("time-month", last_month, tomorrow);
        set_date_filter("time-year", last_year, tomorrow);
        for(var years_ago = 1; years_ago <= 7; ++years_ago)
        {
            var start_year = new Date(); start_year.setFullYear(start_year.getFullYear() - years_ago - 1);
            var end_year = new Date(); end_year.setFullYear(end_year.getFullYear() - years_ago);
            set_date_filter("time-years-ago-" + years_ago, start_year, end_year);
        }

        this.set_active_popup_highlight(container, [".ages-box", ".popularity-box", ".type-box", ".search-mode-box", ".size-box", ".aspect-ratio-box", ".bookmarks-box", ".time-box", ".member-tags-box"]);

        // The "reset search" button removes everything in the query except search terms.
        var box = container.querySelector(".reset-search");
        var url = new URL(document.location);
        var tag = url.searchParams.get("word");
        url.search = "";
        if(tag != null)
            url.searchParams.set("word", tag);
        box.href = url;
     }
 };

// This is a simple hack to piece together an MJPEG MKV from a bunch of JPEGs.

var encode_mkv = (function() {
    var encode_length = function(value)
    {
        // Encode a 40-bit EBML int.  This lets us encode 32-bit ints with no extra logic.
        return struct(">BI").pack(0x08, value);
    };

    var header_int = function(container, identifier, value)
    {
        container.push(new Uint8Array(identifier));
        var data = struct(">II").pack(0, value);
        var size = data.byteLength;
        container.push(encode_length(size));
        container.push(data);
    };

    var header_float = function(container, identifier, value)
    {
        container.push(new Uint8Array(identifier));
        var data = struct(">f").pack(value);
        var size = data.byteLength;
        container.push(encode_length(size));
        container.push(data);
    };

    var header_data = function(container, identifier, data)
    {
        container.push(new Uint8Array(identifier));
        container.push(encode_length(data.byteLength));
        container.push(data);
    };

    // Return the total size of an array of ArrayBuffers.
    var total_size = function(array)
    {
        var size = 0;
        for(var idx = 0; idx < array.length; ++idx)
        {
            var item = array[idx];
            size += item.byteLength;
        }
        return size;
    };

    var append_array = function(a1, a2)
    {
        var result = new Uint8Array(a1.byteLength + a2.byteLength);
        result.set(new Uint8Array(a1));
        result.set(new Uint8Array(a2), a1.byteLength);
        return result;
    };

    // Create an EBML block from an identifier and a list of Uint8Array parts.  Return a
    // single Uint8Array.
    var create_data_block = function(identifier, parts)
    {
        var identifier = new Uint8Array(identifier);
        var data_size = total_size(parts);
        var encoded_data_size = encode_length(data_size);
        var result = new Uint8Array(identifier.byteLength + encoded_data_size.byteLength + data_size);
        var pos = 0;

        result.set(new Uint8Array(identifier), pos);
        pos += identifier.byteLength;

        result.set(new Uint8Array(encoded_data_size), pos);
        pos += encoded_data_size.byteLength;

        for(var i = 0; i < parts.length; ++i)
        {
            var part = parts[i];
            result.set(new Uint8Array(part), pos);
            pos += part.byteLength;
        }

        return result;
    };

    // EBML data types
    var ebml_header = function()
    {
        var parts = [];
        header_int(parts, [0x42, 0x86], 1); // EBMLVersion
        header_int(parts, [0x42, 0xF7], 1); // EBMLReadVersion
        header_int(parts, [0x42, 0xF2], 4); // EBMLMaxIDLength
        header_int(parts, [0x42, 0xF3], 8); // EBMLMaxSizeLength
        header_data(parts, [0x42, 0x82], new Uint8Array([0x6D, 0x61, 0x74, 0x72, 0x6F, 0x73, 0x6B, 0x61])); // DocType ("matroska")
        header_int(parts, [0x42, 0x87], 4); // DocTypeVersion
        header_int(parts, [0x42, 0x85], 2); // DocTypeReadVersion
        return create_data_block([0x1A, 0x45, 0xDF, 0xA3], parts); // EBML
    };

    var ebml_info = function(duration)
    {
        var parts = [];
        header_int(parts, [0x2A, 0xD7, 0xB1], 1000000); // TimecodeScale
        header_data(parts, [0x4D, 0x80], new Uint8Array([120])); // MuxingApp ("x") (this shouldn't be mandatory)
        header_data(parts, [0x57, 0x41], new Uint8Array([120])); // WritingApp ("x") (this shouldn't be mandatory)
        header_float(parts, [0x44, 0x89], duration * 1000); // Duration (why is this a float?)
        return create_data_block([0x15, 0x49, 0xA9, 0x66], parts); // Info
    };

    var ebml_track_entry_video = function(width, height)
    {
        var parts = [];
        header_int(parts, [0xB0], width); // PixelWidth
        header_int(parts, [0xBA], height); // PixelHeight
        return create_data_block([0xE0], parts); // Video
    };

    var ebml_track_entry = function(width, height)
    {
        var parts = [];
        header_int(parts, [0xD7], 1); // TrackNumber
        header_int(parts, [0x73, 0xC5], 1); // TrackUID
        header_int(parts, [0x83], 1); // TrackType (video)
        header_int(parts, [0x9C], 0); // FlagLacing
        header_int(parts, [0x23, 0xE3, 0x83], 33333333); // DefaultDuration (overridden per frame)
        header_data(parts, [0x86], new Uint8Array([0x56, 0x5f, 0x4d, 0x4a, 0x50, 0x45, 0x47])); // CodecID ("V_MJPEG")
        parts.push(ebml_track_entry_video(width, height));
        return create_data_block([0xAE], parts); // TrackEntry
    };

    var ebml_tracks = function(width, height)
    {
        var parts = [];
        parts.push(ebml_track_entry(width, height));
        return create_data_block([0x16, 0x54, 0xAE, 0x6B], parts); // Tracks
    };

    var ebml_simpleblock = function(frame_data)
    {
        // We should be able to use encode_length(1), but for some reason, while everything else
        // handles our non-optimal-length ints just fine, this field doesn't.  Manually encode it
        // instead.
        var result = new Uint8Array([
            0x81, // track number 1 (EBML encoded)
            0, 0, // timecode relative to cluster
            0x80, // flags (keyframe)
        ]); 

        result = append_array(result, frame_data);
        return result;
    };

    var ebml_cluster = function(frame_data, frame_time)
    {
        var parts = [];
        header_int(parts, [0xE7], Math.round(frame_time * 1000)); // Timecode

        header_data(parts, [0xA3], ebml_simpleblock(frame_data)); // SimpleBlock

        return create_data_block([0x1F, 0x43, 0xB6, 0x75], parts); // Cluster
    };

    var ebml_cue_track_positions = function(file_position)
    {
        var parts = [];
        header_int(parts, [0xF7], 1); // CueTrack
        header_int(parts, [0xF1], file_position); // CueClusterPosition
        return create_data_block([0xB7], parts); // CueTrackPositions
    };

    var ebml_cue_point = function(frame_time, file_position)
    {
        var parts = [];
        header_int(parts, [0xB3], Math.round(frame_time * 1000)); // CueTime
        parts.push(ebml_cue_track_positions(file_position));

        return create_data_block([0xBB], parts); // CuePoint
    };

    var ebml_cues = function(frame_times, frame_file_positions)
    {
        var parts = [];
        for(var frame = 0; frame < frame_file_positions.length; ++frame)
        {
            var frame_time = frame_times[frame];
            var file_position = frame_file_positions[frame];
            parts.push(ebml_cue_point(frame_time, file_position));
        }

        return create_data_block([0x1C, 0x53, 0xBB, 0x6B], parts); // Cues
    };

    var ebml_segment = function(parts)
    {
        return create_data_block([0x18, 0x53, 0x80, 0x67], parts); // Segment
    };

    // API:
    // We don't decode the JPEG frames while we do this, so the resolution is supplied here.
    class encode_mkv
    {
        constructor(width, height)
        {
            this.width = width;
            this.height = height;
            this.frames = [];
        }

        add(jpeg_data, frame_duration_ms)
        {
            this.frames.push({
                data: jpeg_data,
                duration: frame_duration_ms,
            });
        };

        build()
        {
            // Sum the duration of the video.
            var duration = 0;
            for(var frame = 0; frame < this.frames.length; ++frame)
            {
                var data = this.frames[frame].data;
                var ms = this.frames[frame].duration;
                duration += ms / 1000.0;
            }

            var header_parts = ebml_header();

            var parts = [];
            parts.push(ebml_info(duration));
            parts.push(ebml_tracks(this.width, this.height));

            // current_pos is the relative position from the start of the segment (after the ID and
            // size bytes) to the beginning of the cluster.
            var current_pos = 0;
            for(var part of parts)
                current_pos += part.byteLength;

            // Create each frame as its own cluster, and keep track of the file position of each.
            var frame_file_positions = [];
            var frame_file_times = [];

            var frame_time = 0;
            for(var frame = 0; frame < this.frames.length; ++frame)
            {
                var data = this.frames[frame].data;
                var ms = this.frames[frame].duration;
                var cluster = ebml_cluster(data, frame_time);
                parts.push(cluster);

                frame_file_positions.push(current_pos);
                frame_file_times.push(frame_time);

                frame_time += ms / 1000.0;
                current_pos += cluster.byteLength;
            };

            // Add the frame index.
            parts.push(ebml_cues(frame_file_times, frame_file_positions));

            // Create an EBMLSegment containing all of the parts (excluding the header).
            var segment = ebml_segment(parts);

            // Return a blob containing the final data.
            var file = [];
            file = file.concat(header_parts);
            file = file.concat(segment);
            return new Blob(file);
        };
    };
    return encode_mkv;
})();
// Hide the mouse cursor when it hasn't moved briefly, to get it out of the way.
// This only hides the cursor over element.
//
// Chrome's cursor handling is buggy and doesn't update the cursor when it's not
// moving, so this only works in Firefox.
class hide_mouse_cursor_on_idle
{
    constructor(element)
    {
        this.onmousemove = this.onmousemove.bind(this);
        this.onblur = this.onblur.bind(this);
        this.idle = this.idle.bind(this);
        this.hide_immediately = this.hide_immediately.bind(this);

        this.element = element;

        this.force_hidden_until = null;

        window.addEventListener("mousemove", this.onmousemove, true);
        window.addEventListener("blur", this.blur, true);
        window.addEventListener("hide-cursor-immediately", this.hide_immediately, true);

        window.addEventListener("enable-hiding-cursor", function() { this.enable = true; }.bind(this), true);
        window.addEventListener("disable-hiding-cursor", function() { this.enable = false; }.bind(this), true);

        this.enable = true;
    }

    // Temporarily disable hiding all mouse cursors.
    static enable_all()
    {
        window.dispatchEvent(new Event("enable-hiding-cursor"));
    }

    static disable_all()
    {
        window.dispatchEvent(new Event("disable-hiding-cursor"));
    }

    set enable(value)
    {
        if(this._enabled == value)
            return;

        this._enabled = value;

        if(this._enabled)
            this.reset_timer();
        else
        {
            this.remove_timer();
            this.show_cursor();
        }
    }

    get enable()
    {
        return this._enabled;
    };

    remove_timer()
    {
        if(!this.timer)
            return;

        clearInterval(this.timer);
        this.timer = null;
    }

    // Hide the cursor now, and keep it hidden very briefly even if it moves.  This is done
    // when releasing a zoom to prevent spuriously showing the mouse cursor.
    hide_immediately(e)
    {
        this.force_hidden_until = Date.now() + 150;
        this.idle();
    }

    reset_timer()
    {
        this.show_cursor();

        this.remove_timer();
        this.timer = setTimeout(this.idle, 500);
    }

    idle()
    {
        this.remove_timer();
        this.hide_cursor();
    }

    onmousemove(e)
    {
        if(this.force_hidden_until && this.force_hidden_until > Date.now())
            return;

        this.reset_timer();
    }

    onblur(e)
    {
        this.remove_timer();
        this.show_cursor();
    }

    show_cursor(e)
    {
    //    this.element.style.cursor = "";
        this.element.classList.remove("hide-cursor");
    }

    hide_cursor(e)
    {
        // Setting style.cursor to none doesn't work in Chrome.  Doing it with a style works
        // intermittently (seems to work better in fullscreen).  Firefox doesn't have these
        // problems.
    //    this.element.style.cursor = "none";
        this.element.classList.add("hide-cursor");
    }
}

// This handles fetching and caching image data and associated user data.
//
// We always load the user data for an illustration if it's not already loaded.  We also
// load ugoira_metadata.  This way, we can access all the info we need for an image in
// one place, without doing multi-phase loads elsewhere.
class image_data
{
    constructor()
    {
        this.loaded_user_info = this.loaded_user_info.bind(this);

        this.illust_modified_callbacks = new callback_list();
        this.user_modified_callbacks = new callback_list();

        // Cached data:
        this.image_data = { };
        this.user_data = { };

        this.illust_loads = {};
        this.user_info_loads = {};
    };

    // Return the singleton, creating it if needed.
    static singleton()
    {
        if(image_data._singleton == null)
            image_data._singleton = new image_data();
        return image_data._singleton;
    };

    // Call all illust_modified callbacks.
    call_user_modified_callbacks(user_id)
    {
        console.log("User modified:", user_id);
        this.user_modified_callbacks.call(user_id);
    }

    call_illust_modified_callbacks(illust_id)
    {
        this.illust_modified_callbacks.call(illust_id);
    }

    // Get image data.  Call callback when it's available:
    //
    // callback(image_data, user_data);
    //
    // User data for the illustration will be fetched, and returned as image_data.userInfo.
    // Note that user data can change (eg. when following a user), and all images for the
    // same user will share the same userInfo object.
    //
    // If illust_id is a video, we'll also download the metadata before returning it, and store
    // it as image_data.ugoiraMetadata.
    get_image_info(illust_id)
    {
        if(illust_id == null)
            return null;

        // If we already have the image data, just return it.
        if(this.image_data[illust_id] != null && this.image_data[illust_id].userInfo)
        {
            return new Promise(resolve => {
                resolve(this.image_data[illust_id]);
            });
        }

        // If there's already a load in progress, just return it.
        if(this.illust_loads[illust_id] != null)
            return this.illust_loads[illust_id];
        
        var load_promise = this.load_image_info(illust_id);
        this._started_loading_image_info(illust_id, load_promise);
        return load_promise;
    }

    _started_loading_image_info(illust_id, load_promise)
    {
        this.illust_loads[illust_id] = load_promise;
        this.illust_loads[illust_id].then(() => {
            delete this.illust_loads[illust_id];
        });
    }
    
    // Like get_image_info, but return the result immediately.
    //
    // If the image info isn't loaded, don't start a request and just return null.
    get_image_info_sync(illust_id)
    {
        return this.image_data[illust_id];
    }

    // Load illust_id and all data that it depends on.
    //
    // If we already have the image data (not necessarily the rest, like ugoira_metadata),
    // it can be supplied with illust_data.
    async load_image_info(illust_id, illust_data)
    {
        // We need the illust data, user data, and ugoira metadata (for illustType 2).  (We could
        // load manga data too, but we currently let the manga view do that.)  We need to know the
        // user ID and illust type to start those loads.
        console.error("Fetching", illust_id);

        var user_info_promise = null;
        var manga_promise = null;
        var ugoira_promise = null;

        // Given a user ID and/or an illust_type (or null if either isn't known yet), start any
        // fetches we can.
        var start_loading = (user_id, illust_type, page_count) => {
            // If we know the user ID and haven't started loading user info yet, start it.
            if(user_info_promise == null && user_id != null)
                user_info_promise = this.get_user_info(user_id);
            
            // If we know the illust type and haven't started loading other data yet, start them.
            if(page_count != null && page_count > 1 && manga_promise == null)
                manga_promise = helpers.get_request("/ajax/illust/" + illust_id + "/pages", {});
            if(illust_type == 2 && ugoira_promise == null)
                ugoira_promise = helpers.get_request("/ajax/illust/" + illust_id + "/ugoira_meta");
        };

        // If we have thumbnail info, it tells us the user ID.  This lets us start loading
        // user info without waiting for the illustration data to finish loading first.
        // Don't fetch thumbnail info if it's not already loaded.
        var thumbnail_info = thumbnail_data.singleton().get_one_thumbnail_info(illust_id);
        if(thumbnail_info != null)
            start_loading(thumbnail_info.userId, thumbnail_info.illustType, thumbnail_info.pageCount);
    
        // If we don't have illust data, block while it loads.
        if(illust_data == null)
        {
            var illust_result_promise = helpers.get_request("/ajax/illust/" + illust_id, {});
            var illust_result = await illust_result_promise;
            if(illust_result == null || illust_result.error)
                return;
            illust_data = illust_result.body;
        }

        // Now that we have illust data, load anything we weren't able to load before.
        start_loading(illust_data.userId, illust_data.illustType, illust_data.pageCount);

        // Store the results.
        illust_data.userInfo = await user_info_promise;

        // If we're loading image info, we're almost definitely going to load the avatar, so
        // start preloading it now.
        helpers.preload_images([illust_data.userInfo.imageBig]);
        
        if(manga_promise != null)
        {
            var manga_info = await manga_promise;
            illust_data.mangaPages = manga_info.body;
        }

        if(ugoira_promise != null)
        {
            var ugoira_result = await ugoira_promise;
            illust_data.ugoiraMetadata = ugoira_result.body;
        }

        // If this is a single-page image, create a dummy single-entry mangaPages array.  This lets
        // us treat all images the same.
        if(illust_data.pageCount == 1)
        {
            illust_data.mangaPages = [{
                width: illust_data.width,
                height: illust_data.height,

                // Rather than just referencing illust_Data.urls, copy just the image keys that
                // exist in the regular mangaPages list (no thumbnails).
                urls: {
                    original: illust_data.urls.original,
                    regular: illust_data.urls.regular,
                    small: illust_data.urls.small,
                }
            }];
        }

        // Store the image data.
        this.image_data[illust_id] = illust_data;
        return illust_data;
    }

    // The user request can either return a small subset of data (just the username,
    // profile image URL, etc.), or a larger set with a webpage URL, Twitter, etc.
    // User preloads often only have the smaller set, and we want to use the preload
    // data whenever possible.
    //
    // getuser_info requests the smaller set of data, and get_user_info_full requests
    // the full data.
    //
    // Note that get_user_info will return the full data if we have it already.
    async get_user_info_full(user_id)
    {
        return await this._get_user_info(user_id, true);
    }

    async get_user_info(user_id)
    {
        return await this._get_user_info(user_id, false);
    }

    _get_user_info(user_id, load_full_data)
    {
        if(user_id == null)
            return null;

        // If we already have the user info for this illustration (and it's full data, if
        // requested), we're done.
        if(this.user_data[user_id] != null)
        {
            // user_info.partial is 1 if it's the full data (this is backwards).  If we need
            // full data and we only have partial data, we still need to request data.
            if(!load_full_data || this.user_data[user_id].partial)
            {
                return new Promise(resolve => {
                    resolve(this.user_data[user_id]);
                });
            }
        }

        // If there's already a load in progress, just return it.
        if(this.user_info_loads[user_id] != null)
            return this.user_info_loads[user_id];
       
        this.user_info_loads[user_id] = this.load_user_info(user_id);
        this.user_info_loads[user_id].then(() => {
            delete this.user_info_loads[user_id];
        });

        return this.user_info_loads[user_id];
    };
    
    async load_user_info(user_id)
    {
        // console.log("Fetch user", user_id);
        var result = await helpers.get_request("/ajax/user/" + user_id, {full:1});
        return this.loaded_user_info(result);
    }

    loaded_user_info(user_result)
    {
        if(user_result.error)
            return;

        var user_data = user_result.body;
        var user_id = user_data.userId;
        // console.log("Got user", user_id);

        // Store the user data.
        if(this.user_data[user_id] == null)
            this.user_data[user_id] = user_data;
        else
        {
            // If we already have an object for this user, we're probably replacing partial user data
            // with full user data.  Don't replace the user_data object itself, since widgets will have
            // a reference to the old one which will become stale.  Just replace the data inside the
            // object.
            var old_user_data = this.user_data[user_id];
            for(var key of Object.keys(old_user_data))
                delete old_user_data[key];
            for(var key of Object.keys(user_data))
                old_user_data[key] = user_data[key];
        }

        return user_data;
    }

    // Add image and user data to the cache that we received from other sources.  Note that if
    // we have any fetches in the air already, we'll leave them running.
    add_illust_data(illust_data)
    {
        var load_promise = this.load_image_info(illust_data.illustId, illust_data);
        this._started_loading_image_info(illust_data.illustId, load_promise);
    }

    add_user_data(user_data)
    {
        this.loaded_user_info({
            body: user_data,
        });
    }

    // Load bookmark tags and comments.
    //
    // There's no visible API to do this, so we have to scrape the bookmark_add page.  I wish
    // they'd just include this in bookmarkData.  Since this takes an extra request, we should
    // only load this if the user is viewing/editing bookmark tags.
    get_bookmark_details(illust_info)
    {
        var illust_id = illust_info.illustId;

        if(this.bookmark_details[illust_id] == null)
            this.bookmark_details[illust_id] = this.load_bookmark_details(illust_info);

        return this.bookmark_details[illust_id];
    }

    async load_bookmark_details(illust_info)
    {
        // Stop if this image isn't bookmarked.
        if(illust_info.bookmarkData == null)
            return;

        // Stop if this is already loaded.
        if(illust_info.bookmarkData.tags != null)
            return;

        var bookmark_page = await helpers.load_data_in_iframe("/bookmark_add.php?type=illust&illust_id=" + illust_info.illustId);

        // Stop if the image was unbookmarked while we were loading.
        if(illust_info.bookmarkData == null)
            return;

        var tags = bookmark_page.querySelector(".bookmark-detail-unit form input[name='tag']").value;
        var comment = bookmark_page.querySelector(".bookmark-detail-unit form input[name='comment']").value;
        tags = tags.split(" ");
        tags = tags.filter((value) => { return value != ""; });

        illust_info.bookmarkData.tags = tags;
        illust_info.bookmarkData.comment = comment;
     }
}

// View img fullscreen.  Clicking the image will zoom it to its original size and scroll
// it around.
//
// The image is always zoomed a fixed amount from its fullscreen size.  This is generally
// more usable than doing things like zooming based on the native resolution.
class on_click_viewer
{
    constructor()
    {
        this.onresize = this.onresize.bind(this);
        this.pointerdown = this.pointerdown.catch_bind(this);
        this.pointerup = this.pointerup.bind(this);
        this.pointermove = this.pointermove.bind(this);
        this.block_event = this.block_event.bind(this);
        this.window_blur = this.window_blur.bind(this);

        this._zoom_levels = [null, 2, 4, 8, 1];
        this._relative_zoom_level = 0;

        // The caller can set this to a function to be called if the user clicks the image without
        // dragging.
        this.clicked_without_scrolling = null;

        this.original_width = 1;
        this.original_height = 1;

        this.zoom_pos = [0, 0];
        this._zoom_level = helpers.get_value("zoom-level", 1);

        // Restore the most recent zoom mode.  We assume that there's only one of these on screen.
        this.locked_zoom = helpers.get_value("zoom-mode") != "normal";
        this._relative_zoom_level = helpers.get_value("zoom-level-relative") || 0;
    }

    set_new_image(img, width, height)
    {
        if(this.img != null)
        {
            // Don't call this.disable, so we don't exit zoom.
            this._remove_events();
            this.img.remove();
        }

        this.img = img;
        this.original_width = width;
        this.original_height = height;

        if(this.img == null)
            return;

        this._add_events();

        // If we've never set an image position, do it now.
        if(!this.set_initial_image_position)
        {
            this.set_initial_image_position = true;
            this.set_image_position(
                    [this.img.parentNode.offsetWidth / 2, 0],
                    [this.width * 0.5, 0]);
        }

        this.reposition();
    }

    block_event(e)
    {
        e.preventDefault();
    }

    enable()
    {
        this._add_events();
    }

    _add_events()
    {
        var target = this.img.parentNode;
        this.event_target = target;
        window.addEventListener("blur", this.window_blur);
        window.addEventListener("resize", this.onresize, true);
        target.addEventListener("pointerdown", this.pointerdown);
        target.addEventListener("pointerup", this.pointerup);
        target.addEventListener("dragstart", this.block_event);
        target.addEventListener("selectstart", this.block_event);

        target.style.userSelect = "none";
        target.style.MozUserSelect = "none";
    }

    _remove_events()
    {
        if(this.event_target)
        {
            var target = this.event_target;
            this.event_target = null;
            target.removeEventListener("pointerdown", this.pointerdown);
            target.removeEventListener("pointerup", this.pointerup);
            target.removeEventListener("dragstart", this.block_event);
            target.removeEventListener("selectstart", this.block_event);
            target.style.userSelect = "none";
            target.style.MozUserSelect = "";
        }

        window.removeEventListener("blur", this.window_blur);
        window.removeEventListener("resize", this.onresize, true);
    }

    disable()
    {
        this.stop_dragging();
        this._remove_events();
    }

    onresize(e)
    {
        this.reposition();
    }

    window_blur(e)
    {
        this.stop_dragging();
    }

    // Enable or disable zoom lock.
    get locked_zoom()
    {
        return this._locked_zoom;
    }

    // Select between click-pan zooming and sticky, filled-screen zooming.
    set locked_zoom(enable)
    {
        this._locked_zoom = enable;
        helpers.set_value("zoom-mode", enable? "locked":"normal");
        this.reposition();
    }

    get zoom_level()
    {
        return this._zoom_level;
    }

    // Set the main zoom level.
    set zoom_level(value)
    {
        if(this._zoom_level == value)
            return;
        this._zoom_level = helpers.clamp(value, 0, this._zoom_levels.length - 1);

        // Save the new zoom level.
        helpers.set_value("zoom-level", this._zoom_level);
        
        this.reposition();
    }

    // Relative zoom is applied on top of the main zoom.  At 0, no adjustment is applied.
    // Positive values zoom in and negative values zoom out.
    get relative_zoom_level()
    {
        return this._relative_zoom_level;
    }

    set relative_zoom_level(value)
    {
        value = helpers.clamp(value, -8, +8);

        this._relative_zoom_level = value;
        helpers.set_value("zoom-level-relative", this._relative_zoom_level);
        this.reposition();
    }
    
    // Return the zoom factor applied by relative zoom.
    get relative_zoom_factor()
    {
        return Math.pow(1.5, this._relative_zoom_level);
    }

    // Return the active zoom ratio.
    //
    // This is the main and relative zooms combined.
    get _effective_zoom_level()
    {
        if(!this.zoom_active)
            return 1;

        var ratio = this._zoom_levels[this._zoom_level];

        // The null entry is for screen fill zooming.
        if(ratio == null)
        {
            var screen_width = this.img.parentNode.offsetWidth;
            var screen_height = this.img.parentNode.offsetHeight;
            ratio = Math.max(screen_width/this.width, screen_height/this.height);
        }

        ratio *= this.relative_zoom_factor;

        return ratio;
    }

    // Given a screen position, return the normalized position relative to the image.
    // (0,0) is the top-left of the image and (1,1) is the bottom-right.
    get_image_position(screen_pos)
    {
        // zoom_pos shifts the image around in screen space.
        var zoom_center = [0,0];
        if(this.zoom_active)
        {
            zoom_center[0] -= this.zoom_pos[0];
            zoom_center[1] -= this.zoom_pos[1];
        }
        zoom_center[0] += screen_pos[0];
        zoom_center[1] += screen_pos[1];

        // Offset by the base screen position we're in when not zoomed (centered).
        var screen_width = this.img.parentNode.offsetWidth;
        var screen_height = this.img.parentNode.offsetHeight;
        zoom_center[0] -= (screen_width - this.width) / 2;
        zoom_center[1] -= (screen_height - this.height) / 2;

        // Scale from the current zoom level to the effective size.
        var zoom_level = this._effective_zoom_level;
        zoom_center[0] /= zoom_level;
        zoom_center[1] /= zoom_level;
        
        return zoom_center;
    }

    // Given a screen position and a point on the image, align the point to the screen
    // position.  This has no effect when we're not zoomed.
    set_image_position(screen_pos, zoom_center)
    {
        if(!this.zoom_active)
            return;

        // This just does the inverse of get_image_position.
        zoom_center = [zoom_center[0], zoom_center[1]];

        var zoom_level = this._effective_zoom_level;
        zoom_center[0] *= zoom_level;
        zoom_center[1] *= zoom_level;

        // make this relative to zoom_pos, since that's what we need to set it back to below
        var screen_width = this.img.parentNode.offsetWidth;
        var screen_height = this.img.parentNode.offsetHeight;
        zoom_center[0] += (screen_width - this.width) / 2;
        zoom_center[1] += (screen_height - this.height) / 2;

        zoom_center[0] -= screen_pos[0];
        zoom_center[1] -= screen_pos[1];

        this.zoom_pos = [-zoom_center[0], -zoom_center[1]];

        this.reposition();
    }

    pointerdown(e)
    {
        if(e.button != 0)
            return;

        // We only want clicks on the image, or on the container backing the image, not other
        // elements inside the container.
        if(e.target != this.img && e.target != this.img.parentNode)
            return;

        this.event_target.style.cursor = "none";

        // Don't show the UI if the mouse hovers over it while dragging.
        document.body.classList.add("hide-ui");

        if(!this._locked_zoom)
            var zoom_center_percent = this.get_image_position([e.pageX, e.pageY]);

        this.zoomed = true;
        this.dragged_while_zoomed = false;

        this.captured_pointer_id = e.pointerId;
        this.img.setPointerCapture(this.captured_pointer_id);

        // If this is a click-zoom, align the zoom to the point on the image that
        // was clicked.
        if(!this._locked_zoom)
            this.set_image_position([e.pageX, e.pageY], zoom_center_percent);

        this.reposition();

        // Only listen to pointermove while we're dragging.
        this.event_target.addEventListener("pointermove", this.pointermove);
    }

    pointerup(e)
    {
        if(e.button != 0)
            return;

        if(!this.zoomed)
            return;

        // Tell hide_mouse_cursor_on_idle that the mouse cursor should be hidden, even though the
        // cursor may have just been moved.  This prevents the cursor from appearing briefly and
        // disappearing every time a zoom is released.
        window.dispatchEvent(new Event("hide-cursor-immediately"));
        
        this.stop_dragging();
    }

    stop_dragging()
    {
        if(this.event_target != null)
        {
            this.event_target.removeEventListener("pointermove", this.pointermove);
            this.event_target.style.cursor = "";
        }

        if(this.captured_pointer_id != null)
        {
            this.img.releasePointerCapture(this.captured_pointer_id);
            this.captured_pointer_id = null;
        }
        
        document.body.classList.remove("hide-ui");
        
        this.zoomed = false;
        this.reposition();
        
        if(!this.dragged_while_zoomed && this.clicked_without_scrolling)
            this.clicked_without_scrolling();
    }

    pointermove(e)
    {
        if(!this.zoomed)
            return;

        // If button 1 isn't pressed, treat this as a pointerup.  (The pointer events API
        // is really poorly designed in its handling of multiple button presses.)
        if((e.buttons & 1) == 0)
        {
            this.pointerup(e);
            return;
        }

        this.dragged_while_zoomed = true;

        // Apply mouse dragging.
        var x_offset = e.movementX;
        var y_offset = e.movementY;
       
        // Scale movement by the zoom level.
        var zoom_level = this._effective_zoom_level;
        this.zoom_pos[0] += x_offset * -1 * zoom_level;
        this.zoom_pos[1] += y_offset * -1 * zoom_level;

        this.reposition();
    }

    // Return true if zooming is active.
    get zoom_active()
    {
        return this.zoomed || this._locked_zoom;
    }

    get _image_to_screen_ratio()
    {
        var screen_width = this.img.parentNode.offsetWidth;
        var screen_height = this.img.parentNode.offsetHeight;

        // In case we're hidden and have no width, make sure we don't return an invalid value.
        if(screen_width == 0 || screen_height == 0)
            return 1;

        return Math.min(screen_width/this.original_width, screen_height/this.original_height);
    }
    
    // Return the width and height of the image when at 1x zoom.
    get width() { return this.original_width * this._image_to_screen_ratio; }
    get height() { return this.original_height * this._image_to_screen_ratio; }

    reposition()
    {
        if(this.img == null)
            return;

        // Stop if we're being called after being disabled.
        if(this.img.parentNode == null)
            return;

        var screen_width = this.img.parentNode.offsetWidth;
        var screen_height = this.img.parentNode.offsetHeight;
        var width = this.width;
        var height = this.height;

        // If the dimensions are empty then we aren't loaded.  Stop now, so the math
        // below doesn't break.
        if(width == 0 || height == 0 || this.img.parentNode.offsetWidth == 0 || this.img.parentNode.offsetHeight == 0)
            return;

        // Normally (when unzoomed), the image is centered.
        var left = (screen_width - width) / 2;
        var top = (screen_height - height) / 2;

        if(this.zoom_active) {
            // Shift by the zoom position.
            left += this.zoom_pos[0];
            top += this.zoom_pos[1];

            // Apply the zoom.
            var zoom_level = this._effective_zoom_level;
            height *= zoom_level;
            width *= zoom_level;

            if(this._zoom_levels[this._zoom_level] == null)
            {
                // When we're zooming to fill the screen, clamp panning to the screen, so we always fill the
                // screen and don't pan past the edge.  If we're narrower than the screen, lock to center.
                var orig_top = top, orig_left = left;
                if(screen_height < height)
                    top  = helpers.clamp(top, -(height - screen_height), 0); // clamp to the top and bottom
                else
                    top  = -(height - screen_height) / 2; // center vertically
                if(screen_width < width)
                    left = helpers.clamp(left, -(width - screen_width), 0); // clamp to the left and right
                else
                    left = -(width - screen_width) / 2; // center horizontally

                // Apply any clamping we did to the position to zoom_pos too, so if you move the
                // mouse far beyond the edge, you don't have to move it all the way back before we
                // start panning again.
                this.zoom_pos[0] += left - orig_left;
                this.zoom_pos[1] += top - orig_top;
            }
        }

        left = Math.round(left);
        top = Math.round(top);
        width = Math.round(width);
        height = Math.round(height);
        this.img.style.width = width + "px";
        this.img.style.height = height + "px";
        this.img.style.position = "absolute";
        this.img.style.left = left + "px";
        this.img.style.top = top + "px";
        this.img.style.right = "auto";
        this.img.style.bottom = "auto";
    }
}

var install_polyfills = function()
{
    // Return true if name exists, eg. GM_xmlhttpRequest.
    var script_global_exists = function(name)
    {
        // For some reason, the script globals like GM and GM_xmlhttpRequest aren't
        // in window, so it's not clear how to check if they exist.  Just try to
        // access it and catch the ReferenceError exception if it doesn't exist.
        try {
            eval(name);
            return true;
        } catch(e) {
            return false;
        }
    };

    // If we have GM.xmlHttpRequest and not GM_xmlhttpRequest, set GM_xmlhttpRequest.
    if(script_global_exists("GM") && GM.xmlHttpRequest && !script_global_exists("GM_xmlhttpRequest"))
        window.GM_xmlhttpRequest = GM.xmlHttpRequest;

    // padStart polyfill:
    // https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
    if(!String.prototype.padStart) {
        String.prototype.padStart = function padStart(targetLength,padString) {
            targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
            padString = String((typeof padString !== 'undefined' ? padString : ' '));
            if (this.length > targetLength) {
                return String(this);
            }
            else {
                targetLength = targetLength-this.length;
                if (targetLength > padString.length) {
                    padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
                }
                return padString.slice(0,targetLength) + String(this);
            }
        };
    }

    // This isn't really a polyfill, but we treat it like one for convenience.
    //
    // When functions called from event handlers throw exceptions, GreaseMonkey usually forgets
    // to log them to the console, probably sending them to some inconvenient browser-level log
    // instead.  Work around some of this.  func.catch_bind is like func.bind, but also wraps
    // the function in an exception handler to log errors correctly.  The exception will still
    // be raised.
    //
    // This is only needed in Firefox, and we just point it at bind() otherwise.
    if(navigator.userAgent.indexOf("Firefox") == -1)
    {
        Function.prototype.catch_bind = Function.prototype.bind;
    } else {
        Function.prototype.catch_bind = function()
        {
            var func = this;
            var self = arguments[0];
            var bound_args = Array.prototype.slice.call(arguments, 1);
            var wrapped_func = function()
            {
                try {
                    var called_args = Array.prototype.slice.call(arguments, 0);
                    var args = bound_args.concat(called_args);
                    return func.apply(self, args);
                } catch(e) {
                    console.error(e);
                    throw e;
                }
            };
            return wrapped_func;
        };
    }

    if(!("requestFullscreen" in Element.prototype))
    {
        // Web API prefixing needs to be shot into the sun.
        if("webkitRequestFullScreen" in Element.prototype)
        {
            Element.prototype.requestFullscreen = Element.prototype.webkitRequestFullScreen;
            HTMLDocument.prototype.exitFullscreen = HTMLDocument.prototype.webkitCancelFullScreen;
            Object.defineProperty(HTMLDocument.prototype, "fullscreenElement", {
                get: function() { return this.webkitFullscreenElement; }
            });
        }
        else if("mozRequestFullScreen" in Element.prototype)
        {
            Element.prototype.requestFullscreen = Element.prototype.mozRequestFullScreen;
            HTMLDocument.prototype.exitFullscreen = HTMLDocument.prototype.mozCancelFullScreen;
            Object.defineProperty(HTMLDocument.prototype, "fullscreenElement", {
                get: function() { return this.mozFullScreenElement; }
            });
        }
    }
}

// A simple progress bar.
//
// Call bar.controller() to create a controller to update the progress bar.
class progress_bar
{
    constructor(container)
    {
        this.container = container;

        this.bar = this.container.appendChild(helpers.create_node('\
            <div class=progress-bar> \
            </div> \
        '));

        this.bar.hidden = true;
    };

    // Create a progress_bar_controller for this progress bar.
    //
    // If there was a previous controller, it will be detached.
    controller()
    {
        if(this.current_controller)
        {
            this.current_controller.detach();
            this.current_controller = null;
        }

        this.current_controller = new progress_bar_controller(this);
        return this.current_controller;
    }
}

// This handles updating a progress_bar.
//
// This is separated from progress_bar, which allows us to transparently detach
// the controller from a progress_bar.
//
// For example, if we load a video file and show the loading in the progress bar, and
// the user then navigates to another video, we detach the first controller.  This way,
// the new load will take over the progress bar (whether or not we actually cancel the
// earlier load) and progress bar users won't fight with each other.
class progress_bar_controller
{
    constructor(bar)
    {
        this.progress_bar = bar;
    }

    set(value)
    {
        if(this.progress_bar == null)
            return;

        this.progress_bar.bar.hidden = (value == null);
        this.progress_bar.bar.classList.remove("hide");
        this.progress_bar.bar.getBoundingClientRect();
        if(value != null)
            this.progress_bar.bar.style.width = (value * 100) + "%";
    }

    // Flash the current progress value and fade out.
    show_briefly()
    {
        this.progress_bar.bar.classList.add("hide");
    }

    detach()
    {
        this.progress_bar = null;
    }
};
class seek_bar
{
    constructor(container)
    {
        this.mousedown = this.mousedown.bind(this);
        this.mouseup = this.mouseup.bind(this);
        this.mousemove = this.mousemove.bind(this);
        this.mouseover = this.mouseover.bind(this);
        this.mouseout = this.mouseout.bind(this);

        this.container = container;

        this.bar = this.container.appendChild(helpers.create_node('\
            <div class="seek-bar visible"> \
                <div class=seek-empty> \
                    <div class=seek-fill></div> \
                </div> \
            </div> \
        '));

        this.bar.addEventListener("mousedown", this.mousedown);
        this.bar.addEventListener("mouseover", this.mouseover);
        this.bar.addEventListener("mouseout", this.mouseout);

        this.current_time = 0;
        this.duration = 1;
        this.refresh_visibility();
        this.refresh();
        this.set_callback(null);
    };

    mousedown(e)
    {
        // Never start dragging while we have no callback.  This generally shouldn't happen
        // since we should be hidden.
        if(this.callback == null)
            return;

        if(this.dragging)
            return;

        console.log("down");
        this.dragging = true;
        helpers.set_class(this.bar, "dragging", this.dragging);
        this.refresh_visibility();

        // Only listen to mousemove while we're dragging.  Put this on window, so we get drags outside
        // the window.
        window.addEventListener("mousemove", this.mousemove);
        window.addEventListener("mouseup", this.mouseup);

        this.set_drag_pos(e);
    }

    mouseover()
    {
        this.hovering = true;
        this.refresh_visibility();
    }

    mouseout()
    {
        this.hovering = false;
        this.refresh_visibility();
    }

    refresh_visibility()
    {
        // Show the seek bar if the mouse is over it, or if we're actively dragging.
        // Only show if we're active.
        var visible = this.callback != null && (this.hovering || this.dragging);
        helpers.set_class(this.bar, "visible", visible);
    }

    stop_dragging()
    {
        if(!this.dragging)
            return;

        this.dragging = false;
        helpers.set_class(this.bar, "dragging", this.dragging);
        this.refresh_visibility();

        window.removeEventListener("mousemove", this.mousemove);
        window.removeEventListener("mouseup", this.mouseup);

        if(this.callback)
            this.callback(false, null);
    }

    mouseup(e)
    {
        this.stop_dragging();
    }

    mousemove(e)
    {
        this.set_drag_pos(e);
    }

    // The user clicked or dragged.  Pause and seek to the clicked position.
    set_drag_pos(e)
    {
        // Get the mouse position relative to the seek bar.
        var bounds = this.bar.getBoundingClientRect();
        var pos = (e.clientX - bounds.left) / bounds.width;
        pos = Math.max(0, Math.min(1, pos));
        var time = pos * this.duration;

        // Tell the user to seek.
        this.callback(true, time);
    }

    // Set the callback.  callback(pause, time) will be called when the user interacts
    // with the seek bar.  The first argument is true if the video should pause (because
    // the user is dragging the seek bar), and time is the desired playback time.  If callback
    // is null, remove the callback.
    set_callback(callback)
    {
        this.bar.hidden = callback == null;
        if(this.callback == callback)
            return;

        // Stop dragging on any previous caller before we replace the callback.
        if(this.callback != null)
            this.stop_dragging();

        this.callback = callback;
        this.refresh_visibility();
    };

    set_duration(seconds)
    {
        this.duration = seconds;
        this.refresh();
    };

    set_current_time(seconds)
    {
        this.current_time = seconds;
        this.refresh();
    };

    refresh()
    {
        var position = this.duration > 0.0001? (this.current_time / this.duration):0;
        this.bar.querySelector(".seek-fill").style.width = (position * 100) + "%";
    };
}

// https://github.com/lyngklip/structjs/blob/master/struct.js
// The MIT License (MIT)
// Copyright (c) 2016 Aksel Jensen (TheRealAksel at github)

// This is completely unreadable.  Why would anyone write JS like this?

/*eslint-env es6, node*/
struct = (function() {
    const rechk = /^([<>])?(([1-9]\d*)?([xcbB?hHiIfdsp]))*$/
    const refmt = /([1-9]\d*)?([xcbB?hHiIfdsp])/g
    const str = (v,o,c) => String.fromCharCode(
        ...new Uint8Array(v.buffer, v.byteOffset + o, c))
    const rts = (v,o,c,s) => new Uint8Array(v.buffer, v.byteOffset + o, c)
        .set(s.split('').map(str => str.charCodeAt(0)))
    const pst = (v,o,c) => str(v, o + 1, Math.min(v.getUint8(o), c - 1))
    const tsp = (v,o,c,s) => { v.setUint8(o, s.length); rts(v, o + 1, c - 1, s) }
    const lut = le => ({
        x: c=>[1,c,0],
        c: c=>[c,1,o=>({u:v=>str(v, o, 1)      , p:(v,c)=>rts(v, o, 1, c)     })],
        '?': c=>[c,1,o=>({u:v=>Boolean(v.getUint8(o)),p:(v,B)=>v.setUint8(o,B)})],
        b: c=>[c,1,o=>({u:v=>v.getInt8(   o   ), p:(v,b)=>v.setInt8(   o,b   )})],
        B: c=>[c,1,o=>({u:v=>v.getUint8(  o   ), p:(v,B)=>v.setUint8(  o,B   )})],
        h: c=>[c,2,o=>({u:v=>v.getInt16(  o,le), p:(v,h)=>v.setInt16(  o,h,le)})],
        H: c=>[c,2,o=>({u:v=>v.getUint16( o,le), p:(v,H)=>v.setUint16( o,H,le)})],
        i: c=>[c,4,o=>({u:v=>v.getInt32(  o,le), p:(v,i)=>v.setInt32(  o,i,le)})],
        I: c=>[c,4,o=>({u:v=>v.getUint32( o,le), p:(v,I)=>v.setUint32( o,I,le)})],
        f: c=>[c,4,o=>({u:v=>v.getFloat32(o,le), p:(v,f)=>v.setFloat32(o,f,le)})],
        d: c=>[c,8,o=>({u:v=>v.getFloat64(o,le), p:(v,d)=>v.setFloat64(o,d,le)})],
        s: c=>[1,c,o=>({u:v=>str(v,o,c), p:(v,s)=>rts(v,o,c,s.slice(0,c    ) )})],
        p: c=>[1,c,o=>({u:v=>pst(v,o,c), p:(v,s)=>tsp(v,o,c,s.slice(0,c - 1) )})]
    })
    const errbuf = new RangeError("Structure larger than remaining buffer")
    const errval = new RangeError("Not enough values for structure")
    const struct = format => {
        let fns = [], size = 0, m = rechk.exec(format)
        if (!m) { throw new RangeError("Invalid format string") }
        const t = lut('<' === m[1]), lu = (n, c) => t[c](n ? parseInt(n, 10) : 1)
        while ((m = refmt.exec(format))) { ((r, s, f) => {
            for (let i = 0; i < r; ++i, size += s) { if (f) {fns.push(f(size))} }
        })(...lu(...m.slice(1)))}
        const unpack_from = (arrb, offs) => {
            if (arrb.byteLength < (offs|0) + size) { throw errbuf }
            let v = new DataView(arrb, offs|0)
            return fns.map(f => f.u(v))
        }
        const pack_into = (arrb, offs, ...values) => {
            if (values.length < fns.length) { throw errval }
            if (arrb.byteLength < offs + size) { throw errbuf }
            const v = new DataView(arrb, offs)
            new Uint8Array(arrb, offs, size).fill(0)
            fns.forEach((f, i) => f.p(v, values[i]))
        }
        const pack = (...values) => {
            let b = new ArrayBuffer(size)
            pack_into(b, 0, ...values)
            return b
        }
        const unpack = arrb => unpack_from(arrb, 0)
        function* iter_unpack(arrb) { 
            for (let offs = 0; offs + size <= arrb.byteLength; offs += size) {
                yield unpack_from(arrb, offs);
            }
        }
        return Object.freeze({
            unpack, pack, unpack_from, pack_into, iter_unpack, format, size})
    }
    return struct;
})();

/*
const pack = (format, ...values) => struct(format).pack(...values)
const unpack = (format, buffer) => struct(format).unpack(buffer)
const pack_into = (format, arrb, offs, ...values) =>
    struct(format).pack_into(arrb, offs, ...values)
const unpack_from = (format, arrb, offset) =>
    struct(format).unpack_from(arrb, offset)
const iter_unpack = (format, arrb) => struct(format).iter_unpack(arrb)
const calcsize = format => struct(format).size
module.exports = {
    struct, pack, unpack, pack_into, unpack_from, iter_unpack, calcsize }
*/

// Encode a Pixiv video to MJPEG, using an MKV container.
//
// Other than having to wrangle the MKV format, this is easy: the source files appear to always
// be JPEGs, so we don't need to do any conversions and the encoding is completely lossless (other
// than the loss Pixiv forces by reencoding everything to JPEG).  The result is standard and plays
// in eg. VLC, but it's not a WebM file and browsers don't support it.
var ugoira_downloader_mjpeg = function(illust_data, progress)
{
    this.illust_data = illust_data;
    this.progress = progress;

    // We don't need image data, but we make a dummy canvas to make ZipImagePlayer happy.
    var canvas = document.createElement("canvas");

    // Create a ZipImagePlayer.  This will download the ZIP, and handle parsing the file.
    this.player = new ZipImagePlayer({
        "metadata": illust_data.ugoiraMetadata,
        "source": illust_data.ugoiraMetadata.originalSrc,
        "mime_type": illust_data.ugoiraMetadata.mime_type,
        "canvas": canvas,
        "progress": this.zip_finished_loading.bind(this),
    });            
}

ugoira_downloader_mjpeg.prototype.zip_finished_loading = function(progress)
{
    if(this.progress)
    {
        try {
            this.progress.set(progress);
        } catch(e) {
            console.error(e);
        }
    }

    // We just want to know when the ZIP has been completely downloaded, which is indicated when progress
    // finishes.
    if(progress != null)
        return;

    // Some posts have the wrong dimensions in illust_data (63162632).  If we use it, the resulting
    // file won't play.  Decode the first image to find the real resolution.
    var img = document.createElement("img");
    var blob = new Blob([this.player.getFrameData(0)], {type: this.player.op.metadata.mime_type || "image/png"});
    var first_frame_url = URL.createObjectURL(blob);
    img.src = first_frame_url;

    img.onload = (e) =>
    {
        URL.revokeObjectURL(first_frame_url);
        this.continue_saving(img.naturalWidth, img.naturalHeight)
    };
}

ugoira_downloader_mjpeg.prototype.continue_saving = function(width, height)
{
    try {
        var encoder = new encode_mkv(width, height);
        
        // Add each frame to the encoder.
        var frame_count = this.illust_data.ugoiraMetadata.frames.length;
        for(var frame = 0; frame < frame_count; ++frame)
        {
            var frame_data = this.player.getFrameData(frame);
            encoder.add(frame_data, this.player.getFrameNoDuration(frame));
        };

        // There's no way to encode the duration of the final frame of an MKV, which means the last frame
        // will be effectively lost when looping.  In theory the duration field on the file should tell the
        // player this, but at least VLC doesn't do that.
        //
        // Work around this by repeating the last frame with a zero duration.
        //
        // In theory we could set the "invisible" bit on this frame ("decoded but not displayed"), but that
        // doesn't seem to be used, at least not by VLC.
        var frame_data = this.player.getFrameData(frame_count-1);
        encoder.add(frame_data, 0);
        
        // Build the file.
        var mkv = encoder.build();
        var filename = this.illust_data.userInfo.name + " - " + this.illust_data.illustId + " - " + this.illust_data.illustTitle + ".mkv";
        helpers.save_blob(mkv, filename);
    } catch(e) {
        console.error(e);
    };
};

// This is the base class for viewer classes, which are used to view a particular
// type of content in the main display.
class viewer
{
    constructor(container, illust_data)
    {
        this.illust_data = illust_data;
    }

    // Remove any event listeners, nodes, etc. and shut down so a different viewer can
    // be used.
    shutdown() { }

    set page(page) { }
    get page() { return 0; }

    // Return the file type for display in the UI, eg. "PNG".
    get current_image_type() { return null; }

    // If an image is displayed, clear it.
    //
    // This is only used with the illust viewer when changing manga pages in cases
    // where we don't want the old image to be displayed while the new one loads.
    set hide_image(value) { }
    get hide_image() { return false; }
}

// This is the viewer for static images.  We take an illust_data and show
// either a single image or navigate between an image sequence.
class viewer_images extends viewer
{
    constructor(container, illust_data, options)
    {
        super(container, illust_data);

        this.container = container;
        this.options = options || {};
        this.manga_page_bar = options.manga_page_bar;
        this.onkeydown = this.onkeydown.bind(this);

        this.blank_image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

        this.index = options.manga_page || 0;

        // Create a click and drag viewer for the image.
        this.on_click_viewer = new on_click_viewer();

        main_context_menu.get.on_click_viewer = this.on_click_viewer;

        // Make a list of image URLs we're viewing.
        this.images = [];

        // If there are multiple pages, get image info from mangaPages.  Otherwise, use
        // the main image.
        for(var page of illust_data.mangaPages)
        {
            this.images.push({
                url: page.urls.original,
                width: page.width,
                height: page.height,
            });
        }

        this.refresh();
    }

    get current_image_type()
    {
        var url;
        if(this.illust_data.illustType != 2 && this.illust_data.pageCount == 1)
            url = this.illust_data.urls.original;
        else
            url = this.img.src;
        return helpers.get_extension(url).toUpperCase();
    }
    
    
    shutdown()
    {
        if(this.on_click_viewer)
        {
            this.on_click_viewer.disable();
            this.on_click_viewer = null;
        }

        if(this.img.parentNode)
            this.img.parentNode.removeChild(this.img);

        main_context_menu.get.on_click_viewer = null;
    }

    get page()
    {
        return this.index;
    }

    set page(page)
    {
        this.index = page;
        this.refresh();
    }

    refresh()
    {
        var current_image = this.images[this.index];
        if(this.on_click_viewer && this.img && this.img.src == current_image.url)
            return;

        // Create the new image and pass it to the viewer.
        this._create_image(current_image.url, current_image.width, current_image.height);
        
        // Decode the next and previous image.  This reduces flicker when changing pages
        // since the image will already be decoded.
        if(this.index > 0)
            helpers.decode_image(this.images[this.index - 1].url);
        if(this.index + 1 < this.images.length)
            helpers.decode_image(this.images[this.index + 1].url);

        // If we have a manga_page_bar, update to show the current page.
        if(this.manga_page_bar)
        {
            if(this.images.length == 1)
                this.manga_page_bar.set(null);
            else
                this.manga_page_bar.set((this.index+1) / this.images.length);
        }
    }

    _create_image(url, width, height)
    {
        if(this.img)
        {
            this.img.remove();
            this.img = null;
        }

        this.img = document.createElement("img");
        this.img.src = url;
        this.img.className = "filtering";

        this.container.appendChild(this.img);
        this.on_click_viewer.set_new_image(this.img, width, height);
    }

    onkeydown(e)
    {
        switch(e.keyCode)
        {
        case 36: // home
            e.stopPropagation();
            e.preventDefault();
            main_controller.singleton.show_illust(this.illust_data.id, {
                manga_page: 0,
            });
            return;

        case 35: // end
            e.stopPropagation();
            e.preventDefault();
            main_controller.singleton.show_illust(this.illust_data.id, {
                manga_page: this.illust_data.pageCount - 1,
            });
            return;
        }
    }
}
// This is used to display a muted image.
class viewer_muted extends viewer
{
    constructor(container, illust_data)
    {
        super(container, illust_data);

        this.container = container;

        // Create the display.
        this.root = helpers.create_from_template(".template-muted");
        container.appendChild(this.root);

        // Show the user's avatar instead of the muted image.
        var img = this.root.querySelector(".muted-image");
        img.src = illust_data.userInfo.imageBig;

        var muted_tag = muting.singleton.any_tag_muted(illust_data.tags.tags);
        var muted_user = muting.singleton.is_muted_user_id(illust_data.userId);

        var muted_label = this.root.querySelector(".muted-label");
        if(muted_tag)
            muted_label.innerText = muted_tag;
        else
            muted_label.innerText = illust_data.userInfo.name;
    }

    shutdown()
    {
        this.root.parentNode.removeChild(this.root);
    }
}

class viewer_ugoira extends viewer
{
    constructor(container, illust_data, seek_bar, options)
    {
        super(container, illust_data);
        
        console.log("create player:", illust_data.illustId);

        this.refresh_focus = this.refresh_focus.bind(this);
        this.clicked_canvas = this.clicked_canvas.bind(this);
        this.onkeydown = this.onkeydown.bind(this);
        this.drew_frame = this.drew_frame.bind(this);
        this.progress = this.progress.bind(this);
        this.seek_callback = this.seek_callback.bind(this);

        this.container = container;
        this.options = options;

        this.seek_bar = seek_bar;

        // Create an image to display the static image while we load.
        this.preview_img = document.createElement("img");
        this.preview_img.className = "filtering";
        this.preview_img.style.width = "100%";
        this.preview_img.style.height = "100%";
        this.preview_img.style.objectFit = "contain";
        this.preview_img.src = illust_data.urls.original;
        this.container.appendChild(this.preview_img);

        // Create a canvas to render into.
        this.canvas = document.createElement("canvas");
        this.canvas.hidden = true;
        this.canvas.className = "filtering";
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.canvas.style.objectFit = "contain";
        this.container.appendChild(this.canvas);

        this.canvas.addEventListener("click", this.clicked_canvas, false);

        // True if we want to play if the window has focus.  We always pause when backgrounded.
        this.want_playing = true;

        // True if the user is seeking.  We temporarily pause while seeking.  This is separate
        // from this.want_playing so we stay paused after seeking if we were paused at the start.
        this.seeking = false;

        window.addEventListener("visibilitychange", this.refresh_focus);

        // Create the player.
        this.player = new ZipImagePlayer({
            "metadata": illust_data.ugoiraMetadata,
            "autoStart": false,
            "source": illust_data.ugoiraMetadata.originalSrc,
            "mime_type": illust_data.ugoiraMetadata.mime_type,
            "autosize": true,
            "canvas": this.canvas,
            "loop": true,
            "debug": false,
            "progress": this.progress,
            drew_frame: this.drew_frame,
        });            

        this.refresh_focus();
    }

    progress(value)
    {
        if(this.options.progress_bar)
            this.options.progress_bar.set(value);

        if(value == null)
        {
            // Once we send "finished", don't make any more progress calls.
            this.options.progress_bar = null;

            // Enable the seek bar once loading finishes.
            if(this.seek_bar)
                this.seek_bar.set_callback(this.seek_callback);
        }
    }

    // Once we draw a frame, hide the preview and show the canvas.  This avoids
    // flicker when the first frame is drawn.
    drew_frame()
    {
        this.preview_img.hidden = true;
        this.canvas.hidden = false;

        if(this.seek_bar)
        {
            // Update the seek bar.
            var frame_time = this.player.getCurrentFrameTime();
            this.seek_bar.set_current_time(this.player.getCurrentFrameTime());
            this.seek_bar.set_duration(this.player.getTotalDuration());
        }
    }

    // This is sent manually by the UI handler so we can control focus better.
    onkeydown(e)
    {
        if(e.keyCode >= 49 && e.keyCode <= 57)
        {
            // 5 sets the speed to default, 1234 slow the video down, and 6789 speed it up.
            e.stopPropagation();
            e.preventDefault();
            if(!this.player)
                return;

            var speed;
            switch(e.keyCode)
            {
            case 49: speed = 0.10; break; // 1
            case 50: speed = 0.25; break; // 2
            case 51: speed = 0.50; break; // 3
            case 52: speed = 0.75; break; // 4
            case 53: speed = 1.00; break; // 5
            case 54: speed = 1.25; break; // 6
            case 55: speed = 1.50; break; // 7
            case 56: speed = 1.75; break; // 8
            case 57: speed = 2.00; break; // 9
            }

            this.player.setSpeed(speed);
            return;
        }

        switch(e.keyCode)
        {
        case 32: // space
            e.stopPropagation();
            e.preventDefault();
            if(this.player)
                this.player.togglePause();
            return;
        case 36: // home
            e.stopPropagation();
            e.preventDefault();
            if(!this.player)
                return;

            this.player.rewind();
            return;

        case 35: // end
            e.stopPropagation();
            e.preventDefault();
            if(!this.player)
                return;

            this.pause();
            this.player.setCurrentFrame(this.player.getFrameCount() - 1);
            return;

        case 39: // right arrow
        case 37: // left arrow
            e.stopPropagation();
            e.preventDefault();
            if(!this.player)
                return;

            this.pause();
            var total_frames = this.player.getFrameCount();
            var current_frame = this.player.getCurrentFrame();
            var next = e.keyCode == 39;
            var new_frame = current_frame + (next?+1:-1);
            this.player.setCurrentFrame(new_frame);
            return;
        }
    }

    play()
    {
        this.want_playing = true;
        this.refresh_focus();
    }

    pause()
    {
        this.want_playing = false;
        this.refresh_focus();
    }

    shutdown()
    {
        console.log("shutdown player:", this.illust_data.illustId);
        this.finished = true;

        if(this.seek_bar)
        {
            this.seek_bar.set_callback(null);
            this.seek_bar = null;
        }

        window.removeEventListener("visibilitychange", this.refresh_focus);

        // Send a finished progress callback if we were still loading.  We won't
        // send any progress calls after this (though the ZipImagePlayer will finish
        // downloading the file anyway).
        this.progress(null);

        if(this.player)
            this.player.pause(); 
        this.preview_img.parentNode.removeChild(this.preview_img);
        this.canvas.parentNode.removeChild(this.canvas);
    }

    refresh_focus()
    {
        if(this.player == null)
            return;

        var active = this.want_playing && !this.seeking && !window.document.hidden && !this._hidden;
        if(active)
            this.player.play(); 
        else
            this.player.pause(); 
    };

    clicked_canvas(e)
    {
        this.want_playing = !this.want_playing;
        this.refresh_focus();
    }

    // This is called when the user interacts with the seek bar.
    seek_callback(pause, seconds)
    {
        this.seeking = pause;
        this.refresh_focus();

        if(seconds != null)
            this.player.setCurrentFrameTime(seconds);
    };
}

/*
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Pixiv Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
*/
function ZipImagePlayer(options) {
    this.op = options;
    if (!Blob) {
        this._error("No Blob support");
    }
    if (!Uint8Array) {
        this._error("No Uint8Array support");
    }
    if (!DataView) {
        this._error("No DataView support");
    }
    if (!ArrayBuffer) {
        this._error("No ArrayBuffer support");
    }
    this._loadingState = 0;
    this._dead = false;
    this._context = options.canvas.getContext("2d");
    this._files = {};
    this._frameCount = this.op.metadata.frames.length;
    this._debugLog("Frame count: " + this._frameCount);
    this._frame = 0;
    this._loadFrame = 0;

    // Make a list of timestamps for each frame.
    this._frameTimestamps = [];
    var milliseconds = 0;
    for(var frame of this.op.metadata.frames)
    {
        this._frameTimestamps.push(milliseconds);
        milliseconds += frame.delay;
    }

    this._frameImages = [];
    this._paused = false;
    this._startLoad();
    this.speed = 1;
    if (this.op.autoStart) {
        this.play();
    } else {
        this._paused = true;
    }
}

// Removed partial loading.  It doesn't cache in Firefox, and it's unnecessary with the very
// tiny files Pixiv supports.
ZipImagePlayer.prototype = {
    _failed: false,
    _mkerr: function(msg) {
        var _this = this;
        return function() {
            _this._error(msg);
        }
    },
    _error: function(msg) {
        this._failed = true;
        throw Error("ZipImagePlayer error: " + msg);
    },
    _debugLog: function(msg) {
        if (this.op.debug) {
            console.log(msg);
        }
    },
    async _load() {
        var _this = this;

        // Use helpers.fetch_resource, so we share fetches with preloading.
        var response = helpers.fetch_resource(this.op.source, {
            onprogress: function(e) {
                if(!this.op.progress)
                    return;
                try {
                    this.op.progress(e.loaded / e.total);
                } catch(e) {
                    console.error(e);
                }
            }.bind(this),
        });
        var response = await response;
        
        if (_this._dead) {
            return;
        }
        _this._buf = response;
        var length = _this._buf.byteLength;
        _this._len = length;
        _this._pHead = length;
        _this._bytes = new Uint8Array(_this._buf);
        this._findCentralDirectory();

        if(this.op.progress)
        {
            try {
                setTimeout(function() {
                    this.op.progress(null);
                }.bind(this), 0);
            } catch(e) {
                console.error(e);
            }
        }
    },
    _startLoad: function() {
        var _this = this;
        if (!this.op.source) {
            // Unpacked mode (individiual frame URLs) - just load the frames.
            this._loadNextFrame();
            return;
        }
        _this._load();
    },
    _findCentralDirectory: function() {
        // No support for ZIP file comment
        var dv = new DataView(this._buf, this._len - 22, 22);
        if (dv.getUint32(0, true) != 0x06054b50) {
            this._error("End of Central Directory signature not found");
        }
        var count = dv.getUint16(10, true);
        var size = dv.getUint32(12, true);
        var offset = dv.getUint32(16, true);
        if (offset < this._pTail) {
            this._error("End central directory past end of file");
            return;
        }

        // Parse the central directory.
        var dv = new DataView(this._buf, offset, size);
        var p = 0;
        for (var i = 0; i < count; i++ ) {
            if (dv.getUint32(p, true) != 0x02014b50) {
                this._error("Invalid Central Directory signature");
            }
            var compMethod = dv.getUint16(p + 10, true);
            var uncompSize = dv.getUint32(p + 24, true);
            var nameLen = dv.getUint16(p + 28, true);
            var extraLen = dv.getUint16(p + 30, true);
            var cmtLen = dv.getUint16(p + 32, true);
            var off = dv.getUint32(p + 42, true);
            if (compMethod != 0) {
                this._error("Unsupported compression method");
            }
            p += 46;
            var nameView = new Uint8Array(this._buf, offset + p, nameLen);
            var name = "";
            for (var j = 0; j < nameLen; j++) {
                name += String.fromCharCode(nameView[j]);
            }
            p += nameLen + extraLen + cmtLen;
            /*this._debugLog("File: " + name + " (" + uncompSize +
                           " bytes @ " + off + ")");*/
            this._files[name] = {off: off, len: uncompSize};
        }
        // Two outstanding fetches at any given time.
        // Note: the implementation does not support more than two.
        if (this._pHead < this._pTail) {
            this._error("Chunk past end of file");
            return;
        }

        this._pHead = this._len;
        this._loadNextFrame();
    },
    _fileDataStart: function(offset) {
        var dv = new DataView(this._buf, offset, 30);
        var nameLen = dv.getUint16(26, true);
        var extraLen = dv.getUint16(28, true);
        return offset + 30 + nameLen + extraLen;
    },
    _isFileAvailable: function(name) {
        var info = this._files[name];
        if (!info) {
            this._error("File " + name + " not found in ZIP");
        }
        if (this._pHead < (info.off + 30)) {
            return false;
        }
        return this._pHead >= (this._fileDataStart(info.off) + info.len);
    },
    getFrameData: function(frame) {
        if (this._dead) {
            return;
        }
        if (frame >= this._frameCount) {
            return null;
        }
        var meta = this.op.metadata.frames[frame];
        if (!this._isFileAvailable(meta.file)) {
            return null;
        }
        var off = this._fileDataStart(this._files[meta.file].off);
        var end = off + this._files[meta.file].len;
        var mime_type = this.op.metadata.mime_type || "image/png";
        var slice;
        if (!this._buf.slice) {
            slice = new ArrayBuffer(this._files[meta.file].len);
            var view = new Uint8Array(slice);
            view.set(this._bytes.subarray(off, end));
        } else {
            slice = this._buf.slice(off, end);
        }
        return slice;
    },
    _loadNextFrame: function() {
        if (this._dead) {
            return;
        }
        var frame = this._loadFrame;
        if (frame >= this._frameCount) {
            return;
        }
        var meta = this.op.metadata.frames[frame];
        if (!this.op.source) {
            // Unpacked mode (individiual frame URLs)
            this._loadFrame += 1;
            this._loadImage(frame, meta.file, false);
            return;
        }
        if (!this._isFileAvailable(meta.file)) {
            return;
        }
        this._loadFrame += 1;
        var off = this._fileDataStart(this._files[meta.file].off);
        var end = off + this._files[meta.file].len;
        var mime_type = this.op.metadata.mime_type || "image/png";
        var slice = this._buf.slice(off, end);
        var blob = new Blob([slice], {type: mime_type});
        /*_this._debugLog("Loading " + meta.file + " to frame " + frame);*/
        var url = URL.createObjectURL(blob);
        this._loadImage(frame, url, true);
    },
    _loadImage: function(frame, url, isBlob) {
        var _this = this;
        var image = document.createElement("img");

        // "can't access dead object"
        var meta = this.op.metadata.frames[frame];
        image.addEventListener('load', function() {
            _this._debugLog("Loaded " + meta.file + " to frame " + frame);
            if (isBlob) {
                URL.revokeObjectURL(url);
            }
            if (_this._dead) {
                return;
            }
            _this._frameImages[frame] = image;
            if (_this._loadingState == 0) {
                _this._displayFrame.apply(_this);
            }
            if (frame >= (_this._frameCount - 1)) {
                _this._setLoadingState(2);
                _this._buf = null;
                _this._bytes = null;
            } else {
                _this._loadNextFrame();
            }
        });
        image.src = url;
    },
    _setLoadingState: function(state) {
        if (this._loadingState != state) {
            this._loadingState = state;
        }
    },
    _displayFrame: function() {
        if (this._dead) {
            return;
        }
        var _this = this;
        var meta = this.op.metadata.frames[this._frame];
        // this._debugLog("Displaying frame: " + this._frame + " " + meta.file);
        var image = this._frameImages[this._frame];
        if (!image) {
            this._debugLog("Image not available!");
            this._setLoadingState(0);
            return;
        }
        if (this._loadingState != 2) {
            this._setLoadingState(1);
        }
        if (this.op.autosize) {
            if (this._context.canvas.width != image.width || this._context.canvas.height != image.height) {
                // make the canvas autosize itself according to the images drawn on it
                // should set it once, since we don't have variable sized frames
                this._context.canvas.width = image.width;
                this._context.canvas.height = image.height;
            }
        };
        this.drawn_frame = this._frame;
        this._context.clearRect(0, 0, this.op.canvas.width,
                                this.op.canvas.height);
        this._context.drawImage(image, 0, 0);

        // If the user wants to know when the frame is ready, call it.
        if(this.op.drew_frame)
        {
            try {
                setTimeout(function() {
                    this.op.drew_frame(null);
                }.bind(this), 0);
            } catch(e) {
                console.error(e);
            }
        }
        
        if (this._paused)
            return;
        this._pending_frame_metadata = meta;
        this._refreshTimer();
    },
    _unsetTimer: function() {
        if(!this._timer)
            return;

        clearTimeout(this._timer);
        this._timer = null;
    },
    _refreshTimer: function() {
        if(this._paused)
            return;

        this._unsetTimer();
        this._timer = setTimeout(this._nextFrame.bind(this), this._pending_frame_metadata.delay / this.speed);
    },
    getFrameDuration: function() {
        var meta = this.op.metadata.frames[this._frame];
        return meta.delay;
    },
    getFrameNoDuration: function(frame) {
        var meta = this.op.metadata.frames[frame];
        return meta.delay;
    },
    _nextFrame: function(frame) {
        this._timer = null;

        if (this._frame >= (this._frameCount - 1)) {
            if (this.op.loop) {
                this._frame = 0;
            } else {
                this.pause();
                return;
            }
        } else {
            this._frame += 1;
        }
        this._displayFrame();
    },
    play: function() {
        if (this._dead) {
            return;
        }
        if (this._paused) {
            this._paused = false;
            this._displayFrame();
        }
    },
    pause: function() {
        if (this._dead) {
            return;
        }
        if (!this._paused) {
            this._unsetTimer();
            this._paused = true;
        }
    },
    togglePause: function() {
        if(this._paused)
            this.play();
        else
            this.pause();
    },
    rewind: function() {
        if (this._dead) {
            return;
        }
        this._frame = 0;
        this._unsetTimer();
        this._displayFrame();
    },
    setSpeed: function(value) {
        this.speed = value;

        // Refresh the timer, so we don't wait a long time if we're changing from a very slow
        // playback speed.
        this._refreshTimer();
    },
    stop: function() {
        this._debugLog("Stopped");
        this._dead = true;
        this._unsetTimer();
        this._frameImages = null;
        this._buf = null;
        this._bytes = null;
    },
    getCurrentFrame: function() {
        return this._frame;
    },
    setCurrentFrame: function(frame) {
        frame %= this._frameCount;
        if(frame < 0)
            frame += this._frameCount;
        this._frame = frame;
        this._displayFrame();
    },
    getTotalDuration: function() {
        var last_frame = this.op.metadata.frames.length - 1;
        return this._frameTimestamps[last_frame] / 1000;
    },
    getCurrentFrameTime: function() {
        return this._frameTimestamps[this._frame] / 1000;
    },

    // Set the video to the closest frame to the given time.
    setCurrentFrameTime: function(seconds) {
        // We don't actually need to check all frames, but there's no need to optimize this.
        var closest_frame = null;
        var closest_error = null;
        for(var frame = 0; frame < this.op.metadata.frames.length; ++frame)
        {
            var error = Math.abs(seconds - this._frameTimestamps[frame]/1000);
            if(closest_frame == null || error < closest_error)
            {
                closest_frame = frame;
                closest_error = error;
            }
        }

        this._frame = closest_frame;
        this._displayFrame();
    },
    getLoadedFrames: function() {
        return this._frameImages.length;
    },
    getFrameCount: function() {
        return this._frameCount;
    },
    hasError: function() {
        return this._failed;
    }
}

// The base class for our main views.
class view
{
    constructor(container)
    {
        this.container = container;

        // Make our container focusable, so we can give it keyboard focus when we
        // become active.
        this.container.tabIndex = -1;
    }

    // Handle a key input.  This is only called while the view is active.
    handle_onkeydown(e)
    {
    }

    // If this view is displaying an image, return its ID.  Otherwise, return null.
    get displayed_illust_id()
    {
        return null;
    }

    // If this view is displaying a manga page, return its ID.  Otherwise, return null.
    // If this is non-null, displayed_illust_id will always also be non-null.
    get displayed_illust_page()
    {
        return null;
    }

    // These are called to restore the scroll position on navigation.
    scroll_to_top() { }
    restore_scroll_position() { }
    scroll_to_illust_id(illust_id, manga_page) { }

    set active(active)
    {
        // Show or hide the view container.
        this.container.hidden = !active;
        
        if(active)
        {
            // Focus the container, so it receives keyboard events, eg. home/end.
            this.container.focus();
        }
        else
        {
            // When the view isn't active, send viewhidden to close all popup menus inside it.
            view_hidden_listener.send_viewhidden(this.container);
        }
    }
}

// The main UI.  This handles creating the viewers and the global UI.
class view_illust extends view
{
    constructor(container)
    {
        super(container);
        
        if(debug_show_ui) document.body.classList.add("force-ui");

        this.onwheel = this.onwheel.bind(this);
        this.refresh_ui = this.refresh_ui.bind(this);
        this.data_source_updated = this.data_source_updated.bind(this);

        this.current_illust_id = -1;
        this.latest_navigation_direction_down = true;
        this.container = container;

        this.progress_bar = main_controller.singleton.progress_bar;

        // Create a UI box and put it in its container.
        var ui_container = this.container.querySelector(".ui");
        this.ui = new image_ui(ui_container, this.progress_bar);
        
        var ui_box = this.container.querySelector(".ui-box");

        var ui_visibility_changed = () => {
            // Hide the dropdown tag widget when the hover UI is hidden.
            if(!ui_box.classList.contains("hovering-over-box") && !ui_box.classList.contains("hovering-over-sphere"))
            {
                this.ui.bookmark_tag_widget.visible = false; // XXX remove
                view_hidden_listener.send_viewhidden(ui_box);
            }
        };
        ui_box.addEventListener("mouseenter", (e) => { helpers.set_class(ui_box, "hovering-over-box", true); ui_visibility_changed(); });
        ui_box.addEventListener("mouseleave", (e) => { helpers.set_class(ui_box, "hovering-over-box", false); ui_visibility_changed(); });

        var hover_circle = this.container.querySelector(".ui .hover-circle");
        hover_circle.addEventListener("mouseenter", (e) => { helpers.set_class(ui_box, "hovering-over-sphere", true); ui_visibility_changed(); });
        hover_circle.addEventListener("mouseleave", (e) => { helpers.set_class(ui_box, "hovering-over-sphere", false); ui_visibility_changed(); });

        image_data.singleton().user_modified_callbacks.register(this.refresh_ui);
        image_data.singleton().illust_modified_callbacks.register(this.refresh_ui);
        settings.register_change_callback("recent-bookmark-tags", this.refresh_ui);

        new hide_mouse_cursor_on_idle(this.container.querySelector(".image-container"));

        // this.manga_thumbnails = new manga_thumbnail_widget(this.container.querySelector(".manga-thumbnail-container"));

        this.container.addEventListener("wheel", this.onwheel);

        // A bar showing how far along in an image sequence we are:
        this.manga_page_bar = new progress_bar(this.container.querySelector(".ui-box")).controller();
        this.seek_bar = new seek_bar(this.container.querySelector(".ugoira-seek-bar"));

        this.active = false;
    }

    set_data_source(data_source)
    {
        if(data_source == this.data_source)
            return;

        if(this.data_source != null)
        {
            this.data_source.remove_update_listener(this.data_source_updated);
            this.data_source = null;
        }

        this.data_source = data_source;
        this.ui.data_source = data_source;

        if(this.data_source != null)
        {
            this.data_source.add_update_listener(this.data_source_updated);

            this.refresh_ui();
        }
    }

    get _hide_image()
    {
        return this.container.querySelector(".image-container").hidden;
    }
    set _hide_image(value)
    {
        this.container.querySelector(".image-container").hidden = value;
    }
    
    // Show an image.
    //
    // If manga_page isn't null, it's the page to display.
    // If manga_page is -1, show the last page.
    async show_image(illust_id, manga_page)
    {
        // If we previously set a pending navigation, this navigation overrides it.
        this.cancel_async_navigation();

        // If we were already shown (we're not coming from the thumbnail view), and we're showing
        // the previous image from the one we were already showing, start at the end instead
        // of the beginning, so we'll start at the end when browsing backwards.
        var show_last_page = false;
        if(this.active && manga_page == null)
        {
            var next_illust_id = this.data_source.id_list.get_neighboring_illust_id(illust_id, true);
            show_last_page = (next_illust_id == this.wanted_illust_id);
            manga_page = show_last_page? -1:0;
        }
        
        // Remember that this is the image we want to be displaying.
        this.wanted_illust_id = illust_id;
        this.wanted_illust_page = manga_page;

        // If this image is already loaded, just make sure it's not hidden.
        if(illust_id == this.current_illust_id && this.wanted_illust_page == this.viewer.page && !this._hide_image)
        {
            console.log("illust_id", illust_id, "page", this.wanted_illust_page, "already displayed");
            return;
        }

        // If we're not active, stop.  We'll show this image if we become loaded later.
        if(!this.active)
        {
            // console.log("not active, set wanted id to", this.wanted_illust_id);
            return;
        }

        // Tell the preloader about the current image.
        image_preloader.singleton.set_current_image(illust_id);

        // Load info for this image if needed.
        var illust_data = await image_data.singleton().get_image_info(illust_id);

        // If this is no longer the image we want to be showing, stop.
        if(this.wanted_illust_id != illust_id)
        {
            console.log("show_image: illust ID changed while async, stopping");
            return;
        }

        // If manga_page is -1, we didn't know the page count when we did the navigation
        // and we want the last page.  Otherwise, just make sure the page is in range.
        if(manga_page == -1)
            manga_page = illust_data.pageCount - 1;
        else
            manga_page = helpers.clamp(manga_page, 0, illust_data.pageCount-1);

        console.log("Showing image", illust_id, "page", manga_page);

        // If we adjusted the page, update the URL.  For single-page posts, there should be
        // no page field.
        var args = helpers.get_args(document.location);
        var wanted_page_arg = illust_data.pageCount > 1? (manga_page + 1).toString():null;
        if(args.hash.get("page") != wanted_page_arg)
        {
            if(wanted_page_arg != null)
                args.hash.set("page", wanted_page_arg);
            else
                args.hash.delete("page");

            console.log("Updating URL with page number:", args.hash.toString());
            helpers.set_args(args, false /* add_to_history */);
        }

        // This is the first image we're displaying if we previously had no illust ID, or
        // if we were hidden.
        var first_image_displayed = this.current_illust_id == -1 || this._hide_image;

        // If the illust ID isn't changing, just update the viewed page.
        if(illust_id == this.current_illust_id && this.viewer != null)
        {
            console.log("Image ID not changed, setting page", this.wanted_illust_page);
            this._hide_image = false;
            this.viewer.page = this.wanted_illust_page;
            if(this.manga_thumbnails)
                this.manga_thumbnails.current_page_changed(manga_page);
            this.refresh_ui();

            return;
        }

        // Speculatively load the next image, which is what we'll show if you press page down, so
        // advancing through images is smoother.
        //
        // We don't do this when showing the first image, since the most common case is simply
        // viewing a single image and not navigating to any others, so this avoids making
        // speculative loads every time you load a single illustration.
        if(!first_image_displayed)
        {
            // Let image_preloader handle speculative loading.  If preload_illust_id is null,
            // we're telling it that we don't need to load anything.
            var preload_illust_id = this.data_source.id_list.get_neighboring_illust_id(illust_id, this.latest_navigation_direction_down);
            image_preloader.singleton.set_speculative_image(preload_illust_id);
        }

        this.current_illust_id = illust_id;
        this.current_illust_data = illust_data;

        this.ui.illust_id = illust_id;

        this.refresh_ui();

        var illust_data = this.current_illust_data;
        
        // If the image has the ドット絵 tag, enable nearest neighbor filtering.
        helpers.set_class(document.body, "dot", helpers.tags_contain_dot(illust_data));

        // Dismiss any message when changing images.
        message_widget.singleton.hide();
       
        // If we're showing something else, remove it.
        if(this.viewer != null)
        {
            this.viewer.shutdown();
            this.viewer = null;
        }

        // The viewer is gone, so we can unhide the image container without flashing the
        // previous image.
        this._hide_image = false;

        var image_container = this.container.querySelector(".image-container");

        // Check if this image is muted.
        var muted_tag = muting.singleton.any_tag_muted(illust_data.tags.tags);
        var muted_user = muting.singleton.is_muted_user_id(illust_data.userId);

        if(muted_tag || muted_user)
        {
            // Tell the thumbnail view about the image.  If the image is muted, disable thumbs.
            if(this.manga_thumbnails)
                this.manga_thumbnails.set_illust_info(null);

            // If the image is muted, load a dummy viewer.
            this.viewer = new viewer_muted(image_container, illust_data);
            return;
        }
     
        var manga_page = this.wanted_illust_page;
        if(manga_page == -1)
            manga_page = illust_data.pageCount - 1;

        // Tell the thumbnail view about the image.
        if(this.manga_thumbnails)
        {
            this.manga_thumbnails.set_illust_info(illust_data);
            this.manga_thumbnails.snap_transition();

            // Let the manga thumbnail display know about the selected page.
            this.manga_thumbnails.current_page_changed(manga_page);
        }

        // Create the image viewer.
        var progress_bar = this.progress_bar.controller();
        if(illust_data.illustType == 2)
            this.viewer = new viewer_ugoira(image_container, illust_data, this.seek_bar, {
                progress_bar: progress_bar,
            });
        else
        {
            this.viewer = new viewer_images(image_container, illust_data, {
                progress_bar: progress_bar,
                manga_page_bar: this.manga_page_bar,
                manga_page: manga_page,
            });
        }

        // Refresh the UI now that we have a new viewer.
        this.refresh_ui();
    }

    // If we started navigating to a new image and were delayed to load data (either to load
    // the image or to load a new page), cancel it and stay where we are.
    cancel_async_navigation()
    {
        // If we previously set a pending navigation, this navigation overrides it.
        if(this.pending_navigation == null)
            return;

        console.info("Cancelling async navigation");
        this.pending_navigation = null;
    }


    // Stop displaying any image (and cancel any wanted navigation), putting us back
    // to where we were before displaying any images.
    //
    // This will also prevent the next image displayed from triggering speculative
    // loading, which we don't want to do when clicking an image in the thumbnail
    // view.
    stop_displaying_image()
    {
        if(this.viewer != null)
        {
            this.viewer.shutdown();
            this.viewer = null;
        }

        if(this.manga_thumbnails)
            this.manga_thumbnails.set_illust_info(null);
        
        this.wanted_illust_id = null;

        // The manga page to show, or the last page if -1.
        this.wanted_illust_page = 0;
        this.current_illust_id = -1;
        this.refresh_ui();
    }

    data_source_updated()
    {
        this.refresh_ui();
    }

    get active()
    {
        return this._active;
    }

    set active(active)
    {
        if(this._active == active)
            return;

        this._active = active;
        super.active = active;

        if(!active)
        {
            console.log("Hide illust,", this.viewer != null);
            this.cancel_async_navigation();

            // Remove any image we're displaying, so if we show another image later, we
            // won't show the previous image while the new one's data loads.
            if(this.viewer != null)
                this._hide_image = true;

            // Stop showing the user in the context menu.
            main_context_menu.get.user_info = null;
            
            return;
        }

        // If show_image was called while we were inactive, load it now.
        if(this.wanted_illust_id != this.current_illust_id || this.wanted_illust_page != this.viewer.page || this._hide_image)
        {
            // Show the image.
            console.log("Showing illust_id", this.wanted_illust_id, "that was set while hidden");
            this.show_image(this.wanted_illust_id, this.wanted_illust_page);
        }
        
        // If we're becoming active, refresh the UI, since we don't do that while we're inactive.
        this.refresh_ui();
    }

    // Refresh the UI for the current image.
    refresh_ui()
    {
        // Don't refresh if the thumbnail view is active.  We're not visible, and we'll just
        // step over its page title, etc.
        if(!this._active)
            return;
        
        // Tell the UI which page is being viewed.
        var page = this.viewer != null? this.viewer.page:0;
        this.ui.set_displayed_page_info(page);

        // Tell the context menu which user is being viewed.
        main_context_menu.get.user_info = this.current_illust_data? this.current_illust_data.userInfo:null;
        main_context_menu.get.page = page;

        // Pull out info about the user and illustration.
        var illust_id = this.current_illust_id;

        // Update the disable UI button to point at the current image's illustration page.
        var disable_button = this.container.querySelector(".disable-ui-button");
        disable_button.href = "/member_illust.php?mode=medium&illust_id=" + illust_id + "#no-ppixiv";

        // If we're not showing an image yet, hide the UI and don't try to update it.
        helpers.set_class(this.container.querySelector(".ui"), "disabled", illust_id == -1);

        helpers.set_title_and_icon(this.current_illust_data);

        if(illust_id == -1)
            return;

        this.ui.refresh();
    }

    onwheel(e)
    {
        if(!this._active)
            return;        

        // Don't intercept wheel scrolling over the description box.
        if(e.target.closest(".description") != null)
            return;

        var down = e.deltaY > 0;
        this.move(down);
    }

    get displayed_illust_id()
    {
        return this.wanted_illust_id;        
    }

    get displayed_illust_page()
    {
        return this.wanted_illust_page;
    }

    handle_onkeydown(e)
    {
        // Let the viewer handle the input first.
        if(this.viewer && this.viewer.onkeydown)
        {
            this.viewer.onkeydown(e);
            if(e.defaultPrevented)
                return;
        }

        this.ui.handle_onkeydown(e);
        if(e.defaultPrevented)
            return;
        
        if(e.ctrlKey || e.altKey)
            return;

        switch(e.keyCode)
        {
        case 37: // left
        case 38: // up
        case 33: // pgup
            e.preventDefault();
            e.stopPropagation();

            this.move(false);
            break;

        case 39: // right
        case 40: // down
        case 34: // pgdn
            e.preventDefault();
            e.stopPropagation();

            this.move(true);
            break;
        }
    }

    async move(down)
    {
        // Remember whether we're navigating forwards or backwards, for preloading.
        this.latest_navigation_direction_down = down;

        this.cancel_async_navigation();

        // See if we should change the manga page.
        if(this.current_illust_data != null && this.current_illust_data.pageCount > 1)
        {
            var old_page = this.wanted_illust_page;
            var new_page = old_page + (down? +1:-1);
            new_page = Math.max(0, Math.min(this.current_illust_data.pageCount - 1, new_page));
            if(new_page != old_page)
            {
                main_controller.singleton.show_illust(this.current_illust_id, {
                    manga_page: new_page,
                });
                return;
            }
        }

        // If we have a target illust_id, move relative to it.  Otherwise, move relative to the
        // displayed image.  This way, if we navigate repeatedly before a previous navigation
        // finishes, we'll keep moving rather than waiting for each navigation to complete.
        var navigate_from_illust_id = this.wanted_illust_id;
        if(navigate_from_illust_id == null)
            navigate_from_illust_id = this.current_illust_id;

        // Get the next (or previous) illustration after the current one.
        var new_illust_id = this.data_source.id_list.get_neighboring_illust_id(navigate_from_illust_id, down);
        if(new_illust_id != null)
        {
            // Show the new image.
            main_controller.singleton.show_illust(new_illust_id);
            return true;
        }

        // That page isn't loaded.  Try to load it.
        var next_page = this.data_source.id_list.get_page_for_neighboring_illust(navigate_from_illust_id, down);

        // If we can't find the next page, then the current image isn't actually loaded in
        // the current search results.  This can happen if the page is reloaded: we'll show
        // the previous image, but we won't have the results loaded (and the results may have
        // changed).  Just jump to the first image in the results so we get back to a place
        // we can navigate from.
        //
        // Note that we use id_list.get_first_id rather than get_current_illust_id, which is
        // just the image we're already on.
        if(next_page == null)
        {
            // We should normally know which page the illustration we're currently viewing is on.
            console.warn("Don't know the next page for illust", navigate_from_illust_id);
            new_illust_id = this.data_source.id_list.get_first_id();
            main_controller.singleton.show_illust(new_illust_id);
            return true;
        }

        console.log("Loading the next page of results:", next_page);

        // The page shouldn't already be loaded.  Double-check to help prevent bugs that might
        // spam the server requesting the same page over and over.
        if(this.data_source.id_list.is_page_loaded(next_page))
        {
            console.error("Page", next_page, "is already loaded");
            return;
        }

        // Ask the data source to load it.
        var pending_navigation = this.pending_navigation = new Object();
        if(!await this.data_source.load_page(next_page))
        {
            console.log("Reached the end of the list");
            return false;
        }

        // If this.pending_navigation is no longer set to this function, we navigated since
        // we requested this load and this navigation is stale, so stop.
        if(this.pending_navigation != pending_navigation)
        {
            console.error("Aborting stale navigation");
            return;
        }

        this.pending_navigation = null;

        // If we do have an image displayed, navigate up or down based on our most recent navigation
        // direction.  This simply retries the navigation now that we have data.
        console.log("Retrying navigation after data load");
        await this.move(down);

        return true;
    }
}

// The search UI.
class view_search extends view
{
    constructor(container)
    {
        super(container);
        
        this.thumbs_loaded = this.thumbs_loaded.bind(this);
        this.data_source_updated = this.data_source_updated.bind(this);
        this.onwheel = this.onwheel.bind(this);
        this.onscroll = this.onscroll.bind(this);
//        this.onmousemove = this.onmousemove.bind(this);
        this.submit_search = this.submit_search.bind(this);
        this.refresh_thumbnail = this.refresh_thumbnail.bind(this);
        this.refresh_images = this.refresh_images.bind(this);
        this.window_onresize = this.window_onresize.bind(this);
        this.update_from_settings = this.update_from_settings.bind(this);

        this.active = false;

        window.addEventListener("thumbnailsLoaded", this.thumbs_loaded);
        window.addEventListener("resize", this.window_onresize);

        this.container.addEventListener("wheel", this.onwheel);
//        this.container.addEventListener("mousemove", this.onmousemove);

        this.container.addEventListener("scroll", this.onscroll);
        window.addEventListener("resize", this.onscroll);

        image_data.singleton().user_modified_callbacks.register(this.refresh_ui.bind(this));

        // When a bookmark is modified, refresh the heart icon.
        image_data.singleton().illust_modified_callbacks.register(this.refresh_thumbnail);

        this.thumbnail_dimensions_style = document.createElement("style");
        document.body.appendChild(this.thumbnail_dimensions_style);
        
        // Create the avatar widget shown on the artist data source.
        this.avatar_widget = new avatar_widget({
            parent: this.container.querySelector(".avatar-container"),
            changed_callback: this.data_source_updated,
            big: true,
            mode: "dropdown",
        });
        
        // Create the tag widget used by the search data source.
        this.tag_widget = new tag_widget({
            parent: this.container.querySelector(".related-tag-list"),
            format_link: function(tag)
            {
                // The recommended tag links are already on the search page, and retain other
                // search settings.
                var url = new URL(window.location);
                url.searchParams.set("word", tag.tag);
                url.searchParams.delete("p");
                return url.toString();
            }.bind(this),
        });

        // Don't scroll thumbnails when scrolling tag dropdowns.
        // FIXME: This works on member-tags-box, but not reliably on search-tags-box, even though
        // they seem like the same thing.
        this.container.querySelector(".member-tags-box .post-tag-list").addEventListener("scroll", function(e) { e.stopPropagation(); }, true);
        this.container.querySelector(".search-tags-box .related-tag-list").addEventListener("scroll", function(e) { e.stopPropagation(); }, true);

        // Set up hover popups.
        dropdown_menu_opener.create_handlers(this.container, [".navigation-menu-box", ".thumbnail-settings-menu-box", ".ages-box", ".popularity-box", ".type-box", ".search-mode-box", ".size-box", ".aspect-ratio-box", ".bookmarks-box", ".time-box", ".member-tags-box", ".search-tags-box"]);

        // Fill in the default value for the search page.  We don't do this in refresh_thumbnail_ui
        // since we don't want to clobber the user's edits later.  Only do this with the search box
        // on the search page, not the one in the navigation dropdown.
        var tag = new URL(document.location).searchParams.get("word");
        if(tag != null)
            this.container.querySelector(".search-page-tag-entry .search-tags").value = tag;

        // As an optimization, start loading image info on mousedown.  We don't navigate until click,
        // but this lets us start loading image info a bit earlier.
        this.container.querySelector(".thumbnails").addEventListener("mousedown", (e) => {
            if(e.button != 0)
                return;

            var a = e.target.closest("a.thumbnail-link");
            if(a == null)
                return;

            image_data.singleton().get_image_info(a.dataset.illustId);
        }, true);
 
        helpers.input_handler(this.container.querySelector(".search-page-tag-entry .search-tags"), this.submit_search);
        helpers.input_handler(this.container.querySelector(".navigation-search-box .search-tags"), this.submit_search);

        this.container.querySelector(".refresh-search-button").addEventListener("click", this.refresh_search.bind(this));
        this.container.querySelector(".search-page-tag-entry .search-submit-button").addEventListener("click", this.submit_search);
        this.container.querySelector(".navigation-search-box .search-submit-button").addEventListener("click", this.submit_search);

        var settings_menu = this.container.querySelector(".settings-menu-box > .popup-menu-box");

        this.thumbnail_size_slider = new thumbnail_size_slider_widget(settings_menu, {
            label: "Thumbnail size",
            setting: "thumbnail-size",
            min: 0,
            max: 5,
            onchange: function() {
                // refresh_images first to update thumbnail_dimensions_style, then call onscroll
                // to fill in images.
                this.refresh_images();
                this.onscroll();
            }.bind(this),
        });

        new menu_option_toggle_light_theme(settings_menu, {
            label: "Light mode",
            setting: "theme",
            onchange: this.update_from_settings,
        });

        new menu_option_toggle(settings_menu, {
            label: "Thumbnail zooming",
            setting: "disable_thumbnail_zooming",
            onchange: this.update_from_settings,
            invert_display: true,
        });

        new menu_option_toggle(settings_menu, {
            label: "Thumbnail panning",
            setting: "disable_thumbnail_panning",
            onchange: this.update_from_settings,
            invert_display: true,
        });

        new menu_option_toggle(settings_menu, {
            label: "Hold shift to open context menu",
            setting: "invert-popup-hotkey",
        });
       
        new menu_option_toggle(settings_menu, {
            label: "Disabled by default",
            setting: "disabled-by-default",
        });
         
        // Create the tag dropdown for the search page input.
        new tag_search_dropdown_widget(this.container.querySelector(".tag-search-box .search-tags"));
            
        // Create the tag dropdown for the search input in the menu dropdown.
        new tag_search_dropdown_widget(this.container.querySelector(".navigation-search-box .search-tags"));

        this.update_from_settings();
        this.refresh_images();
        this.load_needed_thumb_data();
    }

    window_onresize(e)
    {
        if(!this.active)
            return;

        this.refresh_images();
    }

    submit_search(e)
    {
        // This can be sent to either the search page search box or the one in the
        // navigation dropdown.  Figure out which one we're on.
        var search_box = e.target.closest(".search-box");
        var tags = search_box.querySelector(".search-tags").value.trim();
        if(tags.length == 0)
            return;

        // Add this tag to the recent search list.
        helpers.add_recent_search_tag(tags);

        // If we're submitting by pressing enter on an input element, unfocus it and
        // close any widgets inside it (tag dropdowns).
        if(e.target instanceof HTMLInputElement)
        {
            e.target.blur();
            view_hidden_listener.send_viewhidden(e.target);
        }
        
        // Run the search.
        helpers.set_page_url(page_manager.singleton().get_url_for_tag_search(tags), true);
    }

    refresh_search()
    {
        main_controller.singleton.refresh_current_data_source();
    }
        

    /* This scrolls the thumbnail when you hover over it.  It's sort of neat, but it's pretty
     * choppy, and doesn't transition smoothly when the mouse first hovers over the thumbnail,
     * causing it to pop to a new location. 
    onmousemove(e)
    {
        var thumb = e.target.closest(".thumbnail-box a");
        if(thumb == null)
            return;

        var bounds = thumb.getBoundingClientRect();
        var x = e.clientX - bounds.left;
        var y = e.clientY - bounds.top;
        x = 100 * x / thumb.offsetWidth;
        y = 100 * y / thumb.offsetHeight;

        var img = thumb.querySelector("img.thumb");
        img.style.objectPosition = x + "% " + y + "%";
    }
*/
    onwheel(e)
    {
        // Stop event propagation so we don't change images on any viewer underneath the thumbs.
        e.stopPropagation();
    };

    onscroll(e)
    {
        this.load_needed_thumb_data();
    };

    initial_refresh_ui()
    {
        if(this.data_source != null)
        {
            var ui_box = this.container.querySelector(".thumbnail-ui-box");
            this.data_source.initial_refresh_thumbnail_ui(ui_box, this);
        }
    }

    set_data_source(data_source)
    {
        if(this.data_source == data_source)
            return;

        if(this.data_source != null)
        {
            this.data_source.remove_update_listener(this.data_source_updated);

            // Store our scroll position on the data source, so we can restore it if it's
            // reactivated.  There's only one instance of thumbnail_view, so this is safe.
            this.data_source.thumbnail_view_scroll_pos = this.container.scrollTop;
        }

        this.data_source = data_source;

        if(this.data_source == null)
            return;
        
        // If we disabled loading more pages earlier, reenable it.
        this.disable_loading_more_pages = false;

        // Listen to the data source loading new pages, so we can refresh the list.
        this.data_source.add_update_listener(this.data_source_updated);

        this.refresh_images();
        this.load_needed_thumb_data();

        this.initial_refresh_ui();
        this.refresh_ui();
    };

    restore_scroll_position()
    {
        // If we saved a scroll position when navigating away from a data source earlier,
        // restore it now.  Only do this once.
        if(this.data_source.thumbnail_view_scroll_pos != null)
        {
            this.container.scrollTop = this.data_source.thumbnail_view_scroll_pos;
            delete this.data_source.thumbnail_view_scroll_pos;
        }
        else
            this.scroll_to_top();
    }

    scroll_to_top()
    {
        this.container.scrollTop = 0;
    }

    refresh_ui()
    {
        if(!this.active)
            return;

        var element_displaying = this.container.querySelector(".displaying");
        element_displaying.hidden = this.data_source.get_displaying_text == null;
        if(this.data_source.get_displaying_text != null)
            element_displaying.innerText = this.data_source.get_displaying_text();

        helpers.set_page_title(this.data_source.page_title || "Loading...");
        
        var ui_box = this.container.querySelector(".thumbnail-ui-box");
        this.data_source.refresh_thumbnail_ui(ui_box, this);

        this.refresh_ui_for_user_id();
    };

    // Return the user ID we're viewing, or null if we're not viewing anything specific to a user.
    get viewing_user_id()
    {
        if(this.data_source == null)
            return null;
        return this.data_source.viewing_user_id;
    }

    // Call refresh_ui_for_user_info with the user_info for the user we're viewing,
    // if the user ID has changed.
    async refresh_ui_for_user_id()
    {
        // If we're viewing ourself (our own bookmarks page), hide the user-related UI.
        var initial_user_id = this.viewing_user_id;
        var user_id = initial_user_id == window.global_data.user_id? null:initial_user_id;

        var user_info = await image_data.singleton().get_user_info_full(user_id);

        // Stop if the user ID changed since we started this request.
        if(this.viewing_user_id != initial_user_id)
            return;

        helpers.set_icon(null, user_info);

        // Set the bookmarks link.
        var bookmarks_link = this.container.querySelector(".bookmarks-link");
        bookmarks_link.hidden = user_info == null;
        if(user_info != null)
        {
            var bookmarks_url = "/bookmark.php?id=" + user_info.userId + "&rest=show#ppixiv";
            bookmarks_link.href = bookmarks_url;
            bookmarks_link.dataset.popup = user_info? ("View " + user_info.name + "'s bookmarks"):"View bookmarks";
        }

        // Set the webpage link.
        var webpage_url = user_info && user_info.webpage;
        var webpage_link = this.container.querySelector(".webpage-link");
        webpage_link.hidden = webpage_url == null;
        if(webpage_url != null)
            webpage_link.href = webpage_url;

        // Set the twitter link.
        var twitter_url = user_info && user_info.social && user_info.social.twitter && user_info.social.twitter.url;
        var twitter_link = this.container.querySelector(".twitter-icon");
        twitter_link.hidden = twitter_url == null;
        if(twitter_url != null)
        {
            twitter_link.href = twitter_url;
            var path = new URL(twitter_url).pathname;
            var parts = path.split("/");
            twitter_link.dataset.popup = parts.length > 1? ("@" + parts[1]):"Twitter";
        }

        // Set the pawoo link.
        var pawoo_url = user_info && user_info.social && user_info.social.pawoo && user_info.social.pawoo.url;
        var pawoo_link = this.container.querySelector(".pawoo-icon");
        pawoo_link.hidden = pawoo_url == null;
        if(pawoo_url != null)
            pawoo_link.href = pawoo_url;

        // Set the "send a message" link.
        var contact_link = this.container.querySelector(".contact-link");
        contact_link.hidden = user_info == null;
        if(user_info != null)
            contact_link.href = "/messages.php?receiver_id=" + user_info.userId;

        // Tell the context menu which user is being viewed (if we're viewing a user-specific
        // search).
        main_context_menu.get.user_info = user_info;
    }

    set active(active)
    {
        if(this._active == active)
            return;

        this._active = active;

        super.active = active;
        
        if(active)
        {
            this.initial_refresh_ui();
            this.refresh_ui();

            // Refresh the images now, so it's possible to scroll to entries, but wait to start
            // loading data to give the caller a chance to call scroll_to_illust_id(), which needs
            // to happen after refresh_images but before load_needed_thumb_data.  This way, if
            // we're showing a page far from the top, we won't load the first page that we're about
            // to scroll away from.
            this.refresh_images();

            setTimeout(function() {
                this.load_needed_thumb_data();
            }.bind(this), 0);
        }
        else
        {
            this.stop_pulsing_thumbnail();

            main_context_menu.get.user_info = null;
        }
    }

    get active()
    {
        return this._active;
    }

    data_source_updated()
    {
        this.refresh_images();
        this.load_needed_thumb_data();
        this.refresh_ui();
    }

    // Recreate thumbnail images (the actual <img> elements).
    //
    // This is done when new pages are loaded, to create the correct number of images.
    // We don't need to do this when scrolling around or when new thumbnail data is available.
    refresh_images()
    {
        // Remove all existing entries and collect them.
        var ul = this.container.querySelector("ul.thumbnails");
        var original_scroll_top = this.container.scrollTop;

        // Make a list of [illust_id, page] thumbs to add.
        var images_to_add = [];
        if(this.data_source != null)
        {
            var id_list = this.data_source.id_list;
            var max_page = id_list.get_highest_loaded_page();
            var items_per_page = this.data_source.estimated_items_per_page;
            for(var page = 1; page <= max_page; ++page)
            {
                var illust_ids = id_list.illust_ids_by_page[page];
                if(illust_ids == null)
                {
                    // This page isn't loaded.  Fill the gap with items_per_page blank entries.
                    for(var idx = 0; idx < items_per_page; ++idx)
                        images_to_add.push([null, page]);
                    continue;
                }

                // Create an image for each ID.
                for(var illust_id of illust_ids)
                    images_to_add.push([illust_id, page]);
            }
        }

        // Remove next-page-placeholder while we repopulate.  It's a little different from the other
        // thumbs since it doesn't represent a real entry, so it just complicates the refresh logic.
        var old_placeholder = ul.querySelector(".next-page-placeholder");
        if(old_placeholder)
            ul.removeChild(old_placeholder);

        // Add thumbs.
        //
        // Most of the time we're just adding thumbs to the list.  Avoid removing or recreating
        // thumbs that aren't actually changing, which reduces flicker when adding entries and
        // avoids resetting thumbnail animations.  Do this by looking at the next node in the
        // list and seeing if it matches what we're adding.  When we're done, next_node will
        // point to the first entry that wasn't reused, and we'll remove everything from there onward.
        var next_node = ul.firstElementChild;

        for(var pair of images_to_add)
        {
            var illust_id = pair[0];
            var page = pair[1];

            if(next_node)
            {
                // If the illust_id matches, reuse the entry.  This includes the case where illust_id is
                // null for unloaded page placeholders and we're inserting an identical placeholder.
                if(next_node.dataset.illust_id == illust_id)
                {
                    next_node.dataset.page = page;
                    next_node = next_node.nextElementSibling;
                    continue;
                }

                // If the next node has no illust_id, it's an unloaded page placeholder.  If we're refreshing
                // and now have real entries for that page, we can reuse the placeholders for the real thumbs.
                if(next_node.dataset.illust_id == null && next_node.dataset.page == page)
                {
                    next_node.dataset.illust_id = illust_id;
                    next_node.dataset.page = page;
                    next_node = next_node.nextElementSibling;
                    continue;
                }
            }

            var entry = this.create_thumb(illust_id, page);
            
            // If next_node is null, we've used all existing nodes, so add to the end.  Otherwise,
            // insert before next_node.
            if(next_node != null)
                ul.insertBefore(entry, next_node);
            else
                ul.appendChild(entry);
            
            next_node = entry.nextElementSibling;
        }

        // Remove any images that we didn't use.
        var first_element_to_delete = next_node;
        while(first_element_to_delete != null)
        {
            var next = first_element_to_delete.nextElementSibling;
            ul.removeChild(first_element_to_delete);
            first_element_to_delete = next;
        }

        if(this.data_source != null)
        {
            // Add one dummy thumbnail at the end to represent future images.  If we have one page and
            // this scrolls into view, that tells us we're scrolled near the bottom and should try to
            // load page 2.
            var entry = this.create_thumb(null, max_page+1);
            entry.classList.add("next-page-placeholder");
            entry.hidden = this.disable_loading_more_pages;
            ul.appendChild(entry);
        }

        if(this.container.offsetWidth == 0)
            return;


        this.thumbnail_dimensions_style.textContent = helpers.make_thumbnail_sizing_style(ul, ".view-search-container", {
            wide: true,
            size: this.thumbnail_size_slider.thumbnail_size,
            max_columns: 5,

            // Set a minimum padding to make sure there's room for the popup text to fit between images.
            min_padding: 15,
        });




        // Restore the value of scrollTop from before we updated.  For some reason, Firefox
        // modifies scrollTop after we add a bunch of items, which causes us to scroll to
        // the wrong position, even though scrollRestoration is disabled.
        this.container.scrollTop = original_scroll_top;
    }

    // Start loading data pages that we need to display visible thumbs, and start
    // loading thumbnail data for nearby thumbs.
    //
    // FIXME: throttle loading pages if we scroll around quickly, so if we scroll
    // down a lot we don't load 10 pages of data
    async load_needed_thumb_data()
    {
        // elements is a list of elements that are onscreen (or close to being onscreen).
        // We want thumbnails loaded for these, even if we need to load more thumbnail data.
        //
        // nearby_elements is a list of elements that are a bit further out.  If we load
        // thumbnail data for elements, we'll load these instead.  That way, if we scroll
        // up a bit and two more thumbs become visible, we'll load a bigger chunk.
        // That way, we make fewer batch requests instead of requesting two or three
        // thumbs at a time.

        // Make a list of pages that we need loaded, and illustrations that we want to have
        // set.
        var new_pages = [];
        var wanted_illust_ids = [];
        var need_thumbnail_data = false;

        var elements = this.get_visible_thumbnails(false);
        for(var element of elements)
        {
            if(element.dataset.illust_id == null)
            {
                // This is a placeholder image for a page that isn't loaded, so load the page.
                if(new_pages.indexOf(element.dataset.page) == -1)
                    new_pages.push(element.dataset.page);
            }
            else
            {
                wanted_illust_ids.push(element.dataset.illust_id);
            }
        }

        for(var page of new_pages)
        {
            console.log("Load page", page, "for thumbnails");

            var result = await this.data_source.load_page(page);

            // If this page didn't load, it probably means we've reached the end.  Hide
            // the next-page-placeholder image so we don't keep trying to load more pages.
            // This won't prevent us from loading earlier pages.
            if(!result)
            {
                this.disable_loading_more_pages = true;

                // If this is the first page and there are no results, then there are no images
                // for this search.
                if(page == 1)
                {
                    console.log("No results on page 1.  Showing no results");
                    message_widget.singleton.show("No results");
                    message_widget.singleton.center();
                    message_widget.singleton.clear_timer();
                }
            }

            // We could load more pages, but let's just load one at a time so we don't spam
            // requests too quickly.  Once this page loads we'll come back here and load
            // another if needed.
            break;
        }

        if(!thumbnail_data.singleton().are_all_ids_loaded_or_loading(wanted_illust_ids))
        {
            // At least one visible thumbnail needs to be loaded, so load more data at the same
            // time.
            var nearby_elements = this.get_visible_thumbnails(true);

            var nearby_illust_ids = [];
            for(var element of nearby_elements)
            {
                if(element.dataset.illust_id == null)
                    continue;
                nearby_illust_ids.push(element.dataset.illust_id);
            }

            // console.log("Wanted:", wanted_illust_ids.join(", "));
            // console.log("Nearby:", nearby_illust_ids.join(", "));

            // Load the thumbnail data if needed.
            thumbnail_data.singleton().get_thumbnail_info(nearby_illust_ids);
        }
        
        this.set_visible_thumbs();
    }

    update_from_settings()
    {
        var thumbnail_mode = helpers.get_value("thumbnail-size");
        this.set_visible_thumbs();
        this.refresh_images();

        helpers.set_class(document.body, "light", settings.get("theme") == "light");
        helpers.set_class(document.body, "disable-thumbnail-panning", settings.get("disable_thumbnail_panning"));
        helpers.set_class(document.body, "disable-thumbnail-zooming", settings.get("disable_thumbnail_zooming"));
    }

    // Set the URL for all loaded thumbnails that are onscreen.
    //
    // This won't trigger loading any data (other than the thumbnails themselves).
    set_visible_thumbs()
    {
        // Make a list of IDs that we're assigning.
        var elements = this.get_visible_thumbnails();
        var illust_ids = [];
        for(var element of elements)
        {
            if(element.dataset.illust_id == null)
                continue;
            illust_ids.push(element.dataset.illust_id);
        }        

        for(var element of elements)
        {
            var illust_id = element.dataset.illust_id;
            if(illust_id == null)
                continue;

            // Get thumbnail info.
            var info = thumbnail_data.singleton().get_one_thumbnail_info(illust_id);
            if(info == null)
                continue;

            // Set this thumb.
            var url = info.url;
            var thumb = element.querySelector(".thumb");

            // Check if this illustration is muted (blocked).
            var muted_tag = muting.singleton.any_tag_muted(info.tags);
            var muted_user = muting.singleton.is_muted_user_id(info.userId);
            if(muted_tag || muted_user)
            {
                element.classList.add("muted");

                // The image will be obscured, but we still shouldn't load the image the user blocked (which
                // is something Pixiv does wrong).  Load the user profile image instead.
                thumb.src = info.profileImageUrl;

                element.querySelector(".muted-label").textContent = muted_tag? muted_tag:info.userName;

                // We can use this if we want a "show anyway' UI.
                thumb.dataset.mutedUrl = url;
            }
            else
            {
                thumb.src = url;

                // The search page thumbs are always square (aspect ratio 1).
                helpers.set_thumbnail_panning_direction(element, info.width, info.height, 1);
            }

            // Leave it alone if it's already been loaded.
            if(!("pending" in element.dataset))
                continue;

            // Why is this not working in FF?  It works in the console, but not here.  Sandboxing
            // issue?
            // delete element.dataset.pending;
            element.removeAttribute("data-pending");

            // Set the link.  Setting dataset.illustId will allow this to be handled with in-page
            // navigation, and the href will allow middle click, etc. to work normally.
            var link = element.querySelector("a.thumbnail-link");
            link.href = "/member_illust.php?mode=medium&illust_id=" + illust_id + "#ppixiv";
            if(info.pageCount > 1)
                link.href += "?view=manga";

            link.dataset.illustId = illust_id;
            link.dataset.userId = info.userId;

            if(info.illustType == 2)
                element.querySelector(".ugoira-icon").hidden = false;

            if(info.pageCount > 1)
            {
                element.querySelector(".page-count-box").hidden = false;
                element.querySelector(".page-count-box .page-count").textContent = info.pageCount;
            }

            helpers.set_class(element, "dot", helpers.tags_contain_dot(info));
            element.querySelector("A.similar-illusts-button").href = "/bookmark_detail.php?illust_id=" + illust_id + "#ppixiv";

            this.refresh_bookmark_icon(element);

            // Set the label.
            var label = element.querySelector(".thumbnail-label");
            // label.hidden = false;
            label.querySelector(".label").innerText = info.userName + ": " + info.title;
        }        
    }

    // Refresh the thumbnail for illust_id.
    //
    // This is used to refresh the bookmark icon when changing a bookmark.
    refresh_thumbnail(illust_id)
    {
        var ul = this.container.querySelector("ul.thumbnails");
        var thumbnail_element = ul.querySelector("[data-illust_id=\"" + illust_id + "\"]");
        if(thumbnail_element == null)
            return;
        this.refresh_bookmark_icon(thumbnail_element);
    }

    // Set the bookmarked heart for thumbnail_element.  This can change if the user bookmarks
    // or un-bookmarks an image.
    refresh_bookmark_icon(thumbnail_element)
    {
        var illust_id = thumbnail_element.dataset.illust_id;
        if(illust_id == null)
            return;

        // Get thumbnail info.
        var thumbnail_info = thumbnail_data.singleton().get_one_thumbnail_info(illust_id);
        if(thumbnail_info == null)
            return;

        var show_bookmark_heart = thumbnail_info.bookmarkData != null;
        if(this.data_source != null && !this.data_source.show_bookmark_icons)
            show_bookmark_heart = false;
        
        thumbnail_element.querySelector(".heart.public").hidden = !show_bookmark_heart || thumbnail_info.bookmarkData.private;
        thumbnail_element.querySelector(".heart.private").hidden = !show_bookmark_heart || !thumbnail_info.bookmarkData.private;
    }

    // Return a list of thumbnails that are either visible, or close to being visible
    // (so we load thumbs before they actually come on screen).
    //
    // If extra is true, return more offscreen thumbnails.
    get_visible_thumbnails(extra)
    {
        // If the container has a zero height, that means we're hidden and we don't want to load
        // thumbnail data at all.
        if(this.container.offsetHeight == 0)
            return [];

        // We'll load thumbnails when they're within this number of pixels from being onscreen.
        var threshold = 450;

        var ul = this.container.querySelector("ul.thumbnails");
        var elements = [];
        var bounds_top = this.container.scrollTop - threshold;
        var bounds_bottom = this.container.scrollTop + this.container.offsetHeight + threshold;
        for(var element = ul.firstElementChild; element != null; element = element.nextElementSibling)
        {
            if(element.offsetTop + element.offsetHeight < bounds_top)
                continue;
            if(element.offsetTop > bounds_bottom)
                continue;
            elements.push(element);
        }

        if(extra)
        {
            // Expand the list outwards to include more thumbs.
            var expand_by = 20;
            var expand_upwards = true;
            while(expand_by > 0)
            {
                if(!elements[0].previousElementSibling && !elements[elements.length-1].nextElementSibling)
                {
                    // Stop if there's nothing above or below our results to add.
                    break;
                }

                if(!expand_upwards && elements[0].previousElementSibling)
                {
                    elements.unshift(elements[0].previousElementSibling);
                    expand_by--;
                }
                else if(expand_upwards && elements[elements.length-1].nextElementSibling)
                {
                    elements.push(elements[elements.length-1].nextElementSibling);
                    expand_by--;
                }

                expand_upwards = !expand_upwards;
            }
        }
        return elements;
    }

    // Create a thumb placeholder.  This doesn't load the image yet.
    //
    // illust_id is the illustration this will be if it's displayed, or null if this
    // is a placeholder for pages we haven't loaded.  page is the page this illustration
    // is on (whether it's a placeholder or not).
    create_thumb(illust_id, page)
    {
        // Cache a reference to the thumbnail template.  We can do this a lot, and this
        // query takes a lot of page setup time if we run it for each thumb.
        if(this.thumbnail_template == null)
            this.thumbnail_template = document.body.querySelector(".template-thumbnail");
            
        var entry = helpers.create_from_template(this.thumbnail_template);

        // Mark that this thumb hasn't been filled in yet.
        entry.dataset.pending = true;

        if(illust_id != null)
            entry.dataset.illust_id = illust_id;
        entry.dataset.page = page;
        return entry;
    }

    // This is called when thumbnail_data has loaded more thumbnail info.
    thumbs_loaded(e)
    {
        this.set_visible_thumbs();
    }

    // Scroll to illust_id if it's available.  This is called when we display the thumbnail view
    // after coming from an illustration.
    scroll_to_illust_id(illust_id)
    {
        var thumb = this.container.querySelector("li[data-illust_id='" + illust_id + "']");
        if(thumb == null)
            return;

        // If the item isn't visible, center it.
        var scroll_pos = this.container.scrollTop;
        if(thumb.offsetTop < scroll_pos || thumb.offsetTop + thumb.offsetHeight > scroll_pos + this.container.offsetHeight)
            this.container.scrollTop = thumb.offsetTop + thumb.offsetHeight/2 - this.container.offsetHeight/2;
    };

    pulse_thumbnail(illust_id)
    {
        var thumb = this.container.querySelector("li[data-illust_id='" + illust_id + "']");
        if(thumb == null)
            return;

        this.stop_pulsing_thumbnail();

        this.flashing_image = thumb;
        thumb.classList.add("flash");
    };

    // Work around a bug in CSS animations: even if animation-iteration-count is 1,
    // the animation will play again if the element is hidden and displayed again, which
    // causes previously-flashed thumbnails to flash every time we exit and reenter
    // thumbnails.
    stop_pulsing_thumbnail()
    {
        if(this.flashing_image == null)
            return;

        this.flashing_image.classList.remove("flash");
        this.flashing_image = null;
    };
};

// A full page viewer for manga thumbnails.
//
// This is similar to the main search view.  It doesn't share code, since it
// works differently enough that it would complicate things too much.
class view_manga extends view
{
    constructor(container)
    {
        super(container);

        this.refresh_ui = this.refresh_ui.bind(this);
        this.window_onresize = this.window_onresize.bind(this);
        this.refresh_images = this.refresh_images.bind(this);

        window.addEventListener("resize", this.window_onresize);

        this.progress_bar = main_controller.singleton.progress_bar;
        this.ui = new image_ui(this.container.querySelector(".ui-container"), this.progress_bar);
        this.scroll_positions_by_illust_id = {};
        
        image_data.singleton().user_modified_callbacks.register(this.refresh_ui);
        image_data.singleton().illust_modified_callbacks.register(this.refresh_ui);

        settings.register_change_callback("manga-thumbnail-size", this.refresh_images);
        
        // Create a style for our thumbnail style.
        this.thumbnail_dimensions_style = document.createElement("style");
        document.body.appendChild(this.thumbnail_dimensions_style);

        this.active = false;
    }

    window_onresize(e)
    {
        if(!this.active)
            return;
        
        console.log("resize");
        this.refresh_images();
    }

    set active(active)
    {
        if(this.active == active)
            return;

        this._active = active;

        if(!active)
        {
            // Save the old scroll position.
            if(this.illust_id != null)
            {
                console.log("save scroll position for", this.illust_id, this.container.scrollTop);
                this.scroll_positions_by_illust_id[this.illust_id] = this.container.scrollTop;
            }

            // Hide the dropdown tag widget.
            this.ui.bookmark_tag_widget.visible = false;

            // Stop showing the user in the context menu.
            main_context_menu.get.user_info = null;
        }

        super.active = active;

        if(active)
            this.load_illust_id();
        else
        {
            // Clear the image list so it doesn't flash on screen later.
            var ul = this.container.querySelector("ul.thumbnails");
            helpers.remove_elements(ul);
        }
    }

    get active()
    {
        return this._active;
    }

    get shown_illust_id()
    {
        return this.illust_id;
    }

    set shown_illust_id(illust_id)
    {
        if(this.illust_id == illust_id)
            return;

        this.illust_id = illust_id;
        this.illust_info = null;
        this.ui.illust_id = illust_id;

        // Refresh even if illust_id is null, so we quickly clear the view.
        this.refresh_ui();
        if(this.illust_id == null)
            return;

        if(!this.active)
            return;

        this.load_illust_id();
    }

    async load_illust_id()
    {
        if(this.illust_id == null)
            return;
        
        console.log("Loading manga view for:", this.illust_id);

        // Load image info.
        var illust_info = await image_data.singleton().get_image_info(this.illust_id);
        if(illust_info.id != this.illust_id)
            return;

        this.illust_info = illust_info;

        this.refresh_ui();
    }

    get displayed_illust_id()
    {
        return this.illust_id;        
    }
    
    refresh_ui()
    {
        if(!this._active)
            return;
        
        helpers.set_title_and_icon(this.illust_info);

        // Tell the context menu which user is being viewed.
        main_context_menu.get.user_info = this.illust_info.userInfo;

        this.refresh_images();
    }

    refresh_images()
    {
        var original_scroll_top = this.container.scrollTop;

        // Remove all existing entries and collect them.
        var ul = this.container.querySelector("ul.thumbnails");
        helpers.remove_elements(ul);

        if(this.illust_info == null)
            return;

        // Get the aspect ratio to crop images to.
        var ratio = this.get_display_aspect_ratio(this.illust_info.mangaPages);

        this.thumbnail_dimensions_style.textContent = helpers.make_thumbnail_sizing_style(ul, ".view-manga-container", {
            wide: true,
            size: this.ui.thumbnail_size_slider.thumbnail_size,
            ratio: ratio,

            // We preload this page anyway since it doesn't cause a lot of API calls, so we
            // can allow a high column count and just let the size take over.
            max_columns: 15,
        });

        for(var page = 0; page < this.illust_info.mangaPages.length; ++page)
        {
            var manga_page = this.illust_info.mangaPages[page];
            
            var entry = this.create_thumb(page, manga_page);
            var link = entry.querySelector(".thumbnail-link");
            helpers.set_thumbnail_panning_direction(entry, manga_page.width, manga_page.height, ratio);
            
            ul.appendChild(entry);
        }
        
        // Restore the value of scrollTop from before we updated.  For some reason, Firefox
        // modifies scrollTop after we add a bunch of items, which causes us to scroll to
        // the wrong position, even though scrollRestoration is disabled.
        this.container.scrollTop = original_scroll_top;
    }

    // Given a list of manga infos, return the aspect ratio we'll crop them to.
    get_display_aspect_ratio(manga_info)
    {
        // A lot of manga posts use the same resolution for all images, or just have
        // one or two exceptions for things like title pages.  If most images have
        // about the same aspect ratio, use it.
        var total = 0;
        for(var manga_page of manga_info)
            total += manga_page.width / manga_page.height;
        var average_aspect_ratio = total / manga_info.length;

        var illusts_far_from_average = 0;
        for(var manga_page of manga_info)
        {
            var ratio = manga_page.width / manga_page.height;
            if(Math.abs(average_aspect_ratio - ratio) > 0.1)
                illusts_far_from_average++;
        }

        // If we didn't find a common aspect ratio, just use square thumbs.
        if(illusts_far_from_average > 3)
            return 1;
        else
            return average_aspect_ratio;
    }

    get_display_resolution(width, height)
    {
        var fit_width = 300;
        var fit_height = 300;

        var ratio = width / fit_width;
        if(ratio > 1)
        {
            height /= ratio;
            width /= ratio;
        }

        var ratio = height / fit_height;
        if(ratio > 1)
        {
            height /= ratio;
            width /= ratio;
        }

        return [width, height];
    }

    create_thumb(page_idx, manga_page)
    {
        if(this.thumbnail_template == null)
            this.thumbnail_template = document.body.querySelector(".template-manga-view-thumbnail");
            
        var element = helpers.create_from_template(this.thumbnail_template);

        // These URLs should be the 540x540_70 master version, which is a non-squared high-res
        // thumbnail.  These tend to be around 30-40k, so loading a full manga set of them is
        // quick.
        //
        // XXX: switch this to 540x540_10_webp in Chrome, around 5k?
        var thumb = element.querySelector(".thumb");
        var url = manga_page.urls.small;
//        url = url.replace("/540x540_70/", "/540x540_10_webp/");
        thumb.src = url;
       
        var size = this.get_display_resolution(manga_page.width, manga_page.height);
        thumb.width = size[0];
        thumb.height = size[1];
        
        var link = element.querySelector("a.thumbnail-link");
        link.href = "/member_illust.php?mode=medium&illust_id=" + this.illust_id + "#ppixiv?page=" + (page_idx+1);
        link.dataset.illustId = this.illust_id;
        link.dataset.pageIdx = page_idx;

        element.dataset.pageIdx = page_idx;
        return element;
    }

    scroll_to_top()
    {
        // Read offsetHeight to force layout to happen.  If we don't do this, setting scrollTop
        // sometimes has no effect in Firefox.
        this.container.offsetHeight;
        this.container.scrollTop = 0;
        console.log("scroll to top", this.container.scrollTop, this.container.hidden, this.container.offsetHeight);
    }

    restore_scroll_position()
    {
        // If we saved a scroll position when navigating away from a data source earlier,
        // restore it now.  Only do this once.
        var scroll_pos = this.scroll_positions_by_illust_id[this.illust_id];
        if(scroll_pos != null)
        {
            console.log("scroll pos:", scroll_pos);
            this.container.scrollTop = scroll_pos;
            delete this.scroll_positions_by_illust_id[this.illust_id];
        }
        else
            this.scroll_to_top();
    }

    scroll_to_illust_id(illust_id, manga_page)
    {
        if(manga_page == null)
            return;

        var thumb = this.container.querySelector('[data-page-idx="' + manga_page + '"]');
        if(thumb == null)
            return;

        console.log("Scrolling to", thumb);

        // If the item isn't visible, center it.
        var scroll_pos = this.container.scrollTop;
        if(thumb.offsetTop < scroll_pos || thumb.offsetTop + thumb.offsetHeight > scroll_pos + this.container.offsetHeight)
            this.container.scrollTop = thumb.offsetTop + thumb.offsetHeight/2 - this.container.offsetHeight/2;
    }

    handle_onkeydown(e)
    {
        this.ui.handle_onkeydown(e);
    }    
}

// This handles the overlay UI on the illustration page.
class image_ui
{
    constructor(container, progress_bar)
    {
        this.image_data_loaded = this.image_data_loaded.bind(this);
        this.clicked_download = this.clicked_download.bind(this);
        this.refresh = this.refresh.bind(this);

        this.container = container;
        this.progress_bar = progress_bar;

        this.ui = helpers.create_from_template(".template-image-ui");
        this.container.appendChild(this.ui);

        this.avatar_widget = new avatar_widget({
            parent: this.container.querySelector(".avatar-popup"),
            mode: "dropdown",
        });

        this.tag_widget = new tag_widget({
            parent: this.container.querySelector(".tag-list"),
        });

        // Set up hover popups.
        dropdown_menu_opener.create_handlers(this.container, [".image-settings-menu-box"]);
        
        image_data.singleton().illust_modified_callbacks.register(this.refresh);
        
        this.bookmark_tag_widget = new bookmark_tag_list_widget(this.container.querySelector(".popup-bookmark-tag-dropdown-container"));
        this.toggle_tag_widget = new toggle_bookmark_tag_list_widget(this.container.querySelector(".button-bookmark-tags"), this.bookmark_tag_widget);
        this.like_button = new like_button_widget(this.container.querySelector(".button-like"));

        // The bookmark buttons, and clicks in the tag dropdown:
        this.bookmark_buttons = [];
        for(var a of this.container.querySelectorAll(".button-bookmark"))
            this.bookmark_buttons.push(new bookmark_button_widget(a, a.classList.contains("private"), this.bookmark_tag_widget));

        this.container.querySelector(".download-button").addEventListener("click", this.clicked_download);
        this.container.querySelector(".navigate-out-button").addEventListener("click", function(e) {
            main_controller.singleton.navigate_out();
        }.bind(this));

        var settings_menu = this.container.querySelector(".settings-menu-box > .popup-menu-box");
        
        // Only add the thumbnail size option in the manga page.  We don't want it in
        // the illust page and its hotkey handling will confuse zooming.
        if(this.container.closest(".view-manga-container"))
        {
            this.thumbnail_size_slider = new thumbnail_size_slider_widget(settings_menu, {
                label: "Thumbnail size",
                setting: "manga-thumbnail-size",
                min: 0,
                max: 5,
            });
        }

        new menu_option_toggle(settings_menu, {
            label: "Bookmarking auto-likes",
            setting: "auto-like",
        });

        // Firefox's contextmenu behavior is broken, so hide this option.
        if(navigator.userAgent.indexOf("Firefox/") == -1)
        {
            new menu_option_toggle(settings_menu, {
                label: "Hold shift to open context menu",
                setting: "invert-popup-hotkey",
            });
        }
    }

    set data_source(data_source)
    {
        if(this._data_source == data_source)
            return;

        this._data_source = data_source;
        this.refresh();
    }
    
    shutdown()
    {
        image_data.singleton().illust_modified_callbacks.unregister(this.refresh);
        this.avatar_widget.shutdown();
    }

    get illust_id()
    {
        return this._illust_id;
    }

    set illust_id(illust_id)
    {
        if(this._illust_id == illust_id)
            return;

        this._illust_id = illust_id;
        this.illust_data = null;
        image_data.singleton().get_image_info(illust_id).then((illust_info) => {
            this.image_data_loaded(illust_info);
        }).catch((e) => {
            console.error(e);
        });

        this.like_button.illust_id = illust_id;
        this.bookmark_tag_widget.illust_id = illust_id;
        this.toggle_tag_widget.illust_id = illust_id;
        for(var button of this.bookmark_buttons)
            button.illust_id = illust_id;
        
    }

    handle_onkeydown(e)
    {
        this.avatar_widget.handle_onkeydown(e);
        if(e.defaultPrevented)
            return;

        if(e.keyCode == 66) // b
        {
            // b to bookmark publically, B to bookmark privately, ^B to remove a bookmark.
            //
            // Use a separate hotkey to remove bookmarks, rather than toggling like the bookmark
            // button does, so you don't have to check whether an image is bookmarked.  You can
            // just press B to bookmark without worrying about accidentally removing a bookmark
            // instead.
            e.stopPropagation();
            e.preventDefault();

            var illust_data = this.illust_data;
            if(illust_data == null)
                return;

            if(e.ctrlKey)
            {
                // Remove the bookmark.
                if(illust_data.bookmarkData == null)
                {
                    message_widget.singleton.show("Image isn't bookmarked");
                    return;
                }

                actions.bookmark_remove(illust_data);
                
                return;
            }

            if(illust_data.bookmarkData)
            {
                message_widget.singleton.show("Already bookmarked (^B to remove bookmark)");
                return;
            }
            
            actions.bookmark_add(illust_data, {
                private: e.shiftKey
            });
            
            return;
        }
        
        if(e.ctrlKey || e.altKey)
            return;

        switch(e.keyCode)
        {
        case 86: // v
            e.stopPropagation();
            e.preventDefault();
            actions.like_image(this.illust_data);
            return;
        }
    }

    image_data_loaded(illust_data)
    {
        if(illust_data.illustId != this._illust_id)
            return;

        this.illust_data = illust_data;
        this.refresh();
    }

    refresh()
    {
        if(this.illust_data == null)
            return;

        var illust_data = this.illust_data;
        var illust_id = illust_data.illustId;
        var user_data = illust_data.userInfo;
        
        // Show the author if it's someone else's post, or the edit link if it's ours.
        var our_post = global_data.user_id == user_data.userId;
        this.container.querySelector(".author-block").hidden = our_post;
        this.container.querySelector(".edit-post").hidden = !our_post;
        this.container.querySelector(".edit-post").href = "/member_illust_mod.php?mode=mod&illust_id=" + illust_id;

        this.avatar_widget.set_from_user_data(user_data);
        this.tag_widget.set(illust_data.tags);

        var element_title = this.container.querySelector(".title");
        element_title.textContent = illust_data.illustTitle;
        element_title.href = "/member_illust.php?mode=medium&illust_id=" + illust_id + "#ppixiv";

        var element_author = this.container.querySelector(".author");
        element_author.textContent = user_data.name;
        element_author.href = "/member_illust.php?id=" + user_data.userId + "#ppixiv";
        
        this.container.querySelector(".similar-illusts-button").href = "/bookmark_detail.php?illust_id=" + illust_id + "#ppixiv";

        // Fill in the post info text.
        this.set_post_info(this.container.querySelector(".post-info"));

        // The comment (description) can contain HTML.
        var element_comment = this.container.querySelector(".description");
        element_comment.hidden = illust_data.illustComment == "";
        element_comment.innerHTML = illust_data.illustComment;
        helpers.fix_pixiv_links(element_comment);
        helpers.make_pixiv_links_internal(element_comment);

        // Set the download button popup text.
        if(this.illust_data != null)
        {
            var download_type = actions.get_download_type_for_image(this.illust_data);
            
            var download_button = this.container.querySelector(".download-button");
            download_button.hidden = download_type == null;
            if(download_type != null)
                download_button.dataset.popup = "Download " + download_type;
        }

        // Set the popup for the thumbnails button.
        var navigate_out_label = main_controller.singleton.navigate_out_label;
        var title = navigate_out_label != null? ("Return to " + navigate_out_label):"";
        this.container.querySelector(".navigate-out-button").dataset.popup = title;
    }

    set_post_info(post_info_container)
    {
        var illust_data = this.illust_data;

        var set_info = (query, text) =>
        {
            var node = post_info_container.querySelector(query);
            node.innerText = text;
            node.hidden = text == "";
        };

        var seconds_old = (new Date() - new Date(illust_data.createDate)) / 1000;
        set_info(".post-age", helpers.age_to_string(seconds_old) + " ago");
        post_info_container.querySelector(".post-age").dataset.popup = helpers.date_to_string(illust_data.createDate);

        var info = "";

        // Add the resolution and file type if available.
        if(this.displayed_page != null && this.illust_data != null)
        {
            var page_info = this.illust_data.mangaPages[this.displayed_page];
            page_info.width;
        
            info += page_info.width + "x" + page_info.height;
        }

        var ext = this.viewer? this.viewer.current_image_type:null;
        if(ext != null)
            info += " " + ext;

        set_info(".image-info", info);

        var duration = "";
        if(illust_data.illustType == 2)
        {
            var seconds = 0;
            for(var frame of illust_data.ugoiraMetadata.frames)
                seconds += frame.delay / 1000;

            var duration = seconds.toFixed(duration >= 10? 0:1);
            duration += seconds == 1? " second":" seconds";
        }
        set_info(".ugoira-duration", duration);
        set_info(".ugoira-frames", illust_data.illustType == 2? (illust_data.ugoiraMetadata.frames.length + " frames"):"");

        // Add the page count for manga.
        var page_text = "";
        if(illust_data.pageCount > 1 && this.displayed_page != null)
            page_text = "Page " + (this.displayed_page+1) + "/" + illust_data.pageCount;
        set_info(".page-count", page_text);
    }

    // Set the resolution to display in image info.  If both are null, no resolution
    // is displayed.
    set_displayed_page_info(page)
    {
        this.displayed_page = page;
        this.refresh();
    }

    clicked_download(e)
    {
        if(this.illust_data == null)
            return;

        var clicked_button = e.target.closest(".download-button");
        if(clicked_button == null)
            return;

        e.preventDefault();
        e.stopPropagation();

        actions.download_illust(this.illust_data, this.progress_bar.controller());
    }
 }

// This handles the dropdown for an <input> showing recent searches and autocompletion.
// The dropdown will be placed as a sibling of the input, and the parent of both nodes
// should be a position: relative so we can position the dropdown correctly.
class tag_search_dropdown_widget
{
    constructor(input_element)
    {
        this.dropdown_onclick = this.dropdown_onclick.bind(this);
        this.input_onfocus = this.input_onfocus.bind(this);
        this.input_onblur = this.input_onblur.bind(this);
        this.input_onkeydown = this.input_onkeydown.bind(this);
        this.input_oninput = this.input_oninput.bind(this);
        this.parent_onmouseenter = this.parent_onmouseenter.bind(this);
        this.parent_onmouseleave = this.parent_onmouseleave.bind(this);
        this.populate_dropdown = this.populate_dropdown.bind(this);

        this.input_element = input_element;
        this.parent_node = input_element.parentNode;

        this.input_element.addEventListener("focus", this.input_onfocus);
        this.input_element.addEventListener("blur", this.input_onblur);
        this.input_element.addEventListener("keydown", this.input_onkeydown);
        this.input_element.addEventListener("input", this.input_oninput);
        this.parent_node.addEventListener("mouseenter", this.parent_onmouseenter);
        this.parent_node.addEventListener("mouseleave", this.parent_onmouseleave);

        // Refresh the dropdown when the tag search history changes.
        window.addEventListener("recent-tag-searches-changed", this.populate_dropdown);

        // Add the dropdown widget to the input's parent.
        this.tag_dropdown = helpers.create_from_template(".template-tag-dropdown");
        this.tag_dropdown.addEventListener("click", this.dropdown_onclick);
        this.parent_node.appendChild(this.tag_dropdown);

        this.current_autocomplete_results = [];

        this.hide();
        this.populate_dropdown();

        new view_hidden_listener(this.input_element, (e) => {
            this.hide();
        });
    }

    dropdown_onclick(e)
    {
        var remove_entry = e.target.closest(".remove-history-entry");
        if(remove_entry != null)
        {
            // Clicked X to remove a tag from history.
            e.stopPropagation();
            e.preventDefault();
            var tag = e.target.closest(".entry").dataset.tag;
            helpers.remove_recent_search_tag(tag);
            return;
        }

        // Close the dropdown if the user clicks a tag (but not when clicking
        // remove-history-entry).
        if(e.target.closest(".tag"))
            this.hide();
    }

    // Show the dropdown when the input is focused.  Hide it when the input is both
    // unfocused and this.parent_node isn't being hovered.  This way, the input focus
    // can leave the input box to manipulate the dropdown without it being hidden,
    // but we don't rely on hovering to keep the dropdown open.
    input_onfocus(e)
    {
        this.input_focused = true;
        this.show();
    }

    input_onblur(e)
    {
        this.input_focused = false;
        if(!this.input_focused && !this.mouse_over_parent)
            this.hide();
    }

    parent_onmouseenter(e)
    {
        this.mouse_over_parent = true;
    }
    parent_onmouseleave(e)
    {
        this.mouse_over_parent = false;
        if(!this.input_focused && !this.mouse_over_parent)
            this.hide();
    }

    input_onkeydown(e)
    {
        switch(e.keyCode)
        {
        case 38: // up arrow
        case 40: // down arrow
            e.preventDefault();
            e.stopImmediatePropagation();
            this.move(e.keyCode == 40);
            break;
        }
        
    }

    input_oninput(e)
    {
        // Clear the selection on input.
        this.set_selection(null);

        // Update autocomplete when the text changes.
        this.run_autocomplete();
    }

    show()
    {
        if(!this.tag_dropdown.hidden)
            return;

        this.populate_dropdown();
        this.tag_dropdown.hidden = false;
    }

    hide()
    {
        this.tag_dropdown.hidden = true;

        // Make sure the input isn't focused.
        this.input_element.blur();
    }

    async run_autocomplete()
    {
        // If true, this is a value change caused by keyboard navigation.  Don't run autocomplete,
        // since we don't want to change the dropdown due to navigating in it.
        if(this.navigating)
            return;
        
        var tags = this.input_element.value.trim();

        // Stop if we're already up to date.
        if(this.most_recent_search == tags)
            return;

        if(this.autocomplete_request != null)
        {
            // If an autocomplete request is already running, let it finish before we
            // start another.  This matches the behavior of Pixiv's input forms.
            console.log("Delaying search for", tags);
            return;
        }

        if(tags == "")
        {
            // Don't send requests with an empty string.  Just finish the search synchronously,
            // so we clear the autocomplete immediately.
            if(this.abort_autocomplete != null)
                this.abort_autocomplete.abort();
            this.autocomplete_request_finished("", { candidates: [] });
            return;
        }

        // Run the search.
        try {
            this.abort_autocomplete = new AbortController();
            var result = await helpers.rpc_get_request("/rpc/cps.php", {
                keyword: tags,
            }, {
                signal: this.abort_autocomplete.signal,
            });

            this.autocomplete_request_finished(tags, result);
        } catch(e) {
            console.info("Tag autocomplete aborted:", e);
        } finally {
            this.abort_autocomplete = null;
        }
    }
    
    // A tag autocomplete request finished.
    autocomplete_request_finished(tags, result)
    {
        this.most_recent_search = tags;
        this.abort_autocomplete = null;

        // Store the new results.
        this.current_autocomplete_results = result.candidates || [];

        // Refresh the dropdown with the new results.
        this.populate_dropdown();

        // If the input element's value has changed since we started this search, we
        // stalled any other autocompletion.  Start it now.
        if(tags != this.input_element.value)
        {
            console.log("Run delayed autocomplete");
            this.run_autocomplete();
        }
    }
    
    create_entry(tag)
    {
        var entry = helpers.create_from_template(".template-tag-dropdown-entry");
        entry.dataset.tag = tag;
        entry.querySelector(".tag").innerText = tag;

        var url = page_manager.singleton().get_url_for_tag_search(tag);
        entry.querySelector("A.tag").href = url;
        return entry;
    }

    set_selection(idx)
    {
        // Temporarily set this.navigating to true.  This lets run_autocomplete know that
        // it shouldn't run an autocomplete request for this value change.
        this.navigating = true;
        try {
            // If there's an autocomplete request in the air, cancel it.
            if(this.abort_autocomplete != null)
                this.abort_autocomplete.abort();

            // Clear any old selection.
            var all_entries = this.tag_dropdown.querySelectorAll(".input-dropdown-list .entry");
            if(this.selected_idx != null)
                all_entries[this.selected_idx].classList.remove("selected");

            // Set the new selection.
            this.selected_idx = idx;
            if(this.selected_idx != null)
            {
                var new_entry = all_entries[this.selected_idx];
                new_entry.classList.add("selected");
                this.input_element.value = new_entry.dataset.tag;
            }
        } finally {
            this.navigating = false;
        }
    }

    // Select the next or previous entry in the dropdown.
    move(down)
    {
        var all_entries = this.tag_dropdown.querySelectorAll(".input-dropdown-list .entry");

        // Stop if there's nothing in the list.
        var total_entries = all_entries.length;
        if(total_entries == 0)
            return;

        var idx = this.selected_idx;
        if(idx == null)
            idx = down? 0:(total_entries-1);
        else
            idx += down? +1:-1;
        idx %= total_entries;

        this.set_selection(idx);
    }

    populate_dropdown()
    {
        var list = this.tag_dropdown.querySelector(".input-dropdown-list");
        helpers.remove_elements(list);

        var tags = helpers.get_value("recent-tag-searches") || [];
        var autocompleted_tags = this.current_autocomplete_results;
        
        for(var tag of autocompleted_tags)
        {
            var entry = this.create_entry(tag.tag_name);
            entry.classList.add("autocomplete");
            list.appendChild(entry);
        }

        for(var tag of tags)
        {
            var entry = this.create_entry(tag);
            entry.classList.add("history");
            list.appendChild(entry);
        }
    }
}

// This handles batch fetching data for thumbnails.
//
// We can load a bunch of images at once with illust_list.php.  This isn't enough to
// display the illustration, since it's missing a lot of data, but it's enough for
// displaying thumbnails (which is what the page normally uses it for).
class thumbnail_data
{
    constructor()
    {
        this.loaded_thumbnail_info = this.loaded_thumbnail_info.bind(this);

        // Cached data:
        this.thumbnail_data = { };

        // IDs that we're currently requesting:
        this.loading_ids = {};
    };

    // Return the singleton, creating it if needed.
    static singleton()
    {
        if(thumbnail_data._singleton == null)
            thumbnail_data._singleton = new thumbnail_data();
        return thumbnail_data._singleton;
    };

    // Return true if all thumbs in illust_ids have been loaded, or are currently loading.
    //
    // We won't start fetching IDs that aren't loaded.
    are_all_ids_loaded_or_loading(illust_ids)
    {
        for(var illust_id of illust_ids)
        {
            if(this.thumbnail_data[illust_id] == null && !this.loading_ids[illust_id])
                return false;
        }
        return true;
    }
    
    // Return thumbnail data for illud_id, or null if it's not loaded.
    //
    // The thumbnail data won't be loaded if it's not already available.  Use get_thumbnail_info
    // to load thumbnail data in batches.
    get_one_thumbnail_info(illust_id)
    {
        return this.thumbnail_data[illust_id];
    }

    // Return thumbnail data for illust_ids, and start loading any requested IDs that aren't
    // already loaded.
    get_thumbnail_info(illust_ids)
    {
        var result = {};
        var needed_ids = [];
        for(var illust_id of illust_ids)
        {
            var data = this.thumbnail_data[illust_id];
            if(data == null)
            {
                needed_ids.push(illust_id);
                continue;
            }
            result[illust_id] = data;
        }

        // Load any thumbnail data that we didn't have.
        if(needed_ids.length)
            this.load_thumbnail_info(needed_ids);

        return result;
    }

    // Load thumbnail info for the given list of IDs.
    async load_thumbnail_info(illust_ids)
    {
        // Make a list of IDs that we're not already loading.
        var ids_to_load = [];
        for(var id of illust_ids)
            if(this.loading_ids[id] == null)
                ids_to_load.push(id);

        if(ids_to_load.length == 0)
            return;

        for(var id of ids_to_load)
            this.loading_ids[id] = true;

        // There's also
        //
        // https://www.pixiv.net/ajax/user/user_id/profile/illusts?ids[]=1&ids[]=2&...
        //
        // which is used by newer pages.  That's useful since it tells us whether each
        // image is bookmarked.  However, it doesn't tell us the user's name or profile image
        // URL, and for some reason it's limited to a particular user.  Hopefully they'll
        // have an updated generic illustration lookup call if they ever update the
        // regular search pages, and we can switch to it then.
        var result = await helpers.rpc_get_request("/rpc/illust_list.php", {
            illust_ids: ids_to_load.join(","),

            // Specifying this gives us 240x240 thumbs, which we want, rather than the 150x150
            // ones we'll get if we don't (though changing the URL is easy enough too).
            page: "discover",

            // We do our own muting, but for some reason this flag is needed to get bookmark info.
            exclude_muted_illusts: 1,
        });

        this.loaded_thumbnail_info(result, "illust_list");
    }

    // Get the mapping from /ajax/user/id/illusts/bookmarks to illust_list.php's keys.
    get thumbnail_info_map_illust_list()
    {
        if(this._thumbnail_info_map_illust_list != null)
            return this._thumbnail_info_map_illust_list;

        this._thumbnail_info_map_illust_list = [
            ["illust_id", "id"],
            ["url", "url"],
            ["tags", "tags"],
            ["illust_user_id", "userId"],
            ["illust_width", "width"],
            ["illust_height", "height"],
            ["illust_type", "illustType"],
            ["illust_page_count", "pageCount"],
            ["illust_title", "title"],
            ["user_profile_img", "profileImageUrl"],
            ["user_name", "userName"],
        ];
        return this._thumbnail_info_map_illust_list;
    };

    // Get the mapping from search.php and bookmark_new_illust.php to illust_list.php's keys.
    get thumbnail_info_map_following()
    {
        if(this._thumbnail_info_map_following != null)
            return this._thumbnail_info_map_following;

        this._thumbnail_info_map_following = [
            ["illustId", "id"],
            ["url", "url"],
            ["tags", "tags"],
            ["userId", "userId"],
            ["width", "width"],
            ["height", "height"],
            ["pageCount", "pageCount"],
            ["illustTitle", "title"],
            ["userName", "userName"],
            ["illustType", "illustType"],
//            ["user_profile_img", "profileImageUrl"],
        ];
        return this._thumbnail_info_map_following;
    };

    get thumbnail_info_map_ranking()
    {
        if(this._thumbnail_info_map_ranking != null)
            return this._thumbnail_info_map_ranking;

        this._thumbnail_info_map_ranking = [
            ["illust_id", "id"],
            ["url", "url"],
            ["tags", "tags"],
            ["user_id", "userId"],
            ["width", "width"],
            ["height", "height"],
            ["illust_page_count", "pageCount"],
            ["title", "title"],
            ["user_name", "userName"],
            ["illust_type", "illustType"],
//            ["profile_img", "profileImageUrl"],
        ];
        return this._thumbnail_info_map_ranking;
    };

    
    // Given a low-res thumbnail URL from thumbnail data, return a high-res thumbnail URL.
    get_high_res_thumbnail_url(url)
    {
        // path should look like
        //
        // /c/250x250_80_a2/img-master/img/.../12345678_square1200.jpg
        //
        // where 250x250_80_a2 is the resolution and probably JPEG quality.  We want
        // the higher-res thumbnail (which is "small" in the full image data), which
        // looks like:
        //
        // /c/540x540_70/img-master/img/.../12345678_master1200.jpg
        //
        // The resolution field is changed, and "square1200" is changed to "master1200".
        var url = new URL(url, document.location);
        var path = url.pathname;
        var re = /(\/c\/)([^\/]+)(.*)(square1200|master1200).jpg/;
        var match = re.exec(path);
        if(match == null)
        {
            console.warn("Couldn't parse thumbnail URL:", path);
            return url.toString();
        }

        url.pathname = match[1] + "540x540_70" + match[3] + "master1200.jpg";
        return url.toString();

    }

    // This is called when we have new thumbnail data available.  thumb_result is
    // an array of thumbnail items.
    //
    // This can come from a bunch of different places, which all return the same data, but
    // each in a different way:
    //
    // name           URL
    // normal         /ajax/user/id/illusts/bookmarks
    // illust_list    illust_list.php 
    // following      bookmark_new_illust.php 
    // following      search.php 
    // rankings       ranking.php
    //
    // We map each of these to "normal".
    //
    // These have the same data, but for some reason everything has different names.  
    // Remap them to "normal", and check that all fields we expect exist, to make it
    // easier to notice if something is wrong.
    loaded_thumbnail_info(thumb_result, source)
    {
        if(thumb_result.error)
            return;

        var thumbnail_info_map = this.thumbnail_info_map_illust_list;
        var urls = [];
        for(var thumb_info of thumb_result)
        {
            if(source == "normal")
            {
                // The data is already in the format we want.  Just check that all keys we
                // expect exist, and remove any keys we don't know about so we don't use them
                // accidentally.
                var thumbnail_info_map = this.thumbnail_info_map_illust_list;
                var remapped_thumb_info = { };
                for(var pair of thumbnail_info_map)
                {
                    var key = pair[1];
                    if(!(key in thumb_info))
                    {
                        console.warn("Thumbnail info is missing key:", key);
                        continue;
                    }
                    remapped_thumb_info[key] = thumb_info[key];
                }

                if(!('bookmarkData' in thumb_info))
                    console.warn("Thumbnail info is missing key: bookmarkData");
                else
                {
                    remapped_thumb_info.bookmarkData = thumb_info.bookmarkData;

                    // See above.
                    if(remapped_thumb_info.bookmarkData != null)
                        delete remapped_thumb_info.bookmarkData.bookmarkId;
                }

                // Switch the URL from the low-res thumbnail to a higher-res one.
                remapped_thumb_info.url = this.get_high_res_thumbnail_url(remapped_thumb_info.url);
            }
            else if(source == "illust_list" || source == "following" || source == "rankings")
            {
                // Get the mapping for this mode.
                var thumbnail_info_map = 
                    source == "illust_list"? this.thumbnail_info_map_illust_list:
                    source == "following"?  this.thumbnail_info_map_following:
                    this.thumbnail_info_map_ranking;

                var remapped_thumb_info = { };
                for(var pair of thumbnail_info_map)
                {
                    var from_key = pair[0];
                    var to_key = pair[1];
                    if(!(from_key in thumb_info))
                    {
                        console.warn("Thumbnail info is missing key:", from_key);
                        continue;
                    }
                    var value = thumb_info[from_key];
                    remapped_thumb_info[to_key] = value;
                }

                // Make sure that the illust IDs and user IDs are strings.
                remapped_thumb_info.id = "" + remapped_thumb_info.id;
                remapped_thumb_info.userId = "" + remapped_thumb_info.userId;

                // Bookmark data is a special case.
                //
                // The old API has is_bookmarked: true, bookmark_id: "id" and bookmark_illust_restrict: 0 or 1.
                // bookmark_id and bookmark_illust_restrict are omitted if is_bookmarked is false.
                //
                // The new API is a dictionary:
                //
                // bookmarkData = {
                //     bookmarkId: id,
                //     private: false
                // }
                //
                // or null if not bookmarked.
                //
                // A couple sources of thumbnail data (bookmark_new_illust.php and search.php)
                // don't return the bookmark ID.  We don't use this (we only edit bookmarks from
                // the image page, where we have full image data), so we omit bookmarkId from this
                // data.
                //
                // Some pages return buggy results.  /ajax/user/id/profile/all includes bookmarkData,
                // but private is always false, so we can't tell if it's a private bookmark.  This is
                // a site bug that we can't do anything about (it affects the site too).
                remapped_thumb_info.bookmarkData = null;
                if(source == "illust_list" || source == "rankings")
                {
                    if(!('is_bookmarked' in thumb_info))
                        console.warn("Thumbnail info is missing key: is_bookmarked");
                    if(thumb_info.is_bookmarked)
                    {
                        remapped_thumb_info.bookmarkData = {
                            // See above.
                            // bookmarkId: thumb_info.bookmark_id,
                            private: thumb_info.bookmark_illust_restrict == 1,
                        };
                    }
                }
                else if(source == "following")
                {
                    // Why are there fifteen API variants for everything?  It's as if they
                    // hire a contractor for every feature and nobody ever talks to each other,
                    // so every feature has its own new API layout.
                    if(!('isBookmarked' in thumb_info))
                        console.warn("Thumbnail info is missing key: isBookmarked");
                    if(thumb_info.isBookmarked)
                    {
                        remapped_thumb_info.bookmarkData = {
                            private: thumb_info.isPrivateBookmark,
                        };
                    }
                }

                // rankings gives a 240x480 thumbnail.  Remap it to the 540x540 one.
                remapped_thumb_info.url = remapped_thumb_info.url.replace("/c/240x480", "/c/540x540_70");

                // illustType can be a string in these instead of an int, so convert it.
                remapped_thumb_info.illustType = parseInt(remapped_thumb_info.illustType);

                // Some of these APIs don't provide the user's avatar URL.  We only use it in a blurred-
                // out thumbnail for muted images, so just drop in the "no avatar" image.
                if(remapped_thumb_info.profileImageUrl == null)
                    remapped_thumb_info.profileImageUrl = "https://s.pximg.net/common/images/no_profile_s.png";
            }
            else
                throw "Unrecognized source: " + source;

            // Different APIs return different thumbnail URLs.
            remapped_thumb_info.url = remapped_thumb_info.url.replace(/\/240x240\//, "/540x540_70/");
            
            thumb_info = remapped_thumb_info;

            // Store the data.
            this.add_thumbnail_info(thumb_info);

            var illust_id = thumb_info.id;
            delete this.loading_ids[illust_id];

            // Don't preload muted images.
            if(!this.is_muted(thumb_info))
                urls.push(thumb_info.url);
        }

        // Broadcast that we have new thumbnail data available.
        window.dispatchEvent(new Event("thumbnailsLoaded"));
    };

    // Store thumbnail info.
    add_thumbnail_info(thumb_info)
    {
        var illust_id = thumb_info.id;
        this.thumbnail_data[illust_id] = thumb_info;
    }

    is_muted(thumb_info)
    {
        if(muting.singleton.is_muted_user_id(thumb_info.illust_user_id))
            return true;
        if(muting.singleton.any_tag_muted(thumb_info.tags))
            return true;
        return false;
    }
}

class scroll_handler
{
    constructor(container)
    {
        this.container = container;
    }

    // Bring item into view.  We'll also try to keep the next and previous items visible.
    scroll_into_view(item)
    {
        // Make sure item is a direct child of the container.
        if(item.parentNode != this.container)
        {
            console.error("Node", item, "isn't in scroller", this.container);
            return;
        }

        // Scroll so the items to the left and right of the current thumbnail are visible,
        // so you can tell whether there's another entry to scroll to.  If we can't fit
        // them, center the selection.
        var scroller_left = this.container.getBoundingClientRect().left;
        var left = item.offsetLeft - scroller_left;
        
        if(item.previousElementSibling)
            left = Math.min(left, item.previousElementSibling.offsetLeft - scroller_left);

        var right = item.offsetLeft + item.offsetWidth - scroller_left;
        if(item.nextElementSibling)
            right = Math.max(right, item.nextElementSibling.offsetLeft + item.nextElementSibling.offsetWidth - scroller_left);

        var new_left = this.container.scrollLeft;
        if(new_left > left)
            new_left = left;
        if(new_left + this.container.offsetWidth < right)
            new_left = right - this.container.offsetWidth;
        this.container.scrollLeft = new_left;

        // If we didn't fit the previous and next entries, there isn't enough space.  This
        // might be a wide thumbnail or the window might be very narrow.  Just center the
        // selection.  Note that we need to compare against the value we assigned and not
        // read scrollLeft back, since the API is broken and reads back the smoothed value
        // rather than the target we set.
        if(new_left > left ||
           new_left + this.container.offsetWidth < right)
        {
            this.center_item(item);
        }
    }

    // Scroll the given item to the center.
    center_item(item)
    {
        var scroller_left = this.container.getBoundingClientRect().left;
        var left = item.offsetLeft - scroller_left;
        left += item.offsetWidth/2;
        left -= this.container.offsetWidth / 2;
        this.container.scrollLeft = left;
    }

    /* Snap to the target position, cancelling any smooth scrolling. */
    snap()
    {
        this.container.style.scrollBehavior = "auto";
        if(this.container.firstElementChild)
            this.container.firstElementChild.getBoundingClientRect();
        this.container.getBoundingClientRect();
        this.container.style.scrollBehavior = "";
    }
};

class manga_thumbnail_widget
{
    constructor(container)
    {
        this.onclick = this.onclick.bind(this);
        this.onmouseenter = this.onmouseenter.bind(this);
        this.onmouseleave = this.onmouseleave.bind(this);
        this.check_image_loads = this.check_image_loads.bind(this);
        this.window_onresize = this.window_onresize.bind(this);
        
        window.addEventListener("resize", this.window_onresize);

        this.container = container;
        this.container.addEventListener("click", this.onclick);
        this.container.addEventListener("mouseenter", this.onmouseenter);
        this.container.addEventListener("mouseleave", this.onmouseleave);

        this.cursor = document.createElement("div");
        this.cursor.classList.add("thumb-list-cursor");

        this.scroll_box = this.container.querySelector(".manga-thumbnails");
        this.scroller = new scroll_handler(this.scroll_box);

        this.visible = false;
        this.set_illust_info(null);
    }

    // Both Firefox and Chrome have some nasty layout bugs when resizing the window,
    // causing the flexbox and the images inside it to be incorrect.  Work around it
    // by forcing a refresh.
    window_onresize(e)
    {
        this.refresh();
    }

    onmouseenter(e)
    {
        this.hovering = true;
        this.refresh_visible();
    }

    onmouseleave(e)
    {
        this.stop_hovering();
    }

    stop_hovering()
    {
        this.hovering = false;
        this.refresh_visible();
    }

    refresh_visible()
    {
        this.visible = this.hovering;
    }

    get visible()
    {
        return this.container.classList.contains("visible");
    }

    set visible(visible)
    {
        if(visible == this.visible)
            return;

        helpers.set_class(this.container, "visible", visible);

        if(!visible)
            this.stop_hovering();
    }

    onclick(e)
    {
        var arrow = e.target.closest(".manga-thumbnail-arrow");
        if(arrow != null)
        {
            e.preventDefault();
            e.stopPropagation();

            var left = arrow.dataset.direction == "left";
            console.log("scroll", left);

            var new_page = this.current_page + (left? -1:+1);
            if(new_page < 0 || new_page >= this.entries.length)
                return;

            main_controller.singleton.show_illust(this.illust_info.illustId, {
                manga_page: new_page,
            });
            
            /*
            var entry = this.entries[new_page];
            if(entry == null)
                return;

            this.scroller.scroll_into_view(entry);
            
            */
            return;
        }

        var thumb = e.target.closest(".manga-thumbnail-box");
        if(thumb != null)
        {
            e.preventDefault();
            e.stopPropagation();

            var new_page = parseInt(thumb.dataset.page);
            main_controller.singleton.show_illust(this.illust_info.illustId, {
                manga_page: new_page,
            });
            return;
        }
    }

    set_illust_info(illust_info)
    {
        if(illust_info == this.illust_info)
            return;

        // Only display if we have at least two pages.
        if(illust_info != null && illust_info.pageCount < 2)
            illust_info = null;

        // If we're not on a manga page, hide ourselves entirely, including the hover box.
        this.container.hidden = illust_info == null;

        this.illust_info = illust_info;

        if(illust_info == null)
            this.stop_hovering();

        // Refresh the thumb images.
        this.refresh();

        // Start or stop check_image_loads if needed.
        if(this.illust_info == null && this.check_image_loads_timer != null)
        {
            clearTimeout(this.check_image_loads_timer);
            this.check_image_loads_timer = null;
        }
        this.check_image_loads();
    }

    snap_transition()
    {
        this.scroller.snap();
    }

    // This is called when the manga page is changed externally.
    current_page_changed(page)
    {
        // Ignore page changes if we're not displaying anything.
        if(this.illust_info == null)
            return
        
        this.current_page = page;
        if(this.current_page == null)
            return;

        // Find the entry for the page.
        var entry = this.entries[this.current_page];
        if(entry == null)
        {
            console.error("Scrolled to unknown page", this.current_page);
            return;
        }

        this.scroller.scroll_into_view(entry);

        if(this.selected_entry)
            helpers.set_class(this.selected_entry, "selected", false);

        this.selected_entry = entry;

        if(this.selected_entry)
        {
            helpers.set_class(this.selected_entry, "selected", true);

            this.update_cursor_position();
        }
    }

    update_cursor_position()
    {
        // Wait for images to know their size before positioning the cursor.
        if(this.selected_entry == null || this.waiting_for_images || this.cursor.parentNode == null)
            return;

        // Position the cursor to the position of the selection.
        this.cursor.style.width = this.selected_entry.offsetWidth + "px";

        var scroller_left = this.scroll_box.getBoundingClientRect().left;
        var base_left = this.cursor.parentNode.getBoundingClientRect().left;
        var position_left = this.selected_entry.getBoundingClientRect().left;
        var left = position_left - base_left;
        this.cursor.style.left = left + "px";
    }

    // We can't update the UI properly until we know the size the thumbs will be,
    // and the site doesn't tell us the size of manga pages (only the first page).
    // Work around this by hiding until we have naturalWidth for all images, which
    // will allow layout to complete.  There's no event for this for some reason,
    // so the only way to detect it is with a timer.
    //
    // This often isn't needed because of image preloading.
    check_image_loads()
    {
        if(this.illust_info == null)
            return;

        this.check_image_loads_timer = null;
        var all_images_loaded = true;
        for(var img of this.container.querySelectorAll("img.manga-thumb"))
        {
            if(img.naturalWidth == 0)
                all_images_loaded = false;
        }

        // If all images haven't loaded yet, check again.
        if(!all_images_loaded)
        {
            this.waiting_for_images = true;
            this.check_image_loads_timer = setTimeout(this.check_image_loads, 10);
            return;
        }
        this.waiting_for_images = false;

        // Now that we know image sizes and layout can update properly, we can update the cursor's position.
        this.update_cursor_position();
    }

    refresh()
    {
        if(this.cursor.parentNode)
            this.cursor.parentNode.removeChild(this.cursor);

        var ul = this.container.querySelector(".manga-thumbnails");
        helpers.remove_elements(ul);
        this.entries = [];

        if(this.illust_info == null)
            return;

        // Add left and right padding elements to center the list if needed.
        var left_padding = document.createElement("div");
        left_padding.style.flex = "1";
        ul.appendChild(left_padding);

        for(var page = 0; page < this.illust_info.pageCount; ++page)
        {
            var page_info = this.illust_info.mangaPages[page];
            var url = page_info.urls.small;

            var img = document.createElement("img");
            var entry = helpers.create_from_template(".template-manga-thumbnail");
            entry.dataset.page = page;
            entry.querySelector("img.manga-thumb").src = url;
            ul.appendChild(entry);
            this.entries.push(entry);
        }
        
        var right_padding = document.createElement("div");
        right_padding.style.flex = "1";
        ul.appendChild(right_padding);

        // Place the cursor inside the first entry, so it follows it around as we scroll.
        this.entries[0].appendChild(this.cursor);

        this.update_cursor_position();
    }
};

// This handles:
//
// - Keeping track of whether we're active or not.  If we're inactive, we turn off
// and let the page run normally.
// - Storing state in the address bar.
//
// We're active by default on illustration pages, and inactive by default on others.
//
// If we're active, we'll store our state in the hash as "#ppixiv/...".  The start of
// the hash will always be "#ppixiv", so we can tell it's our data.  If we're on a page
// where we're inactive by default, this also remembers that we've been activated.
//
// If we're inactive on a page where we're active by default, we'll always put something
// other than "#ppixiv" in the address bar.  It doesn't matter what it is.  This remembers
// that we were deactivated, and remains deactivated even if the user clicks an anchor
// in the page that changes the hash.
//
// If we become active or inactive after the page loads, we refresh the page.
//
// We have two sets of query parameters: args stored in the URL query, and args stored in
// the hash.  For example, in:
//
// https://www.pixiv.net/bookmark.php?p=2#ppixiv?illust_id=1234
//
// our query args are p=2, and our hash args are illust_id=1234.  We use query args to
// store state that exists in the underlying page, and hash args to store state that
// doesn't, so the URL remains valid for the actual Pixiv page if our UI is turned off.

class page_manager
{
    constructor()
    {
        this.window_popstate = this.window_popstate.bind(this);
        window.addEventListener("popstate", this.window_popstate, true);

        this.data_sources_by_canonical_url = {};
        this.active = this._active_internal();
    };

    // Return the singleton, creating it if needed.
    static singleton()
    {
        if(page_manager._singleton == null)
            page_manager._singleton = new page_manager();
        return page_manager._singleton;
    };

    // Return the data source for a URL, or null if the page isn't supported.
    get_data_source_for_url(url)
    {
        // url is usually document.location, which for some reason doesn't have .searchParams.
        var url = new unsafeWindow.URL(url);

        // Note that member_illust.php is both illustration pages (mode=medium&illust_id) and author pages (id=).
        if(url.pathname == "/member_illust.php" && url.searchParams.get("mode") == "medium")
            return data_source_current_illust;
        else if(url.pathname == "/member.php" && url.searchParams.get("id") != null)
            return data_source_artist;
        else if(url.pathname == "/member_illust.php" && url.searchParams.get("id") != null)
            return data_source_artist;
        else if(url.pathname == "/bookmark.php" && url.searchParams.get("type") == null)
        {
            // Handle a special case: we're called by early_controller just to find out if
            // the current page is supported or not.  This happens before window.global_data
            // exists, so we can't check if we're viewing our own bookmarks or someone else's.
            // In this case we don't need to, since the caller just wants to see if we return
            // a data source or not.
            if(window.global_data == null)
                return data_source_bookmarks;

            // If show-all=0 isn't in the hash, and we're not viewing someone else's bookmarks,
            // we're viewing all bookmarks, so use data_source_bookmarks_merged.  Otherwise,
            // use data_source_bookmarks.
            var hash_args = helpers.get_hash_args(url);
            var query_args = url.searchParams;
            var user_id = query_args.get("id");
            if(user_id == null)
                user_id = window.global_data.user_id;
            var viewing_own_bookmarks = user_id == window.global_data.user_id;
            
            var both_public_and_private = viewing_own_bookmarks && hash_args.get("show-all") != "0";
            return both_public_and_private? data_source_bookmarks_merged:data_source_bookmarks;
        }
        else if(url.pathname == "/new_illust.php" || url.pathname == "/new_illust_r18.php")
            return data_source_new_illust;
        else if(url.pathname == "/bookmark_new_illust.php")
            return data_source_bookmarks_new_illust;
        else if(url.pathname == "/search.php")
            return data_source_search;
        else if(url.pathname == "/discovery")
            return data_source_discovery;
        else if(url.pathname == "/bookmark_detail.php")
            return data_source_related_illusts;
        else if(url.pathname == "/ranking.php")
            return data_source_rankings;
        else
            return null;
    };

    // Create the data source for a given URL.
    //
    // If we've already created a data source for this URL, the same one will be
    // returned.
    //
    // If force is true, we'll always create a new data source, replacing any
    // previously created one.
    async create_data_source_for_url(url, doc, force)
    {
        var data_source_class = this.get_data_source_for_url(url);
        if(data_source_class == null)
        {
            console.error("Unexpected path:", url.pathname);
            return;
        }

        // Canonicalize the URL to see if we already have a data source for this URL.
        var canonical_url = await data_source_class.get_canonical_url(url);

        // console.log("url", url.toString(), "becomes", canonical_url);
        if(!force && canonical_url in this.data_sources_by_canonical_url)
        {
            // console.log("Reusing data source for", url.toString());
            return this.data_sources_by_canonical_url[canonical_url];
        }
        
        // console.log("Creating new data source for", url.toString());
        var source = new data_source_class(url.href, doc);
        this.data_sources_by_canonical_url[canonical_url] = source;
        return source;
    }

    // Return true if it's possible for us to be active on this page.
    available()
    {
        // We support the page if it has a data source.
        return this.get_data_source_for_url(document.location) != null;
    };

    window_popstate(e)
    {
        var currently_active = this._active_internal();
        if(this.active == currently_active)
            return;

        // Stop propagation, so other listeners don't see this.  For example, this prevents
        // the thumbnail viewer from turning on or off as a result of us changing the hash
        // to "#no-ppixiv".
        e.stopImmediatePropagation();

        if(this.active == currently_active)
            return;
        
        this.store_ppixiv_disabled(!currently_active);
        
        console.log("Active state changed");

        // The URL has changed and caused us to want to activate or deactivate.  Reload the
        // page.
        //
        // We'd prefer to reload with cache, like a regular navigation, but Firefox seems
        // to reload without cache no matter what we do, even though document.location.reload
        // is only supposed to bypass cache on reload(true).  There doesn't seem to be any
        // reliable workaround.
        document.location.reload();
    }

    store_ppixiv_disabled(disabled)
    {
        // Remember that we're enabled or disabled in this tab.
        if(disabled)
            window.sessionStorage.ppixiv_disabled = 1;
        else
            delete window.sessionStorage.ppixiv_disabled;
    }

    // Return true if we're active by default on the current page.
    active_by_default()
    {
        // If the disabled-by-default setting is enabled, disable by default until manually
        // turned on.
        if(settings.get("disabled-by-default"))
            return false;

        // If this is set, the user clicked the "return to Pixiv" button.  Stay disabled
        // in this tab until we're reactivated.
        if(window.sessionStorage.ppixiv_disabled)
            return false;

        return this.available();
    };

    // Return true if we're currently active.
    //
    // This is cached at the start of the page and doesn't change unless the page is reloaded.
    _active_internal()
    {
        // If the hash is empty, use the default.
        if(document.location.hash == "")
            return this.active_by_default();

        // If we have a hash and it's not #ppixiv, then we're explicitly disabled.  If we
        // # do have a #ppixiv hash, we're explicitly enabled.
        //
        // If we're explicitly enabled but aren't actually available, we're disabled.  This
        // makes sure we don't break pages if we accidentally load them with a #ppixiv hash,
        // or if we remove support for a page that people have in their browser session.
        return helpers.parse_hash(document.location) != null && this.available();
    };

    // Given a list of tags, return the URL to use to search for them.  This differs
    // depending on the current page.
    get_url_for_tag_search(tags)
    {
        var url = new URL(document.location);

        if(url.pathname == "/search.php")
        {
            // If we're on search already, preserve other settings so we just change the
            // search tag.  Just remove the page number.
            url.searchParams.delete("p");
        } else {
            // If we're not, change to search and remove the rest of the URL.
            url = new URL("/search.php#ppixiv", document.location);
        }
        
        url.searchParams.set("word", tags);
        return url;
    }
}

// Fix Pixiv's annoying link interstitials.
//
// External links on Pixiv go through a pointless extra page.  This seems like
// they're trying to mask the page the user is coming from, but that's what
// rel=noreferrer is for.  Search for these links and fix them.
//
// This also removes target=_blank, which is just obnoxious.  If I want a new
// tab I'll middle click.
(function() {
    // Ignore iframes.
    if(window.top != window.self)
        return;
    
    var observer = new window.MutationObserver(function(mutations) {
        for(var mutation of mutations) {
            if(mutation.type != 'childList')
                return;

            for(var node of mutation.addedNodes)
            {
                if(node.querySelectorAll == null)
                    continue;

                helpers.fix_pixiv_links(node);
            }
        }
    });

    window.addEventListener("DOMContentLoaded", function() {
        helpers.fix_pixiv_links(document.body);

        observer.observe(window.document.body, {
            // We could listen to attribute changes so we'll fix links that have their
            // target changed after they're added to the page, but unless there are places
            // where that's needed, let's just listen to node additions so we don't trigger
            // too often.
            attributes: false,        
            childList: true,
            subtree: true
        });
    }, true);
})();

// Handle preloading images.
//
// If we have a reasonably fast connection and the site is keeping up, we can just preload
// blindly and let the browser figure out priorities.  However, if we preload too aggressively
// for the connection and loads start to back up, it can cause image loading to become delayed.
// For example, if we preload 100 manga page images, and then back out of the page and want to
// view something else, the browser won't load anything else until those images that we no
// longer need finish loading.
//
// image_preloader is told the illust_id that we're currently showing, and the ID that we want
// to speculatively load.  We'll run loads in parallel, giving the current image's resources
// priority and cancelling loads when they're no longer needed.
//
// This doesn't handle thumbnail preloading.  Those are small and don't really need to be
// cancelled, and since we don't fill the browser's load queue here, we shouldn't prevent
// thumbnails from being able to load.

// A base class for fetching a single resource:
class _preloader
{
    // Cancel the fetch.
    cancel()
    {
        if(this.abort_controller == null)
            return;

        this.abort_controller.abort();
        this.abort_controller = null;
    }
}

// Load a single image with <img>:
class _img_preloader extends _preloader
{
    constructor(url)
    {
        super();
        this.url = url;
    }

    // Start the fetch.  This should only be called once.
    async start()
    {
        this.abort_controller = new AbortController();
        await helpers.decode_image(this.url, this.abort_controller.signal);
    }
}

// Load a resource with XHR.  We rely on helpers.fetch_resource to make concurrent
// loads with zip_image_player work cleanly.
class _xhr_preloader extends _preloader
{
    constructor(url)
    {
        super();
        this.url = url;
    }

    async start()
    {
        this.abort_controller = new AbortController();
        await helpers.fetch_resource(this.url, {
            signal: this.abort_controller.signal,
        });
    }
}

// The image preloader singleton.
class image_preloader
{
    // Return the singleton, creating it if needed.
    static get singleton()
    {
        if(image_preloader._singleton == null)
            image_preloader._singleton = new image_preloader();
        return image_preloader._singleton;
    };

    constructor()
    {
        // The _preloader objects that we're currently running.
        this.preloads = [];

        // A queue of URLs that we've finished preloading recently.  We use this to tell if
        // we don't need to run a preload.
        this.recently_preloaded_urls = [];
    }

    // Set the illust_id the user is currently viewing.  If illust_id is null, the user isn't
    // viewing an image (eg. currently viewing thumbnails).
    async set_current_image(illust_id)
    {
        if(this.current_illust_id == illust_id)
            return;

        this.current_illust_id = illust_id;
        this.current_illust_info = null;
        if(this.current_illust_id == null)
            return;

        // Get the image data.  This will often already be available.
        var illust_info = await image_data.singleton().get_image_info(this.current_illust_id);
        if(this.current_illust_id != illust_id || this.current_illust_info != null)
            return;

        // Store the illust_info for current_illust_id.
        this.current_illust_info = illust_info;

        // Preload thumbnails.
        this.preload_thumbs(illust_info);

        this.check_fetch_queue();
    }

    // Set the illust_id we want to speculatively load, which is the next or previous image in
    // the current search.  If illust_id is null, we don't want to speculatively load anything.
    async set_speculative_image(illust_id)
    {
        if(this.speculative_illust_id == illust_id)
            return;
        
        this.speculative_illust_id = illust_id;
        this.speculative_illust_info = null;
        if(this.speculative_illust_id == null)
            return;

        // Get the image data.  This will often already be available.
        var illust_info = await image_data.singleton().get_image_info(this.speculative_illust_id);
        if(this.speculative_illust_id != illust_id || this.speculative_illust_info != null)
            return;

        // Store the illust_info for current_illust_id.
        this.speculative_illust_info = illust_info;

        // Preload thumbnails.
        this.preload_thumbs(illust_info);

        this.check_fetch_queue();
    }

    // See if we need to start or stop preloads.  We do this when we have new illustration info,
    // and when a fetch finishes.
    check_fetch_queue()
    {
        // console.log("check queue:", this.current_illust_info != null, this.speculative_illust_info != null);

        // Make a list of fetches that we want to be running, in priority order.
        var wanted_preloads = [];
        if(this.current_illust_info != null)
            wanted_preloads = wanted_preloads.concat(this.create_preloaders_for_illust(this.current_illust_info));
        if(this.speculative_illust_info != null)
            wanted_preloads = wanted_preloads.concat(this.create_preloaders_for_illust(this.speculative_illust_info));

        // Remove all preloads from wanted_preloads that we've already finished recently.
        var filtered_preloads = [];
        for(var preload of wanted_preloads)
        {
            if(this.recently_preloaded_urls.indexOf(preload.url) == -1)
                filtered_preloads.push(preload);
        }

        // If we don't want any preloads, stop.  If we have any running preloads, let them continue.
        if(filtered_preloads.length == 0)
        {
            // console.log("Nothing to do");
            return;
        }

        // Discard preloads beyond the number we want to be running.  If we're loading more than this,
        // we'll start more as these finish.
        var concurrent_preloads = 5;
        filtered_preloads.splice(concurrent_preloads);
        // console.log("Preloads:", filtered_preloads.length);

        // Start preloads that aren't running.  Add all preloads that are now running to
        // updated_preload_list.
        var unwanted_preloads;
        var updated_preload_list = [];
        for(let preload of filtered_preloads)
        {
            // If we already have a preloader running for this URL, just let it continue.
            var active_preload = this._find_active_preload_by_url(preload.url);
            if(active_preload != null)
            {
                updated_preload_list.push(active_preload);
                continue;
            }

            // Start this preload.
            // console.log("Start preload:", preload.url);
            preload.start().finally(() => {
                // Add the URL to recently_preloaded_urls, so we don't try to preload this
                // again for a while.  We do this even on error, so we don't try to load
                // failing images repeatedly.
                this.recently_preloaded_urls.push(preload.url);
                this.recently_preloaded_urls.splice(1000);

                // When the preload finishes (successful or not), remove it from the list.
                var idx = this.preloads.indexOf(preload);
                if(idx == -1)
                {
                    console.error("Preload finished, but we weren't running it:", preload.url);
                    return;
                }
                this.preloads.splice(idx, 1);

                // See if we need to start another preload.
                this.check_fetch_queue();
            });

            updated_preload_list.push(preload);
            break;
        }

        // Cancel preloads in this.preloads that aren't in updated_preload_list.  These are
        // preloads that we either don't want anymore, or which have been pushed further down
        // the priority queue and overridden.
        for(var preload of this.preloads)
        {
            if(updated_preload_list.indexOf(preload) != -1)
                continue;

            console.log("Cancelling preload:", preload.url);
            preload.cancel();

            // Preloads stay in the list until the cancellation completes.
            updated_preload_list.push(preload);
        }

        this.preloads = updated_preload_list;
    }

    // Return the preloader if we're currently preloading url.
    _find_active_preload_by_url(url)
    {
        for(var preload of this.preloads)
            if(preload.url == url)
                return preload;
        return null;
    }

    // Return an array of preloaders to load resources for the given illustration.
    create_preloaders_for_illust(illust_data)
    {
        // Don't precache muted images.
        if(muting.singleton.any_tag_muted(illust_data.tags.tags))
            return [];
        if(muting.singleton.is_muted_user_id(illust_data.userId))
            return [];

        // If this is a video, preload the ZIP.
        if(illust_data.illustType == 2)
        {
            var results = [];
            results.push(new _xhr_preloader(illust_data.ugoiraMetadata.originalSrc));

            // Preload the original image too, which viewer_ugoira displays if the ZIP isn't
            // ready yet.
            results.push(new _img_preloader(illust_data.urls.original));

            return results;
        }

        // Otherwise, preload the images.  Preload thumbs first, since they'll load
        // much faster.
        var results = [];
        for(var page of illust_data.mangaPages)
            results.push(new _img_preloader(page.urls.original));

        return results;
    }

    preload_thumbs(illust_info)
    {
        // We're only interested in preloading thumbs for manga pages.
        if(illust_info.pageCount < 2)
            return;

        // Preload thumbs directly rather than queueing, since they load quickly and
        // this reduces flicker in the manga thumbnail bar.
        var thumbs = [];
        for(var page of illust_info.mangaPages)
            thumbs.push(page.urls.small);

        helpers.preload_images(thumbs);
    }
};

var debug_show_ui = false;

// This runs first and sets everything else up.
class early_controller
{
    constructor()
    {
        // Early initialization.  This happens before anything on the page is loaded, since
        // this script runs at document-start.
        //
        // If this is an iframe, don't do anything.  This may be a helper iframe loaded by
        // load_data_in_iframe, in which case the main page will do the work.
        if(window.top != window.self)
            return;

        console.log("ppixiv setup");

        // catch_bind isn't available if we're not active, so we use bind here.
        this.dom_content_loaded = this.dom_content_loaded.bind(this);
        if(document.readyState == "loading")
            window.addEventListener("DOMContentLoaded", this.dom_content_loaded, true);
        else
            setTimeout(this.dom_content_loaded, 0);

        if(!page_manager.singleton().active)
            return;

        // Do early setup.  This happens early in page loading, without waiting for DOMContentLoaded.
        // Unfortunately TamperMonkey doesn't correctly call us at the very start of the page in
        // Chrome, so this doesn't happen until some site scripts have had a chance to run.

        // Pixiv scripts run on DOMContentLoaded and load, whichever it sees first.  Add capturing
        // listeners on both of these and block propagation, so those won't be run.  This keeps most
        // of the site scripts from running underneath us.  Make sure this is registered after our
        // own DOMContentLoaded listener above, or it'll block ours too.
        //
        // This doesn't always work in Chrome.  TamperMonkey often runs user scripts very late,
        // even after DOMContentLoaded has already been sent, even in run-at: document-start.
        var stop_event = function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
        };
        if(document.readyState == "loading")
            window.addEventListener("DOMContentLoaded", stop_event, true);
        window.addEventListener("load", stop_event, true);

        // Newer Pixiv pages run a bunch of stuff from deferred scripts, which install a bunch of
        // nastiness (like searching for installed polyfills--which we install--and adding wrappers
        // around them).  Break this by defining a webpackJsonp property that can't be set.  It
        // won't stop the page from running everything, but it keeps it from getting far enough
        // for the weirder scripts to run.
        //
        // Also, some Pixiv pages set an onerror to report errors.  Disable it if it's there,
        // so it doesn't send errors caused by this script.  Remove _send and _time, which
        // also send logs.  It might have already been set (TamperMonkey in Chrome doesn't
        // implement run-at: document-start correctly), so clear it if it's there.
        for(var key of ["onerror", "_send", "_time", "webpackJsonp"])
        {
            unsafeWindow[key] = null;
            Object.defineProperty(unsafeWindow, key, { define: exportFunction(function(value) { }, unsafeWindow) });
        }
        
        // Install polyfills.  Make sure we only do this if we're active, so we don't
        // inject polyfills into Pixiv when we're not active.
        install_polyfills();

        // Try to prevent site scripts from running, since we don't need any of it.
        if(navigator.userAgent.indexOf("Firefox") != -1)
            helpers.block_all_scripts();

        this.temporarily_hide_document();
        helpers.block_network_requests();
    }

    dom_content_loaded(e)
    {
        try {
            this.setup();
        } catch(e) {
            // GM error logs don't make it to the console for some reason.
            console.log(e);
        }
    }

    temporarily_hide_document()
    {
        if(document.documentElement != null)
        {
            document.documentElement.hidden = true;
            return;
        }

        // At this point, none of the document has loaded, and document.body and
        // document.documentElement don't exist yet, so we can't hide it.  However,
        // we want to hide the document as soon as it's added, so we don't flash
        // the original page before we have a chance to replace it.  Use a mutationObserver
        // to detect the document being created.
        var observer = new MutationObserver(function(mutation_list) {
            if(document.documentElement == null)
                return;
            observer.disconnect();

            document.documentElement.hidden = true;
        });

        observer.observe(document, { attributes: false, childList: true, subtree: true });
    };
 

    // This is called on DOMContentLoaded (whether we're active or not).
    setup()
    {
        // If we're not active, stop without doing anything and leave the page alone.
        if(!page_manager.singleton().active)
        {
            if(page_manager.singleton().available())
            {
                // If we're disabled and can be enabled on this page, add our button.
                this.setup_disabled_ui();

                // Remember that we're disabled in this tab.  This way, clicking the "return
                // to Pixiv" button will remember that we're disabled.  We do this on page load
                // rather than when the button is clicked so this works when middle-clicking
                // the button to open a regular Pixiv page in a tab.
                page_manager.singleton().store_ppixiv_disabled(true);
            }
            
            return;
        }

        // Create the main controller.
        main_controller.create_singleton();

    }

    // When we're disabled, but available on the current page, add the button to enable us.
    setup_disabled_ui()
    {
        // Create the activation button.
        var disabled_ui = helpers.create_node(resources['disabled.html']);
        helpers.add_style('.ppixiv-disabled-ui > a { background-image: url("' + binary_data['activate-icon.png'] + '"); };');
        document.body.appendChild(disabled_ui);
    };
}

// This handles high-level navigation and controlling the different views.
class main_controller
{
    // We explicitly create this singleton rather than doing it on the first call to
    // singleton(), so it's explicit when it's created.
    static create_singleton()
    {
        if(main_controller._singleton != null)
            throw "main_controller is already created";

        new main_controller();
    }

    static get singleton()
    {
        if(main_controller._singleton == null)
            throw "main_controller isn't created";

        return main_controller._singleton;
    }

    constructor()
    {
        main_controller._singleton = this;

        this.onkeydown = this.onkeydown.catch_bind(this);
        this.redirect_event_to_view = this.redirect_event_to_view.catch_bind(this);
        this.window_onclick_capture = this.window_onclick_capture.catch_bind(this);
        this.window_onpopstate = this.window_onpopstate.catch_bind(this);

        // Create the page manager.
        page_manager.singleton();

        this.setup();
    };

    setup()
    {
        // Try to init using globalInitData if possible.
        var data = helpers.get_global_init_data(document);
        if(data != null)
        {
            this.init_global_data(data.token, data.userData.id, data.premium && data.premium.popularSearch, data.mute, data.userData.xRestrict);

            // If data is available, this is a newer page with globalInitData.
            // This can have one or more user and/or illust data, which we'll preload
            // so we don't need to fetch it later.
            //
            // Preload users before illusts.  Otherwise, adding the illust will cause image_data
            // to fetch user info to fill it in.
            for(var preload_user_id in data.preload.user)
                image_data.singleton().add_user_data(data.preload.user[preload_user_id]);
            for(var preload_illust_id in data.preload.illust)
                image_data.singleton().add_illust_data(data.preload.illust[preload_illust_id]);
        }
        else
        {
            // If that's not available, this should be an older page with the "pixiv" object.
            var pixiv = helpers.get_pixiv_data(document);
            if(pixiv == null)
            {
                // If we can't find either, either we're on a page we don't understand or we're
                // not logged in.  Stop and let the page run normally.
                console.log("Couldn't find context data.  Are we logged in?");
                document.documentElement.hidden = false;
                return;
            }
            this.init_global_data(pixiv.context.token, pixiv.user.id, pixiv.user.premium, pixiv.user.mutes, pixiv.user.explicit);
        }

        console.log("Starting");

        window.addEventListener("click", this.window_onclick_capture);
        window.addEventListener("popstate", this.window_onpopstate);

        window.addEventListener("keyup", this.redirect_event_to_view, true);
        window.addEventListener("keydown", this.redirect_event_to_view, true);
        window.addEventListener("keypress", this.redirect_event_to_view, true);

        window.addEventListener("keydown", this.onkeydown);

        this.current_view_name = null;
        this.current_history_index = helpers.current_history_state_index();

        // Don't restore the scroll position.
        //
        // If we browser back to a search page and we were scrolled ten pages down, scroll
        // restoration will try to scroll down to it incrementally, causing us to load all
        // data in the search from the top all the way down to where we were.  This can cause
        // us to spam the server with dozens of requests.  This happens on F5 refresh, which
        // isn't useful (if you're refreshing a search page, you want to see new results anyway),
        // and recommendations pages are different every time anyway.
        //
        // This won't affect browser back from an image to the enclosing search.
        history.scrollRestoration = "manual";    
       
        // Remove everything from the page and move it into a dummy document.
        var html = document.createElement("document");
        helpers.move_children(document.head, html);
        helpers.move_children(document.body, html);

        // Copy the location to the document copy, so the data source can tell where
        // it came from.
        html.location = document.location;

        // Now that we've cleared the document, we can unhide it.
        document.documentElement.hidden = false;

        // Add binary resources as CSS styles.
        helpers.add_style('body .noise-background { background-image: url("' + binary_data['noise.png'] + '"); };');
        helpers.add_style('body.light .noise-background { background-image: url("' + binary_data['noise-light.png'] + '"); };');
        helpers.add_style('.ugoira-icon { background-image: url("' + binary_data['play-button.svg'] + '"); };');
        helpers.add_style('.page-icon { background-image: url("' + binary_data['page-icon.png'] + '"); };');
        
        // Add the main CSS style.
        helpers.add_style(resources['main.css']);
       
        // Create the page from our HTML resource.
        document.body.insertAdjacentHTML("beforeend", resources['main.html']);

        // Create the shared title and page icon.
        document.head.appendChild(document.createElement("title"));
        var document_icon = document.head.appendChild(document.createElement("link"));
        document_icon.setAttribute("rel", "icon");

        helpers.add_clicks_to_search_history(document.body);
         
        this.container = document.body;

        // Create the popup menu handler.
        this.context_menu = new main_context_menu(document.body);
        
        // Create the main progress bar.
        this.progress_bar = new progress_bar(this.container.querySelector(".loading-progress-bar"));
        
        // Create the thumbnail view handler.
        this.thumbnail_view = new view_search(this.container.querySelector(".view-search-container"));

        // Create the manga page viewer.
        this.manga_view = new view_manga(this.container.querySelector(".view-manga-container"));
        
        // Create the main UI.
        this.ui = new view_illust(this.container.querySelector(".view-illust-container"));

        this.views = {
            search: this.thumbnail_view,
            illust: this.ui,
            manga: this.manga_view,
        };

        // Create the data source for this page.
        this.set_current_data_source(html, "initialization");
    };

    window_onpopstate(e)
    {
        // Set the current data source and state.
        this.set_current_data_source(null, e.navigationCause || "history");
    }

    async refresh_current_data_source()
    {
        if(this.data_source == null)
            return;

        // Create a new data source for the same URL, replacing the previous one.
        // This returns the data source, but just call set_current_data_source so
        // we load the new one.
        console.log("Refreshing data source for", document.location.toString());
        await page_manager.singleton().create_data_source_for_url(document.location, null, true);
        await this.set_current_data_source(null, "refresh");
    }

    // Create a data source for the current URL and activate it.
    //
    // This is called on startup, and in onpopstate where we might be changing data sources.
    //
    // If this is on startup, html is the HTML elements on the page to pass to the data source
    // to preload the first page.  On navigation, html is null.  If we navigate to a page that
    // can load the first page from the HTML page, we won't load the HTML and we'll just allow
    // the first page to load like any other page.
    async set_current_data_source(html, cause)
    {
        // Get the current data source.  If we've already created it, this will just return
        // the same object and not create a new one.
        var data_source = await page_manager.singleton().create_data_source_for_url(document.location, html);

        // If the data source is changing, set it.
        if(this.data_source != data_source)
        {
            // Shut down the old data source.
            if(this.data_source != null)
                this.data_source.shutdown();

            // If we were showing a message for the old data source, it might be persistent,
            // so clear it.
            message_widget.singleton.hide();
            
            this.data_source = data_source;
            this.show_data_source_specific_elements();
            this.ui.set_data_source(data_source);
            this.thumbnail_view.set_data_source(data_source);
            this.context_menu.set_data_source(data_source);
            
            if(this.data_source != null)
                this.data_source.startup();
        }

        if(data_source == null)
            return;

        // Figure out which view to display.
        var new_view_name;
        var args = helpers.get_args(document.location);
        if(!args.hash.has("view"))
            new_view_name = this.data_source.default_view;
        else
            new_view_name = args.hash.get("view");

        var args = helpers.get_args(document.location);
        var illust_id = data_source.get_current_illust_id();
        var manga_page = args.hash.has("page")? parseInt(args.hash.get("page"))-1:null;

        // If we're on search, we don't care what image is current.  Clear illust_id so we
        // tell context_menu that we're not viewing anything, so it disables bookmarking.
        if(new_view_name == "search")
            illust_id = null;

        // if illust_id is set, need the image data to know whether to show manga pages
        // or the illust
        console.log("Loading data source.  View:", new_view_name, "Cause:", cause, "URL:", document.location.href);
        // Get the manga page in this illust to show, if any.
        console.log("  Show image", illust_id, "page", manga_page);

        // Mark the current view.  Other code can watch for this to tell which view is
        // active.
        document.body.dataset.currentView = new_view_name;

        // Set the image before activating the view.  If we do this after activating it,
        // it'll start loading any previous image it was pointed at.  Don't do this in
        // search mode, or we'll start loading the default image.
        if(new_view_name == "illust")
            this.ui.show_image(illust_id, manga_page);
        else if(new_view_name == "manga")
            this.manga_view.shown_illust_id = illust_id;
 
        var new_view = this.views[new_view_name];
        var old_view = this.views[this.current_view_name];
        var old_illust_id = old_view? old_view.displayed_illust_id:null;
        var old_illust_page = old_view? old_view.displayed_illust_page:null;

        // main_context_menu uses this to see which view is active.
        document.body.dataset.currentView = new_view_name;

        this.context_menu.illust_id = illust_id;
        
        // If we're changing between views, update the active view.
        var view_changing = new_view != old_view;
        if(view_changing)
        {
            this.current_view_name = new_view_name;

            // Make sure we deactivate the old view before activating the new one.
            if(old_view != null)
                old_view.active = false;
            if(new_view != null)
                new_view.active = true;
       
            // Dismiss any message when toggling between views.
            message_widget.singleton.hide();

            // If we're enabling the thumbnail, pulse the image that was just being viewed (or
            // loading to be viewed), to make it easier to find your place.
            if(new_view_name == "search" && old_illust_id != null)
                this.thumbnail_view.pulse_thumbnail(old_illust_id);
        }
        
        // Are we navigating forwards or back?
        var new_history_index = helpers.current_history_state_index();
        var navigating_forwards = cause == "history" && new_history_index > this.current_history_index;
        this.current_history_index = new_history_index;

        // Handle scrolling for the new state.
        //
        // We could do this better with history.state (storing each state's scroll position would
        // allow it to restore across browser sessions, and if the same data source is multiple
        // places in history).  Unfortunately there's no way to update history.state without
        // calling history.replaceState, which is slow and causes jitter.  history.state being
        // read-only is a design bug in the history API.
        if(cause == "navigation")
        {
            // If this is an initial navigation, eg. from a user clicking a link to a search, always
            // scroll to the top.  If this data source exists previously in history, we don't want to
            // restore the scroll position from back then.
            console.log("Scroll to top for new search");
            new_view.scroll_to_top();
        }
        else if(navigating_forwards)
        {
            // On browser history forwards, try to restore the scroll position.
            console.log("Restore scroll position for forwards navigation");
            new_view.restore_scroll_position();
        }
        else if(view_changing && old_illust_id != null)
        {
            // If we're navigating backwards or toggling, and we're switching from the image UI to thumbnails,
            // try to scroll the thumbnail view to the image that was displayed.  Otherwise, tell
            // the thumbnail view to restore any scroll position saved in the data source.
            console.log("Scroll to", old_illust_id, old_illust_page);
            new_view.scroll_to_illust_id(old_illust_id, old_illust_page);
        }
        else
        {
            new_view.restore_scroll_position();
        }
    }

    show_data_source_specific_elements()
    {
        // Show UI elements with this data source in their data-datasource attribute.
        var data_source_name = this.data_source.name;
        for(var node of this.container.querySelectorAll(".data-source-specific[data-datasource]"))
        {
            var data_sources = node.dataset.datasource.split(" ");
            var show_element = data_sources.indexOf(data_source_name) != -1;
            node.hidden = !show_element;
        }
    }

    // Show an illustration by ID.
    //
    // This actually just sets the history URL.  We'll do the rest of the work in popstate.
    show_illust(illust_id, options)
    {
        if(options == null)
            options = {};

        var manga_page = options.manga_page != null? options.manga_page:null;
        var add_to_history = options.add_to_history || false;
        var view = options.view || "illust";

        // Sanity check:
        if(illust_id == null)
        {
            console.error("Invalid illust_id", illust_id);
            return;
        }

        // Set the wanted illust_id in the URL, and disable the thumb view so we show
        // the image.  Do this in a single URL update, so we don't add multiple history
        // entries.
        var args = helpers.get_args(document.location);

        this._set_active_view_in_url(args.hash, view);
        this.data_source.set_current_illust_id(illust_id, args.query, args.hash);

        // Remove any leftover page from the current illust.  We'll load the default.
        if(manga_page == null)
            args.hash.delete("page");
        else
            args.hash.set("page", manga_page + 1);

        helpers.set_args(args, add_to_history, "navigation");
    }

    // Return the displayed view instance.
    get displayed_view()
    {
        for(var view_name in this.views)
        {
            var view = this.views[view_name];
            if(view.active)
                return view;
        }        

        return null;
    }

    _set_active_view_in_url(hash_args, view)
    {
        hash_args.set("view", view);
    }

    set_displayed_view_by_name(view, add_to_history, cause)
    {
        // Update the URL to mark whether thumbs are displayed.
        var args = helpers.get_args(document.location);
        this._set_active_view_in_url(args.hash, view);
        helpers.set_args(args, add_to_history, cause);
    }

    // Navigate out.
    //
    // This navigates from the illust page to the manga page (for multi-page posts) or search, and
    // from the manga page to search.
    //
    // This is similar to browser back, but allows moving up to the search even for new tabs.  It
    // would be better for this to integrate with browser history (just browser back if browser back
    // is where we're going), but for some reason you can't view history state entries even if they're
    // on the same page, so there's no way to tell where History.back() would take us.
    _get_navigate_out_target()
    {
        var new_page = null;
        var view = this.displayed_view;

        // This gets called by the popup menu when it's created before we have any view.
        if(view == null)
            return [null, null];

        if(view == this.views.manga)
        {
            return ["search", "search"];
        }
        else if(view == this.views.illust)
        {
            var page_count = view.current_illust_data != null? view.current_illust_data.pageCount:1;
            if(page_count > 1)
                return ["manga", "page list"];
            else
                return ["search", "search"];
        }
        else
            return [null, null];
    }
    get navigate_out_label()
    {
        var target = this._get_navigate_out_target();
        return target[1];
    }
    navigate_out()
    {
        var target = this._get_navigate_out_target();
        var new_page = target[0];
        if(new_page != null)
            this.set_displayed_view_by_name(new_page, true /*add_to_history*/, "out");
    }

    // This captures clicks at the window level, allowing us to override them.
    //
    // When the user left clicks on a link that also goes into one of our views,
    // rather than loading a new page, we just set up a new data source, so we
    // don't have to do a full navigation.
    //
    // This only affects left clicks (middle clicks into a new tab still behave
    // normally).
    window_onclick_capture(e)
    {
        // Only intercept left clicks.
        if(e.button != 0)
            return;

        if(!(e.target instanceof Element))
            return;

        // Look up from the target for a link.
        var a = e.target.closest("A");
        if(a == null)
            return;

        // If this isn't a #ppixiv URL, let it run normally.
        var url = new URL(a.href, document.href);
        var is_ppixiv_url = helpers.parse_hash(url) != null;
        if(!is_ppixiv_url)
            return;

        // Stop all handling for this link.
        e.preventDefault();
        e.stopImmediatePropagation();

        // Search links to images always go to the member_illust page, but if they're
        // clicked in-page we want to stay on the same search and just show the image,
        // so handle them directly.
        if(a.dataset.illustId != null)
        {
            var args = helpers.get_args(a.href);
            var page = args.hash.has("page")? parseInt(args.hash.get("page"))-1: null;
            var view = args.hash.has("view")? args.hash.get("view"):"illust";
            this.show_illust(a.dataset.illustId, {
                view: view,
                manga_page: page,
                add_to_history: true
            });
            
            return;
        }

        // Navigate to the URL in-page.
        helpers.set_page_url(url, true /* add to history */, "navigation");
    }

    init_global_data(csrf_token, user_id, premium, mutes, content_mode)
    {
        var muted_tags = [];
        var muted_user_ids = [];
        for(var mute of mutes)
        {
            if(mute.type == 0)
                muted_tags.push(mute.value);
            else if(mute.type == 1)
                muted_user_ids.push(mute.value);
        }
        muting.singleton.set_muted_tags(muted_tags);
        muting.singleton.set_muted_user_ids(muted_user_ids);

        window.global_data = {
            // Store the token for XHR requests.
            csrf_token: csrf_token,
            user_id: user_id,
            include_r18: content_mode >= 1,
            include_r18g: content_mode >= 2,
        };

        // Set the .premium class on body if this is a premium account, to display features
        // that only work with premium.
        helpers.set_class(document.body, "premium", premium);

        // These are used to hide buttons that the user has disabled.
        helpers.set_class(document.body, "hide-r18", !window.global_data.include_r18);
        helpers.set_class(document.body, "hide-r18g", !window.global_data.include_r18g);
    };

    // Redirect keyboard events that didn't go into the active view.
    redirect_event_to_view(e)
    {
        var view = this.displayed_view;
        if(view == null)
            return;

        // If a popup is open, leave inputs alone.
        if(document.body.dataset.popupOpen)
            return;

        // If the keyboard input didn't go to an element inside the view, redirect
        // it to the view's container.
        var target = e.target;
        // If the event is going to an element inside the view already, just let it continue.
        if(helpers.is_above(view.container, e.target))
            return;

        // Clone the event and redispatch it to the view's container.
        var e2 = new e.constructor(e.type, e);
        if(!view.container.dispatchEvent(e2))
        {
            e.preventDefault();
            e.stopImmediatePropagation();
            return;
        }
    }

    onkeydown(e)
    {
        // Ignore keypresses if we haven't set up the view yet.
        var view = this.displayed_view;
        if(view == null)
            return;

        // If a popup is open, leave inputs alone and don't process hotkeys.
        if(document.body.dataset.popupOpen)
            return;

        if(e.keyCode == 27) // escape
        {
            e.preventDefault();
            e.stopPropagation();

            this.navigate_out();

            return;
        }
       
        // Let the view handle the input.
        view.handle_onkeydown(e);
    }
};

new early_controller();

})();
