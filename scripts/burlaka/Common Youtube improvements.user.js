// ==UserScript==
// @name         Common Youtube improvements
// @namespace    http://tampermonkey.net/
// @version      0.9.1
// @description  All my Youtube scripts in one pack
// @author       Burlaka.net
// @match        *://*.youtube.com/*
// @match        *://youtube.com/*
// @require      https://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // cosmetic 
  $('#watch-appbar-playlist .control-bar').hide();
  $('#watch-appbar-playlist .playlist-header').hide();
  $('#player-playlist .playlist-videos-list li').css('padding', '6px 10px 4px 0');
  $('#player-playlist .playlist-videos-list li.currently-playing').css('height', 'auto');
  $('#player-playlist .playlist-videos-list').css('max-height', '-webkit-fill-available');
  $('.appbar-nav-menu').append('<li><a href="/playlist?list=WL" class="yt-uix-button spf-link yt-uix-sessionlink yt-uix-button-epic-nav-item yt-uix-button-size-default" aria-selected="false"><span class="yt-uix-button-content">Посмотреть позже</span></a></li>');
  /*
    Youtube comments autoexpand
    https://greasyfork.org/en/scripts/374474-youtube-comments-autoexpand
  */
  $(document).on('mouseover', '.comment-renderer-text-content', function(e) {
    var $this = $(this);
    $this.addClass('expanded');
    $this.next('.comment-text-toggle').find('.read-more').addClass('hid');
    $this.next('.comment-text-toggle').find('.show-less').removeClass('hid').css('display','inline');
  });
  $(document).on('mouseover', '#watch-description', function(e) {
    var $this = $(this);
    $this.parent().removeClass('yt-uix-expander-collapsed');
  });

  /*
    Youtube WatchLater playlist duration
    https://greasyfork.org/en/scripts/30405-youtube-watchlater-playlist-duration
  */
  $('.playlist-videos-list li').mouseover(function() {
    var $this = $(this);
    if (!$this.find('.video-uploader-byline span.time').length) {
      var video_id = $this.attr('data-video-id');
      var youtubeUrl = "https://www.googleapis.com/youtube/v3/videos?id=" + video_id + "&key=AIzaSyDYwPzLevXauI-kTSVXTLroLyHEONuF9Rw&part=contentDetails";

      $.ajax({
        async: false,
        type: 'GET',
        url: youtubeUrl,
        success: function(data) {
          var youtube_time = data.items[0].contentDetails.duration;

          var duration;

          youtube_time = youtube_time.replace('PT', '');

          var h_delim = youtube_time.split(/[H]/);
          if (h_delim.length==2) {
            youtube_time = h_delim[1];
            duration = h_delim[0];
          }

          var m_delim = youtube_time.split(/[M]/);
          if (m_delim.length==2) {
            youtube_time = m_delim[1];
            if (duration) {
              if(m_delim[0].length<2)
                m_delim[0] = '0'+m_delim[0];

              duration = duration + ':' + m_delim[0];
            }
            else
              duration = m_delim[0];
          }
          else {
            if (duration)
              duration = duration + ':00';
          }

          var s_delim = youtube_time.split(/[S]/);
          if (s_delim.length==2) {
            if(s_delim[0].length<2)
              s_delim[0] = '0'+s_delim[0];
            if (duration)
              duration = duration + ':' + s_delim[0];
            else
              duration = '0:'+s_delim[0];
          }
          else {
            if (duration)
              duration = duration + ':00';
          }

          $this.attr('title', $.trim($this.find('.yt-ui-ellipsis').text()) + "\n" + $.trim($this.find('.video-uploader-byline').text()) + "\n" + duration);
          $this.find('.video-uploader-byline').append('&nbsp;&nbsp;&nbsp;<span class="time">' + duration + '</span>');
        }
      });
    }
  });

  /*
    Youtube viewed opacity
    https://greasyfork.org/en/scripts/26602-youtube-viewed
  */
  $('.resume-playback-background').parent().css('opacity', '0.5');
  $('.ytd-thumbnail-overlay-resume-playback-renderer').parent().parent().parent().css('opacity', '0.5');

  /*
    Youtube hide elements over video
    https://greasyfork.org/en/scripts/35590-youtube-hide-elements-over-video
  */
  $('#yt-masthead-creation-menu').parent().prepend('<a onclick="$(\'.ytp-ce-element\').toggle();return false;" style="display:inline-block;padding:5px 12px;margin-left:3px;border:1px solid #ccc;text-decoration:none;">Hide</a>');
  if ($('#watch-appbar-playlist')) {
    $('#yt-masthead-creation-menu').parent().prepend('<a onclick="$(\'#watch-appbar-playlist .control-bar, #watch-appbar-playlist .playlist-header\').toggle();return false;" style="display:inline-block;padding:5px 12px;border:1px solid #ccc;text-decoration:none;">WL</a>');
  }
  /*
    Youtube videoactionmenu position
    https://greasyfork.org/en/scripts/38306-youtube-videoactionmenu-position
  */
  var offset = $('#watch-header').offset();
  if (offset!==undefined) {
    var top = offset.top;
    $('head').append('<style>#yt-uix-videoactionmenu-menu {top: '+ (top + 28) +'px !important;}</style>');//90
  }

  /*
    Youtube channel videos redirect
    https://greasyfork.org/en/scripts/39397-youtube-channel-videos-redirect
  */
  document.addEventListener('mouseover', getLink);

  function getLink(linkElement) {
    var url = linkElement.target.toString();

    if ((url.search("www.youtube.com") != -1) && (url.match(/\//g).length < 5)) {
      if ((url.match(/https:\/\/www.youtube.com\/channel\//i) && (/videos/.test(url) == false))) {
        changeLink(linkElement);
      } else if ((url.match(/https:\/\/www.youtube.com\/user\//i) && (/videos/.test(url) == false))) {
        changeLink(linkElement);
      }
    }
  }

  function changeLink(linkElement) {
   var newUrl = linkElement.target.toString().concat("/videos?disable_polymer=1");
   linkElement.target.href = newUrl;
  }
  /*
    Youtube player keyboard shortcuts
    https://greasyfork.org/en/scripts/39306-youtube-player-keyboard-shortcuts
  */
  var volume;
  $(document).ready(function() {
    $(window).keydown(function(e) {
      var player = $('.video-stream.html5-main-video')[0];
      var player_wrap = $('.html5-video-player');

      if (!player_wrap.is(":focus") && !$('input').is(":focus") && !$('.comment-simplebox-text').is(":focus")) {

        if (e.keyCode == 0 || e.keyCode == 32) { // Space = play/pause
          e.preventDefault();
          if (player.paused == false) {
            player.pause();
          } else {
            player.play();
          }
        }
      }

      if ( (e.ctrlKey || e.metaKey) && e.keyCode == 38 ) { // Ctrl + Up = Volume up
        volume = player.volume + 0.1;
        if (volume > 1) volume = 1;
        player.volume = volume;
      }

      if ( (e.ctrlKey || e.metaKey) && e.keyCode == 40 ) { // Ctrl + Down = Volume down
        volume = player.volume - 0.1;
        if (volume < 0) volume = 0;
        player.volume = volume;
      }
      if ( e.shiftKey && e.which === 9 ) { // Shift+Tab = focus on body
        e.preventDefault();
        $('video').blur();
//        $('#watch-header').focus();
      }
            else if ( e.which == 9 ) { // Tab = focus on video element
        e.preventDefault();
        $('video').focus();
      }
    });
  });

  /*
    Youtube WatchLater autoplay stop
    https://greasyfork.org/en/scripts/369290-youtube-watchlater-autoplay-stop
  */
  // script from "Nextvid Stopper for YouTube" chrome extension
  var newScript = document.createElement("script");
  newScript.type = "text/javascript";
  newScript.innerText = "var NextVidEnabled = true;ytspf.enabled = false;ytspf.config['navigate-limit'] = 0;_spf_state.config['navigate-limit'] = 0;var NextVidStopperGetNextValues = function () {var nextLink = document.getElementsByClassName('playlist-behavior-controls')[0].getElementsByTagName('a')[1].href;var nextLinkStart = nextLink.search('v=');return nextLink.substr(nextLinkStart + 2, 8);};for (var key in _yt_www) {var stringFunction = '' + _yt_www[key];if (stringFunction.search('window.spf.navigate') != -1) {_yt_www[key] = function (a, b) {if (a.search(NextVidStopperGetNextValues()) == -1 || NextVidEnabled == false) {window.location = a;}};}}";
  document.body.appendChild(newScript);


  /*
    Youtube popup video titles
    https://greasyfork.org/en/scripts/377082-youtube-popup-video-titles
  */
  function popup_video_title() {
    $('.ytp-ce-covering-overlay .ytp-ce-video-title').each(function() {
      $(this).parent().parent().attr('title', $(this).text())
    });
  }
  setTimeout(popup_video_title, 3000);
})();