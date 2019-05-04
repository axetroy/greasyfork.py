// ==UserScript==
// @namespace   KiohPun
// @name        Multiple Language Translation
// @name:zh-CN  多语言划词翻译
// @description 任意网页上选中词汇后，自动根据选中词汇的语种请求翻译结果
// @version     1.0
// @match       *://*/*
// @grant       GM.xmlHttpRequest
// @grant       GM_xmlhttpRequest
// ==/UserScript==

new (class {
    constructor() {
      this.panel = null;
      this.dot = null;
      this.text = null;
  
      this.onClickDot = this.onClickDot.bind(this);
  
      // 触发划词
      document.addEventListener('mouseup', ({ pageX, pageY }) => {
        const text = window
          .getSelection()
          .toString()
          .trim();
        if (text) {
          this.text = text;
          this.showDot(pageX + 10, pageY + 10);
        }
      });
  
      // 隐藏翻译按钮和结果面板
      document.addEventListener('selectionchange', () => {
        this.dot && this.hideDot();
        this.panel && this.hidePanel();
      });
    }
  
    createDot() {
      const dot = document.createElement('button');
      dot.style.cssText = `
        position: absolute;
        z-index: 9999;
        width: 16px;
        height: 16px;
        min-height: 0;
        padding: 0;
        border: 0;
        border-radius: 50%;
        background-color: rgba(79, 128, 225, 0.9);
        box-shadow: none;
      `;
      dot.addEventListener('mouseup', event => event.stopPropagation());
      dot.addEventListener('click', this.onClickDot);
      document.body.appendChild(dot);
      return dot;
    }
  
    showDot(left, top) {
      if (!this.dot) {
        this.dot = this.createDot(left, top);
      }
      this.dot.style.left = `${left}px`;
      this.dot.style.top = `${top}px`;
      this.dot.style.display = 'block';
    };
  
    hideDot() {
      this.dot.style.display = 'none';
    };
  
    onClickDot({ pageX, pageY }) {
      this.hideDot();
  
      const x = (window.innerWidth - pageX > 220) ? pageX : window.innerWidth - 220;
      this.showPanel(x, pageY);
  
      const { text } = this;
        const requests = [];
        if (this.isLatin(text)) {
          requests.push(
            this.ajax('eng', 'ec', text),
            this.ajax('fr', 'fc', text),
          );
        } else if (this.isKorean(text)) {
          requests.push(this.ajax('ko', 'kc', text));
        } else {
          requests.push(this.ajax('jap', 'newjc', text));
        }
  
        Promise.all(requests)
          .then(responses => responses.map(res => this.handleResponse(res)))
          .then(htmls => htmls.join(''))
          .then(html => this.writePanel(html || '查无结果'))
          .catch((err) => {
            console.log(err);
            this.writePanel('查无结果');
          });
  
    }
  
    createPanel() {
      const panel = document.createElement('div');
      panel.style.cssText = `
        position: absolute;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 180px;
        min-height: 50px;
        padding: 0 8px;
        border: 1px solid #eee;
        background-color: #fff;
        color: #555;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        font-family: "Segoe UI", "Microsoft Yahei", meiryo, sans-serif;
        font-size: 12px;
        line-height: normal;
      `;
      panel.innerHTML = '查询中...';
      document.body.appendChild(panel);
      return panel;
    }
  
    showPanel(left, top) {
      if (!this.panel) {
        this.panel = this.createPanel();
      }
  
      this.panel.style.left = `${left}px`;
      this.panel.style.top = `${top}px`;
      this.panel.style.display = 'flex';
    }
  
    hidePanel() {
      this.panel.style.display = 'none';
      this.panel.innerHTML = '查询中...';
    };
  
    writePanel(html) {
      this.panel.innerHTML = html;
    }
  
    handleResponse(res) {
      if (!res.simple) {
          return null;
      }
      try {
        const meta = this.handleMeta(res);
        const contents = this.handleContent(res);
        return this.template(meta, contents);
      } catch (err) {
        console.log(err);
        return null;
      }
    }
  
    handleMeta({ input, le, simple }) {
      return {
        lang: le,
        phrase: simple.word[0]['return-phrase'] || input,
      };
    }
  
    handleContent(res) {
      switch (res.le) {
        case 'en':
          return this.handleEnglish(res.ec.word, res.simple.word[0]);
        case 'fr':
          return this.handleFrench(res.fc.word);
        case 'ko':
          return this.handleKorean(res.kc.word);
        case 'ja':
          return this.handleJapanese(res.newjc.word);
        default:
          throw new Error('不能处理该种语言');
      }
    }
  
    handleEnglish(ec, simple) {
      return ec.map((item) => {
        const { ukphone = simple.ukphone, usphone = simple.usphone, trs } = item;
  
        const phones = [
          { name: '英', symbol: ukphone },
          { name: '美', symbol: usphone },
        ].filter(({ symbol }) => symbol);
        if (phones.length <= 0 && simple.phone) {
          phones.push({ symbol: simple.phone });
        }
  
        return {
          phones,
          senses: [
            { list: trs.map(({ tr }) => tr.map(trItem => trItem.l.i[0])[0]) }
          ],
        };
      });
    }
  
    handleFrench(fc) {
      return fc.map(({ phone, trs }) => ({
        phones: [{ symbol: phone }],
        senses: [
          { list: trs.map(({ pos, tr }) => `${pos || ''} ${tr.map(trItem => trItem.l.i[0])}`) }
        ],
      }));
    }
  
    handleKorean(word) {
      return [{
        senses: word
          .map(({ trs }) => ({
            type: trs[0].pos,
            list: trs[0].tr.map(item => item.l.i)
          }))
          .filter(({ list }) => typeof list[0][0] === 'string')
      }]
    }
  
    handleJapanese({ head, sense, mPhonicD = [] }) {
      return [{ head, sense }, ...mPhonicD].map(({ head: { pjm, tone }, sense }) => ({
        phones: [{ symbol: pjm, tone }],
        senses: sense.map(({ cx, phrList }) => ({
          type: cx,
          list: phrList.map(({ jmsy }) => jmsy),
        })),
      }));
    }
  
    template({ lang, phrase }, contents) {
      return `
        <div style="width: 100%; margin: 0.5em 0;">
          <div style="border-bottom: 1px solid #f5f5f5; padding-bottom: 4px; margin-bottom: -4px; color: #4f80e1;">
            <b style="font-variant: small-caps;">${lang}</b>
            <span style="margin-left: 4px; font-family: 'Segoe UI', 'Malgun Gothic', meiryo, sans-serif;">${phrase}</span>
          </div>
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${contents.map((content) => this.contentTemplate(content)).join('')}
          </ul>
          <div style="margin-top: 1.2em; text-align: right;">
            <a target="_blank" rel="noopener noreferrer" style="color: #4f80e1; text-decoration: none;" href="http://dict.youdao.com/w/${lang}/${phrase}">查看完整释义</a>
          </div>
        </div>
      `;
    }
  
    contentTemplate({ phones, senses }) {
      return `
        <li style="margin: 8px 0;">
          ${this.phoneTemplate(phones)}
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${this.senseTemplate(senses)}
          </ul>
        </li>
      `;
    }
  
    phoneTemplate(phones) {
      if (phones) {
        return `
          <div style="display: flex; flex-wrap: wrap; margin-bottom: -2px;">
            ${phones.map(({ name = '', symbol, tone ='' }, i) => (
              `<div style="margin-right: ${+!i}em;">
                ${name}[<span style="font-family: 'lucida sans unicode', 'Microsoft Yahei', sans-serif; color: #ff5349">${symbol}</span>]${tone}
              </div>`
            )).join('')}
          </div>
        `;
      }
      return '';
    }
  
    senseTemplate(senses) {
      return senses
        .map(({ type, list }) => `
          <li style="margin: 2px 0">
            ${type ? `<b>[${type}] </b>` : ''}
            <div>${list.join('<br>')}</div>
          </li>
        `)
        .join('');
    }
  
    ajax(...args) {
      const xmlHttpRequest = (typeof GM !== 'undefined') ? GM.xmlHttpRequest : GM_xmlhttpRequest;
      const url = this.getApi(...args);
      return new Promise((resolve, reject) => {
        xmlHttpRequest({
          method: 'GET',
          url,
          onload: res => resolve(JSON.parse(res.response)),
          onerror: reject
        });
      });
    }
  
    getApi(lang, dict, text) {
      return `http://dict.youdao.com/jsonapi?xmlVersion=5.1&le=${lang}&jsonversion=2&q=${text}`;
    }
  
    isLatin(text) {
      return /[a-z\u00C0-\u00F6\u00F8-\u017E]+/i.test(text);
    }
  
    isKorean(text) {
      return /[\uAC00-\uD7A3]+/.test(text);
    }
  })();
  