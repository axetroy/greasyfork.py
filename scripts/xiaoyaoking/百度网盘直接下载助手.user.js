// ==UserScript==
// @name         百度网盘直接下载助手
// @namespace    undefined
// @version      0.9.30
// @description  直接下载百度网盘和百度网盘分享的文件,避免下载文件时调用百度网盘客户端,获取网盘文件的直接下载地址
// @author       ivesjay
// @match        *://pan.baidu.com/disk/home*
// @match        *://yun.baidu.com/disk/home*
// @match        *://pan.baidu.com/s/*
// @match        *://yun.baidu.com/s/*
// @match        *://pan.baidu.com/share/link*
// @match        *://yun.baidu.com/share/link*
// @require      https://code.jquery.com/jquery-latest.js
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    var $ = $ || window.$;
    var log_count = 1;
    var wordMapHttp = {
        'list-grid-switch':'yvgb9XJ',
        'list-switched-on':'ksbXZm',
        'grid-switched-on':'tch6W25',
        'list-switch':'lrbo9a',
        'grid-switch':'xh6poL',
        'checkbox':'EOGexf',
        'col-item':'Qxyfvg',
        'check':'fydGNC',
        'checked':'EzubGg',
        'list-view':'vdAfKMb',
        'item-active':'ngb9O6',
        'grid-view':'JKvHJMb',
        'bar-search':'OFaPaO',
        'default-dom':'xpX2PV',
        'bar':'qxnX2G5',
        'list-tools':'QDDOQB'
    };
    var wordMapHttps = {
        'list-grid-switch':'qobmXB1q',
        'list-switched-on':'ewXm1e',
        'grid-switched-on':'kxhkX2Em',
        'list-switch':'rvpXm63',
        'grid-switch':'mxgdJgwv',
        'checkbox':'EOGexf',
        'col-item':'Qxyfvg',
        'check':'fydGNC',
        'checked':'EzubGg',
        'list-view':'vdAfKMb',
        'item-active':'pcamXBRX',
        'grid-view':'JKvHJMb',
        'bar-search':'OFaPaO',
        'default-dom':'nyztJqWE',
        'bar':'mkseJqKQ',
        'list-tools':'QDDOQB'
    };
    var wordMap = location.protocol == 'http:' ? wordMapHttp : wordMapHttps;

    //console.log(wordMap);

    function slog(c1,c2,c3){
        c1 = c1?c1:'';
        c2 = c2?c2:'';
        c3 = c3?c3:'';
        console.log('#'+ log_count++ +'-BaiDuNetdiskHelper-log:',c1,c2,c3);
    }

    $(function(){
        switch(detectPage()){
            case 'disk':
                var panHelper = new PanHelper();
                panHelper.init();
                return;
            case 'share':
            case 's':
                var panShareHelper = new PanShareHelper();
                panShareHelper.init();
                return;
            default:
                return;
        }
    });

    //网盘页面的下载助手
    function PanHelper(){
        var yunData,sign,timestamp,bdstoken,logid,fid_list;
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
            dialog = new Dialog({addCopy:true});

            slog('网盘直接下载助手加载成功！');
        };

        function initParams(){
            sign = getSign();
            timestamp = getTimestamp();
            bdstoken = getBDStoken();
            logid = getLogID();
            currentPage = getCurrentPage();
            slog('Current display mode:',currentPage);

            if(currentPage == 'list')
                currentPath = getPath();

            if(currentPage == 'category')
                currentCategory = getCategory();

            if(currentPage == 'search')
                searchKey = getSearchKey();

            refreshListGridStatus();
            refreshFileList();
            refreshSelectList();
        }

        function refreshFileList(){
            if (currentPage == 'list') {
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
        function getListGridStatus(){
            //return $('div.list-grid-switch').hasClass('list-switched-on')?'list':($('div.list-grid-switch').hasClass('grid-switched-on')?'grid':'list');
            //return $('div.itiWzPY').hasClass('kudtWY46')?'list':($('div.itiWzPY').hasClass('nytAL9w')?'grid':'list');
            return $('div.'+wordMap['list-grid-switch']).hasClass(wordMap['list-switched-on'])?'list':($('div.'+wordMap['list-grid-switch']).hasClass(wordMap['grid-switched-on'])?'grid':'list');
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
                if(getCurrentPage() == 'list') {
                    if(currentPage == getCurrentPage()){
                        if(currentPath == getPath()){
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
        function registerListGridStatus(){
            //var $a_list = $('a[node-type=list-switch]');
            //var $a_list = $('a[node-type=eepWzkk]');
            var $a_list = $('a[node-type='+wordMap['list-switch']+']');
            $a_list.click(function(){
                list_grid_status = 'list';
            });

            //var $a_grid = $('a[node-type=grid-switch]');
            //var $a_grid = $('a[node-type=ytnvWY7q]');
            var $a_grid = $('a[node-type='+wordMap['grid-switch']+']');
            $a_grid.click(function(){
                list_grid_status = 'grid';
            });
        }

        //文件选择框
        function registerCheckbox(){
            //var $checkbox = $('span.checkbox');
            //var $checkbox = $('span.EOGexf');
            var $checkbox = $('span.'+wordMap['checkbox']);
            $checkbox.each(function(index,element){
                $(element).bind('click',function(e){
                    var $parent = $(this).parent();
                    var filename;
                    if(list_grid_status == 'list') {
                        //filename = $('div.file-name div.text a',$parent).attr('title');
                        filename = $('div.file-name div.text a',$parent).attr('title');
                    }else if(list_grid_status == 'grid'){
                        //filename = $('div.file-name a',$parent).attr('title');
                        filename = $('div.file-name a',$parent).attr('title');
                    }
                    //if($parent.hasClass('item-active')){
                    //if($parent.hasClass('prWzXA')){
                    if($parent.hasClass(wordMap['item-active'])){
                        slog('取消选中文件：'+filename);
                        for(var i=0;i<selectFileList.length;i++){
                            if(selectFileList[i].filename == filename){
                                selectFileList.splice(i,1);
                            }
                        }
                    }else{
                        slog('选中文件:'+filename);
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

            observer.observe(list_view,options);
            observer.observe(grid_view,options);
        }

        //添加助手按钮
        function addButton(){
            //$('div.bar-search').css('width','18%');//修改搜索框的宽度，避免遮挡
            //$('div.OFaPaO').css('width','18%');
            $('div.'+wordMap['bar-search']).css('width','18%');
            var $dropdownbutton = $('<span class="g-dropdown-button"></span>');
            var $dropdownbutton_a = $('<a class="g-button" href="javascript:void(0);"><span class="g-button-right"><em class="icon icon-download" title="百度网盘下载助手"></em><span class="text" style="width: auto;">下载助手</span></span></a>');
            var $dropdownbutton_span = $('<span class="menu" style="width:96px"></span>');

            var $directbutton = $('<span class="g-button-menu" style="display:block"></span>');
            var $directbutton_span = $('<span class="g-dropdown-button g-dropdown-button-second" menulevel="2"></span>');
            var $directbutton_a = $('<a class="g-button" href="javascript:void(0);"><span class="g-button-right"><span class="text" style="width:auto">直接下载</span></span></a>');
            var $directbutton_menu = $('<span class="menu" style="width:120px;left:79px"></span>');
            var $directbutton_download_button = $('<a id="download-direct" class="g-button-menu" href="javascript:void(0);">下载</a>');
            var $directbutton_link_button = $('<a id="link-direct" class="g-button-menu" href="javascript:void(0);">显示链接</a>');
            var $directbutton_batchhttplink_button = $('<a id="batchhttplink-direct" class="g-button-menu" href="javascript:void(0);">批量链接(HTTP)</a>');
            var $directbutton_batchhttpslink_button = $('<a id="batchhttpslink-direct" class="g-button-menu" href="javascript:void(0);">批量链接(HTTPS)</a>');
            $directbutton_menu.append($directbutton_download_button).append($directbutton_link_button).append($directbutton_batchhttplink_button).append($directbutton_batchhttpslink_button);
            $directbutton.append($directbutton_span.append($directbutton_a).append($directbutton_menu));
            $directbutton.hover(function(){
                $directbutton_span.toggleClass('button-open');
            });
            $directbutton_download_button.click(downloadClick);
            $directbutton_link_button.click(linkClick);
            $directbutton_batchhttplink_button.click(batchClick);
            $directbutton_batchhttpslink_button.click(batchClick);

            var $apibutton = $('<span class="g-button-menu" style="display:block"></span>');
            var $apibutton_span = $('<span class="g-dropdown-button g-dropdown-button-second" menulevel="2"></span>');
            var $apibutton_a = $('<a class="g-button" href="javascript:void(0);"><span class="g-button-right"><span class="text" style="width:auto">API下载</span></span></a>');
            var $apibutton_menu = $('<span class="menu" style="width:120px;left:77px"></span>');
            var $apibutton_download_button = $('<a id="download-api" class="g-button-menu" href="javascript:void(0);">下载</a>');
            var $apibutton_link_button = $('<a id="httplink-api" class="g-button-menu" href="javascript:void(0);">显示链接</a>');
            var $apibutton_batchhttplink_button = $('<a id="batchhttplink-api" class="g-button-menu" href="javascript:void(0);">批量链接(HTTP)</a>');
            var $apibutton_batchhttpslink_button = $('<a id="batchhttpslink-api" class="g-button-menu" href="javascript:void(0);">批量链接(HTTPS)</a>');
            $apibutton_menu.append($apibutton_download_button).append($apibutton_link_button).append($apibutton_batchhttplink_button).append($apibutton_batchhttpslink_button);
            $apibutton.append($apibutton_span.append($apibutton_a).append($apibutton_menu));
            $apibutton.hover(function(){
                $apibutton_span.toggleClass('button-open');
            });
            $apibutton_download_button.click(downloadClick);
            $apibutton_link_button.click(linkClick);
            $apibutton_batchhttplink_button.click(batchClick);
            $apibutton_batchhttpslink_button.click(batchClick);

            var $outerlinkbutton = $('<span class="g-button-menu" style="display:block"></span>');
            var $outerlinkbutton_span = $('<span class="g-dropdown-button g-dropdown-button-second" menulevel="2"></span>');
            var $outerlinkbutton_a = $('<a class="g-button" href="javascript:void(0);"><span class="g-button-right"><span class="text" style="width:auto">外链下载</span></span></a>');
            var $outerlinkbutton_menu = $('<span class="menu" style="width:120px;left:79px"></span>');
            var $outerlinkbutton_download_button = $('<a id="download-outerlink" class="g-button-menu" href="javascript:void(0);">下载</a>');
            var $outerlinkbutton_link_button = $('<a id="link-outerlink" class="g-button-menu" href="javascript:void(0);">显示链接</a>');
            var $outerlinkbutton_batchlink_button = $('<a id="batchlink-outerlink" class="g-button-menu" href="javascript:void(0);">批量链接</a>');
            $outerlinkbutton_menu.append($outerlinkbutton_download_button).append($outerlinkbutton_link_button).append($outerlinkbutton_batchlink_button);
            $outerlinkbutton.append($outerlinkbutton_span.append($outerlinkbutton_a).append($outerlinkbutton_menu));
            $outerlinkbutton.hover(function(){
                $outerlinkbutton_span.toggleClass('button-open');
            });
            $outerlinkbutton_download_button.click(downloadClick);
            $outerlinkbutton_link_button.click(linkClick);
            $outerlinkbutton_batchlink_button.click(batchClick);

            $dropdownbutton_span.append($directbutton).append($apibutton).append($outerlinkbutton);
            $dropdownbutton.append($dropdownbutton_a).append($dropdownbutton_span);

            $dropdownbutton.hover(function(){
                $dropdownbutton.toggleClass('button-open');
            });

            //$('div.default-dom div.bar div.list-tools').append($dropdownbutton);
            //$('div.irhW9pZ div.yqgR747 div.QDDOQB').append($dropdownbutton);
            $('div.'+wordMap['list-tools']).append($dropdownbutton);
        }

        //暂时没用
        // function addLoading(){
        //     var screenWidth = document.body.clientWidth;
        //     var screenHeight = document.body.scrollHeight;
        //     var left = (screenWidth-10)/2;
        //     var top = screenHeight/2;
        //     var $loading = $('<div id="dialog-loading" style="position:absolute;left:'+left+'px;top:'+top+'px;display:none;z-index:52;color:white;font-size:16px">处理中</div>');
        //     $('body').append($loading);
        // }

        function downloadClick(event){
            slog('选中文件列表：',selectFileList);
            var id = event.target.id;
            var downloadLink;

            if(id == 'download-direct'){
                var downloadType;
                if(selectFileList.length === 0) {
                    alert("获取选中文件失败，请刷新重试！");
                    return;
                } else if (selectFileList.length == 1) {
                    if (selectFileList[0].isdir === 1)
                        downloadType = 'batch';
                    else if (selectFileList[0].isdir === 0)
                        downloadType= 'dlink';
                    //downloadType = selectFileList[0].isdir==1?'batch':(selectFileList[0].isdir===0?'dlink':'batch');
                } else if(selectFileList.length > 1){
                    downloadType = 'batch';
                }
                fid_list = getFidList(selectFileList);
                var result = getDownloadLinkWithPanAPI(downloadType);
                if(result.errno === 0){
                    if(downloadType == 'dlink')
                        downloadLink = result.dlink[0].dlink;
                    else if(downloadType == 'batch'){
                        downloadLink = result.dlink;
                        if(selectFileList.length === 1)
                            downloadLink = downloadLink + '&zipname=' + encodeURIComponent(selectFileList[0].filename) + '.zip';
                    }
                    else{
                        alert("发生错误！");
                        return;
                    }
                } else if(result.errno == -1){
                    alert('文件不存在或已被百度和谐，无法下载！');
                    return;
                }else if(result.errno == 112){
                    alert("页面过期，请刷新重试！");
                    return;
                }else{
                    alert("发生错误！");
                    return;
                }
            }else{
                if(selectFileList.length === 0) {
                    alert("获取选中文件失败，请刷新重试！");
                    return;
                } else if (selectFileList.length > 1) {
                    alert("该方法不支持多文件下载！");
                    return;
                } else {
                    if(selectFileList[0].isdir == 1){
                        alert("该方法不支持目录下载！");
                        return;
                    }
                }
                if(id == 'download-api'){
                    downloadLink = getDownloadLinkWithRESTAPIBaidu(selectFileList[0].path);
                } else if (id == 'download-outerlink'){
                    var result = getDownloadLinkWithClientAPI(selectFileList[0].path);
                    if(result.errno == 0){
                        downloadLink = result.urls[0].url;
                    }else if(result.errno == 1){
                        alert('文件不存在！');
                        return;
                    }else if(result.errno == 2){
                        alert('文件不存在或者已被百度和谐，无法下载！');
                        return;
                    }else{
                        alert('发生错误！');
                        return;
                    }
                }
            }
            execDownload(downloadLink);
        }

        function linkClick(event){
            slog('选中文件列表：',selectFileList);
            var id = event.target.id;
            var linkList,tip;

            if(id.indexOf('direct') != -1){
                var downloadType;
                var downloadLink;
                if(selectFileList.length === 0) {
                    alert("获取选中文件失败，请刷新重试！");
                    return;
                } else if (selectFileList.length == 1) {
                    if (selectFileList[0].isdir === 1)
                        downloadType = 'batch';
                    else if (selectFileList[0].isdir === 0)
                        downloadType= 'dlink';
                } else if(selectFileList.length > 1){
                    downloadType = 'batch';
                }
                fid_list = getFidList(selectFileList);
                var result = getDownloadLinkWithPanAPI(downloadType);
                if(result.errno === 0){
                    if(downloadType == 'dlink')
                        downloadLink = result.dlink[0].dlink;
                    else if(downloadType == 'batch'){
                        slog(selectFileList);
                        downloadLink = result.dlink;
                        if(selectFileList.length === 1)
                            downloadLink = downloadLink + '&zipname=' + encodeURIComponent(selectFileList[0].filename) + '.zip';
                    }
                    else{
                        alert("发生错误！");
                        return;
                    }
                }else if(result.errno == -1){
                    alert('文件不存在或已被百度和谐，无法下载！');
                    return;
                }else if(result.errno == 112){
                    alert("页面过期，请刷新重试！");
                    return;
                }else{
                    alert("发生错误！");
                    return;
                }
                var httplink = downloadLink.replace(/^([A-Za-z]+):/,'http:');
                var httpslink = downloadLink.replace(/^([A-Za-z]+):/,'https:');
                var filename = '';
                $.each(selectFileList,function(index,element){
                    if(selectFileList.length == 1)
                        filename = element.filename;
                    else{
                        if(index ==0)
                            filename = element.filename;
                        else
                            filename = filename + ',' + element.filename;
                    }
                });
                linkList = {
                    filename:filename,
                    urls:[
                        {url:httplink,rank:1},
                        {url:httpslink,rank:2}
                    ]
                };
                tip = '显示模拟百度网盘网页获取的链接，可以使用右键迅雷下载，复制到下载工具需要传递cookie，多文件打包下载的链接可以直接复制使用';
                dialog.open({title:'下载链接',type:'link',list:linkList,tip:tip});
            }else{
                if(selectFileList.length === 0) {
                    alert("获取选中文件失败，请刷新重试！");
                    return;
                } else if (selectFileList.length > 1) {
                    alert("该方法不支持多文件下载！");
                    return;
                } else {
                    if(selectFileList[0].isdir == 1){
                        alert("该方法不支持目录下载！");
                        return;
                    }
                }
                if(id.indexOf('api') != -1){
                    var downloadLink = getDownloadLinkWithRESTAPIBaidu(selectFileList[0].path);
                    var httplink = downloadLink.replace(/^([A-Za-z]+):/,'http:');
                    var httpslink = downloadLink.replace(/^([A-Za-z]+):/,'https:');
                    linkList = {
                        filename:selectFileList[0].filename,
                        urls:[
                            {url:httplink,rank:1},
                            {url:httpslink,rank:2}
                        ]
                    };
                    httplink = httplink.replace('250528','266719');
                    httpslink = httpslink.replace('250528','266719');
                    linkList.urls.push({url:httplink,rank:3});
                    linkList.urls.push({url:httpslink,rank:4});
                    tip = '显示模拟APP获取的链接(使用百度云ID)，可以使用右键迅雷下载，复制到下载工具需要传递cookie';
                    dialog.open({title:'下载链接',type:'link',list:linkList,tip:tip});
                } else if (id.indexOf('outerlink') != -1){
                    var result = getDownloadLinkWithClientAPI(selectFileList[0].path);
                    if(result.errno == 0){
                        linkList = {
                            filename:selectFileList[0].filename,
                            urls:result.urls
                        };
                    }else if(result.errno == 1){
                        alert('文件不存在！');
                        return;
                