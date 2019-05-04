// ==UserScript==
// @name        Nico2 Get Next Video
// @namespace   http://honjarake.hatenablog.jp/
// @description ニコニコ動画の動画説明文から動画リンクを取得して画面下部に表示する
// @include     http://www.nicovideo.jp/watch/*
// @version     0.0.5.a
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==
(function () {
  var THE_LAST;
  var S_TOP;
  var VIDEO_ID = 'sm|nm|so|ca|ax|yo|nl|ig|na|cw|z[a-e]|om|sk|yk';
  var urlRegExp = new RegExp('((?:' + VIDEO_ID + ')\\d+)');
  var N2GNV = function () {
    console.log('Nico2 Get Next Video : Start');
    S_TOP = getScrollPosition();
    if (window != parent) return;
    // videoinfo block
    var desc = document.getElementById('topVideoInfo');
    if (!desc) return;
    // view video link list
    try {
      // current video
      var current = location.href.match(urlRegExp) [0];
      console.log('current : ' + current);
      N2GNV_setList(desc, current);
    } catch (e) {
      console.log('N2GNV:' + e);
    }
    // add resize event(jquery)
    var timer = false;
    $(window).resize(function () {
      if (timer !== false) {
        clearTimeout(timer);
      }
      timer = setTimeout(function () {
        var list = document.getElementById('N2GNV_list');
        var wih = window.innerHeight - 50;
        list.style.top = wih + 'px';
        var samne = document.getElementById('N2NV_nico_thumb');
        samne.style.display = 'none';
      }, 200);
    });
    // move list position
    N2GNV_draggable();
    console.log('Nico2 Get Next Video : End');
  };
  function N2GNV_Update() {
    try {
      var desc = document.getElementById('topVideoInfo');
      var current = location.href.match(urlRegExp) [0];
      N2GNV_setList(desc, current);
    } catch (e) {
      console.log('N2GNV_Update:' + e);
    }
  }
  function N2GNV_draggable() {
    var e = document.getElementById('N2GNV_list');
    var flag;
    var clickOffsetTop;
    var clickOffsetLeft;
    e.onmousedown = function (evt) {
      flag = 'on';
      evt = (evt) || window.event;
      clickOffsetTop = evt.clientY - e.offsetTop;
      clickOffsetLeft = evt.clientX - e.offsetLeft;
      if (!document.all) {
        window.getSelection().removeAllRanges();
      }
    }
    document.onmouseup = function () {
      flag = 'off';
    }
    document.onmousemove = function (evt) {
      evt = (evt) || window.event;
      if (flag == 'on') {
        e.style.top = evt.clientY - clickOffsetTop + 'px';
        e.style.left = evt.clientX - clickOffsetLeft + 'px';
      }
    }
  }
  function N2GNV_setList(desc, current) {
    THE_LAST = current;
    $('span.videoDetailOpenButton').trigger('click');
    var list = document.getElementById('N2GNV_list');
    if (!list) {
      var wih = window.innerHeight - 50;
      list = document.createElement('div');
      list.id = 'N2GNV_list';
      list.style.zIndex = 100;
      list.style.position = 'fixed';
      list.style.top = wih + 'px';
      list.style.background = '#FFFFFF';
      list.style.border = '1px solid #000000';
      list.style.border = '1px';
      list.style.padding = '1px';
      list.style.margin = '1px';
      list.className = 'js-drag';
      document.body.appendChild(list);
    }
    // get anchor from the description
    var prev = '';
    var next = '';
    var prevs = [];
    var nexts = [];
    var html = '';
    var c_num = current.match(/\d+/);
    var anc = desc.getElementsByTagName('a');
    for (var i = 0; i < anc.length; i++) {
      var n_num;
      var p_num;
      var ref = anc[i].innerHTML.match(urlRegExp);
      console.log('ref=' + ref);
      if (ref) {
        var r = ref[0];
        var r_num = r.match(/\d+/);
        //console.log('current=' + c_num + ' : ref=' + r_num);
        //console.log(n_num + ' & ' + p_num);
        if (parseInt(c_num) < parseInt(r_num)) {
          //console.log(i + ' : < : ' + anc[i].innerHTML);
          next = r;
          nexts.push('<a href="http://www.nicovideo.jp/watch/' + next + '" style="color:red !important;">' + next + '</a>');
          n_num = next.match(/\d+/);
        } else if (parseInt(c_num) > parseInt(r_num)) {
          //console.log(i + ' : > :  ' + anc[i].innerHTML);
          prev = r;
          prevs.push('<a href="http://www.nicovideo.jp/watch/' + prev + '" style="color:blue !important">' + prev + '</a>');
          p_num = prev.match(/\d+/);
        }
      }
    }
    // set prev next list
    html = '<span id ="N2GNV_screen_draggable" style="cursor:move;"> [drag]</span>';
    if (prev != '') html += '<' + prevs.sort().join(' |\n') + '|';
    html += '<strong> <a href="Javascript:void(0);" id="N2GV_clink" style="color:black !important;"> ' + current + '</a> </strong>';
    if (next != '') html += '| ' + nexts.sort().join(' |\n') + '>';
    html += '<span id ="N2GNV_screen_toggle"><-></span>';
    list.innerHTML = html;
    // add click event
    var bclink = document.getElementById('N2GV_clink');
    bclink.title = '現在の動画/update';
    //bclink.addEventListener('click', N2GNV_Update, false);
    $('#N2GNV_list a').click(function () {
      N2GNV_Update();
      setTimeout(function () {
        N2GNV_Update();
        scrollToVideoPlayer();
        //console.log('after_update');
      }, 3000);
    });
    var toggle = document.getElementById('N2GNV_screen_toggle');
    toggle.title = '最小化';
    toggle.style.border = '1px solid #000000';
    toggle.addEventListener('click', function () {
      var tg = document.getElementById('N2GNV_screen_toggle');
      var list = document.getElementById('N2GNV_list');
      if (tg.innerText == '<<') {
        tg.innerText = '>>';
        tg.title = '最小化';
        list.style.left = '0px';
      } else {
        tg.innerText = '<<';
        tg.title = '通常表示';
        list.style.left = (list.clientWidth - tg.clientWidth - 25) * - 1 + 'px';
      }
      //console.log('list.cw=' + list.clientWidth + ' : tg.cw=' + tg.clientWidth);
    }, false);
    nico_thumbnail();
  }
  //thumbnail
  function nico_thumbnail() {
    var list = document.getElementById('N2GNV_list');
    var samne = document.getElementById('N2NV_nico_thumb');
    if (!samne) {
      samne = document.createElement('div');
      samne.id = 'N2NV_nico_thumb';
      samne.style.zIndex = 100;
      samne.style.position = 'fixed';
      samne.style.top = (window.innerHeight - 240) + 'px';
      samne.style.background = '#FFFFFF';
      samne.style.border = 'solid 1px #000000';
      samne.style.padding = '0px';
      samne.style.display = 'none';
      var iframe = document.createElement('iframe');
      iframe.id = 'N2NV_nico_thumb_in';
      iframe.src = '';
      iframe.style.width = '312px';
      iframe.style.height = '176px';
      iframe.style.border = 'solid 1px #CCC';
      iframe.setAttribute('rameborder', '0');
      iframe.setAttribute('scrolling', 'no');
      samne.appendChild(iframe);
      document.body.appendChild(samne);
    }
    $('#N2GNV_list a').hover(function () {
      S_TOP = getScrollPosition();
      var iframe = document.getElementById('N2NV_nico_thumb_in');
      var sm = this.innerHTML.replace(' ', '').replace('|', '').replace('&lt;', '').replace('&gt;', '');
      var flame = 'http://ext.nicovideo.jp/thumb/' + sm;
      //console.log('flame:' + flame);
      //履歴残す
      //iframe.src = flame;
      //履歴残さない
      if (iframe.contentDocument == null) {
        var iframed = (iframe.contentWindow || iframe.contentDocument);
        iframed.location.replace(flame);
      } else {
        //console.log('iframe:' + iframe);
        iframe.contentDocument.location.replace(flame);
      }
      var list = document.getElementById('N2GNV_list');
      var samne = document.getElementById('N2NV_nico_thumb');
      samne.style.display = 'block'; //Order is important
      var rect = list.getBoundingClientRect();
      var sum = (rect.top - (samne.clientHeight + (rect.bottom - rect.top) / 2));
      if (sum > 0) {
        samne.style.top = sum + 'px';
      } else {
        samne.style.top = rect.bottom + 'px';
      }
      samne.style.left = rect.left + 'px';
    }, function () {
      samne.style.display = 'none';
    });
  }
  // scroll
  function getScrollPosition() {
    var obj = new Object();
    obj.x = document.documentElement.scrollLeft || document.body.scrollLeft;
    obj.y = document.documentElement.scrollTop || document.body.scrollTop;
    return obj;
  }
  function scrollToVideoPlayer() {
    try {
      var offset = $('#playerContainerWrapper').offset();
      console.log('get offset');
      window.scrollTo(offset.left, offset.top);
    } catch (ex) {
      console.log('any offset');
      window.scrollTo(S_TOP.x, S_TOP.y);
    }
  }
  //trigger
  window.addEventListener('load', N2GNV, false);
}) ();
