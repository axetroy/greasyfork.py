// ==UserScript==
// @name         Smart Youtube Video Link Parser
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  parses the Youtube links within your web content and embeds the corresponding video player in your document. (plugin developed by firesoft.)
// @author       drakulaboy
// @include      *torrentsmd.*/forum.php?action=viewtopic&topicid=*
// @include      *torrentsmd.*/details.php?id=*
// @grant        GM_addStyle
// @require     http://code.jquery.com/jquery-2.1.1.js
// ==/UserScript==
!function(t){t.fn.ytLinksParseToImage=function(e){var r=t.extend({width:480,height:270,darken:!0,zoom:!0},e),n="yt-links-parser-thumbnail";return r.darken&&(n+=" yt-links-parser-darken"),r.zoom&&(n+=" yt-links-parser-zoom"),r.replaceHtml='<div class="yt-links-parser-container" data-yt-code="##CODE##" style="width:##WIDTH##px;height:##HEIGHT##px"><div class="'+n+'" style="background-image:url(\'https://i.ytimg.com/vi/##CODE##/hqdefault.jpg\');width:##WIDTH##px;height:##HEIGHT##px"></div><div class="yt-links-parser-play"></div></div>',this.ytLinksParse(r).find(".yt-links-parser-container").off("click.play").on("click.play",function(){var t=jQuery(this),e=t.width(),r=t.height(),n=t.attr("data-yt-code");return t.replaceWith('<iframe width="'+e+'" height="'+r+'" src="https://www.youtube.com/embed/'+n+'?autoplay=1" frameborder="0" allowfullscreen></iframe>'),!1})},t.fn.ytLinksParse=function(e){function r(t,e){var r=e.width?e.width:p.width,n=e.height?e.height:p.height;return p.replaceHtml.replace(/##WIDTH##/g,r).replace(/##HEIGHT##/g,n).replace(/##CODE##/g,t)}function n(t){for(var e=0;e<g.length;e++)if(t.substring(0,g[e].length)==g[e])return!0;return!1}function i(t,e,n){for(var i="",a=0,h=0;h<t.length;h++){var l=t[h];i+=e.slice(a,l.offset)+r(l.videoCode,n),a=l.offset+l.length}return i+=e.slice(a,e.length)}function a(t){var e=t.split("/");return e.length<2?"":e[0]}function h(t){var e=a(t=l(t));if(t=s(t,e),!e||!t)return"";if("youtu.be"==e.replace("www.",""))return u(t);var r=t.split("/");return r.length>1?o(r):"watch"==(r=t.split("?"))[0]&&r.length>1?c(r):""}function l(t){return t.replace(/(https?:)?\/\//i,"")}function s(t,e){return t=t.replace(e+"/","")}function u(t){return(t=t.split("?"))[0]}function o(t){return(t[0]="v")?(t=t[1].split("?"))[0]:""}function c(t){t=t[1].split("&");for(var e=0;e<t.length;e++){var r=t[e].split("=");if(2==r.length&&"v"==r[0])return r[1]}return""}function f(t){return-1!=t.charAt(t.length-1).search(/'|"|<|\s/g)&&(t=t.substr(0,t.length-1)),t}function d(t){var e={};return t.data("yt-width")&&(e.width=parseInt(t.data("yt-width"))),t.data("yt-height")&&(e.height=parseInt(t.data("yt-height"))),e}var p=t.extend({width:480,height:270,replaceHtml:'<iframe width="##WIDTH##" height="##HEIGHT##" src="https://www.youtube.com/embed/##CODE##" frameborder="0" allowfullscreen></iframe>'},e),g=["src=","value=","href="];return this.toArray().reverse().reduce(function(e,r){for(var a=t(r),l=d(a),s=a.html(),u=/(href=['"]?|src=['"]?|value=['"]?)?((https?:)?\/\/){0,1}(www.youtube.com|youtu.be)\/(.+?)('|"|<|\s|$)/gi,o=[],c=!0;c=u.exec(s);){var p=f(c[0]);if(!n(p)){var g=h(p);g&&o.push({videoCode:g,offset:c.index,length:p.length})}}return s=i(o,s,l),a.html(s),e.add(a)},t())}}(jQuery);

(function() {
    'use strict';
$('a[href*="youtu"]').ytLinksParseToImage();

(function() {var css = [".yt-links-parser-container {",
"    position: relative;",
"    display: inline-block;",
"    overflow: hidden",
"}",
"",
".yt-links-parser-thumbnail {",
"    display: inline-block;",
"    background-repeat: no-repeat;",
"    background-position: center;",
"    background-size: cover;",
"    max-width: 100%;",
"    max-height: 100%;",
"    transition: .4s;",
"}",
"",
".yt-links-parser-container:hover .yt-links-parser-thumbnail {",
"    transition: .4s;",
"}",
"",
".yt-links-parser-darken {",
"    filter: brightness(85%);",
"}",
"",
".yt-links-parser-container:hover .yt-links-parser-zoom {",
"    transform: scale(1.1);",
"}",
"",
".yt-links-parser-container:hover .yt-links-parser-darken {",
"    filter: brightness(100%);",
"}",
"",
".yt-links-parser-play {",
"    background: url('./yt_play.png') no-repeat center;",
"    position: absolute;",
"    width: 100%;",
"    height: 100%;",
"    left: 0;",
"    top: 0;",
"    cursor: pointer;",
"    filter: grayscale(100%);",
"    transition: .4s;",
"}",
"",
".yt-links-parser-container:hover .yt-links-parser-play {",
"    filter: grayscale(0);",
"    transition: .4s;",
"}"
].join("\n");
if (typeof GM_addStyle != 'undefined') {
 GM_addStyle(css);
 } else if (typeof PRO_addStyle != 'undefined') {
 PRO_addStyle(css);
 } else if (typeof addStyle != 'undefined') {
 addStyle(css);
 } else {
 var node = document.createElement('style');
 node.type = 'text/css';
 node.appendChild(document.createTextNode(css));
 var heads = document.getElementsByTagName('head');
 if (heads.length > 0) { heads[0].appendChild(node);
 } else {
 // no head yet, stick it whereever
 document.documentElement.appendChild(node);
 }
}})
    ();
})();