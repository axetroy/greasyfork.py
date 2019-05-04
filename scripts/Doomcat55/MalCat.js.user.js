// ==UserScript==
// @name         MalCat.js
// @namespace    Doomcat55
// @version      0.1
// @description  MalCat - The UserScript
// @author       Doomcat55
// @match        *://myanimelist.net/_/us/malcat-js/series
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @grant        none
// ==/UserScript==

const variablePattern = /\$(?:(\w+)|{(\w+)})/g;

String.prototype.format = function(map, pattern=variablePattern) {
    return this.replace(pattern, (match, ...args) => {
        const captures = args.slice(0, args.length - 1);
        const key = captures.find(capture => capture !== undefined);
        const value = map[key] || (typeof map.get === 'function' ? map.get(key) : undefined);
        return value !== undefined ? value : match;
    });
};

function apiURL(username, listType) {
    return `/malappinfo.php?u=${username}&type=${listType}&status=all`;
}

function* listElements(xml, listType) {
    let index = 0;
    for (let series of $(xml).find(listType)) {
        const attributes = $(series).children().map((_, attribute) => {
            const $attribute = $(attribute);
            return [[$attribute.prop('tagName'), $attribute.text()]];
        }).get();
        const map = new Map(attributes);
        map
            .set('id', map.get(`series_${listType}db_id`))
            .set('list', listType)
            .set('index', index++);
        yield map;
    }
}

function scrape(username, listType, callback) {
    listType = listType.toLowerCase();
    $.get(apiURL(username, listType), xml => {
        callback(listElements(xml, listType));
    });
}

// HTML

// Namespace
const ns = 'us-malcat-js';

const templatePresets = new Map([
    ['more', '#more$id { background-image: url($series_image); }'],
    ['animetitle', ".animetitle[href^='/$list/$id/'] { background-image: url($series_image); }"],
    ['animetitlebefore', ".animetitle[href^='/$list/$id/']:before { background-image: url($series_image); }"],
    ['datatitle', ".data.title [href^='/$list/$id/'] { background-image: url($series_image); }"],
    ['datatitlebefore', ".data.title [href^='/$list/$id/']:before { background-image: url($series_image); }"],
    ['dataimagelink', ".data.image a[href^='/$list/$id/'] { background-image: url($series_image); }"],
    ['dataimagelinkbefore', ".data.image a[href^='/$list/$id/']:before { background-image: url($series_image); }"]
]);

function makePage() {
    const [defaultUsername, defaultTemplate] = [$('.header-profile-link').text(), templatePresets.get('more')];

    document.title = 'MalCat.js - CSS Generator';
    $('#contentWrapper > div > .h1').text('MalCat.js - CSS Generator');
    const $content = $('#content');

    const $form = $(`
<section>
<form id="${ns}-generator">
  <table>
    <tbody>
      <tr>
        <td><label for="${ns}-username">Username:</label></td>
        <td><input id="${ns}-username" type="text" name="username" value="${defaultUsername}"/></td>
      </tr>
      <tr>
        <td><label for=${ns}-list-type">List type:</label></td>
        <td>
          <select id="${ns}-list-type">
            <option value="anime" selected>anime</option>
            <option value="manga">manga</option>
          </select>
        </td>
      </tr>
      <tr>
        <td><label for="${ns}-template">Template:</label></td>
        <td><select id="${ns}-template-select">${
          Array.from(templatePresets.entries()).map(entry => {
              const [key, value] = entry;
              return `<option value="${value}">${key}</option>`;
          }).join('')
        }
        <td><input id="${ns}-template" type="text" name="template" value="${defaultTemplate}" size="60"/></td>
      </tr>
    </tbody>
  </table>
  <input type="submit"/>
</form>
</section>
`).css({flex: '1'});
    const $display = $(`
<section id="${ns}-display">
  <section>
    <a class="download" download="more.css">Save as File</a>
  </section>
  <section>
    <textarea class="textarea output"/>
  </section>
</section>
`).css({flex: '1'});

    $content.html('').append($form).append($display).css({
        display: 'flex'
    });
    const $usernameInput = $(`#${ns}-username`),
          $listTypeInput = $(`#${ns}-list-type`),
          $templateSelect = $(`#${ns}-template-select`),
          $templateInput = $(`#${ns}-template`);

    const $download = $display.find('.download').css({
              appearance: 'button',
              color: 'initial',
              'text-decoration': 'none',
              padding: '2px 6px 3px'
          }),
          $output = $display.find('textarea').css({width: '100%', height: '400px'});

    $templateSelect.change(() => {
        $templateInput.val($templateSelect.val());
        $download.prop('download', `${$templateSelect.find('option:selected').text()}.css`);
    });

    $templateInput.change(() => {
        $download.prop('download', 'custom.css');
    });

    $form.submit(event => {
        const [username, listType, template] = [$usernameInput.val(), $listTypeInput.val(), $templateInput.val()];
        scrape(username, listType, seriesList => {
            $output.val('');
            for (let series of seriesList) {
                $output.val(`${$output.val()}${template.format(series)}\n`);
                $download.attr('href', `data:,${encodeURIComponent($output.val())}`);
            }
        });
        return false;
    });
}

makePage();
