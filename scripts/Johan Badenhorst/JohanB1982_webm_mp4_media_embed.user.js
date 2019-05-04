// ==UserScript==
// @name         JohanB1982_webm_mp4_media_embed
// @namespace    https://greasyfork.org/en/scripts/32558-johanb1982-webm-mp4-media-embed
// @version      0.0.04
// @date         2017-08-23
// @author       JohanB1982 (https://greasyfork.org/en/users/126569-johan-badenhorst)
// @description  replaces links to .webm & .mp4 content with embedded video
// @homepage     https://greasyfork.org/en/users/126569-johan-badenhorst
// @match        http://*/*
// @match        https://*/*
// @match        http://hkgalden.com/*
// @match        *://changecollective-production.s3.amazonaws.com/*
// @include      *://*
// @include      *://*/*
// @include      http://*
// @include      http://*/*
// @include      https://*
// @include      https://*/*
// @include      http://hkgalden.com/*
// @include      *://changecollective-production.s3.amazonaws.com/*
// @include      *
// @run-at       document-end
// @grant        GM_listValues
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// @grant        GM_info
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_notification
// @grant        GM_download
// @connect      vk.com
// @connect      vk.me
// @connect      userapi.com
// @connect      vk-cdn.net
// @connect      youtube.com
// @connect      youtube-nocookie.com
// @connect      ytimg.com
// @connect      googlevideo.com
// @connect      video.google.com
// @connect      google-analytics.com
// @connect      dailymotion.com
// @connect      vimeo.com
// @connect      vimeocdn.com
// @connect      odnoklassniki.ru
// @connect      ok.ru
// @connect      cdn-ok.com
// @connect      mycdn.me
// @connect      pladform.ru
// @connect      clipyou.ru
// @connect      soundcloud.com
// @connect      sndcdn.com
// @connect      mail.ru
// @connect      cdninstagram.com
// @connect      fbcdn.net
// @connect      facebook.com
// @connect      sf-helper.com
// @connect      thetrafficstat.net
// @connect      travelbar.tools
// @connect      savefrom.net
// @connect      self
// @connect      *
// ==/UserScript==
(function () {
  var page_links = document.links;
  for (var i = 0; i < page_links.length; i++) {
    if (page_links[i].href.match(/\.webm$/i)) {
      var span = document.createElement('div');
      var width = '640'
      var height = '480'
      code_str = ''
      code_str += ' <video \n'
      code_str += 'width="' + width + '" max-height="' + height + '" allowfullscreen controls>\n'
      code_str += '<source \n'
      code_str += 'src="' + page_links[i].href + '" type="video/webm" />\n'
      code_str += '</video>\n'
      span.innerHTML = code_str
      page_links[i].parentNode.insertBefore(span, page_links[i].nextSibling)
    } 
    else if (page_links[i].href.match(/\.mp4$/i)) {
      var span = document.createElement('div');
      var width = '640'
      var height = '480'
      code_str = ''
      code_str += ' <video \n'
      code_str += 'width="' + width + '" max-height="' + height + '" allowfullscreen controls>\n'
      code_str += '<source \n'
      code_str += 'src="' + page_links[i].href + '" type="video/mp4" />\n'
      code_str += '</video>\n'
      span.innerHTML = code_str
      page_links[i].parentNode.insertBefore(span, page_links[i].nextSibling)
    }
  }
}
) ();
