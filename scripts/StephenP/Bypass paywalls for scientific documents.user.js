// ==UserScript==
// @name         Bypass paywalls for scientific documents
// @namespace    StephenP
// @version      3.3.1
// @description  Bypass paywalls for scientific documents by downloading them from sci-hub instead of paying something like 50 bucks for each paper. This script adds download buttons on Google Scholar, Scopus and Web Of Science, which lead to sci-hub.tw. In this way you can get free access to scientific papers even if you (or your university) can't afford their prices.
// @author       StephenP
// @include      http://scholar.google.*/scholar?*
// @match        http://www.scopus.com/record/display.uri?*
// @match        http://apps.webofknowledge.com/full_record.do?*
// @match        http://apps.webofknowledge.com/InterService.do?*
// @match        http://apps.webofknowledge.com/CitedFullRecord.do?*
// @include      https://scholar.google.*/scholar?*
// @match        https://www.scopus.com/record/display.uri?*
// @match        https://apps.webofknowledge.com/full_record.do?*
// @match        https://apps.webofknowledge.com/InterService.do?*
// @match        https://apps.webofknowledge.com/CitedFullRecord.do?*
// @match        *://*.sci-hub.tw/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //If Sci-Hub address changes, just replace the URL below with the new one
    var sciHubUrl='https://sci-hub.tw/';
    var documentId;
    var site=window.location.href.toString();
    var i;
    if(site.includes("://www.scopus.com/")){
        var fullDocument=document.querySelector('[title="Full Text(opens in a new window)"]');
        //fullDocument.href=fullDocument.href.slice(54);
        documentId=document.getElementById("recordDOI").innerHTML;
        var section=document.getElementById("outwardLinks");
        section.removeChild(section.lastChild);
        fullDocument.parentNode.insertAdjacentHTML('beforeend','<a><img class="outwardLink" src="data:image/gif;base64, R0lGODlhZQAPAKU2AGZmZghapZmZmYD//8rKyunr6enq6urr6erq6uzt7Ozt7e3t7O3t7e3u7e3u7u7u7e7u7u/v8O/w7+/w8PDw7/Ly8vLz8vLz8/Py8vPz8vPz8/P09PT08/T09PX19vX29fX29vb19fb29ff39/f49/j4+Pj5+Pj5+fn4+Pn4+fn5+Pn5+fn6+vr6+fr6+v39/f39/v3+/f3+/v79/f7+/f7+/v///////////////////////////////////////yH5BAEKAD8ALAAAAABlAA8AAAb+wJ9gSCwaj8ikcslsOpNCm3RKrVqv2Kx2y+1eawCBDfaKyV4vckydLrNj7XX5HGer1fR7uY5H6+F/fXV7fzEEYTYuLIsujYyMiiyRkI+QkZeXi5KOkpSbmo2Zn52km6KNAQGXh2KpJionJ66uJyUrJrYmt7W3ubC8uLu5Jam/wyupySW+scQBucCutqnNvcKpuSasNiSpI9+pJCQj4+Xl5Oji6N/m6eTdAd/p8OgB6uPs7+7w6t7z6eHebfOQ6kOIVCI+FAxBMJnCAAxTeRCRKgTDhA0dJqs48UPDix4nbmzYEWRBkRAPBvDIcWMAD9s6pOogM8CGmjRn1twwMxn+zwA0O9wUmhMozqBDXQbVWZQozZsudUo1OvPnNgsZUmlIlcFCKgtbXWYN4NXrWA0asFrAunHtV7Rq2bb1Shbu17Ffv8pFq1crXbnbIkTYKFhCKsMBIkgoPDiZ4cGLBStuLDjA4sOSJ2tO1VhCZMqaFWMGjZkz6QDbHEDYqNpBKtWvYUNw/TrZAwizZ7/W7YD27dy9A7SOneo37dbAY68OgJs48+PLtylIkCDZ9OoBqCtwST1V91QLtGvnPj1ZguvbN54vbz3V9fPf4XvHrj69+W0IDhQwcOBA/gL/+adfgAUICKB+/BkY4H//Jcigfgo22N+DBVIooYIQUmjANgQndOjhhyCGKOKIJJZo4okoigjADwC06OKLMMYo44w01mjjjTjO+EMQADs=" alt="Download from Sci-Hub" title="Full Text(opens in a new window)" height="15" width="101"></a><a style="font-size: 12px; color: green; text-decoration: underline;" href="javascript:;">Donate to Sci-Hub project</a><span class="divider">|</span>');
        fullDocument.parentNode.children[4].addEventListener("click", function(){window.open(sciHubUrl+documentId);});
        fullDocument.parentNode.children[4].style.cursor="pointer";
        //setAttribute('onclick','window.open(\"'+sciHubUrl+documentId+'\");');
        fullDocument.parentNode.children[5].addEventListener("click", function(){donate(sciHubUrl);});
        fullDocument.parentNode.children[5].style.cursor="pointer";
        //setAttribute('onclick',donate(sciHubUrl));
    }
    else if(site.includes("://apps.webofknowledge.com/")){
        var mode;
        var genericID=document.getElementsByClassName("block-record-info block-record-info-source")[0].getElementsByClassName("FR_label");
      	for(i=0;i<=genericID.length;i++){
          if((genericID[i].innerHTML==="DOI:")||(genericID[i].innerHTML==="PMID:")){
            documentId=genericID[i].parentNode.children[1].innerHTML;
            alert(documentId);
            break;
          }
        }
        if(documentId!==undefined){
            addButtonWOS(sciHubUrl,documentId);
        }
    }
    else if(site.includes("://scholar.google.")){
        var resourcesList=document.getElementById('gs_res_ccl_mid');
        var results=resourcesList.children.length;
        var gs_ggs_gs_fl;
        for(i=0;i<results;i++){
            try{
                if(resourcesList.children[i].getElementsByClassName("gs_ggs gs_fl").length==0){
                    gs_ggs_gs_fl=document.createElement("div");
                    gs_ggs_gs_fl.setAttribute("class","gs_ggs gs_fl");
                    resourcesList.children[i].insertBefore(gs_ggs_gs_fl,resourcesList.children[i].firstChild);
                    addButtonScholar(sciHubUrl,resourcesList.children[i].firstChild);
                }
                else{
                    addButtonScholar(sciHubUrl,resourcesList.children[i].firstChild);
                }
            }
            catch(err){
                console.error(err+"//"+resourcesList.children[i].lastElementChild.innerHTML);
            }
        }
    }
    else if(site.includes("://sci-hub.")){
        var sPDFLink = document.getElementById("reload").parentNode.children[1].children[0].getAttribute("onClick");
        sPDFLink=sPDFLink.substring(15,sPDFLink.length-1);
        window.open(sPDFLink,"_blank");
        window.close();
    }
})();
function addButtonWOS(sciHubUrl,documentId){
    try{
        var site=window.location.href.toString();
        var sciHubBtn=document.createElement("DIV");
        var list=document.getElementsByClassName("l-columns-item")[0];
        sciHubBtn.setAttribute("alt","Break the walls and free the knowledge that publishers taken hostage\!");
        sciHubBtn.setAttribute("title","Break the walls and free the knowledge that publishers taken hostage\!");
        sciHubBtn.setAttribute("class","small-button secondary-button");
        sciHubBtn.innerHTML="Full Text from Sci-Hub";
        sciHubBtn.addEventListener("click", function(){window.open(sciHubUrl+documentId);});
        sciHubBtn.style.cursor="pointer";
        list.insertAdjacentHTML('beforeend','<li><a style="font-size: 12px; color: green; text-decoration: underline;" href="javascript:;">Donate to Sci-Hub project</a></li>');
        list.lastChild.lastChild.removeAttribute("href");
        list.lastChild.lastChild.addEventListener("click", function(){donate(sciHubUrl);});
        list.lastChild.lastChild.style.cursor="pointer";
        list.insertBefore(sciHubBtn,list.lastChild);
    }
    catch(err){
        console.log(err);
    }
    //setAttribute('onclick',donate(sciHubUrl));
}
function addButtonScholar(sciHubUrl,linkDiv){
    var link=linkDiv.getElementsByClassName("gs_or_ggsm")[0].lastChild.href;
  //alert(link);
    var creatingElement;
    if((link!=undefined)&&(link.search("patents.google")==-1)){
        creatingElement=document.createElement("div");
        creatingElement.setAttribute("class","gs_ggsd");
        creatingElement.innerHTML='<a>Full Text on Sci-Hub</a>';
        linkDiv.appendChild(creatingElement);
        linkDiv.lastChild.addEventListener("click", function(){window.open(sciHubUrl+link);});
        linkDiv.lastChild.style.cursor="pointer";
        //setAttribute("onclick",'window.open(\"'+sciHubUrl+link+'\");');
    }
}
function donate(sciHubUrl){
    window.open(sciHubUrl+'#donate');
}