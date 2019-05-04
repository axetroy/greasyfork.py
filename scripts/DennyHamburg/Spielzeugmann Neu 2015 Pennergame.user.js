// ==UserScript==
// @name           	Spielzeugmann Neu 2015 Pennergame
// @namespace      	Bande:staatSEXamenPENNER mod.DennyHamburg
// @description    	Erweiterter BB-Code Editor mit Vorschaufunktion und ganz neuen Smylies 2015
// @include        	http://schattenwölfe.de
// @include        	http://*game*/*
// @include        	http://*game*/gang/
// @include        	http://*bumrise*/gang/
// @include        	http://*game*/settings/
// @include        	http://*bumrise*/settings/
// @include        	http://*game*/messages/write/*
// @include        	http://*bumrise*/messages/write/*
// @include        	http://*clodogame.fr/gang/forum/editpost*
// @include        	http://*clodogame.fr/gang/forum/viewthread*
// @include        	http://*pennergame.de/gang/forum/editpost*
// @include        	http://*pennergame.de/gang/forum/viewthread*
// @include        	http://*bumrise.com/gang/forum/editpost*
// @include        	http://*bumrise.com/gang/forum/viewthread*
// @exclude			http://*game*/settin*
// @exclude			http://*game*/gang/adm*
// @exclude			http://*game*/gang/forum*
// @exclude			http://*game*/profi*
// @exclude			http://*game*/suppor*
// @version			2.4 neue smilies!
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_log
// @grant        GM_registerMenuCommand
// ==/UserScript==

var Version = '2.4';
var Script = 'https://greasyfork.org/scripts/8570-spielzeugmann-neu-f%C3%BCr-ff-und-tampermonky/code/Spielzeugmann%20Neu%20F%C3%BCr%20FF%20und%20Tampermonky.user.js';
var Meta = 'https://greasyfork.org/scripts/8570-spielzeugmann-neu-f%C3%BCr-ff-und-tampermonky/code/Spielzeugmann%20Neu%20F%C3%BCr%20FF%20und%20Tampermonky.meta.js';
update();




// seitenadresse ermitteln
var url = document.location.href;
var staticurl ='static2';

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
		window.setTimeout(function() {init_shoutbox()}, 2500);
		if (document.getElementById('smilies'))
            return;
		if (!document.getElementById(name))
			return;
		var textarea = $(name);
		var value = textarea.value;
        var target = document.getElementsByName("target_pid")[0].value;
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
	par_div.appendChild(createElement('input',{type:'hidden',name:'target_pid',value:target}));
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
// von mir erweiterte smilies
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu10.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu15.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu16.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu18.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu21.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu29.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu56.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu58.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu46.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu11.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol27.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol28.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol30.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol32.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol33.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol34.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol3.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx/mx16.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx/mx50.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx/mx54.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx2/mx11.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx2/mx14.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx2/mx26.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx2/mx38.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx2/mx72.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lv/lv4.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lv/lv29.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/fig/fig20.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/nt/nt22.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/tr/tr11.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/tr/tr5.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah6.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah41.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah27.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah45.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah27.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ess/ess6.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ess/ess34.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ess/ess37.gif');
editor.lineBreak();
// gelber block by JustMe
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
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/am1320.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amor40.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amor340.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amor520.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amor540.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amorr070.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amorr0220.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/36_3_210.gif');
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
editor.addSmilie('http://bsmilies.de/blue/standard/tongue2.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/clap.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/giggle.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/langenase.gif');
editor.addSmilie('http://bsmilies.de/blue/hallo/hallo1.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/hurra1.gif');
editor.addSmilie('http://bsmilies.de/blue/schock/shocking.gif');
editor.addSmilie('http://bsmilies.de/blue/ja/daumen.gif');
editor.addSmilie('http://bsmilies.de/blue/schock/iirre.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/vogel_m.gif');
editor.addSmilie('http://bsmilies.de/blue/standard/confused.gif');
editor.addSmilie('http://bsmilies.de/blue/traurig/langweilig.gif');
editor.addSmilie('');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://bsmilies.de/blue/fies/nichts.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/tongue.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/boing.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/lachtot.gif');
editor.addSmilie('http://bsmilies.de/blue/ja/hail.gif');
    editor.addSmilie('http://bsmilies.de/blue/love/hug.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/aufsmaul.gif');
    editor.addSmilie('http://bsmilies.de/blue/bildung/gruebel.gif');
    editor.addSmilie('http://bsmilies.de/blue/cool/cooler.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/kopf_zerhacken.gif');
editor.lineBreak();
    editor.lineBreak();
editor.addSmilie('http://bsmilies.de/blue/schild/lol_m.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/morgen.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/abend.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/nacht.gif');
editor.addSmilie('http://bsmilies.de/blue/schlaf/sleep.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/ecke_m.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/willkommen.gif');
editor.addSmilie('http://bsmilies.de/blue/oma_opa/frueher_m.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://bsmilies.de/blue/bildung/meld2_m.gif');
editor.addSmilie('http://bsmilies.de/blue/bildung/idee.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/dududu_m.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/jubel_m.gif');
editor.addSmilie('http://bsmilies.de/blue/schlaf/pssst.gif');
editor.addSmilie('http://bsmilies.de/blue/technik/licht_aus.gif');
editor.addSmilie('http://bsmilies.de/blue/oma_opa/go_m.gif');
editor.addSmilie('http://bsmilies.de/blue/oma_opa/oppa.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/omabrathau.gif');
editor.addSmilie('http://bsmilies.de/blue/oma_opa/gehwagen.gif');
editor.lineBreak();
editor.lineBreak();

editor.addSmilie('http://bsmilies.de/blue/traurig/brett_koppf.gif');
editor.addSmilie('http://bsmilies.de/blue/essen/lecker.gif');
editor.addSmilie('http://bsmilies.de/blue/wetter/schwitzi_m.gif');
editor.addSmilie('http://bsmilies.de/blue/halloween/hexe.gif');
editor.addSmilie('http://bsmilies.de/blue/halloween/besenritt_m.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Sprechblasen/smilie_sn_003.gif');
editor.addSmilie('http://bsmilies.de/blue/ja/danke1_m.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/steinflug_m.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah27.gif');
editor.addSmilie('http://server4.webkicks.de/dsl/replacer/wno.gif');
editor.addSmilie('http://server4.webkicks.de/dsl/replacer/wwork.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/wikiline_DS.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_270.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_081.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_066.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_063.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_181.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_029.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_027.gif');
editor.addSmilie('http://smiles.kolobok.us/big_he_and_she/girl_bye2.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_170.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_251.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_018.gif');
editor.addSmilie('http://wuerziworld.de/Smilies/baby/bab21.gif');
editor.addSmilie('http://www.cosgan.de/images/smilie/boese/p030.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Wut/smilie_wut_047.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Trinken/smilie_trink_006.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_068.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_069.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_283.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_328.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_146.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_106.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_101.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_178.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_342.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/nichtamplatz.gif');
editor.lineBreak();
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_272.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_115.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_278.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_273.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_337.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_298.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_304.gif');
editor.lineBreak();
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/schnuck.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_075.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_173.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_234.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_014.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah41.gif');
editor.addSmilie('http://wuerziworld.de/Smilies/wirr/wirr11.gif');
editor.addSmilie('http://bsmilies.de/yellow/oktober/mass_stemm.gif');
editor.addSmilie('http://bsmilies.de/yellow/oktober/jodeln_g.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://bsmilies.de/yellow/ja/yes.gif');
editor.addSmilie('http://bsmilies.de/yellow/fies/xp1.gif');
editor.addSmilie('http://bsmilies.de/yellow/essen/bier3.gif');
editor.addSmilie('http://bsmilies.de/yellow/rauchen/joint.gif');
editor.addSmilie('http://bsmilies.de/yellow/essen/bierkasten.gif');
editor.addSmilie('http://bsmilies.de/yellow/hallo/engel_hi.gif');
editor.addSmilie('http://bsmilies.de/yellow/fies/dash.gif');

editor.addSmilie('http://www.smilies.4-user.de/include/Ostern/smilie_oster_065.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Ostern/happy-easter.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Trinken/smilie_trink_002.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/SML/hoserunter.gif.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu36.gif');
editor.addSmilie('http://wuerziworld.de/Smilies/par/par13.gif');
editor.addSmilie('http://www.en.kolobok.us/smiles/artists/just_cuz/JC_gimmefive.gif');

editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://bsmilies.de/yellow/essen/morgen_g.gif');
editor.addSmilie('http://bsmilies.de/yellow/essen/essenfertig_m.gif');
editor.addSmilie('http://bsmilies.de/yellow/schild/moinmoin.gif');
editor.addSmilie('http://bsmilies.de/yellow/schild/montag.gif');
editor.addSmilie('http://wuerziworld.de/Smilies/schild/sd28.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Schilder/allefit.gif');

editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://www.smilies.4-user.de/include/Babys/smilie_baby_016.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_mttao_skorpion.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Eklig/smilie_iek_030.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/batman.gif');
editor.addSmilie('http://www.smiles.kolobok.us/user/Mauridia_38.gif');
editor.addSmilie('http://ww.vespaforum.de/images/smilies/icon_vespa.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/panne71.gif');



editor.addSmilie('http://img20.dreamies.de/img/994/b/perkql03zkw.gif');
editor.addSmilie('http://img3.dreamies.de/img/542/b/e5c0sz3iwvd.gif');
editor.addSmilie('http://img20.dreamies.de/img/459/b/5yxln9c5zjf.gif');
editor.addSmilie('http://img25.dreamies.de/img/369/b/4mpazvn9o6w.gif');
editor.addSmilie('http://img25.dreamies.de/img/781/b/m7f95fesi6u.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Bananen/smilie_ban_006.gif');
	editor.lineBreak();	
	editor.addBBCode('b');
	editor.addBBCode('i');
	editor.addBBCode('u');
	editor.addBBCode('big');
	editor.addBBCode('small');
	editor.addExtendetBBCode('color',language.help.color);	
	editor.addExtendetBBCode('quote',language.help.quote);	
	editor.addExtendetBBCode('url',language.help.url);	
	editor.addBBCode('img');
	editor.addBBCode('marquee');	
	editor.addBBCode('center');
	editor.addBBCode('ref');
	editor.addBBCode('youtube_m');	
}
// ==UserScript==
// @name           	Spielzeugmann Neu 2015 Pennergame
// @namespace      	Bande:staatSEXamenPENNER mod.DennyHamburg
// @description    	Erweiterter BB-Code Editor mit Vorschaufunktion und ganz neuen Smylies 2015
// @include        	http://schattenwölfe.de
// @include        	http://*game*/*
// @exclude			http://*game*/settin*
// @exclude			http://*game*/gang/adm*
// @exclude			http://*game*/gang/forum*
// @exclude			http://*game*/profi*
// @exclude			http://*game*/suppor*
// @version			2.1 neue smilies!
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_log
// @grant        GM_registerMenuCommand
// ==/UserScript==

var Version = '2.1';
var Script = 'https://greasyfork.org/scripts/8570-spielzeugmann-neu-f%C3%BCr-ff-und-tampermonky/code/Spielzeugmann%20Neu%20F%C3%BCr%20FF%20und%20Tampermonky.user.js';
var Meta = 'https://greasyfork.org/scripts/8570-spielzeugmann-neu-f%C3%BCr-ff-und-tampermonky/code/Spielzeugmann%20Neu%20F%C3%BCr%20FF%20und%20Tampermonky.meta.js';
update();




// seitenadresse ermitteln
var url = document.location.href;
var staticurl ='static2';

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
		window.setTimeout(function() {init_shoutbox()}, 2500);
		if (document.getElementById('smilies'))
            return;
		if (!document.getElementById(name))
			return;
		var textarea = $(name);
		var value = textarea.value;
        var target = document.getElementsByName("target_pid")[0].value;
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
	par_div.appendChild(createElement('input',{type:'hidden',name:'target_pid',value:target}));
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
// von mir erweiterte smilies
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu10.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu15.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu16.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu18.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu21.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu29.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu56.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu58.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu46.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu11.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol27.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol28.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol30.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol32.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol33.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol34.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol3.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx/mx16.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx/mx50.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx/mx54.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx2/mx11.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx2/mx14.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx2/mx26.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx2/mx38.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx2/mx72.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lv/lv4.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lv/lv29.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/fig/fig20.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/nt/nt22.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/tr/tr11.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/tr/tr5.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah6.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah41.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah27.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah45.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah27.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ess/ess6.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ess/ess34.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ess/ess37.gif');
editor.lineBreak();
// gelber block by JustMe
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
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/am1320.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amor40.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amor340.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amor520.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amor540.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amorr070.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amorr0220.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/36_3_210.gif');
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
editor.addSmilie('http://bsmilies.de/blue/standard/tongue2.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/clap.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/giggle.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/langenase.gif');
editor.addSmilie('http://bsmilies.de/blue/hallo/hallo1.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/hurra1.gif');
editor.addSmilie('http://bsmilies.de/blue/schock/shocking.gif');
editor.addSmilie('http://bsmilies.de/blue/ja/daumen.gif');
editor.addSmilie('http://bsmilies.de/blue/schock/iirre.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/vogel_m.gif');
editor.addSmilie('http://bsmilies.de/blue/standard/confused.gif');
editor.addSmilie('http://bsmilies.de/blue/traurig/langweilig.gif');
editor.addSmilie('');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://bsmilies.de/blue/fies/nichts.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/tongue.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/boing.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/lachtot.gif');
editor.addSmilie('http://bsmilies.de/blue/ja/hail.gif');
    editor.addSmilie('http://bsmilies.de/blue/love/hug.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/aufsmaul.gif');
    editor.addSmilie('http://bsmilies.de/blue/bildung/gruebel.gif');
    editor.addSmilie('http://bsmilies.de/blue/cool/cooler.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/kopf_zerhacken.gif');
editor.lineBreak();
    editor.lineBreak();
editor.addSmilie('http://bsmilies.de/blue/schild/lol_m.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/morgen.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/abend.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/nacht.gif');
editor.addSmilie('http://bsmilies.de/blue/schlaf/sleep.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/ecke_m.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/willkommen.gif');
editor.addSmilie('http://bsmilies.de/blue/oma_opa/frueher_m.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://bsmilies.de/blue/bildung/meld2_m.gif');
editor.addSmilie('http://bsmilies.de/blue/bildung/idee.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/dududu_m.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/jubel_m.gif');
editor.addSmilie('http://bsmilies.de/blue/schlaf/pssst.gif');
editor.addSmilie('http://bsmilies.de/blue/technik/licht_aus.gif');
editor.addSmilie('http://bsmilies.de/blue/oma_opa/go_m.gif');
editor.addSmilie('http://bsmilies.de/blue/oma_opa/oppa.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/omabrathau.gif');
editor.addSmilie('http://bsmilies.de/blue/oma_opa/gehwagen.gif');
editor.lineBreak();
editor.lineBreak();

editor.addSmilie('http://bsmilies.de/blue/traurig/brett_koppf.gif');
editor.addSmilie('http://bsmilies.de/blue/essen/lecker.gif');
editor.addSmilie('http://bsmilies.de/blue/wetter/schwitzi_m.gif');
editor.addSmilie('http://bsmilies.de/blue/halloween/hexe.gif');
editor.addSmilie('http://bsmilies.de/blue/halloween/besenritt_m.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Sprechblasen/smilie_sn_003.gif');
editor.addSmilie('http://bsmilies.de/blue/ja/danke1_m.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/steinflug_m.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah27.gif');
editor.addSmilie('http://server4.webkicks.de/dsl/replacer/wno.gif');
editor.addSmilie('http://server4.webkicks.de/dsl/replacer/wwork.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/wikiline_DS.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_270.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_081.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_066.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_063.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_181.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_029.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_027.gif');
editor.addSmilie('http://smiles.kolobok.us/big_he_and_she/girl_bye2.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_170.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_251.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_018.gif');
editor.addSmilie('http://wuerziworld.de/Smilies/baby/bab21.gif');
editor.addSmilie('http://www.cosgan.de/images/smilie/boese/p030.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Wut/smilie_wut_047.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Trinken/smilie_trink_006.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_068.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_069.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_283.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_328.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_146.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_106.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_101.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_178.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_342.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/nichtamplatz.gif');
editor.lineBreak();
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_272.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_115.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_278.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_273.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_337.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_298.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_304.gif');
editor.lineBreak();
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/schnuck.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_075.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_173.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_234.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_014.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah41.gif');
editor.addSmilie('http://wuerziworld.de/Smilies/wirr/wirr11.gif');
editor.addSmilie('http://bsmilies.de/yellow/oktober/mass_stemm.gif');
editor.addSmilie('http://bsmilies.de/yellow/oktober/jodeln_g.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://bsmilies.de/yellow/ja/yes.gif');
editor.addSmilie('http://bsmilies.de/yellow/fies/xp1.gif');
editor.addSmilie('http://bsmilies.de/yellow/essen/bier3.gif');
editor.addSmilie('http://bsmilies.de/yellow/rauchen/joint.gif');
editor.addSmilie('http://bsmilies.de/yellow/essen/bierkasten.gif');
editor.addSmilie('http://bsmilies.de/yellow/hallo/engel_hi.gif');
editor.addSmilie('http://bsmilies.de/yellow/fies/dash.gif');

editor.addSmilie('http://www.smilies.4-user.de/include/Ostern/smilie_oster_065.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Ostern/happy-easter.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Trinken/smilie_trink_002.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/SML/hoserunter.gif.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu36.gif');
editor.addSmilie('http://wuerziworld.de/Smilies/par/par13.gif');
editor.addSmilie('http://www.en.kolobok.us/smiles/artists/just_cuz/JC_gimmefive.gif');

editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://bsmilies.de/yellow/essen/morgen_g.gif');
editor.addSmilie('http://bsmilies.de/yellow/essen/essenfertig_m.gif');
editor.addSmilie('http://bsmilies.de/yellow/schild/moinmoin.gif');
editor.addSmilie('http://bsmilies.de/yellow/schild/montag.gif');
editor.addSmilie('http://wuerziworld.de/Smilies/schild/sd28.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Schilder/allefit.gif');

editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://www.smilies.4-user.de/include/Babys/smilie_baby_016.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_mttao_skorpion.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Eklig/smilie_iek_030.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/batman.gif');
editor.addSmilie('http://www.smiles.kolobok.us/user/Mauridia_38.gif');
editor.addSmilie('http://ww.vespaforum.de/images/smilies/icon_vespa.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/panne71.gif');



editor.addSmilie('http://img20.dreamies.de/img/994/b/perkql03zkw.gif');
editor.addSmilie('http://img3.dreamies.de/img/542/b/e5c0sz3iwvd.gif');
editor.addSmilie('http://img20.dreamies.de/img/459/b/5yxln9c5zjf.gif');
editor.addSmilie('http://img25.dreamies.de/img/369/b/4mpazvn9o6w.gif');
editor.addSmilie('http://img25.dreamies.de/img/781/b/m7f95fesi6u.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Bananen/smilie_ban_006.gif');
	editor.lineBreak();	
	editor.addBBCode('b');
	editor.addBBCode('i');
	editor.addBBCode('u');
	editor.addBBCode('big');
	editor.addBBCode('small');
	editor.addExtendetBBCode('color',language.help.color);	
	editor.addExtendetBBCode('quote',language.help.quote);	
	editor.addExtendetBBCode('url',language.help.url);	
	editor.addBBCode('img');
	editor.addBBCode('marquee');	
	editor.addBBCode('center');
	editor.addBBCode('ref');
	editor.addBBCode('youtube_m');	
}
// ==UserScript==
// @name           	Spielzeugmann Neu 2015 Pennergame
// @namespace      	Bande:staatSEXamenPENNER mod.DennyHamburg
// @description    	Erweiterter BB-Code Editor mit Vorschaufunktion und ganz neuen Smylies 2015
// @include        	http://schattenwölfe.de
// @include        	http://*game*/*
// @exclude			http://*game*/settin*
// @exclude			http://*game*/gang/adm*
// @exclude			http://*game*/gang/forum*
// @exclude			http://*game*/profi*
// @exclude			http://*game*/suppor*
// @version			2.1 neue smilies!
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_log
// @grant        GM_registerMenuCommand
// ==/UserScript==

var Version = '2.1';
var Script = 'https://greasyfork.org/scripts/8570-spielzeugmann-neu-f%C3%BCr-ff-und-tampermonky/code/Spielzeugmann%20Neu%20F%C3%BCr%20FF%20und%20Tampermonky.user.js';
var Meta = 'http://www.pg-scripte.de/111553.meta.js';
update();




// seitenadresse ermitteln
var url = document.location.href;
var staticurl ='static2';

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
		window.setTimeout(function() {init_shoutbox()}, 2500);
		if (document.getElementById('smilies'))
            return;
		if (!document.getElementById(name))
			return;
		var textarea = $(name);
		var value = textarea.value;
        var target = document.getElementsByName("target_pid")[0].value;
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
	par_div.appendChild(createElement('input',{type:'hidden',name:'target_pid',value:target}));
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
// von mir erweiterte smilies
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu10.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu15.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu16.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu18.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu21.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu29.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu56.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu58.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu46.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu11.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol27.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol28.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol30.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol32.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol33.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol34.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol3.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx/mx16.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx/mx50.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx/mx54.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx2/mx11.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx2/mx14.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx2/mx26.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx2/mx38.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx2/mx72.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lv/lv4.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lv/lv29.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/fig/fig20.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/nt/nt22.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/tr/tr11.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/tr/tr5.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah6.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah41.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah27.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah45.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah27.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ess/ess6.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ess/ess34.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ess/ess37.gif');
editor.lineBreak();
// gelber block by JustMe
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
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/am1320.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amor40.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amor340.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amor520.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amor540.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amorr070.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amorr0220.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/36_3_210.gif');
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
editor.addSmilie('http://bsmilies.de/blue/standard/tongue2.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/clap.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/giggle.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/langenase.gif');
editor.addSmilie('http://bsmilies.de/blue/hallo/hallo1.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/hurra1.gif');
editor.addSmilie('http://bsmilies.de/blue/schock/shocking.gif');
editor.addSmilie('http://bsmilies.de/blue/ja/daumen.gif');
editor.addSmilie('http://bsmilies.de/blue/schock/iirre.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/vogel_m.gif');
editor.addSmilie('http://bsmilies.de/blue/standard/confused.gif');
editor.addSmilie('http://bsmilies.de/blue/traurig/langweilig.gif');
editor.addSmilie('');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://bsmilies.de/blue/fies/nichts.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/tongue.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/boing.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/lachtot.gif');
editor.addSmilie('http://bsmilies.de/blue/ja/hail.gif');
    editor.addSmilie('http://bsmilies.de/blue/love/hug.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/aufsmaul.gif');
    editor.addSmilie('http://bsmilies.de/blue/bildung/gruebel.gif');
    editor.addSmilie('http://bsmilies.de/blue/cool/cooler.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/kopf_zerhacken.gif');
editor.lineBreak();
    editor.lineBreak();
editor.addSmilie('http://bsmilies.de/blue/schild/lol_m.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/morgen.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/abend.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/nacht.gif');
editor.addSmilie('http://bsmilies.de/blue/schlaf/sleep.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/ecke_m.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/willkommen.gif');
editor.addSmilie('http://bsmilies.de/blue/oma_opa/frueher_m.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://bsmilies.de/blue/bildung/meld2_m.gif');
editor.addSmilie('http://bsmilies.de/blue/bildung/idee.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/dududu_m.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/jubel_m.gif');
editor.addSmilie('http://bsmilies.de/blue/schlaf/pssst.gif');
editor.addSmilie('http://bsmilies.de/blue/technik/licht_aus.gif');
editor.addSmilie('http://bsmilies.de/blue/oma_opa/go_m.gif');
editor.addSmilie('http://bsmilies.de/blue/oma_opa/oppa.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/omabrathau.gif');
editor.addSmilie('http://bsmilies.de/blue/oma_opa/gehwagen.gif');
editor.lineBreak();
editor.lineBreak();

editor.addSmilie('http://bsmilies.de/blue/traurig/brett_koppf.gif');
editor.addSmilie('http://bsmilies.de/blue/essen/lecker.gif');
editor.addSmilie('http://bsmilies.de/blue/wetter/schwitzi_m.gif');
editor.addSmilie('http://bsmilies.de/blue/halloween/hexe.gif');
editor.addSmilie('http://bsmilies.de/blue/halloween/besenritt_m.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Sprechblasen/smilie_sn_003.gif');
editor.addSmilie('http://bsmilies.de/blue/ja/danke1_m.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/steinflug_m.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah27.gif');
editor.addSmilie('http://server4.webkicks.de/dsl/replacer/wno.gif');
editor.addSmilie('http://server4.webkicks.de/dsl/replacer/wwork.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/wikiline_DS.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_270.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_081.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_066.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_063.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_181.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_029.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_027.gif');
editor.addSmilie('http://smiles.kolobok.us/big_he_and_she/girl_bye2.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_170.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_251.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_018.gif');
editor.addSmilie('http://wuerziworld.de/Smilies/baby/bab21.gif');
editor.addSmilie('http://www.cosgan.de/images/smilie/boese/p030.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Wut/smilie_wut_047.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Trinken/smilie_trink_006.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_068.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_069.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_283.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_328.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_146.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_106.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_101.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_178.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_342.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/nichtamplatz.gif');
editor.lineBreak();
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_272.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_115.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_278.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_273.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_337.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_298.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_304.gif');
editor.lineBreak();
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/schnuck.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_075.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_173.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_234.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_014.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah41.gif');
editor.addSmilie('http://wuerziworld.de/Smilies/wirr/wirr11.gif');
editor.addSmilie('http://bsmilies.de/yellow/oktober/mass_stemm.gif');
editor.addSmilie('http://bsmilies.de/yellow/oktober/jodeln_g.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://bsmilies.de/yellow/ja/yes.gif');
editor.addSmilie('http://bsmilies.de/yellow/fies/xp1.gif');
editor.addSmilie('http://bsmilies.de/yellow/essen/bier3.gif');
editor.addSmilie('http://bsmilies.de/yellow/rauchen/joint.gif');
editor.addSmilie('http://bsmilies.de/yellow/essen/bierkasten.gif');
editor.addSmilie('http://bsmilies.de/yellow/hallo/engel_hi.gif');
editor.addSmilie('http://bsmilies.de/yellow/fies/dash.gif');

editor.addSmilie('http://www.smilies.4-user.de/include/Ostern/smilie_oster_065.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Ostern/happy-easter.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Trinken/smilie_trink_002.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/SML/hoserunter.gif.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu36.gif');
editor.addSmilie('http://wuerziworld.de/Smilies/par/par13.gif');
editor.addSmilie('http://www.en.kolobok.us/smiles/artists/just_cuz/JC_gimmefive.gif');

editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://bsmilies.de/yellow/essen/morgen_g.gif');
editor.addSmilie('http://bsmilies.de/yellow/essen/essenfertig_m.gif');
editor.addSmilie('http://bsmilies.de/yellow/schild/moinmoin.gif');
editor.addSmilie('http://bsmilies.de/yellow/schild/montag.gif');
editor.addSmilie('http://wuerziworld.de/Smilies/schild/sd28.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Schilder/allefit.gif');

editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://www.smilies.4-user.de/include/Babys/smilie_baby_016.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_mttao_skorpion.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Eklig/smilie_iek_030.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/batman.gif');
editor.addSmilie('http://www.smiles.kolobok.us/user/Mauridia_38.gif');
editor.addSmilie('http://ww.vespaforum.de/images/smilies/icon_vespa.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/panne71.gif');



editor.addSmilie('http://img20.dreamies.de/img/994/b/perkql03zkw.gif');
editor.addSmilie('http://img3.dreamies.de/img/542/b/e5c0sz3iwvd.gif');
editor.addSmilie('http://img20.dreamies.de/img/459/b/5yxln9c5zjf.gif');
editor.addSmilie('http://img25.dreamies.de/img/369/b/4mpazvn9o6w.gif');
editor.addSmilie('http://img25.dreamies.de/img/781/b/m7f95fesi6u.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Bananen/smilie_ban_006.gif');
	editor.lineBreak();	
	editor.addBBCode('b');
	editor.addBBCode('i');
	editor.addBBCode('u');
	editor.addBBCode('big');
	editor.addBBCode('small');
	editor.addExtendetBBCode('color',language.help.color);	
	editor.addExtendetBBCode('quote',language.help.quote);	
	editor.addExtendetBBCode('url',language.help.url);	
	editor.addBBCode('img');
	editor.addBBCode('marquee');	
	editor.addBBCode('center');
	editor.addBBCode('ref');
	editor.addBBCode('youtube_m');	
}
// ==UserScript==
// @name           	Spielzeugmann Neu 2015 Pennergame
// @namespace      	Bande:staatSEXamenPENNER mod.DennyHamburg
// @description    	Erweiterter BB-Code Editor mit Vorschaufunktion und ganz neuen Smylies 2015
// @include        	http://schattenwölfe.de
// @include        	http://*game*/*
// @exclude			http://*game*/settin*
// @exclude			http://*game*/gang/adm*
// @exclude			http://*game*/gang/forum*
// @exclude			http://*game*/profi*
// @exclude			http://*game*/suppor*
// @version			2.1 neue smilies!
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_log
// @grant        GM_registerMenuCommand
// ==/UserScript==

var Version = '2.1';
var Script = 'https://greasyfork.org/scripts/8570-spielzeugmann-neu-f%C3%BCr-ff-und-tampermonky/code/Spielzeugmann%20Neu%20F%C3%BCr%20FF%20und%20Tampermonky.user.js';
var Meta = 'http://www.pg-scripte.de/111553.meta.js';
update();




// seitenadresse ermitteln
var url = document.location.href;
var staticurl ='static2';

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
		window.setTimeout(function() {init_shoutbox()}, 2500);
		if (document.getElementById('smilies'))
            return;
		if (!document.getElementById(name))
			return;
		var textarea = $(name);
		var value = textarea.value;
        var target = document.getElementsByName("target_pid")[0].value;
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
	par_div.appendChild(createElement('input',{type:'hidden',name:'target_pid',value:target}));
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
// von mir erweiterte smilies
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu10.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu15.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu16.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu18.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu21.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu29.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu56.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu58.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu46.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu11.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol27.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol28.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol30.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol32.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol33.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol34.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lol/lol3.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx/mx16.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx/mx50.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx/mx54.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx2/mx11.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx2/mx14.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx2/mx26.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx2/mx38.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/mx2/mx72.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lv/lv4.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/lv/lv29.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/fig/fig20.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/nt/nt22.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/tr/tr11.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/tr/tr5.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah6.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah41.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah27.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah45.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah27.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ess/ess6.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ess/ess34.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ess/ess37.gif');
editor.lineBreak();
// gelber block by JustMe
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
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/am1320.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amor40.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amor340.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amor520.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amor540.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amorr070.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/amorr0220.gif');
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/36_3_210.gif');
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
editor.addSmilie('http://bsmilies.de/blue/standard/tongue2.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/clap.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/giggle.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/langenase.gif');
editor.addSmilie('http://bsmilies.de/blue/hallo/hallo1.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/hurra1.gif');
editor.addSmilie('http://bsmilies.de/blue/schock/shocking.gif');
editor.addSmilie('http://bsmilies.de/blue/ja/daumen.gif');
editor.addSmilie('http://bsmilies.de/blue/schock/iirre.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/vogel_m.gif');
editor.addSmilie('http://bsmilies.de/blue/standard/confused.gif');
editor.addSmilie('http://bsmilies.de/blue/traurig/langweilig.gif');
editor.addSmilie('');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://bsmilies.de/blue/fies/nichts.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/tongue.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/boing.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/lachtot.gif');
editor.addSmilie('http://bsmilies.de/blue/ja/hail.gif');
    editor.addSmilie('http://bsmilies.de/blue/love/hug.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/aufsmaul.gif');
    editor.addSmilie('http://bsmilies.de/blue/bildung/gruebel.gif');
    editor.addSmilie('http://bsmilies.de/blue/cool/cooler.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/kopf_zerhacken.gif');
editor.lineBreak();
    editor.lineBreak();
editor.addSmilie('http://bsmilies.de/blue/schild/lol_m.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/morgen.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/abend.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/nacht.gif');
editor.addSmilie('http://bsmilies.de/blue/schlaf/sleep.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/ecke_m.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/willkommen.gif');
editor.addSmilie('http://bsmilies.de/blue/oma_opa/frueher_m.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://bsmilies.de/blue/bildung/meld2_m.gif');
editor.addSmilie('http://bsmilies.de/blue/bildung/idee.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/dududu_m.gif');
editor.addSmilie('http://bsmilies.de/blue/froh/jubel_m.gif');
editor.addSmilie('http://bsmilies.de/blue/schlaf/pssst.gif');
editor.addSmilie('http://bsmilies.de/blue/technik/licht_aus.gif');
editor.addSmilie('http://bsmilies.de/blue/oma_opa/go_m.gif');
editor.addSmilie('http://bsmilies.de/blue/oma_opa/oppa.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/omabrathau.gif');
editor.addSmilie('http://bsmilies.de/blue/oma_opa/gehwagen.gif');
editor.lineBreak();
editor.lineBreak();

editor.addSmilie('http://bsmilies.de/blue/traurig/brett_koppf.gif');
editor.addSmilie('http://bsmilies.de/blue/essen/lecker.gif');
editor.addSmilie('http://bsmilies.de/blue/wetter/schwitzi_m.gif');
editor.addSmilie('http://bsmilies.de/blue/halloween/hexe.gif');
editor.addSmilie('http://bsmilies.de/blue/halloween/besenritt_m.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Sprechblasen/smilie_sn_003.gif');
editor.addSmilie('http://bsmilies.de/blue/ja/danke1_m.gif');
editor.addSmilie('http://bsmilies.de/blue/fies/steinflug_m.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah27.gif');
editor.addSmilie('http://server4.webkicks.de/dsl/replacer/wno.gif');
editor.addSmilie('http://server4.webkicks.de/dsl/replacer/wwork.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/wikiline_DS.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_270.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_081.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_066.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_063.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_181.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_029.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_027.gif');
editor.addSmilie('http://smiles.kolobok.us/big_he_and_she/girl_bye2.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_170.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_251.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_018.gif');
editor.addSmilie('http://wuerziworld.de/Smilies/baby/bab21.gif');
editor.addSmilie('http://www.cosgan.de/images/smilie/boese/p030.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Wut/smilie_wut_047.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Trinken/smilie_trink_006.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_068.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_069.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_283.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_328.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_146.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_106.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_101.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_178.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_342.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/nichtamplatz.gif');
editor.lineBreak();
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_272.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_115.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_278.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_273.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_337.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_298.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_304.gif');
editor.lineBreak();
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/schnuck.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_075.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_173.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_234.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Girls/smilie_girl_014.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/ah/ah41.gif');
editor.addSmilie('http://wuerziworld.de/Smilies/wirr/wirr11.gif');
editor.addSmilie('http://bsmilies.de/yellow/oktober/mass_stemm.gif');
editor.addSmilie('http://bsmilies.de/yellow/oktober/jodeln_g.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://bsmilies.de/yellow/ja/yes.gif');
editor.addSmilie('http://bsmilies.de/yellow/fies/xp1.gif');
editor.addSmilie('http://bsmilies.de/yellow/essen/bier3.gif');
editor.addSmilie('http://bsmilies.de/yellow/rauchen/joint.gif');
editor.addSmilie('http://bsmilies.de/yellow/essen/bierkasten.gif');
editor.addSmilie('http://bsmilies.de/yellow/hallo/engel_hi.gif');
editor.addSmilie('http://bsmilies.de/yellow/fies/dash.gif');

editor.addSmilie('http://www.smilies.4-user.de/include/Ostern/smilie_oster_065.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Ostern/happy-easter.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Trinken/smilie_trink_002.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/SML/hoserunter.gif.gif');
editor.addSmilie('http://www.wuerziworld.de/Smilies/boewu/boewu36.gif');
editor.addSmilie('http://wuerziworld.de/Smilies/par/par13.gif');
editor.addSmilie('http://www.en.kolobok.us/smiles/artists/just_cuz/JC_gimmefive.gif');

editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://bsmilies.de/yellow/essen/morgen_g.gif');
editor.addSmilie('http://bsmilies.de/yellow/essen/essenfertig_m.gif');
editor.addSmilie('http://bsmilies.de/yellow/schild/moinmoin.gif');
editor.addSmilie('http://bsmilies.de/yellow/schild/montag.gif');
editor.addSmilie('http://wuerziworld.de/Smilies/schild/sd28.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Schilder/allefit.gif');

editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://www.smilies.4-user.de/include/Babys/smilie_baby_016.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_mttao_skorpion.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Eklig/smilie_iek_030.gif');
editor.addSmilie('http://bsmilies.de/blue/schild/batman.gif');
editor.addSmilie('http://www.smiles.kolobok.us/user/Mauridia_38.gif');
editor.addSmilie('http://ww.vespaforum.de/images/smilies/icon_vespa.gif');
editor.lineBreak();
editor.lineBreak();
editor.addSmilie('http://sd-4.archive-host.com/membres/images/124877394352349516/smiley/panne71.gif');



editor.addSmilie('http://img20.dreamies.de/img/994/b/perkql03zkw.gif');
editor.addSmilie('http://img3.dreamies.de/img/542/b/e5c0sz3iwvd.gif');
editor.addSmilie('http://img20.dreamies.de/img/459/b/5yxln9c5zjf.gif');
editor.addSmilie('http://img25.dreamies.de/img/369/b/4mpazvn9o6w.gif');
editor.addSmilie('http://img25.dreamies.de/img/781/b/m7f95fesi6u.gif');
editor.addSmilie('http://www.smilies.4-user.de/include/Bananen/smilie_ban_006.gif');
	editor.lineBreak();	
	editor.addBBCode('b');
	editor.addBBCode('i');
	editor.addBBCode('u');
	editor.addBBCode('big');
	editor.addBBCode('small');
	editor.addExtendetBBCode('color',language.help.color);	
	editor.addExtendetBBCode('quote',language.help.quote);	
	editor.addExtendetBBCode('url',language.help.url);	
	editor.addBBCode('img');
	editor.addBBCode('marquee');	
	editor.addBBCode('center');
	editor.addBBCode('ref');
	editor.addBBCode('youtube_m');	
}
//updatefunktion 
function update(){
	var now = (new Date().getTime()/3600000).toString().split('\.')[0];
	var last_update = GM_getValue('last_update','0');
	if(now-last_update >= 1){
		GM_xmlhttpRequest({
			method: 'GET',  
			url: Meta,
			onload: function(content){
				var scriptname = (/@name\s*(.*?)\s*$/m.exec(content.responseText))[1];  
				var newversionhistory = (/@version\s*(.*?)\s*$/m.exec(content.responseText))[1];  
				var newversion = (/@version\s*(.*?)\s/m.exec(content.responseText))[1];  
				if (newversion != Version){  
					if (confirm('Es gibt eine neue Version des Skriptes '+scriptname+':\n\nVersion: \n'+newversionhistory+'\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschliessend durchgeführt werden.')){
						window.location.href = Script;	
					}
				}
			}
		}, false);  
		GM_setValue('last_update', now);
	}
}


