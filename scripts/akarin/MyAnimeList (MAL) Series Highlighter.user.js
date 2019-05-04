// ==UserScript==
// @name        MyAnimeList (MAL) Series Highlighter
// @namespace   https://greasyfork.org/users/7517
// @description Highlights entries that already exist on your MAL lists
// @icon        http://i.imgur.com/b7Fw8oH.png
// @version     2.4.1
// @author      akarin
// @include     /^https?:\/\/myanimelist\.net\/?$/
// @include     /^https?:\/\/myanimelist\.net\/(anime|manga)\/(season|genre|producer|magazine)/
// @include     /^https?:\/\/myanimelist\.net\/watch/
// @include     /^https?:\/\/myanimelist\.net\/search/
// @include     /^https?:\/\/myanimelist\.net\/(anime|manga)\.php\?.*\S=/
// @include     /^https?:\/\/myanimelist\.net\/(anime|manga)\/\d+\/[^\/]+\/userrecs/
// @include     /^https?:\/\/myanimelist\.net\/top(anime|manga)\.php/
// @include     /^https?:\/\/myanimelist\.net\/(index|addtolist|recommendations)\.php/
// @include     /^https?:\/\/myanimelist\.net\/(character|people)(\.php\?id=|\/)\d+/
// @include     /^https?:\/\/myanimelist\.net\/clubs\.php\?cid=\d+/
// @grant       none
// @noframes
// ==/UserScript==

(function ($) {
  'use strict';

  const MSH_HIGHTLIGHT = 'msh_highlight';
  const MSH_HIGHTLIGHT_PARENT = 'msh_highlight_parent';

  const STATE_TYPE = {
    NONE: 0,
    LOADING: 1,
    COMPLETE: 2
  };

  class Entries {
    constructor (username, type) {
      this.username = username;
      this.type = type;
      this.state = STATE_TYPE.NONE;
      this.ids = [];
    }

    load (callback) {
      switch (this.state) {
        case STATE_TYPE.COMPLETE:
          callback(this.ids);
          break;
        case STATE_TYPE.LOADING:
          break;
        default:
          this.state = STATE_TYPE.LOADING;
          $.get('/malappinfo.php?u=' + this.username + '&status=all&type=' + this.type, (data) => {
            this.ids = [];
            $(this.type, data).each((i, el) => {
              const id = $('series_' + this.type + 'db_id', el).text().trim();
              this.ids.push(parseInt(id));
            });
            this.state = STATE_TYPE.COMPLETE;
            callback(this.ids);
          });
      }
    }
  }

  class Userlist {
    constructor (username) {
      this.username = username;
      ['anime', 'manga'].forEach((type) => {
        this[type] = new Entries(this.username, type);
      });
    }
  }

  class Highlighter {
    constructor () {
      this.selector = '';
      this.highlight = (e) => {
        $('a.button_edit', e.target || e).each((i, el) => {
          $(el).closest(this.selector).addClass(MSH_HIGHTLIGHT);
        });
      };
    }
  }

  function main (url) {
    let userlist = new Userlist($('.header-profile-link').text());
    let h = new Highlighter();

    const highlightTop = (e) => {
      $('.top-ranking-table .status .btn-addEdit-large:not(.notinmylist)', e.target || e).each(function () {
        $(this).closest('tr').addClass(MSH_HIGHTLIGHT)
          .closest('table').addClass(MSH_HIGHTLIGHT_PARENT);
      });
    };

    const highlightQuickAdd = (e) => {
      $('a.btn-status-edit', e.target || e).each(function () {
        $(this).closest('div').addClass(MSH_HIGHTLIGHT)
          .closest('div').addClass(MSH_HIGHTLIGHT_PARENT);
      });
    };

    const highlightClub = (e) => {
      ['Anime', 'Manga'].forEach((type) => {
        let el = $('div.normal_header:contains(' + type + ' Relations)', e.target || e);
        if (el.length > 0) {
          userlist[type.toLowerCase()].load((ids) => {
            const re = new RegExp('^(' + ids.join('|') + ')$');
            el.nextUntil(':not(.borderClass)').each(function () {
              const id = $('a', this).prop('href').match(/\d+/)[0];
              if (id && id.match(re)) {
                $(this).addClass(MSH_HIGHTLIGHT);
              }
            });
          });
        }
      });
    };

    const highlightOther = (e) => {
      $('a.button_edit', e.target || e).each(function () {
        let el = $(this).closest('div.seasonal-anime');
        if (el.length > 0) {
          el.addClass(MSH_HIGHTLIGHT);
        } else {
          el = $(this).closest('td');
          if (el.hasClass('borderClass') || el.hasClass('status')) {
            el.closest('tr').addClass(MSH_HIGHTLIGHT)
              .closest('table').addClass(MSH_HIGHTLIGHT_PARENT);
          }
        }
      });
    };

    if (url.match(/^https?:\/\/myanimelist\.net(\/?$|\/index\.php)/)) {
      h.selector = 'div.item';
    } else if (url.match(/^https?:\/\/myanimelist\.net\/(anime|manga)\/\d+/)) {
      h.selector = 'div.borderClass';
    } else if (url.match(/^https?:\/\/myanimelist\.net\/recommendations\.php/)) {
      h.selector = 'td';
    } else if (url.match(/^https?:\/\/myanimelist\.net\/watch/)) {
      h.selector = 'div.watch-anime, div.video-info-title';
    } else if (url.match(/^https?:\/\/myanimelist\.net\/search/)) {
      h.selector = 'div.list';
    } else if (url.match(/^https?:\/\/myanimelist\.net\/top(anime|manga)\.php/)) {
      h.highlight = highlightTop;
    } else if (url.match(/^https?:\/\/myanimelist\.net\/addtolist\.php/)) {
      h.highlight = highlightQuickAdd;
    } else if (url.match(/^https?:\/\/myanimelist\.net\/clubs/)) {
      h.highlight = highlightClub;
    } else {
      h.highlight = highlightOther;
    }

    h.highlight($('body').on('DOMNodeInserted', h.highlight));
  }

  if ($('#malLogin').length === 0) {
    main(document.URL);

    $('<style type="text/css" />').html(
      '.' + MSH_HIGHTLIGHT + ' [class*="bgColor"],' +
      '.' + MSH_HIGHTLIGHT_PARENT + ' [class*="bgColor"],' +
      '.quickadd-content div[class^="quickAdd"][class$="-result-unit"] {' +
          'background-color: transparent !important;' +
      '}' +
      '.' + MSH_HIGHTLIGHT + ' {' +
          'background-color: #ccede4 !important;' +
      '}' +
      '.' + MSH_HIGHTLIGHT_PARENT + '.top-ranking-table tr.ranking-list td {' +
          'background-color: transparent !important;' +
          'border-bottom: 1px solid rgb(235, 235, 235) !important;' +
      '}' +
      '.' + MSH_HIGHTLIGHT_PARENT + '.top-ranking-table .' + MSH_HIGHTLIGHT + ' .title .information,' +
      '.' + MSH_HIGHTLIGHT_PARENT + '.top-ranking-table .' + MSH_HIGHTLIGHT + ' .your-score .text {' +
          'color: #323232 !important;' +
      '}'
    ).appendTo('head');
  }
}(jQuery));
