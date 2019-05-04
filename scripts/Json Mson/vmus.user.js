// ==UserScript==
// @name        vmus
// @namespace   http://www.vmus.co
// @include     http://vmus.co
// @include     http://*.vmus.co
// @include     http://vmus.co/*/
// @include     http://*.vmus.co/*/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @run-at      document-start
// @version     0.2
// @grant       none
// @description Cleanup ads in vmus.co video website (best to combine with openload script)
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function () {    
  $('head').find('script').remove();
  $('head').find('meta').remove();
  $('link[rel*="dns-prefetch"]').remove();
  $('script[src*="aralego"]').remove();
  $('script[src*="bam.nr"]').remove();
  $('script[src*="popunder"]').remove();
  $('script[src*="addthis"]').remove();
  $('script[src*="googlead"]').remove();
  $('script[src*="newrelic"]').remove();
  $('script[src*="cloudflare"]').remove();
  $('script[src*="connect.facebook.net"]').remove();
  $('script[src*="https://js-agent.newrelic.com"]').remove();
  $('script[src*="www.google-analytics.com"]').remove();
  $('script[src*="hm.baidu.com"]').remove();
  $('script[src*="wp-emoji-release.min.js"]').remove();
  
  $('#sfoverlay_up').remove();
  $('#btn_close_up').remove();
  $('#sf_popup').remove();
  
  $('#header-wrap').remove();
  $('#navi-wrap').remove();
  $('#text-4').remove();
  $('#text-6').remove();
  $('#text-7').remove();
  $('#text-8').remove();
  $('#text-18').remove();
  $('#text-12').remove();
  $('#sidebar').remove();
  $('#footer-wrap').remove();
  
  $('#comments').remove();
  $('.scupioadslot').remove();
  $('.comment_notes').remove();
  $('.postinfo').find('iframe').remove();
  $('.entry p, .comment p, .type-post, .type-page, .type-attachment').css('text-align', 'center');
  $('.postinfo').find('p').remove();
  $('div.postmeta').remove();
  $('#wrapper').css('width', '100%');
  $('#wrap').css('width', '100%');
  $('#content').css('width', '100%');
  $('.at-above-post').remove();
  $('iframe.ucfad').remove();
  $('.entry').find('hr').remove();
  
  // preset login
  $('#rememberme').prop('checked', true);
  var login = $('.entry div:eq(0)').text().replace(/[^0-9]/g, '');
  var login_number = login.substr(login.length - 2);
  $('#user_login').val('vm' + login_number);
  $('#user_pass').val('vm' + login_number);
  
  // remove spam video (never working or very low quality)
  var rapidvideo = $('iframe[src*="rapidvideo"]');
  rapidvideo.parents('p').remove();
  
  // remove spam video (never working or very low quality)
  var vidlox = $('iframe[src*="vidlox"]');
  vidlox.parents('p').remove();
  
  setTimeout(function () {
    $('head').find('script').remove();
  }, 6000);
});