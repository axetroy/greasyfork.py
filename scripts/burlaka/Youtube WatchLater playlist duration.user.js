// ==UserScript==
// @name         Youtube WatchLater playlist duration
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  Get duration for YT WL playlist
// @author       Burlaka.net
// @match        *://youtube.com/*
// @match        *://*.youtube.com/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

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
})();
