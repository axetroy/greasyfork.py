// ==UserScript==
// @name        四川大学类网站体验增强（软件学院版）
// @namespace   scu_helper_swjx
// @description 各种四川大学下的网站前端微调（现包括软件学院课程中心去验证码和cc.scu.edu.cn支持非IE浏览器使用）
// @include     http://swjx.scu.edu.cn/moodle/login/index.php
// @include     http://cc.scu.edu.cn/G2S/Showsystem/Index.aspx
// @include     http://zhjw.scu.edu.cn/student/teachingEvaluation/teachingEvaluation/evaluationPage
// @include     http://202.115.47.141/student/teachingEvaluation/teachingEvaluation/evaluationPage
// @version     1.4.1
// @grant       none
// @author      lightning-zgc
// ==/UserScript==
var scu_helper_swjx = {
  act: function () {
    switch (window.location.href) {
      case 'http://swjx.scu.edu.cn/moodle/login/index.php':
        var pass = document.getElementById('passcode');
        pass.value = 'hbuckwpzg';
        pass.setAttribute('style', 'display:none;');
        console.log('swjx');
        break;
      case 'http://cc.scu.edu.cn/G2S/Showsystem/Index.aspx':
        document.getElementsByClassName('menubg') [0].removeAttribute('style');
        console.log('cc');
        break;
      default:
    }
    if (window.location.href.indexOf('student/teachingEvaluation/teachingEvaluation/evaluationPage')) {
    setInterval(function(){window.flag=true},1000)
    }
  },
  init: function () {
    this.act();
    window.onbeforeunload = this.act;
  }
};
scu_helper_swjx.init();
