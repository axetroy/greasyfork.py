// ==UserScript==
// @name          유저 차단 S
// @author        리드(http://www.suyongso.com)
// @version       2.33T
// @include       https://www.suyongso.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @description   포인트 없이도 여러 명을 차단하고 싶어? 차단된 유저가 작성한 댓글입니다 같은 똥마저도 보기 싫어? 이거 쓰면 원큐에 해결임ㅎ
// @grant       GM_addStyle
// @namespace https://greasyfork.org/users/226807
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox.
*/

/*



목-차

0. 함수 모음: 순서대로 글목록, 댓글목록, 실시간알림 차단
1. 페이지가 로드 완료되면 숨김 $(document).ready(function() 
2. 댓글목록이 업데이트될 시 숨김 waitForKeyElements("ul.fdb_lst_ul ", hideUsers);
3. (미완성) 글목록이 업데이트될 시 숨김 waitForKeyElements("table#docList.bd_lst.bd_tb_lst.bd_tb", hideUsersDocs);
4. 실시간 댓글 알림 뜰 시 특정 유저일 경우 숨김 waitForKeyElements( '[id^=ttwNotification]' , hideUsersRealTimeCommentAlert); 


*/
var testv=0;

// 0. 함수 모음: 순서대로 글목록, 댓글목록, 실시간알림 차단
function hideTables()
{  // tr a ==> 글목록에서 유저를 숨깁니다
  $('tr a[class=member_25431489]').parent().parent().parent().hide(); //수은등,조현병,시민재창조,추가반찬셀프,...
  
}

function hideLists()
{ // li a ==> 댓글목록에서 유저를 숨깁니다
  $('li a[class=member_25431489]').parent().parent().remove(); //수은등,조현병,시민재창조,추가반찬셀프,...
}
function hideRealTimeAlerts()
{ // div 내 style에서 회원번호를 찾아 숨김 ==> 실시간 댓글 알림에서 유저를 숨깁니다 
  $('div[style*=\'25431489\']').parent().hide(); // 수은등,조현병,시민재창조,추가반찬셀프,...
  
}

// =========================닉네임 입력은 여기까지만 하면 됨=========================











// 1. 페이지가 로드 완료되면 숨김: 글목록, 댓글목록
$(document).ready(function () {
  hideTables();
  hideLists();
});



// 글목록 실시간 observe
// 대상 node 선택
var asdasDocs = document.getElementsByClassName('bd_lst_wrp')[0];

//now create our observer and get our target element
var gamshiDocs = new MutationObserver(fnHandlerDocs),
        elTarget = asdasDocs,
        objConfig = {
            childList: true,
            subtree : true,
            attributes: false, 
            characterData : false
        };

//then actually do some observing
gamshiDocs.observe(elTarget, objConfig);

function fnHandlerDocs () {
    hideTables();
  	console.log('seeeeeeeeeeeeeeeeex');
}
// 글목록 실시간 observe 끝!





// 2. 댓글목록이 업데이트될 시 숨김: 댓글목록

// 댓글목록 실시간 observe
// 대상 node 선택
var asdas = document.getElementById('cmtPosition');

//now create our observer and get our target element
var gamshi = new MutationObserver(fnHandler),
        elTarget = asdas,
        objConfig = {
            childList: true,
            subtree : true,
            attributes: false, 
            characterData : false
        };

//then actually do some observing
gamshi.observe(elTarget, objConfig);

function fnHandler () {
    hideUsers();
  	console.log('commentseeeeeeeeeeeeeeeeex');
  	//asdas.innerHTML += "<h1 style=\"color:blue;text-align: right;\">댓글 새로고침</h1>";
}
// 댓글목록 실시간 observe 끝!


//waitForKeyElements('div.cmt_wrt_btm', hideUsers);
//waitForKeyElements('ul.fdb_lst_ul ', hideUsers);
function hideUsers() {  
  hideLists();
}


// 3. 글목록이 업데이트될 시 숨김: 글목록
waitForKeyElements('table#docList.bd_lst.bd_tb_lst.bd_tb', hideUsersDocs);
function hideUsersDocs()
{
  setTimeout(hUD, 2000); //Two seconds will elapse and Code will execute.  
//  alert("DEBUG: hideUserDocs 완료");
}
// hUD: focus 딱 한 번만 실행, 글목록
function hUD() {
  $(window).one('focus', function(){ 
    setTimeout( 
      function()
      {
        hideTables();        
        //         alert("DEBUG: setTimeout 완료");
      } 
      ,500);
  });   
  window.addEventListener('focus', function() {
    setTimeout( 
      function()
      {
        hideTables();        
      } 
      ,500);
    
  });
  $(window).one('focus', function(){ 
    setTimeout( 
      function()
      {
        hideTables();        
      } 
      ,5000);

  });
}


// 4. 실시간 댓글 알림 뜰 시 특정 유저일 경우 숨김
waitForKeyElements('[id^=ttwNotification]', hideUsersRealTimeCommentAlert); 
function hideUsersRealTimeCommentAlert() { 
  // 와일드카드 등은 http://stackoverflow.com/questions/5376431/wildcards-in-jquery-selectors , http://rosshawkins.net/archive/2011/10/14/jquery-wildcard-selectors-some-simple-examples.aspx 참고
  //  와일드카드 예시: console.log($('[id*=ander]'));
  hideRealTimeAlerts();
}


//// 5. ~~~님! XX개의 알림이 있습니다.에서 유저 숨김
//waitForKeyElements('div.listscroll', hideAlarmList); 
//function hideAlarmList() { 
//  alert('asdf');
//}





/*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
    that detects and handles AJAXed content.

    Usage example:

        waitForKeyElements (
            "div.comments"
            , commentCallbackFunction
        );

        //--- Page-specific function to do what we want when the node is found.
        function commentCallbackFunction (jNode) {
            jNode.text ("This comment changed by waitForKeyElements().");
        }

    IMPORTANT: This function requires your script to have loaded jQuery.
*/

function waitForKeyElements(selectorTxt, /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
bWaitOnce, /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
iframeSelector /* Optional: If set, identifies the iframe to
                        search.
                    */
) {
  var targetNodes,
  btargetsFound;
  if (typeof iframeSelector == 'undefined')
  targetNodes = $(selectorTxt);
   else
  targetNodes = $(iframeSelector).contents().find(selectorTxt);
  if (targetNodes && targetNodes.length > 0) {
    btargetsFound = true;
    /*--- Found target node(s).  Go through each and act if they
            are new.
        */
    targetNodes.each(function () {
      var jThis = $(this);
      var alreadyFound = jThis.data('alreadyFound') || false;
      if (!alreadyFound) {
        //--- Call the payload function.
        var cancelFound = actionFunction(jThis);
        if (cancelFound)
        btargetsFound = false;
         else
        jThis.data('alreadyFound', true);
      }
    });
  } 
  else {
    btargetsFound = false;
  } //--- Get the timer-control variable for this selector.

  var controlObj = waitForKeyElements.controlObj || {
  };
  var controlKey = selectorTxt.replace(/[^\w]/g, '_');
  var timeControl = controlObj[controlKey];
  //--- Now set or clear the timer as appropriate.
  if (btargetsFound && bWaitOnce && timeControl) {
    //--- The only condition where we need to clear the timer.
    clearInterval(timeControl);
    delete controlObj[controlKey]
  } 
  else {
    //--- Set a timer, if needed.
    if (!timeControl) {
      timeControl = setInterval(function () {
        waitForKeyElements(selectorTxt, actionFunction, bWaitOnce, iframeSelector
        );
      }, 300
      );
      controlObj[controlKey] = timeControl;
    }
  }
  waitForKeyElements.controlObj = controlObj;
}
