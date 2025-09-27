// Retrieves a URL query parameter
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Wrapper for querySelector
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Retrieves data from local storage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Saves data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Updates the superscript number on the cart icon
export function setSuperscript() {
  const cartItems = getLocalStorage("so-cart");
  let count = 0;

  if (cartItems) {
    // Calculate the total number of items (by summing up the 'quantity' property)
    count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  // NOTE: Ensure your HTML has an element with the class/ID used here
  const cartSpan = document.querySelector(".cart-count") || document.querySelector("#cart-count");

  if (cartSpan) {
    cartSpan.textContent = count;
    cartSpan.hidden = count === 0;
  }
}

// Sets a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Renders a list of items using a template function
export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Renders a single item using a template string
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

// Displays an alert message at the top of the main content
export function alertMessage(message, scroll = true) {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `${message} <span class="close-alert">X</span>`;

  alert.addEventListener('click', function (e) {
    const main = document.querySelector('main');
    if (e.target.tagName === 'SPAN' && e.target.classList.contains('close-alert')) {
      main.removeChild(this);
    }
  });

  const main = document.querySelector('main');
  main.prepend(alert);

  if (scroll) {
    window.scrollTo(0, 0);
  }
}

// Helper to fetch template content
async function loadTemplate(path) {
  const res = await fetch(path);
  return res.text();
}

// Loads and renders the site header and footer
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  // Call setSuperscript here to ensure the cart count loads on every page
  setSuperscript();
}