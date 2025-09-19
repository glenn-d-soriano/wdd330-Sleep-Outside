import productData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

const category = getParam("category");
// console.log(category);
const datasource = new productData();
const element = document.querySelector(".product-list");
const list = new ProductList(category, datasource, element);

document.querySelector("#category").textContent = category.toUpperCase();

list.init();
loadHeaderFooter();