// ==UserScript==
// @name     View Instagram "tagged" panel and stories highlights without login
// @namespace    StephenP
// @description  Instagram website introduced a new tab called "Posts where you have been tagged", that can be reached, without logging in, at the URL www.instagram.com/<profilename>/tagged. Although it's accessible to everyone, the button redirects the non-logged user to the login page. With this script you can now click on the button and see the posts where someone has been tagged, without logging in. You can also see the stories higlights (retrieved with storiesig.com)
// @author   StephenP
// @version  4.5
// @grant    none
// @match https://www.instagram.com/*
// @match http://www.instagram.com/*
// ==/UserScript==
var alreadyReplaced=0;
(function(){
  var myVar = setInterval(replaceURL, 500);
})();
function replaceURL(){
  var firstSlash;
  var secondSlash;
  var username;
  var currentURL=window.location.toString();
  if(currentURL.includes("instagram.com/accounts/login/?next=")){
    if((currentURL.includes("%2Ftagged%2F"))&&(alreadyReplaced==0)){
      firstSlash=currentURL.indexOf("%2F");     secondSlash=currentURL.slice(firstSlash+1).indexOf("%2F")+firstSlash+1;
      username=currentURL.slice(firstSlash+3,secondSlash);
      window.location="https://www.instagram.com/"+username+"/tagged";
      alreadyReplaced=1;
    }
  }
  else if(currentURL.includes("/tagged")){
    alreadyReplaced=0;
  }
  else if(currentURL.includes("stories/highlights")){
    firstSlash=currentURL.indexOf("highlights");
    window.open("https://www.storiesig.com/"+currentURL.slice(firstSlash));
    history.back();
  }
}
function isMobile(){
  if(document.getElementsByClassName("coreSpriteSearchIcon").length>0){
    return false;
  }
  return true;
}