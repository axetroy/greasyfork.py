// ==UserScript==
// @name         feederチャット - 複数の画像から特定の座標を一様に切り出す
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http*://*.x-feeder.info/*/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const main_holder = $("<div>").appendTo("body");
    const toHANKAKU = (str) => {
        return str.replace(/[Ａ-Ｚａ-ｚ０-９！-～]/g, (s) => {
            return String.fromCharCode(s.charCodeAt(0)-0xFEE0);
        });
    };
    let x = 0;
    let y = 0;
    let w_length = 100;
    let h_length = 100;
    $('<div>').appendTo(main_holder)
    .append("x座標：")
    .append( $('<input>').css("width","5em").val(x).change(function(){
        $(this).val(toHANKAKU($(this).val()).replace(/[^0-9]/g,""));
        x = Number($(this).val());
    }) )
    .append("<br>")
    .append("y座標：")
    .append( $('<input>').css("width","5em").val(y).change(function(){
        $(this).val(toHANKAKU($(this).val()).replace(/[^0-9]/g,""));
        y = Number($(this).val());
    }) )
    .append("<br>")
    .append("幅：")
    .append( $('<input>').css("width","5em").val(w_length).change(function(){
        $(this).val(toHANKAKU($(this).val()).replace(/[^0-9]/g,""));
        w_length = Number($(this).val());
    }) )
    .append("<br>")
    .append("高さ：")
    .append( $('<input>').css("width","5em").val(h_length).change(function(){
        $(this).val(toHANKAKU($(this).val()).replace(/[^0-9]/g,""));
        h_length = Number($(this).val());
    }) );
    const cutImage = (img) => {
        const cv = $("<canvas>").get(0);
        cv.width = w_length;
        cv.height = h_length;
        const ctx = cv.getContext("2d");
        ctx.clearRect(0, 0, cv.width, cv.height);
        ctx.drawImage(img, x, y, w_length, h_length, 0, 0, w_length, h_length);
        return cv.toDataURL();
      };
    const read_file_elm = $("<input>",{
        type: 'file',
        multiple: true
    }).change((evt)=>{
        result_holder.empty();
        const files = evt.target.files;
        if(!files.length) return;
        for(const file of files) readFile(file);
    });
    const readFile = (file) => {
        const fr = new FileReader();
        fr.onload = () => {
            const dataURL = fr.result;
            $('<img>',{src:dataURL}).load(function(){
                $('<img>',{src:cutImage(this)}).appendTo(result_holder);
            });
        };
        fr.readAsDataURL(file);
    };
    $("<button>",{text:"複数の画像を読み込んで切り出す"}).click(()=>{
        read_file_elm.click();
    }).appendTo(main_holder);
    const result_holder = $("<div>").appendTo(main_holder);
})();