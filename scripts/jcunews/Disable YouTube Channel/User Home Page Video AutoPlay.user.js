// ==UserScript==
// @name        Disable YouTube Channel/User Home Page Video AutoPlay
// @namespace   DisableYouTubeChannelUserHomePageVideoAutoPlay
// @description Disable the video autoplay at YouTube channel/user home page
// @version     1.0.8
// @license     GNU AGPLv3
// @author      jcunews
// @match       https://www.youtube.com/*
// @grant       none
// @run-at      document-start
// ==/UserScript==

(function(listen, shldAutoplay, updPlayer, create) {
  (function check() {
    if (!listen && document.body) {
      if (!document.body.id) { //new youtube
        if (window.nav) {
          listen = document.querySelector("yt-player-manager").constructor.prototype;
          shldAutoplay = listen.shouldAutoplay_;
          listen.shouldAutoplay_ = function(config) {
            if (config && config.args && (/^\/(channel|user)\//).test(config.args.loaderUrl)) {
              config.args.autoplay = "0";
              return false;
            }
            return shldAutoplay.apply(this, arguments);
          };
          updPlayer = nav.updatePlayer_;
          nav.updatePlayer_ = function(config) {
            if (config && config.args && (/^\/(channel|user)\//).test(config.args.loaderUrl)) {
              config.args.autoplay = "0";
              config.args.external_play_video = "0";
              return;
            }
            return updPlayer.apply(this, arguments);
          };
        }
      } else { //old youtube
        listen = 1;
        addEventListener("spfpartprocess", function(ev) { //old youtube
          if ((ev = ev.detail) && (ev = ev.part) && (ev = ev.data) && (ev = ev.swfcfg) &&
            (ev = ev.args) && (/^\/(channel|user)\//).test(ev.loaderUrl)) {
            ev.autoplay = "0";
          }
        });
      }
    }
    if (window.yt && yt.player && yt.player.Application && yt.player.Application.create && !create) {
      create = yt.player.Application.create;
      yt.player.Application.create = function(player, config) {
        if (player.id) config.args.autoplay = "0";
        return create.apply(this, arguments);
      };
    } else setTimeout(check, 50);
  })();
})();
