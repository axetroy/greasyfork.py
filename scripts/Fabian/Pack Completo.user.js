// ==UserScript==
// @name       Pack Completo
// @namespace  http://www.taringa.net/TN
// @version    0.7
// @description  v5hu, PostEnter, Taringa Mi Fixer,Anti Shouts Largos
// @match      http://www.taringa.net/*
// @copyright  2014, @TN
// ==/UserScript==
/*Fix jQuery*/
$.getScript('http://www.maxupload.com.ar/ee/jquery.min.js');
$(document).ready(function(){
	/* PSTENT */
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

    /* TRNG MI FXR */
	setInterval(function(){
		if ($('#bubble-alert-newsfeed').html()!== ''){
			$('#counter-newsfeed').show().html($('#bubble-alert-newsfeed').html());
		}
		$('#Feed-reload').html('<i class="icon home" id="Feed-reload"></i> <span id="Feed-reload" style="margin-left: 3px;padding: 3px 6px;border-radius: 0;box-shadow: none;text-shadow: none;color: #FFF;background-color: #838588;">' + $('#bubble-alert-newsfeed').html()+'</span>');
	},100);

	$('#Feed-reload').click(function(){
		$(document).scrollTo($('#main-col'), 100);
	});
	$("body").append("<style>.loading div.activity-element{text-align: left!important;min-width:660px!important;left: -10px!important;}div#Feed-reload.alert.info {position: fixed;left: 0px;top: 25%;min-width: 45px;padding: 13px;color: #f0f0f0;font-size: 1.1em;font-weight: bold;background: #333;}</style>");

if (localStorage.getItem("TaringaPriv") ==null){
         localStorage.setItem("TaringaPriv",0);
     }
        
    $('.privacy-shout').attr('data-privacy',localStorage.getItem("TaringaPriv"));
    $('.my-shout-footer').on('click','ul.select-list li a',function(){
        localStorage.setItem("TaringaPriv",$(this).attr('data-value'));
    });
    var lc="li.privacy-shout-"+localStorage.getItem("TaringaPriv")+" a";
    $(lc).css("color","#333");

    /*LINKS V5*/
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


/* 
	ASL 
*/
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

/* jQuery ScrollTo*/
(function(k){'use strict';k(['jquery'],function($){var j=$.scrollTo=function(a,b,c){return $(window).scrollTo(a,b,c)};j.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:!0};j.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(f,g,h){if(typeof g=='object'){h=g;g=0}if(typeof h=='function')h={onAfter:h};if(f=='max')f=9e9;h=$.extend({},j.defaults,h);g=g||h.duration;h.queue=h.queue&&h.axis.length>1;if(h.queue)g/=2;h.offset=both(h.offset);h.over=both(h.over);return this._scrollable().each(function(){if(f==null)return;var d=this,$elem=$(d),targ=f,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=win?$(targ):$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}var e=$.isFunction(h.offset)&&h.offset(d,targ)||h.offset;$.each(h.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=j.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(h.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=e[pos]||0;if(h.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*h.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(h.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&h.queue){if(old!=attr[key])animate(h.onAfterFirst);delete attr[key]}});animate(h.onAfter);function animate(a){$elem.animate(attr,g,h.easing,a&&function(){a.call(this,targ,h)})}}).end()};j.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return $.isFunction(a)||typeof a=='object'?a:{top:a,left:a}}return j})}(typeof define==='function'&&define.amd?define:function(a,b){if(typeof module!=='undefined'&&module.exports){module.exports=b(require('jquery'))}else{b(jQuery)}}));