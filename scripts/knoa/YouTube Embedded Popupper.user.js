// ==UserScript==
// @name        YouTube Embedded Popupper
// @name:ja     YouTube Embedded Popupper
// @namespace   knoa.jp
// @description You can pop up embeded videos by right click. (It may require permission for pop up blocker at the first pop)
// @description:ja YouTubeの埋め込み動画を、右クリックからポップアップで開けるようにします。(初回のみポップアップブロックの許可が必要かもしれません)
// @include     https://www.youtube.com/embed/*
// @include     https://www.youtube-nocookie.com/embed/*
// @version     2.1.0
// @grant       none
// ==/UserScript==

(function (){
  const SCRIPTNAME = 'YouTubeEmbeddedPopupper';
  const DEBUG = false;
  console.time(SCRIPTNAME);
  const POPUPWIDTH = 960;/* width of popup window (height depends on the width) */
  const POPUPTOP = 'CENTER';/* position top of popup window (DEFAULT,TOP,CENTER,BOTTOM) */
  const POPUPLEFT = 'CENTER';/* position left of popup window (DEFAULT,LEFT,CENTER,RIGHT) */
  const INDICATORDURATION = 1000;/* duration for indicator animation (ms) */
  const PAUSEDELAY = 1000;/* delay video pause for popuping window (ms) */
  const POPUPTITLE = 'Right Click to Popup';/* shown on mouse hover */
  const PARAMS = [/* overwrite YouTube parameters via https://developers.google.com/youtube/player_parameters */
    'autoplay=1',/* autoplay */
    'controls=2',/* show controls */
    'disablekb=0',/* enable keyboard control */
    'fs=1',/* enable fullscreen */
    'rel=0',/* not to show relative videos */
    'popped=1',/* (original) prevent grandchild popup */
  ];
  let core = {
    initialize: function(){
      /* Prevent grandchild popup and enables shortcut keys on popupped window */
      if(location.href.includes('popped=1')) return setTimeout(function(){document.querySelector('video').focus();}, 100);
      /* Title for Indicator */
      document.body.title = POPUPTITLE;
      /* Right Click to Popup */
      document.body.addEventListener('contextmenu', function(e){
        /* Define elements */
        let video = document.querySelector('video');
        /* Stop playing */
        core.showAnimation();
        setTimeout(video.pause.bind(video), PAUSEDELAY);
        /* Get current time */
        let params = PARAMS.concat('start=' + Math.floor(video.currentTime + (PAUSEDELAY / 1000)));/* use params at local scope */
        /* Build URL */
        /* (Duplicated params are overwritten by former) */
        let l = location.href.split('?');
        let url = l[0] + '?' + params.join('&');
        if(l.length === 2) url += ('&' + l[1]);
        /* Open popup window */
        /* (Use URL for window name to prevent popupping the same videos) */
        window.open(url, location.href, core.setOptions());
        e.preventDefault();
        e.stopPropagation();
      }, {capture: true});
    },
    setOptions: function(){
      let parameters = [], screen = window.screen, body = document.body, width = POPUPWIDTH, height = (width / body.offsetWidth) * body.offsetHeight;
      parameters.push('width=' + width);
      parameters.push('height=' + height);
      switch(POPUPTOP){
        case 'TOP':     parameters.push('top=' + 0); break;
        case 'CENTER':  parameters.push('top=' + (screen.availTop + (screen.availHeight / 2) - (height / 2))); break;
        case 'BOTTOM':  parameters.push('top=' + (screen.availTop + (screen.availHeight) - (height))); break;
        case 'DEFAULT': break;
        default:        break;
      }
      switch(POPUPLEFT){
        case 'LEFT':    parameters.push('left=' + 0); break;
        case 'CENTER':  parameters.push('left=' + (screen.availLeft + (screen.availWidth / 2) - (width / 2))); break;
        case 'RIGHT':   parameters.push('left=' + (screen.availLeft + (screen.availWidth) - (width))); break;
        case 'DEFAULT': break;
        default:        break;
      }
      return parameters.join(',');
    },
    showAnimation: function(e){
      let ready = document.createElement('div');
      ready.style.position = 'absolute';
      ready.style.margin = 'auto';
      ready.style.top = ready.style.bottom = ready.style.left = ready.style.right = '-100%';
      ready.style.width = ready.style.height = '0px';
      ready.style.borderRadius = '0px';
      ready.style.background = 'rgba(255,255,255,1.0)';
      ready.style.transitionDuration = INDICATORDURATION + 'ms';
      ready.addEventListener('transitionend', function(){
        document.body.removeChild(ready);
      });
      document.body.appendChild(ready);
      requestAnimationFrame(function(){
        let size = Math.hypot(document.body.clientWidth, document.body.clientHeight);
        ready.style.width = ready.style.height = size + 'px';
        ready.style.borderRadius = size + 'px';
        ready.style.background = 'rgba(255,255,255,0.0)'
      });
    },
  };
  let log = (DEBUG) ? console.log.bind(null, SCRIPTNAME + ':') : function(){};
  core.initialize();
  console.timeEnd(SCRIPTNAME);
})();