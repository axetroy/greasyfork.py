// ==UserScript==
// @name         分析学城页面浏览量数据
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       @Mimers
// @match        https://km.sankuai.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let title = document.querySelector('div.links');
    let btn = document.createElement('button');
    let pageCount = 0;
    btn.textContent = '分析我的空间浏览量数据';
    btn.style.padding = '0 10px';
    btn.style.height = '100%';
    btn.style.borderRadius = '2px';
    btn.addEventListener('click', showPVStat);
    title.appendChild(btn);

    async function getSpaceId() {
        let spaceId = await(await fetch(`/api/spaces/spaceid?spaceKey=~${__USER_INFO__.login}`)).json();
        return spaceId.data;
    }

    async function getBrowseCount(space, page) {
        return await (await fetch(`/api/pages/${space}/${page}?queryType=0`)).json();
    }

    async function listPages(space, page) {
        let children = await (await fetch(`/api/pages/child/${space}/${page}`)).json();
        return await Promise.all(children.data.list.map(async (c) => {
            let pageData = (await getBrowseCount(space, c.contentId)).data;
            btn.textContent = `正在分析${__USER_INFO__.name}的空间:${c.title}, 已分析${++pageCount}篇`;
            let mc = {
                browseCount: pageData.browseCount,
                browseHeadCount: pageData.browseHeadCount,
                childCount: c.childCount,
                contentId: c.contentId,
                title: c.title
            };
            if (c.childCount) {
                mc.children = await listPages(space, c.contentId);
            }
            return mc;
        }));
    }

    async function listSpace() {
        let id = await getSpaceId();
        let children = await (await fetch(`/api/spaces/child/${id}`)).json();
        return await Promise.all(children.data.list.map(async (c) => {
            let pageData = (await getBrowseCount(id, c.contentId)).data;
            let mc = {
                browseCount: pageData.browseCount,
                browseHeadCount: pageData.browseHeadCount,
                childCount: c.childCount,
                contentId: c.contentId,
                title: c.title
            };
            if (c.childCount) {
                mc.children = await listPages(id, c.contentId);
            }
            return mc;
        }));
    }

    function showPVStat() {
        btn.textContent = `正在分析${__USER_INFO__.name}的空间`;
        pageCount = 0;
        let oldPop = document.querySelector('#_km_posts_stat_');
        if (oldPop) oldPop.parentNode.removeChild(oldPop);
        listSpace().then((allposts) => {
            let flat = [];
            function traverse(p) {
                if (p) flat.push(p);
                if (p.children) p.children.forEach((c) => traverse(c))
            }
            allposts.forEach(traverse);
            function uvSort(a, b) { return b.browseHeadCount - a.browseHeadCount; }

            let pop = document.createElement('div');
            pop.id = '_km_posts_stat_';
            pop.className = 'ant-popover';
            pop.style = `width='100%';
            background: white;
            margin: 20px;
            overflow-y: scroll;
            height: calc(100% - 40px);
            padding: 20px;
            box-shadow: 0 2px 10px 0;
            left: initial;
            right: 20px;
            border-radius: 8px;`;
            let tds = '<table><tr><th>id</th><th>title</th><th style="padding:0 12px">pv</th><th>uv</th></tr>';
            flat.sort(uvSort).forEach((p) => { tds += `<tr><td><a href='https://km.sankuai.com/page/${p.contentId}'>${p.contentId}</a></td><td>${p.title}</td><td>${p.browseCount}</td><td>${p.browseHeadCount}</td>` })
            pop.innerHTML += tds + '</table>';
            document.body.appendChild(pop);
        });
    }

})();