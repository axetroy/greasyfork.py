﻿// ==UserScript==
// @name        ABPVN AdsBlock
// @namespace   ABPVN
// @author      Hoàng Rio
// @copyright   ABPVN
// @homepage    http://abpvn.com
// @supportURL  https://github.com/abpvn/abpvn/issues
// @icon        http://abpvn.com/icon.png
// @description Script chặn quảng cáo,loại bỏ chờ đợi của ABPVN
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=donghoang.nguyen@gmail.com&item_name=ABPVN Donation
// @run-at      document-end
// @include     http://*
// @include     https://*
// @version     2.1.15
// @noframes
// @change-log  update videojs fix talktv player
// @grant       none
// ==/UserScript==
/* String Prototype */
String.prototype.startWith = function strxStart(str) {
  return this.indexOf(str) === 0;
};
String.prototype.ismatch = function (regex) {
  return this.match(regex) !== null;
};
var getAllText = function (selector) {
  var text = '';
  var list = document.querySelectorAll(selector);
  if (list)
  for (var i = 0; i < list.length; i++) {
    text += list[i].innerText;
  }
  return text;
};
var removeDuplicates = function (arr) {
  var tmp = [
  ];
  for (var i = 0; i < arr.length; i++) {
    if (tmp.indexOf(arr[i]) == - 1) {
      tmp.push(arr[i]);
    }
  }
  return tmp;
};
//Bypass Class
var byPass = {
};
//Logger Class
var Logger={
  info: function(text){
     console.info("ABPVN Info: ",text);
  },
  warn: function(text){
     console.warn("ABPVN Warn: ",text);
  },
  error: function(text){
     console.error("ABPVN Error: ",text);
  },
  log: function(text){
     console.log("ABPVN Log: ",text);
  },
};
//get Link class
var getLink = {
  FShareConfig: function () {
    if (this.url.startWith('https://www.fshare.vn')) {
      var background_image = localStorage.off == 'true' ? 'url("http://i.imgur.com/kJnOMOB.png")' : 'url("http://i.imgur.com/2b7fN6a.png")';
      var title = localStorage.off == 'true' ? 'Bật get link fshare' : 'Tắt get link fshare';
      var html = '<div id=\'fs_click\' title=\'' + title + '\' style=\'position: fixed; right: 0; bottom: 0; width: 30px; height: 30px; border-radius: 50%; background-image: ' + background_image + '; background-size: cover; cursor: pointer; z-index: 9999;\'></div>';
      $(document).ready(function () {
        $(document.body).append(html);
        $(document).on('click', '#fs_click', function FS_on_off() {
          if (localStorage.off != 'true') {
            localStorage.off = true;
            this.style.backgroundImage = 'url("http://i.imgur.com/kJnOMOB.png")';
            this.setAttribute('title', 'Bật get link fshare');
            alert('Đã tắt get link fshare');
          }
          else {
            localStorage.off = false;
            this.setAttribute('title', 'Tắt get link fshare');
            this.style.backgroundImage = 'url("http://i.imgur.com/2b7fN6a.png")';
            alert('Đã bật get link fshare');
          }
        });
      });
    }
  },
  FShareGetLink: function () {
    if (this.url.startWith('https://www.fshare.vn/file/')) {
      if (localStorage.off != 'true') {
        console.info('Start get link Fshare.vn');
        $(document).ready(function () {
          var checkpassword = document.querySelector('.fa-lock');
          var linkcode = $('[data-linkcode]').attr('data-linkcode');
          if (checkpassword === null) {
            var code = $('input[name=fs_csrf]').val();
            var speed = $(this).data('speed');
            var data = {
              'fs_csrf': code,
              'DownloadForm[pwd]': '',
              'DownloadForm[linkcode]': linkcode,
              'ajax': 'download-form',
              'undefined': 'undefined'
            };
            $.post('/download/get', data).done(function (data, statusText, xhr) {
              if (data.url === undefined) location.reload();
               else {
                if (typeof location != 'undefined') {
                  console.log('ABPVN: ' + location.href + ' -> ' + data.url);
                  location.href = data.url;
                }
                else {
                  $('.policy_download').prepend('<div class="col-xs-12"><a title="Download nhanh qua linksvip.net" style="margin-top: 10px; height: 70px;" class="btn btn-success btn-lg btn-block btn-download-sms" href="' + data.url + '">        <i class="fa fa-cloud-download fa-2x pull-left"></i>        <span class="pull-right text-right download-txt">            Tải trực tiếp<br>            <small>Hỗ trợ bởi abpvn.com</small>        </span></a></div>'
                  );
                }
              }
            }).fail(function (xhr, statusText, error) {
              $.alert({
                success: false,
                message: 'ABPVN: Đã có lỗi fshare hoặc file có password'
              });
            });
          }
          else {
            $.alert({
              success: false,
              message: 'ABPVN: Hãy nhập mật khẩu cho file trước'
            });
            $('#download-form').unbind('submit');
            $('#download-form').submit(function (event) {
              var pwd = $('#DownloadForm_pwd').val();
              var code = $('input[name=fs_csrf]').val();
              var speed = $(this).data('speed');
              var data = {
                'fs_csrf': code,
                'DownloadForm[pwd]': pwd,
                'DownloadForm[linkcode]': linkcode,
                'ajax': 'download-form',
                'undefined': 'undefined'
              };
              $.post('/download/get', data).done(function (data, statusText, xhr) {
                if (data.url === undefined) location.reload();
                 else {
                  if (typeof location != 'undefined') {
                    console.log('ABPVN: ' + location.href + ' -> ' + data.url);
                    location.href = data.url;
                  }
                  else {
                    $('.policy_download').prepend('<div class="col-xs-12"><a title="Download nhanh qua linksvip.net" style="margin-top: 10px; height: 70px;" class="btn btn-success btn-lg btn-block btn-download-sms" href="' + data.url + '">        <i class="fa fa-cloud-download fa-2x pull-left"></i>        <span class="pull-right text-right download-txt">            Tải trực tiếp<br>            <small>Hỗ trợ bởi abpvn.com</small>        </span></a></div>'
                    );
                  }
                }
              }).fail(function (xhr, statusText, error) {
                $.alert({
                  success: false,
                  message: 'ABPVN: Đã có lỗi fshare hoặc file có password'
                });
              });
              event.preventDefault();
            });
          }
        });
      }
      else {
        $('.policy_download').prepend('<div class="col-xs-12"><a title="Download nhanh qua linksvip.net" style="margin-top: 10px; height: 70px;" class="btn btn-success btn-lg btn-block btn-download-sms" href="http://linksvip.net?link=' + location.href + '">        <i class="fa fa-cloud-download fa-2x pull-left"></i>        <span class="pull-right text-right download-txt">            Tải nhanh<br>            <small>Qua dịch vụ linksvip.net</small>        </span></a></div>'
        );
      }
    }
  },
  mediafire_com: function () {
    if (this.url.startWith('http://www.mediafire.com/file/')) {
      var a_tag = document.querySelector('.download_link a');
      var link = a_tag.getAttribute('href');
      if (link.startWith('http')) {
        document.body.innerHTML = '<center><h1>ABPVN MediaFire Download đã hoạt động</h1><a href=\'http://abpvn.com/napthe\'><h1>Ủng hộ ABPVN</h1></a><br/>Không tự tải xuống? <a href=\'' + link + '\' title=\'Download\'>Click vào đây</a></center>';
        location.href = link;
      }
    }
  },
  usercloud_com: function () {
    if (this.url.startWith('https://userscloud.com/') && this.url.length > 24) {
      var form = document.querySelector('form[name="F1"]');
      if (form) {
        form.submit();
        document.body.innerHTML = '<center><h1>ABPVN UserCloud Download đã hoạt động</h1><a href=\'http://abpvn.com/napthe\'><h1>Ủng hộ ABPVN</h1></center>';
      } else {
        var a_link = document.querySelector('h4 a.btn-success');
        if (a_link) {
          var link = a_link.getAttribute('href')
          if (link.startWith('https')) {
            location.href = link;
            document.body.innerHTML = '<center><h1>ABPVN UserCloud Download đã hoạt động</h1><a href=\'http://abpvn.com/napthe\'><h1>Ủng hộ ABPVN</h1></a><br/>Không tự tải xuống? <a href=\'' + link + '\' title=\'Download\'>Click vào đây</a></center>';
          }
        }
      }
    }
  },
  init: function () {
    this.url = location.href;
    this.FShareConfig();
    this.FShareGetLink();
    this.mediafire_com();
    this.usercloud_com();
  }
};
//Fix site class
var fixSite = {
  elementExist: function (selector) {
    var check = document.querySelector(selector);
    return check != null;
  },
  getAllText: function(selector){
    var text='';
    var nodeList=document.querySelectorAll(selector);
    if(nodeList){
      for(var i in nodeList){
        if(nodeList[i].innerText) text+=nodeList[i].innerText;
      }
    }
    return text;
  },
  getScript: function (url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', function (data) {
      var blob = new Blob([xhr.responseText], {
        type: 'text/javascript'
      });
      var url = URL.createObjectURL(blob);
      var script = document.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      document.getElementsByTagName('head') [0].appendChild(script);
    });
    xhr.send();
  },
  loadCss: function(url,id){
     var css_tag = document.createElement('link');
    css_tag.rel = 'stylesheet';
    css_tag.id=id;
    css_tag.href = url;
    var head = document.getElementsByTagName('head') [0];
    head.appendChild(css_tag);
  },
  talktv_vn: function () {
    if (this.url.startWith('http://talktv.vn/') && this.url.length > 17) {
      //disabled jwplayer
      //jwplayer = {
      // };
      $(document).ready(function () {
        if (loadPlayer.manifestUrl.indexOf('.m3u8') != - 1) {
          //Ininit Libs Tag
          var css_tag = document.createElement('link');
          css_tag.rel = 'stylesheet';
          css_tag.href = 'https://cdnjs.cloudflare.com/ajax/libs/video.js/6.0.1/video-js.min.css';
          var script_vjs_tag = document.createElement('script');
          script_vjs_tag.src = 'https://cdnjs.cloudflare.com/ajax/libs/video.js/6.0.1/video.min.js';
          var script_js_hls = document.createElement('script');
          script_js_hls.src = 'https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-hls/5.5.0/videojs-contrib-hls.js';
          //script_js_hls.src = 'https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-hls/3.7.0-beta4/videojs-contrib-hls.js';
          var head = document.getElementsByTagName('head') [0];
          head.appendChild(css_tag);
          head.appendChild(script_vjs_tag);
          head.appendChild(script_js_hls);
          //Innit video Tag to play
          document.querySelector('.channel-play').innerHTML = '<video controls id="abpvn_talktv_vjs" autoplay="autoplay" style="width: 100%; height: 100%" class="video-js vjs-default-skin" poster="' + loadPlayer.backgroundImage + '"><source src="http://crossorigin.me/' + loadPlayer.manifestUrl + '" type="application/x-mpegURL"></video>';
          var timer;
          timer = setInterval(function () {
            if (typeof videojs != 'undefined' && typeof videojs.Hls != 'undefined') {
              var tmp_video = videojs('abpvn_talktv_vjs');
              tmp_video.play();
              clearInterval(timer);
            }
          }, 300);
        }
      });
    }
  },
  tv_zing_vn: function () {
    if (this.url.startWith('http://tv.zing.vn/video/') && !this.elementExist('#_infoUserCp') && !MP3.ZINGTV_VIP) {
      window.addEventListener('DOMContentLoaded', function () {
        var script = document.createElement('script');
        script.src = 'https://content.jwplatform.com/libraries/QHJ5Iarr.js';
        script.type = 'text/javascript';
        document.getElementsByTagName('head') [0].appendChild(script);
        //get video list
        var text = getAllText('script');
        var quality = [
          '360',
          '480',
          '720',
          '1080'
        ];
        var listVideo = text.match(/http:\/\/stream\d+\.tv.+?\.mp4/g);
        listVideo = removeDuplicates(listVideo);
        var sources = [
        ];
        for (var i = 0; i < listVideo.length; i++) {
          sources.push({
            'file': listVideo[i],
            'label': quality[i]
          })
        };
        //get Image poster
        var imagePoster = text.match(/http:\/\/image.+?\.jpg/);
        //Setup Player
        var playerId = 'abpvn_player';
        document.getElementById('player').innerHTML = '<div id="' + playerId + '"></div>';
        var clock = setInterval(function () {
          if (typeof jwplayer != 'undefined') {
            jwplayer(playerId).setup({
              sources: sources,
              autostart: true,
              image: imagePoster[0],
              width: '100%',
              height: 520
            })
            clearInterval(clock);
          }
        }, 300);
      });
    }
  },
  hamtruyen_vn: function () {
    if (this.url.startWith('http://hamtruyen.vn/')) {
      document.addEventListener('DOMContentLoaded', function () {
        ABPVN.Logger.log('Run block popup');
        var container = document.getElementById('container');
        if (container) {
          var btpop = function () {
            ABPVN.Logger.info('Overided Popup Function');
          };
          $('#container').click(function () {
          });
          container.onclick = null;
        }
      });
    }
  },
  _2idol_tv: function(){
     if((this.url.startWith('http://2idol.tv/post/')||this.url.startWith('http://video.2idol.tv/post-video/'))&&navigator.userAgent.match(/Firefox/i)!=null){
       Logger.info('Fix 2idol.tv player on Firefox');
       ABPVN.cTitle();
       document.querySelector('#vod').setAttribute('id','abpvn_fixed');
       window.addEventListener('DOMContentLoaded',function(){
           var scriptText=this.getAllText('script');
           var file=scriptText.match(/https:\/\/www\.youtube\.com\/watch\?v=[\w-]+/i)[0];
           var style_url=URL.createObjectURL(new Blob(['.jwlogo {width: 50px; height: 50px; opacity: 0.7 !important;a}'],{type: 'text/css'}));
           this.loadCss(style_url,'fix_logo');
           if(file){
             jwplayer('abpvn_fixed').setup({
               volume: "100",
               menu: "true",
               allowscriptaccess: "always",
               wmode: "opaque",
               file: file,
               //file: "SampleVideo_1280x720_1mb.mp4",
               image: "",
               width: "663",
               height: "366",
               autostart: "true",
               primary:"html5",
               skin: "http://"+location.hostname+"/public/player/jwplayer/bekle/bekle.xml",
               logo :{
                 file: "http://abpvn.com/icon.png",
                 link: "http://abpvn.com/",
                 width: 30,
                 height: 30,
                 position: "top-right"
               }
             });
           }
       }.bind(this));
     }
  },
  removeRedir(config){
    if(this.url.startWith(config.url)){
       ABPVN.cTitle();
      var links=document.querySelectorAll('a[href^="'+config.replace+'"]');
      Logger.info('Remove Redirect for '+links.length+ ' links');
      if(links.length){
         links.forEach(function(item){
           var stockUrl=item.getAttribute('href').replace(config.replace,'');
           var count=0;
           while(stockUrl.indexOf("%2")>-1&&count<5){
             stockUrl=decodeURIComponent(stockUrl);
             count++;
           }
           item.setAttribute('href',stockUrl);
         }.bind(this));
      }
    }
  },
  removeRedirect(){
    var configs=[
      {
        url: 'https://samsungvn.com',
        replace: 'https://samsungvn.com/xfa-interstitial/redirect?url=',
      },{
        url: 'http://forum.vietdesigner.net',
        replace: 'redirect/?url='
      },{
        url:'http://sinhvienit.net',
        replace: 'http://sinhvienit.net/goto/?'
      },{
        url: 'http://phanmemaz.com/',
        replace: 'http://phanmemaz.com/wp-content/plugins/tm-wordpress-redirection/l.php?'
      }
    ];
   configs.forEach(function(config){
     this.removeRedir(config);
   }.bind(this));
  },
  init: function () {
    this.url = location.href;
    this.talktv_vn();
    this.tv_zing_vn();
    this.hamtruyen_vn();
    this.removeRedirect();
    this._2idol_tv();
  }
};
//Main class
var ABPVN = {
  getCookie: function (cookie_name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + cookiename + '=');
    if (parts.length == 2) return parts.pop().split(';').shift();
  },
  cTitle: function () {
    document.title = document.title + ' - Fixed by ABPVN.COM';
  },
  blockPopUp: function () {
    var listSite = [
      'http://blogtruyen.com',
      'http://www.khosachnoi.net',
      'http://hamtruyen.vn/',
      'http://phim14.net/',
      'http://phim7.com/',
      'http://www.diendan.trentroiduoidat.com/',
      'http://www.trentroiduoidat.com/',
      'http://chophanthiet.us',
      'http://anime47.com/',
	    'http://animetvn.com',
      'http://font.vn'
    ];
    for (var i = 0; i < listSite.length; i++) {
      if (this.url.startWith(listSite[i])) {
        this.cTitle();
        console.info('ABPVN: Đã chặn popup quảng cáo');
        document.body.onclick = null;
        window.addEventListener('load', function () {
          setTimeout(function(){
                document.body.onclick = null;
          },100);

        });
      }
    }
  },
  init: function () {
    this.url = location.href;
    this.blockPopUp();
    //Init class getLink
    getLink.init();
    //Init class Fixsite
    fixSite.init();
    //console.info('ABVPN init finish for: '+this.url);
  }
};
//RUN INNIT
ABPVN.init();
