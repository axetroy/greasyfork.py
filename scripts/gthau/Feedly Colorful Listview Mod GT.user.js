// ==UserScript==
// @name           Feedly Colorful Listview Mod GT
// @id             FeedlyColorfulListviewModGT
// @version        0.2.1.20170504
// @description    Colorful list view for Feedly
// @namespace      https://greasyfork.org/en/users/121140-gthau
// @match          *://*.feedly.com/i/latest
// @match          *://*.feedly.com/i/category/*
// @match          *://*.feedly.com/i/subscription/*
// @match          *://*.feedly.com/i/saved
// @grant          GM_addStyle
// @run-at         document-end
// ==/UserScript==
var observeFeedyItem = (_observeTarget, _callback) => {
	var mo = new MutationObserver((mutations) => {
		var nodes = [];
		mutations.forEach((mutation, index) => {
			var node = mutation.target;
			if ((node.className || "").indexOf("density-34")>-1) nodes.push(node);
/*旧仕様暫定コードここから*/
//*
			if (mutation.type!="childList" || mutation.target.getAttribute("id")!="section0_column0") return null;
			Array.from(mutation.addedNodes).forEach(function (node) {
				if (node.getAttribute("data-u") == "0") nodes.push(node);
			});
//*/
/*旧仕様暫定コードここまで*/
		});
		_callback(Array.from(new Set(nodes)));
	});
	mo.observe(document.getElementById("box"), _observeTarget);
};
var ColorfulListView = class {
	constructor() {
		this.colors = {};
	}
	makeColor(str) {
		var h = 0;
		for each (var c in str) {
			h += c.charCodeAt(0);
		};
		return {"h":(h%36+1)*10, "s":30 + (h%5+1)*10}
	}
	color(node) {
		var itemid = node.id.replace(/^([^=]+).*$/, "$1");
		node.setAttribute("data-color", itemid);
		if (this.colors[itemid]!=undefined) return null;
		this.colors[itemid] = this.makeColor(itemid);
		GM_addStyle(
			"div[data-color='" + itemid + "']:not(.inlineFrame) {background:hsl(" + this.colors[itemid]["h"] + "," + this.colors[itemid]["s"] + "%,80%) !important;}"
			+ "div[data-color='" + itemid + "']:not(.inlineFrame):hover {background:hsl(" + this.colors[itemid]["h"] + "," + this.colors[itemid]["s"] + "%,70%) !important;}"
		);
	}
};
observeFeedyItem({childList:true, subtree:true}, (nodes) => {
	var ins = new ColorfulListView();
	nodes.forEach((node) => {ins.color(node)});
});