// ==UserScript==
// @name		ViewTube+
// @version		2018.07.01
// @description		Watch videos from video sharing websites without Flash Player.
// @author		sebaro
// @namespace		http://sebaro.pro/viewtube
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @icon		https://gitlab.com/sebaro/viewtube/raw/master/viewtube.png
// @include		http://video.repubblica.it/*
// @include		https://video.repubblica.it/*
// @include		http://video.gelocal.it/*
// @include		https://video.gelocal.it/*
// @include		http://video.corriere.it/*
// @include		https://video.corriere.it/*
// @include		http://www.altoadige.it/*
// @include		https://www.altoadige.it/*
// @include		http://www.ilfattoquotidiano.it/*
// @include		https://www.ilfattoquotidiano.it/*
// @include		http://www.video.mediaset.it/*
// @include		https://www.video.mediaset.it/*
// ==/UserScript==


/*

  Copyright (C) 2010 - 2018 Sebastian Luncan

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program. If not, see <http://www.gnu.org/licenses/>.

  Website: http://sebaro.pro/viewtube
  Contact: http://sebaro.pro/contact

*/


(function() {


// Don't run on frames or iframes
if (window.top != window.self) return;


// ==========Variables========== //

// Userscript
var userscript = 'ViewTube';

// Page
var page = {win: window, doc: window.document, body: window.document.body, url: window.location.href, site: window.location.hostname.match(/([^.]+)\.[^.]+$/)[1]};

// Player
var player = {};
var feature = {'autoplay': true, 'definition': true, 'container': true, 'direct': false, 'widesize': true, 'fullsize': true};
var option = {'plugin': 'Auto', 'autoplay': false, 'autoget': false, 'definition': 'HD', 'container': 'MP4', 'widesize': false, 'fullsize': false};
var plugins = ['Auto', 'Alt', 'HTML5', 'VLC', 'MP4', 'MPEG', 'VTP'];
if (navigator.platform.indexOf('Win') != -1) plugins = plugins.concat(['WMP', 'WMP2', 'QT']);
else if (navigator.platform.indexOf('Mac') != -1) plugins = plugins.concat(['QT']);
else plugins = plugins.concat(['MPV', 'Totem', 'Xine']);
var mimetypes = {
  'MPEG': 'video/mpeg',
  'MP4': 'video/mp4',
  'WebM': 'video/webm',
  'WMP': 'application/x-ms-wmp',
  'WMP2': 'application/x-mplayer2',
  'QT': 'video/quicktime',
  'VLC': 'application/x-vlc-plugin',
  'MPV': 'video/mp4',
  'Totem': 'application/x-totem-plugin',
  'Xine': 'application/x-xine-plugin'
};
var sources = {};

// Player Window
var myPlayerWindow;

// Links
var website = 'http://sebaro.pro/viewtube';
var contact = 'http://sebaro.pro/contact';


// ==========Functions========== //

function createMyElement(type, content, event, action, target) {
  var obj = page.doc.createElement(type);
  if (content) {
    if (type == 'div') obj.innerHTML = content;
    else if (type == 'img') obj.src = content;
    else if (type == 'option') {
      obj.value = content;
      obj.innerHTML = content;
    }
    else if (type == 'video') {
      obj.src = content;
      obj.controls = 'controls';
      obj.autoplay = 'autoplay';
      obj.volume = 0.8;
      obj.innerHTML = '<br><br>The video should be loading. If it doesn\'t load, make sure your browser supports HTML5\'s Video and this video codec. If you think it\'s a script issue, please report it <a href="' + contact + '" style="color:#00892C">here</a>.';
    }
    else if (type == 'object') {
      obj.data = content;
      obj.innerHTML = '<br><br>The video should be loading. If it doesn\'t load, make sure a video plugin is installed. If you think it\'s a script issue, please report it <a href="' + contact + '" style="color:#00892C">here</a>.<param name="scale" value="aspect"><param name="stretchtofit" value="true"><param name="autostart" value="true"><param name="autoplay" value="true">';
    }
    else if (type == 'embed') {
      if (option['plugin'] == 'VLC') obj.setAttribute('target', content);
      else obj.src = content;
      obj.innerHTML = '<br><br>The video should be loading. If it doesn\'t load, make sure a video plugin is installed. If you think it\'s a script issue, please report it <a href="' + contact + '" style="color:#00892C">here</a>.<param name="scale" value="aspect"><param name="stretchtofit" value="true"><param name="autostart" value="true"><param name="autoplay" value="true">';
    }
  }
  if (type == 'video' || type == 'object' || type == 'embed') {
    if (option['plugin'] == 'Auto' || option['plugin'] == 'Alt' || option['plugin'] == 'HTML5') {
      obj.type = mimetypes[player['videoPlay'].replace(/.*\s/, '')];
    }
    else {
      obj.type = mimetypes[option['plugin']];
    }
    obj.id = 'vtVideo';
  }
  if (event == 'change') {
    if (target == 'video') {
      obj.addEventListener('change', function() {
	player['videoPlay'] = this.value;
	if (player['isGetting']) {
	  modifyMyElement(player['buttonGet'] , 'div', 'Get', false);
	  player['isGetting'] = false;
	}
	if (player['isPlaying']) playMyVideo(option['autoplay']);
      }, false);
    }
    else if (target == 'plugin') {
      obj.addEventListener('change', function() {
	option['plugin'] = this.value;
	setMyOptions('plugin', option['plugin']);
	if (player['isPlaying']) playMyVideo(true);
      }, false);
    }
  }
  else if (event == 'click') {
    obj.addEventListener('click', function() {
      if (action == 'close') {
	removeMyElement(page.body, target);
      }
      else if (action == 'logo') {
	page.win.location.href = website;
      }
      else if (action == 'play') {
	playMyVideo(!player['isPlaying']);
      }
      else if (action == 'get') {
	getMyVideo();
      }
      else if (action == 'autoplay') {
	option['autoplay'] = (option['autoplay']) ? false : true;
	if (option['autoplay']) {
	  styleMyElement(player['buttonAutoplay'], {color: '#008080', textShadow: '0px 1px 1px #CCCCCC'});
	  if (!player['isPlaying']) playMyVideo(true);
	}
	else {
	  styleMyElement(player['buttonAutoplay'], {color: '#CCCCCC', textShadow: '0px 0px 0px'});
	  playMyVideo(false);
	}
	setMyOptions('autoplay', option['autoplay']);
      }
      else if (action == 'definition') {
	for (var itemDef = 0; itemDef < option['definitions'].length; itemDef++) {
	  if (option['definitions'][itemDef].match(/[A-Z]/g).join('') == option['definition']) {
	    var nextDef = (itemDef + 1 < option['definitions'].length) ? itemDef + 1 : 0;
	    option['definition'] = option['definitions'][nextDef].match(/[A-Z]/g).join('');
	    break;
	  }
	}
	modifyMyElement(player['buttonDefinition'], 'div', option['definition'], false);
	setMyOptions('definition', option['definition']);
	if (player['isGetting']) {
	  modifyMyElement(player['buttonGet'] , 'div', 'Get', false);
	  player['isGetting'] = false;
	}
	selectMyVideo();
	if (player['isPlaying']) playMyVideo(true);
      }
      else if (action == 'container') {
	for (var itemCont = 0; itemCont < option['containers'].length; itemCont++) {
	  if (option['containers'][itemCont] == option['container']) {
	    var nextCont = (itemCont + 1 < option['containers'].length) ? itemCont + 1 : 0;
	    option['container'] = option['containers'][nextCont];
	    break;
	  }
	}
	modifyMyElement(player['buttonContainer'], 'div', option['container'], false);
	setMyOptions('container', option['container']);
	if (player['isGetting']) {
	  modifyMyElement(player['buttonGet'] , 'div', 'Get', false);
	  player['isGetting'] = false;
	}
	selectMyVideo();
	if (player['isPlaying']) playMyVideo(true);
      }
      else if (action == 'direct') {
	option['direct'] = (option['direct']) ? false : true;
	if (option['direct']) {
	  styleMyElement(player['buttonDirect'], {color: '#008080', textShadow: '0px 1px 1px #CCCCCC'});
	}
	else {
	  styleMyElement(player['buttonDirect'], {color: '#CCCCCC', textShadow: '0px 0px 0px'});
	}
	setMyOptions('direct', option['direct']);
	selectMyVideo();
	if (player['isPlaying']) playMyVideo(true);
      }
      else if (action == 'widesize') {
	option['widesize'] = (option['widesize']) ? false : true;
	setMyOptions('widesize', option['widesize']);
	resizeMyPlayer('widesize');
      }
      else if (action == 'fullsize') {
	option['fullsize'] = (option['fullsize']) ? false : true;
	setMyOptions('fullsize', option['fullsize']);
	resizeMyPlayer('fullsize');
      }
    }, false);
  }
  return obj;
}

function getMyElement(obj, type, from, value, child, content) {
  var getObj, chObj, coObj;
  var pObj = (!obj) ? page.doc : obj;
  if (type == 'body') getObj = pObj.body;
  else {
    if (from == 'id') getObj = pObj.getElementById(value);
    else if (from == 'class') getObj = pObj.getElementsByClassName(value);
    else if (from == 'tag') getObj = pObj.getElementsByTagName(type);
    else if (from == 'ns') getObj = pObj.getElementsByTagNameNS(value, type);
  }
  chObj = (child >= 0) ? getObj[child] : getObj;
  if (content && chObj) {
    if (type == 'html' || type == 'body' || type == 'div' || type == 'option') coObj = chObj.innerHTML;
    else if (type == 'object') coObj = chObj.data;
    else if (type == 'img' || type == 'video' || type == 'embed') coObj = chObj.src;
    else coObj = chObj.textContent;
    return coObj;
  }
  else {
    return chObj;
  }
}

function modifyMyElement(obj, type, content, clear, hide) {
  if (content) {
    if (type == 'div') obj.innerHTML = content;
    else if (type == 'option') {
      obj.value = content;
      obj.innerHTML = content;
    }
    else if (type == 'object') obj.data = content;
    else if (type == 'img' || type == 'video' || type == 'embed') obj.src = content;
  }
  if (clear) {
    if (obj.hasChildNodes()) {
      while (obj.childNodes.length >= 1) {
        obj.removeChild(obj.firstChild);
      }
    }
  }
  if (hide) {
    for (var i = 0; i < obj.children.length; i++) {
      styleMyElement(obj.children[i], {display: 'none'});
    }
  }
}

function styleMyElement(obj, styles) {
  for (var property in styles) {
    if (styles.hasOwnProperty(property)) obj.style[property] = styles[property];
  }
}

function appendMyElement(parent, child) {
  parent.appendChild(child);
}

function removeMyElement(parent, child) {
  parent.removeChild(child);
}

function replaceMyElement(parent, orphan, child) {
  parent.replaceChild(orphan, child);
}

function createMyPlayer() {
  /* Get My Options */
  getMyOptions();

  /* Player Settings */
  player['panelHeight'] = 18;
  player['panelPadding'] = 2;

  /* The Panel */
  var panelWidth = player['playerWidth'] - player['panelPadding'] * 2;
  player['playerPanel'] = createMyElement('div', '', '', '', '');
  styleMyElement(player['playerPanel'], {width: panelWidth + 'px', height: player['panelHeight'] + 'px', padding: player['panelPadding'] + 'px', backgroundColor: 'inherit', textAlign: 'center'});
  appendMyElement(player['playerWindow'], player['playerPanel']);

  /* Panel Items */
  var panelItemBorder = 1;
  var panelItemHeight = player['panelHeight'] - panelItemBorder * 2;

  /* Panel Logo */
  player['panelLogo'] = createMyElement('div', userscript + ': ', 'click', 'logo', '');
  player['panelLogo'].title = '{ViewTube: click to visit the script web page}';
  styleMyElement(player['panelLogo'], {height: panelItemHeight + 'px', padding: '0px', display: 'inline', color: '#336699', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', cursor: 'pointer'});
  appendMyElement(player['playerPanel'], player['panelLogo']);

  /* Panel Video Menu */
  player['videoMenu'] = createMyElement('select', '', 'change', '', 'video');
  player['videoMenu'].title = '{Videos: select the video format for playback}';
  styleMyElement(player['videoMenu'], {width: '200px', height: panelItemHeight + 'px', border: '1px solid transparent', padding: '0px', display: 'inline', backgroundColor: 'inherit', color: '#336699', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', verticalAlign: 'baseline', cursor: 'pointer'});
  appendMyElement(player['playerPanel'], player['videoMenu'] );
  for (var videoCode in player['videoList']) {
    player['videoItem'] = createMyElement('option', videoCode, '', '', '');
    styleMyElement(player['videoItem'], {padding: '0px', display: 'block', color: '#336699', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', cursor: 'pointer'});
    appendMyElement(player['videoMenu'], player['videoItem']);
    if (videoCode == 'Direct Video Link') styleMyElement(player['videoItem'], {color: '#00C0C0'});
  }

  /* Panel Plugin Menu */
  player['pluginMenu'] = createMyElement('select', '', 'change', '', 'plugin');
  player['pluginMenu'].title = '{Plugins: select the video plugin for playback}';
  styleMyElement(player['pluginMenu'], {width: '70px', height: panelItemHeight + 'px', border: '1px solid transparent', padding: '0px', display: 'inline', backgroundColor: 'inherit', color: '#336699', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', verticalAlign: 'baseline', cursor: 'pointer'});
  appendMyElement(player['playerPanel'], player['pluginMenu'] );
  for (var p = 0; p < plugins.length; p++) {
    player['pluginItem'] = createMyElement('option', plugins[p], '', '', '');
    styleMyElement(player['pluginItem'], {padding: '0px', display: 'block', color: '#336699', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', cursor: 'pointer'});
    appendMyElement(player['pluginMenu'], player['pluginItem']);
  }
  player['pluginMenu'].value = option['plugin'];

  /* Panel Play Button */
  player['buttonPlay'] = createMyElement('div', 'Play', 'click', 'play', '');
  player['buttonPlay'].title = '{Play/Stop: click to start/stop video playback}';
  styleMyElement(player['buttonPlay'], {height: panelItemHeight + 'px', border: '1px solid #CCCCCC', borderRadius: '3px', padding: '0px 5px', display: 'inline', color: '#37B704', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', cursor: 'pointer'});
  appendMyElement(player['playerPanel'], player['buttonPlay']);

  /* Panel Autoplay Button */
  if (feature['autoplay']) {
    player['buttonAutoplay'] = createMyElement('div', 'AP', 'click', 'autoplay', '');
    player['buttonAutoplay'].title = '{Autoplay: click to enable/disable auto playback on page load}';
    styleMyElement(player['buttonAutoplay'], {height: panelItemHeight + 'px', border: '1px solid #CCCCCC', borderRadius: '3px', padding: '0px 5px', display: 'inline', color: '#CCCCCC', fontSize: '12px', cursor: 'pointer'});
    if (option['autoplay']) styleMyElement(player['buttonAutoplay'], {color: '#008080', textShadow: '0px 1px 1px #CCCCCC'});
    appendMyElement(player['playerPanel'], player['buttonAutoplay']);
  }

  /* Panel Get Button */
  player['buttonGet'] = createMyElement('div', 'Get', 'click', 'get', '');
  player['buttonGet'].title = '{Get: click to download the selected video format}';
  styleMyElement(player['buttonGet'], {height: panelItemHeight + 'px', border: '1px solid #CCCCCC', borderRadius: '3px', padding: '0px 5px', display: 'inline', color: '#C000C0', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', cursor: 'pointer'});
  appendMyElement(player['playerPanel'], player['buttonGet']);

  /* Panel Definition Button */
  if (feature['definition']) {
    player['buttonDefinition'] = createMyElement('div', option['definition'], 'click', 'definition', '');
    player['buttonDefinition'].title = '{Definition: click to change the preferred video definition}';
    styleMyElement(player['buttonDefinition'], {height: panelItemHeight + 'px', border: '1px solid #CCCCCC', borderRadius: '3px', padding: '0px 5px', display: 'inline', color: '#008000', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', cursor: 'pointer'});
    appendMyElement(player['playerPanel'], player['buttonDefinition']);
  }

  /* Panel Container Button */
  if (feature['container']) {
    player['buttonContainer'] = createMyElement('div', option['container'], 'click', 'container', '');
    player['buttonContainer'].title = '{Container: click to change the preferred video container}';
    styleMyElement(player['buttonContainer'], {height: panelItemHeight + 'px', border: '1px solid #CCCCCC', borderRadius: '3px', padding: '0px 5px', display: 'inline', color: '#008000', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', cursor: 'pointer'});
    appendMyElement(player['playerPanel'], player['buttonContainer']);
  }

  /* Panel Direct Button */
  if (feature['direct']) {
    player['buttonDirect'] = createMyElement('div', 'DVL', 'click', 'direct', '');
    player['buttonDirect'].title = '{DVL: click to enable/disable auto selection of Direct Video Link}';
    styleMyElement(player['buttonDirect'], {height: panelItemHeight + 'px', border: '1px solid #CCCCCC', borderRadius: '3px', padding: '0px 5px', display: 'inline', color: '#CCCCCC', fontSize: '12px', cursor: 'pointer'});
    if (option['direct']) styleMyElement(player['buttonDirect'], {color: '#008080', textShadow: '0px 1px 1px #CCCCCC'});
    appendMyElement(player['playerPanel'], player['buttonDirect']);
  }

  /* Panel Widesize Button */
  if (feature['widesize']) {
    if (option['widesize']) player['buttonWidesize'] = createMyElement('div', '&lt;', 'click', 'widesize', '');
    else player['buttonWidesize'] = createMyElement('div', '&gt;', 'click', 'widesize', '');
    player['buttonWidesize'].title = '{Widesize: click to enter player widesize or return to normal size}';
    styleMyElement(player['buttonWidesize'], {height: panelItemHeight + 'px', border: '1px solid #CCCCCC', borderRadius: '3px', padding: '0px 5px', display: 'inline', color: '#C05800', fontSize: '12px', textShadow: '1px 1px 2px #CCCCCC', cursor: 'pointer'});
    appendMyElement(player['playerPanel'], player['buttonWidesize']);
  }

  /* Panel Fullsize Button */
  if (feature['fullsize']) {
    if (option['fullsize']) player['buttonFullsize'] = createMyElement('div', '-', 'click', 'fullsize', '');
    else player['buttonFullsize'] = createMyElement('div', '+', 'click', 'fullsize', '');
    player['buttonFullsize'].title = '{Fullsize: click to enter player fullsize or return to normal size}';
    styleMyElement(player['buttonFullsize'], {height: panelItemHeight + 'px', border: '1px solid #CCCCCC', borderRadius: '3px', padding: '0px 5px', display: 'inline', color: '#C05800', fontSize: '12px', textShadow: '1px 1px 2px #CCCCCC', cursor: 'pointer'});
    appendMyElement(player['playerPanel'], player['buttonFullsize']);
  }

  /* The Content */
  player['contentWidth'] = player['playerWidth'];
  player['contentHeight'] = player['playerHeight'] - player['panelHeight'] - player['panelPadding'] * 2;
  player['playerContent'] = createMyElement('div', '', '', '', '');
  styleMyElement(player['playerContent'], {width: player['contentWidth'] + 'px', height: player['contentHeight'] + 'px', position: 'relative', color: '#AD0000', backgroundColor: '#000000', fontSize: '14px', fontWeight: 'bold', textAlign: 'center'});
  appendMyElement(player['playerWindow'], player['playerContent']);

  /* The Video Thumbnail */
  if (player['videoThumb']) {
    player['contentImage'] = createMyElement('img', player['videoThumb'], 'click', 'play', '');
    player['contentImage'].title = '{Click to start video playback}';
    styleMyElement (player['contentImage'], {maxWidth: '100%', maxHeight: '100%', position: 'absolute', top: '0px', left: '0px', right: '0px', bottom: '0px', margin: 'auto', border: '0px', cursor: 'pointer'});
    player['contentImage'].addEventListener('load', function () {
      if (this.width/this.height >= player['contentWidth']/player['contentHeight']) {
	this.style.width = '100%';
      }
      else {
	this.style.height = '100%';
      }
    });
  }

  /* Disabled Features */
  if (!feature['autoplay']) option['autoplay'] = false;
  if (!feature['widesize']) option['widesize'] = false;
  if (!feature['fullsize']) option['fullsize'] = false;

  /* Resize My Player */
  if (option['widesize']) resizeMyPlayer('widesize');
  if (option['fullsize']) resizeMyPlayer('fullsize');

  /* Select My Video */
  if (feature['definition'] || feature['container']) selectMyVideo();

  /* Play My Video */
  playMyVideo(option['autoplay']);
}

function selectMyVideo() {
  var vdoCont = (option['container'] != 'Any') ? [option['container']] : option['containers'];
  var vdoDef = option['definitions'];
  var vdoList = {};
  for (var vC = 0; vC < vdoCont.length; vC++) {
    if (vdoCont[vC] != 'Any') {
      for (var vD = 0; vD < vdoDef.length; vD++) {
	var format = vdoDef[vD] + ' ' + vdoCont[vC];
	if (!vdoList[vdoDef[vD]]) {
	  for (var vL in player['videoList']) {
	    if (vL == format) {
	      vdoList[vdoDef[vD]] = vL;
	      break;
	    }
	  }
	}
      }
    }
  }
  if (option['definition'] == 'UHD') {
    if (vdoList['Ultra High Definition']) player['videoPlay'] = vdoList['Ultra High Definition'];
    else if (vdoList['Full High Definition']) player['videoPlay'] = vdoList['Full High Definition'];
    else if (vdoList['High Definition']) player['videoPlay'] = vdoList['High Definition'];
    else if (vdoList['Standard Definition']) player['videoPlay'] = vdoList['Standard Definition'];
    else if (vdoList['Low Definition']) player['videoPlay'] = vdoList['Low Definition'];
    else if (vdoList['Very Low Definition']) player['videoPlay'] = vdoList['Very Low Definition'];
  }
  else if (option['definition'] == 'FHD') {
    if (vdoList['Full High Definition']) player['videoPlay'] = vdoList['Full High Definition'];
    else if (vdoList['High Definition']) player['videoPlay'] = vdoList['High Definition'];
    else if (vdoList['Standard Definition']) player['videoPlay'] = vdoList['Standard Definition'];
    else if (vdoList['Low Definition']) player['videoPlay'] = vdoList['Low Definition'];
    else if (vdoList['Very Low Definition']) player['videoPlay'] = vdoList['Very Low Definition'];
  }
  else if (option['definition'] == 'HD') {
    if (vdoList['High Definition']) player['videoPlay'] = vdoList['High Definition'];
    else if (vdoList['Standard Definition']) player['videoPlay'] = vdoList['Standard Definition'];
    else if (vdoList['Low Definition']) player['videoPlay'] = vdoList['Low Definition'];
    else if (vdoList['Very Low Definition']) player['videoPlay'] = vdoList['Very Low Definition'];
  }
  else if (option['definition'] == 'SD') {
    if (vdoList['Standard Definition']) player['videoPlay'] = vdoList['Standard Definition'];
    else if (vdoList['Low Definition']) player['videoPlay'] = vdoList['Low Definition'];
    else if (vdoList['Very Low Definition']) player['videoPlay'] = vdoList['Very Low Definition'];
  }
  else if (option['definition'] == 'LD') {
    if (vdoList['Low Definition']) player['videoPlay'] = vdoList['Low Definition'];
    else if (vdoList['Very Low Definition']) player['videoPlay'] = vdoList['Very Low Definition'];
  }
  else if (option['definition'] == 'VLD') {
    if (vdoList['Very Low Definition']) player['videoPlay'] = vdoList['Very Low Definition'];
    else if (vdoList['Low Definition']) player['videoPlay'] = vdoList['Low Definition'];
  }
  if (option['direct']) player['videoPlay'] = 'Direct Video Link';
  player['videoMenu'].value = player['videoPlay'];
}

function playMyVideo(play) {
  if (play) {
    if (option['plugin'] == 'VTP') {
      page.win.location.href = 'viewtube:' + player['videoList'][player['videoPlay']];
      return;
    }
    player['isPlaying'] = true;
    modifyMyElement(player['buttonPlay'], 'div', 'Stop', false);
    styleMyElement(player['buttonPlay'], {color: '#AD0000'});
    modifyMyElement(player['playerContent'], 'div', '', true);
    if (option['plugin'] == 'HTML5') player['contentVideo'] = createMyElement('video', player['videoList'][player['videoPlay']], '', '', '');
    else if (option['plugin'] == 'Alt' || option['plugin'] == 'VLC') player['contentVideo'] = createMyElement('embed', player['videoList'][player['videoPlay']], '', '', '');
    else player['contentVideo'] = createMyElement('object', player['videoList'][player['videoPlay']], '', '', '');
    player['contentVideo'].width = player['contentWidth'];
    player['contentVideo'].height = player['contentHeight'];
    styleMyElement(player['contentVideo'], {position: 'relative', width: player['contentWidth'] + 'px', height: player['contentHeight'] + 'px'});
    appendMyElement(player['playerContent'], player['contentVideo']);
  }
  else {
    player['isPlaying'] = false;
    modifyMyElement(player['buttonPlay'], 'div', 'Play', false);
    styleMyElement(player['buttonPlay'], {color: '#37B704'});
    modifyMyElement(player['playerContent'], 'div', '', true);
    if (player['contentImage']) appendMyElement(player['playerContent'], player['contentImage']);
    else showMyMessage('!thumb');
  }
}

function getMyVideo() {
  var vdoURL = player['videoList'][player['videoPlay']];
  if (vdoURL == page.url) return;
  var vdoLnk = 'Get <a href="' + vdoURL + '" style="color:#00892C">Link</a>';
  modifyMyElement(player['buttonGet'] , 'div', vdoLnk, false);
  player['isGetting'] = true;
}

function resizeMyPlayer(size) {
  if (size == 'widesize') {
    if (option['widesize']) {
      if (player['buttonWidesize']) modifyMyElement(player['buttonWidesize'], 'div', '&lt;', false);
      var playerWidth = player['playerWideWidth'];
      var playerHeight= player['playerWideHeight'];
      var sidebarMargin = player['sidebarMarginWide'];
    }
    else {
      if (player['buttonWidesize']) modifyMyElement(player['buttonWidesize'], 'div', '&gt;', false);
      var playerWidth = player['playerWidth'];
      var playerHeight= player['playerHeight'];
      var sidebarMargin = player['sidebarMarginNormal'];
    }
  }
  else if (size == 'fullsize') {
    if (option['fullsize']) {
      var playerPosition = 'fixed';
      var playerWidth = page.win.innerWidth || page.doc.documentElement.clientWidth;
      var playerHeight = page.win.innerHeight || page.doc.documentElement.clientHeight;
      var playerIndex = '9999999999';
      if (!player['isFullsize']) {
	if (feature['widesize']) styleMyElement(player['buttonWidesize'], {display: 'none'});
	modifyMyElement(player['buttonFullsize'], 'div', '-', false);
	appendMyElement(page.body, player['playerWindow']);
	styleMyElement(page.body, {overflow: 'hidden'});
	styleMyElement(page.body.parentNode, {overflow: 'hidden'});
	if (!player['resizeListener']) player['resizeListener'] = function() {resizeMyPlayer('fullsize')};
	page.win.addEventListener('resize', player['resizeListener'], false);
	player['isFullsize'] = true;
	if (player['isPlaying']) {
	  if (player['contentVideo'] && player['contentVideo'].paused) player['contentVideo'].play();
	}
      }
    }
    else {
      var playerPosition = 'relative';
      var playerWidth = (option['widesize']) ? player['playerWideWidth'] : player['playerWidth'];
      var playerHeight = (option['widesize']) ? player['playerWideHeight'] : player['playerHeight'];
      var playerIndex = 'auto';
      if (feature['widesize']) styleMyElement(player['buttonWidesize'], {display: 'inline'});
      modifyMyElement(player['buttonFullsize'], 'div', '+', false);
      appendMyElement(player['playerSocket'], player['playerWindow']);
      styleMyElement(page.body, {overflow: 'auto'});
      styleMyElement(page.body.parentNode, {overflow: 'auto'});
      page.win.removeEventListener('resize', player['resizeListener'], false);
      player['isFullsize'] = false;
      if (player['isPlaying']) {
	if (player['contentVideo'] && player['contentVideo'].paused) player['contentVideo'].play();
      }
    }
  }

  /* Resize The Player */
  if (size == 'widesize') {
    if (player['sidebarWindow']) styleMyElement(player['sidebarWindow'], {marginTop: sidebarMargin + 'px'});
    styleMyElement(player['playerSocket'], {height: playerHeight + 'px'});
    styleMyElement(player['playerWindow'], {width: playerWidth + 'px', height: playerHeight + 'px'});
  }
  else styleMyElement(player['playerWindow'], {position: playerPosition, top: '0px', left: '0px', width: playerWidth + 'px', height: playerHeight + 'px', zIndex: playerIndex});

  /* Resize The Panel */
  var panelWidth = playerWidth - player['panelPadding'] * 2;
  styleMyElement(player['playerPanel'], {width: panelWidth + 'px'});

  /* Resize The Content */
  player['contentWidth'] = playerWidth;
  player['contentHeight'] = playerHeight - player['panelHeight'] - player['panelPadding'] * 2;
  styleMyElement(player['playerContent'], {width: player['contentWidth'] + 'px', height: player['contentHeight'] + 'px'});
  if (player['isPlaying']) {
    player['contentVideo'].width = player['contentWidth'];
    player['contentVideo'].height = player['contentHeight'];
    styleMyElement(player['contentVideo'], {width: player['contentWidth'] + 'px', height: player['contentHeight'] + 'px'});
  }
}

function cleanMyContent(content, unesc) {
  var myNewContent = content;
  if (unesc) myNewContent = unescape(myNewContent);
  myNewContent = myNewContent.replace(/\\u0025/g,'%');
  myNewContent = myNewContent.replace(/\\u0026/g,'&');
  myNewContent = myNewContent.replace(/\\/g,'');
  myNewContent = myNewContent.replace(/\n/g,'');
  return myNewContent;
}

function getMyContent(url, pattern, clean) {
  var myPageContent, myVideosParse, myVideosContent;
  if (!sources[url]) {
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', url, false);
    xmlHTTP.send();
    sources[url] = (xmlHTTP.responseText) ? xmlHTTP.responseText : xmlHTTP.responseXML;
    //console.log('Request: ' + url + ' ' + pattern);
  }
  if (pattern == 'TEXT') {
    myVideosContent = sources[url];
  }
  else {
    myPageContent = (sources[url]) ? sources[url] : '';
    if (clean) myPageContent = cleanMyContent(myPageContent, true);
    myVideosParse = myPageContent.match(pattern);
    myVideosContent = (myVideosParse) ? myVideosParse[1] : null;
  }
  return myVideosContent;
}

function setMyOptions(key, value) {
  key = page.site + '_' + userscript.toLowerCase() + '_' + key;
  try {
    localStorage.setItem(key, value);
    if (localStorage.getItem(key) == value) return;
    else throw false;
  }
  catch(e) {
    var date = new Date();
    date.setTime(date.getTime() + (356*24*60*60*1000));
    var expires = '; expires=' + date.toGMTString();
    page.doc.cookie = key + '=' + value + expires + '; path=/';
  }
}

function getMyOptions() {
  for (var opt in option) {
    if (option.hasOwnProperty(opt)) {
      var key = page.site + '_' + userscript.toLowerCase() + '_' + opt;
      try {
	if (localStorage.getItem(key)) {
	  option[opt] = localStorage.getItem(key);
	  continue;
	}
	else throw false;
      }
      catch(e) {
	var cookies = page.doc.cookie.split(';');
	for (var i=0; i < cookies.length; i++) {
	  var cookie = cookies[i];
	  while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
	  option[opt] = (cookie.indexOf(key) == 0) ? cookie.substring(key.length + 1, cookie.length) : option[opt];
	}
      }
    }
  }
  option['autoplay'] = (option['autoplay'] === true || option['autoplay'] == 'true') ? true : false;
  option['direct'] = (option['direct'] === true || option['direct'] == 'true') ? true : false;
  option['widesize'] = (option['widesize'] === true || option['widesize'] == 'true') ? true : false;
  option['fullsize'] = (option['fullsize'] === true || option['fullsize'] == 'true') ? true : false;
}

function showMyMessage(cause, content) {
  var myScriptLogo = createMyElement('div', userscript, '', '', '');
  styleMyElement(myScriptLogo, {margin: '0px auto', padding: '10px', color: '#666666', fontSize: '24px', textAlign: 'center', textShadow: '#FFFFFF -1px -1px 2px'});
  var myScriptMess = createMyElement('div', '', '', '', '');
  styleMyElement(myScriptMess, {border: '1px solid #F4F4F4', margin: '5px auto 5px auto', padding: '10px', backgroundColor: '#FFFFFF', color: '#AD0000', textAlign: 'center'});
  if (cause == '!player') {
    var myScriptAlert = createMyElement('div', '', '', '', '');
    styleMyElement(myScriptAlert, {position: 'absolute', top: '30%', left: '35%', border: '1px solid #F4F4F4', borderRadius: '3px', padding: '10px', backgroundColor: '#FFFFFF', fontSize: '14px', textAlign: 'center', zIndex: '99999'});
    appendMyElement(myScriptAlert, myScriptLogo);
    var myNoPlayerMess = 'Couldn\'t get the player element. Please report it <a href="' + contact + '" style="color:#00892C">here</a>.';
    modifyMyElement(myScriptMess, 'div', myNoPlayerMess, false);
    appendMyElement(myScriptAlert, myScriptMess);
    var myScriptAlertButton = createMyElement('div', 'OK', 'click', 'close', myScriptAlert);
    styleMyElement(myScriptAlertButton, {width: '100px', border: '3px solid #EEEEEE', borderRadius: '5px', margin: '0px auto', backgroundColor: '#EEEEEE', color: '#666666', fontSize: '18px', textAlign: 'center', textShadow: '#FFFFFF -1px -1px 2px', cursor: 'pointer'});
    appendMyElement(myScriptAlert, myScriptAlertButton);
    appendMyElement(page.body, myScriptAlert);
  }
  else if (cause == '!thumb') {
    var myNoThumbMess = '<br><br>Couldn\'t get the thumbnail for this video. Please report it <a href="' + contact + '" style="color:#00892C">here</a>.';
    modifyMyElement(player['playerContent'], 'div', myNoThumbMess, false);
  }
  else {
    appendMyElement(myPlayerWindow, myScriptLogo);
    if (cause == '!content') {
      var myNoContentMess = 'Couldn\'t get the videos content. Please report it <a href="' + contact + '" style="color:#00892C">here</a>.';
      modifyMyElement(myScriptMess, 'div', myNoContentMess, false);
    }
    else if (cause == '!videos') {
      var myNoVideosMess = 'Couldn\'t get any video. Please report it <a href="' + contact + '" style="color:#00892C">here</a>.';
      modifyMyElement(myScriptMess, 'div', myNoVideosMess, false);
    }
    else if (cause == '!support') {
      var myNoSupportMess = 'This video uses the RTMP protocol and is not supported.';
      modifyMyElement(myScriptMess, 'div', myNoSupportMess, false);
    }
    else if (cause == 'embed') {
      var myEmbedMess = 'This is an embedded video. You can watch it <a href="' + content + '" style="color:#00892C">here</a>.';
      modifyMyElement(myScriptMess, 'div', myEmbedMess, false);
    }
    else if (cause == 'other') {
      modifyMyElement(myScriptMess, 'div', content, false);
    }
    appendMyElement(myPlayerWindow, myScriptMess);
  }
}


// ==========Blocker========== //

var blockObject = page.doc;
var blockInterval = 50;

function blockVideos() {
  var elVideos = getMyElement(blockObject, 'video', 'tag', '', -1, false);
  if (elVideos.length > 0) {
    for (var v = 0; v < elVideos.length; v++) {
      var elVideo = elVideos[v];
      if (elVideo && elVideo.id != 'vtVideo' && elVideo.currentSrc) {
	if (!elVideo.paused) {
	  elVideo.pause();
	  if (page.url.indexOf('youtube.com/watch') == -1) elVideo.src = "#";
	}
      }
    }
  }
  var elEmbeds = getMyElement(blockObject, 'embed', 'tag', '', -1, false) || getMyElement(blockObject, 'object', 'tag', '', -1, false);
  if (elEmbeds.length > 0) {
    for (var e = 0; e < elEmbeds.length; e++) {
      var elEmbed = elEmbeds[e];
      if (elEmbed && elEmbed.id != 'vtVideo' && elEmbed.parentNode) {
	removeMyElement(elEmbed.parentNode, elEmbed);
      }
    }
  }
  if (blockObject !== page.doc) {
    var elFrames = getMyElement(blockObject, 'iframe', 'tag', '', -1, false);
    if (elFrames.length > 0) {
      for (var e = 0; e < elFrames.length; e++) {
	var elFrame = elFrames[e];
	if (elFrame && elFrame.parentNode) {
	  removeMyElement(elFrame.parentNode, elFrame);
	}
      }
    }
  }
}

blockVideos();


// ==========Websites========== //

function ViewTube() {

  // =====Repubblica/Gelocal===== //

  if (page.url.indexOf('video.repubblica.it') != -1 || page.url.indexOf('video.gelocal.it') != -1) {

    /* Get Player Window */
    //var repPlayerWindow = getMyElement('', 'div', 'id', 'player', -1, false);
    var repPlayerWindow = getMyElement('', 'div', 'class', 'video-player', 0, false);
    if (!repPlayerWindow) {
      showMyMessage('!player');
    }
    else {
      /* My Player Window */
      var myPlayerWindow = createMyElement('div', '', '', '', '');
      styleMyElement(myPlayerWindow, {position: 'relative', width: '640px', height: '382px', backgroundColor: '#F4F4F4'});
      styleMyElement(repPlayerWindow, {background: 'rgba(0, 0, 0, 0)'});
      modifyMyElement(repPlayerWindow, 'div', '', false, true);
      appendMyElement(repPlayerWindow, myPlayerWindow);

      /* Remove Background Image */
      var repPlayerWrapper = getMyElement('', 'div', 'class', 'wrapper', 0, false);
      if (repPlayerWrapper) styleMyElement(repPlayerWrapper, {backgroundImage: 'none'});

      /* Get Video Thumb */
      var repVideoThumb = getMyContent(page.url, '\'param\',\\s*\'image\',\\s*\'(.*?)\'', false);

      /* Get Videos Content */
      var repVideoList = {};
      var repVideoFound, repDefaultVideo;
      var repVideo = getMyContent(page.url, '\'format\',\\s*\'mp4\',\\s*\'(.*?)\'', true);
      if (repVideo) {
	repVideoFound = true;
	repVideoList['Low Definition MP4'] = repVideo;
	repDefaultVideo = 'Low Definition MP4';
      }

      if (repVideoFound) {
	/* Get Watch Sidebar */
	var repSidebarWindow = getMyElement('', 'div', 'id', 'contB', -1, false);
	if (repSidebarWindow) styleMyElement(repSidebarWindow, {marginTop: '12px'});

	/* Create Player */
	player = {
	  'playerSocket': repPlayerWindow,
	  'playerWindow': myPlayerWindow,
	  'videoList': repVideoList,
	  'videoPlay': repDefaultVideo,
	  'videoThumb': repVideoThumb,
	  'playerWidth': 640,
	  'playerHeight': 382,
	  'playerWideWidth': 970,
	  'playerWideHeight': 568,
	  'sidebarWindow': repSidebarWindow,
	  'sidebarMarginNormal': 12,
	  'sidebarMarginWide': 600
	};
	feature['definition'] = false;
	feature['container'] = false;
	option['definition'] = 'LD';
	option['definitions'] = ['Low Definition'];
	option['containers'] = ['MP4'];
	createMyPlayer ();
      }
      else {
	var ytVideoId = getMyContent(page.url, '\'format\',\\s*\'youtube\',\\s*\'(.*?)\'', false);
	if (ytVideoId) {
	  var ytVideoLink = 'http://youtube.com/watch?v=' + ytVideoId;
	  showMyMessage('embed', ytVideoLink);
	}
	else {
	  showMyMessage('!videos');
	}
      }
    }

  }

  // =====Corriere===== //

  else if (page.url.indexOf('video.corriere.it') != -1) {

    /* Archive */
    if (page.url.indexOf('/archivo/') != -1) return;

    /* Redirect First Video */
    var corFirstVideo = getMyElement('', 'div', 'id', 'title-link', -1, false);
    if (corFirstVideo) {
      var corFirstVideoId = getMyContent(page.url, '"video":\\[\\{"id":"(.*?)"', false);
      if (corFirstVideoId && page.url.indexOf(corFirstVideoId) == -1) page.win.location.href = page.url + corFirstVideoId;
    }
    if (page.url.indexOf('/video360/') != -1) {
      var corFirstVideoId = getMyContent(page.url, '"selected-video"\\s+data-uuid="(.*?)"', false);
      if (corFirstVideoId && page.url.indexOf(corFirstVideoId) == -1) page.win.location.href = page.url + corFirstVideoId;
    }

    /* Get Player Window */
    var corPlayerWindow = getMyElement('', 'div', 'class', 'player_big', 0, false);
    if (!corPlayerWindow) corPlayerWindow = getMyElement('', 'div', 'class', 'player', 0, false);
    if (!corPlayerWindow) {
      showMyMessage('!player');
    }
    else {
      /* Block Replace */
      corPlayerWindow.className = 'corPlayerWindow';

      /* My Player Window */
      var myPlayerWindow = createMyElement('div', '', '', '', '');
      styleMyElement(myPlayerWindow, {position: 'relative', width: '656px', height: '391px', backgroundColor: '#F4F4F4', zIndex: '2'});
      styleMyElement(corPlayerWindow, {marginBottom: '50px'});
      modifyMyElement(corPlayerWindow, 'div', '', false, true);
      appendMyElement(corPlayerWindow, myPlayerWindow);
      blockObject = corPlayerWindow;

      /* Get Video Thumb */
      var corVideoThumb = getMyContent(page.url, 'meta\\s+property="og:image"\\s+content="(.*?)"', false);

      /* Get Videos Content */
      var corVideoList = {};
      var corVideoFound, corDefaultVideo;
      var corVideo = getMyContent(page.url, '"mediaFile"\\s*:\\s*\\[\\{\\s*"value"\\s*:\\s*"(.*?)"', true);
      if (corVideo) {
	corVideoFound = true;
	corVideoList['Low Definition MP4'] = corVideo;
	corDefaultVideo = 'Low Definition MP4';
      }

      if (corVideoFound) {
	/* Get Watch Sidebar */
	var corSidebarWindow = getMyElement('', 'div', 'id', 'frame1-container', -1, false);
	if (corSidebarWindow && corSidebarWindow.parentNode) corSidebarWindow = corSidebarWindow.parentNode;

	/* Create Player */
	player = {
	  'playerSocket': corPlayerWindow,
	  'playerWindow': myPlayerWindow,
	  'videoList': corVideoList,
	  'videoPlay': corDefaultVideo,
	  'videoThumb': corVideoThumb,
	  'playerWidth': 656,
	  'playerHeight': 391,
	  'playerWideWidth': 990,
	  'playerWideHeight': 579,
	  'sidebarWindow': corSidebarWindow,
	  'sidebarMarginNormal': 0,
	  'sidebarMarginWide': 740
	};
	feature['definition'] = false;
	feature['container'] = false;
	option['definition'] = 'LD';
	option['definitions'] = ['Low Definition'];
	option['containers'] = ['MP4'];
	createMyPlayer();
	/* Fix panel */
	styleMyElement(player['playerContent'], {marginTop: '5px'});
	/* Large Player Size */
	if (corPlayerWindow.className.indexOf('player_big') != -1) {
	  option['widesize'] = true;
	  resizeMyPlayer('widesize');
	}
      }
      else {
	showMyMessage('!videos');
      }
    }

  }

  // =====AltoAdige===== //

  else if (page.url.indexOf('altoadige.it/video') != -1) {

    /* Get Player Window */
    var aaPlayerWindow = getMyElement('', 'div', 'class', 'article--video', 0, false);
    if (!aaPlayerWindow) {
      showMyMessage('!player');
    }
    else {
      /* My Player Window */
      var myPlayerWindow = createMyElement('div', '', '', '', '');
      styleMyElement(myPlayerWindow, {position: 'relative', width: '954px', height: '560px', backgroundColor: '#F4F4F4', zIndex: '2'});
      modifyMyElement(aaPlayerWindow, 'div', '', true);
      appendMyElement(aaPlayerWindow, myPlayerWindow);

      /* Get Video Thumb */
      var aaVideoThumb = getMyContent(page.url, 'meta\\s+itemprop="thumbnailUrl"\\s+content="(.*?)"', false);
      if (aaVideoThumb) aaVideoThumb = page.win.location.protocol + '//' + page.win.location.hostname + aaVideoThumb;

      /* Get Videos Content */
      var aaVideoList = {};
      var aaVideoFound, aaDefaultVideo;
      var aaVideo = getMyContent(page.url, 'meta\\s+itemprop="contentUrl"\\s+content="(.*?)"', true);
      if (aaVideo) {
	aaVideoFound = true;
	aaVideoList['Low Definition MP4'] = page.win.location.protocol + '//' + page.win.location.hostname + aaVideo;
	aaDefaultVideo = 'Low Definition MP4';
      }

      if (aaVideoFound) {
	/* Create Player */
	player = {
	  'playerSocket': aaPlayerWindow,
	  'playerWindow': myPlayerWindow,
	  'videoList': aaVideoList,
	  'videoPlay': aaDefaultVideo,
	  'videoThumb': aaVideoThumb,
	  'playerWidth': 954,
	  'playerHeight': 560
	};
	feature['definition'] = false;
	feature['container'] = false;
	option['definition'] = 'LD';
	option['definitions'] = ['Low Definition'];
	option['containers'] = ['MP4'];
	createMyPlayer();
	/* Fix panel */
	styleMyElement(player['playerContent'], {marginTop: '12px'});
      }
      else {
	showMyMessage('!videos');
      }
    }

  }

  // =====IlFattoQuotidiano===== //

  else if (page.url.indexOf('ilfattoquotidiano.it/') != -1) {

    /* Get Player Window */
    var ifqPlayerWindow = getMyElement('', 'div', 'class', 'videoplayer', 0, false);
    if (!ifqPlayerWindow) {
      //showMyMessage ('!player');
    }
    else {
      /* My Player Window */
      var myPlayerWindow = createMyElement('div', '', '', '', '');
      styleMyElement(myPlayerWindow, {position: 'relative', width: '990px', height: '579px', backgroundColor: '#F4F4F4'});
      modifyMyElement(ifqPlayerWindow, 'div', '', false, true);
      appendMyElement(ifqPlayerWindow, myPlayerWindow);

      /* Get Video Thumb */
      var ifqVideoThumb = getMyContent(page.url, 'meta\\s+property="og:image"\\s+content="(.*?)"', false);

      /* Get Videos Content */
      var ifqVideosContent = getMyContent(page.url, '"sources":\\[(.*?)\\]', false);

      if (ifqVideosContent) {
	var ifqVideoList = {};
	var ifqVideoFound = false;
	var ifqVideoFormats = {'270p': 'Low Definition MP4', '406p': 'Standard Definition MP4'};
	var ifqVideo, ifqPattern
	for (var vCode in ifqVideoFormats) {
	  ifqPattern = 'mp4","file":"(.*?)","label":"' + vCode + '"';
	  ifqVideo = ifqVideosContent.match(ifqPattern);
	  ifqVideo = (ifqVideo) ? ifqVideo[1] : null;
	  if (ifqVideo) {
	    if (!ifqVideoFound) ifqVideoFound = true;
	    ifqVideoList[ifqVideoFormats[vCode]] = ifqVideo;
	  }
	}

	if (ifqVideoFound) {
	  /* Create Player */
	  var ifqDefaultVideo = 'Low Definition MP4';
	  player = {
	    'playerSocket': ifqPlayerWindow,
	    'playerWindow': myPlayerWindow,
	    'videoList': ifqVideoList,
	    'videoPlay': ifqDefaultVideo,
	    'videoThumb': ifqVideoThumb,
	    'playerWidth': 990,
	    'playerHeight': 579
	  };
	  feature['container'] = false;
	  feature['widesize'] = false;
	  option['definitions'] = ['Low Definition', 'Standard Definition'];
	  option['containers'] = ['MP4'];
	  createMyPlayer();
	  /* Fix panel */
	  styleMyElement(player['playerContent'], {marginTop: '5px'});
	}
	else {
	  showMyMessage('!videos');
	}
      }
      else {
	showMyMessage('!content');
      }
    }

  }

  // =====Mediaset===== //

  else if (page.url.indexOf('mediaset.it/') != -1) {

    /* Get Player Window */
    var msPlayerWindow = getMyElement('', 'div', 'class', 'video-player', 0, false);
    if (!msPlayerWindow) {
      showMyMessage ('!player');
    }
    else {
      /* My Player Window */
      var myPlayerWindow = createMyElement('div', '', '', '', '');
      styleMyElement(myPlayerWindow, {position: 'relative', width: '1000px', height: '584px', backgroundColor: '#F4F4F4'});
      styleMyElement(msPlayerWindow, {height: '590px'});
      modifyMyElement(msPlayerWindow, 'div', '', false, true);
      appendMyElement(msPlayerWindow, myPlayerWindow);

      /* Get Video Thumb */
      var msVideoThumb = getMyContent(page.url, '"thumbnail":\\s*"(.*?)"', false);

      /* Get Videos Content */
      var msVideoID, msVideoPID, msVideo;
      msVideoID = getMyContent(page.url, 'data-codf="(.*?)"', false);
      if (msVideoID) msVideoPID = getMyContent('https://feed.entertainment.tv.theplatform.eu/f/PR1GhC/mediaset-prod-ext-programs/guid/-/' + msVideoID, '"pid":"(.*?)"', false);
      if (msVideoPID) msVideo = 'https://link.theplatform.eu/s/PR1GhC/media/' + msVideoPID + '?formats=mpeg4';

      if (msVideo) {
	/* Create Player */
	var msVideoList = {};
	var msDefaultVideo = 'Standard Definition MP4';
	msVideoList[msDefaultVideo] = msVideo;
	player = {
	  'playerSocket': msPlayerWindow,
	  'playerWindow': myPlayerWindow,
	  'videoList': msVideoList,
	  'videoPlay': msDefaultVideo,
	  'videoThumb': msVideoThumb,
	  'playerWidth': 1000,
	  'playerHeight': 584
	};
	feature['container'] = false;
	feature['definition'] = false;
	feature['widesize'] = false;
	option['definitions'] = ['Standard Definition'];
	option['containers'] = ['MP4'];
	createMyPlayer();
	/* Fix panel */
	styleMyElement(player['playerContent'], {marginTop: '5px'});
      }
      else {
	showMyMessage('!videos');
      }
    }

  }

}


// ==========Run========== //

ViewTube();

page.win.setInterval(function() {
  if (page.url != page.win.location.href) {
    if (player['playerWindow']) modifyMyElement(player['playerWindow'], 'div', '', true);
    page.doc = page.win.document;
    page.body = page.doc.body;
    page.url = page.win.location.href;
    blockInterval = 50;
    if (player['playerSocket']) blockObject = player['playerSocket'];
    blockVideos();
    ViewTube();
  }
  // Block videos
  if (blockObject && blockInterval > 0) {
    blockVideos();
    if (blockInterval > 0) blockInterval--;
  }
}, 500);

})();
