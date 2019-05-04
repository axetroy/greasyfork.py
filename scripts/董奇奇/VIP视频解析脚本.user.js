// ==UserScript==
// @name         VIP视频解析脚本
// @name:en      VIP Video
// @namespace    qiqisw
// @version      1.8.8
// @description  解析并破解各大视频站的VIP权限
// @description:en  Crack VIP permissions of some chinese video sites
// @author       qiqisw
// @include       *://v.qq.com/x/*
// @include       *://m.v.qq.com/*
// @include       *://*.mgtv.com/*b/*
// @include       *://*.le.com/ptv/vplay/*
// @include       *://m.le.com/*
// @include       *://v.youku.com/v_show/*
// @include       *://m.youku.com/video/*
// @include       *://*.iqiyi.com/v_*
// @include       *://*.iqiyi.com/dianying/*
// @include       *://*.tudou.com/albumplay/*
// @include       *://*.tudou.com/listplay/*
// @include       *://*.tudou.com/programs/view/*
// @include       *://*.wasu.cn/*Play/show/id/*
// @include       *://*tv.sohu.com/*
// @include       *://*film.sohu.com/album/*
// @include       *://ddp.vip.pptv.com/vod_detail/*
// @include       *://*.pptv.com/show/*
// @include       *://*.acfun.cn/v/*
// @include       *://*.fun.tv/vplay/*
// @include       *://vip.1905.com/play/*
// @include       *://vip.pptv.com/show/*
// @include       *://v.yinyuetai.com/video/*
// @include       *://v.yinyuetai.com/playlist/*
// @include       *://*.bilibili.com/video/*
// @grant    GM.getValue
// @grant    GM.setValue
// @grant    GM_getValue
// @grant    GM_setValue
// @grant    unsafeWindow
// @grant    GM_xmlhttpRequest
// @grant    GM_openInTab
// ==/UserScript==

(() => {
  'use strict';
  var tMscript = document.createElement('script');
  tMscript.innerText = `q = function(cssSelector){return document.querySelector(cssSelector);};qa = function(cssSelector){return document.querySelectorAll(cssSelector);};`;
  document.head.appendChild(tMscript);
  window.q = function(cssSelector) {return document.querySelector(cssSelector);};
  window.qa = function(cssSelector) {return document.querySelectorAll(cssSelector);};
  window.makeEl = function(tag){return document.createElement(tag);};
  /* 兼容 Tampermonkey | Violentmonkey | Greasymonkey 4.0+ */
  function GMaddStyle(cssText){
    let a = document.createElement('style');
    a.textContent = cssText;
    let doc = document.head || document.documentElement;
    doc.appendChild(a);
  }
  /* 兼容 Tampermonkey | Violentmonkey | Greasymonkey 4.0+
   * 为了兼容GreasyMonkey 4.0 获取结构化数据,比如 json Array 等,
   * 应当先将字符串还原为对象,再执行后续操作
   * GMgetValue(name,defaultValue).then((result)=>{
   *   let result = JSON.parse(result);
   *   // other code...
   * };
   */
  function GMgetValue(name, defaultValue) {
    if (typeof GM_getValue === 'function') {
      return new Promise((resolve, reject) => {
      resolve(GM_getValue(name, defaultValue));
      // reject();
      });
    } else {
      return GM.getValue(name, defaultValue);
    }
  }
  /* 兼容 Tampermonkey | Violentmonkey | Greasymonkey 4.0+
   * 为了兼容GreasyMonkey 4.0 储存结构化数据,比如 json Array 等,
   * 应当先将对象字符串化,
   * GMsetValue(name, JSON.stringify(defaultValue))
   */
  function GMsetValue(name, defaultValue) {
    if (typeof GM_setValue === 'function') {
      GM_setValue(name, defaultValue);
      return new Promise((resolve, reject) => {
      resolve();
      reject();
      });
    } else {
      return GM.setValue(name, defaultValue);
    }
  }
  var replaceRaw/*是否嵌入当前页面*/, episodes/*是否启用爱奇艺正确选集*/, userApisOn/*是否加载自定义解析接口*/;
  GMaddStyle(`
    /*TMHY:TamperMonkeyHuanYan*/
    #TMHYd{z-index:999999; position:absolute; left:0px; top:0px; width:100px; height:auto; border:0; margin:0;}/*TMHYdiv*/
    #TMHYvc{z-index: 999998; background: rgba(0, 0, 0, .7); position: fixed; top: 15%; left:5%; height: 65%; width: 65%;resize:both;overflow:auto; box-shadow: 2px 2px 5px 5px rgba(255,255,0,.8)}/*TMHYVideoContainer*/
    #TMHYvc button{position:absolute;top:2px;font-family:Arial;cursor:pointer;visibility:hidden;font-size:35px;color:#fff;background:transparent;border:0;text-shadow:0 0 2px #000;}
    #TMHYvc:hover button{visibility:visible;}
    #TMHYvc:hover button:hover{color:#ff0;}
    #TMHYi{height: 100%; width: 100%; overflow: auto; position:absolute; top: 0; left: 0; margin: auto; border: 0; box-shadow: 0 0 3em rgba(0, 0, 0, .4); z-index: -1; }/*TMHYIframe*/
    #TMHYul{position:fixed;top:80px; left:0px;}
    #TMHYul li{list-style:none;}
    .TM1{opacity:0.3; position:relative;padding: 0 7px 0 0; min-width: 19px; cursor:pointer;}
    .TM1:hover{opacity:1;}
    .TM1 span{display:block; border-radius:0 5px 5px 0; background-color:#ffff00; border:0; font:bold 15px "微软雅黑" !important; color:#ff0000; margin:0; padding:15px 2px;}
    .TM3{position:absolute; top:0; left:19px; display:none; border-radius:5px; margin:0; padding:0;}
    .TM3 li{float:none; width:80px; margin:0; font-size:14px; padding:3px 10px 2px 15px; cursor:pointer; color:#3a3a3a !important; background:rgba(255,255,0,0.8)}
    .TM3 li:hover{color:white !important; background:rgba(0,0,0,.8);}
    .TM3 li:last-child{border-radius: 0 0 5px 5px;}
    .TM3 li:first-child{border-radius: 5px 5px 0 0;}
    .TM1:hover .TM3{display:block}
    /*自定义解析接口,本页播放窗口设置*/
    .TMHYp {position:fixed;top:20%;left:20%;z-index:999999;background:yellow;padding:30px 20px 10px 20px;border-radius:10px;text-align:center;}/*TMHYpanel*/
    .TMHYp * {font-size:16px;background:rgba(255,255,0,1);font-family:'微软雅黑';color:#3a3a3a;border-radius:10px;}
    #tMuserDefine li {margin:5px;width:100%;list-style-type:none;}
    .TMHYp input[type=text] {border-radius:5px !important;border:1px solid #3a3a3a;margin:2px 10px 2px 5px;padding:2px 5px;}
    .TMHYlti {width:350px;}/*TMHYlongTextInput*/
    .TMHYmti {width:160px;}/*TMHYmti*/
    .idelete {float: left;  display: inline-block; color: red; padding: 0 20px !important; cursor: pointer;}
    .iname {padding-right:10px;}
    li:hover .idelete,li:hover .ilink,li:hover .iname {background:rgba(224,175,17,0.62);}
    .TMHYp button {border:1px solid #3a3a3a;border-radius:5px;cursor:pointer;padding: 2px 10px;margin:10px 20px 0 20px;}
    .TMHYp button:hover {background:#3a3a3a;color:yellow;}
    .TMHYClose {position:absolute;top:0;left:0;margin:0!important;}
    .TMHYp fieldset {margin:0;padding:10px;}
    .TMHYp legend {padding:0 10px;}
    .TMHYp label {display:inline-block;}
    .TMHYspan80 {display:inline-block;text-align:right;width:80px;}
    .TMHYspan120 {display:inline-block;text-align:right;width:120px;}
    #inTabSettingSave {position:relative;margin-top:10px;padding:3px 20px;}
  `);
  var defaultapi = {
    title: "余温解析", url: "https://www.yunhot.cn/j/jiexi.php?url="
  };
  //apis name:显示的文字  url:接口  title:提示文字  intab:是否适合内嵌(嵌入判断:GMgetValue("replaceRaw",false)值||intab值)
  var apis =[
    {name:"余温解析",url:"https://www.yunhot.cn/j/jiexi.php?url=",title:"支持腾讯",intab:1},
  ];
  //嵌入页面播放
  function openInTab(evt) {
    if(evt.target.dataset.intab === '1'){
      if(q('#TMHYi') === null){
        GMgetValue('intabSize','{"height":"","width":"","left":"","top":""}').then((ag)=>{
          var sty = JSON.parse(ag);
          sty = 'height:'+sty.height+';width:'+sty.width+';left:'+sty.left+';top:'+sty.top+';';
          var a = makeEl('div');
          a.id = 'TMHYvc';
          a.setAttribute('style', sty);
          a.innerHTML = '<button title="关闭播放窗口" onclick="document.body.removeChild(q(\'#TMHYvc\'))">?</button>';
          document.body.appendChild(a);

          var b=makeEl('iframe');
          b.id='TMHYi';
          b.src=evt.target.dataset.url + location.href;
          q('#TMHYvc').appendChild(b);
        });
      } else{
        q('#TMHYi').src=evt.target.dataset.url + location.href;
      }
    } else{
      window.open(evt.target.dataset.url + location.href);
    }
  }
  //保存嵌入页面大小位置设置
  function saveInTabSetting(){
    var intabSize = {
      height:q('#TMiframeHeight').value,
      width:q('#TMiframeWidth').value,
      left:q('#TMiframeLeft').value,
      top:q('#TMiframeTop').value
    };
    GMsetValue('intabSize', JSON.stringify(intabSize));
    setTimeout('document.body.removeChild(q("#TMHYSetting"));', 30);
  }
  //生成"嵌入页面大小位置设置"面板
  function intabSetting(){
    var intabSize = GMgetValue('intabSize','{"height":"","width":"","left":"","top":""}')
    .then((ag)=>{
      var a = makeEl('div');
      a.id='TMHYSetting';
      a.setAttribute('class', 'TMHYp');
      a.innerHTML = `
      <button class="TMHYClose" onclick="document.body.removeChild(this.parentNode)">?</button>
      <fieldset>
        <legend>页内播放窗口位置大小</legend>
        <label for="TMpH"><span class="TMHYspan80">高度</span><input type="text" id="TMpH" value="${intabSize.height}"  class="TMHYmti" placeholder='如"300px"或者"65%"'/></label>
        <label for="TMpW"><span class="TMHYspan80">宽度</span><input type="text" id="TMpW" value="${intabSize.width}"  class="TMHYmti" placeholder='如"300px"或者"65%"'/></label><br />
        <label for="TMpL"><span class="TMHYspan80">左边距</span><input type="text" id="TMpL" value="${intabSize.left}"  class="TMHYmti" placeholder='如"300px"或者"65%"'/></label>
        <label for="TMpT"><span class="TMHYspan80">上边距</span><input type="text" id="TMpT" value="${intabSize.top}"  class="TMHYmti" placeholder='如"300px"或者"65%"'/></label>
      </fieldset>
      <button onclick="(function(){var a=getComputedStyle(q('#TMHYvc'));q('#TMpH').value=a.height,q('#TMpW').value=a.width,q('#TMpL').value=a.left,q('#TMpT').value=a.top;})()">获取当前播放窗尺寸</button>
      <button id="intabSettingPreview" onclick="(function(){a=q('#TMHYvc').style.cssText='height:'+q('#TMpH').value+';width:'+q('#TMpW').value+';left:'+q('#TMpL').value+';top:'+q('#TMpT').value+';';})()">预览</button>
      <button id="intabSettingSave">保存</button>
      `;
      document.body.appendChild(a);
      q('#intabSettingSave').addEventListener('click', saveInTabSetting, false);
    });
  }
  //检查是否勾选页内解析
  function noNewTabCheck() {
    var x, arr = qa(".TM4 li");
    replaceRaw = q("#intabChekbx").checked;
    GMsetValue("replaceRaw", replaceRaw);
    for (x = 0; x < arr.length; x++) {
      if (replaceRaw) {
        arr[x].addEventListener("click", openInTab, false);
        arr[x].setAttribute('onclick', '');
      } else {
        arr[x].removeEventListener("click", openInTab, false);
        arr[x].setAttribute('onclick', 'window.open(this.dataset.url + location.href)');
      }
    }
  }
  /* 爱奇艺正确选集 */
  function rightEpsLinkCheck() {
    episodes = q("#realLinkChekbx").checked;
    GMsetValue("episodes", episodes);
    if (episodes) {
      q('#widget-dramaseries').addEventListener('click', function getLink(e) {
      //-------------iqiyi剧集真实播放页面方法  Begin------------------
      //Code piece infomation:
      //License:MIT   Author:hoothin  Homepage: http://hoothin.com  Email: rixixi@gmail.com
        var target = e.target.parentNode.tagName == "LI" ? e.target.parentNode : (e.target.parentNode.parentNode.tagName == "LI" ? e.target.parentNode.parentNode : e.target.parentNode.parentNode.parentNode);
        if (target.tagName != "LI") return;
        GM_xmlhttpRequest({
          method: 'GET',
          url: "http://cache.video.qiyi.com/jp/vi/" + target.dataset.videolistTvid + "/" + target.dataset.videolistVid + "/?callback=crackIqiyi",
          onload: function(result) {
            var crackIqiyi = function(d) {
              location.href = d.vu;
            };
            eval(result.responseText);
          }
        });
      });
      //-------------iqiyi剧集真实播放页面方法  End------------------
    } else {
      q('#widget-dramaseries').removeEventListener('click', getLink);
    }
  }
  /* 勾选自定义接口 */
  function addApiCheck() {
    userApisOn = q('#addApiChekBx').checked;
    GMsetValue('userApisOn', userApisOn);
    selfDefine();
    if (userApisOn) {
      showAddApiPanel();
    }
  }
  /*  执行  */
  var div = makeEl("div");
  div.id = "TMHYd";
  var txt = '', i = 0;
  /*提供的接口列表*/
  for (i in apis) {
    txt += `<li data-order=${i} data-url="${apis[i].url}" data-intab=${apis[i].intab} title="${apis[i].title}" onclick="window.open(this.dataset.url+location.href)">${apis[i].name}</li>`;
  }
  div.innerHTML = `
    <ul id="TMHYul">
      <li class="TM1"><span id="TMList"  title="${defaultapi.title}" onclick="window.open(\'${defaultapi.url}\'+window.location.href)">▶</span><ul class="TM3 TM4">${txt}</ul></li>
      <li class="TM1"><span id="TMSet">▣</span><ul class="TM3">
        <li><label><input type="checkbox" id="intabChekbx">本页解析</label></li>
        <li><label><input type="checkbox" id="realLinkChekbx">爱奇艺正确选集</label></li>
        <li><input type="checkbox" id="addApiChekBx"><label id="addApiBtn">增加接口</label></li>
        <li><label id="intabSettingBtn">本页播放设置</label></li>
      </ul></li>
    </ul>
  `;
  document.body.appendChild(div);
  q("#addApiChekBx").addEventListener('click', addApiCheck, false);
  GMgetValue('userApisOn',false)
  .then((ag)=>{
    userApisOn = ag;
    q("#addApiChekBx").checked = userApisOn;
    /*看看是否需要加载自定义的接口列表*/
    if (userApisOn) {
      GMgetValue('userApis', "[{}]").then((ag1)=>{
        var userApis = JSON.parse(ag1), txt='';
        for (var j in userApis) {
          try {
            if (userApis[j].link !== null) {
              txt += `<li data-order=${j} data-url="${userApis[j].link}"  data-intab=${userApis[j].intab} onclick="window.open(this.dataset.url+location.href)">${userApis[j].name}</li>`;
            }
          } catch (e) {/*console.log(e);*/}
        }
        q('ul.TM3.TM4').innerHTML = txt + q('ul.TM3.TM4').innerHTML;
        selfDefine();
      });
    }
  })
  .then(()=>{
    q("#intabChekbx").addEventListener("click", noNewTabCheck, false);
    GMgetValue('replaceRaw',false).then((ag)=>{
      replaceRaw = ag;
      q("#intabChekbx").checked = replaceRaw;
      if (replaceRaw) {
        noNewTabCheck();
      }
    });
    q("#realLinkChekbx").addEventListener("click", rightEpsLinkCheck, false);
    GMgetValue('episodes',false).then((ag)=>{
      episodes = ag;
      q("#realLinkChekbx").checked = episodes;
      if (episodes && window.location.href.indexOf("iqiyi") != -1) {
        rightEpsLinkCheck();
      }
    });
    q("#addApiBtn").addEventListener('click', showAddApiPanel, false);
    q("#intabSettingBtn").addEventListener('click', intabSetting, false);
  });

/** 2017-10-24  自定义解析接口  */
/*  显示增加接口的面板  */
  function showAddApiPanel() {
    if (q('#tMuserDefine')) {
      q('#tMuserDefine').style.display = "block";
    } else {
      alert(`(●￣(ｴ)￣●)づ\n\n未启用[增加接口]功能\n请把 '▣增加接口'→'☑增加接口'!`);
    }
  }
/*  生成增加接口面板  */
  function selfDefine() {
    var a = makeEl('div');
    a.id = 'tMuserDefine';
    a.setAttribute('class', 'TMHYp');
    a.setAttribute('style', 'display:none');
    var txt = `
      <button class="TMHYClose" onclick="q('#tMuserDefine').style.display='none';">?</button>
      <li><span class="TMHYspan120">解析接口名称:</span><input type="text" id="tMname" class="TMHYlti" placeholder="显示的名称"></li>
      <li><span class="TMHYspan120">解析接口地址:</span><input type="text" id="tMparseLink" class="TMHYlti" placeholder="接口需要包含 http 或者 https"></li>
      <li><span class="TMHYspan80">本页解析:</span><label for="tMintabckbx"><input type="checkbox" id="tMintabckbx"/>适合</label></li>
      <li id="tMbtnLi">
        <button id="tMgo" onclick="window.open(q('#tMparseLink').value+location.href)">测试</button>
        <button id="tMadd">增加</button>
        <button id="tMsave">保存</button>
      </li>
    `;
    // var ar = await JSON.parse(GM.getValue('userApis', "[{}]")),d;
    GMgetValue('userApis', "[{}]").then((ag)=>{
      var ar = JSON.parse(ag),d;
      try {
        if (ar[0].name !== undefined) {
          for (var i = 0; i < ar.length; i++) {
            d = (ar[i].intab==="1")?'checked':'';
            txt += `<li><span class="idelete" title="删除" onclick="document.getElementById('tMuserDefine').removeChild(this.parentNode)">✘</span><input class="icheck" type="checkbox" ${d}><span class="iname">${ar[i].name}</span><span class="ilink">${ar[i].link}</span></li>`;
          }
        }
      } catch (e) {}
      a.innerHTML = txt;
      document.body.appendChild(a);
      /*事件绑定*/
      q('#tMsave').addEventListener('click', function() {
        var newParseLinks = getarr();
        GMsetValue('userApis', JSON.stringify(newParseLinks));
        console.log(newParseLinks);
      }, false);
      q('#tMadd').addEventListener('click', function() {
        if (q('#tMname').value || q('#tMparseLink').value) {
          var b = q("#tMintabckbx").checked?"1":"0";
          var c = q("#tMintabckbx").checked?"checked":"";
          var a = makeEl('li');
          a.innerHTML = `<span class="idelete" title="删除" onclick="document.getElementById('tMuserDefine').removeChild(this.parentNode)">✘</span><input class="icheck" type="checkbox" ${c}><span class="iname">${q('#tMname').value}:</span><span class="ilink">${q('#tMparseLink').value}</span>`;
          if (q('span[class=iname]') === null) {
            q('#tMuserDefine').appendChild(a);
            q('#tMname').value = '';
            q('#tMparseLink').value = '';
          } else {
            q('#tMuserDefine').insertBefore(a, q('span[class=iname]').parentNode);
            q('#tMname').value = '';
            q('#tMparseLink').value = '';
          }
        }
      }, false);
    });
  }
/*  保存按钮执行函数:获取值并 await GM.setValue()  */
  function getarr() {
    var userUrl = qa('.ilink');
    var urlarr = [], tMname, tMparseLink, tMintabckbx;
    tMname = q('#tMname').value;
    tMparseLink = q('#tMparseLink').value;
    tMintabckbx = q('#tMintabckbx').checked?1:0;
    if (tMname || tMparseLink) {
      urlarr.push({ name: tMname, link: tMparseLink, intab:tMintabckbx });
    }
    for (var i = 0; i < userUrl.length; i++) {
      var n, t, l;
      t = userUrl[i].innerText;
      n = userUrl[i].previousSibling.innerText;
      l = userUrl[i].previousSibling.previousSibling.checked?'1':'0';
      urlarr.push({ name: n, link: t,intab:l });
    }
    return urlarr;
  }

})();