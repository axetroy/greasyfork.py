// ==UserScript==
// @name       v5 header ulrs.
// @namespace  http://www.taringa.net/TN
// @version    0.5
// @description  enter something useful
// @match      *.taringa.net/*
// @copyright  2014, @TN
// ==/UserScript==
/*Fix jQuery*/
$.getScript('http://www.maxupload.com.ar/ee/jquery.min.js');
$(document).ready(function(){
	$(".nav-principal a:[href$='/']").attr('href','/posts/recientes');
	$('.tool-profile').on('mousedown',function(e){
        e.preventDefault();
        e.stopPropagation();
        switch(e.button){
            case 0:
            	location.href=$('.tool-profile').attr('href');
                break;
            case 1:
                window.open($('.tool-profile').attr('href'));
                break;
        } 
    });
    $('.tool-profile, #tool-profile').on('mouseenter', function(e){
        e.preventDefault();
        e.stopPropagation();
        $('#tool-profile').show();
    });
    $('.tool-profile, #tool-profile').on('mouseleave', function(e){
        e.preventDefault();
        e.stopPropagation();
        $('#tool-profile').hide();
    });
});
