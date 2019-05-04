// ==UserScript==
// @name         仓库用度盘投稿助手
// @namespace    moe.jixun.dupan.galacg
// @version      1.1.13
// @description  简易功能增强, 方便仓库投稿用
// @author       Jixun<https://jixun.moe/>
// @include      http://pan.baidu.com/disk/home*
// @include      http://yun.baidu.com/disk/home*
// @include      https://pan.baidu.com/disk/home*
// @include      https://yun.baidu.com/disk/home*

// @grant        none
// @run-at       document-start

// The following thrid party scripts will be injected to the page:
// https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.js

// ==/UserScript==
(function() {
  const INFO = '[仓库助手插件]';

  var oRequire;
  if (window.require) {
    console.warn("%s 覆盖方式安装，若无效请强制刷新。", INFO);
    oRequire = window.require;
    window.require = fakeRequire;
    Object.assign(fakeRequire, oRequire);
  } else {
    console.info("%s 钩子方式安装，若失效请报告。", INFO);
    Object.defineProperty(window, 'require', {
      set: function (require) {
        oRequire = require;
      },
      get: function () {
        return fakeRequire;
      }
    });
  }

  const __AppId = 250528;
  const pluginBlacklist = ['右上角广告位', '网盘APP下载', '满减活动', '会员提醒'];
  var _G = {};

  function fakeRequire(module) {
    // console.info('%s Load module: %s', INFO, module);
    if (module == 'disk-system:widget/pageModule/list/listMenu.js') {
      if (!_G.injected) {
        initScript();
        _G.injected = true;
      }
    } else if (module == 'system-core:pluginControl/register/register.js') {
        if (!_G.btnInjected) {
            registerPlugin();
            _G.btnInjected = true;
        }
    }
    return oRequire.apply(this, arguments);
  }

  function menuInsertAfter(list, name, item, noPush) {
    for (var i = 0; i < list.length; i++) {
      if (list[i] instanceof Array) {
        if (menuInsertAfter(list[i], name, item, true)) {
          return;
        }
      } else if (list[i].title === name) {
        i++;
        list.splice(i, i, item);
        return true;
      }
    }

    if (!noPush) list.push(item);
  }

  function initScript() {
    // Load module
    _G.FaceData = oRequire('system-core:data/faceData.js');
    _G.ListInit = oRequire("disk-system:widget/pageModule/list/listInit.js");

    var fileCtxMenu = _G.FaceData.getData().contextMenu.file;
    menuInsertAfter(fileCtxMenu, '分享', {
      index: 8,
      keyboard: 'u',
      title: '自定义分享',
      display: isFileChecked,
      action: lazyDialog('loadCustomShareDialog')
    });

    fileCtxMenu.forEach(m => {
      if (m.index >= 2) {
        m.index++;
      }
    });

    fileCtxMenu.push({
      index: 2, // '删除' 的 index。
      keyboard: 'r',
      position: 'bottom',
      title: '批量重命名',
      display: isFileChecked,
      action: lazyDialog('loadBatchRenameDialog')
    });

    setTimeout(delayLoad, 200);
    delayLoadDuCode();

    // ESC 将关闭所有漂浮窗口
    document.addEventListener('keyup', function(e) {
      if (e.keyCode == 0x1b) {
        $('.dialog-close').click();
      }
    }, false);
  }

  function registerPlugin() {
    window.define('function-widget:jixun/standard-code.js', function(require, exports, module) {
      exports.start = lazyDialog('loadStandardCodeDialog');
    });

    window.manifest = window.manifest.filter(plugin => pluginBlacklist.indexOf(plugin.name) === -1);

    window.manifest.push({
      "name": "标准提取码插件",
      "group": "moe.jixun.code",
      "version": '1.0',
      "type": "1",
      "description": "类似于 115 的标准提取码",
      "filesType": "*",
      "buttons": [{
        "index": 2,
        "disabled": "none",
        "title": "标准提取码",
        "buttonStyle": "normal",
        "pluginId": "JIXUNSTDCODE",
        "position": 'tools'
      }],
      "preload": false,
      "depsFiles": [],
      "entranceFile": "function-widget:jixun/standard-code.js",
      "pluginId": "JIXUNSTDCODE"
    });
  }

  function isFileChecked() {
    return _G.ListInit.getCheckedItems().length > 0;
  }

  function lazyDialog(name) {
    return function() {
      if (_G[name]) {
        _G[name]();
      } else {
        loadDependencies();
        _G.Tip.show({
          mode: 'loading',
          msg: '正在努力加载中 ...'
        });
      }
    };
  }

  function nextId() {
    if (!nextId.id) nextId.id = 0;
    return nextId.id++;
  }

  function confirmDialog(data) {
    loadDependencies();

    var dialog;
    var dialogData = {
      id: "confirm-" + nextId(),
      show: true,
      title: data.title,
      body: $('<div style="text-align:center; padding:22px;">').append(data.body),
      buttons: [{
        name: "confirm",
        title: data.sureText || "确定",
        type: "big",
        color: "blue",
        padding: ["50px", "50px"],
        click: function() {
          if ($.isFunction(data.onSure)) {
            data.onSure.apply(this, arguments);
          } else {
            dialog.hide();
          }
        }
      }, {
        name: "cancel",
        title: data.cancelText || "取消",
        type: "big",
        padding: ["50px", "50px"],
        click: function() {
          if ($.isFunction(data.onCancel)) {
            data.onCancel.apply(this, arguments);
          } else {
            dialog.hide();
          }
        }
      }]
    };
    dialog = new _G.Dialog(dialogData);
    return dialog;
  }

  function delayLoad() {
    _G.loadCustomShareDialog = (function() {
      var _tplCustomShare = `
        <div>
          <p>请输入提取码:  <input id="jx_shareKey" class="jx-input" style="width: 6em" /></p>
          <p id="jx_errmsg" class="jx_c_warn jx_hide">无效的提取码, 脚本将随机生成一个分享代码 :&lt;</p>
        </div>
        <div class="jx_hide">
          <p>分享地址: <input id="jx_shortUrl" class="jx-input" style="width: 20em" readonly /></p>
          <p>提取码: <input id="jx_shareCode" class="jx-input" style="width: 5em; text-align: center" readonly /></p>

          <p style="text-align: left">投稿代码:<br /><textarea readonly id="jx_dlboxCode" class="jx jx-input"></textarea></p>
        </div>
      `;

      var dialog, $footer, $key, $tplCustomShare;

      function showDialog() {
        $tplCustomShare = $(_tplCustomShare);
        dialog = confirmDialog({
          title: '自定义分享',
          body: $tplCustomShare,
          onSure: function() {
            handleConfirm();
            dialog.hide();
          },
          onCancel: function() {
            dialog.hide();
          },
        });

        $footer = dialog.$dialog.find(_G.Dialog.QUERY.dialogFooter);

        $key = $('#jx_shareKey', $tplCustomShare)
          .blur(function() {
            if (!isCodeValid(this.value = this.value.trim())) {
              $('#jx_errmsg', $tplCustomShare)
                .removeClass('jx_hide');
            }
          })
          .focus(function() {
            $('#jx_errmsg', $tplCustomShare)
              .addClass('jx_hide');
          })
          .val(genKey(4));
      }

      function handleConfirm() {
        var key = $key.val();
        if (!isCodeValid(key)) {
          key = genKey(4);
          $key.val(key);
        }

        _G.Tip.show({
          mode: 'loading',
          msg: '正在分享，请稍后 ...',
          autoClose: false
        });

        var sharedItems = _G.ListInit.getCheckedItems();
        $.ajax({
          url: '/share/set?' + $.param({
            channel: 'chunlei',
            bdstoken: yunData.MYBDSTOKEN,
            app_id: __AppId
          }),
          type: 'POST',
          data: {
            fid_list: JSON.stringify(sharedItems.map(getFileId)),
            schannel: 4,
            channel_list: '[]',
            pwd: key
          },
          dataType: 'json'
        }).success(function(r) {
          _G.Tip.hide();

          _G.Tip.show({
            mode: 'success',
            msg: '分享成功!'
          });

          $footer.children('.g-button-blue-large').hide();
          $footer.children('.g-button-large').find('.text').text('关闭');

          let url = r.shorturl ? `${r.shorturl}#${key}` : '很抱歉, 分享失败 :<';
          $('#jx_shortUrl', $tplCustomShare).val(url);
          $('#jx_shareCode', $tplCustomShare).val(key);

          $tplCustomShare.toggleClass('jx_hide');

          var title = fixCode(sharedItems[0].server_filename) + (sharedItems.length == 1 ? '' : ' 等文件');

          $('#jx_dlboxCode', $tplCustomShare).val(
            `[dlbox title="${title}" from="浩瀚的宇宙" time="${makeDate(new Date())}" info="提取：${key}" link1="度娘|${url}"][/dlbox]]`
          );

          dialog.show();
        }).fail(function() {
          _G.Tip.hide();

          _G.Tip.show({
            mode: 'failure',
            msg: '网络错误，请稍后重试。'
          });
        });
      }

      /* 依赖函数表 */
      function isCodeValid(code) {
        return encodeURIComponent(code).replace(/%[A-F\d]{2}/g, '-').length == 4;
      }

      function fixCode(code) {
        return code.replace(/"/g, '&#x22;').replace(/\]/g, '&#x5D;');
      }

      function fixWidthDigits(d) {
        return ('0' + d.toString()).slice(-2);
      }

      function makeDate(d) {
        return `${d.getFullYear()}.${fixWidthDigits(d.getMonth() + 1)}.${fixWidthDigits(d.getDate())}`;
      }

      function genKey(size) {
        // length => 26 + 10, 36
        var keySet = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = (size || 4) | 0, r = ''; i--;)
          r += keySet[0 | (Math.random() * 36)];

        return r;
      }

      function getFileId(item) {
        return item.fs_id;
      }

      /* 收尾 */
      return showDialog;
    })();

    _G.loadBatchRenameDialog = (function() {
      var _tplConfirmRename = `
        <p>请输入新的命名规则 (自动储存):  <input id="jx_nameRule" class="jx-input" style="width:20em" /></p>
        <p style="line-height: 1; padding-top: 1em;">
          <code>:n</code> 表示不带扩展名的文件名; <code>:e</code> 表示扩展名; <code>:E</code> 表示 .扩展名;
        <br><code>:d</code> 表示一位随机数字; <code>:c</code> 表示一位随机字符; <code>:t</code> 表示当前时间戳</p>
      `;

      var dialog, $tplConfirmRename;

      function showDialog() {
        $tplConfirmRename = $(_tplConfirmRename);
        $('#jx_nameRule', $tplConfirmRename).val(localStorage.jxRenameRule || '[GalACG] :d:d:d:d:d:d:d:d:d:d:E');

        dialog = confirmDialog({
          title: '确认批量重命名',
          body: $tplConfirmRename,
          onSure: function() {
            handleConfirm();
            dialog.hide();
          },
          onCancel: function() {
            dialog.hide();
          },
        });
      }

      function handleConfirm() {
        // 储存批量重命名记录
        var _nameRule = $('#jx_nameRule', $tplConfirmRename).val();
        localStorage.jxRenameRule = _nameRule;

        var _flist = _G.ListInit.getCheckedItems().map(toReplacePayload);

        _G.Tip.show({
          mode: 'loading',
          msg: '正在批量重命名，请稍后 ...',
          autoClose: false
        });

        $.ajax({
          url: '/api/filemanager?' + $.param({
            channel: 'chunlei',
            bdstoken: yunData.MYBDSTOKEN,
            app_id: __AppId,
            opera: 'rename'
          }),
          type: 'POST',
          data: {
            filelist: JSON.stringify(_flist)
          }
        }).success(function() {
          _G.Tip.hide();
          _G.Message.trigger('system-refresh');
        }).fail(function() {
          _G.Tip.hide();

          _G.Tip.show({
            mode: 'failure',
            msg: '批量重命名失败, 请稍后重试!'
          });
        });

        function toReplacePayload(item) {
          return {
            path: item.path,
            newname: _nameRule.replace(/:([cdeEn])/g, fixName.bind(item.server_filename))
          };
        }
      }

      /* 依赖函数表 */
      function fixName(z, code) {
        switch (code) {
          case 'n':
            var name = this.match(/^(.+)\./);
            return name ? name[1] : this;
          case 'c':
            return String.fromCharCode(97 + Math.random() * 26);
          case 'd':
            return Math.random().toString().slice(3, 4);
          case 't':
            return +new Date();
          case 'e':
            var ext = this.match(/\.([^.]+)$/);
            return ext ? ext[1] : '';
          case 'E':
            return this.match(/\.[^.]+$/) || '';
        }
      }

      /* 收尾 */
      return showDialog;
    })();
  }

  function delayLoadDuCode() {
    if (!window.Handlebars) {
      var _amd = window.define.amd;
      delete window.define.amd;

      var libHandlebars = document.createElement('script');
      libHandlebars.src = 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.js';
      libHandlebars.onload = function() {
        window.define.amd = _amd;
        _G.loadStandardCodeDialog = delayLoadDuStdCode();
      };
      libHandlebars.onerror = function () {
        window.define.amd = _amd;
        alert("加载第三方 UI 组件失败, 请稍候重试!");
      };
      document.head.appendChild(libHandlebars);
    } else {
      _G.loadStandardCodeDialog = delayLoadDuStdCode();
    }

    function delayLoadDuStdCode() {
      Handlebars.registerHelper('size', parseSize);

      var _tplEncodeFiles = Handlebars.compile(`
        {{#each files}}
          <li>
            <span class="name">{{ name }}</span>
            <span class="size">({{size size}})</span>
          </li>
        {{/each}}
      `);

      var _tplStandardCode = `
        <div>
          <p><textarea class="jx jx_code jx-input" rows="7" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea></p>
          <p style="line-height: 1;   padding: .5em 0;">
            扩展阅读: 
            <a href="http://game.ali213.net/thread-5465798-1-1.html" target="_blank">肚娘代码说明 [游侠]</a>
            | <a href="https://jixun.moe/2017/06/13/du-code-gen/" target="_blank">标准度娘提取码 [梦姬]</a>
          </p>
          <p style="text-align:left">
            <b>文件列表</b> (版本: <span class="jx_version" style="color:black">--</span>):
          </p>
          <ul class="jx_list"></ul>
          <p class="jx_c_warn jx_hide jx_errmsg">无效的提取码! 请确保您输入的提取码无误。</p>
        </div>
      `;

      var dialog, $tplStandardCode, codeInfo, jx_list, jx_code, jx_errmsg, jx_version;
      var failed = 0;

      function showDialog() {
        $tplStandardCode = $(_tplStandardCode);

        dialog = confirmDialog({
          title: '通用提取码',
          body: $tplStandardCode,
          onSure: function() {
            handleConfirm();
            dialog.hide();
          },
          onCancel: function() {
            dialog.hide();
          },
        });

        jx_list = $('.jx_list', $tplStandardCode);
        jx_code = $('.jx_code', $tplStandardCode);
        jx_errmsg = $('.jx_errmsg', $tplStandardCode);
        jx_version = $('.jx_version', $tplStandardCode);

        jx_code.blur(function() {
          var code = jx_code.val();
          codeInfo = DuParser.parse(code);
          jx_errmsg.toggleClass('jx_hide', !code || !!codeInfo);
          if (codeInfo) {
            jx_version.text(codeInfo.ver);
            jx_list.html(_tplEncodeFiles({
              files: codeInfo
            }));
          } else {
            jx_version.text('--');
          }
        }).focus(function() {
          jx_errmsg.addClass('jx_hide');
          jx_list.text('');
          jx_version.text('--');
        });
      }

      var _curDir;

      function handleConfirm() {
        _curDir = _G.ListInit.currentKey;
        if (_curDir.slice(-1) != '/')
          _curDir += '/';

        saveFile(0);
      }

      function saveFile(i) {
        if (i >= codeInfo.length) {
          _G.Tip.show({
            mode: 'success',
            msg: `转存完毕 (失败 ${failed} 个)!`
          });
          _G.Message.trigger('system-refresh');
          return;
        }

        _G.Tip.show({
          mode: 'loading',
          msg: `正在转存文件 (${ i + 1 }/${ codeInfo.length }), 请稍后 ..`,
          autoClose: false
        });

        var file = codeInfo[i];

        $.ajax({
          url: '/api/rapidupload',
          type: 'POST',
          data: {
            path: _curDir + file.name,
            'content-md5': file.md5,
            'slice-md5': file.md5s,
            'content-length': file.size
          }
        }).success(function(r) {
          _G.Tip.hide();
          if (r.errno) failed++;
        }).fail(function(r) {
          failed++;
        }).always(function() {
          saveFile(i + 1);
        });
      }

      /* 依赖函数表 */
      function parseSize(size) {
        // 超过 GB
        if (size.length > 9) {
          size = size.slice(0, -7);
          return size.slice(0, -2) + '.' + size.slice(-2) + ' GB';
        }

        return (parseInt(size) / 1024 / 1024).toFixed(2) + ' MB';
      }

      /**
       * 一个简单的类似于 NodeJS Buffer 的实现.
       * 用于解析游侠度娘提取码。
       * @param {SimpleBuffer}
       */
      function SimpleBuffer(str) {
        this.fromString(str);
      }

      SimpleBuffer.toStdHex = function toStdHex(n) {
        return ('0' + n.toString(16)).slice(-2);
      };

      SimpleBuffer.prototype.fromString = function fromString(str) {
        var len = str.length;

        this.buf = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
          this.buf[i] = str.charCodeAt(i);
        }
      };

      SimpleBuffer.prototype.readUnicode = function readUnicode(index, size) {
        if (size & 1)
          size++;

        var bufText = Array.prototype.slice.call(this.buf, index, index + size).map(SimpleBuffer.toStdHex);

        var buf = [''];
        for (var i = 0; i < size; i += 2)
          buf.push(bufText[i + 1] + bufText[i]);

        return JSON.parse('"' + buf.join('\\u') + '"');
      };

      SimpleBuffer.prototype.readNumber = function readNumber(index, size) {
        var ret = 0;

        for (var i = index + size; i > index;)
          ret = this.buf[--i] + (ret * 256);

        return ret;
      };

      SimpleBuffer.prototype.readUInt = function readUInt(index) {
        return this.readNumber(index, 4);
      };

      SimpleBuffer.prototype.readULong = function readULong(index) {
        return this.readNumber(index, 8);
      };

      SimpleBuffer.prototype.readHex = function readHex(index, size) {
        return Array.prototype.slice.call(this.buf, index, index + size).map(SimpleBuffer.toStdHex).join('');
      };

      function DuParser() {}
      DuParser.parse = function generalDuCodeParse(szUrl) {
        var r;
        if (szUrl.indexOf('BDLINK') === 0) {
          r = DuParser.parseDu_v1(szUrl);
          r.ver = '游侠 v1';
        } else {
          r = DuParser.parseDu_v2(szUrl);
          r.ver = '梦姬标准';
        }
        return r;
      };

      DuParser.parseDu_v1 = function parseDu_v1(szUrl) {
        var raw = atob(szUrl.slice(6).replace(/\s/g, ''));
        if (raw.slice(0, 5) !== 'BDFS\x00')
          return null;

        var buf = new SimpleBuffer(raw);

        var ptr = 9;
        var arrFiles = [];
        var fileInfo, nameSize;
        var total = buf.readUInt(5);

        for (i = 0; i < total; i++) {
          // 大小 (8 bytes)
          // MD5 + MD5S (0x20)
          // nameSize (4 bytes)
          // Name (unicode)
          fileInfo = {};
          fileInfo.size = buf.readULong(ptr + 0);
          fileInfo.md5 = buf.readHex(ptr + 8, 0x10);
          fileInfo.md5s = buf.readHex(ptr + 0x18, 0x10);
          nameSize = buf.readUInt(ptr + 0x28) << 1;
          fileInfo.nameSize = nameSize;
          ptr += 0x2C;

          fileInfo.name = buf.readUnicode(ptr, nameSize);
          arrFiles.push(fileInfo);
          ptr += nameSize;
        }

        return arrFiles;
      };

      DuParser.parseDu_v2 = function parseDu_v2(szUrl) {
        return szUrl.split('\n').map(function(z) {
          // unsigned long long: 0~18446744073709551615
          return z.trim().match(/([\dA-F]{32})#([\dA-F]{32})#([\d]{1,20})#([\s\S]+)/);
        }).filter(function(z) {
          return z;
        }).map(function(info) {
          return {
            md5: info[1],
            md5s: info[2],
            size: info[3],
            name: info[4]
          };
        });
      };

      /* 收尾 */
      return showDialog;
    }
  }

  function loadDependencies() {
    _G.Message = oRequire("system-core:system/baseService/message/message.js");
    _G.Tip = oRequire("system-core:system/uiService/tip/tip.js");
    _G.Dialog = oRequire("system-core:system/uiService/dialog/dialog.js");
    _G.Context = oRequire("system-core:context/context.js").instanceForSystem;
    _G.ui = _G.Context.ui;
  }
})();

// Inject style
var style = document.createElement('style');
style.textContent = `
.jx_btn {
	background: #fefefe;
	background: linear-gradient(to bottom,  #fefefe 0%,#f2f2f2 88%);

	display: inline-block;
	line-height: 25px;
	vertical-align: middle;
	margin: 0 0 0 10px;
	text-decoration: none;
	border: 1px solid #AAA;
	padding: 0px 20px;
	height: 26px;
	border-radius: 2px;

	min-width: 3em;
	text-align: center;
}
.jx_btn, .jx_btn:hover, .jx_btn:focus {
	color: #666;
}
.jx_btn:active {
	color: #06C;
	background: #e3e3e3;
	background: -moz-linear-gradient(top,  #e3e3e3 0%, #f7f7f7 12%);
	background: -webkit-linear-gradient(top,  #e3e3e3 0%,#f7f7f7 12%);
	background: linear-gradient(to bottom,  #e3e3e3 0%,#f7f7f7 12%);
}
.jx-input {
    margin: 9px 0;
    _margin: 7px 0;
    padding: 0 0 0 5px;
    width: 200px;
    height: 24px;
    vertical-align: middle;
    border: 1px solid #3b8cff;
    border: 1px solid rgba(58,140,255,.3);
    background: #fff;
    border-radius: 2px;
}

.jx_hide   { display: none }
.jx_c_warn { color: red }

.jx_list {
	text-align: left;
	max-height: 3em;
	overflow-y: scroll;
	overflow-x: hidden;
	line-height: 1;
	padding: .2em;
	margin-bottom: .5em;
}

.jx_list .name {
	color: black;
}
.jx_list .size {
	color: #777;
}

textarea.jx{
	width: 100%;
    min-height: 4em;
}`;
document.head.appendChild(style);