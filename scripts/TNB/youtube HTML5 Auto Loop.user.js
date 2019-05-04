// ==UserScript==
// @name           youtube HTML5 Auto Loop
// @namespace      youtube HTML5 Auto Loop
// @grant          none
// @description    youtube再生時に自動ループする
// @author         TNB
// @match          https://www.youtube.com/*
// @version        1.4.5
// @run-at         document-start
// ==/UserScript==

'use strict';

const loop_off = {
  when_enable_next_video_autoplay: false,
  when_playlist: false,
  with_embedded_video: false
};

const YoutubeHTML5AutoLoop = {
  loop: true,
  clickEventCache: false,
  init: function() {
    this.addListener();
    this.initLoop();
  },
  isLoop: function() {
    const ele = {
      when_enable_next_video_autoplay: '#improved-toggle[aria-pressed="true"]',
      when_playlist: '#playlist:not([hidden])',
      with_embedded_video: 'html[data-cast-api-enabled]'
    };
    for (let i in loop_off) {
      const target = document.querySelector(ele[i]);
      if (loop_off[i]) {
        if (i == 'when_enable_next_video_autoplay') {
          const toggle = document.querySelector('#improved-toggle');
          if (toggle) toggle.addEventListener('click', this, false);
        }
        if (target) return false;
      }
    }
    return true;
  },
  initLoop: function() {
    this.loop = this.isLoop();
    this.loopOn();
  },
  loopOn: function() {
    const video = document.querySelector('#movie_player video');
    console.log(video)
    if (video) {
      if (this.loop) {
        video.setAttribute('loop', '');
      } else {
        video.removeAttribute('loop');
      }
    }
  },
  loopToggle: function() {
    this.loop = this.loop? false: true;
    this.loopOn();
  },
  loopDisplay: function() {
    const video = document.querySelector('video:hover');
    if (video) {
      const checkBox = document.querySelector('.ytp-contextmenu [aria-checked]');
      if (checkBox) {
        checkBox.setAttribute('aria-checked', this.loop);
        if (!this.clickEventCache) {
          checkBox.addEventListener('click', this, false);
          this.clickEventCache = true;
        }
      }
    }
  },
  watchAjax: function() {
    const mm = new MutationObserver(() => {
      const video = document.querySelector('#movie_player video');
      if (video) {
        const mo = new MutationObserver(() => {
          this.initLoop();
        });
        mo.observe(video, {attributes: true, attributeFilter: ['src']});
        mm.disconnect();
        this.initLoop();
      }
    });
    mm.observe(document.body, {childList: true, subtree: true});
  },
  addListener: function() {
    window.addEventListener('DOMContentLoaded', this, false);
    window.addEventListener('contextmenu', this, false);
  },
  handleEvent: function(e) {
    switch (e.type) {
      case 'DOMContentLoaded':
        this.watchAjax();
        break;
      case 'contextmenu':
        this.loopDisplay();
        break;
      case 'click':
        this.loopToggle();
        break;
    }
  }
};

YoutubeHTML5AutoLoop.init();
