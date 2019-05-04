// ==UserScript==
// @name             划词翻译
// @name:ja          翻訳
// @namespace        http://www.icycat.com
// @description      选中文字自动翻译
// @description:ja   選択した文字の自動翻訳
// @author           冻猫
// @include          *
// @version          3.0
// @grant 		     GM_xmlhttpRequest
// @grant 		     GM_addStyle
// @grant            GM_getValue
// @grant            GM_setValue
// @require          https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @run-at           document-end
// ==/UserScript==

(function() {

    'use strict';

    if (!GM_getValue('toLanguage')) {
        console.log('没有设置语言，自动翻译到浏览器语言');
        if (/zh/i.test(navigator.language)) {
            GM_setValue('toLanguage', 'zh');
        } else if (/ja/i.test(navigator.language)) {
            GM_setValue('toLanguage', 'jp');
        } else if (/en/i.test(navigator.language)) {
            GM_setValue('toLanguage', 'en');
        }
    }

    function init() {
        var timer, holdTime, fromLanguage, toLanguage, text, spd, soundUrl, postData;

        createTipBox();

        document.addEventListener('mousedown', mouseStart, true);
        document.addEventListener('mouseup', mouseEnd, true);

        function mouseStart(e) {
            if (document.getElementById('catTipBox').style.display == 'block' && !/catTranslate/i.test(e.target.className)) {
                document.getElementById('catTipBox').style.display = '';
                document.getElementById('catContentBox').innerHTML = '';
                try {
                    window.catSource.stop();
                } catch (e) {};
            }
            document.addEventListener('mousemove', moveCheck, true);
            if (e.target.id == 'catPlaySound') {
                document.getElementById('catPlaySound').classList.add('catPlaySoundClick');
                getRequest(soundUrl);
            } else if (e.target.id == 'catSet') {
                showSet();
            } else if (e.target.id == 'catzh') {
                GM_setValue('toLanguage', 'zh');
                document.querySelector('.catdropdown').style.display = 'none';
                document.getElementById('catContentBox').innerHTML = '设置成功';
            } else if (e.target.id == 'catja') {
                GM_setValue('toLanguage', 'jp');
                document.querySelector('.catdropdown').style.display = 'none';
                document.getElementById('catContentBox').innerHTML = '設定成功';
            } else if (e.target.id == 'caten') {
                GM_setValue('toLanguage', 'en');
                document.querySelector('.catdropdown').style.display = 'none';
                document.getElementById('catContentBox').innerHTML = 'Set up successfully';
            }

        }

        function moveCheck() {
            clearTimeout(timer);
            holdTime = false;
            timer = setTimeout(function() {
                holdTime = true;
            }, 200);
        }

        function mouseEnd(e) {
            document.removeEventListener('mousemove', moveCheck, true);
            clearTimeout(timer);
            if (holdTime == true && window.getSelection().toString()) {
                holdTime = false;
                showTipBox(e.clientX, e.clientY);
                text = window.getSelection().toString();
                var encodeText = encodeURIComponent(text.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2'));
                if (/[\u3040-\u30FF]+/.test(text)) { //平假名Hiragana片假名Katakana
                    fromLanguage = 'jp';
                } else if (/[\uAC00-\uD7AF]/.test(text)) { //谚文音节Hangul Syllables
                    fromLanguage = 'kor';
                } else if (/[\u4E00-\u9FFF]+/.test(text)) { //中日韩统一表意文字CJK Unified Ideographs
                    fromLanguage = 'zh';
                } else if (/[\u0400-\u04FF]+/.test(text)) { //西里尔字母Cyrillic
                    fromLanguage = 'ru';
                } else { //英语
                    fromLanguage = 'en'
                }

                toLanguage = GM_getValue('toLanguage');

                if (fromLanguage == toLanguage) {
                    toLanguage = 'en';
                }

                postData = `from=${fromLanguage}&to=${toLanguage}&query=${encodeText}&source=txt`;

                if (fromLanguage == 'zh') {
                    spd = '5';
                } else {
                    spd = '3';
                }
                soundUrl = `https://fanyi.baidu.com/gettts?lan=${fromLanguage}&text=${encodeText}&spd=${spd}&source=web`;

                postRequest('https://fanyi.baidu.com/transapi', postData);
            }
            if (document.querySelector('.catPlaySoundClick')) {
                document.getElementById('catPlaySound').classList.remove('catPlaySoundClick');
            }
        }
    }

    function createTipBox() {
        GM_addStyle([
            '#catTipBox {max-width:360px;font:normal 12px/24px Helvetica, Tahoma, Arial, sans-serif;text-align: left;position: absolute;z-index: 2147483647;top: 22px;left: -35px;background: #fff;border: 1px solid #dcdcdc;border: 1px solid rgba(0,0,0,.2);-webkit-transition: opacity .218s;transition: opacity .218s;-webkit-box-shadow: 0 2px 4px rgba(0,0,0,.2);box-shadow: 0 2px 4px rgba(0,0,0,.2);padding: 5px 0;display: none;font-size: 12px;line-height: 20px;}',
            '#catContentBox {margin:0 8px;color:#333;}',
            '#catContentBox .catTextBox{margin: 2px 0 1px 0;}',
            '#catContentBox .catText{font-size:14px;font-weight: bold;color:#333;}',
            '#catTipBox .catTextBox span{margin-right: 4px;color:#333;font-weight: normal;font-size:12px;}',
            '#catTipBox .catExplains{font-weight: normal;font-size:12px;}',
            '#catPlaySound {margin-left: 1px;cursor:pointer;display: inline-block;vertical-align: middle;width: 14px;height: 11px;overflow: hidden;background: url("data:image/gif;base64,R0lGODlhDgAZAIAAABy3/f///yH5BAAAAAAALAAAAAAOABkAAAI1jA+nC7ncXmg0RlTvndnt7jlcxkmjqWzotLbui4qxqBpUmoDl2Nk5GOKRSsCfDyer7ZYMSQEAOw==") no-repeat;text-decoration: none;}',
            '#catPlaySound.catPlaySoundClick {background-position:0 -14px;}',
            '#catSet {margin: 4px 4px 0 0;cursor: pointer;display: inline-block;vertical-align: middle;width: 14px;height: 14px;overflow: hidden;background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAdVBMVEUAAAAwi/+Zxv9urv9oq/9pq/9Elv81jf89kv8wiv8+kv8wiv8xi/8wi/9/t/9+t/9co/9Zof9Hl/9Gl/9ClP9Bk/85j//k8f/Z6v+Fu//x+P/e7f/b6//G3/+/2/+w0/+q0P+52P+42P+Lvv+IvP9wr/9vr/864/KKAAAAF3RSTlMAR/7s7OK7l5VuTyMTC/z7y8ihnYSAQ/Vmp/0AAAB9SURBVAjXVY9HDsQwDAPpVKf32E7v/3/iGtJhk7kNIIgkLH0QA3EgQHTX7AnhzWdLKo9hMWYZdkmaFFpZdJ6QRo7afH9TTmSlqcy4hmkarqMpazxq0m4GZK6e1I37rQ/q8n9cNZ9XHJRzUMFBcucaB9doTy55dSAET+gB/ABPjgqB+Q/YPgAAAABJRU5ErkJggg==") no-repeat;text-decoration: none;float: right;}',
            '.catTipArrow {width: 0;height: 0;font-size: 0;line-height: 0;display: block;position: absolute;top: -16px;left: 10px;}',
            '.catTipArrow em, .catTipArrow ins {width: 0;height: 0;font-size: 0;line-height: 0;display: block;position: absolute;border: 8px solid transparent;border-style: dashed dashed solid;}',
            '.catTipArrow em {border-bottom-color: #d8d8d8;font-style: normal;color: #c00;}',
            '.catTipArrow ins {border-bottom-color: #fff;top: 2px;text-decoration: underline;background:none !important}'
        ].join('\n'));
        var catTipBox = document.createElement('div');
        catTipBox.id = 'catTipBox';
        catTipBox.className = 'catTranslate';
        var catContentBox = document.createElement('div');
        catContentBox.id = 'catContentBox';
        catContentBox.className = 'catTranslate';
        catContentBox.innerHTML = '';
        var catTipArrow = document.createElement('div');
        catTipArrow.className = 'catTipArrow';
        catTipArrow.appendChild(document.createElement('em'));
        catTipArrow.appendChild(document.createElement('ins'));
        catTipBox.appendChild(catContentBox);
        catTipBox.appendChild(catTipArrow);
        document.body.appendChild(catTipBox);
    }

    function showTipBox(mouseX, mouseY) {
        var catTipBox = document.getElementById('catTipBox');
        var selectedRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (selectedRect.width) {
            if (/Firefox/i.test(navigator.userAgent)) {
                catTipBox.style.top = selectedRect.y - document.body.getBoundingClientRect().y + selectedRect.height + 8 + 'px';
                catTipBox.style.left = selectedRect.x + selectedRect.width / 2 - 18 + 'px';
            } else {
                catTipBox.style.top = selectedRect.top - document.body.getBoundingClientRect().y + selectedRect.height + 8 + 'px';
                catTipBox.style.left = selectedRect.left + selectedRect.width / 2 - 18 + 'px';
            }
        } else {
            catTipBox.style.top = mouseY - document.body.getBoundingClientRect().y + selectedRect.height + 8 + 'px';
            catTipBox.style.left = mouseX + selectedRect.width / 2 - 18 + 'px';
        }

        catTipBox.style.display = 'block';
    }

    function parseRes(jsonRes) {

        var explains = '';
        var obj = JSON.parse(jsonRes);
        var result;

        //清空盒子
        var catContentBox = document.getElementById('catContentBox');
        catContentBox.innerHTML = '';

        //上盒子
        var catTextBox = document.createElement('div');
        catTextBox.className = 'catTextBox catTranslate';
        //选择的文本
        var catText = document.createElement('span');
        catText.className = 'catText catTranslate';
        //音标
        var catPhonetic = document.createElement('span');
        catPhonetic.className = 'catPhonetic catTranslate';
        //图标
        var catPlaySound = document.createElement('span');
        catPlaySound.id = 'catPlaySound';
        catPlaySound.className = 'catTranslate';
        //下盒子翻译
        var catExplains = document.createElement('div');
        catExplains.className = 'catExplains catTranslate';
        //词语
        if (obj.type == 1) {
            result = JSON.parse(obj.result);
            catText.innerHTML = result.src;
            catTextBox.appendChild(catText);
            if (result.voice) {
                if (obj.from == 'zh') {
                    catPhonetic.innerHTML = result.voice[0].phonic;
                } else {
                    catPhonetic.innerHTML = result.voice[1].us_phonic;
                }
                catTextBox.appendChild(catPhonetic);
            }
            if (result.content) {
                for (var i = 0; i < result.content[0].mean.length; i++) {
                    if (result.content[0].mean[i].pre) {
                        explains = explains + result.content[0].mean[i].pre + ' ';
                    }
                    for (var mean in result.content[0].mean[i].cont) {
                        explains = explains + mean + '; ';
                    }
                    if (i < result.content[0].mean.length - 1) {
                        explains = explains + '<br />';
                    }
                }
            }
            //句子
        } else if (obj.type == 2) {
            for (var i = 0; i < obj.data.length; i++) {
                //catText.innerHTML = catText.innerHTML + obj.data[i].src;
                explains = explains + obj.data[i].dst;
                if (i < obj.data.length - 1) {
                    //catText.innerHTML = catText.innerHTML + '<br />';
                    explains = explains + '<br />';
                }
            }
            catTextBox.appendChild(catText);
        }

        catExplains.innerHTML = explains;

        catTextBox.appendChild(catPlaySound);

        var catSet = document.createElement('span');
        catSet.id = 'catSet';
        catSet.className = 'catTranslate';
        catTextBox.appendChild(catSet);

        catContentBox.appendChild(catTextBox);
        catContentBox.appendChild(catExplains);

    }

    function showSet() {
        GM_addStyle([
            '#catTipBox #catSet .catdropdown {top:18px;right:-55px;display: block;position: absolute;background-color: #ffffff;width: 59px;overflow: auto;z-index: 1;border: 1px solid rgba(0,0,0,.2);box-shadow: 0 2px 4px rgba(0,0,0,.2);}',
            '#catTipBox #catSet .catdropdown span {color: black;padding: 6px 8px;margin:0px;text-decoration: none;display: block;text-align:center;}',
            '#catTipBox #catSet .catdropdown span:hover { background-color: #f1f1f1;}'
        ].join('\n'));
        $(
            '<div class="catdropdown catTranslate">' +
            '<span id="catzh" class="catTranslate">中文</span>' +
            '<span id="catja" class="catTranslate">日本語</span>' +
            '<span id="caten" class="catTranslate">English</span>' +
            '</div>'
        ).appendTo($('#catSet'));
    }

    function playSound(arraybuffer) {
        if (!window.audioCtx) {
            window.audioCtx = new AudioContext();
        }
        audioCtx.decodeAudioData(arraybuffer).then(function(buffer) {
            window.catSource = audioCtx.createBufferSource();
            window.catSource.buffer = buffer;
            window.catSource.connect(audioCtx.destination);
            window.catSource.start();
        });
    }

    function postRequest(url, data) {
        GM_xmlhttpRequest({
            method: 'POST',
            url: url,
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Referer': 'https://fanyi.baidu.com/'
            },
            onload: function(res) {
                parseRes(res.responseText);
            },
        });
    }

    function getRequest(url) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            headers: {
                'Referer': 'https://fanyi.baidu.com/'
            },
            responseType: 'arraybuffer',
            onload: function(res) {
                playSound(res.response);
            },
        });
    }

    init();

})();