import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
const cartItems = getLocalStorage("so-cart");

function removeProduct(product) {
  const updateCart = cartItems.filter(item => item.Id !== product);
  localStorage.setItem("so-cart", JSON.stringify(updateCart));
}

function renderCartContents() {

  // Checks if there are items in the cart
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // Shows the total by removing the 'hide' class
    document.querySelector(".cart-footer").classList.remove("hide");

    // Calculates the total using the reduce() method
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

    // Updates the element with the calculated total
    document.querySelector(".cart-total").innerHTML = `Total: $${total.toFixed(2)}`;
  } else {
    // If the cart is empty, displays a message
    document.querySelector(".product-list").innerHTML = "<h2>Your cart is empty!</h2>";
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="" data-id="${item.Id}" class="cart-card__remove"> x </a>
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

document.querySelectorAll(".cart-card__remove").forEach( a => {
  a.addEventListener("click", function() {
    const id = this.getAttribute("data-id");
    removeProduct(id);
  });
});

loadHeaderFooter();