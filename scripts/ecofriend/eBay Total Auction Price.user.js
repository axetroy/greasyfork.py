// ==UserScript==
// @name		eBay Total Auction Price
// @namespace	https://greasyfork.org/en/users/9709-ecofriend
// @version		2015.03.17
// @author		ecofriend
// @description	Add the total eBay auction price + shipping = total in the auction listing
// @include		http://www.ebay.co.uk/sch/*
// @run-at		document-end
// @grant       GM_info
// ==/UserScript==


function qs(a){
	var scope = a.cn || document;
	if (a.all === true){
		var qsa;
		if (a.ar === true){
			qsa = Array.prototype.slice.call(scope.querySelectorAll(a.se));
		}
		else {
			qsa = scope.querySelectorAll(a.se);
		}
		return qsa;
	}
	else {
		return scope.querySelector(a.se);
	}
}

function findMatch(string, regex, index){
	if (string === null) return null;
	index = index || 1;
	var m = string.match(regex);
	return (m) ? (index=='all' ? m : (m[index] ? m[index] : m[0])) : null;
}

var lvi = qs({se:'#ListViewInner > li', all:true, ar:true});
if (lvi){
	for (var i=0; lvi[i]; i++){
		var pr = qs({se:'.lvprice span', cn:lvi[i]}),
			pp = qs({se:'.fee', cn:lvi[i]});
		if (pr && pp){
			var cur = findMatch(pr.textContent, /(.)\d+\.\d+/);
			var tot = parseFloat(findMatch(pr.textContent, /(\d+\.\d+)/)) +
					  parseFloat(findMatch(pp.textContent, /(\d+\.\d+)/));
			pp.innerHTML = pp.textContent +'<br>= '+ cur + tot.toFixed(2);
		}
	}
}
