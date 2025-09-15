import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product_id");

// The 'product' instance
const product = new ProductDetails(productID, dataSource);
product.init();

// add to cart button event handler
async function addToCartHandler(e) {
  // Renamed the variable to avoid the 'no-shadow' error
  const foundProduct = await dataSource.findProductById(e.target.dataset.id);

  // Call the addProductToCart method on the 'product' instance
  product.addProductToCart(foundProduct);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
