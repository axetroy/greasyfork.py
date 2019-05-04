// ==UserScript==
// @name         NGA论坛碧蓝幻想表情包
// @namespace    https://gist.github.com/biuuu
// @version      0.0.5
// @description  果てしない空の彼方 煌めく星たちの記憶
// @author       露莉亚
// @match        *://bbs.ngacn.cc/post.php*
// @match        *://ngabbs.com/post.php*
// @match        *://nga.178.com/post.php*
// @match        *://bbs.nga.cn/post.php*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const addStyle = (css) => {
    const style = document.createElement('style')
    style.innerText = css
    document.head.appendChild(style)
  }

  addStyle(`
  .single_ttip2 .div3 > div {
    padding: 4px 4px 0 4px;
  }
  .single_ttip2 .div3 > div:empty {
    display: inline-block;
    padding: 0;
  }
  .gbf-sticker img {
    max-height: 70px;
    cursor: pointer;
  }
  `)

  const stickers = ['./mon_201903/16/fkQ5-7fixK5T8S3c-3c.png', './mon_201903/16/fkQ5-ctycKbT8S3c-3c.png', './mon_201903/16/fkQ5-i23xK9T8S3c-3c.png', './mon_201903/16/fkQ5-1xyeKbT8S3c-3c.png', './mon_201903/16/fkQ5-79gmK9T8S3c-3c.png', './mon_201903/16/fkQ5-ckjyK9T8S3c-3c.png', './mon_201903/16/fkQ5-i1e1KbT8S3c-3c.png', './mon_201903/16/fkQ5-1vihKcT8S3c-3c.png', './mon_201903/16/fkQ5-7fsyKaT8S3c-3c.png', './mon_201903/16/fkQ5-cp02KaT8S3c-3c.png', './mon_201903/16/fkQ5-i8owKbT8S3c-3c.png', './mon_201903/16/fkQ5-2cneKcT8S3c-3c.png', './mon_201903/16/fkQ5-81xoK8T8S3c-3c.png', './mon_201903/16/fkQ5-dngcK9T8S3c-3c.png', './mon_201903/16/fkQ5-jb72KaT8S3c-3c.png', './mon_201903/16/fkQ5-4virK7T8S3c-3c.png', './mon_201903/16/fkQ5-anljKbT8S3c-3c.png', './mon_201903/16/fkQ5-fyjbKbT8S3c-3c.png', './mon_201903/16/fkQ5-l9l0KbT8S3c-3c.png', './mon_201903/16/fkQ5-54ylK9T8S3c-3c.png', './mon_201903/16/fkQ5-bbpeKaT8S3c-3c.png', './mon_201903/16/fkQ5-gncdK8T8S3c-3c.png', './mon_201903/16/fkQ5-l19KaT8S3c-3c.png', './mon_201903/16/fkQ5-5w4oK7T8S3c-3c.png', './mon_201903/16/fkQ5-b8qoK8T8S3c-3c.png', './mon_201903/16/fkQ5-gxmgK8T8S3c-3c.png', './mon_201903/16/fkQ5-v7kK8T8S3c-3c.png', './mon_201903/16/fkQ5-66t2KaT8S3c-3c.png', './mon_201903/16/fkQ5-c0wzK8T8S3c-3c.png', './mon_201903/16/fkQ5-hl30KcT8S3c-3c.png', './mon_201903/16/fkQ5-1rdnKcT8S3c-3c.png', './mon_201903/16/fkQ5-7hjnKbT8S3c-3c.png', './mon_201903/16/fkQ5-cuvfKbT8S3c-3c.png', './mon_201903/16/fkQ5-ika9K9T8S3c-3c.png', './mon_201903/16/fkQ5-2u4rKbT8S3c-3c.png', './mon_201903/16/fkQ5-8ed9KbT8S3c-3c.png', './mon_201903/16/fkQ5-dpcjK9T8S3c-3c.png', './mon_201903/16/fkQ5-j1w3KcT8S3c-3c.png', './mon_201903/16/fkQ5-2z11KbT8S3c-3c.png', './mon_201903/16/fkQ5-8brgKaT8S3c-3c.png', './mon_201903/16/fkQ5-f160K8T8S3c-3c.png', './mon_201903/16/fkQ5-kc5fKaT8S3c-3c.png', './mon_201903/16/fkQ5-4jiwKaT8S3c-3c.png', './mon_201903/16/fkQ5-a6pwK8T8S3c-3c.png', './mon_201903/16/fkQ5-fqd2KbT8S3c-3c.png', './mon_201903/16/fkQ5-la3jK9T8S3c-3c.png', './mon_201903/16/fkQ5-579bKbT8S3c-3c.png', './mon_201903/16/fkQ5-aje3K8T8S3c-3c.png', './mon_201903/16/fkQ5-gdhaK8T8S3c-3c.png', './mon_201903/16/fkQ5-gslKaT8S3c-3c.png', './mon_201903/16/fkQ5-5zemKaT8S3c-3c.png', './mon_201903/16/fkQ5-baw3KaT8S3c-3c.png', './mon_201903/16/fkQ5-gpa4KbT8S3c-3c.png', './mon_201903/16/fkQ5-11ghKbT8S3c-3c.png', './mon_201903/16/fkQ5-6o96KbT8S3c-3c.png', './mon_201903/16/fkQ5-byfpKbT8S3c-3c.png', './mon_201903/16/fkQ5-h8s5KbT8S3c-3c.png', './mon_201903/16/fkQ5-19yjKbT8S3c-3c.png', './mon_201903/16/fkQ5-6ljqKbT8S3c-3c.png', './mon_201903/16/fkQ5-bxp1KaT8S3c-3c.png', './mon_201903/16/fkQ5-i7coKaT8S3c-3c.png', './mon_201903/16/fkQ5-2979K9T8S3c-3c.png', './mon_201903/16/fkQ5-8hqhK8T8S3c-3c.png', './mon_201903/16/fkQ5-dvfhK8T8S3c-3c.png', './mon_201903/16/fkQ5-jv5jK9T8S3c-3c.png', './mon_201903/16/fkQ5-3x3hK8T8S3c-3c.png', './mon_201903/16/fkQ5-9kqmK9T8S3c-3c.png', './mon_201903/16/fkQ5-fpw9KcT8S3c-3c.png', './mon_201903/16/fkQ5-l363KaT8S3c-3c.png', './mon_201903/16/fkQ5-4zopK9T8S3c-3c.png', './mon_201903/16/fkQ5-am0iK8T8S3c-3c.png', './mon_201903/16/fkQ5-gdgrK9T8S3c-3c.png', './mon_201903/16/fkQ5-16zwKaT8S3c-3c.png', './mon_201903/16/fkQ5-6scsKaT8S3c-3c.png', './mon_201903/16/fkQ5-c39qKaT8S3c-3c.png', './mon_201903/16/fkQ5-heutKaT8S3c-3c.png', './mon_201903/16/fkQ5-22iqKcT8S3c-3c.png', './mon_201903/16/fkQ5-7f72KaT8S3c-3c.png', './mon_201903/16/fkQ5-cy2nK9T8S3c-3c.png', './mon_201903/16/fkQ5-jzi9KaT8S3c-3c.png', './mon_201903/16/fkQ5-3v7kKaT8S3c-3c.png', './mon_201903/16/fkQ5-9k71K9T8S3c-3c.png', './mon_201903/16/fkQ5-ewt5KbT8S3c-3c.png', './mon_201903/16/fkQ5-krgyKbT8S3c-3c.png', './mon_201903/16/fkQ5-4qwmKaT8S3c-3c.png', './mon_201903/16/fkQ5-a8sqK9T8S3c-3c.png', './mon_201903/16/fkQ5-fsd3KaT8S3c-3c.png', './mon_201903/16/fkQ5-l6t4K8T8S3c-3c.png', './mon_201903/16/fkQ5-56smK9T8S3c-3c.png', './mon_201903/16/fkQ5-aul6K9T8S3c-3c.png', './mon_201903/16/fkQ5-g6r3K9T8S3c-3c.png', './mon_201903/16/fkQ5-x70KbT8S3c-3c.png', './mon_201903/16/fkQ5-6vjlKaT8S3c-3c.png', './mon_201903/16/fkQ5-c5bxKaT8S3c-3c.png', './mon_201903/16/fkQ5-hrw5KaT8S3c-3c.png', './mon_201903/16/fkQ5-1y8cKaT8S3c-3c.png', './mon_201903/16/fkQ5-978tKaT8S3c-3c.png', './mon_201903/16/fkQ5-emw0KaT8S3c-3c.png', './mon_201903/16/fkQ5-l131KaT8S3c-3c.png', './mon_201903/16/fkQ5-4t1qKcT8S3c-3c.png', './mon_201903/16/fkQ5-cpwdKbT8S3c-3c.png', './mon_201903/16/fkQ5-i36hK9T8S3c-3c.png', './mon_201903/16/fkQ5-1znkKaT8S3c-3c.png', './mon_201903/16/fkQ5-7q8xKaT8S3c-3c.png', './mon_201903/16/fkQ5-dmdtK9T8S3c-3c.png', './mon_201903/16/fkQ5-j2abKbT8S3c-3c.png', './mon_201903/16/fkQ5-gi25KaT8S3c-3c.png', './mon_201903/16/fkQ5-184wKaT8S3c-3c.png', './mon_201903/16/fkQ5-6zalK9T8S3c-3c.png', './mon_201903/16/fkQ5-ck4hK9T8S3c-3c.png', './mon_201903/16/fkQ5-hwvyKaT8S3c-3c.png', './mon_201903/16/fkQ5-1xf0KbT8S3c-3c.png', './mon_201903/16/fkQ5-7itbKaT8S3c-3c.png', './mon_201903/16/fkQ5-d83kKaT8S3c-3c.png', './mon_201903/16/fkQ5-im3iK9T8S3c-3c.png', './mon_201903/16/fkQ5-3lxkKaT8S3c-3c.png', './mon_201903/16/fkQ5-97z3KaT8S3c-3c.png', './mon_201903/16/fkQ5-fbvwKaT8S3c-3c.png', './mon_201903/16/fkQ5-kppjKbT8S3c-3c.png', './mon_201903/16/fkQ5-4nfmKaT8S3c-3c.png', './mon_201903/16/fkQ5-a0oeK9T8S3c-3c.png', './mon_201903/16/fkQ5-fogiKaT8S3c-3c.png', './mon_201903/16/fkQ5-l2cjKaT8S3c-3c.png', './mon_201903/16/fkQ5-557yKbT8S3c-3c.png', './mon_201903/16/fkQ5-aoboKaT8S3c-3c.png', './mon_201903/16/fkQ5-g0cgKbT8S3c-3c.png', './mon_201903/16/fkQ5-leucKcT8S3c-3c.png', './mon_201903/16/fkQ5-5feiKaT8S3c-3c.png', './mon_201903/16/fkQ5-atanK9T8S3c-3c.png', './mon_201903/16/fkQ5-gqb8KaT8S3c-3c.png', './mon_201903/16/fkQ5-11cuK8T8S3c-3c.png', './mon_201903/16/fkQ5-6pi8KaT8S3c-3c.png', './mon_201903/16/fkQ5-d10gKaT8S3c-3c.png', './mon_201903/16/fkQ5-ikmxKbT8S3c-3c.png', './mon_201903/16/fkQ5-2kkbKbT8S3c-3c.png', './mon_201903/16/fkQ5-9rc4KaT8S3c-3c.png', './mon_201903/16/fkQ5-faf9K9T8S3c-3c.png', './mon_201903/16/fkQ5-kotcKbT8S3c-3c.png', './mon_201903/16/fkQ5-4nobKbT8S3c-3c.png', './mon_201903/16/fkQ5-ckh7KbT8S3c-3c.png', './mon_201903/16/fkQ5-i00qK9T8S3c-3c.png', './mon_201903/16/fkQ5-25teK9T8S3c-3c.png', './mon_201903/16/fkQ5-7kteK9T8S3c-3c.png', './mon_201903/16/fkQ5-d14lKaT8S3c-3c.png', './mon_201903/16/fkQ5-jkjiKaT8S3c-3c.png', './mon_201903/16/fkQ5-42hxKaT8S3c-3c.png', './mon_201903/16/fkQ5-9kjhK8T8S3c-3c.png', './mon_201903/16/fkQ5-ezzcK7T8S3c-3c.png', './mon_201903/16/fkQ5-kt2jKaT8S3c-3c.png', './mon_201903/16/fkQ5-4y48KbT8S3c-3c.png', './mon_201903/16/fkQ5-al91KcT8S3c-3c.png', './mon_201903/16/fkQ5-hevrK6T8S3c-3c.png', './mon_201903/16/fkQ5-229pK9T8S3c-3c.png', './mon_201903/16/fkQ5-7ihxK9T8S3c-3c.png', './mon_201903/16/fkQ5-ey3kKcT8S3c-3c.png', './mon_201903/16/fkQ5-koidKbT8S3c-3c.png', './mon_201903/16/fkQ5-4ogbKbT8S3c-3c.png', './mon_201903/16/fkQ5-9yvgK9T8S3c-3c.png', './mon_201903/16/fkQ5-fehgK9T8S3c-3c.png', './mon_201903/16/fkQ5-l14qKaT8S3c-3c.png', './mon_201903/16/fkQ5-4y6bKaT8S3c-3c.png', './mon_201903/16/fkQ5-a95kK9T8S3c-3c.png', './mon_201903/16/fkQ5-g1g3KaT8S3c-3c.png', './mon_201903/16/fkQ5-36tK9T8S3c-3c.png', './mon_201903/16/fkQ5-5xmrKaT8S3c-3c.png', './mon_201903/16/fkQ5-bj9dKaT8S3c-3c.png', './mon_201903/16/fkQ5-h9tmKcT8S3c-3c.png', './mon_201903/16/fkQ5-19a5K9T8S3c-3c.png', './mon_201903/16/fkQ5-6ovqK9T8S3c-3c.png', './mon_201903/16/fkQ5-c0y1KaT8S3c-3c.png', './mon_201903/16/fkQ5-hhptK9T8S3c-3c.png', './mon_201903/16/fkQ5-1e7qKcT8S3c-3c.png', './mon_201903/16/fkQ5-6ssfK9T8S3c-3c.png', './mon_201903/16/fkQ5-c3noKaT8S3c-3c.png', './mon_201903/16/fkQ5-ij47K9T8S3c-3c.png', './mon_201903/16/fkQ5-2cxbKaT8S3c-3c.png', './mon_201903/16/fkQ5-7rucK9T8S3c-3c.png', './mon_201903/16/fkQ5-dc47K9T8S3c-3c.png', './mon_201903/16/fkQ5-ivr4KaT8S3c-3c.png', './mon_201903/16/fkQ5-2tz4K7T8S3c-3c.png', './mon_201903/16/fkQ5-8d2kKaT8S3c-3c.png', './mon_201903/16/fkQ5-dxw5KaT8S3c-3c.png', './mon_201903/16/fkQ5-jen5K7T8S3c-3c.png', './mon_201903/16/fkQ5-4b10K6T8S3c-3c.png', './mon_201903/16/fkQ5-fn1rK9T8S3c-3c.png', './mon_201903/16/fkQ5-kwanKbT8S3c-3c.png', './mon_201903/16/fkQ5-4xdzKaT8S3c-3c.png', './mon_201903/16/fkQ5-abaqKcT8S3c-3c.png', './mon_201903/16/fkQ5-fyeiKbT8S3c-3c.png', './mon_201903/16/fkQ5-l2iKaT8S3c-3c.png', './mon_201903/16/fkQ5-6jg7KaT8S3c-3c.png', './mon_201903/16/fkQ5-bvaqKbT8S3c-3c.png', './mon_201903/16/fkQ5-hz5xK9T8S3c-3c.png', './mon_201903/16/fkQ5-3ugjKbT8S3c-3c.png', './mon_201903/16/fkQ5-983bKaT8S3c-3c.png', './mon_201903/16/fkQ5-g50zKaT8S3c-3c.png', './mon_201903/16/fkQ5-let0KbT8S3c-3c.png', './mon_201903/16/fkQ5-5s62KaT8S3c-3c.png', './mon_201903/16/fkQ5-ba1kKaT8S3c-3c.png', './mon_201903/16/fkQ5-guarKaT8S3c-3c.png', './mon_201903/16/fkQ5-8p5qKaT8S3c-3c.png', './mon_201903/16/fkQ5-e9y2KbT8S3c-3c.png', './mon_201903/16/fkQ5-la8iKaT8S3c-3c.png', './mon_201903/16/fkQ5-5a6oKaT8S3c-3c.png', './mon_201903/16/fkQ5-aqjwKaT8S3c-3c.png', './mon_201903/16/fkQ5-g3flK9T8S3c-3c.png', './mon_201903/16/fkQ5-47dKaT8S3c-3c.png', './mon_201903/16/fkQ5-6871K7T8S3c-3c.png', './mon_201903/16/fkQ5-c0p8KaT8S3c-3c.png', './mon_201903/16/fkQ5-i5fyK9T8S3c-3c.png', './mon_201903/16/fkQ5-1zxbK9T8S3c-3c.png', './mon_201903/16/fkQ5-8h3tK8T8S3c-3c.png', './mon_201903/16/fkQ5-dtuyKaT8S3c-3c.png', './mon_201903/16/fkQ5-jcuiK7T8S3c-3c.png', './mon_201903/16/fkQ5-3f5bKaT8S3c-3c.png', './mon_201903/16/fkQ5-8xuzK9T8S3c-3c.png', './mon_201903/16/fkQ5-ennrK9T8S3c-3c.png', './mon_201903/16/fkQ5-jw96K8T8S3c-3c.png', './mon_201903/16/fkQ5-3xg6K9T8S3c-3c.png', './mon_201903/16/fkQ5-9d87KaT8S3c-3c.png', './mon_201903/16/fkQ5-etufK9T8S3c-3c.png', './mon_201903/16/fkQ5-kr85KaT8S3c-3c.png', './mon_201903/16/fkQ5-4mtbKaT8S3c-3c.png', './mon_201903/16/fkQ5-a3iuK9T8S3c-3c.png', './mon_201903/16/fkQ5-fxvgK9T8S3c-3c.png', './mon_201903/16/fkQ5-l80hK5T8S3c-3c.png', './mon_201903/16/fkQ5-59rwK7T8S3c-3c.png', './mon_201903/16/fkQ5-aqyaK8T8S3c-3c.png', './mon_201903/16/fkQ5-gghrKaT8S3c-3c.png', './mon_201903/16/fkQ5-e5nKbT8S3c-3c.png', './mon_201903/16/fkQ5-5x8jKaT8S3c-3c.png', './mon_201903/16/fkQ5-cihnKbT8S3c-3c.png', './mon_201903/16/fkQ5-i6pvKaT8S3c-3c.png', './mon_201903/16/fkQ5-2bg3K9T8S3c-3c.png', './mon_201903/16/fkQ5-7rmfKbT8S3c-3c.png', './mon_201903/16/fkQ5-d8f6KbT8S3c-3c.png', './mon_201903/16/fkQ5-io5oKaT8S3c-3c.png', './mon_201903/16/fkQ5-2kj7K9T8S3c-3c.png', './mon_201903/16/fkQ5-8e1wKaT8S3c-3c.png', './mon_201903/16/fkQ5-dpimKaT8S3c-3c.png', './mon_201903/16/fkQ5-jfi0K9T8S3c-3c.png', './mon_201903/16/fkQ5-3ipqKaT8S3c-3c.png', './mon_201903/16/fkQ5-9c3xKaT8S3c-3c.png', './mon_201903/16/fkQ5-et97KcT8S3c-3c.png', './mon_201903/16/fkQ5-kb80K9T8S3c-3c.png', './mon_201903/16/fkQ5-4d01KaT8S3c-3c.png', './mon_201903/16/fkQ5-9yghKbT8S3c-3c.png', './mon_201903/16/fkQ5-fctpKaT8S3c-3c.png', './mon_201903/16/fkQ5-ku6yKaT8S3c-3c.png', './mon_201903/16/fkQ5-53dmKaT8S3c-3c.png', './mon_201903/16/fkQ5-ak29KaT8S3c-3c.png', './mon_201903/16/fkQ5-h5zoK9T8S3c-3c.png', './mon_201903/16/fkQ5-128lK9T8S3c-3c.png', './mon_201903/16/fkQ5-6ghaK7T8S3c-3c.png', './mon_201903/16/fkQ5-bywqK8T8S3c-3c.png', './mon_201903/16/fkQ5-hfphK8T8S3c-3c.png', './mon_201903/16/fkQ5-gek5KaT8S3c-3c.png', './mon_201903/16/fkQ5-96qK9T8S3c-3c.png', './mon_201903/16/fkQ5-5sbqK9T8S3c-3c.png', './mon_201903/16/fkQ5-baw7K9T8S3c-3c.png', './mon_201903/16/fkQ5-h6ikK8T8S3c-3c.png'
  ]
  let recentStickers = []
  try {
    recentStickers = JSON.parse(localStorage.getItem('gbf:sticker'))
    if (!Array.isArray(recentStickers)) {
      recentStickers = []
    }
  } catch (e) {}
  window.saveRecentGBFSticker = (sticker) => {
    if (recentStickers.includes(sticker)) return
    recentStickers.push(sticker)
    recentStickers = recentStickers.slice(-10)
    localStorage.setItem('gbf:sticker', JSON.stringify(recentStickers))
  }
  window.setGBFSticker = (btn) => {
    const stickerBox = btn.nextSibling
    if (stickerBox) {
      if (btn.dataset.status === 'show') {
        stickerBox.classList.add('x')
        btn.dataset.status = 'hide'
        return
      } else if (btn.dataset.status === 'hide') {
        stickerBox.classList.remove('x')
        btn.dataset.status = 'show'
        return
      }
      let html = ''
      if (recentStickers.length) {
        recentStickers.forEach(sticker => {
          const src = `https://img.nga.178.com/attachments/${sticker.slice(2)}`
          html += `
          <img onclick="window.saveRecentGBFSticker('${sticker}');postfunc.addText('[img]${sticker}[/img]');postfunc.dialog.w._.hide()" src="${src}">
          `
        })
        html = `<div>${html}</div>`
      }
      stickers.forEach(sticker => {
        const src = `https://img.nga.178.com/attachments/${sticker.slice(2)}`
        html += `
        <img onclick="window.saveRecentGBFSticker('${sticker}');postfunc.addText('[img]${sticker}[/img]');postfunc.dialog.w._.hide()" src="${src}">
        `
      })
      stickerBox.insertAdjacentHTML('beforeend', html)
      btn.dataset.status = 'show'
    }
  }

  const insertBtn = () => {
    if (document.querySelector('button#gbf-sticker')) return
    const box = document.querySelector('#uiAddTag .div3')
    box.insertAdjacentHTML('beforeend', '<button id="gbf-sticker" onclick="window.setGBFSticker(this)">GBF</button><div class="gbf-sticker"></div>')
  }
  const mutationCallback = (mutationsList) => {
    for (let mutation of mutationsList) {
      const type = mutation.type
      const addedNodes = mutation.addedNodes
      if (type === 'childList' && addedNodes.length && addedNodes.length < 2) {
        addedNodes.forEach(node => {
          if (node.id === 'uiAddTag' || (node.classList && node.classList.contains('div3'))) {
            insertBtn()
          }
        })
      }
    }
  }

  const obConfig = {
    subtree: true,
    childList: true
  }

  const targetNode = document.body
  const observer = new MutationObserver(mutationCallback)
  observer.observe(targetNode, obConfig)
})();