// ==UserScript==
// @name          SongzaReEnable
// @namespace     http://userstyles.org
// @description	  ReEnables Songza
// @author        ceberous
// @homepage      https://creatitees.info
// @include       http://songza.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @run-at        document-start
// @version       1.1
// ==/UserScript==
'use strict';
(function(){
  
    $(document).ready( function() {

		setTimeout(function(){
            alert("removing songza prevention");
			$('#colorbox, #cboxOverlay').empty().remove();  
		} , 2500 )

	});

    var node = document.createElement("style");
    node.type = "text/css";
    node.appendChild(document.createTextNode(css));
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
        heads[0].appendChild(node); 
    } else {
        document.documentElement.appendChild(node);
    }
  
    
})();