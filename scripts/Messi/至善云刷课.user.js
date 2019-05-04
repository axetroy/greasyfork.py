// ==UserScript==
// @name         至善云刷课
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Your time is limited, so don't waste it on stupid things.
// @author       Messi
// @match        *://www.attop.com/wk/*
// @grant        none
// ==/UserScript==

/*
all DOMs:
class names:
    Minfo, (number of clicks)
    BT_ping (while unfinishied), BT_ping Ped (finished),
    ping_btn_2, aui_state_highlight, aui_close,
id names:
    range from j_830 to j_850
names:
    document.getElementsByName("zj").length = 7
Flags:
    textBlue_2, ok textBlue_2 ("学习时间")

Mping_btn, //dk
*/

var log = console.log.bind(console)
var Finished = TimeReached() && Checked()


var Checked = function () {
    var listOfChecks = document.getElementsByClassName('BT_ping')

    for (var i = 0; i < listOfChecks.length; i++) {
        listOfChecks[i].click()
        var iframe = document.getElementById('pageiframe')
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document
        var check = innerDoc.getElementsByClassName('ping_btn_2')  //点击"一般"按钮
        var confirm = innerDoc.getElementsByClassName('aui_state_highlight')
        var exit = document.getElementsByClassName('aui_close')
        log('check length: ', check.length)
        iframe.addEventListener("load", function () {
            log('loaded')
            if (check.length) {
                check[0].click()
                confirm[0].click()
                log('executed inside')
            }
        })
        log('exit length: ', exit.length)
        exit[0].click()
    }
    return true
}

var TimeReached =function () {
    var timeTag = function () {
        var tag = document.getElementsByClassName('ok textBlue_2')
        if (tag.length) {
            return true
        }else {
            return false
        }
    }
    timeTag()
    log(typeof(timeTag()))

    if (!timeTag()) {
        setInterval(function () {
            document.getElementsByClassName('bIntro_text')[0].click()
            //click on the blank elements to see if works
            log("executed")
        }, 5000)
    }else {
        log('so !timeTag is true')
        return true
    }
}

var __main() = function () {
    while (!Finished) {
    Checked()
    TimeReached()
    }
}

window.addEventListener('load', __main())