// ==UserScript==
// @name         Floating youtube player
// @namespace    https://www.youtube.com/
// @version      1.0
// @description  Make youtube player float
// @author       pcktm
// @license      MIT
// @match        https://www.youtube.com/watch?v=*
// @grant        none
// @require      https://code.jquery.com/jquery-3.3.1.slim.min.js
// ==/UserScript==

(function() {
    'use strict';
    console.log('Floating youtube init');
})();

let state = {bool: 1};
let element = $('video')

$(window).scroll(function() {
    if($('.title').visible()){
        if(state.bool == 0) {
            element.attr('style', state.initStyle);
            state.bool = 1;
        }
    } else {
        if(state.bool == 1) {
            state.initStyle = element.attr("style")
            var size = {width: state.initStyle.split(';')[0].split(' ')[1].slice(0, -2), height: state.initStyle.split(';')[1].split(' ')[2].slice(0, -2)}
            size.calc = calculateAspectRatioFit(size.width, size.height, $(window).width()/3, $(window).width()/3)
            element.attr('style', '');
            element.css({'position': 'fixed', 'left': $(window).width() - $(window).width()/30 - size.calc.width + 'px', 'top': $(window).height() - $(window).height()/30 - size.calc.height + 'px', 'width': size.calc.width, 'height': size.calc.height})
            state.bool = 0;
        }
    }
})

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth*ratio, height: srcHeight*ratio };
 }

 //EXTERNAL JQUERY PLUGIN THAT GREASYFORK DIDN'T LET ME LOAD (JQUERY VISIBLE)
 !function(t){var i=t(window);t.fn.visible=function(t,e,o){if(!(this.length<1)){var r=this.length>1?this.eq(0):this,n=r.get(0),f=i.width(),h=i.height(),o=o?o:"both",l=e===!0?n.offsetWidth*n.offsetHeight:!0;if("function"==typeof n.getBoundingClientRect){var g=n.getBoundingClientRect(),u=g.top>=0&&g.top<h,s=g.bottom>0&&g.bottom<=h,c=g.left>=0&&g.left<f,a=g.right>0&&g.right<=f,v=t?u||s:u&&s,b=t?c||a:c&&a;if("both"===o)return l&&v&&b;if("vertical"===o)return l&&v;if("horizontal"===o)return l&&b}else{var d=i.scrollTop(),p=d+h,w=i.scrollLeft(),m=w+f,y=r.offset(),z=y.top,B=z+r.height(),C=y.left,R=C+r.width(),j=t===!0?B:z,q=t===!0?z:B,H=t===!0?R:C,L=t===!0?C:R;if("both"===o)return!!l&&p>=q&&j>=d&&m>=L&&H>=w;if("vertical"===o)return!!l&&p>=q&&j>=d;if("horizontal"===o)return!!l&&m>=L&&H>=w}}}}(jQuery);