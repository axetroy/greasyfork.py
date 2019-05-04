// ==UserScript==
// @name         Appointments
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  Save appointments into Excel file
// @author       Dorosh
// @include      https://app.zenmaid.com/appointments/list?*
// @grant         GM_xmlhttpRequest
// ==/UserScript==

var dropDownMenu = document.querySelector('ul[class="dropdown-menu"]');
dropDownMenu.innerHTML += '<li><button id="toExcelBtn" class="to-aside" style="background:none;border:none;">&nbsp &nbsp &nbsp &nbsp Export Excel</button></li>';
var toExcelBtn = dropDownMenu.querySelector('button[id="toExcelBtn"]');
toExcelBtn.addEventListener("click", exportAppointments);

function exportAppointments()
{
    console.log("==> Export appointments <==")

    var result = '';
    var requestData = [];

    var appointmentListObject = document.querySelector('div[id="appointments-list"]');
    var appointmentsPerDay = groupAppointmentsListObject(appointmentListObject);

    console.log('Appointments days amount is ' + appointmentsPerDay.length);
    console.log('Start reading...');

    for (var dayIndex = 0; dayIndex < appointmentsPerDay.length; dayIndex++)
    {
        console.log('Day ' + dayIndex);

        var appointmentsGroup = appointmentsPerDay[dayIndex];
        var day = appointmentsGroup.head.querySelector('div[class="col-xs-12"]').querySelector('h3').textContent.trim();

        console.log('Date: ' + day);

        result += day + '\n';
        result += 'Day;Time;Client;Price;Address from info;Phone;Recurrence;Assigned to;Working Hours;Cash;Check;Credit Card;Invoice;Notes\n';

        var appointmentInfos = appointmentsGroup.appointments;

        Array.from(appointmentInfos).forEach(function(info, index, infos) {

            var time = info.querySelector('div[class="col-sm-2"]').querySelector('h4').textContent.trim().replace('  ', ' ');
            var workingHours = getHoursInterval(time);
            var clientName = info.querySelector('div[class="col-sm-10"]').querySelector('h3[class="mt-s"]').textContent;
            //var address = info.querySelector('p').textContent.trim();
            var price = parseInt(info.querySelector('div[class="charges-container"]').querySelector('span').textContent.trim().replace('$', ''));

            var previewLinkData = info.querySelector('a[class="btn btn-default btn-rounded btn-lg appointment-entry"]').getAttribute("data-appointment");
            requestData.push(previewLinkData);

            result = result + day + ';' + time + ';' + clientName + ';' + price + ';' + previewLinkData + '\n';

            GM_xmlhttpRequest(
                {
                    method: 'GET',
                    url: 'https://app.zenmaid.com/appointments/' + previewLinkData,
                    overrideMimeType: 'application/json',
                    onload: function( resp )
                    {
                        var div = document.createElement( 'div' );
                        div.id = 'response';
                        div.style.display = 'none';
                        var respJson = JSON.parse(resp.response);
                        div.innerHTML = respJson.html;

                        var address = div.querySelector('p[class="bigger"]').textContent.trim();

                        var customerPhone = div.querySelector('ul[class="list-contact"]');
                        if(customerPhone.querySelector('a'))
                        {
                            customerPhone = customerPhone.querySelector('a').href.replace("tel:", "");
                        }
                        else
                        {
                            customerPhone = "No phone";
                        }

                        var recurrence = div.querySelector('div[class="appointment-recurrence"]').textContent.trim();

                        var assignedTo = div.querySelector('div[id="assigned-employees-preview"]');
                        if(assignedTo.querySelector('span[class="red"]'))
                        {
                            assignedTo = "No Cleaners Assigned";
                        }
                        else
                        {
                            assignedTo.querySelector('div').outerHTML = "";
                            assignedTo = assignedTo.textContent.trim().replace('\n', ',');
                        }


                        var fields = div.querySelectorAll('strong[class="black"]');
                        var fieldsMap = {};

                        fields.forEach(function(element) {
                            var name = element.innerText.trim();
                            fieldsMap[name] = element;});

                        var check = "";
                        if(fieldsMap['Check'] != null)
                            if(fieldsMap['Check'].nextSibling.textContent.trim() == "Yes")
                                check = price;

                        var creditCard = "";
                        if(fieldsMap['Credit Card'] != null)
                            if(fieldsMap['Credit Card'].nextSibling.textContent.trim() == "Yes")
                                creditCard = price;

                        var cash = "";
                        if(fieldsMap['Cash'] != null)
                            if(fieldsMap['Cash'].nextSibling.textContent.trim() == "Yes")
                                cash = price;

                        var invoice = "";
                        if(fieldsMap['Invoice'] != null)
                            if(fieldsMap['Invoice'].nextSibling.textContent.trim() == "Yes")
                                invoice = price;

                        var notesContainer = div.querySelector('div[class="col-xs-12 mb-l"]').querySelector('p');
                        var notes = notesContainer.innerHTML.replace(/<br\s*[\/]?>/gi, "\\").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(';', '\\').trim();

                        var additionalData = address + ';' + customerPhone + ';' + recurrence + ';' + assignedTo + ';' + "[interval]"+ ';' + cash + ';' + check + ';' + creditCard + ';' + invoice + ';' + notes;

                        result = result.replace(previewLinkData, additionalData);
                        result = result.replace("[interval]", workingHours);
                        remove(requestData, previewLinkData);

                        downloadIfDone(requestData, result);

                        //console.log(div);
                    }
                });
        });
    }
}

function groupAppointmentsListObject(target)
{
    console.log('== Parse appointments table object ==');

    var result = [];

    for(var childIndex in target.children)
    {
        var child = target.children[childIndex];

        if(child.tagName != 'DIV') { continue; }

        if(child.className == 'row appointment-date-list')
        {
            var newDayObject = {};
            newDayObject.head = child;
            newDayObject.appointments = []
            result.push(newDayObject);
        }
        else if(child.className == 'row')
        {
            result[result.length - 1].appointments.push(child);
        }
    }

    return result;
}

function clearResponse(rawText)
{
    var result = rawText.replace("loadAsideWithData(", "");
    result = result.slice(0, result.indexOf("eventPopover") - 3);
    result = result.replace(/\\n/gm, "").replace(/\\"/gm, '"').replace(/\\\//gm, '/');

    return result;
}

function remove(array, element)
{
    const index = array.indexOf(element);

    if (index !== -1)
    {
        array.splice(index, 1);
    }
}

function downloadIfDone(array, stringResult)
{
    if(array.length > 0) { return; }

    console.log(stringResult);

    var currentDate = new Date();

    var a = document.createElement("a");
    a.href = "data:attachment/csv," + encodeURIComponent(stringResult); //content
    a.target = '_blank';
    a.download = currentDate.toUTCString() + ".csv"; //file name
    a.click();
}

function getHoursInterval(input)
{
    var time = {};

    time.full = input.split(' ').join('');

    var startPart = time.full.substring(0, time.full.indexOf('-'));
    var endPart = time.full.substring(time.full.indexOf('-') + 1, time.full.length);

    time.begin = to24HoursFormat(startPart);
    time.end = to24HoursFormat(endPart);

    var dateBegin = new Date(2000, 1, 1, time.begin.hours, time.begin.minutes);
    var dateEnd = new Date(2000, 1, 1, time.end.hours, time.end.minutes);

    var hoursDiff = (dateEnd.getTime() - dateBegin.getTime()) / 3600000;

    return hoursDiff;
}

function to24HoursFormat(input)
{
    var result = {};

    var dayPart = input.substring(5, 7);
    var hours = parseInt(input.substring(0, 2));

    if(dayPart == "PM" && hours != 12)
    {
        result.hours = hours + 12;
    }
    else
    {
        result.hours = hours;
    }

    result.minutes = parseInt(input.substring(3, 5));

    return result;
}