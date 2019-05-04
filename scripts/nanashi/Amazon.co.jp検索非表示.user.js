// ==UserScript==
// @name         Amazon.co.jp検索非表示
// @namespace    https://www.amazon.co.jp/b/
// @version      1.1.1
// @description  Amazon.co.jpの検索で任意の商品を非表示。コマンド「Kindle注文済みスキャン」で注文済みを非表示にもできます
// @include      https://www.amazon.co.jp/b?*
// @include      https://www.amazon.co.jp/b/*
// @include      https://www.amazon.co.jp/s?*
// @include      https://www.amazon.co.jp/s/*
// @include      https://www.amazon.co.jp/*/b?*
// @include      https://www.amazon.co.jp/*/b/*
// @include      https://www.amazon.co.jp/gp/search/*
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// ==/UserScript==

(() => {
    'use strict';

    // 設定
    const MAX_CROWLS = 4;							// Kindle注文済みスキャン時の最大同時クロール数
    const CROWL_INTERVAL = 1000;					// クロールの最低間隔（ミリ秒）
    const CACHE_TIME = 100 * 24 * 60 * 60 * 1000;	// キャッシュ管理での削除基準（最終参照からミリ秒）
    const SESSION_CACHE_TIME = 1 * 60 * 1000;		// 再スキャン禁止時間（ミリ秒）。個別で設定される
    const POP_TIME = 3000;							// ポップアップの表示時間（ミリ秒）

    // DOM変更の監視対象を取得。なければ終了
    let target = document.getElementById("search-main-wrapper"); // URLのパスが/sの場合
    if(!target) target = document.getElementById("mainResults"); // URLのパスが/bの場合
    if(!target) target = document.getElementById("search"); // 2019年3月頃からのバージョン
    if(!target) return;

    // Undo用の配列。最後に非表示設定したASINを保存する
    let undo_asins = [];

    // スタイルシートを一括追加
    GM_addStyle(
        // ポップアップ用のスタイルシート（Amazon側の命名と被らないようにダサいローマ字命名）
        "#oshirase-outer{" +
        "  position: fixed;" +
        "  top: 16px;" +
        "  left: 16px;" +
        "  padding: 0;" +
        "  border: 0;" +
        "  z-index: 9999;" +
        "}" +
        ".oshirase-pop, .oshirase-pop-large{" +
        "  display: table;" +
        "  color: black;" +
        "  line-height: 1.5em;" +
        "  margin-top: 0.25em;" +
        "  padding: 0.3em;" +
        "  background-color: white;" +
        "  border: 4px solid #090;" +
        "  border-radius: 4px;" +
        "  box-shadow: 0px 0px 4px 2px rgba(0,128,0,0.3);" +
        "}" +
        ".oshirase-pop{" +
        "  font-size: 18px;" +
        "}" +
        ".oshirase-pop-large{" +
        "  font-size: 28px;" +
        "}" +

        // 非表示、次に非表示、KDP疑いのスタイルシート
        ".kakusu{" +
        "  display: none !important;"+
        "}" +
        ".kakusu-temp, kakusu-bought, kakusu-kdp{" +
        "  display:inline-block;" +
        "}" +
        ".kakusu-temp > div, .kakusu-bought > div, .kakusu-kdp > div{" +
        "  border: 1px solid #00f !important;" +
        "  opacity: 0.5;" +
        "}" +
        ".kakusu-temp::before, .kakusu-bought::before, .kakusu-kdp::before{" +
        "  position: absolute;" +
        "  right: 0;" +
        "  top: 0;" +
        "  padding: 0.25em;" +
        "}" +
        ".kakusu-temp::before{" +
        "  content: \"次回から非表示\";" +
        "  color: #fff;" +
        "  background-color: #000;" +
        "}" +
        ".kakusu-bought::before{" +
        "  content: \"注文済み\";" +
        "  color: #fff;" +
        "  background-color: #00f;" +
        "}" +
        ".kakusu-kdp::before{" +
        "  content: \"KDP疑い\";" +
        "  color: #fff;" +
        "  background-color: #00f;" +
        "}" +

        // スポンサープロダクト非表示用のスタイルシート
        ".kakusu-sp{display: none !important;}" +

        // コンフィグ設定用のスタイルシート
        "#config-kakusu-cache, #config-setting{" +
        "  margin-top: 0.25em;" +
        "  padding: 1em;" +
        "  text-align: center;" +
        "  background-color: #efe;" +
        "  border: 4px solid #090;" +
        "  border-radius: 4px;" +
        "  box-shadow: 0px 0px 4px 2px rgba(0,128,0,0.3);" +
        "}" +
        "#config-kakusu-cache-textarea1{" +
        "  width: 100%;" +
        "  height: 256px;" +
        "  display: block;" +
        "}" +
        "#config-kakusu-cache-textarea2{" +
        "  width: 100%;" +
        "  height: 192px;" +
        "  display: block;" +
        "}" +
        "#config-kakusu-cache button{" +
        "  margin: 0.5em;" +
        "  padding: 0.25em;" +
        "}" +

        // 2019年3月頃からのAmazon側のスタイルシートに少し手を加える
        "span[data-component-type$=\"-search-results\"] div[data-asin]," +
        "span[data-component-type$=\"-search-results\"] div[data-asin] > div.sg-col-inner > div{" +
        "  position:relative;" +
        "}"
    );

    // 確認モード時のスタイルシート
    const visible_style =
          ".kakusu, .kakusu-sp{" +
          "  display:inline-block !important;" +
          "}" +
          ".kakusu > div{" +
          "  border: 1px solid #00f !important;" +
          "  opacity: 0.5 !important;" +
          "}";


    ////////////////////////////////
    // Promiseを使ったsleep関数。async関数内でawaitを付けてコールする
    const sleep = (msec) => new Promise(resolve => setTimeout(resolve, msec));

    ////////////////////////////////
    // 要素の削除
    const removeElement = (e) => {
        if(e && e.parentNode) e.parentNode.removeChild(e);
    };

    ////////////////////////////////
    // ページ内から検索結果のリストを取得
    const getLIST = () => document.querySelectorAll('li[data-asin], span[data-component-type$="-search-results"] div[data-asin]');

    ////////////////////////////////
    // 非表示キャッシュ（localStorageを使用）
    const setHideCcahe = (asin) => localStorage.setItem("NGASIN" + asin, String(Date.now()));
    const getHideCcahe = (asin) => Number(localStorage.getItem("NGASIN" + asin));
    const removeHideCcahe = (asin) => localStorage.removeItem("NGASIN" + asin);
    const clearHideCcahe = () => {
        const rx = /^NGASIN[0-9A-Za-z]{10}$/;
        for(const key in localStorage){
            if(rx.test(key)){
                localStorage.removeItem(key);
            }
        }
    };

    ////////////////////////////////
    // localStorageに保存したキャッシュの中から有効期限が切れたものを削除
    const expirationLocalCache = () => {
        const deadline = Date.now() - CACHE_TIME;
        let cache_count = 0;
        let remove_count = 0;
        for(const key in localStorage){
            if(/^NGASIN[0-9A-Za-z]{10}$/.test(key)){
                cache_count++;
                if(Number(localStorage.getItem(key)) <= deadline){
                    localStorage.removeItem(key);
                    remove_count++;
                }
            }
        }
        return [cache_count, remove_count]; // キャッシュ数(削除前)と削除数を返す
    };

    ////////////////////////////////
    // スキャン済みキャッシュ（sessionStorageなのでブラウザのタブを閉じると消える。また他のタブと共有もされない）
    const setScannedCache = (asin) => sessionStorage.setItem("SCANNED" + asin, String(Date.now()));
    const getScannedCache = (asin) => Number(sessionStorage.getItem("SCANNED" + asin));
    const removeScannedCache = (asin) => sessionStorage.removeItem("SCANNED" + asin);
    const clearScannedCache = () => {
        for(const key in sessionStorage) {
            if(/^SCANNED[0-9A-Za-z]{10}$/.test(key)){
                sessionStorage.removeItem(key);
            }
        }
    };

    ////////////////////////////////
    // sessionStorageに保存したキャッシュの中から有効期限が切れたものを削除
    const expirationSessionCache = () => {
        const deadline = Date.now() - SESSION_CACHE_TIME;
        for(const key in sessionStorage){
            if(/^SCANNED[0-9A-Za-z]{10}$/.test(key) && Number(sessionStorage.getItem(key)) <= deadline){
                sessionStorage.removeItem(key);
            }
        }
    };

    ////////////////////////////////
    // ポップアップ用の要素作成
    const createPopupElement = (class_name, default_text) => {
        let outer = document.getElementById("oshirase-outer");
        // outer部分がなければ作成
        if(!outer){
            outer = document.createElement('div');
            outer.setAttribute("id", "oshirase-outer");
            document.getElementsByTagName('body')[0].appendChild(outer);
        }
        const e = document.createElement('div');
        if(class_name) e.classList.add(class_name);
        if(default_text) e.textContent = default_text;
        outer.appendChild(e);
        return e;
    };

    ////////////////////////////////
    // 要素をフェードアウトさせながら削除
    const fadeoutElement = (e) => {
        if(!e) return;
        setTimeout(async ()=>{
            for(let i = 15; i > 0; --i){
                e.style.opacity = (i/16.0).toFixed(5);
                e.style.transform = "scaleY(" + (i/16.0).toFixed(5) + ")";
                await sleep(10);
            }
            removeElement(e);
        }, POP_TIME);
    };

    ////////////////////////////////
    // 上のcreatePopupElementとfadeoutElementで簡易ポップアップ表示
    const popup = (text, large) => fadeoutElement(createPopupElement(large?"oshirase-pop-large":"oshirase-pop", text));

    ////////////////////////////////
    // キャッシュデータに基づいてNG ASINを非表示（MutationObserver対応）
    const hideNGASIN = (records) => {
        let li_list = [];
        // 引数recordsが有効ならMutationObserverで呼び出された
        if(records){
            for(const record of records){
                for(const node of record.addedNodes){
                    if(node.getAttribute("data-asin")){
                        li_list.push(node)
                    }else if(node.querySelectorAll){
                        li_list = li_list.concat(Array.from(node.querySelectorAll('li[data-asin],data[data-asin]')));
                    }
                }
            }
        }else{
            li_list = getLIST(); // ページ内からリストを取得
        }

        // 0個なら終了
        if(li_list.length == 0){
            return;
        }

        // 「非表示設定」の部分。これのクローンを作って使う
        const anode = document.createElement('a');
        anode.classList.add("a-size-small");
        anode.setAttribute("href", "javascript:void(0);");
        anode.setAttribute("kakusu", "config");
        anode.textContent = "非表示設定";
        anode.style = "position:absolute;right:0;bottom:0;";

        // スポンサープロダクト非表示フラグ
        const b_sponcer_product_hide = !localStorage.getItem("SPONSOR_PRODUCT_VISIBLE");

        // メインループ
        let hide_count = 0;
        let sp_count = 0;
        for(const li of li_list) {
            const asin = li.getAttribute("data-asin");
            if(getHideCcahe(asin)){
                setHideCcahe(asin);
                li.classList.add("kakusu");
                hide_count++;
            }else if(b_sponcer_product_hide && li.querySelector('h5[class*="sponsored"],div[data-component-type*="sponsored"]')){
                // スポンサープロダクトの非表示
                li.classList.add("kakusu-sp");
                hide_count++;
                sp_count++;
            }else{
                li.classList.remove("kakusu");
                li.classList.remove("kakusu-sp");
            }
            li.classList.remove("kakusu-temp");
            li.classList.remove("kakusu-bought");
            li.classList.remove("kakusu-kdp");

            // 「非表示設定」を追加する
            const tnode = li.querySelector('div.s-item-container > div:last-child, div.sg-col-inner > div.s-include-content-margin, div.sg-col-inner div.a-section');
            if(tnode && !tnode.querySelector('a[kakusu="config"]')){
                tnode.appendChild(anode.cloneNode(true));
                // cloneNodeではイベント処理まではコピーされないのでここでクリック時のイベント処理を追加するつもりだった。
                // しかし、Amazon側でもcloneNodeを使っており、イベント処理が消えてしまう場合があるのを確認。
                // 別のやり方でクリック時のイベント処理することにした。
            }
        }

        // 一つでも非表示があればポップアップを表示
        if(hide_count > 0){
            let result_str = hide_count + "件非表示";
            if(sp_count > 0) result_str += "(スポンサープロダクト" + sp_count + "件)";
            popup(result_str);
        }
    };

    ////////////////////////////////
    // クリック時のイベント処理（「非表示設定」をクリックした際の処理）
    document.addEventListener("click", ((event) => {
        // 「非表示設定」をクリックしたか判定
        const e = event.target;
        if(e.getAttribute("kakusu") != "config") return true;

        // 親要素を巡っていき、最初に見つけたdata-asinのASINを使う
        let li = e.parentNode;
        let asin = null;
        while(li){
            asin = li.getAttribute("data-asin");
            if(asin) break;
            li = li.parentNode;
        }
        if(!asin) return true;

        // 表示/非表示を切り替える
        if(!getHideCcahe(asin)){
            setHideCcahe(asin); // キャッシュ更新（最終参照時刻を更新）
            li.classList.add("kakusu-temp"); // すぐ消さずに仮置き状態
            undo_asins = [asin]; // undo用データ
        } else {
            removeHideCcahe(asin);
            li.classList.remove("kakusu");
            li.classList.remove("kakusu-temp");
            li.classList.remove("kakusu-bought");
            li.classList.remove("kakusu-kdp");
            li.classList.remove("kakusu-sp");
            undo_asins = []; // undo用データをクリア
        }
        event.preventDefault(); // ページ遷移無効
        return false;
    }), false);

    ////////////////////////////////
    // 表示中の商品を全て非表示設定する
    const hideAll = () => {
        let hide_asins = [];
        for(const li of getLIST()) {
            const asin = li.getAttribute("data-asin");
            if(!getHideCcahe(asin)){
                setHideCcahe(asin); // 非表示キャッシュに追加
                li.classList.add("kakusu-temp");
                hide_asins.push(asin);
            }
        }
        undo_asins = hide_asins; // undo用データ
        popup(hide_asins.length + "件が次回から非表示"); // ポップ表示
    };

    ////////////////////////////////
    // スキャンして購入済みASINをキャッシュに保存
    const scanBought = async () => {
        // 検索結果のリストを取得
        const li_list = getLIST();
        if(li_list.length == 0){
            popup("検索結果がありません", true);
            return;
        }

        // スキャン済みキャッシュの中から期限切れのものを削除（sessionStorageなので消えてることが多い）
        expirationSessionCache();

        // KDP疑いを含めるか？のフラグ
        const b_perhaps_kdp_hide = !!localStorage.getItem("PERHAPSKDP_HIDE");

        // クロールリスト作成
        let crawl_asins = [];
        let skip_count = 0;
        for(const li of li_list) {
            const asin = li.getAttribute("data-asin");
            if(getHideCcahe(asin)){
                setHideCcahe(asin); // キャッシュ更新（最終参照時刻を更新）
            }else if(getScannedCache(asin)){
                skip_count++;
            }else if(window.getComputedStyle(li).display == "none"){
                // すでに非表示（他のスクリプトで消された可能性）
            }else{
                crawl_asins.push(asin); // クロール対象
            }
        }

        const prog = createPopupElement("oshirase-pop-large", "-"); // 進捗をポップアップでお知らせする部分
        let bought_asins = [];
        let kdp_asins = [];
        let scanned_asins = [];
        let last_crawl_time = 0;
        while(1){
            // 残り0個になったら終了
            const remain = crawl_asins.length;
            if(remain <= 0) break;
            prog.textContent = crawl_asins[0] + "あたりをスキャン中(残り" + remain + ")";

            // 前回との間隔がCROWL_INTERVALより短い場合はスリープする
            let now_time = Date.now();
            const sleep_time = last_crawl_time + CROWL_INTERVAL - now_time;
            if(sleep_time > 0){
                await sleep(sleep_time);
                now_time = Date.now();
            }
            last_crawl_time = now_time;

            // crawl_asinsからASINをMAX_CROWLS個取り出しクロール
            let task_list = [];
            for(let i = 0; i < MAX_CROWLS && crawl_asins.length > 0; i++){
                const asin = crawl_asins.shift();
                task_list.push(
                    fetch("https://www.amazon.co.jp/dp/" + asin, {
                        credentials: "include",
                        referrerPolicy: "no-referrer"
                    }).then((response) => {
                        if(!response.ok) throw Error(response.statusText);
                        return response.text();
                    }).then((text) => {
                        const offset = text.indexOf('id="ebooksInstantOrderUpdate_feature_div"') + 1; // Kindle本のページか判定
                        if(offset > 0){
                            if(text.indexOf('id="ebooksInstantOrderUpdate"', offset) > offset){
                                setHideCcahe(asin); // 非表示キャッシュに追加
                                bought_asins.push(asin);
                            }else if(b_perhaps_kdp_hide && !(/[>\r\n]出版社:[<\r\n]/.test(text))){
                                setHideCcahe(asin); // 非表示キャッシュに追加
                                kdp_asins.push(asin);
                            }else{
                                setScannedCache(asin); // スキャン済みキャッシュに追加
                                scanned_asins.push(asin);
                            }
                        }else{ // Kindle本以外（[まとめ買い]も含まれる。[まとめ買い]は新刊が追加される可能性があるので自動で非表示にしない）
                            setScannedCache(asin); // スキャン済みキャッシュに追加
                            scanned_asins.push(asin);
                        }
                    }).catch((error) => {
                        console.error(error);
                    })
                )
            }
            // awaitで待つ
            await Promise.all(task_list);
        }
        let result_str = "スキャン終了<br>" + (bought_asins.length + kdp_asins.length) + "件をキャッシュに追加";
        if(b_perhaps_kdp_hide) result_str += "(うち" + kdp_asins.length + "件がKDP疑い)";
        if(skip_count > 0) result_str += "<br>" + skip_count + "件はスキャンしたばかりなのでスキップ";
        undo_asins = bought_asins.concat(kdp_asins, scanned_asins); // undo用データ
        prog.innerHTML = result_str;

        // 非表示処理をする
        for(const li of getLIST()){
            const asin = li.getAttribute("data-asin");
            if(bought_asins.includes(asin)){
                li.classList.add("kakusu-bought");
            }else if(kdp_asins.includes(asin)){
                li.classList.add("kakusu-kdp");
            }
        }
        fadeoutElement(prog); // 進捗のポップアップをフェードアウトしながら削除
    };

    ////////////////////////////////
    // スキャンや全部非表示をUndo（取り消し）
    const undo = () => {
        let pop_text = "";
        if(undo_asins.length <= 0){
            pop_text = "Undo情報なし";
        }else{
            // キャッシュから削除
            for(const asin of undo_asins){
                removeHideCcahe(asin);
                removeScannedCache(asin);
            }
            // 非表示を復活
            const li_list = getLIST();
            if(li_list.length == 0) return;
            for(const li of li_list) {
                const asin = li.getAttribute("data-asin");
                if(asin && undo_asins.includes(asin)){
                    li.classList.remove("kakusu");
                    li.classList.remove("kakusu-temp");
                    li.classList.remove("kakusu-bought");
                    li.classList.remove("kakusu-kdp");
                }
            }

            pop_text = "Undo終了(" + undo_asins.length + "件を復帰)";
            undo_asins = [];
        }

        // ポップ表示
        popup(pop_text);
    };

    ////////////////////////////////
    // 非表示/確認。トグル動作
    const displayHide = () => {
        const e = document.getElementById("kakusu-visible");
        let pop_text = "";
        if(!e){
            // スタイルシートを追加してこちらを優先させる
            const head = document.getElementsByTagName("head")[0];
            if(!head) return;
            pop_text = "確認モード";
            const style = document.createElement("style");
            style.setAttribute("id", "kakusu-visible");
            style.setAttribute("type", "text/css");
            style.innerHTML = visible_style;
            head.appendChild(style);
        }else{
            // スタイルシートを削除してデフォルトに戻す
            removeElement(e);
            pop_text = "非表示モード";
            // kakusu-temp、kakusu-bought、kakusu-kdpなどの仮置きをkakusuにする
            const btemps = Array.from(document.getElementsByClassName("kakusu-temp"))
            .concat(Array.from(document.getElementsByClassName("kakusu-bought")))
            .concat(Array.from(document.getElementsByClassName("kakusu-kdp")));
            for(const btemp of btemps){
                btemp.classList.add("kakusu");
                btemp.classList.remove("kakusu-temp");
                btemp.classList.remove("kakusu-bought");
                btemp.classList.remove("kakusu-kdp");
            }
        }
        // ポップ表示
        popup(pop_text, true);
    };

    ////////////////////////////////
    // 追加設定（スキャンにKDP疑い追加。スポンサープロダクトの非表示）
    const configSetting = () => {
        let config = document.getElementById("config-setting");
        if(config) return; // すでに表示されいてる

        // 要素作成
        config = document.createElement("div");
        config.id = "config-setting";
        // キャプション部分
        const caption1 = document.createElement('span');
        const caption2 = document.createElement('span');
        const caption3 = document.createElement('span');
        caption1.innerHTML = "スポンサープロダクトを<br/>";
        caption2.innerHTML = "<br/><br/>Kindle注文済みスキャンにKDP疑いを<br/>";
        caption3.innerHTML = "<br/>※青空文庫などをKDP疑いと誤判定するので注意<br/><br/>";
        // ON/OFFボタン
        const button_sp_on = document.createElement("button");
        const button_sp_off = document.createElement("button");
        button_sp_on.type = "button";
        button_sp_off.type = "button";
        button_sp_on.id = "config-setting-sp-on";
        button_sp_off.id = "config-setting-sp-off";
        button_sp_on.textContent = "非表示にする";
        button_sp_off.textContent = "表示する";
        const button_kdp_on = document.createElement("button");
        const button_kdp_off = document.createElement("button");
        button_kdp_on.type = "button";
        button_kdp_off.type = "button";
        button_kdp_on.id = "config-setting-kdp-on";
        button_kdp_off.id = "config-setting-kdp-off";
        button_kdp_on.textContent = "含める";
        button_kdp_off.textContent = "含めない";
        // 閉じるボタン
        const button_close = document.createElement("button");
        button_close.type = "button";
        button_close.textContent = "閉じる";

        // ローカルストレージに保存したフラグからボタンのdisbaled
        if(!!localStorage.getItem("SPONSOR_PRODUCT_VISIBLE")){
            button_sp_off.disabled = true;
        }else{
            button_sp_on.disabled = true;
        }
        if(!!localStorage.getItem("PERHAPSKDP_HIDE")){
            button_kdp_on.disabled = true;
        }else{
            button_kdp_off.disabled = true;
        }

        // ボタンの関数
        button_sp_on.addEventListener('click', (event) => {
            localStorage.removeItem("SPONSOR_PRODUCT_VISIBLE");
            const button_on = document.getElementById("config-setting-sp-on");
            const button_off = document.getElementById("config-setting-sp-off");
            if(button_on) button_on.disabled = true;
            if(button_off) button_off.disabled = false;
        });
        button_sp_off.addEventListener('click', (event) => {
            localStorage.setItem("SPONSOR_PRODUCT_VISIBLE", "1");
            const button_on = document.getElementById("config-setting-sp-on");
            const button_off = document.getElementById("config-setting-sp-off");
            if(button_on) button_on.disabled = false;
            if(button_off) button_off.disabled = true;
        });
        button_kdp_on.addEventListener('click', (event) => {
            localStorage.setItem("PERHAPSKDP_HIDE", "1");
            const button_on = document.getElementById("config-setting-kdp-on");
            const button_off = document.getElementById("config-setting-kdp-off");
            if(button_on) button_on.disabled = true;
            if(button_off) button_off.disabled = false;
        });
        button_kdp_off.addEventListener('click', (event) => {
            localStorage.removeItem("PERHAPSKDP_HIDE");
            const button_on = document.getElementById("config-setting-kdp-on");
            const button_off = document.getElementById("config-setting-kdp-off");
            if(button_on) button_on.disabled = false;
            if(button_off) button_off.disabled = true;
        });

        // 閉じるボタンの関数（ダイアログを閉じる）
        button_close.addEventListener('click', (event) => {
            removeElement(document.getElementById("config-setting"));
        });

        // 作成した要素を追加していく
        config.appendChild(caption1);
        config.appendChild(button_sp_on);
        config.appendChild(button_sp_off);
        config.appendChild(caption2);
        config.appendChild(button_kdp_on);
        config.appendChild(button_kdp_off);
        config.appendChild(caption3);
        config.appendChild(button_close);

        // #oshirase-outerに追加
        let outer = document.getElementById("oshirase-outer");
        if(!outer){ // なければ作成
            outer = document.createElement('div');
            outer.setAttribute("id", "oshirase-outer");
            document.getElementsByTagName('body')[0].appendChild(outer);
        }
        outer.appendChild(config);
    };

    ////////////////////////////////
    // キャッシュ管理
    const configHideCcahe = () => {
        let config = document.getElementById("config-kakusu-cache");
        if(config) return; // すでに表示されいてる

        // 要素作成
        config = document.createElement("div");
        config.id = "config-kakusu-cache";
        // キャプション部分
        const caption1 = document.createElement('span');
        const caption2 = document.createElement('span');
        caption1.textContent = "非表示中のASIN一覧（コピペで手動エクスポート）";
        caption2.textContent = "追加するASIN（インポートの代わり）";
        // テキストエリア
        const texta1 = document.createElement('textarea');
        const texta2 = document.createElement('textarea');
        texta1.id = "config-kakusu-cache-textarea1";
        texta2.id = "config-kakusu-cache-textarea2";
        // 追加ボタン
        const button_add = document.createElement("button");
        button_add.type = "button";
        button_add.textContent = "追加";
        // 古いキャッシュ削除ボタン
        const button_expiration = document.createElement("button");
        let deadline_str = "";
        if(CACHE_TIME >= 365*24*60*60*1000){
            deadline_str = "約" + (CACHE_TIME/(365*24*60*60*1000.0)).toFixed(1) + "年";
        }else if(CACHE_TIME >= 24*60*60*1000){
            deadline_str = (CACHE_TIME/(24*60*60*1000.0)).toFixed(1) + "日";
        }else if(CACHE_TIME >= 60*60*1000){
            deadline_str = (CACHE_TIME/(60*60*1000.0)).toFixed(1) + "時間";
        }else{
            deadline_str = (CACHE_TIME/(60*1000.0)).toFixed(1) + "分";
        }
        button_expiration.textContent = deadline_str + "以上参照のないものを削除";
        // 閉じるボタン
        const button_close = document.createElement("button");
        button_close.type = "button";
        button_close.textContent = "閉じる";

        // キャッシュのキーからASINを抽出してテキストエリアに列挙
        let str_asins = "";
        const slice_begin = "NGASIN".length; // 接頭文字の長さ
        for(const key in localStorage){
            if(/^NGASIN[0-9A-Za-z]{10}$/.test(key)){
                str_asins += key.slice(slice_begin) + "\n";
            }
        }
        texta1.value = str_asins;
        texta1.readOnly = true;

        // 追加ボタンの関数（テキストエリアのASINをキャッシュに追加）
        button_add.addEventListener('click', (event) => {
            const config = document.getElementById("config-kakusu-cache");
            const texta2 = document.getElementById("config-kakusu-cache-textarea2");
            if(!config || !texta2){
                removeElement(texta2);
                removeElement(config);
                return;
            }
            let add_count = 0;
            for(const asin of texta2.value.split(/\s+/)){
                if(/^[0-9A-Za-z]{10}$/.test(asin)){
                    setHideCcahe(asin);
                    add_count++;
                }
            }
            removeElement(texta2);
            removeElement(config);

            // ポップ表示
            popup(add_count + "件追加（もしくはタイムスタンプを更新）しました", true);
        });
        // 古いキャッシュ削除ボタンの関数
        button_expiration.addEventListener('click', (event) => {
            const config = document.getElementById("config-kakusu-cache");
            if(!config) return;
            const result = expirationLocalCache();
            removeElement(config);

            // ポップ表示
            popup(result[0] + "件のキャッシュのうち" + result[1] + "件を削除", true);
        });
        // 閉じるボタンの関数（ダイアログを閉じる）
        button_close.addEventListener('click', (event) => {
            removeElement(document.getElementById("config-kakusu-cache"));
        });

        // 作成した要素を追加していく
        config.appendChild(caption1);
        config.appendChild(texta1);
        config.appendChild(caption2);
        config.appendChild(texta2);
        config.appendChild(button_add);
        config.appendChild(button_expiration);
        config.appendChild(button_close);
        // #oshirase-outerに追加
        let outer = document.getElementById("oshirase-outer");
        if(!outer){ // なければ作成
            outer = document.createElement('div');
            outer.setAttribute("id", "oshirase-outer");
            document.getElementsByTagName('body')[0].appendChild(outer);
        }
        outer.appendChild(config);
    };

    ////////////////////////////////
    // ローカルストレージのキャッシュを全表示（デバッグ用）
    const viewLS = () => {
        const lag2str = (t) => {
            if(t<0) return "未来";
            const col = (t >= CACHE_TIME) ? '<span style="color:red">' : '<span>';
            t = Math.floor(t / 1000);
            const sec = t % 60;
            t = Math.floor(t / 60);
            const min = t % 60;
            t = Math.floor(t / 60);
            const hour = t % 24;
            t = Math.floor(t / 24);
            const day = t;
            return col +
                (day>0?day+"日":"") +
                (hour>0?hour+"時間":"") +
                (min>0?min+"分":"") +
                (sec>0?sec+"秒":"") +
                "前</span>";
        }
        let items = [];
        const slice_begin = "NGASIN".length;
        for(const key in localStorage){
            if(/^NGASIN[0-9A-Za-z]{10}$/.test(key)){
                const asin = key.slice(slice_begin);
                items.push({"asin": asin, "time_stamp": Number(localStorage.getItem(key))});
            }
        }
        items.sort((a,b)=>{
            if(a.time_stamp > b.time_stamp) return 1;
            if(a.time_stamp < b.time_stamp) return -1;
            if(a.asin > b.asin) return 1;
            if(a.asin < b.asin) return -1;
            return 0;
        });
        let str = Object.keys(items).length + "件<br/>";
        const now_time = Date.now();
        for(const item of items){
            str += item.asin + " : " + item.time_stamp + "（" + lag2str(now_time-item.time_stamp) + "）<a target=\"_blank\" href=\"https://www.amazon.co.jp/dp/" + item.asin + "\">link</a><br/>";
        }
        document.getElementsByTagName("body")[0].innerHTML = str;
    };

    // メニューコマンドに登録
    GM_registerMenuCommand("非表示/確認", displayHide);
    GM_registerMenuCommand("Kindle注文済みスキャン", scanBought);
    GM_registerMenuCommand("全部非表示", hideAll);
    GM_registerMenuCommand("Undo", undo);
    GM_registerMenuCommand("追加設定", configSetting);
    GM_registerMenuCommand("NGASIN管理", configHideCcahe);
    //GM_registerMenuCommand("NGASIN一覧表示", viewLS);
    //GM_registerMenuCommand("注文済みキャッシュ消去", clearHideCcahe);
    //GM_registerMenuCommand("スキャン済みキャッシュ消去", clearScannedCache);

    // DOM監視開始
    (new MutationObserver(hideNGASIN)).observe(target, {childList:true, subtree:true});

    // 非表示処理
    hideNGASIN(null);
})();