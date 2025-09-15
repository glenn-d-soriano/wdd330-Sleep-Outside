import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // Show the HTML element by removing the 'hide' class
    document.querySelector(".cart-footer").classList.remove("hide");

    // Calculate the total of the items
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

    // Update the cart-total element with the calculated total
    document.querySelector(".cart-total").innerHTML =
      `Total: $${total.toFixed(2)}`;
  } else {
    // If the cart is empty, show a message
    document.querySelector(".product-list").innerHTML =
      "<h2>Your cart is empty!</h2>";
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
