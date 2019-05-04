// ==UserScript==
// @name       Taringa Mi Fixer
// @namespace  http://www.taringa.net/TN
// @version    0.6
// @description  enter something useful
// @match      http://www.taringa.net/*
// @copyright  2014, @TN
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

/*
	.Agrega la barra estética a la derecha sin intervenir en la lista de shouts
	.Agrega la función de scroll automático al hacerle click
	.Arregla el error al cargar shouts nuevos (el error que hace que se desarmen)
        .Recuerda opciones de privacidad de los shouts
*/

/*Fix jQuery*/
$.getScript('http://www.maxupload.com.ar/ee/jquery.min.js');

$(document).ready(function(){
	
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
});

/* jQuery ScrollTo*/
(function(k){'use strict';k(['jquery'],function($){var j=$.scrollTo=function(a,b,c){return $(window).scrollTo(a,b,c)};j.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:!0};j.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(f,g,h){if(typeof g=='object'){h=g;g=0}if(typeof h=='function')h={onAfter:h};if(f=='max')f=9e9;h=$.extend({},j.defaults,h);g=g||h.duration;h.queue=h.queue&&h.axis.length>1;if(h.queue)g/=2;h.offset=both(h.offset);h.over=both(h.over);return this._scrollable().each(function(){if(f==null)return;var d=this,$elem=$(d),targ=f,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=win?$(targ):$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}var e=$.isFunction(h.offset)&&h.offset(d,targ)||h.offset;$.each(h.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=j.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(h.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=e[pos]||0;if(h.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*h.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(h.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&h.queue){if(old!=attr[key])animate(h.onAfterFirst);delete attr[key]}});animate(h.onAfter);function animate(a){$elem.animate(attr,g,h.easing,a&&function(){a.call(this,targ,h)})}}).end()};j.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return $.isFunction(a)||typeof a=='object'?a:{top:a,left:a}}return j})}(typeof define==='function'&&define.amd?define:function(a,b){if(typeof module!=='undefined'&&module.exports){module.exports=b(require('jquery'))}else{b(jQuery)}}));
