// ==UserScript==
// @name         AbemaTV Auto Reload
// @namespace    https://greasyfork.org/ja/scripts/25598
// @version      16
// @description  AbemaTV（HTML5版）閲覧中に動画が止まったとき、動画を再読み込みします。
// @include      https://abema.tv/
// @include      https://abema.tv/now-on-air/*
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  /* ---------- Settings ---------- */

  // 変更した値はブラウザのローカルストレージに保存するので
  // スクリプトをバージョンアップするたびに書き換える必要はありません。
  // （値が0のとき、以前に変更した値か初期値を使用します）

  // 画質を変更したとき、左上に情報を表示するかどうか
  // 1：表示する / 2：表示しない
  // 初期値：1
  // 有効値：1 ～ 2
  let displayInformation = 0;

  // ショートカットキーでShiftキーを使用するかどうか
  // 1：使用する / 2：使用しない / 3：どちらでも動作する
  // 初期値：1
  // 有効値：1 ～ 3
  let useShiftkey = 0;

  /* ------------------------------ */


  const sid = 'AutoReload',
    ls = JSON.parse(localStorage.getItem(sid)) || {},
    ss = JSON.parse(sessionStorage.getItem(sid)) || {},
    moConfig = { attributes: true, characterData: true },
    moConfig2 = { childList: true },
    flag = {
      bufferedEnd: 0,
      change1: false,
      change2: false,
      changeChannel: false,
      checkKeyUp: false,
      checkQuality: false,
      countWaitShowVideo: 0,
      currentTime: 0,
      loadstart: false,
      reload: false,
      show: false,
      type: 0,
      undoChannel: false
    },
    timer = {
      init: 0,
      loading: 0,
      notify: 0,
      playerActiveQualityChanged: 0,
      reload: 0,
      showInfo: 0,
      showQuality: 0,
      showSpec: 0,
      waitShowVideo: 0
    },
    video = {
      height: [-1, 180, 240, 360, 480, 720, 1080],
      quality: ['自動で最適化', '通信節約モード', '最低画質', '低画質', '中画質', '高画質', '最高画質']
    };
  let eV, ePrev, eNext, chId, programTitle, programStartTime;

  //ページにイベントリスナーを追加
  const addEventPage = () => {
    log('addEventPage');
    document.addEventListener('keyup', checkKeyUp, false);
  };

  //動画にイベントリスナーを追加
  const addEventVideo = s => {
    log('addEventVideo', s);
    eV = returnVideo(`addEventVideo2 ${s}`);
    if (!eV) {
      checkChangeVideo('addEventVideo2');
      return;
    }
    if (!eV.classList.contains(sid)) {
      eV.classList.add(sid);
      eV.addEventListener('error', videoError, false);
      eV.addEventListener('playing', videoPlaying, false);
      eV.addEventListener('stalled', videoStalled, false);
      eV.addEventListener('waiting', videoWaiting, false);
      if (flag.type === 1) {
        if (theoplayer.player && theoplayer.player(0).videoTracks.item(0).qualities) theoplayer.player(0).videoTracks.item(0).qualities.addEventListener('activequalitychanged', playerActiveQualityChanged, false);
      }
      if (ls.debug) {
        eV.addEventListener('canplay', videoCanplay, false);
        eV.addEventListener('canplaythrough', videoCanplaythrough, false);
        eV.addEventListener('durationchange', videoDurationchange, false);
        eV.addEventListener('emptied', videoEmpied, false);
        eV.addEventListener('ended', videoEnded, false);
        eV.addEventListener('loadeddata', videoLoadeddata, false);
        eV.addEventListener('loadedmetadata', videoLoadedmetadata, false);
        eV.addEventListener('loadstart', videoLoadstart, false);
        eV.addEventListener('pause', videoPause, false);
        eV.addEventListener('play', videoPlay, false);
        eV.addEventListener('progress', videoProgress, false);
        eV.addEventListener('seeked', videoSeeked, false);
        eV.addEventListener('seeking', videoSeeking, false);
        eV.addEventListener('suspend', videoSuspend, false);
        eV.addEventListener('timeupdate', videoTimeupdate, false);
      }
      checkQuality('addEventVideo');
    }
  };

  //再生位置を調整する
  const adjustCurrentTime = () => {
    if (flag.type === 1) {
      let be, ct;
      try { be = theoplayer.player(0).buffered.end(0); } catch(err) { log('adjustCurrentTime: be', err, 'error'); }
      try { ct = theoplayer.player(0).currentTime; } catch(err) { log('adjustCurrentTime: ct', err, 'error'); }
      if (be && ct && (be + ct) > 5 && ct < -2) {
        theoplayer.player(0).currentTime = -2;
      }
    }
  };

  //チャンネルを切り替える
  const changeChannel = s => {
    log('changeChannel', s);
    if (!flag.changeChannel && !flag.undoChannel) {
      flag.changeChannel = true;
      eNext.click();
      showInfo('チャンネルを切り替えます', 4000);
    }
  };

  //フッターの文字列が変更したとき
  const changeHighlight = async () => {
    log('changeHighlight1');
    const ft = returnFooterText(),
      time = returnProgramTime();
    if (ft) {
      if (programTitle && !ft.textContent.trim()) {
        await sleep(15000);
        adjustCurrentTime();
      }
      programTitle = ft.textContent.trim() || '';
      log('changeHighlight2', programTitle);
      addEventVideo();
    }
    if (time) {
      const t = time.textContent || '';
      if (t) {
        programStartTime = t.slice(t.indexOf('）') + 1, t.indexOf(' '));
        log('changeHighlight3', programStartTime);
      }
    }
    checkPlayingVideo('changeHighlight');
  };

  //画質を変更する
  const changeQuality = (s, n, c, a) => {
    log('changeQuality', s, n, c, a, ss.tempQuality, flag.checkKeyUp);
    if (flag.type === 1) {
      const p = theoplayer.player(0);
      if (!flag.checkKeyUp && p && p.videoTracks && p.videoTracks.item) {
        const q = p.videoTracks.item(0).qualities;
        if (n === 48) {
          for (let i = 0, j = q.length; i < j; i++) {
            if (q.getQualityByID(i).hasOwnProperty('enabled')) {
              if (c && a) {
                for (let k = 0; k < j; k++) {
                  if (q.getQualityByID(k).hasOwnProperty('enabled')) q.getQualityByID(k).enabled = true;
                  ls.automaticQualities[k] = true;
                }
              } else if (ls.automaticQualities.length > i && q.getQualityByID(i).hasOwnProperty('enabled')) q.getQualityByID(i).enabled = ls.automaticQualities[i];
            }
          }
          if (!(c && a)) {
            q.targetQuality = null;
            ls.videoQuality = 0;
            ss.tempQuality = -1;
          }
        } else if (n >= 49 && n <= 54) {
          let id = n - 49,
            count = 0;
          if (c && a) {
            if (q.length >= id && !ls.videoQuality && ss.tempQuality === -1) {
              for (let i = 0, j = q.length; i < j; i++) {
                if (q.getQualityByID(i).enabled) count += 1;
              }
              if (count === 2 && q.getQualityByID(id).enabled) return;
              if (q.getQualityByID(id).hasOwnProperty('enabled')) {
                q.getQualityByID(id).enabled = !q.getQualityByID(id).enabled;
                ls.automaticQualities[id] = !ls.automaticQualities[id];
                if (displayInformation === 1) showInfo(`自動最適化での${video.quality[id + 1]}：${ls.automaticQualities[id] ? '有効' : '無効'}`);
              }
            }
          } else if (c) {
            if (id > q.length - 1) id = q.length - 1;
            if (q.getQualityByID(id).hasOwnProperty('enabled')) {
              q.getQualityByID(id).enabled = true;
              q.targetQuality = q.getQualityByID(id);
              ss.tempQuality = n - 48;
            }
          } else if (flag.checkKeyUp && ss.tempQuality >= 0) {
            if (q.getQualityByID(ss.tempQuality).hasOwnProperty('enabled')) {
              q.getQualityByID(ss.tempQuality).enabled = true;
              q.targetQuality = q.getQualityByID(ss.tempQuality);
            }
          } else {
            if (id > q.length - 1) id = q.length - 1;
            if (q.getQualityByID(id).hasOwnProperty('enabled')) {
              q.getQualityByID(id).enabled = true;
              q.targetQuality = q.getQualityByID(id);
              ls.videoQuality = n - 48;
              ss.tempQuality = -1;
            }
          }
        } else {
          q.targetQuality = null;
          ls.videoQuality = 0;
          ss.tempQuality = -1;
        }
        saveLocalStorage();
        saveSessionStorage();
      }
    }
  };

  //動画が切り替わったかを調べる
  const checkChangeVideo = async a => {
    log('checkChangeVideo');
    const e = returnVideo(`checkChangeVideo ${a}`);
    if (!flag.change1 && !e) {
      log('checkChangeVideo1', a);
      flag.change1 = true;
      await sleep(550);
      flag.change1 = false;
      checkChangeVideo('checkChangeVideo');
    } else if (!flag.change2 && e && (!eV || e.id !== eV.id)) {
      log('checkChangeVideo2', a);
      flag.change2 = true;
      await sleep(1000);
      flag.change2 = false;
      addEventVideo('checkChangeVideo');
    } else {
      log('checkChangeVideo3', a);
      checkPlayingVideo('checkChangeVideo3');
    }
  };

  //動画配信の形式を調べる
  const checkVideoFormat = () => {
    if (window.theoplayer && theoplayer.player && theoplayer.player(0)) {
      flag.type = 1;
      return true;
    }
    const vi = document.getElementsByTagName('video'),
      au = document.getElementsByTagName('audio');
    if (vi.length > 0 && vi.length === au.length && !document.getElementsByClassName('vjs-tech').length) {
      flag.type = 2;
      return true;
    }
    flag.type = 0;
    return false;
  };

  //キーボードのキーを押したとき
  const checkKeyUp = e => {
    if (/input|textarea/i.test(e.target.tagName)) return;
    if ((useShiftkey === 1 && e.shiftKey) || (useShiftkey === 2 && !e.shiftKey) || useShiftkey === 3) {
      const quality = async () => {
          flag.checkKeyUp = true;
          await sleep(250);
          flag.checkKeyUp = false;
        },
        vi = returnVideo('checkKeyUp'),
        au = returnAudio();
      checkVideoFormat();
      if (e.code === 'Backspace' || e.keyCode === 8) { //Backspace
        if (vi) vi.playbackRate = 1;
        if (flag.type === 2 && au) au.playbackRate = 1;
        showInfo(`${vi.playbackRate}倍速`);
      } else if (e.code === 'Space' || e.keyCode === 32) { //Space
        if (flag.type === 1) {
          if (theoplayer.player(0).paused) theoplayer.player(0).play();
          else theoplayer.player(0).pause();
        } else if (flag.type === 2 && vi && au) {
          if (vi.paused) {
            vi.play();
            au.play();
          } else {
            vi.pause();
            au.pause();
          }
        }
      } else if (/^Digit[0-6]$/.test(e.code) || (e.keyCode >= 48 && e.keyCode <= 54)) { //0～6
        const kc = /^Digit[0-6]$/.test(e.code) ? Number(e.code.slice(-1)) + 48 : e.keyCode;
        changeQuality('checkKeyUp', kc, e.ctrlKey, e.altKey);
        quality();
      } else if (e.code === 'Digit9' || e.keyCode === 57) checkQuality(); //9
      else if (e.code === 'KeyI' || e.keyCode === 73) showSpec(); //i
      else if (e.code === 'Backslash' || e.code === 'BracketRight' || e.keyCode === 221 || e.keyCode === 219) { //]・[
        if (vi && vi.playbackRate) {
          const pr = vi.playbackRate.toFixed(1);
          if (e.code === 'Backslash' || e.keyCode === 221) {
            if (e.ctrlKey) {
              vi.playbackRate = 2;
              if (flag.type === 2 && au) au.playbackRate = 2;
            } else if (pr < 2) {
              vi.playbackRate += 0.1;
              if (flag.type === 2 && au) au.playbackRate += 0.1;
            }
          } else if (e.code === 'BracketRight' || e.keyCode === 219) {
            if (e.ctrlKey) {
              vi.playbackRate = 0.5;
              if (flag.type === 2 && au) au.playbackRate = 0.5;
            } else if (pr > 0.5) {
              vi.playbackRate -= 0.1;
              if (flag.type === 2 && au) au.playbackRate -= 0.1;
            }
          }
          showInfo(`${Number(vi.playbackRate.toFixed(3))}倍速`, vi.playbackRate !== 1 ? -1 : null);
        }
      }
    }
  };

  //動画が実際に再生中なのかを調べる
  const checkPlayingVideo = async s => {
    log('checkPlayingVideo', s);
    eV = returnVideo('checkPlayingVideo1');
    if (eV) {
      let time1 = 0,
        time2 = 0;
      try { time1 = eV.currentTime; } catch(err) { log('checkPlayingVideo: time1', err, 'error'); }
      if (time1) {
        await sleep(250);
        try { time2 = eV.currentTime; } catch(err) { log('checkPlayingVideo: time2', err, 'error'); }
        if (time1 === time2) reloadVideo(`checkPlayingVideo1-${s}`);
      } else reloadVideo(`checkPlayingVideo2-${s}`);
    } else log('checkPlayingVideo: not found video');
  };

  //動画の画質を調べる
  const checkQuality = s => {
    log('checkQuality', s);
    if (flag.type === 1) {
      const p = theoplayer.player(0);
      if (p && p.videoTracks && p.videoTracks.item) {
        const q = p.videoTracks.item(0).qualities,
          aq = q.activeQuality,
          max = q.getQualityByID(q.length - 1);
        if (s) {
          flag.checkQuality = true;
          if (ss.tempQuality >= 0) changeQuality('checkQuality1', ss.tempQuality + 48);
          else if (ls.videoQuality >= 0) changeQuality('checkQuality2', ls.videoQuality + 48);
        } else if (aq.resolution.height) {
          const qn = ss.tempQuality >= 0 ? `*${ss.tempQuality}` : ls.videoQuality;
          let mes = `解像度：${p.videoWidth}×${p.videoHeight}\n` +
            `選択(${qn})：${aq.resolution.width}×${aq.resolution.height}, ${aq.frameRate}fps, ${(aq.bandwidth / 1000)}kbps`;
          if (max.resolution.height) mes += `\n最高(${(q.length)})：${max.resolution.width}×${max.resolution.height}, ${max.frameRate}fps, ${(max.bandwidth / 1000)}kbps`;
          notify('checkQuality', mes);
        }
      }
    } else if (flag.type === 2) {
      const vi = returnVideo(`checkQuality ${s}`);
      if (vi && vi.videoHeight) notify('checkQuality', `解像度：${vi.videoWidth}×${vi.videoHeight}`);
    }
  };

  //CSSの読み込み＆解像度や画質などの情報を表示する要素を作成
  const createInfo = () => {
    const css = '#AutoReload_Info, #AutoReload_Quality, #AutoReload_Spec {align-items:center; background-color:rgba(0,0,0,0.6); border-radius:4px; color:white; display:flex; justify-content:center; min-height:2em; min-width:4em; padding:0.5ex 1ex; position:fixed; -ms-user-select:none; -moz-user-select:none; -webkit-user-select:none; user-select:none;}' +
      '#AutoReload_Info {left:20px; top:80px; z-index: 2222; }' +
      '#AutoReload_Quality {left:20px; top:50px; z-index: 2224; }' +
      '#AutoReload_Spec {bottom:120px; font-size:90%; left:40px; width:calc(100% - 80px); max-width:60em; z-index: 2220; }' +
      '#AutoReload_Spec dl {display:flex; flex-wrap:wrap;}' +
      '#AutoReload_Spec dt {width:10em;}' +
      '#AutoReload_Spec dd {width:calc(100% - 10em); padding-left:1em;}' +
      '.ar_show {opacity:0.8; visibility:visible;}' +
      '.ar_hidden {opacity:0; visibility:hidden; transition:opacity 0.5s ease-out, visibility 0.5s ease-out;}',
      div1 = document.createElement('div'),
      div2 = document.createElement('div'),
      div3 = document.createElement('div'),
      style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = css;
    document.head.appendChild(style);
    div1.id = 'AutoReload_Info';
    div1.className = 'ar_hidden';
    document.body.appendChild(div1);
    div2.id = 'AutoReload_Quality';
    div2.className = 'ar_hidden';
    document.body.appendChild(div2);
    div3.id = 'AutoReload_Spec';
    div3.className = 'ar_hidden';
    document.body.appendChild(div3);
  };

  //ページを開いたときに1度だけ実行
  const init = () => {
    log('init');
    setupSettings();
    waitShowVideo('init');
    createInfo();
  };

  //デバッグ用 ログ
  const log = (...a) => {
    if (ls.debug) {
      if (/^debug$|^error$|^info$|^warn$/.test(a[a.length - 1])) {
        const b = a.pop();
        console[b](sid, a.toString());
      } else console.log(sid, a.toString());
    }
  };

  //デスクトップ通知
  const notify = (f, m, s) => {
    const title = 'AbemaTV Auto Reload',
      message = `${m}\n${new Date().toLocaleTimeString()}`,
      delay = s >= 1000 ? s : 3000;
    let notifi;
    log('----- notify -----', f, m);
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        notifi = new Notification(title, { body: message, tag: f });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(permission => {
          if (permission === 'granted') {
            notifi = new Notification(title, { body: message, tag: f });
          }
        });
      }
      if (notifi) {
        clearTimeout(timer.notify);
        timer.notify = setTimeout(() => notifi.close(), delay);
      }
    } else console.log(title, message);
  };

  //画質が変更されたとき
  const playerActiveQualityChanged = () => {
    log('playerActiveQualityChanged');
    if (flag.type === 1) {
      const eQua = document.getElementById('AutoReload_Quality'),
        eSel = document.getElementsByClassName('theoplayer-configuration-panel-content')[0],
        p = theoplayer.player(0);
      let n = 0;
      if (!p || !p.videoTracks.item) return;
      if (ss.tempQuality > 0 && p.videoTracks.item(0).qualities.activeQuality.resolution.height !== video.height[ss.tempQuality]) changeQuality('playerActiveQualityChanged1', ss.tempQuality + 48);
      else if (ls.videoQuality > 0 && p.videoTracks.item(0).qualities.activeQuality.resolution.height !== video.height[ls.videoQuality]) changeQuality('playerActiveQualityChanged2', ls.videoQuality + 48);
      log(`${ls.videoQuality} / ${ss.tempQuality} : ${p.videoHeight} → ${p.videoTracks.item(0).qualities.activeQuality.resolution.height}`);
      if (displayInformation === 1) {
        clearInterval(timer.playerActiveQualityChanged);
        timer.playerActiveQualityChanged = setInterval(() => {
          if (p && p.videoTracks && p.videoTracks.item) {
            const w = p.videoWidth,
              h = p.videoHeight,
              a = p.videoTracks.item(0).qualities.activeQuality,
              r = (a) ? a.resolution : null;
            let after = '',
              before = '';
            log('activequalitychanged 1', w, h);
            if (r && r.width && r.height && isFinite(r.width) && isFinite(r.height)) {
              log('activequalitychanged 2', eSel.selectedIndex, a.id, r.width, r.height, w, h);
              for (let i = 1, j = video.height.length; i < j; i++) {
                if (video.height[i] === h) before = video.quality[i];
                if (video.height[i] === r.height) after = video.quality[i];
              }
              if (h !== r.height && !eQua.classList.contains('ar_pre')) {
                log('activequalitychanged 3', eSel.selectedIndex, a.id, r.width, r.height, w, h);
                eQua.classList.add('ar_pre');
                showQuality(`画質変更：${before} → ${after}`);
              } else if (r.height === h) {
                log('activequalitychanged 4', eSel.selectedIndex, a.id, r.width, r.height, w, h);
                eQua.classList.remove('ar_pre');
                showQuality(`画質：${after}`);
                n = 0;
                clearInterval(timer.playerActiveQualityChanged);
              } else if (n > 60) {
                log('activequalitychanged 5', eSel.selectedIndex, a.id, r.width, r.height, w, h);
                n = 0;
                clearInterval(timer.playerActiveQualityChanged);
                eQua.classList.remove('ar_show');
                eQua.classList.remove('ar_pre');
              } else n += 1;
            }
          }
        }, 1000);
      }
    }
  };

  //動画を再読み込みする
  const reloadVideo = s => {
    log(`reloadVideo: ${s}`);
    if (flag.type === 1) {
      log('reloadVideo-1');
      if (theoplayer && theoplayer.player) {
        theoplayer.player(0).load();
        clearInterval(timer.loading);
        timer.loading = setInterval(() => theoplayer.player(0).load(), 1100);
        flag.reload = true;
        showInfo('動画を再読み込みしています…', 10000);
        clearTimeout(timer.reload);
        timer.reload = setTimeout(() => {
          clearInterval(timer.loading);
          if (flag.reload) changeChannel('reloadVideo-1');
        }, 6000);
      }
    } else if (flag.type === 2) {
      log('reloadVideo-2');
      const vi = returnVideo(`reloadVideo ${s}`);
      if (vi && vi.error) changeChannel('reloadVideo-2');
    }
  };

  //THEOplayerのプレイヤーもしくはaudio要素を返す
  const returnAudio = () => {
    if (flag.type === 1) return theoplayer.player(0);
    if (flag.type === 2) {
      const vi = document.getElementsByTagName('video'),
        au = document.getElementsByTagName('audio');
      let n = -1;
      for (let i = 0, j = vi.length; i < j; i++) {
        if (vi[i].src && getComputedStyle(vi[i]).display !== 'none') {
          n = i;
          break;
        }
      }
      if (n >= 0 && au[n].src) return au[n];
      for (let k = 0, l = au.length; k < l; k++) {
        if (au[k].src) return au[k];
      }
    }
    return null;
  };

  //チャンネルロゴ画像の要素を返す
  const returnChLogo = s => {
    const e = document.querySelector('img[srcset]:not([width])');
    if (s) {
      if (e) {
        chId = e.getAttribute('alt');
        log('returnChLogo: chId', chId);
      } else log('returnChLogo: not found ch logo', 'error');
    }
    return e;
  };

  //番組詳細の「月日時分～月日時分」の要素を返す
  const returnProgramTime = () => document.querySelector('div > h2 + p + p');

  //フッターのテキストの要素を返す
  const returnFooterText = () => document.querySelector('button[aria-label] + div + div span > span');

  //再生中のvideo要素を返す
  const returnVideo = s => {
    const vi = document.getElementsByTagName('video');
    if (!vi) log('returnVideo: not found video', s);
    for (let i = 0, j = vi.length; i < j; i++) {
      if (vi[i].src && getComputedStyle(vi[i]).display !== 'none') return vi[i];
    }
    return null;
  };

  //ローカルストレージに設定を保存する
  const saveLocalStorage = () => localStorage.setItem(sid, JSON.stringify(ls));

  //セッションストレージに設定を保存する
  const saveSessionStorage = () => sessionStorage.setItem(sid, JSON.stringify(ss));

  //設定の値を用意する
  const setupSettings = () => {
    let di = (Number.isInteger(Number(displayInformation))) ? Number(displayInformation) : 0,
      us = (Number.isInteger(Number(useShiftkey))) ? Number(useShiftkey) : 0;
    if (!Number.isInteger(Number(ls.videoQuality))) ls.videoQuality = 0;
    if (!Array.isArray(ls.automaticQualities)) ls.automaticQualities = [true, true, true, true, true];
    di = (di === 0) ? 0 : (di > 2) ? 2 : (di < 1) ? 1 : di;
    us = (us === 0) ? 0 : (us > 3) ? 3 : (us < 1) ? 1 : us;
    displayInformation = (ls.displayInformation) ? ls.displayInformation : (di) ? di : 1;
    useShiftkey = (ls.useShiftkey) ? ls.useShiftkey : (us) ? us : 1;
    if (di && ls.displayInformation !== di) {
      displayInformation = di;
      ls.displayInformation = di;
      saveLocalStorage();
    }
    if (us && ls.useShiftkey !== us) {
      useShiftkey = us;
      ls.useShiftkey = us;
      saveLocalStorage();
    }
  };

  //情報の要素を表示
  const showInfo = (s, t, b) => {
    if (!b) log('showInfo', s);
    const e = document.getElementById('AutoReload_Info'),
      delay = t > 0 ? t : 2500;
    if (s) {
      e.textContent = s;
      e.classList.remove('ar_hidden');
      e.classList.add('ar_show');
      clearTimeout(timer.showInfo);
      if (t !== -1) {
        timer.showInfo = setTimeout(() => {
          e.classList.remove('ar_show');
          e.classList.add('ar_hidden');
        }, delay);
      }
    } else {
      clearTimeout(timer.showInfo);
      e.classList.remove('ar_show');
      e.classList.add('ar_hidden');
    }
  };

  //画質情報の要素を表示
  const showQuality = s => {
    log('showQuality', s);
    const e = document.getElementById('AutoReload_Quality');
    e.textContent = s;
    e.classList.remove('ar_hidden');
    e.classList.add('ar_show');
    clearTimeout(timer.showQuality);
    timer.showQuality = setTimeout(() => {
      e.classList.remove('ar_show');
      e.classList.add('ar_hidden');
    }, 2500);
  };

  //詳細情報の要素を表示
  const showSpec = () => {
    log('showSpec');
    const e = document.getElementById('AutoReload_Spec'),
      spec = s => {
        if (s) {
          e.innerHTML = s;
          e.classList.remove('ar_hidden');
          e.classList.add('ar_show');
          clearTimeout(timer.showSpec);
          timer.showSpec = setTimeout(() => {
            e.classList.remove('ar_show');
            e.classList.add('ar_hidden');
          }, 8000);
        } else {
          clearTimeout(timer.showSpec);
          e.classList.remove('ar_show');
          e.classList.add('ar_hidden');
        }
      };
    if (flag.type === 1) {
      if (!e.classList.contains('ar_show')) {
        const p = theoplayer.player(0);
        if (p && p.videoTracks && p.videoTracks.item) {
          const vq = p.videoTracks.item(0).qualities,
            aq = p.audioTracks.item(0).qualities,
            vaq = vq.activeQuality,
            aaq = aq.activeQuality,
            vmax = vq.getQualityByID(vq.length - 1),
            amax = aq.getQualityByID(vq.length - 1),
            fr = p.frameRate,
            vc1 = ['avc1.42', 'avc1.4d', 'avc1.64'],
            vc2 = ['Baseline', 'Main', 'High'],
            ac1 = ['mp4a.40.5', 'mp4a.40.2', 'mp4a.69', 'mp4a.6b'],
            ac2 = ['HE-AAC', 'LC-AAC', 'MP3', 'MP3'];
          let s = '<dl>',
            vac = vaq.codecs,
            vmc = vmax.codecs,
            aac = aaq.codecs,
            amc = amax.codecs,
            qa = '',
            qm = '';
          if (vaq.codecs) {
            for (let i = 0, j = vc1.length, a = vaq.codecs.trim().toLowerCase(), m = vmax.codecs.trim().toLowerCase(); i < j; i++) {
              if (a.indexOf(vc1[i]) === 0) vac = `H.264 ${vc2[i]} Profile`;
              if (m.indexOf(vc1[i]) === 0) vmc = `H.264 ${vc2[i]} Profile`;
            }
          }
          if (aaq.codecs) {
            for (let i = 0, j = ac1.length, a = aaq.codecs.trim().toLowerCase(), m = amax.codecs.trim().toLowerCase(); i < j; i++) {
              if (a === ac1[i]) aac = ac2[i];
              if (m === ac1[i]) amc = ac2[i];
            }
          }
          s += `<dt>解像度</dt><dd>${p.videoWidth}×${p.videoHeight}</dd>`;
          s += `<dt>表示サイズ</dt><dd>${p.width}×${p.height}</dd>`;
          if (fr && isFinite(fr)) s += `<dt>フレームレート</dt><dd>${Number(fr.toFixed(3))}fps</dd>`;
          if (vaq.resolution.height) {
            const qn = ss.tempQuality >= 0 ? `*${ss.tempQuality}` : ls.videoQuality;
            qa = ss.tempQuality >= 0 ? `*${video.quality[ss.tempQuality]}` : video.quality[ls.videoQuality];
            s += `<dt>選択中の画質 (${qn})</dt><dd>${qa} (${vaq.resolution.width}×${vaq.resolution.height}, ${vaq.frameRate}fps, ${vaq.bandwidth / 1000}kbps, ${vac} / ${aac})</dd>`;
          }
          if (vmax.resolution.height) {
            for (let i = 1, j = video.height.length; i < j; i++) {
              if (vmax.resolution.height === video.height[i]) qm = video.quality[i];
            }
            s += `<dt>選択可能な最高画質</dt><dd>${qm} (${vmax.resolution.width}×${vmax.resolution.height}, ${vmax.frameRate}fps, ${(vmax.bandwidth / 1000)}kbps, ${vmc} / ${amc})</dd>`;
          }
          if (ls.videoQuality === 0 && ss.tempQuality === -1) {
            s += '<dt>自動最適化画質</dt><dd>';
            for (let i = 1, j = video.quality.length; i < j; i++) {
              if (ls.automaticQualities[i - 1]) s += `${video.quality[i]} `;
            }
            s += '</dd>';
          }
          s += '<dt>配信方式</dt><dd>HTTP Live Streaming</dd>';
          spec(`${s}</dl>`);
        }
      } else spec();
    } else if (flag.type === 2) {
      const v = returnVideo('showSpec');
      if (v && v.videoHeight) {
        let s = `<dl><dt>解像度</dt><dd>${v.videoWidth}×${v.videoHeight}</dd>`;
        s += '<dt>配信方式</dt><dd>MPEG-DASH</dd>';
        if (!e.classList.contains('ar_show')) spec(`${s}</dl>`);
        else spec();
      }
    }
  };

  //指定時間だけ待つ
  const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

  //ページを開いて動画が表示されたら1度だけ実行
  const startObserve = () => {
    log('startObserve');
    ePrev = document.querySelector('div[aria-hidden] > div[class] > button:first-child');
    eNext = document.querySelector('div[aria-hidden] > div[class] > button:last-child');
    observerC.observe(returnChLogo(), moConfig);
    observerV.observe(returnVideo('startObserve').parentNode, moConfig2);
    observerT.observe(returnFooterText(), moConfig2);
    addEventPage();
    addEventVideo('startObserve');
  };

  //動画の再生速度を元に戻す
  const undoPlaySpeed = s => {
    log('undoPlaySpeed', s);
    const vi = returnVideo('undoPlaySpeed'),
      au = returnAudio();
    checkPlayingVideo('undoPlaySpeed');
    if (vi && vi.playbackRate && vi.playbackRate !== 1) {
      vi.playbackRate = 1;
      if (flag.type === 2 && au) au.playbackRate = 1;
      showInfo(`${vi.playbackRate}倍速`);
    }
  };

  //動画の取得中にエラーが発生したとき
  const videoError = () => {
    log('videoError');
    checkPlayingVideo('videoError');
  };

  //動画を再生し始めたときや再生中にソースが切り替わったとき
  const videoPlaying = () => {
    log('videoPlaying');
    clearInterval(timer.loading);
    flag.reload = false;
    flag.undoChannel = false;
    showInfo();
  };

  //動画を取得できなかったときや取得し終えたとき
  const videoStalled = () => {
    if (!eV || (eV && !(eV.readyState === 4 && eV.networkState === 2))) {
      log('---videoStalled---');
      undoPlaySpeed('videoStalled');
    }
  };

  //動画の読み込みを待っているとき
  const videoWaiting = () => {
    log('---videoWaiting---');
    undoPlaySpeed('videoWaiting');
  };

  //動画を再生できるがキャッシュが足りないとき
  const videoCanplay = () => log('videoCanplay');
  //動画を再生できてキャッシュも足りるとき
  const videoCanplaythrough = () => log('videoCanplaythrough');
  //動画の長さが変更されたとき
  const videoDurationchange = () => {
    if (!eV || (eV && !(eV.readyState === 4 && eV.networkState === 2))) log('videoDurationchange');
  };
  //動画が空になったとき
  const videoEmpied = () => log('videoEmpied');
  //動画を最後まで再生したとき
  const videoEnded = () => log('videoEnded');
  //動画のメタ情報を読み込んだとき
  const videoLoadedmetadata = () => log('videoLoadedmetadata');
  //動画を再生できる状態になったとき
  const videoLoadeddata = () => log('videoLoadeddata');
  //動画をこれから読み込むとき
  const videoLoadstart = () => log('videoLoadstart');
  //動画を一時停止・解除したとき
  const videoPause = () => log('videoPause');
  //動画を（手動操作で）再生し始めたとき
  const videoPlay = () => log('videoPlay');
  //動画を取得しているとき
  const videoProgress = () => {
    if (eV.readyState < 3 || eV.networkState !== 2) log('videoProgress');
  };
  //動画をシークし終えたとき
  const videoSeeked = () => log('===videoSeeked===');
  //動画をシークし始めたとき
  const videoSeeking = () => log('===videoSeeking===');
  //動画の取得を取りやめたとき
  const videoSuspend = () => log('videoSuspend');
  //動画の再生位置が更新されたとき
  const videoTimeupdate = () => {
    if (eV.readyState < 3 || eV.networkState !== 2) log('videoTimeupdate');
  };

  //動画が表示されるのを待つ
  const waitShowVideo = async s => {
    log('waitShowVideo', s, flag.show);
    const splash = () => {
      const sp = document.querySelector('#splash > div');
      if (!sp) return true;
      const cs = getComputedStyle(sp);
      if (cs && cs.display === 'none') return true;
      return false;
    };
    if (!flag.show) {
      flag.show = true;
      clearInterval(timer.waitShowVideo);
      await sleep(400);
      checkVideoFormat();
      eV = returnVideo(`waitShowVideo1 ${s}`);
      if (eV && !isNaN(eV.duration) && splash()) {
        if (s === 'init') startObserve();
        else addEventVideo('waitShowVideo1');
        flag.show = false;
      } else {
        clearInterval(timer.waitShowVideo);
        timer.waitShowVideo = setInterval(() => {
          checkVideoFormat();
          eV = returnVideo(`waitShowVideo2 ${s}`);
          if (eV && !isNaN(eV.duration) && splash()) {
            clearInterval(timer.waitShowVideo);
            flag.countWaitShowVideo = 0;
            if (s === 'init') startObserve();
            else addEventVideo('waitShowVideo2');
            flag.show = false;
          } else if (flag.countWaitShowVideo > 40 && !flag.undoChannel) {
            clearInterval(timer.waitShowVideo);
            flag.countWaitShowVideo = 0;
            changeChannel('waitShowVideo');
          } else flag.countWaitShowVideo += 1;
        }, 200);
      }
    }
    if (s === 'observerC') {
      returnChLogo('waitShowVideo-observerC');
      if (flag.changeChannel && !flag.undoChannel) {
        await sleep(1000);
        log('waitShowVideo: undoChannel');
        flag.changeChannel = false;
        flag.undoChannel = true;
        ePrev.click();
        await sleep(10000);
        flag.undoChannel = false;
      }
    }
  };

  const waitShowVideoC = () => waitShowVideo('observerC'),
    waitShowVideoV = () => waitShowVideo('observerV'),
    observerC = new MutationObserver(waitShowVideoC),
    observerV = new MutationObserver(waitShowVideoV),
    observerT = new MutationObserver(changeHighlight);

  clearInterval(timer.init);
  timer.init = setInterval(() => {
    if (/^https:\/\/abema\.tv\/now-on-air\/.+/.test(location.href)) {
      clearInterval(timer.init);
      init();
    }
  }, 1000);

})();