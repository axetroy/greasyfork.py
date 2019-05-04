// ==UserScript==
// @name        Bangumi-Episode-Chinese
// @namespace   org.binota.scripts.bangumi.bec
// @description Show Chinese episode name in episode page.
// @include     /^https?:\/\/(bgm\.tv|bangumi\.tv|chii\.in)\/ep\/\d+/
// @version     0.1.1
// @grant       GM_xmlhttpRequest
// ==/UserScript==
'use strict';

const STORAGE_PREFIX = `binota_bec_`;

var $ = function(query) {
  return document.querySelector(query);
};

var $a = function(query) {
  return document.querySelectorAll(query);
};

var subject = $('h1.nameSingle a').href.match(/\/subject\/(\d+)/)[1];
var episode = window.location.href.match(/\/ep\/(\d+)/)[1];

var storage = new (function(driver) {
  this._storage = driver;

  this.set = function(key, value) {
    this._storage.setItem(`${STORAGE_PREFIX}${key}`, value);
    return value;
  };

  this.get = function(key) {
    return this._storage.getItem(`${STORAGE_PREFIX}${key}`);
  };

  this.remove = function(key) {
    this._storage.removeItem(`${STORAGE_PREFIX}${key}`);
    return key;
  };
})(localStorage);

var episodes = new (function(storage, id) {
  var subject = (JSON.parse(storage.get(id)) || {});

  this.getTitle = function(episode) {
    return subject[episode] || '';
  };

  this.setTitle = function(episode, title) {
    return subject[episode] = title.trim();
  };

  this.save = function() {
    return storage.set(id, JSON.stringify(subject));
  };
})(storage, subject);

var writeTitle = function() {
  var title = episodes.getTitle(episode);
  $('h2.title').innerHTML += ` <small><a class="l" onclick="(function(){localStorage.removeItem('${STORAGE_PREFIX}${subject}');window.location.reload();})()" href="#">[刷新中文名缓存]</small>`;
  if(title !== '') {
    $('h2.title').innerHTML = $('h2.title').innerHTML.replace('<small', ` / ${title} <small`);
    document.title = document.title.replace(/ \/ /, ` | ${title} / `);
  }
}

var writeEpisodeList = function() {

  //Write title of episode list
  var list = $a('.sideEpList li a');
  for(let i = 0; i < list.length; i++) {
    let liId = (list[i].href.match(/ep\/(\d+)/) || [-1, -1])[1];
    let liTitle = episodes.getTitle(liId);
    if(liTitle !== '') list[i].innerHTML += ' / ' + liTitle;
  }
}

//check cache:
if(storage.get(subject)) {
  writeTitle();
  writeEpisodeList();
} else {
  //Query API
  GM_xmlhttpRequest({
    method: 'GET',
    url: `http://api.bgm.tv/subject/${subject}?responseGroup=large`,
    onload: function(response) {
      var data = JSON.parse(response.response);
      //write cache

      for(let ep of data.eps) {
        if(ep.id == episode) {
          writeTitle();
        }
        episodes.setTitle(ep.id, ep.name_cn);
      }
      
      episodes.save();
      writeEpisodeList();
    }
  });
}
