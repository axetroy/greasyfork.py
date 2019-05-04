// ==UserScript==
// @name         feederチャット - ピアノ
// @author       24歳、楽聖です。
// @namespace    https://greasyfork.org/ja/users/203557
// @version      3.64364114514810
// @description  feederにピアノを追加します！
// @match        *.x-feeder.info/*/
// @exclude      *.x-feeder.info/*/*/*
// @grant        none
// ==/UserScript==
(() => {
  'use strict'
  const set_main = (_isFullScreen) => {
    const ELEMENT_TO_ADD = _isFullScreen ? $('#wrapper') : $('#main_right')
    const holder = $('<div>', {
      text: 'ピアノ'
    }).prependTo(ELEMENT_TO_ADD).css({
      'background-color': 'black',
      'color': 'white',
      'text-align': 'center',
    })
    let g_flag = false
    const btn_holder = $('<div>').appendTo(holder)
    btn_holder.append($('<div>').append($('<input>', {
      type: 'checkbox'
    }).change(function () {
      g_flag = this.checked
    })).append('音を伸ばす（たまに音が止まらないバグあり）'))
    let g_first = 4
    let g_range = 2
    btn_holder.append('最初：').append($('<input>', {
      value: g_first,
      width: '3em'
    }).change(function () {
      g_first = Number($(this).val())
    })).append('　')
    btn_holder.append('範囲：').append($('<input>', {
      value: g_range,
      width: '3em'
    }).change(function () {
      g_range = Number($(this).val())
    })).append('　')
    const piano_holder = $('<div>').appendTo(holder)
    const g_AudioContext_Array = []
    const g_piano_key_array = []
    const reset = () => {
      piano_holder.empty()
      while (g_piano_key_array.length) g_piano_key_array.pop()
      while (g_AudioContext_Array.length) {
        g_AudioContext_Array[g_AudioContext_Array.length - 1].suspend() // 一時停止
        g_AudioContext_Array[g_AudioContext_Array.length - 1].close() // 解放
        g_AudioContext_Array.pop()
      }
    }
    const make_sound = (_hz) => {
      window.AudioContext = window.AudioContext || window.webkitAudioContext; //クロスブラウザ対応
      const audioCtx = new AudioContext()
      const osciillator = audioCtx.createOscillator() //正弦波の音を作成
      osciillator.frequency.value = _hz //ヘルツ（周波数）指定
      const gainNode = audioCtx.createGain()
      gainNode.connect(audioCtx.destination)
      osciillator.connect(gainNode)
      if (_hz) gainNode.gain.value = 1 / (_hz / 400)
      osciillator.connect(gainNode)
      const audioDestination = audioCtx.destination //音の出力先
      gainNode.connect(audioDestination) //出力先のスピーカーに接続
      osciillator.start = osciillator.start || osciillator.noteOn //クロスブラウザ対応
      osciillator.start() // 曲を流す
      audioCtx.suspend() // 一時停止
      return audioCtx
    }
    const GetScaleName = (_i) => {
      switch (_i) {
      case 0:return 'C'
      case 1:return 'C#'
      case 2:return 'D'
      case 3:return 'D#'
      case 4:return 'E'
      case 5:return 'F'
      case 6:return 'F#'
      case 7:return 'G'
      case 8:return 'G#'
      case 9:return 'A'
      case 10:return 'A#'
      case 11:return 'B'
      }
    }
    const main = () => {
      reset()
      for (let i = 0; i < g_range; i++) {
        create_piano(i + g_first)
      }
    }
    const create_piano = (_octave) => {
      const A_Hz = (2 ** _octave) * 27.5
      for (let i = 0; i < 12; i++) {
        const scale = GetScaleName(i) + _octave
        const isSharp = /#/.test(scale)
        const this_Hz = A_Hz * Math.pow(2, (1 / 12) * (i - 9))
        const this_audioCtx = make_sound(this_Hz)
        g_AudioContext_Array.push(this_audioCtx)
        let stopper = false
        const piano_key_elm = $('<button>', {
          text: scale
        }).appendTo(piano_holder).mousedown(function () {
          if (stopper) return
          stopper = true
          document.activeElement.blur()
          this_audioCtx.resume() // 再開
          $(this).css('background-color', 'red')
          if (!g_flag) setTimeout(function () {
            document.activeElement.blur()
            this_audioCtx.suspend() // 一時停止
            piano_key_elm.css('background-color', isSharp ? 'black' : 'white')
          }, 300)
        }).mouseup(function () {
          stopper = false
          document.activeElement.blur()
          this_audioCtx.suspend() // 一時停止
          piano_key_elm.css('background-color', isSharp ? 'black' : 'white')
        }).css({
          'background-color': isSharp ? 'black' : 'white',
          color: isSharp ? 'white' : 'black',
          height: isSharp ? 100 : 200,
          width: 'calc(100% / ' + g_range * 8 + ' - 2px)',
        })
        if (isSharp) {
          const Sharp_width = piano_key_elm.width() * 0.8
          piano_key_elm.css({
            position: 'absolute',
            width: Sharp_width,
            'margin-left': -Sharp_width / 2,
          })
        }
        g_piano_key_array.push(piano_key_elm)
      }
      piano_holder.css({
        position: 'relative'
      })
    }
    document.addEventListener("keydown", (e) => {
      if (!g_piano_key_array[0]) return
      switch (e.key) {
      case 'q':return g_piano_key_array[0].mousedown()
      case '2':return g_piano_key_array[1].mousedown()
      case 'w':return g_piano_key_array[2].mousedown()
      case '3':return g_piano_key_array[3].mousedown()
      case 'e':return g_piano_key_array[4].mousedown()
      case 'r':return g_piano_key_array[5].mousedown()
      case '5':return g_piano_key_array[6].mousedown()
      case 't':return g_piano_key_array[7].mousedown()
      case '6':return g_piano_key_array[8].mousedown()
      case 'y':return g_piano_key_array[9].mousedown()
      case '7':return g_piano_key_array[10].mousedown()
      case 'u':return g_piano_key_array[11].mousedown()
      case 'i':return g_piano_key_array[12].mousedown()
      case '9':return g_piano_key_array[13].mousedown()
      case 'o':return g_piano_key_array[14].mousedown()
      case '0':return g_piano_key_array[15].mousedown()
      case 'p':return g_piano_key_array[16].mousedown()
      case '@':return g_piano_key_array[17].mousedown()
      case '^':return g_piano_key_array[18].mousedown()
      case '[':return g_piano_key_array[19].mousedown()
      case '\\':return g_piano_key_array[20].mousedown()
      case 'Enter':return g_piano_key_array[21].mousedown()
      case 'Backspace':return g_piano_key_array[22].mousedown()
      case 'Escape':return reset()
      }
    })
    document.addEventListener("keyup", (e) => {
      if (!g_piano_key_array[0]) return
      switch (e.key) {
      case 'q':return g_piano_key_array[0].mouseup()
      case '2':return g_piano_key_array[1].mouseup()
      case 'w':return g_piano_key_array[2].mouseup()
      case '3':return g_piano_key_array[3].mouseup()
      case 'e':return g_piano_key_array[4].mouseup()
      case 'r':return g_piano_key_array[5].mouseup()
      case '5':return g_piano_key_array[6].mouseup()
      case 't':return g_piano_key_array[7].mouseup()
      case '6':return g_piano_key_array[8].mouseup()
      case 'y':return g_piano_key_array[9].mouseup()
      case '7':return g_piano_key_array[10].mouseup()
      case 'u':return g_piano_key_array[11].mouseup()
      case 'i':return g_piano_key_array[12].mouseup()
      case '9':return g_piano_key_array[13].mouseup()
      case 'o':return g_piano_key_array[14].mouseup()
      case '0':return g_piano_key_array[15].mouseup()
      case 'p':return g_piano_key_array[16].mouseup()
      case '@':return g_piano_key_array[17].mouseup()
      case '^':return g_piano_key_array[18].mouseup()
      case '[':return g_piano_key_array[19].mouseup()
      case '\\':return g_piano_key_array[20].mouseup()
      case 'Enter':return g_piano_key_array[21].mouseup()
      case 'Backspace':return g_piano_key_array[22].mouseup()
      }
    })
    const add_btn = (_name, _func) => {
      const btn = $('<button>', {
        text: _name
      })
      btn.click(_func)
      btn_holder.append(btn)
      btn_holder.append('　')
      return btn
    }
    add_btn('ピアノ作成', main)
    add_btn('×', reset).css({
      'background-color': 'red',
      'color': 'white',
    })
    _isFullScreen ? add_btn('ミニ画面モード', (() => {
      reset();
      holder.remove();
      set_main(false)
    })) : add_btn('大画面モード', (() => {
      reset();
      holder.remove();
      set_main(true)
    }))
  }
  set_main(false)
})();