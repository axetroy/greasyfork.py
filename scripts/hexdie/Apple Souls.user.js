// ==UserScript==
// @name         Apple Souls
// @description Replaces Dark Souls with Applebees
// @version      1.0
// @namespace https://greasyfork.org/users/39450
// ==/UserScript==

var elements = document.getElementsByTagName("*");

for(var i = 0; i < elements.length; i++){
	var element = elements[i];

	for(var j = 0; j < element.childNodes.length; j++){
		var node = element.childNodes[j];

		if(node.nodeType === 3){
			var text = node.nodeValue;
			var replacedText = text.replace(/Dark Souls/gi, "Applebees");

			if(replacedText !== text){
				element.replaceChild(document.createTextNode(replacedText), node);
			}
		}
	}
}