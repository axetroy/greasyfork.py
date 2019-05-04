// ==UserScript==
// @name         MetaFilter Recent Activity border o' rainbows
// @namespace    https://greasyfork.org/scripts/1527-metafilter-recent-activity-border-o-rainbows
// @version      2.1
// @description  Shows rainbows atop tiny clouds around your own comments in Recent Activity (for logged-in members)
// @include      https://www.metafilter.com/contribute/activity/*
// @include      http://www.metafilter.com/contribute/activity/*
// @match        https://www.metafilter.com/contribute/activity/*
// @match        http://www.metafilter.com/contribute/activity/*
// @grant        GM_addStyle
// ==/UserScript==
//
// Version 2.1: 2014-05-23 - Replaced @namespace with script home page.
// Version 2.0: 2014-05-23 - Changed script URLs to point to greasyfork.org,
//  since userscripts.org hasn't been stable recently.
// Version 1.1: 2013-11-01 - Added support for automatic script updates (had
//  to upload to userscripts.org first to get the URLs).
// Version 1.0: 2013-11-01 - Grand opening.
//
// This script was inspired by a MetaTalk comment from phunniemee:
// <http://metatalk.metafilter.com/22732/A-Pony-with-a-Green-Check-Cutie-Mark#1094368>
//
// The original rainbow cloud graphic is from a clip art library I got over
// 15 years ago.

// Border image is 126x126 transparent PNG divided into nine equal sections.
var rainbows = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAB+CAYAAADiI6WIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAC5xJREFUeNrsXAlwldUZPSEbCSEkIQFakSWyClI04ASwaCo4pWUKXSKOVYfFTscOUgEHGGSGspSII9qWaWtBgQmFVoIFWiEOqQuUQsqiDEHAEPZgMWyPkIUs5PZ87yUs4QX+t2Bzk+/M/Jn//ct3z/ede++/ZU6IMQaK5ocWWgIVXqHCK1R4hQqvUOEVKrxChVeo8IrGjTD5ExISEkiMzvcBjz0APHAP0L4V0LYGKDsBFB0CDuUB/+YxewJpoO7tYjPhKUghzyG9gF6dgXYcndGlwPnTwFfkmXcE+ITHnAiIp7+vbNsAP1wAbD4mIW6zlHH5DfBpN+DFuo7mD9GmzlPalLaFQ9kduEoukpPk5i/PEPcf33po94XA0mnAo/LjCLvjhe5AzDeBcA6jFixZSRWHUjFQzi6adBToW3tiJnCaVZ3MXVlfw0iyhSdigfTFwJvPAffI7/1cziYDUfwVzZ0x4UBNNVDFYV/yJZBwGLivxnPua8CW6cDPuHr4rgnPHvnsOmAFC9RiJwlVPAHEdQIiWdRQLhGhQDUJtWD+VVe5zrCsLUpY1Kh/Av1ZyRL+Hgz8kVPWL+5WQW3hKeCU/oftwAsxXN9LruXDKDRFD5cpgOHCybWG4cLIu5Jcr5J3BRfXSeazGXi42N1Rajj0xxYAK4Mu/CBgOgm+yusLtg5ngw8BrUmmLI6BePFsy4tR27Ykxp5ZTcLnL7HX5rPQZBNXTmbM5Ggu8CALm8AY3weyNwHfC3ZBbeEpYNBNG4ERF7j+GQVPTmVnZA90RZEfe29SD3LlfB7GcKGcoc6f58IrewiTi3YBl9kBdn4KDM3hDODpqDN2AAuDJnwXYByvK8sOcP3MT4HeXYFLHYBEtpTIQhazsNyPYyzmxUrPXVM31qB7JHss9+Xt4zEf8Td7byGn1bh3mKSH6Ns7PNNUUApqC8/aDrqUHfR5TjJwTQA6clo/zBEd+x3OAv04A5Hb4QqggKHOk1t8BNCV4neVSwP3nWMHOMcAbc4AB5lUh1XA/XDvH38cWB4M4XucA76oYuMnx/EixNFS8TgL8m1gN7vqYvbQNSR1hSRB4mARcdmz3o7bn+b2GUm8jW4N5K7lebwSnTpLIZYC9/Iwdu6nqMG7QSioLTzB5sZwcvnrKa6fY3e6l+0e5f1H6k94205Or7Ld1eRXxAbBTghyQoVnvSW3P8ntL3JmGsAp6ei/mMqHvCnhbNCJcoezUyQCPXl0fkDC/xr4fCY7055nOUI4esKfJHG5/bzIKkjxCuTBYjSLOIoZP8yFLGuYUii7Y+J7lCPXTfx1Hj/1QR6+lb3zA2AfaQ3m7jUclGM4uAItqC08Bew9LtJrs/3HQD9O52e+y5lnKLDoM+Dl+NoOmc95/xwPuMr5pgW7nuFGs5McN/DBdL37RmYMO8NiHl/J3KpI8DxHfwqv8rzjP/AK0Mdv4dkRf8CbyA2FjzAZjpyokWxEHoR55+NigbBhCrvlIg6j2lFUfMKFytJKxHaKQ2xMhDtIJCez1OeBtI8xisHW9yYrXjRjtvA09tQeeznKgElFzMHfgtrCU9COffEr4Hf5/Tl6OSOV8Jnjfl7sRx8kTT5x4OM0Tjlvc4Qne04oLqlE8UkXIlpFILZznHsGaCmBpgKj3kAchc/jnWEE70LL3ycHzgAdtwEMNYoTx9/9eo7nY812E8VYz8CUf8A+VwbT8hgM9iYYTDxmMJknP/XeFnRMGcvDO3lmRPczcFtExT+OQT9/Ey+VlGMqj5u1yOAszMg8z+Puvt/D5D7HuKEwyzhFB/J8bAtPgcSQWBJTYssp0pa06W5bOAgX4STchKOHa5Sbu+QguUhOkhtzlFwlZ8ldaiC1kJr4+wIn4W/cfSIR5uSfYAq/hIk4SnI72xm8wJMmFBahY790BzevHTD69Y2YIkX9rcFpmLf+C1NRAJP9SxjXABgOSsMx8g0/C2oLT8i5EkNiSUyJLW1IW+42pW3hIFzuBMlJcpMcmavkLLlLDaQWUhN4HkycCx8dHT1sxbJlR7a8n21WThlvtq+Emf2PcNN7VZrpPSPboPc7H8lhPr2l6Pej2XiJjf3lV+5Ec8/AFOXAHBwGwxnZfMt9afKtoLbwrIOcKzEklsSU2G7RpS1pU9r2DdGSo+QqOUvuUgOphdREaiM1cip839zcXFOHMi5vZc4x+XnHjCnmj1Jj5r48fr1fLyUHZ6zGdDb4WrSZvXWI2bbuCbOwD8zc7okmf/cek5WVlb98+fL9a9euPZ6Wljb9DgVt9Dxlnxwjx8o5cq7EkFgSU2JLG+62pE0/IDlKrpKz5C41KDPXITXC9ZeStwrfpUuX9DVr1nxeUFBgnGDs2LGrUlJSJvj4XrtFy8EZp7bmnDBXLxtzkQyzszeZ7F2feG2jW7duY+oX1Baess3bsRJDYklMiS1tSFs+fikNk5wkNyc1kFpJzaR2NwmfkJAwxOVyGX+wZMmSQ7U3Ho7w9OjHVjuNvWDBgi9uLKgtPAWyzen50pYPokdJLv7UQGonNbwm/KxZs3JMAEhNTZ3phHHr1q0fOrA/75LTuFeuXDE9e/bMqCuoLTxlXbY5hbQlbTrhJjkEUoPaGnqml/bt5X2V/0hOTu7n5LiMjIzM3n36xjqNGxkZiTlz5ly7I7eFp6zLNqeQtqTNYObQEOpq6BZ+xYoVGwMJtnnz5nedHNerV69EX2NfvHjxTN26LTxvXHcKp206zaEhXKth7TUp5tAh3y4blZWVZvfu3SUjR458zWmjQ4cOnehLG6dOnTJJSUlpN1w7reAp67LNF0ibTvlJLpKT5OYLpHZSw5vu6idNmrTNlyD9+/d/xfM/BL6hb9++4yZPnpw1bdo0r+2xRxZyqvxw5syZOa1atRpR/6bJFp6yTfbJMXKstxgSW9qQtvwYvLGSmy+1kNp5e47vOH/+/NyzZ8+67/7mzZv3n8zMzMP1Ty4tLTUjRoyYgyBgwIABc/mYcaGwsFBG5dWJEyeu8/a2qd7zsS08b3q7KOfIuRJDYknMYHCTHCXX+pCaSG2kRlIrqZnUrsGPNOHh4YPCwsJCy8vLpXeEDB8+fBqDD46Pj4/etWvX8aysrD8z0BYED9Gef5pBkXxGd/rxwxaet7wWdn+ncX8rLAsWMV5aHk1PT39m4MCBXXh/UZadnb09JydHLm0mKirqkerq6qtVVVU7bvk6p2h+0P+rV+EVKrxChVeo8AoVXqHCK1R4hQqvUOEVKrxChVeo8AoVXqHCK1R4hQqvUOEVKrzCZ1jlbGkL1NkyyI6Rtiz+DkJ1tmxmI16dLZuh8Ops2QyFV2fLZii8Olv64BjZVIRXZ0sfHSObivDqbOmjY2RTEF6dLf1wjGwKz/HqbOmHY6TtwquzpZ+OkbYLr86WfjpG2ia8Olve8DUwEMdIm4RXZ8t6CMQx0ibh1dnyBgTqGGnLos6W9RCoY6QtUGfLegjUMdIWqLNlPQTqGGnLos6WXhCIY6RNN3fqbHkb+OoYafELHHW29Pr2yaFjZBP4SKPOlor/L/T/6lV4hQqvUOEVKrxChVeo8AoVXqHCK1R4hQqvUOEVKrxChVeo8AoVXqHCK1R4hQqv8BlWOVta4RgJdbYMurOlv53763SMVGfLu+BsaYNjpC08rXK2tMEx0haeVjlb2uAYaQtPq5wtbXCMtIWnVc6WNjhG2sLTKmdLGxwjbeFplbOlFY6RUGfLoDtb3g6NxTFSnS2vI2jOlg2hMTlGqrNlfQTB2bIhNCbHSHW29IYAnS3r0JgdI9XZsoGvgYE4W7rfHjZyx0h1tmwAgThbChq7Y6Q6W3pBoM6WNjhGqrOlFwTqbGmDY6QtPK1ytrTCMRLqbHkLAnW2tMExUp0tG0AgzpaCxu4Yqc6WDuCrs6W3t4uNzTFSnS19efvk0NnSBsdIW3iqs2Uzhf5fvQqvUOEVKrxChVeo8AoVXqHCK1R4RSPH/wQYACYkxLqBPIadAAAAAElFTkSuQmCC';

// Modify CSS class for user's own comments in Recent Activity.
GM_addStyle("div.mycomments { border: inset grey 42px !important; border-image: url(" + rainbows + ") 42 round !important; padding-right: 12px !important; padding-left:12px !important; }");