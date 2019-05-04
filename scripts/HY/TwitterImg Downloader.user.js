 // ==UserScript==
 // @name         TwitterImg Downloader
 // @namespace    TypeNANA
 // @version      0.5
 // @description  Add a picture download button to Twitter, and click to download the original image named by format.
 // @author       HY
 // @match        https://twitter.com/
 // @include      https://twitter.com/*
 // @require      http://code.jquery.com/jquery-3.3.1.min.js
 // @grant        none
 // ==/UserScript==

 (function () {
    /** 修改 defaultFileName 可改变默认文件名格式
     *
     *  <%Userid>  画师的推特ID，如 “shiratamacaron”
     *  <%Name>    【慎用】画师的推特名，如 “しらたま”，可能会有无法作为文件名的字符出现
     *  <%Tid>     图片源的推文id，如 “1095705491429158912”
     *  <%Time>    保存时间，13位时间戳，如 “1550557810891”
     *  <%PicName> 图片的默认文件名，如 “DzS6RkJUUAA_0LX”
     *  <%PicNo>   图片在推中的序数，即推中的第几张图片，从0开始计数，如 “0”
     *
     *  建议使用<%Time>、<%PicName>和<%PicNo>中的至少使用一个来作为图片区分
     *  默认格式为 “<%Userid> <%Tid> <%PicName>” ，效果为 “shiratamacaron 1095705491429158912 DzS6RkJUUAA_0LX”
     *  推荐格式１ “<%Userid> <%Tid>_p<%PicNo>” ，效果为 “shiratamacaron 1095705491429158912_p0”
     *  推荐格式２ “<%Tid>_p<%PicNo>” ，效果为 “1095705491429158912_p0”
     */
    let defaultFileName = "<%Userid> <%Tid> <%PicName>";

    function download(url, name, view) {
        //通过fetch获取blob
        fetch(url).then(response => {
            if (response.status == 200)
                return response.blob();
            throw new Error(`status: ${response.status}.`)
        }).then(blob => {
            downloadFile(name, blob, view)
        }).catch(error => {
            console.log("failed. cause:", error)
        })
    }

    function downloadFile(fileName, blob, view) {
        //通过a标签的download属性来下载指定文件名的文件
        const anchor = view;
        const src = URL.createObjectURL(blob);
        anchor.download = fileName;
        anchor.href = src;
        view.click();
    }

    const addDownloadButton = () => {
        let tweets = document.querySelectorAll('.tweet');
        tweets.forEach((t) => {
            //忽略视频信息
            if (t.getElementsByClassName("PlayableMedia").length > 0) return;
            //文件名信息
            let dl_userid = t.getAttribute("data-screen-name");
            let dl_name = t.getAttribute("data-name");
            let dl_tid = t.getAttribute("data-tweet-id");
            //尝试获取发推时间，但是部分情况无法获取，故采用保存文件时间
            //let dl_time = t.getElementsByClassName("_timestamp")[0].getAttribute("data-time");
            let dl_time = new Date().getTime();
            /* 画廊 */
            if (t.parentElement.className.includes("GalleryTweet")) {
                //获取画廊容器
                let imgContent = t.parentElement.parentElement.getElementsByClassName("Gallery-media")[0];
                //防止按钮重复叠加
                if (imgContent.parentElement.parentElement.getElementsByClassName("dl_btn_div").length != 0) return;
                //创建下载按钮
                let dlbtn = document.createElement('div');
                imgContent.parentElement.appendChild(dlbtn);
                dlbtn.outerHTML = '<div class="dl_btn_div" style="z-index: 999;display: table;font-size: 15px;color: white;position: absolute;right: 5px;top: 5px;background: #0000007f;height: 30px;width: 30px;border-radius: 15px;text-align: center;"><a style="display: table-cell;height: 30px;width: 30px;vertical-align: middle;color:white;font-family:edgeicons;text-decoration: none;user-select: none;" id="a_dl">&#xf088</a></div>';
                dlbtn = imgContent.parentElement.getElementsByClassName("dl_btn_div")[0];
                //创建不可见的下载用标签
                let btnDownloadImg = document.createElement('A');
                btnDownloadImg.className = 'img-link';
                imgContent.parentElement.parentElement.appendChild(btnDownloadImg);
                //添加点击事件
                dlbtn.addEventListener('click', function () {
                    //去掉图片链接尾部的 ":large"
                    let ImgUrl = imgContent.getElementsByClassName("media-image")[0].src.replace(":large", "");
                    //获取文件名
                    let dl_picname = ImgUrl.replace('https://pbs.twimg.com/media/', '').replace('.png', '').replace('.jpg', '');
                    //设置默认图片编号0
                    let dl_picno = 0;
                    //个人页面class
                    let Images = imgContent.parentElement.querySelectorAll('.AdaptiveMedia-container img');
                    if (Images.length <= 0) {
                        //信息流class
                        Images = imgContent.parentElement.querySelectorAll('.AdaptiveMedia-photoContainer img');
                    }
                    //通过循环比较获取图片序号
                    for (var imgNo = 0; imgNo < Images.length; imgNo++) {
                        if (ImgUrl == Images[imgNo].src) {
                            dl_picno = imgNo;
                            break;
                        }
                    }
                    //获取拓展名，推特只存在.jpg和.png格式的图片，故偷个懒不做正则判断
                    let dl_ext = ".jpg";
                    if (ImgUrl.includes(".png")) {
                        dl_ext = ".png";
                    }
                    //替换内容，拼接文件名
                    let dl_filename = defaultFileName
                        .replace("<%Userid>", dl_userid)
                        .replace("<%Name>", dl_name)
                        .replace("<%Tid>", dl_tid)
                        .replace("<%Time>", dl_time)
                        .replace("<%PicName>", dl_picname)
                        .replace("<%PicNo>", dl_picno);
                    //调用下载方法
                    download(ImgUrl + ":orig", dl_filename + dl_ext, btnDownloadImg);
                });
                return;
            }
            /* 信息流 */
            //防止按钮重复叠加
            if (t.getElementsByClassName("dl_btn_div").length != 0) return;
            //获取全部图片标签
            let Images = t.querySelectorAll('.AdaptiveMedia-container img');
            for (var i = 0; i < Images.length; i++) {
                let Img = Images[i];
                if (Img) {
                    //获取图片链接
                    let ImgUrl = Img.src;
                    //如果为blob对象则跳过
                    if (Img.src.includes('blob')) break;
                    //创建下载按钮
                    let dlbtn = document.createElement('div');
                    Img.parentElement.parentElement.appendChild(dlbtn);
                    dlbtn.outerHTML = '<div class="dl_btn_div" style="display: table;font-size: 15px;color: white;position: absolute;right: 5px;bottom: 5px;background: #0000007f;height: 30px;width: 30px;border-radius: 15px;text-align: center;"><a style="display: table-cell;height: 30px;width: 30px;vertical-align: middle;color:white;font-family:edgeicons;text-decoration: none;user-select: none;" id="a_dl">&#xf088</a></div>';
                    dlbtn = Img.parentElement.parentElement.getElementsByClassName("dl_btn_div")[0];
                    //创建不可见的下载用标签
                    let btnDownloadImg = document.createElement('A');
                    btnDownloadImg.className = 'img-link';
                    t.appendChild(btnDownloadImg);
                    //获取文件名
                    let dl_picname = Img.src.replace('https://pbs.twimg.com/media/', '').replace('.png', '').replace('.jpg', '');
                    //获取图片编号
                    let dl_picno = i;
                    //替换内容，拼接文件名
                    let dl_filename = defaultFileName
                        .replace("<%Userid>", dl_userid)
                        .replace("<%Name>", dl_name)
                        .replace("<%Tid>", dl_tid)
                        .replace("<%Time>", dl_time)
                        .replace("<%PicName>", dl_picname)
                        .replace("<%PicNo>", dl_picno);
                    //获取拓展名，推特只存在.jpg和.png格式的图片，故偷个懒不做正则判断
                    let dl_ext = ".jpg";
                    if (ImgUrl.includes(".png")) {
                        dl_ext = ".png";
                    }
                    //添加点击事件
                    dlbtn.addEventListener('click', function () {
                        //调用下载方法
                        download(ImgUrl + ":orig", dl_filename + dl_ext, btnDownloadImg);
                    });
                }
            };
        });
    }

    window.onload = function () {
        addDownloadButton();
    }

    waitForKeyElements(
        '.AdaptiveMedia-container img',
        addDownloadButton
    );

    function waitForKeyElements(
        selectorTxt,
        actionFunction,
        bWaitOnce,
        iframeSelector
    ) {
        var targetNodes, btargetsFound;

        if (typeof iframeSelector == "undefined") {
            targetNodes = $(selectorTxt);
        } else {
            targetNodes = $(iframeSelector).contents().find(selectorTxt);
        }

        if (targetNodes && targetNodes.length > 0) {
            btargetsFound = true;
            targetNodes.each(function () {
                var jThis = $(this);
                var alreadyFound = jThis.data('alreadyFound') || false;

                if (!alreadyFound) {
                    var cancelFound = actionFunction(jThis);
                    if (cancelFound) {
                        btargetsFound = false;
                    } else {
                        jThis.data('alreadyFound', true);
                    }
                }
            });
        } else {
            btargetsFound = false;
        }

        var controlObj = waitForKeyElements.controlObj || {};
        var controlKey = selectorTxt.replace(/[^\w]/g, "_");
        var timeControl = controlObj[controlKey];

        if (btargetsFound && bWaitOnce && timeControl) {
            clearInterval(timeControl);
            delete controlObj[controlKey]
        } else {
            if (!timeControl) {
                timeControl = setInterval(function () {
                        waitForKeyElements(selectorTxt,
                            actionFunction,
                            bWaitOnce,
                            iframeSelector
                        );
                    },
                    300
                );
                controlObj[controlKey] = timeControl;
            }
        }
        waitForKeyElements.controlObj = controlObj;
    }
})();