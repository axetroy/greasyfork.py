// ==UserScript==
// @name         ficUpdate
// @namespace    ficscript
// @version      2.3.4
// @description  bulk copy-paste all the chapters from Word on ficbook
// @author       Dimava
// @match        https://ficbook.net/home/myfics/*
// @grant        none
// ==/UserScript==

var DEBUG = localStorage.ficUpdateDEBUG;

if (!/\/home\/myfics\/\d+.?$/.test(location.href))
    throw new Error('Для групповой загрузки перейдите на страницу редактирования фанфика!');

q('.edi') && q('.edi').remove();

var ops = document.querySelector('.myfic');
var b1 = elm('button', 'Подготовить');
b1.onclick = function() {
    try {
        prepare();
    } catch (e) {
        err(e);
    }
}
;
var b2 = elm('button', 'Добавить отсутствующие');
b2.onclick = addNewParts;
var b3 = elm('button', 'Обновить');
b3.onclick = updateParts;
var cb = document.createElement('input');
cb.type = 'checkbox';
cb.checked = true;
var l = elm('label', '   ', cb, ' Черновик');
var notPublishedCheckbox = cb;
var text = elm('div');
text.id = 'text';
text.contentEditable = true;
text.style.cssText = 'background:white;border:1px dotted gray; width:49.5%; float:left;';
var text2 = elm('div');
text2.style.cssText = 'background:hsl(0,0%,95%);border:1px dotted gray; width:49.5%; float:right;';
ops.append(elm('div.edi', elm('div', b1, b2, b3, l), elm('br'), elm('div', text, text2)));

var parts, prepared;

if (DEBUG)
    text.innerHTML = localStorage.temp;

function prepare() {
    t = text.innerHTML;
    t1 = t;

    refs = {};

    t = t.replace(/<a\s+[^>]*name="_ftn[^]*?a>/g, s=>{
        refm = s.match(/_ftn(ref)?(\d+)/);
        refn = +refm[2];
        if (refm[1]) {
            refs[refn] = {
                n: refn,
                t: tosupnum(refn),
            };
        }
        return refm[1] ? '' : tosupnum(refn);
    }
    );
    t2 = t;

    t = t.replace(/<div id="ftn(\d+)"[^]*?div>/g, (s,n)=>{
        refs[n].s = htext(s).trim();
        return '';
    }
    );
    t3 = t;

    text2.innerHTML = t;

    if (!t.match(/<h1/))
        return warn('В тексте нет заголовков!');

    t = t.replace(/<(?!\/?(h1|br|p|b|s|i|center|right)[\s|>])[^>]*>/g, '');
    t4 = t;
    // remove bad tags
    t = t.replace(/<(\/?)(h1|br|b|s|i|center|right)(?=[\s|>])[^>]*>/g, '<$1$2>');
    t5 = t;
    // remove attributes
    parts = t.split(/<h1[^>]*>/).map(e=>e.split('</h1>')).slice(1).map(e=>{
        let name = htext(e[0]).replace(/\s+/g, ' ').trim()
          , text = tabber(e[1]);

        o = {
            name,
            text,
            com: '',
            comp: true,
            refs: [],
        };

        text = text.replace(/\s*\/\*\s*([^]*?)\s*\*\/\s*/, (s,a,i,t)=>{
            o.com = a;
            o.comp = i > 100;
            return '';
        }
        );
        let supi = 1;
        text = text.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (s,i,t)=>{
            let n = fromsupnum(s);
            let ref = refs[n];
            ref.n = supi;
            ref.t = tosupnum(supi);
            o.refs.push(ref);
            supi++;

            return ref.t;
        }
        );
        o.text = text;

        return o;
    }
    )
    text2.innerHTML = [].concat(...parts.map(p=>['<br><br><h1>', p.name, '</h1><br>', ((()=>{let t=p.text.replace(/\n/g, '\n<br>');if (!p.com&&!p.refs.length)return t;let com=p.com;let ref=p.refs.map(r=>r.t+htext('&nbsp;')+r.s).join('\n<br>');let brc=com&&ref?'<br><br>':'';return p.comp?t+'<br><br><u>'+ref+brc+com+'</u>':'<u>'+com+brc+ref+'</u><br><br>'+t;})())])).join('\n');
    prepared = true;
    return parts;

}

function tosupnum(t) {
    num = '⁰¹²³⁴⁵⁶⁷⁸⁹'.split('');
    return (t + '').match(/\d/g).map(e=>num[e]).join('');
}

function fromsupnum(t) {
    num = '⁰¹²³⁴⁵⁶⁷⁸⁹'.split('');
    return +(t + '').match(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g).map(e=>num.indexOf(e)).join('');
}

async function addPart(part) {

    let f = elm('iframe');
    ops.prepend(f)

    let res;
    let p = new Promise(r=>res = r);
    f.addEventListener('load', res);
    f.addEventListener('load', (res=>console.log('loaded')));

    f.src = q('.add-part a').href

    f.style.cssText = 'height:200px;width:100%'

    await p;

    let d = f.contentWindow.document;
    q('[name=title]', d).value = part.name;
    q('#content', d).value = part.text;
    q('#not_published_chb', d).checked = notPublishedCheckbox.checked;

    q('[name=comment_direction', d).value = part.comp ? 0 : 1;
    let brc = part.com && part.ref.length ? '\n\n' : '';
    let ref = part.refs.map(r=>r.t + htext('&nbsp;') + r.s).join('\n');
    let com = part.comp ? ref + brc + part.com : part.com + brc + ref;
    q('[name=comment]', d).value = com;

    p = new Promise(r=>res = r);
    f.addEventListener('load', res);
    f.addEventListener('load', (res=>console.log('loaded')));
    q('#savePartForm [type=submit]', d).click();
    await p;

    f.remove()
    done('Часть добвлена', part.name);

}
async function updatePart(part) {

    let f = elm('iframe');
    ops.prepend(f)

    let res;
    let p = new Promise(r=>res = r);
    f.addEventListener('load', res);
    f.addEventListener('load', (res=>console.log('loaded')));

    let tts = partAdded(part);
    if (!tts) {
        return err('Часть ещё не добавлена!', part.name)
    }
    f.src = tts.href;

    f.style.cssText = 'height:200px;width:100%'

    await p;

    let d = f.contentWindow.document;
    let unchanged = true;
    let brc = part.com && part.refs.length ? '\n\n' : '';
    let ref = part.refs.map(r=>r.t + htext('&nbsp;') + r.s).join('\n');
    let com = part.comp ? ref + brc + part.com : part.com + brc + ref;

    unchanged = unchanged && q('[name=title]', d).value == part.name;
    unchanged = unchanged && q('#content', d).value == part.text;
    unchanged = unchanged && q('[name=comment_direction', d).value == (part.comp ? '0' : '1');
    unchanged = unchanged && q('[name=comment]', d).value == com;

    if (unchanged) {
        info('Часть не изменилась', part.name);
        f.remove();
        return;
    }

    q('[name=title]', d).value = part.name;
    q('#content', d).value = part.text;

    q('[name=comment_direction', d).value = part.comp ? 0 : 1;
    q('[name=comment]', d).value = com;

    p = new Promise(r=>res = r);
    f.addEventListener('load', res);
    f.addEventListener('load', (res=>console.log('loaded')));
    q('#savePartForm [type=submit]', d).click();
    await p;

    f.remove();
    done('Часть изменена', part.name);
}

function htext(h) {
    let a = document.createElement('a');
    a.innerHTML = h;
    return a.innerText;
}

function elm(sel, ...childs) {
    let el = document.createElement(sel.match(/^[a-zA-Z\-_]+/)[0]);
    (sel.match(/\.[a-zA-Z\-_]+/) || []).forEach(c=>el.classList.add(c.replace(/\./, '')));
    if (childs.length)
        el.append(...childs);
    return el;
}

function tabber(s) {
    let hTexts = {};

    function hText(s) {
        if (hTexts[s])
            return hTexts[s];
        let a = document.createElement('a');
        a.innerHTML = s;
        return hTexts[s] = a.innerText;
    }
    const nbsp = '\xa0';
    //hText('&nbsp;');
    const emsp = '\u2003';
    //hText('&emsp;');
    const ndash = '\u2013';
    //hText('&ndash;');
    const replacers = [[/\n/g, ' '], [/^\s+|\s+$/gm, '\n\n\n'], [/&[^;]{2,7};/g, hText], [/<br>|<.div><div[^>]*>|<.div>|<div[^>]*>/g, '\n'], [/<p[^>]*(center|right)[^>]*>([^]*?)<\/p>/g, '\n<$1>\n$2\n</$1>\n'], [/<\/p>\s*<p[^>]*>/g, '\n'], [/<\/p>\s*|\s*<p[^>]*>/g, '\n'], [/<script>[^]*?<.script>/, ''], [/\s*\n{4,}/g, '\n\n\n'], [/(\s*)(<(b|i|s)>)/g, '$2$1'], [/(^|[^\.])(…|\.{2,4}(?!\.))(?!\n\s)? /gm, '$1… '], [/(–|—|―)/gm, ' - '], [/--?(?![\-\wа-яёА-ЯЁ])|([^\-\wа-яёА-ЯЁ])-(?![\->\w])/g, `$1 - `], [/^((?=.)\s)*/gm, emsp + emsp], [/((?!\n)\s)+-\s+/gm, ' ' + ndash + nbsp], [/^\s*–/gm, emsp + nbsp + ndash], [/\n<center>\n([^]*?)\n<\/center>\n/g, s=>s.replace(/^\s*/gm, '')], [/\n<right>\n([^]*?)\n<\/right>\n/g, s=>s.replace(/^\s*/gm, '')], [/\s*<center>\s*([*][\s*]*[*])\s*<\/center>\n*|\n+\s*([*][\s*]*[*])\s*\n+/g, '\n\n\n<center>\n$1$2\n</center>\n\n'], [/\n(<.?(center|right)>)\n/g, '$1'], [/(<(b|i|s)>)(\s*)/g, '$3$1'], [/<(?!\/?(b|i|s|center|right))/g, '&lt;'], [/^\s*\n|\n\s*$/g, '']];
    replacers.forEach(rpl=>{
        s = s.replace(rpl[0], rpl[1]);
    }
    );
    return s;
}
function partAdded(part) {
    return qq('.part .title a').find(e=>e.innerText.replace(/\s/g, '') == part.name.replace(/\s/g, ''));
}

function q(a, b=document) {
    return b.querySelector(a);
}
function qq(a, b=document) {
    return [...b.querySelectorAll(a)];
}

function done(...a) {
    console.log(...a),
    toastr.success(...a);
    return a[0];
}
function info(...a) {
    console.log(...a),
    toastr.info(...a);
    return a[0];
}
function warn(...a) {
    console.warn(...a),
    toastr.warning(...a);
    return a[0];
}
function err(...a) {
    console.error(...a),
    toastr.error(...a);
    return a[0];
}

async function addNewParts() {
    parts || prepare();
    let toAdd = parts.filter(p=>!partAdded(p));
    for (let i = 0; i < toAdd.length; i++) {
        await addPart(toAdd[i]);
    }
    info('Все части добавлены')
}

async function updateParts() {
    parts || prepare();
    let toUpd = parts.filter(partAdded);
    for (let i = 0; i < toUpd.length; i++) {
        await updatePart(toUpd[i]);
    }
    info('Все части обновлены')
}
