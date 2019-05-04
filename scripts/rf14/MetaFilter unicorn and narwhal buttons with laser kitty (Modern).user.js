// ==UserScript==
// @name            MetaFilter unicorn and narwhal buttons with laser kitty (Modern)
// @namespace       https://greasyfork.org/users/2049-rf14
// @description     Shows unicorn and narwhal buttons on the comment form, and a laser kitty on deleted posts (for logged-in members)
// @version         3.1
// @homepage        https://greasyfork.org/en/scripts/7265-metafilter-unicorn-and-narwhal-buttons-with-laser-kitty
// @include         http://metafilter.com/*
// @include         http://*.metafilter.com/*
// @include         https://metafilter.com/*
// @include         https://*.metafilter.com/*
// @match           http://metafilter.com/*
// @match           http://*.metafilter.com/*
// @match           https://metafilter.com/*
// @match           https://*.metafilter.com/*
// @grant           GM_addStyle
// ==/UserScript==
//
// This is an update of the awesome script created by Rhomboid, and is shared
//  here with his permission.  Modified by rangefinder 1.4.  Also available
//  as a user style for Stylish:
//  <https://userstyles.org/styles/131778/metafilter-unicorn-narwhal-buttons-laser-kitty>
//
// Version 3.1: 2016-08-21 - (Minor syntax cleanup...version 3.0 still works
//  for me.)  Added "Modern" to @name to distinguish it from Rhomboid's script 
//  name.  Removed extra ";" in "box-shadow" line and some extra spaces.
//
// Version 3.0: 2014-12-31 - Updated version 2.0 of Rhomboid's script to add
//  compatibility for Modern theme (fixed Preview button, added text wrap on
//  Post button, stopped background image from changing position on hover);
//  general style enhancements for buttons (text legibility, highlighted
//  border on hover).

GM_addStyle('input#postButton {' +
            '  height: 100px !important;' +
            '  width: 100px !important;' +
            '  white-space: normal !important;' +
            '  color: #000 !important;' +
            '  font-weight: bolder !important;' +
            '  background: #fff url(' + unicorn() + ') no-repeat center !important;' +
            '  border: 1px solid #5c5c5c !important;' +
            '  text-shadow: 0 0 0.3em #fff, 0 0 0.3em #fff, 0 0 0.3em #fff, 0 0 0.3em #fff !important;' +
            '}' +
            'input[value="Preview"], input.button[value="Preview"], input#previewButton {' +  // .button and #previewButton for metatalk
            '  height: 100px !important;' +
            '  width: 100px !important;' +
            '  vertical-align: top !important;' +  // for classic and plain themes
            '  color: #000 !important;' +
            '  font-weight: bolder !important;' +
            '  background: #fff url(' + narwhal() + ') no-repeat center !important;' +
            '  border: 1px solid #5c5c5c !important;' +
            '  text-shadow: 0 0 0.3em #fff, 0 0 0.3em #fff, 0 0 0.3em #fff, 0 0 0.3em #fff !important;' +
            '}' +
            'input#postButton:hover, input[value="Preview"]:hover, input.button[value="Preview"]:hover, input#previewButton:hover {' +
            '  background-position: center center !important;' +
            '  border: 1px solid #66afe9 !important;' +  // same as form-control:focus
            '  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(102, 175, 233, 0.6) !important;' +
            '}' +
            '#newcommentsmsg[style*="border: 1px solid white"] {' +
            '  background-image: url(' + laser() + ') !important;' +
            '  background-repeat: no-repeat !important;' +
            '  background-position: center bottom !important;' +
            '  padding-bottom: 170px !important;' +
            '}');

function unicorn() {
    return 'data:image/jpg;base64,' +
    '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' +
    'VGokUUUUIRRRRQhFFFFCF//2Q==';
}

function narwhal() {
    return 'data:image/jpg;base64,' +
    '/9j/4AAQSkZJRgABAQEAlgCWAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhE' +
    'PERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh' +
    '4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCABkAGQDA' +
    'SIAAhEBAxEB/8QAHAAAAQUBAQEAAAAAAAAAAAAAAAMEBQYHAQgC/8QAOxAAAQMDAwEGAwUIAQUB' +
    'AAAAAQIDBAAFEQYSITEHE0FRYXEigZEIFDJCchUjM1JiobHRwRZDgqLh8P/EABwBAAICAwEBAAA' +
    'AAAAAAAAAAAQGBQcAAgMBCP/EADYRAAEDAgMFBQcEAgMAAAAAAAECAxEABAUSIRMxQVFhBnGBka' +
    'EUIjJCUrHBBxUWJNHwM+Hx/9oADAMBAAIRAxEAPwDXqKrT2r4g/hRX1/qIT/umj2sJB/hQmkfqW' +
    'Vf6prRhd0r5ftVeKvmB81XCiqIvU93dOGy0j9Def85pJdwv7/V+SPb4P9V47ZJY/wCd1CO9UUOv' +
    'FWE1oFJPSYzIJekNNgddywKz9Ue5v/xn1n9bpP8AuuxrJIkymIqHWgt5e3Ks4AwST9Aajl3+ENn' +
    'KbtJPIAn1E1rb4mLl5LLSZKjA1rRI8xqRZEvFt5K2Ula1FlQG3xI45Hjx4VDOantKeEuuOH+ls/' +
    '8AOKtdvYd+7CK9IDi1NltThTjdx1x51WdL6TZTqePHfbUWi7tS4T+IeOPXFQuGYvasp2dyFEqPu' +
    'xEcSZmnHH7F4XDWwTorQmJiBofL7Uzk6pYZGfuEsA9C4kJBq7aSgtSbW7f7pCkOxmEFSIrLanVu' +
    'EDJwlIyrywOpq5TNJWKUz3Sre22MYBbJB/8Avzqpdss3UWhOymRcdFlpT8BwLd+8Nd6Q0VHcQOB' +
    'wSD7Ubd4i0tuEIiN+szRGF4O4LkDNJMASIg+tfVx1vruM1vs3ZBc5ERA+DvrrEjubfRsKUR7daf' +
    '6WvLetrDKl6h0hdNPvxVlDrVxY2KwBne2sfiT6jxHSvLEXt67T5CwtV9aTnwTFbA/xU/bftF69t' +
    'q0me3bbm2OqVs92T80/6qC/dmQqDVinsBixZ2qcpHf/AJFXa4627L2prratbXBrCsBJtkvp8gAf' +
    'fFFLWn7UmlXoSVXSwXSPKHC0MhLiPcHiijhihjRfrSwvsxdBRCrfXuFR8fTTq8Yhvq9V5H+qkY+' +
    'lX/FiO1+o5P8AbNTz132DOxCB5qVUPP1fCj5Dk9oEflbG41VTuP41fnKp1aukk+kmoS0/TFpz41' +
    'LX46eg/NOmdMEAd5KAHklFOkWC3NDLrrivdYAqnTdeschluS8fMq2imLWpb/cVYttqCh/MEKXj5' +
    '8CsawbFbg7iPT/umVj9NLC2TncaSBzUf8n8VoiYdlZ/7bSvclVNLg5DdnQYDJbjsvLUVLSjaoqS' +
    'AUpSfAnk568cVU2bXrWbzInMwkHwBGf/AFB/zS9p0u47qBUW7XWTKQhgPN/EU7lZIOMk428evI6' +
    'VMWvZe6tlpuLhQgcNa6pscEtTs7dxBXwCBPqAB61ocFtTboSqS8pKuOdvH0FRt3vkSyXiL3spht' +
    'xpwOIC14KsKx9DipS2MoZ2td86ABhKlqKj9TzTC7W+L98LzjDLj34d6kAnHhzTCzaJuXUAmCDIP' +
    '48RNcLm4bt2lOOJKgOAMVpkDUFpmxBJanMJTjKgtYSU+4NfaZFsvcGRHStmbGcSWnkDkEEYII9R' +
    'WUlpH8opeHIlQX+/hSFx3MYJT0I8iOhplNnA3zS0jGWyoSkiqVqb7MLbl3dk6b1AmFCcUVCPJYK' +
    'y16BQPI96kNK/Zu02UNS7zfZl1bPIRHSGm1fPkn+1XKZf73Mjqjvzz3ahhQQhKSoe4FctF7utpa' +
    '7mI+hTOcht1O4A+niKD/ampzZdaZv55fbMMB85e78xNW6w6M0lY7ai32zTtvZjo5ALCVEnxJJBJ' +
    'NFVGZfr3Ke71VwWzxgIZ+FIoogWp4CoVeNNqUSpZJ8awuNHvt9cw0iVKBPJzhA+fQVY7X2eyF4X' +
    'cpiGh4tsjcfqeB/etFQ2hCAhCUpSBgADAFdxQTLDLQgDTyFS+I9v8QflNqkNJ8z5nTyFQVt0pY4' +
    'GCiEh1Y/O98Z+h4+gqZShKUhKQAB0ApTbRtotLyU7qSrq6ubtWe4WVHqSa+MVDyWP2je1Ql3FyE' +
    '4y2l2OGkp3rzncoKUCeMYIGOOvWpvbVYvjltnaniWqTckR1d2VMlhaO+Q6FDgkglIIxjGMnih7t' +
    '4qaImi8GR/aGk7/AAq2WxqTGXmTPckeAPdpSR68DrTm6MNhCXUqUdwz8XWkorammkNuvOPlPVag' +
    'ApX0AFOLiI4id/3hQkHHxmoq3cyKCp3U03rW1YUmJkVF4oxX2ACMggg+Vd21Pe00hbOk8UYpTbR' +
    'trz2msyUniilNtFZ7TWZKfX2+aI0vpxm76qvES2wlNoCVuqwpxwjKgkAFayDngZ4HSm2gNSdnOv' +
    'W5A0jqVm5OMjc42NyHUJ8y2sJVtzxnGPWsL+0lfIFr7RJLGrm4EizP21JhxpFvLq5bZK8JjO4xH' +
    'UlzapZynKQkHO0JLa168g3jtW0gnTN7t18mov7j0M220GF+zbKWiFQ3fgTvOMHHxBJRncdwocBJ' +
    'RmNMQt2yjORXou9W8Q1pU2TsUSgg87VDGR7YII9/SmASSCQDgdeKltQSQ68YqcqWh0reV0G7aAE' +
    'j2HU+dMLdc3bbKU2+33kN4g7gOWzjHPpS5jeJvWDJcZRnI4TECuVrh6Ll/Z5o08zy/NYVrzXFyv' +
    'Fyl222SHYNsjuqZWpslLshSThWT1Sn0HJ8fKqA9BeZlplQFlpxPPwqwc1uHbZo5lTi9RWeOn4xv' +
    'kJbTwtP8+B4jx9MeVZFUbZY0b9AfbMdOXSvons1g+FOYSlplEfV9U9T/oq1wu1bV8aEiO7boUla' +
    'BjvV53H3wcGoW9aw1VqGQlNyeSzDSdwYaASnOOD5nr41G0UWq4UpJSQNaOteylhaPpebmRrvqds' +
    'eq71ZyBGlqU34tufEk/WtV0LrO135P3ee8mFOA4axkOn+gn/B596wtbjaThS0pPqcV9gnhQPqCK' +
    'CeS6tottOFE8R/v2itcW7IYViZ2i2gF/UB9xuPjXpxtyA48pkPuJWnqCgHH96WfhONtd8kpdZP5' +
    '0HIHv5Vi+i9ZPoltRbrJ8ktyVnOPABZ8R6/XzGpQ7tKRI+7BooUv4V7VcEeeKW3cTxjDnQC5mHJ' +
    'WoPjv9aq7GOxjNsvZqRHIjTyp7iiug8UU0s9qLNbaVLXBO8a6UgvYBeIcKUokDjprSF70FaO0K3' +
    'OWu82mNc48bCwl5RSpsnP4FAgpJwehFQ+huz/AEnoN15WmbI1bpC/hce3qW8Rn8O9ZKgM+AOKts' +
    'N9+JIEiM4ptweIPUeR865OUp5551JSFuKK+nAJ5xRJvEFCUoURzk6d+lCahMCkMelOkwGU2cTUS' +
    'y46XtjjSh+HOSCPTim1xbRLgRm+6S1IaBC1pPC/LI+tJqhTGbdGWQUFeVI54UASDRzaGSxIeBJM' +
    'EEbuSp5ToTEa1pBBOk1l2u+0WfofXa7ZcGvv1kmMNyEtpADjGcpO3wPKCcHz6jpUZe9OW3UFqXq' +
    'nRLyJkM8yIzX4mj4/D1H6T8qo/wBoq5N3DtFkNtKCkwmERiR03DKlD5FZHyql6I1nedD6gbvFoe' +
    'OAcSI6j+7fR4pUP8HwqCcwjT2i091w7x8qu/ketXJgl1cYfatPI+LKJB3EdescauXjX0yhLj7bb' +
    'jvcoUr43DzsQBlSvkkE/KtD1pabTqbScTtF0ogCHMTvlsJH8NfRRx4EHII+fvnWGioCQla2FAod' +
    'CPxFCgUqx67VHHrW2GXTV0UqWIAMKHEQdRVisYn7fYqetPjgwDwVGgPj6VY+zXtSblKfTpzS0uJ' +
    'p5iQiI5c1W1p5hTqzhCX3FJK8rJAyT1UOE5Aqxdqlhta7BA1nZYLNuD8tUC5Q2BhlD+3elxtP5Q' +
    'pI5HQZHqTnnZd2Qdo0CQuDa769P0ZNltSnWrdvW3NU0sLbC/h2tkEJ3AqBGMEccab2tXGJbNLQd' +
    'EMymZNx+/m43UsrC0R1hGxDO4cFQHJ8iPWrGxhFv+1EupSlUjJljUeG8daojsS/jP8ALMqVuKbI' +
    'O0zzAM9f/AYisxrQOz3VbyVtW2W6O8QNkdxXO4fyH/j6eVZ9XUkpIUCQQcgjwqtbq1RctlC6+hb' +
    '6xbvmS054Hka9EI1JLSkAttn1wP8AkUVQ9Pa1s7lrbF8LyZqPgUttGQ4B0UfXz9s0UlLwtSVFJZ' +
    'J7hVbO4FcIWU7EmOIGlatLaW6yUtrKFZyCDiuASEJbcDDUgpT8aFqIBPnT2429tpxtM7vA0lQUs' +
    't8KwPxAetRkCetq4PtRZLyILpUkd6RlSPAH1qxU4I7iGFuoWqNkSVJiFDSdFA6zyqnGLk27wcTT' +
    'hMqHJt65rK4zC2Xyw8x36SoKH9Ocis27V9e6nssZyBbbDKZawe7uDnxtpB6lIGQD+o/KpCVqns3' +
    '0pqqc0zpe5T7686XZMt9ttQXv5AbyrhPIxgD1zWr32PLm6RakaWjxWLgtpLjcaa0dicgEpWByk4' +
    'z7GhGOzj9sn+ooLgCUKJ39FR5AgimxRYYW1c3VvKF7iTAO7gCSQJ48K8BXFxx51x11anHFqKlqU' +
    'clRPUk+dQk38Kq9dao1w/YIDtpvmkLM5qMFKw8y6FR9pP4VDGQcZ8fEHpULYtU6QuqX3dYaRtSM' +
    'YDDMKIXn3yfLeAkD/wAs58KKTeXjbgbUyJ4++NOhkDd0npTq4m6ft9uhhRQdxT70jmI4VBfYwnO' +
    '3PSOsNOyXGDEiLbkttuKwpXeBQWE+BH7scf1Vy1dn2qbui5yLZa3XYkAuBbyyEJXsJBCScbjweB' +
    'W7aE01pqIlmdYNLzrAiUk7mX4iWdxI/OEjg1DXO13S2dotpt1yn39On57ziH21yl/dMqSQ23gHA' +
    'BV+U8HOK4tWaxia1KaIQ5GoMjMNNdPd8oPCo3AMf9kDyGlDNGaFD6QSQADqSNBrvrzw0tbO/uXX' +
    'Gu8GF92sp3e+OtdisF15qMylIU4oISOgyTirKLTZIF81Bb9SyZkNyGh5ENEdrPePhXwA5HCCPbq' +
    'OaV7PdNR74ua7cIl9cZbjqMZVuiFze9+UKVggD/8AZFdwyoqy8atReIsNsqfOiYBmNDI0jnUr/w' +
    'BNaq0u3q60otsSew3ESzNmIVlpkAodyhSsZVjjbjOfDpVAdacZWUOtrbWOqVJwa3fS1xmp7OLba' +
    'rfb3P2pY7iiZdrW6koelNhZXkA8nJ2n3GPLOY9qesZGtdUuXN1htllpJZjJDe1YaCiU7+TlXPPO' +
    'PKibthDaEqBOvD769ONQ3Z7E7q6unW1oTAMFQMHQAJJGvxjURpG4nWqpRXM0VG05xXsltKZs8pk' +
    'ALSjGB4HPXNSeq4kZvTj+xhAw2rHH9Joop2wr4yriVmTzjQeQ0FfHSQC2qeAFVHRkWNcLk7e5rD' +
    'T8yHEbiR1qQP3baSTxx1O7k+gq7tOLci7lEYKwnaAAPpRRUvcISl1UCNa3edWtScyiYSB4ZRTed' +
    'ZLVc7LItc6BHeiKbP7stJAT15GBwfWsN7A1KmaylMT9sxFiiuN24PISSyC7zg4yfH2ycdaKKg7w' +
    'AXTXefsKd+zri1YHiEnclBHQkqBI7xoeY0r0DEkLkxXe9Sk4HgKot9nzF9qTGnJT/wB8tF0gvl6' +
    'I+hJQgo6FBABB88k0UUS+YgDmKg8JSF7QqEkNqI6Ebj3jgai9DaO05q6Axd9Q25M6dHdej98tag' +
    'XUtOqQguAHCztSBkjmrZr+6O6O0BNulkjxm1xEpDTSm/3YG4DGBg+PnRRXiEpDOYDUjXyrrdPuu' +
    '4hsVqJSlwgAmQBm3AbgOgrCkauu961badUPqZYmt3RmAEMJKWyyvJUCCSTncep9sVA6yfkW7Ums' +
    'ocJ9bMVyctDjACS2sFw9QQcEeBGCKKKXbpSihRn5vxVxYGw0m4aSEiNkOHJYI8iSfGlezvRlr1F' +
    'ZXps1+Y24iSpoBlaQMBKT4pPPxGiiihG0JKRpU3dvupeUAox31//Z';
}

function laser() {
    return 'data:image/jpeg;base64,' +
    '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';
}
