// ==UserScript==
// @name         feederチャット - キリ番ゲッター(カスタマイズ版)
// @author       GO is not GOD , SWK is GOD
// @namespace    https://www.x-feeder.info/
// @version      0.7
// @description  カスタマイズしてとる
// @match        *.x-feeder.info/*/
// @require      https://greasyfork.org/scripts/373658-feeder-chat-library/code/feeder-chat-library.js?version=691624
// @grant        none
// ==/UserScript==
(() => {
    const feeder = new Feeder_Chat_Library();
    let relative_flag = !false;
    let top_num_log = 0;
    const main = () => {
        const top_num = feeder.getPostId().top;
        if(top_num <= top_num_log) return;
        top_num_log = top_num;
        const next_num = top_num + 1;
        if(add_list.indexOf(next_num) !== -1) say();
        kill(next_num);
        refresh_list();
    };
    const say = () => {
        const str = saying_input_elm.val()
        if(!str.length) return;
        const str2 = str + ' '.repeat(Math.random()*10);
        $('#' + activeForm).val(str2);
        $("#post_btn").click();
    };
    let add_list = [];
    const add = (feed_id) => {
        if(add_list.indexOf(feed_id) !== -1 || feed_id <= top_num_log + 1) return;
        add_list.push(feed_id);
        return true;
    };
    const kill = (feed_id) => {
        const feed_id2 = Number(feed_id);
        if(isNaN(feed_id2)) return;
        holder.find("."+UNIQUE_NAME+feed_id2).remove();
        add_list = add_list.filter(v=>{return v !== feed_id2});
    };
    const maked_holder = $("<div>");
    const UNIQUE_NAME = "pojpojopfjopjopgjoegsfjoie";
    const reg = new RegExp('^' + UNIQUE_NAME);
    const refresh_list = () => {
        const cs = maked_holder.children();
        const array = [];
        cs.each((index, e)=>{
            const jq = $(e);
            const n = Number(jq.attr("class").replace(reg,""));
            if(n <= top_num_log) array.push(jq);
        });
        array.forEach((e)=>{
            e.remove();
        });
    };
    const make = (feed_id) => {
        let id = Number(feed_id);
        if(isNaN(id)) return;
        if(relative_flag) id += top_num_log;
        const result = add(id);
        if(!result) return;
        const div = $("<div>").appendTo(maked_holder).attr("class",UNIQUE_NAME+id);
        div.append($("<span>",{text:id}));
        div.append(" ");
        div.append($("<button>",{text:"×"}).css({"background-color":"red",color:"white"}).click(()=>{
            if(confirm("消しますか？")) kill(id);
        }));
    };
    const toHANKAKU = (str) => {
        return str.replace(/[Ａ-Ｚａ-ｚ０-９！-～]/g, (s) => {
            return String.fromCharCode(s.charCodeAt(0)-0xFEE0);
        });
    };
    const P_ELM = $("#main_right");
    const saying_input_elm = $('<input>').attr('placeholder','キリ番とったときに発言する内容').css("width",P_ELM.width());
    const input_elm = $('<input>').attr('placeholder','新しく取得したいキリ番を登録').css("width","15em").change(function(){
        $(this).val(toHANKAKU($(this).val()).replace(/[^0-9]/g,""));
    }).keypress(function(e){
        if(e.key==="Enter"){
            make($(this).val());
            $(this).val("");
        }
    });
    const btn = $("<button>").click(function(){
        relative_flag = !relative_flag;
        if(relative_flag) $(this).text("相対指定").css({"background-color":"red",color:"yellow"});
        else $(this).text("絶対指定").css({"background-color":"blue",color:"yellow"});
    })
    btn.click();
    const holder = $("<div>").css("background-color","white").prependTo(P_ELM)
    .append("キリ番ゲッター(カスタマイズ版)")
    .append(saying_input_elm)
    .append(input_elm)
    .append($("<button>",{text:"登録"}).click(()=>{
        make(input_elm.val());
        input_elm.val("");
    }))
    .append(btn)
    .append("<br>")
    .append("登録したもの")
    .append(maked_holder)
    setInterval(main,10);
})();