// ==UserScript==
// @name 		电子科技大学网教
// @namespace 		remotedu
// @version 		0.0.14
// @author 		bengben
// @description 	自动电子科技大学网教资料
// @run-at document-idle

// @include   http*://learning.uestcedu.com/learning3/console/*
// @require 	https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js

// @grant 		GM_getValue
// @grant 		GM_setValue
// @grant 		GM_listValues
// ==/UserScript==

// test script
// GM_setValue('GMTest1','hello kitty');
// alert(GM_getValue('GMTest1'));

console.info('remotedu...')
var content = 'test';

var interval=setInterval(function(){
	// content = $('iframe').contents().find('iframe').contents().find('#tdRemark').text(); //$('#tdRemark').html();
	console.log('1:',$('iframe').contents().find('iframe').contents().find('#tdRemark'));
	console.log('2:',$('iframe').contents().find('iframe').contents().find('iframe').contents().find('#tdRemark'));
	console.log('3:',$('iframe').contents().find('iframe').contents().find('iframe').contents().find('iframe').contents().find('#tdRemark'));
},3000);








