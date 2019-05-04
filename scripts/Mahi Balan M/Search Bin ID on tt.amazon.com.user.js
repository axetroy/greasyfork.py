// ==UserScript==
// @description    Im Mahi, and this script helps people to select and seacrh EU-Bin ID for duplicate Trouble Ticketwith single click | Saves lot of time for VBI employees.

// @name           Search Bin ID on tt.amazon.com
// @copyright      Mahi Balan M | RCA | VBI
// @version        1.00
// @website        https://phonetool.amazon.com/users/mahibala
// @namespace      *
// @include        *
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @author         Mahi Balan M
// ==/UserScript==
// ==/UserScript==
$(document).ready(function(){
    $("body").mouseup(function(e){
        // get selected text
        var seltext = getSelectedText();
        if(seltext != "")
        {
           if($(".searchit").attr("class") == null)
           {
                $("<a></a>").appendTo("body")
                .attr("title","Search Product on Amazon.com | MB")
                .attr("class","searchit")
                .css("width","24px")
                .css("height","24px")
                .css("background-image","url(http://lh4.ggpht.com/_9NnLYMRJob8/TQ9GrnFaweI/AAAAAAAAAVc/f4UtNPKEMUU/find.png)")
                .css("display","inline")
                .css("background-position","0px 0px")
                .attr("href","https://tt.amazon.com/search?phrase_search_text="+seltext+ "&search=Search!")
                .attr("target","_blank")
                .css("left",e.pageX - 5)
                .css("top",e.pageY - 30)
                .css("display","block")
                .css("position","absolute")
                .hide()
                .fadeIn(0.1);
            }
           else{
                   $(".searchit").animate({"left": e.pageX - 2,"top" : e.pageY - 30}, 0.1)
                .attr("href","https://tt.amazon.com/search?phrase_search_text="+seltext+ "&search=Search!").fadeIn(0.1);
           }
        }
        else
            $(".searchit").fadeOut(0.1);
    });
    $(".searchit").mouseover(function(){
       alert("asa");
    });
});
function getSelectedText()
{
    // For Firefox
    if(window.getSelection)
        return window.getSelection();
    else if(document.getSelection)
        return document.getSelection();
    else
    {
        // For IE
        var selection = document.selection && document.selection.createRange();
        if(selection.text)
            return selection.text;
        return false;
    }
    return false;
}
