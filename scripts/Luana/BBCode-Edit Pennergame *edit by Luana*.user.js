﻿// ==UserScript==
// @name           	BBCode-Edit Pennergame *edit by Luana*
// @namespace      	11235813 *edit by Luana*
// @description    	BB-Code Editor + Smileys
// @include        http://*.sylt.pennergame.de/*
// @include        http://sylt.pennergame.de/*
// @include        http://*.clodogame.fr/*
// @include        http://clodogame.fr/*
// @exclude		   	*change*
// @version			smileys by Luana
// ==/UserScript==

var THISSCRIPTVERSION = GM_info.script.version.split(" ")[0];
var THISSCRIPTINSTALL_URL = GM_info.script.namespace;
var THISSCRIPTINSTALL_URLGF = "https://greasyfork.org/scripts/3078-infozentrale";
// var THISSCRIPTSOURCE_URL = THISSCRIPTINSTALL_URL.replace('show', 'source'); // URL für Sourceseite bei userscripts.org
var THISSCRIPTID = THISSCRIPTINSTALL_URL.split("/").pop();

//==========================================================//
//
// @version			smileys BBcode by Luana
// @version        smileys BBcode by Luana
//
//==========================================================//

var language = {
	de: {
		change_text:'*Mir Spenden*',
		quote:'Zitat von',
		chose_color:'Farbwahl:',
		preview_window:'Vorschau-Bereich',
		send:'Abschicken',
		preview:'Vorschau',
		help: {
			url:'Bitte die URL(Adresse) eingeben',
			color:'Bitte die Farbe als Hex-Wert eingeben',
			quote:'Bitte den Namen(Autor) des Zitats angeben',
		},
	},
	fr: {
		change_text:'*Me faire un don*',
		quote:'Citation de',
		chose_color:'Coleur:',
		preview_window:'zone de prévision',
		send:'Envoyer',
		preview:'Prévision',
		help: {
			url:'Entre l\'adresse du site',
			color:'Entre le coleur (HEX)',
			quote:'Entre le nom de l\'auteur du citation',
		},
	},
	en: {
		change_text:'*Donate me*',
		quote:'Quote by',
		chose_color:'Chose the color:',
		preview_window:'Preview-Area',
		send:'Post',
		preview:'Preview',
		help: {
			url:'Please enter the link\'s URL',
			color:'Please enter a HEX-Format color',
			quote:'Please enter the author\'s name',
		},
	},
};


var url = document.location.hostname;
var language_code = url.match(/pennergame/) ? 'de' : (url.match(/clodogame/) ? 'fr' : 'en');
var language = language[language_code];
function $(id) {
	return document.getElementById(id);
}
editor = {
  init:function(node,smilenode,buttonnode) {
	  if(!smilenode) smilenode = node.parentNode;
	  if(!buttonnode) buttonnode = node.parentNode;
	  editor.area = node;
	  editor.smilies = smilenode;
	  editor.buttons = buttonnode;
	  editor.smilies_ob = {};
	  editor.offered_codes = [];
  },
  getArea:function() {
	  return editor.area;
  },
  addBBCode:function(typ) {
	  var ele = editor.createElement('input',typ);
	  editor.buttons.appendChild(ele);
  },
  addSmilie:function(src,short) {
	  var ele = editor.createElement('img',src,false,false,short);
	  editor.smilies.appendChild(ele);

	  if(short) editor.smilies_ob[short] = src;
  },
  addExtendetBBCode:function(typ,title) {
	  var ele = editor.createElement('input',typ,true,title);
	  editor.buttons.appendChild(ele);
  },
  insertCode:function() {
	if(!this) return false;
	var area = editor.getArea();
	var start = area.selectionStart;
	var ende = area.selectionEnd;
	var text = area.value;
	var vor = text.substr(0,start);
	var sel = text.substr(start,ende-start);
	var nach = text.substr(ende,text.length);
	area.value = vor+'['+this.value+']'+sel+'[/'+this.value+']'+nach;
  },
  insertExtCode:function() {
	if(!this) return false;
	if(this.value=='color'&&editor.color_input) arg = "#"+editor.color_input.value;
	else arg = window.prompt(this.title);
	var area = editor.getArea();
	var start = area.selectionStart;
	var ende = area.selectionEnd;
	var text = area.value;
	var vor = text.substr(0,start);
	var sel = text.substr(start,ende-start);
	var nach = text.substr(ende,text.length);
	if(arg==null || arg=='') {
		txt ='['+this.value+']';
	} else {
		if(this.value=='url') {
			if(sel!='') {
				txt = '['+this.value+'='+arg+']';			
			} else {
				txt = '['+this.value+']'+arg;
			}
		} else {
			txt = '['+this.value+'='+arg+']';
		}
	}
	
	
	area.value = vor+txt+sel+'[/'+this.value+']'+nach;
  },
  insertSmilie:function() {
	if(!this.src) return false;	
	else code = '[img]'+this.src+'[/img]';
	if(this.alt) code = this.alt;
	var area = editor.getArea();
	var start = area.selectionStart;
	var ende = area.selectionEnd;
	var text = area.value;
	var vor = text.substr(0,start);
	var nach = text.substr(ende);
	area.value = vor+code+nach;
  },
  createElement:function(typ,value,ext,title,alt) {
	  var ele = document.createElement(typ);
	  if(typ=='img') {
		  ele.src = value;
		  if(alt) ele.alt = alt;
		  edit = editor.insertSmilie;
	  } else if(typ=='input') {
		  ele.value = value;
		  ele.type = 'button';
		  if(title) ele.title = title;
		  edit = editor.insertCode;
		  editor.offered_codes.push(value);
	  }
	  if(ext==true) {
		  edit = editor.insertExtCode;		  
	  }
	  editor.lastele = ele;
	  ele.addEventListener('click',edit,false);
	  return ele;
  },
  lineBreak:function() {
	  editor.lastele.parentNode.appendChild(document.createElement('br'));
  },
  addPreview:function(ele,div) {
	  editor.preview_div = div;
	  ele.addEventListener('click',editor.triggerPreview,false);
  },
  triggerPreview:function() {
	  code = editor.area.value;
	  code = code.replace(/</g,'&lt;').replace(/>/g,'&gt;');
	  code = code.replace(new RegExp("\\n","g"),"<br />");
	 
	  editor.preview_code = code;
	  editor.replaceSmilies();
	  for(var a=0;a<editor.offered_codes.length;a++) {
		  editor.triggerPreviewFragment(editor.offered_codes[a]);
	  }
	  editor.preview_div.innerHTML = editor.preview_code;
  },
  triggerPreviewFragment:function(node) {
	  var reg = new RegExp('\\['+node+'(?:=.*?|)\\].*?\\[/'+node+'\\]','g');
	  //reg is now for example /\[b(?:=.*?|)\].*?\[\/b\]/g
	  res = editor.preview_code.match(reg);
	  if(!res) return;
	  //if theres no result (unknown error), just return
	  
	  //Here , the error seems as it already took place, alerting res just returns the first code-occurence
	  //alert(res); 
	  for(b=0;b<res.length;b++) {
		  cur_res = res[b];
		  //cur_res is now the matched code-tag
		  if(cur_res && cur_res != '') {
			//the raw bbcode tag.
			var arg_e = cur_res.match(/=/) ? cur_res.match(/=(.*?)\]/)[1] : false;
			//if, in the bbcode-tag theres an argument passed (like [url=...]..[/url], then match it
																				
			var inner = new RegExp('\\['+node+'(?:=.*?|)\\](.*?)\\[/'+node+'\\]');
			var inner = inner.exec(cur_res)[1];
			//get the inner"HTML" of the bbcode-tag
			
			node_new = node;
			if(!arg_e && node!='img' && node!='ref' &&node!='quote') {
				//if no args were passed and theres no img-tag
				arg = '';			  
			} else if(arg_e || node=='img' || node=='ref' || node=='quote') {
				switch(node) {
					case 'url':
					  arg = ' href="'+arg_e+'"';
					  node_new = 'a';
					  break;
					case 'color': 
					  arg = ' style="color:'+arg_e+'"';
					  node_new = 'span';
					  break;
					case 'img':
					  arg = ' src="'+inner+'"';
					  inner = '';
					  node_new = node;
					  break;
					case 'ref':
					  node_new = 'a';
					  arg = ' href="http://'+document.location.hostname+'/change_please/'+inner+'/"';
					  inner = language.change_text;
					  break;
					case 'quote':
					  node_new = 'div';
					  
					  inner = '<strong>'+language.quote+'<i>'+arg_e+'</i>:</strong><br />"<br />'+inner+'<br />"';
					  arg = ' class="user_quote"';
					  break;
					default:
					  arg='';
					  break;	
				}
			}
			//arg is the argument, formatted as style.. src, href or so
			new_code = '<'+node_new+arg+'>'+inner+'</'+node_new+'>';
			editor.preview_code = editor.preview_code.replace(cur_res,new_code);
			//Means, for each found tag of the node, replace it.
		  }
	  }
  },
  replaceSmilies:function() {
	  var sm = editor.smilies_ob;
	  for(smilie_code in sm) {
		  src = sm[smilie_code];
		  editor.preview_code = editor.preview_code.replace(smilie_code,'<img src="'+src+'"></img>');
	  }
  }
}
/**
 * jscolor, JavaScript Color Picker
 *
 * @version 1.3.1
 * @license GNU Lesser General Public License, http://www.gnu.org/copyleft/lesser.html
 * @author  Jan Odvarko, http://odvarko.cz
 * @created 2008-06-15
 * @updated 2010-01-23
 * @link    http://jscolor.com
 */


var jscolor = {


	dir : '', // location of jscolor directory (leave empty to autodetect)
	bindClass : 'color', // class name
	binding : true, // automatic binding via <input class="...">
	preloading : true, // use image preloading?


	install : function() {
		jscolor.addEvent(window, 'load', jscolor.init);
	},


	init : function() {
		if(jscolor.binding) {
			jscolor.bind();
		}
		if(jscolor.preloading) {
			jscolor.preload();
		}
	},


	getDir : function() {
		if(!jscolor.dir) {
			var detected = jscolor.detectDir();
			jscolor.dir = detected!==false ? detected : 'jscolor/';
		}
		return jscolor.dir;
	},


	detectDir : function() {
		var base = location.href;

		var e = document.getElementsByTagName('base');
		for(var i=0; i<e.length; i+=1) {
			if(e[i].href) { base = e[i].href; }
		}

		var e = document.getElementsByTagName('script');
		for(var i=0; i<e.length; i+=1) {
			if(e[i].src && /(^|\/)jscolor\.js([?#].*)?$/i.test(e[i].src)) {
				var src = new jscolor.URI(e[i].src);
				var srcAbs = src.toAbsolute(base);
				srcAbs.path = srcAbs.path.replace(/[^\/]+$/, ''); // remove filename
				srcAbs.query = null;
				srcAbs.fragment = null;
				return srcAbs.toString();
			}
		}
		return false;
	},


	bind : function() {
		var matchClass = new RegExp('(^|\\s)('+jscolor.bindClass+')\\s*(\\{[^}]*\\})?', 'i');
		var e = document.getElementsByTagName('input');
		for(var i=0; i<e.length; i+=1) {
			var m;
			if(!e[i].color && e[i].className && (m = e[i].className.match(matchClass))) {
				var prop = {};
				if(m[3]) {
					try {
						eval('prop='+m[3]);
					} catch(eInvalidProp) {}
				}
				e[i].color = new jscolor.color(e[i], prop);
			}
		}
	},


	preload : function() {
		for(var fn in jscolor.imgRequire) {
			if(jscolor.imgRequire.hasOwnProperty(fn)) {
				jscolor.loadImage(fn);
			}
		}
	},


	images : {
		pad : [ 181, 101 ],
		sld : [ 16, 101 ],
		cross : [ 15, 15 ],
		arrow : [ 7, 11 ]
	},


	imgRequire : {},
	imgLoaded : {},


	requireImage : function(filename) {
		jscolor.imgRequire[filename] = true;
	},


	loadImage : function(filename) {
		if(!jscolor.imgLoaded[filename]) {
			jscolor.imgLoaded[filename] = new Image();
			jscolor.imgLoaded[filename].src = jscolor.getDir()+filename;
		}
	},


	fetchElement : function(mixed) {
		return typeof mixed === 'string' ? document.getElementById(mixed) : mixed;
	},


	addEvent : function(el, evnt, func) {
		if(el.addEventListener) {
			el.addEventListener(evnt, func, false);
		} else if(el.attachEvent) {
			el.attachEvent('on'+evnt, func);
		}
	},


	fireEvent : function(el, evnt) {
		if(!el) {
			return;
		}
		if(document.createEventObject) {
			var ev = document.createEventObject();
			el.fireEvent('on'+evnt, ev);
		} else if(document.createEvent) {
			var ev = document.createEvent('HTMLEvents');
			ev.initEvent(evnt, true, true);
			el.dispatchEvent(ev);
		} else if(el['on'+evnt]) { // alternatively use the traditional event model (IE5)
			el['on'+evnt]();
		}
	},


	getElementPos : function(e) {
		var e1=e, e2=e;
		var x=0, y=0;
		if(e1.offsetParent) {
			do {
				x += e1.offsetLeft;
				y += e1.offsetTop;
			} while(e1 = e1.offsetParent);
		}
		while((e2 = e2.parentNode) && e2.nodeName.toUpperCase() !== 'BODY') {
			x -= e2.scrollLeft;
			y -= e2.scrollTop;
		}
		return [x, y];
	},


	getElementSize : function(e) {
		return [e.offsetWidth, e.offsetHeight];
	},


	getMousePos : function(e) {
		if(!e) { e = window.event; }
		if(typeof e.pageX === 'number') {
			return [e.pageX, e.pageY];
		} else if(typeof e.clientX === 'number') {
			return [
				e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
				e.clientY + document.body.scrollTop + document.documentElement.scrollTop
			];
		}
	},


	getViewPos : function() {
		if(typeof window.pageYOffset === 'number') {
			return [window.pageXOffset, window.pageYOffset];
		} else if(document.body && (document.body.scrollLeft || document.body.scrollTop)) {
			return [document.body.scrollLeft, document.body.scrollTop];
		} else if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
			return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
		} else {
			return [0, 0];
		}
	},


	getViewSize : function() {
		if(typeof window.innerWidth === 'number') {
			return [window.innerWidth, window.innerHeight];
		} else if(document.body && (document.body.clientWidth || document.body.clientHeight)) {
			return [document.body.clientWidth, document.body.clientHeight];
		} else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
			return [document.documentElement.clientWidth, document.documentElement.clientHeight];
		} else {
			return [0, 0];
		}
	},


	URI : function(uri) { // See RFC3986

		this.scheme = null;
		this.authority = null;
		this.path = '';
		this.query = null;
		this.fragment = null;

		this.parse = function(uri) {
			var m = uri.match(/^(([A-Za-z][0-9A-Za-z+.-]*)(:))?((\/\/)([^\/?#]*))?([^?#]*)((\?)([^#]*))?((#)(.*))?/);
			this.scheme = m[3] ? m[2] : null;
			this.authority = m[5] ? m[6] : null;
			this.path = m[7];
			this.query = m[9] ? m[10] : null;
			this.fragment = m[12] ? m[13] : null;
			return this;
		};

		this.toString = function() {
			var result = '';
			if(this.scheme !== null) { result = result + this.scheme + ':'; }
			if(this.authority !== null) { result = result + '//' + this.authority; }
			if(this.path !== null) { result = result + this.path; }
			if(this.query !== null) { result = result + '?' + this.query; }
			if(this.fragment !== null) { result = result + '#' + this.fragment; }
			return result;
		};

		this.toAbsolute = function(base) {
			var base = new jscolor.URI(base);
			var r = this;
			var t = new jscolor.URI;

			if(base.scheme === null) { return false; }

			if(r.scheme !== null && r.scheme.toLowerCase() === base.scheme.toLowerCase()) {
				r.scheme = null;
			}

			if(r.scheme !== null) {
				t.scheme = r.scheme;
				t.authority = r.authority;
				t.path = removeDotSegments(r.path);
				t.query = r.query;
			} else {
				if(r.authority !== null) {
					t.authority = r.authority;
					t.path = removeDotSegments(r.path);
					t.query = r.query;
				} else {
					if(r.path === '') { // TODO: == or === ?
						t.path = base.path;
						if(r.query !== null) {
							t.query = r.query;
						} else {
							t.query = base.query;
						}
					} else {
						if(r.path.substr(0,1) === '/') {
							t.path = removeDotSegments(r.path);
						} else {
							if(base.authority !== null && base.path === '') { // TODO: == or === ?
								t.path = '/'+r.path;
							} else {
								t.path = base.path.replace(/[^\/]+$/,'')+r.path;
							}
							t.path = removeDotSegments(t.path);
						}
						t.query = r.query;
					}
					t.authority = base.authority;
				}
				t.scheme = base.scheme;
			}
			t.fragment = r.fragment;

			return t;
		};

		function removeDotSegments(path) {
			var out = '';
			while(path) {
				if(path.substr(0,3)==='../' || path.substr(0,2)==='./') {
					path = path.replace(/^\.+/,'').substr(1);
				} else if(path.substr(0,3)==='/./' || path==='/.') {
					path = '/'+path.substr(3);
				} else if(path.substr(0,4)==='/../' || path==='/..') {
					path = '/'+path.substr(4);
					out = out.replace(/\/?[^\/]*$/, '');
				} else if(path==='.' || path==='..') {
					path = '';
				} else {
					var rm = path.match(/^\/?[^\/]*/)[0];
					path = path.substr(rm.length);
					out = out + rm;
				}
			}
			return out;
		}

		if(uri) {
			this.parse(uri);
		}

	},


	/*
	 * Usage example:
	 * var myColor = new jscolor.color(myInputElement)
	 */

	color : function(target, prop) {

		editor.color_input = target;
		this.required = true; // refuse empty values?
		this.adjust = true; // adjust value to uniform notation?
		this.hash = false; // prefix color with # symbol?
		this.caps = true; // uppercase?
		this.valueElement = target; // value holder
		this.styleElement = target; // where to reflect current color
		this.hsv = [0, 0, 1]; // read-only  0-6, 0-1, 0-1
		this.rgb = [1, 1, 1]; // read-only  0-1, 0-1, 0-1

		this.pickerOnfocus = true; // display picker on focus?
		this.pickerMode = 'HSV'; // HSV | HVS
		this.pickerPosition = 'bottom'; // left | right | top | bottom
		this.pickerFace = 10; // px
		this.pickerFaceColor = 'ThreeDFace'; // CSS color
		this.pickerBorder = 1; // px
		this.pickerBorderColor = 'ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight'; // CSS color
		this.pickerInset = 1; // px
		this.pickerInsetColor = 'ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow'; // CSS color
		this.pickerZIndex = 10000;


		for(var p in prop) {
			if(prop.hasOwnProperty(p)) {
				this[p] = prop[p];
			}
		}


		this.hidePicker = function() {
			if(isPickerOwner()) {
				removePicker();
			}
		};


		this.showPicker = function() {
			if(!isPickerOwner()) {
				var tp = jscolor.getElementPos(target); // target pos
				var ts = jscolor.getElementSize(target); // target size
				var vp = jscolor.getViewPos(); // view pos
				var vs = jscolor.getViewSize(); // view size
				var ps = [ // picker size
					2*this.pickerBorder + 4*this.pickerInset + 2*this.pickerFace + jscolor.images.pad[0] + 2*jscolor.images.arrow[0] + jscolor.images.sld[0],
					2*this.pickerBorder + 2*this.pickerInset + 2*this.pickerFace + jscolor.images.pad[1]
				];
				var a, b, c;
				switch(this.pickerPosition.toLowerCase()) {
					case 'left': a=1; b=0; c=-1; break;
					case 'right':a=1; b=0; c=1; break;
					case 'top':  a=0; b=1; c=-1; break;
					default:     a=0; b=1; c=1; break;
				}
				var l = (ts[b]+ps[b])/2;
				var pp = [ // picker pos
					-vp[a]+tp[a]+ps[a] > vs[a] ?
						(-vp[a]+tp[a]+ts[a]/2 > vs[a]/2 && tp[a]+ts[a]-ps[a] >= 0 ? tp[a]+ts[a]-ps[a] : tp[a]) :
						tp[a],
					-vp[b]+tp[b]+ts[b]+ps[b]-l+l*c > vs[b] ?
						(-vp[b]+tp[b]+ts[b]/2 > vs[b]/2 && tp[b]+ts[b]-l-l*c >= 0 ? tp[b]+ts[b]-l-l*c : tp[b]+ts[b]-l+l*c) :
						(tp[b]+ts[b]-l+l*c >= 0 ? tp[b]+ts[b]-l+l*c : tp[b]+ts[b]-l-l*c)
				];
				drawPicker(pp[a], pp[b]);
			}
		};


		this.importColor = function() {
			if(!valueElement) {
				this.exportColor();
			} else {
				if(!this.adjust) {
					if(!this.fromString(valueElement.value, leaveValue)) {
						styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
						styleElement.style.color = styleElement.jscStyle.color;
						this.exportColor(leaveValue | leaveStyle);
					}
				} else if(!this.required && /^\s*$/.test(valueElement.value)) {
					valueElement.value = '';
					styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
					styleElement.style.color = styleElement.jscStyle.color;
					this.exportColor(leaveValue | leaveStyle);

				} else if(this.fromString(valueElement.value)) {
					// OK
				} else {
					this.exportColor();
				}
			}
		};


		this.exportColor = function(flags) {
			if(!(flags & leaveValue) && valueElement) {
				var value = this.toString();
				if(this.caps) { value = value.toUpperCase(); }
				if(this.hash) { value = '#'+value; }
				valueElement.value = value;
			}
			if(!(flags & leaveStyle) && styleElement) {
				styleElement.style.backgroundColor =
					'#'+this.toString();
				styleElement.style.color =
					0.213 * this.rgb[0] +
					0.715 * this.rgb[1] +
					0.072 * this.rgb[2]
					< 0.5 ? '#FFF' : '#000';
			}
			if(!(flags & leavePad) && isPickerOwner()) {
				redrawPad();
			}
			if(!(flags & leaveSld) && isPickerOwner()) {
				redrawSld();
			}
		};


		this.fromHSV = function(h, s, v, flags) { // null = don't change
			h<0 && (h=0) || h>6 && (h=6);
			s<0 && (s=0) || s>1 && (s=1);
			v<0 && (v=0) || v>1 && (v=1);
			this.rgb = HSV_RGB(
				h===null ? this.hsv[0] : (this.hsv[0]=h),
				s===null ? this.hsv[1] : (this.hsv[1]=s),
				v===null ? this.hsv[2] : (this.hsv[2]=v)
			);
			this.exportColor(flags);
		};


		this.fromRGB = function(r, g, b, flags) { // null = don't change
			r<0 && (r=0) || r>1 && (r=1);
			g<0 && (g=0) || g>1 && (g=1);
			b<0 && (b=0) || b>1 && (b=1);
			var hsv = RGB_HSV(
				r===null ? this.rgb[0] : (this.rgb[0]=r),
				g===null ? this.rgb[1] : (this.rgb[1]=g),
				b===null ? this.rgb[2] : (this.rgb[2]=b)
			);
			if(hsv[0] !== null) {
				this.hsv[0] = hsv[0];
			}
			if(hsv[2] !== 0) {
				this.hsv[1] = hsv[1];
			}
			this.hsv[2] = hsv[2];
			this.exportColor(flags);
		};


		this.fromString = function(hex, flags) {
			var m = hex.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);
			if(!m) {
				return false;
			} else {
				if(m[1].length === 6) { // 6-char notation
					this.fromRGB(
						parseInt(m[1].substr(0,2),16) / 255,
						parseInt(m[1].substr(2,2),16) / 255,
						parseInt(m[1].substr(4,2),16) / 255,
						flags
					);
				} else { // 3-char notation
					this.fromRGB(
						parseInt(m[1].charAt(0)+m[1].charAt(0),16) / 255,
						parseInt(m[1].charAt(1)+m[1].charAt(1),16) / 255,
						parseInt(m[1].charAt(2)+m[1].charAt(2),16) / 255,
						flags
					);
				}
				return true;
			}
		};


		this.toString = function() {
			return (
				(0x100 | Math.round(255*this.rgb[0])).toString(16).substr(1) +
				(0x100 | Math.round(255*this.rgb[1])).toString(16).substr(1) +
				(0x100 | Math.round(255*this.rgb[2])).toString(16).substr(1)
			);
		};


		function RGB_HSV(r, g, b) {
			var n = Math.min(Math.min(r,g),b);
			var v = Math.max(Math.max(r,g),b);
			var m = v - n;
			if(m === 0) { return [ null, 0, v ]; }
			var h = r===n ? 3+(b-g)/m : (g===n ? 5+(r-b)/m : 1+(g-r)/m);
			return [ h===6?0:h, m/v, v ];
		}


		function HSV_RGB(h, s, v) {
			if(h === null) { return [ v, v, v ]; }
			var i = Math.floor(h);
			var f = i%2 ? h-i : 1-(h-i);
			var m = v * (1 - s);
			var n = v * (1 - s*f);
			switch(i) {
				case 6:
				case 0: return [v,n,m];
				case 1: return [n,v,m];
				case 2: return [m,v,n];
				case 3: return [m,n,v];
				case 4: return [n,m,v];
				case 5: return [v,m,n];
			}
		}


		function removePicker() {
			delete jscolor.picker.owner;
			document.getElementsByTagName('body')[0].removeChild(jscolor.picker.boxB);
		}


		function drawPicker(x, y) {
			try {
			if(!jscolor.picker) {
				jscolor.picker = {
					box : document.createElement('div'),
					boxB : document.createElement('div'),
					pad : document.createElement('div'),
					padB : document.createElement('div'),
					padM : document.createElement('div'),
					sld : document.createElement('div'),
					sldB : document.createElement('div'),
					sldM : document.createElement('div')
				};
				for(var i=0,segSize=4; i<jscolor.images.sld[1]; i+=segSize) {
					var seg = document.createElement('div');
					seg.style.height = segSize+'px';
					seg.style.fontSize = '1px';
					seg.style.lineHeight = '0';
					jscolor.picker.sld.appendChild(seg);
				}
				jscolor.picker.sldB.appendChild(jscolor.picker.sld);
				jscolor.picker.box.appendChild(jscolor.picker.sldB);
				jscolor.picker.box.appendChild(jscolor.picker.sldM);
				jscolor.picker.padB.appendChild(jscolor.picker.pad);
				jscolor.picker.box.appendChild(jscolor.picker.padB);
				jscolor.picker.box.appendChild(jscolor.picker.padM);
				jscolor.picker.boxB.appendChild(jscolor.picker.box);
			}

			var p = jscolor.picker;
/* between here*/
			// recompute controls positions
			posPad = [
				x+THIS.pickerBorder+THIS.pickerFace+THIS.pickerInset,
				y+THIS.pickerBorder+THIS.pickerFace+THIS.pickerInset ];
			posSld = [
				null,
				y+THIS.pickerBorder+THIS.pickerFace+THIS.pickerInset ];

			// controls interaction
			var func1 = function() { target.focus(); };
			var func2 = function() { if(holdPad) { holdPad=false; jscolor.fireEvent(valueElement,'change'); } };
			var func3 = function(e) {holdPad=true; setPad(e); };
			var func4 = function() { if(holdSld) { holdSld=false; jscolor.fireEvent(valueElement,'change'); } };
			p.box.addEventListener('mouseup',func1,false);
			p.box.addEventListener('mouseout',func1,false);
			p.box.addEventListener('mousedown',function() { abortBlur=true; },false);
			p.box.addEventListener('mousemove',function(e) {holdPad && setPad(e); holdSld && setSld(e); },false);
			p.padM.addEventListener('mouseup',func2,false);
			p.padM.addEventListener('mouseout',func2,false);	
			p.padM.addEventListener('mousedown',func3,true);
			p.sldM.addEventListener('mouseup',func4,false);
			p.sldM.addEventListener('mouseout',func4,false);		
			p.sldM.addEventListener('mousedown',function(e) {holdSld=true; setSld(e); },false);

/* and here*/
			// picker
			p.box.style.width = 4*THIS.pickerInset + 2*THIS.pickerFace + jscolor.images.pad[0] + 2*jscolor.images.arrow[0] + jscolor.images.sld[0] + 'px';
			p.box.style.height = 2*THIS.pickerInset + 2*THIS.pickerFace + jscolor.images.pad[1] + 'px';

			// picker border
			p.boxB.style.position = 'absolute';
			p.boxB.style.clear = 'both';
			p.boxB.style.left = x+'px';
			p.boxB.style.top = y+'px';
			p.boxB.style.zIndex = THIS.pickerZIndex;
			p.boxB.style.border = THIS.pickerBorder+'px solid';
			p.boxB.style.borderColor = THIS.pickerBorderColor;
			p.boxB.style.background = THIS.pickerFaceColor;

			// pad image
			p.pad.style.width = jscolor.images.pad[0]+'px';
			p.pad.style.height = jscolor.images.pad[1]+'px';

			// pad border
			p.padB.style.position = 'absolute';
			p.padB.style.left = THIS.pickerFace+'px';
			p.padB.style.top = THIS.pickerFace+'px';
			p.padB.style.border = THIS.pickerInset+'px solid';
			p.padB.style.borderColor = THIS.pickerInsetColor;

			// pad mouse area
			p.padM.style.position = 'absolute';
			p.padM.style.left = '0';
			p.padM.style.top = '0';
			p.padM.style.width = THIS.pickerFace + 2*THIS.pickerInset + jscolor.images.pad[0] + jscolor.images.arrow[0] + 'px';
			p.padM.style.height = p.box.style.height;
			p.padM.style.cursor = 'crosshair';

			// slider image
			p.sld.style.overflow = 'hidden';
			p.sld.style.width = jscolor.images.sld[0]+'px';
			p.sld.style.height = jscolor.images.sld[1]+'px';

			// slider border
			p.sldB.style.position = 'absolute';
			p.sldB.style.right = THIS.pickerFace+'px';
			p.sldB.style.top = THIS.pickerFace+'px';
			p.sldB.style.border = THIS.pickerInset+'px solid';
			p.sldB.style.borderColor = THIS.pickerInsetColor;

			// slider mouse area
			p.sldM.style.position = 'absolute';
			p.sldM.style.right = '0';
			p.sldM.style.top = '0';
			p.sldM.style.width = jscolor.images.sld[0] + jscolor.images.arrow[0] + THIS.pickerFace + 2*THIS.pickerInset + 'px';
			p.sldM.style.height = p.box.style.height;
			try {
				p.sldM.style.cursor = 'pointer';
			} catch(eOldIE) {
				p.sldM.style.cursor = 'hand';
			}

			// load images in optimal order
			switch(modeID) {
				case 0: var padImg = 'hs.png'; break;
				case 1: var padImg = 'hv.png'; break;
			}
			p.padM.style.background = "url('http://img6.imagebanana.com/img/5y4xelsm/cross.gif') no-repeat";
			p.sldM.style.background = "url('http://img7.imagebanana.com/img/8pk4oq7e/arrow.gif') no-repeat";
			p.pad.style.background = "url('http://jscolor.com/jscolor/"+padImg+"') 0 0 no-repeat";

			// place pointers
			redrawPad();
			redrawSld();

			jscolor.picker.owner = THIS;
			document.getElementsByTagName('body')[0].appendChild(p.boxB);
			}catch(e) {
				document.body.innerHTML += (e);
			}
		}


		function redrawPad() {
			// redraw the pad pointer
			switch(modeID) {
				case 0: var yComponent = 1; break;
				case 1: var yComponent = 2; break;
			}
			var x = Math.round((THIS.hsv[0]/6) * (jscolor.images.pad[0]-1));
			var y = Math.round((1-THIS.hsv[yComponent]) * (jscolor.images.pad[1]-1));
			jscolor.picker.padM.style.backgroundPosition =
				(THIS.pickerFace+THIS.pickerInset+x - Math.floor(jscolor.images.cross[0]/2)) + 'px ' +
				(THIS.pickerFace+THIS.pickerInset+y - Math.floor(jscolor.images.cross[1]/2)) + 'px';

			// redraw the slider image
			var seg = jscolor.picker.sld.childNodes;

			switch(modeID) {
				case 0:
					var rgb = HSV_RGB(THIS.hsv[0], THIS.hsv[1], 1);
					for(var i=0; i<seg.length; i+=1) {
						seg[i].style.backgroundColor = 'rgb('+
							(rgb[0]*(1-i/seg.length)*100)+'%,'+
							(rgb[1]*(1-i/seg.length)*100)+'%,'+
							(rgb[2]*(1-i/seg.length)*100)+'%)';
					}
					break;
				case 1:
					var rgb, s, c = [ THIS.hsv[2], 0, 0 ];
					var i = Math.floor(THIS.hsv[0]);
					var f = i%2 ? THIS.hsv[0]-i : 1-(THIS.hsv[0]-i);
					switch(i) {
						case 6:
						case 0: rgb=[0,1,2]; break;
						case 1: rgb=[1,0,2]; break;
						case 2: rgb=[2,0,1]; break;
						case 3: rgb=[2,1,0]; break;
						case 4: rgb=[1,2,0]; break;
						case 5: rgb=[0,2,1]; break;
					}
					for(var i=0; i<seg.length; i+=1) {
						s = 1 - 1/(seg.length-1)*i;
						c[1] = c[0] * (1 - s*f);
						c[2] = c[0] * (1 - s);
						seg[i].style.backgroundColor = 'rgb('+
							(c[rgb[0]]*100)+'%,'+
							(c[rgb[1]]*100)+'%,'+
							(c[rgb[2]]*100)+'%)';
					}
					break;
			}
		}


		function redrawSld() {
			// redraw the slider pointer
			switch(modeID) {
				case 0: var yComponent = 2; break;
				case 1: var yComponent = 1; break;
			}
			var y = Math.round((1-THIS.hsv[yComponent]) * (jscolor.images.sld[1]-1));
			jscolor.picker.sldM.style.backgroundPosition =
				'0 ' + (THIS.pickerFace+THIS.pickerInset+y - Math.floor(jscolor.images.arrow[1]/2)) + 'px';
		}


		function isPickerOwner() {
			return jscolor.picker && jscolor.picker.owner === THIS;
		}


		function blurTarget() {
			if(valueElement === target) {
				THIS.importColor();
			}
			if(THIS.pickerOnfocus) {
				THIS.hidePicker();
			}
		}


		function blurValue() {
			if(valueElement !== target) {
				THIS.importColor();
			}
		}


		function setPad(e) {
			var posM = jscolor.getMousePos(e);
			var x = posM[0]-posPad[0];
			var y = posM[1]-posPad[1];
			switch(modeID) {
				case 0: THIS.fromHSV(x*(6/(jscolor.images.pad[0]-1)), 1 - y/(jscolor.images.pad[1]-1), null, leaveSld); break;
				case 1: THIS.fromHSV(x*(6/(jscolor.images.pad[0]-1)), null, 1 - y/(jscolor.images.pad[1]-1), leaveSld); break;
			}
		}


		function setSld(e) {
			var posM = jscolor.getMousePos(e);
			var y = posM[1]-posPad[1];
			switch(modeID) {
				case 0: THIS.fromHSV(null, null, 1 - y/(jscolor.images.sld[1]-1), leavePad); break;
				case 1: THIS.fromHSV(null, 1 - y/(jscolor.images.sld[1]-1), null, leavePad); break;
			}
		}


		var THIS = this;
		var modeID = this.pickerMode.toLowerCase()==='hvs' ? 1 : 0;
		var abortBlur = false;
		var
			valueElement = jscolor.fetchElement(this.valueElement),
			styleElement = jscolor.fetchElement(this.styleElement);
		var
			holdPad = false,
			holdSld = false;
		var
			posPad,
			posSld;
		var
			leaveValue = 1<<0,
			leaveStyle = 1<<1,
			leavePad = 1<<2,
			leaveSld = 1<<3;

		// target
		jscolor.addEvent(target, 'focus', function() {
			if(THIS.pickerOnfocus) { THIS.showPicker(); }
		});
		jscolor.addEvent(target, 'blur', function() {
			if(!abortBlur) {
				window.setTimeout(function(){ abortBlur || blurTarget(); abortBlur=false; }, 0);
			} else {
				abortBlur = false;
			}
		});

		// valueElement
		if(valueElement) {
			var updateField = function() {
				THIS.fromString(valueElement.value, leaveValue);
			};
			jscolor.addEvent(valueElement, 'keyup', updateField);
			jscolor.addEvent(valueElement, 'input', updateField);
			jscolor.addEvent(valueElement, 'blur', blurValue);
			valueElement.setAttribute('autocomplete', 'off');
		}

		// styleElement
		if(styleElement) {
			styleElement.jscStyle = {
				backgroundColor : styleElement.style.backgroundColor,
				color : styleElement.style.color
			};
		}

		// require images
		switch(modeID) {
			case 0: jscolor.requireImage('hs.png'); break;
			case 1: jscolor.requireImage('hv.png'); break;
		}
		jscolor.requireImage('cross.gif');
		jscolor.requireImage('arrow.gif');

		this.importColor();
	}

};
jscolor.install();


var oldVersion = document.getElementsByClassName('zleft profile-data').length == 0;
if (!document.getElementById('smilies'))
	init_shoutbox();

function init_shoutbox() {
	var url = document.location.href;
	if(url.match(/gang/) && !oldVersion) {
		var name = 'f_text';
		if (!document.getElementById('smilies'))
			window.setTimeout(function() {init_shoutbox()}, 3000);
		if (!document.getElementById(name))
			exit;
		var textarea = $(name);
		var value = textarea.value;
	} else if(!url.match(/settings/)) {
		var textarea = $('f_text');
		var value = textarea.value;
		var name = 'f_text';
	} else {
		var textarea = document.getElementsByTagName('textarea')[0];
		var value = textarea.value;
		var name = 'description';
	}
	var par_div = textarea.parentNode;
	par_div.innerHTML = "";
	par_div.style.textAlign='center';
	par_div.appendChild(createElement('style',{type:'text/css'},'#smilies,#buttons { text-align:center;}'));
	par_div.appendChild(createElement('textarea',{id:'f_text',name:name,style:'width:98%',rows:7},value));
	par_div.appendChild(createElement('div',{id:'smilies',width:'98%'}));
	par_div.appendChild(createElement('div',{id:'buttons',width:'98%'}));
	editor.init($('f_text'),$('smilies'),$('buttons'));	
	add_funcs();
	par_div.appendChild(createElement('span',{},language.chose_color));
	par_div.appendChild(createElement('input',{class:'color',id:'color'}));
	myColor = new jscolor.color($('color'));
	par_div.appendChild(createElement('br'));
	par_div.appendChild(createElement('input',{type:'submit',value:language.send,name:'submit'}));
	par_div.appendChild(createElement('input',{id:'prev',value:language.preview,type:'button'}));
	par_div.appendChild(createElement('div',{id:'preview',width:'98%',style:'border:1px solid #222;text-align:left;padding:5px;'},'<center>'+language.preview_window+'</center>'));
	editor.addPreview($('prev'),$('preview'));	
	par_div.appendChild(createElement('div',{id:'update',width:'98%',style:'border:1px solid #222;text-align:left;padding:5px;'}));
}
function createElement(type,attrs,inner) {
	var tmp_elem = document.createElement(type);
	if(!attrs) return tmp_elem;
	for(var att_name in attrs) {
		tmp_elem.setAttribute(att_name,attrs[att_name]);
	}
	if(inner==null || inner=='undefined') return tmp_elem;
	tmp_elem.innerHTML = inner;
	return tmp_elem;
}
function add_funcs() {
//normal
editor.addSmilie('http://www.emoticonland.net/smileys/panneaux/panneaux055.gif');
editor.addSmilie('http://img801.imageshack.us/img801/2810/tsrfi96b864.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_queengrin2.gif');
editor.addSmilie('http://www.google.com/url?sa=D&q=http://www.fixmbr.de');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_trage.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_fliegebaseball.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_hundeleine05.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_klo.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_statistik02.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_kolobok.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_spritze.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_selbstmord.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_kaffee3.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_herzen01.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_herzen02.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_wolke7.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_unknownauthor_knutsch.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_stars_atze.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_gewichtheben01.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_down.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_santagrin.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_baby_taptap.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_clown.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_devil.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_angel.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_tomate.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_hangman.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_geschenk.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_joint.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_cash.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_pistolen.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_smoker.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_light.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_laola.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_kotz.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_prost.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_birthday.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_kinggrin.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_rip.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_motzschild.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_karte_gelb.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_karte_rot.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_heart.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_silvester2_biggrin.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_ostern_biggrin.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_radio.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_hurra3.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_headset3.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_laufen2.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_richter.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_prison.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_anmachen.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_lol1.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_insel.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_verlegen.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_essen.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_lovelove_dark.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_pokal_gold.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_pokal_silber.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_pokal_bronze.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_unknownauthor_respekt.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_mrgreen-dance.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_lol.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_freu2.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_helpnew.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_smilenew.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_begeistert.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_wink.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_megagrin.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_xd.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_lachtot.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_thumbs-up_new.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_no_sad.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_nosmile.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_unknownauthor_wink.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_frown.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_confused2.gif');
//winken
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_winken4.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_wink_gruen.gif');
//klatschen jubeln
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_applaus.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_bravo2.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_kolobok-hallo-kappe.gif');
editor.lineBreak();
//zunge
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_baeh2.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_uergs.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_hecheln2.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_xp-ani01b.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_igitt.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_razz.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_unknownauthor_bigtongue.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_nixweiss.gif');
//müde
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_gaehn.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_sleep.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_stevieh_seufz.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_muede.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_dream1.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_sex4.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_grab-schaufler2.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_zaehneknirschen.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_muede.gif');
editor.lineBreak();
// verrückt
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_ugly2.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_ugly_irre4.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_kopfschmerz.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_irre4.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_panik3.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_unknownauthor_lookaround.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_panik.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_crazy02.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_crazy04.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_irre2.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_eek.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_crazy.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_scream-if-you-can.gif');
editor.lineBreak();
//sauer wütend
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_censored_GREEN.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_explode_GREEN.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_unknownauthor_fuck.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_fluch4_GREEN.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_irre.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_aufsmaul.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_fies.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_mttao_fieser_blick.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_kotz.gif');
//rest
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_blog-messias.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_stumm.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_schweig.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_charly_bissig.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_charly_rofl.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_blush-reloaded10.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_herzen02.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_blush-pfeif.gif');
editor.lineBreak();
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_cooler.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_papiertuete-kopf.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_headset2.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_party.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_bier.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_sauf.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_kolobok-party-dancers.gif');
editor.lineBreak();
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_quadrat.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_zunge-ellenbogen.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_fliegebaseball.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_weckruf.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_kaffee2.gif');
editor.lineBreak();
//PG normal
editor.addSmilie('http://static.pennergame.de/img/pv4/smilies/icon_frown.gif',':(');
editor.addSmilie('http://static.pennergame.de/img/pv4/smilies/icon_smile.gif',':)');
editor.addSmilie('http://static.pennergame.de/img/pv4/smilies/icon_biggrin.gif',':D');
editor.addSmilie('http://static.pennergame.de/img/pv4/smilies/icon_lol.gif',':lol:');
editor.addSmilie('http://static.pennergame.de/img/pv4/smilies/icon_razz.gif',':P');
editor.addSmilie('http://static.pennergame.de/img/pv4/smilies/icon_wink.gif',';)');
editor.addSmilie('http://static.pennergame.de/img/pv4/smilies/icon_mad.gif',':x');
editor.addSmilie('http://static.pennergame.de/img/pv4/smilies/icon_eek.gif',':shock:');
editor.addSmilie('http://static.pennergame.de/img/pv4/smilies/icon_confused.gif',':?');
//SMILEY NEW 2013
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah41.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/001_005.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/001_icon16.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/001_rolleyes.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/91cf07e3aa16738943fa1147940b48ea.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/9898caca.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/Angel001.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/angry.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/animal27.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/blabla.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/blink.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/blushing.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/bye2.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/cake.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/confused1.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/congratualtions.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/Cool.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/fishing.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/fishing2.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/flowers.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/party3.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/pinch.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/pirate.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/present.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/rayof.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/roll2.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/sad.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/shifty.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/surrender.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/flowers.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/laugh.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/lmao.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/lol.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/mayor.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/ninja.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/ohmy.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/thankyou.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/thumbup.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/w00t.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/w00twave.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/whistling.gif');
editor.addSmilie('http://www.smiliemania.de/smilie132/00000726.gif');
editor.addSmilie('http://wuerziworld.de/Smilies/schild/sd28.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Schlafen/smilie_sleep_059.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_papiertuete-kopf.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_boxen2.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_b-love2.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_dinosaurier07.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_yes_sad.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_blume.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/am1320.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amor40.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amor340.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amor520.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amor540.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amorr070.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amorr0220.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/36_3_210.gif');
//suite SMILEY NEW 2013
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/3_4_12.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/alcool046.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/ang14.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/animal26.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/animal405.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/animal1072.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/animaux2052.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/animaux21042.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/applause02.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/bonjj001.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/boul11.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/bye005.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/byeb10.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/celebrites231.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/dans11.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/danse004.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/divers2072.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/dormir026.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/ecole009.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/groupe020.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/groupe052.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/hello03.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/lollol360.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/parle016.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/parle023.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/parle040.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/txt117.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/verts341.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/bonjour004.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/bonjour015.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/boul02.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/boulai001.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/boulet001.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/pann011.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/pann029.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/pann047.png');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/pann130.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/pann165.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/panne64.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/panne71.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/panne120.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/panne141.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/panne154.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/panne156.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/panne237.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/panneaux003.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/panneaux008.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/panneaux036.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/panneaux045.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/panneaux062.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/panneaux064.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/memes109.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/29.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/pann276.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/panne74.gif');
editor.addSmilie('http://fc07.deviantart.net/fs71/f/2011/091/e/5/troll_face_banana_by_zorkky-d3cyyvn.gif');
editor.addSmilie('');
//suite 2 SMILEY NEW 2013
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/0011-3277.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/17-245c.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/23_46_9-1--477a.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/31-2b8682.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/59-22a5.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/60833-af25b6.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/135293-1778c6.png');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/1036535672_gif-2525.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/admin-3857.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/alcooliques12-1d04.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/ban_fou-1e6f8.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/bienvenu-1ef4.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/boulet1-1a06.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/bouletcave-699ef.png');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/bricedenice-1db2.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/bucher-1b7ebc.png');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/chuisundieu-3330.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/copain-3a7f.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/corde01-1abe.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/dehors-20ab0.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/de-rien-1aa2998.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/dtc-17d0e27.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/estaunboulet4hf-5111e.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/forum47-1b0f.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/forum-1148.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/gs_14da610ea15a6c6e2e6e78-136e5f3.png');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/gs_2165b-ba7eb.png');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/haha4-1b71.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/hjk-10f0c0d.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/kelkon-1--6162.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/mdr-1e6fc.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/message-28-df76bc.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/panneau0-10c6a.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/panneau-la-sortie-c-par-la-25de.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/sex-msntrucastuce_free_fr-74-acbb7.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/smiley_1161-1937.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/smiley_1279-1938.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/smiley_pancartes_divers_0038-17cd.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/smiley34-1a04.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/smiley87373-1f7eb80.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/t-con-185b.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/tn_2518-7e429.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/yb624-2799.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/0connerie.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/bugs-bunny.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/cavapas.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/drole-mais-tu-sort.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/dtc.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/panneaux_249.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/tucartonne.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_2/blond306199.gif');
editor.addSmilie('http://www.emoticonland.net/smileys/panneaux/pann047.png');
//suite 3 SMILEY NEW 2013
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/aliboronz-240.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/arrow-7170.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/arrowd-7180.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/arrowl-7190.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/arrowu-71a0.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/exclaim-7220.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/question-7280.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/idea-7240.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/baaa-f8c0.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/ban-5550.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/eek-7200.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/eusa_boohoo-5220.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/evil-7210.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/flag-5480.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/gwen-matt-115d0.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/jouerdanssonbain-242180.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/love-996.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/love-99300.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/musique30-205ea0.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/musique-121f0.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/mylove-14520.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/pdt_flag_19-21c830.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/ser-5be0.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/twisted-72f0.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/vache-12c50.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley_3/message-28-df76bc.gif');
	editor.lineBreak();
	
	editor.addBBCode('b');
	editor.addBBCode('i');
	editor.addBBCode('u');
	editor.addExtendetBBCode('color',language.help.color);	
	editor.addExtendetBBCode('quote',language.help.quote);	
	editor.addExtendetBBCode('url',language.help.url);	
	editor.addBBCode('img');
	editor.addBBCode('marquee');	
	editor.addBBCode('center');
	
	editor.addBBCode('big');
	editor.addBBCode('small');
	editor.addBBCode('ref');
	editor.addBBCode('youtube_m');	
}
//updatefunktion 
function update(){		
	var now = (new Date().getTime()/86400000).toString().split('\.')[0];
	var last_update = GM_getValue('last_update','0');
	if (now-last_update >= 1){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/'+ScriptID+'.meta.js',
			onload: function(content) {
				var scriptname = (/@name\s*(.*?)\s*$/m.exec(content.responseText))[1];
				var newversionhistory = (/@version\s*(.*?)\s*$/m.exec(content.responseText))[1];
				var newversion = (/@version\s*(.*?)\s*$/m.exec(content.responseText))[1].substr(0, 3);
				if (newversion != version){
					if (confirm('Es gibt eine neue Version des Skriptes '+scriptname+':\n\nVersion: \n'+newversionhistory+'\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos &uuml;ber die neue Version:\n\n '+THISSCRIPTINSTALL_URLQ+'\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschliessend durchgeführt werden.\n\nHinweis: Die Überprüfung auf neue Versionen wird nur einmal pro Tag durchgeführt.')){
						window.location.href = ''+THISSCRIPTSOURCE_URLQ+'';
					}
				}
			}
		}, false);
		GM_setValue('last_update', now);
	}
}