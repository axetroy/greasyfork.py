// ==UserScript==
// @name         大千发帖用户屏蔽
// @namespace    http://tampermonkey.net/
// @version      v0.3
// @description  根据发帖用户 id 屏蔽大千帖子或者删除帖子
// @author         flower2016
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include        http://bbs.wenxuecity.com/finance/*
// ==/UserScript==



var blockedList=[

    "id1",
    "id2",
    "id3"
];



// 可以看到被屏蔽人在发帖，但是贴的内容被屏蔽。
for (var i = 0; i < blockedList.length; i ++)
{
    var x = document.querySelectorAll('.b a[href$=\"'+encodeURI(blockedList[i])+'\"]');
    for (var j = 0; j < x.length; j++)
    {
        var y = x[j].parentElement.parentElement.firstElementChild;
        y.removeAttribute("href");
        y.innerText = "blocked";
    }
}

/* 把被屏蔽人的帖子删除。
for (var i = 0; i < blockedList.length; i ++)
{
    var x = document.querySelectorAll('.b a[href$=\"'+encodeURI(blockedList[i])+'\"]');
    for (var j = 0; j < x.length; j++)
    {
        var y = x[j].parentElement.parentElement;
        y.remove();
    }
}
*/