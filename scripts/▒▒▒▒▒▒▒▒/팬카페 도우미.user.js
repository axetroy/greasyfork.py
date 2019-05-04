// ==UserScript==
// @name    팬카페 도우미
// @namespace    https://greasyfork.org/ko/users/171706-user
// @version    1.48
// @description    네이버 팬카페에서의 활동을 더욱 편하게 해주는 스크립트입니다.
// @match    *cafe.naver.com/*
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_setValue
// @run-at    document-end
// ==/UserScript==

// 전역 변수들을 선언합니다.
const ANONY_NAME = "카페 회원"; // 게시판 익명화 기능에서 표시할 이름
const HOST_NAME = window.location.href; // 현재 주소
const PATH_NAME = window.location.pathname; // 현재 주소의 경로
const VERSION = "1.48"; // 스크립트 버전
var clubid = "";

// 사용자 설정이 정의되지 않은 경우 기본값을 설정합니다.
if (GM_getValue("nickChangeLevel") === undefined) {
    GM_setValue("nickChangeLevel", 3);
} if (GM_getValue("nickSensitivity") === undefined) {
    GM_setValue("nickSensitivity", 10000);
} if (GM_getValue("specificNumberBanText") === undefined) {
    GM_setValue("specificNumberBanText", "148,1993,72,010,765,346,876,341,961,2016,2017,2018,2019,123,456,789,234,567,345,678");
}

function checkCafe() {
    // 현재 스크립트가 대상 카페에서 실행되면 True를 반환합니다.
	// 대상 카페에서 실행되고 있지 않다면 스크립트를 실행하지 않습니다.
    if (HOST_NAME.indexOf("clubid=28714369") != -1 || PATH_NAME.indexOf("ajehr") != -1 ) {
        clubid = "clubid=28714369";
        return true;
    } else if (HOST_NAME.indexOf("clubid=28807264") != -1  || PATH_NAME.indexOf("moonbowzz") != -1) {
        clubid = "clubid=28807264";
        return true;
    } else {
        return false;
    }
}

if (checkCafe() == true) {
    //현재 스크립트가 대상 카페에서 실행되는지 확인 후
	//어떤 페이지에서 실행되고 있는지에 따라 어떤 명령을 수행할지 결정합니다.
    if (PATH_NAME == "/CafeMemberInfo.nhn") {
		// 카페 회원 정보 페이지에서 실행중인 경우
        createRandButton();
    } else if (PATH_NAME == "/ManageJoinApplication.nhn") {
		// 카페의 가입 신청 관리 페이지에서 실행중인 경우
        makeAltSettingButton();
    } else if (PATH_NAME == "/ArticleWrite.nhn") {
        // 카패 내의 글쓰기 Iframe에서 실행중인 경우
        if (GM_getValue("nickChangeLevel") > 2) {
            cafeMemberInfoEdit();
        }
    } else if (PATH_NAME.indexOf("ajehr") != -1 || PATH_NAME.indexOf("moonbowzz") != -1) {
		// 카페의 최상위 페이지에서 실행중인 경우
        if (GM_getValue("nickChangeLevel") > 3) {
            cafeMemberInfoEdit();
        }
        makeSettingButton();
    }

    // CSS에 여러가지 스타일을 추가합니다.
	// 버튼, Modal, 매니저 태그 등등..
    GM_addStyle ( multilineStr (function (){/*!
    .cafeUIButton {
        cursor: pointer;
    	text-decoration: none;
    	font-family: 나눔고딕, 맑은 고딕,돋움체,sans-serif;
    	background:#ffffff;
    	-moz-border-radius:10px;
    	-webkit-border-radius:10px;
    	border-radius:10px;
    	font-size:9pt;
    	color:#333333;
    	padding: 5px 20px;
    	border-color:#e1e1e1;
    	border-width:1px;
    	border-style:solid;
    }

    .cafeUIButton:hover {
        text-decoration: none;
    	background:#efefef;
    }

     .cafe_maneger {
    	font-family: 나눔고딕, 맑은 고딕,돋움체,sans-serif;
        font-size: 10pt;
        font-weight: bold;
        text-align: center;
        padding: 3px 8px 3px 8px;
        border: 1px solid #e1e1e1;
        border-radius: 5px;
        background-color: #fff;
        background: linear-gradient(135deg, rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%);
    }

    .nickHide {
        display: none;
    }

    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0,0,0,0.4);
        font-family: 나눔스퀘어,나눔고딕, 맑은 고딕,돋움체,sans-serif;
    }

    .modal-header {
        padding: 10px;
        background-color: #5cb85c;
        border-radius: 10px 10px 0 0;
        font-size: 24pt;
        color: white;
        font-family: 나눔스퀘어, 나눔고딕, 맑은 고딕,돋움체,sans-serif;
    }

    .modal-content {
        position: relative;
        background-color: #fefefe;
        top: 15%;
        margin: auto;
        padding: 0;
        border: 1px solid #888;
        border-radius: 12px;
        width: 800px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
        animation-name: animatetop;
        animation-duration: 0.5s
    }

    .modal-body {padding: 20px;font-family: 나눔고딕, 맑은 고딕,돋움체,sans-serif;}

    .modal-footer {
        padding: 4px;
        background-color: #5cb85c;
        border-radius: 0 0 10px 10px;
        font-size: 16pt;
        color: white;
        font-family: 나눔스퀘어,나눔고딕, 맑은 고딕,돋움체,sans-serif;
    }

    .modal-box {
        margin-bottom: 20px;
        font-size: 11pt;
        font-family: 나눔고딕, 맑은 고딕,돋움체,sans-serif;
        line-height: 18pt;
    }

    .modal-title {
        font-size: 16pt;
        font-family: 나눔스퀘어,나눔고딕, 맑은 고딕,돋움체,sans-serif;
    }

    .modal-close {margin-left: 4px;}

    @keyframes animatetop {
        from {top: -300px; opacity: 0}
        to {top: 15%; opacity: 1}
    }

    */} ) );
}

function multilineStr (dummyFunc) {
    // GM_addStyle의 주석처리를 제거합니다.
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
        .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
        .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
    ;
    return str;
}

function makeSettingButton() {
    // 팬카페 도우미 설정 버튼 생성 함수
    var settingCol = document.createElement("li");
    var modal = document.createElement("div");
	// 페이지에 설정 버튼을 넣습니다.
    document.getElementById("special-menu-item").appendChild(settingCol);
   settingCol.outerHTML = '<li class="default" id="custom-setting"><p><a href="#" id="setting_button" class="cafeUIButton" style="display: block; margin: 8px 11px 11px 8px;">팬카페 도우미 설정</a></p></li>';
	// 페이지에 설정 창을 넣습니다.
    document.getElementById("cafe-body-skin").appendChild(modal);
    modal.outerHTML = `
<div id="settingModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <p>팬카페 도우미 설정</p>
        </div>
        <div class="modal-body">
            <form name="helperSetting">
                <div class="modal-box">
                    <p class="modal-title">닉네임 변경</p>
                    <p>스크립트가 닉네임을 얼마나 자주 변경할 지 조절합니다.</p>
					<input type="range" name="nickChangeLevelRange" min="1" max="4" value="1" style="width: 100px;"></input>
					<p id="nickLevel1" class="nickHide">LEVEL 1. 아무 것도 하지 않습니다. 회원 정보 수정 창에 무작위 20자리 닉네임 생성 버튼만 생성됩니다.</p>
					<p id="nickLevel2" class="nickHide">LEVEL 2. 회원 정보 수정 페이지에 들어가자마자 닉네임을 무작위로 수정합니다.</p>
					<p id="nickLevel3" class="nickHide">LEVEL 3. 카페 게시글을 쓸 때마다 닉네임을 무작위로 수정합니다. (추천)</p>
					<p id="nickLevel4" class="nickHide">LEVEL 4. 카페에 접속 할 때마다 닉네임을 무작위로 수정합니다.</p>
                </div>
                <!--<div class="modal-box">
                    <p class="modal-title"></p>
                    <p>설명</p>
                    <input type="checkbox" name="" value="1">ON</input>
                </div>-->
                <span>설정 적용 후 새로고침을 눌러야 변경 사항이 적용됩니다!</span>
            </form>
        </div>
        <div class="modal-footer">
            <button id="saveButton" class="cafeUIButton modal-close" onclick="">저장하고 닫기</button>  <button class="cafeUIButton modal-close" onclick="">저장하지 않고 닫기</button>
        </div>
    </div>
</div>`;

    // 설정을 받을 Form을 지정
    var settingForm = document.getElementsByName("helperSetting")[0];

    // 설정 Modal을 열 버튼을 지정
    var settingbtn = document.getElementById("setting_button");

    // 버튼을 닫는 Span 요소를 지정
    var span = document.querySelectorAll("button.modal-close");

	// 설정 저장 버튼을 지정
    var save = document.getElementById('saveButton');

    modal = document.getElementById('settingModal');

    settingForm['nickChangeLevelRange'].addEventListener("input", function() {
        for (i = 1; i < 5; i++) {
            document.getElementById('nickLevel' + i).style.display = "none";
        }
        document.getElementById('nickLevel' + settingForm['nickChangeLevelRange'].value).style.display = "block";
    });

    // 설정 버튼 클릭시, 설정 Modal의 내용을 현재 설정대로 수정하고 설정 Modal을 엶
    settingbtn.addEventListener("click", function() {
        getSetting();
        modal.style.display = "block";
    });

    // Modal을 닫는 버튼을 누르면, Modal을 닫도록 함
    for (i = 0; i < span.length; i++) {
        span[i].addEventListener("click", function() {
            modal.style.display = "none";
        });
    }

	// 설정 저장 버튼을 누르면, 설정을 저장함
    save.addEventListener("click", function() {
        GM_setValue("nickChangeLevel", settingForm['nickChangeLevelRange'].value);
    });

    // Modal 바깥의 어두운 부분을 클릭하면 Modal을 닫도록 함
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    console.log("[Helper] 설정 Modal 생성 성공");
}

function getSetting() {
    // 설정 버튼 클릭시, Modal의 내용을 현재 설정으로 수정
    var settingForm = document.forms['helperSetting'];

    for (i = 1; i < 5; i++) {
        document.getElementById('nickLevel' + i).style.display = "none";
    }
    document.getElementById('nickLevel' + GM_getValue("nickChangeLevel")).style.display = "block";
    settingForm['nickChangeLevelRange'].value = GM_getValue("nickChangeLevel");
}

function makeAltSettingButton() {
    // 매니저 전용 설정 버튼 생성 -- 카페 가입 신청 관리 페이지에서만 뜸
    var settingAltBtn = document.createElement("a"); // 매니저 전용 팬카페 도우미 설정 버튼
    var trueCheckBtn = document.createElement("a"); // "조건에 맞는 유저만 체크" 버튼
    var falseCheckBtn = document.createElement("a"); // "조건에 안 맞는 유저만 체크" 버튼
    //var debugBtn = document.createElement("a"); // "개발자용 멤버 추가" 버튼

    var insertdiv = document.getElementsByClassName("srch_in")[0]; // 버튼을 삽입할 DIV
    var actionDiv = document.getElementsByClassName("action_in")[0]; // 버튼을 삽입할 DIV2

    var modal = document.createElement("div"); // 팬카페 도우미 설정 Modal(창)

	// DIV에 버튼 삽입
    actionDiv.appendChild(falseCheckBtn);
    actionDiv.appendChild(trueCheckBtn);
    insertdiv.appendChild(settingAltBtn);
    //insertdiv.appendChild(debugBtn);

	// 버튼 속성 지정
    trueCheckBtn.className = "cafeUIButton";
    trueCheckBtn.style.marginLeft = "20px";
    trueCheckBtn.textContent = "조건에 맞는 멤버 모두 선택";
    trueCheckBtn.style.float = "right";
    trueCheckBtn.addEventListener("click", function(){ autoCheckMember(true); });

    falseCheckBtn.className = "cafeUIButton";
    falseCheckBtn.style.marginLeft = "20px";
    falseCheckBtn.textContent = "조건에 안 맞는 멤버 모두 선택";
    falseCheckBtn.style.float = "right";
    falseCheckBtn.addEventListener("click",  function(){ autoCheckMember(false); });

    settingAltBtn.className = "cafeUIButton";
    settingAltBtn.style.marginLeft = "30px";
    settingAltBtn.textContent = "팬카페 도우미 설정";
    settingAltBtn.style.float = "right";
/*
    debugBtn.className = "cafeUIButton";
    debugBtn.style.marginLeft = "30px";
    debugBtn.textContent = "테스트용 멤버 추가";
    debugBtn.style.float = "right";
    debugBtn.addEventListener("click", function(){ addDebugMember(prompt("추가하려는 닉네임을 입력해주세요.\n값을 입력하지 않고 확인 버튼을 누르면 무작위 숫자 닉네임으로 된 멤버가 추가됩니다.", "")); });
*/
	// 팬카페 도우미 Modal 삽입
    document.getElementById("container").appendChild(modal);
    modal.outerHTML = `
<div id="settingModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <p>팬카페 도우미 설정</p>
        </div>
        <div class="modal-body">
            <form name="helperSetting">
                <div class="modal-box">
                    <p class="modal-title">반복되는 닉네임 감지 민감도</p>
                    <p>반복되는 닉네임의 민감도를 조절합니다.</p>
                    <p>닉네임을 여러 글자로 나누어 어떤 글자가 몇번 반복되는지 확인하고, 반복되는 횟수, 길이에 따라<br>닉네임 연속성 점수를 매깁니다. 연속성 점수가 카페 매니저가 지정한 점수 보다 높을 경우, 체크 목록에서 제외됩니다.<br>최소: 8000 ~ 최대: 14000 / 추천: 9500~11000 (기본값: 10000)</p>
                    <input type="range" name="nickSensitivityRange" min="8000" max="14000" value="10000" style="width: 250px;"></input><span id="nickSensitivityText"></span>
                </div>
                <div class="modal-box">
                    <p class="modal-title">특정 숫자 금지</p>
                    <p>닉네임에 특정 숫자가 많이 보이는 경우, 체크 목록에서 제외합니다.</p>
                    <p>닉네임에 카페 매니저가 지정한 금지 숫자 목록이 포함된 경우, 해당 금지 숫자의 길이, 포함된 횟수 만큼<br>패널티 점수를 매깁니다. 패널티 점수가 일정 이상일 경우 체크 목록에서 제외됩니다.<br>콤마로 구분하며, 다음과 같이 작성합니다. "148,1993,1022,72,..."</p>
                    <input type="text" class="text2" name="specificNumberBanText" value="" style="width: 760px; font-family: 나눔고딕, 맑은 고딕,돋움체,sans-serif; font-size:11pt;"></input>
                </div>
                <!--<div class="modal-box">
                    <p class="modal-title">카페 가입 자동화</p>
                    <p>카페의 가입 대기자들의 가입 수락을 완전 자동화 합니다.</p>
                    <h3><b style="color: red;">주의! 완벽하게 검증되지 않은 기능입니다! 기능에 오류가 있을 수도 있습니다.<br>또한, 이 기능을 활성화 하기 전에 감지 민감도와 특정 숫자 금지 옵션을 충분하게 조절할 것을 권장합니다.</b></h3>
                    <input type="checkbox" name="autoAcceptCheck" value="1">ON</input>
                </div>-->
            </form>
            <span>설정 적용 후 새로고침을 눌러야 변경 사항이 적용됩니다!</span>
        </div>
        <div class="modal-footer">
            <button id="saveButton" class="cafeUIButton modal-close" onclick="">저장하고 닫기</button><button class="cafeUIButton modal-close" onclick="">저장하지 않고 닫기</button>
        </div>
    </div>
</div>`;

    // 설정을 받을 Form을 지정
    var settingForm = document.getElementsByName("helperSetting")[0];

    // 버튼을 닫는 Span 요소를 지정
    var span = document.querySelectorAll("button.modal-close");

	// 설정 저장 버튼을 지정
    var save = document.getElementById('saveButton');

    modal = document.getElementById('settingModal');

    settingForm['nickSensitivityRange'].addEventListener("input", function() {document.getElementById('nickSensitivityText').textContent = settingForm['nickSensitivityRange'].value;});

    // 설정 버튼 클릭시, 설정 Modal의 내용을 현재 설정대로 수정하고 설정 Modal을 엶
    settingAltBtn.addEventListener("click", function() {
        getSettingAlt();
        modal.style.display = "block";
    });

    // Modal을 닫는 버튼을 누르면, Modal을 닫도록 함
    for (i = 0; i < span.length; i++) {
        span[i].addEventListener("click", function() {
            modal.style.display = "none";
        });
    }

	// 설정 저장 버튼을 누르면, 설정을 저장함
    save.addEventListener("click", function() {
        GM_setValue("nickSensitivity", settingForm['nickSensitivityRange'].value);
        GM_setValue("specificNumberBanText", settingForm['specificNumberBanText'].value);
    });

    // Modal 바깥의 어두운 부분을 클릭하면 Modal을 닫도록 함
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    console.log("[Helper] 설정 Modal 생성 성공");
}

function getSettingAlt() {
	// 설정 버튼 클릭시, Modal의 내용을 현재 설정으로 수정
    var settingForm = document.forms['helperSetting'];

    document.getElementById("nickSensitivityText").textContent = GM_getValue("nickSensitivity");
    settingForm['nickSensitivityRange'].value = GM_getValue("nickSensitivity");
    settingForm['specificNumberBanText'].value = GM_getValue("specificNumberBanText");
}

function cafeMemberInfoEdit() {
    open_window("/CafeMemberInfo.nhn?" + clubid, "popup", 500, 780, "toolbar=0,menubar=0,scrollbars=yes,resizable=yes");
}

function createRandButton() {
    // 닉네임 무작위 생성 버튼 스크립트
    if (GM_getValue("nickChangeLevel") > 1) {
	    // 회원 정보 수정 창을 열자마자 닉네임을 바꾸도록 설정한 경우
        console.log("[Helper] 더 빠른 닉네임 변경 중...");

		//닉네임을 생성후 칸에 입력
        document.getElementById("cafeNickNameInput").value = setRandName();

		// 닉네임 중복 검사
        nickNameValidationChk._onClick(nickNameValidationChk.nickNameButton);

		// 닉네임 적용: 중복 검사의 딜레이 때문에 200밀리초 지연
        setTimeout(checkLogin, 200);
    } else {
		// 그렇지 않은 경우
        console.log("[Helper] 무작위 닉네임 생성 버튼 추가 중...");

		// 닉네임 무작위 생성 버튼 지정
        var quickbutton = document.createElement("button");

		// 버튼을 넣을 Div를 지정
        var insertdiv = document.getElementsByClassName("bx1_shadow")[0];
        insertdiv.style.paddingBottom = "6px";
        insertdiv.appendChild(quickbutton);

		// 버튼 스타일 지정
        quickbutton.className = "cafeUIButton";
        quickbutton.style.marginLeft = "80px";
        quickbutton.textContent = "무작위 20글자 숫자 닉네임 생성하기";

		//버튼을 클릭시 닉네임 입력창에 무작위로 생성한 닉네임을 입력
        quickbutton.addEventListener("click", function() { document.getElementById("cafeNickNameInput").value = setRandName(); } );

		// 회원 정보 수정 페이지의 스크립트로 인해 Button으로 Element를 생성하면
		// 자동으로 클릭 이벤트에 중복 검사, 닉네임 적용 스크립트가 들어감
    }
}

function setRandName() {
    // 닉네임 무작위 생성 함수

	// 다음을 20회 반복합니다.
    // 무작위로 숫자 하나를 생성 후, 숫자가 닉네임의 마지막 5글자와 일치하지 않는지 확인 후 일치하지 않으면 닉네임 마지막에 덧붙입니다.
    var nickname = ""; // 반환할 닉네임. String으로 선언하여 1 + 1 = 2가 아닌 1 + 1 = "11"로 값을 지정하게 함
    var currentnum = 0; // 마지막에 덧붙일 닉네임 1글자
    var checkSum = true; // 조건 변수

    for (i = 1; i < 21; i++) {
		// 닉네임 생성
	    while (checkSum) {
			// 반복 시작

			// 조건을 False로 설정
            checkSum = false;

			// 무작위로 숫자 하나를 뽑음
			currentnum = Math.floor(Math.random() * 10);

			// 무작위로 뽑은 숫자가 마지막 5글자와 동일한지 확인
			for (t = 1; t < 6 && t < i; t++) {
	     		if (nickname[i - t - 1] == currentnum) {
					// 동일하면 조건을 True로 설정하여 반복을 계속함
					checkSum = true;
				}
			}
		}
		checkSum = true;
		// 반복이 끝나면 무작위로 뽑은 숫자를 닉네임 마지막에 덧붙임
        nickname += currentnum;
    }
    /*nickNameValidationChk._onClick(nickNameValidationChk.nickNameButton); // 닉네임 중복 검사
    setTimeout(checkLogin, 300); // _onClick 메소드에 200 밀리초 대기 Timeout 가 있기 때문에 300 밀리초 대기*/
    console.log("[Helper] 닉네임 생성 됨");
	return nickname;
}

function autoCheckMember(mode) {
	// 가입 신청 자동화 도구
	// 닉네임이 조건에 맞는지 검사 한 뒤,
	// 사용자가 누른 버튼에 따라 조건에 맞는 닉네임만 체크하거나, 그렇지 않은 닉네임만 체크합니다.

    var memberTable = document.getElementById("applymemberList").getElementsByTagName("tr"); // 멤버의 Table
    var memberCheck = document.getElementsByName("applyMemberCheck"); // 멤버의 체크 박스
    var memberNick = document.querySelectorAll("a.nick"); // 멤버의 닉네임
    var memberLength = memberTable.length; // 현재 페이지의 총 멤버 수
    try {
        for (i=0; i < memberLength; i++) {
            if (nicknameCheck(memberNick[i].textContent) == true) {
                if (mode == true) {
                    memberTable[i].classList.add("selected");
                    memberCheck[i].checked = true;
                } else {
                    memberTable[i].classList.remove("selected");
                    memberCheck[i].checked = false;
                }
            } else {
                if (mode == false) {
                    memberTable[i].classList.add("selected");
                    memberCheck[i].checked = true;
                } else {
                    memberTable[i].classList.remove("selected");
                    memberCheck[i].checked = false;
                }
            }
        }
    } catch(ex) {
        console.error("[Helper] 오류 발생!!");
        console.error(ex);
    }
}

function nicknameCheck(nickname) {
	// 가입 대기자들의 닉네임을 3단계에 걸처서 검사합니다.
	// 1단계 - 정규식 : 20자리 숫자 닉네임들만 통과합니다.
	// 2단계 - 연속성 체크 : 숫자를 여러 부분으로 나눠 어떤 숫자가 몇회 반복되는지 확인 후 반복되는 횟수, 숫자의 길이에 따라 연속성 점수를 매깁니다.
	// 연속성 점수가 카페 매니저가 지정한 점수보다 낮은 닉네임들만 통과합니다.
	// 3단계 - 특정 숫자 체크 : 닉네임에 특정 숫자가 몇번 들어갔는지 확인 후, 특정 숫자가 들어간 횟수, 숫자의 길이에 따라 패널티를 매깁니다.
	// 패널티가 20점 이하인 닉네임들만 통과합니다.

    // 1단계: 정규식
    var nickRegex = new RegExp("^[(0-9)]{20}\ \\(", "i"); // 20자리 숫자 닉네임 정규식
    if (nickRegex.test(nickname) == false) {
        console.log("[Helper] " + nickname + " 제외 :: 정규식 통과 실패");
        return false;
    }

    // 2단계 - 연속성 체크
    var repeatScore = getRepeatScore(nickname);
    if (repeatScore > GM_getValue("nickSensitivity")) {
        console.log("[Helper] " + nickname + " 제외 :: 연속성 스코어 높음 (" + repeatScore + ")");
        return false;
    }

    // 3단계 - 특정 숫자 체크
    var banScore =  findBannedNumber(nickname);
    if (banScore.nickPenalty > 19) {
        console.log("[Helper] " + nickname + " 제외 :: 금지 숫자 패널티 높음 (" + banScore.nickPenalty +  ") " + banScore.containNum );
        return false;
    }

	// 여기까지 오면 닉네임에 이상이 없다고 판단, 닉네임을 통과함
    console.log("[Helper] " + nickname + " 통과 :: (" + repeatScore + ") (" + banScore.nickPenalty + " / " + banScore.containNum + ")");
    return true;
}

function getRepeatScore(nickname) {
	// 2단계 - 연속성 체크 : 숫자를 여러 부분으로 나눠 어떤 숫자가 몇회 반복되는지 확인 후 반복되는 횟수, 숫자의 길이에 따라 연속성 점수를 매깁니다.
	// 연속성 점수가 카페 매니저가 지정한 점수보다 낮은 닉네임들만 통과합니다.
    var repeatPenalty = [100,75,30,10,5,0,0,0,0,0]; // 연속성 패널티
    var nickRepeatScore = -1; // 연속성 스코어
    var tempNumber;
    for (t=0; t < 21; t++) {
        for (x=0; x < 10; x++) {
            if (t > x) {
                tempNumber = new RegExp(nickname.substr(t - x - 1, x + 1), "g");
                nickRepeatScore += (nickname.match(tempNumber) || []).length * repeatPenalty[x];
            }
        }
    }
    if (nickRepeatScore == -1) {
        console.error("[Helper] getRepeatScore의 입력 값이 올바르지 않은 것 같습니다. 입력 값: "+ nickname);
        return -1;
    } else {
        return nickRepeatScore + 1;
    }
}

function findBannedNumber(nickname) {
	// 3단계 - 특정 숫자 체크 : 닉네임에 특정 숫자가 몇번 들어갔는지 확인 후, 특정 숫자가 들어간 횟수, 숫자의 길이에 따라 패널티를 매깁니다.
	// 패널티가 20점 이하인 닉네임들만 통과합니다.
    var bannedNumber = GM_getValue("specificNumberBanText").split(",");
    var bannedPenalty = [0,0,5,9,12,15,21,28,36,45,55]; // 금지 숫자 패널티
    var Result = {nickPenalty:0, containNum:[]};
    var tempNumber;
    var num;

    if (bannedNumber.length == 0 && bannedNumber == "") {
        return 0;
    }
    for (num in bannedNumber) {
        tempNumber = new RegExp(bannedNumber[num], "g");
        if ((nickname.match(tempNumber) || []).length > 0) {
            Result.nickPenalty += bannedPenalty[bannedNumber[num].length] * (nickname.match(tempNumber) || []).length;
            Result.containNum.push(bannedNumber[num]);
        }
    }
    return Result;
}

function addDebugMember(nickname) {
	// 디버그용 스크립트 :: 카페 가입 대기자 목록에 가짜 멤버를 추가합니다. (이거 없었으면 이 기능 못만듬..)
	// 가짜 멤버를 가입 수락시켜도 카페 회원으로 추가되지는 않습니다.

	if (nickname === null) {
		return false;
	}

	if (nickname == "") {
		nickname = setRandName();
	}

    var memberTable = document.getElementById("applymemberList");
    var memberBox = document.createElement("tr");
    memberTable.appendChild(memberBox);
    memberBox.outerHTML = `
    <tr id="debug` + nickname + `">
        <td class="tc">
            <input type="checkbox" name="applyMemberCheck" value="someone" id="c1" title="선택" class="check _click(ManageJoinApplication|Member|debug` + nickname + `)">
        </td>
        <td>
            <div class="pers_nick_area">
                <span class="img"><img src="https://cafe.pstatic.net/img/cafe_profile3_45x45.gif" width="20" height="20" alt=""></span><a href="#" class="nick _click(NicknameUI|OpenUI|debug` + nickname + `) _stopDefault">` + nickname + ` (??????)</a>
            </div>
        </td>
        <td class="tc">
            <span class="txt"></span>
        </td>
        <td class="tc">
            <span class="txt"></span>
        </td>
        <td class="tc">
            <span class="num">3001.12.31.</span>
        </td>
        <td colspan="2" class="tc">
            <a href="#" class="btn_mem_view _click(ManageJoinApplication|MemberDetail|debug` + nickname + `|debug` + nickname + `) _stopDefault"><span class="blind">가입 답변 상세보기</span></a>
        </td>
    </tr>
`;
}