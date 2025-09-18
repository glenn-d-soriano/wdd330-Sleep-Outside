import { getLocalStorage, renderListWithTemplate, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `
    <li class="cart-card divider">
        <a href="#" data-id="${item.Id}" class="cart-card__remove"> x </a>
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
    </li>
    `;

  return newItem;
}

export default class ShoppingCart {

    constructor( key, parentElement) {
        this.key = key;
        this.parentElement = parentElement;
    }

    async init() {
        this.renderCart();
    }

    renderCart() {
        this.cartItems = getLocalStorage(this.key);
        if (!this.cartItems || this.cartItems.length === 0) {
            this.parentElement.innerHTML = "<h2> You cart is empty! </h2>";
        }

        renderListWithTemplate(cartItemTemplate, this.parentElement, this.cartItems, "afterbegin", true);

        this.showTotal();
        this.addRemoveListeners();
    }

    showTotal() {
        const cartFooter = document.querySelector(".cart-footer");
        const cartTotal = document.querySelector(".cart-total");

        if (this.cartItems && this.cartItems.length > 0) {
            cartFooter.classList.remove("hide");
            const total =  this.cartItems.reduce( (sum, item) => sum + item.FinalPrice, 0 );
            cartTotal.innerHTML = `Total: $ ${total.toFixed(2)}`;
        } else {
            cartFooter.classList.add("hide");
        }
    }

    addRemoveListeners() {
        this.parentElement.querySelectorAll(".cart-card__remove").forEach( a => {
            a.addEventListener( "click", (e) => {
                e.preventDefault();
                const id = a.getAttribute("data-id");
                this.removeProduct(id);
            });
        });
    }

    removeProduct(id) {
        let updateCart = getLocalStorage(this.key);
        updateCart = updateCart.filter( item => item.Id !== id);
        setLocalStorage(this.key, updateCart);
        this.renderCart();
    }
}