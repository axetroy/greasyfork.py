// ==UserScript==
// @name HUST COJS Helper
// @name:zh-CN 一起来++华科COJS
// @namespace HcHelper
// @match http://222.20.79.189/CTest2/job.php*
// @grant none
// @author maniacata
// @description ctmd HUST COJS!
// @description:zh-cn 法克HUST的在线C！
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @version 0.0.1.20181217145543
// ==/UserScript==

var inline_src = (<><![CDATA[


    // allow right click
    let divPanel = document.querySelector("div.panel-body");
    const job = document.querySelector("#job");
    const jobTime = job.querySelector(".panel-body+div");

    const neoDivPanel = document.createElement("div");
    neoDivPanel.classList.add("panel-body");
    neoDivPanel.innerHTML = divPanel.innerHTML;

    job.removeChild(divPanel);
    job.insertBefore(neoDivPanel, jobTime)

    divPanel = null;

    // remove 15s interval after submitting
    const sbmtBtn = document.getElementById("submitCode");
    sbmtBtn.addEventListener("click", function () {
    setTimeout(function () {
    sbmtBtn.removeAttribute("disabled");
    }, 0);
    });

    // create tool panel
    const row = document.querySelector(".row");
    const originPanel = document.querySelector(".row>div:first-child");
    originPanel.classList.remove("col-md-8", "col-md-offset-2");
    originPanel.classList.add("col-xs-8");

    const newPanelTemplate = `<div class="col-xs-4">
<div id="job" class="panel panel-default">
<div class="panel-heading">fxxk Tools</div>
<div class="panel-body">
<div class="form-group">
<label for="charCountStat">统计字符数量：</label>
<div class="input-group">
<input type="text" class="form-control" id="charCountStat" placeholder="粘贴字符串到这里">
<span class="input-group-addon" id="charCountStatAddon">0</span>
</div>
</div>
</div>
</div>
</div>`;

    const newPanel = document.createElement("div");
    row.appendChild(newPanel);
    newPanel.outerHTML = newPanelTemplate;

    const charCountStat = document.getElementById("charCountStat");
    const charCountStatAddon = document.getElementById("charCountStatAddon");
    charCountStat.addEventListener("input", (e) => {
    charCountStatAddon.innerHTML = e.srcElement.value.length;
    });

]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);