// ==UserScript==
// @name         JS@百度网盘批量重命名
// @namespace    baiduyun.batchrename.jasonshaw
// @version      0.2.1
// @description  批量改名工具，支持添加后缀、修改扩展名，增加前缀（序列化）等等
// @note         增加对文件夹的重命名支持 2018.4.21
// @note         根据百度网盘最新调整，更新了脚本的适配2018.4.12
// @author       jasonshaw
// @match        *://pan.baidu.com/disk/home*
// @match        *://yun.baidu.com/disk/home*
// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    var $ = $ || window.$;
    var log_count = 1;
    var debug = true;
    var wordMapHttp = {
        'list-grid-switch': 'auiaQNyn',
        'list-switched-on': 'ksbXZm',
        'grid-switched-on': 'tch6W25',
        'list-switch': 'lrbo9a',
        'grid-switch': 'xh6poL',
        'checkbox': 'EOGexf',  //ok
        'chekbox-grid': 'cEefyz',
        'col-item': 'Qxyfvg',
        'check': 'fydGNC',
        'checked': 'EzubGg',
        'list-view': 'vdAfKMb',
        'item-active': 'xrmQgr8',
        'grid-view': 'JKvHJMb',
        'bar-search': 'OFaPaO',
        //'check-all':'zbyDdwb',
        //'rename-div':'ExFGye',
        //'default-dom':'etr9DPv',
        //'bar':'ccjr9DVe',
        'list-tools': 'QDDOQB'
    };
	$(function () {
	    wordMapHttp['default-dom'] = ($('.icon-upload').parent().parent().parent().parent().parent().attr('class'));
	    wordMapHttp['bar'] = ($('.icon-upload').parent().parent().parent().parent().attr('class'));
	} ) ;
    var wordMapHttps = {
        'list-grid-switch': 'auiaQNyn',
        'list-switched-on': 'ewXm1e',
        'grid-switched-on': 'kxhkX2Em',
        'list-switch': 'rvpXm63',
        'grid-switch': 'mxgdJgwv',
        'checkbox': 'EOGexf',
        'col-item': 'Qxyfvg',
        'check': 'fydGNC',
        'checked': 'EzubGg',
        'chekbox-grid': 'cEefyz',
        'list-view': 'vdAfKMb',
        'item-active': 'xrmQgr8',
        'grid-view': 'JKvHJMb',
        'bar-search': 'OFaPaO',
        //'check-all':'zbyDdwb',
        //'rename-div':'ExFGye',
        //'default-dom':'qkk3LED',
        //'bar':'cfj3L8W',
        'list-tools': 'QDDOQB'
    };
    var wordMap = location.protocol == 'http:' ? wordMapHttp : wordMapHttps;

    //console.log(wordMap);

    //替换网址为高级下载链接 默认不替换 http不用传
    function replaceDownloadLink(link, http) {
        var http = http || false;
        //是否强制将https替换为http
        if (http) {
            return link.replace('https://d.pcs.baidu.com', 'http://yqall02.baidupcs.com');
        } else {
            return link.replace('d.pcs.baidu.com', 'yqall02.baidupcs.com');
        }
    }

    function slog(c1, c2, c3) {
        c1 = c1 ? c1 : '';
        c2 = c2 ? c2 : '';
        c3 = c3 ? c3 : '';
        console.log('#' + log_count++ + '-BaiDuYunRenameHelper-log:', c1, c2, c3);
    }

    $(function(){
        switch(detectPage()){
            case 'disk':
                var panHelper = new PanHelper();
                panHelper.init();
                return;
            // case 'share':
            // case 's':
            //     var panShareHelper = new PanShareHelper();
            //     panShareHelper.init();
            //     return;
            default:
                return;
        }
    });

    //网盘页面的下载助手
    function PanHelper(){
        var yunData,sign,timestamp,bdstoken,logid,fid_list,url,newName,newPath;
        var fileList=[],selectFileList=[],batchLinkList=[],batchLinkListAll=[],linkList=[],
            list_grid_status='list';
        var observer,currentPage,currentPath,currentCategory,dialog,searchKey;
        var panAPIUrl = location.protocol + "//" + location.host + "/api/";
        var restAPIUrl = location.protocol + "//pcs.baidu.com/rest/2.0/pcs/";
        var clientAPIUrl = location.protocol + "//d.pcs.baidu.com/rest/2.0/pcs/";

        this.init = function(){
            yunData = unsafeWindow.yunData;
            slog('yunData:',yunData);
            if(yunData === undefined){
                slog('页面未正常加载，或者百度已经更新！');
                return;
            }
            initParams();
            registerEventListener();
            createObserver();
            addButton();
            createIframe();
            // dialog = new Dialog({addCopy:true});

            slog('网盘批量改名助手加载成功！');
        };

        function initParams(){
            sign = getSign();
            timestamp = getTimestamp();
            bdstoken = getBDStoken();
            logid = getLogID();
            currentPage = getCurrentPage();
            slog('Current display mode:',currentPage);

            if (currentPage == 'all')
                currentPath = getPath();

            if(currentPage == 'category')
                currentCategory = getCategory();

            if(currentPage == 'search')
                searchKey = getSearchKey();

            refreshListGridStatus();
            refreshFileList();
            refreshSelectList();
        }

        function refreshFileList() {
            if (currentPage == 'all') {
                fileList = getFileList();
            } else if (currentPage == 'category'){
                fileList = getCategoryFileList();
            } else if (currentPage == 'search') {
                fileList = getSearchFileList();
            }
        }

        function refreshSelectList(){
            selectFileList = [];
        }

        function refreshListGridStatus(){
            list_grid_status = getListGridStatus();
        }

        //获取当前的视图模式
        function getListGridStatus() {
            if ($('.grid-switched-on').length > 0) {
                return 'grid'
            } else {
                return 'list'
            }
        }

        function registerEventListener(){
            registerHashChange();
            registerListGridStatus();
            registerCheckbox();
            registerAllCheckbox();
            registerFileSelect();
        }

        //监视地址栏#标签的变化
        function registerHashChange(){
            window.addEventListener('hashchange',function(e){
                refreshListGridStatus();

                if (getCurrentPage() == 'all') {
                    if (currentPage == getCurrentPage()) {
                        if (currentPath == getPath()) {
                            return;
                        } else {
                            currentPath = getPath();
                            refreshFileList();
                            refreshSelectList();
                        }
                    } else {
                        currentPage = getCurrentPage();
                        currentPath = getPath();
                        refreshFileList();
                        refreshSelectList();
                    }
                } else if (getCurrentPage() == 'category') {
                    if(currentPage == getCurrentPage()){
                        if(currentCategory == getCategory()){
                            return;
                        } else {
                            currentPage = getCurrentPage();
                            currentCategory = getCategory();
                            refreshFileList();
                            refreshSelectList();
                        }
                    } else {
                        currentPage = getCurrentPage();
                        currentCategory = getCategory();
                        refreshFileList();
                        refreshSelectList();
                    }
                } else if(getCurrentPage() == 'search') {
                    if(currentPage == getCurrentPage()){
                        if(searchKey == getSearchKey()){
                            return;
                        } else {
                            currentPage = getCurrentPage();
                            searchKey = getSearchKey();
                            refreshFileList();
                            refreshSelectList();
                        }
                    } else {
                        currentPage = getCurrentPage();
                        searchKey = getSearchKey();
                        refreshFileList();
                        refreshSelectList();
                    }
                }
            });
        }

        //监视视图变化
        function registerListGridStatus() {
            var $a_list = $('a[data-type=list]');
            $a_list.click(function () {
                list_grid_status = 'list';
            });

            var $a_grid = $('a[data-type=grid]');
            $a_grid.click(function () {
                list_grid_status = 'grid';
            });
        }

        //文件选择框
        function registerCheckbox() {
            var $checkbox = $('span.' + wordMap['checkbox']);
            if (list_grid_status == 'grid') {
                $checkbox = $('.' + wordMap['chekbox-grid']);
            }

            //console.log($checkbox);
            $checkbox.each(function (index, element) {
                $(element).bind('click', function (e) {
                    var $parent = $(this).parent();
                    var filename;

                    if (list_grid_status == 'list') {
                        filename = $('div.file-name div.text a', $parent).attr('title');
                    } else if (list_grid_status == 'grid') {
                        filename = $('div.file-name a', $parent).attr('title');
                    }
                    //if($parent.hasClass('item-active')){
                    //if($parent.hasClass('prWzXA')){
                    //console.log(fileList);
                    if ($parent.hasClass(wordMap['item-active'])) {
                        slog('取消选中文件：' + filename);
                        for (var i = 0; i < selectFileList.length; i++) {
                            if (selectFileList[i].filename == filename) {
                                selectFileList.splice(i, 1);
                            }
                        }
                    } else {
                        slog('选中文件:' + filename);
                        //console.log(fileList);
                        $.each(fileList, function (index, element) {
                            if (element.server_filename == filename) {
                                var obj = {
                                    filename:element.server_filename,
                                    path:element.path,
                                    fs_id:element.fs_id,
                                    isdir:element.isdir
                                };
                                selectFileList.push(obj);
                            }
                        });
                    }
                });
            });
        }

        function unregisterCheckbox(){
            //var $checkbox = $('span.checkbox');
            //var $checkbox = $('span.EOGexf');
            var $checkbox = $('span.'+wordMap['checkbox']);
            $checkbox.each(function(index,element){
                $(element).unbind('click');
            });
        }

        //全选框
        function registerAllCheckbox(){
            //var $checkbox = $('div.col-item.check');
            //var $checkbox = $('div.Qxyfvg.fydGNC');
            var $checkbox = $('div.'+wordMap['col-item']+'.'+wordMap['check']);
            $checkbox.each(function(index,element){
                $(element).bind('click',function(e){
                    var $parent = $(this).parent();
                    //if($parent.hasClass('checked')){
                    //if($parent.hasClass('EzubGg')){
                    if($parent.hasClass(wordMap['checked'])){
                        slog('取消全选');
                        selectFileList = [];
                    } else {
                        slog('全部选中');
                        selectFileList = [];
                        $.each(fileList,function(index,element){
                            var obj = {
                                filename:element.server_filename,
                                path:element.path,
                                fs_id:element.fs_id,
                                isdir:element.isdir
                            };
                            selectFileList.push(obj);
                        });
                    }
                });
            });
        }

        function unregisterAllCheckbox(){
            //var $checkbox = $('div.col-item.check');
            //var $checkbox = $('div.Qxyfvg.fydGNC');
            var $checkbox = $('div.'+wordMap['col-item']+'.'+wordMap['check']);
            $checkbox.each(function(index,element){
                $(element).unbind('click');
            });
        }

        //单个文件选中，点击文件不是点击选中框，会只选中该文件
        function registerFileSelect(){
            //var $dd = $('div.list-view dd');
            //var $dd = $('div.vdAfKMb dd');
            var $dd = $('div.'+wordMap['list-view']+' dd');
            $dd.each(function(index,element){
                $(element).bind('click',function(e){
                    var nodeName = e.target.nodeName.toLowerCase();
                    if(nodeName != 'span' && nodeName != 'a' && nodeName != 'em') {
                        slog('shiftKey:'+e.shiftKey);
                        if(!e.shiftKey){
                            selectFileList = [];
                            var filename = $('div.file-name div.text a',$(this)).attr('title');
                            slog('选中文件：' + filename);
                            $.each(fileList,function(index,element){
                                if(element.server_filename == filename){
                                    var obj = {
                                        filename:element.server_filename,
                                        path:element.path,
                                        fs_id:element.fs_id,
                                        isdir:element.isdir
                                    };
                                    selectFileList.push(obj);
                                }
                            });
                        }else{
                            selectFileList = [];
                            //var $dd_select = $('div.list-view dd.item-active');
                            //var $dd_select = $('div.vdAfKMb dd.prWzXA');
                            var $dd_select = $('div.'+wordMap['list-view']+' dd.'+wordMap['item-active']);
                            $.each($dd_select,function(index,element){
                                var filename = $('div.file-name div.text a',$(element)).attr('title');
                                slog('选中文件：' + filename);
                                $.each(fileList,function(index,element){
                                    if(element.server_filename == filename){
                                        var obj = {
                                            filename:element.server_filename,
                                            path:element.path,
                                            fs_id:element.fs_id,
                                            isdir:element.isdir
                                        };
                                        selectFileList.push(obj);
                                    }
                                });
                            });
                        }
                    }
                });
            });
        }

        function unregisterFileSelect(){
            //var $dd = $('div.list-view dd');
            //var $dd = $('div.vdAfKMb dd');
            var $dd = $('div.'+wordMap['list-view']+' dd');
            $dd.each(function(index,element){
                $(element).unbind('click');
            });
        }

        //监视文件列表显示变化
        function createObserver(){
            var MutationObserver = window.MutationObserver;
            var options = {
                'childList': true
            };
            observer = new MutationObserver(function(mutations){
                unregisterCheckbox();
                unregisterAllCheckbox();
                unregisterFileSelect();
                registerCheckbox();
                registerAllCheckbox();
                registerFileSelect();
            });

            //var list_view = document.querySelector('.list-view');
            //var grid_view = document.querySelector('.grid-view');

            //var list_view = document.querySelector('.vdAfKMb');
            //var grid_view = document.querySelector('.JKvHJMb');

            var list_view = document.querySelector('.'+wordMap['list-view']);
            var grid_view = document.querySelector('.'+wordMap['grid-view']);

            //console.log(list_view);
            observer.observe(list_view, options);
            observer.observe(grid_view, options);
        }

        //添加助手按钮
        function addButton(){
            //$('div.bar-search').css('width','18%');//修改搜索框的宽度，避免遮挡
            //$('div.OFaPaO').css('width','18%');
            $('div.'+wordMap['bar-search']).css('width','18%');
            var $dropdownbutton = $('<span class="g-dropdown-button"></span>');
            var $dropdownbutton_a = $('<a class="g-button" href="javascript:void(0);"><span class="g-button-right"><em class="icon icon-download" title="百度网盘批量重命名"></em><span class="text" style="width: auto;">批量改名</span></span></a>');
            var $dropdownbutton_span = $('<span class="menu" style="width:96px"></span>');

            var $suffixbtn = $('<span class="g-button-menu" style="display:block"></span>');
            var $suffixbtn_span = $('<span class="g-dropdown-button g-dropdown-button-second" menulevel="2"></span>');
            var $suffixbtn_a = $('<a class="g-button" href="javascript:void(0);"><span class="g-button-right"><span class="text" style="width:auto">添加后缀</span></span></a>');
            var $suffixbtn_menu = $('<span class="menu" style="width:120px;left:79px"></span>');
            var $suffixbtn_2046_btn = $('<a id="suffix-2046" class="g-button-menu" href="javascript:void(0);">后缀2046</a>');
            var $suffixbtn_123_btn = $('<a id="suffix-123" class="g-button-menu" href="javascript:void(0);">后缀123</a>');
            var $suffixbtn_xydai_btn = $('<a id="suffix-xydai" class="g-button-menu" href="javascript:void(0);">后缀xydai</a>');
            var $suffixbtn_custom_btn = $('<a id="suffix-custom" class="g-button-menu" href="javascript:void(0);">自定义后缀</a>');
            var $suffixbtn_seq_btn = $('<a id="suffix-seq" class="g-button-menu" href="javascript:void(0);">后缀序号</a>');
            var $suffixbtn_ext_btn = $('<a id="suffix-ext" class="g-button-menu" href="javascript:void(0);">扩展名后缀</a>');
            $suffixbtn_menu.append($suffixbtn_2046_btn).append($suffixbtn_123_btn).append($suffixbtn_xydai_btn).append($suffixbtn_custom_btn).append($suffixbtn_seq_btn).append($suffixbtn_ext_btn);
            $suffixbtn.append($suffixbtn_span.append($suffixbtn_a).append($suffixbtn_menu));
            $suffixbtn.hover(function(){
                $suffixbtn_span.toggleClass('button-open');
            });
            $suffixbtn_2046_btn.click(suffix2046);
            $suffixbtn_123_btn.click(suffix123);
            $suffixbtn_xydai_btn.click(suffixXydai);
            $suffixbtn_custom_btn.click(suffixCustom);
            $suffixbtn_seq_btn.click(suffixSeq);
            $suffixbtn_ext_btn.click(suffixExt);

            var $prefixbtn = $('<span class="g-button-menu" style="display:block"></span>');
            var $prefixbtn_span = $('<span class="g-dropdown-button g-dropdown-button-second" menulevel="2"></span>');
            var $prefixbtn_a = $('<a class="g-button" href="javascript:void(0);"><span class="g-button-right"><span class="text" style="width:auto">添加前缀</span></span></a>');
            var $prefixbtn_menu = $('<span class="menu" style="width:120px;left:77px"></span>');
            var $prefixbtn_custom_btn = $('<a id="prefix-custom" class="g-button-menu" href="javascript:void(0);">自定义前缀</a>');
            var $prefixbtn_seq_btn = $('<a id="prefix-seq" class="g-button-menu" href="javascript:void(0);">前缀序号</a>');
            var $prefixbtn_ext_btn = $('<a id="prefix-ext" class="g-button-menu" href="javascript:void(0);">扩展名前缀</a>');
            // var $prefixbtn_batchhttpslink_button = $('<a id="batchhttpslink-api" class="g-button-menu" href="javascript:void(0);">批量链接(HTTPS)</a>');
            $prefixbtn_menu.append($prefixbtn_custom_btn).append($prefixbtn_seq_btn).append($prefixbtn_ext_btn);
            $prefixbtn.append($prefixbtn_span.append($prefixbtn_a).append($prefixbtn_menu));
            $prefixbtn.hover(function(){
                $prefixbtn_span.toggleClass('button-open');
            });
            $prefixbtn_custom_btn.click(prefixCustom);
            $prefixbtn_seq_btn.click(prefixSeq);
            $prefixbtn_ext_btn.click(prefixExt);

            var $advancebtn = $('<span class="g-button-menu" style="display:block"></span>');
            var $advancebtn_span = $('<span class="g-dropdown-button g-dropdown-button-second" menulevel="2"></span>');
            var $advancebtn_a = $('<a class="g-button" href="javascript:void(0);"><span class="g-button-right"><span class="text" style="width:auto">高级重命名</span></span></a>');
            var $advancebtn_menu = $('<span class="menu" style="width:120px;left:79px"></span>');
            var $advancebtn_replace_btn = $('<a id="advance-replace" class="g-button-menu" href="javascript:void(0);">正则替换</a>');
            var $advancebtn_replace_ext_btn = $('<a id="advance-ext-replace" class="g-button-menu" href="javascript:void(0);">正则替换扩展名</a>');
            var $advancebtn_ext_btn = $('<a id="advance-ext" class="g-button-menu" href="javascript:void(0);">替换扩展名</a>');
            var $advancebtn_del_btn = $('<a id="advance-del" class="g-button-menu" href="javascript:void(0);">删除默认编号</a>');
            $advancebtn_menu.append($advancebtn_replace_btn).append($advancebtn_replace_ext_btn).append($advancebtn_ext_btn).append($advancebtn_del_btn);
            $advancebtn.append($advancebtn_span.append($advancebtn_a).append($advancebtn_menu));
            $advancebtn.hover(function(){
                $advancebtn_span.toggleClass('button-open');
            });
            $advancebtn_replace_btn.click(advanceReplace);
            $advancebtn_replace_ext_btn.click(advanceExtReplace);
            $advancebtn_ext_btn.click(advanceExt);
            $advancebtn_del_btn.click(advanceDel);

            $dropdownbutton_span.append($suffixbtn).append($prefixbtn).append($advancebtn);
            $dropdownbutton.append($dropdownbutton_a).append($dropdownbutton_span);

            $dropdownbutton.hover(function(){
                $dropdownbutton.toggleClass('button-open');
            });

            $('div.' + wordMap['default-dom'] + ' div.' + wordMap['bar'] + ' div.' + wordMap['list-tools']).prepend($dropdownbutton);
            $('div.' + wordMap['list-tools']).prepend($dropdownbutton)
        }


        function PrefixInteger(num, max) {//根据最大值，自动生成序列数，位数不足，则头部以零补位
            var n = max.toString().length;
            return (Array(n).join(0) + num).slice(-n);

        }

        function do_rename(str = '',type,pattern = null){
            slog('选中文件列表：',selectFileList);
            var fileList = selectFileList,len = fileList.length,width=(len+1).toString().length;
            slog('fileList:',fileList);
            slog('fileList_Length:',len);
            // return false;
            // alert(2);
            if(fileList.length > 0){
                var toRename = [];
                $(fileList).each(function (i){
                    slog('fileList '+ i +':',this.path);
                    // if(this.isdir == 1) return true; //跳过目录 2017-3-4 22:34:34, 是否能够对目录批量重命名呢？
                    // var pathArr = this.path.split(".");
                    // 这里改造，对文件和文件夹做分别处理，既可以实现非深入递归的方式进行带文件夹的重命名
                    var fn = this.filename;// var fn = this.filename || this.path.split(".").pop();
                    if(this.isdir == 1) {
                        // 当为与扩展名相关操作时，目录则跳过，不必处理
                        if(type.indexOf("ext") > -1) return true;//jq each中 break => return false; continue => return true
                        // 当为非扩展名相关操作时，无扩展名
                        var fn0 = fn;
                        var tail = '';
                    } else {
                        var fnArr = fn.split(".");
                        slog('fnArr '+ i +':',fnArr);
                        var fileext = fnArr.pop();
                        var fn0 = fnArr.length > 1 ? fnArr.join(".") : fnArr[0];
                        var tail = "." + fileext;
                    }
                    slog('fn0 '+ i +':',fn0);
                    slog('FileExt :',fileext);//isdir 则 不存在
                    slog('fnArr :',fnArr);//isdir 则 不存在
                    slog('tail :',tail);//isdir 则 不存在
                    switch(type){
                        //prefix,replace,ext,ext_replace,sequence_prefix,sequence_suffix,ext_sequence_prefix,ext_sequence_suffix,ext_prefix,ext_suffix
                        case 'prefix':
                            // var len = pathArr.length;
                            newName =  '('+str+')' + fn0 + tail;
                            break;
                        case 'replace':
                            newName = fn0.replace(pattern,str) + tail;
                            break;
                        case 'ext_replace':
                            newName = fn0 + "." + fileext.replace(pattern,str);
                            break;
                        case 'ext':
                            newName = fn0 + "." + str;
                            break;
                        case 'sequence_prefix':
                            newName = PrefixInteger(i+1,len) + '-' + fn0 + tail;
                            break;
                        case 'sequence_suffix':
                            newName =   fn0  + '-' + PrefixInteger(i+1,len)+ tail;
                            break;
                        // case 'ext_sequence_prefix':
                        //     newName =  fn0 + "." + PrefixInteger(i+1,len) + fileext;
                        //     break;
                        // case 'ext_sequence_suffix':
                        //     newName =   fn0  + "." + fileext + PrefixInteger(i+1,len);
                            break;
                        case 'ext_prefix':
                            newName =  fn0 + "." + str + fileext;
                            break;
                        case 'ext_suffix':
                            newName =   fn0  + "." + fileext + str;
                            break;
                        case 'suffix':
                        default:
                            newName =   fn0 + '('+str+')' + tail;
                            break;
                    }
                    slog('newName :',newName);
                    toRename.push({"path":this.path,"newname":newName});
                });
                slog('toRename :',toRename);
                if(toRename.length > 0){
                    // alert(toRename.length);
                    // slog('toRename :',toRename);
                    rename(toRename);
                }else{
                    alert('好像你的后缀无需更改');
                }
            }else{
                alert('这个目录文件列表为空');
            }
        }

        function rename(filelist){
            url = panAPIUrl + 'filemanager?opera=rename&async=2&onnest=fail&channel=chunlei&web=1&app_id=250528&bdstoken='+ bdstoken +'&logid='+ logid +'&clienttype=0';

            //https://pan.baidu.com/api/filemanager?opera=rename&async=2&onnest=fail&channel=chunlei&web=1&app_id=250528&bdstoken=79758e5656f91ed705a404537f147dc3&logid=MTUxODQyNjQxNDkxMTAuNzY1MjMyMDY0NDg3Mjg1Ng==&clienttype=0
            var params = {
                filelist:JSON.stringify(filelist),
            };
            slog('params :',params);
            $.ajax({
                url:url,
                method:'POST',
                async:false,
                data:params,
                success:function(response){
                    slog('response :',response);
                    if(response.errno == 0){
                        alert('恭喜修改成功，共修改成功 ' + filelist.length + ' 个文件，刷新页面即可看到改变');
                        window.location.reload(true);
                    }else{
                        alert('修改失败，请重新登录再试。如果持续失败，可能是百度接口发生改变。');
                    }
                }
            });
        }

        function suffix2046(){
            do_rename('2046','suffix');//prefix,replace,ext,ext_replace,sequence_prefix,sequence_suffix,ext_sequence_prefix,ext_sequence_suffix,ext_prefix,ext_suffix
            return false;
        }

        function suffix123(){
            do_rename('123','suffix');//prefix,replace,ext,ext_replace,sequence_prefix,sequence_suffix,ext_sequence_prefix,ext_sequence_suffix,ext_prefix,ext_suffix
            return false;
        }

        function suffixXydai(){
            do_rename('www.xydai.com','suffix');//prefix,replace,ext,ext_replace,sequence_prefix,sequence_suffix,ext_sequence_prefix,ext_sequence_suffix,ext_prefix,ext_suffix
            return false;
        }

        function suffixCustom(){
            var str = prompt("请输入要添加的后缀", "");
            if (str){
                do_rename(str,'suffix');//prefix,replace,ext,ext_replace,sequence_prefix,sequence_suffix,ext_sequence_prefix,ext_sequence_suffix,ext_prefix,ext_suffix
                return false;
            }else{
                alert('没有添加任何后缀！')
                return true;
            }
        }

        function suffixSeq(){
            do_rename('','sequence_suffix');//prefix,replace,ext,ext_replace,sequence_prefix,sequence_suffix,ext_sequence_prefix,ext_sequence_suffix,ext_prefix,ext_suffix
            return false;
        }

        function suffixExt(){
            var str = prompt("请输入要添加的后缀", "");
            if (str){
                do_rename(str,'ext_suffix');//prefix,replace,ext,ext_replace,sequence_prefix,sequence_suffix,ext_sequence_prefix,ext_sequence_suffix,ext_prefix,ext_suffix
                return false;
            }else{
                alert('没有添加任何后缀！')
                return true;
            }
        }

        function prefixCustom(){
            var str = prompt("请输入要添加的后缀", "");
            if (str){
                do_rename(str,'prefix');//prefix,replace,ext,ext_replace,sequence_prefix,sequence_suffix,ext_sequence_prefix,ext_sequence_suffix,ext_prefix,ext_suffix
                return false;
            }else{
                alert('没有添加任何后缀！')
                return true;
            }
        }

        function prefixSeq(){
            do_rename('','sequence_prefix');//prefix,replace,ext,ext_replace,sequence_prefix,sequence_suffix,ext_sequence_prefix,ext_sequence_suffix,ext_prefix,ext_suffix
            return false;
        }

        function prefixExt(){
            var str = prompt("请输入要添加的后缀", "");
            if (str){
                do_rename(str,'ext_prefix');//prefix,replace,ext,ext_replace,sequence_prefix,sequence_suffix,ext_sequence_prefix,ext_sequence_suffix,ext_prefix,ext_suffix
                return false;
            }else{
                alert('没有添加任何后缀！')
                return true;
            }
        }

        function advanceReplace(){
            var pattern = prompt("请输入要匹配的模式：", "");
            var str = prompt("请输入替换的字符串：：", "");
            if (pattern){
                do_rename(str,'replace',eval(pattern));//prefix,replace,ext,ext_replace,sequence_prefix,sequence_suffix,ext_sequence_prefix,ext_sequence_suffix,ext_prefix,ext_suffix
                return false;
            }else{
                alert('没有添加任何后缀！')
                return true;
            }
        }

        function advanceExtReplace(){
            var pattern = prompt("请输入要匹配的模式：", "");
            var str = prompt("请输入替换的字符串：", "");
            if (pattern){
                do_rename(str,'ext_replace',eval(pattern));//prefix,replace,ext,ext_replace,sequence_prefix,sequence_suffix,ext_sequence_prefix,ext_sequence_suffix,ext_prefix,ext_suffix
                return false;
            }else{
                alert('没有添加任何后缀！')
                return true;
            }
        }

        function advanceExt(){
            var str = prompt("请输入新的扩展名", "");
            if (str){
                do_rename(str,'ext');//prefix,replace,ext,ext_replace,sequence_prefix,sequence_suffix,ext_sequence_prefix,ext_sequence_suffix,ext_prefix,ext_suffix
                return false;
            }else{
                alert('未输入任何新扩展名！')
                return true;
            }
        }

        function advanceDel(){
            do_rename('','replace',/\(\d+\)/);//prefix,replace,ext,ext_replace,sequence_prefix,sequence_suffix,ext_sequence_prefix,ext_sequence_suffix,ext_prefix,ext_suffix
            return false;
        }


        function getSign(){
            var signFnc;
            try{
                signFnc = new Function("return " + yunData.sign2)();
            } catch(e){
                throw new Error(e.message);
            }
            return base64Encode(signFnc(yunData.sign5,yunData.sign1));
        }

        //获取当前目录
        function getPath(){
            var hash = location.hash;
            var regx = new RegExp("path=([^&]*)(&|$)", 'i');
            var result = hash.match(regx);
            //console.log(result);
            return decodeURIComponent(result[1]);
        }

        //获取分类显示的类别，即地址栏中的type
        function getCategory(){
            var hash = location.hash;
            var regx = new RegExp("path=([^&]*)(&|$)", 'i');
            var result = hash.match(regx);
            return decodeURIComponent(result[1]);
        }

        function getSearchKey() {
            var hash = location.hash;
            var regx = new RegExp("key=([^&]*)(&|$)", 'i');
            var result = hash.match(regx);
            return decodeURIComponent(result[1]);
        }

        //获取当前页面(all或者category或search)
        function getCurrentPage() {
            var hash = location.hash;
            //console.log(hash.substring(hash.indexOf('#') + 2, hash.indexOf('?')));
            return hash.substring(hash.indexOf('#') + 2, hash.indexOf('?'));
        }

        //获取文件列表
        function getFileList(){
            var filelist = [];
            var listUrl = panAPIUrl + "list";
            var path = getPath();
            logid = getLogID();
            var params = {
                dir:path,
                bdstoken:bdstoken,
                logid:logid,
                order:'size',
                desc:0,
                clienttype:0,
                showempty:0,
                web:1,
                channel:'chunlei',
                appid:250528
            };
            $.ajax({
                url:listUrl,
                async:false,
                method:'GET',
                data:params,
                success:function(response){
                    filelist = 0===response.errno ? response.list : [];
                }
            });
            return filelist;
        }

        //获取分类页面下的文件列表
        function getCategoryFileList(){
            var filelist = [];
            var listUrl = panAPIUrl + "categorylist";
            var category = getCategory();
            logid = getLogID();
            var params = {
                category:category,
                bdstoken:bdstoken,
                logid:logid,
                order:'size',
                desc:0,
                clienttype:0,
                showempty:0,
                web:1,
                channel:'chunlei',
                appid:250528
            };
            $.ajax({
                url:listUrl,
                async:false,
                method:'GET',
                data:params,
                success:function(response){
                    filelist = 0===response.errno ? response.info : [];
                }
            });
            return filelist;
        }

        function getSearchFileList(){
            var filelist = [];
            var listUrl = panAPIUrl + 'search';
            logid = getLogID();
            searchKey = getSearchKey();
            var params = {
                recursion:1,
                order:'time',
                desc:1,
                showempty:0,
                web:1,
                page:1,
                num:100,
                key:searchKey,
                channel:'chunlei',
                app_id:250528,
                bdstoken:bdstoken,
                logid:logid,
                clienttype:0
            };
            $.ajax({
                url:listUrl,
                async:false,
                method:'GET',
                data:params,
                success:function(response){
                    filelist = 0===response.errno ? response.list : [];
                }
            });
            return filelist;
        }

        //生成下载时的fid_list参数
        function getFidList(list){
            var fidlist = null;
            if (list.length === 0)
                return null;
            var fileidlist = [];
            $.each(list,function(index,element){
                fileidlist.push(element.fs_id);
            });
            fidlist = '[' + fileidlist + ']';
            return fidlist;
        }

        function getTimestamp(){
            return yunData.timestamp;
        }

        function getBDStoken(){
            return yunData.MYBDSTOKEN;
        }

        function createIframe(){
            var $div = $('<div class="helper-hide" style="padding:0;margin:0;display:block"></div>');
            var $iframe = $('<iframe src="javascript:void(0)" id="helperdownloadiframe" style="display:none"></iframe>');
            $div.append($iframe);
            $('body').append($div);

        }
    }

    function base64Encode(t){
        var a, r, e, n, i, s, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (e = t.length,r = 0,a = ""; e > r; ) {
            if (n = 255 & t.charCodeAt(r++),r == e) {
                a += o.charAt(n >> 2);
                a += o.charAt((3 & n) << 4);
                a += "==";
                break;
            }
            if (i = t.charCodeAt(r++),r == e) {
                a += o.charAt(n >> 2);
                a += o.charAt((3 & n) << 4 | (240 & i) >> 4);
                a += o.charAt((15 & i) << 2);
                a += "=";
                break;
            }
            s = t.charCodeAt(r++);
            a += o.charAt(n >> 2);
            a += o.charAt((3 & n) << 4 | (240 & i) >> 4);
            a += o.charAt((15 & i) << 2 | (192 & s) >> 6);
            a += o.charAt(63 & s);
        }
        return a;
    }

    function detectPage(){
        var regx = /[\/].+[\/]/g;
        var page = location.pathname.match(regx);
        return page[0].replace(/\//g,'');
    }

    function getCookie(e) {
        var o, t;
        var n = document,c=decodeURI;
        return n.cookie.length > 0 && (o = n.cookie.indexOf(e + "="),-1 != o) ? (o = o + e.length + 1,t = n.cookie.indexOf(";", o),-1 == t && (t = n.cookie.length),c(n.cookie.substring(o, t))) : "";
    }

    function getLogID(){
        var name = "BAIDUID";
        var u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/~！@#￥%……&";
        var d = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
        var f = String.fromCharCode;
        function l(e){
            if (e.length < 2) {
                var n = e.charCodeAt(0);
                return 128 > n ? e : 2048 > n ? f(192 | n >>> 6) + f(128 | 63 & n) : f(224 | n >>> 12 & 15) + f(128 | n >>> 6 & 63) + f(128 | 63 & n);
            }
            var n = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
            return f(240 | n >>> 18 & 7) + f(128 | n >>> 12 & 63) + f(128 | n >>> 6 & 63) + f(128 | 63 & n);
        }
        function g(e){
            return (e + "" + Math.random()).replace(d, l);
        }
        function m(e){
            var n = [0, 2, 1][e.length % 3];
            var t = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0);
            var o = [u.charAt(t >>> 18), u.charAt(t >>> 12 & 63), n >= 2 ? "=" : u.charAt(t >>> 6 & 63), n >= 1 ? "=" : u.charAt(63 & t)];
            return o.join("");
        }
        function h(e){
            return e.replace(/[\s\S]{1,3}/g, m);
        }
        function p(){
            return h(g((new Date()).getTime()));
        }
        function w(e,n){
            return n ? p(String(e)).replace(/[+\/]/g, function(e) {
                return "+" == e ? "-" : "_";
            }).replace(/=/g, "") : p(String(e));
        }
        return w(getCookie(name));
    }

})();