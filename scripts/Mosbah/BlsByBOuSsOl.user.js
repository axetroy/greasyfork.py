// ==UserScript==
// @name         BlsByBOuSsOl
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  BlsAutoFill
// @author       MeGaBOuSsOl
// @match        https://algeria.blsspainvisa.com/book_appointment.php
// @grant        God
// ==/UserScript==

/*1st informations*/
/*Use For Algiers  15#Algiers#10 and 14#Oran#9 For Oran*/
document.getElementById('juridiction').value="14#Oran#9";
document.getElementById('email').value="exemple@gmail.com";
document.getElementById('phone').value="555555555";
/*Send  Otp*/
setInterval(function(){document.querySelector("#em_tr > div.col-sm-6 > abbr > input").click();}, 3000);
/*X*/
document.querySelector("#IDBodyPanelapp > div.popup-appCloseIcon").click();
/*Refresh If Response*/
setInterval(function(){if((document.querySelector('#reponse_div').outerHTML).indexOf('Token validation Failed') > -1){location.reload();}}, 5000);
/*I Agree*/
document.querySelector("#Booking > section > div > div > div > div.col-sm-7.paddingInBox.pull_right > div:nth-child(1) > button").click();
/*User*/
document.getElementById('phone_code').value="";
document.getElementById('first_name').value="";
document.getElementById('last_name').value="";
document.getElementById('dateOfBirth').value="xxxx-xx-xx";
document.getElementById('nationality').value="";
document.getElementById('passportType').value="";
document.getElementById('passport_no').value="";
document.getElementById('pptIssueDate').value="xxxx-xx-xx";
document.getElementById('pptExpiryDate').value="xxxx-xx-xx";
/*28 For Oran, 43 For Algiers */
document.getElementById('VisaTypeId').value="28";
document.getElementById('pptIssuePalace').value="Oran";