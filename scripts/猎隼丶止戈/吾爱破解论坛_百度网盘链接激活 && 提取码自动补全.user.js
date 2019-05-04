// ==UserScript==
// @icon         http://pan.baidu.com/box-static/disk-system/images/favicon.ico
// @name         吾爱破解论坛_百度网盘链接激活 && 提取码自动补全
// @namespace    52pojie_pan_autocompletion
// @author       猎隼丶止戈<1649991905@qq.com>、Space<294619027@qq.com>
// @description  激活吾爱破解论坛中的百度网盘链接，并自动补全提取码然后跳转到分享地址
// @supportURL   https://gitee.com/nn200433/script_synchronization/tree/master/%E7%BD%91%E7%9B%98%E8%84%9A%E6%9C%AC
// @match        *://www.52pojie.cn/thread*
// @match        *://pan.baidu.com/share/*
// @match        *://www.lanzous.com/*
// @match        *://www.52pojie.cn/forum.php?mod=viewthread&tid=*
// @require      https://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @require      https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min.js
// @require      https://cdn.bootcss.com/limonte-sweetalert2/7.28.5/sweetalert2.all.js
// @version      0.1.1.10
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// ==/UserScript==
(function() {
    'use strict';
    /*********************************************** 自定义CSS样式-开始 **********************************************/
    /* 文章内部链接CSS */
    GM_addStyle('.my_baidu_link{padding:2px 2px;text-decoration: none !important;background: #fff!important;color: #00bfff!important;border: 1px solid #00bfff;border-radius: 6px;transition: .3s background linear,.2s color linear;}.my_baidu_link:hover{padding:2px 2px;text-decoration: none !important;background: #00bfff!important;color: #fff!important;border: 1px solid #00bfff;border-radius: 6px;transition: .3s background linear,.2s color linear;}');
    GM_addStyle('.my_baidu_link_destroy {cursor: not-allowed;text-decoration: line-through !important;color: #ff6b68 !important;border: 1px solid #ff6b68;}');
    
    /* 表格CSS */
    GM_addStyle('.jzcount{background-position: 0 -240px !important;}.jzcount:hover{background-position: -40px -240px !important;}');
    GM_addStyle('table.my_baidu_link_table {margin: 0 auto;}');
    GM_addStyle('.my_baidu_link_table>tbody>tr>td, .my_baidu_link_table>tbody>tr>th, .my_baidu_link_table>tfoot>tr>td, .my_baidu_link_table>tfoot>tr>th, .my_baidu_link_table>thead>tr>td, .my_baidu_link_table>thead>tr>th {padding: 10px;line-height: 1.42857143;vertical-align: top;border: 1px solid #F5F5F5;text-align:center;color:#3F51B5 !important}');
    GM_addStyle('.my_baidu_link_table>tbody>tr>td>a, .my_baidu_link_table>tbody>tr>th>a, .my_baidu_link_table>tfoot>tr>td>a, .my_baidu_link_table>tfoot>tr>th>a, .my_baidu_link_table>thead>tr>td>a, .my_baidu_link_table>thead>tr>th>a {color: #00bfff/* !important */;/* text-decoration: none !important; */}');
    
    /* 右侧按钮CSS */
    GM_addStyle('#pancount{font-size: 25px;font-weight: bold;line-height: 38px !important;color: #fff !important;border: 1px solid #00bfff;border-radius: 50px;background: #2196F3 !important;box-shadow: 0 2px 2px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.06), 0 1px 5px 0 rgba(0,0,0,0.12);transition: .3s background linear,.2s color linear;}')
    GM_addStyle('#pancount:hover{background: #5352ed !important;transition: .3s background linear,.2s color linear;}')
    GM_addStyle('.jzcount > .cloud__logo-del {position: relative;right: -10000px;border-right: 0 solid transparent;filter: drop-shadow(-10000px 0 #fff);}')
    /*********************************************** 自定义CSS样式-结束 ***********************************************/

    /*********************************************** 全局变量-开始 ***********************************************/
    var location = self.location;
    var location_pathname = location.pathname;

    // 链接
    var panLinks = new Array;
    // 链接数量
    var panLinksCounts = new Array;
    // 链接密码
    var panLinksPassword = new Array;
    // 提取码正则
    var panPwdPattern = /\s*(密|提取)码[：:]?[ A-Za-z0-9]+/g;
    // 删除html标签正则
    var htmlTagPattern = /<("[^"]*"|'[^']*'|[^'">])*>/g;
    // 排除文字
    var exclude_array = [
        '使用论坛附件上传样本压缩包时必须使用压缩密码保护，压缩密码:52pojie，否则会导致论坛被杀毒软件等误报，论坛有权随时删除相关附件和帖子！'
    ];
    // 后续require无法引入插件时，在此引入第三方插件
    var REQUIRE_ARRAY = [
        {
            name : 'noti.js',
            description : '吾爱js通知插件',
            url : 'https://www.52pojie.cn/source/plugin/noti/template/noti.js'
        }
    ];
    /*********************************************** 全局变量-结束 ***********************************************/

    /********************************************** 无法require时，插件引用注入-开始 ***********************************************/
    $.each(REQUIRE_ARRAY, function(index, value) {
        var script = document.createElement("script");
        script.type = 'text/javascript';
        script.src = value.url;
        document.body.appendChild(script);
        console.log('======> 调试输出：【引入第三方js插件】', '插件名 = ', value.name, '描述 = ', value.description, '地址 = ', value.url);
    });
    
    /************************************************ 无法require时，插件引用注入-结束 ***********************************************/
    
    /**
     * [notyPanCounts noti插件 提示网盘链接数量]
     * @param  panLinkCounts [数量]
     */
    function notyPanCounts(panLinkCounts) {
        try {
            new Noty({
                text: '探测到网盘链接数量：' + panLinkCounts + '个,<a href="javascript:void(0);" onclick="_ShowPanLinks();">点击查看</a>',
                layout: 'bottomRight',
                theme: 'mint',
                closeWith: ['click'],
                type: 'post'
            }).show();
        } catch(err) {
            console.log('======> 调试输出：', err);
        }        
    }

    /**
     * 数组操作类
     */
    var arrayTool = {
        /**
         * 分割字符串
         * 
         * @param {*} str 待分割文字
         * @param {*} rule 分割规则
         */
        getSplit: function(str, rule) {
            return str.split(rule);
        },

        /**
         * 获取提取码
         * 
         * @param {*} array 数组
         */
        getUbound: function(array) {
            var str = (array[array.length - 1]).replace(/(^\s*)|(\s*$)/g, "");
            return str ? str : "-";
        },

        /**
         * 获取数组个数
         * 
         * @param {*} array 数组
         */
        length: function(array) {
            return array.length;
        }
    };

    /**
     * 替换字符串
     * @param {*} str 待替换文本
     * @param {*} replaceArray 想要替换的数据
     * @param {*} needStr 想要将替换数据替换为什么
     */
    var getPassStr = function(str, replaceArray, needStr) {
        $.each(replaceArray, function(index, value) {
            str = str.replace(value, (needStr || ''));
        });
        return str;
    }
    
    /**
     * 渲染网盘链接为蓝链
     * 
     * @param {*} re 非蓝链正则
     * @param {*} nre 已是蓝链正则
     */
    function activelink(re, nre) {
        $('.plc').each(function(index, value) {
            //已是蓝链
            var link = ($(this).html()).match(nre);
            if (link) {
                var ss = $(this).html();
                ss = ss.replace(nre, '$1" class="my_baidu_link"');
                $(this).html(ss);
                // 渲染完毕存入数组
                panLinksCounts.push(link);
                // 提取码与网盘链接拼接，提取网盘密码时，先删除html标签
                // var pass = (($(value).html()).replace(htmlTagPattern, "")).match(panPwdPattern);
                var pass = getPassStr($(value).html(), exclude_array).match(panPwdPattern);
                if (pass) {
                    $(value).find(".my_baidu_link").each(function(i, v) {
                        try {
                            var passArray = arrayTool.getSplit(pass[i], ":");
                            if (passArray.length < 2) {
                                passArray = arrayTool.getSplit(pass[i], "：")
                            }
                            var o_href = $(v).attr("href");
                            var o_href_exclude_paas = o_href.substr(0, (o_href.lastIndexOf('#') > 0 ? o_href.lastIndexOf('#') : o_href.length));
                            // 防止出现重复数据
                            if ($.inArray(o_href, panLinks) < 0 && $.inArray(o_href_exclude_paas, panLinks)) {
                                var n_href = o_href + "#" + arrayTool.getUbound(passArray);
                                $(v).attr("href", n_href);
                                /********************************获取网盘数量、链接、密码，存入数组***********************************/
                                panLinks.push(o_href);
                                panLinksPassword.push(arrayTool.getUbound(passArray));
                                //Debug
                                console.log('======> 调试输出：URL = ', o_href, '提取码 = ', arrayTool.getUbound(passArray));
                            }
                        } catch (err) {
                            console.log('======> 调试输出：', err);
                        }
                    });
                }
            } else {
                //非蓝链
                link = ($(this).html()).match(re);
                if (link) {
                    var ss = $(this).html();
                    // 此处//$1不知道为何加//
                    // ss = ss.replace(re, '<a target="_blank" href="//$1" class="my_baidu_link">$1</a>');
                    ss = ss.replace(re, '<a target="_blank" href="$1" class="my_baidu_link">$1</a>');
                    $(this).html(ss);
                    // 渲染完毕存入数组
                    panLinksCounts.push(link);
                    // 提取码与网盘链接拼接，提取网盘密码时，先删除html标签
                    // var pass = (($(value).html()).replace(htmlTagPattern, "")).match(panPwdPattern);
                    var pass = getPassStr($(value).html(), exclude_array).match(panPwdPattern);
                    if (pass) {
                        $(value).find(".my_baidu_link").each(function(i, v) {
                           try {
                                var passArray = arrayTool.getSplit(pass[i], ":");
                                if (passArray.length < 2) {
                                    passArray = arrayTool.getSplit(pass[i], "：")
                                }
                                var o_href = $(v).attr("href");
                                var o_href_exclude_paas = o_href.substr(0, (o_href.lastIndexOf('#') > 0 ? o_href.lastIndexOf('#') : o_href.length));
                                // 防止出现重复数据
                                if ($.inArray(o_href, panLinks) < 0 && $.inArray(o_href_exclude_paas, panLinks)) {
                                    var n_href = o_href + "#" + arrayTool.getUbound(passArray);
                                    $(v).attr("href", n_href);
                                    /********************************获取网盘数量、链接、密码，存入数组***********************************/
                                    panLinks.push(o_href);
                                    panLinksPassword.push(arrayTool.getUbound(passArray));
                                    //Debug
                                    console.log('======> 调试输出：URL = ', o_href, '提取码 = ', arrayTool.getUbound(passArray));
                                }
                           } catch (err) {
                               console.log('======> 调试输出：', err);
                           }
                        });
                    }
                }
            }
        });
    }

    /**
     * 提取网盘链接中的密码
     * 
     * @param {*} rule 提取规则正则
     */
    var getCode = function(rule) {
        var code = location.hash.slice(1, 5);
        if ((rule || /([a-z\d]{4})/i.exec(code))) {
            code = RegExp.$1;
        }
        return code;
    };

    /**
     * 判断网盘链接是否失效
     *
     * @param {*} panLinksInfo 弹出框表格html代码
     * @param {*} panLinks_Counts 探测个数
     */
    function validateLink(panLinksInfo, panLinks_Counts) {
        // oload成功的数量
        var syncCount = 0;
        // 执行次数
        var allCount = 0;
        $('.plc').each(function(index, value) {
            var panLinkArray = $(value).find(".my_baidu_link");
            if (panLinkArray.length > 0) {
                // 网盘链接
                var panLinkUrl = '';
                // 提取hash密码
                var hashPassword = '';
                $.each(panLinkArray, function(i, v) {
                    panLinkUrl = $(v).attr('href');
                    // 发送get请求，判断网盘是否失效
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: panLinkUrl,
                        context: panLinkUrl,
                        onload: function(response) {
                            // 默认非失效链接
                            var isInvalid = false;
                            /********************************** 设置失效链接的删除线-开始 **********************************/
                            if (response.responseText.indexOf('<title>百度网盘-链接不存在</title>') > 0 || response.responseText.indexOf('啊哦，来晚了，该分享文件已过期') > 0 || response.responseText.indexOf('啊哦，你来晚了，分享的文件已经被删除了，下次要早点哟。') > 0 || response.responseText.indexOf('啊哦！链接错误没找到文件，请打开正确的分享链接!') > 0) {
                                // 删除标记
                                $(v).addClass('my_baidu_link_destroy').attr('disabled', true).css('pointer-events', 'none');
                                // 设置为失效状态
                                isInvalid = true;
                            }
                            /********************************** 设置失效链接的删除线-结束 **********************************/
                            // 表格拼接
                            console.log('======> 调试输出：', '序号 = ', (allCount + 1), '最终请求链接 = ', response.finalUrl, '访问地址 = ', response.context, '是否失效 = ', isInvalid);
                            var hashPasswordIndex = (response.context).lastIndexOf('#');
                            if (hashPasswordIndex != -1) {
                                hashPassword = (response.context).substr(hashPasswordIndex + 1, (response.context).length - hashPasswordIndex);
                            }
                            var gmRequestUrl = (response.context).substr(0, (hashPasswordIndex > 0 ? hashPasswordIndex : (response.context).length));
                            if ((++syncCount) <= panLinkArray.length) {
                                if (hashPassword != null) {
                                    if (isInvalid) {
                                        panLinksInfo += '<tr><td>' + (allCount + 1) + '</td><td><a target="_blank" class="my_baidu_link_destroy" disabled="disabled" style="pointer-events: none;" href="' + response.context + '">' + gmRequestUrl + '</a></td><td>' + hashPassword + '</td></tr>';
                                    } else {
                                        panLinksInfo += '<tr><td>' + (allCount + 1) + '</td><td><a target="_blank" href="' + response.context + '">' + gmRequestUrl + '</a></td><td>' + hashPassword + '</td></tr>';
                                    }
                                } else {
                                    if (isInvalid) {
                                        panLinksInfo += '<tr><td>' + (allCount + 1) + '</td><td><a target="_blank" class="my_baidu_link_destroy" disabled="disabled" style="pointer-events: none;" href="' + response.context + '">' + gmRequestUrl + '</a></td><td>- - - -</td></tr>';
                                    } else {
                                        panLinksInfo += '<tr><td>' + (allCount + 1) + '</td><td><a target="_blank" href="' + response.context + '">' + gmRequestUrl + '</a></td><td>- - - -</td></tr>';
                                    }
                                }
                            }
                            // 最后一个渲染完毕后，渲染方法
                            if (panLinkArray.length == syncCount) {
                                panLinksInfo += '</tbody>';
                                panLinksInfo += '</table>';
                                unsafeWindow._ShowPanLinks = () => {
                                    swal({
                                        width: 650,
                                        title: '探测到网盘链接数量：' + panLinks_Counts + '个',
                                        type: 'info',
                                        html: panLinksInfo,
                                        showCloseButton: true,
                                        confirmButtonText: '确认'
                                    });
                                }
                                if (location.href.match(/(?:https?:\/\/)?(www\.52pojie\.cn\/((thread\-.+\.html)|(forum\.php\?mod=viewthread\&tid=\w.+)))/g)) {
                                    $('#jz52top').prepend('<span><a id="pancount" title="探测到网盘链接数量：' + panLinks_Counts + '个" class="jzcount" href="javascript:void(0);" onclick="_ShowPanLinks();"><img class="cloud__logo-del" src="https://www.easyicon.net/api/resizeApi.php?id=1109682&size=36"></a></span>');
                                }
                            }
                            allCount++;
                        }
                    });
                });
            }
        });
    }

    /**
     * 初始化
     */
    function init() {
        // 网盘通知选择
        var $inputTag = $('<input id="open_pan_notice" type="checkbox">').change(function(){
            if ($(this).is(':checked')) {
                $.cookie('open_pan_notice', true);
            } else {
                $.cookie('open_pan_notice', false);
            }
        });
        var $labelTag = $('<label>').append($inputTag).append('网盘探测通知').append('<span class="pipe">&nbsp;|</span>');
        $('#hd').find('#pm_ntc').before($labelTag);

        // cookie为true时
        if ($.cookie('open_pan_notice') == 'true') {
            $inputTag.attr("checked", 'checked');
        }

        // 百度网盘蓝链
        var re_baidu = /((?:https?:\/\/)?(?:yun|pan|eyun)\.baidu\.com\/(?:s\/\w*(((-)?\w*)*)?|share\/\S*\d\w*))/g;
        var re_ex_baidu = /(href="https?:\/\/(yun|pan|eyun)\.baidu\.com\/(?:s\/\w*(((-)?\w*)*)?|share\/\S*\d\w*))/g;
        activelink(re_baidu, re_ex_baidu);

        // 蓝奏网盘蓝链
        var re_lanzou = /((?:https?:\/\/)?(pan|www)\.lanzou(s)?\.com\/(?:\w*|\d))/g;
        var re_ex_lanzou = /(href="https?:\/\/(pan|www)\.lanzou(s)?\.com\/(?:\w*|\d))/g;
        activelink(re_lanzou, re_ex_lanzou);

        // 360网盘蓝链
        var re_360 = /((?:https?:\/\/)?yunpan\.360\.cn\/(?:\w*|\d))/g;
        var re_ex_360 = /(href="https?:\/\/yunpan\.360\.cn\/(?:\w*|\d))/g;
        activelink(re_360, re_ex_360);
    }
    /************************************************ 自定义函数-结束 ************************************************/

    $(function() {
        /************************************************ 初始化 ************************************************/
        init();

        /************************************************ 页面右侧新增按钮 ************************************************/
        var panLinksInfo = "";
        var panLinks_Counts = panLinks.length;
        var swalType = "";
        if (panLinks_Counts > 0) {
            panLinksInfo += '<table class="my_baidu_link_table">';
            panLinksInfo += '<thead>';
            panLinksInfo += '<tr>';
            panLinksInfo += '<th><b>#</b></th>';
            panLinksInfo += '<th><b>网盘链接</b></th>';
            panLinksInfo += '<th><b>密码</b></th>';
            panLinksInfo += '</tr>';
            panLinksInfo += '</thead>';
            panLinksInfo += '<tbody>';
            // 检测网盘分享是否失效
            validateLink(panLinksInfo, panLinks_Counts);
            /*
            for (var i = 0; i < panLinks_Counts; i++) {
                if (panLinksPassword[i] != null) {
                    panLinksInfo += '<tr><td>' + i + '</td><td><a target="_blank" href="' + panLinks[i] + '#' + panLinksPassword[i] + '">' + panLinks[i] + '#' + panLinksPassword[i] + '</a></td><td>' + panLinksPassword[i] + '</td></tr>';
                } else {
                    panLinksInfo += '<tr><td>' + i + '</td><td><a target="_blank" href="' + panLinks[i] + '">' + panLinks[i] + '</a></td><td>- - - -</td></tr>';
                }
            }


            panLinksInfo += '</tbody>';
            panLinksInfo += '</table>';
            swalType = "info";
            */
        } else {
            panLinksInfo = "当前页未检测到网盘链接";
            swalType = "warning";
            unsafeWindow._ShowPanLinks = () => {
                swal({
                    width: 650,
                    title: '探测到网盘链接数量：' + panLinks_Counts + '个',
                    type: swalType,
                    html: panLinksInfo,
                    showCloseButton: true,
                    confirmButtonText: '确认'
                });
            }
            if (location.href.match(/(?:https?:\/\/)?(www\.52pojie\.cn\/((thread\-.+\.html)|(forum\.php\?mod=viewthread\&tid=\w.+)))/g)) {
                $('#jz52top').prepend('<span><a id="pancount" title="探测到网盘链接数量：' + panLinks_Counts + '个" class="jzcount" href="javascript:void(0);" onclick="_ShowPanLinks();"><img class="cloud__logo-del" src="https://www.easyicon.net/api/resizeApi.php?id=1109682&size=36"></a></span>');
            }
        }
        //右下角noty提醒
        if ($.cookie('open_pan_notice') == 'true') {
            notyPanCounts(panLinks_Counts);
        }
        
        //debug
        console.log('======> 调试输出：探测到网盘链接数量', panLinks_Counts, '个');
        /*
        unsafeWindow._ShowPanLinks = () => {
            swal({
                width: 650,
                title: '探测到网盘链接数量：' + panLinks_Counts + '个',
                type: swalType,
                html: panLinksInfo,
                showCloseButton: true,
                confirmButtonText: '确认'
            });
        }

        if (location.href.match(/(?:https?:\/\/)?(www\.52pojie\.cn\/((thread\-.+\.html)|(forum\.php\?mod=viewthread\&tid=\w.+)))/g)) {
            $('#jz52top').prepend('<span><a id="pancount" title="探测到网盘链接数量：' + panLinks_Counts + '个" class="jzcount" href="javascript:void(0);" onclick="_ShowPanLinks();"><img class="cloud__logo-del" src="https://www.easyicon.net/api/resizeApi.php?id=1109682&size=36"></a></span>');
        }
         */

        /************************************************ 网盘页面，提取码自动补全功能-开始 ************************************************/
        //百度网盘提取码自动补全
        if (location_pathname.indexOf("/share/") != -1 && $('form input') != null) {
            var code = getCode();
            $('form input').val(code);
            $('form a[title=提取文件]').click();
        }

        // 蓝奏网盘提取码自动补全
        if (location_pathname.indexOf("/fn") == -1 && (location.href).indexOf("/www.lanzous.com/") != -1 && $('iframe') != null) {
            var code = getCode();
            var iframeObj = document.getElementsByTagName('iframe')[0];
            if (iframeObj) {
                iframeObj.contentWindow.document.getElementById('pwd').value = code;
                iframeObj.contentWindow.down_p();
            }else{
                $('#pwdload input#pwd').val(code);
                $('input#sub').click();
            }
            
        }
        /************************************************ 网盘页面，提取码自动补全功能-结束 ************************************************/

    });
})();