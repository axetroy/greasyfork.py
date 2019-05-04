// ==UserScript==
// @name        Don't Seizi "lazy"
// @namespace   https://github.com/segabito/
// @version      0.3.2
// @description  ランキングの真ん中の政治の列を消すだけ
// @author       segabito macmoto
// @match        *://www.nicovideo.jp/ranking*
// @grant        none
// @run-at       document-start
// @noframes
// ==/UserScript==
/* jshint -W097 */
'use strict';

(function() {
 var css = `
header>ul>li:nth-child(3),
.matrix_float .category_row li:nth-child(3),
.item_row .item_cell:nth-child(3),
footer li:nth-child(3) {
 display: none;
}

.category_row li,
section.matrix li.item_row .item_cell {
  flex: 1;
  width: 20%;
}
section.matrix li.item_row .item_cell {
  {*height: 246px;*}
}

.inner,
.column1024-0 .main,
section.matrix,
.category_row,
section.matrix li.item_row
{
  width: 854px;
}

header .notice.banner,
.ad_row,
#web_pc_top {
  display: none !important;
}

section.matrix li.item_row.rank_1:after, section.matrix li.item_row.rank_2:after, section.matrix li.item_row.rank_3:after {
  width: 45px;
  height: 45px;
  margin-top: -22.5px;
  right: -58px;
  line-height: 45px;
  font-size: 36px;
  opacity: 1;
}
section.matrix li.item_row::after {
  position: absolute;
  content: counters(rank,"");
  top: 45px;
  margin-top: -15px;
  right: -43px;
  width: 30px;
  height: 30px;
  font-size: 24px;
  line-height: 30px;
  border-radius: 4px;
  background: #E5E8EA;
  color: #666;
  font-family: Impact;
  text-align: center;
  white-space: nowrap;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  opacity: 0.5;
}

section.matrix .item .itemTime .video_uploaded .time {
  display: inline !important;
}
section.matrix .item .itemTime .video_uploaded .time.new {
  display: none !important;
}

{*
section.matrix .item .itemContent .itemDescription {
  display: block !important;
  opacity: 1 !important;
}
*}

section.matrix .item_cell_empty:before {
  -webkit-animation: none !important;
  -moz-animation: none !imortant;
  animation: none !important;

  -webkit-animation-iteration-count: 0 !important;
  -moz-animation-iteration-count: 0 !important;
  animation-iteration-count: 0 !important;
}
`;
  var addStyle = function(styles, id) {
    var elm = document.createElement('style');
    window.setTimeout(function() {
      elm.type = 'text/css';
      if (id) { elm.id = id; }

      var text = styles.toString();
      text = document.createTextNode(text);
      elm.appendChild(text);
      var head = document.getElementsByTagName('head');
      head = head[0];
      head.appendChild(elm);
    }, 0);
    return elm;
  };

  addStyle(css);

//  $('body').off('mouseover');
//  $('.matrix').off('mouseenter');
//  $('.matrix').off('mouseleave');

})();
