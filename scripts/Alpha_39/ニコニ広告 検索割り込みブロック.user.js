// ==UserScript==
// @name         ニコニ広告 検索割り込みブロック
// @namespace    nicovideo.jp/user/16261157
// @version      1.0.4
// @description  検索結果へ紛れ込んだニコニ広告を上部に並べ直してまとめるスクリプト
// @author       Alpha
// @match        *://www.nicovideo.jp/search/*
// @match        *://www.nicovideo.jp/tag/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @run-at       document-start
// ==/UserScript==

(function(){
    const Sls = {
        PMT:'container',
        inner:'inner',
        N_Frame:'column',
        VL:'videoList',

        NADSI:'nicoadVideoItem'
    },
          DOMs = {},
          div = document.createElement('div'),
          SAT = {GMV:GM_getValue('Search_AD_Toggle'), SAT:false, Value:''};
    if(SAT.GMV && (SAT.GMV === true || SAT.GMV === 'true')){
        SAT.SAT = true;
        SAT.Value = ' checked="checked"';
    }
    (function(){
        div.innerHTML =
            '<div class="NAM" style="display:none;">'+
            '<label class="ADSToggle" toggle="' + SAT.SAT + '"><input type="checkbox" class="ADSToggleCheck"' + SAT.Value + '></input>'+
            '<span>ニコニ広告枠を非表示</span></label>'+
            '<div class="NAMF video"></div>'+
            '</div>'+

            '<style type="text/css" class="Style_of_NicoQ-Filter">'+
            '.NAM{max-width:700px; margin-bottom:4px;}\n'+
            '.NAM label{cursor:pointer; user-select:none;}\n'+
            '.ADSToggle{display:inline-block; position:absolute; top:3px; background-color:#FFFFFF; color:#999; border:1px solid #CCC; border-radius:2px; font-size:13px; padding:2px; '+
            'transition:color 0.17s, border-color 0.17s;}\n'+
            '.ADSToggle input[type="checkbox"] + span{margin-left:2px;}\n'+
            '.ADSToggle:hover{color:#69F; border-color:#8AF;}\n'+
            '.NAM input[type="checkbox"]{margin:initial; vertical-align:middle;}\n'+
            '.NAMF{list-style:none; border-bottom:1px dashed #A0A0A080; margin-top:5px;}\n'+
            '.ADSToggle[toggle="true"] + .NAMF{display:none;}\n\n'+

            '.NAMF.videoList01 .item, .NAMF.videoList02 .item{float:left; margin-right:20px; margin-bottom:20px; position:relative; border-bottom:none;}\n'+
            '.NAMF.videoList01 .item{width:100%;}\n'+
            '.NAMF.videoList02 .item{width:335px;}\n'+
            '.NAMF.videoList01 .item .itemTitle, .NAMF.videoList02 .item{font-size:12.0833px; margin-top:0;}\n'+
            '.NAMF.videoList02 .item:nth-child(2n+1){clear:none;}\n'+
            '.NAMF.video .item:nth-child(4n){margin-right:0;}\n'+
            '.NAMF.video:not(.videoList04) .itemData .count{font-size:11.05px;}\n\n'+

            '.videoList02 .wrap > .itemComment{max-width:160px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;}'+
            '</style>'
    })();
    const NAM = div.getElementsByClassName('NAM')[0],
          ADSToggle = NAM.getElementsByClassName('ADSToggle')[0],
          NAMF = NAM.getElementsByClassName('NAMF')[0];
    if(!document.head) return;
    document.head.appendChild(div.getElementsByTagName('style')[0]);

    NAM.getElementsByClassName('ADSToggleCheck')[0].addEventListener('change',function(){
        switch(this.checked){
            case true:
                ADSToggle.setAttribute('toggle', 'true');
                GM_setValue('Search_AD_Toggle', true);
                break;
            case false:
                ADSToggle.setAttribute('toggle', 'false');
                GM_setValue('Search_AD_Toggle', false);
                break;
        }
    });
    (function Trigger(){
        document.addEventListener('DOMContentLoaded',function(){
            if(document.body){
                DOMs.N_Frame = document.body.getElementsByClassName(Sls.N_Frame)[0];
                DOMs.NADSI = document.body.getElementsByClassName(Sls.NADSI);
                DOMs.VL = document.body.getElementsByClassName(Sls.VL)[0];
                if(DOMs.N_Frame) DOMs.N_Frame.insertBefore(NAM, DOMs.N_Frame.firstChild);
                if(DOMs.VL && DOMs.VL.className.match(/videoList\d{2}/)) NAMF.className = 'NAMF video ' + DOMs.VL.className.match(/videoList\d{2}/)[0];
                if(DOMs.NADSI && NAMF){
                    const DOM = new MutationObserver(function(MutationRecords, MutationObserver){
                        if(!NAMF.firstElementChild) DOM.disconnect();
                    });
                    DOM.observe(NAMF,{
                        childList:true
                    });
                    window.addEventListener('load',function(){
                        if(!NAMF.firstElementChild) NAM.style.display = 'none';
                        setTimeout(function(){
                            DOM.disconnect();
                        },1);
                    });
                    Array.prototype.slice.call(DOMs.NADSI).forEach(function(e,i){
                        NAMF.appendChild(e);
                        if(i === 3) NAM.style.display = '';
                    });
                }
            }
        });
    })();
})();