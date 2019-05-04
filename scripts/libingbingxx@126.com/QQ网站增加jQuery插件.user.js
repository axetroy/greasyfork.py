// ==UserScript==
// @name         QQ网站增加jQuery插件
// @namespace    https://github.com/lbbgit
// @version      0.2
// @description  QQ网站增加jQuery
// @author       lbbgit
// @match        https://*.qq.com/*
// @grant        none
// ==/UserScript==

(function() {
    function loadScript(url) {
            if (!url)
                return;
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            document.body.appendChild(script);
        }

        loadScript("//mat1.gtimg.com/www/asset/lib/jquery/jquery/jquery-1.11.1.min.js");
    // Your code here...
})();