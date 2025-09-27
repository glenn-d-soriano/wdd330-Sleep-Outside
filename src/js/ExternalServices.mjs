// added in w03 individual activity
const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResp = await res.json();
  if (res.ok) { // check the response to see if it is 'ok' (res.ok). 'Ok' is any status of 200, or most 300s
    return  jsonResp; // return the response as json
  } else {
    // throw new Error("Bad Response");
    throw { name: "servicesError", message: jsonResp};
    //  If the status on the response is 40x or 50x then it is NOT okay. 
    // The server sends back a 400 response if something goes wrong. 
    // Then it puts the details in the body of the response.
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
