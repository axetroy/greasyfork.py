// ==UserScript==
// @name         ZenzaNicoru
// @namespace    https://gitlab.com/u/umany
// @version      0.5.9
// @description  ZenzaWatchを擬似ニコるに対応させるやつ
// @author       umany
// @match          *://www.nicovideo.jp/*
// @match          *://ext.nicovideo.jp/
// @match          *://ext.nicovideo.jp/#*
// @match          *://blog.nicovideo.jp/*
// @match          *://ch.nicovideo.jp/*
// @match          *://com.nicovideo.jp/*
// @match          *://commons.nicovideo.jp/*
// @match          *://dic.nicovideo.jp/*
// @match          *://ex.nicovideo.jp/*
// @match          *://info.nicovideo.jp/*
// @match          *://search.nicovideo.jp/*
// @match          *://uad.nicovideo.jp/*
// @match          *://api.search.nicovideo.jp/*
// @match          *://*.nicovideo.jp/smile*
// @match          *://site.nicovideo.jp/*
// @exclude        *://ads.nicovideo.jp/*
// @exclude        *://www.upload.nicovideo.jp/*
// @exclude        *://www.nicovideo.jp/watch/*?edit=*
// @exclude        *://ch.nicovideo.jp/tool/*
// @exclude        *://flapi.nicovideo.jp/*
// @exclude        *://dic.nicovideo.jp/p/*
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      j9oi.xyz
// ==/UserScript==

(function () {
  'use strict';

  const load = function () {
    const ZenzaWatch = unsafeWindow.ZenzaWatch;
    const $ = ZenzaWatch.lib.$;

    const gnApiUrl = 'https://j9oi.xyz/api/v1';

    // ニコるくんの画像
    const nicorukun = 'data:image/png;base64,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';

    let nicoru = {};
    let nicotta = {};
    let watchingId = '';

    // 擬似ニコる受信
    const getNicoru = function (watchId) {
      nicoru = {};
      nicotta = {};
      GM_xmlhttpRequest({
        method: 'GET',
        url: `${gnApiUrl}/getGN.php?a=${watchId}`,
        responseType: 'json',
        onload: (response) => {
          console.log('擬似ニコる受信: %d%O', response.status, response.response);
          nicoru = response.response;
          setNicorareSum();
        }
      });
    };

    // 擬似ニコる送信
    const postNicoru = function (watchId, commentNo) {
      GM_xmlhttpRequest({
        method: 'POST',
        url: `${gnApiUrl}/postGN.php`,
        responseType: 'json',
        data: `m=${watchId}&c=${commentNo}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: (response) => {
          console.log('擬似ニコる送信: %d%O (動画ID: %s, コメント番号: %s)', response.status, response.response, watchId, commentNo);
        }
      });
    };

    // 動画の合計ニコられ数表示
    const setNicorareSum = function () {
      let nicorareSum = 0;
      $.each(nicoru, function (index, value) {
        nicorareSum += value;
      });
      const nicorareSumStr = nicorareSum.toLocaleString ? nicorareSum.toLocaleString() : nicorareSum;

      $('div.VideoMetaInfo.root > span.countOuter').each(function (index) {
        const countOuter = $(this);
        if (countOuter.find('.nicorareCount').length) {
          countOuter.find('.nicorareCount').text(nicorareSumStr);
        } else {
          const column = document.createElement('span');
          $(column).addClass('column');
          const img = document.createElement('img');
          img.src = nicorukun;
          $(img).css({
            width: '18px',
            height: '18px',
            marginTop: '-1px'
          });
          const nicorareCount = document.createElement('span');
          $(nicorareCount).addClass('count nicorareCount').text(nicorareSumStr);
          $(column).append(img, ': ', nicorareCount);
          countOuter.append(column);
        }
      });
    };

    // コメ欄にニコるを設定する
    const setNicoruToCommentList = function (nodeList) {
      $.each(nodeList, function () {
        const commentNo = $(this).data('no');

        /*
         * 通常コメントとコミュニティコメントはクラス'fork0'を持つ
         * 投稿者コメントは'fork1'を持つ
         * 通常コメントとコミュニティコメントも判別したいが厳しいところ
         * 自分のコメントはリロードするまでdata-noが0になるので無視
         */
        if ($(this).hasClass('fork0') && commentNo) {
          setCommentListItemStyle($(this));

          $(this).find('.text').dblclick({
            commentNo: commentNo
          }, executeNicoruHandler);
          $(this).find('.nicoruImage').click({
            commentNo: commentNo
          }, executeNicoruHandler);
        }
      });
    };

    //コメ欄のスタイルを設定
    const setCommentListItemStyle = function (commentListItem) {
      const commentNo = commentListItem.data('no');
      const nicorare = nicoru[commentNo] || 0;

      const text = commentListItem.find('.text');
      const textStyle = {};
      if (nicorare > 0) {
        textStyle.fontWeight = 'bold';
        if (nicorare >= 3 && nicorare < 10) {
          textStyle.color = 'orange';
        } else if (nicorare >= 10) {
          textStyle.color = 'red';
        }
        text.css(textStyle);
      }

      const info = commentListItem.find('.info');
      const nicoruInfoStyle = {
        display: 'inline-block',
        width: '48px'
      };

      const nicoruImageStyle = {
        width: '16px',
        height: '16px',
        float: 'left',
        margin: '2px 5px 2px 0px',
      };

      if (nicotta[commentNo]) {
        nicoruImageStyle.transform = 'rotate(-90deg)';
        nicoruImageStyle.filter = 'grayscale(1)';
      }

      if (info.find('.nicoru').length) {
        nicoruImageStyle.transition = '.5s';
        info.find('.nicoruImage').css(nicoruImageStyle);
        info.find('.nicoruValue').text(nicorare);
      } else {
        const nicoruInfo = document.createElement('span');
        const nicoruImage = document.createElement('img');
        const nicoruValue = document.createElement('span');
        nicoruImage.src = nicorukun;
        nicoruValue.innerText = nicorare;
        $(nicoruImage).addClass('nicoruImage').css(nicoruImageStyle);
        $(nicoruValue).addClass('nicoruValue');
        $(nicoruInfo).addClass('nicoru').css(nicoruInfoStyle).append(nicoruImage, nicoruValue);

        info.prepend(nicoruInfo);
      }
    };

    // ニコる実行ハンドラ
    const executeNicoruHandler = function (e) {
      const commentNo = e.data.commentNo;

      if (!nicotta[commentNo]) {
        postNicoru(watchingId, commentNo);
        nicoru[commentNo] ? nicoru[commentNo]++ : nicoru[commentNo] = 1;
        nicotta[commentNo] = true;

        setCommentListItemStyle($(e.target).parents('.commentListItem'));
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // コメントリスト監視
    const observeCommentList = function (commentList) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length > 0) {
            setNicoruToCommentList(mutation.addedNodes);
          }
        });
      });
      const config = {
        childList: true
      };
      observer.observe(commentList.context, config);
    };

    // 動画情報読み込み監視
    const loadVideoInfoHandler = function (data, watchApi, watchId) {
      // console.log('動画情報読み込み (%s : %o)', watchId, data);

      /*
       * so接頭辞の動画ページアクセス時、'watch/soXXXXX'→'watch/[thread_id]'にリダイレクトされる為、
       * watchIdが'soXXXXX'であれば、擬似ニコるAPIに送信する動画IDをthread_idとする
       * (全てのso動画がリダイレクト対象なのか不明瞭なので、また実装変わるかも)
       */
      watchingId = watchId;
      if (watchingId.startsWith('so')) {
        watchingId = data.msgInfo.threadId;
      }
      getNicoru(watchingId);
    };

    ZenzaWatch.emitter.on('loadVideoInfo', loadVideoInfoHandler);
    Object.defineProperty(ZenzaWatch.debug, '$commentList', {
      get: function () {
        return this._$commentList;
      },
      set: function (commentList) {
        this._$commentList = commentList;
        observeCommentList(commentList);
      }
    });
  };

  // ZenzaWatch待機
  const waitForZenzaWatch = function () {
    if (unsafeWindow.ZenzaWatch && unsafeWindow.ZenzaWatch.ready) {
      console.log('ZenzaWatch is Ready');
      load();
    } else {
      document.body.addEventListener('ZenzaWatchInitialize', () => {
        console.log('onZenzaWatchInitialize');
        load();
      });
    }
  };

  waitForZenzaWatch();
})();