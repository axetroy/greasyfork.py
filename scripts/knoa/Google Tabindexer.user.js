// ==UserScript==
// @name        Google Tabindexer
// @name:ja     Google Tabindexer
// @namespace   knoa.jp
// @description Adds tabindex = 1 on heading elements for comfortable [TAB] key navigation.
// @description:ja 主要要素に tabindex = 1 を追加して、[TAB]キーによる操作を快適にします。
// @include     https://www.google.*/search?*
// @version     1.0.2
// @grant       none
// ==/UserScript==
/*
On the Mac, you confirm "All controls" is checked on System Preferences > Keyboard > Shortcuts.
Macでは システム環境設定 > キーボード > ショートカット で「すべてのコントロール」でTabが効くように設定してください。
*/

(function(){
  const SCRIPTNAME = 'GoogleTabindexer';
  const DEBUG = false;/*
    1.0.2
    .r > a:first-of-type
  */
  if(window === top && console.time) console.time(SCRIPTNAME);
  const SELECTORS = [
    'input[title]',/* search */
    '#hdtbSum a:not([tabindex="-1"])',/* top navigations */
    '.r > a:first-of-type',/* main headings */
    '#nav a',/* paging */
    '#tads a:not([style])[id]',/* ads */
    'h3[role="heading"] a',/* images */
    '[data-init-vis="true"] g-inner-card a',/* videos */
    'lazy-load-item a',/* news */
  ];
  const FOCUSFIRST = '.r > a:first-child';
  const INDEX = '1';/* set 1 to prevent default tab focuses */
  const FLAGNAME = 'tabindexer';/* should be lowercase */
  let elements = {}, indexedElements = [];
  let core = {
    initialize: function(){
      core.addTabindex(document.body);
      core.focusFirst();
      core.observe();
      core.tabToScroll();
      core.addStyle();
    },
    addTabindex: function(node){
      for(let i = 0; SELECTORS[i]; i++){
        let es = node.querySelectorAll(SELECTORS[i]);
        for(let j = 0; es[j]; j++){
          es[j].tabIndex = INDEX;
          es[j].dataset[FLAGNAME] = 'true';
        }
      }
      indexedElements = document.querySelectorAll(`[data-${FLAGNAME}="true"]`);
      for(let i = 0; indexedElements[i]; i++){
        indexedElements[i].previousTabindexElement = indexedElements[i - 1];
        indexedElements[i].nextTabindexElement = indexedElements[i + 1];
      }
    },
    focusFirst: function(){
      let target = document.querySelector(FOCUSFIRST);
      core.showTarget(target);
      target.focus();
    },
    observe: function(){
      document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(e){
        core.addTabindex(e.target);
      }, true);
    },
    tabToScroll: function(){
      document.body.addEventListener('keypress', function(e){
        if(e.key !== 'Tab') return;/* catch only Tab key */
        if(e.altKey || e.ctrlKey || e.metaKey) return;
        let target = (e.shiftKey) ? e.target.previousTabindexElement : e.target.nextTabindexElement;
        if(target) core.showTarget(target);
      }, true);
    },
    showTarget: function(target){
      let scroll = function(x, y, deltaY){
        setTimeout(function(){window.scrollTo(x, y + deltaY*(100 - 9**2)/100)}, 0*(1000/60));
        setTimeout(function(){window.scrollTo(x, y + deltaY*(100 - 8**2)/100)}, 1*(1000/60));
        setTimeout(function(){window.scrollTo(x, y + deltaY*(100 - 7**2)/100)}, 2*(1000/60));
        setTimeout(function(){window.scrollTo(x, y + deltaY*(100 - 6**2)/100)}, 3*(1000/60));
        setTimeout(function(){window.scrollTo(x, y + deltaY*(100 - 5**2)/100)}, 4*(1000/60));
        setTimeout(function(){window.scrollTo(x, y + deltaY*(100 - 4**2)/100)}, 5*(1000/60));
        setTimeout(function(){window.scrollTo(x, y + deltaY*(100 - 3**2)/100)}, 6*(1000/60));
        setTimeout(function(){window.scrollTo(x, y + deltaY*(100 - 2**2)/100)}, 7*(1000/60));
        setTimeout(function(){window.scrollTo(x, y + deltaY*(100 - 1**2)/100)}, 8*(1000/60));
        setTimeout(function(){window.scrollTo(x, y + deltaY*(100 - 0**2)/100)}, 9*(1000/60));
      };
      let innerHeight = window.innerHeight, scrollX = window.scrollX, scrollY = window.scrollY;
      let rect = target.getBoundingClientRect()/* rect.top: from top of the window */;
      switch(true){
        case(rect.top < innerHeight*(25/100)):
          scroll(scrollX, scrollY, rect.top - innerHeight*(25/100));/* position the target to 25% from top */
          break;
        case(innerHeight*(75/100) < rect.top):
          scroll(scrollX, scrollY, rect.top - innerHeight*(75/100));/* position the target to 75% from top */
          break;
        default:
          /* stay scrollY */
          break;
      }
    },
    addStyle: function(name = 'style'){
      let style = createElement(core.html[name]());
      document.head.appendChild(style);
      if(elements[name] && elements[name].isConnected) document.head.removeChild(elements[name]);
      elements[name] = style;
    },
    html: {
      style: () => `
        <style type="text/css">
          a:focus{
            text-decoration: underline !important;
          }
          .r{
            position: relative;
            overflow: visible !important;
          }
          .r a:focus:before{
            content: "▶";
            font-size: medium;
            color: lightgray;
            position: absolute;
            left: -1.25em;
            top: 0.1em;
          }
        </style>
      `,
    },
  };
  const createElement = function(html){
    let outer = document.createElement('div');
    outer.innerHTML = html;
    return outer.firstElementChild;
  };
  const log = function(){
    if(!DEBUG) return;
    let l = log.last = log.now || new Date(), n = log.now = new Date();
    let error = new Error(), line = log.format.getLine(error), callers = log.format.getCallers(error);
    //console.log(error.stack);
    console.log(
      SCRIPTNAME + ':',
      /* 00:00:00.000  */ n.toLocaleTimeString() + '.' + n.getTime().toString().slice(-3),
      /* +0.000s       */ '+' + ((n-l)/1000).toFixed(3) + 's',
      /* :00           */ ':' + line,
      /* caller.caller */ (callers[2] ? callers[2] + '() => ' : '') +
      /* caller        */ (callers[1] || '') + '()',
      ...arguments
    );
  };
  log.formats = [{
      name: 'Firefox Scratchpad',
      detector: /MARKER@Scratchpad/,
      getLine: (e) => e.stack.split('\n')[1].match(/([0-9]+):[0-9]+$/)[1],
      getCallers: (e) => e.stack.match(/^[^@]*(?=@)/gm),
    }, {
      name: 'Firefox Console',
      detector: /MARKER@debugger/,
      getLine: (e) => e.stack.split('\n')[1].match(/([0-9]+):[0-9]+$/)[1],
      getCallers: (e) => e.stack.match(/^[^@]*(?=@)/gm),
    }, {
      name: 'Firefox Greasemonkey 3',
      detector: /\/gm_scripts\//,
      getLine: (e) => e.stack.split('\n')[1].match(/([0-9]+):[0-9]+$/)[1],
      getCallers: (e) => e.stack.match(/^[^@]*(?=@)/gm),
    }, {
      name: 'Firefox Greasemonkey 4+',
      detector: /MARKER@user-script:/,
      getLine: (e) => e.stack.split('\n')[1].match(/([0-9]+):[0-9]+$/)[1] - 500,
      getCallers: (e) => e.stack.match(/^[^@]*(?=@)/gm),
    }, {
      name: 'Firefox Tampermonkey',
      detector: /MARKER@moz-extension:/,
      getLine: (e) => e.stack.split('\n')[1].match(/([0-9]+):[0-9]+$/)[1] - 6,
      getCallers: (e) => e.stack.match(/^[^@]*(?=@)/gm),
    }, {
      name: 'Chrome Console',
      detector: /at MARKER \(<anonymous>/,
      getLine: (e) => e.stack.split('\n')[2].match(/([0-9]+):[0-9]+\)$/)[1],
      getCallers: (e) => e.stack.match(/[^ ]+(?= \(<anonymous>)/gm),
    }, {
      name: 'Chrome Tampermonkey',
      detector: /at MARKER \((userscript\.html|chrome-extension:)/,
      getLine: (e) => e.stack.split('\n')[2].match(/([0-9]+)\)$/)[1] - 6,
      getCallers: (e) => e.stack.match(/[^ ]+(?= \((userscript\.html|chrome-extension:))/gm),
    }, {
      name: 'Edge Console',
      detector: /at MARKER \(eval/,
      getLine: (e) => e.stack.split('\n')[2].match(/([0-9]+):[0-9]+\)$/)[1],
      getCallers: (e) => e.stack.match(/[^ ]+(?= \(eval)/gm),
    }, {
      name: 'Edge Tampermonkey',
      detector: /at MARKER \(Function/,
      getLine: (e) => e.stack.split('\n')[2].match(/([0-9]+):[0-9]+\)$/)[1] - 4,
      getCallers: (e) => e.stack.match(/[^ ]+(?= \(Function)/gm),
    }, {
      name: 'Safari',
      detector: /^MARKER$/m,
      getLine: (e) => 0,/*e.lineが用意されているが最終呼び出し位置のみ*/
      getCallers: (e) => e.stack.split('\n'),
    }, {
      name: 'Default',
      detector: /./,
      getLine: (e) => 0,
      getCallers: (e) => [],
    }];
  log.format = log.formats.find(function MARKER(f){
    if(!f.detector.test(new Error().stack)) return false;
    //console.log('//// ' + f.name + '\n' + new Error().stack);
    return true;
  });
  core.initialize();
  if(window === top && console.timeEnd) console.timeEnd(SCRIPTNAME);
})();