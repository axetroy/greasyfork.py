// ==UserScript==
// @name         WME Housenumbers to POI
// @version      2019.01.23
// @description  Converts HouseNumbers to POI
// @author       davidakachaos
// @include      /^https:\/\/(www|beta)\.waze\.com(\/\w{2,3}|\/\w{2,3}-\w{2,3}|\/\w{2,3}-\w{2,3}-\w{2,3})?\/editor\b/
// @grant        none
// @namespace WME
// ==/UserScript==

(function() {

  function log(m) { console.log('%cWME HN2POI:%c ' + m, 'color: darkcyan; font-weight: bold', 'color: dimgray; font-weight: normal'); }
  function warn(m) { console.warn('WME HN2POI: ' + m); }
  function err(m) { console.error('WME HN2POI: ' + m); }

  const d = window.document;
  const q = d.querySelector.bind(d);
  const qa = d.querySelectorAll.bind(d);
  let sm = null; // Waze Selection Manager
  let settings = {};
  let lastDownloadTime = Date.now();
  let oldSegmentsId = [];
  const locales = {
    en: {
      makePoiButtonText: 'HN → POI',
      noDuplicatesLabel: 'No POI duplicates'
    },
    nl: {
      makePoiButtonText: 'HN → POI',
      noDuplicatesLabel: 'Geen duplicaten'
    },
    ru: {
      makePoiButtonText: 'HN → POI',
      noDuplicatesLabel: 'Без дубликатов POI'
    }
  };

  function txt(id) {
    return locales[I18n.locale] === undefined ?  locales['en'][id] : locales[I18n.locale][id];
  }

  // Helper to create dom element with attributes
  function newEl(name, attrs) {
    const el = d.createElement(name);
    for (let attr in attrs) if (el[attr] !== undefined) el[attr] = attrs[attr];
    return el;
  }

  function wait() {
    if (!W || !W.map || !W.model) {
        setTimeout(wait, 1000);
        log('Waiting Waze...');
        return;
    }
    log("Ready...");
    init();
  };

  function initUI() {
    const tabs = q('.nav-tabs'), tabContent = q('#user-info .tab-content');

    if (!tabs || !tabContent) {
      log('Waze UI not ready...');
      setTimeout(initUI, 500);
      return;
    }

    const tabPaneContent = [
      '<p>WME HN2POI</p>',
      `<div><input type="checkbox" id="hn2poi-add-residential" /><label for="hn2poi-add-residential">${txt('addResidentialLabel')}</label></div>`,
      `<div><input type="checkbox" id="hn2poi-no-duplicates" /><label for="hn2poi-no-duplicates">${txt('noDuplicatesLabel')}</label></div>`,
    ].join('');

    const tabPane = newEl('div', {id: 'sidepanel-hn2poi', className: 'tab-pane', innerHTML: tabPaneContent});

    tabs.appendChild(newEl('li', {innerHTML: '<a href="#sidepanel-hn2poi" data-toggle="tab">HN2POI</a>'}));
    tabContent.appendChild(tabPane);

    const s = localStorage['hn2poi'];
    settings = s ? JSON.parse(s) : { noDuplicates: true };

    const noDuplicatesInput = q('#hn2poi-no-duplicates');

    noDuplicatesInput.checked = settings.noDuplicates;
    noDuplicatesInput.addEventListener('change', updateSettings);

    log('UI initialized...');
  }

  function init() {
    sm = W.selectionManager;
    sm.events.register("selectionchanged", null, onSelect);

    const scriptName = 'hn2poi';

    RegisterKeyboardShortcut(scriptName, 'HN2POI', 'hn-to-poi', txt('makePoiButtonText'), makePOI, '-1');
    LoadKeyboardShortcuts(scriptName);

    window.addEventListener("beforeunload", function() {
        SaveKeyboardShortcuts(scriptName);
    }, false);

    initUI();
  }

  function updateSettings() {
    settings.noDuplicates = q('#hn2poi-no-duplicates').checked;
    localStorage['hn2poi'] = JSON.stringify(settings);
  }

  function onSelect() {
    const fts = sm.getSelectedFeatures();

    if (!fts || fts.length === 0 || fts[0].model.type !== "segment" || !fts.some(f => f.model.attributes.hasHNs)) return;

    const pane = newEl('div', {className: 'form-group'});
    const makePoiBtn = newEl('button', {className: 'waze-btn waze-btn-white action-button', style: 'display: inline-block', innerText: txt('makePoiButtonText')});
    const delHNbtn = newEl('button', {className: 'waze-btn waze-btn-white action-button', style: 'display: inline-block', innerText: txt('delHNButtonText')});

    makePoiBtn.addEventListener('click', makePOI);

    pane.appendChild(makePoiBtn);

    q('#edit-panel .tab-pane').insertBefore(pane, q('#edit-panel .tab-pane .more-actions'));
  }

  function hasDuplicates(poi, addr) {
    const venues = W.model.venues.objects;
    for (let k in venues)
      if (venues.hasOwnProperty(k)) {
        const otherPOI = venues[k];
        const otherAddr = otherPOI.getAddress().attributes;
        if (
          poi.attributes.name == otherPOI.attributes.name
          && poi.attributes.houseNumber == otherPOI.attributes.houseNumber
          && poi.attributes.residential == otherPOI.attributes.residential
          && addr.street.name == otherAddr.street.name
          && addr.city.attributes.name == otherAddr.city.attributes.name
          && addr.country.name == otherAddr.country.name
          )
          return true; // This is duplicate
      }
    return false;
  }

  function makePOI() {
    log('Creating POIs from HouseNumbers')
    const fts = sm.getSelectedFeatures();

    if (!fts || fts.length === 0 || fts[0].model.type !== "segment" || !fts.some(f => f.model.attributes.hasHNs)) return;
    const segs = [];

    // collect all segments ids with HN
    fts.forEach(f => {
      if (!f.model.attributes.hasHNs)
        return;
      segs.push(f.model.attributes.id);
    });
    // check the currently loaded housenumber objects
    let objHNs = W.model.segmentHouseNumbers.objects;
    let loadedSegmentsId = segs.filter(function(key) {
      if (Object.keys(objHNs).indexOf(key) >= 0) {
        return false;
      } else if (oldSegmentsId.indexOf(key) < 0 || lastDownloadTime < objSeg[key].attributes.updatedOn) {
        return true;
      } else {
        return false;
      }
    });
    // Now we must load the housenumbers from the server which have not been loaded in
    if (loadedSegmentsId.length > 0) {
      lastDownloadTime = Date.now();
      $.ajax({
        dataType: "json",
        url: getDownloadURL(),
        data: {ids: loadedSegmentsId.join(",")},
        success: function(json) {
          if (json.error !== undefined) {
          } else {
            var ids = [];
            if ("undefined" !== typeof(json.segmentHouseNumbers.objects)) {
              for (var k = 0; k < json.segmentHouseNumbers.objects.length; k++) {
                //drawHNLine("JSON", json.segmentHouseNumbers.objects[k]);
                addPoiForHN(json.segmentHouseNumbers.objects[k], 'JSON')
              }
            }
          }
        }
      });
    }
    oldSegmentsId = segs;
    segs.forEach(segID => {
      W.model.segmentHouseNumbers.getHouseNumbersBySegmentId(segID).forEach(num => {
        addPoiForHN(num, 'OBJECT')
      });
    });
  }

  function addPoiForHN(num, source){
    const epsg900913 = new OL.Projection("EPSG:900913");
    const epsg4326 = new OL.Projection("EPSG:4326");
    const Landmark = require('Waze/Feature/Vector/Landmark');
    const AddLandmark = require('Waze/Action/AddLandmark');
    const UpdateFeatureAddress = require('Waze/Action/UpdateFeatureAddress');
    const addr = W.model.segments.getObjectById(num.segID).getAddress().attributes;

    const newAddr = {
      countryID: addr.country.id,
      stateID: addr.state.id,
      cityName: addr.city.attributes.name,
      emptyCity: !1,
      streetName: addr.street.name,
      streetEmpty: !1,
    };

    const res = new Landmark();
    if (source === 'JSON'){
      res.geometry = new OL.Geometry.Point(num.geometry.coordinates[0], num.geometry.coordinates[1]).transform(epsg4326, epsg900913);
    } else {
      res.geometry = num.geometry.clone();
    }
    // res.geometry.x += 10;
    res.attributes.residential = true;
    res.attributes.houseNumber = num.number;

    if (settings.noDuplicates && hasDuplicates(res, addr))
      return;

    W.model.actionManager.add(new AddLandmark(res));
    W.model.actionManager.add(new UpdateFeatureAddress(res, newAddr));
  }

  function getDownloadURL(){
    let downloadURL = "https://www.waze.com";
    if (~document.URL.indexOf("https://beta.waze.com")) {
      downloadURL = "https://beta.waze.com";
    }
    downloadURL += getServer();
    return downloadURL;
  }

  function getServer(){
    return W.Config.api_base + "/HouseNumbers"
    // let server = W.app.getAppRegionCode();
    // let serverUrl = "";
    // switch(server){
    //   case 'usa':
    //     serverUrl += '/Descartes/app/HouseNumbers';
    //     break;
    //   case 'row':
    //     serverUrl += '/row-Descartes/app/HouseNumbers';
    //     break;
    //   case 'il':
    //     serverUrl += '/il-Descartes/app/HouseNumbers';
    //     break;
    //   default:
    //     serverUrl += '/Descartes/app/HouseNumbers';
    // }
    // return serverUrl;
  }

  //setup keyboard shortcut's header and add a keyboard shortcuts
  function RegisterKeyboardShortcut(ScriptName, ShortcutsHeader, NewShortcut, ShortcutDescription, FunctionToCall, ShortcutKeysObj) {
    // Figure out what language we are using
    var language = I18n.currentLocale();
    //check for and add keyboard shourt group to WME
    try {
        var x = I18n.translations[language].keyboard_shortcuts.groups[ScriptName].members.length;
    } catch (e) {
        //setup keyboard shortcut's header
        W.accelerators.Groups[ScriptName] = []; //setup your shortcut group
        W.accelerators.Groups[ScriptName].members = []; //set up the members of your group
        I18n.translations[language].keyboard_shortcuts.groups[ScriptName] = []; //setup the shortcuts text
        I18n.translations[language].keyboard_shortcuts.groups[ScriptName].description = ShortcutsHeader; //Scripts header
        I18n.translations[language].keyboard_shortcuts.groups[ScriptName].members = []; //setup the shortcuts text
    }
    //check if the function we plan on calling exists
    if (FunctionToCall && (typeof FunctionToCall == "function")) {
        I18n.translations[language].keyboard_shortcuts.groups[ScriptName].members[NewShortcut] = ShortcutDescription; //shortcut's text
        W.accelerators.addAction(NewShortcut, {
            group: ScriptName
        }); //add shortcut one to the group
        //clear the short cut other wise the previous shortcut will be reset MWE seems to keep it stored
        var ClearShortcut = '-1';
        var ShortcutRegisterObj = {};
        ShortcutRegisterObj[ClearShortcut] = NewShortcut;
        W.accelerators._registerShortcuts(ShortcutRegisterObj);
        if (ShortcutKeysObj !== null) {
            //add the new shortcut
            ShortcutRegisterObj = {};
            ShortcutRegisterObj[ShortcutKeysObj] = NewShortcut;
            W.accelerators._registerShortcuts(ShortcutRegisterObj);
        }
        //listen for the shortcut to happen and run a function
        W.accelerators.events.register(NewShortcut, null, function() {
            FunctionToCall();
        });
    } else {
        alert('The function ' + FunctionToCall + ' has not been declared');
    }

  }
  //if saved load and set the shortcuts
  function LoadKeyboardShortcuts(ScriptName) {
	if (localStorage[ScriptName + 'KBS']) {
		var LoadedKBS = JSON.parse(localStorage[ScriptName + 'KBS']); //JSON.parse(localStorage['WMEAwesomeKBS']);
		for (var i = 0; i < LoadedKBS.length; i++) {
			W.accelerators._registerShortcuts(LoadedKBS[i]);
		}
	}
  }

  function SaveKeyboardShortcuts(ScriptName) {
	var TempToSave = [];
	for (var name in W.accelerators.Actions) {
		var TempKeys = "";
		if (W.accelerators.Actions[name].group == ScriptName) {
			if (W.accelerators.Actions[name].shortcut) {
				if (W.accelerators.Actions[name].shortcut.altKey === true) {
					TempKeys += 'A';
				}
				if (W.accelerators.Actions[name].shortcut.shiftKey === true) {
					TempKeys += 'S';
				}
				if (W.accelerators.Actions[name].shortcut.ctrlKey === true) {
					TempKeys += 'C';
				}
				if (TempKeys !== "") {
					TempKeys += '+';
				}
				if (W.accelerators.Actions[name].shortcut.keyCode) {
					TempKeys += W.accelerators.Actions[name].shortcut.keyCode;
				}
			} else {
				TempKeys = "-1";
			}
			var ShortcutRegisterObj = {};
			ShortcutRegisterObj[TempKeys] = W.accelerators.Actions[name].id;
			TempToSave[TempToSave.length] = ShortcutRegisterObj;
		}
	}
	localStorage[ScriptName + 'KBS'] = JSON.stringify(TempToSave);
  }
  wait();
})();
