// ==UserScript==
// @name         看准网免登陆看详情
// @namespace    https://www.kanzhun.com/
// @version      0.1
// @description  免登陆看完整点评、面试、问答
// @author       You
// @match        https://www.kanzhun.com/*.html*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
if (window.location.search.startsWith("?ka=")){

  var form = document.createElement('form')

  var meta = document.createElement('meta');
  meta.name = "referrer";
  meta.content = "no-referrer";
  document.getElementsByTagName('head')[0].appendChild(meta);

  form.id = 'my_form'
  form.method = 'get'
  form.action = "https://"+ location.host+location.pathname
  form.innerHTML = '<input type="submit" value="submit" id="my_submit">'

  document.body.appendChild(form)

  setTimeout(function () {
    // form.submit()
    const e = document.createEvent('MouseEvents')
    e.initEvent('click', true, true)
    const el = document.querySelector('#my_submit')
    el.dispatchEvent(e)
  })
}
})();