// ==UserScript==
// @name          Animando al mantenimiento de Linux en Español
// @namespace     linuxespanol
// @description   Colaborar en el mantenimiento de linuxespanol.com
// @version       0.1
// @include       http://linuxespanol.com/*
// @include       http://www.linuxespanol.com/*
// ==/UserScript==
//
var LINESPA = LINESPA || {};

Array.prototype.contiene = function ( elemento ) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == elemento) {
            return true;
        }
    }
    return false;
}

LINESPA.tabla=document.getElementsByClassName("bodyline")[0].getElementsByTagName("table")[0];
LINESPA.tabla.style.visibility = "hidden";
LINESPA.msgs = {ultimos: []};
LINESPA.listaForos = ["a","b"];

LINESPA.updateMenuBlock = function () {
	var a = document.createElement('a');
	a.innerHTML = '- Etcetera.';
	a.href = '/?ver=foro&fid=10';
	document.getElementsByClassName('menuBlock')[2].appendChild(a);
	a = document.createElement('br');
	document.getElementsByClassName('menuBlock')[2].appendChild(a);
	a = document.createElement('a');
	a.innerHTML = '- Compartir Codigos';
	a.href = '/?ver=foro&fid=12';
	document.getElementsByClassName('menuBlock')[2].appendChild(a);
}
LINESPA.addMenuButton = function (){
	var a = document.createElement('a');
	a.innerHTML = 'Colaboraciones';
	a.href = 'javascript:void(0)';
	document.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[1].appendChild(a);
}
LINESPA.cargaTabla = function (){
	var r=0;
	try {
		while(row=this.tabla.rows[r++])
		{
			//console.log( "r=" + r );
			var fila=new Array();
			if (r==0) { LINESPA.cabeceraTabla = this.tabla.rows[r]; console.log ("LINESPA.cabeceraTabla Definido") } else {
				fila['idtema']=this.tabla.rows[r].cells[0].innerHTML;
				fila['foro']=this.tabla.rows[r].cells[1].getElementsByTagName("b")[0].innerHTML;
				fila['tema']=this.tabla.rows[r].cells[2].innerHTML;
				fila['respuestas']=this.tabla.rows[r].cells[3].innerHTML;
				fila['fecha']=this.tabla.rows[r].cells[4].innerHTML;
				fila['usuario']=this.tabla.rows[r].cells[5].innerHTML;
				this.msgs.ultimos.push(fila);
			}
		}
	}catch(e){}

	for (r=0; r<this.msgs.ultimos.length; r++) {
		var elForo = this.msgs.ultimos[r].foro;
		if (!this.listaForos.contiene(elForo)) {
			this.listaForos.push(elForo);
			var dt = document.createElement('div');
			var dpt = document.createElement('div');
			dpt.className = "pulsadorForo";
			dpt.innerHTML="<br />" + elForo;
			dt.appendChild(dpt);
			var t = document.createElement('table');
			t.id=elForo;
			t.width="100%";
			t.style=style="border:2px solid #000";
			var cabecera=document.createElement ("tr");
			cabecera.style="font-size:12px;";
			cabecera.innerHTML='<td bgcolor="#f7db18"></td><td bgcolor="#f7db18">Tema</td><td bgcolor="#f7db18">Respuestas</td><td bgcolor="#f7db18">Ultima</td><td bgcolor="#f7db18">Usuario</td></tr>';
			t.appendChild(cabecera);
			dt.appendChild(t);
			document.getElementsByClassName("bodyline")[0].insertBefore(dt, this.tabla);
		}
		var tablaForo=document.getElementById(elForo);
		var lineaIns=document.createElement('tr');
		lineaIns.style.backgroundColor="#fffbc6";

		var celdaIns=document.createElement('td');
		celdaIns.innerHTML=this.msgs.ultimos[r].idtema;
		lineaIns.appendChild(celdaIns);
		
		celdaIns=document.createElement('td');
		celdaIns.innerHTML=this.msgs.ultimos[r].tema;
		lineaIns.appendChild(celdaIns);

		celdaIns=document.createElement('td');
		celdaIns.innerHTML=this.msgs.ultimos[r].respuestas;
		lineaIns.appendChild(celdaIns);

		celdaIns=document.createElement('td');
		celdaIns.innerHTML=this.msgs.ultimos[r].fecha;
		lineaIns.appendChild(celdaIns);

		celdaIns=document.createElement('td');
		celdaIns.innerHTML=this.msgs.ultimos[r].usuario;
		lineaIns.appendChild(celdaIns);

		tablaForo.appendChild(lineaIns);
	}

}
LINESPA.chatForaneo = function () {
    a = document.createElement('script');
    a.type = 'text/javascript';
    a.id='cid0020000110613925854';
    a.setAttribute('data-cfasync', 'false');
    a.async;
    a.style="width: 512px;height: 350px;"
    a.text='{"handle":"linespa","arch":"js","styles":{"a":"ff9900","b":100,"c":"000000","d":"000000","k":"ff9900","l":"ff9900","m":"ff9900","p":"10","q":"ff9900","r":100,"usricon":1.3,"pos":"tr","cv":1,"cvfntsz":"14px","cvbg":"ff6600","cvfg":"330099","cvw":512,"cvh":30,"cnrs":"0.35","ticker":1,"fwtickm":1}}';
    a.src="//st.chatango.com/js/gz/emb.js";
	document.body.appendChild(a);
	this.modificaForaneo();
}
LINESPA.modificaForaneo = function () {
	// Suprimimos los enlace saltarínes al site del chat http://linespa.chatango.com
	window.document.addEventListener('load', function () {
		console.log ( "inicio pausa" );
		t=0;
		window.setTimeout ( function () {  //Esoero un poco que carge
			if ( t ) { return false; }; // se me inicia muchas veces. No lo entiendo. "Alf"
			console.log ( "pausa terminada" );
			console.log ( "document.domain = " + document.domain );
			iframe = document.getElementById( "7482060020000110613925854" );
			//txt=;
			console.log ( iframe == null ? "Sin el iframe (" + t++ + ")" : "Todo bien con el iframe" );
			wIframe = iframe.contentWindow || iframe.contentDocument.parentWindow;
			console.log ( wIframe == null ? "Sin el iframe (" + t++ + ")" : "Todo bien con el wIframe" );
			wframe.addEventListener('load', function () {
//		iframe.contentWindow.document.getElementById( "GTL" ).href = "javascript:void(0)";
//		iframe.contentWindow.document.getElementById( "UTL" ).href = "javascript:void(0)";
				document.getElementById( "GTL" ).href = "javascript:void(0)";
				document.getElementById( "UTL" ).href = "javascript:void(0)";
				console.log ( "B document.domain = " + document.domain );
			}, true );
		t++;}, 10000 );
	}, true );
	console.log ( "A document.domain = " + document.domain );
}
LINESPA.optenerParametroGet = function ( idValor ) {
		var urlsec = window.location.search.substring( 1 );
		return decodeURIComponent( urlsec.split("=")[1]);
}
LINESPA.inicia = function (){
	this.updateMenuBlock();
	this.addMenuButton();
	this.cargaTabla();
	document.getElementsByClassName("bodyline")[0].removeChild(this.tabla);
	// añadimos el chat
	this.chatForaneo();
	// inicio un entorno de desarrollo en la página
	//this.debug.iniciar (document);
	// Nueva versión
/*
	//Usage: var queryStringVals = GetQueryStringParams("PName");﻿
	if ( this.optenerParametroGet ('linespa') == '1' ) { return 0;} ;
	var ls_window = document.createElement ( 'iframe' );
	ls_window.id='ls_vivo';
	//ls_window.setAttribute( "src", "http://linuxespanol.com/?linespa=1" );
	ls_window.setAttribute( "src", "about:blank" );

	ls_dtd = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"\
        "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">\
        <html dir="ltr">\n';
*/
/*
	var ls_cabeza = (ls_window.contentWindow.document || ls_window.contentDocument)
	.head = document.head;
	var ls_cuerpo = (ls_window.contentWindow.document || ls_window.contentDocument)
	.body = document.body;
*/
/*
	var ls_cabeza = document.head;
	var ls_cuerpo = document.body;
	document.body.innerHTML = '';
	document.body.appendChild ( ls_window );
	ls_doc_vivo = ( document.getElementById( 'ls_vivo' ).contentDocument || document.getElementById( 'ls_vivo' ).contentWindow.document );
	console.log ( ls_doc_vivo );
	ls_doc_vivo.head = ls_cabeza;
	ls_doc_vivo.body = ls_cuerpo;

	//var tmpObj = document.createElement ( 'table' );
	//ls_live_win = ( document.getElementById( 'ls_vivo' ).contentWindow || document.getElementById( 'ls_vivo' ).contentDocument );

	console.log ( ls_doc_vivo + " " + ls_cabeza + " " + ls_cuerpo );
*/
/*
	document.frames[0].document.open();
	document.frames[0].document.write('Hello world');
	document.frames[0].document.close();
*/
/*
	ls_doc_vivo.open();
	ls_doc_vivo.write( '<html><head>' + ls_cabeza.innerHTML + '</head>\<body>' + ls_cuerpo.innerHTML + '</doby></html>' );
	ls_doc_vivo.close();
	//ls_doc_vivo.head = ls_cabeza;
	//ls_doc_vivo.body = ls_cuerpo;
	var tmpObj = ls_doc_vivo.getElementsByTagName( 'TABLE' )[0];
	console.log ( tmpObj );
	//document.appendChild ( tmpObj );
*/
}
LINESPA.debug = {
	iniciado : false,
	Salida : null,
	Entrada : null,
	idBuffer : 'buffer',
	debugDoom : null,
	Opciones : {
		Countador : 0,
		FondoShell : 'Black',
		FuenteShell : 'lightgreen',
	},
	iniciar : function ( ls_Body ){
		//document.getElementsByTagName('META')[0].setAttribute ( 'charset' = 'utf-8' );
		document.getElementsByTagName('META')[0].content = 'text/html; charset=utf-8';
		var tmp = null;
		var t = document.createElement('table');
		var d = document.createElement('div');
		t.id='ls_debug';
		t.border = 1;
		t.width = '100%';
		t.cellspacing = 0;
		t.cellspading = 0;
		t.style = 'padding: 0px; margin: 0px;';
		t.innerHTML = '<tr><th colspan="2" style="text-align : left; color : lightgrey;"><pre>'
			+ this.trim ( this.forainHtmlCodeParser ( document.head.innerHTML ) ) + '</pre></th></tr><tr>'
			+ '<td id="ls_body" colspan="2"></td></tr><tr><td id="entradaJS">entradaJS'
			+ '</td><td id="debugShell">debugShell</td></tr>';
		//d.style = 'overflow-y : scroll;';
		d.style = 'overflow-y: scroll ; max-height: 350px;';
		this.debugDoom = ls_Body.body;
		console.log ( this.debugDoom == null ? "Sin debugDoom" : "Con debugDoom" );
		d.innerHTML = this.debugDoom.innerHTML;
		console.log ( d == null ? "Sin div" : "Con div" );
		document.body.innerHTML='';
		this.debugDoom.appendChild ( t );
		document.getElementById ('ls_body').appendChild(d);
	},
	ocultar : function (){
		//var t = Tabs.Equally;
	},
	mostrar : function (){
		//var t = Tabs.Equally;
	},
	limpiar : function (){
		//
	},
	evaluar : function ( ls_body ){
		//
	},
	forainHtmlCodeParser : function ( str ) {
		var forainHtmlCode = {
			192: '&Agrave;',	193: '&Aacute;',	194: '&Acirc;' ,	195: '&Atilde;',
			196: '&Auml;'  ,	197: '&Aring;' ,	198: '&AElig;' ,	199: '&Ccedil;',
			200: '&Egrave;',	201: '&Eacute;',	202: '&Ecirc;' ,	203: '&Euml;'  ,
			204: '&Igrave;',	205: '&Iacute;',	206: '&Icirc;' ,	207: '&Iuml;'  ,
			208: '&ETH;'   ,	209: '&Ntilde;',	210: '&Ograve;',	211: '&Oacute;',
			212: '&Ocirc;' ,	213: '&Otilde;',	214: '&Ouml;'  ,	215: '&times;' ,
			216: '&Oslash;',	217: '&Ugrave;',	218: '&Uacute;',	219: '&Ucirc;' ,
			220: '&Uuml;'  ,	221: '&Yacute;',	222: '&THORN;' ,	223: '&szlig;' ,
			224: '&agrave;',	225: '&aacute;',	226: '&acirc;' ,	227: '&atilde;',
			228: '&auml;'  ,	229: '&aring;' ,	230: '&aelig;' ,	231: '&ccedil;',
			232: '&egrave;',	233: '&eacute;',	234: '&ecirc;' ,	235: '&euml;'  ,
			236: '&igrave;',	237: '&iacute;',	238: '&icirc;' ,	239: '&iuml;'  ,
			240: '&eth;'   ,	241: '&ntilde;',	242: '&ograve;',	243: '&oacute;',
			244: '&ocirc;' ,	245: '&otilde;',	246: '&ouml;'  ,	247: '&divide;',
			248: '&oslash;',	249: '&ugrave;',	250: '&uacute;',	251: '&ucirc;' ,
			252: '&uuml;'  ,	253: '&yacute;',	254: '&thorn;' ,	255: '&yuml;'  ,
			8364:'&euro;'  ,	38: '&amp;'    ,	60: '&lt;'     ,	62: '&gt;'     ,
			34: '&quot;'   ,	39: '&#39;'    ,	161: '&iexcl;' ,	162: '&cent;'  ,
			163: '&pound;' ,	164: '&curren;',	165: '&yen;'   ,	166: '&brvbar;',
			167: '&sect;'  ,	168: '&uml;'   ,	169: '&copy;'  ,	170: '&ordf;'  ,
			171: '&laquo;' ,	172: '&not;'   ,	174: '&reg;'   ,	175: '&macr;'  ,
			176: '&deg;'   ,	177: '&plusmn;',	178: '&sup2;'  ,	179: '&sup3;'  ,
			180: '&acute;' ,	181: '&micro;' ,	182: '&para;'  ,	183: '&middot;',
			184: '&cedil;' ,	185: '&sup1;'  ,	186: '&ordm;'  ,	187: '&raquo;' ,
			188: '&frac14;',	189: '&frac12;',	190: '&frac34;',	"­": '&shy;'    ,
			160: '&nbsp;'  ,	191: '&iquest;'
		};
		return str.replace(/[&<>"']/g, function(i) { return forainHtmlCode[i.charCodeAt(0)]; });
	},
	trim : function ( cadena ) {     
		return cadena.replace(/^s+/g,'').replace(/s+$/g,'');
	}
}

LINESPA.inicia();

