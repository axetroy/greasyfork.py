// ==UserScript==
// @name         bilibili右键简单下载所点击图片(支持所有位置的点击)
// @namespace    http://tampermonkey.net/
// @version      0.7.7
// @description  右键点击图片以下载(支持头像下载，番剧封面下载，视频封面下载，专栏图片下载，直播封面下载,甚至还有首页和空间上那一横条的下载)
// @author       Derek Chen
// @match        https://www.bilibili.com/
// @include      *://www.bilibili.com/video/av*
// @include      *://www.bilibili.com/read/cv*
// @include      *://t.bilibili.com/*
// @include      *://space.bilibili.com/*
// @include      *://www.bilibili.com/*
// @include      *://h.bilibili.com/*
// @include      *://game.bilibili.com/*
// @include      *://live.bilibili.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let img_num = 0,
        current_img_type = null,
        img_list = [],
        action = {
            for_mask_video: (e) => {

                if (e.parentNode.firstChild.nodeName === 'DIV') {
                    let link = e.parentNode.firstChild.firstChild.src;

                    link = get_full_size_link(link);

                    download_img(link);

                } else {
                    let link = e.parentNode.firstChild.src;

                    link = get_full_size_link(link);

                    download_img(link);
                }
            },
            for_card_mark: (e) => {
                if (e.className === 'title') {
                    let link = e.parentNode.parentNode.firstChild.src;

                    download_img(get_full_size_link(link));

                } else if (e.className === 'card-mark') {
                    let link = e.parentNode.firstChild.src;

                    download_img(get_full_size_link(link));
                }
            },
            for_background_src: (e) => {
                if (e.className === 'img-content') {
                    let link = e.style.backgroundImage;
                    link = get_full_size_link(link.substring(5, link.length - 2));
                    download_img('https://' + link);
                } else {
                    let link = e.style.backgroundImage;
                    link = get_full_size_link(link.substring(5, link.length - 2));
                    download_img(link);
                }
            },
            for_danmu_module: (e) => {
                let link = e.previousSibling.previousSibling.src;
                download_img(get_full_size_link(link));
            },
            for_fake_danmu: (e) => {
                download_img(get_full_size_link(e.parentNode.firstChild.src));
            },
            for_user_head_has_decoration: (e) => {
                let link = e.parentNode.previousSibling.firstChild.src;
                link = get_full_size_link(link);
                check_identical(link);
                download_img(link);
            },
            for_streak: (e) => {
                let link = e.parentNode.style.backgroundImage;
                link = get_full_size_link(link.substring(5, link.length - 2));
                download_img('https://' + link);
            }
        },
        reset = false,
        first_left_click = false;

    document.body.oncontextmenu = (e) => {
        if (!reset) {
            e.preventDefault();
            reset = true;
        } else {
            reset = false;
        }
    };

    document.body.onmouseup = (e) => {
        if (e.button === 2) {
            search_src(e.path[0]);
        }else{
            reset = false;
            if(e.path[0] === document.getElementById('pop')){
                document.getElementById('pop').style.top = '0px';
            }else{
                if(first_left_click){
                    document.getElementById('pop').style.top = '-510px';
                    first_left_click = false;
                }else{
                    document.getElementById('pop').style.top = '-480px';
                    first_left_click = true;
                }
            }
        }
    };

    function search_src(e) { //这里的e是点击元素路径的第一个元素

        if (has_class(e)) {
            try {
                switch (e.className) {
                    case 'mask-video':
                    case 'mask':
                        action.for_mask_video(e);
                        break;
                    case 'title':
                    case 'card-mark':
                        action.for_card_mark(e);
                        break;
                    case 'banner-link':
                        action.for_streak(e);
                        break;
                    case 'cover-image loaded':
                    case 'user-head c-pointer':
                    case 'img-content':
                    case 'h-inner':
                    case 'banner-img-holder':
                        action.for_background_src(e);
                        break;
                    case 'danmu-module':
                        action.for_danmu_module(e);
                        break;
                    case 'danmu-module show':
                        action.for_danmu_module(e);
                        alert('因为b站preview图片的特殊性，所以不支持preview图片下载');
                        break;
                    case 'fake-danmu':
                    case 'fake-danmu-mask':
                        action.for_fake_danmu(e);
                        break;
                    default:
                        broad_issue_solver(e,2);
                        return;
                }
            } catch (error) {
                console.log(`<easy_download>-an error has occurred:${error}`);
                broad_issue_solver(e,2);
            }

        } else { //这里应该是纯img标签点击，但还是需要检查是否是带装饰的用户头像
            let link = e.src;
            if (e.parentNode.className === 'pendant') {
                action.for_user_head_has_decoration(e);
            } else {
                check_identical(link);
                download_img(get_full_size_link(link));
            }
        }
    }

    function has_class(e) {
        return !!e.className;
    }

    function pop_initiate() {
        let d = document.createElement("div");
        d.setAttribute('id', 'pop');
        d.setAttribute('style', `
            width:${window.innerWidth / 4}px;
            min-height:100px;
            position:fixed;
            top:-300px;
            left:${window.innerWidth / 3}px;
            border:solid 1px gray;
            border-radius:10px;
            background:#d2d7e0;
            z-index:99999;
            transition-duration: 500ms;
            max-height:500px;
            overflow :auto;
        `);
        document.body.appendChild(d);
    }

    window.onresize = ()=>{
        let e = document.getElementById('pop'),
            img_list = e.getElementsByTagName('img');
        e.style.width = `${window.innerWidth/4}px`;
        e.style.left = `${window.innerWidth/3}px`;
        for(let img in img_list){
            try {
                img_list[img].style.marginLeft = `${(parseFloat(e.style.width)-45) / parseFloat(img_list[img].style.width) >= 2 ? (parseFloat(e.style.width) - (2 * parseFloat(img_list[img].style.width))) / 4 : (parseFloat(e.style.width) - (parseFloat(img_list[img].style.width))) / 2}px`;
            }catch (e) {
                console.log(`<easy_download>-compile error`);
            }
        }
    };

    function pop(list) {
        let n = list.length;
        for(let v = 0;v<2;v++){
            if(!list[v].includes('https://')){
                list[v] = 'https://'+ list[v];
            }
        }
        let e = document.getElementById("pop");

        e.style.top = '0px';
        e.innerHTML = `
            <p style="font-size:15px;">&emsp;&emsp;你想下载哪张图片？(&nbsp;<i>右键下载</i>&nbsp;)</p>
        `;
        for(let i = 0;i<n;i++){
            //<a href="${list[1]}" download="download.jpg"><img style="position: relative;width: 150px;margin-left: 4px;" src="${list[1]}"></a>
            let img = new Image();
            img.style = `
                position: relative;
                width: 150px;
                margin-left : ;
                margin-bottom : 10px;
                float:left;
                transition-duration:50ms;
            `;
            img.src = `${list[i]}`;
            img.style.marginLeft=(parseFloat(e.style.width) - parseFloat(img.style.width))/ 12+'px';
            e.appendChild(img);
        }
        document.getElementById('pop').onmouseup = (e)=>{
            if(e.button === 2){
                document.getElementById('pop').style.top = '-500px';
            }
        }
    }

    function broad_issue_solver(element,depth) {

        pop_initiate();

        console.log(`<easy_download>-Broad_Issue_solver initiated.`);

        let target_elements = [],
            good_links = [];

        function get_parent_nodes(e, d) {
            let i = 0,
                result = [e];
            for (i; i < d; i++) {
                result[i + 1] = result[i].parentNode
            }
            result.splice(0, 1);
            return result[result.length - 1];
        }

        function get_all_target_elements(e) { // parent = arr
            get_children(e);
        }

        function has_children(e) {
            return e.children[0] !== undefined;
        }

        function get_children(e) { // return every child in this parent node
            let c = e.children;    // this recursive can return 6,000 - 10,000 nodes in 1 ms

            Object.keys(c).forEach(function (key) {

                if (has_children(c[key])) {
                    target_elements.push(c[key]);
                    get_children(c[key]);
                } else {
                    target_elements.push(c[key]);
                }
            });

        }

        function suitable_target(e) { // if this element is suitable
            return {
                bool: e.style.backgroundImage !== '' ? true : e.nodeName === 'IMG',
                type_num: e.style.backgroundImage !== '' ? 1 : e.nodeName === 'IMG' ? 2 : null
            }
        }

        function get_type(l) {

            if (l.includes('url')) {
                let length = l.length,
                    start = l.lastIndexOf('.');
                if(l.includes('@')){
                    l = get_full_size_link(l);
                    start = l.lastIndexOf('.');
                    return l.substring(start, length);

                }else{
                    return l.substring(start, length-2);
                }
            } else {
                let start = l.lastIndexOf('.');
                return l.substring(start);
            }
        }

        function suitable_type(e, n) {
            if (n === 1) {
                let link = e.style.backgroundImage,
                    type = get_type(link),
                    length = link.length;
                link = get_full_size_link(link.substring(5,length - 2));
                return {
                    bool: type === '.jpg' ? true : type === '.png' ? true : type === 'gif',
                    link: link
                }
            } else {
                let link = get_full_size_link(e.src),
                    type = get_type(link);
                link = get_full_size_link(link);
                return {
                    bool: type === '.jpg' ? true : type === '.png' ? true : type === 'gif',
                    link: link
                }
            }
        }

        function good_link(link){
            return `https://${link}`
        }

        function no_repeat(array){
            let n = [];
            for(let d = 0; d < array.length; d++){
                if (n.indexOf(array[d]) === -1) n.push(array[d]);
            }
            return n;
        }

        function search(element, depth) {
            let d = depth || 2,
                parent_nodes = get_parent_nodes(element, d); // single element

            get_all_target_elements(parent_nodes); // here the variable 'target_elements' is usable

            target_elements.push(parent_nodes);
            for (let el in target_elements) {
                let suitable = suitable_target(target_elements[el]).bool,
                    type_num = suitable_target(target_elements[el]).type_num;
                if (suitable) {
                    let right_link = suitable_type(target_elements[el], type_num).bool,
                        link = suitable_type(target_elements[el], type_num).link;
                    if (right_link) {
                        if(!link.includes('https://')){
                            good_links.push(good_link(link));
                        }else{
                            good_links.push(link);
                        }
                    }
                }
            }
        }

        search(element,depth);

        good_links = no_repeat(good_links);

        if(good_links.length >=2){
            pop(good_links);
        }else{
            download_img(good_links[0]);
        }
    }

    function clean_link(link) { //如果一个链接以双slash开头，下载会失败
        if (link.indexOf('//') === 0) {
            return link.substring(2);
        } else if (link.indexOf("&") === 0) {
            return link.substring(6);
        } else {
            return link;
        }
    }

    function get_full_size_link(link) { //如果链接内存在@，那么就表示此照片并非原始分辨率

        let result = null;
        link = clean_link(link);

        if (link.lastIndexOf('@') === -1) {
            return link;
        } else {
            let chope_position = link.indexOf('@');
            result = link.substring(0, chope_position);
        }

        return result;
    }

    function check_identical(link) {
        if (img_list.length !== 0) {
            for (let i = 0; i < img_list.length; i++) {
                if (link === img_list[i]) {
                    return true;
                }
            }
        }
        return false;
    }

    function download_img(link) { //下载图片

        if (check_identical(link)) {
            alert("已经下载过这张图片啦!");
            return;
        }

        link = get_full_size_link(link);

        current_img_type = link.substring(link.lastIndexOf("."));

        img_list[img_num] = link;

        img_num++;

        if (link.indexOf('https://') !== 0) {
            link = 'https://' + link;
        }

        fetch(link).then(res => res.blob()).then(blob => { //创建临时a标签以下载图片

            let a = document.createElement('a');

            a.style.display = 'none';
            a.href = URL.createObjectURL(blob);
            a.download = `new_download${img_num + current_img_type}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            link = '';
        });
    }
})();
