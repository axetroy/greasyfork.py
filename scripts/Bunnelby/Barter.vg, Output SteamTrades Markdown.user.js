// ==UserScript==
// @name         Barter.vg, Output SteamTrades Markdown
// @description  Output markdown for steamtrades.com
// @namespace    http://tampermonkey.net/
// @version      0.4.1
// @author       You
// @match        https://barter.vg/u/*/t/*
// @match        https://barter.vg/u/*/w/*
// @match        https://barter.vg/u/*/c/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @runat        document-end
// @grant        none
// @nowrap
// ==/UserScript==

(function() {
    'use strict';
    var $ = jQuery.noConflict();

    var uiTemplate = (function () {/*
    <h3>Output SteamTrades.com Markdown</h3>
    <p>
    Usable variables : <b>$vars</b><br />
    <b>%gem {{</b> If $gem is defined, display sentence that inside the braces. <b>}}</b><br />
    <b>%!gem {{</b> If $gem is undefined, display sentence that inside the braces. <b>}}</b><br />
    <b>%gem&gt;100 {{</b> If $gem is higher than 100, display sentence that inside the braces. <b>}}</b><br />
    <b>!gem</b> : If $gem is undefined, don't output this line.<br />
    <b>!gem&lt;100, !gem&gt;100</b> : If $gem is lower/higher than 100, don't output this line.<br />
    <b>&calc &lt;&lt;</b> Can calcucate in the braces. <br />
    Useable characters: <b style="color: magenta;">+, -, *, /, ., (, and )</b>. <br />
    Usable math functions: <b style="color:magenta">abs(),ceil(),floor(),fround(),max(),min(),random(),round()</b>.<b>&gt;&gt;</b>
    </p>
    <input type="radio" name="mdTemplateType" id="md-none" value="none" /><label for="md-list">None</label>
    <input type="radio" name="mdTemplateType" id="md-list" value="list" /><label for="md-list">List</label>
    <input type="radio" name="mdTemplateType" id="md-table" value="table" /><label for="md-table">Table</label><br />
    <label>Template</label><input type="text" id="md-template" /><br />
    <h4>Markdown Output</h4>
    <textarea id="md-output-area" />
    <button id="md-output">Output Markdown</div>
    */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
    var defaultListTemplate = "- [$title]($url) %gem{{**$gem gems**}}";
    var defaultTableHeaderTemplate = "|Title|Gems|\n|:-|:-|\n";
    var dafaultTableTemplate = "|[$title]($url)|$gem gems|";

    $(function () {
        var tiers = ["⇩", "▽", "□", "△", "⇧" ];
        var vars = ["title", "url", "barterurl", "appid", "gem", "tfkey", "csgokey", "tod", "ref", "userfield", "tier", "strtier", "region", "dlc", "goty"];
        var numVars = ["gem", "tfkey", "csgokey", "tod", "ref", "userfield", "tier"];
        var strVars = ["title", "url", "barterurl", "appid", "strtier", "region", "dlc", "goty"];

        $("#main").append(uiTemplate.replace("$vars", "$" + vars.join(", $")));

        $("#md-none").click(function () {
            $("#md-template").val("");
        });
        $("#md-list").click(function () {
            $("#md-template").val(defaultListTemplate);
        });
        $("#md-table").click(function () {
            $("#md-template").val(dafaultTableTemplate);
        });

        $("#md-template").val(localStorage["MarkdownTemplate"] || "");

        $("#md-output")
            .click(function () {
            var template = $("#md-template").val();
            localStorage["MarkdownTemplate"] = template;
            var output = "";
            if ($("#md-table")[0].checked) {
                output += defaultTableHeaderTemplate;
            }

            $(".collection > tbody > tr:not(.platform)").each(function () {
                var $this = $(this);

                if ($this.find("#notLinked")[0]) return;
                if ($this.find(".showMoreLabel")[0]) return;

                var data = {};

                data.title = $($this.find("label, a[href*='/i/']")[0]).text() || $this.find(":nth-child(1)").text();
                data.url = $this.find("[href*='/app/'], a[href*='/sub/']").attr("href");
                data.barterurl = $this.find("a[href*='/i/']").attr("href");
                var mAppid = ($this.find("a[href*='/app/'], a[href*='/sub/']").attr("href") || "").match(/\d+/);
                if (mAppid) data.appid = parseInt(mAppid[0]);
                data.gem = $this.find(".tag:contains(Gems)").text().match(/\d+/);
                if (data.gem) data.gem = data.gem[0];
                data.tfkey = $this.find(".tag:contains(TF2 Key)").text().match(/\d+/);
                if (data.tfkey) data.tfkey = data.tfkey[0];
                data.csgokey = $this.find(".tag:contains(CSGO Key)").text().match(/\d+/);
                if (data.csgokey) data.csgokey = data.csgokey[0];
                data.tod = $this.find(".tag:contains(ToD)").text().match(/\d+/);
                if (data.tod) data.tod = data.tod[0];
                data.ref = $this.find(".tag:contains(Ref)").text().match(/\d+/);
                if (data.ref) data.ref = data.ref[0];
                data.userfield = $this.find(".tag:contains(userfield)").text().match(/\d+/);
                if (data.userfield) data.userfield = data.userfield[0];
                data.strtier = $this.find(".tag[title*=tier]").text();
                data.tier = tiers.indexOf(data.strtier) + 1;

                data.region = $this.find(".tag:contains(locked)").text().match(/locked: ([A-Z]+)/);
                if (data.region) data.region = data.region[1];
                data.dlc = $this.find(".tag:contains(DLC)").text();
                data.dlc = data.dlc == "" ? null : data.dlc;
                data.goty = $this.find(".tag:contains(GOTY)").text();
                data.goty = data.goty == "" ? null : data.goty;

                // console.log(data);

                var line = template;
                var isBreakLine = false;

                var reg = new RegExp("(%)?!({0}) ?(([<>=][=]?) ?(\\d+))?".replace("{0}", vars.join("|")), "gm");
                line = line.replace(reg, function (fullMatch, isIgnore, target, hasOperation, operation, value) {
                    if (isIgnore) {
                        return fullMatch;
                    }
                    if (data[target] == null) {
                        isBreakLine = true;
                    } else if (hasOperation) {
                        console.log(data[target] + operation + value);
                        if (eval(data[target] + operation + value)) {
                            isBreakLine = true;
                        }
                    }
                    return "";
                });

                if (isBreakLine) {
                    return;
                }

                var reg = new RegExp("%(!)?({0}) ?(([<>=][=]?) ?(\\d+))?{{([^}]*?)?}}".replace("{0}", vars.join("|")), "gm");
                line = line.replace(reg, function (fullMatch, isDenial, target, hasOperation, operation, value, body) {
                    isDenial = !!isDenial;

                    if (hasOperation) {
                        if (eval(data[target] + operation + parseInt(value)) ^ isDenial) {
                            return body;
                        }
                    } else {
                        if (data[target] != null ^ isDenial) {
                            return body;
                        }
                    }
                    return "";
                });

                vars.forEach(function (name) {
                    var output = data[name] != null ? data[name] : "";
                    var reg = new RegExp("\\${0}".replace("{0}", name), "g");
                    // console.log(name, data[name], reg)
                    line = line.replace(reg, output);
                });

                var reg = new RegExp("&calc ?<<(([ \\d+\\.\\-\\*\\+\\/\\)\\(]|abs|ceil|floor|fround|max|min|random|round)*?)>>", "gm");
                line = line.replace(reg, function (fullMatch, body) {
                    try {
                        body = body.replace(/abs|ceil|floor|fround|max|min|random|round/gm, function (m, b) {
                            return "Math." + m;
                        });
                        // console.log(body);
                        return new String(eval(body));
                    } catch {
                        return "N/A";
                    }
                });

                output += line + "\n";
            });
            $("#md-output-area").val(output);
        });

        $("<style />").text((function () {/*
        #md-template { margin-left: 10px; min-width: 500px; }
        #md-output-area { display: block; width: 100%; min-height: 80px; }
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1]).appendTo("head");
    });
})();