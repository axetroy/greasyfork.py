// ==UserScript==
// @name           futaba form image previewer
// @namespace      https://github.com/akoya-tomo
// @description    ふたばの返信フォームの添付ファイル機能を拡張
// @author         akoya_tomo
// @include        http://*.2chan.net/*/res/*
// @include        https://*.2chan.net/*/res/*
// @include        http://*.2chan.net/*/futaba.htm
// @include        https://*.2chan.net/*/futaba.htm
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @version        0.4.3
// @grant          GM_addStyle
// @license        MIT
// @noframes
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

(function ($) {
	/*
	 *	設定
	 */
	var DROP_AREA_SIZE = 0;			// ファイル未選択時のドロップエリアの高さ（単位:px）（0で非表示）
	var PREVIEW_MAX_SIZE = 250;		// プレビュー最大サイズ（単位:px）（最大250）
	var WEBM_AUTOPLAY = true;		// WebMのプレビューを自動再生する（true = 自動再生する : false = 自動再生しない）
	var WEBM_LOOP = true;			// WebMのプレビューをループ再生する（true = ループ再生する : false = ループ再生しない）
	var DROP_AREA_STYLE = "background-color:#f2f2f2; border:2px #eeaa88 solid; border-radius: 8px;";	// ドロップエリアのスタイル指定
	//var DROP_AREA_STYLE = "background-color:#f2f2f2; border:2px #eeaa88 solid; border-radius: 8px;";	// スタイルのデフォルト設定

	var dropAreaStyle = (DROP_AREA_SIZE > 0 ? DROP_AREA_STYLE : "");
	var dropAreaText = (DROP_AREA_SIZE >= 12 ? "ここにドロップ" : "");
	var inputButtonText = "参照...";
	var inputFilenameText = "ファイルが選択されていません。";
	var webmAutoplay = (WEBM_AUTOPLAY ? " autoplay" : "");
	var webmLoop = (WEBM_LOOP ? " loop" : "");
	var previewMaxSize = Math.min(PREVIEW_MAX_SIZE, 250);

	setInputButtonText();
	setStyle();
	makeButton();

	/*
	 * ボタン設定
	 */
	function makeButton() {
		var $inputFile = $("<div>", {
			id: "ffip_input_file",
			class: "ffip-input-file",
		});
		var inputFileView =
			"<div id='ffip_input_file_view' class='ffip-input-file-view'>" +
				"<div id='ffip_input_file_container' class='ffip-input-file-container'>" +
					"<div id='ffip_button' class='ffip-button'>" + inputButtonText + "</div>" +
					"<div id='ffip_filename' class='ffip-filename'>" + inputFilenameText + "</div>" +
				"</div>" +
			"</div>" +
			"<div id='ffip_preview' class='ffip-droparea'>" + dropAreaText + "</div>" +
			"<div id='ffip_file_info' class='ffip-file-info'></div>";
		var $fileClearButton = $("<div>", {
			id: "ffip_file_clear",
			class: "ffip-file-clear",
			text: "[クリア]",
			click: function() {
				clearFile();
			}
		});
		var $upfile = $("form input[name='upfile']");
		if (!$upfile.length) return;

		var $upfileTd = $upfile.closest("td");
		if (!$upfileTd.length) return;

		$upfileTd.contents().filter(function() {
			return this.nodeName != "INPUT";
		}).remove();
		if (!$("form input[name='upfile']").length) {
			// ふたクロ
			$upfile = $upfile.clone();
			$upfileTd.append($upfile);
		}
		$upfile.attr("id", "ffip_upfile").addClass("ffip-upfile").attr("autocomplete", "nope");	// リロード時の添付ファイル復活を抑止
		$upfile.wrap($inputFile);
		$upfile.before(inputFileView);
		$("#ffip_input_file_container").after($fileClearButton);

		preview();

	}

	/*
	 * 入力ファイルクリア
	 */
	function clearFile() {
		$("#ffip_upfile").val("");
		$("#ffip_preview").replaceWith("<div id='ffip_preview' class='ffip-droparea'>" + dropAreaText + "</div>");
		$("#ffip_file_info").empty();
		$("#ffip_filename").text(inputFilenameText);
	}

	/*
	 * プレビュー表示
	 */
	function preview(){
		// アップロードするファイルを選択
		$("#ffip_upfile").change(function() {
			var file = $(this).prop("files")[0];
			var fileType = file.type.split("/");
			var previewTag, imgWidth, imgHeight;
			if (fileType[0] == "image") {
				previewTag = "<img id='ffip_preview' class='ffip-preview'></img>";
			} else if (fileType[1] == "webm" || fileType[1] == "mp4") {
				previewTag = "<video id='ffip_preview' class='ffip-preview' muted" + webmAutoplay + webmLoop + "></video>";
			// 画像とWebM･mp4以外は処理を中止
			} else {
				clearFile();
				return;
			}

			$("#ffip_filename").text(file.name);
			$("#ffip_preview").replaceWith(previewTag);

			// WebMの幅と高さ取得
			if (fileType[1] == "webm" || fileType[1] == "mp4") {
				var video = $("#ffip_preview")[0];
				// メタデータ読み込み完了
				video.addEventListener("loadedmetadata",function (e){
					imgWidth = video.videoWidth;
					imgHeight = video.videoHeight;
					fileInformation();
				});
			}

			// プレビュー表示
			var reader = new FileReader();
			reader.onload = function() {
				$("#ffip_preview").attr("src",reader.result);
			};
			reader.readAsDataURL(file);

			// 画像の幅と高さ取得
			if (fileType[0] == "image") {
				var image = new Image();
				image.onload = function() {
					imgWidth = image.naturalWidth;
					imgHeight = image.naturalHeight;
					fileInformation();
				};
				image.src = URL.createObjectURL(file);
			}

			/*
			 * ファイル情報表示
			 */
			function fileInformation() {
				$("#ffip_file_info").empty();

				var imgSizeTag = "<span class='ffip-img-size'> " + imgWidth + "×" + imgHeight + "</span>／";
				var fileSizeSep = ("" + file.size).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
				var fileSizeTag = "<span class='ffip-file-size'>" + fileSizeSep + "byte</span>／";
				var fileTypeTag = "<span class='ffip-file-type'>" + fileType[1] + "</span>";

				$("#ffip_file_info").append(imgSizeTag);
				$("#ffip_file_info").append(fileSizeTag);
				$("#ffip_file_info").append(fileTypeTag);
			}
		});
		// ページ読み込み時にファイルが既にあればchangeイベントを発火させる
		if ($("#ffip_upfile")[0].files[0]) {
			$("#ffip_upfile").change(); 
		}
	}

	/*
	 * 入力ボタン文字列設定
	 */
	function setInputButtonText() {
		var agent = window.navigator.userAgent.toLowerCase();
		// Chrome
		if (agent.indexOf("chrome") > -1){
			inputButtonText = "ファイルを選択";
			inputFilenameText = "選択されていません";
		}
	}

	/*
	 * スタイル設定
	 */
	function setStyle() {
		var css =
			// ファイル入力全体
			".ffip-input-file{" +
			"  position:relative;" +
			"}" +
			// ファイル入力表示欄
			".ffip-input-file-view{" +
			"  display: flex;" +
			"  padding: 1px 0px;" +
			"  font-size: 13px;" +
			"  white-space: nowrap;" +
			"}" +
			// ファイル入力枠
			".ffip-input-file-container{" +
			"  display: flex;" +
			"  width: 250px;" +
			"}" +
			// ファイル入力ボタン（ダミー）
			".ffip-button{" +
			"  margin-right:6px;" +
			"  padding:1px 9px;" +
			"  border:1px solid #adadad;" +
			"  background-color:#e1e1e1;" +
			"  color:black;" +
			"}" +
			// ファイル入力名
			".ffip-filename{" +
			"  font-size:12px;" +
			"  vertical-align:middle;" +
			"  overflow: hidden;" +
			"  text-overflow: ellipsis;" +
			"}" +
			// ファイルプレビュー
			".ffip-preview{" +
			"  min-width:0px;" +
			"  min-height:0px;" +
			"  max-width:" + previewMaxSize + "px;" +
			"  max-height:" + previewMaxSize + "px;" +
			"}" +
			// ファイル入力本体（透明）
			".ffip-upfile{" +
			"  position:absolute;" +
			"  width:100%;" +
			"  height:100%;" +
			"  left:0;" +
			"  top:0;" +
			"  opacity:0;" +
			"  cursor:pointer;" +
			"}" +
			// クリアボタン
			".ffip-file-clear{" +
			"  display:inline-block;" +
			"  margin-left:5px;" +
			"  font-size:16px;" +
			"  white-space: nowrap;" +
			"  cursor:pointer;" +
			"}" +
			// ファイル情報
			".ffip-file-info{" +
			"  font-size:12px;" +
			"  white-space: nowrap;" +
			"}" +
			// ドロップエリア
			".ffip-droparea{" +
			"  display:inline-block;" +
			"  min-width:250px;" +
			"  max-width:250px;" +
			"  min-height:" + DROP_AREA_SIZE + "px;" +
			"  font-size:12px;" +
			"  text-align:center;" +
			"  line-height:" + DROP_AREA_SIZE + "px;" +
			dropAreaStyle +
			"}";
		GM_addStyle(css);
	}

})(jQuery);
