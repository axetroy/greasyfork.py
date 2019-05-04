// ==UserScript==
// @name        115批量文件迅雷下载(修复无法复制)
// @namespace   mysql9
// @include     http://115.com/*
// @version     1.1.0
// @run-at      document-end
// @grant       none
// @description 支持迅雷批量下载，支持浏览器单条下载，可以批量复制到迅雷，免VIP，免115浏览器
// ==/UserScript==

// 加载迅雷JS库
(function(){
    var getScriptSync = function(url) {
        $.ajax({
            url: url,
            async: false,
            dataType: "script"
        });
    };
    getScriptSync('http://pstatic.xunlei.com/js/webThunderDetect.js');
    getScriptSync('http://pstatic.xunlei.com/js/base64.js');
    getScriptSync('http://pstatic.xunlei.com/js/thunderBatch.js');
})();
// 存放URL列表及相关维护操作
Core.FileAPI.thunder_urls = new Array();
Core.FileAPI.thunder_table = null;
Core.FileAPI.thunderClear = function() {
    var len = this.thunder_urls.length;
    this.thunder_urls.splice(0,len);
    this.thunder_table = null;
};
// 更新窗口URL列表
Core.FileAPI.thunderUpdateTable = function(r) {
    if (this.thunder_table) {
        var row = this.thunder_table.insertRow();
        row.style["white-space"]="nowrap"; // 内容水平展开，不自动换行
        var cell = row.insertCell(); cell.align = "left"; cell.innerHTML = '<div style="width:200px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"><a title="'+r.file_name+'">'+r.file_name+'</a></div>';
        var cell = row.insertCell(); cell.align = "left"; cell.innerHTML = ": ";
        var cell = row.insertCell(); cell.align = "left"; cell.innerHTML = '<div style="width:730px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"><a href="'+r.file_url+'"><font color="blue">'+r.file_url+'</font></a></div>';
    }
};
Core.FileAPI.thunderPushURL = function(url) {
    this.thunder_urls.push(url);
};
// 启动下载
Core.FileAPI.thunderLaunch = function() {
    var len = this.thunder_urls.length;
    if (0 >= len) {
        alert("URL列表为空。。");
        return;
    }
    var urls = this.thunder_urls;
    var pid = 66666;                  // 迅雷合作ID（随意）
    BatchTasker.BeginBatch(4,pid);    //开始批量添加
    for (var i = 0; i < len; i++) {
        BatchTasker.AddTask(ThunderEncode(urls[i].file_url), urls[i].file_name);    //添加下载任务
    }
    BatchTasker.EndBatch(pid);
    //alert("URL: "+len);
};
// 批量复制链接
Core.FileAPI.thunderCopyToClipboard = function() {
    var len = this.thunder_urls.length;
    if (0 >= len) {
        alert("URL列表为空。。");
        return;
    }
    var urls = this.thunder_urls;
    var urls_content = '';
    for (var i = 0; i < urls.length; i++) {
        urls_content += urls[i].file_url+'\r\n';
    }
    var url_clipboard = document.getElementById('ID_url_clip');
    url_clipboard.innerHTML = urls_content;
    // 选取并复制URLs
    $(url_clipboard).focus();
    $(url_clipboard).select();
    document.execCommand('copy', false, "");
    alert("成功复制 "+urls.length+" 个链接到剪贴板！");
};

Core.FileAPI.thundergoto = function() {
    var tempform = document.createElement("form");
    tempform.action = "http://www.oa84.com/cili/";
    tempform.method = "POST";
    tempform.style.display="none";
    tempform.target = "_blank";
    var opt = document.createElement("input");
    opt.type = "submit";
    tempform.appendChild(opt);
    document.body.appendChild(tempform);
    tempform.submit();
    document.body.removeChild(tempform);

};

// 显示下载窗口
Core.FileAPI.thunderShowPage = function() {
    var stylePatcher = function(obj, attr_nm, attr_vl) {
        for (var i = 0; i < attr_nm.length; i++) {
        obj.style[attr_nm[i]] = attr_vl[i];
    }
    };
    // 子窗口
    var url_wdw = document.createElement('div'); url_wdw.id = "ID_url_wdw";
    url_wdw.className = 'dialog-box dialog-mini easy-download window-current';
    stylePatcher(url_wdw, 
        ['z-index', 'width', 'position', 'top', 'left'],
        ['1000000002', '530px', 'fixed', '56px', '418px']);
    document.body.appendChild(url_wdw);
    // 构建列表页面
    var html = [];
    html.push('<div class="dialog-box dialog-mini easy-download window-current" style="z-index: 1000000002; '
                    +'width: 970px; position: fixed; top: 56px; left:50%;margin-left:-485px;">');
    html.push('<div class="dialog-header" rel="title_box" ws_property="1" style="background-color:#ccc;"><h3 rel="base_title">迅雷批量下载</h3></div>');
    html.push('<div class="dialog-handle"><a href="javascript:;" class="close" id="ID_thunder_close">关闭</a></div>');
    html.push('<textarea id="ID_url_clip" style="width:900px;height:1px;border-style:none;"></textarea>');
    html.push('<div rel="base_content"><div class="dialog-frame" style="height:240px; overflow-y:scroll;">'
                +'<table id="ID_thunderTable" style="height:auto;" border="0" cellspacing="2"></table>');
    html.push('</div><div><a href="javascript:;" class="button btn-green" style="width:33.33%; padding:unset" onclick="Core.FileAPI.thunderLaunch()">'
                    +'<i class="icon ico-normal"></i><em>开始下载</em></a>'
                    +'<a href="javascript:;" class="button btn-orange" style="width:33.33%; padding:unset;background-color:orange;" onclick="Core.FileAPI.thundergoto()">'
                    +'<i class="icon ico-normal"></i><em>巴士磁力搜索</em></a>'
                    +'<a href="javascript:;" class="button btn-blue" style="width:33.33%; padding:unset" onclick="Core.FileAPI.thunderCopyToClipboard()">'
                    +'<i class="icon ico-normal"></i><em>复制链接</em></a></div></div></div>');
    url_wdw.innerHTML = (function(){
        var res = '';
        for (var i = 0; i < html.length; i++) {
            res += html[i];
        }
        return res;
    })();
    // 获取列表Table
    this.thunder_table = document.getElementById('ID_thunderTable');
    // 背景蒙版
    var bk_mask = document.createElement('div'); bk_mask.id = "ID_bk_mask";
    stylePatcher(bk_mask, 
        ['z-index', 'background', 'height', 'left', 'position', 'top', 'width', 'opacity'],
        ['1000000001', 'rgb(0, 0, 0)', '100%', '0px', 'fixed', '0px', '100%', '0.4']);
    document.body.appendChild(bk_mask);
    var bk_mask_inner = document.createElement('div');
    stylePatcher(bk_mask_inner,
        ['height', 'width'],
        ['100%', '100%']);
    bk_mask.appendChild(bk_mask_inner);
    // 设置关闭窗口按钮事件
    var btn_close = document.getElementById('ID_thunder_close');
    btn_close.onclick = Function('(function(){document.body.removeChild(document.getElementById("ID_bk_mask"));'
                                            +'document.body.removeChild(document.getElementById("ID_url_wdw"))})()');
};


// 替换原函数，直接根据pickcode请求资源URL
Core.FileAPI.Download = function (pick_code, win) {
    var _ = function () {
        UA$.ajax({
            url: 'files/download?pickcode=' + pick_code,
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function (r) {
                //alert("URL: "+r.file_url);
                Core.FileAPI.thunderPushURL(r);
                Core.FileAPI.thunderUpdateTable(r);
            }
        });
    };
    _();
    return;
};

// 替换原函数，对所有选中的文件（不含文件夹）进行URL获取
Core.FileAPI.DownloadSomeFile = function (list) {
    if (!list.length) {
        Core.MinMessage.Show({
            text: '请选择文件',
            type: 'war',
            timeout: 2000
        });
        return;
    }
    var check_type = function(list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].attr('file_type') != '1') {
                return false;
            }
        }
        return true;
    };
    if (check_type(list)) {
        this.thunderClear();
        this.thunderShowPage();
        for (var i = 0; i < list.length; i++) {
            Core.FileAPI.Download(list[i].attr('pick_code'));
        }
    } else {
        if ('DownFile' in Core) {
            Core.DownFile.Go(list);
            return false;
        }
    }
};