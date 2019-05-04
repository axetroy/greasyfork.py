// ==UserScript==
// @name        PTsign
// @description pt 自动签到
// @include     *hdhome*
// @include     *ourbits*
// @include     *hdupt*
// @include     *totheglory*
// @grant none
// @version     1.2
// @namespace @github.com/lizhenghlh
// ==/UserScript==
(function (window) {
  var url = window.location.href
  var btnList = []
  setTimeout(function() {
    var ttgSign = document.getElementById('signed') || ''
    var hdcSign = document.getElementsByClassName('userinfort')[0] || ''
    if (hdcSign) {
      var hdc = hdcSign.getElementsByTagName('a')[1];
    }
    var ourSign = document.getElementsByClassName('faqlink')[0] || ''
    var hdhomeSign = document.getElementsByClassName('faqlink')[0] || ''
    var hdu = document.getElementById('qiandao') || ''
    if (hdu) {
        var hduSign = hdu.firstChild
    }
    //var hdStreetSign = document.getElementById('game') || ''
    btnList = [
      //ttgSign,
      hdc,
      //ourSign,
      //hduSign,
      //hdhomeSign
      //hdStreetSign
    ]
    if (window.location.host.indexOf('hdu') != -1) {
      qiandao('qiandao')
    }
    if (window.location.host.indexOf('ourbits') != -1 && ourSign.innerText.indexOf('签到得魔力') != -1) {
      ourSign.click()
    }
    if (window.location.host.indexOf('hdhome') != -1 && hdhomeSign.innerText.indexOf('签到得魔力') != -1) {
      hdhomeSign.click()
    }
    if (window.location.host.indexOf('totheglory') != -1 && ttgSign.innerText.indexOf('签到') != -1) {
      ttgSign.click()
    }
  }, 500)
})(window)
