// ==UserScript==
// @name         链家BottomBar
// @namespace    http://your.homepage/
// @version      0.3
// @description  DEMO
// @author       zhea55
// @match        http://*.lianjia.com/*
// @require      http://cdn.bootcss.com/jquery/1.11.3/jquery.min.js
// @run-at       document-start
// @grant GM_addStyle
// ==/UserScript==

GM_addStyle(".tipsy{font-size:13px;position:absolute;padding:5px;z-index:100000;border:3px solid #2c2c2c;background:#fff;color:#2c2c2c;opacity:1}.tipsy-inner{max-width:400px;font-family:'Georgia',serif;font-size:14px;line-height:18px;padding:8px 10px;overflow:hidden;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px}.tipsy-arrow{position:absolute;width:0;height:0;line-height:0;border:8px dashed #000}.tipsy-arrow-n{border-bottom-color:#000}.tipsy-arrow-s{border-top-color:#000}.tipsy-arrow-e{border-left-color:#000}.tipsy-arrow-w{border-right-color:#000}.tipsy-n .tipsy-arrow{top:0;left:50%;margin-left:-5px;border-bottom-style:solid;border-top:none;border-left-color:transparent;border-right-color:transparent}.tipsy-nw .tipsy-arrow{top:0;left:10px;border-bottom-style:solid;border-top:none;border-left-color:transparent;border-right-color:transparent}.tipsy-ne .tipsy-arrow{top:0;right:10px;border-bottom-style:solid;border-top:none;border-left-color:transparent;border-right-color:transparent}.tipsy-s .tipsy-arrow{bottom:0;left:50%;margin-left:-5px;border-top-style:solid;border-bottom:none;border-left-color:transparent;border-right-color:transparent}.tipsy-sw .tipsy-arrow{bottom:0;left:10px;border-top-style:solid;border-bottom:none;border-left-color:transparent;border-right-color:transparent}.tipsy-se .tipsy-arrow{bottom:0;right:10px;border-top-style:solid;border-bottom:none;border-left-color:transparent;border-right-color:transparent}.tipsy-e .tipsy-arrow{right:0;top:50%;margin-top:-5px;border-left-style:solid;border-right:none;border-top-color:transparent;border-bottom-color:transparent}.tipsy-w .tipsy-arrow{left:-8px;top:50%;margin-top:-5px;border-right-style:solid;border-left:none;border-top-color:transparent;border-bottom-color:transparent}");

!function(t){function i(t,i){return"function"==typeof t?t.call(i):t}function e(t){for(;t=t.parentNode;)if(t==document)return!0;return!1}function s(i,e){this.$element=t(i),this.options=e,this.enabled=!0,this.fixTitle()}s.prototype={show:function(){var e=this.getTitle();if(e&&this.enabled){var s=this.tip();s.find(".tipsy-inner")[this.options.html?"html":"text"](e),s[0].className="tipsy",s.remove().css({top:0,left:0,visibility:"hidden",display:"block"}).prependTo(document.body);var n,o=t.extend({},this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight}),l=s[0].offsetWidth,a=s[0].offsetHeight,f=i(this.options.gravity,this.$element[0]);switch(f.charAt(0)){case"n":n={top:o.top+o.height+this.options.offset,left:o.left+o.width/2-l/2};break;case"s":n={top:o.top-a-this.options.offset,left:o.left+o.width/2-l/2};break;case"e":n={top:o.top+o.height/2-a/2,left:o.left-l-this.options.offset};break;case"w":n={top:o.top+o.height/2-a/2,left:o.left+o.width+this.options.offset}}2==f.length&&(n.left="w"==f.charAt(1)?o.left+o.width/2-15:o.left+o.width/2-l+15),s.css(n).addClass("tipsy-"+f),s.find(".tipsy-arrow")[0].className="tipsy-arrow tipsy-arrow-"+f.charAt(0),this.options.className&&s.addClass(i(this.options.className,this.$element[0])),this.options.fade?s.stop().css({opacity:0,display:"block",visibility:"visible"}).animate({opacity:this.options.opacity}):s.css({visibility:"visible",opacity:this.options.opacity})}},hide:function(){this.options.fade?this.tip().stop().fadeOut(function(){t(this).remove()}):this.tip().remove()},fixTitle:function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("original-title"))&&t.attr("original-title",t.attr("title")||"").removeAttr("title")},getTitle:function(){var t,i=this.$element,e=this.options;this.fixTitle();var t,e=this.options;return"string"==typeof e.title?t=i.attr("title"==e.title?"original-title":e.title):"function"==typeof e.title&&(t=e.title.call(i[0])),t=(""+t).replace(/(^\s*|\s*$)/,""),t||e.fallback},tip:function(){return this.$tip||(this.$tip=t('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'),this.$tip.data("tipsy-pointee",this.$element[0])),this.$tip},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled}},t.fn.tipsy=function(i){function e(e){var n=t.data(e,"tipsy");return n||(n=new s(e,t.fn.tipsy.elementOptions(e,i)),t.data(e,"tipsy",n)),n}function n(){var t=e(this);t.hoverState="in",0==i.delayIn?t.show():(t.fixTitle(),setTimeout(function(){"in"==t.hoverState&&t.show()},i.delayIn))}function o(){var t=e(this);t.hoverState="out",0==i.delayOut?t.hide():setTimeout(function(){"out"==t.hoverState&&t.hide()},i.delayOut)}if(i===!0)return this.data("tipsy");if("string"==typeof i){var l=this.data("tipsy");return l&&l[i](),this}if(i=t.extend({},t.fn.tipsy.defaults,i),i.live||this.each(function(){e(this)}),"manual"!=i.trigger){var a=i.live?"live":"bind",f="hover"==i.trigger?"mouseenter":"focus",h="hover"==i.trigger?"mouseleave":"blur";this[a](f,n)[a](h,o)}return this},t.fn.tipsy.defaults={className:null,delayIn:0,delayOut:0,fade:!1,fallback:"",gravity:"n",html:!1,live:!1,offset:0,opacity:.8,title:"title",trigger:"hover"},t.fn.tipsy.revalidate=function(){t(".tipsy").each(function(){var i=t.data(this,"tipsy-pointee");i&&e(i)||t(this).remove()})},t.fn.tipsy.elementOptions=function(i,e){return t.metadata?t.extend({},e,t(i).metadata()):e},t.fn.tipsy.autoNS=function(){return t(this).offset().top>t(document).scrollTop()+t(window).height()/2?"s":"n"},t.fn.tipsy.autoWE=function(){return t(this).offset().left>t(document).scrollLeft()+t(window).width()/2?"e":"w"},t.fn.tipsy.autoBounds=function(i,e){return function(){var s={ns:e[0],ew:e.length>1?e[1]:!1},n=t(document).scrollTop()+i,o=t(document).scrollLeft()+i,l=t(this);return l.offset().top<n&&(s.ns="n"),l.offset().left<o&&(s.ew="w"),t(window).width()+t(document).scrollLeft()-l.offset().left<i&&(s.ew="e"),t(window).height()+t(document).scrollTop()-l.offset().top<i&&(s.ns="s"),s.ns+(s.ew?s.ew:"")}}}($);

$(function () {
    var bottomBar = '' +
        '    <iframe width="100%" height="42px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"' +
        '      style="position: fixed;bottom: 0;z-index:999999;"' +
        '      srcdoc=\'' +
        '      <style>.bottom-bar {position: fixed;bottom: 0;width: 100%;}</style>' +
        '      <link href="http://cdn.bootcss.com/uikit/2.23.0/css/uikit.almost-flat.css" rel="stylesheet">' +
        '      <script src="http://cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>' +
        '      <script src="http://cdn.bootcss.com/uikit/2.23.0/js/uikit.min.js"></script>' +
        '      <div class="uk-grid">' +
        '      <div class="uk-navbar bottom-bar">' +
        '        <div class="uk-width-1-1">' +
        '          <ul class="uk-navbar-nav">' +
        '            <li>' +
        '              <a><i class="uk-icon-home uk-icon-small"></i> 二手房</a>' +
        '            </li>' +
        '            <li>' +
        '              <a>' +
        '                <i class="uk-icon-gift uk-icon-small"></i> 好礼送不停' +
        '              </a>' +
        '            </li>' +
        '            <li>' +
        '              <a>' +
        '                <i class="uk-icon-thumbs-o-up uk-icon-small"></i> 推荐房源' +
        '              </a>' +
        '            </li>' +
        '          </ul>' +
        '          <div class="uk-navbar-flip">' +
        '            <ul class="uk-navbar-nav">' +
        '              <li>' +
        '                <a>' +
        '                  <i class="uk-icon-wechat uk-icon-small"></i> 关注微信' +
        '                </a>' +
        '              </li>' +
        '              <li>' +
        '                <a>' +
        '                  <i class="uk-icon-wechat uk-icon-small"></i> 关注微博' +
        '                </a>' +
        '              </li>' +
        '            </ul>' +
        '          </div>' +
        '        </div>' +
        '      </div></div>\'></iframe>';


    $('body').append(bottomBar);

    $('.pic-panel').attr('title', '安托万德圣埃克苏佩里（AntoinedeSaint-Exupéry，1900-1944）<br />法国文学史上最神奇的作家（他同时是个飞行员，参加过两次世界大战），与伏尔泰、卢梭、雨果同入先贤祠。其经典代表作《小王子》问世后获得一致好评，全球销量超过2亿册，被誉为"人类有史以来最佳读物"。1975年，在土木小行星带发现的一颗小行星以圣埃克苏佩里命名；1993年，另一颗小行星被命名为B-612星球，这正是小王子所居住的星球；1994年，法国政府将他和小王子的形象印到了面额为五十法郎的新钞票上；2006年，法国为《小王子》过了60大寿，向全世界宣布：《小王子》满60岁了！')
    .tipsy({gravity: 'w', opacity: 1, html: true, offset: 6});


})
