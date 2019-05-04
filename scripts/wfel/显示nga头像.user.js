// ==UserScript==
// @name         显示nga头像
// @namespace    http://tampermonkey.net/
// @version      0.2.3
// @description  在正常模式和lite模式下无视内容长度显示用户头像
// @author       wfel
// @match        *://bbs.ngacn.cc/read.php*
// @match        *://bbs.nga.cn/read.php*
// @match        *://nga.178.com/read.php*
// @match        *://ngabbs.com/read.php*
// @grant        none
// ==/UserScript==

(function() {
    // from js_commonui.js line 3075
    commonui.avatarUrl = function(y, uid) {
        if (y.charAt(0) == '.' && (i = y.match(/^\.a\/(\d+)_(\d+)\.(jpg|png|gif)\?(\d+)/)))
            y = __AVATAR_BASE_VIEW + '/' + ('000000000' + (i[1] | 0).toString(16)).replace(/.+?([0-9a-z]{3})([0-9a-z]{3})([0-9a-z]{3})$/, '$3/$2/$1') + '/' + i[1] + '_' + i[2] + '.' + i[3] + '?' + i[4]
        else if (y.charAt(0) == 'h' && y.match(/^https?:\/\/([^\/]+)\//)) {
            //if (!y.match(_ALL_IMG_HOST_REG) && uid != window.__CURRENT_UID)
            //    y = ''
            //some of the old attach servers can not be detected
        } else if (y)
            y = __IMGPATH + '/face/' + y
        else
            y = ''
        if (this.correctAttachUrl)
            y = this.correctAttachUrl(y)
        return y
    }
    function createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString;

        // Change this to div.childNodes to support multiple top-level nodes
        return div.firstChild;
    }

    function fix(parents, lite) {
        var uindex = 0;
        var uinfo = {};
        var udata = {};
        var avatarElem;
        // 是否显示图像由cLen（uinfo.cLength）和udata.vsmall共同控制
        // cLength由contentC.innerHTML.length控制（页面未渲染前的字符数量）或者由后端计算（一般都由后端计算）
        // cLength在js_read.js的320行被重写，长度变为渲染后contentC的直接孩子结点中的文本节点内的文本总长度（算法有误）
        // vsmall：屏幕大小，继承自commonui.postArg.def
        // lite在js_read.js的330行被重写，根据内容长度和postnum决定lite的值(postnum是否>20与是否显示头像似乎无关)
        // bug是cLength的计算方法导致的

        for(var iter = 0; iter < parents.length; ++iter)
        {
            if(parents[iter].querySelector('img.avatar')) {
                console.log('next of ' + iter + ' is img');
                continue;
            }
            console.log('element ' + iter);
            uindex = parseInt(parents[iter].id.toString().slice(10), 10);
            udata = commonui.postArg.data[uindex];
            uinfo = commonui.userInfo.users[udata.pAid];
            console.log('avatar is ' + uinfo.avatar);
            var avatarHTML = commonui.posterInfo.avatar(uindex, lite, uinfo.avatar, uinfo.buffs, udata ? udata.atItem :null, udata.pAid);
            avatarHTML.trim();
            console.log('elem html is ' + avatarHTML);
            if(avatarHTML) {
                avatarElem = createElementFromHTML(avatarHTML);
                if(lite & 1 && !parents[iter].querySelector('div.right')) {
                    // lz
                    avatarElem = parents[iter].insertBefore(avatarElem, parents[iter].childNodes[0]);
                } else {
                    // ls
                    avatarElem = parents[iter].insertBefore(avatarElem, parents[iter].childNodes[1]);
                }
                if(lite & 1)
                {
                    parents[iter].insertBefore(createElementFromHTML('&nbsp;'), avatarElem.nextSibling);
                }
            }
        }
    }

    var nextChilds = document.querySelectorAll('td.c1 > span.posterinfo > div:first-child');
    var parents;
    var lite = 2;
    if(nextChilds.length !== 0) {
        parents = document.querySelectorAll('td.c1 > span.posterinfo');
    } else {
        parents = document.querySelectorAll('td.c2 > span.posterInfoLine');
        lite |= 1;
    }
    fix(parents, lite);
})();