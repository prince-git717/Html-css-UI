const products = [
  { id: 1, name: "T-Shirt", price: 400 },
  { id: 2, name: "Cap", price: 200 },
  { id: 3, name: "Shoes", price: 1500 }
];

let cart = {};

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const totalDisplay = document.getElementById("total");

// Load products
products.forEach(product => {
  const div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
    <span>${product.name} - ₹${product.price}</span>
    <button onclick="addToCart(${product.id})">Add</button>
  `;
  productList.appendChild(div);
});

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateCart();
}

function removeFromCart(id) {
  delete cart[id];
  updateCart();
}

function updateCart() {
  cartList.innerHTML = "";
  let total = 0;

  for (let id in cart) {
    const product = products.find(p => p.id == id);
    const quantity = cart[id];
    const itemTotal = product.price * quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${product.name} x ${quantity} = ₹${itemTotal}</span>
      <button class="remove" onclick="removeFromCart(${id})">Remove</button>
    `;
    cartList.appendChild(div);
  }

  totalDisplay.textContent = "Total: ₹" + total;
}