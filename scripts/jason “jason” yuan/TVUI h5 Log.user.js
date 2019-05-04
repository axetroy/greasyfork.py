// ==UserScript==
// @name         TVUI h5 Log
// @namespace    jiangege.org
// @version      1.0
// @description  TVUI h5 Log 过滤
// @author       jason
// @match        *://jira.spetechcular.com/secure/attachment/*
// @match        file:///*txt
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @require      https://cdn.bootcss.com/lodash.js/4.17.4/lodash.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/locale/zh-cn.js
// ==/UserScript==
(function() {
    'use strict';
    $(function() {
  var filterTheResults, nresults, results;
  filterTheResults = $('pre').text().match(/.*event:\/ailog.*/gm);
  nresults = _.map(filterTheResults, function(item) {
    var context, contextAry, date, e;
    date = new Date(item.match(/\d+-\d+\s\d+:\d+:\d+\.\d+/));
    date.setFullYear(new Date().getFullYear());
    contextAry = item.match(/^.+data:(\{.+?\})$/);
    try {
      context = JSON.parse(contextAry[1]);
      return {
        tag: context.tag,
        message: context.context,
        date: date
      };
    } catch (error) {
      e = error;
      return null;
    }
  });
  results = _.filter(nresults, function(item) {
    return item != null;
  });
  _.forEach(results, function(item) {
    var date;
    date = moment(item.date).locale('zh-cn').format('MMMM Do YYYY, h:mm:ss:ms');
    return console.log("? " + date + " - ? " + item.tag, item.message);
  });
  return console.log(filterTheResults.join('\n'));
});
    // Your code here...
})();