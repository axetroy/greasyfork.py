// ==UserScript==
// @name         高鐵搶票
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://irs.thsrc.com.tw/IMINT/
//@require https://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
//@run-at  document-end

// ==/UserScript==

(function() {
    'use strict';

    $("select[name='selectStartStation']").val("1");
    $("select[name='selectDestinationStation']").val("12");
    $("#returnCheckBox").click();
    $("#backDate,#backTimeTable").show();


    var startDate = "2019/02/02"
    var backDate = "2019/02/10"
    //去程
    $("input[name='toTimeInputField']").attr("value",startDate);
    $("input[name='toTimeInputField']").attr("date",startDate);
    //晚上八點半後的票
    $("select[name='toTimeTable']").find('option[value="830P"]').prop('selected', 'selected');
    //回程
    $("input[name='backTimeInputField']").attr("value",backDate);
    $("input[name='backTimeInputField']").attr("date",backDate);;
    //下午四點半後的票
    $("select[name='backTimeTable']").find('option[value="430P"]').prop('selected', 'selected');
})();