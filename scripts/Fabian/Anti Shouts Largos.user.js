// ==UserScript==
// @name       Anti Shouts Largos
// @namespace  http://www.taringa.net/TN
// @version    0.8
// @description  Acorta shouts largos y inserta un boton para extenderlo.
// @match      http://*.taringa.net/*
// @copyright  2013 @TN
// ==/UserScript==

/*Fix jQuery*/
$.getScript('http://www.maxupload.com.ar/ee/jquery.min.js');

$.fn.addOnResizeEvent = function(custom_options) {
 
	var options = {
		timeInterval : 100,
		forceIE : false
	};
 
	$.extend( custom_options, options );
 

	if ($.browser.ie && !options.forceIE) return;
 
	return this.each( function() {
 
		var target = $(this);
		var lw, lh;
 
		var interval = setInterval( function() {
 
			var w = target.width(),
				h = target.height();
 
			if (!lw == undefined) lw = w;
			if (!lh == undefined) lh = h;
 
			if ( lw != w || lh != h )
			{
				lw = w;
				lh = h;
				target.trigger( "resize" );
			} 
 
		}, options.timeInterval );
 
	} );
 
};
var isShoutsLoading=false;
var keyOrButtonPressed=false;

(function($){  
    $(document).ready(function(){
        $(document).on('keyup',function(){
            keyOrButtonPressed=true;
        });
        $(document).on('keydown',function(){
            keyOrButtonPressed=true;
        });
        $(document).on('mouseup',function(){
            keyOrButtonPressed=true;
        });
        $(document).on('mousedown',function(){
            keyOrButtonPressed=true;
        });
        setInterval(function(){keyOrButtonPressed=false;},500);
        $(document).on('click','#Feed-reload', function(){
            keyOrButtonPressed=false;
        });
        $(document).on('click', 'li a.Feed-load', function(){
            keyOrButtonPressed=false;
        });
        $('.activity-content').each(function(edda, eel){         
            if ($(eel).height()> '1000'){
              AdaptShout(eel);  
            }
        });
        $("#Feed-list").addOnResizeEvent();
         $("#shouts").addOnResizeEvent();
         $("#last-activity-container").addOnResizeEvent();
        $("#Feed-list").resize(function(){
            if($(this).hasClass('loading')){
                isShoutsLoading=true;
            }
            else{
                isShoutsLoading=false;
            }
            if(!(isShoutsLoading) && !(keyOrButtonPressed)){
                 $('.activity-content').each(function(edda, eel){         
            		if ($(eel).height()> '1000'){
              			AdaptShout(eel);  
            		}
                 });
                
            }
        });
        $("#shouts").resize(function(){
            if($(this).hasClass('loading')){
                isShoutsLoading=true;
            }
            else{
                isShoutsLoading=false;
            }
            if(!(isShoutsLoading) && !(keyOrButtonPressed)){
                 $('.activity-content').each(function(edda, eel){         
            		if ($(eel).height()> '1000'){
              			AdaptShout(eel);  
            		}
                 });
                
            }
        });
        $("#last-activity-container").resize(function(){
            if($(this).hasClass('loading')){
                isShoutsLoading=true;
            }
            else{
                isShoutsLoading=false;
            }
            if(!(isShoutsLoading) && !(keyOrButtonPressed)){
                 $('.activity-content').each(function(edda, eel){         
            		if ($(eel).height()> '1000'){
              			AdaptShout(eel);  
            		}
                 });
                
            }
        });
    });

})(jQuery);

function AdaptShout(eel){
    var cssStyle={'height':'400px', 'overflow-x':'hidden', 'overflow-y':'scroll'};
                $(eel).css(cssStyle);
    $(eel).append('<p class="btn a extensor" style="position:absolute;top: 85%;left: 33%;"><b>Click para extender</b><p>');
    $(eel).on('click','.extensor',function(){
        $(this).parent('.activity-content').height('100%').css({'overflow-y':'hidden'});
        $(this).hide();
    });
}

