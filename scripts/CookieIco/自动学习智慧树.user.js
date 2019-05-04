// ==UserScript==
// @name         自动学习智慧树
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Auto play MOOC vedio in zhihuishu.
// @author       Cookie
// @match        http://study.zhihuishu.com/learning/*
// @grant        none
// ==/UserScript==

window.onload = setInterval(CheckInit, 10000);
//record last timestamp;
var oldProgress = 0;
//mute and Speed up bool

function CheckInit() {

    var questionFrame = document.getElementsByTagName("iframe");
    console.log("Start auto answer.");
    if (questionFrame.length < 3) {
        console.log("no need.");
    } else {
        init();
    }


    var progressBox = document.getElementsByClassName("progressbar_box")[0];
    var progress = progressBox.getElementsByClassName("progressbar")[0];
    CheckVedioProgress(progress);

    //auto playing when vedio is stop;

    AutoPlay(progress, oldProgress);
    oldProgress = parseFloat(progress.style.width);

    //1.5speed
    SpeedUp();
}

function SpeedUp() {
    if (document.getElementsByClassName("speedBox")[0].style.backgroundImage === 'url("http://lc.zhihuishu.com/ableVideoPlayer/img/core/0.5.png")') {
        var speedBtn = document.getElementsByClassName("speedTab15")[0];
        speedBtn.click();
        console.log("Speed Up!");
        var muteBtn = document.getElementsByClassName("volumeIcon")[0];
        muteBtn.click();
        console.log("Volume Mute!");
    }

}

function AutoPlay(progress, oldProgress) {
    console.log(parseFloat(progress.style.width) - oldProgress);
    if ((parseFloat(progress.style.width) - oldProgress) < 0.1) {
        document.getElementsByClassName("videoArea")[0].click();

        console.log("Click");
    }
    console.log(oldProgress);
}

function CheckVedioProgress(progress) {

    console.log(parseFloat(progress.style.width));
    if (parseFloat(progress.style.width) > 99.7) {
        var currentPlay = document.getElementsByClassName("current_play")[0];
        console.log(currentPlay);
        var nextPlay = currentPlay.nextSibling;
        console.log(nextPlay);
        while (1) {

            if ((hasClass(nextPlay, "children") || hasClass(nextPlay, "lesson")) && !hasClass(nextPlay, "font_gray_inclined")) {
                console.log("yes");
                break;
            } else {
                nextPlay = nextPlay.nextSibling;
                console.log(false);
            }
        }

        console.log(nextPlay);

        nextPlay.click();
    }
}

function hasClass(elements, cName) {
    if (!elements.className) {
        return false;
    }
    var classes = elements.className.split(/\s+/);
    for (var i = 0; i < classes.length; i++) {
        if (classes[i] === cName) {
            return true;
        }
    }
    return false;

}
//auto answer
function init() {
    var questionFrame = document.getElementsByTagName("iframe");

    console.log(questionFrame[questionFrame.length - 1]);
    var frameDoc = questionFrame[questionFrame.length - 1].contentWindow.document;
    var options = frameDoc.getElementsByClassName("answerOption");

    console.log(options.length);
    var length = options.length; //3

    var selector = new Selector();
    selector.reset(length);


    //first into cycle,only select one number before out;
    for (let j = 0; j < length; j++) {
        ResetAllOptions(frameDoc);
        console.log("i:" + j);
        var selectedNumber = selector.selectNumber();
        console.log("selectedNumber:" + selectedNumber);
        options[selectedNumber].getElementsByTagName("input")[0].click();

        if (selector.checkAnswer(frameDoc)) {
            return;
            //      console.log(true);
        }
        console.log(false);
    }
    ResetAllOptions(frameDoc);
    selector.reset(length);
    for (let j = 0; j < length; j++) {
        console.log("i:" + j);
        var selectedNumber = selector.selectNumber();
        console.log("selectedNumber:" + selectedNumber);
        options[selectedNumber].getElementsByTagName("input")[0].click();

        if (selector.checkAnswer(frameDoc)) {
            return;
            //           console.log(true);
        }
        console.log(false);
    }

}

function Selector() {
    this.number;
}
Selector.prototype.reset = function (count) {
    this.number = new Array(count);
    for (let i = 0; i < count; i++) {
        this.number[i] = i;
    }

    console.log(this.number);
};

Selector.prototype.selectNumber = function () {
    if (this.number.length === 0) {
        return null;
    } else {
        var temp = this.number.shift();
        return temp;
    }
};

Selector.prototype.checkAnswer = function (frameDoc) {
    var answerFlag = frameDoc.getElementsByClassName("exam_correct");
    if (answerFlag.length !== 0) {
        console.log(answerFlag);
        console.log(document.getElementsByClassName("popbtn_cancel"));

        document.getElementsByClassName("popbtn_cancel")[0].click();
        return true;
    } else {
        return false;
    }
};

function ResetAllOptions(frameDoc) {
    var options = frameDoc.getElementsByClassName("answerOption");
    for (let i = 0; i < options.length; i++) {
        const element = options[i];
        element.getElementsByTagName("input")[0].checked = false;
    }
}

