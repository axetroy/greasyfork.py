// ==UserScript==
// @name        Import/Export Steam Ignore List
// @language    English
// @namespace   https://greasyfork.org/users/2205
// @description Imports/Exports Steam Ignore List
// @include     https://store.steampowered.com/account/notinterested/*
// @include     http://store.steampowered.com/account/notinterested/*
// @version     1.3
// @grant       none
// ==/UserScript==

var RateLimiterPost = function(url, postParams, successCallback, failCallback) {
  var Rate=30; //ms between requests;
    var lastCall=localStorage.getItem ('IESIIRateLimiter');
    if (lastCall!=null) {
      if ((parseInt(lastCall) + Rate) > Date.now()) {
        window.setTimeout(function(){
          RateLimiterPost(url, postParams, successCallback, failCallback);
        },parseInt(lastCall)+Rate-Date.now());
      } else { //already time
        $J.post(url, postParams, successCallback).fail(failCallback);
        localStorage.setItem('IESIIRateLimiter',Date.now());
      }
    }  else { //first call ever
      $J.post(url, postParams, successCallback).fail(failCallback);
      localStorage.setItem('IESIIRateLimiter',Date.now());
    }
};


var anchor = document.getElementsByClassName("ignoredapps")[0];
var workingDialog;
//Export
var ExportBtn=document.createElement("div");
ExportBtn.setAttribute("class","btn_darkblue_white_innerfade btn_medium");
ExportBtn.setAttribute("style","margin-right: 5px !important;");
ExportBtn.appendChild(document.createElement("span"));
ExportBtn.firstChild.appendChild(document.createTextNode("Export"));
var newExportBtn=anchor.parentElement.insertBefore(ExportBtn,anchor);
newExportBtn.addEventListener("click",function(){
$J.get("/dynamicstore/userdata/", {t: new Date().getTime()}, function(data) {
  var strdata="";
  for (var item in data.rgIgnoredApps) {
      strdata+=item.toString()+",<br />";
  }
  strdata=strdata.substr(0,strdata.length-7); //remove comma and br after last entry
  var exportDialog=ShowAlertDialog("Ignore List", '<div class="bb_code">'+strdata+'</div>', "OK");

},"json").fail(function() {
ShowAlertDialog("Export Error","There was an error retrieving ignore list","OK");
});
});

//Import
var ImportBtn=document.createElement("div");
ImportBtn.setAttribute("class","btn_darkblue_white_innerfade btn_medium");
ImportBtn.setAttribute("style","margin-right: 5px !important;");
ImportBtn.appendChild(document.createElement("span"));
ImportBtn.firstChild.appendChild(document.createTextNode("Import"));
var newImportBtn=anchor.parentElement.insertBefore(ImportBtn,anchor);
var successfull=0;
var failed=0;
var totalitems;
newImportBtn.addEventListener("click",function(){
  var importDialog=ShowPromptWithTextAreaDialog( "Import Ignore List", "", "OK", "Cancel", 32765 ).done( function(newIgnoreListText){
   if (/^[0-9]+(,\s*[0-9]+)*$/.test(newIgnoreListText)) {
     var IgnoreListTextItems=newIgnoreListText.split(",");
     successfull=0;
     failed=0;
     totalitems=IgnoreListTextItems.length;
     workingDialog = ShowBlockingWaitDialog( 'Import Ingnore List', 'Please wait, ' + totalitems +' entries left' );
     for (var i=0; i<totalitems;i++){
       var ignoreitem=parseInt(IgnoreListTextItems[i].trim());
       if (ignoreitem===0){
         continue; //Dunno why this can even happen, but still
       }
       RateLimiterPost('/recommended/ignorerecommendation/', {
         sessionid: g_sessionID,
	       appid: ignoreitem,
	       add: 1
         }, function() {
               successfull++;
                if ((successfull+failed)===totalitems) {
                  workingDialog.Dismiss();
                  ShowAlertDialog( "Import", "Import Finished.<br />Press \"OK\" to reload page.", "OK" ).done(function(){
                      window.location.reload();
                    });
                } else {
                    workingDialog.Dismiss();
                    workingDialog = ShowBlockingWaitDialog( 'Import Ingnore List', 'Please wait, ' + (totalitems-successfull-failed) +' entries left' );
                }
            }, function() {
               failed++;
                if ((successfull+failed)===totalitems) {
                  workingDialog.Dismiss();
                  ShowAlertDialog( "Import", "Import Finished.<br />Press \"OK\" to reload page.", "OK" ).done(function(){
                      window.location.reload();
                    });
                } else {
                    workingDialog.Dismiss();
                    workingDialog = ShowBlockingWaitDialog( 'Import Ingnore List', 'Please wait, ' + (totalitems-successfull-failed) +' entries left' );
                }
            });
     }
   } else {
     ShowAlertDialog( "Import Error", "Wrong list syntax!", "OK" );
   }
  });
});

//Clear
var ClearBtn=document.createElement("div");
ClearBtn.setAttribute("class","btn_darkblue_white_innerfade btn_medium");
ClearBtn.setAttribute("style","margin-right: 5px !important;");
ClearBtn.appendChild(document.createElement("span"));
ClearBtn.firstChild.appendChild(document.createTextNode("Clear"));
var newClearBtn=anchor.parentElement.insertBefore(ClearBtn,anchor);
newClearBtn.addEventListener("click",function(){
  ShowConfirmDialog( "Clear Ignore List", "Are you sure you want to clear ignore list?", "Yes", "No").done(function(){
  $J.get("/dynamicstore/userdata/", {t: new Date().getTime()}, function(data) {
     successfull=0;
     failed=0;
     var totalitems=0;
     for (var dummy in data.rgIgnoredApps) { //that's dumb, I know.
         totalitems++;
     }
     workingDialog = ShowBlockingWaitDialog( 'Clear Ingnore List', 'Please wait, ' + totalitems +' entries left' );
     //for (var j=0;j<totalitems;j++){
     for (var item in data.rgIgnoredApps) {
       RateLimiterPost('/recommended/ignorerecommendation/', {sessionid: g_sessionID,
                //appid: data.rgIgnoredApps[j],
                appid: item,
                remove: 1}, function () {
         successfull++;
         totalitems--;
         if (totalitems===0) {
                  if (failed>0){
                    workingDialog.Dismiss();
                    ShowAlertDialog( "Clear", "Cleanup finished, unable to remove "+failed+" items.<br />Press \"OK\" to reload page.", "OK" ).done(function(){
                      window.location.reload();
                    });
                  } else {
                    workingDialog.Dismiss();
                    ShowAlertDialog( "Clear", "Ignore list cleared successfuly<br />Press \"OK\" to reload page.", "OK" ).done(function(){
                      window.location.reload();
                    });
                  }
                } else {
                    workingDialog.Dismiss();
                    workingDialog = ShowBlockingWaitDialog( 'Clear Ingnore List', 'Please wait, ' + totalitems +' entries left' );
                }
       }, function(){
        failed++;
        totalitems--;
               if (totalitems===0) {
                    workingDialog.Dismiss();
                    ShowAlertDialog( "Clear", "Cleanup finished, unable to remove "+failed+" items.<br />Press \"OK\" to reload page.", "OK" ).done(function(){
                      window.location.reload();
                    });

                } else {
                    workingDialog.Dismiss();
                    workingDialog = ShowBlockingWaitDialog( 'Clear Ingnore List', 'Please wait, ' + totalitems +' entries left' );
                }
       });
     }
},"json").fail(function() {
ShowAlertDialog("Clean Error","There was an error retrieving ignore list","OK");
});

  });
});