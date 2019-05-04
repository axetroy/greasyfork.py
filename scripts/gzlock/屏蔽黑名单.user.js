// ==UserScript==
// @name         屏蔽黑名单
// @description  适用于lkong.cn的首页和版块的帖子列表以及帖子内容的楼层列表的过滤，你将无法看到黑名单中的人!
// @namespace    http://lkong.cn/
// @version      0.61
// @author       碌木
// @match        http://lkong.cn/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

var indexUrlPattern = /sars=index\//;
var forumUrlPattern = /sars=forum\/\d+/;
var threadUrlPattern = /sars=thread\/\d+/;
var time = 100;
var blackListId = [];
var $list;
var loop = function () {
    if (window.jQuery && window._)
        execute();
    else
        setTimeout(loop, time);
};
loop();

function execute() {
    console.log("开工啦!");
    blackListId = StringToList(GetBlackList());
    InertDataFilter();
    setTimeout(InsertBlackListManager, 800);
    setInterval(CheckManagerExists, 1000);
    $(document).on('click', '.bk-button', function () {
        var $this = $(this);
        var uid = parseInt($(this).attr('uid'));
        if (_.isNaN(uid))
            return;
        if (IdInBlackList(uid))
            blackListId.splice(blackListId.indexOf(uid), 1);
        else
            blackListId[blackListId.length] = uid;
        SaveBlackList();
        $('.bk-manager-input').val(ListToString());
    });
}

//插入黑名单过滤器
function InsertBlackListManager() {
    $list = $('<div class="bk-manager" style="z-index:999;position:fixed;bottom:0;right:0;padding:5px;background:white;border:1px solid #000;"><div class="clicker" style="cursor:pointer;font-size:14px;">管理黑名单</div><div class="toggle"><button>读取龙空自带的黑名单</button><br><textarea style="width:300px;height:100px;" placeholder="1,2,3" class="bk-manager-input"></textarea></div></div>');
    var $toggle = $list.find('.toggle');
    var $input = $list.find('textarea');
    $list.find('button').click(SyncWithLKongBlackList);
    $list.find('div.clicker').click(function () {
        $toggle.slideToggle();
    });
    $input.bind('input', function () {
        blackListId = StringToList($input.val());
        SaveBlackList();
    });
    if (blackListId.length > 0) {
        $input.val(ListToString());
    }
    $(document.body).append($list);
    $toggle.slideToggle();
}

//不断检查管理器是否存在
function CheckManagerExists() {

    if ($('.bk-manager').length === 0)
        InsertBlackListManager();

    var $posts = $('div.st_post , div.postlist[id]');

    //在看得到帖子内容的页面
    if ($posts.length > 0) {
        $posts.each(function () {
            var $this = $(this);
            var $button = $this.find('.bk-button');
            if ($button.length == 0) {
                var uid = $this.find('a[dataitem^="user"]').attr('dataitem').split('_')[1];
                var inBlackList = IdInBlackList(uid);
                var content = inBlackList ? '解除屏蔽' : '屏蔽';
                $this.find('.st_post_bar').append('<button class="bk-button" uid="' + uid + '">' + content + '</button>');
            }
        });
    }
    //在用户资料页面
    var $userbar = $('div.user_bar , div.smalluser_bar');
    if ($userbar.length > 0 && $userbar.find('.bk-button').length == 0) {
        var $user = $userbar.find('span[data-action^="uid"]');
        if ($user.length > 0) {
            var uid = $user.attr('data-action').split('-')[1];
            var inBlackList = IdInBlackList(uid);
            var content = inBlackList ? '解除屏蔽' : '屏蔽';
            $userbar.append('<button class="bk-button" uid="' + uid + '">' + content + '</button>');
        }
    }
}

function SaveBlackList() {
    window.localStorage.setItem('blackList', ListToString(blackListId));
}
function ListToString() {
    return _.uniq(blackListId).join(',');
}
function StringToList(string) {
    if (_.isEmpty(string))
        return [];
    return _.uniq(string.split(/[,，]/).map(Number));
}
function GetBlackList() {
    return window.localStorage.getItem('blackList') || '';
}
function IdInBlackList(id) {
    id = parseInt(id);
    if (!(id > 0))
        return false;
    return blackListId.indexOf(id) >= 0;
}

//插入数据过滤器
function InertDataFilter() {
    window.jQuery.ajaxSetup({
        dataFilter: function (data, type) {
            if ((indexUrlPattern.test(this.url) || forumUrlPattern.test(this.url)) && this.url.indexOf('checkrenew') == -1)
                data = Filter1(data);
            else if (threadUrlPattern.test(this.url))
                data = Filter2(data);
            return data;
        }
    });
}

//首页及版块
function Filter1(data) {
    data = JSON.parse(data);
    data.data = _.filter(data.data, function (item) { return !IdInBlackList(item.uid); });
    /*_.each(data.data, function (item) {
        if (IdInBlackList(item.uid)) {
            item.subject = '<span style="color:#ff0000">被屏蔽</span>';
        }
    });*/
    return JSON.stringify(data);
}
//帖子的楼层
function Filter2(data) {
    data = JSON.parse(data);
    data.data = _.filter(data.data, function (item) { return !IdInBlackList(item.authorid); });
    /*_.each(data.data, function (item) {
        if (IdInBlackList(item.authorid)) {
            item.message = '<p style="color: rgb(255, 0, 0);">此人已经被屏蔽</p>';
        }
    });*/
    return JSON.stringify(data);
}

//同步龙空自带的黑名单
function SyncWithLKongBlackList() {
    $.get('http://lkong.cn/setting/index.php?mod=ajax&action=getblack').success(function (html) {
        var $html = $(html);
        $html.find('a[dataitem]').each(function () {
            var $this = $(this);
            var uid = $this.attr('dataitem').split('_')[1];
            blackListId[blackListId.length] = parseInt(uid);
            SaveBlackList();
            $('.bk-manager-input').val(ListToString());
        });
        alert('同步完成');
    });
}