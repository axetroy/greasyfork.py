// ==UserScript==
// @name         删除人人网状态(Delete Renren Status)
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  批量删除人人网过往分享，需要在 个人主页 -> 状态 下使用
// @author       FredWe
// @match        http://status.renren.com/status/*v7*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */

/* jshint esnext: false */
/* jshint esversion: 6 */

var getStatusList = function(next) {
  jQuery.ajax({
    url : "http://status.renren.com/GetSomeomeDoingList.do",
    dataType : "jsonp",
    jsonp : "_jcb",
    success : function(body) {
      var typePattern = body.doingArray;
      next(typePattern);
    }
  });
};
var delStatus = function(statusId) {
  return jQuery.ajax({
    type : "POST",
    url : "http://status.renren.com/doing/deleteDoing.do",
    data : "id=" + statusId,
    dataType : "json",
    success : function() {
      console.log("status " + statusId + " deleted sucuessfully");
    }
  });
};
getStatusList(function(statusArray){
  var reqs = statusArray.map(function(status) {
    var id = status.id;
    return delStatus(id);
  });
  if (statusArray.length)
    jQuery.when(...reqs).then( ()=>{location.reload();} );
});

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */