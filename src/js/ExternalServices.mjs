// added in w03 individual activity
const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  // 1. Read the JSON body first, regardless of 'ok' status
  const jsonResponse = await res.json();

  if (res.ok) {
    return jsonResponse;
  } else {
    // 2. If NOT 'ok', throw a custom error object containing the server's message
    //    The server's detailed error is inside jsonResponse
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export default class ExternalServices {
  // constructor(category) {
  constructor() {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  // getData() {
  //   return fetch(this.path).then(convertToJson).then((data) => data);
  // }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    console.log(data);
    return data.Result;
  }

  async findProductById(id) {
    // const products = await this.getData();
    // return products.find((item) => item.Id === id);
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log(data);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}
