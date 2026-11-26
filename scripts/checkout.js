const CART_STORAGE_KEY = "campus_cart";
const checkoutItemsEl = document.getElementById("checkout-items");
const subtotalEl = document.getElementById("subtotal");
const taxEl = document.getElementById("tax");
const discountEl = document.getElementById("discount");
const grandTotalEl = document.getElementById("grand-total");

const promoInput = document.getElementById("promo-input");
const applyPromoBtn = document.getElementById("apply-promo-btn");
const promoMsgEl = document.getElementById("promo-msg");

const orderForm = document.getElementById("order-form");
const studentNameInput = document.getElementById("student-name");
const rollNumberInput = document.getElementById("roll-number");
const orderMsgEl = document.getElementById("order-msg");

function loadCart() {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);
  if (!savedCart) return [];

  try {
    const parsedCart = JSON.parse(savedCart);
    if (!Array.isArray(parsedCart)) {
      throw new TypeError("Saved cart must be an array.");
    }

    return parsedCart.filter((item) =>
      item &&
      typeof item.name === "string" &&
      Number.isFinite(Number(item.price)) &&
      Number(item.price) >= 0 &&
      Number.isInteger(Number(item.qty)) &&
      Number(item.qty) > 0
    ).map((item) => ({
      id: item.id,
      name: item.name,
      price: Number(item.price),
      qty: Number(item.qty)
    }));
  } catch (error) {
    console.error("Unable to read the saved CampusCafe cart:", error);
    return [];
  }
}

let cart = loadCart();
let discountAmount = 0;

function calculateSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function renderCheckout() {
  checkoutItemsEl.innerHTML = "";

  if (cart.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty-state";
    emptyItem.textContent = "No items found in your order.";
    checkoutItemsEl.appendChild(emptyItem);
  } else {
    cart.forEach((item) => {
      const row = document.createElement("li");
      row.className = "cart-row";

      const description = document.createElement("span");
      description.textContent = `${item.name} × ${item.qty}`;
      const price = document.createElement("span");
      price.textContent = `₹${(item.price * item.qty).toFixed(2)}`;

      row.append(description, price);
      checkoutItemsEl.appendChild(row);
    });
  }

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.05;
  const grandTotal = Math.max(0, subtotal + tax - discountAmount);

  subtotalEl.textContent = subtotal.toFixed(2);
  taxEl.textContent = tax.toFixed(2);
  discountEl.textContent = discountAmount.toFixed(2);
  grandTotalEl.textContent = grandTotal.toFixed(2);
}

function showMessage(element, message, isSuccess) {
  element.textContent = message;
  element.classList.toggle("msg-success", isSuccess);
  element.classList.toggle("msg-error", !isSuccess);
}

applyPromoBtn.addEventListener("click", () => {
  const code = promoInput.value.trim().toUpperCase();
  const subtotal = calculateSubtotal();
  discountAmount = 0;

  if (code !== "STUDENT15") {
    showMessage(promoMsgEl, "Invalid promo code.", false);
  } else if (subtotal < 150) {
    showMessage(promoMsgEl, "Your subtotal must be at least ₹150 to use this code.", false);
  } else {
    discountAmount = subtotal * 0.15;
    showMessage(promoMsgEl, "STUDENT15 applied: 15% off your subtotal.", true);
  }

  renderCheckout();
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (cart.length === 0) {
    showMessage(orderMsgEl, "Your cart is empty. Add items before confirming your order.", false);
    return;
  }

  if (!studentNameInput.value.trim() || !rollNumberInput.value.trim()) {
    showMessage(orderMsgEl, "Please enter both your full name and roll number.", false);
    return;
  }

  const orderId = `CC-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()}`;

  localStorage.removeItem(CART_STORAGE_KEY);
  cart = [];
  discountAmount = 0;
  renderCheckout();
  showMessage(orderMsgEl, `Order confirmed! Your Order ID is ${orderId}.`, true);
});

renderCheckout();
