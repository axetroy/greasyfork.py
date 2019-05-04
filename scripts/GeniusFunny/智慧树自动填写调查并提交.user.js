// ==UserScript==
// @name         智慧树自动填写调查并提交
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *.zhihuishu.com/onlineSchool/teachSurvey/listStuSurvey*
// @grant        none
// ==/UserScript==

(function() {
    try {
        $('a.fr').click()
        Array.from($('input[type=radio]')).reverse().forEach(item => item.click())
        Array.from($('.ContentEva')).forEach(item => item.value = '非常棒')
        $('.popbtn_yes').click()
        setTimeout(() => {
            $('#close_windowa').click()
        }, 3000)
    } catch(e) {
        console.error(e)
    }
})();