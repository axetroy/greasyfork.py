 // ==UserScript==
// @name        adjustColor
// @namespace   by syakku
// @description	convert colors to eye-friendly - webページの配色を目に優しく加工します
// @version     3.0
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

var _DEBUG = 0;

//	OPTION : skip <a> tag (link anchor)
//	OPTION : <a> タグ、つまりリンク文字列を処理から除外します
//	ex: [] or ["google.co.jp", "youtube", "&link=important"] or [*]
var _A_SKIP_URL =  ["*"];

//	OPTION : skip os theme check (<INPUT>, <TEXTAREA>...)
// OPTION : OSテーマの洗練されたデザインが無効化されてしまうのを防ぎます
var _IGNORE_THEME = false;

//	OPTION : fast apply
//	OPTION : 画面切り替えを高速化します。処理負荷は増えます
var _FAST = true;

//	OPTION : bg image color range justify white (_br)			
//	OPTION : 背景画像の色調整において、誤差調整を背景色の上限値に揃えるか否かです
var _BG_COLOR_TOP = true;

//	OPTION : "white" & "black" color
//var _br = 237, _bg = 228, _bb = 205;	//	《練色》
//var _br = 237, _bg = 233, _bb = 216;	//	《素色》
//var _br = 233, _bg = 228, _bb = 212; //	《灰白色》
//var _r2 = 23, _g2 = 25, _b2 = 23; //	《墨》
//var _r2 = 43, _g2 = 43, _b2 = 43;	//	《黒》
var _br = 234, _bg = 229, _bb = 227; //	《素色2》
var _br2 = 22, _bg2 = 22, _bb2 = 14;	//	《暗黒色》
var _fr = 234, _fg = 229, _fb = 227; //	《素色2》
var _fr2 = 43, _fg2 = 43, _fb2 = 43;	//	《暗黒色》



//	先んじて計算の一部
var _brm = (_br - _br2) / 255, _bgm = (_bg - _bg2) / 255, _bbm = (_bb - _bb2) / 255;
var _frm = (_fr - _fr2) / 255, _fgm = (_fg - _fg2) / 255, _fbm = (_fb - _fb2) / 255;
	
var _win = document.defaultView;

//	背景画像処理の初期化
var _aa;
var _cr, _cg, _cb;

_cr = Math.round((_br + _br2) / 2);
_aa = (_br - 255) / (_cr - 255);

if (_BG_COLOR_TOP === true){
	_cg =  _cr - Math.round((_br - _bg) / _aa);
	_cb =  _cr - Math.round((_br - _bb) / _aa);
} else {
	//	上限合わせではなく中心合わせの場合
	var _cg = Math.round((_bg + _bg2) / 2);
	var _cb = Math.round((_bb + _bb2) / 2); 
}

var _rgba = "rgba(" + _cr+ ", " + _cg + ", " + _cb + ", " + _aa + ")";
var _alpha = "linear-gradient(" + _rgba + ',' + _rgba + "),";
var _count = "linear-gradient(rgba(" + _cr+ ", " + _cg + ", " + _cb + ", " ;
var _count_length = _count.length;



//	debug:	RESET
// GM_setValue("_FIRSTRUN", true);

//	システムカラーの取得

//	念のため初期化しておく
var _SYS_BUTTON = "rgb(227, 227, 227)", _SYS_TEXT = "rgb(255, 255, 255)", _SYS_SELECT = "rgb(255, 255, 255)", _SYS_PROGRESS = "rgb(230, 230, 230)";

if (_DEBUG === 0){
	if (GM_getValue("_FIRSTRUN") !== false){checkSysColor();}
	else {
		_SYS_BUTTON = GM_getValue("_SYS_BUTTON");
		_SYS_TEXT = GM_getValue("_SYS_TEXT");
		_SYS_SELECT = GM_getValue("_SYS_SELECT");
		_SYS_PROGRESS = GM_getValue("_SYS_PROGRESS");
	}
}

//	システムカラー処理の下処理
var _SYS_TAG = ["BUTTON", "TEXTAREA", "SELECT", "PROGRESS", "INPUT"];
var _SYS_COLOR = [_SYS_BUTTON, _SYS_TEXT, _SYS_SELECT, _SYS_PROGRESS, _SYS_TEXT];
	

//	使ったカラーリスト（重複起動のチェックに使う）
var _listF = ["transparent",
					"rgb(" + _fr + ", " + _fg + ", " + _fb + ")",
					"rgb(" + _fr2 + ", " + _fg2 + ", " + _fb2 + ")"];
var _backF = ["transparent",
					"rgb(255, 255, 255)",
					"rgb(0, 0, 0)"];
var _listB = ["transparent",
					"rgb(" + _br + ", " + _bg + ", " + _bb + ")",
					"rgb(" + _br2 + ", " + _bg2 + ", " + _bb2 + ")"];
var _backB = ["transparent",
					"rgb(255, 255, 255)",
					"rgb(0, 0, 0)"];
var _countF = 2, _countB = 2;

//	URLフィルタ
var _skip = false;
for (var i=0; i<_A_SKIP_URL.length; i++){
	if (location.href.indexOf(_A_SKIP_URL[i]) !== -1 || _A_SKIP_URL[i] === "*"){_skip = true;}
}
	


/* -------------------------------- 初期化ココマデ -------------------------------- */



// 起動処理
if (_FAST === true){
	main();
	_win.addEventListener("load", function(){main(true)}, false);

} else {
	_win.addEventListener("load", function(){main(true)}, false);
}
	

	
//	main
function main(_important) {

    var _elm = document.getElementsByTagName("*");
	var _elm_length = _elm.length;

	for (var i = 0; i < _elm_length; i++) {

		var _tElm = _elm[i];
        var _style = _win.getComputedStyle(_tElm, null);
		var _fgColor = _style.getPropertyValue("color");
		var _bgColor = _style.getPropertyValue("background-color");
		var _bgImage = _style.getPropertyValue("background-image");
		
		// 文字色
		fg:{
			if (_tElm.tagName === "A") {if (_skip === true){break fg;}}
			
			//	処理する必要のないカラーは省く
			for (var n=0; n<=_countF; n++){
				if (_fgColor === _listF[n]){break fg;}
			}
			
			//	既存のカラーは省エネ
			for (var n=0; n<=_countF; n++){
				if (_fgColor === _backF[n]){
					//	文字色にimportantを使うとAタグにまで継承されてしまう
					_tElm.style.color = _listF[n];
					break fg;
				}
			}
			
			var _tColorF = fConvColor(_fgColor);
			_countF++;
			_backF[_countF] = _fgColor;
			_listF[_countF] = _tColorF;
			//	文字色にimportantを使うとAタグにまで継承されてしまう
			_tElm.style.color = _listF[n];
		}
		
		// 背景処理
		bg:{
			if (_bgImage !== "none"){
				if (_bgImage.substring(0, _count_length) !== _count){
					_tElm.style.backgroundImage = _alpha + _bgImage;
				}
				break bg;
			}

			//	処理する必要のないカラーは省く
			for (var n=0; n<=_countB; n++){
				if (_bgColor === _listB[n]){break bg;}
			}
			
			//	システムカラーと照合
			if (_tElm.style.borderStyle === "") {
				for (_c=0; _c<5; _c++){
					if (_tElm.tagName === _SYS_TAG[_c]) {
						if (checkTheme(_c, _bgColor, _tElm.getAttribute("type"))){break bg;}
						break;
					}
				}
			}
			
			//	既存のカラーは省エネ
			for (var n=0; n<=_countB; n++){
				if (_bgColor === _backB[n]){
					if (_important === false){_tElm.style.backgroundColor = _listB[n];}
					else {_tElm.style.setProperty("background-color", _listB[n], "important");}
					break bg;
				}
			}

			var _tColorB = bConvColor(_bgColor);
			_countB++;
			_backB[_countB] = _bgColor;
			_listB[_countB] = _tColorB;
			if (_important === false){_tElm.style.backgroundColor = _listB[n];}
			else {_tElm.style.setProperty("background-color", _listB[n], "important");}
		}
	}
	// debug
	// alert("_listF" + "\n" + _listF + "\n\n" + _backF + "\n\n"  + "_listB" + "\n" + _listB + "\n\n" + _backB + "\n\n" + _countF + "\n" +  _countB);
}



/* -------------------------------- メイン関数ココマデ -------------------------------- */




// 文字色レンジ縮小
function fConvColor(_fg) {

	if (_fg === "rgb(255, 255, 255)"){return(_listF[1])}
	if (_fg === "rgb(0, 0, 0)"){return(_listF[2])}
	
	if (_fg.substring(0, 4) === "rgb("){_fg = _fg.slice(4, -1)}
	else {_fg = _fg.slice(5, -1)}
	
	var _col = _fg.split(", ");

    //	rgb * (_rgb - _rgb2) / 255 + _rgb2
    var _colR = Math.floor(_col[0] * _frm + _fr2);
    var _colG = Math.floor(_col[1] * _fgm + _fg2);
    var _colB = Math.floor(_col[2] * _fbm + _fb2);

    if (typeof _col[3] === "undefined") {
        return ("rgb(" + _colR + ", " + _colG + ", " + _colB + ")");
    }
    return ("rgb(" + _colR + ", " + _colG + ", " + _colB + ", " + _col[3] + ")"); //	rgba
}



//	背景色レンジ縮小
function bConvColor(_bg) {

	if (_bg === "rgb(255, 255, 255)"){return(_listB[1]);}
	if (_bg === "rgb(0, 0, 0)"){return(_listB[2]);}

	if (_bg.substring(0, 4) === "rgb("){_bg = _bg.slice(4, -1)}
	else {_bg = _bg.slice(5, -1)}
	
	var _col = _bg.split(", ");

    //	rgb * (_rgb - _rgb2) / 255 + _rgb2
    var _colR = Math.floor(_col[0] * _brm + _br2);
    var _colG = Math.floor(_col[1] * _bgm + _bg2);
    var _colB = Math.floor(_col[2] * _bbm + _bb2);

    if (typeof _col[3] === "undefined") {
        return ("rgb(" + _colR + ", " + _colG + ", " + _colB + ")");
    }
    return ("rgb(" + _colR + ", " + _colG + ", " + _colB + ", " + _col[3] + ")"); //	rgba
}



//	システムカラーと比較
function checkTheme(_c, _col, _att){

	if (_IGNORE_THEME === true){return false}
	if (_SYS_TAG[_c] === "INPUT"){
		switch (_att){
			case "hidden":	return true;
			case "reset":	case "button":	case "submit":
				if (_col === _SYS_BUTTON){return true}
			default:
				if (_col === _SYS_TEXT){return true}
		}
	} else if (_col === _SYS_COLOR[_c]){return true}
	return false;
}



//	システムカラー取得。初回起動時のみ
function checkSysColor() {

    var _button = document.createElement("BUTTON"),
        _text = document.createElement("TEXTAREA"),
        _select = document.createElement("SELECT"),
        _progress = document.createElement("PROGRESS");

    _SYS_BUTTON = _win.getComputedStyle(_button, null).getPropertyValue("background-color");
    _SYS_TEXT = _win.getComputedStyle(_text, null).getPropertyValue("background-color");
    _SYS_SELECT = _win.getComputedStyle(_select, null).getPropertyValue("background-color");
    _SYS_PROGRESS = _win.getComputedStyle(_progress, null).getPropertyValue("background-color");
	
	GM_setValue("_SYS_BUTTON", _SYS_BUTTON);
	GM_setValue("_SYS_TEXT", _SYS_TEXT);
	GM_setValue("_SYS_SELECT", _SYS_SELECT);
	GM_setValue("_SYS_PROGRESS", _SYS_PROGRESS);
	GM_setValue("_FIRSTRUN", false);

}
