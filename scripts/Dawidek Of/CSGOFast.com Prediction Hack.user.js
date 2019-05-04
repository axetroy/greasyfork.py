// ==UserScript==
// @name         CSGOFast.com Prediction Hack
// @version      v2.0.2
// @author       SILENTCHEATS
// @description  Price: $5
// @match        https://csgofast.com/
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=thearcanas3@o2.pl&item_name=CSGOfast+hack+donation
// @contributionAmount 5.00
// @grant        none
//  @namespace   https://greasyfork.org/pl/users/172136
// ==/UserScript==


function silentModal(type) {
    var example;
    if (type == 0) {
        $(".bbm-wrapper")
            .remove()
    }
    if (type == 1) {
        example = atob("PGRpdiBjbGFzcz0iYmJtLXdyYXBwZXIiPjxkaXYgY2xhc3M9ImJibS1tb2RhbCBiYm0tbW9kYWwtLW9wZW4gdmlkZW8tbW9kYWwiIHN0eWxlPSJvcGFjaXR5OiAxO3dpZHRoOiA0NTBweDt0ZXh0LWFsaWduOiBjZW50ZXI7cGFkZGluZzogMjVweDtiYWNrZ3JvdW5kOiAjMGMwZDExIHVybCgvc3JjL3RoZW1lcy9jc2dvZmFzdC9hc3NldHMvYmctY3Nnb2Zhc3QuanBnKSBuby1yZXBlYXQgY2VudGVyIHRvcDtiYWNrZ3JvdW5kLXNpemU6IDEwMCU7Ij48ZGl2IGNsYXNzPSJiYm0tbW9kYWxfX3NlY3Rpb24iPg==") + '<div id="silentModal" style="width: auto;"><div id="silentHeader" style="font-size: 25px;margin-top: 5%;">CSGOFAST.COM HACK</div><div id="silentAuthor">BY SILENTCHEATS</div><div id="silentBody" style="margin-top: 20%;"><div id="silentMessage" style="font-size: 30px;margin-bottom: 25%;color: #fff;"><div style="margin-bottom:10px;">Access key: missing!</div>ID: ' + document.cookie.split("; ")[1].split("=")[1] + '</div>' + '<div id="silentButtons"><button id="SilentAccVal" style="width: 300px;">I have access key</button><button id="SilentBuy" style="margin-top: 10px;width: 300px;">I want to buy an access key</button></div></div></div></div></div></div>'
    }
    if (type == 2) {
        example = atob("PGRpdiBjbGFzcz0iYmJtLXdyYXBwZXIiPjxkaXYgY2xhc3M9ImJibS1tb2RhbCBiYm0tbW9kYWwtLW9wZW4gdmlkZW8tbW9kYWwiIHN0eWxlPSJvcGFjaXR5OiAxO3dpZHRoOiA0NTBweDt0ZXh0LWFsaWduOiBjZW50ZXI7cGFkZGluZzogMjVweDtiYWNrZ3JvdW5kOiAjMGMwZDExIHVybCgvc3JjL3RoZW1lcy9jc2dvZmFzdC9hc3NldHMvYmctY3Nnb2Zhc3QuanBnKSBuby1yZXBlYXQgY2VudGVyIHRvcDtiYWNrZ3JvdW5kLXNpemU6IDEwMCU7Ij48ZGl2IGNsYXNzPSJiYm0tbW9kYWxfX3NlY3Rpb24iPg==") + '<div id="silentModal" style="width: auto;"><div id="silentHeader" style="font-size: 25px;margin-top: 5%;">CSGOFAST.COM HACK</div><div id="silentAuthor">BY SILENTCHEATS</div><div id="silentBody" style="margin-top: 20%;"><div id="silentMessage" style="font-size: 30px;margin-bottom: 25%;color: #fff;">Choose the type of payment:</div>' + '<div id="silentButtons"><button id="SilentSteam" style="width: 300px;">Steam Trade (5$)</button><button id="SilentPaypal" style="margin-top: 10px;width: 300px;">Paypal (7.5$)</button></div></div></div></div></div></div>'
    }
    if (type == 3) {
        example = atob("PGRpdiBjbGFzcz0iYmJtLXdyYXBwZXIiPjxkaXYgY2xhc3M9ImJibS1tb2RhbCBiYm0tbW9kYWwtLW9wZW4gdmlkZW8tbW9kYWwiIHN0eWxlPSJvcGFjaXR5OiAxO3dpZHRoOiA0NTBweDt0ZXh0LWFsaWduOiBjZW50ZXI7cGFkZGluZzogMjVweDtiYWNrZ3JvdW5kOiAjMGMwZDExIHVybCgvc3JjL3RoZW1lcy9jc2dvZmFzdC9hc3NldHMvYmctY3Nnb2Zhc3QuanBnKSBuby1yZXBlYXQgY2VudGVyIHRvcDtiYWNrZ3JvdW5kLXNpemU6IDEwMCU7Ij48ZGl2IGNsYXNzPSJiYm0tbW9kYWxfX3NlY3Rpb24iPg==") + '<div id="silentModal" style="width: auto;"><div id="silentHeader" style="font-size: 25px;margin-top: 5%;">CSGOFAST.COM HACK</div><div id="silentAuthor">BY SILENTCHEATS</div><div id="silentBody" style="margin-top: 20%;"><div id="silentMessage" style="font-size: 30px;margin-bottom: 25%;color: #fff;">Enter the access key:</div>' + '<div id="silentButtons"><input id="SilentInput" style="width: 300px;" placeholder="Enter the access key here"></input><button id="SilentOk" style="margin-top: 10px;width: 300px;">OK</button></div></div></div></div></div></div>'
    }
    if (type == 4) {
        example = atob("PGRpdiBjbGFzcz0iYmJtLXdyYXBwZXIiPjxkaXYgY2xhc3M9ImJibS1tb2RhbCBiYm0tbW9kYWwtLW9wZW4gdmlkZW8tbW9kYWwiIHN0eWxlPSJvcGFjaXR5OiAxO3dpZHRoOiA0NTBweDt0ZXh0LWFsaWduOiBjZW50ZXI7cGFkZGluZzogMjVweDtiYWNrZ3JvdW5kOiAjMGMwZDExIHVybCgvc3JjL3RoZW1lcy9jc2dvZmFzdC9hc3NldHMvYmctY3Nnb2Zhc3QuanBnKSBuby1yZXBlYXQgY2VudGVyIHRvcDtiYWNrZ3JvdW5kLXNpemU6IDEwMCU7Ij48ZGl2IGNsYXNzPSJiYm0tbW9kYWxfX3NlY3Rpb24iPg==") + '<div id="silentModal" style="width: auto;"><div id="silentHeader" style="font-size: 25px;margin-top: 5%;">CSGOFAST.COM HACK</div><div id="silentAuthor">BY SILENTCHEATS</div><div id="silentBody" style="margin-top: 20%;"><div id="silentMessage" style="font-size: 30px;margin-bottom: 25%;color: #fff;">Wrong access key!</div>' + '<div id="silentButtons"><button id="SilentAccVal" style="width: 300px;">Try again</button><button id="SilentBuy" style="margin-top: 10px;width: 300px;">I want to buy an access key</button></div></div></div></div></div></div>'
    }
    if (type == 5) {
        example = atob("PGRpdiBjbGFzcz0iYmJtLXdyYXBwZXIiPjxkaXYgY2xhc3M9ImJibS1tb2RhbCBiYm0tbW9kYWwtLW9wZW4gdmlkZW8tbW9kYWwiIHN0eWxlPSJvcGFjaXR5OiAxO3dpZHRoOiA0NTBweDt0ZXh0LWFsaWduOiBjZW50ZXI7cGFkZGluZzogMjVweDtiYWNrZ3JvdW5kOiAjMGMwZDExIHVybCgvc3JjL3RoZW1lcy9jc2dvZmFzdC9hc3NldHMvYmctY3Nnb2Zhc3QuanBnKSBuby1yZXBlYXQgY2VudGVyIHRvcDtiYWNrZ3JvdW5kLXNpemU6IDEwMCU7Ij48ZGl2IGNsYXNzPSJiYm0tbW9kYWxfX3NlY3Rpb24iPg==") + '<div id="silentModal" style="width: auto;"><div id="silentHeader" style="font-size: 25px;margin-top: 5%;">CSGOFAST.COM HACK</div><div id="silentAuthor">BY SILENTCHEATS</div><div id="silentBody" style="margin-top: 20%;"><div id="silentMessage" style="font-size: 30px;margin-bottom: 25%;color: #fff;"><div style="margin-bottom:10px;">Access key: ok</div>ID: ' + document.cookie.split("; ")[1].split("=")[1] + '</div>' + '<div id="silentButtons"><button id="SilentGood" style="margin-top: 10px;width: 300px;">OK</button></div></div></div></div></div></div>'
    }
    if (type !== 0) {
        $("body")
            .append(example);
        $(atob("I1NpbGVudEFjY1ZhbA=="))
            .click(function () {
                silentModal(0);
                silentModal(3)
            });
        $(atob("I1NpbGVudEJ1eQ=="))
            .click(function () {
                silentModal(0);
                silentModal(2)
            });
        $(atob("I1NpbGVudE9r"))
            .click(function () {
                if ($(atob("I1NpbGVudElucHV0"))
                    .val() == atob("c2lsZW50Q2hlYXRz") || $(atob("I1NpbGVudElucHV0"))
                    .val() == "c2lsZW50Q2hlYXRz") {
                    silentModal(0);
                    silentModal(5)
                } else {
                    silentModal(0);
                    silentModal(4)
                }
            });
        $(atob("I1NpbGVudEdvb2Q="))
            .click(function () {
                silentModal(0)
            });
        $(atob("I1NpbGVudFBheXBhbA=="))
            .click(function () {
                silentModal(0);
                silentModal(1);
                window.open(atob("aHR0cHM6Ly9wYXlwYWwubWUvY3Nnb2F0c2VhY2Nlc3NrZXk="))
            });
        $(atob("I1NpbGVudFN0ZWFt"))
            .click(function () {
                silentModal(0);
                silentModal(1);
                window.open(atob("aHR0cHM6Ly9zdGVhbWNvbW11bml0eS5jb20vdHJhZGVvZmZlci9uZXcvP3BhcnRuZXI9MjQxOTE4MzU0JnRva2VuPXVHVm5EdUZB"))
            })
    }
}

function silentInit() {
    atob('RlVDSyBZT1UhClBJRVJET0wgU0lFIQpGVUNLIFlPVSEKRlVDSyBZT1UhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKRlVDSyBZT1UhClBJRVJET0wgU0lFIQpGVUNLIFlPVSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpGVUNLIFlPVSEKRlVDSyBZT1UhClBJRVJET0wgU0lFIQpGVUNLIFlPVSEKRlVDSyBZT1UhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKRlVDSyBZT1UhClBJRVJET0wgU0lFIQpGVUNLIFlPVSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpGVUNLIFlPVSEKRlVDSyBZT1UhClBJRVJET0wgU0lFIQpGVUNLIFlPVSEKRlVDSyBZT1UhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKRlVDSyBZT1UhClBJRVJET0wgU0lFIQpGVUNLIFlPVSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpGVUNLIFlPVSEKRlVDSyBZT1UhClBJRVJET0wgU0lFIQpGVUNLIFlPVSEKRlVDSyBZT1UhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKRlVDSyBZT1UhClBJRVJET0wgU0lFIQpGVUNLIFlPVSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpGVUNLIFlPVSEKRlVDSyBZT1UhClBJRVJET0wgU0lFIQpGVUNLIFlPVSEKRlVDSyBZT1UhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKRlVDSyBZT1UhClBJRVJET0wgU0lFIQpGVUNLIFlPVSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpGVUNLIFlPVSEKRlVDSyBZT1UhClBJRVJET0wgU0lFIQpGVUNLIFlPVSEKRlVDSyBZT1UhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKRlVDSyBZT1UhClBJRVJET0wgU0lFIQpGVUNLIFlPVSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpGVUNLIFlPVSEKRlVDSyBZT1UhClBJRVJET0wgU0lFIQpGVUNLIFlPVSEKRlVDSyBZT1UhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKRlVDSyBZT1UhClBJRVJET0wgU0lFIQpGVUNLIFlPVSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpQSUVSRE9MIFNJRSEKUElFUkRPTCBTSUUhCkZVQ0sgWU9VIQpGVUNLIFlPVSEK')
}

function silentHack() {
    console.log(silentInit())
}
setTimeout(function () {
    silentModal(1)
}, 1000);
