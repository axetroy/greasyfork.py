// ==UserScript==
// @name         Nico Nico Ranking NG
// @namespace    http://userscripts.org/users/121129
// @description  ニコニコ動画のランキングとキーワード・タグ検索結果に NG 機能を追加
// @match        *://www.nicovideo.jp/ranking*
// @match        *://www.nicovideo.jp/search/*
// @match        *://www.nicovideo.jp/tag/*
// @version      43
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.xmlHttpRequest
// @grant        GM.openInTab
// @license      MIT License
// @noframes
// @run-at       document-start
// @connect      ext.nicovideo.jp
// @connect      now.nicochart.jp
// ==/UserScript==

// https://d3js.org/d3-dsv/ Version 1.0.0. Copyright 2016 Mike Bostock.
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3 = global.d3 || {})));
}(this, function (exports) { 'use strict';

  function objectConverter(columns) {
    return new Function("d", "return {" + columns.map(function(name, i) {
      return JSON.stringify(name) + ": d[" + i + "]";
    }).join(",") + "}");
  }

  function customConverter(columns, f) {
    var object = objectConverter(columns);
    return function(row, i) {
      return f(object(row), i, columns);
    };
  }

  // Compute unique columns in order of discovery.
  function inferColumns(rows) {
    var columnSet = Object.create(null),
        columns = [];

    rows.forEach(function(row) {
      for (var column in row) {
        if (!(column in columnSet)) {
          columns.push(columnSet[column] = column);
        }
      }
    });

    return columns;
  }

  function dsv(delimiter) {
    var reFormat = new RegExp("[\"" + delimiter + "\n]"),
        delimiterCode = delimiter.charCodeAt(0);

    function parse(text, f) {
      var convert, columns, rows = parseRows(text, function(row, i) {
        if (convert) return convert(row, i - 1);
        columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
      });
      rows.columns = columns;
      return rows;
    }

    function parseRows(text, f) {
      var EOL = {}, // sentinel value for end-of-line
          EOF = {}, // sentinel value for end-of-file
          rows = [], // output rows
          N = text.length,
          I = 0, // current character index
          n = 0, // the current line number
          t, // the current token
          eol; // is the current token followed by EOL?

      function token() {
        if (I >= N) return EOF; // special case: end of file
        if (eol) return eol = false, EOL; // special case: end of line

        // special case: quotes
        var j = I, c;
        if (text.charCodeAt(j) === 34) {
          var i = j;
          while (i++ < N) {
            if (text.charCodeAt(i) === 34) {
              if (text.charCodeAt(i + 1) !== 34) break;
              ++i;
            }
          }
          I = i + 2;
          c = text.charCodeAt(i + 1);
          if (c === 13) {
            eol = true;
            if (text.charCodeAt(i + 2) === 10) ++I;
          } else if (c === 10) {
            eol = true;
          }
          return text.slice(j + 1, i).replace(/""/g, "\"");
        }

        // common case: find next delimiter or newline
        while (I < N) {
          var k = 1;
          c = text.charCodeAt(I++);
          if (c === 10) eol = true; // \n
          else if (c === 13) { eol = true; if (text.charCodeAt(I) === 10) ++I, ++k; } // \r|\r\n
          else if (c !== delimiterCode) continue;
          return text.slice(j, I - k);
        }

        // special case: last token before EOF
        return text.slice(j);
      }

      while ((t = token()) !== EOF) {
        var a = [];
        while (t !== EOL && t !== EOF) {
          a.push(t);
          t = token();
        }
        if (f && (a = f(a, n++)) == null) continue;
        rows.push(a);
      }

      return rows;
    }

    function format(rows, columns) {
      if (columns == null) columns = inferColumns(rows);
      return [columns.map(formatValue).join(delimiter)].concat(rows.map(function(row) {
        return columns.map(function(column) {
          return formatValue(row[column]);
        }).join(delimiter);
      })).join("\n");
    }

    function formatRows(rows) {
      return rows.map(formatRow).join("\n");
    }

    function formatRow(row) {
      return row.map(formatValue).join(delimiter);
    }

    function formatValue(text) {
      return text == null ? ""
          : reFormat.test(text += "") ? "\"" + text.replace(/"/g, "\"\"") + "\""
          : text;
    }

    return {
      parse: parse,
      parseRows: parseRows,
      format: format,
      formatRows: formatRows
    };
  }

  var csv = dsv(",");

  var csvParse = csv.parse;
  var csvParseRows = csv.parseRows;
  var csvFormat = csv.format;
  var csvFormatRows = csv.formatRows;

  var tsv = dsv("\t");

  var tsvParse = tsv.parse;
  var tsvParseRows = tsv.parseRows;
  var tsvFormat = tsv.format;
  var tsvFormatRows = tsv.formatRows;

  exports.dsvFormat = dsv;
  exports.csvParse = csvParse;
  exports.csvParseRows = csvParseRows;
  exports.csvFormat = csvFormat;
  exports.csvFormatRows = csvFormatRows;
  exports.tsvParse = tsvParse;
  exports.tsvParseRows = tsvParseRows;
  exports.tsvFormat = tsvFormat;
  exports.tsvFormatRows = tsvFormatRows;

  Object.defineProperty(exports, '__esModule', { value: true });

}));

;(function() {
  'use strict'

  var createObject = function(prototype, properties) {
    var descriptors = function() {
      return Object.keys(properties).reduce(function(descriptors, key) {
        descriptors[key] = Object.getOwnPropertyDescriptor(properties, key)
        return descriptors
      }, {})
    }
    return Object.defineProperties(Object.create(prototype), descriptors())
  }
  var set = function(target, propertyName) {
    return function(value) { target[propertyName] = value }
  }
  var movieIdOf = function(absoluteMovieURL) {
    return new URL(absoluteMovieURL).pathname.slice('/watch/'.length)
  }

  var EventEmitter = (function() {
    var EventEmitter = function() {
      this._eventNameToListeners = new Map()
    }
    EventEmitter.prototype = {
      on(eventName, listener) {
        var m = this._eventNameToListeners
        var v = m.get(eventName)
        if (v) {
          v.add(listener)
        } else {
          m.set(eventName, new Set([listener]))
        }
        return this
      },
      emit(eventName) {
        var m = this._eventNameToListeners
        var args = Array.from(arguments).slice(1)
        for (var l of m.get(eventName) || []) l(...args)
      },
      off(eventName, listener) {
        var v = this._eventNameToListeners.get(eventName)
        if (v) v.delete(listener)
      },
    }
    return EventEmitter
  })()

  var Listeners = (function() {
    var Listeners = function(eventNameToListener) {
      this.eventNameToListener = eventNameToListener
      this.eventEmitter = null
    }
    Listeners.prototype = {
      bind(eventEmitter) {
        this.eventEmitter = eventEmitter
        Object.keys(this.eventNameToListener).forEach(function(k) {
          eventEmitter.on(k, this.eventNameToListener[k])
        }, this)
      },
      unbind() {
        if (!this.eventEmitter) return
        Object.keys(this.eventNameToListener).forEach(function(k) {
          this.eventEmitter.off(k, this.eventNameToListener[k])
        }, this)
      },
    }
    return Listeners
  })()

  var ArrayStore = (function(_super) {
    var isObject = function(v) {
      return v === Object(v)
    }
    var valueIfObj = function(v) {
      return isObject(v) ? v.value : v
    }
    var toUpperCase = function(s) {
      return s.toUpperCase()
    }
    var ArrayStore = function(getValue, setValue, key, caseInsensitive) {
      _super.call(this)
      this.getValue = getValue
      this.setValue = setValue
      this.key = key
      this.caseInsensitive = Boolean(caseInsensitive)
      this._arrayWithText = []
    }
    ArrayStore.prototype = createObject(_super.prototype, {
      get array() {
        return this.arrayWithText.map(valueIfObj)
      },
      get arrayWithText() {
        return this._arrayWithText
      },
      _setOf(values) {
        return new Set(this.caseInsensitive ? values.map(toUpperCase) : values)
      },
      get set() {
        return this._setOf(this.array)
      },
      _toUpperCaseIfRequired(value) {
        return this.caseInsensitive ? value.toUpperCase() : value
      },
      _concat(value, text) {
        return this.arrayWithText.concat(text ? {value, text} : value)
      },
      add(value, text) {
        if (this.set.has(this._toUpperCaseIfRequired(value))) return false
        this.arrayWithText.push(text ? {value, text} : value)
        this.setValue(this.key, JSON.stringify(this.arrayWithText))
        this.emit('changed', this.set)
        return true
      },
      async addAsync(value, text) {
        await this.sync()
        return this.add(value, text)
      },
      addAll(values) {
        if (values.length === 0) return
        var oldVals = this.arrayWithText
        var set = this._setOf(oldVals.map(valueIfObj))
        var filtered = values.filter(function(v) {
          return !set.has(this._toUpperCaseIfRequired(valueIfObj(v)))
        }, this)
        if (filtered.length === 0) return
        this.arrayWithText.push(...filtered)
        this.setValue(this.key, JSON.stringify(this.arrayWithText))
        this.emit('changed', this.set)
      },
      _reject(values) {
        var valueSet = this._setOf(values)
        return this.arrayWithText.filter(function(v) {
          return !valueSet.has(this._toUpperCaseIfRequired(valueIfObj(v)))
        }, this)
      },
      remove(values) {
        const oldVals = this.arrayWithText
        const newVals = this._reject(values)
        if (oldVals.length === newVals.length) return
        this._arrayWithText = newVals
        this.setValue(this.key, JSON.stringify(newVals))
        this.emit('changed', this.set)
      },
      async removeAsync(values) {
        await this.sync()
        this.remove(values)
      },
      clear() {
        if (!this.arrayWithText.length) return
        this._arrayWithText = []
        this.setValue(this.key, '[]')
        this.emit('changed', new Set())
      },
      async sync() {
        this._arrayWithText = JSON.parse(await this.getValue(this.key, '[]'))
      },
    })
    return ArrayStore
  })(EventEmitter)

  var Store = (function(_super) {
    var Store = function(getValue, setValue, key, defaultValue) {
      _super.call(this)
      this.getValue = getValue
      this.setValue = setValue
      this.key = key
      this._value = this.defaultValue = defaultValue
    }
    Store.prototype = createObject(_super.prototype, {
      get value() {
        return this._value
      },
      set value(value) {
        if (this._value === value) return
        this._value = value
        this.setValue(this.key, value)
        this.emit('changed', value)
      },
      async sync() {
        this._value = await this.getValue(this.key, this.defaultValue)
      }
    })
    return Store
  })(EventEmitter)

  var Config = (function() {
    var ngMovieVisibleStore = function() {
      var value
      var getValue = function(_, defval) {
        return value === undefined ? defval : value
      }
      var setValue = function(_, v) { value = v }
      return new Store(getValue, setValue, 'ngMovieVisible', false)
    }
    var csv = (function() {
      var RECORD_LENGTH = 3
      var TYPE = 0
      var VALUE = 1
      var TEXT = 2
      var isObject = function(v) {
        return v === Object(v)
      }
      var csvToArray = function(csv) {
        /*
          パース対象の文字列最後の文字がカンマのとき、
          そのカンマが空のフィールドとしてパースされない。
          \n を追加して対処する。
        */
        return d3.csvParseRows(csv + '\n')
      }
      var createRecord = function(type, value, text) {
        var result = []
        result[TYPE] = type
        result[VALUE] = value
        result[TEXT] = text
        return result
      }
      var trimFields = function(record) {
        var r = record
        return createRecord(r[TYPE].trim(), r[VALUE].trim(), r[TEXT].trim())
      }
      var isIntValueType = function(type) {
        return ['ngUserId', 'ngChannelId'].indexOf(type) >= 0
      }
      var hasValidValue = function(record) {
        var v = record[VALUE]
        return v.length !== 0
            && !(isIntValueType(record[TYPE]) && Number.isNaN(Math.trunc(v)))
      }
      var valueToIntIfIntValueType = function(record) {
        var r = record
        return isIntValueType(r[TYPE])
             ? createRecord(r[TYPE], Math.trunc(r[VALUE]), r[TEXT])
             : r
      }
      var records = function(csv) {
        return csvToArray(csv)
          .filter(function(record) { return record.length === RECORD_LENGTH })
          .map(trimFields)
          .filter(hasValidValue)
          .map(valueToIntIfIntValueType)
      }
      var isValueOnlyType = function(type) {
        return ['ngTitle', 'ngTag', 'ngUserName'].indexOf(type) >= 0
      }
      var getValue = function(record) {
        var value = record[VALUE]
        if (isValueOnlyType(record[TYPE])) return value
        var text = record[TEXT]
        return text ? {value, text} : value
      }
      var createTypeToValuesMap = function() {
        return new Map([
          ['ngMovieId', []],
          ['ngTitle', []],
          ['ngTag', []],
          ['ngUserId', []],
          ['ngUserName', []],
          ['ngChannelId', []],
          ['visitedMovieId', []],
        ])
      }
      return {
        create(arrayStore, type) {
          return d3.csvFormatRows(arrayStore.arrayWithText.map(function(value) {
            return isObject(value)
                 ? createRecord(type, value.value, value.text)
                 : createRecord(type, value, '')
          }))
        },
        parse(csv) {
          var result = createTypeToValuesMap()
          for (var r of records(csv)) {
            var values = result.get(r[TYPE])
            if (values) values.push(getValue(r))
          }
          return result
        },
      }
    })()

    var Config = function(getValue, setValue) {
      var store = function(key, defaultValue) {
        return new Store(getValue, setValue, key, defaultValue || true)
      }
      var arrayStore = function(key, caseInsensitive) {
        return new ArrayStore(getValue, setValue, key, caseInsensitive)
      }
      this.visitedMovieViewMode = store('visitedMovieViewMode', 'reduce')
      this.visibleContributorType = store('visibleContributorType', 'all')
      this.openNewWindow = store('openNewWindow')
      this.useGetThumbInfo = store('useGetThumbInfo')
      this.movieInfoTogglable = store('movieInfoTogglable')
      this.descriptionTogglable = store('descriptionTogglable')
      this.seamlessRankingNumber = store('seamlessRankingNumber')
      this.requestingNext = store('requestingNext')
      this.popupVisible = store('popupVisible')
      this.movingUp = store('movingUp')
      this.visitedMovies = arrayStore('visitedMovies')
      this.ngMovies = arrayStore('ngMovies')
      this.ngTitles = arrayStore('ngTitles', true)
      this.ngTags = arrayStore('ngTags', true)
      this.ngUserIds = arrayStore('ngUserIds')
      this.ngUserNames = arrayStore('ngUserNames', true)
      this.ngChannelIds = arrayStore('ngChannelIds')
      this.ngMovieVisible = ngMovieVisibleStore()
    }
    Config.prototype.sync = function() {
      return Promise.all([
        this.visitedMovieViewMode.sync(),
        this.visibleContributorType.sync(),
        this.openNewWindow.sync(),
        this.useGetThumbInfo.sync(),
        this.movieInfoTogglable.sync(),
        this.descriptionTogglable.sync(),
        this.seamlessRankingNumber.sync(),
        this.requestingNext.sync(),
        this.popupVisible.sync(),
        this.movingUp.sync(),
        this.visitedMovies.sync(),
        this.ngMovies.sync(),
        this.ngTitles.sync(),
        this.ngTags.sync(),
        this.ngUserIds.sync(),
        this.ngUserNames.sync(),
        this.ngChannelIds.sync(),
      ])
    }
    Config.prototype.toCSV = async function(targetTypes) {
      await this.sync()
      var csvTexts = []
      if (targetTypes['ngMovieId']) {
        csvTexts.push(csv.create(this.ngMovies, 'ngMovieId'))
      }
      if (targetTypes['ngTitle']) {
        csvTexts.push(csv.create(this.ngTitles, 'ngTitle'))
      }
      if (targetTypes['ngTag']) {
        csvTexts.push(csv.create(this.ngTags, 'ngTag'))
      }
      if (targetTypes['ngUserId']) {
        csvTexts.push(csv.create(this.ngUserIds, 'ngUserId'))
      }
      if (targetTypes['ngUserName']) {
        csvTexts.push(csv.create(this.ngUserNames, 'ngUserName'))
      }
      if (targetTypes['ngChannelId']) {
        csvTexts.push(csv.create(this.ngChannelIds, 'ngChannelId'))
      }
      if (targetTypes['visitedMovieId']) {
        csvTexts.push(csv.create(this.visitedMovies, 'visitedMovieId'))
      }
      return csvTexts.filter(Boolean).join('\n')
    }
    Config.prototype.addFromCSV = async function(csvText) {
      await this.sync()
      var map = csv.parse(csvText)
      this.ngMovies.addAll(map.get('ngMovieId'))
      this.ngTitles.addAll(map.get('ngTitle'))
      this.ngTags.addAll(map.get('ngTag'))
      this.ngUserIds.addAll(map.get('ngUserId'))
      this.ngUserNames.addAll(map.get('ngUserName'))
      this.ngChannelIds.addAll(map.get('ngChannelId'))
      this.visitedMovies.addAll(map.get('visitedMovieId'))
    }
    return Config
  })()

  var ThumbInfo = (function(_super) {
    var parseTags = function(tags) {
      return Array.from(tags, function(t) { return t.textContent })
    }
    var contributor = function(rootElem, type, id, name) {
      return {
        type: type,
        id: parseInt(rootElem.querySelector(id).textContent),
        name: rootElem.querySelector(name).textContent,
      }
    }
    var user = function(rootElem) {
      return contributor(rootElem
                       , 'user'
                       , 'thumb > user_id'
                       , 'thumb > user_nickname')
    }
    var channel = function(rootElem) {
      return contributor(rootElem
                       , 'channel'
                       , 'thumb > ch_id'
                       , 'thumb > ch_name')
    }
    var parseContributor = function(rootElem) {
      var userId = rootElem.querySelector('thumb > user_id')
      return userId ? user(rootElem) : channel(rootElem)
    }
    var parseThumbInfo = function(rootElem) {
      return {
        description: rootElem.querySelector('thumb > description').textContent,
        tags: parseTags(rootElem.querySelectorAll('thumb > tags > tag')),
        contributor: parseContributor(rootElem),
        title: rootElem.querySelector('thumb > title').textContent,
        error: {type: 'NO_ERROR', message: 'no error'},
      }
    }
    var error = function(type, message, id) {
      var result = {error: {type, message}}
      if (id) result.id = id
      return result
    }
    var parseError = function(rootElem) {
      var type = rootElem.querySelector('error > code').textContent
      switch (type) {
        case 'DELETED': return error(type, '削除された動画')
        case 'NOT_FOUND': return error(type, '見つからない、または無効な動画')
        case 'COMMUNITY': return error(type, 'コミュニティ限定動画')
        default: return error(type, 'エラーコード: ' + type)
      }
    }
    var parseResText = function(resText) {
      try {
        var d = new DOMParser().parseFromString(resText, 'application/xml')
        var r = d.documentElement
        var status = r.getAttribute('status')
        switch (status) {
          case 'ok': return parseThumbInfo(r)
          case 'fail': return parseError(r)
          default: return error(status, 'ステータス: ' + status)
        }
      } catch (e) {
        return error('PARSING', 'パースエラー')
      }
    }
    var statusMessage = function(res) {
      return res.status + ' ' + res.statusText
    }

    var ThumbInfo = function(httpRequest, concurrent) {
      _super.call(this)
      this.httpRequest = httpRequest
      this.concurrent = concurrent || 5
      this._requestCount = 0
      this._pendingIds = []
      this._requestedIds = new Set()
    }
    ThumbInfo.prototype = createObject(_super.prototype, {
      _onerror(id) {
        this._requestCount--
        this._requestNextMovie()
        this.emit('errorOccurred', error('ERROR', 'エラー', id))
      },
      _ontimeout(id, retried) {
        if (retried) {
          this._requestCount--
          this._requestNextMovie()
          this.emit('errorOccurred', error('TIMEOUT', 'タイムアウト', id))
        } else {
          this._requestMovie(id, true)
        }
      },
      _onload(id, res) {
        this._requestCount--
        this._requestNextMovie()
        if (res.status === 200) {
          var thumbInfo = parseResText(res.responseText)
          thumbInfo.id = id
          if (thumbInfo.error.type === 'NO_ERROR') {
            this.emit('completed', thumbInfo)
          } else {
            this.emit('errorOccurred', thumbInfo)
          }
        } else {
          this.emit('errorOccurred'
                  , error('HTTP_STATUS', statusMessage(res), id))
        }
      },
      _requestMovie(id, retry) {
        this.httpRequest({
          method: 'GET',
          url: 'https://ext.nicovideo.jp/api/getthumbinfo/' + id,
          timeout: 5000,
          onload: this._onload.bind(this, id),
          onerror: this._onerror.bind(this, id),
          ontimeout: this._ontimeout.bind(this, id, retry),
        })
      },
      _requestNextMovie() {
        var id = this._pendingIds.shift()
        if (!id) return
        this._requestMovie(id)
        this._requestCount++
      },
      _getNewIds(ids) {
        ids = ids || []
        var m = this._requestedIds
        return [...new Set(ids)].filter(function(id) { return !m.has(id) })
      },
      _requestAsPossible() {
        var space = this.concurrent - this._requestCount
        var c = Math.min(this._pendingIds.length, space)
        for (var i = 0; i < c; i++) this._requestNextMovie()
      },
      request(ids) {
        var newIds = this._getNewIds(ids)
        for (var id of newIds) this._requestedIds.add(id)
        ;[].push.apply(this._pendingIds, newIds)
        this._requestAsPossible()
        return this
      },
    })
    return ThumbInfo
  })(EventEmitter)

  var NicoChart = (function(_super) {
    var url = function(o) {
      var t = o.type === 'all' ? '' : o.type
      var p = o.from === 101 ? '' : 'page=2&'
      return `http://now.nicochart.jp/hourly/${t}?${p}rank=-101`
    }
    var parseVideoInfo = function(e) {
      var t = function(selector) {
        var n = e.querySelector(selector)
        return n ? n.textContent : ''
      }
      return {
        point: e.parentNode.querySelector('.video-chart .point').textContent,
        contributionDay: e.querySelector('.first-retrieve').firstChild.nodeValue,
        movieLength: t('.length'),
        viewCount: t('.view em'),
        resCount: t('.res em'),
        mylistCount: t('.mylist em'),
        url: e.parentNode.querySelector('.thumbnail-image a').href,
        thumbURL: e.parentNode.querySelector('.thumbnail-image a img').title,
        title: t('.title > a'),
        description: t('.description-summary'),
        comment: t('.last-res-body'),
        fresh: Boolean(e.querySelector('.first-retrieve.new')),
      }
    }
    var parse = function(text, from) {
      var d = new DOMParser().parseFromString(text, 'text/html')
      var infos = d.querySelectorAll('#result .video-info')
      if (infos.length === 0) {
        throw new Error('"#result .video-info" query return empty')
      }
      return Array.from(infos)
        .map(parseVideoInfo)
        .map(function(o) {
          o.rank = from++
          return o
        })
    }
    var NicoChart = function(request) {
      _super.call(this)
      this._request = request
    }
    NicoChart.prototype = createObject(_super.prototype, {
      _onload(from, r) {
        if (r.status === 200) {
          try {
            this.emit('completed', parse(r.responseText, from))
          } catch (e) {
            this.emit('errorOccurred', e.message)
          }
        } else {
          this.emit('errorOccurred', r.status + ' ' + r.statusText)
        }
      },
      _onerror(message) {
        this.emit('errorOccurred', message)
      },
      request(o) {
        if (['all', 'view', 'res', 'mylist'].indexOf(o.type) === -1) {
          throw new Error('o.type: ' + o.type)
        }
        if ([101, 201].indexOf(o.from) === -1) {
          throw new Error('o.from: ' + o.from)
        }
        this._request({
          method: 'GET',
          timeout: 30000,
          url: url(o),
          onload: this._onload.bind(this, o.from),
          onerror: this._onerror.bind(this, 'エラー'),
          ontimeout: this._onerror.bind(this, 'タイムアウト'),
        })
      },
    })
    return NicoChart
  })(EventEmitter)

  var Tag = (function(_super) {
    var Tag = function(name) {
      _super.call(this)
      this.name = name
      this.ng = false
    }
    Tag.prototype = createObject(_super.prototype, {
      updateNg(upperCaseNgTagNameSet) {
        var pre = this.ng
        this.ng = upperCaseNgTagNameSet.has(this.name.toUpperCase())
        if (pre !== this.ng) this.emit('ngChanged', this.ng)
      },
    })
    return Tag
  })(EventEmitter)

  var Contributor = (function(_super) {
    var Contributor = function(type, id, name) {
      _super.call(this)
      this.type = type
      this.id = id
      this.name = name
      this.ng = false
      this.ngId = false
      this.ngName = ''
    }
    Contributor.prototype = createObject(_super.prototype, {
      _updateNg() {
        var pre = this.ng
        this.ng = this.ngId || Boolean(this.ngName)
        if (pre !== this.ng) this.emit('ngChanged', this.ng)
      },
      updateNgId(ngIdSet) {
        var pre = this.ngId
        this.ngId = ngIdSet.has(this.id)
        if (pre !== this.ngId) this.emit('ngIdChanged', this.ngId)
        this._updateNg()
      },
      _getNewNgName(upperCaseNgNameSet) {
        var n = this.name.toUpperCase()
        for (var ngName of upperCaseNgNameSet)
          if (n.includes(ngName)) return ngName
        return ''
      },
      updateNgName(upperCaseNgNameSet) {
        var pre = this.ngName
        this.ngName = this._getNewNgName(upperCaseNgNameSet)
        if (pre !== this.ngName) this.emit('ngNameChanged', this.ngName)
        this._updateNg()
      },
      get url() {
        throw new Error('must be implemented')
      },
      bindToConfig(config) {
        this.updateNgId(config[this.ngIdStoreName].set)
        config[this.ngIdStoreName].on('changed', this.updateNgId.bind(this))
      },
    })

    var User = function(id, name) {
      Contributor.call(this, 'user', id, name)
    }
    User.prototype = createObject(Contributor.prototype, {
      get ngIdStoreName() { return 'ngUserIds' },
      get url() {
        return 'https://www.nicovideo.jp/user/' + this.id
      },
      bindToConfig(config) {
        Contributor.prototype.bindToConfig.call(this, config)
        this.updateNgName(config.ngUserNames.set)
        config.ngUserNames.on('changed', this.updateNgName.bind(this))
      },
    })

    var Channel = function(id, name) {
      Contributor.call(this, 'channel', id, name)
    }
    Channel.prototype = createObject(Contributor.prototype, {
      get ngIdStoreName() { return 'ngChannelIds' },
      get url() {
        return 'https://ch.nicovideo.jp/channel/ch' + this.id
      },
    })

    Object.assign(Contributor, {
      NULL: new Contributor('unknown', -1, ''),
      TYPES: ['user', 'channel'],
      new(type, id, name) {
        switch (type) {
          case 'user': return new User(id, name)
          case 'channel': return new Channel(id, name)
          default: throw new Error(type)
        }
      },
    })
    return Contributor
  })(EventEmitter)

  var Movie = (function(_super) {
    var Movie = function(id, title) {
      _super.call(this)
      this.id = id
      this.title = title
      this.ngTitle = ''
      this.ngId = false
      this.visited = false
      this._tags = []
      this._contributor = Contributor.NULL
      this._description = ''
      this._error = Movie.NO_ERROR
      this._thumbInfoDone = false
      this._ng = false
    }
    Movie.NO_ERROR = {type: 'NO_ERROR', message: 'no error'}
    Movie.prototype = createObject(_super.prototype, {
      _matchedNgTitle(upperCaseNgTitleSet) {
        var t = this.title.toUpperCase()
        for (var ng of upperCaseNgTitleSet) {
          if (t.includes(ng)) return ng
        }
        return ''
      },
      updateNgTitle(upperCaseNgTitleSet) {
        var pre = this.ngTitle
        this.ngTitle = this._matchedNgTitle(upperCaseNgTitleSet)
        if (pre === this.ngTitle) return
        this.emit('ngTitleChanged', this.ngTitle)
        this._updateNg()
      },
      updateNgId(ngIdSet) {
        var pre = this.ngId
        this.ngId = ngIdSet.has(this.id)
        if (pre === this.ngId) return
        this.emit('ngIdChanged', this.ngId)
        this._updateNg()
      },
      updateVisited(visitedIdSet) {
        var pre = this.visited
        this.visited = visitedIdSet.has(this.id)
        if (pre !== this.visited) this.emit('visitedChanged', this.visited)
      },
      get description() { return this._description },
      set description(description) {
        this._description = description
        this.emit('descriptionChanged', this._description)
      },
      get tags() { return this._tags },
      set tags(tags) {
        this._tags = tags
        this.emit('tagsChanged', this._tags)
        this._updateNg()
        var update = this._updateNg.bind(this)
        for (var t of this._tags) t.on('ngChanged', update)
      },
      get contributor() { return this._contributor },
      set contributor(contributor) {
        this._contributor = contributor
        this.emit('contributorChanged', this._contributor)
        this._updateNg()
        this._contributor.on('ngChanged', this._updateNg.bind(this))
      },
      get error() { return this._error },
      set error(error) {
        this._error = error
        this.emit('errorChanged', this._error)
      },
      get thumbInfoDone() { return this._thumbInfoDone },
      setThumbInfoDone() {
        this._thumbInfoDone = true
        this.emit('thumbInfoDone')
      },
      get ng() { return this._ng },
      _updateNg() {
        var pre = this._ng
        this._ng = this.ngId
          || Boolean(this.ngTitle)
          || this.contributor.ng
          || this.tags.some(function(t) { return t.ng })
        if (pre !== this._ng) this.emit('ngChanged', this._ng)
      },
      addListenerToConfig(config) {
        config.ngMovies.on('changed', this.updateNgId.bind(this))
        config.ngTitles.on('changed', this.updateNgTitle.bind(this))
        config.visitedMovies.on('changed', this.updateVisited.bind(this))
      },
    })
    return Movie
  })(EventEmitter)

  var Movies = (function() {
    var Movies = function(config) {
      this.config = config
      this._idToMovie = new Map()
    }
    Movies.prototype = {
      setIfAbsent(movies) {
        var ngIds = this.config.ngMovies.set
        var ngTitles = this.config.ngTitles.set
        var visitedIds = this.config.visitedMovies.set
        var map = this._idToMovie
        for (var m of movies) {
          if (map.has(m.id)) continue
          map.set(m.id, m)
          m.updateNgId(ngIds)
          m.updateNgTitle(ngTitles)
          m.updateVisited(visitedIds)
          m.addListenerToConfig(this.config)
        }
      },
      get(movieId) {
        return this._idToMovie.get(movieId)
      },
    }
    return Movies
  })()

  var ThumbInfoListener = (function() {
    var createTagBuilder = function(config) {
      var map = new Map()
      return function(name) {
        if (map.has(name)) return map.get(name)
        var tag = new Tag(name)
        map.set(name, tag)
        config.ngTags.on('changed', tag.updateNg.bind(tag))
        return tag
      }
    }
    var createTagsBuilder = function(config) {
      var getTagBy = createTagBuilder(config)
      return function(tagNames) {
        var tags = tagNames.map(getTagBy)
        var ngTagSet = config.ngTags.set
        for (var t of tags) t.updateNg(ngTagSet)
        return tags
      }
    }
    var createContributorBuilder = function(config) {
      var typeToMap = Contributor.TYPES.reduce(function(map, type) {
        return map.set(type, new Map())
      }, new Map())
      return function(o) {
        var map = typeToMap.get(o.type)
        if (map.has(o.id)) return map.get(o.id)
        var contributor = Contributor.new(o.type, o.id, o.name)
        map.set(o.id, contributor)
        contributor.bindToConfig(config)
        return contributor
      }
    }
    return {
      forCompleted(movies) {
        var getTagsBy = createTagsBuilder(movies.config)
        var getContributorBy = createContributorBuilder(movies.config)
        return function(thumbInfo) {
          var m = movies.get(thumbInfo.id)
          m.description = thumbInfo.description
          m.tags = getTagsBy(thumbInfo.tags)
          m.contributor = getContributorBy(thumbInfo.contributor)
          m.setThumbInfoDone()
        }
      },
      forErrorOccurred(movies) {
        return function(thumbInfo) {
          var m = movies.get(thumbInfo.id)
          m.error = thumbInfo.error
          m.setThumbInfoDone()
        }
      },
    }
  })()

  var MovieViewMode = (function(_super) {
    var MovieViewMode = function(movie, config) {
      _super.call(this)
      this.movie = movie
      this.config = config
      this.value = this._newViewMode()
    }
    MovieViewMode.prototype = createObject(_super.prototype, {
      _isHiddenByNg() {
        return !this.config.ngMovieVisible.value && this.movie.ng
      },
      _isHiddenByContributorType() {
        var c = this.movie.contributor
        if (c === Contributor.NULL) return false
        var t = this.config.visibleContributorType.value
        return !(t === 'all' || t === c.type)
      },
      _isHiddenByVisitedMovieViewMode() {
        return this.movie.visited
            && this.config.visitedMovieViewMode.value === 'hide'
      },
      _isHidden() {
        return this.movie.error.type === 'DELETED'
            || this._isHiddenByContributorType()
            || this._isHiddenByNg()
            || this._isHiddenByVisitedMovieViewMode()
      },
      _isReduced() {
        return this.movie.visited
            && this.config.visitedMovieViewMode.value === 'reduce'
      },
      _newViewMode() {
        if (this._isHidden()) return 'hide'
        if (this._isReduced()) return 'reduce'
        return 'doNothing'
      },
      update() {
        var pre = this.value
        this.value = this._newViewMode()
        if (pre !== this.value) this.emit('changed', this.value)
      },
      addListener() {
        var l = this.update.bind(this)
        this.movie
          .on('errorChanged', l)
          .on('ngChanged', l)
          .on('visitedChanged', l)
          .on('contributorChanged', l)
        ;['ngMovieVisible',
          'visibleContributorType',
          'visitedMovieViewMode',
        ].forEach(function(n) {
          this.config[n].on('changed', l)
        }, this)
        return this
      },
    })
    return MovieViewMode
  })(EventEmitter)

  var MovieViewModes = (function(_super) {
    var MovieViewModes = function(config) {
      _super.call(this)
      this.config = config
      this._movieToViewMode = new Map()
      this._emitViewModeChanged = this.emit.bind(this, 'movieViewModeChanged')
    }
    MovieViewModes.prototype = createObject(_super.prototype, {
      get(movie) {
        var m = this._movieToViewMode
        if (m.has(movie)) return m.get(movie)
        var viewMode = new MovieViewMode(movie, this.config)
        m.set(movie, viewMode)
        return viewMode.on('changed', this._emitViewModeChanged).addListener()
      },
      sort() {
        return [...this._movieToViewMode.values()].map(function(m, i) {
          return {i, m}
        }).sort(function(a, b) {
          if (a.m.value === 'hide' && b.m.value !== 'hide') return 1
          if (a.m.value !== 'hide' && b.m.value === 'hide') return -1
          return a.i - b.i
        }).map(function(o) {
          return o.m
        })
      },
    })
    return MovieViewModes
  })(EventEmitter)

  var ConfigDialog = (function(_super) {
    var isValidStr = function(s) {
      return typeof s === 'string' && Boolean(s.trim().length)
    }
    var isPositiveInt = function(n) {
      return Number.isSafeInteger(n) && n > 0
    }
    var initCheckbox = function(config, doc, name) {
      var b = doc.getElementById(name)
      b.checked = config[name].value
      b.addEventListener('change', function() {
        config[name].value = b.checked
      })
    }
    var optionOf = function(v) {
      return typeof v === 'object'
           ? new Option(v.value + ',' + v.text, v.value)
           : new Option(v, v)
    }
    var diffBy = function(target) {
      var SOMETHING_INPUT_TEXT = '何か入力して下さい。'
      var POSITIVE_INT_INPUT_TEXT = '1以上の整数を入力して下さい。'
      var movieUrlOf = function(movieId) {
        return 'https://www.nicovideo.jp/watch/' + movieId
      }
      return {
        'ng-movie-id': {
          targetText: 'NG動画ID',
          storeName: 'ngMovies',
          convert(v) { return v },
          isValid: isValidStr,
          inputRequestText: SOMETHING_INPUT_TEXT,
          urlOf: movieUrlOf,
        },
        'ng-title': {
          targetText: 'NGタイトル',
          storeName: 'ngTitles',
          convert(v) { return v },
          isValid: isValidStr,
          inputRequestText: SOMETHING_INPUT_TEXT,
          urlOf(title) { return 'https://www.nicovideo.jp/search/' + title },
        },
        'ng-tag': {
          targetText: 'NGタグ',
          storeName: 'ngTags',
          convert(v) { return v },
          isValid: isValidStr,
          inputRequestText: SOMETHING_INPUT_TEXT,
          urlOf(tag) { return 'https://www.nicovideo.jp/tag/' + tag },
        },
        'ng-user-id': {
          targetText: 'NGユーザーID',
          storeName: 'ngUserIds',
          convert: Math.trunc,
          isValid(v) { return isPositiveInt(Math.trunc(v)) },
          inputRequestText: POSITIVE_INT_INPUT_TEXT,
          urlOf(userId) { return 'https://www.nicovideo.jp/user/' + userId },
        },
        'ng-user-name': {
          targetText: 'NGユーザー名',
          storeName: 'ngUserNames',
          convert(v) { return v },
          isValid: isValidStr,
          inputRequestText: SOMETHING_INPUT_TEXT,
          urlOf(userName) { return 'https://www.nicovideo.jp/search/' + userName },
        },
        'ng-channel-id': {
          targetText: 'NGチャンネルID',
          storeName: 'ngChannelIds',
          convert: Math.trunc,
          isValid(v) { return isPositiveInt(Math.trunc(v)) },
          inputRequestText: POSITIVE_INT_INPUT_TEXT,
          urlOf(channelId) { return 'https://ch.nicovideo.jp/ch' + channelId },
        },
        'visited-movie-id': {
          targetText: '閲覧済み動画ID',
          storeName: 'visitedMovies',
          convert(v) { return v },
          isValid: isValidStr,
          inputRequestText: SOMETHING_INPUT_TEXT,
          urlOf: movieUrlOf,
        },
      }[target]
    }
    var promptFor = async function(target, config, defaultValue) {
      var d = diffBy(target)
      var r = ''
      do {
        var msg = r ? `"${r}"は登録済みです。\n` : ''
        r = window.prompt(msg + d.targetText, r || defaultValue || '')
        if (r === null) return ''
        while (!d.isValid(r)) {
          r = window.prompt(d.inputRequestText + '\n' + d.targetText)
          if (r === null) return ''
        }
      } while (!(await config[d.storeName].addAsync(d.convert(r))))
      return r
    }

    var ConfigDialog = function(config, doc, openInTab) {
      _super.call(this)
      this.config = config
      this.doc = doc
      this.openInTab = openInTab
      for (var v of config.ngTitles.array) {
        this._e('list').add(new Option(v, v))
      }
      this._e('removeAllButton').disabled = !config.ngTitles.array.length
      initCheckbox(config, doc, 'openNewWindow')
      initCheckbox(config, doc, 'useGetThumbInfo')
      initCheckbox(config, doc, 'seamlessRankingNumber')
      initCheckbox(config, doc, 'requestingNext')
      initCheckbox(config, doc, 'popupVisible')
      initCheckbox(config, doc, 'movieInfoTogglable')
      initCheckbox(config, doc, 'descriptionTogglable')
      this._on('target', 'change', this._targetChanged.bind(this))
      this._on('addButton', 'click', this._addButtonClicked.bind(this))
      this._on('removeButton', 'click', this._removeButtonClicked.bind(this))
      this._on('removeAllButton', 'click', this._removeAllButtonClicked.bind(this))
      this._on('openButton', 'click', this._openButtonClicked.bind(this))
      this._on('closeButton', 'click', this.emit.bind(this, 'closed'))
      this._on('exportVisibleCheckbox', 'change', this._exportVisibleCheckboxChanged.bind(this))
      this._on('importVisibleCheckbox', 'change', this._importVisibleCheckboxChanged.bind(this))
      this._on('exportButton', 'click', this._exportButtonClicked.bind(this))
      this._on('importButton', 'click', this._importButtonClicked.bind(this))
      var updateButtonsDisabled = this._updateButtonsDisabled.bind(this)
      this._on('target', 'change', updateButtonsDisabled)
      this._on('list', 'change', updateButtonsDisabled)
      this._on('addButton', 'click', updateButtonsDisabled)
      this._on('removeButton', 'click', updateButtonsDisabled)
      this._on('removeAllButton', 'click', updateButtonsDisabled)
    }
    ConfigDialog.prototype = createObject(_super.prototype, {
      _e(id) { return this.doc.getElementById(id) },
      _on(id, eventName, listener) {
        this._e(id).addEventListener(eventName, listener)
      },
      _diffBySelectedTarget() {
        return diffBy(this._e('target').value)
      },
      _updateList() {
        for (var o of Array.from(this._e('list').options)) o.remove()
        var d = this._diffBySelectedTarget()
        for (var val of this.config[d.storeName].arrayWithText) {
          this._e('list').add(optionOf(val))
        }
      },
      _targetChanged() {
        this._updateList()
      },
      _updateButtonsDisabled() {
        var l = this._e('list')
        var d = l.selectedIndex === -1
        this._e('removeButton').disabled = d
        this._e('openButton').disabled = d
        this._e('removeAllButton').disabled = !l.length
      },
      async _addButtonClicked() {
        var r = await promptFor(this._e('target').value, this.config)
        if (r) this._e('list').add(new Option(r, r))
      },
      async _removeButtonClicked() {
        var opts = Array.from(this._e('list').selectedOptions)
        var d = this._diffBySelectedTarget()
        await this.config[d.storeName]
          .removeAsync(opts.map(function(o) { return d.convert(o.value) }))
        for (var o of opts) o.remove()
      },
      _removeAllButtonClicked() {
        var d = this._diffBySelectedTarget()
        if (!window.confirm(`すべての"${d.targetText}"を削除しますか？`)) return
        this.config[d.storeName].clear()
        for (var o of Array.from(this._e('list').options)) o.remove()
      },
      _openButtonClicked() {
        var opts = Array.from(this._e('list').selectedOptions)
        var d = this._diffBySelectedTarget()
        for (var v of opts.map(function(o) { return o.value })) {
          this.openInTab(d.urlOf(v))
        }
      },
      _exportVisibleCheckboxChanged() {
        var n = this._e('exportVisibleCheckbox').checked ? 'remove' : 'add'
        this._e('exportContainer').classList[n]('isHidden')
      },
      _importVisibleCheckboxChanged() {
        var n = this._e('importVisibleCheckbox').checked ? 'remove' : 'add'
        this._e('importContainer').classList[n]('isHidden')
      },
      async _exportButtonClicked() {
        var textarea = this._e('exportTextarea')
        textarea.value = await this.config.toCSV({
          ngMovieId: this._e('exportNgMovieIdCheckbox').checked,
          ngTitle: this._e('exportNgTitleCheckbox').checked,
          ngTag: this._e('exportNgTagCheckbox').checked,
          ngUserId: this._e('exportNgUserIdCheckbox').checked,
          ngUserName: this._e('exportNgUserNameCheckbox').checked,
          ngChannelId: this._e('exportNgChannelIdCheckbox').checked,
          visitedMovieId: this._e('exportVisitedMovieIdCheckbox').checked,
        })
        textarea.focus()
        textarea.select()
      },
      async _importButtonClicked() {
        await this.config.addFromCSV(this._e('importTextarea').value)
        this._updateList()
        this._e('importTextarea').value = ''
      },
    })
    ConfigDialog.promptNgTitle = function(config, defaultValue) {
      promptFor('ng-title', config, defaultValue)
    }
    ConfigDialog.promptNgUserName = function(config, defaultValue) {
      promptFor('ng-user-name', config, defaultValue)
    }
    ConfigDialog.SRCDOC = `<!doctype html>
<html><head><style>
  html {
    margin: 0 auto;
    max-width: 30em;
    height: 100%;
    line-height: 1.5em;
  }
  body {
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .dialog {
    overflow: auto;
    padding: 8px;
    background-color: white;
  }
  p {
    margin: 0;
  }
  .listButtonsWrap {
    display: flex;
  }
  .listButtonsWrap .list {
    flex: auto;
  }
  .listButtonsWrap .list select {
    width: 100%;
  }
  .listButtonsWrap .buttons {
    flex: none;
    display: flex;
    flex-direction: column;
  }
  .listButtonsWrap .buttons input {
    margin-bottom: 5px;
  }
  .sideComment {
    margin-left: 2em;
  }
  .dialogBottom {
    text-align: center;
  }
  .scriptInfo {
    text-align: right;
  }
  .isHidden {
    display: none;
  }
  textarea {
    width: 100%;
  }
</style></head><body>
  <div class=dialog>
    <p><select id=target>
      <option value=ng-movie-id>NG動画ID</option>
      <option value=ng-title selected>NGタイトル</option>
      <option value=ng-tag>NGタグ</option>
      <option value=ng-user-id>NGユーザーID</option>
      <option value=ng-user-name>NGユーザー名</option>
      <option value=ng-channel-id>NGチャンネルID</option>
      <option value=visited-movie-id>閲覧済み動画ID</option>
    </select></p>
    <div class=listButtonsWrap>
      <p class=list><select multiple size=10 id=list></select></p>
      <p class=buttons>
        <input type=button value=追加 id=addButton>
        <input type=button value=削除 disabled id=removeButton>
        <input type=button value=全削除 disabled id=removeAllButton>
        <input type=button value=開く disabled id=openButton>
      </p>
    </div>
    <p><label><input type=checkbox id=openNewWindow>動画を別窓で開く</label></p>
    <p><label><input type=checkbox id=useGetThumbInfo>動画情報を取得する</label></p>
    <p><label><input type=checkbox id=seamlessRankingNumber>表示されている動画で順位を数える</label></p>
    <p><label><input type=checkbox id=requestingNext>カテゴリ合算毎時ランキングの 101 位以降を取得する</label></p>
    <p class=sideComment><small>取得元: <a target=_blank href=http://www.nicochart.jp/>ニコニコチャート</a></small></p>
    <p><label><input type=checkbox id=popupVisible>ポップアップを表示する</label></p>
    <fieldset>
      <legend>表示・非表示の切り替えボタン</legend>
      <p><label><input type=checkbox id=movieInfoTogglable>タグ、ユーザー、チャンネル</label></p>
      <p><label><input type=checkbox id=descriptionTogglable>動画説明</label></p>
    </fieldset>
    <p>エクスポート<small><label><input id=exportVisibleCheckbox type=checkbox>表示</label></small></p>
    <div id=exportContainer class=isHidden>
      <p><label><input id=exportNgMovieIdCheckbox type=checkbox checked>NG動画ID</label></p>
      <p><label><input id=exportNgTitleCheckbox type=checkbox checked>NGタイトル</label></p>
      <p><label><input id=exportNgTagCheckbox type=checkbox checked>NGタグ</label></p>
      <p><label><input id=exportNgUserIdCheckbox type=checkbox checked>NGユーザーID</label></p>
      <p><label><input id=exportNgUserNameCheckbox type=checkbox checked>NGユーザー名</label></p>
      <p><label><input id=exportNgChannelIdCheckbox type=checkbox checked>NGチャンネルID</label></p>
      <p><label><input id=exportVisitedMovieIdCheckbox type=checkbox checked>閲覧済み動画ID</label></p>
      <p><input id=exportButton type=button value=エクスポート></p>
      <p><textarea id=exportTextarea rows=3></textarea></p>
    </div>
    <p>インポート<small><label><input id=importVisibleCheckbox type=checkbox>表示</label></small></p>
    <div id=importContainer class=isHidden>
      <p><textarea id=importTextarea rows=3></textarea></p>
      <p><input id=importButton type=button value=インポート></p>
    </div>
    <p class=dialogBottom><input type=button value=閉じる id=closeButton></p>
    <p class=scriptInfo><small><a href=https://greasyfork.org/ja/scripts/880-nico-nico-ranking-ng target=_blank>Nico Nico Ranking NG</a></small></p>
  </div>
</body></html>`
    return ConfigDialog
  })(EventEmitter)

  var NicoPage = (function() {
    var TOGGLE_OPEN_TEXT = '▼'
    var TOGGLE_CLOSE_TEXT = '▲'
    var emphasizeMatchedText = function(e, text, createMatchedElem) {
      var t = e.textContent
      if (!text) {
        e.textContent = t
        return
      }
      var i = t.toUpperCase().indexOf(text)
      if (i === -1) {
        e.textContent = t
        return
      }
      while (e.hasChildNodes()) e.removeChild(e.firstChild)
      var d = e.ownerDocument
      if (i !== 0) e.appendChild(d.createTextNode(t.slice(0, i)))
      e.appendChild(createMatchedElem(t.slice(i, i + text.length)))
      if (i + text.length !== t.length) {
        e.appendChild(d.createTextNode(t.slice(i + text.length)))
      }
    }

    var MovieTitle = (function() {
      var MovieTitle = function(elem) {
        this.elem = elem
        this._ngTitle = ''
        this._listeners = new Listeners({
          ngIdChanged: set(this, 'ngId'),
          ngTitleChanged: set(this, 'ngTitle'),
        })
      }
      MovieTitle.prototype = {
        get ngId() {
          return this.elem.classList.contains('nrn-ng-movie-title')
        },
        set ngId(ngId) {
          var n = ngId ? 'add' : 'remove'
          this.elem.classList[n]('nrn-ng-movie-title')
        },
        _createNgTitleElem(textContent) {
          var result = this.elem.ownerDocument.createElement('span')
          result.className = 'nrn-matched-ng-title'
          result.textContent = textContent
          return result
        },
        get ngTitle() { return this._ngTitle },
        set ngTitle(ngTitle) {
          this._ngTitle = ngTitle
          emphasizeMatchedText(this.elem, ngTitle, this._createNgTitleElem.bind(this))
        },
        bindToMovie(movie) {
          this.ngId = movie.ngId
          this.ngTitle = movie.ngTitle
          this._listeners.bind(movie)
          return this
        },
        unbind() {
          this._listeners.unbind()
        },
      }
      return MovieTitle
    })()

    var ActionPane = (function() {
      var createVisitButton = function(doc, movie) {
        var result = doc.createElement('span')
        result.className = 'nrn-visit-button'
        result.textContent = '閲覧済み'
        result.dataset.movieId = movie.id
        result.dataset.type = 'add'
        result.dataset.movieTitle = movie.title
        return result
      }
      var createMovieNgButton = function(doc, movie) {
        var result = doc.createElement('span')
        result.className = 'nrn-movie-ng-button'
        result.textContent = 'NG動画'
        result.dataset.movieId = movie.id
        result.dataset.type = 'add'
        result.dataset.movieTitle = movie.title
        return result
      }
      var createTitleNgButton = function(doc, movie) {
        var result = doc.createElement('span')
        result.className = 'nrn-title-ng-button'
        result.textContent = 'NGタイトル追加'
        result.dataset.movieTitle = movie.title
        result.dataset.ngTitle = ''
        return result
      }
      var createPane = function(doc) {
        var result = doc.createElement('div')
        result.className = 'nrn-action-pane'
        for (var c of Array.from(arguments).slice(1)) result.appendChild(c)
        return result
      }
      var ActionPane = function(doc, movie) {
        this.elem = createPane(doc
                             , createVisitButton(doc, movie)
                             , createMovieNgButton(doc, movie)
                             , createTitleNgButton(doc, movie))
        this._listeners = new Listeners({
          ngIdChanged: set(this, 'ngId'),
          ngTitleChanged: set(this, 'ngTitle'),
          visitedChanged: set(this, 'visited'),
        })
      }
      ActionPane.prototype = {
        get _visitButton() {
          return this.elem.querySelector('.nrn-visit-button')
        },
        get visited() {
          return this._visitButton.dataset.type === 'remove'
        },
        set visited(visited) {
          var b = this._visitButton
          b.textContent = visited ? '未閲覧' : '閲覧済み'
          b.dataset.type = visited ? 'remove' : 'add'
        },
        get _movieNgButton() {
          return this.elem.querySelector('.nrn-movie-ng-button')
        },
        get ngId() {
          return this._movieNgButton.dataset.type === 'remove'
        },
        set ngId(ngId) {
          var b = this._movieNgButton
          b.textContent = ngId ? 'NG解除' : 'NG登録'
          b.dataset.type = ngId ? 'remove' : 'add'
        },
        get _titleNgButton() {
          return this.elem.querySelector('.nrn-title-ng-button')
        },
        get ngTitle() {
          return this._titleNgButton.dataset.ngTitle
        },
        set ngTitle(ngTitle) {
          var b = this._titleNgButton
          b.textContent = ngTitle ? 'NGタイトル削除' : 'NGタイトル追加'
          b.dataset.type = ngTitle ? 'remove' : 'add'
          b.dataset.ngTitle = ngTitle
        },
        bindToMovie(movie) {
          this.ngId = movie.ngId
          this.ngTitle = movie.ngTitle
          this.visited = movie.visited
          this._listeners.bind(movie)
          return this
        },
        unbind() {
          this._listeners.unbind()
        },
      }
      return ActionPane
    })()

    var TagView = (function() {
      var createElem = function(doc, tagName) {
        var a = doc.createElement('a')
        a.className = 'nrn-movie-tag-link'
        a.target = '_blank'
        a.textContent = tagName
        a.href = 'https://www.nicovideo.jp/tag/' + tagName
        var b = doc.createElement('span')
        b.className = 'nrn-tag-ng-button'
        b.textContent = '[+]'
        b.dataset.type = 'add'
        b.dataset.tagName = tagName
        var result = doc.createElement('span')
        result.className = 'nrn-movie-tag'
        result.appendChild(a)
        result.appendChild(b)
        return result
      }
      var TagView = function(doc, tagName) {
        this.tagName = tagName
        this.elem = createElem(doc, tagName)
        this._listeners = new Listeners({ngChanged: set(this, 'ng')})
      }
      TagView.prototype = {
        get _link() {
          return this.elem.querySelector('.nrn-movie-tag-link')
        },
        get ng() {
          return this._link.classList.contains('nrn-movie-ng-tag-link')
        },
        set ng(ng) {
          this._link.classList[ng ? 'add' : 'remove']('nrn-movie-ng-tag-link')
          var b = this.elem.querySelector('.nrn-tag-ng-button')
          b.textContent = ng ? '[x]' : '[+]'
          b.dataset.type = ng ? 'remove' : 'add'
        },
        bindToTag(tag) {
          this.ng = tag.ng
          this._listeners.bind(tag)
          return this
        },
        unbind() {
          this._listeners.unbind()
        },
      }
      return TagView
    })()

    var ContributorView = (function() {
      var ContributorView = function(doc, contributor) {
        this.contributor = contributor
        this.elem = this._createElem(doc)
      }
      ContributorView.prototype = {
        _createElem(doc) {
          var a = doc.createElement('a')
          a.className = 'nrn-contributor-link'
          a.target = '_blank'
          a.href = this.contributor.url
          a.textContent = this.contributor.name
          var b = doc.createElement('span')
          this._setNgButton(b)
          var result = doc.createElement('span')
          result.className = 'nrn-contributor'
          result.appendChild(doc.createTextNode(this._label))
          result.appendChild(a)
          result.appendChild(b)
          return result
        },
        _initContributorDataset(dataset) {
          dataset.contributorType = this.contributor.type
          dataset.id = this.contributor.id
          dataset.name = this.contributor.name
          dataset.type = 'add'
        },
        get _label() {
          throw new Error('must be implemented')
        },
        _setNgButton() {
          throw new Error('must be implemented')
        },
        _bindToContributor() {
          throw new Error('must be implemented')
        },
      }

      var UserView = function UserView(doc, contributor) {
        ContributorView.call(this, doc, contributor)
        this._listeners = new Listeners({
          ngIdChanged: set(this, 'ngId'),
          ngNameChanged: set(this, 'ngName'),
        })
        this._bindToContributor()
      }
      UserView.prototype = createObject(ContributorView.prototype, {
        get _label() {
          return 'ユーザー: '
        },
        _setNgButton(b) {
          var d = b.ownerDocument
          var ngIdButton = d.createElement('span')
          ngIdButton.className = 'nrn-contributor-ng-id-button'
          ngIdButton.textContent = '+ID'
          this._initContributorDataset(ngIdButton.dataset)
          var ngNameButton = d.createElement('span')
          ngNameButton.className = 'nrn-contributor-ng-name-button'
          ngNameButton.textContent = '+名'
          this._initContributorDataset(ngNameButton.dataset)
          b.className = 'nrn-user-ng-button'
          b.appendChild(d.createTextNode('['))
          b.appendChild(ngIdButton)
          b.appendChild(d.createTextNode('/'))
          b.appendChild(ngNameButton)
          b.appendChild(d.createTextNode(']'))
        },
        get ngId() {
          return this.elem.querySelector('.nrn-contributor-link')
            .classList.contains('nrn-ng-id-contributor-link')
        },
        set ngId(ngId) {
          var a = this.elem.querySelector('.nrn-contributor-link')
          a.classList[ngId ? 'add' : 'remove']('nrn-ng-id-contributor-link')
          var b = this.elem.querySelector('.nrn-contributor-ng-id-button')
          b.textContent = ngId ? 'xID' : '+ID'
          b.dataset.type = ngId ? 'remove' : 'add'
        },
        get ngName() {
          var e = this.elem.querySelector('.nrn-matched-ng-contributor-name')
          return e ? e.textContent : ''
        },
        set ngName(ngName) {
          var b = this.elem.querySelector('.nrn-contributor-ng-name-button')
          b.textContent = ngName ? 'x名' : '+名'
          b.dataset.type = ngName ? 'remove' : 'add'
          b.dataset.matched = ngName
          emphasizeMatchedText(
            this.elem.querySelector('.nrn-contributor-link'),
            ngName,
            function(text) {
              var result = this.elem.ownerDocument.createElement('span')
              result.className = 'nrn-matched-ng-contributor-name'
              result.textContent = text
              return result
            }.bind(this))
        },
        _bindToContributor() {
          this.ngId = this.contributor.ngId
          this.ngName = this.contributor.ngName
          this._listeners.bind(this.contributor)
          return this
        },
        unbind() {
          this._listeners.unbind()
        },
      })

      var ChannelView = function ChannelView(doc, contributor) {
        ContributorView.call(this, doc, contributor)
        this._listeners = new Listeners({ngChanged: set(this, 'ng')})
        this._bindToContributor()
      }
      ChannelView.prototype = createObject(ContributorView.prototype, {
        get _label() {
          return 'チャンネル: '
        },
        _setNgButton(e) {
          e.className = 'nrn-contributor-ng-button'
          e.textContent = '[+]'
          this._initContributorDataset(e.dataset)
        },
        get ng() {
          return this.elem.querySelector('.nrn-contributor-link')
            .classList.contains('nrn-ng-contributor-link')
        },
        set ng(ng) {
          var a = this.elem.querySelector('.nrn-contributor-link')
          a.classList[ng ? 'add' : 'remove']('nrn-ng-contributor-link')
          var b = this.elem.querySelector('.nrn-contributor-ng-button')
          b.textContent = ng ? '[x]' : '[+]'
          b.dataset.type = ng ? 'remove' : 'add'
        },
        _bindToContributor() {
          this.ng = this.contributor.ng
          this._listeners.bind(this.contributor)
          return this
        },
        unbind() {
          this._listeners.unbind()
        },
      })

      ContributorView.new = function(doc, contributor) {
        switch (contributor.type) {
          case 'user': return new UserView(doc, contributor)
          case 'channel': return new ChannelView(doc, contributor)
          default: throw new Error(contributor.type)
        }
      }
      return ContributorView
    })()

    var MovieInfo = (function() {
      var createElem = function(doc) {
        var e = doc.createElement('P')
        e.className = 'nrn-error'
        var t = doc.createElement('p')
        t.className = 'nrn-tag-container'
        var c = doc.createElement('p')
        c.className = 'nrn-contributor-container'
        var result = doc.createElement('div')
        result.className = 'nrn-movie-info-container'
        result.appendChild(e)
        result.appendChild(t)
        result.appendChild(c)
        return result
      }
      var createToggle = function(doc) {
        var result = doc.createElement('span')
        result.className = 'nrn-movie-info-toggle'
        result.textContent = TOGGLE_OPEN_TEXT
        return result
      }
      var MovieInfo = function(doc) {
        this.elem = createElem(doc)
        this.toggle = createToggle(doc)
        this.togglable = true
        this._tagViews = []
        this._contributorView = null
        this._error = Movie.NO_ERROR
        this._actionPane = null
        this._listeners = new Listeners({
          tagsChanged: this._createAndSetTagViews.bind(this),
          contributorChanged: this._createAndSetContributorView.bind(this),
          errorChanged: set(this, 'error'),
        })
      }
      MovieInfo.prototype = {
        set actionPane(actionPane) {
          this._actionPane = actionPane
          this.elem.insertBefore(actionPane.elem, this.elem.firstChild)
        },
        get tagViews() { return this._tagViews },
        set tagViews(tagViews) {
          this._tagViews = tagViews
          var e = this.elem.querySelector('.nrn-tag-container')
          for (var v of tagViews) e.appendChild(v.elem)
        },
        get contributorView() { return this._contributorView },
        set contributorView(contributorView) {
          this._contributorView = contributorView
          this.elem.querySelector('.nrn-contributor-container')
            .appendChild(contributorView.elem)
        },
        get error() { return this._error },
        set error(error) {
          if (this._error === error) return
          this._error = error
          this.elem.querySelector('.nrn-error').textContent = error.message
        },
        hasAny() {
          return Boolean(this.elem.querySelector('.nrn-action-pane')
                      || this.elem.querySelector('.nrn-movie-tag')
                      || this.elem.querySelector('.nrn-contributor')
                      || this.error !== Movie.NO_ERROR)
        },
        _createAndSetTagViews(tags) {
          var d = this.elem.ownerDocument
          this.tagViews = tags.map(function(tag) {
            return new TagView(d, tag.name).bindToTag(tag)
          })
        },
        _createAndSetContributorView(contributor) {
          if (contributor === Contributor.NULL) return
          var d = this.elem.ownerDocument
          this.contributorView = ContributorView.new(d, contributor)
        },
        bindToMovie(movie) {
          this._createAndSetTagViews(movie.tags)
          this._createAndSetContributorView(movie.contributor)
          this.error = movie.error
          if (!movie.thumbInfoDone) this._listeners.bind(movie)
        },
        unbind() {
          this._listeners.unbind()
          this.tagViews.forEach(function(v) { v.unbind() })
          if (this.contributorView) this.contributorView.unbind()
          if (this._actionPane) this._actionPane.unbind()
        },
      }
      return MovieInfo
    })()

    var Description = (function() {
      var re = /(sm|so|nm|co|ar|im|lv|mylist\/|watch\/|user\/)(?:\d+)/g
      var typeToHRef = {
        sm: 'https://www.nicovideo.jp/watch/',
        so: 'https://www.nicovideo.jp/watch/',
        nm: 'https://www.nicovideo.jp/watch/',
        co: 'https://com.nicovideo.jp/community/',
        ar: 'https://ch.nicovideo.jp/article/',
        im: 'https://seiga.nicovideo.jp/seiga/',
        lv: 'http://live.nicovideo.jp/watch/',
        'mylist/': 'https://www.nicovideo.jp/',
        'watch/': 'https://www.nicovideo.jp/',
        'user/': 'https://www.nicovideo.jp/',
      }
      var createAnchor = function(doc, href, text) {
        var a = doc.createElement('a')
        a.target = '_blank'
        a.href = href
        a.textContent = text
        return a
      }
      var createCloseButton = function(doc) {
        var result = doc.createElement('span')
        result.className = 'nrn-description-close-button'
        result.textContent = TOGGLE_CLOSE_TEXT
        return result
      }
      var createElem = function(doc, closeButton) {
        var text = doc.createElement('span')
        text.className = 'nrn-description-text'
        var result = doc.createElement('p')
        result.className = 'itemDescription ranking nrn-description'
        result.appendChild(text)
        result.appendChild(closeButton)
        return result
      }
      var createOpenButton = function(doc) {
        var result = doc.createElement('span')
        result.className = 'nrn-description-open-button'
        result.textContent = TOGGLE_OPEN_TEXT
        return result
      }
      var Description = function(doc) {
        this.closeButton = createCloseButton(doc)
        this.elem = createElem(doc, this.closeButton)
        this.openButton = createOpenButton(doc)
        this.original = null
        this.text = ''
        this.linkified = false
        this.togglable = true
        this._listeners = new Listeners({
          'descriptionChanged': set(this, 'text'),
        })
      }
      Description.prototype = {
        linkify() {
          if (this.linkified) return
          this.linkified = true
          var t = this.text
          var d = this.elem.ownerDocument
          var f = d.createDocumentFragment()
          var lastIndex = 0
          for (var r; r = re.exec(t);) {
            f.appendChild(d.createTextNode(t.slice(lastIndex, r.index)))
            f.appendChild(createAnchor(d, typeToHRef[r[1]] + r[0], r[0]))
            lastIndex = re.lastIndex
          }
          f.appendChild(d.createTextNode(t.slice(lastIndex)))
          f.normalize()
          this.elem.firstChild.appendChild(f)
        },
        bindToMovie(movie) {
          this.text = movie.description
          this._listeners.bind(movie)
        },
        unbind() {
          this._listeners.unbind()
        },
      }
      return Description
    })()

    var MovieRoot = (function() {
      var MovieRoot = function(elem) {
        this.elem = elem
        var d = elem.ownerDocument
        this.movieInfo = new MovieInfo(d)
        this.description = new Description(d)
        this._openNewWindow = false
        this.movieTitle = null
        this._movieListeners = new Listeners({
          thumbInfoDone: this.setThumbInfoDone.bind(this),
        })
        this._movieViewModeListeners = new Listeners({
          changed: set(this, 'viewMode'),
        })
        this._configOpenNewWindowListeners = new Listeners({
          changed: set(this, 'openNewWindow'),
        })
      }
      MovieRoot.prototype = {
        markMovieAnchor() {
          for (var a of this._movieAnchors) a.dataset.nrnMovieAnchor = 'true'
        },
        set id(id) {
          for (var a of this._movieAnchors) a.dataset.nrnMovieId = id
        },
        get titleElem() {
          throw new Error('must be implemented')
        },
        set title(title) {
          this.titleElem.textContent = title
          for (var a of this._movieAnchors) a.dataset.nrnMovieTitle = title
        },
        get _reduced() {
          return this.elem.classList.contains('nrn-reduce')
        },
        _halfThumb() {},
        _restoreThumb() {},
        _reduce() {
          this.elem.classList.add('nrn-reduce')
          this._halfThumb()
        },
        _unreduce() {
          this.elem.classList.remove('nrn-reduce')
          this._restoreThumb()
        },
        get _hidden() {
          return this.elem.classList.contains('nrn-hide')
        },
        _hide() {
          this.elem.classList.add('nrn-hide')
        },
        _show() {
          this.elem.classList.remove('nrn-hide')
        },
        get viewMode() {
          if (this.elem.classList.contains('nrn-reduce')) return 'reduce'
          if (this.elem.classList.contains('nrn-hide')) return 'hide'
          return 'doNothing'
        },
        set viewMode(viewMode) {
          if (this._reduced) this._unreduce()
          else if (this._hidden) this._show()
          switch (viewMode) {
            case 'reduce': this._reduce(); break
            case 'hide': this._hide(); break
            case 'doNothing': break
            default: throw new Error(viewMode)
          }
        },
        get _movieAnchorSelectors() {
          throw new Error('must be implemented')
        },
        get _movieAnchors() {
          var result = []
          for (var s of this._movieAnchorSelectors) {
            var a = this.elem.querySelector(s)
            if (a) result.push(a)
          }
          return result
        },
        get openNewWindow() { return this._openNewWindow },
        set openNewWindow(openNewWindow) {
          this._openNewWindow = openNewWindow
          var t = openNewWindow ? '_blank' : ''
          for (var a of this._movieAnchors) a.target = t
        },
        get _movieInfoVisible() {
          return Boolean(this.movieInfo.elem.parentNode)
        },
        set _movieInfoVisible(visible) {
          if (visible) {
            this._addMovieInfo()
            this.movieInfo.toggle.textContent = TOGGLE_CLOSE_TEXT
          } else {
            this.movieInfo.elem.remove()
            this.movieInfo.toggle.textContent = TOGGLE_OPEN_TEXT
          }
        },
        toggleMovieInfo() {
          this._movieInfoVisible = !this._movieInfoVisible
        },
        set actionPane(actionPane) {
          this.movieInfo.actionPane = actionPane
        },
        _addMovieInfo() {
          throw new Error('must be implemented')
        },
        _addMovieInfoToggle() {
          this.elem.querySelector('.itemData')
            .appendChild(this.movieInfo.toggle)
        },
        setMovieInfoToggleIfRequired() {},
        _updateByMovieInfoTogglable() {
          if (!this.movieInfo.hasAny()) return
          if (this.movieInfo.togglable) {
            this._addMovieInfoToggle()
          } else {
            this.movieInfo.toggle.remove()
          }
          this._movieInfoVisible = !this.movieInfo.togglable
        },
        get movieInfoTogglable() {
          return this.movieInfo.togglable
        },
        set movieInfoTogglable(movieInfoTogglable) {
          this.movieInfo.togglable = movieInfoTogglable
          this._updateByMovieInfoTogglable()
        },
        _queryOriginalDescriptionElem() {
          return this.elem.querySelector('.itemDescription')
        },
        get _originalDescriptionElem() {
          var result = this.description.original
          if (!result) {
            result
              = this.description.original
              = this._queryOriginalDescriptionElem()
          }
          return result
        },
        get _descriptionExpanded() {
          return Boolean(this.description.elem.parentNode)
        },
        set _descriptionExpanded(expanded) {
          var o = this._originalDescriptionElem
          var d = this.description
          if (expanded && o.parentNode) {
            d.linkify()
            o.parentNode.replaceChild(d.elem, o)
          } else if (!expanded && d.elem.parentNode) {
            d.elem.parentNode.replaceChild(o, d.elem)
          }
        },
        _updateByDescriptionTogglable() {
          if (!this.description.text) return
          if (this.description.togglable) {
            this._originalDescriptionElem.appendChild(this.description.openButton)
            this.description.elem.appendChild(this.description.closeButton)
          } else {
            this.description.closeButton.remove()
          }
          this._descriptionExpanded = !this.description.togglable
        },
        toggleDescription() {
          this._descriptionExpanded = !this._descriptionExpanded
        },
        get descriptionTogglable() {
          return this.description.togglable
        },
        set descriptionTogglable(descriptionTogglable) {
          this.description.togglable = descriptionTogglable
          this._updateByDescriptionTogglable()
        },
        setThumbInfoDone() {
          this.elem.classList.add('nrn-thumb-info-done')
        },
        get thumbInfoDone() {
          return this.elem.classList.contains('nrn-thumb-info-done')
        },
        bindToMovie(movie) {
          this.movieInfo.bindToMovie(movie)
          this.description.bindToMovie(movie)
          if (movie.thumbInfoDone) this.setThumbInfoDone()
          else this._movieListeners.bind(movie)
        },
        bindToMovieViewMode(movieViewMode) {
          this.viewMode = movieViewMode.value
          this._movieViewModeListeners.bind(movieViewMode)
        },
        bindToConfig(config) {
          this.openNewWindow = config.openNewWindow.value
          this._configOpenNewWindowListeners.bind(config.openNewWindow)
        },
        unbind() {
          this.movieInfo.unbind()
          this.description.unbind()
          this._movieListeners.unbind()
          this._movieViewModeListeners.unbind()
          this._configOpenNewWindowListeners.unbind()
          if (this.movieTitle) this.movieTitle.unbind()
        },
      }
      return MovieRoot
    })()

    var ConfigBar = (function() {
      var createConfigBar = function(doc) {
        var html = `<div id=nrn-config-bar>
    <label>
      閲覧済みの動画を
      <select id=nrn-visited-movie-view-mode-select>
        <option value=reduce>縮小</option>
        <option value=hide>非表示</option>
        <option value=doNothing>通常表示</option>
      </select>
    </label>
    |
    <label>
      投稿者
      <select id=nrn-visible-contributor-type-select>
        <option value=all>全部</option>
        <option value=user>ユーザー</option>
        <option value=channel>チャンネル</option>
      </select>
    </label>
    |
    <label><input type=checkbox id=nrn-ng-movie-visible-checkbox> NG動画を表示</label>
    |
    <span id=nrn-config-button>設定</span>
  </div>`
        var e = doc.createElement('div')
        e.innerHTML = html
        var result = e.firstChild
        result.remove()
        return result
      }
      var ConfigBar = function(doc) {
        this.elem = createConfigBar(doc)
      }
      ConfigBar.prototype = {
        get _viewModeSelect() {
          return this.elem.querySelector('#nrn-visited-movie-view-mode-select')
        },
        get visitedMovieViewMode() {
          return this._viewModeSelect.value
        },
        set visitedMovieViewMode(viewMode) {
          this._viewModeSelect.value = viewMode
        },
        get _visibleContributorTypeSelect() {
          return this.elem.querySelector('#nrn-visible-contributor-type-select')
        },
        get visibleContributorType() {
          return this._visibleContributorTypeSelect.value
        },
        set visibleContributorType(type) {
          this._visibleContributorTypeSelect.value = type
        },
        bindToConfig(config) {
          this.visitedMovieViewMode = config.visitedMovieViewMode.value
          this.visibleContributorType = config.visibleContributorType.value
          config.visitedMovieViewMode.on('changed', set(this, 'visitedMovieViewMode'))
          config.visibleContributorType.on('changed', set(this, 'visibleContributorType'))
          return this
        },
      }
      return ConfigBar
    })()

    var NicoPage = function(doc) {
      this.doc = doc
      this._toggleToMovieRoot = new Map()
    }
    NicoPage.prototype = {
      get hourlyAll() {
        return false
      },
      createConfigBar() {
        return new ConfigBar(this.doc)
      },
      createTables() { return [] },
      createMovieRoot() {
        throw new Error('must be implemented')
      },
      get _configBarContainer() {
        throw new Error('must be implemented')
      },
      addConfigBar(bar) {
        var target = this._configBarContainer
        target.insertBefore(bar.elem, target.firstChild)
      },
      parse() {
        throw new Error('must be implemented')
      },
      mapToggleTo(movieRoot) {
        var m = this._toggleToMovieRoot
        m.set(movieRoot.movieInfo.toggle, movieRoot)
        m.set(movieRoot.description.openButton, movieRoot)
        m.set(movieRoot.description.closeButton, movieRoot)
      },
      unmapToggleFrom(movieRoot) {
        var m = this._toggleToMovieRoot
        m.delete(movieRoot.movieInfo.toggle)
        m.delete(movieRoot.description.openButton)
        m.delete(movieRoot.description.closeButton)
      },
      getMovieRootBy(toggle) {
        return this._toggleToMovieRoot.get(toggle)
      },
      _configDialogLoaded() {},
      showConfigDialog(config) {
        var back = this.doc.createElement('div')
        back.style.backgroundColor = 'black'
        back.style.opacity = '0.5'
        back.style.zIndex = '10000'
        back.style.position = 'fixed'
        back.style.top = '0'
        back.style.left = '0'
        back.style.width = '100%'
        back.style.height = '100%'
        this.doc.body.appendChild(back)

        var f = this.doc.createElement('iframe')
        f.style.position = 'fixed'
        f.style.top = '0'
        f.style.left = '0'
        f.style.width = '100%'
        f.style.height = '100%'
        f.style.zIndex = '10001'
        f.srcdoc = ConfigDialog.SRCDOC
        f.addEventListener('load', function loaded() {
          this._configDialogLoaded(f.contentDocument)
          const openInTab = typeof GM_openInTab === 'undefined'
                            ? GM.openInTab : GM_openInTab
          new ConfigDialog(config, f.contentDocument, openInTab)
            .on('closed', function() {
              f.remove()
              back.remove()
            })
        }.bind(this))
        this.doc.body.appendChild(f)
      },
      bindToConfig() {},
      get _pendingMoviesInvisibleCss() {
        throw new Error('must be implemented')
      },
      _createPendingMoviesInvisibleStyle() {
        var result = this.doc.createElement('style')
        result.id = 'nrn-pending-movies-hide-style'
        result.textContent = this._pendingMoviesInvisibleCss
        return result
      },
      set pendingMoviesVisible(v) {
        var id = 'nrn-pending-movies-hide-style'
        if (v) {
          this.doc.getElementById(id).remove()
        } else {
          if (!this.doc.head) {
            this.doc.documentElement.appendChild(this.doc.createElement('head'))
          }
          this.doc.head.appendChild(this._createPendingMoviesInvisibleStyle())
        }
      },
      get css() {
        throw new Error('must be implemented')
      },
      observeMutation() {},
    }
    Object.assign(NicoPage, {
      MovieTitle,
      ActionPane,
      TagView,
      ContributorView,
      MovieInfo,
      Description,
      MovieRoot,
      ConfigBar,
    })
    return NicoPage
  })()

  var ListPage = (function(_super) {
    var AbstractMovieRoot = (function(_super) {
      var AbstractMovieRoot = function(elem) {
        _super.call(this, elem)
      }
      AbstractMovieRoot.prototype = createObject(_super.prototype, {
        get titleElem() {
          return this.elem.querySelector('.itemTitle a')
        },
        get _movieAnchorSelectors() {
          return ['.itemTitle a', '.itemThumbWrap']
        },
      })
      return AbstractMovieRoot
    })(_super.MovieRoot)

    var FixedThumbMovieRoot = (function(_super) {
      var FixedThumbMovieRoot = function(elem) {
        _super.call(this, elem)
      }
      FixedThumbMovieRoot.prototype = createObject(_super.prototype, {
        _getThumbElement() {
          const e = this.elem.querySelector('.thumb')
          return e ? e : this.elem.querySelector('.backgroundThumbnail')
        },
        _halfThumb() {
          var e = this._getThumbElement()
          if (!e) return
          var s = e.style
          if (!s.marginTop) return
          s.marginTop = '-9px'
          s.width = '80px'
          s.height = '63px'
        },
        _restoreThumb() {
          var e = this._getThumbElement()
          if (!e) return
          var s = e.style
          if (!s.marginTop) return
          s.marginTop = '-15px'
          s.width = '160px'
          s.height = ''
        },
      })
      return FixedThumbMovieRoot
    })(AbstractMovieRoot)

    var MovieRoot = (function(_super) {
      var MovieRoot = function(elem) {
        _super.call(this, elem)
      }
      MovieRoot.prototype = createObject(_super.prototype, {
        set actionPane(actionPane) {
          this.elem.appendChild(actionPane.elem)
        },
        _addMovieInfo() {
          this.elem.querySelector('.itemContent')
            .appendChild(this.movieInfo.elem)
        },
        setThumbInfoDone() {
          _super.prototype.setThumbInfoDone.call(this)
          this._updateByMovieInfoTogglable()
          this._updateByDescriptionTogglable()
        },
        bindToConfig(config) {
          _super.prototype.bindToConfig.call(this, config)
          this.movieInfoTogglable = config.movieInfoTogglable.value
          config.movieInfoTogglable.on('changed', set(this, 'movieInfoTogglable'))
          this.descriptionTogglable = config.descriptionTogglable.value
          config.descriptionTogglable.on('changed', set(this, 'descriptionTogglable'))
        },
      })
      Object.assign(MovieRoot, {
        _convertNicoChartMovieLength(len) {
          var r = /((\d+)時間)?((\d{1,2})分)?((\d{1,2})秒)?/.exec(len)
          if (!(r && (r[1] || r[3] || r[5]))) return len
          var result = ''
          if (r[1]) result += r[2] + ':'
          if (r[3]) {
            result += (r[1] && r[4].length === 1 ? '0' : '') + r[4]
          } else {
            result += r[1] ? '00' : '0'
          }
          result += ':'
          if (r[5]) {
            result += (r[6].length === 1 ? '0' : '') + r[6]
          } else {
            result += '00'
          }
          return result
        },
        _convertNicoChartContributionDay(day) {
          var r = /(\d{4})年(\d{2})月(\d{2})日 (\d{2}):(\d{2}):\d{2}/.exec(day)
          return r ? `${r[1]}/${r[2]}/${r[3]} ${r[4]}:${r[5]}` : day
        },
        createElem(doc) {
          var html = `<li class="item videoRanking nrn-from-nico-chart" data-video-item data-enable-uad="1">
  <div class="rankingNumWrap">
    <p class="rankingNum"></p>
    <p class="rankingPt"></p>
  </div>
  <div class="videoList01Wrap">
    <p class="itemTime"><span></span> 投稿</p>
    <div class="itemThumbBox">
      <div class="itemThumb" data-video-thumbnail>
        <a class="itemThumbWrap" data-link>
          <img class="jsLazyImage thumb" src="https://nicovideo.cdn.nimg.jp/web/img/common/no_thumbnail_M.jpg" data-thumbnail>
        </a>
      </div>
      <span class="videoLength"></span>
    </div>
  </div>
  <div class="itemContent">
    <p class="itemTitle ranking">
      <a></a>
    </p>
    <div class="wrap">
      <p class="itemDescription ranking"></p>
      <p class="itemComment ranking"></p>
    </div>
    <div class="itemData">
      <ul class="list">
        <li class="count view">再生<span class="value"></span></li>
        <li class="count comment">コメ<span class="value"></span></li>
        <li class="count mylist">マイ<span class="value"><a></a></span></li>
      </ul>
    </div>
  </div>
</li>
`
          var div = doc.createElement('div')
          div.innerHTML = html
          return div.firstChild
        },
        setDataToElem(data, elem) {
          var id = movieIdOf(data.url)
          elem.dataset.id = id
          var q = function(selector) {
            return elem.querySelector(selector)
          }
          var t = function(selector, text) {
            q(selector).textContent = text
          }
          ;(function setItemThumbWrap() {
            var itemThumbWrap = q('.itemThumbWrap')
            itemThumbWrap.setAttribute('href', '/watch/' + id)
            itemThumbWrap.dataset.href = '/watch/' + id
          })()
          ;(function setItemTitleAnchor() {
            var a = q('.itemTitle.ranking a')
            a.title = data.title
            a.textContent = data.title
            a.setAttribute('href', 'watch/' + id)
            a.dataset.href = 'watch/' + id
          })()
          t('.rankingNum', data.rank)
          t('.rankingPt', '+' + data.point)
          t('.itemTime span', MovieRoot._convertNicoChartContributionDay(data.contributionDay))
          if (data.fresh) q('.itemTime').classList.add('new')
          q('.itemThumb').dataset.id = id
          q('.thumb').dataset.original = data.thumbURL
          t('.videoLength', MovieRoot._convertNicoChartMovieLength(data.movieLength))
          t('.itemDescription.ranking', data.description)
          t('.itemComment.ranking', data.comment)
          t('.count.view .value', data.viewCount)
          t('.count.comment .value', data.resCount)
          t('.count.mylist .value a', data.mylistCount)
          q('.count.mylist .value a').setAttribute('href', '/mylistcomment/video/' + id)
        },
      })
      return MovieRoot
    })(FixedThumbMovieRoot)

    var SubMovieRoot = (function(_super) {
      var SubMovieRoot = function(elem) {
        _super.call(this, elem)
        elem.classList.add('nrn-sub-movie-root')
      }
      SubMovieRoot.prototype = createObject(_super.prototype, {
        set actionPane(actionPane) {
          this.movieInfo.actionPane = actionPane
        },
        _addMovieInfo() {
          this.elem.appendChild(this.movieInfo.elem)
        },
        setMovieInfoToggleIfRequired() {
          if (!this.movieInfo.toggle.parentNode) {
            this.elem.appendChild(this.movieInfo.toggle)
          }
        },
      })
      return SubMovieRoot
    })(AbstractMovieRoot)

    var hourlyAllRegExp = /^\/ranking\/(fav|view|res|mylist)\/hourly\/all/
    var parent = function(className, child) {
      for (var e = child; e; e = e.parentNode) {
        if (e.classList.contains(className)) return e
      }
      return null
    }
    var ListPage = function(doc) {
      _super.call(this, doc)
    }
    ListPage.prototype = createObject(_super.prototype, {
      get hourlyAll() {
        return ListPage._isHourlyAll(this.doc.location)
      },
      get sortType() {
        return ListPage._getSortType(this.doc.location)
      },
      createTables() { return [] },
      createMovieRoot(resultOfParsing) {
        switch (resultOfParsing.type) {
          case 'main': return new MovieRoot(resultOfParsing.rootElem)
          case 'sub': return new SubMovieRoot(resultOfParsing.rootElem)
          default: throw new Error(resultOfParsing.type)
        }
      },
      addMovieRootElem(elem) {
        this.doc.querySelector('.contentBody.video.videoList01 > .list')
          .appendChild(elem)
      },
      addElemAfterMovieList(elem) {
        this._configBarContainer.appendChild(elem)
      },
      get _configBarContainer() {
        return this.doc.querySelector('.contentBody.video.videoList01')
      },
      parse(target) {
        target = target || this.doc
        return this._parseMain(target).concat(this._parseSub(target))
      },
      _parseMain(target) {
        return Array.from(target.querySelectorAll('.item.videoRanking'))
          .map(function(item) {
            return {
              type: 'main',
              movie: {
                id: item.dataset.videoId,
                title: item.querySelector('.itemTitle a').title,
              },
              rootElem: item,
            }
          })
      },
      _parseSub(target) {
        var selector = '.content.list.ranking:not(.nicoad) .itemTitle a'
        return Array.from(target.querySelectorAll(selector))
          .filter(function(a) {
            return a.hostname === 'www.nicovideo.jp'
          })
          .map(function(a) {
            return {
              type: 'sub',
              movie: {
                id: a.pathname.slice('/watch/'.length),
                title: a.title || a.textContent,
              },
              rootElem: parent('item', a),
            }
          })
      },
      get _firstRankingNumber() {
        var rn = this.doc.querySelector('.rankingNum')
        return rn ? parseInt(rn.textContent) - 1 : 0
      },
      _createSeamlessRankingNumberStyle() {
        var result = this.doc.createElement('style')
        result.id = 'nrn-seamless-ranking-number-style'
        result.textContent = `body {
  counter-increment: ranking ${this._firstRankingNumber};
}
.content .video .item.videoRanking {
  counter-increment: ranking;
}
.content .videoList01 .item.videoRanking .rankingNumWrap .rankingNum {
  font-size: 0;
}
.content .videoList01 .item.videoRanking .rankingNumWrap .rankingNum::after {
  content: counter(ranking, decimal);
  font-size: 40px;
  line-height: 1.3;
}
`
        return result
      },
      get seamlessRankingNumber() {
        return Boolean(this.doc.getElementById('nrn-seamless-ranking-number-style'))
      },
      set seamlessRankingNumber(v) {
        var s = this.doc.getElementById('nrn-seamless-ranking-number-style')
        if (v && !s) {
          this.doc.head.appendChild(this._createSeamlessRankingNumberStyle())
        } else if (!v && s) {
          s.remove()
        }
      },
      _createInvisiblePopupStyle() {
        var result = this.doc.createElement('style')
        result.id = 'nrn-invisible-popup-style'
        result.textContent = `.item.videoRanking:hover .nrn-action-pane {
  display: none;
}
`
        return result
      },
      get popupVisible() {
        return !this.doc.getElementById('nrn-invisible-popup-style')
      },
      set popupVisible(v) {
        var s = this.doc.getElementById('nrn-invisible-popup-style')
        if (v && s) {
          s.remove()
        } else if (!(v || s)) {
          this.doc.head.appendChild(this._createInvisiblePopupStyle())
        }
      },
      get _pendingMoviesInvisibleCss() {
        return `.videoRanking,
.videoRcolumn:not(.niconews):not(.blomaga):not(.seiga):not(.ichiba) .item {
  visibility: hidden;
}
.videoRanking.nrn-thumb-info-done,
.videoRcolumn:not(.niconews):not(.blomaga):not(.seiga):not(.ichiba) .item.nrn-thumb-info-done {
  visibility: inherit;
}
`
      },
      bindToConfig(config) {
        this.seamlessRankingNumber = config.seamlessRankingNumber.value
        config.seamlessRankingNumber.on('changed', set(this, 'seamlessRankingNumber'))
        this.popupVisible = config.popupVisible.value
        config.popupVisible.on('changed', set(this, 'popupVisible'))
      },
      get css() {
        return `#nrn-config-button,
.nrn-visit-button:hover,
.nrn-movie-ng-button:hover,
.nrn-title-ng-button:hover,
.nrn-tag-ng-button:hover,
.nrn-contributor-ng-button:hover,
.nrn-contributor-ng-id-button:hover,
.nrn-contributor-ng-name-button:hover,
.nrn-movie-info-toggle:hover,
.nrn-description-open-button:hover,
.nrn-description-close-button:hover {
  text-decoration: underline;
  cursor: pointer;
}
.nrn-description-open-button {
  position: absolute;
  top: 0;
  right: 0;
  background-color: white;
}
.videoList01 .item.videoRanking.uadlevel1 .nrn-description-open-button,
.videoList01 .item.videoRanking.uadlevel2 .nrn-description-open-button,
.videoList01 .item.videoRanking.uadlevel3 .nrn-description-open-button,
.videoList01 .item.videoRanking.uadlevel4 .nrn-description-open-button,
.videoList01 .item.videoRanking.uadlevel5 .nrn-description-open-button {
  background-color: #e5e8ea;
}
.videoList01 .item.videoRanking.uadlevel6 .nrn-description-open-button,
.videoList01 .item.videoRanking.uadlevel7 .nrn-description-open-button,
.videoList01 .item.videoRanking.uadlevel8 .nrn-description-open-button,
.videoList01 .item.videoRanking.uadlevel9 .nrn-description-open-button,
.videoList01 .item.videoRanking.uadlevel10 .nrn-description-open-button {
  background-color: #fdf5cd;
}
.videoList01 .itemContent .itemDescription.ranking.nrn-description {
  height: auto;
}
.nrn-description-text,
.nrn-description-close-button {
  display: block;
}
.nrn-description-close-button {
  text-align: right;
}
.itemData,
.itemDescription {
  position: relative;
}
.videoRanking .nrn-movie-info-toggle {
  position: absolute;
  top: 0;
  right: 0;
  color: #333333;
  font-size: 85%;
}
.nrn-movie-tag {
  display: inline-block;
  margin-right: 1em;
}
.nrn-description-open-button,
.nrn-description-close-button,
.nrn-movie-tag-link,
.nrn-contributor-link {
  color: #333333;
}
.nrn-movie-tag-link.nrn-movie-ng-tag-link,
.nrn-contributor-link.nrn-ng-contributor-link,
.nrn-matched-ng-contributor-name,
.nrn-matched-ng-title {
  color: white;
  background-color: fuchsia;
}
.nrn-movie-info-container .nrn-tag-container,
.nrn-movie-info-container .nrn-contributor-container {
  line-height: 1.5em;
  margin-top: 4px;
}
.nrn-hide,
.videoRanking.nrn-reduce .rankingPt,
.videoRanking.nrn-reduce .itemTime,
.videoRanking.nrn-reduce .wrap,
.videoRanking.nrn-reduce .itemData,
.videoRanking.nrn-reduce .nrn-movie-info-container {
  display: none;
}
.videoRanking.nrn-reduce .rankingNum {
  font-size: 150%;
}
.videoRanking.nrn-reduce .videoList01Wrap {
  width: 80px;
}
.videoRanking.nrn-reduce .itemContent .itemTitle.ranking {
  width: auto;
}
.videoRanking.nrn-reduce .itemThumbBox,
.videoRanking.nrn-reduce .itemThumbBox .itemThumb,
.videoRanking.nrn-reduce .itemThumbBox .itemThumb .itemThumbWrap,
.videoRanking.nrn-reduce .itemThumbBox .itemThumb .itemThumbWrap img {
  width: 80px;
  height: 45px;
}
.videoRanking.nrn-from-nico-chart .videoList01Wrap {
  text-align: center;
}
.nrn-user-ng-button,
.videoRanking.nrn-from-nico-chart .itemThumbBox {
  display: inline-block;
}
.videoRanking.nrn-from-nico-chart .itemThumbBox,
.videoRanking.nrn-from-nico-chart .itemThumbBox .itemThumb,
.videoRanking.nrn-from-nico-chart .itemThumbBox .itemThumb .itemThumbWrap,
.videoRanking.nrn-from-nico-chart .itemThumbBox .itemThumb .itemThumbWrap .thumb {
  height: 100px;
  width: 130px;
}
.videoRanking.nrn-from-nico-chart .itemThumbBox .itemThumb .itemThumbWrap .thumb {
  max-height: 100px;
}
.videoRanking.nrn-from-nico-chart.nrn-reduce .videoList01Wrap {
  margin-left: 15px;
}
.videoRanking.nrn-from-nico-chart.nrn-reduce .itemThumbBox,
.videoRanking.nrn-from-nico-chart.nrn-reduce .itemThumbBox .itemThumb,
.videoRanking.nrn-from-nico-chart.nrn-reduce .itemThumbBox .itemThumb .itemThumbWrap,
.videoRanking.nrn-from-nico-chart.nrn-reduce .itemThumbBox .itemThumb .itemThumbWrap .thumb {
  height: 50px;
  width: 80px;
}
.nrn-ng-movie-title,
.nrn-contributor-link.nrn-ng-id-contributor-link {
  text-decoration: line-through;
}
.videoRanking .nrn-action-pane {
  display: none;
  position: absolute;
  top: 10px;
  right: 0px;
  padding: 3px;
  color: #999;
  background-color: rgb(105, 105, 105);
  z-index: 11;
}
.videoRanking:hover .nrn-action-pane {
  display: block;
}
.videoRanking:hover .nrn-action-pane .nrn-visit-button,
.videoRanking:hover .nrn-action-pane .nrn-movie-ng-button,
.videoRanking:hover .nrn-action-pane .nrn-title-ng-button {
  color: white;
}
.videoRanking:hover .nrn-action-pane .nrn-movie-ng-button,
.videoRanking:hover .nrn-action-pane .nrn-title-ng-button {
  margin-left: 5px;
  border-left: solid thin;
  padding-left: 5px;
}
.nrn-sub-movie-root {
  position: relative;
}
.nrn-sub-movie-root .nrn-movie-info-toggle {
  display: block;
  text-align: right;
  background-color: white;
}
.nrn-sub-movie-root .nrn-movie-info-container {
  clear: left;
  padding: 10px 0 15px 0;
}
.nrn-sub-movie-root .nrn-action-pane .nrn-visit-button,
.nrn-sub-movie-root .nrn-action-pane .nrn-movie-ng-button,
.nrn-sub-movie-root .nrn-action-pane .nrn-title-ng-button {
  display: inline-block;
  color: #333333;
}
.nrn-sub-movie-root .nrn-action-pane .nrn-visit-button,
.nrn-sub-movie-root .nrn-action-pane .nrn-movie-ng-button {
  margin-right: 0.5em;
}
.nrn-error {
  color: red;
}
.main .content .contentBody.video.videoList01 .list .item.videoRanking .itemContent .nrn-movie-info-container {
  width: 440px;
}
`
      },
    })
    Object.assign(ListPage, {
      AbstractMovieRoot,
      FixedThumbMovieRoot,
      MovieRoot,
      SubMovieRoot,
      _isHourlyAll(location) {
        return hourlyAllRegExp.test(location.pathname)
      },
      _getSortType(location) {
        var r = hourlyAllRegExp.exec(location.pathname)
        if (r) return r[1] === 'fav' ? 'all' : r[1]
        throw new Error(location.pathname)
      },
    })
    return ListPage
  })(NicoPage)

  var MatrixPage = (function(_super) {
    var MovieRoot = (function(_super) {
      var MovieRoot = function(elem) {
        _super.call(this, elem)
      }
      MovieRoot.prototype = createObject(_super.prototype, {
        get titleElem() {
          return this.elem.querySelector('.itemTitle span')
        },
        get _movieAnchorSelectors() {
          return ['.itemContent', '.itemThumbWrap']
        },
        set actionPane(actionPane) {
          this.movieInfo.actionPane = actionPane
        },
        _addMovieInfo() {
          this.elem.querySelector('.item').appendChild(this.movieInfo.elem)
        },
        setMovieInfoToggleIfRequired() {
          if (!this.movieInfo.toggle.parentNode) {
            this.elem.querySelector('.item').appendChild(this.movieInfo.toggle)
          }
        },
      })
      return MovieRoot
    })(ListPage.FixedThumbMovieRoot)

    var ConfigBar = (function(_super) {
      var createMovingUpLabel = function(doc) {
        var check = doc.createElement('input')
        check.id = 'nrn-moving-up-checkbox'
        check.type = 'checkbox'
        var result = doc.createElement('label')
        result.appendChild(check)
        result.appendChild(doc.createTextNode('上に詰める'))
        return result
      }
      var insertBeforeConfigButton = function(elem) {
        var b = elem.querySelector('#nrn-config-button')
        for (var e of Array.from(arguments).slice(1)) elem.insertBefore(e, b)
      }
      var ConfigBar = function(doc) {
        _super.call(this, doc)
        insertBeforeConfigButton(this.elem
                               , createMovingUpLabel(doc)
                               , doc.createTextNode(' | '))
      }
      ConfigBar.prototype = createObject(_super.prototype, {
        get _movingUpCheckbox() {
          return this.elem.querySelector('#nrn-moving-up-checkbox')
        },
        get movingUp() {
          return this._movingUpCheckbox.checked
        },
        set movingUp(movingUp) {
          this._movingUpCheckbox.checked = movingUp
        },
        bindToConfig(config) {
          _super.prototype.bindToConfig.call(this, config)
          this.movingUp = config.movingUp.value
          config.movingUp.on('changed', set(this, 'movingUp'))
          return this
        },
      })
      return ConfigBar
    })(_super.ConfigBar)

    var Table = (function() {
      var compareOriginalRowIndex = function(a, b) {
        var i = parseInt(a.dataset.nrnOriginalRowIndex)
        var j = parseInt(b.dataset.nrnOriginalRowIndex)
        return i - j
      }
      var compareHidden = function(a, b) {
        var h1 = a.classList.contains('nrn-hide')
        var h2 = b.classList.contains('nrn-hide')
        if (!h1 && h2) return -1
        if (h1 && !h2) return 1
        return compareOriginalRowIndex(a, b)
      }
      var diffColToRows = function(current, fresh) {
        var result = []
        for (var i = 0; i < current.length; i++) {
          var oldRows = current[i]
          var newRows = fresh[i]
          for (var j = 0; j < oldRows.length; j++) {
            var o = oldRows[j]
            var n = newRows[j]
            if (o !== n) {
              result.push({
                newNode: n,
                parentNode: o.parentNode,
                index: Array.from(o.parentNode.childNodes).indexOf(o),
              })
            }
          }
        }
        return result
      }
      var sort = function(comparator) {
        return function(array) { return array.slice().sort(comparator) }
      }
      var replaceByDiff = function(diff) {
        var newNode = diff.newNode
        if (newNode.parentNode) {
          var d = newNode.ownerDocument
          newNode.parentNode.replaceChild(d.createElement('div'), newNode)
        }
        var p = diff.parentNode
        p.replaceChild(newNode, p.childNodes[diff.index])
      }
      var Table = function(tableElem) {
        this.elem = tableElem
        this._initialized = false
        this._movingUp = false
      }
      Table.prototype = {
        get _itemRows() {
          return Array.from(this.elem.querySelectorAll('.item_row'))
        },
        _itemCells(row) {
          return Array.from(row.querySelectorAll('.item_cell'))
        },
        _eachCell(callback) {
          this._itemRows.forEach(function(row, rowIndex) {
            this._itemCells(row).forEach(function(cell, columnIndex) {
              callback(cell, rowIndex, columnIndex)
            })
          }, this)
        },
        initializeOriginalRowIndex() {
          this._eachCell(function(cell, rowIndex) {
            cell.dataset.nrnOriginalRowIndex = rowIndex
          })
          this._initialized = true
        },
        _colToRows() {
          var result = []
          this._eachCell(function(cell, _, columnIndex) {
            ;(result[columnIndex] || (result[columnIndex] = [])).push(cell)
          })
          return result
        },
        _sortBy(comparator) {
          var current = this._colToRows()
          var fresh = current.map(sort(comparator))
          diffColToRows(current, fresh).forEach(replaceByDiff)
        },
        moveUp() {
          if (this._initialized && this._movingUp) this._sortBy(compareHidden)
        },
        _restore() { this._sortBy(compareOriginalRowIndex) },
        get movingUp() { return this._movingUp },
        set movingUp(movingUp) {
          if (this._movingUp === movingUp) return
          this._movingUp = movingUp
          if (!this._initialized) return
          if (movingUp) this.moveUp(); else this._restore()
        },
        bindToConfig(config) {
          this.movingUp = config.movingUp.value
          config.movingUp.on('changed', set(this, 'movingUp'))
        },
      }
      return Table
    })()

    var MatrixPage = function(doc) {
      _super.call(this, doc)
    }
    MatrixPage.prototype = createObject(_super.prototype, {
      createConfigBar() { return new ConfigBar(this.doc) },
      createTables() {
        var itemRows = this.doc.querySelectorAll('.item_rows')
        return Array.from(itemRows).map(function(e) { return new Table(e) })
      },
      createMovieRoot(resultOfParsing) {
        return new MovieRoot(resultOfParsing.rootElem)
      },
      get _configBarContainer() {
        return this.doc.querySelector('.column.main')
      },
      parse(target) {
        target = target || this.doc
        var itemCells
          = target.querySelectorAll('.item_cell:not(.item_cell_empty)')
        return Array.from(itemCells, function(cell) {
          return {
            movie: {
              id: cell.dataset.videoId,
              title: cell.querySelector('.itemTitle span').textContent,
            },
            rootElem: cell,
          }
        })
      },
      _configDialogLoaded(doc) {
        ;['seamlessRankingNumber',
          'requestingNext',
          'popupVisible',
        ].forEach(function(id) {
          doc.getElementById(id).parentNode.parentNode.hidden = true
        })
        doc.querySelector('.sideComment').hidden = true
        doc.querySelector('fieldset').hidden = true
      },
      get _pendingMoviesInvisibleCss() {
        return `.item_cell:not(.item_cell_empty) {
  visibility: hidden;
}
.item_cell:not(.item_cell_empty).nrn-thumb-info-done {
  visibility: inherit;
}
.item_cell:not(.item_cell_empty).nrn-thumb-info-done.nrn-hide {
  visibility: hidden;
}
`
      },
      get css() {
        return `#nrn-config-bar {
  margin: 10px 0;
}
#nrn-config-button,
.nrn-visit-button:hover,
.nrn-movie-ng-button:hover,
.nrn-title-ng-button:hover,
.nrn-tag-ng-button:hover,
.nrn-contributor-ng-button:hover,
.nrn-contributor-ng-id-button:hover,
.nrn-contributor-ng-name-button:hover,
.nrn-movie-info-toggle:hover {
  text-decoration: underline;
  cursor: pointer;
}
.nrn-movie-tag {
  display: block;
}
.nrn-movie-tag-link,
.nrn-contributor-link {
  color: #333333;
}
.nrn-movie-tag-link.nrn-movie-ng-tag-link,
.nrn-contributor-link.nrn-ng-contributor-link,
.nrn-matched-ng-contributor-name,
.nrn-matched-ng-title {
  color: white;
  background-color: fuchsia;
}
.nrn-movie-info-container .nrn-tag-container,
.nrn-movie-info-container .nrn-contributor-container {
  line-height: 1.5em;
  margin-top: 4px;
}
.nrn-hide {
  visibility: hidden;
}
.nrn-hide .nrn-movie-info-container {
  display: none;
}
.nrn-reduce .thumb_wrapper {
  height: 45px;
}
.nrn-reduce .thumb_wrapper .itemThumbBox,
.nrn-reduce .thumb_wrapper .itemThumbBox .itemThumb,
.nrn-reduce .thumb_wrapper .itemThumbBox .itemThumb .itemThumbWrap,
.nrn-reduce .thumb_wrapper .itemThumbBox .itemThumb .itemThumbWrap img {
  width: 80px;
  height: 45px;
}
.nrn-reduce .thumb_wrapper .itemThumbBox .itemThumb .itemThumbWrap .backgroundThumbnail {
  min-width: 80px;
  min-height: 45px;
}
section.matrix .nrn-reduce .item .itemTime {
  top: -64px;
}
section.matrix .nrn-reduce .item .itemContent .itemDescription {
  bottom: 129px;
}
.nrn-matched-ng-title {
  color: white;
  background-color: fuchsia;
}
.nrn-ng-movie-title,
.nrn-contributor-link.nrn-ng-id-contributor-link {
  text-decoration: line-through;
}
.nrn-action-pane .nrn-visit-button,
.nrn-action-pane .nrn-movie-ng-button,
.nrn-action-pane .nrn-title-ng-button,
.nrn-user-ng-button {
  display: inline-block;
}
.nrn-action-pane .nrn-visit-button,
.nrn-action-pane .nrn-movie-ng-button {
  margin-right: 0.5em;
}
.nrn-movie-info-container {
  text-align: left;
  line-height: 1.3em;
  padding-top: 4px;
}
.nrn-movie-info-toggle {
  display: block;
  text-align: right;
}
.nrn-hidden .nrn-movie-info-container,
.nrn-hidden .nrn-movie-info-toggle,
.item_cell .nrn-movie-info-container,
.item_cell .nrn-movie-info-toggle {
  display: none;
}
.item_cell:hover .nrn-movie-info-container,
.item_cell:hover .nrn-movie-info-toggle {
  display: block;
}
.item_cell:hover {
  z-index: 30;
}
section.matrix .item .itemContent .itemTitle span .nrn-matched-ng-title {
  display: inline;
}
.nrn-movie-info-container,
.nrn-movie-info-toggle {
  font-size: 93%;
}
.matrix .item_cell .item {
  height: auto;
}
.nrn-error {
  color: red;
}
`
      },
    })
    Object.assign(MatrixPage, {
      is(location) {
        return [
          '/ranking',
          '/ranking/',
          '/ranking/matrix',
          '/ranking/matrix/',
        ].indexOf(location.pathname) >= 0
      },
      MovieRoot,
      ConfigBar,
      Table,
    })
    return MatrixPage
  })(NicoPage)

  var SearchPage = (function(_super) {
    var TwoColumnMovieRoot = (function(_super) {
      var TwoColumnMovieRoot = function(elem) {
        _super.call(this, elem)
      }
      TwoColumnMovieRoot.prototype = createObject(_super.prototype, {
        set actionPane(actionPane) {
          this.elem.appendChild(actionPane.elem)
        },
        _addMovieInfo() {
          this.elem.appendChild(this.movieInfo.elem)
        },
        setThumbInfoDone() {
          _super.prototype.setThumbInfoDone.call(this)
          this._updateByMovieInfoTogglable()
          this._updateByDescriptionTogglable()
        },
      })
      return TwoColumnMovieRoot
    })(ListPage.FixedThumbMovieRoot)

    var FourColumnMovieRoot = (function(_super) {
      var FourColumnMovieRoot = function(elem) {
        _super.call(this, elem)
        elem.classList.add('nrn-4-column-item')
      }
      FourColumnMovieRoot.prototype = createObject(_super.prototype, {
        set actionPane(actionPane) {
          this.movieInfo.actionPane = actionPane
        },
        _addMovieInfo() {
          this.elem.appendChild(this.movieInfo.elem)
        },
        setMovieInfoToggleIfRequired() {
          if (!this.movieInfo.toggle.parentNode) {
            this.elem.appendChild(this.movieInfo.toggle)
          }
        },
      })
      return FourColumnMovieRoot
    })(ListPage.FixedThumbMovieRoot)

    var createMainMovieRoot = function(rootElem) {
      var singleColumnView = Boolean(rootElem.getElementsByClassName('videoList01Wrap').length)
      if (singleColumnView) return new ListPage.MovieRoot(rootElem)
      var twoColumnView = Boolean(rootElem.getElementsByClassName('videoList02Wrap').length)
      if (twoColumnView) return new TwoColumnMovieRoot(rootElem)
      return new FourColumnMovieRoot(rootElem)
    }
    var SearchPage = function(doc) {
      _super.call(this, doc)
    }
    SearchPage.prototype = createObject(_super.prototype, {
      parse(target) {
        target = target || this.doc
        return this._parseMain(target).concat(this._parseSub(target))
      },
      _parseItem(item) {
        return {
          type: 'main',
          movie: {
            id: item.dataset.videoId,
            title: item.querySelector('.itemTitle a').title,
          },
          rootElem: item,
        }
      },
      parseAutoPagerizedNodes(target) {
        return [this._parseItem(target)]
      },
      _parseMain(target) {
        return Array.from(target.querySelectorAll('.contentBody.video.uad .item[data-video-item]'))
          .map(item => this._parseItem(item))
      },
      _parseSub(target) {
        return Array.from(target.querySelectorAll('#tsukuaso .item'))
          .map(function(item) {
            return {
              type: 'sub',
              movie: {
                id: item.querySelector('.itemThumb').dataset.id,
                title: item.querySelector('.itemTitle a').textContent,
              },
              rootElem: item,
            }
          })
      },
      get _configBarContainer() {
        return this.doc.querySelector('.column.main')
      },
      createMovieRoot(resultOfParsing) {
        switch (resultOfParsing.type) {
          case 'main':
          case 'ad':
            return createMainMovieRoot(resultOfParsing.rootElem)
          case 'sub':
            return new ListPage.SubMovieRoot(resultOfParsing.rootElem)
          default:
            throw new Error(resultOfParsing.type)
        }
      },
      _configDialogLoaded(doc) {
        ;['seamlessRankingNumber',
          'requestingNext',
          'popupVisible',
        ].forEach(function(id) {
          doc.getElementById(id).parentNode.parentNode.hidden = true
        })
        doc.querySelector('.sideComment').hidden = true
      },
      observeMutation(callback) {
        const nodeList = document.querySelectorAll('.contentBody.video.uad .item.nicoadVideoItem .itemContent')
        for (const node of Array.from(nodeList)) {
          new MutationObserver((records, observer) => {
            for (const r of records) {
              if (SearchPage._isGettingAdDone(r)) {
                observer.disconnect()
                const item = SearchPage._ancestor(r.target, '.item.nicoadVideoItem')
                callback([SearchPage._parseAdItem(item)])
                return
              }
            }
          }).observe(node, {
            attributes: true,
            attributeOldValue: true,
            attributeFilter: ['style'],
          })
        }
      },
      get _pendingMoviesInvisibleCss() {
        return `.contentBody.video.uad .item,
#tsukuaso .item {
  visibility: hidden;
}
.contentBody.video.uad .item.nrn-thumb-info-done,
#tsukuaso .item.nrn-thumb-info-done,
.contentBody.video.uad.searchUad .item {
  visibility: inherit;
}
`
      },
      get css() {
        return `#nrn-config-bar {
  margin: 10px 0;
}
#nrn-config-button,
.nrn-visit-button:hover,
.nrn-movie-ng-button:hover,
.nrn-title-ng-button:hover,
.nrn-tag-ng-button:hover,
.nrn-contributor-ng-button:hover,
.nrn-contributor-ng-id-button:hover,
.nrn-contributor-ng-name-button:hover,
.nrn-movie-info-toggle:hover,
.nrn-description-open-button:hover,
.nrn-description-close-button:hover {
  text-decoration: underline;
  cursor: pointer;
}
.nrn-description-open-button {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: white;
}
.nrn-description-text,
.nrn-description-close-button {
  display: block;
}
.nrn-description-close-button {
  text-align: right;
}
.itemData,
.itemDescription {
  position: relative;
}
.nrn-movie-tag {
  display: inline-block;
  margin-right: 1em;
}
.nrn-description-open-button,
.nrn-description-close-button,
.nrn-movie-tag-link,
.nrn-contributor-link {
  color: #333333;
}
.nrn-movie-tag-link.nrn-movie-ng-tag-link,
.nrn-contributor-link.nrn-ng-contributor-link,
.nrn-matched-ng-contributor-name,
.nrn-matched-ng-title {
  color: white;
  background-color: fuchsia;
}
.nrn-movie-info-container .nrn-action-pane {
  line-height: 1.3em;
  padding-top: 4px;
}
.nrn-movie-info-container .nrn-tag-container,
.nrn-movie-info-container .nrn-contributor-container {
  line-height: 1.5em;
  padding-top: 4px;
}
.videoList01 .itemContent .itemDescription.ranking.nrn-description {
  height: auto;
  width: auto;
}
.nrn-movie-info-toggle {
  color: #333333;
  font-size: 85%;
}
.videoList01 .nrn-movie-info-toggle {
  position: absolute;
  right: 0;
  top: 0;
}
.videoList02 .nrn-movie-info-toggle,
.nrn-4-column-item .nrn-movie-info-toggle {
  display: block;
  text-align: right;
}
.videoList02 .nrn-movie-info-container {
  clear: both;
}
.nrn-hide,
.videoList02 .item.nrn-hide,
.video .item.nrn-4-column-item.nrn-hide {
  display: none;
}
.item.nrn-reduce .videoList01Wrap,
.item.nrn-reduce .videoList02Wrap {
  width: 80px;
}
.item.nrn-reduce .itemThumbBox,
.item.nrn-reduce .itemThumbBox .itemThumb,
.item.nrn-reduce .itemThumbBox .itemThumb .itemThumbWrap,
.item.nrn-reduce .itemThumbBox .itemThumb .itemThumbWrap img {
  width: 80px;
  height: 45px;
}
.videoList01 .nrn-action-pane,
.videoList02 .nrn-action-pane {
  display: none;
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 3px;
  color: #999;
  background-color: rgb(105, 105, 105);
  z-index: 11;
}
.videoList02 .nrn-action-pane {
  font-size: 85%;
}
.videoList01 .item:hover .nrn-action-pane,
.videoList02 .item:hover .nrn-action-pane {
  display: block;
}
.videoList01 .item:hover .nrn-action-pane .nrn-visit-button,
.videoList01 .item:hover .nrn-action-pane .nrn-movie-ng-button,
.videoList01 .item:hover .nrn-action-pane .nrn-title-ng-button,
.videoList02 .item:hover .nrn-action-pane .nrn-visit-button,
.videoList02 .item:hover .nrn-action-pane .nrn-movie-ng-button,
.videoList02 .item:hover .nrn-action-pane .nrn-title-ng-button {
  color: white;
}
.videoList01 .item:hover .nrn-action-pane .nrn-movie-ng-button,
.videoList01 .item:hover .nrn-action-pane .nrn-title-ng-button,
.videoList02 .item:hover .nrn-action-pane .nrn-movie-ng-button,
.videoList02 .item:hover .nrn-action-pane .nrn-title-ng-button {
  margin-left: 5px;
  border-left: solid thin;
  padding-left: 5px;
}
.nrn-user-ng-button,
.nrn-tag-ng-button {
  display: inline-block;
}
.nrn-ng-movie-title,
.nrn-contributor-link.nrn-ng-id-contributor-link {
  text-decoration: line-through;
}
.nrn-sub-movie-root {
  position: relative;
}
.nrn-sub-movie-root .nrn-movie-info-toggle {
  display: block;
  text-align: right;
  background-color: white;
}
.nrn-sub-movie-root .nrn-movie-info-container {
  clear: left;
  padding: 10px 0 15px 0;
}
.nrn-sub-movie-root .nrn-action-pane .nrn-visit-button,
.nrn-sub-movie-root .nrn-action-pane .nrn-movie-ng-button,
.nrn-sub-movie-root .nrn-action-pane .nrn-title-ng-button,
.nrn-4-column-item .nrn-action-pane .nrn-visit-button,
.nrn-4-column-item .nrn-action-pane .nrn-movie-ng-button,
.nrn-4-column-item .nrn-action-pane .nrn-title-ng-button {
  display: inline-block;
  color: #333333;
}
.nrn-sub-movie-root .nrn-action-pane .nrn-visit-button,
.nrn-sub-movie-root .nrn-action-pane .nrn-movie-ng-button,
.nrn-4-column-item .nrn-action-pane .nrn-visit-button,
.nrn-4-column-item .nrn-action-pane .nrn-movie-ng-button {
  margin-right: 0.5em;
}
.nrn-error {
  color: red;
}
.videoList02 .item,
.video .item.nrn-4-column-item {
  float: none;
  display: inline-block;
  vertical-align: top;
}
.videoList02 .item,
.video .item.nrn-4-column-item,
.videoList02 .item:nth-child(2n),
.video .item.nrn-4-column-item:nth-child(4n) {
  margin-right: 10px;
}
.video .item.nrn-4-column-item:nth-child(4n+1) {
  clear: none;
}
.nrn-4-column-item .nrn-movie-tag {
  display: block;
}
`
      },
    })
    Object.assign(SearchPage, {
      TwoColumnMovieRoot,
      FourColumnMovieRoot,
      is(location) {
        var p = location.pathname
        return p.startsWith('/search/') || p.startsWith('/tag/')
      },
      _isGettingAdDone(mutationRecord) {
        const r = mutationRecord
        return r.attributeName === 'style'
            && r.oldValue.includes('visibility: hidden;')
            && r.target.getAttribute('style').includes('visibility: visible;')
      },
      _parseAdItem(item) {
        const p = item.querySelector('.count.ads .value a').pathname
        return {
          type: 'ad',
          movie: {
            id: p.slice(p.lastIndexOf('/') + 1),
            title: item.querySelector('.itemTitle a').textContent,
          },
          rootElem: item,
        }
      },
      _ancestor(child, selector) {
        for (let n = child.parentNode; n; n = n.parentNode)
          if (n.matches(selector))
            return n
        return null
      },
    })
    return SearchPage
  })(NicoPage)

  var Controller = (function() {
    var isMovieAnchor = function(e) {
      return e.dataset.nrnMovieAnchor === 'true'
    }
    var movieAnchor = function(child) {
      for (var n = child; n; n = n.parentNode) {
        if (n.nodeType !== Node.ELEMENT_NODE) return null
        if (isMovieAnchor(n)) return n
      }
    }
    var dataOfMovieAnchor = function(e) {
      return {
        id: e.dataset.nrnMovieId,
        title: e.dataset.nrnMovieTitle,
      }
    }
    var Controller = function(config, page) {
      this.config = config
      this.page = page
    }
    Controller.prototype = {
      addListenersTo(eventTarget) {
        eventTarget.addEventListener('change', this._changed.bind(this))
        eventTarget.addEventListener('click', this._clicked.bind(this))
      },
      _changed(event) {
        switch (event.target.id) {
          case 'nrn-visited-movie-view-mode-select':
            this.config.visitedMovieViewMode.value = event.target.value; break
          case 'nrn-visible-contributor-type-select':
            this.config.visibleContributorType.value = event.target.value; break
          case 'nrn-ng-movie-visible-checkbox':
            this.config.ngMovieVisible.value = event.target.checked; break
          case 'nrn-moving-up-checkbox':
            this.config.movingUp.value = event.target.checked; break
        }
      },
      _addVisitedMovie(target) {
        var d = dataOfMovieAnchor(movieAnchor(target))
        this.config.visitedMovies.addAsync(d.id, d.title)
      },
      _toggleData(target, add, remove) {
        var ds = target.dataset
        switch (ds.type) {
          case 'add': add.call(this, ds); break
          case 'remove': remove.call(this, ds); break
          default: throw new Error(ds.type)
        }
      },
      _toggleVisitedMovie(target) {
        this._toggleData(target, function(ds) {
          this.config.visitedMovies.addAsync(ds.movieId, ds.movieTitle)
        }, function(ds) {
          this.config.visitedMovies.removeAsync([ds.movieId])
        })
      },
      _toggleNgMovie(target) {
        this._toggleData(target, function(ds) {
          this.config.ngMovies.addAsync(ds.movieId, ds.movieTitle)
        }, function(ds) {
          this.config.ngMovies.removeAsync([ds.movieId])
        })
      },
      _toggleNgTitle(target) {
        this._toggleData(target, function(ds) {
          ConfigDialog.promptNgTitle(this.config, ds.movieTitle)
        }, function(ds) {
          this.config.ngTitles.removeAsync([ds.ngTitle])
        })
      },
      _toggleNgTag(target) {
        this._toggleData(target, function(ds) {
          this.config.ngTags.addAsync(ds.tagName)
        }, function(ds) {
          this.config.ngTags.removeAsync([ds.tagName])
        })
      },
      _toggleContributorNgId(target) {
        var name = function(ds) {
          return Contributor.new(ds.contributorType, ds.id, ds.name).ngIdStoreName
        }
        this._toggleData(target, function(ds) {
          this.config[name(ds)].addAsync(parseInt(ds.id), ds.name)
        }, function(ds) {
          this.config[name(ds)].removeAsync([parseInt(ds.id)])
        })
      },
      _toggleNgUserName(target) {
        this._toggleData(target, function(ds) {
          ConfigDialog.promptNgUserName(this.config, ds.name)
        }, function(ds) {
          this.config.ngUserNames.removeAsync([ds.matched])
        })
      },
      _clicked(event) {
        var e = event.target
        if (e.id === 'nrn-config-button') {
          this.page.showConfigDialog(this.config)
        } else if (movieAnchor(e)) {
          this._addVisitedMovie(e)
        } else if (e.classList.contains('nrn-visit-button')) {
          this._toggleVisitedMovie(e)
        } else if (e.classList.contains('nrn-movie-ng-button')) {
          this._toggleNgMovie(e)
        } else if (e.classList.contains('nrn-title-ng-button')) {
          this._toggleNgTitle(e)
        } else if (e.classList.contains('nrn-movie-info-toggle')) {
          this.page.getMovieRootBy(e).toggleMovieInfo()
        } else if (e.classList.contains('nrn-description-open-button')
                || e.classList.contains('nrn-description-close-button')) {
          this.page.getMovieRootBy(e).toggleDescription()
        } else if (e.classList.contains('nrn-tag-ng-button')) {
          this._toggleNgTag(e)
        } else if (e.classList.contains('nrn-contributor-ng-button')) {
          this._toggleContributorNgId(e)
        } else if (e.classList.contains('nrn-contributor-ng-id-button')) {
          this._toggleContributorNgId(e)
        } else if (e.classList.contains('nrn-contributor-ng-name-button')) {
          this._toggleNgUserName(e)
        }
      },
    }
    return Controller
  })()

  var LazyImageLoader = (function() {
    var LazyImageLoader = function(doc) {
      this.doc = doc
      this._requested = false
    }
    LazyImageLoader.prototype = {
      _lazyImages() {
        return Array.from(this.doc.querySelectorAll('.thumb.jsLazyImage'))
      },
      _lazyImagesInView() {
        return this._lazyImages().filter(this._isInView.bind(this))
      },
      _isInView(elem) {
        var r = elem.getBoundingClientRect()
        if (!(r.width && r.height)) return false
        var h = this.doc.defaultView.innerHeight
        return (r.top >= 0 && r.top < h) || (r.bottom > 0 && r.bottom <= h)
      },
      _load() {
        this._lazyImagesInView().forEach(function(img) {
          img.src = img.dataset.original
          img.dataset.original = ''
          img.classList.remove('jsLazyImage')
        })
      },
      request() {
        if (this._requested) return
        this._requested = true
        setTimeout(function() {
          this._requested = false
          this._load()
        }.bind(this), 125)
      },
    }
    return LazyImageLoader
  })()

  var Main = (function() {
    var createMovieRoot = function(resultOfParsing, page, movieViewMode) {
      var movie = movieViewMode.movie
      var result = page.createMovieRoot(resultOfParsing)
      result.actionPane
        = new NicoPage.ActionPane(page.doc, movie).bindToMovie(movie)
      result.setMovieInfoToggleIfRequired()
      result.markMovieAnchor()
      result.id = movie.id
      result.title = movie.title
      result.bindToMovieViewMode(movieViewMode)
      result.bindToConfig(movieViewMode.config)
      result.bindToMovie(movie)
      return result
    }
    var createMovieRoots = function(resultsOfParsing, model, page) {
      for (var r of resultsOfParsing) {
        var movie = model.movies.get(r.movie.id)
        var movieViewMode = model.movieViewModes.get(movie)
        var root = createMovieRoot(r, page, movieViewMode)
        root.movieTitle = new NicoPage.MovieTitle(root.titleElem).bindToMovie(movie)
        page.mapToggleTo(root)
      }
    }
    var createLazyImageLoader = function(doc) {
      var loader = new LazyImageLoader(doc)
      return loader.request.bind(loader)
    }
    var setup = function(resultsOfParsing, model, page) {
      model.createMovies(resultsOfParsing)
      createMovieRoots(resultsOfParsing, model, page)
    }
    var createMessageElem = function(doc, message) {
      var result = doc.createElement('p')
      result.textContent = message
      return result
    }
    var nicoChartReqErrorOccurred = function(messageElem) {
      return function(message) {
        messageElem.style.color = 'red'
        messageElem.innerHTML
          = `<a href="http://www.nicochart.jp/" target=_blank>ニコニコチャート</a>からの取得に失敗しました(${message})`
      }
    }
    var nicoChartReqCompleted = function(model, page, from) {
      var createResultsOfParsing = function(data) {
        var rootElemModel = ListPage.MovieRoot.createElem(page.doc)
        var result = []
        for (var d of data) {
          var rootElem = rootElemModel.cloneNode(true)
          ListPage.MovieRoot.setDataToElem(d, rootElem)
          result.push({
            type: 'main',
            rootElem: rootElem,
            movie: {
              id: new URL(d.url).pathname.slice('/watch/'.length),
              title: d.title,
            },
          })
        }
        return result
      }
      var createDocumentFragmentBy = function(resultsOfParsing) {
        var result = page.doc.createDocumentFragment()
        for (var r of resultsOfParsing) result.appendChild(r.rootElem)
        return result
      }
      return function(data) {
        var resultsOfParsing = createResultsOfParsing(data)
        setup(resultsOfParsing, model, page)
        page.addMovieRootElem(createDocumentFragmentBy(resultsOfParsing))
        model.requestThumbInfo()
        if (from === 101) requestNext(model, page, 201)
      }
    }
    function gmXmlHttpRequest() {
      if (typeof GM_xmlhttpRequest === 'undefined')
        return GM.xmlHttpRequest
      return GM_xmlhttpRequest
    }
    var requestNext = function(model, page, from) {
      from = from || 101
      var messageElem = createMessageElem(page.doc, from + '位以降を取得中...')
      page.addElemAfterMovieList(messageElem)
      new NicoChart(gmXmlHttpRequest())
        .on('completed', messageElem.remove.bind(messageElem))
        .on('completed', nicoChartReqCompleted(model, page, from))
        .on('errorOccurred', nicoChartReqErrorOccurred(messageElem))
        .request({type: page.sortType, from})
    }
    var moveUp = function(tables) {
      var requested = false
      return function() {
        if (requested) return
        requested = true
        setTimeout(function() {
          requested = false
          for (var t of tables) t.moveUp()
        })
      }
    }
    var createThumbInfoRequester = function(movies, movieViewModes) {
      var thumbInfo = new ThumbInfo(gmXmlHttpRequest())
        .on('completed', ThumbInfoListener.forCompleted(movies))
        .on('errorOccurred', ThumbInfoListener.forErrorOccurred(movies))
      return function() {
        thumbInfo.request(
          movieViewModes.sort().map(function(m) { return m.movie.id }))
      }
    }
    var getThumbInfoRequester = function(movies, movieViewModes) {
      return movies.config.useGetThumbInfo.value
           ? createThumbInfoRequester(movies, movieViewModes)
           : function() {}
    }
    var seq = function() {
      var args = Array.from(arguments)
      return function() {
        for (var f of args) f()
      }
    }
    var isFirstTable = function(table) {
      return table.elem.start === 1
    }
    var negate = function(f) {
      return function() {
        return !f.apply(this, arguments)
      }
    }
    var initAndMoveUp = function(table) {
      table.initializeOriginalRowIndex()
      table.moveUp()
    }
    var observeTable = function(model, view) {
      return function(table) {
        new MutationObserver(function(_, observer) {
          observer.disconnect()
          view.setup(model, table.elem)
          initAndMoveUp(table)
          model.requestThumbInfo()
        }).observe(table.elem, {childList: true, subtree: true})
      }
    }
    var createModel = function(config) {
      var movies = new Movies(config)
      var movieViewModes = new MovieViewModes(config)
      var requestThumbInfo = getThumbInfoRequester(movies, movieViewModes)
      return {
        config,
        movies,
        movieViewModes,
        requestThumbInfo,
        createMovies(resultsOfParsing) {
          movies.setIfAbsent(resultsOfParsing.map(function(r) {
            return new Movie(r.movie.id, r.movie.title)
          }))
        },
      }
    }
    var createView = function(page) {
      var loadLazyImages = createLazyImageLoader(page.doc)
      var configBar = page.createConfigBar()
      var tables = page.createTables()
      var moveUpTables = moveUp(tables)
      return {
        page,
        loadLazyImages,
        addConfigBar() {
          page.addConfigBar(configBar)
        },
        _bindToConfig(config) {
          page.bindToConfig(config)
          configBar.bindToConfig(config)
          for (var t of tables) t.bindToConfig(config)
          config.movingUp.on('changed', loadLazyImages)
        },
        bindToModel(model) {
          this._bindToConfig(model.config)
          model.movieViewModes.on('movieViewModeChanged'
                                , seq(loadLazyImages, moveUpTables))
        },
        bindToWindow() {
          page.doc.defaultView.addEventListener('scroll', loadLazyImages)
        },
        setup(model, targetElem) {
          setup(page.parse(targetElem), model, page)
        },
        setupAndRequestThumbInfo(model, targetElem) {
          this.setup(model, targetElem)
          model.requestThumbInfo()
        },
        setupTables(model) {
          tables.filter(isFirstTable).forEach(initAndMoveUp)
          tables.filter(negate(isFirstTable))
            .forEach(observeTable(model, this))
        },
        requestNicoChart(model) {
          if (model.config.requestingNext.value && page.hourlyAll) {
            requestNext(model, page)
          }
        },
        observeMutation(model) {
          page.observeMutation(function(resultOfParsing) {
            setup(resultOfParsing, model, page)
            model.requestThumbInfo()
          })
        },
      }
    }
    function addStyle(style) {
      const e = document.createElement('style')
      e.textContent = style
      document.head.appendChild(e)
    }
    function gmGetValue() {
      if (typeof GM_getValue === 'undefined')
        return GM.getValue
      return GM_getValue
    }
    function gmSetValue() {
      if (typeof GM_setValue === 'undefined')
        return GM.setValue
      return GM_setValue
    }
    function handleAutoPagerizedNodes(model, page) {
      return function(e) {
        const t = e.target
        if (t.nodeType === Node.ELEMENT_NODE && t.classList.contains('item')) {
          setup(page.parseAutoPagerizedNodes(t), model, page)
          model.requestThumbInfo()
        }
      }
    }
    var domContentLoaded = function(page) {
      return async function() {
        addStyle(page.css)
        const config = new Config(gmGetValue(), gmSetValue())
        await config.sync()
        var model = createModel(config)
        var view = createView(page)
        view.addConfigBar()
        view.bindToModel(model)
        view.bindToWindow()
        view.setupAndRequestThumbInfo(model)
        view.requestNicoChart(model)
        view.setupTables(model)
        view.observeMutation(model)
        new Controller(model.config, page).addListenersTo(page.doc.body)
        if (!model.config.useGetThumbInfo.value) {
          page.pendingMoviesVisible = true
        }
        page.doc.body.addEventListener('AutoPagerize_DOMNodeInserted',
                                       handleAutoPagerizedNodes(model, page))
      }
    }
    var getPage = function() {
      if (SearchPage.is(document.location)) return new SearchPage(document)
      if (MatrixPage.is(document.location)) return new MatrixPage(document)
      return new ListPage(document)
    }
    var main = function() {
      var page = getPage()
      page.pendingMoviesVisible = false
      if (['interactive', 'complete'].includes(document.readyState))
        domContentLoaded(page)()
      else
        page.doc.addEventListener('DOMContentLoaded', domContentLoaded(page))
    }
    return {main}
  })()

  Main.main()
})()