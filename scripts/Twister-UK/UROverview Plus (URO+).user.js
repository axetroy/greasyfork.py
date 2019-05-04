// ==UserScript==
// @name                UROverview Plus (URO+)
// @namespace           http://greasemonkey.chizzum.com
// @description         Adds a whole bunch of features to WME, which someday I may get around to documenting properly...
// @include             https://*.waze.com/*editor*
// @include             https://editor-beta.waze.com/*
// @include             https://beta.waze.com/*
// @exclude             https://www.waze.com/user/*editor/*
// @exclude             https://www.waze.com/*/user/*editor/*
// @grant               none
// @version             3.152
// ==/UserScript==

/*

TO-DO ITEMS
=======================================================================================================================
Bug fixes - MUST BE CLEARED BEFORE RELEASE
=======================================================================================================================


=======================================================================================================================
Things to be checked
=======================================================================================================================


=======================================================================================================================
Things to consider working on, in no order of priority
=======================================================================================================================

Update feed auto-refresh delete functionality to better cope with cases where the feed has 5+ items remaining after
a delete pass

convert app-generated RTC into a WME one to avoid any problems with extending its end time, setting the correct
start time, associating it with a MTE etc etc...
  * select segment with one or more app-generated RTCs
  * click the "convert to WME closure" button/link
  * script makes a note of the latest end date/time out of all the RTCs on the segment
  * script "deletes all" RTCs
  * script generates new closure, replacing default end date/time with the one taken from the app closures

Modify RTC filtering options to enable keeping all the RTCs visible but visually distinct

Custom marking for tagged MCs

restore TBR popup functionality or remove all references to it...
  if restored, check positioning of TBR popup relative to the restriction & TIO controls

refactor mouseover and mouseout handlers

split apart popup handler into seperate functions for each of the event driven types, leaving the existing function
solely to handle those popups which still require all elements to be scanned to find the highlighted one

replace all remaining scanned element popup handling with event driven handlers

Unify handling of parking lot and other place PURs for unstacking - the lack of any visual differentiation between their
native markers when both layers are visible leads to undesirable effects when unstacking, as well as confusion over
whether or not a "stack" of PUR markers will actually unstack in the first place (i.e. if it consists of one place
marker and one parking lot marker...)

Fade out/mark in some other visible way, filtered markers instead of completely hiding them = cf highlight vs hide
option for cameras...

Adjust default settings for places & MP tabs to account for dynamic nature of tab building

Convert camera XHR code to async operation

Improve reliability of yellow/green comment marker choice - being disabled when zoomed in beyond the level at
which filtering is disabled...

Implement some sort of UR "hotspot" marking to highlight areas of the map with significant clustering of URs

Detect/highlight definite/probably duplicate URs? (e.g. if GPS trace data is identical, if timestamped within
a few seconds of another UR that's within x metres etc...)

Flush settings to localStorage whenever a change is made, or at least before opening a new tab via a popup

User-defined setting presets

Extend unstacking to cameras

More localisation

First-run information
 - show quickstart guide to URO features if no existing settings are present (i.e. new installation)

Filter URs by age of first comment

Ignore comments from anyone other than reporter and self (to prevent "time to close", "bump" etc. comments from
interfering with the filters the user is trying to apply)

Further filtering options for RTCs - filter by creator, MTE etc.

Single click to update all watched camera data

Copy saved camera data back to camera object/create new camera with same properties?


=======================================================================================================================
New functionality in progress
=======================================================================================================================

Enhanced object history - replace native history entries with a full breakdown of the data available from the server

Addition of segment and place watchlist functionality

*/

/* JSHint Directives */
/* globals $: */
/* globals W: true */
/* globals I18n: */
/* globals OL: true */
/* globals require: */
/* globals _: */
/* jshint bitwise: false */
/* jshint eqnull: true */
/* jshint esversion: 6 */


var uroVersion = "3.152";
var uroReleaseDate = "20190328";

// list of changes affecting all users
var uroChanges =
[
   'Positioning tweak for popups that get placed to the left of the mouse pointer',
   'Stops WME throwing getBounds errors after zooming in/out whilst mousing-over a UR, PUR etc. marker...'
];
// list of changes affecting only WME Beta users (at least until the next production release including these parts of the beta code...)
var uroBetaChanges =
[
];

// true enables debug output during script startup
var uroShowDebugOutput = true;
// true keeps debug output enabled after script startup
var uroPersistentDebugOutput = false;
// true enables performance monitoring debug output
var uroPerformanceMonitoringOutput = false;

// var uroRecentDebug = [];

var uroCtrlsHidden = false;
var uroCurrentTab = 1;
var uroFID = -1;
var uroShownFID = -1;
var uroShownPopupType = null;
var uroInhibitSave = true;
var uroPopupTimer = -2;
var uroPopupDwellTimer = -1;
var uroPopupAutoHideTimer = 0;
var uroPopupShown = false;
var uroPopupSuppressed = false;
var uroSetupListeners = true;
var uroMouseInPopup = false;
var uroConfirmIntercepted = false;

var uroRootContainer = null;
var uroPlacesRoot = null;
var uroMCLayer = null;

var uroCustomMarkerList = [];
var uroPendingURSessionIDs = [];
var uroRequestedURSessionIDs = [];
var uroPlacesGroupsCollapsed = [];
var uroKnownProblemTypeIDs = [];
var uroKnownProblemTypeNames = [];
var uroSelectedItems = [];

var uroNullCamLayer = false;
var uroNullOpenLayers = false;
var uroNullURLayer = false;
var uroNullProblemLayer = false;
var uroNullMapViewport = false;

var uroURDialogIsOpen = false;
var uroHoveredURID = null;
var uroSelectedURID = null;
var uroURReclickAttempts = 0;
var uroPendingCommentDataRefresh = false;
var uroWaitingCommentDataRefresh = false;
var uroExpectedCommentCount = null;
var uroCachedLastCommentID = null;

var uroMCSelected = false;
var uroPlaceSelected = false;
var uroAutoCentreDisabledOn = [];
var uroMouseIsDown = false;
var uroBackfilling = false;
var uroHidePopupOnPanelOpen = false;
var uroPointerWithinMap = false;

var uroUserID = -1;

var uroDOMHasTurnProblems = false;
var uroBetaEditor = false;
var uroWazeBitsPresent = 0;
var uroMTEMode = false;
var uroFinalisingListenerSetup = false;
var uroInitialised = false;

var uroOWL = null;
var uroDiv = null;
var uroAlerts = null;
var uroControls = null;
var uroCtrlURs = null;
var uroCtrlMPs = null;
var uroCtrlMCs = null;
var uroCtrlPlaces = null;
var uroCtrlCameras = null;
var uroCtrlMisc = null;
var uroCtrlHides = null;
var uroAMList = [];

var uroCWLGroups = [];
var uroCamWatchObjects = [];
var uroSegWatchObjects = [];
var uroPlaceWatchObjects = [];

var uroFriendlyAreaNames = [];
var uroAreaNameHoverTime = -1;
var uroAreaNameHoverObj = null;
var uroAreaNameOverlayShown = false;
var uroANEditHovered = false;
var uroANEditBox = null;

var uroPrevMouseX = -1;
var uroPrevMouseY = -1;
var uroMousedOverMapComment = null;
var uroMousedOverOtherObjectWithinMapComment = false;
var uroLastZoom = -1;

var dteControls = null;
var dteOldestFullDrive = new Date(0);
var dteEpoch = new Date(0);
var dteTopID = '';
var dteClearHighlightsOnPanelClose = false;
var dteArmClearHighlightsOnPanelClose = false;
var dteOffset = 0;

var uroUserTabId = '';
var uroShowFeedFilter = false;
var uroDoFeedFilter = true;
var uroPreviousFeedLength = 0;
var uroLastIssueID = null;

var uroEnhanceHistorySegID = null;
var uroSegHistoryDetails = null;
var uroSegHistoryEntries = 0;
var uroSegHistoryLoaded = false;

var uroTBRObj = null;

var uroBackfillQueue = [];

var uroUnstackedMasterID = null;
var uroStackList = [];
var uroStackType = null;

var uroMousedOverMarkerID = null;
var uroMousedOverMarkerType = null;
var uroClickedOnMarkerID = null;
var uroClickedOnMarkerType = null;

var uroNodeLayerScanAttempts = 0;

var uroAlertBoxStack = [];
var uroAlertBoxTickAction = null;
var uroAlertBoxCrossAction = null;
var uroAlertBoxInUse = false;

var uroMainTickHandlerID = null;
var uroMainTickStage = 0;

var uroCustomURTags = ['[ROADWORKS]','[CONSTRUCTION]','[CLOSURE]','[EVENT]','[NOTE]','[WSLM]','[BOG]','[DIFFICULT]'];

var uroAltMarkers =
[
   // each altMarker has 4 variants: 0 = normal open, 1 = selected open, 2 = normal closed, 3 = selected closed

   //  0: closure UR
   [
      "data:image/png;base64,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",
      "data:image/png;base64,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",
      "data:image/png;base64,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",
      "data:image/png;base64,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"
   ],
   //  1: roadworks UR
   [
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAoCAYAAABw65OnAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94GCAc3MvOL7YEAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAACsJJREFUWMOlmHtsHVV+x7/nMWdm7r1zH45zvXnYuQFCQ0ikJC6JTEC9RbRg+AOpqf9KJdqKBFb9gy1/rlYrFgmhVuIhVSgbpF0WqyAoEivEsqtNUDMtCaAUV9k0BkKcteXYvbGv7VzfudczZ2bOOf0Dm80mfm33SPPPzJlzPuec3+P7OwR/eKMASLVaJUEQkKWXnucZ3/cNAANA/yEDknX2IdVqlY6NjfFKpcLTNLXCMGS2bdNms0ny+byRUmrXdRXnPBkbG0srlUrq+75ehDKrTcDWmJz29vZyrbWTz+eznuflwzAsaq1LADo45yUhRIlSmldKeUqpjJTSKRaLQinFkiQhO3fuNLVa7f+1E6RarTIppQXAZYzltNb5AwcOdB85cuQvenp6/jSXy93uOE4npVRoreMoimZardaV8fHxz998881T586du0opbSqlWgBC27YT3/fVcruyHATp7e3ljuM4URTlLMsqPvroo3/y+OOPP7lly5YHKaV8pRWFcRuuyEJrnU5OTn70xhtvnPjwww8vJUnScBynFUVRNDQ0lN4MQpYD4Jy7tm0X4jje+NJLL/3NgQMHvksocSih6zY2bTSMNtG5c+eOP/PMM/8qhKhLKefTNA1vBiE3H0GSJC4hpJTJZDadOHHih5VK5RH8kW1sbOyXTz755HMLCws1Y8x1y7LCG4/mRsNkYRg6xWKxQAj5zuuvv/6jtQDS8UugM6PA7AS0Bkg2v2y/YrG44/7779/y3nvvndNaJ5cvX07b7fYtEKS/v9/KZDKelLL88ssv/92ePXuOrLXCK4/dgQ1Xfgn86qeYuDyGwgN/tWLfYrG4Y+fOnfKDDz74qlwux7t3705GRkb0UuBBtVpl09PTjjEm39/ff/fBgwePrQUw88VvoK7OA44HMBvz/i/WPJaDBw8e6+/vv9sYk5+ennaq1Sr7Nvr5vs+iKHJt2y4ePXr0CcaYvdaAs5+dRIcHgBFACHitebTra8QDSuyjR48+Ydt2MYoi1/d9BoBQAPTQoUPCcZzs/v37t2/btu2B9Rjb/Ke/Ro4umjYnKDLg+mcfrR7vCUV3d/ef7d+/f7vjONlDhw4JAJRWq1WSJInIZDLZw4cPP7heizdTV8HKBSC/EejoglUuQo5+uXbioZQdPnz4wUwmk02SRFSrVcJ932e9vb1CSpnt6enZtx6ASEp0fe+fYHeVgUIBUCmcIAAP185bC7KFnp6efVLKrFJK+L7PeF9fHyWECMuynGKxWFkPxEy9jo57/hzwCr+XWrNzdcRxDCHEiv9m7Bx0ERXXdZ0kSURfXx+lnudRKSWP41hkMpnieiBm52bg3ADw7QQdG9CYm13z/0wmU4zjWEgpued5lMdxTDjn1BhDKaXWeiDmnv1bTEfT2HTH7SB33QmkCrh4EfMT19B67CmUj/1gLbuwjDGUc07jOCYcAFzXNVEUQSmVMMZWBTHGAKMXkJEGTM0AbggkEhgZhjVt0D7nA2tAKKWSpXkBgAohTJqmWgih2u323NpuYeBEBpziGwGVSEApgFBYCkguX1hziHa7PSeEUIvzGh4EgWaMpVrreHZ2dsx2rS7bclfNjuUn/hHW3DhgQmBzJ2A0ULgDjiig3LMXjWYTxfzyeUQmIebm5ka11jGANAgCzT/99FPd29ubWJYVXrp06fz27dsPrraKMIzQ8fffh1vqvOWbDSA/P4f563MrQtiWi6+++uo3aZqGSZIkQ0NDmlarVSWEkISQhcHBwTNKKbkaxNT/XgWnK0tGphXC+ZU9JE1TOTg4eIYQsiCEkNVqVVHf97Vt2zFjrD0xMVG7ePGiv+JRqBS1wVcQfXISqF0BrteAoP7NM1cDxobR/mAQ82++siLE8PCwPzExUWOMtW3bjn3f12Qx+ovdu3cXc7ncljvvvHPva6+99opt297NXjF69iNcOfKX2JEAmzsAcXsB2NYNKAOM/RZ6NMTkPDDak8POf/sfbNy6DYT8TjdJKYNjx4597+uvvz7farUmL1682AAQfytqduzYAcYYazQacF13Yc+ePQcJIURrjWvXruEnPxvEr3/4D6gEITYVgGIBIBYBBAGSCGgtgJgUCwa4NBXjxJlPULp9F7q7t4IQAmOMefvtt3986tSpzxhjU7Ztz1+9elUC0EuiVZ89ezbu7e1tUkqnjh8/fmrDhg2VkZGRx1544QUsSfa/BmCXv/XUbzbRGMAsbqgBCAO4BP7z9H/hJ6fvR6VSwfPPP49yufzz48ePn0qSZFpr3RwaGoqXiqQb5Z3ZvHmzyeVyOooic/bs2dFHHnnE+vzzz3ddu3YNAGAB2KSB77jARhegGQvIut8AhAvQCykuzwP/MQP8uwYiAI1GA+fPn58+efLkCUrp17lcbjqO41atVouX5N0tQheAI6UsACgD2DIwMPDAhQsXvvvWW285cRyjC8ABAHfngZ4ikM1zGBgETYXxBvDfTeATACGAzs5Ofc899/xqbm7uBKV0AsC0bdvzAKIbhS5ZrugB4ARB4AkhOhljXfl8fttdd931xDvvvHNgYmJiVd1PCEEulzMPP/zwcLPZ/Jd2u/1bpdRUHMcznucFNwOsWPxUq1UWBIHIZDLZIAiKjuN0MMa6OOfdmUzmmY8//vi2Vqu1LMRDDz0032w2n+Wcj8VxfE1KOet5XmNhYaHteV68XBW23KqM7/tqaGhIMsYCAHVjzKTWelQpdanRaDz/1FNP1bLZ7OLKgV27duH999/H7Oxso1Qq/cgYcymKojGt9SSAOmMsGBoakiuVgXy1+jQIAuW6rozj2DiOo7XWRmtNJycn/7lWqz2by+UKWuulWKBffPHF1ycmJkaUUjVK6YyUsuW6rqzX6/qmsc1qVTkZGBigX3zxhdXV1SU6OjoEIcTmnAulFE+ShNu2bTUaDdput+fvvffe3mZ4nbh2FqdPnz716quvfgRghjEWUEqTMAzBOWednZ1s06ZNfOvWrbRQKJB6vb4iBKlWq2xqasru7u7Olkolj1JaMMbkOecFSmnetm2PEJJVSmW+/PJLWalU3F07d1fGx8fHnn766XeVUi1KaUwIoQBs13XdNE0zcRy7AOwgCLjjONi7d69ZLHxuKQOXLkEylmUV0zQtCSFKjLFSkiQlQkgxSZICpTRvjNmqlCqfOXMm2LdvX9dzzz13pl6vLyVSMMa4MSZrjMkByDLGXEqpEEIwIYSWUqpyuaxrtdotLsr6+voEIcQjhJTSNC1ZlpUD4CZJIoQQFiGExXFsGWN6AOTTNHU551wppY0xkhDS4pxPU0qvG2NSxlhKCEmSJJFCiHYYhk3Lsq4LIeaDIGgvVefkJk+x7rvvvgwAT0rpWZaVIYQ4xhhLKcUJIYxSSgkhTCnFOeeMEMKSJNHGGMUYS40xyhijCCGac54CSKWUsTEmTJKknaZp0xjTHh4ejgAoAOZG7zADAwNpvV4PgyDQUkrpuq5oNBrccRyLUsqUUlQpBc455ZxTKSUxxhBCiLFt2xBCjFJKp2lqHMcxUspUKaVs204JIQkhRCZJIgEs5Y3lI+biRQmbnZ1lGzZsoJ7n0SAImOd5JE1TopQii2L1lkDHGDO/U2ChZowZx3H0yMiIvu2223Sz2VQbN27U64mYN74ni26Ler3+e1eGa7WlK8WBgQG8++675ob4cEuw+j+lA177aXrCYwAAAABJRU5ErkJggg==",
      "data:image/png;base64,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",
      "data:image/png;base64,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",
      "data:image/png;base64,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"
   ],
   // 2: custom keyword UR
   [
      "data:image/png;base64,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",
      "data:image/png;base64,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",
      "data:image/png;base64,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",
      "data:image/png;base64,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"
   ],
   //  3: note UR
   [
      "data:image/png;base64,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",
      "data:image/png;base64,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",
      "data:image/png;base64,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",
      "data:image/png;base64,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"
   ],
   //  4: event UR
   [
      "data:image/png;base64,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",
      "data:image/png;base64,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",
      "data:image/png;base64,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",
      "data:image/png;base64,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"
   ],
   // 5: WMSL/SLUR UR
   [
      "data:image/png;base64,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",
      "data:image/png;base64,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",
      "data:image/png;base64,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",
      "data:image/png;base64,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"
   ],
   // 6: Elgin MP
   [
      "data:image/png;base64,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",
      "data:image/png;base64,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",
      "data:image/png;base64,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",
      "data:image/png;base64,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"
   ],
   // 7: TrafficCast MP
   [
      "data:image/png;base64,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",
      "data:image/png;base64,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",
      "data:image/png;base64,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",
      "data:image/png;base64,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"
   ],
   // 8: TrafficMaster MP
   [
      "data:image/png;base64,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",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAoCAYAAABw65OnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wcHFRskj5OuIwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAABmJLR0QAAAAAAAD5Q7t/AAALvUlEQVRYw5WYyXNU1xXGzxt6VrfUGtCIQGAwiCQMAgMJ2ASwiRMrdqrsdRbZeuVFti5v8ge44sqCZBO7Uh5SbFyuBEPABCgCFlBEFpFASMIgNCGppR7Ur7vfe/mdp8FAAcZPdXXfeM53z/nOcNuQH36YDOPIkSNGLpczlm9WVVX5x48f9znV4f0QgcYzvqNKTcMwwq2trSHmKAAsZqNYLBoKwHVd37btciQSKY2NjZU5SoByl0A99bC/D8Abb7xhz8/Pxzo6OhL19fW18Xi8AWV1KEn4vm9VKhUJhUKqqMRc8Dxvtq2t7X4mk5m5e/fuXCqVci5cuOA9DcwTLfHKK69Y0Wg0gsDqmpqaRkYH51vXrl17EANsXlhYqAaAjVJDQfBuGYBzrlu6MTg49M/+/oEewN+emJiYvHfvXrazs7PywQcfeM8MYu/evTZmT6xataqBsX779u0HGxsbXw2HQ81btvwoidIIQKTiVcQ2H2/M3uvXLg3dHDl27dq1iwMDA4NYLoNlCktWeeiwHgPAam9vT7Li1Q0NDdtfeumltzFp95YtnfVNTc1JyzJClrWo2DTMJ/oxmYon17Z3bKyrq2ssFAoZQBQTiUTlxRdfLF+6dMl/IojDhw+btbW1idWrV4Ojfc/+/ft/j7m37tixA75Fo+Fw2DRN69kYb1mRkBWKsoB63LQhm81O474FCF2AW6WhoaHHgjAcx4lu2LBhVVNT07ZDhw69A/oNu3btioLA4ghegoyiZCQaVuZHh973XE/Pw3wXg0+p2dnZzunp6ZFSqZQhenLffvut+2h0GN3d3ZDergF5Bxb5LRZQABH8b7D8QDjhKIODg3Lz5i2ZnJwSBAf3l8F53ncgWMDyHEFWLbIjmzZt/N3c3Nz9devWzabT6fLnn3/urYBAqXH//v0YD+t37ty5H6b/dMuWLRE+NBUAFkLxoJw4cVLm5uYlFgtLNGpIbW04YLbrGQBkdn1GOQCyDIKV63kImTH4sW3z5s27rly5Msy9LJ86KyBOnjxpEQExkk4jofQa5tfVBy7Q1Z87d05Onz4jyWRCGhtD0tDoSHPLnMAzTGBILheTe6MpmZ2JSDYbEo0c3/cC66gM160IfAp1dXU5kPQ3N2/e/Dcg7mluUSOqow0iIAyA+t27d+9dv379LyBlKhaLWQgxzp5VAKcllUpIx7qi7Nk/JM9tGpNotSmhuEg44Uu6PsezUWmoL0gun5BCPhwA0PzkeX5gGeQbhw8fMskdkZmZmf/CjyEsX7hx44Zv4orAXERF9QsvvHAIK6jpQrjCGBoaxkr/wvwxeX7TrPzs571ixGzJFushHq7w7WBUKjHJOXUSS7uy70CfrG7PYg1b1JXLI5mskiV2G+jZT8Qk4FvAdhNXGKC2eV5NHG/VJAWQAP3x41+Skm1pbCrI9t03ZK5YxwotFCApyBGmxmIwU1jgRgj7JqSLd2tqyvDFDN5lUULUq0uYV1uE6HMsMo1VbMqBYZILDF09UVGD/9M8jCkbSbVy+/ZtMS1Ddu4aknw5iSIfwYt/qtjQVSogcxGQ3vd9U8pWVLbvGJFyxQr4ocpbW5v1XFN8iAVWY4k69MYoBYaZTCaVxUrQKpisVgk+xFcBqeKQL904j28fzfC++Et5b3H+Lgkahic1q+YlEqkEz9SaZFt1i8pXEFHmekI3gX7bVMUaigrS00BfOsbGxgPBDQ1zUnKX0okyXnQstQ1c800wB6CCP28RFFarh7Dlsie2bUlLS/MSQMNGZ5Q5joXinNsmQvzq6mpfzQRSTy2hgzQbKIiGS1JxDUSTBQMF/Pc5913OWaksznqt9/0loPpNOFwKamQymdJyv1hvcB0WjuoDuKL6TRs0Pices6v9AACSopGXSARgcnlLLLOIfyOAqmjVClorb5GOK15YBLgIRABsGCUWYqDQhA+tD9cV3I31S0Slq/pNXTEnZdAVwVLAPA4Pvebm5iBCxsZiFBgnSMmBFbzy4oq9krh+eWXodWAhT88Z5YqMT0SwgIJoCZQj29dqymKnkZ3X9gv9nnn+/HkfZBVuzhEyY9T8sqba55/fiD8rpGlTxu9UYcYiClRROVDkeosKl8fyte8vghi7m5DcvBeQm6S0Uvhu3bpVotG5ga4ZsmcJ/Z4Z0M3zdPXTRMQ3ICvzsEIl9cmcAiK5eKFNbLeA5UuBMtdzWD1DrbE8gmtKAXOlUJGvLzaJHfJk7do1AueCGkIKcJWDNDbn6cwy1KTCwYMH3aAr0daMaYoiNsADbccKjlN0u7t/FaxgZDgml861ieVmxbZykK68OFAaDFdBlCRk5gHgyH/OtuBGG0LG5dChgwHBtRGmZhQh5m3KeD+AZsgTRYqaF6RNzOPTvnncjAAiQQpfS64Pt7S0UEYto6/vG5maSomTj0osWpLamoxEokUIRntnORIL5QSTyehwUq5ebJaB/iQLM6W7+zWhai5bocRYOHbs2NHh4eGruH0MVxSuX7/uBQlgcnLSJ2mwemcEK/TghnXwZGcYUC+/fNhUa3zxxT/kck+VTE5EqaK1UlNbklhcQ9MICtbc/YhMjEdlfNyWdG1IXn/910KNCNoATF/p7+8vsthTWKOX7mqCepTXLuChzury5cseebwCkczx8XGH6GgbGR6ppde06bYMjZZsNiMDA/cp2xEZG0Xh3bjcGY7L8K2YjIyYslA0pGvnjwHwumzduhUARcp8zqN/0L6h95NPPvkbLu+nGZqAF85ymn2oYVyzZk3QumO2MhaZBlTTnTt3UpDUbG9vMzdu3EjUbJB0OklKjgUFKxqt0e+kq+sn8uqrR2TPnt3StrpNnOICLnAqmLuArIWPPvror/l8/jJqRpmz3HMfu/lRs+GaDKYa1pyi/iK8fkkb1kXySr355ptWU9Mq6ezcrO8GIaeHFigt9xSlB2uLe+LECd0QXacl/AuE7MM19+BHFlnuE7vtkZERzW4uAl0UFCEroPNTKNFOuZWqmurpuSz0nqIZVYufDlW+nJb1OH36mPT09M3QT/4ZLvy9t7f3Oi6+C88ymg5oorwzZ848ed+hQFDuotwhvjWDzuGecTrk/+HfEbi6kc4oovGvDq0QmpbxnUE//PAPTi6X+Hh0dPTjq1ev6sbnJrLGyD1ZFuN89dVXLgD8J+5FtZ3j8PVFLouca253WHUGXswAaFJXxD7zHfoQ3QZaQbGyXInCEXZbC5lM8o89PV9eQekIlhifmprK0PIXIX753XffVdn+UzfECuDBrSHZU0EUWImL2V2Ean1Z4L0/YeK3CbmE7hPItj7bRYHxn546daqH9wax3iQcyOFaByBBa//ee+8tbz39p20DjbfeesuEkCFcEiZphVEY4X4IQSbC9f0Qs3ZIJvxZr9YAoEfYfU0EfAHwu9ybh4hlJS8YtZ2zCHGbLsrExQayngjCOHDggMXqIvSBCTYnSQRV46IUgqo517kKS8RREuc9l/zRShg3YImZ999//1PATfO+ulHLQQQrxPRd3BjTawDa2m9u27bNJ2K8x+UJE1LaJKc4q6zh4zSuSJO80ihJI7iGuVr3ugBpxdS1fX19M3v27Gk4evToWdJwaalN1MppA0Z/v6jiMqFbQRaBuLDF8PjWxX0eZPcf/WnAYkeu5k8y0goCMCokhnIVoL/QWKwqhPA1ahneiSknmLUvUgvkuJzk2SzvaPatcE/bBofv87hnHpmznM9hlTxk1UTjG4/8FhXat2+fZpwkaPV3iLj+NLTUnNoKQjtxnfVa/a3n2gTxjqtKddbBfU/xaRQjq8S9Bd7LK184z2PF4lLt8B+MDh9SViDNgnY7fOjg0jDhqH7U/lMVm9ptaWOsg1eM5bAmf+iJ/nbloUjTv89zbZZcngUWYWjf4ixt/1Y4YTzuRzL2jBbbNItar1sCbQE1AgyEG8gMvlmeH2K5ZfkPlABPrwHjKQlJ/x7dlNvQ0OAt5SH/+36zMh4EhYXoJ6aMrHauz3gAOkhM+u1nn33mr2xWHvMD2v8Bmv9ygbZ2+aoAAAAASUVORK5CYII=",
      "data:image/png;base64,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",
      "data:image/png;base64,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"
   ],
   // 9: CalTrans
   [
      'data:image/png;base64,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',
      'data:image/png;base64,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',
      'data:image/png;base64,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',
      'data:image/png;base64,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'
   ],
   // 10: TfL
   [
      'data:image/png;base64,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',
      'data:image/png;base64,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',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAoCAYAAABw65OnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QMQFykf1lJoIwAAAAZiS0dEAP8A/wD/oL2nkwAAB9JJREFUWMPNWG1sW9UZtpM0bvPlJvb9th3Pjh1/3Hv9ca/tOLFdN81SBdI0pAu0pbSlraptdFtRBRWIoqGBhFAaQbWuLVLYfmxIgyEQXxtbC4IO9XO/9nua+AGC/gHxB+jWde9zexzcxE6clh9c6dG5955z3ue573nPe865NtvKrxZCa7lcXm0YRlsFeMZ7Vv+dX3ZCE5G0+P3+1VR2FAqFbiJ2Dw4O8qqqCijxjPeoZ+0gpon1vz1ySZdWtbvb2xVD6ZENWRE0ISgmxLigCynZlE0pLWVR4tl6T/Voh/boh/63Ksbuz/tbPIZnDYwpGcVHhlV9rz5WerU0q55VP+Av8B+vurzqG9s/bNdR4hnvUY92aI9+6A87sLcSIXao95ieTlETJSklRTOHMpPp99J/br7U/B+QNgK0zxwyJ9EfdmCPecXekAA5JXd5c16vmBLThZcKs47Ljq8aJV+Iwh8GZ2EH9mB3OSE3hoAUw42+ki+XPp1+61bJb/LK0dBbviFvDnZhf6mhaUYgIagQaOobibcbIjnbmBDt+ejbYowzJU1UwAO+RV7oG+5zKKbC8yqvp+ayx+oavEC4m5AiBAhhViYIdxH+Vl9I8mD/MXfIpYMHfDd5A+6h4HGSF/qSB5Lb6gr4BSPNEExGrBF09pwl9BO21xei79e2gQd8bFjm84HDHXaLngGPGXw5eqamgS2MLMNKkO8nPEZ4gHlGZfWoG64j4ox+BjzgA2/FG80IFiQZbZ82XVPAE4QQIcc88XSdLz3JPIF2UcJPFrdpOtf0X3WPNs2rQlAhXis24BI5KbuUrKInXjBP1TQerHL1yw0EqsraB2u36X3CONWtSrqgSa7KkDiQTISEkBfm/BcXdTrK3GsQftbgtJxh8ZIkPMTenfu2vvNI4GJXmMuD1xoSKzWbSq+YldY7ft15Zd7Q44RHCRuYABjcQ3h4GYD0ABOBYC0SHqkSQ2h51HmFT0vrwQt+W3BdsB3x4NK5jfaZ5qvzItYxIyYLtgwTk24ARlWfykwyvhVhf6rlKp8UNoIX/DZf3tchJqWQM+Yas9xYEVFeYKja2HIwF/TLsncV26/brvMpYYzWlRD4LRFK1tPX0d8zZj9a5QlMv12EAjOAL5wi3EvYsQRQv5VNWQjIE3ay95XhON1yVSAR3ry3zxIBd3BJMdClcqOtM12f1pyeGjP6WIOBOcf6JFkOWVDvOuv6VM7Jo7SWBKzhQGC4dNHXFXeXnc94ztc02sfmfj9L28uJSLD2yC3vLq6P/DVyTspIZWtBQ2BiinBxQXJG3Tn5SORkTaM/ZskH7o0RXqtD/j7Lplnmiana7cw58yQt77n5KYpkgd2PkBQ13x3+HatOt35dk6BQFfURwg8JzxBeIMwSNlWtKyk2FHU8FZgI7KBtoQbeSrJqsoKTxkfKShu0V7W/1HXzZuaJLAvUOHuOM+KKB0pLLOlkHzzgs4Lyxv7zxgLG9XMCdkDBqeCe9gvtX9YV8jvCehYnUZaiYyxFg/y5peMF9sEDvuoFbH4RY94YTs2knrVdtv1v2QD8I+EE4cXGZg3sSiZlSuLxVBavBdt7rCFubNtFQ7wz/nz8tepUe7tIvJh4BXYt+8Sz0AuVC2eMNhonkRazpGAIm2PPxf5kfeWJ2xPQ9tO2z5xB5z5e41OwD55KLNTc6CJYsM+k6E2FJkPjsYdjs03jTV/ZfkUGz9+8Gi4H+wH7tcAvA2/2be7bBHuwC/vLnUHmhWAOa9s1LXpPdCS6O7rXvdt9biVf372v+5+RXZH94bvCI5iOsNeIgJuEwGXxqTjXP94fikxFct6Sd0Iuyw+sGVnzr6XIW+9v/SK8M3wwNBWaFJPiAB/nQ56sh4O9FZ/CELnUabUQF9bSaufpLfZq3qJ3RBqS9rTtavukloCuD7o+Vw+oD2JxQlxJCcmL/rDDZsKKBFgirOMg5XbsjAPrA3JvqVdV8sqof8J/sPPDzi9oGl+3XboB+yX7tdjh2KxoipssASQcAtCfckIrE9HQwdgeG4+hscM6CNGxzToQ0znBMqoJETkjF2jmbI0cjhy3X7Zfs/2dLUq/jbzDpbhdNA2HrcMw7ZqQkLB/9Rf9TuSFKkF1xczHAjqCFOcDHGixCSZyQ8kpg1iC+TS/zZ1yHwzNhd6DAOkd6d9cljtsiTDFOyghFSVDylCfhJUXkmJYTst+bPMNw3COjY056k1RvHSwXwEBuFTOykPI8xhj+sIJPslvEUxhuyvleqhb73662+j+DfcS95EwLvx+rb72aE+i5wiX5vaKGfFHyDNITpRxRsW0uG5wcDAzMDAQHRoakgmdJKbmwbg5n8+vwV8XatSfy+UGCoXCCGET3W8pFotbS6XSvWRoNz0/TpghQ8epPGWa5gm6f5bKJ6n+52TjPrK1jfpOU79JejdGfUuZTCZJdb3lcnltPRGWJ/DLh+CjDnGoJ0FFKoeJbBTG6P5OejdB91OMZCvd3w2hVLeZyMfRjsqNVLeBsC6bzeYhgK4Qfi/F4/EO9m9rkQj79PR0M/sh5kRjEu/Vdf0HZCQMV0IYQAQaCUjAMH19CiWeiVAnISra0H0M/chWEF+PYaBnFwQQWuvFxPx/KrgKP7/YX7kOiIIL4SUS0APA4EJU6gD6arjcifEXBKEdQw1y9kPNbvu+Xf8HXMHzQhCO1wQAAAAASUVORK5CYII=',
      'data:image/png;base64,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'
   ],
   // 11: BOG
   [
      'data:image/png;base64,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',
      'data:image/png;base64,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',
      'data:image/png;base64,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',
      'data:image/png;base64,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'
   ],
   // 12: Difficult turn
   [
      'data:image/png;base64,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',
      'data:image/png;base64,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',
      'data:image/png;base64,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',
      'data:image/png;base64,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'
   ]
];


var uroMarkers =
[
   // 0 = comment count circle
   ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAaCAYAAAA5WTUBAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90LCxYGJyle3m4AAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAv1JREFUSMfFls1r3EYYxn+zo9XsqjuSxpBQU5OCDy0Y3JODs2Z36W6P/YBCk159s+/5F9Z/QsHkUAruZZ344Jx7KPTSa2/NwSdDE1ISf8SWI63k6UVLN8ZuZFnQ56IZDYwevR/P+wguh7jieXF9Gewla3vJWeELAfA8b9ZxnFWl1P0kST7NsswDkFJGrus+i+P4cZqmP0VR9JyKIWq12owx5kff95PBYBCPRiN7EaPRyA4Gg9j3/cQY80hK6VdFwFFK3TXGvOx0OoktiE6nExtjXjSbzYUb/T3QqNfrvSAITofDob0uhsOhDcPwTVkiAmgCC8aYV2UITBMxxrwok5oGcEdr/XR5eXlsb4g8NY+uVQPAh0KIr7XW6f7+vq0Cvu8nnufNvu/jtak03FZKfbe4uGjn5uYqqe6lpSXrOM5qERIS8IEZz/O66+vrTlUttra25iql7hfSImAB+DIIgrd7e3u2KhwcHNggCE6LREIBGlBZlqn5+fnK1C4MQybqWiQdKi/O/wWTwpSAkFLGWZZVdnkURUgpoyIk/t3Uas93dnYqI7G9vY3rus+KkLBABtgoin7f3NxMqyKxtbWVxHH8uIhUG+AT4CMhxK1Wq/XD8fGxrIJEEATjNE0/ft+IrwEx8AaIrbWH1tpfV1ZWbhyNbrc7llL+XMRjyDwdTt6mzSRJ/jw5Ofkiy7JGr9crRWBjY4Pd3d3XR0dH31hrz4pOTw18BnwFPBBCPPR9/6zsKA+C4FQpdbeoc3tngAErwLfA90KIh2EYHrbb7cITtd1uj40xr+r1eq+s7jSAO0A3J/IAWG21Wr9ordN+vz++yt71+/2x1jrVWj/NR0DjukbmHVcF3ALmgJl8L4UQoeu6n3ued+/8/Hw2yzKVG91YSvlXFEW/xXH8xFr7B/A38PYqZ13EbYtcwkPgdk7kgylZF1PWPc076xR4DbwEDvN3tmwkLtZIMx/xwWTA5d1ELm6T1j4CjoGznFgpX/lfZxJwpwhMR2JCJJkobllN+QeQNNGuneopoQAAAABJRU5ErkJggg=="],
   // 1 = green comment marker
   ["data:image/png;base64,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"],
   // 2 = yellow (own) comment marker
   ["data:image/png;base64,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"]
];

var uroHighlightedCameraImages =
[
   // speed
   ["data:image/png;base64,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azfinpZRQzEk7D8r+zZU+QJElM9lB9ZKQ97r94TdFAxoodUbxwvk96MUZjoyrw/F6L1V7Qxi094DR/vddH30CQt12fUxoj6lBw05PbRDhavxEtUCHHUVipwF3pcZy7GQakgXfFVQdj21CSixLg2y08d7JiyojwU0Sqfq82gjg3TvbyJce/RxwFeF+Z/d3Tdq7pcLf/fr//GN9DEEfMfz3zqJ2QWvhHQ9AAAAYHpUWHRSYXcgcHJvZmlsZSB0eXBlIGlwdGMAAHjaPUnLDYBQDLp3CkeghWhdx76LNw/uH+tLFALhY+d1ly0TCmMqtGtAzR8+vBDcOiaDoDPb+Wo+1c/R60q1g7AYXwXsATEgFNfoGvlqAAAPW2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6aXB0Y0V4dD0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcEV4dC8yMDA4LTAyLTI5LyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgIHhtbG5zOnBsdXM9Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYveG1wLzEuMC8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgIHhtcE1NOkRvY3VtZW50SUQ9ImdpbXA6ZG9jaWQ6Z2ltcDo0YTZmYzJkMy0zNzBiLTRkMzYtOGIzNS02NmRmMjhiYzM2OTgiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NmIzYTcxYTUtNjQxYS00YTU5LWE3OGQtODQ2YzFhYjYxODM5IgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZWU0ZGEyZGItNzcwMC00MDYyLTk5ZjItZmNjNzNlODA4NzYwIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJXaW5kb3dzIgogICBHSU1QOlRpbWVTdGFtcD0iMTUyMDA5MTY2MjU3MzQxNCIKICAgR0lNUDpWZXJzaW9uPSIyLjkuOCIKICAgZGM6Rm9ybWF0PSJpbWFnZS9wbmciCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjkvMi4xMCI+CiAgIDxpcHRjRXh0OkxvY2F0aW9uQ3JlYXRlZD4KICAgIDxyZGY6QmFnLz4KICAgPC9pcHRjRXh0OkxvY2F0aW9uQ3JlYXRlZD4KICAgPGlwdGNFeHQ6TG9jYXRpb25TaG93bj4KICAgIDxyZGY6QmFnLz4KICAgPC9pcHRjRXh0OkxvY2F0aW9uU2hvd24+CiAgIDxpcHRjRXh0OkFydHdvcmtPck9iamVjdD4KICAgIDxyZGY6QmFnLz4KICAgPC9pcHRjRXh0OkFydHdvcmtPck9iamVjdD4KICAgPGlwdGNFeHQ6UmVnaXN0cnlJZD4KICAgIDxyZGY6QmFnLz4KICAgPC9pcHRjRXh0OlJlZ2lzdHJ5SWQ+CiAgIDx4bXBNTTpIaXN0b3J5PgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjljMjhhYmUwLTJiNTEtNDcwYy1hZjYxLTIzNWE5Yjk3ZjcxNyIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iR2ltcCAyLjkvMi4xMCAoV2luZG93cykiCiAgICAgIHN0RXZ0OndoZW49IjIwMTgtMDMtMDNUMTU6NDE6MDIiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogICA8cGx1czpJbWFnZVN1cHBsaWVyPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6SW1hZ2VTdXBwbGllcj4KICAgPHBsdXM6SW1hZ2VDcmVhdG9yPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6SW1hZ2VDcmVhdG9yPgogICA8cGx1czpDb3B5cmlnaHRPd25lcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkNvcHlyaWdodE93bmVyPgogICA8cGx1czpMaWNlbnNvcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkxpY2Vuc29yPgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+txeqYAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+IDAw8pAmNZfO0AAA7kSURBVHja1Zx5kB1FHcc/8459b+9N2GSPhBiBBAQBBeVSI4GEoFQFSIASj+CRshDFQstAgXiiJcT7SLQKUVkQhOIIRVFA1gSSYCFHAgIakFSwSNjdhGU3yR7v7b43M/7Rr/N6erpn3stuTJyqrp7p6Zk3/X2/4/v7dc84HLrNiTme6ObHHFe1pQ4hOM4kA+cfpL4H5V+sFiS9LepY7W+SFj/mGEvbYQuUqTYVUx8bOL7Wphci6sNa9UzAJLRaBSdhuZ9nAMjTah0s50BUL3WI1M4ETkI5Thr6mFRP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"],
   // dummy
   ["data:image/png;base64,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LmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6cGx1cz0iaHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi94bXAvMS4wLyIKICAgIHhtbG5zOkdJTVA9Imh0dHA6Ly93d3cuZ2ltcC5vcmcveG1wLyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOmViM2YzYTk1LWFmZDMtNDNiMS1hZTQ5LTNhN2IwMDk0Mjg0ZiIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1NjJmOTkxYi1kNjk2LTRhNjItYjFjNS1mMTFhNzAwMTIzOTciCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmZmFiNmU3ZS03ZWNiLTQ2OGEtOGJlOC0yMjUwYjM0OTU1MjciCiAgIEdJTVA6QVBJPSIyLjAiCiAgIEdJTVA6UGxhdGZvcm09IldpbmRvd3MiCiAgIEdJTVA6VGltZVN0YW1wPSIxNTIwMDkxNjg5MDI1OTI3IgogICBHSU1QOlZlcnNpb249IjIuOS44IgogICBkYzpGb3JtYXQ9ImltYWdlL3BuZyIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuOS8yLjEwIj4KICAgPGlwdGNFeHQ6TG9jYXRpb25DcmVhdGVkPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6TG9jYXRpb25DcmVhdGVkPgogICA8aXB0Y0V4dDpMb2NhdGlvblNob3duPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6TG9jYXRpb25TaG93bj4KICAgPGlwdGNFeHQ6QXJ0d29ya09yT2JqZWN0PgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6QXJ0d29ya09yT2JqZWN0PgogICA8aXB0Y0V4dDpSZWdpc3RyeUlkPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6UmVnaXN0cnlJZD4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZjZhNTRjMGMtZWI0ZS00YmZkLWI5NjctYjQyMWFmMzdiOWVkIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuOS8yLjEwIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6d2hlbj0iMjAxOC0wMy0wM1QxNTo0MToyOSIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgIDxwbHVzOkltYWdlU3VwcGxpZXI+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpJbWFnZVN1cHBsaWVyPgogICA8cGx1czpJbWFnZUNyZWF0b3I+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpJbWFnZUNyZWF0b3I+CiAgIDxwbHVzOkNvcHlyaWdodE93bmVyPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6Q29weXJpZ2h0T3duZXI+CiAgIDxwbHVzOkxpY2Vuc29yPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6TGljZW5zb3I+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz73ndT8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH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"],
   // rlc
   ["data:image/png;base64,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YzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDQuNC4wLUV4aXYyIj4KIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgIHhtbG5zOmlwdGNFeHQ9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBFeHQvMjAwOC0wMi0yOS8iCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpwbHVzPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIgogICAgeG1sbnM6R0lNUD0iaHR0cDovL3d3dy5naW1wLm9yZy94bXAvIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJnaW1wOmRvY2lkOmdpbXA6ZTQxOTdmM2ItN2ViZi00OGIxLThkNTgtZWFjNTcyMjE0MGNmIgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg5NTkxMDU2LWNlM2ItNGIyMy04YzIxLTE0YTBhYTMyODU4NCIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmE5YTcxZjk4LWQ2MTYtNGM3My05MmU0LTNmZDdlZDAzODlkZSIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iV2luZG93cyIKICAgR0lNUDpUaW1lU3RhbXA9IjE1MjAwOTE2MjcxMjgzODciCiAgIEdJTVA6VmVyc2lvbj0iMi45LjgiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICB4bXA6Q3JlYXRvclRvb2w9IkdJTVAgMi45LzIuMTAiPgogICA8aXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+CiAgIDxpcHRjRXh0OkxvY2F0aW9uU2hvd24+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpMb2NhdGlvblNob3duPgogICA8aXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+CiAgIDxpcHRjRXh0OlJlZ2lzdHJ5SWQ+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpSZWdpc3RyeUlkPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphMzA2MWNkYS0xZTNkLTRjYjgtOGNiMy01NzliMzFjMTA4MDYiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi45LzIuMTAgKFdpbmRvd3MpIgogICAgICBzdEV2dDp3aGVuPSIyMDE4LTAzLTAzVDE1OjQwOjI3Ii8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICAgPHBsdXM6SW1hZ2VTdXBwbGllcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkltYWdlU3VwcGxpZXI+CiAgIDxwbHVzOkltYWdlQ3JlYXRvcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkltYWdlQ3JlYXRvcj4KICAgPHBsdXM6Q29weXJpZ2h0T3duZXI+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpDb3B5cmlnaHRPd25lcj4KICAgPHBsdXM6TGljZW5zb3I+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpMaWNlbnNvcj4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PvOQ5mMAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfiAwMPKBseKeVsAAAJfElEQVR42u1bXWgcxx3/ze7e7VnWl2vJ0jnCrkiKbRUbxw92nFIwwQ0plIIcDCmUvMQUTB+DyAfkrU8u5K0USvISQp5KbUoJIa2NnbYPwSGxQxI3NdhWPmxJOTknyWeddLe7eZjb3Oz//vNxurtEDxkYdnfuP7czv/l/z6xAd4vQ3Ls820rSxnPSycB7AQJtMz2r9NwkE8tzR2D0AgjuylWORjf5hLTRCsPVqQQ9Eg1u4h65qpP3NP8XMwDE5ErBEBsRjaBHYsFN3lOefYaGEw064ahBHzdoVVCoSLQFSNAjHQEyUd9wFRbRSAGIFRAihT5mJi02g2gIwgW+UgNypZwiCAixUiMAdQWEqJtWI+iSKFAQ1BUPDJXjDDCckILgN64egBoZR0J0imgHlKDDyVMgKBeok84pNVCuPuEKEG5IQag1qqcxz2BERbhySdCmJTCZSo/IvwpC/sYN3EwSIK1xnL2a2ilNkgCPPoofW5yu2NExswJhYn9ozCMFIeWAfGYkylCEyE6Qa0/vSf+8xueoaxwtYRIZsUHnyGOUIlWMOQJECCC8fh3/AeQqcyut45AkAaIIOHoUPwOwptT1Rq0RhRoR02t0ugJHkdD5BRwnqLoh3wAiTKu6ukI0VzghDKu2qZwBoGAYb41pU30RrdMVtOkceQZ/QFWQlBvSWqCioYISx62iQe8bgJriGHXMsWJmjU5X4OAP2HwCX2MmqVjkAYRU5qn8q7pBBUuhKziMNb2va1x22ESDixA9wvY+MX05AwiUK8Jr15orr8p/OuG0Tf09pVeA4GIWW60rYCTUpbdxBOcX5DSTzRmASMHIJRprznEBFaNGKRhEVuepwha2C4uL7GuUX7rCuZmZA3uffDI3PTZ2+0gYfj0GVLdwGt/FXzD10dHX6+FqtTqwsLAwcvn8+ejsa69d/x+xKLXGtW6wKIkwyJpvsgATE/1bz53bMzM5+cGJOI69KGplZ5fJpavenf4i/vLLPWdnZj4/MzdXqSiA6MD4FgjfMWDKKL6Jif7+d97Z+afx8Y+Ox3EiODZWFVx6nw5cVZBUR3TYX/T3l6aOHx8/dOlS9M9792qRJpdB8xjwDXrBYxyjEEB46dL+F8bHPzpOLYA6YAfPsGWyqhltt7/ansst73zkkQe3nTtX+i8DAOtkeW0oywBA7vnnD+6dnPzghOoQUdOXtgvRSkPp1ftO+qvPQgDF4qcnnn76J3sNwV2mt+eQT8gAcfJkMA3EHhc30Hu6cvS+t/0T79gxf1oDREu60LN4lBQIv1i8fcS0qrrV4swmndRG+pvGsn176YgmEdTiL3kOMUaGMwqFu2M6G09Xx/MA3weCQN5znqSpP50gpy9M3JHPL49ZMmHCFmvonBXf95t+gi4+uH8fuHoVmJ+X7Tt2AAcOAIUCUKtldYEuvuAAUvu59Pe89S0MEFwWnXWxbZxhzCfcvw+89RawttakmZ0F7twBHn8cCEMJRhfyEU79bZyQBl42q9HCGVRxqaslBHDlShaEtKyvAx9+qA+/OQuhtlFgTP0JV+k4wWg1bBkpjzN5aknFgStffcWbTJ2+4fIRXD5DxyXKHHXzsQJhikiNJs+6k5vo8xE6JSgcNiZN/Q3bik6JGTYOseUTxsaAW7f4l42OAvW6uX8cAysrUtfUak3rUygAW7bwXGExrUKTXsjM0XPghsy9zs9Pfzt4UCpEWvJ5YGrK3H91VSrVlRUJWPp7rQYsL0uxq1bN79dwhLDladve4LGxf18f8MQTUmkuLEj60VFg/34JUKxJslcqwOKipO/rAwYGJHhxLCe/tCRp7t4Fhoclh7iIXM92ukzOjQrG0aN8+Mz1jyKgXJbP27YBQ0PNPp4nRSIMJRilkqQdHZW/cYlgm+PGFW8jHEFjAO6l7cQQlYqcdF+fBEHXf2hI0iSJ7OP6/p4AQaM8ndPDySxdvbRtdVXeDw7a+w8Nyfu1Nfv7ewoEl3/QheJ0kHT10rZUMYahvX+hkKbo+PfrxuWqIyYAnAFwDEDR1CFl3V6VkRHg8GHg2WelKTattG4rYCPc4TVAuArgNzYQvotSKgFvvglMT0tTSle4WpX3QdC5c0eBOAPgR9hkZXkZePnl1oktLTW2u0K7TrKk8luAOIZNWi5fzk6qXJaKFQC2brXnI8hOuXFfI7CJgxDAqV3AM7uBnw7Ito9XgFdngVc+s7OgEMD4L4HiL4C+CZlMr9wC5v4FzF0w9y+VmlalXJZuNyB9Dd/PpvQdfIcEhsMiRoeqWABePwQ8NpJtPzIs61MPAL99H7hT5fuH24F9LwLD+4Gk3qg+0P8Q8OBuYOQw8OmfgfWyfgw3bzZjkBQEVSwc8hF0J5w9h+mZVpIDQS2PjUgazlQJAUy9BAw/rLxdKBGQAIamgD2/M5s6zwNyOelj7NghzWeb+Qj1QFqiERU9EKd2mUFQwTi1i+GmXwNDh0ikk7SOYnAfMPZz/f/v3Cnd6YEBaSk2kI+IoT8wYt3XwDO73ZUaR1v8VfN16qkMzgEzAdFJPiKO86vKPqeOM8wckSpGl8LRbp1U5JdOJlH24xOgr2iPb3T7GjqQkgRYXx+cZ4BgOcNDr4ogAJDjXBkOcVhxLqq05SMWF0feRfZcFQcGTMlbfLziPmeOtnKjFfeWg0tp+v+2GwAmj7E1HyHiixejs5A74XUDZ5h1xKuz7kBwtHf+0ZoQ+zbwUkVEAPP/Nsu+zj8wJZLn5vb8rXFWoubAEXogXvkMuFCyg3ChJGlbgPg7UH5fsweh0JU/MQNh4wIOqHv3dr333HOf/xHN07oRmDMRTjoiSaSzZALjQknS6JKn1/4ALF3hlZ4AsPQJ8P+/uAVIpnxGM+IU8dzcvr+ePr34+8ZBkXWFI+omjrAe5++qi/2A9C4rs8C8g4utxhu6Y0RxHK5Wq4PzpdLou2+/XTuriIN6ENXp6NDtzRB+a8oigJNMsEQ/X0hrjdQ64Qj1tH9GRAIAFxu5iM1Y3gNQ0cQJCVGAdTLhOqMfjKKRJmY2W05iCcAJAPNMBEnPRUUMd9QtIGQUpg9gGcAbDfEYATDwPQOwAOA8gNMAvtCwuq7WNbrAGnSZTue3cyidPtP/ADr/tFL33af6gVvMPJu+CExcgNBdueO/uuPA3QLBBIbp+KDzZwrCHC2wwJi+7dTRdru4fhwLW/jdzkq5fsqko+0VR8BhpW2fTW9ogL38AL7bwDhnrzsdsOjif/UKFOvkfyhM+QYKVFliJfC7TQAAAABJRU5ErkJggg=="]
];

var uroFeedFilterReloads = 0;
var uroDeleteAutoRepeat = false;
var uroFeedEntriesDeleted = 0;
var uroFeedFilterFilters =
[
   ['feed.issues.motivations.CAN_BE_SOLVED_BY_RANK',           'motivation'],
   ['feed.issues.motivations.CLOSE_TO_FAVORITES',              'motivation'],
   ['feed.issues.motivations.ISSUE_AGE',                       'motivation'],
   ['feed.issues.motivations.ISSUE_REOPENED',                  'motivation'],
   ['feed.issues.motivations.NEAR_DRIVES',                     'motivation'],
   ['feed.issues.motivations.REPORTED_BY_USER',                'motivation'],
   ['feed.issues.motivations.USER_FOLLOWS_ISSUE',              'motivation'],
   ['feed.issues.motivations.USER_FOLLOWS_ISSUE_LAST_COMMENT', 'motivation'],
   ['venues.update_requests.panel.flag_title.IMAGE',           'title'],
   ['venues.update_requests.panel.flag_title.VENUE',           'title'],
   ['venues.update_requests.panel.title.ADD_IMAGE',            'title'],
   ['venues.update_requests.panel.title.ADD_VENUE',            'title'],
   ['venues.update_requests.panel.title.DELETE_VENUE',         'title'],
   ['venues.update_requests.panel.title.UPDATE_VENUE',         'title']
];


/*
function uroAddDebug(debugtext)
{
   var ts = Math.round(performance.now());
   if(uroRecentDebug.length == 100)
   {
      uroRecentDebug.shift();
   }
   uroRecentDebug.push(ts+': '+debugtext);
   console.debug('URO+DBG '+ts+':'+debugtext);
}

function uroDumpDebug()
{
   if(uroRecentDebug.length > 0)
   {
      document.getElementById('WazeMap').innerHTML = '<textarea id="uroDbgOutput" style="width:100%;height:100%">';
      var dbgOutput = '';
      for(var i=0; i<uroRecentDebug.length; i++)
      {
         dbgOutput += uroRecentDebug[i]+'\n';
      }
      document.getElementById('uroDbgOutput').textContent = dbgOutput;
   }
}
*/

function uroTempFixMTEDropDown()
{
   // temporary fix for that bloody annoying bug in the closure event dropdown...  sort it out devs!
   // also removes the "Choose Event" non-option from the list, so that it now always starts with "None"
   if(document.getElementsByName('closure_eventId').length > 0)
   {
      if(document.getElementsByName('closure_eventId')[0].selectedOptions.length > 0)
      {
         document.getElementsByName('closure_eventId')[0].required = false;
         if(document.getElementsByName('closure_eventId')[0].selectedOptions[0].text == I18n.lookup('closures.choose_event'))
         {
            document.getElementsByName('closure_eventId')[0].selectedOptions[0].remove();
         }
      }
   }
}

function uroPerformanceMonitoring(source, ts)
{
   if(uroPerformanceMonitoringOutput === true)
   {
      console.log(source+': '+(performance.now() - ts));
   }
}

function uroAddLog(logtext)
{
   if(uroShowDebugOutput) console.log('URO+: '+Date()+' '+logtext);
}
function uroGetCBChecked(cbID)
{
   try
   {
      return(document.getElementById(cbID).checked);
   }
   catch(err)
   {
      uroAddLog('uroGetCBChecked() - '+cbID+' not found!');
      return null;
   }
}
function uroSetCBChecked(cbID, state)
{
   try
   {
      document.getElementById(cbID).checked = state;
   }
   catch(err)
   {
      uroAddLog('uroSetCBChecked() - '+cbID+' not found!');
   }
}
function uroGetElmValue(elmID)
{
   try
   {
      return(document.getElementById(elmID).value);
   }
   catch(err)
   {
      uroAddLog('uroGetElmValue() - '+elmID+' not found!');
      return null;
   }
}
function uroSetStyleDisplay(elm,style)
{
   try
   {
      document.getElementById(elm).style.display = style;
   }
   catch(err)
   {
      uroAddLog('uroSetStyleDisplay() - '+elm+' not found!');
   }
}
function uroSetOnClick(elm,fn)
{
   try
   {
      document.getElementById(elm).onclick = fn;
   }
   catch(err)
   {
      uroAddLog('uroSetOnClick() - '+elm+' not found!');
   }
}
function uroAddEventListener(elm,eventType,eventFn,eventBool)
{
   try
   {
      document.getElementById(elm).addEventListener(eventType, eventFn, eventBool);
   }
   catch(err)
   {
      uroAddLog('uroAddEventListener() - '+elm+' not found!');
   }
}


function uroAlertBoxObj(headericon, title, content, hasCross, tickText, crossText, tickAction, crossAction)
{
   this.headericon = headericon;
   this.title = title;
   this.content = content;
   this.hasCross = hasCross;
   this.tickText = tickText;
   this.crossText = crossText;
   this.tickAction = tickAction;
   this.crossAction = crossAction;
}
function uroCloseAlertBox()
{
   document.getElementById('uroAlerts').childNodes[0].innerHTML = '';
   document.getElementById('uroAlerts').childNodes[1].innerHTML = '';
   document.getElementById('uroAlertTickBtnCaption').innerHTML = '';
   document.getElementById('uroAlertCrossBtnCaption').innerHTML = '';
   uroAlertBoxTickAction = null;
   uroAlertBoxCrossAction = null;
   document.getElementById('uroAlerts').style.visibility = "hidden";
   document.getElementById('uroAlertCrossBtn').style.visibility = "hidden";
   uroAlertBoxInUse = false;
   if(uroAlertBoxStack.length > 0)
   {
      uroBuildAlertBoxFromStack();
   }
}
function uroCloseAlertBoxWithTick()
{
   if(typeof uroAlertBoxTickAction === 'function')
   {
      uroAlertBoxTickAction();
   }
   uroCloseAlertBox();
}
function uroCloseAlertBoxWithCross()
{
   if(typeof uroAlertBoxCrossAction === 'function')
   {
      uroAlertBoxCrossAction();
   }
   uroCloseAlertBox();
}
function uroShowAlertBox(headericon, title, content, hasCross, tickText, crossText, tickAction, crossAction)
{
   uroAlertBoxStack.push(new uroAlertBoxObj(headericon, title, content, hasCross, tickText, crossText, tickAction, crossAction));
   if(uroAlertBoxInUse === false)
   {
      uroBuildAlertBoxFromStack();
   }
}
function uroBuildAlertBoxFromStack()
{
   uroAlertBoxInUse = true;
   uroAlertBoxTickAction = null;
   uroAlertBoxCrossAction = null;
   var titleContent = '<span style="font-size:14px;padding:2px;">';
   titleContent += '<i class="fa '+uroAlertBoxStack[0].headericon+'"> </i>&nbsp;';
   titleContent += uroAlertBoxStack[0].title;
   titleContent += '</span>';
   document.getElementById('uroAlerts').childNodes[0].innerHTML = titleContent;
   document.getElementById('uroAlerts').childNodes[1].innerHTML = uroAlertBoxStack[0].content;
   document.getElementById('uroAlertTickBtnCaption').innerHTML = uroAlertBoxStack[0].tickText;
   if(uroAlertBoxStack[0].hasCross)
   {
      document.getElementById('uroAlertCrossBtnCaption').innerHTML = uroAlertBoxStack[0].crossText;
      document.getElementById('uroAlertCrossBtn').style.visibility = "visible";
      if(typeof uroAlertBoxStack[0].crossAction === "function")
      {
         uroAlertBoxCrossAction = uroAlertBoxStack[0].crossAction;
      }
   }
   else
   {
      document.getElementById('uroAlertCrossBtn').style.visibility = "hidden";
   }
   if(typeof uroAlertBoxStack[0].tickAction === "function")
   {
      uroAlertBoxTickAction = uroAlertBoxStack[0].tickAction;
   }
   document.getElementById('uroAlerts').style.visibility = "";
   uroAlertBoxStack.shift();
}


function uroFirstTimerWelcomePack()
{
   uroAddLog('welcome new users to Club URO...');

   // for now, just show the update notes...
   uroShowUpdateNotes();
}
function uroShowUpdateNotes()
{
   uroAddLog('let existing users know what\'s new in this release');

   var releaseNotes = '';
   releaseNotes += '<p>Thanks for upgrading to URO+ '+uroVersion+' ('+uroReleaseDate+').  What\'s changed?</p>';

   var loop;
   if(uroChanges.length > 0)
   {
      releaseNotes += '<ul>';
      for(loop=0; loop < uroChanges.length; loop++)
      {
         releaseNotes += '<li>'+uroChanges[loop];
      }
      releaseNotes += '</ul>';
   }
   else
   {
      if(!uroBetaEditor)
      {
         releaseNotes += '<ul><li>Nothing of interest, unless you\'re a WME beta tester, in which case log into the beta and find out...</ul>';
      }
   }

   if((uroBetaEditor) && (uroBetaChanges.length > 0))
   {
      releaseNotes += '<p>For WME Beta:<p>';
      releaseNotes += '<ul>';
      for(loop=0; loop < uroBetaChanges.length; loop++)
      {
         releaseNotes += '<li>'+uroBetaChanges[loop];
      }
      releaseNotes += '</ul>';
   }

   uroShowAlertBox('fa-info-circle', 'URO+ Release Notes', releaseNotes, false, "OK", "", null, null);
}
function uroAdvertiseCustomIcons()
{
   uroAddLog('advertise the benefits of custom UR icons...');

   var confirmMsg = '';
   confirmMsg += '<p>Hi there.  One of the features of URO+ that a lot of users find useful is the ability to use a custom marker for URs and MPs which have been tagged with a specific keyword in their description text.</p>';
   confirmMsg += '<p>Markers are defined for <b>[ROADWORKS]</b>, <b>[CONSTRUCTION]</b>, <b>[CLOSURE]</b>, <b>[EVENT]</b>, <b>[NOTE]</b>, <b>[WSLM]</b>, <b>[BOG]</b> and <b>[DIFFICULT]</b> tags in URs, and <b>[TfL Open Data]</b>, <b>[Elgin]</b>, <b>[TM]</b>, <b>[TrafficCast]</b> and <b>[Caltrans]</b> in MPs.</p>';
   confirmMsg += '<img src="'+uroAltMarkers[1][0]+'">';
   confirmMsg += '<img src="'+uroAltMarkers[0][0]+'">';
   confirmMsg += '<img src="'+uroAltMarkers[4][0]+'">';
   confirmMsg += '<img src="'+uroAltMarkers[3][0]+'">';
   confirmMsg += '<img src="'+uroAltMarkers[5][0]+'">';
   confirmMsg += '<img src="'+uroAltMarkers[11][0]+'">';
   confirmMsg += '<img src="'+uroAltMarkers[12][0]+'">';
   confirmMsg += '<img src="'+uroAltMarkers[10][0]+'">';
   confirmMsg += '<img src="'+uroAltMarkers[6][0]+'">';
   confirmMsg += '<img src="'+uroAltMarkers[8][0]+'">';
   confirmMsg += '<img src="'+uroAltMarkers[7][0]+'">';
   confirmMsg += '<img src="'+uroAltMarkers[9][0]+'">';
   confirmMsg += '<p style="clear:left;">Would you like me to automatically enable these custom markers?</p>';
   confirmMsg += '<p>If you change your mind later on, they can be enabled/disabled via the Misc tab within the URO+ settings</p>';

   uroShowAlertBox('fa-info-circle', 'URO+ Message to Users', confirmMsg, true, 'Yes please', 'No thanks', uroSetMarkerCBs, null);
}

function uroSetMarkerCBs()
{
   uroSetCBChecked('_cbCustomRoadworksMarkers', true);
   uroSetCBChecked('_cbCustomConstructionMarkers', true);
   uroSetCBChecked('_cbCustomClosuresMarkers', true);
   uroSetCBChecked('_cbCustomEventsMarkers', true);
   uroSetCBChecked('_cbCustomNotesMarkers', true);
   uroSetCBChecked('_cbCustomBOGMarkers', true);
   uroSetCBChecked('_cbCustomDifficultMarkers', true);
   uroSetCBChecked('_cbCustomWSLMMarkers', true);
   uroSetCBChecked('_cbCustomNativeSLMarkers', true);
   uroSetCBChecked('_cbCustomElginMarkers', true);
   uroSetCBChecked('_cbCustomTrafficMasterMarkers', true);
   uroSetCBChecked('_cbCustomTrafficCastMarkers', true);
   uroSetCBChecked('_cbCustomCaltransMarkers', true);
   uroSetCBChecked('_cbCustomTFLMarkers', true);
}

function uroGatherSettings(container)
{
   var options = '';
   var urOptions = document.getElementById(container).getElementsByTagName('input');
   for (var optIdx=0;optIdx<urOptions.length;optIdx++)
   {
      var id = urOptions[optIdx].id;
      if((id.indexOf('_cb') === 0)||(id.indexOf('_text') === 0)||(id.indexOf('_input') === 0))
      {
         options += ':' + id;
         if(urOptions[optIdx].type == 'checkbox') options += ',' + urOptions[optIdx].checked.toString();
         else if((urOptions[optIdx].type == 'text')||(urOptions[optIdx].type == 'number')) options += ',' + urOptions[optIdx].value.toString();
      }
   }
   return options;
}
function uroGatherCamWatchList()
{
   var liststr = '';
   for(var loop=0;loop<uroCamWatchObjects.length;loop++)
   {
      var camObj = uroCamWatchObjects[loop];
      if((camObj.fid != null) && (camObj.persistent === true))
      {
         if(loop > 0) liststr += ':';

         liststr += camObj.fid+',';
         liststr += camObj.watch.lon+',';
         liststr += camObj.watch.lat+',';
         liststr += camObj.watch.type+',';
         liststr += camObj.watch.azymuth+',';
         liststr += camObj.watch.speed+',';
         liststr += camObj.groupID+',';
         liststr += camObj.server;
      }
   }
   return liststr;
}
function uroGatherSegWatchList()
{
   var liststr = '';
   for(var loop=0;loop<uroSegWatchObjects.length;loop++)
   {
      var segObj = uroSegWatchObjects[loop];
      if((segObj.fid != null) && (segObj.persistent === true))
      {
         if(loop > 0) liststr += ':';

         liststr += segObj.fid+',';
         liststr += segObj.watch.left+',';
         liststr += segObj.watch.right+',';
         liststr += segObj.watch.bottom+',';
         liststr += segObj.watch.top+',';
         liststr += segObj.watch.fromNode+',';
         liststr += segObj.watch.toNode+',';
         liststr += segObj.watch.fwdDir+',';
         liststr += segObj.watch.revDir+',';
         liststr += segObj.watch.length+',';
         liststr += segObj.watch.level+',';
         liststr += segObj.watch.rank+',';
         liststr += segObj.watch.roadType+',';
         liststr += segObj.watch.updatedOn+',';
         liststr += segObj.groupID+',';
         liststr += segObj.server;
      }
   }
   return liststr;
}
function uroGatherPlaceWatchList()
{
   var liststr = '';
   for(var loop=0;loop<uroPlaceWatchObjects.length;loop++)
   {
      var placeObj = uroPlaceWatchObjects[loop];
      if((placeObj.fid != null) && (placeObj.persistent === true))
      {
         if(loop > 0) liststr += ':';

         liststr += placeObj.fid+',';
         liststr += placeObj.watch.left+',';
         liststr += placeObj.watch.right+',';
         liststr += placeObj.watch.bottom+',';
         liststr += placeObj.watch.top+',';
         liststr += placeObj.watch.name+',';
         liststr += placeObj.watch.imageCount+',';
         liststr += placeObj.watch.residential+',';
         liststr += placeObj.watch.updatedOn+',';
         liststr += placeObj.groupID+',';
         liststr += placeObj.server;
      }
   }
   return liststr;
}
function uroGatherCWLGroups()
{
   var liststr = '';
   for(var loop=0;loop<uroCWLGroups.length;loop++)
   {
      var groupObj = uroCWLGroups[loop];
      if(groupObj.groupID != -1)
      {
         if(loop > 0) liststr += ':';

         liststr += groupObj.groupID+',';
         liststr += groupObj.groupName+',';
         liststr += groupObj.groupCollapsed;
      }
   }
   return liststr;
}
function uroGatherPlacesGroups()
{
   var liststr = '';
   for(var loop=0;loop<uroPlacesGroupsCollapsed.length;loop++)
   {
      if(loop > 0) liststr += ':';
      liststr += uroPlacesGroupsCollapsed[loop];
   }
   return liststr;
}
function uroGatherFriendlyAreaNames()
{
   var liststr = '';
   for(var loop=0;loop<uroFriendlyAreaNames.length;loop++)
   {
      var fnObj = uroFriendlyAreaNames[loop];
      if(loop > 0) liststr += ':';

      liststr += fnObj.fName+',';
      liststr += fnObj.area+',';
      liststr += fnObj.server;
   }
   return liststr;
}
function uroSaveSettings()
{
   if((uroInhibitSave) || (uroMTEMode === true))
   {
      uroAddLog('save inhibited');
      return;
   }

   if (localStorage)
   {
      try
      {
         localStorage.UROverviewUROptions = uroGatherSettings('uroCtrlURs');
         localStorage.UROverviewMPOptions = uroGatherSettings('uroCtrlMPs');
         localStorage.UROverviewMCOptions = uroGatherSettings('uroCtrlMCs');
         localStorage.UROverviewCameraOptions = uroGatherSettings('uroCtrlCameras');
         localStorage.UROverviewMiscOptions = uroGatherSettings('uroCtrlMisc');
         localStorage.UROverviewPlacesOptions = uroGatherSettings('uroCtrlPlaces');
         localStorage.UROverviewFeedFilterOptions = uroGatherSettings('uroFeedFilter');
         localStorage.UROverviewCamWatchList = uroGatherCamWatchList();
         localStorage.UROverviewSegWatchList = uroGatherSegWatchList();
         localStorage.UROverviewPlaceWatchList = uroGatherPlaceWatchList();
         localStorage.UROverviewCWLGroups = uroGatherCWLGroups();
         localStorage.UROverviewFriendlyAreaNames = uroGatherFriendlyAreaNames();
         localStorage.UROverviewPlacesGroups = uroGatherPlacesGroups();

         localStorage.UROverviewMasterEnable = uroGetCBChecked('_cbMasterEnable');
         localStorage.UROverviewCurrentVersion = uroVersion;

         uroAddLog('save complete');
      }
      catch(err)
      {
         uroAddLog('exception thrown during save - probably script reload whilst in MTE mode...');
      }
   }
   else
   {
      uroAddLog('no localStorage, save blocked');
   }
}
function uroApplySettings(settings)
{
   var options = settings.split(':');
   for(var optIdx=0;optIdx<options.length;optIdx++)
   {
      var fields = options[optIdx].split(',');
      if(fields[0].indexOf('_cb') === 0)
      {
         if(document.getElementById(fields[0]) !== null)
         {
            uroSetCBChecked(fields[0], (fields[1] == 'true'));
         }
      }
      else if((fields[0].indexOf('_input') === 0)||(fields[0].indexOf('_text') === 0))
      {
         if(document.getElementById(fields[0]) !== null) document.getElementById(fields[0]).value = fields[1];
      }
   }
}
function uroApplyCamWatchList()
{
   var objects = localStorage.UROverviewCamWatchList.split(':');
   uroCamWatchObjects = [];
   if(objects.length > 0)
   {
      for(var objIdx=0;objIdx<objects.length;objIdx++)
      {
         var fields = objects[objIdx].split(',');
         if(fields.length == 9)
         {
            // CWL entries with 9 fields include the validated property which is now redundant, so we need to strip this property before adding
            // the camera to the object collection.  Whilst WME no longer displays unapproved cameras, it's preferable at this stage to leave
            // any watched unapproved cameras in the object collection, just in case any of them were approved (and will therefore still be
            // present in WME) inbetween the last time the user ran URO and now.  For those unapproved cameras which were still unapproved when
            // removed from WME, URO will then list them as deleted and the user can then perform a single manual tidy-up of their watchlist to
            // remove them there as well.
            uroCamWatchObjects.push(new uroCamWatchObj(true,fields[0],fields[1],fields[2],fields[3],fields[4],fields[5],fields[7],fields[8]));
         }
         else if(fields.length == 8)
         {
            uroCamWatchObjects.push(new uroCamWatchObj(true,fields[0],fields[1],fields[2],fields[3],fields[4],fields[5],fields[6],fields[7]));
         }
      }
   }
}
/*
function uroApplySegWatchList()
{
   var objects = localStorage.UROverviewSegWatchList.split(':');
   uroSegWatchObjects = [];

   for(var objIdx=0;objIdx<objects.length;objIdx++)
   {
      var fields = objects[objIdx].split(',');
      uroSegWatchObjects.push(new uroSegWatchObj(true,fields[0],fields[1],fields[2],fields[3],fields[4],fields[5],fields[6],fields[7],fields[8],fields[9],fields[10],fields[11],fields[12],fields[13],fields[14],fields[15]));
   }
}
function uroApplyPlaceWatchList()
{
   var objects = localStorage.UROverviewPlaceWatchList.split(':');
   uroPlaceWatchObjects = [];

   for(var objIdx=0;objIdx<objects.length;objIdx++)
   {
      var fields = objects[objIdx].split(',');
      uroPlaceWatchObjects.push(new uroPlaceWatchObj(true,fields[0],fields[1],fields[2],fields[3],fields[4],fields[5],fields[6],fields[7],fields[8],fields[9],fields[10]));
   }
}
*/
function uroApplyCWLGroups()
{
   var objects = localStorage.UROverviewCWLGroups.split(':');
   uroCWLGroups = [];

   if(objects.length === 0)
   {
      uroCWLGroups.push(new uroOWLGroupObj(0,'No group',false));
   }
   else
   {
      for(var objIdx=0;objIdx<objects.length;objIdx++)
      {
         var fields = objects[objIdx].split(',');
         if(fields.length < 2)
         {
            fields.push(false);
         }
         uroCWLGroups.push(new uroOWLGroupObj(fields[0],fields[1],(fields[2] == 'true')));
      }
   }
}
/*
function uroApplyPlacesGroups()
{
   var t = localStorage.UROverviewPlacesGroups.split(':');
   for(var i=0;i<t.length;i++)
   {
      uroPlacesGroupsCollapsed[i] = (t[i] == "true");
   }
}
*/
function uroApplyFriendlyAreaNames()
{
   var objects = localStorage.UROverviewFriendlyAreaNames.split(':');
   uroFriendlyAreaNames = [];

   for(var objIdx=0;objIdx<objects.length;objIdx++)
   {
      var fields = objects[objIdx].split(',');
      uroFriendlyAreaNames.push(new uroAFNObj(fields[0],parseFloat(fields[1]),fields[2]));
   }

   uroReplaceAreaNames(true);
}
function uroTranslateLegacyMPTabSettings()
{
   var options = localStorage.UROverviewMPOptions.split(':');
   for(var optIdx=0;optIdx<options.length;optIdx++)
   {
      var fields = options[optIdx].split(',');
      if(fields[0].indexOf('_cb') === 0)
      {
         if(fields[0] == '_cbMPFilterParkingLotInputAsPoint') uroSetCBChecked('_cbMPFilter_T50', (fields[1] == 'true'));
         if(fields[0] == '_cbMPMissingPLP_T70') uroSetCBChecked('_cbMPFilter_T70', (fields[1] == 'true'));
         if(fields[0] == '_cbMPMissingPLP_T71') uroSetCBChecked('_cbMPFilter_T71', (fields[1] == 'true'));
         if(fields[0] == '_cbMPFilterDrivingDirectionMismatch') uroSetCBChecked('_cbMPFilter_T101', (fields[1] == 'true'));
         if(fields[0] == '_cbMPFilterMissingJunction') uroSetCBChecked('_cbMPFilter_T102', (fields[1] == 'true'));
         if(fields[0] == '_cbMPFilterMissingRoad') uroSetCBChecked('_cbMPFilter_T103', (fields[1] == 'true'));
         if(fields[0] == '_cbMPFilterCrossroadsJunctionMissing') uroSetCBChecked('_cbMPFilter_T104', (fields[1] == 'true'));
         if(fields[0] == '_cbMPFilterRoadTypeMismatch') uroSetCBChecked('_cbMPFilter_T105', (fields[1] == 'true'));
         if(fields[0] == '_cbMPFilterRestrictedTurn') uroSetCBChecked('_cbMPFilter_T106', (fields[1] == 'true'));
         if(fields[0] == '_cbMPFilterTurnProblem') uroSetCBChecked('_cbMPFilter_T200', (fields[1] == 'true'));
         if(fields[0] == '_cbMPFilterRoadClosureProblem') uroSetCBChecked('_cbMPFilter_T300', (fields[1] == 'true'));
      }
   }

}
function uroLoadSettings()
{
   var isNewInstall = true;
   var isUpgradeInstall = true;
   var notifyAboutCustomIcons = true;

   uroAddLog('loadSettings()');
   if (localStorage.UROverviewUROptions != null)
   {
      uroAddLog('recover UR tab settings');
      uroApplySettings(localStorage.UROverviewUROptions);
      isNewInstall = false;
   }

   if (localStorage.UROverviewCameraOptions != null)
   {
      uroAddLog('recover camera tab settings');
      uroApplySettings(localStorage.UROverviewCameraOptions);
      isNewInstall = false;
   }

   if (localStorage.UROverviewMPOptions != null)
   {
      uroAddLog('recover MP tab settings');
      uroTranslateLegacyMPTabSettings();
      uroApplySettings(localStorage.UROverviewMPOptions);
      isNewInstall = false;
   }

   if (localStorage.UROverviewMCOptions != null)
   {
      uroAddLog('recover MC tab settings');
      uroApplySettings(localStorage.UROverviewMCOptions);
      isNewInstall = false;
   }

   if (localStorage.UROverviewPlacesOptions != null)
   {
      uroAddLog('recover Places tab settings');
      uroApplySettings(localStorage.UROverviewPlacesOptions);
      isNewInstall = false;
   }

   if (localStorage.UROverviewFeedFilterOptions != null)
   {
      uroAddLog('recover Feed Filter settings');
      uroApplySettings(localStorage.UROverviewFeedFilterOptions);
      isNewInstall = false;
   }

   if (localStorage.UROverviewMiscOptions != null)
   {
      uroAddLog('recover misc tab settings');
      uroApplySettings(localStorage.UROverviewMiscOptions);
      isNewInstall = false;

      if(localStorage.UROverviewCurrentVersion != null)
      {
         notifyAboutCustomIcons = false;
      }
      else
      {
         if(uroGetCBChecked('_cbCustomRoadworksMarkers') === true) notifyAboutCustomIcons = false;
         if(uroGetCBChecked('_cbCustomConstructionMarkers')=== true) notifyAboutCustomIcons = false;
         if(uroGetCBChecked('_cbCustomClosuresMarkers') === true) notifyAboutCustomIcons = false;
         if(uroGetCBChecked('_cbCustomEventsMarkers') === true) notifyAboutCustomIcons = false;
         if(uroGetCBChecked('_cbCustomNotesMarkers') === true) notifyAboutCustomIcons = false;
         if(uroGetCBChecked('_cbCustomWSLMMarkers') === true) notifyAboutCustomIcons = false;
         if(uroGetCBChecked('_cbCustomBOGMarkers') === true) notifyAboutCustomIcons = false;
         if(uroGetCBChecked('_cbCustomDifficultMarkers') === true) notifyAboutCustomIcons = false;
         if(uroGetCBChecked('_cbCustomNativeSLMarkers') === true) notifyAboutCustomIcons = false;
      }
   }

   if(localStorage.UROverviewCWLGroups != null)
   {
      uroAddLog('recover CWL groups');
      uroApplyCWLGroups();
      isNewInstall = false;
   }
   else
   {
      uroAddLog('set default CWL group');
      uroCWLGroups.push(new uroOWLGroupObj(0,'No group',false));
   }

   if(localStorage.UROverviewCamWatchList != null)
   {
      uroAddLog('recover camera watchlist');
      uroApplyCamWatchList();
      uroGetCurrentCamWatchListObjects();
      isNewInstall = false;
   }
/*
   if(localStorage.UROverviewSegWatchList != null)
   {
      uroAddLog('recover segment watchlist');
      uroApplySegWatchList();
      uroGetCurrentSegWatchListObjects();
      isNewInstall = false;
   }

   if(localStorage.UROverviewPlaceWatchList != null)
   {
      uroAddLog('recover places watchlist');
      uroApplyPlaceWatchList();
      //uroGetCurrentPlaceWatchListObjects();
      isNewInstall = false;
   }

   if(localStorage.UROverviewPlacesGroups != null)
   {
      uroAddLog('recover places groups');
      uroApplyPlacesGroups();
      isNewInstall = false;
   }
*/
   if(localStorage.UROverviewCurrentVersion != null)
   {
      uroAddLog('comparing install versions');
      if(localStorage.UROverviewCurrentVersion == uroVersion)
      {
         isUpgradeInstall = false;
      }
   }

   if(localStorage.UROverviewFriendlyAreaNames != null)
   {
      uroAddLog('recover friendly area names');
      uroApplyFriendlyAreaNames();
      isNewInstall = false;
   }

   if(localStorage.UROverviewMasterEnable != null)
   {
      uroAddLog('recover master enable state');
      document.getElementById('_cbMasterEnable').checked = (localStorage.UROverviewMasterEnable == "true");
      uroAddLog('enable checkbox state set...');
   }

   if(isNewInstall)
   {
      uroFirstTimerWelcomePack();
   }
   else if(isUpgradeInstall)
   {
      uroShowUpdateNotes();
   }

   if(notifyAboutCustomIcons)
   {
      uroAdvertiseCustomIcons();
   }

   uroInhibitSave = false;
}
function uroDefaultSettings()
{
   uroShowAlertBox("fa-warning", "URO+ Warning", "Resetting URO+ settings <b>cannot</b> be undone.<br>Are you <i>sure</i> you want to do this?", true, "Reset settings", "Keep settings", uroDefaultSettingsAction, null);
}
function uroDefaultSettingsAction()
{
   var defaultSettings = '';

   defaultSettings += '[UROverviewCWLGroups][len=16]0,No group,false[END]';
   defaultSettings += '[UROverviewCamWatchList][len=0][END]';
   defaultSettings += '[UROverviewCameraOptions][len=852]:_cbShowWorldCams,true:_cbShowUSACams,true:_cbShowNonWorldCams,true:_cbShowOnlyCamsCreatedBy,false:_cbShowOnlyCamsEditedBy,false:_textCameraEditor,:_cbShowOnlyMyCams,false:_cbShowSpeedCams,true:_cbShowIfSpeedSet,true:_cbShowIfNoSpeedSet,true:_cbShowIfInvalidSpeedSet,true:_cbShowRedLightCams,true:_cbShowRLCIfZeroSpeedSet,true:_cbShowRLCIfNonZeroSpeedSet,true:_cbShowRLCIfNoSpeedSet,true:_cbShowDummyCams,true:_cbHideCreatedByMe,false:_cbHideCreatedByRank0,false:_cbHideCreatedByRank1,false:_cbHideCreatedByRank2,false:_cbHideCreatedByRank3,false:_cbHideCreatedByRank4,false:_cbHideCreatedByRank5,false:_cbHideUpdatedByMe,false:_cbHideUpdatedByRank0,false:_cbHideUpdatedByRank1,false:_cbHideUpdatedByRank2,false:_cbHideUpdatedByRank3,false:_cbHideUpdatedByRank4,false:_cbHideUpdatedByRank5,false:_cbHideCWLCams,false:_cbHighlightInsteadOfHideCams,false[END]';
   defaultSettings += '[UROverviewCurrentVersion][len=5]3.146[END]';
   defaultSettings += '[UROverviewFeedFilterOptions][len=795]:_cbReloadFeedAfterDelete,false:_cbFeedFilter_TypeUR,false:_cbFeedFilter_TypeUR_WithComments,false:_cbFeedFilter_TypeUR_WithoutComments,false:_cbFeedFilter_TypeMP,false:_cbFeedFilter_TypePUR,false:_cbFeedFilter_TypePM,false:_cbFeedFilter_0,false:_cbFeedFilter_1,false:_cbFeedFilter_2,false:_cbFeedFilter_3,false:_cbFeedFilter_4,false:_cbFeedFilter_5,false:_cbFeedFilter_6,false:_cbFeedFilter_7,false:_cbFeedFilter_8,false:_cbFeedFilter_9,false:_cbFeedFilter_10,false:_cbFeedFilter_11,false:_cbFeedFilter_12,false:_cbFeedFilter_13,false:_cbFeedFilter_MotNone,false:_cbFeedFilter_Invert,false:_cbFeedFilter_HideKeyword,false:_cbFeedFilter_ShowKeyword,false:_textFeedFilter_Keyword,:_cbFeedFilter_HideLessThan,false:_inputFeedFilterMinDays,:_cbFeedFilter_HideMoreThan,false:_inputFeedFilterMaxDays,[END]';
   defaultSettings += '[UROverviewFriendlyAreaNames][len=0][END]';
   defaultSettings += '[UROverviewMCOptions][len=529]:_cbMCFilterRoadworks,false:_cbMCFilterConstruction,false:_cbMCFilterClosure,false:_cbMCFilterEvent,false:_cbMCFilterNote,false:_cbMCFilterBOG,false:_cbMCFilterDifficult,false:_cbMCFilterWSLM,false:_cbInvertMCFilter,false:_cbMCHideMyFollowed,false:_cbMCHideMyUnfollowed,false:_cbMCDescriptionMustBePresent,false:_cbMCDescriptionMustBeAbsent,false:_cbMCEnableKeywordMustBePresent,false:_textMCKeywordPresent,:_cbMCEnableKeywordMustBeAbsent,false:_textMCKeywordAbsent,:_cbMCCaseInsensitive,false:_cbMCEnhancePointMCVisibility,false[END]';
   defaultSettings += '[UROverviewMPOptions][len=1219]:_cbMPFilterOutsideArea,false:_cbMPFilter_T1,false:_cbMPFilter_T2,false:_cbMPFilter_T3,false:_cbMPFilter_T5,false:_cbMPFilter_T6,false:_cbMPFilter_T7,false:_cbMPFilter_T8,false:_cbMPFilter_T10,false:_cbMPFilter_T11,false:_cbMPFilter_T12,false:_cbMPFilter_T13,false:_cbMPFilter_T14,false:_cbMPFilter_T15,false:_cbMPFilter_T16,false:_cbMPFilter_T17,false:_cbMPFilter_T19,false:_cbMPFilter_T20,false:_cbMPFilter_T21,false:_cbMPFilter_T22,false:_cbMPFilter_T23,false:_cbMPFilter_T50,false:_cbMPFilter_T51,false:_cbMPFilter_T52,false:_cbMPFilter_T53,false:_cbMPFilter_T70,false:_cbMPFilter_T71,false:_cbMPFilter_T101,false:_cbMPFilter_T102,false:_cbMPFilter_T103,false:_cbMPFilter_T104,false:_cbMPFilter_T105,false:_cbMPFilter_T106,false:_cbMPFilter_T200,false:_cbMPFilter_T300,false:_cbMPFilterUnknownProblem,false:_cbFilterElgin,false:_cbFilterTrafficCast,false:_cbFilterTrafficMaster,false:_cbFilterCaltrans,false:_cbFilterTFL,false:_cbMPFilterReopenedProblem,false:_cbInvertMPFilter,false:_cbMPFilterClosed,false:_cbMPFilterSolved,false:_cbMPFilterUnidentified,false:_cbMPClosedUserIDFilter,false:_cbMPNotClosedUserIDFilter,false:_cbMPFilterLowSeverity,false:_cbMPFilterMediumSeverity,false:_cbMPFilterHighSeverity,false[END]';
   defaultSettings += '[UROverviewMasterEnable][len=4]true[END]';
   defaultSettings += '[UROverviewMiscOptions][len=1698]:_cbHideUserRTCs,false:_cbHideEditorRTCs,false:_cbHideFutureEditorRTCs,false:_cbHideWazeRTCs,false:_cbHideFutureWazeRTCs,false:_cbHideSegmentsWhenRoadsHidden,false:_cbKillInertialPanning,false:_cbNativeConvoMarkers,true:_cbNativeBetaConvoMarkers,true:_cbCommentCount,false:_cbEnableDeleteFeedEntries,false:_cbURBackfill,false:_inputFilterMinZoomLevel,10:_inputUnstackSensitivity,15:_inputUnstackZoomLevel,3:_cbCustomRoadworksMarkers,false:_cbCustomConstructionMarkers,false:_cbCustomClosuresMarkers,false:_cbCustomEventsMarkers,false:_cbCustomNotesMarkers,false:_cbCustomBOGMarkers,false:_cbCustomDifficultMarkers,false:_cbCustomWSLMMarkers,false:_cbCustomNativeSLMarkers,false:_cbCustomKeywordMarkers,false:_textCustomKeyword,:_cbCustomElginMarkers,false:_cbCustomTrafficMasterMarkers,false:_cbCustomTrafficCastMarkers,false:_cbCustomCaltransMarkers,false:_cbCustomTFLMarkers,false:_inputPopupDwellTimeout,2:_inputPopupEntryTimeout,2:_inputMaxJitter,2:_inputPopupAutoHideTimeout,0:_cbInhibitURPopup,false:_cbInhibitMPPopup,false:_cbInhibitCamPopup,false:_cbInhibitSegPopup,false:_cbInhibitSegGenericPopup,false:_cbInhibitTurnsPopup,false:_cbInhibitLandmarkPopup,false:_cbInhibitPUPopup,false:_cbInhibitMapCommentPopup,false:_cbInhibitNodesPopup,false:_cbDateFmtDDMMYY,true:_cbDateFmtMMDDYY,false:_cbDateFmtYYMMDD,false:_cbTimeFmt24H,true:_cbTimeFmt12H,false:_cbWhiteBackground,false:_inputCustomBackgroundRed,255:_inputCustomBackgroundGreen,255:_inputCustomBackgroundBlue,255:_cbInhibitNURButton,false:_cbInhibitNMPButton,false:_cbInhibitNPURButton,false:_cbHideAMLayer,false:_cbMoveAMList,false:_cbDisablePlacesFiltering,false:_cbDisableTabStyling,false:_cbHideEditorInfo,false:_cbEnableDTE,false[END]';
   defaultSettings += '[UROverviewPlaceWatchList][len=0][END]';
   defaultSettings += '[UROverviewPlacesGroups][len=65]false:false:false:false:false:false:false:false:false:false:false[END]';
   defaultSettings += '[UROverviewPlacesOptions][len=6062]:_cbFilterUneditablePlaceUpdates,false:_cbFilterLockRankedPlaceUpdates,false:_cbFilterNewPlacePUR,false:_cbFilterUpdatedDetailsPUR,false:_cbPURFilterCFPhone,false:_cbPURFilterCFName,false:_cbPURFilterCFEntryExitPoints,false:_cbPURFilterCFOpeningHours,false:_cbPURFilterCFAliases,false:_cbPURFilterCFServices,false:_cbPURFilterCFGeometry,false:_cbPURFilterCFHouseNumber,false:_cbPURFilterCFCategories,false:_cbPURFilterCFDescription,false:_cbFilterNewPhotoPUR,false:_cbFilterFlaggedPUR,false:_cbLeavePURGeos,false:_cbInvertPURFilters,false:_cbPURFilterLowSeverity,false:_cbPURFilterMediumSeverity,false:_cbPURFilterHighSeverity,false:_cbEnablePURMinAgeFilter,false:_inputPURFilterMinDays,:_cbEnablePURMaxAgeFilter,false:_inputPURFilterMaxDays,:_cbPlaceFilterEditedLessThan,false:_inputFilterPlaceEditMinDays,:_cbPlaceFilterEditedMoreThan,false:_inputFilterPlaceEditMaxDays,:_cbHidePlacesL0,false:_cbHidePlacesL1,false:_cbHidePlacesL2,false:_cbHidePlacesL3,false:_cbHidePlacesL4,false:_cbHidePlacesL5,false:_cbHidePlacesStaff,false:_cbHidePlacesAdLocked,false:_cbHideAreaPlaces,false:_cbHidePointPlaces,false:_cbHidePhotoPlaces,false:_cbHideNoPhotoPlaces,false:_cbHideLinkedPlaces,false:_cbHideNoLinkedPlaces,false:_cbHideDescribedPlaces,false:_cbHideNonDescribedPlaces,false:_cbHideKeywordPlaces,false:_cbHideNoKeywordPlaces,false:_textKeywordPlace,:_cbShowOnlyPlacesCreatedBy,false:_cbShowOnlyPlacesEditedBy,false:_textPlacesEditor,:_cbHideOnlyPlacesCreatedBy,false:_cbHideOnlyPlacesEditedBy,false:_textHidePlacesEditor,:_cbPlacesFilter-CAR_SERVICES,false:_cbPlacesFilter-GAS_STATION,false:_cbPlacesFilter-GARAGE_AUTOMOTIVE_SHOP,false:_cbPlacesFilter-CAR_WASH,false:_cbPlacesFilter-CHARGING_STATION,false:_cbPlacesFilter-TRANSPORTATION,false:_cbPlacesFilter-AIRPORT,false:_cbPlacesFilter-BUS_STATION,false:_cbPlacesFilter-FERRY_PIER,false:_cbPlacesFilter-SEAPORT_MARINA_HARBOR,false:_cbPlacesFilter-SUBWAY_STATION,false:_cbPlacesFilter-TRAIN_STATION,false:_cbPlacesFilter-BRIDGE,false:_cbPlacesFilter-TUNNEL,false:_cbPlacesFilter-TAXI_STATION,false:_cbPlacesFilter-JUNCTION_INTERCHANGE,false:_cbPlacesFilter-REST_AREAS,false:_cbPlacesFilter-PROFESSIONAL_AND_PUBLIC,false:_cbPlacesFilter-COLLEGE_UNIVERSITY,false:_cbPlacesFilter-SCHOOL,false:_cbPlacesFilter-CONVENTIONS_EVENT_CENTER,false:_cbPlacesFilter-GOVERNMENT,false:_cbPlacesFilter-LIBRARY,false:_cbPlacesFilter-CITY_HALL,false:_cbPlacesFilter-ORGANIZATION_OR_ASSOCIATION,false:_cbPlacesFilter-PRISON_CORRECTIONAL_FACILITY,false:_cbPlacesFilter-COURTHOUSE,false:_cbPlacesFilter-CEMETERY,false:_cbPlacesFilter-FIRE_DEPARTMENT,false:_cbPlacesFilter-POLICE_STATION,false:_cbPlacesFilter-MILITARY,false:_cbPlacesFilter-HOSPITAL_URGENT_CARE,false:_cbPlacesFilter-DOCTOR_CLINIC,false:_cbPlacesFilter-OFFICES,false:_cbPlacesFilter-POST_OFFICE,false:_cbPlacesFilter-RELIGIOUS_CENTER,false:_cbPlacesFilter-KINDERGARDEN,false:_cbPlacesFilter-FACTORY_INDUSTRIAL,false:_cbPlacesFilter-EMBASSY_CONSULATE,false:_cbPlacesFilter-INFORMATION_POINT,false:_cbPlacesFilter-EMERGENCY_SHELTER,false:_cbPlacesFilter-TRASH_AND_RECYCLING_FACILITIES,false:_cbPlacesFilter-SHOPPING_AND_SERVICES,false:_cbPlacesFilter-ARTS_AND_CRAFTS,false:_cbPlacesFilter-BANK_FINANCIAL,false:_cbPlacesFilter-SPORTING_GOODS,false:_cbPlacesFilter-BOOKSTORE,false:_cbPlacesFilter-PHOTOGRAPHY,false:_cbPlacesFilter-CAR_DEALERSHIP,false:_cbPlacesFilter-FASHION_AND_CLOTHING,false:_cbPlacesFilter-CONVENIENCE_STORE,false:_cbPlacesFilter-PERSONAL_CARE,false:_cbPlacesFilter-DEPARTMENT_STORE,false:_cbPlacesFilter-PHARMACY,false:_cbPlacesFilter-ELECTRONICS,false:_cbPlacesFilter-FLOWERS,false:_cbPlacesFilter-FURNITURE_HOME_STORE,false:_cbPlacesFilter-GIFTS,false:_cbPlacesFilter-GYM_FITNESS,false:_cbPlacesFilter-SWIMMING_POOL,false:_cbPlacesFilter-HARDWARE_STORE,false:_cbPlacesFilter-MARKET,false:_cbPlacesFilter-SUPERMARKET_GROCERY,false:_cbPlacesFilter-JEWELRY,false:_cbPlacesFilter-LAUNDRY_DRY_CLEAN,false:_cbPlacesFilter-SHOPPING_CENTER,false:_cbPlacesFilter-MUSIC_STORE,false:_cbPlacesFilter-PET_STORE_VETERINARIAN_SERVICES,false:_cbPlacesFilter-TOY_STORE,false:_cbPlacesFilter-TRAVEL_AGENCY,false:_cbPlacesFilter-ATM,false:_cbPlacesFilter-CURRENCY_EXCHANGE,false:_cbPlacesFilter-CAR_RENTAL,false:_cbPlacesFilter-TELECOM,false:_cbPlacesFilter-FOOD_AND_DRINK,false:_cbPlacesFilter-RESTAURANT,false:_cbPlacesFilter-BAKERY,false:_cbPlacesFilter-DESSERT,false:_cbPlacesFilter-CAFE,false:_cbPlacesFilter-FAST_FOOD,false:_cbPlacesFilter-FOOD_COURT,false:_cbPlacesFilter-BAR,false:_cbPlacesFilter-ICE_CREAM,false:_cbPlacesFilter-CULTURE_AND_ENTERTAINEMENT,false:_cbPlacesFilter-ART_GALLERY,false:_cbPlacesFilter-CASINO,false:_cbPlacesFilter-CLUB,false:_cbPlacesFilter-TOURIST_ATTRACTION_HISTORIC_SITE,false:_cbPlacesFilter-MOVIE_THEATER,false:_cbPlacesFilter-MUSEUM,false:_cbPlacesFilter-MUSIC_VENUE,false:_cbPlacesFilter-PERFORMING_ARTS_VENUE,false:_cbPlacesFilter-GAME_CLUB,false:_cbPlacesFilter-STADIUM_ARENA,false:_cbPlacesFilter-THEME_PARK,false:_cbPlacesFilter-ZOO_AQUARIUM,false:_cbPlacesFilter-RACING_TRACK,false:_cbPlacesFilter-THEATER,false:_cbPlacesFilter-OTHER,false:_cbPlacesFilter-CONSTRUCTION_SITE,false:_cbPlacesFilter-LODGING,false:_cbPlacesFilter-HOTEL,false:_cbPlacesFilter-HOSTEL,false:_cbPlacesFilter-CAMPING_TRAILER_PARK,false:_cbPlacesFilter-COTTAGE_CABIN,false:_cbPlacesFilter-BED_AND_BREAKFAST,false:_cbPlacesFilter-OUTDOORS,false:_cbPlacesFilter-PARK,false:_cbPlacesFilter-PLAYGROUND,false:_cbPlacesFilter-BEACH,false:_cbPlacesFilter-SPORTS_COURT,false:_cbPlacesFilter-GOLF_COURSE,false:_cbPlacesFilter-PLAZA,false:_cbPlacesFilter-PROMENADE,false:_cbPlacesFilter-POOL,false:_cbPlacesFilter-SCENIC_LOOKOUT_VIEWPOINT,false:_cbPlacesFilter-SKI_AREA,false:_cbPlacesFilter-NATURAL_FEATURES,false:_cbPlacesFilter-ISLAND,false:_cbPlacesFilter-SEA_LAKE_POOL,false:_cbPlacesFilter-RIVER_STREAM,false:_cbPlacesFilter-FOREST_GROVE,false:_cbPlacesFilter-FARM,false:_cbPlacesFilter-CANAL,false:_cbPlacesFilter-SWAMP_MARSH,false:_cbPlacesFilter-DAM,false:_cbPlacesFilter-PARKING_LOT,false:_cbFilterPrivatePlaces,false:_cbInvertPlacesFilter,false[END]';
   defaultSettings += '[UROverviewSegWatchList][len=0][END]';
   defaultSettings += '[UROverviewUROptions][len=1756]:_cbURFilterOutsideArea,false:_cbNoFilterForURInURL,false:_cbFilterWazeAuto,false:_cbFilterIncorrectTurn,false:_cbFilterIncorrectAddress,false:_cbFilterIncorrectRoute,false:_cbFilterMissingRoundabout,false:_cbFilterGeneralError,false:_cbFilterTurnNotAllowed,false:_cbFilterIncorrectJunction,false:_cbFilterMissingBridgeOverpass,false:_cbFilterWrongDrivingDirection,false:_cbFilterMissingExit,false:_cbFilterMissingRoad,false:_cbFilterBlockedRoad,false:_cbFilterMissingLandmark,false:_cbFilterSpeedLimits,false:_cbFilterUndefined,false:_cbFilterRoadworks,false:_cbFilterConstruction,false:_cbFilterClosure,false:_cbFilterEvent,false:_cbFilterNote,false:_cbFilterBOG,false:_cbFilterDifficult,false:_cbFilterWSLM,false:_cbInvertURFilter,false:_cbFilterOpenUR,false:_cbFilterClosedUR,false:_cbFilterSolved,false:_cbFilterUnidentified,false:_cbEnableMinAgeFilter,false:_inputFilterMinDays,:_cbEnableMaxAgeFilter,false:_inputFilterMaxDays,:_cbHideMyFollowed,false:_cbHideMyUnfollowed,false:_cbURDescriptionMustBePresent,false:_cbURDescriptionMustBeAbsent,false:_cbEnableKeywordMustBePresent,false:_textKeywordPresent,:_cbEnableKeywordMustBeAbsent,false:_textKeywordAbsent,:_cbCaseInsensitive,false:_cbHideMyComments,false:_cbHideAnyComments,false:_cbHideIfLastCommenter,false:_cbHideIfNotLastCommenter,false:_cbHideIfReporterLastCommenter,false:_cbHideIfReporterNotLastCommenter,false:_cbEnableMinCommentsFilter,false:_inputFilterMinComments,:_cbEnableMaxCommentsFilter,false:_inputFilterMaxComments,:_cbEnableCommentAgeFilter2,false:_inputFilterCommentDays2,:_cbEnableCommentAgeFilter,false:_inputFilterCommentDays,:_cbIgnoreOtherEditorComments,false:_cbURUserIDFilter,false:_cbURResolverIDFilter,false:_cbInvertURStateFilter,false:_cbNoFilterForTaggedURs,false[END]';

   document.getElementById('_txtSettings').value = defaultSettings;
   uroTextToSettings();
   document.getElementById('_txtSettings').value = '';
}
function uroSettingsToText()
{
   var txtSettings = '';

   uroSaveSettings();

   for(var lsEntry in localStorage)
   {
      if(lsEntry.indexOf('UROverview') === 0)
      {
         txtSettings += '['+lsEntry+'][len=' + localStorage[lsEntry].length + ']' + localStorage[lsEntry] + '[END]\n';
      }
   }

   document.getElementById('_txtSettings').value = txtSettings;
   document.getElementById('_txtSettings').focus();
   document.getElementById('_txtSettings').select();
}
function uroTextToSettings()
{
   var txtSettings = '';
   txtSettings = uroGetElmValue('_txtSettings');
   if(txtSettings.indexOf('[END]') == -1) return;

   var subText = txtSettings.split('[END]');
   for(var i=0;i<subText.length;i++)
   {
      var aPos = subText[i].indexOf('[');
      var bPos = subText[i].indexOf(']');
      if((aPos != -1) && (bPos != -1))
      {
         var settingID = subText[i].substr(aPos+1,bPos-1-aPos);
         subText[i] = subText[i].substr(bPos+1);
         bPos = subText[i].indexOf(']');
         if(bPos != -1)
         {
            var settingLength = subText[i].substr(5,bPos-5);
            subText[i] = subText[i].substr(bPos+1);
            if(subText[i].length == settingLength)
            {
               localStorage[settingID] = subText[i];
            }
         }
      }
   }
   uroLoadSettings();
}
function uroClearSettingsText()
{
   document.getElementById('_txtSettings').value = '';
}


function uroDateToDays(dateToConvert)
{
   var dateNow = new Date();

   var elapsedSinceEpoch = dateNow.getTime();
   var elapsedSinceEvent = elapsedSinceEpoch - dateToConvert;

   dateNow.setHours(0);
   dateNow.setMinutes(0);
   dateNow.setSeconds(0);
   dateNow.setMilliseconds(0);
   var elapsedSinceMidnight = elapsedSinceEpoch - dateNow.getTime();
   dateNow.setHours(24);
   var pendingUntilMidnight = elapsedSinceEpoch - dateNow.getTime();

   if((elapsedSinceEvent < elapsedSinceMidnight) && (elapsedSinceEvent > pendingUntilMidnight))
   {
      // event occurred today...
      return 0;
   }
   else if(elapsedSinceEvent < 0)
   {
      // event occurrs at some point in the future after midnight today, so return a minimum value of -1...
      return -1 - Math.floor((pendingUntilMidnight - elapsedSinceEvent) / 86400000);
   }
   else
   {
      // event occurred at some point prior to midnight this morning, so return a minimum value of 1...
      return 1 + Math.floor((elapsedSinceEvent - elapsedSinceMidnight) / 86400000);
   }
}
function uroGetURAge(urObj,ageType,getRaw)
{
   if(ageType === 0)
   {
      if((urObj.attributes.driveDate === null)||(urObj.attributes.driveDate === 0)) return -1;
      if(getRaw) return urObj.attributes.driveDate;
      else return uroDateToDays(urObj.attributes.driveDate);
   }
   else if(ageType === 1)
   {
      if((urObj.attributes.resolvedOn === null)||(urObj.attributes.resolvedOn === 0)) return -1;
      if(getRaw) return urObj.attributes.resolvedOn;
      else return uroDateToDays(urObj.attributes.resolvedOn);
   }
   else
   {
      return -1;
   }
}
function uroGetMCAge(mcObj,ageType,getRaw)
{
   if(ageType === 0)
   {
      if((mcObj.attributes.createdOn === null)||(mcObj.attributes.createdOn === 0)) return -1;
      if(getRaw) return mcObj.attributes.createdOn;
      else return uroDateToDays(mcObj.attributes.createdOn);
   }
   else if(ageType === 1)
   {
      if((mcObj.attributes.updatedOn === null)||(mcObj.attributes.updatedOn === 0)) return -1;
      if(getRaw) return mcObj.attributes.updatedOn;
      else return uroDateToDays(mcObj.attributes.updatedOn);
   }
   else if(ageType === 2)
   {
      if((mcObj.attributes.endDate === null)||(mcObj.attributes.endDate === 0)) return -1;
      var tDate = new Date(mcObj.attributes.endDate);
      if(getRaw) return tDate;
      else return uroDateToDays(tDate);
   }
   else
   {
      return -1;
   }
}
function uroGetPURAge(purObj)
{
   if(purObj.attributes.venueUpdateRequests[0].attributes.dateAdded !== null)
   {
      return uroDateToDays(purObj.attributes.venueUpdateRequests[0].attributes.dateAdded);
   }
   else
   {
      return -1;
   }
}
function uroGetCameraAge(camObj, mode)
{
   if(mode === 0)
   {
      if(camObj.attributes.updatedOn === null) return -1;
      return uroDateToDays(camObj.attributes.updatedOn);
   }
   if(mode === 1)
   {
      if(camObj.attributes.createdOn === null) return -1;
      return uroDateToDays(camObj.attributes.createdOn);
   }
}
function uroGetCommentAge(commentObj)
{
   if(commentObj.createdOn === null) return -1;
   return uroDateToDays(commentObj.createdOn);
}
function uroParseDaysAgo(days)
{
  if(days === 0) return 'today';
  else if(days === 1) return '1 day ago';
  else return days+' days ago';
}
function uroParseDaysToGo(days)
{
  days = 0 - days;
  if(days === 0) return 'today';
  else if(days === 1) return 'in 1 day';
  else return 'in '+days+' days';
}
function uroGetLocalisedSpeedString(camSpeed, includeValidity)
{
   if(camSpeed !== null)
   {
      var conversionFactor = 1;  // default to metric
      var multipleFactor = 10;   // default to limits being set in multiples of 10

      var country;
      if(W.model.countries.top === undefined)
      {
         country = W.model.countries.additionalInfo[0].name;
      }
      else
      {
         country = W.model.countries.top.name;
      }
      if(country !== null)
      {
         // country-specific deviations from the above...
         if
         (
            (country == "United Kingdom") ||
            (country == "Jersey") ||
            (country == "Guernsey") ||
            (country == "United States")
         )
         {
            // countries using MPH
            conversionFactor = 1.609;
         }
         if
         (
            (country == "United States") ||
            (country == "Guernsey")
         )
         {
            // countries with speed limits set in multiples of 5
            multipleFactor = 5;
         }
      }

      var speed = Math.round(camSpeed / conversionFactor);
      var retval = speed;
      if(conversionFactor == 1) retval += "KM/H";
      else retval += "MPH";

      if(includeValidity === true)
      {
         // special handling for the 7KM/H spielstrasse found in Germany...
         if(country == "Germany")
         {
            if(speed != 7)
            {
               if(speed % multipleFactor !== 0) retval += " (not valid?)";
            }
         }
         else
         {
            if(speed % multipleFactor !== 0) retval += " (not valid?)";
         }
      }

      return retval;
   }
   else return "not set";
}


// --------------------------------------------------------------------------------------------------------------------
// AREA FRIENDLYNAME STUFF
// --------------------------------------------------------------------------------------------------------------------
function uroAFNObj(fName, area, server)
{
   this.fName = fName;
   this.area = area;
   this.server = server;
}
function uroUpdateAreaName(name, server, area)
{
   var foundExisting = false;
   for(var i=0; i<uroFriendlyAreaNames.length; i++)
   {
      if((uroFriendlyAreaNames[i].server == server) && (uroFriendlyAreaNames[i].area == area))
      {
         if(name === "")
         {
            uroFriendlyAreaNames.splice(i,1);
            foundExisting = true;
         }
         else
         {
            uroFriendlyAreaNames[i].fName = name;
            foundExisting = true;
         }
      }
   }

   if((foundExisting === false) && (name !== ""))
   {
      uroFriendlyAreaNames.push(new uroAFNObj(name,area,server));
   }
   uroReplaceAreaNames(true);
}
function uroAreaNameHover()
{
   if((uroAreaNameHoverObj === null) || (uroAreaNameHoverObj != this))
   {
      uroAreaNameHoverTime = 0;
   }
   uroAreaNameHoverObj = this;
}
function uroAreaNameUnHover()
{
   if(uroANEditHovered === true)
   {
      return false;
   }
   if(uroAreaNameOverlayShown)
   {
      uroAreaNameHoverObj.removeChild(uroANEditBox);
   }
   uroAreaNameHoverObj = null;
   uroAreaNameHoverTime = -1;
   uroAreaNameOverlayShown = false;
}
function uroANEditHover()
{
   uroANEditHovered = true;
   uroAddEventListener('uroANEditBox','mouseout',uroANEditUnHover,false);
   uroAddEventListener('uroANEditBox','click',uroANEditClick,false);
}
function uroANEditUnHover()
{
   var newName = document.getElementById('_textAreaName').value;
   // sanitise name to avoid conflicts with config storage delimiters...
   newName = newName.replace(',','');
   newName = newName.replace(':','');
   var server = W.app.getAppRegionCode();
   var area = uroGetAreaArea(uroAreaNameHoverObj.parentNode.children[1]);
   uroAreaNameHoverObj.removeChild(uroANEditBox);
   uroAreaNameOverlayShown = false;
   uroANEditHovered = false;
   uroUpdateAreaName(newName, server, area);
}
function uroANEditClick(e)
{
   // this traps the click to prevent it falling through to the underlying area name element and
   // potentially causing the map view to be relocated to that area...
   e.stopPropagation();
}
function uroGetAreaArea(listObj)
{
   var area = listObj.getElementsByTagName('span')[0].innerHTML;
   area = parseFloat(area.split(' ')[0]);
   return area;
}
function uroAreaNameOverlaySetup()
{
   uroAreaNameOverlayShown = true;

   uroANEditBox = document.createElement('div');
   uroANEditBox.id = "uroANEditBox";
   uroANEditBox.style.position = "absolute";
   uroANEditBox.style.top = '7px';
   uroANEditBox.style.left = '2px';
   uroANEditBox.style.width = "99%";
   uroAreaNameHoverObj.appendChild(uroANEditBox);
   uroANEditBox.onmouseover = uroANEditHover();
   var existingName = uroAreaNameHoverObj.innerHTML;
   var italicTagPos = existingName.indexOf(' <i>');
   if(italicTagPos == -1)
   {
      existingName = "";
   }
   else
   {
      existingName = existingName.substr(0,italicTagPos);
   }
   uroANEditBox.innerHTML = '<input type="text" style="font-size:14px; line-height:16px; height:22px; width:100%" id="_textAreaName" value="'+existingName+'">';
}

function uroReplaceAreaNames(replaceAfterNameChange)
{
   if(document.getElementById('sidepanel-areas') === undefined)
   {
      return;
   }

   if(document.getElementById('sidepanel-areas').getElementsByClassName('result-list').length === 0)
   {
      return;
   }

   if(replaceAfterNameChange === false)
   {
      if(document.getElementById('sidepanel-areas').getElementsByClassName('result-list')[0].id == "friendlyNamed")
      {
         return;
      }
   }

   var panelRootObj = document.getElementById('sidepanel-areas').getElementsByClassName('result-list')[0];
   if(panelRootObj === undefined)
   {
      // we get here if the user doesn't have any areas defined...
      return;
   }

   var areaCount = panelRootObj.children.length;
   if(areaCount === 0)
   {
      return;
   }

   var localisedManagedArea = I18n.lookup("user.areas.managed_area");
   for(var loop=0; loop < areaCount; loop++)
   {
      var childObjPElems = panelRootObj.children[loop].getElementsByTagName('p');
      var title = childObjPElems[0].innerHTML;
      if(title.indexOf(localisedManagedArea) > -1)
      {
         var area = uroGetAreaArea(childObjPElems[1]);
         childObjPElems[0].innerHTML = localisedManagedArea;

         for(var fnIdx=0; fnIdx < uroFriendlyAreaNames.length; fnIdx++)
         {
            var fnObj = uroFriendlyAreaNames[fnIdx];
            if((fnObj.area == area) && (fnObj.server == W.app.getAppRegionCode()))
            {
               childObjPElems[0].innerHTML = fnObj.fName +' <i>('+localisedManagedArea+')</i>';
               break;
            }
         }
         var titleObj = panelRootObj.getElementsByClassName('title')[loop];
         titleObj.addEventListener("mouseover", uroAreaNameHover, false);
         titleObj.addEventListener("mouseout", uroAreaNameUnHover, false);
         titleObj.style.cursor = "text";
      }
   }
   document.getElementById('sidepanel-areas').getElementsByClassName('result-list')[0].id = "friendlyNamed";
}

// --------------------------------------------------------------------------------------------------------------------
// WATCHLIST STUFF
// --------------------------------------------------------------------------------------------------------------------

// Generic Functions
function uroTypeCast(varin)
{
   if(varin == "null") return null;
   if(typeof varin == "string") return parseInt(varin);
   return varin;
}
function uroTruncate(val)
{
   if(val === null) return val;
   if(val < 0) return Math.ceil(val);
   return Math.floor(val);
}
function uroOWLGroupObj(groupID, groupName, groupCollapsed)
{
   groupID = uroTypeCast(groupID);
   this.groupID = groupID;
   this.groupName = groupName;
   this.groupCount = 0;
   this.groupCollapsed = groupCollapsed;
}

// Camera Functions
function uroCamWatchObjCheckProps(type, azymuth, speed, lat, lon)
{
   if(type !== null) type = uroTypeCast(type);
   if(azymuth !== null) azymuth = uroTruncate(uroTypeCast(azymuth)%360);
   if(speed !== null) speed = uroTruncate(uroTypeCast(speed));
   if(lat !== null) lat = uroTruncate(uroTypeCast(lat));
   if(lon !== null) lon = uroTruncate(uroTypeCast(lon));

   this.type = type;
   this.azymuth = azymuth;
   this.speed = speed;
   this.lat = lat;
   this.lon = lon;
}
function uroCamWatchObj(persistent, fid, lon, lat, type, azymuth, speed, groupID, server)
{
   fid = uroTypeCast(fid);
   groupID = uroTypeCast(groupID);
   if(typeof persistent == "string") persistent = (persistent == "true");
   if(server === "undefined") server = "??";

   this.fid = fid;
   this.persistent = persistent;
   this.loaded = false;
   this.server = server;
   this.groupID = groupID;
   this.watch = new uroCamWatchObjCheckProps(type, azymuth, speed, lat, lon);
   this.current = new uroCamWatchObjCheckProps(null, null, null, null, null);
}
function uroCamDataChanged(idx)
{
   var camObj = uroCamWatchObjects[idx];
   if(camObj.loaded === false) return false;
   if(camObj.current.type != camObj.watch.type) return true;
   if(camObj.current.azymuth != camObj.watch.azymuth) return true;
   if(camObj.current.speed != camObj.watch.speed) return true;
   if(camObj.current.lat != camObj.watch.lat) return true;
   if(camObj.current.lon != camObj.watch.lon) return true;
   return false;
}
function uroFindCWLGroupByIdx(groupIdx)
{
   var groupName = '';
   for(var loop=0;loop<uroCWLGroups.length;loop++)
   {
      if(uroCWLGroups[loop].groupID == groupIdx)
      {
         groupName = uroCWLGroups[loop].groupName;
         break;
      }
   }
   return groupName;
}
function uroIsCamOnWatchList(fid)
{
   for(var loop=0;loop<uroCamWatchObjects.length;loop++)
   {
      if(uroCamWatchObjects[loop].fid == fid) return loop;
   }
   return -1;
}
function uroAddCurrentCamWatchData(idx, lat, lon, type, azymuth, speed, server)
{
   var camObj = uroCamWatchObjects[idx];
   camObj.loaded = true;
   camObj.server = server;
   camObj.current = new uroCamWatchObjCheckProps(type, azymuth, speed, lat, lon);
   return(uroCamDataChanged(idx));
}
function uroAddCamToWatchList()
{
   if(uroIsCamOnWatchList(uroShownFID) == -1)
   {
      var camObj = W.model.cameras.objects[uroShownFID];
      uroCamWatchObjects.push(new uroCamWatchObj(true, uroShownFID, camObj.geometry.x, camObj.geometry.y, camObj.attributes.type, camObj.attributes.azymuth, camObj.attributes.speed, 0, W.app.getAppRegionCode()));
      uroAddCurrentCamWatchData(uroCamWatchObjects.length-1, camObj.geometry.y, camObj.geometry.x, camObj.attributes.type, camObj.attributes.azymuth, camObj.attributes.speed, W.app.getAppRegionCode());
      uroAddLog('added camera '+uroShownFID+' to watchlist');
      uroOWLUpdateHTML();
   }
}
function uroRemoveCamFromWatchList()
{
   var camidx = uroIsCamOnWatchList(uroShownFID);
   if(camidx != -1)
   {
      uroCamWatchObjects.splice(camidx,1);
      uroAddLog('removed camera '+uroShownFID+' from watchlist');
      uroOWLUpdateHTML();
   }
}
function uroUpdateCamWatchList()
{
   var camIdx = uroIsCamOnWatchList(uroShownFID);
   if(camIdx != -1)
   {
      var camObj = W.model.cameras.objects[uroShownFID];
      uroCamWatchObjects[camIdx].watch = new uroCamWatchObjCheckProps(camObj.attributes.type, camObj.attributes.azymuth, camObj.attributes.speed, camObj.geometry.y, camObj.geometry.x);
   }
}
function uroClearCamWatchList()
{
   uroShowAlertBox("fa-warning", "URO+ Warning", "Removing all cameras from the OWL <b>cannot</b> be undone.<br>Are you <i>sure</i> you want to do this?", true, "Delete ALL Cameras", "Keep Cameras", uroClearCamWatchListAction, null);
}
function uroClearCamWatchListAction()
{
   uroCamWatchObjects = [];
   uroOWLUpdateHTML();
}
function uroRetrieveCameras(lat, lon)
{
   var camPos = new OL.LonLat();
   var camChanged = false;

   camPos.lon = lon;
   camPos.lat = lat;
   camPos.transform(new OL.Projection("EPSG:900913"),new OL.Projection("EPSG:4326"));

   var camURL = 'https://' + document.location.host;
   camURL += W.Config.api_base;
   camURL += '/Features?language=en&cameras=true&bbox=';
   var latl = camPos.lat - 0.25;
   var latu = camPos.lat + 0.25;
   var lonl = camPos.lon - 0.25;
   var lonr = camPos.lon + 0.25;
   camURL += lonl+','+latl+','+lonr+','+latu;
   uroAddLog('retrieving camera data around '+camPos.lon+','+camPos.lat);

   var camReq = new XMLHttpRequest();
   camReq.open('GET',camURL,false);
   try
   {
      camReq.send();
      uroAddLog('response '+camReq.status+' received for camera data request');
      if (camReq.status === 200)
      {
         var camData = JSON.parse(camReq.responseText);
         for(var camIdx = 0; camIdx < camData.cameras.objects.length; camIdx++)
         {
            var camObj = camData.cameras.objects[camIdx];
            var listIdx = uroIsCamOnWatchList(camObj.id);
            if(listIdx != -1)
            {
               camPos.lon = camObj.geometry.coordinates[0];
               camPos.lat = camObj.geometry.coordinates[1];
               camPos.transform(new OL.Projection("EPSG:4326"),new OL.Projection("EPSG:900913"));
               camPos.lon = uroTruncate(camPos.lon);
               camPos.lat = uroTruncate(camPos.lat);
               camChanged = (uroAddCurrentCamWatchData(listIdx, camPos.lat, camPos.lon, camObj.type, camObj.azymuth, camObj.speed, W.app.getAppRegionCode()) || camChanged);
            }
         }
      }
      else
      {
         uroAddLog('camera data request failed (status != 200)');
      }
   }
   catch(err)
   {
      uroAddLog('camera data request failed (exception '+err+' caught)');
   }
   return camChanged;
}
function uroGetCurrentCamWatchListObjects()
{
   var camChanged = false;
   var camsChanged = [];
   var camsDeleted = [];
   var camidx;
   var camObj;
   for(camidx=0;camidx<uroCamWatchObjects.length;camidx++)
   {
      camObj = uroCamWatchObjects[camidx];
      if((camObj.loaded === false) && ((camObj.server == W.app.getAppRegionCode()) || (camObj.server == '??')))
      {
         if(typeof W.model.cameras.objects[camObj.fid] == 'object')
         {
            if(W.model.cameras.objects[camObj.fid].state != "Delete")
            {
               var wazeObj = W.model.cameras.objects[camObj.fid];
               camChanged = (uroAddCurrentCamWatchData(camidx, wazeObj.geometry.y, wazeObj.geometry.x, wazeObj.attributes.type, wazeObj.attributes.azymuth, wazeObj.attributes.speed) || camChanged);
            }
            else
            {
               camChanged = (uroRetrieveCameras(camObj.watch.lat, camObj.watch.lon) || camChanged);
            }
         }
         else
         {
            camChanged = (uroRetrieveCameras(camObj.watch.lat, camObj.watch.lon) || camChanged);
         }
      }
   }

   if(camChanged)
   {
      for(camidx=0;camidx<uroCamWatchObjects.length;camidx++)
      {
         if(uroCamDataChanged(camidx))
         {
            camsChanged.push(uroCamWatchObjects[camidx]);
         }
      }
   }

   for(camidx=0;camidx<uroCamWatchObjects.length;camidx++)
   {
      camObj = uroCamWatchObjects[camidx];
      if((camObj.loaded === false) && (camObj.server == W.app.getAppRegionCode()))
      {
         camsDeleted.push(camObj);
      }
   }
   if((camsChanged.length > 0) || (camsDeleted.length > 0))
   {
      var alertStr = '';
      for(camidx=0;camidx<camsChanged.length;camidx++)
      {
         alertStr += 'Camera ID '+camsChanged[camidx].fid+' in group "'+uroFindCWLGroupByIdx(camsChanged[camidx].groupID)+'" has been changed<br>';
      }
      alertStr += '<br>';
      for(camidx=0;camidx<camsDeleted.length;camidx++)
      {
         alertStr += 'Camera ID '+camsDeleted[camidx].fid+' in group "'+uroFindCWLGroupByIdx(camsDeleted[camidx].groupID)+'" has been deleted<br>';
      }
      uroShowAlertBox("fa-info-circle", "URO+ Camera Watchlist Alert", alertStr, false, "OK", null, null, null);
   }
}
function uroClearDeletedCameras()
{
   for(var camidx=uroCamWatchObjects.length-1;camidx>=0;camidx--)
   {
      if(uroCamWatchObjects[camidx].loaded === false)
      {
         uroShownFID = uroCamWatchObjects[camidx].fid;
         uroRemoveCamFromWatchList();
      }
   }
}
function uroAcceptCameraChanges()
{
   for(var camidx=0; camidx < uroCamWatchObjects.length; camidx++)
   {
      if(uroCamDataChanged(camidx))
      {
         uroCamWatchObjects[camidx].watch.type = uroCamWatchObjects[camidx].current.type;
         uroCamWatchObjects[camidx].watch.azymuth = uroCamWatchObjects[camidx].current.azymuth;
         uroCamWatchObjects[camidx].watch.speed = uroCamWatchObjects[camidx].current.speed;
         uroCamWatchObjects[camidx].watch.lat = uroCamWatchObjects[camidx].current.lat;
         uroCamWatchObjects[camidx].watch.lon = uroCamWatchObjects[camidx].current.lon;
      }
   }
   uroOWLUpdateHTML();
}
function uroClearUnknownServerCameras()
{
   var confirmMsg = '<p>Cameras with an unknown server <i>cannot</i> be automatically verified by URO+</p>';
   confirmMsg += 'It is recommended that you manually load WME from each server (World, USA/Canada and Israel) to give URO+ a chance of locating these cameras.<br>';
   confirmMsg += 'If the cameras then continue to show up as an unknown server, it is safe to delete them...<br><br>';
   confirmMsg += 'Do you still wish to proceed with deleting all unknown server cameras?';

   uroShowAlertBox("fa-warning", "URO+ Warning", confirmMsg, true, "Delete unknown cameras", "Keep unknown cameras", uroClearUnknownServerCamerasAction, null);
}
function uroClearUnknownServerCamerasAction()
{
   for(var camidx=uroCamWatchObjects.length-1;camidx>=0;camidx--)
   {
      if(uroCamWatchObjects[camidx].server == '??')
      {
         uroShownFID = uroCamWatchObjects[camidx].fid;
         uroRemoveCamFromWatchList();
      }
   }
}
function uroRescanCamWatchList()
{
   for(var camidx=0;camidx<uroCamWatchObjects.length;camidx++)
   {
      uroCamWatchObjects[camidx].loaded = false;
   }
   uroGetCurrentCamWatchListObjects();
   uroOWLUpdateHTML();
}
function uroGotoCam()
{
   var camidx = this.id.substr(13);
   var camPos = new OL.LonLat();
   camPos.lon = uroCamWatchObjects[camidx].watch.lon;
   camPos.lat = uroCamWatchObjects[camidx].watch.lat;
   W.map.setCenter(camPos,4);
   W.map.camerasLayer.setVisibility(true);
   return false;
}

// Segment Functions
/*
function uroSegWatchObjCheckProps(left, right, bottom, top, fromNode, toNode, fwdDir, revDir, length, level, rank, roadType, updatedOn)
{
   if(left !== null) left = uroTruncate(uroTypeCast(left));
   if(right !== null) right = uroTruncate(uroTypeCast(right));
   if(bottom !== null) bottom = uroTruncate(uroTypeCast(bottom));
   if(top !== null) top = uroTruncate(uroTypeCast(top));
   if(fromNode !== null) fromNode = uroTypeCast(fromNode);
   if(toNode !== null) toNode = uroTypeCast(toNode);
   if(fwdDir !== null) fwdDir = uroTypeCast(fwdDir);
   if(revDir !== null) revDir = uroTypeCast(revDir);
   if(length !== null) length = uroTypeCast(length);
   if(level !== null) level = uroTypeCast(level);
   if(rank !== null) rank = uroTypeCast(rank);
   if(roadType !== null) roadType = uroTypeCast(roadType);
   if(updatedOn !== null) updatedOn = uroTypeCast(updatedOn);

   this.left = left;
   this.right = right;
   this.bottom = bottom;
   this.top = top;
   this.fromNode = fromNode;
   this.toNode = toNode;
   this.fwdDir = fwdDir;
   this.revDir = revDir;
   this.length = length;
   this.level = level;
   this.rank = rank;
   this.roadType = roadType;
   this.updatedOn = updatedOn;
}
function uroSegWatchObj(persistent, fid, left, right, bottom, top, fromNode, toNode, fwdDir, revDir, length, level, rank, roadType, updatedOn, groupID, server)
{
   fid = uroTypeCast(fid);
   groupID = uroTypeCast(groupID);
   if(typeof persistent == "string") persistent = (persistent == "true");

   this.fid = fid;
   this.persistent = persistent;
   this.loaded = false;
   this.server = server;
   this.groupID = groupID;

   this.watch = new uroSegWatchObjCheckProps(left, right, bottom, top, fromNode, toNode, fwdDir, revDir, length, level, rank, roadType, updatedOn);
   this.current = new uroSegWatchObjCheckProps(null, null, null, null, null, null, null, null, null, null, null, null, null);
}
function uroSegDataChanged(idx)
{
   var segObj = uroSegWatchObjects[idx];
   if(segObj.loaded === false) return false;
   if(segObj.current.left != segObj.watch.left) return true;
   if(segObj.current.right != segObj.watch.right) return true;
   if(segObj.current.bottom != segObj.watch.bottom) return true;
   if(segObj.current.top != segObj.watch.top) return true;
   if(segObj.current.fromNode != segObj.watch.fromNode) return true;
   if(segObj.current.toNode != segObj.watch.toNode) return true;
   if(segObj.current.fwdDir != segObj.watch.fwdDir) return true;
   if(segObj.current.revDir != segObj.watch.revDir) return true;
   if(segObj.current.length != segObj.watch.length) return true;
   if(segObj.current.level != segObj.watch.level) return true;
   if(segObj.current.rank != segObj.watch.rank) return true;
   if(segObj.current.roadType != segObj.watch.roadType) return true;
   if(segObj.current.updatedOn != segObj.watch.updatedOn) return true;
   return false;
}
function uroIsSegOnWatchList(fid)
{
   for(var loop=0;loop<uroSegWatchObjects.length;loop++)
   {
      if(uroSegWatchObjects[loop].fid == fid) return loop;
   }
   return -1;
}
function uroAddCurrentSegWatchData(idx, left, right, bottom, top, fromNode, toNode, fwdDir, revDir, length, level, rank, roadType, updatedOn, server)
{
   var segObj = uroSegWatchObjects[idx];
   segObj.loaded = true;
   segObj.server = server;
   segObj.current = new uroSegWatchObjCheckProps(left, right, bottom, top, fromNode, toNode, fwdDir, revDir, length, level, rank, roadType, updatedOn);
   return(uroSegDataChanged(idx));
}
function uroClearSegWatchList()
{
   if(confirm('Removing all segments from the OWL cannot be undone\nAre you sure you want to do this?') === true)
   {
      uroSegWatchObjects = [];
      uroOWLUpdateHTML();
   }
}
function uroAddUpdateSegWatchList()
{
   var selectedCount = W.selectionManager.selectedItems.length;
   if(selectedCount === 0)
   {
      return;
   }

   for(var loop=0;loop < selectedCount; loop++)
   {
      var segObj = W.selectionManager.selectedItems[loop].model.attributes;
      var fid = segObj.id;
      var idx = uroIsSegOnWatchList(fid);
      if(idx != -1)
      {
         uroSegWatchObjects[idx].watch = new uroSegWatchObjCheckProps(segObj.geometry.bounds.left, segObj.geometry.bounds.right, segObj.geometry.bounds.bottom, segObj.geometry.bounds.top, segObj.fromNodeID, segObj.toNodeID, segObj.fwdDirection, segObj.revDirection, segObj.length, segObj.level, segObj.rank, segObj.roadType, segObj.updatedOn);
         uroAddLog('updated watchlist details for segment '+fid);
      }
      else
      {
         uroSegWatchObjects.push(new uroSegWatchObj(true, fid, segObj.geometry.bounds.left, segObj.geometry.bounds.right, segObj.geometry.bounds.bottom, segObj.geometry.bounds.top, segObj.fromNodeID, segObj.toNodeID, segObj.fwdDirection, segObj.revDirection, segObj.length, segObj.level, segObj.rank, segObj.roadType, segObj.updatedOn, 0, W.app.getAppRegionCode()));
         uroAddCurrentSegWatchData(uroSegWatchObjects.length-1, segObj.geometry.bounds.left, segObj.geometry.bounds.right, segObj.geometry.bounds.bottom, segObj.geometry.bounds.top, segObj.fromNodeID, segObj.toNodeID, segObj.fwdDirection, segObj.revDirection, segObj.length, segObj.level, segObj.rank, segObj.roadType, segObj.updatedOn, W.app.getAppRegionCode());
         uroAddLog('added segment '+fid+' to watchlist');
      }
   }
   //uroOWLUpdateHTML();
}
function uroRemoveSegFromWatchList()
{
   var selectedCount = W.selectionManager.selectedItems.length;
   if(selectedCount === 0)
   {
      return;
   }

   for(var loop=0;loop < selectedCount; loop++)
   {
      var fid = W.selectionManager.selectedItems[loop].model.attributes.id;
      var idx = uroIsSegOnWatchList(fid);
      if(idx != -1)
      {
         uroSegWatchObjects.splice(idx,1);
         uroAddLog('removed segment '+fid+' from watchlist');
      }
   }
   //uroOWLUpdateHTML();
}
function uroRetrieveSegments(lat, lon)
{
   var pos = new OL.LonLat();
   var changed = false;

   pos.lon = lon;
   pos.lat = lat;
   pos.transform(new OL.Projection("EPSG:900913"),new OL.Projection("EPSG:4326"));

   var URL = 'https://' + document.location.host;
   URL += W.Config.api_base;
   URL += '/Features?roadTypes=1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19%2C20%2C21';
   URL += '&bbox=';
   var latl = pos.lat - 0.25;
   var latu = pos.lat + 0.25;
   var lonl = pos.lon - 0.25;
   var lonr = pos.lon + 0.25;
   URL += lonl+','+latl+','+lonr+','+latu;
   URL += '&language=en';
   uroAddLog('retrieving segment data around '+pos.lon+','+pos.lat);

   var req = new XMLHttpRequest();
   req.open('GET',URL,false);
   try
   {
      req.send();
      uroAddLog('response '+req.status+' received');
      if (req.status === 200)
      {
         var data = JSON.parse(req.responseText);
         for(var idx = 0; idx < data.segments.objects.length; idx++)
         {
            var obj = data.segments.objects[idx];
            var listIdx = uroIsSegOnWatchList(obj.id);
            if(listIdx != -1)
            {
               //pos.lon = obj.geometry.coordinates[0];
               //pos.lat = obj.geometry.coordinates[1];
               //pos.transform(new OL.Projection("EPSG:4326"),new OL.Projection("EPSG:900913"));
               //camPos.lon = uroTruncate(camPos.lon);
               //camPos.lat = uroTruncate(camPos.lat);
               //camChanged |= uroAddCurrentCamWatchData(listIdx, camPos.lat, camPos.lon, camObj.type, camObj.azymuth, camObj.speed, camObj.validated, W.app.getAppRegionCode());
            }
            else if(obj.validated === false)
            {

            }
         }
      }
      else
      {
         uroAddLog('request failed (status != 200)');
      }
   }
   catch(err)
   {
      uroAddLog('segment load request failed (exception '+err+' caught)');
   }
   return changed;
}
function uroGetCurrentSegWatchListObjects()
{
   var segChanged = false;
   var segsChanged = [];
   var segsDeleted = [];
   var idx;
   var segObj;

   for(idx=0;idx<uroSegWatchObjects.length;idx++)
   {
      segObj = uroSegWatchObjects[idx];
      if((segObj.loaded === false) && ((segObj.server == W.app.getAppRegionCode()) || (segObj.server == '??')))
      {
         var segLat = (segObj.watch.top + segObj.watch.bottom) / 2;
         var segLon = (segObj.watch.right + segObj.watch.left) / 2;
         if(typeof W.model.segments.objects[segObj.fid] == 'object')
         {
            if(W.model.segments.objects[segObj.fid].state != "Delete")
            {
               var wazeObj = W.model.segments.objects[segObj.fid];
               segChanged |= uroAddCurrentSegWatchData(idx, wazeObj.geometry.bounds.left, wazeObj.geometry.bounds.right, wazeObj.geometry.bounds.bottom, wazeObj.geometry.bounds.top, wazeObj.fromNodeID, wazeObj.toNodeID, wazeObj.fwdDirection, wazeObj.revDirection, wazeObj.length, wazeObj.level, wazeObj.rank, wazeObj.roadType, wazeObj.updatedOn, W.app.getAppRegionCode());
            }
            else
            {
               segChanged |= uroRetrieveSegments(segLat, segLon);
            }
         }
         else
         {
            segChanged |= uroRetrieveSegments(segLat, segLon);
         }
      }
   }

   if(segChanged)
   {
      for(idx=0;idx<uroSegWatchObjects.length;idx++)
      {
         if(uroSegDataChanged(idx))
         {
            segsChanged.push(uroSegWatchObjects[idx]);
         }
      }
   }

   for(idx=0;idx<uroSegWatchObjects.length;idx++)
   {
      segObj = uroSegWatchObjects[idx];
      if((segObj.loaded === false) && (segObj.server == W.app.getAppRegionCode()))
      {
         segsDeleted.push(segObj);
      }
   }

   if((segsChanged.length > 0) || (segsDeleted.length > 0))
   {
      var alertStr = 'Segment WatchList Alert!!!\r\n';
      for(idx=0;idx<segsChanged.length;idx++)
      {
         alertStr += 'Segment ID '+segsChanged[idx].fid+' in group "'+uroFindCWLGroupByIdx(segsChanged[idx].groupID)+'" has been changed\r\n';
      }
      for(idx=0;idx<segsDeleted.length;idx++)
      {
         alertStr += 'Segment ID '+segsDeleted[idx].fid+' in group "'+uroFindCWLGroupByIdx(segsDeleted[idx].groupID)+'" has been deleted\r\n';
      }
      alert(alertStr);
   }
}

// Places Functions
function uroPlaceWatchObjCheckProps(left, right, bottom, top, name, imageCount, residential, updatedOn)
{
   if(left !== null) left = uroTruncate(uroTypeCast(left));
   if(right !== null) right = uroTruncate(uroTypeCast(right));
   if(bottom !== null) bottom = uroTruncate(uroTypeCast(bottom));
   if(top !== null) top = uroTruncate(uroTypeCast(top));
   if(imageCount !== null) imageCount = uroTypeCast(imageCount);
   if(typeof residential == "string") residential = (residential == "true");
   if(updatedOn !== null) updatedOn = uroTypeCast(updatedOn);

   this.left = left;
   this.right = right;
   this.bottom = bottom;
   this.top = top;
   this.name = name;
   this.imageCount = imageCount;
   this.residential = residential;
   this.updatedOn = updatedOn;
}
function uroPlaceWatchObj(persistent, fid, left, right, bottom, top, imageCount, name, residential, updatedOn, groupID, server)
{
   groupID = uroTypeCast(groupID);
   if(typeof persistent == "string") persistent = (persistent == "true");

   this.fid = fid;
   this.persistent = persistent;
   this.loaded = false;
   this.server = server;
   this.groupID = groupID;
   this.watch = new uroPlaceWatchObjCheckProps(left, right, bottom, top, name, imageCount, residential, updatedOn);
   this.current = new uroPlaceWatchObjCheckProps(null, null, null, null, null, null, null, null);
}
function uroPlaceDataChanged(idx)
{
   var placeObj = uroPlaceWatchObjects[idx];
   if(placeObj.loaded === false) return false;
   if(placeObj.current.left != placeObj.watch.left) return true;
   if(placeObj.current.right != placeObj.watch.right) return true;
   if(placeObj.current.bottom != placeObj.watch.bottom) return true;
   if(placeObj.current.top != placeObj.watch.top) return true;
   if(placeObj.current.name != placeObj.watch.name) return true;
   if(placeObj.current.imageCount != placeObj.watch.imageCount) return true;
   if(placeObj.current.residential != placeObj.watch.residential) return true;
   if(placeObj.current.updatedOn != placeObj.watch.updatedOn) return true;
   return false;
}
function uroIsPlaceOnWatchList(fid)
{
   for(var loop=0;loop<uroPlaceWatchObjects.length;loop++)
   {
      if(uroPlaceWatchObjects[loop].fid == fid) return loop;
   }
   return -1;
}
function uroClearPlaceWatchList()
{
   if(confirm('Removing all places from the OWL cannot be undone\nAre you sure you want to do this?') === true)
   {
      uroPlaceWatchObjects = [];
      uroOWLUpdateHTML();
   }
}
*/

function uroHighlightCWLEntry()
{
   this.style.backgroundColor = '#FFFFAA';
   return false;
}
function uroUnhighlightCWLEntry()
{
   var camidx = this.id.substr(8);
   var changed = uroCamDataChanged(camidx);
   var deleted = (uroCamWatchObjects[camidx].loaded === false);

   if(uroCamWatchObjects[camidx].server != W.app.getAppRegionCode())
   {
      if(uroCamWatchObjects[camidx].server == '??') this.style.backgroundColor = '#A0A0A0';
      else this.style.backgroundColor = '#AAFFAA';
   }
   else if(changed) this.style.backgroundColor = '#AAAAFF';
   else if(deleted) this.style.backgroundColor = '#FFAAAA';
   else this.style.backgroundColor = '#FFFFFF';
   return false;
}
function uroCWLIconHighlight()
{
   this.style.color="#0000ff";
   return false;
}
function uroCWLIconLowlight()
{
   this.style.color="#ccccff";
   return false;
}
function uroPopulateCWLGroupSelect()
{
   var selector = document.getElementById('_uroCWLGroupSelect');
   while(selector.options.length > 0)
   {
      selector.options.remove(0);
   }
   for(var loop=0;loop<uroCWLGroups.length;loop++)
   {
      var groupObj = uroCWLGroups[loop];
      if(groupObj.groupID != -1)
      {
         selector.options.add(new Option(groupObj.groupName,groupObj.groupID));
      }
   }
}
function uroGetNextCWLGroupID()
{
   var nextID = 1;
   for(var loop=0;loop<uroCWLGroups.length;loop++)
   {
      if(uroCWLGroups[loop].groupID >= nextID)
      {
         nextID = uroCWLGroups[loop].groupID + 1;
      }
   }
   return nextID;
}
function uroFindCWLGroupByName(groupName)
{
   var groupID = -1;
   for(var loop=0;loop<uroCWLGroups.length;loop++)
   {
      if((uroCWLGroups[loop].groupName == groupName) && (uroCWLGroups[loop].groupID != -1))
      {
         groupID = uroCWLGroups[loop].groupID;
         break;
      }
   }
   return groupID;
}
function uroAddCWLGroup()
{
   var groupID = uroGetNextCWLGroupID();
   var groupName = uroGetElmValue('_uroCWLGroupEntry');
   if(uroFindCWLGroupByName(groupName) == -1)
   {
      uroCWLGroups.push(new uroOWLGroupObj(groupID,groupName,false));
      uroPopulateCWLGroupSelect();
   }
}
function uroRemoveCWLGroup()
{
   var loop;
   var selector = document.getElementById('_uroCWLGroupSelect');
   var groupID = parseInt(selector.selectedOptions[0].value);
   if(groupID === 0) return false;   // prevent deletion of the default group

   for(loop=0;loop<uroCamWatchObjects.length;loop++)
   {
      var cwObj = uroCamWatchObjects[loop];
      if(cwObj.groupID == groupID)
      {
         cwObj.groupID = 0;
      }
   }
   for(loop=0;loop<uroCWLGroups.length;loop++)
   {
      var groupObj = uroCWLGroups[loop];
      if(groupObj.groupID == groupID)
      {
         groupObj.groupID = -1;
      }
   }
   uroOWLUpdateHTML();
}
function uroAssignCameraToGroup()
{
   var camidx = this.id.substr(13);
   var selector = document.getElementById('_uroCWLGroupSelect');
   uroCamWatchObjects[camidx].groupID = parseInt(selector.selectedOptions[0].value);
   uroOWLUpdateHTML();
   return false;
}
function uroAddBtnEvl(btnID, evlType, evlFunction)
{
   var btnObj = document.getElementById(btnID);
   if(btnObj !== null)
   {
      btnObj.addEventListener(evlType, evlFunction, true);
   }
}
function uroCWLGroupCollapseExpand()
{
   var groupidx = this.id.substr(18);
   if(uroCWLGroups[groupidx].groupCollapsed === true) uroCWLGroups[groupidx].groupCollapsed = false;
   else uroCWLGroups[groupidx].groupCollapsed = true;
   uroOWLUpdateHTML();
   return false;
}

var uroSelectedOWLGroup = null;
function uroOWLUpdateHTML(doFullUpdate)
{
   var camTypes = new Array("","","Speed", "Dummy", "Red Light");
   var iHTML = '';

   if(document.getElementById('_uroCWLGroupSelect') !== null)
   {
      uroSelectedOWLGroup = document.getElementById('_uroCWLGroupSelect').selectedIndex;
   }
   iHTML = '<br><b>Camera Watchlist:</b><br><br>';
   iHTML += '<div id="_uroCWLCamList" style="height:65%;overflow:auto;">';
   if(uroCWLGroups.length > 0)
   {
      var camidx;
      for(var groupidx=0;groupidx<uroCWLGroups.length;groupidx++)
      {
         var groupObj = uroCWLGroups[groupidx];
         iHTML += '<div id="_uroCWLGroup-'+groupidx+'">';
         if(groupObj.groupCollapsed === true)
         {
            iHTML += '<i class="fa fa-plus-square-o" style="cursor:pointer;font-size:14px;" id="_uroCWLGroupState-'+groupidx+'"></i>';
         }
         else
         {
            iHTML += '<i class="fa fa-minus-square-o" style="cursor:pointer;font-size:14px;" id="_uroCWLGroupState-'+groupidx+'"></i>';
         }
         iHTML += '<b>'+groupObj.groupName+'</b><br>';
         groupObj.groupCount = 0;
         if(uroCamWatchObjects.length > 0)
         {
            for(camidx=0;camidx<uroCamWatchObjects.length;camidx++)
            {
               var camObj = uroCamWatchObjects[camidx];
               if(camObj.groupID == groupObj.groupID)
               {
                  groupObj.groupCount++;
                  var changed = uroCamDataChanged(camidx);
                  var deleted = (camObj.loaded === false);
                  iHTML += '<div id="_uroCWL-'+camidx+'" style="padding:3px;border-width:2px;border-style:solid;border-color:#FFFFFF;background-color:';
                  if(camObj.server != W.app.getAppRegionCode())
                  {
                     if(camObj.server == '??') iHTML += '#A0A0A0;';
                     else iHTML += '#AAFFAA;';
                  }
                  else if(changed) iHTML += '#AAAAFF;';
                  else if(deleted) iHTML += '#FFAAAA;';
                  else iHTML += '#FFFFFF;';

                  if(groupObj.groupCollapsed === true) iHTML += 'display:none;">';
                  else iHTML += 'display:block;">';

                  iHTML += 'ID: '+camObj.fid;
                  iHTML += ' ('+camObj.server+')';
                  iHTML += ' Type: '+camTypes[camObj.watch.type];
                  if(camObj.server != W.app.getAppRegionCode())
                  {
                     if(camObj.server == '??')
                     {
                        iHTML += '<br><i>Unknown server</i>';
                     }
                     else
                     {
                        iHTML += '<br><i>Not on this server</i>';
                     }
                  }
                  else if(deleted)
                  {
                     iHTML += '<br>DELETED';
                  }
                  else if(changed)
                  {
                     if(camObj.current.type != camObj.watch.type)
                     {
                        iHTML += '<br>&nbsp;&nbsp;Type changed';
                        iHTML += ' ('+camObj.watch.type+' to '+camObj.current.type+')';
                     }
                     if(camObj.current.azymuth != camObj.watch.azymuth)
                     {
                        iHTML += '<br>&nbsp;&nbsp;Azimuth changed';
                        iHTML += ' ('+camObj.watch.azymuth+' to '+camObj.current.azymuth+')';
                     }
                     if(camObj.current.speed != camObj.watch.speed)
                     {
                        iHTML += '<br>&nbsp;&nbsp;Speed changed';
                        iHTML += ' ('+camObj.watch.speed+' to '+camObj.current.speed+')';
                     }
                     if(camObj.current.lat != camObj.watch.lat)
                     {
                        iHTML += '<br>&nbsp;&nbsp;Latitude changed';
                        iHTML += ' ('+camObj.watch.lat+' to '+camObj.current.lat+')';
                     }
                     if(camObj.current.lon != camObj.watch.lon)
                     {
                        iHTML += '<br>&nbsp;&nbsp;Longitude changed';
                        iHTML += ' ('+camObj.watch.lon+' to '+camObj.current.lon+')';
                     }
                  }

                  if(camObj.server == W.app.getAppRegionCode())
                  {
                     if(deleted === false)
                     {
                        iHTML += '&nbsp;<i class="fa fa-group" style="cursor:pointer;font-size:14px;color:#ccccff;" id="_uroCWLIcon1-'+camidx+'"></i>';
                     }
                     iHTML += '&nbsp;<i class="fa fa-arrow-circle-right" style="cursor:pointer;font-size:14px;color:#ccccff;" id="_uroCWLIcon2-'+camidx+'"></i>';
                  }
                  iHTML += '</div>';
               }
            }
         }
         iHTML += '</div>';
      }
   }
   iHTML += '</div><div id="_uroCWLControls">';
   iHTML += '<hr>Group control:<br>';
   iHTML += '<select id="_uroCWLGroupSelect" style="width:40%;height:22px;"></select>&nbsp;<input type="button" id="_btnCWLGroupDel" value="Delete group"><br>';
   iHTML += '<input type="text" id="_uroCWLGroupEntry" style="width:40%;height:22px;">&nbsp;<input type="button" id="_btnCWLGroupAdd" value="Add group">';
   iHTML += '<br><input type="button" id="_btnRescanCamWatchList" value="Refresh camera data"><br><br>';
   iHTML += '<input type="button" id="_btnUpdateCamValues" value="Accept all changes"><br><br>';
   iHTML += '<b>Remove cameras from OWL:</b><br>';
   iHTML += '<input type="button" id="_btnRemoveDeletedCameras" value="Deleted">&nbsp;&nbsp;';
   iHTML += '<input type="button" id="_btnRemoveUnknownServerCameras" value="Unknown Server">&nbsp;&nbsp;';
   iHTML += '<input type="button" id="_btnClearCamWatchList" value="ALL Cameras">';
   iHTML += '</div>';
   uroOWL.innerHTML = iHTML;

   uroFinaliseOWLHTMLUpdate();
}
function uroFinaliseOWLHTMLUpdate()
{
   if(uroCamWatchObjects.length > 0)
   {
      if(document.getElementById("_uroCWL-0") == null)
      {
         setTimeout(uroFinaliseOWLHTMLUpdate,100);
         return;
      }

      for(var camidx=0;camidx<uroCamWatchObjects.length;camidx++)
      {
         document.getElementById("_uroCWL-"+camidx).onmouseover = uroHighlightCWLEntry;
         document.getElementById("_uroCWL-"+camidx).onmouseleave = uroUnhighlightCWLEntry;

         if(uroCamWatchObjects[camidx].server == W.app.getAppRegionCode())
         {
            var icon1 = document.getElementById("_uroCWLIcon1-"+camidx);
            var icon2 = document.getElementById("_uroCWLIcon2-"+camidx);
            if(icon1 !== null)
            {
               icon1.onmouseover = uroCWLIconHighlight;
               icon1.onmouseleave = uroCWLIconLowlight;
               icon1.onclick = uroAssignCameraToGroup;
            }
            if(icon2 !== null)
            {
               icon2.onmouseover = uroCWLIconHighlight;
               icon2.onmouseleave = uroCWLIconLowlight;
               icon2.onclick = uroGotoCam;
            }
         }
      }
   }

   if(document.getElementById('_btnClearCamWatchList') == null)
   {
      setTimeout(uroFinaliseOWLHTMLUpdate,100);
      return;
   }

   uroAddBtnEvl('_btnClearCamWatchList', 'click', uroClearCamWatchList);
   uroAddBtnEvl('_btnRemoveDeletedCameras', 'click', uroClearDeletedCameras);
   uroAddBtnEvl('_btnRemoveUnknownServerCameras', 'click', uroClearUnknownServerCameras);
   uroAddBtnEvl('_btnRescanCamWatchList', 'click', uroRescanCamWatchList);
   uroAddBtnEvl('_btnUpdateCamValues', 'click', uroAcceptCameraChanges);
   uroAddBtnEvl('_btnCWLGroupDel', 'click', uroRemoveCWLGroup);
   uroAddBtnEvl('_btnCWLGroupAdd', 'click', uroAddCWLGroup);
   if(document.getElementById('_uroCWLGroupSelect') !== null)
   {
      uroAddLog('populating CWL group list');
      uroPopulateCWLGroupSelect();
      var selector = document.getElementById('_uroCWLGroupSelect');
      if(uroSelectedOWLGroup >= selector.length)
      {
         uroSelectedOWLGroup = 0;
      }
      selector.selectedIndex = uroSelectedOWLGroup;
   }

   if(uroCWLGroups.length > 0)
   {
      for(var groupidx=0;groupidx<uroCWLGroups.length;groupidx++)
      {
         if(uroCWLGroups[groupidx].groupCount === 0)
         {
            uroSetStyleDisplay('_uroCWLGroup-'+groupidx,'none');
         }
         else
         {
            uroSetOnClick('_uroCWLGroupState-'+groupidx,uroCWLGroupCollapseExpand);
         }
      }
   }
}

// --------------------------------------------------------------------------------------------------------------------
// END OF WATCHLIST STUFF
// --------------------------------------------------------------------------------------------------------------------


function uroIsOnIgnoreList(fid)
{
   if(sessionStorage.UROverview_FID_IgnoreList.indexOf('fid:'+fid) == -1) return false;
   else return true;
}
function uroEnableIgnoreListControls()
{
   var btnState = "visible";
   if(sessionStorage.UROverview_FID_IgnoreList === '')
   {
      btnState = "hidden";
   }
   try
   {
      document.getElementById('_btnUndoLastHide').style.visibility = btnState;
      document.getElementById('_btnClearSessionHides').style.visibility = btnState;
      uroFilterItems();
   }
   catch(err)
   {
      uroAddLog('exception thrown in uroEnableIgnoreListControls()');
   }
}
function uroAddToIgnoreList()
{
   if(!uroIsOnIgnoreList(uroShownFID))
   {
      sessionStorage.UROverview_FID_IgnoreList += 'fid:'+uroShownFID;
      uroAddLog('added fid '+uroShownFID+' to ignore list');
      uroAddLog(sessionStorage.UROverview_FID_IgnoreList);
      uroDiv.style.visibility = 'hidden';
      uroEnableIgnoreListControls();

      W.map.events.register("mousemove", null, uroFilterItemsOnMove);
   }
   return false;
}
function uroRemoveLastAddedIgnore()
{
   var ignorelist = sessionStorage.UROverview_FID_IgnoreList;
   var fidpos = ignorelist.lastIndexOf('fid:');
   if(fidpos != -1)
   {
      ignorelist = ignorelist.slice(0,fidpos);
      sessionStorage.UROverview_FID_IgnoreList = ignorelist;
      uroAddLog('removed last fid from ignore list');
      uroAddLog(sessionStorage.UROverview_FID_IgnoreList);
      uroEnableIgnoreListControls();
   }
}
function uroRemoveAllIgnores()
{
   sessionStorage.UROverview_FID_IgnoreList = '';
   uroEnableIgnoreListControls();
}
function uroKeywordPresent(desc, keyword, caseInsensitive)
{
   var re;
   if(caseInsensitive) re = RegExp(keyword,'i');
   else re = RegExp(keyword);

   if(desc.search(re) != -1) return true;
   else return false;
}
function uroClickify(desc, suffix)
{
   var terminators = [' ',',',')',']','\r','\n'];
   if(desc === null) return '';
   if(desc === undefined) return '';
   if(desc === '') return '';

   desc = desc.replace(/<\/?[^>]+(>|$)/g, "");
   if(desc !== "null")
   {
      if(desc.indexOf('http') != -1)
      {
         var links = desc.split("http");
         desc = '';
         var i, j, linkEndPos, descPostLink;
         for(i=0; i<links.length; i++)
         {
            if(links[i][2] == '/')
            {
               links[i] = "http" + links[i];
               linkEndPos = links[i].length + 1;
               for(j=0; j<terminators.length; j++)
               {
                  if(links[i].indexOf(terminators[j]) !== -1)
                  {
                     linkEndPos = Math.min(linkEndPos, links[i].indexOf(terminators[j]));
                  }
               }

               descPostLink = '';
               if(linkEndPos < links[i].length)
               {
                  descPostLink = links[i].slice(linkEndPos);
                  links[i] = links[i].slice(0,linkEndPos);
               }
               desc += '<a target="_wazeUR" href="'+links[i]+'">'+links[i]+'</a>' + descPostLink;
            }
            else
            {
               desc += links[i];
            }
         }
      }
      desc = desc.replace(/\n/g,"<br>");
      return desc + suffix;
   }
   else
   {
      return '';
   }
}
var uroPendingURSessionsTotal;
function uroFinalizeURSessionsGet()
{
   if(uroPendingURSessionsTotal != uroPendingURSessionIDs.length)
   {
      uroPendingURSessionsTotal = uroPendingURSessionIDs.length;
      setTimeout(uroFinalizeURSessionsGet, 500);
      return;
   }

   var idList = [];

   while((idList.length < 50) && (uroPendingURSessionIDs.length))
   {
      var id = uroPendingURSessionIDs.shift();
      idList.push(id);
   }

   if(idList.length > 0)
   {
      uroAddLog('grabbing '+idList.length+' updateRequestSessions, IDs: '+idList);
      if(W.model.updateRequestSessions.getAsync === undefined)
      {
         W.model.updateRequestSessions.get(idList);
      }
      else
      {
         W.model.updateRequestSessions.getAsync(idList);
      }
   }

   if((uroPendingURSessionIDs.length) || (uroRequestedURSessionIDs.length))
   {
      setTimeout(uroGetUpdateRequestSessions,1000);
   }
}
function uroGetUpdateRequestSessions()
{
   uroPendingURSessionsTotal = uroPendingURSessionIDs.length;
   setTimeout(uroFinalizeURSessionsGet,500);
}
function uroRefreshUpdateRequestSessions()
{
   var urcount = 0;
   uroPendingURSessionIDs = [];
   uroRequestedURSessionIDs = [];

   for (var urID in W.model.mapUpdateRequests.objects)
   {
      if(W.model.mapUpdateRequests.objects.hasOwnProperty(urID))
      {
         if(W.model.updateRequestSessions.objects[urID] === undefined)
         {
            uroPendingURSessionIDs.push(urID);
         }
         urcount++;
      }
   }
   uroGetUpdateRequestSessions();
}
function uroURHasMyComments(fid)
{
   if(uroUserID === -1)
   {
      return false;
   }
   var nComments = W.model.updateRequestSessions.objects[fid].comments.length;
   if(nComments === 0)
   {
      return false;
   }

   for(var cidx=0; cidx<nComments; cidx++)
   {
      if(W.model.updateRequestSessions.objects[fid].comments[cidx].userID == uroUserID)
      {
         return true;
      }
   }

   return false;
}
function uroACMObj(urID, markerType, customType, hasMyComments, nComments)
{
   this.urID = urID;
   this.markerType = markerType;
   this.customType = customType;
   this.hasMyComments = hasMyComments;
   this.nComments = nComments;
}
function uroAddCustomMarkers(urID, markerType, customType, hasMyComments, nComments)
{
   var useCustomMarker = false;
   if(uroGetCBChecked('_cbMasterEnable') === true)
   {
      if(customType === 0) useCustomMarker = (uroGetCBChecked('_cbCustomRoadworksMarkers'));
      else if(customType === 1) useCustomMarker = (uroGetCBChecked('_cbCustomConstructionMarkers'));
      else if(customType === 2) useCustomMarker = (uroGetCBChecked('_cbCustomClosuresMarkers'));
      else if(customType === 3) useCustomMarker = (uroGetCBChecked('_cbCustomEventsMarkers'));
      else if(customType === 4) useCustomMarker = (uroGetCBChecked('_cbCustomNotesMarkers'));
      else if(customType === 5) useCustomMarker = (uroGetCBChecked('_cbCustomWSLMMarkers'));
      else if(customType === 6) useCustomMarker = (uroGetCBChecked('_cbCustomBOGMarkers'));
      else if(customType === 7) useCustomMarker = (uroGetCBChecked('_cbCustomDifficultMarkers'));
      else if(customType === 98) useCustomMarker = (uroGetCBChecked('_cbCustomNativeSLMarkers'));
      else if(customType === 99) useCustomMarker = (uroGetCBChecked('_cbCustomKeywordMarkers'));
      else if(customType === 100) useCustomMarker = (uroGetCBChecked('_cbCustomElginMarkers'));
      else if(customType === 101) useCustomMarker = (uroGetCBChecked('_cbCustomTrafficCastMarkers'));
      else if(customType === 102) useCustomMarker = (uroGetCBChecked('_cbCustomTrafficMasterMarkers'));
      else if(customType === 103) useCustomMarker = (uroGetCBChecked('_cbCustomCaltransMarkers'));
      else if(customType === 104) useCustomMarker = (uroGetCBChecked('_cbCustomTFLMarkers'));
   }
   if(!useCustomMarker) customType = -1;
   uroCustomMarkerList.push(new uroACMObj(urID, markerType, customType, hasMyComments, nComments));
}
function uroChangeCustomMarkers(urID,isHighlighted,markerType)
{
   if(document.getElementById('customMarker_'+urID) !== null)
   {
      var customType = null;
      var customVariant = 0;
      if(markerType == "ur")
      {
         customType = W.map.updateRequestLayer.markers[urID].uroCustomType;
         if(W.model.mapUpdateRequests.objects[urID].attributes.open === false) customVariant = 2;
      }
      else if(markerType == "mp")
      {
         customType = W.map.problemLayer.markers[urID].uroCustomType;
         if(W.model.problems.objects[urID].attributes.open === false) customVariant = 2;
      }
      if(isHighlighted === true)
      {
         customVariant += 1;
      }
      if((customType !== null) && (customType !== undefined))
      {
         document.getElementById('customMarker_'+urID).innerHTML = '<img src="'+uroAltMarkers[customType][customVariant]+'">';
      }
   }
}
function uroRenderCustomMarkers(markerType)
{
   var urID;
   var elmID;
   var newSpan;
   var divElem;
   var objIdx;
   var customType;
   var customVariant;
   var cmlObj;
   var customMarker;
   var touchedByURO = false;

   if(markerType == 'ur')
   {
      var useDefaultConvoMarker = false;
      var addCommentCount = false;

      if(uroGetCBChecked('_cbMasterEnable') === true)
      {
         if((uroGetCBChecked('_cbNativeConvoMarkers')) && (uroBetaEditor === false)) useDefaultConvoMarker = true;
         if((uroGetCBChecked('_cbNativeBetaConvoMarkers')) && (uroBetaEditor === true)) useDefaultConvoMarker = true;
         if(uroGetCBChecked('_cbCommentCount')) addCommentCount = true;
      }
      else
      {
         useDefaultConvoMarker = true;
      }

      var uRCM_masterEnable = uroGetCBChecked('_cbMasterEnable');

      divElem = document.getElementById(W.map.updateRequestLayer.id);

      if(divElem.childNodes.length > 0)
      {
         for(objIdx = 0; objIdx < uroCustomMarkerList.length; objIdx++)
         {
            customType = -1;
            cmlObj = uroCustomMarkerList[objIdx];
            if(cmlObj.markerType == 'ur')
            {
               if(uRCM_masterEnable === true)
               {
                  customType = cmlObj.customType;
               }
               if(customType < 100)
               {
                  urID = cmlObj.urID;
                  var nComments = cmlObj.nComments;
                  var iconObj = W.map.updateRequestLayer.markers[urID].icon;
                  var classList = iconObj.imageDiv.classList;
                  newSpan = '';

                  if(nComments !== 0)
                  {
                     elmID = "commentCount_"+urID;

                     if((addCommentCount) && (nComments > 0))
                     {
                        // add a new comment count bubble if the UR doesn't already have one
                        if(document.getElementById(elmID) === null)
                        {
                           newSpan += '<span id="'+elmID+'" style="position:absolute;top:-9px;left:-11px;pointer-events:none;z-index:1">';
                           // define the comment-count holding span within the span used to hold the empty bubble image, and before the image is
                           // added to the HTML, to avoid z-indexing issues when adjacent comment count bubbles are overlapped...
                           newSpan += '<span id="'+elmID+"_inner"+'" style="position:absolute;top:4px;left:11px;font-size:11px;;pointer-events:none"></span>';
                           newSpan += '<img src="'+uroMarkers[0]+'">';
                           newSpan += '</span>';
                        }
                     }
                     else
                     {
                        // remove comment count bubble from this UR marker if one has previously been
                        // added and the user has now disabled the option...
                        if(document.getElementById(elmID) !== null)
                        {
                           document.getElementById(elmID).remove();
                        }
                        if(document.getElementById(elmID+"_inner") !== null)
                        {
                           document.getElementById(elmID+"_inner").remove();
                        }
                     }

                     if(nComments == -1)
                     {
                        // if we've set nComments to -1 to force a marker refresh when filtering is disabled,
                        // we now need to locally reset it to 0 to prevent the remainder of this code assuming
                        // the UR has a non-zero comment count...
                        nComments = 0;
                     }
                  }

                  if(nComments !== 0)
                  {
                     elmID = "convoMarker_"+urID;
                     if(useDefaultConvoMarker === false)
                     {
                        if(document.getElementById(elmID) === null)
                        {
                           var hasMyComments = cmlObj.hasMyComments;
                           // z-index needs to be set to 1 here so that when a new comment is added to a UR and WME re-renders the native
                           // conversation marker, the custom marker remains on top...
                           newSpan += '<span id="'+elmID+'" style="position:absolute;top:-9px;left:18px;pointer-events:none;z-index:1">';
                           if(hasMyComments) newSpan += '<img src="'+uroMarkers[2]+'">';
                           else newSpan += '<img src="'+uroMarkers[1]+'">';
                           newSpan += '</span>';
                           classList.remove("has-comments");
                        }
                     }
                     else
                     {
                        // remove custom conversation marker from this UR if one has previously been
                        // added and the user has now disabled this option
                        if(document.getElementById(elmID) !== null)
                        {
                           document.getElementById(elmID).remove();
                        }
                        if(nComments > 0)
                        {
                           // only replace the native marker class if the UR has comments - if we're just clearing the custom
                           // marker following a master enable switchoff, we don't then want to add native markers to URs which
                           // didn't have them in the first place...
                           classList.add("has-comments");
                        }
                     }
                  }

                  // change main marker if required
                  touchedByURO = W.map.updateRequestLayer.markers[urID].touchedByURO;
                  elmID = "customMarker_"+urID;
                  customMarker = '';
                  if(customType != -1)
                  {
                     if(document.getElementById(elmID) === null)
                     {
                        newSpan += '<span id="'+elmID+'" style="position:absolute;pointer-events:none;top:-3px;left:-2px;"></span>';
                     }
                     customType = uroGetCustomMarkerIdx(customType);
                     W.map.updateRequestLayer.markers[urID].uroCustomType = customType;
                     customVariant = 0;
                     if(W.model.mapUpdateRequests.objects[urID] !== undefined)
                     {
                        if(W.model.mapUpdateRequests.objects[urID].attributes.open === false) customVariant = 2;
                     }
                     customMarker = '<img src="'+uroAltMarkers[customType][customVariant]+'">';
                  }
                  else
                  {
                     if(document.getElementById(elmID) !== null)
                     {
                        document.getElementById(elmID).remove();
                     }
                  }

                  if(newSpan !== '')
                  {
                     iconObj.$div.prepend(newSpan);
                  }

                  if((customMarker !== '') && (document.getElementById(elmID) !== null))
                  {
                     document.getElementById(elmID).innerHTML = customMarker;
                  }

                  if(addCommentCount)
                  {
                     elmID = "commentCount_"+urID+"_inner";
                     if(document.getElementById(elmID) !== null)
                     {
                        var styleLeft;
                        if(nComments < 10) styleLeft = '11px';
                        else if(nComments < 100) styleLeft = '8px';
                        else styleLeft = '5px';
                        document.getElementById(elmID).innerHTML = nComments;
                        document.getElementById(elmID).style.left = styleLeft;
                     }
                  }
               }
            }
         }
      }
   }

   else if(markerType == 'mp')
   {
      divElem = document.getElementById(W.map.problemLayer.id);
      if(divElem.childNodes.length > 0)
      {
         for(objIdx = 0; objIdx < uroCustomMarkerList.length; objIdx++)
         {
            cmlObj = uroCustomMarkerList[objIdx];
            if(cmlObj.markerType == 'mp')
            {
               customType = cmlObj.customType;
               if((customType >= 100) || (customType == -1))
               {
                  urID = cmlObj.urID;

                  // change main marker if required
                  touchedByURO = W.map.problemLayer.markers[urID].touchedByURO;
                  elmID = "customMarker_"+urID;
                  customMarker = '';
                  if(customType != -1)
                  {
                     if(document.getElementById(elmID) === null)
                     {
                        newSpan = '<span id="'+elmID+'" style="position:absolute;pointer-events:none;top:-3px;left:-2px;"></span>';
                        if(W.map.problemLayer.markers[urID] !== undefined)
                        {
                           W.map.problemLayer.markers[urID].icon.$div.prepend(newSpan);
                        }
                     }
                     if(document.getElementById(elmID) !== null)
                     {
                        customType = uroGetCustomMarkerIdx(customType);
                        W.map.problemLayer.markers[urID].uroCustomType = customType;
                        customVariant = 0;
                        if(W.model.problems.objects[urID] !== undefined)
                        {
                           if(W.model.problems.objects[urID].attributes.open === false) customVariant = 2;
                        }
                        customMarker = '<img src="'+uroAltMarkers[customType][customVariant]+'">';
                        document.getElementById(elmID).innerHTML = customMarker;
                     }
                  }
                  else
                  {
                     if(document.getElementById(elmID) !== null)
                     {
                        document.getElementById(elmID).remove();
                     }
                  }
               }
            }
         }
      }
   }
}

function uroIsFilteringEnabled()
{
   var retval = false;
   if((uroGetCBChecked('_cbMasterEnable') === true) && (W.map.getZoom() <= uroGetElmValue('_inputFilterMinZoomLevel')))
   {
      retval = true;
   }
   return retval;
}

function uroFilterRTCs()
{
   var pmTStart = performance.now();
   var pmFunction = "uroFilterRTCs";

   if(uroFilterPreamble() === false) return;

   var uFR_filterFromApp = uroGetCBChecked('_cbHideUserRTCs');
   var uFR_filterActiveFromWME = uroGetCBChecked('_cbHideEditorRTCs');
   var uFR_filterActiveFromWaze = uroGetCBChecked('_cbHideWazeRTCs');
   var uFR_filterFutureFromWME = uroGetCBChecked('_cbHideFutureEditorRTCs');
   var uFR_filterFutureFromWaze = uroGetCBChecked('_cbHideFutureWazeRTCs');
   var uFR_masterEnable = uroIsFilteringEnabled();

   for (var rtcObj in W.map.closuresMarkerLayer.markers)
   {
      if(W.map.closuresMarkerLayer.markers.hasOwnProperty(rtcObj))
      {
         var rtc = W.map.closuresMarkerLayer.markers[rtcObj];
         var rtcStyle = 'visible';
         if(uFR_masterEnable === true)
         {
            var fromWaze = false;
            if(W.model.users.objects[rtc.model.createdBy] !== undefined)
            {
               fromWaze = (W.model.users.objects[rtc.model.createdBy].rank == 6);
            }
            var fromApp = (rtc.model.startDate.indexOf('1970-01-01') != -1);

            if(fromApp === true)
            {
               if(uFR_filterFromApp === true)
               {
                  rtcStyle = 'hidden';
               }
            }
            else if(fromWaze === true)
            {
               if(rtc.model.active === true)
               {
                  if(uFR_filterActiveFromWaze === true)
                  {
                     rtcStyle = 'hidden';
                  }
               }
               else
               {
                  if(uFR_filterFutureFromWaze === true)
                  {
                     rtcStyle = 'hidden';
                  }
               }
            }
            else
            {
               if(rtc.model.active === true)
               {
                  if(uFR_filterActiveFromWME === true)
                  {
                     rtcStyle = 'hidden';
                  }
               }
               else
               {
                  if(uFR_filterFutureFromWME === true)
                  {
                     rtcStyle = 'hidden';
                  }
               }
            }
         }
         rtc.icon.imageDiv.style.visibility = rtcStyle;
      }
   }
   uroPerformanceMonitoring(pmFunction, pmTStart);
}


var uro_uFP_filterUneditable;
var uro_uFP_filterLockRanked;
var uro_uFP_filterFlagged;
var uro_uFP_filterNewPlace;
var uro_uFP_filterUpdatedDetails;
var uro_uFP_filterNewPhoto;
var uro_uFP_filterMinPURAge;
var uro_uFP_filterMaxPURAge;
var uro_uFP_invertPURFilters;
var uro_uFP_filterHighSeverity;
var uro_uFP_filterMedSeverity;
var uro_uFP_filterLowSeverity;
var uro_uFP_leavePURGeos;
var uro_uFP_filterCFPhone;
var uro_uFP_filterCFName;
var uro_uFP_filterCFEntryExitPoints;
var uro_uFP_filterCFOpeningHours;
var uro_uFP_filterCFAliases;
var uro_uFP_filterCFServices;
var uro_uFP_filterCFGeometry;
var uro_uFP_filterCFHouseNumber;
var uro_uFP_filterCFCategories;
var uro_uFP_filterCFDescription;
var uro_uFP_filterOnCFs;
var uro_uFP_thresholdMinPURDays;
var uro_uFP_thresholdMaxPURDays;
var uro_uFP_isLoggedIn;
var uro_uFP_userRank;
function uroFilterPlaceMarker(puObj, uFP_masterEnable)
{
   var purAge = null;
   var placeStyle = 'visible';

   if(uFP_masterEnable === true)
   {
      if(uro_uFP_filterUneditable === true)
      {
         if(puObj.model.attributes.permissions === 0)
         {
            placeStyle = 'hidden';
         }
         if((placeStyle == 'visible') && (uro_uFP_isLoggedIn))
         {
            if(uro_uFP_userRank < puObj.model.attributes.lockRank)
            {
               placeStyle = 'hidden';
            }
         }
         if((placeStyle == 'visible') && (puObj.model.attributes.adLocked))
         {
            placeStyle = 'hidden';
         }
      }

      if((placeStyle == 'visible') && (uro_uFP_filterLockRanked === true))
      {
         if(puObj.model.attributes.lockRank !== 0)
         {
            placeStyle = 'hidden';
         }
      }

      if((placeStyle == 'visible') && (uro_uFP_filterFlagged === true))
      {
         if(puObj.icon.imageDiv.className.indexOf('flag') != -1)
         {
            placeStyle = 'hidden';
         }
      }

      if((placeStyle == 'visible') && (uro_uFP_filterNewPlace === true))
      {
         if(puObj.icon.imageDiv.className.indexOf('add_venue') != -1)
         {
            placeStyle = 'hidden';
         }
      }
      if((placeStyle == 'visible') && (uro_uFP_filterUpdatedDetails === true))
      {
         if((puObj.icon.imageDiv.className.indexOf('update_venue') != -1) || (puObj.icon.imageDiv.className.indexOf('multiple') != -1))
         {
            placeStyle = 'hidden';
         }
      }
      if((placeStyle == 'visible') && (uro_uFP_filterOnCFs === true))
      {
         var nVUR = puObj.model.attributes.venueUpdateRequests.length;
         while(nVUR > 0)
         {
            nVUR--;
            var tCF = puObj.model.attributes.venueUpdateRequests[nVUR].attributes.changedFields;
            if(tCF !== undefined)
            {
               if(tCF.length > 0)
               {
                  var tFN = tCF[0].attributes.fieldName;
                  if((tFN == "phone") && (uro_uFP_filterCFPhone === true))
                  {
                     placeStyle = 'hidden';
                  }
                  if((tFN == "name") && (uro_uFP_filterCFName === true))
                  {
                     placeStyle = 'hidden';
                  }
                  if((tFN == "entryExitPoints") && (uro_uFP_filterCFEntryExitPoints === true))
                  {
                     placeStyle = 'hidden';
                  }
                  if((tFN == "openingHours") && (uro_uFP_filterCFOpeningHours === true))
                  {
                     placeStyle = 'hidden';
                  }
                  if((tFN == "aliases") && (uro_uFP_filterCFAliases === true))
                  {
                     placeStyle = 'hidden';
                  }
                  if((tFN == "services") && (uro_uFP_filterCFServices === true))
                  {
                     placeStyle = 'hidden';
                  }
                  if((tFN == "geometry") && (uro_uFP_filterCFGeometry === true))
                  {
                     placeStyle = 'hidden';
                  }
                  if((tFN == "houseNumber") && (uro_uFP_filterCFHouseNumber === true))
                  {
                     placeStyle = 'hidden';
                  }
                  if((tFN == "categories") && (uro_uFP_filterCFCategories === true))
                  {
                     placeStyle = 'hidden';
                  }
                  if((tFN == "description") && (uro_uFP_filterCFDescription === true))
                  {
                     placeStyle = 'hidden';
                  }
               }
            }
         }
      }
      if((placeStyle == 'visible') && (uro_uFP_filterNewPhoto === true))
      {
         if(puObj.icon.imageDiv.className.indexOf('add_image') != -1)
         {
            placeStyle = 'hidden';
         }
      }

      if(uro_uFP_invertPURFilters === true)
      {
         if(placeStyle == 'hidden') placeStyle = 'visible';
         else placeStyle = 'hidden';
      }

      if(uro_uFP_filterMinPURAge || uro_uFP_filterMaxPURAge)
      {
         purAge = uroGetPURAge(puObj.model);
         if(uro_uFP_filterMinPURAge === true)
         {
            if(purAge < uro_uFP_thresholdMinPURDays) placeStyle = 'hidden';
         }
         if(uro_uFP_filterMaxPURAge === true)
         {
            if(purAge > uro_uFP_thresholdMaxPURDays) placeStyle = 'hidden';
         }
      }

      if(placeStyle == 'visible')
      {
         var purSeverity = puObj._getSeverity();
         if((uro_uFP_filterHighSeverity) && (purSeverity == "high")) placeStyle = 'hidden';
         if((placeStyle == 'visible') && (uro_uFP_filterMedSeverity) && (purSeverity == "medium")) placeStyle = 'hidden';
         if((placeStyle == 'visible') && (uro_uFP_filterLowSeverity) && (purSeverity == "low")) placeStyle = 'hidden';
      }
   }

   puObj.icon.imageDiv.style.visibility = placeStyle;

   if(uro_uFP_leavePURGeos === false)
   {
      if(puObj.model != null)
      {
         if(puObj.model.geometry != null)
         {
            var puGeo = document.getElementById(puObj.model.geometry.id);
            if(puGeo !== null)
            {
               puGeo.style.visibility = placeStyle;
            }
         }
      }
   }
}

function uroFilterPlaces()
{
   var pmTStart = performance.now();
   var pmFunction = "uroFilterPlaces";

   if(uroFilterPreamble() === false) return;

   if(uroPlaceSelected === true) return;

   if(uroGetCBChecked('_cbDisablePlacesFiltering') === true) return;

   uroUpdateVenueEditorLists();

   var filterNameID = null;
   var tbUserName = uroGetElmValue('_textPlacesEditor');
   var selector = document.getElementById('_selectPlacesUserID');
   if(selector.selectedIndex > 0)
   {
      var selUserName = document.getElementById('_selectPlacesUserID').selectedOptions[0].innerHTML;
      if(selUserName == tbUserName)
      {
         filterNameID = document.getElementById('_selectPlacesUserID').selectedOptions[0].value;
      }
   }
   if(filterNameID === null)
   {
      var userObj = W.model.users.getByAttributes({userName:tbUserName})[0];
      if(userObj !== undefined)
      {
         filterNameID = userObj.id;
      }
   }

   var filterHideNameID = null;
   var tbHideUserName = uroGetElmValue('_textHidePlacesEditor');
   var selectorHide = document.getElementById('_selectHidePlacesUserID');
   if(selectorHide.selectedIndex > 0)
   {
      var selHideUserName = document.getElementById('_selectHidePlacesUserID').selectedOptions[0].innerHTML;
      if(selHideUserName == tbHideUserName)
      {
         filterHideNameID = document.getElementById('_selectHidePlacesUserID').selectedOptions[0].value;
      }
   }
   if(filterHideNameID === null)
   {
      var userHideObj = W.model.users.getByAttributes({userName:tbHideUserName})[0];
      if(userHideObj !== undefined)
      {
         filterHideNameID = userHideObj.id;
      }
   }

   var filterCats = [];
   for(var i=0; i<W.Config.venues.categories.length; i++)
   {
      var parentCategory = W.Config.venues.categories[i];
      var subCategory;

      if(uroGetCBChecked('_cbPlacesFilter-'+parentCategory) === true)
      {
         filterCats.push(parentCategory);
         for(var i1=0; i1<W.Config.venues.subcategories[parentCategory].length; i1++)
         {
            subCategory = W.Config.venues.subcategories[parentCategory][i1];
            filterCats.push(subCategory);
         }
      }
      else
      {
         for(var i2=0; i2<W.Config.venues.subcategories[parentCategory].length; i2++)
         {
            subCategory = W.Config.venues.subcategories[parentCategory][i2];
            if(uroGetCBChecked('_cbPlacesFilter-'+subCategory) === true)
            {
               filterCats.push(subCategory);
            }
         }
      }
   }

   var placeStyle;

   var uFP_filterEditedLessThan = uroGetCBChecked('_cbPlaceFilterEditedLessThan');
   var uFP_filterEditedMoreThan = uroGetCBChecked('_cbPlaceFilterEditedMoreThan');
   var uFP_filterL0 = uroGetCBChecked('_cbHidePlacesL0');
   var uFP_filterL1 = uroGetCBChecked('_cbHidePlacesL1');
   var uFP_filterL2 = uroGetCBChecked('_cbHidePlacesL2');
   var uFP_filterL3 = uroGetCBChecked('_cbHidePlacesL3');
   var uFP_filterL4 = uroGetCBChecked('_cbHidePlacesL4');
   var uFP_filterL5 = uroGetCBChecked('_cbHidePlacesL5');
   var uFP_filterStaff = uroGetCBChecked('_cbHidePlacesStaff');
   var uFP_filterAL = uroGetCBChecked('_cbHidePlacesAdLocked');
   var uFP_filterOnLockLevel = (uFP_filterL0 || uFP_filterL1 || uFP_filterL2 || uFP_filterL3 || uFP_filterL4 || uFP_filterL5 || uFP_filterStaff);
   var uFP_filterNoPhotos = uroGetCBChecked('_cbHideNoPhotoPlaces');
   var uFP_filterWithPhotos = uroGetCBChecked('_cbHidePhotoPlaces');
   var uFP_filterNoLinks = uroGetCBChecked('_cbHideNoLinkedPlaces');
   var uFP_filterWithLinks = uroGetCBChecked('_cbHideLinkedPlaces');
   var uFP_filterNoDescription = uroGetCBChecked('_cbHideNonDescribedPlaces');
   var uFP_filterWithDescription = uroGetCBChecked('_cbHideDescribedPlaces');
   var uFP_filterNoKeyword = uroGetCBChecked('_cbHideKeywordPlaces');
   var uFP_filterKeyword = uroGetCBChecked('_cbHideNoKeywordPlaces');
   var uFP_filterPrivate = uroGetCBChecked('_cbFilterPrivatePlaces');
   var uFP_invertFilters = uroGetCBChecked('_cbInvertPlacesFilter');
   var uFP_masterEnable = uroIsFilteringEnabled();
   var uFP_filterAreaPlaces = uroGetCBChecked('_cbHideAreaPlaces');
   var uFP_filterPointPlaces = uroGetCBChecked('_cbHidePointPlaces');
   var uFP_filterCreatedBy = uroGetCBChecked('_cbShowOnlyPlacesCreatedBy');
   var uFP_filterEditedBy = uroGetCBChecked('_cbShowOnlyPlacesEditedBy');
   var uFP_filterHideCreatedBy = uroGetCBChecked('_cbHideOnlyPlacesCreatedBy');
   var uFP_filterHideEditedBy = uroGetCBChecked('_cbHideOnlyPlacesEditedBy');

   var uFP_NameKeyword = document.getElementById('_textKeywordPlace').value.toLowerCase();
   var uFP_thresholdMinDays = document.getElementById('_inputFilterPlaceEditMinDays').value;
   var uFP_thresholdMaxDays = document.getElementById('_inputFilterPlaceEditMaxDays').value;

   for(var v=0; v<W.map.landmarkLayer.features.length; v++)
   {
      placeStyle = 'visible';
      if(uFP_masterEnable === true)
      {
         var lmObj = W.map.landmarkLayer.features[v];

         // when an area place is selected, the drag points for editing the place outline now get added as objects into W.map.landmarkLayer.features,
         // however none of these objects have the .model property - we must therefore check each entry in features[] to see if it has .model before
         // attempting to filter it...
         if(lmObj.model != null)
         {
            if(lmObj.model.attributes.id < 0)
            {
               // don't apply filtering to newly-created places - this allows the user to leave their filtering settings unchanged whilst
               // adding a new place which, once saved, would then be hidden...
               break;
            }

            if(uFP_filterAreaPlaces)
            {
               if(lmObj.model.attributes.geometry.id.indexOf('Polygon') !== -1)
               {
                  placeStyle = 'hidden';
               }
            }
            if(uFP_filterPointPlaces)
            {
               if(lmObj.model.attributes.geometry.id.indexOf('Point') !== -1)
               {
                  placeStyle = 'hidden';
               }
            }


            if(placeStyle == 'visible')
            {
               if((uFP_filterEditedLessThan) || (uFP_filterEditedMoreThan))
               {
                  var editDate = lmObj.model.attributes.updatedOn;
                  if(editDate === undefined)
                  {
                     // where a place has never been edited since its creation, use the creation date instead...
                     editDate = lmObj.model.attributes.createdOn;
                  }
                  if(editDate != null)
                  {
                     var editDaysAgo = uroDateToDays(editDate);
                     if(uFP_filterEditedLessThan)
                     {
                        if(editDaysAgo < uFP_thresholdMinDays)
                        {
                           placeStyle = 'hidden';
                        }
                     }
                     if(uFP_filterEditedMoreThan)
                     {
                        if(editDaysAgo > uFP_thresholdMaxDays)
                        {
                           placeStyle = 'hidden';
                        }
                     }
                  }
               }
            }

            if(placeStyle == 'visible')
            {
               if(uFP_filterOnLockLevel)
               {
                  var lockLevel = lmObj.model.attributes.lockRank;
                  if ((uFP_filterL0) && (lockLevel === 0)) placeStyle = 'hidden';
                  if ((uFP_filterL1) && (lockLevel === 1)) placeStyle = 'hidden';
                  if ((uFP_filterL2) && (lockLevel === 2)) placeStyle = 'hidden';
                  if ((uFP_filterL3) && (lockLevel === 3)) placeStyle = 'hidden';
                  if ((uFP_filterL4) && (lockLevel === 4)) placeStyle = 'hidden';
                  if ((uFP_filterL5) && (lockLevel === 5)) placeStyle = 'hidden';
                  if ((uFP_filterStaff) && (lockLevel === 6)) placeStyle = 'hidden';
               }
            }

            if(placeStyle == 'visible')
            {
               if(uFP_filterAL)
               {
                  if(lmObj.model.attributes.adLocked) placeStyle = 'hidden';
               }
            }

            if(placeStyle == 'visible')
            {
               if(uFP_filterNoPhotos || uFP_filterWithPhotos)
               {
                  var nPhotos = 0;
                  for(var loop=0; loop<lmObj.model.attributes.images.length; loop++)
                  {
                     if(lmObj.model.attributes.images[loop].attributes.approved) nPhotos++;
                  }
                  if((uFP_filterNoPhotos) && (nPhotos === 0)) placeStyle = 'hidden';
                  if((uFP_filterWithPhotos) && (nPhotos !== 0)) placeStyle = 'hidden';
               }
            }

            if(placeStyle == 'visible')
            {
               if(uFP_filterNoLinks || uFP_filterWithLinks)
               {
                  var nLinks = lmObj.model.attributes.externalProviderIDs.length;
                  if((uFP_filterNoLinks) && (nLinks === 0)) placeStyle = 'hidden';
                  if((uFP_filterWithLinks) && (nLinks !== 0)) placeStyle = 'hidden';
               }
            }

            if(placeStyle == 'visible')
            {
              if(uFP_filterNoDescription || uFP_filterWithDescription)
              {
                var lDesc = lmObj.model.attributes.description.length;
                if((uFP_filterNoDescription) && (lDesc === 0)) placeStyle = 'hidden';
                if((uFP_filterWithDescription) && (lDesc !== 0)) placeStyle = 'hidden';
              }
            }

            if(placeStyle == 'visible')
            {
               if((uFP_filterPrivate === true) && (lmObj.model.attributes.residential === true))
               {
                  placeStyle = 'hidden';
               }
               else
               {
                  for(var cat=0; cat<filterCats.length; cat++)
                  {
                     if(_.contains(lmObj.model.attributes.categories, filterCats[cat]))
                     {
                        placeStyle = 'hidden';
                        break;
                     }
                  }
               }
            }

            if(placeStyle == 'visible')
            {
               if(uFP_filterNoKeyword || uFP_filterKeyword)
               {
                  var venueName = lmObj.model.attributes.name.toLowerCase();
                  var noKeywordMatch = true;
                  if(uFP_NameKeyword === '')
                  {
                     noKeywordMatch = (venueName !== '');
                  }
                  else
                  {
                     noKeywordMatch = (venueName.indexOf(uFP_NameKeyword) === -1);
                  }

                  if(!noKeywordMatch && uFP_filterNoKeyword) placeStyle = 'hidden';
                  if(noKeywordMatch && uFP_filterKeyword) placeStyle = 'hidden';
               }
            }

            if(placeStyle == 'visible')
            {
               if(filterNameID != null)
               {
                  if(uFP_filterCreatedBy === true)
                  {
                     if(filterNameID != lmObj.model.attributes.createdBy) placeStyle = 'hidden';
                  }
                  if(uFP_filterEditedBy === true)
                  {
                     if(filterNameID != lmObj.model.attributes.updatedBy) placeStyle = 'hidden';
                  }
               }
            }
            if(placeStyle == 'visible')
            {
               if(filterHideNameID != null)
               {
                  if(uFP_filterHideCreatedBy === true)
                  {
                     if(filterHideNameID == lmObj.model.attributes.createdBy) placeStyle = 'hidden';
                  }
                  if(uFP_filterHideEditedBy === true)
                  {
                     if(filterHideNameID == lmObj.model.attributes.updatedBy) placeStyle = 'hidden';
                  }
               }
            }

         }

         if(uFP_invertFilters === true)
         {
            if(placeStyle == 'hidden') placeStyle = 'visible';
            else placeStyle = 'hidden';
         }
      }

      var geoID = W.map.landmarkLayer.features[v].geometry.id;
      if(document.getElementById(geoID) !== null)
      {
         document.getElementById(geoID).style.visibility = placeStyle;
      }
   }

   uro_uFP_filterUneditable = uroGetCBChecked('_cbFilterUneditablePlaceUpdates');
   uro_uFP_filterLockRanked = uroGetCBChecked('_cbFilterLockRankedPlaceUpdates');
   uro_uFP_filterFlagged = uroGetCBChecked("_cbFilterFlaggedPUR");
   uro_uFP_filterNewPlace = uroGetCBChecked("_cbFilterNewPlacePUR");
   uro_uFP_filterUpdatedDetails = uroGetCBChecked("_cbFilterUpdatedDetailsPUR");
   uro_uFP_filterNewPhoto = uroGetCBChecked("_cbFilterNewPhotoPUR");
   uro_uFP_filterMinPURAge = uroGetCBChecked('_cbEnablePURMinAgeFilter');
   uro_uFP_filterMaxPURAge = uroGetCBChecked('_cbEnablePURMaxAgeFilter');
   uro_uFP_invertPURFilters = uroGetCBChecked('_cbInvertPURFilters');
   uro_uFP_filterHighSeverity = uroGetCBChecked('_cbPURFilterHighSeverity');
   uro_uFP_filterMedSeverity = uroGetCBChecked('_cbPURFilterMediumSeverity');
   uro_uFP_filterLowSeverity = uroGetCBChecked('_cbPURFilterLowSeverity');
   uro_uFP_leavePURGeos = uroGetCBChecked('_cbLeavePURGeos');

   uro_uFP_filterCFPhone = uroGetCBChecked('_cbPURFilterCFPhone');
   uro_uFP_filterCFName = uroGetCBChecked('_cbPURFilterCFName');
   uro_uFP_filterCFEntryExitPoints = uroGetCBChecked('_cbPURFilterCFEntryExitPoints');
   uro_uFP_filterCFOpeningHours = uroGetCBChecked('_cbPURFilterCFOpeningHours');
   uro_uFP_filterCFAliases = uroGetCBChecked('_cbPURFilterCFAliases');
   uro_uFP_filterCFServices = uroGetCBChecked('_cbPURFilterCFServices');
   uro_uFP_filterCFGeometry = uroGetCBChecked('_cbPURFilterCFGeometry');
   uro_uFP_filterCFHouseNumber = uroGetCBChecked('_cbPURFilterCFHouseNumber');
   uro_uFP_filterCFCategories = uroGetCBChecked('_cbPURFilterCFCategories');
   uro_uFP_filterCFDescription = uroGetCBChecked('_cbPURFilterCFDescription');

   uro_uFP_filterOnCFs = (uro_uFP_filterCFPhone || uro_uFP_filterCFName || uro_uFP_filterCFEntryExitPoints || uro_uFP_filterCFOpeningHours);
   uro_uFP_filterOnCFs = (uro_uFP_filterOnCFs || uro_uFP_filterCFAliases || uro_uFP_filterCFServices || uro_uFP_filterCFGeometry);
   uro_uFP_filterOnCFs = (uro_uFP_filterOnCFs || uro_uFP_filterCFHouseNumber || uro_uFP_filterCFCategories || uro_uFP_filterCFDescription);

   uro_uFP_thresholdMinPURDays = uroGetElmValue('_inputPURFilterMinDays');
   uro_uFP_thresholdMaxPURDays = uroGetElmValue('_inputPURFilterMaxDays');
   uro_uFP_isLoggedIn = W.loginManager.isLoggedIn();
   uro_uFP_userRank = W.loginManager.user.rank;

   var pu;
   var puObj;

   for(pu in W.map.placeUpdatesLayer.markers)
   {
      if(W.map.placeUpdatesLayer.markers.hasOwnProperty(pu))
      {
         puObj = W.map.placeUpdatesLayer.markers[pu];
         if(W.map.placeUpdatesLayer.getVisibility() === true)
         {
            uroFilterPlaceMarker(puObj, uFP_masterEnable);
         }
      }
   }

   for(pu in W.map.parkingPlaceUpdatesLayer.markers)
   {
      if(W.map.parkingPlaceUpdatesLayer.markers.hasOwnProperty(pu))
      {
         puObj = W.map.parkingPlaceUpdatesLayer.markers[pu];
         if(W.map.parkingPlaceUpdatesLayer.getVisibility() === true)
         {
            uroFilterPlaceMarker(puObj, uFP_masterEnable);
         }
      }
   }

   for(pu in W.map.residentialPlaceUpdatesLayer.markers)
   {
      if(W.map.residentialPlaceUpdatesLayer.markers.hasOwnProperty(pu))
      {
         puObj = W.map.residentialPlaceUpdatesLayer.markers[pu];
         if(W.map.residentialPlaceUpdatesLayer.getVisibility() === true)
         {
            uroFilterPlaceMarker(puObj, uFP_masterEnable);
         }
      }
   }

   uroPerformanceMonitoring(pmFunction, pmTStart);
}

function uroFilterCameras()
{
   var pmTStart = performance.now();
   var pmFunction = "uroFilterCameras";

   if(uroFilterPreamble() === false)
   {
      return;
   }
   var camLayer = document.getElementById(uroRootContainer+'_svgRoot');
   if(camLayer === null)
   {
      if(uroNullCamLayer === false)
      {
         uroAddLog('caught null camLayer');
         uroNullCamLayer = true;
      }
      return;
   }

   uroNullCamLayer = false;
   if(uroMouseIsDown === false) W.map.camerasLayer.redraw();
   if(uroIsFilteringEnabled() === true)
   {
      uroUpdateCamEditorList();
      var filterNameID = null;
      var tbUserName = uroGetElmValue('_textCameraEditor');
      var selector = document.getElementById('_selectCameraUserID');
      if(selector.selectedIndex > 0)
      {
         var selUserName = document.getElementById('_selectCameraUserID').selectedOptions[0].innerHTML;
         if(selUserName == tbUserName)
         {
            filterNameID = document.getElementById('_selectCameraUserID').selectedOptions[0].value;
         }
      }
      if(filterNameID === null)
      {
         var userObj = W.model.users.getByAttributes({userName:tbUserName})[0];
         if(userObj !== undefined)
         {
            filterNameID = userObj.id;
         }
      }

      var isChecked_cbShowOnlyCamsCreatedBy = uroGetCBChecked('_cbShowOnlyCamsCreatedBy');
      var isChecked_cbShowOnlyCamsEditedBy = uroGetCBChecked('_cbShowOnlyCamsEditedBy');
      var isChecked_cbShowOnlyMyCams = uroGetCBChecked('_cbShowOnlyMyCams');
      var isChecked_cbShowWorldCams = uroGetCBChecked('_cbShowWorldCams');
      var isChecked_cbShowUSACams = uroGetCBChecked('_cbShowUSACams');
      var isChecked_cbShowNonWorldCams = uroGetCBChecked('_cbShowNonWorldCams');
      var isChecked_cbShowSpeedCams = uroGetCBChecked('_cbShowSpeedCams');
      var isChecked_cbShowRedLightCams = uroGetCBChecked('_cbShowRedLightCams');
      var isChecked_cbShowDummyCams = uroGetCBChecked('_cbShowDummyCams');
      var isChecked_cbShowIfNoSpeedSet = uroGetCBChecked('_cbShowIfNoSpeedSet');
      var isChecked_cbShowIfSpeedSet = uroGetCBChecked('_cbShowIfSpeedSet');
      var isChecked_cbShowIfInvalidSpeedSet = uroGetCBChecked('_cbShowIfInvalidSpeedSet');
      var isChecked_cbShowRLCIfNoSpeedSet = uroGetCBChecked('_cbShowRLCIfNoSpeedSet');
      var isChecked_cbShowRLCIfNonZeroSpeedSet = uroGetCBChecked('_cbShowRLCIfNonZeroSpeedSet');
      var isChecked_cbShowRLCIfZeroSpeedSet = uroGetCBChecked('_cbShowRLCIfZeroSpeedSet');
      var isChecked_cbHideCreatedByMe = uroGetCBChecked('_cbHideCreatedByMe');
      var isChecked_cbHideCreatedByRank0 = uroGetCBChecked('_cbHideCreatedByRank0');
      var isChecked_cbHideCreatedByRank1 = uroGetCBChecked('_cbHideCreatedByRank1');
      var isChecked_cbHideCreatedByRank2 = uroGetCBChecked('_cbHideCreatedByRank2');
      var isChecked_cbHideCreatedByRank3 = uroGetCBChecked('_cbHideCreatedByRank3');
      var isChecked_cbHideCreatedByRank4 = uroGetCBChecked('_cbHideCreatedByRank4');
      var isChecked_cbHideCreatedByRank5 = uroGetCBChecked('_cbHideCreatedByRank5');
      var isChecked_cbHideUpdatedByMe = uroGetCBChecked('_cbHideUpdatedByMe');
      var isChecked_cbHideUpdatedByRank0 = uroGetCBChecked('_cbHideUpdatedByRank0');
      var isChecked_cbHideUpdatedByRank1 = uroGetCBChecked('_cbHideUpdatedByRank1');
      var isChecked_cbHideUpdatedByRank2 = uroGetCBChecked('_cbHideUpdatedByRank2');
      var isChecked_cbHideUpdatedByRank3 = uroGetCBChecked('_cbHideUpdatedByRank3');
      var isChecked_cbHideUpdatedByRank4 = uroGetCBChecked('_cbHideUpdatedByRank4');
      var isChecked_cbHideUpdatedByRank5 = uroGetCBChecked('_cbHideUpdatedByRank5');
      var isChecked_cbHideCWLCams = uroGetCBChecked('_cbHideCWLCams');
      var isChecked_cbHighlightInsteadOfHideCams = uroGetCBChecked('_cbHighlightInsteadOfHideCams');

      for (var uroCamObj in W.model.cameras.objects)
      {
         if(W.model.cameras.objects.hasOwnProperty(uroCamObj))
         {
            var uroCamUpdater = '';
            var uroCamUpdaterRank = -1;
            var uroCamCreator = '';
            var uroCamCreatorRank = -1;
            var uroCam = W.model.cameras.objects[uroCamObj];
            var uroCamStyle = 'visible';
            var uroCamSpeedString = null;

            if(uroCam.attributes.createdBy !== null)
            {
               if(W.model.users.objects[uroCam.attributes.createdBy] != null)
               {
                  uroCamCreator = W.model.users.objects[uroCam.attributes.createdBy].userName;
                  uroCamCreatorRank = W.model.users.objects[uroCam.attributes.createdBy].rank;
               }
            }

            if(uroCam.attributes.updatedBy !== null)
            {
               if(W.model.users.objects[uroCam.attributes.updatedBy] != null)
               {
                  uroCamUpdater = W.model.users.objects[uroCam.attributes.updatedBy].userName;
                  uroCamUpdaterRank = W.model.users.objects[uroCam.attributes.updatedBy].rank;
               }
            }

            var uroCamType = uroCam.attributes.type;

            if(filterNameID != null)
            {
               if(isChecked_cbShowOnlyCamsCreatedBy === true)
               {
                  if(filterNameID != uroCam.attributes.createdBy) uroCamStyle = 'hidden';
               }
               if(isChecked_cbShowOnlyCamsEditedBy === true)
               {
                  if(filterNameID != uroCam.attributes.updatedBy) uroCamStyle = 'hidden';
               }
            }

            if(isChecked_cbShowOnlyMyCams === true)
            {
               if((uroUserID != uroCam.attributes.createdBy)&&(uroUserID != uroCam.attributes.updatedBy)) uroCamStyle = 'hidden';
            }

            if((isChecked_cbShowWorldCams === false) || (isChecked_cbShowUSACams === false) || (isChecked_cbShowNonWorldCams === false))
            {
               var posWorld = uroCamCreator.indexOf('world_');
               var posUSA = uroCamCreator.indexOf('usa_');

               if((isChecked_cbShowWorldCams === false) && (posWorld === 0)) uroCamStyle = 'hidden';
               if((isChecked_cbShowUSACams === false) && (posUSA === 0)) uroCamStyle = 'hidden';
               if((isChecked_cbShowNonWorldCams === false) && (posWorld !== 0) && (posUSA !== 0)) uroCamStyle = 'hidden';
            }

            if((isChecked_cbShowSpeedCams === false) || (isChecked_cbShowRedLightCams === false) || (isChecked_cbShowDummyCams === false))
            {
               if((isChecked_cbShowSpeedCams === false) && (uroCamType == 2)) uroCamStyle = 'hidden';
               if((isChecked_cbShowRedLightCams === false) && (uroCamType == 4)) uroCamStyle = 'hidden';
               if((isChecked_cbShowDummyCams === false) && (uroCamType == 3)) uroCamStyle = 'hidden';
            }

            uroCamSpeedString = uroGetLocalisedSpeedString(uroCam.attributes.speed, true);

            if((isChecked_cbShowSpeedCams === true) && (uroCamType == 2))
            {
               if((isChecked_cbShowIfNoSpeedSet === false) && (uroCam.attributes.speed === null)) uroCamStyle = 'hidden';
               if((isChecked_cbShowIfSpeedSet === false) && (uroCam.attributes.speed !== null)) uroCamStyle = 'hidden';
               if((isChecked_cbShowIfInvalidSpeedSet === false) && (uroCamSpeedString.indexOf('not valid') !== -1)) uroCamStyle = 'hidden';
            }

            if((isChecked_cbShowRedLightCams === true) && (uroCamType == 4))
            {
               if((isChecked_cbShowRLCIfNoSpeedSet === false) && (uroCam.attributes.speed === null)) uroCamStyle = 'hidden';
               if((isChecked_cbShowRLCIfNonZeroSpeedSet === false) && (uroCam.attributes.speed > 0)) uroCamStyle = 'hidden';
               if((isChecked_cbShowRLCIfZeroSpeedSet === false) && (uroCam.attributes.speed === 0)) uroCamStyle = 'hidden';
            }

            if(isChecked_cbHideCreatedByMe === true)
            {
               if(uroUserID == uroCam.attributes.createdBy) uroCamStyle = 'hidden';
            }
            if((isChecked_cbHideCreatedByRank0 === true) && (uroCamCreatorRank === 0)) uroCamStyle = 'hidden';
            if((isChecked_cbHideCreatedByRank1 === true) && (uroCamCreatorRank == 1)) uroCamStyle = 'hidden';
            if((isChecked_cbHideCreatedByRank2 === true) && (uroCamCreatorRank == 2)) uroCamStyle = 'hidden';
            if((isChecked_cbHideCreatedByRank3 === true) && (uroCamCreatorRank == 3)) uroCamStyle = 'hidden';
            if((isChecked_cbHideCreatedByRank4 === true) && (uroCamCreatorRank == 4)) uroCamStyle = 'hidden';
            if((isChecked_cbHideCreatedByRank5 === true) && (uroCamCreatorRank == 5)) uroCamStyle = 'hidden';

            if(isChecked_cbHideUpdatedByMe === true)
            {
               if(uroUserID == uroCam.attributes.updatedBy) uroCamStyle = 'hidden';
            }
            if((isChecked_cbHideUpdatedByRank0 === true) && (uroCamUpdaterRank === 0)) uroCamStyle = 'hidden';
            if((isChecked_cbHideUpdatedByRank1 === true) && (uroCamUpdaterRank == 1)) uroCamStyle = 'hidden';
            if((isChecked_cbHideUpdatedByRank2 === true) && (uroCamUpdaterRank == 2)) uroCamStyle = 'hidden';
            if((isChecked_cbHideUpdatedByRank3 === true) && (uroCamUpdaterRank == 3)) uroCamStyle = 'hidden';
            if((isChecked_cbHideUpdatedByRank4 === true) && (uroCamUpdaterRank == 4)) uroCamStyle = 'hidden';
            if((isChecked_cbHideUpdatedByRank5 === true) && (uroCamUpdaterRank == 5)) uroCamStyle = 'hidden';

            if((isChecked_cbHideCWLCams === true) && (uroIsCamOnWatchList(uroCam.attributes.id) != -1)) uroCamStyle = 'hidden';

            var uroCamGeometryID = uroCam.geometry.id;
            if(camLayer.getElementById(uroCamGeometryID) !== null)
            {
               var origImage;
               if(uroCamStyle == "hidden")
               {
                  if(isChecked_cbHighlightInsteadOfHideCams === true)
                  {
                     // set the "highlight" camera image here...
                     var hrefImage = camLayer.getElementById(uroCamGeometryID).getAttribute("xlink:href");
                     origImage = camLayer.getElementById(uroCamGeometryID).getAttribute("origImage");
                     if((hrefImage === origImage) || (origImage === null))
                     {
                        camLayer.getElementById(uroCamGeometryID).setAttribute("origImage", hrefImage);
                        camLayer.getElementById(uroCamGeometryID).setAttribute("xlink:href", uroHighlightedCameraImages[(uroCamType-2)]);
                        var svgElm = document.getElementById(uroCamGeometryID);
                        svgElm.addEventListener("mouseover", uroMarkerMouseOver, false);
                        svgElm.addEventListener("mouseout", uroMarkerMouseOut, false);
                     }
                  }
                  else
                  {
                     camLayer.getElementById(uroCamGeometryID).remove();
                  }
               }
               else
               {
                  // restore the original camera image here...
                  if(camLayer.getElementById(uroCamGeometryID).getAttribute("origImage") !== null)
                  {
                     origImage = camLayer.getElementById(uroCamGeometryID).getAttribute("origImage");
                     camLayer.getElementbyId(uroCamGeometryID).setAttribute("href", origImage);
                     camLayer.getElementById(uroCamGeometryID).removeAttribute("origImage");
                  }
               }
            }
         }
      }
   }
   uroPerformanceMonitoring(pmFunction, pmTStart);
}
function uroFilterMapComments()
{
   var pmTStart = performance.now();
   var pmFunction = "uroFilterMapComments";

   if(uroFilterPreamble() === false) return;

   var uFURs_masterEnable = uroIsFilteringEnabled();
   var filterDescMustBePresent = uroGetCBChecked('_cbMCDescriptionMustBePresent');
   var filterDescMustBeAbsent = uroGetCBChecked('_cbMCDescriptionMustBeAbsent');
   var filterKeywordMustBePresent = uroGetCBChecked('_cbMCEnableKeywordMustBePresent');
   var filterKeywordMustBeAbsent = uroGetCBChecked('_cbMCEnableKeywordMustBeAbsent');
   var filterMyFollowed = uroGetCBChecked('_cbMCHideMyFollowed');
   var filterMyUnfollowed = uroGetCBChecked('_cbMCHideMyUnfollowed');
   var filterRoadworks = uroGetCBChecked('_cbMCFilterRoadworks');
   var filterConstruction = uroGetCBChecked('_cbMCFilterConstruction');
   var filterClosure = uroGetCBChecked('_cbMCFilterClosure');
   var filterEvent = uroGetCBChecked('_cbMCFilterEvent');
   var filterNote = uroGetCBChecked('_cbMCFilterNote');
   var filterWSLM = uroGetCBChecked('_cbMCFilterWSLM');
   var filterBOG = uroGetCBChecked('_cbMCFilterBOG');
   var filterDifficult = uroGetCBChecked('_cbMCFilterDifficult');
   var invertFilters = uroGetCBChecked('_cbInvertMCFilter');
   var keywordPresent = uroGetElmValue('_textMCKeywordPresent');
   var keywordAbsent = uroGetElmValue('_textMCKeywordAbsent');
   var caseInsensitive = uroGetCBChecked('_cbMCCaseInsensitive');
   var filterCommentsMustBePresent = uroGetCBChecked('_cbMCCommentsMustBePresent');
   var filterCommentsMustBeAbsent = uroGetCBChecked('_cbMCCommentsMustBeAbsent');

   var filterExpiryMustBePresent = uroGetCBChecked('_cbMCExpiryMustBePresent');
   var filterExpiryMustBeAbsent = uroGetCBChecked('_cbMCExpiryMustBeAbsent');
   var filterByCreatorEnable = uroGetCBChecked('_cbMCCreatorIDFilter');
   var filterL1 = uroGetCBChecked('_cbHideMCRank0');
   var filterL2 = uroGetCBChecked('_cbHideMCRank1');
   var filterL3 = uroGetCBChecked('_cbHideMCRank2');
   var filterL4 = uroGetCBChecked('_cbHideMCRank3');
   var filterL5 = uroGetCBChecked('_cbHideMCRank4');
   var filterL6 = uroGetCBChecked('_cbHideMCRank5');

   var selectorCreator = document.getElementById('_selectMCCreatorID');

   if(filterByCreatorEnable === false)
   {
      while(selectorCreator.options.length > 0)
      {
         selectorCreator.options.remove(0);
      }
   }
   var creatorUser = null;
   if(filterByCreatorEnable === true)
   {
      if(selectorCreator.options.length === 0)
      {
         uroUpdateMCCreatorList();
      }
      if(selectorCreator.selectedOptions[0] != null)
      {
         creatorUser = parseInt(selectorCreator.selectedOptions[0].value);
      }
   }

   for (var mcIdx = 0; mcIdx < uroMCLayer.features.length; mcIdx++)
   {
      {
         var mcObj = uroMCLayer.features[mcIdx].model;
         if(mcObj !== undefined)
         {
            var desc = '';
            if(mcObj.attributes.subject !== null) desc += mcObj.attributes.subject.replace(/<\/?[^>]+(>|$)/g, "");
            if(mcObj.attributes.body !== null) desc += mcObj.attributes.body.replace(/<\/?[^>]+(>|$)/g, "");
            var nComments = mcObj.attributes.conversation.length;
            if(nComments > 0)
            {
               for(var cIdx=0; cIdx < nComments; cIdx++)
               {
                  desc += mcObj.attributes.conversation[cIdx].text.replace(/<\/?[^>]+(>|$)/g, "");
               }
            }

            var rank = mcObj.attributes.lockRank;
            var expiry = mcObj.attributes.endDate;

            var mcStyle = 'visible';
            var customType = uroGetCustomType(null, "mc", desc);

            if(uFURs_masterEnable === true)
            {
               var ukroadworks_ur = false;
               var construction_ur = false;
               var closure_ur = false;
               var event_ur = false;
               var note_ur = false;
               var wslm_ur = false;
               var bog_ur = false;
               var difficult_ur = false;

               var filterByNotIncludedKeyword = false;
               var filterByIncludedKeyword = true;


               if(customType === 0) ukroadworks_ur = true;
               else if(customType === 1) construction_ur = true;
               else if(customType === 2) closure_ur = true;
               else if(customType === 3) event_ur = true;
               else if(customType === 4) note_ur = true;
               else if(customType === 5) wslm_ur = true;
               else if(customType === 6) bog_ur = true;
               else if(customType === 7) difficult_ur = true;

               // keywords
               if(mcStyle == 'visible')
               {
                  if(filterDescMustBePresent === true)
                  {
                     if(desc === '') mcStyle = 'hidden';
                  }
                  if(filterDescMustBeAbsent === true)
                  {
                     if(desc !== '') mcStyle = 'hidden';
                  }

                  if(filterCommentsMustBePresent === true)
                  {
                     if(nComments === 0) mcStyle = 'hidden';
                  }
                  if(filterCommentsMustBeAbsent === true)
                  {
                     if(nComments > 0) mcStyle = 'hidden';
                  }

                  if(filterKeywordMustBePresent === true)
                  {
                     var keywordIsPresentInDesc = uroKeywordPresent(desc,keywordPresent,caseInsensitive);
                     filterByIncludedKeyword = (filterByIncludedKeyword && (!keywordIsPresentInDesc));
                  }
                  if(filterKeywordMustBeAbsent === true)
                  {
                     var keywordIsAbsentInDesc = uroKeywordPresent(desc,keywordAbsent,caseInsensitive);
                     filterByNotIncludedKeyword = (filterByNotIncludedKeyword || keywordIsAbsentInDesc);
                  }

                  filterByNotIncludedKeyword = (filterByNotIncludedKeyword && filterKeywordMustBeAbsent);
                  filterByIncludedKeyword = (filterByIncludedKeyword && filterKeywordMustBePresent);
                  if(filterByNotIncludedKeyword || filterByIncludedKeyword)
                  {
                     mcStyle = 'hidden';
                  }

               }

               //lock rank
               if(mcStyle == 'visible')
               {
                  if((filterL1 === true) && (rank == 0)) mcStyle = 'hidden';
                  if((filterL2 === true) && (rank == 1)) mcStyle = 'hidden';
                  if((filterL3 === true) && (rank == 2)) mcStyle = 'hidden';
                  if((filterL4 === true) && (rank == 3)) mcStyle = 'hidden';
                  if((filterL5 === true) && (rank == 4)) mcStyle = 'hidden';
                  if((filterL6 === true) && (rank == 5)) mcStyle = 'hidden';
               }

               // expiry
               if(mcStyle == 'visible')
               {
                  if((filterExpiryMustBePresent === true) && (expiry === null)) mcStyle = 'hidden';
                  if((filterExpiryMustBeAbsent === true) && (expiry != null)) mcStyle = 'hidden';
               }

               // is following?
               if(mcStyle == 'visible')
               {
                  if(mcObj.attributes.isFollowing === true)
                  {
                     if(filterMyFollowed === true) mcStyle = 'hidden';
                  }
                  else
                  {
                     if(filterMyUnfollowed === true) mcStyle = 'hidden';
                  }
               }

               if(mcStyle == 'visible')
               {
                  if(creatorUser !== null)
                  {
                     if(mcObj.attributes.createdBy != creatorUser) mcStyle = 'hidden';
                  }
               }

               // custom tags
               if(mcStyle == 'visible')
               {
                  if(ukroadworks_ur === true)
                  {
                     if(filterRoadworks === true) mcStyle = 'hidden';
                  }
                  else if(construction_ur === true)
                  {
                     if(filterConstruction === true) mcStyle = 'hidden';
                  }
                  else if(closure_ur === true)
                  {
                     if(filterClosure === true) mcStyle = 'hidden';
                  }
                  else if(event_ur === true)
                  {
                     if(filterEvent === true) mcStyle = 'hidden';
                  }
                  else if(note_ur === true)
                  {
                     if(filterNote === true) mcStyle = 'hidden';
                  }
                  else if(wslm_ur === true)
                  {
                     if(filterWSLM === true) mcStyle = 'hidden';
                  }
                  else if(bog_ur === true)
                  {
                     if(filterBOG === true) mcStyle = 'hidden';
                  }
                  else if(difficult_ur === true)
                  {
                     if(filterDifficult === true) mcStyle = 'hidden';
                  }

                  if(invertFilters === true)
                  {
                     if(mcStyle == 'hidden') mcStyle = 'visible';
                     else mcStyle = 'hidden';
                  }
               }
            }

            var geoID = uroMCLayer.features[mcIdx].geometry.id;
            if(document.getElementById(geoID) !== null)
            {
               document.getElementById(geoID).style.visibility = mcStyle;
            }
         }
      }
   }
   uroPerformanceMonitoring(pmFunction, pmTStart);
}


function uroFilterURs_onObjectsChanged()
{
   if(uroFilterPreamble())
   {
      if(uroBackfilling === false)
      {
         if(uroURDialogIsOpen === false)
         {
            uroURBackfill();
         }
         else
         {
            uroFilterURs();
         }
      }
   }
}
function uroFilterURs_onObjectsAdded()
{
   if(uroFilterPreamble())
   {
      if(uroBackfilling === false)
      {
         uroURBackfill();
      }
   }
}
function uroFilterURs_onObjectsRemoved()
{
   if(uroFilterPreamble())
   {
      if(uroBackfilling === false)
      {
         uroURBackfill();
      }
   }
}
function uroBackfillQueueObj(lon, lat, blockSize)
{
   this.lon = lon;
   this.lat = lat;
   this.blockSize = blockSize;
}
function uroURBackfill_GetData()
{
   if(uroBackfillQueue.length === 0)
   {
      uroBackfilling = false;
      uroFilterURs();
      return;
   }

   var nextBFQueueObj = uroBackfillQueue.shift();

   var lon = parseFloat(nextBFQueueObj.lon);
   var lat = parseFloat(nextBFQueueObj.lat);
   var blockSize = parseFloat(nextBFQueueObj.blockSize);
   uroAddLog('Backfill square '+lon+','+lat);
   var backfillReq = new XMLHttpRequest();
   backfillReq.onreadystatechange = function ()
   {
      if (backfillReq.readyState == 4)
      {
         uroAddLog('backfill data request, response '+backfillReq.status+' received');
         if (backfillReq.status == 200)
         {
            var tResp = JSON.parse(backfillReq.responseText);
            var urCount = tResp.mapUpdateRequests.objects.length;

            uroAddLog(urCount+' URs loaded for backfill processing');
            if(urCount == 500)
            {
               uroAddLog('WARNING - backfill data may have been pre-filtered by server');
            }

            var backfilled = 0;
            for(var i=0; i<urCount; i++)
            {
               var urID = tResp.mapUpdateRequests.objects[i].id;
               if(W.model.mapUpdateRequests.objects[urID] === undefined)
               {
                  var newUR = require('Waze/Feature/Vector/UpdateRequest');
                  var tUR = new newUR(tResp.mapUpdateRequests.objects[i]);
                  var tPoint = new OL.Geometry.Point();
                  tPoint.x = tResp.mapUpdateRequests.objects[i].geometry.coordinates[0];
                  tPoint.y = tResp.mapUpdateRequests.objects[i].geometry.coordinates[1];
                  tPoint.transform(new OL.Projection("EPSG:4326"),new OL.Projection("EPSG:900913"));
                  tUR.geometry = tPoint;
                  var tReqBounds = new OL.Geometry.Polygon();
                  var tBounds = new OL.Bounds();
                  tBounds.left = tPoint.x;
                  tBounds.right = tPoint.x;
                  tBounds.top = tPoint.y;
                  tBounds.bottom = tPoint.y;
                  tReqBounds.bounds = tBounds;
                  tUR.requestBounds = tReqBounds;
                  W.model.mapUpdateRequests.put(tUR);
                  backfilled++;
               }
            }
            uroAddLog(backfilled+' URs backfilled');
         }
         uroURBackfill_GetData();
      }
   };
   var tURL = 'https://' + document.location.host;
   tURL += W.Config.api_base;
   tURL += '/Features?language=en&mapUpdateRequestFilter=3';
   tURL += '&bbox='+(lon)+','+(lat)+','+(lon + blockSize)+','+(lat + blockSize);
   backfillReq.open('GET',tURL,true);
   backfillReq.send();
}
function uroURBackfill()
{
   if((uroGetCBChecked('_cbURBackfill') === false) || (uroGetCBChecked('_cbMasterEnable') === false))
   {
      uroFilterURs();
      return;
   }

   var nativeURCount = Object.keys(W.model.mapUpdateRequests.objects).length;
   if(nativeURCount < 500)
   {
      uroAddLog(nativeURCount+' URs loaded natively, no backfilling required');
      uroFilterURs();
      return;
   }

   uroAddLog('exactly 500 URs loaded, possible server-side filtering requiring backfill...');

   var subSize = 0.1;
   var vpWidth = W.map.getExtent().getWidth();
   var vpHeight = W.map.getExtent().getHeight();
   var vpCentre = W.map.getCenter();
   var vpLL = new OL.LonLat();
   var vpUR = new OL.LonLat();
   vpLL.lon = vpCentre.lon - (vpWidth / 2);
   vpLL.lat = vpCentre.lat - (vpHeight / 2);
   vpUR.lon = vpCentre.lon + (vpWidth / 2);
   vpUR.lat = vpCentre.lat + (vpHeight / 2);
   vpLL = vpLL.transform(new OL.Projection("EPSG:900913"),new OL.Projection("EPSG:4326"));
   vpUR = vpUR.transform(new OL.Projection("EPSG:900913"),new OL.Projection("EPSG:4326"));
   vpLL.lon -= (subSize / 2);
   vpLL.lat -= (subSize / 2);
   vpUR.lon += (subSize / 2);
   vpUR.lat += (subSize / 2);
   vpLL.lon = +vpLL.lon.toFixed(1);
   vpLL.lat = +vpLL.lat.toFixed(1);
   vpUR.lon = +vpUR.lon.toFixed(1);
   vpUR.lat = +vpUR.lat.toFixed(1);

   uroBackfilling = true;
   uroBackfillQueue = [];
   for(var bfLat = vpLL.lat; bfLat <= vpUR.lat; bfLat += subSize)
   {
      for(var bfLon = vpLL.lon; bfLon <= vpUR.lon; bfLon += subSize)
      {
         uroBackfillQueue.push(new uroBackfillQueueObj(bfLon, bfLat, subSize));
      }
   }
   uroURBackfill_GetData();
}
function uroFilterURs()
{
   var pmTStart = performance.now();
   var pmFunction = "uroFilterURs";

   if(uroUserID === -1) return;

   // compatibility fix for URComments - based on code supplied by RickZabel
   var hasActiveURFilters = false;
   if(uroIsFilteringEnabled() === true)
   {
      var urTabInputs = document.getElementById('uroCtrlURs').getElementsByTagName('input');
      for(var loop = 0; loop < urTabInputs.length; loop++)
      {
         if(urTabInputs[loop].type == 'checkbox')
         {
            var ignoreCB = false;
            ignoreCB = ignoreCB || (urTabInputs[loop].id == '_cbCaseInsensitive');
            ignoreCB = ignoreCB || (urTabInputs[loop].id == '_cbNoFilterForTaggedURs');
            if((urTabInputs[loop].checked) && (ignoreCB === false))
            {
               hasActiveURFilters = true;
               break;
            }
         }
      }
   }
   sessionStorage.UROverview_hasActiveURFilters = hasActiveURFilters;
   if(uroFilterPreamble() === false) return;
   uroRefreshUpdateRequestSessions();
   var selectorResolver = document.getElementById('_selectURResolverID');
   var selectorCommentUser = document.getElementById('_selectURUserID');

   if(uroGetCBChecked('_cbURResolverIDFilter') === false)
   {
      while(selectorResolver.options.length > 0)
      {
         selectorResolver.options.remove(0);
      }
   }
   if(uroGetCBChecked('_cbURUserIDFilter') === false)
   {
      while(selectorCommentUser.options.length > 0)
      {
         selectorCommentUser.options.remove(0);
      }
   }
   if(Object.keys(W.model.updateRequestSessions.objects).length === 0)
   {
      return;
   }
   var commenterUser = null;
   if(uroGetCBChecked('_cbURUserIDFilter') === true)
   {
      if(selectorCommentUser.options.length === 0)
      {
         uroUpdateUserList();
      }
      if(selectorCommentUser.selectedOptions[0] != null)
      {
         commenterUser = parseInt(selectorCommentUser.selectedOptions[0].value);
      }
   }
   var resolverUser = null;
   if(uroGetCBChecked('_cbURResolverIDFilter') === true)
   {
      if(selectorResolver.options.length === 0)
      {
         uroUpdateResolverList();
      }
      if(selectorResolver.selectedOptions[0] != null)
      {
         resolverUser = parseInt(selectorResolver.selectedOptions[0].value);
      }
   }
   uroCustomMarkerList = [];

   var uFURs_masterEnable = uroIsFilteringEnabled();
   var filterOutsideEditableArea = uroGetCBChecked('_cbURFilterOutsideArea');
   var filterSolved = uroGetCBChecked('_cbFilterSolved');
   var filterUnidentified = uroGetCBChecked('_cbFilterUnidentified');
   var filterClosed = uroGetCBChecked('_cbFilterClosedUR');
   var filterOpen = uroGetCBChecked('_cbFilterOpenUR');
   var filterDescMustBePresent = uroGetCBChecked('_cbURDescriptionMustBePresent');
   var filterDescMustBeAbsent = uroGetCBChecked('_cbURDescriptionMustBeAbsent');
   var filterKeywordMustBePresent = uroGetCBChecked('_cbEnableKeywordMustBePresent');
   var filterKeywordMustBeAbsent = uroGetCBChecked('_cbEnableKeywordMustBeAbsent');
   var filterMinURAge = uroGetCBChecked('_cbEnableMinAgeFilter');
   var filterMaxURAge = uroGetCBChecked('_cbEnableMaxAgeFilter');
   var filterMinComments = uroGetCBChecked('_cbEnableMinCommentsFilter');
   var filterMaxComments = uroGetCBChecked('_cbEnableMaxCommentsFilter');
   var filterReporterLastCommenter = uroGetCBChecked('_cbHideIfReporterLastCommenter');
   var filterReporterNotLastCommenter = uroGetCBChecked('_cbHideIfReporterNotLastCommenter');
   var filterHideAnyComments = uroGetCBChecked('_cbHideAnyComments');
   var filterHideNotLastCommenter = uroGetCBChecked('_cbHideIfNotLastCommenter');
   var filterHideMyComments = uroGetCBChecked('_cbHideMyComments');
   var filterIfLastCommenter = uroGetCBChecked('_cbHideIfLastCommenter');
   var filterIfNotLastCommenter = uroGetCBChecked('_cbHideIfNotLastCommenter');
   var filterCommentMinAge = uroGetCBChecked('_cbEnableCommentAgeFilter2');
   var filterCommentMaxAge = uroGetCBChecked('_cbEnableCommentAgeFilter');
   var filterUserID = uroGetCBChecked('_cbURUserIDFilter');
   var filterMyFollowed = uroGetCBChecked('_cbHideMyFollowed');
   var filterMyUnfollowed = uroGetCBChecked('_cbHideMyUnfollowed');

   var filterWazeAuto = uroGetCBChecked('_cbFilterWazeAuto');
   var filterRoadworks = uroGetCBChecked('_cbFilterRoadworks');
   var filterConstruction = uroGetCBChecked('_cbFilterConstruction');
   var filterClosure = uroGetCBChecked('_cbFilterClosure');
   var filterEvent = uroGetCBChecked('_cbFilterEvent');
   var filterNote = uroGetCBChecked('_cbFilterNote');
   var filterWSLM = uroGetCBChecked('_cbFilterWSLM');
   var filterBOG = uroGetCBChecked('_cbFilterBOG');
   var filterDifficult = uroGetCBChecked('_cbFilterDifficult');

   var filterIncorrectTurn = uroGetCBChecked('_cbFilterIncorrectTurn');
   var filterIncorrectAddress = uroGetCBChecked('_cbFilterIncorrectAddress');
   var filterIncorrectRoute = uroGetCBChecked('_cbFilterIncorrectRoute');
   var filterMissingRoundabout = uroGetCBChecked('_cbFilterMissingRoundabout');
   var filterGeneralError = uroGetCBChecked('_cbFilterGeneralError');
   var filterTurnNotAllowed = uroGetCBChecked('_cbFilterTurnNotAllowed');
   var filterIncorrectJunction = uroGetCBChecked('_cbFilterIncorrectJunction');
   var filterMissingBridgeOverpass = uroGetCBChecked('_cbFilterMissingBridgeOverpass');
   var filterWrongDrivingDirection = uroGetCBChecked('_cbFilterWrongDrivingDirection');
   var filterMissingExit = uroGetCBChecked('_cbFilterMissingExit');
   var filterMissingRoad = uroGetCBChecked('_cbFilterMissingRoad');
   var filterMissingLandmark = uroGetCBChecked('_cbFilterMissingLandmark');
   var filterNativeSpeedLimit = uroGetCBChecked('_cbFilterSpeedLimits');
   var filterBlockedRoad = uroGetCBChecked('_cbFilterBlockedRoad');
   var filterUndefined = uroGetCBChecked('_cbFilterUndefined');

   var invertURFilters = uroGetCBChecked('_cbInvertURFilter');
   var invertURStateFilters = uroGetCBChecked('_cbInvertURStateFilter');
   var noFilterTaggedURs = uroGetCBChecked('_cbNoFilterForTaggedURs');
   var noFilterURInURL = uroGetCBChecked('_cbNoFilterForURInURL');

   var keywordPresent = uroGetElmValue('_textKeywordPresent');
   var keywordAbsent = uroGetElmValue('_textKeywordAbsent');
   var caseInsensitive = uroGetCBChecked('_cbCaseInsensitive');
   var thresholdMinAge = uroGetElmValue('_inputFilterMinDays');
   var thresholdMaxAge = uroGetElmValue('_inputFilterMaxDays');
   var thresholdMinComments = uroGetElmValue('_inputFilterMinComments');
   var thresholdMaxComments = uroGetElmValue('_inputFilterMaxComments');
   var thresholdMaxCommentAge = uroGetElmValue('_inputFilterCommentDays');
   var thresholdMinCommentAge = uroGetElmValue('_inputFilterCommentDays2');
   var ignoreOtherEditorComments = uroGetCBChecked('_cbIgnoreOtherEditorComments');

   var urcFilteringIsActive = false;
   var urcCB = document.getElementById('URCommentsFilterEnabled');
   if(urcCB !== null)
   {
      if(urcCB.checked)
      {
         urcFilteringIsActive = true;
      }
   }
   urcCB = document.getElementById('URCommentUROOnlyMyUR');
   if(urcCB !== null)
   {
      if(urcCB.checked)
      {
         urcFilteringIsActive = true;
      }
   }
   urcCB = document.getElementById('URCommentUROHideTagged');
   if(urcCB !== null)
   {
      if(urcCB.checked)
      {
         urcFilteringIsActive = true;
      }
   }



   for (var urobj in W.model.mapUpdateRequests.objects)
   {
      if(W.model.mapUpdateRequests.objects.hasOwnProperty(urobj))
      {
         var ureq = W.model.mapUpdateRequests.objects[urobj];
         var ureqID = ureq.attributes.id;

         var urStyle = 'visible';
         var inhibitFiltering = ((ureqID == uroSelectedURID) && (noFilterURInURL));

         var hasMyComments = false;
         var nComments = 0;
         var desc = ureq.attributes.description;
         var customType = uroGetCustomType(ureqID, "ur", desc);
         if(W.model.updateRequestSessions.objects[ureqID] != null)
         {
            nComments = W.model.updateRequestSessions.objects[ureqID].comments.length;
            if((uFURs_masterEnable === false) && (nComments === 0))
            {
               // when master enable is turned off, we want to make sure that all URs, including ones that were previously hidden, are correctly
               // displayed in their native form - i.e. no comment count or custom conversation bubbles.  The easiest way to achieve this is to
               // force the uroRenderCustomMarkers code to test for the presence of these bubbles on each UR, which we do by setting a non-zero
               // comment count for each UR...  For URs which genuinely do have no comments we use -1 to indicate that we're not really setting
               // a comment count, but that we still need to do something that wouldn't be achieved by using 0.
               nComments = -1;
            }
         }

         if((uFURs_masterEnable === true) && (inhibitFiltering === false))
         {
            var wazeauto_ur = false;
            var ukroadworks_ur = false;
            var construction_ur = false;
            var closure_ur = false;
            var event_ur = false;
            var note_ur = false;
            var wslm_ur = false;
            var bog_ur = false;
            var difficult_ur = false;

            var filterByNotIncludedKeyword = false;
            var filterByIncludedKeyword = true;

            if(desc !== null) desc = desc.replace(/<\/?[^>]+(>|$)/g, "");
            else desc = '';

            if(customType === 0) ukroadworks_ur = true;
            else if(customType === 1) construction_ur = true;
            else if(customType === 2) closure_ur = true;
            else if(customType === 3) event_ur = true;
            else if(customType === 4) note_ur = true;
            else if(customType === 5) wslm_ur = true;
            else if(customType === 6) bog_ur = true;
            else if(customType === 7) difficult_ur = true;

            // check UR against editable area...

            if(filterOutsideEditableArea === true)
            {
               if(ureq.canEdit() === false) urStyle = 'hidden';
            }
            // check UR against current session ignore list...
            if(uroIsOnIgnoreList(ureqID)) urStyle = 'hidden';

            // state-age filtering
            if(urStyle == 'visible')
            {
               // check against closed/not identified filtering if enabled...
               if(filterSolved === true)
               {
                  if(ureq.attributes.resolution === 0) urStyle = 'hidden';
               }
               if(filterUnidentified === true)
               {
                  if(ureq.attributes.resolution == 1) urStyle = 'hidden';
               }

               if((ureq.attributes.resolvedOn !== null) && (filterClosed === true))
               {
                  urStyle = 'hidden';
               }

               if((ureq.attributes.resolvedOn === null) && (filterOpen === true))
               {
                  urStyle = 'hidden';
               }

               if(urStyle == 'visible')
               {
                  // check UR against keyword filtering if enabled...
                  if(filterDescMustBePresent === true)
                  {
                     if(desc === '') urStyle = 'hidden';
                  }
                  if(filterDescMustBeAbsent === true)
                  {
                     if(desc !== '') urStyle = 'hidden';
                  }

                  if(filterKeywordMustBePresent === true)
                  {
                     var keywordIsPresentInDesc = uroKeywordPresent(desc,keywordPresent,caseInsensitive);
                     filterByIncludedKeyword = (filterByIncludedKeyword && (!keywordIsPresentInDesc));
                  }
                  if(filterKeywordMustBeAbsent === true)
                  {
                     var keywordIsAbsentInDesc = uroKeywordPresent(desc,keywordAbsent,caseInsensitive);
                     filterByNotIncludedKeyword = (filterByNotIncludedKeyword || keywordIsAbsentInDesc);
                  }
               }

               if(urStyle == 'visible')
               {
                  // do age-based filtering if enabled
                  if(filterMinURAge === true)
                  {
                     if(uroGetURAge(ureq,0,false) < thresholdMinAge) urStyle = 'hidden';
                  }
                  if(filterMaxURAge === true)
                  {
                     if(uroGetURAge(ureq,0,false) > thresholdMaxAge) urStyle = 'hidden';
                  }
               }

               if(urStyle == 'visible')
               {
                  if(resolverUser !== null)
                  {
                     if(ureq.attributes.resolvedBy != resolverUser) urStyle = 'hidden';
                  }
               }

               if(urStyle == 'visible')
               {
                  // do comments/following filtering
                  if(W.model.updateRequestSessions.objects[ureqID] != null)
                  {
                     nComments = W.model.updateRequestSessions.objects[ureqID].comments.length;
                     var commentDaysOld = -1;


                     if(filterMinComments === true)
                     {
                        if(nComments < thresholdMinComments) urStyle = 'hidden';
                     }
                     if(filterMaxComments === true)
                     {
                        if(nComments > thresholdMaxComments) urStyle = 'hidden';
                     }


                     if(nComments > 0)
                     {
                        var reporterIsLastCommenter = false;
                        if(W.model.updateRequestSessions.objects[ureqID].comments[nComments-1].userID == -1) reporterIsLastCommenter = true;

                        if(filterReporterLastCommenter === true)
                        {
                           if(reporterIsLastCommenter === true) urStyle = 'hidden';
                        }
                        else if(filterReporterNotLastCommenter === true)
                        {
                           if(reporterIsLastCommenter === false) urStyle = 'hidden';
                        }

                        hasMyComments = uroURHasMyComments(ureqID);
                        if(hasMyComments === false)
                        {
                           if(filterHideAnyComments === true) urStyle = 'hidden';
                           if(filterHideNotLastCommenter === true) urStyle = 'hidden';
                        }
                        else
                        {
                           if(filterHideMyComments === true) urStyle = 'hidden';

                           var userIsLastCommenter = false;
                           if(W.model.updateRequestSessions.objects[ureqID].comments[nComments-1].userID == uroUserID) userIsLastCommenter = true;

                           if(filterIfLastCommenter === true)
                           {
                              if(userIsLastCommenter === true) urStyle = 'hidden';
                           }
                           else if(filterIfNotLastCommenter === true)
                           {
                              if(userIsLastCommenter === false) urStyle = 'hidden';
                           }
                        }

                        var cidx;

                        if(ignoreOtherEditorComments === false)
                        {
                           commentDaysOld = uroGetCommentAge(W.model.updateRequestSessions.objects[ureqID].comments[nComments-1]);
                        }
                        else
                        {
                           for(cidx=0; cidx<nComments; cidx++)
                           {
                              var cObj = W.model.updateRequestSessions.objects[ureqID].comments[cidx];
                              if((cObj.userID == uroUserID) || (cObj.userID == -1))
                              {
                                 commentDaysOld = uroGetCommentAge(cObj);
                              }
                           }
                        }
                        if((filterCommentMinAge === true) && (commentDaysOld != -1))
                        {
                           if(thresholdMinCommentAge > commentDaysOld) urStyle = 'hidden';
                        }
                        if((filterCommentMaxAge === true) && (commentDaysOld != -1))
                        {
                           if(thresholdMaxCommentAge < commentDaysOld) urStyle = 'hidden';
                        }

                        if((commenterUser !== null) && (urStyle != 'hidden'))
                        {
                           urStyle = 'hidden';
                           for(cidx=0; cidx<nComments; cidx++)
                           {
                              if(W.model.updateRequestSessions.objects[ureqID].comments[cidx].userID == commenterUser)
                              {
                                 urStyle = 'visible';
                                 break;
                              }
                           }
                        }

                        var commentText = '';
                        for(cidx=0; cidx<nComments; cidx++)
                        {
                           commentText += W.model.updateRequestSessions.objects[ureqID].comments[cidx].text;
                        }

                        if(filterKeywordMustBePresent === true)
                        {
                           var keywordIsPresentInComments = uroKeywordPresent(commentText,keywordPresent,caseInsensitive);
                           filterByIncludedKeyword = (filterByIncludedKeyword && (!keywordIsPresentInComments));
                        }
                        if(filterKeywordMustBeAbsent === true)
                        {
                           var keywordIsAbsentInComments = uroKeywordPresent(commentText,keywordAbsent,caseInsensitive);
                           filterByNotIncludedKeyword = (filterByNotIncludedKeyword || keywordIsAbsentInComments);
                        }
                     }
                     else
                     {
                        if(filterUserID === true)
                        {
                           urStyle = 'hidden';
                        }
                     }

                     filterByNotIncludedKeyword = (filterByNotIncludedKeyword && filterKeywordMustBeAbsent);
                     filterByIncludedKeyword = (filterByIncludedKeyword && filterKeywordMustBePresent);
                     if(filterByNotIncludedKeyword || filterByIncludedKeyword)
                     {
                        urStyle = 'hidden';
                     }

                     if(W.model.updateRequestSessions.objects[ureqID].isFollowing === true)
                     {
                        if(filterMyFollowed === true) urStyle = 'hidden';
                     }
                     else
                     {
                        if(filterMyUnfollowed === true) urStyle = 'hidden';
                     }
                  }
               }

               if(invertURStateFilters === true)
               {
                 if(urStyle == 'hidden') urStyle = 'visible';
                 else urStyle = 'hidden';
               }
            }

            // type filtering
            if(urStyle == 'visible')
            {
               // Test for Waze automatic URs before any others - these always (?) get inserted as General Error URs,
               // so we can't filter them by type...
               if(desc.indexOf('Waze Automatic:') != -1)
               {
                  wazeauto_ur = true;
               }

               if(wazeauto_ur === true)
               {
                  if(filterWazeAuto === true) urStyle = 'hidden';
               }

               else if(ukroadworks_ur === true)
               {
                  if(filterRoadworks === true) urStyle = 'hidden';
               }
               else if(construction_ur === true)
               {
                  if(filterConstruction === true) urStyle = 'hidden';
               }
               else if(closure_ur === true)
               {
                  if(filterClosure === true) urStyle = 'hidden';
               }
               else if(event_ur === true)
               {
                  if(filterEvent === true) urStyle = 'hidden';
               }
               else if(note_ur === true)
               {
                  if(filterNote === true) urStyle = 'hidden';
               }
               else if(wslm_ur === true)
               {
                  if(filterWSLM === true) urStyle = 'hidden';
               }
               else if(bog_ur === true)
               {
                  if(filterBOG === true) urStyle = 'hidden';
               }
               else if(difficult_ur === true)
               {
                  if(filterDifficult === true) urStyle = 'hidden';
               }

               else if(ureq.attributes.type == 6)
               {
                  if(filterIncorrectTurn === true) urStyle = 'hidden';
               }
               else if(ureq.attributes.type == 7)
               {
                  if (filterIncorrectAddress === true) urStyle = 'hidden';
               }
               else if(ureq.attributes.type == 8)
               {
                  if(filterIncorrectRoute === true) urStyle = 'hidden';
               }
               else if(ureq.attributes.type == 9)
               {
                  if(filterMissingRoundabout === true) urStyle = 'hidden';
               }
               else if(ureq.attributes.type == 10)
               {
                  if(filterGeneralError === true) urStyle = 'hidden';
               }
               else if(ureq.attributes.type == 11)
               {
                  if(filterTurnNotAllowed === true) urStyle = 'hidden';
               }
               else if(ureq.attributes.type == 12)
               {
                  if(filterIncorrectJunction === true) urStyle = 'hidden';
               }
               else if(ureq.attributes.type == 13)
               {
                  if(filterMissingBridgeOverpass === true) urStyle = 'hidden';
               }
               else if(ureq.attributes.type == 14)
               {
                  if(filterWrongDrivingDirection === true) urStyle = 'hidden';
               }
               else if(ureq.attributes.type == 15)
               {
                  if(filterMissingExit === true) urStyle = 'hidden';
               }
               else if(ureq.attributes.type == 16)
               {
                  if(filterMissingRoad === true) urStyle = 'hidden';
               }
               else if(ureq.attributes.type == 18)
               {
                  if(filterMissingLandmark === true) urStyle = 'hidden';
               }
               else if(ureq.attributes.type == 19)
               {
                  if(filterBlockedRoad === true) urStyle = 'hidden';
               }
               else if(ureq.attributes.type == 23)
               {
                  if(filterNativeSpeedLimit === true) urStyle = 'hidden';
               }
               else if(filterUndefined === true) urStyle = 'hidden';

               if(invertURFilters === true)
               {
                 if(urStyle == 'hidden') urStyle = 'visible';
                 else urStyle = 'hidden';
               }
            }

            // stage-age filtering override for tagged URs
            if(noFilterTaggedURs === true)
            {
               if(ukroadworks_ur === true)
               {
                  if(filterRoadworks === false) urStyle = 'visible';
               }
               else if(construction_ur === true)
               {
                  if(filterConstruction === false) urStyle = 'visible';
               }
               else if(closure_ur === true)
               {
                  if(filterClosure === false) urStyle = 'visible';
               }
               else if(event_ur === true)
               {
                  if(filterEvent === false) urStyle = 'visible';
               }
               else if(note_ur === true)
               {
                  if(filterNote === false) urStyle = 'visible';
               }
               else if(wslm_ur === true)
               {
                  if(filterWSLM === false) urStyle = 'visible';
               }
            }
         }
         // only touch marker visibility if we've got active filter settings, or if URComments is not
         // doing any filtering of its own
         if((hasActiveURFilters === true) || (urcFilteringIsActive === false) || (uFURs_masterEnable === false))
         {
            W.map.updateRequestLayer.markers[urobj].icon.imageDiv.style.visibility = urStyle;
         }
         if(urStyle != 'hidden')
         {
            uroAddCustomMarkers(ureqID,'ur',customType, hasMyComments, nComments);
         }
      }
   }

   uroRenderCustomMarkers('ur');
   uroPerformanceMonitoring(pmFunction, pmTStart);
}
function uroGetProblemTypes()
{
   uroKnownProblemTypeIDs = [];
   uroKnownProblemTypeNames = [];
   var tProblemList = I18n.lookup("problems.types");
   for(var tObj in tProblemList)
   {
      if(tObj !== undefined)
      {
         uroKnownProblemTypeIDs.push(parseInt(tObj));
         uroKnownProblemTypeNames.push(tProblemList[tObj].title);
      }
   }
}
function uroFilterProblems()
{
   var pmTStart = performance.now();
   var pmFunction = "uroFilterProblems";

   if(uroFilterPreamble() === false) return;
   var selector;

   if((uroGetCBChecked('_cbMPNotClosedUserIDFilter') === false) && (uroGetCBChecked('_cbMPClosedUserIDFilter') === false))
   {
      selector = document.getElementById('_selectMPUserID');
      while(selector.options.length > 0)
      {
         selector.options.remove(0);
      }
   }

   var solverUser = null;
   if((uroGetCBChecked('_cbMPNotClosedUserIDFilter') === true) || (uroGetCBChecked('_cbMPClosedUserIDFilter') === true))
   {
      selector = document.getElementById('_selectMPUserID');
      if(selector.options.length === 0)
      {
         uroUpdateMPSolverList();
      }
      if(selector.selectedOptions[0] != null)
      {
         solverUser = parseInt(selector.selectedOptions[0].value);
      }
   }

   var urobj;
   var problem;
   var problemStyle;
   var problem_marker_img;

   var uro_uFP_masterEnable = uroIsFilteringEnabled();
   var filter_OutsideEditableArea = uroGetCBChecked('_cbMPFilterOutsideArea');
   var filter_Solved = uroGetCBChecked('_cbMPFilterSolved');
   var filter_Unidentified = uroGetCBChecked('_cbMPFilterUnidentified');
   var filter_Closed = uroGetCBChecked('_cbMPFilterClosed');
   var filter_NotClosedUserID = uroGetCBChecked('_cbMPNotClosedUserIDFilter');
   var filter_ClosedUserID = uroGetCBChecked('_cbMPClosedUserIDFilter');
   var filter_Reopened = uroGetCBChecked('_cbMPFilterReopenedProblem');

   var filter_LowSeverity = uroGetCBChecked('_cbMPFilterLowSeverity');
   var filter_MediumSeverity = uroGetCBChecked('_cbMPFilterMediumSeverity');
   var filter_HighSeverity = uroGetCBChecked('_cbMPFilterHighSeverity');

   var filter_TurnProblems = uroGetCBChecked('_cbMPFilter_T200');

   var filterTypes = [];
   var i;
   for(i=0; i<uroKnownProblemTypeIDs.length; i++)
   {
      if(uroGetCBChecked('_cbMPFilter_T'+uroKnownProblemTypeIDs[i])) filterTypes.push(uroKnownProblemTypeIDs[i]);
   }
   var filter_TypeUnknown = uroGetCBChecked('_cbMPFilterUnknownProblem');

   var filter_TaggedElgin = uroGetCBChecked('_cbFilterElgin');
   var filter_TaggedTrafficCast = uroGetCBChecked('_cbFilterTrafficCast');
   var filter_TaggedTrafficMaster = uroGetCBChecked('_cbFilterTrafficMaster');
   var filter_TaggedCaltrans = uroGetCBChecked('_cbFilterCaltrans');
   var filter_TaggedTFL = uroGetCBChecked('_cbFilterTFL');

   var filter_Invert = uroGetCBChecked('_cbInvertMPFilter');


   for (urobj in W.model.problems.objects)
   {
      if(W.model.problems.objects.hasOwnProperty(urobj))
      {
         problem = W.model.problems.objects[urobj];

         problemStyle = 'visible';
         var ureqID = null;
         var customType = null;

         if(uro_uFP_masterEnable === true)
         {
            var elgin_mp = false;
            var trafficcast_mp = false;
            var trafficmaster_mp = false;
            var caltrans_mp = false;
            var tfl_mp = false;

            ureqID = problem.attributes.id;
            var desc = '';
            if(problem.attributes.description != null)
            {
               desc = problem.attributes.description;
            }
            customType = uroGetCustomType(ureqID, "mp", desc);
            if(customType === 100) elgin_mp = true;
            else if(customType === 101) trafficcast_mp = true;
            else if(customType === 102) trafficmaster_mp = true;
            else if(customType === 103) caltrans_mp = true;
            else if(customType === 104) tfl_mp = true;

            // check problem against current session ignore list...
            if(uroIsOnIgnoreList(ureqID)) problemStyle = 'hidden';

            if(filter_OutsideEditableArea === true)
            {
               if(problem.canEdit() === false)
               {
                  problemStyle = 'hidden';
               }
            }

            // check against closed/not identified filtering if enabled...
            problem_marker_img = '';
            if(problem.geometry.id !== null)
            {
               if(document.getElementById(problem.geometry.id) !== null)
               {
                  problem_marker_img = document.getElementById(problem.geometry.id).href.baseVal;
                  if(filter_Solved === true)
                  {
                     if(problem_marker_img.indexOf('_solved') != -1) problemStyle = 'hidden';
                  }
                  if(filter_Unidentified === true)
                  {
                     if(problem_marker_img.indexOf('_rejected') != -1) problemStyle = 'hidden';
                  }
               }
            }

            if(filter_Closed === true)
            {
               if(problem.attributes.open === false)
               {
                  problemStyle = 'hidden';
               }
            }

            if(problemStyle == 'visible')
            {
               if(solverUser !== null)
               {
                  if((filter_NotClosedUserID === true) && (problem.attributes.resolvedBy == solverUser)) problemStyle = 'hidden';
                  if((filter_ClosedUserID === true) && (problem.attributes.resolvedBy != solverUser)) problemStyle = 'hidden';
               }
            }

            if(problemStyle == 'visible')
            {
               var problemType = null;
               if(uroDOMHasTurnProblems)
               {
                  problemType = problem.attributes.problemType;
               }
               else
               {
                  problemType = problem.attributes.subType;
               }

               if(elgin_mp === true)
               {
                  if(filter_TaggedElgin === true) problemStyle = 'hidden';
               }
               else if(trafficcast_mp === true)
               {
                  if(filter_TaggedTrafficCast === true) problemStyle = 'hidden';
               }
               else if(trafficmaster_mp === true)
               {
                  if(filter_TaggedTrafficMaster === true) problemStyle = 'hidden';
               }
               else if(caltrans_mp === true)
               {
                  if(filter_TaggedCaltrans === true) problemStyle = 'hidden';
               }
               else if(tfl_mp === true)
               {
                  if(filter_TaggedTFL === true) problemStyle = 'hidden';
               }

               else if(uroKnownProblemTypeIDs.indexOf(problemType) !== -1)
               {
                  if(filterTypes.indexOf(problemType) !== -1)
                  {
                     problemStyle = 'hidden';
                  }
               }
               else if(filter_TypeUnknown === true) problemStyle = 'hidden';

               if(filter_Reopened === true)
               {
                  if((problem.attributes.open === true) && (problem.attributes.resolvedOn !== null))
                  {
                     problemStyle = 'hidden';
                  }
               }


               if(filter_Invert === true)
               {
                  if(problemStyle == 'hidden') problemStyle = 'visible';
                  else problemStyle = 'hidden';
               }


               if(problem.attributes.weight <= 3)
               {
                  if(filter_LowSeverity === true) problemStyle = 'hidden';
               }
               else if(problem.attributes.weight <= 7)
               {
                  if(filter_MediumSeverity === true) problemStyle = 'hidden';
               }
               else if(filter_HighSeverity === true) problemStyle = 'hidden';
            }
         }

         W.map.problemLayer.markers[urobj].icon.imageDiv.style.visibility = problemStyle;

         if((problemStyle != 'hidden') && (ureqID !== null) && (customType !== null))
         {
            uroAddCustomMarkers(ureqID,'mp',customType, false, 0);
         }
      }
   }

   if(uroDOMHasTurnProblems)
   {
      for (urobj in W.model.turnProblems.objects)
      {
         if(W.model.turnProblems.objects.hasOwnProperty(urobj))
         {
            problem = W.model.turnProblems.objects[urobj];
            problemStyle = 'visible';

            if(uro_uFP_masterEnable === true)
            {
               // check problem against current session ignore list...
               if(uroIsOnIgnoreList(problem.attributes.id)) problemStyle = 'hidden';

               // check against closed/not identified filtering if enabled...
               problem_marker_img = '';
               if(problem.geometry.id !== null)
               {
                  if(document.getElementById(problem.geometry.id) !== null)
                  {
                     problem_marker_img = document.getElementById(problem.geometry.id).href.baseVal;
                     if(filter_Solved === true)
                     {
                        if(problem_marker_img.indexOf('_solved') != -1) problemStyle = 'hidden';
                     }
                     if(filter_Unidentified === true)
                     {
                        if(problem_marker_img.indexOf('_rejected') != -1) problemStyle = 'hidden';
                     }
                  }
               }

               if(filter_Closed === true)
               {
                  if(problem.attributes.open === false)
                  {
                     problemStyle = 'hidden';
                  }
               }

               if(problemStyle == 'visible')
               {
                  if(filter_TurnProblems === true) problemStyle = 'hidden';

                  if(filter_Reopened === true)
                  {
                     if((problem.attributes.open === true) && (problem.attributes.resolvedOn !== null))
                     {
                        problemStyle = 'hidden';
                     }
                  }

                  if(filter_Invert === true)
                  {
                     if(problemStyle == 'hidden') problemStyle = 'visible';
                     else problemStyle = 'hidden';
                  }
               }
            }
            W.map.problemLayer.markers[urobj].icon.imageDiv.style.visibility = problemStyle;
         }
      }
   }
   uroRenderCustomMarkers('mp');
   uroPerformanceMonitoring(pmFunction, pmTStart);
}

function uroToHex(decValue,digits)
{
   var modifier = 1;
   for(var i=0; i<digits; i++)
   {
      modifier *= 16;
   }
   decValue = parseInt(decValue);
   decValue += modifier;
   var retval = decValue.toString(16);
   retval = retval.substr(-digits);
   retval = retval.toUpperCase();
   return retval;
}
function uroFilterPreamble()
{
   var mapviewport = document.getElementsByClassName("olMapViewport")[0];
   if(mapviewport === null)
   {
      if(uroNullMapViewport === false)
      {
         uroAddLog('caught null mapviewport');
         uroNullMapViewport = true;
      }
      return false;
   }

   var uiElms = document.getElementById('uroCtrlMisc');
   if(uiElms == null)
   {
      uroAddLog('caught missing UI');
      return false;
   }
   if(uiElms.innerHTML.length === 0)
   {
      uroAddLog('caught empty UI');
      return false;
   }

   uroNullMapViewport = false;

   return true;
}
function uroFilterItems_URTabClick()
{
   uroFilterURs();
}
function uroFilterItems_MPTabClick()
{
   uroFilterProblems();
}
function uroFilterItems_MCTabClick()
{
   uroFilterMapComments();
   uroMCLayerChanged();
}
function uroFilterItems_PlacesTabClick()
{
   uroFilterPlaces();
}
function uroFilterItems_CamerasTabClick()
{
   uroFilterCameras();
}
function uroFilterItems_MiscTabClick()
{
   uroFilterItems();
}
function uroFilterItems_MasterEnableClick()
{
   if(uroGetCBChecked('_cbMasterEnable') === false)
   {
      uroHidePopup('uroFilterItems_MasterEnableClick');
   }
   uroFilterItems();
}

function uroScaleTheScaleBar()
{
   // adjust the scale bar to more accurately reflect true distances at all latitudes

   var currLat = W.map.getCenter().transform(new OL.Projection("EPSG:900913"),new OL.Projection("EPSG:4326")).lat;

   if((currLat < 85) && (currLat > -85))
   {
      var cosLat = Math.cos((currLat * Math.PI) / 180);
      var scaleElm;
      var elmWidth;

      scaleElm = document.getElementsByClassName('olControlScaleLineTop')[0];
      if(scaleElm.innerHTML.indexOf(' ') !== -1)
      {
         elmWidth = Math.round((scaleElm.clientWidth + 2) / cosLat);
         scaleElm.innerHTML = scaleElm.innerHTML.replace(' ','');
         scaleElm.style.width = elmWidth + 'px';
      }
      scaleElm = document.getElementsByClassName('olControlScaleLineBottom')[0];
      if(scaleElm.innerHTML.indexOf(' ') !== -1)
      {
         elmWidth = Math.round((scaleElm.clientWidth + 2) / cosLat);
         scaleElm.innerHTML = scaleElm.innerHTML.replace(' ','');
         scaleElm.style.width = elmWidth + 'px';
      }
   }
}

function uroFilterItems()
{
   uroScaleTheScaleBar();
   uroFilterProblems();
   uroFilterPlaces();
   uroFilterCameras();
   uroFilterURs();
   uroFilterRTCs();
   uroFilterMapComments();
}
function uroFilterItemsOnMove()
{
   W.map.events.unregister('mousemove',null,uroFilterItemsOnMove);
   uroFilterItems();
}

function uroDeleteObject()
{
   uroAddLog('delete camera ID '+uroShownFID);
   if(W.model.cameras.objects[uroShownFID] === null)
   {
      uroAddLog('camera object not found...');
      return false;
   }
   uroRemoveCamFromWatchList();
   var actionObj = require('Waze/Action/DeleteObject');
   var deleteAction = new actionObj(W.model.cameras.objects[uroShownFID], null);
   W.model.actionManager.add(deleteAction);
   uroExitPopup();
   uroHidePopup('uroDeleteObject');
   return false;
}

function uroGetUserNameAndRank(userID)
{
   var userName;
   var userLevel;
   if(W.model.users.objects[userID] != null)
   {
      userName = W.model.users.objects[userID].userName;
      if(userName === undefined)
      {
         userName = userID;
      }
      else
      {
         userName = '<a href="' + (W.Config.user_profile.url + userName) + '">' + userName + '</a>';
      }
      userLevel = W.model.users.objects[userID].rank + 1;
   }
   else
   {
      userName = userID;
      userLevel = '?';
   }
   return userName + ' (' + userLevel + ')';
}
function uroCheckCommentsForTag(idSrc, customText)
{
   var ursObj = W.model.updateRequestSessions.objects[idSrc];
   if(typeof(ursObj) == 'undefined') return -1;
   if(ursObj.comments.length === 0) return -1;

   for(var idx=ursObj.comments.length-1; idx>=0; idx--)
   {
      for(var tag=0; tag<uroCustomURTags.length; tag++)
      {
         var keyword = uroCustomURTags[tag];
         if(ursObj.comments[idx].text.indexOf(keyword) != -1)
         {
            return tag;
         }
      }

      if(customText !== '')
      {
         if(ursObj.comments[idx].text.toLowerCase().indexOf(customText) != -1)
         {
            return 99;
         }
      }
   }
   return -1;
}

function uroGetCustomMarkerIdx(customType)
{
   if(customType === 0) return 1;      // ROADWORKS
   if(customType === 1) return 1;      // CONSTRUCTION
   if(customType === 2) return 0;      // CLOSURE
   if(customType === 3) return 4;      // EVENT
   if(customType === 4) return 3;      // NOTE
   if(customType === 5) return 5;      // WSLM
   if(customType === 6) return 11;     // BOG
   if(customType === 7) return 12;     // DIFFICULT

   if(customType === 98) return 5;     // Native speed limit URs
   if(customType === 99) return 2;     // custom text

   if(customType === 100) return 6;    // ELGIN
   if(customType === 101) return 7;    // TRAFFICCAST
   if(customType === 102) return 8;    // TRAFFICMASTER
   if(customType === 103) return 9;    // CALTRANS
   if(customType === 104) return 10;   // TFL

   return -1;
}
function uroGetCustomType(idSrc, markerType, desc)
{
   var provider = '';
   var customText = '';
   if(uroGetCBChecked('_cbCustomKeywordMarkers')) customText = document.getElementById('_textCustomKeyword').value.toLowerCase();
   if(desc === null) desc = '';
   if(markerType == "ur")
   {
      var ureq = W.model.mapUpdateRequests.objects[idSrc];
      // early test for native speed limit URs
      if(ureq.attributes.type == 23) return 98;
   }
   else if(markerType == "mp")
   {
      var mp = W.model.problems.objects[idSrc];
      if(mp.attributes.provider != null)
      {
         provider = mp.attributes.provider;
      }
   }

   if(desc !== '')
   {
      if((markerType == 'ur') || (markerType == 'mc'))
      {
         for(var tag=0; tag<uroCustomURTags.length; tag++)
         {
            var keyword = uroCustomURTags[tag];
            if(desc.indexOf(keyword) != -1)
            {
               return tag;
            }
         }
      }

      if(markerType == 'ur')
      {
         if((uroGetCBChecked('_cbCustomKeywordMarkers')) && (customText !== ''))
         {
            if(desc.toLowerCase().indexOf(customText) != -1) return 99;
         }
      }

      if(markerType == 'mp')
      {
         if(desc.indexOf('[Elgin]') != -1) return 100;
         if(desc.indexOf('[ELGIN]') != -1) return 100;
         if(desc.indexOf('[TrafficCast]') != -1) return 101;
         if(desc.indexOf('[TM]') != -1) return 102;
         if(desc.indexOf('[Caltrans]') != -1) return 103;
         if(desc.indexOf('[TfL Open Data]') != -1) return 104;
         if(provider.indexOf('London TFL Closures') != -1) return 104;
      }
   }
   if(markerType == "ur")
   {
      return uroCheckCommentsForTag(idSrc, customText);
   }

   return -1;
}

function uroGetLanes(disposition)
{
   var retval = '';
   if(disposition == 1) retval += 'All lanes';
   else if(disposition == 2) retval += 'Left lane';
   else if(disposition == 3) retval += 'Middle lane';
   else if(disposition == 4) retval += 'Right lane';
   else retval += ' - ';
   return retval;
}

function uroGetLaneType(laneType)
{
   var retval = '';
   if(laneType === null) retval += ' - ';
   else
   {
      if(laneType == 1) retval += 'HOV';
      else if(laneType == 2) retval += 'HOT';
      else if(laneType == 3) retval += 'Express';
      else if(laneType == 4) retval += 'Bus lane';
      else if(laneType == 5) retval += 'Fast lane';
      else retval += ' - ';
   }
   return retval;
}

var uroVehicleTypes =
[
   [1280, 'fa-car'],
   [1024, 'fa-motorcycle'],
   [272,  'fa-taxi']
];
function uroGetRestrictionVehicleTypes(restObj, allowInit, profileKey)
{
   var i;
   var j;
   var k;
   var tVT;
   var retval = [];
   for(i = 0; i < uroVehicleTypes.length; ++i)
   {
      retval.push(allowInit);
   }
   var tRest = restObj._driveProfiles.get(profileKey);
   if(tRest !== undefined)
   {
      for(i = 0; i < tRest._driveProfiles.length; ++i)
      {
         tVT = tRest._driveProfiles[i].getVehicleTypes();
         {
            if(tVT.length > 0)
            {
               for(j = 0; j < tVT.length; ++j)
               {
                  for(k = 0; k < uroVehicleTypes.length; ++k)
                  {
                     if(tVT[j] == uroVehicleTypes[k][0])
                     {
                        retval[k] = !allowInit;
                     }
                  }
               }
            }
         }
      }
   }
   return retval;
}

function uroFormatRestriction(restObj)
{
   var retval = '<tr>';

   if(restObj._defaultType == "DIFFICULT")
   {
      retval += '<td colspan=13>Difficult Turn';
   }
   else
   {
      var roDays = null;
      var roFromDate = null;
      var roToDate = null;
      var roFromTime = null;
      var roToTime = null;
      if(restObj._days !== undefined)
      {
         roDays = restObj._days;
         roFromDate = restObj._fromDate;
         roToDate = restObj._toDate;
         roFromTime = restObj._fromTime;
         roToTime = restObj._toTime;
      }
      else if(restObj._timeFrames.length > 0)
      {
         if(restObj._timeFrames[0]._weekdays !== undefined)
         {
            roDays = restObj._timeFrames[0]._weekdays;
            roFromDate = restObj._timeFrames[0]._startDate;
            roToDate = restObj._timeFrames[0]._endDate;
            roFromTime = restObj._timeFrames[0]._fromTime;
            roToTime = restObj._timeFrames[0]._toTime;
         }
      }

      if(roDays === null)
      {
         roDays = 127;
      }

      retval += '<td style="text-align:center;">';
      if((roDays & 1) == 1) retval += 'M';
      else retval += '-';
      retval += '</td><td style="text-align:center;">';
      if((roDays & 2) == 2) retval += 'Tu';
      else retval += '-';
      retval += '</td><td style="text-align:center;">';
      if((roDays & 4) == 4) retval += 'W';
      else retval += '-';
      retval += '</td><td style="text-align:center;">';
      if((roDays & 8) == 8) retval += 'Th';
      else retval += '-';
      retval += '</td><td style="text-align:center;">';
      if((roDays & 16) == 16) retval += 'F';
      else retval += '-';
      retval += '</td><td style="text-align:center;">';
      if((roDays & 32) == 32) retval += 'Sa';
      else retval += '-';
      retval += '</td><td style="text-align:center;">';
      if((roDays & 64) == 64) retval += 'Su';
      else retval += '-';

      retval += '</td><td style="text-align:center;">';

      if(roFromDate === null) retval += 'All dates';
      else retval += roFromDate+' to '+roToDate;

      retval += '</td><td style="text-align:center;">';

      if((restObj._allDay === true) || ((roFromTime === null) && (roToTime === null))) retval += 'All day';
      else retval += roFromTime+' to '+roToTime;

      retval += '</td><td style="text-align:center;">';

      retval += uroGetLanes(restObj._disposition);

      retval += '</td><td style="text-align:center;">';

      retval += uroGetLaneType(restObj._laneType);

      retval += '</td><td style="text-align:center;">';

      // for brevity, the popup only displays the allowed/prohibited restriction for the three driveable vehicle types in the app...
      var typesAllowed = [];
      if(restObj._defaultType == "BLOCKED")
      {
         typesAllowed = uroGetRestrictionVehicleTypes(restObj, false, "FREE");
      }
      else
      {
         typesAllowed = uroGetRestrictionVehicleTypes(restObj, true, "BLOCKED");
      }

      var i;
      for(i = 0; i < uroVehicleTypes.length; ++i)
      {
         if(typesAllowed[i] === true)
         {
            retval += '<i class="fa '+uroVehicleTypes[i][1]+'" style="color:#000000;"> </i>&nbsp;';
         }
         else
         {
            retval += '<i class="fa '+uroVehicleTypes[i][1]+'" style="color:#d0d0d0;"> </i>&nbsp;';
         }
      }

      retval += '</td><td>';
      retval += uroClickify(restObj._description, '');
   }

   retval += '</td></tr>';

   return retval;
}

function uroHidePopup(caller)
{
   if(uroPopupShown)
   {
      uroDiv.style.visibility = 'hidden';
      uroPopupShown = false;
      uroPopupTimer = -2;
      uroShownFID = -1;
   }
   uroPopupSuppressed = false;
}
function uroSuppressPopup()
{
   uroDiv.style.visibility = 'hidden';
   window.getSelection().removeAllRanges();
   uroPopupSuppressed = true;
}

function uroOpenURDialog(urID)
{
   var t = {showNext: false, nextButtonString: I18n.lookup('problems.panel.done')};
   var urObj = W.model.mapUpdateRequests.objects[urID];
   W.reqres.request("problems:browse", _.extend(t, {problem: urObj}));
}
function uroRecentreSessionOnUR()
{
   //W.map.updateRequestLayer.markers[uroShownFID].icon.imageDiv.click();
   uroOpenURDialog(uroShownFID);
   W.map.moveTo(W.map.updateRequestLayer.markers[uroShownFID].lonlat, 5);
   uroHidePopup('uroRecentreSessionOnUR');
   return false;
}
function uroRecentreSessionOnMP()
{
   W.map.problemLayer.markers[uroShownFID].icon.imageDiv.click();
   W.map.moveTo(W.map.problemLayer.markers[uroShownFID].lonlat, 5);
   uroHidePopup('uroRecentreSessionOnMP');
   return false;
}
function uroRecentreSessionOnPUR()
{
   W.map.placeUpdatesLayer.markers[uroShownFID].icon.imageDiv.click();
   W.map.moveTo(W.map.placeUpdatesLayer.markers[uroShownFID].lonlat, 5);
   uroHidePopup('uroRecentreSessionOnPUR');
   return false;
}
function uroRecentreSessionOnPPUR()
{
   W.map.parkingPlaceUpdatesLayer.markers[uroShownFID].icon.imageDiv.click();
   W.map.moveTo(W.map.parkingPlaceUpdatesLayer.markers[uroShownFID].lonlat, 5);
   uroHidePopup('uroRecentreSessionOnPPUR');
   return false;
}
function uroRecentreSessionOnVenueNavPoint()
{
   W.map.moveTo(uroGetVenueNavPoint(uroShownFID), 5);
   uroHidePopup('uroRecentreSessionOnVenueNavPoint');
   return false;
}

function uroGetDateTimeString(ts)
{
   var tDateObj = new Date(ts);
   var dateLocale;
   var timeLocale;
   if(uroGetCBChecked('_cbDateFmtDDMMYY')) dateLocale = 'en-gb';
   if(uroGetCBChecked('_cbDateFmtMMDDYY')) dateLocale = 'en-us';
   if(uroGetCBChecked('_cbDateFmtYYMMDD')) dateLocale = 'ja';
   if(uroGetCBChecked('_cbTimeFmt24H')) timeLocale = 'en-gb';
   if(uroGetCBChecked('_cbTimeFmt12H')) timeLocale = 'en-us';
   return tDateObj.toLocaleDateString(dateLocale) + ' ' + tDateObj.toLocaleTimeString(timeLocale);
}
function uroParsePxString(pxString)
{
   return parseInt(pxString.split("px")[0]);
}

function uroStackListObj(fid,x,y)
{
   this.fid = fid;
   this.x = uroTypeCast(x);
   this.y = uroTypeCast(y);
}
function uroRestackMarkers()
{
   if(uroStackList.length === 0) return;
   var markerCollection = null;
   if(uroStackType == 1) markerCollection = W.map.updateRequestLayer.markers;
   else if(uroStackType == 2) markerCollection = W.map.problemLayer.markers;
   else if(uroStackType == 3) markerCollection = W.map.placeUpdatesLayer.markers;
   else if(uroStackType == 4) markerCollection = W.map.parkingPlaceUpdatesLayer.markers;
   else if(uroStackType == 5) markerCollection = W.map.residentialPlaceUpdatesLayer.markers;

   if(markerCollection !== null)
   {
      uroAddLog('restacking markers...');
      // strip off the .realX/realY attributes from any UR object we've previously added it to, to allow
      // the native recentering to work again...
      for(var marker in markerCollection)
      {
         if(markerCollection.hasOwnProperty(marker))
         {
            var testMarkerObj = markerCollection[marker];
            if(testMarkerObj.model.attributes.geometry.realX != null)
            {
               testMarkerObj.model.attributes.geometry.x = testMarkerObj.model.attributes.geometry.realX;
               testMarkerObj.model.attributes.geometry.y = testMarkerObj.model.attributes.geometry.realY;
               delete(testMarkerObj.model.attributes.geometry.realX);
               delete(testMarkerObj.model.attributes.geometry.realY);
            }
         }
      }
      // now restack any markers that were repositioned...
      for(var idx=0; idx<uroStackList.length; idx++)
      {
         var orig_x = uroStackList[idx].x + 'px';
         var orig_y = uroStackList[idx].y + 'px';
         var fid = uroStackList[idx].fid;

         if(markerCollection[fid] != null)
         {
            markerCollection[fid].icon.imageDiv.style.left = orig_x;
            markerCollection[fid].icon.imageDiv.style.top = orig_y;
         }
      }
      uroStackList = [];
      uroUnstackedMasterID = null;
      uroStackType = null;
   }
}
function uroIsIDAlreadyUnstacked(idSrc)
{
   if(uroStackList.length === 0) return false;
   for(var idx=0; idx<uroStackList.length; idx++)
   {
      if(uroStackList[idx].fid == idSrc) return true;
   }
   return false;
}
function uroCheckStacking(stackType, masterID, unstackedX, unstackedY)
{
   if(uroIsIDAlreadyUnstacked(masterID) === true) return;
   if(uroStackType !== null) return;
   if(uroPopupDwellTimer > 0) return;

   uroAddLog('checking for marker stack, masterID: '+masterID+', stackType: '+stackType);
   var stackList = [];
   stackList.push(masterID);
   var threshSquared = uroGetElmValue('_inputUnstackSensitivity');
   threshSquared *= threshSquared;

   var markerCollection = null;
   var marker;

   if(stackType == 1) markerCollection = W.map.updateRequestLayer.markers;
   else if(stackType == 2) markerCollection = W.map.problemLayer.markers;
   else if(stackType == 3) markerCollection = W.map.placeUpdatesLayer.markers;
   else if(stackType == 4) markerCollection = W.map.parkingPlaceUpdatesLayer.markers;
   else if(stackType == 5) markerCollection = W.map.residentialPlaceUpdatesLayer.markers;

   var offset = 1000000000;
   if(markerCollection !== null)
   {
      for(marker in markerCollection)
      {
         if(markerCollection.hasOwnProperty(marker))
         {
            var testMarkerObj = markerCollection[marker];
            var includeInStack = (testMarkerObj.icon.imageDiv.style.visibility != 'hidden');
            var suppressClosed = (testMarkerObj.icon.imageDiv.classList.contains("recently-closed") & (W.map.updateRequestLayer.showHidden === false));

            // if multiple markers are stacked exactly on top of one another, WME will always open up the one which it would have rendered on the
            // top of the stack in the absence of any URO+ filtering, regardless of which UR pin actually receives the click event.  To prevent
            // this, we give each pin in the stack a unique set of false coordinates, storing the original coordinates in newly created
            // properties so they can be restored later on
            //
            // originally this fix changed the x coordinate for each UR in the stack to be a unique value that ought to have been well out of the range
            // of any real coordinate and therefore unable to clash with any UR marker coordinates that weren't in the current stack.  However it now
            // appears this could then cause WME to think a completely different UR was being opened - possibly as a result of some change in coordinate
            // handling allowing out of range values to be wrapped around back into the normal range?  As a workaround for this new WME behaviour, both the
            // x and y coordinates are now set to valid values somewhere in the North Atlantic Ocean - the likelihood of there being any real URs in this
            // area is so vanishingly small as to be not worth worrying about...


            if(testMarkerObj.model.attributes.geometry.realX === undefined)
            {
               testMarkerObj.model.attributes.geometry.realX = testMarkerObj.model.attributes.geometry.x;
               testMarkerObj.model.attributes.geometry.x += offset;
               testMarkerObj.model.attributes.geometry.realY = testMarkerObj.model.attributes.geometry.y;
               testMarkerObj.model.attributes.geometry.y += offset;
               offset += 1000;
            }


            if((includeInStack) && (!suppressClosed))
            {
               if(testMarkerObj.id != masterID)
               {
                  var xdiff = unstackedX - uroParsePxString(markerCollection[testMarkerObj.id].icon.imageDiv.style.left);
                  var ydiff = unstackedY - uroParsePxString(markerCollection[testMarkerObj.id].icon.imageDiv.style.top);
                  var distSquared = ((xdiff * xdiff) + (ydiff * ydiff));
                  if(distSquared < threshSquared)
                  {
                     stackList.push(testMarkerObj.id);
                  }
               }
            }
         }
      }
   }

   // as it's the fiddling with .geometry.x which seems to inhibit the autocentering behaviour when a UR/MP marker is clicked, we need to
   // allow this to occur even if unstacking isn't required at this zoom level.  To then reenable recentering when clicking on the crosshairs
   // or feed entry, we need to reinstate the correct .x value once the marker is no longer being highlighted, which means we pretty much need
   // to do all of the unstacking *except* for actually unstacking the stack and hiding the other markers...
   var inhibitUnstacking = (W.map.getZoom() < uroGetElmValue('_inputUnstackZoomLevel'));
   // also inhibit unstacking if there's only a single marker in the list - this will be true if we're highlighting an isolated marker that
   // doesn't need to be unstacked, and where we're only using the .geometry.x fiddle to prevent autocentering...
   inhibitUnstacking = (inhibitUnstacking || (stackList.length == 1));

   uroStackType = stackType;

   if(stackList.length > 0)
   {
      if(inhibitUnstacking) uroAddLog('single marker highlighted, adjusting geometry properties to prevent recentering...');
      else uroAddLog(stackList.length+' markers are stacked!');
      if(uroUnstackedMasterID != masterID)
      {
         uroAddLog('unstacked ID mismatch, relocating markers...');
         uroRestackMarkers();
         uroUnstackedMasterID = masterID;
         uroStackList = [];

         // push the highlighted marker onto the stacklist so uroIsIDAlreadyUnstacked() will return true
         uroStackList.push(new uroStackListObj(masterID,unstackedX,unstackedY));

         for(var shoveIdx=0; shoveIdx < stackList.length; shoveIdx++)
         {
            var fid = stackList[shoveIdx];
            var x = uroParsePxString(markerCollection[fid].icon.imageDiv.style.left);
            var y = uroParsePxString(markerCollection[fid].icon.imageDiv.style.top);
            // store the unstacked marker positions so they can be reinstated later
            uroStackList.push(new uroStackListObj(fid,x,y));
            if(!inhibitUnstacking)
            {
               markerCollection[fid].icon.imageDiv.style.left = unstackedX + 'px';
               markerCollection[fid].icon.imageDiv.style.top = unstackedY + 'px';
               unstackedX += 10;
               unstackedY -= 30;
            }
         }


         if(!inhibitUnstacking)
         {
            // hide other markers to prevent confusion with the unstacked markers
            for(marker in markerCollection)
            {
               if(markerCollection.hasOwnProperty(marker))
               {
                  var toHideID = markerCollection[marker].id;
                  if(uroIsIDAlreadyUnstacked(toHideID) === false)
                  {
                     markerCollection[toHideID].icon.imageDiv.style.visibility = 'hidden';
                  }
               }
            }
         }
      }
   }
   else
   {
      uroRestackMarkers();
   }
}

function uroGetVenueNavPoint(uroFID)
{
   var retval = W.map.getCenter();   // allow the function to return a safe value in case we can't find the requested venue object...

   var vObj = W.model.venues.objects[uroFID];
   if(vObj !== undefined)
   {
      var tPoint;
      if(vObj.attributes.entryExitPoints.length > 0)
      {
         // if the venue has any navpoints defined, use the position of the first one
         tPoint = vObj.attributes.entryExitPoints[0].getPoint();
      }
      else
      {
         // otherwise use the centrepoint of the venue point or polygon
         tPoint = vObj.attributes.geometry.getCentroid();
      }
      retval.lon = tPoint.x;
      retval.lat = tPoint.y;
   }
   return retval;
}

function uroOpenNewTab()
{
   // flush the current settings into localStorage before the new tab opens, so that when its instance of
   // URO+ fires up it'll have the same settings as this one
   uroSaveSettings();
   return true;
}

function uroEditTBR()
{
   if(uroTBRObj === null)
   {
      return;
   }
   uroTBRObj.getElementsByClassName('waze-icon-clock')[0].click();
   return false;
}

function uroKillCentering()
{
   return W.map.getExtent();
}
function uroRestoreCentering()
{
   if(uroAutoCentreDisabledOn.length > 0)
   {
      var acType = uroAutoCentreDisabledOn[0];
      var acID = uroAutoCentreDisabledOn[1];

      if(acType == 'PUR')
      {
         if(W.map.placeUpdatesLayer.markers[acID] != null)
         {
            if(W.map.placeUpdatesLayer.markers[acID].model.geometry.origGetBounds !== undefined)
            {
               W.map.placeUpdatesLayer.markers[acID].model.geometry.getBounds = W.map.placeUpdatesLayer.markers[acID].model.geometry.origGetBounds;
            }
         }
      }
      else if(acType == 'PPUR')
      {
         if(W.map.parkingPlaceUpdatesLayer.markers[acID] != null)
         {
            if(W.map.parkingPlaceUpdatesLayer.markers[acID].model.geometry.origGetBounds !== undefined)
            {
               W.map.parkingPlaceUpdatesLayer.markers[acID].model.geometry.getBounds = W.map.parkingPlaceUpdatesLayer.markers[acID].model.geometry.origGetBounds;
            }
         }
      }
      else if(acType == 'RPUR')
      {
         if(W.map.residentialPlaceUpdatesLayer.markers[acID] != null)
         {
            if(W.map.residentialPlaceUpdatesLayer.markers[acID].model.geometry.origGetBounds !== undefined)
            {
               W.map.residentialPlaceUpdatesLayer.markers[acID].model.geometry.getBounds = W.map.residentialPlaceUpdatesLayer.markers[acID].model.geometry.origGetBounds;
            }
         }
      }
      else if(acType == 'MP')
      {
         if(W.map.problemLayer.markers[acID] != null)
         {
            if(W.map.problemLayer.markers[acID].model.origGetDisconnectBounds !== undefined)
            {
               W.map.problemLayer.markers[acID].model.getDisconnectBounds = W.map.problemLayer.markers[acID].model.origGetDisconnectBounds;
            }   
         }
      }
      uroAutoCentreDisabledOn = [];
   }
}

function uroAddClosureRowToTable(rcObj)
{
   var result = '';

   if(rcObj.active === true)
   {
      result += '<tr>';
   }
   else
   {
      result += '<tr bgcolor="#C0C0C0">';
   }

   var startDate = rcObj.startDate;
   var endDate = "unknown";
   if(rcObj.endDate !== null)
   {
      endDate = rcObj.endDate;
   }
   var provider = "---";
   if(rcObj.provider !== null)
   {
      provider = rcObj.provider;
   }
   else if(rcObj.createdBy !== null)
   {
      provider = uroGetUserNameAndRank(rcObj.createdBy);
   }
   var reason = "---";
   if(rcObj.reason !== null)
   {
      reason = rcObj.reason;
   }
   var mte = "---";
   if(rcObj.eventId !== null)
   {
      try
      {
         mte = W.model.majorTrafficEvents.objects[rcObj.eventId].attributes.names[0].value;
      }
      catch(err)
      {
      }
   }

   result += '<td>' + startDate + ' to ' + endDate + '</td>';
   result += '<td>' + provider + '</td>';
   result += '<td>' + reason + '</td>';
   result += '<td>' + mte + '</td>';
   result += '</td></tr>';
   return result;
}


function uroGetAddress(streetID, houseNumber, formatForSegmentPopup, formatForNodePopup)
{
   var result = '';
   if((houseNumber !== undefined) && (houseNumber !== null))
   {
      result += houseNumber + ' ';
   }

   if(streetID != null)
   {
      var streetName = I18n.lookup('edit.address.no_street');
      var doesStreetIDExist = true;
      if(W.model.streets.objects[streetID] === undefined)
      {
         streetName = 'non-existent streetID';
         doesStreetIDExist = false;
      }
      else
      {
         if((streetName !== null) && (W.model.streets.objects[streetID].isEmpty === false))
         {
            streetName = W.model.streets.objects[streetID].name;
         }
      }
      if(formatForSegmentPopup === true)
      {
         result += '<b>'+streetName+'</b><br>';
      }
      else
      {
         result += streetName + ', ';
      }

      if(doesStreetIDExist === true)
      {
         var cityName = I18n.lookup('edit.address.no_city');
         var doesCityIDExist = true;
         var cityID = W.model.streets.objects[streetID].cityID;
         if(W.model.cities.objects[cityID] === undefined)
         {
            cityName = 'non-existent cityID';
            doesCityIDExist = false;
         }
         else
         {
            if(W.model.cities.objects[cityID].attributes.name !== "")
            {
               cityName = W.model.cities.objects[cityID].attributes.name;
            }
         }
         result += cityName + ', ';

         if(doesCityIDExist === true)
         {
            var stateID = W.model.cities.objects[cityID].attributes.stateID;
            if(W.model.states.objects[stateID] === undefined)
            {
               result += 'non-existent stateID';
            }
            else
            {
               result += W.model.states.objects[stateID].name;
            }
         }
      }
   }
   result += '<br>';

   return result;
}


function uroNewLookHighlightedItemsCheck(e)
{
   var result = '';
   var rw;
   var rh;
   var objHasIgnoreLink = false;
   var objHasDeleteLink = false;
   var objHasAddWatchLink = false;
   var objHasRemoveWatchLink = false;
   var objHasUpdateWatchLink = false;
   var objHasRecentreSessionLink = false;
   var objHasOpenInNewTabLink = false;
   var objHasCloneLink = false;
   var isVenue = false;
   var isMapComment = false;
   var newPopupType = null;
   var ureq = null;
   var idx;
   var hovered = false;
   var targetTab = '';
   var unstackedX;
   var unstackedY;
   var ureqID = null;
   var isUR = false;
   var isProblem = false;
   var isTurnProb = false;
   var isPlaceUpdate = false;
   var mouseX;
   var mouseY;
   var uroDaysResolved;
   var renderIntent;
   var deltaX;
   var deltaY;
   var userLock;

   // function preamble...
   {
      if(uroMTEMode) return;
      if(!uroInitialised) return;

      if(e == 'dwellTimeout')
      {
      }
      else
      {
         if((uroMouseIsDown) && (e.buttons === 0))
         {
            uroAddLog('trapped erroneous mousedown state');
            uroMouseIsDown = false;
         }
      }
      if(uroMouseIsDown)
      {
         return;
      }

      if(OL === null)
      {
         if(uroNullOpenLayers === false)
         {
            uroAddLog('caught null OL');
            uroNullOpenLayers = true;
         }
         return;
      }
      uroNullOpenLayers = false;

      if(W.map.updateRequestLayer === null)
      {
         if(uroNullURLayer === false)
         {
            uroAddLog('caught null UR layer');
            uroNullURLayer = true;
         }
         return;
      }
      uroNullURLayer = false;

      if(W.map.problemLayer === null)
      {
         if(uroNullProblemLayer === false)
         {
            uroAddLog('caught null problem layer');
            uroNullProblemLayer = true;
         }
         return;
      }
      uroNullProblemLayer = false;

      if(uroGetCBChecked('_cbMasterEnable') === false)
      {
         return;
      }

      if(e == 'dwellTimeout')
      {
         mouseX = uroPrevMouseX;
         mouseY = uroPrevMouseY;
         deltaX = 0;
         deltaY = 0;

         if(uroPointerWithinMap === false)
         {
            return;
         }
      }
      else
      {
         if(uroTestPointerOutsideMap(e.clientX, e.clientY))
         {
            return;
         }

         mouseX = e.pageX - document.getElementById('map').getBoundingClientRect().left;
         mouseY = e.pageY - document.getElementById('map').getBoundingClientRect().top;

         var maxJitter = uroGetElmValue('_inputMaxJitter');
         if((Math.abs(uroPrevMouseX - mouseX) > maxJitter) || (Math.abs(uroPrevMouseY - mouseY) > maxJitter))
         {
            uroPopupDwellTimer = uroGetElmValue('_inputPopupDwellTimeout');
         }
         deltaX = mouseX - uroPrevMouseX;
         deltaY = mouseY - uroPrevMouseY;
         uroPrevMouseX = mouseX;
         uroPrevMouseY = mouseY;
      }
   }
   uroWazeBits();

   var mouseLonLat = W.map.getLonLatFromViewPortPx(new OL.Pixel(mouseX,mouseY));
   var mousePoint = new OL.Geometry.Point(mouseLonLat.lon, mouseLonLat.lat);
   if(uroMousedOverMapComment !== null)
   {
      if(W.model.mapComments.objects[uroMousedOverMapComment] === undefined)
      {
         uroAddLog('clearing uroMousedOverMapComment: object no longer exists in current map view');
         uroMousedOverMapComment = null;
      }
      else if(W.model.mapComments.objects[uroMousedOverMapComment].attributes.geometry.containsPoint(mousePoint) === false)
      {
         uroAddLog('clearing uroMousedOverMapComment: pointer no longer within comment boundary');
         uroMousedOverMapComment = null;
      }
   }

   var popupXOffset = uroParsePxString(window.getComputedStyle(document.getElementById('sidebar')).getPropertyValue("width"));
   var popupYOffset = $(document.getElementById("WazeMap")).offset().top;
   var uroPopupX = mouseX + popupXOffset + 10;
   var uroPopupY = mouseY + popupYOffset;

   // popup for segment restrictions
   if((uroMousedOverMarkerType === null) && (uroGetCBChecked('_cbInhibitSegPopup') === false))
   {
      for(var slIdx=0; slIdx < W.map.segmentLayer.features.length; slIdx++)
      {
         if(W.map.segmentLayer.features[slIdx].renderIntent == 'highlight')
         {
            if(W.map.getExtent().intersectsBounds(W.map.segmentLayer.features[slIdx].geometry.getBounds()))
            {
               var doPopUp = false;
               var segObj;
               var restObj;

               if(uroMousedOverMapComment !== null)
               {
                  uroAddLog('setting uroMousedOverOtherObjectWithinMapComment for segment highlight');
                  uroMousedOverOtherObjectWithinMapComment = true;
               }

               segObj = W.map.segmentLayer.features[slIdx].model;
               var streetID = segObj.attributes.primaryStreetID;
               if(streetID !== null)
               {

                  // generic segment data
                  if(uroGetCBChecked('_cbInhibitSegGenericPopup') === false)
                  {
                     doPopUp = true;
                     uroAddLog('building popup for segment '+streetID);

                     result += uroGetAddress(streetID, null, true, false);
                     result += '<b>ID: </b>'+segObj.attributes.id+'<br>';

                     var autoLock = segObj.attributes.rank;
                     userLock = segObj.attributes.lockRank;
                     result += '<b>Lock: </b>';
                     if(userLock !== null)
                     {
                        result += 'M' + (userLock+1) + ' / ';
                     }
                     result += 'A' + (autoLock+1) + '<br>';

                     var fwdSpeed = segObj.attributes.fwdMaxSpeed;
                     var revSpeed = segObj.attributes.revMaxSpeed;
                     var fwdUnverified = segObj.attributes.fwdMaxSpeedUnverified;
                     var revUnverified = segObj.attributes.revMaxSpeedUnverified;
                     var fwdASC = ((segObj.attributes.fwdFlags & 1) === 1);
                     var revASC = ((segObj.attributes.revFlags & 1) === 1);
                     var roadType = segObj.attributes.roadType;
                     var verifyLimits = true;
                     if((roadType === 17) || (roadType === 20))
                     {
                        verifyLimits = false;
                     }
                     if(segObj.attributes.fwdDirection)
                     {
                        result += '<b>A-B speed: </b>'+uroGetLocalisedSpeedString(fwdSpeed, verifyLimits);
                        if(fwdUnverified) result += ' (unverified)';
                        if(fwdASC) result += ' ASC zone';
                        result += '<br>';
                     }
                     if(segObj.attributes.revDirection)
                     {
                        result += '<b>B-A speed: </b>'+uroGetLocalisedSpeedString(revSpeed, verifyLimits);
                        if(revUnverified) result += ' (unverified)';
                        if(revASC) result += ' ASC zone';
                        result += '<br>';
                     }
                     if((segObj.attributes.fwdDirection) && (segObj.attributes.revDirection) && (fwdSpeed != revSpeed) && (!fwdUnverified) && (!revUnverified))
                     {
                        result += 'Two-way segment has different verified speed limits...<br>';
                     }
                  }

                  // segment restrictions
                  result += '<table cellpadding=4 border=1">';
                  if(segObj.attributes.restrictions.length > 0)
                  {
                     doPopUp = true;
                     var fwdResult = '<tr><td colspan=13><b>A-B restrictions:</b></td></tr>';
                     var revResult = '<tr><td colspan=13><b>B-A restrictions:</b></td></tr>';
                     var bothResult = '<tr><td colspan=13><b>Two-way restrictions:</b></td></tr>';

                     var nABRestrictions = 0;
                     var nBARestrictions = 0;
                     var nBothRestrictions = 0;
                     for(idx = 0; idx < segObj.attributes.restrictions.length; idx++)
                     {
                        restObj = segObj.attributes.restrictions[idx];
                        if(restObj._direction === "FWD")
                        {
                           nABRestrictions++;
                           fwdResult += uroFormatRestriction(restObj);
                        }
                        else if(restObj._direction === "REV")
                        {
                           nBARestrictions++;
                           revResult += uroFormatRestriction(restObj);
                        }
                        else if(restObj._direction === "BOTH")
                        {
                           nBothRestrictions++;
                           bothResult += uroFormatRestriction(restObj);
                        }
                        else
                        {
                           uroAddLog("unknown restriction direction...");
                        }
                     }
                     if(nABRestrictions > 0)
                     {
                        result += fwdResult;
                     }
                     if(nBARestrictions > 0)
                     {
                        result += revResult;
                     }
                     if(nBothRestrictions > 0)
                     {
                        result += bothResult;
                     }
                  }

                  result += '</table>';
                  if(W.map.closuresMarkerLayer.getVisibility() === true)
                  {
                     result += '<table cellpadding=4 border=1" width="100%">';
                     if(segObj.attributes.hasClosures === true)
                     {
                        var hasFwd = false;
                        var hasRev = false;
                        var rcObj;
                        var roadClosure;

                        for(roadClosure in W.model.roadClosures.objects)
                        {
                           if(W.model.roadClosures.objects.hasOwnProperty(roadClosure))
                           {
                              rcObj = W.model.roadClosures.objects[roadClosure];
                              if(rcObj.segID == segObj.attributes.id)
                              {
                                 if(rcObj.forward === true)
                                 {
                                    if(hasFwd === false)
                                    {
                                       result += '<tr><td colspan=4><b>A-B closures:</b></td></tr>';
                                       hasFwd = true;
                                    }
                                    result += uroAddClosureRowToTable(rcObj);
                                 }
                                 else
                                 {
                                    hasRev = true;
                                 }
                              }
                           }
                        }
                        if(hasRev === true)
                        {
                           result += '<tr><td colspan=4><b>B-A closures:</b></td></tr>';
                           for(roadClosure in W.model.roadClosures.objects)
                           {
                              if(W.model.roadClosures.objects.hasOwnProperty(roadClosure))
                              {
                                 rcObj = W.model.roadClosures.objects[roadClosure];
                                 if(rcObj.segID == segObj.attributes.id)
                                 {
                                    if(rcObj.forward === false)
                                    {
                                       result += uroAddClosureRowToTable(rcObj);
                                    }
                                 }
                              }
                           }
                        }
                        if((hasFwd === true) || (hasRev === true))
                        {
                           doPopUp = true;
                        }
                     }
                     result += '</table>';
                  }

                  if(doPopUp === true)
                  {
                     uroFID = segObj.attributes.id;
                     newPopupType = 'segment_restriction';
                  }
               }

               break;
            }
            else
            {
               uroAddLog('segment '+uroFID+' has renderIntent==highlight but is offscreen... blocking popup');
            }
         }
      }
   }
   // popup for landmarks
   if((uroMousedOverMarkerType === null) && (newPopupType === null) && (uroGetCBChecked('_cbInhibitLandmarkPopup') === false))
   {
      uroPlaceSelected = false;

      var venueObj = null;
      renderIntent = null;
      var navpointPos=new OL.LonLat();

      for(var llFeatureIdx=0; llFeatureIdx < W.map.landmarkLayer.features.length; llFeatureIdx++)
      {
         if(W.map.landmarkLayer.features[llFeatureIdx] !== undefined)
         {
            renderIntent = W.map.landmarkLayer.features[llFeatureIdx].renderIntent;
            if(renderIntent == 'highlight')
            {
               if(W.map.getExtent().intersectsBounds(W.map.landmarkLayer.features[llFeatureIdx].geometry.getBounds()))
               {
                  if(uroMousedOverMapComment !== null)
                  {
                     uroAddLog('setting uroMousedOverOtherObjectWithinMapComment for place highlight');
                     uroMousedOverOtherObjectWithinMapComment = true;
                  }

                  venueObj = W.map.landmarkLayer.features[llFeatureIdx].model;
                  if(newPopupType === null)
                  {
                     uroFID = venueObj.attributes.id;
                     uroAddLog('building popup for place '+uroFID);

                     navpointPos = uroGetVenueNavPoint(uroFID);
                     navpointPos.transform(new OL.Projection("EPSG:900913"),new OL.Projection("EPSG:4326"));
                     result += '<b>';
                     if(venueObj.attributes.name === '')
                     {
                        if(venueObj.attributes.residential === true) result += '<i>Residential</i>';
                        else result += '<i>Unnamed</i>';
                     }
                     else result += uroClickify(venueObj.attributes.name, '');
                     if(venueObj.attributes.externalProviderIDs.length > 0)
                     {
                        result += ' <i>(linked)</i>';
                     }
                     if(venueObj.attributes.adLocked)
                     {
                        result += ' <i>(AdLocked)</i>';
                     }
                     result += '</b><br>';
                     if(venueObj.attributes.brand !== null)
                     {
                        result += '<i>Brand: ' + venueObj.attributes.brand + '</i><br>';
                     }
                     var vDesc = venueObj.attributes.description;
                     if(vDesc !== '')
                     {
                        result += '"<i>' + uroClickify(vDesc, '') + '</i>"<br>';
                     }

                     userLock = venueObj.attributes.lockRank;
                     result += '<b>Lock: </b>' + (userLock+1);

                     result += '<hr>';
                     result += uroGetAddress(venueObj.attributes.streetID, venueObj.attributes.houseNumber, false, false);
                     result += '<ul>';
                     for(idx = 0; idx < venueObj.attributes.categories.length; idx++)
                     {
                        result += '<li>' + I18n.lookup("venues.categories." + venueObj.attributes.categories[idx]);
                     }
                     result += '</ul>';
                     if(venueObj.attributes.residential === true)
                     {
                        if(venueObj.geometry.CLASS_NAME.indexOf('Geometry.Point') !== -1)
                        {
                           result += '<a href="#" id="_cloneRP">Clone place</a>';
                           objHasCloneLink = true;
                        }
                     }
                     var npLink = document.location.href;
                     var npLayers = '';
                     npLink = npLink.substr(0,npLink.indexOf('?zoom'));
                     npLink += '?zoom=5&lat='+navpointPos.lat+'&lon='+navpointPos.lon+npLayers;

                     targetTab = "_uroTab_" + Math.round(Math.random()*1000000);
                     result += '<hr>Jump to nav point: <a href="'+npLink+'" id="_openInNewTab" target="'+targetTab+'">in new tab</a> - ';
                     objHasOpenInNewTabLink = true;
                     result += '<a href="#" id="_recentreSession">in this tab</a>';
                     objHasRecentreSessionLink = true;

                     newPopupType = 'venue';
                     isVenue = true;
                     break;
                  }
                  else
                  {
                     var otherID = venueObj.attributes.id;
                     uroAddLog('venue '+otherID+' is also highlighted');
                  }
               }
               else
               {
                  uroAddLog('landmark '+uroFID+' has renderIntent==highlight but is offscreen... blocking popup');
               }
            }
            else if((renderIntent == 'select') || (renderIntent == 'highlightselected'))
            {
               uroPlaceSelected = true;
            }
         }
      }
   }

   // popup for map comments
   if((uroMousedOverMarkerType === null) && (newPopupType === null) && (uroGetCBChecked('_cbInhibitMapCommentPopup') === false))
   {
      if (uroMCLayer.featureType !== 'mapComment')
      {
         uroWazeBits();
      }
      if(uroMCLayer !== null)
      {
         uroMCSelected = false;

         var mcObj = null;
         renderIntent = null;

         for(var mcFeatureIdx=0; mcFeatureIdx < uroMCLayer.features.length; mcFeatureIdx++)
         {
            renderIntent = uroMCLayer.features[mcFeatureIdx].renderIntent;
            if(renderIntent == 'highlight')
            {
               if(W.map.getExtent().intersectsBounds(uroMCLayer.features[mcFeatureIdx].geometry.getBounds()))
               {
                  mcObj = uroMCLayer.features[mcFeatureIdx].model;
                  if(mcObj !== undefined)
                  {
                     if(newPopupType === null)
                     {
                        if((uroMousedOverMapComment === mcObj.attributes.id) && (uroMousedOverOtherObjectWithinMapComment === true))
                        {
                           uroAddLog('inhibit popup for map comment '+uroMousedOverMapComment);
                        }
                        else
                        {
                           uroMousedOverOtherObjectWithinMapComment = false;
                           if(mcObj.attributes.geometry.id.indexOf('Polygon') !== -1)
                           {
                              // only capture ID for area comments...
                              uroMousedOverMapComment = mcObj.attributes.id;
                           }
                           uroFID = mcObj.attributes.id;
                           uroAddLog('building popup for map comment '+uroFID);

                           result += '<b>';
                           if(mcObj.attributes.subject === '')
                           {
                              result += '<i>No subject</i>';
                           }
                           else result += uroClickify(mcObj.attributes.subject, '');
                           result += '</b><br>';
                           result += uroClickify(mcObj.attributes.body, '<br>');

                           var mcDaysOld = uroGetMCAge(mcObj,0,false);
                           var mcSubmittedTS = uroGetMCAge(mcObj,0,true);
                           if(mcSubmittedTS != -1)
                           {
                              mcSubmittedTS = uroGetDateTimeString(mcSubmittedTS);
                           }
                           if(mcDaysOld != -1)
                           {
                              result += '<i>Submitted ' + uroParseDaysAgo(mcDaysOld) + ' ';
                              if(mcSubmittedTS != -1) result += '(' + mcSubmittedTS + ') ';
                              if(mcObj.attributes.createdBy != null)
                              {
                                 result += ' by '+uroGetUserNameAndRank(mcObj.attributes.createdBy);
                              }
                              result += '</i><br>';
                           }
                           mcDaysOld = uroGetMCAge(mcObj,1,false);
                           mcSubmittedTS = uroGetMCAge(mcObj,1,true);
                           if(mcSubmittedTS != -1)
                           {
                              mcSubmittedTS = uroGetDateTimeString(mcSubmittedTS);
                           }
                           if(mcDaysOld != -1)
                           {
                              result += '<i>Updated ' + uroParseDaysAgo(mcDaysOld) + ' ';
                              if(mcSubmittedTS != -1) result += '(' + mcSubmittedTS + ') ';
                              if(mcObj.attributes.createdBy != null)
                              {
                                 result += ' by '+uroGetUserNameAndRank(mcObj.attributes.updatedBy);
                              }
                              result += '</i><br>';
                           }

                           mcDaysOld = uroGetMCAge(mcObj,2,false);
                           mcSubmittedTS = uroGetMCAge(mcObj,2,true);
                           if(mcDaysOld != -1)
                           {
                              result += '<i>Expires ' + uroParseDaysToGo(mcDaysOld) + ' ';
                              result += '(' + uroGetDateTimeString(mcSubmittedTS) +')</i><br>';
                           }

                           var mcHasMyComments = false;
                           var mcNComments = mcObj.attributes.conversation.length;
                           if(mcNComments > 0)
                           {
                              for(var i=0; i<mcNComments; i++)
                              {
                                 if(mcObj.attributes.conversation[i].userID == uroUserID)
                                 {
                                    mcHasMyComments = true;
                                    break;
                                 }
                              }
                           }
                           result += '<br>' + mcNComments +' comment';
                           if(mcNComments != 1) result += 's';
                           if((mcHasMyComments === false) && (mcNComments > 0)) result += ' (none by me)';

                           newPopupType = 'map_comment';
                           isMapComment = true;
                           break;
                        }
                     }
                     else
                     {
                        var mcOtherID = mcObj.attributes.id;
                        uroAddLog('map comment '+mcOtherID+' is also highlighted');
                     }
                  }
               }
               else
               {
                  uroAddLog('map comment '+uroFID+' has renderIntent==highlight but is offscreen... blocking popup');
               }
            }
            else if((renderIntent == 'select') || (renderIntent == 'highlightselected'))
            {
               uroMCSelected = true;
            }
         }
      }
   }

   // look for URs, place updates and problems
   if(newPopupType === null)
   {
      if((uroMousedOverMarkerType == 'ur') && (newPopupType === null))
      {
         unstackedX = uroParsePxString(W.map.updateRequestLayer.markers[uroMousedOverMarkerID].icon.imageDiv.style.left);
         unstackedY = uroParsePxString(W.map.updateRequestLayer.markers[uroMousedOverMarkerID].icon.imageDiv.style.top);
         // check for stacking...
         if(uroShownFID != uroMousedOverMarkerID)
         {
            uroCheckStacking(1,uroMousedOverMarkerID, unstackedX, unstackedY);
         }
         hovered = true;

         if(uroGetCBChecked('_cbInhibitURPopup') === false)
         {
            if(uroMousedOverMapComment !== null)
            {
               uroAddLog('setting uroMousedOverOtherObjectWithinMapComment for UR highlight');
               uroMousedOverOtherObjectWithinMapComment = true;
            }

            isUR = true;
            newPopupType = uroMousedOverMarkerType;
            ureq = W.model.mapUpdateRequests.objects[uroMousedOverMarkerID];

            // override popup base position
            uroPopupX = unstackedX - uroParsePxString(W.map.segmentLayer.div.style.left) + popupXOffset + 6;
            uroPopupY = unstackedY -  uroParsePxString(W.map.segmentLayer.div.style.top) + 6;

            uroFID = uroMousedOverMarkerID;

            uroAddLog('building popup for UR '+uroMousedOverMarkerID);
            result = '<b>Update Request ('+uroMousedOverMarkerID+'): ' + I18n.lookup("update_requests.types." + ureq.attributes.type) + '</b><br>';

            result += uroClickify(ureq.attributes.description, '<br>');
            var uroDaysOld = uroGetURAge(ureq,0,false);
            var uroSubmittedTS = uroGetURAge(ureq,0,true);
            if(uroSubmittedTS != -1)
            {
               uroSubmittedTS = uroGetDateTimeString(uroSubmittedTS);
            }
            if(uroDaysOld != -1)
            {
               result += '<i>Submitted ' + uroParseDaysAgo(uroDaysOld) + ' ';
               if(uroSubmittedTS != -1) result += '(' + uroSubmittedTS + ') ';
               if(ureq.attributes.guestUserName != null)
               {
                  result += 'via Livemap';
                  if(ureq.attributes.guestUserName !== '')
                  {
                     result += ' by '+ureq.attributes.guestUserName.replace(/<\/?[^>]+(>|$)/g, "");
                  }
               }
               result += '</i>';
            }
            if(ureq.attributes.resolvedOn !== null)
            {
               uroDaysResolved = uroGetURAge(ureq,1,false);
               var uroResolvedTS = uroGetURAge(ureq,1,true);
               if(uroResolvedTS != -1)
               {
                  uroResolvedTS = uroGetDateTimeString(uroResolvedTS);
               }

               if(uroDaysResolved != -1)
               {
                  result += '<br><i>Closed ' + uroParseDaysAgo(uroDaysResolved) + ' ';
                  if(uroResolvedTS != -1) result += '(' + uroResolvedTS + ')</i>';

                  result += '<br><i>Marked as ';
                  if(ureq.attributes.resolution === 0) result += 'solved';
                  else if(ureq.attributes.resolution == 1) result += 'not identified';
                  else result += 'unknown';
                  if(ureq.attributes.resolvedBy !== null)
                  {
                     result += ' by '+uroGetUserNameAndRank(ureq.attributes.resolvedBy);
                  }
                  result += '</i>';
               }
            }

            if(W.model.updateRequestSessions.objects[uroMousedOverMarkerID] != null)
            {
               var hasMyComments = uroURHasMyComments(uroMousedOverMarkerID);
               var nComments = W.model.updateRequestSessions.objects[uroMousedOverMarkerID].comments.length;
               result += '<br>' + nComments + ' comment';
               if(nComments != 1) result += 's';
               if((hasMyComments === false) && (nComments > 0)) result += ' (none by me)';
               if(nComments > 0)
               {
                  var commentDaysOld = uroGetCommentAge(W.model.updateRequestSessions.objects[uroMousedOverMarkerID].comments[nComments-1]);
                  if(commentDaysOld != -1)
                  {
                     result += ', last update '+uroParseDaysAgo(commentDaysOld);
                  }
               }
            }
         }
      }

      if(((uroMousedOverMarkerType == 'pur') || (uroMousedOverMarkerType == 'ppur') || (uroMousedOverMarkerType == 'rpur')) && (newPopupType === null))
      {

         if(uroMousedOverMarkerType == 'pur')
         {
            ureq = W.map.placeUpdatesLayer.markers[uroMousedOverMarkerID].model;
            unstackedX = uroParsePxString(W.map.placeUpdatesLayer.markers[uroMousedOverMarkerID].icon.imageDiv.style.left);
            unstackedY = uroParsePxString(W.map.placeUpdatesLayer.markers[uroMousedOverMarkerID].icon.imageDiv.style.top);
         }
         else if(uroMousedOverMarkerType == 'rpur')
         {
            ureq = W.map.residentialPlaceUpdatesLayer.markers[uroMousedOverMarkerID].model;
            unstackedX = uroParsePxString(W.map.residentialPlaceUpdatesLayer.markers[uroMousedOverMarkerID].icon.imageDiv.style.left);
            unstackedY = uroParsePxString(W.map.residentialPlaceUpdatesLayer.markers[uroMousedOverMarkerID].icon.imageDiv.style.top);
         }
         else
         {
            ureq = W.map.parkingPlaceUpdatesLayer.markers[uroMousedOverMarkerID].model;
            unstackedX = uroParsePxString(W.map.parkingPlaceUpdatesLayer.markers[uroMousedOverMarkerID].icon.imageDiv.style.left);
            unstackedY = uroParsePxString(W.map.parkingPlaceUpdatesLayer.markers[uroMousedOverMarkerID].icon.imageDiv.style.top);
         }
         if(uroShownFID != uroMousedOverMarkerID)
         {
            // check for stacking...
            if(uroMousedOverMarkerType == 'pur')
            {
               uroCheckStacking(3,uroMousedOverMarkerID, unstackedX, unstackedY);
            }
            else if(uroMousedOverMarkerType == 'rpur')
            {
               uroCheckStacking(5,uroMousedOverMarkerID, unstackedX, unstackedY);
            }
            else
            {
               uroCheckStacking(4,uroMousedOverMarkerID, unstackedX, unstackedY);
            }
         }
         hovered = true;

         if(uroGetCBChecked('_cbInhibitPUPopup') === false)
         {
            newPopupType = uroMousedOverMarkerType;
            if(uroMousedOverMapComment !== null)
            {
               uroAddLog('setting uroMousedOverOtherObjectWithinMapComment for PUR highlight');
               uroMousedOverOtherObjectWithinMapComment = true;
            }

            isPlaceUpdate = true;

            // override popup base position
            uroPopupX = unstackedX + popupXOffset + 6;
            uroPopupY = unstackedY + 6;
            uroPopupX -= uroParsePxString(W.map.segmentLayer.div.style.left);
            uroPopupY -= uroParsePxString(W.map.segmentLayer.div.style.top);

            uroFID = uroMousedOverMarkerID;

            // to inhibit auto-centering only when the PUR marker is clicked, we wait for the marker to get highlighted, then
            // make a copy of the original getBounds() function before replacing it with a call to W.map.getExtent().  Clicking
            // the marker causes a call to getBounds() which will then return the current map extent, and thus no change in the
            // map view will occur...
            uroRestoreCentering();
            if(uroMousedOverMarkerType == 'pur')
            {
               W.map.placeUpdatesLayer.markers[uroMousedOverMarkerID].model.geometry.origGetBounds = W.map.placeUpdatesLayer.markers[uroMousedOverMarkerID].model.geometry.getBounds;
               W.map.placeUpdatesLayer.markers[uroMousedOverMarkerID].model.geometry.getBounds = uroKillCentering;
               uroAutoCentreDisabledOn.push('PUR', uroMousedOverMarkerID);
            }
            else if(uroMousedOverMarkerType == 'rpur')
            {
               W.map.residentialPlaceUpdatesLayer.markers[uroMousedOverMarkerID].model.geometry.origGetBounds = W.map.residentialPlaceUpdatesLayer.markers[uroMousedOverMarkerID].model.geometry.getBounds;
               W.map.residentialPlaceUpdatesLayer.markers[uroMousedOverMarkerID].model.geometry.getBounds = uroKillCentering;
               uroAutoCentreDisabledOn.push('RPUR', uroMousedOverMarkerID);
            }
            else
            {
               W.map.parkingPlaceUpdatesLayer.markers[uroMousedOverMarkerID].model.geometry.origGetBounds = W.map.parkingPlaceUpdatesLayer.markers[uroMousedOverMarkerID].model.geometry.getBounds;
               W.map.parkingPlaceUpdatesLayer.markers[uroMousedOverMarkerID].model.geometry.getBounds = uroKillCentering;
               uroAutoCentreDisabledOn.push('PPUR', uroMousedOverMarkerID);
            }

            if(uroMousedOverMarkerType == 'pur')
            {
               uroAddLog('building popup for placeUpdate '+uroMousedOverMarkerID);
            }
            else if(uroMousedOverMarkerType == 'rpur')
            {
               uroAddLog('building popup for residentialPlaceUpdate '+uroMousedOverMarkerID);
            }
            else
            {
               uroAddLog('building popup for parkingPlaceUpdate '+uroMousedOverMarkerID);
            }

            result = '<b>';
            if(ureq.attributes.name === '') result += 'Unnamed landmark';
            else result += ureq.attributes.name;
            result += '</b><br>';

            result += '<ul>';
            for(idx = 0; idx < ureq.attributes.categories.length; idx++)
            {
               result += '<li>' + I18n.lookup("venues.categories." + ureq.attributes.categories[idx]);
            }
            result += '</ul>';

            if(ureq.attributes.residential === true)
            {
               result += '<i>Residential</i>';
            }

            var daysOld = uroGetPURAge(ureq);
            if(daysOld != -1)
            {
               result += '<br><i>Submitted '+uroParseDaysAgo(daysOld)+'</i>';
            }
         }
      }

      if((uroMousedOverMarkerType == 'mp') && (newPopupType === null))
      {
         unstackedX = uroParsePxString(W.map.problemLayer.markers[uroMousedOverMarkerID].icon.imageDiv.style.left);
         unstackedY = uroParsePxString(W.map.problemLayer.markers[uroMousedOverMarkerID].icon.imageDiv.style.top);
         // check for stacking...
         if(uroShownFID != uroMousedOverMarkerID)
         {
            uroCheckStacking(2,uroMousedOverMarkerID, unstackedX, unstackedY);
         }
         hovered = true;

         if(uroGetCBChecked('_cbInhibitMPPopup') === false)
         {
            if(uroMousedOverMapComment !== null)
            {
               uroAddLog('setting uroMousedOverOtherObjectWithinMapComment for MP highlight');
               uroMousedOverOtherObjectWithinMapComment = true;
            }

            isProblem = true;
            newPopupType = uroMousedOverMarkerType;
            ureq = W.model.problems.objects[uroMousedOverMarkerID];
            if(ureq === undefined)
            {
               if(uroDOMHasTurnProblems)
               {
                  ureq = W.model.turnProblems.objects[uroMousedOverMarkerID];
                  if(ureq != null) isTurnProb = true;
               }
            }

            // override popup base position
            uroPopupX = unstackedX + popupXOffset + 6;
            uroPopupY = unstackedY + 6;
            uroPopupX -= uroParsePxString(W.map.segmentLayer.div.style.left);
            uroPopupY -= uroParsePxString(W.map.segmentLayer.div.style.top);

            uroFID = uroMousedOverMarkerID;
            // same method of disabling the on-click auto-centre behaviour as for PURs above...
            uroRestoreCentering();
            W.map.problemLayer.markers[uroMousedOverMarkerID].model.origGetDisconnectBounds = W.map.problemLayer.markers[uroMousedOverMarkerID].model.getDisconnectBounds;
            W.map.problemLayer.markers[uroMousedOverMarkerID].model.getDisconnectBounds = uroKillCentering;
            uroAutoCentreDisabledOn.push('MP', uroMousedOverMarkerID);

            uroAddLog('building popup for problem '+uroMousedOverMarkerID);
            if(isTurnProb) result = '<b>Turn Problem ('+uroMousedOverMarkerID+'): ' + I18n.lookup("problems.types.turn.title");
            else
            {
               result = '<b>Map Problem ('+uroMousedOverMarkerID+'): ';

               var problemType = null;
               if(uroDOMHasTurnProblems)
               {
                  problemType = ureq.attributes.problemType;
               }
               else
               {
                  problemType = ureq.attributes.subType;
               }

               if(problemType == 300)
               {
                  result += I18n.lookup("problems.panel.closure.title");
               }
               else
               {
                  if(I18n.lookup("problems.types." + problemType) === undefined) result += 'Unknown problem type ('+problemType+')';
                  else result += I18n.lookup("problems.types." + problemType + ".title");
               }
            }
            result += '</b><br>';
            if(ureq.attributes.description != null)
            {
               result += 'Description: ' + ureq.attributes.description + '<br>';
            }
            if(ureq.attributes.extraInfo != null)
            {
               result += 'ExtraInfo: ' + uroClickify(ureq.attributes.extraInfo, '<br>');
            }
            if(ureq.attributes.provider != null)
            {
               result += 'Provider: ' + ureq.attributes.provider + '<br>';
            }
            if(ureq.attributes.resolvedOn != null)
            {
               uroDaysResolved = uroGetURAge(ureq,1,false);
               if(uroDaysResolved != -1)
               {
                  result += '<br><i>Closed ' + uroParseDaysAgo(uroDaysResolved) + ' ';
                  if(ureq.attributes.resolvedBy != null)
                  {
                     result += ' by '+uroGetUserNameAndRank(ureq.attributes.resolvedBy);
                  }

                  if((ureq.attributes.open === true) && (ureq.attributes.resolvedOn != null))
                  {
                     result += '<br>Reopened by Waze';
                  }
                  result += '</i>';
               }
            }
         }
      }

      if(hovered === false)
      {
         uroFID = -1;
         if(uroStackType !== null)
         {
            var tStackType = uroStackType;
            uroRestackMarkers();
            if(tStackType == 1) uroFilterURs();
            else if(tStackType == 2) uroFilterProblems();
            else if(tStackType == 3) uroFilterPlaces();
         }
      }
      else if(newPopupType !== null)
      {
         // add "open new WME tab" link
         var urPos=new OL.LonLat();
         if(isPlaceUpdate)
         {
            urPos=ureq.geometry.bounds.centerLonLat.clone();
         }
         else
         {
            if(ureq.geometry.realX === undefined)
            {
               urPos.lon = ureq.geometry.x;
               urPos.lat = ureq.geometry.y;
            }
            else
            {
               urPos.lon = ureq.geometry.realX;
               urPos.lat = ureq.geometry.realY;
            }
         }
         urPos.transform(new OL.Projection("EPSG:900913"),new OL.Projection("EPSG:4326"));
         var urLink = document.location.href;
         var urLayers = '';
         urLink = urLink.substr(0,urLink.indexOf('?zoom'));
         urLink += '?zoom=5&lat='+urPos.lat+'&lon='+urPos.lon+urLayers;

         if(isUR) urLink += '&mapUpdateRequest='+uroMousedOverMarkerID;
         else if(isTurnProb) urLink += '&showturn='+uroMousedOverMarkerID+'&endshow';
         else if(isProblem) urLink += '&mapProblem='+uroMousedOverMarkerID;
         else if(isPlaceUpdate)
         {
            if(uroMousedOverMarkerType == 'pur')
            {
               urLink += '&showpur='+uroMousedOverMarkerID+'&endshow';
            }
            else
            {
               urLink += '&showppur='+uroMousedOverMarkerID+'&endshow';
            }
         }

         targetTab = "_uroTab_" + Math.round(Math.random()*1000000);
         result += '<hr><ul><li><a href="'+urLink+'" id="_openInNewTab" target="'+targetTab+'">Open in new tab</a> - ';
         objHasOpenInNewTabLink = true;
         result += '<a href="#" id="_recentreSession">centre in current tab</a>';
         objHasRecentreSessionLink = true;

         // add "open new livemap tab" link
         var lmLink = null;
         if(document.getElementById("livemap-link") != null)
         {
            uroAddLog('Livemap link in livemap-link id element');
            lmLink = document.getElementById("livemap-link").href;
         }
         else if(document.getElementsByClassName("livemap-link") != null)
         {
            uroAddLog('Livemap link in livemap-link class element');
            lmLink = document.getElementsByClassName("livemap-link")[0].href;
         }
         else
         {
            uroAddLog('Livemap link not found...');
         }
         if(lmLink !== null)
         {
            var zpos = lmLink.indexOf('?');
            if(zpos > -1) lmLink = lmLink.substr(0,zpos);
            lmLink += '?zoom=17&lat='+urPos.lat+'&lon='+urPos.lon+'&layers=BTTTT';
            result += '<li><a href="'+lmLink+'" target="_lmTab">Open in new livemap tab</a>';
         }
         if(!isPlaceUpdate)
         {
            // add "ignore for this session" link
            result += '<li><a href="#" id="_addtoignore">Hide for this session</a></ul>';
            objHasIgnoreLink = true;
         }
      }
   }

   if((newPopupType != 'mp') && (newPopupType != 'pur') && (newPopupType != 'ppur') && (newPopupType != 'rpur'))
   {
      uroRestoreCentering();
   }

   // look for nodes
   if((newPopupType === null) && (uroGetCBChecked('_cbInhibitNodesPopup') === false))
   {
      if(uroMousedOverMarkerType == 'node')
      {
         ureq = W.model.nodes.objects[uroMousedOverMarkerID];
         ureqID = uroMousedOverMarkerID;

         if(uroMousedOverMapComment !== null)
         {
            uroAddLog('setting uroMousedOverOtherObjectWithinMapComment for node highlight');
            uroMousedOverOtherObjectWithinMapComment = true;
         }
         uroPopupY += 40;
         newPopupType = 'node';
         uroFID = ureqID;
         uroAddLog('building popup for node '+uroFID);
         result += '<b>Node: ' + uroFID + '</b><br>';
         for(var j=0; j<ureq.attributes.segIDs.length; j++)
         {
            var segID = ureq.attributes.segIDs[j];
            var nodeStreetID = W.model.segments.objects[segID].attributes.primaryStreetID;
            result += uroGetAddress(nodeStreetID, null, false, true);
         }
      }
   }

   // look for cameras
   if((newPopupType === null) && (uroGetCBChecked('_cbInhibitCamPopup') === false))
   {
      if(uroMousedOverMarkerType == 'cam')
      {
         ureq = W.model.cameras.objects[uroMousedOverMarkerID];
         ureqID = uroMousedOverMarkerID;

         // test isSelected() so that we only do overview data on cameras that are being hovered over
         if(ureq.isSelected() === false)
         {
            if(uroMousedOverMapComment !== null)
            {
               uroAddLog('setting uroMousedOverOtherObjectWithinMapComment for camera highlight');
               uroMousedOverOtherObjectWithinMapComment = true;
            }
            uroPopupY -= 20;
            newPopupType = 'camera';
            uroFID = ureqID;
            uroAddLog('building popup for camera '+uroFID);
            if(I18n.lookup("edit.camera.fields.type") === undefined)
            {
               result += '<b>Camera: ' + ureq.TYPES[ureq.attributes.type] + '</b>';
            }
            else
            {
               result += '<b>Camera: ' + I18n.lookup("edit.camera.fields.type." + ureq.attributes.type) + '</b>';
            }
            result += '<br>';
            result += 'ID: '+uroFID+'<br>';
            result += 'Created by ';
            var userID;

            if(W.model.users.getByIds([ureq.attributes.createdBy])[0] != null)
            {
               userID = ureq.attributes.createdBy;
               result += uroGetUserNameAndRank(userID);
            }
            else result += 'unknown';
            result += ', ';
            var camAge = uroGetCameraAge(ureq,1);
            if(camAge != -1)
            {
               result += uroParseDaysAgo(camAge);
            }
            else result += 'unknown days ago';
            result += '<br>Updated by ';
            if(W.model.users.getByIds([ureq.attributes.updatedBy])[0] != null)
            {
               userID = ureq.attributes.updatedBy;
               result += uroGetUserNameAndRank(userID);
            }
            else result += 'unknown';
            result += ', ';
            camAge = uroGetCameraAge(ureq,0);
            if(camAge != -1)
            {
               result += uroParseDaysAgo(camAge);
            }
            else result += 'unknown days ago';
            result += '<br>Speed data: ';
            result += uroGetLocalisedSpeedString(ureq.attributes.speed, true);
            result += '<hr><ul>';
            if(uroIsCamOnWatchList(uroFID) != -1)
            {
               result += '<li><a href="#" id="_updatewatchlist">Update watchlist entry</a>';
               result += '<li><a href="#" id="_removefromwatchlist">Remove from watchlist</a>';
               objHasUpdateWatchLink = true;
               objHasRemoveWatchLink = true;
            }
            else
            {
               result += '<li><a href="#" id="_addtowatchlist">Add to watchlist</a>';
               objHasAddWatchLink = true;
            }
            if(ureq.attributes.permissions !== 0)
            {
               result += '<li><a href="#" id="_deleteobject">Delete Camera</a>';
               objHasDeleteLink = true;
            }
            result += '</ul>';
         }
      }
   }

   if((newPopupType !== null) && (uroPopupDwellTimer === 0) && (uroPopupSuppressed === false))
   {
      if((uroFID != uroShownFID) || (newPopupType != uroShownPopupType))
      {
         if(uroFID != uroShownFID) uroAddLog('FID mismatch, show popup: '+uroFID+'/'+uroShownFID);
         else uroAddLog('Popup type mismatch: '+newPopupType+'/'+uroShownPopupType);
         uroShownFID = uroFID;
         uroShownPopupType = newPopupType;
         uroPopupShown = false;
      }
      if(uroPopupShown === false)
      {
         uroAddLog('display popup at '+uroPopupX+','+uroPopupY);
         uroPopupShown = true;
         uroDiv.style.height = "auto";
         uroDiv.style.width = "auto";
         uroDiv.innerHTML = result;

         if((uroFID != -1) && (objHasIgnoreLink === true))
         {
            uroAddEventListener('_addtoignore','click', uroAddToIgnoreList, true);
         }
         if(objHasDeleteLink === true)
         {
            uroAddEventListener('_deleteobject','click', uroDeleteObject, true);
         }
         if(objHasRemoveWatchLink === true)
         {
            uroAddEventListener('_removefromwatchlist','click', uroRemoveCamFromWatchList, true);
         }
         if(objHasAddWatchLink === true)
         {
            uroAddEventListener('_addtowatchlist','click', uroAddCamToWatchList, true);
         }
         if(objHasUpdateWatchLink === true)
         {
            uroAddEventListener('_updatewatchlist','click', uroUpdateCamWatchList, true);
         }
         if(objHasOpenInNewTabLink === true)
         {
            uroAddEventListener('_openInNewTab','mouseup', uroOpenNewTab, true);
         }
         if(objHasRecentreSessionLink === true)
         {
            if(isUR) uroAddEventListener('_recentreSession', 'click', uroRecentreSessionOnUR, true);
            else if((isProblem)||(isTurnProb)) uroAddEventListener('_recentreSession', 'click', uroRecentreSessionOnMP, true);
            else if(isPlaceUpdate)
            {
               if(newPopupType == 'pur')
               {
                  uroAddEventListener('_recentreSession', 'click', uroRecentreSessionOnPUR, true);
               }
               else
               {
                  uroAddEventListener('_recentreSession', 'click', uroRecentreSessionOnPPUR, true);
               }
            }
            else if(isVenue) uroAddEventListener('_recentreSession', 'click', uroRecentreSessionOnVenueNavPoint, true);
         }
         if(objHasCloneLink === true)
         {
            uroAddEventListener('_cloneRP', 'click', uroCloneResidentialPlace, true);
         }


         if(newPopupType == 'turn_restriction')
         {
            uroAddEventListener('_editTBR','click', uroEditTBR, true);
         }


         // restrict the popup width to be no wider than just under half the window width to avoid it
         // completely overlapping the marker it's associated with - by keeping it to just below half
         // the window width we guarantee that it'll fit either to the left or the right of the marker
         // no matter how far across the screen the marker is located...
         rw = parseInt(uroDiv.clientWidth);
         if(rw > (window.innerWidth * 0.45))
         {
            rw = (window.innerWidth * 0.45);
            uroDiv.style.width = rw+'px';
            uroAddLog('restricted popup width to 45% of window width...');
         }
         // get the div height after any adjustment of the width above, to account for whatever content
         // reflow may have occurred as a result of reducing the width...
         rh = parseInt(uroDiv.clientHeight);

         var origPopupX = uroPopupX;
         var movedLeft = false;
         if((uroPopupX + rw) > window.innerWidth)
         {
            // where the popup would be off the right hand side of the screen, move it completely over to the
            // other side of the mouse pointer
            uroPopupX -= (rw + 20);
            if(uroPopupX < 0) uroPopupX = 0;
            movedLeft = true;
            uroAddLog('popup would fall off RHS of screen, reposition to other side of mouse pointer...');
         }
         if((uroPopupY + rh) > window.innerHeight)
         {
            // where the popup would be off the bottom of the screen, shift it up just far enough to be
            // fully visible
            uroPopupY -= (((uroPopupY + rh) - window.innerHeight) + 30);
            uroAddLog('popup would fall off bottom of screen, shift up to keep it all visible...');
         }
         if(uroPopupY < 0) uroPopupY = 0;
         uroDiv.style.top = uroPopupY+'px';
         uroDiv.style.left = uroPopupX+'px';

         if(movedLeft === true)
         {
            // after relocating the popup to the left of the pointer, it may end up resizing itself
            // which may then cause it to completely overlap the UR marker, so perform one more check
            // of the div width and nudge to the left if required...
            rw = parseInt(uroDiv.clientWidth);
            var nudgeDist = parseInt(20 + (uroPopupX + rw) - origPopupX);
            if((uroPopupX + rw + 30) >= origPopupX)
            {
               uroDiv.style.left = parseInt(uroPopupX - nudgeDist)+'px';
            }
         }

         uroDiv.style.visibility = 'visible';
         uroPopupAutoHideTimer = (uroGetElmValue('_inputPopupAutoHideTimeout') * 10);
      }
      uroPopupTimer = -1;
   }
   else if((newPopupType === null) && (uroPopupDwellTimer !== 0) && (uroPopupShown === true))
   {
      uroHidePopup('uroNewLookHighlightedItemsCheck');
   }
   else
   {
      if((uroPopupTimer == -1) && (uroFID != uroShownFID))
      {
         uroPopupTimer = uroGetElmValue('_inputPopupEntryTimeout');
      }
   }
}

function uroExclusiveCB()
{
   var cbChecked = uroGetCBChecked(this.id);

   if(cbChecked === true)
   {
      var pairedList = this.attributes.pairedWith.value.split(',');
      for(var i=0; i<pairedList.length; i++)
      {
         uroSetCBChecked(pairedList[i], false);
      }
   }
}

function uroGetAMs(e)
{
   if(uroMTEMode) return;
   if(!uroFilterPreamble) return;
   if(!uroInitialised) return;

   var amList = '';
   var tName = '';
   if(W.map.managedAreasLayer.getVisibility() === true)
   {
      var mouseX = e.pageX - document.getElementById('map').getBoundingClientRect().left;
      var mouseY = e.pageY - document.getElementById('map').getBoundingClientRect().top;
      var mousePixel = W.map.getLonLatFromPixel(new OL.Pixel(mouseX, mouseY));
      var mousePoint = new OL.Geometry.Point(mousePixel.lon, mousePixel.lat);
      var linkColour = '#c0c0ff';
      if (uroGetCBChecked('_cbMoveAMList') === false)
      {
         linkColour = '#800000';
      }

      for(var amObj in W.model.managedAreas.objects)
      {
         if(W.model.managedAreas.objects[amObj].geometry.containsPoint(mousePoint))
         {
            if(amList !== '') amList += ', ';

            tName = uroGetUserNameAndRank(W.model.managedAreas.objects[amObj].userID);
            if(tName.indexOf('a href') !== -1)
            {
               tName = tName.replace('a href', 'a style="color:'+linkColour+';" href');
            }
            amList += tName;
         }
      }
      if(amList === '')
      {
         amList = 'none';
      }
      amList = "&nbsp;<b>Area Managers:</b> "+amList;
   }
   document.getElementById("uroAMList").innerHTML = amList;
}

function uroMouseDown()
{
   uroMouseIsDown = true;
}
function uroMouseUp()
{
   uroMouseIsDown = false;
}
function uroTestPointerOutsideMap(mX, mY)
{
   var mapElm = document.getElementById("map");
   if(mapElm === undefined) return;
   var bLeft = mapElm.parentElement.offsetLeft;
   var bRight = (bLeft + mapElm.offsetWidth);
   var bTop = (mapElm.parentElement.offsetTop + document.getElementById("topbar-container").clientHeight);
   var bBottom = (mapElm.parentElement.offsetTop + mapElm.offsetHeight + document.getElementById("topbar-container").clientHeight - document.getElementsByClassName("WazeMapFooter")[0].clientHeight);

   if
   (
      (mX < bLeft) ||
      (mX > bRight) ||
      (mY < bTop) ||
      (mY > bBottom)
   )
   {
      uroPointerWithinMap = false;
      if(uroGetCBChecked('_cbKillInertialPanning') === true)
      {
         W.map.controls.find(control => control.dragPan).dragPan.panMapStart();
      }
      return true;
   }
   else
   {
      uroPointerWithinMap = true;
      return false;
   }
}
function uroMouseOut(e)
{
   if(uroTestPointerOutsideMap(e.clientX, e.clientY))
   {
      uroHidePopup('uroMouseOut');
   }
}

function uroUREvent_onObjectsChanged()
{
}
function uroUREvent_onObjectsAdded()
{
   if(uroGetCBChecked('_cbURResolverIDFilter') === true)
   {
      uroUpdateResolverList();
   }
   uroFilterURs();
}
function uroUREvent_onObjectsRemoved()
{
}

function uroGetSelectedURCommentCount()
{
   if(W.model.updateRequestSessions.objects[uroSelectedURID] != null)
   {
      var cachedCommentCount = W.model.updateRequestSessions.objects[uroSelectedURID].comments.length;
      uroAddLog(uroSelectedURID+':'+cachedCommentCount+' '+uroExpectedCommentCount);

      // if there aren't the same number of cached comments as there are comments in the UR dialog list, initiate
      // a refresh of the comment data...
      if(cachedCommentCount != uroExpectedCommentCount)
      {
         if(uroPendingCommentDataRefresh === true)
         {
            if(cachedCommentCount > 0)
            {
               uroCachedLastCommentID = W.model.updateRequestSessions.objects[uroSelectedURID].comments[cachedCommentCount-1].id;
            }
            else
            {
               uroCachedLastCommentID = null;
            }
            uroAddLog('updateRequestSessions refresh required for UR '+uroSelectedURID);
            if(uroCachedLastCommentID !== null)
            {
               uroAddLog('last comment ID for this UR is '+uroCachedLastCommentID);
            }
            else
            {
               uroAddLog('first comment for this UR, no previous comment to ID');
            }
            var idList = [];
            idList.push(uroSelectedURID);
            // need to delete the existing cache object first, as .get() is only capable of creating new objects,
            // it doesn't seem able to update an existing object with new data
            W.model.updateRequestSessions.remove(W.model.updateRequestSessions.objects[uroSelectedURID]);
            if(W.model.updateRequestSessions.getAsync === undefined)
            {
               W.model.updateRequestSessions.get(idList);
            }
            else
            {
               W.model.updateRequestSessions.getAsync(idList);
            }

            // the call to .get() initiates a XMLHttpRequest for the data, so we now need to switch modes - the
            // refresh process has started so we're no longer pending, but we are now waiting for the XMLHttpRequest
            // to return something...
            uroPendingCommentDataRefresh = false;
            uroWaitingCommentDataRefresh = true;
         }
         else
         {
            if(cachedCommentCount > 0)
            {
               var currentLastCommentID = W.model.updateRequestSessions.objects[uroSelectedURID].comments[cachedCommentCount-1].id;
               if(currentLastCommentID == uroCachedLastCommentID)
               {
                  // most recent comment loaded for this UR is the same one that was present at the start of this
                  // refresh process, so kick back into pending mode so we can retry the .get()...
                  uroAddLog('latest comment ID still the same, reverting to pending mode...');
                  uroPendingCommentDataRefresh = true;
               }
               else
               {
                  // something may have gone awry here - the most recent comment loaded for this UR doesn't have the
                  // same ID as the one present at the start of the refresh process, yet the comment counts still don't
                  // match up, which suggests either a comment got lost along the way or someone else has commented on
                  // the same UR at almost the same time.  To get out of the loop this would create, assume that a
                  // mismatch in the IDs means the .get() has completed successfully no matter what the new comment
                  // count is, and take this new count to be the count we were expecting all along...
                  uroAddLog('latest comment ID different, but expected count not correct...');
                  uroExpectedCommentCount = cachedCommentCount;
               }
            }
            else
            {
               uroAddLog('first comment on this UR not received yet, reverting to pending mode...');
               uroPendingCommentDataRefresh = true;
            }
         }

      }
      else
      {
         // if the WME session is loaded with a UR already selected, such that WME has opened the UR dialog as part
         // of the session startup process, adding new comments to the UR cause the cached data to be updated immediately.
         // This prevents URO+ from switching into waiting mode in the above block of code, so we have to instead do
         // it here by comparing the cached count against the expected count following the Send click event.
         if(cachedCommentCount >= uroExpectedCommentCount)
         {
            uroPendingCommentDataRefresh = false;
            uroWaitingCommentDataRefresh = true;
            uroExpectedCommentCount = null;
         }

         // once the cached data has been updated, refilter the URs so that the new comment count is taken into account
         // immediately for filtering and display purposes
         if(uroWaitingCommentDataRefresh === true)
         {
            uroWaitingCommentDataRefresh = false;
            uroFilterURs();
            uroAddLog('refresh complete');
         }
      }
   }
}

function uroAddedComment()
{
   // when the user clicks the Send button to submit a new UR comment, this event handler fires before the new comment is
   // posted to the server and thus also before the comment list gets updated in the UR dialog.  So we take the current
   // comment count and, if the new comment edit box isn't empty, increment it by 1 to get the expected count.  Then we
   // set the pending flag true to initiate a session refresh on the next 100ms tick
   uroExpectedCommentCount = W.map.panelRegion.currentView.conversationView.viewModel.attributes.commentCount;
   if(document.getElementsByClassName('new-comment-text')[0].value !== '')
   {
      uroExpectedCommentCount++;
      uroAddLog('new comment added to UR '+uroSelectedURID+', cache refresh required...');
      uroPendingCommentDataRefresh = true;
   }
   else
   {
      uroPendingCommentDataRefresh = false;
   }
}

function uroInhibitNextUpdateRequestButton(e)
{
   e.stopPropagation();

   var doClick = true;
   if(document.getElementsByClassName('form-control new-comment-text').length > 0)
   {
      if(document.getElementsByClassName('form-control new-comment-text')[0].textLength > 0)
      {
         uroShowAlertBox("fa-warning", "URO+ Warning", "Comment not sent, close report panel anyway?", true, "Yes", "No", uroCloseReportPanel, null);
		 // set doClick to false here, as uroCloseReportPanel will be called by the alert box handler if required...
		 doClick = false;
      }
   }
   // no alert box has been generated, so close the panel
   if(doClick)
   {
	   uroCloseReportPanel();
   }
}
function uroCloseReportPanel()
{
   document.getElementsByClassName('close-panel')[0].click();
}

function uroAddLZ(valueToPad, newLength)
{
   var padString = '';
   for(var i=0; i<newLength; i++)
   {
      padString += '0';
   }
   padString += valueToPad.toString();
   return padString.slice(-newLength);
}

function uroIncrementClosureDate(oldDate, incByDays)
{
   var dateBits = oldDate.split('-');
   var year = parseInt(dateBits[0]);
   var month = parseInt(dateBits[1])-1;
   var date = parseInt(dateBits[2])+1;
   var incrementedDate = new Date(year, month, date);
   return (uroAddLZ(incrementedDate.getFullYear(),4) + '-' + uroAddLZ(incrementedDate.getMonth()+1,2) + '-' + uroAddLZ(incrementedDate.getDate(),2));
}

function uroGetElementProperty(elmName, elmOffset, elmProperty)
{
   var retval = null;
   if(document.getElementsByName(elmName).length !== 0)
   {
      retval = document.getElementsByName(elmName)[elmOffset][elmProperty];
   }
   return retval;
}

// Residential Place Cloning
//{
   var uroCRPStreetID;
   var uroCRPHouseNumber;

   function uroCompleteRPClone()
   {
      // as with closure cloning, the place details edit form requires us to push the new value into the relevant
      // edit field and then generate a change event on that field, otherwise WME doesn't bother reading the value...

      // street name
      var streetObj = W.model.streets.getByIds([uroCRPStreetID])[0];
      if(streetObj !== undefined)
      {
         document.getElementsByClassName('street-name')[0].value = streetObj.name;
         document.getElementsByClassName('street-name')[0].dispatchEvent(new Event('change', { 'bubbles': true }));

         // city name
         var cityObj = W.model.cities.getByIds([streetObj.cityID])[0];
         if(cityObj !== undefined)
         {
            if(cityObj.attributes.isEmpty === true)
            {
               // The donor point place we create to take the cloned RPP properties may have been automatically given
               // a city name by WME, and thus the city name field will already be filled in and activated...  If our
               // RPP doesn't however have a city name, we need to deactivate the city name field again, so that WME
               // doesn't complain about the user trying to save the new RPP with an empty city name
               if(document.getElementsByClassName("empty-city")[0].checked === false)
               {
                  ////document.getElementsByClassName("empty-city")[0].click();
                  var snelm = document.getElementsByClassName('empty-city')[0];
                  snelm.checked = true;
                  snelm.dispatchEvent(new Event('change', { 'bubbles': true }));
               }
            }
            document.getElementsByClassName('city-name')[0].value = cityObj.attributes.name;
            document.getElementsByClassName('city-name')[0].dispatchEvent(new Event('change', { 'bubbles': true }));

            // county
            document.getElementsByClassName('state-id')[0].value = cityObj.attributes.stateID;
            document.getElementsByClassName('state-id')[0].dispatchEvent(new Event('change', { 'bubbles': true }));

            // country
            document.getElementsByClassName('country-id')[0].value = cityObj.attributes.countryID;
            document.getElementsByClassName('country-id')[0].dispatchEvent(new Event('change', { 'bubbles': true }));
         }
      }

      // house number
      document.getElementsByClassName('house-number')[0].value = uroCRPHouseNumber;
      document.getElementsByClassName('house-number')[0].dispatchEvent(new Event('change', { 'bubbles': true }));

      // now wait for the user to confirm everything and click Apply...
      setTimeout(uroFinaliseCloneRP, 100);
   }

   function uroFinaliseCloneRP()
   {
      if(document.getElementsByClassName('address-form')[0].style.display != 'none')
      {
         setTimeout(uroFinaliseCloneRP, 100);
         return;
      }
      // once the user has applied the address changes and closed the address edit panel, WME will then
      // allow the place to be converted to residential...
      document.getElementsByClassName("toggle-residential")[0].click();
   }

   function uroConvertToRP()
   {
      // panel isn't open yet, which means the user either hasn't clicked yet or WME is still processing the
      // placement of the venue, so wait a while and then check again...
      if(document.getElementById('edit-panel').getElementsByClassName('landmark').length === 0)
      {
         setTimeout(uroConvertToRP, 100);
         return;
      }

      // panel is open, so move to the next step of the cloning procedure by clicking on the address edit icon...
      document.getElementsByClassName('full-address-container')[0].children[0].click();

      // now click on the "none" checkbox for the street name edit field so we can enter the street name
      var snelm = document.getElementsByClassName('empty-street')[0];
      snelm.checked = false;
      snelm.dispatchEvent(new Event('change', { 'bubbles': true }));

      // WME automatically clears the checkbox associated with the city name edit field if we set the street
      // name to be one that has a city associated with it, which is nice :-)

      // the click event seems to take a while to execute, and if we call dispatchEvent on the edit field whilst
      // it's still tagged as disabled then it gets ignored, causing the value in that field to be dropped when
      // we apply the changes to the place.  Trying to programatically detect when the field has been activated
      // doesn't seem to be reliable, however a fixed delay of 1s seems to work nicely
      setTimeout(uroCompleteRPClone, 1000);
   }

   function uroCloneResidentialPlace()
   {
      // trying to clone a RPP when one is already selected causes the selected one to be changed back to
      // a non-residential, as uroConvertToRP() thinks the user has already clicked to place the new RPP...
      if(document.getElementById('edit-panel').getElementsByClassName('landmark').length === 0)
      {
         var venueObj = W.model.venues.objects[uroFID];
         if(venueObj !== undefined)
         {
            // copy address from highlighted residential place
            uroCRPHouseNumber = venueObj.attributes.houseNumber;
            uroCRPStreetID = venueObj.attributes.streetID;

            // generate a click event on the first new point venue entry in the venues menu in order to generate a
            // new point venue object that we can manipulate...
            document.getElementsByClassName('toolbar-group-venues')[0].getElementsByClassName("drawing-control main-control point")[0].click();

            // now wait for the user to click on the map to place the new point venue
            uroConvertToRP();
         }
      }
   }
//}

// Closure Cloning
//{
   var uroConfirmClosureDelete = true;
   var uroClosuresToDelete = 0;

   var uroCLocation;
   var uroCReason;
   var uroCEvent;
   var uroCDirection;
   var uroCHasStartDate;
   var uroCStartDate;
   var uroCStartTime;
   var uroCEndDate;
   var uroCEndTime;
   var uroCIgnoreTraffic;

   function uroCompleteClosureCloning()
   {
      if(document.getElementsByClassName('edit-closure').length === 0)
      {
         setTimeout(uroCompleteClosureCloning,100);
         return;
      }

      // need to generate a change event on each of the form fields, because WME appears to be silently populating some hidden
      // closure object with the details as they're entered manually, and if we just set the form values without then forcing
      // the change event as well then WME will end up using its default values instead of the ones we've so lovingly copied...

      if(uroCLocation !== null)
      {
         document.getElementsByName('closure_location')[0].value = uroCLocation;
         document.getElementsByName('closure_location')[0].dispatchEvent(new Event('change', {'bubbles':true}));
      }
      if(uroCReason !== null)
      {
         document.getElementsByName('closure_reason')[0].value = uroCReason;
         document.getElementsByName('closure_reason')[0].dispatchEvent(new Event('change', {'bubbles':true}));
      }
      if(uroCDirection !== null)
      {
         document.getElementsByName('closure_direction')[0].selectedIndex = uroCDirection;
         document.getElementsByName('closure_direction')[0].dispatchEvent(new Event('change', {'bubbles':true}));
      }
      if(uroCHasStartDate !== null)
      {
         document.getElementsByName('closure_hasStartDate')[0].checked = uroCHasStartDate;
         document.getElementsByName('closure_hasStartDate')[0].dispatchEvent(new Event('change', {'bubbles':true}));
      }
      if(uroCStartDate !== null)
      {
         document.getElementsByName('closure_startDate')[0].value = uroCStartDate;
         document.getElementsByName('closure_startDate')[0].dispatchEvent(new Event('change', {'bubbles':true}));
      }
      if(uroCStartTime !== null)
      {
         document.getElementsByName('closure_startTime')[0].value = uroCStartTime;
         document.getElementsByName('closure_startTime')[0].dispatchEvent(new Event('change', {'bubbles':true}));
      }

      if(uroCIgnoreTraffic !== null)
      {
         document.getElementsByName('closure_permanent')[0].checked = uroCIgnoreTraffic;
         document.getElementsByName('closure_permanent')[0].dispatchEvent(new Event('change', {'bubbles':true}));
      }
      if(uroCEndTime !== null)
      {
         document.getElementsByName('closure_endTime')[0].value = uroCEndTime;
         // the cloning process doesn't alter the end time, which seems to confuse WME when it then receives the
         // change event - the MTE dropdown ends up being reset to just the "Choose event" and "None" entries
         // regardless of how many MTE entries there ought to be.  The fix for this appears to simply be to then
         // submit a second change event...
         document.getElementsByName('closure_endTime')[0].dispatchEvent(new Event('change', {'bubbles':true}));
         document.getElementsByName('closure_endTime')[0].dispatchEvent(new Event('change', {'bubbles':true}));
      }

      // the current version of WME wipes any existing end date as soon as the end time is altered, so we now need
      // to set the date after the time instead of before as in earlier versions of this function...
      if(uroCEndDate !== null)
      {
         document.getElementsByName('closure_endDate')[0].value = uroCEndDate;
         document.getElementsByName('closure_endDate')[0].dispatchEvent(new Event('change', {'bubbles':true}));
      }


      uroTempFixMTEDropDown();
      if(uroCEvent !== null)
      {
         if(document.getElementsByName('closure_eventId')[0].options.length > 1)
         {
            for(var loop=0; loop<document.getElementsByName('closure_eventId')[0].options.length; loop++)
            {
               if(document.getElementsByName('closure_eventId')[0].options[loop].value == uroCEvent)
               {
                  document.getElementsByName('closure_eventId')[0].selectedIndex = loop;
                  break;
               }
            }
         }
         else
         {
            document.getElementsByName('closure_eventId')[0].selectedIndex = 0;
         }
         document.getElementsByName('closure_eventId')[0].dispatchEvent(new Event('change', {'bubbles':true}));
      }
   }

   function uroCloneClosure()
   {
      var closureOffset = parseInt(this.id.split('-')[1]);

      // grab the current closure details from the UI...
      document.getElementsByClassName('closure-item')[closureOffset].children[0].children[0].children[1].click();
      uroCLocation = uroGetElementProperty('closure_location', 0, 'value');
      uroCReason = uroGetElementProperty('closure_reason', 0, 'value');
      uroCEvent = uroGetElementProperty('closure_eventId', 0, 'value');
      uroCDirection = uroGetElementProperty('closure_direction', 0, 'selectedIndex');
      uroCHasStartDate = uroGetElementProperty('closure_hasStartDate', 0, 'checked');
      uroCStartDate = uroGetElementProperty('closure_startDate', 0, 'value');
      uroCStartTime = uroGetElementProperty('closure_startTime', 0, 'value');
      uroCEndDate = uroGetElementProperty('closure_endDate', 0, 'value');
      uroCEndTime = uroGetElementProperty('closure_endTime', 0, 'value');
      uroCIgnoreTraffic = uroGetElementProperty('closure_permanent', 0, 'checked');
      document.getElementsByClassName('closures')[0].getElementsByClassName('cancel-button')[0].click();

      // auto-increment the start and end dates...
      uroCStartDate = uroIncrementClosureDate(uroCStartDate,1);
      uroCEndDate = uroIncrementClosureDate(uroCEndDate,1);

      // generate a click event on the Add a closure button to open up the closure editing UI, then
      // wait for the UI to finish opening...
      document.getElementsByClassName('add-closure-button')[0].click();
      setTimeout(uroCompleteClosureCloning,100);
   }

   function uroDeleteNextClosureOnList()
   {
      var nClosures = document.getElementsByClassName('closure-item').length;
      if(nClosures > 0)
      {
         if (nClosures != uroClosuresToDelete)
         {
            uroClosuresToDelete = nClosures;
            document.getElementsByClassName('closure-item')[0].getElementsByClassName('delete')[0].click();
         }
         setTimeout(uroDeleteNextClosureOnList,100);
      }
      else
      {
         uroConfirmClosureDelete = true;
      }
   }

   function uroDeleteAllClosures()
   {
      uroConfirmClosureDelete = true;
      uroShowAlertBox("fa-warning", "URO+ Warning", I18n.lookup("closures.delete_confirm_no_reason")+' ('+I18n.lookup("closures.apply_to_all")+')', true, "Yes", "No", uroDeleteAllClosuresAction, null);
   }
   function uroDeleteAllClosuresAction()
   {
      uroConfirmClosureDelete = false;
      var nClosures = document.getElementsByClassName('closure-item').length;
      if(nClosures > 0)
      {
         uroClosuresToDelete = -1;
         uroDeleteNextClosureOnList();
      }
      else
      {
         uroConfirmClosureDelete = true;
      }
   }

//}

// Feed Filtering
//{
   function uroToggleFFCtrls()
   {
      if(uroShowFeedFilter === false)
      {
         uroShowFeedFilter = true;
         document.getElementById('_uroFFCtrlVisibility').className = "fa fa-minus-square-o";
         document.getElementById('uroFFCtrls').style.display = "block";
      }
      else
      {
         uroShowFeedFilter = false;
         document.getElementById('_uroFFCtrlVisibility').className = "fa fa-plus-square-o";
         document.getElementById('uroFFCtrls').style.display = "none";
      }
   }

   function uroForceFeedRefresh()
   {
      uroDeleteAutoRepeat = false;
      uroFeedFilterReloads = 0;
   }

   function uroDeleteAllVisibleFeedEntries()
   {
      if(uroGetCBChecked('_cbEnableDeleteFeedEntries'))
      {
         uroDeleteAutoRepeat = uroGetCBChecked('_cbReloadFeedAfterDelete');
         var nEntries = document.getElementsByClassName('feed-item').length;
         var entriesDeletedThisTime = 0;
         for(var loop = nEntries-1; loop >= 0; loop--)
         {
            if(document.getElementsByClassName('feed-item')[loop].style.display == 'block')
            {
               document.getElementsByClassName('feed-item')[loop].getElementsByClassName('delete')[0].click();
               uroFeedEntriesDeleted++;
               entriesDeletedThisTime++;
            }
         }
         if(entriesDeletedThisTime > 0)
         {
            uroAddLog('items deleted in this pass, resetting reloads counter...');
            uroFeedFilterReloads = 0;
         }
         var nukeStatus;
         if(uroFeedFilterReloads < 5)
         {
            nukeStatus = uroFeedEntriesDeleted+' entries nuked so far...';
         }
         else
         {
            nukeStatus = 'No more entries found after reloading feed 5 times...';
         }
         document.getElementById('_statsDeleteFeed').innerHTML = nukeStatus;
      }
   }
   function uroConfirmDeleteAllVisibleFeedEntries()
   {
      uroFeedEntriesDeleted = 0;
      document.getElementById('_statsDeleteFeed').innerHTML = '';
      if(uroGetCBChecked('_cbReloadFeedAfterDelete') === false)
      {
         uroShowAlertBox("fa-warning", "URO+ Warning", "Deleting the currently visible feed entries <b>cannot</b> be undone.<br>Are you <i>sure</i> you want to do this?", true, "Yes", "No", uroDeleteAllVisibleFeedEntries, null);
      }
      else
      {
         uroShowAlertBox("fa-warning", "URO+ Warning", "You are about to delete ALL unfiltered feed entries currently visible in WME and also those stored on the server.  This <b>cannot</b> be undone, and may take some time to complete.<br>Are you <i>sure</i> you want to do this?", true, "Yes", "No", uroDeleteAllVisibleFeedEntries, null);
      }
   }

   function uroLoadMoreFeedItems()
   {
      uroAddLog('loading more feed items...');
      uroLoadFeedItems();
   }
   function uroRefreshFeedItems()
   {
      uroAddLog('reloading feed items...');
      uroLastIssueID = null;
      uroPreviousFeedLength = 0;
      uroLoadFeedItems();
   }
   function uroLoadFeedItems()
   {
      document.getElementsByClassName("feed-content")[0].style.opacity="0.5";
      var nListEntries = document.getElementsByClassName('feed-item').length;
      if(nListEntries > 0)
      {
         var touchedEntries = 0;
         for(var i=0; i<nListEntries; i++)
         {
            if(document.getElementsByClassName('feed-item')[i].touchedByURO !== undefined)
            {
               touchedEntries++;
            }
         }
         uroAddLog('touchedEntries = '+touchedEntries);
         var untouchedEntries = (nListEntries - touchedEntries);
         if(untouchedEntries > 0)
         {
            var issuesURL = 'https://' + document.location.host;
            issuesURL += W.Config.api_base;
            issuesURL += '/Feed/Issues';
            if(uroLastIssueID !== null) issuesURL += '?lastIssueId='+uroLastIssueID;
            uroAddLog('requesting issues details');

            var issuesReq = new XMLHttpRequest();
            issuesReq.onreadystatechange = function()
            {
               if(issuesReq.readyState == 4)
               {
                  uroAddLog('issues details data request, response '+issuesReq.status+' received');
                  if(issuesReq.status == 200)
                  {
                     if(issuesReq.responseText !== "")
                     {
                        uroAddLog('parsing issues details response...');
                        var issuesDetails = JSON.parse(issuesReq.responseText);
                        uroLastIssueID = issuesDetails.lastIssueId;
                        var nIssues = issuesDetails.issues.objects.length;
                        var objID;
                        uroAddLog('details for '+nIssues+' feed entries loaded, adding objIDs to feed entries...');
                        var j = 0;
                        uroAddLog(untouchedEntries + ' untouched feed entries to examine...');
                        var tObj;
                        for(var i = 0; i < untouchedEntries; i++)
                        {
                           uroAddLog('testing list entry '+(touchedEntries + i));
                           tObj = document.getElementsByClassName('feed-item')[(touchedEntries + i)];
                           uroAddLog(tObj.className);
                           if
                              (
                                 (tObj.className.indexOf('feed-issue-ur') !== -1)||
                                 (tObj.className.indexOf('feed-issue-pu') !== -1)||
                                 (tObj.className.indexOf('feed-issue-mp') !== -1)
                              )
                           {
                              uroAddLog('adding details index '+j+' to feed entry '+(touchedEntries+i));
                              objID = issuesDetails.issues.objects[j++].referenceId;
                              tObj.objID = objID;
                           }
                           tObj.touchedByURO = true;
                        }

                        uroAddLog('...objIDs added');
                        document.getElementsByClassName("feed-content")[0].style.opacity="1";
                        uroDoFeedFilter = true;
                        uroTSTFeedFilter();
                     }
                     else
                     {
                     }
                  }
               }
            };
            issuesReq.open('GET',issuesURL,true);
            issuesReq.send();
         }
         else
         {
            setTimeout(uroLoadFeedItems,500);
         }
      }
   }

   function uroAddFeedFilterControls(firstPass)
   {
      if(firstPass === true)
      {
         if(document.getElementById('sidepanel-feed') != null)
         {
            if(document.getElementById('sidepanel-feed').childNodes[0] != null)
            {
               var nDiv = document.createElement('div');
               var iHTML = '';
               nDiv.id = "uroFeedFilter";

               iHTML += '<div id="_uroDeleteFeedEntryControls">';
               iHTML += '<div class="delete-all-button btn btn-primary" id="_btnDeleteAllVisibleFeedEntries">';
               iHTML += '<i class="fa fa-trash"></i> Delete visible feed entries?</div>';
               iHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbReloadFeedAfterDelete" /><i class="fa fa-refresh"></i><br>';
               iHTML += '<div id="_statsDeleteFeed"></div><p><p>';
               iHTML += '</div>';

               iHTML += '<i class="fa fa-plus-square-o" style="cursor:pointer;font-size:14px;" id="_uroFFCtrlVisibility"> </i><b>Feed Filter Controls</b><br>';
               iHTML += '<div id="uroFFCtrls">';
               iHTML += '<b>Filter feed by listing type:</b><br>';
               iHTML += '<input type="checkbox" id="_cbFeedFilter_TypeUR" />UR (all)<br>';
               iHTML += '&nbsp;<input type="checkbox" id="_cbFeedFilter_TypeUR_WithComments" />UR (with comments)<br>';
               iHTML += '&nbsp;<input type="checkbox" id="_cbFeedFilter_TypeUR_WithoutComments" />UR (without comments)<br>';
               iHTML += '<input type="checkbox" id="_cbFeedFilter_TypeMP" />MP<br>';
               iHTML += '<input type="checkbox" id="_cbFeedFilter_TypePUR" />PUR<br>';
               iHTML += '<input type="checkbox" id="_cbFeedFilter_TypePM" />PM notifications';

               iHTML += '<br><br>';

               iHTML += '<b>Filter feed by listing reason:</b><br>';
               for(var loop=0; loop < uroFeedFilterFilters.length; loop++)
               {
                  iHTML += '<input type="checkbox" id="_cbFeedFilter_'+loop+'" />'+I18n.lookup(uroFeedFilterFilters[loop][0])+'<br>';
               }
               iHTML += '<input type="checkbox" id="_cbFeedFilter_MotNone" />None of the above...<br>';
               iHTML += '<br><input type="checkbox" id="_cbFeedFilter_Invert" />Invert behaviour of above filters';

               iHTML += '<br><br>';

               iHTML += '<b>Filter feed by keyword/phrase:</b><br>';
               iHTML += '<input type="checkbox" id="_cbFeedFilter_HideKeyword" pairedWith="_cbFeedFilter_ShowKeyword" />Hide or ';
               iHTML += '<input type="checkbox" id="_cbFeedFilter_ShowKeyword" pairedWith="_cbFeedFilter_HideKeyword" />show if keyword is present<br>';
               iHTML += '<input type="text" id="_textFeedFilter_Keyword" />';

               iHTML += '<br><br>';

               iHTML += '<b>Filter feed by age:</b><br>';
               iHTML += '<input type="checkbox" id="_cbFeedFilter_HideLessThan">Hide entries less than </input>';
               iHTML += '<input type="number" min="1" size="3" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputFeedFilterMinDays"> days old<br>';
               iHTML += '<input type="checkbox" id="_cbFeedFilter_HideMoreThan">Hide entries more than </input>';
               iHTML += '<input type="number" min="0" size="3" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputFeedFilterMaxDays"> days old';
               iHTML += '</div>';

               nDiv.innerHTML = iHTML;
               document.getElementById('sidepanel-feed').insertBefore(nDiv,document.getElementById('sidepanel-feed').childNodes[0]);
               uroAddEventListener('_uroFFCtrlVisibility','click',uroToggleFFCtrls, true);

               uroShowFeedFilter = true;
               uroToggleFFCtrls();

               var nDiv2 = document.createElement('div');
               nDiv2.id = "uroFeedRefresher";
               nDiv2.style.display = 'none';
               nDiv2.innerHTML = '<br><div id="_btnFeedRefresh" class="btn btn-block btn-default" style="display: block;"><i class="fa fa-refresh"></div>';
               document.getElementById('sidepanel-feed').appendChild(nDiv2);
               uroAddEventListener('_btnFeedRefresh','click',uroForceFeedRefresh, true);
               uroAddEventListener('_btnDeleteAllVisibleFeedEntries',"click", uroConfirmDeleteAllVisibleFeedEntries, false);
            }
         }
      }
      else
      {
         if(uroGetCBChecked('_cbEnableDeleteFeedEntries'))
         {
            document.getElementById('_uroDeleteFeedEntryControls').style.display = "block";
         }
         else
         {
            document.getElementById('_uroDeleteFeedEntryControls').style.display = "none";
         }
      }
   }

   var uroLogPausedEntry = -1;
   var uroFeedFilterExitReason = -1;
   function uroTSTFeedFilter()
   {
      var deleteFeedEntryVisibility = (document.getElementById('_uroDeleteFeedEntryControls').style.display == 'block');
      if(uroGetCBChecked('_cbEnableDeleteFeedEntries'))
      {
         if(deleteFeedEntryVisibility === false)
         {
            document.getElementById('_uroDeleteFeedEntryControls').style.display = "block";
            uroWindowResizeHandler();
         }
      }
      else
      {
         if(deleteFeedEntryVisibility === true)
         {
            document.getElementById('_uroDeleteFeedEntryControls').style.display = "none";
            uroWindowResizeHandler();
         }
      }

      var feedEntries = document.getElementsByClassName('feed-item');
      var feedLength = feedEntries.length;
      if(feedLength !== uroPreviousFeedLength)
      {
         uroAddLog('feed length = '+feedLength);
         uroDoFeedFilter = true;
      }
      uroPreviousFeedLength = feedLength;

      if(uroDoFeedFilter === false)
      {
         if(uroFeedFilterExitReason !== 1)
         {
            uroAddLog('uroDoFeedFilter = false');
            uroFeedFilterExitReason = 1;
         }
         return;
      }

      if(feedLength === 0)
      {
         if(uroFeedFilterExitReason !== 2)
         {
            uroAddLog('feedLength = 0');
            uroFeedFilterExitReason = 2;
         }
         return;
      }

      uroDoFeedFilter = false;
      if(document.getElementById('uroFeedFilter') === null)
      {
         if(uroFeedFilterExitReason !== 3)
         {
            uroAddLog('uroFeedFilter = null');
            uroFeedFilterExitReason = 3;
         }
         return;
      }
      uroFeedFilterExitReason = -1;

      var i, j;
      var tID;
      for(i=0; i<feedLength; i++)
      {
         fClass = feedEntries[i].className;
         if(fClass.indexOf('feed-issue-ur') != -1)
         {
            tID = feedEntries[i].objID;
            urObj = W.model.mapUpdateRequests.objects[tID];
            if(urObj === undefined)
            {
               if(uroLogPausedEntry != i)
               {
                  uroAddLog('UR '+tID+' details for list entry '+i+' not loaded yet...');
                  uroLogPausedEntry = i;
               }
               uroDoFeedFilter = true;
               return;
            }
         }
      }

      uroLogPausedEntry = -1;
      uroAddLog('applying feed filters...');
      var hideFI;
      var urObj;
      var iHTML;
      var fClass;
      var hasComments;

      var ffKeyword = uroGetElmValue('_textFeedFilter_Keyword');
      var ffShowKW = uroGetCBChecked('_cbFeedFilter_ShowKeyword');
      var ffHideKW = uroGetCBChecked('_cbFeedFilter_HideKeyword');
      var kwPresent;

      var isChecked_cbFeedFilter_TypeUR = uroGetCBChecked('_cbFeedFilter_TypeUR');
      var isChecked_cbFeedFilter_TypeURWithComments = uroGetCBChecked('_cbFeedFilter_TypeUR_WithComments');
      var isChecked_cbFeedFilter_TypeURWithoutComments = uroGetCBChecked('_cbFeedFilter_TypeUR_WithoutComments');
      var isChecked_cbFeedFilter_TypeMP = uroGetCBChecked('_cbFeedFilter_TypeMP');
      var isChecked_cbFeedFilter_TypePUR = uroGetCBChecked('_cbFeedFilter_TypePUR');
      var isChecked_cbFeedFilter_TypePM = uroGetCBChecked('_cbFeedFilter_TypePM');
      var isChecked_cbFeedFilter_MotNone = uroGetCBChecked('_cbFeedFilter_MotNone');
      var isChecked_cbFeedFilter_Invert = uroGetCBChecked('_cbFeedFilter_Invert');

      var trans = [];
      var isChecked = [];
      var nFilters = uroFeedFilterFilters.length;

      for(i=0; i < nFilters; i++)
      {
         trans.push(I18n.lookup(uroFeedFilterFilters[i][0]));
         isChecked.push(uroGetCBChecked('_cbFeedFilter_'+i));
      }

      var isChecked_filterLessThan = uroGetCBChecked('_cbFeedFilter_HideLessThan');
      var isChecked_filterMoreThan = uroGetCBChecked('_cbFeedFilter_HideMoreThan');
      var value_filterLessThan = uroGetElmValue('_inputFeedFilterMinDays');
      var value_filterMoreThan = uroGetElmValue('_inputFeedFilterMaxDays');

      uroAddLog('filter settings:');
      var tSettings = ' '+isChecked_cbFeedFilter_TypeUR+', '+isChecked_cbFeedFilter_TypeURWithComments+', '+isChecked_cbFeedFilter_TypeURWithoutComments;
      tSettings += ', '+isChecked_cbFeedFilter_TypeMP+', '+isChecked_cbFeedFilter_TypePUR+', '+isChecked_cbFeedFilter_TypePM+',, '+isChecked_cbFeedFilter_MotNone;
      tSettings += ', '+isChecked_cbFeedFilter_Invert+', '+isChecked_filterLessThan+', '+isChecked_filterMoreThan+', '+value_filterLessThan+', '+value_filterMoreThan;
      uroAddLog(tSettings);
      var timestamp;
      var dayCount = 0;
      var dayTrans = ['', '', '', ''];
      var monthTrans = ['', '', '', ''];
      var i18nLookupsDays = ["datetime.distance_in_words.x_days.one", "datetime.distance_in_words.x_days.few", "datetime.distance_in_words.x_days.many", "datetime.distance_in_words.x_days.other"];
      var i18nLookupsMonths = ["datetime.distance_in_words.x_months.one", "datetime.distance_in_words.x_months.few", "datetime.distance_in_words.x_months.many", "datetime.distance_in_words.x_months.other"];

      uroAddLog('getting dayTrans and monthTrans strings');
      for(i=0; i<4; i++)
      {
         var tTrans = I18n.lookup(i18nLookupsDays[i]);
         if(tTrans !== undefined)
         {
            tTrans = tTrans.split(" ");
            if(tTrans.indexOf("1") === 0) dayTrans[i] = tTrans[1];
            else if(tTrans.indexOf("%{count}") === 0) dayTrans[i] = tTrans[1];
            else dayTrans[i] = tTrans[0];
         }
         else
         {
            dayTrans[i] = '';
         }

         tTrans = I18n.lookup(i18nLookupsMonths[i]);
         if(tTrans !== undefined)
         {
            tTrans = tTrans.split(" ");
            if(tTrans.indexOf("1") === 0) monthTrans[i] = tTrans[1];
            else if(tTrans.indexOf("%{count}") === 0) monthTrans[i] = tTrans[1];
            else monthTrans[i] = tTrans[0];
         }
         else
         {
            monthTrans[i] = '';
         }
         uroAddLog('  '+i+':'+dayTrans+' '+monthTrans[i]);
      }

      uroAddLog(feedLength+' entries to filter...');
      for(i=0; i<feedLength; i++)
      {
         uroAddLog('entry '+i);
         timestamp = feedEntries[i].getElementsByClassName("timestamp")[0].innerHTML;
         uroAddLog('  raw timestamp = '+timestamp);
         dayCount = 0;
         for(j=0; j<4; j++)
         {
            if(dayTrans[j] !== '')
            {
               if(timestamp.indexOf(dayTrans[j]) !== -1)
               {
                  dayCount = timestamp.split(" ");
                  if(dayCount[0].indexOf(dayTrans[j]) !== -1) dayCount = dayCount[1];
                  else dayCount = dayCount[0];
                  dayCount = parseInt(dayCount);
                  break;
               }
            }
            if(monthTrans[j] !== '')
            {
               if(timestamp.indexOf(monthTrans[j]) !== -1)
               {
                  dayCount = timestamp.split(" ");
                  if(dayCount[0].indexOf(dayTrans[j]) !== -1) dayCount = dayCount[1];
                  else dayCount = dayCount[0];
                  dayCount = parseInt(dayCount);
                  // once feed entry ages start being displayed in months, we can't be sure exactly how many days ago they
                  // were actually entered, so we just assume 30 days per month to give a reasonable approximation...
                  dayCount = (dayCount * 30);
                  break;
               }
            }
         }
         uroAddLog('  parsed day count = '+dayCount);
         hideFI = false;

         iHTML = feedEntries[i].innerHTML;
         fClass = feedEntries[i].className;
         uroAddLog('  classname = '+fClass);

         if(fClass.indexOf('feed-issue-ur') != -1)
         {
            hideFI = (hideFI || (isChecked_cbFeedFilter_TypeUR));
            urObj = W.model.mapUpdateRequests.objects[feedEntries[i].objID];
            hasComments = urObj.attributes.hasComments;
            hideFI = (hideFI || (isChecked_cbFeedFilter_TypeURWithComments & (hasComments === true)));
            hideFI = (hideFI || (isChecked_cbFeedFilter_TypeURWithoutComments & (hasComments === false)));
            uroAddLog('  hideFI = '+hideFI+' after UR filter tests');
         }
         if(isChecked_cbFeedFilter_TypeMP)
         {
            hideFI = (hideFI || (fClass.indexOf('feed-issue-mp') != -1));
            uroAddLog('  hideFI = '+hideFI+' after MP filter tests');
         }
         if(isChecked_cbFeedFilter_TypePUR)
         {
            hideFI = (hideFI || (fClass.indexOf('feed-issue-pu') != -1));
            uroAddLog('  hideFI = '+hideFI+' after PUR filter tests');
         }
         if(isChecked_cbFeedFilter_TypePM)
         {
            hideFI = (hideFI || (fClass.indexOf('feed-notification-pm') != -1));
            uroAddLog('  hideFI = '+hideFI+' after PM filter tests');
         }

         for(var filters=0; filters < nFilters; filters++)
         {
            if(isChecked[filters])
            {
               hideFI = (hideFI || (iHTML.indexOf(trans[filters]) != -1));
            }
         }
         uroAddLog('  hideFI = '+hideFI+' after listing reasons filter tests');

         if(isChecked_cbFeedFilter_MotNone)
         {
            hideFI = (hideFI || (iHTML.indexOf('motivation') == -1));
         }
         uroAddLog('  hideFI = '+hideFI+' after none of the above test');

         if(isChecked_cbFeedFilter_Invert)
         {
            hideFI = !hideFI;
         }
         uroAddLog('  hideFI = '+hideFI+' after filter inversion test');

         if(isChecked_filterLessThan)
         {
            if(dayCount < value_filterLessThan)
            {
               hideFI = true;
               uroAddLog('  days less than trigger');
            }
         }
         if(isChecked_filterMoreThan)
         {
            if(dayCount > value_filterMoreThan)
            {
               hideFI = true;
               uroAddLog('  days more than trigger');
            }
         }

         if((ffShowKW) || (ffHideKW))
         {
            kwPresent = (iHTML.indexOf(ffKeyword) != -1);
            hideFI = (hideFI || (kwPresent & ffHideKW));
            hideFI = (hideFI || ((!kwPresent) & ffShowKW));
         }
         uroAddLog('  hideFI = '+hideFI+' after keyword filter tests');

         if(hideFI) feedEntries[i].style.display = 'none';
         else feedEntries[i].style.display = 'block';
      }
      uroAddLog('filters applied...');

      var nFeedItems = document.getElementById('sidepanel-feed').getElementsByClassName('feed-item').length;
      var nVisibleItems = 0;
      for(j=0; j < nFeedItems; j++)
      {
         if(document.getElementById('sidepanel-feed').getElementsByClassName('feed-item')[j].style.display == 'block')
         {
            nVisibleItems++;
         }
      }

      if(uroDeleteAutoRepeat === true)
      {
         if(nVisibleItems > 0)
         {
            uroAddLog('feed items to delete, resetting reloads counter...');
            uroFeedFilterReloads = 0;
            uroDeleteAllVisibleFeedEntries();
         }
         else if(uroFeedFilterReloads == 5)
         {
            uroAddLog('no more reload attempts, abandoning autodelete...');
            uroDeleteAutoRepeat = false;
         }
      }

      if(nVisibleItems < 5)
      {
         if(document.getElementById('sidepanel-feed').getElementsByClassName('feed-loading-more')[0].style.display == 'none')
         {
            if(uroFeedFilterReloads < 5)
            {
               document.getElementById('sidepanel-feed').getElementsByClassName('feed-load-more')[0].click();
               uroFeedFilterReloads++;
               uroAddLog('less than 5 visible items in feed, reloading...');
               document.getElementById('uroFeedRefresher').style.display = 'none';
            }
            else
            {
               uroAddLog('no more reload attempts, abandoning autorefresh...');
               document.getElementById('uroFeedRefresher').style.display = 'block';
            }
         }
      }
      else
      {
         uroFeedFilterReloads = 0;
         uroAddLog('5+ visible feed items, resetting reloads counter...');
         document.getElementById('uroFeedRefresher').style.display = 'none';
      }
   }
//}

function uroGetMarkerType(marker)
{
   var markerType = null;

   if(marker.tagName == "image")
   {
      markerType = 'cam';
   }
   else if(marker.tagName == "circle")
   {
      markerType = 'node';
   }
   else
   {
      if(marker.className.indexOf('user-generated') !== -1) markerType = 'ur';
      else if(marker.className.indexOf('map-problem') !== -1) markerType = 'mp';
      else if(marker.className.indexOf('place-update') !== -1)
      {
         if(marker.parentNode.id === W.map.parkingPlaceUpdatesLayer.div.id)
         {
            markerType = 'ppur';
         }
         else if(marker.parentNode.id === W.map.residentialPlaceUpdatesLayer.div.id)
         {
            markerType = 'rpur';
         }
         else if(marker.parentNode.id === W.map.placeUpdatesLayer.div.id)
         {
            markerType = 'pur';
         }
      }
   }
   return markerType;
}
function uroGetCameraIDFromGeoID(geoID)
{
   var camID = null;
   var i=W.map.camerasLayer.features.length;
   var camObj;
   while(i > 0)
   {
      camObj = W.map.camerasLayer.features[i-1];
      if(camObj.model.geometry.id === geoID)
      {
         camID = camObj.model.attributes.id;
         break;
      }
      i--;
   }
   return camID;
}
function uroGetNodeIDFromGeoID(geoID)
{
   var nodeID = null;
   var i=W.map.nodeLayer.features.length;
   var nodeObj;
   while(i > 0)
   {
      nodeObj = W.map.nodeLayer.features[i-1];
      if(nodeObj.model.geometry.id === geoID)
      {
         nodeID = nodeObj.model.attributes.id;
         break;
      }
      i--;
   }
   return nodeID;
}
var uroLastMarkerMousedOver = null;
function uroMarkerMouseOver(e)
{
   var markerType;
   markerType = uroGetMarkerType(this);
   if(markerType !== null)
   {
      var markerID = null;
      if(markerType === 'cam')
      {
         markerID = uroGetCameraIDFromGeoID(this.id);
         if(uroGetCBChecked('_cbHighlightInsteadOfHideCams') === true)
         {
            if(uroLastMarkerMousedOver !== markerID)
            {
               setTimeout(uroFilterCameras, 50);
            }
         }
      }
      else if(markerType === 'node')
      {
         markerID = uroGetNodeIDFromGeoID(this.id);
      }
      else
      {
         markerID = this.attributes["data-id"].value;
      }
      uroAddLog('hover over '+markerType+' ID '+markerID);
      uroMousedOverMarkerID = markerID;
      uroMousedOverMarkerType = markerType;

      if(markerType == 'ur') uroHoveredURID = markerID;

      if((markerType == 'ur') || (markerType == 'mp'))
      {
         uroChangeCustomMarkers(markerID,true,markerType);
      }
      uroLastMarkerMousedOver = markerID;
   }
   else
   {
      uroAddLog('hover over unknown object...');
   }
}
function uroMarkerMouseOut(e)
{
   var markerType;
   markerType = uroGetMarkerType(this);
   if(markerType !== null)
   {
      var markerID = null;
      if(markerType === 'cam')
      {
         markerID = uroGetCameraIDFromGeoID(this.id);
         if(uroGetCBChecked('_cbHighlightInsteadOfHideCams') === true)
         {
            setTimeout(uroFilterCameras, 50);
         }
      }
      else if(markerType === 'node')
      {
         markerID = uroGetNodeIDFromGeoID(this.id);
      }
      else
      {
         markerID = this.attributes["data-id"].value;
      }
      uroAddLog('hover off '+markerType+' ID '+markerID);
      uroMousedOverMarkerID = null;
      uroMousedOverMarkerType = null;
      uroHoveredURID = null;

      if((markerType == 'ur') || (markerType == 'mp'))
      {
         uroChangeCustomMarkers(markerID,false,markerType);
      }
   }
   else
   {
      uroAddLog('hover off unknown object...');
   }
   uroLastMarkerMousedOver = null;
}
function uroMarkerClick()
{
   var markerType = uroGetMarkerType(this);
   if(markerType !== null)
   {
      var markerID = this.attributes["data-id"].value;
      uroAddLog('clicked on '+markerType+' marker '+markerID);
      uroClickedOnMarkerID = markerID;
      uroClickedOnMarkerType = markerType;
   }
}

function uroBlobMouseOver(e)
{
   var blobType = this.attributes.uroBlobType;
   if(blobType !== undefined)
   {
      var blobID = this.attributes.uroBlobID;
      uroAddLog('hover over '+blobType+' ID '+blobID);
   }
   else
   {
      uroAddLog('hover over unknown blob...');
   }
}
function uroBlobMouseOut(e)
{
   var blobType = this.attributes.uroBlobType;
   if(blobType !== undefined)
   {
      var blobID = this.attributes.uroBlobID;
      uroAddLog('hover off '+blobType+' ID '+blobID);
      if(blobType == 'map_comment')
      {
         if(W.model.mapComments.objects[blobID] != undefined)
         {
            var geoID = W.model.mapComments.objects[blobID].attributes.geometry.id;
            if(geoID.indexOf('Point') != -1)
            {
               // reapply visibility mods
               var svgElm = document.getElementById(uroMCLayer.div.id+'_vroot');
               for(var svgIdx = 0; svgIdx < svgElm.children.length; svgIdx++)
               {
                  if(svgElm.children[svgIdx].id === geoID)
                  {
                     setTimeout(uroReapplyPointMCVisibilityMods,10);
                  }
               }
            }
         }
      }
   }
   else
   {
      uroAddLog('hover off unknown blob...');
   }
}
function uroBlobClick()
{
   var blobType = this.attributes.uroBlobType;
   if(blobType !== undefined)
   {
      var blobID = this.attributes.uroBlobID;
      uroAddLog('clicked on '+blobType+' blob '+blobID);
   }
}
function uroMCLayerChanged_changed()
{
   uroMCLayerChanged();
}
function uroMCLayerChanged_added()
{
   uroMCLayerChanged();
}
function uroMCLayerChanged_removed()
{
   uroMCLayerChanged();
}
function uroReapplyPointMCVisibilityMods()
{
   if(uroApplyPointMCVisibilityMods() === false)
   {
      setTimeout(uroReapplyPointMCVisibilityMods,100);
   }
}
function uroApplyPointMCVisibilityMods()
{
   var retval = true;
   if(uroHasSelectedMCs() === true)
   {
      retval = false;
   }
   else
   {
      var svgElm = document.getElementById(uroMCLayer.div.id+'_vroot');
      for(var svgIdx = 0; svgIdx < svgElm.children.length; svgIdx++)
      {
         var svgChild = svgElm.children[svgIdx];
         if(svgChild.id.indexOf('Point') != -1)
         {
            if(uroGetCBChecked('_cbMCEnhancePointMCVisibility') === true)
            {
               if(svgChild.getAttribute('r') == 6)
               {
                  svgChild.setAttribute('fill','#ffff00');
                  svgChild.setAttribute('fill-opacity',0.75);
                  svgChild.setAttribute('r',12);
                  svgChild.setAttribute('touchedByURO',true);
               }
               else if((svgChild.getAttribute('touchedByURO') === "true")&&(svgChild.getAttribute('fill') === '#ffff00'))
               {
                  // do nothing...
               }
               else
               {
                  retval = false;
                  break;
               }
            }
            else
            {
               if((svgChild.getAttribute('touchedByURO') === "true")&&(svgChild.getAttribute('fill') === '#ffff00'))
               {
                  svgChild.setAttribute('fill','#ffffff');
                  svgChild.setAttribute('fill-opacity',1);
                  svgChild.setAttribute('r',6);
                  svgChild.setAttribute('touchedByURO',false);
               }
            }
         }
      }
   }
   return retval;
}
function uroHasSelectedMCs()
{
   var retval = false;
   for(var mcObj in W.model.mapComments.objects)
   {
      if(W.model.mapComments.objects[mcObj].isSelected() === true)
      {
         retval = true;
         break;
      }
   }
   return retval;
}
function uroMCLayerChanged()
{
   uroWazeBits();
   if(uroMCLayer != null)
   {
      if(uroHasSelectedMCs() === false)
      {
         uroAddLog('adding MC blob event handlers');
         var mcModel = null;
         for(var mObj=0; mObj<uroMCLayer.features.length; mObj++)
         {
            if(uroMCLayer.features[mObj].model !== undefined)
            {
               mcModel = uroMCLayer.features[mObj].model;
               {
                  if(mcModel.selected !== true)
                  {
                     var mcBlobID = mcModel.attributes.geometry.id;
                     var mcID = mcModel.attributes.id;
                     var mcBlob = document.getElementById(mcBlobID);
                     if(mcBlob !== null)
                     {
                        mcBlob.addEventListener("mouseover", uroBlobMouseOver, false);
                        mcBlob.addEventListener("mouseout", uroBlobMouseOut, false);
                        mcBlob.addEventListener("click", uroBlobClick, false);
                        mcBlob.attributes.uroBlobID = mcID;
                        mcBlob.attributes.uroBlobType = "map_comment";
                        uroAddLog('added handlers to MC '+mcID);
                     }
                  }
               }
            }
         }
         uroApplyPointMCVisibilityMods();
      }
      else
      {
         uroAddLog('MC selected, handlers not added yet...');
      }
   }
}
function uroPlaceLayerChanged()
{
	uroAddLog('adding place blob event handlers');
	for(var mObj=0; mObj<W.map.landmarkLayer.features.length; mObj++)
	{
		var mcBlobID = W.map.landmarkLayer.features[mObj].model.attributes.geometry.id;
		var mcID = W.map.landmarkLayer.features[mObj].model.attributes.id;
		var mcBlob = document.getElementById(mcBlobID);
		if(mcBlob !== null)
		{
			mcBlob.addEventListener("mouseover", uroBlobMouseOver, false);
			mcBlob.addEventListener("mouseout", uroBlobMouseOut, false);
			mcBlob.addEventListener("click", uroBlobClick, false);
			mcBlob.attributes.uroBlobID = mcID;
			mcBlob.attributes.uroBlobType = "place";
		}
	}
}

function uroURLayerChanged()
{
   uroAddLog('adding UR marker event handlers');
   for(var mObj in W.map.updateRequestLayer.markers)
   {
      if(W.map.updateRequestLayer.markers.hasOwnProperty(mObj))
      {
         var mIcon = W.map.updateRequestLayer.markers[mObj].icon.div;
         mIcon.addEventListener("mouseover",uroMarkerMouseOver, false);
         mIcon.addEventListener("mouseout",uroMarkerMouseOut, false);
         mIcon.addEventListener("click",uroMarkerClick, false);
      }
   }
}
function uroMPLayerChanged()
{
   uroAddLog('adding MP marker event handlers');
   for(var mObj in W.map.problemLayer.markers)
   {
      if(W.map.problemLayer.markers.hasOwnProperty(mObj))
      {
         var mIcon = W.map.problemLayer.markers[mObj].icon.div;
         mIcon.addEventListener("mouseover", uroMarkerMouseOver, false);
         mIcon.addEventListener("mouseout", uroMarkerMouseOut, false);
         mIcon.addEventListener("click", uroMarkerClick, false);
      }
   }
}
function uroPURLayerChanged()
{
   uroAddLog('adding PUR marker event handlers');
   for(var mObj in W.map.placeUpdatesLayer.markers)
   {
      if(W.map.placeUpdatesLayer.markers.hasOwnProperty(mObj))
      {
         var mIcon = W.map.placeUpdatesLayer.markers[mObj].icon.div;
         mIcon.addEventListener("mouseover", uroMarkerMouseOver, false);
         mIcon.addEventListener("mouseout", uroMarkerMouseOut, false);
         mIcon.addEventListener("click", uroMarkerClick, false);
      }
   }
}
function uroPPULayerChanged()
{
   uroAddLog('adding PPU marker event handlers');
   for(var mObj in W.map.parkingPlaceUpdatesLayer.markers)
   {
      if(W.map.parkingPlaceUpdatesLayer.markers.hasOwnProperty(mObj))
      {
         var mIcon = W.map.parkingPlaceUpdatesLayer.markers[mObj].icon.div;
         mIcon.addEventListener("mouseover", uroMarkerMouseOver, false);
         mIcon.addEventListener("mouseout", uroMarkerMouseOut, false);
         mIcon.addEventListener("click", uroMarkerClick, false);
      }
   }
}
function uroRPULayerChanged()
{
   uroAddLog('adding RPU marker event handlers');
   for(var mObj in W.map.residentialPlaceUpdatesLayer.markers)
   {
      if(W.map.residentialPlaceUpdatesLayer.markers.hasOwnProperty(mObj))
      {
         var mIcon = W.map.residentialPlaceUpdatesLayer.markers[mObj].icon.div;
         mIcon.addEventListener("mouseover", uroMarkerMouseOver, false);
         mIcon.addEventListener("mouseout", uroMarkerMouseOut, false);
         mIcon.addEventListener("click", uroMarkerClick, false);
      }
   }
}
function uroCamLayerChanged()
{
   uroAddLog('adding camera marker event handlers');
   var i = W.map.camerasLayer.features.length;
   var svgElm = null;
   while(i > 0)
   {
      svgElm = document.getElementById(W.map.camerasLayer.features[i-1].geometry.id);
      if(svgElm !== null)
      {
         svgElm.addEventListener("mouseover", uroMarkerMouseOver, false);
         svgElm.addEventListener("mouseout", uroMarkerMouseOut, false);
      }
      i--;
   }
}
var uroDelayNodeLayerUpdate = true;
function uroNodeLayerChanged()
{
   if(uroDelayNodeLayerUpdate === true)
   {
      // When the layer change event fires, WME hasn't yet updated the SVG content and so the node markers visible at this point
      // in time will get nuked once the update takes place.  We must therefore wait a short time to allow the SVG update to occur
      // before attaching event listeners to the node markers...
      uroDelayNodeLayerUpdate = false;
      setTimeout(uroNodeLayerChanged, 1000);
   }
   else
   {
      uroDelayNodeLayerUpdate = true;
      uroAddLog('adding node event handlers');
      var i = W.map.nodeLayer.features.length;

      if(i > 0)
      {
         var svgElm = null;
         while(i > 0)
         {
            svgElm = document.getElementById(W.map.nodeLayer.features[i-1].geometry.id);
            if(svgElm !== null)
            {
               svgElm.addEventListener("mouseover", uroMarkerMouseOver, false);
               svgElm.addEventListener("mouseout", uroMarkerMouseOut, false);
            }
            i--;
         }
         uroNodeLayerScanAttempts = 0;
      }
   }
}

function uroClosuresLayerChanged()
{
   uroAddLog('reapplying closures filter');
   uroFilterRTCs();
}
function uroRefilterFeedItems()
{
   uroDoFeedFilter = true;
}

var uroResizingPending = false;
function uroWindowResizeHandler()
{
   if(uroResizingPending === false)
   {
      uroResizingPending = true;
      setTimeout(uroDoResizing,500);
   }
}
function uroDoResizing()
{
   uroResizingPending = false;
   // adjust feed contents to best fit the available space...

   // we need to wait until the feed panel has been drawn
   var feedTabVisible = (document.getElementById('sidepanel-feed').className.indexOf('active') !== -1);
   if(feedTabVisible === false)
   {
      // not yet, so try again in a little while
      uroWindowResizeHandler();
   }
   else
   {
      // panel is present, so proceed...

      // temporarily minimize the feed filter controls if they're open...
      var showControlsAfterResize = false;
      if(uroShowFeedFilter === true)
      {
         uroToggleFFCtrls();
         showControlsAfterResize = true;
      }

      document.getElementsByClassName("tab-content")[0].style.height="100%";
      var panelHeight = document.getElementsByClassName("tab-content")[0].clientHeight;
      var filterControlsHeight = document.getElementById("uroFeedFilter").clientHeight;
      var footerHeight = document.getElementsByClassName("feed-load-section")[0].clientHeight;
      var feedListHeight = panelHeight - (filterControlsHeight + footerHeight + 32);
      document.getElementsByClassName("feed-content")[0].style.height = feedListHeight+"px";
      document.getElementsByClassName("feed-content")[0].style.overflowY = "scroll";

      if(showControlsAfterResize === true)
      {
         uroToggleFFCtrls();
      }
   }
}
function uroFinalizeListenerSetup()
{
   uroFinalisingListenerSetup = true;

   // filter markers when the marker objects are modified (this happens whenever WME needs to load fresh marker data
   // due to having panned/zoomed the map beyond the extents of the previously loaded data)
   W.model.mapUpdateRequests.on("objectschanged", uroFilterURs_onObjectsChanged);
   W.model.mapUpdateRequests.on("objectsadded", uroFilterURs_onObjectsAdded);
   W.model.mapUpdateRequests.on("objectsremoved", uroFilterURs_onObjectsRemoved);

   W.model.updateRequestSessions.on("objectschanged", uroUREvent_onObjectsChanged);
   W.model.updateRequestSessions.on("objectsadded", uroUREvent_onObjectsAdded);
   W.model.updateRequestSessions.on("objectsremoved", uroUREvent_onObjectsRemoved);

   W.model.cameras.on("objectschanged", uroCamLayerChanged);
   W.model.cameras.on("objectsadded", uroCamLayerChanged);
   W.model.cameras.on("objectsremoved", uroCamLayerChanged);
   W.model.cameras.on("objectschanged", uroFilterCameras);
   W.model.cameras.on("objectsadded", uroFilterCameras);
   W.model.cameras.on("objectsremoved", uroFilterCameras);

   W.model.problems.on("objectschanged", uroFilterProblems);
   W.model.problems.on("objectsadded", uroFilterProblems);
   W.model.problems.on("objectsremoved", uroFilterProblems);

   W.model.venues.on("objectschanged", uroFilterPlaces);
   W.model.venues.on("objectsadded", uroFilterPlaces);
   W.model.venues.on("objectsremoved", uroFilterPlaces);

   W.model.mapComments.on("objectschanged", uroMCLayerChanged_changed);
   W.model.mapComments.on("objectsadded", uroMCLayerChanged_added);
   W.model.mapComments.on("objectsremoved", uroMCLayerChanged_removed);

   var uroMO_PlaceLayer = new MutationObserver(uroPlaceLayerChanged);
   uroMO_PlaceLayer.observe(W.map.landmarkLayer.div,{childList: true, attributes : true, characterData : true, subtree: true});
   var uroMO_URLayer = new MutationObserver(uroURLayerChanged);
   uroMO_URLayer.observe(W.map.updateRequestLayer.div,{childList : true});
   var uroMO_MPLayer = new MutationObserver(uroMPLayerChanged);
   uroMO_MPLayer.observe(W.map.problemLayer.div,{childList : true});
   var uroMO_PURLayer = new MutationObserver(uroPURLayerChanged);
   uroMO_PURLayer.observe(W.map.placeUpdatesLayer.div,{childList : true});
   var uroMO_PPULayer = new MutationObserver(uroPPULayerChanged);
   uroMO_PPULayer.observe(W.map.parkingPlaceUpdatesLayer.div,{childList : true});
   var uroMO_RPULayer = new MutationObserver(uroRPULayerChanged);
   uroMO_RPULayer.observe(W.map.residentialPlaceUpdatesLayer.div,{childList : true});
   var uroMO_ClosuresLayer = new MutationObserver(uroClosuresLayerChanged);
   uroMO_ClosuresLayer.observe(W.map.closuresMarkerLayer.div,{childList : true});
   var uroMO_NodeLayer = new MutationObserver(uroNodeLayerChanged);
   uroMO_NodeLayer.observe(W.map.nodeLayer.div,{childList: true, attributes : true, characterData : true, subtree: true});

   uroAddEventListener('_btnUndoLastHide',"click", uroRemoveLastAddedIgnore, true);
   uroAddEventListener('_btnClearSessionHides',"click", uroRemoveAllIgnores, true);
   uroEnableIgnoreListControls();

   uroAddEventListener('_btnClearCamWatchList',"click", uroClearCamWatchList, true);
   uroAddEventListener('_btnSettingsToText',"click", uroSettingsToText, true);
   uroAddEventListener('_btnTextToSettings',"click", uroTextToSettings, true);
   uroAddEventListener('_btnResetSettings',"click", uroDefaultSettings, true);
   uroAddEventListener('_btnClearSettingsText',"click", uroClearSettingsText, true);
   uroAddEventListener('_cbMasterEnable',"click", uroFilterItems_MasterEnableClick, true);

/*
   uroAddEventListener('_btnDebugToScreen',"click", uroDumpDebug, true);
*/

   uroAddEventListener('uroDiv',"dblclick",uroSuppressPopup,true);

   uroAddEventListener('_selectCameraUserID',"change", uroCamEditorSelected, true);
   uroAddEventListener('_selectPlacesUserID',"change", uroPlacesEditorSelected, true);
   uroAddEventListener('_selectHidePlacesUserID',"change", uroHidePlacesEditorSelected, true);

   uroAddEventListener('uroAlertTickBtn','click',uroCloseAlertBoxWithTick,true);
   uroAddEventListener('uroAlertCrossBtn','click',uroCloseAlertBoxWithCross,true);

   uroSetOnClick("_linkSelectUserRequests",uroShowURTab);
   uroSetOnClick("_linkSelectMapProblems",uroShowMPTab);
   uroSetOnClick("_linkSelectMapComments",uroShowMCTab);
   uroSetOnClick("_linkSelectPlaces",uroShowPlacesTab);
   uroSetOnClick("_linkSelectCameras",uroShowCameraTab);
   uroSetOnClick("_linkSelectMisc",uroShowMiscTab);
   uroSetOnClick("_linkSelectOWL",uroShowOWLTab);

   for(var idx=0;idx<W.Config.venues.categories.length;idx++)
   {
      uroSetOnClick('_uroPlacesGroupState-'+idx,uroPlacesGroupCollapseExpand);
   }

   uroAddLog('finalise onload');

   uroNewLookCheckDetailsRequest();
   // filter markers as and when the map is moved
   W.map.events.register("moveend", null, uroFilterItems);
   W.map.events.register("moveend", null, uroGetAMs);
   W.map.events.register("mousemove", null, uroGetAMs);
   W.map.events.register("mousemove", null, uroNewLookHighlightedItemsCheck);
   W.map.events.registerPriority("mousedown", null, uroMouseDown);

   // trap mousedown on Streetview marker drag
   if(document.getElementsByClassName('street-view-control').length === 0) return;
   document.getElementsByClassName('street-view-control')[0].onmousedown = uroMouseDown;

   if(document.getElementById('sidepanel-feed') === null) return;
   document.getElementById('sidepanel-feed').addEventListener("click", uroRefilterFeedItems);
   if(document.getElementsByClassName('feed-load-more').length === 0) return;
   document.getElementsByClassName('feed-load-more')[0].addEventListener("click", uroLoadMoreFeedItems);
   if(document.getElementsByClassName('feed-refresh').length === 0) return;
   document.getElementsByClassName('feed-refresh')[0].addEventListener("click", uroRefreshFeedItems);
   uroLoadFeedItems();

   W.map.events.register("mouseup", null, uroMouseUp);
   W.map.events.register("mouseout", null, uroMouseOut);

   uroSetSectionTabStyles();

   uroAddFeedFilterControls(true);
   uroLoadSettings();
   uroAddFeedFilterControls(false);
   uroAddLog('feed filter controls initalised');

   if(uroGetCBChecked('_cbEnableDTE'))
   {
      uroAddLog('initialising DTE...');
      if(dteControls != null)
      {
         dteSetNewTabLength();
      }
      else
      {
         uroAddLog('ERROR - archive panel not found!');
         uroSetStyleDisplay(uroUserTabId,'');
      }
      uroAddLog('...done');
   }

   uroAddLog('show UR tab');
   uroShowURTab();
   uroAddLog('getting user ID...');
   uroUserID = W.loginManager.user.id;
   uroAddLog('...ID is '+uroUserID);
   uroAddLog('filtering...');
   uroFilterItems();
   uroAddLog('...done');
   uroShowDebugOutput = uroPersistentDebugOutput;
   var dbgMode = "none";
   if(uroShowDebugOutput)
   {
      dbgMode = "inline";
   }
   document.getElementById('_uroDebugMode').style.display = dbgMode;
   uroAddEventListener('_uroVersion',"click", uroToggleDebug, true);

   // add exclusiveCB click handlers to all checkboxes with a pairedWith attribute
   uroAddLog('adding exclusiveCB handlers...');
   var cbList = document.getElementsByTagName('input');
   for (var optIdx=0;optIdx<cbList.length;optIdx++)
   {
      if((cbList[optIdx].id.indexOf('_cb') === 0) && (cbList[optIdx].attributes.pairedWith != null))
      {
         uroSetOnClick(cbList[optIdx].id,uroExclusiveCB);
      }
   }
   uroAddLog('...done');

   window.onresize = uroWindowResizeHandler;

   // manually call the layer-change handlers on startup, since there's a good chance WME will already have
   // completed its own startup layer changes before our handlers get registered, preventing the marker handlers
   // from being set up as expected on any markers which are visible in the startup map view before the user forces
   // a layer update by panning/zooming/etc...
   uroMCLayerChanged();
   uroPlaceLayerChanged();
   uroURLayerChanged();
   uroMPLayerChanged();
   uroPURLayerChanged();
   uroCamLayerChanged();
   uroNodeLayerChanged();
   uroPPULayerChanged();
   uroRPULayerChanged();
   uroClosuresLayerChanged();

   uroWindowResizeHandler();

   uroSetupListeners = false;
   uroMainTickStage = 0;
   clearInterval(uroMainTickHandlerID);
   setInterval(uroMainTick, 10);

   uroInitialised = true;
}

function uroTSTPopupHandler()
{
   if(document.getElementsByClassName('panel')[0] === undefined)
   {
      uroHidePopupOnPanelOpen = true;
   }

   if(uroPopupShown === true)
   {
      var hidePopup = false;

      if(document.getElementById('layer-switcher-pinned-input').checked === false)
      {
         hidePopup = Boolean(hidePopup || (document.getElementsByClassName('menu not-visible').length === 0));
      }
      hidePopup = Boolean(hidePopup || (document.getElementsByClassName('toolbar-group open').length > 0));

      if(document.getElementsByClassName('panel')[0] != null)
      {
         if(uroHidePopupOnPanelOpen === true)
         {
            hidePopup = true;
            uroHidePopupOnPanelOpen = false;
         }
      }

      if(hidePopup === true)
      {
         uroHidePopup('uroTSTPopupHandler 1');
      }
   }

   if((uroAreaNameHoverObj !== null) && (uroAreaNameHoverTime != -1) && (uroAreaNameOverlayShown === false))
   {
      if(++uroAreaNameHoverTime > 5)
      {
         uroAreaNameOverlaySetup();
      }
   }
   uroReplaceAreaNames(false);

   if(uroPopupAutoHideTimer > 0)
   {
      if(--uroPopupAutoHideTimer === 0)
      {
         uroHidePopup('uroTSTPopupHandler 2');
      }
   }

   if(uroPopupTimer > 0)
   {
      if(uroMouseInPopup === false)
      {
         uroPopupTimer--;
      }
   }
   if(uroPopupTimer === 0)
   {
      uroHidePopup('uroTSTPopupHandler 3');
   }

   if(uroPopupDwellTimer > 0)
   {
      uroPopupDwellTimer--;
      if(uroPopupDwellTimer === 0)
      {
         uroNewLookHighlightedItemsCheck('dwellTimeout');
      }
   }
}

function uroTSTDTEHandler()
{
   if(document.getElementsByClassName("archive-panel")[0] === undefined)
   {
      if(dteClearHighlightsOnPanelClose)
      {
         dteClearListHighlight();
         dteClearHighlightsOnPanelClose = false;
      }
   }
   else
   {
      if(dteArmClearHighlightsOnPanelClose)
      {
         dteArmClearHighlightsOnPanelClose = false;
         dteClearHighlightsOnPanelClose = true;
      }
   }
}

function uroTSTNextBtnHandler()
{
   // replaces the "next xxx" button on UR, MP and PUR editing UIs

   // Correctly determining what WME is displaying for the "next" button in the UR/MP/(P)PUR panel is not trivial due to
   // inconsistencies in the panel behaviour depending on whether it was opened by clicking directly on the relevant
   // marker, or by clicking on the associated feed entry...  For PURs, there's also the added complication of multi-part
   // update requests, where the same marker/panel are used to access more than one request and where, therefore, we need
   // to enable access to all requests contained within the PUR, but still inhibit the "next" button once the last
   // request in the multi-part sequence has been viewed.
   //
   // For directly-accesed markers, the "next" button caption is:
   //
   //    URs   = "Next update request" (update_requests.panel.next)
   //    MPs   = "Next map problem" (problems.panel.next)
   //    PURs  = "Next place" for single-part PURs or for the last part of a multi-part PUR (venues.update_requests.panel.next_venue)
   //          = "Next" for all but the last part of a multi-part PUR (venues.update_requests.panel.next)
   //    PPURs = "Next place" (venues.update_requests.panel.next_venue)
   //
   // For markers accessed via the feed, the "next" button caption always appears to be "Next issue" (feed.issues.next)



   if(W.map.panelRegion.hasView() === true)
   {
      var nurButton = W.map.panelRegion.$el[0].getElementsByClassName('next')[0];
      if(nurButton === undefined)
      {
         nurButton = W.map.panelRegion.$el[0].getElementsByClassName('next-venue')[0];
      }
      if(nurButton !== undefined)
      {
         var doneString = I18n.lookup('problems.panel.done');
         var btnCaptionIsNextPlace = (nurButton.innerHTML.indexOf(I18n.lookup('venues.update_requests.panel.next_venue')) !== -1);
         var btnCaptionIsDefaultUR = (nurButton.innerHTML.indexOf(I18n.lookup('update_requests.panel.next')) !== -1);
         var btnCaptionIsDefaultMP = (nurButton.innerHTML.indexOf(I18n.lookup('problems.panel.next')) !== -1);
         var btnCaptionIsNextIssue = (nurButton.innerHTML.indexOf(I18n.lookup('feed.issues.next')) !== -1);

         var updateButton = false;

         var panelClass = W.map.panelRegion.$el[0].childNodes[0].childNodes[0].className;
         var isURorMPPanel = (panelClass.indexOf('problem-edit') !== -1);
         var isPURPanel = (panelClass.indexOf('place-update') !== -1);

         if(isURorMPPanel === true)
         {
            // user has enabled UR button mod?
            if(uroGetCBChecked('_cbInhibitNURButton') === true)
            {
               // the native UR panel button will always either be "Next update request" or "Next issue"
               updateButton = ((btnCaptionIsDefaultUR) || (btnCaptionIsNextIssue));
            }

            // user has enabled MP button mod?
            if(uroGetCBChecked('_cbInhibitNMPButton') === true)
            {
               // there's no way to determine if the edit panel has been opened for a UR or a MP, however as MPs
               // don't currently appear in the feed, the native button only uses "Next map problem" as its caption
               updateButton = (updateButton || btnCaptionIsDefaultMP);
            }
         }
         else if(isPURPanel === true)
         {
            if(uroGetCBChecked('_cbInhibitNPURButton') === true)
            {
               // for a (P)PUR, only modify the button if it's showing the "Next place" or "Next issue" caption, to
               // avoid messing up the "Next" button used to move to the next part of a multi-part PUR...
               updateButton = ((btnCaptionIsNextPlace === true) || (btnCaptionIsNextIssue));
            }
         }

         if(updateButton === true)
         {
            uroAddLog('inhibit Next UR/MP/PUR button');

            // alter the button caption
            nurButton.innerHTML = doneString;
            // Add a new click handler to override the native one - this acts both to prevent the normal action of the "Next UR/MP/PUR" button in
            // moving to the next UR/MP/PUR, and also allows us to warn about closing the UR panel if there's an unsent comment...
            nurButton.addEventListener("click", uroInhibitNextUpdateRequestButton, false);
         }
      }
   }
}

function uroTSTCommentAddedHandler()
{
   // test for the opening or closing of the UR editing dialog so we can detect when a new comment is added
   var URDialogIsOpen = false;
   var panelOpen = (document.getElementById('panel-container').firstChild !== null);
   if(panelOpen)
   {
      URDialogIsOpen = (document.getElementById('panel-container').getElementsByClassName('conversation').length > 0);
   }

   if(URDialogIsOpen)
   {
      var thisSelectedURID = document.getElementsByClassName('permalink')[0].href.split('&mapUpdateRequest=');
      if(thisSelectedURID.length > 1)
      {
         thisSelectedURID = thisSelectedURID[1].split('&')[0];
      }
      else
      {
         thisSelectedURID = null;
      }

      if(thisSelectedURID != uroSelectedURID)
      {
         // if the user selects a new UR whilst the editing dialog is still open, treat it in the
         // same way as if the user had selected that UR with the dialog closed
         uroURDialogIsOpen = false;
         uroSelectedURID = null;
      }



      if(((uroURDialogIsOpen === false) && (uroSelectedURID === null)) || (uroURReclickAttempts > 0))
      {
         // user is editing a new UR

          // add our own click event handler to the Send button, so we can do stuff whenever a new comment is added
         if(document.getElementsByClassName('new-comment-form').length > 0)
         {
            if(document.getElementsByClassName('new-comment-form')[0].getElementsByClassName('send-button').length > 0)
            {
               document.getElementsByClassName('new-comment-form')[0].getElementsByClassName('send-button')[0].addEventListener("click", uroAddedComment, false);

               uroSelectedURID = thisSelectedURID;
               uroAddLog('user is editing UR '+uroSelectedURID);
               uroExpectedCommentCount = W.model.updateRequestSessions.objects[uroSelectedURID].comments.length;

                if((uroHoveredURID !== null) && (uroSelectedURID !== null) && (parseInt(uroHoveredURID) !== parseInt(uroSelectedURID)))
                {
                    if(uroURReclickAttempts === 0)
                    {
                        uroAddLog('DANGER, WILL ROBINSON!  You clicked on UR ID '+uroHoveredURID+' but WME has loaded the details for UR ID '+uroSelectedURID+' instead, attempting to fix...');
                    }
                    if(++uroURReclickAttempts < 3)
                    {
                        //uroRestackMarkers();
                        W.map.updateRequestLayer.markers[uroHoveredURID].model.attributes.geometry.x = W.map.updateRequestLayer.markers[uroHoveredURID].model.attributes.geometry.realX;
                        W.map.updateRequestLayer.markers[uroHoveredURID].model.attributes.geometry.y = W.map.updateRequestLayer.markers[uroHoveredURID].model.attributes.geometry.realY;
                        //W.map.updateRequestLayer.markers[uroHoveredURID].icon.$div.click();
                        uroOpenURDialog(uroHoveredURID);
                        return;
                    }
                    else
                    {
                        uroAddLog('Woe is me, attempting to open UR ID '+uroHoveredURID+' has failed...');
                        uroShowAlertBox('fa-warning', 'URO+ Warning', 'WME may have opened the details panel for a different UR to the one you selected, proceed with caution', false, "OK", "", null, null);
                    }
                }
                uroURReclickAttempts = 0;

                uroFilterURs();
            }
         }
      }
   }
   else if(uroURDialogIsOpen === true)
   {
      // dialog was open and has now been closed
      uroSelectedURID = null;
      uroFilterURs();
   }
   uroURDialogIsOpen = URDialogIsOpen;

   if(((uroPendingCommentDataRefresh === true) || (uroWaitingCommentDataRefresh === true)) && (uroSelectedURID !== null))
   {
      uroAddLog('check completion of comment data refresh for UR '+uroSelectedURID+' ('+uroPendingCommentDataRefresh+','+uroWaitingCommentDataRefresh+')');
      uroGetSelectedURCommentCount();
   }

}

function uroTSTOWLHandler()
{
/*
   var selectedTotal = uroSelectedItems.length;
   if((selectedTotal > 0) && (document.getElementById('_uroDivOWLBtns') === null))
   {
      var selectedClass = uroSelectedItems[0].model.CLASS_NAME;
      var displayAddToOWLBtn = false;
      var displayUpdateOWLBtn = false;
      var displayRemoveFromOWLBtn = false;
      var selectedSegments = false;
      var selectedLandmarks = false;
      var fid;
      var loop;

      // WME only seems to allow multi-object selections for segments, so testing the class of the first object in the
      // selection list tells us the class of any other objects in the list too...
      if(selectedClass.indexOf("Feature.Vector.Segment") != -1)
      {
         selectedSegments = true;
         for(loop=0; loop<selectedTotal; loop++)
         {
            fid = uroSelectedItems[loop].model.attributes.id;
            var segIdx = uroIsSegOnWatchList(fid);
            if(segIdx == -1)
            {
               displayAddToOWLBtn = true;
            }
            else
            {
               if(uroSegDataChanged(segIdx))
               {
                  displayUpdateOWLBtn = true;
               }
               displayRemoveFromOWLBtn = true;
            }
         }
      }

      else if(selectedClass.indexOf("Feature.Vector.Landmark") != -1)
      {
         selectedLandmarks = true;
         for(loop=0; loop<selectedTotal; loop++)
         {
            fid = uroSelectedItems[loop].model.attributes.id;
            var placeIdx = uroIsPlaceOnWatchList(fid);
            if(placeIdx == -1)
            {
               displayAddToOWLBtn = true;
            }
            else
            {
               if(uroPlaceDataChanged(placeIdx))
               {
                  displayUpdateOWLBtn = true;
               }
               displayRemoveFromOWLBtn = true;
            }
         }
      }

      var btnHTML = '<div id="_uroDivOWLBtns">';
      if((displayAddToOWLBtn === true) && (displayUpdateOWLBtn === false))
      {
         btnHTML += '<button class="btn btn-default" id="_btnAddUpdateOWL">Add to OWL</button>';
      }
      else if((displayUpdateOWLBtn === true) && (displayAddToOWLBtn === false))
      {
         btnHTML += '<button class="btn btn-default" id="_btnAddUpdateOWL">Update OWL</button>';
      }
      else if((displayAddToOWLBtn === true) && (displayUpdateOWLBtn === true))
      {
         btnHTML += '<button class="btn btn-default" id="_btnAddUpdateOWL">Add to & Update OWL</button>';
      }

      if(displayRemoveFromOWLBtn === true)
      {
         btnHTML += '<button class="btn btn-default" id="_btnRemoveOWL">Remove from OWL</button>';
      }
      btnHTML += '</div>';

      // note to self...  altering the inner HTML of the segment-edit-general panel when the selected
      // segment is part of a roundabout always used to disable the onclick handler for the select
      // roundabout button.  will need to see how this behaves in the current WME given the changes in
      // panel arrangement and the introduction of the native select roundabout button
      if(selectedSegments === true)
      {
         document.getElementById("segment-edit-general").innerHTML += btnHTML;
      }
      else if(selectedLandmarks === true)
      {
         document.getElementById("landmark-edit-general").innerHTML += btnHTML;
      }

      if((displayAddToOWLBtn === true)||(displayUpdateOWLBtn === true))
      {
         if(selectedSegments === true)
         {
            uroAddEventListener('_btnAddUpdateOWL','click', uroAddUpdateSegWatchList, true);
         }
         else
         {
            uroAddEventListener('_btnAddUpdateOWL','click', uroAddUpdatePlaceWatchList, true);
         }
      }

      if(displayRemoveFromOWLBtn === true)
      {
         if(selectedSegments === true)
         {
            uroAddEventListener('_btnRemoveOWL','click', uroRemoveSegFromWatchList, true);
         }
         else
         {
            uroAddEventListener('_btnRemoveOWL','click', uroRemovePlaceFromWatchList, true);
         }
      }
   }
*/
}

function uroTSTClosureCloningHandler()
{
   // closure cloning support...
   //
   // has the closures tab been generated?
   if(document.getElementById('segment-edit-closures') !== null)
   {
      // and is it active?
      if(document.getElementById('segment-edit-closures').className === 'tab-pane active')
      {
         // and are there any closures defined for all of the selected segment(s)...
         if(document.getElementsByClassName('full-closures').length > 0)
         {
            var nClosures = document.getElementsByClassName('full-closures')[0].childNodes.length;
            if(nClosures > 0)
            {
               // and last but by no means least, have we already added the clone icon to this closure?
               for(var cLoop = 0; cLoop < nClosures; cLoop++)
               {
                  var btnElm = document.getElementsByClassName('full-closures')[0].childNodes[cLoop].children[0].children[0];

                  if(btnElm.innerHTML.indexOf('_uroCloneClosure-') == -1)
                  {
                     var newAnchor = document.createElement('a');
                     var anchorID = '_uroCloneClosure-'+cLoop;
                     newAnchor.href="#";
                     newAnchor.innerHTML = "<i class='fa fa-copy'></i>";
                     newAnchor.id = anchorID;
                     btnElm.appendChild(newAnchor);
                     uroAddEventListener(anchorID,"click",uroCloneClosure,false);
                  }
               }
            }
         }
         // if there's more than one closure (full or partial) listed, also add the delete all button if not already present...
         if(document.getElementsByClassName('closure-item').length > 1)
         {
            if(document.getElementById('_btnDeleteAllClosures') === null)
            {
               var daDiv = document.createElement('div');
               daDiv.className = 'delete-all-button btn btn-primary';
               daDiv.id = '_btnDeleteAllClosures';

               daDiv.innerHTML = '<i class="fa fa-trash"></i> '+I18n.lookup("closures.delete_confirm_no_reason")+' ('+I18n.lookup("closures.apply_to_all")+')';
               daDiv.style.width = '100%';
               daDiv.style.marginBottom = '10px';

               var acBtn = document.getElementsByClassName('add-closure-button')[0];
               acBtn.parentNode.insertBefore(daDiv, acBtn.nextSibling);
               uroAddEventListener('_btnDeleteAllClosures',"click", uroDeleteAllClosures, false);
            }
         }
      }
   }
}

function uroMiscUITweaksHandler()
{
   if(uroFilterPreamble())
   {
      // give user the option of setting their own background colour...
      {
         var mapviewport = document.getElementById("WazeMap").getElementsByClassName("olMapViewport")[0];
         if((uroGetCBChecked('_cbWhiteBackground') === true) && (uroGetCBChecked('_cbMasterEnable') === true))
         {
            var customColour = '#' + uroToHex(uroGetElmValue('_inputCustomBackgroundRed'),2);
            customColour += uroToHex(uroGetElmValue('_inputCustomBackgroundGreen'),2);
            customColour += uroToHex(uroGetElmValue('_inputCustomBackgroundBlue'),2);
            mapviewport.style.setProperty('background',customColour,'important');
         }
         else
         {
            mapviewport.style.setProperty('background',"#354148",'important');
         }
      }

      // allows user to hide the area managers layer without switching off the layer completely...
      {
         // ...if this sounds like a weird option - why not just switch off the layer from the layers menu? - then
         // remember that in order for URO+ to be able to display in its own tab the list of AMs under the current
         // mouse pointer location, which is somewhat more useful than the list given in the topbar, it needs the
         // AM layer to be activated so that the AM areas data is loaded into WME.  It doesn't however need the layer
         // to then be visible, and since having a bunch of purple polygons covering the map can make for a rather
         // difficult editing experience, being able to hide the polys whilst retaining the area information is
         // of real benefit...
         if((uroGetCBChecked('_cbHideAMLayer')) && (uroGetCBChecked('_cbMasterEnable')))
         {
            W.map.managedAreasLayer.setOpacity(0);
         }
         else
         {
            W.map.managedAreasLayer.setOpacity(1);
         }
      }

      // gives user the option of minimising the size of the sidebar tabs to save space
      {
         if(!uroGetCBChecked('_cbDisableTabStyling'))
         {
            // The nav-tabs class is now also used for the General/Closures tabs on the segment edit panel, so we have
            // to restrict the scope of this code to just those nav-tab classed elements within the user-tabs element.
            var navTabs = document.getElementById('user-tabs').getElementsByClassName("nav-tabs")[0].children;
            for(var loop = 0; loop<navTabs.length; loop++)
            {
               navTabs[loop].children[0].style.padding = "4px";
            }
         }
      }

      // gives user the option of hiding the somewhat unnecessary editor info panel at the top of the sidebar
      {
         var panelDisplay = '';
         if(uroGetCBChecked('_cbHideEditorInfo'))
         {
            panelDisplay = "none";
         }
         document.getElementById("user-details").style.display = panelDisplay;
      }

      // gives user the option of hiding the vector segments when the raster segment layer is hidden
      {
         if(uroGetCBChecked('_cbHideSegmentsWhenRoadsHidden'))
         {
            W.map.segmentLayer.drawn = W.map.roadLayers[0].visibility;
            W.map.nodeLayer.drawn = W.map.roadLayers[0].visibility;
         }
         else
         {
            W.map.segmentLayer.drawn = true;
            W.map.nodeLayer.drawn = true;
         }
      }

      var tDesc;
      // reformats the comment body text whenever the map comments sidepanel is opened, so that any linebreaks
      // added to the body text when the comment was created, and which are available in the W.model. data for
      // WME itself to include if only it could be arsed to do so, are included in the sidepanel rendering of
      // the text...
      {
         if(document.getElementsByClassName('map-comment-feature-editor').length > 0)
         {
            if(document.getElementsByClassName('map-comment-feature-editor')[0].touchedByURO === undefined)
            {
               if(document.getElementsByClassName('body-preview').length > 0)
               {
                  var mcID = -1;
                  if(uroFID == -1)
                  {
                     // if uroFID is -1, this implies the map comment panel has been opened as the result of WME
                     // being started up with a map comment included in the URL...
                     mcID = document.location.href.split('&mapComments=')[1];
                     if(mcID === undefined)
                     {
                        mcID = -1;
                     }
                  }
                  else
                  {
                     mcID = uroFID;
                  }
                  if(mcID !== -1)
                  {
                     if(W.model.mapComments.objects[mcID] !== undefined)
                     {
                        if(W.model.mapComments.objects[mcID].attributes !== undefined)
                        {
                           tDesc = W.model.mapComments.objects[mcID].attributes.body;
                           tDesc = uroClickify(tDesc, '');
                           document.getElementsByClassName('body-preview')[0].innerHTML = tDesc;
                           document.getElementsByClassName('map-comment-feature-editor')[0].touchedByURO = true;
                        }
                     }
                  }
               }
            }
         }
      }

      // clickifies the ExtraInfo URL present in some MPs
      {
         if(document.getElementById('panel-container').getElementsByClassName('extraInfo').length > 0)
         {
            if(document.getElementById('panel-container').getElementsByClassName('extraInfo')[0].touchedByURO === undefined)
            {
               tDesc = document.getElementById('panel-container').getElementsByClassName('extraInfo')[0].innerHTML;
               tDesc = uroClickify(tDesc, '');
               document.getElementById('panel-container').getElementsByClassName('extraInfo')[0].innerHTML = tDesc;
               document.getElementById('panel-container').getElementsByClassName('extraInfo')[0].touchedByURO = true;
            }
         }
      }

      if(W.map.getZoom() != uroLastZoom)
      {
         uroLastZoom = W.map.getZoom();
         uroMCLayerChanged();
      }
   }
}

function uroGetDirectionString(isForward)
{
   if(isForward === true)
   {
      return 'A-B';
   }
   else
   {
      return 'B-A';
   }
}


function uroGetVehicleDescription(vehicleType)
{
   var retval = null;
   var i18nLookup = null;
   if(vehicleType === 0) i18nLookup = "TRUCK";
   else if(vehicleType === 256) i18nLookup = "PUBLIC_TRANSPORTATION";
   else if(vehicleType === 272) i18nLookup = "TAXI";
   else if(vehicleType === 288) i18nLookup = "BUS";
   else if(vehicleType === 512) i18nLookup = "RV";
   else if(vehicleType === 768) i18nLookup = "TOWING_VEHICLE";
   else if(vehicleType === 1024) i18nLookup = "MOTORCYCLE";
   else if(vehicleType === 1280) i18nLookup = "PRIVATE";
   else if(vehicleType === 1536) i18nLookup = "HAZARDOUS_MATERIALS";
   else if(vehicleType === 1792) i18nLookup = "CAV";
   else if(vehicleType === 1808) i18nLookup = "EV";
   else if(vehicleType === 1824) i18nLookup = "HYBRID";
   else if(vehicleType === 1840) i18nLookup = "CLEAN_FUEL";
   if(i18nLookup !== null)
   {
      retval = I18n.lookup("restrictions.vehicle_types."+i18nLookup);
   }
   return retval;
}
function uroFormatTBRDetails(tbrObj)
{
   var retval = '';
   if(tbrObj.description !== null)
   {
      retval += '&nbsp;&nbsp;Reason: ' + tbrObj.description + '<br>';
   }

   if(tbrObj.timeFrames.length > 0)
   {
      retval += '&nbsp;&nbsp;Dates: ';
      if(tbrObj.timeFrames[0].startDate === null)
      {
         retval += 'all dates';
      }
      else
      {
         retval += tbrObj.timeFrames[0].startDate + ' to ' + tbrObj.timeFrames[0].endDate;
      }
      retval += '<br>';

      retval += '&nbsp;&nbsp;Days: ';
      if(tbrObj.timeFrames[0].weekdays & (1<<0)) retval += 'S';
      else retval += '-';
      if(tbrObj.timeFrames[0].weekdays & (1<<1)) retval += 'M';
      else retval += '-';
      if(tbrObj.timeFrames[0].weekdays & (1<<2)) retval += 'T';
      else retval += '-';
      if(tbrObj.timeFrames[0].weekdays & (1<<3)) retval += 'W';
      else retval += '-';
      if(tbrObj.timeFrames[0].weekdays & (1<<4)) retval += 'T';
      else retval += '-';
      if(tbrObj.timeFrames[0].weekdays & (1<<5)) retval += 'F';
      else retval += '-';
      if(tbrObj.timeFrames[0].weekdays & (1<<6)) retval += 'S';
      else retval += '-';
      retval += '<br>';

      retval += '&nbsp;Timespan: ';
      if(tbrObj.timeFrames[0].fromTime === null)
      {
         retval += 'all day';
      }
      else
      {
         retval += tbrObj.timeFrames[0].fromTime + ' to ' + tbrObj.timeFrames[0].toTime;
      }
      retval += '<br>';
   }

   var vtLength = 0;
   var i;
   if(tbrObj.driveProfiles.BLOCKED !== undefined)
   {
      vtLength = tbrObj.driveProfiles.BLOCKED[0].vehicleTypes.length;
      if(vtLength > 0)
      {
         retval += '&nbsp;Vehicle types prohibited:<br>';
         for(i=0; i<vtLength; i++)
         {
            retval += '&nbsp;&nbsp;'+uroGetVehicleDescription(tbrObj.driveProfiles.BLOCKED[0].vehicleTypes[i])+'<br>';
         }
      }
   }
   else if(tbrObj.driveProfiles.FREE !== undefined)
   {
      vtLength = tbrObj.driveProfiles.FREE[0].vehicleTypes.length;
      if(vtLength > 0)
      {
         retval += '&nbsp;Vehicle types allowed:<br>';
         for(i=0; i<vtLength; i++)
         {
            retval += '&nbsp;&nbsp;'+uroGetVehicleDescription(tbrObj.driveProfiles.FREE[0].vehicleTypes[i])+'<br>';
         }
      }
   }
   else if(tbrObj.defaultType === "BLOCKED")
   {
      retval += '&nbsp;Blocked for all vehicle types<br>';
   }

   if(tbrObj.defaultType === "DIFFICULT")
   {
      retval += '&nbsp;Difficult Turn<br>';
   }

   return retval;
}
function uroFormatClosureReason(rData)
{
   var retval = "";
   if(rData == null)
   {
      retval = "<i>not provided</i>";
   }
   else
   {
      retval = rData;
   }
   return retval;
}
function uroFormatClosureMTE(mData)
{
   var retval = "";
   if(mData == null)
   {
      retval = "<i>not provided</i>";
   }
   else if(W.model.majorTrafficEvents.objects[mData] === undefined)
   {
      retval = "<i>data not available</i>";
   }
   else
   {
      retval = W.model.majorTrafficEvents.objects[mData].attributes.names[0].value;
   }
   return retval;
}
function uroFormatClosureDetails(cObjA, cObjB)
{
   var retval = '';
   if(cObjB === null)
   {
      retval += 'Reason: ' + uroFormatClosureReason(cObjA.reason) + '<br>';
      retval += 'MTE: ' + uroFormatClosureMTE(cObjA.eventId) + '<br>';
      retval += 'From: ' + cObjA.startDate + '<br>';
      retval += 'To: ' + cObjA.endDate + '<br>';
      retval += 'Direction: ' + uroGetDirectionString(cObjA.forward) + '<br>';
      retval += 'Ignore traffic: ' + cObjA.permanent;
   }
   else
   {
      if(cObjA.reason !== cObjB.reason)
      {
         retval += 'Reason: ' + uroFormatClosureReason(cObjA.reason);
         retval += ' <i>\>\>\> ' + uroFormatClosureReason(cObjB.reason) + '</i><br>';
      }
      if(cObjA.eventId !== cObjB.eventId)
      {
         retval += 'MTE: ' + uroFormatClosureMTE(cObjA.eventId);
         retval += ' <i>\>\>\> ' + uroFormatClosureMTE(cObjB.eventId) + '</i><br>';
      }
      if(cObjA.startDate !== cObjB.startDate)
      {
         retval += 'From: ' + cObjA.startDate;
         retval += ' <i>\>\>\> ' + cObjB.startDate + '</i><br>';
      }
      if(cObjA.endDate !== cObjB.endDate)
      {
         retval += 'To: ' + cObjA.endDate;
         retval += ' <i>\>\>\> ' + cObjB.endDate + '<i><br>';
      }
      if(cObjA.forward !== cObjB.forward)
      {
         retval += 'Direction: ' + uroGetDirectionString(cObjA.forward);
         retval += ' <i>\>\>\> ' + uroGetDirectionString(cObjB.forward) + '</i><br>';
      }
      if(cObjA.permanent !== cObjB.permanent)
      {
         retval += 'Ignore traffic: ' + cObjA.permanent;
         retval += ' <i>\>\>\> ' + cObjB.permanent + '</i><br>';
      }
   }
   return retval;
}
function uroGetTIOString(tioValue)
{
   var retval = I18n.lookup("turn_tooltip.instruction_override.no_opcode");
   if(tioValue !== null)
   {
      retval = I18n.lookup("turn_tooltip.instruction_override.opcodes." + tioValue);
   }
   return retval;
}
function uroSegmentHistoryNameString(segID)
{
   var retval = '';
   if(W.model.segments.objects[segID] !== undefined)
   {
      if(W.model.segments.objects[segID].attributes.primaryStreetID !== undefined)
      {
         var sID = W.model.segments.objects[segID].attributes.primaryStreetID;
         if(W.model.streets.objects[sID].name === null)
         {
            retval += 'unnamed segment';
         }
         else
         {
            retval += W.model.streets.objects[sID].name;
         }
      }
      else
      {
         retval += 'unnamed segment';
      }
   }
   else
   {
      retval += 'unknown segment';
   }
   retval += ' (ID ' + segID + ')';
   return retval;
}
function uroTSTEnhanceSegmentHistory(nextTransactionID)
{
   if(uroSelectedItems.length === 1)
   {
      if(uroSelectedItems[0].model.type === "segment")
      {
         if((uroSelectedItems[0].model.attributes.id !== uroEnhanceHistorySegID) || (nextTransactionID !== null))
         {
            uroEnhanceHistorySegID = uroSelectedItems[0].model.attributes.id;
            var historyURL = 'https://' + document.location.host;
            historyURL += W.Config.api_base;
            historyURL += '/ElementHistory?objectID=' + uroEnhanceHistorySegID + '&objectType=segment';
            if(nextTransactionID !== null)
            {
               historyURL += '&till=' + nextTransactionID;
            }
            uroAddLog('requesting edit history for segment '+uroEnhanceHistorySegID);
            if(nextTransactionID === null)
            {
               uroSegHistoryDetails = null;
               uroSegHistoryEntries = 0;
            }

            var historyReq = new XMLHttpRequest();
            historyReq.onreadystatechange = function()
            {
               if(historyReq.readyState == 4)
               {
                  uroAddLog('segment history data request, response '+historyReq.status+' received');
                  if(historyReq.status == 200)
                  {
                     if(historyReq.responseText !== "")
                     {
                        var nextTransaction = null;
                        if(uroSegHistoryDetails === null)
                        {
                           uroSegHistoryDetails = JSON.parse(historyReq.responseText);
                           nextTransaction = uroSegHistoryDetails.transactions.nextTransaction;
                        }
                        else
                        {
                           var nextDetails = JSON.parse(historyReq.responseText);
                           uroSegHistoryDetails.users.objects = uroSegHistoryDetails.users.objects.concat(nextDetails.users.objects);
                           uroSegHistoryDetails.transactions.objects = uroSegHistoryDetails.transactions.objects.concat(nextDetails.transactions.objects);
                           nextTransaction = nextDetails.transactions.nextTransaction;
                        }

                        if(nextTransaction !== null)
                        {
                           uroAddLog('segment has more history details available, getting those now...');
                           uroTSTEnhanceSegmentHistory(nextTransaction);
                        }
                        else
                        {
                           uroAddLog('segment history request complete');
                           uroSegHistoryLoaded = true;
                        }
                     }
                     else
                     {
                     }
                  }
               }
            };
            historyReq.open('GET',historyURL,true);
            historyReq.send();
            uroSegHistoryLoaded = false;
         }

         if((document.getElementsByClassName('historyContent').length === 1) && (uroSegHistoryLoaded === true))
         {
            if(document.getElementsByClassName('historyContent')[0].style.display === "")
            {
               var historyLength = document.getElementsByClassName('tx-header').length;
               if((historyLength !== uroSegHistoryEntries) && (uroSegHistoryDetails.transactions.objects.length >= historyLength))
               {
                  if(uroSegHistoryEntries === 0)
                  {
                     uroAddLog('segment history list is open, do something fun...');
                  }
                  else
                  {
                     uroAddLog('more history loaded for segment...');
                  }

                  var tHTML;
                  for(var i=0; i<historyLength; i++)
                  {
                     var historyEntry = document.getElementsByClassName('element-history-item')[i];
                     var elmOffset = 0;

                     for(var j=0; j<uroSegHistoryDetails.transactions.objects[i].objects.length; j++)
                     {
                        tHTML = '';
                        var tObj = uroSegHistoryDetails.transactions.objects[i].objects[j];
                        var aType = tObj.actionType;
                        var oType = tObj.objectType;

                        if(oType === "nodeConnection")
                        {
                           var outboundTR = (tObj.objectID.fromSegID === uroEnhanceHistorySegID);
                           if(outboundTR === true)
                           {
                              tHTML += '<b>Outbound turn:</b> ';
                           }
                           else
                           {
                              tHTML += '<b>Inbound turn:</b> ';
                           }
                           if(aType == "DELETE") tHTML += 'disabled';
                           else if(aType == "ADD") tHTML += 'enabled';
                           tHTML += ' from ';

                           if(outboundTR === true)
                           {
                              tHTML += 'node ';
                              if(tObj.objectID.fromSegFwd === true)
                              {
                                 tHTML += 'B';
                              }
                              else
                              {
                                 tHTML += 'A';
                              }
                              tHTML += ' to ';
                              tHTML += uroSegmentHistoryNameString(tObj.objectID.toSegID);
                           }
                           else
                           {
                              tHTML += uroSegmentHistoryNameString(tObj.objectID.fromSegID);
                              tHTML += ' to node ';
                              if(tObj.objectID.toSegFwd === true)
                              {
                                 tHTML += 'A';
                              }
                              else
                              {
                                 tHTML += 'B';
                              }
                           }
                           if(aType === "UPDATE")
                           {
                              if((tObj.oldValue !== undefined) && (tObj.newValue !== undefined))
                              {
                                 if(tObj.oldValue.instructionOpCode !== tObj.newValue.instructionOpCode)
                                 {
                                    tHTML += '<br><i>Instruction Override changed from '+uroGetTIOString(tObj.oldValue.instructionOpCode)+' to '+uroGetTIOString(tObj.newValue.instructionOpCode)+'</i>';
                                 }
                              }
                           }
                           else if(aType === "ADD")
                           {
                              if(tObj.newValue !== undefined)
                              {
                                 if(tObj.newValue.instructionOpCode !== null)
                                 {
                                    tHTML += '<br><i>Instruction Override set to ' + uroGetTIOString(tObj.newValue.instructionOpCode)+'</i>';
                                 }
                              }
                           }
                           else if(aType === "DELETE")
                           {
                              if(tObj.oldValue !== undefined)
                              {
                                 if(tObj.oldValue.instructionOpCode !== null)
                                 {
                                 }
                              }
                           }
                           if(aType === "UPDATE")
                           {
                              var nv;
                              var ov;
                              var hasChanged;
                              if((tObj.oldValue.restrictions !== null) && (tObj.oldValue.restrictions !== undefined))
                              {
                                 for(ov=0; ov<tObj.oldValue.restrictions.length; ov++)
                                 {
                                    hasChanged = true;
                                    if((tObj.newValue.restrictions !== null) && (tObj.newValue.restrictions.length > 0))
                                    {
                                       for(nv=0; nv<tObj.newValue.restrictions.length; nv++)
                                       {
                                          if(JSON.stringify(tObj.oldValue.restrictions[ov]) === JSON.stringify(tObj.newValue.restrictions[nv]))
                                          {
                                             hasChanged = false;
                                             break;
                                          }
                                       }
                                    }
                                    if(hasChanged === true)
                                    {
                                       tHTML += '<br><i>TBR deleted/changed:<br>';
                                       tHTML += uroFormatTBRDetails(tObj.oldValue.restrictions[ov]);
                                       tHTML += '</i>';
                                    }
                                 }
                              }
                              if((tObj.newValue.restrictions !== null) &&(tObj.newValue.restrictions !== undefined))
                              {
                                 for(nv=0; nv<tObj.newValue.restrictions.length; nv++)
                                 {
                                    hasChanged = true;
                                    if((tObj.oldValue.restrictions !== null) && (tObj.oldValue.restrictions.length > 0))
                                    {
                                       for(ov=0; ov<tObj.oldValue.restrictions.length; ov++)
                                       {
                                          if(JSON.stringify(tObj.oldValue.restrictions[ov]) === JSON.stringify(tObj.newValue.restrictions[nv]))
                                          {
                                             hasChanged = false;
                                             break;
                                          }
                                       }
                                    }
                                    if(hasChanged === true)
                                    {
                                       tHTML += '<br><i>TBR added/changed:<br>';
                                       tHTML += uroFormatTBRDetails(tObj.newValue.restrictions[nv]);
                                       tHTML += '</i>';
                                    }
                                 }
                              }
                              if((tObj.oldValue.navigable !== null) && (tObj.oldValue.navigable !== undefined))
                              {
                                 if((tObj.newValue.navigable !== null) && (tObj.newValue.navigable !== undefined))
                                 {
                                    if((tObj.oldValue.navigable === false) && (tObj.newValue.navigable === true))
                                    {
                                       tHTML += '<br><i>Turn enabled</i>';
                                    }
                                    else if((tObj.oldValue.navigable === true) && (tObj.newValue.navigable === false))
                                    {
                                       tHTML += '<br><i>Turn disabled</i>';
                                    }
                                 }
                              }

                           }
                           else if(aType === "ADD")
                           {
                              if((tObj.newValue.restrictions !== null) && (tObj.newValue.restrictions.length > 0))
                              {
                                 for(var l=0; l<tObj.newValue.restrictions.length; l++)
                                 {
                                    tHTML += '<br><i>TBR set to:<br>';
                                    tHTML += uroFormatTBRDetails(tObj.newValue.restrictions[l]);
                                    tHTML += '</i>';
                                 }
                              }
                           }
                        }
                        else if(oType === "roadClosure")
                        {
                           tHTML += '<b>Road closure:</b> ';
                           var cObjA = null;
                           var cObjB = null;
                           if(aType === "ADD")
                           {
                              tHTML += 'added<br>';
                              cObjA = tObj.newValue;
                           }
                           else if(aType === "DELETE")
                           {
                              tHTML += 'deleted<br>';
                              cObjA = tObj.oldValue;
                           }
                           else if(aType === "UPDATE")
                           {
                              tHTML += 'edited<br>';
                              cObjA = tObj.oldValue;
                              cObjB = tObj.newValue;
                           }
                           tHTML += 'ID: ' + tObj.objectID + '<br>';
                           tHTML += uroFormatClosureDetails(cObjA, cObjB);
                        }

                        /*
                        // segment history changes aren't listed in tx-changed-ro elements...
                        else if(oType === "segment")
                        {
                           if(aType === "UPDATE")
                           {
                              if((tObj.oldValue !== undefined) && (tObj.newValue !== undefined))
                              {
                                 for(nv=0; nv<tObj.newValue.restrictions.length; nv++)
                                 {
                                    hasChanged = true;
                                    if((tObj.oldValue.restrictions !== null) && (tObj.oldValue.restrictions.length > 0))
                                    {
                                       for(ov=0; ov<tObj.oldValue.restrictions.length; ov++)
                                       {
                                          if(JSON.stringify(tObj.oldValue.restrictions[ov]) === JSON.stringify(tObj.newValue.restrictions[nv]))
                                          {
                                             hasChanged = false;
                                             break;
                                          }
                                       }
                                    }
                                    if(hasChanged === true)
                                    {
                                       tHTML += '<br><i>Restrictions added/changed:<br>';
                                       tHTML += '<br>Restricted lanes: '+uroGetLanes(tObj.newValue.restrictions[nv].disposition);
                                       tHTML += '<br>Restricted lane type: '+uroGetLaneType(tObj.newValue.restrictions[nv].laneType);
                                       tHTML += '</i>';
                                    }
                                 }
                              }
                           }
                        }
                        */

                        if(tHTML !== '')
                        {
                           historyEntry.getElementsByClassName('tx-changed-ro')[elmOffset++].innerHTML = tHTML + '<br>';
                        }
                     }
                  }
                  uroSegHistoryEntries = historyLength;
               }
            }
         }
      }
      else
      {
         uroEnhanceHistorySegID = null;
         uroSegHistoryDetails = null;
         uroSegHistoryEntries = 0;
      }
   }
   else
   {
      uroEnhanceHistorySegID = null;
      uroSegHistoryDetails = null;
      uroSegHistoryEntries = 0;
   }
}
function uroTSTHidePopup()
{
   var hideUI = false;
   if(document.getElementById('layer-switcher-pinned-input').checked === false)
   {
      hideUI = Boolean(hideUI || (document.getElementsByClassName('menu not-visible').length === 0));
   }
   hideUI = Boolean(hideUI || (document.getElementsByClassName('toolbar-group open').length > 0));

   if(hideUI === true)
   {
      uroHidePopup('uroTSTHidePopup');
   }
}

function uroTSTFixVenueHistoryStyling()
{
   while(document.getElementsByClassName("ca-name ca-preview").length > 0)
   {
      document.getElementsByClassName("ca-name ca-preview")[0].className = "ca-description ca-preview";
   }
}

function uroMainTick()
{
   if(uroMTEMode) return;
   if(uroSetupListeners)
   {
      if(uroFinalisingListenerSetup === false)
      {
         if(W.loginManager.isLoggedIn())
         {
            uroFinalizeListenerSetup();

            if(uroGetCBChecked('_cbMoveAMList') === false)
            {
               uroControls.appendChild(uroAMList);
            }
            else
            {
               if(document.getElementsByClassName('area-managers-region').length === 0) return;
               document.getElementsByClassName('area-managers-region')[0].innerHTML = '<div id="uroAMList" style="opacity:1;color:#c0c0ff;"></div>';
               if(document.getElementsByClassName('topbar').length === 0) return;
               document.getElementsByClassName('topbar')[0].style.backgroundColor="#000000";
            }
         }
      }
   }
   else
   {
      // grab a copy of the currently selected items list here, so that we only need to handle the production/beta API
      // differences in one place...
      if(W.selectionManager.selectedItems === undefined)
      {
         uroSelectedItems = W.selectionManager._selectedFeatures;
      }
      else
      {
         uroSelectedItems = W.selectionManager.selectedItems;
      }

      // do one maintick handler call in each 10ms cycle to minimise the time stuck within the maintick handler without
      // unduly affecting the overall response time for each individual handler
      if(uroMainTickStage === 0) uroTSTPopupHandler();
      if(uroMainTickStage == 1) uroTSTDTEHandler();
      if(uroMainTickStage == 2) uroTSTNextBtnHandler();
      if(uroMainTickStage == 3) uroTSTCommentAddedHandler();
      if(uroMainTickStage == 4) uroTSTOWLHandler();
      if(uroMainTickStage == 5) uroTSTClosureCloningHandler();
      if(uroMainTickStage == 6) uroTSTFeedFilter();
      if(uroMainTickStage == 7) uroMiscUITweaksHandler();
      if(uroMainTickStage == 8) uroTSTEnhanceSegmentHistory(null);
      if(uroMainTickStage == 9) uroTSTFixVenueHistoryStyling();
      if(uroMainTickStage == 10) uroTempFixMTEDropDown();
      if(uroMainTickStage == 11) uroTSTHidePopup();

      if(++uroMainTickStage == 12) uroMainTickStage = 0;
   }
}

function uroActiveTab(_id)
{
   var e = document.getElementById(_id);
   e.style.backgroundColor = "aliceblue";
   e.style.borderTop = "1px solid";
   e.style.borderLeft = "1px solid";
   e.style.borderRight = "1px solid";
   e.style.borderBottom = "0px solid";
}

function uroInactiveTab(_id)
{
   var e = document.getElementById(_id);
   e.style.backgroundColor = "white";
   e.style.borderTop = "0px solid";
   e.style.borderLeft = "0px solid";
   e.style.borderRight = "0px solid";
   e.style.borderBottom = "1px solid";
}

function uroInactiveAllTabs()
{
   uroInactiveTab("_tabSelectCameras");
   uroInactiveTab("_tabSelectMapProblems");
   uroInactiveTab("_tabSelectMapComments");
   uroInactiveTab("_tabSelectMisc");
   uroInactiveTab("_tabSelectUserRequests");
   uroInactiveTab("_tabSelectCWL");
   uroInactiveTab("_tabSelectPlaces");

   if(!uroCtrlsHidden)
   {
      uroSetStyleDisplay('uroCtrlURs','none');
      uroSetStyleDisplay('uroCtrlMPs','none');
      uroSetStyleDisplay('uroCtrlMCs','none');
      uroSetStyleDisplay('uroCtrlCameras','none');
      uroSetStyleDisplay('uroCtrlMisc','none');
      uroSetStyleDisplay('uroOWL','none');
      uroSetStyleDisplay('uroCtrlPlaces','none');
   }
}

function uroShowURTab()
{
   uroInactiveAllTabs();
   uroActiveTab("_tabSelectUserRequests");
   uroCurrentTab = 1;
   if(!uroCtrlsHidden) uroSetStyleDisplay('uroCtrlURs','block');
   return false;
}

function uroShowMPTab()
{
   uroInactiveAllTabs();
   uroActiveTab("_tabSelectMapProblems");
   uroCurrentTab = 2;
   if(!uroCtrlsHidden) uroSetStyleDisplay('uroCtrlMPs','block');
   return false;
}

function uroShowMCTab()
{
   uroInactiveAllTabs();
   uroActiveTab("_tabSelectMapComments");
   uroCurrentTab = 3;
   if(!uroCtrlsHidden) uroSetStyleDisplay('uroCtrlMCs','block');
   return false;
}

function uroShowPlacesTab()
{
   uroInactiveAllTabs();
   uroActiveTab("_tabSelectPlaces");
   uroCurrentTab = 4;
   if(!uroCtrlsHidden) uroSetStyleDisplay('uroCtrlPlaces','block');
   for(var idx=0;idx<uroPlacesGroupsCollapsed.length;idx++)
   {
      uroPlacesGroupCEHandler(idx);
   }
   return false;
}

function uroShowCameraTab()
{
   uroInactiveAllTabs();
   uroActiveTab("_tabSelectCameras");
   uroCurrentTab = 5;
   if(!uroCtrlsHidden) uroSetStyleDisplay('uroCtrlCameras','block');
   return false;
}

function uroShowOWLTab()
{
   uroInactiveAllTabs();
   uroActiveTab("_tabSelectCWL");
   uroCurrentTab = 6;
   if(!uroCtrlsHidden) uroSetStyleDisplay('uroOWL','block');
   uroOWLUpdateHTML();
   return false;
}

function uroShowMiscTab()
{
   uroInactiveAllTabs();
   uroActiveTab("_tabSelectMisc");
   uroCurrentTab = 7;
   if(!uroCtrlsHidden) uroSetStyleDisplay('uroCtrlMisc','block');
   return false;
}

function uroNewLookCheckDetailsRequest()
{
   var thisurl = document.location.href;
   var doRetry = true;
   var urID;
   var endmarkerpos = thisurl.indexOf('&endshow');
   var showmarkerpos = thisurl.indexOf('&showturn=');

   if((endmarkerpos != -1) && (showmarkerpos != -1))
   {
      showmarkerpos += 10;
      uroAddLog('showturn tab opened');
      urID = thisurl.substr(showmarkerpos,endmarkerpos-showmarkerpos);
      uroAddLog(' turn problem ID = '+urID);

      try
      {
         W.map.problemLayer.markers[urID].icon.imageDiv.click();
         doRetry = false;
      }
      catch(err)
      {
         uroAddLog('problems not fully loaded, retrying...');
      }

      if(doRetry) setTimeout(uroNewLookCheckDetailsRequest,500);
   }
   else
   {
      showmarkerpos = thisurl.indexOf('&showpur=');
      if((endmarkerpos != -1) && (showmarkerpos != -1))
      {
         showmarkerpos += 9;
         uroAddLog('showPUR tab opened');
         urID = thisurl.substr(showmarkerpos,endmarkerpos-showmarkerpos);
         uroAddLog(' PUR ID = '+urID);

         try
         {
            W.map.placeUpdatesLayer.markers[urID].icon.imageDiv.click();
            doRetry = false;
         }
         catch(err)
         {
            uroAddLog('PURs not fully loaded, retrying...');
         }

         if(doRetry) setTimeout(uroNewLookCheckDetailsRequest,500);
      }

      else
      {
         showmarkerpos = thisurl.indexOf('&showppur=');
         if((endmarkerpos != -1) && (showmarkerpos != -1))
         {
            showmarkerpos += 10;
            uroAddLog('showPPUR tab opened');
            urID = thisurl.substr(showmarkerpos,endmarkerpos-showmarkerpos);
            uroAddLog(' PPUR ID = '+urID);

            try
            {
               W.map.parkingPlaceUpdatesLayer.markers[urID].icon.imageDiv.click();
               doRetry = false;
            }
            catch(err)
            {
               uroAddLog('PPURs not fully loaded, retrying...');
            }

            if(doRetry) setTimeout(uroNewLookCheckDetailsRequest,500);
         }
      }
   }

}

function uroUpdateVenueEditorLists()
{
   if(Object.keys(W.model.venues.objects).length === 0) return;

   // build the list of all userIDs contained in the currently loaded venue objects
   var selectedIdx = null;
   var listedIDs = [];
   var idx;
   for(idx in W.model.venues.objects)
   {
      if(W.model.venues.objects.hasOwnProperty(idx))
      {
         var obj = W.model.venues.objects[idx].attributes;
         var cbID = obj.createdBy;
         var ubID = obj.updatedBy;

         if((cbID !== null) && (listedIDs.indexOf(cbID) == -1))
         {
            listedIDs.push(cbID);
         }
         if((ubID !== null) && (ubID !== cbID) && (listedIDs.indexOf(ubID) == -1))
         {
            listedIDs.push(ubID);
         }
      }
   }

   // check for any previously selected userIDs in the two selector lists, then clear both lists
   // and repopulate using the newly gathered ID collection from above, and finally reselect the
   // previously selected user if they're still present in the new list...
   var selector;
   var selectedUser;
   var users = W.model.users.getByIds(listedIDs);
   var selectorEntry;

   for(var i=0; i<2; i++)
   {
      if(i === 0) selector = document.getElementById('_selectPlacesUserID');
      else selector = document.getElementById('_selectHidePlacesUserID');

      selectedUser = null;
      if(selector.selectedOptions[0] != null)
      {
         selectedUser = parseInt(selector.selectedOptions[0].value);
      }
      while(selector.options.length > 0)
      {
         selector.options.remove(0);
      }
      selector.options.add(new Option('<select a user>', null));
      if(listedIDs.length > 0)
      {
         selectorEntry = '';
         for(idx=0; idx<users.length; idx++)
         {
            if(users[idx].userName === undefined)
            {
               selectorEntry = users[idx].id;
            }
            else
            {
               selectorEntry = users[idx].userName;
            }
            selector.options.add(new Option(selectorEntry, users[idx].id));
            if(users[idx].id == selectedUser)
            {
               selectedIdx = idx+1;
            }
         }
      }

      if(selectedIdx !== null)
      {
         selector.selectedIndex = selectedIdx;
      }
   }
}

function uroPlacesEditorSelected()
{
   var selector = document.getElementById('_selectPlacesUserID');
   if(selector.selectedIndex > 0)
   {
      document.getElementById('_textPlacesEditor').value = document.getElementById('_selectPlacesUserID').selectedOptions[0].innerHTML;
   }
}

function uroHidePlacesEditorSelected()
{
   var selector = document.getElementById('_selectHidePlacesUserID');
   if(selector.selectedIndex > 0)
   {
      document.getElementById('_textHidePlacesEditor').value = document.getElementById('_selectHidePlacesUserID').selectedOptions[0].innerHTML;
   }
}

function uroUpdateMPSolverList()
{
   if(Object.keys(W.model.problems.objects).length === 0)
   {
      return;
   }

   var resolverList = [];
   var selector = document.getElementById('_selectMPUserID');
   var selectedUser = null;
   if(selector.selectedOptions[0] != null)
   {
      selectedUser = parseInt(selector.selectedOptions[0].value);
   }
   while(selector.options.length > 0)
   {
      selector.options.remove(0);
   }
   var selectedIdx = 0;
   var idx = 0;

   for (var mpobj in W.model.problems.objects)
   {
      if(W.model.problems.objects.hasOwnProperty(mpobj))
      {
         var prob = W.model.problems.objects[mpobj];
         if(prob.attributes.resolvedBy !== null)
         {
            var userID = prob.attributes.resolvedBy;
            var userName = W.model.users.objects[userID].userName;
            if(resolverList.indexOf(userName) == -1)
            {
               resolverList.push(userName);
               selector.options.add(new Option(userName, userID));
               if(userID == selectedUser)
               {
                  selectedIdx = idx;
               }
               idx++;
            }
         }
      }
   }

   if(selectedIdx !== null)
   {
      selector.selectedIndex = selectedIdx;
   }
}

function uroUpdateResolverList()
{
   if(Object.keys(W.model.mapUpdateRequests.objects).length === 0)
   {
      return;
   }

   var resolverList = [];
   var selector = document.getElementById('_selectURResolverID');
   var selectedUser = null;
   if(selector.selectedOptions[0] != null)
   {
      selectedUser = parseInt(selector.selectedOptions[0].value);
   }
   while(selector.options.length > 0)
   {
      selector.options.remove(0);
   }
   var selectedIdx = 0;
   var idx = 0;

   for (var urobj in W.model.mapUpdateRequests.objects)
   {
      if(W.model.mapUpdateRequests.objects.hasOwnProperty(urobj))
      {
         var ureq = W.model.mapUpdateRequests.objects[urobj];
         if(ureq.attributes.resolvedBy !== null)
         {
            var userID = ureq.attributes.resolvedBy;
            var userName = W.model.users.objects[userID].userName;
            if(resolverList.indexOf(userName) == -1)
            {
               resolverList.push(userName);
               selector.options.add(new Option(userName, userID));
               if(userID == selectedUser)
               {
                  selectedIdx = idx;
               }
               idx++;
            }
         }
      }
   }
   if(selectedIdx !== null)
   {
      selector.selectedIndex = selectedIdx;
   }
}

function uroUpdateUserList()
{
   if(Object.keys(W.model.updateRequestSessions.objects).length === 0) return;

   var selector = document.getElementById('_selectURUserID');

   var selectedUser = null;
   if(selector.selectedOptions[0] != null)
   {
      selectedUser = parseInt(selector.selectedOptions[0].value);
   }

   while(selector.options.length > 0)
   {
      selector.options.remove(0);
   }

   var selectedIdx = null;

   var listedIDs = [];
   for(var ursIdx in W.model.updateRequestSessions.objects)
   {
      if(W.model.updateRequestSessions.objects.hasOwnProperty(ursIdx))
      {
         var ursObj = W.model.updateRequestSessions.objects[ursIdx];
         if(ursObj.comments.length > 0)
         {
            for(var cidx=0; cidx < ursObj.comments.length; cidx++)
            {
               var userID = ursObj.comments[cidx].userID;
               if((listedIDs.indexOf(userID) == -1) && (userID != -1))
               {
                  listedIDs.push(userID);
               }
            }
         }
      }
   }

   if(listedIDs.length > 0)
   {
      var users = W.model.users.getByIds(listedIDs);
      for(var idx=0; idx<listedIDs.length; idx++)
      {
         selector.options.add(new Option(users[idx].userName, listedIDs[idx]));
         if(listedIDs[idx] == selectedUser)
         {
            selectedIdx = idx;
         }
      }
   }


   if(selectedIdx !== null)
   {
      selector.selectedIndex = selectedIdx;
   }
}

function uroUpdateMCCreatorList()
{
   if(Object.keys(W.model.mapComments.objects).length === 0) return;

   var selector = document.getElementById('_selectMCCreatorID');

   var selectedUser = null;
   if(selector.selectedOptions[0] != null)
   {
      selectedUser = parseInt(selector.selectedOptions[0].value);
   }

   while(selector.options.length > 0)
   {
      selector.options.remove(0);
   }

   var selectedIdx = null;
   var listedIDs = [];
   for(var mcIdx in W.model.mapComments.objects)
   {
      if(W.model.mapComments.objects.hasOwnProperty(mcIdx))
      {
         var mcObj = W.model.mapComments.objects[mcIdx].attributes;
         var cbID = mcObj.createdBy;

         if((cbID !== null) && (listedIDs.indexOf(cbID) == -1))
         {
            listedIDs.push(cbID);
         }
      }
   }

   selector.options.add(new Option('<select a user>', null));
   if(listedIDs.length > 0)
   {
      var users = W.model.users.getByIds(listedIDs);
      var selectorEntry = '';
      for(var idx=0; idx<users.length; idx++)
      {
         if(users[idx].userName === undefined)
         {
            selectorEntry = users[idx].id;
         }
         else
         {
            selectorEntry = users[idx].userName;
         }
         selector.options.add(new Option(selectorEntry, users[idx].id));
         if(users[idx].id == selectedUser)
         {
            selectedIdx = idx+1;
         }
      }
   }

   if(selectedIdx !== null)
   {
      selector.selectedIndex = selectedIdx;
   }
}

function uroUpdateCamEditorList()
{
   if(Object.keys(W.model.cameras.objects).length === 0) return;

   var selector = document.getElementById('_selectCameraUserID');

   var selectedUser = null;
   if(selector.selectedOptions[0] != null)
   {
      selectedUser = parseInt(selector.selectedOptions[0].value);
   }

   while(selector.options.length > 0)
   {
      selector.options.remove(0);
   }

   var selectedIdx = null;
   var listedIDs = [];
   for(var camIdx in W.model.cameras.objects)
   {
      if(W.model.cameras.objects.hasOwnProperty(camIdx))
      {
         var camObj = W.model.cameras.objects[camIdx].attributes;
         var cbID = camObj.createdBy;
         var ubID = camObj.updatedBy;

         if((cbID !== null) && (listedIDs.indexOf(cbID) == -1))
         {
            listedIDs.push(cbID);
         }
         if((ubID !== null) && (ubID !== cbID) && (listedIDs.indexOf(ubID) == -1))
         {
            listedIDs.push(ubID);
         }
      }
   }

   selector.options.add(new Option('<select a user>', null));
   if(listedIDs.length > 0)
   {
      var users = W.model.users.getByIds(listedIDs);
      var selectorEntry = '';
      for(var idx=0; idx<users.length; idx++)
      {
         if(users[idx].userName === undefined)
         {
            selectorEntry = users[idx].id;
         }
         else
         {
            selectorEntry = users[idx].userName;
         }
         selector.options.add(new Option(selectorEntry, users[idx].id));
         if(users[idx].id == selectedUser)
         {
            selectedIdx = idx+1;
         }
      }
   }

   if(selectedIdx !== null)
   {
      selector.selectedIndex = selectedIdx;
   }
}

function uroCamEditorSelected()
{
   var selector = document.getElementById('_selectCameraUserID');
   if(selector.selectedIndex > 0)
   {
      document.getElementById('_textCameraEditor').value = document.getElementById('_selectCameraUserID').selectedOptions[0].innerHTML;
   }
}

function uroSetStyles(obj)
{
   obj.style.fontSize = '12px';
   obj.style.lineHeight = '100%';
   obj.style.overflow = 'auto';
   obj.style.flex = '1';
}
function uroSetSectionTabStyles()
{
    uroSetStyles(uroCtrlURs);
    uroSetStyles(uroCtrlMPs);
    uroSetStyles(uroCtrlMCs);
    uroSetStyles(uroCtrlPlaces);
    uroSetStyles(uroCtrlCameras);
    uroSetStyles(uroCtrlMisc);
    uroSetStyles(uroOWL);
}

function uroPlacesGroupCEHandler(groupidx)
{
   if(uroPlacesGroupsCollapsed[groupidx] === false)
   {
      document.getElementById('_uroPlacesGroup-'+groupidx).style.display = "block";
      document.getElementById('_uroPlacesGroupState-'+groupidx).className = "fa fa-minus-square-o";
   }
   else
   {
      document.getElementById('_uroPlacesGroup-'+groupidx).style.display = "none";
      document.getElementById('_uroPlacesGroupState-'+groupidx).className = "fa fa-plus-square-o";
   }
}
function uroPlacesGroupCollapseExpand()
{
   var groupidx = this.id.substr(21);
   if(uroPlacesGroupsCollapsed[groupidx] === true) uroPlacesGroupsCollapsed[groupidx] = false;
   else uroPlacesGroupsCollapsed[groupidx] = true;
   uroPlacesGroupCEHandler(groupidx);
   return false;
}
function uroPopulateProblemsTab()
{
   var tHTML = '';
   tHTML += '<input type="checkbox" id="_cbMPFilterOutsideArea">Hide MPs outside my editable area</input><br><br>';
   tHTML += '<b>Filter MPs by type:</b><br>';
   var i;
   for(i=0; i<uroKnownProblemTypeNames.length; i++)
   {
      tHTML += '<input type="checkbox" id="_cbMPFilter_T'+uroKnownProblemTypeIDs[i]+'">'+uroKnownProblemTypeNames[i]+'</input><br>';
   }
   tHTML += '<br><input type="checkbox" id="_cbMPFilterUnknownProblem">Unknown problem type</input><br><br>';

   tHTML += '&nbsp;&nbsp;<i>Specially tagged types</i><br>';
   tHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbFilterElgin">[Elgin]</input><br>';
   tHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbFilterTrafficCast">[TrafficCast]</input><br>';
   tHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbFilterTrafficMaster">[TM]</input><br>';
   tHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbFilterCaltrans">[Caltrans]</input><br>';
   tHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbFilterTFL">TfL</input><br>';

   tHTML += '<input type="checkbox" id="_cbMPFilterReopenedProblem">Reopened Problems</input><br><br>';

   tHTML += '<input type="checkbox" id="_cbInvertMPFilter">Invert operation of type filters?</input><br>';



   tHTML += '<br><b>Hide closed/solved/unidentified Problems:</b><br>';
   tHTML += '<input type="checkbox" id="_cbMPFilterClosed">Closed</input><br>';
   tHTML += '<input type="checkbox" id="_cbMPFilterSolved">Solved</input><br>';
   tHTML += '<input type="checkbox" id="_cbMPFilterUnidentified">Not identified</input><br><br>';

   tHTML += '<input type="checkbox" id="_cbMPClosedUserIDFilter" pairedWith="_cbMPNotClosedUserIDFilter">Closed</input> or ';
   tHTML += '<input type="checkbox" id="_cbMPNotClosedUserIDFilter" pairedWith="_cbMPClosedUserIDFilter">Not Closed</input> by user';
   tHTML += '<select id="_selectMPUserID" style="width:80%; height:22px;"></select><br>';

   tHTML += '<br><b>Hide problems (not turn) by severity:</b><br>';
   tHTML += '<input type="checkbox" id="_cbMPFilterLowSeverity">Low</input>&nbsp;&nbsp;';
   tHTML += '<input type="checkbox" id="_cbMPFilterMediumSeverity">Medium</input>&nbsp;&nbsp;';
   tHTML += '<input type="checkbox" id="_cbMPFilterHighSeverity">High</input><br>';

   uroCtrlMPs.innerHTML = tHTML;
}
function uroPopulatePlacesTab()
{
   var tHTML = '';
   tHTML += '<b>Filter PURs by category/status:</b><br>';
   tHTML += '<input type="checkbox" id="_cbFilterUneditablePlaceUpdates">Ones I can\'t edit</input><br>';
   tHTML += '<input type="checkbox" id="_cbFilterLockRankedPlaceUpdates">Ones with non-zero lockRanks</input><br>';
   tHTML += '<input type="checkbox" id="_cbFilterNewPlacePUR">Ones for new places</input><br>';
   tHTML += '<input type="checkbox" id="_cbFilterUpdatedDetailsPUR">Ones for updated place details</input><br>';

   tHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbPURFilterCFPhone">Phone number</input><br>';
   tHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbPURFilterCFName">Name</input><br>';
   tHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbPURFilterCFEntryExitPoints">Entry//exit points</input><br>';
   tHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbPURFilterCFOpeningHours">Opening hours</input><br>';
   tHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbPURFilterCFAliases">Aliases</input><br>';
   tHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbPURFilterCFServices">Services</input><br>';
   tHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbPURFilterCFGeometry">Geometry</input><br>';
   tHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbPURFilterCFHouseNumber">House number</input><br>';
   tHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbPURFilterCFCategories">Categories</input><br>';
   tHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbPURFilterCFDescription">Description</input><br>';

   tHTML += '<input type="checkbox" id="_cbFilterNewPhotoPUR">Ones for new photos</input><br>';
   tHTML += '<input type="checkbox" id="_cbFilterFlaggedPUR">Ones flagged for attention</input><br>';
   tHTML += '<br><input type="checkbox" id="_cbLeavePURGeos">Don\'t hide place polygons/points</input><br>';
   tHTML += '<br><input type="checkbox" id="_cbInvertPURFilters">Invert PUR filters</input><br>';

   tHTML += '<br><b>Filter PURs by severity:</b><br>';
   tHTML += '<input type="checkbox" id="_cbPURFilterLowSeverity">Low</input>&nbsp;&nbsp;';
   tHTML += '<input type="checkbox" id="_cbPURFilterMediumSeverity">Medium</input>&nbsp;&nbsp;';
   tHTML += '<input type="checkbox" id="_cbPURFilterHighSeverity">High</input>';

   tHTML += '<br><b>Filter PURs by age of submission:</b><br>';
   tHTML += '<input type="checkbox" id="_cbEnablePURMinAgeFilter">Hide PURs less than </input>';
   tHTML += '<input type="number" min="1" size="3" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputPURFilterMinDays"> days old<br>';
   tHTML += '<input type="checkbox" id="_cbEnablePURMaxAgeFilter">Hide PURs more than </input>';
   tHTML += '<input type="number" min="1" size="3" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputPURFilterMaxDays"> days old<br>';

   tHTML += '<hr>';

   tHTML += '<br><b>Filter Places by state:</b><br>';
   tHTML += 'Hide if last edited<br>';
   tHTML += '<input type="checkbox" id="_cbPlaceFilterEditedLessThan"> less than </input>';
   tHTML += '<input type="number" min="1" size="3" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputFilterPlaceEditMinDays"> days ago<br>';
   tHTML += '<input type="checkbox" id="_cbPlaceFilterEditedMoreThan"> more than </input>';
   tHTML += '<input type="number" min="1" size="3" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputFilterPlaceEditMaxDays"> days ago<br>';

   tHTML += '<br>Hide if locked at level:<br>';
   tHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHidePlacesL0">1</input>';
   tHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHidePlacesL1">2</input>';
   tHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHidePlacesL2">3</input>';
   tHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHidePlacesL3">4</input>';
   tHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHidePlacesL4">5</input>';
   tHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHidePlacesL5">6</input>';
   tHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHidePlacesStaff">Staff</input>';
   tHTML += '<br>&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHidePlacesAdLocked">AdLocked</input><br>';

   tHTML += '<br>Hide by geometry:<br>';
   tHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideAreaPlaces">Areas</input>';
   tHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHidePointPlaces">Points</input>';

   tHTML += '<br><br><input type="checkbox" id="_cbHidePhotoPlaces" pairedWith="_cbHideNoPhotoPlaces">Hide or </input>';
   tHTML += '<input type="checkbox" id="_cbHideNoPhotoPlaces" pairedWith="_cbHidePhotoPlaces">show ones with photos</input><br>';

   tHTML += '<input type="checkbox" id="_cbHideLinkedPlaces" pairedWith="_cbHideNoLinkedPlaces">Hide or </input>';
   tHTML += '<input type="checkbox" id="_cbHideNoLinkedPlaces" pairedWith="_cbHideLinkedPlaces">show ones with external links</input><br>';

   tHTML += '<input type="checkbox" id="_cbHideDescribedPlaces" pairedWith="_cbHideNonDescribedPlaces">Hide or </input>';
   tHTML += '<input type="checkbox" id="_cbHideNonDescribedPlaces" pairedWith="_cbHideDescribedPlaces">show ones with descriptive text</input><br>';

   tHTML += '<input type="checkbox" id="_cbHideKeywordPlaces" pairedWith="_cbHideNoKeywordPlaces">Hide or </input>';
   tHTML += '<input type="checkbox" id="_cbHideNoKeywordPlaces" pairedWith="_cbHideKeywordPlaces">show ones with a name including</input><br>';
   tHTML += '<input type="text" style="font-size:14px; line-height:16px; height:22px; margin-bottom:4px;" id="_textKeywordPlace"><br>';

   tHTML += '<br><b>Show Places touched by a specific editor:</b><br>';
   tHTML += '<input type="checkbox" id="_cbShowOnlyPlacesCreatedBy">Created by</input>&nbsp;/&nbsp;';
   tHTML += '<input type="checkbox" id="_cbShowOnlyPlacesEditedBy">edited by</input><br>';
   tHTML += '<input type="text" style="font-size:14px; line-height:16px; height:22px; margin-bottom:4px;" id="_textPlacesEditor"><br>';
   tHTML += '<select id="_selectPlacesUserID" style="width:80%; height:22px;"></select><br>';

   tHTML += '<br><b>Hide Places touched by a specific editor:</b><br>';
   tHTML += '<input type="checkbox" id="_cbHideOnlyPlacesCreatedBy">Created by</input>&nbsp;/&nbsp;';
   tHTML += '<input type="checkbox" id="_cbHideOnlyPlacesEditedBy">edited by</input><br>';
   tHTML += '<input type="text" style="font-size:14px; line-height:16px; height:22px; margin-bottom:4px;" id="_textHidePlacesEditor"><br>';
   tHTML += '<select id="_selectHidePlacesUserID" style="width:80%; height:22px;"></select><br>';

   tHTML += '<br><br><b>Filter Places by category:</b><br>';

   var nCategories = W.Config.venues.categories.length;
   var i;
   if(uroPlacesGroupsCollapsed.length != nCategories)
   {
      for(i=0; i<nCategories; i++)
      {
         uroPlacesGroupsCollapsed.push(false);
      }
   }

   for(i=0; i<nCategories; i++)
   {
      var parentCategory = W.Config.venues.categories[i];
      var localisedName = I18n.lookup("venues.categories." + parentCategory);

      if(uroPlacesGroupsCollapsed[i] === true)
      {
         tHTML += '<i class="fa fa-plus-square-o" style="cursor:pointer;font-size:14px;" id="_uroPlacesGroupState-'+i+'"></i>';
      }
      else
      {
         tHTML += '<i class="fa fa-minus-square-o" style="cursor:pointer;font-size:14px;" id="_uroPlacesGroupState-'+i+'"></i>';
      }

      tHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbPlacesFilter-'+parentCategory+'"><b>'+localisedName+'</b></input><br>';
      tHTML += '<div id="_uroPlacesGroup-'+i+'" style="padding:3px;border-width:2px;border-style:solid;border-color:#FFFFFF">';

      for(var ii=0; ii<W.Config.venues.subcategories[parentCategory].length; ii++)
      {
         var subCategory = W.Config.venues.subcategories[parentCategory][ii];
         localisedName = I18n.lookup("venues.categories." + subCategory);
         tHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbPlacesFilter-'+subCategory+'">'+localisedName+'</input><br>';
      }
      tHTML += '</div>';
   }
   tHTML += '<input type="checkbox" id="_cbFilterPrivatePlaces"><b>Residential Places</b></input><br>';
   tHTML += '<br><input type="checkbox" id="_cbInvertPlacesFilter">Invert Place filters?</input>';

   uroCtrlPlaces.innerHTML = tHTML;
}

function uroCheckMTEMode()
{
   var isMTEModeSet = (W.app.modeController.mode === undefined);
   if(isMTEModeSet === false)
   {
      isMTEModeSet |= (W.app.modeController.mode.mteModeState !== undefined);
   }
   if(isMTEModeSet === true)
   {
      uroMTEMode = true;
      uroHidePopup('uroCheckMTEMode');
      uroAddLog('MTE mode, sleeping until normal service is resumed...');
      return;
   }
   uroMTEMode = false;
}
function uroWazeBits()
{
   // "fake" uroWazeBits() function which only performs layer scan, to stop the uroWazeBits() call in WMETB from
   // messing around with other stuff in the actual uroWazeBits() function (now renamed uroRealWazeBits...) that
   // really only ought to be called once.

   var i;

   uroMCLayer = null;
   for(i=0;i<W.map.layers.length;i++)
   {
      if(W.map.layers[i].CLASS_NAME.indexOf('Layer.Vector.RootContainer') !== -1) uroRootContainer = W.map.layers[i].div.id;
	  if(W.map.layers[i].featureType == 'mapComment') uroMCLayer = W.map.layers[i];
   }
   uroPlacesRoot = W.map.landmarkLayer.id + '_vroot';

   for(i=0;i<W.map.controls.length;i++)
   {
      if(W.map.controls[i].CLASS_NAME.indexOf('View.ArchivePanel') != -1) dteControls = W.map.controls[i];
      else if(W.map.controls[i].CLASS_NAME.indexOf('Control.Archive') != -1) dteControls = W.map.controls[i];
   }
}

var uroPrevWazeBitsPresent = null;
function uroRealWazeBits()
{
   if(document.getElementsByClassName("sandbox").length > 0)
   {
      uroAddLog('WME practice mode detected, script is disabled...');
      return;
   }

   if(document.location.href.indexOf('user') !== -1)
   {
      uroAddLog('User profile page detected, script is disabled...');
      return;
   }
   if(uroWazeBitsPresent != uroPrevWazeBitsPresent)
   {
      uroAddLog('adding WazeBits...'+uroToHex(uroWazeBitsPresent,4));
   }
   if((uroWazeBitsPresent & 0x0001) === 0)
   {
      if(typeof W != "undefined")
      {
         if(typeof W.map != "undefined")
         {
            uroAddLog('   W.map OK');
            uroWazeBitsPresent |= 0x0001;
         }
      }
   }
   if((uroWazeBitsPresent & 0x0002) === 0)
   {
      if(typeof W != "undefined")
      {
         if(typeof W.model != "undefined")
         {
            uroAddLog('   W.model OK');
            uroWazeBitsPresent |= 0x0002;
         }
      }
   }
   if((uroWazeBitsPresent & 0x0004) === 0)
   {
      if(typeof W != "undefined")
      {
         if(typeof W.loginManager != "undefined")
         {
            uroAddLog('   W.loginManager OK');
            uroWazeBitsPresent |= 0x0004;
         }
      }
   }
   if((uroWazeBitsPresent & 0x0008) === 0)
   {
      if(typeof W != "undefined")
      {
         if(typeof W.selectionManager != "undefined")
         {
            uroAddLog('   W.selectionManager OK');
            uroWazeBitsPresent |= 0x0008;
         }
      }
   }
   if((uroWazeBitsPresent & 0x0010) === 0)
   {
      if(typeof OL != "undefined")
      {
         uroAddLog('   OL OK');
         uroWazeBitsPresent |= 0x0010;
      }
   }
   if((uroWazeBitsPresent & 0x0020) === 0)
   {
      if(typeof W != "undefined")
      {
         uroAddLog('   W OK');
         uroWazeBitsPresent |= 0x0020;
      }
   }
   if((uroWazeBitsPresent & 0x0040) === 0)
   {
      if(document.getElementById('user-tabs') !== null)
      {
         uroUserTabId = 'user-tabs';
         uroAddLog('   user-tabs OK');
         uroWazeBitsPresent |= 0x0040;
      }
   }
   if((uroWazeBitsPresent & 0x0080) === 0)
   {
      if(document.getElementById('sidepanel-drives') !== null)
      {
         uroAddLog('   sidepanel-drives OK');
         uroWazeBitsPresent |= 0x0080;
      }
   }
   if((uroWazeBitsPresent & 0x0100) === 0)
   {
      if(typeof I18n != "undefined")
      {
         uroAddLog('   I18n OK');
         uroWazeBitsPresent |= 0x0100;
      }
   }
   uroPrevWazeBitsPresent = uroWazeBitsPresent;

   if(uroWazeBitsPresent !== 0x01FF)
   {
      setTimeout(uroRealWazeBits,250);
   }
   else if(W.loginManager.isLoggedIn() === false)
   {
      uroAddLog('Waiting for user log-in...');
      setTimeout(uroRealWazeBits,1000);
   }
   else
   {
      uroAddLog('All WazeBits present and correct...');
      W.prefs.on('change:isImperial', uroInitialise);
      W.app.modeController.model.bind("change:mode", uroInitialise);

      uroCheckMTEMode();
      // when exiting MTE mode, we now seem to get two calls to reinitialise URO+, which causes
      // two tabs to be created...  To avoid this we now test for the presence of our tab and skip
      // the initialisation code if it's already there.
      if(document.getElementById('uroTabHeader') === null)
      {
         if(uroSetupUI() === true)
         {
            uroDOMHasTurnProblems = (W.model.turnProblems != null);
            uroGetProblemTypes();
            uroPopulateProblemsTab();
            uroPopulatePlacesTab();

            document.getElementById('uroControlsContainer').appendChild(uroCtrlURs);
            document.getElementById('uroControlsContainer').appendChild(uroCtrlMPs);
            document.getElementById('uroControlsContainer').appendChild(uroCtrlMCs);
            document.getElementById('uroControlsContainer').appendChild(uroCtrlPlaces);
            document.getElementById('uroControlsContainer').appendChild(uroCtrlCameras);
            document.getElementById('uroControlsContainer').appendChild(uroOWL);
            document.getElementById('uroControlsContainer').appendChild(uroCtrlMisc);
            document.getElementById('uroControlsContainer').appendChild(uroCtrlHides);

            uroCtrlURs.onclick = uroFilterItems_URTabClick;
            uroCtrlMPs.onclick = uroFilterItems_MPTabClick;
            uroCtrlMCs.onclick = uroFilterItems_MCTabClick;
            uroCtrlPlaces.onclick = uroFilterItems_PlacesTabClick;
            uroCtrlCameras.onclick = uroFilterItems_CamerasTabClick;
            uroCtrlMisc.onclick = uroFilterItems_MiscTabClick;

            uroWazeBits();

            uroDiv.addEventListener("mouseover", uroEnterPopup, false);
            uroDiv.addEventListener("mouseout", uroExitPopup, false);

            if(sessionStorage.UROverview_FID_IgnoreList === undefined) sessionStorage.UROverview_FID_IgnoreList = '';
            if(sessionStorage.UROverview_FID_WatchList === undefined) sessionStorage.UROverview_FID_WatchList = '';
            if(uroConfirmIntercepted === false) uroAddInterceptor();

            uroMainTickHandlerID = setInterval(uroMainTick,1000);
         }
      }
   }
}

function uroAddInterceptor()
{
   uroAddLog('Adding interceptor function...');
   // add interceptor function for confirm(), so that we can auto-select the "OK" option when solving URs
   // which have pending question...

   var _confirm = window.confirm;
   window.confirm = function(msg)
   {
      var cm_delete_confirm = I18n.lookup("closures.delete_confirm").split('"')[0].trimRight(1);

      if((I18n.lookup("update_requests.panel.confirm") == msg) && (uroGetCBChecked('_cbDisablePendingQuestions') === true))
      {
         uroAddLog('Intercepted pending comments confirmation...');
         return true;
      }
      else if(msg.indexOf(cm_delete_confirm) != -1)
      {
         uroAddLog('intercepted closure delete confirmation...');
         if(uroConfirmClosureDelete)
         {
            return _confirm(msg);
         }
         else
         {
            return true;
         }
      }
      else if(typeof(msg) == 'undefined')
      {
         uroAddLog('Intercepted blank confirmation...');
         return true;
      }
      else
      {
         return _confirm(msg);
      }
   };

   uroConfirmIntercepted = true;
}

function uroEnterPopup()
{
   uroMouseInPopup = true;
}

function uroExitPopup()
{
   uroMouseInPopup = false;
}

function uroToggleDebug()
{
   uroShowDebugOutput = !uroShowDebugOutput;
   var dbgMode = "none";
   if(uroShowDebugOutput)
   {
      dbgMode = "inline";
   }
   document.getElementById('_uroDebugMode').style.display = dbgMode;
}

function uroInitialise()
{
   uroInitialised = false;
   uroSetupListeners = true;
   uroFinalisingListenerSetup = false;

   if(document.URL.indexOf('beta') != -1) uroBetaEditor = true;
   uroRealWazeBits();
}

function uroWaitForControlsContainer()
{
   if(document.getElementById('uroControlsContainer') === null)
   {
      setTimeout(uroWaitForControlsContainer,500);
   }
   else
   {
      var updateURL;
      updateURL = 'https://greasyfork.org/scripts/1952-uroverview-plus-uro';
      /*
      if(navigator.userAgent.indexOf('Chrome') == -1)
      {
         updateURL = 'https://greasyfork.org/scripts/1952-uroverview-plus-uro';
      }
      else
      {
         updateURL = 'https://chrome.google.com/webstore/detail/uroverview/amdamgkgchnbaopmphhjapmjcdghdphi';
      }
      */

      uroAddLog('adding controls to sidebar container...');
      var tabbyHTML = '<div id="uroTabHeader"><b><a href="'+updateURL+'" target="_blank">UROverview Plus</a></b> <label id="_uroVersion">'+uroVersion+'</label>';
      tabbyHTML += '<label id="_uroDebugMode">(dbg)</label>';
      tabbyHTML += '&nbsp;<input type="checkbox" id="_cbMasterEnable" checked>Enabled</input>';
      tabbyHTML += '<p><table border=0 width="100%"><tr>';
      tabbyHTML += '<td valign="center" align="center" id="_tabSelectUserRequests"><a href="#" id="_linkSelectUserRequests" style="text-decoration:none;font-size:12px">URs</a></td>';
      tabbyHTML += '<td valign="center" align="center" id="_tabSelectMapProblems"><a href="#" id="_linkSelectMapProblems" style="text-decoration:none;font-size:12px">MPs</a></td>';
      tabbyHTML += '<td valign="center" align="center" id="_tabSelectMapComments"><a href="#" id="_linkSelectMapComments" style="text-decoration:none;font-size:12px">MCs</a></td>';
      tabbyHTML += '<td valign="center" align="center" id="_tabSelectPlaces"><a href="#" id="_linkSelectPlaces" style="text-decoration:none;font-size:12px">Places</a></td>';
      tabbyHTML += '<td valign="center" align="center" id="_tabSelectCameras"><a href="#" id="_linkSelectCameras" style="text-decoration:none;font-size:12px">Cams</a></td>';
      tabbyHTML += '<td valign="center" align="center" id="_tabSelectCWL"><a href="#" id="_linkSelectOWL" style="text-decoration:none;font-size:12px">OWL</a></td>';
      tabbyHTML += '<td valign="center" align="center" id="_tabSelectMisc"><a href="#" id="_linkSelectMisc" style="text-decoration:none;font-size:12px">Misc</a></td>';
      tabbyHTML += '</tr></table></div>';
      document.getElementById('uroControlsContainer').innerHTML = tabbyHTML;

      // tab elements
      uroCtrlURs = document.createElement('div');
      uroCtrlMPs = document.createElement('div');
      uroCtrlMCs = document.createElement('div');
      uroCtrlPlaces = document.createElement('div');
      uroCtrlCameras = document.createElement('div');
      uroOWL = document.createElement('div');
      uroCtrlMisc = document.createElement('div');

      // other sidebar elements
      uroAMList = document.createElement('div');
      uroCtrlHides = document.createElement('div');


      // UR controls tab
      {
         uroCtrlURs.id = "uroCtrlURs";
         uroCtrlURs.innerHTML = '<br>';

         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbURFilterOutsideArea">Hide URs outside my editable area</input><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbNoFilterForURInURL">Don\'t filter selected UR</input><br><br>';

         uroCtrlURs.innerHTML += '<b>Filter by type:</b><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterWazeAuto">Waze Automatic</input><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterIncorrectTurn">Incorrect turn</input><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterIncorrectAddress">Incorrect address</input><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterIncorrectRoute">Incorrect route</input><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterMissingRoundabout">Missing roundabout</input><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterGeneralError">General error</input><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterTurnNotAllowed">Turn not allowed</input><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterIncorrectJunction">Incorrect junction</input><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterMissingBridgeOverpass">Missing bridge overpass</input><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterWrongDrivingDirection">Wrong driving direction</input><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterMissingExit">Missing exit</input><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterMissingRoad">Missing road</input><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterBlockedRoad">Blocked road</input><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterMissingLandmark">Missing Landmark</input><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterSpeedLimits">Missing or Invalid Speed limit</input><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterUndefined">Undefined</input><br>';

         uroCtrlURs.innerHTML += '&nbsp;&nbsp;<i>Specially tagged types</i><br>';
         uroCtrlURs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbFilterRoadworks">[ROADWORKS]</input><br>';
         uroCtrlURs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbFilterConstruction">[CONSTRUCTION]</input><br>';
         uroCtrlURs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbFilterClosure">[CLOSURE]</input><br>';
         uroCtrlURs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbFilterEvent">[EVENT]</input><br>';
         uroCtrlURs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbFilterNote">[NOTE]</input><br>';
         uroCtrlURs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbFilterBOG">[BOG]</input><br>';
         uroCtrlURs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbFilterDifficult">[DIFFICULT]</input><br>';
         uroCtrlURs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbFilterWSLM">[WSLM]</input><br><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbInvertURFilter">Invert operation of type filters?</input><br>';

         uroCtrlURs.innerHTML += '<hr>';

         uroCtrlURs.innerHTML += '<br><b>Hide by state:</b><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterOpenUR">Open</input><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterClosedUR">Closed</input><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterSolved">Solved</input><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterUnidentified">Not identified</input><br><br>';


         uroCtrlURs.innerHTML += '<br><b>Filter by age of submission:</b><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbEnableMinAgeFilter">Hide URs less than </input>';
         uroCtrlURs.innerHTML += '<input type="number" min="1" size="3" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputFilterMinDays"> days old<br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbEnableMaxAgeFilter">Hide URs more than </input>';
         uroCtrlURs.innerHTML += '<input type="number" min="1" size="3" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputFilterMaxDays"> days old<br>';

         uroCtrlURs.innerHTML += '<br><b>Filter by description/comments/following:</b><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbHideMyFollowed" pairedWith="_cbHideMyUnfollowed">Ones I am or </input>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbHideMyUnfollowed" pairedWith="_cbHideMyFollowed">am not following</input><br><br>';

         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbURDescriptionMustBePresent" pairedWith="_cbURDescriptionMustBeAbsent">Hide</input> or ';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbURDescriptionMustBeAbsent" pairedWith="_cbURDescriptionMustBePresent">show</input> URs with no description<br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbEnableKeywordMustBePresent">Hide URs not including </input>';
         uroCtrlURs.innerHTML += '<input type="text" style="font-size:14px; line-height:16px; height:22px; margin-bottom:4px;" id="_textKeywordPresent"><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbEnableKeywordMustBeAbsent">Hide URs including </input>';
         uroCtrlURs.innerHTML += '<input type="text" style="font-size:14px; line-height:16px; height:22px; margin-bottom:4px;" id="_textKeywordAbsent"><br>';
         uroCtrlURs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbCaseInsensitive"><i>Case-insensitive matches?</i></input><br><br>';

         uroCtrlURs.innerHTML += 'With comments from me?<br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbHideMyComments" pairedWith="_cbHideAnyComments">Yes </input>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbHideAnyComments" pairedWith="_cbHideMyComments">No</input><br>';
         uroCtrlURs.innerHTML += 'If last comment made by me?<br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbHideIfLastCommenter" pairedWith="_cbHideIfNotLastCommenter">Yes </input>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbHideIfNotLastCommenter" pairedWith="_cbHideIfLastCommenter">No </input><br>';
         uroCtrlURs.innerHTML += 'If last comment made by UR reporter?<br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbHideIfReporterLastCommenter" pairedWith="_cbHideIfReporterNotLastCommenter">Yes </input>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbHideIfReporterNotLastCommenter" pairedWith="_cbHideIfReporterLastCommenter">No</input><br>';

         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbEnableMinCommentsFilter">With less than </input>';
         uroCtrlURs.innerHTML += '<input type="number" min="1" size="3" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputFilterMinComments"> comments<br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbEnableMaxCommentsFilter">With more than </input>';
         uroCtrlURs.innerHTML += '<input type="number" min="0" size="3" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputFilterMaxComments"> comments<br><br>';

         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbEnableCommentAgeFilter2">Last comment less than </input>';
         uroCtrlURs.innerHTML += '<input type="number" min="1" size="3" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputFilterCommentDays2"> days ago<br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbEnableCommentAgeFilter">Last comment more than </input>';
         uroCtrlURs.innerHTML += '<input type="number" min="1" size="3" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputFilterCommentDays"> days ago<br>';
         uroCtrlURs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbIgnoreOtherEditorComments"><i>Ignore other editor comments?</i></input><br><br>';

         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbURUserIDFilter">Without comments from user</input>';
         uroCtrlURs.innerHTML += '<select id="_selectURUserID" style="width:80%; height:22px;"></select><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbURResolverIDFilter">Not resolved by user</input>';
         uroCtrlURs.innerHTML += '<select id="_selectURResolverID" style="width:80%; height:22px;"></select>';

         uroCtrlURs.innerHTML += '<br><br><input type="checkbox" id="_cbInvertURStateFilter">Invert operation of state/age filters?</input><br>';
         uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbNoFilterForTaggedURs">Don\'t apply state/age filters to tagged URs</input><br>';
      }

      // MC controls tab
      {
         uroCtrlMCs.id = "uroCtrlMCs";
         uroCtrlMCs.innerHTML = '<br>';

         uroCtrlMCs.innerHTML += '&nbsp;&nbsp;<i>Specially tagged types</i><br>';
         uroCtrlMCs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbMCFilterRoadworks">[ROADWORKS]</input><br>';
         uroCtrlMCs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbMCFilterConstruction">[CONSTRUCTION]</input><br>';
         uroCtrlMCs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbMCFilterClosure">[CLOSURE]</input><br>';
         uroCtrlMCs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbMCFilterEvent">[EVENT]</input><br>';
         uroCtrlMCs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbMCFilterNote">[NOTE]</input><br>';
         uroCtrlMCs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbMCFilterBOG">[BOG]</input><br>';
         uroCtrlMCs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbMCFilterDifficult">[DIFFICULT]</input><br>';
         uroCtrlMCs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbMCFilterWSLM">[WSLM]</input><br><br>';
         uroCtrlMCs.innerHTML += '<input type="checkbox" id="_cbInvertMCFilter">Invert operation of type filters?</input><br>';

         uroCtrlMCs.innerHTML += '<hr>';

         uroCtrlMCs.innerHTML += '<br><b>Filter by description/comments/following:</b><br>';
         uroCtrlMCs.innerHTML += '<input type="checkbox" id="_cbMCHideMyFollowed" pairedWith="_cbMCHideMyUnfollowed">Ones I am or </input>';
         uroCtrlMCs.innerHTML += '<input type="checkbox" id="_cbMCHideMyUnfollowed" pairedWith="_cbMCHideMyFollowed">am not following</input><br><br>';

         uroCtrlMCs.innerHTML += '<input type="checkbox" id="_cbMCDescriptionMustBePresent" pairedWith="_cbMCDescriptionMustBeAbsent">Hide</input> or ';
         uroCtrlMCs.innerHTML += '<input type="checkbox" id="_cbMCDescriptionMustBeAbsent" pairedWith="_cbMCDescriptionMustBePresent">show</input> MCs with no description<br>';
         uroCtrlMCs.innerHTML += '<input type="checkbox" id="_cbMCCommentsMustBePresent" pairedWith="_cbMCCommentsMustBeAbsent">Hide</input> or ';
         uroCtrlMCs.innerHTML += '<input type="checkbox" id="_cbMCCommentsMustBeAbsent" pairedWith="_cbMCCommentsMustBePresent">show</input> MCs with no comments<br>';
         uroCtrlMCs.innerHTML += '<input type="checkbox" id="_cbMCExpiryMustBePresent" pairedWith="_cbMCExpiryMustBeAbsent">Hide</input> or ';
         uroCtrlMCs.innerHTML += '<input type="checkbox" id="_cbMCExpiryMustBeAbsent" pairedWith="_cbMCExpiryMustBePresent">show</input> MCs with no expiry date<br>';
         uroCtrlMCs.innerHTML += '<input type="checkbox" id="_cbMCEnableKeywordMustBePresent">Hide MCs not including </input>';
         uroCtrlMCs.innerHTML += '<input type="text" style="font-size:14px; line-height:16px; height:22px; margin-bottom:4px;" id="_textMCKeywordPresent"><br>';
         uroCtrlMCs.innerHTML += '<input type="checkbox" id="_cbMCEnableKeywordMustBeAbsent">Hide MCs including </input>';
         uroCtrlMCs.innerHTML += '<input type="text" style="font-size:14px; line-height:16px; height:22px; margin-bottom:4px;" id="_textMCKeywordAbsent"><br>';
         uroCtrlMCs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbMCCaseInsensitive"><i>Case-insensitive matches?</i></input><br>';
         uroCtrlMCs.innerHTML += '<input type="checkbox" id="_cbMCCreatorIDFilter">Show MCs created by user</input>';
         uroCtrlMCs.innerHTML += '<select id="_selectMCCreatorID" style="width:80%; height:22px;"></select><br>';
         uroCtrlMCs.innerHTML += '<br><b>Hide MCs with lock level:</b><br>';
         uroCtrlMCs.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideMCRank0">L1</input>';
         uroCtrlMCs.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideMCRank1">L2</input>';
         uroCtrlMCs.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideMCRank2">L3</input>';
         uroCtrlMCs.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideMCRank3">L4</input>';
         uroCtrlMCs.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideMCRank4">L5</input>';
         uroCtrlMCs.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideMCRank5">L6</input>';
         uroCtrlMCs.innerHTML += '<hr>';
         uroCtrlMCs.innerHTML += '<input type="checkbox" id="_cbMCEnhancePointMCVisibility">Enhance visibility of point MCs</input>';
      }

      // Map problems controls tab
      {
         uroCtrlMPs.id = "uroCtrlMPs";
         uroCtrlMPs.innerHTML = 'MP filter list being populated, please wait...';
      }

      // Places filtering tab
      {
         uroCtrlPlaces.id = "uroCtrlPlaces";
         uroCtrlPlaces.innerHTML = 'Places filter list being populated, please wait...';
      }

      // Camera controls tab
      {
         uroCtrlCameras.id = "uroCtrlCameras";
         uroCtrlCameras.innerHTML = '<br><b>Show Cameras created by:</b><br>';
         uroCtrlCameras.innerHTML += '<input type="checkbox" id="_cbShowWorldCams" checked>world_* users</input><br>';
         uroCtrlCameras.innerHTML += '<input type="checkbox" id="_cbShowUSACams" checked>usa_* users</input><br>';
         uroCtrlCameras.innerHTML += '<input type="checkbox" id="_cbShowNonWorldCams" checked>other users</input><br>';

         uroCtrlCameras.innerHTML += '<br><b>Show Cameras touched by a specific editor:</b><br>';
         uroCtrlCameras.innerHTML += '<input type="checkbox" id="_cbShowOnlyCamsCreatedBy">Created by</input>&nbsp;/&nbsp;';
         uroCtrlCameras.innerHTML += '<input type="checkbox" id="_cbShowOnlyCamsEditedBy">edited by</input><br>';
         uroCtrlCameras.innerHTML += '<input type="text" style="font-size:14px; line-height:16px; height:22px; margin-bottom:4px;" id="_textCameraEditor"><br>';
         uroCtrlCameras.innerHTML += '<select id="_selectCameraUserID" style="width:80%; height:22px;"></select><br>';
         uroCtrlCameras.innerHTML += '<br><input type="checkbox" id="_cbShowOnlyMyCams">Show ONLY cameras created/edited by me</input><br>';

         uroCtrlCameras.innerHTML += '<br><b>Show Cameras by type:</b><br>';
         uroCtrlCameras.innerHTML += '<input type="checkbox" id="_cbShowSpeedCams" checked>Speed</input><br>';
         uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbShowIfSpeedSet" checked> with speed data</input><br>';
         uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbShowIfNoSpeedSet" checked> with no speed data</input><br>';
         uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbShowIfInvalidSpeedSet" checked> with invalid speed data</input><br>';
         uroCtrlCameras.innerHTML += '<input type="checkbox" id="_cbShowRedLightCams" checked>Red Light</input><br>';
         uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbShowRLCIfZeroSpeedSet" checked> with speed limit = 0</input><br>';
         uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbShowRLCIfNonZeroSpeedSet" checked> with speed limit > 0</input><br>';
         uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbShowRLCIfNoSpeedSet" checked> with no speed data</input><br>';
         uroCtrlCameras.innerHTML += '<input type="checkbox" id="_cbShowDummyCams" checked>Dummy</input><br>';

         uroCtrlCameras.innerHTML += '<br><b>Hide Cameras by creator:</b><br>';
         uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideCreatedByMe">me</input>';
         uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideCreatedByRank0">L1</input>';
         uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideCreatedByRank1">L2</input>';
         uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideCreatedByRank2">L3</input>';
         uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideCreatedByRank3">L4</input>';
         uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideCreatedByRank4">L5</input>';
         uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideCreatedByRank5">L6</input>';

         uroCtrlCameras.innerHTML += '<br><b>Hide Cameras by updater:</b><br>';
         uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideUpdatedByMe">me</input>';
         uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideUpdatedByRank0">L1</input>';
         uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideUpdatedByRank1">L2</input>';
         uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideUpdatedByRank2">L3</input>';
         uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideUpdatedByRank3">L4</input>';
         uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideUpdatedByRank4">L5</input>';
         uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideUpdatedByRank5">L6</input>';

         uroCtrlCameras.innerHTML += '<br><br><b><input type="checkbox" id="_cbHideCWLCams">Hide cameras on watchlist</input></b><br>';

         uroCtrlCameras.innerHTML += '<br><br><b><input type="checkbox" id="_cbHighlightInsteadOfHideCams">Highlight instead of hide</input></b><br>';
      }

      // Object watchlist tab
      {
         uroOWL.id = "uroOWL";
         uroCWLGroups = [];
         uroOWLUpdateHTML();
      }

      // Misc controls tab
      {
         uroCtrlMisc.id = "uroCtrlMisc";
         uroCtrlMisc.innerHTML = '<br><b>Hide Road Closures:</b><br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbHideUserRTCs">added from the app</input><br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbHideEditorRTCs">active</input> / <input type="checkbox" id="_cbHideFutureEditorRTCs">future added from WME</input><br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbHideWazeRTCs">active</input> / <input type="checkbox" id="_cbHideFutureWazeRTCs">future added by Waze</input><br>';

         uroCtrlMisc.innerHTML += '<br><b><input type="checkbox" id="_cbHideSegmentsWhenRoadsHidden" />Hide segment layer when road layer is hidden</b><br>';

         uroCtrlMisc.innerHTML += '<br><b><input type="checkbox" id="_cbKillInertialPanning" />Stop inertial panning when mouse moves out of map area</b><br>';

         uroCtrlMisc.innerHTML += '<br><br><b>Use default conversation markers:</b><br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbNativeConvoMarkers" checked />in public WME<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbNativeBetaConvoMarkers" checked />in beta WME<br>';

         uroCtrlMisc.innerHTML += '<br><br><b><input type="checkbox" id="_cbCommentCount" />Show comment count on UR markers</b><br>';

         uroCtrlMisc.innerHTML += '<br><br><b><input type="checkbox" id="_cbEnableDeleteFeedEntries" />Enable delete feed entries button</b><br>';

         uroCtrlMisc.innerHTML += '<br><br><b><input type="checkbox" id="_cbURBackfill" />Backfill UR data</b><br>';

         uroCtrlMisc.innerHTML += '<br><br><b>Disable filtering above zoom level </b>';
         uroCtrlMisc.innerHTML += '<input type="number" min="0" max="10" value="10" size="2" style="width:50px;;line-height:14px;height:22px;margin-bottom:4px;" id="_inputFilterMinZoomLevel" /><br>';

         uroCtrlMisc.innerHTML += '<br><br><b>Marker Unstacking:</b><br>';
         uroCtrlMisc.innerHTML += 'Distance threshold: <input type="number" min="1" max="30" value="15" size="2" style="width:50px;;line-height:14px;height:22px;margin-bottom:4px;" id="_inputUnstackSensitivity" /><br>';
         uroCtrlMisc.innerHTML += 'Disable below zoom: <input type="number" min="0" max="10" value="3" size="2" style="width:50px;;line-height:14px;height:22px;margin-bottom:4px;" id="_inputUnstackZoomLevel" /><br>';

         uroCtrlMisc.innerHTML += '<br><br><b>Use custom marker for URs tagged as:</b><br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbCustomRoadworksMarkers" />[ROADWORKS]<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbCustomConstructionMarkers" />[CONSTRUCTION]<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbCustomClosuresMarkers" />[CLOSURE]<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbCustomEventsMarkers" />[EVENT]<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbCustomNotesMarkers" />[NOTE]<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbCustomBOGMarkers" />[BOG]<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbCustomDifficultMarkers" />[DIFFICULT]<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbCustomWSLMMarkers" />[WSLM]<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbCustomNativeSLMarkers" />Native speed limit reports<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbCustomKeywordMarkers" />';
         uroCtrlMisc.innerHTML += '<input type="text" style="font-size:14px; line-height:16px; height:22px; margin-bottom:4px;" id="_textCustomKeyword" /><br>';

         uroCtrlMisc.innerHTML += '<br><br><b>Use custom marker for MPs tagged as:</b><br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbCustomElginMarkers" />[Elgin]<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbCustomTrafficMasterMarkers" />[TM]<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbCustomTrafficCastMarkers" />[TrafficCast]<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbCustomCaltransMarkers" />[Caltrans]<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbCustomTFLMarkers" />[TfL Open Data]<br>';

         uroCtrlMisc.innerHTML += '<br><br><b>Popup mouse behaviour:</b><br>';
         uroCtrlMisc.innerHTML += 'Mouse idle <input type="number" min="1" max="10" value="2" size="2" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputPopupDwellTimeout" /> *100ms<br>';
         uroCtrlMisc.innerHTML += 'Mouse over <input type="number" min="1" max="10" value="2" size="2" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputPopupEntryTimeout" /> *100ms<br>';
         uroCtrlMisc.innerHTML += 'Distance <input type="number" min="0" max="10" value="2" size="2" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputMaxJitter" /> pixels<br>';
         uroCtrlMisc.innerHTML += 'Auto-hide after <input type="number" min="0" max="10" value="0" size="2" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputPopupAutoHideTimeout" /> seconds<br>';

         uroCtrlMisc.innerHTML += '<br><br><b>Disable popup for:</b><br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbInhibitURPopup" />URs<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbInhibitMPPopup" />MPs<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbInhibitCamPopup" />Cameras<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbInhibitSegPopup" />Segments<br>';
         uroCtrlMisc.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbInhibitSegGenericPopup" />Speed limit info<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbInhibitTurnsPopup" />Restricted Turns<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbInhibitLandmarkPopup" />Places<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbInhibitPUPopup" />Place Updates<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbInhibitMapCommentPopup" />Map Comments<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbInhibitNodesPopup" />Junction Nodes<br>';

         uroCtrlMisc.innerHTML += '<br><br><b>Date/Time formatting for popups:</b><br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbDateFmtDDMMYY" pairedWith="_cbDateFmtMMDDYY,_cbDateFmtYYMMDD" checked />day/month/year<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbDateFmtMMDDYY" pairedWith="_cbDateFmtDDMMYY,_cbDateFmtYYMMDD" />month/day/year<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbDateFmtYYMMDD" pairedWith="_cbDateFmtMMDDYY,_cbDateFmtDDMMYY" />year/month/day<br><br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbTimeFmt24H" pairedWith="_cbTimeFmt12H" checked />24 hour<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbTimeFmt12H" pairedWith="_cbTimeFmt24H" />12 hour<br><br>';
         uroCtrlMisc.innerHTML += '<i>Unticked uses browser default setting</i>';

         uroCtrlMisc.innerHTML += '<br><br><b><input type="checkbox" id="_cbWhiteBackground" />Use custom background colour</b><br>';
         uroCtrlMisc.innerHTML += 'R:<input type="number" min="0" max="255" value="255" size="3" style="width:50px;;line-height:14px;height:22px;margin-bottom:4px;" id="_inputCustomBackgroundRed" />';
         uroCtrlMisc.innerHTML += 'G:<input type="number" min="0" max="255" value="255" size="3" style="width:50px;;line-height:14px;height:22px;margin-bottom:4px;" id="_inputCustomBackgroundGreen" />';
         uroCtrlMisc.innerHTML += 'B:<input type="number" min="0" max="255" value="255" size="3" style="width:50px;;line-height:14px;height:22px;margin-bottom:4px;" id="_inputCustomBackgroundBlue" /><br>';

         uroCtrlMisc.innerHTML += '<br><br><b>Replace "Next ..." button with "Done" for:</b><br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbInhibitNURButton" />URs<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbInhibitNMPButton" />MPs<br>';
         uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbInhibitNPURButton" />PURs<br>';

         uroCtrlMisc.innerHTML += '<br><br><b><input type="checkbox" id="_cbHideAMLayer" />Hide Area Manager polygons</b><br>';
         uroCtrlMisc.innerHTML += '<b><input type="checkbox" id="_cbMoveAMList" />Replace native topbar AM list</b><br>';
         uroCtrlMisc.innerHTML += '<br><b><input type="checkbox" id="_cbDisablePlacesFiltering" />Disable Places filtering</b><br>';
         ////uroCtrlMisc.innerHTML += '<b><input type="checkbox" id="_cbDisablePendingQuestions">Disable UR Pending Questions confirmation</input></b><br>';
         uroCtrlMisc.innerHTML += '<b><input type="checkbox" id="_cbDisableTabStyling" />Use default tab styling</b><br>';
         uroCtrlMisc.innerHTML += '<b><input type="checkbox" id="_cbHideEditorInfo" />Hide sidebar editor info</b><br>';
         uroCtrlMisc.innerHTML += '<b><input type="checkbox" id="_cbEnableDTE" />Drive Tab Enhancement (DTE)</b><br>';

         uroCtrlMisc.innerHTML += '<br><br><b>Settings backup/restore/reset:</b><br>';
         uroCtrlMisc.innerHTML += '<input type="button" id="_btnSettingsToText" value="Backup" />&nbsp;&nbsp;&nbsp;';
         uroCtrlMisc.innerHTML += '<input type="button" id="_btnTextToSettings" value="Restore" />&nbsp;&nbsp;|&nbsp;&nbsp;';
         uroCtrlMisc.innerHTML += '<input type="button" id="_btnResetSettings" value="Reset" /><br><br>';
         uroCtrlMisc.innerHTML += '<textarea id="_txtSettings" value="" /><br>';
         uroCtrlMisc.innerHTML += '<input type="button" id="_btnClearSettingsText" value="Clear" /><br>';

         /*
         uroCtrlMisc.innerHTML += '<br><br><b>Debug:</b><br>';
         uroCtrlMisc.innerHTML += '<input type="button" id="_btnDebugToScreen" value="Show debug data" />';
         */
      }


      // footer for tabs container
      uroCtrlHides.id = 'uroCtrlHides';
      uroCtrlHides.innerHTML = '<input type="button" id="_btnUndoLastHide" value="Undo last hide" />&nbsp;&nbsp;&nbsp;';
      uroCtrlHides.innerHTML += '<input type="button" id="_btnClearSessionHides" value="Undo all hides" /><p>';

      // footer for AM list
      uroAMList.id = 'uroAMList';

      window.addEventListener("beforeunload", uroSaveSettings, false);
   }
}

function uroSetupUI()
{
   // create a new div to display the UR details floaty-box
   uroDiv = document.createElement('div');
   uroDiv.id = "uroDiv";
   uroDiv.style.position = 'absolute';
   uroDiv.style.visibility = 'hidden';
   uroDiv.style.top = '0';
   uroDiv.style.left = '0';
   uroDiv.style.zIndex = 10000;
   uroDiv.style.backgroundColor = 'aliceblue';
   uroDiv.style.borderWidth = '3px';
   uroDiv.style.borderStyle = 'solid';
   uroDiv.style.borderRadius = '10px';
   uroDiv.style.boxShadow = '5px 5px 10px Silver';
   uroDiv.style.padding = '4px';
   document.body.appendChild(uroDiv);

   // create a new div to display script alerts
   uroAlerts = document.createElement('div');
   uroAlerts.id = "uroAlerts";
   uroAlerts.style.position = 'fixed';
   uroAlerts.style.visibility = 'hidden';
   uroAlerts.style.top = '50%';
   uroAlerts.style.left = '50%';
   uroAlerts.style.zIndex = 10000;
   uroAlerts.style.backgroundColor = 'aliceblue';
   uroAlerts.style.borderWidth = '3px';
   uroAlerts.style.borderStyle = 'solid';
   uroAlerts.style.borderRadius = '10px';
   uroAlerts.style.boxShadow = '5px 5px 10px Silver';
   uroAlerts.style.padding = '4px';
   uroAlerts.style.webkitTransform = "translate(-50%, -50%)";
   uroAlerts.style.transform = "translate(-50%, -50%)";

   var alertsHTML = '<div id="header" style="padding: 4px; background-color:LightGreen; font-weight: bold;">Alert title goes here...</div>';
   alertsHTML += '<div id="content" style="padding: 4px; background-color:White; overflow:auto;max-height:500px">Alert content goes here...</div>';
   alertsHTML += '<div id="controls" align="center" style="padding: 4px;">';
   alertsHTML += '<span id="uroAlertTickBtn" style="cursor:pointer;font-size:14px;border:thin outset black;padding:2px 10px 2px 10px;">';
   alertsHTML += '<i class="fa fa-check"> </i>';
   alertsHTML += '<span id="uroAlertTickBtnCaption" style="font-weight: bold;"></span>';
   alertsHTML += '</span>';
   alertsHTML += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
   alertsHTML += '<span id="uroAlertCrossBtn" style="cursor:pointer;font-size:14px;border:thin outset black;padding:2px 10px 2px 10px;">';
   alertsHTML += '<i class="fa fa-times"> </i>';
   alertsHTML += '<span id="uroAlertCrossBtnCaption" style="font-weight: bold;"></span>';
   alertsHTML += '</span>';
   alertsHTML += '</div>';
   uroAlerts.innerHTML = alertsHTML;
   document.body.appendChild(uroAlerts);

   uroControls = document.createElement('section');
   uroControls.style.fontSize = '12px';
   uroControls.style.height = '100%';
   uroControls.id = "sidepanel-uroverview";
   uroControls.className = "tab-pane";
   uroControls.innerHTML = '<div id="uroControlsContainer" style="display:flex;flex-direction:column;height:100%"></div>';
   var userTabs = document.getElementById(uroUserTabId);
   // when switching into MTE mode, userTabs will be null, so we abandon the UI setup...
   if(userTabs === null) return false;
   var tabContent = null;
   var navTabs = userTabs.getElementsByClassName('nav-tabs')[0];
   tabContent = document.getElementById('user-info').getElementsByClassName('tab-content')[0];
   var newtabUR = document.createElement('li');
   newtabUR.innerHTML = '<a href="#sidepanel-uroverview" data-toggle="tab">URO+</a>';
   navTabs.appendChild(newtabUR);
   tabContent.appendChild(uroControls);

   uroAddLog('waiting for controls container...');
   uroWaitForControlsContainer();
   return true;
}

function dteAddHeader()
{
   if(uroMTEMode) return;
   if(!uroInitialised) return;

   var rlcObj = document.getElementsByClassName("result-list-container");
   if(typeof rlcObj == "undefined") return;
   if(typeof rlcObj[0].children[0] == "undefined") return;
   if(typeof rlcObj[0].children[0].innerHTML == "undefined") return;

   var thtml = rlcObj[0].children[0].innerHTML;
   if(thtml.indexOf('Full drive history') == -1)
   {
      thtml += '<br><br><i><small>Full drive history goes back to '+dteOldestFullDrive.toDateString()+'</small></i>';
      rlcObj[0].children[0].innerHTML = thtml;
   }
}

function dteGetData()
{
   var loc = 'https://'+window.location.hostname+W.Config.api_base+'/Archive/MyList?minDistance=1000';
   loc += '&offset='+dteOffset+'&count=5';
   var dteReq = new XMLHttpRequest();
   dteReq.onreadystatechange = function()
   {
      var foundMissingDrive = false;

      if(dteReq.readyState == 4)
      {
         uroAddLog('drive data request, response '+dteReq.status+' received');
         if(dteReq.status == 200)
         {
            if(dteReq.responseText !== "")
            {
               var drives = JSON.parse(dteReq.responseText);
               var loadedDrives = drives.archives.objects.length;
               uroAddLog('received '+loadedDrives+' drives');
               if(loadedDrives != 5) foundMissingDrive = true;

               for(var loop=0; loop < loadedDrives; loop++)
               {
                  if(drives.archives.objects[loop].hasFullSession === false)
                  {
                     foundMissingDrive = true;
                  }
                  else
                  {
                     dteOffset++;
                     dteOldestFullDrive = new Date(drives.archives.objects[loop].startTime);
                  }
               }
            }
            else
            {
               foundMissingDrive = true;
            }
         }
         if(foundMissingDrive === false)
         {
            dteGetData();
         }
         else
         {
            uroAddLog(dteOffset+' full drives in history');
            uroAddLog('oldest drives are on '+dteOldestFullDrive.toDateString());
            if(dteOffset < 5)
            {
               dteOffset = 5;
               uroAddLog('insufficient full drives, using standard drives tab');
            }
            else if(dteOffset > 50)
            {
               var nPages = Math.ceil(dteOffset / 50);
               uroAddLog('too many full drives for a single tab page, splitting over '+nPages+' pages...');
               dteOffset = Math.ceil(dteOffset/nPages);
            }

            if((dteOldestFullDrive - dteEpoch) > 0)
            {
               var totalDrives = 0;
               if(W.model.archives.additionalInfo !== null)
               {
                  totalDrives = W.model.archives.additionalInfo.totalSessions;
               }
               if(totalDrives !== null)
               {
                  uroAddLog('updating drives tab...');
                  dteControls.sidePanelView.ResultsPerPage = dteOffset;
                  uroAddLog(totalDrives+' drives in history');
                  dteControls.sidePanelView.setSessions(totalDrives);
                  dteControls.loadSessions(0);
               }
               setInterval(dteAddHeader,250);
               setInterval(dteCheckDriveListChanges,250);
            }
         }
      }
   };
   dteReq.open('GET',loc,true);
   dteReq.send();

}

function dteSetNewTabLength()
{
   uroAddLog('altering ResultsPerPage parameter...');

   var t = document.getElementById('sidepanel-drives');
   t.style.overflow = 'auto';
   t.style.height = (window.innerHeight * 0.6) + 'px';

   dteOffset = 0;

   dteGetData();
}

function dteListClick()
{
   dteClearListHighlight();
   this.style.backgroundColor = "lightgreen";
   dteArmClearHighlightsOnPanelClose = true;
}

function dteClearListHighlight()
{
   var drivesShown = document.getElementById('sidepanel-drives').getElementsByClassName('result session').length;
   if(drivesShown > 0)
   {
      for(var loop = 0;loop < drivesShown; loop++)
      {
         var listEntry = document.getElementById('sidepanel-drives').getElementsByClassName('result session')[loop];
         listEntry.style.backgroundColor = "";
      }
   }
}

function dteCheckDriveListChanges()
{
   if(uroMTEMode) return;
   if(!uroInitialised) return;

   var drivesShown = document.getElementById('sidepanel-drives').getElementsByClassName('result session').length;
   if(drivesShown > 0)
   {
      var topID = document.getElementById('sidepanel-drives').getElementsByClassName('result session')[0].getAttribute('data-id');
      if(topID != dteTopID)
      {
         dteTopID = topID;
         for(var loop = 0;loop < drivesShown; loop++)
         {
            var listEntry = document.getElementById('sidepanel-drives').getElementsByClassName('result session')[loop];
            var driveID = listEntry.getAttribute('data-id');
            var driveObj = W.model.archives.objects[driveID];
            var driveSecs = Math.floor((driveObj.endTime - driveObj.startTime) / 1000);
            var driveHours = Math.floor(driveSecs / 3600);
            driveSecs -= (driveHours * 3600);
            var driveMins = Math.floor(driveSecs / 60);
            driveSecs -= (driveMins * 60);
            var trueTime = (driveHours+':'+("0"+driveMins).slice(-2)+'.'+("0"+driveSecs).slice(-2));
            listEntry.getElementsByTagName('span')[1].innerHTML = trueTime;
            listEntry.addEventListener("click", dteListClick, false);
         }
      }
   }
}

uroInitialise();