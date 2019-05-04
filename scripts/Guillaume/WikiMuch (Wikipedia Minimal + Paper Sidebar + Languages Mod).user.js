// ==UserScript==
// @name        WikiMuch (Wikipedia Minimal + Paper Sidebar + Languages Mod)
// @namespace   https://greasyfork.org
// @description Lyutria created a nice little mish-mash of the Wikipedia Minimal and the Paper (Sidebar) styles (https://userstyles.org/styles/102164). I tweaked a lot of stuff and added language selection via "Wikipedia rearrange other languages" (https://greasyfork.org/en/scripts/10731).
// @author      Guillaume
// @version     1.7.0
// @icon        https://github.com/ltGuillaume/WikiMuch/raw/master/logo.png
// @run-at      document-start
// @match       *://*.wikipedia.org/w/*
// @match       *://*.wikipedia.org/wiki/*
// @homepageURL https://greasyfork.org/scripts/31127
// @grant       none
// ==/UserScript==

// set your languages here
var myLangs = ['en', 'simple', 'nl', 'de'];

var css = `
@font-face {
	font-family: Roboto;
	font-style: normal;
	font-weight: 300;
	src: local("Roboto Light"), local("Roboto-Light"), url(https://themes.googleusercontent.com/static/fonts/roboto/v10/d-QWLnp4didxos_6urzFtg.woff) format("woff");
}
@font-face {
	font-family: Roboto;
	font-style: normal;
	font-weight: 400;
	src: local("Roboto Regular"), local("Roboto-Regular"), url(https://themes.googleusercontent.com/static/fonts/roboto/v10/grlryt2bdKIyfMSOhzd1eA.woff) format("woff");
}
@font-face {
	font-family: Roboto;
	font-style: normal;
	font-weight: 700;
	src: local("Roboto Bold"), local("Roboto-Bold"), url(https://themes.googleusercontent.com/static/fonts/roboto/v10/vxNK-E6B13CyehuDCmvQvw.woff) format("woff");
}
@font-face {
	font-family: Roboto;
	font-style: italic;
	font-weight: 300;
	src: local("Roboto Light Italic"), local("Roboto-LightItalic"), url(https://themes.googleusercontent.com/static/fonts/roboto/v10/iE8HhaRzdhPxC93dOdA05z8E0i7KZn-EPnyo3HZu7kw.woff) format("woff");
}
@font-face {
	font-family: Roboto;
	font-style: italic;
	font-weight: 400;
	src: local("Roboto Italic"), local("Roboto-Italic"), url(https://themes.googleusercontent.com/static/fonts/roboto/v10/biUEjW7P-lfzIZFXrcy-wQ.woff) format("woff");
}
@font-face {
	font-family: Roboto;
	font-style: italic;
	font-weight: 700;
	src: local("Roboto Bold Italic"), local("Roboto-BoldItalic"), url(https://themes.googleusercontent.com/static/fonts/roboto/v10/owYYXKukxFDFjr0ZO8NXhz8E0i7KZn-EPnyo3HZu7kw.woff) format("woff");
}
@font-face {
	font-family: "Source Code Pro";
	font-style: normal;
	font-weight: 400;
	src: local("Source Code Pro"), local("SourceCodePro-Regular"), url(https://themes.googleusercontent.com/static/fonts/sourcecodepro/v4/mrl8jkM18OlOQN8JLgasDxBHWFfxJXS04xYOz0jw624.woff) format("woff");
}
body {
	font-family: Roboto !important;
	letter-spacing: -.01em;
	background: #fafafa !important;
}
h1, h2, h3, h4, h5, h6 { color: #333 }
h1 {
	border: 0 !important;
	font-family: Roboto !important;
	font-weight: 700 !important;
	font-size: 36px !important;
}
h2 {
	border: 0 !important;
	font-family: Arial !important;
	font-weight: 400 !important;
	font-size: 26px !important;
}
h3 {
	border: 0 !important;
	font-family: Arial !important;
	font-weight: 400 !important;
	font-size: 16px !important;
}
#content h3 {
	font-size: 20px !important;
}
p {
	font-weight: 300 !important;
	line-height: 1.9 !important;
}
table, td, th {
	border: 0 !important;
	border-collapse: collapse !important;
	padding: 5px;
}
ul, li {
	background: transparent !important;
	border: 0 !important;
	line-height: 1.8 !important;
	font-size: 14px !important;
	font-weight: 300 !important;
}
li span {
	background: transparent !important;
	border: 0 !important;
	font-size: 14px !important;
}
.reference, hr { font-size: 9px !important }
dl { font-weight: 300 !important }
dt {
	font-style: italic;
	font-size: 16px !important;
	margin-top: 10px !important;
}
dd { font-size: 15px !important }
code {
	padding: 3px !important;
	background: transparent !important;
	color: #39892f !important;
}
tt {
	font-family: "Source Code Pro", "Lucida Sans Unicode", "Courier New" !important;
	font-size: 16px !important;
}
a, a:link, a:hover, a:visited { color: #067bad !important }
.new, .new:link, .new:visited { color: #cd5b45 !important }
blockquote p {
	font-style: italic !important;
	font-weight: 400 !important;
}
select { padding: 0 10px }
.mw-ui-button, .mw-ui-progressive {
	border-radius: 4px !important;
	border: 1px solid #347bff !important;
	color: #347bff !important;
	background: #fff !important;
	text-shadow: 0 0 0;
}
.mw-ui-button.mw-ui-progressive:hover, .mw-ui-button.mw-ui-progressive:focus, .mw-ui-button.mw-ui-progressive:active, .mw-ui-button:hover, .mw-ui-progressive:hover, .mw-ui-button:focus, .mw-ui-progressive:focus {
	box-shadow: 0 0 0 !important;
	text-shadow: 0 0 0 !important;
	border: 1px solid #347bff !important;
}
#wpSave, #wpPreview, #wpDiff {
	border-radius: 4px !important;
	border: 1px solid #347bff !important;
	color: #347bff !important;
	background: #fff !important;
	text-shadow: 0 0 0;
	padding: .5em 1em;
	cursor: pointer;
}
#wpSave:hover, #wpPreview:hover, #wpDiff:hover { color: rgba(52, 123, 255, .5) !important }
#p-personal, #ca-view, #ca-edit, #ca-talk { display: none }
#right-navigation { margin-top: .5em }
/* Search */
#simpleSearch {
	border: 1px solid rgba(0, 0, 0, .25) !important;
	background: transparent !important;
	color: #000 !important;
	border-radius: 5px !important;
	padding: 0 !important;
	height: 1.75em !important;
}
#searchInput {
	border: 0 !important;
	background: transparent !important;
	font-family: Roboto !important;
	padding: 4px 7px 7px 7px !important;
}
#searchButton { right: 7px !important }
.mw-ui-input {
	font-family: Roboto !important;
	border: 1px solid #347bff !important;
	color: #000 !important;
	background: #fff !important;
	font-size: 16px !important;
}
.mw-ui-input:focus { box-shadow: 0 0 0 !important }
.suggestions {
	font-weight: 300 !important;
	font-size: 15px !important;
	max-width: 300px !important;
	margin-top: 15px !important;
	border: 0 !important;
	box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, .5);
}
.suggestions-results { border: 0 !important }
.suggestions-result { padding: 10px !important }
.suggestions-result-current { background-color: #067bad }
.imeselector, #searchEngines, #ca-nstab-special { display: none !important }
.mw-search-formheader {
	border: 0 !important;
	background: transparent !important;
}
.mw-search-result-heading, .searchresult, .searchmatch {
	font-size: 14px !important;
	font-weight: 400 !important;
	padding: 3px 0 !important;
}
.searchmatch { font-weight: 700 !important }
.mw-search-result-data, .mw-search-createlink { display: none }
#mw-page-base, .vectorTabs {
	background: transparent !important;
	border: 0 !important;
}
#content {
	border: 0 !important;
	margin-left: 255px !important;
}
.portal { background: transparent !important }
.uls-settings-trigger { display: none !important }
#left-navigation { margin-left: 33px !important }
#ca-nstab-main { display: none }
pre {
	font-family: "Source Code Pro", "Lucida Sans Unicode", "Couriew New", "Arial" !important;
	border: 1px solid #eee !important;
	background: 0 !important;
}
.mw-code {
	border: 1px solid #eee !important;
	padding: 17px !important;
	background: 0 !important;
}
.thumbinner, .thumb, .toccolours, .graytable {
	background: transparent !important;
	border: 0 !important;
}
.thumbimage { border: 0 !important }
.thumbcaption {
	font-style: italic !important;
	margin: 7px 0 !important;
}
.thumbimage:hover { opacity: .85 !important }
.dablink {
	margin: 14px 0 !important;
	font-weight: 300 !important;
	font-size: 18px !important;
}
#siteSub, .flaggedrevs_preview { display: none !important }
.ambox, .tmbox, .Note, .informationbox {
	margin: 5px 0 !important;
	background: #f9f9f9 !important;
	line-height: 1.5 !important;
	border: 1px dashed #aaa !important;
	max-width: 80% !important;
	font-weight: 300 !important;
}
.ambox td, .tmbox td { padding: 10px !important }
.ambox-text-small, .mbox-text, .Note td {
	font-weight: 300 !important;
	color: #000 !important;
}
.ambox-image, .mbox-image { display: none }
#request_for_deletion, .ambox-serious {
	background: rgba(255, 0, 0, .1) !important;
	border: 1px dashed rgba(255, 0, 0, .15) !important;
	color: #a00000 !important;
}
.tmbox-notice, .tmbox-move, .Note {
	background: rgba(150, 75, 0, .1) !important;
	border: 1px dashed rgba(150, 75, 0, .15) !important;
}
.informationbox {
	background: #fff !important;
	padding: 10px !important;
	font-size: 14px !important;
}
.editOptions {
	background: #fff !important;
	border: 0 !important;
}
.catlinks {
	background: transparent !important;
	border: 1px dashed #aaa !important;
	font-size: 16px !important;
}
table:not(.navbox-subgroup):not(.ambox), .infobox, .mbox-small, .navbox, .quotebox, .referencetooltip li, .thumb, .toccolours {
	border: 1px solid #eee !important;
	background: #f9f9f9 !important;
	border-collapse: collapse !important;
	color: #333;
}
.mwe-popups { background: #f9f9f9 !important }
.mwe-popups-extract[dir="ltr"]:after { background-image: linear-gradient(to right, rgba(249,249,249,0), #f9f9f9 50%) !important }
.mwe-popups-extract[dir="rtl"]:after { background-image: linear-gradient(to left, rgba(249,249,249,0),#f9f9f9 50%) !important }
.infobox td, .infobox th, .tright td, .tright th, .toccolours td, .toccolours th {
	padding: 5px !important;
	background: transparent !important;
	font-weight: 400 !important;
	border-bottom: 1px dashed #eee !important;
}
div.NavContent.hlist { border-color: #067bad !important }
.image img:hover { opacity: .9 !important }
.globegris { background: transparent !important }
.mw-editsection-bracket, .references-small b, .mw-cite-backlink, .plainlinksneverexpand { display: none !important }
#floating_object { display: none }
table th, .navbox th, .navbox-title, .navbox-abovebelow { background-color: #e7e7e7 !important }
.navbox td, .navbox th, .nowraplinks td, .nowraplinks th { 
	font-size: 14px !important;
	font-weight: 300 !important;
}
.NavFrame {
	border: 0 !important;
	background: transparent !important;
	padding: 0 !important;
}
.NavHead {
	margin: 10px 0 !important;
	padding: 12px !important;
	font-size: 16px !important;
	font-weight: 700 !important;
	background: transparent !important;
}
.Boxmerge { border: 0 !important }
#coordinates { display: none !important }
#siteNotice, #centralNotice, #localNotice, #mw-fr-revisiontag, #mw-fr-reviewnotice { display: none !important }
sub, sup { line-height: .1em /* prevents sub/superscripts from throwing off line spacing */ }
/* title */
#firstHeading { padding: 10px 0 0 0 !important }
@media all and (max-width: 1000px) { #firstHeading { padding-top: 40px !important } }
div.hatnote { padding-left: 0 }
#column-one, #footer { display: none !important }
/* hide left and top panel */
#mw-panel {
	width: 0 !important;
	height: 0 !important;
}
#mw-head {
	height: 0;
	opacity: .5;
	border: 0 !important;
	width: calc(100% - 240px) !important;
	-webkit-transition-property: opacity !important;
	-moz-transition-property: opacity !important;
	-o-transition-property: opacity !important;
	-ms-transition-property: opacity !important;
	transition-property: opacity !important;
	-webkit-transition-duration: .5s !important;
	-moz-transition-duration: .5s !important;
	-o-transition-duration: .5s !important;
	-ms-transition-duration: .5s !important;
	transition-duration: .25s !important;
}
#mw-head:hover { opacity: 1 !important }
#mw-panel :not(#p-lang) {
	display: none !important;
	background-image: none !important;
	padding: .2em;
}
#mw-panel > #p-lang > div.body {
	position: fixed !important;
	left: 0;
	bottom: 0;
	width: 230px;
 height: 0 !important;
	margin-left: 0;
	background: #f1f1f1 !important;
}
#mw-panel > #p-lang > div.body, #mw-panel > #p-lang > div.body *:not(.after-portlet) { display: block !important }
li.interlanguage-link {
	padding-left: .9em !important;
	font-size: 14px !important;
	line-height: 1 !important;
}
.noprint { display: none!important }
#panel, #head, #page-base { display: none !important }
#content.mw-body {
	margin: 0;
	border: none !important;
	border-radius: 2px !important;
	padding: 0 1.6em 2em 1em !important;
	background: none;
	color: #333;
}
.wikitable {
	border: 1px solid #eee !important;
	background: #f9f9f9 !important;
	font-weight: 300 !important;
	font-size: .85em !important;
}
.wikitable td, .wikitable th { border: 1px solid #eee !important }
.mw-body-content p { margin-left: 1px !important }
.mw-body .mw-indicators { padding-top: 5em }
/* table of contents */
#toc {
	border: none !important;
	font-size: 12px !important;
	font-weight: 400;
/* make sidebar */
	position: fixed !important;
	display: inline-block !important;
	top: 0;
	bottom: 0;
	left: 0;
	width: 240px;
	overflow: auto;
	background: #f1f1f1 center center scroll !important;
}
#toc > ul {
	overflow-y: auto !important;
	width: 100%;
	height: auto;
	 margin: 0;
	background: #ededed;
	vertical-align: middle !important;
	display: table-cell;
	display: inline-block !important;
}
.toc ul ul { margin-left: 1em !important }
.toc a {
	display: block;
	padding: .25em 1em;
	line-height: 1.25 !important;
}
/* toc headers */
.toclevel-1 > a > .toctext {
	font-weight: 600;
	text-transform: uppercase;
	padding-top: .25em;
	display: inline-block;
}
.tocnumber { display: none !important }
.toc h2 { display: none !important }
div.toctitle { text-decoration: none !important }
.toctogglespan { display: none !important }
.editsection, .mw-editsection, .plainlinks.hlist.navbar { display: none !important }
#toc a:link {
	color: #666 !important;
	text-decoration: none !important;
}
#toc a:visited { color: #888 !important }
#toc a:hover {
	color: #333 !important;
	text-decoration: none !important;
	background: rgba(0, 0, 0, .05);
}
#toc a:active {
	color: #222 !important;
	outline: none;
}
/* hide protected lock */
div#protected-icon { display: none !important }
`;

var cssBlock = document.createElement('style');
cssBlock.innerHTML = css;
var heads = document.getElementsByTagName('head');
if (heads.length > 0)
	heads[0].appendChild(cssBlock);
else
	document.documentElement.appendChild(cssBlock);

document.addEventListener('DOMContentLoaded', function() {
	var tabs = document.getElementById('p-views').getElementsByTagName('ul')[0];
	var talk = document.getElementById('ca-talk');
	tabs.appendChild(talk);
	talk.style.display = 'block';

	var foundcount = 0;
	var plang = window.document.querySelector('div#p-lang');
	if (plang != null) {
		var langs = plang.querySelectorAll('div > ul > li');
		var first = langs[0];
		if (first != null) {
			var ul = first.parentNode;
			var found = [];
			for (var i = 0; i < langs.length; i++) {
				var lncn = langs[i].className;
				var l1 = lncn.replace(/^.*interwiki-(\S+).*$/, '$1');
				var ln = myLangs.indexOf(l1);
				if (ln > -1)
					found[ln] = langs[i];
			}
			for (var i = found.length - 1; i >= 0; i--){
				if (found[i]) {
					ul.insertBefore(found[i], first);
					first = found[i];
					foundcount++;
				}
			}
		}
		if (foundcount == 0) { 
			plang.parentNode.removeChild(plang);
		} else if (first != null) {
			while(ul.children.length > foundcount)
				ul.removeChild(ul.children[foundcount]);
		}
	}
	document.querySelector('#mw-panel > #p-lang > div.body').setAttribute('style', 'height: auto !important');
	document.querySelector('#toc > ul').setAttribute('style', 'margin: 0 0 '+ (6 + 25.2 * foundcount) +'px 0 !important');
});
