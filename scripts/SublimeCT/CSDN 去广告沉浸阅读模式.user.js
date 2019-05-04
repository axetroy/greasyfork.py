// ==UserScript==
// @name         CSDN 去广告沉浸阅读模式
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  加入随机背景图片, 净化剪切板; 移除页面内广告和底部列表中的下载链接, 建议使用 ABP 屏蔽广告!!!; 清理 CSDN 底部提示栏及广告并直接展开内容
// @icon         https://avatar.csdn.net/D/7/F/3_nevergk.jpg
// @author       sven
// @include      https://blog.csdn.net/*
// @include      https://bbs.csdn.net/topics/*
// @include      https://*.iteye.com/blog/*
// @include      https://*.iteye.com/news/*
// @run-at       document-end
// @match        <$URL$>
// ==/UserScript==

(function() {
    'use strict';
    (() => {
        // const IMG_MAX_ID = 887
        // 爬到的所有现在可访问的背景图ID
        const IMG_ID_LIST = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 608, 609, 610, 611, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750, 751, 752, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 842, 843, 844, 845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872, 873, 874, 875, 876, 877, 878, 879, 880, 881, 882, 883, 884, 885, 886, 887, ]
        const IMG_ID_LIST_LENGTH = 735
        const SHEETS = `
            body { background-image: url(https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/${IMG_ID_LIST[Math.ceil(Math.random() * IMG_ID_LIST_LENGTH)]}.jpg); background-color:#EAEAEA !important; background-attachment: fixed ;background-size; cover; background-repeat: no-repeat; background-size: 100%; }
            body>.container.container-box,main { opacity: 0.9; }
            main {margin: 20px;}
            #local { position: fixed; left: -99999px }
            .recommend-item-box .content,.post_feed_box,.topic_r,.mod_topic_wrap,#bbs_title_bar,#bbs_detail_wrap,#left-box,main {width: 100% !important;}
            a[href^="https://edu.csdn.net/topic"],.adsbygoogle,.mediav_ad,.bbs_feed_ad_box,.bbs_title_h,.title_bar_fixed,#adContent,.crumbs,#page>#content>#nav,#local,#reportContent,.comment-list-container>.opt-box.text-center,.type_hot_word,.blog-expert-recommend-box,.login-mark,#passportbox,.hljs-button.signin,.recommend-download-box,.recommend-ad-box,#dmp_ad_58,.blog_star_enter,#header,.blog-sidebar,.blog-sidebar,#new_post.login,.mod_fun_wrap,.hide_topic_box,.bbs_bread_wrap,.news-nav,#rightList.right-box,aside,#kp_box_476,.tool-box,.recommend-right,.pulllog-box,.adblock,.fourth_column,.hide-article-box,#csdn-toolbar
                {display: none !important;}
            .hide-main-content,#blog_content,#bbs_detail_wrap,.article_content {height: auto !important;}
            .comment-list-box,#bbs_detail_wrap {max-height: none !important;}
            #main {width: 100% !important;}
            #page {width: 80vw !important;}
            #bbs_title_bar {margin-top: 20px;}
            #page>#content {margin-top: 0 !important;}
            #bbs_title_bar > .owner_top,.blog-content-box { border-top-left-radius: 8px; border-top-right-radius: 8px; }
        `
        class CSDNCleaner {
            constructor () {
                console.log('%c[CSDN 去广告沉浸阅读模式] %c感谢支持, %c欢迎反馈: https://greasyfork.org/zh-CN/scripts/373457-csdn-%E5%8E%BB%E5%B9%BF%E5%91%8A%E6%B2%89%E6%B5%B8%E9%98%85%E8%AF%BB%E6%A8%A1%E5%BC%8F/feedback', 'font-size: 16px;color:#C60', 'color: teal', '')
                window.addEventListener('DOMContentLoaded', this.onLoad)
            }
            // 通过注入 css 实现隐藏广告并固定布局
            appendSheets () {
                const sheet = document.createTextNode(SHEETS)
                const el = document.createElement('style')
                el.appendChild(sheet)
                document.getElementsByTagName('head')[0].appendChild(el)
                return this
            }
            // 复制功能
            cleanCopy () {
                csdn.copyright.init('', '', '')
                return this
            }
            onLoad () {
                document.body.setAttribute('style', 'background-color:#EAEAEA !important')
            }
        }
        const fc = new CSDNCleaner()
        fc.appendSheets().cleanCopy()
    })()
})();