// ==UserScript==
// @name       PostEnter
// @namespace  http://www.taringa.net/XP
// @version    0.5
// @description  Comentar y shoutear con la tecla enter
// @match      *.taringa.net/*
// @copyright  2014, @XP
// ==/UserScript==
/*Fix jQuery*/
$.getScript('http://www.maxupload.com.ar/ee/jquery.min.js');
    $("#my-shout-body-mi").keypress(function(e){
        if ( e.which == 13 && e.shiftKey ) {
     		//event.preventDefault();
        }else if(e.which == 13){
            $(".my-shout-add").click();
 	 	}
    });
    $("body").on('keypress','textarea.form-input-text.ubertext',function(e){
        if ( e.which == 13 && e.shiftKey ) {
     		//event.preventDefault();
        }else if(e.which == 13){
            $("#comment-button-text").click();
 	 	}
    });
