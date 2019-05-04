// ==UserScript==
// @name      BiliBili HTML5 Live
// @version   190217.4
// @description screw flash!
// @author    esterTion
// @match     http://live.bilibili.com/*
// @match     https://live.bilibili.com/*
// @require   https://static.hdslb.com/live-static/libs/jquery/jquery-1.11.3.min.js
// @require   https://cdn.bootcss.com/hls.js/0.6.21/hls.min.js
// @require   https://gitcdn.xyz/cdn/esterTion/live_html5_lib/067dad61e9de705e7171c332a75627328cabc3ae/google-style-loading.min.js
// @require   https://gitcdn.xyz/cdn/esterTion/live_html5_lib/6a39476b149bea7922c8311242979ec9e77fc276/mp4-lib.min.js
// @require   https://gitcdn.xyz/cdn/esterTion/live_html5_lib/f05ed7d09f4c3de3f6ad201846002687d4b02d5b/live_html5_pack.min.js
// @require   https://gitcdn.xyz/cdn/esterTion/live_html5_lib/c3c77fa197621a0560a9a9d16cbe8bf8d4d39bbb/flv.min.js
// @run-at    document-start
// @namespace https://greasyfork.org/users/24167
// @grant     unsafeWindow
// ==/UserScript==
/*
Original script: https://greasyfork.org/zh-CN/scripts/27239-bilibili-%E7%9B%B4%E6%92%AD-html5-%E6%92%AD%E6%94%BE%E5%99%A8
flv.js: https://github.com/bilibili/flv.js
ABPlayer-bilibili-ver: https://github.com/Zhuogu/ABPlayerHTML5-bilibili-ver
*/
/*global EmbedPlayer unsafeWindow flvjs ABP Hls dots $*/
function _(e, t, n) { var r = null; if ("text" === e) return document.createTextNode(t); r = document.createElement(e); for (var l in t) if ("style" === l) for (var a in t.style) r.style[a] = t.style[a]; else if ("className" === l) r.className = t[l]; else if ("event" === l) for (var a in t[l]) r.addEventListener(a, t[l][a]); else r.setAttribute(l, t[l]); if (n) for (var s = 0; s < n.length; s++)null != n[s] && r.appendChild(n[s]); return r }
if (!window.navigator.plugins['Shockwave Flash']) {
  //假装有flash
  Object.defineProperty(window.navigator, 'plugins', {
    value: {
      'Shockwave Flash': {},
      length: 1
    }
  });
}
var log = function () {
  var arg = [].slice.call(arguments);
  arg.splice(0, 0, '[Monkey_LivePlayer]');
  console.log.apply(console, arg);
};
var dispatchEvent = (function () {
  var dispatcher = function (event, data) {
    if (eventCallbackMap[event]) return eventCallbackMap[event](data);
    for (var i in unsafeWindow._playerEventMap) {
      if (unsafeWindow._playerEventMap[i].action == event) {
        eventCallbackMap[event] = unsafeWindow._playerEventMap[i].callback;
        break;
      }
    }
    return eventCallbackMap[event] ? eventCallbackMap[event](data) : false;
  };
  var eventCallbackMap = {};
  return dispatcher;
})();

unsafeWindow.player_fullwin = function (state) {
  dispatchEvent('webFullscreen', state);
};

var updateCSS = false, css, cssVer = '614fac427cb7cf3d1f8b7ce44f683708e188d0e2';
if (!localStorage.ABPlayer_css)
  updateCSS = true;
else {
  css = JSON.parse(localStorage.ABPlayer_css);
  if (css.ver != cssVer)
    updateCSS = true;
}
while (updateCSS) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://gitcdn.xyz/cdn/esterTion/live_html5_lib/' + cssVer + '/ABPlayer.min.css', false);
  xhr.send();
  if (xhr.status == 200 || xhr.status == 304)
    updateCSS = false;
  css = {
    ver: cssVer,
    data: xhr.response
  };
  localStorage.ABPlayer_css = JSON.stringify(css);
}
var style = document.createElement('style');
style.id = 'ABPlayer';
style.textContent = css.data;
document.head.appendChild(style);

var playerSettings = localStorage.getItem('LIVE_PLAYER_STATUS');
if (playerSettings != null) {
  var match = playerSettings.match('"type":"html5"');
  localStorage.LIVE_PLAYER_STATUS = playerSettings.replace('"type":"html5"', '"type":"flash"');
}
window.addEventListener('unload', function(){
  unloading = true;
  destroyPlayer();
});
var room_id,
  player = {
    flv: null,
    hls: null
  },
  flvplayer,
  abpinst = null,
  tryCount = 1,
  i_close_it_myself = false,
  df_domain = 'broadcastlv.chat.bilibili.com',
  //df_domain = 'tx.biliplus.com',
  df_portobj = {
    'ws': 7170,
    'wss': 7172
  },
  reconnecting = false,
  inited = false,
  living = true,
  rounding = false,
  unloading = false,
  restorePlayer = function () {
    living = false;
    rounding = true;
    if (abpinst != null) {
      destroyPlayer();
      abpinst.playerUnit.style.display = 'none';
      document.body.appendChild(abpinst.playerUnit);
    }
    unsafeWindow.EmbedPlayer.loader();
    var pop = dispatchEvent('receiveMessage', { cmd: 'SYS_MSG', msg: "[BHL]: 轮播状态，正在切回官方播放器" });
    setTimeout(function () { pop.close(); }, 3e3);
    setTimeout(function () {
      var playerSettings = localStorage.getItem('LIVE_PLAYER_STATUS');
      if (playerSettings != null) {
        var match = playerSettings.match('"type":"html5"');
        localStorage.LIVE_PLAYER_STATUS = playerSettings.replace('"type":"html5"', '"type":"flash"');
        log('默认播放器设置已重置');
      }
    }, 5e3);
  },
  init = function (room_id) {
    if (inited)
      return;
    inited = true;
    setInterval(function () {
      var flashPlayer = document.getElementById('swfobject_placeholder');
      if (flashPlayer != null) {
        abpinst && abpinst.playerUnit.parentNode == null && flashPlayer.parentNode.appendChild(abpinst.playerUnit);
        flashPlayer.remove();
        ["noticeGift","noticeGuard","showComments","sendGiftStatus","play","pause","sendDanmaku","sendGift","init","on","set","switchLine","getPlayerInfo","jwAddEventListener","jwRemoveEventListener","jwGetBuffer","jwGetDuration","jwGetFullscreen","jwGetHeight","jwGetMute","jwGetPlaylist","jwGetPlaylistIndex","jwGetPosition","jwGetState","jwGetWidth","jwGetVersion","jwGetVolume","jwPlay","jwPause","jwStop","jwSeek","jwLoad","jwPlaylistItem","jwPlaylistNext","jwPlaylistPrev","jwDockSetButton","jwSetMute","jwSetVolume","jwSetFullscreen","jwShowControlbar","jwHideControlbar","jwShowDock","jwHideDock","jwShowDisplay","jwHideDisplay","addControllerListener","addModelListener","addViewListener","removeControllerListener","removeModelListener","removeViewListener","getConfig","getPlaylist","getPluginConfig","loadPlugin","sendEvent","loadVideo"]
        .forEach(i => {
          flashPlayer[i] = function () {
            log('flash', i, arguments);
          }
        });
        flashPlayer.sendDanmaku = send_danmu;
        flashPlayer.getPlayerInfo = function () {
          return {
            "playingStatus": false,
            "playerStatus": 0,
            "type": 1,
            "quality": 4,
            "version": "PlayerEX2.2.6-f247ab44",
            "line": 0,
            "playerType": "flash",
            "guid": "C80F7AA5-B003-F1B3-8449-B857FCCAA515",
            "playurl": "http://61.164.142.134/live-bvc/158144/live_9617619_6384511.flv?expires=1526396357&ssig=Baw6hSUQIcvLtrn2k6i8fg&oi=983220655",
            "liveStatus": 1
          }
        }
        flashPlayer.on = function () {};
        log('Set flash callback');
        try{
          unsafeWindow.flash_on_ready_callback();
        }catch(e){}
      }
    }, 500);
    get_url_and_replace_player(room_id);
    click_list();
    function check(a) { return (a < 10) ? ('0' + a) : a; }
    var addTimeObserver = new MutationObserver(function (records) {
      var now = new Date;
      now = check(now.getMonth() + 1) + '-' + check(now.getDate()) + ' ' + check(now.getHours()) + ':' + check(now.getMinutes()) + ':' + check(now.getSeconds());
      records.forEach(function (i) {
        Array.from(i.addedNodes).forEach(function (i) {
          i.setAttribute('title', now);
        });
      });
    });
    addTimeObserver.observe(document.getElementById('chat-history-list'), {
      childList: true,
      attributes: false
    });
  },
  hlsSpeedMonitor = (function () {
    var prevBytes = 0, isLoading = false, loadingFrag = null;
    return {
      reset: function () {
        prevBytes = 0;
      },
      interval: setInterval(function () {
        if (player.hls == null) {
          prevBytes = 0;
          return;
        }
        var loadedBytes = prevBytes;
        prevBytes = 0;
        if (isLoading) {
          loadedBytes += loadingFrag.loaded;
          prevBytes = -loadingFrag.loaded;
        }
        player.hls.speed = loadedBytes / 1024;
      }, 1e3),
      loadStart: function (e, d) {
        isLoading = true;
        loadingFrag = d.frag;
      },
      loadEnd: function (e, d) {
        if (abpinst.video.readyState == 1) {
          log('playback jumped from ' + abpinst.video.currentTime.toFixed(2) + ' to ' + d.frag.start.toFixed(2));
          abpinst.video.currentTime = d.frag.start;
        }
        isLoading = false;
        loadingFrag = null;
        prevBytes += d.stats.loaded;
      },
    };
  })(),
  hlsBitrateMonitor = (function () {
    var pending = [];
    var levels = {};
    var currentLevel;
    return {
      reset: function () {
        levels = {};
        this.levels = levels;
      },
      levels: levels,
      levelChanging: function (n, d) {
        currentLevel = d.level;
        levels[currentLevel] = levels[currentLevel] || {
          bitrateMap: [],
          video: {
            timeScale: 0,
            samples: new AVLTree(),
            bitrateMap: []
          },
          audio: {
            timeScale: 0,
            samples: new AVLTree(),
            bitrateMap: []
          }
        };
        levels.current = levels[currentLevel];
      },
      interval: setInterval(function () {
        var workRanges = [];
        while (pending.length) {
          var data = pending.shift();
          var type = data.type;
          var buffer = data.data;
          var offset = 0;
          var levelData = levels[currentLevel][type];
          if (!levelData) continue;
          while (offset < buffer.length) {
            var box = boxInfo(buffer, offset);
            if (box.name == 'moov' || box.name == 'moof') {
              var moovData = {};
              parseMoov(moovData, buffer, 0, box.size);
              if (box.name == 'moof') {
                var samples = levelData.samples;
                var traf = moovData.moof[0].traf[0];
                var ts = traf.tfdt.baseMediaDecodeTime;
                var workRange = [type, Math.floor(ts / levelData.timeScale)];
                for (var i = 0; i < traf.trun.sampleCount; i++) {
                  if (!samples.contains(ts)) {
                    samples.insert(ts, traf.trun.sizes[i]);
                  }
                  i < traf.trun.sampleCount - 1 && (ts += traf.trun.durations[i]);
                }
                workRange.push(Math.ceil(ts / levelData.timeScale));
                workRanges.push(workRange);

                var bitrateHold = [];
                samples.range(
                  workRange[1] * levelData.timeScale,
                  workRange[2] * levelData.timeScale,
                  function (node) {
                    var ts = Math.floor(node.key / levelData.timeScale);
                    bitrateHold[ts] = bitrateHold[ts] || 0;
                    bitrateHold[ts] += node.data;
                  }
                )
                for (var i = workRange[1]; i < workRange[2]; i++) {
                  levelData.bitrateMap[i] = bitrateHold[i];
                }
              } else if (box.name == 'moov') {
                levelData.timeScale = moovData.moov[0].mvhd.timeScale;
              }
            }
            offset += box.size;
          }
        }
        workRanges.forEach(function (workRange) {
          for (var i = workRange[1]; i < workRange[2]; i++) {
            levels[currentLevel].bitrateMap[i] = (
              (levels[currentLevel].video.bitrateMap[i] || 0) +
              (levels[currentLevel].audio.bitrateMap[i] || 0)
            ) * 8 / 1000;
          }
        });
      }, 1e3),
      appending: function (n, e) {
        pending.push(e);
      }
    }
  })(),
  destroyPlayer = function () {
    if (player.hls != null) {
      player.hls.destroy();
      player.hls = null;
    }
    if (player.flv != null) {
      player.flv.unload();
      player.flv.destroy();
      player.flv = null;
    }
    hlsSpeedMonitor.reset();
  },
  createPlayer = {
    flv: function (url) {
      destroyPlayer();
      var video = document.querySelector('.ABP-Unit video');
      player.flv = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        url: url
      });
      player.flv.attachMediaElement(video);
      player.flv.load();
      flvplayer = player.flv;
      video.currentTime = 0;
      if (abpinst != null) {
        player.flv.on('error', function () {
          !unloading && setTimeout(function () {
            abpinst.createPopup('直播流意外中断', 3e3);
            changeSrc('', player.hls == null ? 'flv' : 'hls');
          }, 1e3);
        });
        video.dispatchEvent(new CustomEvent('autoplay'));
        var div = abpinst.playerUnit.querySelector('#info-box');
        if (div.style.opacity == 0) {
          div.style.opacity = 1;
        }
        div.childNodes[0].childNodes[0].innerHTML = '正在切换';
        dots.runTimer();
      }
    },
    hls: function (url) {
      destroyPlayer();
      var video = document.querySelector('.ABP-Unit video');
      player.hls = new Hls();
      player.hls.loadSource(url);
      player.hls.attachMedia(video);
      player.hls.on(Hls.Events.FRAG_LOADING, hlsSpeedMonitor.loadStart);
      player.hls.on(Hls.Events.FRAG_LOADED, hlsSpeedMonitor.loadEnd);
      player.hls.on(Hls.Events.BUFFER_APPENDING, hlsBitrateMonitor.appending);
      player.hls.on(Hls.Events.LEVEL_SWITCHING, hlsBitrateMonitor.levelChanging);
      hlsBitrateMonitor.reset();
      hlsBitrateMonitor.levelChanging('', { level: 0 });
      video.currentTime = 0;
      video.dispatchEvent(new CustomEvent('autoplay'));
      var div = abpinst.playerUnit.querySelector('#info-box');
      if (div.style.opacity == 0) {
        div.style.opacity = 1;
      }
      div.childNodes[0].childNodes[0].innerHTML = '正在切换';
      dots.runTimer();
    }
  },
  tryInterval,
  blockingGift = false,
  blockGiftClickListener = function () {
    if (this.classList.contains('on')) {
      blockingGift = false;
      this.className = 'btn block-gift';
    } else {
      blockingGift = true;
      this.className = 'btn block-gift on';
    }
    localStorage.BHL_blockGift = blockingGift;
  };
window.hlsBitrateMonitor = hlsBitrateMonitor;
unsafeWindow.hlsBitrateMonitor = hlsBitrateMonitor;
window.changeSrc = function (b, a) {
  switch (a) {
    case 'flv':
      $.ajax({
        url: '//api.live.bilibili.com/api/playurl?platform=web&otype=json&cid=' + room_id + '&_=' + Date.now(),
        type: 'GET',
        dataType: 'json',
        success: function (data) {
          createPlayer.flv(data.durl[0].url);
        }
      });
      break;
    case 'hls':
      $.ajax({
        url: '//api.live.bilibili.com/api/playurl?platform=h5&otype=json&cid=' + room_id + '&_=' + Date.now(),
        type: 'GET',
        dataType: 'json',
        success: function (data) {
          createPlayer.hls(data.data);
        }
      });
      break;
  }
};
unsafeWindow.player = player;
window.player = player;
(function () {
  var room_matcher = new RegExp('live\.bilibili\.com[\/a-zA-Z]+?(\\d+)(\\?.+)?$');
  if (room_matcher.test(location.href)) {
    var style = document.createElement('style');
    style.innerHTML = `
.treasure-box-ctnr{bottom:115px}
.block-gift{width:20px;height:20px;position:relative;--color:#999999;background:none !important;display:inline-block;vertical-align:top;margin-left:5px}
.block-gift:active{--color:#29ABE1}
.block-gift.on{--color:#29ABE1}
.block-gift.on:active{--color:#999999}
.block-gift .block-gift-inner{width:14px;height:14px;position:absolute;top:3px;left:3px}
.block-gift .block-gift-inner g{fill:var(--color)}
.block-gift .block-gift-border{width:20px;height:20px;position:absolute}
.block-gift .block-gift-border g{stroke:var(--color);fill:transparent}
.bp-no-flash-tips{display:none}
.live-room-app .app-content .app-body .player-and-aside-area .left-container .player-section{height:100% !important}
.player-full-win .gift-control-section{display:none}
`;
    document.head.appendChild(style);
    var blockGift = document.createElement('div');
    blockGift.className = 'btn block-gift';
    blockGift.setAttribute('title', '屏蔽礼物信息');
    blockGift.innerHTML = `
<!-- Source: http://www.iconninja.com/giftbox-outline-icon-849682 -->
<svg class="block-gift-inner" width="935.375px" height="935.375px" viewBox="0 0 935.375 935.375">
<g><path d="M362.189,34.821C325.89,8.479,287.582-3.011,248.316,0.67c-33.322,3.124-60.324,14.123-80.258,32.69 c-19.385,18.057-30.58,42.083-32.374,69.48c-2.367,36.164,12.378,75.592,40.456,108.175c0.492,0.571,0.996,1.132,1.496,1.698 H38.074v265.732h33.219v456.929h792.789V478.447h33.219V212.715H757.736c0.5-0.565,1.004-1.127,1.496-1.698 c28.078-32.583,42.824-72.012,40.457-108.175c-1.795-27.397-12.988-51.425-32.375-69.48 c-19.934-18.568-46.936-29.566-80.258-32.69c-39.266-3.68-77.574,7.809-113.873,34.15c-26.717,19.388-52.33,46.951-76.129,81.925 c-11.295,16.599-21.104,33.273-29.369,48.659c-8.264-15.386-18.072-32.06-29.368-48.659 C414.52,81.771,388.906,54.208,362.189,34.821z M106.074,300.771v-20.056h723.227v20.057v109.674h-33.219h-213.57h-229.65H139.293 h-33.219V300.771z M420.862,478.447h93.65v136.35l-46.825-21.688l-46.825,21.688V478.447z M227.654,166.627 c-16.294-18.909-25.309-41.093-24.114-59.343c0.649-9.924,4.306-18.055,10.867-24.167c8.567-7.98,22.488-13.079,40.257-14.745 c22.491-2.109,44.457,4.815,67.152,21.167c20.247,14.587,40.299,36.274,59.603,64.458c13.919,20.324,25.4,41.105,34.167,58.717 h-110.44C274.073,204.938,246.652,188.675,227.654,166.627z M796.08,867.375H139.293V478.447h213.569v242.787l114.825-53.187 l114.825,53.186V478.447h213.57v388.928H796.08z M553.273,155c19.369-28.464,39.504-50.382,59.85-65.145 c22.846-16.578,44.951-23.606,67.588-21.483c17.77,1.666,31.689,6.765,40.258,14.745c6.561,6.112,10.217,14.242,10.867,24.167 c1.193,18.25-7.82,40.435-24.115,59.343c-18.998,22.047-46.42,38.311-77.49,46.087H519.762 C528.361,195.442,539.605,175.085,553.273,155z"/></g>
</svg>

<svg class="block-gift-border" width="20px" height="20px">
<g>
  <circle cx=10 cy=10 r=9 />
  <path d="M3.5355,3.5355L16.4645,16.4645" style="stroke-width:2px" />
</g>
</svg>
`;
    blockGift.addEventListener('click', blockGiftClickListener);
    if (localStorage.BHL_blockGift === 'true') blockGift.click();
    var observer = new MutationObserver(function () {
      var btns = document.querySelector('.icon-left-part');
      if (btns != null && document.querySelector('#swfobject_placeholder [name="flashvars"]') != null) {
        observer.disconnect();
        btns.appendChild(blockGift);
        room_id = unsafeWindow.BilibiliLive.ROOMID;
        init(room_id);
      }/* else if (document.querySelector('.bp-no-flash-tips') != null) {
        var parent = document.querySelector('.bp-no-flash-tips').parentNode;
        document.querySelector('.bp-no-flash-tips').remove();
        parent.appendChild(_('object', { id: 'swfobject_placeholder' }, [_('param', {name: 'flashvars'})]));
      }*/
    });
    observer.observe(document, { childList: true, subtree: true });
  } else {
    tryInterval = setInterval(function () {
      if (tryCount > 20) {
        log('quiting');
        clearInterval(tryInterval);
        return;
      }
      log('finding', tryCount++);
      var link = document.querySelector('#swfobject_placeholder [name="flashvars"]');
      if (link == null)
        return;
      room_id = link.value.match(/cid=(.*?)&/)[1];
      clearInterval(tryInterval);
      log('found');
      init(room_id);
    }, 1000);
  }
})();

function get_url_and_replace_player(room_id) {
  $.ajax({
    url: '//live.bilibili.com/api/player?id=cid:' + room_id,
    type: 'GET',
    success: function (data) {
      try {
        var parser = new DOMParser();
        var xml = parser.parseFromString('<player>' + data + '</player>', 'text/xml');
        console.log(xml);
        var limit = (xml.getElementsByTagName('msg_length')[0] || {textContent:20}).textContent,
          state = xml.getElementsByTagName('state')[0].textContent;
        //$('#df-danmu-textbox,#danmu-textbox')[0].setAttribute('maxlength', (limit | 0) || 20);
        dispatchEvent('initDanmaku', { danmu_length: (limit | 0) || 20 });
        //$('.input-limit-hint')[0].textContent = 30;
        if (state == 'ROUND') {
          restorePlayer();
        } else if (state == 'PREPARING') {
          if (abpinst != null) {
            dots.stopTimer();
            abpinst.playerUnit.querySelector('#info-box .text-wrapper>div').innerHTML = '未在直播';
            destroyPlayer();
          }
          living = false;
        }

        df_domain = xml.getElementsByTagName('dm_server')[0].textContent;
        df_portobj.ws = xml.getElementsByTagName('dm_ws_port')[0].textContent | 0;
        df_portobj.wss = xml.getElementsByTagName('dm_wss_port')[0].textContent | 0;
        unsafeWindow.df_danmu_ws = new DanmuSocket(parseInt(room_id), df_domain, df_portobj);
        unsafeWindow.df_danmu_ws.setListener(danmuListener);
      } catch (e) {
        console.error('error processing player data: ', e.message);
      }
    }
  });
  var api_url = '//api.live.bilibili.com/api/playurl?platform=web&otype=json&cid=' + room_id;
  $.ajax({
    url: api_url,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      if (!living) return;
      replace_player(data.durl[0].url);
      if (unsafeWindow.df_danmu_ws !== undefined) {
        i_close_it_myself = true;
        unsafeWindow.df_danmu_ws.close();
        unsafeWindow.df_danmu_ws = undefined;
      }
    }
  });
  createABP();
}
function createABP() {
  var video = document.createElement('video');
  document.querySelector('#js-player-decorator').appendChild(video);
  var abpOptions = {
    scale: 0.8,
    opacity: 0.7,
    speed: 1,
    useCSS: false,
    autoOpacity: false
  };
  try {
    var settings = localStorage.html5Settings || '{}';
    settings = JSON.parse(settings);
    abpOptions.scale = settings.scale || 1;
    abpOptions.opacity = settings.opacity || 1;
    abpOptions.speed = settings.speed || 1;
    abpOptions.useCSS = settings.useCSS || false;
    abpOptions.autoOpacity = settings.autoOpacity || false;
  } catch (e) { }
  abpinst = ABP.create(document.getElementById('js-player-decorator'), {
    src: {
      playlist: [
        {
          video: video
        }
      ]
    },
    width: '100%',
    height: '100%',
    config: abpOptions
  });
  unsafeWindow.abpinst = abpinst;
  if (settings.commentVisible === false) {
    abpinst.btnDm.click();
  }
  dots.runTimer();
  abpinst.video.addEventListener('ended', function () {
    abpinst.createPopup('直播流意外结束', 3e3);
    changeSrc('', player.hls == null ? 'flv' : 'hls');
  });
}
function replace_player(flv_url) {
  var w = $('#js-player-decorator').width();
  var h = $('#js-player-decorator').height();
  flvjs.LoggingControl.enableVerbose = false;
  flvjs.LoggingControl.enableInfo = false;
  flvjs.LoggingControl.enableDebug = false;
  createPlayer.flv(flv_url);
  abpinst.playerUnit.querySelector('#info-box .text-wrapper>div').innerHTML = '正在加载视频信息';
  unsafeWindow.addEventListener('unload', destroyPlayer);
  [['flv', ''], ['hls', '']].forEach(function (i) {
    var div = document.createElement('div');
    div.setAttribute('changeto', JSON.stringify(i));
    //div.setAttribute('name',availableSrc[i][0]);
    if (i[0] == 'flv')
      div.className = 'on';
    div.appendChild(document.createTextNode(i[0]));
    abpinst.playerUnit.querySelector('.BiliPlus-Scale-Menu .Video-Defination').appendChild(div);
  });
}
function click_list() {
  if (unsafeWindow.location.pathname === '/') {
    $($('[role="list"]')[0]).children().on('click', function () {
      var room_id = $(this).attr('data-cid');
      get_url_and_replace_player(room_id);
    });
  }
}

var rawHeaderLen = 16;
var packetOffset = 0;
var headerOffset = 4;
var verOffset = 6;
var opOffset = 8;
var seqOffset = 12;
var pako = unsafeWindow.pako;
var textDecoder = getDecoder(true);
var textEncoder = getEncoder();
var heartbeatInterval;
function getDecoder(isUseful) {
  if (unsafeWindow['TextDecoder'] && isUseful) {
    return new unsafeWindow['TextDecoder']();
  } else {
    return {
      decode: (buf) => {
        return decodeURIComponent(unsafeWindow.escape(String.fromCharCode.apply(null, new Uint8Array(buf))));
      }
    };
  }
}
function getEncoder() {
  if (unsafeWindow['TextEncoder']) {
    return new unsafeWindow['TextEncoder']();
  } else {
    return {
      encode: (str) => {
        var buf = new ArrayBuffer(str.length);
        var bufView = new Uint8Array(buf);
        for (var i = 0, strlen = str.length; i < strlen; i++) {
          bufView[i] = str.charCodeAt(i);
        }
        return bufView;
      }
    };
  }
}
function mergeArrayBuffer(ab1, ab2) {
  var u81 = new Uint8Array(ab1),
    u82 = new Uint8Array(ab2),
    res = new Uint8Array(ab1.byteLength + ab2.byteLength);
  res.set(u81, 0);
  res.set(u82, ab1.byteLength);
  return res.buffer;
}
function DanmuSocket(roomid, domain, portobj) {
  var ws = 'wss';
  var port = portobj[ws];
  this.connection = new WebSocket(ws + '://' + domain + ':' + port + '/sub');
  this.connection.binaryType = 'arraybuffer';
  this.connection.onopen = this.firstConnection.bind(this);
  this.connection.onmessage = onMessage.bind(this);
  this.connection.onclose = onClose.bind(this);
  this.connection.onerror = onError.bind(this);
  this.roomid = roomid;
}
DanmuSocket.prototype.firstConnection = function () {
  reconnecting = false;
  log('Danmu WebSocket Server Connected.');
  log('Handshaking...');
  var token = JSON.stringify({
    'uid': unsafeWindow.BilibiliLive.UID || 0,
    'roomid': this.roomid
  });
  var headerBuf = new ArrayBuffer(rawHeaderLen);
  var headerView = new DataView(headerBuf, 0);
  var bodyBuf = textEncoder.encode(token);
  headerView.setInt32(packetOffset, rawHeaderLen + bodyBuf.byteLength);
  headerView.setInt16(headerOffset, rawHeaderLen);
  headerView.setInt16(verOffset, 1);
  headerView.setInt32(opOffset, 7);
  headerView.setInt32(seqOffset, 1);
  this.connection.send(mergeArrayBuffer(headerBuf, bodyBuf));
};
DanmuSocket.prototype.heartBeat = function () {
  var headerBuf = new ArrayBuffer(rawHeaderLen);
  var headerView = new DataView(headerBuf, 0);
  headerView.setInt32(packetOffset, rawHeaderLen);
  headerView.setInt16(headerOffset, rawHeaderLen);
  headerView.setInt16(verOffset, 1);
  headerView.setInt32(opOffset, 2);
  headerView.setInt32(seqOffset, 1);
  this.connection.send(headerBuf);
};
DanmuSocket.prototype.closeHeartBeat = function () {
  clearInterval(this.heartBeating);
};
DanmuSocket.prototype.send = function (data) {
  this.connection.send(data);
};
DanmuSocket.prototype.close = function () {
  this.connection.close();
};
DanmuSocket.prototype.setListener = function (listener) {
  this._listener = listener;
};
function onMessage(evt) {
  var data = evt.data;
  var dataView = new DataView(data, 0);
  var packetLen = dataView.getUint32(packetOffset);
  if (dataView.byteLength >= packetLen) {
    var headerLen = dataView.getInt16(headerOffset);
    var ver = dataView.getInt16(verOffset);
    var op = dataView.getUint32(opOffset);
    var seq = dataView.getUint32(seqOffset);
    switch (op) {
      case 8:
        this.heartBeat();
        heartbeatInterval = setInterval(this.heartBeat.bind(this), 30 * 1000);
        break;
      case 3:
        if (this._listener) this._listener('online', dataView.getInt32(16));
        break;
      case 5:
        var packetView = dataView;
        var msg = data;
        var msgBody;
        for (var offset = 0; offset < msg.byteLength; offset += packetLen) {
          packetLen = packetView.getUint32(offset);
          headerLen = packetView.getInt16(offset + headerOffset);
          msgBody = textDecoder.decode(msg.slice(offset + headerLen, offset + packetLen));
          if (!msgBody) {
            textDecoder = getDecoder(false);
            msgBody = textDecoder.decode(msg.slice(offset + headerLen, offset + packetLen));
          }
          if (this._listener) this._listener('msg', msgBody);
        }
        break;
    }
  }
}
function onClose() {
  reconnecting = false;
  if (heartbeatInterval) clearInterval(heartbeatInterval);
  if (!i_close_it_myself) {
    setTimeout(reConnect, 5000);
  }
  i_close_it_myself = false;
}
function onError() {
  reconnecting = false;
  log('Client Error.');
  setTimeout(reConnect, 5000);
}
function reConnect() {
  if (reconnecting) return;
  reconnecting = true;
  log('reconnecting socket...');
  unsafeWindow.df_danmu_ws = new DanmuSocket(parseInt(room_id), df_domain, df_portobj);
  unsafeWindow.df_danmu_ws.setListener(danmuListener);
}
unsafeWindow.ws_reConnect = reConnect;

function change_online(online) {
  dispatchEvent('receiveOnlineCount', online);
}
function emit_danmu(data) {
  if (data.cmd === 'DANMU_MSG') {
    abpinst.cmManager.send({
      text: data.info[1],
      mode: data.info[0][1],
      color: data.info[0][3],
      hash: data.info[0][7],
      size: data.info[0][2],
      border: (data.info[2][0] == unsafeWindow.BilibiliLive.UID)
    });
  }
}
/*oriServerCb = unsafeWindow.server_callback;
unsafeWindow.server_callback = function (data) {
  if ([
    'SEND_GIFT',
    'SYS_MSG',
    'SYS_GIFT',
    'WELCOME',
    'SPECIAL_GIFT',
    'SEND_TOP'
  ].indexOf(data.cmd) != -1 && blockingGift)
    return;
  oriServerCb(data);
};*/
function append_danmu(data) {
  switch (data.cmd) {
    case 'ROUND':
      log('进入轮播状态', data);
      restorePlayer();
      return;
    case 'CLOSE':
    case 'PREPARING':
    case 'END':
      log('直播结束', data);
      if (abpinst != null) {
        dots.stopTimer();
        destroyPlayer();
        abpinst.playerUnit.querySelector('#info-box').style.opacity = 1;
        abpinst.playerUnit.querySelector('#info-box .text-wrapper>div').innerHTML = '未在直播';
      }
      living = false;
      dispatchEvent('receiveMessage', data);
      break;
    case 'LIVE':
      log('开始直播', data);
      if (rounding) {
        EmbedPlayer.loader();
        document.getElementById('js-player-decorator').appendChild(abpinst.playerUnit);
        abpinst.playerUnit.style.display = '';
        rounding = false;
      }
      living = true;
      changeSrc(0, 'flv');
      break;
  }
  //if (!living) return;
  if ([
    'SEND_GIFT',
    'SYS_MSG',
    'SYS_GIFT',
    'WELCOME',
    'SPECIAL_GIFT',
    'SEND_TOP'
  ].indexOf(data.cmd) != -1 && blockingGift)
    return;
  if (data.cmd == 'DANMU_MSG' && data.info[2][0] == unsafeWindow.BilibiliLive.UID) return;
  dispatchEvent('receiveMessage', data);
}
function danmuListener(content_type, content) {
  if (content_type === 'online') {
    if (unsafeWindow.dom_changed === undefined) {
      $('#h5_player').prev().appendTo('#js-player-decorator');
      unsafeWindow.dom_changed = true;
    }
    change_online(content);
  } else if (content_type === 'msg') {
    var content_obj = JSON.parse(content);
    socketBuffer.push(content_obj);
    currentGap = (60 / socketBuffer.length) | 0;
  }
}
var socketBuffer = [];
var currentGap = 0;
var currentGapLeft = 0;
setInterval(function () {
  if (!socketBuffer.length) return;
  if (currentGapLeft > 0) {
    return currentGapLeft--;
  }
  currentGapLeft = currentGap;
  var next = socketBuffer.shift();
  if (unsafeWindow.BHL_Debug) console.log(next);
  if (next.cmd == 'DANMU_MSG' && /(不是风动~是dokidoki心动！|哔哩哔哩.+干杯~)/.test(next.info[1])) return;
  emit_danmu(next);
  append_danmu(next);
}, 1e3 / 60);
function send_danmu(data) {
  var xhr = new XMLHttpRequest();
  // xhr.setRequestHeader('X-Cookie', document.cookie);
  let {msg, color, mode} = data;
  xhr.open('POST', '//api.live.bilibili.com/msg/send', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.withCredentials = true;
  xhr.responseType = 'json';
  xhr.onload = function () {
    var data = xhr.response;
    if (data.code != 0 || data.message) {
      abpinst.createPopup('发送弹幕失败 ['+data.code+']' + data.message, 3e3);
    }
  }
  xhr.send($.param({
    color: color,
    fontsize: 25,
    mode: mode,
    msg: msg,
    rnd: Math.floor(Date.now() / 1000),
    roomid: room_id,
    bubble: 0,
    csrf_token: (document.cookie.match(/bili_jct=([^;]+)/)||[0,''])[1],
    csrf: (document.cookie.match(/bili_jct=([^;]+)/)||[0,''])[1]
  }));
}