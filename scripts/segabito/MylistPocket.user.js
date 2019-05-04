// ==UserScript==
// @name        MylistPocket
// @namespace   https://github.com/segabito/
// @description 動画をあとで見る ＋ 簡易NG機能。 ZenzaWatchとの連携も可能。
// @match       *://www.nicovideo.jp/*
// @match       *://ext.nicovideo.jp/
// @match       *://ext.nicovideo.jp/#*
// @match       *://ch.nicovideo.jp/*
// @match       *://com.nicovideo.jp/*
// @match       *://commons.nicovideo.jp/*
// @match       *://dic.nicovideo.jp/*
// @match       *://ex.nicovideo.jp/*
// @match       *://info.nicovideo.jp/*
// @match       *://search.nicovideo.jp/*
// @match       *://uad.nicovideo.jp/*
// @match       *://site.nicovideo.jp/*
// @match       *://anime.nicovideo.jp/*
// @match       https://www.google.com/search?*
// @match       https://www.google.co.jp/search?*
// @match       https://friends.nico/*
// @match       https://*.bing.com/*
// @exclude     *://ads*.nicovideo.jp/*
// @exclude     *://www.upload.nicovideo.jp/*
// @exclude     *://www.nicovideo.jp/watch/*?edit=*
// @exclude     *://ch.nicovideo.jp/tool/*
// @exclude     *://flapi.nicovideo.jp/*
// @exclude     *://dic.nicovideo.jp/p/*
// @exclude     *://ext.nicovideo.jp/thumb/*
// @exclude     *://ext.nicovideo.jp/thumb_channel/*
// @version     0.3.28
// @grant       none
// @author      segabito macmoto
// @license     public domain
// @require     https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.5/lodash.min.js
// ==/UserScript==

// 保留
// https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.23/webcomponents.js

(function() {
  const PRODUCT = 'MylistPocket';

  const monkey = function(PRODUCT) {
    const console = window.console;
    //const $ = window.jQuery;
    console.log(`exec ${PRODUCT}..`);
    const TOKEN = 'r:' + (Math.random());

    const CONSTANT = {
      BASE_Z_INDEX: 100000
    };
    const MylistPocket = {debug: {}};
    window.MylistPocket = MylistPocket;

    const protocol = location.protocol;

    const __css__ = (`
      a[href*='watch/'] {
        display: inline-block;
      }
      a[href*='watch/'] > g-img {
        position: inherit;
      }

      .mylistPocketHoverMenu {
        display: none;
        opacity: 0.8;
        position: absolute;
        z-index: ${CONSTANT.BASE_Z_INDEX + 100000};
        font-size: 8pt;
        padding: 0;
        line-height: 26px;
        font-weight: bold;
        text-align: center;
        transition: box-shadow 0.2s ease, opacity 0.4s ease, padding 0.2s ease;
        user-select: none;
      }

      .mylistPocketHoverMenu.is-busy {
        opacity: 0 !important;
        pointer-events: none;
      }
        .mylistPocketHoverMenu.is-otherDomain .wwwOnly {
          display: none;
        }
        .mylistPocketHoverMenu.is-otherDomain:not(.is-zenzaReady) .wwwZenzaOnly {
          display: none;
        }
        .mylistPocketHoverMenu .zenzaMenu {
          display: none;
        }
        .mylistPocketHoverMenu.is-zenzaReady .zenzaMenu {
          display: inline-block;
        }


      .mylistPocketButton {
        /*font-family: Menlo;*/
        display: block;
        font-weight: bolder;
        cursor: pointer;
        width: 32px;
        height: 26px;
        cursor: pointer;
        box-shadow: 1px 1px 1px #000;
        transition:
          0.1s box-shadow ease,
          0.1s transform ease;
        font-size: 16px;
        line-height: 24px;
        -webkit-user-select: none;
        -moz-use-select: none;
        user-select: none;
        outline: none;
      }

      .mylistPocketButton:hover {
        transform: scale(1.2);
        box-shadow: 4px 4px 5px #000;
      }

      .mylistPocketButton:active {
        transform: scale(1.0);
        box-shadow: none;
        transition: none;
      }

      .is-deflistUpdating .mylistPocketButton.deflist-add::after,
      .is-deflistSuccess  .mylistPocketButton.deflist-add::after,
      .is-deflistFail     .mylistPocketButton.deflist-add::after,
      .mylistPocketButton:hover::after, #mylistPocket-poupup [tooltip] {
        content: attr(tooltip);
        position: absolute;
        /*top:  0px;
        left: 50%;*/
        top:  50%;
        right: -8px;
        padding: 2px 4px;
        white-space: nowrap;
        font-size: 12px;
        color: #fff;
        background: #333;
        transform: translate3d(-50%, -120%, 0);
        transform: translate3d(100%, -50%, 0);
        pointer-events: none;
      }

      .is-deflistUpdating .mylistPocketButton.deflist-add {
        cursor: wait;
        opacity: 0.9;
        transform: scale(1.0);
        box-shadow: none;
        transition: none;
        background: #888;
        border-style: inset;
      }
      .is-deflistSuccess .mylistPocketButton.deflist-add,
      .is-deflistFail    .mylistPocketButton.deflist-add {
        transform: scale(1.0);
        box-shadow: none;
        transition: none;
      }
      .is-deflistSuccess  .mylistPocketButton.deflist-add::after {
        content: attr(data-result);
        background: #393;
      }
      .is-deflistFail     .mylistPocketButton.deflist-add::after {
        content: attr(data-result);
        background: #933;
      }
      .is-deflistUpdating .mylistPocketButton.deflist-add::after {
        content: '更新中';
        background: #333;
      }

      .mylistPocketButton + .mylistPocketButton {
        margin-top: 4px;
      }

      .mylistPocketHoverMenu:hover {
        font-weibht: bolder;
        opacity: 1;
      }

      .mylistPocketHoverMenu:active {
      }

      .mylistPocketHoverMenu.is-show {
        display: block;
      }

      #mylistPocket-popup {
        display: none;
        perspective: 800px;
      }
      #mylistPocket-popup.is-firefox {
        /*perspective: none !important;*/
        position: fixed;
        z-index: 200000;
        transform: translate3d(-50%, -50%, 0);
        opacity: 0;
        transition: 0.3s opacity ease;
        top: -9999px; left: -9999px;
      }

      #mylistPocket-popup.show {
        display: block;
      }
      #mylistPocket-popup.is-firefox.show {
        top: 50%;
        left: 50%;
        opacity: 1;
      }


      #mylistPocket-popup .owner-icon {
        width: 64px;
        height: 64px;
        transform-origin: center;
        transform-origin: center;
        transition:
          0.2s transform ease,
          0.2s box-shadow ease
        ;
      }
      #mylistPocket-popup .owner-icon:hover {
      }

      #mylistPocket-popup .description a {
        color: #ffff00 !important;
        text-decoration: none !important;
        font-weight: normal !important;
        display: inline-block;
      }
      #mylistPocket-popup .description a.watch {
        position: relative;
        display: block;
        backface-visibility: hidden;
      }
      
      #mylistPocket-popup .description a[data-title]:hover::after {
        content: attr(data-title);
        position: absolute;
        top: -16px;
        left: 0;
        word-break: break-all;
        line-height: 12px;
        padding: 4px;
        font-size: 12px;
        color: #333;
        background: #ffc;
        opacity: 0.8;
        user-select: none;
        pointer-events: none;        
      }

      #mylistPocket-popup .description a:visited {
        color: #ffff99 !important;
      }
      #mylistPocket-popup .description button {
        /*font-family: Menlo;*/
        font-size: 16px;
        font-weight: bolder;
        margin: 4px 8px;
        padding: 4px 8px;
        cursor: pointer;
        border-radius: 0;
        background: #333;
        color: #ccc;
        border: solid 2px #ccc;
        outline: none;
      }
      #mylistPocket-popup .description button:hover {
        transform: translate(-2px,-2px);
        box-shadow: 2px 2px 2px #000;
        background: #666;
        transition:
          0.2s transform ease,
          0.2s box-shadow ease
          ;
      }
      #mylistPocket-popup .description button:active {
        transform: none;
        box-shadow: none;
        transition: none;
      }
      #mylistPocket-popup .description button:active::hover {
        opacity: 0;
      }

      #mylistPocket-popup .watch {
        display: block;
        position: relative;
        line-height: 60px;
        box-sizing: border-box;
        padding: 4px 16px;;
        min-height: 60px;
        width: 280px;
        margin: 8px 10px;
        background: #444;
        border-radius: 4px;
      }

      #mylistPocket-popup .watch:hover {
        background: #446;
      }

      #mylistPocket-popup .videoThumbnail {
        position: absolute;
        right: 16px;
        height: 60px;
        transform-origin: center;
        transition:
          0.2s transform ease,
          0.2s box-shadow ease
        ;
      }
      #mylistPocket-popup .videoThumbnail:hover {
        transform: scale(2);
        box-shadow: 0 0 8px #888;
        transition:
          0.2s transform ease 0.5s,
          0.2s box-shadow ease 0.5s
        ;
      }


    .zenzaPlayerContainer.is-error   #mylistPocket-popup,
    .zenzaPlayerContainer.is-loading #mylistPocket-popup,
    .zenzaPlayerContainer.error   #mylistPocket-popup,
    .zenzaPlayerContainer.loading #mylistPocket-popup {
      opacity: 0;
      pointer-events: none;
    }

    .mylistPocketHoverMenu.is-guest .is-need-login {
      display: none !important;
    }

      .xDomainLoaderFrame {
        position: fixed;
        left: -100%;
        top: -100%;
        width: 64px;
        height: 64px;
        opacity: 0;
        border: 0;
      }
    `).trim();

    const nicoadHideCss = `
      .nicoadVideoItem {
        display: none;
      }
    `.trim();

    const __tpl__ = (`
      <div class="mylistPocketHoverMenu scalingUI zen-family">
        <button class="mylistPocketButton command deflist-add wwwZenzaOnly is-need-login" data-command="deflist"
          tooltip="とりあえずマイリスト">&#x271A;</button>
        <button class="mylistPocketButton command info" data-command="info"
          tooltip="動画情報を表示">？</button>
        <button class="mylistPocketButton command playlist-queue zenzaMenu" data-command="playlist-queue"
          tooltip="ZenzaWatchのプレイリストに追加">▶</button>
      </div>
      </div>

      <div id="mylistPocket-popup" class="zen-family">
        <span slot="video-title">【実況】どんぐりころころの大冒険 Part1(最終回)</span>
        <a href="/watch/sm9" slot="watch-link"></a>
        <img slot="video-thumbnail" data-type="image">
        <a slot="owner-page-link" href="https://www.nicovideo.jp/user/1234" class="owner-page-link target-change" data-type="link" rel="noopener"><img slot="owner-icon" class="owner-icon" src="https://nicovideo.cdn.nimg.jp/web/img/user/thumb/blank_s.jpg" data-type="image"></img></a>

        <span slot="upload-date"     data-type="date">1970/01/01 00:00</span>
        <span slot="view-counter"    data-type="int">12,345</span>
        <span slot="mylist-counter"  data-type="int">6,789</span>
        <span slot="comment-counter" data-type="int">2,525</span>

        <span slot="duration" class="duration">1:23</span>

        <span slot="owner-id">1234</span>
        <span slot="locale-owner-name">ほげほげ</span>

        <div slot="error-description"></div>
        <div class="description" slot="description" data-type="html"></div>
        <span slot="last-res-body"></span>

      </div>

      <template id="mylistPocket-popup-template">
        <style>

          :host(#mylistPocket-popup) {
            position: fixed;
            z-index: 200000;
            transform: translate3d(-50%, -50%, 0);
            opacity: 0;
            transition: 0.3s opacity ease;
            top: -9999px; left: -9999px;
          }

          :host(#mylistPocket-popup.show) {
            top: 50%;
            left: 50%;
            opacity: 1;
            pointer-events: auto;
          }

          .root.is-otherDomain .wwwOnly {
            display: none;
          }
          .root.is-otherDomain:not(.is-zenzaReady) .wwwZenzaOnly {
            display: none;
          }

          * {
            box-sizing: border-box;
            font-kerning: none;
          }

          a {
            color: #ffff00;
            font-weight: bold;
            display: inline-block;
          }

          a:visited {
            color: #ffff99;
          }

          button {
            font-size: 14px;
            padding: 8px 8px;
            cursor: pointer;
            border-radius: 0;
            margin: 0;
            background: #333;
            color: #ccc;
            border: solid 2px #ccc;
            outline: none;
            line-height: 20px;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
          }
          button:hover {
            transform: translate(-4px,-4px);
            box-shadow: 4px 4px 4px #000;
            background: #666;
            transition:
              0.2s transform ease,
              0.2s box-shadow ease
              ;
          }

          button.is-updating {
            cursor: wait;
          }
          button.is-active,
          button:active {
            transform: none;
            box-shadow: none;
            transition: none;
          }
          button.is-active::after,
          button:active::after {
            opacity: 0;
          }


          [tooltip] {
            position: relative;
          }

          .is-deflistUpdating .deflist-add::after,
          .is-deflistSuccess  .deflist-add::after,
          .is-deflistFail     .deflist-add::after,
          [tooltip]:hover::after {
            content: attr(tooltip);
            position: absolute;
            top:  0px;
            left: 50%;
            padding: 2px 4px;
            white-space: nowrap;
            font-size: 14px;
            color: #fff;
            background: #333;
            transform: translate3d(-50%, -120%, 0);
            pointer-events: none;

          }


          .root {
            text-align: left;
            outline-offset: 8px;
            border: 12px solid rgba(32, 32, 32, 0);
            border-radius: 20px;
            padding: 8px 0;
            background: rgba(0, 0, 0, 0.7);
            color: #ccc;
            box-shadow: 0 0 16px #000;
            transition:
              0.6s -webkit-clip-path ease,
              0.6s clip-path ease,
              0.5s transform ease;
              /*0.4s border-radius ease-out 0.4s,
              0.4s height ease-out 0.4s*/
            ;
          }

          .root * {
          }

          .root.show {
            opacity: 1;
            pointer-events: auto !important;
          }

          .root.is-loading,
          .root.is-loading.is-ok,
          .root.is-loading.is-fail {
            text-align: center;
            position: relative;
            width: 190px;
            height: 190px;
            padding: 32px;
            opacity: 0.8;
            cursor: wait;
            border-radius: 100%;
            clip-path: circle(100px at center) !important;
            transition: none;
            outline: none;
            transform: none !important;
          }
          .root.is-firefox {
          }
          .root.is-loading > * {
            pointer-events: none;
          }

          .root.is-setting {
            transform: rotateX(180deg);
          }

          .root.is-setting > *:not(.setting-panel) {
            pointer-events: none;
            z-index: 1;
          }

          .root:not(.is-setting) > .setting-panel {
            pointer-events: none;
          }

          .root.is-setting > .setting-panel {
            display: block;
            opacity: 1;
            pointer-events: auto;
          }

          .root.is-loading         .loading-inner,
          .root.is-loading.is-ok   .loading-inner,
          .root.is-loading.is-fail .loading-inner {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
          }

          .loading-inner .spinner {
            font-size: 64px;
            display: inline-block;
            animation-name: spin;
            animation-iteration-count: infinite;
            animation-duration: 3s;
            animation-timing-function: linear;
          }

          @keyframes spin {
            0%   { transform: rotate(0deg); }
            100% { transform: rotate(1800deg); }
          }



          .root.is-ok {
            width: 800px;
            /*clip-path: circle(800px at center);*/
          }

          .root.is-ok.noclip {
            clip-path: none;
          }

          .root.is-fail {
            font-size: 120%;
            white-space: nowrap;
            text-align: center;
            padding: 16px;
          }

          .root.is-loading>*:not(.loading-now),
          .root.is-loading.is-ok>*:not(.loading-now),
          .root.is-loading.is-fail>*:not(.loading-now),
          .root.is-fail:not(.is-loading)>*:not(.error-info),
          .root.is-ok:not(.is-loading)>*:not(.video-detail):not(.setting-panel) {
            display: none !important;
          }

          .root.is-loading>.loading-now,
          .root.is-fail>.error-info,
          .root.is-ok>.video-detail {
            display: block;
          }

          .header {
            padding: 8px 8px 8px;
            font-size: 12px;
          }
            .upload-date {
              margin-right: 8px;
            }
            .counter span + span {
              margin-left: 8px;
            }
            .video-title {
              font-weight: bolder;
              font-size: 22px;
              margin-bottom: 4px;
            }

            .close-button {
              position: absolute;
              right: 0;
              top: 0;
              transition: 0.2s background ease, 0.2s border-color ease;
              cursor: pointer;
              width: 48px;
              height: 48px;
              font-size: 28px;
              line-height: 36px;
              text-align: center;
              user-select: none;
              border: 6px solid rgba(80, 80, 80, 0.5);
              border-color: transparent;
              border-radius: 0 16px 0 0;
            }
            .close-button:hover {
              background: #333;
              /*border-color: rgba(0, 0, 0, 0.9);*/
              /*transform: translate(-50%, -50%) scale(2.5);*/
            }
            .close-button:active {
              /*transform: translate(-50%, -50%) scale(2) rotate(360deg);*/
              box-shadow: none;
              transition: none;
            }

            .is-setting .close-button {
              display: none;
            }




          .main {
            display: flex;
            background: rgba(0, 0, 0, 0.2);
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.5) inset;
          }

          .main-left {
            width: 360px;
            padding: 8px;
            z-index: 100;
          }
            .video-thumbnail-container {
              position: relative;
              width: 360px;
              height: 270px;
              background: #000;
              /*box-shadow: 2px 2px 4px #000;*/
            }
            .video-thumbnail-container ::slotted(img) {
              width: 360px !important;
              height: 270px !important;
              object-fit: contain;
            }

            .video-thumbnail-container .duration {
              position: absolute;
              display: inline-block;
              right: 0;
              bottom: 0;
              font-size: 14px;
              background: #000;
              color: #fff;
              padding: 2px 4px;
            }
            .video-thumbnail-container:hover .duration {
              display: none;
            }


          .main-right {
            position: relative;
            padding: 0;
            flex-grow: 1;
            font-size: 14px;
          }

            ::slotted(.owner-page-link) {
              display: inline-block;
              vertical-align: middle;
            }

            .owner-page-link img {
              border: 1px solid #333;
              border-radius: 3px;
            }

            .video-info {
              /*background: rgba(0, 0, 0, 0.2);*/
              max-height: 282px;
              overflow-x: hidden;
              overflow-y: scroll;
              overscroll-behavior: contain;              
            }

            *::-webkit-scrollbar,
            .video-info::-webkit-scrollbar {
              background: rgba(34, 34, 34, 0.5);
            }

            *::-webkit-scrollbar-thumb,
            .video-info::-webkit-scrollbar-thumb {
              border-radius: 0;
              background: #666;
            }

            *::-webkit-scrollbar-button,
            .video-info::-webkit-scrollbar-button {
              background: #666;
              display: none;
            }

            *::scrollbar,
            .video-info::scrollbar {
              background: #222;
            }

            *::scrollbar-thumb,
            .video-info::scrollbar-thumb {
              border-radius: 0;
              background: #666;
            }

            *::scrollbar-button,
            .video-info::scrollbar-button {
              background: #666;
              display: none;
            }

            .scrollable {
              overscroll-behavior: contain;
            }

            .owner-info {
              margin: 16px;
              display: table;
            }

              .owner-info * {
                vertical-align: middle;
                word-break: break-all;
              }
              
              .owner-info>* {
                display: table-cell !important;
              }
              
              .owner-name {
                display: inline-block;
                padding: 8px;
                font-size: 18px;
              }
              .owner-info.is-favorited {
                font-weight: bolder;
                color: orange;
              }

              .owner-info.is-ng {
                color: #888;
                text-decoration: line-through;
              }

              .is-channel .owner-name::before {
                content: 'CH';
                margin: 0 4px;
                background: #999;
                color: #333;
                padding: 2px 4px;
                border: 1px solid;
              }

              .locale-owner-name::after {
                content: ' さん';
              }

              .owner-info .add-ng-button,
              .owner-info .add-fav-button {
                visibility: hidden;
                pointer-events: none;
              }
              .is-ng-enable .owner-info:hover .add-ng-button,
              .is-ng-enable .owner-info:hover .add-fav-button {
                visibility: visible;
                pointer-events: auto;
              }

            .description {
              word-break: break-all;
              line-height: 1.5;
              padding: 0 16px 8px;
            }

            .description:first-letter {
              font-size: 24px;
            }
            
            .last-res-body {
              margin: 16px 16px 0;
              border: 1px solid #ccc;
              padding: 4px;
              border-radius: 4px;
              word-break: break-all;
              font-size: 12px;
              min-height: 24px;
            }


          .footer {
            padding: 8px;
            backface-visibility: hidden;
          }

            .pocket-button {
              cusror: pointer;
            }

            .pocket-button:active {
            }


            .video-tags {
              display: block;
            }

              .tag-container {
                display: inline-block;
                position: relative;
                padding: 4px 8px;
                border: 1px solid #888;
                border-radius: 4px;
                margin: 0 20px 4px 0;
              }
              .tag-container .tag {
                display: inline-block;
                font-size: 14px;
                color: #ccc;
                text-decoration: none;
                cursor: pointer;
              }
              .tag-container .tag.channel-search {
                margin-left: 8px;
                color: #ccc !important;
                padding: 0 8px;
              }
              .tag-container:hover .tag {
                color: #fff !important;
              }
              .tag-container.is-favorited .tag {
                font-weight: bolder;
                color: orange !important;
              }
              .tag-container.is-ng .tag {
                text-decoration: line-through;
                color: #888 !important;
              }
              .zenzaPlayerContainer .tagItemMenu {
                margin: 0 8px;
              }


              .tag-container       .add-ng-button,
              .tag-container       .add-fav-button {
                position: absolute !important;
                visibility: hidden;
                pointer-events: none;
              }
              .is-ng-enable .tag-container:hover .add-ng-button,
              .is-ng-enable .tag-container:hover .add-fav-button {
                visibility: visible;
                pointer-events: auto;
                width: 24px;
                height: 24px;
                line-height: 24px;
                font-size: 24px;
                vertical-align: bottom;
                display: inline-block;
              }
              .is-ng-enable .tag-container:hover .add-ng-button {
                right: -16px;
              }
              .is-ng-enable .tag-container:hover .add-fav-button {
                left: -16px;
              }
            
            .footer-menu {
              position: absolute;
              right: 0px;
              bottom: 0px;
              transform: translate3d(0, 120%, 0);
              opacity: 1;
              transition:
                0.4s opacity ease 0.4s,
                0.4s transform ease 0.4s;
            }

            .is-setting .video-detail .footer-menu {
              transform: translate3d(0, 0, 0);
              opacity: 0;
            }

              .footer-menu button {
                min-width: 70px;
              }
              
              .regular-menu {
                display: inline-block;
                background: rgba(0, 0, 0, 0.7);
                position: relative;
                border-radius: 8px;
                padding: 12px 16px;
                box-shadow: 0 0 16px #000;
              }

              .is-deflistUpdating .deflist-add {
                cursor: wait;
                opacity: 0.9;
                transform: scale(1.0);
                box-shadow: none;
                transition: none;
              }
              .is-deflistSuccess .deflist-add,
              .is-deflistFail    .deflist-add {
                transform: scale(1.0);
                box-shadow: none;
                transition: none;
              }
              .is-deflistSuccess  .deflist-add::after {
                content: attr(data-result);
                background: #393;
              }
              .is-deflistFail     .deflist-add::after {
                content: attr(data-result);
                background: #933;
              }
              .is-deflistUpdating .deflist-add::after {
                content: '更新中';
                background: #333;
              }

              .zenza-menu {
                display: none;
              }

              .is-zenzaReady .zenza-menu {
                display: inline-block;
                background: rgba(0, 0, 0, 0.7);
                margin-left: 32px;
                position: relative;
                border-radius: 8px;
                padding: 12px 16px;
                box-shadow: 0 0 16px #000;
              }

              .is-zenzaReady .zenza-menu::after {
                content: 'ZenzaWatch';
                position: absolute;
                left: 50%;
                bottom: 10px;
                padding: 2px 8px;
                transform: translate(-50%, 100%);
                pointer-events: none;
                font-weith: bolder;
                background: rgba(0, 0, 0, 0.7);
                pointer-events: none;
                border-radius: 4px;
                white-space: nowrap;
              }

              .setting-menu {
                display: inline-block;
                background: rgba(0, 0, 0, 0.7);
                margin-left: 32px;
                position: relative;
                border-radius: 8px;
                padding: 12px 16px;
                box-shadow: 0 0 16px #000;
              }

          .toggle-setting-button {
            font-size: 32px;
            border-radius: 100%;
            border: 12px solid #333;
            cursor: pointer;
            background: rgba(32, 32, 32, 1);
            transition:
              0.2s transform ease
              ;
          }

          .toggle-setting-button:hover {
            transform: scale(1.2);
            box-shadow: none;
            background: rgba(32, 32, 32, 1);
            background: transparent;
          }

          .toggle-setting-button:active {
            transform: scale(1.0);
          }
          
          .mylist-comment-link {
            cursor: pointer;
          }

          .setting-panel {
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 8px 12px;
            z-index: 10000;
            background: rgba(50, 50, 64, 0.9);
            border-radius: 16px;
            color: #ccc;
            /*-webkit-user-select: none;
            user-select: none;*/
            transform: rotateX(180deg);
            transition: 0.25s opacity ease 0.25s;
          }
          .is-setting .setting-panel {
            transition: 0.25s opacity ease;
          }
            .setting-panel-main {
              width: 100%;
              height: 100%;
              overflow-y: scroll;
              overflow-x: hidden;
            }

            .root:not(.is-setting) .setting-panel .footer-menu {
              transform: translate3d(0, 0, 0);
              opacity: 0;
            }

            .root.is-setting       .setting-panel .footer-menu {
              right:  -12px;
              bottom: -12px;
              transform: translate3d(0, 120%, 0);
              opacity: 1;
              transition:
                opacity 0.4s ease 0.4s,
                transform 0.4s ease 0.4s;
            }


            .close-setting-menu {
              display: inline-block;
              background: rgba(0, 0, 0, 0.7);
              margin-left: 32px;
              position: relative;
              border-radius: 8px;
              padding: 12px 16px;
              box-shadow: 0 0 16px #000;
            }
            
            .setting-label {
              display: inline-block;
              line-height: 24px;
              padding: 8px;
            }

            .setting-label:hover {
              text-shadow: 0 0 4px #996;
            }

            .setting-label * {
              cursor: pointer;
            }

            .setting-label input[type=checkbox] {
              transform: scale(2);
              margin: 8px;
              vertical-align: middle;
            }

            .setting-label input + span {
              font-size: 16px;
            }

            .setting-label input:checked + span {
            }


            .setting-fav,
            .setting-ng-textarea,
            .setting-fav-textarea {
              display: none;
            }

            .is-ng-enable .setting-fav {
              display: block;
            }
            .is-ng-enable .setting-ng-textarea,
            .is-ng-enable .setting-fav-textarea {
              display: flex;
            }

              .setting-ng-text-column,
              .setting-fav-text-column {
                flex: 1;
                position: relative;
                padding: 8px;
              }

                .setting-ng-text-column textarea,
                .setting-fav-text-column textarea {
                  width: 100%;
                  height: 150px;
                  background: transparent;
                  color: #ccc;
                }

            .setting-ng-label {
              display: none;
            }

            .is-ng-enable .setting-ng-label {
              display: inline-block;
            }


          .add-ng-button,
          .add-fav-button {
            display: none;
          }

          .is-ng-enable .add-ng-button,
          .is-ng-enable .add-fav-button {
            display: inline-block;
            position: relative;
            width: 32px;
            height: 32px;
            line-height: 32px;
            font-size: 28px;
            padding: 0;
            margin: 0;
            /*border-radius: 100%;*/
            border: none;
            text-align: center;
            color: red;
            font-weight: bolder;
            cursor: pointer;
            background: transparent;
            box-shadow: none;
            transition:
              0.2s transform ease,
              0.2s text-shadow ease;
          }
          .is-ng-enable .add-fav-button {
            color: orange;
          }
          .is-ng-enable .add-ng-button:hover,
          .is-ng-enable .add-fav-button:hover {
            transform: scale(1.2);
            text-shadow: 2px 2px 4px black;
          }
          .is-ng-enable .add-ng-button:active,
          .is-ng-enable .add-fav-button:active {
            transform: scale(1.0);
            text-shadow: 0   0   2px black;
          }
          .is-ng-enable .add-ng-button:hover::after,
          .is-ng-enable .add-fav-button:hover::after {
            content: 'NG登録';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -80%);
            font-size: 12px;
            line-height: 12px;
            white-space: nowrap;
            background: rgba(192, 192, 192, 0.8);
            color: #000;
            opacity: 0.9;
            padding: 2px 4px;
            text-shadow: none;
            font-weight: normal;
            pointer-evnets: none !important;
          }
          .is-ng-enable .is-ng .add-ng-button:hover::after,
          .is-ng-enable .is-ng .add-fav-button:hover::after {
            content: 'NG解除';
          }
          .is-ng-enable .add-fav-button:hover::after {
            content: '強調登録';
          }
          .is-ng-enable .is-favorited .add-fav-button:hover::after {
            content: '強調解除';
          }
          .is-ng-enable .add-ng-button:active:hover::after,
          .is-ng-enable .add-fav-button:active:hover::after {
            display: none;
          }

       </style>
        <div class="popup root">
          <div class="loading-now">
            <div class="loading-inner">
              <span class="spinner">&#8987;</span>
            </div>
          </div>
          <div class="error-info">
            <slot name="error-description"></slot>
          </div>
          <div class="video-detail">
            <div class="header">
              <div class="video-title"><slot name="video-title"></slot></div>

              <span class="upload-date">投稿: <slot name="upload-date"/></span>
              <span class="counter">
                <span class="view-counter">再生: <slot name="view-counter"/></span>
                <span class="comment-counter">コメント: <slot name="comment-counter"/></span>
                <span class="mylist-counter command2" data-command="mylist-comment-open">マイリスト:
                  <span class="mylist-comment-link command" data-command="mylist-comment-open">&#x274F;</span>
                  <slot name="mylist-counter"/>
                </span>
              </span>
              <div class="close-button command" data-command="close" tooltip="閉じる">
                &#x2716;
              </div>
            </div>

            <div class="main">

              <div class=" main-left">
                <div class="video-thumbnail-container">
                  <slot name="video-thumbnail"></slot>
                  <span class="duration"><slot name="duration"></slot></slot>
                </div>
              </div>

              <div class="video-info main-right scrollable">

                <div class="owner-info">
                  <slot name="owner-page-link"></slot>
                  <span class="owner-name"><slot name="locale-owner-name"></slot>
                  <button class="add-fav-button command" data-command="toggle-fav-owner">★</button>
                  <button class="add-ng-button command" data-command="toggle-ng-owner">&#x2716;</button>
                  </span>
                </div>

                <div class="description">
                  <slot name="description"></slot>
                </div>

                <div class="last-res-body">
                  <slot name="last-res-body"></slot>
                </div>

                
              </div>

            </div>

            <div class="footer">
              <div class="video-tags">
                <slot name="tag"></slot>
              </div>
            </div>
            <div class="footer-menu scalingUI">
              <div class="regular-menu">
                <button
                  class="mylistPocketButton deflist-add pocket-button command command-watch-id wwwZenzaOnly"
                  data-command="deflist-add"
                  tooltip="とりあえずマイリスト"
                >とり</button>
                <button
                  class="pocket-button command command-watch-id"
                  data-command="mylist-window"
                  tooltip="マイリスト"
                >マイ</button>
                <button
                  class="pocket-button command command-watch-id"
                  data-command="open-mylist-open"
                  tooltip="公開マイリスト"
                >公開</button>
                 <button
                  class="pocket-button command command-video-id"
                  data-command="twitter-hash-open"
                  tooltip="Twitterの反応"
                >#Twitter</button>
              </div>


              <div class="zenza-menu">
                <button
                  class="pocket-button command command-watch-id"
                  data-command="zenza-open-now"
                  tooltip="ZenzaWatchで開く"
                >Zen</button>
                <button
                  class="pocket-button command command-watch-id"
                  data-command="playlist-inert"
                  tooltip="プレイリスト(次に再生)"
                >playlist</button>
                <button
                  class="pocket-button command command-watch-id"
                  data-command="playlist-queue"
                  tooltip="プレイリスト(末尾に追加)"
                >▶</button>
              </div>

              <div class="setting-menu">
                <button
                  class="pocket-button command"
                  data-command="toggle-setting"
                >設 定</button>
              </div>

            </div>
          </div>
          <div class="setting-panel">

            <div class="setting-panel-main scrollable">
              <h2>MylistPocket 設定</h2>
              <label class="setting-label">
                <input
                  type="checkbox"
                  class="setting-form"
                  data-config-name="openNewWindow"
                >
                <span>タグやリンクを新しいタブで開く (次回から反映)</span>
              </label>

              <label class="setting-label">
                <input
                  type="checkbox"
                  class="setting-form"
                  data-config-name="enableAutoComment"
                  data-config-namespace="mylist"
                >
                <span>マイリストコメントに投稿者名を入れる</span>
              </label>


              <h2>NG設定(リロード後に反映)</h2>
              <label class="setting-label">
                <input
                  type="checkbox"
                  class="setting-form"
                  data-config-name="enable"
                  data-config-namespace="ng"
                >
                <span>簡易NG＆強調機能を使う</span>
              </label>

              <label class="setting-label">
                <input
                  type="checkbox"
                  class="setting-form"
                  data-config-name="hide"
                  data-config-namespace="nicoad"
                >
                <span>検索結果のニコニ広告を消す</span>
              </label>

              <label class="setting-label wwwOnly wwwZenzaOnly setting-ng-label">
                <input
                  type="checkbox"
                  class="setting-form"
                  data-config-name="syncZenza"
                  data-config-namespace="ng"
                >
                <span>NGタグ・投稿者をZenzaWatchにも反映する</span>
              </label>

              <div class="setting-ng-textarea setting-ng">
                <div class="setting-ng-text-column">
                  投稿者ID
                  <textarea
                    class="setting-form"
                    data-config-name="owner"
                    data-config-namespace="ng"
                  ></textarea>
                </div>
                <div class="setting-ng-text-column">
                  タグ
                  <textarea
                    class="setting-form"
                    data-config-name="tag"
                    data-config-namespace="ng"
                  ></textarea>
                </div>
                <div class="setting-ng-text-column">
                  タイトル・説明文
                  <textarea
                    class="setting-form"
                    data-config-name="word"
                    data-config-namespace="ng"
                  ></textarea>
                </div>
               </div>
              <h2 class="setting-fav">強調表示設定</h2>
              <div class="setting-fav-textarea setting-fav">
                <div class="setting-fav-text-column">
                  投稿者ID
                  <textarea
                    class="setting-form"
                    data-config-name="owner"
                    data-config-namespace="fav"
                  ></textarea>
                </div>
                <div class="setting-fav-text-column">
                  タグ
                  <textarea
                    class="setting-form"
                    data-config-name="tag"
                    data-config-namespace="fav"
                  ></textarea>
                </div>
                <div class="setting-fav-text-column">
                  タイトル・説明文
                  <textarea
                    class="setting-form"
                    data-config-name="word"
                    data-config-namespace="fav"
                  ></textarea>
                </div>
               </div>

             </div>

            <div class="footer-menu">
              <div class="close-setting-menu">
                <button
                  class="pocket-button command"
                  data-command="toggle-setting"
                >戻 る</button>
              </div>
            </div>

          </div>
        </div>
      </template>
    `).trim();

    const __ng_css__ = `
      /* .item_cell 将棋盤ランキング  .item 従来のランキングと検索 */

      .item_cell.is-ng-wait .item,
      .item.is-ng-wait {
        outline: 1px dotted rgba(192, 192, 192, 0.8);
      }

      .item_cell.is-ng-queue .item,
      .item.is-ng-queue {
        outline: 2px dotted rgba(192, 192, 192, 0.8);
      }

      .item_cell.is-ng-current .item,
      .item.is-ng-current {
        outline: 3px dotted rgba(128, 225, 128, 0.8);
      }

      .item_cell.is-ng-resolved .item,
      .item.is-ng-resolved {
        outline: 0px solid green;
      }

      .item_cell.is-fav-favorited .item,
      .item.is-fav-favorited {
        outline: 3px dotted orange;
        outline-offset: 3px;
      }
      .item.videoRanking.is-fav-favorited {
        outline-offset: -3px;
      }

      .item_cell.is-ng-rejected {
        opacity: 0;
        pointer-events: none;
      }

      .item.is-ng-rejected {
        display: none;
        opacity: 0;
        pointer-events: none;
      }

      .NicorepoTimelineItem.is-ng-rejected {
        display: none;
        opacity: 0;
        pointer-events: none;
      }
      
      body.is-ng-disable .is-ng-rejected {
        outline: none;
        display: block !important;
        pointer-events: auto;
        opacity: 0.5;
      }

      /*.is-ng-failed:not(.COMMUNITY) {
        outline: black dotted 1px;
        opacity: 0.5;
      }*/

      /* チャンネル検索 */
        #search .item.is-ng-rejected {
          display: none;
        }

      /* 新検索β */
        #row-results .is-ng-wait {
          outline: 1px dotted rgba(192, 192, 192, 0.8);
        }

        #row-results .is-ng-queue {
          outline: 2px dotted rgba(192, 192, 192, 0.8);
        }

        #row-results .is-ng-rejected {
          display: none;
        }

        #row-results .is-fav-favorited {
          outline: 4px dotted pink;
        }

    `;

    // TODO: ライブラリ化
    const util = MylistPocket.util = (() => {
      const util = {};

      const addedStyle = {};
      util.addStyle = function(styles, id) {
        var elm = document.createElement('style');
        elm.type = 'text/css';
        if (id) { elm.id = id; }
        if (addedStyle[styles]) { return; }
        addedStyle[styles] = 1;

        var text = styles.toString();
        text = document.createTextNode(text);
        elm.appendChild(text);
        var head = document.getElementsByTagName('head');
        head = head[0];
        head.appendChild(elm);
        return elm;
      };

      util.mixin = function(self, o) {
        _.each(Object.keys(o), f => {
          if (!_.isFunction(o[f])) { return; }
          if (_.isFunction(self[f])) { return; }
          self[f] = o[f].bind(o);
        });
      };

      util.createWebWorker = function(func) {
        const src = func.toString().replace(/^function.*?\{/, '').replace(/}$/, '');
        const blob = new Blob([src], {type: 'text\/javascript'});
        const url = URL.createObjectURL(blob);

        return new Worker(url);
      };

      util.attachShadowDom = function({host, tpl, mode = 'open'}) {
        const root = host.attachShadow ?
          host.attachShadow({mode}) : host.createShadowRoot();
        const node = document.importNode(tpl.content, true);
        root.appendChild(node);
        return root;
      };



      util.getWatchId = function(url) {
        /\/?watch\/([a-z0-9]+)/.test(url || location.pathname);
        return RegExp.$1;
      };

      util.isLogin = function() {
        return document.getElementsByClassName('siteHeaderLogin').length < 1;
      };

      util.escapeHtml = function(text) {
        var map = {
          '&':    '&amp;',
          '\x27': '&#39;',
          '"':    '&quot;',
          '<':    '&lt;',
          '>':    '&gt;'
        };
        return text.replace(/[&"'<>]/g, char => {
          return map[char];
        });
      };

      util.unescapeHtml = function(text) {
        var map = {
          '&amp;'  : '&' ,
          '&#39;'  : '\x27',
          '&quot;' : '"',
          '&lt;'   : '<',
          '&gt;'   : '>'
        };
        return text.replace(/(&amp;|&#39;|&quot;|&lt;|&gt;)/g, char => {
          return map[char];
        });
      };

      util.escapeRegs = text => {
        let match = /[\\^$.*+?()[\]{}|]/g;
        // return text.replace(/[\\\*\+\.\?\{\}\(\)\[\]\^\$\-\|\/]/g, char => {
        return text.replace(match, '\\$&');
      };

      util.hasLargeThumbnail = function(videoId) { // return true;
        // 大サムネが存在する最初の動画ID。 ソースはちゆ12歳
        // ※この数字以降でもごく稀に例外はある。
        var threthold = 16371888;
        var cid = videoId.substr(0, 2);
        if (cid !== 'sm') { return false; }

        var fid = videoId.substr(2) * 1;
        if (fid < threthold) { return false; }

        return true;
      };

      util.httpLink = function(html) {
        let links = {}, keyCount = 0;
        const getTmpKey = function() { return ` <!--${keyCount++}--> `; };


        html = html.replace(/@([a-zA-Z0-9_]+)/g,
          (g, id) => {
            const tmpKey = getTmpKey();
            links[tmpKey] =
              ` <a href="https://twitter.com/${id}" class="twitterLink" rel="noopener" target="_blank">@${id}</a> `;
            return tmpKey;
          });


        html = html.replace(/(im)(\d+)/g,
          ` <a href="//seiga.nicovideo.jp/seiga/$1$2" class="seigaLink" rel="noopener" target="_blank">$1$2</a> `);
        html = html.replace(/(co)(\d+)/g,
          ` <a href="//com.nicovideo.jp/community/$1$2" class="communityLink" rel="noopener" target="_blank">$1$2</a> `);
        html = html.replace(/(watch|mylist|user)\/(\d+)/g, ` <a href="https://www.nicovideo.jp/$1/$2" rel="noopener" class="videoLink target-change">$1/$2</a> `);
        html = html.replace(/(sm|nm|so)(\d+)/g,       ` <a href="https://www.nicovideo.jp/watch/$1$2" rel="noopener" class="videoLink target-change">$1$2</a> `);

        let linkmatch = /<a.*?<\/a>/, n;
        html = html.split('<br />').join(' <br /> ');
        while ((n = linkmatch.exec(html)) !== null) {
          let tmpKey = getTmpKey();
          links[tmpKey] = n;
          html = html.replace(n, tmpKey);
        }

        html = html.replace(/\((https?:\/\/[\x21-\x3b\x3d-\x7e]+)\)/gi, '( $1 )');
        html = html.replace(/(https?:\/\/[\x21-\x3b\x3d-\x7e]+)http/gi, '$1 http');
        html = html.replace(/(https?:\/\/[\x21-\x3b\x3d-\x7e]+)/gi, '<a href="$1" rel="noopener" target="_blank" class="otherSite">$1</a>');
        Object.keys(links).forEach(tmpKey => {
          html = html.replace(tmpKey, links[tmpKey]);
        });

        html = html.split(' <br /> ').join('<br />');
        return html;
      };

      util.getSleepPromise = function(sleepTime, label = 'sleep') {
        return function(result) {
          return new Promise(resolve => {
            //console.time('sleep promise...' + label);
            window.setTimeout(() => {
              //console.timeEnd('sleep promise...' + label);
              return resolve(result);
            }, sleepTime);
          });
        };
      };

      util.getPageLanguage = function() {
        try {
          var h = document.getElementsByClassName('html')[0];
          return h.lang || 'ja-JP';
        } catch(e) {
          return 'ja-JP';
        }
      };


      const videoIdReg = /^[a-z]{2}\d+$/;
      util.getThumbnailUrlByVideoId = function(videoId) {
        if (!videoIdReg.test(videoId)) {
          return null;
        }
        const fileId = parseInt(videoId.substr(2), 10);
        const num = (fileId % 4) + 1;
        const large = util.hasLargeThumbnail(videoId) ? '.L' : '';
        return '//tn.smilevideo.jp/smile?i=' + fileId + large;
      };

      util.isFirefox = function() {
        return navigator.userAgent.toLowerCase().indexOf('firefox') >= 0;
      };

      return util;
    })();


    class Emitter {
      constructor() {
      }

      on(name, callback) {
        if (!this._events) { this._events = {}; }
        name = name.toLowerCase();
        if (!this._events[name]) {
          this._events[name] = [];
        }
        this._events[name].push(callback);
      }

      clear(name) {
        if (!this._events) { this._events = {}; }
        if (name) {
          this._events[name] = [];
        } else {
          this._events = {};
        }
      }

      emit(name) {
        if (!this._events) { this._events = {}; }
        name = name.toLowerCase();
        if (!this._events.hasOwnProperty(name)) { return; }
        const e = this._events[name];
        const arg = Array.prototype.slice.call(arguments, 1);
        for (let i =0, len = e.length; i < len; i++) {
          e[i].apply(null, arg);
        }
      }

      emitAsync(...args) {
        window.setTimeout(() => {
          this.emit(...args);
        }, 0);
      }
    }

    MylistPocket.emitter = util.emitter = new Emitter();

    const ZenzaDetector = (function() {
      let isReady = false;
      let Zenza = null;
      const emitter = new Emitter();

      const initialize = function() {
        const onZenzaReady = () => {
          isReady = true;
          Zenza = window.ZenzaWatch;

          Zenza.emitter.on('hideHover', () => {
            util.emitter.emit('hideHover');
          });

          Zenza.emitter.on('csrfToken', (token) => {
            util.emitter.emit('csrfToken', token);
          });

          let popup = document.getElementById('mylistPocket-popup');
          let defaultContainer = document.getElementById('mylistPocketDomContainer');
          defaultContainer.classList.add('zen-family');
          let zenzaContainer;
          Zenza.emitter.on('fullScreenStatusChange', isFull => {
            if (isFull) {
              if (!zenzaContainer) {
                zenzaContainer = document.querySelector('.zenzaPlayerContainer');
              }
              zenzaContainer.appendChild(popup);
            } else {
              defaultContainer.appendChild(popup);
            }
          });
          emitter.emit('ready', Zenza);
        };

        if (window.ZenzaWatch && window.ZenzaWatch.ready) {
          window.console.log('ZenzaWatch is Ready');
          onZenzaReady();
        } else {
          document.body.addEventListener('ZenzaWatchInitialize', function() {
            window.console.log('ZenzaWatchInitialize MylistPocket');
            onZenzaReady();
          });
        }
      };

      const detect = function() {
        return new Promise(res => {
          if (isReady) {
            return res(Zenza);
          }
          emitter.on('ready', () => {
            res(Zenza);
          });
        });
      };

      return {
        initialize: initialize,
        detect: detect
      };

    })();

    const StorageWriter = (function() {
      const emitter = new Emitter();
      // マイページのJSON.stringifyがPrototype.jsのせいでぶっこわれているので
      // 汚染されていないWebWorkerを使って書き込む
      const func = function(self) {
        self.onmessage = function(e) {
          const key     = e.data.key;
          const value   = e.data.value;
          const storage = e.data.storage;
          self.postMessage({key, value: JSON.stringify(value), storage});
        };
      };

      const worker = util.createWebWorker(func);
      worker.addEventListener('message', (e) => {
        const key     = e.data.key;
        const value   = e.data.value;
        const storage = e.data.storage === 'session' ? sessionStorage : localStorage;
        storage[key] = value;
        emitter.emit('write', {key, value, storage: e.data.storage});
      });

      return {
        write: function({key, value, storage = 'local'}) {
          worker.postMessage({
            key,
            value,
            storage
          });
        },
        on: function(...args) { emitter.on(...args); }
      };
    })();

    MylistPocket.debug.writer = StorageWriter;


    const config = (function() {
      const prefix = PRODUCT + '_config_';
      const emitter = new Emitter();

      const defaultConfig = {
        debug: false,

        'videoInfo.openNewWindow': false,
        'mylist.enableAutoComment': true, // マイリストコメントに投稿者を入れる

        'nicoad.hide': false,

        'ng.enable': false,
        'ng.owner':   '',
        'ng.word':    '',
        'ng.tag':     '',
        'ng.syncZenza': false,

        'fav.owner':   '',
        'fav.word':    '',
        'fav.tag':     ''
      };

      const config = {};
      let noEmit = false;


      emitter.refresh = (emitChange = false) => {
        //console.log('keys', Object.keys(localStorage));
        Object.keys(defaultConfig).forEach(key => {
          var storageKey = prefix + key;
          //console.log('conf', storageKey, localStorage.hasOwnProperty(storageKey), localStorage[storageKey]);
          if (localStorage.hasOwnProperty(storageKey) || localStorage[storageKey] !== undefined) {
            try {
              let lastValue = config[key];
              let newValue = JSON.parse(localStorage.getItem(storageKey));
              if (lastValue !== newValue) {
                config[key] = newValue;
                if (emitChange) {
                  emitter.emit('key', newValue);
                  emitter.emit('@update', {key, value: newValue});
                }
              }
            } catch (e) {
              window.console.error('config parse error key:"%s" value:"%s" ', key, localStorage.getItem(storageKey), e);
              config[key] = defaultConfig[key];
            }
          } else {
            config[key] = defaultConfig[key];
          }
        });
      };
      emitter.refresh();

      //Chrome Canary v60でlocalStorageにデータが有ってもhasOwnPropertyがfalseを返したりする
      //window.fuga = window.localStorage;
      //function dump() {
      //  Object.keys(window.fuga).forEach(key => {
      //    console.log('DUMP key="%s" hasOwn="%s" value="%s"', key, window.fuga.hasOwnProperty(key), window.fuga.getItem(key));
      //  });
      //}
      //dump();
      //window.setTimeout(dump, 3000);

      emitter.getValue = function(key, refresh) {
        if (refresh) {
          emitter.refreshValue(key);
        }
        return config[key];
      };

      emitter.setValue = function(key, value) {
        if (config[key] !== value && arguments.length >= 2) {
          var storageKey = prefix + key;
            StorageWriter.write({key: storageKey, value});
          config[key] = value;
          emitter.emit(key, value);
          emitter.emit('@update', {key, value});
          //console.log('%cconfig update "%s" = "%s"', 'background: cyan', key, value);
        }
      };

      emitter.clearConfig = function() {
        noEmit = true;
        Object.keys(defaultConfig).forEach(key => {
          if (['message', 'debug'].includes(key)) { return; }
          var storageKey = prefix + key;
          try {
            if (localStorage.hasOwnProperty(storageKey) || localStorage[storageKey] !== undefined) {
              localStorage.removeItem(storageKey);
            }
            config[key] = defaultConfig[key];
          } catch (e) {}
        });
        noEmit = false;
      };

      emitter.getKeys = function() {
        return Object.keys(defaultConfig);
      };

      emitter.namespace = function(name) {
        return {
          getValue: (key) => { return emitter.getValue(name + '.' + key); },
          setValue: (key, value) => { emitter.setValue(name + '.' + key, value); },
          refresh: () => { emitter.refresh(); },
          on: (key, func) => {
            if (key === '@update') {
              emitter.on('@update', ({key, value}) => {
                const pre = name + '.';
                //console.log('@update', key, value, pre);
                if (key.startsWith(pre)) {
                  func({key: key.replace(pre, ''), value});
                }
              });
            } else {
              emitter.on(name + '.' + key, func);
            }
          }
        };
      };

      StorageWriter.on('write', ({key, value, storage}) => {
        if (storage === 'session') { return; }
        const _key = key.replace(prefix, '');
        if (!config.hasOwnProperty(_key)) { return; }
        MylistPocket.broadcast.postMessage(
          {type: 'config-update', key, value, storage}
        );
      });

      return emitter;
    })();
    MylistPocket.config = config;

    MylistPocket.broadcast = (function(config) {
      if (!window.BroadcastChannel) { return; }
      const broadcastChannel = new window.BroadcastChannel(PRODUCT);

      const onBroadcastMessage = (e) => {
        const data = e.data;
        //window.console.info(`${PRODUCT}: onBroadcastMessage`, data);
        switch (data.type) {
          case 'config-update':
            config.refresh(true);
            break;
        }
      };

      broadcastChannel.addEventListener('message', onBroadcastMessage);

      return {
        postMessage: (...args) => { broadcastChannel.postMessage(...args); }
      };
      
    })(config);



    const CacheStorage = (function() {
      var PREFIX = PRODUCT + '_cache_';

      class CacheStorage {

        constructor(storage, gc = false) {
          this._storage = storage;
          this._memory = {};
          if (gc) { this.gc(); }
          Object.keys(storage).forEach((key) => {
            if (key.indexOf(PREFIX) === 0) {
              this._memory[key] = storage[key];
            }
          });
          this.gc = _.debounce(this.gc.bind(this), 100);
        }

        gc(now = -1) {
          const storage = this._storage;
          now = now >= 0 ? now : Date.now();
          Object.keys(storage).forEach((key, index) => {
            if (key.indexOf(PREFIX) === 0) {
              let item;
              try {
                item = JSON.parse(this._storage[key]);
              } catch(e) {
                storage.removeItem(key);
              }
              //console.info(
              //  `${index}, key: ${key}, expiredAt: ${new Date(item.expiredAt).toLocaleString()}, now: ${new Date(now).toLocaleString()}`);
              if (item.expiredAt === '' || item.expiredAt > now) {
                //console.info('not expired: ', key);
                return;
              }
              //console.info('cache expired: ', key, item.expiredAt);
              storage.removeItem(key);
            }
          });
        }

        setItem(key, data, expireTime) {
          key = PREFIX + key;
          const expiredAt =
            typeof expireTime === 'number' ? (Date.now() + expireTime) : '';

          const cacheData = {
            data: data,
            type: typeof data,
            expiredAt: expiredAt
          };

          this._memory[key] = cacheData;
          try {
            StorageWriter.write({
              key,
              value: cacheData,
              storage: this._storage === sessionStorage ? 'session' : 'local'
            });
            //this._storage[key] = JSON.stringify(cacheData);
            this.gc();
          } catch (e) {
            if (e.name === 'QuotaExceededError' ||
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
              this.gc(0);
            }
          }
        }

        getItem(key) {
          key = PREFIX + key;
          if (!(this._storage.hasOwnProperty(key) || this._storage[key] !== undefined)) {
            return null;
          }
          let item = null;
          try {
            item = JSON.parse(this._storage[key]);
          } catch(e) {
            delete this._memory[key];
            this._storage.removeItem(key);
            return null;
          }

          if (item.expiredAt === '' || item.expiredAt > Date.now()) {
            return item.data;
          }
          return null;
        }

        removeItem(key) {
          if (this._memory.hasOwnProperty(key)) {
            delete this._memory[key];
          }
          key = PREFIX + key;
          if (this._storage.hasOwnProperty(key) || this._storage[key] !== undefined) {
            this._storage.removeItem(key);
          }
        }

        clear() {
          const storage = this._storage;
          this._memory = {};
          Object.keys(storage).forEach((v) => {
            if (v.indexOf(PREFIX) === 0) {
              storage.removeItem(v);
            }
          });
        }
      }
      return CacheStorage;
    })();
    MylistPocket.debug.sessionCache = new CacheStorage(sessionStorage, true);
    MylistPocket.debug.localCache   = new CacheStorage(localStorage, true);

    const WindowMessageEmitter = (function() {
      const emitter = new Emitter();
      const knownSource = [];

      const onMessage = (event) => {
        if (_.indexOf(knownSource, event.source) < 0 //&&
            //event.origin !== location.protocol + '//ext.nicovideo.jp'
            ) { return; }

        try {
          var data = JSON.parse(event.data);
          if (data.id !== PRODUCT) { return; }

          emitter.emit('onMessage', data.body, data.type);
        } catch (e) {
          console.log(
            '%cMylistPocket.Error: window.onMessage  - ',
            'color: red; background: yellow',
            e,
            event
          );
          console.log('%corigin: ', 'background: yellow;', event.origin);
          console.log('%cdata: ',   'background: yellow;', event.data);
          console.trace();
        }
      };

      emitter.addKnownSource = (win) => {
        knownSource.push(win);
      };

      window.addEventListener('message', onMessage);

      return emitter;
    })();


    const CrossDomainGate = (function() {

      class CrossDomainGate extends Emitter {
        constructor(params) {
          super();

          this._baseUrl  = params.baseUrl;
          this._origin   = params.origin || location.href;
          this._type     = params.type;
          this._messager = params.messager || WindowMessageEmitter;

          this._loaderFrame = null;
          this._sessions = {};
          this._initializeStatus = '';
        }

        _initializeFrame() {
          switch (this._initializeStatus) {
            case 'done':
              return new Promise((resolve) => {
                window.setTimeout(() => { resolve(); }, 0);
              });
            case 'initializing':
              return new Promise((resolve, reject) => {
                this.on('initialize', (e) => {
                  if (e.status === 'ok') { resolve(); } else { reject(e); }
                });
              });
            case '':
              this._initializeStatus = 'initializing';
              var initialPromise = new Promise((resolve, reject) => {
                this._sessions.initial = {
                  promise: initialPromise,
                  resolve: resolve,
                  reject: reject
                };

                setTimeout(() => {
                  if (this._initializeStatus !== 'done') {
                    var rej = {
                      status: 'fail',
                      message: 'CrossDomainGate初期化タイムアウト (' + this._type + ')'
                    };
                    reject(rej);
                    this.emit('initialize', rej);
                  }
                }, 60 * 1000);
                this._initializeCrossDomainGate();
              });
              return initialPromise;
          }
        }

        _initializeCrossDomainGate() {
          this._initializeCrossDomainGate = _.noop;
          this._messager.on('onMessage', this._onMessage.bind(this));

          console.log('%c initialize ' + this._type, 'background: lightgreen;');

          const loaderFrame = document.createElement('iframe');

          loaderFrame.name = this._type + 'Loader';
          loaderFrame.className = 'xDomainLoaderFrame ' + this._type;
          loaderFrame.lazyload = 'off';
          document.body.appendChild(loaderFrame);

          this._loaderFrame = loaderFrame;
          this._loaderWindow = loaderFrame.contentWindow;
          this._messager.addKnownSource(this._loaderWindow);
          this._loaderWindow.location.replace(this._baseUrl + '#' + TOKEN);
        }

        _onMessage(data, type) {
          if (type !== this._type) {
            return;
          }
          const info      = data.message;
          const token     = info.token;
          const sessionId = info.sessionId;
          const status    = info.status;
          const command   = info.command || 'loadUrl';
          let session   = this._sessions[sessionId];

          if (status === 'initialized') {
            this._initializeStatus = 'done';
            this._sessions.initial.resolve();
            this.emitAsync('initialize', {status: 'ok'});
            return;
          }

          if (token !== TOKEN) {
            window.console.log('invalid token:', token, TOKEN);
            return;
          }

          switch (command) {
            case 'dumpConfig':
              this._onDumpConfig(info.body);
              break;

            default:
              if (!session) { return; }
              if (status === 'ok') { session.resolve(info.body); }
              else { session.reject({ message: status }); }
              session = null;
              delete this._sessions[sessionId];
              break;
          }
        }

        load(url, options) {
          return this._postMessage({
            command: 'loadUrl',
            url: url,
            options: options
          }, true);
        }

        _postMessage(message, needPromise) {
          return new Promise((resolve, reject) => {
            message.sessionId = this._type + '_' + Math.random();
            message.token = TOKEN;
            if (needPromise) {
              this._sessions[message.sessionId] = {
                resolve: resolve,
                reject: reject
              };
            }

            return this._initializeFrame().then(() => {
              try {
                this._loaderWindow.postMessage(
                  JSON.stringify(message),
                  this._origin
                );
              } catch (e) {
                console.log('%cException!', 'background: red;', e);
              }
            });
          });
        }


      }

      return CrossDomainGate;
    })();



    const CsrfTokenLoader = (() => {
      const cacheStorage = new CacheStorage(
        location.host === 'www.nicovideo.jp' ? localStorage : sessionStorage);
      const TIMEOUT = 10 * 1000;
      const CACHE_EXPIRE_TIME = 60 * 30 * 1000;

      class CsrfTokenLoader {
        static load() {
          return new Promise((resolve, reject) => {
            const cache = cacheStorage.getItem('csrfToken');
            if (cacheStorage.getItem('csrfToken')) {
              return resolve(cache);
            }

            let timeoutTimer = window.setTimeout(() => {
              reject('timeout');
            }, TIMEOUT);

            return CsrfTokenLoader._getToken().then((token) => {
              window.clearTimeout(timeoutTimer);
              CsrfTokenLoader.saveToCache(token);
              resolve(token);
            });
          });
        }

        static saveToCache(token) {
          cacheStorage.setItem('csrfToken', token, CACHE_EXPIRE_TIME);
        }

        static _getToken() {
          const url = 'https://www.nicovideo.jp/mylist_add/video/sm9';
          const tokenReg = /NicoAPI\.token *= *["']([a-z0-9\-]+)["'];/;

          return fetch(url, {
            credentials: 'include'
          }).then((res) => {
            return res.text();
          }).then((result) => {
            if (tokenReg.test(result)) {
              let token = RegExp.$1;
              return Promise.resolve(token);
            } else {
              return Promise.reject('token parse error');
            }
          });
        }
      }

      util.emitter.on('csrfToken', (token) => {
        CsrfTokenLoader.saveToCache(token);
      });

      return CsrfTokenLoader;
    })();

    MylistPocket.debug.CsrfTokenLoader = CsrfTokenLoader;

    const ThumbInfoLoader = (() => {
      const BASE_URL = 'https://ext.nicovideo.jp/';
      const MESSAGE_ORIGIN = 'https://ext.nicovideo.jp/';
      const CACHE_EXPIRE_TIME = 60 * 60 * 1000;
      //const CACHE_EXPIRE_TIME = 60 * 1000;
      let gate = null;
      let cacheStorage = new CacheStorage(sessionStorage, true);
      let failedResult = {};

      class ThumbInfoLoader {

        constructor() {
          this._emitter = new Emitter();

          gate = new CrossDomainGate({
            baseUrl: BASE_URL,
            origin: MESSAGE_ORIGIN,
            type: 'thumbInfo' + PRODUCT,
            messager: WindowMessageEmitter
          });
        }

        _onMessage(data, type) {
          if (type !== 'videoInfoLoader') { return; }
          const info = data.message;

          this.emit('load', info, 'THUMB_WATCH');
        }

        _parseXml(xmlText) {
          const parser = new DOMParser();
          const xml = parser.parseFromString(xmlText, 'text/xml');
          const val = (name) => {
            var elms = xml.getElementsByTagName(name);
            if (elms.length < 1) {
              return '';
            }
            return elms[0].innerHTML;
          };

          const resp = xml.getElementsByTagName('nicovideo_thumb_response');
          if (resp.length < 1 || resp[0].getAttribute('status') !== 'ok') {
            return {
              status: 'fail',
              code: val('code'),
              message: val('description')
            };
          }

          const duration = (() => {
            const tmp = val('length').split(':');
            return parseInt(tmp[0], 10) * 60 + parseInt(tmp[1], 10);
          })();
          const watchId = val('watch_url').split('/').reverse()[0];
          const postedAt = (new Date(val('first_retrieve'))).toLocaleString();
          const tags = (() => {
            const result = [], t = xml.getElementsByTagName('tag');
            _.each(t, (tag) => {
              result.push({
                text: tag.innerHTML,
                category: tag.hasAttribute('category'),
                lock: tag.hasAttribute('lock')
              });
            });
            return result;
          })();

          const result = {
            status: 'ok',
            _format:     'thumbInfo',
            v:            watchId,
            id:           val('video_id') || '',
            title:        val('title'),
            description:  val('description'),
            thumbnail:    val('thumbnail_url'),
            movieType:    val('movie_type'),
            lastResBody:  val('last_res_body'),
            duration:     duration,
            postedAt:     postedAt,
            mylistCount:  parseInt(val('mylist_counter'), 10),
            viewCount:    parseInt(val('view_counter'), 10),
            commentCount: parseInt(val('comment_num'), 10),
            tagList: tags
          };
          const userId = val('user_id');
          if (userId !== '') {
            result.owner = {
              type: 'user',
              id: userId,
              linkId: userId ? `user/${userId}` : '',
              name: val('user_nickname') || '(非公開ユーザー)',
              url:  userId ? (protocol + '//www.nicovideo.jp/user/' + userId) : '#',
              icon: val('user_icon_url') || '//res.nimg.jp/img/user/thumb/blank.jpg'
            };
          }
          const channelId  = val('ch_id');
          if (channelId !== '') {
            result.owner = {
              type: 'channel',
              id: channelId,
              linkId: channelId ? `ch${channelId}` : '',
              name: val('ch_name') || '(非公開ユーザー)',
              url: protocol + '//ch.nicovideo.jp/ch' + channelId,
              icon: val('ch_icon_url') || '//res.nimg.jp/img/user/thumb/blank.jpg'
            };
          }

          return result;
        }

        loadXml(watchId) {
          return this.load(watchId, 'xml');
        }

        load(watchId, format = 'object') {
          return new Promise((resolve, reject) => {
            const cache = cacheStorage.getItem('thumbInfo_' + watchId);

            const onLoad = (xml) => {
              const result = this._parseXml(xml);
              result.fromCache = !!cache;
              if (result.status === 'ok') {
                if (!cache) {
                  cacheStorage.setItem('thumbInfo_' + watchId, xml, CACHE_EXPIRE_TIME);
                }
                resolve({data: format === 'xml' ? xml : result, watchId});
              } else {
                failedResult[`${watchId}:${format}`] = format === 'xml' ? xml : result;
                reject({data: format === 'xml' ? xml : result, watchId});
              }
            };

            if (failedResult[`${watchId}:${format}`]) {
              reject({data: failedResult[`${watchId}:${format}`], watchId});
              return;
            }
            if (cache) {
              //console.log('cache exist: ', watchId);
              onLoad(cache);
              return;
            }

            gate.load(BASE_URL + 'api/getthumbinfo/' + watchId).then(onLoad);
          });
        }
      }

      const loader = new ThumbInfoLoader();
      return {
        load:    (watchId) => { return loader.load(watchId); },
        loadXml: (watchId) => { return loader.loadXml(watchId); },
        loadOwnerInfo: (watchId) => {
          return loader.load(watchId).then((info) => {
            const owner = info.data.owner;
            if (!owner) {
              return {};
            }

            const lang = util.getPageLanguage();
            const prefix = owner.type === 'user' ? '投稿者: ' : '提供: ';
            const suffix =
              (owner.type === 'user' && lang === 'ja-JP') ? ' さん' : '';
            owner.linkId =
              owner.id ?
                (owner.type === 'user' ? `user/${owner.id}` : `ch${owner.id}`) :
                '';
            owner.localeName = `${prefix}${owner.name}${suffix}`;
            return owner;
          });
        }
      };

    })();

    MylistPocket.debug.ThumbInfoLoader = ThumbInfoLoader;



    const DeflistApiLoader = ((CsrfTokenLoader) => {
      const cacheStorage = new CacheStorage(
        location.host === 'www.nicovideo.jp' ? localStorage : sessionStorage);
      const TIMEOUT = 30000;
      const CACHE_EXPIRE_TIME = 60 * 3 * 1000;
      let isZenzaReady = false;

      class DeflistApiLoader {

        static getItems() {
          const url = 'https://www.nicovideo.jp/api/deflist/list';
          const cacheKey = 'deflistItems';

          return new Promise(function(resolve, reject) {

            const cache = cacheStorage.getItem(cacheKey);
            if (cache) {
              window.setTimeout(() => {
                resolve({items: cache.mylistitem, status: cache.status, from: 'cache'});
              }, 0);
              return;
            }

            let timeoutTimer = window.setTimeout(() => {
              timeoutTimer = null;
              reject({status: 'fail', description: 'timeout'});
            }, TIMEOUT);

            fetch(url, {
              credentials: 'include'
            }).then((res) => {
              return res.json();
            }).then((json) => {
              if (json.status !== 'ok') {
                return reject(json);
              }

              if (timeoutTimer) { window.clearTimeout(timeoutTimer);
              } else { return; }

              cacheStorage.setItem(cacheKey, json, CACHE_EXPIRE_TIME);
              resolve({items: json.mylistitem, status: json.status, from: 'fetch'});
            });
          });
        }

        static findItemByWatchId(watchId) {
          return DeflistApiLoader.getItems().then(({items}) => {
            for (var i = 0, len = items.length; i < len; i++) {
              var item = items[i], wid = item.id || item.item_data.watch_id;
              if (wid === watchId) {
                return Promise.resolve(item);
              }
            }
            return Promise.reject();
          });
        }

        static _removeItem({watchId, token}) {
          const cacheKey = 'deflistItems';
          DeflistApiLoader.findItemByWatchId(watchId).then((item) => {
          const url = 'https://www.nicovideo.jp/api/deflist/delete';
          const body = 'id_list[0][]=' + item.item_id + '&token=' + token;

          const req = {
            credentials: 'include',
            method: 'post',
            body,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          };

          return fetch(url, req)
            .then(res => { return res.json(); })
            .then((result) => {
              if (result.status !== 'ok') {
                return Promise.reject({
                  status: 'fail',
                  result: result,
                  code: result.error.code,
                  message: result.error.description
                });
              }


              cacheStorage.removeItem(cacheKey);
              util.emitter.emitAsync('deflistRemove', watchId);
              return Promise.resolve({
                status: 'ok',
                result: result,
                message: 'とりあえずマイリストから削除'
              });

            }, (err) => {
              return Promise.reject({
                result: err,
                message: 'とりあえずマイリストから削除失敗(2)'
              });
            });

          }, (err) => {
            return Promise.reject({
              status: 'fail',
              result: err,
              message: '動画が見つかりません'
            });
          });
        }

        static removeItem(watchId) {
          return CsrfTokenLoader.load().then((token) => {
            return DeflistApiLoader._removeItem({watchId, token});
          });
        }

        static __addItem({watchId, description, token, isRetry = false}) {
          const cacheKey = 'deflistItems';
          const url = 'https://www.nicovideo.jp/api/deflist/add';
          let body = 'item_id=' + watchId + '&token=' + token;
          if (description) {
            body += '&description='+ encodeURIComponent(description);
          }

          const req = {
            method: 'post',
            credentials: 'include',
            body,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          };

          return new Promise((resolve, reject) => {
            fetch(url, req)
              .then((res) => { return res.json(); })
              .then((result) => {

              if (result.status && result.status === 'ok') {
                cacheStorage.removeItem(cacheKey);
                //ZenzaWatch.emitter.emitAsync('deflistAdd', watchId, description);
                return resolve({
                  status: 'ok',
                  result: result,
                  message: 'とりあえずマイリスト登録'
                });
              }

              if (!result.status || !result.error) {
                return reject({
                  status: 'fail',
                  result: result,
                  message: 'とりあえずマイリスト登録失敗(100)'
                });
              }

              if (result.error.code !== 'EXIST' || isRetry) {
                return reject({
                  status: 'fail',
                  result: result,
                  code: result.error.code,
                  message: result.error.description
                });
              }

              /**
              * すでに登録されている場合は、いったん削除して再度追加(先頭に移動)
              */
              return DeflistApiLoader.removeItem(watchId)
                .then(util.getSleepPromise(1500, 'deflist remove'))
                .then(() => {
                return DeflistApiLoader._addItem(watchId, description, true)
                  .then((result) => {
                    resolve({
                      status: 'ok',
                      result: result,
                      message: 'とりあえずマイリストの先頭に移動'
                    });
                });
              }, (err) => {

                reject({
                  status: 'fail',
                  result: err.result,
                  code:   err.code,
                  message: 'とりあえずマイリスト登録失敗(101)'
                });
              });

            }, (err) => {
              reject({
                status: 'fail',
                result: err,
                message: 'とりあえずマイリスト登録失敗(200)'
              });
            });
          });
        }

        static _addItem(watchId, description, isRetry = false) {
          return CsrfTokenLoader.load().then((token) => {
            return DeflistApiLoader.__addItem({watchId, description, isRetry, token});
          });
        }

        static addItem(watchId, description) {
          return DeflistApiLoader._addItem(watchId, description, false);
        }

        static addItemWithOwnerName(watchId) {
          return ThumbInfoLoader.loadOwnerInfo(watchId).then((owner) => {
            if (!owner.id) {
              return DeflistApiLoader.addItem(watchId);
            }

            const description = `${owner.localeName} ${owner.linkId}`;
            return DeflistApiLoader.addItem(watchId, description);
          }, () => DeflistApiLoader.addItem(watchId));
        }

        static clearCache() {
          cacheStorage.removeItem('deflistItems');
        }

      }

      ZenzaDetector.detect().then((ZenzaWatch) => {
        isZenzaReady = true;
        ZenzaWatch.emitter.on('deflistRemove', () => DeflistApiLoader.clearCache());
      });

      //DeflistApiLoader.clearCache();

      return DeflistApiLoader;
    })(CsrfTokenLoader);

    MylistPocket.debug.DeflistApiLoader = DeflistApiLoader;

    class HoverMenu extends Emitter {
      constructor() {
        super();
        this._init();
      }
      
      _init() {
        this._view = document.querySelector('.mylistPocketHoverMenu');

        this._view.addEventListener('click',     this._onClick.bind(this));
        this._view.addEventListener('mousedown', this._onMousedown.bind(this));
        this._view.addEventListener('contextmenu', this._onContextMenu.bind(this));

        this._onHoverEnd = _.debounce(this._onHoverEnd.bind(this), 500);
        document.body.addEventListener(
          'mouseover', this._onHover.bind(this), {passive: true});
        document.body.addEventListener(
          'mouseout',  this._onMouseout.bind(this), {passive: true});
        document.body.addEventListener(
          'mouseover', this._onHoverEnd, {passive: true});
        document.body.addEventListener(
          'click', () => { this.hide(); }, {passive: true});


        util.emitter.on('hideHover', () => this.hide());

        this._x = this._y = 0;

        ZenzaDetector.detect().then((ZenzaWatch) => {
          this._isZenzaReady = true;
          this.addClass('is-zenzaReady');
          ZenzaWatch.emitter.on('DialogPlayerOpen', _.debounce(() => {
            this.hide();
          }, 1000));
        });

        this.toggleClass('is-otherDomain', location.host !== 'www.nicovideo.jp');
        this.toggleClass('is-guest', !util.isLogin());
        this._deflistButton = this._view.querySelector('.mylistPocketButton.deflist-add');
        MylistPocket.debug.hoverMenu = this._view;
      }

      toggleClass(className, v) {
        className.split(/ +/).forEach((c) => {
          this._view.classList.toggle(c, v);
        });
      }

      addClass(className)    { this.toggleClass(className, true); }
      removeClass(className) { this.toggleClass(className, false); }

      hide() {
        this.removeClass('is-show');
      }

      show() {
        this.addClass('is-show');
      }

      moveTo(x, y) {
        this._x = x;
        this._y = y;
        this._view.style.left = x + 'px';
        this._view.style.top  = y + 'px';
      }

      _onClick(e) {
        e.preventDefault();
        e.stopPropagation();
      }

      _onContextMenu(e) {
        e.preventDefault();
        e.stopPropagation();
      }

      _onMousedown(e) {
        const watchId = this._watchId;
        const target = e.target.classList.contains('command') ?
          e.target : e.target.closest('.command');
        const command = target.getAttribute('data-command');
        e.preventDefault();
        e.stopPropagation();

        if (command === 'info') {
          this._videoInfo(watchId);
          this.hide();
        } else if (command === 'playlist-queue') {
          this.emit('playlist-queue', watchId, this);
        } else {
          if (e.button !== 0 || e.shiftKey) {
            this._deflistRemove(watchId);
          } else {
            this._deflist(watchId);
          }
        }
      }

      _videoInfo(watchId) {
        this.emit('info', watchId || this._watchId, this);
      }

      _deflist(watchId) {
        this.emit('deflist-add', watchId || this._watchId, this);
      }

      _deflistRemove(watchId) {
        this.emit('deflist-remove', watchId || this._watchId, this);
      }

      _onHover(e) {
        const target = this._isTargetElement(e);
        if (!target) { return; }

        this._hoverElement = target;
      }

      _onHoverEnd(e) {
        const target =
          e.target.tagName === 'A' ? e.target : e.target.closest('a');
        if (!target || this._hoverElement !== target) { return; }
        const href = target.getAttribute('data-href') || target.getAttribute('href');
        const watchId = target.dataset.nicoVideoId || util.getWatchId(href);
        const offset = target.getBoundingClientRect();
        //const bodyOffset = document.body.getBoundingClientRect();
        const scrollTop  = document.documentElement.scrollTop  || document.body.scrollTop  || 0;
        const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0;
        const left = offset.left + scrollLeft;
        const top  = offset.top  + scrollTop;
        const host = target.hostname;
        if (host !== 'www.nicovideo.jp' && host !== 'nico.ms' && host !== 'sp.nicovideo.jp') { return; }

        if (target.classList.contains('noHoverMenu')) { return; }
        if (!watchId.match(/^[a-z0-9]+$/)) { return; }
        if (watchId.indexOf('lv') === 0) { return; }

        this._watchId = watchId;
        this.show();
        this.moveTo(
          left + target.offsetWidth  - this._view.offsetWidth / 2,
          top  + target.offsetHeight / 2 - this._view.offsetHeight / 2
        );
      }

      _onMouseout(e) {
        const target = this._isTargetElement(e);
        if (!target) { return; }

        if (this._hoverElement === e.target) {
          this._hoverElement = null;
        }
      }

      _isTargetElement(e) {
        const target =
          e.target.tagName === 'A' ? e.target : e.target.closest('a');
        if (!target) { return false; }
        const href = target.href || '';
        if (!/(watch\/[a-z0-9]+|nico\.ms\/[a-z0-9]+)/.test(href)) { return false; }
        return target;
      }

      set isBusy(v) {
        this._isBusy = v;
        this.toggleClass('is-busy', v);
      }

      get isBusy() {
        return !!this._isBusy;
      }

      notifyBeginDeflistUpdate(/*watchId*/) {
        this.addClass('is-deflistUpdating');
      }

      notifyEndDeflistUpdate(result) {
        this.addClass('is-deflistSuccess');
        window.setTimeout(() => { this.removeClass('is-deflistSuccess'); }, 3000);

        //window.console.info('ok result', result);
        this._deflistButton.setAttribute('data-result', result.message || '登録しました');
        this.removeClass('is-deflistUpdating');
      }

      notifyFailDeflistUpdate(result) {
        this.addClass('is-deflistFail');
        window.setTimeout(() => { this.removeClass('is-deflistFail'); }, 3000);

        //window.console.info('fail result', result);
        this._deflistButton.setAttribute('data-result', result.message || '登録失敗');
        this.removeClass('is-deflistUpdating');
      }
    }


    class VideoInfoView extends Emitter {
      constructor({host, tpl}) {
        super();
        this._host = host;
        this._tpl = tpl;
        this._slot = {};

        this._config    = config.namespace('videoInfo');
        this._mylistConfig = config.namespace('mylist');
        const ngConfig  = this._ngConfig  = config.namespace('ng');
        const favConfig = this._favConfig = config.namespace('fav');
        this._nicoadConfig = config.namespace('nicoad');

        const {ngChecker, favChecker} = initNgChecker({ngConfig, favConfig});
        this._ngChecker  = ngChecker;
        this._favChecker = favChecker;
      }

      _initialize() {
        if (this._isInitialized) { return; }
        const host = this._host;
        const tpl = this._tpl;

        this._shadowRoot = util.attachShadowDom({host, tpl});
        Array.prototype.forEach.call(this._host.querySelectorAll('*'), (elm) => {
          //this._host.querySelectorAll('*').forEach((elm) => {
          const slot = elm.getAttribute('slot');
          if (!slot) { return; }
          //const type = elm.getAttribute('data-type') || 'string';
          this._slot[slot] = elm;
        });

        this._rootDom = this._shadowRoot.querySelector('.root');
        this._hostDom = this._host;

        this._rootDom.addEventListener('mousedown', e => { e.stopPropagation(); });
        this._shadowRoot.addEventListener('mousedown', e => { e.stopPropagation(); });
        this._rootDom.querySelector('.setting-panel-main').addEventListener('click', e => {
          e.stopPropagation();
        });

        this._initSettingPanel();

        const updateNgEnable = v => { this.toggleClass('is-ng-enable', v); };
        updateNgEnable(this._ngConfig.getValue('enable'));
        this._ngConfig.on('enable', updateNgEnable);

        this._rootDom.addEventListener('click', this._onClick.bind(this));

        this._boundOnBodyMouseDown = this._onBodyMouseDown.bind(this);

        MylistPocket.debug.view = this;

        util.emitter.on('hideHover', () => {
          this.hide();
        });

        const debUpdateFavNg = _.debounce(this._updateFavNg.bind(this), 100);
        this._ngConfig    .on('@update', debUpdateFavNg);
        this._favConfig   .on('@update', debUpdateFavNg);
        //this._mylistConfig.on('@update', debUpdateFavNg);

        ZenzaDetector.detect().then(() => {
          this._isZenzaReady = true;
          this.addClass('is-zenzaReady');
          window.ZenzaWatch.emitter.on('DialogPlayerOpen', _.debounce(() => {
            this.hide();
          }, 1000));
        });
  
        this._videoInfoArea = this._rootDom.querySelector('.video-info');
        this._deflistButton =
          this._rootDom.querySelector('.mylistPocketButton.deflist-add');

        this.toggleClass('is-otherDomain', location.host !== 'www.nicovideo.jp');
        this.toggleClass('is-firefox', util.isFirefox());

        MylistPocket.external.observe({
          query: 'a.videoLink',
          container: this._hostDom.querySelector('.description'),
        });

        this._isInitialized = true;
      }

      _initSettingPanel() {
        const onSettingFormChange = this._onSettingFormChange.bind(this);

        const refresh = () => {
          //console.log('refresh setting-form');
          Array.from(this._rootDom.querySelectorAll('.setting-form')).forEach(elm => {
            const name = elm.getAttribute('data-config-name');
            if (!name) { return; }
            const namespace = elm.getAttribute('data-config-namespace') || '';
            let config = this._config;
            if (namespace === 'ng')  { config = this._ngConfig; }
            if (namespace === 'fav') { config = this._favConfig; }
            if (namespace === 'mylist') { config = this._mylistConfig; }
            if (namespace === 'nicoad') { config = this._nicoadConfig; }
            const tagName = (elm.tagName.toLowerCase()).toLowerCase();
            if (tagName === 'input') {
              const type = (elm.type || '').toLowerCase();
              switch (type) {
                case 'checkbox':
                  elm.checked = !!config.getValue(name);
                  break;
                default:
                  elm.value   = config.getValue(name);
                  break;
              }
            } else if (tagName === 'select' || tagName === 'textarea') {
              elm.value = config.getValue(name);
            }

            elm.removeEventListener('change', onSettingFormChange);
            elm.addEventListener('change', onSettingFormChange);
          });
        };

        const onUpdate = _.debounce(refresh, 100);

        const syncZenza = _.debounce(() => {
          if (!this._ngConfig.getValue('syncZenza') || !this._isZenzaReady) { return; }
          window.ZenzaWatch.config.setValue(
            'videoTagFilter',   this._ngConfig.getValue('tag'));
          window.ZenzaWatch.config.setValue(
            'videoOwnerFilter', this._ngConfig.getValue('owner'));
        }, 1000);

        refresh();

        this._config  .on('@update',  onUpdate);
        this._favConfig.on('@update', onUpdate);
        this._ngConfig.on('@update', () => {
          onUpdate();
          syncZenza();
        });

      }

      _onSettingFormChange(e) {
        const elm = e.target;
        const name = elm.getAttribute('data-config-name');
        if (!name) { return; }
        const namespace = elm.getAttribute('data-config-namespace') || '';
        let config = this._config;
        if (namespace === 'ng')  { config = this._ngConfig; }
        if (namespace === 'fav') { config = this._favConfig; }
        if (namespace === 'nicoad') { config = this._nicoadConfig; }
        if (namespace === 'mylist') { config = this._mylistConfig; }

        const tagName = (elm.tagName.toLowerCase()).toLowerCase();
        if (tagName === 'input') {
          const type = (elm.type || '').toLowerCase();
          switch (type) {
            case 'checkbox':
              config.setValue(name, elm.checked);
              break;
            default:
              config.setValue(name, elm.value);
              break;
          }
        } else if (tagName === 'select' || tagName === 'textarea') {
          config.setValue(name, elm.value);
        }
      }

      toggleClass(className, v) {
        className.split(/ +/).forEach((c) => {
          this._rootDom.classList.toggle(c, v);
          this._hostDom.classList.toggle(c, v);
        });
      }

      addClass(className)    { this.toggleClass(className, true); }
      removeClass(className) { this.toggleClass(className, false); }
      
      bind(videoInfo) {
        this._videoInfo = videoInfo;
        //console.info('status?', videoInfo.status, videoInfo.status === 'ok');
        if (videoInfo.status === 'ok') {
          this._bindSuccess(videoInfo);
        } else {
          this._bindFail(videoInfo);
        }
        window.setTimeout(() => {
          this.removeClass('is-loading');
        }, 0);
      }

      _onClick(e) {
        const t = e.target;
        const elm =
          t.classList.contains('command') ?
            t : e.target.closest('.command');
        if (!elm) { return; }

        // 簡易 throttle
        if (elm.classList.contains('is-active')) { return; }
        elm.classList.add('is-active');
        window.setTimeout(() => { elm.classList.remove('is-active'); }, 500);

        e.preventDefault();
        e.stopPropagation();
        const command = elm.getAttribute('data-command');
        const param   = elm.getAttribute('data-param');
        switch (command) {
          case 'toggle-setting':
            this.toggleSettingPanel();
            break;
          case 'add-ng-tag':    case 'add-fav-tag':
          case 'toggle-ng-tag': case 'toggle-fav-tag': {
              const tag = elm.getAttribute('data-tag') || '';
              if (!tag) { break; }
              this.emit('command', command, {
                watchId: this._videoInfo.watchId,
                value: tag
              }, this);
            }
            break;
          case 'add-ng-owner':    case 'add-fav-owner':
          case 'toggle-ng-owner': case 'toggle-fav-owner': {
              let owner =
                (this._videoInfo.isChannel ? 'ch' : '') +
                 this._videoInfo.ownerId + '#' + this._videoInfo.ownerName;
              this.emit('command', command, {
                watchId: this._videoInfo.watchId,
                value: owner
              }, this);
            }
            break;
          case 'mylist-comment-open':
            this.emit('command', command, this._videoInfo.watchId);
            break;
          case 'close':
            this.hide();
            break;
           default:
            this.emit('command', command, param, this);
        }
      }

      _updateFavNg() {
        if (!this._isInitialized) { return; }
        if (!this._videoInfo  || this._videoInfo.status !== 'ok') { return; }

        const videoInfo = this._videoInfo;
        const ownerInfo = this._rootDom.querySelector('.owner-info');
        ownerInfo.classList.toggle('is-favorited',
          this._favChecker.isMatchOwner(videoInfo.owner));
        ownerInfo.classList.toggle('is-ng',
          this._ngChecker .isMatchOwner(videoInfo.owner));

        Array.prototype.forEach.call(
          this._rootDom.querySelectorAll('.tag-container'),
          (elm) => {
            const tag = elm.getAttribute('data-tag');
            elm.classList.toggle('is-favorited', this._favChecker.isMatchTag(tag));
            elm.classList.toggle('is-ng',        this._ngChecker.isMatchTag(tag));
          });
      }

      toggleSettingPanel() {
        this.toggleClass('is-setting');
      }

      _onBodyMouseDown() {
        document.body.removeEventListener('mousedown', this._boundOnBodyMouseDown);
        this.hide();
      }

      reset() {
        this._initialize();
        window.setTimeout(() => { this._videoInfoArea.scrollTop = 0; }, 0);
        this.removeClass('noclip');
        this.addClass('is-loading');
      }

      show() {
        this.addClass('show');
        document.body.addEventListener('mousedown', this._boundOnBodyMouseDown);
      }

      hide() {
        this._videoInfoArea.scrollTop = 0;
        this.removeClass('show is-ok is-fail noclip is-setting');
      }
      
      _bindSuccess(videoInfo) {
        const toCamel = p => {
          return p.replace(/-./g, s => { return s.charAt(1).toUpperCase(); });
        };

        Object.keys(this._slot).forEach((key) => {
          const camelKey = toCamel(key);
          const data = videoInfo[camelKey];
          //console.log('keys', typeof data, key, camelKey, data);
          if (typeof data !== 'string' && typeof data !== 'object') { return; }

          const elm = this._slot[key];
          const type = elm.getAttribute('data-type') || 'string';

          switch (type) {
            case 'html':
              this._createDescription(elm, data);
              break;
            case 'int':
              let i = parseInt(data, 10);
              i = i.toLocaleString ? i.toLocaleString() : i;
              elm.textContent = i;
              break;
            case 'link':
              elm.href = data;
              break;
            case 'image':
              elm.src = data.replace('http:', 'https:');
              break;
            case 'date':
              elm.textContent = data.toLocaleString();
              break;
            default:
              elm.textContent = data;
          }
        });

        const df = document.createDocumentFragment();
        //Array.prototype.forEach.call(this._host.querySelectorAll('.tag'), t => { t.remove(); });
        videoInfo.tags.forEach(tag => {
          df.appendChild((this._createTagSlot(tag, videoInfo)));
        });
        const videoTags = this._rootDom.querySelector('.video-tags');
        videoTags.innerHTML = '';
        videoTags.appendChild(df);

        Array.prototype.forEach.call(this._rootDom.querySelectorAll('.command-watch-id'), elm => {
          elm.setAttribute('data-param', videoInfo.watchId);
        });
        Array.prototype.forEach.call(this._rootDom.querySelectorAll('.command-video-id'), elm => {
          elm.setAttribute('data-param', videoInfo.videoId);
        });

        const target = this._config.getValue('openNewWindow') ? '_blank' : '_self';
        Array.prototype.forEach.call(
          this._host.querySelectorAll('.target-change'), elm => {
          elm.target = target;
          elm.rel = 'noopener';
        });

        this._updateFavNg();

        this.toggleClass('is-channel', videoInfo.isChannel);
        this.addClass('is-ok');
        this.removeClass('is-fail');
        window.setTimeout(() => { this.addClass('noclip'); }, 800);
      }

      _createDescription(elm, data) {
        elm.innerHTML = util.httpLink(data);
        const watchReg = /watch\/([a-z0-9]+)/;
        const isZenzaReady = this._isZenzaReady;
        //if (util.isFirefox()) { return; }
        Array.from(elm.querySelectorAll('.videoLink[href*=\'watch/\']')).forEach((link) => {
          const href = link.getAttribute('href');
          if (!watchReg.test(href)) { return; }
          const watchId = RegExp.$1;
          if (isZenzaReady) {
            link.classList.add('noHoverMenu');
            link.classList.add('command');
            link.setAttribute('data-command', 'zenza-open');
            link.setAttribute('data-param', watchId);
          }
          const label = document.createElement('span');
          label.className = 'label';
          label.textContent = link.textContent;
          link.textContent = '';
          link.append(label);

          const btn = document.createElement('button');
          btn.innerHTML = '？';
          btn.className = 'command command-button noHoverMenu';
          btn.setAttribute('slot', 'command-button');
          btn.setAttribute('tooltip', '動画情報');
          btn.setAttribute('data-command', 'info');
          btn.setAttribute('data-param', watchId);
          link.appendChild(btn);

          const thumbnail = util.getThumbnailUrlByVideoId(watchId);
          const img = document.createElement('img');
          img.className = 'videoThumbnail preview';
          img.src = 'https://nicovideo.cdn.nimg.jp/uni/img/common/video_deleted.jpg';//(thumbnail || '').replace(/^http:/, '');
          link.classList.add('popupThumbnail');
          link.appendChild(img);

          link.dataset.videoId = watchId;
          link.classList.add('watch');
        });
      }

      _bindFail(videoInfo) {
        this._slot['error-description'].textContent =
          `動画情報の取得に失敗しました (${videoInfo.description})`;
        this.addClass('is-fail');
        this.removeClass('is-ok');
      }


      _createTagSlot(tag, {isChannel, owner}) {
        const text = util.escapeHtml(tag.text);
        const lock = tag.isLocked ? 'is-locked' : '';
        const span = document.createElement('span');
        const ownerId = owner ? owner.id : '';

        const a = document.createElement('a');
        const target = this._config.getValue('openNewWindow') ? '_blank' : '_self';
        a.textContent = tag.text;
        a.className = `tag ${lock}`;
        a.target    = target;
        a.rel       = 'noopener';
        a.href      = `https://www.nicovideo.jp/tag/${encodeURIComponent(text)}`;
        span.appendChild(a);

        if (isChannel) {
          const ch = document.createElement('a');
          const target = this._config.getValue('openNewWindow') ? '_blank' : '_self';
          ch.textContent = '[ch]';
          ch.className = `tag ${lock} channel-search`;
          ch.target    = target;
          ch.rel       = 'noopener';
          ch.title     = 'チャンネル検索';
          //ch.href      = `http://ch.nicovideo.jp/search/${encodeURIComponent(text)}?channel_id=ch${ownerId}&type=video&mode=t`;
          ch.href      = `https://ch.nicovideo.jp/search/${encodeURIComponent(text)}?type=video&mode=t`;
          span.appendChild(ch);
        }

        const fav = document.createElement('button');
        fav.className = 'add-fav-button command';
        fav.setAttribute('data-command', 'toggle-fav-tag');
        fav.setAttribute('data-tag', tag.text);
        fav.innerHTML = '★'; //'&#8416;'; // &#x2716;
        span.appendChild(fav);

        const bt = document.createElement('button');
        bt.className = 'add-ng-button command';
        bt.setAttribute('data-command', 'toggle-ng-tag');
        bt.setAttribute('data-tag', tag.text);
        bt.innerHTML = '&#x2716;'; //'&#8416;'; // &#x2716;
        span.appendChild(bt);

        const menu = `<zenza-tag-item-menu 
          class="tagItemMenu" 
          data-text="${encodeURIComponent(text)}" 
          data-has-nicodic="0"
        ></zenza-tag-item-menu>`;
        span.insertAdjacentHTML('afterbegin', menu);

        span.className = 'tag-container';
        span.setAttribute('data-tag', tag.text);
        span.slot = 'tag';
        return span;
      }

      notifyBeginDeflistUpdate(/*watchId*/) {
        this.addClass('is-deflistUpdating');
      }

      notifyEndDeflistUpdate(result) {
        this.addClass('is-deflistSuccess');
        window.setTimeout(() => { this.removeClass('is-deflistSuccess'); }, 3000);

        //window.console.info('ok result', result);
        this._deflistButton.setAttribute('data-result', result.message || '登録しました');
        this.removeClass('is-deflistUpdating');
      }

      notifyFailDeflistUpdate(result) {
        this.addClass('is-deflistFail');
        window.setTimeout(() => { this.removeClass('is-deflistFail'); }, 3000);

        //window.console.info('fail result', result);
        this._deflistButton.setAttribute('data-result', result.message || '登録失敗');
        this.removeClass('is-deflistUpdating');
      }
    }


    class VideoInfo {
      static createByThumbInfo({xml, watchId}) {
        const dom = (new DOMParser()).parseFromString(xml, 'text/xml');
        const status =
          dom.getElementsByTagName('nicovideo_thumb_response')[0].getAttribute('status');
        //console.info('status', status);
        const t = function(name) {
          const tt = dom.getElementsByTagName(name);
          if (!tt || !tt[0]) {
            return '';
          }
          return tt[0].textContent.trim();
        };

        const videoId = t('video_id');
        let thumbnail = t('thumbnail_url');
        if (util.hasLargeThumbnail(videoId)) {
          thumbnail += '.L';
        }

        const isChannel = !!t('ch_id');
        const tags = [];
        const rawData = {
          status,
          videoId:        t('video_id'),
          watchId:        isChannel ? t('video_id') : watchId,
          videoTitle:     t('title'),
          videoThumbnail: thumbnail,
          uploadDate:     t('first_retrieve'),
          duration:       t('length'),
          viewCounter:    t('view_counter'),
          mylistCounter:  t('mylist_counter'),
          commentCounter: t('comment_num'),
          description:    t('description'),
          lastResBody:    t('last_res_body'),
          isChannel,
          ownerId:   isChannel ? t('ch_id')       : t('user_id'),
          ownerName: isChannel ? t('ch_name')     : t('user_nickname'),
          ownerIcon: isChannel ? t('ch_icon_url') : t('user_icon_url'),
          tags
        };

        dom.querySelectorAll('tag').forEach(tag => {
          const isLocked = tag.getAttribute('lock');
          const text = tag.textContent;
          tags.push({text, isLocked});
        });

        return new VideoInfo(rawData);
      }

      constructor(rawData) {
        this._rawData = rawData;
      }

      get status()           { return this._rawData.status; }
      get videoId()          { return this._rawData.videoId; }
      get watchId()          { return this._rawData.watchId; }
      get originalVideoId() {
        return (!this.isChannel && this.videoId !== this.watchId) ? this.videoId : '';
      }
      get videoTitle()       { return this._rawData.videoTitle; }
      get videoThumbnail()   { return this._rawData.videoThumbnail; }
      get description()      { return this._rawData.description; }
      get duration()         { return this._rawData.duration; }
      get owner() {
        return {
          type: this.isChannel ? 'channel' : 'user',
          id:   this.ownerId,
          linkId: this.ownerId ? (this.isChannel ? `ch${this.ownerId}` : `user/${this.ownerId}`) : 'xx',
          name: this.ownerName,
          icon: this.ownerIcon
        };
      }

      get ownerPageLink()  {
        const ownerId = this.ownerId;
        if (this.isChannel) {
          return `${protocol}//ch.nicovideo.jp/ch${ownerId}`;
        } else {
          return `${protocol}//www.nicovideo.jp/user/${ownerId}`;
        }
      }
      get ownerIcon()      { return this._rawData.ownerIcon; }
      get ownerName()      { return this._rawData.ownerName; }
      get localeOwnerName() {
        if (this.isChannel) {
          return this.ownerName;
        } else {
          // TODO: 言語依存
          return this.ownerName + ' さん';
        }
      }
      get ownerId()        { return this._rawData.ownerId; }
      get isChannel()      { return this._rawData.isChannel; }
      get uploadDate()     { return new Date(this._rawData.uploadDate); }

      get viewCounter()    { return this._rawData.viewCounter; }
      get mylistCounter()  { return this._rawData.mylistCounter; }
      get commentCounter() { return this._rawData.commentCounter; }

      get lastResBody()    { return this._rawData.lastResBody; }
      get tags() { return this._rawData.tags; }
    }



    const deflistAdd = (watchId) => {
      const enableAutoComment = config.getValue('mylist.enableAutoComment');
      if (location.host === 'www.nicovideo.jp') {
        if (enableAutoComment) {
          return DeflistApiLoader.addItemWithOwnerName(watchId);
        } else {
          return DeflistApiLoader.addItem(watchId, '');
        }
      }

      let zenza;
      let token;
      return ZenzaDetector.detect().then((z) => {
        zenza = z;
      }).then(() => {
        return CsrfTokenLoader.load().then((t) => {
          token = t;
        }, () => { return Promise.resolve(); });
      }).then(() => {
        if (!enableAutoComment) { return {}; }
        return ThumbInfoLoader.loadOwnerInfo(watchId);
      }).then((owner) => {
        //console.info(watchId, token, owner, zenza);
        if (!owner.id) {
          return zenza.external.deflistAdd({watchId});
        }

        const description = `${owner.localeName} ${owner.linkId}`;
        return zenza.external.deflistAdd({watchId, description, token});
      });
    };

    const deflistRemove = (watchId) => {
      if (location.host === 'www.nicovideo.jp') {
        return DeflistApiLoader.removeItem(watchId);
      }

      let zenza;
      let token;
      return ZenzaDetector.detect().then((z) => {
        zenza = z;
      }).then(() => {
        return CsrfTokenLoader.load().then((t) => {
          token = t;
        }, () => { return Promise.resolve(); });
      }).then(() => {
        return zenza.external.deflistRemove({watchId, token});
      });
      
    };



    class MatchChecker {
      constructor({word = '', tag = '', owner = ''}) {
        this.init({word, tag, owner});
      }

      init({word, tag, owner}) {
        this._tag = [];
        tag.split(/[\r\n]+/).forEach((t) => {
          if (t) { this._tag.push(t.trim()); }
        });
        this._tag = _.uniq(this._tag);

        let wordTmp = [];
        this._word = null;
        word.split(/[\r\n]+/).forEach((w) => {
          if (w) { wordTmp.push(util.escapeRegs(w.trim())); }
        });
        wordTmp = _.uniq(wordTmp);
        if (wordTmp.length > 0) {
          this._word = new RegExp('(' + wordTmp.join('|') + ')', 'i');
        }
        //console.info('word', word, wordTmp.length, this._word);

        this._userId    = [];
        this._channelId = [];
        owner.split(/[\r\n]+/).forEach((o) => {
          if (typeof o === 'string') {
            const id = o.split('#')[0].trim();
            if (id.startsWith('ch')) {
              this._channelId.push(parseInt(id.substring(2)));
            } else {
              this._userId.push(parseInt(id));
            }
          }
        });
        this._userId    = _.uniq(this._userId);
        this._channelId = _.uniq(this._channelId);

        //console.info('ng', this._tag, this._word, this._userId, this._channelId);
      }

      isMatch(data) {
        if (this._isMatchTag(data.tagList)) { return true; }
        if (this._isMatchOwner(data.owner)) { return true; }
        if (this._isMatchWord({title: data.title, description: data.description})) { return true; }
      }

      _isMatchTag(tagList = []) {
        if (this._tag.length < 1) { return false; }

        const tagTmp = [];
        tagList.forEach(t => { if (t) { tagTmp.push(util.escapeRegs(t.trim ? t.trim() : t.text.trim())); } });
        const tagReg = new RegExp(' (' + tagTmp.join('|') + ') ', 'i');
        const _tag = ' ' + this._tag.join(' ') + ' ';
        return tagReg.test(_tag);
      }

      _isMatchOwner(owner) {
        const _id = owner.type === 'user' ? this._userId : this._channelId;
        return _id.includes(parseInt(owner.id, 10));
      }

      _isMatchWord({title, description}) {
        if (!this._word) { return false; }
        //console.log(title, this._word.test(title));
        //console.log(description, this._word.test(description));
        return this._word.test(title) || this._word.test(description);
      }

      isMatchTag(tag) {
        return this._isMatchTag([tag]);
      }

      isMatchOwner(owner) {
        return this._isMatchOwner(owner);
      }
    }

    class NgChecker extends MatchChecker {
      isNg(data) {
        return super.isMatch(data);
      }
    }

    const initDom = () => {
      util.addStyle(__css__);
      const f = document.createElement('div');
      f.id = 'mylistPocketDomContainer';
      f.innerHTML = __tpl__;
      document.body.appendChild(f);
    };

    const initZenzaBridge = () => {
      ZenzaDetector.initialize();
    };

    const createVideoInfoView = () => {
      const host = document.getElementById('mylistPocket-popup');
      const tpl  = document.getElementById('mylistPocket-popup-template');
      const vv = new VideoInfoView({host, tpl});
      return vv;
    };

    const createVideoInfoLoader = (vv) => {

      const onVideoInfoLoad = ({data, watchId}) => {
        const vi = VideoInfo.createByThumbInfo({xml: data, watchId});
        vv.bind(vi);
      };

      const onVideoInfoFail = () => {
        vv.bind({status: 'fail', description: '通信失敗'});
        return Promise.resolve();
      };

      return function(watchId) {
        vv.reset();
        vv.show();
        return ThumbInfoLoader.loadXml(watchId).then(
          onVideoInfoLoad, onVideoInfoFail
        );
      };
    };

    const createCommandDispatcher = ({infoView}) => {
      const info = createVideoInfoLoader(infoView);

      const ngConfig  = config.namespace('ng');
      const favConfig = config.namespace('fav');
      const {ngChecker, favChecker} = initNgChecker({ngConfig, favConfig});

      const toggleFavNg = (command, param) => {
        let [cmd, namespace, key] = command.split('-');
        let _config = namespace === 'fav' ? favConfig : ngConfig;
        _config.refresh();
        const value = param.value.trim();
        let ngs = _config.getValue(key).trim().split(/[\r\n]/);
        const isContain = ngs.includes(value);

        if (isContain || cmd === 'remove') {
          ngs = ngs.filter((line) => {
            if (line === value) {
              window.console.info('%c-%s:%s', 'background: cyan', key, value);
            }
            return line !== value;
          });
          cmd = 'remove';
        } else if (!isContain || cmd === 'add') {
          ngs.push(value);
          window.console.info('%c+%s:%s', 'background: cyan', key, value);
          cmd = 'add';
        }

        ngs = _.uniq(ngs);

        _config.setValue(key, ngs.join('\n').trim());

        const className = namespace === 'fav' ? 'is-fav-favorited' : 'is-ng-rejected';
        Array.prototype.forEach.call(
          document.querySelectorAll(`*[data-watch-id=${param.watchId}]`),
          item => { item.classList.toggle(className, cmd === 'add'); });
      };

      return (command, param, src) => {
        switch(command) {
          case 'info':
            return info(param);
          case 'load':
            return QueueLoader.load(param);
          case 'fav-status':
            return QueueLoader.load(param).then((result) => {
              if (!result || !result.data || result.data.status === 'fail' || result.data.code === 'DELETED') {
                return Promise.reject({status: 'unknown', result});
              }
              if (ngChecker.isMatch(result.data)) {
                return {status: 'ng', result};
              }
              if (favChecker.isMatch(result.data)) {
                return {status: 'favorite', result};
              }
              return {status: 'default', result};
            });
          case 'mylist-window':
            window.open(
             protocol + '//www.nicovideo.jp/mylist_add/video/' + param,
             'nicomylistadd',
             'width=500, height=400, menubar=no, scrollbars=no');
            break;
          case 'twitter-hash-open':
            window.open('https://twitter.com/hashtag/' + param + '?src=hash');
            break;
          case 'open-mylist-open':
            window.open(protocol + '//www.nicovideo.jp/openlist/' + param);
            break;
          case 'mylist-comment-open':
            window.open(protocol + '//www.nicovideo.jp/mylistcomment/video/' + param);
            break;
           case 'zenza-open-now':
            if (window.ZenzaWatch.config &&
              window.ZenzaWatch.config.getValue('enableSingleton')) {
              window.ZenzaWatch.external.sendOrExecCommand('openNow', param);
            } else {
              window.ZenzaWatch.external.execCommand('openNow', param);
            }
            break;
          case 'zenza-open':
            if (window.ZenzaWatch.config.getValue('enableSingleton')) {
              window.ZenzaWatch.external.sendOrExecCommand('open', param);
            } else {
              window.ZenzaWatch.external.open(param);
            }
            break;
          case 'playlist-inert':
            window.ZenzaWatch.external.playlist.insert(param);
            break;
          case 'playlist-queue':
            window.ZenzaWatch.external.playlist.add(param);
            break;
          case 'deflist-add':
            src.notifyBeginDeflistUpdate('is-deflistUpdating');

            return deflistAdd(param)
              .then(util.getSleepPromise(1000, 'deflist-add'))
              .then((result) => {
                src.notifyEndDeflistUpdate(result);
              }, (err) => {
                console.error('deflist-add-result', err);
                src.notifyFailDeflistUpdate(err);
              });
          case 'deflist-remove':
            src.notifyBeginDeflistUpdate('is-deflistUpdating');

            return deflistRemove(param)
              .then(util.getSleepPromise(1000, 'deflist-remove'))
              .then(() => {
                src.notifyEndDeflistUpdate({message: '削除しました'});
              }, (err) => {
                console.error('deflist-remove-result', err);
                src.notifyFailDeflistUpdate(err);
              });
          case 'add-ng-word':  case 'add-ng-tag':  case 'add-ng-owner':
          case 'add-fav-word': case 'add-fav-tag': case 'add-fav-owner':
          case 'remove-ng-word':  case 'remove-ng-tag':  case 'remove-ng-owner':
          case 'remove-fav-word': case 'remove-fav-tag': case 'remove-fav-owner':
          case 'toggle-ng-word':  case 'toggle-ng-tag':  case 'toggle-ng-owner':
          case 'toggle-fav-word': case 'toggle-fav-tag': case 'toggle-fav-owner':
            toggleFavNg(command, param);
            break;
        }
      };
    };

    const initExternal = (dispatcher, hoverMenu, infoView) => {
      MylistPocket.external = {
        info: watchId => { return dispatcher('info', watchId); },
        load: watchId => { return dispatcher('load', watchId); },
        getFavStatus: (watchId) => { return dispatcher('fav-status', watchId); },
        observe: (params /*{query, container, closest}*/) => { initNg(params); },
        hide: () => {
          hoverMenu.hide();
          infoView.hide();
        }
      };

      MylistPocket.isReady = true;

      const ev = new CustomEvent('MylistPocketInitialized', { detail: { MylistPocket } });
      document.body.dispatchEvent(ev);
      // 過去の互換用
      if (window.jQuery) {
        window.jQuery('body').trigger('MylistPocketReady', MylistPocket);
      }
    };


    const QueueLoader = (() => {
      let lastPromise = null;
      let count = 0;
      const MAX_LOAD = 6;
      const promises = [];

      const load = function(watchId, item) {
        count = (count + 1) % MAX_LOAD;
        lastPromise = promises[count];
        
        //console.time('load-' + watchId);
        const onLoad = (result) => {
          //console.timeEnd('load-' + watchId);
          if (item) {
            watchId = (result.data.id || '').startsWith('so') ? result.data.id : watchId;
            item.setAttribute('data-watch-id', watchId);
            item.setAttribute('data-thumb-info', JSON.stringify(result));
          }
          const sleepTime = result.data.fromCache ? 0 : 50;
          return (util.getSleepPromise(sleepTime,  'success-' + watchId))(result);
        };
        const onFail = util.getSleepPromise(1000, 'fail-'    + watchId);

        if (!lastPromise) {
          if (item) { item.classList.add('is-ng-current'); }
          lastPromise = ThumbInfoLoader.load(watchId).then(onLoad, onFail);
        } else {
          //lastPromise = Promise.all([lastPromise]).then(() => {
          lastPromise = Promise.race(promises).then(() => {
            if (item) { item.classList.add('is-ng-current'); }
            return ThumbInfoLoader.load(watchId).then(onLoad, onFail);
          });
        }

        promises[count] = lastPromise;
        return lastPromise;
      };

      return {
        load
      };
    })();

    const getNgEnv = () => {
      if (location.host === 'www.nicovideo.jp' &&
         (location.pathname.startsWith('/ranking') ||
          location.pathname.startsWith('/tag')     ||
          location.pathname.startsWith('/search'))
      ) {
        return {
          query: '.item[data-video-id]:not(.is-ng-wait), .item_cell[data-video-id]:not(.is-ng-wait)',
          container: document.querySelector('.column.main, .container.column1024-0')
        };
      }
      if (location.host === 'www.nicovideo.jp' &&
          document.querySelector('#MyPageNicorepoApp, #UserPageNicorepoApp')) {
        return {
          query: 'a[href*="/watch/"]:not(.is-ng-wait)',
          container: document.querySelector('#MyPageNicorepoApp, #UserPageNicorepoApp'),
          closest: '.log'
        };
      }

      if (location.host === 'ch.nicovideo.jp' &&
          location.pathname.startsWith('/search')) {
        return {
          query: '.item:not(.is-ng-wait)',
          container: document.querySelector('.site_body')
        };
      }

      if (location.host === 'search.nicovideo.jp') {
        return {
          query: '.video:not(.is-ng-wait)',
          container: document.querySelector('#row-results')
        };
      }


      return {query: null, container: null};
    };

    const initNgConfig = () => {
      const ngConfig = config.namespace('ng');
      const updateEnable = v => { document.body.classList.toggle('is-ng-disable', !v); };
      updateEnable(ngConfig.getValue('enable'));
      if (!ngConfig.getValue('enable')) { return {}; }
      ngConfig.on('enable', updateEnable);

      const favConfig = config.namespace('fav');
      return {ngConfig, favConfig};
    };

    const initNgChecker = ({ngConfig, favConfig}) => {
      const ngChecker = new NgChecker({
        word:  ngConfig.getValue('word'),
        tag:   ngConfig.getValue('tag'),
        owner: ngConfig.getValue('owner')
      });

      ngConfig.on('@update', _.debounce(({key, value}) => {
        //console.info('ngConfig updated: ', key, value);
        ngChecker.init({
          word:  ngConfig.getValue('word'),
          tag:   ngConfig.getValue('tag'),
          owner: ngConfig.getValue('owner')
        });
      }, 100));


      const favChecker = new MatchChecker({
        word:  favConfig.getValue('word'),
        tag:   favConfig.getValue('tag'),
        owner: favConfig.getValue('owner')
      });

      favConfig.on('@update', _.debounce(({key, value}) => {
        //console.info('favConfig updated: ', key, value);
        favChecker.init({
          word:  favConfig.getValue('word'),
          tag:   favConfig.getValue('tag'),
          owner: favConfig.getValue('owner')
        });
      }, 100));

       return {ngChecker, favChecker};
    };

    const initIntersectionObserver = (onInview) => {

      const onItemInview = item => {
        let watchId = item.getAttribute('data-id') ||
          item.getAttribute('data-video-id') ||
          item.getAttribute('data-watch-id');
        const ignore = () => {
          item.classList.add('is-ng-ignore');
        };
        if (!watchId) {
          const a = item.querySelector("a[href*='watch/']");
          if (!a) { return ignore(); }
          if (a.hostname !== 'www.nicovideo.jp') { return ignore(); }
          if (!/^\/watch\/([a-z0-9]+)/.test(a.pathname)) { return ignore(); }
          watchId = RegExp.$1;
        }

        if (!watchId) { return ignore(); }

        item.classList.add('is-ng-queue');
        onInview(item, watchId);
      };

      const intersectionObserver = new window.IntersectionObserver(entries => {
        entries.filter(entry => entry.isIntersecting).forEach(entry => {
          const item = entry.target;
          intersectionObserver.unobserve(item);
          onItemInview(item);
        });
      }, { rootMargin: '400px'});

      return intersectionObserver;
    };

    const initNgDom = ({intersectionObserver, query, closest, container}) => {

      if (!container) { return; }
      util.addStyle(__ng_css__);

      const update = () => {
        let items = (container || document).querySelectorAll(query);
        if (!items || items.length < 1) { return; }
        if (closest) {
          let tmp = [];
          Array.from(items).forEach(item => {
            const c = item.closest(closest);
            if (c && !tmp.includes(c)) {
              tmp.push(c);
            }
          });
          items = tmp;
        }
        if (!items || items.length < 1) { return; }
        Array.from(items).forEach(item => {
          //if (item.offsetLeft < 0) { return; }
          if (item.classList.contains('is-ng-ignore')) { return; }
          item.classList.add('is-ng-wait');
          intersectionObserver.observe(item);
        });
      };
      update();

      const onUpdate = _.throttle(update, 1000);

      if (!container) { return; }
      const mutationObserver = new window.MutationObserver((mutations) => {
        let isAdded = false;
        mutations.forEach(mutation => {
          if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            isAdded = true;
          }
        });
        if (isAdded) { onUpdate(); }
      });

      mutationObserver.observe(
        container,
        {childList: true, characterData: false, attributes: false, subtree: true}
      );
    };

    const initNg = params => {
      if (!window.IntersectionObserver) { return; }

      let {query, container, closest} = params ? params : getNgEnv();

      if (!query) { return; }

      const {ngConfig, favConfig} = initNgConfig();
      if (!ngConfig) { return; }

      const {ngChecker, favChecker} = initNgChecker({ngConfig, favConfig});

      const onItemInview = (item, watchId) => {

        const loadLazy = () => {
          const lazyImage = item.querySelector('.jsLazyImage');
          if (lazyImage) {
            const origImage = lazyImage.getAttribute('data-original');
            if (origImage) {
              lazyImage.src = origImage;
              lazyImage.classList.remove('jsLazyImage');
            }
          }
        };

        QueueLoader.load(watchId, item).then(
          (result) => {
            item.classList.remove('is-ng-current');
            if (!result || !result.data || result.data.status === 'fail' || result.data.code === 'DELETED') {
              if (result && result.data && result.data.code !== 'COMMUNITY') {
                console.error('empty data', watchId, result, result.data ? result.data.code : 'unknown');
              }
              item.classList.add('is-ng-failed', (result && result.data) ? result.data.code : 'is-no-data');
            } else {
              item.classList.add(
                ngChecker.isNg(result.data) ? 'is-ng-rejected' : 'is-ng-resolved');
              if (favChecker.isMatch(result.data)) {
                item.classList.add('is-fav-favorited');
              }

              // console.info('img', item, item.querySelectorAll('img, .videoThumbnail.preview'));
              for (let img of item.querySelectorAll('img.videoThumbnail.preview')) {
                img.src = result.data.thumbnail;
              }

              let label = item.querySelector('.label');
              item.dataset.title = result.data.title;
              // チャンネル動画のリンクを watch/so〜 に置き換える
              if (!(result.data.id || '').startsWith('so')) { return; }
              if (label &&
                  item.classList.contains('videoLink')
              ) {
                label.textContent = result.data.id;
                item.dataset.param = item.dataset.videoId = result.data.id;
                item.href = `https://www.nicovideo.jp/watch/${result.data.id}`;
              }
              for (let a of item.querySelectorAll(`a[href*="watch/${watchId}"]`)) {
                let href = a.getAttribute('href');
                href = href.replace(/watch\/([0-9]+)/, `watch/${result.data.id}`);
                a.setAttribute('href', href.replace(/^http:/, 'https:'));
              }
            }

            loadLazy();
          },
          () => {
            item.classList.remove('is-ng-current');
            item.classList.add('is-ng-failed');
            loadLazy();
          }
        );
      };

      const intersectionObserver = initIntersectionObserver(onItemInview);

      initNgDom({intersectionObserver, query, container, closest});

      return intersectionObserver;
    };

    const init = () => {
      initDom();
      initZenzaBridge();

      const infoView = createVideoInfoView();
      const dispatcher = createCommandDispatcher({infoView});

      infoView.on('command', dispatcher);

      const hoverMenu = new HoverMenu();
      hoverMenu.on('info', (watchId) => {
        hoverMenu.isBusy = true;

        dispatcher('info', watchId)
          .then(() => { hoverMenu.isBusy = false; });
      });
      hoverMenu.on('deflist-add', (watchId, src) => {
        dispatcher('deflist-add', watchId, src);
      });
      hoverMenu.on('deflist-remove', (watchId, src) => {
        dispatcher('deflist-remove', watchId, src);
      });
      hoverMenu.on('playlist-queue', (watchId, src) => {
        dispatcher('playlist-queue', watchId, src);
      });
      MylistPocket.debug.hoverMenu = hoverMenu;

      initNg();

      if (config.getValue('nicoad.hide')) {
        util.addStyle(nicoadHideCss);
      }

      initExternal(dispatcher, hoverMenu, infoView);
    };

    init();
  };

  const postToParent = function(type, message, token) {
    const origin = document.referrer;
    //console.info('postToParent type=%s, message=%s, token=%s, origin=%s',
    //  type, message, token, origin);
    try {
      parent.postMessage(JSON.stringify({
          id: PRODUCT,
          type: type,
          body: {
            token: token,
            url: location.href,
            message: message
          }
        }),
        origin);
    } catch (e) {
      alert(e);
      console.log('err', e);
    }
  };

  const parseUrl = (url) => {
    const a = document.createElement('a');
    a.href = url;
    return a;
  };

  const HOST_REG = /^([a-z0-9]*\.nicovideo\.jp|www\.google\.com|www\.google\.co\.jp|www\.bing\.com|[a-z0-9A-Z-]+\.slack\.com|friends\.nico|feedly\.com)$/;
  const thumbInfoApi = function() {
    if (window.name.indexOf('thumbInfo' + PRODUCT + 'Loader') < 0 ) { return; }
    window.console.log(
      '%cCrossDomainGate: %s %s',
      'background: lightgreen;',
      PRODUCT,
      location.host);

    if (!HOST_REG.test(parseUrl(document.referrer).hostname)) {
      return;
    }

    const type = 'thumbInfo' + PRODUCT;
    const token = location.hash ? location.hash.substr(1) : null;
    window.history.replaceState(null, null, location.pathname);

    window.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      let timeoutTimer, isTimeout = false;

      if (!HOST_REG.test(parseUrl(event.origin).hostname)) {
        window.console.log('unknown host', event.origin);
        return; }

      if (data.token !== token) {
        // window.console.log('unknown token', event.origin, data.token, token, data.url);
        return; }
      //window.console.log('child onMessage', data, event);


      if (!data.url) { return; }
      const u = parseUrl(data.url);
      if (!u.hostname.startsWith('ext.nicovideo.jp') || !u.pathname.startsWith('/api/getthumbinfo/')) {
        return;
      }
      const sessionId = data.sessionId;
      fetch(data.url).then((resp) => {
        return resp.text();
      }).then((text) => {
        if (isTimeout) { return; }
        else { window.clearTimeout(timeoutTimer); }

        try {
          postToParent(type, {
            sessionId: sessionId,
            status: 'ok',
            token: token,
            url: data.url,
            body: text
          });
        } catch (e) {
          console.log(
            '%cError: parent.postMessage - ',
            'color: red; background: yellow',
            e, event.origin, event.data);
        }
      });

      timeoutTimer = window.setTimeout(() => {
        isTimeout = true;
        postToParent(type, {
          sessionId: sessionId,
          status: 'timeout',
          command: 'loadUrl',
          url: data.url
        });
      }, 30000);

    });

    try {
      postToParent(type, { status: 'initialized' });
    } catch (e) {
      console.log('err', e);
    }
  };


  const loadGm = function() {
    const script = document.createElement('script');
    script.id = `${PRODUCT}Loader`;
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('charset', 'UTF-8');
    script.appendChild(document.createTextNode( '(' + monkey + ')("' + PRODUCT + '");' ));
    document.body.appendChild(script);
  };


  const host = window.location.host || '';
  //const href = (location.href || '').replace(/#.*$/, '');
  //const prot = location.protocol;
  if (host === 'ext.nicovideo.jp' &&
      window.name.indexOf('thumbInfo' + PRODUCT + 'Loader') >= 0) {
    thumbInfoApi();
  } else if (window === top) {
    loadGm();
  }
})();
