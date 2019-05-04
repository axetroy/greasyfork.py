// ==UserScript==
// @name        NGワード置換ファイル生成
// @description ニコニコ生放送について、NiconamaCommentViewer (NCV) 用の運営NGワード置換ファイルを生成します。
// @namespace   https://greasyfork.org/ja/users/137
// @version     1.2.2
// @match       *://dic.nicovideo.jp/a/%E3%83%8B%E3%82%B3%E3%83%8B%E3%82%B3%E7%94%9F%E6%94%BE%E9%80%81%3A%E9%81%8B%E5%96%B6ng%E3%83%AF%E3%83%BC%E3%83%89%E4%B8%80%E8%A6%A7*
// @require     https://cdn.rawgit.com/greasemonkey/gm4-polyfill/d58c4f6fbe5702dbf849a04d12bca2f5d635862d/gm4-polyfill.js
// @require     https://greasyfork.org/scripts/17895/code/polyfill.js?version=189394
// @require     https://greasyfork.org/scripts/19616/code/utilities.js?version=142849
// @license     Mozilla Public License Version 2.0 (MPL 2.0); https://www.mozilla.org/MPL/2.0/
// @incompatible Edge Microsoft Edge には Element#insertAdjacentHTML() メソッドが実装されていないため、対応を見送りました。https://id.pokemori.jp/niconico-live-ncv から生成済みの SubstList_Writing.xml をダウンロードするか、同URLのファイルが古ければ他のブラウザを利用してスクリプトを実行していただくようお願いします。
// @compatible  Firefox
// @compatible  Opera
// @compatible  Chrome
// @grant       GM.registerMenuCommand
// @grant       GM_registerMenuCommand
// @grant       GM.setValue
// @grant       GM_setValue
// @grant       GM.getValue
// @grant       GM_getValue
// @noframes
// @run-at      document-end
// @icon        data:image/vnd.microsoft.icon;base64,AAABAAEAMDAAAAEACACJGAAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAwAAAAMAgGAAAAVwL5hwAAGFBJREFUaIFlmXl0XNWV7n93rlGqKqk0S7YGy7M8MTnQBLAJkECgAyRpAgS6k0BDSCANCc1iCC/EL0PzAnE/eAlpCNAQCBBMAgYbY2wGYwzYxjaeJA+SrFmquerWnd8fVy6b9Fmr1qp769xz97fPt7+9zy7hxa8nvaakQI1kYro2JUPDyAkEygKhdgPPdskoUWJNY2SG64l7RY6PYlFBGBcJtRsA2I0afz8kcQqxlCCVUYg22J/7TSl7eGkTxRWZclRCbR6SOAWA49Zg9LmEw1ZlfumIRlg1K9dHy9XIs+t0ahappIdlZmGctEBw2gCdcVWmrtvFmDnCxJ5aGu0UqBrELcw2A9WdNrwphxL6PADX1TCYpBsNVAPxJAyZokYYkRE3zKkLssdhAWAwgWuKJ9YGxJSOYktYsoNiSxRNHVkVZbyUy5wFKVxX4+DeWuYxCaJeAeEZWUQbNBValk4yvj9GnZnBcYMEcTnmhvlz1QKOCTOwLRtdDmB4yueAxJw8GTNKraHT7U0yP7+FL9anGWtKkIxNggrGtHM1FTCP7+AJO1JCkHpMFFtir6Xh1bkIB34Q82Jxi8RSnxqi7XumPBKkpmwgiTppr5X4okEwp72hGowdDVM7rvO/er7O1vhCmuMhqkS5YrAq+a42nRP3jo+ca2Nl8liZHPcV/ou5kRIAsmNgSyc8nt5XR1wYrDAic9h3ithZTVwY5PBEDDmjS8yoMchlNWJhA92FqiBoHRkkNFJ7wmTSeeLThmNqYGrUJop8q+l2Gjpm0OnJqILNVCqNlcmhUjjhdSmKSaRyz4s1EY0nCcQDqIk4d6Z+yC+OPUxHJM1oVSMN1giGOb0LfzdCXQWirost5HDcIJboIhs5AYCwYOC6Gtq0oZrpcza8wCCBhmiD7kI6nCA0meJtt4dEeyeeoqAAU2MTXDH0IpfGd+Hk4KAdR44WMacamJ8Yq+zcO0Nz+bl3NXNrqvCUIM3xen48cA2vz/otqjbC5I4qahUDTPCcFMgn4jHqutjiCUCKKyLXuBamaJBLhamfWSSX1ahCQxQNXFMDDP+763+vbx/BqYF3Bi4CwDJPqMTE5gL3j8wlX5IpFRWqY66/5UIb6XSJ7vYyjfV56i5zMD0ZBVBUBbO1ntG8TJ1s4yo+UMOEoOyvraFjEGTcDWPFIKwUGZ4II2MjTokKQVzUbAJMDS1oMNngMOpWYWAQFMGVp+kDFHJx1DBE3H5Uwa58cri83XYackCjtS1AWCsTDfoAYok8ilgGYGOhg1IpgyrYCJZeAa+pURwJ3HAYWQdD92NhXI0x0pSg2O6SWFqkvskm0gwhFyzRRUw0muiIBIQhDAwE01+sYW6O4FwYdavIZX3ea2gE1TQAV9aux/RkPMXf3vZEDfbKHnJqCNdxaOkIo4QEIlEwTYFIlcDHrXMoXb2C+uZZeEoQTwmSGhumPjtIdThdAeMqfhyG57k0dGVI1qWoClKRYLMAjaIvOrLiikRd31MjmQTJWJFcPodT5U9OLshRyMUZH3AI6AYhE1BgflOK5K7NZLvOxPRkHCOPvGEXVWaJ8TwEFJ2ypVGWRfquPAVxRhPtiRrM6YDX83ksVSF/4Bh/Pef3mBaoQKx5hMynGlXVBth+HsGcZsBJOUQSdYrFkK9CBkEkUcctGchRg2J/jJrmDJLjT45UpYkthkwqTsZ0qAvbHNOraX1jG31t03OOjpDcO0x4bgjDknAIYgQVDt90Ea3xegD0cp7h/ceQ9DLh/jFa+ifozGbZFJnLvM5eIlU2IQnyRhjR9uMup4Mpa9jhBHKxSK1iUHY0VAzCYQtZ6xKZDIhU5USEsoIdhEYnU5Gy4yA8wwcSLINpwZFdTYylNeal9zM+ZBJLKBSVEHrBQVN8Zdu1YhHN8XqG0mNE1u+gdlMvZyQEBEXCk0UKeZBrk3y4Ns1pv7LRdBCm08aoW4UYL1KzwEGWDYxCDqcIqCBO+MqkuCIiQH2TTXCOghfwo15VNQoTUiUzSg6UnBNgVAUG9gcZHzKnd0igptYjXicQ0FQE26ekEwwAEF27i3m7+qivlxk45hCMykTDLtmUjmtNki9K3H3twoqj6penSC7IUdPsIDn+PVUBwQRMjeKk7yBLdBGP1z4GBvUzi4g2iKKB4kWQXd/bpgUh6YTxm96sYuc7DjO7fANDUQXHlRkfMhEUh/4jPjBJL+MYeZJ7jzKe8gglBLrm++qSL4q0NGsENJVo2KG1LcD/vqMH8J11fDjT780dq0JV/dxkOTWV30XHPXGRy/qLu66GboVQFd/gqUAbE1qAEamNEamNV15cQGuHnyoHesuEgiIl3a2s09CiEZZN6j86wPD+YwRsFyUoYZVBlnyLTN3Dk0VESWJs1KVQ8Hd/eKCRkARO2Zdsw/RB6INyxcbjClShEEA63IgwO8SRTAwAOVNE0Hzva2aWZEeZxu4Btr1pEAhkOXygiCTazJwtMzluIIo2M7sCCK6KGhQo2irRIykant2CZTkkqgRkSaI8zcui7mJYIq7jkJ+yiIZdpHCCtzcKjEhtqD1QqooSkvwiT9OKGBgYRpisKzIV0BiXglQqLWnIIDYrTexsX23GdkapsXM+x90sqRFINPpzx4Y9mjoCHBssYugSlu0QigaRRBvHgaF+nXhC5sC1ZxKaPZMB3WPegy8RzYGedmnucmipcyjaErm0QUOLhitBQCiyZ2cHZ+m7KWROUKgwKlEbBFGEYCKFHps2ejQ4HQPTWda2/U9QTbPwzIEK57UIGPk2ChnY8kojsxcqZMfLXHLtv/DTP/yKH//qLmyrlsMHdUaGikSiUMh5iDOaaKiuIyBYCCEFwXYIxgN4lkTRVikVInQtv5juL3yJieEohYKFKk+x+c+dRGJg6lkkBxQvUrHRdTWCIgRFkEwH6YaVtT+tqy0RDusUlDiSV0YKgOiBJ4JtguSBFM7yuzsXISBgFE0WrriYFStOx8YjEA6xcPkiTllxNnN6eghFkpRNgeGIhxsQEDN5tLUH8AQPVYKplENr9xKu/8G3mT+vg8557Sz+h2W8t243slhkckKhf69A+zyLmGSQPaYRlgzG7CrsmMLoWJDqSJnhQ2GEnb9MevM7fKqMhhMATA0qtC3OE1TTqIqvClY5zm3XNdLcplDUXVY9+iATuSyJULgSvKl0BkOAZCTCkaMDbN24A8soYOgGK7+2kmBAQy8b2K7E3O4ZlHEJILJ923Z6lvYwUSiw+p7f0tZsIhTiLLtoO2edm8Yp+0wAyBbjRAf888P29ZETQYxqMDWo8OxfL2PK+lcee+KbHDnkK01IguJUgHAE1KDA7J5uJiYm2bV1F2Vcyri88MwrfLj5Y958cR050+D5R58jEJbpOWMZZdOj72A/tS2N5FMZPli3idfXbGDvtp2UcckVDB77P4+TjERobW2gd3+RojTFu2tbkWVfBcdHffUS0o5Pp2lKyeDnAKEAQ0cyrDy3hwVLF3H2V0r88s59XPfTwwA8/cc4Le0wdsyjtjXCW2s3E4lXEUBEkmUWn76QbLrEwlPm8ocHfsflN3yLp1c/ia6XObynl+rqAHs+2ktzdweHegcJVoWZd9piZNtl4PAAe7cfJBBVmHvKQkYH92HqHqYtkk9AlAEiDggauOMGBDUmMv7Oy2pnFm8W5HMyox9E6U74p3Kz5DJr3lKidZuIxODA7gjts1UETIqpLMnuGl59/C+sfeo11FAAUbCxdJNQTYzrf3g1s7pmMGfRbDa+vIEVl17INd+7nMdXP8mfHn2ORV9YyGDfMDu2PEb/3gM4rsiXv3khtu4xe+lc3npZJZbwPf7Ev3fw1RuniKhZxvqPq5FBss5gvCuJXC5rhCQTOWKzbKFELlXC6RSw5SC1NUn0VIDDO0PEkhKRiIKpe+zZtpuZ3R18f9XtyKLDhjc/4xu3/pCW9g56P91J7/t/o7VrJtfefA3nXXgWtS2N2LbNP9/ybfYd7Gdvb5ozVq4EYO8HW5jZIjNr/hzKhn9msPUyR/scQlUq+d4I1c+cjSSsZ8XpBcDwzyem5rdsAgEDRwJbhJSTB6CcnqB/96e8s/4NAJ5Z1UZzs0JmsoBWNZOfPfYzUmOTjB0bZteWj/m3hx/m+Ycepi4Uon/vXibG/PNv2SjTd3CAZ1c/jS37VPt408dc82+389fHn2Drhg1ceuNN9B3sR3L8gD6wfR+mLaIqYJZD/Pq/fsGVt/4ru3bUUU2OnE6lueC4NYjmVAOSA7ILE4Myc5fMBMMPkLrWLkYGfEod7SuTL8l897ZrqGtr56KvX8g7r73L+KifcX752GN8/2uXc/8vfk2scQZy0T9tbdvwgc9V26Vom4SaO3n6wf9g777drHrgAXo/3UkhayMHA6CpfPrex7S2K3iyxNeu+zJaNIJiGXTO7sFsixNbalDuNhgNJ/jjK0nk9ZtqmXf2AJIEhuVrVaChhRk1DViOxJHPXvXRejKqo1GTbAIsQnH/xLPyayvZ/tZGajSVN3fvQS3mGOnbwer33qalvYHv3H0DoVCQ53/3ZwzTINbaxp53P+LgWJopwyRYVUWyPoKRL1AolshmRmhsEBnVbbrnzwFHBsmmZWYLxakAkSrQJOg9WmbWkuXI4cQSpoY+pa7hpBIQUBS/yhjYEyYShdSoX8MYTgnP1Tiy+wDtszvJpku8+9yj3PmDGziyezc/fvBh7GKJaCLEu29t5/n/fIay6XHldRfT0tmOrIbJDA7Qbdlcds53+WTdG8SjUQBeX/MmkSg4rowS9DBNE0cSAIVQKEq+NEVt2af7O+tncMGVi5HnLpnN2jUNXHfjEFZZQFEUXNtjamKYvv297NseoXOWSKIhQCBQi10sIcsmjz/0JMn6OiyjwB0/v5G/vbSRq276Br+5ZzWDH31GoquB2x+8k9OXLwag/2g/N19yA/UzWrnrlz8i+sLb4Jb44G9rCGgy7657n8zYfgLRMNlUEU2ReefVzVz8TxFy+QK7d+6k8ULfuZmhRjITCqJnItbGQgwMdFFyIG9quJ5KtpTCNE0aa6uwdL/G13NFvn3rNYTjMbRohJ7TT2XhWUu46pZrsF2F1OAYoXCYgCowuzGBOpXjgZtW0X+0n+HhEX5z76P01NZQHB5nolAAt0Q+leHeB3/MPavvpaW9gWAwgJ4uU50IYlgiseY6bFkETaGzu5PR8TBaBJ57ro57f3sPB3YeRNY9ie/88Lv07t6Oqi4BRyYSrSESrcGyLJSgSinloagx2jrbcVDw9DyWUaCr4xTCsoogWpy24jRee+EtZi6YxftHx0l2NLOos43Hf/MMIjbLz+hhIpNhJvDea5uZt2gB69dswAtEwZG46LLzue/NTcQTMqbuYekO55y3HC0UIxIVWLzM4O3XgxiFNHl9DoF4kpY5nciyC3VtHbz9epTWttkg2RzvEIfDYSzdJJVT6DlzKc70/Ww2x2c7ernsX66gaJvIZZdZXR20ds1k1U33c8VVX2HxWafx2Z5DLOjpplh2qI6HaO2ayRtP/41iQWf+srls+MtaZFvHCUapaajDMQVCUcU/IBVUtGgEB//4KAUDWGWBjz8UmdHZBEBtLIRsWyXWv/wqn2xJ0j7vEDgynunng0w6jWAZ1CbbufrGb4Hj4UgCju4nHNUTCCBSloFika0f7mLFpecTbqhl1fd+yqJIkLwkks0XaQkFeaGgc+blK1m+ZDYv/PE1unvmkhodp7pZZDyd5oKvf5kt696COpdiqcjU6DixhmaGDh1k/Zp3CAjw4XvLqKlPY+fTWI7k10LnfeUcvnTFhdjThhnlMu+/tZUPN28jXTL58Q+uwVI0nJCvTDWtJ46hqVKRRChMSoCu7ja2rn2fHU//le5T5tHx5XOpb6nFMC0y41max8dY+9RaRjZ8wLIbLkfx4Nf3PsJ3bruK2YuWcsk1V1LflGDNH18hFPSorq7CsmzaZs7iO7fO4uF7dzB3yfmsuOKS6bf3I7uCil1Tg2fZuJMppGNDyONTfLExwbn/7+d4T/8Z9Se/RhoYRxoe8gGuewJR8LtMu7bu4pzzlrNr6y5ef+wlTj19ARfcezOJWIjXnl/LO2+8B0DLjBmcsnwhP/r9vby9ZiMvP/B7OhbP4cyLz2TfZ4eZvbQHUDjlwvNZumgBz939MM72XQg98yjX10O2xFC/w7Izo0jTTACQpdEhIgvPR5xI4ffG8DvUmGTfegp1ZBJ162e4yUjld3N8inLRB7DluXVse+oV2pI1NMyfxc6Dx9g/+Ayzl86nsbWZP7zyKKOjY/zt2dfY9PpmLBF0vUzDWUs4urOP6P6j7MkUuOyqK0AC8db7CL/0Bt8FWP8+AG4yQv6Re7nvP+5mzWMvsGT5fALxJIrkIJcDgc8Zf/II33w/+k1XAeb0HD43zzRNauqiWCWV9wfHuPuO66iuq2Hrxg/Ry2Uu+scL+OyTfQz0HeHUc7/Ayq+t5E+Pvsi1N15BVW2C/9zXT+PCTpS1WxiZHKLxtlWoW3f8D1vEiQLVV96Km0xw/UQKnljDEzdfxfzlC5Fj9bXHzfm7B1Xk/YeQewfIvvAQwQefRD7UT+b954nIGvA4lmWRmNvFp+/vZvXLv0WT/Loppkps27CDjS+tw87lqWpQKeTBMQWuvfVqZi/twTBNbvjJ9Tz50NMkuhqYenEdrYf6Kza4yQjiRAo3mag4WJwoACpuMsIV3/s6d9/0AKJeNkgdfJPsCw9NgzjxL6CbTBBc/SQkEjjRCADCZAZbL1OdiPHs7//Cge2fccVVX8ITNJ+Xks1fX96EQ4pEvUygWqZppt8Aq22QyKdLOCjIapjmzm4WntZDOl1i4Sf7TnKkiThRIPvWU+jbXyf71lPTFPaBuTVxtFCMS//pEkRXUAnKEdzmZv/xM5ZUFjqOPHzz/XhL5yJOpBB1v8pMNlSz9NT53P3gXWjVUYRyHsuyeXTV/0X0JoiGHRI1DnLQ70K0zwoQiip8uHkbEn4TS3I8zr/4HMxICOmzfZ+jcukn16E0NOAW86jtsyjec3PFJusLS3EkgUh9DFn0TCTHQ+roqDysX34ewZfeqFzL+w/hxqb77akUQvss1IDGeV85ByEYZe4pi7jj6h+haRHUQIm6Oo3JcYPaOg1N8YNdliRMXPL5MZ5/5Bm+cdO3QIJwPMapPZ2Im9/7HIXt225A+PMago88ixurwvnqef5OBIPI4TCa4yG7IMtKiLLrIFnTLzrUT/Z3PyP40sZpHvq8Ox5cUu8g0rKlXHPz1dhyEAU4dugIlm7S2FIiGnaZmvTIZiWSzQ7ZrERtHUyOG4SiCvUNIp9s20L/kQEWn76EFVdcwgVfPQ9WP1nZeTfpd0e0Z1/1nZdMoN714AnxOGMJ9hdPhdN6/K6Eosg4iow9p9XfvpJOYdUtJ3GSinekvgEcFGINzSiKjKfnefi+1TS0aBiWSHrKwrZtotUiouMhCTa24yDLMplxk1LOJJ6QGB3oI5yI4el56hYuqPAbQJxIIQwM4jy1Cv2Wb/8PlVS37kDoG8B2Jb+UKKcnUJ7bjJDzM3Hz9XdiXroCu3MG6kSBk4e0t49ySKV4+AjrXnqVQ/uPUVMjkElZtLRDakojEoXMuIlhKZUOdiwBsYREJuWQGTepb9XY+PJ6lv3DcoRMGv3yC6dp64tH+Cv/jPHNS5A+2nXS21XMM+bjnNqDfZrfjhddwUcWuetBpOEhxIkU8v5DCNv3MfKLOyqPHveOfKgfgGLR7xAX0sP+9TTOujqRcJVHrG46nvI2Jd0lnYOS7lLUXWJ1KuGgSHq8n6G+/chqmMK9369Q53jOCa7+U+V9x22wv3gq3HYj8plnIrsgqrJcQX3yUAaHqe3spLDqlop06eefjvHNS1BKJrlUiU1rt1HUHTIpi9YZHkd6y4wMFRnqsxjq1xkbdUnlPNIpB6dsMNSvEw35sVbIghoU2fzauwBUhxJk3n8e/fILT9J+s5ILjucF65R5PhOmlazSnTYuWYHdUg+zZmJ3zvAnlUy4/DLsb16KpWgoZQcrIKFYBp++8yGJpEO8ViEUCjI4UKZ5hlT5r6BO9TBNgWjYJV8UMXWR5hkKgu2SzwOIBIMBdm7bybfyaaxAlIDtYf/8dsqpdGW3s00N1Dzy3xVVFBcuwLJsUPzSXu7b3wuyg33eGbiCiqjKBIfHsBwJBiexRb9jcfLITGR4e/271LdFmZp0cBMWiiIh2C7pnIimQL4oYZVdDEsmINjYtkMxJRJPSESiMD5kEmlWkQSLTRs/oLmpqbK+LYJr2qhqmNhkit3/eD7CFxYjDU9i7+6t2NO3v5f/D8MQDlXlghvlAAAAAElFTkSuQmCC
// @author      100の人
// @homepage    https://greasyfork.org/scripts/11567
// @contributor しろ (https://twitter.com/siroro/)
// ==/UserScript==

(function () {
'use strict';

/**
 * NGワードを分断する文字。
 * @constant {string}
 */
const SEPARATOR = '/';

class CharacterProcessor
{
	/**
	 * 1文字のNGワードに対する置換リスト。
	 * @constant {Object.<string>}
	 */
	static get VARIANTS() {return {
		/*eslint-disable quote-props */
		'姦': '姧',
		'糞': '粪',
		'ௌ': 'ெ ௗ',
		/*eslint-enable quote-props */
	};}

	/**
	 * 全角文字を半角に変換するときの加数。
	 * @constant {number}
	 */
	static get ADDEND_FULL_TO_HALF_WIDTH() {return '!'.charCodeAt() - '！'.charCodeAt();}

	/**
	 * 指定されたASCII文字に対応する全角文字を取得します。
	 * @param {string} ascii
	 * @returns {string}
	 */
	static getFullwidth(ascii)
	{
		return String.fromCharCode(ascii.charCodeAt() - this.ADDEND_FULL_TO_HALF_WIDTH);
	}

	/**
	 * 指定されたカタカナに対応するひらがなを取得します。
	 * @param {string} katakana
	 * @returns {string}
	 */
	static getHiragana(katakana)
	{
		return String.fromCharCode(katakana.charCodeAt() - StringProcessor.ADDEND_HIRAGANA_TO_KATAKANA);
	}

	/**
	 * 指定されたカタカナに対応する半角カナを取得します。濁音、半濁音の場合は清音を返します。
	 * @param {string} katakana
 	 * @returns {string}
	 */
	static getHalfwidthKatakana(katakana)
	{
		let half;
		switch (katakana) {
			/*eslint-disable max-statements-per-line */
			case 'ヲ': half = 'ｦ'; break;
			case 'ァ': half = 'ｧ'; break;
			case 'ィ': half = 'ｨ'; break;
			case 'ゥ': half = 'ｩ'; break;
			case 'ェ': half = 'ｪ'; break;
			case 'ォ': half = 'ｫ'; break;
			case 'ャ': half = 'ｬ'; break;
			case 'ュ': half = 'ｭ'; break;
			case 'ョ': half = 'ｮ'; break;
			case 'ッ': half = 'ｯ'; break;
			case 'ー': half = 'ｰ'; break;
			case 'ア': half = 'ｱ'; break;
			case 'イ': half = 'ｲ'; break;
			case 'ウ': case 'ヴ': half = 'ｳ'; break;
			case 'エ': half = 'ｴ'; break;
			case 'オ': half = 'ｵ'; break;
			case 'カ': case 'ガ': half = 'ｶ'; break;
			case 'キ': case 'ギ': half = 'ｷ'; break;
			case 'ク': case 'グ': half = 'ｸ'; break;
			case 'ケ': case 'ゲ': half = 'ｹ'; break;
			case 'コ': case 'ゴ': half = 'ｺ'; break;
			case 'サ': case 'ザ': half = 'ｻ'; break;
			case 'シ': case 'ジ': half = 'ｼ'; break;
			case 'ス': case 'ズ': half = 'ｽ'; break;
			case 'セ': case 'ゼ': half = 'ｾ'; break;
			case 'ソ': case 'ゾ': half = 'ｿ'; break;
			case 'タ': case 'ダ': half = 'ﾀ'; break;
			case 'チ': case 'ヂ': half = 'ﾁ'; break;
			case 'ツ': case 'ヅ': half = 'ﾂ'; break;
			case 'テ': case 'デ': half = 'ﾃ'; break;
			case 'ト': case 'ド': half = 'ﾄ'; break;
			case 'ナ': half = 'ﾅ'; break;
			case 'ニ': half = 'ﾆ'; break;
			case 'ヌ': half = 'ﾇ'; break;
			case 'ネ': half = 'ﾈ'; break;
			case 'ノ': half = 'ﾉ'; break;
			case 'ハ': case 'バ': case 'パ': half = 'ﾊ'; break;
			case 'ヒ': case 'ビ': case 'ピ': half = 'ﾋ'; break;
			case 'フ': case 'ブ': case 'プ': half = 'ﾌ'; break;
			case 'ヘ': case 'ベ': case 'ペ': half = 'ﾍ'; break;
			case 'ホ': case 'ボ': case 'ポ': half = 'ﾎ'; break;
			case 'マ': half = 'ﾏ'; break;
			case 'ミ': half = 'ﾐ'; break;
			case 'ム': half = 'ﾑ'; break;
			case 'メ': half = 'ﾒ'; break;
			case 'モ': half = 'ﾓ'; break;
			case 'ヤ': half = 'ﾔ'; break;
			case 'ユ': half = 'ﾕ'; break;
			case 'ヨ': half = 'ﾖ'; break;
			case 'ラ': half = 'ﾗ'; break;
			case 'リ': half = 'ﾘ'; break;
			case 'ル': half = 'ﾙ'; break;
			case 'レ': half = 'ﾚ'; break;
			case 'ロ': half = 'ﾛ'; break;
			case 'ワ': half = 'ﾜ'; break;
			case 'ン': half = 'ﾝ'; break;
			/*eslint-enable max-statements-per-line */
		}
		return half;
	}

	/**
	 * 文字の種類を取得します。
	 * @param {string} character
	 * @returns {?string} 「清音」「濁音」「半濁音」「ASCII」のいずれか。長音の場合は「清音」を返します。
	 */
	static getType(character)
	{
		const result = /([ゔがきぐげござじずぜぞだぢづでどばびぶべぼヴガギグゲゴザジズゼゾダヂヅデドバビブベボ])|([ぱぴぷぺぽパピプペポ])|([ぁ-ゖァ-ヶー])|([ -~])/.exec(character);
		let type = null;
		if (result) {
			if (result[1]) {
				type = '濁音';
			} else if (result[2]) {
				type = '半濁音';
			} else if (result[3]) {
				type = '清音';
			} else if (result[4]) {
				type = 'ASCII';
			}
		}
		return type;
	}

	/**
	 * 正規化します。
	 * @param {string} word
	 * @returns {string}
	 */
	static normalize(word)
	{
		return word === WordProcessor.PHONE_NUMBER_REGEXP_STRING
			? word
			: StringProcessor.convertToKatakana(word.normalize('NFKC').replace('~', '～'));
	}

	/**
	 * C0 制御文字 %-符号化集合を含んでいれば真を返します。
	 * @see [URL Standard （日本語訳）]{@link https://triple-underscore.github.io/URL-ja.html#c0-control-percent-encode-set}
	 * @param {string} word
	 * @returns {boolean}
	 */
	static isSimpleEncodeSet(word)
	{
		return /[^ -~]/.test(word);
	}
}

class WordProcessor
{
	/**
	 * NGワードとして登録されている正規表現文字列。
	 * @constant {string}
	 */
	static get PHONE_NUMBER_REGEXP_STRING() {return '(0|０)[0-9-０-９ー－]{9,}';}

	/**
	 * URLの一部となりうるNGワード中に多く登場する文字。
	 * @constant {string[]}
	 */
	static get URL_PARTS_CHARACTERS() {return ['a', 'h', 'k'];}

	/**
	 * NGワードをリストアップしている表を取得します。
	 * @returns {HTMLTableElement}
	 */
	static getTable()
	{
		for (const th of document.querySelectorAll('#article-tab-nico + .left-box thead th:first-of-type')) {
			if (th.textContent === 'カテゴリ') {
				return th.parentElement.parentElement.parentElement;
			}
		}
	}

	/**
	 * 大百科からNGワードを取得します。
	 * @returns {string[]}
	 */
	static getWords()
	{
		const words = [];
		for (const td of
				this.getTable().querySelectorAll('td:first-of-type:not([rowspan]), td:first-of-type[rowspan] + td')) {
			words.push(td.textContent);
		}
		return words;
	}

	/**
	 * 大百科の記事の更新日時を取得します。
	 * @returns {Date}
	 */
	static getUpdated()
	{
		let dateString;
		for (const node of Array.from(document.getElementById('article').childNodes).reverse()) {
			if (node.nodeType === Node.TEXT_NODE) {
				const result = /^\s*初版作成日:\s*.+?\s*◆\s*最終更新日:\s*(.+?)\s*$/.exec(node.data);
				if (result) {
					dateString = result[1];
					break;
				}
			} else if (node.localName === 'span') {
				dateString = node.textContent;
				break;
			}
		}

		return new Date(`20${dateString.replace(/\//g, '-').replace(/* For Microsoft Edge */' ', 'T')}+09:00`);
	}

	/**
	 * ASCIIをパーセント符号化する正規表現文字列のリストを取得します。
	 * @param {string[]} words - それぞれ正規済み、かつ小文字化した文字列。
	 * @returns {string[][]} 置換前と置換後の正規表現文字列のペアのリスト (小文字の場合と大文字の場合の2つ)。
	 */
	static genereteRagExpsForURL(words)
	{
		let result = [];

		/**
		 * 置換ルールをまだ作成していないNGワード。
		 * @type {string[]}
		 */
		let otherWords = words.concat();

		/**
		 * 置換ルールをまだ作成していないパーセント符号化対象の文字。
		 * @type {string[]}
		 */
		const urlPartsCharacters = this.URL_PARTS_CHARACTERS.concat();

		const index = otherWords.indexOf(this.PHONE_NUMBER_REGEXP_STRING);
		if (index !== -1) {
			result = result.concat(RegExpProcessor.generateForNumberURL());
			otherWords.splice(index, 1);
		}

		for (let urlPartsCharacter; urlPartsCharacter = urlPartsCharacters.pop();) {
			/**
			 * urlPartsCharacter を含むNGワード。
			 * @type {string[]}
			 */
			const includedWords = otherWords.filter(function (word) {
				return word.indexOf(urlPartsCharacter) !== -1;
			});
			result = result.concat(RegExpProcessor.generateForURL(urlPartsCharacter, includedWords));
			otherWords = otherWords.filter(function (word) {
				return includedWords.indexOf(word) === -1;
			});

			if (urlPartsCharacters.length === 0 && otherWords.length > 0) {
				// すべてのパーセント符号化対象の文字でルールを作成済み、かつルールを作成していないNGワードが残っていれば
				// NGワードの末尾の文字をパーセント符号化対象の文字として追加
				urlPartsCharacters.push(otherWords[0].slice(-1));
			}
		}

		return result;
	}
}

class RegExpProcessor
{
	/**
	 * URLに一致する正規表現文字列。
	 * @constant {string}
	 */
	static get URL() {return "(?:ftp|http|https)://[-0-9A-Za-z!#$&'()*+,./:;=?@_~\\[\\]%]*?";}

	/**
	 * 正規表現言語要素をエスケープします。
	 * @param {string} str
	 * @returns {string}
	 */
	static escape(str)
	{
		return str.replace(/[.$^{[(|)*+?\\]/, function (character) {
			return '\\' + character;
		});
	}

	/**
	 * 置換パターンにおける正規表現言語要素をエスケープします。
	 * @see ["$" 文字の置換 | 正規表現での置換]{@link https://msdn.microsoft.com/library/ewy2t5e0#DollarSign}
	 * @param {string} str
	 * @returns {string}
	 */
	static escapeForReplacementPattern(str)
	{
		return str.replace(/\$/g, '$$$$');
	}

	/**
	 * 指定された文字と同一視される文字の正規表現文字列を取得します。
	 * @param {string} character
	 * @returns {string}
	 */
	static getEquivalentCharacters(character)
	{
		let regexpString;
		const type = CharacterProcessor.getType(character);
		switch (type) {
			case '清音':
				regexpString = '[' + CharacterProcessor.getHiragana(character)
					+ character + CharacterProcessor.getHalfwidthKatakana(character) + ']';
				break;
			case '濁音':
			case '半濁音':
				regexpString = '(?:' + CharacterProcessor.getHiragana(character)
					+ '|' + character
					+ '|' + CharacterProcessor.getHalfwidthKatakana(character)
						+ '[\\s　]*[' + (type === '濁音' ? '゛゙ﾞ' : '゜ﾟ゚') + '])';
				break;
			case 'ASCII':
				regexpString = character === '～'
					? character
					: '[' + (/[\]\\]/.test(character) ? '\\' : '')
						+ character + CharacterProcessor.getFullwidth(character) + ']';
				break;
			default:
				regexpString = character;
		}
		return regexpString;
	}

	/**
	 * {@link SEPARATOR} を挟む正規表現文字列を取得します。
	 * @param {string[]} words - それぞれ正規化済みの文字列で、最低2文字。
	 * @returns {string[]} 置換前と置換後、およびNGワード全体に一致する正規表現文字列の組。
	 */
	static generate(words)
	{
		const regexpStrings = [];
		for (const word of words) {
			if (word === WordProcessor.PHONE_NUMBER_REGEXP_STRING) {
				regexpStrings.push('[0０][0-9-０-９ー－]{8}(?=[0-9-０-９ー－])');
			} else {
				const characters = [];
				for (const character of word) {
					characters.push(this.getEquivalentCharacters(character));
				}
				const end = characters.pop();
				regexpStrings.push(characters.join('[\\s　]*') + '[\\s　]*(?=' + end + ')');
			}
		}
		return [
			'(?i:' + regexpStrings.join('|') + ')',
			'$0' + this.escapeForReplacementPattern(SEPARATOR),
		];
	}

	/**
	 * ASCIIをパーセント符号化する正規表現文字列のリストを取得します。
	 * @param {string} target - パーセント符号化するASCII文字列。英字なら小文字。
	 * @param {string[]} words - それぞれ正規済みの文字列で、targetを含みます。
	 * @returns {string[][]} 置換前と置換後の正規表現文字列のペアのリスト (小文字の場合と大文字の場合の2つ)。
	 */
	static generateForURL(target, words)
	{
		/**
		 * target が英字なら真。
		 * @type {Object}
		 */
		const alphabet = /[a-z]/.test(target);

		const lowerRegexpStrings = [];
		const upperRegexpStrings = [];
		for (const word of words) {
			const index = word.lastIndexOf(target);
			const b = '(?<b>' + this.escape(word.slice(0, index)) + ')';
			const c = '(?<c>' + this.escape(word.slice(index + 1)) + ')';
			lowerRegexpStrings.push(b + '(?-i:' + this.escape(target) + ')' + c);
			if (alphabet) {
				upperRegexpStrings.push(b + '(?-i:' + target.toUpperCase() + ')' + c);
			}
		}

		const pairs = [
			[
				'(?<a>' + this.URL + ')(?i:' + lowerRegexpStrings.join('|') + ')',
				'${a}${b}%' + target.codePointAt().toString(16).toUpperCase() + '${c}',
			],
		];

		if (alphabet) {
			pairs.push([
				'(?<a>' + this.URL + ')(?i:' + upperRegexpStrings.join('|') + ')',
				'${a}${b}%' + target.toUpperCase().codePointAt().toString(16).toUpperCase() + '${c}',
			]);
		}

		return pairs;
	}

	/**
	 * URL中の {@link WordProcessor.PHONE_NUMBER_REGEXP_STRING} をパーセント符号化する正規表現文字列のリストを取得します。
	 * @returns {string[][]} 置換前と置換後の正規表現文字列のペアのリスト (数字の場合と横棒の場合の2つ)。
	 */
	static generateForNumberURL()
	{
		return [
			[this.URL + '0[0-9-]{8}(?=[0-9])', '$0%3'],
			['(' + this.URL + '0[0-9-]{8})-(?=[0-9-])', '$1%2D'],
		];
	}
}

class SubstList
{
	/**
	 * NiconamaCommentViewerの文字列置換の名前空間。
	 * @constant {string}
	 */
	static get NCV_SUBST_NAMASPACE() {return 'http://posite-c.jp/niconamacommentviewer/substitutionlist/';}

	/**
	 * 当スクリプトの名前空間。
	 * @constant {string}
	 */
	static get BLACKLIST_NAMESPACE() {return 'https://greasyfork.org/scripts/11567';}

	/**
	 * コメント置換文字列一覧を記録するXML文書を生成します。
	 * @param {Date} updated - 生成時の記事の更新日時。
	 */
	constructor(updated)
	{
		this.document = document.implementation.createDocument(SubstList.NCV_SUBST_NAMASPACE, 'SubstitutionList');
		this.document.documentElement
			.setAttributeNS(SubstList.BLACKLIST_NAMESPACE, 'blacklist:updated', updated.toISOString());
	}

	/**
	 * 置換ルールを追加します。
	 * @param {string} oldWord - 置換前文字列。
	 * @param {string} newWord - 置換後文字列。
	 * @param {boolean} regex - 正規表現なら真。
	 * @param {string} type - 置換ルールの種類。
	 *     - `url` …… URLのためのルール。
	 *     - `split` …… {@link SEPARATOR}の挿入による分断。
	 *     - `unsplittable` …… 1文字のNGワードに対する、同意文字への置き換え。
	 */
	addSubst(oldWord, newWord, regex, type)
	{
		this.document.documentElement.insertAdjacentHTML(
			'beforeend',
			(this.document.documentElement.hasChildNodes() ? '' : '\n') + h`
				<subst_client is_regex="${regex ? 'True' : 'False'}" status="True">
					<old>${oldWord}</old>
					<new>${newWord}</new>
				</subst_client>
			`.replace(/^(?:\n|\t{3})/mg, ''));
		this.document.documentElement.lastElementChild.setAttributeNS(SubstList.BLACKLIST_NAMESPACE, 'type', type);
	}

	/**
	 * XML文書を文字列として返します。
	 * @returns {string}
	 */
	toString()
	{
		return ('<?xml version="1.0" encoding="utf-8"?>\n' + this.document.documentElement.outerHTML)
			.replace(/\n/g, '\r\n');
	}
}

GM.registerMenuCommand('NGワード置換ファイルを生成', async function () {
	/**
	 * 正規化前のNGワード。
	 * @type {string[]}
	 */
	const words = WordProcessor.getWords();

	/**
	 * 正規化済みの2文字以上のNGワード。
	 * @type {string[]}
	 */
	const splittableWords = [];

	/**
	 * 1文字のNGワード。キーに置換前の文字、値に置換後の文字。
	 * @type {Object.<string>}
	 */
	const unsplittableWords = [];

	/**
	 * URLの一部となりうる正規化済み、かつ小文字化したNGワード。
	 * @type {string[]}
	 */
	const urlPartsWords = [];

	/**
	 * 前回生成時のNGワード。削除されたNGワード。
	 * @type {?string[]}
	 */
	let previousNGWords = await GM.getValue('previousNGWords');
	if (previousNGWords) {
		previousNGWords = JSON.parse(previousNGWords);
	}

	/**
	 * 追加されたNGワード (当スクリプトの更新後に置換可能となったNGワードを含む)。
	 * @type {string[]}
	 */
	const addedWords = [];

	/**
	 * 置換不能なNGワード。
	 * @type {string[]}
	 */
	const nonsubstitutableWords = [];

	for (const word of words) {
		if (previousNGWords) {
			const index = previousNGWords.indexOf(word);
			if (index === -1) {
				// 追加されたNGワード
				addedWords.push(word);
			} else {
				// 前回も存在していたNGワード
				previousNGWords.splice(index, 1);
			}
		}

		/**
		 * 正規化したNGワード。
		 * @type {string}
		 */
		const normalizedWord = CharacterProcessor.normalize(word);

		if (normalizedWord === WordProcessor.PHONE_NUMBER_REGEXP_STRING
			|| !CharacterProcessor.isSimpleEncodeSet(normalizedWord)) {
			urlPartsWords.push(normalizedWord.toLowerCase());
		}

		if (normalizedWord.length >= 2) {
			// 2文字以上
			splittableWords.push(normalizedWord);
		} else {
			// 1文字
			const variant = CharacterProcessor.VARIANTS[normalizedWord];
			if (variant) {
				// 代替文字が定義されていれば
				unsplittableWords[normalizedWord] = variant;
			} else {
				nonsubstitutableWords.push(word);
				addedWords.pop();
			}
		}
	}

	const messages = [];
	if (previousNGWords) {
		if (addedWords.length > 0) {
			messages.push('【追加されたNGワード】\n•' + addedWords.join('\n•'));
		}
		if (previousNGWords.length > 0) {
			messages.push('【削除されたNGワード】\n•' + previousNGWords.join('\n•'));
		}
		if (messages.length === 0) {
			messages.push('(前回生成時から増減なし)');
		}
	}
	if (nonsubstitutableWords.length > 0) {
		messages.push('【置換できないNGワード】\n•' + nonsubstitutableWords.join('\n•'));
		for (const word of nonsubstitutableWords) {
			words.splice(words.indexOf(word), 1);
		}
	}

	if (messages.length === 0 || window.confirm(messages.join('\n\n') + '\n\nファイルを生成しますか?')) {
		// 置換ルールの生成
		const substList = new SubstList(WordProcessor.getUpdated());
		for (const pair of WordProcessor.genereteRagExpsForURL(urlPartsWords)) {
			substList.addSubst(pair[0], pair[1], true, 'url');
		}
		substList.addSubst(...RegExpProcessor.generate(splittableWords), true, 'split');
		for (const word in unsplittableWords) {
			substList.addSubst(word, unsplittableWords[word], false, 'unsplittable');
		}

		// XML文書のBlobへの変換、Blob URLの生成、保存ダイアログの表示
		MarkupUtils.download(
			URL.createFor(new Blob([substList.toString()], {type: 'text/xml'})),
			'SubstList_Writing.xml'
		);

		// 置換ワードの保存
		GM.setValue('previousNGWords', JSON.stringify(words));
	}
});

})();
