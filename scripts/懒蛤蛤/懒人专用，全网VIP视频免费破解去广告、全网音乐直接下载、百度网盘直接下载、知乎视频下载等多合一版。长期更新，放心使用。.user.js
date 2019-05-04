// ==UserScript==
// @name         懒人专用，全网VIP视频免费破解去广告、全网音乐直接下载、百度网盘直接下载、知乎视频下载等多合一版。长期更新，放心使用。
// @namespace 	 lanhaha
// @version      1.4.6
// @description  自用组合型多功能脚本，集合了优酷、爱奇艺、腾讯、芒果等全网VIP视频免费破解去广告，网易云音乐、QQ音乐、酷狗、酷我、虾米、蜻蜓FM、荔枝FM、喜马拉雅等网站音乐免客户端下载，百度网盘直接下载，知乎视频下载，查券等几个自己常用的功能。
// @author       lanhaha，syhyz1990，Chao，zuihuimai
// @include      *://pan.baidu.com/disk/home*
// @include      *://yun.baidu.com/disk/home*
// @include      *://pan.baidu.com/s/*
// @include      *://yun.baidu.com/s/*
// @include      *://pan.baidu.com/share/link*
// @include      *://yun.baidu.com/share/link*
// @include      *://*.zhihu.com/*
// @include      *://v.vzuu.com/video/*
// @include      *://v.youku.com/v_*
// @include      *://m.youku.com/v*
// @include      *://m.youku.com/a*
// @include      *://*.iqiyi.com/v_*
// @include      *://*.iqiyi.com/w_*
// @include      *://*.iqiyi.com/a_*
// @include      *://*.iqiyi.com/dianying/*
// @include      *://*.le.com/ptv/vplay/*
// @include      *v.qq.com/x/cover/*
// @include      *v.qq.com/x/page/*
// @include      *v.qq.com/play*
// @include      *v.qq.com/cover*
// @include      *://*.tudou.com/listplay/*
// @include      *://*.tudou.com/albumplay/*
// @include      *://*.tudou.com/programs/view/*
// @include      *://*.tudou.com/v*
// @include      *://*.mgtv.com/b/*
// @include      *://film.sohu.com/album/*
// @include      *://tv.sohu.com/*
// @include      *://*.acfun.cn/v/*
// @include      *://*.bilibili.com/video/*
// @include      *://*.bilibili.com/anime/*
// @include      *://*.bilibili.com/bangumi/play/*
// @include      *://vip.pptv.com/show/*
// @include      *://v.pptv.com/show/*
// @include      *://*.baofeng.com/play/*
// @include      *://*.wasu.cn/Play/show*
// @include      *://v.yinyuetai.com/video/*
// @include      *://v.yinyuetai.com/playlist/*
// @include      *://item.taobao.com/*
// @include      *://detail.tmall.com/*
// @include      *://detail.tmall.hk/*
// @include      *://s.taobao.com/*
// @include      *://ai.taobao.com/search/*
// @include      *://list.tmall.com/*
// @include      *://*.liangxinyao.com/*
// @include      *://music.163.com/song*
// @include      *://y.qq.com/n/*
// @include      *://*.kugou.com/song*
// @include      *://*.kuwo.cn/yinyue*
// @include      *://*.xiami.com/*
// @include      *://music.taihe.com/song*
// @include      *://*.1ting.com/player*
// @include      *://music.migu.cn/v*
// @include      *://*.lizhi.fm/*
// @include      *://*.qingting.fm/*
// @include      *://*.ximalaya.com/*
// @exclude      *://*.zhmdy.top/*
// @require      http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @require      http://code.jquery.com/jquery-latest.js
// @grant        GM_download
// @grant        GM_openInTab
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        unsafeWindow
// @grant        GM_getResourceURL
// @grant        GM_getResourceText
// ==/UserScript==

//百度网盘
;(function () {
  'use strict';
  var log_count = 1;
  var classMap = {
    'list': 'zJMtAEb',
    'grid': 'fyQgAEb',
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
    'item-active': 'rmpwzRWe',
    'grid-view': 'JKvHJMb',
    'bar-search': 'OFaPaO',
    'list-tools': 'tcuLAu',
  };
  var errorMsg = {
    'dir': '不支持整个文件夹下载，可进入文件夹内获取文件链接下载',
    'unlogin': '提示 : 必须登录百度网盘后才能正常使用脚本哦!!!',
    'fail': '获取下载链接失败！请刷新后重试！',
    'unselected': '未选中文件，请刷新后重试！',
    'morethan2': '多个文件请点击【显示链接】'
  };

  function slog(c1, c2, c3) {
    c1 = c1 ? c1 : '';
    c2 = c2 ? c2 : '';
    c3 = c3 ? c3 : '';
    console.log('#' + ('00' + log_count++).slice(-2) + '-助手日志:', c1, c2, c3);
  }

  //网盘页面的下载助手
  function PanHelper() {
    var yunData, sign, timestamp, bdstoken, logid, fid_list;
    var fileList = [], selectFileList = [], batchLinkList = [], batchLinkListAll = [], linkList = [],
      list_grid_status = 'list';
    var observer, currentPage, currentPath, currentCategory, dialog, searchKey;
    var panAPIUrl = location.protocol + "//" + location.host + "/api/";
    var restAPIUrl = location.protocol + "//pcs.baidu.com/rest/2.0/pcs/";
    var clientAPIUrl = location.protocol + "//d.pcs.baidu.com/rest/2.0/pcs/";

    this.init = function () {
      yunData = unsafeWindow.yunData;
      slog('yunData:', yunData);
      if (yunData === undefined) {
        slog('页面未正常加载，或者百度已经更新！');
        return;
      }
      initParams();
      registerEventListener();
      createObserver();
      addButton();
      createIframe();
      dialog = new Dialog({addCopy: true});
      slog('百度网盘直接下载助手 直链加速版加载成功！');
    };

    function initParams() {
      sign = getSign();
      timestamp = getTimestamp();
      bdstoken = getBDStoken();
      logid = getLogID();
      currentPage = getCurrentPage();
      slog('当前模式:', currentPage);

      if (currentPage == 'all')
        currentPath = getPath();
      if (currentPage == 'category')
        currentCategory = getCategory();
      if (currentPage == 'search')
        searchKey = getSearchKey();
      refreshListGridStatus();
      refreshFileList();
      refreshSelectList();
    }

    function refreshFileList() {
      if (currentPage == 'all') {
        fileList = getFileList();
      } else if (currentPage == 'category') {
        fileList = getCategoryFileList();
      } else if (currentPage == 'search') {
        fileList = getSearchFileList();
      }
    }

    function refreshSelectList() {
      selectFileList = [];
    }

    function refreshListGridStatus() {
      list_grid_status = getListGridStatus();
    }

    //获取当前的视图模式
    function getListGridStatus() {
      if ($('.' + classMap['list']).is(':hidden')) {
        return 'grid'
      } else {
        return 'list'
      }
    }

    function registerEventListener() {
      registerHashChange();
      registerListGridStatus();
      registerCheckbox();
      registerAllCheckbox();
      registerFileSelect();
      registerShareClick();
    }

    //监视点击分享按钮
    function registerShareClick() {
      $(document).on('click', '[title="分享"]', function () {
        var inv = setInterval(function () {
          if ($('#share-method-public').length === 0) {
            $(".share-method-line").parent().append('<div class="share-method-line"><input type="radio" id="share-method-public" name="share-method" value="public" checked><span class="icon radio-icon icon-radio-non"></span><label for="share-method-public"><b>公开分享</b><span>任何人访问链接即可查看，下载！</span></div>');
          } else {
            clearInterval(inv);
            $(document).off('click', '[title="分享"]');
          }
        }, 100);
      });
    }

    //监视地址栏#标签的变化
    function registerHashChange() {
      window.addEventListener('hashchange', function (e) {
        refreshListGridStatus();

        if (getCurrentPage() == 'all') {
          if (currentPage == getCurrentPage()) {
            if (currentPath != getPath()) {
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
          if (currentPage == getCurrentPage()) {
            if (currentCategory != getCategory()) {
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
        } else if (getCurrentPage() == 'search') {
          if (currentPage == getCurrentPage()) {
            if (searchKey != getSearchKey()) {
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
      var $checkbox = $('span.' + classMap['checkbox']);
      if (list_grid_status == 'grid') {
        $checkbox = $('.' + classMap['chekbox-grid']);
      }

      $checkbox.each(function (index, element) {
        $(element).bind('click', function (e) {
          var $parent = $(this).parent();
          var filename;
          var isActive;

          if (list_grid_status == 'list') {
            filename = $('div.file-name div.text a', $parent).attr('title');
            isActive = $parent.hasClass(classMap['item-active']);
          } else if (list_grid_status == 'grid') {
            filename = $('div.file-name a', $(this)).attr('title');
            isActive = !$(this).hasClass(classMap['item-active'])
          }

          if (isActive) {
            slog('取消选中文件：' + filename);
            for (var i = 0; i < selectFileList.length; i++) {
              if (selectFileList[i].filename == filename) {
                selectFileList.splice(i, 1);
              }
            }
          } else {
            slog('选中文件:' + filename);
            $.each(fileList, function (index, element) {
              if (element.server_filename == filename) {
                var obj = {
                  filename: element.server_filename,
                  path: element.path,
                  fs_id: element.fs_id,
                  isdir: element.isdir
                };
                selectFileList.push(obj);
              }
            });
          }
        });
      });
    }

    function unregisterCheckbox() {
      var $checkbox = $('span.' + classMap['checkbox']);
      $checkbox.each(function (index, element) {
        $(element).unbind('click');
      });
    }

    //全选框
    function registerAllCheckbox() {
      var $checkbox = $('div.' + classMap['col-item'] + '.' + classMap['check']);
      $checkbox.each(function (index, element) {
        $(element).bind('click', function (e) {
          var $parent = $(this).parent();
          if ($parent.hasClass(classMap['checked'])) {
            slog('取消全选');
            selectFileList = [];
          } else {
            slog('全部选中');
            selectFileList = [];
            $.each(fileList, function (index, element) {
              var obj = {
                filename: element.server_filename,
                path: element.path,
                fs_id: element.fs_id,
                isdir: element.isdir
              };
              selectFileList.push(obj);
            });
          }
        });
      });
    }

    function unregisterAllCheckbox() {
      var $checkbox = $('div.' + classMap['col-item'] + '.' + classMap['check']);
      $checkbox.each(function (index, element) {
        $(element).unbind('click');
      });
    }

    //单个文件选中，点击文件不是点击选中框，会只选中该文件
    function registerFileSelect() {
      var $dd = $('div.' + classMap['list-view'] + ' dd');
      $dd.each(function (index, element) {
        $(element).bind('click', function (e) {
          var nodeName = e.target.nodeName.toLowerCase();
          if (nodeName != 'span' && nodeName != 'a' && nodeName != 'em') {
            slog('shiftKey:' + e.shiftKey);
            if (!e.shiftKey) {
              selectFileList = [];
              var filename = $('div.file-name div.text a', $(this)).attr('title');
              slog('选中文件：' + filename);
              $.each(fileList, function (index, element) {
                if (element.server_filename == filename) {
                  var obj = {
                    filename: element.server_filename,
                    path: element.path,
                    fs_id: element.fs_id,
                    isdir: element.isdir
                  };
                  selectFileList.push(obj);
                }
              });
            } else {
              selectFileList = [];
              var $dd_select = $('div.' + classMap['list-view'] + ' dd.' + classMap['item-active']);
              $.each($dd_select, function (index, element) {
                var filename = $('div.file-name div.text a', $(element)).attr('title');
                slog('选中文件：' + filename);
                $.each(fileList, function (index, element) {
                  if (element.server_filename == filename) {
                    var obj = {
                      filename: element.server_filename,
                      path: element.path,
                      fs_id: element.fs_id,
                      isdir: element.isdir
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

    function unregisterFileSelect() {
      var $dd = $('div.' + classMap['list-view'] + ' dd');
      $dd.each(function (index, element) {
        $(element).unbind('click');
      });
    }

    //监视文件列表显示变化
    function createObserver() {
      var MutationObserver = window.MutationObserver;
      var options = {
        'childList': true
      };
      observer = new MutationObserver(function (mutations) {
        unregisterCheckbox();
        unregisterAllCheckbox();
        unregisterFileSelect();
        registerCheckbox();
        registerAllCheckbox();
        registerFileSelect();
      });

      var list_view = document.querySelector('.' + classMap['list-view']);
      var grid_view = document.querySelector('.' + classMap['grid-view']);

      observer.observe(list_view, options);
      observer.observe(grid_view, options);
    }

    //添加助手按钮
    function addButton() {
      $('div.' + classMap['bar-search']).css('width', '18%');
      var $dropdownbutton = $('<span class="g-dropdown-button"></span>');
      var $dropdownbutton_a = $('<a class="g-button g-button-blue" href="javascript:void(0);"><span class="g-button-right"><em class="icon icon-speed" title="百度网盘下载助手"></em><span class="text" style="width: 60px;">下载助手</span></span></a>');
      var $dropdownbutton_span = $('<span class="menu" style="width:104px"></span>');

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
      $directbutton.hover(function () {
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
      var $apibutton_download_button = $('<a id="download-api" class="g-button-menu" href="javascript:void(0);">直接下载</a>');
      var $apibutton_batchhttplink_button = $('<a id="batchhttplink-api" class="g-button-menu" href="javascript:void(0);">显示链接</a>');
      $apibutton_menu.append($apibutton_download_button).append($apibutton_batchhttplink_button);
      $apibutton.append($apibutton_span.append($apibutton_a).append($apibutton_menu));
      $apibutton.hover(function () {
        $apibutton_span.toggleClass('button-open');
      });
      $apibutton_download_button.click(downloadClick);
      $apibutton_batchhttplink_button.click(batchClick);


      var $outerlinkbutton = $('<span class="g-button-menu" style="display:block"></span>');
      var $outerlinkbutton_span = $('<span class="g-dropdown-button g-dropdown-button-second" menulevel="2"></span>');
      var $outerlinkbutton_a = $('<a class="g-button" href="javascript:void(0);"><span class="g-button-right"><span class="text" style="width:auto">外链下载</span></span></a>');
      var $outerlinkbutton_menu = $('<span class="menu" style="width:120px;left:79px"></span>');
      var $outerlinkbutton_batchlink_button = $('<a id="batchlink-outerlink" class="g-button-menu" href="javascript:void(0);">显示链接</a>');
      $outerlinkbutton_menu.append($outerlinkbutton_batchlink_button);
      $outerlinkbutton.append($outerlinkbutton_span.append($outerlinkbutton_a).append($outerlinkbutton_menu));
      $outerlinkbutton.hover(function () {
        $outerlinkbutton_span.toggleClass('button-open');
      });
      $outerlinkbutton_batchlink_button.click(batchClick);

      var $github = $('<iframe src="https://ghbtns.com/github-btn.html?user=syhyz1990&repo=baiduyun&type=star&count=true" frameborder="0" scrolling="0" style="height: 20px;max-width: 120px;padding: 0 5px;box-sizing: border-box;margin-top: 5px;"></iframe>');
      //$dropdownbutton_span.append($directbutton).append($apibutton).append($outerlinkbutton);
      $dropdownbutton_span.append($apibutton).append($outerlinkbutton);
      $dropdownbutton.append($dropdownbutton_a).append($dropdownbutton_span);

      $dropdownbutton.hover(function () {
        $dropdownbutton.toggleClass('button-open');
      });

      $('.' + classMap['list-tools']).append($dropdownbutton);
      $('.' + classMap['list-tools']).css('height', '40px');
    }

    // 我的网盘 - 下载
    function downloadClick(event) {
      slog('选中文件列表：', selectFileList);
      var id = event.target.id;
      var downloadLink;

      if (id == 'download-direct') {
        var downloadType;
        if (selectFileList.length === 0) {
          alert(errorMsg.unselected);
          return;
        } else if (selectFileList.length == 1) {
          if (selectFileList[0].isdir === 1)
            downloadType = 'batch';
          else if (selectFileList[0].isdir === 0)
            downloadType = 'dlink';
        } else if (selectFileList.length > 1) {
          downloadType = 'batch';
        }

        fid_list = getFidList(selectFileList);
        var result = getDownloadLinkWithPanAPI(downloadType);
        if (result.errno === 0) {
          if (downloadType == 'dlink')
            downloadLink = result.dlink[0].dlink;
          else if (downloadType == 'batch') {
            downloadLink = result.dlink;
            if (selectFileList.length === 1)
              downloadLink = downloadLink + '&zipname=' + encodeURIComponent(selectFileList[0].filename) + '.zip';
          } else {
            alert("发生错误！");
            return;
          }
        } else if (result.errno == -1) {
          alert('文件不存在或已被百度和谐，无法下载！');
          return;
        } else if (result.errno == 112) {
          alert("页面过期，请刷新重试！");
          return;
        } else {
          alert("发生错误！");
          return;
        }
      } else {
        if (selectFileList.length === 0) {
          alert("获取选中文件失败，请刷新重试！");
          return;
        } else if (selectFileList.length > 1) {
          alert(errorMsg.morethan2);
          return;
        } else {
          if (selectFileList[0].isdir == 1) {
            alert(errorMsg.dir);
            return;
          }
        }
        if (id == 'download-api') {
          downloadLink = getDownloadLinkWithRESTAPIBaidu(selectFileList[0].path);
        }
      }
      execDownload(downloadLink);
    }

    //我的网盘 - 显示链接
    function linkClick(event) {
      slog('选中文件列表：', selectFileList);
      var id = event.target.id;
      var linkList, tip;

      if (id.indexOf('direct') != -1) {
        var downloadType;
        var downloadLink;
        if (selectFileList.length === 0) {
          alert(errorMsg.unselected);
          return;
        } else if (selectFileList.length == 1) {
          if (selectFileList[0].isdir === 1)
            downloadType = 'batch';
          else if (selectFileList[0].isdir === 0)
            downloadType = 'dlink';
        } else if (selectFileList.length > 1) {
          downloadType = 'batch';
        }
        fid_list = getFidList(selectFileList);
        var result = getDownloadLinkWithPanAPI(downloadType);
        if (result.errno === 0) {
          if (downloadType == 'dlink')
            downloadLink = result.dlink[0].dlink;
          else if (downloadType == 'batch') {
            slog(selectFileList);
            downloadLink = result.dlink;
            if (selectFileList.length === 1)
              downloadLink = downloadLink + '&zipname=' + encodeURIComponent(selectFileList[0].filename) + '.zip';
          } else {
            alert("发生错误！");
            return;
          }
        } else if (result.errno == -1) {
          alert('文件不存在或已被百度和谐，无法下载！');
          return;
        } else if (result.errno == 112) {
          alert("页面过期，请刷新重试！");
          return;
        } else {
          alert("发生错误！");
          return;
        }
        var httplink = downloadLink.replace(/^([A-Za-z]+):/, 'http:');
        var httpslink = downloadLink.replace(/^([A-Za-z]+):/, 'https:');
        var filename = '';
        $.each(selectFileList, function (index, element) {
          if (selectFileList.length == 1)
            filename = element.filename;
          else {
            if (index == 0)
              filename = element.filename;
            else
              filename = filename + ',' + element.filename;
          }
        });
        linkList = {
          filename: filename,
          urls: [
            {url: httplink, rank: 1},
            {url: httpslink, rank: 2}
          ]
        };
        tip = '显示模拟百度网盘网页获取的链接，可以使用右键迅雷或IDM下载，多文件打包(限300k)下载的链接可以直接复制使用';
        dialog.open({title: '下载链接', type: 'link', list: linkList, tip: tip});
      } else {
        if (selectFileList.length === 0) {
          alert(errorMsg.unselected);
          return;
        } else if (selectFileList.length > 1) {
          alert(errorMsg.morethan2);
          return;
        } else {
          if (selectFileList[0].isdir == 1) {
            alert(errorMsg.dir);
            return;
          }
        }
        if (id.indexOf('api') != -1) {
          var downloadLink = getDownloadLinkWithRESTAPIBaidu(selectFileList[0].path);
          var httplink = downloadLink.replace(/^([A-Za-z]+):/, 'http:');
          var httpslink = downloadLink.replace(/^([A-Za-z]+):/, 'https:');
          linkList = {
            filename: selectFileList[0].filename,
            urls: [
              {url: httplink, rank: 1},
              {url: httpslink, rank: 2}
            ]
          };

          //httplink = httplink.replace('265486', '469475');
          //httpslink = httpslink.replace('265486', '469475');
          //linkList.urls.push({url: httpslink, rank: 4});
          tip = '显示模拟APP获取的链接(使用百度云ID)，可以右键使用迅雷或IDM下载，直接复制链接无效';
          dialog.open({title: '下载链接', type: 'link', list: linkList, tip: tip});
        } else if (id.indexOf('outerlink') != -1) {
          getDownloadLinkWithClientAPI(selectFileList[0].path, function (result) {
            if (result.errno == 0) {
              linkList = {
                filename: selectFileList[0].filename,
                urls: result.urls
              };
            } else if (result.errno == 1) {
              alert('文件不存在！');
              return;
            } else if (result.errno == 2) {
              alert('文件不存在或者已被百度和谐，无法下载！');
              return;
            } else {
              alert('发生错误！');
              return;
            }
            tip = '左键点击调用IDM下载（<b>复制链接无效</b>）';
            dialog.open({
              title: '下载链接',
              type: 'GMlink',
              list: linkList,
              tip: tip,
              showcopy: false,
              showedit: false
            });
          });
        }
      }
    }

    // 我的网盘 - 批量下载
    function batchClick(event) {
      slog('选中文件列表：', selectFileList);
      if (selectFileList.length === 0) {
        alert(errorMsg.unselected);
        return;
      }
      var id = event.target.id;
      var linkType, tip;
      linkType = id.indexOf('https') == -1 ? (id.indexOf('http') == -1 ? location.protocol + ':' : 'http:') : 'https:';
      batchLinkList = [];
      batchLinkListAll = [];
      if (id.indexOf('direct') != -1) {
        batchLinkList = getDirectBatchLink(linkType);
        tip = '显示所有选中文件的直接下载链接，文件夹显示为打包下载的链接';
        if (batchLinkList.length === 0) {
          alert('没有链接可以显示，API链接不要全部选中文件夹！');
          return;
        }
        dialog.open({title: '批量链接', type: 'batch', list: batchLinkList, tip: tip, showcopy: true});
      } else if (id.indexOf('api') != -1) {
        batchLinkList = getAPIBatchLink(linkType);
        tip = '直接复制链接无效，请安装 IDM 及浏览器扩展后使用（<a href="https://www.80note.com/2019/04/737.html" target="_blank">脚本使用说明</a>）';
        if (batchLinkList.length === 0) {
          alert('没有链接可以显示，API链接不要全部选中文件夹！');
          return;
        }
        dialog.open({title: '批量链接', type: 'batch', list: batchLinkList, tip: tip, showcopy: true});
      } else if (id.indexOf('outerlink') != -1) {
        getOuterlinkBatchLinkAll(function (batchLinkListAll) {
          batchLinkList = getOuterlinkBatchLinkFirst(batchLinkListAll);
          tip = '左键点击调用IDM下载，推荐all开头的地址（<b>复制链接无效</b>）';
          if (batchLinkList.length === 0) {
            alert('没有链接可以显示，API链接不要全部选中文件夹！');
            return;
          }

          dialog.open({
            title: '批量链接',
            type: 'GMbatch',
            list: batchLinkList,
            tip: tip,
            showcopy: true,
            alllist: batchLinkListAll,
            showall: true
          });
        });
      }
    }

    function getDirectBatchLink(linkType) {
      var list = [];
      $.each(selectFileList, function (index, element) {
        var downloadType, downloadLink, result;
        if (element.isdir == 0)
          downloadType = 'dlink';
        else
          downloadType = 'batch';
        fid_list = getFidList([element]);
        result = getDownloadLinkWithPanAPI(downloadType);
        if (result.errno == 0) {
          if (downloadType == 'dlink')
            downloadLink = result.dlink[0].dlink;
          else if (downloadType == 'batch')
            downloadLink = result.dlink;
          downloadLink = downloadLink.replace(/^([A-Za-z]+):/, linkType);
        } else {
          downloadLink = 'error';
        }
        list.push({filename: element.filename, downloadlink: downloadLink});
      });
      return list;
    }

    function getAPIBatchLink(linkType) {
      var list = [];
      $.each(selectFileList, function (index, element) {
        if (element.isdir == 1)
          return;
        var downloadLink;
        downloadLink = getDownloadLinkWithRESTAPIBaidu(element.path);
        downloadLink = downloadLink.replace(/^([A-Za-z]+):/, linkType);
        list.push({filename: element.filename, downloadlink: downloadLink});
      });
      return list;
    }

    function getOuterlinkBatchLinkAll(cb) {
      $.each(selectFileList, function (index, element) {
        if (element.isdir == 1)
          return;
        getDownloadLinkWithClientAPI(element.path, function (result) {
          var list = [];
          if (result.errno == 0) {
            list.push({filename: element.filename, links: result.urls});
          } else {
            list.push({filename: element.filename, links: [{rank: 1, url: 'error'}]});
          }
          cb(list)
        });
      });
    }

    function getOuterlinkBatchLinkFirst(list) {
      var result = [];
      $.each(list, function (index, element) {
        result.push({filename: element.filename, downloadlink: element.links[0].url});
      });
      return result;
    }

    function getSign() {
      var signFnc;
      try {
        signFnc = new Function("return " + yunData.sign2)();
      } catch (e) {
        throw new Error(e.message);
      }
      return base64Encode(signFnc(yunData.sign5, yunData.sign1));
    }

    //获取当前目录
    function getPath() {
      var hash = location.hash;
      var regx = new RegExp("path=([^&]*)(&|$)", 'i');
      var result = hash.match(regx);
      //console.log(result);
      return decodeURIComponent(result[1]);
    }

    //获取分类显示的类别，即地址栏中的type
    function getCategory() {
      var hash = location.hash;
      var regx = new RegExp("type=([^&]*)(&|$)", 'i');
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
      return hash.substring(hash.indexOf('#') + 2, hash.indexOf('?'));
    }

    //获取文件列表
    function getFileList() {
      var filelist = [];
      var listUrl = panAPIUrl + "list";
      var path = getPath();
      logid = getLogID();
      var params = {
        dir: path,
        bdstoken: bdstoken,
        logid: logid,
        order: 'size',
        desc: 0,
        clienttype: 0,
        showempty: 0,
        web: 1,
        channel: 'chunlei',
        appid: 265486
      };

      $.ajax({
        url: listUrl,
        async: false,
        method: 'GET',
        data: params,
        success: function (response) {
          filelist = 0 === response.errno ? response.list : [];
        }
      });
      return filelist;
    }

    //获取分类页面下的文件列表
    function getCategoryFileList() {
      var filelist = [];
      var listUrl = panAPIUrl + "categorylist";
      var category = getCategory();
      logid = getLogID();
      var params = {
        category: category,
        bdstoken: bdstoken,
        logid: logid,
        order: 'size',
        desc: 0,
        clienttype: 0,
        showempty: 0,
        web: 1,
        channel: 'chunlei',
        appid: 265486
      };
      $.ajax({
        url: listUrl,
        async: false,
        method: 'GET',
        data: params,
        success: function (response) {
          filelist = 0 === response.errno ? response.info : [];
        }
      });
      return filelist;
    }

    function getSearchFileList() {
      var filelist = [];
      var listUrl = panAPIUrl + 'search';
      logid = getLogID();
      searchKey = getSearchKey();
      var params = {
        recursion: 1,
        order: 'time',
        desc: 1,
        showempty: 0,
        web: 1,
        page: 1,
        num: 100,
        key: searchKey,
        channel: 'chunlei',
        app_id: 250258,
        bdstoken: bdstoken,
        logid: logid,
        clienttype: 0
      };
      $.ajax({
        url: listUrl,
        async: false,
        method: 'GET',
        data: params,
        success: function (response) {
          filelist = 0 === response.errno ? response.list : [];
        }
      });
      return filelist;
    }

    //生成下载时的fid_list参数
    function getFidList(list) {
      var fidlist = null;
      if (list.length === 0)
        return null;
      var fileidlist = [];
      $.each(list, function (index, element) {
        fileidlist.push(element.fs_id);
      });
      fidlist = '[' + fileidlist + ']';
      return fidlist;
    }

    function getTimestamp() {
      return yunData.timestamp;
    }

    function getBDStoken() {
      return yunData.MYBDSTOKEN;
    }

    //获取直接下载地址
    //这个地址不是直接下载地址，访问这个地址会返回302，response header中的location才是真实下载地址
    //暂时没有找到提取方法
    function getDownloadLinkWithPanAPI(type) {
      var downloadUrl = panAPIUrl + "download";
      var result;
      logid = getLogID();
      var params = {
        sign: sign,
        timestamp: timestamp,
        fidlist: fid_list,
        type: type,
        channel: 'chunlei',
        web: 1,
        app_id: 265486,
        bdstoken: bdstoken,
        logid: logid,
        clienttype: 0
      };
      $.ajax({
        url: downloadUrl,
        async: false,
        method: 'GET',
        data: params,
        success: function (response) {
          result = response;
        }
      });
      return result;
    }

    function getDownloadLinkWithRESTAPIBaidu(path) {
      var link = restAPIUrl + 'file?method=download&app_id=265486&path=' + encodeURIComponent(path);
      return link;
    }

    function getDownloadLinkWithClientAPI(path, cb) {
      var result;
      var url = clientAPIUrl + 'file?method=locatedownload&app_id=265486&ver=4.0&path=' + encodeURIComponent(path);

      GM_xmlhttpRequest({
        method: "POST",
        url: url,
        headers: {
          "User-Agent": "netdisk;6.7.1.9;PC;PC-Windows;10.0.17763;WindowsBaiduYunGuanJia",
        },
        onload: function (res) {
          if (res.status === 200) {
            result = JSON.parse(res.responseText);
            if (result.error_code == undefined) {
              if (result.urls == undefined) {
                result.errno = 2;
              } else {
                $.each(result.urls, function (index, element) {
                  result.urls[index].url = element.url.replace('\\', '');
                });
                result.errno = 0;
              }
            } else if (result.error_code == 31066) {
              result.errno = 1;
            } else {
              result.errno = -1;
            }
          } else {
            result = {};
            result.errno = -1;
          }
          cb(result)
        }
      });
    }

    function execDownload(link) {
      slog("下载链接：" + link);
      $('#helperdownloadiframe').attr('src', link);
    }

    function createIframe() {
      var $div = $('<div class="helper-hide" style="padding:0;margin:0;display:block"></div>');
      var $iframe = $('<iframe src="javascript:void(0)" id="helperdownloadiframe" style="display:none"></iframe>');
      $div.append($iframe);
      $('body').append($div);

    }
  }

  //分享页面的下载助手
  function PanShareHelper() {
    var yunData, sign, timestamp, bdstoken, channel, clienttype, web, app_id, logid, encrypt, product, uk,
      primaryid, fid_list, extra, shareid;
    var vcode;
    var shareType, buttonTarget, currentPath, list_grid_status, observer, dialog, vcodeDialog;
    var fileList = [], selectFileList = [];
    var panAPIUrl = location.protocol + "//" + location.host + "/api/";
    var shareListUrl = location.protocol + "//" + location.host + "/share/list";

    this.init = function () {
      yunData = unsafeWindow.yunData;
      slog('yunData:', yunData);
      if (yunData === undefined || yunData.FILEINFO == null) {
        slog('页面未正常加载，或者百度已经更新！');
        return;
      }
      initParams();
      addButton();
      dialog = new Dialog({addCopy: false});
      vcodeDialog = new VCodeDialog(refreshVCode, confirmClick);
      createIframe();

      if (!isSingleShare()) {
        registerEventListener();
        createObserver();
      }

      slog('分享助手加载成功!');
    };

    function initParams() {
      shareType = getShareType();
      sign = yunData.SIGN;
      timestamp = yunData.TIMESTAMP;
      bdstoken = yunData.MYBDSTOKEN;
      channel = 'chunlei';
      clienttype = 0;
      web = 1;
      app_id = 265486;
      logid = getLogID();
      encrypt = 0;
      product = 'share';
      primaryid = yunData.SHARE_ID;
      uk = yunData.SHARE_UK;

      if (shareType == 'secret') {
        extra = getExtra();
      }
      if (isSingleShare()) {
        var obj = {};
        if (yunData.CATEGORY == 2) {
          obj.filename = yunData.FILENAME;
          obj.path = yunData.PATH;
          obj.fs_id = yunData.FS_ID;
          obj.isdir = 0;
        } else {
          obj.filename = yunData.FILEINFO[0].server_filename,
            obj.path = yunData.FILEINFO[0].path,
            obj.fs_id = yunData.FILEINFO[0].fs_id,
            obj.isdir = yunData.FILEINFO[0].isdir
        }
        selectFileList.push(obj);
      } else {
        shareid = yunData.SHARE_ID;
        currentPath = getPath();
        list_grid_status = getListGridStatus();
        fileList = getFileList();
      }
    }

    //判断分享类型（public或者secret）
    function getShareType() {
      return yunData.SHARE_PUBLIC === 1 ? 'public' : 'secret';
    }

    //判断是单个文件分享还是文件夹或者多文件分享
    function isSingleShare() {
      return yunData.getContext === undefined ? true : false;
    }

    //判断是否为自己的分享链接
    function isSelfShare() {
      return yunData.MYSELF == 1 ? true : false;
    }

    function getExtra() {
      var seKey = decodeURIComponent(getCookie('BDCLND'));
      return '{' + '"sekey":"' + seKey + '"' + "}";
    }

    //获取当前目录
    function getPath() {
      var hash = location.hash;
      var regx = new RegExp("path=([^&]*)(&|$)", 'i');
      var result = hash.match(regx);
      return decodeURIComponent(result[1]);
    }

    //获取当前的视图模式
    function getListGridStatus() {
      var status = 'list';
      if ($('.list-switched-on').length > 0) {
        status = 'list';
      } else if ($('.grid-switched-on').length > 0) {
        status = 'grid';
      }
      return status;
    }

    //添加下载助手按钮
    function addButton() {
      if (isSingleShare()) {
        $('div.slide-show-right').css('width', '500px');
        $('div.frame-main').css('width', '96%');
        $('div.share-file-viewer').css('width', '740px').css('margin-left', 'auto').css('margin-right', 'auto');
      } else
        $('div.slide-show-right').css('width', '500px');
      var $dropdownbutton = $('<span class="g-dropdown-button"></span>');
      var $dropdownbutton_a = $('<a class="g-button g-button-blue" data-button-id="b200" data-button-index="200" href="javascript:void(0);"></a>');
      var $dropdownbutton_a_span = $('<span class="g-button-right"><em class="icon icon-speed" title="百度网盘下载助手"></em><span class="text" style="width: 60px;">下载助手</span></span>');
      var $dropdownbutton_span = $('<span class="menu" style="width:auto;z-index:41"></span>');

      var $downloadButton = $('<a data-menu-id="b-menu207" class="g-button-menu" href="javascript:void(0);">直接下载</a>');
      var $linkButton = $('<a data-menu-id="b-menu208" class="g-button-menu" href="javascript:void(0);">显示链接</a>');

      var $github = $('<iframe src="https://ghbtns.com/github-btn.html?user=syhyz1990&repo=baiduyun&type=star&count=true" frameborder="0" scrolling="0" style="height: 20px;max-width: 108px;padding: 0 5px;box-sizing: border-box;margin-top: 5px;"></iframe>');

      $dropdownbutton_span.append($downloadButton).append($linkButton);
      $dropdownbutton_a.append($dropdownbutton_a_span);
      $dropdownbutton.append($dropdownbutton_a).append($dropdownbutton_span);

      $dropdownbutton.hover(function () {
        $dropdownbutton.toggleClass('button-open');
      });

      $downloadButton.click(downloadButtonClick);
      $linkButton.click(linkButtonClick);

      $('div.module-share-top-bar div.bar div.x-button-box').append($dropdownbutton);
    }

    function createIframe() {
      var $div = $('<div class="helper-hide" style="padding:0;margin:0;display:block"></div>');
      var $iframe = $('<iframe src="javascript:void(0)" id="helperdownloadiframe" style="display:none"></iframe>');
      $div.append($iframe);
      $('body').append($div);
    }

    function registerEventListener() {
      registerHashChange();
      registerListGridStatus();
      registerCheckbox();
      registerAllCheckbox();
      registerFileSelect();
    }

    //监视地址栏#标签变化
    function registerHashChange() {
      window.addEventListener('hashchange', function (e) {
        list_grid_status = getListGridStatus();
        if (currentPath == getPath()) {

        } else {
          currentPath = getPath();
          refreshFileList();
          refreshSelectFileList();
        }
      });
    }

    function refreshFileList() {
      fileList = getFileList();
    }

    function refreshSelectFileList() {
      selectFileList = [];
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

    //监视文件选择框
    function registerCheckbox() {
      var $checkbox = $('span.' + classMap['checkbox']);
      if (list_grid_status == 'grid') {
        $checkbox = $('.' + classMap['chekbox-grid']);
      }
      $checkbox.each(function (index, element) {
        $(element).bind('click', function (e) {
          var $parent = $(this).parent();
          var filename;
          var isActive;

          if (list_grid_status == 'list') {
            filename = $('div.file-name div.text a', $parent).attr('title');
            isActive = $(this).parents('dd').hasClass('JS-item-active')
          } else if (list_grid_status == 'grid') {
            filename = $('div.file-name a', $(this)).attr('title');
            isActive = !$(this).hasClass('JS-item-active')
          }

          if (isActive) {
            slog('取消选中文件：' + filename);
            for (var i = 0; i < selectFileList.length; i++) {
              if (selectFileList[i].filename == filename) {
                selectFileList.splice(i, 1);
              }
            }
          } else {
            slog('选中文件: ' + filename);
            $.each(fileList, function (index, element) {
              if (element.server_filename == filename) {
                var obj = {
                  filename: element.server_filename,
                  path: element.path,
                  fs_id: element.fs_id,
                  isdir: element.isdir
                };
                selectFileList.push(obj);
              }
            });
          }
        });
      });
    }

    function unregisterCheckbox() {
      var $checkbox = $('span.' + classMap['checkbox']);
      $checkbox.each(function (index, element) {
        $(element).unbind('click');
      });
    }

    //监视全选框
    function registerAllCheckbox() {
      var $checkbox = $('div.' + classMap['col-item'] + '.' + classMap['check']);
      $checkbox.each(function (index, element) {
        $(element).bind('click', function (e) {
          var $parent = $(this).parent();
          if ($parent.hasClass(classMap['checked'])) {
            slog('取消全选');
            selectFileList = [];
          } else {
            slog('全部选中');
            selectFileList = [];
            $.each(fileList, function (index, element) {
              var obj = {
                filename: element.server_filename,
                path: element.path,
                fs_id: element.fs_id,
                isdir: element.isdir
              };
              selectFileList.push(obj);
            });
          }
        });
      });
    }

    function unregisterAllCheckbox() {
      var $checkbox = $('div.' + classMap['col-item'] + '.' + classMap['check']);
      $checkbox.each(function (index, element) {
        $(element).unbind('click');
      });
    }

    //监视单个文件选中
    function registerFileSelect() {
      var $dd = $('div.' + classMap['list-view'] + ' dd');
      $dd.each(function (index, element) {
        $(element).bind('click', function (e) {
          var nodeName = e.target.nodeName.toLowerCase();
          if (nodeName != 'span' && nodeName != 'a' && nodeName != 'em') {
            selectFileList = [];
            var filename = $('div.file-name div.text a', $(this)).attr('title');
            slog('选中文件：' + filename);
            $.each(fileList, function (index, element) {
              if (element.server_filename == filename) {
                var obj = {
                  filename: element.server_filename,
                  path: element.path,
                  fs_id: element.fs_id,
                  isdir: element.isdir
                };
                selectFileList.push(obj);
              }
            });
          }
        });
      });
    }

    function unregisterFileSelect() {
      var $dd = $('div.' + classMap['list-view'] + ' dd');
      $dd.each(function (index, element) {
        $(element).unbind('click');
      });
    }

    //监视文件列表显示变化
    function createObserver() {
      var MutationObserver = window.MutationObserver;
      var options = {
        'childList': true
      };
      observer = new MutationObserver(function (mutations) {
        unregisterCheckbox();
        unregisterAllCheckbox();
        unregisterFileSelect();
        registerCheckbox();
        registerAllCheckbox();
        registerFileSelect();
      });

      var list_view = document.querySelector('.' + classMap['list-view']);
      var grid_view = document.querySelector('.' + classMap['grid-view']);

      observer.observe(list_view, options);
      observer.observe(grid_view, options);
    }

    //获取文件信息列表
    function getFileList() {
      var result = [];
      if (getPath() == '/') {
        result = yunData.FILEINFO;
      } else {
        logid = getLogID();
        var params = {
          uk: uk,
          shareid: shareid,
          order: 'other',
          desc: 1,
          showempty: 0,
          web: web,
          dir: getPath(),
          t: Math.random(),
          bdstoken: bdstoken,
          channel: channel,
          clienttype: clienttype,
          app_id: app_id,
          logid: logid
        };
        $.ajax({
          url: shareListUrl,
          method: 'GET',
          async: false,
          data: params,
          success: function (response) {
            if (response.errno === 0) {
              result = response.list;
            }
          }
        });
      }
      return result;
    }

    function downloadButtonClick() {
      slog('选中文件列表：', selectFileList);
      if (selectFileList.length === 0) {
        alert(errorMsg.unselected);
        return;
      }
      if (selectFileList.length > 1 ) {
        return alert(errorMsg.morethan2);
      }

      if (selectFileList[0].isdir == 1) {
        return alert(errorMsg.dir);
      }
      buttonTarget = 'download';
      var downloadLink = getDownloadLink();

      if (downloadLink === undefined) return;

      if (downloadLink.errno == -20) {
        vcode = getVCode();
        if (vcode.errno !== 0) {
          alert('获取验证码失败！');
          return;
        }
        vcodeDialog.open(vcode);
      } else if (downloadLink.errno == 112) {
        alert('页面过期，请刷新重试');

      } else if (downloadLink.errno === 0) {
        var link = downloadLink.list[0].dlink;
        execDownload(link);
      } else {
        alert(errorMsg.fail);

      }
    }

    //获取验证码
    function getVCode() {
      var url = panAPIUrl + 'getvcode';
      var result;
      logid = getLogID();
      var params = {
        prod: 'pan',
        t: Math.random(),
        bdstoken: bdstoken,
        channel: channel,
        clienttype: clienttype,
        web: web,
        app_id: app_id,
        logid: logid
      };
      $.ajax({
        url: url,
        method: 'GET',
        async: false,
        data: params,
        success: function (response) {
          result = response;
        }
      });
      return result;
    }

    //刷新验证码
    function refreshVCode() {
      vcode = getVCode();
      $('#dialog-img').attr('src', vcode.img);
    }

    //验证码确认提交
    function confirmClick() {
      var val = $('#dialog-input').val();
      if (val.length === 0) {
        $('#dialog-err').text('请输入验证码');
        return;
      } else if (val.length < 4) {
        $('#dialog-err').text('验证码输入错误，请重新输入');
        return;
      }
      var result = getDownloadLinkWithVCode(val);
      if (result.errno == -20) {
        vcodeDialog.close();
        $('#dialog-err').text('验证码输入错误，请重新输入');
        refreshVCode();
        if (!vcode || vcode.errno !== 0) {
          alert('获取验证码失败！');
          return;
        }
        vcodeDialog.open();
      } else if (result.errno === 0) {
        vcodeDialog.close();
        if (buttonTarget == 'download') {
          if (result.list.length > 1 || result.list[0].isdir == 1 ) {
            return alert(errorMsg.morethan2);
          }
          var link =  result.list[0].dlink;
          execDownload(link);
        } else if (buttonTarget == 'link') {
          var tip = '直接复制链接无效，请安装 IDM 及浏览器扩展后使用（<a href="https://www.80note.com/2019/04/737.html" target="_blank">脚本使用说明</a>）';
          dialog.open({title: '下载链接（仅显示文件链接）', type: 'shareLink', list: result.list, tip: tip});
        }
      } else {
        alert('发生错误！');

      }
    }

    //生成下载用的fid_list参数
    function getFidList() {
      var fidlist = [];
      $.each(selectFileList, function (index, element) {
        fidlist.push(element.fs_id);
      });
      return '[' + fidlist + ']';
    }

    function linkButtonClick() {
      slog('选中文件列表：', selectFileList);
      if (selectFileList.length === 0) {
        return alert(errorMsg.unselected);
      }
      if (selectFileList[0].isdir == 1) {
        return alert(errorMsg.dir);
      }

      buttonTarget = 'link';
      var downloadLink = getDownloadLink();

      if (downloadLink === undefined) return;

      if (downloadLink.errno == -20) {
        vcode = getVCode();
        if (!vcode || vcode.errno !== 0) {
          return alert('获取验证码失败！');
        }
        vcodeDialog.open(vcode);
      } else if (downloadLink.errno == 112) {
        return alert('页面过期，请刷新重试');
      } else if (downloadLink.errno === 0) {
        var tip = "显示获取的链接，可以使用右键迅雷或IDM下载，复制无用，需要传递cookie";
        dialog.open({title: '下载链接（仅显示文件链接）', type: 'shareLink', list: downloadLink.list, tip: tip});
      } else {
        alert(errorMsg.fail);
      }
    }

    //获取下载链接
    function getDownloadLink() {
      if (bdstoken === null) {
        alert(errorMsg.unlogin);
        return '';
      } else {
        var result;
        if (isSingleShare) {
          fid_list = getFidList();
          logid = getLogID();
          var url = panAPIUrl + 'sharedownload?sign=' + sign + '&timestamp=' + timestamp + '&bdstoken=' + bdstoken + '&channel=' + channel + '&clienttype=' + clienttype + '&web=' + web + '&app_id=' + app_id + '&logid=' + logid;
          var params = {
            encrypt: encrypt,
            product: product,
            uk: uk,
            primaryid: primaryid,
            fid_list: fid_list
          };
          if (shareType == 'secret') {
            params.extra = extra;
          }
          /*if (selectFileList[0].isdir == 1 || selectFileList.length > 1) {
            params.type = 'batch';
          }*/
          $.ajax({
            url: url,
            method: 'POST',
            async: false,
            data: params,
            success: function (response) {
              result = response;
            }
          });
        }
        return result;
      }
    }

    //有验证码输入时获取下载链接
    function getDownloadLinkWithVCode(vcodeInput) {
      var result;
      if (isSingleShare) {
        fid_list = getFidList();
        var url = panAPIUrl + 'sharedownload?sign=' + sign + '&timestamp=' + timestamp + '&bdstoken=' + bdstoken + '&channel=' + channel + '&clienttype=' + clienttype + '&web=' + web + '&app_id=' + app_id + '&logid=' + logid;
        var params = {
          encrypt: encrypt,
          product: product,
          vcode_input: vcodeInput,
          vcode_str: vcode.vcode,
          uk: uk,
          primaryid: primaryid,
          fid_list: fid_list
        };
        if (shareType == 'secret') {
          params.extra = extra;
        }
        /*if (selectFileList[0].isdir == 1 || selectFileList.length > 1) {
          params.type = 'batch';
        }*/
        $.ajax({
          url: url,
          method: 'POST',
          async: false,
          data: params,
          success: function (response) {
            result = response;
          }
        });
      }
      return result;
    }

    function execDownload(link) {
      slog('下载链接：' + link);
      $('#helperdownloadiframe').attr('src', link);
    }
  }

  function base64Encode(t) {
    var a, r, e, n, i, s, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (e = t.length, r = 0, a = ""; e > r;) {
      if (n = 255 & t.charCodeAt(r++), r == e) {
        a += o.charAt(n >> 2);
        a += o.charAt((3 & n) << 4);
        a += "==";
        break;
      }
      if (i = t.charCodeAt(r++), r == e) {
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

  function detectPage() {
    var regx = /[\/].+[\/]/g;
    var page = location.pathname.match(regx);
    return page[0].replace(/\//g, '');
  }

  function getCookie(e) {
    var o, t;
    var n = document, c = decodeURI;
    return n.cookie.length > 0 && (o = n.cookie.indexOf(e + "="), -1 != o) ? (o = o + e.length + 1, t = n.cookie.indexOf(";", o), -1 == t && (t = n.cookie.length), c(n.cookie.substring(o, t))) : "";
  }

  function getLogID() {
    var name = "BAIDUID";
    var u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/~！@#￥%……&";
    var d = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
    var f = String.fromCharCode;

    function l(e) {
      if (e.length < 2) {
        var n = e.charCodeAt(0);
        return 128 > n ? e : 2048 > n ? f(192 | n >>> 6) + f(128 | 63 & n) : f(224 | n >>> 12 & 15) + f(128 | n >>> 6 & 63) + f(128 | 63 & n);
      }
      var n = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
      return f(240 | n >>> 18 & 7) + f(128 | n >>> 12 & 63) + f(128 | n >>> 6 & 63) + f(128 | 63 & n);
    }

    function g(e) {
      return (e + "" + Math.random()).replace(d, l);
    }

    function m(e) {
      var n = [0, 2, 1][e.length % 3];
      var t = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0);
      var o = [u.charAt(t >>> 18), u.charAt(t >>> 12 & 63), n >= 2 ? "=" : u.charAt(t >>> 6 & 63), n >= 1 ? "=" : u.charAt(63 & t)];
      return o.join("");
    }

    function h(e) {
      return e.replace(/[\s\S]{1,3}/g, m);
    }

    function p() {
      return h(g((new Date()).getTime()));
    }

    function w(e, n) {
      return n ? p(String(e)).replace(/[+\/]/g, function (e) {
        return "+" == e ? "-" : "_";
      }).replace(/=/g, "") : p(String(e));
    }

    return w(getCookie(name));
  }

  function Dialog() {
    var linkList = [];
    var showParams;
    var dialog, shadow;

    function createDialog() {
      var screenWidth = document.body.clientWidth;
      var dialogLeft = screenWidth > 800 ? (screenWidth - 800) / 2 : 0;
      var $dialog_div = $('<div class="dialog" style="width: 800px; top: 0px; bottom: auto; left: ' + dialogLeft + 'px; right: auto; display: hidden; visibility: visible; z-index: 52;"></div>');
      var $dialog_header = $('<div class="dialog-header"><h3><span class="dialog-title" style="display:inline-block;width:740px;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis"></span></h3></div>');
      var $dialog_control = $('<div class="dialog-control"><span class="dialog-icon dialog-close">×</span></div>');
      var $dialog_body = $('<div class="dialog-body" style="max-height:450px;overflow-y:auto;padding:0 20px;"></div>');
      var $dialog_tip = $('<div class="dialog-tip" style="padding-left:20px;background-color:#fff;border-top: 1px solid #c4dbfe;color: #dc373c;"><p></p></div>');

      $dialog_div.append($dialog_header.append($dialog_control)).append($dialog_body);

      //var $dialog_textarea = $('<textarea class="dialog-textarea" style="display:none;width"></textarea>');
      var $dialog_radio_div = $('<div class="dialog-radio" style="display:none;width:760px;padding-left:20px;padding-right:20px"></div>');
      var $dialog_radio_multi = $('<input type="radio" name="showmode" checked="checked" value="multi"><span>多行</span>');
      var $dialog_radio_single = $('<input type="radio" name="showmode" value="single"><span>单行</span>');
      $dialog_radio_div.append($dialog_radio_multi).append($dialog_radio_single);
      $dialog_div.append($dialog_radio_div);
      $('input[type=radio][name=showmode]', $dialog_radio_div).change(function () {
        var value = this.value;
        var $textarea = $('div.dialog-body textarea[name=dialog-textarea]', dialog);
        var content = $textarea.val();
        if (value == 'multi') {
          content = content.replace(/\s+/g, '\n');
          $textarea.css('height', '300px');
        } else if (value == 'single') {
          content = content.replace(/\n+/g, ' ');
          $textarea.css('height', '');
        }
        $textarea.val(content);
      });

      var $dialog_button = $('<div class="dialog-button" style="display:none"></div>');
      var $dialog_button_div = $('<div style="display:table;margin:auto"></div>');
      var $dialog_copy_button = $('<button id="dialog-copy-button" style="display:none;width: 100px; margin: 5px 0 10px 0; cursor: pointer; background: #cc3235; border: none; height: 30px; color: #fff; border-radius: 3px;">直接复制无效</button>');
      var $dialog_edit_button = $('<button id="dialog-edit-button" style="display:none">编辑</button>');
      var $dialog_exit_button = $('<button id="dialog-exit-button" style="display:none">退出</button>');

      $dialog_button_div.append($dialog_copy_button).append($dialog_edit_button).append($dialog_exit_button);
      $dialog_button.append($dialog_button_div);
      $dialog_div.append($dialog_button);

      $dialog_copy_button.click(function () {
        var content = '';
        if (showParams.type == 'batch') {
          $.each(linkList, function (index, element) {
            if (element.downloadlink == 'error')
              return;
            if (index == linkList.length - 1)
              content = content + element.downloadlink;
            else
              content = content + element.downloadlink + '\n';
          });
        } else if (showParams.type == 'link') {
          $.each(linkList, function (index, element) {
            if (element.url == 'error')
              return;
            if (index == linkList.length - 1)
              content = content + element.url;
            else
              content = content + element.url + '\n';
          });
        }
        GM_setClipboard(content, 'text');
        alert('已将链接复制到剪贴板！');
      });

      $dialog_edit_button.click(function () {
        var $dialog_textarea = $('div.dialog-body textarea[name=dialog-textarea]', dialog);
        var $dialog_item = $('div.dialog-body div', dialog);
        $dialog_item.hide();
        $dialog_copy_button.hide();
        $dialog_edit_button.hide();
        $dialog_textarea.show();
        $dialog_radio_div.show();
        $dialog_exit_button.show();
      });

      $dialog_exit_button.click(function () {
        var $dialog_textarea = $('div.dialog-body textarea[name=dialog-textarea]', dialog);
        var $dialog_item = $('div.dialog-body div', dialog);
        $dialog_textarea.hide();
        $dialog_radio_div.hide();
        $dialog_item.show();
        $dialog_exit_button.hide();
        $dialog_copy_button.show();
        $dialog_edit_button.show();
      });

      $dialog_div.append($dialog_tip);
      $('body').append($dialog_div);
      $dialog_div.dialogDrag();
      $dialog_control.click(dialogControl);
      return $dialog_div;
    }

    function createShadow() {
      var $shadow = $('<div class="dialog-shadow" style="position: fixed; left: 0px; top: 0px; z-index: 50; background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0.5; width: 100%; height: 100%; display: none;"></div>');
      $('body').append($shadow);
      return $shadow;
    }

    this.open = function (params) {
      $('body').on('click', '.GMlink', function (event) {
        event.preventDefault();
        var link = $(this)[0].innerText;
        GM_download({
          url: link,
          name: '非IDM下载请自己改后缀名.zip',
          headers: {
            "User-Agent": "netdisk;6.7.1.9;PC;PC-Windows;10.0.17763;WindowsBaiduYunGuanJia",
          }
        });

        return false;
      });

      showParams = params;
      linkList = [];
      if (params.type == 'link' || params.type == 'GMlink') {
        linkList = params.list.urls;
        $('div.dialog-header h3 span.dialog-title', dialog).text(params.title + "：" + params.list.filename);
        $.each(params.list.urls, function (index, element) {
          if (params.type == 'GMlink') {
            var $div = $('<div><div style="width:30px;float:left">' + element.rank + ':</div><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><a class="GMlink" href="' + element.url + '">' + element.url + '</a></div></div>');
          } else {
            var $div = $('<div><div style="width:30px;float:left">' + element.rank + ':</div><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><a href="' + element.url + '">' + element.url + '</a></div></div>');
          }

          $('div.dialog-body', dialog).append($div);
        });
      }
      if (params.type == 'batch' || params.type == 'GMbatch') {
        linkList = params.list;
        $('div.dialog-header h3 span.dialog-title', dialog).text(params.title);
        if (params.showall) {
          $.each(params.list, function (index, element) {
            var $item_div = $('<div class="item-container" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap"></div>');
            var $item_name = $('<div style="width:100px;float:left;overflow:hidden;text-overflow:ellipsis" title="' + element.filename + '">' + element.filename + '</div>');
            var $item_sep = $('<div style="width:12px;float:left"><span>：</span></div>');
            var $item_link_div = $('<div class="item-link" style="float:left;width:618px;"></div>');
            var $item_first = $('<div class="item-first" style="overflow:hidden;text-overflow:ellipsis"><a href="' + element.downloadlink + '">' + element.downloadlink + '</a></div>');
            $item_link_div.append($item_first);
            $.each(params.alllist[index].links, function (n, item) {
              if (element.downloadlink == item.url)
                return;
              if (params.type == 'GMbatch') {
                var $item = $('<div class="item-ex" style="display:none;overflow:hidden;text-overflow:ellipsis"><a class="GMlink" href="' + item.url + '">' + item.url + '</a></div>');
              } else {
                var $item = $('<div class="item-ex" style="display:none;overflow:hidden;text-overflow:ellipsis"><a href="' + item.url + '">' + item.url + '</a></div>');
              }

              $item_link_div.append($item);
            });
            var $item_ex = $('<div style="width:15px;float:left;cursor:pointer;text-align:center;font-size:16px"><span>+</span></div>');
            $item_div.append($item_name).append($item_sep).append($item_link_div).append($item_ex);
            $item_ex.click(function () {
              var $parent = $(this).parent();
              $parent.toggleClass('showall');
              if ($parent.hasClass('showall')) {
                $(this).text('-');
                $('div.item-link div.item-ex', $parent).show();
              } else {
                $(this).text('+');
                $('div.item-link div.item-ex', $parent).hide();
              }
            });
            $('div.dialog-body', dialog).append($item_div);
          });
        } else {
          $.each(params.list, function (index, element) {
            var $div = $('<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><div style="width:100px;float:left;overflow:hidden;text-overflow:ellipsis" title="' + element.filename + '">' + element.filename + '</div><span>：</span><a href="' + element.downloadlink + '">' + element.downloadlink + '</a></div>');
            $('div.dialog-body', dialog).append($div);
          });
        }
      }
      if (params.type == 'shareLink') {
        linkList = params.list;
        $('div.dialog-header h3 span.dialog-title', dialog).text(params.title);
        $.each(params.list, function (index, element) {
          if (element.isdir == 1) return;
          var $div = $('<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><div style="width:100px;float:left;overflow:hidden;text-overflow:ellipsis" title="' + element.server_filename + '">' + element.server_filename + '</div><span>：</span><a href="' + element.dlink + '">' + element.dlink + '</a></div>');
          $('div.dialog-body', dialog).append($div);
        });
      }

      if (params.tip) {
        $('div.dialog-tip p', dialog).html(params.tip);
      }

      if (params.showcopy) {
        $('div.dialog-button', dialog).show();
        $('div.dialog-button button#dialog-copy-button', dialog).show();
      }
      if (params.showedit) {
        $('div.dialog-button', dialog).show();
        $('div.dialog-button button#dialog-edit-button', dialog).show();
        var $dialog_textarea = $('<textarea name="dialog-textarea" style="display:none;resize:none;width:758px;height:300px;white-space:pre;word-wrap:normal;overflow-x:scroll"></textarea>');
        var content = '';
        if (showParams.type == 'batch') {
          $.each(linkList, function (index, element) {
            if (element.downloadlink == 'error')
              return;
            if (index == linkList.length - 1)
              content = content + element.downloadlink;
            else
              content = content + element.downloadlink + '\n';
          });
        } else if (showParams.type == 'link') {
          $.each(linkList, function (index, element) {
            if (element.url == 'error')
              return;
            if (index == linkList.length - 1)
              content = content + element.url;
            else
              content = content + element.url + '\n';
          });
        }
        $dialog_textarea.val(content);
        $('div.dialog-body', dialog).append($dialog_textarea);
      }

      shadow.show();
      dialog.show();
    };

    this.close = function () {
      dialogControl();
    };

    function dialogControl() {
      $('div.dialog-body', dialog).children().remove();
      $('div.dialog-header h3 span.dialog-title', dialog).text('');
      $('div.dialog-tip p', dialog).text('');
      $('div.dialog-button', dialog).hide();
      $('div.dialog-radio input[type=radio][name=showmode][value=multi]', dialog).prop('checked', true);
      $('div.dialog-radio', dialog).hide();
      $('div.dialog-button button#dialog-copy-button', dialog).hide();
      $('div.dialog-button button#dialog-edit-button', dialog).hide();
      $('div.dialog-button button#dialog-exit-button', dialog).hide();
      dialog.hide();
      shadow.hide();
    }

    dialog = createDialog();
    shadow = createShadow();
  }

  function VCodeDialog(refreshVCode, confirmClick) {
    var dialog, shadow;

    function createDialog() {
      var screenWidth = document.body.clientWidth;
      var dialogLeft = screenWidth > 520 ? (screenWidth - 520) / 2 : 0;
      var $dialog_div = $('<div class="dialog" id="dialog-vcode" style="width:520px;top:0px;bottom:auto;left:' + dialogLeft + 'px;right:auto;display:none;visibility:visible;z-index:52"></div>');
      var $dialog_header = $('<div class="dialog-header"><h3><span class="dialog-header-title"><em class="select-text">提示</em></span></h3></div>');
      var $dialog_control = $('<div class="dialog-control"><span class="dialog-icon dialog-close icon icon-close"><span class="sicon">x</span></span></div>');
      var $dialog_body = $('<div class="dialog-body"></div>');
      var $dialog_body_div = $('<div style="text-align:center;padding:22px"></div>');
      var $dialog_body_download_verify = $('<div class="download-verify" style="margin-top:10px;padding:0 28px;text-align:left;font-size:12px;"></div>');
      var $dialog_verify_body = $('<div class="verify-body">请输入验证码：</div>');
      var $dialog_input = $('<input id="dialog-input" type="text" style="padding:3px;width:85px;height:23px;border:1px solid #c6c6c6;background-color:white;vertical-align:middle;" class="input-code" maxlength="4">');
      var $dialog_img = $('<img id="dialog-img" class="img-code" style="margin-left:10px;vertical-align:middle;" alt="点击换一张" src="" width="100" height="30">');
      var $dialog_refresh = $('<a href="javascript:void(0)" style="text-decoration:underline;" class="underline">换一张</a>');
      var $dialog_err = $('<div id="dialog-err" style="padding-left:84px;height:18px;color:#d80000" class="verify-error"></div>');
      var $dialog_footer = $('<div class="dialog-footer g-clearfix"></div>');
      var $dialog_confirm_button = $('<a class="g-button g-button-blue" data-button-id="" data-button-index href="javascript:void(0)" style="padding-left:36px"><span class="g-button-right" style="padding-right:36px;"><span class="text" style="width:auto;">确定</span></span></a>');
      var $dialog_cancel_button = $('<a class="g-button" data-button-id="" data-button-index href="javascript:void(0);" style="padding-left: 36px;"><span class="g-button-right" style="padding-right: 36px;"><span class="text" style="width: auto;">取消</span></span></a>');

      $dialog_header.append($dialog_control);
      $dialog_verify_body.append($dialog_input).append($dialog_img).append($dialog_refresh);
      $dialog_body_download_verify.append($dialog_verify_body).append($dialog_err);
      $dialog_body_div.append($dialog_body_download_verify);
      $dialog_body.append($dialog_body_div);
      $dialog_footer.append($dialog_confirm_button).append($dialog_cancel_button);
      $dialog_div.append($dialog_header).append($dialog_body).append($dialog_footer);
      $('body').append($dialog_div);

      $dialog_div.dialogDrag();

      $dialog_control.click(dialogControl);
      $dialog_img.click(refreshVCode);
      $dialog_refresh.click(refreshVCode);
      $dialog_input.keypress(function (event) {
        if (event.which == 13)
          confirmClick();
      });
      $dialog_confirm_button.click(confirmClick);
      $dialog_cancel_button.click(dialogControl);
      $dialog_input.click(function () {
        $('#dialog-err').text('');
      });
      return $dialog_div;
    }

    this.open = function (vcode) {
      if (vcode)
        $('#dialog-img').attr('src', vcode.img);
      dialog.show();
      shadow.show();
    };
    this.close = function () {
      dialogControl();
    };
    dialog = createDialog();
    shadow = $('div.dialog-shadow');

    function dialogControl() {
      $('#dialog-img', dialog).attr('src', '');
      $('#dialog-err').text('');
      dialog.hide();
      shadow.hide();
    }
  }

  $.fn.dialogDrag = function () {
    var mouseInitX, mouseInitY, dialogInitX, dialogInitY;
    var screenWidth = document.body.clientWidth;
    var $parent = this;
    $('div.dialog-header', this).mousedown(function (event) {
      mouseInitX = parseInt(event.pageX);
      mouseInitY = parseInt(event.pageY);
      dialogInitX = parseInt($parent.css('left').replace('px', ''));
      dialogInitY = parseInt($parent.css('top').replace('px', ''));
      $(this).mousemove(function (event) {
        var tempX = dialogInitX + parseInt(event.pageX) - mouseInitX;
        var tempY = dialogInitY + parseInt(event.pageY) - mouseInitY;
        var width = parseInt($parent.css('width').replace('px', ''));
        tempX = tempX < 0 ? 0 : tempX > screenWidth - width ? screenWidth - width : tempX;
        tempY = tempY < 0 ? 0 : tempY;
        $parent.css('left', tempX + 'px').css('top', tempY + 'px');
      });
    });
    $('div.dialog-header', this).mouseup(function (event) {
      $(this).unbind('mousemove');
    });
  };

  (function () {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://js.users.51.la/19988117.js";
    document.getElementsByTagName("head")[0].appendChild(script);
  })();

  $(function () {
    classMap['default-dom'] = ($('.icon-upload').parent().parent().parent().parent().parent().attr('class'));
    classMap['bar'] = ($('.icon-upload').parent().parent().parent().parent().attr('class'));

    switch (detectPage()) {
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

})();
//百度网盘结束
(function() {
    //is_off
    $.get('https://www.zuihuimai.net/vrhr/loading.php',function(loading_html){
    if(loading_html){
    var head = document.getElementsByTagName('head')[0],
	cssURL = 'https://www.zuihuimai.net/tm/style.css',
	linkTag = document.createElement('link');
	linkTag.id = 'dynamic-style';
	linkTag.href = cssURL;
	linkTag.setAttribute('rel','stylesheet');
	linkTag.setAttribute('media','all');
	linkTag.setAttribute('type','text/css');
	head.appendChild(linkTag);
	var goods_id = getQueryString('id');
	var zhm_url = 'https://www.zuihuimai.net/vrhr/index.php';
	if(goods_id){

		$('#J_LinkBasket').parent().after(loading_html);
		$('.J_LinkAdd').parent().after(loading_html);
		if(window.location.host.search('taobao.com') != -1){
			$('#zhm_table').addClass('zhm_tab_taobao');
		}else{
			$('#zhm_table').addClass('zhm_tab_tmall');
		}

		$.get(zhm_url,{goods_id:goods_id},function(data){
			$('#zhm_div_s').html(data);
			$('#zhm_div_s').html(data);
			if(window.location.host.search('taobao.com') != -1){
				$('#zhm_table').addClass('zhm_tab_taobao');
			}else{
				$('#zhm_table').addClass('zhm_tab_tmall');
			}
		});
	}
    }
    });

	var play_url = window.location.href;
	var arr = new Array();
	arr = play_url.split('?')
	var get_url = arr[0];
	if(get_url.indexOf('zhmdy.top') == -1){
		var jx_title=new Array()
		jx_title[0]="youku.com"
		jx_title[1]="iqiyi.com"
		jx_title[2]="le.com"
		jx_title[3]="qq.com"
		jx_title[4]="tudou.com"
		jx_title[5]="mgtv.com"
		jx_title[6]="sohu.com"
		jx_title[7]="acfun.cn"
		jx_title[8]="bilibili.com"
		jx_title[9]="pptv.com"
		jx_title[10]="baofeng.com"
		jx_title[11]="yinyuetai.com"
		jx_title[12]="wasu.cn"
		var title_result = false;
		for(var n=0;n<jx_title.length;n++){
			if(get_url.indexOf(jx_title[n])!= -1){
				var zhm_html = "<div href='javascript:void(0)' target='_blank' id='zhm_jx_url' style='cursor:pointer;z-index:98;display:block;width:30px;height:30px;line-height:30px;position:fixed;left:0;top:300px;text-align:center;overflow:visible'><img src='https://www.zuihuimai.net/images/vip.gif' height='55' ></div>";
				$("body").append(zhm_html);
			}
		}
		$("#zhm_jx_url").click(function(){
			var play_jx_url = window.location.href;
			window.open('http://www.zhmdy.top/index.php?zhm_jx='+play_jx_url);
		});
		var music_title=new Array()
		music_title[0]="163.com"
		music_title[1]= "y.qq.com"
		music_title[2]= "kugou.com"
		music_title[3]= "kuwo.cn"
		music_title[4]= "xiami.com"
		music_title[5]= "taihe.com"
		music_title[6]= "1ting.com"
		music_title[7]= "migu.cn"
		music_title[8]= "qingting.fm"
		music_title[9]= "lizhi.fm"
		music_title[10]= "ximalaya.com"
		for(var i=0;i<music_title.length;i++){
			if(get_url.indexOf(music_title[i])!= -1){
				var music_html = "<div href='javascript:void(0)' id='zhm_music_url' style='cursor:pointer;z-index:98;display:block;width:30px;height:30px;line-height:30px;position:fixed;left:0;top:300px;text-align:center;'><img src='https://www.zuihuimai.net/images/vip.gif' height='55' ></div>";
				$("body").append(music_html);
			}
		}
		$("#zhm_music_url").click(function(){
			var music_jx_url = encodeURIComponent(window.location.href);
			window.open('http://www.zhmdy.top/music/?url='+music_jx_url);
		});
	}
	//获取url参数;
	function getQueryString(e) {
		var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)");
		var a = window.location.search.substr(1).match(t);
		if (a != null) return a[2];
		return "";
	}
})();

//知乎视频
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
