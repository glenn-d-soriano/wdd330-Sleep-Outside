import productData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const datasource = new productData("tents");
const element = document.querySelector(".product-list");
const list = new ProductList("tents", datasource, element);

list.init();

loadHeaderFooter();