// ==UserScript==
// @name        哔哩哔哩 - 网页上传小视频
// @namespace   esterTion
// @description 网页直传小视频，谁要下你的辣鸡app啊
// @include     *://vc.bilibili.com/
// @include      *://link.acg.tv/forum.php*
// @require     https://static.hdslb.com/js/jquery.js
// @require     https://static.hdslb.com/js/md5.js
// @require     https://gitcdn.xyz/cdn/esterTion/live_html5_lib/8430cf8042bbe0940dd445a533458e3a248f43c7/ybuploader-1803061005.full.min.js
// @version     5
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @run-at      document-end
// @connect     passport.bilibili.com
// @connect     https://passport.bilibili.com
// @connect     https://passport.bilibili.com/*
// ==/UserScript==

/* global hex_md5 GM_xmlhttpRequest GM_getValue GM_setValue GM_deleteValue $ WebUploader */

if (location.href.match('link.acg.tv/forum.php') != null && location.href.match('access_key') != null && window.opener != null) {
  window.stop();
  document.children[0].innerHTML = '<title>BALH - 授权</title><meta charset="UTF-8" name="viewport" content="width=device-width">正在跳转……';
  window.opener.postMessage('balh-login-credentials: ' + location.href, '*');
  return;
}

function _(e, t, n) { var r = null; if ("text" === e) return document.createTextNode(t); r = document.createElement(e); for (var l in t) if ("style" === l) for (var a in t.style) r.style[a] = t.style[a]; else if ("className" === l) r.className = t[l]; else if ("event" === l) for (var a in t[l]) r.addEventListener(a, t[l][a]); else r.setAttribute(l, t[l]); if (n) for (var s = 0; s < n.length; s++)null != n[s] && r.appendChild(n[s]); return r }
var s = document.createElement('script');
s.src = '//static.hdslb.com/js/jquery.min.js';
document.head.appendChild(s);
s = document.createElement('script');
s.src = '//static.hdslb.com/js/md5.js';
document.head.appendChild(s);

const APPKEY = '27eb53fc9058f8c3';
const APPSEC = 'c2ed53a74eeefe3cf99fbd01d8c9c375';

function signParam(param) {
  var paramList = [];
  // 通用参数
  param.appkey = APPKEY;
  param.build = 3741;
  param.ts = (Date.now() / 1e3) | 0;
  for (var key in param) {
    paramList.push(key + '=' + encodeURIComponent(param[key]));
  }
  paramList.sort();
  var query = paramList.join('&');
  var sign = hex_md5(query + APPSEC);
  return query + '&sign=' + sign;
}

// 检查access_key
var userInfo = {
  isLogin: false
};
function checkKey() {
  userInfo.access_key = GM_getValue('access_key');
  if (userInfo.access_key == undefined) {
    return;
  }
  userInfo.isLogin = true;
  checkKeyStatus();
  return;
}
checkKey();

function checkKeyStatus() {
  var needChk = true;
  if (localStorage.BWVC_oauthTime && (localStorage.BWVC_oauthTime > Date.now() - 2 * 24 * 3600e3))
    needChk = false;
  if (needChk) {
    fetch('https://passport.bilibili.com/api/oauth?' + signParam({
      access_key: userInfo.access_key
    })).then(r => r.json()).then(data => {
      if (data.code == 0) {
        var expire = data['access_info']['expires'] * 1e3;
        if (expire - 5 * 24 * 3600e3 < Date.now()) {
          $.ajax({
            method: 'GET',
            url: 'https://passport.bilibili.com/api/login/renewToken?' + signParam({
              access_key: userInfo.access_key
            })
          });
        }
        localStorage.BWVC_oauthTime = Date.now();
      } else if (data.code == -101 || data.code == -658) {
        GM_deleteValue('access_key');
        userInfo.isLogin = false;
        delete userInfo.access_key;
        console.log('[BWVC] access_key 已过期');
      }
    });
  }
}

// 获取新access key
window.addEventListener('message', function (e) {
  if (typeof e.data !== 'string') return // 只处理e.data为string的情况
  switch (e.data.split(':')[0]) {
    case 'balh-login-credentials': {
      balh_auth_window.close();
      let url = e.data.split(': ')[1];
      gotKey({ finalUrl: url });
      break;
    }
  }
})
function getKey() {
  const balh_auth_window = window.open('about:blank');
  balh_auth_window.document.title = 'BALH - 授权';
  balh_auth_window.document.body.innerHTML = '<meta charset="UTF-8" name="viewport" content="width=device-width">正在获取授权，请稍候……';
  window.balh_auth_window = balh_auth_window;
  $.ajax('https://passport.bilibili.com/login/app/third?appkey=27eb53fc9058f8c3&api=http%3A%2F%2Flink.acg.tv%2Fforum.php&sign=67ec798004373253d60114caaad89a8c', {
    xhrFields: { withCredentials: true },
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      if (data.data.has_login) {
        balh_auth_window.document.body.innerHTML = '<meta charset="UTF-8" name="viewport" content="width=device-width">正在跳转……';
        balh_auth_window.location.href = data.data.confirm_uri;
      } else {
        balh_auth_window.close()
        alert('必须登录B站才能正常授权')
      }
    },
    error: (e) => {
      getKeyFail();
    }
  })
}
function gotKey(detail) {
  var access_key = detail.finalUrl.match(/access_key=([a-f0-9]{32})/);
  if (access_key != null) {
    userInfo.access_key = access_key[1];
    userInfo.isLogin = true;
    GM_setValue('access_key', userInfo.access_key);
    localStorage.BWVC_oauthTime = Date.now();
    console.log('[BWVC] 已获取并存储 access_key: ' + userInfo.access_key);
  }
}
function getKeyFail() {
  console.error('[BWVC] 获取 access_key 失败');
}

document.head.appendChild(_('style', {}, [_('text', `
.upload {
	display: block;
	float: left;
  margin-top: 70px;
  width: 259px;
  cursor: pointer;
  text-align:center
}
.upload.nonclick {
  cursor: default
}
.upload-icon {
	width: 64px;
	height: 74px;
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAlCAYAAAAqXEs9AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAACcUlEQVRYw9WXu24TQRSGzxJhFMWFeYFESro4wSkoLCUdFBTkJRIBHXSkhCcg3iiRKCjgFYCCmyUQBQVtRBqQENCk5iJHSvRR+Gx8vF7v7I53gjjSSrszO/98M/9cRUoGMAu81We2bPlKA1gFDhnEIbD6r2A2gB6j0QM2zxJkCnhgADo571OhYRrAC63wKOmJhEDfNzUP4CVwMSRQ14yVNZN+CqTfa2ZsdUMCLQPvgLlU+hCQps3pv8vBgHJAR4CqinNn3pr/HghY1Gl+kKw7ZQRxRw/4pHUs5gnVgF3gJK0wrlJPIBsnwENgOgvmtVlvYqAN1PMq9bEEqKt2bNavLlCzP+1pxg9gpagtPkApnRWtE2A3SWwCx0rrhKkSSLVaOq6OgaYA26q/U0IkiWfA3QqgdlRvW3Q2AbQ9gJJ4BVyZAKitOgdiBlathEAS68AX8/0YaHgAXUgmlNd4sGWAaeA+8EeTv/nYeKo5KZBJW9Ax5WVj5UAmz8vGYECan2Vjo5BmCCDzn7VxvYhm6N0efUREIq/WFmx5EcvuGcu+4zhrj7VsUiDgOvDZDOonLhgX0JFrkRwz7eeBp6lpf7WQTQ6gDzi2kYyFMW3PVlGQIkC3gdhR+L0W87LHBTS0l9HfV3pAK6fwFsNRyp4Mvbrq/Mzc7YFbOA5rCvXcx54MrWS337fnoTj1003tvQ5wGZiZtOIcoFgZOgIs0T+tjdhE/6x9B/gI/AoEc4nBiXEpSSx1pq4QpsXgTL2X7gl76whmEzCj2h3G3ToMVOa9LGCM3MuijBY0ReSGiFwTkXkROV9xJ/0Wka8i8kZEHkVRtG8z/wIV2ewJsbhgYwAAAABJRU5ErkJggg==);
	background-repeat: no-repeat;
	background-position: 50%;
  vertical-align: middle;
  filter: invert(1);
  width:100%
}
.upload-progress {
  height:10px;
  width:100%;
  background:#666;
  position:relative;
  border-radius:5px;
  overflow:hidden
}
.upload-progress .upload-progress-inner {
  animation: pre-loading 3s linear infinite;
  background:#23ade5;
  width:30px;
  height:10px;
  position:absolute;
  top:0;
  left:-50px;
}
.upload-progress.uploading .upload-progress-inner {
  animation: none;
  width:0;
  left:0
}
@keyframes pre-loading {
  from {
    left: -50px;
  }
  to {
    left: calc(100% + 20px)
  }
}
`
)]));
var observer = new MutationObserver(function () {
  if ($('.blink-qrcode').length)
    $('.blink-qrcode')[0].replaceWith(_('div', { className: 'upload', event: { click: selectFile } }, [
      _('div', { className: 'upload-icon' }),
      _('div', { className: 'upload-text' }, [_('text', '上传视频')]),
      _('input', { type: 'file', style: { visibility: 'hidden' }, event: { change: preUpload }, accept: '.mp4,.flv,.avi,.wmv,.mov,.webm,.mpeg4,.ts,.mpg,.rm,.rmvb,.mkv' }),
      _('input', { type: 'file', style: { visibility: 'hidden' }, event: { change: preUpload }, accept: '.jpg,.jpeg,.png' })
    ])),
      observer.disconnect();
});
observer.observe(document.body, { subtree: true, childList: true });

var uploading = false;
window.addEventListener('beforeunload', function () { return !uploading; });
function uploadStatusUpdate(text, progress) {
  if (uploading && $('.upload .upload-icon').length) {
    $('.upload')[0].replaceWith(_('div', { className: 'upload nonclick' }, [
      _('div', { className: 'upload-progress' }, [_('div', { className: 'upload-progress-inner' })]),
      _('div', { className: 'upload-text' }, [_('text', '')])
    ]));
  }
  $('.upload .upload-text')[0].innerHTML = text;
  if (progress != undefined) {
    var prog = $('.upload .upload-progress')[0];
    prog.classList.add('uploading');
    prog.firstChild.style.width = progress;
  }
}
function selectFile(e) {
  if (uploading || e.target.nodeName.toLowerCase() == 'input') return;
  if (userInfo.isLogin) {
    $('.upload input')[0].click();
    $('.upload input')[1].click();
  } else {
    getKey();
    //uploadStatusUpdate('缺少账户key');
  }
}
var uploadFile, fileInput, imgInput;
function preUpload() {
  fileInput = $('.upload input')[0];
  imgInput = $('.upload input')[1];
  if (!imgInput.files.length) return uploadStatusUpdate('请选择封面');
  if (!fileInput.files.length) return;
  uploadFile = fileInput.files[0];
  uploading = true;
  uploadStatusUpdate('确认权限');
  $.ajax({
    url: 'https://api.vc.bilibili.com/clip/v1/user/isMobileVerified?' + signParam({
      access_key: userInfo.access_key,
      actionKey: 'appkey'
    }),
    success: getTags,
    error: function () { },
    dataType: 'json',
  });
  function getTags(json) {
    if (json.code == 0) {
      uploadStatusUpdate('获取可用tag列表');
      $.ajax({
        type: 'GET',
        url: 'https://api.vc.bilibili.com/api/v1/tag/list',
        success: gotTags,
        error: function () { },
        dataType: 'json',
      });
    } else {
      uploadStatusUpdate('未绑定手机，无法投稿');
      uploading = false;
    }
  }
}
var detailForm;
function gotTags(json) {
  if (json.code == 0) {
    uploadStatusUpdate('请填写投稿信息');
    json.data.tags.unshift('');
    detailForm = $('.upload .upload-text')[0].appendChild(_('form', { event: { submit: uploadImg } }, [
      _('text', '视频标题：'), _('input', { type: 'text', name: 'titleVal', placeholder: '稿件标题…', style: { border: '1px solid #888' } }),
      _('div', { style: { display: 'flex', width: '100%', flexDirection: 'row', textAlign: 'left' } }, [
        _('label', { style: { flex: 1, width: '50%' } }, [_('input', { type: 'radio', name: 'cfrom', value: 1 }), _('text', '自制')]),
        _('label', { style: { flex: 1, width: '50%' } }, [_('input', { type: 'radio', name: 'cfrom', value: 2 }), _('text', '转载')]),
      ]),
      _('br'),
      _('text', '视频标签：'),
      _('select', { name: 'tag' }, json.data.tags.map(function (i) {
        return _('option', { value: i }, [_('text', i)]);
      })),
      _('br'),
      _('text', '上传线程：'),
      _('select', { name: 'thread' }, [1, 2, 3, 4, 5].map(function (i) {
        return _('option', { value: i }, [_('text', i)]);
      })),
      _('br'),
      _('input', { type: 'submit', value: '确认', style: { cursor: 'pointer', padding: '5px 20px' } }),
      _('div')
    ]));
    detailForm['titleVal'].value = '';
    detailForm['cfrom'].value = 2;
    detailForm['tag'].value = '';
    detailForm['thread'].value = 1;
  } else {
    uploadStatusUpdate('获取tag列表失败');
    uploading = false;
  }
}
function uploadImg(e) {
  e.preventDefault();
  if (detailForm['titleVal'].value == '' || detailForm['tag'].value == '') {
    detailForm.lastChild.textContent = '还没填完信息';
    return;
  }
  uploadStatusUpdate('上传封面中');
  var param = signParam({
    access_key: userInfo.access_key,
    actionKey: 'appkey',
    device: 'phone',
    mobi_app: 'biliLink',
    platform: 'ios',
    rnd: (Date.now() / 1e3) | 0,
    timestamp: (Date.now() / 1e3) | 0,
    ts: (Date.now() / 1e3) | 0
  });
  var form = new FormData();
  form.append('rnd', (Date.now() / 1e3) | 0);
  form.append('timestamp', (Date.now() / 1e3) | 0);
  form.append('file_up', imgInput.files[0], 'coverImage.jpg');
  $.ajax({
    type: 'POST',
    processData: false,
    contentType: false,
    url: 'https://api.vc.bilibili.com/api/v1/image/upload?' + param,
    data: form,
    success: createVC,
    error: function () { },
    dataType: 'json',
  });
}
var uploadInfo;
function createVC(json) {
  if (json.code == 0) {
    uploadStatusUpdate('创建投稿');
    var param = signParam({
      _hwid: '',
      access_key: userInfo.access_key,
      actionKey: 'appkey',
      category: 0,
      cfrom: detailForm['cfrom'].value,
      cover_urls: json.data.image_url,
      description: detailForm['titleVal'].value,
      device: 'phone',
      latitude: '',
      lontitude: '',
      mobi_app: 'biliLink',
      platform: 'ios',
      rnd: Date.now(),
      src: 'appstore',
      tags: detailForm['tag'].value,
      timestamp: (Date.now() / 1e3) | 0,
      title: uploadFile.name
    });
    $.ajax({
      type: 'POST',
      processData: false,
      url: 'https://api.vc.bilibili.com/clip/v1/video/create?' + param,
      data: param,
      success: createdVC,
      error: function () { },
      dataType: 'json',
    });
  } else {
    uploadStatusUpdate('上传封面出错：' + JSON.stringify(json));
    uploading = false;
  }
}
function createdVC(json) {
  if (json.code == 0) {
    uploadStatusUpdate('开始上传');
    uploadInfo = {
      uploaded: 0,
      filename: json.data.cloud_filename,
      upload_url: json.data.cloud_upload_url.replace(/https:/, ''),
      complete_url: json.data.cloud_complete_url,
      id: json.data.video_id,
      uploader: new WebUploader.create({
        attachInfoToQuery: false,
        browse_button: fileInput,
        timeout: 5 * 60 * 1000,
        runtimeOrder: 'html5',
        prepareNextFile: true,
        method: 'POST',
        pick: {
          id: '#upload',
          multiple: false
        },
        dnd: '',
        chunked: true,
        chunkSize: 4 * 1024 * 1024, // options.chunk_size !== undefined ? options.chunk_size : 0,
        fileSingleSizeLimit: 4 * 1024 * 1024 * 1024,
        sendAsBinary: true,
        chunkRetry: 10,
        fileNumLimit: 1,
        fileSizeLimit: 4 * 1024 * 1024 * 1024,
        accept: [
          {
            extensions: "txt,mp3,mp4,flv,avi,wmv,mov,webm,mpeg4,ts,mpg,rm,rmvb,mkv",
            title: 'videos',
          }
        ],
        auto: true,
        duplicate: false, //options.prevent_duplicates,
        threads: (detailForm['thread'].value | 0) || 1,
      })
    };
    var uploader = uploadInfo.uploader;
    uploader.total = {
      bytesPerSec: 0
    };
    uploader.onUploadSuccess = uploadedVC;
    uploader.onUploadProgress = uploadProgress;
    uploader.trigger('change');
    setTimeout(function () {
      uploader.trigger('change');
      uploader.addFile(uploadFile);
    }, 50);
  } else {
    uploadStatusUpdate('创建失败：[' + json.code + ']' + json.message);
    uploading = false;
  }
}
function uploadProgress(file, perc) {
  perc = (perc * 100).toFixed(2) + '%';
  uploadStatusUpdate('已上传 ' + perc, perc);
}
function uploadedVC() {
  uploadStatusUpdate('上传成功，id <a href="//vc.bilibili.com/video/' + uploadInfo.id + '" target="_blank">' + uploadInfo.id + '</a><br><a href="http://link.bilibili.com/p/world/index#/' + document.cookie.match(/DedeUserID=(\d+)/)[1] + '/world/vc" target="_blank">投稿列表</a>', '100%');
  uploading = false;
}

WebUploader.Uploader.register({
  'name': '_',
  'before-send': function (block) {
    var deferred = WebUploader.Deferred();
    uploadInfo.uploader.md5File(block.blob).done(function (md5) {
      var form = {
        chunk: block.chunk,
        filename: uploadInfo.filename,
        filesize: block.end - block.start,
        md5: md5,
        file: block.blob
      };
      block.options = {
        method: 'POST',
        server: uploadInfo.upload_url,
        formData: form,
        sendAsBinary: false,
      };
      deferred.resolve(block);
    });
    return deferred.promise();
  },
  'after-send-file': function (file) {
    var deferred = WebUploader.Deferred();
    uploadInfo.uploader.md5File(file).done(function (md5) {
      var param = signParam({
        _hwid: '',
        access_key: userInfo.access_key,
        actionKey: 'appkey',
        chunks: file.blocks.length,
        filesize: file.size,
        md5: md5,
        device: 'phone',
        mobi_app: 'biliLink',
        platform: 'ios',
        rnd: Date.now(),
        src: 'appstore',
        tags: '游戏片段',
        timestamp: (Date.now() / 1e3) | 0,
        name: uploadFile.name
      });
      $.ajax({
        type: 'POST',
        url: uploadInfo.complete_url,
        data: param
      }).success(function () {
        deferred.resolve(file);
      }).retry({
        times: 5
      }).fail(function () {
        deferred.reject(file);
      });
    });
    return deferred.promise();
  }
});