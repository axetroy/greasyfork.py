// ==UserScript==
// @name         美化惠安一中官网
// @description  使福建惠安一中官网更加现代化
// @namespace    https://greasyfork.org/users/197529
// @version      2.10.2
// @author       kkocdko
// @include      *://www.fjhayz.cn/*
// @include      *://fjhayz.cn/*
// @run-at       document-start
// ==/UserScript==
'use strict';

let iconData = 'data:image/webp;base64,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';
let cssData = '.fbg,.main2,.main7,.menu li ul,.notice img,embed{display:none}.menu,.menu li:hover ul{background:var(--theme-color-1)}.fcon span,a{text-overflow:ellipsis}.fcon span,.home-box>div,.menu li,.noticesbox,.tabslider ul{overflow:hidden}.fcon>span>a,.main6 div,.tabslider{white-space:nowrap}*,:after,:before{box-sizing:border-box;margin:0;padding:0}li,ul{list-style:none}a{color:#3367d6;text-decoration:none}body{min-height:100vh;background:#f8f9fa;--theme-color-1:#f44336;--theme-color-2:#ef5350;--theme-color-3:#d32f2f}.main-box{display:flex;flex-wrap:wrap;justify-content:center}.main-box,.main6,.menu ul,.noticesbox{margin:0 auto;max-width:1190px}.home-box,.left,.newscontent img,.newscontent-big img,.right,.right-big{box-shadow:rgba(0,0,0,.14) 0 2px 2px 0,rgba(0,0,0,.12) 0 1px 5px 0,rgba(0,0,0,.2) 0 3px 1px -2px}.home-box>div{position:relative;float:unset!important;padding-left:unset!important;width:50%;height:14.5em!important;min-width:18em;border:1px solid #ddd;background:#fff;flex-grow:1}.menu li,.notice,.righttop .A1{float:left}@media screen and (max-width:576px){.home-box>div{border-width:0 0 1px}}.main1center,.main1left,.main1right{width:33.33%!important;flex-grow:999!important}.main1left{position:relative;width:100%;height:100%}.noticesbox{height:2em}#dcms_pager,.main6,.menu{overflow:auto}.main6{margin-bottom:15px}.main6 div{margin-bottom:5px;padding:6px 5px;font-size:9pt}.main6 a{margin:0 10px}.menu{height:50px;box-shadow:0 0 5px 0 rgba(0,0,0,.2)}.home-box>div>div:first-child>a:first-child,.moving_bg{background:var(--theme-color-3)}.menu li{width:6em;height:50px}.menu li:hover{background:hsla(0,0%,100%,.2)}.menu li ul{position:absolute;top:50px;z-index:3;width:inherit;box-shadow:0 1px 3px 0 rgba(0,0,0,.3)}.menu a,.menu li:hover ul{display:block}.menu a{height:100%;color:#fff;text-align:center;font-size:17px;line-height:50px}.menu>ul>li:first-child{width:175px}.menu>ul>li:first-child a{font-weight:700;font-size:28px;font-family:STKaiti,KaiTi,KaiTi_GB2312,cursive}.menu>ul>li:first-child img{float:left;margin:5px;height:40px}.seach_text{padding-left:3px;color:#666!important}.noticesbox .ss{width:100%!important;height:100%}.scrollnews a{padding-left:5px;color:var(--theme-color-3);font-size:9pt;line-height:2rem;filter:grayscale(1)}.scrollnews a:hover{filter:none}.scrollnews span{padding:0 0 0 60px;color:#999}.search{float:right;width:17em;height:100%}.search form{width:100%!important;height:100%!important}.search input{margin:1.5% 0;width:75%;height:80%!important;border:1px solid #dbdbdb}.search input[name=imag]{width:25%!important;border:0}.moving_bg{position:absolute;z-index:1;width:90px;height:30px;transition:.5s;transform:translateX(var(--btn-x))}.tab_item{position:relative;z-index:2;float:left;color:#fff}.fcon,.fcon span,.focus .fcon_img,.tabslider{position:absolute}.tabslider{width:100%;height:100%;transition:.5s;transform:translateX(var(--tab-x))}.tabslider ul{display:inline-block;margin-right:-4px;width:100%}.focus_img-div{width:100%;height:100%;background-size:cover}.fcon span{bottom:0;padding:0 .5em;width:100%;height:1.7em;background:rgba(0,0,0,.4);color:#fff;line-height:1.7em}.fcon,.fcon img,.fcon>a{height:100%}.fcon>span>a{color:#fff;font-size:14px}.focus .fcon_img{display:block;background-repeat:round}.fcon{display:unset!important;visibility:hidden;width:100%;opacity:0;transition:1s}.fcon.in{visibility:visible;opacity:1}.fcon>a{display:block}.fcon img{width:100%;object-fit:cover}.home-box>div>div:first-child,.tabs{height:30px;background:var(--theme-color-2);line-height:30px}.home-box>div>div:first-child>a,.tabs a{display:inline-block;width:90px;height:100%;color:#fff;text-align:center;font-size:1pc}.home-box li a,.left a,.righttext li a,.righttext-big li a{display:block;overflow:hidden;white-space:nowrap;font-size:14px}.home-box li a{padding:0 5px;color:#000;line-height:25px}.home-box li b{color:#000!important}.home-box>div>div:last-child a span,.left span{float:right}.left,.right,.right-big{margin:20px 3px;width:15%;height:1%;background:#fff}.left{min-width:9em;flex-grow:1}.right,.right-big{overflow:hidden;padding-bottom:.5em;min-width:20pc;flex-grow:8}@media screen and (max-width:770px){.left,.right,.right-big{margin:10px 0 0}.right,.right-big{width:100%}}.left li,.righttext li,.righttext-big li{position:relative;overflow:hidden;height:3em;line-height:3em}.lefttop,.righttop{overflow:hidden;padding:0 20px;height:40px;background:var(--theme-color-2);color:#fff;text-align:center;white-space:nowrap;font-size:1pc;line-height:40px}.left a,.righttext li a,.righttext-big li a{color:#000}.righttext li a,.righttext-big li a{width:calc(100% - 6em)}.left i{font-style:unset}.A5,.righttop a{float:right;color:#fff;font-size:1pc}.left ul,.righttext,.righttext-big{padding:0 1em}.righttext li span,.righttext-big li span{position:absolute;right:0}.newstime,.newstitle{margin:20px 0;text-align:center}.newstitle{font-size:26px}.newstime{color:#666;font-size:14px}.newscontent *,.newscontent-big *{padding:0!important;max-width:100%;text-indent:2em!important;font-size:1pc!important;font-family:unset!important;line-height:1.7em!important}.newscontent img,.newscontent-big img{display:inherit}.newscontent td,.newscontent-big td{border:1px solid #000}#dcms_pager{padding:1em;text-align:center;white-space:nowrap;font-size:9pt}#dcms_pager a,#dcms_pager select{margin:3px;padding:0 .5em;border:1px solid #ccc;color:#000;line-height:2em}';

function _modifyPage() {
    let path = location.pathname;
    // if (true) {
    if (path == '/index.aspx' || path == '/') {
        // Title
        document.title = '惠安一中';

        // Tabs
        let tabLabels = document.querySelectorAll('.tab_item');
        let setCssVar = (key, value) => document.querySelector('.tabbed_content').style.setProperty(key, value);
        tabLabels[0].addEventListener('mouseover', () => {
            setCssVar('--btn-x', '0');
            setCssVar('--tab-x', '0');
        });
        tabLabels[1].addEventListener('mouseover', () => {
            setCssVar('--btn-x', '100%');
            setCssVar('--tab-x', '-100%');
        });

        // Focu cards
        let focuCards = document.querySelectorAll('.fPic>.fcon');
        let focuCardIndex = 0;
        let refreshCard = () => {
            focuCards.forEach(item => item.classList.remove('in'));
            focuCards[focuCardIndex].classList.add('in');
        }
        refreshCard();
        setInterval(() => {
            if (focuCardIndex >= focuCards.length - 1) {
                focuCardIndex = 0;
            } else {
                focuCardIndex++;
            }
            refreshCard();
        }, 5000);

        // Dom
        let homeBox = document.createElement('div');
        homeBox.classList.add('main-box');
        homeBox.classList.add('home-box');
        let homeBoxItems = document.querySelectorAll('.main1>div,.main2right,.main2left,.main3>div,.main4left,.main4center');
        homeBoxItems.forEach(item => homeBox.appendChild(item));
        document.querySelector('.container').appendChild(homeBox);

        // Buttom bar
        let buttomBar = document.createElement('div');
        buttomBar.classList.add('main6');
        let buttomBarScroll = document.createElement('div');
        buttomBarScroll.innerHTML = '<label>有关链接：</label>';
        let aboutLinks = [
            ['惠安一中网络应用平台', 'http://59.57.5.10:9012'],
            ['至道智慧校园管理平台', 'http://113.209.194.249/login'],
            ['超星校园阅读系统', 'http://fjshadyzx.xueya.chaoxing.com/front/login'],
            ['清华同方知好乐课程资源中心', 'http://218.5.171.46:90/login.html']
        ];
        for (let item of aboutLinks) {
            let a = document.createElement('a');
            a.innerText = item[0];
            a.href = item[1];
            buttomBarScroll.appendChild(a);
        }
        buttomBar.appendChild(buttomBarScroll);
        document.body.appendChild(buttomBar);
    } else {
        // Title
        document.title = '惠安一中 - ' + path.substring(1);

        // Dom
        let mainBox = document.createElement('div');
        mainBox.classList.add('main-box');
        for (let item of ['.right', '.left', '.right-big']) {
            let el = document.querySelector(item);
            if (el) mainBox.appendChild(el);
        }
        document.querySelector(".container").appendChild(mainBox);

        // Page number
        let pageNumberContainer = document.querySelector('#dcms_pager');
        if (pageNumberContainer) {
            let urlArgs = new URLSearchParams(location.search);

            function getCookie(name) {
                let result = document.cookie.match(`(^|\\s)${name}=([^;]*)(;|$)`);
                return result ? unescape(result[2]) : null;
            }

            let totalPage = parseInt(getCookie('TotalPage'));
            let totalRecord = parseInt(getCookie('TotalRecord'));
            let currentPage = Number(urlArgs.get('page') ? urlArgs.get('page') : 1);
            let pageName = location.pathname + '?page=';
            let innerHTML = `<span>共${totalRecord}项</span>`;
            innerHTML += currentPage == 1 ? '' : `<a class=pgNext href="${pageName}1">首页</a><a class=pgNext href="${pageName}${currentPage - 1}">上一页</a>`;
            let beginI = currentPage > 5 && totalPage > 9 ? currentPage - 4 : 1;
            for (let i = beginI, loopi = 0; i <= totalPage; i++) {
                innerHTML += i == currentPage
                    ? `<a class=pgcurrent>${i}</a>`
                    : `<a href="${pageName}${i}">${i}</a>`;
                loopi++;
                if (loopi == 5) break;
            }
            let endpager = currentPage == totalPage ? '' : `<a class=pgNext href="${pageName}${currentPage + 1}">下一页</a><a class=pgNext href="${pageName}${totalPage}">尾页</a>`;
            innerHTML += `${endpager}<span>${currentPage}/${totalPage}页</span><select onchange="location.href='${pageName}'+this.value">`;
            for (let i = beginI; i <= totalPage; i++) {
                innerHTML += i == currentPage
                    ? `<option value="${i}" selected="selected">${i}</option>`
                    : `<option value="${i}">${i}</option>`;
            }
            innerHTML += '</select>';
            pageNumberContainer.innerHTML = innerHTML;
        }
    }

    document.querySelectorAll('a').forEach(item => item.target = '');

    let insertHTML = '';
    // Meta tag
    insertHTML += '<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">';
    // CSS
    insertHTML += `<style>${cssData}</style>`;
    // Favorite icon
    insertHTML += `<link rel="icon" href="${iconData}">`;
    // Insert HTML
    document.head.insertAdjacentHTML('beforeend', insertHTML);

    // Top bar logo
    document.querySelector('.menu a').innerHTML = `<span>惠安一中</span><img src="${iconData}">`;
}

document.documentElement.style.display = 'none';
let isModified = false;

// Run script after dom loaded
addEventListener('DOMContentLoaded', modifyPage);
// For overslow script inserting
addEventListener('load', modifyPage);
// For lessfunctional script-manager
if (document.readyState == 'complete') modifyPage();

function modifyPage() {
    if (!isModified) {
        isModified = true;
        _modifyPage();
        // Show page
        document.documentElement.style.display = '';
    }
}
