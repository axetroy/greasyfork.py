// ==UserScript==
// @name         不要翻译github上的代码
// @namespace    http://floatsyi.com/
// @version      0.3.5
// @description  避免google网页翻译github和npm站点中的代码
// @author       floatsyi
// @include      *://github.com*
// @include      *://www.npmjs.com*
// @match        *://github.com*
// @match        *://www.npmjs.com*
// @grant        MIT
// ==/UserScript==
/*jshint esversion: 6 */
(function() {
    'use strict';
     const addCodeEle = function (ele) {ele.innerHTML = '<code>' + ele.innerHTML + '</code>'}
     const hasCodeEleChild = function (ele) {return !!ele.querySelector('code')}
     const _ = {}
     _.debounce = function (func, wait) {
         var lastCallTime
         var lastThis
         var lastArgs
         var timerId

         function startTimer (timerExpired, wait) {
             return setTimeout(timerExpired, wait)
         }

         function remainingWait(time) {
             const timeSinceLastCall = time - lastCallTime
             const timeWaiting = wait - timeSinceLastCall
             return timeWaiting
         }

         function shoudInvoking (time) {
             return lastCallTime !== undefined && (time - lastCallTime >= wait)
         }

         function timerExpired () {
             const time = Date.now()
             if (shoudInvoking(time)) {
                 return invokeFunc()
             }
             timerId = startTimer(timerExpired, remainingWait(time))
         }

         function invokeFunc () {
             timerId = undefined
             const args = lastArgs
             const thisArg = lastThis
             let result = func.apply(thisArg, args)
             lastArgs = lastThis = undefined
             return result
         }

         function debounced (...args) {
             let time = Date.now()
             lastThis = this
             lastArgs = args
             lastCallTime = time
             if (timerId === undefined) {
                 timerId = startTimer(timerExpired, wait)
             }
         }

         return debounced
     }
     let time = 0
     const githubTV = document.querySelector('body')
     const npmTV = document.querySelector('main')
     const isGitHub = (function () {
       if ((window.location.href.search(/github.com/i) !== -1) && !!githubTV) return true
       return false
     })()
     const isNPM = (function () {
       if ((window.location.href.search(/npmjs.com/i) !== -1) && !!npmTV) return true
       return false
     })()

    // 监听DOM变更
     const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
     const option = {
         'childList': true,
         'subtree': true
     }
     const doNotTranslateCode = function (mutations, observer) {
         if (time >= 20) {
           observer.disconnect()
           observer.takeRecords()
           time = 0
           setTimeout(function() {
            isGitHub && observer.observe(githubTV, option)
            isNPM && observer.observe(npmTV, option)
           }, 50)
         }
         const files = document.querySelectorAll('.file')
         let pres = document.querySelectorAll('pre')
         let h = []
         ;['1','2','3','4','5','6'].forEach((item)=>{
           if (!document.querySelectorAll(`h${item}`)) return false
           h = [...h,...document.querySelectorAll(`h${item}`)]
         })
         pres = [...pres,...h]
         if (files.length > 0) {
             if (window.location.href.search(/.md/i) !== -1) {
               if (pres.length > 0) {
                  pres.forEach(function(pre){if (!hasCodeEleChild(pre)) addCodeEle(pre)})
               }
             } else {
               files.forEach(function(file){if (!hasCodeEleChild(file)) addCodeEle(file)})
             }
         } else if (pres.length > 0) {
             pres.forEach(function(pre){if (!hasCodeEleChild(pre)) addCodeEle(pre)})
         }
         time++
     }
     const mo = new MutationObserver(_.debounce(doNotTranslateCode, 50))
     isGitHub && mo.observe(githubTV, option)
     isNPM && mo.observe(npmTV, option)
})()