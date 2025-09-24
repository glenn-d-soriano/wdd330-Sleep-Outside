import { getLocalStorage, renderListWithTemplate, setLocalStorage, setClick } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `
    <li class="cart-card divider">
        <a href="" data-id="${item.Id}" class="cart-card__remove"> x </a>
        <a href="#" class="cart-card__image">
            <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
        </a>
        <a href="#">
            <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity"> 
            <button class="btnMinus btnQtty" type="button" data-id="${item.Id}"> - </button>
            <span class="card__quantity">${item.quantity}</span> 
            <button class="btnPlus btnQtty" type="button"  data-id="${item.Id}"> + </button>
        </p>
        <p class="cart-card__price">$${item.FinalPrice * item.quantity }</p>
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
            document.querySelector(".cart-footer").classList.add("hide");        
        } else {
            renderListWithTemplate(cartItemTemplate, this.parentElement, this.cartItems, "afterbegin", true);
        
            this.addListeners();
            this.showTotal();
        }        
    }

    showTotal() {
        const cartFooter = document.querySelector(".cart-footer");
        const cartTotal = document.querySelector(".cart-total");
            cartFooter.classList.remove("hide");
            const total =  this.cartItems.reduce( (sum, item) => sum + item.FinalPrice * item.quantity, 0 );
            cartTotal.innerHTML = `Total: $ ${total.toFixed(2)}`;
    }

    addListeners() {
        this.parentElement.querySelectorAll(".cart-card__remove").forEach( a => {
            a.addEventListener( "click", (e) => {
                e.preventDefault();
                const id = a.getAttribute("data-id");
                this.removeProduct(id);
            });
        });

        this.parentElement.querySelectorAll(".btnQtty").forEach( button => {
            const id = button.getAttribute("data-id");
            const isMinus = button.classList.contains("btnMinus");
            const change = isMinus ? -1 : 1;

            setClick(`.btnQtty[data-id="${id}"].${isMinus ? 'btnMinus': 'btnPlus'}`, () => {
                this.updateQuantity( id, change );
            });
        });
    }

    updateQuantity(id, change) {
        let cartItems = getLocalStorage(this.key);
        const itemIndex = cartItems.findIndex(item => item.Id === id);

        if (itemIndex > -1) {
            cartItems[itemIndex].quantity += change;

            if (cartItems[itemIndex].quantity <= 0) {
                this.removeProduct(id);
                return;
            }
        }

        setLocalStorage(this.key, cartItems);
        this.renderCart(); 
    }

    removeProduct(id) {
        let updateCart = getLocalStorage(this.key);
        updateCart = updateCart.filter( item => item.Id !== id);
        setLocalStorage(this.key, updateCart);
        this.renderCart(this);
    }
}