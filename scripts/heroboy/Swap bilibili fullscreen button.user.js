// ==UserScript==
// @name        Swap bilibili fullscreen button
// @namespace   ywqywqywqywq
// @include     https://www.bilibili.com/*
// @include     http://www.bilibili.com/*
// @version     3
// @description html5播放器中，交换“网页全屏”和“全屏”按钮的功能。
// @grant       none
// ==/UserScript==
var tryTimes = 0;
function main()
{
  var btn1 = $('div[name=browser_fullscreen]');
  var btn2 = $('i[name=web_fullscreen]');
  if (btn1.length === 0 || btn2.length === 0)
  {
    ++tryTimes;
    if (tryTimes > 10)
    {
      console.log("bilibili fullscreen button failed");
      return;
    }
    setTimeout(main, 500);
    return;
  }
  console.log('good');
  btn1[0].addEventListener('click', function (e) {
    console.log("click " ,e.target,"\ntrust:",e.isTrusted);
    if (e.isTrusted)
    {
      
      if ($(e.target).attr('name') == 'web_fullscreen')
        btn1.click();
      else
        btn2.click();
      e.stopPropagation();
    }
  }, true);
}
main();
