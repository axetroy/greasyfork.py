// ==UserScript==
// @name         AO3: Fic's Style, Blacklist, Bookmarks
// @namespace    https://github.com/Schegge
// @version      3.4.6
// @description  Change font, size, width, background... of a work + blacklist/savior: hide works that contain certains tags, have too many fandoms/relations/chapters and other options + fullscreen reading mode + bookmarks: save the position you stopped reading a fic + number of words for each chapter and estimated reading time
// @author       Schegge
// @include      http*://archiveofourown.org/*
// @grant        none
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc0REE4QjE3Qjk1ODExRTY4MEZCQTc3RERGMTNGQ0Y0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc0REE4QjE4Qjk1ODExRTY4MEZCQTc3RERGMTNGQ0Y0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzREQThCMTVCOTU4MTFFNjgwRkJBNzdEREYxM0ZDRjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzREQThCMTZCOTU4MTFFNjgwRkJBNzdEREYxM0ZDRjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz78uZUsAAACeUlEQVR42uxZvW7bMBCWDaFLuih9A3bJrqJLVhVdigwFZGQPIHdpO9aPYC+dGz1CNXXpEiFzFq0NMtjIE0QvYNQ9Bh+BA6Mf0rKkBuABHyxQJPHxdPfdSZ7sdjvvOdrUe6bmiDvijrgj7og/mn/oDX/4T7YMCAkhxLW0nJARNnzip+32v/H4N8KaEIHsipASBMYv2WHG9TizS3haEp1r96S3C8yRT+IdobTZfNLUq1Q89iYLQEJ6Nib8RCi8NjicfBKLsUJFhsUViCwxlrasSdlaMZaqJPi9YCSKljX8fjwG8YQl2Vs2nhusVXPCMYjHB9gjGJq4gNyV3oA2PVCYyFhd1BzK5OAm+dAL8RTarHs9NAiPUYirpFSkM+3+R8Pc2FSs7ZV4BG+XNbp93uD1gOn9fMgYF/BYpukyb5z+oihF2tozwh/CS8KtasBsKnUX4jFI5jXVUO3/G+V/jUPcE37hkCeEL6zqBkMQT2pKuj72gnBMmKEneYXQ+sAOnsLrcd/EY4RKFfFSG1dzC5C80/twliPGHvc7EC8aEm9TMX+F6zcNWp6bEtinrVUvATbW1N5GiG+pLKlpa+t3SMo2CQuZ3An2FsTbYHV/ZePtfT2+RgyvDKrig5a08wY9l8k+I49nfSSnSjSTzfUkTWqSr2ROWPalKklFkTHptZV9RYgENcks+lAVFacLizXqE4Qi9Bma7mmhJmrUqLPHA1S/fYyH1bGm2zxRPRun+AbKECFEBItDVVCKmnZUYG3I3kW5fUfneEM4xfyZTYfYRnxZ0SDxF+Mc30Sqkrgp0Y4I7wnXUJqN7WOcuP+AHHFH3BF3xB1xR9zC/gkwALX7mp/233xAAAAAAElFTkSuQmCC
// ==/UserScript==

(function() {
   var check = {
      // Script version
      version: function() {
         if (getStorage('ficstyle_version', '346') !== 346) {
            setStorage('ficstyle_version', 346);
            return true;
         }
         return false;
      },
      // Blacklist: on search pages but not on personal user profile
      black: function() {
         let user = document.querySelector('#greeting .user a[href*="/users/"]');
         user = user ? window.location.pathname.indexOf(user.href.split('/users/')[1]) !== -1 : false;
         return document.querySelector('li.blurb.group:not(.collection)') && !user;
      },
      // Fic's style + fullscreen + bookmarking: include /works/(numbers) and /works/(numbers)/chapters/(numbers) and exclude /works/(whatever)navigate
      work: function() {
         return /\/works\/\d+(\/chapters\/\d+)?(?!.*navigate)/.test(window.location.pathname);
      },
      // Fullscreen
      fullScreen: false
   };

   // add estimated reading time for every fic found
   document.querySelectorAll('dl.stats dd.words').forEach(function(s) {
      let numWords = s.textContent.replace(/,/g, '');
      s.insertAdjacentHTML('afterend', '<dt>Time:</dt><dd>' + countTime(numWords) + '</dd>');
   });

   // BOOKMARKS
   var Bookmarks = {
      list: [],
      get: function() {
         this.list = getStorage('ficstyle_bookmarks', '[]');
      },
      set: function() {
         setStorage('ficstyle_bookmarks', this.list);
      },
      fromBook: window.location.search === '?bookmark',
      getUrl: window.location.pathname.split('/works/')[1],
      getTitle: function() {
         let title = document.querySelector('#workskin .preface.group h2.title.heading').textContent;
         title = title.trim().substring(0, 28);
         // if chapter by chapter, get the number of the chapter
         if (this.getUrl.indexOf('chapters') !== -1) {
            let chapter = document.querySelector('#chapters > .chapter > .chapter.preface.group > h3 > a').textContent;
            chapter = chapter.replace('Chapter ', 'ch');
            title += ' (' + chapter + ')';
         }
         return title;
      },
      getNewBook: function() {
         let newbook = getScroll();
         // if chapter by chapter view or work completed (number/number is the same), calculate as a percent
         if (window.location.pathname.indexOf('chapters') !== -1 || /(\d+)\/\1/.test(document.querySelector('dl.stats dd.chapters').textContent)) {
            newbook = (newbook / getDocHeight()).toFixed(4) + '%';
         }
         return newbook;
      },
      checkIfExist: function(a, b) {
         let url = b || this.getUrl;
         for (let i = 0; i < this.list.length; i++) {
            // if the same fic
            if (this.list[i][0].split('/chapters/')[0] === url.split('/chapters/')[0]) {
               if (a === 'cancel') {
                  return i;
               // if the same chapter
               } else if (this.list[i][0] === url) {
                  if (a === 'book') {
                     let book = this.list[i][2];
                     if (book.toString().indexOf('%') !== -1) {
                        book = parseFloat(book.replace('%', ''));
                        book *= getDocHeight();
                     }
                     return book;
                  }
                  return true;
               }
            }
         }
         return false;
      },
      cancel: function(url) {
         let found = this.checkIfExist('cancel', url);
         if (found !== false) this.list.splice(found, 1);
      },
      getNew: function() {
         this.cancel();
         this.list.push([this.getUrl, this.getTitle(), this.getNewBook()]);
         this.set();
      }
   };
   Bookmarks.get();

   // Bookmarks' menu
   addCSS(
      'ficstyle-menu',
      '#menu-bookmarks ul li { display: flex!important; align-items: center; justify-content: space-between; } ' +
      '#menu-bookmarks ul li a:first-child { flex-grow: 1; font-size: .9em; } ' +
      'a.delete-book-menu { color: #900!important; } '
   );

   var bmMenu = document.createElement('li');
   bmMenu.id = 'menu-bookmarks';
   bmMenu.className = 'dropdown';
   bmMenu.innerHTML = '<a>Bookmarks</a>';
   var bmMenuDrop = document.createElement('ul');
   bmMenuDrop.className = 'menu dropdown-menu';
   bmMenu.appendChild(bmMenuDrop);
   document.querySelector('#header > ul').appendChild(bmMenu);

   if (Bookmarks.list.length) {
      let clickDelete = function() {
         Bookmarks.cancel(this.getAttribute('data-url'));
         Bookmarks.set();
         this.style.display = 'none';
         this.previousSibling.style.opacity = '.4';
      };

      for (let i = 0; i < Bookmarks.list.length; i++) {
         let bmLi = document.createElement('li');
         bmLi.innerHTML = '<a href="https://archiveofourown.org/works/' + Bookmarks.list[i][0] + '?bookmark">' + Bookmarks.list[i][1] + '</a>';
         let deleteBookMenu = document.createElement('a');
         deleteBookMenu.className = 'delete-book-menu';
         deleteBookMenu.title = 'delete bookmark';
         deleteBookMenu.setAttribute('data-url', Bookmarks.list[i][0]);
         deleteBookMenu.textContent = 'x';
         deleteBookMenu.addEventListener('click', clickDelete);
         bmLi.appendChild(deleteBookMenu);
         bmMenuDrop.appendChild(bmLi);
      }
   } else {
      bmMenuDrop.innerHTML = '<li><a>No bookmark yet.</a></li>';
   }

   // BLACKLIST
   if (check.black()) {
      var Blacklist = {
         list: [],
         opts: {},
         where: 'li.blurb.group:not(.collection)',
         what: '.tags .tag, .required-tags span:not(.warnings) span.text, .header .fandoms .tag',
         get: function() {
            this.list = getStorage('ficstyle_blacklist', '[]');
            this.langs = getStorage('ficstyle_blacklist_langs', '[]');
            this.opts = getStorage('ficstyle_blacklist_opts', '{"show":true,"pause":false,"maxFandoms":0,"maxRelations":0,"maxChapters":0,"minIncomplete":0}');
         },
         set: function(v) {
            this.list = v.list.trim() ? JSON.parse('["' + v.list.trim().replace(/[\\"]/g, '\\$&').replace(/\n/g, '\\n').split(',').join('","') + '"]') : [];
            setStorage('ficstyle_blacklist', this.list);
            this.langs = v.langs.trim() ? JSON.parse('["' + v.langs.trim().replace(/[\\"]/g, '\\$&').split(',').join('","') + '"]') : [];
            setStorage('ficstyle_blacklist_langs', this.langs);
            this.opts.show = v.show;
            this.opts.pause = v.pause;
            this.opts.maxFandoms = v.maxFandoms ? Math.max(parseInt(v.maxFandoms, 10), 0) : 0;
            this.opts.maxRelations = v.maxRelations ? Math.max(parseInt(v.maxRelations, 10), 0) : 0;
            this.opts.maxChapters = v.maxChapters ? Math.max(parseInt(v.maxChapters, 10), 0) : 0;
            this.opts.minIncomplete = v.minIncomplete ? Math.max(parseInt(v.minIncomplete, 10), 0) : 0;
            setStorage('ficstyle_blacklist_opts', this.opts);
         },
         findFandoms: function(w) {
            return this.opts.maxFandoms && w.querySelectorAll('.header .fandoms .tag').length > this.opts.maxFandoms;
         },
         findRelations: function(w) {
            return this.opts.maxRelations && w.querySelectorAll('.tags .relationships .tag').length > this.opts.maxRelations;
         },
         findChapters: function(w) {
            return this.opts.maxChapters && w.querySelector('dd.chapters') && parseInt(w.querySelector('dd.chapters').textContent.split('/')[0], 10) > this.opts.maxChapters;
         },
         findIncomplete: function(w) {
            if (!this.opts.minIncomplete || !w.querySelector('dd.chapters') || /(\d+)\/\1/.test(w.querySelector('dd.chapters').textContent)) return false;
            let today = new Date();
            let last = new Date(w.querySelector('.datetime').textContent);
            return Math.abs(last.getTime() - today.getTime()) / (1000 * 3600 * 24 * 30.4) > this.opts.minIncomplete;
         },
         findLangs: function(w) {
            return this.langs.length && w.querySelector('dd.language') && this.langs.join(' ').toLowerCase().indexOf(w.querySelector('dd.language').textContent.toLowerCase().trim()) === -1;
         },
         findTags: function(w) {
            return Array.prototype.map.call(w.querySelectorAll(this.what), function(t) {
               return [t.textContent.trim(), t.parentElement.className];
            });
         },
         ifMatch: function(t) {
            return this.list.some(function(b) {
               b = b.trim().replace(/[.+?^${}()|[\]\\]/g, '\\$&');
               b = b.replace(/\*/g, '.*'); // wildcard
               b = b.replace(/(.+)&&(.+)/, '(?=.*$1)(?=.*$2).*'); // match 2 words in any order
               if (t[1] === 'relationships') b = b.replace(/(.+)&!(.+)/, '(?=.*\\/)((?=.*$1)(?!.*$2)|(?=.*$2)(?!.*$1)).*'); // only otp
               let reg = new RegExp('^' + b + '$', 'i');
               return reg.test(t[0]) === true;
            });
         },
         findMatch: function() {
            document.querySelectorAll(this.where).forEach(function(w) {
               if (this.opts.pause) return;
               if (this.opts.show) {
						let reasons = this.findTags(w).filter(this.ifMatch, this).map(function(r) { return r[0]; });
                  if (this.findRelations(w)) reasons.unshift('Relationships');
                  if (this.findChapters(w)) reasons.unshift('Chapters');
                  if (this.findFandoms(w)) reasons.unshift('Fandoms');
                  if (this.findIncomplete(w)) reasons.unshift('Incomplete');
                  if (this.findLangs(w)) reasons.unshift('Language');
                  if (!reasons.length) return;
                  w.setAttribute('data-visibility', 'hide');
                  w.setAttribute('data-reasons', reasons.join(', '));
               } else {
                  if (!this.findLangs(w) && !this.findIncomplete(w) && !this.findFandoms(w) && !this.findChapters(w) && !this.findRelations(w) && !this.findTags(w).some(this.ifMatch, this)) return;
                  w.setAttribute('data-visibility', 'remove');
               }
            }, this);
         },
         clear: function() {
            document.querySelectorAll(this.where + '[data-visibility]').forEach(function(el) {
               el.removeAttribute('data-visibility');
               el.removeAttribute('data-reasons');
            });
         },
         save: function() {
            this.set({
               list: document.getElementById('fs-blacklist').value,
               langs: document.getElementById('fs-blacklist-langs').value,
               show: document.getElementById('fs-blacklist-show').checked,
               pause: document.getElementById('fs-blacklist-pause').checked,
               maxFandoms: document.getElementById('fs-blacklist-maxFandoms').value,
               maxRelations: document.getElementById('fs-blacklist-maxRelations').value,
               maxChapters: document.getElementById('fs-blacklist-maxChapters').value,
               minIncomplete: document.getElementById('fs-blacklist-minIncomplete').value
            });
            this.clear();
            this.findMatch();
         }
      };
      Blacklist.get();
      Blacklist.findMatch();

      addCSS(
         'ficstyle-blacklist',
         '#menu-blacklist ul li { text-align: center!important; }' +
         '#menu-blacklist span { font-size: .85em; } ' +
         '#fs-black-save {color: #900!important; font-weight: bold; } ' +
         '.fs-black-opts { font-variant: small-caps; display: flex; flex-wrap: wrap; } ' +
         '.fs-black-opts span { width: 50%; } ' +
         '.fs-black-opts span:nth-child(5) { width: 100%; } ' +
         '.fs-black-opts span, #menu-blacklist .fs-black-info span { flex: auto; } ' +
         '.fs-black-info { font-size: .8em; display: flex; flex-wrap: nowrap; } ' +
         '#menu-blacklist input[type="checkbox"] { margin-top: .1em; } ' +
         '#menu-blacklist input[type="number"], #menu-blacklist input[type="text"] { width: 3em; padding: 0 0 0 .2em; background: #fff; border: 0; box-shadow: 0 0 0 1px #888; border-radius: 0; box-sizing: border-box; } ' +
         '#menu-blacklist input[type="text"] { width: auto; } ' +
         '#menu-blacklist textarea { font-size: .9em; line-height: 1.2em; min-height: 10em; margin: .5em!important; padding: .3em; box-shadow: 0 0 0 1px #888; width: calc(100% - 1em); border: 0; box-sizing: border-box; resize: vertical; } ' +
         '[data-visibility="remove"], [data-visibility="hide"] > :not(.header), [data-visibility="hide"] > .header > :not(h4) { display: none!important; } ' +
         '[data-visibility="hide"] { opacity: .6; } ' +
         '[data-visibility="hide"] > .header, [data-visibility="hide"] > .header > h4 { margin: 0!important; min-height: auto; font-size: .9em; font-style: italic; }' +
         '[data-visibility="hide"]::before { content: "\\2573  " attr(data-reasons); font-size: .8em; } '
      );
      // Blacklist's menu
      var blMenu = document.createElement('li');
      blMenu.id = 'menu-blacklist';
      blMenu.className = 'dropdown';
      blMenu.innerHTML = '<a>Blacklist</a><ul class="menu dropdown-menu" role="menu">' +
         '<li role="menu-item"><a id="fs-black-save">SAVE</a></li>' +
         '<li role="menu-item" style="padding: .5em 0;"><div class="fs-black-opts"><span>SHOW REASONS <input id="fs-blacklist-show" type="checkbox"' + (Blacklist.opts.show ? ' checked' : '') + '></span> <span>PAUSE <input id="fs-blacklist-pause" type="checkbox"' + (Blacklist.opts.pause ? ' checked' : '') + '></span></div></li>' +
         '<li role="menu-item" style="padding: .5em 0;">' +
         '<div class="fs-black-info"><span title="(comma)">separator: ,</span><span title="*: match zero or more of any character (letter, white space, symbol...) [it can be used multiple times in the same tag]">wildcard: *</span><span title="&&: match two pair of words in any order [it can be used only once in the same tag]">matched pair: &&</span><span title="&!: hide relationships that include only one person of your favourite ship [it can be used only once in the same tag]">only otp: &!</span></div>' +
         '<textarea id="fs-blacklist" spellcheck="false">' + Blacklist.list.join(',') + '</textarea>' +
         '<div class="fs-black-opts"><span>max fandoms <input id="fs-blacklist-maxFandoms" type="number" min="0" step="1" value="' + Blacklist.opts.maxFandoms + '"></span> <span>max relations <input id="fs-blacklist-maxRelations" type="number" min="0" step="1" value="' + Blacklist.opts.maxRelations + '"></span> <span>max chapters <input id="fs-blacklist-maxChapters" type="number" min="0" step="1" value="' + Blacklist.opts.maxChapters + '"></span>  <span title="for incompleted works">last updated <input id="fs-blacklist-minIncomplete" type="number" min="0" step="1" title="in months" value="' + Blacklist.opts.minIncomplete + '"></span> <span>languages <input type="text" id="fs-blacklist-langs" spellcheck="false" placeholder="leave empty for any" title="separate languages by a comma" value="' + Blacklist.langs.join(',') + '"></span></div>' +
         '</li></ul>';
      document.querySelector('#header > ul').appendChild(blMenu);

      document.getElementById('fs-black-save').addEventListener('click', function() {
         Blacklist.save();
         let self = this;
         self.textContent = 'SAVED';
         setTimeout(function() { self.textContent = 'SAVE'; }, 1000);
      });
   }

   // FIC'S STYLE + FULLSCREEN + BOOKMARKING
   if (check.work()) {
      addCSS(
         'ficstyle-general',
         // fic's style
         '#main div.wrapper { margin-bottom: 1em; } ' +
         '#workskin { margin: 0; text-align: justify; max-width: none!important; } ' +
         '#workskin .notes, #workskin .summary, blockquote { font-size: inherit; font-family: inherit; } ' +
         '.preface a, #chapters a, .preface a:link, #chapters a:link, .preface a:visited, #chapters a:visited, .preface a:visited:hover, #chapters a:visited:hover { color: inherit !important; } ' +
         '.actions { font-family: \'Lucida Grande\', \'Lucida Sans Unicode\', \'GNU Unifont\', Verdana, Helvetica, sans-serif; font-size: 14px; } ' +
         '.chapter .preface { border-top: 0; margin-bottom: 0; padding: 0 2em; }' +
         '.chapter .preface[role="complementary"] { border-width: 0; margin: 0; } ' +
         '.preface.group, div.preface { color: inherit; background-color: inherit; margin-left: 0; margin-right: 0; padding: 0 2em; } ' +
         '#workskin #chapters .preface .userstuff p { margin: .1em auto; line-height: 1.1em; } ' +
         'div.preface .byline a, #workskin #chapters a, #chapters a:link, #chapters a:visited { color: inherit; } ' +
         'div.preface .notes, div.preface .summary, div.preface .series, div.preface .children { min-height: 0; } ' +
         'div.preface .jump { margin-top: 1em; font-size: .9em; }' +
         '.preface blockquote { box-shadow: 0 0 0 2px rgba(0, 0, 0, .1), 0 0 0 2px rgba(255, 255, 255, .2); padding: .6em; margin: 0; }' +
         '.preface h3.title { background: repeating-linear-gradient(45deg, rgba(0, 0, 0, .05), rgba(0, 0, 0, .1) 2px, rgba(255, 255, 255, .2) 2px, rgba(255, 255, 255, .2) 4px); padding: .6em; margin: 0; } ' +
         '.preface h3.heading { font-size: inherit; border-width: 0; } ' +
         'h3.title a { border: 0; font-style: italic; } ' +
         'div.preface .associations, .preface .notes h3+p { margin-bottom: 0; font-style: italic; font-size: .8em; } ' +
         '#workskin #chapters, #workskin #chapters .userstuff { width: 100%!important; box-sizing: border-box; } ' +
         '#workskin #chapters .userstuff p { font-family: inherit; margin: .6em auto; text-align: justify; line-height: 1.5em; } ' +
         '#workskin #chapters .userstuff { font-family: inherit; text-align: justify; line-height: 1.5em } ' +
         '#workskin #chapters .userstuff br { display: block; margin-top: .6em; content: " "; } ' +
         '.userstuff hr { width: 100%; height: 1px; border: 0; margin: 1.5em 0; background-image: linear-gradient(90deg, transparent, rgba(0, 0, 0, .2), transparent), linear-gradient(90deg, transparent, rgba(255, 255, 255, .3), transparent); } ' +
         '#workskin #chapters .userstuff blockquote { padding-top: 1px; padding-bottom: 1px; margin: 0 .5em; font-size: inherit; } ' +
         '.userstuff img { max-width: 100%; height: auto; display: block; margin: auto; } ' +
         // options
         '#options.options-hide > div:nth-last-child(n+2) { display: none; } ' +
         '#options, .ficleft { position: fixed; bottom: 10px; margin: 0; padding: 0; font-family: Consolas, monospace; font-size: 16px; line-height: 18px; color: #000; text-shadow: 0 0 1px rgba(0, 0, 0, .4); background-color: rgba(255, 255, 255, .1); border-radius: .3em; z-index: 999; } ' +
         '#options { right: 0; } ' +
         '#options > div { margin: .4em 0 0 0; padding: 0 5px; cursor: pointer; } ' +
         '#options > div:last-child { display: block; padding: .3em .2em; color: #fff; background-color: rgba(0, 0, 0, .2); border-radius: 4px 0 0 4px; } ' +
         '#options a { border: 0; color: #000; } ' +
         '.fictop { margin: 1em 0 0; font-size: 80%; text-align: right; padding: 0; } ' +
         // chapter words
         '.chapterWords { font-size: .7em; color: inherit; font-family: consolas, monospace; text-transform: uppercase; text-align: center; margin: 3em 0 .5em; }'
      );

      // CSS changes depending on the user
      var Styling = {
         def: {
            fontName: [
               'inherit',
               'Verdana',
               'Segoe UI',
               'Georgia',
               'Garamond',
               'Book Antiqua',
               'monospace'
            ],
            colors: {
               // background, font color
               light: ['#ffffff', '#000000'],
               grey: ['#eeeeee', '#111111'],
               sepia: ['#fbf0d9', '#54331b'],
               dark: ['#3c3c3c', '#e1e1e1'],
               darkblue: ['#282a36', '#f8f8e6'],
               black: ['#000000', '#ffffff']
            },
            get: '{"fontName":"inherit","fontSize":100,"padding":7,"colors":"light"}'
         },
         opt: [
            ['previous font', '&laquo;', ['fontName', -1, 'array']],
            ['next font', '&raquo;', ['fontName', 1, 'array']],
            ['decrease font size', '-', ['fontSize', -2.5, 50]],
            ['increase font size', '+', ['fontSize', 2.5, 300]],
            ['decrease width', '&#9643;', ['padding', 1, 40]],
            ['increase width', '&#9633;', ['padding', -1, 0]],
            ['change background and color', '&#9642;', ['colors', 1, 'obj']],
            ['reset', 'r', ['reset']],
            ['show/hide menu', '&#9776;', 'show-hide']
         ],
         get: function() {
            return getStorage('ficstyle', this.def.get);
         },
         set: function(a, b) {
            let all = this.get();
            if (a && b) all[a] = b;
            setStorage('ficstyle', all);
            addCSS(
               'ficstyle-user-changes',
               '#workskin { font-family: ' + all.fontName + '; font-size: ' + all.fontSize + '%; padding: 0 ' + all.padding + '%; background-color: ' + this.def.colors[all.colors][0] + '; color: ' + this.def.colors[all.colors][1] + '; }'
            );
         },
         reset: function() {
            setStorage('ficstyle', this.def.get);
            this.set();
         },
         changeVar: function(a) {
            // arguments: 0 name, 1 direction/increment, 2 type/limit
            let pos = getScroll() / getDocHeight();
            if (a.length > 1) {
               let cur = this.get()[a[0]];
               if (typeof a[2] === 'string') {
                  let arr = a[2] === 'obj' ? Object.keys(this.def[a[0]]) : this.def[a[0]];
                  let end = a[1] === 1 ? arr.length : -1;
                  let next = arr.indexOf(cur) + a[1];
                  cur = arr[next !== end ? next : arr.length - end * a[1]];
               } else {
                  cur += a[1];
                  if (Math.sign(a[1]) * cur > a[2] * Math.sign(a[1])) cur = a[2];
               }
               this.set(a[0], cur);
            } else {
               this.reset();
            }
            setScroll(pos * getDocHeight());
         }
      };
      Styling.set();

      // the options displayed on the page
      var options = document.createElement('div');
      options.id = 'options';
      options.className = 'options-hide';

      for (let i = 0; i < Styling.opt.length; i++) {
         let el = document.createElement('div');
         el.title = Styling.opt[i][0];
         el.innerHTML = Styling.opt[i][1];
         options.appendChild(el);
         el.addEventListener('click', function() {
            if (Styling.opt[i][2] === 'show-hide') {
               this.parentElement.className = this.parentElement.className === 'options-hide' ? '' : 'options-hide';
            } else {
               Styling.changeVar(Styling.opt[i][2]);
            }
         });
      }
      document.body.appendChild(options);

      // remove all the non-breaking white spaces
      document.getElementById('chapters').innerHTML = document.getElementById('chapters').innerHTML.replace(/&nbsp;/g, ' ');

      // # words and time for every chapter, if the fic has chapters
      document.querySelectorAll('#chapters > .chapter > div.userstuff.module').forEach(function(el) {
         let numWords = el.textContent.match(/\S+\b/g).length - 2; // -2 because of hidden <h3>Chapter Text</h3>
         el.parentNode.querySelector('.chapter.preface.group[role="complementary"]').insertAdjacentHTML('beforebegin', '<div class="chapterWords">this chapter has ' + numWords + ' words (time: ' + countTime(numWords) + ')</div>');
      });

      // FULL SCREEN MODE
      var workskin = document.getElementById('workskin');

      var ficTop = document.createElement('div');
      ficTop.className = 'actions fictop';
      var toFullScreen = document.createElement('div');
      toFullScreen.innerHTML = '<a>Full Screen</a>';
      ficTop.appendChild(toFullScreen);
      workskin.insertAdjacentElement('afterbegin', ficTop);

      // changes to create full screen
      var fullScreen = function() {
         if (check.fullScreen) {
            window.location.replace(window.location.pathname);
            return;
         }

         setScroll();
         check.fullScreen = true;

         addCSS(
            'ficstyle-fullscreen',
            '#outer { display: none; } ' +
            '#workskin .preface { margin: 0; padding-bottom: 0; } ' +
            'div.preface .module { padding-bottom: 0; text-align: center; } ' +
            '.preface .module h3.heading { display: inline; cursor: pointer; text-align: center; opacity: .5; font-style: italic; font-size: 100%; } ' +
            '.preface .module > :not(h3) { display: none; } ' +
            '.preface h3 + p { border: 3px solid rgba(0, 0, 0, .1); border-left: 0; border-right: 0; padding: .6em; margin: 0; }' +
            '.preface .module > h3:hover ~ .userstuff, .preface .module > .userstuff:hover, ' +
            '.preface .module > h3:hover ~ ul, .preface .module > ul:hover, ' +
            '.preface .module > h3:hover + p, .preface .module > h3 + p:hover { display: block!important; position: absolute; width: 100%; max-height: 6em; font-size: .8em; transform: translateY(-100%); color: rgb(42, 42, 42); background-color: #fff; padding: 10px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .4); margin: 0; overflow: auto; z-index: 999; cursor: pointer; } ' +
            '.no-book, .actions:not(.fictop) li > a:not([href*="chapters"]) { display: none; } ' +
            '.actions:not(.fictop) { margin-top: 2em; } ' +
            '.ficleft { left: 10px; padding-left: .5em; } ' +
            '.ficleft a { border: 0; color: #000; margin-right: .3em; padding: 0 .2em 0 .1em; } '
         );

         document.body.appendChild(workskin);
         toFullScreen.innerHTML = '<a>Exit</a>';

         let goToBook = document.createElement('div');
         goToBook.innerHTML = '<a>Go to Bookmark</a>';
         goToBook.addEventListener('click', function() { setScroll(Bookmarks.checkIfExist('book')); });

         let ficLeft = document.createElement('div');
         ficLeft.className = 'ficleft';

         let goUp = document.createElement('a');
         goUp.title = 'up';
         goUp.textContent = '^';
         goUp.addEventListener('click', setScroll);

         let deleteBook = document.createElement('a');
         deleteBook.title = 'delete bookmark';
         deleteBook.textContent = 'x';
         deleteBook.addEventListener('click', function() {
            Bookmarks.cancel();
            Bookmarks.set();
            this.className = 'no-book';
            goToBook.className = 'no-book';
         });

         let newBook = document.createElement('a');
         newBook.title = 'new bookmark';
         newBook.textContent = '+';
         newBook.addEventListener('click', function() {
            Bookmarks.getNew();
            goToBook.className = '';
            deleteBook.className = '';
         });

         if (!Bookmarks.checkIfExist()) {
            deleteBook.className = 'no-book';
            goToBook.className = 'no-book';
         }

         ficTop.insertBefore(goToBook, toFullScreen);
         ficLeft.appendChild(goUp);
         ficLeft.appendChild(newBook);
         ficLeft.appendChild(deleteBook);
         document.body.appendChild(ficLeft);

         workskin.appendChild(document.querySelector('#feedback .actions'));
      };
      if (Bookmarks.fromBook) fullScreen();
      toFullScreen.addEventListener('click', fullScreen);
   }

   // NEW VERSION NOTIFICATION
   if (check.version()) {
      document.body.insertAdjacentHTML('beforeend', '<div style="position: fixed; bottom: 50px; right: 50px; width: 40%; z-index: 999;font-size: .8em; background: #fff; padding: 1em; border: 1px solid #900;"><b>AO3: Fic\'s Style, Blacklist, Bookmarks</b> UPDATES (v3.4.6)<br><br>Blacklist:<br>- Hide incompleted works that have been last updated "x" months ago.<br><br><span id="fs-close" style="cursor: pointer; color: #900;">close</span>');
      document.getElementById('fs-close').addEventListener('click', function() { this.parentElement.style.display = 'none'; });
   }

   // GLOBAL FUNCTIONS
   function addCSS(id, css) {
      if (!document.querySelector('style#' + id)) {
         let style = document.createElement('style');
         style.id = id;
         style.textContent = css;
         document.getElementsByTagName('head')[0].appendChild(style);
      } else {
         document.querySelector('style#' + id).textContent = css;
      }
   }

   function countTime(num) {
      // estimate reading time: 200 wpm
      let time = (parseInt(num, 10) / 200 / 60).toFixed(2).toString().split('.');
      return (time[0] !== '0' ? time[0] + 'hr ' : '') + (time[1] !== '00' ? Math.round(parseInt(time[1], 10) / 100 * 60) + 'min' : '') || '<1min';
   }

   function getScroll() {
      return Math.max(document.documentElement.scrollTop, window.scrollY);
   }
   function setScroll(s) {
      window.scroll(0, s ? s : 0);
   }
   function getDocHeight() {
      return Math.max(document.documentElement.scrollHeight, document.documentElement.offsetHeight, document.body.scrollHeight, document.body.offsetHeight);
   }

   function getStorage(key, def) {
      return JSON.parse(localStorage.getItem(key) || def);
   }
   function setStorage(key, value) {
      localStorage.setItem(key, typeof value !== 'string' ? JSON.stringify(value) : value);
   }
})();
