// ==UserScript==
// @name			拼多多商家后台优化
// @namespace		http://www.pinduoduo.com/
// @version			0.17
//@iconURL			http://www.pinduoduo.com/favicon.ico
// @description		商品编辑页面使用回车键触发提交按钮，商品列表 页面搜索按钮绑定回车键，商品id绑定手机端展示页面，订单查询绑定回车，聊天窗口自动点击个人订单自动刷新当前页面
// @author			Richard He
// @match        http://mms.pinduoduo.com/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
			//函数
			function imgSwitcher(txtSwitchSeq,imgSwitchSeq)
			{//商品编辑页面宽版窄版切换函数
						var imgSwitch = document.getElementsByClassName('pdd-form-label')[txtSwitchSeq].childNodes[0];
						var imgWrap = document.getElementsByClassName('goods-g-d-b-r-img-right')[imgSwitchSeq].getElementsByClassName('g-g-d-b-r-i-r-u-img');
						var link = document.createElement('button');
						link.innerText = '宽版';
						link.style.marginLeft = '8px';
						link.addEventListener('click',function()
						{
							if(this.innerText == '宽版')
							{
								for(var k=0;k<imgWrap.length;k++)
								{
									imgWrap[k].style.width = '470px';
									imgWrap[k].style.height = 'auto';
								}
								this.innerText = '窄版';
							}
							else
							{
								if(this.parentNode.textContent.indexOf('轮')>0)
								{
									for(var l=0;l<imgWrap.length;l++)
									{
										imgWrap[l].style.width = '114px';
										imgWrap[l].style.height = '114px';
									}
								}
								else
								{
									for(var m=0;m<imgWrap.length;m++)
									{
										imgWrap[m].style.width = '148px';
										imgWrap[m].style.height = '228px';
									}
								}
								this.innerText = '宽版';
							}
						},false);
						imgSwitch.appendChild(link);
			}
			window.onload=function ()
			{
				var url = window.location.href;
				var page = url.split('/')[url.split('/').length-2];
				var btn;
				switch(page)
				{
					case "goods_onsales_list":
					btn = document.getElementsByClassName('pdd-btn')[2]; //商品列表搜索按钮
					var imgs = document.getElementsByClassName('new-goods-info');//商品列表缩略图绑定手机详情
					for(var i=0;i<imgs.length;i++)
					{
						//缩略图点击事件
						imgs[i].childNodes[0].style.border = '1px solid #666';
						imgs[i].childNodes[0].style.cursor = 'pointer';
						imgs[i].childNodes[0].addEventListener('click',function(){ window.open('http://mobile.yangkeduo.com/goods.html?goods_id='+this.nextSibling.innerText)},false);
						//商品ID点击复制到剪切板
						imgs[i].childNodes[1].style.cursor = 'pointer';
						imgs[i].childNodes[1].addEventListener('click',function()
								{
									var oInput = document.createElement('input');
									oInput.value = this.innerText;
									document.body.appendChild(oInput);
									oInput.select();document.execCommand("Copy");
									this.style.backgroundColor="#666";
								},false);
					}
					break;
					case "goods_edit":
						btn = document.getElementsByClassName('goods-add-btns')[0].getElementsByClassName('pdd-btn')[0]; //商品编辑页面提交按钮
						//商品轮播图及详情图添加宽版
						imgSwitcher(17,2);
						imgSwitcher(19,4);
					break;
					case "search":
						//Enter 订单查询按钮
						btn = document.getElementsByClassName('pdd-btn')[2];
					break;
					case "order_detail":
						//订单详情order_detail: Enter 显示手机号
						btn = document.getElementsByClassName('absolute-show')[0].getElementsByTagName('a')[0];
						//订单详情 点击商品图片或者商品ID显示手机端详情
						var gid = document.getElementsByClassName('o-d-g-i-first')[0];
						gid.style.cursor = 'pointer';
						gid.addEventListener('click',function(){window.open('http://mobile.yangkeduo.com/goods.html?goods_id='+gid.innerText);},false);

					break;
					case "dist":	//聊天窗口 chat-mechant/dist：打开聊天窗口默认显示个人订单
						document.getElementsByClassName('order-panel-second-bar')[0].click();
						//document.getElementsByClassName('order-panel-second-bar')[0].addEventListener("click",function(){window.location.reload();},false);
					break;
				}

					window.onkeydown=function()
					{	if (event.keyCode==13)
						{
							btn.click();
						}
					}
			}
})();