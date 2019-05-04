// ==UserScript==
// @name         GBF Gaijin TOC
// @namespace    http://fabulous.cupcake.jp.net
// @version      2018.03.10.2
// @description  Adds table of contents to GBF Gaijin Articles
// @author       FabulousCupcake
// @grant        none
// @include      /https?://*.gbf-gaijin.com/*/
// @run-at       document-end
// ==/UserScript==

/* ------------- *\
     Constants
\* ------------- */
const stylesheet = `
.toc {
  background: rgba(255,255,255,0.05);
  padding: 10px 0 25px;
  margin-bottom: 40px;
}

.toc .toc-title {
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
}

.toc ul {
  list-style: none;
  line-height: 1.1;
  margin-bottom: 0;
}

.toc a {
  text-decoration: underline;
  box-shadow: none;
}
`;


/* ------------- *\
     Bad Stuff
\* ------------- */
// Heading Number Class
class H {
  constructor() {
    this.data = [-1, -1, -1, -1, -1, -1];
  }
	append(i) {
    this.data[i] = Math.max(0, this.data[i]) + 1;
    this.resetChildren(i, 1);
  }
  resetChildren(i, v) {
    for (let j=i+1; j<this.data.length; j++) {
      if (this.data[j] === -1) continue;
      this.data[j] = v;
    }
  }
  getMinLevel() {
    return this.data.findIndex(d => d > -1);
  }
  toString() {
    let ret = "";
    for (let i=0; i<this.data.length; i++) {
      if (this.data[i] === -1) continue;
      ret += `${this.data[i]}.`;
    }
    return ret;
  }
}


/* ------------- *\
     Functions
\* ------------- */
// Number Generator
let ii = 1;
const I = () => ii++;

// Slugify
const slugify = string => string.toLowerCase()
	.replace(/\s+/g, '-')
	.replace(/[^\w\-]+/g, '')
	.replace(/\-\-+/g, '-')
	.replace(/^-+/, '')
	.replace(/-+$/, '');

// Is Single Post page?
const isSinglePost = () => document.body.classList.contains("single-post");

// Insert stylesheet
const insertStylesheet = () => {
    var stylesheetEl = document.createElement('style');
    stylesheetEl.innerHTML = stylesheet;
    document.body.appendChild(stylesheetEl);
}

// Insert TOC Element
const insertEmptyTOC = () => {
  const hook = document.querySelector(".entry-content");
  const tocElement = `
    <div class="toc">
      <p class="toc-title">Contents</p>
      <ul></ul>
    </div>
  `;
  hook.insertAdjacentHTML("afterbegin", tocElement);
};

// Insert TOC Items
const appendTOC = (nLevel, index, text, id) => {
  const indent = nLevel * 20;
  const el = `
    <li>
      <a style="margin-left: ${indent}px;" href="#${id}">
        <small>${index} ${text}</small>
      </a>
    </li>
  `;
  const hook = document.querySelector(".toc ul");
  hook.insertAdjacentHTML("beforeend", el);
};

// Add TOC Elements
const appendTOCItems = () => {
  const headings = document.querySelectorAll(".entry-content h2:not([class]), .entry-content h3:not([class]), .entry-content h4, .entry-content h5, .entry-content h6");
  const heading_number = new H();

  headings.forEach(h => {
    const text = h.textContent;
    const slug = slugify(text);
    const slug_index = I();
    const id = `${slug_index}-${slug}`;

    // Stop if text is empty
    if (!text) return;

    // Get heading number
    const level = parseInt(h.tagName.match(/\d/)[0]);
    heading_number.append(level);
    const index = heading_number.toString();

    // Get normalised level for indentation
    const nLevel = level - heading_number.getMinLevel();

    // Add IDs
    h.id = id;

    // Append TOC
    appendTOC(nLevel, index, text, id);
  });
};


/* ------------- *\
        Main
\* ------------- */
if (isSinglePost()) {
  insertStylesheet();
  insertEmptyTOC();
  appendTOCItems();
}
