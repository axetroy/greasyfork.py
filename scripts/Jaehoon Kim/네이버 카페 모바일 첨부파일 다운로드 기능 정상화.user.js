// ==UserScript==
// @name     네이버 카페 모바일 첨부파일 다운로드 기능 정상화
// @version  1.0R
// @description 네이버 카페 모바일의 첨부파일 다운로드 기능이 파이어폭스 안드로이드에서도 제대로 동작하도록 만듭니다.
// @include		*://m.cafe.naver.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant    none
// @namespace https://greasyfork.org/users/226807
// ==/UserScript==


// 씨발 flies 뭐야? 파리도 아니고
// 네이버 카페 망해야됨.
$(".flies_area").click(function(){
  
  var className =  $(".flies_area").children().children().children().attr('class');
  var nom = className.split("|");
  //alert(nom[2]);
  window.open(nom[2]);
  
});