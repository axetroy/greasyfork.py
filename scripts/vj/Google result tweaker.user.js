// ==UserScript==
// @name         Google result tweaker
// @namespace    https://www.topcl.net/myapps/write-a-user-script-to-tweaker-google-result.html
// @version      0.10
// @description  Mark & re order spam sites
// @author       VJ
// @match        https://www.google.com/search?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const resultSections=document.querySelectorAll('#rso > div > div.srg');
    if(0==resultSections.length){ console.warn("No result found, google has page layout update?"); return; }
    const lastResultSection = resultSections[resultSections.length-1];

    const BlockList=[
        {hostname:"blog.csdn.net",reason:"低质量社区",tobottom:true},
        {hostname:"bbs.csdn.net",reason:"低质量社区",tobottom:true},
        {hostname:"www.iteye.com",reason:"低质量社区",tobottom:true},

        {hostname:"en.softonic.com",reason:"低相关度",tobottom:true},

        {hostname:"www.logphp.com",reason:"链接站",tobottom:true},

        {hostname:"ju.outofmemory.cn",reason:"采集站",tobottom:true},
        {hostname:"www.ctolib.com",reason:"采集站",tobottom:true},
        {hostname:"www.voidcn.com",reason:"采集站",tobottom:true},
        {hostname:"tw.saowen.com",reason:"采集站",tobottom:true},

        {hostname:"stackoverrun.com",reason:"机翻采集站",tobottom:true},
        {hostname:"codeday.me",reason:"机翻采集站",tobottom:true},
        {hostname:"landcareweb.com",reason:"机翻采集站",tobottom:true},
        
        {hostname:"www.91flac.com",reason:"不解释",tobottom:true},
    ];

    const ExtractHandler=(resultContainer)=>resultContainer.querySelectorAll('div.g');

    const MatchHandler=(result,config)=>{
        const a=result.querySelector('div.r a');
        return a.hostname==config.hostname;
    };

    const BlockHandler=(result,config)=>{
        result.style.opacity='.5';
        const cite = result.querySelector('cite');
        cite.innerText=`[${config.reason}] - tweaked by Google result tweaker\r\n${cite.innerText}`;
        if(config.tobottom){ lastResultSection.appendChild(result); }
    };

    const handledEntries=[];

    for(let c=0; c<resultSections.length; c++)
    {
        const resultContainer = resultSections[c];
        const items = ExtractHandler(resultContainer);
        for(let i=0;i<items.length;i++)
        {
            const resultEntry = items[i];
            if(-1!=handledEntries.indexOf(resultEntry)) continue;

            for(let j=0;j<BlockList.length;j++){
                const confEntry=BlockList[j];
                if(MatchHandler(resultEntry,confEntry)){
                    BlockHandler(resultEntry,confEntry);
                    handledEntries.push(resultEntry);
                    --i;
                    break;
                }
            }

        }
    }
})();