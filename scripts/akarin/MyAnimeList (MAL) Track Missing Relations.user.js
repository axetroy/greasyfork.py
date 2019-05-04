// ==UserScript==
// @name        MyAnimeList (MAL) Track Missing Relations
// @namespace   https://greasyfork.org/users/7517
// @description Allows to find missing relations and entries with wrong chapter/episode count
// @icon        http://i.imgur.com/b7Fw8oH.png
// @version     8.4.3
// @author      akarin
// @include     /^https?:\/\/myanimelist\.net\/profile/
// @require     https://cdnjs.cloudflare.com/ajax/libs/pako/1.0.6/pako.min.js
// @grant       none
// @noframes
// ==/UserScript==

(function ($) {
  'use strict';

  if ($('#malLogin').length > 0) {
    return;
  }

  let mal = {
    title: 'Missing Relations',
    name: '',
    type: 'anime'
  };

  const USER_STATUS = {
    IN_PROCESS: 1, COMPLETED: 2, ON_HOLD: 3, DROPPED: 4, PLAN_TO: 6
  };

  const SERIES_STATUS = {
    IN_PROCESS: 1, COMPLETED: 2, NOT_YET: 3
  };

  const OPTS = {
    CACHE_VERSION: '8.3',
    EXPAND_LONG: 100,
    EXPAND_LONG_R: 101,
    HIDE_NOTYET: 102,
    HIDE_AIRING: 103
  };

  class Cache {
    constructor (name, username) {
      this.name = name;
      this.username = username;
      this.objects = [
        'left', 'graph', 'title', 'status', 'wrong', 'hidden', 'airing'
      ];
      this.data = {};
      this.init();
    }

    init () {
      this.objects.forEach((obj) => {
        this.data[obj] = {};
      });
    }

    load () {
      this.clear();
      this.objects.forEach((obj) => {
        this.data[obj] = this.loadValue('mal.entries.' + obj, this.data[obj], mal.type);
      });
    }

    save () {
      this.objects.forEach((obj) => {
        this.saveValue('mal.entries.' + obj, this.data[obj], mal.type);
      });
    }

    clear () {
      let hidden = this.data.hasOwnProperty('hidden') ? this.data.hidden : {};
      this.init();
      this.data.hidden = hidden;
    }

    encodeKey (key, type) {
      return this.name + '#' + OPTS.CACHE_VERSION + '#' + this.username + '#' + type + '#' + key;
    }

    loadValue (key, value, type) {
      try {
        let result = JSON.parse(localStorage.getItem(this.encodeKey(key, type)));
        return result == null ? value : result;
      } catch (e) {
        console.error(e.name + ': ' + e.message);
        return value;
      }
    }

    saveValue (key, value, type) {
      localStorage.setItem(this.encodeKey(key, type), JSON.stringify(value));
    }

    export (type) {
      let json = {};
      this.objects.forEach((obj) => {
        json[obj] = this.loadValue('mal.entries.' + obj, {}, type);
      });
      return json;
    }

    import (type, json) {
      if (json !== Object(json)) {
        return;
      }
      Object.keys(json).forEach((obj) => {
        this.saveValue('mal.entries.' + obj, json[obj], type);
      });
    }
  }

  class MalData {
    constructor (username, type, offset, delay) {
      this.username = username;
      this.type = type;
      this.offset = offset;
      this.delay = delay;
      this.running = false;
      this.data = {};
      this.size = 0;
    }

    clear () {
      this.running = false;
      this.data = {};
      this.size = 0;
    }

    load (callbacks, filter, offset) {
      if (!this.running) {
        return;
      }

      const hasFilter = Array.isArray(filter) && filter.length > 0;

      $.ajax({
        url: '/' + this.type + 'list/' + this.username + '/load.json?status=7&offset=' + offset,
        dataType: 'json'
      })
        .done((data) => {
          const len = data.length;
          if (Array.isArray(data) && len > 0) {
            data.forEach((entry) => {
              this.data[entry[this.type + '_id']] = hasFilter ? Object.keys(entry)
                .filter(key => filter.includes(key))
                .reduce((obj, key) => {
                  obj[key] = entry[key];
                  return obj;
                }, {}) : entry;
            });

            this.size = this.size + len;
            if (callbacks.hasOwnProperty('onNext')) {
              callbacks.onNext(this.size);
            }

            setTimeout(() => {
              this.load(callbacks, filter, offset + this.offset);
            }, this.delay);
          } else {
            this.running = false;
            if (callbacks.hasOwnProperty('onFinish')) {
              callbacks.onFinish(Object.assign({}, this.data));
            }
            this.clear();
          }
        })
        .fail(() => {
          this.clear();
          if (callbacks.hasOwnProperty('onError')) {
            callbacks.onError();
          }
        });
    }

    populate (callbacks, filter) {
      if (this.running) {
        return;
      }

      this.clear();
      this.running = true;
      this.load(callbacks, filter, 0);
    }
  }

  function toHtmlId (str) {
    return String(str).trim().toLowerCase().replace(/\s/g, '_').replace(/[^\w]/g, '_');
  }

  function toHtmlStr (str) {
    return String(str).trim().replace(/"/g, '&quot;');
  }

  mal.settings = {
    ajaxDelay: 800,
    ajaxTimeout: 30000,
    windowWidth: 700,
    windowHeight: 770,
    footerHeight: 88,
    footerSwitchHeight: 10,

    availableRelations: [
      'Alternative Setting', 'Alternative Version', 'Character', 'Full Story', 'Other',
      'Parent Story', 'Prequel', 'Sequel', 'Side Story', 'Spin-off', 'Summary'
    ],
    availableStatus: {
      anime: ['Watching', 'Completed', 'On-Hold', 'Dropped', 'Plan to Watch'],
      manga: ['Reading', 'Completed', 'On-Hold', 'Dropped', 'Plan to Read']
    },
    otherSettings: {
      anime: [
        { id: OPTS.EXPAND_LONG, text: 'Expand long lists (both)', footer: true, def: false, val: false },
        { id: OPTS.EXPAND_LONG_R, text: 'Expand long lists (right)', footer: true, def: false, val: false },
        { id: OPTS.HIDE_NOTYET, text: 'Hide unaired entries (from your list)', footer: false, def: false, val: false },
        { id: OPTS.HIDE_AIRING, text: 'Hide airing entries (from your list)', footer: false, def: false, val: false }
      ],
      manga: [
        { id: OPTS.EXPAND_LONG, text: 'Expand long lists (both)', footer: true, def: false, val: false },
        { id: OPTS.EXPAND_LONG_R, text: 'Expand long lists (right)', footer: true, def: false, val: false },
        { id: OPTS.HIDE_NOTYET, text: 'Hide unpublished entries (from your list)', footer: false, def: false, val: false },
        { id: OPTS.HIDE_AIRING, text: 'Hide publishing entries (from your list)', footer: false, def: false, val: false }
      ]
    },

    excludedRelations: { anime: [], manga: [] },
    excludedStatus: {
      left: { anime: [], manga: [] },
      right: { anime: [], manga: [] }
    },

    load: function () {
      ['anime', 'manga'].forEach(function (type) {
        mal.settings.excludedRelations[type] = ['Adaptation'];
        mal.settings.availableRelations.forEach(function (val) {
          const id = 'mr_xr' + type[0] + '_' + toHtmlId(val);
          const flag = mal.cache.loadValue(id, 'false', 'global');
          if (flag === 'true' || flag === true) {
            mal.settings.excludedRelations[type].push(val);
          }
        });

        ['left', 'right'].forEach(function (status) {
          mal.settings.excludedStatus[status][type] = ['Empty Status'];
          mal.settings.availableStatus[type].forEach(function (val) {
            const id = 'mr_xs' + status[0] + type[0] + '_' + toHtmlId(val);
            const flag = mal.cache.loadValue(id, 'false', 'global');
            if (flag === 'true' || flag === true) {
              mal.settings.excludedStatus[status][type].push(val);
            }
          });
        });

        mal.settings.otherSettings[type].forEach(function (opt) {
          const id = 'mr_xo' + type[0] + '_' + opt.id;
          const flag = mal.cache.loadValue(id, opt.def === true ? 'true' : 'false', 'global');
          opt.val = (flag === 'true' || flag === true);
        });
      });
    },

    export: function (type) {
      let json = {};

      json.relations = {};
      mal.settings.availableRelations.forEach((val) => {
        const flag = mal.cache.loadValue('mr_xr' + type[0] + '_' + toHtmlId(val), 'false', 'global');
        json.relations[val] = (flag === 'true' || flag === true);
      });

      ['left', 'right'].forEach((status) => {
        json['hide_' + status] = {};
        mal.settings.availableStatus[type].forEach((val) => {
          const flag = mal.cache.loadValue('mr_xs' + status[0] + type[0] + '_' + toHtmlId(val), 'false', 'global');
          json['hide_' + status][val] = (flag === 'true' || flag === true);
        });
      });

      let flag = mal.cache.loadValue('mr_xsr' + type[0] + '_empty_status', 'false', 'global');
      json.hide_right.empty_status = (flag === 'true' || flag === true);

      json.other = {};
      mal.settings.otherSettings[type].forEach((opt) => {
        const flag = mal.cache.loadValue('mr_xo' + type[0] + '_' + opt.id, opt.def === true ? 'true' : 'false', 'global');
        json.other[opt.id] = (flag === 'true' || flag === true);
      });

      flag = mal.cache.loadValue('mr_xo' + type[0] + '_quick_settings', 'false', 'global');
      json.other.quick_settings = (flag === 'true' || flag === true);

      return json;
    },

    import: function (type, json) {
      if (json !== Object(json)) {
        return;
      }

      let keys = json.hasOwnProperty('relations') ? Object.keys(json.relations) : [];
      keys.forEach((val) => {
        const flag = json.relations[val] === true ? 'true' : 'false';
        mal.cache.saveValue('mr_xr' + type[0] + '_' + toHtmlId(val), flag, 'global');
      });

      ['left', 'right'].forEach((status) => {
        keys = json.hasOwnProperty('hide_' + status) ? Object.keys(json['hide_' + status]) : [];
        keys.forEach((val) => {
          const flag = json['hide_' + status][val] === true ? 'true' : 'false';
          mal.cache.saveValue('mr_xs' + status[0] + type[0] + '_' + toHtmlId(val), flag, 'global');
        });
      });

      if (json.hide_right === Object(json.hide_right)) {
        const flag = json.hide_right.empty_status === true ? 'true' : 'false';
        mal.cache.saveValue('mr_xsr' + type[0] + '_empty_status', flag, 'global');
      }

      keys = json.hasOwnProperty('other') ? Object.keys(json.other) : [];
      keys.forEach((id) => {
        const flag = json.other[id] === true ? 'true' : 'false';
        mal.cache.saveValue('mr_xo' + type[0] + '_' + id, flag, 'global');
      });

      if (json.other === Object(json.other)) {
        const flag = json.other.quick_settings === true ? 'true' : 'false';
        mal.cache.saveValue('mr_xo' + type[0] + '_quick_settings', flag, 'global');
      }
    },

    reset: function () {
      ['anime', 'manga'].forEach(function (type) {
        mal.settings.availableRelations.forEach(function (val) {
          mal.cache.saveValue('mr_xr' + type[0] + '_' + toHtmlId(val), 'false', 'global');
        });

        ['left', 'right'].forEach(function (status) {
          mal.settings.availableStatus[type].forEach(function (val) {
            mal.cache.saveValue('mr_xs' + status[0] + type[0] + '_' + toHtmlId(val), 'false', 'global');
          });
        });
        mal.cache.saveValue('mr_xsr' + type[0] + '_empty_status', 'false', 'global');

        mal.settings.otherSettings[type].forEach(function (opt) {
          opt.val = opt.def === true;
          mal.cache.saveValue('mr_xo' + type[0] + '_' + opt.id, opt.def === true ? 'true' : 'false', 'global');
        });
        mal.cache.saveValue('mr_xo' + type[0] + '_quick_settings', 'false', 'global');
      });
    }
  };

  $.fn.myfancybox = function (onstart) {
    return $(this).click(function () {
      mal.fancybox.show(onstart);
    });
  };

  mal.fancybox = {
    body: $('<div id="mr_fancybox_inner">'),
    outer: $('<div id="mr_fancybox_outer">'),
    wrapper: $('<div id="mr_fancybox_wrapper">'),

    init: function (el) {
      mal.fancybox.outer.hide().append(mal.fancybox.body).insertAfter(el);
      mal.fancybox.wrapper.hide().click(mal.fancybox.hide).insertAfter(el);
    },

    show: function (onstart) {
      mal.fancybox.body.children().hide();
      if (!onstart()) {
        mal.fancybox.hide();
        return;
      }
      mal.fancybox.wrapper.show();
      mal.fancybox.outer.show();
    },

    hide: function () {
      mal.fancybox.outer.hide();
      mal.fancybox.wrapper.hide();
    }
  };

  mal.entries = {
    status: {
      updating: false,
      total: 0,
      done: 0,
      fail: 0,
      skip: 0,

      clear: function () {
        mal.entries.status.total = 0;
        mal.entries.status.done = 0;
        mal.entries.status.fail = 0;
        mal.entries.status.skip = 0;
      }
    },

    updating: function (strict) {
      return (strict && mal.entries.status.updating) ||
            ((mal.entries.status.done + mal.entries.status.fail + mal.entries.status.skip) < mal.entries.status.total);
    },

    update: function (recalc) {
      let userlist = [];
      let processed = {};
      let right = {};
      let excludedRelationsRe = new RegExp('^(' + mal.settings.excludedRelations[mal.type].join('|') + ')$', 'i');

      function setRelations (idLeft, idRight) {
        idLeft = parseInt(idLeft);
        idRight = parseInt(idRight);
        if (isNaN(idLeft) || isNaN(idRight)) {
          return;
        }

        [{ x: idLeft, y: idRight }, { x: idRight, y: idLeft }].forEach(function (rel) {
          if (!mal.cache.data.graph.hasOwnProperty(rel.x)) {
            mal.cache.data.graph[rel.x] = [];
          }
          if (mal.cache.data.graph[rel.x].indexOf(rel.y) < 0) {
            mal.cache.data.graph[rel.x].push(rel.y);
          }
        });
      }

      function getRelations (idLeft, data) {
        idLeft = parseInt(idLeft);
        if (isNaN(idLeft)) {
          return;
        }

        $('#dialog .normal_header + form > br ~ div > small', data).each(function () {
          const val = $('input[id^="relationGen"]', this).val();
          if (!val.match(/^\d+\s\(/) || val.match(/^\d+\s\(\)$/)) {
            console.log('Empty Relation: /' + mal.type + '/' + idLeft);
            return;
          }

          const idRight = parseInt(val.match(/\d+/)[0]);
          if (!isNaN(idRight) && !$('select[name^="relationTypeId"] option:selected', this).text().match(excludedRelationsRe)) {
            setRelations(idLeft, idRight);
            right[idRight] = true;
          }
        });
      }

      function loadRight () {
        if (mal.entries.updating(false)) {
          return;
        }

        let count = 0;
        $.each(right, function (id) {
          if (processed.hasOwnProperty(id)) {
            delete right[id];
          } else {
            count += 1;
          }
        });

        mal.content.status.done += mal.entries.status.done;
        mal.content.status.fail += mal.entries.status.fail;
        mal.content.status.skip += mal.entries.status.skip;
        mal.content.status.total += mal.entries.status.total;

        mal.entries.status.clear();
        mal.entries.status.total = count;
        mal.content.status.update();

        if (mal.entries.status.total === 0) {
          mal.content.list.update(true);
          return;
        }

        let delay = 0;
        $.each(right, function (id) {
          id = parseInt(id);
          if (isNaN(id)) {
            loadRight();
            return;
          }

          setTimeout(function () {
            $.ajax('/dbchanges.php?' + mal.type[0] + 'id=' + id + '&t=relations')
              .done(function (data) {
                mal.entries.status.done += 1;
                processed[id] = true;
                mal.cache.data.title[id] = toHtmlStr($('#dialog .normal_header > a', data).text());
                getRelations(id, data);
                mal.content.status.update();
                loadRight();
              })
              .fail(function () {
                mal.entries.status.fail += 1;
                mal.content.status.update();
                console.log('Failed: /' + mal.type + '/' + id);
                loadRight();
              });
          }, delay);

          delay += mal.settings.ajaxDelay;
        });
      }

      function loadLeft () {
        if (mal.entries.updating(false)) {
          return;
        }

        $.each(mal.cache.data.left, function (id, val) {
          if (val === true) {
            processed[id] = true;
          }
        });

        mal.entries.status.clear();
        mal.entries.status.total = userlist.length;
        mal.content.status.update();

        if (mal.entries.status.total === 0) {
          mal.content.list.update(true);
          return;
        }

        let delay = 0;
        userlist.forEach(function (entry) {
          mal.cache.data.title[entry.id] = entry.title;

          if (mal.cache.data.left[entry.id] === true) {
            mal.entries.status.skip += 1;
            mal.content.status.update();
            mal.content.list.update(true);
            return;
          }

          setTimeout(function () {
            $.ajax('/dbchanges.php?' + mal.type[0] + 'id=' + entry.id + '&t=relations')
              .done(function (data) {
                mal.entries.status.done += 1;
                mal.cache.data.left[entry.id] = true;
                processed[entry.id] = true;
                getRelations(entry.id, data);
                mal.content.status.update();
                loadRight();
              })
              .fail(function () {
                mal.entries.status.fail += 1;
                mal.content.status.update();
                console.log('Failed: /' + mal.type + '/' + entry.id);
                loadRight();
              });
          }, delay);

          delay += mal.settings.ajaxDelay;
        });
      }

      function loadUserList () {
        mal.entries.status.updating = true;
        mal.content.status.clear();
        mal.content.status.body.text('Loading...');

        mal.loader[mal.type].populate({
          onFinish: (data) => {
            $.each(data, (id, entry) => {
              const isAnime = mal.type === 'anime';
              const isManga = !isAnime;

              let correct = true;

              let title = entry[mal.type + '_title'];
              let status = parseInt(entry[isAnime ? 'anime_airing_status' : 'manga_publishing_status']);
              let episodes = isAnime ? parseInt(entry.anime_num_episodes) : 0;
              let chapters = isManga ? parseInt(entry.manga_num_chapters) : 0;
              let volumes = isManga ? parseInt(entry.manga_num_volumes) : 0;
              let userStatus = parseInt(entry.status);
              let userEpisodes = isAnime ? parseInt(entry.num_watched_episodes) : 0;
              let userChapters = isManga ? parseInt(entry.num_read_chapters) : 0;
              let userVolumes = isManga ? parseInt(entry.num_read_volumes) : 0;
              let rewatching = parseInt(entry[isAnime ? 'is_rewatching' : 'is_rereading']);

              // [ 1, 2, 3, 4, 6 ] --> [ 0, 1, 2, 3, 4 ]
              let userStatusID = userStatus - (userStatus === USER_STATUS.PLAN_TO ? 2 : 1);
              if (userStatusID < 0 || userStatusID > 4) {
                userStatusID = -1;
                correct = false;
              }

              let listEntry = {
                id: parseInt(id),
                title: toHtmlStr(title),
                correct: !(!correct ||
                  (userStatus !== USER_STATUS.PLAN_TO && status === SERIES_STATUS.NOT_YET) ||
                  (userStatus === USER_STATUS.COMPLETED && rewatching === 0 &&
                    (status !== SERIES_STATUS.COMPLETED || episodes !== userEpisodes ||
                    chapters !== userChapters || volumes !== userVolumes)) ||
                  (userStatus !== USER_STATUS.COMPLETED && status === SERIES_STATUS.COMPLETED &&
                    ((episodes > 0 && userEpisodes >= episodes) ||
                    (volumes > 0 && userVolumes >= volumes) ||
                    (chapters > 0 && userChapters >= chapters)))
                )
              };

              if (userStatusID !== -1) {
                mal.cache.data.status[listEntry.id] = userStatusID;
              }

              if (!listEntry.correct) {
                mal.cache.data.wrong[listEntry.id] = true;
              }

              mal.cache.data.airing[listEntry.id] = status;
              userlist.push(listEntry);
            });

            loadLeft();
          },
          onNext: (count) => {
            mal.content.status.body.html('Loading... (' + count + ' entries)');
          },
          onError: () => {
            mal.content.status.body.html('Loading... (failed)');
            mal.entries.status.updating = false;
          }
        }, [
          mal.type + '_title', // title
          'status', // userStatus
          'num_watched_episodes', // userEpisodes
          'num_read_chapters', // userChapters
          'num_read_volumes', // userVolumes
          'anime_num_episodes', // episodes
          'manga_num_chapters', // chapters
          'manga_num_volumes', // volumes
          'anime_airing_status', // status
          'manga_publishing_status', // status
          'is_rewatching', // rewatching
          'is_rereading' // rewatching
        ]);
      }

      if (!mal.entries.updating(true)) {
        mal.entries.status.updating = true;
        mal.content.status.clear();
        mal.content.status.body.text('Loading...');

        if (recalc) {
          mal.entries.status.clear();
          mal.cache.clear();
        } else {
          mal.cache.data.status = {};
          mal.cache.data.wrong = {};
          mal.cache.data.airing = {};
        }

        mal.content.list.body.empty()
          .append('<p id="mr_information">' + (recalc ? 'Recalculating' : 'Updating') + ' missing relations...</p>')
          .append('<input type="hidden" id="mr_list_type" value="' + mal.type + '">');

        loadUserList();
      }
    },

    getTitle: function (id) {
      const result = mal.cache.data.title.hasOwnProperty(id) ? mal.cache.data.title[id] : '';
      return result.length > 0 ? result : '?';
    },

    getStatus: function (id) {
      const result = parseInt(mal.cache.data.status[id]);
      if (isNaN(result) || result < 0 || result >= mal.settings.availableStatus[mal.type].length) {
        delete mal.cache.data.status[id];
        return '';
      }
      return mal.settings.availableStatus[mal.type][result];
    },

    getComps: function () {
      let result = {};
      let used = {};
      let comp = [];

      function dfs (v) {
        v = parseInt(v);
        if (isNaN(v)) {
          return;
        }

        used[v] = true;
        comp.push(v);

        if (!mal.cache.data.graph.hasOwnProperty(v)) {
          return;
        }

        mal.cache.data.graph[v].forEach(function (to) {
          if (!used.hasOwnProperty(to)) {
            dfs(to);
          }
        });
      }

      $.each(mal.cache.data.graph, function (v) {
        if (!used.hasOwnProperty(v)) {
          comp = [];
          dfs(v);
          if (comp.length > 1) {
            result[v] = comp;
          }
        }
      });

      return result;
    },

    comparator: function (a, b) {
      const aTitle = mal.entries.getTitle(a).toLowerCase();
      const bTitle = mal.entries.getTitle(b).toLowerCase();
      return aTitle.localeCompare(bTitle);
    }
  };

  mal.content = {
    body: $('<div class="mr_body mr_body_list">'),

    show: function (type) {
      if (type !== mal.type) {
        if (!mal.entries.updating(true)) {
          mal.content.status.body.empty();
        } else {
          alert('Updating in process!');
          return false;
        }
      }

      let listType = $('#mr_list_type', mal.content.body);
      mal.type = type;
      $('#mr_links_settings > #mr_link_switch', mal.content.body)
        .text(mal.type === 'anime' ? 'Manga' : 'Anime');

      if (listType.length === 0 || listType.val() !== mal.type) {
        mal.settings.load();
        mal.cache.load();
        mal.content.list.update(false);
      }

      mal.content.body.show();
      return true;
    },

    status: {
      body: $('<span id="mr_status_msg">'),
      done: 0,
      fail: 0,
      skip: 0,
      total: 0,

      update: function () {
        if (mal.content.status.total > 0 && mal.entries.status.total === 0) {
          mal.content.status.set(mal.content.status.done + mal.content.status.fail + mal.content.status.skip,
            mal.content.status.fail, mal.content.status.skip, mal.content.status.total);
        } else if (mal.content.status.total === 0 && mal.entries.status.total > 0) {
          mal.content.status.set(mal.entries.status.done + mal.entries.status.fail + mal.entries.status.skip,
            mal.entries.status.fail, mal.entries.status.skip, mal.entries.status.total);
        } else if (mal.content.status.total > 0 && mal.entries.status.total > 0) {
          mal.content.status.set((mal.content.status.done + mal.content.status.fail + mal.content.status.skip) + '+' +
          (mal.entries.status.done + mal.entries.status.fail + mal.entries.status.skip),
          mal.content.status.fail + '+' + mal.entries.status.fail,
          mal.content.status.skip + '+' + mal.entries.status.skip,
          mal.content.status.total + '+' + mal.entries.status.total);
        } else {
          mal.content.status.set(0, 0, 0, 0);
        }
      },

      set: function (done, fail, skip, total) {
        done = 'Done: <b><span style="color: green;">' + done + '</span></b>';
        fail = 'Failed: <b><span style="color: #c32;">' + fail + '</span></b>';
        skip = 'Skipped: <b><span style="color: gray;">' + skip + '</span></b>';
        total = 'Total: <b><span style="color: #444;">' + total + '</span></b>';
        mal.content.status.body.html(done + ' <small>(' + fail + ', ' + skip + ')</small> - ' + total);
      },

      clear: function () {
        mal.content.status.body.empty();
        mal.content.status.done = 0;
        mal.content.status.fail = 0;
        mal.content.status.skip = 0;
        mal.content.status.total = 0;
      }
    },

    footer: {
      body: $('<div class="mr_footer">'),
      footerSwitch: $('<div class="mr_footer_switch" title="Show/hide quick settings">').click(function () {
        mal.content.footer.toggle(!mal.content.list.body.hasClass('mr_has_footer'));
      }),

      show: function () {
        mal.content.footer.update();
        mal.content.footer.body.show();
        mal.content.list.body.addClass('mr_has_footer');
      },

      hide: function () {
        mal.content.footer.body.hide().empty();
        mal.content.list.body.removeClass('mr_has_footer');
      },

      toggle: function (state) {
        if (state) {
          mal.content.footer.show();
        } else {
          mal.content.footer.hide();
        }
        mal.cache.saveValue('mr_xo' + mal.type[0] + '_quick_settings', state.toString(), 'global');
      },

      update: function () {
        let table = $('<table class="mr_footer_table" border="0" cellpadding="0" cellspacing="0" width="100%"><tr>' +
            '<td class="mr_footer_td mr_footer_td_left"></td>' +
            '<td class="mr_footer_td mr_footer_td_right"></td>' +
            '<td class="mr_footer_td mr_footer_td_other"></td>' +
            '</tr></table>');

        let tableIgnoreLeft = $('<table class="relTable" border="0" cellpadding="0" cellspacing="0" width="100%"><thead><tr>' +
            '<th colspan="2">Treat as missing relations:</th></tr><tbody /></table>');

        let tableIgnoreRight = $('<table class="relTable" border="0" cellpadding="0" cellspacing="0" width="100%"><thead><tr>' +
            '<th colspan="2">Hide from missing relations:</th></tr><tbody /></table>');

        let tableOther = $('<table class="relTable" border="0" cellpadding="0" cellspacing="0" width="100%"><thead><tr>' +
            '<th>Other settings:</th></tr><tbody /></table>');

        let getCbSetting = function (str, id, state) {
          id = toHtmlId(id);
          const flag = mal.cache.loadValue(id, state.toString(), 'global');
          return $('<div class="mr_checkbox">')
            .append($('<input name="' + id + '" id="mr_footer_cb_' + id + '" type="checkbox">')
              .prop('checked', flag === 'true' || flag === true)
              .change(function () {
                const idCb = this.id.replace(/^mr_footer_cb_/, '');
                mal.cache.saveValue(idCb, this.checked.toString(), 'global');
                mal.settings.load();
                mal.content.list.update(false);
              }))
            .append('<label for="mr_footer_cb_' + id + '">' + str + '</label>');
        };

        // Add ignore left & right statuses
        let tbodyLeft = $('tbody', tableIgnoreLeft);
        let tbodyRight = $('tbody', tableIgnoreRight);
        let trLeft = $();
        let trRight = $();

        $.each(mal.settings.availableStatus[mal.type], function (i, status) {
          if (i & 1) {
            $('<td class="mr_td_right">')
              .append(getCbSetting(status, 'mr_xsl' + mal.type[0] + '_' + status, false))
              .appendTo(trLeft);
            $('<td class="mr_td_right">')
              .append(getCbSetting(status, 'mr_xsr' + mal.type[0] + '_' + status, false))
              .appendTo(trRight);

            trLeft = $();
            trRight = $();
          } else {
            trLeft = $('<tr class="mr_tr_data">').appendTo(tbodyLeft);
            trRight = $('<tr class="mr_tr_data">').appendTo(tbodyRight);

            $('<td class="mr_td_left">')
              .append(getCbSetting(status, 'mr_xsl' + mal.type[0] + '_' + status, false))
              .appendTo(trLeft);
            $('<td class="mr_td_left">')
              .append(getCbSetting(status, 'mr_xsr' + mal.type[0] + '_' + status, false))
              .appendTo(trRight);
          }
        });

        // Add 'Other' status
        let td;
        if (trRight.length === 0) {
          trRight = $('<tr class="mr_tr_data">').appendTo(tbodyRight);
          td = $('<td class="mr_td_left">');
        } else {
          td = $('<td class="mr_td_right">');
        }
        td.append(getCbSetting('Other', 'mr_xsr' + mal.type[0] + '_empty_status', false))
          .appendTo(trRight);

        // Add other settings
        let tbody = $('tbody', tableOther);
        mal.settings.otherSettings[mal.type].forEach(function (opt) {
          if (!opt.footer) {
            return;
          }
          $('<tr class="mr_tr_data">')
            .append($('<td class="mr_td_left">')
              .append(getCbSetting(opt.text, 'mr_xo' + mal.type[0] + '_' + opt.id, false)))
            .appendTo(tbody);
        });

        $('.mr_footer_td_left', table).append(tableIgnoreLeft);
        $('.mr_footer_td_right', table).append(tableIgnoreRight);
        $('.mr_footer_td_other', table).append(tableOther);
        mal.content.footer.body.empty().append(table);
      }
    },

    list: {
      body: $('<div class="mr_list">'),

      update: function (save) {
        if (mal.entries.updating(false)) {
          return;
        }

        mal.entries.status.updating = false;

        if (save) {
          mal.cache.save();
        }

        $('.mr_body_title', mal.content.body)
          .text(mal.title + ' — ' + (mal.type === 'anime' ? 'Anime' : 'Manga') + ' · ' + mal.name);

        let opts = {
          expandLong: false,
          expandLongR: false,
          quickSettings: false,
          hideEmpty: false,
          hideNotYet: false,
          hideAiring: false
        };

        mal.settings.otherSettings[mal.type].forEach(function (opt) {
          switch (opt.id) {
            case OPTS.EXPAND_LONG:
              opts.expandLong = opt.val;
              break;
            case OPTS.EXPAND_LONG_R:
              opts.expandLongR = opt.val;
              break;
            case OPTS.HIDE_NOTYET:
              opts.hideNotYet = opt.val;
              break;
            case OPTS.HIDE_AIRING:
              opts.hideAiring = opt.val;
              break;
          }
        });

        let flag = mal.cache.loadValue('mr_xsr' + mal.type[0] + '_empty_status', 'false', 'global');
        opts.hideEmpty = (flag === 'true' || flag === true);

        flag = mal.cache.loadValue('mr_xo' + mal.type[0] + '_quick_settings', 'false', 'global');
        opts.quickSettings = (flag === 'true' || flag === true);

        let listType = $('<input type="hidden" id="mr_list_type" value="' + mal.type + '">');
        let comps = mal.entries.getComps();

        let wrong = [];
        $.each(mal.cache.data.wrong, function (id, val) {
          if (val === true) {
            id = parseInt(id);
            if (!isNaN(id)) {
              wrong.push(id);
            }
          }
        });

        if (wrong.length === 0 && Object.keys(comps).length === 0) {
          mal.content.list.body.empty().append('<p id="mr_information">No missing relations found.</p>').append(listType);
          mal.content.footer.toggle(opts.quickSettings);
          return;
        }

        let table = $('<table class="relTable" border="0" cellpadding="0" cellspacing="0" width="100%"><thead><tr>' +
            '<th>Entries in your list:</th><th>Found missing relations:</th></tr></table>');

        let undel = $('<div id="mr_undelete"><p id="mr_undelete_msg" style="display: none;">' +
            'There are <span id="mr_undelete_num" style="font-weight: bold;" /> hidden relations. ' +
            '<a href="javascript:void(0);" title="Show hidden relations" onclick="window.showHiddenRelations();">Show them</a></p></div>');

        let tfoot = $('<tfoot><tr><td class="mr_td_left"><div class="mr_count"><span /></div></td>' +
            '<td class="mr_td_right"><div class="mr_count"><span /></div></td></tr></tfoot>');

        let getEntryLink = function (id, title) {
          let hint = mal.entries.getStatus(id) || '';
          let status = hint.length > 0 ? toHtmlId(hint) : 'none';
          let tooltip = hint.length > 0 ? (' title="' + hint + '"') : '';
          let url = '/' + mal.type + '/' + id + '/' + title
            .replace(/[)(]/g, '')
            .replace(/[^\w\d-]/g, ' ')
            .replace(/\s/g, '_')
            .replace(/^_+/, '')
            .replace(/_+$/, '');
          return $('<a title="' + title + '" href="' + url + '" target="_blank">' + title + '</a>')
            .prepend('<i class="mr_icon mr_icon-' + status + '"' + tooltip + '>');
        };

        let getLiLeft = function (id) {
          return $('<li>').append(getEntryLink(id, mal.entries.getTitle(id)));
        };

        let getLiRight = function (id) {
          let btnHide = $('<div class="mr_hide"><span><a href="javascript:void(0);" ' +
                          'title="Hide this relation" onclick="window.hideRelation(' + id + ');">x</a></span></div>');
          return $('<li>').append(btnHide).append(getEntryLink(id, mal.entries.getTitle(id)));
        };

        let getMoreLink = function () {
          return $('<td colspan="2">').append(
            $('<a class="mr_more" href="javascript:void(0);">show more</a>').click(function () {
              let tr = $(this).closest('tr');
              tr.prev('.mr_tr_data').removeClass('mr_tr_collapsed');
              tr.remove();
            })
          );
        };

        // red relations
        if (wrong.length > 0) {
          let ul = $('<ul>');
          let size = 0;

          wrong.sort(mal.entries.comparator).forEach(function (id) {
            getLiLeft(id).prop('id', 'mr_li_red_' + id).appendTo(ul);
            size += 1;
          });

          let warning = $('<div class="mr_warning"><span>Wrong status or ' +
            (mal.type === 'anime' ? 'episode' : 'volume/chapter') + ' count</span></div>');

          let rbodyRed = $('<tbody>');
          let trRed = $('<tr class="mr_tr_data">')
            .append($('<td class="mr_td_left">').append(ul))
            .append($('<td class="mr_td_right">').append(warning))
            .appendTo(rbodyRed);

          if (!opts.expandLong && size > 6) {
            trRed.addClass('mr_tr_collapsed');
            $('<tr class="mr_tr_more">').append(getMoreLink()).insertAfter(trRed);
          }

          rbodyRed.appendTo(table);
        }

        let excludedStatusLeftRe = new RegExp('^(' + mal.settings.excludedStatus.left[mal.type].join('|') + ')$', 'i');
        let excludedStatusRightRe = new RegExp('^(' + mal.settings.excludedStatus.right[mal.type].join('|') + ')$', 'i');

        // normal relations
        Object.keys(comps).sort(mal.entries.comparator).forEach(function (key) {
          let ulLeft = $('<ul>');
          let ulRight = $('<ul>');
          let lSize = 0;
          let rSize = 0;

          comps[key].sort(mal.entries.comparator).forEach(function (id) {
            const status = mal.entries.getStatus(id) || '';
            if (mal.cache.data.left[id] === true) {
              if (!status.match(excludedStatusLeftRe)) {
                if (!(opts.hideNotYet && mal.cache.data.airing[id] === SERIES_STATUS.NOT_YET) &&
                    !(opts.hideAiring && mal.cache.data.airing[id] === SERIES_STATUS.IN_PROCESS)) {
                  getLiLeft(id).prop('id', 'mr_li_' + id).appendTo(ulLeft);
                  lSize += 1;
                }
              } else if (!status.match(excludedStatusRightRe)) {
                if (!(opts.hideNotYet && mal.cache.data.airing[id] === SERIES_STATUS.NOT_YET) &&
                    !(opts.hideAiring && mal.cache.data.airing[id] === SERIES_STATUS.IN_PROCESS)) {
                  getLiRight(id).prop('id', 'mr_li_' + id).appendTo(ulRight);
                  rSize += 1;
                }
              }
            } else if (!(opts.hideEmpty && status.length === 0)) {
              if (!(opts.hideNotYet && mal.cache.data.airing[id] === SERIES_STATUS.NOT_YET) &&
                  !(opts.hideAiring && mal.cache.data.airing[id] === SERIES_STATUS.IN_PROCESS)) {
                getLiRight(id).prop('id', 'mr_li_' + id).appendTo(ulRight);
                rSize += 1;
              }
            }
          });

          if (lSize > 0 && rSize > 0) {
            let tbody = $('<tbody>');
            let tr = $('<tr class="mr_tr_data">')
              .append($('<td class="mr_td_left">').append(ulLeft))
              .append($('<td class="mr_td_right">').append(ulRight))
              .appendTo(tbody);

            if (!opts.expandLong && (lSize > 6 || rSize > 6) && !(opts.expandLongR && (lSize <= 6 || rSize > 6))) {
              tr.addClass('mr_tr_collapsed');
              $('<tr class="mr_tr_more">').append(getMoreLink()).insertAfter(tr);
            }

            tbody.appendTo(table);
          }
        });

        mal.content.list.body.empty()
          .append(undel)
          .append(table.append(tfoot))
          .append(listType);

        mal.content.list.updateHiddenRelations();
        mal.content.list.updateLineCount();
        mal.content.footer.toggle(opts.quickSettings);
      },

      updateLineCount: function () {
        const totalLeft = $('.relTable td.mr_td_left li', mal.content.list.body).length;
        const visibleLeft = $('.relTable tbody:not([style*="display: none"]) td.mr_td_left li', mal.content.list.body).length;

        $('tfoot td.mr_td_left .mr_count span', mal.content.list.body)
          .text('Total: ' + totalLeft + ', Visible: ' + visibleLeft);

        const totalRight = $('.relTable td.mr_td_right li', mal.content.list.body).length;
        const visibleRight = $('.relTable td.mr_td_right li:not([style*="display: none"])', mal.content.list.body).length;

        $('tfoot td.mr_td_right .mr_count span', mal.content.list.body)
          .text('Total: ' + totalRight + ', Visible: ' + visibleRight);
      },

      hideRelation: function (id, save) {
        id = parseInt(id);
        if (isNaN(id)) {
          return;
        }

        let li = $('td.mr_td_right li[id="mr_li_' + id + '"]', mal.content.list.body);
        if (li.length === 0) {
          if (mal.cache.data.hidden.hasOwnProperty(id)) {
            delete mal.cache.data.hidden[id];
          }
          if (save) {
            mal.cache.saveHiddenRelations();
          }
          return;
        }

        let row = li.hide().closest('tbody');
        const lSize = $('td.mr_td_left li', row).length;
        const rSize = $('td.mr_td_right li:not([style*="display: none;"])', row).length;

        row.toggle(rSize > 0);
        if (lSize <= 6 && rSize <= 6) {
          $('a.mr_more', row).trigger('click');
        }

        mal.cache.data.hidden[id] = true;
        if (save) {
          mal.cache.saveValue('mal.entries.hidden', mal.cache.data.hidden, mal.type);
          const count = Object.keys(mal.cache.data.hidden).length;
          $('#mr_undelete_num', mal.content.list.body).text(count);
          $('#mr_undelete_msg', mal.content.list.body).toggle(count > 0);
        }
      },

      showHiddenRelations: function (save) {
        $('#mr_undelete_msg', mal.content.list.body).hide();
        $('li[id^="mr_li_"]', mal.content.list.body).show();
        $('tbody', mal.content.list.body).show();
        if (save) {
          mal.cache.data.hidden = {};
          mal.cache.saveValue('mal.entries.hidden', mal.cache.data.hidden, mal.type);
        }
      },

      updateHiddenRelations: function () {
        mal.content.list.showHiddenRelations(false);
        $.each(mal.cache.data.hidden, function (id, val) {
          if (val === true) {
            mal.content.list.hideRelation(id, false);
          }
        });

        const count = Object.keys(mal.cache.data.hidden).length;
        $('#mr_undelete_num', mal.content.list.body).text(count);
        $('#mr_undelete_msg', mal.content.list.body).toggle(count > 0);
        mal.cache.saveValue('mal.entries.hidden', mal.cache.data.hidden, mal.type);
      }
    },

    storage: {
      body: $('<div class="mr_body mr_body_storage">' +
              '<div class="mr_panel"><div class="mr_links" /><span id="mr_storage_msg"></div>' +
              '<textarea class="mr_textarea" /><div class="mr_buttons" /></div>'),

      update: function () {
        $('.mr_body_title', mal.content.storage.body).text(mal.title + ' — Import');

        let status = $('#mr_storage_msg', mal.content.storage.body).empty();
        status.text('Save the data from a text field to be able to import it later');

        let textarea = $('.mr_textarea', mal.content.storage.body).empty();
        let text = '{\n"name": ' + JSON.stringify(mal.cache.name);
        text = text + ',\n"version": ' + JSON.stringify(OPTS.CACHE_VERSION);
        text = text + ',\n"username": ' + JSON.stringify(mal.cache.username);
        ['anime', 'manga'].forEach((type) => {
          text = text + ',\n' + JSON.stringify(type) + ': {';
          text = text + '\n"settings": ' + JSON.stringify(mal.settings.export(type));
          text = text + ',\n"cache": ' + JSON.stringify(mal.cache.export(type));
          text = text + '\n}'
        });
        text = text + '\n}';
        textarea.val(text);

        let buttons = $('.mr_buttons', mal.content.storage.body).empty();

        if (mal.entries.updating(true)) {
          buttons
            .append('<div class="mr_warning_bottom">The storage can\'t be changed during relations calculation!</div>')
            .append($('<input class="inputButton" value="OK" type="button">').click(function () {
              mal.fancybox.show(function () {
                mal.content.body.show();
                return true;
              });
            }))
            .insertAfter(textarea);
        } else {
          buttons
            .append($('<input class="inputButton" value="Import" type="button">').click(function () {
              mal.content.storage.import();
            }))
            .append($('<input class="inputButton" value="Cancel" type="button">').click(function () {
              textarea.val('');
              mal.fancybox.show(function () {
                mal.content.body.show();
                return true;
              });
            }))
            .append($('<input class="inputButton" value="Reset" type="button">').click(function () {
              mal.content.storage.update();
            }));
        }

        mal.content.storage.body.show();
      },

      compress: function () {
        let status = $('#mr_storage_msg', mal.content.storage.body).empty();
        let textarea = $('.mr_textarea', mal.content.storage.body);
        const text = textarea.val();

        let json = null;
        try {
          json = JSON.parse(text);
        } catch (e) {
          status.text('Data parsing failed!');
          console.error(e.name + ': ' + e.message);
          return;
        }

        try {
          textarea.val(btoa(pako.deflate(text, { to: 'string' })));
        } catch (e) {
          status.text('Data compression failed!');
          console.error(e.name + ': ' + e.message);
          textarea.val(text);
        }
      },

      decompress: function () {
        let status = $('#mr_storage_msg', mal.content.storage.body).empty();
        let textarea = $('.mr_textarea', mal.content.storage.body);
        const text = textarea.val();
        try {
          textarea.val(pako.inflate(atob(text), { to: 'string' }));
        } catch (e) {
          status.text('Data decompression failed!');
          console.error(e.name + ': ' + e.message);
          textarea.val(text);
        }
      },

      import: function () {
        let status = $('#mr_storage_msg', mal.content.storage.body).empty();
        let textarea = $('.mr_textarea', mal.content.storage.body);
        const text = textarea.val();

        let json = null;
        try {
          json = JSON.parse(text);
        } catch (e) {
          status.text('Data parsing failed!');
          console.error(e.name + ': ' + e.message);
          return;
        }

        if (json === Object(json) &&
            String(json.name) === mal.cache.name &&
            String(json.version) === OPTS.CACHE_VERSION) {
          ['anime', 'manga'].forEach((type) => {
            if (json[type] == null) {
              return;
            }
            if (json[type].settings === Object(json[type].settings)) {
              mal.settings.import(type, json[type].settings);
            }
            if (json[type].cache === Object(json[type].cache)) {
              mal.cache.import(type, json[type].cache);
            }
          });

          textarea.val('');
          mal.fancybox.show(function () {
            mal.settings.load();
            mal.cache.load();
            mal.content.list.update(false);
            mal.content.body.show();
            return true;
          });
        } else {
          status.text('Data parsing failed!');
        }
      }
    },

    settings: {
      body: $('<div class="mr_body mr_body_settings"><div class="mr_list" /><div class="mr_buttons" /></div>'),

      update: function () {
        $('.mr_body_title', mal.content.settings.body).text(mal.title + ' — Settings');

        let tableExclude = $('<table class="relTable" border="0" cellpadding="0" cellspacing="0" width="100%"><thead><tr>' +
            '<th>Exclude anime relations from scan:</th><th>Exclude manga relations from scan:</th></tr><tbody /></table>');

        let tableIgnoreLeft = $('<table class="relTable" border="0" cellpadding="0" cellspacing="0" width="100%"><thead><tr>' +
            '<th>Treat anime entries as missing relations:</th><th>Treat manga entries as missing relations:</th></tr><tbody /></table>');

        let tableIgnoreRight = $('<table class="relTable" border="0" cellpadding="0" cellspacing="0" width="100%"><thead><tr>' +
            '<th>Hide anime entries from missing relations:</th><th>Hide manga entries from missing relations:</th></tr><tbody /></table>');

        let tableOther = $('<table class="relTable" border="0" cellpadding="0" cellspacing="0" width="100%"><thead><tr>' +
            '<th>Other anime settings:</th><th>Other manga settings:</th></tr><tbody /></table>');

        let getCbSetting = function (str, id, state) {
          id = toHtmlId(id);
          const flag = mal.cache.loadValue(id, state.toString(), 'global');
          return $('<div class="mr_checkbox">')
            .append($('<input name="' + id + '" id="' + id + '" type="checkbox">')
              .prop('checked', flag === 'true' || flag === true))
            .append('<label for="' + id + '">' + str + '</label>');
        };

        // Add exclude relations
        let tbody = $('tbody', tableExclude);
        mal.settings.availableRelations.forEach(function (rel) {
          $('<tr class="mr_tr_data">')
            .append($('<td class="mr_td_left">').append(getCbSetting(rel, 'mr_xra_' + rel, false)))
            .append($('<td class="mr_td_right">').append(getCbSetting(rel, 'mr_xrm_' + rel, false)))
            .appendTo(tbody);
        });

        // Add ignore left & right statuses
        let tbodyLeft = $('tbody', tableIgnoreLeft);
        let tbodyRight = $('tbody', tableIgnoreRight);
        let trLeft = $();
        let trRight = $();

        $.each(mal.settings.availableStatus.anime, function (i, statusA) {
          let statusM = mal.settings.availableStatus.manga[i];

          $('<tr class="mr_tr_data">')
            .append($('<td class="mr_td_left">').append(getCbSetting(statusA, 'mr_xsla_' + statusA, false)))
            .append($('<td class="mr_td_right">').append(getCbSetting(statusM, 'mr_xslm_' + statusM, false)))
            .appendTo(tbodyLeft);

          $('<tr class="mr_tr_data">')
            .append($('<td class="mr_td_left">').append(getCbSetting(statusA, 'mr_xsra_' + statusA, false)))
            .append($('<td class="mr_td_right">').append(getCbSetting(statusM, 'mr_xsrm_' + statusM, false)))
            .appendTo(tbodyRight);
        });

        $('<tr class="mr_tr_data">')
          .append($('<td class="mr_td_left">').append(getCbSetting('Other', 'mr_xsra_empty_status', false)))
          .append($('<td class="mr_td_right">').append(getCbSetting('Other', 'mr_xsrm_empty_status', false)))
          .appendTo(tbodyRight);

        // Add other settings
        tbody = $('tbody', tableOther);
        $.each(mal.settings.otherSettings.anime, function (i, optA) {
          let optM = mal.settings.otherSettings.manga[i];
          $('<tr class="mr_tr_data">')
            .append($('<td class="mr_td_left">').append(getCbSetting(optA.text, 'mr_xoa_' + optA.id, false)))
            .append($('<td class="mr_td_right">').append(getCbSetting(optM.text, 'mr_xom_' + optM.id, false)))
            .appendTo(tbody);
        });

        let list = $('.mr_list', mal.content.settings.body).empty()
          .append(tableExclude)
          .append(tableIgnoreLeft)
          .append(tableIgnoreRight)
          .append(tableOther);

        let buttons = $('.mr_buttons', mal.content.settings.body).empty();

        if (mal.entries.updating(true)) {
          buttons
            .append('<div class="mr_warning_bottom">The settings can\'t be changed during relations calculation!</div>')
            .append($('<input class="inputButton" value="OK" type="button">').click(function () {
              mal.fancybox.show(function () {
                mal.content.body.show();
                return true;
              });
            }))
            .insertAfter(list);
        } else {
          buttons
            .append($('<input class="inputButton" value="Save" type="button">').click(function () {
              $('input[type="checkbox"]', mal.content.settings.body).each(function () {
                mal.cache.saveValue(this.id, this.checked.toString(), 'global');
              });
              mal.settings.load();
              mal.fancybox.show(function () {
                mal.content.list.update(false);
                mal.content.body.show();
                return true;
              });
            }))
            .append($('<input class="inputButton" value="Cancel" type="button">').click(function () {
              mal.fancybox.show(function () {
                mal.content.body.show();
                return true;
              });
            }))
            .append($('<input class="inputButton" value="Reset" type="button">').click(function () {
              if (!confirm('Reset all settings?')) {
                return;
              }
              mal.settings.reset();
              mal.settings.load();
              mal.fancybox.show(function () {
                mal.content.list.update(false);
                mal.content.body.show();
                return true;
              });
            }));
        }

        mal.content.settings.body.show();
      }
    }
  };

  window.hideRelation = function (id) {
    mal.content.list.hideRelation(id, true);
    mal.content.list.updateLineCount();
  };

  window.showHiddenRelations = function () {
    mal.content.list.showHiddenRelations(true);
    mal.content.list.updateLineCount();
  };

  function main () {
    mal.name = $('.user-profile .user-function .icon-user-function#comment').prop('href').match(/\/([^/]+)#lastcomment$/)[1].trim();
    $.ajaxSetup({ timeout: mal.settings.ajaxTimeout });

    mal.cache = new Cache('mal_track_missing_relations', mal.name);
    mal.fancybox.init('#contentWrapper');

    let panel = $('<div class="mr_panel">').append(mal.content.status.body).prependTo(mal.content.body);
    let links = $('<div class="mr_links">').prependTo(panel);

    $('<span id="mr_links_settings">').prependTo(links)
      .append($('<a href="javascript:void(0);" title="Switch lists" id="mr_link_switch">Manga</a>').click(function () {
        if (mal.entries.updating(true)) {
          alert('Updating in process!');
        } else {
          mal.fancybox.show(function () {
            return mal.content.show(mal.type === 'anime' ? 'manga' : 'anime');
          });
        }
      }))
      .append(' - ').append($('<a href="javascript:void(0);" title="Import script data">Import</a>').myfancybox(function () {
        mal.content.storage.update();
        return true;
      }))
      .append(' - ').append($('<a href="javascript:void(0);" title="Change calculation settings">Settings</a>').myfancybox(function () {
        mal.content.settings.update();
        return true;
      }))
      .append(' - ').append($('<a href="javascript:void(0);" title="Recalculate missing relations">Rescan</a>').click(function () {
        if (mal.entries.updating(true)) {
          alert('Updating in process!');
        } else if (confirm('Recalculate missing relations?')) {
          mal.entries.update(true);
        }
      }))
      .append(' - ').append($('<a href="javascript:void(0);" title="Find new missing relations">Update</a>').click(function () {
        if (mal.entries.updating(true)) {
          alert('Updating in process!');
        } else if (confirm('Find new missing relations?')) {
          mal.entries.update(false);
        }
      }));

    let storageLinks = $('.mr_links', mal.content.storage.body);
    $('<span id="mr_links_storage">').prependTo(storageLinks)
      .append($('<a href="javascript:void(0);" title="Compress data">Compress</a>').click(function () {
        mal.content.storage.compress();
      }))
      .append(' - ').append($('<a href="javascript:void(0);" title="Decompress data">Decompress</a>').click(function () {
        mal.content.storage.decompress();
      }));

    mal.content.body
      .prepend('<h2 class="mr_body_title">' + mal.title + '</h2>')
      .append(mal.content.list.body)
      .append(mal.content.footer.body.hide())
      .append(mal.content.footer.footerSwitch)
      .appendTo(mal.fancybox.body);

    mal.content.storage.body
      .prepend('<h2 class="mr_body_title">' + mal.title + '</h2>')
      .appendTo(mal.fancybox.body);

    mal.content.settings.body
      .prepend('<h2 class="mr_body_title">' + mal.title + '</h2>')
      .appendTo(mal.fancybox.body);

    mal.loader = {};
    ['anime', 'manga'].forEach(function (type) {
      mal.loader[type] = new MalData(mal.name, type, 300, mal.settings.ajaxDelay);

      let el = $('.profile .user-statistics .user-statistics-stats .updates.' + type + ' > h5 > a[href*="/history/"]');
      if (el.length > 0) {
        el.text(el.text().replace(/^(Anime|Manga)\sHistory$/i, 'History'));
      }

      $('<a class="floatRightHeader ff-Verdana mr4" href="javascript:void(0);">' + mal.title + '</a>').myfancybox(function () {
        return mal.content.show(type);
      })
        .appendTo('.profile .user-statistics .user-statistics-stats .updates.' + type + ' > h5')
        .before('<span class="floatRightHeader ff-Verdana mr4">-</span>');
    });
  }

  $('<style type="text/css">').html(
    'div#mr_fancybox_wrapper { position: fixed; width: 100%; height: 100%; top: 0; left: 0; background: rgba(102, 102, 102, 0.3); z-index: 99990; }' +
    'div#mr_fancybox_inner { width: ' + mal.settings.windowWidth + 'px !important; height: ' + mal.settings.windowHeight + 'px !important; overflow: hidden; }' +
    'div#mr_fancybox_outer { position: absolute; display: block; width: auto; height: auto; padding: 10px; border-radius: 8px; top: 80px; left: 50%; margin-top: 0 !important; margin-left: ' + (-mal.settings.windowWidth / 2) + 'px !important; background: #fff; box-shadow: 0 0 15px rgba(32, 32, 32, 0.4); z-index: 99991; }' +
    'div.mr_body { text-align: center; width: 100%; height: 100%; padding: 42px 0 0; box-sizing: border-box; }' +
    'div.mr_body.mr_body_list, div.mr_body.mr_body_storage { padding-top: 65px; }' +
    'div.mr_body a, div.mr_body a:visited { color: #1969cb; text-decoration: none; }' +
    'div.mr_body a:hover { color: #2d7de0; text-decoration: underline; }' +
    'div.mr_body .mr_body_title { position: absolute; top: 10px; left: 10px; width: ' + mal.settings.windowWidth + 'px; font-size: 16px; font-weight: normal; text-align: center; margin: 0; border: 0; }' +
    'div.mr_body .mr_body_title:after { content: ""; position: absolute; left: 0; bottom: -14px; width: 100%; height: 8px; border-top: 1px solid #eee; background: center bottom no-repeat radial-gradient(#f6f6f6, #fff 70%); background-size: 100% 16px; }' +
    'div.mr_body .mr_panel { position: absolute; top: 50px; left: 10px; text-align: left; width: ' + mal.settings.windowWidth + 'px; height: 2em; margin: 0 0 1em; }' +
    'div.mr_body .mr_links { float: right; }' +
    'div.mr_body p#mr_information { margin: 10px 0; }' +
    'div.mr_body #mr_undelete { background-color: #fff; padding: 0; margin: 0; }' +
    'div.mr_body #mr_undelete_msg { margin: 4px 0 6px; font-weight: normal; text-align: center; line-height: 20px; font-size: 11px; }' +
    'div.mr_body .mr_list { width: 100%; height: ' + (mal.settings.windowHeight - mal.settings.footerSwitchHeight - 65) + 'px; overflow-x: hidden; overflow-y: auto; margin: 0 auto; border: 1px solid #eee; box-sizing: border-box; }' +
    'div.mr_body .relTable { border: none; }' +
    'div.mr_body .relTable thead { background-color: #f5f5f5; }' +
    'div.mr_body .relTable th { background-color: transparent; width: 50%; padding: 5px 0 5px 6px; font-size: 12px; font-weight: bold; text-align: left; line-height: 20px !important; box-shadow: none; cursor: default; }' +
    'div.mr_body .relTable tbody { background-color: #fff; }' +
    'div.mr_body.mr_body_list .mr_list .relTable th { padding-left: 26px; }' +
    'div.mr_body.mr_body_list .mr_list .relTable tbody:hover { background-color: #f5f5f5; }' +
    'div.mr_body.mr_body_list .mr_list .relTable tbody tr:first-of-type td { box-shadow: 0px 1em 1em -1em #ddd inset; }' +
    'div.mr_body .relTable td { background-color: transparent; width: 50%; padding: 5px 0 5px 6px; font-size: 13px; font-weight: normal; text-align: left; line-height: 20px !important; vertical-align: top; }' +
    'div.mr_body .relTable td div span { line-height: 20px !important; }' +
    'div.mr_body .relTable td ul { list-style-type: none; margin: 0; padding: 0; }' +
    'div.mr_body .relTable tr.mr_tr_collapsed td ul { height: 100px; overflow-y: hidden; }' +
    'div.mr_body .relTable td ul li { width: 100%; padding: 0; margin: 0; }' +
    'div.mr_body .relTable td ul li > a { display: block; width: ' + (mal.settings.windowWidth / 2 - 40) + 'px !important; line-height: 20px !important; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; text-decoration: none !important; transition: all 0.2s; }' +
    'div.mr_body .relTable td.mr_td_left ul li > a { width: ' + (mal.settings.windowWidth / 2 - 25) + 'px !important; }' +
    'div.mr_body .relTable i.mr_icon { display: inline-block; vertical-align: text-top; line-height: 16px; width: 16px; height: 16px; margin: 1px 4px 0 0; background-repeat: no-repeat; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAAAQCAMAAABQvsO3AAABI1BMVEUAAAD///8ZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZacsZactvPr9pAAAAYXRSTlMAAAsMDQ4PFhcaGx4gJCYnKSwuMDE3PEBBRUlKTE1UVldZWltdX2FiZGZoaWpsbnByc3R3eHl9foKEh4mLjY+QlJebnJ6foaOkq6yvs7S1uru8v8DDxMbJys/T2d3n6PH7ZwpR9wAAAXZJREFUeNq11FlTwjAUBeAjpSAuKLjvuCMgWlEUN5BFURG1LlVKwf//Kwy5SSbOyEtn+CaZ5GRuD29gaBDQ2z5cCfiH/9bCASdbV3T+W0/kQW51f1oDCSiB/QDfSng+kZgJQ7mUB7nX6a1GqXkIqHtpmG0DZKFUPW8yF3EIG5tgNjdk1Jds3TFgVGzbXgXJ2SRHv1HIDAPXLJ7ZBQOcUZ4FxssiYVtfovXUqUfqjuPcySHjjiWZo3kDy3MrLN9g+rEelSN7e2oeyWTSYZIctW61yH0QUoQ/ROgOIMNzFcHa5wS44EMq9aA+SAOteLzFL2lqNRvtnoYJyXziL0/qZYTn7O53Y1JOsMukGsgC7ampNr9kqRXmi+d5LyaUokeKEBZrveh+rUE4smKuG7OOQCzL8hiLE60IvXffQ5Aoj/55iy3lcuujUD7Q7Hab7CDH+pKtCFW0Usp89/U69sOMvYLk9SVafXCfO8yzC9LR+W99E/r9uwzCL22kXUBCr0XlAAAAAElFTkSuQmCC); }' +
    'div.mr_body .relTable i.mr_icon-none { background-image: none; }' +
    'div.mr_body .relTable i.mr_icon-watching { background-position: -34px 0; }' +
    'div.mr_body .relTable i.mr_icon-reading { background-position: -34px 0; }' +
    'div.mr_body .relTable i.mr_icon-completed { background-position: 0 0; }' +
    'div.mr_body .relTable i.mr_icon-on_hold { background-position: -51px 0; }' +
    'div.mr_body .relTable i.mr_icon-dropped { background-position: -17px 0; }' +
    'div.mr_body .relTable i.mr_icon-plan_to_watch { background-position: -68px 0; }' +
    'div.mr_body .relTable i.mr_icon-plan_to_read { background-position: -68px 0; }' +
    'div.mr_body .relTable tfoot td { border-top: 1px solid #f5f5f5; }' +
    'div.mr_body .relTable td .mr_count { color: #666; font-size: 11px; font-weight: normal; text-align: left; padding-left: 20px; }' +
    'div.mr_body .relTable td .mr_warning { width: ' + (mal.settings.windowWidth / 2 - 75) + 'px; color: #c56; font-size: 12px; font-weight: bold; text-align: left; padding-left: 20px; }' +
    'div.mr_body .relTable td .mr_hide { display: inline-block !important; width: 15px; float: right; text-align: left; font-size: 11px; }' +
    'div.mr_body .relTable td .mr_hide a { color: #888 !important; line-height: 20px !important; font-style: normal !important; text-decoration: none !important; }' +
    'div.mr_body .relTable tr.mr_tr_more td { padding: 0 0 2px 0; }' +
    'div.mr_body .relTable td .mr_more { display: block !important; text-align: center; color: #c0c0c0 !important; font-style: normal !important; font-size: 0.9em; text-decoration: none !important; }' +
    'div.mr_body .relTable .mr_checkbox > * { vertical-align: middle; font-size: 11px; cursor: pointer; }' +
    'div.mr_body .relTable .mr_comment { background-color: #f6f6f6; border: 1px solid #ebebeb; font-size: 11px; line-height: 16px; padding: 1px 4px; }' +
    'div.mr_body .mr_list.mr_has_footer { height: ' + (mal.settings.windowHeight - mal.settings.footerHeight - mal.settings.footerSwitchHeight - 65) + 'px; }' +
    'div.mr_body .mr_footer { position: absolute; bottom: ' + (10 + mal.settings.footerSwitchHeight) + 'px; width: ' + mal.settings.windowWidth + 'px; height: ' + mal.settings.footerHeight + 'px; overflow: hidden; border: 1px solid #eee; border-width: 0 1px; box-sizing: border-box; }' +
    'div.mr_body .mr_footer .mr_footer_td { vertical-align: top; padding: 2px 0 0; width: 37%; }' +
    'div.mr_body .mr_footer .mr_footer_td:first-of-type { padding-left: 6px; }' +
    'div.mr_body .mr_footer .mr_footer_td_other { width: 26%; }' +
    'div.mr_body .mr_footer .relTable { color: #323232; margin-top: 2px; }' +
    'div.mr_body .mr_footer .relTable thead { background-color: transparent; }' +
    'div.mr_body .mr_footer .relTable th { padding: 0 0 3px; font-size: 11px; line-height: 16px !important; }' +
    'div.mr_body .mr_footer .relTable td { padding: 0; }' +
    'div.mr_body .mr_footer_switch { position: absolute; bottom: 10px; width: ' + mal.settings.windowWidth + 'px; height: ' + mal.settings.footerSwitchHeight + 'px; border: 1px solid #eee; border-width: 0 1px 1px; cursor: pointer; box-sizing: border-box; }' +
    'div.mr_body .mr_footer_switch:hover { background-color: #f5f5f5; }' +
    'div.mr_body .mr_list.mr_has_footer ~ .mr_footer_switch { border-width: 0 1px 1px; }' +
    'div.mr_body .mr_footer_switch::after { content: "···"; font-size: 10px; text-align: center; line-height: ' + mal.settings.footerSwitchHeight + 'px; height: ' + mal.settings.footerSwitchHeight + 'px; overflow: hidden; color: #555; }' +
    'div.mr_body.mr_body_settings .relTable { margin-bottom: 10px; }' +
    'div.mr_body.mr_body_settings .relTable td { padding: 0 0 0 6px; }' +
    'div.mr_body.mr_body_settings .mr_list { height: ' + (mal.settings.windowHeight - 75) + 'px !important; }' +
    'div.mr_body .mr_buttons { position: absolute; bottom: 10px; width: ' + mal.settings.windowWidth + 'px; text-align: center; padding: 5px 0 0; box-sizing: border-box; }' +
    'div.mr_body .mr_buttons > .inputButton { margin: 2px 5px !important; font-size: 12px; }' +
    'div.mr_body .mr_warning_bottom { display: inline-block; font-size: 12px; font-weight: bold; color: #c56; margin-bottom: 2px; }' +
    'div.mr_body.mr_body_storage .mr_textarea { width: 100% !important; height: ' + (mal.settings.windowHeight - 98) + 'px !important; resize: none; overflow: auto; margin: 0 auto; padding: 2px; border: 1px solid #eee; box-sizing: border-box; font-family: Consolas, Monospace; font-size: 11px; }'
  ).appendTo('head');

  main();
}(jQuery));
