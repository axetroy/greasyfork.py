// ==UserScript==
// @name         remove unnecessary nodes for dev environment
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Allen Zhou
// @require      http://code.jquery.com/jquery-1.12.4.js
// @match        http://*/ui/*/services/*
// @grant        none
// ==/UserScript==
this.jQuery = jQuery.noConflict(true);
function sleep(delay) {
  var start = (new Date()).getTime();
  while ((new Date()).getTime() - start < delay) {
    continue;
  }
}
function deregister(){
	$('div.unhealthy em').each(function(i, o){

		var id = $(o).html();
		console.log(id);
		$.ajax({
		   url: '/v1/agent/service/deregister/'+id,
		   type: 'PUT',
		   headers: {
		"Content-Type": "application/json",
		"X-HTTP-Method-Override": "PUT" },
		   success: function( response ) {
				console.log("success");
		   },
		   error: function(err){
				console.log("error");
		   }
		});
        sleep(500);
	});
	//清理多余的可用node
	$('div.healthy em').each(function(i, o){
		if(0 === i) return true;
		var id = $(o).html();
		console.log(id);
		$.ajax({
		   url: '/v1/agent/service/deregister/'+id,
		   type: 'PUT',
		   headers: {
		"Content-Type": "application/json",
		"X-HTTP-Method-Override": "PUT" },
		   success: function( response ) {
				console.log("success");
		   },
		   error: function(err){
				console.log("error");
		   }
		});
        sleep(500);
	});

};
jQuery(function() {
    'use strict';
    setTimeout(function(){
        jQuery('#radiogroup_status').append('<button id="clean">清除</button>');
        
        jQuery('#clean').click(function(e){
            e.preventDefault();
            deregister();
            window.location.reload();
        });

    }, 3000);
    
});