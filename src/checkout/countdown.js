const template = document.getElementById("product-card");

const productList = document.getElementById("product-list");

const products = [
    {
        name: "Tent",
        description: "4-person camping tent",
        price: "$120",
        image: "tent.jpg"
    },
    {
        name: "Sleeping Bag",
        description: "Warm and cozy",
        price: "$50",
        image: "sleepingbag.jpg"
    }
];

products.forEach((product) => {
    // Clone the template
    const clone = template.content.cloneNode(true);

    // Select elements inside the template clone
    const [title, desc, price, img] = clone.querySelectorAll("h2, p, p, img");

    // Populate with product data
    title.textContent = product.name;
    desc.textContent = product.description;
    price.textContent = product.price;
    img.src = product.image;
    img.alt = product.name;

    // Add the clone to the DOM
    productList.appendChild(clone);
});
