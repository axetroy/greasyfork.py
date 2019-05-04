// ==UserScript==
// @name         苏宁订单评价助手beta
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  苏宁订单评价助手
// @author       krapnik
// @match        *://review.suning.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

var contentArr = ['商品质量很好，很满意，配送速度快啊，而且配送员态度也非常好。',
                      '挺好的，非常实用。苏宁的物流很快哟~希望以后会更快╭(╯3╰)╮',
                      '苏宁给力，下次还是要选择苏宁商城，没错，非常满意',
                      '非常好，一起买的，价格便宜，快递又快，苏宁商城还是非常的专业和贴心，可以显示快递的位置，随时掌握快递进度，很先进！',
                      '活动期间买的很实惠，苏宁自营，值得信赖。',
                      '便宜好用，值得推荐买买买，同事都说好用。下次继续买买买，哈哈哈…',
                      '苏宁就是一个字快，昨晚10点多，11点前下的单今天早上就收到，包装得很好。',
                      '苏宁购物使我们的生活更便捷了！苏宁商品丰富，无所不有，自营商品更是价格优惠，童叟无欺。快递给力，包装实在。体验足不出户购物的感觉，就在苏宁！购物就上苏宁，有苏宁，足够！',
                      '一直上苏宁商城网购，东西非常不错，价格便宜，物流快，是正品',
                      '质量很好，性价比高，值得购买，送货速度快！！',
                      '怒赞！（此评论虽仅有两个字，可谓言简意赅，一字千金，字字扣人心弦，催人泪下，足可见评论人扎实的文字功底和信手拈来的写作技巧，再加上以感叹号收尾，点睛之笔，妙笔生花，意境深远，把评论人的感情表达得淋漓尽致，有浑然天成之感，实乃评论中之极品，祝福中之绝笔也）'
                      ];
	var t1 = setInterval(function(){
		    var i =parseInt(10*Math.random());
			if($('.btn-evlu').length>0){
				$('.btn-evlu').eq(0).trigger("click");
				$('.thought-wrap textarea').val(contentArr[i]);;
				setTimeout(function(){
					$('.cmt-btn').eq(0).trigger("click");
				},2000);
				setTimeout(function(){
					$('.comment-item-wrap').eq(0).remove();
				},3000)
			}else{
				alert("暂无更多商品评价！");
				window.clearInterval(t1);
			}
	},4000)
})();