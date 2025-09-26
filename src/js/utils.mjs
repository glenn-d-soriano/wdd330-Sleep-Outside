export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)

  return product;
}

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  //  fetches the content of the HTML file given a path.
  const res = await fetch(path);
  // The response to the fetch is converted to text 
  const template = await res.text();
  // returns the HTML content as a string
  return template;
}

export async function loadHeaderFooter() {
  // Load the header and footer templates in from the partials using the loadTemplate
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  // Grab the header and footer placeholder elements out of the DOM
  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");
  // Render the header and footer using renderWithTemplate
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("section");

  alert.classList.add("alert");
  alert.innerHTML = `<p> ${message} <span> x </span> </p>`;

  alert.addEventListener("click", function (e) {
    if ( e.target.tagName === "SPAN" ) {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  if (scroll) { window.scrollTo(0,0); }
}

export function removeAllAlerts() {
  document.querySelectorAll(".alert").forEach( (alert) => { 
    document.querySelector("main").removeChild(alert);
  }); 
}
