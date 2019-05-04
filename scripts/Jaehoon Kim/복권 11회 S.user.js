// ==UserScript==
// @name     복권 11회 S
// @version  1.2R
// @include https://www.suyongso.com/lottery*
// @include https://www.suyongso.com/index.php?mid=lottery*
// @author 리드(https://www.suyongso.com)
// @description 수또를 자동으로 반복해서 돌려줍니다
// @grant    none
// @namespace https://greasyfork.org/users/226807
// ==/UserScript==

// 아래 lotteryCountMaximum은 복권을 몇 장 샀는지 체크합니다. 11매일 경우 그냥 코드가 종료됩니다.
var lotteryCountMaximum = document.getElementsByClassName("r_info")[2].textContent;
var buyLotteryButton = document.getElementsByClassName("lottery_btn")[0];
//alert(document.getElementsByClassName("lottery_btn").length);

function myFunction(){
  var r = confirm("확인을 누르시면 복권을 11장 일괄구매합니다. 복권 1장당 100포인트 차감됩니다. 확인을 누른 뒤에는 10초 정도 기다려주세요.");
  if (r == true) {
    unsafeWindow.buy_lottery = null;
    myAjax(0);
  } else {
    console.log("취소.");
  }
}

// myAjax 코오드 출처 https://www.suyongso.com/anidong/25599804
function myAjax(count) {
	if (count >= 13) {
    alert("복권 11장 구매 완료!");
    
    // 새로고침하면 하단 음악플레이어 땜에 엉뚱한 페이지로 갈 수 있음.
    //window.location.reload() 
    window.location.href = 'https://www.suyongso.com/lottery';
    return;
  }
  
	$.ajax({
		type: 'POST',
		url: 'https://www.suyongso.com/index.php',
		data : {moduel : "loterrylotto", act : "procLotterylottoBuyLottery"},
		success: function(){
			count++;
			myAjax(count);
      console.log(count);
		},
    error: function(){
      console.log(count+"번째 구매 도중 오류 발생");
			myAjax(count);
		},
	});
}



if(lotteryCountMaximum === "11 매"){ 
  return;
}else{
  /*
  // create a new div element 
  var jbBtn = document.createElement("button"); 
  // and give it some content 
  var newContent = document.createTextNode("11장 구매"); 
  // add the text node to the newly created div
  jbBtn.appendChild(newContent);    
  var prN = buyLotteryButton.parentNode;
  // add the newly created element and its content into the DOM   
  prN.insertBefore(jbBtn, buyLotteryButton.nextSibling); */
  $( ".lottery_btn" ).append( "<button class=\"nomuTTak\" onclick=\"myFunction()\">11장 구매</button>" );
  document.getElementsByClassName("nomuTTak")[0].addEventListener("click", myFunction);
}