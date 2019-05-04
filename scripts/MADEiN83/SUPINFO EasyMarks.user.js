// ==UserScript==
// @name         SUPINFO EasyMarks
// @namespace    EasyMarks
// @version      0.10
// @description  Easy way to know how many SUPINFO credits you have obtained.
// @author       Anthony DI STEFANO
// @match        *.campus-booster.net/*/marks.aspx*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @require      http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/jquery.dataTables.min.js
// @copyright    2015+, Anthony DI STEFANO
// ==/UserScript==

var cVersion = "0.10";

$(function () {
    var v = new Versionning();
    v.getLatest();
});

function EasyMarks() {
    this.courses = [];
    this.currentCourseId = 0;
    this.img = {
        valid: "https://cdn0.iconfinder.com/data/icons/fatcow/32x32/tick.png",
        invalid: "https://cdn3.iconfinder.com/data/icons/fatcow/32/cross.png",
        optional: "https://cdn3.iconfinder.com/data/icons/fatcow/32x32_0400/error.png",
        search: "https://cdn1.iconfinder.com/data/icons/free-98-icons/32/search-32.png"
    };
    this.datatableFilter = true;
    this.datatableDisplayLength = 50;
    this.marksSeparator = " - ";
    this.waitingTimeDrownDownList = 1500;

    this.startProcess = function () {
        this.courses = [];
        this.currentCourseId = 0;

        var tableContainerId = "ctl00_ContentPlaceHolder1_ucStudentMark_ctl01_divCursus";
        var elements = $("div#" + tableContainerId + " table tbody tr td");

        var me = this;

        elements.each(function (i) {
            me.splitResult(elements[i].innerHTML.trim());
        });

        this.displayResult();
    }

    this.splitResult = function (text) {

        var isCourse = this.getIsCourses(text);

        if (!isCourse) {
            mark = this.getMark(text);

            anlt('Found mark: ' + mark);

            this.courses[this.currentCourseId - 1].addMark(mark);
            this.courses[this.currentCourseId - 1].setAvg();
            return;
        }

        var courseKey = this.getCourseCode(text);
        var courseName = this.getCourseName(text);
        var creditCount = this.getCourseCredit(text);
        var obtained = this.getObtained(text);
        var optional = this.getOptional(text);

        var x = new Courses(courseKey, courseName, creditCount, obtained, optional);
        this.courses.push(x);

        this.currentCourseId++;
    }

    this.getIsCourses = function (text) {
        return !(text.indexOf("<") <= 0);
    }

    this.getCourseCode = function (text) {
        var regExp = /(#([\w]{4}))/;
        var matches = regExp.exec(text);

        anlt('Found course: ' + matches[2]);

        return matches[2];
    }

    this.getCourseCredit = function (text) {
        var regExp = /(Credits:([\d]{1,2}))/;
        var matches = regExp.exec(text);

        return matches[2];
    }

    this.getCourseName = function (text) {
        var regExp = /^([\w\-\ \'\(\)]+)/;
        var matches = regExp.exec(text);

        return matches[1].trim();
    }

    this.getObtained = function (text) {
        return text.indexOf("&nbsp;√") >= 0;
    }

    this.getMark = function (text) {
        var regExp = /<b>([\d\.]+)<///b>/;
        var matches = regExp.exec(text);

        return matches != null && matches.length >= 2 ? matches[1].trim() : 0;
    }

    this.getOptional = function (text) {
        return text.indexOf("OPTION") >= 0 || text.indexOf("SPECIALIZATION") >= 0 || text.indexOf("PART TIME INTERNSHIP") >= 0;
    }

    this.getTotalCredits = function () {
        var countObtained = 0;
        var countMissing = 0;
        var countOptional = 0;
        var successPoints = 0;

        for (var i = 0; i < this.courses.length; i++) {
            var c = this.courses[i];
            var credits = parseFloat(c.credits);

            if (c.obtained) {
                countObtained += credits;
                successPoints += parseFloat(c.successPoints);
            }
            else if (c.isOptional) countOptional += credits;
            else countMissing += credits;

        }

        return { obtained: countObtained, missing: countMissing, optional: countOptional, successPoints: successPoints };
    }

    this.displayResult = function () {
        var container = $("div#ctl00_ContentPlaceHolder1_ucStudentMark_ctl01_divCursus");
        var totalCredits = this.getTotalCredits();
        var percents = (100 * totalCredits.obtained / 60).toFixed(1);
        var html = "<div style='margin-bottom:20px;padding:10px'>";

        anlt('Obtained credits: ' + totalCredits.obtained);
        anlt('Missing credits: ' + totalCredits.missing);
        anlt('Optional credits: ' + totalCredits.optional);

        html += "<table style='width: 100%;text-align:center;font-size:18px;'>";
        html += "<tr>";
        html += "<td>Obtained credits: <b>" + totalCredits.obtained + "</b></td>";
        html += "<td>Missing credits: <b>" + totalCredits.missing + "</b></td>";
        html += "<td>Optional credits: <b>" + totalCredits.optional + "</b></td>";
        html += "</tr>";

        html += "<tr>";
        html += "<td colspan='3' style='font-size: 12px'>Success Points : <b>" + totalCredits.successPoints + "</b></td>";
        html += "</tr>";

        html += "<tr>";
        html += "<td colspan='3' style='font-size: 12px'>Achievement : <b>" + percents + "%</b></td>";
        html += "</tr>";
        html += "</table>";

        html += "<div class='info' style='margin-top:10px;'>";
        html += "<table id='infoTable' style='width: 100%;border-collapse: collapse;border: 1px solid #D7D4CB;'>";

        html += "<thead>";
        html += "<tr style='height:30px;border: 1px solid #D7D4CB;font-size:16px;background:#D7D4CB;'>";
        html += "<th><img src='" + this.img.search + "' width='10'/></th>";
        html += "<th>#</th>";
        html += "<th>Courses</th>";
        html += "<th>Credits</th>";
        html += "<th>Mark(s)</th>";
        html += "<th>AVG</th>";
        html += "<th>SP</th>";
        html += "</tr>";
        html += "</thead>";

        for (var i = 0; i < this.courses.length; i++) {
            var c = this.courses[i];
            html += "<tr style='background:#EEE9E3;'>";

            if (c.obtained) html += "<td><span style='display:none;'>a</span><img src='" + this.img.valid + "' width='10' title='All credits is obtained for this course.'/></td>";
            else if (c.isOptional) html += "<td><span style='display:none;'>b</span><img src='" + this.img.optional + "' width='10' title='All credits is not obtained for this course but they are OPTIONAL.'/></td>";
            else html += "<td><span style='display:none;'>c</span><img src='" + this.img.invalid + "' width='10' title='All credits is missed.'/></td>";

            html += "<td>" + c.id + "</td>";
            html += "<td>" + c.name + "</td>";
            html += "<td>" + c.credits + "</td>";

            html += "<td>";
            for (var j = 0; j < c.marks.length; j++) {
                var m = c.marks[j];

                if (m === 0) m = "0.00";

                html += m;
                if (j + 1 !== c.marks.length) html += this.marksSeparator;
            }

            html += "<td><b>" + c.avg + "</b></td>";
            html += "<td><b>" + c.successPoints + "</b></td>";
            html += "</td>";

            html += "</tr>";
        }

        html += "</table>";
        html += "</div><br>";
        html += "<div style='text-align: right;'>© Provided by Anthony DI STEFANO (<a href='mailto:161827@supinfo.com?subject=EasyMarks'>161827</a>)</div>";

        html += "</div>";

        container.before(html);

        $("#infoTable").dataTable({
            "aaSorting": [[0, "asc"]],
            "iDisplayLength": this.datatableDisplayLength,
            bFilter: this.datatableFilter,
            bInfo: false,
            "bLengthChange": false,
            "bPaginate": false
        });

        anlt('Displays result');
    };
}

function Courses(id, name, credits, obtained, isOptional) {
    this.id = id;
    this.name = name;
    this.credits = credits;
    this.obtained = obtained;
    this.isOptional = isOptional;
    this.avg = 0;
    this.successPoints = "0.00";
    this.marks = [];

    this.getInfo = function () {
        this.str = this.id + " " + this.name + " (" + this.credit + " credits) " + (obtained ? "√" : "x");
        return str;
    };

    this.addMark = function (mark) {
        this.marks.push(mark);

        this.marks = this.marks.sort();
    }

    this.setAvg = function () {
        this.avg = 0;

        for (var i = 0; i < this.marks.length; i++) {
            this.avg += parseFloat(this.marks[i]);
        }

        this.avg = (this.avg / this.marks.length).toFixed(2);
        this.setSuccessPoints();
    }

    this.setSuccessPoints = function () {
        if (this.avg < 10) return;

        var mark = this.avg - 10;
        this.successPoints = (mark * this.credits).toFixed(2);
    }
}

function Versionning() {
    this.downloadUrl = "https://greasyfork.org/scripts/11543-supinfo-easymarks/code/SUPINFO%20EasyMarks.user.js";
    this.checkUrl = "https://raw.githubusercontent.com/MADEiN83/SUPINFOEasyMarks/master/main.js";

    this.getLatest = function () {
        var me = this;

        anlt('Test version');

        $.get(this.checkUrl, function (data) {
            var regExp = /@version([ ]+)([\d.]+)/;
            var matches = regExp.exec(data);

            if (matches != undefined && matches.length >= 3 && matches[2] != undefined && matches[2] != cVersion) {

                if (confirm("A new EasyMarks version is now available (current: " + cVersion + ", new: " + matches[2] + ")\r\nClick OK to update."))
                    me.openDownloadUrl();
            } else {
                var em = new EasyMarks();
                em.startProcess();

                anlt('Start process');

                //log("Current version: " + cVersion+", remote version: " + matches[2]);
            }
        });
    };

    this.openDownloadUrl = function () {
        var url = this.downloadUrl;
        window.location = url;

        anlt('Download new version');
    };
}

$("#ctl00_ContentPlaceHolder1_ucStudentMark_ctl01_ddlCursus").live("change", function () {
    javascript: setTimeout(function () {
        var em = new EasyMarks();
        em.startProcess();
    }, 1500);
});

function log(str) { console.log(str); }
function anlt(str) { ga('send', 'event', 'main', str); }

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-66058466-1', 'auto');
ga('set', 'page', $("#ctl00_lnkMyBoosterForm").html());
anlt('Init');
