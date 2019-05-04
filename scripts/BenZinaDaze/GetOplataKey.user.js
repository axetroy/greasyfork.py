// ==UserScript==
// @name         GetOplataKey
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       Benzi
// @require      http://libs.baidu.com/jquery/2.1.4/jquery.min.js
// @match        https://www.oplata.info/info/buy.asp?id_i=*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    var rgxKey = /[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}/g;
    
	unsafeWindow.autoGet = function autoGet(flag){
		var links = document.querySelectorAll(".link_goods");
		mess.value = '';
		if(flag == 2){
			$('#mess').val('!redeem ');
		}
		for(var i = 0; i < links.length; i ++){
			var attrHref = links[i].getAttribute("href");
			GM_xmlhttpRequest({
		        method: "GET",
		        url: 'https://www.oplata.info/info/' + attrHref,
		        onload: function(response) {
		        	var data = response.responseText;
		        	var eleContainer = document.createElement("div");
		        	eleContainer.innerHTML = data;
		        	var eles = eleContainer.querySelectorAll(".paid_items_text");
		        	var mes = eles[0].innerHTML;
		        	if(flag == 1){
		        		$('#mess').val($('#mess').val() + mes + '\n');
		        	}else if(flag == 2){
			        	var keys = mes.match(rgxKey);
			        	if(keys != null){
			        		$('#mess').val($('#mess').val() + keys[0] + ',');
			        	}	
		        	}
		        }
		    });
	    }	
	};
	
	unsafeWindow.clearall = function clearall(){
		mess.value = '';
	};
	
    $('.lang').after('<div id="main" style="margin-top: 10px; mini-height:220px;margin-bottom: 0px;text-align:left;"></div>');
    $('#main').append('<div id="button" style="margin-top: 20px; margin-bottom: 10px;"></div>');
    $('#main').append('<div id="key" style="margin-top: 10px; margin-bottom: 0px;"></div>');
    $('#button').append('<button id="common" onclick="autoGet(1)" style="margin-left: 20px">一般格式</button>');
    $('#button').append('<button id="asf" onclick="autoGet(2)" style="margin-left: 20px">ASF格式</button>');
    $('#button').append('<button id="clearall" onclick="clearall()" style="margin-left: 20px">清空</button>');
    $('#key').append('<textarea rows="15" cols="80" name="mess" id="mess" style="height:200px;width:800px;");></textarea>');
	
})();