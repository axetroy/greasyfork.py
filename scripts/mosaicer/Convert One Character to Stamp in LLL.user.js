// ==UserScript==
// @name        Convert One Character to Stamp in LLL
// @namespace   https://github.com/mosaicer
// @author      mosaicer
// @description LLLにおける入力補助機能を提供する
// @match       http://*.reddit.com/r/lowlevelaware/comments/*
// @match       https://*.reddit.com/r/lowlevelaware/comments/*
// @match       https://*.reddit.com/r/lowlevelaware/submit*
// @version     2.0
// @run-at      document-end
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==
(function () {
  'use strict';

      /**
        スタンプ一覧(2015/06/18)
        対応が怪しいもの：3点リーダー，音符マーク，読点，句読点，波線，ばつ印，
        その他の複数文字で一つのスタンプを表すもの
        複数文字について：前後に半角空白を付けることで判定するようにした

        更新(2015/08/29)
        数字を追加．全角と半角の両方に対応
      */
  var STAMP_MAP = {
        'あ': '[](#a)', 'い': '[](#i)', 'う': '[](#u)', 'え': '[](#e)',
        'お': '[](#o)', 'か': '[](#ka)', 'き': '[](#ki)', 'く': '[](#ku)',
        'け': '[](#ke)', 'こ': '[](#ko)', 'さ': '[](#sa)', 'し': '[](#si)',
        'す': '[](#su)', 'せ': '[](#se)', 'そ': '[](#so)', 'た': '[](#ta)',
        'ち': '[](#ti)', 'つ': '[](#tu)', 'て': '[](#te)', 'と': '[](#to)',
        'な': '[](#na)', 'に': '[](#ni)', 'ぬ': '[](#nu)', 'ね': '[](#ne)',
        'の': '[](#no)', 'は': '[](#ha)', 'ひ': '[](#hi)', 'ふ': '[](#hu)',
        'へ': '[](#he)', 'ほ': '[](#ho)', 'ま': '[](#ma)', 'み': '[](#mi)',
        'む': '[](#mu)', 'め': '[](#me)', 'も': '[](#mo)', 'や': '[](#ya)',
        'ゆ': '[](#yu)', 'よ': '[](#yo)', 'ら': '[](#ra)', 'り': '[](#ri)',
        'る': '[](#ru)', 'れ': '[](#re)', 'ろ': '[](#ro)', 'わ': '[](#wa)',
        'を': '[](#wo)', 'ん': '[](#n)', '…': '[](#santen)',
        '♪': '[](#onpumark)', '「': '[](#kakko)', '」': '[](#kakkotoji)',
        '！': '[](#exmark)', '!': '[](#exmark)', '？': '[](#hatenamark)',
        '?': '[](#hatenamark)', '、': '[](#touten)', '。': '[](#kutouten)',
        '，': '[](#touten)', '．': '[](#kutouten)', 'が': '[](#ka)[](#dakuten)',
        'ぎ': '[](#ki)[](#dakuten)', 'ぐ': '[](#ku)[](#dakuten)',
        'げ': '[](#ke)[](#dakuten)', 'ご': '[](#ko)[](#dakuten)',
        'ざ': '[](#sa)[](#dakuten)', 'じ': '[](#si)[](#dakuten)',
        'ず': '[](#su)[](#dakuten)', 'ぜ': '[](#se)[](#dakuten)',
        'ぞ': '[](#so)[](#dakuten)', 'だ': '[](#ta)[](#dakuten)',
        'ぢ': '[](#ti)[](#dakuten)', 'づ': '[](#tu)[](#dakuten)',
        'で': '[](#te)[](#dakuten)', 'ど': '[](#to)[](#dakuten)',
        'ば': '[](#ha)[](#dakuten)', 'び': '[](#hi)[](#dakuten)',
        'ぶ': '[](#hu)[](#dakuten)', 'べ': '[](#he)[](#dakuten)',
        'ぼ': '[](#ho)[](#dakuten)', 'ぱ': '[](#ha)[](#handakuten)',
        'ぴ': '[](#hi)[](#handakuten)', 'ぷ': '[](#hu)[](#handakuten)',
        'ぺ': '[](#he)[](#handakuten)', 'ぽ': '[](#ho)[](#handakuten)',
        'ぁ': '[](#as)', 'ぃ': '[](#is)', 'ぅ': '[](#us)', 'ぇ': '[](#es)',
        'ぉ': '[](#os)', 'っ': '[](#tus)', 'ゃ': '[](#yas)', 'ゅ': '[](#yus)',
        'ょ': '[](#yos)', '〜': '[](#nyoro)', 'ー': '[](#bou)',
        '×': '[](#batu)', 'L': '[](#elu)', 'Ｌ': '[](#elu)',
        ' ちんこ ': '[](#chin)', ' はつでん ': '[](#hatuden)',
        ' すのー ': '[](#snoo)', ' うんこ ': '[](#unkoji)',
        ' はーと ': '[](#heartmark)', '0': '[](#su0)', '1': '[](#su1)',
        '2': '[](#su2)', '3': '[](#su3)', '4': '[](#su4)', '5': '[](#su5)',
        '6': '[](#su6)', '7': '[](#su7)', '8': '[](#su8)', '9': '[](#su9)',
        '０': '[](#su0)', '１': '[](#su1)', '２': '[](#su2)', '３': '[](#su3)',
        '４': '[](#su4)', '５': '[](#su5)', '６': '[](#su6)', '７': '[](#su7)',
        '８': '[](#su8)', '９': '[](#su9)'
      },
      // ボタンのクラス名とか
      STAMP_CONVERT_CLASS = 'lll-stamp-converter',
      COMMAND_CLASS = 'lll-command-btn',
      STAMP_BTN_CLASS = 'lll-stamp-displayer',
      STAMP_SHADOW_CLASS = 'lll-stamp-shadow',
      STAMP_CLASS = 'lll-stamp',
      FAV_STAMP_CLASS = 'lll-fav-stamp',
      STAMP_DIALOG_ID = 'lll-stamp-dialog',
      PROGRESS_DIALOG_CLASS = 'lll-progress-dialog',
      TAB_BUTTON_CLASS = 'lll-tab-button',
      TABS_AREA_ID = 'lll-tab-area',
      TAB_CLASS = 'lll-tab',
      TD_COMMAND_CLASS = 'lll-td-command',
      A_COMMAND_CLASS = 'lll-a-command',
      // 保存するデータのキー
      DATA_KEY = 'lll_fav_stamp_key',
      // 保存する際の区切り文字
      SPLIT_WORD = ',/',
      // 面倒なのでpreg_quote関数をphpjsから拝借
      preg_quote = function (str, delimiter) {
        //  discuss at: http://phpjs.org/functions/preg_quote/
        // original by: booeyOH
        // improved by: Ates Goral (http://magnetiq.com)
        // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: Brett Zamir (http://brett-zamir.me)
        // bugfixed by: Onno Marsman
        return String(str).replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
      },
      // 各ボタンを生成する関数
      generateButtons = function (targetNode) {
        var convertButton = document.createElement('button'),
            commandButton = document.createElement('button'),
            stampButton = document.createElement('button'),
            commandDiv = commandField.cloneNode(true);

        // 変換ボタン
        convertButton.textContent = 'convert';
        convertButton.setAttribute('class', STAMP_CONVERT_CLASS);
        // テキストを送信しないようにリターンする
        convertButton.setAttribute('onclick', 'return false;');
        // 保存ボタンの右に変換を挿入
        targetNode.insertBefore(convertButton, targetNode.childNodes[1]);

        // 震わせるボタン
        commandButton.textContent = 'command';
        commandButton.setAttribute('class', COMMAND_CLASS);
        commandButton.setAttribute('onclick', 'return false;');
        targetNode.insertBefore(commandButton, convertButton.nextSibling);

        // スタンプボタン
        stampButton.textContent = 'stamp';
        stampButton.setAttribute('class', STAMP_BTN_CLASS);
        stampButton.setAttribute('onclick', 'return false;');
        targetNode.insertBefore(stampButton, commandButton.nextSibling);

        // コマンドHTML部分を挿入
        targetNode.parentNode.appendChild(commandDiv);
      },
      // 一文字系スタンプに変換する関数
      convertStrToOneStamp = function (targetNode) {
        var bottomArea = targetNode.parentNode.parentNode,
            textBox = bottomArea.previousSibling.getElementsByTagName('textarea')[0],
            livePreview = bottomArea.nextSibling.nextSibling.childNodes[1],
            text = textBox.value,
            textLength = text.length,
            // 複数文字をチェックするオブジェクト
            checkPluralObj = {
              'single': '',
              'plural': ''
            },
            // 最後にテキストボックスに出力する文字列
            output = '',
            // 一時的に文字列を保存しておく変数
            subStr,
            i;

        // 一文字ずつチェックしていく
        for (i = 0; i < textLength; i++) {
          subStr = text.substring(i, i + 1);

          /**
            半角空白だったら複数文字の可能性があるのでチェック
            2つ目の条件は複数文字のチェック中は常にここを通過するため
          */
          if (subStr === ' ' || !!checkPluralObj.plural) {
            // 半角空白が次に来るまで記録する
            checkPluralObj.plural += subStr;
          }

          // 対応するスタンプがあれば格納しなおす
          if (!!STAMP_MAP[subStr]) {
            subStr = STAMP_MAP[subStr];
          }
          // 複数文字のチェック中の場合
          if (!!checkPluralObj.plural) {
            // 出力に加える用の文字を別の値に記憶していく
            checkPluralObj.single += subStr;
          }

          // 出力に加える
          output += subStr;

          // 前後に半角空白がある場合＝複数文字のチェックが終わった場合
          if (/.+ $/.test(checkPluralObj.plural)) {
            // 対応するスタンプを取得
            subStr = STAMP_MAP[checkPluralObj.plural];
            // スタンプがあれば，出力用の文字列と入れ替える
            if (!!subStr) {
              output = output.replace(
                new RegExp(preg_quote(checkPluralObj.single)), subStr
              );
            }

            // チェック用のオブジェクトの値をリセットして次に備える
            checkPluralObj.plural = checkPluralObj.single = '';
          }
        }

        // できた文字列をテキストボックスにセット
        textBox.value = output;

        // プレビューがあればそこにもセット
        if (!!livePreview && !!livePreview.childNodes[0]) {
          if (/<("[^"]*"|'[^']*'|[^'">])*>/g.test(output)) {
            alert('HTMLタグが使われている可能性があるため，ライブプレビューには反映しません');
          } else {
            livePreview.childNodes[0].innerHTML = output.replace(
              /\[\]\((#[a-z0-9]+)\)/g, '<a href="$1"></a>'
            );
          }
        }
      },
      // ダイアログを表示する関数
      displayStamps = function () {
        // スタンプがあればスタンプ一覧を表示
        if (!!Object.keys(stampListMap).length) {
          stampDialog.style.display = 'block';
        }
        // スタンプをまだ取得していな場合
        else {
          // プログレスダイアログに変更
          stampDialog.textContent = '情報を取得しています…';
          stampDialog.setAttribute('class', PROGRESS_DIALOG_CLASS);
          // ダイアログを表示
          stampDialog.style.display = 'block';
          // スタンプを取りに行く
          fetchStamps();
        }
      },
      // スタンプを取得する
      fetchStamps = function () {
        GM_xmlhttpRequest({
          method: 'GET',
          url: document.querySelector(
            'link[title="applied_subreddit_stylesheet"]'
            ).getAttribute('href'),
          onload: function (responseDetails) {
            // スタンプ一覧を生成する
            generateStamps(responseDetails.responseText);
          },
          onerror: function (responseDetails) {
            // ダイアログを消す
            stampDialog.style.display = 'none';

            alert('スタイルシートの取得に失敗しました．詳しくはJSコンソールでログをご確認ください．');

            console.error('An error occurred.\nresponseText: ' +
              responseDetails.responseText + '\nreadyState: ' +
              responseDetails.readyState + '\nresponseHeaders: ' +
              responseDetails.responseHeaders + '\nstatus: ' +
              responseDetails.status + '\nstatusText: ' +
              responseDetails.statusText + '\nfinalUrl: ' +
              responseDetails.finalUrl);
          }
        });
      },
      // スタンプ一覧を生成
      generateStamps = function (stylesheetText) {
            // 普通の画像スタンプのポジション番号を配列で格納
        var normalPosArray = stylesheetText.match(/a\[href\$="\-\d+"\]/g)
                .map(function (stamp) {
                  return stamp.match(/\d+/)[0];
                }),
            // アニメーションスタンプの番号を多次元配列で格納
            animPosArray = [],
            // 位置を指定する
            index = -1;

        // アニメーションスタンプの番号を処理
        stylesheetText.match(/a\[href\$="#stmp\-ani\d+\-[a-z]\d+"\]/g)
            .map(function (stamp) {
              // a01, a02, ...
              return stamp.match(/[a-z]\d+/g)[1];
            })
            .forEach(function (pos) {
              // a01とかb01とか各最初の番号が来た場合
              if (/[a-z]01/.test(pos)) {
                // 位置を進める
                index++;
                // 新たに配列を入れる
                animPosArray.push([]);
              }
              // 指定した位置の配列に番号を格納
              animPosArray[index].push(pos);
            });

        // 値を元に戻す
        index = 0;

        // 普通のスタンプ＆アニメーションスタンプを処理
        stylesheetText.match(/a\[href\*="#stmp\-[^\-]+\-"\]/g)
          .forEach(function (command) {
                // #stmp-01-, ...
            var stamp = command.split('"')[1];

            // アニメーションのスタンプだった場合（aniだけが頼り）
            if (/a\[href\*="#stmp\-ani\d+\-"\]/.test(command)) {
              // キーはそれっぽいやつ，値はその全スタンプをくっつけたもの
              stampListMap[command.split('-')[1]] =
                animPosArray[index].map(function (pos) {
                  return '<a href="' + stamp + pos + '" class="' +
                    STAMP_CLASS + '" onclick="return false;"></a>';
                }).join('');
              // 位置を進める
              index++;
            }
            // 普通のスタンプだった場合
            else {
              // キーはそれっぽいやつ，値はその全スタンプをくっつけたもの
              stampListMap[command.split('-')[1]] =
                normalPosArray.map(function (pos) {
                  return '<a href="' + stamp + pos + '" class="' +
                    STAMP_CLASS + '" onclick="return false;"></a>';
                }).join('');
            }
          });

        // 普通の処理で取れるスタンプを処理
        // ドット，一文字，おみくじ，じゃんけん
        stampListMap['その他'] = stylesheetText
            .match(/a\[href="#.*?"\]/g)
            .filter(function (element, index, array) {
              return array.indexOf(element) === index;
            })
            .map(function (stamp) {
              return '<a href="' + stamp.split('"')[1] + '" class="' +
                STAMP_CLASS + '" onclick="return false;"></a>';
            }).join('');

        // タブメニューのセット
        setTabMenu();
      },
      // タブのメニューをセットする
      setTabMenu = function () {
        var tabs = document.createElement('p'),
            tabButton = document.createElement('a'),
            tab = document.createElement('div'),
            index = 2,
            key;

        // ダイアログをリセット
        stampDialog.innerHTML = '';

        // お気に入りのタブのボタンを追加
        tabButton.setAttribute('href', '#tab1');
        tabButton.setAttribute('class', TAB_BUTTON_CLASS);
        tabButton.setAttribute('onclick', 'return false;');
        tabButton.textContent = 'favorite';
        tabs.appendChild(tabButton);
        // お気に入りタブの本体を追加
        tab.setAttribute('id', 'tab1');
        tab.setAttribute('class', TAB_CLASS);
        tab.innerHTML = favoriteStamps.map(function (stamp) {
            return '<a href="' + stamp + '" class="' + FAV_STAMP_CLASS +
                '" onclick="return false;"></a>';
            }).join('');
        // お気に入りのタブを追加
        stampDialog.appendChild(tab);

        // 各スタンプ群でタブを構成し追加する
        for (key in stampListMap) {
          if (stampListMap.hasOwnProperty(key)) {
            // タブのボタンを追加
            tabButton = document.createElement('a');
            tabButton.setAttribute('href', '#tab' + index);
            tabButton.setAttribute('class', TAB_BUTTON_CLASS);
            tabButton.setAttribute('onclick', 'return false;');
            tabButton.textContent = key;
            tabs.appendChild(tabButton);

            // タブの本体を追加
            tab = document.createElement('div');
            tab.setAttribute('id', 'tab' + index);
            tab.setAttribute('class', TAB_CLASS);
            tab.innerHTML = stampListMap[key];
            stampDialog.appendChild(tab);

            index++;
          }
        }

        // タブのボタンエリアをダイアログの最初に追加
        tabs.setAttribute('id', TABS_AREA_ID);
        stampDialog.insertBefore(tabs, stampDialog.firstChild);

        // プログレス用のクラスを削除
        stampDialog.removeAttribute('class');

        // 初期のタブをセット
        changeTab('tab1');
      },
      // タブを切り替える
      changeTab = function (tabName) {
        // 全タブを消す
        [].forEach.call(
          document.querySelectorAll('.' + TAB_CLASS), function (targetNode) {
            targetNode.style.display = 'none';
          }
        );
        // 全ボタンのテキストカラーを元に戻す
        [].forEach.call(document.querySelectorAll('.' + TAB_BUTTON_CLASS),
          function (targetNode) {
            targetNode.style.color = '#666';
          }
        );

        // 押したタブを表示する
        document.getElementById(tabName).style.display = 'block';
        // 押したタブボタンのテキストカラーを変える
        document.querySelector('[href="#' + tabName + '"]').style.color =
          'goldenrod';
      },
      // 指定されたスタンプを挿入する関数
      insertStamp = function (command) {
            // テキストボックスを取得
        var textBox = targetStampButton.parentNode.parentNode.previousSibling
          .getElementsByTagName('textarea')[0];

        // テキストボックスにスタンプを追加
        textBox.value = textBox.value + '[](' + command + ')';
      },
      fetchCommands = function () {
        GM_xmlhttpRequest({
          method: 'GET',
          url: 'https://www.reddit.com/r/lowlevelaware/wiki/command.json',
          onload: function (responseDetails) {
            // コマンドHTMLを生成するぞ〜
            generateCommandHtml(
              // JSONにパースするぞ〜
              JSON.parse(responseDetails.responseText).data.content_html
                // エスケープされてるから元に戻すぞ〜
                .replace(/(&lt;)/g, '<')
                .replace(/(&gt;)/g, '>')
                .replace(/(&quot;)/g, '"')
                .replace(/(&#39;)/g, "'")
                .replace(/(&amp;)/g, '&')
            );
          },
          onerror: function (responseDetails) {
            alert('データの取得に失敗しました．詳しくはJSコンソールでログをご確認ください．');

            console.error('An error occurred.\nresponseText: ' +
              responseDetails.responseText + '\nreadyState: ' +
              responseDetails.readyState + '\nresponseHeaders: ' +
              responseDetails.responseHeaders + '\nstatus: ' +
              responseDetails.status + '\nstatusText: ' +
              responseDetails.statusText + '\nfinalUrl: ' +
              responseDetails.finalUrl);
          }
        });
      },
      generateCommandHtml = function (contentHtml) {
        var commandHtmlMap = {},
            titleArray = [],
            htmlArray,
            i,
            l;

        // タイトル部分を抜き出してタグを除去して配列に格納するぞ〜
        contentHtml.match(/<h2 id="wiki_\..*?">.*?<\/h2>/g)
          .map(function (titleHtml) {
            return titleHtml.replace(/<\/?.*?>/g, '');
          })
          .forEach(function (title) {
            titleArray.push(title);
          });

        // タイトルに対応するHTML部分を配列に格納するぞ〜
        htmlArray = contentHtml.split(/<h2 id="wiki_\..*?">.*?<\/h2>/)
          .map(function (html) {
            // TDタグとAタグにクラスをつけてリスナーでクリックイベントを受け取れるようにするぞ〜
            return html.replace(/(<a href=".*?")/g,
              '$1 onclick="return false;" class="' + A_COMMAND_CLASS + '"')
              .replace(/(<td)/g, '$1 class="' + TD_COMMAND_CLASS + '"');
          });

        // キーがタイトル，値がHTMLソースだぞ〜
        for (i = 0, l = titleArray.length; i < l; i++) {
          commandHtmlMap[titleArray[i]] = htmlArray[i + 1];
        }

        commandHtmlMap = getCommandMenu(commandHtmlMap);

        // あとはボタンを生成するタイミングでコマンドHTMLも打ち込むぞ〜
        [].forEach.call(
          document.querySelectorAll('[class="usertext-buttons"]'), generateButtons
        );

        insertScriptTag(commandHtmlMap);
      },
      getCommandMenu = function (commandHtmlMap) {
        var commandDiv = document.createElement('div'),
            selectBox = document.createElement('select'),
            htmlDiv = document.createElement('div'),
            key,
            optionTag;

        commandDiv.style.display = 'none';

        selectBox.style.marginBottom = '15px';
        selectBox.setAttribute('class', 'lll-select-box');

        for (key in commandHtmlMap) {
          if (commandHtmlMap.hasOwnProperty(key)) {
            optionTag = document.createElement('option');
            optionTag.setAttribute('value', key);
            optionTag.textContent = key;
            selectBox.appendChild(optionTag);

            if (htmlDiv.childElementCount < 1) {
              htmlDiv.innerHTML = commandHtmlMap[key];
            }
          }
        }

        commandDiv.appendChild(selectBox);
        commandDiv.appendChild(htmlDiv);

        commandField = commandDiv;

        return commandHtmlMap;
      },
      insertScriptTag = function (commandHtmlMap) {
        var scriptTag = document.createElement('script'),
            str = JSON.stringify(commandHtmlMap).replace(/\\/g, '\\\\');

        scriptTag.setAttribute('type', 'text/javascript');
        scriptTag.textContent = '$(function() {\n' +
          '  var commandHtmlMap = JSON.parse(\'' + str + '\');\n' +
          '  $("[class=\'lll-select-box\']").change(function () {\n' +
          '    this.nextSibling.innerHTML = commandHtmlMap[this.value];\n' +
          '  });\n' +
          "});";

        document.getElementsByTagName('body')[0].appendChild(scriptTag);
      },
      applyCommandToText = function (command) {
        var bottomArea = commandToggleButtonTemp.parentNode.parentNode,
            textBox = bottomArea.previousSibling.getElementsByTagName('textarea')[0],
            str = textBox.value,
            strStart = textBox.selectionStart,
            strEnd = textBox.selectionEnd,
            rangeStr = str.slice(strStart, strEnd);

        // 選択文字列あり，もしくは選択の始まりと終わりが違う場合
        if (!!rangeStr || strStart !== strEnd) {
          textBox.value = str.slice(0, strStart) + '[' + rangeStr + '](' +
          command + ')' + str.slice(strEnd);
        }
        // 選択の始まりと終わりが同じ場合
        else if (strStart === strEnd) {
          textBox.value = str + '[](' + command + ')';
        }
      },
      addCustomStyle = function() {
        // スタンプを押した時の影
        GM_addStyle('.' + STAMP_SHADOW_CLASS + '{ box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.8); }');
        // ダイアログ用のスタイルを定義
        GM_addStyle('#' + STAMP_DIALOG_ID + ' { position: fixed; top: 10%; left: 10%; width: 80%; height: 80%; text-align: center; line-height: 25px; border: 1px solid gray; border-radius: 5px; box-shadow: 4px 4px 1px rgba(55, 55, 55, 0.3); z-index: 1; background-color: #fefefe; } ');
        // プログレスダイアログ用のスタイルを定義
        GM_addStyle('.' + PROGRESS_DIALOG_CLASS + ' { top: 50% !important; left: 35% !important; width: 15% !important; height: 50px !important; line-height: 50px !important; overflow: hidden !important; } ');

        /* --- ↓http://fukafuka295.jp/hp/hp_no8.html を改変↓ --- */

        /* ▼ タブ部分のマージンとパディング領域を設定 */
        GM_addStyle('#' + TABS_AREA_ID + ' { margin-left: 4px; margin-top: 4px; }');
        /* ▼ リンクをタブのように見せる */
        GM_addStyle('.' + TAB_BUTTON_CLASS + ' { display: block; width: 100px; float: left; margin: 0px 4px 4px 0px; padding: 3px; text-align: center; font-size:12px; text-decoration: none; background-color: #fafafa; border: 1px solid #dcdcdc; color: #666; font-weight: 600; }');
        GM_addStyle('#' + TABS_AREA_ID + ' a:hover { opacity: 0.7; filter: alpha(opacity=70); }');
        /* ▼ タブ中身のボックス */
        GM_addStyle('.' + TAB_CLASS + ' { height: 400px; clear: left; border-top: 2px solid #DDD; border-bottom: 2px solid #DDD; background-color: #fbfbfb; padding-top: 8px; overflow: auto; }');

        /* --- ↑http://fukafuka295.jp/hp/hp_no8.html を改変↑ --- */

        // TDタグのスタイル
        GM_addStyle('.' + TD_COMMAND_CLASS + ' { cursor: pointer; margin-right: 15px; }');

        // ダイアログを最前面にするため，他の高さを0にする
        GM_addStyle('.RESDialogSmall > h3 { z-index: 0 !important; } #sr-autocomplete-area { z-index: 0 !important; } ');
        // この要素群はスタイル変更が効かなかったので動的に変更
        [].forEach.call(document.querySelectorAll('[data-res-css]'),
          function (targetNode) {
            targetNode.style.zIndex = 0;
        });
      },
      // スタンプダイアログ
      stampDialog = document.createElement('div'),
      // スタンプ一覧
      stampListMap = {},
      // お気に入りのスタンプ
      favoriteStamps = [],
      // 長押し用のタイマー
      longClickTimer,
      // 直近のスタンプ表示ボタン
      targetStampButton,
      commandToggleButtonTemp,
      commandField;

  // 保存したデータを取得
  if (!!GM_getValue(DATA_KEY)) {
    favoriteStamps = GM_getValue(DATA_KEY).split(SPLIT_WORD);
  }

  // 独自のスタイルを適用
  addCustomStyle();

  // 全テキストボックス下部に各ボタンを挿入
  fetchCommands();

  // ダイアログを生成し非表示にしておく
  stampDialog.setAttribute('id', STAMP_DIALOG_ID);
  stampDialog.style.display = 'none';
  document.body.appendChild(stampDialog);

  /**
    各ボタンが押されたら押されたノードを渡して関数を実行
    ドキュメント全体にリスナをセットすることで後からの追加にも対応
  */
  document.addEventListener('click', function (e) {
    var targetNode = e.target,
        targetClass = targetNode.getAttribute('class');

    // 各ケースに引っかかったらダイアログを閉じる処理をスルーさせるためにreturnする
    switch (targetClass) {
      case STAMP_CONVERT_CLASS:
        convertStrToOneStamp(targetNode);
        return;
      case COMMAND_CLASS:
        commandToggleButtonTemp = targetNode;
        targetNode = targetNode.parentNode.parentNode;
        targetNode = targetNode.children[targetNode.childElementCount - 1];
        if (targetNode.style.display === 'none') {
          targetNode.style.display = 'block';
        } else {
          targetNode.style.display = 'none';
        }
        return;
      case TD_COMMAND_CLASS:
        if (/^[#\/].+/.test(targetNode.textContent)) {
          applyCommandToText(targetNode.textContent);
        }
        return;
      case A_COMMAND_CLASS:
        applyCommandToText(targetNode.getAttribute('href'));
        return;
      case TAB_BUTTON_CLASS:
        changeTab(targetNode.getAttribute('href').substring(1));
        return;
      case STAMP_BTN_CLASS:
        // 直近のスタンプ表示ボタンを格納
        targetStampButton = targetNode;
        displayStamps();
        return;
    }

    if (
      // ダイアログが出ていて，押したものがスタンプでもお気に入りのスタンプでもタブの中身でもない場合
      // スタンプとお気に入りのスタンプは後述のリスナーに任せる
      stampDialog.style.display === 'block' &&
      targetClass !== STAMP_CLASS &&
      targetClass !== FAV_STAMP_CLASS &&
      targetClass !== TAB_CLASS &&
      // ダイアログの中では消えてほしくないのでここでチェック
      (
        !!!targetNode.getAttribute('id') ||
        targetNode.getAttribute('id') !== STAMP_DIALOG_ID
      )
    ) {
      // ダイアログを消す
      stampDialog.style.display = 'none';
    }
  }, false);

  // 長押し判別用：押されたのを感知するリスナー
  document.addEventListener('mousedown', function (e) {
    var targetNode = e.target,
        targetClass = targetNode.getAttribute('class'),
        command = targetNode.getAttribute('href'),
        targetClassList = targetNode.classList;

    // スタンプ一覧のスタンプかお気に入りスタンプだった場合
    if (targetClass === STAMP_CLASS || targetClass === FAV_STAMP_CLASS) {
      // 対象のスタンプに影を付ける
      targetClassList.add(STAMP_SHADOW_CLASS);

      // タイマーをセット(500ミリ秒後に実行)
      longClickTimer = setTimeout(function() {
        // スタンプの影を消す
        targetClassList.remove(STAMP_SHADOW_CLASS);

        // スタンプ一覧のスタンプだったらそれを処理
        if (targetClass === STAMP_CLASS) {
          // 同じものだったら何もしない
          if (favoriteStamps.indexOf(command) > -1) {
            return;
          }
          favoriteStamps.push(command);
          // 一度出したダイアログの中身は変えないのでここで動的に追加
          document.getElementById('tab1').innerHTML += '<a href="' + command +
            '" class="' + FAV_STAMP_CLASS + '" onclick="return false;"></a>';
        }
        // お気に入りのスタンプだったらそれを削除
        else {
          favoriteStamps = favoriteStamps.filter(function (stamp) {
            return (stamp !== command);
          });
          // ダイアログからも削除
          targetNode.parentNode.removeChild(targetNode);
        }

        // 最終的な配列を区切り文字で区切って保存する
        GM_setValue(DATA_KEY, favoriteStamps.join(SPLIT_WORD));
      }, 500);
    }
  }, false);

  // 長押し判別用：離されたのを感知するリスナー
  document.addEventListener('mouseup', function (e) {
    var targetNode = e.target;

    // スタンプ一覧のスタンプかお気に入りスタンプだった場合
    if (targetNode.classList.contains(STAMP_SHADOW_CLASS)) {
      // スタンプの影を消す
      targetNode.classList.remove(STAMP_SHADOW_CLASS);
      // タイマーをクリアして長押しのイベントが実行されないようにする
      clearTimeout(longClickTimer);
      // ダイアログを消す
      stampDialog.style.display = 'none';
      // コマンドを渡す
      insertStamp(targetNode.getAttribute('href'));
    }
  }, false);
})();