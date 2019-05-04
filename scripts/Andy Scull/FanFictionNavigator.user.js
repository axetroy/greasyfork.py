// ==UserScript==
// @name        FanFictionNavigator
// @name:ru     FanFictionNavigator
// @namespace   window
// @description:en  Mark and hide fanfics or authors
// @description:ru  Выделяет цветом/скрывает фанфики или авторов
// @include     https://ficbook.net/*
// @include     https://www.fanfiction.net/*
// @include     https://archiveofourown.org/*
// @include     http://archiveofourown.org/*
// @include     https://tbooklist.org/*
// @run-at      document-end

// @require     https://code.jquery.com/jquery-1.7.2.min.js
// @require     https://greasyfork.org/scripts/17419-underscore-js-1-8-3/code/Underscorejs%20183.js?version=109803
// @version     48
// @grant       GM_addStyle
// @description Mark and hide fanfics or authors
// ==/UserScript==

// Based on https://chrome.google.com/webstore/detail/fanfiction-organizer/adlnghnicfngjnofbljedmclmdoepcbe
// by Stefan Hayden

// Fics:
const FIC_LIKED = 0;
const FIC_DISLIKED = 1;
const FIC_MARKED = 2;
const FIC_INLIBRARY = 3;

// Authors:
const AUTHOR_LIKED = 0;
const AUTHOR_DISLIKED = 1;

// colors. now used for like/dislike/etc links
const COLOR_LIKED = '#C4FFCA';
const COLOR_DISLIKED = '#FCB0B0';
const COLOR_MARKED = '#CCCCCC';
const COLOR_INLIBRARY = '#F1D173';
const COLOR_CLEARED = '#FFF';
const COLOR_FB_CLEAR = '#FFF';


// styles for author/story links; <a> links should have only one of these so order doesn't matter
GM_addStyle("a.ffn_dislike_fic {text-decoration: line-through; font-weight: bold;}");
GM_addStyle("a.ffn_like_fic {font-weight: bold;} ");
GM_addStyle("a.ffn_dislike_author {text-decoration: line-through; font-weight: bold;}");
GM_addStyle("a.ffn_like_author {font-weight: bold;} ");
GM_addStyle("a.ffn_mark {font-weight: bold;}");
GM_addStyle("a.ffn_inlibrary {font-weight: bold;}");

// styles for box background; fic style should overwrite author style
GM_addStyle(".ffn_like_author:not(a) {background-color:#C4FFCA !important;}");
GM_addStyle(".ffn_dislike_author:not(a) {background-color:#FCB0B0 !important;}");
GM_addStyle(".ffn_like_fic:not(a) {background-color:#C4FFCA !important;}");
GM_addStyle(".ffn_dislike_fic:not(a) {background-color:#FCB0B0 !important;}");
GM_addStyle(".ffn_mark:not(a) {background-color:#CCCCCC !important;}");
GM_addStyle(".ffn_inlibrary:not(a) {background-color:#F1D173 !important;}");



// styles for boxes, they differ between sites

/*
switch(window.location.hostname){
case "www.fanfiction.net":
case "tbooklist.org":
    GM_addStyle("div.ffn_dislike {background-color:#FCB0B0 !important;}");
    GM_addStyle("div.ffn_like {background-color:#C4FFCA !important;}");
    GM_addStyle("div.ffn_mark {background-color:#CCCCCC !important;}");
    GM_addStyle("div.ffn_inlibrary {background-color:#F1D173 !important;}");
break
case "archiveofourown.org":
    GM_addStyle(".ffn_dislike {background-color:#FCB0B0 !important;}");
    GM_addStyle(".ffn_like {background-color:#C4FFCA !important;}");
    GM_addStyle(".ffn_mark {background-color:#CCCCCC !important;}");
    GM_addStyle(".ffn_inlibrary {background-color:#F1D173 !important;}");
break
case "ficbook.net":
    GM_addStyle("div.ffn_dislike {background-color:#FCB0B0 !important;}");
    GM_addStyle("div.ffn_like {background-color:#C4FFCA !important;}");
    GM_addStyle("div.ffn_mark {background-color:#CCCCCC !important;}");
    GM_addStyle("div.ffn_inlibrary {background-color:#F1D173 !important;}");
    GM_addStyle("ul.ffn_dislike {background-color:#FCB0B0 !important;}");
    GM_addStyle("ul.ffn_like {background-color:#C4FFCA !important;}");
    GM_addStyle("ul.ffn_mark {background-color:#CCCCCC !important;}");
    GM_addStyle("ul.ffn_inlibrary {background-color:#F1D173 !important;}");
break
}
*/

// prevent conflicts with websites' jQuery version
this.ffn$ = this.jQuery = jQuery.noConflict(true);


var db = JSON.parse(localStorage.getItem("FFLikerAA") || '{}');
db.options = db.options || {};
db.version = db.version || '0.2';


//
// APP
//

// Main
var patharr = window.location.pathname.split("/");     // moved to main block to save on split functions elsewhere

var Application = function Application(optionsin) {
	var a = {};
	var options = optionsin || {};

	if(!options.namespace) { throw new Error("namespace is required"); }
	if(!options.db) { throw new Error("database object is required"); }

	a.namespace = options.namespace;
	var db = options.db;
	db[a.namespace] = db[a.namespace] || { fic: {}, author:{} };

	a.collection = [];

	a.color = {
		link_default: ffn$("ol.work.index.group > li:first a:first").css("color"),
		like_link:'',
		like_background:'',
		dislike_link:'',
		dislike_background:'',
	};

	a.save = function(type,id,value){
		if(type == "fic" || type == "author") {
			a.saveNameSpaced(type,id,value);
		} else {
			if(value === "clear") {
				delete db[type][id];
			} else {
				db[type][id] = value;
			}
			localStorage.setItem("FFLikerAA", JSON.stringify(db));
		}
	};

	a.saveNameSpaced = function(type,id,value){
		if(value === "clear") {
			delete db[a.namespace][type][id];
		} else {
			db[a.namespace][type][id] = value;
		}
		localStorage.setItem("FFLikerAA", JSON.stringify(db));
	};


	a.author = {};

		a.author.get = function(id){
			return db[a.namespace].author[id];
		};

		a.author.like = function(id) {
			a.save("author",id,AUTHOR_LIKED);

			_.each(a.author.getFics(id), function(story){
				story.author = AUTHOR_LIKED;
				story.like_author();
			});
		};

		a.author.dislike = function(id) {
			a.save("author",id,AUTHOR_DISLIKED);
			//ga('set', 'metric3', 1);

			_.each(a.author.getFics(id), function(story){
				story.author = AUTHOR_DISLIKED;
				story.dislike_author();
			});
		};

		a.author.clear = function(id) {
			a.save("author",id,"clear");

			_.each(a.author.getFics(id), function(story){
				story.author = '';
				story.clear_author();
			});
		};

		a.author.getFics = function(id) {
			return _.filter(a.collection,function(story){
				return story.authorId() == id;
			});
		};

	a.fic = {};

		a.fic.get = function(id) {
			return db[a.namespace].fic[id];
		};

		a.fic.like = function(id) {
			a.save("fic",id,FIC_LIKED);

			var story = _.find(a.collection,function(story){
				return story.ficId() == id;
			});

			story.fic = FIC_LIKED;
			story.like_story();
		};

		a.fic.dislike = function(id) {
			a.save("fic",id,FIC_DISLIKED);
			var story = _.find(a.collection,function(story){
				return story.ficId() == id;
			});
			story.fic = FIC_DISLIKED;
			story.dislike_story();
		};

        a.fic.mark = function(id) {
            a.save("fic",id,FIC_MARKED);
            var story = _.find(a.collection,function(story){
				return story.ficId() == id;
			});
            story.fic = FIC_MARKED;
            story.mark_story();
        };

        a.fic.inlibrary = function(id) {
            a.save("fic",id,FIC_INLIBRARY);
            var story = _.find(a.collection,function(story){
				return story.ficId() == id;
			});
            story.fic = FIC_INLIBRARY;
            story.inlibrary_story();
        };


		a.fic.clear = function(id) {
			a.save("fic",id,"clear");
			var story = _.find(a.collection,function(story){
				return story.ficId() == id;
			});
			story.fic = '';
			story.clear_story();
		};

	a.options = function(name, value) {

		if(!name) { throw new Error("name is required. what option are you looking for?"); }

		if(typeof value !== "undefined") {
			a.save("options",name,value);
			return false;
		} else {
			return db.options[name];
		}
	};

	return a;
};

var Story = function(optionsin) {

	var a = {};
	var options  = optionsin || {};

	if(!options.instance) { throw new Error("instance of this is required"); }
	if(!options.namespace) { throw new Error("namespace is required"); }

	var _this = ffn$(options.instance);

	a["default"] = {
		template: function() {
			var template =	'<div class="new_like_actions" style="margin:0px 0px 0px 20px; font-size:11px;">'+

								'Story: <a href="" class="like_story"><font color="'+COLOR_LIKED+'">Like</font></a> | '+
								'<a href="" class="dislike_story"><font color="'+COLOR_DISLIKED+'">Dislike</font></a> | '+
    							'<a href="" class="mark_story"><font color="'+COLOR_MARKED+'">Mark</font></a> | '+
    							'<a href="" class="inlibrary_story"><font color="'+COLOR_INLIBRARY+'">InLibrary</font></a> | '+
								'<a href="" class="clear_story" style="color:blue;">Clear</a>'+

								'   Author: <a href="" class="like_author" style="color:blue;">Like</a> | '+
								'<a href="" class="dislike_author" style="color:blue;">Dislike</a> | '+
								'<a href="" class="clear_author" style="color:blue;">Clear</a>'+

							'</div>';
			return template;
		},
		addActions: function() {
			var instance = this;
			_this.append(this.template());

			_this.find('.new_like_actions .like_author').click(function(){ app.author.like(instance.authorId()); return false; });
			_this.find('.new_like_actions .dislike_author').click(function(){ app.author.dislike(instance.authorId()); return false; });
			_this.find('.new_like_actions .clear_author').click(function(){ app.author.clear(instance.authorId()); return false; });

			_this.find('.new_like_actions .like_story').click(function(){ app.fic.like(instance.ficId()); return false; });
			_this.find('.new_like_actions .dislike_story').click(function(){ app.fic.dislike(instance.ficId()); return false; });
    		_this.find('.new_like_actions .mark_story').click(function(){ app.fic.mark(instance.ficId()); return false; });
    		_this.find('.new_like_actions .inlibrary_story').click(function(){ app.fic.inlibrary(instance.ficId()); return false; });
			_this.find('.new_like_actions .clear_story').click(function(){ app.fic.clear(instance.ficId()); return false; });
		},
		hide: function() {
			_this.hide();
		},
		set_story: function(){
            switch(this.fic){
            case FIC_LIKED:
//    			_this.css('background-color',COLOR_LIKED);
//				this.$fic.css('font-weight','900')
				_this.addClass("ffn_like_fic");
				this.$fic.addClass("ffn_like_fic");
                break;
			case FIC_DISLIKED:
    			_this.addClass("ffn_dislike_fic");
				this.$fic.addClass("ffn_dislike_fic");
                break;
            case FIC_MARKED:
    			_this.addClass("ffn_mark");
				this.$fic.addClass("ffn_mark");
                break;
            case FIC_INLIBRARY:
    			_this.addClass("ffn_inlibrary");
				this.$fic.addClass("ffn_inlibrary");
                break;
			}
		},
		set_author: function() {
			if(this.author === AUTHOR_LIKED) {
				this.$author.addClass("ffn_like_author");
				_this.addClass("ffn_like_author");
			}
			if(this.author === AUTHOR_DISLIKED) {
				this.$author.addClass("ffn_dislike_author");
				_this.addClass("ffn_dislike_author");
			}
		},
     	like_story: function(){
            this.clear_story();
            _this.addClass("ffn_like_fic");
            this.$fic.addClass("ffn_like_fic");
		},
        dislike_story: function(){
            this.clear_story();
            _this.addClass("ffn_dislike_fic");
            this.$fic.addClass("ffn_dislike_fic");
        },
        mark_story: function(){
            this.clear_story();
            _this.addClass("ffn_mark");
            this.$fic.addClass("ffn_mark");
        },
        inlibrary_story: function(){
            this.clear_story();
            _this.addClass("ffn_inlibrary");
            this.$fic.addClass("ffn_inlibrary");
        },
        clear_story: function(){
            _this.removeClass("ffn_like_fic ffn_dislike_fic ffn_mark ffn_inlibrary");
            this.$fic.removeClass("ffn_like_fic ffn_dislike_fic ffn_mark ffn_inlibrary");

        },
        like_author: function(){
            this.clear_author();
            this.$author.addClass("ffn_like_author");
            _this.addClass("ffn_like_author");
        },
        dislike_author: function(){
            this.clear_author();
            this.$author.addClass("ffn_dislike_author");
            _this.addClass("ffn_dislike_author");
        },
        clear_author: function(){
            _this.removeClass("ffn_like_author ffn_dislike_author");
            this.$author.removeClass("ffn_like_author ffn_dislike_author");
        }
    };

// Specific sites overrides

    a["www.fanfiction.net"] = {
        $author: _this.find('a[href^="/u"]:first'),
		$fic: _this.find('a[href^="/s"]:first'),
		authorId: function() {
            if (typeof this.$author.attr('href') === "undefined") {
                return patharr[2];
            } else {
        		return this.$author.attr('href').split('/')[2];
            }
        },
		ficId: function() {
            if (this.$fic.length === 0) {
                return patharr[2];
            } else {
                return this.$fic.attr('href').split('/')[2];
            }
		},
    	hide: function() {
            // do not hide story header on reading page and story block on author page
            if (!patharr[1].match("^s$|^u$")) _this.hide(); // do not hide fic on author pages (to clearly see how many fics you like and dislike) and on reading pages
		}
	};

//

	a["archiveofourown.org"] = {
    	$author: _this.find('a[href^="/users/"]:first'),
		$fic: _this.find('a[href^="/works/"]:first'),
		authorId: function() {
			// old: return this.$author.attr('href').split('/')[2];
            // Contributed by Vannis:
            if (this.$author.length === 0) {
                return 0;
            } else {
                return this.$author.attr('href').split('/')[2];
            }
		},
        ficId: function() {
            if (this.$fic.length === 0) {
                return patharr[2];
            } else {
                return this.$fic.attr('href').split('/')[2];
            }
		},
        hide:function(){
            if (patharr[1] !== "users" &&    // do not hide fic on author pages (to clearly see how many fics you like and dislike)
                !/(collections\/[^\/]+\/)?works\/\d+/.test(window.location.pathname)) { // do not hide fic header on reading pages)
                _this.hide();
            }
        }
	};

//

    a["ficbook.net"] = {
        $author: _this.find('a[href^="/authors"]:first'),
        $fic: _this.find('a[href^="/readfic"]:first'),
		authorId: function() {
			return this.$author.attr('href').split('/')[2];
		},
        ficId: function() {
            if (this.$fic.length === 0) {
                return patharr[2].replace(/(\d+).*?$/,"$1");
            } else {
                return this.$fic.attr('href').split('/')[2].replace(/(\d+).*?$/,"$1");
            }
		},
        hide:function(){
            if (patharr[1]==="popular"){
                _this.parent().parent().parent().parent().hide();
                return;
            }
            if (patharr[1]!=="readfic" && patharr[2]!=="favourites") {
                _this.parent().hide();
                return;
            }
        }
	};

    a["tbooklist.org"] = {
        $author: _this.find('a[href^="https://tbooklist.org/authors"]:first'),
        $fic: _this.find('a[href*="https://tbooklist.org/books"]:first'),
     	  authorId: function() {
            if (this.$author.length === 0) {
                return 0;
            } else {
                return this.$author.attr('href').trim().split('/')[4];
            }
		},
        ficId: function() {
            if (patharr[1] === "books") {
                return window.location.pathname.trim().split("/")[2];
            }
            if (this.$fic.length === 0) {
                return 0;
            } else {
                return this.$fic.attr('href').trim().split('/')[4];
            }
		},
        hide:function(){
            // do not hide when viewing fanfic details
            if(patharr[1] !== "books") {
                _this.hide();
            }
        }
	};

	var b = ffn$.extend({}, a["default"], a[options.namespace]);
	b.fic = app.fic.get(b.ficId());

	b.author = app.author.get(b.authorId());
    // do not show liker links if ficid or authorid are undefined (tweak for tbooklist.org)
    if (b.ficId() !== 0 && b.authorId() !== 0) {
    	b.addActions();
    }
	b.set_story();
	b.set_author();

	//hide
	if((app.options("hide_dislikes") === true && (b.fic === FIC_DISLIKED || b.author === AUTHOR_DISLIKED)) ||
       (app.options("hide_likes") === true && (b.fic === FIC_LIKED || b.author === AUTHOR_LIKED)) ||
       (app.options("hide_marked") === true && b.fic === FIC_MARKED) ||
       (app.options("hide_inlibrary") === true && b.fic === FIC_INLIBRARY)){
//		if(b.fic !== true && b.author) { // for liked fics of disliked authors
			b.hide();
//		}
	}
	return b;
};


var app  = new Application({namespace:document.location.host, db: db});

// Adding action links and navigation shortcuts to pages
switch(window.location.hostname){
    case "www.fanfiction.net":
        // adding hotkeys
        // added toggle option, suggested by Vannius
        if (app.options("enable_list_hotkeys")) {
            document.addEventListener('keydown', function(e){
                if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
                    switch (e.keyCode){
                        case 37:
                            var Prev = ffn$("a:contains('« Prev')");
                            if (typeof(Prev[0])!=='undefined') {Prev[0].click();}
                            break;
                        case 39:
                            var Next = ffn$("a:contains('Next »')");
                            if (typeof(Next[0])!=='undefined') {Next[0].click();}
                            break;
                    }
                }
            }, false);
        }
        if (app.options("enable_read_hotkeys")) {
            document.addEventListener('keydown', function(e){
                if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
                    switch (e.keyCode){
                        case 37:
                            var Prev = ffn$("button:contains('< Prev')");
                            if (typeof(Prev[0])!=='undefined') {Prev.click();}
                            break;
                        case 39:
                            var Next = ffn$("button:contains('Next >')");
                            if (typeof(Next[0])!=='undefined') {Next.click();}
                            break;
                    }
                }
            }, false);
        }
        // links in list
        ffn$(".z-list").each(function(){
            var story = new Story({ namespace: app.namespace, instance: this });
            app.collection.push(story);
        });

        // links on reading page
        ffn$("div#profile_top").each(function(){
            var story = new Story({ namespace: app.namespace, instance: this });
            app.collection.push(story);
        });

        // hide/show options
        ffn$('div#content_wrapper_inner').after(
            '<div class="liker_script_options" style="padding:5px; border:1px solid #333399; margin-bottom:5px; background:#D8D8FF;">'+
            '<b>Liker Options:</b> '+
            '</div>'
        );
        break;
    case "archiveofourown.org":
        // adding hotkeys
        if (app.options("enable_list_hotkeys")) {
            document.addEventListener('keydown', function(e){
                if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
                    switch (e.keyCode){
                        case 37:
                            var Prev = ffn$("a:contains('← Previous')");
                            if (typeof(Prev[0])!=='undefined') {Prev[0].click();}
                            break;
                        case 39:
                            var Next = ffn$("a:contains('Next →')");
                            if (typeof(Next[0])!=='undefined') {Next[0].click();}
                            break;
                    }
                }
            }, false);
        }
        if (app.options("enable_read_hotkeys")) {
            document.addEventListener('keydown', function(e){
                if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
                    switch (e.keyCode){
                        case 37:
                            var Prev = ffn$("a:contains('←Previous Chapter')");
                            if (typeof(Prev[0])!=='undefined') {Prev[0].click();}
                            break;
                        case 39:
                            var Next = ffn$("a:contains('Next Chapter →')");
                            if (typeof(Next[0])!=='undefined') {Next[0].click();}
                            break;
                    }
                }
            }, false);
        }
        // in lists
        // old: ffn$("ol.work.index.group > li").each(function(){
        // contribution by Vannius from greasyfork site
        ffn$(".blurb").each(function(){
            var story = new Story({ namespace: app.namespace, instance: this });
            app.collection.push(story);
        });
        // on reading page
        ffn$("div.preface.group").each(function(){
            var story = new Story({ namespace: app.namespace, instance: this });
            app.collection.push(story);
        });
        // hide/show options
        ffn$('div.navigation.actions.module, div.primary.header.module').after(
            '<div class="liker_script_options" style="padding:5px; border:1px solid #333399; margin-bottom:5px; background:#D8D8FF;">'+
            '<b>Liker Options:</b> '+
            '</div>'
        );
        break;
    case "ficbook.net":
        // on reading page
        if (patharr[1]==="readfic"){
            ffn$("div.row.hat-row > ul.list-unstyled").each(function() {
                var story = new Story({
                    namespace: app.namespace,
                    instance: this
                });
                app.collection.push(story);
            });
            if (app.options("enable_read_hotkeys")) {
                document.addEventListener('keydown', function(e){
                    var textcontent;
                    if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
                        switch (e.keyCode){
                            case 37:
                                var Prev = ffn$("a.btn-back");
                                if (Prev.length>0) window.location.href = Prev[0];
                                break;
                            case 39:
                                var Next = ffn$("a.btn-next");
                                if (Next.length>0) window.location.href = Next[0];
                                break;
                        }
                    }
                    //   Ctrl+ up/dn hotkeys
                    if (e.ctrlKey && !e.altKey && !e.shiftKey) {
                        switch (e.keyCode){
                            case 38:
                                ffn$("#do_typograf").click();
                                textcontent = document.getElementById("content");
                                textcontent.outerHTML = textcontent.outerHTML.replace(/<br>\n(&nbsp;)*[ ]*<br>/gi,"<br n=\"2\">");
                                break;
                            case 40:
                                textcontent = document.getElementById("content");
                                textcontent.outerHTML = textcontent.outerHTML.replace(/<br n=\"2\">/gi,"<br>\n<br>");
                                ffn$("#undo_typograf").click();
                                break;
                        }
                    }
                }, false);
            }
        }
        // in lists
        if (patharr[1]==="find" ||
            (patharr[1]==="popular") ||
            (patharr[1]==="collections") ||
            (patharr[1]==="fanfiction") ||
            (patharr[3]==="profile" && patharr[4]==="works") ||            // in author profile / works
            (patharr[1] === "home" && ["favourites","collections"].indexOf(patharr[2])!=-1) ){ // indexOf => checks if patharr[2] is in [] array
            //ffn$(".description").each(function() {
            ffn$("article.block > div.description").each(function() {
                var story = new Story({
                    namespace: app.namespace,
                    instance: this
                });
                app.collection.push(story);
            });
        }
        // button for quickly reading/unreading story
        if (patharr[1]==="find" ||
            (patharr[1]==="popular") ||
            (patharr[1]==="authors" && patharr[3]==="profile" && patharr[4]==="works")) {
            ffn$("article.block > div.description").each(function() {
                _this = ffn$(this);
                ficId = _this.find('a[href^="/readfic"]:first').attr('href').split('/')[2].replace(/(\d+).*?$/,"$1");
                if (_this.find(".read-notification").length===0) {
                    _this.append('<button type="button" class="btn btn-primary btn-default js-mark-readed" data-fanfic-id="'+ ficId +'"><i class="icon-checkbox-unchecked2"></i> Прочитано!</button>');
                } else {
                    _this.append('<button type="button" class="btn btn-primary btn-success js-mark-readed" data-fanfic-id="'+ ficId +'"><i class="icon-checkbox-checked2"></i> Прочитано!</button>');
                }
            });
        }
        // add hotkeys
        if (app.options("enable_list_hotkeys")) {
            document.addEventListener('keydown', function(e){
                if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
                    switch (e.keyCode){
                        case 37:
                            var Prev = ffn$("a[aria-label='Предыдущая']");
                            if (Prev.length>0) Prev[0].click();
                            break;
                        case 39:
                            var Next = ffn$("a[aria-label='Следующая']");
                            if (Next.length>0) Next[0].click();
                            break;
                    }
                }
            }, false);
        }

        // hide/show options
        ffn$('section.content-section').after(
            '<div class="liker_script_options" style="padding:5px; border:1px solid #333399; margin-bottom:5px; background:#D8D8FF;">'+
            '<b>Liker Options:</b> '+
            '</div>'
        );
        break;
    case "tbooklist.org":
        // in feed
        if (patharr[1]==="feed"){
            ffn$("div.content-block > div.regular").each(function() {
                var story = new Story({
                    namespace: app.namespace,
                    instance: this
                });
                app.collection.push(story);
            });
        }
        // book page
        else if (patharr[1]==="books"){
            ffn$("div.cmedia-divided__child__top").each(function() {
                var story = new Story({
                    namespace: app.namespace,
                    instance: this
                });
                app.collection.push(story);
            });
        }
        // hide/show options
        ffn$('div.content-block').after(
            '<div class="liker_script_options" style="padding:5px; border:1px solid #333399; margin-bottom:5px; background:#D8D8FF;">'+
            '<b>Liker Options:</b> '+
            '</div>'
        );
        break;
}

//	OPTIONS
//	-  show/hide global options
//

if(app.options("hide_likes")){
	ffn$('.liker_script_options').append('<a href="" class="show_likes" style="color:blue">Show Likes</a>');
	ffn$('.liker_script_options .show_likes').click(function(){ show_likes();  });
} else {
	ffn$('.liker_script_options').append('<a href="" class="hide_likes" style="color:blue">Hide Likes</a>');
	ffn$('.liker_script_options .hide_likes').click(function(){ hide_likes(); });
}
ffn$('.liker_script_options').append('| ');

if(app.options("hide_dislikes")){
	ffn$('.liker_script_options').append('<a href="" class="show_dislikes" style="color:blue">Show Dislikes</a>');
	ffn$('.liker_script_options .show_dislikes').click(function(){ show_dislikes();  });
} else {
	ffn$('.liker_script_options').append('<a href="" class="hide_dislikes" style="color:blue">Hide Dislikes</a>');
	ffn$('.liker_script_options .hide_dislikes').click(function(){ hide_dislikes(); });
}
ffn$('.liker_script_options').append('| ');

if(app.options("hide_marked")){
	ffn$('.liker_script_options').append('<a href="" class="show_marked" style="color:blue">Show Marked</a>');
	ffn$('.liker_script_options .show_marked').click(function(){ show_marked();  });
} else {
	ffn$('.liker_script_options').append('<a href="" class="hide_marked" style="color:blue">Hide Marked</a>');
	ffn$('.liker_script_options .hide_marked').click(function(){ hide_marked(); });
}
ffn$('.liker_script_options').append('| ');

if(app.options("hide_inlibrary")){
	ffn$('.liker_script_options').append('<a href="" class="show_inlibrary" style="color:blue">Show InLibrary</a>');
	ffn$('.liker_script_options .show_inlibrary').click(function(){ show_inlibrary(); });
} else {
	ffn$('.liker_script_options').append('<a href="" class="hide_inlibrary" style="color:blue">Hide InLibrary</a>');
	ffn$('.liker_script_options .hide_inlibrary').click(function(){ hide_inlibrary(); });
}

// dislike all authors, currently on ffnet only (enter some slash community and blacklist everyone there, saves time when browsing HP fanfics later)
if (window.location.hostname === "www.fanfiction.net") {
    ffn$('.liker_script_options').append('| ');
    ffn$('.liker_script_options').append('<a href="" class="dislike_all" style="color:blue">Dislike All Authors</a>');
	ffn$('.liker_script_options .dislike_all').click(function(e){ e.preventDefault(); dislike_all();});
}

if (window.location.hostname === "ficbook.net" && patharr[1]==="find") {
    ffn$('.liker_script_options').append('| ');
    ffn$('.liker_script_options').append('<a href="" class="ffn_ficbook_invert_read" style="color:blue">Invert Read status</a>');
	ffn$('.liker_script_options .ffn_ficbook_invert_read').click(function(e){ e.preventDefault(); ficbook_invertread();});
}


ffn$('.liker_script_options').append('| <a href="" id="ffn_OptionsToggle" style="color:blue">FFN Options</a>');
ffn$('.liker_script_options').after(
    "<div id='ffn_options_block' style='display:none;'>" +
    "<input type='checkbox' id='ffn_checkbox_hide_likes'> Hide Likes</br>" +
    "<input type='checkbox' id='ffn_checkbox_hide_dislikes'> Hide Dislikes</br>" +
    "<input type='checkbox' id='ffn_checkbox_hide_marked'> Hide Marked</br>" +
    "<input type='checkbox' id='ffn_checkbox_hide_inlibrary'> Hide InLibrary</br>" +
    "</br>" +
    "<input type='checkbox' id='ffn_checkbox_enable_list_hotkeys'> Enable hotkeys on lists pages (Left/Right for next/prev page)</br>" +
    "<input type='checkbox' id='ffn_checkbox_enable_read_hotkeys'> Enable hotkeys on reading pages (Left/Right for next/prev chapter)</br>" +
    "</br>" +
    "<button id='ffn_options_button_save'>Save options and reload page</button></br>" +
    "</br>" +
    "</br>" +
    "Export data: <button id='ffn_export_to_file'>Download text file</button></br>" +
    "Import data: <input id='ffn_import_file_box' type='file' accept='text/plain'>" + "<button id='ffn_import_file_button'>Import</button>" +

// Old import/export (slow when db is big)
/*    "<a href='' class='backupToggle' style='color:blue'>Manage Site Data</a>'" +
    "    <div class='backup_text' style='display:none'>" +
    "    <table><tr>" +
    "    <td class='backup_data' valign='top'>" +
    "    	<b>Backup data</b><br />" +
    "    	Copy this text some where safe<br />" +
    "    	<textarea class=''></textarea>" +
    "    </td>" +
    "    <td>&nbsp;&nbsp;</td>" +
    "    <td class='save_new_data' valign='top'>" +
    "    	<b>Upload new Data</b><br>" +
    "    	Upload data you had previously saved<br />" +
    "    	<textarea></textarea><br >" +
    "    	<button class='new_data_save'>save</button>" +
    "    </td></tr></table>" +
    "    </div>" +*/



    "</div>"

);

ffn$('#ffn_import_file_button').click(function(){
    var selectedFile = document.getElementById('ffn_import_file_box').files.item(0);
    if (selectedFile === null) return;
    fileToText(selectedFile, (text) => {
        var new_db;
        try {
            new_db = JSON.parse(text);
        } catch(err) {
            alert("JSON data in file is invalid");
            return;
        }
        localStorage.setItem("FFLikerAA", JSON.stringify(new_db));
        document.location = document.location;
    });
});

function fileToText(file, callback) {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    callback(reader.result);
  };
}

ffn$('#ffn_OptionsToggle').click(function(){
    ffn$("#ffn_options_block").toggle();
    ffn$("#ffn_checkbox_hide_likes").prop("checked",app.options("hide_likes"));
    ffn$("#ffn_checkbox_hide_dislikes").prop("checked",app.options("hide_dislikes"));
    ffn$("#ffn_checkbox_hide_marked").prop("checked",app.options("hide_marked"));
    ffn$("#ffn_checkbox_hide_inlibrary").prop("checked",app.options("hide_inlibrary"));
    ffn$("#ffn_checkbox_enable_list_hotkeys").prop("checked",app.options("enable_list_hotkeys"));
    ffn$("#ffn_checkbox_enable_read_hotkeys").prop("checked",app.options("enable_read_hotkeys"));
    return false;
});
ffn$('#ffn_options_button_save').click(function(){
    app.options("hide_likes", ffn$("#ffn_checkbox_hide_likes").prop("checked"));
    app.options("hide_dislikes", ffn$("#ffn_checkbox_hide_dislikes").prop("checked"));
    app.options("hide_marked", ffn$("#ffn_checkbox_hide_marked").prop("checked"));
    app.options("hide_inlibrary", ffn$("#ffn_checkbox_hide_inlibrary").prop("checked"));
    app.options("enable_list_hotkeys", ffn$("#ffn_checkbox_enable_list_hotkeys").prop("checked"));
    app.options("enable_read_hotkeys", ffn$("#ffn_checkbox_enable_read_hotkeys").prop("checked"));
    location.reload();
    return false;
});

// import/export db data

/* old import/export, with textboxes
ffn$('.backup_text .backup_data textarea').on("click",function(){
    ffn$(this).select();
});

ffn$('.backup_text .save_new_data button').on("click",function(){
    var v = ffn$('.backup_text .save_new_data textarea').val();
    var new_db;
    try {
        new_db = JSON.parse(v);
    } catch(err) {
        alert("that data is not valid");
        return;
    }
    localStorage.setItem("FFLikerAA", JSON.stringify(new_db));
    document.location = document.location;
});

ffn$('.backupToggle').click(function(){
    ffn$(".backup_text").toggle();
    ffn$(".backup_text .backup_data textarea").html(JSON.stringify(db));
    return false;
});
*/

//ffn$('.liker_script_options').append('| <a href="" id="testlink" style="color:blue">test' + '</a>');

ffn$('#ffn_export_to_file').click(function(){
    var curdate = new Date();
    var year = curdate.getFullYear();
    var month = curdate.getMonth() + 1;
    month = month<10? "0"+month : month;
    var day = curdate.getDate();
    day = day<10? "0"+day : day;
    export_file(JSON.stringify(db,null," "),"FFN_" + window.location.host + "_" + year + "-" + month + "-" + day + ".txt", "text/plain");
    return false;
});

function export_file(content, fileName, mime) {
    const blob = new Blob([content], {
      type: mime
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(function(){
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}

function show_dislikes(){
    app.options("hide_dislikes",false);
	return false;
}

function hide_dislikes(){
	app.options("hide_dislikes",true);
	return false;
}

function show_likes(){
	app.options("hide_likes",false);
	return false;
}

function hide_likes(){
	app.options("hide_likes",true);
	return false;
}

function show_marked(){
	app.options("hide_marked",false);
	return false;
}

function hide_marked(){
	app.options("hide_marked",true);
	return false;
}

function show_inlibrary(){
	app.options("hide_inlibrary",false);
	return false;
}

function hide_inlibrary(){
	app.options("hide_inlibrary",true);
	return false;
}

function dislike_all(){
    ffn$("div.z-list:visible").each(function() {
        var story = new Story({
            namespace: app.namespace,
            instance: this
        });
    //    console.log(this);
        app.collection.push(story);
        app.author.dislike(story.authorId());
    });
}

function ficbook_invertread(){
    ffn$("button.btn.btn-primary.btn-success.js-mark-readed:visible").each(function() {
        console.log(this);
        this.click();
    })
    ffn$("button.btn.btn-primary.btn-default.js-mark-readed:visible").each(function() {
        console.log(this);
        this.click();
    })
}
