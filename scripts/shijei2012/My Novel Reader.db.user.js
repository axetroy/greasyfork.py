// ==UserScript==
// @id             MyNovelReaderDB@gmail.com
// @name           My Novel Reader.db
// @version        1.4
// @namespace      MyNovelReaderDB@gmail.com
// @author         ywzhaiqi@gmail.com
// @description    这是 小说阅读脚本 的自定义配置文件，脚本地址：https://greasyfork.org/scripts/292/
// @grant          none

// @include        http*://*.htm
// @include        http*://*.html
// @include        http*://*.shtm
// @include        http*://*.shtml
// @include        http*://*.aspx
// @include        http://www.jjwxc.net/onebook.php*
// @include        http://www.wcxiaoshuo.com/wcxs-*
// @include        http://www.shuhe.cc/*/*/
// @include        http://www.zhuzhudao.com/txt/*/*/
// @include        http://www.tadu.com/book/*
// @include        http://www.qishuwu.com/*
// @include        http://www.3gsc.com.cn/*
// @include        http://xs321.net/*
// @include        http://www.zhaoxiaoshuo.com/chapter-*

// @exclude        */List.html
// @exclude        */List.shtml
// @exclude        */index.html
// @exclude        */index.shtml
// @exclude        http*://bbs*
// @exclude        http*://*/viewforum*
// @exclude        http*://*/viewtopic*
// @run-at         document-end
// ==/UserScript==

/* 
部分代码来自 Super_preloader
*/

var config = {
    soduso: false,                  // www.sodu.so 跳转
    content_replacements: true,     // 小说屏蔽字修复
    fixImageFloats: true,           // 图片居中修正
    paragraphBlank: true,           // 统一段落开头的空格为 2个全角空格
    end_color: "#666666",           // 最后一页的    链接颜色
};


/**
 * 注意：
 *    1、自定义规则，优先级最高。
 *    2、小说阅读脚本只限定在一些网站（非全局），故你所添加的规则可能无法生效。
 *       解决方法：反馈给作者或在 Greasemonkey/Scriptish 脚本管理处加入。
 *    3、如果定义了站点规则会让内置的同个站点的规则失效
 *    4、格式要正确，后面要有,
 */

var SITE_INFO = [
    // 极简版规则
    {
        name: "纵横中文网",
        url: "^http://book\\.zongheng\\.com/\\S+\\/\\d+\\.html$",
        contentPatch: function(fakeStub){
            // 去除隐藏文字
            fakeStub.find('.watermark').remove();
        }
    },
    /**
     *  特殊规则，内容用js生成。需要用 iframe 方式或补丁方式（二选一）。
     *  下面的起点中文也是如此，但采用另一种补丁的方式。
     *      iframe方式简单，补丁方式需要分析代码（绿色无污染）。
     */
    // {
    //     name: "读读看",
    //     url: "^http://www\\.dudukan\\.net/html/.*\\.html$",
    //     exampleUrl: "http://www.dudukan.net/html/90/90733/19323854.html",
    //     contentReplace: "看小说.*|binhuo|www\\.92to\\.com",
    //     useiframe: true,    
    //     timeout: 500  // 要等待js把内容生成出来，单位毫秒
    // },

    // 详细版规则
    {
        // 没什么作用，随意起名
        name: "起点中文网",

        // 匹配的地址，正则。2种形式都可以
        url: "^http://read\\.qidian\\.com/\\S+/\\d+,\\d+.aspx$",

        // （可选）标题正则
        titleReg: "小说:(.*?)独家首发\\/(.*?)\\/.*",
        // （可选）0或1，代表书名的位置，另一个是章节位置
        titlePos: 0,

        // （可选）首页jQuery选择器
        indexSelector: ".pageopt a:contains('回目录')",
        // （可选）上一页jQuery选择器
        prevSelector: "a#PrevLink",
        // （可选）下一页jQuery选择器
        nextSelector: "a#NextLink",

        // （可选）内容jQuery选择器
        contentSelector: "#content",
        // （可选）内容移除，正则表达式
        contentReplace: "起点中文网|www\\.qidian\\.com|欢迎广大书友.*",

        // （可选）下面2个一起。如果加载的下一页没有成功，则设置这个为true或用下面的补丁。
        useiframe: false,
        timeout: 0,  // 延迟（毫秒），要等页面的js运行完毕才能获取到内容。

        // （可选）补丁，对页面的提前处理，fakeStub 为 $(document) 对象
        contentPatch: function(fakeStub){
            fakeStub.find('div#content script:first').addClass('reader-ajax');
        }
    },
];



// 自定义到此为止，下面的不要修改

var readerData = {
    config: config,
    SITE_INFO: SITE_INFO
};


var JSONString = xToString(readerData);
var postString = 'MyNovelReader.db' + JSONString;

postData();

window.addEventListener('message', function(e) {
    var data = e.data;
    switch (data) {
        case 'fromeMyNovelReader.post':
            postData();
            break;
        case 'fromeMyNovelReader.remove':
            // alert('remove');
            window.removeEventListener('message', arguments.callee, false); //释放闭包.
            break;
        default:
            break;
    }
}, false);


function postData() {
    window.postMessage(postString, '*');
}

function xToString(x) { //任何转字符串.
    function toStr(x) {
        //alert(typeof x);
        switch (typeof x) {
            case 'undefined':
                {
                    return Str(x);
                }
                break;
            case 'boolean':
                {
                    return Str(x);
                }
                break;
            case 'number':
                {
                    return Str(x);
                }
                break;
            case 'string':
                {
                    return ('"' +
                        (x.replace(/(?:\r\n|\n|\r|\t|\\|")/g, function(a) {
                        var ret;
                        switch (a) { //转成字面量
                            case '\r\n':
                                {
                                    ret = '\\r\\n'
                                }
                                break;
                            case '\n':
                                {
                                    ret = '\\n';
                                }
                                break;
                            case '\r':
                                {
                                    ret = '\\r'
                                }
                                break;
                            case '\t':
                                {
                                    ret = '\\t'
                                }
                                break;
                            case '\\':
                                {
                                    ret = '\\\\'
                                }
                                break;
                            case '"':
                                {
                                    ret = '\\"'
                                }
                                break;
                            default:
                                {}
                                break;
                        };
                        return ret;
                    })) + '"');
                    //'"'+x.replace(/\\/g,'\\\\').replace(/"/g,'\\"')+'"';
                }
                break;
            case 'function':
                {
                    /*
                var fnName=x.name;
                if(fnName && fnName!='anonymous'){
                    return x.name;
                }else{
                    var fnStr=Str(x);
                    return fnStr.indexOf('native code')==-1? fnStr : 'function(){}';
                };
                */
                    var fnStr = Str(x);
                    return fnStr.indexOf('native code') == -1 ? fnStr : 'function(){}';
                }
                break;
            case 'object':
                { //注,object的除了单纯{},其他的对象的属性会造成丢失..
                    if (x === null) {
                        return Str(x);
                    };
                    //alert(x.constructor);
                    switch (x.constructor) {
                        case Object:
                            {
                                var i;
                                var rStr = '';
                                for (i in x) {
                                    //alert(i);
                                    if (!x.hasOwnProperty(i)) { //去掉原型链上的属性.
                                        //alert(i);
                                        continue;
                                    };
                                    rStr += toStr(i) + ':' + toStr(x[i]) + ',';
                                };
                                return ('{' + rStr.replace(/,$/i, '') + '}');
                            }
                            break;
                        case Array:
                            {
                                var i;
                                var rStr = '';
                                for (i in x) {
                                    //alert(i);
                                    if (!x.hasOwnProperty(i)) { //去掉原型链上的属性.
                                        //alert(i);
                                        continue;
                                    };
                                    rStr += toStr(x[i]) + ',';
                                };
                                return '[' + rStr.replace(/,$/i, '') + ']';
                            }
                            break;
                        case String:
                            {
                                return toStr(Str(x));
                            }
                            break;
                        case RegExp:
                            {
                                return Str(x);
                            }
                            break;
                        case Number:
                            {
                                return Str(x);
                            }
                            break;
                        case Boolean:
                            {
                                return Str(x);
                            }
                            break;
                        default:
                            {
                                //alert(x.constructor);//漏了什么类型么?
                            }
                            break;
                    };
                }
                break;
            default:
                break;
        };
    };
    var Str = String;
    return toStr(x);
}