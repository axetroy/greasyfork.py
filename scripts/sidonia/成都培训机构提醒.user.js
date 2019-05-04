// ==UserScript==
// @name        成都培训机构提醒
// @namespace   xx_nova
// @description  过滤培训机构
// @include     http*://www.lagou.com/jobs/*
// @include     http*://www.lagou.com/gongsi/*
// @include     http*://*.huibo.com/*.html*
// @include     http*://*.zhaopin.com/*.htm*
// @include     http*://*.zhaopin.com/job/*
// @exclude     http*://special.zhaopin.com/*
// @include     http*://www.liepin.com/job/*.shtml*
// @include     http*://www.liepin.com/company/*
// @include     http*://jobs.51job.com/*.html*
// @include     http*://*.58.com/*.shtml*
// @exclude     http*://*.58.com/job.shtml*
// @include     /^https?://qy\.58\.com/\d+/*/

// @version     1.0
// @grant       GM_getResourceText
// @resource    dadi_pxjg_page_url https://www.w3cvip.org/topics/77
// @resource    cdpx_1_url http://www.zhizhang.com/xinwen-13131/
// ==/UserScript==
(function () {
    var dadi_pxjg_page = GM_getResourceText('dadi_pxjg_page_url');
    var dadi_pxjg_page_1 = GM_getResourceText('cdpx_1_url');
    var filter_words = [
        '成都', '成都市','锦江','锦江区','武侯','武侯区','青羊','青羊区','高新','高新区','双流', '北京市', '北京', '上海市', '上海', '深圳市', '深圳',
        '网络', '科技', '信息', '技术', '咨询', '计算机', '系统', '软件', '工程',
        '地产', '物业', '广告', '文化', '传播', '传媒', '教育', '交流', '服务',
        '商贸', '商务', '人才', '商业', '管理', '股份', '发展', '有限','无限','责任',
        '实业', '集团','分公司', '公司',
        '招聘信息', '招聘',
        '（', '）', '(', ')',
    ];
    var blackList = '成都羽帆科技培训公司,成都博宏雅管理有限公司,宏雅有限公司,魔雳网络,成都正清合科技有限责任公司,四川八米装饰设计有限公司,四川中成智谷信息科技有限公司,云软互联(北京)科技有限公司,成都龙鼎腾商贸有限公司,成都无线城市科技有限公司,成都软通启力软件有限公司,成都期汇乐信息技术有限公司,四川晟佳元科技有限公司,成都金万邦科技有限公司,长沙恭齐网络科技有限公司,成都惠通睿达科技有限公司,成都异想天开科技有限公司,广州动点网络科技有限公司,北京欣如信科技有限公司,四川天信恒讯科技有限公司,四川格智网络科技有限公司,北京才秀人人科技有限公司成都分公司,成都火才人才科技有限公司,成都爱梯时代科技有限公司,成都小螺号科技有限公司,上海芒橙网络科技有限公司,成都时代连邦软件有限公司,四川源码时代科技有限公司,成都市婷宝实业科技有限公司,成都众软科技有限公司,四川乐峰互动科技有限公司,成都才秀人人科技有限公司,成都艾克斯尔文化传播有限公司,成都墨点科技有限公司,成都博睿思科技有限公司,四川魔力风暴科技有限公司,甲骨文成都兴学分公司,成都伟韧科技有限公司,火才人才科技,八米装饰,成都华信智原科技有限公司,成都华信智原科技有限公司,成都拾得科技有限公司,四川大地锦城影视文化传媒有限公司,成都御雪网络科技有限公司,成都三个字信息技术有限公司,成都谢尔科技有限公司,成都东科鼎力科技有限公司,成都暮光时代科技有限公司,升凯科技有限公司,成都多迪网络科技有限公司,慧与信息技术成都有限公司,成都阿甲时代科技有限公司,成都汇能创科科技有限公司,成都新维视野科技有限公司,成都华炜云商科技有限公司,成都优艺互动科技有限公司,成都汇聚隆网络科技有限公司,成都天纵世纪科技有限公司,成都智育互动科技有限公司,成都世纪云创科技有限公司,成都蓝亚信息有限公司,成都尚非科技有限公司,上海择彦网络科技有限公司 ,成都蜗牛学院,成都数创智慧科技有限公司,华为高科(北京)软件有限公司,北京托普云数据技术有限公司,百单网互联网有限公司,成都牛牛牛信息技术有限公司,成都法赛特科技有限公司,成都米可科技有限公司,慧与信息技术成都有限公司,成都互动维科软件有限公司,成都触控未来科技有限公司,大秦宏运科技,成都新维视野科技有限公司,成都全阶魔方电子商务,成都火才,成都智云汇通科技有限公司,成都天时利教育科技有限公司,成都智通恒达科技有限公司,成都云创科技有限公司,成都智云汇通科技有限公司';
    var year = new Date().getFullYear();
    var websites = ['lagou.com', 'huibo.com', 'zhaopin.com', 'liepin.com',
                    '51job.com', '58.com'];
    var website = document.domain;
    for (var i=0; i<websites.length; i++) {
        if (website.indexOf(websites[i]) != -1) {
            website = websites[i];
            break;
        }
    }
    var gongsi = "";
    
    switch(website)
    {
        case "lagou.com":
            if(document.URL.indexOf("gongsi") != -1){
                gongsi = document.title.split('_') [0].split('【') [1];
            } else if(document.URL.indexOf("jobs") != -1){
                gongsi = document.title.split('-') [1];
            }
            break;
        case "huibo.com":
            if(document.URL.indexOf("qiye") != -1){
                gongsi = document.title.split('_') [0];
            } else {
                gongsi = document.title.split('_') [1].split('-') [0];
            }
            break;
        case "zhaopin.com":
            if(document.URL.indexOf("company") != -1){
                gongsi = document.title.split('_') [0];
            } else if(document.URL.indexOf("jobs") != -1){
                gongsi = document.title.split('】') [0].split('_') [1];
            }
            break;
        case "liepin.com":
            filter_words.push(year, '最新');
            if(document.URL.indexOf("company") != -1){
                gongsi = document.title.split('】') [0].split('【') [1];
            } else if(document.URL.indexOf("job") != -1){
                gongsi = document.title.split('】') [1].split('-') [0];
            }
            break;
        case "51job.com":
            if(document.URL.indexOf("all") != -1){
                gongsi = document.title.split('【') [1].split('_') [0];
            } else {
                gongsi = document.title.split('】') [0].split('_') [2];
            }
            break;
        case "58.com":
            filter_words.push('2018', year, '最新');
            if(document.URL.indexOf(".shtml") != -1){
                gongsi = document.title.split('_') [1].split(' ') [0];
            } else {
                gongsi = document.title.split('_') [0];
            }
            break;
        default:
            return;
    }
    
    if (gongsi !== '' && gongsi.indexOf('教育') != - 1) {
        alert('小心！名字中有教育，可能是培训机构！');
    }
    if (gongsi !== '' && gongsi.indexOf('学') != - 1) {
        alert('小心！名字中有学校/学院/学习，可能是培训机构！');
    }
    if (gongsi !== '' && gongsi.indexOf('培') != - 1) {
        alert('小心！名字中有培训/培养，一定是培训机构！');
    }
    if (gongsi !== '' && gongsi.indexOf('人力') != - 1) {
        alert('小心！名字中有人力，可能是中介或者培训机构！');
    }
    
    for (var j = 0; j < filter_words.length; j++) {
        gongsi = gongsi.replace(filter_words[j], '');
    } 
    
    console.log('----------------------------------'+gongsi+'-----------------------------------------');
    if (gongsi !== '' && dadi_pxjg_page.indexOf(gongsi) != - 1) {
        var r=confirm("小心！可能是培训机构！点击确定查看详情,点击取消关闭");
        if (r){
            window.open("https://www.w3cvip.org/topics/77");
        }else{
             window.close();
        }
        
        //alert('小心！可能是培训机构！https://www.w3cvip.org/topics/77');
    }
    if (gongsi !== '' && dadi_pxjg_page_1.indexOf(gongsi) != - 1) {
        var r2=confirm("小心！可能是培训机构！点击确定查看详情,点击取消关闭");
        if (r2){
            window.open("http://www.zhizhang.com/xinwen-13131/");
        }else{
             window.close();
        }
        //alert('小心！可能是培训机构！http://www.zhizhang.com/xinwen-13131/');
    }
    
    
    if (gongsi !== '' && blackList.indexOf(gongsi) != - 1) {
         var r3=confirm("小心！一定是培训机构！点击确定关闭页面");
        if (r3){
            window.close();
        }else{
             window.close();
        }
    }
    
    
}) ();
