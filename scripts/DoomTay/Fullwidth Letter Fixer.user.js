// ==UserScript==
// @name          Fullwidth Letter Fixer
// @namespace     DoomTay
// @description   Replaces fullwidth letters with ASCII equivalents, making pages a bit more searchable
// @version       1.0.3
// @grant         none

// ==/UserScript==

function replaceText(node) {
	var nodes = node.childNodes;
	for (var n=0; n<nodes.length; n++) {
		if(nodes[n].nodeType == Node.TEXT_NODE)
		{
			nodes[n].textContent = nodes[n].textContent.replace(/[\uFF01-\uFF5E]/g, function(char) {
			  return String.fromCharCode(char.charCodeAt(0) - 0xFF01 + 0x21);
			});
		}
		//Nothing left to do here. Look at the children of this node
		replaceText(nodes[n]);
	}
}

replaceText(document.body);