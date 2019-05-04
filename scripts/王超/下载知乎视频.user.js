// ==UserScript==
// @name         下载知乎视频
// @version      1.13
// @description  为知乎的视频播放器添加下载功能
// @author       Chao
// @include      *://www.zhihu.com/*
// @match        *://www.zhihu.com/*
// @include      https://v.vzuu.com/video/*
// @match        https://v.vzuu.com/video/*
// @connect      zhihu.com
// @connect      vzuu.com
// @grant        GM_info
// @grant        GM_download
// @grant        unsafeWindow
// @namespace    https://greasyfork.org/users/38953
// ==/UserScript==
/* jshint esversion: 6 */

(async () => {
    if (window.location.host == 'www.zhihu.com') return;

    const playlistBaseUrl = 'https://lens.zhihu.com/api/videos/';
    const videoBaseUrl = 'https://v.vzuu.com/video/';
    const videoId = window.location.pathname.split('/').pop(); // 视频id
    const menuStyle = 'transform:none !important; left:auto !important; right:-0.5em !important;';
    const playerSelector = '#player';
    const controlBarSelector = playerSelector + ' > div:first-child > div:first-child > div:last-child > div:last-child > div:first-child';
    const svgDownload = '<path d="M9.5,4 H14.5 V10 H17.8 L12,15.8 L6.2,10 H9.5 Z M6.2,18 H17.8 V20 H6.2 Z"></path>';
    const svgCircle = '<circle cx="12" cy="12" r="8" fill="none" stroke-width="2" stroke="#555" />' +
        '<text x="50%" y="50%" dy=".4em" text-anchor="middle" fill="#fff" font-size="9"></text>' +
        '<path fill="none" r="8" transform="translate(12,12)" stroke-width="2" stroke="#fff" />';
    const svgConvert = '<circle cx="12" cy="12" r="8" fill="none" stroke-width="2" stroke="#fff" />' +
        '<path d="M13,7 L17,10 V11 H7 V10 H15 L12,8 Z M9,16 L7,14 V13 H17 V14 H9 L10,16 Z"></path>';
    const wechatIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABuElEQVQ4T6WSv2uTQRjHv9/L+4YiCWpbo6jgJE5u4lIVAnYwl6SjIFLQv8HBRcFFBBcVoaXgIl0UMVwuBHR0sLSdClKogw5iqyIogjhE7itXUnkb3qagBzfc8+PzPPd9HuI/D7P5zrkJY8w5SSnJDWPMmrX21bAamwDv/R4ATwHYwWBJi0mSXK3Vaqt5IHrvxwG8BnB8SKUfks43m83lwRi22+27JK9FRwjhkDHmPoCLANTr9Q4kSfKI5JSk9XK5fKxarf7OQiLgE8mDfeNHSRWSaXxL+kByRNIzkl9IPq7X6++2Abz3PwFEDfLOCwC3JN0keRLAYQBfATwolUp3Yjexg5ckJ3Oy34QQrpN8TrKY419K0/RCFPG0pAWSJhsk6RLJGQB7AdyQNEXylKTbJM8CiHd2a4xXAMwBSLYgIYTLxpj5jDYjJMckfQZAkhVJ3/8ukvd+Q9IvAOMky5Kmo2i7LOq3TUC32z0aQjhjrX1CUtHW6XT2S3rf/8JOnIfbVnkwyjk3SbKzg4gLhUKhOhQQgc65EyTv9cd4pL8bowAmGo3Gyq6AvN5brda+YrFYsda+/SdAFvoH5C+l3GRotdcAAAAASUVORK5CYII=';
    let videos = []; // 存储各分辨率的视频信息
    let format = []; // 下载的格式; ts, mp4
    let blobs = null; // 存储视频段
    let ratio;
    let errors = 0;

    do {
        await wait(500);
    }
    while (!document.querySelector(controlBarSelector + '> div:nth-last-of-type(1)') || !document.querySelector(controlBarSelector + '> div:nth-last-of-type(1)').querySelectorAll('button')[0]);

    const domControlBar = document.querySelector(controlBarSelector);
    const domFullScreenBtn = document.querySelector(controlBarSelector + '> div:nth-last-of-type(1)');
    let domDownloadBtn = domFullScreenBtn.cloneNode(true); // 克隆全屏按钮为下载按钮
    let downloading = false;

    function wait(time) {
        return new Promise(function (resolve, reject) {
            setTimeout(resolve, time);
        });
    }

    function fetchRetry(url, options = {}, times = 1, delay = 1000, checkStatus = true) {
        return new Promise((resolve, reject) => {
            // fetch 成功处理函数
            function success(res) {
                if (checkStatus && !res.ok) {
                    failure(res);
                }
                else {
                    resolve(res);
                }
            }

            // 单次失败处理函数
            function failure(error) {
                times--;

                if (times) {
                    setTimeout(fetchUrl, delay);
                }
                else {
                    reject(error);
                }
            }

            // 总体失败处理函数
            function finalHandler(error) {
                throw error;
            }

            function fetchUrl() {
                return fetch(url, options)
                    .then(success)
                    .catch(failure)
                    .catch(finalHandler);
            }

            fetchUrl();
        });
    }


    function getBrowerInfo() {
        let browser = (function (window) {
            let document = window.document;
            let navigator = window.navigator;
            let agent = navigator.userAgent.toLowerCase();
            // IE8+支持.返回浏览器渲染当前文档所用的模式
            // IE6,IE7:undefined.IE8:8(兼容模式返回7).IE9:9(兼容模式返回7||8)
            // IE10:10(兼容模式7||8||9)
            let IEMode = document.documentMode;
            let chrome = window.chrome || false;
            let system = {
                // user-agent
                agent: agent,
                // 是否为IE
                isIE: /trident/.test(agent),
                // Gecko内核
                isGecko: agent.indexOf('gecko') > 0 && agent.indexOf('like gecko') < 0,
                // webkit内核
                isWebkit: agent.indexOf('webkit') > 0,
                // 是否为标准模式
                isStrict: document.compatMode === 'CSS1Compat',
                // 是否支持subtitle
                supportSubTitle: function () {
                    return 'track' in document.createElement('track');
                },
                // 是否支持scoped
                supportScope: function () {
                    return 'scoped' in document.createElement('style');
                },

                // 获取IE的版本号
                ieVersion: function () {
                    let rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
                    let match = rMsie.exec(agent);
                    try {
                        return match[2];
                    } catch (e) {
                        return IEMode;
                    }
                },
                // Opera版本号
                operaVersion: function () {
                    try {
                        if (window.opera) {
                            return agent.match(/opera.([\d.]+)/)[1];
                        }
                        else if (agent.indexOf('opr') > 0) {
                            return agent.match(/opr\/([\d.]+)/)[1];
                        }
                    } catch (e) {
                        return 0;
                    }
                }
            };

            try {
                // 浏览器类型(IE、Opera、Chrome、Safari、Firefox)
                system.type = system.isIE ? 'IE' :
                    window.opera || (agent.indexOf('opr') > 0) ? 'Opera' :
                        (agent.indexOf('chrome') > 0) ? 'Chrome' :
                            //safari也提供了专门的判定方式
                            window.openDatabase ? 'Safari' :
                                (agent.indexOf('firefox') > 0) ? 'Firefox' :
                                    'unknow';

                // 版本号
                system.version = (system.type === 'IE') ? system.ieVersion() :
                    (system.type === 'Firefox') ? agent.match(/firefox\/([\d.]+)/)[1] :
                        (system.type === 'Chrome') ? agent.match(/chrome\/([\d.]+)/)[1] :
                            (system.type === 'Opera') ? system.operaVersion() :
                                (system.type === 'Safari') ? agent.match(/version\/([\d.]+)/)[1] :
                                    '0';

                // 浏览器外壳
                system.shell = function () {
                    if (agent.indexOf('edge') > 0) {
                        system.version = agent.match(/edge\/([\d.]+)/)[1] || system.version;
                        return 'Edge';
                    }
                    // 遨游浏览器
                    if (agent.indexOf('maxthon') > 0) {
                        system.version = agent.match(/maxthon\/([\d.]+)/)[1] || system.version;
                        return 'Maxthon';
                    }
                    // QQ浏览器
                    if (agent.indexOf('qqbrowser') > 0) {
                        system.version = agent.match(/qqbrowser\/([\d.]+)/)[1] || system.version;
                        return 'QQBrowser';
                    }
                    // 搜狗浏览器
                    if (agent.indexOf('se 2.x') > 0) {
                        return '搜狗浏览器';
                    }

                    // Chrome:也可以使用window.chrome && window.chrome.webstore判断
                    if (chrome && system.type !== 'Opera') {
                        let external = window.external;
                        let clientInfo = window.clientInformation;
                        // 客户端语言:zh-cn,zh.360下面会返回undefined
                        let clientLanguage = clientInfo.languages;

                        // 猎豹浏览器:或者agent.indexOf("lbbrowser")>0
                        if (external && 'LiebaoGetVersion' in external) {
                            return 'LBBrowser';
                        }
                        // 百度浏览器
                        if (agent.indexOf('bidubrowser') > 0) {
                            system.version = agent.match(/bidubrowser\/([\d.]+)/)[1] ||
                                agent.match(/chrome\/([\d.]+)/)[1];
                            return 'BaiDuBrowser';
                        }
                        // 360极速浏览器和360安全浏览器
                        if (system.supportSubTitle() && typeof clientLanguage === 'undefined') {
                            let storeKeyLen = Object.keys(chrome.webstore).length;
                            let v8Locale = 'v8Locale' in window;
                            return storeKeyLen > 1 ? '360极速浏览器' : '360安全浏览器';
                        }
                        return 'Chrome';
                    }
                    return system.type;
                };

                // 浏览器名称(如果是壳浏览器,则返回壳名称)
                system.name = system.shell();
                // 对版本号进行过滤过处理
                // System.version = System.versionFilter(System.version);

            } catch (e) {
                // console.log(e.message);
            }

            return system;

        })(window);

        if (browser.name == undefined || browser.name == '') {
            browser.name = 'Unknown';
            browser.version = 'Unknown';
        }
        else if (browser.version == undefined) {
            browser.version = 'Unknown';
        }
        return browser;
    }

    function bytesToSize(bytes) {
        let n = Math.log(bytes) / Math.log(1024) | 0;
        return (bytes / Math.pow(1024, n)).toFixed(0) + ' ' + (n ? 'KMGTPEZY'[--n] + 'B' : 'Bytes');
    }

    // 下载 m3u8 文件
    async function downloadM3u8(url) {
        const res = await fetchRetry(url, {}, 3);
        const m3u8 = await res.text();
        let i = 0;

        blobs = [];
        ratio = 0;
        errors = 0;

        // 初始化进度显示
        domDownloadBtn.querySelector('svg').innerHTML = svgCircle;
        updateProgress(0);

        m3u8.split('\n').forEach(function (line) {
            if (line.match(/\.ts/)) {
                blobs[i] = undefined;
                downloadTs(url.replace(/\/[^\/]+?$/, '/' + line), i++);
            }
        });
    }

    // 下载 m3u8 文件中的单个 ts 文件
    async function downloadTs(url, order) {
        let res;
        let blob;

        try {
            res = await fetchRetry(url, {}, 5);
            blob = await res.blob();

        } catch (e) {
            if (++errors == 1) {
                resetDownloadIcon();
                alert('下载视频失败，请重新下载。');
            }
            return;
        }

        ratio++;
        blobs[order] = blob;

        errors ? resetDownloadIcon() : updateProgress(Math.round(100 * ratio / blobs.length));

        store();
    }

    // 保存视频文件
    async function store() {
        for (let [index, blob] of blobs.entries()) {
            if (blob === undefined) return;
        }

        let blob = new Blob(blobs, {type: 'video/h264'});

        blobs = null;

        if (format == 'mp4-transform') {
            domDownloadBtn.querySelector('svg').innerHTML = svgConvert;
            blob = await convertToMp4(blob);
        }

        downloading = false;
        downloadBlob(blob);
    }

    // 下载 blob 里的视频
    function downloadBlob(blob) {
        let name = (new Date()).valueOf() + '.mp4'; //  + format
        let navigator = window.navigator;
        let url;

        // ArrayBuffer -> blob
        if (blob instanceof ArrayBuffer) {
            blob = new Blob([blob]);
        }

        // 结束进度显示
        resetDownloadIcon();

        // edge
        if (navigator && navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, name);
        }
        else {
            url = URL.createObjectURL(blob);
            downloadUrl(url, name);
        }
    }

    // 下载指定url的资源
    async function downloadUrl(url, name = (new Date()).valueOf() + '.mp4') {
        let browser = getBrowerInfo();

        // Greasemonkey 需要把 url 转为 blobUrl
        if (GM_info.scriptHandler == 'Greasemonkey') {
            let res = await fetchRetry(url);
            let blob = await res.blob();
            url = URL.createObjectURL(blob);
        }

        // Chrome 可以使用 Tampermonkey 的 GM_download 函数绕过 CSP(Content Security Policy) 的限制
        if (window.GM_download) {
            GM_download({url, name});
        }
        else {
            // firefox 需要禁用 CSP, about:config -> security.csp.enable => false
            let a = document.createElement('a');
            a.href = url;
            a.download = name;
            // a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            setTimeout(function () {
                URL.revokeObjectURL(url);
            }, 100);
        }
    }

    // 重置下载图标
    function resetDownloadIcon() {
        domDownloadBtn.querySelector('svg').innerHTML = svgDownload;
    }

    // 更新下载进度界面
    function updateProgress(percent) {
        let r = 8;
        let degrees = (percent == 100 ? 99.9999 : percent) / 100 * 360; // 进度对应的角度值
        let rad = degrees * (Math.PI / 180); // 角度对应的弧度值
        let x = (Math.sin(rad) * r).toFixed(2); // 极坐标转换成直角坐标
        let y = -(Math.cos(rad) * r).toFixed(2);
        let lenghty = Number(degrees > 180); // 大于180°时画大角度弧，小于180°时画小角度弧，(deg > 180) ? 1 : 0
        let paths = ['M', 0, -r, 'A', r, r, 0, lenghty, 1, x, y]; // path 属性

        domDownloadBtn.querySelector('svg > path').setAttribute('d', paths.join(' '));
        domDownloadBtn.querySelector('svg > text').textContent = percent;
    }

    // load QRCode js
    async function loadQrcode() {
        if (!unsafeWindow.qrcode) {
            return new Promise((resolve, reject) => {
                let script = document.createElement('script');
                script.src = 'https://cdn.rawgit.com/kazuhikoarase/qrcode-generator/3c72b1bb/js/qrcode.js';
                script.addEventListener('load', () => {
                    resolve();
                });
                document.body.appendChild(script);
            });
        }
    }

    // load ffmpeg js
    async function loadFfmpeg() {
        if (!unsafeWindow.ffmpegJS) {
            const res = await fetchRetry('https://cdn.rawgit.com/bgrins/videoconverter.js/42def8c4/build/ffmpeg.js');
            const js = await res.text();
        }
        return unsafeWindow.ffmpegJS;
    }

    // ts blob -> mp4 blob
    async function convertToMp4(blob) {
        let hasError = false;
        // const ffmpegJsUrl = 'https://cdn.rawgit.com/bgrins/videoconverter.js/42def8c4/build/ffmpeg.js';
        // const ffmpegJsUrl = 'https://gitee.com/dntc/videoconverter.js/raw/master/build/ffmpeg.js';
        const ffmpegJsUrl = 'https://coding.net/u/dntc/p/videoconverter.js/git/raw/master/build/ffmpeg.js';
        const orgPrompt = unsafeWindow.prompt;
        const buffer = await (new Response(blob)).arrayBuffer();
        const fileData = new Uint8Array(buffer);
        const importFfmpegJs = 'importScripts("' + ffmpegJsUrl + '");';
        const workerJs = importFfmpegJs + `
            function print(text) {
                postMessage({
                    type: 'stdout',
                    data: text
                });
            }

            onmessage = function(event) {
                const message = event.data;

                if (message.type === 'command') {
                    const module = {
                        files: message.files || [],
                        arguments: message.arguments || [],
                        print: print,
                        printErr: print,
                        TOTAL_MEMORY: message.TOTAL_MEMORY || false
                    };

                    postMessage({
                        type: 'start',
                        data: module.arguments.join(' ')
                    });

                    postMessage({
                      type: 'stdout',
                      data: 'Received command: ' + module.arguments.join(' ') +
                        ((module.TOTAL_MEMORY) ? '.  Processing with ' + module.TOTAL_MEMORY + ' bits.' : '')
                    });

                    const time = Math.floor((new Date()).getTime() / 1000);
                    const result = ffmpeg_run(module);
                    const totalTime = Math.floor((new Date()).getTime() / 1000) - time;

                    postMessage({
                        type: 'stdout',
                        data: 'Finished processing (took ' + totalTime + 'm)'
                    });

                    postMessage({
                        type : 'done',
                        data : result,
                        time : totalTime
                    });
                }
            };

            postMessage({
                type: 'ready'
            });
        `;
        const workerBlob = new Blob([workerJs], {'type': 'application/javascript'});
        const worker = new Worker(URL.createObjectURL(workerBlob));
        const parseArguments = function (text) {
            text = text.replace(/\s+/g, ' ');
            let args = [];
            // Allow double quotes to not split args.
            text.split('"').forEach(function (t, i) {
                t = t.trim();
                if ((i % 2) === 1) {
                    args.push(t);
                }
                else {
                    args = args.concat(t.split(' '));
                }
            });
            return args;
        };

        let files;

        return new Promise(function (resolve, reject) {
            worker.onmessage = function (event) {
                const message = event.data;

                if (message.type == 'ready') {
                    console.log('ffmpeg 格式转换代码加载完毕');

                    // worker.postMessage({
                    //     type: 'command',
                    //     arguments: ['-help']
                    // })

                    worker.postMessage({
                        type: 'command',
                        TOTAL_MEMORY: 268435456, // 256M, must be a power of 2
                        arguments: parseArguments('-i zhihu.ts -vf showinfo -strict -2 output.mp4'),
                        files: [
                            {
                                name: 'zhihu.ts',
                                data: fileData
                            }
                        ]
                    });
                }
                else if (message.type == 'start') {
                    console.log('Worker has received command');
                }
                else if (message.type == 'stdout') {
                    console.log(message.data);
                    if (!hasError && message.data.indexOf('TOTAL_MEMORY') != -1) {
                        hasError = true;
                        alert('分配的内存不足，转换出错。');
                    }
                }
                else if (message.type == 'done') {
                    // finishConvert();
                    const files = message.data;
                    resolve(new Blob([files[0].data]));
                }
            };
        });
    }

    // 获取视频信息
    const res = await fetchRetry(playlistBaseUrl + videoId, {
        headers: {
            'referer': 'refererBaseUrl + videoId',
            'authorization': 'oauth c3cef7c66a1843f8b3a9e6a1e3160e20' // in zplayer.min.js of zhihu
        }
    }, 3);
    const videoInfo = await res.json();

    // 获取不同分辨率视频的信息
    for (let [key, video] of Object.entries(videoInfo.playlist)) {
        video.name = key;

        if (!videos.find(v => v.width == video.width)) {
            videos.push(video);
        }
    }

    // 按分辨率大小排序
    videos = videos.sort(function (v1, v2) {
        return v1.width == v2.width ? 0 : (v1.width > v2.width ? 1 : -1);
    }).reverse();

    // 生成下载按钮图标
    domDownloadBtn.querySelector('button:first-child').outerHTML = domFullScreenBtn.cloneNode(true).querySelector('button').outerHTML;
    domDownloadBtn.querySelector('svg').innerHTML = svgDownload;

    // 鼠标事件 - 选择菜单项
    domDownloadBtn.addEventListener('pointerup', event => {
        let e = event.srcElement || event.target;

        if (downloading) {
            alert('当前正在执行下载任务，请等待任务完成。');
            return;
        }

        downloadUrl(videos[0].play_url);
    });

    // 显示下载按钮
    domControlBar.appendChild(domDownloadBtn);
})();