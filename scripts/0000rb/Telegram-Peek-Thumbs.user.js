// ==UserScript==
// @name         Telegram-Peek-Thumbs
// @version      0.1
// @description  Hides all thumbnails in Telegram Web by default, peek on mouseover, show on click
// @author       You
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        https://web.telegram.org/*
// @namespace https://greasyfork.org/users/177857
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
  /* jshint esnext: false */
  /* jshint esversion: 6 */
  function thumbMouseOver(event) {
    event.target.style.opacity = event.target.style.opacity == 0 ? 0.05 : event.target.style.opacity;
  }
  function thumbMouseOut(event) {
    event.target.style.opacity = event.target.style.opacity == 0.05 ? 0 : event.target.style.opacity;
  }
  function thumbClick(event) {
    event.target.style.opacity = event.target.style.opacity == 0.05 ? 1 : 0.05;
  }
  // for all mutations of the scrolling area look for new images and add the event listeners
  // the nsfw class is added to avoid getting the same element(s) more than once
  const wrapper = document.querySelector('div.im_history_scrollable_wrap');
  const observer = new MutationObserver(mutations => {
    const imgs = wrapper.querySelectorAll(':scope img.im_message_photo_thumb:not(.nsfw),'+
                                                 'img.img_gif_thumb:not(.nsfw),' +
                                                 'img.im_message_video_thumb:not(.nsfw),' +
                                                 'img.im_message_article_thumb:not(.nsfw)');
    imgs.forEach(img => {
      img.addEventListener('click', thumbClick);
      img.addEventListener('mouseover', thumbMouseOver);
      img.addEventListener('mouseout', thumbMouseOut);
      img.classList.add('nsfw');
      img.style.opacity = 0;
    });
  });
  const config = { attributes: true, childList: true, characterData: true };
  observer.observe(wrapper, config);

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */