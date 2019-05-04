// ==UserScript==
// @author            极品小猫
// @version           1.0.5
// @name              京东订单评价助手
// @description       京东商城商品自动评价脚本，自动全五星评价。
// @homepage          https://greasyfork.org/zh-CN/scripts/369202
// @namespace         https://greasyfork.org/zh-CN/users/3128
// @supportURL        https://greasyfork.org/zh-CN/scripts/369202/feedback
// @include           http*://club.jd.com/myJdcomments/orderVoucher.action?ruleid=*
// @include           http*://club.jd.com/myJdcomments/myJdcomment.action*
// @include           http*://club.jd.com/myJdcomments/saveCommentSuccess.action
// @icon              http://www.jd.com/favicon.ico
// @grant             none
// @connect-src       www.jd.com
// @run-at            document-idle
// ==/UserScript==

var AutoVoucher = true,     //自动评价开关，为 False 时则需要手动打开评价页面，但商品仍然会自动评价，但不会自动提交
    timer = 10*1000;        //10秒后开始评价

var path=location.pathname;
if(AutoVoucher&&/myJdcomment.action/i.test(path)&&(getQueryString('sort')===0||getQueryString('sort')===null)) {
    setTimeout(function(){
        if($('.btn-def').length>0) location.href=$('.btn-def').eq(0).attr('href'); //待评价页面
    },timer);
} else if(/saveCommentSuccess.action/i.test(path)) {
  location.href="https://club.jd.com/myJdcomments/myJdcomment.action"; //评价完毕页面
} else if(/orderVoucher.action/i.test(path)) {//订单评价页面
  var contentArr = ['商品质量很好，很满意，配送速度快啊，而且配送员态度也非常好。',
                    '挺好的，非常实用。京东的物流很快哟~希望以后会更快╭(╯3╰)╮',
                    '多快好省，京东给力，下次还是要选择京东商城，没错，非常满意',
                    '非常好，一起买的，价格便宜，快递又快，京东商城还是非常的专业和贴心，可以显示快递的位置，随时掌握快递进度，很先进！',
                    '活动期间买的很实惠，京东自营，值得信赖。',
                    '便宜好用，值得推荐买买买，同事都说好用。下次继续买买买，哈哈哈…',
                    '京东物流就是一个字快，昨晚10点多，11点前下的单今天早上就收到，包装得很好。',
                    '京东购物使我们的生活更便捷了！京东商品丰富，无所不有，自营商品更是价格优惠，童叟无欺。快递给力，包装实在。体验足不出户购物的感觉，就在京东！购物就上京东，有京东，足够！',
                    '一直上京东商城网购，东西非常不错，价格便宜，物流快，是正品',
                    '质量很好，性价比高，值得购买，送货速度快！！',
                    '怒赞！（此评论虽仅有两个字，可谓言简意赅，一字千金，字字扣人心弦，催人泪下，足可见评论人扎实的文字功底和信手拈来的写作技巧，再加上以感叹号收尾，点睛之笔，妙笔生花，意境深远，把评论人的感情表达得淋漓尽致，有浑然天成之感，实乃评论中之极品，祝福中之绝笔也）'
                   ];
  window.addEventListener('load',function(){
    //获得订单ID
    var oid=$('#o-info-orderinfo').attr('oid');
    //全五星好评（含店铺星评、商品星评）
    $('.form-part1 .f-item.f-goods .star5, .commstar-group-hasweaklabel .star5').click();
    //随机点击一个买家印象标签
    if($('.J-mjyx').length>0) {
      var mjyx=$('.J-mjyx .m-multi-tag>a');
      var i=parseInt(Math.random()*mjyx.length-1);
      mjyx.eq(i).click();
    }
    //填写商品评价
    $('.form-part1 .f-item.f-goods .f-textarea>textarea').val(contentArr[parseInt(Math.random()*10)]);
    //提交评价
    if(AutoVoucher) $('.btn-submit').delay(timer).click();
  });
}

function getQueryString(name,url) {//筛选参数
  url=(url&&url.match(/\?.*/).toString())||location.search;	//网址传递的参数提取，如果传入了url参数则使用传入的参数，否则使用当前页面的网址参数
	var reg = new RegExp("(?:^|&)(" + name + ")=([^&]*)(?:&|$)", "i");		//正则筛选参数
	var str = url.substr(1).match(reg);
	//console.log(str[0]);		//所筛选的完整参数串
	//console.log(str[1]);		//所筛选的参数名
	//console.log(str[2]);		//所筛选的参数值
	if (str !== null) return unescape(str[2]);
	return null;
}