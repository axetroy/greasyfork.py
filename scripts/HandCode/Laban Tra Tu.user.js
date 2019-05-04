// ==UserScript==
// @name        Laban Tra Tu
// @namespace   handcode
// @author HandCode | handcode.net
// @description La Bàn Tra Từ Beta
// @version     0.69
// @homepage http://handcode.net
// @grant       none
// @license https://creativecommons.org/licenses/by-sa/4.0/
// @icon https://addons.cdn.mozilla.net/user-media/userpics/12/12166/12166106.png
// ==/UserScript==
var lbplugin_event_opt = {
    "extension_enable": true,
    "dict_type": 1,
    "dbclk_event": {
        "trigger": "none",
        "enable": true,
        "display": 1
    },
    "select_event": {
        "trigger": "none",
        "enable": true,
        "display": 1
    }
};

function loadScript(t, e) {
    var n = document.createElement("script");
    n.type = "text/javascript", n.readyState ? n.onreadystatechange = function() {
        ("loaded" === n.readyState || "complete" === n.readyState) && (n.onreadystatechange = null, e())
    } : n.onload = function() {
        e()
    }, n.src = t, document.getElementsByTagName("head")[0].appendChild(n)
}
setTimeout(function() {
    null == document.getElementById("lbdictex_find_popup") && loadScript("http://stc.laban.vn/dictionary/js/plugin/lbdictplugin.min.js?" + Date.now() % 1e4, function() {
        lbDictPlugin.init(lbplugin_event_opt)
    })
}, 1e3);