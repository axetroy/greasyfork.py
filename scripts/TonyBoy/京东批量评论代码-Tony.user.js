// ==UserScript==
// @name         京东批量评论代码-Tony
// @namespace    https://www.abmbio.xin/
// @version      1.0.2
// @description  京东批量评论代码+追加图片批量评价
// @author       Tony Liu
// @include      http*://club.jd.com/myJdcomments/myJdcomments.action?sort=0
// @include      http*://club.jd.com/myJdcomments/myJdcomments.action?sort=1
// @grant        none
// @icon         https://www.abmbio.xin/favicon.ico
// ==/UserScript==

(function() {
    'use strict';

    var AutoVoucher = true,//自动评价开关，为 False 时则需要手动打开评价页面，但商品仍然会自动评价，但不会自动提交
        timer = 5*1000;//5秒后开始评价
    var path=location.pathname;
    var tonyhtml = '<div style="background: #f5852203;margin: 0 auto;text-align: center;padding-top: 9%;color: #000;width: 100%;height: 100%;position: fixed;display: block;z-index: 9000 !important;" id="tony-blog-madal"><div style="background: #9ce0ff;width: 50%;text-align: center;margin: 0 auto;border: 2px solid #6ecdf9;border-radius: 7px;display: block;padding: 2em;"><h1 style="font-size: 2em;font-weight: bold;color: #d00;margin-bottom: 10px;">欢迎使用京东批量评价助手</h1><p style=" font-size: 1.5em;">本助手由<a href="https://www.abmbio.xin" style="color: red;font-weight:bold;">Tony\'s Blog</a>出品</p><p style="margin: 50px auto 50px;color: #d00;font-size: 1.5em;width: 55%;background: #e3e3e3e8;border-radius: 4px;" id="tony-modal-content">程序暂未执行</p><div><img src="https://www.abmbio.xin/uploads/images/other/tony-tool-reward.png" style="width: 34%;border-radius: 25px;display: inline-block;"><div style="padding: 1em;color: #020202;font-size: 1.2em;font-weight: bold;">赞赏使我进步</div></div><a href="https://jq.qq.com/?_wv=1027&amp;k=5Mv0jez" target="_blank" style="color: #fff;background: #000;padding: 10px 20px;border-radius: 4px;font-weight: bold;font-size: 1.2em;display: inline-block;">加群获取更新</a><p></p></div></div>';
    var time;
    $('body').before(tonyhtml);tj();
    $('#tony-modal-content').text('5秒后开始评价');
    if(AutoVoucher&&path=='/myJdcomments/myJdcomments.action'&&(getQueryString('sort')==0||getQueryString('sort')=='')) {
        setTimeout(review,timer);
        console.log(1);
    }else if(AutoVoucher&&path=='/myJdcomments/myJdcomments.action'&&getQueryString('sort')==1) {
        setTimeout(review2,timer);
        console.log(2);
    }

    function review() {
        var close = document.getElementsByClassName('btn-9 fail-close');
        if (close.length > 0) {
            close[0].click();
        }
        var assess = document.getElementsByClassName('btn-9');
        if(assess.length > 0){
            if (assess[0] != null) {
                for (var i = 0; i < 2; i++) {
                    assess[0].click();
                    var area = document.getElementsByClassName('area area01')[0];
                    area.value = getReview();
                    area.setAttribute('id', 'id' + 0);
                    $('#id' + 0).blur();
                    var star = document.getElementsByClassName('star5')[0];
                    star.click();
                }
                $('#tony-modal-content').text('正在评论...内容：'+getReview());
                var submit = document.getElementsByClassName('btn-5 mr10 setcomment')[0];
                submit.click();
                setTimeout(review, 5000)
            }
        }else{
            $('#tony-modal-content').text('评价完成/没有待评论的订单！！！,正在关闭...');
            setTimeout(function(){
                $('#tony-blog-madal').remove();
            },1000);
        }

    };
    function review2() {
        var close = document.getElementsByClassName('btn-9');
        if (close.length > 0) {
            close[0].click();
            var imgs = document.getElementsByName('imgs1')[0];
            if (imgs != null) {
                imgs.value = "//img20.360buyimg.com/shaidan/jfs/t12547/189/2327028071/28715/657b3999/5a3b4401N966d2c2b.jpg";
                var submit = document.getElementsByClassName('btn-5 mr10 setcomment')[0];
                submit.click();
                time = setTimeout(review2, 5000)
            }
            $('#tony-modal-content').text('正在评论...内容：'+getReview());
        }else {
            $('#tony-modal-content').text('评价完成/没有待评论的订单！！！');
            clearTimeout(time);
            setTimeout(function(){
                $('#tony-blog-madal').remove();
            },1000);
        }
    };
    function getQueryString(name,url) {//筛选参数
        url=(url&&url.match(/\?.*/).toString())||location.search;	//网址传递的参数提取，如果传入了url参数则使用传入的参数，否则使用当前页面的网址参数
        var reg = new RegExp("(?:^|&)(" + name + ")=([^&]*)(?:&|$)", "i");		//正则筛选参数
        var str = url.substr(1).match(reg);
        if (str !== null) return unescape(str[2]);
        return null;
    }
    function tj(){
        var _hmt = _hmt || [];
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?7f9964d6e2815216bcb376aa3325f971";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
    }
    function getReview(){
        var contentArr = ['商品质量很好，很满意，配送速度快啊，而且配送员态度也非常好。',
          '挺好的，非常实用。京东的物流很快哟~希望以后会更快╭(╯3╰)╮',
          '我为什么喜欢在京东买东西，因为今天买明天就可以送到。我为什么每个商品的评价都一样，因为在京东买的东西太多太多了，导致积累了很多未评价的订单，所以我统一用段话作为评价内容。',
          '京东购物这么久，有买到很好的产品，也有买到比较坑的产品，如果我用这段话来评价，说明这款产品没问题，至少85分以上，而比较差的产品，我绝对不会偷懒到复制粘贴评价，我绝对会用心的差评，这样其他消费者在购买的时候会作为参考，会影响该商品销量，而商家也会因此改进商品质量。',
          '当大家看到我的这一篇评价时，表示我对产品是认可的，尽管我此刻的评论是复制黏贴的。这一方面是为了肯定商家的服务，另一方面是为了节省自己的时间，因为差评我会直接说为什么的。所以大家就当作是产品质量合格的意思来看就行了。最后祝京东越做越好，大家幸福平安，中华民族繁荣昌盛。',
          '质量非常好,与卖家描述的完全一致, 真的很喜欢,完全超出期望值,发货速 度非常快,包装非常仔细、严实,物流公司服务态度很好,运送速度很快,很满意的一次购物质量很好, 希望更多的朋友信赖. 店主态度特好, 我会再次光顾的好卖家 赞，发货迅速，态度很好，很满意！很好很好！网上购物这么激烈，没想到店家的服务这么好，商品质量好而价低廉， 很热情的卖家，下次还来希望下次还有机会合作祝你生意兴隆质量非常好，出乎我的意料包装非常仔细。下次有机会再找你，店家人蛮好的，东东很不错,淘到心意的宝贝是一件让人很开心的事',
          '多快好省，京东给力，下次还是要选择京东商城，没错，非常满意',
          '经常网购有大量包裹要收。感觉每次写评论都要花费我大量的时间和精力。所以在一段时间里，我总觉得，不想去写评论，或者是随便写写。但是我又于心不忍。有些对不住那些，京东的客服，送货的送货员，还有仓库管理员等等。于是我写下了一小段话。给予那些我觉得可以获得好五星好评的宝贝评价里面，以示感激和尊敬。首先宝贝的性价比很高。其次，京东的送货员送货速度很快，而且每次都把东西，帮我搬到需要放的地方。特别是像有些大一点的用品，很重的一些东西。而且京东的售后是我特别欣赏的，有时候有些东西买的不合适，只要申请了售后退货，基本上下午都能够来收货。所以办公用品我基本上都选择在京东购买。希望京东能够再接再厉，做得更大更强更好。给客户提供更好的商品以及更好的服务。为京东的商品和服务点赞。',
          '我为什么喜欢在京东买东西，因为今天买明天就可以送到。我为什么每个商品的评价都一样，因为在京东买的东西太多太多了，导致积累了很多未评价的订单，所以我统一用段话作为评价内容。京东购物这么久，有买到很好的产品，也有买到比较坑的产品，如果我用这段话来评价，说明这款产品没问题，至少85分以上，而比较差的产品，我绝对不会偷懒到复制粘贴评价，我绝对会用心的差评，这样其他消费者在购买的时候会作为参考，会影响该商品销量，而商家也会因此改进商品质量。',
          '宝贝是性价比很高的,我每次都会先试用再评价的,虽然宝贝不一定是最好的,但在同等的价位里面绝对是表现最棒的。京东的配送绝对是一流的,送货速度快,配送员服务态度好,每样东西都是送货上门。希望京东能再接再厉，做得更大更强，提供更多更好的东西给大家。为京东的商品和服务点赞。。',
          '非常好，一起买的，价格便宜，快递又快，京东商城还是非常的专业和贴心，可以显示快递的位置，随时掌握快递进度，很先进！',
          '活动期间买的很实惠，京东自营，值得信赖。',
          '便宜好用，值得推荐买买买，同事都说好用。下次继续买买买，哈哈哈…',
          '京东物流就是一个字快，昨晚10点多，11点前下的单今天早上就收到，包装得很好。',
          '京东购物使我们的生活更便捷了！京东商品丰富，无所不有，自营商品更是价格优惠，童叟无欺。快递给力，包装实在。体验足不出户购物的感觉，就在京东！购物就上京东，有京东，足够！',
          '一直上京东商城网购，东西非常不错，价格便宜，物流快，是正品',
          '质量很好，性价比高，值得购买，送货速度快！！',
          '怒赞！（此评论虽仅有两个字，可谓言简意赅，一字千金，字字扣人心弦，催人泪下，足可见评论人扎实的文字功底和信手拈来的写作技巧，再加上以感叹号收尾，点睛之笔，妙笔生花，意境深远，把评论人的感情表达得淋漓尽致，有浑然天成之感，实乃评论中之极品，祝福中之绝笔也）'
         ];
        var content = contentArr[Math.floor(Math.random() * contentArr.length)] + ',很满意，配送速度快啊，而且配送员态度也非常好。';
        return content;
    }
})();