// ==UserScript==
// @name         Discord - 隱藏頻道列表
// @version      2.1
// @description  新增按鈕以隱藏列表，方便多視窗作業
// @author       Twosheep
// @match        https://discordapp.com/*
// @grant        GM_addStyle
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @namespace https://greasyfork.org/users/158285
// ==/UserScript==

const WAIT_FOR_LOAD_TRY_INTERVAL = 0.5e3;
// Hash svg from discord
const iconChannel = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" class="iconHash"><path id="pathHash" fill="currentColor" d="M2.27333333,12 L2.74666667,9.33333333 L0.08,9.33333333 L0.313333333,8 L2.98,8 L3.68666667,4 L1.02,4 L1.25333333,2.66666667 L3.92,2.66666667 L4.39333333,0 L5.72666667,0 L5.25333333,2.66666667 L9.25333333,2.66666667 L9.72666667,0 L11.06,0 L10.5866667,2.66666667 L13.2533333,2.66666667 L13.02,4 L10.3533333,4 L9.64666667,8 L12.3133333,8 L12.08,9.33333333 L9.41333333,9.33333333 L8.94,12 L7.60666667,12 L8.08,9.33333333 L4.08,9.33333333 L3.60666667,12 L2.27333333,12 L2.27333333,12 Z M5.02,4 L4.31333333,8 L8.31333333,8 L9.02,4 L5.02,4 L5.02,4 Z" transform="translate(1.333 2)"></path></svg>';

// Old api, tend to renew
GM_addStyle(`
  .toggleCollapse {
    z-index:1000;
    position:absolute;
    bottom:0px;
    left:-10px;
    width:100%;
    height:52px;
    margin:1px 0px;
    padding:0px;
    line-height:0px;
    color:#ccc;
    background:transparent;
    transition: all .25s ease;
  }
  .toggleCollapse:hover{
    background:#2F3136;
  }
  .userExpand #pathHash{
    fill:#555 !important;
  }
  .collapse {
    width:0px;
  }
  div[class^=channels]{
    overflow: hidden;
  }
`);

// Create button
function createBtn(){
  let btn = $('<button class="toggleCollapse"><span></span></button>');
  btn.click(function(){
    $('[class^=channels]').toggleClass('collapse');
    $('.toggleCollapse span').toggleClass('userExpand');
  });
  return btn;
}

// Add button
function addBtn(){
  const icon = $('div[class^="listItem"]:last-child');
  if (!icon.length) {
    return false;
  }
  icon.after(createBtn());
  $('.toggleCollapse span').html(iconChannel);
}

function tryRunFunc(fn, interval) {
  if ([null, false].includes(fn())) {
    setTimeout(() => tryRunFunc(fn, interval), interval);
  }
}
function main() {
  tryRunFunc(addBtn, WAIT_FOR_LOAD_TRY_INTERVAL);
}

main();