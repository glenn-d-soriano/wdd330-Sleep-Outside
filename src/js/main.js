import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Get the element where products will be rendered
const listElement = document.querySelector(".product-list");

// Create a new instance of the data source
const dataSource = new ProductData("tents");

// Create a new instance of the ProductList class
const myProductList = new ProductList("tents", dataSource, listElement);

// Initialize the product list
myProductList.init();
