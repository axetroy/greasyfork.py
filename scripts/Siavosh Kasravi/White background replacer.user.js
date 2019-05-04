// ==UserScript==
// @name         White background replacer
// @namespace    http://siavoshkc.ir/
// @version      1.2
// @description  Replaces the background white color with yellow in order to decrease eye strain
// @author       siavoshkc
// @include      *
// @grant        none
// @license      MIT
// @run-at       document-idle
// ==/UserScript==

function isWhite(bg)
{
      if(
         bg=="white"||
         bg=="#ffffff"||
         bg=="#FFFF"||
         bg=="#FFF"||
         bg=="#fff" ||
         bg=="rgb(255, 255, 255)"
        ) return true;
}
function changeColor()
{
    'use strict';
    const STYLE_BG_COLOR = "#ffedc4";
    const IMPORT_BG_COLOR = "#79d2a6";
    const MEDIA_BG_COLOR = "#80e5ff";
    if(document.styleSheets.length === 0) document.body.style.backgroundColor = STYLE_BG_COLOR;
    else
    {
        for (let sheeti= 0; sheeti<document.styleSheets.length; sheeti++) {
            try{
                let sheet= document.styleSheets[sheeti];
                let rules= sheet.cssRules;

                for (let rulei= 0; rulei<rules.length; rulei++) {
                    let rule= rules[rulei];
                    if (rule.type==CSSRule.STYLE_RULE)
                    {

                        if("style" in rule && isWhite(rule.style.backgroundColor))
                        {
                            rule.style.backgroundColor=STYLE_BG_COLOR;
                            if(rule.style.color==STYLE_BG_COLOR) rule.style.color = "black";
                        }


                    }
                    else if(rule.type==CSSRule.IMPORT_RULE)
                    {
                        let importRules = rule.styleSheet.cssRules;
                        for(let importRulei = 0; importRulei < importRules.length; importRulei++)
                        {
                            let importRule = importRules[importRulei];

                            if("style" in importRule && isWhite(importRule.style.backgroundColor))
                            {
                                importRule.style.backgroundColor=IMPORT_BG_COLOR;
                                if(importRule.style.color==IMPORT_BG_COLOR) importRule.style.color = "black"
                            }

                        }

                    }
                    else if(rule.type==CSSRule.MEDIA_RULE)
                    {
                        let mediaRules = rule.cssRules;
                        for(let mediaRulei = 0; mediaRulei < mediaRules.length; mediaRulei++)
                        {
                            let mediaRule = mediaRules[mediaRulei];
                            if("style" in mediaRule && isWhite(mediaRule.style.backgroundColor))
                            {
                                mediaRule.style.backgroundColor=MEDIA_BG_COLOR;
                                if(mediaRule.style.color==MEDIA_BG_COLOR) mediaRule.style.color = "black";

                            }

                        }
                    }
                    else {console.log("White background replacer: Unsupported style rule of type: ".concat(rule.type))};
                }
            }
            catch(e)
            {
                console.log("White background replacer: Caught exception: ".concat(e));
                continue;
            }
        }
    }

};
changeColor() ;

