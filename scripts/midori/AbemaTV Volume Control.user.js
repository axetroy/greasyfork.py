// ==UserScript==
// @name         AbemaTV Volume Control
// @namespace    https://greasyfork.org/ja/scripts/26397
// @version      13
// @description  AbemaTV（HTML5版）閲覧中にキーボードやマウスホイールで音量を調整します。
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

  // ページ右下の音量ボタン＆音量ゲージを表示する
  //（音量ゲージ操作で変更した音量と当スクリプトで変更した音量は同期できない場合があります）
  // 1：表示する / 2：表示しない
  // 初期値：2
  // 有効値：1 ～ 2
  let showVolumeButton = 0;

  /* ------------------------------ */


  const sid = 'VolumeControl',
    ls = JSON.parse(localStorage.getItem(sid)) || {},
    moConfig = { attributes: true, characterData: true },
    moConfig2 = { childList: true },
    moConfig3 = { childList: true, subtree: true },
    flag = { countWaitShowVideo: 0, mute: false, type: 0, wheel: false },
    interval = { chhannel: 0, info: 0, init: 0, mute: 0, video: 0, wheel: 0 };
  let observerS, eSlider;

  //THEOplayerのプレイヤーもしくはaudio要素にイベントリスナーを追加
  const addEventAudio = s => {
    log('addEventAudio', s);
    if (flag.type === 1) {
      if (theoplayer.player && !theoplayer.player(0).element.classList.contains(sid)) {
        theoplayer.player(0).element.classList.add(sid);
        theoplayer.player(0).addEventListener('volumechange', audioVolumeChange, false);
        if (ls.debug) {
          log3(theoplayer.player(0), 'canplay');
          log3(theoplayer.player(0), 'canplaythrough');
          log3(theoplayer.player(0), 'durationchange');
          log3(theoplayer.player(0), 'emptied');
          log3(theoplayer.player(0), 'ended');
          log3(theoplayer.player(0), 'error');
          log3(theoplayer.player(0), 'loadeddata');
          log3(theoplayer.player(0), 'loadedmetadata');
          log3(theoplayer.player(0), 'loadstart');
          log3(theoplayer.player(0), 'pause');
          log3(theoplayer.player(0), 'play');
          log3(theoplayer.player(0), 'playing');
          log3(theoplayer.player(0), 'seeked');
          log3(theoplayer.player(0), 'seeking');
          log3(theoplayer.player(0), 'stalled');
          log3(theoplayer.player(0), 'suspend');
          log3(theoplayer.player(0), 'waiting');
        }
      }
    } else if (flag.type === 2) {
      const au = document.getElementsByTagName('audio');
      for (let i = 0, j = au.length; i < j; i++) {
        if (!au[i].classList.contains(sid)) {
          au[i].classList.add(sid);
          au[i].addEventListener('emptied', audioEmptied, false);
          au[i].addEventListener('ended', audioEnded, false);
          au[i].addEventListener('loadstart', audioLoadstart, false);
          au[i].addEventListener('play', audioPlay, false);
          au[i].addEventListener('volumechange', audioVolumeChange, false);
          if (ls.debug) {
            log3(au[i], 'canplay');
            log3(au[i], 'canplaythrough');
            log3(au[i], 'durationchange');
            log3(au[i], 'error');
            log3(au[i], 'loadeddata');
            log3(au[i], 'loadedmetadata');
            log3(au[i], 'loadstart');
            log3(au[i], 'pause');
            log3(au[i], 'playing');
            log3(au[i], 'seeked');
            log3(au[i], 'seeking');
            log3(au[i], 'stalled', true);
            log3(au[i], 'suspend');
            log3(au[i], 'waiting');
          }
        }
      }
    }
  };

  //ページにイベントリスナーを追加
  const addEventPage = () => {
    log('addEventPage');
    const div1 = document.querySelector('.com-a-Video__container'),
      div2 = (div1) ? div1.parentNode.parentNode : document.querySelector('main');
    if (div2) {
      div2.addEventListener('mousedown', checkMousedown, false);
      div2.addEventListener('wheel', changeVolume, { passive: true });
    }
    if (showVolumeButton === 1) {
      const v = document.querySelector('button[aria-label] + div button');
      if (v) v.addEventListener('click', clickVolumeButton, false);
    }
    document.addEventListener('keydown', checkKeyDown, true);
  };

  //動画が空になったとき
  const audioEmptied = () => {
    log('audioEmptied');
    if (!flag.mute && !flag.wheel) checkVolume('audioEmptied');
  };

  //動画を最後まで再生したとき
  const audioEnded = () => {
    log('audioEnded');
    if (!flag.mute && !flag.wheel) checkVolume('audioEnded');
  };

  //動画をこれから読み込むとき
  const audioLoadstart = () => {
    log('audioLoadstart');
    if (!flag.mute && !flag.wheel) checkVolume('audioLoadstart');
  };

  //動画を再生し始めたとき
  const audioPlay = () => {
    log('audioPlay');
    if (!flag.mute && !flag.wheel) checkVolume('audioPlay');
  };

  //動画のボリュームが変わったとき
  const audioVolumeChange = () => {
    log('audioVolumeChange');
    if (!flag.mute && !flag.wheel) checkVolume('audioVolumeChange');
  };

  //音量を変更できるか判別する
  const changeableVolume = () => {
    log('changeableVolume');
    if (window.theoplayer && theoplayer.player && theoplayer.player(0) && theoplayer.player(0).hasOwnProperty('volume')) {
      flag.type = 1;
      return true;
    }
    const vi = document.getElementsByTagName('video'),
      au = document.getElementsByTagName('audio');
    if (au.length > 0 && vi.length === au.length && !document.getElementsByClassName('vjs-tech').length) {
      flag.type = 2;
      return true;
    }
    flag.type = 0;
    return false;
  };

  //audio要素の値を変更する
  const changeAudioElementsValue = (n, v) => {
    log('changeAudioElementsValue');
    if (flag.type === 1) theoplayer.player(0)[n] = v;
    else if (flag.type === 2) {
      const au = document.getElementsByTagName('audio');
      for (let i = 0, j = au.length; i < j; i++) {
        au[i][n] = v;
      }
    }
  };

  //動画の音をミュート・解除
  const changeMute = (a, b) => {
    log('changeMute', a, b);
    if ((!a && b) || (a.button === 1) && changeableVolume()) {
      const au = returnAudio();
      if (!au) return;
      if (au.muted) {
        ls.muted = false;
        changeAudioElementsValue('volume', ls.beforeMute);
      } else {
        ls.muted = true;
        ls.beforeMute = au.volume;
      }
      saveLocalStorage();
      changeAudioElementsValue('muted', !au.muted);
      if (au.muted) showInfo();
      else showInfo(String(Math.round(au.volume * 100)));
      if (showVolumeButton === 1 && !flag.mute) {
        switchVolumeButtonImage();
      }
    }
  };

  //番組名が変更したとき
  const changeProgramTitle = () => {
    log('changeProgramTitle');
    if (changeableVolume() && returnAudio()) {
      checkVolume('changeProgramTitle1');
      addEventAudio('changeProgramTitle1');
    } else {
      clearInterval(interval.channel);
      interval.channel = setInterval(() => {
        if (changeableVolume() && returnAudio()) {
          clearInterval(interval.channel);
          checkVolume('changeProgramTitle2');
          addEventAudio('changeProgramTitle2');
        }
      }, 200);
    }
  };

  //ボリュームスライダーの位置が動いたとき
  const changeSlider = () => {
    log('changeSlider', flag.wheel);
    if (!flag.mute && !flag.wheel) changeVolume(returnAudio().volume, 1);
  };

  //音量を変更する
  const changeVolume = (a, b) => {
    if (changeableVolume()) {
      log2(['changeVolume1', a, b]);
      const info = document.getElementById('VolumeControl_Info'),
        au = returnAudio();
      let vol;
      if (b) vol = a;
      else {
        const y = (a.deltaMode > 0) ? a.deltaY * 100 : a.deltaY;
        if (au.volume === 1 || au.volume === 0) vol = ls.volume + (y / -10000);
        else vol = ((au.muted || ls.muted) ? ls.beforeMute : au.volume) + (y / -10000);
      }
      vol = (vol > 1) ? 1 : (vol < 0) ? 0 : vol;
      if (vol > 0.66) {
        info.classList.remove('vc_icon_before_hidden');
        info.classList.remove('vc_icon_after_hidden');
      } else if (vol > 0.33) {
        info.classList.add('vc_icon_before_hidden');
        info.classList.remove('vc_icon_after_hidden');
      } else {
        info.classList.add('vc_icon_before_hidden');
        info.classList.add('vc_icon_after_hidden');
      }
      clearTimeout(interval.wheel);
      flag.wheel = true;
      interval.wheel = setTimeout(() => flag.wheel = false, 150);
      if (showVolumeButton === 1 && eSlider) eSlider.style.height = `${Math.ceil(vol * 92)}px`;
      if ((au.muted && b !== 3)) {
        changeMute(null, true);
        if (showVolumeButton === 1 && eSlider) switchVolumeButtonImage();
      }
      if (!au.muted && ls.muted) {
        changeAudioElementsValue('muted', true);
      }
      ls.volume = vol;
      saveLocalStorage();
      changeAudioElementsValue('volume', vol);
      if (b !== 1) showInfo(String(Math.round(vol * 100)));
    } else log('changeVolume2');
  };

  //動画を構成している要素に変更があったとき
  const checkChangeElements = () => {
    if (flag.type === 2) addEventAudio('checkChangeElement');
  };

  //キーボードのキーを押したとき
  const checkKeyDown = e => {
    if (/input|textarea/i.test(e.target.tagName)) return;
    if (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey && changeableVolume()) {
      let v = returnAudio().volume;
      if (e.key === 'ArrowUp' || e.keyCode === 38) {
        e.stopPropagation();
        v += 0.05;
        if (v > 1) v = 1;
        changeVolume(v, 2);
      } else if (e.key === 'ArrowDown' || e.keyCode === 40) {
        e.stopPropagation();
        v -= 0.05;
        if (v < 0) v = 0;
        changeVolume(v, 2);
      } else if (e.key === 'm' || e.keyCode === 77) changeMute(null, true);
    }
  };

  //マウスのボタンを押したとき
  const checkMousedown = e => {
    if (e.button === 1) changeMute(e);
  };

  //ボリュームの値を調べる
  const checkVolume = s => {
    log('checkVolume', s);
    const au = returnAudio();
    if (au && au.muted) showInfo();
    if (au && au.volume !== ls.volume) {
      log('checkVolume', s);
      restoreVolume();
    }
    if (au && au.muted !== ls.muted) changeMute(null, true);
  };

  //ボリュームボタンをクリックしたとき
  const clickVolumeButton = e => {
    log('clickVolumeButton');
    if (!flag.mute) {
      e.stopPropagation();
      flag.mute = true;
      clearTimeout(interval.mute);
      interval.mute = setTimeout(() => flag.mute = false, 150);
      changeMute(null, true);
      switchVolumeButtonImage();
    } else {
      if (returnAudio().volume && ls.volume) ls.beforeMute = ls.volume;
      else changeVolume(ls.beforeMute, 1);
    }
  };

  //音量を表示する要素を作成
  const createInfo = () => {
    const css = '#VolumeControl_Info {align-items:center; background-color:rgba(0,0,0,0.4); border-radius:4px; bottom:80px; color:#FFF; display:flex; justify-content:center; left:20px; min-height:30px; min-width:3em; opacity:0; padding:0.5ex 1ex; position:fixed; visibility:hidden; z-index: 2260; }' +
      '#VolumeControl_Info.vc_show {opacity:0.8; visibility:visible;}' +
      '#VolumeControl_Info.vc_hidden {opacity:0; transition:opacity 0.5s ease-out, visibility 0.5s ease-out; visibility:hidden;}' +
      '#VolumeControl_Info span:before, #VolumeControl_Info span:after {box-sizing:content-box !important;}' +
      '.vc_icon_before_hidden #VolumeControl_Volume2::before, .vc_icon_after_hidden #VolumeControl_Volume2::after {visibility:hidden;}' +
      '#VolumeControl_Info span::before, #VolumeControl_Info span::after {content:""; display:block; position:absolute;}' +
      '#VolumeControl_Volume1 {height:20px; position:relative; width:30px;}' +
      '#VolumeControl_Volume1::before {background:#FFF; height:8px; left:2px; top:6px; width:4px;}' +
      '#VolumeControl_Volume1::after {border:5px transparent solid; border-left-width:0; border-right-color:#FFF; height:8px; left:6px; top:1px; width:0;}' +
      '#VolumeControl_Volume2, #VolumeControl_Volume3 {position:absolute;}' +
      '#VolumeControl_Volume2 {top:5px; left:8px;}' +
      '#VolumeControl_Volume2::before, #VolumeControl_Volume2::after {border:2px solid transparent; border-right:2px solid #FFF;}' +
      '#VolumeControl_Volume2::before {border-radius:20px; height:20px; left:-3px; top:-2px; width:20px;}' +
      '#VolumeControl_Volume2::after {border-radius:10px; height:15px; left:-2px; top:1px; width:15px;}' +
      '#VolumeControl_Volume3 {left:20px; top:14px;}' +
      '#VolumeControl_Volume3::before, #VolumeControl_Volume3::after {background-color:#FFF; height:2px; width:12px;}' +
      '#VolumeControl_Volume3::before {transform:rotate(45deg);}' +
      '#VolumeControl_Volume3::after {transform:rotate(135deg);}' +
      '#VolumeControl_Volume4 {font-weight:bold; margin-left:1ex;}',
      div = document.createElement('div'),
      style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = css;
    document.head.appendChild(style);
    div.id = 'VolumeControl_Info';
    div.innerHTML = '<span id="VolumeControl_Volume1"></span><span id="VolumeControl_Volume2"></span><span id="VolumeControl_Volume3"></span><span id="VolumeControl_Volume4"></span>';
    document.body.appendChild(div);
  };

  //ページを開いたときに1度だけ実行
  const init = () => {
    log('init');
    setupSettings();
    if (showVolumeButton === 1) observerS = new MutationObserver(changeSlider);
    waitShowVideo();
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

  //デバッグ用 ログ2
  const log2 = (s, t = 'log') => {
    if (ls.debug) {
      const fl = num => {
          if (isFinite(num)) return Math.floor(Number(num) * 1000) / 1000;
          return num;
        },
        au = returnAudio(),
        a = [fl(ls.beforeMute), ls.muted, fl(ls.volume)];
      if (au) a.push(au.muted, fl(au.volume));
      if (Array.isArray(s)) {
        for (let i = s.length; i > 0; i--) {
          a.unshift(s[i - 1]);
        }
      } else a.unshift(s);
      console[t](sid, a);
    }
  };

  //デバッグ用 ログ3
  const log3 = (e, a, b) => {
    if (ls.debug) {
      if (a === 'stalled' && b) {
        e.addEventListener(a, () => {
          const au1 = document.getElementsByTagName('audio');
          for (let i1 = 0, j1 = au1.length; i1 < j1; i1++) {
            if (!au1[i1].classList.contains(sid)) log('stalled not add event', i1);
          }
        }, false);
      } else {
        e.addEventListener(a, () => log2(a), false);
      }
    }
  };

  //以前調整した音量を復元する
  const restoreVolume = () => {
    log('restoreVolume');
    if (changeableVolume() && ls.volume >= 0) changeVolume(ls.volume, 3);
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

  //THEOplayerのプレイヤーもしくはvideo要素を返す
  const returnVideo = () => {
    if (flag.type === 1) return theoplayer.player(0);
    if (flag.type === 2) {
      const vi = document.getElementsByTagName('video');
      for (let i = 0, j = vi.length; i < j; i++) {
        if (vi[i].src && getComputedStyle(vi[i]).display !== 'none') return vi[i];
      }
    }
    return null;
  };

  //ローカルストレージに設定を保存する
  const saveLocalStorage = () => localStorage.setItem(sid, JSON.stringify(ls));

  //設定の値を用意する
  const setupSettings = () => {
    let vb = (Number.isInteger(Number(showVolumeButton))) ? Number(showVolumeButton) : 0;
    vb = (vb === 0) ? 0 : (vb > 2) ? 2 : (vb < 1) ? 1 : vb;
    showVolumeButton = (ls.showVolumeButton) ? ls.showVolumeButton : (vb) ? vb : 2;
    if (vb && ls.showVolumeButton !== vb) {
      showVolumeButton = vb;
      ls.showVolumeButton = vb;
      saveLocalStorage();
    }
    if (isNaN(Number(ls.volume))) ls.volume = -1;
    else if (ls.volume >= 0) {
      localStorage.setItem('abm_volume', ls.volume);
      localStorage.setItem('volume', ls.volume);
    }
    if (isNaN(Number(ls.beforeMute))) ls.beforeMute = -1;
  };

  //現在の音量を表示
  const showInfo = s => {
    const eInfo = document.getElementById('VolumeControl_Info'),
      eVol2 = document.getElementById('VolumeControl_Volume2'),
      eVol3 = document.getElementById('VolumeControl_Volume3'),
      eVol4 = document.getElementById('VolumeControl_Volume4'),
      au = returnAudio();
    eVol4.textContent = (au && au.muted) ? 'ミュート' : (s) ? s : '';
    if (au && au.muted) {
      eVol2.style.display = 'none';
      eVol3.style.display = 'block';
    } else {
      eVol2.style.display = 'block';
      eVol3.style.display = 'none';
    }
    eInfo.classList.remove('vc_hidden');
    eInfo.classList.add('vc_show');
    clearTimeout(interval.info);
    interval.info = setTimeout(() => {
      eInfo.classList.remove('vc_show');
      eInfo.classList.add('vc_hidden');
    }, 1000);
  };

  //指定時間だけ待つ
  const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

  //ページを開いて動画が表示されたら1度だけ実行
  const startObserve = () => {
    log('startObserve');
    addEventAudio('startObserve');
    addEventPage();
    restoreVolume();
    observerT.observe(document.querySelector('button[aria-label] + div + div span > span'), moConfig2);
    observerC.observe(document.querySelector('.com-a-Video__container'), moConfig3);
    if (showVolumeButton === 1) {
      eSlider = document.querySelector('button[aria-label] + div > div > div > div > div > div');
      observerS.observe(eSlider, moConfig);
      switchVolumeButtonImage();
    } else {
      const eVolume = document.querySelector('div:not([class]) > button[aria-label] + div');
      if (eVolume) eVolume.style.display = 'none';
    }
  };

  //ボリュームボタンの画像を切り替える
  const switchVolumeButtonImage = () => {
    log('switchVolumeButtonImage');
    const use = document.querySelector('div:not([class]) > button[aria-label] + div use'),
      au = returnAudio();
    let href;
    if (use && use.hasAttribute('xlink:href') && au) {
      href = use.getAttribute('xlink:href');
      if (href) {
        if (au.muted) href = href.replace(/^(.+volume_)on(\.svg.*)$/, '$1off$2');
        else href = href.replace(/^(.+volume_)off(\.svg.*)$/, '$1on$2');
        use.setAttribute('xlink:href', href);
      }
    }
  };

  //動画が表示されるのを待つ
  const waitShowVideo = async() => {
    log('waitShowVideo');
    const splash = () => {
      const sp = document.querySelector('#splash > div');
      if (!sp) return true;
      const cs = getComputedStyle(sp);
      if (cs && cs.display === 'none') return true;
      return false;
    };
    await sleep(400);
    changeableVolume();
    if (returnVideo() && !isNaN(returnVideo().duration) && splash()) startObserve();
    else {
      clearInterval(interval.video);
      interval.video = setInterval(() => {
        changeableVolume();
        if (returnVideo() && !isNaN(returnVideo().duration) && splash()) {
          clearInterval(interval.video);
          flag.countWaitShowVideo = 0;
          startObserve();
        } else if (flag.countWaitShowVideo > 50) {
          clearInterval(interval.video);
          flag.countWaitShowVideo = 0;
        } else flag.countWaitShowVideo += 1;
      }, 200);
    }
  };

  const observerC = new MutationObserver(checkChangeElements),
    observerT = new MutationObserver(changeProgramTitle);

  clearInterval(interval.init);
  interval.init = setInterval(() => {
    if (/^https:\/\/abema\.tv\/now-on-air\/.+/.test(location.href)) {
      clearInterval(interval.init);
      init();
    }
  }, 1000);

})();