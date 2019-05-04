// ==UserScript==
// @name         简单小说阅读器
// @version      0.1.5
// @description  为各个小说站增加小说阅读器，遇到支持的小说站后会自动转码成为通用的阅读器样式方便使用，并为小说站扩展语音阅读功能（需要浏览器支持，推荐最新版Firefox浏览器）
// @author       pppploi8
// @match        https://*/*
// @match        http://*/*
// @grant        none
// @namespace https://greasyfork.org/users/240492
// ==/UserScript==

(function() {
    var $ = function(selector){
        return document.querySelector(selector);
    }

    var rules = {'www.shencou.com': {path: '/read/.*\.html', func: function(){
        if (location.pathname.endsWith('/index.html')) return null; // 目录页，不解析
        var title = $('h1').innerText;
        $('h1').style.display = 'none';
        var content = $('#content').innerText;
        $('h1').style.display = 'block'; // 恢复原网页
        return {
            title: title,
            content: content,
            pageup: $('img[src="http://www.shencou.com/logo/h.gif"]').parentNode.href,
            pageindex: location.href.substring(0, location.href.lastIndexOf('/') + 1),
            pagedown: $('img[src="http://www.shencou.com/logo/x.gif"]').parentNode.href
        };
    }},'m.shencou.com':{path:'/wapreader.php', func: function(){
        return {
            title: $('#nr_title').innerText,
            content: $('#nr').innerText,
            pageup: $('#pb_prev').href,
            pageindex: $('#pb_mulu').href,
            pagedown: $('#pb_next').href
        };
    }},'www.booktxt.net': {path: '.*\.html', func: function(){
        return {
            title: $('h1').innerText,
            content: $('#content').innerText,
            pageup: jQuery('.bottem1 a').eq(1).attr('href'),
            pageindex: location.href.substring(0, location.href.lastIndexOf('/') + 1),
            pagedown: jQuery('.bottem1 a').eq(3).attr('href')
        };
    }},'m.wuyanxia.net': {path: '.*\.html', func: function(){
        return {
            title: jQuery('.zhong').text(),
            content: jQuery('#nr')[0].innerText,
            pageup: jQuery('.nr_page a').eq(3).attr('href'),
            pageindex: location.href.substring(0, location.href.lastIndexOf('/')) + '.html',
            pagedown: jQuery('.nr_page a').eq(5).attr('href')
        };
    }},'m.9dxs.com':{path: '.*\.html', func: function(){
        return commonTemplate1(Zepto);
    }},'m.booktxt.net': {path: '/wapbook/.*\.html', func: function(){
        var ret = commonTemplate1(Zepto);
        ret.content = ret.content.replace('本章未完，请点击下一页继续阅读....', '');
        return ret;
    }},'m.biqukan.com': {path: '.*\.html', func: function(){
        var ret = commonTemplate2(jQuery);
        ret.content = ret.content.substring(content.indexOf('\n') + 1, content.lastIndexOf('\n'));
        return ret;
    }},'m.biqiuge.com': {path: '.*\.html', func: function(){
        var ret = commonTemplate2(Zepto);
        var content = ret.content;
        content = content.substring(content.indexOf('\n') + 1);
        content = content.replace('记住手机版网址：m.biqiuge.com', '').replace('『加入书签，方便阅读』', '');
        ret.content = content;
        return ret;
    }}};// 解析规则列表

    // 通用模板1，适用于所有使用Zepto/jQuery，标题是.title，内容是#chaptercontent，翻页是pt_的页面
    function commonTemplate1($){
        $('#chaptercontent p').hide();
        var content = $('#chaptercontent')[0].innerText;
        $('#chaptercontent p').show();

        return {
            title: $('.title').text(),
            content: content,
            pageup: $('#pt_prev').attr('href'),
            pageindex: $('#pt_mulu').attr('href'),
            pagedown: $('#pt_next').attr('href')
        };
    }

    // 通用模板2，适用于所有使用Zepto/jQuery，标题是.title，内容是#chaptercontent，翻页是pb_的页面
    function commonTemplate2($){
        var content = $('#chaptercontent')[0].innerText;
        return {
            title: $('.title').text(),
            content: content,
            pageup: $('#pb_prev').attr('href'),
            pageindex: $('#pb_mulu').attr('href'),
            pagedown: $('#pb_next').attr('href')
        };
    }

    var host = location.hostname;
    var path = location.pathname;
    var rule = rules[host];

    var fontsize = parseInt(localStorage["_er_fontsize"]||0);
    var autoplay = false;
    if (localStorage['_er-autoplay'] === 'true'){
        autoplay = true;
    }
    delete localStorage['_er-autoplay'];

    if (rule && new RegExp(rule.path).test(path)){
        var htmlContent = rule.func();
        if (htmlContent){
            createReader(htmlContent);
        }
    }


    // 创建阅读器
    function createReader(content){
        addClassAndDom();
        if (window.SpeechSynthesisUtterance){
            $('#_er-tts').style.display = 'block';
        }
        $('._er-title').innerText = content.title;
        var contentArr = content.content.split('\n');
        var contentHtml = '';
        for(var i=0;i<contentArr.length;i++){
            var line = contentArr[i];
            if (line){
                contentHtml += '<span>' + line + '</span>';
            }
            contentHtml += '<br>';
        }
        $('._er-content').innerHTML = contentHtml;
        var spanNodes = document.querySelectorAll('._er-content span');
        for(var i=0;i<spanNodes.length;i++){
            spanNodes[i].onclick = function(){
                for(var j=0;j<spanNodes.length;j++){
                    spanNodes[j].classList.remove('_er-current');
                }
                this.classList.add('_er-current');
            }
        }
        // 挂接键盘事件，实现键盘上下左右切换阅读功能
        $('body').onkeydown = function(e){
            switch(e.keyCode){
                case 38: // up
                    toPrevReadPos();
                    updateReadPos();
                    break;
                case 40: // down
                    toNextReadPos();
                    updateReadPos();
                    break;
                case 37: // left
                    $('._er').scrollTop = $('._er').scrollTop - (document.documentElement.clientHeight - 24)
                    break;
                case 39: // right
                    $('._er').scrollTop = $('._er').scrollTop + (document.documentElement.clientHeight - 24);
                    break;
                default:
                    return true;
            }
            return false;
        };
        $('._er-content').onclick = function(e){ // 适用于墨水屏的左右点击无动画翻页
            var x = e.pageX;
            var width = document.documentElement.clientWidth;
            if (x <= width*0.1){ // 前翻一页
                $('._er').scrollTop = $('._er').scrollTop - (document.documentElement.clientHeight - 24)
            }else if(x >= width*0.9){ // 后翻一页
                $('._er').scrollTop = $('._er').scrollTop + (document.documentElement.clientHeight - 24);
            }
        }
        $('#_er-pageindex').onclick = function(){
            location.href = content.pageindex;
        };
        $('#_er-pageup').onclick = function(){
            location.href = content.pageup;
        };
        $('#_er-pagedown').onclick = function(){
            location.href = content.pagedown;
        };
        $('#_er-pagedown').dataset['nexturl'] = content.pagedown;
        setFontSize();

        // 按钮事件处理
        $('#_er-close').onclick = removeDom;
        $('#_er-font-plus').onclick = function(){
            fontsize += 2;
            setFontSize();
        };
        $('#_er-font-minus').onclick = function(){
            fontsize -= 2;
            setFontSize();
        };

        $('#_er-tts').onclick = function(){
            if (this.dataset['pause'] === 'true'){
                // 开始播放
                this.innerText = '停止';
                this.dataset['pause'] = 'false';
                playNextText();
            }else{
                this.innerText = '听书';
                this.dataset['pause'] = 'true';
            }
        };

        if (autoplay){
            $('#_er-tts').innerText = '停止';
            $('#_er-tts').dataset['pause'] = 'false';
            playNextText();
        }else{
            $('#_er-tts').dataset['pause'] = 'true';
        }
    }

    // 听书功能
    function playNextText(){
        updateReadPos();
        var current = $('._er-current');
        var playText = '';
        if (current){
            playText = current.innerText;
        }else{
            playText = $('._er-title').innerText;
        }
        if (playText){
            var utterThis = new SpeechSynthesisUtterance();
            utterThis.text = playText;
            utterThis.onerror = function(){
                $('#_er-tts').dataset['pause'] = 'true';
                alert("TTS语音转换文字出现异常，听书已停止运行！");
            };
            utterThis.onend = function(){
                toNextReadPos();
                if (!$('._er-current')){
                    localStorage['_er-autoplay'] = 'true';
                    location.href = $('#_er-pagedown').dataset['nexturl'];
                    return;
                }
                if ($('#_er-tts').dataset['pause'] === 'false'){
                    playNextText();
                }
            };
            speechSynthesis.speak(utterThis);
        }else{
            toNextReadPos();
            playNextText();
        }
    }

    function toNextReadPos(){
        var current = $('._er-current');
        var nextSpan = null;
         if (current){
            nextSpan = current.nextElementSibling;
            while(nextSpan && nextSpan.nodeName !== 'SPAN'){
                nextSpan = nextSpan.nextElementSibling;
            }
        }else{
            nextSpan = $('._er-content span');
        }
        if (current) current.classList.remove('_er-current');
        if (nextSpan) nextSpan.classList.add('_er-current');
    }

    function toPrevReadPos(){
        var current = $('._er-current');
        var prevSpan = null;
        if (current){
            prevSpan = current.previousElementSibling;
            while(prevSpan && prevSpan.nodeName !== 'SPAN'){
                prevSpan = prevSpan.previousElementSibling;
            }
        }
        if (current) current.classList.remove('_er-current');
        if (prevSpan) prevSpan.classList.add('_er-current');
    }

    function updateReadPos(){
        if ($('._er-current'))
            $('._er').scrollTop =  $('._er-current').offsetTop - (document.documentElement.clientHeight / 2);
    }

    function setFontSize(){
        localStorage["_er_fontsize"] = fontsize;
        $('._er-title').style.fontSize = (20+fontsize) + 'px';
        $('._er-content').style.fontSize = (14+fontsize) + 'px';
    }

    var oldOverflow = '';
    var oldOnKeyDown = $('body').onkeydown;

    function removeDom(){
        $('._er').remove();
        $('body').style.overflow = oldOverflow;
        $('body').onkeydown = oldOnKeyDown;
    }

    function addClassAndDom(){
        oldOverflow = $('body').style.overflow;
        $('body').style.overflow = 'hidden';

        $('body').innerHTML +=
            '<style>' +
            '._er{' +
            '    position: fixed;' +
            '    left: 0;' +
            '    right: 0;' +
            '    top: 0;' +
            '    bottom: 0;' +
            '    overflow: auto;' +
            '    background-color: white;' +
            '    z-index: 201901272211;' +
            '}' +
            '._er-title{' +
            '    text-align: center;' +
            '    font-size: 20px;' +
            '    font-weight: 900;' +
            '    padding: 10px 10%;' +
            '    color: black;' +
            '}' +
            '._er-content{' +
            '    padding: 10px 10%;' +
            '    font-size: 14px;' +
            '    color: black;' +
            '}' +
            '._er-tools{' +
            '    margin-top: 10px;' +
            '    margin-bottom: 10px;' +
            '    text-align: center;' +
            '}' +
            '._er-tools button{' +
            '    cursor: pointer;' +
            '    color: green;' +
            '    border: 1px solid black;' +
            '    padding: 5px;' +
            '    border-radius: 10px;' +
            '}' +
            '._er-tts button{' +
            '    width: 50px;' +
            '    height: 50px;' +
            '    position: fixed;' +
            '    right: 15px;' +
            '    bottom: 15px;' +
            '    z-index: 201901272212;' +
            '    color: green;' +
            '    border: 1px solid black;' +
            '    opacity: 0.5;' +
            '    cursor: pointer;' +
            '    border-radius: 25px;' +
            '    display: none;' +
            '}' +
            '._er-current{' +
            '    background-color: yellow;' +
            '}' +
            '</style>';
        $('body').innerHTML +=
            '<div class="_er">' +
            '    <div class="_er-tts">' +
            '        <button type="button" id="_er-tts">听书</button>' +
            '    </div>' +
            '    <div class="_er-tools">' +
            '        <button type="button" id="_er-pageindex">目录</button>' +
            '        <button type="button" id="_er-font-plus">字体+</button>' +
            '        <button type="button" id="_er-font-minus">字体-</button>' +
            '        <button type="button" id="_er-close">返回原网页</button>' +
            '    </div>' +
            '    <div class="_er-title"></div>' +
            '    <div class="_er-content">' +
            '    </div>' +
            '    <div class="_er-tools">' +
            '        <button type="button" id="_er-pageup">上一页</button>' +
            '        <button type="button" id="_er-pagedown">下一页</button>' +
            '    </div>' +
            '</div>';
        $('head').innerHTML += '<meta name="viewport" content="width=device-width, initial-scale=1" />';
    }
})();