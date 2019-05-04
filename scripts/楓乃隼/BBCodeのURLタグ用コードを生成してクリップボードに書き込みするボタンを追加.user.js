// ==UserScript==
// @name BBCodeのURLタグ用コードを生成してクリップボードに書き込みするボタンを追加
// @namespace Hayabusa
// @description  トピック上部に、BBCodeのURLタグ用コードを生成してクリップボードに書き込みするボタンを追加します。
// @include http://forum.minecraftuser.jp/viewtopic.php*
// @include https://forum.minecraftuser.jp/viewtopic.php*
// @version 1.1.0
// @grant none
// @license https://creativecommons.org/licenses/by-nc/4.0/
// ==/UserScript==

  var opencode_start = "[url=";
  var opencode_end = "]";
  var endcode = "[/url]";
  var url = window.location.href;
  var title = document.title;
  var newtitle = title.replace(/ • Minecraft非公式日本ユーザーフォーラム/g, "");

  var textarea = document.getElementById("message");
  var completed_code = opencode_start + url + opencode_end + newtitle + endcode;

  var copy = function(txt) {
    console.log("世界一かわいいアイドル 多田李衣菜は俺の嫁");
    //console.log(newtitle);
    var e = document.createElement('textarea');
    e.id = "dammy-textarea-forum";
    e.textContent = txt;
    var b = document.getElementsByTagName('body').item(0);
    b.appendChild(e);
    e.select();
    var copytxt = document.execCommand('copy');
    //console.log(copytxt);
    console.log(e.value);

    b.removeChild(e);
    return copytxt;
    }
    //copy(completed_code);

  var bu = document.createElement("input");
  bu.type = "button";
  bu.value = "[url]用コード生成";
  bu.class = "debug_button";
  bu.onclick = function() {
      copy(completed_code);
  };
  var topic_actions = document.getElementsByClassName("topic-actions");
  var upper_topic_actions = topic_actions[0];
  //console.log(upper_topic_actions);
  upper_topic_actions.appendChild(bu);
  //bu.click();
  //console.log("clicked");
