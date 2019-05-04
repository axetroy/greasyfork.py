// ==UserScript==
// @name         Mirkomoji
// @version      2.0.1
// @description  Więcej emoji + możliwość dodawania/usuwania własnych.
// @author       https://github.com/rpbyo
// @match        *://www.wykop.pl/mikroblog/*
// @match        *://www.wykop.pl/tag/*
// @match        *://www.wykop.pl/wpis/*
// @match        *://www.wykop.pl/link/*
// @match        *://www.wykop.pl/wiadomosc-prywatna/*
// @match        *://www.wykop.pl/moj/*
// @match        *://www.wykop.pl/ludzie/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @license      n/a
// @namespace https://greasyfork.org/users/168020
// ==/UserScript==

(function int() {
  const wykopUserScript = {
    default: {
      listEmoticons: [
        '( ͡° ʖ̯ ͡°)',
        '( ͡º ͜ʖ͡º)',
        '( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)',
        '(⌐ ͡■ ͜ʖ ͡■)',
        '(╥﹏╥)',
        '(╯︵╰,)',
        '(ʘ‿ʘ)',
        '(｡◕‿‿◕｡)',
        'ᕙ(⇀‸↼‶)ᕗ',
        'ᕦ(òóˇ)ᕤ',
        '(✌ ﾟ ∀ ﾟ)☞',
        'ʕ•ᴥ•ʔ',
        'ᶘᵒᴥᵒᶅ',
        '(⌒(oo)⌒)',
        'ᄽὁȍ ̪ őὀᄿ',
        '( ͡€ ͜ʖ ͡€)',
        '( ͡° ͜ʖ ͡°)',
        '( ͡° ͜ʖ ͡°)ﾉ⌐■-■',
        '(⌐ ͡■ ͜ʖ ͡■)',
        '¯\\\\\\_(ツ)\\_/¯',
        '(ꖘ⏏ꖘ)',
        '(╯°□°）╯︵ ┻━┻',
        '( ͡~ ͜ʖ ͡°)',
        '( ಠ_ಠ)',
        '(・へ・)',
        '(ง✿﹏✿)ง',
        '(づ•﹏•)づ',
        '乁(♥ ʖ̯♥)ㄏ',
        '|૦ઁ෴૦ઁ|',
        '乁(⫑ᴥ⫒)ㄏ',
        '(ꖘ‸ꖘ)',
        'ᕙ(✿ ͟ʖ✿)ᕗ',
        '(งⱺ ͟ل͜ⱺ)ง',
        '(￣෴￣)',
        'ヽ( ͠°෴ °)ﾉ',
        '└[⚆ᴥ⚆]┘',
        'ヽ(☼ᨓ☼)ﾉ',
        'XD',
        '(ⴲ﹏ⴲ)/',
        '(ಠ‸ಠ)',
        '(ง ͠° ͟ل͜ ͡°)ง',
        '_(:3」∠)',
        '(－‸ლ)',
        '( ͡° ͜ʖ ͡° )つ──☆*:・ﾟ',
        '(╭☞σ ͜ʖσ)╭☞',
        'xD',
        'xd',
        'XDDDDD',
        '(ᵔᴥᵔ)',
        '٩(◕‿◕)۶',
        '(✯◡✯)',
        '(◕‿◕)',
        '(*≧ω≦*)',
        '(☆▽☆)',
        '(⌒‿⌒)',
        '＼(≧▽≦)／',
        'ヽ(o＾▽＾o)ノ',
        "☆ ～('▽^人)",
        '(*°▽°*)',
        '٩(｡•́‿•̀｡)۶',
        '(✧ω✧)',
        'ヽ(*⌒▽⌒*)ﾉ',
        '(´｡• ᵕ •｡`)',
        '( ´ ▽ ` )',
        '(￣▽￣)',
        '╰(*´︶`*)╯',
        'ヽ(>∀<☆)ノ',
        'o(≧▽≦)o',
        '(☆ω☆)',
        '(っ˘ω˘ς )',
        '＼(￣▽￣)／',
        '(*¯︶¯*)',
        '＼(＾▽＾)／',
        '(~˘▽˘)~',
        '(o˘◡˘o)',
        '(★ω★)/',
        '/(^ヮ^)/',
        '(〃＾▽＾〃)',
        '(╯✧▽✧)╯',
        'o(>ω<)o',
        'o( ❛ᴗ❛ )o',
        '｡ﾟ(TヮT)ﾟ｡',
        '( ‾́ ◡ ‾́ )',
        '(ﾉ´ヮ`)ﾉ*: ･ﾟ',
        '(b ᵔ▽ᵔ)b',
        '(๑˃ᴗ˂)ﻭ',
        '(๑˘︶˘๑)',
        '( ˙꒳​˙ )',
        '(*꒦ິ꒳꒦ີ)',
        '°˖✧◝(⁰▿⁰)◜✧˖°',
        '(＃＞＜)',
        '(；⌣̀_⌣́)',
        '☆ｏ(＞＜；)○',
        '(￣ ￣|||)',
        '(；￣Д￣)',
        '(￣□￣」)',
        '(＃￣0￣)',
        '(´･ᴗ･ ` )',
        '(ノ_<。)',
        '(-_-)',
        '(´-ω-`)',
        '.･ﾟﾟ･(／ω＼)･ﾟﾟ･.',
        '(μ_μ)',
        '(ﾉД`)',
        '(-ω-、)',
        '。゜゜(´Ｏ`) ゜゜。',
        'o(TヘTo)',
        '( ; ω ; )',
        '(｡╯︵╰｡)',
        '｡･ﾟﾟ*(>д<)*ﾟﾟ･｡',
        '⁽⁽◝( • ω • )◜⁾⁾',
        '(个_个)',
        '｡･ﾟ(ﾟ><ﾟ)ﾟ･｡',
        '( ╥ω╥ )',
        '(╯_╰)',
        '(╥_╥)',
        '.｡･ﾟﾟ･(＞_＜)･ﾟﾟ･｡.',
        '(／ˍ・、)',
        '(ノ_<、)',
        '(╥﹏╥)',
        '｡ﾟ(｡ﾉωヽ｡)ﾟ｡',
        '(つω`｡)',
        '(｡T ω T｡)',
        '(ﾉω･､)',
        '･ﾟ･(｡>ω<｡)･ﾟ･',
        '(T_T)',
        '(>_<)',
        '(っ˘̩╭╮˘̩)っ',
        '｡ﾟ･ (>﹏<) ･ﾟ｡',
        'o(〒﹏〒)o',
        '(｡•́︿•̀｡)',
        '(ಥ﹏ಥ)',
        '( ` ω ´ )',
        'ヽ( `д´*)ノ',
        '(・`ω´・)',
        '~(>_<~)',
        '☆⌒(> _ <)',
        '☆⌒(>。<)',
        '(☆_@)',
        '(×_×)',
        '(x_x)',
        '(×_×)⌒☆',
        '(x_x)⌒☆',
        '(×﹏×)',
        'ʕっ•ᴥ•ʔっ',
        '(＋_＋)',
        'ʕノ•ᴥ•ʔノ ︵ ┻━┻',
        '(`ー´)',
        'ヽ(`⌒´メ)ノ',
        'ʕ·͡ᴥ·ʔ',
        '( `ε´ )',
        '⊂(◉‿◉)つ',
        'ヾ(`ヘ´)ﾉﾞ',
        'ヽ(‵﹏´)ノ',
        '(ﾒ` ﾛ ´)',
        '(•_•)',
        '( •_•)>⌐■-■',
        '(⌐■_■)',
        'Σ(▼□▼メ)',
        '(°ㅂ°╬)',
        'ԅ(≖‿≖ԅ)',
        '( ╥﹏╥) ノシ',
        '(ღ˘⌣˘ღ)',
        '(ง ͠° ͟ʖ ͡°)ง',
        '(* ^ ω ^)',
        'ᕙ(`▽´)ᕗ',
        'ʕᵔᴥᵔʔ',
        '(˵ ͡° ͜ʖ ͡°˵)',
        '＼٩(๑`^´๑)۶／',
        '(´• ω •`)',
        '┬──┬ ノ(ò_óノ)',
        '(ㆆ _ ㆆ)',
        '(っ˘ڡ˘ς)',
        '٩(ఠ益ఠ)۶',
        '(ﾉಥ益ಥ)ﾉ',
        '(^=◕ᴥ◕=^)',
        '( =ω= )',
        '(^˵◕ω◕˵^)',
        '(^◔ᴥ◔^)',
        '(^◕ᴥ◕^)',
        'ヽ(∀° )人( °∀)ノ',
        '∠( ᐛ 」∠)＿',
        '⁽⁽◝( • ω • )◜⁾⁾',
        'ヘ(￣ω￣ヘ)',
        '(〜￣▽￣)〜',
        '〜(￣▽￣〜)',
        'σ( •̀ ω •́ σ)',
        'ლ(́◉◞౪◟◉‵ლ',
        '( =ω=)',
        '(;・ω・)',
        '┬┴┬┴┤( ͡° ͜ʖ├┬┴┬┴',
        '|･ω･)',
        '|･ω･)ﾉ',
        '┬┴┬┴┤･ω･)ﾉ',
        '(￢‿￢ )',
        '(•ิ_•ิ)?',
        '＞_＜',
        '(„ಡωಡ„)',
        '(*^.^*)',
        '(´ ε ` )♡',
        '♡( ◡‿◡ )',
        '( ◡‿◡ )',
        '(´♡‿♡`)',
        '⊂(･ω･*⊂)',
        '(っಠ‿ಠ)っ',
        '(≖ ͜ʖ≖)',
        '(∩ᄑ_ᄑ)⊃━☆ﾟ:・ﾟ',
        '(ฺ◣д◢)ฺ',
        '(∩ᄑ_ᄑ)⊃',
        '(/￣ー￣)/',
        '(∩` ﾛ ´)⊃',
        '(=^･ω･^=)',
        '(=^･ｪ･^=)',
        '₍₍ (ง ˙ω˙)ว ⁾⁾',
        'ʕ*ﾉᴥﾉʔ',
        '(= ; ｪ ; =)',
        '(=`ω´=)',
        '(=^‥^=)',
        '(=ノωヽ=)',
        '(=⌒‿‿⌒=)',
        '(=^ ◡ ^=)',
        '(=^-ω-^=)',
        'ヾ(=`ω´=)ノ”',
        '_(ˇωˇ」∠)',
        '_(°ω°｣ ∠)',
      ],
      columnPerPage: 5,
      rowPerPage: 9,
    },
    closeOptionsPage(event) {
      event.preventDefault();
      const { target } = event;
      const elem = target.closest('.emojioptions');
      elem.classList.add('hideelement');
    },
    optionsPage(event) {
      event.preventDefault();
      const { target } = event;
      const options = document.querySelector('.emojioptions');
      if (options.classList.contains('hideelement')) {
        const top = window.pageYOffset + 20;
        const left = Math.round(window.innerWidth / 3);
        options.style.top = `${top}px`;
        options.style.left = `${left}px`;
        options.classList.remove('hideelement');
      } else {
        options.classList.add('hideelement');
      }
    },
    changePage(event, id, { columnPerPage, emojiArr }) {
      event.preventDefault();
      const { target } = event;
      const dropdown = target.closest('.dropdown-emoji');
      const currentLi = dropdown.querySelector('.emojimenu-background');
      const nodeLiDis = dropdown.querySelectorAll('.emojimenu-displaypage');
      const nodeLi = dropdown.querySelectorAll('.emojimenu > li');
      const innerDiv = dropdown.querySelector('.emojibody-innerdiv');
      const currentUl = innerDiv.querySelector('.emojibody-displaypage');
      let nextLi;
      let nextPageNr;
      if (id > 0) {
        if (id === 1) {
          if (currentLi.previousElementSibling !== null) {
            nextLi = currentLi.previousElementSibling;
            if (!nextLi.classList.contains('emojimenu-displaypage')) {
              nextLi.classList.replace('hideelement', 'emojimenu-displaypage');
              nodeLiDis[nodeLiDis.length - 1].classList.replace(
                'emojimenu-displaypage',
                'hideelement',
              );
            }
          } else {
            nextLi = nodeLi[nodeLi.length - 1];
            if (!nextLi.classList.contains('emojimenu-displaypage')) {
              nodeLi.forEach(e => e.classList.replace('emojimenu-displaypage', 'hideelement'));
              nodeLi.forEach((e, n) => {
                const mth = columnPerPage * 3;
                if (n >= Object.keys(emojiArr).length - mth) {
                  e.classList.replace('hideelement', 'emojimenu-displaypage');
                } else {
                  e.classList.add('hideelement');
                }
              });
            }
          }
        } else if (id === 2) {
          if (currentLi.nextElementSibling !== null) {
            nextLi = currentLi.nextElementSibling;
            if (!nextLi.classList.contains('emojimenu-displaypage')) {
              nextLi.classList.replace('hideelement', 'emojimenu-displaypage');
              nodeLiDis[0].classList.replace('emojimenu-displaypage', 'hideelement');
            }
          } else {
            const [first] = nodeLi;
            nextLi = first;
            if (!nextLi.classList.contains('emojimenu-displaypage')) {
              nodeLi.forEach(e => e.classList.replace('emojimenu-displaypage', 'hideelement'));
              nodeLi.forEach((e, n) => {
                if (n < columnPerPage * 3) {
                  e.classList.replace('hideelement', 'emojimenu-displaypage');
                } else {
                  e.classList.add('hideelement');
                }
              });
            }
          }
        }
        nextPageNr = nextLi.children[0].dataset.page;
      } else {
        nextLi = target.parentElement;
        nextPageNr = target.dataset.page;
      }
      const nextUl = innerDiv.querySelector(`ul[data-emojipage="${nextPageNr}"]`);
      currentLi.classList.remove('emojimenu-background');
      nextLi.classList.add('emojimenu-background');
      currentUl.classList.replace('emojibody-displaypage', 'hideelement');
      nextUl.classList.replace('hideelement', 'emojibody-displaypage');
    },
    addEmojiToText(event, { action, method }) {
      const { target } = event;
      let textarea;
      if (action === 'pm' && method === 'index') {
        textarea = document.querySelector('textarea.xxx-long');
      } else {
        const mf = target.closest('.mfUploadHolder');
        textarea = mf.querySelector('textarea');
      }
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const scroll = textarea.scrollTop;
      const emoji = target.title;
      textarea.value =
        textarea.value.substring(0, start) +
        emoji +
        textarea.value.substring(end, textarea.value.length);
      textarea.focus();
      textarea.selectionStart = start + emoji.length;
      textarea.selectionEnd = start + emoji.length;
      textarea.scrollTop = scroll;
    },
    removeEmoji(event, { listEmoticons }) {
      const { target } = event;
      const emoji = target.title;
      const parent = target.parentElement;
      parent.remove();
      this.listEmoticons = listEmoticons.filter(e => e !== emoji);
    },
    typeEmoji(event, { emojiClickType }) {
      event.preventDefault();
      const { target } = event;
      if (emojiClickType === 'add') {
        this.addEmojiToText(event, wykop.params);
      } else if (emojiClickType === 'edit') {
        const isParent = target.closest('.dropdown-emoji-edit');
        if (isParent) {
          this.removeEmoji(event, this);
        }
      }
    },
    replaceInEditPost(elem, { menuElement, bodyElement }) {
      const target = elem.nextElementSibling;
      const menu = menuElement.cloneNode(true);
      const body = bodyElement.cloneNode(true);
      target.classList.add('dropdown-emoji');
      target.querySelector('table').remove();
      target.appendChild(menu);
      target.appendChild(body);
    },
    addListener() {
      document.body.addEventListener(
        'click',
        (event) => {
          const { target } = event;
          switch (true) {
            case target.classList.contains('emojimenu-page'):
              this.changePage(event, 0, this);
              break;
            case target.classList.contains('emojibody-prevpage'):
              this.changePage(event, 1, this);
              break;
            case target.classList.contains('emojibody-nextpage'):
              this.changePage(event, 2, this);
              break;
            case target.classList.contains('emojibody-newlenny'):
              this.typeEmoji(event, this);
              break;
            case target.classList.contains('emojibar-options'):
              this.optionsPage(event);
              break;
            default:
              break;
          }
        },
        false,
      );
      document.body.addEventListener(
        'mouseover',
        (event) => {
          const { target } = event;
          function check(elem) {
            if (elem.matches('a.dropdown-show') && elem.previousElementSibling !== null) {
              if (elem.previousElementSibling.classList.contains('editlenny')) {
                if (!elem.nextElementSibling.classList.contains('dropdown-emoji')) {
                  event.preventDefault();
                  this.replaceInEditPost(elem, this);
                }
              }
            }
            return false;
          }
          if (target.matches('i.fa.fa-caret-down')) {
            check.call(this, target.parentElement);
          } else if (target.matches('a.dropdown-show')) {
            check.call(this, target);
          }
        },
        false,
      );
    },
    checkPlace({ action, method }) {
      if (action === 'pm' && method === 'index') {
        this.place = document.querySelector('#site > div > div.grid.m-reset-float > div > div > div > form > fieldset > div:nth-child(3) > fieldset');
        this.addEmojiButton = true;
      } else {
        document
          .querySelector('#commentForm > div > fieldset.row.buttons.dnone > div.button.ddC > div.dropdown > table')
          .remove();
        this.place = document.querySelector('#commentForm > div > fieldset.row.buttons.dnone > div.button.ddC > div.dropdown');
        this.addEmojiButton = false;
      }
      return this.place;
    },
    addButton({ place }) {
      const newBtn =
        '<div class="button ddC"><a href="#" class="emojibody-newlenny" title="( ͡° ͜ʖ ͡°)">( ͡° ͜ʖ ͡°)</a>' +
        '<a class="dropdown-show auto"><i class="fa fa-caret-down dark"></i></a>' +
        '<div class="dropdown"></div></div>';
      place.insertAdjacentHTML('afterbegin', newBtn);
      this.place = place.querySelector('div.button.ddC > div.dropdown');
    },
    splitObject({ listEmoticons, columnPerPage, rowPerPage }) {
      this.emojiArr = {};
      const emoticonsPerPage = columnPerPage * rowPerPage;
      const arrs = Math.ceil(listEmoticons.length / emoticonsPerPage);
      // eslint-disable-next-line
      for (let o = 0; o < arrs; o++) {
        this.emojiArr[o] = [];
      }
      let count = 0;
      // eslint-disable-next-line
      for (let p = 0; p < listEmoticons.length; p++) {
        if (p % emoticonsPerPage === 0 && p !== 0) {
          count += 1;
        }
        const eO = {};
        eO[p] = listEmoticons[p];
        this.emojiArr[count].push(eO);
      }
    },
    createMenu({ emojiArr, columnPerPage }) {
      const ul = document.createElement('ul');
      const liCount = columnPerPage * 3;
      ul.classList.add('emojimenu');
      // eslint-disable-next-line
      for (let i = 1; i <= Object.keys(emojiArr).length; i++) {
        const li = document.createElement('li');
        const a = `<a class="emojimenu-page" data-page="${i}">${i}</a>`;
        li.classList.add(`${i <= liCount ? 'emojimenu-displaypage' : 'hideelement'}`);
        if (i === 1) {
          li.classList.add('emojimenu-background');
        }
        li.insertAdjacentHTML('afterbegin', a);
        ul.appendChild(li);
      }
      return ul;
    },
    createBodyUl({ emojiArr }, i) {
      const emojiA = emojiArr[i];
      const ul = document.createElement('ul');
      ul.dataset.emojipage = `${i + 1}`;
      ul.classList.add('emojibody-page', `${i === 0 ? 'emojibody-displaypage' : 'hideelement'}`);
      emojiA.forEach((e, n) => {
        const [nr, emoji] = Object.entries(emojiA[n])[0];
        const li = `<li><a href="#" class="emojibody-newlenny" data-emojinr="${nr}" title="${emoji}">${emoji}</a></li>`;
        ul.insertAdjacentHTML('beforeend', li);
      });
      return ul;
    },
    createBody({ emojiArr }) {
      const div = document.createElement('div');
      const centerDiv = document.createElement('div');
      const prevPageDiv =
        '<div><a href="#" class="fa fa-chevron-left emojibody-prevpage"></a></div>';
      const nextPageDiv =
        '<div><a href="#" class="fa fa-chevron-right emojibody-nextpage"></a></div>';
      div.classList.add('emojibody');
      centerDiv.classList.add('emojibody-innerdiv');
      div.appendChild(centerDiv);
      centerDiv.insertAdjacentHTML('beforebegin', prevPageDiv);
      centerDiv.insertAdjacentHTML('afterend', nextPageDiv);
      Object.keys(emojiArr).forEach((e, i) =>
        centerDiv.insertAdjacentElement('beforeend', this.createBodyUl(this, i)));
      return div;
    },
    addEmojiElems({ place, menuElement, bodyElement }) {
      place.classList.add('dropdown-emoji');
      const menu = menuElement.cloneNode(true);
      const body = bodyElement.cloneNode(true);
      place.appendChild(menu);
      place.appendChild(body);
    },
    createEmojiElems() {
      this.menuElement = this.createMenu(this);
      this.bodyElement = this.createBody(this);
      this.addEmojiElems(this);
    },
    closeOptions(event) {
      event.preventDefault();
      this.emojiClickType = 'add';
      const { target } = event;
      const mainCont = target.closest('.emojioptions');
      const innerDiv = target.parentElement;
      const placeForEmoji = innerDiv.querySelector('.emojioptions-containeredit');
      mainCont.classList.add('hideelement');
      if (!placeForEmoji.classList.contains('hideelement')) {
        const open = innerDiv.querySelector('.emojioptions-openemojiedit');
        const close = innerDiv.querySelector('.emojioptions-closeemojiedit');
        placeForEmoji.classList.add('hideelement');
        open.classList.remove('hideelement');
        close.classList.add('hideelement');
      }
    },
    isNumber(value, n) {
      if (/^[0-9]+$/.test(value)) {
        return Number(value);
      }
      return n === 0 ? this.columnPerPage : this.rowPerPage;
    },
    saveOptions(event) {
      event.preventDefault();
      const { target } = event;
      const innerDiv = target.closest('.emojioptions-container');
      const inputCol = innerDiv.querySelector('.emojioptions-inputcol').value;
      const inputRow = innerDiv.querySelector('.emojioptions-inputrow').value;
      const newemoji = innerDiv.querySelector('.emojioptions-textarea').value;
      this.columnPerPage = this.isNumber(inputCol, 0);
      this.rowPerPage = this.isNumber(inputRow, 1);
      if (!/^ +$/.test(newemoji) && newemoji.length > 0) {
        this.listEmoticons.push(newemoji);
      }
      this.GM.setValue(this);
    },
    openEdit(event, { menuElement, bodyElement }) {
      event.preventDefault();
      this.emojiClickType = 'edit';
      const { target } = event;
      const innerDiv = target.closest('.emojioptions-container');
      const placeForEmoji = innerDiv.querySelector('.emojioptions-containeredit');
      const sibling = target.nextElementSibling;
      target.classList.add('hideelement');
      sibling.classList.remove('hideelement');
      placeForEmoji.classList.remove('hideelement');
      if (!placeForEmoji.querySelector('.dropdown-emoji')) {
        const div = document.createElement('div');
        div.classList.add('dropdown', 'dropdown-emoji', 'dropdown-emoji-edit');
        const menu = menuElement.cloneNode(true);
        const body = bodyElement.cloneNode(true);
        div.appendChild(menu);
        div.appendChild(body);
        placeForEmoji.appendChild(div);
      }
    },
    closeEdit(event) {
      event.preventDefault();
      this.emojiClickType = 'add';
      const { target } = event;
      const innerDiv = target.closest('.emojioptions-container');
      const sibling = target.previousElementSibling;
      const placeForEmoji = innerDiv.querySelector('.emojioptions-containeredit');
      target.classList.add('hideelement');
      sibling.classList.remove('hideelement');
      placeForEmoji.classList.add('hideelement');
    },
    resetOptions(event) {
      event.preventDefault();
      if (window.confirm('Czy chcesz zresetować opcje i emoji?')) {
        this.GM.deleteValue('mirkomoji');
      }
    },
    createOptions() {
      const div = document.createElement('div');
      const aClose = document.createElement('a');
      const btnsCont = document.createElement('div');
      const aSave = document.createElement('a');
      const aOpenE = document.createElement('a');
      const aCloseE = document.createElement('a');
      const aReset = document.createElement('a');
      const divContE = '<div class="emojioptions-containeredit hideelement"></div>';
      const text =
        '<div class="emojioptions-inputcontainer"><span>szerokość: </span>' +
        '<input class="emojioptions-input emojioptions-inputcol" type="number" step="any" min="1" placeholder="5"></input></div>' +
        '<div class="emojioptions-inputcontainer"><span>wysokość: </span>' +
        '<input class="emojioptions-input emojioptions-inputrow" type="number" step="any" min="1" placeholder="9"></input></div>' +
        '<textarea class="emojioptions-textarea" type="text" placeholder="add emoji"></textarea>';
      div.classList.add('emojioptions-container');
      aClose.href = '#';
      aClose.classList.add('emojioptions-closeoptions', 'fa', 'fa-times');
      aClose.addEventListener(
        'click',
        (event) => {
          this.closeOptions(event);
        },
        false,
      );
      div.appendChild(aClose);
      btnsCont.classList.add('emojioptions-buttonscontainer');
      aSave.href = '#';
      aSave.insertAdjacentText('afterbegin', 'Save');
      aSave.classList.add('emojioptions-saveoptions', 'button');
      aSave.addEventListener(
        'click',
        (event) => {
          this.saveOptions(event);
        },
        false,
      );
      btnsCont.appendChild(aSave);
      aOpenE.href = '#';
      aOpenE.insertAdjacentText('afterbegin', 'Edit emoji');
      aOpenE.classList.add('emojioptions-openemojiedit', 'button');
      aOpenE.addEventListener(
        'click',
        (event) => {
          this.openEdit(event, this);
        },
        false,
      );
      btnsCont.appendChild(aOpenE);
      aCloseE.href = '#';
      aCloseE.insertAdjacentText('afterbegin', 'Close edit');
      aCloseE.classList.add('emojioptions-closeemojiedit', 'button', 'hideelement');
      aCloseE.addEventListener(
        'click',
        (event) => {
          this.closeEdit(event);
        },
        false,
      );
      btnsCont.appendChild(aCloseE);
      aReset.href = '#';
      aReset.insertAdjacentText('afterbegin', 'Reset');
      aReset.classList.add('emojioptions-resetoptions', 'button');
      aReset.addEventListener(
        'click',
        (event) => {
          this.resetOptions(event);
        },
        false,
      );
      btnsCont.appendChild(aReset);
      div.appendChild(btnsCont);
      aClose.insertAdjacentHTML('afterend', text);
      btnsCont.insertAdjacentHTML('afterend', divContE);
      return div;
    },
    addOptions({ place }, { action, method }) {
      const div = document.createElement('div');
      div.classList.add('emojioptions', 'hideelement');
      const cont = this.createOptions();
      div.appendChild(cont);
      const options = '<a class="button fa fa-gear emojibar-options" href="#"></a>';
      document.body.appendChild(div);
      if (action === 'pm' && method === 'index') {
        const emojiel = document.querySelector('.button.ddC');
        emojiel.insertAdjacentHTML('afterend', options);
      } else {
        const fieldset = place.closest('fieldset');
        const surveyBtn = fieldset.querySelector('.openAddSurveyOverlay');
        surveyBtn.insertAdjacentHTML('afterend', options);
      }
    },
    addCss({ emojiArr, columnPerPage }) {
      const style = document.createElement('style');
      const liIm = Object.keys(emojiArr).length;
      const liCol = columnPerPage * 3;
      const csstxt = `
      .emojioptions {position: absolute;width: auto;height: auto;z-index: 9999999;border: 1px solid;border-radius: 6px;}.emojioptions-container {display: block;margin: 10px;}.emojioptions-closeoptions {font-size: 20px;width: 16px;height: 21px;}.emojioptions-inputcontainer {display: grid;grid-template-columns: 1fr 100px;margin-top: 10px;max-width: 170px;}.emojioptions-inputcontainer > span {padding-top: 8px;}.emojioptions-input {width: 50px !important;height: 35px;}.emojioptions-textarea {margin: 10px 0px 0px 0px !important;resize: both;min-width: 250px;}.emojioptions-buttonscontainer {margin-top: 10px;}.emojioptions-buttonscontainer > a {margin-right: 5px;}.emojioptions {background-color: #FFFFFF;}.night .emojioptions-input,.night .emojioptions {background-color: #2c2c2c;border-color: #444;color: #fff !important;}.dropdown-emoji-edit {display: block;position: sticky;margin-top: 10px;}.dropdown-emoji {width: auto;}.dropdown-emoji li {border-bottom: none !important;}.hideelement {display: none !important;}.emojibar-options {margin-left: 4px;}.emojimenu {border: 1px solid;border-bottom: 0px;grid-template-columns: repeat(${
  liIm <= liCol ? liIm : liCol
  }, 1fr);display: grid;font-size: 1.7rem;}.emojimenu-displaypage {display: grid;justify-content: center;grid-template-columns: 1fr;}.emojimenu-page {display: grid !important;justify-content: center;padding: 7px 0px 7px 0px !important;}.emojibody {display: grid;border-radius: 0px;border-bottom: 0px !important;grid-template-columns: auto 1fr auto;}.emojibody > div:first-child,.emojibody > div:last-child {display: grid;justify-content: center;vertical-align: middle;grid-template-rows: 1fr;}.emojibody-prevpage,.emojibody-nextpage {display: grid;justify-content: center;align-content: center;font-size: 2rem;width: 50px;}.emojibody > div:first-child {border-right: 1px solid;border-bottom: 1px solid;}.emojibody > div:last-child {border-bottom: 1px solid;}.emojibody-page > li {border-bottom: 1px solid !important;border-right: 1px solid;}.emojibody-page {max-height: 100% !important;display: grid;grid-template-columns: repeat(${columnPerPage}, 100px);border: 1px solid;}a.emojibody-newlenny {overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: center;padding: 10px !important;}.emojimenu {background-color: #FFF;}.emojimenu-background {background-color: #F1F4F5;}.emojimenu li:hover,.emojibody-prevpage:hover,.emojibody-nextnext:hover,.emojibody-page > li:hover {background-color: #F1F4F5;}.emojimenu,.emojibody > div:first-child,.emojibody > div:last-child,.emojibody-page > li,.emojibody-page {border-color: #BDC3C7 !important;}.emojimenu a,.emojibody a {color: #34495E !important;}.night .emojimenu {background-color: #2C2C2C;}.night .emojimenu-background {background-color: #444;}.night .emojimenu li:hover,.night .emojibody-prevpage:hover,.night .emojibody-nextpage:hover,.night .emojibody-page > li:hover {background-color: #3C3C3C !important;}.night .emojimenu,.night .emojibody > div:first-child,.night .emojibody > div:last-child,.night .emojibody-page > li,.night .emojibody-page {border-color: #444 !important;}.night .emojimenu a,.night .emojibody a {color: #CACECF !important;}`;
      style.type = 'text/css';
      style.insertAdjacentText('afterbegin', csstxt);
      document.head.appendChild(style);
    },
    addNewCont({ addEmojiButton }) {
      this.addCss(this);
      if (addEmojiButton) {
        this.addButton(this);
      }
      this.addOptions(this, wykop.params);
      this.createEmojiElems(this);
    },
    updateSettings(data) {
      this.listEmoticons = data.listEmoticons;
      this.columnPerPage = data.columnPerPage;
      this.rowPerPage = data.rowPerPage;
      this.splitObject(this);
    },
    GM: {
      setValue({ listEmoticons, rowPerPage, columnPerPage }) {
        const data = {};
        data.listEmoticons = listEmoticons;
        data.rowPerPage = rowPerPage;
        data.columnPerPage = columnPerPage;
        GM_setValue('mirkomoji', JSON.stringify(data));
      },
      getValue() {
        const value = GM_getValue('mirkomoji');
        return !value ? this.default : JSON.parse(value);
      },
      deleteValue(name) {
        GM_deleteValue(name);
      },
    },
    getLocalStorage() {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.GM.getValue.call(this));
        } catch (err) {
          reject(err);
        }
      });
    },
    init() {
      this.getLocalStorage().then((result) => {
        this.updateSettings(result);
        if (this.checkPlace(wykop.params)) {
          this.emojiClickType = 'add';
          this.addNewCont(this);
          this.addListener();
        }
      });
    },
  };
  wykopUserScript.init();
}());