// ==UserScript==
// @name        Customizable layout for gibgas.de route planning results page
// @namespace   customizable-layout-for-gibgas.de-route-planning-results-page
// @description This script lets you customize the layout of the route planning results page to avoid annoying contens and make it printable.
// @include     http://www.gibgas.de/Tankstellen/Umkreissuche%20-%20Routenplaner
// @include     https://www.gibgas.de/Tankstellen/Umkreissuche%20-%20Routenplaner
// @version     0.02
// @grant       none
// ==/UserScript==
var aryCommon         = ['#overDiv'];
var aryTop            = ['#feeds', '#header', '#topnavi', '#pic'];
var aryLeftNavi       = ['#inner tr > td:nth-of-type(1)'];
var aryRouteConfig    = ['#rr > div:nth-of-type(1)', '#rr > table:nth-of-type(1)'];
var aryMapOverLays    = ['#ggMapmap > div > div > div:nth-of-type(7)', '#ggMapmap > div > div > div:nth-of-type(6)', '#ggMapmap > div > div > div:nth-of-type(4)', '#ggMapmap > div > div > div:nth-of-type(2)'];
var aryStationFilters = ['#ggMapfilter'];
var aryFooter         = ['#rr > div:nth-last-of-type(1)', '#rr > div:nth-last-of-type(1)', '#footer']
var aryBackgrounds    = ['#outer', '#col_d1'];
var aryTurns          = ['#ggMaproute tbody'];
var aryClosedStations = ['#poilist tr[data-states*="_r_"]'];
var dashBoardCSS      = `
  #dashBoard {
    padding: 5px;
    background-color: #DBDBDB;
    width: 260px;
    border: 1px solid darkgray;
    position: fixed;
    top: 20px;
    right: 20px;
    border-radius: 10px;
    text-align: center;
    opacity: 0.8;
    z-index: 1000001;
  }

  #dashBoard > fieldset {
    border-radius: 10px;
  }

  #dashBoard ul {
    list-style-type: none;
    text-align: left;
    padding-left: 0px;
  }

  #dashBoard ul label {
    font-size: 1.5em;
    font-family: sans-serif;
  }

  #dashBoard ul label input[type=checkbox] {
    -moz-transform: scale(1.5); /* FF */
    -webkit-transform: scale(1.5); /* Safari and Chrome */
    margin-right: 1em;
  }

  #dashBoard > input[type=button] {
    height: 50px;
    font-size: 2em;
    font-family: sans-serif;
    border-radius: 10px;
  }

  #dashBoard > .active {
    background-color: darkgray;
  }

  #dashBoard > .passive {
    background-color: red;
  }

  .hidden {
    display: none !important;
  }

  .noImage {
    background-image: none !important;
  }

  #ggMaproute table {
    width: 100%;
  }
`;
var dashBoardHTML     = `
<div id='dashBoard' class='gmnoprint'>
  <fieldset id='optimizationOptions'>
    <ul>
      <li> 
        <label>
          <input id='aryTop' type='checkbox' name='option' value='Top' checked />Kopf
        </label>
      </li>
      <li>  
        <label>
          <input id='aryLeftNavi' type='checkbox' name='option' value='LeftNavi' checked />Navigation
        </label>
      </li>
      <li>  
        <label>
          <input id='aryRouteConfig' type='checkbox' name='option' value='RouteConfig' checked />Routenkonfiguration
        </label>
      </li>
      <li>  
        <label>
          <input id='aryMapOverLays' type='checkbox' name='option' value='MapOverLays' checked />Karteneinblendungen
        </label>
      </li>
      <li>  
        <label>
          <input id='aryStationFilters' type='checkbox' name='option' value='StationFilters' checked />Tankstellenfilter
        </label>
      </li>
      <li>  
        <label>
          <input id='aryFooter' type='checkbox' name='option' value='Footer' checked />Fuß
        </label>
      </li>
      <li>  
        <label>
          <input id='aryBackgrounds' type='checkbox' name='option' value='Backgrounds' checked />Hintergr&uuml;nde
        </label>
      </li>
      <li>  
        <label>
          <input id='aryTurns' type='checkbox' name='option' value='Turns' disabled checked />Wegbeschreibung
        </label>
      </li>
      <li>  
        <label>
          <input id='aryClosedStations' type='checkbox' name='option' value='ClosedStations' disabled checked />Geschlossene Tankstellen
        </label>
      </li>
    </ul>
  </fieldset>
</div>
`;

createGUI();
var theInterval = window.setInterval(autoActivate, 1000);

function createGUI() {
  injectStyle(dashBoardCSS);
  injectDashBoard(dashBoardHTML);
}

function autoActivate() {
  var rootWrapper = document.getElementById('poilist');

  //is a route computed?
  if (rootWrapper.childElementCount != 0) {
    //enable route related options
    document.getElementById('aryTurns').disabled = false;
    document.getElementById('aryClosedStations').disabled = false;

    //auto activate layout processing
    document.getElementById('aryTop')           .checked = false; handleClick(false, aryTop,            'hidden',  true);
    document.getElementById('aryLeftNavi')      .checked = false; handleClick(false, aryLeftNavi,       'hidden',  true);
    document.getElementById('aryRouteConfig')   .checked = false; handleClick(false, aryRouteConfig,    'hidden',  true);
    document.getElementById('aryMapOverLays')   .checked = false; handleClick(false, aryMapOverLays,    'hidden',  true);
    //document.getElementById('aryStationFilters').checked = false; handleClick(false, aryStationFilters, 'hidden',  true);
    document.getElementById('aryFooter')        .checked = false; handleClick(false, aryFooter,         'hidden',  true);
    document.getElementById('aryBackgrounds')   .checked = false; handleClick(false, aryBackgrounds,    'noImage', true);
    //document.getElementById('aryTurns')         .checked = false; handleClick(false, aryTurns,          'hidden',  true);
    document.getElementById('aryClosedStations').checked = false; handleClick(false, aryClosedStations, 'hidden',  false);

    //options have been applied, so stop scanning
    clearInterval(theInterval);
  }
}

function injectStyle(theCSS) {
  var elmHead = document.head || document.getElementsByTagName('head')[0];
  var elmStyle = document.createElement('style');

  elmStyle.type = 'text/css';
  if (elmStyle.styleSheet) {
    elmStyle.styleSheet.cssText = theCSS;
  } else {
    elmStyle.appendChild(document.createTextNode(theCSS));
  }

  elmHead.appendChild(elmStyle);
}

function injectDashBoard(theHTML) {
  var elmBody = document.body || document.getElementsByTagName('body')[0];
  elmBody.insertAdjacentHTML('afterbegin', theHTML);

  //layout changes can be triggered by following checkboxes
  document.getElementById('aryTop')           .addEventListener('click', function(event){handleClick(event.target.checked, aryTop,            'hidden',  true)}, false);
  document.getElementById('aryLeftNavi')      .addEventListener('click', function(event){handleClick(event.target.checked, aryLeftNavi,       'hidden',  true)}, false);
  document.getElementById('aryRouteConfig')   .addEventListener('click', function(event){handleClick(event.target.checked, aryRouteConfig,    'hidden',  true)}, false);
  document.getElementById('aryMapOverLays')   .addEventListener('click', function(event){handleClick(event.target.checked, aryMapOverLays,    'hidden',  true)}, false);
  document.getElementById('aryStationFilters').addEventListener('click', function(event){handleClick(event.target.checked, aryStationFilters, 'hidden',  true)}, false);
  document.getElementById('aryFooter')        .addEventListener('click', function(event){handleClick(event.target.checked, aryFooter ,        'hidden',  true)}, false);
  document.getElementById('aryBackgrounds')   .addEventListener('click', function(event){handleClick(event.target.checked, aryBackgrounds,    'noImage', true)}, false);
  document.getElementById('aryTurns')         .addEventListener('click', function(event){handleClick(event.target.checked, aryTurns,          'hidden',  true)}, false);
  document.getElementById('aryClosedStations').addEventListener('click', function(event){handleClick(event.target.checked, aryClosedStations, 'hidden',  false)}, false);

  //map resize can be triggered by following checkboxes
  document.getElementById('aryStationFilters').addEventListener('click', function(){handleMapResize()}, false);
  document.getElementById('aryTurns')         .addEventListener('click', function(){handleMapResize()}, false);
  document.getElementById('aryClosedStations').addEventListener('click', function(){handleMapResize()}, false);
}

function handleClick(blnShow, aryCSSSelectorList, strClassName, blnFindFirst) {
  var aryElementList = [];

  for each (var strCSSSelector in aryCSSSelectorList) {
    if (blnFindFirst) {
      aryElementList = aryElementList.concat(document.querySelector(strCSSSelector));
    } else {
      aryElementList = document.querySelectorAll(strCSSSelector);
    }

    for each (var elm in aryElementList) {
      if (elm.classList) {
        if (blnShow) {
          elm.classList.remove(strClassName);
        } else {
          elm.classList.add(strClassName);
        }
      }
    }
  }
}

function handleMapResize() {
  var blnShow = document.getElementById('aryTurns').checked;
  var elmStationFilters = document.getElementById('ggMapfilter');
  var elmPOIList = document.getElementById('poilist');
  var elmRouteHeader = document.getElementById('ggMaproute');

  var intTotalHeight = elmStationFilters.getBoundingClientRect().height + elmPOIList.getBoundingClientRect().height - elmRouteHeader.getBoundingClientRect().height;

  document.getElementById('ggMapmap').style = (!blnShow ? 'height: ' + intTotalHeight + 'px; max-width: 476px; min-height: 376px;' : '') + 'overflow: hidden;';
}