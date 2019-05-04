// ==UserScript==
// @name                LiveMap UR Overlay
// @namespace           http://greasemonkey.chizzum.com
// @description         Overlays UR, MP and PU markers onto Livemap
// @include             https://*.waze.com/*livemap*
// @include             http://*.waze.com/*livemap*
// @grant               none
// @version             2.29
// ==/UserScript==

/*
To-do list:

- WME links in popup
- display UR comments
- store marker data in separate arrays for each request area.

*/

/* JSHint Directives */
/* globals W: true */
/* globals L: true */
/* jshint bitwise: false */
/* jshint eqnull: true */
/* jshint esversion: 6 */

var lmurVersion = '2.29';

var lmurShowDebugOutput = false;
var lmurShowTraceOutput = false;

var lmurClearStartupCrud = true;

var lmurMarkers = [];
var lmurCachedURs = [];
var lmurCachedMPs = [];
var lmurCachedPURs = [];
var lmurCachesToRender = [];
var lmurDownloadRequests = [];

var lmurRateLimiter = 1;
var lmurUpdateURL = '';
var lmurDoOnload = true;
var lmurDragBar = null;
var lmurWindow = null;
var lmurDiv = null;
var lmurPopup = null;
var lmurUI = null;
var lmurUserName = '';
var lmurUserID = null;
var lmurIsLoggedIn;

var lmurPrevCentre = null;
var lmurInhibitNudgeDetection = true;
var lmurControlsHidden = true;
var lmurControlsEnabled = false;
var lmurPlayModeEnabled = false;
var lmurInhibitSave = true;
var lmurInnerHeight = -1;
var lmurUIHeight = 0;
var lmurCacheExpiryPeriod = 300;
var lmurInhibitCacheRefresh = false;
var lmurNoForcedRefreshThisCycle = true;
var lmurEnabled = false;
var lmurXHRIsBusy = false;
var lmurControlsMinimised =
[
   false, false, false, false, false
];
var lmurControlsID =
[
   'lmurURCtrls', 'lmurMPCtrls', 'lmurPURCtrls', 'lmurNativeMarkerCtrls', 'lmurOptions'
];
var lmurControlsImg =
[
   '_minimaxURCtrls', '_minimaxMPCtrls', '_minimaxPURCtrls', '_minimaxNativeMarkerCtrls', '_minimaxLMURCtrls'
];

var lmurSquareSize = 0.2;
var lmurMaxGrabWidth = 1.0;
var lmurMaxGrabHeight = 1.0;

var lmurGetCommentsList = [];
var lmurURLPrefix = '';

var lmurIcons =
[
   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wMBAsgGGkHX7cAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAUUlEQVQoz63SQQqAQAxD0R/xXoIXH/RicaUgtIOdscuE8DaVbaq3ZIWaXB6VJTWZE7TH2j/SrQCwxdq89FLItTkpVBJtXOoqgbY+4fFd0sjDXtyHHG22yaK0AAAAAElFTkSuQmCC',
   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wMBAshHpl/y8MAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAXUlEQVQoz63SQQqAMAxE0T/Fe0k9uNKTjQtBpLZSowOBQBjeJrLN20wA2jTcdLZkGy0y80CjgFcrwbFQxgoAiUDO0qN2Ub5LXa1S/pFuWkMJS9huDhn3biFJkYfdAYUjUx2jRgIlAAAAAElFTkSuQmCC'
];

function lmurShowTrace(traceText)
{
   if(lmurShowTraceOutput)
   {
      console.log('LMURtrace: ('+Math.round(performance.now()*100)/100+') '+traceText);
   }
}

function lmurGetCBChecked(cbID)
{
   lmurShowTrace('lmurGetCBChecked');
   return(document.getElementById(cbID).checked);
}

function lmurSaveSettings()
{
   lmurShowTrace('lmurSaveSettings');
   if(lmurInhibitSave) return;
   if(!lmurIsLoggedIn) return;

   if (localStorage)
   {
      var options = '';
      var id;
      var lmurOptions = lmurUI.getElementsByTagName('input');
      for (var optIdx=0;optIdx<lmurOptions.length;optIdx++)
      {
         id = lmurOptions[optIdx].id;
         if((id.indexOf('_cb') === 0)||(id.indexOf('_text') === 0)||(id.indexOf('_input') === 0)||(id.indexOf('_radio') === 0))
         {
            options += ':' + id;
            if((lmurOptions[optIdx].type == 'checkbox')||(lmurOptions[optIdx].type == 'radio')) options += ',' + lmurOptions[optIdx].checked.toString();
            else if((lmurOptions[optIdx].type == 'text')||(lmurOptions[optIdx].type == 'number')) options += ',' + lmurOptions[optIdx].value.toString();
         }
      }

      lmurOptions = lmurUI.getElementsByTagName('select');
      for (optIdx=0;optIdx<lmurOptions.length;optIdx++)
      {
         id = lmurOptions[optIdx].id;
         if(id.indexOf('_select') === 0)
         {
            options += ':' + id;
            options += ',' + lmurOptions[optIdx].selectedIndex.toString();
         }
      }

      localStorage.LMUROverviewOptions = options;
   }
}

function lmurLoadSettings()
{
   lmurShowTrace('lmurLoadSettings');
   lmurAddLog('loadSettings()');
   if (localStorage.LMUROverviewOptions)
   {
      var options = localStorage.LMUROverviewOptions.split(':');
      for(var optIdx=0;optIdx<options.length;optIdx++)
      {
         var fields = options[optIdx].split(',');
         if((document.getElementById(fields[0]) !== undefined) && (document.getElementById(fields[0]) !== null))
         {
            if((fields[0].indexOf('_cb') === 0)||(fields[0].indexOf('_radio') === 0))
            {
               document.getElementById(fields[0]).checked = (fields[1] == 'true');
            }
            else if(fields[0].indexOf('_select') === 0)
            {
               document.getElementById(fields[0]).selectedIndex = fields[1];
            }
            else if((fields[0].indexOf('_input') === 0)||(fields[0].indexOf('_text') === 0))
            {
               document.getElementById(fields[0]).value = fields[1];
            }
         }
      }

      var userDecayValue = document.getElementById('_inputCacheDecayPeriod').value;
      if(userDecayValue === "")
      {
         document.getElementById('_inputCacheDecayPeriod').value = (lmurCacheExpiryPeriod / 60);
      }
      else
      {
         lmurCacheExpiryPeriod = (parseInt(userDecayValue) * 60);
      }
   }
   lmurInhibitSave = false;
}

function lmurAddLog(logtext)
{
   if(lmurShowDebugOutput)
   {
      console.log('LMUR: ('+Math.round(performance.now()*100)/100+') '+logtext);
   }
}

function lmurMarker(pos, obj, type, lon, lat, nComments, userLastComment, ageLastComment, loggedInUserComments, isFollowing, customTagType)
{
   this.pos = pos;
   this.obj = obj;
   this.type = type;
   this.lon = lon;
   this.lat = lat;
   this.markerHidden = false;
   this.px = -1;
   this.py = -1;
   this.nComments = nComments;
   this.userLastComment = userLastComment;
   this.ageLastComment = ageLastComment;
   this.loggedInUserComments = loggedInUserComments;
   this.isFollowing = isFollowing;
   this.customTagType = customTagType;
}

function lmurCacheObj(lon, lat, getTime)
{
   lon = +lon.toFixed(2);
   lat = +lat.toFixed(2);

   this.lon = lon;
   this.lat = lat;
   this.getTime = getTime;
}

function lmurDlReqObj(lon, lat, getURs, getMPs, getPURs)
{
   lon = +lon.toFixed(2);
   lat = +lat.toFixed(2);

   this.lon = lon;
   this.lat = lat;
   this.getURs = getURs;
   this.getMPs = getMPs;
   this.getPURs = getPURs;
   this.retries = 0;
   this.requested = false;
}

function lmurUpdateMarkerObj(markerID, nComments, userLastComment, ageLastComment, loggedInUserComments, isFollowing, customTagType)
{
   lmurShowTrace('lmurUpdateMarkerObj');
   for(var objID=0; objID < lmurMarkers.length; objID++)
   {
      if(lmurMarkers[objID].obj.id == markerID)
      {
         lmurMarkers[objID].nComments = nComments;
         lmurMarkers[objID].userLastComment = userLastComment;
         lmurMarkers[objID].ageLastComment = ageLastComment;
         lmurMarkers[objID].loggedInUserComments = loggedInUserComments;
         lmurMarkers[objID].isFollowing = isFollowing;
         if(customTagType !== null) lmurMarkers[objID].customTagType = customTagType;
         break;
      }
   }
}

function lmurGetCacheIdx(lon, lat, type)
{
   lmurShowTrace('lmurGetCacheIdx '+lon+','+lat+','+type);
   lon = +lon.toFixed(2);
   lat = +lat.toFixed(2);

   var lmurCached;
   if(type == 1) lmurCached = lmurCachedURs;
   else if((type == 2)||(type == 3)) lmurCached = lmurCachedMPs;
   else if(type == 4) lmurCached = lmurCachedPURs;
   else if(type == -1) lmurCached = lmurDownloadRequests;
   else if(type == -2) lmurCached = lmurCachesToRender;
   else return null;

   for(var idx=0; idx<lmurCached.length; idx++)
   {
      if((lmurCached[idx].lon == lon) && (lmurCached[idx].lat == lat))
      {
         return idx;
      }
   }
   return null;
}

function lmurSquareIsCached(lon, lat, cachedURs, cachedMPs, cachedPURs)
{
   lmurShowTrace('lmurSquareIsCached');
   lon = +lon.toFixed(2);
   lat = +lat.toFixed(2);

   var idx;

   if((!cachedURs) && (!cachedMPs) && (!cachedPURs)) return false;
   if(cachedURs)
   {
      idx = lmurGetCacheIdx(lon, lat, 1);
      if(idx === null) return false;
      if(lmurCachedURs[idx].getTime === null) return false;
   }
   if(cachedMPs)
   {
      idx = lmurGetCacheIdx(lon, lat, 2);
      if(idx === null) return false;
      if(lmurCachedMPs[idx].getTime === null) return false;
   }
   if(cachedPURs)
   {
      idx = lmurGetCacheIdx(lon, lat, 4);
      if(idx === null) return false;
      if(lmurCachedPURs[idx].getTime === null) return false;
   }
   return true;
}

function lmurSquareIsQueued(lon, lat)
{
   lmurShowTrace('lmurSquareIsQueued');
   lon = +lon.toFixed(2);
   lat = +lat.toFixed(2);

   var idx;

   idx = lmurGetCacheIdx(lon, lat, -1);
   if(idx === null) return false;
   return true;
}

function lmurGetSquareAge(lon, lat, type)
{
   lmurShowTrace('lmurGetSquareAge '+lon+','+lat+','+type);
   lon = +lon.toFixed(2);
   lat = +lat.toFixed(2);

   var idx = lmurGetCacheIdx(lon, lat, type);
   if(idx !== null)
   {
      var timeNow = Math.floor(new Date().getTime() / 1000);
      var cacheTime = null;
      if((type == 1)&&(lmurCachedURs.length >= idx+1)) cacheTime = lmurCachedURs[idx].getTime;
      else if(((type == 2)||(type == 3))&&(lmurCachedMPs.length >= idx+1)) cacheTime = lmurCachedMPs[idx].getTime;
      else if((type == 4)&&(lmurCachedPURs.length >= idx+1)) cacheTime = lmurCachedPURs[idx].getTime;
      else if((type == -2)&&(lmurCachesToRender.length >= idx+1)) cacheTime = lmurCachesToRender[idx].getTime;
      if(cacheTime !== null)
      {
         return (timeNow - cacheTime);
      }
   }
   return null;
}


function lmurRemoveMarkersFromCache()
{
   lmurShowTrace('lmurRemoveMarkersFromCache');
   lmurAddLog('removing expired markers from cache');
   var idx=0;
   while(idx < lmurMarkers.length)
   {
      var markerAge = lmurGetMarkerAge(lmurMarkers[idx]);
      if((markerAge > lmurCacheExpiryPeriod) || (markerAge === null))
      {
         lmurMarkers.splice(idx,1);
      }
      else
      {
         idx++;
      }
   }
}


function lmurRemoveSquareFromCacheList(lon, lat, type)
{
   lmurShowTrace('lmurRemoveSquareFromCacheList');
   lon = +lon.toFixed(2);
   lat = +lat.toFixed(2);

   if(type !== null)
   {
      lmurAddLog('removing square '+lon+','+lat+':'+type+' from cache');
      var idx = lmurGetCacheIdx(lon, lat, type);

      if(idx !== null)
      {
         if(type == 1) lmurCachedURs.splice(idx,1);
         else if((type == 2)||(type == 3)) lmurCachedMPs.splice(idx,1);
         else if(type == 4) lmurCachedPURs.splice(idx,1);
         else if(type == -1) lmurCachesToRender.splice(idx,1);
      }
   }
}


function lmurResetCaches()
{
   lmurShowTrace('lmurResetCaches');
   lmurMarkers = [];
   lmurCachedURs = [];
   lmurCachedMPs = [];
   lmurCachedPURs = [];
   lmurCachesToRender = [];
   lmurDownloadRequests = [];
}

function lmurChangeServer()
{
   lmurShowTrace('lmurChangeServer');
   lmurResetCaches();
   lmurUpdateRequestQueue();
}


function lmurGetMarkerAge(ureq)
{
   lmurShowTrace('lmurGetMarkerAge');
   return lmurGetSquareAge(ureq.lon, ureq.lat, ureq.type);
}

function lmurGetCommentsData()
{
   lmurShowTrace('lmurGetCommentsData');
   if(lmurGetCommentsList.length === 0)
   {
      lmurVisualiseMarkers();
      return;
   }
   if(lmurXHRIsBusy)
   {
      setTimeout(lmurGetCommentsData,lmurRateLimiter);
      return;
   }

   var idList = '';
   var idCount;

   if(lmurGetCommentsList.length > 50) idCount = 50;
   else idCount = lmurGetCommentsList.length;
   while(idCount)
   {
      idList += lmurGetCommentsList.pop();
      if(idCount != 1) idList += ',';
      idCount--;
   }
   var lmurRequest = new XMLHttpRequest();
   lmurRequest.onreadystatechange = function ()
   {
      if (lmurRequest.readyState == 4)
      {
         lmurXHRIsBusy = false;
         lmurAddLog('lmurGetCommentsData() response '+lmurRequest.status+' received');
         if (lmurRequest.status == 200)
         {
            var lmurData = JSON.parse(lmurRequest.responseText);
            lmurAddLog('data received for '+lmurData.updateRequestSessions.objects.length+' URs');
            var timeNow = new Date().getTime();
            for(var ursObj in lmurData.updateRequestSessions.objects)
            {
               if(lmurData.updateRequestSessions.objects.hasOwnProperty(ursObj))
               {
                  var urSesh = lmurData.updateRequestSessions.objects[ursObj];
                  var nComments = urSesh.comments.length;
                  var loggedInUserComments = false;
                  var userLastComment = null;
                  var ageLastComment = null;
                  var customTagType = null;
                  if(nComments > 0)
                  {
                     userLastComment = urSesh.comments[nComments-1].userID;
                     ageLastComment = Math.floor((timeNow - urSesh.comments[nComments-1].createdOn) / 86400000);

                     for(var loop=0;loop<nComments;loop++)
                     {
                        if(urSesh.comments[loop].userID == lmurUserID)
                        {
                           loggedInUserComments = true;
                        }
                        if(urSesh.comments[loop].text.indexOf('[ROADWORKS]') != -1) customTagType = 1;
                        else if(urSesh.comments[loop].text.indexOf('[CONSTRUCTION]') != -1) customTagType = 2;
                        else if(urSesh.comments[loop].text.indexOf('[CLOSURE]') != -1) customTagType = 3;
                        else if(urSesh.comments[loop].text.indexOf('[EVENT]') != -1) customTagType = 4;
                        else if(urSesh.comments[loop].text.indexOf('[NOTE]') != -1) customTagType = 5;
                     }
                  }
                  var isFollowing = urSesh.isFollowing;
                  lmurUpdateMarkerObj(urSesh.id,nComments,userLastComment,ageLastComment,loggedInUserComments,isFollowing,customTagType);
               }
            }
         }
         setTimeout(lmurGetCommentsData,lmurRateLimiter);
      }
   };
   var lmurFetchURL = 'https://www.waze.com/' + lmurURLPrefix + 'Descartes-live/app/MapProblems/UpdateRequests?ids='+idList;
   lmurAddLog('requesting '+lmurFetchURL);

   lmurRequest.open("GET", lmurFetchURL, true);
   lmurRequest.send();
   lmurXHRIsBusy = true;
}

function lmurUpdateRequestQueue()
{
   lmurShowTrace('lmurUpdateRequestQueue');
   // don't visualise anything if the user isn't logged-in or hasn't asked for anything to be visualised...
   if
   (
      (!lmurIsLoggedIn) ||
      (
         (!lmurGetCBChecked('_cbShowURs')) &&
         (!lmurGetCBChecked('_cbShowProblems')) &&
         (!lmurGetCBChecked('_cbShowPlaceUpdates'))
      ) ||
      (!lmurEnabled)
   )
   {
      lmurAddLog('inhibit visualisation');
      lmurDiv.innerHTML = '';
      return;
   }

   var boundsNE = W.app.map.getBounds()._northEast;
   var boundsSW = W.app.map.getBounds()._southWest;
   var midpoint;
   if((boundsNE.lng - boundsSW.lng) > lmurMaxGrabWidth)
   {
      midpoint = (boundsNE.lng + boundsSW.lng) / 2;
      boundsNE.lng = midpoint + (lmurMaxGrabWidth / 2);
      boundsSW.lng = midpoint - (lmurMaxGrabWidth / 2);
   }
   if((boundsNE.lat - boundsSW.lat) > lmurMaxGrabHeight)
   {
      midpoint = (boundsNE.lat + boundsSW.lat) / 2;
      boundsNE.lat = midpoint + (lmurMaxGrabHeight / 2);
      boundsSW.lat = midpoint - (lmurMaxGrabHeight / 2);
   }

   var startLon = (boundsSW.lng / lmurSquareSize);
   if(startLon < 0) startLon = Math.floor(startLon) * lmurSquareSize;
   else startLon = Math.ceil(startLon) * lmurSquareSize;

   var endLon = (boundsNE.lng / lmurSquareSize);
   if(endLon < 0) endLon = Math.ceil(endLon) * lmurSquareSize;
   else endLon = Math.floor(endLon) * lmurSquareSize;

   var startLat = (boundsSW.lat / lmurSquareSize);
   if(startLat < 0) startLat = Math.ceil(startLat) * lmurSquareSize;
   else startLat = Math.floor(startLat) * lmurSquareSize;

   var endLat = (boundsNE.lat / lmurSquareSize);
   if(endLat < 0) endLat = Math.floor(endLat) * lmurSquareSize;
   else endLat = Math.ceil(endLat) * lmurSquareSize;

   var getURs = lmurGetCBChecked('_cbShowURs');
   var getMPs = lmurGetCBChecked('_cbShowProblems');
   var getPURs = lmurGetCBChecked('_cbShowPlaceUpdates');

   for(var sqLon = startLon; sqLon <= endLon; sqLon += lmurSquareSize)
   {
      for(var sqLat = startLat; sqLat <= endLat; sqLat += lmurSquareSize)
      {
         sqLon = +sqLon.toFixed(2);
         sqLat = +sqLat.toFixed(2);

         if(!lmurSquareIsCached(sqLon, sqLat, getURs, getMPs, getPURs))
         {
            if(!lmurSquareIsQueued(sqLon, sqLat))
            {
               lmurDownloadRequests.push(new lmurDlReqObj(sqLon, sqLat, getURs, getMPs, getPURs));
            }
         }
      }
   }

   if(lmurDownloadRequests.length)
   {
      setTimeout(lmurGetMarkers,lmurRateLimiter);
   }
}


function lmurGetMarkers()
{
   lmurShowTrace('lmurGetMarkers');
   if(lmurDownloadRequests.length === 0)
   {
      return;
   }
   if(lmurXHRIsBusy)
   {
      setTimeout(lmurGetMarkers,lmurRateLimiter);
      return;
   }

   var timeNow = Math.floor(new Date().getTime() / 1000);

   var dlReq = lmurDownloadRequests[0];
   var idx = lmurGetCacheIdx(dlReq.lon, dlReq.lat, -1);
   if((idx === null) || (!dlReq.requested))
   {
      lmurAddLog('cache miss at '+dlReq.lon+' '+dlReq.lat);
      if(dlReq.retries++ < 3)
      {
         lmurAddLog('block has retries remaining, requesting from server...');
         dlReq.requested = true;
         var getURs = ((dlReq.getURs) && (!lmurSquareIsCached(dlReq.lon, dlReq.lat, true, false, false)));
         var getMPs = ((dlReq.getMPs) && (!lmurSquareIsCached(dlReq.lon, dlReq.lat, false, true, false)));
         var getPURs = ((dlReq.getPURs) && (!lmurSquareIsCached(dlReq.lon, dlReq.lat, false, false, true)));

         if(lmurGetCBChecked('_radioROWServer')) lmurURLPrefix = 'row-';
         else if(lmurGetCBChecked('_radioUSAServer')) lmurURLPrefix = '';
         else lmurURLPrefix = 'il-';

         var lmurRequest = new XMLHttpRequest();
         lmurRequest.onreadystatechange = function ()
         {
            if (lmurRequest.readyState == 4)
            {
               lmurXHRIsBusy = false;
               lmurAddLog('lmurGetMarkers() response '+lmurRequest.status+' received');
               if (lmurRequest.status == 200)
               {
                  var lmurData = JSON.parse(lmurRequest.responseText);
                  var loop;
                  var isDupe;
                  var cacheObj = new lmurCacheObj(dlReq.lon, dlReq.lat, timeNow);

                  if((lmurData.users !== undefined) && (lmurUserName.length !== 0) && (lmurUserID === null))
                  {
                     for(var userObj in lmurData.users.objects)
                     {
                        if(lmurData.users.objects.hasOwnProperty(userObj))
                        {
                           var user = lmurData.users.objects[userObj];
                           if(user.userName === lmurUserName)
                           {
                              lmurUserID = user.id;
                              lmurAddLog('Found ID '+lmurUserID+' for logged-in user...');
                              break;
                           }
                        }
                     }
                  }

                  lmurAddLog('This area contains:');
                  if(lmurData.mapUpdateRequests !== undefined)
                  {
                     lmurAddLog('  '+lmurData.mapUpdateRequests.objects.length+' URs');
                     // store URs
                     for(var urobj in lmurData.mapUpdateRequests.objects)
                     {
                        if(lmurData.mapUpdateRequests.objects.hasOwnProperty(urobj))
                        {
                           var ureq = lmurData.mapUpdateRequests.objects[urobj];
                           isDupe = false;
                           for(loop=0; loop<lmurMarkers.length; loop++)
                           {
                              if((lmurMarkers[loop].type == 1) && (lmurMarkers[loop].obj.id == ureq.id))
                              {
                                 isDupe = true;
                                 break;
                              }
                           }
                           if(!isDupe)
                           {
                              var urpos = new L.LatLng(ureq.geometry.coordinates[1],ureq.geometry.coordinates[0]);
                              var customTagType = 0;
                              if(ureq.description !== null)
                              {
                                 var desc = ureq.description;
                                 if(desc.indexOf('[ROADWORKS]') != -1) customTagType = 1;
                                 else if(desc.indexOf('[CONSTRUCTION]') != -1) customTagType = 2;
                                 else if(desc.indexOf('[CLOSURE]') != -1) customTagType = 3;
                                 else if(desc.indexOf('[EVENT]') != -1) customTagType = 4;
                                 else if(desc.indexOf('[NOTE]') != -1) customTagType = 5;
                              }

                              lmurMarkers.push(new lmurMarker(urpos, ureq, 1, dlReq.lon, dlReq.lat, -1, -1, -1, false, false, customTagType));
                              if(lmurUserName.length !== 0)
                              {
                                 lmurGetCommentsList.push(ureq.id);
                              }
                           }
                        }
                     }
                     lmurAddLog('  URs processed, '+lmurMarkers.length+' objects in lmurMarkers');
                  }

                  if(lmurData.problems !== undefined)
                  {
                     lmurAddLog('  '+lmurData.problems.objects.length+' MPs');
                     // store map problems
                     for(var mpobj in lmurData.problems.objects)
                     {
                        if(lmurData.problems.objects.hasOwnProperty(mpobj))
                        {
                           var mprob = lmurData.problems.objects[mpobj];
                           isDupe = false;
                           for(loop=0; loop<lmurMarkers.length; loop++)
                           {
                              if((lmurMarkers[loop].type == 2) && (lmurMarkers[loop].obj.id == mprob.id))
                              {
                                 isDupe = true;
                                 break;
                              }
                           }
                           if(!isDupe)
                           {
                              var mppos = new L.LatLng(mprob.geometry.coordinates[1],mprob.geometry.coordinates[0]);
                              lmurMarkers.push(new lmurMarker(mppos, mprob, 2, dlReq.lon, dlReq.lat, 0, -1, -1, false, false, -1));
                           }
                        }
                     }
                     lmurAddLog('  MPs processed, '+lmurMarkers.length+' objects in lmurMarkers');
                  }

                  if(lmurData.venues !== undefined)
                  {
                     lmurAddLog('  '+lmurData.venues.objects.length+' PURs');
                     // store PURs
                     for(var puobj in lmurData.venues.objects)
                     {
                        if(lmurData.venues.objects.hasOwnProperty(puobj))
                        {
                           var pupd = lmurData.venues.objects[puobj];
                           isDupe = false;
                           for(loop=0; loop<lmurMarkers.length; loop++)
                           {
                              if((lmurMarkers[loop].type == 4) && (lmurMarkers[loop].obj.id == pupd.id))
                              {
                                 isDupe = true;
                                 break;
                              }
                           }
                           if(!isDupe)
                           {
                              if(pupd.venueUpdateRequests === undefined) continue;
                              if(pupd.geometry.type == 'Point')
                              {
                                 var pupos_point = new L.LatLng(pupd.geometry.coordinates[1],pupd.geometry.coordinates[0]);
                                 lmurMarkers.push(new lmurMarker(pupos_point, pupd, 4, dlReq.lon, dlReq.lat, 0, -1, -1, false, false, -1));
                              }
                              else if(pupd.geometry.type == 'Polygon')
                              {
                                 var pupos_poly = new L.LatLng(pupd.geometry.coordinates[0][0][1],pupd.geometry.coordinates[0][0][0]);
                                 lmurMarkers.push(new lmurMarker(pupos_poly, pupd, 4, dlReq.lon, dlReq.lat, 0, -1, -1, false, false, -1));
                              }
                           }
                        }
                     }
                     lmurAddLog('  PURs processed, '+lmurMarkers.length+' objects in lmurMarkers');
                  }

                  if(getURs) lmurCachedURs.push(cacheObj);
                  if(getMPs) lmurCachedMPs.push(cacheObj);
                  if(getPURs) lmurCachedPURs.push(cacheObj);
                  if(lmurGetCommentsList.length > 0)
                  {
                     setTimeout(lmurGetCommentsData,lmurRateLimiter);
                  }
                  lmurVisualiseMarkers();
                  lmurDownloadRequests.shift();
               }
               setTimeout(lmurGetMarkers,lmurRateLimiter);
            }
         };
         var lmurFetchURL = 'https://www.waze.com/' + lmurURLPrefix + 'Descartes-live/app/Features?language=en';
         if(getURs) lmurFetchURL += '&mapUpdateRequestFilter=1';
         if(getMPs) lmurFetchURL += '&problemFilter=1&turnProblemFilter=1';
         if(getPURs) lmurFetchURL += '&venueFilter=1&venueLevel=1&venueUpdateRequests=true';
         if(lmurGetCBChecked('_cbEnablePlayMode')) lmurFetchURL += '&sandbox=true';
         lmurFetchURL += '&bbox=';
         lmurFetchURL += dlReq.lon + ',' + dlReq.lat + ',' + (dlReq.lon + lmurSquareSize) + ',' + (dlReq.lat + lmurSquareSize);
         console.debug(lmurFetchURL);
         lmurRequest.open('GET', lmurFetchURL, true);
         lmurRequest.send();
         lmurXHRIsBusy = true;
         lmurAddLog('requesting '+lmurFetchURL);
      }
      else
      {
         lmurAddLog('out of retries, sorry...');
         lmurDownloadRequests.shift();
      }
   }
   else
   {
      lmurAddLog('cache hit at '+dlReq.lon+' '+dlReq.lat);
      lmurDownloadRequests.shift();
      setTimeout(lmurGetMarkers,lmurRateLimiter);
   }
}

function lmurKeywordPresent(desc, keyword)
{
   lmurShowTrace('lmurKeywordPresent');
   var re;
   if(lmurGetCBChecked('_cbURCaseInsensitive')) re = RegExp(keyword,'i');
   else re = RegExp(keyword);
   if(desc.search(re) == -1) return false;
   else return true;
}

function lmurFilterMarkers(ureq)
{
   lmurShowTrace('lmurFilterMarkers');
   var daysOld;

   // URs
   if(ureq.type == 1)
   {
      if (!lmurGetCBChecked('_cbShowURs')) return true;

      // resolved filtering
      if(lmurGetCBChecked('_cbUREnableResolvedFilter'))
      {
         if(ureq.obj.resolvedOn !== null) return true;
      }

      // age-based filtering
      daysOld = lmurGetURAge(ureq.obj,0);
      if(daysOld != 999999)
      {
         if(lmurGetCBChecked('_cbUREnableMinAgeFilter'))
         {
            if(daysOld < document.getElementById('_inputURFilterMinDays').value) return true;
         }
         if(lmurGetCBChecked('_cbUREnableMaxAgeFilter'))
         {
            if(daysOld > document.getElementById('_inputURFilterMaxDays').value) return true;
         }
      }

      // comment based filtering
      if(lmurIsLoggedIn)
      {
         if
         (
            ((lmurGetCBChecked('_cbURShowUnloadedComments')) && (ureq.nComments != -1)) ||
            ((lmurGetCBChecked('_cbURHideUnloadedComments')) && (ureq.nComments == -1))
         )
         {
            return true;
         }

         if (ureq.nComments != -1)
         {
            if(lmurGetCBChecked('_cbURHideWithMyComments'))
            {
               if(ureq.loggedInUserComments) return true;
            }
            if(lmurGetCBChecked('_cbURShowWithMyComments'))
            {
               if(!ureq.loggedInUserComments) return true;
            }
            if(lmurGetCBChecked('_cbURHideLastCommentByMe'))
            {
               if(ureq.userLastComment == lmurUserID) return true;
            }
            if(lmurGetCBChecked('_cbURShowLastCommentByMe'))
            {
               if(ureq.userLastComment != lmurUserID) return true;
            }
            if(lmurGetCBChecked('_cbURHideLastCommentByReporter'))
            {
               if(ureq.userLastComment == -1) return true;
            }
            if(lmurGetCBChecked('_cbURShowLastCommentByReporter'))
            {
               if(ureq.userLastComment != -1) return true;
            }
            if(lmurGetCBChecked('_cbURHideWithLessThanComments'))
            {
               if(ureq.nComments < document.getElementById('_inputFilterMinComments').value) return true;
            }
            if(lmurGetCBChecked('_cbURShowWithLessThanComments'))
            {
               if(ureq.nComments >= document.getElementById('_inputFilterMinComments').value) return true;
            }

            if(lmurGetCBChecked('_cbURHideFollowedURs'))
            {
               if(ureq.isFollowing) return true;
            }
            if(lmurGetCBChecked('_cbURShowFollowedURs'))
            {
               if(!ureq.isFollowing) return true;
            }

            if(lmurGetCBChecked('_cbURHideLastCommentAge'))
            {
               if(ureq.nComments > 0)
               {
                  if(ureq.ageLastComment < document.getElementById('_inputFilterCommentAge').value) return true;
               }
            }
            if(lmurGetCBChecked('_cbURShowLastCommentAge'))
            {
               if(ureq.ageLastComment >= document.getElementById('_inputFilterCommentAge').value) return true;
            }
         }
      }


      // keyword and type-specific filtering
      var desc = '';
      var urFilter = false;

      if(ureq.obj.description !== null) desc = ureq.obj.description;
      if(lmurGetCBChecked('_cbUREnableKeywordMustBePresent'))
      {
         if(!lmurKeywordPresent(desc,document.getElementById('_textURKeywordPresent').value)) return true;
      }
      if(lmurGetCBChecked('_cbUREnableKeywordMustBeAbsent'))
      {
         if(lmurKeywordPresent(desc,document.getElementById('_textURKeywordAbsent').value)) return true;
      }
      if(lmurGetCBChecked('_cbURHideWithNoDescription'))
      {
         if(desc === "") return true;
      }
      if(lmurGetCBChecked('_cbURShowWithNoDescription'))
      {
         if(desc !== "") return true;
      }


      // type-based filtering...
      // Need to check for Waze automatic URs first - these always (?) get inserted as General Error URs,
      // so although they're treated as a "type" UR for filtering purposes, we have to filter them out
      // via description keyword matching before we can do any real type filtering
      if(desc.indexOf('Waze Automatic:') != -1) urFilter |= lmurGetCBChecked('_cbURFilterWazeAuto');
      // Now custom tagged URs
      else if(ureq.customTagType == 1) urFilter |= lmurGetCBChecked('_cbURFilterRoadworks');
      else if(ureq.customTagType == 2) urFilter |= lmurGetCBChecked('_cbURFilterConstruction');
      else if(ureq.customTagType == 3) urFilter |= lmurGetCBChecked('_cbURFilterClosure');
      else if(ureq.customTagType == 4) urFilter |= lmurGetCBChecked('_cbURFilterEvent');
      else if(ureq.customTagType == 5) urFilter |= lmurGetCBChecked('_cbURFilterNote');

      if(ureq.obj.type == 6) urFilter |= lmurGetCBChecked('_cbURFilterIncorrectTurn');
      else if(ureq.obj.type == 7) urFilter |= lmurGetCBChecked('_cbURFilterIncorrectAddress');
      else if(ureq.obj.type == 8) urFilter |= lmurGetCBChecked('_cbURFilterIncorrectRoute');
      else if(ureq.obj.type == 9) urFilter |= lmurGetCBChecked('_cbURFilterMissingRoundabout');
      else if(ureq.obj.type == 10) urFilter |= lmurGetCBChecked('_cbURFilterGeneralError');
      else if(ureq.obj.type == 11) urFilter |= lmurGetCBChecked('_cbURFilterTurnNotAllowed');
      else if(ureq.obj.type == 12) urFilter |= lmurGetCBChecked('_cbURFilterIncorrectJunction');
      else if(ureq.obj.type == 13) urFilter |= lmurGetCBChecked('_cbURFilterMissingBridgeOverpass');
      else if(ureq.obj.type == 14) urFilter |= lmurGetCBChecked('_cbURFilterWrongDrivingDirection');
      else if(ureq.obj.type == 15) urFilter |= lmurGetCBChecked('_cbURFilterMissingExit');
      else if(ureq.obj.type == 16) urFilter |= lmurGetCBChecked('_cbURFilterMissingRoad');
      else if(ureq.obj.type == 18) urFilter |= lmurGetCBChecked('_cbURFilterMissingLandmark');
      else if(ureq.obj.type == 19) urFilter |= lmurGetCBChecked('_cbURFilterBlockedRoad');
      else if(lmurGetCBChecked('_cbURFilterUndefined')) urFilter |= true;


      if(document.getElementsByName('lmurShowURs')[0].checked)
      {
         urFilter = !urFilter;
      }
      return urFilter;
   }

   // MPs
   else if(ureq.type == 2)
   {
      if (!lmurGetCBChecked('_cbShowProblems')) return true;

      if(ureq.obj.subType == 200)
      {
         // turn problems

         // resolved filtering
         if(lmurGetCBChecked('_cbTPEnableResolvedFilter'))
         {
            if(ureq.obj.resolvedOn !== null) return true;
         }
         if (!lmurGetCBChecked('_cbShowTurnProbs')) return true;
         return false;
      }
      else
      {
         // other problem types

         // resolved filtering
         if(lmurGetCBChecked('_cbMPEnableResolvedFilter'))
         {
            if(ureq.obj.resolvedOn !== null) return true;
         }

         // filter by severity
         if(ureq.obj.weight <= 3)
         {
            if (lmurGetCBChecked('_cbMPFilterLowSeverity')) return true;
         }
         else if(ureq.obj.weight <= 7)
         {
            if (lmurGetCBChecked('_cbMPFilterMediumSeverity')) return true;
         }
         else if(ureq.obj.weight > 7)
         {
            if (lmurGetCBChecked('_cbMPFilterHighSeverity')) return true;
         }

         var problemFilter = false;

         if(ureq.obj.subType == 101) problemFilter |= lmurGetCBChecked('_cbMPFilterDrivingDirectionMismatch');
         else if(ureq.obj.subType == 102) problemFilter |= lmurGetCBChecked('_cbMPFilterMissingJunction');
         else if(ureq.obj.subType == 103) problemFilter |= lmurGetCBChecked('_cbMPFilterMissingRoad');
         else if(ureq.obj.subType == 104) problemFilter |= lmurGetCBChecked('_cbMPFilterCrossroadsJunctionMissing');
         else if(ureq.obj.subType == 105) problemFilter |= lmurGetCBChecked('_cbMPFilterRoadTypeMismatch');
         else if(ureq.obj.subType == 106) problemFilter |= lmurGetCBChecked('_cbMPFilterRestrictedTurn');
         else if(ureq.obj.subType == 300) problemFilter |= lmurGetCBChecked('_cbMPFilterRoadClosure');
         else if(lmurGetCBChecked('_cbMPFilterUnknownProblem')) problemFilter = true;

         if(document.getElementsByName('lmurShowProblems')[0].checked)
         {
            problemFilter = !problemFilter;
         }
         return problemFilter;
      }
   }

   // PURs
   else if(ureq.type == 4)
   {
      if (!lmurGetCBChecked('_cbShowPlaceUpdates')) return true;

      // residential/non-residential filtering
      if(ureq.obj.residential)
      {
         if (lmurGetCBChecked('_cbPURFilterResidential')) return true;
      }
      else
      {
         if (lmurGetCBChecked('_cbPURFilterNonResidential')) return true;
      }

      // age-based filtering
      daysOld = lmurGetURAge(ureq.obj,3);
      if(daysOld != 999999)
      {
         if(lmurGetCBChecked('_cbPUREnableMinAgeFilter'))
         {
            if(daysOld < document.getElementById('_inputPURFilterMinDays').value) return true;
         }
         if(lmurGetCBChecked('_cbPUREnableMaxAgeFilter'))
         {
            if(daysOld > document.getElementById('_inputPURFilterMaxDays').value) return true;
         }
      }

      var purFilter = false;
      var purUpdateDetails = false;
      var purNewPhoto = false;
      var purNewPlace = false;
      var purFlagged = false;
      var purNonZeroLR = false;

      if(ureq.obj.lockRank !== undefined)
      {
         purNonZeroLR = (ureq.obj.lockRank > 0);
      }

      for(var vurIdx=0; vurIdx < ureq.obj.venueUpdateRequests.length; vurIdx++)
      {
         var vurObj = ureq.obj.venueUpdateRequests[vurIdx];
         if(vurObj.type !== undefined)
         {
            purNewPhoto |= (vurObj.type == 'IMAGE');
            purNewPlace |= (vurObj.type == 'VENUE');
         }

         if(vurObj.subType !== undefined)
         {
            purUpdateDetails |= (vurObj.subType == 'UPDATE');
            purFlagged |= (vurObj.subType == 'FLAG');
         }
      }

      purFilter |= ((lmurGetCBChecked('_cbPURFilterNewPlace')) && (purNewPlace));
      purFilter |= ((lmurGetCBChecked('_cbPURFilterUpdateDetails')) && (purUpdateDetails));
      purFilter |= ((lmurGetCBChecked('_cbPURFilterNewPhoto')) && (purNewPhoto));
      purFilter |= ((lmurGetCBChecked('_cbPURFilterFlagged')) && (purFlagged));
      purFilter |= ((lmurGetCBChecked('_cbPURNonZeroLockRank')) && (purNonZeroLR));

      if(document.getElementsByName('lmurShowPURs')[0].checked)
      {
        purFilter = !purFilter;
      }
      return purFilter;
   }
}

function lmurVisualiseMarkers()
{
   lmurShowTrace('lmurVisualiseMarkers');
   // don't visualise anything if the user isn't logged-in or hasn't asked for anything to be visualised...
   if
   (
      (!lmurIsLoggedIn) ||
      (
         (!lmurGetCBChecked('_cbShowURs')) &&
         (!lmurGetCBChecked('_cbShowProblems')) &&
         (!lmurGetCBChecked('_cbShowPlaceUpdates'))
      ) ||
      (!lmurEnabled)
   )
   {
      lmurAddLog('inhibit visualisation');
      lmurDiv.innerHTML = '';
      return;
   }

   lmurAddLog('enabling nudge detection');
   lmurPrevCentre = W.app.map.getCenter();
   lmurInhibitNudgeDetection = false;

   lmurAddLog('visualise markers');
   var mapObj = document.getElementById("map");
   var currentwidth = mapObj.offsetWidth;
   var currentheight = mapObj.offsetHeight;


   lmurDiv.style.width = currentwidth;
   lmurDiv.style.height = currentheight;
   var svgSrc = '<svg xmlns="http://www.w3.org/2000/svg" width="'+currentwidth+'px" height="'+currentheight+'px" version="1.1">';

   // visualise cached data areas
   var corner1 = new L.LatLng(0,0);
   var corner2 = new L.LatLng(0,0);

   var boundsNE = W.app.map.getBounds()._northEast;
   var boundsSW = W.app.map.getBounds()._southWest;

   lmurCachesToRender = [];

   var sq;
   var sqAge;
   var idx;
   var fillOpacity;
   var pix1;
   var pix2;

   for(sq=0;sq<lmurCachedURs.length;sq++)
   {
      corner1.lat = lmurCachedURs[sq].lat;
      corner1.lng = lmurCachedURs[sq].lon;
      sqAge = lmurGetSquareAge(corner1.lng, corner1.lat, 1);
      if(sqAge !== null)
      {
         if((sqAge > lmurCacheExpiryPeriod)&&(lmurCacheExpiryPeriod !== 0)) lmurRemoveSquareFromCacheList(corner1.lng, corner1.lat, 1);
         else if(sqAge != -1)
         {
            sqAge = lmurGetSquareAge(corner1.lng, corner1.lat, -2);
            if(sqAge === null) lmurCachesToRender.push(new lmurCacheObj(lmurCachedURs[sq].lon, lmurCachedURs[sq].lat, lmurCachedURs[sq].getTime));
         }
      }
   }

   for(sq=0;sq<lmurCachedMPs.length;sq++)
   {
      corner1.lat = lmurCachedMPs[sq].lat;
      corner1.lng = lmurCachedMPs[sq].lon;
      sqAge = lmurGetSquareAge(corner1.lng, corner1.lat, 2);
      if(sqAge !== null)
      {
         if((sqAge > lmurCacheExpiryPeriod)&&(lmurCacheExpiryPeriod !== 0)) lmurRemoveSquareFromCacheList(corner1.lng, corner1.lat, 2);
         else if(sqAge != -1)
         {
            sqAge = lmurGetSquareAge(corner1.lng, corner1.lat, -2);
            if(sqAge === null) lmurCachesToRender.push(new lmurCacheObj(lmurCachedMPs[sq].lon, lmurCachedMPs[sq].lat, lmurCachedMPs[sq].getTime));
            else if(sqAge < lmurGetSquareAge(corner1.lng, corner1.lat, -1)) lmurCachesToRender[idx].getTime = lmurCachedMPs[sq].getTime;
         }
      }
   }

   for(sq=0;sq<lmurCachedPURs.length;sq++)
   {
      corner1.lat = lmurCachedPURs[sq].lat;
      corner1.lng = lmurCachedPURs[sq].lon;
      sqAge = lmurGetSquareAge(corner1.lng, corner1.lat, 4);
      if(sqAge !== null)
      {
         if((sqAge > lmurCacheExpiryPeriod)&&(lmurCacheExpiryPeriod !== 0)) lmurRemoveSquareFromCacheList(corner1.lng, corner1.lat, 4);
         else if(sqAge != -1)
         {
            sqAge = lmurGetSquareAge(corner1.lng, corner1.lat, -2);
            if(sqAge === null) lmurCachesToRender.push(new lmurCacheObj(lmurCachedPURs[sq].lon, lmurCachedPURs[sq].lat, lmurCachedPURs[sq].getTime));
            else if(sqAge < lmurGetSquareAge(corner1.lng, corner1.lat, -1)) lmurCachesToRender[idx].getTime = lmurCachedPURs[sq].getTime;
         }
      }
   }

   for(sq=0;sq<lmurDownloadRequests.length;sq++)
   {
      corner1.lat = lmurDownloadRequests[sq].lat;
      corner1.lng = lmurDownloadRequests[sq].lon;
      if
      (
         (corner1.lng <= boundsNE.lng) &&
         ((corner1.lng + lmurSquareSize) >= boundsSW.lng) &&
         (corner1.lat <= boundsNE.lat) &&
         ((corner1.lat + lmurSquareSize) >= boundsSW.lat)
      )
      {
         fillOpacity = 0.2;
         corner2.lat = parseFloat(corner1.lat)+lmurSquareSize;
         corner2.lng = parseFloat(corner1.lng)+lmurSquareSize;
         pix1 = W.app.map.latLngToContainerPoint(corner1);
         pix2 = W.app.map.latLngToContainerPoint(corner2);
         svgSrc += '<rect x="'+pix1.x+'" y="'+pix2.y+'" width="'+(pix2.x-pix1.x)+'" height="'+(pix1.y-pix2.y)+'" style="fill:grey;stroke:none;fill-opacity:'+fillOpacity+'"/>';
      }
   }

   if(!lmurGetCBChecked('_cbHighlightDisabled'))
   {
      for(sq=0;sq<lmurCachesToRender.length;sq++)
      {
         corner1.lat = lmurCachesToRender[sq].lat;
         corner1.lng = lmurCachesToRender[sq].lon;
         if
         (
            (corner1.lng <= boundsNE.lng) &&
            ((corner1.lng + lmurSquareSize) >= boundsSW.lng) &&
            (corner1.lat <= boundsNE.lat) &&
            ((corner1.lat + lmurSquareSize) >= boundsSW.lat)
         )
         {
            sqAge = lmurGetSquareAge(corner1.lng, corner1.lat, -2);
            if(sqAge > lmurCacheExpiryPeriod)
            {
               sqAge = lmurCacheExpiryPeriod;
            }
            if((sqAge != -1) && (sqAge <= lmurCacheExpiryPeriod))
            {
               if(lmurCacheExpiryPeriod === 0)
               {
                  fillOpacity = 0.2;
               }
               else
               {
                  fillOpacity = 0.2 - ((sqAge * 0.15) / lmurCacheExpiryPeriod);
               }
               corner2.lat = parseFloat(corner1.lat)+lmurSquareSize;
               corner2.lng = parseFloat(corner1.lng)+lmurSquareSize;
               pix1 = W.app.map.latLngToContainerPoint(corner1);
               pix2 = W.app.map.latLngToContainerPoint(corner2);
               svgSrc += '<rect x="'+pix1.x+'" y="'+pix2.y+'" width="'+(pix2.x-pix1.x)+'" height="'+(pix1.y-pix2.y)+'" style="fill:yellow;stroke:none;fill-opacity:'+fillOpacity+'"/>';
            }
         }
      }
   }

   if(lmurCacheExpiryPeriod > 0)
   {
      lmurRemoveMarkersFromCache();
   }

   var urpos = new L.LatLng(0,0);
   var hideMarker;
   var i;
   var ureq;
   var filteredMarkers = 0;

   for(i=0;i<lmurMarkers.length;i++)
   {
      ureq = lmurMarkers[i];

      hideMarker = lmurFilterMarkers(ureq);
      if(!hideMarker)
      {
         urpos.lng = ureq.pos.lng;
         urpos.lat = ureq.pos.lat;
         var urpix = W.app.map.latLngToContainerPoint(urpos);
         lmurMarkers[i].px = urpix.x;
         lmurMarkers[i].py = urpix.y;
         if((urpix.x < 0)||(urpix.x >= W.app.map._size.x)||(urpix.y < 0)||(urpix.y >= W.app.map._size.y)) hideMarker = true;
      }
      else
      {
         lmurMarkers[i].px = -1;
         lmurMarkers[i].py = -1;
         filteredMarkers++;
      }
      lmurMarkers[i].markerHidden = hideMarker;
   }

   if((W.app.map.getZoom() < 11) && (!lmurGetCBChecked('_cbClusteringDisabled')))
   {
      var clusterDist = Math.min(Math.floor(W.app.map._size.y / 20),Math.floor(W.app.map._size.x / 20));
      var marker_rad = clusterDist / 3;
      if(marker_rad < 10) marker_rad = 10;
      var threshold = 1;

      if(lmurMarkers.length > 1)
      {
         for(i=0;i<lmurMarkers.length-1;i++)
         {
            if(!lmurMarkers[i].markerHidden)
            {
               if(lmurCacheExpiryPeriod === 0)
               {
                  fillOpacity = 1;
               }
               else
               {
                  fillOpacity = 1 - ((lmurGetMarkerAge(lmurMarkers[i]) * 0.9) / lmurCacheExpiryPeriod);
               }
               if(fillOpacity < 0.1) fillOpacity = 0.1;
               var clusterSize = 1;
               var clusterX = lmurMarkers[i].px;
               var clusterY = lmurMarkers[i].py;
               var xmin = lmurMarkers[i].px-clusterDist;
               var xmax = lmurMarkers[i].px+clusterDist;
               var ymin = lmurMarkers[i].py-clusterDist;
               var ymax = lmurMarkers[i].py+clusterDist;
               for(var j=i+1;j<lmurMarkers.length;j++)
               {
                  if(!lmurMarkers[j].markerHidden)
                  {
                     if((lmurMarkers[j].px > xmin)&&(lmurMarkers[j].px < xmax)&&(lmurMarkers[j].py > ymin)&&(lmurMarkers[j].py < ymax))
                     {
                        clusterSize++;
                        clusterX += lmurMarkers[j].px;
                        clusterY += lmurMarkers[j].py;
                        lmurMarkers[j].markerHidden = true;
                     }
                  }
               }
               if(clusterSize > threshold)
               {
                  lmurMarkers[i].markerHidden = true;
                  var cx = clusterX / clusterSize;
                  var cy = clusterY / clusterSize;
                  svgSrc += '<circle cx="'+cx+'" cy="'+cy+'" r="'+marker_rad+'" style="fill:black;stroke:white;fill-opacity:'+fillOpacity+';stroke-opacity:1"/>';
                  svgSrc += '<text x="'+cx+'" y="'+cy+'" font-size="12" fill="white" style="text-anchor: middle" dy="5">'+clusterSize+'</text>';
               }
            }
         }
      }
   }

   for(i=0;i<lmurMarkers.length;i++)
   {
      if(!lmurMarkers[i].markerHidden)
      {
         ureq = lmurMarkers[i];
         if(lmurCacheExpiryPeriod === 0)
         {
            fillOpacity = 1;
         }
         else
         {
            fillOpacity = 1 - ((lmurGetMarkerAge(ureq) * 0.9) / lmurCacheExpiryPeriod);
         }
         if(fillOpacity < 0.1) fillOpacity = 0.1;
         if(ureq.type == 1)
         {
            if(ureq.obj.resolvedOn !== null)
            {
               svgSrc += '<circle cx="'+ureq.px+'" cy="'+(ureq.py+7)+'" r="9" style="fill:white;stroke:black;fill-opacity:'+fillOpacity+';stroke-opacity:1"/>';
            }
            svgSrc += '<rect x="'+ureq.px+'" y="'+ureq.py+'" transform="rotate(45,'+ureq.px+','+ureq.py+')" width="10" height="10" style="fill:red;stroke:blue;fill-opacity:'+fillOpacity+';stroke-opacity:1"/>';
         }
         else if(ureq.type == 2)
         {
            if(ureq.obj.resolvedOn !== null)
            {
               svgSrc += '<circle cx="'+ureq.px+'" cy="'+(ureq.py)+'" r="9" style="fill:white;stroke:black;fill-opacity:'+fillOpacity+';stroke-opacity:1"/>';
            }
            if(ureq.obj.subType == 200)
            {
               svgSrc += '<circle cx="'+ureq.px+'" cy="'+ureq.py+'" r="5" style="fill:blue;stroke:red;fill-opacity:'+fillOpacity+';stroke-opacity:1"/>';
            }
            else
            {
               svgSrc += '<rect x="'+(ureq.px-5)+'" y="'+(ureq.py-5)+'" width="10" height="10" style="fill:green;stroke:red;fill-opacity:'+fillOpacity+';stroke-opacity:1"/>';
            }
         }
         else if(ureq.type == 4)
         {
            svgSrc += '<polygon points="'+(ureq.px+0)+','+(ureq.py+5)+' '+(ureq.px+5)+','+(ureq.py+1)+' '+(ureq.px+3)+','+(ureq.py-5)+' '+(ureq.px-3)+','+(ureq.py-5)+' '+(ureq.px-5)+','+(ureq.py+1)+'" style="fill:yellow;stroke:black;fill-opacity:'+fillOpacity+';stroke-opacity:1"/>';
         }
      }
   }

   svgSrc += '</svg>';
   lmurDiv.innerHTML = svgSrc;
   lmurDiv.style.visibility = '';
}

function lmurInitDrag()
{
   lmurShowTrace('lmurInitDrag');
   lmurAddLog('inhibiting nudge detection');
   lmurInhibitNudgeDetection = true;
   lmurDiv.style.visibility = 'hidden';
}

function lmurEndDrag()
{
   lmurShowTrace('lmurEndDrag');
   lmurAddLog('re-enabling nudge detection');
   lmurInhibitNudgeDetection = false;
   lmurDiv.style.visibility = '';
}

function lmurMouseInUI()
{
   lmurShowTrace('lmurMouseInUI');
   lmurInhibitCacheRefresh = true;
}
function lmurMouseOutUI()
{
   lmurShowTrace('lmurMouseOutUI');
   lmurInhibitCacheRefresh = false;
}

function lmurChangeDecayPeriod()
{
   lmurShowTrace('lmurChangeDecayPeriod');
   var userDecayValue = document.getElementById('_inputCacheDecayPeriod').value;
   lmurCacheExpiryPeriod = (parseInt(userDecayValue) * 60);
}

/*
function lmurNativeMarkerFiltering()
{
console.log('do native marker filtering');
   var nativeLayers = W.controller._mapView.map._layers;

   for(var layerID in nativeLayers)
   {
      if(nativeLayers[layerID]._icon != undefined)
      {
         var markerVisibility = "visible";
         if((document.getElementById('_cbShowNativeMarkerUpdates').checked == true) && (lmurEnabled == true))
         {
            if(nativeLayers[layerID].view != undefined)
            {
               var markerType = nativeLayers[layerID].view.model.type;
               if((document.getElementById('_cbHideNativeUserMarkers').checked == true) && (markerType == "user"))
               {
console.log(nativeLayers[layerID]);
                  markerVisibility = "hidden";
               }
               if((document.getElementById('_cbHideNativeAlertMarkers').checked == true) && (markerType == "alert"))
               {
console.log(nativeLayers[layerID]);
                  markerVisibility = "hidden";
               }
               if(document.getElementById('_cbHideNativeTrafficMarkers').checked == true)
               {
               }
            }
         }
         nativeLayers[layerID]._icon.style.visibility = markerVisibility;
      }
   }
console.log('done');
}
*/

function lmurCheckActivation()
{
   lmurShowTrace('lmurCheckActivation');
   lmurEnabled = lmurGetCBChecked('_cbEnableLMUR');

   var mapObj = document.getElementById("map");
   mapObj.onmouseup = null;
   mapObj.onmousedown = null;

   if
   (
      ((lmurGetCBChecked('_cbEnablePlayMode')) && (!lmurPlayModeEnabled)) ||
      ((!lmurGetCBChecked('_cbEnablePlayMode')) && (lmurPlayModeEnabled))
   )
   {
      lmurInhibitCacheRefresh = false;
      lmurResetCaches();
   }
   lmurPlayModeEnabled = lmurGetCBChecked('_cbEnablePlayMode');

   var lsp = document.getElementsByClassName('leaflet-shadow-pane');
   //var lop = document.getElementsByClassName('leaflet-overlay-pane');
   var lmp = document.getElementsByClassName('leaflet-marker-pane');
   if(lmurGetCBChecked('_cbHideNativeMarkers'))
   {
      if(lsp.length > 0) lsp[0].style.visibility = 'hidden';
      //if(lop.length > 0) lop[0].style.visibility = 'hidden';
      if(lmp.length > 0) lmp[0].style.visibility = 'hidden';
   }
   else
   {
      if(lsp.length > 0) lsp[0].style.visibility = '';
      //if(lop.length > 0) lop[0].style.visibility = '';
      if(lmp.length > 0) lmp[0].style.visibility = '';
   }

   if
   (
      (!lmurGetCBChecked('_cbShowURs')) &&
      (!lmurGetCBChecked('_cbShowProblems')) &&
      (!lmurGetCBChecked('_cbShowTurnProbs')) &&
      (!lmurGetCBChecked('_cbShowPlaceUpdates'))
   )
   {
      lmurDiv.innerHTML = '';
      return;
   }

   lmurControlsEnabled = true;
   lmurNoForcedRefreshThisCycle = false;
   lmurAddLog('re-visualising after CheckActivation call');

   lmurUpdateRequestQueue();
   if(lmurDownloadRequests.length === 0) lmurVisualiseMarkers();

   mapObj.onmouseup = lmurEndDrag;
   mapObj.onmousedown = lmurInitDrag;
}


function lmurDateToDays(dateToConvert)
{
   lmurShowTrace('lmurDateToDays');
   if(dateToConvert === 0)
   {
      return 999999;
   }

   var dateNow = new Date();

   var elapsedSinceEpoch = dateNow.getTime();
   var elapsedSinceEvent = elapsedSinceEpoch - dateToConvert;

   dateNow.setHours(0);
   dateNow.setMinutes(0);
   dateNow.setSeconds(0);
   dateNow.setMilliseconds(0);

   var elapsedSinceMidnight = elapsedSinceEpoch - dateNow.getTime();

   if(elapsedSinceEvent < elapsedSinceMidnight)
   {
      // event occurred today...
      return 0;
   }
   else
   {
      // event occurred at some point prior to midnight this morning, so return a minimum value of 1...
      return 1 + Math.floor((elapsedSinceEvent - elapsedSinceMidnight) / 86400000);
   }
}

function lmurGetURAge(urObj,whichAgeToGet)
{
   lmurShowTrace('lmurGetURAge '+whichAgeToGet);
   var uroDate = -1;
   if(whichAgeToGet === 0)
   {
      if(urObj.driveDate !== null)
      {
         uroDate = urObj.driveDate;
         return lmurDateToDays(uroDate);
      }
      else return 999999;
   }
   else if(whichAgeToGet == 1)
   {
      if(urObj.updatedOn !== null)
      {
         uroDate = urObj.updatedOn;
         return lmurDateToDays(uroDate);
      }
      else return 999999;
   }
   else if(whichAgeToGet == 2)
   {
      if((urObj.resolvedOn !== undefined) && (urObj.resolvedOn !== null))
      {
         uroDate = urObj.resolvedOn;
         return lmurDateToDays(uroDate);
      }
      else return 999999;
   }
   else if(whichAgeToGet == 3)
   {
      if(urObj.venueUpdateRequests[0].dateAdded !== undefined)
      {
         uroDate = urObj.venueUpdateRequests[0].dateAdded;
         return lmurDateToDays(uroDate);
      }
      else return 999999;
   }
   else return 999999;
}

function lmurParseDaysAgo(days)
{
   lmurShowTrace('lmurParseDaysAgo');
  if(days === 0) return 'today';
  else if(days == 1) return '1 day ago';
  else return days+' days ago';
}

function lmurCheckOverMarker(e)
{
   lmurShowTrace('lmurCheckOverMarker');
   if(!lmurEnabled)
   {
      return;
   }

   var mouseX = e.pageX;
   var mouseY = e.pageY;
   var result = '';

   var urpos = new L.LatLng(0,0);
   var daysOld;
   var ureq;
   var urpix;
   var urAge;

   for(var i=0;i<lmurMarkers.length;i++)
   {
      if(!lmurMarkers[i].markerHidden)
      {
         ureq = lmurMarkers[i];
         urpos.lng = ureq.pos.lng;
         urpos.lat = ureq.pos.lat;
         urpix = W.app.map.latLngToContainerPoint(urpos);
         if(lmurMarkers[i].type == 1)
         {
            if((mouseX >= urpix.x - 5) && (mouseX < urpix.x + 10) && (mouseY >= urpix.y - 5) && (mouseY < urpix.y + 10))
            {
               ureq = lmurMarkers[i].obj;
               urAge = lmurGetMarkerAge(lmurMarkers[i]);
               if(urAge === null) urAge = '>'+lmurCacheExpiryPeriod;
               var ureqTypeText;
               if(ureq.type == 6) ureqTypeText = "Incorrect turn";
               else if(ureq.type == 7) ureqTypeText = "Incorrect address";
               else if(ureq.type == 8) ureqTypeText = "Incorrect route";
               else if(ureq.type == 9) ureqTypeText = "Missing roundabout";
               else if(ureq.type == 10) ureqTypeText = "General error";
               else if(ureq.type == 11) ureqTypeText = "Turn not allowed";
               else if(ureq.type == 12) ureqTypeText = "Incorrect junction";
               else if(ureq.type == 13) ureqTypeText = "Missing bridge overpass";
               else if(ureq.type == 14) ureqTypeText = "Wrong driving direction";
               else if(ureq.type == 15) ureqTypeText = "Missing exit";
               else if(ureq.type == 16) ureqTypeText = "Missing road";
               else if(ureq.type == 19) ureqTypeText = "Blocked road";
               else ureqTypeText = "Unknown";

               result = '<b>Update Request: ' + ureqTypeText + '</b>';
               if(ureq.description !== null)
               {
                  result += '<br>' + ureq.description.replace(/<\/?[^>]+(>|$)/g, "");
               }
               daysOld = lmurGetURAge(ureq,0);
               if(daysOld != 999999)
               {
                  result += '<br><i>Submitted ' + lmurParseDaysAgo(daysOld) + '</i>';
               }
               daysOld = lmurGetURAge(ureq,2);
               if(daysOld != 999999)
               {
                  result += '<br><i>Resolved ' + lmurParseDaysAgo(daysOld) + '</i>';
               }

               var nComments = lmurMarkers[i].nComments;
               if(nComments == -1)
               {
                  result += '<br><i>Waiting for comment data...</i>';
               }
               else
               {
                  result += '<br><i>UR has ' + nComments + ' comment';
                  if(nComments != 1) result += 's';
                  result += '</i>';
               }
               result += '<br><small>(Data refreshed '+urAge+'s ago)</small>';
               break;
            }
         }
         else
         {
            if((mouseX >= urpix.x - 5) && (mouseX < urpix.x + 5) && (mouseY >= urpix.y - 10) && (mouseY < urpix.y + 5))
            {
               urAge = lmurGetMarkerAge(lmurMarkers[i]);
               if(urAge === null) urAge = '>'+lmurCacheExpiryPeriod;
               if(lmurMarkers[i].type == 2)
               {
                  ureq = lmurMarkers[i].obj;
                  if(ureq.subType == 200)
                  {
                     result = '<b>Turn Problem: ';
                  }
                  else
                  {
                     result = '<b>Map Problem: ';
                  }
                  if(ureq.subType == 101) result += 'Driving direction mismatch';
                  else if(ureq.subType == 102) result += 'Missing junction';
                  else if(ureq.subType == 103) result += 'Missing road';
                  else if(ureq.subType == 104) result += 'Cross roads junction missing';
                  else if(ureq.subType == 105) result += 'Road type mismatch';
                  else if(ureq.subType == 106) result += 'Restricted turn might be allowed';
                  else if(ureq.subType == 200) result += 'The displayed route is frequently not taken by users';
                  else if(ureq.subType == 300) result += 'Road closure request';
                  else result += 'Unknown problem type ('+ureq.subType+')';
                  result += '</b><br>';
                  if(ureq.weight <= 3) result += 'Severity: Low';
                  else if(ureq.weight <= 7) result += 'Severity: Medium';
                  else result += 'Severity: High';
               }
               else if(lmurMarkers[i].type == 4)
               {
                  ureq = lmurMarkers[i].obj;
                  result = '<b>Place Update</b><br>';
                  var putype;
                  for(var loop=0; loop<ureq.venueUpdateRequests.length; loop++)
                  {
                     putype = ureq.venueUpdateRequests[loop].type;
                     result += 'Type: ';
                     if(putype == 'VENUE') result += 'New place';
                     else if(putype == 'IMAGE') result += 'New Photo';
                     else if(putype == 'REQUEST') result += 'Change Details';
                     else result += putype;
                     result += '<br>';
                  }
	               daysOld = lmurGetURAge(ureq,3);
                  if(daysOld != 999999)
                  {
                     result += '<br><i>Received ' + lmurParseDaysAgo(daysOld) + '</i>';
               	}
               }
               daysOld = lmurGetURAge(ureq,2);
               if(daysOld != 999999)
               {
                  result += '<br><i>Resolved ' + lmurParseDaysAgo(daysOld) + '</i>';
               }
               result += '<br><small>(Data refreshed '+urAge+'s ago)</small>';
               break;
            }
         }
      }
   }
   if(result === '')
   {
      lmurPopup.style.visibility = 'hidden';
   }
   else if(lmurPopup.style.visibility == 'hidden')

   {
      lmurPopup.innerHTML = result;
      var posX = mouseX;
      var posY = mouseY;
      var mapWidth = W.app.map._size.x;
      var mapHeight = W.app.map._size.y;
      if((posX + lmurPopup.clientWidth) > mapWidth) posX = mapWidth - lmurPopup.clientWidth;
      if((posY + lmurPopup.clientHeight + 10) > mapHeight) posY = mapHeight - lmurPopup.clientHeight - 10;
      else posY += 10;
      lmurPopup.style.left = posX + 'px';
      lmurPopup.style.top = posY + 'px';
      lmurPopup.style.visibility = 'visible';
   }
}


function lmurToggleDebug()
{
   lmurShowTrace('lmurToggleDebug');
   lmurShowDebugOutput = !lmurShowDebugOutput;
   var dbgMode = "none";
   if(lmurShowDebugOutput)
   {
      dbgMode = "inline";
   }
   document.getElementById('_lmurDebugMode').style.display = dbgMode;
}


function lmurDumpDebug()
{
   lmurShowTrace('lmurDumpDebug');
   var debug = '';
   for(var i=0;i<lmurMarkers.length;i++)
   {
      var ureq = lmurMarkers[i];
      debug += ureq.pos.lng+',';
      debug += ureq.pos.lat+',';
      debug += ureq.type+',';
      debug += ureq.nComments+',';
      if(ureq.obj.resolvedOn === null) debug += '1<br>';
      else debug += '0<br>';
   }
   document.body.innerHTML = debug;
}

function lmurUpdateHeader()
{
   lmurShowTrace('lmurUpdateHeader');

   if(document.getElementById('lmurHeader') === null)
   {
      setTimeout(lmurUpdateHeader,100);
      return;
   }

   lmurUpdateURL = 'https://greasyfork.org/en/scripts/1948-livemap-ur-overlay';

   var tHTML = '<img id="_minimax" align=left valign=middle src="';
   if(!lmurControlsHidden)
   {
      tHTML += lmurIcons[0];
   }
   else
   {
      tHTML += lmurIcons[1];
   }
   tHTML += '"/>';
   tHTML += '<b><a href="'+lmurUpdateURL+'" target="_blank">LMUR</a></b> <label id="_lmurVersion">v'+lmurVersion+'</label>';
   tHTML += '<label id="_lmurDebugMode">(dbg)</label>';

   tHTML += '&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" style="opacity:1;position:relative;" id="_cbEnableLMUR"';
   if(lmurEnabled) tHTML += ' checked';
   tHTML += '>Enabled</a>';
   lmurDragBar.innerHTML = tHTML;
   var dbgMode = "none";
   if(lmurShowDebugOutput)
   {
      dbgMode = "inline";
   }
   document.getElementById('_lmurDebugMode').style.display = dbgMode;
   document.getElementById('_cbEnableLMUR').addEventListener("click", lmurCheckActivation, true);
   document.getElementById('_lmurVersion').addEventListener("click", lmurToggleDebug, true);
   document.getElementById('_lmurDebugMode').addEventListener("dblclick", lmurDumpDebug, true);
}

function lmurShowHideCtrls(tab)
{
   lmurShowTrace('lmurShowHideCtrls');
   if(lmurControlsMinimised[tab])
   {
      lmurControlsMinimised[tab] = false;
      document.getElementById(lmurControlsID[tab]).style.height = 'auto';
      document.getElementById(lmurControlsID[tab]).style.overflow = 'visible';
      document.getElementById(lmurControlsImg[tab]).src = lmurIcons[0];
   }
   else
   {
      lmurControlsMinimised[tab] = true;
      document.getElementById(lmurControlsID[tab]).style.height = '0px';
      document.getElementById(lmurControlsID[tab]).style.overflow = 'hidden';
      document.getElementById(lmurControlsImg[tab]).src = lmurIcons[1];
   }
   lmurInnerHeight = -1;
   lmurShowControls();
}

function lmurShowHideURCtrls()
{
   lmurShowTrace('lmurShowHideURCtrls');
   lmurShowHideCtrls(0);
}

function lmurShowHideMPCtrls()
{
   lmurShowTrace('lmurShowHideMPCtrls');
   lmurShowHideCtrls(1);
}

function lmurShowHidePURCtrls()
{
   lmurShowTrace('lmurShowHidePURCtrls');
   lmurShowHideCtrls(2);
}

/*
function lmurShowHideNativeMarkerCtrls()
{
   lmurShowHideCtrls(3);
}
*/

function lmurShowHideOptions()
{
   lmurShowTrace('lmurShowHideOptions');
   lmurShowHideCtrls(4);
}

function lmurShowControls()
{
   lmurShowTrace('lmurShowControls');
   lmurControlsHidden = false;
   lmurUpdateHeader();
   document.getElementById('_minimax').addEventListener('click', lmurHideControls, false);

   if(window.innerHeight != lmurInnerHeight)
   {
      lmurInnerHeight = window.innerHeight;
      var htop = document.getElementsByClassName('leaflet-top')[0].offsetTop + document.getElementById('lmurHeader').offsetTop + 10;
      var hmax = window.innerHeight - htop - 100;
      document.getElementById('lmurCtrls').style.height = 'auto';
      document.getElementById('lmurCtrls').style.height = document.getElementById('lmurCtrls').clientHeight + 1 + 'px';

      if(document.getElementById('lmurCtrls').clientHeight > hmax)
      {
         document.getElementById('lmurCtrls').style.height = hmax+'px';
      }
      lmurUIHeight = document.getElementById('lmurCtrls').style.height;
      document.getElementById('lmurCtrls').scrollTop = 0;
   }
   else
   {
      document.getElementById('lmurCtrls').style.height = lmurUIHeight;
   }
   document.getElementById('lmurCtrls').style.overflow = 'auto';
}

function lmurHideControls()
{
   lmurShowTrace('lmurHideControls');
   lmurControlsHidden = true;
   lmurUpdateHeader();
   document.getElementById('_minimax').addEventListener('click', lmurShowControls, false);

   document.getElementById('lmurCtrls').style.height = '0px';
   document.getElementById('lmurCtrls').style.overflow = 'hidden';
}

function lmurAddCheckbox(id, text, addbr)
{
   var retval = '<input type="checkbox" id="' + id + '" style="opacity:1; position:relative;">' + text + '</input>';
   if(addbr) retval += '<br>';
   return retval;
}
function lmurAddNumInput(id, text, min, size, addbr)
{
   var retval = '<input type="number" min="' + min +'" size="' + size + '" style="width:50px;height:auto;padding:0;" id="' + id + '"> ' + text;
   if(addbr) retval += '<br>';
   return retval;
}
function lmurAddTextInput(id, text, addbr)
{
   var retval = '<input type="text" style="line-height:14px;height:auto;margin-bottom:4px;" id="' + id + '"> ' + text;
   if(addbr) retval += '<br>';
   return retval;
}
function lmurAddRadioBtn(id, group, text, ischecked, addbr)
{
   var retval = '<input type="radio" style="opacity:1; position:relative;" name="' + group + '" id="' + id + '"';
   if(ischecked) retval += ' checked';
   retval += '/>' + text;
   if (addbr) retval += '<br>';
   return retval;
}

function lmurRemoveWazeStyling()
{
   var elm = null;
   var myStyle = '';

   for(var i = 0; i < document.getElementById('lmurUI').getElementsByTagName('input').length; i++)
   {
      elm = document.getElementById('lmurUI').getElementsByTagName('input')[i];
      myStyle = "opacity:1;position:relative;padding:0 0;color:#000000;";
      if(elm.type == "number") myStyle += "width:50px;height:auto;";
      else if(elm.type == "text") myStyle += "line-height:14px;height:auto;margin-bottom:4px;";
      elm.style = myStyle;
   }
}

var lmurDragging = false;
var lmurPrevMouseX;
var lmurPrevMouseY;
var lmurWindowLeft = 0;
var lmurWindowTop = 0;

function lmurCancelEvent(e)
{
   e = e ? e : window.event;
   if(e.stopPropagation)
   {
      e.stopPropagation();
   }
   if(e.preventDefault)
   {
      e.preventDefault();
   }
   e.cancelBubble = true;
   e.cancel = true;
   e.returnValue = false;
   return false;
}
function lmurDragbarMouseDown(e)
{
   lmurPrevMouseX = e.pageX;
   lmurPrevMouseY = e.pageY;
   lmurDragging = true;
   //lmurDragBar.style.cursor = 'move';
   document.body.addEventListener('mousemove', lmurDragbarMouseMove, false);
   document.body.addEventListener('mouseup', lmurDragbarMouseUp, false);
   return true;
}
function lmurDragbarMouseUp()
{
   if(lmurDragging)
   {
      lmurDragging = false;
      localStorage.LMURWindowLeft = lmurWindowLeft;
      localStorage.LMURWindowTop = lmurWindowTop;
      console.debug(lmurWindowLeft+' '+lmurWindowTop);
   }
   //lmurDragBar.style.cursor = 'auto';
   document.body.removeEventListener('mousemove', lmurDragbarMouseMove, false);
   document.body.removeEventListener('mouseup', lmurDragbarMouseUp, false);
   return true;
}
function lmurDragbarMouseMove(e)
{
   var vpHeight = window.innerHeight;
   var vpWidth = window.innerWidth;

   lmurWindowTop = parseInt(lmurWindowTop) + parseInt((e.pageY - lmurPrevMouseY));
   lmurWindowLeft = parseInt(lmurWindowLeft) + parseInt((e.pageX - lmurPrevMouseX));
   lmurPrevMouseX = e.pageX;
   lmurPrevMouseY = e.pageY;

   if(lmurWindowTop < 0) lmurWindowTop = 0;
   if(lmurWindowTop + 16 >= vpHeight) lmurWindowTop = vpHeight-16;
   if(lmurWindowLeft < 0) lmurWindowLeft = 0;
   if(lmurWindowLeft + 32 >= vpWidth) lmurWindowLeft = vpWidth-32;

   lmurWindow.style.top = lmurWindowTop+'px';
   lmurWindow.style.left = lmurWindowLeft+'px';
   return lmurCancelEvent(e);
}

function lmurFakeOnload()
{
   lmurShowTrace('lmurFakeOnload');

   lmurAddLog('onload');

   if(document.getElementById('lmurUI') === null)
   {
      lmurAddLog('  adding lmurUI container...');

      // add a new div to hold the OS Locator results, in the form of a draggable window
      lmurWindow = document.createElement('div');
      lmurWindow.id = "lmurWindow";
      lmurWindow.style.position = 'absolute';
      lmurWindow.style.border = '1px solid #BBDDBB';
      lmurWindow.style.borderRadius = '4px';
      lmurWindow.style.overflow = 'hidden';
      lmurWindow.style.zIndex = 2000;
      lmurWindow.style.opacity = 0;
      lmurWindow.style.transitionProperty = "opacity";
      lmurWindow.style.transitionDuration = "1000ms";
      lmurWindow.style.webkitTransitionProperty = "opacity";
      lmurWindow.style.webkitTransitionDuration = "1000ms";
      lmurWindow.style.boxShadow = '5px 5px 10px Silver';
      document.body.appendChild(lmurWindow);

      // dragbar div
      lmurDragBar = document.createElement('div');
      lmurDragBar.id = "lmurDragBar";
      lmurDragBar.style.backgroundColor = '#D0D0D0';
      lmurDragBar.style.padding = '4px';
      lmurDragBar.style.fontSize = '16px';
      lmurDragBar.style.lineHeight = '18px';
      lmurWindow.appendChild(lmurDragBar);

      lmurWindow.appendChild(lmurUI);
      lmurUI.id = "lmurUI";
      lmurUI.style.lineHeight = '16px';
      lmurUI.style.overflow = 'hidden';
      lmurUI.addEventListener('mouseover', lmurMouseInUI, false);
      lmurUI.addEventListener('mouseout', lmurMouseOutUI, false);
      lmurDragBar.addEventListener('mousedown', lmurDragbarMouseDown, false);
      lmurDragBar.addEventListener('mouseup', lmurDragbarMouseUp, false);

      lmurDragBar.innerHTML = '<b>LMUR v'+lmurVersion+'</b>';
      lmurWindow.style.opacity = 1;

      lmurAddLog('...done');
   }
   else
   {
      lmurAddLog('  lmurUI container already present');
   }

   var tHTML;
   if(!lmurIsLoggedIn)
   {
      tHTML = '<b><a href="'+lmurUpdateURL+'" target="_blank">LMUR</a></b> v'+lmurVersion;
      tHTML += ' - Please log-in to the Livemap server to enable LMUR operation.';
      lmurDragBar.innerHTML = tHTML;
   }
   else if(document.location.protocol == 'https:')
   {
      lmurAddLog('  adding lmurUI contents...');
      var gmapObj = document.getElementById('map');

      window.addEventListener("mousemove", lmurCheckOverMarker, false);

      gmapObj.appendChild(lmurDiv);
      gmapObj.appendChild(lmurPopup);

      tHTML = '<div id="lmurHeader">';
      tHTML += '</div>';

      tHTML += '<div id="lmurCtrls">';
      tHTML += '<div style="background-color: #DDFFDD; padding: 10px; height: auto;">';
      tHTML += '<img id="_minimaxURCtrls" align=left valign=middle src="' + lmurIcons[0] + '"/><b>UR Filtering</b>&nbsp;&nbsp;';
      tHTML += lmurAddCheckbox("_cbShowURs", '', true);
      tHTML += '<div id="lmurURCtrls" style="height: auto;">';
      tHTML += lmurAddRadioBtn("_radioShowURs", "lmurShowURs", 'Show or ', false, false);
      tHTML += lmurAddRadioBtn("_radioHideURs", "lmurShowURs", 'hide URs by type:', true, true);
      tHTML += '<div style="float: left; padding-left: 10px; padding-right: 10px; height: auto;">';
      tHTML += lmurAddCheckbox("_cbURFilterIncorrectTurn", 'Incorrect turn', true);
      tHTML += lmurAddCheckbox("_cbURFilterIncorrectAddress", 'Incorrect address', true);
      tHTML += lmurAddCheckbox("_cbURFilterIncorrectRoute", 'Incorrect route', true);
      tHTML += lmurAddCheckbox("_cbURFilterIncorrectJunction", 'Incorrect junction', true);
      tHTML += lmurAddCheckbox("_cbURFilterWazeAuto", 'Waze Automatic', true);
      tHTML += lmurAddCheckbox("_cbURFilterGeneralError", 'General error', true);
      tHTML += lmurAddCheckbox("_cbURFilterTurnNotAllowed", 'Turn not allowed', true);
      tHTML += lmurAddCheckbox("_cbURFilterUndefined", 'Undefined', true);
      tHTML += '</div>';
      tHTML += '<div style="float: left; padding-left: 10px; padding-right: 10px; height: auto;">';
      tHTML += lmurAddCheckbox("_cbURFilterMissingRoundabout",'Missing roundabout', true);
      tHTML += lmurAddCheckbox("_cbURFilterMissingBridgeOverpass", 'Missing bridge overpass' ,true);
      tHTML += lmurAddCheckbox("_cbURFilterMissingExit", 'Missing exit', true);
      tHTML += lmurAddCheckbox("_cbURFilterMissingRoad", 'Missing road', true);
      tHTML += lmurAddCheckbox("_cbURFilterMissingLandmark", 'Missing landmark', true);
      tHTML += lmurAddCheckbox("_cbURFilterWrongDrivingDirection", 'Wrong driving direction', true);
      tHTML += lmurAddCheckbox("_cbURFilterBlockedRoad", 'Blocked Road', true);
      tHTML += '<br>';
      tHTML += '</div>';
      tHTML += '<div style="clear: both;"></div>';
      tHTML += '<div style="float: left; padding-left: 10px; padding-right: 10px; background-color: #CCEECC"; height: auto;>';
      tHTML += '<i>Tagged URs</i><br>';
      tHTML += lmurAddCheckbox("_cbURFilterRoadworks", '[ROADWORKS]', true);
      tHTML += lmurAddCheckbox("_cbURFilterConstruction", '[CONSTRUCTION]', true);
      tHTML += lmurAddCheckbox("_cbURFilterNote", '[NOTE]', true);
      tHTML += '</div>';
      tHTML += '<div style="float: left; padding-left: 10px; padding-right: 10px; background-color: #CCEECC"; height: auto;>';
      tHTML += '<br>';
      tHTML += lmurAddCheckbox("_cbURFilterClosure", '[CLOSURE]', true);
      tHTML += lmurAddCheckbox("_cbURFilterEvent", '[EVENT]', true);
      tHTML += '&nbsp;';
      tHTML += '</div>';
      tHTML += '<div style="clear: both;"></div>';
      tHTML += '<br>';
      tHTML += lmurAddCheckbox("_cbUREnableResolvedFilter", 'Hide resolved URs', true);
      tHTML += lmurAddCheckbox("_cbUREnableMinAgeFilter", 'Hide URs less than ', false);
      tHTML += lmurAddNumInput("_inputURFilterMinDays", 'days old', 1, 3, true);
      tHTML += lmurAddCheckbox("_cbUREnableMaxAgeFilter", 'Hide URs more than ', false);
      tHTML += lmurAddNumInput("_inputURFilterMaxDays", 'days old', 1, 3, true);
      tHTML += '<br>';
      tHTML += lmurAddCheckbox("_cbURHideWithNoDescription", 'Hide or ', false);
      tHTML += lmurAddCheckbox("_cbURShowWithNoDescription", 'show URs with no description', true);
      tHTML += lmurAddCheckbox("_cbUREnableKeywordMustBePresent", 'Hide URs not including ', false);
      tHTML += lmurAddTextInput("_textURKeywordPresent", 'in their description', true);
      tHTML += lmurAddCheckbox("_cbUREnableKeywordMustBeAbsent", 'Hide URs including ', false);
      tHTML += lmurAddTextInput("_textURKeywordAbsent", 'in their description', true);
      tHTML += lmurAddCheckbox("_cbURCaseInsensitive", 'Case-insensitive matching', true);
      tHTML += '<br><br>Filter URs by comments:<br>';
      tHTML += lmurAddCheckbox("_cbURHideUnloadedComments", 'Hide or ', false);
      tHTML += lmurAddCheckbox("_cbURShowUnloadedComments", 'show URs where comment data has not been received from server', true);
      tHTML += '<br>';
      tHTML += lmurAddCheckbox("_cbURHideWithMyComments", 'Hide or ', false);
      tHTML += lmurAddCheckbox("_cbURShowWithMyComments", 'show URs with comments from me', true);
      tHTML += lmurAddCheckbox("_cbURHideLastCommentByMe", 'Hide or ', false);
      tHTML += lmurAddCheckbox("_cbURShowLastCommentByMe", 'show URs last commented on by me', true);
      tHTML += lmurAddCheckbox("_cbURHideLastCommentByReporter", 'Hide or ', false);
      tHTML += lmurAddCheckbox("_cbURShowLastCommentByReporter", 'show URs last commented on by reporter', true);
      tHTML += lmurAddCheckbox("_cbURHideWithLessThanComments", 'Hide or ', false);
      tHTML += lmurAddCheckbox("_cbURShowWithLessThanComments", 'show with less than ', false);
      tHTML += lmurAddNumInput("_inputFilterMinComments", 'comments', 0, 3, true);
      tHTML += lmurAddCheckbox("_cbURHideFollowedURs", 'Hide or ', false);
      tHTML += lmurAddCheckbox("_cbURShowFollowedURs", 'show URs I\'m following', true);
      tHTML += lmurAddCheckbox("_cbURHideLastCommentAge", 'Hide or ', false);
      tHTML += lmurAddCheckbox("_cbURShowLastCommentAge", 'show if last comment made less than ', false);
      tHTML += lmurAddNumInput("_inputFilterCommentAge", 'days ago', 0, 3, true);
      tHTML += '<br>';
      tHTML += lmurAddCheckbox("_cbEnablePlayMode", 'Show UR markers outside my editable area', true);
      tHTML += '</div>';
      tHTML += '</div>';

      tHTML += '<div style="background-color: #DDDDFF; padding: 10px; height: auto;">';
      tHTML += '<img id="_minimaxMPCtrls" align=left valign=middle src="' + lmurIcons[0] + '"/><b>MP Filtering</b>&nbsp;&nbsp;';
      tHTML += lmurAddCheckbox("_cbShowProblems", '', true);
      tHTML += '<div id="lmurMPCtrls" style="height: auto;">';
      tHTML += lmurAddRadioBtn("_radioShowProblems", "lmurShowProblems", 'Show or ', false, false);
      tHTML += lmurAddRadioBtn("_radioHideProblems", "lmurShowProblems", 'hide map problems by type:', true, true);
      tHTML += '<div style="float: left; padding-left: 10px; padding-right: 10px; height: auto;">';
      tHTML += lmurAddCheckbox("_cbMPFilterMissingJunction", 'Missing junction', true);
      tHTML += lmurAddCheckbox("_cbMPFilterMissingRoad", 'Missing road', true);
      tHTML += lmurAddCheckbox("_cbMPFilterCrossroadsJunctionMissing", 'Missing crossroads', true);
      tHTML += '</div>';
      tHTML += '<div style="float: left; padding-left: 10px; padding-right: 10px; height: auto;">';
      tHTML += lmurAddCheckbox("_cbMPFilterDrivingDirectionMismatch", 'Driving direction mismatch', true);
      tHTML += lmurAddCheckbox("_cbMPFilterRoadTypeMismatch", 'Road type mismatch', true);
      tHTML += lmurAddCheckbox("_cbMPFilterRoadClosure", 'Road closure', true);
      tHTML += '</div>';
      tHTML += '<div style="float: left; padding-left: 10px; padding-right: 10px; height: auto;">';
      tHTML += lmurAddCheckbox("_cbMPFilterRestrictedTurn", 'Restricted turn might be allowed', true);
      tHTML += lmurAddCheckbox("_cbMPFilterUnknownProblem", 'Unknown problem type', true);
      tHTML += '</div>';
      tHTML += '<div style="clear: both;"></div>';
      tHTML += '<br>';
      tHTML += lmurAddCheckbox("_cbMPEnableResolvedFilter", 'Hide resolved Problems', true);
      tHTML += '<br>';
      tHTML += 'Hide problems by severity:<br>';
      tHTML += lmurAddCheckbox("_cbMPFilterLowSeverity", 'Low', false);
      tHTML += lmurAddCheckbox("_cbMPFilterMediumSeverity", 'Medium', false);
      tHTML += lmurAddCheckbox("_cbMPFilterHighSeverity", 'High', true);
      tHTML += '<br>';
      tHTML += lmurAddCheckbox("_cbShowTurnProbs", 'Show Turn Problems', true);
      tHTML += lmurAddCheckbox("_cbTPEnableResolvedFilter", 'Hide resolved Turn Problems', false);
      tHTML += '</div>';
      tHTML += '</div>';

      tHTML += '<div style="background-color: #FFDDDD; padding: 10px; height: auto;">';
      tHTML += '<img id="_minimaxPURCtrls" align=left valign=middle src="' + lmurIcons[0] + '"/><b>PUR Filtering</b>&nbsp;&nbsp;';
      tHTML += lmurAddCheckbox("_cbShowPlaceUpdates", '', true);
      tHTML += '<div id="lmurPURCtrls" style="height: auto;">';
      tHTML += lmurAddRadioBtn("_radioShowPURs", "lmurShowPURs", 'Show or ', false, false);
      tHTML += lmurAddRadioBtn("_radioHidePURs", "lmurShowPURs", 'hide PURs by type:', true, true);
      tHTML += '<div style="float: left; padding-left: 10px; padding-right: 10px; height: auto;">';
      tHTML += lmurAddCheckbox("_cbPURFilterNewPlace", 'New place', true);
      tHTML += lmurAddCheckbox("_cbPURFilterUpdateDetails", 'Updated details', true);
      tHTML += lmurAddCheckbox("_cbPURFilterNewPhoto", 'New photo', true);
      tHTML += lmurAddCheckbox("_cbPURFilterFlagged", 'Flagged for attention', true);
      tHTML += lmurAddCheckbox("_cbPURNonZeroLockRank", 'Non-zero lockRank', true);

      tHTML += '</div>';
      tHTML += '<div style="clear: both;"></div>';
      tHTML += lmurAddCheckbox("_cbPUREnableMinAgeFilter", 'Hide PURs less than ', false);
      tHTML += lmurAddNumInput("_inputPURFilterMinDays", 'days old', 1, 3, true);
      tHTML += lmurAddCheckbox("_cbPUREnableMaxAgeFilter", 'Hide PURs more than ', false);
      tHTML += lmurAddNumInput("_inputPURFilterMaxDays", 'days old', 1, 3, true);
      tHTML += lmurAddCheckbox("_cbPURFilterResidential", 'Hide Residential PURs', true);
      tHTML += lmurAddCheckbox("_cbPURFilterNonResidential", 'Hide Non-residential PURs', true);
      tHTML += '<br>';
      tHTML += '</div>';
      tHTML += '</div>';

      /*
      tHTML += '<div style="background-color: #FFFF00; padding: 10px; height: auto;">';
      tHTML += '<img id="_minimaxNativeMarkerCtrls" align=left valign=middle src="' + lmurIcons[0] + '"/><b>Native Marker Filtering</b>&nbsp;&nbsp;<input type="checkbox" id="_cbShowNativeMarkerUpdates" /><br>';
      tHTML += '<div id="lmurNativeMarkerCtrls">';
      tHTML += 'Hide native Livemap markers:<br>';
      tHTML += '<input type="checkbox" id="_cbHideNativeMarkers">Hide Livemap markers</input><br>';
      tHTML += '<input type="checkbox" id="_cbHideNativeUserMarkers">Users</input><br>';
      tHTML += '<input type="checkbox" id="_cbHideNativeAlertMarkers">Alerts</input><br>';
      tHTML += '<input type="checkbox" id="_cbHideNativeTrafficMarkers">Traffic</input><br>';
      tHTML += '<br>';
      tHTML += '</div>';
      tHTML += '</div>';
      */

      tHTML += '<div style="background-color: #EEEEEE; padding: 10px; height: auto;">';
      tHTML += '<img id="_minimaxLMURCtrls" align=left valign=middle src="' + lmurIcons[0] + '"/><b>Options</b><br>';
      tHTML += '<div id="lmurOptions" style="height: auto;">';
      tHTML += 'Select Server: ';
      tHTML += lmurAddRadioBtn("_radioROWServer", "lmurSelectServer", 'RoW ', false, false);
      tHTML += lmurAddRadioBtn("_radioUSAServer", "lmurSelectServer", 'USA ', false, false);
      tHTML += lmurAddRadioBtn("_radioIsraelServer", "lmurSelectServer", 'Israel', false, true);
      tHTML += lmurAddCheckbox("_cbHideNativeMarkers", 'Hide Livemap markers', true);
      tHTML += lmurAddCheckbox("_cbClusteringDisabled", 'Disable marker clustering', true);
      tHTML += lmurAddCheckbox("_cbHighlightDisabled", 'Disable cached area highlight', true);
      tHTML += 'Removed cached blocks after ';
      tHTML += lmurAddNumInput("_inputCacheDecayPeriod", 'minutes', 0, 1440, true);
      tHTML += '<i>(Range is 0-1440 minutes, 0 = never remove)</i>';
      tHTML += '</div>';
      tHTML += '<div style="clear: both;"></div>';
      tHTML += '</div>';
      tHTML += '</div>';

      tHTML += '</div>';

      lmurUI.innerHTML = tHTML;
      lmurAddLog('  ...done');
      lmurUI.style.backgroundColor = '#FFFFFF';
      lmurShowHideURCtrls();
      lmurShowHideMPCtrls();
      lmurShowHidePURCtrls();
      ////lmurShowHideNativeMarkerCtrls();
      lmurShowHideOptions();
      lmurHideControls();
      lmurUI.addEventListener("click", lmurCheckActivation, true);
      document.getElementById('_inputCacheDecayPeriod').addEventListener("change", lmurChangeDecayPeriod, true);
      document.getElementById('_radioROWServer').addEventListener("click", lmurChangeServer, true);
      document.getElementById('_radioUSAServer').addEventListener("click", lmurChangeServer, true);
      document.getElementById('_radioIsraelServer').addEventListener("click", lmurChangeServer, true);

      document.getElementById('_minimaxURCtrls').addEventListener("click", lmurShowHideURCtrls, true);
      document.getElementById('_minimaxMPCtrls').addEventListener("click", lmurShowHideMPCtrls, true);
      document.getElementById('_minimaxPURCtrls').addEventListener("click", lmurShowHidePURCtrls, true);
      document.getElementById('_minimaxLMURCtrls').addEventListener("click", lmurShowHideOptions, true);
      ////document.getElementById('_minimaxNativeMarkerCtrls').addEventListener("click", lmurShowHideNativeMarkerCtrls, true);
      lmurPrevCentre = W.app.map.getCenter();
      lmurPopup.style.visibility = 'hidden';

      if
      (
         (localStorage.LMURWindowTop === undefined)||
         (localStorage.LMURWindowLeft === undefined)||
         (localStorage.LMURWindowTop === "NaN")||
         (localStorage.LMURWindowLeft === "NaN")||
         (localStorage.LMURWindowTop > window.innerHeight)||
         (localStorage.LMURWindowLeft > window.innerWidth)||
         (localStorage.LMURWindowTop < 0)||
         (localStorage.LMURWindowLeft < 0)
      )
      {
         lmurWindow.style.top = '0px';
         lmurWindow.style.left = '0px';
         lmurWindowTop = 0;
         lmurWindowLeft = 0;
      }
      else
      {
         lmurWindowTop = localStorage.LMURWindowTop;
         lmurWindowLeft = localStorage.LMURWindowLeft;
         lmurWindow.style.top = lmurWindowTop +'px';
         lmurWindow.style.left = lmurWindowLeft + 'px';
      }

      lmurLoadSettings();
      lmurCheckActivation();
      lmurRemoveWazeStyling();
   }
   else
   {
      tHTML = '<b><a href="'+lmurUpdateURL+'" target="_blank">LMUR</a></b> v'+lmurVersion;
      tHTML += ' - requires a HTTPS connection, please click ';
      tHTML += '<a href="https://' + document.location.host + document.location.pathname + '">here</a> to switch';
      lmurDragBar.innerHTML = tHTML;
   }

   lmurDoOnload = false;
   lmurAddLog('onload complete');
}

function lmurHeartbeat()
{
   //lmurShowTrace('lmurHeartbeat');
   var oldLoginState = lmurIsLoggedIn;
   var revisualise = false;
   lmurIsLoggedIn = (document.getElementsByClassName("wz-user-box__username").length != 0);
   if(oldLoginState != lmurIsLoggedIn)
   {
      if(!lmurIsLoggedIn)
      {
         // temporarily reinstate lmurIsLoggedIn so that lmurSaveSettings() won't just return as soon as it's called...
         lmurIsLoggedIn = true;
         lmurSaveSettings();
         lmurIsLoggedIn = false;
      }
      lmurDoOnload = true;
      revisualise = true;
   }

   if(lmurIsLoggedIn)
   {
      if(lmurUserName.length === 0)
      {
         lmurUserName = document.getElementsByClassName("wz-user-box__username")[0].innerText;
         if(lmurUserName.length !== 0)
         {
            lmurAddLog('user '+lmurUserName+' has logged-in');
            lmurUserID = null;
         }
      }
   }
   else
   {
      if(lmurUserID !== null)
      {
         lmurAddLog('user has logged-out');
         lmurUserID = null;
      }
   }

   // reload UI if it gets nuked by Livemap when the user closes the route options window
   if(document.getElementById('lmurUI') === null)
   {
      lmurDoOnload = true;
   }

   if(lmurDoOnload)
   {
      lmurFakeOnload();
      if(revisualise)
      {
         lmurAddLog('re-visualising after login state change');
         lmurNoForcedRefreshThisCycle = false;
         lmurVisualiseMarkers();
         ////lmurNativeMarkerFiltering();
      }
   }
   else
   {
      if(!lmurInhibitNudgeDetection)
      {
         var nowCentre = W.app.map.getCenter();
         if((nowCentre.lat != lmurPrevCentre.lat) || (nowCentre.lng != lmurPrevCentre.lng))
         {
            lmurAddLog('re-visualising after map nudge');
            lmurPrevCentre = nowCentre;
            lmurNoForcedRefreshThisCycle = false;
            lmurUpdateRequestQueue();
            lmurVisualiseMarkers();
            ////lmurNativeMarkerFiltering();
         }
      }
   }

   if(lmurClearStartupCrud === true)
   {
      if
      (
         (document.getElementsByClassName("wz-popup-overlay").length > 0) &&
         (document.getElementsByClassName("wz-icon close").length > 0)
      )
      {
         document.getElementsByClassName("wz-popup-overlay")[0].click();
         document.getElementsByClassName("wz-icon close")[0].click();
         lmurClearStartupCrud = false;
      }
   }

   setTimeout(lmurHeartbeat,100);
}

function lmurDecayCache()
{
   lmurShowTrace('lmurDecayCache');
   if(lmurInhibitNudgeDetection) return;
   if(lmurNoForcedRefreshThisCycle)
   {
      lmurVisualiseMarkers();
   }
   else
   {
      lmurAddLog('auto cache decay blocked by manual cache reload');
   }
   lmurNoForcedRefreshThisCycle = true;
}

function lmurInitialise()
{
   lmurShowTrace('lmurInitialise');
   lmurDiv = document.createElement('div');
   lmurPopup = document.createElement('div');
   lmurUI = document.createElement('div');
   lmurResetCaches();
   lmurAddLog('initialisation');
   lmurDiv.id = 'lmurDiv';
   lmurDiv.style.position = 'absolute';
   lmurDiv.style.top = '0';
   lmurDiv.style.left = '0';
   lmurDiv.style.zIndex = 6;
   lmurDiv.style.pointerEvents = 'none';
   lmurPopup.id = 'lmurPopup';
   lmurPopup.style.position = 'absolute';
   lmurPopup.style.top = '0';
   lmurPopup.style.left = '0';
   lmurPopup.style.zIndex = 6;
   lmurPopup.style.pointerEvents = 'none';
   lmurPopup.style.backgroundColor = 'aliceblue';
   lmurPopup.style.border = '1px solid blue';
   lmurPopup.style.boxShadow = '5px 5px 10px Silver';
   lmurPopup.style.padding = '4px';
   window.addEventListener("beforeunload", lmurSaveSettings, false);
   setTimeout(lmurHeartbeat,2000);
   setTimeout(lmurGetMarkers,2500);

   setInterval(lmurDecayCache,30000);
}

lmurInitialise();
