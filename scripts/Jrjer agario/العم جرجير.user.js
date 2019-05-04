// ==UserScript==
// @name         العم جرجير
// @namespace    العم جرجير
// @version      2.1.4
// @description  Unoffical Polish MOD
// @author       العم رجير
// @match        http://dual-agar.online/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      dual-agar.online
// ==/UserScript==

// Copyright © 201è العم جرجير

if (location.host == "agar.io" && location.pathname == "/") {
    location.href = "http://dual-agar.online/GrGeR" + location.hash;
    return;
}


function inject(page) {
    var _page = page.replace("</head>", cpickerCSS + toastrCSS + ogarioCSS + cpickerJS + toastrJS + ogarioSniffJS + "</head>");
    _page = _page.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "");
    _page = _page.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/, "");
    _page = _page.replace("</body>", ogarioJS + "</body>");
    return _page;
}

window.stop();
document.documentElement.innerHTML = "";
GM_xmlhttpRequest({
    method : "GET",
    url : "http://agar.io/",
    onload : function(e) {
        var doc = inject(e.responseText);
        document.open();
        document.write(doc);
        document.close();
    }
});