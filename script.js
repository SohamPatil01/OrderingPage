function showUserPopup() {
  document.getElementById("userPopup").style.display = "flex";
}

function closePopup() {
  const username = document.getElementById("username").value;
  if (username.trim() === "") {
    alert("Please enter your name!");
  } else {
    document.getElementById("userPopup").style.display = "none";
  }
}

function addToCart(item, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ item, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${item} added to cart!`);
}

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItems = document.getElementById("cartItems");
  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach((entry) => {
    let li = document.createElement("li");
    li.textContent = `${entry.item} - ₹${entry.price}`;
    cartItems.appendChild(li);
    total += entry.price;
  });

  document.getElementById("totalAmount").textContent = total;
}

function placeOrder() {
  localStorage.removeItem("cart");
  document.getElementById("successMessage").classList.remove("hidden");
}
