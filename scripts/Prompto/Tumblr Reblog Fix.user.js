// ==UserScript==
// @name        Tumblr Reblog Fix
// @namespace   http://wolfspirals.tumblr.com/
// @description Fixes reblogs
// @include     *://www.tumblr.com/*
// @include     *://www.tumblr.com/drafts
// @include     *://www.tumblr.com/blog/*/drafts
// @include     *://www.tumblr.com/queue
// @include     *://www.tumblr.com/blog/*/queue
// @include     *://www.tumblr.com/edit/*
// @version     1
// @grant       none
// ==/UserScript==
(function () {
  // insertionQuery v1.0.0 (2015-07-15) 
  // license:MIT 
  // naugtur <naugtur@gmail.com> (http://naugtur.pl/) 
  var insertionQ=function(){"use strict";function a(a,b){var d,e="insQ_"+g++,f=function(a){(a.animationName===e||a[i]===e)&&(c(a.target)||b(a.target))};d=document.createElement("style"),d.innerHTML="@"+j+"keyframes "+e+" {  from {  outline: 1px solid transparent  } to {  outline: 0px solid transparent }  }\n"+a+" { animation-duration: 0.001s; animation-name: "+e+"; "+j+"animation-duration: 0.001s; "+j+"animation-name: "+e+";  } ",document.head.appendChild(d);var h=setTimeout(function(){document.addEventListener("animationstart",f,!1),document.addEventListener("MSAnimationStart",f,!1),document.addEventListener("webkitAnimationStart",f,!1)},n.timeout);return{destroy:function(){clearTimeout(h),d&&(document.head.removeChild(d),d=null),document.removeEventListener("animationstart",f),document.removeEventListener("MSAnimationStart",f),document.removeEventListener("webkitAnimationStart",f)}}}function b(a){a.QinsQ=!0}function c(a){return n.strictlyNew&&a.QinsQ===!0}function d(a){return c(a.parentNode)?a:d(a.parentNode)}function e(a){for(b(a),a=a.firstChild;a;a=a.nextSibling)void 0!==a&&1===a.nodeType&&e(a)}function f(f,g){var h=[],i=function(){var a;return function(){clearTimeout(a),a=setTimeout(function(){h.forEach(e),g(h),h=[]},10)}}();return a(f,function(a){if(!c(a)){b(a);var e=d(a);h.indexOf(e)<0&&h.push(e),i()}})}var g=100,h=!1,i="animationName",j="",k="Webkit Moz O ms Khtml".split(" "),l="",m=document.createElement("div"),n={strictlyNew:!0,timeout:20};if(m.style.animationName&&(h=!0),h===!1)for(var o=0;o<k.length;o++)if(void 0!==m.style[k[o]+"AnimationName"]){l=k[o],i=l+"AnimationName",j="-"+l.toLowerCase()+"-",h=!0;break}var p=function(b){return h&&b.match(/[^{}]/)?(n.strictlyNew&&e(document.body),{every:function(c){return a(b,c)},summary:function(a){return f(b,a)}}):!1};return p.config=function(a){for(var b in a)a.hasOwnProperty(b)&&(n[b]=a[b])},p}();"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=insertionQ);
 
  jQuery(document).ready(function () {
    if (jQuery('.post-reblog-tree').length > 0) {
      jQuery('.post-reblog-tree').each(function (i, v) {
        processPostForm(v);
      });
    }
    insertionQ('.post-reblog-tree').every(function (v) {
      processPostForm(v);
    });
  });
  function processPostForm(reblogs) {
    jQuery('.caption-field .editor').html(jQuery('.post-reblog-tree .reblog-tree').html()).append;
    jQuery('.remove-button').click();
  }
}) ();