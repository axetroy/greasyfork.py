// ==UserScript==
// @name         优书网 <=> 知轩藏书
// @namespace    http://tampermonkey.net/
// @description  [知轩藏书/早安电子书/书荒网]添加优书网评分和直链，优书网书籍详情页添加[知轩藏书/早安电子书/龙凤互联/书荒网]下载链接
// @require      http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.js
// @require      https://greasyfork.org/scripts/40003-pajhome-md5-min/code/PajHome-MD5-min.js
// @author       tianxin
// @match        *://zxcs.me/sort/*
// @match        *://zxcs.me/post/*
// @match        *://zxcs.me/index.php?keyword=*
// @match        *://www.zxcs.me/sort/*
// @match        *://www.zxcs.me/post/*
// @match        *://www.zxcs.me/author/*
// @match        *://www.zxcs.me/tag/*
// @match        *://www.zxcs.me/index.php?keyword=*
// @match        *://www.yousuu.com/book/*
// @match        *://www.zadzs.com/txt/*
// @match        *://www.zadzs.com/plus/search.php?*
// @match        *://www.nordfxs.com/*
// @match        *://www.15huang.com/style/*.html
// @match        *://www.15huang.com/style/*
// @match        *://www.15huang.com/e/search/result/*
// @match        *://www.3uww.cc/down/*
// @match        *://www.3uww.cc/author/*
// @match        *://www.3uww.cc/soft*
// @match        *://www.3uww.cc/search.html
// @match        *://www.3uww.cc/top/*
// @grant        GM_xmlhttpRequest
// @connect      www.yousuu.com
// @connect      www.zxcs.me
// @connect      www.zadzs.com
// @connect      www.nordfxs.com
// @connect      www.15huang.com
// @connect      www.3uww.cc
// @connect      www.mianhuatang.la
// @connect      zhannei.baidu.com
// @connect      www.ixdzs.com
// @connect      www.xuanquge.com
// @version      0.5.5
// ==/UserScript==

// 请求类型 1:获取评分 2:获取下载
const REQUEST_TYPE_SOURCE = 1;
const REQUEST_TYPE_DOWNLOAD = 2;
// 下载链接缓存时间，默认15天
const DOWNLOAD_EXPIRED_TIME = 86400 * 7 * 1000;
// 优书网评分缓存时间，默认1天
const SEARCH_EXPIRED_TIME = 86400 * 1000;
// 优书网最大搜索数目，默认5个
const MAX_SEARCH_NUM = 5;
// 下载链接类型 1:直接获取 2:解析请求bookLink的响应 3:解析原bookList的响应
const DOWNLOAD_TYPE_DIRECT = 1;
const DOWNLOAD_TYPE_FETCH = 2;
const DOWNLOAD_TYPE_PROCESS = 3;
// localStorage 是否可用
let localStorageStatus = undefined;
// 判断 localStorage 是否可用
let checkLocalStorage = () => {
    if (!window.localStorage) {
        return false;
    }
    try {
        window.localStorage.setItem('checkLocalStorage', '1203');
    } catch (error) {
        return false;
    }
    if (window.localStorage.getItem('checkLocalStorage') !== '1203') {
        return false;
    }
    window.localStorage.removeItem('checkLocalStorage');
    return true;
}
// 加入对 localStorage 的判断
let storage = {
    setValue: (key, value) => {
        if (localStorageStatus) {
            selfLocalStorage.setValue(key, value);
        }
    },
    getValue: (key, expired) => {
        if (localStorageStatus) {
            return selfLocalStorage.getValue(key, expired);
        }
        return null;
    },
    deleteValue: (key) => {
        if (localStorageStatus) {
            return selfLocalStorage.deleteValue(key);
        }
    },
    clear: () => {
        if (localStorageStatus) {
            return selfLocalStorage.clear();
        }
    }
};
// 简单封装 localStorage ,支持过期时间
let selfLocalStorage = {
    setValue: (key, value) => {
        let data = JSON.stringify({ value: value, time: new Date().getTime() });
        try {
            window.localStorage.setItem(key, data);
        } catch (error) {
            if (error.name === 'QUOTA_EXCEEDED_ERR') { //存储已满，清空所有
                window.localStorage.clear();
            }
            console.log(error);
        }
    },
    getValue: (key, expired) => {
        let value = window.localStorage.getItem(key);
        if (value !== null) {
            let dataObj = JSON.parse(value);
            if (new Date().getTime() - dataObj.time > expired) {
                window.localStorage.removeItem(key);
                return null;
            } else {
                return dataObj.value;
            }
        } else {
            return null;
        }
    },
    deleteValue: (key) => {
        return window.localStorage.removeItem(key);
    },
    clear: () => {
        return window.localStorage.clear();
    },
}
let getResponse = (options) => {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: options.method,
            url: options.url,
            data: options.data,
            headers: options.headers,
            synchronous: options.synchronous,
            anonymous: options.anonymous,
            onload: (response) => {
                if (response.status >= 200 && response.status < 400) {
                    resolve(response.responseText);
                }
                else {
                    console.log(
                        'Error getting ' + options.url + ' (' + this.status + ' ' + this.statusText +
                        '): ' + this.responseText);
                }
            },
            onerror: (response) => {
                console.log('Error during GM_xmlhttpRequest to ' + options.url + ': ' + response.statusText);
            }
        });
    });
}
let getResult = (options) => {
    return new Promise((reslove, reject) => {
        options.data = options.data || '';
        options.method = options.method || 'GET';
        options.headers = options.headers || '';
        options.synchronous = options.synchronous || false;
        options.anonymous = options.anonymous || false;
        getResponse(options).then(response => reslove(response));
    });
}
let sourceConfig = {
    'zxcs8.post': {
        bookName: (item) => {
            return item.querySelector('h1').innerText.match('《(.*?)》')[1];
        },
        bookAuthor: (item) => {
            return item.querySelector('h1').innerText.split('：').pop();
        },
        maxNum: MAX_SEARCH_NUM,
        rateItem: (rate, rateNum, bookLink) => {
            return '<p class="yinyong"><span style="font-size:14px;color:#FF0000;font-weight:bold">优书网评分: <a href = "' + bookLink + '" target="_blank">' + rate + '</a></span><p><p class="yinyong"><span style="font-size:14px;color:#FF0000;font-weight:bold">评分人数: ' + rateNum + '</span><p>';
        },
        anchorObj: (item) => {
            let obj = item.querySelector('.yinyong');
            return !obj ? item.querySelector('.pagefujian') : obj;
        },
        anchorPos: 'beforebegin',
    },
    'zxcs8.sort': {
        bookName: (item) => {
            return item.firstElementChild.innerText.match('《(.*?)》')[1];
        },
        bookAuthor: (item) => {
            return item.firstElementChild.innerText.split('：').pop();
        },
        maxNum: MAX_SEARCH_NUM,
        rateItem: (rate, rateNum, bookLink) => {
            return '<a href= "' + bookLink + '" target = "_blank">&nbsp;&nbsp;&nbsp;评分：' + rate + '&nbsp;&nbsp;&nbsp;人数：' + rateNum + '</a>'
        },
        anchorObj: (item) => {
            return item.lastElementChild.querySelector('div');
        },
        anchorPos: 'beforebegin',
    },
    'zadzs.detail': {
        bookName: (item) => {
            return item.querySelector('h3[title]').title;
        },
        bookAuthor: (item) => {
            return item.querySelector('h3[title]>span>a').innerText;
        },
        maxNum: MAX_SEARCH_NUM,
        rateItem: (rate, rateNum, bookLink) => {
            return '<tr><td width="42px">评分：</td><td><a href="' + bookLink + '" target = "blank">' + rate + '</a></td></tr><tr><td width="42px">人数：</td><td>' + rateNum + '</td></tr>';
        },
        anchorObj: (item) => {
            return item.querySelector('.m-bookstatus>table>tbody');
        },
        anchorPos: "afterbegin",
    },
    'zadzs.search': {
        bookName: (item) => {
            return item.querySelector('.book>h5>a').innerText;
        },
        bookAuthor: (item) => {
            return item.querySelector('.book>.price').innerText.split('：').pop();
        },
        maxNum: MAX_SEARCH_NUM,
        rateItem: (rate, rateNum, bookLink) => {
            return '<p class="price">评分：<a href="' + bookLink + '" target="_blank">' + rate + '</a>&nbsp;&nbsp;人数：' + rateNum + '</p>';
        },
        anchorObj: (item) => {
            return item.querySelector('.book>.disc');
        },
        anchorPos: "beforebegin",
    },
    '15huang.detail': {
        bookName: (item) => {
            return item.querySelector('.row>h1').innerText;
        },
        bookAuthor: (item) => {
            return item.querySelector('p.book-writer>a').innerText;
        },
        maxNum: MAX_SEARCH_NUM,
        rateItem: (rate, rateNum, bookLink) => {
            return '<p class="book-writer">优书评分：<a href="' + bookLink + '" target="_blank">' + rate + '</a></p><p class="book-writer">评分人数：' + rateNum + '</p>';
        },
        anchorObj: (item) => {
            return item.querySelector('p.book-writer');
        },
        anchorPos: "afterend",
    },
    '15huang.category': {
        bookName: (item) => {
            return item.querySelector('h4.ellipsis').innerText.match('《(.*?)》')[1];
        },
        bookAuthor: (item) => {
            return item.querySelector('span.writer').innerText;
        },
        maxNum: MAX_SEARCH_NUM,
        rateItem: (rate, rateNum, bookLink) => {
            return '<em>|</em><span><a href="' + bookLink + '" target="_blank">' + rate + '分</a></span><em>|</em><span>' + rateNum + '人</span>';
        },
        anchorObj: (item) => {
            return item.querySelector('p.info.hei9.ellipsis');
        },
        anchorPos: "beforeend",
    },
    '3uww.detail': {
        bookName: (item) => {
            return item.querySelector('#downInfoTitle').innerText.match('《(.*?)》')[1];
        },
        bookAuthor: (item) => {
            return item.querySelector('.downInfoRowL>a').innerText;
        },
        maxNum: MAX_SEARCH_NUM,
        rateItem: (rate, rateNum, bookLink) => {
            return '<b>书籍评分：</b><a href="' + bookLink + '" class="strong blue" target="_blank">' + rate + '</a><br><b>评价人数：</b>' + rateNum + '<br>';
        },
        anchorObj: (item) => {
            return item.querySelector('.downInfoRowL>a').parentNode;
        },
        anchorPos: "beforeend",
    },
    '3uww.author': {
        bookName: (item) => {
            return item.querySelector('.txt99>h2>a').innerText;
        },
        bookAuthor: (item) => {
            return document.querySelector('#Li1').innerText.replace(/的小说/ig, "");
        },
        maxNum: MAX_SEARCH_NUM,
        rateItem: (rate, rateNum, bookLink) => {
            return '<div>书籍评分：<i><a href="' + bookLink + '" class="strong blue" target="_blank">' + rate + '</a></i></div><div>评分人数：<i>' + rateNum + '</i></div>';
        },
        anchorObj: (item) => {
            return item.querySelector('.txt99>ul').children[2];
        },
        anchorPos: "afterbegin",
    },
    '3uww.category': {
        bookName: (item) => {
            return item.info.querySelector('span.mainSoftName>a').innerText;
        },
        bookAuthor: (item) => {
            return item.bottom.querySelectorAll('.mainRunSystem')[1].innerText.replace(/书籍作者：/ig, "");
        },
        maxNum: MAX_SEARCH_NUM,
        rateItem: (rate, rateNum, bookLink) => {
            return '<div class="mainAccredit"><span class="mainGreen">书籍评分：<a href = "' + bookLink + '" target = "_blank" ><u>' + rate + '</u></a></span></div><div class="mainstar"><span class="mainGreen">评分人数：</span>' + rateNum + '</div>'
        },
        anchorObj: (item) => {
            return item.bottom.querySelector('.mainRunSystem');
        },
        anchorPos: "afterend",
    },
    '3uww.search': {
        bookName: (item) => {
            return item.info.querySelector('a').innerText.split('/')[0];
        },
        bookAuthor: (item) => {
            return item.info.querySelector('a').innerText.split('/')[1].replace(/作者：/ig, "");
        },
        maxNum: MAX_SEARCH_NUM,
        rateItem: (rate, rateNum, bookLink) => {
            return '&nbsp;&nbsp;评分：<a href="' + bookLink + '" target="_blank"><span style="color:#0066FF">' + rate + '</span></a>&nbsp;&nbsp;人数：' + rateNum;
        },
        anchorObj: (item) => {
            return item.bottom.querySelector('.oldDate');
        },
        anchorPos: "afterend",
    },
};
let sourceHandle = {
    'zxcs8.post': (site, callback) => {
        callback({ site: site, item: document });
    },
    'zxcs8.sort': (site, callback) => {
        let bookList = Array.prototype.slice.call(document.querySelectorAll('#plist'));
        bookList.map((item) => {
            callback({ site: site, item: item });
        });
    },
    'zadzs.detail': (site, callback) => {
        callback({ site: site, item: document });
    },
    'zadzs.search': (site, callback) => {
        let bookList = Array.prototype.slice.call(document.querySelectorAll('.searchItem'));
        bookList.map((item) => {
            callback({ site: site, item: item });
        });
    },
    '15huang.detail': (site, callback) => {
        callback({ site: site, item: document });
    },
    '15huang.category': (site, callback) => {
        let bookList = Array.prototype.slice.call(document.querySelectorAll("li.cate-infobox.col.xs-24.md-12"));
        bookList.map((item) => {
            callback({ site: site, item: item });
        });
    },
    '3uww.detail': (site, callback) => {
        callback({ site: site, item: document });
    },
    '3uww.author': (site, callback) => {
        let bookList = Array.prototype.slice.call(document.querySelectorAll('.pinglw'));
        bookList.map((item) => {
            callback({ site: site, item: item });
        });
    },
    '3uww.category': (site, callback) => {
        let bookInfo = Array.prototype.slice.call(document.querySelectorAll('.mainListInfo'));
        let bookBottom = Array.prototype.slice.call(document.querySelectorAll('.mainListBottom'));
        bookInfo.map((value, index) => {
            callback({ site: site, item: { info: value, bottom: bookBottom[index] } });
        });
    },
    '3uww.search': (site, callback) => {
        let bookInfo = Array.prototype.slice.call(document.querySelectorAll('.searchTopic'));
        let bookBottom = Array.prototype.slice.call(document.querySelectorAll('.searchInfo'));
        bookInfo.forEach((value, index) => {
            callback({ site: site, item: { info: value, bottom: bookBottom[index] } });
        });
    },
};
let sourceRoute = {
    'www.zxcs.me': () => {
        let tag = location.pathname.split('/')[1];
        if (tag === 'post') {
            return 'zxcs8.post';
        }
        if (['sort', 'tag', 'author'].includes(tag)) {
            return 'zxcs8.sort';
        }
        // 搜索页面
        if (location.pathname.indexOf('index.php') !== -1) {
            return 'zxcs8.sort';
        }
    },
    'zxcs.me': () => {
        let tag = location.pathname.split('/')[1];
        if (['sort', 'post'].includes(tag)) {
            return 'zxcs8.' + tag;
        }
        // 搜索页面
        if (location.pathname.indexOf('index.php') !== -1) {
            return 'zxcs8.sort';
        }
    },
    'www.zadzs.com': () => {
        let pathname = location.pathname;
        if (pathname.indexOf('txt') !== -1) {
            return 'zadzs.detail';
        }
        if (pathname.indexOf('search') !== -1) {
            return 'zadzs.search';
        }
    },
    'www.15huang.com': () => {
        let pathname = location.pathname;
 
        // 搜索结果 || 作者
        if (pathname == '/e/search/result/') {
            return '15huang.category';
        }

        // 详情页
        if (pathname.indexOf('.html') !== -1) {
            return '15huang.detail';
        }
        return '15huang.category';
    },
    'www.3uww.cc': () => {
        let pathname = location.pathname;
        // 排行
        if (pathname.indexOf('top') !== -1) {
            return '3uww.category';
        }
        // 详情
        if (pathname.indexOf('down') !== -1) {
            return '3uww.detail';
        }
        // 作者
        if (pathname.indexOf('author') !== -1) {
            return '3uww.author';
        }
        // 分类
        if (pathname.search(/soft(\d+)/ig) !== -1) {
            return '3uww.category';
        }
        // 搜索
        if (pathname.indexOf('search') !== -1) {
            return '3uww.search';
        }
    },
};
let downloadConfig = {
    "zxcs8": {
        'siteName': '知轩藏书',
        'searchConfig': (args) => {
            return { url: 'http://www.zxcs.me/index.php?keyword=' + args.bookName };
        },
        'bookList': (item) => {
            return Array.prototype.slice.call(item.getElementsByTagName('dl'));
        },
        'bookName': (item) => {
            return item.children["0"].innerText.match('《(.*?)》')[1];
        },
        'bookAuthor': (item) => {
            return item.children["0"].innerText.split('：').pop();
        },
        'bookLink': (item) => {
            return item.children["0"].getElementsByTagName('a')[0].href;
        },
        'downloadLink': (item) => {
            return item.querySelector('.down_2>a').href;
        },
    },
    // "zadzs": {
    //     'siteName': '早安电子书',
    //     'searchConfig': (args) => {
    //         return { url: 'http://www.zadzs.com/plus/search.php?kwtype=0&q=' + args.bookName };
    //     },
    //     'bookList': (item) => {
    //         return Array.prototype.slice.call(item.getElementsByClassName('searchItem'));
    //     },
    //     'bookName': (item) => {
    //         return item.querySelector('.book>h5>a').innerText;
    //     },
    //     'bookAuthor': (item) => {
    //         return item.querySelector('.book>.price').innerText.split('：').pop();
    //     },
    //     'bookLink': (item) => {
    //         return 'http://www.zadzs.com' + item.querySelector('.book>.cover').pathname;
    //     },
    //     'downloadLink': (item) => {
    //         return 'http://www.zadzs.com' + item.querySelector('.book>cover').href;
    //     },
    // },
    "nordfxs": {
        'siteName': '龙凤互联',
        'searchConfig': (args) => {
            let form = new FormData();
            form.append("formhash", "dfae824e");
            form.append("srchtxt", args.bookName);
            form.append("searchsubmit", "yes");
            return { url: "http://www.nordfxs.com/search.php?mod=forum", data: form, method: "POST", 'bookName': args.bookName };
        },
        'bookList': (item) => {
            return Array.prototype.slice.call(item.getElementsByClassName('pbw'));
        },
        'bookName': (item) => {
            return item.querySelector('.xs3>a').innerText.split('（').shift().replace(/[《,》]/g, '');
        },
        'bookAuthor': (item) => {
            return item.querySelector('.xs3>a').innerText.split('：').pop();
        },
        'bookLink': (item) => {
            return item.querySelector('.xs3>a').href;
        },
        'downloadLink': (item) => {
            return item.querySelector('.xs3>a').href;
        },
    },
    "15huang": {
        'siteName': '书荒网',
        'searchConfig': (args) => {
            let data = 'show=title%2Cwriter%2Ckeyboard&tbname=news&tempid=1&keyboard=' + encodeURIComponent(args.bookName);
            let headers = { "Content-Type": "application/x-www-form-urlencoded", "Cookie": "alllclastsearchtime=" + (Date.parse(new Date) / 1000 - 48) };
            return { url: "http://www.15huang.com/e/search/index.php", data: data, method: "POST", headers: headers, anonymous: true, bookName: args.bookName };
        },
        'bookList': (item) => {
            return Array.prototype.slice.call(item.querySelectorAll("li.cate-infobox.col.xs-24.md-12"));
        },
        'bookName': (item) => {
            return item.querySelector('h4.ellipsis').innerText.match('《(.*?)》')[1];
        },
        'bookAuthor': (item) => {
            return item.querySelector('span.writer').innerText;
        },
        'bookLink': (item) => {
            return item.querySelector('a.open.bg-hui-hover').href;
        },
        'downloadLink': (item) => {
            return 'http://www.15huang.com' + item.querySelector('.downurl.col.xs-24.md-5>a').href.replace(location.origin,'');
        },
    },
    "3uww": {
        'siteName': '炫书网',
        'searchConfig': (args) => {
            let data = 'searchkey=' + args.bookName;
            let headers = { "Content-Type": "application/x-www-form-urlencoded" };
            return { url: "https://www.xuanquge.com/search.html", data: data, method: "POST", headers: headers, bookName: args.bookName };
        },
        'bookList': (item) => {
            return Array.prototype.slice.call(item.getElementsByClassName('searchTopic'));
        },
        'bookName': (item) => {
            return item.querySelector('a').innerText.split('/')[0];
        },
        'bookAuthor': (item) => {
            return item.querySelector('a').innerText.split('/')[1].replace(/作者：/ig, "");
        },
        'bookLink': (item) => {
            return item.querySelector('a').href;
        },
        'downloadLink': (item) => {
            return item.querySelector('.downAddress_li>a').href;
        },
    },
    // "mianhuatang": {
    //     'siteName': '棉花糖小说网',
    //     'searchConfig': (args) => {
    //         return { url: 'http://zhannei.baidu.com/cse/search?s=7965856832468911224&q=' + args.bookName };
    //     },
    //     'bookList': (item) => {
    //         return Array.prototype.slice.call(item.getElementsByClassName('result-item result-game-item'));
    //     },
    //     'bookName': (item) => {
    //         return item.querySelector('.result-game-item-detail>h3>a').title;
    //     },
    //     'bookAuthor': (item) => {
    //         return item.querySelector('.result-game-item-info>p.result-game-item-info-tag').lastElementChild.innerText.trim();
    //     },
    //     'bookLink': (item) => {
    //         return item.querySelector('.result-game-item-detail>h3>a').href;
    //     },
    //     'downloadLink': (item) => {
    //         return 'http://www.mianhuatang.la/down/txt' + item.querySelector('.result-game-item-detail>h3>a').href.match(/(\d+)/ig).pop() + '.html';

    //     },
    // },
    "ixdzs": {
        'siteName': '爱下电子书',
        'searchConfig': (args) => {
            return { url: 'https://www.ixdzs.com/bsearch?q=' + args.bookName };
        },
        'bookList': (item) => {
            return Array.prototype.slice.call(item.getElementsByClassName('list_info'));
        },
        'bookName': (item) => {
            return item.querySelector('h2.b_name>a').innerText;
        },
        'bookAuthor': (item) => {
            return item.querySelector('p.b_info>span>a').innerText;
        },
        'bookLink': (item) => {
            return 'https://www.ixdzs.com' + item.querySelector('h2.b_name>a').href.replace(location.origin,'');
        },
        'downloadLink': (item) => {
            return 'https://www.ixdzs.com' + item.querySelector('h2.b_name>a').href.replace(location.origin,'');
        },
    },
};
let downloadHandle = {
    'zxcs8': (options) => {
        return getDownLoadLink((Object.assign(options, { type: DOWNLOAD_TYPE_FETCH })));
    },
    // 'zadzs': (options) => {
    //     return getDownLoadLink((Object.assign(options, { type: DOWNLOAD_TYPE_DIRECT })));
    // },
    'nordfxs': (options) => {
        return getDownLoadLink((Object.assign(options, { type: DOWNLOAD_TYPE_DIRECT })));
    },
    '15huang': (options) => {
        return getDownLoadLink((Object.assign(options, { type: DOWNLOAD_TYPE_FETCH })));
    },
    '3uww': (options) => {
        return getDownLoadLink((Object.assign(options, { type: DOWNLOAD_TYPE_FETCH })));
    },
    // 'mianhuatang': (options) => {
    //     return getDownLoadLink((Object.assign(options, { type: DOWNLOAD_TYPE_PROCESS })));
    // },
    'ixdzs': (options) => {
        return getDownLoadLink((Object.assign(options, { type: DOWNLOAD_TYPE_DIRECT })));
    },
};
let downloadRoute = {
    'www.yousuu.com': () => {
        return 'www.yousuu.com';
    }
};
let getDownLoadLink = options => {
    let type = options.type;
    if (type === DOWNLOAD_TYPE_DIRECT) {
        return new Promise((resolve, reject) => {
            resolve({ downloadLink: options.bookLink, siteName: downloadConfig[options.site].siteName });
        });
    } else if (type === DOWNLOAD_TYPE_FETCH) {
        let siteConfig = downloadConfig[options.site];
        return new Promise((resolve, reject) => {
            let cacheKey = "YOUSUU:GET:DOWNLOADLINK:" + options.site + ':' + hex_md5(options.bookLink);
            let downloadLink = storage.getValue(cacheKey, DOWNLOAD_EXPIRED_TIME);
            if (downloadLink !== null) {
                resolve({ downloadLink: downloadLink, siteName: siteConfig.siteName });
            } else {
                getResult({ url: options.bookLink, type: REQUEST_TYPE_DOWNLOAD }).then((response) => {
                    let html = new DOMParser().parseFromString(response, "text/html");
                    let downloadLink = siteConfig.downloadLink(html);
                    storage.setValue(cacheKey, downloadLink);
                    resolve({ downloadLink: downloadLink, siteName: siteConfig.siteName })
                });
            }
        });
    } else if (type === DOWNLOAD_TYPE_PROCESS) {
        return new Promise((resolve, reject) => {
            resolve({ downloadLink: downloadConfig[options.site].downloadLink(options.bookItem), siteName: downloadConfig[options.site].siteName })
        });
    }
};
let insertDownloadButton = () => {
    let select = '<div class="btn-group" id="download-list" style="display:none"><button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-warning dropdown-toggle"><span>去下载</span>&nbsp;<span class="caret"></span></button><ul class="dropdown-menu" id="download-items"></ul></div>';
    let obj = document.getElementsByClassName('sokk-book-button-groups')[0];
    obj.insertAdjacentHTML('beforeend', select);
};
let addDownLoadLink = (options) => {
    let siteConfig = downloadConfig[options.site];
    let youBookName = document.getElementsByClassName('col-sm-7')[0].children[0].innerText;
    let youBookAuthor = document.getElementsByClassName('list-unstyled list-sm')["0"].firstChild.children["0"].innerText;
    let cacheKey = 'YOOSUU:GET:BOOKLINK:' + options.site + ':' + youBookAuthor + ':' + youBookName;
    let cacheValue = storage.getValue(cacheKey, DOWNLOAD_EXPIRED_TIME);
    if (cacheValue !== null) {
        if (cacheValue.isMatch) {
            downloadHandle[options.site]({ site: options.site, bookLink: cacheValue.bookLink, bookItem: new DOMParser().parseFromString(cacheValue.bookItem, "text/html") }).then(insertDownLink);
        }
    } else {
        getResult(Object.assign(siteConfig.searchConfig({ bookName: youBookName }), { type: REQUEST_TYPE_DOWNLOAD })).then((response) => {
            let html = new DOMParser().parseFromString(response, "text/html");
            let bookList = siteConfig.bookList(html)
            let bookLink = '';
            let bookItem = '';
            let isMatch = bookList.some((item) => {
                bookLink = siteConfig.bookLink(item);
                let matchBookName = siteConfig.bookName(item);
                let matchBookAuthor = siteConfig.bookAuthor(item);
                if (matchBookName === youBookName && matchBookAuthor === youBookAuthor) {
                    bookItem = item;
                    return true;
                }
            });
            storage.setValue(cacheKey, { bookLink: bookLink, isMatch: isMatch, bookItem: bookItem.innerHTML });
            if (isMatch) {
                downloadHandle[options.site]({ site: options.site, bookLink: bookLink, bookItem: bookItem }).then(insertDownLink);
            }
        });
    }
};
let insertDownLink = options => {
    let obj = document.querySelector('#download-items');
    let item = '<li><a href="' + options.downloadLink + '" target="_blank" rel="noreferrer">' + options.siteName + '</a></li>';
    obj.insertAdjacentHTML('beforeend', item);
    if (obj.parentElement.style.display === 'none') {
        obj.parentElement.setAttribute('style', 'display:run-in');
    }
};
let getRate = args => {
    let bookName = args.bookName;
    let bookAuthor = args.bookAuthor;
    let maxNum = (args.maxNum === undefined) ? 1 : args.maxNum;
    return new Promise((resolve, reject) => {
        let cacheKey = 'YOUSUU:GET:RATE:' + bookAuthor + ':' + bookName;
        let data = storage.getValue(cacheKey, SEARCH_EXPIRED_TIME);
        if (data !== null) {
            resolve(data);
        } else {
            getResult({ url: 'http://www.yousuu.com/search/' + bookName + bookAuthor + '?type=all', type: REQUEST_TYPE_SOURCE }).then((response) => {
                let rate = 0;
                let rateNum = 0;
                let bookLink = '';
                let html = new DOMParser().parseFromString(response, "text/html");
                let matchBook = Array.prototype.slice.call(html.getElementsByClassName('col-lg-4 col-md-6 col-xs-12')).slice(0, maxNum);
                matchBook.some((item) => {
                    let matchTitle = item.querySelector('.title');
                    let matchName = matchTitle.innerText;
                    let matchAbstract = item.querySelector('.abstract').innerHTML.split('<br>');
                    let matchAuthor = matchAbstract[0].split(':')[1].replace(/<\/?[^>]*>/g, '').trim();
                    if (matchAuthor === bookAuthor && matchName === bookName) {
                        rate = item.querySelector('.num2star').innerHTML;
                        rateNum = item.querySelector('.rating').innerText.replace(/[^0-9]/ig, "");
                        bookLink = 'http://www.yousuu.com' + matchTitle.querySelector('a').pathname;
                        return true;
                    }
                });
                let data = { rate: rate, rateNum: rateNum, bookLink: bookLink };
                storage.setValue(cacheKey, data);
                resolve(data);
            });
        }
    });
};
let insertRate = options => {
    let siteConfig = sourceConfig[options.site];
    let args = { bookName: siteConfig.bookName(options.item), bookAuthor: siteConfig.bookAuthor(options.item), maxNum: siteConfig.maxNum };
    getRate(args).then((data) => {
        let rate = data.rate;
        let rateNum = data.rateNum;
        let bookLink = data.bookLink;
        if (rate !== 0 || rateNum !== 0) {
            let rateItem = siteConfig.rateItem(rate, rateNum, bookLink);
            siteConfig.anchorObj(options.item).insertAdjacentHTML(siteConfig.anchorPos, rateItem);
        }
    });
};
let checkCanUse = () => {
    let message = '脚本 [优书网 <=> 知轩藏书] ';
    let canUse = true;
    if (typeof GM_xmlhttpRequest === "undefined") {
        message += "暂不支持 Greasemonkey 4.x, 请使用 Tampermonkey 或 Violetmonkey 。";
        canUse = false;
    }
    localStorageStatus = checkLocalStorage();
    return { canUse: canUse, message: message };
};
$(document).ready(() => {
    'use strict';
    let checkResult = checkCanUse();
    if (!checkResult.canUse) {
        alert(checkResult.message);
        return;
    }
    if (Object.keys(sourceRoute).includes(location.hostname)) {
        let site = sourceRoute[location.hostname]();
        sourceHandle[site](site, insertRate);
    }
    if (Object.keys(downloadRoute).includes(location.hostname)) {
        let sites = Object.keys(downloadConfig);
        insertDownloadButton();
        sites.map(site => {
            addDownLoadLink({ site: site });
        });
    }
});