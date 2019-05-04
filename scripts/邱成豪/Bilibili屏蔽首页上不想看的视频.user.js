// ==UserScript==
// @name Bilibili屏蔽首页上不想看的视频
// @namespace Max's Scripts
// @version 1.0.1
// @author Max
// @include https://www.bilibili.com/
// @grant none
// @description 有的视频真的不想点开,比如恐怖的,连预览都不想看到,但却总是出现在首页.点击视频预览图右上角的x,不喜欢的视频会被移除,并记录在localStorage,以后都不会出现在首页了.
// ==/UserScript==
$('head').append(`<style>
  div.spread-module > div {position:absolute;width:10px;height:10px;top:0;right:0;color:#fff;cursor:pointer;display:none}
  div.spread-module:hover > div {display:block}
</stlye>`);
localStorage.blacklist = localStorage.blacklist || [];
setInterval(function(){
  let blacklist = localStorage.blacklist.split(',');
  let modules = $('div.spread-module');
  modules.each((i, m)=>{
    m = $(m);
    if(m.find('>div').length)
      return;
    let x = $('<div>x</div>')
      .click(function(){
        let _x = $(this);
        let id = _x.prev().attr('href').match('av\\d+');
        blacklist.push(id);
        localStorage.setItem('blacklist', blacklist);
        _x.parent().remove();
        console.log('removed', id.toString())
      });
    m.append(x);
  });
  modules.find('>a').each((i, a)=>{
    let id = a.href.match('av\\d+');
    if(blacklist.find((_id) => _id == id)){
      console.log('removed', id.toString());
      $(a).parent().remove();
    }
  })
}, 1000)