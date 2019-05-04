// ==UserScript==
// @name         feederチャット - 画像分割☆
// @namespace    http://tampermonkey.net/
// @version      0.3
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
    let w_length = 2;
    let h_length = 2;
    $('<div>').appendTo(main_holder)
    .append("横の分割数：")
    .append( $('<input>').css("width","2em").val(2).change(function(){
        $(this).val(toHANKAKU($(this).val()).replace(/[^0-9]/g,""));
        w_length = Number($(this).val());
    }) )
    .append("<br>")
    .append("縦の分割数：")
    .append( $('<input>').css("width","2em").val(2).change(function(){
        $(this).val(toHANKAKU($(this).val()).replace(/[^0-9]/g,""));
        h_length = Number($(this).val());
    }) );
    const splitImage = (img) => {
        //img.crossOrigin = 'anonymous';
        const width = img.width / w_length;
        const height = img.height / h_length;
        const cv = $("<canvas>").get(0);
        cv.width = width;
        cv.height = height;
        const ctx = cv.getContext("2d");
        const list = [];
        for(let num = 0; num < w_length * h_length; num++) {
          ctx.clearRect(0, 0, cv.width, cv.height);
          ctx.drawImage(img, width * (num % w_length), height * Math.floor(num / w_length), width, height, 0, 0, width, height);
          list.push(cv.toDataURL());
        }
        return list;
      };
    const read_file_elm = $("<input>",{
        type: 'file'
    }).change((evt)=>{
        result_holder.empty();
        const files = evt.target.files;
        const fr = new FileReader()
        fr.readAsDataURL(files[0]);
        fr.onload = () => {
            const dataUrl = fr.result;
            $('<img>',{src:dataUrl}).load(function(){
                splitImage(this).forEach((URL)=>{
                    $('<img>',{src:URL}).appendTo(result_holder);
                });
            });
        }
    });
    $("<button>",{text:"画像を読み込んで分割する"}).click(()=>{
        read_file_elm.click();
    }).appendTo(main_holder);
    const result_holder = $("<div>").appendTo(main_holder);
})();