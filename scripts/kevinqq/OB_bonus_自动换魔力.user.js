// ==UserScript==
// @name         OB_bonus_自动换魔力
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Ourbits自动兑换上传量
// @author       @kevinqqnj
// @match        https://ourbits.club/mybonus.php*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';
    window.onload=function(){
        // 创建菜单
        let tr = document.getElementsByClassName('banner')[0]
        let table = tr.parentNode
        let div = document.createElement("div")
        div.title = "点击数字，开始自动兑换上传量"
        div.innerHTML = ' 自动兑换上传：'+
            '<input type="button" id="up200" value="200GB">' +
            '<input type="button" id="up500" value="500GB">' +
            '<input type="button" id="up1000" value="1000GB">' +
            '<input type="button" id="up2000" value="2000GB"> ' +
            '  <input type="button" id="reset" value="停止兑换">  ' +
            '  <a id="target" href="#" style="color: aqua;">0GB</a>兑换中'
        tr = document.createElement("tr")
        tr.appendChild(div)
        table.appendChild(tr)
        document.getElementById('up200').onclick = Function("return localStorage.setItem('target', 21)")
        document.getElementById('up500').onclick = Function("return localStorage.setItem('target', 51)")
        document.getElementById('up1000').onclick = Function("return localStorage.setItem('target', 101)")
        document.getElementById('up2000').onclick = Function("return localStorage.setItem('target', 201)")
        document.getElementById('reset').onclick = Function("return localStorage.setItem('target', 0)")
        let target = localStorage.getItem('target')
        if (target===null || target==='0') {
            alert('请点击上方菜单，选择自动兑换的上传量')
            return
            //localStorage.setItem('target', 100)
            //target = 100
        }
        else {
            target = parseInt(localStorage.getItem('target'))-1
            localStorage.setItem('target', target)
        }
        console.log('自动兑换次数还剩：', target)
        document.getElementById('target').innerText=(target*10).toString()+'GB'
        if (target>0) {
            document.getElementsByTagName("form")[2].submit.click()
        }
        else alert('全部兑换完毕！')
    }
})();