// ==UserScript==
// @name         删除人人网分享(Delete Renren Shares)
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  批量删除人人网过往分享，需要在 个人主页 -> 分享 下使用
// @author       FredWe
// @match        http://share.renren.com/share/*v7*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */

/* jshint esnext: false */
/* jshint esversion: 6 */

var list = document.querySelectorAll(".share-item-footer.clearfix > a");
var ids = [];
list.forEach(function(element) {
  ids.push(element.dataset.id);
});
var appFrontendUrl = "http://share.renren.com/share/EditShare.do";
if (list.length && !$)
  location.reload();
var reqs = ids.map(function(id) {
  var query = {
    action : "del",
    sid : id,
    type : nx.user.id
  };
  return $.ajax({
    url : appFrontendUrl,
    method : "post",
    data : query,
    dataType : "json"
  });
});
if (list.length)
  $.when(...reqs).then( ()=>{location.reload();} );

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */