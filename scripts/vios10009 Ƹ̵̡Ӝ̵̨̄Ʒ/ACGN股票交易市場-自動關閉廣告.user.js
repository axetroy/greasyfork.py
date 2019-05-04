// ==UserScript==
// @name          ACGN股票交易市場-自動關閉廣告
// @namespace     http://userstyles.org
// @description	  ACGN股票交易市場專用：
// @author        vios10009 Ƹ̵̡Ӝ̵̨̄Ʒ
// @include       http://acgn-stock.com/*
// @include       https://acgn-stock.com/*
// @include       https://museum.acgn-stock.com/*
// @include       https://test.acgn-stock.com/*
// @run-at        document-start
// @version       1.31
// ==/UserScript==
(function() {var css = [
	"  /*自動關閉廣告*/",
	"  .bg-info[Class=\'media bg-info text px-2 py-1 my-2 rounded\']{",
	"   display: none !important;",
	"  }",
	"  .bg-info[Class=\'media bg-info px-2 py-1 my-2 rounded footer-message-container\']{",
	"   display: none !important;",
	"  }",
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