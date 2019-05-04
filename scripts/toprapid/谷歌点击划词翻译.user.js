// ==UserScript==
// @id              googletranslatorbytoprapid
// @name            Google select text translator
// @name:zh-CN      谷歌点击划词翻译
// @version         2.1
// @namespace       https://greasyfork.org/en/scripts/36842
// @author          Toprapid
// @copyright       2017+,toprapid
// @description     Translate any selected text into the language you wants with google translator
// @description:zh-cn      谷歌点击划词翻译综合插件
// @match           http://*/*
// @match           https://*/*
// @grant           GM_registerMenuCommand
// @grant           GM_addStyle
// @grant           GM_xmlhttpRequest
// @grant           GM_getValue
// @grant           GM_setValue
// ==/UserScript==

//版本
var gtVer="2.0";

//缓存已经翻译过的信息内容
var transCache = [];
var transMd5Cache=[];
//缓存已经取得的音频数据内容
var transSoundCache=[];
var transSoundMd5Cache=[];
//
var sourceTranslateLanguageNameInStorage = "sourceTranslateLanguage";
var targetTranslateLanguageNameInStorage = "targetTranslateLanguage";
var translatorSettingLanguageInStorage="translatorSettingLanguage";
var defaultSourceLanguage = "-1";
var defaultTranslateLanguage = "0";
var currentSourceLanguage = parseInt(GM_getValue(sourceTranslateLanguageNameInStorage, defaultSourceLanguage));
var currentTranslateLanguage= parseInt(GM_getValue(targetTranslateLanguageNameInStorage, defaultTranslateLanguage));
var translatorSettingLanguage = GM_getValue(translatorSettingLanguageInStorage, "0") === "0" ? 0 : 1;
//国家与语言代码字符串
//国家
var uLanguageNames = [["中文", "中文", "中文", "英语", "英语", "英语", "英语", "英语", "英语", "英语", "英语", "芬兰语", "英语", "丹麦语", "英语", "希伯来语", "英语", "英语", "英语", "英语", "英语", "英语", "英语", "英语", "英语", "英语", "韩文", "日语", "荷兰语", "荷兰语", "葡萄牙语", "葡萄牙语", "法语", "法语", "法语", "法语", "法语", "西班牙语", "西班牙语", "西班牙语", "西班牙语", "西班牙语", "西班牙语", "西班牙语", "德语", "德语", "德语", "俄语", "意大利语", "希腊语", "挪威语", "匈牙利语", "土耳其语", "捷克语", "斯洛文尼亚语", "波兰语", "瑞典语", "西班牙语"], ["Chinese", "Chinese", "Chinese", "English", "English", "English", "English", "English", "English", "English", "English", "Finnish", "English", "Danish", "English", "Hebrew", "English", "English", "English", "English", "English", "English", "English", "English", "English", "English", "Korean", "Japanese", "Dutch", "Dutch", "Portuguese", "Portuguese", "French", "French", "French", "French", "French", "Spanish", "Spanish", "Spanish", "Spanish", "Spanish", "Spanish", "Spanish", "German", "German", "German", "Russian", "Italian", "Greek", "Norwegian", "Hungarian", "Turkish", "Czech", "Slovenian", "Polish", "Sweden Language", "Spanish"]];
//国家所对应的地区
var uRegionNames = [["简体", "繁体台湾", "繁体香港", "香港", "美国", "英国", "全球", "加拿大", "澳大利亚", "爱尔兰", "芬兰", "芬兰", "丹麦", "丹麦", "以色列", "以色列", "南非", "印度", "挪威", "新加坡", "新西兰", "印度尼西亚", "菲律宾", "泰国", "马来西亚", "阿拉伯", "韩国", "日本", "荷兰", "比利时", "葡萄牙", "巴西", "法国", "卢森堡", "瑞士", "比利时", "加拿大", "拉丁美洲", "西班牙", "阿根廷", "美国", "墨西哥", "哥伦比亚", "波多黎各", "德国", "奥地利", "瑞士", "俄罗斯", "意大利", "希腊", "挪威", "匈牙利", "土耳其", "捷克共和国", "斯洛文尼亚语", "波兰", "瑞典", "智利"],["Simplified", "Traditional Taiwan", "Traditional Hong Kong", "Hong Kong", "America", "United Kingdom", "Global", "Canada", "Australia", "Irish", "Finland", "Finland", "Denmark", "Denmark", "Israel", "Israel", "South Africa", "Indian", "Norway", "Singapore", "New Zealand", "Indonesia", "the Philippines", "Thai", "Malaysia", "Arab", "Korea", "Japan", "Dutch", "Belgium", "Portugal", "Brazil", "French", "Luxembourg", "Switzerland", "Belgium", "Canada", "Latin America", "Spain", "Argentina", "America", "Mexico", "Columbia", "Puerto Rico", "Germany", "Austria", "Switzerland", "Russia", "Italy", "Greece", "Norway", "Hungary", "Turkey", "Czech Republic", "Slovenian", "Poland", "Sweden", "Chile"]];
//最终代码
var uLanguageCode = ["zh-cn", "zh-tw", "zh-hk", "en-hk", "en-us", "en-gb", "en-ww", "en-ca", "en-au", "en-ie", "en-fi", "fi-fi", "en-dk", "da-dk", "en-il", "he-il", "en-za", "en-in", "en-no", "en-sg", "en-nz", "en-id", "en-ph", "en-th", "en-my", "en-xa", "ko-kr", "ja-jp", "nl-nl", "nl-be", "pt-pt", "pt-br", "fr-fr", "fr-lu", "fr-ch", "fr-be", "fr-ca", "es-la", "es-es", "es-ar", "es-us", "es-mx", "es-co", "es-pr", "de-de", "de-at", "de-ch", "ru-ru", "it-it", "el-gr", "no-no", "hu-hu", "tr-tr", "cs-cz", "sl-sl", "pl-pl", "sv-se", "es-cl"];
//google翻译api变量
var UA = navigator.userAgent;
var googleDomain = ["translate.google.cn", "translate.google.com"];
var dictURL = "https://" + googleDomain[translatorSettingLanguage] + "/translate_a/single?client=t";
var ttsURL = "http://" + googleDomain[translatorSettingLanguage] + "/translate_tts?client=t";
var audioContext= new AudioContext();
var tokenNameInStorage=["google_value_tk_zh_cn","google_value_tk_en_us"];
var isEnabled = true;
var oldText = "";
var speakerIconBase64Data="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QEQDhUFQkzk7wAAAIpJREFUOMtj/P//PwNFgAQD3jMwMDRg6MVjwHw0/n4GBob/DAwM5xkYGAQIGTAfqhgdFEDF1+MzAKYZl9P6oXIO2AxA1owsAXc2lH7PwMCwHtmA/zgwPLygYYBi0f///xmYSIgwByT2QxiDiYFCQIoBB5DY8rgSEtmBSLVopEpCokpSJjozMVKanQFy4nkNOfntnwAAAABJRU5ErkJggg==";
var ANS_TYPE_WORD=0,ANS_TYPE_SENTENCE=1,ANS_TYPE_ZDIC_HTML=2,ANS_TYPE_YOUDAO_WORD=3,ANS_TYPE_YOUDAO_SENTENCE=4;
var CACHE_TYPE_GOOGLE_RESULT=0,CACHE_TYPE_ZDIC_HTML=1,CACHE_TYPE_YOUDAO_WORD=2,CACHE_TYPE_YOUDAO_SENTENCE=3;

var lingoesServerConfigNameInStorage="lingoesServerConfig";
var defaultLingoesServerConfigValue="0|0|127.0.0.1|11111";
var lingoes_isEnabled=!1,lingoes_showingWay=0,lingoes_serverIp="127.0.0.1",lingoes_serverPort="11111";
var youdaoConfigNameInStorage="youdaoConfig";
var defaultYoudaoConfigValue="0|0|0";
var youdao_isEnabled=!1,youdao_isOnlyForSingleWord=!0;
var hotKeyNameInStorage="hotKeyName";
var hotKeyNameForQSInStorage = "QSHotKeyName";
var defaultHotKeyValue= "1|1|1|81"; //Ctrl+Alt+Q enabled
var defaultHotKeyValueForQS="1|1|1|68"; //Ctrl+Alt+D enabled
var hotKey_Ctrl=!0,hotKey_Alt=!0,hotKey_Code=81, hotkey_isActive = !0, isHotkeyEventRegistered=!1;
var hotKey_Ctrl_forQS = !0, hotKey_Alt_forQS = !0, hotKey_Code_forQS = 68, hotkey_isActive_forQS = !0, isHotkeyEventRegistered_forQS = !1;
var hotkeyType_forPlugin=0;
var hotkeyType_forQS=1;
//current target language for playing sound
var curTarLanForSpeaker = uLanguageCode[currentTranslateLanguage];

getHotKeyValue(hotkeyType_forPlugin);
getHotKeyValue(hotkeyType_forQS);
getLingoesConfigValue();
getYoudaoConfigValue();

window.document.body.addEventListener("mouseup", googleTranslate, false);

var on = function (node, e, f) {
    node.addEventListener(e, f, false);
};
var $ = function (s) {
    return document.getElementById('gt_prefs_' + s);
};


var setup=function() {
    var d = document;
    if ($('setup')) return;
    var styleNode = GM_addStyle('\
        #gt_prefs_setup { position:fixed;z-index:2147483647;top:30px;right:60px;padding:20px 30px;background:#eee;width:600px;border:1px solid black; }\
        #gt_prefs_setup * { color:black;text-align:left;line-height:normal;font-size:12px; }\
        #gt_prefs_setup a { color:black;text-decoration:underline; }\
        #gt_prefs_setup div { text-align:center;font-weight:bold;font-size:14px; }\
        #gt_prefs_setup ul { margin:15px 0 15px 0;padding:0;list-style:none;background:#eee;border:0; }\
        #gt_prefs_setup input, #gt_prefs_setup select { border:1px solid gray;width:auto;padding:2px;background:white; }\
        #gt_prefs_setup li { margin:0;padding:6px 0;vertical-align:middle;background:#eee;border:0 }\
        #gt_prefs_setup button { width:150px;margin:0 10px;text-align:center;}\
        #gt_prefs_setup textarea { width:98%; height:60px; margin:3px 0; }\
        #gt_prefs_setup b { font-weight: bold; font-family: "微软雅黑", sans-serif; }\
        #gt_prefs_setup button:disabled { color: graytext; }\
    ');

    var div = d.createElement('div');
    div.id = 'gt_prefs_setup';
    d.body.appendChild(div);
    var sb_Title=["谷歌点击划词翻译设置","Google select text translator Setting"],
        sb_CurStatus = [["（启用中）", "（禁用中）"], ["(Enabled)", "(Disabled)"]],
        sb_HotkeyForQuickSearch = ["快速查询热键：", "Hotkey for Quick Search:"],
        sb_HotkeyActivatorForQuickSearch = ["启用热键", "Enable Hotkey"],
        sb_Usage = ["插件开关热键：", "Hotkey for Plugin switch:"],
        sb_HotKeyActivator=["启用热键","Enable Hotkey"],
        sb_CurVersion=["当前版本：","Current Version "],
        sb_CurAuthor=["，作者：",", Author: "],
        sb_CurUILanguage=["，Current UI Language：",", 当前界面语言："],
        sb_UILanguage=[["Chinese Simplified","English"],["英文","中文"]],
        sb_SourceLanguage = ["指定源语言：", "Select the source language:"],
        sb_SourceLanguageSetToAuto = ["自动检测", "Auto Detect"],
        sb_TargetLanguage=["设置目标翻译语言：","Select the target language to translate:"],
        sb_Confirmation=[["确定","取消"],["Save","Cancel"]],
        sb_UseLingoesAPILocalServer=["启用本地灵格斯API服务（需要本机安装灵格斯词典软件，并在其设置中启用API服务器）。","Enable Lingoes Local API Server (Need Lingoes software installed, and enable it's API server)."],
        sb_LingoesAPIServerIP=["灵格斯API服务器 -- IP地址：","Lingoes Local API Server -- IP:"],
        sb_LingoesAPIServerPort=["端口号：","Port:"],
        sb_LingoesShowingWay=[["显示取词窗口","主界面取词","主界面翻译文字","查询方式："],["Showing query result","Main UI query","Main UI translator","Query way:"]],
        sb_LingoesErrorWarning=[["输入的IPv4地址不规范！本地地址一般为：127.0.0.1","端口号必须为0-65535间的数字！"],["The Ipv4 address is wrong! For localhost server, use 127.0.0.1 please!","Port number must be a digital between 0 to 65535"]],
        sb_UseYoudaoSever=["启用有道翻译代替谷歌翻译引擎（注：仅限中英互译）：","Use Youdao translator (PS: only used between Chinese and English):"],
        sb_YoudaoTranslationWay=[["全面启用","仅限单词"],["Totaly enabled","Only for words"]],
        sb_ErrorWarning=["输入的热键必须为字母或数字！","The hot key must be alphabet or digital!"];
    var divHtml = `
        <div>${sb_Title[translatorSettingLanguage]}${isEnabled ? sb_CurStatus[translatorSettingLanguage][0]: sb_CurStatus[translatorSettingLanguage][1]}</div>
            <ul>
                <li>${sb_CurVersion[translatorSettingLanguage]} <b>${gtVer}</b>${sb_CurAuthor[translatorSettingLanguage]}<b>Toprapid</b>${sb_CurUILanguage[translatorSettingLanguage]}
                    <select id="gt_prefs_se_curUILanguage">
                        <option value="0" selected="selected">${sb_UILanguage[translatorSettingLanguage][0]}</option>
                        <option value="1">${sb_UILanguage[translatorSettingLanguage][1]}</option>
                    </select>
                </li>
                <li>${sb_Usage[translatorSettingLanguage]}
                    <input type="checkbox" id="gt_prefs_cb_ctrl" value="Ctrl" />Ctrl<b>+</b>
                    <input type="checkbox" id="gt_prefs_cb_alt" value="Alt" />Alt<b>+</b>
                    <input type="text" maxlength="1" style="text-transform:uppercase;" onclick="javascript:this.select();" id="gt_prefs_txt_key" value="${String.fromCharCode(hotKey_Code)}" />
                    <input type="checkbox" id="gt_prefs_cb_stat" value="isActive" />${sb_HotKeyActivator[translatorSettingLanguage]}
                </li>
                <li>${sb_HotkeyForQuickSearch[translatorSettingLanguage]}
                    <input type="checkbox" id="gt_prefs_cb_ctrl_forQS" value="Ctrl" />Ctrl<b>+</b>
                    <input type="checkbox" id="gt_prefs_cb_alt_forQS" value="Alt" />Alt<b>+</b>
                    <input type="text" maxlength="1" style="text-transform:uppercase;" onclick="javascript:this.select();" id="gt_prefs_txt_key_forQS" value="${String.fromCharCode(hotKey_Code_forQS)}" />
                    <input type="checkbox" id="gt_prefs_cb_stat_forQS" value="isActive" />${sb_HotkeyActivatorForQuickSearch[translatorSettingLanguage]}
                </li>
                <li><input type="checkbox" id="gt_prefs_cb_stat_using_lingoes" onclick="javascript:document.getElementById('gt_prefs_li_lingoes_config').style.display=(this.checked ? 'block':'none');" value="isActive" />${sb_UseLingoesAPILocalServer[translatorSettingLanguage]}</li>
                <li id="gt_prefs_li_lingoes_config">${sb_LingoesAPIServerIP[translatorSettingLanguage]}
                       <input type="text" maxlength="15" onclick="javascript:this.select();" id="gt_prefs_txt_lingoes_ip" value="${lingoes_serverIp}" />
                       ${sb_LingoesAPIServerPort[translatorSettingLanguage]}
                       <input type="text" maxlength="15" onclick="javascript:this.select();" id="gt_prefs_txt_lingoes_port" value="${lingoes_serverPort}" />
                       <br/>
                       ${sb_LingoesShowingWay[translatorSettingLanguage][3]}
                       <select id="gt_prefs_se_lingoes_showingWay">
                       `;
    for (let i=0;i<3;i++){
            divHtml+=`<option value="${i}" ${lingoes_showingWay===i ? 'selected="selected"':''}>${sb_LingoesShowingWay[translatorSettingLanguage][i]}</option>`
    }
        divHtml+=`</select></li>
                <li>
                    <input type="checkbox" id="gt_prefs_cb_stat_using_youdao" value="isActive" />${sb_UseYoudaoSever[translatorSettingLanguage]}
                    <select id="gt_prefs_se_youdao_trans_way">
                        <option value="0" ${!youdao_isOnlyForSingleWord ? 'selected="selected"' : ''}>${sb_YoudaoTranslationWay[translatorSettingLanguage][0]}</option>
                        <option value="1" ${youdao_isOnlyForSingleWord ? 'selected="selected"' : ''}>${sb_YoudaoTranslationWay[translatorSettingLanguage][1]}</option>
                    </select>
                </li>
                <li>${sb_SourceLanguage[translatorSettingLanguage]}
                    <select id="gt_prefs_se_curSourceLanguage">
                        <option value="0" ${currentSourceLanguage < 0 ? 'selected="selected"' : ''}>${sb_SourceLanguageSetToAuto[translatorSettingLanguage]}</option>`;
    for (let i = 0; i < uLanguageCode.length; i++) {
        if (currentSourceLanguage === i) divHtml += `<option value="${i}" selected="selected">${uLanguageNames[translatorSettingLanguage][i]}-${uRegionNames[translatorSettingLanguage][i]}(${uLanguageCode[i]})</option>`;
        else divHtml += `<option value="${i}">${uLanguageNames[translatorSettingLanguage][i]}-${uRegionNames[translatorSettingLanguage][i]}(${uLanguageCode[i]})</option>`;
    }
    divHtml+=`</select>
                </li>
                <li>${sb_TargetLanguage[translatorSettingLanguage]}
                    <select id="gt_prefs_se_curTargetLanguage">`;
    for (let i=0;i<uLanguageCode.length;i++){
        if (currentTranslateLanguage===i) divHtml += `<option value="${i}" selected="selected">${uLanguageNames[translatorSettingLanguage][i]}-${uRegionNames[translatorSettingLanguage][i]}(${uLanguageCode[i]})</option>`;
        else divHtml+=`<option value="${i}">${uLanguageNames[translatorSettingLanguage][i]}-${uRegionNames[translatorSettingLanguage][i]}(${uLanguageCode[i]})</option>`;
    }
    divHtml += `</select>
                </li>
            </ul>
        <div><button id="gt_prefs_ok">${sb_Confirmation[translatorSettingLanguage][0]}</button><button id="gt_prefs_cancel">${sb_Confirmation[translatorSettingLanguage][1]}</button></div>`;
    div.innerHTML= divHtml;
    div = null;

    var close = function () {
        if (styleNode) {
            styleNode.parentNode.removeChild(styleNode);
        }
        var div = $('setup');
        div.parentNode.removeChild(div);
    };

    on($('ok'), 'click', function () {
        //save lingoes server config
        if(!/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/.test($("txt_lingoes_ip").value.trim())){
            alert(sb_LingoesErrorWarning[translatorSettingLanguage][0]);
            return;
        }
        if (!/^[0-9]{1,5}$/.test($("txt_lingoes_port").value.trim())){
            alert(sb_LingoesErrorWarning[translatorSettingLanguage][1]);
            return;
        }
        var portNum=parseInt($("txt_lingoes_port").value.trim());
        if (portNum<0&&portNum>65535){
            alert(sb_LingoesErrorWarning[translatorSettingLanguage][1]);
            return;
        }
        saveLingoesSettings($("cb_stat_using_lingoes").checked, $("se_lingoes_showingWay").selectedIndex, $("txt_lingoes_ip").value.trim(), $("txt_lingoes_port").value.trim());
        saveYoudaoSettings($("cb_stat_using_youdao").checked, $("se_youdao_trans_way").selectedIndex, null);
        if (translatorSettingLanguage===0){
            youdao_isEnabled= $("cb_stat_using_youdao").checked;
            GM_setValue(youdaoConfigNameInStorage,(youdao_isEnabled ? "1":"0")+"|1|0");
        }
        if ($("se_curUILanguage").selectedIndex > 0){
            translatorSettingLanguage= translatorSettingLanguage===0 ? 1:0;
            GM_setValue(translatorSettingLanguageInStorage, translatorSettingLanguage.toString());
            dictURL = "https://" + googleDomain[translatorSettingLanguage] + "/translate_a/single?client=t";
        }
        if ($("se_curSourceLanguage").selectedIndex !== currentSourceLanguage) {
            currentSourceLanguage = $("se_curSourceLanguage").selectedIndex - 1;
            GM_setValue(sourceTranslateLanguageNameInStorage, currentSourceLanguage.toString());
        }
        if ($("se_curTargetLanguage").selectedIndex!==currentTranslateLanguage){
            currentTranslateLanguage= $("se_curTargetLanguage").selectedIndex;
            GM_setValue(targetTranslateLanguageNameInStorage,currentTranslateLanguage.toString());
        }
        var kyc= $("txt_key").value.toUpperCase().charCodeAt(0);
        if (kyc!==hotKey_Code || $("cb_ctrl").checked!==hotKey_Ctrl || $("cb_alt").checked!==hotKey_Alt || $("cb_stat").checked!==hotkey_isActive){
            if (kyc<=128){
                makeAndSaveHotKeyValue($("cb_stat").checked, $("cb_ctrl").checked, $("cb_alt").checked, kyc, hotkeyType_forPlugin);
            }
            else{
                alert(sb_ErrorWarning[translatorSettingLanguage]);
            }
        }
        kyc = $("txt_key_forQS").value.toUpperCase().charCodeAt(0);
        if (kyc !== hotKey_Code_forQS || $("cb_ctrl_forQS").checked !== hotKey_Ctrl_forQS || $("cb_alt_forQS").checked !== hotKey_Alt_forQS || $("cb_stat_forQS").checked !== hotkey_isActive_forQS) {
            if (kyc <= 128) {
                makeAndSaveHotKeyValue($("cb_stat_forQS").checked, $("cb_ctrl_forQS").checked, $("cb_alt_forQS").checked, kyc, hotkeyType_forQS);
            }
            else {
                alert(sb_ErrorWarning[translatorSettingLanguage]);
            }
        }
        close();
    });
    if (lingoes_isEnabled) $("cb_stat_using_lingoes").checked = true;
    else $("li_lingoes_config").style.display = "none";
    $("se_youdao_trans_way").selectedIndex = youdao_isOnlyForSingleWord ? 1 : 0;
    $("cb_stat_using_youdao").checked = youdao_isEnabled;
    if (hotkey_isActive) $("cb_stat").checked = true;
    if (hotKey_Ctrl)$("cb_ctrl").checked = true;
    if (hotKey_Alt) $("cb_alt").checked = true;
    if (hotkey_isActive_forQS) $("cb_stat_forQS").checked = true;
    if (hotKey_Ctrl_forQS) $("cb_ctrl_forQS").checked = true;
    if (hotKey_Alt_forQS) $("cb_alt_forQS").checked = true;
    on($('cancel'), 'click', close);
};

function saveLingoesSettings(isEnabled,showingWay,ip,port){
    lingoes_isEnabled=isEnabled;
    var lingoesConfigStr = (lingoes_isEnabled ? "1|" : "0|") + (lingoes_showingWay = showingWay).toString() + "|" + (lingoes_serverIp = ip) + "|" + (lingoes_serverPort = port);
    GM_setValue(lingoesServerConfigNameInStorage, lingoesConfigStr);
}

function saveYoudaoSettings(isEnabled,showingWay,Reserved) {
    youdao_isEnabled=isEnabled;
    youdao_isOnlyForSingleWord = showingWay === 1;
    GM_setValue(youdaoConfigNameInStorage, (youdao_isEnabled ? "1|" : "0|") + (youdao_isOnlyForSingleWord ? "1|" : "0|") + (Reserved == null ? "0" : Reserved));
}

function makeAndSaveHotKeyValue(hkStat,hkCtrl,hkAlt,keyCode,hotkeyType) {
    var kv;
    switch(hotkeyType){
        case hotkeyType_forPlugin:
            kv = ((hotkey_isActive = hkStat) ? "1|" : "0|") + ((hotKey_Ctrl = hkCtrl) ? "1|" : "0|") + ((hotKey_Alt = hkAlt) ? "1|" : "0|") + (hotKey_Code = keyCode).toString();
            GM_setValue(hotKeyNameInStorage, kv);
            break;
        case hotkeyType_forQS:
            kv = ((hotkey_isActive_forQS = hkStat) ? "1|" : "0|") + ((hotKey_Ctrl_forQS = hkCtrl) ? "1|" : "0|") + ((hotKey_Alt_forQS = hkAlt) ? "1|" : "0|") + (hotKey_Code_forQS = keyCode).toString();
            GM_setValue(hotKeyNameForQSInStorage,kv);
            break;
        default:
            console.log("Error occured while make and save hot key value.");
            return;
    }
    registerHotKeyEvent(hotkeyType);
}

function getHotKeyValue(hotkeyType) {
    var keyCodes="";
    switch (hotkeyType){
        case hotkeyType_forPlugin:
            keyCodes = GM_getValue(hotKeyNameInStorage, defaultHotKeyValue).split("|");
            if (keyCodes.length !== 4) keyCodes = defaultHotKeyValue.split("|");
            hotKey_Ctrl = keyCodes[1] === "1";
            hotKey_Alt = keyCodes[2] === "1";
            hotKey_Code = parseInt(keyCodes[3]);
            hotkey_isActive = keyCodes[0] === "1";
            break;
        case hotkeyType_forQS:
            keyCodes = GM_getValue(hotKeyNameForQSInStorage, defaultHotKeyValueForQS).split("|");
            if (keyCodes.length !== 4) keyCodes = defaultHotKeyValueForQS.split("|");
            hotKey_Ctrl_forQS = keyCodes[1] === "1";
            hotKey_Alt_forQS = keyCodes[2] === "1";
            hotKey_Code_forQS= parseInt(keyCodes[3]);
            hotkey_isActive_forQS = keyCodes[0] === "1";
            break;
        default:
            return;
    }
    registerHotKeyEvent(hotkeyType);
}

function getLingoesConfigValue(){
    var rst = GM_getValue(lingoesServerConfigNameInStorage, defaultLingoesServerConfigValue).split("|");
    lingoes_isEnabled = rst[0] === "1";
    lingoes_showingWay = parseInt(rst[1]);
    lingoes_serverIp = rst[2];
    lingoes_serverPort = rst[3];
}

function getYoudaoConfigValue() {
    var rst = GM_getValue(youdaoConfigNameInStorage, defaultYoudaoConfigValue);
    youdao_isEnabled = rst[0] === "1";
    youdao_isOnlyForSingleWord = rst[1] === "1";
}

function registerHotKeyEvent(hotkeyType){
    switch(hotkeyType){
        case hotkeyType_forPlugin:
            if (hotkey_isActive) {
                if (!isHotkeyEventRegistered) {
                    window.document.body.addEventListener("keyup", toggleGoogleTranslate, false);
                    isHotkeyEventRegistered = !0;
                }
            }
            else {
                if (isHotkeyEventRegistered) {
                    window.document.body.removeEventListener("keyup", toggleGoogleTranslate, false);
                    isHotkeyEventRegistered = !1;
                }
            }
            break;
        case hotkeyType_forQS:
            if (hotkey_isActive_forQS) {
                if (!isHotkeyEventRegistered_forQS) {
                    window.document.body.addEventListener("keyup", toggleQuickSearch, false);
                    isHotkeyEventRegistered_forQS = !0;
                }
            }
            else {
                if (isHotkeyEventRegistered_forQS) {
                    window.document.body.removeEventListener("keyup", toggleQuickSearch, false);
                    isHotkeyEventRegistered_forQS = !1;
                }
            }
            break;
        default:
            return;
    }
}

GM_registerMenuCommand("Google select text translator Setting（谷歌划词设置）", setup);

function toggleGoogleTranslate(e) {
    if (e.keyCode === hotKey_Code && (hotKey_Alt ? e.altKey : e.altKey === false) && (hotKey_Ctrl ? e.ctrlKey : e.ctrlKey === false)) {
        if (isEnabled) {
            window.document.body.removeEventListener("mouseup", googleTranslate, false);
            alert(translatorSettingLanguage ? "Google select text translator is disabled!":"谷歌点击划词翻译，已禁用！");
            isEnabled = false;
        } else {
            window.document.body.addEventListener("mouseup", googleTranslate, false);
            alert(translatorSettingLanguage ? "Google select text translator is enabled!" : "谷歌点击划词翻译，已启用！");
            isEnabled = true;
        }
    }
}

var quickSearchDiv=null;
var searchBox=null;
var oldSIdx=-1,oldDIdx=-1;
function toggleQuickSearch(e) {
    if (e.keyCode === hotKey_Code_forQS && (hotKey_Alt_forQS ? e.altKey : e.altKey === false) && (hotKey_Ctrl_forQS ? e.ctrlKey : e.ctrlKey === false)) {
        //Showing quick searching pannel
        if (!quickSearchDiv){
            GM_addStyle(`
                #gt_prefs_quickSearch { position:fixed;z-index:2147483647;top:30%;left:30%;width:40%;padding:0.3%;background:#eee;border:1px solid black; }
                #gt_prefs_quickSearch * { color:black;text-align:left;line-height:normal;font-size:12px; }
                #gt_prefs_quickSearch a { color:black;text-decoration:underline; }
                #gt_prefs_quickSearch div { text-align:center;font-weight:bold;font-size:14px; }
                #gt_prefs_quickSearch ul { margin:15px 0 15px 0;padding:0;list-style:none;background:#eee;border:0; }
                #gt_prefs_quickSearch input {width:99%;border:1px solid gray;padding:2px;background:white;text-align:center;}
                #gt_prefs_quickSearch select {width:auto;border:1px solid gray;padding:2px;background:white;}
                #gt_prefs_quickSearch li { margin:0;padding:6px 0;vertical-align:middle;background:#eee;border:0 }
                #gt_prefs_quickSearch button { width:150px;margin:0 10px;text-align:center;}
                #gt_prefs_quickSearch textarea { width:98%; height:98%; margin:3px 0; }
                #gt_prefs_quickSearch p,b { font-weight: bold; margin:2px 4px; font-family: "微软雅黑", sans-serif;text-align:center; }
                #gt_prefs_quickSearch button:disabled { color: graytext; }
            `);
            quickSearchDiv = document.createElement('div');
            quickSearchDiv.id = 'gt_prefs_quickSearch';
            document.body.appendChild(quickSearchDiv);
            searchBox=null;
            searchBox=document.createElement("input");
            searchBox.id ="gt_prefs_searchBox";
            searchBox.value = "";
            searchBox.align="center";
            searchBox.onkeyup=function (e) {
                //ENTER
                if (e.keyCode===13){
                    queryIt();
                }
                //ESC
                if (e.keyCode===27){
                    if (searchBox.value==="") quickSearchDiv.style.display = "none";
                    else searchBox.value="";
                }
            }
            var queryIt=function () {
                var queryStr = searchBox.value.trim();
                if (queryStr === "") {
                    quickSearchDiv.style.display = "none";
                    return;
                }
                var nSIdx= $("srcLanguageSelector").selectedIndex;
                var nDIdx= $("dstLanguageSelector").selectedIndex;
                if (oldText===queryStr){
                    if (nSIdx===oldSIdx&&nDIdx===oldDIdx) {
                        var translatorDiv = $("translatorDiv");
                        if (translatorDiv) {
                            if (translatorDiv.style.display === "none") translatorDiv.style.display = "block";
                        }
                        return;
                    }
                }
                translateIt((oldSIdx=nSIdx) <= 0 ? "auto" : uLanguageCode[nSIdx - 1], uLanguageCode[(oldDIdx=nDIdx)], oldText = queryStr, quickSearchDiv.offsetLeft, quickSearchDiv.offsetTop + quickSearchDiv.offsetHeight);
            }
            var hintText=document.createElement("p");
            hintText.id = "gt_prefs_hintText";
            hintText.innerText=translatorSettingLanguage===0 ? "输入要查询的单词或句子（按回车进行查询，按ESC退出查询）：":"Enter the word or sentence you want to query ( Press enter to query, ESC to exit or clear.) :";
            var srcLanguageSelector=document.createElement("select");
            srcLanguageSelector.id = "gt_prefs_srcLanguageSelector";
            var divHtml=`<option value="0" ${currentSourceLanguage < 0 ? 'selected="selected"' : ''}>${translatorSettingLanguage===0 ? "自动检测":"Auto Detect"}</option>;`;
            for (let i = 0; i < uLanguageCode.length; i++) {
                if (currentSourceLanguage === i) divHtml += `<option value="${i}" selected="selected">${uLanguageNames[translatorSettingLanguage][i]}-${uRegionNames[translatorSettingLanguage][i]}(${uLanguageCode[i]})</option>`;
                else divHtml += `<option value="${i}">${uLanguageNames[translatorSettingLanguage][i]}-${uRegionNames[translatorSettingLanguage][i]}(${uLanguageCode[i]})</option>`;
            }
            srcLanguageSelector.innerHTML=divHtml;
            var dstLanguageSelector=document.createElement("select");
            dstLanguageSelector.id="gt_prefs_dstLanguageSelector";
            divHtml = "";
            for (let i = 0; i < uLanguageCode.length; i++) {
                if (currentTranslateLanguage === i) divHtml += `<option value="${i}" selected="selected">${uLanguageNames[translatorSettingLanguage][i]}-${uRegionNames[translatorSettingLanguage][i]}(${uLanguageCode[i]})</option>`;
                else divHtml += `<option value="${i}">${uLanguageNames[translatorSettingLanguage][i]}-${uRegionNames[translatorSettingLanguage][i]}(${uLanguageCode[i]})</option>`;
            }
            dstLanguageSelector.innerHTML=divHtml;
            var languageChooseParagraph= document.createElement("p");
            languageChooseParagraph.appendChild(document.createTextNode(translatorSettingLanguage === 0 ? "源语言：" : "Source language:"));
            languageChooseParagraph.appendChild(srcLanguageSelector);
            languageChooseParagraph.appendChild(document.createTextNode(translatorSettingLanguage === 0 ? "==>目标语言：" : "==>Destination language:"));
            languageChooseParagraph.appendChild(dstLanguageSelector);
            var btnQuery=document.createElement("button");
            btnQuery.onclick=queryIt;
            btnQuery.innerText = translatorSettingLanguage === 0 ? "查询" : "Query";
            var btnExit=document.createElement("button");
            btnExit.onclick=function (e) {
                quickSearchDiv.style.display = "none";
            }
            btnExit.innerText = translatorSettingLanguage === 0 ? "退出" : "Exit";
            var btnParagraph=document.createElement("p");
            btnParagraph.appendChild(btnQuery);
            btnParagraph.appendChild(btnExit);
            quickSearchDiv.appendChild(hintText);
            quickSearchDiv.appendChild(searchBox);
            quickSearchDiv.appendChild(languageChooseParagraph);
            quickSearchDiv.appendChild(btnParagraph);
            searchBox.focus();
            return;
        }
        if (quickSearchDiv.style.display === "none"){
            quickSearchDiv.style.display = "block";
            searchBox.focus();
        }
        else quickSearchDiv.style.display="none";
    }
}

function GetTranslation(queryStr, mx, my) {
    currentTranslateLanguage = parseInt(GM_getValue(targetTranslateLanguageNameInStorage, defaultTranslateLanguage));
    currentSourceLanguage = parseInt(GM_getValue(sourceTranslateLanguageNameInStorage, defaultSourceLanguage));
    if (lingoes_isEnabled){
        var url=null;
        if (lingoes_showingWay<2){
            if (!/\s+/gi.test(queryStr)) {
                switch(lingoes_showingWay){
                    case 0:
                        url = `http://${lingoes_serverIp}:${lingoes_serverPort}/lingoes?cmd=mini_search&text=${encodeURI(queryStr)}&pos_x=${mx}&pos_y=${my}`;
                        break;
                    case 1:
                        url = `http://${lingoes_serverIp}:${lingoes_serverPort}/lingoes?cmd=main_search&text=${encodeURI(queryStr)}&pos_x=${mx}&pos_y=${my}`;
                        break;
                }
            }
        }
        else{
            url = `http://${lingoes_serverIp}:${lingoes_serverPort}/lingoes?cmd=main_translator&text=${encodeURI(queryStr)}&pos_x=${mx}&pos_y=${my}`;
        }
        if (url!=null){
            GM_xmlhttpRequest({
                method:"GET",
                url:url,
                headers: {
                    "User-Agent": UA,
                    "Accept": "application/json"
                },
                onerror: function (err) {
                    alert(translatorSettingLanguage===0 ? "与灵格斯API服务器的通信失败，已自动禁用灵格斯词典调用功能！\n请保证您的电脑安装有灵格斯词典软件，并在设置中启用了API服务器，且正确的设置了IP与端口地址！":"Failed to fetch from lingoes API sever, disable the query from lingoes automatically!\n Please ensure you got a lingoes, and enabled the API server from it's setting, and sets the right ip and port number in the setting of this plugin.");
                    console.log("failed to fetch from lingoes sever, disable lingoes server automatically.",err);
                    saveLingoesSettings(false,lingoes_showingWay,lingoes_serverIp,lingoes_serverPort);
                }
            });
        }
    }
    translateIt(currentSourceLanguage < 0 ? "auto" : uLanguageCode[currentSourceLanguage], uLanguageCode[currentTranslateLanguage], queryStr, mx, my);
}

function checkIsSoundIconClicked(e) {
    return e.target.className === "gt_prefs_img_for_play_sound";
    //return e.target.id === "gt_prefs_img_for_play_sound1" || e.target.id === "gt_prefs_img_for_play_sound2" || e.target.id === "gt_prefs_img_for_play_sound3";
}

function googleTranslate(e) {
    if (checkIsSoundIconClicked(e))return;
    // remove previous .googleTranslatePopup if exists
    var gotPrevious = $("translatorDiv") != null ? $("translatorDiv").style.display !== "none" ? ($("translatorDiv").style.display = "none") === "none" : false : false;
    //console.log("googleTranslate start");
    var selectObj = document.getSelection();

    // if #text node
    if (selectObj.anchorNode && selectObj.anchorNode.nodeType == 3) {
        var selectedText = selectObj.toString().trim();
        if (selectedText === "") return;
        if (gotPrevious) if (selectedText === oldText) return;
        oldText = selectedText;
        // linebreak wordwrap, multiline selection, optimize for pdf.js,
        selectedText = selectedText.replace('-\n', '').replace('\n', ' ').replace(/[&]+/g, currentSourceLanguage >= 0 && currentSourceLanguage < 3 ? "和" : " and ").replace(/[\+]+/g, currentSourceLanguage >= 0 && currentSourceLanguage < 3 ? "加" : " plus ");
        GetTranslation(selectedText, e.clientX, e.clientY);
    }
}

var timerHide=-1;
function popup(mx, my, result) {
    var translatorDiv = $("translatorDiv");
    var clearTimerHide=function () {
        if (timerHide > 0){
            clearTimeout(timerHide);
            timerHide=-1;
        }
    }
    if (!translatorDiv){
        translatorDiv = document.createElement('div');
        translatorDiv.id = "gt_prefs_translatorDiv";
        document.body.appendChild(translatorDiv);
        translatorDiv.style.color = "black";
        translatorDiv.style.textAlign = "left";
        translatorDiv.style.display = "block";
        translatorDiv.style.position = "fixed";
        translatorDiv.style.background = "lightblue";
        translatorDiv.style.borderRadius = "5px";
        translatorDiv.style.boxShadow = "0 0 5px 0";
        translatorDiv.style.opacity = "0.9";
        translatorDiv.style.width = "400px";
        translatorDiv.style.wordWrap = "break-word";
        translatorDiv.onclick = function (e) {
            if (!checkIsSoundIconClicked(e))translatorDiv.style.display="none";
        }
        translatorDiv.onmouseleave=function (e) {
            timerHide=setTimeout(function(){translatorDiv.style.display = "none"},10000);
        }
        translatorDiv.onmouseenter= clearTimerHide;
        GM_addStyle(`
            .gt_prefs_img_for_play_sound{width:16px;height:16px;}
            .gt_prefs_translator_div_li{list-style:none;margin:0px;padding:0px;background:none;width:100%;color:inherit;font-family:Tahoma;font-size:12px;}
        `);
    }
    else{
        translatorDiv.innerHTML = "";
        clearTimerHide();
        translatorDiv.style.display="block";
    }
    // parse
    var resultTxt = getTargetAnswer(result);
    if (resultTxt) createShower();
    else {
        console.log("resultTxt is null!");
        return;
    }
    // main window
    // first insert into dom then there is offsetHeight！IMPORTANT！
    translatorDiv.style.left = mx + 10 + "px";
    if (mx + 400 + 30 >= window.innerWidth) {
        translatorDiv.style.left = parseInt(translatorDiv.style.left) - 400 + "px";
    }
    if (my + translatorDiv.offsetHeight + 30 >= window.innerHeight) {
        translatorDiv.style.top = "auto";
        translatorDiv.style.bottom = "20px";
    }
    else {
        translatorDiv.style.top = my + 10 + "px";
        translatorDiv.style.bottom = "auto";
    }
    translatorDiv.style.padding = "5px";
    translatorDiv.style.zIndex = '999999';

    function createShower() {
        var el = null;
        switch (resultTxt[0]) {
            case ANS_TYPE_ZDIC_HTML:
                var el = document.createElement("div");
                el.innerHTML=`<style type="text/css">
.tagContent {font-family:"Trebuchet MS", Verdana, Geneva, Arial, Helvetica, sans-serif;font-size:14px;padding:5px;overflow:hidden}
.tagContent h1{color:#660000;font-size:14px;font-weight:bold;margin-right:5px;padding:2px 0px 2px 10px;}
.tagContent h2{color:#333333;font-size:14px;font-weight:bold;margin-right:5px;padding:2px 0px 2px 10px;}
.tagContent .dicpy {color: #990033;}
.tagContent .diczy {color: #000099;}
.tagContent td{padding:0px;margin:0px;}
.tagContent .diczx1{color:#003366;}
.tagContent .diczx2{color:#990000;}
.tagContent .diczx3{color:#000066;}
.tagContent .diczx4{color:#845247;}
.tagContent .dicpy{font-size: 12px;font-family:pinyin;color:#660000;}
.tagContent .diczy{font-size: 12px;font-family:pinyin;color:#660000;}
.tagContent .diczx6{font-weight:bold;color:#48623C;}
.tagContent .diczx7{font-weight:bold;color:#303E59;}
.tagContent p {line-height:18px;}
.footer {text-align:center;}
.footer .copyright {font-size:8px;color:#CCCCCC}
#con {	FONT-SIZE: 12px; MARGIN: 0px auto; WIDTH: 100%}
#tags {	PADDING-RIGHT: 0px; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px 0px 0px 0px; WIDTH: 100%; PADDING-TOP: 0px; HEIGHT: 33px;}
#tags LI {	 FLOAT: left; MARGIN-RIGHT: 1px; LIST-STYLE-TYPE: none; HEIGHT: 23px}
#tags LI .ff{FONT-SIZE: 14px;}
#tags LI A {	PADDING-RIGHT: 5px; PADDING-LEFT: 5px;  FLOAT: left; PADDING-BOTTOM: 0px; COLOR: #999; LINE-HEIGHT: 23px; PADDING-TOP: 0px; HEIGHT: 23px; TEXT-DECORATION: none;}
#tags LI.emptyTag {}
#tags LI.selectTag {	BACKGROUND-POSITION: left top; MARGIN-BOTTOM: -2px; POSITION: relative; HEIGHT: 23px}
#tags LI.selectTag A {	BACKGROUND-POSITION: right top; COLOR: #000; LINE-HEIGHT: 23px; HEIGHT: 23px}
#tagContent {}
.tagContent {	PADDING-RIGHT: 5px; DISPLAY: block; PADDING-LEFT: 5px; PADDING-BOTTOM: 0px; COLOR: #474747; PADDING-TOP: 0px;}
#tagContent DIV.selectTag {DISPLAY: block}
.jbjs_ol {margin:10px 6px 10px 35px;}
.jbjs_ol li{list-style-position:outside;list-style-type:decimal;}

.zui {
margin:0;
padding:0;
width: 100%;
height:58px;
}
.zuib {
margin:0;
padding:0;
background:none;
height:58px;
width:58px;
}
.swxz {
width:58px;
FLOAT: left;
}
.hb{
border-top:1px solid transparent !important;
margin-top:-1px !important;
border-top:0;
margin-top:0;
clear:both;
visibility:hidden;
}
.jieshi{
font-weight:bold;
}
.swjs1{
clear: both;
}
.swjs2{
clear: both;
text-align:left;
}
.cdnr {font-family:"Trebuchet MS", Verdana, Geneva, Arial, Helvetica, sans-serif;font-size:14px;padding:5px;}
.cdnr h1{color:#660000;font-size:14px;font-weight:bold;margin-right:5px;padding:2px 0px 2px 10px;}
.cdnr h2{color:#333333;font-size:14px;font-weight:bold;margin-right:5px;padding:2px 0px 2px 10px;}
.cdnr .dicpy {color: #990033;}
.cdnr .diczy {color: #000099;}
.cdnr td{padding:0px;margin:0px;}
.cdnr .info{color:#999;font-size:14px;margin-right:5px;padding-left:10px;}
.cdnr .mut_jies{padding:10px 20px 20px 20px;font-size:14px;color:#444444;line-height:22px;}
.cdnr .yf_all{background:none;padding:3px 4px 4px 4px;}
.cdnr .if_all{color:#fff;none no-repeat left;padding:3px 4px 4px 6px;}
.cdnr .mut_lvs{color:#090;font-weight:bolder;}
.cdnr h3{padding-left:15px;color:#000;line-height:26px;font-size:14px;background:transparent scroll center bottom;}
.cdnr .mut_ol{margin:10px 6px 10px 35px;}
.cdnr .mut_ol li{list-style-position:outside;list-style-type:decimal;}
.cdnr .mut_ol .ty{color:gray;}
.cdnr .mut_ol .ty a{color:#2b919f;}
.cdnr .mut_h3s{color:#090;font-weight:bolder;padding:10px 20px 0 15px;}
.cdnr .jiaru_s{margin:10px 0;text-align:center;}
.cdnr .more{margin:10px 10px 10px 15px;font-size:13px;}
.cdnr .mutti_pp{padding:10px;}
.cdnr .diczx1{color:#003366;}
.cdnr .diczx2{color:#990000;}
.cdnr .diczx3{color:#000066;}
.cdnr .diczx4{color:#006600;}
.cdnr p {border-bottom:1px dotted #999999;line-height:18px;}
.footer {text-align:center;}
.footer .copyright {font-size:8px;color:#CCCCCC}

.gycd ul, ol {
    margin-bottom: 10px;
    margin-top: 0;
}

.gc_uono {
    list-style: outside none none;
    margin-left: 1.5em;
}

.gycd {
	  font-size: 100%;
    line-height: 1.5;
    padding-bottom: 5px;
}
.gc_sy {
    clear: both;
    display: block;
    margin-bottom: 2pt;
    font-weight: 700;
}
.gc_yy {
    clear: both;
    display: block;
    font-size: 92%;
	color:#674f4f;
}
.gc_lz {
    clear: both;
    display: block;
}
.gc_yx {
    clear: both;
    display: block;
}
.gc_fy, .gc_jy {
    clear: both;
    display: block;
    font-size: 85%;
    margin-top: 2px;
    font-weight: 700;
	color:#666;
}
.gc_jfy_i {
    background-color: #633;
    border-radius: 4px;
    color: white;
    font-size: 100%;
    line-height: 1;
    padding: 2px;
    margin-right:5px;
}
.pz{border-bottom:1px dashed #F1E9E7;}
.pz ruby{margin-left:20px;}
.pz ruby rbc{font-size:150%;line-height:30px;font-weight:bold;}
.pz ruby rtc{font-size:80%;color:#8F6652;line-height:30px;}
                </style>`;
                el.innerHTML += resultTxt[1];
                el.style.height = "500px";
                el.style.overflow = "auto";
                break;
            case ANS_TYPE_YOUDAO_SENTENCE:
                el = document.createElement('ul');
                el.style.margin = "0";
                el.style.padding = "0";
                resultTxt[1]['translation'].map(function (trans) {
                    var li = document.createElement('li');
                    li.className="gt_prefs_translator_div_li";
                    li.appendChild(document.createTextNode(trans));
                    el.appendChild(li);
                });
                break;
            case ANS_TYPE_YOUDAO_WORD:
                el = document.createElement("div");
                el.style.fontSize = "12px";
                el.style.fontFamily="Tahoma";
                var basic = resultTxt[1]['basic'];
                var header = document.createElement('p');
                // header
                var span = document.createElement('span');
                span.innerHTML = resultTxt[1]["query"];
                header.appendChild(span);
                // phonetic if there is
                var phonetic = basic['phonetic'];
                if (phonetic) {
                    var phoneticNode = document.createElement('span');
                    phoneticNode.innerHTML = '[' + phonetic + ']&nbsp;&nbsp;';
                    phoneticNode.style.cursor = "pointer";
                    header.appendChild(phoneticNode);
                    var img3 = document.createElement('img');
                    img3.setAttribute('src', speakerIconBase64Data);
                    img3.className = "gt_prefs_img_for_play_sound";
                    img3.onclick = function (e) {
                        if (e.target === img3) {
                            e.stopPropagation();
                            YouDaoPlay(resultTxt[1]["query"]);
                        }
                    }
                    header.appendChild(img3);
                }
                header.style.color = "darkBlue";
                header.style.margin = "0";
                header.style.padding = "0";
                span.style.fontweight = "900";
                span.style.color = "black";

                el.appendChild(header);
                var hr = document.createElement('hr');
                hr.style.margin = "0";
                hr.style.padding = "0";
                hr.style.height = "1px";
                hr.style.borderTop = "dashed 1px black";
                el.appendChild(hr);
                var ul = document.createElement('ul');
                // ul style
                ul.style.margin = "0";
                ul.style.padding = "0";
                basic['explains'].map(function (trans) {
                    var li = document.createElement('li');
                    li.style.listStyle = "none";
                    li.style.margin = "0";
                    li.style.padding = "0";
                    li.style.background = "none";
                    li.style.color = "inherit";
                    li.appendChild(document.createTextNode(trans));
                    ul.appendChild(li);
                });
                el.appendChild(ul);
                break;
            case ANS_TYPE_WORD:
            case ANS_TYPE_SENTENCE:
                el = document.createElement('ul');
                el.style.margin = "0";
                el.style.padding = "0";
                var trans= resultTxt[1].split("\n");
                var i=0;
                if (resultTxt[0] === ANS_TYPE_WORD){
                    var li1 = document.createElement("li");
                    li1.className = "gt_prefs_translator_div_li";
                    i = 2;
                    if (trans[2]==="true"){
                        li1.innerHTML=trans[3]+"&nbsp;&nbsp;";
                        i = 4;
                    }
                    var img1 = document.createElement('img');
                    img1.setAttribute('src', speakerIconBase64Data);
                    img1.className = "gt_prefs_img_for_play_sound";
                    img1.onclick=function () {
                        playTTS(trans[0],trans[1]);
                    }
                    li1.appendChild(img1);
                    el.appendChild(li1);
                    var li2=document.createElement("li");
                    li2.className = "gt_prefs_translator_div_li";
                    li2.innerHTML=trans[i++]+ "&nbsp;&nbsp;";
                    var img2 = document.createElement('img');
                    img2.setAttribute('src', speakerIconBase64Data);
                    img2.className = "gt_prefs_img_for_play_sound";
                    var z=i++;
                    img2.onclick = function () {
                        playTTS(curTarLanForSpeaker, trans[z]);
                    }
                    li2.appendChild(img2);
                    el.appendChild(li2);
                }
                for (;i<trans.length;i++){
                    var li = document.createElement('li');
                    li.className = "gt_prefs_translator_div_li";
                    resultTxt[0] === ANS_TYPE_WORD ? li.innerHTML = trans[i] : li.appendChild(document.createTextNode(trans[i]));
                    el.appendChild(li);
                }
                break;
            default:
                return;
        }
        translatorDiv.appendChild(el);
    }
}

function checkIsWordOrNot(txt,maxWordLength, isChineseWord) {
    if (isChineseWord)return txt.length <= maxWordLength && /^([\u4E00-\u9FA5]|[\uFF00-\uFF20]|[\u3000-\u301C])+$/g.test(txt);
    else return txt.length <= maxWordLength && !/\s+/gi.test(txt);
}

function translateIt(srcLanguage, dstLanguage, queryStr, mx, my) {
    queryStr = queryStr.trim();
    if (queryStr === "") return;
    curTarLanForSpeaker=dstLanguage;
    var targetMd5 = MD5(queryStr, srcLanguage + dstLanguage, null);
    var sps = searchInTranslateCache(targetMd5);
    if (sps) {
        popup(mx, my, sps);
    }
    else {
        var googleCallBackFunc = function (arrayTxt) {
            //console.log("返回值为：" + arrayTxt);
            if (arrayTxt != 'undefined' && arrayTxt != null) {
                transCache.push([CACHE_TYPE_GOOGLE_RESULT, arrayTxt]);
                transMd5Cache.push(targetMd5);
                popup(mx, my, [CACHE_TYPE_GOOGLE_RESULT, arrayTxt]);
            }
        };
        var youdaoCallBackFunc=function (repArray, bIsSuccess) {
            if (bIsSuccess) {
                if (repArray != null || repArray != "undefined") {
                    var dictJson = JSON.parse(repArray);
                    transCache.push([dictJson['basic'] ? CACHE_TYPE_YOUDAO_WORD:CACHE_TYPE_YOUDAO_SENTENCE, dictJson]);
                    transMd5Cache.push(targetMd5);
                    popup(mx, my, [dictJson['basic'] ? CACHE_TYPE_YOUDAO_WORD : CACHE_TYPE_YOUDAO_SENTENCE, dictJson]);
                    return;
                }
            }
            Request(queryStr, srcLanguage, dstLanguage, googleCallBackFunc);
        };
        var getYoudaoTranslation=function (maxWordLength) {
            if (youdao_isEnabled) {
                if (youdao_isOnlyForSingleWord) {
                    if (checkIsWordOrNot(queryStr, maxWordLength, false)) YoudaoRequest(queryStr, youdaoCallBackFunc);
                    else Request(queryStr, srcLanguage, dstLanguage, googleCallBackFunc);
                }
                else YoudaoRequest(queryStr, youdaoCallBackFunc);
            }
            else Request(queryStr, srcLanguage, dstLanguage, googleCallBackFunc);
        };
        switch (dstLanguage){
            case "zh-cn":
            case "zh-tw":
            case "zh-hk":
                //if query string is chinese word with max four characters
                if (checkIsWordOrNot(queryStr, 4, true)) {
                    ZdicRequest(queryStr, function (repHtml, finalUrl, bIsSuccess) {
                        if (bIsSuccess) {
                            if (repHtml != null || repHtml != "undefined") {
                                transCache.push([CACHE_TYPE_ZDIC_HTML, repHtml]);
                                transMd5Cache.push(targetMd5);
                                popup(mx, my, [CACHE_TYPE_ZDIC_HTML, repHtml]);
                                return;
                            }
                        }
                        getYoudaoTranslation(8);
                    });
                    return;
                }
                else getYoudaoTranslation(8);
                return;
            case "en-hk":
            case "en-us":
            case "en-gb":
            case "en-ww":
            case "en-ca":
            case "en-au":
                //if translate from Chinese to English
                if (/([\u4E00-\u9FA5]|[\uFF00-\uFF20]|[\u3000-\u301C])+/g.test(queryStr)){
                    getYoudaoTranslation(30);
                    return;
                }
                break;
            default:
                break;
        }
        Request(queryStr, srcLanguage, dstLanguage, googleCallBackFunc);
    }
}

function getYoudaoTranslation(queryStr, youdaoCallBackFunc, googleCallBackFunc){
    if (youdao_isEnabled) {
        if (youdao_isOnlyForSingleWord) {
            if (checkIsWordOrNot(queryStr, 30, false)) YoudaoRequest(queryStr, youdaoCallBackFunc);
            else Request(queryStr, srcLanguage, dstLanguage, googleCallBackFunc);
        }
        else YoudaoRequest(queryStr, youdaoCallBackFunc);
    }
}

function playSound(buffer) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
}

function YouDaoPlay(word) {
    var txtMd5 = MD5(word, "YouDaoEnToCn" + CACHE_TYPE_YOUDAO_WORD, null);
    var buf = searchInTransSoundCache(txtMd5);
    if (buf) {
        playSound(buf);
        return;
    }
    GM_xmlhttpRequest({
        method: "GET",
        url: `https://dict.youdao.com/dictvoice?type=2&audio=${encodeURI(word)}`,
        responseType: 'arraybuffer',
        onload: function(resp) {
            try {
                audioContext.decodeAudioData(resp.response, function (buffer) {
                    transSoundMd5Cache.push(txtMd5);
                    transSoundCache.push(buffer);
                    playSound(buffer);
                });
            } catch (e) {
                console.log(e);
            }
        }
    });
}

function YoudaoRequest(queryStr,callBackFunc) {
    GM_xmlhttpRequest({
        method: "GET",
        url: `http://fanyi.youdao.com/openapi.do?type=data&doctype=json&version=1.1&relatedUrl=http%3A%2F%2Ffanyi.youdao.com%2F%23&keyfrom=fanyiweb&key=null&translate=on&q=${queryStr}&ts=${(new Date().getTime()).toString()}`,
        headers: {
            "Accept": "application/json"
        },
        onload: function (resp) {
            if (resp.statusText==="OK"){
                callBackFunc(resp.responseText,true);
                return;
            }
            callBackFunc(null,false);
        }
    });
}

function ZdicRequest(queryStr,callBackFunc) {
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://www.zdic.net/search/?c=3&q="+encodeURI(queryStr),
        headers:{
            "User-Agent": UA,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Encoding": "GBK,gzip,deflate"
        },
        onload: function (resp) {
                try {
                    if (resp.statusText === "OK") {
                        //if got the right answer
                        if (resp.responseText.indexOf("<center>友情提示：") < 0) {
                            //fetch only the body part
                            var bodyIndex = resp.responseText.toUpperCase().indexOf("<BODY>") + 6;
                            var bodyHtml = resp.responseText.substring(resp.responseText.toUpperCase().indexOf("<BODY>") + 6, resp.responseText.toUpperCase().indexOf("</BODY>"));
                            //remove all images
                            var bIndex= bodyHtml.indexOf("<img ");
                            var resultHtml = bIndex > 0 ? bodyHtml.substring(0, bIndex) : bodyHtml;
                            var eIndex = bIndex > 0 ? bodyHtml.indexOf(">", bIndex) : -1;
                            while (bIndex>0&&eIndex>0) {
                                bIndex = bodyHtml.indexOf("<img ", eIndex);
                                if (bIndex > 0) {
                                    if (bIndex !== eIndex + 1) resultHtml += bodyHtml.substring(eIndex + 1, bIndex);
                                    eIndex = bodyHtml.indexOf(">", bIndex);
                                }
                            }
                            if (eIndex>0) resultHtml += bodyHtml.substr(eIndex + 1, bodyHtml.length-eIndex);
                            resultHtml = resultHtml.replace(/[(href)(src)]+=["']{1}\/[\.\w\-_]+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])["']{1}/gi,"").replace(/<p class="zdct[0-9]{1}">[\.&#0-9a-z; 　‍ \u6c49\u5178\u6f22\u25ce\u7db2\u7f51\uff08\uff09\u3010\u3011\u300a\u300b\u3014\u3015\u300e\u300f\(\)\[\]]+<\/p>/gi,"");
                            callBackFunc(resultHtml, resp.finalUrl, true);
                            return;
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
               callBackFunc(null, null, false);
        }
    });
}

function getTargetAnswer(resultObj) {
    if (resultObj) {
        switch(resultObj[0]){
            case CACHE_TYPE_ZDIC_HTML:
                return [ANS_TYPE_ZDIC_HTML, resultObj[1]];
            case CACHE_TYPE_YOUDAO_SENTENCE:
                return [ANS_TYPE_YOUDAO_SENTENCE, resultObj[1]];
            case CACHE_TYPE_YOUDAO_WORD:
                return [ANS_TYPE_YOUDAO_WORD, resultObj[1]];
            case CACHE_TYPE_GOOGLE_RESULT:
                try {
                    var arr = JSON.parse(resultObj[1]);
                    if (arr[0]) {
                        var len = arr[0].length;
                        //the normal return is len>=2
                        if (len > 1) {
                            var resultTxt = "";
                            //if target string is a word
                            var ansType = ANS_TYPE_SENTENCE;
                            if (arr[1]) {
                                resultTxt+=`${arr[2]}\n${arr[0][0][1]}\n`;
                                if (arr[0][1][3] != null) if (arr[0][1][3] != "") resultTxt += `true\n<b style="color:blue;">[${arr[0][1][3]}]</b>\n`;
                                resultTxt += `<b style="color:Red;">${arr[0][0][0]}</b>&nbsp;${arr[0][1][2] == null ? "" : "[" + arr[0][1][2] + "]"}\n${arr[0][0][0]}\n`;
                                var len1 = arr[1].length;
                                for (let z1 = 0; z1 < len1; z1++) {
                                    resultTxt += `<b style="color:Green;">${arr[1][z1][0]}</b>&nbsp;&nbsp;&nbsp;&nbsp;`;
                                    var len2 = arr[1][z1][1].length;
                                    for (let n1 = 0; n1 < len2; n1++) {
                                        resultTxt += `${arr[1][z1][1][n1]};&nbsp;`;
                                    }
                                    resultTxt += "\n";
                                }
                                ansType = ANS_TYPE_WORD;
                            }
                            else {
                                for (let z2 = 0; z2 < len - 1; z2++) {
                                    resultTxt += arr[0][z2][0];
                                }
                            }
                        }
                        else {
                            if (len === 1) resultTxt = arr[0][0][0];
                            else return null;
                        }
                        return resultTxt === "" ? null : [ansType, resultTxt];
                    }
                }
                catch (e) {
                    console.log("错误:" + e);
                }
                break;
            default:
                break;
        }
    }
    return null;
}

function searchInTranslateCache(targetMd5) {
    for (var n = 0; n < transCache.length; n++) {
        if (transMd5Cache[n] === targetMd5) return transCache[n];
    }
    return null;
}

function searchInTransSoundCache(targetMd5) {
    for (var n = 0; n < transSoundCache.length; n++) {
        if (transSoundMd5Cache[n] === targetMd5) return transSoundCache[n];
    }
    return null;
}

function init_google_value_tk() {
    var url = "https://" + googleDomain[translatorSettingLanguage];
    var timeout = setTimeout(function () {
        this.abort();
    }, 2000);
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onreadystatechange: function (resp) {
            if (resp.readyState == 4) {
                clearTimeout(timeout);
                if (resp.status == 200) {
                    init_google_value_tk_parse(resp.responseText);
                }
            }
        }
    });
}

function init_google_value_tk_parse(responseText) {
	let indexStr=",tkk:'";
	let bIdx=responseText.indexOf(indexStr);
	if(bIdx>0){
		bIdx+=indexStr.length;
		let eIdx=responseText.indexOf("',",bIdx);
		if(eIdx>0){
			let tkk=responseText.substring(bIdx,eIdx);
			if(tkk!=null)GM_setValue(tokenNameInStorage[translatorSettingLanguage], tkk);
			return;
		}
	}
}


// return token for the new API
function googleTK(text) {
    // view-source:https://translate.google.com/translate/releases/twsfe_w_20151214_RC03/r/js/desktop_module_main.js && TKK from HTML
    var uM = GM_getValue(tokenNameInStorage[translatorSettingLanguage]);
    if (uM == 'undefined' || uM == null) {
        init_google_value_tk();
        uM = GM_getValue(tokenNameInStorage[translatorSettingLanguage]);
    }
    ;
    var cb = "&";
    var k = "";
    var Gf = "=";
    var Vb = "+-a^+6";
    var t = "a";
    var Yb = "+";
    var Zb = "+-3^+b+-f";
    var jd = ".";
    var sM = function (a) {
        return function () {
            return a;
        };
    };
    var tM = function (a, b) {
        for (var c = 0; c < b.length - 2; c += 3) {
            var d = b.charAt(c + 2), d = d >= t ? d.charCodeAt(0) - 87 : Number(d),
                d = b.charAt(c + 1) == Yb ? a >>> d : a << d;
            a = b.charAt(c) == Yb ? a + d & 4294967295 : a ^ d;
        }
        return a;
    };
    var vM = function (a) {
        var b;
        if (null !== uM) {
            b = uM;
        } else {
            b = sM(String.fromCharCode(84));
            var c = sM(String.fromCharCode(75));
            b = [b(), b()];
            b[1] = c();
            b = (uM = window[b.join(c())] || k) || k;
        }
        var d = sM(String.fromCharCode(116)), c = sM(String.fromCharCode(107)), d = [d(), d()];
        d[1] = c();
        c = cb + d.join(k) + Gf;
        d = b.split(jd);
        b = Number(d[0]) || 0;

        for (var e = [], f = 0, g = 0; g < a.length; g++) {
            var m = a.charCodeAt(g);
            128 > m ? e[f++] = m : (2048 > m ? e[f++] = m >> 6 | 192 : (55296 == (m & 64512) && g + 1 < a.length && 56320 == (a.charCodeAt(g + 1) & 64512) ? (m = 65536 + ((m & 1023) << 10) + (a.charCodeAt(++g) & 1023), e[f++] = m >> 18 | 240, e[f++] = m >> 12 & 63 | 128) : e[f++] = m >> 12 | 224, e[f++] = m >> 6 & 63 | 128), e[f++] = m & 63 | 128);
        }
        a = b || 0;
        for (f = 0; f < e.length; f++) {
            a += e[f], a = tM(a, Vb)
        }
        a = tM(a, Zb);
        a ^= Number(d[1]) || 0;
        0 > a && (a = (a & 2147483647) + 2147483648);
        a %= 1E6;
        return a.toString() + jd + (a ^ b);
    };
    return vM(text);
}

// Google Translate Request
function Request(txt, sl, tl, parse) {
    var tk = googleTK(txt);
    var Url = dictURL +
        "&hl=auto" +
        "&sl=" + sl + "&tl=" + tl +
        "&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=at&ie=UTF-8&oe=UTF-8&otf=2&trs=1&inputm=1&ssel=0&tsel=0&source=btn&kc=3" +
        "&tk=" + tk +
        "&q=" + encodeURI(txt);
    var method = 'POST';
    var Data = '';
    var Hdr = {
        "User-Agent": UA,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate"
    };
    var Q = Url.split('&q=');
    Url = Q[0];
    Data = '&q=' + Q[1];
    Hdr["Content-Length"] = Data.length + '';
    Hdr["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
    GM_xmlhttpRequest({
        method: method,
        url: Url,
        data: Data,
        headers: Hdr,
        onload: function (resp) {
            try {
                parse(resp.responseText, tl);
            } catch (e) {
                console.log(e);
            }
        }
    });
}


function playTTS(lang,text) {
    text = text.replace(/[«»'"]/g, ' ');
    var txtMd5 = MD5(text, lang + CACHE_TYPE_GOOGLE_RESULT, null);
    var buf= searchInTransSoundCache(txtMd5);
    if (buf){
        playSound(buf);
        return;
    }
    var tk = googleTK(text);
    var Url = ttsURL + "&ie=UTF-8&total=1&idx=0" +
        "&tl=" + lang +
        "&q=" + text +
        "&textlen=" + text.length +
        "&tk=" + tk;
    GM_xmlhttpRequest({
        method: "GET",
        url: Url,
        responseType: 'arraybuffer',
        onload: function (response) {
            try {
                audioContext.decodeAudioData(response.response, function (buffer) {
                    transSoundMd5Cache.push(txtMd5);
                    transSoundCache.push(buffer);
                    playSound(buffer);
                });
            } catch (e) {
                console.log(e);
            }
        }
    });
}


'use strict';

/*
* Add integers, wrapping at 2^32. This uses 16-bit operations internally
* to work around bugs in some JS interpreters.
*/
function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF),
        msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

/*
* Bitwise rotate a 32-bit number to the left.
*/
function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}

/*
* These functions implement the four basic operations the algorithm uses.
*/
function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}

function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
* Calculate the MD5 of an array of little-endian words, and a bit length.
*/
function binl_md5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var i, olda, oldb, oldc, oldd,
        a = 1732584193,
        b = -271733879,
        c = -1732584194,
        d = 271733878;

    for (i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;

        a = md5_ff(a, b, c, d, x[i], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
    }
    return [a, b, c, d];
}

/*
* Convert an array of little-endian words to a string
*/
function binl2rstr(input) {
    var i,
        output = '';
    for (i = 0; i < input.length * 32; i += 8) {
        output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
    }
    return output;
}

/*
* Convert a raw string to an array of little-endian words
* Characters >255 have their high-byte silently ignored.
*/
function rstr2binl(input) {
    var i,
        output = [];
    output[(input.length >> 2) - 1] = undefined;
    for (i = 0; i < output.length; i += 1) {
        output[i] = 0;
    }
    for (i = 0; i < input.length * 8; i += 8) {
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
    }
    return output;
}

/*
* Calculate the MD5 of a raw string
*/
function rstr_md5(s) {
    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
* Calculate the HMAC-MD5, of a key and some data (raw strings)
*/
function rstr_hmac_md5(key, data) {
    var i,
        bkey = rstr2binl(key),
        ipad = [],
        opad = [],
        hash;
    ipad[15] = opad[15] = undefined;
    if (bkey.length > 16) {
        bkey = binl_md5(bkey, key.length * 8);
    }
    for (i = 0; i < 16; i += 1) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }
    hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
    return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
* Convert a raw string to a hex string
*/
function rstr2hex(input) {
    var hex_tab = '0123456789abcdef',
        output = '',
        x,
        i;
    for (i = 0; i < input.length; i += 1) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt((x >>> 4) & 0x0F) +
            hex_tab.charAt(x & 0x0F);
    }
    return output;
}

/*
* Encode a string as utf-8
*/
function str2rstr_utf8(input) {
    return unescape(encodeURIComponent(input));
}

/*
* Take string arguments and return either raw or hex encoded strings
*/
function raw_md5(s) {
    return rstr_md5(str2rstr_utf8(s));
}

function hex_md5(s) {
    return rstr2hex(raw_md5(s));
}

function raw_hmac_md5(k, d) {
    return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
}

function hex_hmac_md5(k, d) {
    return rstr2hex(raw_hmac_md5(k, d));
}

function MD5(string, key, raw) {
    if (!key) {
        if (!raw) {
            return hex_md5(string);
        } else {
            return raw_md5(string);
        }
    }
    if (!raw) {
        return hex_hmac_md5(key, string);
    } else {
        return raw_hmac_md5(key, string);
    }
}
