import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product_id");

// The 'product' instance
const product = new ProductDetails(productID, dataSource);
product.init();
