// ==UserScript==
// @name         Ultimate-Guitar.com tab unblocker
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Lets you download blocked tabs. No more messages saying "Sorry, this artist has told us we can not show this tab."
// @match        *://*.ultimate-guitar.com/*
// @grant        none
// ==/UserScript==

var blocked = $("#cont div.t_blocked").length > 0;

if (blocked && tab_info.type == 'Pro')
{
    $("div .page_bcg").removeClass("blocked");
    $("#cont").replaceWith(`
        <div class="d_area specbg">
            <div class="tab_download_box">
                <form action="https://tabs.ultimate-guitar.com/tab/download" name="tab_download" class="tab_downloadcl notebox">
                    <div class="textversbox">
                        <input type="hidden" name="id" value="` + tab_info.id + `" id="tab_id">
                        <b>To download “` + toTitleCase(tab_info.name) + `” ` + tab_info.type + ` tab click button below</b>
                        <div class="fs-13 aria notebox">Please note that you must have Guitar Pro software <a href="http://www.guitar-pro.com/en/index.php?pg=download" target="_blank" class="fs-13 aria blue">installed</a> on your<br>computer in order to view this file.</div>
                        <input type="submit" class="prosubmit" value="Download Guitar Pro Tab">
                    </div>
                </form>
            </div>
        </div>`
    );
}
else if (blocked && tab_info.type == 'Power')
{
    $("div .page_bcg").removeClass("blocked");
    $("#cont").replaceWith(`
        <div class="d_area specbg">
            <div class="tab_download_box">
                <form action="https://tabs.ultimate-guitar.com/tab/download" name="tab_download" class="tab_downloadcl notebox">
                    <div class="textversbox">
                        <input type="hidden" name="id" value="` + tab_info.id + `" id="tab_id">
                        <b>To download “` + toTitleCase(tab_info.name) + `” ` + tab_info.type + ` tab click button below</b>
                        <div class="fs-13 aria notebox">Please note that you must have Power Tab software <a href="http://www.power-tab.net/downloads.php" target="_blank" class="fs-13 aria blue">installed</a> on your<br>computer in order to view this file.</div>
                        <input type="submit" class="prosubmit" value="Download Power">
                    </div>
                </form>
            </div>
        </div>`
    );
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}