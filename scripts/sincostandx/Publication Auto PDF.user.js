// ==UserScript==
// @name    Publication Auto PDF
// @version 0.1.0
// @author  sincostandx
// @description Automatically jumps to PDF when you visit a journal article abstract page. Also includes a utility to copy DOI and title.
// @include http://www.sciencedirect.com/science/article/*
// @include https://www.sciencedirect.com/science/article/*
// @include https://pubs.acs.org/doi/abs/*
// @include http://pubs.acs.org/doi/abs/*
// @include https://pubs.acs.org/doi/10*
// @include http://pubs.acs.org/doi/10*
// @include https://pubs.acs.org/doi/full*
// @include http://pubs.acs.org/doi/full*
// @include http://www.tandfonline.com/doi/abs/*
// @include https://www.beilstein-journals.org/*
// @include http://onlinelibrary.wiley.com/doi/*
// @include https://onlinelibrary.wiley.com/doi/*
// @include http://www.eurekaselect.com/*/article*
// @include http://pubs.rsc.org/en/Content/*
// @include https://pubs.rsc.org/en/Content/*
// @include https://link.springer.com/article*
// @include http://aip.scitation.org/doi/10*
// @include https://www.nature.com/articles*
// @include http://science.sciencemag.org/content*
// @exclude *.pdf
// @run-at  document-start
// @namespace https://greasyfork.org/users/171198
// ==/UserScript==

var tit=null;
var doi=null;
var pdf=null;

if (location.href.includes('/abs/'))
  pdf=location.href.replace('/abs/','/pdf/'); // Works for ACS journals

var jump = window.history.length<=1 || sessionStorage.getItem(window.location.pathname) === null;
sessionStorage.setItem(window.location.pathname,'1');

if (jump && pdf !== null && location.href !== pdf) {
  window.stop();
  location.href=pdf;
} else {
  checkLoaded();
}

function checkLoaded() {
  if (document.body !== null && document.body.innerHTML.length !== 0)
    loadMeta();
  else
    setTimeout(checkLoaded,100);
}

function loadMeta() {
  var titmeta=['dc.title','citation_title'];
  var doimeta=['citation_doi','dc.identifier','dc.source'];
  var l=document.getElementsByTagName('meta');
  for(var i=0; i<l.length; ++i) {
    var n=l[i].getAttribute("name");
    if (n===null)
      continue;
  	n=n.toLowerCase();
    if (tit===null && titmeta.includes(n)) {
      tit = l[i].getAttribute("content");
      continue;
    }
    if (doi===null && doimeta.includes(n)) {
      var d = l[i].getAttribute("content");
      if (d.includes('10.')) {
        if (d.includes('doi')) {
          doi=d.slice(d.indexOf('10.'));
        } else {
          doi=d;
        }
        continue;
      }
    }
    if (pdf===null && n === 'citation_pdf_url')
      pdf = l[i].getAttribute("content");
  }
  if (jump && pdf !== null && location.href !== pdf) {
    window.stop();
    location.href=pdf;
  } else {
    if (doi===null && tit===null && pdf===null) return;
    if (doi===null) doi='Unknown DOI';
    if (tit===null) tit='Unknown Title';
    doiWindow(tit,doi,pdf);
  }
}

function doiWindow(tit,doi,pdf) {
  var div = document.createElement('div');
  div.style='z-index:2147483647;position:fixed;right:10px;top:50%;transform: translate(0, -50%);overflow:hidden;border:2px groove black;background:white';
  div.innerHTML = '<input type="text" id="txt_doi"><br><input type="button" value="Copy" onclick="document.getElementById(\'txt_doi\').select();document.execCommand(\'Copy\');"><br><br><input type="text" id="txt_info"><br><input type="button" value="Copy" onclick="document.getElementById(\'txt_info\').select();document.execCommand(\'Copy\');"><br><br><a id="pdf_link">PDF</a><br><br>';
	document.body.appendChild(div);
  document.getElementById("txt_info").value=tit+'\t'+doi;
  document.getElementById("txt_doi").value=doi;
  if (pdf!==null) document.getElementById("pdf_link").href=pdf;
}