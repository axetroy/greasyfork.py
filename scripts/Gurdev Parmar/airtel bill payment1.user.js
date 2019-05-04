// ==UserScript==
// @name         airtel bill payment1
// @version      1
// @description  a script to populate my phne number in airtel
/////////////////

/////////////////
// @grant        none
// @namespace    whizdm.com
// @run-at       document-start
// @include      *://greasyfork.org/forum/discussion/*
// ==/UserScript==
document.payBillFormBean.serviceInstance.value = "99003430343";
document.payBillFormBean.payAmount.value ="500";
document.payBillFormBean.submit();