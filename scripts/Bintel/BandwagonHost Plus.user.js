// ==UserScript==
// @name         BandwagonHost Plus
// @namespace    https://github.com/Bintel/BandwagonHost-Plus/
// @version      1.2
// @author       Bintel
// @description  Add more features to BandwagonHost
// @supportURL   https://github.com/Bintel/BandwagonHost-Plus/issues
// @match        https://kiwivm.64clouds.com/main-menu.php
// @grant        none
// ==/UserScript==

(function() {
    "use strict";

    let CreateItem = (name, displayName) =>
        `<li><a target='main' href='preloader.php?load=/main-exec.php?mode=${name}'>${displayName}</a></li>`;

    let $menu = $(".menu");

    $menu.append(`<li class="group">BandwagonHost Plus</li>`);

    $menu.append(CreateItem("blacklistcheck", "Block List Check"));
    $menu.append(CreateItem("extras_shadowsocks", "Shadowsocks Server"));
    $menu.append(CreateItem("extras_shadowsocksr", "ShadowsocksR Server"));

    $menu.children("li").click(make_button_active);
})();