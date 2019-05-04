// ==UserScript==
// @name         Greasyfork Graphs
// @namespace    https://greasyfork.org/en/users/46159
// @version      0.4
// @description  Makes greasyforks graphs all colorful! Or not, it's your choice!
// @author       Tom Burris
// @icon         http://bit.ly/2oT4wRk
// @license      GPLv3
// @include      https://greasyfork.org/*/scripts/*/stats
// @grant        none
// @run-at       document-start
// @compatible   chrome
// @noframes
// ==/UserScript==

window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  var rememberedVersion = localStorage.getItem('graphScriptVersion');
  localStorage.setItem('graphScriptVersion', GM_info.script.version);
  var useStored = rememberedVersion && parseFloat(rememberedVersion) == parseFloat(GM_info.script.version);
  var optionsStored = localStorage.getItem('graphOptions');
  window.options = (optionsStored && useStored ? JSON.parse(optionsStored) : {
    lineVsBar: false,
    drawValues: true,
    drawLabels: true,
    drawValueLines: true,
    drawLabelLines: false,
    maxValueLines: 10,
    randomHue: true,
    defaultHue: 162,
    valuePadding: 2,
    labelPadding: 4,
    lineWidth: 2,
    fontSize: 12,
    tooltip: false,
  });
  var accentColor = 'hsl(' + options.defaultHue + ', 100%, 50%)';

  class Graph {
    constructor(_values, _labels, _width, _height) {
      this.values = _values;
      this.labels = _labels;
      this.constructHTML();
      this.canvas.width = _width;
      this.canvas.height = _height;
      this.ctx = this.canvas.getContext('2d');
      this.dataUpdate();
      this.canvas.addEventListener('mousemove', this.mousemove.bind(this));
      this.container.addEventListener('mouseenter', this.mouseenter.bind(this));
      this.container.addEventListener('mouseleave', this.mouseleave.bind(this));
    }
    constructHTML() {
      this.container = document.createElement('div');
      this.container.style = 'position: relative;';
      this.canvas = document.createElement('canvas');
      this.container.appendChild(this.canvas);
      this.tooltipVLine = document.createElement('div');
      this.tooltipHLine = document.createElement('div');
      this.tooltipVLine.style = this.tooltipHLine.style = 'background: black; position: absolute; display: none; top: 0px; left: 0px;';
      this.tooltipVLine.style.width = this.tooltipHLine.style.height = '1px';
      this.tooltipVLine.style.height = this.tooltipHLine.style.width = '100%';
      this.container.appendChild(this.tooltipVLine);
      this.container.appendChild(this.tooltipHLine);
    }
    mousemove(event) {
      if (options.tooltip) {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
      }
    }
    mouseenter(event) {
      if (options.tooltip) {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.tooltipUpdate();
        this.tooltipVLine.style.display = this.tooltipHLine.style.display = 'block';
        this.tooltipUpdateInterval = setInterval(this.tooltipUpdate.bind(this), 33);
      }
    }
    mouseleave(event) {
      clearInterval(this.tooltipUpdateInterval);
      this.tooltipVLine.style.display = this.tooltipHLine.style.display = 'none';
    }
    tooltipUpdate() {
      var rect = this.canvas.getBoundingClientRect();
      this.tooltipVLine.style.left = (this.mouseX - rect.left) + 'px';
      this.tooltipHLine.style.top = (this.mouseY - rect.top) + 'px';
    }
    dataUpdate() {
      localStorage.setItem('graphOptions', JSON.stringify(options));
      this.highestValue = Math.max.apply(Math, this.values);
      this.lowestValue = Math.min.apply(Math, this.values);
      this.valueStep = 1;
      while (this.highestValue / this.valueStep > options.maxValueLines) {
        this.valueStep = (parseInt(this.valueStep.toPrecision(1)) + 1) * (Math.pow(10, this.valueStep.toString().length - 1));
      }
      this.largestValueLine = Math.ceil(this.highestValue / this.valueStep) * this.valueStep;
      this.ctx.font = options.fontSize + 'px ' + '"Helvetica Neue", Helvetica, Arial, sans-serif';
      this.valueOffset = options.drawValues ? Math.ceil(this.ctx.measureText(this.largestValueLine).width) + options.valuePadding * 2 : 0;
      this.labelOffset = options.drawLabels ? Math.ceil(this.ctx.measureText(this.labels[0]).width) + options.valuePadding * 2 : 0;
      this.valueScale = (this.canvas.height - this.labelOffset - options.valuePadding - options.fontSize / 2) / this.largestValueLine;
      this.labelScale = (this.canvas.width - this.valueOffset - options.labelPadding - options.fontSize / 2) / (this.labels.length - (options.lineVsBar ? 1 : 0));
      this.draw(this.ctx);
    }
    draw(ctx) {
      ctx.save();
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.translate(0, this.canvas.height);
      ctx.lineWidth = options.lineWidth;
      ctx.lineCap = this.ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.fillStyle = '#000';
      ctx.strokeStyle = '#999';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'right';
      this.drawValues(ctx);
      ctx.rotate(-Math.PI/2);
      this.drawLabels(ctx);
      ctx.rotate(Math.PI/2);
      ctx.stroke();
      ctx.beginPath();
      var hue = options.randomHue ? ~~(Math.random() * 301) : options.defaultHue;
      ctx.globalAlpha = 0.8;
      ctx.scale(1, -1);
      ctx.strokeStyle = 'hsl(' + hue + ', 100%, 30%)';
      ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
      this.drawData(ctx);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
    drawValues(ctx) {
      var x = this.valueOffset - options.valuePadding;
      for(let n = 0; n <= this.largestValueLine; n += this.valueStep) {
        var y = -(this.labelOffset + n * this.valueScale);
        if (n && options.drawValues) {
          ctx.fillText(n + '', x, y);
        }
        if (options.drawValueLines) {
          ctx.moveTo(this.valueOffset, y);
          ctx.lineTo(this.canvas.width, y);
        }
      }
    }
    drawLabels(ctx) {
      var labelWidth = options.fontSize + options.labelPadding;
      var previousY = 0;
      var x = this.labelOffset - options.valuePadding;
      for (let n = 0; n < this.labels.length; n++) {
        var y = this.valueOffset + (options.lineVsBar ? n : n + 0.5) * this.labelScale;
        if (y - previousY >= labelWidth) {
          previousY = y;
          if (options.drawLabels) {
            ctx.fillText(this.labels[n], x, y);
          }
          if (options.drawLabelLines) {
            ctx.moveTo(this.labelOffset, y);
            ctx.lineTo(this.canvas.height, y);
          }
        }
      }
    }
    drawData(ctx) {
      ctx.moveTo(this.valueOffset, this.labelOffset);
      var x;
      for (let n = 0; n < this.values.length; n++) {
        x = this.valueOffset + n * this.labelScale;
        var y = this.labelOffset + this.values[n] * this.valueScale;
        ctx.lineTo(x, y);
        if (!options.lineVsBar) {
          ctx.lineTo(x + this.labelScale, y);
        }
      }
      ctx.lineTo(x + (options.lineVsBar ? 0 : this.labelScale), this.labelOffset);
      ctx.closePath();
    }
  }
  class Option {
    constructor(_label, _options, _changed) {
      this.label = _label;
      this.options = _options;
      this.changed = _changed;
      this.value = _options[_label];
      this.container = document.createElement('span');
      this.container.className = 'optionContainer';
      this.labelTag = document.createElement('div');
      this.labelTag.textContent = this.label + ':';
      this.labelTag.className = 'optionLabel';
      this.container.appendChild(this.labelTag);
    }
  }
  class BooleanOption extends Option {
    constructor(_label, _options, _changed) {
      super(_label, _options, _changed);
      this.slider = document.createElement('div');
      this.slider.className = 'booleanSlider';
      this.slider.style.background = (this.value ? accentColor : 'rgba(0, 0, 0, 0)');
      this.ball = document.createElement('div');
      this.ball.className = 'booleanBall';
      this.ball.style.float = (this.value ? 'right' : 'left');
      this.slider.appendChild(this.ball);
      this.container.appendChild(this.slider);
      this.slider.addEventListener('click', function(event) {
        this.value = !this.value;
        this.ball.style.float = (this.value ? 'right' : 'left');
        this.slider.style.background = (this.value ? accentColor : 'rgba(0, 0, 0, 0)');
        this.options[this.label] = this.value;
        this.changed();
        event.preventDefault();
      }.bind(this));
    }
  }
  class NumberOption extends Option {
    constructor(_label, _options, _changed) {
      super(_label, _options, _changed);
      this.input = document.createElement('input');
      this.input.className = 'inputOption';
      this.input.value = this.value;
      this.input.style.color = accentColor;
      this.container.appendChild(this.input);
      this.input.addEventListener('change', function(event) {
        this.input.value = this.input.value.replace(/\.[\S\s]*/, '').replace(/\D/g, '');
        this.options[this.label] = parseInt(this.input.value);
        this.changed();
      }.bind(this));
    }
  }
  class OptionPanel {
    constructor(_options, _changed) {
      this.panel = document.createElement('div');
      this.panel.className = 'optionPanel';
       this.typeMap = {
        boolean: BooleanOption,
        number: NumberOption,
      };
      var optionArray = Object.keys(_options);
      for (let optionKey of optionArray) {
        this.panel.appendChild(new this.typeMap[typeof _options[optionKey]](optionKey, _options, _changed).container);
      }
      var boundFunctions = ['mousemove', 'mousedown', 'mouseup', 'keydown', 'move'];
      for (let name of boundFunctions) {
        this[name] = this[name].bind(this);
      }
      this.panel.addEventListener('mousedown', this.mousedown);
      window.addEventListener('mouseup', this.mouseup);
      window.addEventListener('keydown', this.keydown);
      document.body.appendChild(this.panel);
    }
    mousedown(event) {
      if (event.target.tagName.toLowerCase() != 'input' && event.which == 1) {
        event.preventDefault();
        document.activeElement.blur();
        this.mousemove(event);
        var rect = this.panel.getBoundingClientRect();
        this.diffX = event.clientX - rect.left;
        this.diffY = event.clientY - rect.top;
        window.addEventListener('mousemove', this.mousemove);
        this.moveInterval = setInterval(this.move, 33);
      }
    }
    mouseup(event) {
      if (event.which == 1 && this.moveInterval) {
        window.removeEventListener('mousemove', this.mousemove);
        clearInterval(this.moveInterval);
        this.moveInterval = null;
      }
    }
    mousemove(event) {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    }
    move() {
      this.panel.style.left = (this.mouseX - this.diffX) + 'px';
      this.panel.style.top = (this.mouseY - this.diffY) + 'px';
    }
    keydown(event) {
      if (event.target.tagName.toLowerCase() != 'input' && event.keyCode == 79) { // 'o'
        this.panel.style.display = (this.panel.style.display == 'none' ? 'inline-block' : 'none');
      }
    }
  }

  var graphs = [];
  var container = document.getElementById('script-content');
  var canvi = Array.prototype.slice.apply(container.getElementsByTagName('canvas'), []);
  var scripts = Array.prototype.slice.apply(container.getElementsByTagName('script'), []);
  scripts.shift();
  function parse(string) {
    return JSON.parse(string.replace(/([[,])(?=[,\]])/g, '$1' + '0'));
  }
  for (let n = 0; n < canvi.length; n++) {
    var text = scripts[n].textContent;
    var myGraph = new Graph(parse(text.match(/data: (\[[\S\s]*?\])/)[1]), parse(text.match(/labels: (\[[\S\s]*?\])/)[1]), canvi[n].width, canvi[n].height);
    graphs.push(myGraph);
    canvi[n].style.display = 'none';
    canvi[n].parentNode.insertBefore(myGraph.container, canvi[n]);
  }

  var optionPanel = new OptionPanel(options, function() {
    for (let myGraph of graphs) {
      myGraph.dataUpdate();
    }
  });

  document.getElementsByTagName('h3')[0].textContent += ' - Press \'o\' For Graph Options.';

  var style = document.createElement('style');
  style.textContent = function() {
    /*
.optionPanel
{
  background:rgb(54,57,62);
  border-radius:5px;
  box-shadow:0 0 20px #000;
  color:#ddd;
  display:inline-block;
  left:5px;
  padding:5px;
  position:fixed;
  top:120px;
  z-index:999;
}

.booleanBall
{
  background:#fff;
  border:1px solid #ccc;
  border-radius:50%;
  box-shadow:0 0 10px #000;
  height:18px;
  margin:-2px;
  width:18px;
}

.booleanSlider
{
  border:2px solid #000;
  border-radius:10px;
  cursor:pointer;
  display:inline-block;
  float:right;
  height:16px;
  vertical-align:middle;
  width:36px;
}

.inputOption
{
  background:rgba(0,0,0,0);
  border:2px solid #000;
  float:right;
  text-align:center;
  width:36px;
}

.inputOption:focus
{
  box-shadow:0 0 3px #000;
  outline:0!important;
}

.optionContainer
{
  display:block;
  padding:2px;
  white-space:nowrap;
}

.optionLabel
{
  display:inline-block;
  margin-right:5px;
  vertical-align:middle;
}
.stats-table
{
  display: none;
}
   */
  }.toString().match(/\/\*([\S\s]*?)\*\//)[1];
  document.head.appendChild(style);
});