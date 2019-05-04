// ==UserScript==
// @name	   	 KFeederMacro
// @version      v1.01
// @description  Agar.io
// @match        http://agar.io/
// @match        http://agarprivate.ml/
// @match        http://167.114.29.68/party/
// @grant        none
// @namespace https://greasyfork.org/users/54604
// ==/UserScript==

//Press E will fire up to 50 'w's
$(document).on('keydown',function(e){
	if(e.keyCode == 69){
		for(var i = 0; i<50; i++){
			$("body").trigger($.Event("keydown", { keyCode: 87})); 
			$("body").trigger($.Event("keyup", { keyCode: 87})); 
		}
	}
});