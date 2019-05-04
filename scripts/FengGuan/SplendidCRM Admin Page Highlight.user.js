// ==UserScript==
// @version 20180402
// @name SplendidCRM Admin Page Highlight
// @namespace SplendidCRMAdminPageHighlight
// @match *://*/*/Administration/DynamicLayout/EditViews/default.aspx
// @match *://*/Administration/DynamicLayout/EditViews/default.aspx
// @match *://*/*/Administration/DynamicLayout/GridViews/default.aspx
// @match *://*/Administration/DynamicLayout/GridViews/default.aspx
// @match *://*/*/Administration/DynamicLayout/DetailViews/default.aspx
// @match *://*/Administration/DynamicLayout/DetailViews/default.aspx
// @grant none
// @description This is a SplendidCRM Admin Page Highlight tool
// ==/UserScript==
$(function(){

$(".nodeStudioFolderLink").each(function(){
    var innertext=$(this).text();
        if(innertext=="InvoiceHistory" ||innertext=="ImageIndexing" ||innertext=="ProcessImages" ||innertext=="Tasks"){
          $(this).css({"color":"red","font-weight":"bold"});
          var tbl=$(this).parent().parent().parent().parent();
          var div=$(this).parent().parent().parent().parent().next();
          $("[ID$=ctlSearch_treeMainn0Nodes]").prepend($(tbl));
          $("[ID$=ctlSearch_treeMainn0Nodes]").prepend($(div))
        }  
    });
    
});