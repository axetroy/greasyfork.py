// ==UserScript==
// @name         NGA_parse_uid
// @version      0.24
// @author       Inazuma
// @match        https://nga.178.com/*
// @match        https://bbs.ngacn.cc/*
// @match        https://bbs.nga.cn/*
// @match        http://nga.178.com/*
// @match        http://bbs.nga.cn/*
// @match        http://bbs.ngacn.cc/*
// @grant        none
// @namespace    https://greasyfork.org/users/163468
// @description  在未登录/实名NGA时解析uid为用户名
// ==/UserScript==

(() => {
    const pattern = 'nuke.php?func=ucp&uid=';
    const fetchedInfo = {};
    [...document.querySelectorAll(`a[href*="${pattern}"]`)].map((v, i) => {
        const uid = v.href.split(pattern)[1];
        const setInfo = () => {
            v.innerText = fetchedInfo[uid].username;
            const avatarDiv = v.parentNode.parentNode;
            if (avatarDiv.className === 'posterinfo' && !(avatarDiv.childNodes[1].className === 'avatar') && fetchedInfo[uid].avatar) {
                const img = document.createElement('img');
                img.style = 'max-width:280px;';
                img.className = 'avatar';
                img.setAttribute('src', fetchedInfo[uid].avatar);
                avatarDiv.insertBefore(img, avatarDiv.childNodes[1]);
            }
        }

        if (fetchedInfo[uid]) {
            setInfo();
        } else {
            fetch(`/nuke.php?uid=${uid}&__output=12&__act=get&__lib=ucp`).then(res => res.json()).then(res => {
                //uid to username
                const username = res.result.username;

                //add avatar
                let avatar = res.result.avatar;
                if (avatar) {
                    if (avatar.indexOf("{") >= 0) {
                        avatar = JSON.parse(avatar);
                        avatar = avatar[`${parseInt(Math.random() * avatar.l)}`];
                    }
                    if (avatar.indexOf("http") < 0 || (avatar.indexOf("bbs") >= 0 && avatar.indexOf('ngabbs') < 0)) {
                        let hex = parseInt(avatar.match(/[0-9]+/)[0]).toString(16);
                        const file = avatar.match(/[0-9].*/)[0];
                        avatar = "http://img.ngacn.cc/avatars/2002/";

                        while (hex.length < 9) {
                            hex = `0${hex}`;
                        }
                        hex = hex.match(/.{1,3}/g);
                        for (let i = hex.length - 1; i >= 0; i--) {
                            avatar += `${hex[i]}/`;
                        }
                        avatar += file;
                    }

                }
                fetchedInfo[uid] = { avatar: avatar, username: username };
                setInfo();
            });
        }
    });

    [...document.querySelectorAll('a[href="被禁止的链接"]')].map((v, i) => {
        let link;
        if (v.parentNode.className !== 'nobr') {
            link = v.previousElementSibling.firstChild.innerText.replace(/<[^>]+>/g, '');
            v.setAttribute('href', link);
            v.innerText = v.innerText.replace(/被禁止的链接/g, link);
        } else {
            link = v.parentNode.parentNode.firstChild.innerText.replace(/<[^>]+>/g, '');
            v.setAttribute('href', link);
        }
    });
})();