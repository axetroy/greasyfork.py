// ==UserScript==
// @name        Disable YouTube Video Ads
// @namespace   DisableYouTubeVideoAds
// @description Disable YouTube video based ads right before or in the middle of the main video playback
// @version     1.0.3
// @author      jcunews
// @include     https://www.youtube.com/*
// @grant       unsafeWindow
// @run-at      document-start
// ==/UserScript==

unsafeWindow.XMLHttpRequest.prototype.open_dyva = unsafeWindow.XMLHttpRequest.prototype.open;
unsafeWindow.XMLHttpRequest.prototype.open = function(mtd, url) {
  var a = url.match(/^(.*?get_midroll_info)/);
  if (a) {
    url = a[1];
  }
  return this.open_dyva.apply(this, arguments);
};

function patchPlayerArgs(args) {
  if (args.ad_device) {
    args.ad_device = "0";
  }
  if (args.ad_flags) {
    args.ad_flags = 0;
  }
  if (args.ad_logging_flag) {
    args.ad_logging_flag = "0";
  }
  if (args.ad_preroll) {
    args.ad_preroll = "0";
  }
  if (args.ad_slots) {
    delete args.ad_slots;
  }
  if (args.ad_tag) {
    delete args.ad_tag;
  }
  if (args.ad3_module) {
    args.ad3_module = "0";
  }
  if (args.adsense_video_doc_id) {
    delete args.adsense_video_doc_id;
  }
  if (args.afv) {
    args.afv = false;
  }
  if (args.afv_ad_tag) {
    delete args.afv_ad_tag;
  }
  if (args.allow_html5_ads) {
    args.allow_html5_ads = 0;
  }
  if (args.csi_page_type) {
    args.csi_page_type = args.csi_page_type.replace(/watch7ad/, "watch7");
  }
  if (args.enable_csi) {
    args.enable_csi = "0";
  }
  if (args.pyv_ad_channel) {
    delete args.pyv_ad_channel;
  }
  if (args.show_pyv_in_related) {
    args.show_pyv_in_related = false;
  }
  if (args.vmap) {
    delete args.vmap;
  }
}

function do2() {
  if (unsafeWindow.ytplayer && unsafeWindow.ytplayer.config && unsafeWindow.ytplayer.config.args && !unsafeWindow.ytplayer.config.args.dvya) {
    unsafeWindow.ytplayer.config.args.dvya = 1;
    patchPlayerArgs(unsafeWindow.ytplayer.config.args);
  } else setTimeout(do2, 50);
}

(function do1() {
  if (unsafeWindow.yt && unsafeWindow.yt.player && unsafeWindow.yt.player.Application && unsafeWindow.yt.player.Application.create && !unsafeWindow.yt.player.Application.dyva) {
    unsafeWindow.yt.player.Application.dyva = 1;
    var ytPlayerApplicationCreate = unsafeWindow.yt.player.Application.create;
    unsafeWindow.yt.player.Application.create = function(id, ytPlayerConfig){
      if ((id === "player-api") && ytPlayerConfig && ytPlayerConfig.args && ytPlayerConfig.args.vmap) {
        delete ytPlayerConfig.args.vmap;
      }
      return ytPlayerApplicationCreate.apply(this, arguments);
    };
    var ytSetConfig = unsafeWindow.yt.setConfig;
    unsafeWindow.yt.setConfig = function(ytConfig){
      if (ytConfig) {
        if (ytConfig.ADS_DATA) {
          delete ytConfig.ADS_DATA;
        }
      }
      return ytSetConfig.apply(this, arguments);
    };
    var ytcfgSet = unsafeWindow.ytcfg.set;
    unsafeWindow.ytcfg.set = function(ytConfig){
      if (ytConfig) {
        if (ytConfig.SKIP_RELATED_ADS === false) {
          ytConfig.SKIP_RELATED_ADS = true;
        }
        if (ytConfig.TIMING_ACTION) {
          ytConfig.TIMING_ACTION = ytConfig.TIMING_ACTION.replace(/watch7ad/, "watch7");
        }
        if (ytConfig.TIMING_INFO) {
          if (ytConfig.TIMING_INFO.yt_ad) {
            ytConfig.TIMING_INFO.yt_ad = 0;
          }
          if (ytConfig.TIMING_INFO.yt_ad_an) {
            delete ytConfig.TIMING_INFO.yt_ad_an;
          }
          if (ytConfig.TIMING_INFO.yt_ad_pr) {
            ytConfig.TIMING_INFO.yt_ad_pr = 0;
          }
        }
      }
      return ytcfgSet.apply(this, arguments);
    };
    do2();
  } else setTimeout(do1, 50);
})();

addEventListener("spfpartprocess", function(ev) { //old youtube
  if (ev.detail && ev.detail.part && ev.detail.part.data &&
      ev.detail.part.data.swfcfg && ev.detail.part.data.swfcfg.args) {
    patchPlayerArgs(ev.detail.part.data.swfcfg.args);
  }
}, true);
