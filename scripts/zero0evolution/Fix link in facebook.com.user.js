// ==UserScript==
// @name		Fix link in facebook.com
// @namespace Fix link in facebook.com
// @version	 1.0
// @include		/^https?\:\/\/(?:m|www)\.facebook\.com/
// @description	Fix link in facebook.com, for the link is start width "https://l.facebook.com/l.php?" or "https://lm.facebook.com/l.php?", fix the link to original link.
// @author zero0evolution
// ==/UserScript==


var fixHref = function(elem){
	var oldHref = elem.href
	var linkMatchObj = oldHref.match(
		/^https\:\/\/lm?\.facebook\.com\/l\.php\?(.*)$/im)
	if(linkMatchObj){
		var innerLinkMatchObj = linkMatchObj[1].match(
			/u\=(.*?)(?=\&|$)/im)
		if(innerLinkMatchObj){
			var newHref = decodeURIComponent(innerLinkMatchObj[1])
			elem.href = newHref
			console.log(oldHref,"\n==>\n",newHref)
		}
	}
}


var createHrefMutationObserver = function(elem){
	var hrefMutationObserver = new MutationObserver(
		function(mutationObjs){
			for(let eachMutationObj of mutationObjs){
				fixHref(eachMutationObj.target)
			}
		}
	)
	hrefMutationObserver.observe(
		elem,{
			attributes:true,
			attributeFilter:["href"],
		}
	)
}


var fixAllHref = function(topElem){
	if(topElem.matches("a[href]")){
		fixHref(topElem)
		createHrefMutationObserver(topElem)
	}
	for (let childElem of topElem.querySelectorAll("a[href]")) {
		fixHref(childElem)
		createHrefMutationObserver(childElem)
	}
}


var init = function(){
	fixAllHref(document.documentElement)

	var newNodeObserverObj = new MutationObserver(
		function (mutationObjs){
			for(let eachMutationObj of mutationObjs){
				for(eachAddNode of eachMutationObj.addedNodes){
					if(eachAddNode.nodeType === 1){
						fixAllHref(eachAddNode)
					}
				}
			}
		}
	)

	newNodeObserverObj.observe(
		//監視目標
		document.documentElement,{
			childList:true,
			subtree:true,
		}
	)
}

if(document.readyState === "loading"){
	document.addEventListener(
		"DOMContentLoaded",function(event){
			init()
		}
	)
}
else{
	init()
}
