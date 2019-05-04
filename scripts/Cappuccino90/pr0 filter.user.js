// ==UserScript==
// @name         pr0 filter
// @description  filters by tags
// @namespace    filter
// @version      1.0
// @author       cRYPTOR
// @match        https://pr0gramm.com/*
// @match        http://pr0gramm.com/*
// ==/UserScript==

$(document).ready(function(){

	var filterSettings = {
		tags: ['wichtel', 'wichteln 2017', 'wichtel 2017', 'wichteln', 'Wichtel OC', 'wichtel oc'],
		debug: false,
	};

	var call = function(callback, callbackData){
		if( callback !== null){
			return callback(callbackData);
		}
	};

	var debugLog = function(str){
		if( filterSettings.debug){
			console.log(str);
		}
	};

	var searchObjects = [];
	var searchObjectFactory = {
		createSearchObject : function(content, callback){
			searchObjects[searchObjects.push({
				searchOptions:{
					'tags':content
				},
				min: 0,
				max: 0,
				ids: [],
				is: function(id){
					if( id > this.max )
						return false;
					if( id < this.min )
						debugLog('error!');
					return ( this.ids.indexOf(id) != -1 );
				},
				needsUpdate: function(id){
					return id < this.min;
				},
				update: function(callback, callbackData){

					var o = this;
					o.searchOptions.flags = p.user.flags;

					p.api.get('items.get', o.searchOptions, function(data){
						if( data.items.length > 0){

							o.max = 0;
							o.min = Number.MAX_VALUE;

							$(data.items).each(function(index){
								var id = data.items[index].id;

								if( id > o.max)
									o.max = id;
								if( id < o.min)
									o.min = id;

								o.ids.push(id);

							});

							o.searchOptions.older = o.min;
							debugLog(o.searchOptions.older);
						}else{
							o.min = -1;
						}
						call(callback, callbackData);
					});
				}
			}) - 1].update(callback);
		}
	};

	var count = 0;
	$(filterSettings.tags).each(function(index){
		searchObjectFactory.createSearchObject(filterSettings.tags[index], function(){
			++count;
			if( filterSettings.tags.length == count){
				p.Stream.prototype._load();
			}
		});
	});

	var updateAll = function(inData){
		var isUp2Date = true;
		$(inData.data.items).each(function(itemIndex){
			if( !isUp2Date){
				return;
			}
			$(searchObjects).each(function(index){
				if( !isUp2Date){
					return;
				}
				var o = searchObjects[index];
				if( o.needsUpdate(inData.data.items[itemIndex].id)){
					isUp2Date = false;
					o.update(updateAll, inData);
				}
			});
		});
		if( isUp2Date ){
			call(inData.callback);
		}
	};

	p.Stream.prototype._load = function(options, callback){

		var stream = this;
		options.flags = p.user.flags;

		p.api.get('items.get', p.merge(options, this.options), function (data){
			updateAll({
				'data' : data,
				'callback' : function(){

					data.items = $.grep(data.items, function(el, i){
						$(searchObjects).each(function(index){
							if( searchObjects[index].is(el.id) ){
								return false;
							}
						});
						return true;
					});

					var position = stream._processResponse(data);
					callback(data.items, position, data.error);
				}
			});
		});
	};
});