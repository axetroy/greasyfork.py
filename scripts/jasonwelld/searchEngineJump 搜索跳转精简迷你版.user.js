// ==UserScript==
// @name           searchEngineJump 搜索跳转精简迷你版
// @author         NLF&锐经(修改) & iqxin(再修改) & jasonwelld(再再修改)
// @contributor    jasonwelld
// @description    方便的在各个搜索引擎之间跳转,增加可视化设置菜单，能更友好的自定义设置，做到最大兼容性
// @version        0.0.1
// @created        2011-7-2
// @lastUpdated    2018-02-21

// @namespace      https://greasyfork.org/zh-CN/scripts/38748-searchenginejump
// @homepage       https://github.com/jasonwelld/searchEngineJump

// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFSElEQVR4nMWXX4hdVxXGf2vfe89kJg61ia0DYzMTMWnoQ0FJtKmtJsFixT8DBSmYtGMLgq0PCqMEKwmxYzSGyUPBB7XRNi0FC6JtwYovgcS0klJD8SHakoExYhLQFkwn9/aeOfv7fDi3SStJ5o4muN4O7L32b33rz94H/s8WS10cvR3yVQaY++wnkESkwDK2sMy1EwXDtzRRziBhu+dGDG48smSA5kUP//wmAFIkrNwiGMOsBzYAQwTzEEeBY8BJO1fYtF+4laGPv/i/Afz1C1sAYwngZiKmsDcDI0DrHUtL4DRwMGAmUnVcCtpHPsrQbS/1DZDe+VFHblKziIjYBjwD3Iu5ARBwBjgJnAkwMAa+z+ZZqXEX8VZg0T784aUDzH3uk0DtVQvlVsMjwGpMB3gauAu8ieB2YDPwxR5gF/gQ+MeoNUFzACI4d+imvgDOp0BVRWo2AW62eRi8wvY/wNtrgGhDL+7a/gIcBLYBu4HrsPdSzr8K/JlcLk2BaCQstSxN2VptuYO93an7WES0UyORGg1Wfu0QKivyQhfb56yhn4B3Ynew1kD1oDTfJF20vi8NYBvjMVubbWHrOdtPhwaAYPVvfs8Hf1u32bJbDtXVbgFvAj4AOgTGzhPhGMdV/wCvbtmAJSyttzRiuWv7CdttAlY/f/iimwdvfQGiAfmtczg/jnOJ8/txtRbnvgAu6FSPtg1AC3wGPAvgWGRYqiSowLwC1Ru4GoFyFPc3ZM8DfGPLB1jZXlhe74sS6AAc+O6vL+tg6LaX2LP/SSA6tkpcYeee36/0D/C7Ve9BwZs97iLMEMDAE5N07z1wSQebvl/y3KkAGDIUsrHpRp8ACeDGw38kZdPMPtrILhvZ1yZ5TZJxvnwuW40GzSSaDa1vJq1oJXVbKZ9qpv5qoO6Cqr5ULB+zfNrygOX7LS+PlCgeu+eimz/1w0yWaTTScIqYTEERcDoiXovFauddAAA22CeRDyKD/Bnkbd32PNgUj09S/GwrUMt+x14hiWVFI1LEVyPidggi4hfOnuv3nr8AEGC5sj1j+4TtAcu7i4HlDwLLqRawMmtmnidn6JYLGIa7C/mbwHeAgYATQexPjVCVxcZd7SUACDCEfRyznXoMr8Sawf4lcDdwI7AKWAdss/0r2dOyr6kFpCn7hiyPRlDY5mM7z10W4F1KFT+/p6ZwDkgT2HuN19Tz3yXWG+NnJ8uR9h0FSStSRAFBwAmbpu3xbP/T9rzkp2zvtt2RzcvfG15EAaC8/8m6FkgmpWdsTyD/COtv9esnj1haZXvEtiXP2d5jc6es+3qHv8/2uO1v2d4hedA2H/n2vxZX4LwS+78E1PcDqprAOPZao9Gxs5PNkc6dXUKnIuI1Z8+lRijLo8AR2+OWqeeBS8n7bE8bd2x4Zc97FwcAaP307vqyiXi7QzBi7OyXGel8GkJEBAFUWUREIXlnL/LCvgBheZ9h2lLHyvxp5rrFAZZiG3e16zliBm3vsD0lu6i5ja0awppWrjrKmeOPjAL/UQP/rf1h11BPJHckT/dkL+vDjeXC0pRy3qGcB22x9oHZKwcAcPTh5UimzrWnexGXlrCFlAvlakq5eiiX3eLtSXnFAABe3j1c/0PgTp1z77NUKmesjHMulKuttq9X/eq+sgAAx35wTZ0OqWNrWqr2KVelqoqcF3DOL1r5dStfHQCoW03K9ApuWrnam/PCnHN+StZDRHSK1jLgCnXBpeymr/8dS+SFbmH7eiu/TkQnNRrkqmL20XVXFwBg7QOzRASSsDJFaxndssPso+uu9tH92b8BowSyPc/iZtEAAAAASUVORK5CYII=

// @include        *google*
// @include        *baidu.com*
// @include        *bing.com*
// @include        *sogou.com*
// @include        *so.com*
// @match          *://*/*

// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @grant       GM_deleteValue
// @grant       GM_setClipboard
// @grant       GM_registerMenuCommand
// @run-at      document-end

// ==/UserScript==

(function () {
    'use strict';

    function iqxinstart(){
        // 根据规则把搜索引擎列表插入到指定网站
        var css ={};
        css = {
           style:"float:left;margin-left:1px;z-index:100000;margin-top:1px;"
        };
        var rules = [
            // 网页搜索/////////////第一个可以当模板看
            {name: "google网页搜索",// 你要加载的网站的名字(方便自己查找)
                // 是否启用.
                enabled: true,
                // 在哪个网站上加载,正则.
                url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$/,
                // 加载哪个类型的列表:
                // ['web'|'music'|'video'|'image'|'download'|'shopping'|'translate'|'knowledge'|'sociality']
                engineList: 'web',
                // 给引擎列表的样式
                style: css.style,

                // 插入文档,相关
                // target 将引擎跳转工具栏插入到文档的某个元素
                    // (请使用xpath匹配,比如: '//*[@id="subform_ctrl"]'  或者 css匹配(请加上 'css;' 的前缀),比如: 'css;#subform_ctrl' );
                // keyword 使用 xpath 或者 css选中一个form input元素 或者 该项是一个函数，使用返回值
                // where 四种:
                    // 'beforeBegin'(插入到给定元素的前面) ;
                    // 'afterBegin'(作为给定元素的第一个子元素) ;
                    // 'beforeEnd' (作为给定元素的最后一个子元素) ;
                    // 'afterEnd'(插入到给定元素的后面);.
                insertIntoDoc: {
                    target: 'css;body',
                    keyword: '//input[@name="q"]',
                    where: 'beforeBegin', //整个项目作为独立部分插入head和body之间，最大限度提高兼容性
                },
            },
            {name: "百度网页搜索",
                url: /^https?:\/\/www\.baidu\.com\/(?:s|baidu)/,
                enabled: true,
                engineList: 'web',
                style: css.style,
                insertIntoDoc: {
                    keyword: '//input[@name="wd"]',
                    target: 'css;body',
                    where: 'beforeBegin',
                },
            },
            {name: "必应网页搜索",
                url: /^https?:\/\/[^.]*\.bing\.com\/search/,
                enabled: true,
                engineList: 'web',
                style: css.style,
                insertIntoDoc: {
                    keyword: '//input[@name="q"]',
                    target: 'css;body',
                    where: 'beforeBegin',
                },
            },
            {name: "搜狗",
                url: /^https?:\/\/www\.sogou\.com\/(?:web|s)/,
                enabled: true,
                engineList: 'web',
                style: css.style,
                insertIntoDoc: {
                    keyword: 'css;.query',
                    target: 'css;body',
                    where: 'beforeBegin',
                },
            },
            {name: "360",
                url: /^https?:\/\/www\.so\.com\/s/i,
                enabled: true,
                engineList: 'web',
                style: css.style,
                insertIntoDoc: {
                    keyword: '//input[@name="q"]',
                    target: 'css;body',
                    where: 'beforeBegin',
                },
            },
            {name: "雅虎网页搜索",
                url: /^https?:\/\/search\.yahoo\.com\/search/i,
                engineList: 'web',
                enabled: true,
                style: css.style,
                insertIntoDoc: {
                    keyword: '//input[@name="p"]',
                    target: 'css;body',
                    where: 'beforeBegin',
                },
            },
            {name: "DDG",
                url: /^https?:\/\/duckduckgo\.com\/\?q/i,
                enabled: true,
                engineList: 'web',
                style: css.style,
                insertIntoDoc: {
                    keyword: '//input[@name="q"]',
                    target: 'css;body',
                    where: 'beforeBegin',
                },
            },
            {name: "yandex",
                url: /^https?:\/\/www\.yandex\.com\/search/i,
                enabled: true,
                engineList: 'web',
                style: css.style,
                insertIntoDoc: {
                    keyword: '//input[@name="text"]',
                    target: 'css;body',
                    where: 'beforeBegin',
                },
            },
            {name: "ask",
                url: /^https?:\/\/www\.ask\.com\/web\?q/i,
                enabled: true,
                engineList: 'web',
                style: css.style,
                insertIntoDoc: {
                    keyword: '//input[@name="q"]',
                    target: 'css;body',
                    where: 'beforeBegin',
                },
            },
        ];

        // 搜索引擎列表
        var engineList = {};

        // 有些图标需要重复使用
        // icon = {};
        var icon ={};
        icon = {
          google:"//jasonwelld.github.io/searchEngineJump/images/google.svg",
          baidu:"//jasonwelld.github.io/searchEngineJump/images/baidu.svg",
          sogou:'//jasonwelld.github.io/searchEngineJump/images/sogou.svg',
          so:'//jasonwelld.github.io/searchEngineJump/images/so.svg',
          bing:'//jasonwelld.github.io/searchEngineJump/images/bing.svg',
          yahoo:'//jasonwelld.github.io/searchEngineJump/images/yahoo.svg',
          duckduckgo:'//jasonwelld.github.io/searchEngineJump/images/duckduckgo.svg',
          yandex:'//jasonwelld.github.io/searchEngineJump/images/yandex.svg',
          aol:'//jasonwelld.github.io/searchEngineJump/images/aol.svg',
          ask:'//jasonwelld.github.io/searchEngineJump/images/ask.svg',
          config:'//jasonwelld.github.io/searchEngineJump/images/config.svg',
          edit:"//jasonwelld.github.io/searchEngineJump/images/edit.svg",
          del:"//jasonwelld.github.io/searchEngineJump/images/del.svg",
          plus:"//jasonwelld.github.io/searchEngineJump/images/plus.svg",
        };

        // 网页搜索列表
        engineList.web = [];

        // engineList.web[0] 中间的数字表示排序(数字不能重复，否则后面的会覆盖掉前面的)，越小数字越靠前，小于0该引擎不会显示在页面上
        engineList.web[0] = {
            // 搜索引擎名称
            name: 'Google',
            // 搜索引擎地址，关键字变量用%s代替
            url: 'https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8',
            // 搜索引擎的站点图标
            // favicon: '',
            favicon: icon.google,
            // 搜索引擎编码（默认utf-8）如果跳转后乱码可以填写 'gbk'
            encoding: 'utf-8',
            // 新标签页打开
            // blank:true,
            // 禁用
            // disable:true,
        };
        engineList.web[1] = {
            name: '百度',
            url: 'https://www.baidu.com/s?wd=%s&ie=utf-8',
            favicon: icon.baidu,
        };
        engineList.web[2] = {
            name: '必应',
            url: 'https://cn.bing.com/search?q=%s',
            favicon: icon.bing,
        };
            engineList.web[3] = {
            name: '搜狗',
            url: 'https://www.sogou.com/web?query=%s',
            favicon: icon.sogou,
        };
        engineList.web[4] = {
            name: '360',
            url: 'https://www.so.com/s?ie=utf-8&q=%s',
            favicon: icon.so,
        };
        engineList.web[5] = {
            name: 'yahoo',
            url: 'https://search.yahoo.com/search;?p=%s',
            favicon: icon.yahoo,
            disable:true,
        };
        engineList.web[6] = {
            name: 'DDG',
            url: 'https://duckduckgo.com/?q=%s',
            favicon: icon.duckduckgo,
            disable:true,
        };
        engineList.web[7] = {
            name: 'yandex',
            url: 'https://www.yandex.com/search/?text=%s',
            favicon: icon.yandex,
            disable:true,
        };
        engineList.web[8] = {
            name: 'ask',
            url: 'https://www.ask.com/web?q=%s',
            favicon: icon.ask,
            disable:true,
        };
            engineList.web[9] = {
            name: 'aol',
            url: 'https://search.aol.com/aol/search?q=%s',
            favicon: icon.aol,
            disable:true,
        };
        var settingData = {
          "message":"$相关说明$(status: 这个在将来或许很重要)..."+
                  "(version: 若有新功能加入，靠这个版本号识别)..." +
                  "(addSearchItems: 允许更新时，添加新的搜索到你的搜索列表，将来更新使用)..." +
                  "(modifySearchItems: 允许更新时，修改你的搜索列表中的项目,将来更新使用)..." +
                  "(connectToTheServer: 允许连接到我的服务器(更新列表，将图标转换为base64等),将来更新使用或永不使用)..." +
                  "(closetext: 设置页面右上角的“关闭圆圈”是否显示。true显示，false隐藏)..." +
                  "(newtab: 0为默认设置，1为新标签页打开)..." +
                  "(position: 搜索按钮排列方向，0为水平，1为默认竖排，切换后可以调整left和top值来适应页面)..." +
                  "(left: 搜索按钮到浏览器左边的距离)..." +
                  "(top: 搜索按钮到浏览器上面的距离)..." +
                  "(foldlist: 折叠当前搜索分类列表。true为折叠，false为展开。)..." +
                  "(animation: 关闭搜索按钮动画。true显示，false隐藏)..." +
                  "(setBtnOpacity: 搜索按钮的透明度.)..." +
                  "(debug: debug模式，开启后，控制台会输出一些信息，“关闭并保存”按钮将不会在刷新页面)..." +
                  "(fixedTop: 将搜索按钮固定。 true开启，false关闭)..." +
                  "(engineDetails: 第一个值为分类列表标题名称，第二个值与enginelist相关联，必须匹配,第三个值true为显示列表，false为禁用列表。可以用它将分类列表按自己喜欢排序)..." +
                  "(engineList: 各个搜索的相关信息)" +
                  "(rules: 添加陌生搜索后，需要在此将此搜索的搜索样式插入到目标网页才可以显示按钮，同脚本中的rules设置相同。自带了aol搜索，可仿写)...",
          "status":1,
          "version":0.01,
          "addSearchItems":true,
          "modifySearchItems":true,
          "connectToTheServer":true,
          "closetext":false,
          "newtab":0,
          "position":1,
          "left":1,
          "top":10,
          "foldlist":false,
          "animation":true,
          "setBtnOpacity":0.6,
          "debug":false,
          "fixedTop":true,
          "engineDetails":[['网页', 'web',true]],
          "engineList":{},
          "rules":[{"name": "aol", "url": "/^https?:\\/\\/search\\.aol\\.com\\/aol\\/search/", "enabled": true, "engineList": "web","style": css.style, "insertIntoDoc": {"keyword": "//input[@name='q']", "target": "//body[@*]", "where": "beforeBegin"}}]
        };

        var getSettingData = GM_getValue("searchEngineJumpData");
        if(getSettingData){
            // console.log("本地存在列表：",getSettingData);
            if(!getSettingData.status && confirm("设置发生错误，脚本将会复原出厂设置")){
                GM_deleteValue("searchEngineJumpData");
                window.location.reload();
            }

            // 查看本地配置信息是否完整
            for(let value in settingData){
                if(!getSettingData.hasOwnProperty(value)){
                    console.log("属性不存在： ",value);
                    getSettingData[value] = settingData[value];
                    GM_setValue("searchEngineJumpData",getSettingData);
                }
            }

            // 获取版本，用于搜索列表更新
            // console.log("当前版本号和目标版本号: ",getSettingData.version,settingData.version);
            if(parseFloat(getSettingData.version) < settingData.version){
                console.log("版本过低，开始更新,当前版本号和目标版本号: ",getSettingData.version,settingData.version);

                // 1.93更新 360界面变动
                if(getSettingData.modifySearchItems){
                    getSettingData.engineList = modifySearchItemsFun(getSettingData.engineList,"https://www.google.com/cse?q=%s&newwindow=1&cx=006100883259189159113%3Atwgohm0sz8q","https://cse.google.com/?q=%s&newwindow=1&cx=006100883259189159113%3Atwgohm0sz8q");
                }

                // 更新本地版本 其他相关信息
                getSettingData.version = settingData.version;
                getSettingData.message = settingData.message;
                GM_setValue("searchEngineJumpData",getSettingData);
            }

            engineList = getSettingData.engineList;

        } else {
            console.log("未发现本地列表");
            settingData.engineList = engineList;
            console.log("初始化：",settingData);

            GM_setValue("searchEngineJumpData",settingData);
            getSettingData = GM_getValue("searchEngineJumpData");
        }

        // 处理enginlist.detail的相关信息
        var engineDetails = getSettingData.engineDetails;
        //列表分类显示情况
        var getDetails = engineDetails.map(function(value,index){
            // console.log(value,value[2]);
            return value[2]?index:-index;
        });

        // 列表分类的key value
        var getDetailsL = getDetails.length;
        var details = [];
        for(let i=0;i<getDetailsL;i++){
            details[getDetails[i]] =  engineDetails[i];
        }
        engineList.details = details;

        // debug
        // getSettingData.debug = true;
        reloadDebug(getSettingData.debug);

        ///test -------------- 测试 start
        debug("searchEngineJump test location.href: ",window.location.href);
        ///test -------------- 测试 end

        // 更新已过期的搜索链接
        function modifySearchItemsFun(engineList,oldURL,newURL){
            for(let value in engineList){
                var item = engineList[value];
                for(let i=0;i<item.length;i++){
                    if(item[i].url === oldURL){
                        item[i].url = newURL;
                        return engineList;
                    }
                }
            }
            return engineList;
        }
        // 更新本地 rule
        function modifySearchItemsRuleFun(name,value){
            var oldRule = getSettingData.rules;
            for(let item in oldRule){
                if(oldRule[item].name == name){
                    console.log("匹配成功, 更新 rule : ", name);
                    oldRule[item] = value;
                    GM_setValue("searchEngineJumpData",getSettingData);
                }
            }
        }

        // parseUri 1.2.2
        // (c) Steven Levithan <stevenlevithan.com>
        // MIT License
        var parseUri = function(str) {
            var o = parseUri.options,
                m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
                uri = {},
                i = 14;

            while (i--) uri[o.key[i]] = m[i] || "";

            uri[o.ds.name] = {};
            uri[o.ds.name][0] = {};
            uri[o.ds.name][0].key = (uri.protocol ? uri.protocol : "http") + "://" + uri.host + (uri.port ? ":" + uri.port : "") + "/";
            uri[o.ds.name][0].val = "/";
            i = 0;
            var tempsub = "/",
                subs = uri[o.key[10]].substr(1).split("/");
            for (var j = 1; j < (subs.length + 1); j++, i++) {
                tempsub += tempsub === "/" ? subs[i] : "/" + subs[i];
                if (subs[i]) {
                    uri[o.ds.name][j] = {};
                    uri[o.ds.name][j].key = subs[i];
                    uri[o.ds.name][j].val = tempsub;
                }
            }

            uri[o.q.name] = {};
            uri[o.key[12]].replace(o.q.parser, function($0, $1, $2) {
                if ($1) uri[o.q.name][$1] = $2;
            });
            uri[o.aq.name] = {};
            uri[o.key[13]].replace(o.aq.parser, function($0, $1, $2) {
                if ($1) uri[o.aq.name][$1] = $2;
            });

            return uri;
        };
        parseUri.options = {
            strictMode: false,
            key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
            q: {
                name: "queryKey",
                parser: /(?:^|&)([^&=]*)=?([^&]*)/g
            },
            aq: {
                name: "anchorqueryKey",
                parser: /(?:^|&)([^&=]*)=?([^&]*)/g
            },
            ds: {
                name: "directorySub"
            },
            parser: {
                strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
            }
        };

        function getElementLeft(element){
            var actualLeft = element.offsetLeft;
            var current = element.offsetParent;
            while (current !== null){
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
            console.log(actualLeft);
            return actualLeft;
        }
        // --------------------可设置项结束------------------------
        // console.log("engineList: ",engineList);
        //xpath 获取单个元素
        function getElementByXPath(xPath, contextNode, doc) {
            doc = doc || document;
            contextNode = contextNode || doc;
            return doc.evaluate(xPath, contextNode, null, 9, null).singleNodeValue;
        }

        // 从函数中获取多行注释的字符串
        function getMStr(fn) {
            var fnSource = fn.toString();
            var ret = {};
            fnSource = fnSource.replace(/^[^{]+/, '');
            // console.log(fnSource);
            var matched;
            var reg = /var\s+([$\w]+)[\s\S]*?\/\*([\s\S]+?)\*\//g;
            while (matched = reg.exec(fnSource)) {
                // console.log(matched);
                ret[matched[1]] = matched[2];
            }

            return ret;
        }

        // 事件支持检测.
        // 比如 eventSupported('fullscreenchange', document);
        function eventSupported(eventName, elem) {
            elem = elem || document.createElement('div');
            var prefix = ['o', 'ms', 'moz', 'webkit', ''];

            var l = prefix.length;
            var pEventName;
            var isFunction;
            var setAttr;

            while(l --) {
                pEventName = 'on' + prefix[l] + eventName;

                if (pEventName in elem) {
                    return pEventName.slice(2);
                } else if (typeof elem.setAttribute == 'function') { // setAttribute 是元素节点的方法
                    setAttr = false;
                    if (!elem.hasAttribute(pEventName)) {
                        setAttr = true;
                        elem.setAttribute(pEventName, 'return;');
                    }

                    isFunction = typeof elem[pEventName] == 'function';

                    if (setAttr) elem.removeAttribute(pEventName);

                    if (isFunction) {
                        return pEventName.slice(2);
                    }
                }
            }

            return false;
        }

         // 保存指定对象相关数据
        var data = (function () {
            //'use strict';

            var cache = {
                objs: [],
                data: {},
            };

            function data(obj, key, value) {
                var id = cache.objs.indexOf(obj);
                if (id == -1) {
                    id = cache.objs.push(obj) - 1;
                }
                if (!cache.data[id]) {//初始化
                    cache.data[id] = {};
                }
                if (typeof value == 'undefined') {// 取值
                    return typeof key == 'undefined' ? cache.data[id] : cache.data[id][key];
                } else {
                    return cache.data[id][key] = value;
                }
            }

            return data;
        })();

        // 为mouseleave mouseenter事件做个兼容
        // 需要 eventSupported， data函数支持
        var mouseEventListener = (function () {

            var support = {
                mouseleave : eventSupported('mouseleave'),
                mouseenter : eventSupported('mouseenter'),
            };

            var map = {
                mouseleave : 'mouseout',
                mouseenter : 'mouseover',
            };

            return {
                add : function (type, ele, callback) { //事件类型，元素，监听函数
                    if (support[type]) {
                        ele.addEventListener(type, callback, false); //mouseleave,enter不冒泡，所以在冒泡阶段监听事件，不要担心子孙元素进出发生的事件冒泡上来。
                    } else {
                        var listener = data(callback, 'mouseELListener');
                        if (!listener) {
                            listener = function (e) {
                                var relatedTarget = e.relatedTarget; //mouseout，去往的元素；mouseover，来自的元素
                                // 当mouseout（离开ele）去往的元素不是自己的子孙元素
                                // 当mouseover（进入ele）来自的元素不是自己的子孙元素
                                if (!ele.contains(relatedTarget)) { // contains函数，自己.contains(自己) 返回true
                                    callback.call(ele, e);
                                }
                            };
                            data(callback, 'mouseELListener', listener);
                        }

                        ele.addEventListener(map[type], listener, true);
                    }
                },
                remove : function (type, ele, callback) {
                    if (support[type]) {
                        ele.removeEventListener(type, callback, false);
                    } else {
                        ele.removeEventListener(map[type], data(callback, 'mouseELListener'), true);
                    }
                },
            };
        })();

        //获取已滚动的距离
        function getScrolled(container) {
            if (container) {
                return {
                    x:container.scrollLeft,
                    y:container.scrollTop,
                };
            }
            return {
                x: 'scrollX' in window ? window.scrollX : ('pageXOffset' in window ? window.pageXOffset : document.documentElement.scrollLeft || document.body.scrollLeft),
                y: 'scrollY' in window ? window.scrollY : ('pageYOffset' in window ? window.pageYOffset :  document.documentElement.scrollTop || document.body.scrollTop),
            };
        }

        function getElement(selector) {
            if (selector.indexOf('css;') == 0) {
                return document.querySelector(selector.slice(4));
            } else {
                return getElementByXPath(selector);
            }
        }

        function mousedownhandler(e) {
            var target = e.target;

            target = getElementByXPath('ancestor-or-self::a[contains(@class, "sej-engine")]', target);

            // if (!target || target.className.indexOf('sej-engine') == -1) return;
            if (!target || !this.contains(target)) return;

            var value;
            if (typeof iInput == 'function') {
                value = iInput();
            } else {
                if (iInput.nodeName == 'INPUT') {
                    value = iInput.value;
                } else {
                    value = iInput.textContent;
                }
            }

            // // @name     searchEngineJump-NextStage
            if (document.characterSet != "UTF-8") value = encodeURIComponent(value);

            var targetURL = target.getAttribute('url');
            // console.log(targetURL);
            // 如果有post请求
            var postSign = targetURL.indexOf('$post$');
            if(~postSign){
                // var targetBlank =
                var f=getPostFormHTML(targetURL.substring(0,postSign),[targetURL.substring(postSign+6),value],target.getAttribute('target'));
                // a = a.replace("$form$", f);
                target.appendChild(f);
                // a = a.replace("$onclick$", "this.getElementsByTagName('form')[0].submit();return false;");
                // target.removeAttribute('onclick');
                target.setAttribute("onclick","this.getElementsByTagName('form')[0].submit();return false;");
                // alert(f);
            } else{
                console.log(value);
                target.href = target.getAttribute('url').replace('%s', value);
            }
        }
         //获取  POST 的表单的 HTML
        function getPostFormHTML(url, value, newTab) {
            console.log(url,value,newTab);
            var ospan = document.createElement('span');
            ospan.style.cssText = 'width:0px;height:0px;';
            var form = "" +
                "<form method='post'" +
                " action='" + url + "'" +
                (newTab ? " target='_blank'" : "") +
                ">" +
                "<input type='hidden'" +
                    " name='" + value[0] + "'" +
                    " value='" + value[1] + "'" +
                    " />" +
                "</form>";
            ospan.innerHTML = form;
            return ospan;
        }

        // iframe 禁止加载
        if (window.self != window.top) return;

        var url = location.href;
        var matchedRule;
        var marchedSign;

        //先判断用户规则
        marchedSign = getSettingData.rules.some(function (rule) {
            rule.url = new RegExp(rule.url.substring(1,rule.url.length-1));
            if (rule.url.test(url)) {
                matchedRule = rule;
                return true;
            }
        });

        // console.log(marchedSign,matchedRule);
        if(!marchedSign){
            rules.some(function (rule) {
                if (rule.url.test(url)) {
                    matchedRule = rule;
                    return true;
                }
            });
        }

        // console.log(matchedRule);
        if (!matchedRule || !matchedRule.enabled) return;

        var iTarget = getElement(matchedRule.insertIntoDoc.target);
        var iInput = typeof matchedRule.insertIntoDoc.keyword == 'function' ? matchedRule.insertIntoDoc.keyword : getElement(matchedRule.insertIntoDoc.keyword);

        ///test -------------- 测试 start
        debug("searchEngineJump test iTarget, iInput: ",iTarget, iInput);
        ///test -------------- 测试 end

        if (!iTarget || !iInput) {
            console.log("目标有误： iTarget：" + iTarget + "\niInput: " + iInput);
            return;
        }

        // 添加全局样式
        var globalStyle = document.createElement('style');
        globalStyle.type = 'text/css';
        globalStyle.textContent = getMStr(function(){
            var cssText;
            /*
                #sej-container {
                    display: block;
                    #position: absolute;
                    #position: fixed;
                    z-index: 2;
                    padding: 1px 5px 1px 5px;
                    line-height: 1.5;
                    font-size: 13px;
                    font-family: arial,sans-serif;
                    transform-origin: top center;
                    #animation: sejopen 0.3s !important;
                    border-bottom-right-radius: 4px;
                }

                #sej-expanded-category {
                    font-weight: bold;
                }

                .sej-engine {
                    line-height: 1.5;
                    display: inline-block;
                    margin: 4px 0px 0 0;
                    border: none;
                    padding: 4px 4px;
                    text-align:center;
                    text-decoration: none;
                    font-weight:500;
                    color: #333 !important;
                    transition: background-color 0.15s ease-in-out;
                }
                .sej-drop-list-trigger {

                }
                .sej-drop-list-trigger-shown {
                    background-color: #DEEDFF !important;
                }
                .sej-drop-list-trigger::after {
                    content: '';
                    display: inline-block;
                    margin: 0 0 0 3px;
                    padding: 0;
                    width: 0;
                    height: 0;
                    border-top: 6px solid #BCBCBC;
                    border-right: 5px solid transparent;
                    border-left: 5px solid transparent;
                    border-bottom: 0px solid transparent;
                    vertical-align: middle;
                    transition: -webkit-transform 0.3s ease-in-out;
                    transition: transform 0.3s ease-in-out;
                }
                .sej-drop-list-trigger-shown::after {
                    -webkit-transform: rotate(180deg);
                    transform: rotate(180deg);
                }
                .sej-engine:hover {
                    background-color: #EAEAEA;
                }
                .sej-drop-list > .sej-engine {
                    display: block;
                    padding-top: 4px;
                    padding-bottom: 4px;
                    width: 50px;
                }
                .sej-drop-list > .sej-engine:hover {
                    background-color: #DEEDFF;
                }

                .sej-engine-icon {
                    display: block;
                    width: 50px;
                    height: 50px;
                    border: none;
                    padding: 0;
                    margin: 0 0px 0 0;
                    vertical-align: text-bottom;
                }

                .sej-engine-icon-edit {
                    display: block;
                    width: 20px;
                    height: 20px;
                    border: none;
                    padding: 0;
                    margin: 0 0px 0 0;
                    vertical-align: text-bottom;
                }

                .sej-drop-list {
                    position: absolute;
                    display: none;
                    opacity: 0.3;
                    top: -10000px;
                    left: 0;
                    min-width: 50px;
                    border: 1px solid #FAFAFA;
                    padding: 5px 0;
                    text-align: left;
                    font-size: 13px;
                    -moz-box-shadow: 2px 2px 5px #ccc;
                    -webkit-box-shadow: 2px 2px 5px #ccc;
                    box-shadow: 2px 2px 5px #ccc;
                    background-color: white;
                    transition: opacity 0.2s ease-in-out,
                    top 0.2s ease-in-out;
                }
                @keyframes sejopen {
                    0% {
                        transform: scale(1, 0.1);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(1, 1);
                        opacity: 1;
                    }
                }
                @keyframes iqxinsejopen {
                    0% {
                        transform: scale(0.01, 0.01);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(1, 1);
                        opacity: 1;
                    }
                }
            */
        }).cssText;
        //document.head.appendChild(globalStyle); 插入head和body之间 插入head中百度会不刷新url重置head,只能作为单独的部分插入页面
           iTarget.parentNode.insertBefore(globalStyle, iTarget);
        // 列表对象
        function DropDownList(a, list) {
            this.a = a;
            this.list = list;
            this.init();
        }
        DropDownList.zIndex = 100000000;

        DropDownList.prototype = {
            hidden: true,
            showDelay: 233,
            hideDelay: 233,
            aShownClass: 'sej-drop-list-trigger-shown',

            init: function () {
                var a = this.a;
                var list = this.list;

                var self = this;

                // 进入显示
                mouseEventListener.add('mouseenter', a, function () {
                    clearTimeout(self.hideTimerId);

                    if (self.hidden) {
                        self.showTimerId = setTimeout(function () {
                            self.show();
                        }, self.showDelay);
                    } else {
                        var style = list.style;
                        style.zIndex = DropDownList.zIndex ++;
                        style.opacity = 0.96;
                    }
                });

                // 离开隐藏
                mouseEventListener.add('mouseleave', a, function () {
                    clearTimeout(self.showTimerId);

                    if (!self.hidden) {
                        //list.style.top = parseInt(list.style.top)+6 +"px";
                        list.style.opacity = 0.04;
                        self.hideTimerId = setTimeout(function () {
                            self.hide();
                        }, self.hideDelay);
                    }
                });

                mouseEventListener.add('mouseenter', list, function () {
                    clearTimeout(self.hideTimerId);

                    var style = list.style;
                    style.zIndex = DropDownList.zIndex ++;
                    style.opacity = 0.96;
                });

                mouseEventListener.add('mouseleave', list, function () {

                    list.style.opacity = 0.04;
                    list.style.top = parseInt(list.style.top) +"px";
                    self.hideTimerId = setTimeout(function () {
                        self.hide();
                    }, self.hideDelay);
                });
            },
            show: function () {
                if (!this.hidden) return;
                this.hidden = false;

                var scrolled = getScrolled();
                var aBCRect = this.a.getBoundingClientRect();

                var style = this.list.style;

                var top = scrolled.y + aBCRect.bottom;
                var left = scrolled.x + aBCRect.left;

                style.top = top + 'px';
                style.left = left + 'px';
                style.zIndex = DropDownList.zIndex ++;
                style.display = 'block';

                setTimeout(function () {
                    style.opacity = 0.96;
                    style.top = top + 'px';
                }, 30);

                this.a.classList.add(this.aShownClass);

            },
            hide: function () {
                if (this.hidden) return;
                this.hidden = true;

                var style = this.list.style;
                style.display = 'none';
                style.opacity = 0.1;

                this.a.classList.remove(this.aShownClass);

            }
        };

        var pageEncoding = (document.characterSet || document.charset).toLowerCase();

        // 创建dom
        var aPattern = '<a href="" class="sej-engine" target="$blank$" encoding="$encoding$" url="$url$"><img src="$favicon$" class="sej-engine-icon" />$name$</a>';
        var container = document.createElement('sejspan');
        container.id = 'sej-container';
        container.className = "rwl-exempt";

        container.addEventListener('mousedown', mousedownhandler, true);

        if (matchedRule.style) {
            container.style.cssText = matchedRule.style;
        }

        var dropLists = [];
        engineList.details.forEach(function (item) {
            var category = item[1];
            var cName = item[0];
            var engines = [];

        engineList[category].forEach(function (engine) {
                // 检测是否用搜索搜某一网站 site:xxx.xx
                var engineUrl = engine.url;
                var siteIndex = engineUrl.lastIndexOf("site");
                var siteMark = null;
                if(~siteIndex){
                    var siteURL = engineUrl.slice(siteIndex);
                    siteMark = /([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}/.test(siteURL);
                    // console.log(/([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}/.test(siteURL),siteURL);
                }

                if (!siteMark && matchedRule.url.test(engineUrl)) return;// 去掉跳转到当前引擎的引擎
                if(engine.disable) return;
                var a = aPattern.replace('$encoding$', (engine.encoding || 'utf-8').toLowerCase())
                    .replace('$url$', engineUrl)
                    .replace('$name$', engine.name);

                if (engine.favicon) {
                    a = a.replace('$favicon$', engine.favicon);
                } else {
                    a = a.replace('src="$favicon$"', '');
                }
                if (getSettingData.newtab || engine.blank) {
                    a = a.replace('$blank$', "_blank");
                } else {
                    a = a.replace('target="$blank$"', '');
                }

                engines.push(a);
            });
            // 非空列表
            if (!engines.length) return;

            engines = engines.join('');

            // 展开当前搜索分类列表
            if (!getSettingData.foldlist && category == matchedRule.engineList) {
                container.innerHTML = engines;
            } else {
                var dropList = document.createElement('sejspan');
                dropList.className = 'sej-drop-list rwl-exempt';
                dropList.innerHTML = engines;

                // 非空列表
                var a = dropList.firstElementChild.cloneNode(true);
                a.className = a.className + ' sej-drop-list-trigger';
                a.lastChild.nodeValue = cName;
                dropLists.push([a, dropList]);
            }
        });

        //将各个搜索列表插入文档中
        dropLists.forEach(function (item) {
            container.appendChild(item[0]);
            //document.body.appendChild(item[1]);插入head和body之间
            iTarget.parentNode.insertBefore(item[1], iTarget);
            item[1].addEventListener('mousedown', mousedownhandler, true);

            new DropDownList(item[0], item[1]);
        });

        // 插入到文档中
        switch (matchedRule.insertIntoDoc.where.toLowerCase()) {
            case 'beforebegin' :
                iTarget.parentNode.insertBefore(container, iTarget);
            break;
            case 'afterbegin' :
                if (iTarget.firstChild) {
                    iTarget.insertBefore(container, iTarget.firstChild);
                } else {
                    iTarget.appendChild(container);
                }
            break;
            case 'beforeend' :
                iTarget.appendChild(container);
            break;
            case 'afterend' :
                if (iTarget.nextSibling) {
                    iTarget.parentNode.insertBefore(container, iTarget.nextSibling);
                } else {
                    iTarget.parentNode.appendChild(container);
                }
            break;
        }

        // -------------------设置相关--------------------------------
        // 设置按钮相关
        var dragEl = null;
        var dragData = null;

        function SEJsetting(){
            this.ele = document.createElement("div");
            this.mask = document.createElement("div");

            this.parentTemp = null;
            this.editTemp = null;
            this.online = null;
            this.init();
        }

        SEJsetting.prototype = {
            testabc : "hahah",
            aPatternParent : "<div></div>",

            init: function () {
                // console.log("init...");
                var that = this;

                this.ele.id = "settingLayer";
                this.mask.id = "settingLayerMask";

                this.addGlobalStyle();

                this.addContent();

                this.mask.addEventListener("click",function(){
                    that.hide();
                });
                this.ele.addEventListener("click",function(e){
                    e.stopPropagation();
                });

                this.mask.appendChild(this.ele);
                document.body.appendChild(this.mask);

                // 绑定事件
                this.ele.addEventListener("click",that.domClick.bind(this),false);
                this.dragEvent();
                // input[range] 滑动条相关
                that.rangeChange(true);
                document.querySelector("#setBtnOpacityRange").addEventListener("input",that.rangeChange);
                document.querySelector("#leftRange").addEventListener("input",that.rangeChange);
                document.querySelector("#topRange").addEventListener("input",that.rangeChange);
            },
            //拖拽相关
            dragEvent: function(){
                var that = this;
                var odivsdrag = document.querySelectorAll(".drag");
                [].forEach.call(odivsdrag,function(odiv){
                    odiv.addEventListener("dragstart",that.domdragstart,false);
                    odiv.addEventListener('dragenter', that.domdragenter, false);
                    odiv.addEventListener('dragover', that.domdragover, false);
                    odiv.addEventListener('dragleave', that.domdragleave, false);
                    odiv.addEventListener('drop', that.domdrop, false);
                    odiv.addEventListener('dragend',that.domdropend, false);
                });
            },
            //按钮相关
            addContent: function(){
                var aPattern = '<span draggable="true" class="drag">' +
                                '<span class="sej-engine"' +
                                ' data-xin="$xin$" ' +
                                ' data-iqxinimg="$img$" ' +
                                ' data-iqxintitle="$title$" ' +
                                ' data-iqxinlink="$link$" ' +
                                ' data-iqxintarget="$blank$" ' +
                                ' data-iqxindisabled="$disabled$" ' +
                                ' title="点击启用或者禁用或者拖拽排序" ' +
                                '><img src="$favicon$" class="sej-engine-icon" style="padding-bottom:3px;"/><span>$name$</span></span>' +
                                ' <span class="iqxin-set-edit" title="编辑"><img class="sej-engine-icon-edit" src="' + icon.edit + '"/></span>' +
                                ' <span class="iqxin-set-del" title="删除"><img class="sej-engine-icon-edit" src="' + icon.del + '"/></span>' +
                                '</span>';
                var details = engineList.details;
                // 若根据数组长度获取，负数引导的为属性，不再length长度之内，所以来个大体的数字，当都为空时，结束循环
                // var detailsLength = details.length;
                var detailsLength = 99;
                for (let i=0;i<detailsLength;i++){
                    var j = i;
                    j = details[j] ? j : -j;
                    if (!details[j]){break;}

                    var odiv = document.createElement("div");
                    odiv.id = details[j][1]; // "web"
                    odiv.classList.add("iqxin-items");

                    var oDivTitle = document.createElement("div");
                    oDivTitle.classList.add("sejtitle","drag");
                    oDivTitle.setAttribute("draggable","true");
                    oDivTitle.dataset.iqxintitle = details[j][1];
                    oDivTitle.dataset.xin = j;
                    oDivTitle.innerHTML ='<span class="iqxin-pointer-events">' + details[j][0] + '</span>' +
                                        '<span class="iqxin-title-edit" title="编辑"><img class="sej-engine-icon-edit" src="' + icon.edit + '"/></span>'+
                                        ' <span class="iqxin-set-title-del" title="删除"><img class="sej-engine-icon-edit" src="' + icon.del + '"></span>';
                    odiv.appendChild(oDivTitle);

                    var oDivCon = document.createElement("div");
                    oDivCon.classList.add("sejcon");
                    var oDivConStr = "";
                    var engineListItme = engineList[details[j][1]];
                    var itemLength = engineListItme.length;
                    for(let ii=0;ii<itemLength;ii++){
                        var jj = ii;
                        if (!engineListItme[jj]){break;}
                        var a = aPattern.replace('$name$', engineListItme[jj].name)
                                .replace('$favicon$', engineListItme[jj].favicon)
                                .replace("$xin$",jj);
                        // 添加属性
                        a = a.replace("$img$", engineListItme[jj].favicon)
                            .replace("$title$", engineListItme[jj].name)
                            .replace("$link$", engineListItme[jj].url);
                        if (engineListItme[jj].blank) {
                            a = a.replace('$blank$', "_blank");
                        } else {
                            a = a.replace('data-iqxintarget="$blank$"', '');
                        }
                        if (engineListItme[jj].disable) {
                            a = a.replace('$disabled$', "true");
                        } else {
                            a = a.replace('data-iqxindisabled="$disabled$"', '');
                        }

                        oDivConStr += a;
                    }

                    oDivConStr +=  "" +
                        '<span class="iqxin-additem" title="添加新的搜索引擎">' +
                        '<img class="sej-engine-icon" src="' + icon.plus + '">' +
                        '</span>' +
                "";

                    oDivCon.innerHTML = oDivConStr;
                    odiv.appendChild(oDivCon);

                    this.ele.appendChild(odiv);
                }

                var fixedTop_checked = getSettingData.fixedTop?"checked":"";
                var debug_checked = getSettingData.debug?"checked":"";
                var foldlist_checked = getSettingData.foldlist?"checked":"";
                var closetext_checked = getSettingData.closetext?"checked":"";
                var animation_checked = getSettingData.animation?"checked":"";

                // 增加搜索列表
                var nSearchList = document.createElement("div");
                nSearchList.id = "nSearchList";
                nSearchList.setAttribute("title","添加新的搜索列表");
                nSearchList.innerHTML = ""+
                "<img class='sej-engine-icon' src='" + icon.plus + "'>" +
                "";
                this.ele.appendChild(nSearchList);

                // 添加按钮
                var btnEle = document.createElement("div");
                btnEle.id = "btnEle";

                var btnStr = "<div class='btnEleLayer'>" +
                            "<span><a target='_blank' href='https://greasyfork.org/zh-CN/scripts/38748-searchenginejump'>油猴</a> <a target='_blank' href='https://github.com/jasonwelld/searchEngineJump'>代码</a></span>" +
                            "<span title='open newtab 是否采用新标签页打开的方式'>打开方式" +
                                "<select id='iqxin-globalNewtab'>" +
                                    "<option value='globalDef'>默认页面</option>" +
                                    "<option value='globalNewtab'" + (getSettingData.newtab?"selected":"")  + ">新标签页</option>" +
                                "</select>" +
                            "</span> " +
                            "<span title='搜索按钮排列方向'>方向" +
                                "<select id='iqxin-prefs-position'>" +
                                    "<option value='Horizontal'>水平</option>" +
                                    "<option value='vertical'" + (getSettingData.position?"selected":"")  + ">竖排</option>" +
                                "</select>" +
                            "</span> " +
                            "<span id='xin-reset' title='慎点，出厂重置'>重置</span>" +
                            "<span id='xin-modification' title='编辑分享自己的配置或清空配置'>配置</span>" +
                            "<span id='iqxin-debugS' title='对设置菜单有一定的影响'>" +
                                "<label>调试<input id='iqxin-debug' type='checkbox' name='' " +
                                    debug_checked +
                                " style='vertical-align:middle;'></label>" +
                            "</span>" +
                            "<span id='xin-foldlists'>" +
                                "<label>折叠分类<input id='iqxin-foldlist' type='checkbox' name='' " +
                                    foldlist_checked +
                                " style='vertical-align:middle;'></label>" +
                            "</span>" +
                            "<span id='xin-closetext'>" +
                                "<label>隐藏文字<input id='iqxin-closetext' type='checkbox' name='' " +
                                    closetext_checked +
                                " style='vertical-align:middle;'></label>" +
                            "</span>" +
                            "<span id='xin-animation'>" +
                                "<label>开启动画<input id='iqxin-animation' type='checkbox' name='' " +
                                    animation_checked +
                                " style='vertical-align:middle;'></label>" +
                            "</span>" +
                            "<span id='iqxin-fixedTopS' title='fixedTop 当滚动页面时，固定按钮'>" +
                                "<label>固定按钮<input id='iqxin-fixedTop' type='checkbox' name='' " +
                                    fixedTop_checked +
                                " style='vertical-align:middle;'></label>" +
                            "</span>" +
                            "<span title='设置按钮透明度'>透明度 <input type='range' step='0.1'  min='0' max='1' value='"+ (getSettingData.setBtnOpacity) +"' id='setBtnOpacityRange'><i style='display:inline-block;width:2em;text-align:center;' class='iqxin-setBtnOpacityRangeValue' title='按钮显示透明度'></i></span>" +
                            "<span title='设置靠左宽度'>靠左 <input type='range' step='1'  min='0' max='95' value='"+ (getSettingData.left) +"' id='leftRange'><i style='display:inline-block;width:2em;text-align:center;' class='iqxin-leftRangeValue' title='设置靠左宽度'></i></span>" +
                            "<span title='设置靠上高度'>靠上 <input type='range' step='1'  min='0' max='50' value='"+ (getSettingData.top) +"' id='topRange'><i style='display:inline-block;width:2em;text-align:center;' class='iqxin-topRangeValue' title='设置靠上高度'></i></span>" +
                            "<span id='xin-save' title='save'>应用</span>" +
                            "<span id='xin-save-close' title='save & close'>保存并关闭</span>" +
                            "</div>";
                btnEle.innerHTML = btnStr;
                this.ele.appendChild(btnEle);

                // 关闭按钮
                    var closebtnELe = document.createElement("span");
                    closebtnELe.id = "xin-close";
                    closebtnELe.setAttribute("title","close 关闭");
                    this.ele.appendChild(closebtnELe);
            },
            show: function(){
                var style = this.mask.style;
                var eleStyle = this.ele.style;
                style.display = "flex";
                eleStyle.transform = "translateY(-20%)";
                document.body.style.overflow = "hidden";

                this.windowResize();

                setTimeout(function () {
                    style.opacity = 1;
                    eleStyle.transform = "none";
                }, 30);
            },
            hide: function(){
                this.allBoxClose(); // 关闭所有次级窗口、菜单

                var style = this.mask.style;
                this.ele.style.transform = "translateY(20%)";
                style.opacity = 0;
                setTimeout(function () {
                    style.display = "none";
                    document.body.style.overflow = "auto";
                }, 500);
                var elems = document.querySelectorAll('#settingLayerMask');
                if (!elems) return;
                console.log("elems: " + elems);
                // return;
                [].forEach.call(elems, function(elem) {
                    elem.parentNode.removeChild(elem);
                });
            },
            reset: function(){
                if(confirm("将会删除用户设置！")){
                    GM_deleteValue("searchEngineJumpData");
                    window.location.reload();
                }
            },

            // 界面，框：添加新的搜索
            addItemBox: function(bool){
                this.isOnline();
                this.addItemBoxRemove();

                var newDiv = document.createElement("div");
                newDiv.id= "newSearchBox";
                newDiv.innerHTML=""+
                    "<span>标&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp题 : </span><input id='iqxin-newTitle' placeholder='必填' onfocus='this.select()' /> <br/><br/>" +
                    "<span>链&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp接 : </span><input id='iqxin-newLink' placeholder='必填' onfocus='this.select()' /> <br/><br/>" +
                    "<span>图&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp标 : </span><input id='iqxin-newIcon' placeholder='选填，留空则自动获取' onfocus='this.select()' /> <br/><br/>" +
                    "<span>打开方式 : " +
                        '<select id="iqxin-newTarget" style="border-radius: 4px;border: none;padding: 2px 0 2px 2px"> ' +
                        '<option value="default">新标签页打开</option> ' +
                        '<option value="newtab">当前页打开</option> ' +
                        '<select> ' +
                    "</span>" +
                    "<br/><br/>" +
                    "<span style=''><a target='_blank' style='color:#999;' href='https://greasyfork.org/zh-CN/scripts/27752-searchenginejump'>相关使用说明</a></span>" +
                    "&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp;" +
                    "<button id='addItemBoxEnter' class='addItemBoxEnter addItemBoxBtn iqxin-enterBtn'>确定</button>&nbsp;&nbsp;&nbsp&nbsp&nbsp;&nbsp" +
                    "<button id='addItemBoxCancel' class='addItemBoxCancel addItemBoxBtn iqxin-closeBtn'>取消</button>" +
                    "";

                this.ele.appendChild(newDiv);
                document.querySelector("#iqxin-newTitle").focus();
            },
            // 内部逻辑，：添加新的搜索
            addItemEnger: function(){
                var otitle,olink,oimg,oblank;
                otitle = document.querySelector("#iqxin-newTitle").value;
                olink = document.querySelector("#iqxin-newLink").value;
                oimg = document.querySelector("#iqxin-newIcon").value;
                oblank = document.querySelector("#iqxin-newTarget").selectedIndex;

                if (!oimg){
                    var uri = parseUri(olink);
                    var ohttp = uri.protocol?uri.protocol:"http";
                    debug("能否连接至google：",this.online);
                    if (this.online){
                        oimg = 'https://www.google.com/s2/favicons?domain=' + uri.host;
                    } else {
                        oimg =  ohttp + "://" + uri.host + "/favicon.ico";
                    }
                }

                var a = '<span class="sej-engine"' +
                            ' data-iqxinimg="$img$" ' +
                            ' data-iqxintitle="$title$" ' +
                            ' data-iqxinlink="$link$" ' +
                            ' data-iqxintarget="$blank$" ' +
                            '><img src="$favicon$" class="sej-engine-icon" />$name$</span>' +
                            '<span class="iqxin-set-edit" title="编辑">' +
                                '<img class="sej-engine-icon-edit" src="' + icon.edit + '">' +
                            '</span> ' +
                            '<span class="iqxin-set-del" title="删除">' +
                                '<img class="sej-engine-icon-edit" src="' + icon.del + '">' +
                            '</span>' ;

                a = a.replace("$img$", oimg)
                    .replace("$title$", otitle)
                    .replace("$link$", olink);

                if (oblank){
                    a = a.replace('data-iqxintarget="$blank$"', '');
                } else {
                    a = a.replace('$blank$', "_blank");
                }

                a = a.replace('$name$', otitle)
                    .replace('$favicon$', oimg);

                var ospan = document.createElement("span");
                ospan.className = "drag";
                ospan.innerHTML = a;

                this.parentNode.insertBefore(ospan,this.parentNode.lastChild);

                // 添加完成，移除添加框
                this.addItemBoxRemove();
            },
            addItemBoxRemove: function(ele){
                ele = ele?ele:"#newSearchBox";
                var newBox = document.querySelector(ele);
                if(newBox){
                    newBox.style.transform = "scale(0.01, 0.01)";
                    newBox.style.opacity = "0";
                    setTimeout(function(){
                        newBox.parentNode.removeChild(newBox);
                    },550);
                }
            },

            // 界面， 框: 添加新的搜索列表
            addSearchListBox: function(){
                var odiv = document.querySelector("#newSearchListBox");
                if (odiv){
                    this.boxClose("#newSearchListBox");
                    return;
                }
                var newDiv = document.createElement("div");
                newDiv.id= "newSearchListBox";

                var myDate = new Date();
                var hash = "user" + myDate.getTime();

                newDiv.innerHTML=""+
                    "<span>列表名称: </span><input id='iqxin-newSearchListName' onfocus='this.select()'>" +
                    "<br><br>" +
                    "<span>内部名称: </span><input id='iqxin-newSearchListInnerName' onfocus='this.select()' value='" + hash + "'>" +
                    "<br><br>" +
                    "<button id='addSearchListBoxEnter' class='addSearchListBoxEnter addItemBoxBtn'>确定</button>&nbsp;&nbsp;&nbsp&nbsp&nbsp;&nbsp" +
                    "<button id='addSearchListBoxCancel' class='addSearchListBoxCancel addItemBoxBtn'>取消</button>" +
                    "";
                this.ele.appendChild(newDiv);

                document.querySelector("#iqxin-newSearchListName").focus();
            },
            addSearchListEnger: function(){
                var name = document.querySelector("#iqxin-newSearchListName").value;
                var innerName = document.querySelector("#iqxin-newSearchListInnerName").value;

                if(innerName.length===0){
                    alert("内部名称不能为空");
                    return;
                }
                if(name.length===0){
                    name = innerName;
                }

                var odiv = document.createElement("div");
                odiv.id = innerName;
                odiv.className = "iqxin-items";
                odiv.innerHTML = "" +
                    '<div class="sejtitle" data-iqxintitle="' + innerName + '" data-xin="99">' +
                        '<span class="iqxin-pointer-events">'+ name +'</span>' +
                        '<span class="iqxin-title-edit" title="编辑">' +
                            '<img class="sej-engine-icon-edit" src="' + icon.edit + '">' +
                        '</span> ' +
                        '<span class="iqxin-set-title-del" title="删除">' +
                            '<img class="sej-engine-icon-edit" src="' + icon.del + '">' +
                        '</span>' +
                    '</div>' +
                    '<div class="sejcon">' +
                        '<span class="iqxin-additem" title="添加新的搜索引擎">' +
                            '<img class="sej-engine-icon" src="' + icon.plus + '">' +
                        '</span>' +
                    '</div>' +
                "";

                // this.boxClose("#newSearchListBox");
                this.addItemBoxRemove("#newSearchListBox");

                var nSearchList = document.querySelector("#nSearchList");
                nSearchList.parentNode.insertBefore(odiv,nSearchList);
            },

            boxClose: function(ele){
                var odiv = document.querySelector(ele);
                if(odiv){
                    odiv.parentNode.removeChild(odiv);
                }
            },

            // 界面 框：修改框
            addEditBox: function(e){
                console.log(e);
                this.addItemBoxRemove();

                var target = e.target.parentNode.firstChild;

                var otitle = target.dataset.iqxintitle;
                var olink = target.dataset.iqxinlink;
                var oicon = target.dataset.iqxinimg;
                var otarget = target.dataset.iqxintarget;
                var odisabled = target.dataset.iqxindisabled;

                this.editTemp = target;

                var strblank;
                if(otarget){
                    strblank = '<option value="default">新标签页打开</option><option value="newtab">当前页打开</option> ';
                } else{
                    strblank = '<option value="default">新标签页打开</option><option value="newtab" selected="selected">当前页打开</option>';
                }

                var strdisable = "";
                if(odisabled){
                    strdisable = "checked='checked'";
                }

                var newDiv = document.createElement("div");
                newDiv.id= "newSearchBox";
                newDiv.style.cssText = "top:"+(e.screenY-120) +"px;left:"+(e.screenX-140) +"px;";
                var innerHTML=""+
                    "<span>标&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp题 : </span><input id='iqxin-newTitle' placeholder='必填' onfocus='this.select()' value='"+ otitle +"' /> <br/><br/>" +
                    "<span>链&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp接 : </span><input id='iqxin-newLink' placeholder='必填' onfocus='this.select()' value='"+ olink +"' /> <br/><br/>" +
                    "<span>图&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp标 : </span><input id='iqxin-newIcon' placeholder='选填，留空则自动获取' onfocus='this.select()' value='"+ oicon +"' /> <br/><br/>" +
                    "<span>打开方式 : " +
                        '<select id="iqxin-newTarget" style="border-radius: 4px;border: none;padding: 2px 0 2px 2px"> ' +
                            '$strblank$' +
                        '<select> ' +
                    "</span>" +
                    "<br/><br/>" +
                    "<span style=''><label>禁用：<input type='checkbox' name='' id='iqxin-newDisabled' $checked$ style='vertical-align:middle;'></label></span>" +
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                    "<button id='editItemBoxEnter' class='editItemBoxEnter addItemBoxBtn iqxin-enterBtn'>确定</button>&nbsp;&nbsp;&nbsp&nbsp&nbsp;&nbsp" +
                    "<button id='addItemBoxCancel' class='addItemBoxCancel addItemBoxBtn iqxin-closeBtn'>取消</button>" +
                    "";

                newDiv.innerHTML = innerHTML.replace("$strblank$", strblank)
                                    .replace("$checked$",strdisable);

                this.ele.appendChild(newDiv);
                setTimeout(function(){newDiv.style.cssText="";},10);
                document.querySelector("#iqxin-newTitle").select();
            },
            addEditBoxEnger: function(){
                var otitle,olink,oimg,oblank,odisabled;
                otitle = document.querySelector("#iqxin-newTitle").value;
                olink = document.querySelector("#iqxin-newLink").value;
                oimg = document.querySelector("#iqxin-newIcon").value;
                oblank = document.querySelector("#iqxin-newTarget").selectedIndex;
                odisabled = document.querySelector("#iqxin-newDisabled").checked;

                this.editTemp.dataset.iqxintitle = otitle;
                this.editTemp.lastChild.innerText = otitle;  //文本节点

                this.editTemp.dataset.iqxinlink = olink;
                this.editTemp.dataset.iqxinimg = oimg;
                this.editTemp.firstChild.src = oimg;

                // 是否新标签页打开
                if (oblank){
                    this.editTemp.removeAttribute("data-iqxintarget");
                } else {
                    this.editTemp.dataset.iqxintarget = "_blank";
                }
                // 是否禁用
                if (odisabled){
                    this.editTemp.dataset.iqxindisabled = "true";
                } else{
                    this.editTemp.removeAttribute("data-iqxindisabled");
                }

                // 修改完成，移除添加框
                this.addItemBoxRemove();
            },

            // 标题编辑
            addTitleEditBox: function(e){
                this.addItemBoxRemove();

                var element = e.target.parentNode.firstChild;
                element.classList.remove("iqxin-pointer-events");

                var flag = document.querySelector("#titleEdit");
                if(flag){
                    element.innerHTML = element.firstChild.value?element.firstChild.value:"空";
                    element.classList.add("iqxin-pointer-events");
                }else{
                    var oldhtml = element.innerHTML;
                    var newobj = document.createElement("input");
                    newobj.id = "titleEdit";
                    newobj.type = "text";
                    newobj.value = oldhtml;
                    // newobj.onblur = function(){
                    //     element.innerHTML = this.value?this.value:oldhtml;
                    // }
                    newobj.onkeydown = function(e){
                        if((e.keyCode || e.which) == 13){
                            element.innerHTML = this.value?this.value:oldhtml;
                        } else if((e.keyCode || e.which) == 27){
                            element.innerHTML = oldhtml;
                        }

                        element.classList.add("iqxin-pointer-events");
                    };
                    element.innerHTML = "";
                    element.appendChild(newobj);
                    newobj.select();
                }
            },
            addTitleEditBoxRemove:function(){
                var odiv = document.querySelector("#titleEdit");
                if(odiv){
                    odiv.parentNode.innerHTML = odiv.value?odiv.value:"空";
                }
            },

            // 高级菜单，配置文件编辑界面
            editCodeBox: function(){
                console.log("原始数据： ",getSettingData);
                var userSetting = GM_getValue("searchEngineJumpData");
                var editbox = document.createElement("div");
                // var sData =
                editbox.id = "iqxin-editCodeBox";
                editbox.style.cssText = "position:fixed;" +
                    "top:50%;left:50%;" +
                    "transform:translate(-50%,-50%);" +
                    "background:#ccc;" +
                    "border-radius:4px;" +
                    "padding:10px 20px;" ;
                var innerH = " "+
                    "<p><span style='color:red;font-size:1.2em;'>! ! !</span></br>"+
                    "此处有更多的设置选项，自由度更高，</br>"+
                    "但设置错误会导致脚本无法运行"+
                    "</p>" +
                    "<textarea wrap='off' cols='70%' rows='20' style='overflow:auto;border-radius:4px;'>" + JSON.stringify(userSetting,false,4) + "</textarea>" +
                    "<br>" +
                    "<button id='xin-reset'>清空设置</button> &nbsp;&nbsp;&nbsp;" +
                    "<button id='xin-copyCode'>复制</button> &nbsp;&nbsp;&nbsp;" +
                    "<button id='codeboxclose' class='iqxin-closeBtn'>关闭</button> &nbsp;&nbsp;&nbsp;" +
                    "<button id='xin-codeboxsave' class='iqxin-enterBtn'>保存</button>" +
                "";
                // console.log(JSON.stringify(getSettingData,4));
                // console.log(JSON.stringify(getSettingData,null,4));
                editbox.innerHTML = innerH;
                this.ele.appendChild(editbox);
            },
            editCodeBoxSave: function(){
                var codevalue = document.querySelector("#iqxin-editCodeBox textarea").value;
                if(codevalue){
                    // console.log(JSON.parse(codevalue));
                    GM_setValue("searchEngineJumpData",JSON.parse(codevalue));
                    // console.log(GM_getValue("searchEngineJumpData"));
                    // 刷新页面
                    setTimeout(function(){
                        window.location.reload();
                    },300);
                } else {
                    // alert("输入为空");
                    this.reset();
                }
            },
            editCodeBoxClose: function(){
                var box = document.querySelector("#iqxin-editCodeBox");
                if(box){
                    box.parentNode.removeChild(box);
                }
            },

            // 标题点击 （开关搜索列表）（可以并入到下面的点击事件）
            titleClick: function(e){
                var target = e.target;
                target.dataset.xin = -parseInt(target.dataset.xin);
            },
            // 点击事件   此处的 if 需要根据实际情况替换成 elseif (switch)
            domClick: function(e){
                var targetClass = e.target.className;
                var targetid = e.target.id;
                debug("点击事件：%o, ID: %o, class: %o, e: %o",e.target,targetid,targetClass,e);

                // 删除搜索
                if(~e.target.className.indexOf("iqxin-set-del")){
                    // console.log(e.target);
                    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
                }
                // 删除搜索列表
                if(~e.target.className.indexOf("iqxin-set-title-del")){
                    // console.log(e.target, e.target.parentNode.parentNode);
                    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
                }

                if(~e.target.className.indexOf("iqxin-additem")){
                    // console.log("此处会有个弹框添加新搜索");
                    this.parentNode = e.target.parentNode;
                    this.addItemBox();
                    // console.log(this);
                }
                if(e.target.className==="sej-engine"){
                    console.log("sej-engine 被点击");
                    e.target.dataset.iqxindisabled = e.target.dataset.iqxindisabled?"":"true";
                }
                if(~targetClass.indexOf("addItemBoxCancel")){
                    this.addItemBoxRemove();
                }
                // 添加新的搜索 确定
                if(~targetClass.indexOf("addItemBoxEnter")){
                    this.addItemEnger();
                }
                // 添加新的搜索列表 确定
                if(targetid === "nSearchList"){
                    debug("添加新的搜索列表");
                    this.addSearchListBox();
                }
                if(targetid === "addSearchListBoxEnter"){
                    debug("向网页添加元素");
                    this.addSearchListEnger();
                }
                if(targetid === "addSearchListBoxCancel"){
                    debug("移除盒子");
                    // this.boxClose("#newSearchListBox");
                    this.addItemBoxRemove("#newSearchListBox");

                }

                // 修改搜索 确定
                if(~targetClass.indexOf("editItemBoxEnter")){
                    // console.log(e);
                    this.addEditBoxEnger();
                }

                // 编辑框
                if(~e.target.className.indexOf("iqxin-set-edit")){
                    this.addEditBox(e);
                }
                // 标题编辑框
                if(~targetClass.indexOf("iqxin-title-edit")){
                    e.stopPropagation();
                    this.addTitleEditBox(e);
                }
                if(~targetClass.indexOf("sejtitle")){
                    this.titleClick(e);
                }
                // codebox  源代码编辑框
                if(targetid ==="codeboxclose"){
                    this.editCodeBoxClose();
                } else if(targetid==="xin-reset"){
                    this.reset();
                } else if( targetid === "xin-codeboxsave"){
                    this.editCodeBoxSave();
                } else if( targetid === "xin-copyCode"){
                    // this.copyCode();
                    GM_setClipboard(JSON.stringify(getSettingData,false,4));
                    iqxinShowTip("复制成功");
                }

                // 关闭设置菜单
                if (targetid === "xin-close"){
                    this.hide();
                }

                // 空白地方点击
                if(~targetClass.indexOf("iqxin-items") || targetid === "settingLayer" || targetClass==="btnEleLayer"){
                    this.allBoxClose();
                }
            },

            // 关闭所有次级窗口、菜单
            allBoxClose: function(){
                this.addItemBoxRemove(); // 新的搜索添加框
              //  this.addDelremove();  //  增加/删除界面
                this.editCodeBoxClose(); // code编辑框
                this.addTitleEditBoxRemove(); //标题编辑框
                this.addItemBoxRemove("#newSearchListBox"); // 添加新的搜索列表
                this.boxClose("#iqxin-sortBox"); // 搜索列表排序
             //   document.querySelector("#btnEle2").classList.remove("btnEle2active"); // 更多设置
            },

            // 拖拽相关
            domdragstart:function (e) {
                if(~this.className.indexOf("sejtitle")){
                    dragEl = this.parentNode;
                } else{
                    dragEl = this;

                }
                dragData = dragEl.innerHTML;
                    console.info("start");
                    console.info(e.target);

                    e.dataTransfer.effectAllowed = "move";
                    e.dataTransfer.setData("text/html",dragEl.innerHTML);
            },
            domdragenter:function (e) {
                var target = e.target;
                var targetClass = target.className;
                if(~targetClass.indexOf("sejtitle")){
                    target = target.parentNode;
                }
                target.classList.add('drop-over');
            },
            domdragover:function (e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }
                e.dataTransfer.dropEffect = 'move';
               // return false;

                var _this = e.target;
                var that = _this.parentNode;
                var pparentNode = that.parentNode;

                // 防止跨区域移动
                SEJsetting.prototype.domdropend();
                if(dragEl.className != that.className){
                    console.log("移动对象 之前，现在: ", dragEl.className);
                    console.log(that.className);
                    return;
                }

                // Sortable.js https://github.com/RubaXa/Sortable
                var targetRect = _this.getBoundingClientRect(); //
                var width = targetRect.right - targetRect.left; //目标节点的宽
                var height = targetRect.bottom - targetRect.top; //目标节点的高
                var domPosition = null;
                if(~_this.className.indexOf("sejtitle")){
                    debug(e.clientX,targetRect.left,height,e.clientX - targetRect.left,(e.clientX - targetRect.left) / height);
                    if((e.clientX - targetRect.left) / width > 0.5){
                        debug("右");
                        domPosition = true;
                    }else{
                        debug("左");
                        domPosition = false;
                    }
                } else {
                    if((e.clientY - targetRect.top) / height > 0.5){
                        debug("下");
                        domPosition = true;
                    }else{
                        debug("上");
                        domPosition = false;
                    }
                }

                if(domPosition){
                    if(pparentNode.lastChild == that){
                        pparentNode.insertBefore(dragEl,that);
                    }else{
                        pparentNode.insertBefore(dragEl,that.nextElementSibling);
                    }
                }else{
                    that.parentNode.insertBefore(dragEl,that);
                }
            },
            domdragleave:function (e) {
                var target = e.target;
                var targetClass = target.className;
                if(~targetClass.indexOf("sejtitle")){
                    target = target.parentNode;
                }
                target.classList.remove('drop-over');
            },
            domdrop:function (e) {
                debug("拖拽结束");
                //dragEl.style.transformOrigin = "top center";
                //dragEl.style.animation = "sejopen 0.3s";
                // 重新绑定拖拽事件
                SEJsetting.prototype.dragEvent();
                return false;
            },
            domdropend:function(){
                var dom = document.querySelector(".drop-over");
                if(dom){
                    dom.classList.remove("drop-over");
                }
            },

            // 判断是否能连接至google
            isOnline: function(){
                console.log("this.online",this.online);
                if(this.online)return;

                var that = this;
                var myImage = new Image();
                myImage.src = 'https://www.google.com/s2/favicons?domain=www.baidu.com&' + Math.random() ;
                setTimeout(function(){
                    // console.log("取消加载");
                    console.log(myImage.width);
                    if(myImage.width){
                        that.online = true;
                    }else{
                        myImage.src = undefined;
                        // that.online = "哈哈";
                    }
                },2000);
            },

            // 重新加载工具
            reloadSet: function(){
                var elems = document.querySelectorAll('#sej-container, sejspan.sej-drop-list');
                if (!elems) return;
                console.log("elems: " + elems);
                // return;

                [].forEach.call(elems, function(elem) {
                    elem.parentNode.removeChild(elem);
                });

                iqxinstart();
                iqxinShowTip("保存成功");
            },

            // 设置按钮透明度，靠左宽度，靠上宽度进度条
            rangeChange: function(bool){
                // console.log(this);
                console.log(bool);
                // if(bool){
                var odombtn = document.querySelector("#setBtnOpacityRange");
                    odombtn.style.background = "-webkit-linear-gradient(left,#3ABDC1,#83e7ea) no-repeat, #fff";
                    odombtn.style.backgroundSize = odombtn.value*100 +"% 100%";
                    document.querySelector(".iqxin-setBtnOpacityRangeValue").innerHTML = odombtn.value*100 +"%";
                    getSettingData.setBtnOpacity = odombtn.value;
                var odomleft = document.querySelector("#leftRange");
                    odomleft.style.background = "-webkit-linear-gradient(left,#3ABDC1,#83e7ea) no-repeat, #fff";
                    odomleft.style.backgroundSize = odomleft.value*1 +"% 100%";
                    document.querySelector(".iqxin-leftRangeValue").innerHTML = odomleft.value +"%";
                    getSettingData.left = odomleft.value;
                    var odomtop = document.querySelector("#topRange");
                    odomtop.style.background = "-webkit-linear-gradient(left,#3ABDC1,#83e7ea) no-repeat, #fff";
                    odomtop.style.backgroundSize = odomtop.value*2 +"% 100%";
                    document.querySelector(".iqxin-topRangeValue").innerHTML = odomtop.value +"%";
                    getSettingData.top = odomtop.value;
               // }
            },

            // 窗口大小改变
            windowResize: function(){
                var eleStyle = window.getComputedStyle(this.ele , null);
                var w = parseInt(eleStyle.width) ;
                var h = parseInt(eleStyle.height)  + 54;
                var ww = document.documentElement.clientWidth;
                var wh = document.documentElement.clientHeight;
                var maskStyle = this.mask.style;

                if(w>=ww){
                    maskStyle.justifyContent = "stretch";
                }else{
                    maskStyle.justifyContent = "center";
                }
                if(h>=wh){
                    maskStyle.alignItems = "stretch";
                }else{
                    maskStyle.alignItems = "center";
                }
            },
            saveData: function(){
                //
                this.addTitleEditBoxRemove(); //标题栏处于编辑状态

                var obj = {};
                var parentdiv = document.querySelectorAll("#settingLayer .iqxin-items");
                for (let i=0;i<parentdiv.length;i++){
                    var data = parentdiv[i].querySelectorAll(".sej-engine");
                    var id = parentdiv[i].id;
                    obj[id]=[];
                    for(let ii=0;ii<data.length;ii++){
                        var ij;
                        if (data[ii].dataset.xin<0){
                            ij = -ii;
                        } else {
                            ij = ii;
                        }
                        obj[id][ij]={};
                        obj[id][ij].favicon=data[ii].dataset.iqxinimg;
                        obj[id][ij].name=data[ii].dataset.iqxintitle;
                        obj[id][ij].url=data[ii].dataset.iqxinlink;
                        if(data[ii].dataset.iqxintarget){
                            obj[id][ij].blank=data[ii].dataset.iqxintarget;
                        }
                        if(data[ii].dataset.iqxindisabled){
                            obj[id][ij].disable=data[ii].dataset.iqxindisabled;
                        }
                    }
                }

                // 分类名称
                var engineDetails=[];

                // 分类排序
                var odetails = document.querySelectorAll(".sejtitle");
                var odetailsLength = odetails.length;
                for(let i=0;i<odetailsLength;i++){
                    debug(odetails[i]);
                    engineDetails[i] = [];
                    engineDetails[i][0] = odetails[i].firstChild.innerHTML;
                    engineDetails[i][1] = odetails[i].dataset.iqxintitle;
                    engineDetails[i][2] = odetails[i].dataset.xin>=0?true:false;
                }

                // 新标签页全局设置
                var onewtab = document.querySelector("#iqxin-globalNewtab").selectedIndex;
                //折叠搜索分类
                var foldlist = document.querySelector("#iqxin-foldlist").checked;
                //隐藏按钮文字
                var closetext = document.querySelector("#iqxin-closetext").checked;
                //开启动画
                var animation = document.querySelector("#iqxin-animation").checked;
                // 工具条方向设置
                var position = document.querySelector("#iqxin-prefs-position").selectedIndex;

                // 以防不测，重新获取本地配置文件
                var getData = GM_getValue("searchEngineJumpData");
                getData.newtab = onewtab;
                getData.position = position;
                getData.foldlist = foldlist;
                getData.closetext = closetext;
                getData.animation = animation;
                getData.setBtnOpacity = getSettingData.setBtnOpacity;
                getData.left = getSettingData.left;
                getData.top = getSettingData.top;
                getData.debug = document.querySelector("#iqxin-debug").checked;
                getData.fixedTop = document.querySelector("#iqxin-fixedTop").checked;
                getData.engineDetails = engineDetails;
                getData.engineList = obj;

                debug('将要保存的数据：',getData);
                GM_setValue("searchEngineJumpData",getData);
            },
            addGlobalStyle: function(){
                var head, style;
                var css =
                    "#settingLayerMask{" +
                        "display: none;" +
                        "justify-content: center;" +
                        "align-items: center;" +
                        "position: fixed;" +
                        "top:0; right:0; bottom:0; left:0;" +
                        "background-color: rgba(130,130,130,.5);" +
                        "z-index: 200000000;" +
                        "overflow: auto;" +
                        "font-family: arial,sans-serif;" +
                        "min-height: 100%;" +
                        "font-size:14px;" +
                        "transition:0.5s;" +
                        "opacity:0;" +
                        "user-select: none;" +
                        "-moz-user-select: none;" +
                        //"padding-bottom: 80px;" +
                        "box-sizing: border-box;" +
                    "}" +
                    "#settingLayer{" +
                        "display: inline-block;" +
                        "flex-wrap: wrap;" +
                        "padding: 20px;" +
                        "margin: 0px 5px 50px 5px;" +
                        "background-color: #fff;" +
                        "border-radius: 4px;" +
                        "position: absolute;" +
                        "min-width: 700px;" +
                        "width: 70%;" +
                        "transition:0.5s;" +
                    "}" +
                    ".iqxin-items{" +
                        "min-width:50px;" +
                        "margin: 20px 5px 20px 5px;" +
                    "}" +
                    "#settingLayer .drag{" +
                        "float:left;" +
                        "position: relative;" +
                    "}" +
                    "#settingLayer .sej-engine{" +
                        "display: inline-block;" +
                        "width: 100%;" +
                        "box-sizing: border-box;" +
                    "}" +
                    ".iqxin-pointer-events," +
                    ".sej-engine-icon," +
                    ".sej-engine-icon-edit," +
                    "#settingLayer .sej-engine *{" +
                        "pointer-events:none;" +
                    "}" +
                    ".sejtitle{" +
                        "float:left;" +
                        "text-align: center;" +
                        "padding: 58px 15px 2px 15px;" +
                        "cursor: pointer;" +
                        "position: relative;" +
                    "}" +
                    "#settingLayerMask [data-xin]{" +
                        "margin:4px 0;" +
                        "line-height:1.5;" +
                        "border-radius:4px;" +
                    "}" +
                    ".sejtitle:not([data-xin^='-']):hover{" +
                    "background:#cff9ff;" +
                    "}" +
                    ".sejcon [data-xin]{"+
                        "cursor: pointer;" +
                    "}" +
                    "#settingLayerMask .sej-engine:hover{" +
                        "background-color:#cff9ff" +
                    "}" +
                    "#settingLayerMask [data-iqxindisabled='true']," +
                    "[data-xin^='-']{" +
                        "background-color: #ccc;" +
                        "text-decoration: line-through;" +
                        "text-decoration-color:red;" +
                        "border-radius:2px;" +
                        "transition:.3s;" +
                    "}" +
                    "#settingLayerMask [data-iqxindisabled='true']:hover," +
                    "[data-xin^='-']:hover{" +
                        "background-color: #ffa2a2;" +
                    "}" +
                    "#settingLayerMask label{" +
                        "cursor:pointer;" +
                    "}" +
                    "#settingLayerMask .sej-engine-icon-edit{" +
                        "vertical-align:middle;" +
                    "}" +
                    "#btnEle span{" +
                        "display: inline-block;" +
                        "background: #CCCCCC;" +
                        "margin: 5px 2px 0 5px;" +
                        "padding: 5px 10px;" +
                        "border-radius: 4px;" +
                        "cursor: pointer;" +
                        "outline: none;" +
                        "transition: 0.3s;" +
                    "}" +
                    "#btnEle a{" +
                        "color: #999;" +
                        "text-decoration: none;" +
                    "}" +
                    "#btnEle a:hover{" +
                        "text-decoration: underline;" +
                        "color: #ef8957;" +
                    "}" +
                    "#btnEle>div{" +
                        "width: 100%;" +
                        "display:block;" +
                        "justify-content: space-around;" +
                        "border-radius: 4px;" +
                    "}" +
                    ".drop-over{" +
                        "opacity: 0.6;" +
                    "}" +
                    ".iqxin-title-edit," +
                    ".iqxin-set-edit {" +
                        "visibility: hidden;" +
                        "opacity:0;" +
                        "position: absolute;" +
                        "background: rgba(135, 247, 141, 0.86);" +
                        "color: red;" +
                        "top: 0;" +
                        "transform: translate(0,-50%);" +
                        "left: 0;" +
                        "padding: 3px 3px 3px 3px;" +
                        "border-radius: 2px;" +
                        "cursor: pointer;" +
                        "transition: .3s;" +
                    "}" +
                    ".iqxin-set-title-del," +
                    ".iqxin-set-del {" +
                        "visibility: hidden;" +
                        "opacity:0;" +
                        "position: absolute;" +
                        "background: rgba(135, 247, 141, 0.86);" +
                        "color: red;" +
                        "top: 0;" +
                        "transform: translate(0,-50%);" +
                        "right: 0;" +
                        "padding: 3px 3px 3px 3px;" +
                        "border-radius: 2px;" +
                        "cursor: pointer;" +
                        "transition: .3s;" +
                    "}" +
                    ".iqxin-set-title-del {" +
                        "background: #f18d96;" +
                    "}" +
                    "span.iqxin-additem {" +
                        "display: inline-block;" +
                        "text-align: center;" +
                        "margin: 10px 0;" +
                        "border: 1px" +
                        "color: red;" +
                        "cursor: pointer;" +
                        "visibility:hidden;" +
                        "opacity:0;" +
                        "transition:0.3s;" +
                        "transform:scale(0);" +
                    "}" +
                    "#settingLayer .sejtitle:hover .iqxin-title-edit," +
                    "#settingLayer .sejtitle:hover .iqxin-set-title-del," +
                    "#settingLayer .sejcon:hover .iqxin-additem," +
                    "#settingLayer .sejcon>span:hover .iqxin-set-edit," +
                    "#settingLayer .sejcon>span:hover .iqxin-set-del{" +
                        "visibility:visible;" +
                        "opacity:0.8;" +
                        "transform:scale(1);" +
                    "}" +
                    "#nSearchList {" +
                        "opacity:0.3;" +
                        "position:relative;" +
                        "width: 50px;" +
                        "margin: 20px 5px 20px 5px;" +
                        "border-radius:4px;" +
                        "cursor:pointer;" +
                        "background:#fff;" +
                    "}" +
                    "#nSearchList:hover{" +
                        "opacity:1;" +
                    "}" +
                    "#newSearchListBox," +
                    "#newSearchBox{" +
                        "transition:0.6s;" +
                        "transform-origin: center center;" +
                        "animation-timing-function: ease-in;" +
                        "animation: iqxinsejopen 0.8s;" +
                        "position:fixed;" +
                        "z-index:200000100;" +
                        "top:50%;" +
                        "left:50%;" +
                        "padding:22px;" +
                        "background:rgb(29, 29, 29);" +
                        "border-radius:4px;" +
                        "color: #e8e8e8;" +
                        "margin: -149px -117px;" +
                    "}" +
                    "#newSearchListBox input," +
                    "#newSearchBox input{" +
                        "border: none;" +
                        "padding: 4px 0 4px 5px;" +
                        "border-radius: 4px;" +
                        "outline: none;" +
                    "}" +
                    "#newSearchListBox input:focus," +
                    "#newSearchBox input:focus {" +
                        "background: #f1d2d2;" +
                        "transition: 0.5s;" +
                    "}" +
                    ".addItemBoxBtn{" +
                        "cursor: pointer;" +
                        "background: #fff;" +
                        "border: none;" +
                        "border-radius: 4px;" +
                        "padding: 4px 10px;" +
                        "color: #333;" +
                        "transition:0.3s;" +
                    "}" +
                    "#titleEdit{" +
                        "width:6em;" +
                    "}" +
                    // 按钮效果 ： 确定 取消按钮
                    ".iqxin-closeBtn," +
                    ".iqxin-enterBtn{" +
                        "box-sizing: border-box;" +
                    "}" +
                    ".iqxin-closeBtn:hover{" +
                        "background: #ff6565;" +
                        "border-color: #ff6565;" +
                        "color: #fff;" +
                    "}" +
                    ".iqxin-enterBtn:hover{" +
                        "background: #84bb84;" +
                         "border-color: #84bb84;" +
                         "color: #fff;" +
                    "}" +
                    "#iqxin-editCodeBox button{" +
                        "cursor:pointer;" +
                    "}" +

                    // 关闭按钮
                    "#xin-close{" +
                        "background:white;" +
                        "color:#3ABDC1;" +
                        "line-height:20px;" +
                        "text-align:center;" +
                        "height:20px;" +
                        "width:20px;" +
                        "text-align:center;" +
                        "font-size:20px;" +
                        "padding:10px;" +
                        "border: 3px solid #3ABDC1;" +
                        "border-radius: 50%;" +
                        "transition: .5s;" +
                        "top: -20px;" +
                        "right:-20px;" +
                        "position: absolute;" +
                    "}" +
                    "#xin-close::before{" +
                        "content:'\\2716';" +
                    "}" +
                    "#xin-close:hover{" +
                        "background: indianred;" +
                        "border-color: indianred;" +
                        "color: #fff;" +
                    "}" +
                    // type[range] 效果
                    "input[type=range] {" +
                        "outline: none;" +
                        "-webkit-appearance: none;" +
                        "background:-webkit-linear-gradient(left,#3ABDC1,#83e7ea) no-repeat, #fff;" +
                        "border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/" +
                    "}" +
                    "input[type=range]::-webkit-slider-thumb {" +
                        "-webkit-appearance: none;" +
                    "} " +
                    "input[type=range]::-webkit-slider-runnable-track {" +
                        "height: 10px;" +
                        "border-radius: 10px; /*将轨道设为圆角的*/" +
                        "box-shadow: 0 1px 1px #def3f8, inset 0 .125em .125em #0d1112; /*轨道内置阴影效果*/" +
                    "}" +
                    "input[type=range]::-webkit-slider-thumb {" +
                        "-webkit-appearance: none;" +
                        "height: 18px;" +
                        "width: 18px;" +
                        "margin-top: -5px; /*使滑块超出轨道部分的偏移量相等*/" +
                        "background: #fff; " +
                        "border-radius: 50%; /*外观设置为圆形*/" +
                        "border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/" +
                        "box-shadow: 0 .125em .125em #3b4547; /*添加底部阴影*/" +
                    "}" +
                    "";
                head = document.getElementsByTagName('head')[0];
                style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = css;
                head.appendChild(style);
            }
        };

        // 设置按钮相关：图标透明度 靠左宽度 靠上宽度 是否固定按钮 是否竖排还是水平排列搜索图标 是否开启动画 是否隐藏文字(当折叠搜索分类功能关闭时才能隐藏文字，避免隐藏搜索分类文字)
        var setBtnStyle = document.createElement('style');
        setBtnStyle.type = 'text/css';
        setBtnStyle.textContent = "#sej-container{" +
                            "opacity:"+getSettingData.setBtnOpacity+";"+
                            "left:"+getSettingData.left+"%;"+
                            "top:"+getSettingData.top+"%;"+
                            (getSettingData.position?"width:50px;":"width:100%;") +
                            (getSettingData.fixedTop?"position:fixed;":"position:absolute;") +
                            (getSettingData.animation?"animation:sejopen 0.5s !important;":"") +
                            (getSettingData.closetext && !getSettingData.foldlist?"font-size:0;":"") +
                        "}" +
                        "#sej-container:hover{" +
                            "opacity:1;" +
                        "}" +
                        "";
            //插入设置按钮
            var setBtn = document.createElement("span");
            setBtn.id = "setBtn";
            iTarget.parentNode.insertBefore(setBtnStyle, iTarget); //插入head和body之间
            setBtn.innerHTML = "<img style='margin:10px 0 20px 20px;width:20px;vertical-align: baseline;display:inline-block;cursor:pointer;' src=" + icon.config + ">";
            document.querySelector("#sej-container").appendChild(setBtn);
            var sejSet = null;

            setBtn.addEventListener("click",setBtnStart);

        // 注册菜单
        GM_registerMenuCommand("search jump 搜索跳转设置",setBtnStart);

        function setBtnStart(){
            if(!document.querySelector("#settingLayerMask")){
                sejSet = new SEJsetting();

                var sej_save = document.querySelector("#xin-save");
                var sej_save_close = document.querySelector("#xin-save-close");
                var odombtn = document.querySelector("#setBtnOpacityRange");
                var odomleft = document.querySelector("#leftRange");
                var odomtop = document.querySelector("#topRange");
                var sej_edit = document.querySelector("#xin-modification");

                // sej_save.addEventListener("click",function(){sejSet.saveData();sejSet.hide();if(!getSettingData.debug)window.location.reload();});
                sej_save.addEventListener("click",function(){sejSet.saveData();sejSet.reloadSet();});
                sej_save_close.addEventListener("click",function(){sejSet.saveData();sejSet.hide();sejSet.reloadSet();});
                odombtn.addEventListener("click",function(){sejSet.saveData();sejSet.reloadSet();});
                odomleft.addEventListener("click",function(){sejSet.saveData();sejSet.reloadSet();});
                odomtop.addEventListener("click",function(){sejSet.saveData();sejSet.reloadSet();});
                // sej_reset.addEventListener("click",function(){sejSet.reset();sejSet.hide();window.location.reload();});
                sej_edit.addEventListener("click",function(){sejSet.editCodeBox();});

                window.addEventListener("resize",sejSet.windowResize.bind(sejSet));
            }
            sejSet.show();
        }

        // 获取存储的数据信息
        function get_data(){
            setData = GM_getValue("searchEngineJumpData");
        }
        var setData = null;
        // get_data();
    }

    // 从此处开始执行
    var debug;
    function reloadDebug(bool) {
        debug = bool ? console.info.bind(console) : function() {};
    }

    // 消息提示框
        // 目前只是为了给用户一个反馈。 - 成功了么 - 嗯，成功了
    var iqxinTimerGlobalTip = null;
    function iqxinShowTip(text,duration){
        console.log("iqxin -- 消息提示框: ", text);
        var odom = document.querySelector("#iqixn-global-tip");
        if(!odom){
            odom = document.createElement("iqxinDiv");
            odom.id = "iqixn-global-tip";
            odom.style.cssText = "" +
                "opacity: 0;" +
                "height: 25px;" +
                "line-height: 25px;" +
                "letter-spacing: 1px;" +
                "font-size: 1em;" +
                "color: #fff;" +
                "padding: 5px 20px;" +
                "border-radius: 5px;" +
                "background-color: #666;" +
                "position: fixed;" +
                "z-index: 200000001;" +
                "left: 50%;" +
                "bottom: 5%;" +
                "transform: translate(-50%);" +
                "transition: .4s;" ;
            document.body.appendChild(odom);
        }

        odom.innerHTML=text;
        odom.style.opacity=1;

        duration = duration?duration:1500;
        //防止持续时间内多次触发提示
        if(!iqxinTimerGlobalTip){
            iqxinTimerGlobalTip = setTimeout(function(){
                odom.style.opacity=0;
                iqxinTimerGlobalTip = null;
            },duration);
        }
    }
        // console.log("普通插入");
        iqxinstart();
})();
