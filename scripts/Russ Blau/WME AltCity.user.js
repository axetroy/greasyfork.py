// ==UserScript==
// @name           WME AltCity
// @description    Easily add an alternate city name to selected segment(s)
// @namespace      russblau.waze@gmail.com
// @grant          none
// @grant          GM_info
// @version        20190501.1
// @include        /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor.*$/
// @exclude        https://www.waze.com/user/*editor/*
// @exclude        https://www.waze.com/*/user/*editor/*
// @require        https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js
// @author         russblau
// @license        MIT/BSD/X11
// ==/UserScript==

console.log("WMEAltCity user script loaded.");

function WMEAC_log(message) {
	if (typeof message === 'string') {
		console.log('WMEAltCity: ' + message);
	} else {
		console.log('WMEAltCity: ', message);
	}
}

// initialize WMEAltCity and do some checks
function WMEAC_bootstrap() {
	var wazeapi = W || window.W;
	if (!wazeapi || !wazeapi.map) {
		setTimeout(WMEAC_bootstrap, 770);
		return;
	}
	WMEAC_log("Starting initialization.");
	WMEAC_init();
}

function WMEAC_init() {
	var editpanel = document.getElementById('edit-panel');

	// Check initialisation
	if (typeof W == 'undefined' || typeof I18n == 'undefined') {
		setTimeout(WMEAC_init, 770);
		WMEAC_log('Waze object unavailable, map still loading');
		return;
	}
	if (editpanel === undefined || editpanel === null) {
		setTimeout(WMEAC_init, 770);
		WMEAC_log('edit-panel info unavailable, map still loading');
		return;
	}

	var $ = jQuery,
		WMEAltCity = {},
		UpdateObject = require("Waze/Action/UpdateObject"),
        AddOrGetStreet = require("Waze/Action/AddOrGetStreet"),
        AddAltStreet = require("Waze/Action/AddAlternateStreet"),
		MultiAction = require("Waze/Action/MultiAction");

	WMEAltCity.onAddAltCityButtonClick = function () {
        // create array of available city names indexed by state
        var available_cities = [];
        $.each(W.model.states.objects, function(id, state_obj) {
            available_cities[id] = [];
        });
        $.each(W.model.cities.objects, function(id, city_obj) {
            if (city_obj.attributes.name !== "") {
                available_cities[city_obj.attributes.stateID].push(city_obj.attributes.name);
            }
        });
        $('#acAltCityInp').autocomplete({source:available_cities[$('select.form-control.state-id').val()]});
		// show form and give input element focus
		$('#acCityForm').css("display", "block");
		$('#acAltCityInp')[0].focus();
		// hide button
		$('#acAddAltCityButton').css("display", "none");
	};

	WMEAltCity.doSubmit = function (evt) {
		// Submit button clicked
		evt.preventDefault();
		var altcity = $('#acAltCityInp').val();
        var action_flag = false;
        if (altcity !== '') {
			// city name is not empty
			WMEAC_log(altcity);
			var altcity_id;
			$.each(W.selectionManager.getSelectedFeatures(),
				function(i, segment) {
					var address = segment.model.getAddress().attributes;
					var streetname = address.street.name; // string, could be null
					if (streetname === "" || streetname === null) {
						// don't edit unnamed segments
						return;
					}
					var country = address.country;
					var state = address.state;
                    WMEAC_log(streetname + ', ' + state.name + ', ' + country.name);
                    if (typeof altcity_id === "undefined") {
						// make sure alt city already exists
						let altcity_obj = W.model.cities.getByAttributes(
							{countryID: country.id, stateID: state.id, name: altcity}
						);
						if (altcity_obj.length == 0) {
							altcity_id = null;
							WMEAC_log(`City object "${altcity}, ${state.name}" not found; aborting.`);
						} else {
							altcity_id = altcity_obj[0].getID();
							WMEAC_log(`Alt city "${altcity}" found with id ${altcity_id}`);
						}
					}
					if (altcity_id === null)
						return;
					var seg_id = segment.model.getID();
					var currentcityname = address.city.attributes.name; // not null, could be ""
					if (currentcityname == altcity) {
						 // can't set alt city same as primary city
						WMEAC_log(`Segment ${seg_id} already is in city ${altcity}; skipping.`);
						return;
					}
					if (segment.model.isLockedByHigherRank()) {
						WMEAC_log(`Segment ${seg_id} is locked; skipping.`);
						return;
					}
			        if (segment.model.type !== "segment")
						return;
			        if (! segment.model.arePropertiesEditable()) {
						WMEAC_log(`Segment ${seg_id} is not editable; skipping.`);
						return;
					}
					// see if a street with current name + alt city already exists
					var newobj = W.model.streets.getByAttributes(
						{isEmpty: false, cityID: altcity_id, name: streetname}
					);
                    var is_new;
					if (newobj.length > 0) {
    					newobj = newobj[0];
    					let alt_streets = segment.model.getAttributes().streetIDs;
    					is_new = true;
	    				let j;
		    			for (j = 0; j < alt_streets.length; j++) {
			    			if (alt_streets[j] == newobj.getID()) {
				    			WMEAC_log(`Segment ${seg_id} already has desired alt name; skipping.`);
					    		is_new = false;
						    	break;
						    }
    					}
	    				if (!is_new)
		    				return;
                    } else {
                        is_new = true;
                    }
                    W.model.actionManager.add(new AddAltStreet(W.model.segments.getObjectById(seg_id), { streetName: streetname, cityName: altcity }));
//                    action_flag = true;
					WMEAC_log(`Updated segment ${seg_id} with new alt name.`);
				}
			);
		}
//        if (action_flag) {
//            W.model.actionManager.add(multiaction);
//        }
		// hide form
		$('#acCityForm').css("display", "none");
		$('#acAltCityInp').val("");
		// show button
		$('#acAddAltCityButton').css("display", "inline-block");
	};

	WMEAltCity.doCancel = function (evt) {
		// Cancel button clicked
		evt.preventDefault();
		// hide form
		$('#acCityForm').css("display", "none");
		// show button
		$('#acAddAltCityButton').css("display", "inline-block");
	}

	WMEAltCity.makeAltCityButton = function (elem) {
		elem.append(
			$('<button>',
			  {id:'acAddAltCityButton',
			   class:'action-button waze-btn waze-btn-white',
			   style:/*'margin-left:70px; color:#26bae8'*/ 'color:#26bae8'
			  }
			 ).text('Add alt city').click(WMEAltCity.onAddAltCityButtonClick)
		);
		// see whether WME ClickSaver "alt city" link is present and remove it
		$("div#segment-edit-general label.control-label a").detach();
		// add city name dialog
		$('#acAddAltCityButton').after(
			'<form id="acCityForm" class="address-form clearfix inner-form" style="display:none">' +
			  '<div id="acAltCityDiv" class="new-alt-streets">' +
				'<div class="alt-street-form-template new-alt-street">' +
				  '<div class="alt-street-block">' +
					'<div class="city-block form-group toggleable-input">'+
					  '<label class="control-label">City</label>' +
					  '<div class="city-container">' +
						'<input id="acAltCityInp" class="city-name form-control" type="text" autocomplete="off" title="City" maxlength="100" required="">' +
					  '</div>' +
					'</div>' +
				  '</div>' +
				'</div>' +
			  '</div>' +
			  '<div class="action-buttons">' +
				'<button id=acSubmit class="save-button waze-btn waze-btn-blue waze-btn-smaller" type="submit">Apply</button>' +
				'<button id=acCancel class="cancel-button waze-btn waze-btn-smaller waze-btn-transparent" type="button">Cancel</button>' +
			  '</div>' +
			'</form>');
		$('#acSubmit').click(WMEAltCity.doSubmit);
		$('#acCancel').click(WMEAltCity.doCancel);
	};

	// check for changes in the edit-panel
	var addressEditObserver = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			// Mutation is a NodeList and doesn't support forEach like an array
			for (var i = 0; i < mutation.addedNodes.length; i++) {
				var addedNode = mutation.addedNodes[i];

				// Only fire up if it's a node
				if (addedNode.nodeType === Node.ELEMENT_NODE) {
					var addressEditDiv = addedNode.querySelector('#segment-edit-general div.address-edit');

					if (addressEditDiv) {
						WMEAltCity.makeAltCityButton($('#segment-edit-general div.address-edit'));
					}
				}
			}
		});
	});
	addressEditObserver.observe(document.getElementById('edit-panel'), { childList: true, subtree: true });
	WMEAC_log("Initialized.");
}

WMEAC_log("Bootstrapping.");
WMEAC_bootstrap();
