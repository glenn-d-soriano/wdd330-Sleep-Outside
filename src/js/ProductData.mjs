const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  // The constructor is now empty because the category and path are no longer needed
  constructor() { }

  async getData(category) {
    // This fetches data from the API endpoint
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);

    // The API returns the product list in a 'Result' property
    return data.Result;
  }

  async findProductById(id) {
    // This fetches a single product directly from the API
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);

    // The API returns the single product in a 'Result' property
    return data.Result;
  }
}