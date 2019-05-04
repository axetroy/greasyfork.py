// ==UserScript==
// @name         嗅探迅雷链接 Jaeger
// @namespace    https://gist.github.com/jae-jae/70f175342130f11df1ae7bd54b93581e
// @version      1.4.4
// @description  嗅探页面内所有迅雷下载链接,方便批量离线下载
// @author       Jaeger <JaegerCode@gmail.com>
// @icon        http://lixian.vip.xunlei.com/favicon.ico
// @include        *
// @require     https://greasyfork.org/scripts/23419-l-js/code/ljs.js?version=148792
// @require     https://greasyfork.org/scripts/23420-userjs-base-js/code/userjs-basejs.js?version=148793
// @grant        GM_xmlhttpRequest
// @connect     cdn.bootcss.com
// @connect     raw.githubusercontent.com
// @connect     gist.githubusercontent.com
// @connect     cdnjs.cloudflare.com
// @grant        GM_setClipboard
// @run-at      document-end
// ==/UserScript==
(function () {
 
    ThunderDL = {
        rules: [/^ed2k:\/\//,/^thunder:\/\//,/^ftp:\/\//,/^magnet:\?xt=/],
        urls: [],
        filter: function (url) {
            var _this = this;
            url = $.trim(url);
            this.rules.forEach(function (rule) {
                if (url.match(rule) !== null && _this.urls.indexOf(url) === -1) {
                    _this.urls.push(url);
                }
            });
        },
        getLinks: function () {
            var _this = this;
            $('a').each(function () {
                var url = $(this).attr("href");
                var text = $(this).text();
                url && _this.filter(url);
                text && _this.filter(text);
            });
            $('input,textarea').each(function () {
                var url = $(this).val();
                url && _this.filter(url);
            });
            return this;
        },
        run: function () {
            var urls = this.getLinks().urls;
            layer.open({
                title:'迅雷链接('+urls.length+'条)',
                area:['800px','600px'],
                btn:['复制','迅雷离线','关闭'],
                btn1:function(){
                    var txt = $('#ThunderDLUrls').val();
                    GM_setClipboard(txt,'text');
                    layer.tips('已复制','.layui-layer-btn0',{
                        tips: [1, '#0FA6D8'] //还可配置颜色
                    });
                },
                btn2:function(){
                    window.open('http://lixian.xunlei.com');
                },
                content:"<textarea id='ThunderDLUrls' style='width:100%;height:95%' rows='30' cols='100'>" + urls.join("\r\n") + "</textarea>"
            });
            console.log(urls);
        }
    };
    
 
    ljs.exec(['layer','hotkeys'],function(){
        $(document).bind('keydown', 'alt+x', function(){
            ThunderDL.run();
        });
    });
    
})();