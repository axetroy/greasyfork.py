// ==UserScript==
// @name        Google Currency Converter Fix
// @namespace   google-currency-converter-fix
// @description Fix for Googles currency converter
// @version     1.7
// @include     https://www.google.*/search?*
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEPElEQVRYR72XSeiXZRDHP2aLrWa7tikttkIbVNByiDap1Aq65KFDGFqUCGUR1KEdClqtaIEWIg1NzLCFyiLLQ3Vp36OI0CyqQ7RY8fkzDwzj+/7+vwia2zvPPDPzzHxneccwPG0BnAacDBwJ7AuMj+s/AZ8CbwHPA88Bvw2jeswQQjsD84ELgR2GkFfkB+B+4DZg3aA7gxzYBJgD3ABsO6ThKvYzcBWwEPirS0efAxOAx4HTewyvBT6JlypiZPYHjFYXPQucD/xYD7scmBh5PKQIfw7cBywBPgP+Lufq2gc4G7gImFLO3wVOBb7N/OqAL38VyMYN4+XAA8CGdFnQ7RHfFwBPpLNNAzM3l/S9BxyfI5EdMOfPlLC/D5wJ+PpK3wC7B3MW8FiHjBFZDhyYzkyHOkcwkR24GLgzCWr8BGB9UXw0cBZwGbBVnL0APAUs7sjzThHV7MQlwF3ZAcFjXhvaDfvh5eV7AQ8BJw2oiF8iXfcWGSPxTtKvnH1kbYvATcAV6ZIgEnCN9gTWAAJ0GLoSUGcmS/ruxLhFmzowLpApACXzbUllwBnec9Jly3C7uCtbQE4GBJ/k3YOBj9Idzyxd5SRLcpIOTAeeToJGQu8a6aAp2SwY5lsMWFaGVrJLfhUtuEX1euDqEoUFwI2JN1NhwTA3MfeLFzWWpfZ1Ohd8t4dMdsAytRQPTY7OKw5MBT5MvIU68AZwTDAN7W6lyWwZEWjh/Q64Brg2YcII6MBopD1nw44huKYxLBXpdeC4Di2W17kDtDsFXwZWRRr+GCC7Gjg2ztfrwO8pvzYN81vJqLxUGkqfDRuUVbSiR0AbZ8TZhmEdUH7raD623Zb7Pifscvb9FzsENnLAnIyWgqrHFvw2sEsc+OrtgW2S4Jsp1Pn+RinIINSZXQsIDyv5d8DYyfIssLU+DCwCprXwAm5RuZ90gnC0MjwReCU94bwwVB1Qj0PpkZA1DTrwZ7pby/AePRJ0y5JQbUSbx2vbsvElcEqgvk1DI2AVGIGDQpeVcVTJnS3aDavRDB3QS5eEtu99Ea04e177eAvr2NBkp7Q1Z2qRajw7qa1472DYiie2tml7tE020qB7XCYn3Ow+2Bf+HcClhVfHvVha0BwwvA6U9gpB5jh2RGfSgetS1VR/3B1cQt2IMzl6rZo87uWtywuJ82BkSQj6INanupDYmkX6g+m/YCnwKLAS+LUYt8RfAw5IfKMxMprrSmaTaGXkuU64PtVIeJaroG8W+Ep1ZuO9K5lKu5ZS0yE+DGsGpv2jLShWzpPphQLOdNV/ioFLabs/KdZyF4pMlp9bkuH+uGctd5FxLdd4Q3vToXHLd+Ba3oRH+zH5Pkqq4cPxqvE2Zis4/9WPSbvsmi4w3Wz+91+z/AIHTvs5bXtjfWH9tsmImVv/y89pVepu6O+5eTwi1urmkAbz77nlONTv+T9v0fZaPm/ufAAAAABJRU5ErkJggg==
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_registerMenuCommand
// ==/UserScript==

function updateSetting(s, d) {
  if(d) {
    GM_setValue(s, (eval(s)^true));
  } else {
    var newSetting = prompt("Enter new value", eval(s));
    if (newSetting === '' || newSetting === null) {
      alert("Invalid value. Please try again.");
      return;
    }
    if (typeof(newSetting) == "string")
      newSetting = newSetting.toUpperCase();
    GM_setValue(s, newSetting);
  }
  GM_setValue('update_time', 0);
  var r = confirm(s + ' set to ' + newSetting + '\n\nReload page?');
  if (r == true) {
    window.location.reload();
  }
}

function addMenu() {
  GM_registerMenuCommand("To Currency [" + currency_to + "]", function(){updateSetting('currency_to')});
}

var currency_to = GM_getValue('currency_to', 'SEK');

addMenu();

var s = document.querySelector('#lst-ib').value;
if(s.match(/^(?:(?:\$|USD|€|EUR|£|GPB|AUD|DKK|NOK|SEK)\s?[\d\.\,]+|[\d\.\,]+\s?(?:\$|USD|€|EUR|£|GPB|AUD|DKK|NOK|SEK))$/i)) {
  if(s.match(/^[\d\,]+\s?(?:\$|USD|€|EUR|£|GPB|AUD|DKK|NOK|SEK)$/i)) {
    s = s.replace(',','.');
  }
  document.querySelector('#lst-ib').value =  s + " to " + currency_to;
  document.querySelector("button.lsb").click();
}