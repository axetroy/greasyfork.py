// ==UserScript==
// @name     Quora: remove sponsored posts
// @namespace    StephenP
// @version      1.3
// @description  Remove sponsored posts that are shown as relevant answers even if they're not.
// @author       StephenP
// @grant    none
// @match        https://*.quora.com/*
// @match        http://*.quora.com/*
// ==/UserScript==
(function(){
    sponsorRemover = setInterval(removeSponsor, 1000);
})();
function removeSponsor(){
  try{
    var answers=document.getElementsByClassName("pagedlist_item");
    if(answers.length>0){
      for(var i=0;i<answers.length;i++){
        /*alert(answers[i].getElementsByClassName("dismissed_msg_wrapper").length);*/
        if(answers[i].getElementsByClassName("dismissed_msg_wrapper").length>0){
          answers[i].parentNode.removeChild(answers[i]);
        }
      }
    }
  }
  catch(err){
    console.log(err);
  }
}