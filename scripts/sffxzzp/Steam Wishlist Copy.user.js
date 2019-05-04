// ==UserScript==
// @name         Steam Wishlist Copy
// @namespace    https://coding.net/u/sffxzzp
// @version      0.01
// @description  Copy specified user's wishlist to your wishlist.
// @author       sffxzzp
// @match        *://store.steampowered.com/wishlist/*
// @icon         https://store.steampowered.com/favicon.ico
// ==/UserScript==

(function() {
    var util = (function () {
        function util() {}
        util.createElement = function (data) {
            var node;
            if (data.node) {
                node = document.createElement(data.node);
                if (data.content) {
                    this.setElement({node: node, content: data.content});
                }
                if (data.html) {
                    node.innerHTML = data.html;
                }
            }
            return node;
        };
        util.setElement = function (data) {
            if (data.node) {
                for (let name in data.content) {
                    data.node.setAttribute(name, data.content[name]);
                }
                if (data.html!=undefined) {
                    data.node.innerHTML = data.html;
                }
            }
        };
        return util;
    })();
    var swcopy = (function () {
        function swcopy() {};
        swcopy.prototype.run = function () {
            var searchBar = document.getElementsByClassName('controls')[0];
            var swcButton = util.createElement({node: "div", content: {class: "filter_tab settings_tab"}, html: "添加全部到愿望单"});
            swcButton.onclick = function () {
                if (confirm("确定全部添加到愿望单？\n可能会有不可预料的后果。")) {
                    for (var i=0;i<g_rgWishlistData.length;i++) {
                        AddToWishlist(g_rgWishlistData[i].appid);
                    }
                }
            }
            searchBar.appendChild(swcButton);
        };
        return swcopy
    })();

    var program = new swcopy();
    program.run();
})();