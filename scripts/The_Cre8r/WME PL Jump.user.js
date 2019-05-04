// ==UserScript==
// @name            WME PL Jump
// @description     Opens a PL in an existing WME window/tab.
// @version         2018.09.09.00
// @author          The_Cre8r and SAR85
// @copyright       The_Cre8r and SAR85
// @license         CC BY-NC-ND
// @grant           none
// @include         /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor\/?.*$/
// @namespace       https://github.com/TheCre8r/WME-PL-Jump-Release/
// @require			https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js
// ==/UserScript==

/* global OL */
/* global W */
/* global WazeWrap */


(function () {
    'use strict';
    var app,
        AppView,
        jumpInput,
        JumpView,
        LinkView,
        Link,
        links,
        LinkCollection,
        tab,
        c1,
        c2,
        c3;
    function log(txt) {
        if ('object' === typeof txt) {
            //text = JSON.stringify(text);
        }
        console.log('PLJ: ' + txt);
    }

    /**
     * Checks for necessary page elements or objects before initializing
     * script.
     * @param tries {Number} The number of tries bootstrapping has been
     * attempted.
     */
    function bootstrap(tries) {
        tries = tries || 0;
        if (WazeWrap.Ready && $ &&
            window.Backbone && $('#edit-buttons').size()) {
            init();
        } else if (tries < 20) {
            window.setTimeout(function () {
                bootstrap(tries + 1);
            }, 1000);
        }
    }

    /**
     * Initializes global variables and sets up HTML and event listeners.
     */
    function init() {
        var tabContent = '<div id="pljumptabcontent"></div>';

        if (!$('#pljumpinput').size()) {
            initializeLink();
            initializeCollection();
            links = new LinkCollection;
            tab = new WazeWrap.Interface.Tab('PLJump', tabContent, init2);
            updateAlert();
            app = new AppView({ collection: links });
        }

    }
    function init2() {
        if (!$('#pljumpinput').size()) {
            initializeViews();
            jumpInput = new JumpView({ collection: links });
            W.editingMediator.on('change:editingHouseNumbers', function(){
                if(!W.editingMediator.attributes.editingHouseNumbers)
                    init2();
            })
        }
        FUck();
    }

    function FUck() {
        log("Checking for WMEFU");
        if ($('#_cbShrinkTopBars').length) {
            initFU();
        }
        else {
        /**
        * MutationObserver for WMEFU
        */
        let targetNode = document.getElementById('user-tabs');              // Select the node that will be observed for mutations
        let config = { attributes:true, childList: true, subtree: true };  // Options for the observer (which mutations to observe)
        var callback = (function(mutations) {
                mutations.forEach(function(mutation) {
                    for (let i = 0; i < mutation.addedNodes.length; i++) {
                        let addedNode = mutation.addedNodes[i];
                        if (addedNode.nodeType === Node.ELEMENT_NODE) {
                            if (addedNode.innerText.includes("FU"))
                            {
                                initFU();
                                observer.disconnect();
                            }
                    }
                }
            });
        });
        var observer = new MutationObserver(callback);                      // Create an observer instance linked to the callback function
        observer.observe(targetNode, config);                               // Start observing the target node for configured mutations
        }
    }

    function initFU() {
        log('WMEFU - Loaded');
        //Change height based on WMEFU Settings
        if (JSON.parse(localStorage.WMEFUSettings).shrinkTopBars && $('#_inpUICompression').find(":selected").text() == "Low")
        {
            log('WMEFU - Initial Load for Low Compression');
            setTimeout(function () {
            $('#pljumpinput').css("height","26px");
            $('.pljump').css("margin","1px 10px 0px 10px");
            return;
            }, 950);
        }
        else if (JSON.parse(localStorage.WMEFUSettings).shrinkTopBars && $('#_inpUICompression').find(":selected").text() == "High")
        {
            log('WMEFU - Initial Load for High Compression');
            setTimeout(function () {
            $('#pljumpinput').css("height","19px");
            $('.pljump').css("margin","-6px 10px 0px 10px");
            return;
            }, 950);
        }
        $('#_cbShrinkTopBars').click(function(){
            if ($('#_cbShrinkTopBars').prop('checked'))
            {
                log('WMEFU - Shrinking');
                $('#pljumpinput').css("height","26px");
                $('.pljump').css("margin","1px 10px 0px 10px");
                return;
            }
            else
            {
                log('WMEFU - Restoring');
                $('#pljumpinput').css("height","33px");
                $('.pljump').css("margin","6px 10px 0px 10px");
                return;
            }
        });
        $( "#_inpUICompression" ).change(function() {
            if ($('#_inpUICompression').val() == "1")
            {
                log('WMEFU - Shrinking to Low Compression');
                $('#pljumpinput').css("height","26px");
                $('.pljump').css("margin","1px 10px 0px 10px");
                return;
            }
            else if ($('#_inpUICompression').val() == "0")
            {
                log('WMEFU - Restoring to No Compression');
                $('#pljumpinput').css("height","33px");
                $('.pljump').css("margin","6px 10px 0px 10px");
                return;
            }
            else if ($('#_inpUICompression').val() == "2")
            {
                log('WMEFU - Shrinking to High Compression');
                $('#pljumpinput').css("height","19px");
                $('.pljump').css("margin","-6px 10px 0px 10px");
                return;
            }
        });
    }

    function updateAlert() {
        var version = GM_info.script.version.toString();
        var versionChanges = '';
        var previousVersion;

        versionChanges += 'WME PL Jump v' + version + ' changes:\n';
        versionChanges += '- Fix UI Compatability Improvements\n';

        if (localStorage === void 0) {
            return;
        }
        localStorage.removeItem("pljumplocation");
        localStorage.removeItem("WMEPLJLocation");
        localStorage.removeItem("pljumpLocation");


        previousVersion = localStorage.pljumpVersion;

        if (version !== previousVersion) {
            alert(versionChanges);
            localStorage.pljumpVersion = version;
        }
    }

    function initializeLink() {
        /**
         * Class representing PLs.
         */
        Link = Backbone.Model.extend({
            defaults: {
                link: '',
                lonLat: null,
                segments: null,
                mapProblem: null,
                nodes: null,
                venues: null,
                selectionInBounds: false,
                selectionOnScreen: false,
                updateRequest: null,
                zoom: null
            },
            itemsToSelect: [],
            modelObject: null,
            /**
             * Checks whether the PLs items to select are in the data bounds
             * and in view.
             */
            isSelectionOnScreen: function () {
                return this.attributes.selectionInBounds &&
                    this.attributes.selectionOnScreen;
            },
            /**
             * Checks whether the PL has items to select or not.
             */
            hasItems: function () {
                return this.attributes.segments || this.attributes.nodes ||
                    this.attributes.venues || this.attributes.updateRequest ||
                    this.attributes.mapProblem;
            },
            /**
             * Parses PL to extract the location and selected item info.
             */
            initialize: function () {
                var extractedData = {},
                    link = this.get('link'),
                    lat,
                    lon,
                    lonLat,
                    mapProblem,
                    nodes,
                    segments,
                    updateRequest,
                    venues,
                    zoom;
                var linktemp = link;
                if (linktemp.includes("google")){
                    let google = link.split('@').pop().split(',');
                    lon = google[1];
                    lat = google[0];
                    zoom = parseInt(google[2]);
                    link = 'https://www.waze.com/en-US/editor/?lon=' + lon + '&lat=' + lat + '&zoom=' + $(Math.max(0,Math.min(10,(zoom - 12))))[0];
                }
                else if (linktemp.includes("mandrillapp")){
                    let mandrillapp = link.split('_');
                    mandrillapp = window.atob(mandrillapp[1]);
                    mandrillapp = mandrillapp.split(/\\/)[0];
                    link = 'https://www.waze.com/en-US/editor/?' + mandrillapp;
                }
                else if (linktemp.includes("livemap")){
                    let livemap = link.replace("lng", "lon");
                    link = livemap;
                }

                link = decodeURIComponent(link);
                lat = link.match(/lat=(-?\d+\.\d+)/);
                lon = link.match(/lon=(-?\d+\.\d+)/);
                nodes = link.match(/nodes=((\d+,?)+)/);
                segments = link.match(/segments=((\d+,?)+)/);
                updateRequest = link.match(/mapUpdateRequest=(\d+)/);
                mapProblem = link.match(/mapProblem=(\d%2F\d+)/);
                venues = link.match(/venues=((\d+\.?)+)/);
                zoom = link.match(/zoom=(\d+)/);

                extractedData.lat = lat && lat.length === 2 ?
                    parseFloat(lat[1]) : null;
                extractedData.lon = lon && lon.length === 2 ?
                    parseFloat(lon[1]) : null;
                extractedData.segments = segments && segments.length > 1 ?
                    segments[1].split(',') : null;
                extractedData.venues = venues ? venues[1].split(',') : null;
                extractedData.nodes = nodes && nodes.length > 1 ?
                    nodes[1].split(',') : null;
                extractedData.updateRequest = updateRequest &&
                    updateRequest.length === 2 ? updateRequest[1] : null;
                extractedData.mapProblem = mapProblem &&
                    mapProblem.length === 2 ?
                    mapProblem[1].replace('%2F', '/') : null;
                extractedData.zoom = zoom && zoom.length === 2 ?
                    parseInt(zoom[1]) : null;

                this.set({
                    'segments': extractedData.segments,
                    'mapProblem': extractedData.mapProblem,
                    'nodes': extractedData.nodes,
                    'venues': extractedData.venues,
                    'updateRequest': extractedData.updateRequest,
                    'zoom': extractedData.zoom
                });

                if (extractedData.lon && extractedData.lat) {
                    lonLat = new OL.LonLat(extractedData.lon,
                                           extractedData.lat);
                    lonLat.transform(W.map.displayProjection,
                                     W.map.getProjectionObject());
                    if (W.map.isValidLonLat(lonLat)) {
                        this.set('lonLat', lonLat);
                    }
                } else {
                    this.set('lonLat', { lon: 'None', lat: 'None' });
                }

                this.on('change:link', this.onLinkChanged);
            },
            /**
             * Private method to compile WME objects for selection.
             * @private
             */
            createSelection: function () {
                var i,
                    itemsToSelect = [],
                    itemType,
                    itemTypes = ['segments', 'nodes', 'venues'],
                    mapBounds = W.map.getExtent(),
                    modelObject,
                    n,
                    selectionInBounds = true,
                    selectionOnScreen = true;

                var getObject = function (element) {
                    var object = W.model[itemType].getObjectById(element);
                    if (object) {
                        itemsToSelect.push(object);
                        if (!mapBounds.intersectsBounds(
                            object.geometry.getBounds())) {
                            selectionOnScreen = false;
                        }
                    } else {
                        selectionInBounds = false;
                    }
                };

                for (i = 0, n = itemTypes.length; i < n; i++) {
                    itemType = itemTypes[i];
                    _.each(this.attributes[itemType], getObject, this);
                }

                if (this.attributes.updateRequest ||
                    this.attributes.mapProblem) {
                    modelObject = W.model.mapUpdateRequests.getObjectById(
                        this.attributes.updateRequest) || W.model.problems.getObjectById(
                        this.attributes.mapProblem) || null;
                    if (!modelObject) {
                        selectionInBounds = false;
                    } else if (!mapBounds.intersectsBounds(
                        modelObject.attributes.geometry.getBounds())) {
                        selectionOnScreen = false;
                    }
                }

                this.set({
                    'selectionInBounds': selectionInBounds,
                    'selectionOnScreen': selectionOnScreen
                });
                this.modelObject = modelObject;
                this.itemsToSelect = itemsToSelect;
                return this;
            },
            /**
             * Pans the map to the lat & lon location specified in the PL.
             * @private
             */
            moveTo: function () {
                var zoom = this.get('zoom') || W.map.getZoom();
                if (this.attributes.lonLat) {
                    W.map.moveTo(this.attributes.lonLat, zoom);
                }
                return this;
            },
            /**
             * Public method to go to a Link and select its objects.
             */
            open: function (forceMove) {
                this.createSelection();

                if (this.hasItems()) {
                    this.select();
                    if (forceMove || !this.isSelectionOnScreen()) {
                        this.moveTo();
                    }
                } else {
                    this.moveTo();
                }

                return this;
            },
            /**
             * Re-parse the link if it changes.
             */
            onLinkChanged: function () {
                this.initialize();
            },
            /**
             * Selects objects extracted from the PL.
             * @private
             */
            select: function () {
                var selectItems = function () {

                    this.createSelection();

                    if (this.modelObject) {
                        W.commands.execute('problems:show', this.modelObject);
                    }

                    if (this.itemsToSelect.length > 0) {
                        W.selectionManager.setSelectedModels(this.itemsToSelect);
                    }
                };

                WazeWrap.Model.onModelReady(selectItems,
                                            this.isSelectionOnScreen(), this);

                return this;
            }
        });
    }

    function initializeCollection() {
        /**
         * Class representing collection of PLs.
         */
        LinkCollection = Backbone.Collection.extend({
            model: Link,
            getLinkID: function () {
                var id = 0;
                return function () { return id++; };
            } ()
        });
    }
    function initializeViews() {
        /**
         * Class containing the main app interface and logic.
         */
        AppView = Backbone.View.extend({
            collection: null,
            /**
             * Gets the stored options from localStorage and returns
             * them as an object.
             */
            options: function () {
                var defaultOptions = {
                    'trackHistory': true,
                    'trackSelections': false
                };
                var options = localStorage && localStorage.pljOptions;

                options = options && JSON.parse(options) || defaultOptions;
                return options;
            } (),
            clearButtonCss: {
                'margin-bottom': '10px'
            },
            divCss: {
                'overflow-y': 'scroll',
                'max-height': '400px'
            },
            tableDivCss: {
                'overflow-y': 'scroll',
                'max-height': '400px',
                'width': '292px'
            },
            el: $('#pljumptabcontent'),
            template: function () {
                var $div = $('<div/>'),
                    $table = $('<table/>').attr('id', 'plj-history-table'),
                    $clearButton = $('<button/>').attr('id', 'plj-clear-table').
                css(this.clearButtonCss).text('Clear all entries'),
                    $trackHistory = $('<div/>').append($('<input type="checkbox" id="plj-track-history"><label>Track map move history</label>')),
                    $trackSelections = $('<div/>').append($('<input type="checkbox" id="plj-track-selections"><label>Track selections</label>')),
                    $infoText = $('<p>Click a table entry below to select it. To force the map to move to the PL location, Ctrl+Click.</p>');

                $div.append($trackHistory);
                $div.append($trackSelections);
                $div.append($clearButton.wrap('<div>').parent());
                $div.append($infoText.wrap('<div>').parent());
                $div.append($table.wrap('<div>').parent().
                            css(this.tableDivCss));

                return $div;
            },
            events: {
                'click #plj-clear-table': 'onClearTableClicked',
                'change #plj-track-history': 'onTrackHistoryChange',
                'change #plj-track-selections': 'onTrackSelectionsChange'
            },
            initialize: function () {
                this.listenTo(this.collection, 'add', this.addLink);
                this.render();
                this.onTrackHistoryChange();
                this.onTrackSelectionsChange();
            },
            render: function () {
                this.$el.append(this.template());

                this.$trackHistory = this.$el.find('#plj-track-history');
                this.$trackHistory.prop('checked',
                                        this.options['trackHistory']);

                this.$trackSelections = this.$el.find('#plj-track-selections');
                this.$trackSelections.prop('checked',
                                           this.options['trackSelections']);

                this.$table = this.$el.find('#plj-history-table');

                this.$clearButton = this.$el.find('#plj-clear-table');

                return this;
            },
            /**
             * Adds a new link to the table.
             */
            addLink: function (link) {
                var view = new LinkView({ model: link });
                this.$table.prepend(view.render().$el);
            },
            /**
             * Tracks map moves and determines if the location changed
             * after a move. This filters out zoom-only "moves".
             */
            mapLocationChanged: function () {
                var lastLocation,
                    locationChanged,
                    newLocation;
                var getMapLocation = function () {
                    var lonLat = W.map.getCenter(),
                        zoom = W.map.getZoom();
                    return {
                        lon: lonLat.lon,
                        lat: lonLat.lat,
                        zoom: zoom
                    };
                };
                var compareLocations = function () {
                    newLocation = getMapLocation();
                    if (newLocation.lon !== lastLocation.lon ||
                        newLocation.lat !== lastLocation.lat) {
                        lastLocation = newLocation;
                        locationChanged = true;
                    } else {
                        locationChanged = false;
                    }
                };
                lastLocation = getMapLocation();
                W.map.events.register('moveend', this, compareLocations);
                return function () {
                    return locationChanged;
                };
            } (),
            /**
             * Callback for clearing the link history.
             */
            onClearTableClicked: function (e) {
                this.$table.find('tr').remove();
                this.collection.reset();
            },
            /**
             * Callback for map move.
             */
            onMapMove: function () {
                if (this.mapLocationChanged()) {
                    this.collection.add({
                        link: $('.WazeControlPermalink a').prop('href')
                    });
                }
            },
            /**
             * Callback for selection change.
             */
            onSelectionChanged: function () {
                if (this.selectionChanged()) {
                    this.collection.add({
                        link: $('.WazeControlPermalink a').prop('href')
                    });
                }
            },
            /**
             * Callback for track history checkbox change.
             */
            onTrackHistoryChange: function (e) {
                var track = this.$trackHistory.prop('checked');

                W.map.events.unregister('moveend', this, this.onMapMove);

                if (track) {
                    W.map.events.register('moveend', this, this.onMapMove);
                }

                this.saveOption('trackHistory', track);
            },
            /**
             * Callback for track selections checkbox change.
             */
            onTrackSelectionsChange: function (e) {
                var track = this.$trackSelections.prop('checked');

                W.selectionManager.events.unregister('selectionchanged', this,
                                                     this.onSelectionChanged);

                if (track) {
                    W.selectionManager.events.register('selectionchanged', this,
                                                       this.onSelectionChanged);
                }

                this.saveOption('trackSelections', track);
            },
            /**
             * Saves app options to localStorage.
             */
            saveOption: function (key, value) {
                if (localStorage === void 0) { return; }
                this.options[key] = value;
                localStorage.pljOptions = JSON.stringify(this.options);
            },
            /**
             * Tracks selection changes to determine if the same object is
             * selected consecutively.
             */
            selectionChanged: function () {
                var lastSelection,
                    newSelection,
                    selectionChanged;

                var getSelectedItem = function () {
                    return W.selectionManager.hasSelectedFeatures() &&
                        W.selectionManager.getSelectedFeatures[0];
                };

                var compareSelection = function () {
                    newSelection = getSelectedItem();
                    if (W.selectionManager.hasSelectedFeatures() &&
                        lastSelection !== newSelection) {
                        lastSelection = newSelection;
                        selectionChanged = true;
                    } else {
                        selectionChanged = false;
                    }
                };

                lastSelection = getSelectedItem();
                W.selectionManager.events.register('selectionchanged', this,
                                                   compareSelection);

                return function () {
                    return selectionChanged;
                };
            } ()
        });

        /**
         * Class for displaying link data in a table.
         */
        LinkView = Backbone.View.extend({
            tagName: 'tr',
            tdCss: {
                'padding': '5px',
                'border': '1px solid gray',
                'border-right': 'none',
                'cursor': 'pointer'
            },
            linkInfoCss: {
                'margin': 0
            },
            linkRemoveCss: {
                'padding': '5px 5px 5px 10px',
                'border': '1px solid gray',
                'border-left': 'none',
                'text-align': 'center',
                'font-weight': 'bold'
            },
            template: function () {
                var $nameCell = $('<td/>').
                css(this.tdCss).addClass('plj-link'),

                    $deleteCell = $('<td/>').
                css(this.linkRemoveCss).
                addClass('plj-remove-link').
                append($('<a/>').text('X')),

                    attributes = this.model.attributes,
                    lonLat,
                    objectsText = [];

                if (attributes.lonLat) {
                    lonLat = attributes.lonLat.clone();
                    lonLat.transform(W.map.getProjectionObject(),
                                     W.model.segments.projection);
                }

                objectsText.push('<b>Lon:</b> ' + (lonLat ?
                                                   lonLat.lon.toFixed(3) + '\xB0' : 'None') +
                                 '  <b>Lat:</b> ' + (lonLat ? lonLat.lat.toFixed(3) + '\xB0' : 'None') +
                                 '  <b>Zoom:</b> ' + (attributes.zoom ? attributes.zoom : 'None'));

                if (this.model.hasItems()) {
                    if (attributes.updateRequest) {
                        objectsText.push('<b>Update Request:</b> ' +
                                         attributes.updateRequest);
                    }
                    if (attributes.mapProblem) {
                        objectsText.push('<b>Map Problem:</b> ' +
                                         attributes.mapProblem);
                    }
                    if (attributes.segments) {
                        objectsText.push('<b>Segments:</b> ' +
                                         attributes.segments.join(', '));
                    }
                    if (attributes.nodes) {
                        objectsText.push('<b>Nodes:</b> ' +
                                         attributes.nodes.join(', '));
                    }
                    if (attributes.venues) {
                        objectsText.push('<b>Places:</b> ' +
                                         attributes.venues.join(', '));
                    }
                }

                _.each(objectsText, function (text) {
                    $nameCell.append(
                        $('<p/>').css(this.linkInfoCss).html(text));
                }, this);

                return [$nameCell, $deleteCell];
            },
            events: {
                'click .plj-link': 'onLinkClicked',
                'click .plj-remove-link': 'onRemoveClicked'
            },
            initialize: function () {
                this.listenTo(this.model, 'change', this.render);
                this.listenTo(this.model, 'destroy', this.remove);
            },
            render: function () {
                var cells = this.template();

                this.$nameCell = cells[0];
                this.$deleteCell = cells[1];

                this.$el.empty();
                this.$el.append(this.$nameCell).append(this.$deleteCell);
                return this;
            },
            /**
             * Callback for clicking a link.
             */
            onLinkClicked: function (e) {
                var forceMove = e && e.ctrlKey;

                W.map.events.unregister('moveend', app, app.onMapMove);

                this.model.open(forceMove);
                app.onTrackHistoryChange();
            },
            /**
             * Callback for removing a link.
             */
            onRemoveClicked: function (e) {
                this.model.destroy();
            }
        });

        /**
         * View for text input box and buttons for manual PL input.
         */
        JumpView = Backbone.View.extend({
            collection: null,
            tagName: 'div',
            template: function () {
                var buttonstyle = '';
                var inputstyle = "";
                return '<input type="text" id="pljumpinput" style="font-family:Open Sans,FontAwesome; display: inline-block; line-height: normal; outline:0px; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05); transition: 0.5s all; background-color: #fff; border-radius: 8px; border: none; padding: 4px 6px 4px 6px; color: #354148; opacity: 1;height:33px;" placeholder="&#xf0c1; WME PL Jump"></input>' +
                    '<button id="pljumpbutton-move" class="btn btn-primary" style="margin-bottom: 5px;margin-right: 4px;margin-left: 4px;padding-left:5px;padding-right:5px;" title="Select & Jump"><i class="fa fa-hand-pointer-o" aria-hidden="true"></i></button>';
                //'<button id="pljumpbutton" class="btn btn-primary" style="margin-bottom: 5px; padding-left:5px; padding-right:5px;" title="Select & Jump"><i class="fa fa-rocket" aria-hidden="true"></i></button>';
            },
            events: {
                'click #pljumpbutton': 'onJumpClick',
                'click #pljumpbutton-move': 'onJumpMoveClick',
                'keyup #pljumpinput': 'onInputChanged'
            },
            initialize: function () {
                this.render();
                this.onInputChanged();
            },
            render: function () {
                this.$el.html(this.template());
                this.$el.addClass("pljump");
                this.$el.css({
                    'float': 'left',
                    'width':'213px',
                    'margin': '6px 10px 0px 10px'
                });

                this.input = this.$el.find('#pljumpinput');
                this.jumpButton = this.$el.find('#pljumpbutton');
                this.jumpMoveButton = this.$el.find('#pljumpbutton-move');
                // Puts it in the topbar
                $('#edit-buttons > div').prepend(this.$el);
              },
            /**
             * Callback for clicking the jump button.
             */
            onJumpClick: function (e, forceMove) {
                var linkText = this.input.val(),
                    newLink;

                if (linkText) {
                    newLink = this.collection.add({ link: linkText });
                    newLink.open(forceMove);
                }
                this.input.val('');
                this.onInputChanged();
            },
            /**
             * Callback for clicking the jump and move button.
             */
            onJumpMoveClick: function (e) {
                this.onJumpClick(e, true);
            },
            /**
             * Callback for keyup in the input box.
             * Disables the buttons if the textbox is empty.
             * If the key is 'enter', triggers the jump button click.
             */
            onInputChanged: function (e) {
                /*
                this.jumpButton.prop('disabled',
                    this.input.val() === '' ? true : false);
                this.jumpMoveButton.prop('disabled',
                    this.input.val() === '' ? true : false);
                */
                if (e && e.keyCode === 13) {
                    this.onJumpClick();
                }
            }
        });
    }
    bootstrap();
} ());
