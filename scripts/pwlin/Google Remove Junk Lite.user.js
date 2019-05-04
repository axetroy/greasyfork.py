// ==UserScript==
// @name          	Google Remove Junk Lite
// @version	0.3
// @namespace      
// @description  Remove prefetch, sponsors and link tracking from Google search.
// @include	http://www.google.com/*
// @include	https://www.google.com/*
// @include	http://groups.google.com/*
// @include	https://groups.google.com/*
// @include	http://www.google.nl/*
// @include	https://www.google.nl/*
// ==/UserScript==

var $grjl = {

	init : function(){
		this.removeNoScriptTags();
		this.RemovePrefetch();
		this.RemoveSponsors();
		this.RemoveLinkTracking();
		setTimeout(function(){
			$grjl.removeNoScriptTags();
			$grjl.RemovePrefetch();
			$grjl.RemoveSponsors();
			$grjl.RemoveLinkTracking();
		}, 2000);
	},

	qs : function(Query_String_Name,url) {
		var i, pos, argname, argvalue, queryString, pairs;
		if(!url){url = location.href}
		queryString = url.substring(url.indexOf("?")+1);
		pairs = queryString.split("&");
		for (i = 0; i < pairs.length; i++) { 
			pos = pairs[i].indexOf('='); 
				if (pos == -1) {
					continue; 
				}
			argname = pairs[i].substring(0,pos);
			argvalue = pairs[i].substring(pos+1); 
			if (argname == Query_String_Name) {
				// return unescape(argvalue.replace(/\+/g, " "));
				return argvalue;
			}
		}
		return false;
	},
	
	removeNoScriptTags : function(){
		var noScriptTags = document.getElementsByTagName('noscript');
		for (var x = 0, y = noScriptTags.length; x < y; x++) {
			var el = noScriptTags[x];
			el.innerHTML = '';
		}
	},
	
	RemoveSponsors : function(){
		var mbEnd = $('mbEnd') ;  
		if (mbEnd){
			mbEnd.parentNode.removeChild(mbEnd) ; 
		}
		var tads = $('tads');
		if(tads){
			tads.parentNode.removeChild(tads) ;  				
		}
		var rhsa = $('rhsa');
		if(rhsa){
			rhsa.parentNode.removeChild(rhsa) ; 
		}
	},
	
	RemoveLinkTracking : function(){
		var all_a = document.getElementsByTagName('a');
		for (var i = 0, k=all_a.length; i< k; i++){
			var a = all_a[i];
			a.removeAttribute('onclick');
			a.removeAttribute('onmousedown');
			if(a.href.match(/\/url\?q=/)){
				var q = this.qs('q',a.href);
				a.href = decodeURIComponent(q.replace(/\+/g, '%20'));
 			}
			else if(a.href.match(/\/url\?url=/)){
				var url = this.qs('url',a.href);
				a.href = decodeURIComponent(url.replace(/\+/g, '%20'));
 			}
		}
		
		var elements = ['div', 'li', 'span', 'a'];
		for (var i = 0, k=elements.length; i< k; i++){
			var element = document.getElementsByTagName(elements[i]);
			for (var x = 0, y=element.length; x< y; x++){
				var el = element[x];
				el.removeAttribute('onclick');
				el.removeAttribute('onmousedown');	
			}
		}
			
	},

	RemovePrefetch : function(){
		var all_links = document.getElementsByTagName('link');
		for (var i = 0 , k=all_links.length; i< k ; i++){
			var link = all_links[i];
			if(link.rel == 'prefetch'){
				link.parentNode.removeChild(link) ;
			}
		}	
	}
	
};

function $(id, doc) { if (!doc) { doc = document ; } if(doc.getElementById(id)) { return doc.getElementById(id) } else { return false } ; };

(function(){
	$grjl.init();
})();

