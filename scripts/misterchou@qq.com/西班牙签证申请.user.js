// ==UserScript==
// @name         西班牙签证申请
// @namespace    http://tampermonkey.net/
// @version      0.141
// @description  这是帮助你在申请西班牙签证的一个脚本，他可以在快速的填写签证页面的信息。|This is a script to help you apply for a visa in Spain, he can quickly fill in the visa page information.
// @author       misterchou@qq.com
// @require      http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @include        *://*.blsspainvisa.com/*
// @grant        none
// @run-at document-end

// ==/UserScript==

(function() {
	'use strict';

	console.log("Code start");
	//Preset information

	/*

/*
 预设信息|Preset infomation
VisaType:
	28=Tourism
	29=Business
	30=Family Visit
	31=Property Owner
	32=Student
	33=Sports  Cultural  Artistic  Scientific
	34=Mission
	35=Medical Visit
	36=Transit
	37=Residence Permit
	38=Eu Citizens Family Reunification
	39=Family Reunification
	40=Student
	41=Work Permit (Own Account)
	42=Work Permit (Third Party)
	
passportType：
	Ordinary passport = 01
	Collective passport = 02
	Protection passport = 03
	Diplomatic passport = 04
	Service passport = 05
	Government official on duty =06
	Special passport = 07
	Passport of foreigners = 08
	National laissez-passer = 10
	UN laissez-passer = 11
	Refugee Travel Document (Geneva Convention) = 12
	D. Viaje Apatridas C. New York = 13
	Official passport = 14
	Seaman’s book = 16
	
	*/

	//**************************************
	//↓↓↓↓↓↓↓↓↓↓请填写资料|Please fill in the information↓↓↓↓↓↓↓
	var
		AppointmentTime = "09:00 - 09:15",
		VisaType = "28",
		first_name = "first_name",
		last_name = "last_name",
		dateOfBirth = "1995-04-14",
		passportType = "01",
		passport_no = "123456789",
		pptIssueDate = "2019-01-01",
		pptExpiryDate = "2029-01-01",
		PassportIssuePlace = "BeiJing";
	//↑↑↑↑↑↑↑↑↑**************************************↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

	var timer = setInterval(aaa, 1000);//填写资料|Fill in the information
	var dataTimers = setInterval(bbb, 100);//显示日期框|Show date box
	var submitTimer = setInterval(ccc,100);//申请页面提交|Application page submission
	var agreeTimer = setInterval(ddd, 100);//The agree button on page 2|The agree button on page 2

	function bbb() {
		$("#app_date").trigger("focus");
	}

	//判断是否选择了日期|Determine whether a date has been selected
	function aaa() {

		if($('#app_date').val() == "") {
			clearInterval(dataTimers);
			//判断是否有可选日期|Determine if there is an optional date
			if($(".datepicker-days .day.activeClass").length > 0) {
				//选择第一天|select date 1
				$(".datepicker-days .day.activeClass")[0].click();
			} else {
				console.log("没有可用日期|No available date");
			}
		} else {
			//已经预约了日期|The date has been booked
			console.log("已经预约了日期，开始填写资料|I have made an appointment and started filling in the information");
			$('#app_time').val(AppointmentTime);
			$('#VisaTypeId').val(VisaType);
			$('#first_name').val(first_name);
			$('#last_name').val(last_name);
			$('#dateOfBirth').val(dateOfBirth);
			$('#passportType').val(passportType);
			$('#passport_no').val(passport_no);
			$('#pptIssueDate').val(pptIssueDate);
			$('#pptExpiryDate').val(pptExpiryDate);
			$('#pptIssuePalace').val(PassportIssuePlace);
			console.log("资料填写完毕|Information completed");
			clearInterval(timer);
			clearInterval(dataTimers);
			$(".datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top").hide();

			//提交|submit
			
		}
	}

	function ccc() {
		$("#new .btn.primary-btn").click();
	}

	function ddd() {
		if($('.btn.secondry-btn').length > 2) {
			$.each($('.btn.secondry-btn'), function(i, e) {
				if(e.value == "Agree") {
					e.click();
					console.log("click Agree button");
					
				}
			})
		}

	}

	console.log("End of code run");
})();