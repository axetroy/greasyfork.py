// ==UserScript==
// @name common web site
// @namespace Violentmonkey Scripts
// @description use shift + T to look web sites
// @grant none
// @version 0.01
// ==/UserScript==

class RW_website {
  constructor () {
    this.webSites = [
      {
        name: 'acfun',
        url: 'http://www.acfun.tv/',
        desc: 'shift + a',
        keyCode: 65
      },
      {
        name: 'douyu',
        url: 'https://www.douyu.com/',
        desc: 'shift + d',
        keyCode: 68
      },
      {
        name: 'weibo',
        url: 'http://weibo.com/',
        desc: 'shift + w',
        keyCode: 87
      },
      {
        name: 'tips',
        url: '',
        others: 'showTips',
        desc: 'shift + t',
        keyCode: 84
      }
    ]
    this.shiftKeyDown = false
    this.tipsPanel = {
      el: null,
      transitionTime: 500,
      show: false
    }
    this.init()
  }
  init () {
    this.tipsPanel.el = document.createElement('div')
    let tipsPanelStyle = {
      position: 'fixed',
      left: '50%',
      top: '50%',
      transform: 'translate3d(-50%, -50%, 0)',
      zIndex: 10000,
      maxWidth: '550px',
      padding: '16px',
      borderRadius: '8px',
      background: 'rgba(0, 0, 0, .7)',
      color: '#fff',
      fontSize: '14px',
      overflow: 'hidden',
      transition: 'opacity ' + this.tipsPanel.transitionTime + 'ms',
      display: 'none',
      opacity: 0
    }
    this.setStyle(this.tipsPanel.el, tipsPanelStyle)
    let itemStyle = {
      boxSizing: 'border-box',
      width: '250px',
      height: '70px',
      lineHeight: 1.5,
      float: 'left',
      padding: '5px',
      margin: '10px',
      border: '1px dashed #fff',
      borderRadius: '5px'
    }
    for (let webSite of this.webSites) {
      let div = document.createElement('div')
      let webSiteItem = `
        <div>网址: ${webSite.name}</div>
        <div>链接: ${webSite.url}</div>
        <div>快捷键: ${webSite.desc}</div>
		`
      div.innerHTML = webSiteItem
      this.setStyle(div, itemStyle)
      this.tipsPanel.el.appendChild(div)
    }
    document.body.appendChild(this.tipsPanel.el)
    window.addEventListener('keydown', this.goToWebSite.bind(this), false)
    window.addEventListener('keyup', this.freeKeysStatus.bind(this), false)
  }
  setStyle (dom, styles) {
    for (let key in styles) {
      dom.style[key] = styles[key]
    }
  }
  goToWebSite (e) {
    if (e.keyCode === 16) {
      this.shiftKeyDown = true
    }
    if (this.shiftKeyDown) {
      let url = this.checkSuitableSite(e.keyCode)
      if (url !== null && url !== 'showTips') {
        window.location.href = url
      } else if (url === 'showTips') {
        this.showTips()
      }
    }
  }
  freeKeysStatus (e) {
    if (e.keyCode === 16) {
      this.shiftKeyDown = false
    }
    if (e.keyCode === 84 && this.tipsPanel.show) {
      this.hideTips()
    }
  }
  checkSuitableSite (keyCode) {
    let url = null
    for (let webSite of this.webSites) {
      if (webSite.keyCode === keyCode) {
        url = webSite.url === '' ? webSite.others : webSite.url
        break
      }
    }
    return url
  }
  showTips () {
    if (this.tipsPanel.show) {
      return
    }
    this.tipsPanel.show = true
    this.tipsPanel.el.style.display = 'block'
    setTimeout(() => {
      this.tipsPanel.el.style.opacity = 1
    }, 10)
  }
  hideTips () {
    if (!this.tipsPanel.show) {
      return
    }
    this.tipsPanel.el.style.opacity = 0
    setTimeout(() => {
     this.tipsPanel.show = false
     this.tipsPanel.el.style.display = 'none'
    }, this.tipsPanel.transitionTime + 100)
  }
}

new RW_website()