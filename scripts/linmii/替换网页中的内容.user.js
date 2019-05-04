// ==UserScript==
// @name         替换网页中的内容
// @name:en      Replace content in a webpage
// @name:zh-CN   替换网页中的内容
// @name:zh-TW   替换网页中的內容
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  替换网页中的文本内容
// @description:en     Replace text content in a webpage
// @description:zh-CN  替换网页中的文本内容
// @description:zh-TW  替换网页中的文本內容
// @author       linmii
// @include      *
// @grant        none
// ==/UserScript==
(function () {
    'use strict';
    initCss();
    initModal();
    initRImg();
    initDialog();
    window.addEventListener("scroll", function () {
        let dialogDiv = document.querySelector("#lm-dialog-div");
        dialogDiv.style.left = (document.documentElement.clientWidth - dialogDiv.style.width.replace('px', '')) / 2 + document.documentElement.scrollLeft + "px";
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        dialogDiv.style.top = (document.documentElement.clientHeight - dialogDiv.style.width.replace('px', '')) / 2 + scrollTop + "px";
    });
})();
function initCss() {
    let lmStyle = document.createElement("style");
    lmStyle.type = "text/css";
    lmStyle.innerHTML =
        '.lm-r-button {\
            padding: 10px 18px;\
            font-size: 14px;\
            border-radius: 4px;\
            line-height: 1;\
            white-space: nowrap;\
            cursor: pointer;\
            background: #409EFF;\
            border: 1px solid #409EFF;\
            color: #fff;\
            font-weight: 500;\
            width: 70px;\
            height: 36px;\
        }\
        .lm-r-button:hover {\
            background: #66b1ff;\
            border-color: #66b1ff;\
            color: #fff;\
        }\
        .lm-r-button:focus {\
            background: #66b1ff;\
            border-color: #66b1ff;\
            color: #fff;\
        }\
        .lm-r-input {\
            -webkit-appearance: none;\
            background-color: #fff;\
            background-image: none;\
            border-radius: 4px;\
            border: 1px solid #dcdfe6;\
            box-sizing: border-box;\
            color: #606266;\
            display: inline-block;\
            font-size: 14px;\
            height: 40px;\
            line-height: 40px;\
            outline: none;\
            padding: 0 15px;\
            transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\
            width: 100%;\
        }\
        .lm-r-input:hover {\
            border-color: #C0C4CC;\
        }\
        .lm-r-input:focus {\
            border-color: #409EFF;\
        }';
    document.querySelector("head").appendChild(lmStyle);
}
function initRImg() {
    let rImg = document.createElement("div");
    rImg.id = "lm-r-img";
    rImg.innerText = 'R';
    rImg.style.cssText = "z-index: 999999; position: fixed; top: 0; left: 0; font-size: 14px; border-radius: 4px; background-color: #fff; width: 20px; height: 20px; text-align: center; opacity: 0.5; cursor: pointer; border: solid 1px #999999;";
    document.querySelector("body").prepend(rImg);
    rImgBindEvent();
}
function initModal() {
    let lmModal = document.createElement("div");
    lmModal.id = 'lm-r-modal';
    lmModal.style.cssText = 'position: fixed; left: 0; top: 0; width: 100%; height: 100%; opacity: 0.5; background: #000; z-index: 999999; display: none;';
    lmModal.onclick = function () {
        document.querySelector("#lm-btn-close").click();
    };
    document.querySelector("body").appendChild(lmModal);
}
function initDialog() {
    let phText1 = decodeURIComponent("%E8%AF%B7%E8%BE%93%E5%85%A5%E6%9F%A5%E6%89%BE%E5%86%85%E5%AE%B9(%E6%94%AF%E6%8C%81%E6%AD%A3%E5%88%99)");
    let phText2 = decodeURIComponent("%E8%AF%B7%E8%BE%93%E5%85%A5%E6%9B%BF%E6%8D%A2%E5%86%85%E5%AE%B9");
    let btnText1 = decodeURIComponent("%E6%9B%BF%20%E6%8D%A2");
    let btnText2 = decodeURIComponent("%E6%B8%85%20%E7%A9%BA");
    let btnText3 = decodeURIComponent("%E5%85%B3%20%E9%97%AD");
    let dialogDiv = document.createElement("div");
    dialogDiv.id = "lm-dialog-div";
    dialogDiv.innerHTML = '<div style="margin: 10px;">\
            <div>\
                <input  id="lm-find-content" class="lm-r-input" placeholder="' + phText1 + '" style="width: 230px;">\
            </div>\
            <div style="margin-top: 10px;">\
                <input id="lm-replace-content" class="lm-r-input" placeholder="' + phText2 + '" style="width: 230px;">\
            </div>\
            <div style="margin-top: 10px;">\
                <button id="lm-replace-btn" class="lm-r-button">' + btnText1 + '</button>\
                <button style="margin-left: 6px;" class="lm-r-button" onclick="document.querySelector(\'#lm-find-content\').value = \'\';document.querySelector(\'#lm-replace-content\').value = \'\';">' + btnText2 + '</button>\
                <button id="lm-btn-close" style="margin-left: 6px;" class="lm-r-button" onclick="document.querySelector(\'#lm-dialog-div\').style.display = \'none\'; document.querySelector(\'#lm-r-modal\').style.display = \'none\';">' + btnText3 + '</button>\
            </div>\
        </div>';
    // dialogDiv.style.border = 'solid 1px grey';
    // dialogDiv.style.padding = '10px';
    dialogDiv.style.textAlign = 'center';
    dialogDiv.style.zIndex = '99999999';
    dialogDiv.style.position = 'absolute';
    dialogDiv.style.display = 'none';
    dialogDiv.style.width = '250px';
    dialogDiv.style.height = '156px';
    dialogDiv.style.background = '#fff';
    dialogDiv.style.borderRadius = '4px';
    dialogDiv.style.fontSize = '14px';
    dialogDiv.style.left = (document.documentElement.clientWidth - dialogDiv.style.width.replace('px', '')) / 2 + document.documentElement.scrollLeft + "px";
    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    dialogDiv.style.top = (document.documentElement.clientHeight - dialogDiv.style.width.replace('px', '')) / 2 + scrollTop + "px";
    let body = document.querySelector("body");
    body.appendChild(dialogDiv);
    document.querySelector("#lm-replace-btn").addEventListener("click", replaceContent);
}
function replaceContent() {
    let findText = document.querySelector("#lm-find-content").value;
    let replaceText = document.querySelector("#lm-replace-content").value;
    if ("" !== findText && "" !== replaceText) {
        let body = document.querySelector("body");
        body.innerHTML = body.innerHTML.replace(new RegExp(findText, "gm"), replaceText);
        // 设置替换前的输入内容
        document.querySelector("#lm-find-content").value = findText;
        document.querySelector("#lm-replace-content").value = replaceText;
        // 重新绑定替换点击事件
        document.querySelector("#lm-replace-btn").addEventListener("click", replaceContent);
        document.querySelector("#lm-r-modal").addEventListener("click", closeBindEvent);
        rImgBindEvent();
    }
}
function rImgBindEvent() {
    let rImg = document.querySelector("#lm-r-img");
    rImg.onclick = function () {
        document.querySelector("#lm-r-modal").style.display = 'block';
        document.querySelector("#lm-dialog-div").style.display = 'block';
    };
    rImg.onmouseover = function () {
        document.querySelector("#lm-r-img").style.opacity = 1;
    };
    rImg.onmouseleave = function () {
        document.querySelector("#lm-r-img").style.opacity = 0.5;
    };
}
function closeBindEvent() {
    document.querySelector("#lm-btn-close").click();
    document.querySelector("#lm-r-modal").style.display = 'none';
}