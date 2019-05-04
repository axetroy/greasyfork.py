// ==UserScript==
// @name         起点小说评估系统
// @namespace    https://greasyfork.org/scripts/32996
// @version      1.5
// @description  根据起点小说的推荐与点击，尝试评估小说，给出可供参考的建议
// @author       toprapid
// @copyright    2017+,toprapid
// @match        https://book.qidian.com/info/*
// @require      https://cdn.staticfile.org/jquery/3.2.1/jquery.min.js
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
	$(document).ready(function () {
		loadIt();
	});
	function loadIt(){
		var ems=$(".book-info p").find("em");
		var cites=$(".book-info p").find("cite");
		var chapters=$("#J-catalogCount");
		var comments=$("#J-discusCount");
		if(chapters!=null && chapters!=="undefined" && comments!=null && comments!=="undefined"){
			if(chapters[0].innerHTML===""||comments[0].innerHTML===""){
				setTimeout(loadIt,1000);
				return;
			}
			var sClickRecommended=["吸睛率太少","吸睛率较低","吸睛率中等","吸睛率极高","吸睛率超高","超级无敌吸睛率"];
			var sRecommended=["木有人气，中毒自负","人气一般，可以考虑","人气还行，可以试试","推荐者众多，值得一看","人气作品，不可错过！","大神作品，必看！","超级大神作品，必必必看！","人气较少，谨慎试毒"];
			var sWordsRecommended=["良心被狗啃了","木有良心","良心腐烂了","良心好烂","良心一般般","良心很好","超级有良心","当代活雷锋","作者天下第一有良心","没有谁比作者更有良心了"];
			var chapterCount=parseInt(chapters[0].innerHTML.substring(1,chapters[0].innerHTML.length-2),10);
			var commentCount=parseInt(comments[0].innerHTML.substring(1,comments[0].innerHTML.length-2),10);
			var nTotalWords=(cites[0].innerHTML[0]==="万" ? parseFloat(ems[0].innerHTML):parseFloat(ems[0].innerHTML)/10000);
			var nTotalClicks=(cites[1].innerHTML[0]==="万" ? parseFloat(ems[1].innerHTML):parseFloat(ems[1].innerHTML)/10000);
			var nTotalRecommendeds=(cites[2].innerHTML[0]==="万" ? parseFloat(ems[2].innerHTML):parseFloat(ems[2].innerHTML)/10000);
			var nTotalClickRatio=nTotalClicks/chapterCount*100;
			var nTotalRecommendedRatio=nTotalRecommendeds/chapterCount*100;
			var nTotalWordsPerChapter=nTotalWords*10000/chapterCount;
			var nTotalCommentsRatio=commentCount/(nTotalClicks*10000)*100;
			var s=Math.round(nTotalWordsPerChapter/500);
			s= (s==0 ? 0:s-1);
			var k=Math.round(nTotalClickRatio/25);
			var z=Math.round(nTotalRecommendedRatio/25);
			var n="";
			if(z<=0){
				if(Math.round(nTotalRecommendedRatio)>0){
					n=sRecommended[7];
				}
				else n=sRecommended[0];
			}
			else{
				if(z>4){
					if(z<5)n=sRecommended[5];
					else n=sRecommended[6];
				}
				else n=sRecommended[z];
			}
			GM_addStyle(`
#qdxspgxtDiv{
position:fixed;
float:left;
z-index:999;
top:5%;
width:22%;
height:100%;
opacity:0.8;
}

#qdxspgxtDiv p em{
color:red;
}
#qdxspgxtDiv p span{
color:blue;
}
#qdxspgxtDiv ul{
width:100%;
height:80%;
border:none;
overflow:auto;
}
`);
			var myDiv=document.createElement("div");
			myDiv.setAttribute("ID","qdxspgxtDiv");
			myDiv.innerHTML=`
<p><em>总点击率：</em><span>${Math.round(nTotalClickRatio*100)/100}%</span><em>（${sClickRecommended[k>4 ? 5:k]}）</em></p>
<p><em>总推荐值：</em><span>${Math.round(nTotalRecommendedRatio*100)/100}%</span><em>（${n}）</em></p>
<p><em>总评论率：</em><span>${Math.round(nTotalCommentsRatio*100)/100}%</span><em></em></p>
<p><em>每章平均字数：</em><span>${Math.round(nTotalWordsPerChapter)}</span><em>（${sWordsRecommended[s>9 ? 9:s]}）</em></p>
`;
			if(commentCount>10){
				var commentsLink=comments[0].parentNode.parentNode;
				if(commentsLink!=null && commentsLink!=="undefined"){
					var hotCommentsUrl=commentsLink.href+"?type=100";
					console.log(hotCommentsUrl);
					GM_xmlhttpRequest({
						method:"GET",
						url:hotCommentsUrl,
						headers:{
							"User-Agent": "Mozilla/5.0",
							"Accept": "application/json"
						},
						onload:function(response){
							if(response){
								if(response.responseText){
									var bTag=response.responseText.indexOf(`<ul class="all-post">`);
									if(bTag>10){
										var eTag=response.responseText.indexOf(`<div class="page-container"`);
										if(eTag>20){
											var idx=`<link data-ignore="true" rel="stylesheet" href="`;
											var bCssTag=response.responseText.indexOf(idx);
											if(bCssTag>10){
												var eCssTag=response.responseText.substr(bCssTag+=idx.length).indexOf(`">`)+bCssTag;
												var cssHref="https:"+response.responseText.substring(bCssTag,eCssTag);
												GM_xmlhttpRequest({
													method:"GET",
													url:cssHref,
													headers:{
														"User-Agent": "Mozilla/5.0",
														"Accept": "application/json"
													},
													onload:function(resp){
														if(resp){
															if(resp.responseText){
																GM_addStyle(resp.responseText);
																myDiv.innerHTML+=`<p><em>本小说热贴：</em></p>`+response.responseText.substring(bTag,eTag);
																var w=window.screen.width-Math.round(window.screen.width/100*22)-990;
																$(".book-detail-wrap.center990,.crumbs-nav.center990.top-op").css("margin-right",`${w<0 ? 0:Math.round(w/2)}px`);
															}
														}
													}
												});
											}
										}
									}
								}
							}
						}
					});
				}
			}
			$(".wrap")[0].insertBefore(myDiv,$("#j-topHeadBox")[0]);
			$(".jumpWrap,.close-game-op,#j-topHeadBox,.top-bg-box,.border-shadow").remove();
		}
		else console.log("chapters is null!");
	}
})();