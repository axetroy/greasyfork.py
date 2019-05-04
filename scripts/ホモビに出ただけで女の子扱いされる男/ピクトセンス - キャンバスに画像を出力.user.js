// ==UserScript==
// @name         ピクトセンス - キャンバスに画像を出力
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  このスクリプトによるキャンバスの変化は自分以外には見えません。
// @author       You
// @match        https://pictsense.com/*
// @grant        none
// ==/UserScript==
(() => {
  'use strict';

  const BIG_p = document.createElement("p");
  BIG_p.style.backgroundColor = '#2cbcec';
  BIG_p.append("キャンバスに画像を出力");

  const UP_LEFT = 0;
  const UP_RIGHT = 1;
  const BOTTOM_LEFT = 2;
  const BOTTOM_RIGHT = 3;
  const CENTER = 4;

  let g_select_elm = null;
  let g_checkbox_elm = null;
  let g_button_elm = null;
  let g_max_length = 550;

    (() => {
      const p = document.createElement("p");
      p.append("出力する画像を選択");

        const resize = (image) => {
      if (g_checkbox_elm.checked == true) return [image.width, image.height];
      const THUMBNAIL_WIDTH = g_max_length; // 画像リサイズ後の横の長さの最大値
      const THUMBNAIL_HEIGHT = g_max_length; // 画像リサイズ後の縦の長さの最大値
      let width, height;
      if (image.width > image.height) {
        // 横長の画像は横のサイズを指定値にあわせる
        const ratio = image.height / image.width;
        width = THUMBNAIL_WIDTH;
        height = THUMBNAIL_WIDTH * ratio;
      } else {
        // 縦長の画像は縦のサイズを指定値にあわせる
        const ratio = image.width / image.height;
        width = THUMBNAIL_HEIGHT * ratio;
        height = THUMBNAIL_HEIGHT;
      }
      return [width, height];
    }

      const elm = document.createElement('input');
      elm.setAttribute('type', 'file');
      elm.addEventListener('change', () => {
        const fileReader = new FileReader();
        fileReader.onload = function (e) {
          const src_data = e.target.result;
          const img_obj = new Image();
          img_obj.src = src_data;
          img_obj.onload = (e) => {
            const image_data = (() => {
              const img = e.target;
              const cv = document.createElement('canvas');
              const ct = cv.getContext('2d');
              [cv.width, cv.height] = resize(img);
              ct.drawImage(img, 0, 0, img.width, img.height, 0, 0, cv.width, cv.height);
              const data = ct.getImageData(0, 0, cv.width, cv.height);
              return data;
            })();
            const cv = document.getElementById('canvas');
            const cnt = cv.getContext('2d');
            switch (Number(g_select_elm.options[g_select_elm.selectedIndex].value)) {
            case UP_LEFT:
              cnt.putImageData(image_data, 0, 0);
              break;
            case UP_RIGHT:
              cnt.putImageData(image_data, cv.width - image_data.width, 0);
              break;
            case BOTTOM_LEFT:
              cnt.putImageData(image_data, 0, cv.height - image_data.height);
              break;
            case BOTTOM_RIGHT:
              cnt.putImageData(image_data, cv.width - image_data.width, cv.height - image_data.height);
              break;
            case CENTER:
              cnt.putImageData(image_data, cv.width/2 - image_data.width/2, cv.height/2 - image_data.height/2);
              break;
            }
          }
        }
        fileReader.readAsDataURL(elm.files[0]);
      });
      p.append(elm)
      BIG_p.append(p);

    })();
  (() => {
    const p = document.createElement("p");
    p.append("貼る位置：");
    const select = document.createElement("select");
    g_select_elm = select;
    const make_opt = (_value, _text) => {
      const option = document.createElement("option");
      option.value = _value;
      option.innerText = _text;
      select.append(option);
    }
    make_opt(UP_LEFT, "左上");
    make_opt(UP_RIGHT, "右上");
    make_opt(BOTTOM_LEFT, "左下");
    make_opt(BOTTOM_RIGHT, "右下");
    make_opt(CENTER, "中央");
    p.append(select);
    BIG_p.append(p);
  })();
  (() => {
    const p = document.createElement("p");
    const checkbox = document.createElement("input");
    g_checkbox_elm = checkbox;
    checkbox.addEventListener('change', (e) => {
        if(checkbox.checked == true)g_button_elm.style.display ='none';
        else g_button_elm.style.display ='inline-block';
    });
    checkbox.type = "checkbox";
    p.append(checkbox);
    p.append("原寸大で出力する");
    BIG_p.append(p);
  })();
  (() => {
    const elm = document.createElement("button");
    g_button_elm = elm;
    elm.innerHTML = "サイズの最大値を変更";
    elm.addEventListener('click', (e) => {
        g_max_length = (() => {
            while(1){
                let input = prompt("リサイズ後の画像の辺の長さの最大値を入力してください", g_max_length)
                if(!input) return g_max_length;
                else if(isNaN(input)) alert("数値を入力してください");
                else if(input <= 0) alert("正の数値を入力してください");
                else return input;
            }
        })();
    });
    BIG_p.append(elm);
  })();

    document.getElementById("leaveButton").parentNode.append(BIG_p);
})();