// ==UserScript==
// @name            No YaHei
// @version         7
// @grant           none
// @description     Replace Microsoft YaHei, SimSun in a webpage with modern fonts DengXian, FZPingXianYaSong.
// @namespace       undefined
// ==/UserScript==
// ==UserScript==
(function() {var css = "";
css += [
    "@font-face {font-family: Verdana;unicode-range: U+2E80-FFFF; src: local('FZPingXianYaSong-R-GBK')}",
    "@font-face {font-family: Arial;unicode-range: U+2E80-FFFF; src: local('FZPingXianYaSong-R-GBK')}",
    "@font-face {",
    "    font-family: '宋体';",
    "    src: local('FZPingXianYaSong-R-GBK');",
    "}",
    "@font-face {",
    "    font-family: 'SimSun';",
    "    src: local('FZPingXianYaSong-R-GBK');",
    "}",
    "@font-face {",
    "    font-family: 'NSimSun';",
    "    src: local('FZPingXianYaSong-R-GBK');",
    "}",
    "@font-face {",
    "    font-family: '微软雅黑';",
    "    src: local('FZPingXianYaSong-R-GBK');",
    "}",
    "@font-face {",
    "    font-family: 'Microsoft YaHei';",
    "    src: local('FZPingXianYaSong-R-GBK');",
    "}"
	].join("\n");

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node);
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
