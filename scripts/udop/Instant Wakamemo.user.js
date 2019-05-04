// ==UserScript==
// @name         Instant Wakamemo
// @namespace    http://mobajinro.s178.xrea.com/wakamemo/
// @version      0.41
// @description  わかめて上で動作するわかめてメモのようなものです。
// @author       udop_
// @match        http://jinrou.dip.jp/~jinrou/cgi_jinro.cgi
// @match        http://61.215.66.131/~jinrou/cgi_jinro.cgi
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function($) {
    'use strict';

    //**********************************************
    // 個人設定
    //**********************************************

    //よくわからない人はいじらないほうがよいです。

    var REWRITE_CSS = true;
    //falseにすると、見た目を変更しない

    var ALLTIME_IMPORT_LOG = false;
    //trueにすると更新するたびにログを取得する。
    //取得漏れがなくなるが、動作が重たくなる恐れがある。

    var ONETIME_IMPORT_LOG = true;
    //投票時間にその日のログがない場合、一回だけログを自動で取得する。試験運用

    var ALERT_VOTE = true;
    //trueにすると未投票時に警告が出る。うざい。

    var IS_SUBMIT = {
        ctrl: true,
        shift: false
    };
    //trueにすると、そのキー+Enterで発言をする。ctrl+Enterとか。
    //便利だけど誤爆に注意。

    var IS_DISP_SUGGEST = true;
    //trueにすると、アイコン色とか追加アイコン変更の補助を表示する。

    var COLORLIST = {
        0:"選択▼",
        1:"明灰", 2:"暗灰", 3:"黄色", 4:"オレンジ", 5:"赤",
        6:"水色", 7:"青", 8:"黄緑", 9:"紫", 10:"桃色",
        11:"肌色", 12:"茶色", 13:"緑", 14:"若草色", 15:"真紅",
        16:"薄茶色", 17:"藍色", 18:"蒼", 19:"ピンク", 20:"銀色",
        21:"薄紫",22:"象牙色", 23:"黒"
    };
    // アイコン色リスト。変更する必要は特にない。

    var ICONLIST = {
        0:"選択▼",
        //消さないこと

        3123: "島村卯月",
        3184: "渋谷凛",
        3239: "本田未央",

        // 番号: "何のアイコン",
        // の形で追加していく。コンマを忘れずに

        5211: "武内P",

        // ../../imgbbs/img/ は、なくても自動で補完される。

        "/../../imgbbs/img/5545": "美城常務",

        // つけて登録してもよいが、""でくくるのを忘れないこと。
        // 見にくく間違えやすいため非推奨。
    };

    var HIGHLIGHT_DEATHNOTE = true;

    //**********************************************
    // 個人設定ここまで
    //**********************************************



    //**********************************************
    //  Session関係
    //**********************************************
    function getSession(keyname,def){
        if (sessionStorage.getItem(keyname)){
            var item = sessionStorage.getItem(keyname);
            item = JSON.parse(item);
            return item;
        } else {
            return def;
        }
    }

    function setSession(keyname, val){
        if(val){
            var j = JSON.stringify(val);
            sessionStorage.setItem(keyname, j);
        } else {
            sessionStorage.removeItem(keyname);
        }
    }

    //**********************************************
    //   プレイヤー関係
    //**********************************************

    var playerIndexForName = function(name){ //名前→通し番号
        var index = {};
        playerInfo.map(player => player.name).forEach( (name,i) => {index[name] = i;} );
        return name in index ? index[name] : null;
    };

    function updateplayerInfo(){ //プレイヤー情報を取得
        var playerInfoTmp = [];
        var name,vital,job,jobresult,vote,tmp,html,death,cnt=0;
        $("table").eq(1).find("td:odd").each(function(i,v){
            html = $(v).html();

            if (!html) return false;

            name = /(.+?)<br>/.exec(html)[1];
            vital = html.indexOf("生存中") > 0 ? "alive" : "death";
            if(playerInfo[i]){
                job = playerInfo[i].job;
                jobresult = playerInfo[i].jobresult.concat();
                vote = playerInfo[i].vote.concat();
                death = playerInfo[i].death;
            } else {
                job = "gray";
                jobresult = [];
                vote = [];
                death = 99;
            }
            //deathは死んだ日ではなく「能力がCOできなくなった日」を指す
            //たとえば3日目吊りなら4日目。3日目噛まれなら3日目
            playerInfoTmp.push({
                no:i,
                name: name,
                vital: vital,
                job: job,
                jobresult: jobresult,
                vote: vote,
                death: death
            });
        });
        playerInfo = playerInfoTmp;
        setSession("playerInfo",playerInfo);
    }

    function getGrayList(){ //灰リスト生成
        var notgray = playerInfo.filter(player => player.job != "gray").map(player => player.no);

        playerInfo.filter(player => player.job == "fortune").forEach(function(player,i){
            player.jobresult.forEach(function(jobresult){
                if (jobresult) notgray.push(jobresult.target);
            });
        });
        var gray = playerInfo.map(player => player.no).filter(no => notgray.indexOf(no) < 0);
        return gray;
    }

    function getPlayerList(){ //役職結果入力セレクトボックス用のリストを返す
        var l = {99:""};
        playerInfo.forEach( (player,i) => {l[i] = player.name;} );
        return l;
    }

    function savePlayersInput(){ //占いとかの入力を保存する 仕様変更により全部走査する必要ないわ
        var i,id,no,day;

        for(i=0; i<playerInfo.length; i++){
            if($("#player"+i+"job").length) playerInfo[i].job = $("#player"+i+"job").val();
        }

        $(".jobResult").each(function(i,v){
            id = $(v).attr("id").split("_");
            no = id[1] - 0;
            day = id[2] - 0;
            if(! playerInfo[no].jobresult[day]) playerInfo[no].jobresult[day] = {};
            if($(v).hasClass("target")){
                playerInfo[no].jobresult[day].target = $(v).val() -0;
            }
            if($(v).hasClass("judge")){
                playerInfo[no].jobresult[day].judge = $(v).val();
            }
        });

        refreshPlayerInfoTable();
        setSession("playerInfo",playerInfo);
    }

    function refreshPlayerInfoTable(){ //プレイヤー情報更新 くっそ長い

        //初期化
        playerInfoTable.empty();

        if(! playerInfo.length) return false;

        var td,tds,a,cl,select="";
        var graylist = getGrayList();
        var playersList = getPlayerList();
        var joblist = {"gray":"", "fortune":"占い師", "necro":"霊能者", "share":"共有者", "guard":"狩人", "cat":"猫又", "beast":"人外"};
        var playerInfoDisp = []; //生存者のみの場合は絞り込む
        if(isfilter){
            playerInfoDisp = playerInfo.filter(function(player){ return (player.vital == "alive" || player.job != "gray"); });
        } else {
            playerInfoDisp = playerInfo;
        }

        //名前列
        var namerow = $("<tr></tr>", {id:"namerow"} );
        tds = "<td class='alive' style='min-width:50px;'><a id='filterlink_99_99'>全ログ</a></td>";

        playerInfoDisp.forEach(function(player,i){
            if (player.vital == "death") cl = "death";
            else if(graylist.indexOf(player.no) >= 0) cl = "gray";
            else  cl = "notgray";

            tds += `<td class='${cl} player_${player.no}'><a id='filterlink_${player.no}_99'>${player.name}</a></td>`;
        });
        namerow.append(tds).appendTo(playerInfoTable);

        //発言数列
        for(var day=1; day<=newestDay; day++){

            var row = $("<tr></tr>");
            tds = `<td><a id=filterlink_99_${day}>${day+1}日目</a></td>`;

            playerInfoDisp.forEach(function(player,i){
                var talknum = $("#log_day"+day).find(".talk_player"+player.no).length;
                if (talknum === 0) talknum = "";
                tds += `<td class="player_${player.no}"><a id=filterlink_${player.no}_${day}>${talknum}</a></td>`;
            });
            row.append(tds).appendTo(playerInfoTable);
        }

        //役職列
        var jobrow = $("<tr></tr>");
        td = "<td>役職</td>";
        jobrow.append(td);

        playerInfoDisp.forEach(function(player,i){
            td = $("<td></td>",{"class":"player_"+player.no});
            select = createSelectBox(joblist,player.job,"player"+player.no+"job");
            td.append(select).appendTo(jobrow);
        });
        jobrow.appendTo(playerInfoTable);


        //役職結果列 なんとかせねばな…
        var start　=　0;
        if (inputMode == "none") start = newestDay+1;
        else if (inputMode == "simple") start = newestDay;
        if (start === 0) start = 1;

        for(day=start; day<=newestDay; day++){
            var selectDefault;
            var resultrow = $("<tr></tr>");
            td = `<td>占霊結果 ${day+1}日目</td>`;
            resultrow.append(td);

            playerInfoDisp.forEach(function(player,i){
                td = $("<td></td>");
                if ( (player.job == "fortune" && day < player.death ) || (player.job == "necro" && day < player.death && day > 1) ){ //占い師、霊能者で、結果があるなら
                    if (player.jobresult[day]) { //既に結果が入力されているとき
                        selectDefault = player.jobresult[day].target;
                    } else if(player.job == "necro" && deathlog[day-1] !== undefined && deathlog[day-1].exec !== undefined){ //霊能者で死体情報があるとき
                        selectDefault = deathlog[day-1].exec;
                    } else {
                        selectDefault = 99;
                    }
                    select = createSelectBox(playersList,selectDefault,"target_"+player.no+"_"+day,"jobResult target");
                    td.append(select);

                    if (player.jobresult[day]) {
                        selectDefault = player.jobresult[day].judge;
                    } else {
                        selectDefault = "notinput";
                    }
                    select = createSelectBox({notinput:"",white:"○",black:"●"},selectDefault,"result_"+player.no+"_"+day,"jobResult judge");
                    td.append(select);
                }
                resultrow.append(td);
            });
            playerInfoTable.append(resultrow);
        }

        //絞込機能つける
        $("#playerInfoTable a").on("click",function(e){
            //絞込リンクにはfilterlog_<userid>_<day>の形でidがついている
            var id = $(this).attr("id").split("_");
            filterlog( id[1],id[2] );
        });

        //変更は逐一反映
        $("#playerInfoTable select").on("change",function(e){
            savePlayersInput();
        });
    }

    //**********************************************
    //   ログ関係
    //**********************************************

    function refreshDiscussLogTable(){//ログを再表示
        discussLogTable.empty();
        if (! discussLog.length) return false;

        var tbody,tr,td,trs,cl;

        discussLog.forEach(function(logs,day){

            if(!logs) return;

            tbody = $("<tbody></tbody>",{id:"log_day"+day});
            trs = `<tr class="systemlog"><td colspan="2">${day+1}日目</td></tr>`;

            for (var log of logs){
                var no = playerIndexForName(log.name);
                cl = (no !== null) ? "talk_player"+no : "";
                trs += `<tr class="${cl}"><td>◆${log.name}</td><td>${log.content}</td></tr>`;
            }
            tbody.append(trs).prependTo(discussLogTable);
        });
    }

    function importDiscussLog(){//ログ取り込み
        var newestDay = getNewestDay();
        var isday = document.body.bgColor != "#000000";
        var day = checkDay();
        var name;
        var table = $("table[cellpadding='0']").not(".CLSTABLE2").last();
        if(isday){
            var importLogs = [];
            table.find("tr").each(function(i,v){
                if ($(v).children().length != 2) return true;
                importLogs.push({
                    name: $(v).children().eq(0).find("b").eq(0).html(),
                    content: $(v).children().eq(1).html()
                });
            });
            discussLog[day] = importLogs;
        }

        //投票結果・死亡ログ
        var votelog = [];
        table.find("td[colspan='2']").each(function(i,v){
            if(/(無残な姿で発見|死体で発見|村民協議の結果処刑|突然死)/.test($(v).text())){
                recordDeath(v);
            }
            if(/\d{1,2}日目 投票結果。/.test($(v).text())){
                votelog.push(v);
            }
        });
        if(votelog.length) importVote(votelog);

        filterlog( 99,newestDay );
        setSession("playerInfo",playerInfo);
        setSession("discussLog",discussLog);
    }

    function filterlog(player,day){//絞込。プレイヤー側は数が多いのでクラスで対処。日付は力技

        discussLogTable.removeClass();
        if(player < 99) {
            discussLogTable.addClass("show_player"+player);
        }
        if(day<99) {
            $("#discussLogTable tbody").hide();
            $("#log_day"+day).show();
        } else {
            $("#discussLogTable tbody").show();
        }
    }

    //*********************************************
    //  投票・死体
    //*********************************************
    function addDeath(day,name,reason){
        if (!deathlog[day][reason]){
            deathlog[day][reason] = [];
        }
        if(deathlog[day][reason].indexOf(name) <0){
            deathlog[day][reason].push(name);
        }
    }

    function recordDeath(log){//死体を記録。利便性のためplayerInfoにも保存。未完成。
        var isday = (document.body.bgColor != "#000000");
        var day = checkDay();
        var name = playerIndexForName($(log).find("b").eq(0).text());
        var text = $(log).text();
        if(deathlog[day] === undefined) deathlog[day] = {};
        if(deathlog[day-1] === undefined) deathlog[day-1] = {};
        if(/無残な姿で発見/.test(text)){
            playerInfo[name].death = day;
            addDeath(day,name,"bite");
        } else if(/死体で発見/.test(text)){
            playerInfo[name].death = day;
            addDeath(day,name,"note");
        } else if(/村民協議の結果/.test(text)){
            if(isday) day-- ;
            playerInfo[name].death = day+1;
            addDeath(day,name,"exec");
        } else if(/突然死/.test(text)){
            playerInfo[name].death = day+1;
            addDeath(day,name,"sudden");
        }
        setSession("deathlog",deathlog);
    }

    function importVote(logs){//投票を取り込む。たぶん完成
        var day = $(logs[0]).text().match(/(\d{1,2})日目 投票結果。/);
        day = day[1] - 1 ;

        playerInfo.forEach(function(player,i){
            playerInfo[i].vote[day] = [];
        });
        logs.forEach(function(log){
            $(log).find("tr").each(function(i,vote){
                var voter = playerIndexForName($(vote).find("b").eq(0).text());
                var target = $(vote).find("b").eq(1).text();
                playerInfo[voter].vote[day].unshift(target);
            });
        });
    }

    function refreshVoteTable(){//投票テーブルリライト
        var tr,td,text,player,i,trs;
        voteTable.empty();
        //一列目
        trs = "<tr><td>プレイヤー</td>";
        for(i=1; i<=newestDay; i++){
            trs += `<td>${i+1}日目</td>`;
        }
        trs += "</tr>";

        for(player of playerInfo){
            trs += "<tr>";
            trs += `<td>${player.name}</td>`;
            for(i=1; i<=newestDay; i++){
                text = (player.vote[i]) ? player.vote[i].join("<br>") : "-";
                trs += `<td>${text}</td>`;
            }
        }
        voteTable.append(trs);
    }

    function refreshDeathTable(){//死人テーブルもリライト
        var trs,i,text,day;
        deathTable.empty();
        var l = ["無残な姿で発見","死体で発見","村民協議の結果処刑","突然死"];
        var l2 = ["bite","note","exec","sudden"];

        trs = "<tr><td>死因</td>";
        for(i=1; i<=newestDay; i++){
            trs += `<td>${i+1}日目</td>`;
        }
        trs+="</tr>";

        for(i=0; i<4; i++){
            var reason = l2[i];
            trs += `<tr><td>${l[i]}</td>`;
            for(day=1; day<=newestDay; day++){
                if(deathlog[day] && deathlog[day][reason]) {
                    text = deathlog[day][reason].map(x => playerInfo[x].name).join("<br>");
                } else {
                    text = "-";
                }
                trs+=`<td>${text}</td>`;
            }
            trs+="</tr>";

        }
        deathTable.append(trs);
    }

    //**********************************************
    //   乱数表
    //**********************************************

    function rnd(n,digit){//0～n-1の整数乱数 digitを指定するとゼロパディング
        digit = digit ? digit : false;
        var r = Math.floor(Math.random()*n);
        if(digit) r = padding(r,digit);
        return r;
    }

    function padding(num, digit){ //ゼロパディング
        return ("0000000000"+num).slice(-digit);
    }

    function makernd(){ //四桁乱数
        return rnd(10000,4);
    }

    function makematrix(num){ //乱数表
        var l = [];
        var mat = "";
        for(var i=0; i<num; i++) {
            l[i] = padding(i+1,2);
        }
        for(i=0; i<num; i++){
            var r = rnd(num - i);
            mat += l[r];
            mat += i%5==4 ? "\n" : " / ";
            for(var j = r; j<num-1; j++) {
                l[j] = l[j+1];
            }
        }
        return mat;
    }

    function makerndjob(num){ //役職対応
        var result = "";
        var isimo = (num == 15 || num == 19);
        var i,n,r;
        if(isimo){
            var cir = ["①","②","③","④","⑤","⑥","⑦"];
            n = (num==19) ? 7 : 6;
            result += cir[rnd(n)] + "\n\n";
        }
        var jobs = ["村人","占い師","霊能者","狩人","共有者","狂人","背徳者"];
        n = isimo ? 7 : 6;
        var l = [];
        for(i=0; i<n; i++){
            do{
                r = rnd(1000,3);
            }while(l.indexOf(r) >= 0);
            l.push(r);
            result += jobs[i] + "：" + r + "\n";
        }
        return result;
    }

    //**********************************************
    //   その他小物
    //**********************************************

    function checkDay(){ //日付チェック
        var day = body.html().match(/<font size="\+2">([0-9]{1,2})<\/font>日目/);
        day = day ? day[1] - 1 : 0;
        return day;
    }

    function getNewestDay() {//最新の日付を返す(ブラバとかすると単純な日付チェックじゃ対応できない)
        return Math.max(checkDay(),discussLog.length-1);
    }

    function createSelectBox(option,selected,id,cl){//optionを持つselectを作る。str。optionは{value: innerHTML}の形式で
        cl = cl || "";
        var s = `<select id="${id}" class="${cl}">`;
        var issl = "";
        for(var i in option) {
            issl = (i==selected) ? "selected" : "";
            s += `<option value="${i}" ${issl}>${option[i]}</option>`;
        }
        s += "</select>";
        return s;
    }

    function editSpeakField(text){ //発言欄をtextにする
        $("textarea").eq(0).val(text);
        memoContainer.hide();
    }

    function sendClipboard(text,disc){ //クリップボードにコピー 発言欄初期化する注意
        $("textarea").eq(0).val(text).select();
        document.execCommand('copy');
        $("textarea").eq(0).val("");
        popupMessage("クリップボードにコピーしました："+disc);
    }

    //**********************************************
    //   表示周り
    //**********************************************
    function popupMessage(text){ //メッセージ
        messageArea.text(text).show();
        setTimeout(function(){
            messageArea.hide();
        }, 1500);
    }

    var switchDispArea = function(mode){//メモのログ/投票表示切り替え
        $("#memoBody div").hide();
        if(mode=="log"){
            $("#playerInfoArea").show();
            $("#buttonArea").show();
            $("#discussLogArea").show();
        }
        if(mode=="vote"){
            $("#voteArea").show();
        }
    };

    function refresh(){ //再表示まとめて
        refreshDiscussLogTable();
        refreshPlayerInfoTable();
        refreshVoteTable();
        refreshDeathTable();
    }

    function setAlertVote(){ //未投票アラート
        if( $("font[size=6]").size()){
            $("body").css("background-color","#f8e58c");
            $("table").eq(0).css("background-color","white");
            setInterval(function(){
                warningArea.toggle();
            },750);
        }
    }

    function receiveKeyResponse(){ //キー入力を受け付けるかどうか
        $(window).on("keydown",function(e){
            if(IS_SUBMIT.ctrl && e.ctrlKey && e.keyCode == 13){
                document.forms[0].submit();
            }
            if(IS_SUBMIT.shift && e.shiftKey && e.keyCode == 13){
                document.forms[0].submit();
            }
        });
    }

    function dispSuggest(){
        var colorlist = createSelectBox(COLORLIST,0,"colorlist");
        var iconlist = createSelectBox(ICONLIST,0,"iconlist");

        var userlist = `<td class="coloredit">アイコン色：</td><td class="coloredit">${colorlist}</td><td class="iconedit">アイコン：</td><td class="iconedit">${iconlist}</td>`;
        $("table[cellspacing=0]").eq(-2).find("td").eq(1).after(userlist);

        $("#colorlist").on("change",function(){
            editSpeakField($(this).val());
        });
        $("#iconlist").on("change",function(){
            var no = $(this).val();
            if(no.indexOf("img") < 0 && no-0 > 4674) {
                no = "../../imgbbs/img/"+no;
            }
            editSpeakField(no);
        });
        $("select").eq(0).on("change",function(){
            if($(this).val() == "ICONCHG"){
                $(".coloredit").show();
                $(".iconedit").hide();
            } else if($(this).val() == "BCONCHG"){
                $(".coloredit").hide();
                $(".iconedit").show();
            } else {
                $(".coloredit").hide();
                $(".iconedit").hide();
            }
        });
    }

    function highlightDeathnote(){
        var td = $("table[cellspacing=0]").eq(0).find("td").last();
        if(/アナタの家の前に手帳が落ちてます/.test(td.html())){
            td.css("color","red");
        }
    }

    //**********************************************
    //   本編
    //**********************************************


    //cssかきかえる準備
    var mycss = $('<style></style>',{id:"mystyle"});
    var content = [];

    //見た目変更
    if(REWRITE_CSS){
        content = content.concat([
            '.CLSTABLE tr td:nth-of-type(even) {font-size: 12px;line-height: 110%;padding: 2px;}',
            '.CLSTABLE tr td:nth-of-type(odd) {font-size: 0px;padding: 2px;}',
            'body[bgcolor="#000000"] font[color="#6666aa"] {color: #ccccff;}',
            'font[size="-1"] {font-size: 9pt;}',
            'img {padding: 0;}',
            'input,select {font-size: 9pt;}',
            'table {font-size: 13px;}',
            'textarea {font-family: "Meiryo";font-size: 11px;min-height: 100px;}',
            'table[cellpadding="0"] tr td:nth-of-type(2){word-break:break-all;}'
        ]);
    }

    //追加分
    content = content.concat([
        "body{box-sizing:border-box;}",
        "#memoContainer{display:none; width:100%; height:100%; position:fixed; top:0px; left:0px; background-color:rgba(127,127,127,0.8); padding:10px; box-sizing:inherit;overflow:auto;}",
        "#floatButtonArea{position:fixed; right:10px; top:10px;}",
        "#UIBox{width:100%; overflow:auto; margin: 0 auto; font-size:10px;}",
        "#UIBox input, #UIBox select, #buttonArea input{font-size:11px;}",
        "#memoBody{width:100%; height:90%; margin: 0 auto;}",
        "#playerInfoArea{width:100%; overflow:auto;}",
        "#buttonArea{margin:5px auto;}",
        "#discussLogArea{width:100%; background-color:white;}",
        "#voteArea{width:90%; margin: 0 auto; background-color:white; display:none; padding:10px;}",
        "#messageArea{width:250px; height:40px; position:fixed; left:50%; transform: translate(-50%, 0); top:15px; display:none; background-color:lightblue; box-shadow: 10px 10px 10px rgba(0,0,0,0.4);}",
        "#messageArea{border-radius:5px; text-align:center;font-size:12px; color:black;vertical-align:middle;padding-top:5px; font-weight:bold;}",
        "#warningArea{width:300px; height:40px; position:fixed; right:15px; bottom:15px; display:none; background-color:red; border-radius:5px; text-align:center; font-size:36px; color:white; font-weight:bold;}",
        "#playerInfoTable{background-color:white;text-align:center; font-size:8pt;border-collapse:collapse; color:black; margin:0 auto;}",
        "#playerInfoTable td{border:#666 solid 1px;padding:1px;}",
        "#playerInfoTable tr:first-child{height:35px;}",
        "#discussLogTable{border-collapse:collapse; margin-left:30px;}",
        "#discussLogTable tbody{text-align:left;}",
        "#discussLogTable td{vertical-align:top; color:black; word-break:break-all; font-size:9pt; line-height:130%; padding:2px;}",
        "#discussLogTable font{font-size:9pt;}",
        "#discussLogTable tr td:first-of-type{min-width:150px; }",
        "#playerInfoTable a{text-decoration:underline; color:blue; cursor:pointer;}",
        "#voteArea table{font-size:11px; border-collapse:collapse; margin-bottom:10px;color:black;}",
        "#voteArea table td{border:1px solid #ccc; padding:2px; }",
        '.death {background-color:pink;}',
        '.gray {background-color:#e3e3e3;}',
        ".systemlog{font-weight:bold;background-color:orange !important;color:white;text-align:center;font-size:15px;}",
        '.selected {background-color:#f3f3f3;}',
        "#floatButtonArea > div{display:inline-block; vertical-align: top; width:100px; font-size:11px; line-height:21px; text-align:center; border:2px solid orange; color:black; background-color:white;}",
        "#floatButtonArea a{color:black; width:100px; cursor:pointer; box-sizing:border-box; display:inline-block;}",
        "#toolArea_hid {display:none;}",
        ".coloredit, .iconedit {display:none;}",
        ".voiceloud {padding:0px 5px;}",
        ".voiceloud div:not(:first-of-type){margin-top:5px;}",
        ".voice {box-sizing:border-box; width:30px;height:30px;font-size:16px;border:1px solid black; border-radius:2px;background-color:white;line-height:28px;text-align:center;color:black; cursor:pointer;}",
        ".voice.voice_selected{border:3px solid red; line-height:24px;}"

    ]);
    content = content.join("\n");
    for(var i=0; i<30; i++){
        content += ".show_player"+i+ " tr{display:none;}\n";
        content += ".show_player"+i+ " tr.talk_player"+i+", .show_player"+i+" tr.systemlog{display:block;}\n";
    }
    mycss.html(content).appendTo($("head"));

    //クソデカ送信ボタン
    var voicebutton = "<td class='voiceloud'><div class='voice' data-value='MSG'>普</div><div class='voice' data-value='MSG2'><strong>強</strong></div><div class='voice' data-value='MSG3'><span style='color:#6666ee;'>弱</span></div></td>";
    var submitbutton = `<td><input type="submit" value="行動/更新" style="height:100px; width:150px;"></td>`;
    $("table[cellspacing=0]").eq(-1).find("td").eq(-1).after(voicebutton);
    $("table[cellspacing=0]").eq(-1).find("td").eq(-1).after(submitbutton);

    $(".voice").click(function(){
        console.log("burn");
        var command = $(this).data("value");
        console.log(command);
        $("select").eq(0).val(command);
        $(".voice").removeClass("voice_selected");
        $(this).addClass("voice_selected");
    });

    //大枠
    var body = $("body");
    var memoContainer = $("<div></div>",{id:"memoContainer"}).appendTo(body);
    var messageArea = $("<div></div>",{id:"messageArea"}).appendTo(body);
    var warningArea = $("<div></div>",{id:"warningArea", text:"！未投票です！"}).appendTo(body);
    var floatButtonArea = $("<div></div>",{id:"floatButtonArea"}).appendTo(body);

    //共通のボタン部分とその下
    var UIBox= $("<div></div>",{id:"UIBox"}).appendTo(memoContainer);
    var memoBody= $("<div></div>",{id:"memoBody"}).appendTo(memoContainer);

    //各div
    var playerInfoArea = $("<div></div>",{id:"playerInfoArea"}).appendTo(memoBody);
    var buttonArea = $("<div></div>",{id:"buttonArea"}).appendTo(memoBody);
    var discussLogArea = $("<div></div>",{id:"discussLogArea"}).appendTo(memoBody);
    var voteArea = $("<div></div>",{id:"voteArea"}).appendTo(memoBody);

    //テーブル
    var playerInfoTable = $("<table>",{ id:"playerInfoTable" }).appendTo(playerInfoArea);
    var discussLogTable = $("<table>",{ id:"discussLogTable" }).appendTo(discussLogArea);
    var voteTable = $("<table>",{ id:"voteTable" }).appendTo(voteArea);
    var deathTable = $("<table>",{ id:"deathTable" }).appendTo(voteArea);

    if($("td.CLSTD01").eq(1).text() == "◆ 再表示") {
        var isAutoReload = getSession("isAutoReload",0);
        var onoff = isAutoReload ? "ON" : "OFF";
        var autoReload = "<div><a id='autoReload'>自動更新："+onoff+"</a></div>"
        var autoReloadFlg;
        if(isAutoReload){
            autoReloadFlg = setTimeout(function(){
                $("textarea").eq(0).val("");
                document.forms[0].submit();
            },20*1000);
        }
        floatButtonArea.append(autoReload);
        $("#autoReload").click(function(){
            if(!isAutoReload){
                setSession("isAutoReload",1);
                autoReloadFlg = setTimeout(function(){
                    $("textarea").eq(0).val("");
                    document.forms[0].submit();
                },20*1000);
                $("#autoReload").text("自動更新：ON");
                popupMessage("自動更新を有効にしました。")
            } else {
                setSession("isAutoReload",0);
                clearTimeout(autoReloadFlg);
                popupMessage("自動更新を無効にしました。")
                $("#autoReload").text("自動更新：OFF");
            }
        });
    }

    //乱数ツール
    var toolArea = "<div id='toolArea'><a>ツール</a><div id='toolArea_hid'><a id='tool1'>四桁乱数</a><a id='tool2'>乱数表</a><a id='tool3'>役職一覧と丸数字</a></div></div>";
    floatButtonArea.append(toolArea);

    //表示/非表示ボタン
    var toggleButton = "<div><a id='toggleButton'>メモ表示/非表示</a></div>";
    floatButtonArea.append(toggleButton);

    //共通のボタン
    var importButton = "<input type='button' id='importButton' value='ログの取り込み'>";
    UIBox.append(importButton);

    var logDispButton = "<input type='button' id='logDispButton' value='発言ログの表示'>";
    UIBox.append(logDispButton);

    var voteDispButton = "<input type='button' id='voteDispButton' value='投票・死体の表示'>";
    UIBox.append(voteDispButton);

    var resetButton = "<input type='button' id='resetButton' value='リセット'>";
    UIBox.append(resetButton);

    var reloadButton = "<input type='button' id='reloadButton' value='更新'>";
    UIBox.append(reloadButton);

    //各ブロックのボタン

    var showAllButton = "<input type='button' id='showAllButton' value='全員表示'>";
    buttonArea.append(showAllButton);

    var showAliveButton = "<input type='button' id='showAliveButton' value='生存+役職のみ'>";
    buttonArea.append(showAliveButton);

    var inputMode = getSession("inputMode","simple");
    var inputModeSelect = createSelectBox({"none":"なし","simple":"最新のみ","full":"全日"},inputMode,"inputModeSelect");
    buttonArea.append(inputModeSelect);

    //各種データよみこみ
    var playerInfo = getSession("playerInfo",[]);
    var discussLog = getSession("discussLog",[]);
    var deathlog = getSession("deathlog",[]);
    var isfilter = getSession("isfilter",false);


    var newestDay;
    setTimeout(function(){
        newestDay = getNewestDay();
        refresh();
    },500);

    if(ALLTIME_IMPORT_LOG){
        updateplayerInfo();
        importDiscussLog();
        refresh();
    } else if(ONETIME_IMPORT_LOG){
        var d = checkDay();
        if(!discussLog[d] && /<font size="\+2">投票/.test(body.html())){
            setTimeout(function(){
                updateplayerInfo();
                importDiscussLog();
                refresh();
                popupMessage("ログを取り込みました。");
            },500);
        }
    }

    if( ALERT_VOTE ) setAlertVote();
    if( IS_DISP_SUGGEST ) dispSuggest();
    if( HIGHLIGHT_DEATHNOTE ) highlightDeathnote();
    receiveKeyResponse();

    $("#toggleButton").on("click",() => {
        memoContainer.toggle();
    });
    $("#importButton").on("click",function(){
        updateplayerInfo();
        importDiscussLog();
        refresh();
    });
    $("#logDispButton").on("click", () => {
        switchDispArea("log");
    } );
    $("#voteDispButton").on("click", () => {
        switchDispArea("vote");
    } );
    $("#resetButton").on("click",function(){
        if( window.confirm( "ログをすべてリセットします。本当によろしいですか？" ) ) {
            discussLog = [];
            playerInfo = [];
            deathlog = [];
            newestDay = checkDay();
            refresh();
        }
    });
    $("#reloadButton").on("click",function(){
        $("textarea").eq(0).val("");
        document.forms[0].submit();
    });
    $("#showAllButton").on("click",function(){
        isfilter = false;
        setSession("isfilter",isfilter);
        refreshPlayerInfoTable();
    });
    $("#showAliveButton").on("click",function(){
        isfilter = true;
        setSession("isfilter",isfilter);
        refreshPlayerInfoTable();
    });
    $("#inputModeSelect").on("change",function(){
        inputMode = $("#inputModeSelect").val();
        setSession("inputMode",inputMode);
        refreshPlayerInfoTable();
    });
    $("#floatButtonArea a").hover(function(){
        $(this).addClass("selected");
    },function(){
        $(this).removeClass("selected");
    });
    $("#toolArea").hover( () => {
        $("#toolArea_hid").show();
    }, () => {
        $("#toolArea_hid").hide();
    });
    $("#tool1").on("click",() => {
        sendClipboard(makernd(),"四桁乱数");
    });
    $("#tool2").on("click",() => {
        updateplayerInfo();
        sendClipboard(makematrix(playerInfo.length),"乱数表");
    });
    $("#tool3").on("click",() => {
        updateplayerInfo();
        sendClipboard(makerndjob(playerInfo.length),"役職一覧");
    });


})(jQuery);