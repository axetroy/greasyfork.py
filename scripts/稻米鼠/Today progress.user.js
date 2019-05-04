// ==UserScript==
// @name Today progress
// @namespace Today progress
// @version 0.0.2
// @author 稻米鼠
// @description 今天过去了多少，然而依旧阻挡不了咕咕咕
// @match *://*/*
// @run-at document-idle
// @grant none
// @noframes
// ==/UserScript==

const specialMoments = [
  { time: '08:00', color: '#F4CF77'},
  { time: '12:00', color: '#74ED78'},
  { time: '14:00', color: '#66C4F1'},
  { time: '14:00', color: '#66C4F1'},
  { time: '22:00', color: '#74ED78'},
  { time: '24:00', color: '#F4CF77'},
]

const oldLoadFun = window.onload
window.onload=function(){
  oldLoadFun && oldLoadFun()
  const nowTime = new Date()
  const progress = (nowTime.getTime()-nowTime.getTimezoneOffset()*60000)%(24*3600*1000)/(24*3600*1000)
  const progressToShow = (progress*100).toFixed(1)<10 ? '0'+(progress*100).toFixed(1) : (progress*100).toFixed(1)

  const progressDiv = document.createElement("div")
  progressDiv.id = 'please-show-me-today-progress'
  progressDiv.style = 'position: fixed; z-index: 10; width: 100vw; height: 4px; margin: 0; padding: 0; left: 0; bottom: 0; background-color: rgba(255, 255, 255, .3)'
  let theCode = ''
  for(let k=0; k<specialMoments.length; k++){
    const moment = specialMoments[k]
    const t = moment.time.split(':')
    const long = 100*((+t[0])*60+(+t[1]))/(24*60)
    theCode += '<div style="position: absolute; top: 0; left: 0; z-index: '+(specialMoments.length-k)+'; border: none; background-color: '+moment.color+'; height: 4px; width: '+long+'%;"></div>'
  }
  theCode += '<div id="today-progress-bar" style="position: absolute; top: -10px; left: 0; z-index: '+(specialMoments.length+1)+'; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid #FF6666; height: 0; width: 0;"></div>'
  progressDiv.innerHTML = theCode

  // document.body.style.marginTop = 'calc(' + window.getComputedStyle(document.body, null).marginTop + ' + 2px)'

  document.body.appendChild(progressDiv)

  const todayProgressBar = document.getElementById('today-progress-bar')
  let todayProgressIsStart = false
  const refreshProgress = function(tpb){
    const nowTime = new Date()
    const progress = (nowTime.getTime()-nowTime.getTimezoneOffset()*60000)%(24*3600*1000)/(24*3600*1000)
    tpb.style.left = 'calc('+(100*progress) + '% - 3px)'
    if(!todayProgressIsStart){
      todayProgressIsStart = true
      window.setInterval(()=>{
        refreshProgress(tpb)
      }, 15000)
    }
  }
  refreshProgress(todayProgressBar)
}