// ==UserScript==
// @name        Autofill Form
// @namespace   net.ptnw.autofillform
// @description Fill form inputs automatically
// @version     1.0
// @grant       none
// @include     *
// @author      Yoga Wibowo Aji
// @homepage    http://ptnw.net
// @icon http://i.imgur.com/XzOkUSP.png
// ==/UserScript==

if (window.top != window.self) {
    //--- Don't run on/in frames or iframes.
    return;
}

window.audio = null;

window.notifyMe = function(msg) {
	if (!Notification) {
		console.log('Desktop notifications not available in your browser. Try Chromium.'); 
		return;
	}

	if (Notification.permission !== "granted")
		Notification.requestPermission();
	else {
		var notification = new Notification('Autofill Form', {
			icon: 'http://trial.ptnw.net/favicon.png',
			body: msg,
		});
	
		/*
		notification.onclick = function () {
			window.open('http://stackoverflow.com/a/13328397/1269037', '_self');
		};
		*/
  }

}

if (!jQuery) document.write('<script src="http://code.jquery.com/jquery-2.2.0.min.js"></script>');

$(document).ready(function(){
    console.log('tes');
	document.addEventListener('DOMContentLoaded', function () {
		if (Notification.permission !== "granted")
			Notification.requestPermission();
	});
	
	var css = '<style id="prs_button">\
		#tombolswitch { \
			border:1px solid #2a2c2f; -webkit-border-radius: 3px; -moz-border-radius: 3px;border-radius: 3px;font-size:12px;font-family:arial, helvetica, sans-serif; padding: 10px 10px 10px 10px; text-decoration:none; display:inline-block;text-shadow: -1px -1px 0 rgba(0,0,0,0.3);font-weight:bold; color: #FFFFFF;\
			background-color: #45484d; background-image: -webkit-gradient(linear, left top, left bottom, from(#45484d), to(#000000));\
			background-image: -webkit-linear-gradient(top, #45484d, #000000);\
			background-image: -moz-linear-gradient(top, #45484d, #000000);\
			background-image: -ms-linear-gradient(top, #45484d, #000000);\
			background-image: -o-linear-gradient(top, #45484d, #000000);\
			background-image: linear-gradient(to bottom, #45484d, #000000);filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#45484d, endColorstr=#000000);\
		}\
		\
		#tombolswitch:hover {\
			border:1px solid #151617;\
			background-color: #2d2f32; background-image: -webkit-gradient(linear, left top, left bottom, from(#2d2f32), to(#1a1a1a));\
			background-image: -webkit-linear-gradient(top, #2d2f32, #1a1a1a);\
			background-image: -moz-linear-gradient(top, #2d2f32, #1a1a1a);\
			background-image: -ms-linear-gradient(top, #2d2f32, #1a1a1a);\
			background-image: -o-linear-gradient(top, #2d2f32, #1a1a1a);\
			background-image: linear-gradient(to bottom, #2d2f32, #1a1a1a);filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#2d2f32, endColorstr=#1a1a1a);\
		}\
		</style>';
	
	$('head').append(css);
	
	var html = '<div style="position:fixed;top:0;left:0;width:100%;height:70px;z-index:9999999"><input type="text" id="prefix" style="padding:5.5px 0 5.5px 5px"><button type="button" id="tombolswitch">Isi Form</button></div>';
	console.log(html);
	$('body').prepend(html);
	
	$('#tombolswitch').click(function(){
		var prefix = $('#prefix').val();
        var i = 1;
		$('input[type="text"], input[type="password"], textarea').each(function(){
            if ($(this).attr('id') != 'prefix'){
               $(this).val(prefix+i); 
               i++;
            }
        });
        
        $('input[type="checkbox"]').each(function(){
            $(this).prop('checked', true);
        });
        
        audio = new Audio('http://www.zedge.net/d2w/4/519250/963321831/dl/');
        audio.play();
		notifyMe('Semua input berhasil diisi');
	});
	

});