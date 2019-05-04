// ==UserScript==
// @name         清理百度贴吧插入广告
// @icon         http://www.studstu.com/fximg/delicious.gif
// @namespace    moekai.moe.cleartiebaad
// @version      1.1.1
// @description  清理掉贴吧列表和贴子中插入的广告
// @author       YIU
// @include      *://tieba.baidu.com/f?*
// @include      *://tieba.baidu.com/p/*
// @run-at       document-end
// @grant        unsafeWindow
// @compatible   chrome OK
// @compatible   firefox OK
// ==/UserScript==

var $ = unsafeWindow.$;

//======== 你可以修改这下面的开关数值 ========
//清理 1楼 下面的 相关推荐(0不清理 1清理)
var delrec = 1;

//如果发现清理不干净可以试着改大下面的数值
var csleep = 999;




//======== 函数区,不要修改 ========
//--- 添加贴子翻页监听
function AddPostFlipListener(){
	$('.l_pager a').each(function(){
		this.addEventListener('click',FlipEvent);
	});
}

//--- 添加列表翻页监听
function AddListFlipListener(re){
	if(!re)
	{
		$('.nav_list li').each(function(){
			if(this.attributes['data-tab-main'] || this.attributes['data-tab-good']){
				this.getElementsByTagName('a')[0].addEventListener('click',FlipEvent);
			}
		});
	}

	$('#frs_list_pager a').each(function(){
		this.addEventListener('click',FlipEvent);
	});
}

//--- 清理贴子AD
function DelTeibaPostAD(){
	$('.p_postlist').children('div').each(function(){
		var oa = this.querySelector('.d_author');
		if(!oa){
			this.parentNode.removeChild(this);
			return;
		}

		var ob = oa.querySelector('.p_author');
		if(!ob){
			this.parentNode.removeChild(this);
			return;
		}

		var oc = ob.querySelector('.d_name');
		if(!oc){
			this.parentNode.removeChild(this);
			return;
		}

		var odat = oc.getAttribute('data-field');
		if(!odat || !odat.replace(/\s/g,'')){
			this.parentNode.removeChild(this);
		}
	});
}

//--- 清理列表AD
function DelTeibaListAD(){
	$('#thread_list').children('li').each(function(){
		if(!this.classList.contains('thread_top_list_folder') && !this.attributes['data-field'])
		{
			this.parentNode.removeChild(this);
		}
	});
}

//--- 清理相关推荐
function DelRecommend(){
	if(delrec < 1) return;
	var oa = $('.thread_recommend');
	var ob = $('.thread_recommend_ps');
	if(oa.length >0)
		oa[0].parentNode.removeChild(oa[0]);
	if(ob.length>0)
		ob[0].parentNode.removeChild(ob[0]);
}


//======== 监听事件区,不要修改 =======
//--- 翻页监听事件
function FlipEvent(e)
{
	setTimeout(
		function(){

			var si = setInterval(okcheck, 50);
			var obj = e.target;
			var oldp = obj.parentNode;
			var limit = 0;

			function okcheck(){
				//- 对于列表
				// 导航和翻页
				if(obj.parentNode.attributes['data-tab-main'] && document.getElementById('pagelet_frs-list/pagelet/thread') && $('#frs_good_nav').length < 1 ||
				   obj.parentNode.attributes['data-tab-good'] && $('#frs_good_nav').length > 0 ||
				   obj.parentNode.id == 'frs_list_pager' && !$('#frs_list_pager')[0].isEqualNode(oldp))
				{
					// 急性清理
					setTimeout(function(){
						AddListFlipListener(1);
						DelTeibaListAD();
					},233);
					// 惰性清理
					setTimeout(function(){
						AddListFlipListener(1);
						DelTeibaListAD();
					},csleep);
					clearInterval(si);

					//- 对于贴子
					// 翻页
				} else if( obj.parentNode.className.indexOf('l_pager') >= 0 && $('.loading-tip')[0].style.display == 'none' ){
					setTimeout(function(){
						AddPostFlipListener();
						DelTeibaPostAD();

					},csleep);
					clearInterval(si);
				}
				else
				{
					limit++;
					if( limit > 120 ) clearInterval(si);
				}
			}

		},50);
}


//======== 执行区,不要修改 =======
(function() {

	//急性
	setTimeout(function(){
		AddListFlipListener();
		AddPostFlipListener();
		DelTeibaListAD();
		DelTeibaPostAD();
		DelRecommend();
	},1234);

	//惰性
	window.onload = function(){
		AddListFlipListener();
		AddPostFlipListener();
		DelTeibaListAD();
		DelTeibaPostAD();
		DelRecommend();
	};

})();