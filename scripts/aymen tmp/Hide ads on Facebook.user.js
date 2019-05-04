// ==UserScript==
// @name           Hide ads on Facebook
// @description    Removes "People you may know", "Recommended Pages" and similar on Facebook.
// @namespace      http://jnv.github.io
// @domain         libertagia.com
// @include        http://tasks.libertagia.com/*
// @grant          GM_addStyle
// @version 0.0.1.20150204173352
// ==/UserScript==


/* Template Name: Conquer Description: Admin Dashboard Template. Author: Shuhrat Saipov Author URI: http://axella.co.uk Version: 1.0 */ @-ms-viewport {
	 width: device-width;
	 overflow-y: auto;
 }

 /* body styling */ body {
	color: #000;
	 font-family: 'Arial';
	 padding: 0px !important;
	 margin: 0px !important;
	 overflow-y: auto;
	 font-size:13px;
 }

 /* fix for font awesome icon classes */ [class^="icon-"], [class*=" icon-"],[class^="icon-"]:hover, [class*=" icon-"]:hover {
	background: none !important;
 }

 /* general typography*/ h3 small, h small, h5 small {
	color: #444;
 }

 a {
	text-shadow: none !important;
	 color: #016fa7;
 }

 .network-form label{
	margin-right: 10px !important;
 }

 .network-form label, .network-form input[type="radio"]{
	margin-top: 5px !important;
 }

 .network-form{
	margin-top: 3px;
 }

 .page-title {
	font-size: 22px;
	 display: block;
	 font-weight: normal !important;
	 margin: 13px 0px 8px 0px;
 }

 .page-title small {
	font-size: 14px;
 }

 /* general tools */ img.center {
	text-align:center;
 }

 .phone-margin-top-5:before {
	display: block;
	 margin-top: 5px;
 }

 .no-padding {
	padding: 0px !important;
 }

 .no-margin {
	margin: 0px !important;
 }

 .no-bottom-space {
	padding-bottom:0px !important;
	 margin-bottom: 0px !important;
 }

 .no-top-space {
	padding-top:0px !important;
	 margin-top: 0px !important;
 }

 .block-margin-bottom-5 {
	display: inline-block;
	 margin-bottom: 5px;
 }

 .hide {
	display: none;
 }

 .bold {
	font-weight:bold;
 }

 .fix-margin {
	margin-left: 0px !important 
}

 .border {
	border: 1px solid #ddd 
}

 .small {
	font-size: 11px !important;
	 color: #000;
	 font-weight: bold;
 }

 .btn-top-space {
	margin-top: 5px !important;
 }

 .italic {
	font-style: italic !important;
 }

 i.big {
	font-size: 20px;
 }

 i.warning {
	color: #d12610;
 }

 i.critical {
	color: #37b7f3;
 }

 i.normal {
	color: #52e136;
 }

 hr {
	margin: 15px 0;
	 border: 0;
	 border-top: 1px solid #E0DFDF;
	 border-bottom: 1px solid #FEFEFE;
 }

 i.icon, a.icon {
	color: #999;
 }

 a.icon:hover {
	text-decoration: none;
	 -webkit-transition: all 0.1s ease-in-out;
	 -moz-transition: all 0.1s ease-in-out;
	 -o-transition: all 0.1s ease-in-out;
	 -ms-transition: all 0.1s ease-in-out;
	 transition: all 0.1s ease-in-out;
	 opacity: .4;
 }

 a.icon.huge i{
	font-size: 16px !important;
 }

 .space5 {
	display: block;
	 height: 5px !important;
	 clear: both;
 }

 .space7 {
	height: 7px !important;
	 clear: both;
 }

 .space10 {
	height: 10px !important;
	 clear: both;
 }

 .space12 {
	height: 12px !important;
	 clear: both;
 }

 .space15 {
	height: 15px !important;
	 clear: both;
 }

 .space20 {
	height: 20px !important;
	 clear: both;
 }

 .no-text-shadow {
	text-shadow: none !important;
 }

 /*fix outlines on click*/ a,a:focus, a:hover, a:active {
	outline: 0;
 }

 /*logo*/ #header .brand {
	margin-top: -1px !important;
	 width: 140px;
 }

 /* header nav bar*/ #header.navbar {
	margin-bottom: 3px !important;
	 min-width: 0px;
 }

 #header .navbar-inner .nav > li.dropdown, .navbar-inner .nav > li.dropdown > a {
	padding-left: 4px !important;
	 padding-right: 4px !important;
 }

 #header .navbar-inner .nav > li {
	margin-left: 0px !important;
	 margin-right: 0px !important;
 }

 #header .navbar-inner li.dropdown .dropdown-toggle i {
	font-size: 15px;
 }

 #header .navbar-inner li.dropdown .dropdown-toggle .label {
	position: relative;
	 top:-3px;
	 font-size: 9px !important;
	 padding-top: 0px !important;
	 padding-bottom: 0px !important;
	 margin-top: 0px !important;
	 display: inline-block !important;
 }

 #header .navbar-inner .nav .dropdown-toggle:hover, .navbar-inner .nav .dropdown.open .dropdown-toggle {
	-webkit-border-radius: 4px;
	 -moz-border-radius: 4px;
	 border-radius: 4px;
 }

 #header.navbar-inverse .btn-navbar {
	margin-top: 6px;
	 color: white;
	 text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
	 background-color: #e9ebec;
	 background-image: -moz-linear-gradient(top, #e9ebec, #caced1);
	 background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#e9ebec), to(#caced1));
	 background-image: -webkit-linear-gradient(top, #e9ebec, #caced1);
	 background-image: -o-linear-gradient(top, #e9ebec, #caced1);
	 background-image: linear-gradient(to bottom, #e9ebec, #caced1);
	 background-repeat: repeat-x;
	 filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffcaced1', endColorstr='#ffcaced1', GradientType=0);
	 border-color: #caced1 #caced1 black;
	 border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
 }

 #header.navbar-inverse .btn-navbar:hover {
	background-color: #caced1;
 }

 #header .navbar-inner {
	top:0px;
	 width: 100%;
	 margin: 0px !important;
	 margin-bottom: -2px !important;
	 border-top: 0px !important;
	 border-left: 0px !important;
	 border-right: 0px !important;
	 padding: 0px;
	 -webkit-border-radius: 0;
	 -moz-border-radius: 0;
	 border-radius: 0;
 }

 #header.navbar-inverse .navbar-inner {
	padding-top: 4px;
	 height: 42px;
 }

 #header.navbar-inverse .divider-vertical {
	height: 40px;
 }

 #header .navbar-search {
	margin-left: 110px;
 }

 #header .top-nav .dropdown-menu {
	margin-top: 3px;
 }

 #header .search-query, #sidebar .search-query  {
	padding-right: 30px !important;
 }

 #header .search-input-icon > i, #sidebar .search-input-icon > i {
	display: inline-block !important;
	 position: relative !important;
	 top: 2px !important;
	 right: 28px !important;
	 font-size: 18px;
	 cursor: pointer;
 }

 /* main container */ #container {
}

 .fixed-top #container {
	margin-top: 48px;
 }

 /* i8 fix for form input height in fluid rows */ .ie8 .row-fluid [class*="span"] {
	1min-height: 20px !important;
 }

 /* body container */ #body {
	margin-top: 7px;
	 margin-left: 215px;
	 min-height: 600px;
	 background: #f7f7f7 url("../img/body-bg.png");
	 border-bottom: 2px solid #ddd;
 }

 /* page container */ #page {
}

 /* sidebar menu */ #sidebar .navbar-search {
	border: 0px;
	 -webkit-box-shadow: none !important;
	 -moz-box-shadow: none !important;
	 box-shadow: none !important;
 }

 #sidebar > ul {
	list-style: none;
	 margin: 0;
	 padding: 0;
	 margin: 0;
	 padding: 0;
	 -webkit-border-radius: 0px;
	 -moz-border-radius: 0px;
	 border-radius: 0px;
 }

 #sidebar > ul > li {
	display: block;
	 margin: 0;
	 padding: 0;
	 border: 0px;
 }

 #sidebar > ul > li > a {
	display: block;
	 position: relative;
	 margin: 0;
	 border: 0px;
	 padding: 10px 15px;
	 -webkit-border-radius: 0px !important;
	 -moz-border-radius: 0px !important;
	 border-radius: 0px !important;
	 text-decoration: none;
	 font-size: 13px;
	 font-weight: bold;
 }

 #sidebar > ul > li a i {
	color:#eaeaea;
	 font-size: 18px;
 }

 #sidebar > ul > li.active > a{
	border: none;
 }

 #sidebar > ul > li.active {
	border-right: 4px solid #d12610;
 }

 #sidebar > ul > li.active > a .triangle {
	width: 0;
	 height: 0;
	 border-right: 7px solid #f3f3f3;
	 border-top: 12px solid transparent;
	 border-bottom: 12px solid transparent;
	 float: right;
	 position: absolute;
	 right:0px;
	 top:8px;
 }

 #sidebar ul > li > a .arrow {
	float: right;
	 margin-top: 6px;
	 margin-right: 5px;
	 width: 0;
	 height: 0;
	 border-right: 5px solid #f3f3f3;
	 border-top: 4px solid transparent;
	 border-bottom: 4px solid transparent;
 }

 #sidebar > ul > li > a .arrow.open {
	float: right;
	 margin-top: 10px;
	 margin-right: 10px;
	 width: 0;
	 height: 0;
	 border-top: 5px solid #f3f3f3;
	 border-left: 4px solid transparent;
	 border-right: 4px solid transparent;
 }

 #sidebar > ul > li > ul.sub {
	display: none;
	 list-style: none;
	 clear: both;
	 margin: 12px 0px 12px 20px;
 }

 #sidebar > ul > li.active > ul.sub {
	display: block;
 }

 #sidebar > ul > li > ul.sub > li {
	background: none !important;
	 padding: 0px;
 }

 #sidebar > ul > li > ul.sub > li > a {
	display: block;
	 position: relative;
	 margin: 4px 40px 4px 0;
	 padding: 4px 15px;
	 color: #ccc;
	 text-decoration: none;
	 text-shadow: 0 1px 1px #000;
	 font-size: 13px;
	 font-weight: bold;
	 background: none !important;
 }

 #sidebar > ul > li > ul.sub > li.active > a, #sidebar > ul > li > ul.sub > li > a:hover {
	-webkit-border-radius: 4px;
	 -moz-border-radius: 4px;
	 border-radius: 4px;
 }

 /* ie8, ie9 fixes */ .ie8 #sidebar .search-query, .ie8 #header .search-query {
	padding-top: 7px !important;
	 padding-bottom: 5px !important;
 }

 .ie9 #sidebar .search-query, .ie9 #header .search-query {
	padding-bottom: 0px !important;
	 height: 24px;
 }

 .ie9 #sidebar > ul > li.active > a .triangle {
	right: -1px;
 }

 /* footer container */ #footer {
	padding: 8px 20px 5px 20px;
	 font-size: 12px;
	 color: #999;
 }

 #footer .go-top {
	display: block;
	 font-size: 12px;
	 text-decoration: none;
	 color: #fff;
	 cursor: pointer;
	 margin-top: -3px;
	 margin-right: 0px;
	 margin-bottom: 0px;
	 font-size: 16px;
	 background-color: #111;
	 opacity: 0.8;
	 padding: 3px 5px 2px 6px;
 }

 /* ie10 fixes */ .ie10 .#header .search-input-icon > i, .ie10 #sidebar .search-input-icon > i {
	top:-2px !important;
 }

 /* ie8 fixes */ .ie8 #sidebar {
	position: absolute;
	 width: 215px;
 }

 .ie8 #sidebar ul{
	margin-top:25px;
	 width: 215px;
 }

 /* custom wells */ .well {
	background-color: #fafafa;
	 border: 1px solid #ddd;
	 -webkit-border-radius: 4px;
	 -moz-border-radius: 4px;
	 border-radius: 4px;
	 -webkit-box-shadow: none !important;
	 -moz-box-shadow: none !important;
	 box-shadow: none !important;
 }

 .well.mini {
	padding: 7px !important;
 }

 /* general form */ form legend {
	margin: 15px 0px 10px 0px !important;
 }

 .widget-body.form form {
	margin: 0px !important;
	 padding: 0px !important;
 }

 .widget-body.form .control-group:last-child {
	padding-bottom: 0px !important;
	 margin-bottom: 0px !important;
 }

 .widget-body.form .form-actions{
	margin-left:-15px !important;
	 margin-right:-15px !important;
	 margin-top: 0px !important;
	 margin-bottom: -15px !important;
	 margin-top: 40px;
	 padding-left: 195px;
	 -webkit-border-radius: 0px 0px 4px 4px;
	 -moz-border-radius: 0px 0px 4px 4px;
	 border-radius: 0px 0px 4px 4px;
 }

 .widget-body .dataTables_info, .widget-body .dataTables_paginate {
	margin-top: 5px !important;
	 padding-bottom: 0px !important;
	 margin-bottom: -4px !important;
 }

 .widget-body .table {
	padding-bottom: 0px !important;
	 margin-bottom: 0px !important;
 }

 /* custom form input error states with icons */ .input-icon input {
	padding-right: 25px !important;
 }

 .input-icon .input-error, .input-icon .input-warning, .input-icon .input-success {
	display: inline-block !important;
	 position: relative !important;
	 top: 4px;
	 right: 25px !important;
	 font-size: 16px;
 }

 .input-icon .input-error {
	color:#B94A48;
 }

 .input-icon .input-warning {
	color: #C09853;
 }

 .input-icon .input-success {
	color: #468847;
 }

 /* custom breadcrumb */ .breadcrumb {
	-webkit-border-radius: 0px;
	 -moz-border-radius: 0px;
	 border-radius: 0px;
	 box-shadow: none !important;
	 margin-left: -20px;
	 margin-right: -20px;
	 padding-left: 20px;
	 padding-right: 30px;
	 margin-bottom: 20px;
	 text-shadow:none !important;
	 border:0px !important;
	 border-top: 1px solid #ddd !important;
	 border-bottom: 1px solid #ddd !important;
	 background-color: #EFEFEF;
 }

 .breadcrumb .tooltip {
	text-shadow:none !important;
 }

 /* widget container */ .sortable .widget .widget-title {
	cursor: move;
 }

 .sortable-box-placeholder {
	background-color: #f5f5f5;
	 border: 1px dashed #DDDDDD;
	 display: block;
	 /* float: left;
	*/ margin-top: 18px !important;
	 margin-left: 1%;
	 margin-right: 0.6%;
	 -webkit-border-radius: 3px;
	 -moz-border-radius: 3px;
	 border-radius: 3px;
 }

 .sortable-box-placeholder * {
	visibility:hidden;
 }

 .widget {
	background: none repeat scroll 0 0 #F9F9F9;
	 border-top: 1px solid #e0dede;
	 border-left: 1px solid #e0dede;
	 border-right: 1px solid #e0dede;
	 clear: both;
	 margin-top: 0px;
	 margin-bottom: 20px;
	 -webkit-border-radius: 3px;
	 -moz-border-radius: 3px;
	 border-radius: 3px;
 }

 .widget-title {
	background-color: #EFEFEF;
	 background-image: -webkit-gradient(linear, 0 0%, 0 100%, from(#FDFDFD), to(#EAEAEA));
	 background-image: -webkit-linear-gradient(top, #FDFDFD 0%, #EAEAEA 100%);
	 background-image: -moz-linear-gradient(top, #FDFDFD 0%, #EAEAEA 100%);
	 background-image: -ms-linear-gradient(top, #FDFDFD 0%, #EAEAEA 100%);
	 background-image: -o-linear-gradient(top, #FDFDFD 0%, #EAEAEA 100%);
	 background-image: -linear-gradient(top, #FDFDFD 0%, #EAEAEA 100%);
	 filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fdfdfd', endColorstr='#eaeaea',GradientType=0 );
	 border-bottom: 1px solid #e0dede;
	 height: 36px;
	 -webkit-border-radius: 3px 3px 0px 0px;
	 -moz-border-radius: 3px 3px 0px 0px;
	 border-radius: 3px 3px 0px 0px;
 }

 .widget-title h4 {
	color: #444;
	 float: left;
	 font-size: 13px;
	 font-weight1: bold;
	 padding: 11px 11px 11px 15px;
	 line-height: 12px;
	 margin: 0;
 }

 .widget-title h4 i {
	font-size: 14px;
	 margin-right: 2px;
 }

 .widget-title span.tools {
	padding: 3px 5px 2px;
	 float: right;
	 margin: 6px 0px 0 0;
 }

 .widget-title span.tools > a {
	display: inline-block;
	 margin-right: 5px;
	 color: #555;
	 font-size: 14px;
 }

 .widget-title span.tools > a:hover {
	text-decoration: none;
	 -webkit-transition: all 0.1s ease-in-out;
	 -moz-transition: all 0.1s ease-in-out;
	 -o-transition: all 0.1s ease-in-out;
	 -ms-transition: all 0.1s ease-in-out;
	 transition: all 0.1s ease-in-out;
	 opacity: .6;
 }

 .widget-title .btn-group {
	margin-right:5px;
	 margin-top: -2px;
 }

 .widget-title .btn-group .caret {
	margin-top: 8px;
	 margin-left: 3px;
 }

 .widget-body {
	padding: 15px 15px;
	 border-bottom: 1px solid #CDCDCD;
	 -webkit-border-radius: 0px 0px 3px 3px;
	 -moz-border-radius: 0px 0px 3px 3px;
	 border-radius: 0px 0px 3px 3px;
 }

 /* charts & stats */ .chart, .pie, .bars {
	height: 300px;
 }

 .stat {
	margin: 0px;
	 padding: 0px;
 }

 .item-list.table .percent {
	width: 30px;
	 float: right;
	 margin-right: 10px;
	 margin-top: 3px;
 }

 .item-list.table .title {
	padding-top: -5px;
 }

 .stat .title {
	margin-left: 10px;
	 margin-right: 10px;
	 font-size1: 13px;
 }

 .stat.good .percent  {
	color: #52e136;
	 font-size: 16px;
	 font-weight: bold;
 }

 .stat.bad .percent {
	color: #d12610;
	 font-size: 16px;
	 font-weight: bold;
 }

 .stat.ok .percent {
	color: #37b7f3;
	 font-size: 16px;
	 font-weight: bold;
 }

 /* general list for item with picture */ ul.item-list li .pic {
	height: 50px;
	 width: 50px;
	 float: left;
	 margin-top: 3px;
	 margin-right: 5px;
	 -webkit-border-radius: 2px !important;
	 -moz-border-radius: 2px !important;
	 border-radius: 2px !important;
 }

 ul.item-list {
	margin: 0px;
	 list-style: none;
 }

 ul.item-list li {
	padding: 7px 0 5px 0px;
	 list-style: none;
	 border-top: 1px solid white;
	 border-bottom: 1px solid #EBEBEB;
	 font-size: 12px;
 }

 ul.item-list li:first-child {
	border-top: none;
	 border-bottom: 1px solid #EBEBEB;
 }

 ul.item-list li:last-child {
	border-top: none;
	 border-bottom: none;
 }

 ul.item-list li .label {
	margin-right: 5px;
 }

 /* todo list */ ul.item-list.todo li > a {
	width: 230px;
	 display: inline-block;
	 margin-right: 5px;
 }

 ul.item-list.todo li .label {
	position: absolute;
	 right: 67px;
 }

 ul.item-list.todo li .actions {
	position: absolute;
	 right: 35px;
 }

 /* general purpose block with css3 gradient background */ .block {
	background-color: #F6F6F6;
	 background-image: -webkit-gradient(linear, 0 0%, 0 100%, from(#F9F9F9), to(#EDEDED));
	 background-image: -webkit-linear-gradient(top, #F9F9F9 0%, #EDEDED 100%);
	 background-image: -moz-linear-gradient(top, #F9F9F9 0%, #EDEDED 100%);
	 background-image: -ms-linear-gradient(top, #F9F9F9 0%, #EDEDED 100%);
	 background-image: -o-linear-gradient(top, #F9F9F9 0%, #EDEDED 100%);
	 background-image: linear-gradient(top, #F9F9F9 0%, #EDEDED 100%);
	 filter: progid:dximagetransform.microsoft.gradient(startColorstr='#ffF9F9F9', endColorstr='#ffEDEDED', GradientType=0);
	 border: 1px solid #D5D5D5;
	 box-shadow: 0 1px 0 0 white inset, 0 1px 0 rgba(255, 255, 255, 0.4);
	 -webkit-border-radius: 2px;
	 -moz-border-radius: 2px;
	 border-radius: 2px;
	 line-height: 18px;
	 margin: 0 0 20px 0;
	 padding: 10px;
 }

 /* dashboard stats */ .stats-overview-cont {
	padding-top:0px;
	 margin-bottom: 15px;
 }

 .stats-overview {
	clear: both;
	 padding: 10px 10px 5px 10px;
	 margin: 0px;
	 margin-bottom: 5px;
 }

 .stats-overview .display {
	margin-right: 5px;
	 float: left;
 }

 .stats-overview .details {
	color:#888;
 }

 .stats-overview .details .title {
	color: #777;
	 font-size: 10px;
	 font-weight: normal;
	 margin-bottom: 5px;
	 text-transform: uppercase;
	 letter-spacing: -1px;
 }

 .stats-overview .details .title i {
	color: #999;
	 margin-right: 2px;
 }

 .stats-overview .details .numbers {
	color: #777;
	 font-size: 16px;
	 font-weight: bold;
	 margin-bottom: 6px;
 }

 .stats-overview .details .numbers .small {
	color: #777;
	 font-weight: bold;
	 font-size: 12px !important;
 }

 .stats-overview .progress {
	height: 10px;
	 margin-bottom:10px !important;
 }

 .stats-overview:hover {
	text-decoration: none !important;
	 border-color: #999 !important;
	 color: #444 !important;
	 text-shadow: 0 1px 0px rgba(255, 255, 255, 1) !important;
	 -webkit-transition: all 0.3s ease !important;
	 -moz-transition: all 0.3s ease !important;
	 -ms-transition: all 0.3s ease !important;
	 -o-transition: all 0.3s ease !important;
	 transition: all 0.3s ease !important;
	 -webkit-box-shadow: 0px 0px 3px rgba(0, 0, 0, .55) !important;
	 -moz-box-shadow: 0px 0px 3px rgba(0,0,0,.55) !important;
	 box-shadow: 0px 0px 3px rgba(0, 0, 0, .55) !important;
 }

 /* mini chart and bar containers  */ .bar-chart {
	display: none
}

 .line-chart {
	display: none
}

 /* custom label and badges */ .label {
	-webkit-border-radius: 2px -moz-border-radius: 2px !important;
	 border-radius: 2px !important;
 }

 .label-success, .badge-success {
	border-color: #5AAD34;
	 background-color: #5fd02c;
	 background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #97e076), color-stop(100%, #5fd02c));
	 background-image: -webkit-linear-gradient(top, #97e076, #5fd02c);
	 background-image: -moz-linear-gradient(top, #97e076, #5fd02c);
	 background-image: -ms-linear-gradient(top, #97e076, #5fd02c);
	 background-image: -o-linear-gradient(top, #97e076, #5fd02c);
	 background-image: linear-gradient(top, #97e076, #5fd02c);
 }

 .label-warning, .badge-warning {
	border-color: #F4A506;
	 background-color: #fcb322;
	 background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #ffde9d), color-stop(100%, #fcb322));
	 background-image: -webkit-linear-gradient(top, #ffde9d, #fcb322);
	 background-image: -moz-linear-gradient(top, #ffde9d, #fcb322);
	 background-image: -ms-linear-gradient(top, #ffde9d, #fcb322);
	 background-image: -o-linear-gradient(top, #ffde9d, #fcb322);
	 background-image: linear-gradient(top, #ffde9d, #fcb322);
 }

 .label-important, .badge-important {
	border-color: #FA5833;
	 background-color: #ed4e2a;
	 background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #fbb2a1), color-stop(100%, #ed4e2a));
	 background-image: -webkit-linear-gradient(top, #fbb2a1, #ed4e2a);
	 background-image: -moz-linear-gradient(top, #fbb2a1, #ed4e2a);
	 background-image: -ms-linear-gradient(top, #fbb2a1, #ed4e2a);
	 background-image: -o-linear-gradient(top, #fbb2a1, #ed4e2a);
	 background-image: linear-gradient(top, #fbb2a1, #ed4e2a);
 }

 .label-info, .badge-info {
	border-color: #2FABE9;
	 background-color: #57b5e3;
	 background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #aedbf2), color-stop(100%, #57b5e3));
	 background-image: -webkit-linear-gradient(top, #aedbf2, #57b5e3);
	 background-image: -moz-linear-gradient(top, #aedbf2, #57b5e3);
	 background-image: -ms-linear-gradient(top, #aedbf2, #57b5e3);
	 background-image: -o-linear-gradient(top, #aedbf2, #57b5e3);
	 background-image: linear-gradient(top, #aedbf2, #57b5e3);
 }

 .label-mini {
	font-size: 11px;
 }

 /* icon buttons */ .icon-btn {
	height: 70px;
	 width: 50px;
	 margin: 10px 0px 10px 0px;
	 border: 1px solid #ddd;
	 padding: 16px 0px 0px 0px;
	 font-size: 10px;
	 background-color: #fafafa !important;
	 background-image: -moz-linear-gradient(top, #fafafa, #efefef) !important;
	 background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#fafafa), to(#efefef)) !important;
	 background-image: -webkit-linear-gradient(top, #fafafa, #efefef) !important;
	 background-image: -o-linear-gradient(top, #fafafa, #efefef) !important;
	 background-image: linear-gradient(to bottom, #fafafa, #efefef) !important;
	 filter: progid:dximagetransform.microsoft.gradient(startColorstr='#fffafafa', endColorstr='#ffefefef', GradientType=0) !important;
	 -webkit-box-shadow: 0 1px 0px rgba(255, 255, 255, .8) !important;
	 -moz-box-shadow: 0 1px 0px rgba(255, 255, 255, .8) !important;
	 box-shadow: 0 1px 0px rgba(255, 255, 255, .8) !important;
	 -webkit-border-radius: 2px;
	 -moz-border-radius: 2px;
	 border-radius: 2px;
	 display:block !important;
	 color: #646464 !important;
	 text-shadow: 0 1px 0px rgba(255, 255, 255, .6) !important;
	 text-align: center;
	 cursor: pointer;
	 position: relative;
	 -webkit-transition: all 0.3s ease !important;
	 -moz-transition: all 0.3s ease !important;
	 -ms-transition: all 0.3s ease !important;
	 -o-transition: all 0.3s ease !important;
	 transition: all 0.3s ease !important;
 }

 .ie8 .icon-btn:hover {
	filter: none !important;
 }

 .icon-btn:hover {
	text-decoration: none !important;
	 border-color: #999 !important;
	 color: #444 !important;
	 text-shadow: 0 1px 0px rgba(255, 255, 255, 1) !important;
	 -webkit-transition: all 0.3s ease !important;
	 -moz-transition: all 0.3s ease !important;
	 -ms-transition: all 0.3s ease !important;
	 -o-transition: all 0.3s ease !important;
	 transition: all 0.3s ease !important;
	 -webkit-box-shadow: 0px 0px 3px rgba(0, 0, 0, .55) !important;
	 -moz-box-shadow: 0px 0px 3px rgba(0,0,0,.55) !important;
	 box-shadow: 0px 0px 3px rgba(0, 0, 0, .55) !important;
 }

 .icon-btn:hover .badge {
	-webkit-transition: all 0.3s ease !important;
	 -moz-transition: all 0.3s ease !important;
	 -ms-transition: all 0.3s ease !important;
	 -o-transition: all 0.3s ease !important;
	 transition: all 0.3s ease !important;
	 -webkit-box-shadow: 0px 0px 4px rgba(0,0,0,.7) !important;
	 -moz-box-shadow: 0px 0px 4px rgba(0,0,0,.7) !important;
	 box-shadow: 0px 0px 4px rgba(0,0,0,.7) !important;
 }

 .icon-btn i {
	font-size: 20px;
	 color: #777 !important;
 }

 .icon-btn div {
	margin-top: 5px;
	 margin-bottom: 20px;
	 font-size: 10px !important;
 }

 .icon-btn .badge {
	position: absolute;
	 font-size: 10px !important;
	 top: -5px;
	 right: -5px;
	 height: 12px;
	 padding: 0px 5px 4px 5px;
	 color: white !important;
	 text-shadow: 0 1px rgba(0, 0, 0, 0.55);
	 border-width: 1px;
	 border-style: solid;
	 -webkit-border-radius: 10px;
	 -moz-border-radius: 10px;
	 border-radius: 10px;
	 -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08), inset 0 1px rgba(255, 255, 255, 0.3);
	 -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08), inset 0 1px rgba(255, 255, 255, 0.3);
	 box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08), inset 0 1px rgba(255, 255, 255, 0.3);
 }

 /* custom dropdown */ .dropdown-menu {
	position: absolute;
	 top: 100%;
	 left: 0;
	 z-index: 1000;
	 display: none;
	 float: left;
	 padding: 0px 0;
	 margin: 2px 0 0;
	 list-style: none;
	 text-shadow: none;
	 background-color: #fcfcfc;
	 border: 4px solid rgba(0, 2, 1, 0.2);
	 -webkit-border-radius: 2px;
	 -moz-border-radius: 2px;
	 border-radius: 2px;
	 -webkit-box-shadow: 0 5px 10px rgba(0, 2, 1, 0.4);
	 -moz-box-shadow: 0 5px 10px rgba(0, 2, 1, 0.4);
	 box-shadow: 0 5px 10px rgba(0, 2, 1, 0.4);
	 -webkit-background-clip: padding-box;
	 -moz-background-clipp: padding;
	 background-clip: padding-box;
	 padding: 0px 0;
	 margin:0px;
	 list-style: none;
	 text-shadow: none;
 }

 .dropdown-menu.opens-left {
	1margin-top: 2px;
	 margin-left: -88px;
 }

 .ie8 .dropdown-menu.opens-left {
	margin-left: -82px;
 }

 .dropdown-menu.extended {
	top:40px;
	 min-width: 160px !important;
	 max-width: 300px !important;
	 width: 233px !important;
 }

 .dropdown-menu.extended li a{
	display: block;
	 padding: 5px 10px !important;
	 clear: both;
	 font-weight: normal;
	 line-height: 20px;
	 white-space: normal !important;
 }

 .dropdown-menu.extended .arrow{
	top:-14px;
	 left: 10px;
	 position: absolute;
	 margin-top: 6px;
	 margin-right: 12px;
	 width: 0;
	 height: 0;
	 border-bottom: 8px solid #f3f3f3;
	 border-left: 8px solid transparent;
	 border-right: 8px solid transparent;
 }

 .dropdown-menu.extended li i{
	margin-right: 3px;
 }

 .dropdown-menu.extended li a{
	padding: 10px !important;
	 background-color: #fafafa !important;
 }

 .dropdown-menu.extended li p{
	padding: 10px;
	 background-color: #eee;
	 margin: 0px;
	 color: #666;
 }

 .dropdown-menu.extended li a{
	padding: 7px 0 5px 0px;
	 list-style: none;
	 border-top: 1px solid white !important;
	 border-bottom: 1px solid #EBEBEB !important;
	 font-size: 12px;
 }

 .dropdown-menu.extended li:first-child a {
	border-top: none;
	 border-bottom: 1px solid #EBEBEB !important;
 }

 .dropdown-menu.extended li:last-child a {
	border-top: 1px solid white !important;
	 border-bottom: 1px solid #EBEBEB !important;
 }

 .dropdown-menu.inbox li a .photo img {
	float: left;
	 height: 40px;
	 width: 40px;
	 margin-right: 4px;
	 -webkit-border-radius: 2px;
	 -moz-border-radius: 2px;
	 border-radius: 2px;
 }

 .dropdown-menu.inbox li a .subject {
	display: block;
 }

 .dropdown-menu.inbox li a .subject .from {
	font-size: 12px;
	 font-weight: bold;
 }

 .dropdown-menu.inbox li a .subject .time {
	font-size: 11px;
	 font-weight: bold;
	 font-style: italic;
	 position: absolute;
	 right: 5px;
 }

 .dropdown-menu.inbox li a .message {
	display: block !important;
	 font-size: 11px;
 }

 /* star rating */ .rating {
	unicode-bidi: bidi-override;
	 direction: rtl;
	 font-size: 30px;
 }

 .rating span.star, .rating span.star {
	font-family: FontAwesome;
	 font-weight: normal;
	 font-style: normal;
	 display: inline-block;
 }

 .rating span.star:hover, .rating span.star:hover {
	cursor: pointer;
 }

 .rating span.star:before, .rating span.star:before {
	content: "\f006";
	 padding-right: 5px;
	 color: #999999;
 }

 .rating span.star:hover:before, .rating span.star:hover:before, .rating span.star:hover ~ span.star:before, .rating span.star:hover ~ span.star:before {
	content: "\f005";
	 color: #e3cf7a;
 }

 /* dashboard report range containers */ .report-range-container {
	display: inline-block;
	 background: #fff;
	 cursor: pointer;
	 padding: 5px 10px;
	 border: 1px solid #ccc;
 }

 .report-range-container .caret {
	margin-top: 8px;
	 margin-left:5px;
 }

 .report-range-container i {
	margin-top: 2px;
	 margin-right: 3px;
 }

 .dashboard-report-range-container span {
	font-weight: normal;
 }

 .dashboard-report-range-container {
	text-shadow:none !important;
	 padding-top: 1px;
	 margin-right: -10px;
	 margin-top: -8px;
	 padding: 8px;
	 cursor: pointer;
	 color: #fff;
	 background-color: #d12610;
 }

 .dashboard-report-range-container i {
	color: #fff;
	 margin-top: 3px;
	 margin-right: 3px;
 }

 .dashboard-report-range-container span {
	font-weight: normal;
 }

 .dashboard-report-range-container .caret {
	border-top-color:#fff !important;
	 margin-top: 8px;
	 margin-left:3px;
	 margin-right: 3px;
 }

 /* adjust uniform components */ .checkbox  div.checker {
	margin-right: 2px !important;
 }

 .uploader {
	margin-top: 2px !important;
 }

 /* item block with details shown on hover */ .item {
	overflow: hidden;
	 display: block;
 }

 .item .details {
	width: 100%;
	 display: none;
	 background-color: #000;
	 color: #fff !important;
	 padding: 5px;
	 text-align: center;
	 position: relative;
	 bottom:30px;
	 margin-bottom:-30px;
	 overflow: hidden;
	 z-index: 6;
 }

 .item:hover .details {
	display: block;
	 opacity: 0.7;
	 filter: alpha(opacity = 70);
 }

 .item:hover .zoom-icon{
	opacity:0.5;
	 filter: alpha(opacity = 50);
 }

 /* zoom icon overlay on images */ .zoom {
	cursor: pointer;
	 width: 100%;
	 height: 100%;
	 position: relative;
	 z-index: 5;
 }

 .zoom .zoom-icon {
	background-image:url("../img/overlay-icon.png");
	 background-color: #222;
	 background-repeat: no-repeat;
	 background-position: 50%;
	 position: absolute;
	 width: inherit;
	 height: inherit;
	 opacity: 0;
	 filter: alpha(opacity = 0);
	 z-index: 6;
	 top:0;
 }

 /* logo page */ #logo {
	width: 247px;
	 margin: 0 auto;
	 margin-top:30px;
	 padding: 15px;
	 text-align: center;
 }

 #login {
	background-image:url("../img/body-bg.png");
	 width: 247px;
	 margin: 0 auto;
	 padding: 20px;
	 -webkit-border-radius: 4px;
	 -moz-border-radius: 4px;
	 border-radius: 4px;
 }

 #login .form-actions {
	padding: 20px;
	 margin-left: -20px;
	 margin-right: -20px;
	 margin-bottom: 0px;
	 -webkit-border-radius: 0px 0px 4px 4px;
	 -moz-border-radius: 0px 0px 4px 4px;
	 border-radius: 0px 0px 4px 4px;
	 margin-bottom: -37px;
 }

 #login i {
	color: #999 !important;
 }

 #login p {
	margin-top: 10px;
	 margin-bottom:10px;
	 padding: 0px;
 }

 #login #forget-password {
	font-size: 11px;
 }

 #login-copyright {
	text-align: center;
	 width: 250px;
	 margin: 0 auto;
	 padding: 10px 10px 0 10px;
	 color: #999;
	 font-size: 11px;
 }

 /* style switcher */ #styler {
	position: absolute;
	 width: 20px;
	 height: 22px;
	 overflow: hidden;
	 top:48px;
	 right: 21px;
	 white-space: nowrap;
	 padding: 5px;
	 padding-left: 10px;
	 padding-top: 5px;
	 background-color: #aaa;
	 z-index: 5;
	 -webkit-border-radius: 4px 0px px 4px;
	 -moz-border-radius: 4px 0px 0px 4px;
	 border-radius: 0px 0px 4px 4px;
 }

 #styler > i {
	font-size: 18px;
	 cursor: pointer;
	 display: inline-block;
	 margin-right: 2px;
	 margin-top: 2px;
 }

 #styler label {
	display: inline-block !important;
 }

 #styler .text {
	margin-right: 2px;
	 font-weight: bold;
	 font-size: 14px;
 }

 #styler .settings {
	display: none;
 }

 #styler .colors {
}

 #styler .checker {
	display: inline-block !important;
	 margin-top:-1px;
 }

 #styler .colors span {
	display: inline-block;
	 width: 20px;
	 height: 20px;
	 margin: 2px 1px -7px 1px;
	 border: 2px solid #ddd;
	 cursor: pointer;
 }

 #styler .layout {
	width: 100px;
	 margin-top: 7px;
	 margin-left: 63px;
	 margin-bottom: 5px;
	 display: block;
 }

 #styler .colors span.active, #styler .colors span:hover {
	border: 2px solid white;
 }

 #styler .colors .color-default {
	background-color: #333438;
 }

 #styler .colors .color-red {
	background-color: #7a2e1c;
 }

 #styler .colors .color-grey {
	background-color: #908f8f;
 }

 #styler .colors .color-navygrey {
	background-color: #44464f;
 }

 #styler .colors .color-blue {
	background-color: #195e7f;
 }

 /**/ .vertical-devider {
	margin: 5px;
	 width:2px;
	 height: 100%;
	 border-left: 1px solid #ddd;
	 border-right: 1px solid #eee;
 }

 .ie8 .knobify {
	display: none;
 }

 .ie8 .circle-stats {
}

 /* Circle stats */ .circle-stats {
	position: relative;
	 margin: 10px 0px 10px 0px;
 }

 .circle-stat {
	padding:2px;
 }

 .circle-stat:hover {
	text-decoration: none !important;
	 border-color: #999 !important;
	 color: #444 !important;
	 text-shadow: 0 1px 0px rgba(255, 255, 255, 1) !important;
	 -webkit-transition: all 0.3s ease !important;
	 -moz-transition: all 0.3s ease !important;
	 -ms-transition: all 0.3s ease !important;
	 -o-transition: all 0.3s ease !important;
	 transition: all 0.3s ease !important;
	 -webkit-box-shadow: 0px 0px 3px rgba(0, 0, 0, .55) !important;
	 -moz-box-shadow: 0px 0px 3px rgba(0,0,0,.55) !important;
	 box-shadow: 0px 0px 3px rgba(0, 0, 0, .55) !important;
 }

 .circle-stat canvas {
}

 .circle-stat:before, .circle-stat:after {
	display: table;
	 line-height: 0;
	 content: "";
 }

 .circle-stat:after {
	clear: both;
 }

 .circle-stat .visual {
	display: block;
	 float: left;
 }

 .circle-stat .details {
	display: block;
	 float: left;
	 margin-left: 5px;
	 padding-top: 7px;
 }

 .circle-stat .details .title {
	margin: 10px 0px 5px 0px !important;
	 padding: 0px !important;
	 font-size: 13px;
	 text-shadow: 0 1px rgba(232, 232, 232, 0.75);
	 color: #777;
 }

 .ie8 .circle-stat .details .title {
	margin-top:5px !important;
 }

 .ie8 .circle-stat .details {
	padding-top: 0px !important;
	 margin-bottom: 5px !important;
 }

 .circle-stat .details .title i {
	margin-top:2px !important;
	 color: #52e136;
	 font-size: 16px;
 }

 .circle-stat .details .title i.down {
	color: #b63625;
 }

 .circle-stat .details .number {
	margin: 0px !important;
	 margin-bottom: 7px !important;
	 font-size: 24px;
	 padding: 0px;
	 font-weight: bold;
	 text-shadow: 0 1px rgba(244, 244, 244, 0.85);
	 color: #999;
 }

 /*map stats*/ .map-stat {
	margin: 20px;
	 display: block;
 }

 .map-stat:before, .map-stat:after {
	display: table;
	 line-height: 0;
	 content: "";
 }

 .map-stat:after {
	clear: both;
 }

 .map-stat .visual {
	width: 70px;
	 height: 60px;
	 margin-right: 5px;
	 display: block;
	 float: left;
 }

 .map-stat .visual i{
	margin-top: 15px;
	 display: block;
	 font-size: 68px;
	 color: #4d4d4d;
 }

 .map-stat .details {
	display: block;
	 float: left;
	 margin-left: 5px;
	 padding-top: 0px;
 }

 .map-stat .details .title {
	margin: 0px 0px 5px 0px !important;
	 padding: 0px !important;
	 font-size: 12px;
	 color: #878787;
 }

 .map-stat .details .title i {
	margin-top:2px !important;
	 color: #52e136;
	 font-size: 16px;
 }

 .map-stat .details .title i.down {
	color: #b63625;
 }

 .map-stat .details .number {
	margin: 0px !important;
	 margin-bottom: 7px !important;
	 font-size: 42px;
	 padding: 0px;
	 font-weight: bold;
	 color: #35d1fe;
 }

 /*scroller padding*/ .scroller {
	padding-right: 10px;
 }

 /*jqvmap changes*/ .jqvmap-zoomin {
	background-color: #666 !important;
 }

 .jqvmap-zoomout {
	background-color: #666 !important;
 }

 .vmaps {
	position: relative;
	 overflow: hidden;
	 height: 300px;
 }

 /* advance tables*/ .table-advance {
	margin-bottom: 10px !important;
 }

 .table-advance thead {
	color: #999;
 }

 .table-advance thead tr th{
	background-color: #DDD;
	 color: #666;
 }

 .table-advance div.success, .table-advance div.info, .table-advance div.important, .table-advance div.warning, .table-advance div.danger {
	position: absolute;
	 margin-top:-5px;
	 float: left;
	 width: 2px;
	 height: 30px;
	 margin-right: 20px !important;
 }

 .table-advance tr td {
	border-left-width: 0px;
 }

 .table-advance tr td:first-child {
	border-left-width: 1px !important;
 }

 .table-advance tr td.highlight:first-child a {
	margin-left: 15px;
 }

 .table-advance td.highlight div.success {
	border-left: 4px solid #66ee66;
 }

 .table-advance td.highlight div.info {
	border-left: 4px solid #87ceeb;
 }

 .table-advance td.highlight div.important {
	border-left: 4px solid #f02c71;
 }

 .table-advance td.highlight div.warning {
	border-left: 4px solid #fdbb39;
 }

 .table-advance td.highlight div.danger {
	border-left: 4px solid #e23e29;
 }

 /*gritter changes*/ .gritter-close {
	left:auto !important;
	 right: 3px !important;
 }

 /* calendar and calendar form */ .external-event {
	display: inline-block !important;
	 cursor:move;
	 margin-bottom: 5px !important;
	 margin-right: 5px !important;
 }

 /* fix full calendar title */ .has-toolbar .fc-header-right {
	padding-right: 50px !important;
 }

 .fc-header-title h2 {
	font-size: 13px !important;
	 line-height: 20px;
	 color: #111;
 }

 .event-form-title {
	margin-top:0px;
	 margin-bottom: 13px;
	 font-size: 13px !important;
	 line-height: 20px;
	 color: #111;
 }

 .fc-event-skin {
	border: 0px !important;
	 background-color: inherit !important;
 }

 .fc-event.label {
	text-shadow:none !important;
	 padding: 4px 4px !important;
 }

 .label-default  {
	background-color: #999 !important;
 }

 /* fix calendar title for ie8 and ie9 */ .ie8 .label-success, .ie9 .label-success {
	background-color: #5fd02c !important;
 }

 .ie8 .label-warning, .ie9 .label-warning {
	background-color: #fcb322 !important;
 }

 .ie8 .label-important, .ie9 .label-important {
	background-color: #ed4e2a !important;
 }

 .ie8 .label-info, .ie9 .label-info {
	background-color: #57b5e3 !important;
 }

 /* hide chosen search box */ .event_priority_chzn .chzn-search {
	display: none !important;
 }

 /********************************************* * PERSONAL STYLES **********************************************/ #MemberChangeSideForm label{
	margin: 0 20px 0 5px;
 }

 #MemberChangeSideForm input{
	margin-top: -3px;
 }

 .stats-overview .title{
	margin-top: 2px;
 }

 .dashboard {
	margin-top: 20px;
 }

 .button-up{
	margin-top: -50px;
 }

 #gritter-notice-wrapper{
	display: none;
 }

 #bannerRotatorParent_81846{
	display: none;
 }

 h5.small{
	margin: 0;
 }

 .progress {
	margin-bottom: 7px;
 }

 .progress-ruby .bar {
	background-color: #9A065C;
	 background-image: -moz-linear-gradient(top,#9A065C,#8C0754);
	 background-image: -webkit-gradient(linear,0 0,0 100%,from(#9A065C),to(#8C0754));
	 background-image: -webkit-linear-gradient(top,#9A065C,#8C0754);
	 background-image: -o-linear-gradient(top,#9A065C,#8C0754);
	 background-image: linear-gradient(to bottom,#9A065C,#8C0754);
	 background-repeat: repeat-x;
	 filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff62c462',endColorstr='#ff57a957',GradientType=0);
 }

 .title-ruby{
	color: #9A065C;
 }

 .progress-esmerald .bar {
	background-color: #439780;
	 background-image: -moz-linear-gradient(top,#439780,#3E8975);
	 background-image: -webkit-gradient(linear,0 0,0 100%,from(#439780),to(#3E8975));
	 background-image: -webkit-linear-gradient(top,#439780,#3E8975);
	 background-image: -o-linear-gradient(top,#439780,#3E8975);
	 background-image: linear-gradient(to bottom,#439780,#3E8975);
	 background-repeat: repeat-x;
	 filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff62c462',endColorstr='#ff57a957',GradientType=0);
 }

 .title-esmerald{
	color: #439780;
 }

 .progress-diamond .bar {
	background-color: #AAA9B4;
	 background-image: -moz-linear-gradient(top,#AAA9B4,#9A99A3);
	 background-image: -webkit-gradient(linear,0 0,0 100%,from(#AAA9B4),to(#9A99A3));
	 background-image: -webkit-linear-gradient(top,#AAA9B4,#9A99A3);
	 background-image: -o-linear-gradient(top,#AAA9B4,#9A99A3);
	 background-image: linear-gradient(to bottom,#AAA9B4,#9A99A3);
	 background-repeat: repeat-x;
	 filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff62c462',endColorstr='#ff57a957',GradientType=0);
 }

 .title-diamond{
	color: #9A99A3;
 }

 .progress-diamond-double .bar {
	background-color: #8F8D9C;
	 background-image: -moz-linear-gradient(top,#8F8D9C,#82808D);
	 background-image: -webkit-gradient(linear,0 0,0 100%,from(#8F8D9C),to(#82808D));
	 background-image: -webkit-linear-gradient(top,#8F8D9C,#82808D);
	 background-image: -o-linear-gradient(top,#8F8D9C,#82808D);
	 background-image: linear-gradient(to bottom,#8F8D9C,#82808D);
	 background-repeat: repeat-x;
	 filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff62c462',endColorstr='#ff57a957',GradientType=0);
 }

 .title-diamond-double{
	color: #82808D;
 }

 .progress-diamond-triple .bar {
	background-color: #747283;
	 background-image: -moz-linear-gradient(top,#747283,#696877);
	 background-image: -webkit-gradient(linear,0 0,0 100%,from(#747283),to(#696877));
	 background-image: -webkit-linear-gradient(top,#747283,#696877);
	 background-image: -o-linear-gradient(top,#747283,#696877);
	 background-image: linear-gradient(to bottom,#747283,#696877);
	 background-repeat: repeat-x;
	 filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff62c462',endColorstr='#ff57a957',GradientType=0);
 }

 .title-diamond-triple{
	color: #747283;
 }

 .progress-global-ambassador .bar {
	background-color: #5E5B6A;
	 background-image: -moz-linear-gradient(top,#5E5B6A,#555360);
	 background-image: -webkit-gradient(linear,0 0,0 100%,from(#5E5B6A),to(#555360));
	 background-image: -webkit-linear-gradient(top,#5E5B6A,#555360);
	 background-image: -o-linear-gradient(top,#5E5B6A,#555360);
	 background-image: linear-gradient(to bottom,#5E5B6A,#555360);
	 background-repeat: repeat-x;
	 filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff62c462',endColorstr='#ff57a957',GradientType=0);
 }

 .title-global-ambassador{
	color: #5E5B6A;
 }

 .progress-partner .bar {
	background-color: #DC9400;
	 background-image: -moz-linear-gradient(top,#DC9400,#C68500);
	 background-image: -webkit-gradient(linear,0 0,0 100%,from(#DC9400),to(#C68500));
	 background-image: -webkit-linear-gradient(top,#DC9400,#C68500);
	 background-image: -o-linear-gradient(top,#DC9400,#C68500);
	 background-image: linear-gradient(to bottom,#DC9400,#C68500);
	 background-repeat: repeat-x;
	 filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff62c462',endColorstr='#ff57a957',GradientType=0);
 }

 .title-partner{
	color: #DC9400;
 }

 .progress-partner-director .bar {
	background-color: #DDAB00;
	 background-image: -moz-linear-gradient(top,#DDAB00,#C89B01);
	 background-image: -webkit-gradient(linear,0 0,0 100%,from(#DDAB00),to(#C89B01));
	 background-image: -webkit-linear-gradient(top,#DDAB00,#C89B01);
	 background-image: -o-linear-gradient(top,#DDAB00,#C89B01);
	 background-image: linear-gradient(to bottom,#DDAB00,#C89B01);
	 background-repeat: repeat-x;
	 filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff62c462',endColorstr='#ff57a957',GradientType=0);
 }

 .title-partner-director{
	color: #DDAB00;
 }

 .progress-partner-president .bar {
	background-color: #FFCA00;
	 background-image: -moz-linear-gradient(top,#FFCA00,#E5B600);
	 background-image: -webkit-gradient(linear,0 0,0 100%,from(#FFCA00),to(#E5B600));
	 background-image: -webkit-linear-gradient(top,#FFCA00,#E5B600);
	 background-image: -o-linear-gradient(top,#FFCA00,#E5B600);
	 background-image: linear-gradient(to bottom,#FFCA00,#E5B600);
	 background-repeat: repeat-x;
	 filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff62c462',endColorstr='#ff57a957',GradientType=0);
 }

 .title-partner-president{
	color: #FFCA00;
 }

 img.full{
	width: 100%;
 }

 #sidebar ul {
	margin-top: 0 !important;
 }


.header-name{
	 padding: 5px 15px;
	 color: #999;
	 line-height: 40px;
	 font-size: 11px;
	 text-transform: uppercase;
}


.radio input[type="radio"], .checkbox input[type="checkbox"] {
	
	margin-left: 0px;
	
	margin-right: 7px;
	

}



div.checker input {
	
	opacity: 1 !important;
	
	filter: alpha(opacity:1);
	

}



.small{
	
	font-size: 10px !important;
	
	line-height: 12px !important;
	
	font-weight: 100 !important;
	

}

