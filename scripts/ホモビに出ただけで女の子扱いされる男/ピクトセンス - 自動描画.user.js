// ==UserScript==
// @name         ピクトセンス - 自動描画
// @author       美大落ち
// @namespace    https://greasyfork.org/ja/users/203557
// @version      4.3044
// @description  自動描画
// @match        https://pictsense.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==
(() => {
  'use strict'
  const LOOP_MAX = 37777 // 一気に描くのを防止
  const CV_ELM = $("#previewCanvas") // canvas要素
  let g_W, g_H // 画像の幅と高さ
  let g_pixelClass_Array // クラスの入れ物
  let g_ADD_X, g_ADD_Y
  let g_stop_flag = false
  let g_divide_num = 255 / 3
  if (window.localStorage.Auto_Draw_Scripts_g_divide_num) g_divide_num = Number(window.localStorage.Auto_Draw_Scripts_g_divide_num)
  let g_stop_btn_elm
  let g_cv_click_flag = false
  let g_last_dfs_flag = false
  let g_file_input_elm
  const reset = () => {
    if (g_stop_btn_elm) g_stop_btn_elm.remove()
    g_stop_btn_elm = null
    if (g_file_input_elm) g_file_input_elm.remove()
    g_file_input_elm = add_file_input()
    g_cv_click_flag = false
  }
  const g_holder = $('<div>', {
    text: '自動描画スクリプト v4.3044'
  }).css({
    'background-color': 'black',
    'color': 'white'
  }).prependTo($(document.getElementById("leaveButton").parentNode))
  const g_message_elm = $('<div>', {
    text: 'まずは描画する画像を選択'
  }).appendTo(g_holder)
  $('<div>').append($('<input>', {
    type: 'checkbox'
  }).change(function () {
    g_last_dfs_flag = this.checked
  })).append('後ろから塗る').appendTo(g_holder)
  $('<div>').append('色分割数：').append($('<input>', {
    value: 255 / g_divide_num,
    width: '5em',
    'placeholder': '1~255'
  }).change(function () {
    const val = Number($(this).val())
    if (val < 1 || 255 < val || isNaN(val)) {
      $(this).css("background-color", "pink")
      return alert('入力エラー\n\n有効な数値は1~255です\nこの値が小さいほど所要時間が短くなりますが、色の精度が落ちます')
    }
    $(this).css("background-color", "white")
    g_divide_num = 255 / val
    window.localStorage.Auto_Draw_Scripts_g_divide_num = g_divide_num
    g_message_elm.text('画像を再度選択してね')
    reset()
  })).appendTo(g_holder)
  const mouse_event = (_evt_name, _x, _y, _elm) => {
    const evt = document.createEvent("MouseEvent");
    evt.initMouseEvent(_evt_name, // type 設定可能なタイプは click, mosuedown, mouseup, mouseover, mousemove, mouseout
      true, // canBubble bubbleを許可するかどうか
      true, // cancelable 途中で処理を止められるかどうか
      window, // view 処理させるウィンドウのオブジェクト
      1, // detail マウスクリックの回数
      0, // screenX
      0, // screenY
      _x - $(window).scrollLeft(), // clientX
      _y - $(window).scrollTop(), // clientY
      false, // ctrlKey イベント中にCtrlキーを押した状態にするかどうか
      false, // altKey イベント中にAltキーを押した状態にするかどうか
      false, // shiftKey イベント中にShiftキーを押した状態にするかどうか
      false, // metaKey イベント中にMetaキーを押した状態にするかどうか
      0, // button 0を設定すると左クリック、1で中クリック、2で右クリック
      window // relatedTarget 関連するイベントの設定。MouseOverとMouseOutの時だけ使用するのでそれ以外はnull
    )
    const obj = _elm instanceof jQuery ? _elm.get(0) : _elm
    obj.dispatchEvent(evt)
  }
  const setRGBA = (_RGBA) => {
    let RGB = ''
    for (let i = 0; i < 3; i++) RGB += ('00' + Number(_RGBA[i]).toString(16)).slice(-2)
    const btn_elm = $($('#colorPalette button')[0])
    btn_elm.attr('data-color', RGB)
    btn_elm[0].style.backgroundColor = '#' + RGB
    mouse_event("mousedown", btn_elm.offset().left, btn_elm.offset().top, btn_elm)
    const A = _RGBA[3]
    const sld_elm = $('#opacitySlider')
    const Convers = (A / 256) * sld_elm.width()
    mouse_event("mousedown", sld_elm.offset().left + Convers, sld_elm.offset().top, sld_elm)
    mouse_event("mouseup", 0, 0, sld_elm)
    const size_elm = $($('#sizeButtonHolder button')[0])
    mouse_event("mousedown", size_elm.offset().left, size_elm.offset().top, size_elm)
    mouse_event("mouseup", 0, 0, size_elm)
  }
  class pixelClass {
    constructor(_x, _y, _RGBA) {
      const ar = []
      for (let i = 0; i < 4; i++) ar.push(Math.floor(Math.ceil(_RGBA[i] / g_divide_num) * g_divide_num))
      this._RGBA = ar.join('_')
      this._flag = ar[0] === 255 && ar[1] === 255 && ar[2] === 255 || ar[3] === 0 ? true : false
      this.m_y = {
        "isFirst": _y == 0 ? true : false,
        "isEnd": _y == g_H - 1 ? true : false
      }
      this.m_x = {
        "isFirst": _x == 0 ? true : false,
        "isEnd": _x == g_W - 1 ? true : false
      }
    }
    get getRGBA() {
      return this._RGBA
    }
    get _getFlag() {
      return this._flag
    }
    setFlag() {
      this._flag = true
    }
    judge(_RGBA) {
      if (this._getFlag) return false
      if (this.getRGBA != _RGBA) return false
      return true
    }
    static make(_ImageData) {
      const H = _ImageData.height
      const W = _ImageData.width
      const array = []
      for (let y = 0; y < H; y++) {
        array.push([])
        for (let x = 0; x < W; x++) {
          const index = (x + y * W) * 4
          const R = _ImageData.data[index]
          const G = _ImageData.data[index + 1]
          const B = _ImageData.data[index + 2]
          const A = _ImageData.data[index + 3]
          array[y].push(new pixelClass(x, y, [R, G, B, A]))
        }
      }
      return array
    }
    static search_false(_pixelObjArray) {
      if (g_last_dfs_flag) {
        for (let y = g_H - 1; y >= 0; y--) {
          for (let x = g_W - 1; x >= 0; x--) {
            if (_pixelObjArray[y][x]._getFlag == false) return [x, y]
          }
        }
      } else {
        for (let y = 0; y < g_H; y++) {
          for (let x = 0; x < g_W; x++) {
            if (_pixelObjArray[y][x]._getFlag == false) return [x, y]
          }
        }
      }
      return null
    }
  }
  const resize = (w1, h1) => {
    const W_MAX = CV_ELM.width()
    const H_MAX = CV_ELM.height()
    if (w1 <= W_MAX && h1 <= H_MAX) return [w1, h1]
    let w2, h2
    if (w1 > h1) {
      const ratio = h1 / w1
      w2 = W_MAX
      h2 = Math.floor(W_MAX * ratio)
    } else {
      const ratio = w1 / h1
      h2 = H_MAX
      w2 = Math.floor(H_MAX * ratio)
    }
    console.log(w2 + ' ' + h2)
    return [w2, h2];
  }
  let reader = new FileReader()
  reader.addEventListener('load', function () {
    const img = new Image()
    img.src = reader.result
    img.addEventListener('load', function () {
      g_message_elm.text('読み込み完了')
      const result = resize(img.width, img.height)
      g_W = result[0]
      g_H = result[1]
      const cv = document.createElement('canvas')
      cv.width = g_W
      cv.height = g_H
      const ct = cv.getContext('2d')
      ct.drawImage(img, 0, 0, img.width, img.height, 0, 0, g_W, g_H)
      g_pixelClass_Array = pixelClass.make(ct.getImageData(0, 0, cv.width, cv.height))
      alert('画像が読み込み終わりました\n出力する位置をクリックしてください')
      g_message_elm.text('キャンバスのどこかをクリック')
      g_cv_click_flag = true
    })
  })
  const add_file_input = () => {
    return $('<input>', {
      'type': 'file'
    }).change(function () {
      if (!this.files[0]) return
      if (g_stop_btn_elm) return alert('現在描画中なので画像を読み込めません')
      g_message_elm.text('画像を読み込み中')
      reader.readAsDataURL(this.files[0])
    }).appendTo(g_holder)
  }
  g_file_input_elm = add_file_input()
  const Auto_Draw = (_Start_x, _Start_y) => {
    const move_log = []
    move_log.push([_Start_x, _Start_y])
    const nowRGBA = g_pixelClass_Array[_Start_y][_Start_x].getRGBA
    setRGBA(nowRGBA.split('_'))
    mouse_event('mousedown', _Start_x + g_ADD_X, _Start_y + g_ADD_Y, CV_ELM)
    let n_x = _Start_x
    let n_y = _Start_y
    let way_log = null
    let break_counter = 0
    while (1) {
      break_counter++
      if (LOOP_MAX < break_counter) {
        mouse_event('mouseup', 0, 0, CV_ELM) // 中断
        break
      }
      if (g_stop_flag) return mouse_event('mouseup', 0, 0, CV_ELM)
      const now = g_pixelClass_Array[n_y][n_x]
      now.setFlag()
      const ar = []
      if (!now.m_y.isFirst) ar.push('up', n_x, n_y - 1)
      if (!now.m_x.isFirst) ar.push('left', n_x - 1, n_y)
      if (!now.m_y.isFirst && !now.m_x.isFirst) ar.push('up_left', n_x - 1, n_y - 1)
      if (!now.m_y.isEnd) ar.push('under', n_x, n_y + 1)
      if (!now.m_x.isEnd) ar.push('right', n_x + 1, n_y)
      if (!now.m_y.isEnd && !now.m_x.isEnd) ar.push('under_right', n_x + 1, n_y + 1)
      if (!now.m_y.isFirst && !now.m_x.isEnd) ar.push('up_right', n_x + 1, n_y - 1)
      if (!now.m_y.isEnd && !now.m_x.isFirst) ar.push('under_left', n_x - 1, n_y + 1)
      const ar2 = []
      for (let i = 0; i < (ar.length) / 3; i++) {
        if (g_pixelClass_Array[ar[3 * i + 2]][ar[3 * i + 1]].judge(nowRGBA)) ar2.push(ar[3 * i], ar[3 * i + 1], ar[3 * i + 2])
      }
      if (!ar2.length) {
        if (!move_log.length) {
          mouse_event('mouseup', 0, 0, CV_ELM) // 探索終了
          break
        }
        const move_log_end = move_log.pop()
        n_x = move_log_end[0]
        n_y = move_log_end[1]
        way_log = null
        mouse_event('mousemove', n_x + g_ADD_X, n_y + g_ADD_Y, CV_ELM)
        continue
      }
      let next = ar2.indexOf(way_log)
      if (next === -1) next = 0
      if (1 < ar2.length) move_log.push([n_x, n_y])
      way_log = ar2[next]
      n_x = ar2[next + 1]
      n_y = ar2[next + 2]
      mouse_event('mousemove', n_x + g_ADD_X, n_y + g_ADD_Y, CV_ELM)
    }
    const getNowTime = () => {
      const time = new Date()
      const ar = [time.getHours(), time.getMinutes(), time.getSeconds()]
      let time_str = ''
      for (let i = 0; i < 3; i++) time_str += ('00' + ar[i]).slice(-2) + ':'
      return time_str.slice(0, -1)
    }
    const result = pixelClass.search_false(g_pixelClass_Array)
    if (result) {
      n_x = result[0]
      n_y = result[1]
      const SIZE = g_W * g_H
      let now_position = g_W * n_y + n_x
      if (g_last_dfs_flag) now_position = SIZE - now_position
      g_message_elm.text('自動描画中…(' + Math.floor(((now_position / SIZE) * 100) * 1000) / 1000 + '%)')
      setTimeout(function () {
        Auto_Draw(n_x, n_y)
      }, 1000)
    } else {
      g_message_elm.text('★描画完了(' + getNowTime() + ')')
      reset()
      return
    }
  }
  const add_stop_button = function () {
    return $('<button>', {
      text: '緊急停止'
    }).css('color', 'red').click(function () {
      g_stop_flag = true
      g_message_elm.text('緊急停止しました')
      reset()
    }).appendTo(g_holder)
  }
  CV_ELM[0].addEventListener("click", 　 (e) => {
    if (g_cv_click_flag === false) return
    g_ADD_X = e.clientX
    g_ADD_Y = e.clientY
    alert('自動描画を始めます')
    if (!g_stop_btn_elm) g_stop_btn_elm = add_stop_button()
    g_stop_flag = false
    g_last_dfs_flag ? Auto_Draw(g_W - 1, g_H - 1) : Auto_Draw(0, 0)
    g_cv_click_flag = false
  }, false)
})();