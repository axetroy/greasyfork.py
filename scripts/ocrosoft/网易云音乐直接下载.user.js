// ==UserScript==
// @name              网易云音乐直接下载
// @namespace         https://www.ocrosoft.com/
// @description       在单曲页面显示歌词、翻译、封面、MV、歌曲下载链接并以高音质试听。同时支持歌单、专辑等页面直接下载单曲、封面、歌词(压缩包)。如遇到错误，请阅读附加信息后进行反馈。
// @match             *://music.163.com/*
// @grant             GM.xmlHttpRequest
// @grant             GM_xmlhttpRequest
// @version           3.87
// @author            ocrosoft
// @connect           126.net
// @connect           163.com
// @connect           172.*
// @license           GPLV2
// @compatible        Chrome
// @compatible        FireFox
// @require           https://cdn.bootcss.com/crypto-js/3.1.9/core.min.js
// @require           https://cdn.bootcss.com/crypto-js/3.1.9/crypto-js.js
// @require           https://cdn.bootcss.com/crypto-js/3.1.9/aes.min.js
// @require           https://cdn.bootcss.com/crypto-js/3.1.9/enc-utf8.js
// @require           https://cdn.bootcss.com/crypto-js/3.1.9/enc-base64.min.js
// @require           https://cdn.bootcss.com/jszip/3.1.5/jszip.min.js
// @require           https://cdn.bootcss.com/FileSaver.js/1.3.8/FileSaver.js
// ==/UserScript==
var GM__xmlHttpRequest;
if("undefined" != typeof(GM_xmlhttpRequest)){
    GM__xmlHttpRequest = GM_xmlhttpRequest;
} else {
    GM__xmlHttpRequest = GM.xmlHttpRequest;
}

/*
 * GreasyFork不允许的库，直接代码贴进来
 */

var biRadixBase = 2;
var biRadixBits = 16;
var bitsPerDigit = biRadixBits;
var biRadix = 1 << 16;
var biHalfRadix = biRadix >>> 1;
var biRadixSquared = biRadix * biRadix;
var maxDigitVal = biRadix - 1;
var maxInteger = 9999999999999998;
var maxDigits;
var ZERO_ARRAY;
var bigZero, bigOne;

function setMaxDigits(value) {
    maxDigits = value;
    ZERO_ARRAY = new Array(maxDigits);
    for (var iza = 0; iza < ZERO_ARRAY.length; iza++) ZERO_ARRAY[iza] = 0;
    bigZero = new BigInt();
    bigOne = new BigInt();
    bigOne.digits[0] = 1;
}
setMaxDigits(20);
var dpl10 = 15;
var lr10 = biFromNumber(1000000000000000);

function BigInt(flag) {
    if (typeof flag == "boolean" && flag == true) {
        this.digits = null;
    } else {
        this.digits = ZERO_ARRAY.slice(0);
    }
    this.isNeg = false;
}
function biFromDecimal(s) {
    var isNeg = s.charAt(0) == '-';
    var i = isNeg ? 1 : 0;
    var result;
    while (i < s.length && s.charAt(i) == '0')++i;
    if (i == s.length) {
        result = new BigInt();
    } else {
        var digitCount = s.length - i;
        var fgl = digitCount % dpl10;
        if (fgl == 0) fgl = dpl10;
        result = biFromNumber(Number(s.substr(i, fgl)));
        i += fgl;
        while (i < s.length) {
            result = biAdd(biMultiply(result, lr10), biFromNumber(Number(s.substr(i, dpl10))));
            i += dpl10;
        }
        result.isNeg = isNeg;
    }
    return result;
}
function biCopy(bi) {
    var result = new BigInt(true);
    result.digits = bi.digits.slice(0);
    result.isNeg = bi.isNeg;
    return result;
}
function biFromNumber(i) {
    var result = new BigInt();
    result.isNeg = i < 0;
    i = Math.abs(i);
    var j = 0;
    while (i > 0) {
        result.digits[j++] = i & maxDigitVal;
        i >>= biRadixBits;
    }
    return result;
}
function reverseStr(s) {
    var result = "";
    for (var i = s.length - 1; i > -1; --i) {
        result += s.charAt(i);
    }
    return result;
}
var hexatrigesimalToChar = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');

function biToString(x, radix) {
    var b = new BigInt();
    b.digits[0] = radix;
    var qr = biDivideModulo(x, b);
    var result = hexatrigesimalToChar[qr[1].digits[0]];
    while (biCompare(qr[0], bigZero) == 1) {
        qr = biDivideModulo(qr[0], b);
        digit = qr[1].digits[0];
        result += hexatrigesimalToChar[qr[1].digits[0]];
    }
    return (x.isNeg ? "-" : "") + reverseStr(result);
}
function biToDecimal(x) {
    var b = new BigInt();
    b.digits[0] = 10;
    var qr = biDivideModulo(x, b);
    var result = String(qr[1].digits[0]);
    while (biCompare(qr[0], bigZero) == 1) {
        qr = biDivideModulo(qr[0], b);
        result += String(qr[1].digits[0]);
    }
    return (x.isNeg ? "-" : "") + reverseStr(result);
}
var hexToChar = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');

function digitToHex(n) {
    var mask = 0xf;
    var result = "";
    for (i = 0; i < 4; ++i) {
        result += hexToChar[n & mask];
        n >>>= 4;
    }
    return reverseStr(result);
}
function biToHex(x) {
    var result = "";
    var n = biHighIndex(x);
    for (var i = biHighIndex(x); i > -1; --i) {
        result += digitToHex(x.digits[i]);
    }
    return result;
}
function charToHex(c) {
    var ZERO = 48;
    var NINE = ZERO + 9;
    var littleA = 97;
    var littleZ = littleA + 25;
    var bigA = 65;
    var bigZ = 65 + 25;
    var result;
    if (c >= ZERO && c <= NINE) {
        result = c - ZERO;
    } else if (c >= bigA && c <= bigZ) {
        result = 10 + c - bigA;
    } else if (c >= littleA && c <= littleZ) {
        result = 10 + c - littleA;
    } else {
        result = 0;
    }
    return result;
}
function hexToDigit(s) {
    var result = 0;
    var sl = Math.min(s.length, 4);
    for (var i = 0; i < sl; ++i) {
        result <<= 4;
        result |= charToHex(s.charCodeAt(i));
    }
    return result;
}
function biFromHex(s) {
    var result = new BigInt();
    var sl = s.length;
    for (var i = sl, j = 0; i > 0; i -= 4, ++j) {
        result.digits[j] = hexToDigit(s.substr(Math.max(i - 4, 0), Math.min(i, 4)));
    }
    return result;
}
function biFromString(s, radix) {
    var isNeg = s.charAt(0) == '-';
    var istop = isNeg ? 1 : 0;
    var result = new BigInt();
    var place = new BigInt();
    place.digits[0] = 1;
    for (var i = s.length - 1; i >= istop; i--) {
        var c = s.charCodeAt(i);
        var digit = charToHex(c);
        var biDigit = biMultiplyDigit(place, digit);
        result = biAdd(result, biDigit);
        place = biMultiplyDigit(place, radix);
    }
    result.isNeg = isNeg;
    return result;
}
function biToBytes(x) {
    var result = "";
    for (var i = biHighIndex(x); i > -1; --i) {
        result += digitToBytes(x.digits[i]);
    }
    return result;
}
function digitToBytes(n) {
    var c1 = String.fromCharCode(n & 0xff);
    n >>>= 8;
    var c2 = String.fromCharCode(n & 0xff);
    return c2 + c1;
}
function biDump(b) {
    return (b.isNeg ? "-" : "") + b.digits.join(" ");
}
function biAdd(x, y) {
    var result;
    if (x.isNeg != y.isNeg) {
        y.isNeg = !y.isNeg;
        result = biSubtract(x, y);
        y.isNeg = !y.isNeg;
    } else {
        result = new BigInt();
        var c = 0;
        var n;
        for (var i = 0; i < x.digits.length; ++i) {
            n = x.digits[i] + y.digits[i] + c;
            result.digits[i] = n & 0xffff;
            c = Number(n >= biRadix);
        }
        result.isNeg = x.isNeg;
    }
    return result;
}
function biSubtract(x, y) {
    var result;
    if (x.isNeg != y.isNeg) {
        y.isNeg = !y.isNeg;
        result = biAdd(x, y);
        y.isNeg = !y.isNeg;
    } else {
        result = new BigInt();
        var n, c;
        c = 0;
        for (var i = 0; i < x.digits.length; ++i) {
            n = x.digits[i] - y.digits[i] + c;
            result.digits[i] = n & 0xffff;
            if (result.digits[i] < 0) result.digits[i] += biRadix;
            c = 0 - Number(n < 0);
        }
        if (c == -1) {
            c = 0;
            for (var i = 0; i < x.digits.length; ++i) {
                n = 0 - result.digits[i] + c;
                result.digits[i] = n & 0xffff;
                if (result.digits[i] < 0) result.digits[i] += biRadix;
                c = 0 - Number(n < 0);
            }
            result.isNeg = !x.isNeg;
        } else {
            result.isNeg = x.isNeg;
        }
    }
    return result;
}
function biHighIndex(x) {
    var result = x.digits.length - 1;
    while (result > 0 && x.digits[result] == 0)--result;
    return result;
}
function biNumBits(x) {
    var n = biHighIndex(x);
    var d = x.digits[n];
    var m = (n + 1) * bitsPerDigit;
    var result;
    for (result = m; result > m - bitsPerDigit; --result) {
        if ((d & 0x8000) != 0) break;
        d <<= 1;
    }
    return result;
}
function biMultiply(x, y) {
    var result = new BigInt();
    var c;
    var n = biHighIndex(x);
    var t = biHighIndex(y);
    var u, uv, k;
    for (var i = 0; i <= t; ++i) {
        c = 0;
        k = i;
        for (j = 0; j <= n; ++j, ++k) {
            uv = result.digits[k] + x.digits[j] * y.digits[i] + c;
            result.digits[k] = uv & maxDigitVal;
            c = uv >>> biRadixBits;
        }
        result.digits[i + n + 1] = c;
    }
    result.isNeg = x.isNeg != y.isNeg;
    return result;
}
function biMultiplyDigit(x, y) {
    var n, c, uv;
    result = new BigInt();
    n = biHighIndex(x);
    c = 0;
    for (var j = 0; j <= n; ++j) {
        uv = result.digits[j] + x.digits[j] * y + c;
        result.digits[j] = uv & maxDigitVal;
        c = uv >>> biRadixBits;
    }
    result.digits[1 + n] = c;
    return result;
}
function arrayCopy(src, srcStart, dest, destStart, n) {
    var m = Math.min(srcStart + n, src.length);
    for (var i = srcStart, j = destStart; i < m; ++i, ++j) {
        dest[j] = src[i];
    }
}
var highBitMasks = new Array(0x0000, 0x8000, 0xC000, 0xE000, 0xF000, 0xF800, 0xFC00, 0xFE00, 0xFF00, 0xFF80, 0xFFC0, 0xFFE0, 0xFFF0, 0xFFF8, 0xFFFC, 0xFFFE, 0xFFFF);

function biShiftLeft(x, n) {
    var digitCount = Math.floor(n / bitsPerDigit);
    var result = new BigInt();
    arrayCopy(x.digits, 0, result.digits, digitCount, result.digits.length - digitCount);
    var bits = n % bitsPerDigit;
    var rightBits = bitsPerDigit - bits;
    for (var i = result.digits.length - 1, i1 = i - 1; i > 0; --i, --i1) {
        result.digits[i] = ((result.digits[i] << bits) & maxDigitVal) | ((result.digits[i1] & highBitMasks[bits]) >>> (rightBits));
    }
    result.digits[0] = ((result.digits[i] << bits) & maxDigitVal);
    result.isNeg = x.isNeg;
    return result;
}
var lowBitMasks = new Array(0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F, 0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF, 0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF);

function biShiftRight(x, n) {
    var digitCount = Math.floor(n / bitsPerDigit);
    var result = new BigInt();
    arrayCopy(x.digits, digitCount, result.digits, 0, x.digits.length - digitCount);
    var bits = n % bitsPerDigit;
    var leftBits = bitsPerDigit - bits;
    for (var i = 0, i1 = i + 1; i < result.digits.length - 1; ++i, ++i1) {
        result.digits[i] = (result.digits[i] >>> bits) | ((result.digits[i1] & lowBitMasks[bits]) << leftBits);
    }
    result.digits[result.digits.length - 1] >>>= bits;
    result.isNeg = x.isNeg;
    return result;
}
function biMultiplyByRadixPower(x, n) {
    var result = new BigInt();
    arrayCopy(x.digits, 0, result.digits, n, result.digits.length - n);
    return result;
}
function biDivideByRadixPower(x, n) {
    var result = new BigInt();
    arrayCopy(x.digits, n, result.digits, 0, result.digits.length - n);
    return result;
}
function biModuloByRadixPower(x, n) {
    var result = new BigInt();
    arrayCopy(x.digits, 0, result.digits, 0, n);
    return result;
}
function biCompare(x, y) {
    if (x.isNeg != y.isNeg) {
        return 1 - 2 * Number(x.isNeg);
    }
    for (var i = x.digits.length - 1; i >= 0; --i) {
        if (x.digits[i] != y.digits[i]) {
            if (x.isNeg) {
                return 1 - 2 * Number(x.digits[i] > y.digits[i]);
            } else {
                return 1 - 2 * Number(x.digits[i] < y.digits[i]);
            }
        }
    }
    return 0;
}
function biDivideModulo(x, y) {
    var nb = biNumBits(x);
    var tb = biNumBits(y);
    var origYIsNeg = y.isNeg;
    var q, r;
    if (nb < tb) {
        if (x.isNeg) {
            q = biCopy(bigOne);
            q.isNeg = !y.isNeg;
            x.isNeg = false;
            y.isNeg = false;
            r = biSubtract(y, x);
            x.isNeg = true;
            y.isNeg = origYIsNeg;
        } else {
            q = new BigInt();
            r = biCopy(x);
        }
        return new Array(q, r);
    }
    q = new BigInt();
    r = x;
    var t = Math.ceil(tb / bitsPerDigit) - 1;
    var lambda = 0;
    while (y.digits[t] < biHalfRadix) {
        y = biShiftLeft(y, 1);
        ++lambda;
        ++tb;
        t = Math.ceil(tb / bitsPerDigit) - 1;
    }
    r = biShiftLeft(r, lambda);
    nb += lambda;
    var n = Math.ceil(nb / bitsPerDigit) - 1;
    var b = biMultiplyByRadixPower(y, n - t);
    while (biCompare(r, b) != -1) {
        ++q.digits[n - t];
        r = biSubtract(r, b);
    }
    for (var i = n; i > t; --i) {
        var ri = (i >= r.digits.length) ? 0 : r.digits[i];
        var ri1 = (i - 1 >= r.digits.length) ? 0 : r.digits[i - 1];
        var ri2 = (i - 2 >= r.digits.length) ? 0 : r.digits[i - 2];
        var yt = (t >= y.digits.length) ? 0 : y.digits[t];
        var yt1 = (t - 1 >= y.digits.length) ? 0 : y.digits[t - 1];
        if (ri == yt) {
            q.digits[i - t - 1] = maxDigitVal;
        } else {
            q.digits[i - t - 1] = Math.floor((ri * biRadix + ri1) / yt);
        }
        var c1 = q.digits[i - t - 1] * ((yt * biRadix) + yt1);
        var c2 = (ri * biRadixSquared) + ((ri1 * biRadix) + ri2);
        while (c1 > c2) {
            --q.digits[i - t - 1];
            c1 = q.digits[i - t - 1] * ((yt * biRadix) | yt1);
            c2 = (ri * biRadix * biRadix) + ((ri1 * biRadix) + ri2);
        }
        b = biMultiplyByRadixPower(y, i - t - 1);
        r = biSubtract(r, biMultiplyDigit(b, q.digits[i - t - 1]));
        if (r.isNeg) {
            r = biAdd(r, b);
            --q.digits[i - t - 1];
        }
    }
    r = biShiftRight(r, lambda);
    q.isNeg = x.isNeg != origYIsNeg;
    if (x.isNeg) {
        if (origYIsNeg) {
            q = biAdd(q, bigOne);
        } else {
            q = biSubtract(q, bigOne);
        }
        y = biShiftRight(y, lambda);
        r = biSubtract(y, r);
    }
    if (r.digits[0] == 0 && biHighIndex(r) == 0) r.isNeg = false;
    return new Array(q, r);
}
function biDivide(x, y) {
    return biDivideModulo(x, y)[0];
}
function biModulo(x, y) {
    return biDivideModulo(x, y)[1];
}
function biMultiplyMod(x, y, m) {
    return biModulo(biMultiply(x, y), m);
}
function biPow(x, y) {
    var result = bigOne;
    var a = x;
    while (true) {
        if ((y & 1) != 0) result = biMultiply(result, a);
        y >>= 1;
        if (y == 0) break;
        a = biMultiply(a, a);
    }
    return result;
}
function biPowMod(x, y, m) {
    var result = bigOne;
    var a = x;
    var k = y;
    while (true) {
        if ((k.digits[0] & 1) != 0) result = biMultiplyMod(result, a, m);
        k = biShiftRight(k, 1);
        if (k.digits[0] == 0 && biHighIndex(k) == 0) break;
        a = biMultiplyMod(a, a, m);
    }
    return result;
}
function BarrettMu(m) {
    this.modulus = biCopy(m);
    this.k = biHighIndex(this.modulus) + 1;
    var b2k = new BigInt();
    b2k.digits[2 * this.k] = 1;
    this.mu = biDivide(b2k, this.modulus);
    this.bkplus1 = new BigInt();
    this.bkplus1.digits[this.k + 1] = 1;
    this.modulo = BarrettMu_modulo;
    this.multiplyMod = BarrettMu_multiplyMod;
    this.powMod = BarrettMu_powMod;
}
function BarrettMu_modulo(x) {
    var q1 = biDivideByRadixPower(x, this.k - 1);
    var q2 = biMultiply(q1, this.mu);
    var q3 = biDivideByRadixPower(q2, this.k + 1);
    var r1 = biModuloByRadixPower(x, this.k + 1);
    var r2term = biMultiply(q3, this.modulus);
    var r2 = biModuloByRadixPower(r2term, this.k + 1);
    var r = biSubtract(r1, r2);
    if (r.isNeg) {
        r = biAdd(r, this.bkplus1);
    }
    var rgtem = biCompare(r, this.modulus) >= 0;
    while (rgtem) {
        r = biSubtract(r, this.modulus);
        rgtem = biCompare(r, this.modulus) >= 0;
    }
    return r;
}
function BarrettMu_multiplyMod(x, y) {
    var xy = biMultiply(x, y);
    return this.modulo(xy);
}
function BarrettMu_powMod(x, y) {
    var result = new BigInt();
    result.digits[0] = 1;
    var a = x;
    var k = y;
    while (true) {
        if ((k.digits[0] & 1) != 0) result = this.multiplyMod(result, a);
        k = biShiftRight(k, 1);
        if (k.digits[0] == 0 && biHighIndex(k) == 0) break;
        a = this.multiplyMod(a, a);
    }
    return result;
}
var RSAAPP = {};
RSAAPP.NoPadding = "NoPadding";
RSAAPP.PKCS1Padding = "PKCS1Padding";
RSAAPP.RawEncoding = "RawEncoding";
RSAAPP.NumericEncoding = "NumericEncoding";
function RSAKeyPair(encryptionExponent, decryptionExponent, modulus, keylen) {
    this.e = biFromHex(encryptionExponent);
    this.d = biFromHex(decryptionExponent);
    this.m = biFromHex(modulus);
    if (typeof(keylen) != 'number') {
        this.chunkSize = 2 * biHighIndex(this.m);
    } else {
        this.chunkSize = keylen / 8;
    }
    this.radix = 16;
    this.barrett = new BarrettMu(this.m);
}
function encryptedString(key, s, pad, encoding) {
    var a = new Array();
    var sl = s.length;
    var i, j, k;
    var padtype;
    var encodingtype;
    var rpad;
    var al;
    var result = "";
    var block;
    var crypt;
    var text;
    if (typeof(pad) == 'string') {
        if (pad == RSAAPP.NoPadding) {
            padtype = 1;
        } else if (pad == RSAAPP.PKCS1Padding) {
            padtype = 2;
        } else {
            padtype = 0;
        }
    } else {
        padtype = 0;
    }
    if (typeof(encoding) == 'string' && encoding == RSAAPP.RawEncoding) {
        encodingtype = 1;
    } else {
        encodingtype = 0;
    }
    if (padtype == 1) {
        if (sl > key.chunkSize) {
            sl = key.chunkSize;
        }
    } else if (padtype == 2) {
        if (sl > (key.chunkSize - 11)) {
            sl = key.chunkSize - 11;
        }
    }
    i = 0;
    if (padtype == 2) {
        j = sl - 1;
    } else {
        j = key.chunkSize - 1;
    }
    while (i < sl) {
        if (padtype) {
            a[j] = s.charCodeAt(i);
        } else {
            a[i] = s.charCodeAt(i);
        }
        i++;
        j--;
    }
    if (padtype == 1) {
        i = 0;
    }
    j = key.chunkSize - (sl % key.chunkSize);
    while (j > 0) {
        if (padtype == 2) {
            rpad = Math.floor(Math.random() * 256);
            while (!rpad) {
                rpad = Math.floor(Math.random() * 256);
            }
            a[i] = rpad;
        } else {
            a[i] = 0;
        }
        i++;
        j--;
    }
    if (padtype == 2) {
        a[sl] = 0;
        a[key.chunkSize - 2] = 2;
        a[key.chunkSize - 1] = 0;
    }
    al = a.length;
    for (i = 0; i < al; i += key.chunkSize) {
        block = new BigInt();
        j = 0;
        for (k = i; k < (i + key.chunkSize); ++j) {
            block.digits[j] = a[k++];
            block.digits[j] += a[k++] << 8;
        }
        crypt = key.barrett.powMod(block, key.e);
        if (encodingtype == 1) {
            text = biToBytes(crypt);
        } else {
            text = (key.radix == 16) ? biToHex(crypt) : biToString(crypt, key.radix);
        }
        result += text;
    }
    return result;
}
function decryptedString(key, c) {
    var blocks = c.split(" ");
    var b;
    var i, j;
    var bi;
    var result = "";
    for (i = 0; i < blocks.length; ++i) {
        if (key.radix == 16) {
            bi = biFromHex(blocks[i]);
        } else {
            bi = biFromString(blocks[i], key.radix);
        }
        b = key.barrett.powMod(bi, key.d);
        for (j = 0; j <= biHighIndex(b); ++j) {
            result += String.fromCharCode(b.digits[j] & 255, b.digits[j] >> 8);
        }
    }
    if (result.charCodeAt(result.length - 1) == 0) {
        result = result.substring(0, result.length - 1);
    }
    return (result);
}

/*
 * 部分代码修改自 https://greasyfork.org/zh-CN/scripts/10548
 */

var modulus = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7' +
    'b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280' +
    '104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932' +
    '575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b' +
    '3ece0462db0a22b8e7';
var nonce = '0CoJUm6Qyw8W8jud';
var pubKey = '010001';

function createSecretKey(size){
    return (Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2)).substring(0,16);
}

function aesEncrypt(text, secKey){
    secKey = CryptoJS.enc.Utf8.parse(secKey);
    text = CryptoJS.enc.Utf8.parse(text);
    var encrypted = CryptoJS.AES.encrypt(text, secKey, {
        iv: CryptoJS.enc.Utf8.parse('0102030405060708'),
        mode: CryptoJS.mode.CBC
    });
    encrypted = encrypted.toString();
    return encrypted;
}

function rsaEncrypt(text, pubKey, modulus){
    setMaxDigits(256);
    var keys = new RSAKeyPair(pubKey, "", modulus);
    var encText = encryptedString(keys, text);
    return encText;
}

function encrypted_request(text){
    text = '{"ids": [' + text.ids + '], "br": 320000, "csrf_token": ""}';
    var secKey = createSecretKey(16);
    var encText = aesEncrypt(aesEncrypt(text, nonce), secKey);
    var encSecKey = rsaEncrypt(secKey, pubKey, modulus);
    var data = 'params=' + encodeURIComponent(encText) + '&encSecKey=' + encodeURIComponent(encSecKey);
    return data;
}
function getMusicLink(id, callback){
    var req = GM__xmlHttpRequest({
        method: 'POST',
        url: 'https://music.163.com/weapi/song/enhance/player/url?csrf_token=',
        headers: {
            'Accept':'*/*',
            'Accept-Encoding':'gzip, deflate',
            'Accept-Language':'zh-CN,zh;q=0.8',
            'Connection':'keep-alive',
            'Content-Type':'application/x-www-form-urlencoded',
            'Host':'music.163.com',
            'Origin':'http://music.163.com',
            'Referer':'http://music.163.com/',
            'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36',
            'Cookie': document.cookie + ';os=pc'
        },
        data: encrypted_request({'ids': id[0], 'br': 320000, 'csrf_token': ''}),
        onreadystatechange: function(res) {
            if (res.readyState == 4) {
                if (res.status == 200) {
                    callback(res.response);
                }
            }
        }
    });
}

(function (root) {
    'use strict';
    /*
     * @opentdoor 的跨域下载接口
     */
    function Downloader() {
        // request
        function FileRequest(url, progress, callback) {
            var req = GM__xmlHttpRequest({
                method: 'GET',
                url: url,
                onprogress: function (res) {
                    if (progress) progress(res);
                },
                overrideMimeType: 'text/plain;charset=x-user-defined',
                onreadystatechange: function (res) {
                    if (res.readyState == 4) {
                        if (res.status == 200) {
                            var str = res.response;
                            var ta1 = [
                            ];
                            for (var i = 0; i < str.length; i++) {
                                ta1[i] = str.charCodeAt(i) & 255;
                            }
                            var ua8 = new Uint8Array(ta1);
                            var blob = new Blob([ua8]);
                            callback(blob, res.status);
                        } else {
                            callback(null, res.status);
                        }
                    }
                }
            });
        } //save file

        function SaveFile(blob, filename) {
            if (root.navigator.msSaveBlob) {
                root.navigator.msSaveBlob(blob, filename);
            } else {
                var anchor = root.document.createElement('a');
                var url = root.URL.createObjectURL(blob);
                anchor.download = filename;
                anchor.href = url;
                var evt = root.document.createEvent('MouseEvents');
                evt.initEvent('click', true, true);
                anchor.dispatchEvent(evt);
                root.URL.revokeObjectURL(url);
            }
        } //interface

        function FileDownload(url, filename, downloading, success, error) {
            FileRequest(url, downloading, function (blob, status) {
                if (status == 200) {
                    SaveFile(blob, filename);
                    if (typeof success == 'function') success();
                } else {
                    if (typeof error == 'function') error(status);
                }
            });
        }
        this.FileDownload = FileDownload;
        var anthorEvents = {
            onprogress: function (res) {
                if (this.anchor.getAttribute('data-res-action') == 'downloadDirect') {
                    if (res.lengthComputable) {
                        this.anchor.querySelector('i').innerText = '下载:' + (res.loaded * 100 / res.total).toFixed(2) + '%';
                    } else {
                        this.anchor.querySelector('i').innerText = '下载:' + anthorEvents.calcLength(res.loaded);
                    }
                } else {
                    if (res.lengthComputable) {
                        this.anchor.innerText = '下载:' + (res.loaded * 100 / res.total).toFixed(2) + '%';
                    } else {
                        this.anchor.innerText = '下载:' + anthorEvents.calcLength(res.loaded);
                    }
                }
            },
            calcLength: function (b) {
                b = Number(b) / 1024;
                if (b < 1024) {
                    return b.toFixed(1) + 'KB';
                }
                b = b / 1024;
                if (b < 1024) {
                    return b.toFixed(2) + 'MB';
                }
                b = b / 1024;
                return b.toFixed(3) + 'GB';
            },
            onsuccess: function () {
                this.anchor.innerHTML = this.Html;
                this.doing = false;
                if (this.anchor.id == 'tmp') {
                    this.anchor.previousElementSibling.remove();
                    this.anchor.remove();
                }
            },
            onerror: function () {
                this.anchor.innerHTML = '下载失败';
                this.handler = setTimeout(function (t) {
                    t.anchor.innerHTML = t.Html;
                    t.doing = false;
                }, 2000, this);
            },
            onAnthorClick: function (e) {
                e = e || event;
                var a = this.anchor;
                var ex = /([\w\s]+)(\.\w)(\?.*)?$/i.exec(a.href || '');
                var name = a.download || a.title;
                if (ex) {
                    if (!name && ex.length > 1) name = ex[1];
                    if (name && name.indexOf('.') == - 1 && ex.length > 2) name += ex[2];
                }
                if (!name || !a.href) return;
                e.preventDefault();
                if (this.doing) return;
                this.doing = true;
                FileDownload(a.href, name, anthorEvents.onprogress.bind(this), anthorEvents.onsuccess.bind(this), anthorEvents.onerror.bind(this));
            }
        };
        //interface
        function BindAnthor(a) {
            var env = {
                Html: a.innerHTML,
                anchor: a
            };
            a.addEventListener('click', anthorEvents.onAnthorClick.bind(env), true);
        }
        this.BindAnthor = BindAnthor;
    }
    var downloader = new Downloader();

    var innerFrame = document.querySelector('iframe');
    var tit, // 标题
        cov, // 封面
        dl, // 下载按钮
        fileName, // 文件名
        mvId = '', // mvID
        allDownloadButton; // 歌单/专辑页的下载按钮

    var api = {
        // 歌曲mp3地址
        detail: function (songIds, callback) {
            getMusicLink(songIds, function(data){
                var br = 320000;
                if(data){
                    data = JSON.parse(data);
                    br = data.data[0].br;
                    data = data.data[0].url;
                }
                innerFrame.contentWindow.document.querySelector('#wyyyydda').setAttribute('data-br', br);
                innerFrame.contentWindow.document.querySelector('#wyyyydda').src = data;
            });
        },
        // 歌词连接
        mediaUrl: function (songId) {
            return (location.href.indexOf('https') == - 1 ? 'http' : 'https') + '://music.163.com/api/song/lyric?os=pc&id=' + songId + '&lv=-1&kv=-1&tv=-1';
        },
        // 获取歌词
        media: function (songId, callback, index) {
            var req = new XMLHttpRequest();
            req.open('GET', this.mediaUrl(songId), true);
            req.onload = function () {
                if (index != null) {
                    callback(JSON.parse(this.responseText), index);
                }
                else {
                    callback(JSON.parse(this.responseText));
                }
            };
            req.send();
        },
        // MV链接
        mvUrl: function (mvId) {
            return (location.href.indexOf('https') == - 1 ? 'http' : 'https') + '://music.163.com/api/mv/detail?id=' + mvId + '&type=mp4';
        },
        // 获取MV
        mv: function (mvId, callback) {
            var req = new XMLHttpRequest();
            req.open('GET', this.mvUrl(mvId), true);
            req.onload = function () {
                var json = JSON.parse(this.responseText);
                var brs = [240, 480, 1080, 720];
                for (var i = 3; i >= 0; i--) {
                    if (json.data.brs[brs[i]]) {
                        callback(json.data.brs[brs[i]], brs[i]);
                        return;
                    }
                }
            };
            req.send();
        },
        // 歌单链接
        playListUrl: function(playListId) {
            return (location.href.indexOf('https') == - 1 ? 'http' : 'https') + '://music.163.com/api/playlist/detail?id=' + playListId;
        },
        // 获取歌单详情
        playList: function(playListId, callback) {
            var req = new XMLHttpRequest();
            req.open('GET', this.playListUrl(playListId), true);
            req.onload = function () {
                callback(JSON.parse(this.responseText));
            };
            req.send();
        },
        // 专辑链接
        albumUrl: function(albumId) {
            return (location.href.indexOf('https') == - 1 ? 'http' : 'https') + '://music.163.com/api/album/' + albumId;
        },
        // 获取专辑详情
        album: function(albumId, callback) {
            var req = new XMLHttpRequest();
            req.open('GET', this.albumUrl(albumId), true);
            req.onload = function () {
                callback(JSON.parse(this.responseText));
            };
            req.send();
        }
    };
    var pages = [
        {
            url: 'http://music.163.com/#/song?id=',
            handler: function () {
                var innerFrameDoc = innerFrame.contentWindow.document;
                var albumNode = innerFrameDoc.querySelectorAll('p.des.s-fc4') [1];
                tit = innerFrameDoc.querySelector('.tit');
                cov = innerFrameDoc.querySelector('.u-cover > img');
                dl = innerFrameDoc.querySelector('.u-btni-dl');
                // TODO 当artist多个的时候文件名中只包含第一个（不多网易UWP也是这么干的先这样吧）
                fileName = tit.querySelector('.f-ff2').innerText + ' - ' + tit.parentNode.nextElementSibling.querySelector('.s-fc7').innerText + '.';
                var parentNode = albumNode.parentNode;
                var songId = location.href.match(/id=([0-9]+)/) [1];
                var mvHref = innerFrameDoc.querySelector('a[title="播放mv"]');
                if(mvHref) {
                    mvId = mvHref.href.split('=')[1];
                }
                var downloadLine = this.createDownloadLine(songId);
                parentNode.insertBefore(downloadLine, albumNode.nextElementSibling);
            },
            createDownloadLine: function (songId) {
                var disableStyle = function (link) {
                    link.text += '(无)';
                    link.style.color = 'gray';
                    link.style.textDecoration = 'none';
                    link.style.cursor = 'auto';
                };
                var mp3Link = this.createMP3Link();
                var lyricLink = this.createLink('歌词');
                var tlyricLink = this.createLink('翻译');
                var coverLink = this.createLink('封面');
                var mp3Help = this.createLink('如何下载歌曲?');
                var showPlayer = this.createLink('歌曲试听');
                mp3Help.addEventListener('click', function () {
                    alert('点击下方的下载按钮之后等待即可。');
                });
                showPlayer.addEventListener('click', function () {
                    var player = innerFrame.contentWindow.document.querySelector('#wyyyydda');
                    player.setAttribute('controls', 'true');
                    player.play();
                });
                showPlayer.id = 'wyyyysp';
                lyricLink.setAttribute('download', fileName + 'lrc');
                tlyricLink.setAttribute('download', fileName + 'lrc');
                coverLink.setAttribute('download', fileName + 'jpg');
                coverLink.href = cov.getAttribute('data-src');
                downloader.BindAnthor(coverLink);
                downloader.BindAnthor(dl);
                dl.href = 'javascript:;';
                dl.setAttribute('data-res-action', 'downloadDirect');
                dl.querySelector('i').innerText = '下载(稍候)';
                api.detail([songId]);
                api.media(songId, function (result) {
                    if (result.lrc && result.lrc.lyric) {
                        lyricLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(result.lrc.lyric);
                    } else {
                        disableStyle(lyricLink);
                    }
                    if (result.tlyric && result.tlyric.lyric) {
                        tlyricLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(result.tlyric.lyric);
                    } else {
                        disableStyle(tlyricLink);
                    }
                });
                var container = this.createLineContainer('下载');
                container.appendChild(lyricLink); // 原文lrc
                container.appendChild(tlyricLink); // 翻译lrc
                container.appendChild(coverLink); // 封面
                if (mvId != '') { // MV下载，没有不显示
                    var el = this.createLink('MV');
                    el.setAttribute('download', fileName + 'mp4');
                    api.mv(mvId, function(result, br) {
                        el.innerHTML += '(' + br + 'P)';
                        el.href = result;
                    });
                    downloader.BindAnthor(el);
                    container.appendChild(el);
                }
                container.appendChild(mp3Help); // 帮助
                container.appendChild(showPlayer); // 试听
                container.appendChild(document.createElement('br'));
                container.appendChild(mp3Link); // audio标签
                return container;
            },
            createLink: function (label) {
                var link = document.createElement('a');
                link.innerHTML = label;
                link.className = 's-fc7';
                link.style.marginRight = '10px';
                link.href = 'javascript:;';
                return link;
            },
            createMP3Link: function () {
                var link = document.createElement('audio');
                link.setAttribute('id', 'wyyyydda');
                link.style.marginTop = '10px';
                link.addEventListener('canplay', function () {
                    dl.href = this.src;
                    dl.setAttribute('download', fileName + 'mp3');
                    var br = '(' + parseInt(innerFrame.contentWindow.document.querySelector('#wyyyydda').getAttribute('data-br')) / 1000 + 'K)';
                    dl.querySelector('i').innerText = '下载' + br;
                });
                link.addEventListener('error', function () {
                    alert('无法加载此歌曲。可能此歌曲需要付费或版权受限。');
                    dl.querySelector('i').innerText = '无法下载';
                });
                return link;
            },
            createLineContainer: function (label) {
                var container = document.createElement('p');
                container.className = 'desc s-fc4';
                container.innerHTML = label + '：';
                container.style.margin = '10px 0';
                return container;
            },
        },
        {
            url: [
                'http://music.163.com/#/playlist?id=', // 歌单
                'http://music.163.com/#/artist?id=', // 歌手
                'http://music.163.com/#/discover/toplist', // 榜单
                'http://music.163.com/#/album?id=', // 专辑
                'http://music.163.com/#/discover/recommend/taste' // 每日推荐
            ],
            handler: function () {
                var innerFrameDoc = innerFrame.contentWindow.document;
                allDownloadButton = innerFrameDoc.querySelector('.u-btni-dl');
                var downloadButtons = (innerFrameDoc).querySelectorAll('span.icn-dl');

                var cover = innerFrameDoc.querySelector('.cover>img'); // 封面图片<img>
                var mask = innerFrameDoc.querySelector('.cover>span'); // 封面图片后一个元素，用来加<a></a>
                if (cover && (location.href.indexOf('#/playlist') != -1 || location.href.indexOf('#/album') != -1)) {
                    var title = innerFrameDoc.querySelector('.tit>h2').innerText; // 专辑名称/歌单名称
                    var url = cover.src.split('?')[0]; // 封面的链接
                    mask.outerHTML = '<a download="' + title + '.jpg" href=" ' + url +  '">' + mask.outerHTML + '</a>';
                    mask = innerFrameDoc.querySelector('.cover>a');
                    downloader.BindAnthor(mask);

                    allDownloadButton.addEventListener('click', this.downloadLyricsZip);
                    allDownloadButton.setAttribute('data-res-action', 'downloadLyrics');
                    allDownloadButton.childNodes[0].innerText = '歌词下载';
                }

                var audio = document.createElement('audio');
                audio.setAttribute('id', 'wyyyydda');
                audio.addEventListener('canplay', function () {
                    var a = document.createElement('a');
                    a.setAttribute('href', this.src);
                    a.setAttribute('download', this.getAttribute('data-fileName') + '.mp3');
                    a.setAttribute('id', 'tmp');
                    downloader.BindAnthor(a);
                    var _cele = innerFrameDoc.querySelector('[downloading]');
                    _cele.parentNode.appendChild(document.createElement('br'));
                    _cele.parentNode.appendChild(a);
                    _cele.removeAttribute('downloading');
                    a.click();
                });
                audio.addEventListener('error', function () {
                    alert('无法加载此歌曲。可能此歌曲需要付费或版权受限。');
                });
                innerFrameDoc.querySelector('body').appendChild(audio);

                this.replaceAction(innerFrameDoc, downloadButtons);
            },
            replaceAction: function (innerFrameDoc, downloadButtons) {
                innerFrame.contentWindow.document.querySelectorAll('.js-dis').forEach(function(ele){
                    ele.className = ele.className.replace('js-dis','');
                    ele.querySelectorAll('b[title]').forEach(function(b){
                        b.style.color='#aeaeae';
                    });
                });
                for (var i = 0; i < downloadButtons.length; i++) {
                    if (downloadButtons[i].getAttribute('data-res-action') == 'download') {
                        downloadButtons[i].setAttribute('data-res-action', 'downloadDirect');
                        downloadButtons[i].addEventListener('click', function () {
                            var id = this.getAttribute('data-res-id');
                            innerFrame.contentWindow.document.querySelector('#wyyyydda').setAttribute('data-fileName',this.previousElementSibling.getAttribute('data-res-name') + ' - ' + this.previousElementSibling.getAttribute('data-res-author'));
                            innerFrame.contentWindow.document.querySelector('#wyyyydda').setAttribute('data-res-id', id);
                            this.setAttribute('downloading','true');
                            api.detail([id], null);
                        });
                    }
                }
            },
            downloadLyricsZip: function(){
                try{
                    if (location.href.indexOf('#/playlist') != -1) {
                        var playListId = location.href.split('id=')[1];
                        // 歌词打包下载
                        api.playList(playListId, function (result) {
                            console.log(result);
                            try{
                                if (!(result && result.code && result.code == 200))
                                    return;
                                var zip = new JSZip(); // 新建一个zip压缩包
                                result = result.result;
                                if (result.description)
                                    zip.file("歌单介绍.txt", result.description.replace(/\n/g, '\r\n')); // 歌单描述
                                zip.file("说明.txt", "lyrics：.lrc格式的滚动歌词\r\nnlyrics：.txt格式的歌词\r\ntlyrics：.lrc格式的翻译后的滚动歌词\r\n\r\n记事本打开可能不换行，请尝试notepad++等软件\r\n\r\n由\"网易云音乐直接下载\"脚本下载。\r\n脚本链接：https://greasyfork.org/zh-CN/scripts/33046"); // 不要删除好不好(✺ω✺)
                                zip.file("歌单链接.url", "[{000214A0-0000-0000-C000-000000000046}]\nProp3=19,2\n[InternetShortcut]\nIDList=\nURL=http://music.163.com/#/playlist?id=" + playListId);
                                var tracks = result.tracks; // 歌曲列表
                                var zipFileName = result.name + ' - ' + result.creator.nickname; // 压缩文件名称
                                zipFileName = zipFileName.replace(/[\/:*?"<>|]*/g, '');
                                var fileCount = 0;
                                for (var i = 0; i < tracks.length; i++) {
                                    api.media(tracks[i].id, function(result, i){
                                        try{
                                            var fileName = tracks[i].name + ' - ' + tracks[i].artists[0].name;
                                            // 删除文件中不允许的字符
                                            fileName = fileName.replace(/[\/:*?"<>|]*/g, ''); // 泽野大佬的滚键盘大法令人懵逼，BRE@TH//LESS直接创了个文件夹出来
                                            if (result.lrc && result.lrc.lyric) {
                                                // 这句保留两位小数
                                                zip.file('lyrics\\' + fileName + ".lrc", result.lrc.lyric.replace(/\[(\d\d.\d\d.\d\d)\d\]/g, '[$1]'));
                                                // 这句保留原来的格式（原来几位就几位）
                                                //zip.file('lyrics\\' + fileName + ".lrc", result.lrc.lyric);
                                                zip.file('nlyrics\\' + fileName + ".txt", result.lrc.lyric.replace(/\[.*]/g, '')); // :: /\[\d\d:\d\d.\d{2,3}]/g
                                            }
                                            if (result.tlyric && result.tlyric.lyric) {
                                                zip.file('tlyrics\\' + fileName + ".lrc", result.tlyric.lyric.replace(/\[(\d\d.\d\d.\d\d)\d\]/g, '[$1]'));
                                            }
                                            allDownloadButton.childNodes[0].innerText = ++fileCount + '/' + tracks.length;
                                            if (fileCount == tracks.length) {
                                                zip.generateAsync({type:"blob"})
                                                    .then(function(content) {
                                                    saveAs(content, zipFileName + ".zip");
                                                    allDownloadButton.childNodes[0].innerText = '歌词下载';
                                                });
                                            }
                                        }catch(e){
                                            alert('歌词下载失败...');
                                            allDownloadButton.childNodes[0].innerText = '歌词下载';
                                        }
                                    }, i);
                                }
                            }catch(e) {
                                alert('歌词下载失败...');
                                allDownloadButton.childNodes[0].innerText = '歌词下载';
                            }
                        });
                    }
                    // 懒得重用代码，复制粘贴多快_(:з」∠)_
                    else if (location.href.indexOf('#/album') != -1) {
                        var albumId = location.href.split('id=')[1];
                        api.album(albumId, function (result) {
                            try{
                                if (!(result && result.code && result.code == 200))
                                    return;
                                var zip = new JSZip();
                                result = result.album;
                                zip.file("说明.txt", "lyrics：.lrc格式的滚动歌词\r\nnlyrics：.txt格式的歌词\r\ntlyrics：.lrc格式的翻译后的滚动歌词\r\n\r\n记事本打开可能不换行，请尝试notepad++等软件\r\n\r\n由\"网易云音乐直接下载\"脚本下载。\r\n脚本链接：https://greasyfork.org/zh-CN/scripts/33046"); // 不要删除好不好(✺ω✺)
                                zip.file("专辑链接.url", "[{000214A0-0000-0000-C000-000000000046}]\nProp3=19,2\n[InternetShortcut]\nIDList=\nURL=http://music.163.com/#/album?id=" + albumId);
                                var tracks = result.songs; // 歌曲列表
                                var zipFileName = result.name + ' - ' + result.artist.name; // 压缩文件名称
                                zipFileName = zipFileName.replace(/[\/:*?"<>|]*/g, '');
                                var fileCount = 0;
                                for (var i = 0; i < tracks.length; i++) {
                                    api.media(tracks[i].id, function(result, i){
                                        try{
                                            var fileName = tracks[i].name + ' - ' + tracks[i].artists[0].name;
                                            fileName = fileName.replace(/[\/:*?"<>|]*/g, '');
                                            if (result.lrc && result.lrc.lyric) {
                                                // 这句保留两位小数
                                                zip.file('lyrics\\' + fileName + ".lrc", result.lrc.lyric.replace(/\[(\d\d.\d\d.\d\d)\d\]/g, '[$1]'));
                                                // 这句保留原来的格式（原来几位就几位）
                                                //zip.file('lyrics\\' + fileName + ".lrc", result.lrc.lyric);
                                                zip.file('nlyrics\\' + fileName + ".txt", result.lrc.lyric.replace(/\[.*]/g, ''));
                                            }
                                            if (result.tlyric && result.tlyric.lyric) {
                                                zip.file('tlyrics\\' + fileName + ".lrc", result.tlyric.lyric.replace(/\[(\d\d.\d\d.\d\d)\d\]/g, '[$1]'));
                                            }
                                            allDownloadButton.childNodes[0].innerText = ++fileCount + '/' + tracks.length;
                                            if (fileCount == tracks.length) {
                                                zip.generateAsync({type:"blob"})
                                                    .then(function(content) {
                                                    saveAs(content, zipFileName + ".zip");
                                                    allDownloadButton.childNodes[0].innerText = '歌词下载';
                                                });
                                            }
                                        }catch(e){
                                            alert('歌词下载失败...');
                                            allDownloadButton.childNodes[0].innerText = '歌词下载';
                                        }
                                    }, i);
                                }
                            }catch(e){
                                alert('歌词下载失败...');
                                allDownloadButton.childNodes[0].innerText = '歌词下载';
                            }
                        });
                    }
                }
                catch(e) {
                    alert('歌词下载失败...');
                    allDownloadButton.childNodes[0].innerText = '歌词下载';
                }
            }
        },
    ];
    function matchPagesURL(href, urls) {
        var ret = false;
        var t = location.href.split('://') [1];
        if (Array.isArray(urls)) {
            urls.forEach(function (ele) {
                if (t.indexOf(ele.split('://') [1]) === 0) {
                    ret = true;
                    return;
                }
            });
        } else {
            if (t.indexOf(urls.split('://') [1]) === 0) {
                ret = true;
            }
        }
        return ret;
    }
    if (innerFrame) {
        innerFrame.addEventListener('load', function () {
            var i,
                page;
            for (i = 0; i < pages.length; i += 1) {
                page = pages[i];
                if (matchPagesURL(location.href, page.url)) {
                    page.handler();
                }
            }
        });
    }
}) (window);