// ==UserScript==
// @name          tame QTKJ
// @namespace     Vionlentmonkey
// @version       1.2.1
// @description   at the end of with it.
// @author        someone

// @match         http://218.94.1.182:8080/jslawyer/index.html*

// @match         http://218.94.1.181:8087/sfxzwsxy/*
// @match         http://218.94.1.179:8087/sfxzwsxy/*
// @match         http://218.94.1.175:8087/sfxzwsxy/*

// @match         http://218.94.1.181:5088/unzipapp/project/ware/attach/*

// @require       https://openuserjs.org/src/libs/sizzle/GM_config.js
// @require       https://cdn.jsdelivr.net/npm/vm.shortcut
// @require       https://greasyfork.org/scripts/381400-open-2345/code/open_2345.js
// @require       https://greasyfork.org/scripts/381401-addstyle/code/addStyle.js
// @require       https://greasyfork.org/scripts/381402-clearurls/code/clearURLs.js
// @require       https://greasyfork.org/scripts/381403-fakenavigators/code/fakeNavigators.js

// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_registerMenuCommand
// @grant         GM_openInTab
// @grant         GM_notification

// @run-at        document-start

// ==/UserScript==

const body = document.body || document.documentElement;

const iframeCSS = `
height: 50% !important;
width: auto !important;
border: 1px solid;
position: fixed;
`;

const windowCSS = `
#tameCfg {background-color: lightblue;}
#tameCfg .reset_holder {float: left; position: relative; bottom: -1em;}
#tameCfg .saveclose_buttons {margin: 1em;}
`;

GM_registerMenuCommand('tame QTKJ Settings', opencfg);

function opencfg() {
  // 避免在包含框架的页面打开造成多个设置界面重叠
  if (window.top === window.self) {
    GM_config.open();
    keyCodeCfg.style = iframeCSS;
  }
}

GM_config.init({
  id: 'tameCfg',
  title: 'tame QTJK',
  fields: {
    open_close: {
      section: ['keyCode', '批量打开链接的快捷键'],
      label: '10s 后关闭',
      labelPos: 'right',
      type: 'text',
      default: 'F4'
    },
    open_unclose: {
      label: '不关闭',
      labelPos: 'right',
      type: 'text',
      default: 'F8'
    },
    loginName: {
      section: ['网上学院', '完整填写后将尝试自动登录'],
      label: '账号',
      labelPos: 'right',
      type: 'text',
      default: ''
    },
    pwd: {
      label: '密码',
      labelPos: 'right',
      type: 'password',
      default: '111111'
    }
  },
  css: windowCSS,
  events: {
    save: function() {
      GM_config.close();
    }
  }
});

// 从 QQ 等打开地址后会被加上奇葩后缀 http://218.94.1.179:8087/sfxzwsxy/#?tdsourcetag=s_pctim_aiomsg
clearURLs();

// 律师管理系统
if (location.href.startsWith('http://218.94.1.182:8080/jslawyer/index.html')) {
  const css = `
        /*全局隐藏没用的转圈，隐藏密码修改框*/
        div.content-loading, #password, #passwordInfo {display: none !important;}
        /*全局退回按钮红色高亮*/
        a.btns-icon[ng-show="currWorkStatus>=firstWorkStatus"] {color: red !important;}
        /*首页修复图标重叠*/
        /*左下*/
        .tableTab[style="height: 36%;width: 35%;left:0%;top:66%;"] h3 .tab li {min-width: 22% !important;}
        /*中下。市局有调档通知，别的层级可能可以再放大些。*/
        .tableTab[style="height: 36%;width: 25%;left:35.5%;top:66%;"] h3 .tab li {min-width: 27% !important;}
        /*右下*/
        .tableTab[style="height: 36%;width: 38%;left:61%;top:66%;"] h3 .tab li {min-width: 17% !important;}`;
  addStyle(css);

  // 红色高亮 —— 数据来源：退回。不能终止重复执行，否则会导致切换页面后不再高亮。
  const highlight = () => {
    if (document.querySelectorAll('td.ng-binding').length > 0) {
      for (const tuihui of document.querySelectorAll('td.ng-binding')) {
        if (tuihui.textContent.includes('退回')) {
          tuihui.style.color = 'red';
        }
      }
    }
  };

  // 修复 '停止执业期间违法执业' 等件数指向 —— 太垃圾了，Firefox 和 Edge 肯定不能正常解析。
  const safe = () => {
    const unsafes = document.querySelectorAll('a.ng-binding[href="unsafe:javascript:void(0)"]');
    if (unsafes.length > 0) {
      for (const unsafe of unsafes) {
        unsafe.setAttribute('href', 'javascript:void(0)'); // 奇怪，不能用 .href 来实现。
        console.log('safe');
      }
    }
  };

  let document_observer = new MutationObserver(() => {
    highlight();
    safe();
  });
  document_observer.observe(body, {
    attributes: true,
    subtree: true
  });

  VM.registerShortcut(GM_config.get('open_close'), () => {
    const attachments = document.querySelectorAll('a.ng-binding[ng-href^="attachment/file/"]');
    if (attachments.length > 0) {
      open_2345();
      for (let i = attachments.length - 1; i >= 0; i--) {
        if (attachments[i].getAttribute('href') !== 'attachment/file/') {
          const openattach = GM_openInTab(attachments[i], true);
          setTimeout(() => {
            openattach.close();
          }, 10000);
        }
      }
    }
  });
  VM.registerShortcut(GM_config.get('open_unclose'), () => {
    const attachments = document.querySelectorAll('a.ng-binding[ng-href^="attachment/file/"]');
    if (attachments.length > 0) {
      open_2345();
      for (let i = attachments.length - 1; i >= 0; i--) {
        if (attachments[i].getAttribute('href') !== 'attachment/file/') {
          GM_openInTab(attachments[i], true);
        }
      }
    }
  });
}

// 自动选择最空闲的服务器 —— 实现依然简单粗暴，有待改进。
if (location.href.match(/^http:\/\/218\.94\.1\.(181|179|175):8087\/sfxzwsxy\/?#?$/i)) {
  window.onload = () => {
    const nums = document.getElementsByClassName('num');
    if (nums.length > 0) {
      GM_notification(`
        自动选择最空闲的服务器！
        服务器一使用程度：${nums[0].textContent}%
        服务器二使用程度：${nums[1].textContent}%
        服务器三使用程度：${nums[2].textContent}%`);
      minimum = Math.min(nums[0].textContent, nums[1].textContent, nums[2].textContent);
      if (minimum === nums[0].textContent) {
        document.getElementsByClassName('entrybtn')[0].click();
      } else if (minimum === nums[1].textContent) {
        document.getElementsByClassName('entrybtn')[1].click();
      } else {
        document.getElementsByClassName('entrybtn')[2].click();
      }
    }
  };
}

// 识别网上学院登陆验证码。方法来自 https://www.cnblogs.com/ziyunfei/archive/2012/10/05/2710349.html 准确度有限。
if (
  location.href.startsWith('http://218.94.1.181:8087/sfxzwsxy/index.jsp') ||
  location.href.startsWith('http://218.94.1.179:8087/sfxzwsxy/index.jsp') ||
  location.href.startsWith('http://218.94.1.175:8087/sfxzwsxy/index.jsp')
) {
  window.onload = () => {
    let image = document.getElementById('verifyCode'); //获取到验证码图片
    let canvas = document.createElement('canvas'); //新建一个canvas
    let ctx = canvas.getContext('2d'); //获取2D上下文
    const numbers = [
      //模板,依次是0-9十个数字对应的明暗值字符串
      '111111111111111111111111111111111111111111111111111100101111111110000000111111100000010111111000011100001111000011100001111001111110011110000111100001111000111100001110001111100001100011111110011100001111000011110001111000011100001111000011100001111000111100001110000111100001111000111110000000001111111000000011111111100001111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111000000000000000000000000000000', //0
      '111111111111111111111111111111111111111111111111111111100011111111110000011111111100000111111111000000111111100000000111111000000000111110000010000111110011100001111111111100001111111111100001111111111100001111111111100001111111111000011111111111000011111111111000011111111111000011111111111000011111111110000111111111110000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111000000000000000000000000000000', //1
      '111111111111111111111111111111111111111111111111111000001111111110000000011111100000000011111100001100001111000011100001111000011100001111111111100001111111111000001111111110000011111111100000011111111000000111111110000001111111110000011111111100000111111111000001111111110000011111111110000000000011100000000000011100000000000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111000000000000000000000000000000', //2
      '111111111111111111111111111111111111111111111111111100001111111110000000011111100000000011111100001100001111000011100001111100011100001111111111100001111111111000011111111100000111111111100001111111111100000111111111110000011111111111000011100001111000011100001111000011110000110000111110000000000111111000000001111111100000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111000000000000000000000000000000', //3
      '111111111111111111111111111111111111111111111111111111110000111111111100000111111111000001111111110000001111111110000001111111100000001111111000100001111110000000011111100001000011111100011000011111000111000011110001111000011110000000000001100000000000001100000000000001111111110000111111111110000111111111100001111111111100001111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111000000000000000000000000000000', //4
      '111111111111111111111111111111111111111111111111110000000010111110000100001111100000000101111110011111111111101001111111111010011111111111000010101111111000000000011110100000100111110000111000001111111111100101111111111100001111111111101001100001111100101100011111010011100000110100011110001000001111111000000101111111100000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111000000000000000000000000000000', //5
      '111111111111111111111111111111111111111111111111111100000111111111000000011111110000000011111100001100001111100011100001111000011111111111000011111111110000000001111110000000000111110000000000111110000011000011110000111000011110000111000011110000111000011110000111000011110000110000111111000000000111111100000001111111110000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111000000000000000000000000000000', //6
      '111111111111111111111111111111111111111111111111000000000000110000000000000110000000000001111111111100001111111111000011111111111000111111111110001111111111100001111111111100011111111111000011111111111000011111111110000111111111110000111111111110001111111111100001111111111100001111111111100001111111111000011111111111000011111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111000000000000000000000000000000', //7
      '111111111111111111111111111111111111111111111111111100000111111111000000001111110000000000111100000110000111100001110000111100001110000111100001100001111110000000011111111000001111111100000000011111000011000011110000111100001110000111100001110000111100001110000111100001110000011000011111000000000011111000000000111111110000011111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111000000000000000000000000000000', //8
      '111111111111111111111111111111111111111111111111111100001111111110000000111111110000000011111100001100011111000011100001111000011100001111000011100001111000011100001111000011100001111000011000001111100000000001111100000000001111110000000011111111111000011110000111000111110000110000111111000000001111111000000011111111100000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111000000000000000000000000000000'
    ]; //9
    captcha = ''; //存放识别后的验证码
    canvas.width = image.width; //设置canvas的宽度
    canvas.height = image.height; //设置canvas的高度
    document.body.appendChild(canvas); //将canvas添加进文档
    ctx.drawImage(image, 0, 0); //将验证码绘制到canvas上
    for (let i = 0; i < 4; i++) {
      //循环四次,识别四个数字
      // x 30 100 15 3 ； y 10 35
      let pixels = ctx.getImageData(30 + 18 * i, 10, 15, 35).data; //按照公式获取到每个数字上的像素点
      let ldString = ''; //用来存储明暗值的字符串
      for (let j = 0, length = pixels.length; j < length; j += 4) {
        //每次循环取四个值,分别是一个像素点的r,g,b,a值
        ldString = ldString + +(pixels[j] * 0.3 + pixels[j + 1] * 0.59 + pixels[j + 2] * 0.11 >= 128);
        //灰度化+二值化,但我们并没有真正的处理图像
      }
      console.log(ldString); //输出存储着明暗值的字符串
      let comms = numbers.map(function(value) {
        //为了100%识别率,这里不能直接判断是否和模板字符串相等,因为可能有个别0被计算成1,或者相反
        return ldString.split('').filter(function(v, index) {
          return value[index] === v;
        }).length;
      });
      captcha += comms.indexOf(Math.max.apply(null, comms)); //添加到识别好的验证码中
    }

    // 以下尝试自动登录
    document.getElementById('imgCode').value = captcha; // 写入识别出的验证码
    document.getElementById('loginName').value = GM_config.get('loginName'); // 写入预先设置的用户名
    document.getElementById('pwd').value = GM_config.get('pwd'); // 写入预先设置的密码
    if (GM_config.get('loginName') !== '' && GM_config.get('pwd') !== '') {
      // 用户名密码均已设置时才尝试自动登录
      document.getElementById('Submit').click();
    }
    // 验证码改变则重复以上选择流程
    let verifyCode_observer = new MutationObserver(() => {
      location.href = 'http://218.94.1.179:8087/sfxzwsxy/#';
    });
    // 监控验证码变化
    verifyCode_observer.observe(document.getElementById('verifyCode'), {
      attributes: true
    });
  };
}

// 隐藏网上学院 密码修改提示 和 每日一题
if (
  location.href === 'http://218.94.1.181:8087/sfxzwsxy/jypxks/index.html' ||
  location.href === 'http://218.94.1.181:8087/sfxzwsxy/jypxks/index.html#' ||
  location.href === 'http://218.94.1.179:8087/sfxzwsxy/jypxks/index.html' ||
  location.href === 'http://218.94.1.179:8087/sfxzwsxy/jypxks/index.html#' ||
  location.href === 'http://218.94.1.175:8087/sfxzwsxy/jypxks/index.html' ||
  location.href === 'http://218.94.1.175:8087/sfxzwsxy/jypxks/index.html#'
) {
  const css = '#layui-layer1, #layui-layer-shade1, #layui-layer2, #layui-layer-shade2 {display: none !important;}';
  addStyle(css);
}

// 首页培训课程 iframe
if (
  location.href === 'http://218.94.1.181:8087/sfxzwsxy/jypxks/modules/homepage/homepage.jsp' ||
  location.href === 'http://218.94.1.179:8087/sfxzwsxy/jypxks/modules/homepage/homepage.jsp' ||
  location.href === 'http://218.94.1.175:8087/sfxzwsxy/jypxks/modules/homepage/homepage.jsp'
) {
  // F8 批量后台新标签页打开已报名课程播放页面
  VM.registerShortcut(GM_config.get('open_unclose'), () => {
    open_2345();
    const courses = document.getElementsByClassName('infomai');
    for (let course of courses) {
      let cID = course.getElementsByClassName('applyPk')[0].textContent;
      if (cID !== '') {
        let cURL =
          '//' +
          location.host +
          '/sfxzwsxy/jypxks/modules/train/ware/course_ware_view.jsp?applyPk=' +
          cID +
          '&courseType=1';
        GM_openInTab(cURL, true);
      }
    }
  });
}

// 培训课程查询 iframe
if (
  location.href === 'http://218.94.1.181:8087/sfxzwsxy/jypxks/modules/train/query/course_query.jsp' ||
  location.href === 'http://218.94.1.179:8087/sfxzwsxy/jypxks/modules/train/query/course_query.jsp' ||
  location.href === 'http://218.94.1.175:8087/sfxzwsxy/jypxks/modules/train/query/course_query.jsp'
) {
  // 清理“参加培训”和“查看”链接
  const reallinks = () => {
    let courses = document.querySelectorAll('#trainCourseList a[onclick^=bindBeginTrainEvents]');
    for (let course of courses) {
      let cID = course.getAttribute('onclick').split('"')[1];
      //console.log(cID);
      let cURL =
        '//' +
        location.host +
        '/sfxzwsxy/jypxks/modules/train/ware/course_ware_view.jsp?applyPk=' +
        cID +
        '&courseType=1';
      //console.log(cURL);
      course.href = cURL;
      course.onclick = '';
      course.target = '_blank';
    }
    let answers = document.querySelectorAll('#trainCourseList a[onclick^=bindViewCourseInfoEvents]');
    for (let answer of answers) {
      let aID = answer.getAttribute('onclick').split('"')[1];
      //console.log(cID);
      let aURL = '//' + location.host + '/sfxzwsxy//jypxks/modules/train/course/course_view.jsp?coursePk=' + aID;
      //console.log(cURL);
      answer.href = aURL;
      answer.onclick = '';
      answer.target = '_blank';
    }
  };

  let document_observer = new MutationObserver(() => {
    reallinks();
  });
  document_observer.observe(body, {
    childList: true,
    subtree: true
  });

  // F8 批量后台新标签页打开课程播放页面
  VM.registerShortcut(GM_config.get('open_unclose'), () => {
    open_2345();
    const courses = document.querySelectorAll('#trainCourseList a[onclick^=bindBeginTrainEvents]');
    for (let course of courses) {
      let cID = course.getAttribute('onclick').split('"')[1];
      let cURL =
        '//' +
        location.host +
        '/sfxzwsxy/jypxks/modules/train/ware/course_ware_view.jsp?applyPk=' +
        cID +
        '&courseType=1';
      GM_openInTab(cURL, true);
    }
  });
}

// 培训课程查询 - 查看 - 题干 iframe
if (
  location.href.startsWith(
    'http://218.94.1.181:8087/sfxzwsxy//jypxks/modules/train/course/subject_list.jsp?coursePk='
  ) ||
  location.href.startsWith(
    'http://218.94.1.179:8087/sfxzwsxy//jypxks/modules/train/course/subject_list.jsp?coursePk='
  ) ||
  location.href.startsWith('http://218.94.1.175:8087/sfxzwsxy//jypxks/modules/train/course/subject_list.jsp?coursePk=')
) {
  // 清理“题干”链接
  const views = document.querySelectorAll('a[onclick^=viewSubject]');
  for (let view of views) {
    const vID = view
      .getAttribute('onclick')
      .split('(')[1]
      .split(')')[0];
    //console.log(vID);
    const vURL = '//' + location.host + '/sfxzwsxy//jypxks/modules/train/course/subject_view.jsp?subjectPk=' + vID;
    //console.log(vURL);
    view.href = vURL;
    view.onclick = '';
    view.target = '_blank';
  }
}

/* 新版视频播放器页面需要劫持 alert 才能自动开始播放
if (
  location.href.startsWith(
    'http://218.94.1.181:8087/sfxzwsxy/jypxks/modules/train/ware/course_ware_view.jsp?applyPk='
  ) ||
  location.href.startsWith(
    'http://218.94.1.179:8087/sfxzwsxy/jypxks/modules/train/ware/course_ware_view.jsp?applyPk='
  ) ||
  location.href.startsWith('http://218.94.1.175:8087/sfxzwsxy/jypxks/modules/train/ware/course_ware_view.jsp?applyPk=')
) {
}*/

// 课程视频播放 跨域 iframe
if (location.href.startsWith('http://218.94.1.181:5088/unzipapp/project/ware/attach/')) {
  // 旧播放器在 Windows 下要求 Flash，新播放器不兼容苹果系列。老版本播放器能否成功调用 HTML5 似乎是玄学问题。
  fakeUA('Linux');

  const learn = () => {
    // 自动从课程封面进入播放页面
    if (document.querySelector('img[src="courseware/iconImg/z3.png"]')) {
      document.querySelector('img[src="courseware/iconImg/z3.png"]').click();
    }
    // 老播放器用的 confirm 对话框手动点击即暂停，新版的 alert 无法模拟点击但手动点击不影响后台播放
    if (document.getElementById('cancel')) {
      document.getElementById('confirm').click(); // 继续学习
      //document.getElementById('cancel').click(); // 大侠还请重新来过
    }
  };

  const option = () => {
    // 旧播放器自动做题，找不到测试例进一步优化。
    if (document.querySelectorAll('div.option>label>input[name="que"]').length > 0) {
      document.querySelectorAll('div.option>label>input[name="que"]')[0].click();
      document.querySelectorAll('div.option>label>input[name="que"]')[1].click(); // 多选题
      document.getElementsByClassName('button')[0].click(); // 提交
      if (document.getElementsByClassName('button_xia').length === 1) {
        document.getElementsByClassName('button_xia')[0].click(); // 下一题
      }
      if (document.getElementsByClassName('button_wan').length === 1) {
        document.getElementsByClassName('button_wan')[0].click(); // 完成
      }
      document.getElementById('course_player5').click(); // 播放
    }
  };
  let document_observer = new MutationObserver(() => {
    learn();
    option();
  });
  document_observer.observe(body, {
    attributes: true,
    subtree: true
  });
}
