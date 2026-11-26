const CART_STORAGE_KEY = "campus_cart";
const menuGrid = document.getElementById("menu-grid");
const cartList = document.getElementById("cart-list");
const cartSubtotalEl = document.getElementById("cart-subtotal");
const cartCountEl = document.getElementById("cart-count");
const cartMsgEl = document.getElementById("cart-msg");
const checkoutBtn = document.getElementById("checkout-btn");
const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".filter-btn");

function loadCart() {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);
  if (!savedCart) return [];

  try {
    const parsedCart = JSON.parse(savedCart);
    if (!Array.isArray(parsedCart)) {
      throw new TypeError("Saved cart must be an array.");
    }

    return parsedCart.reduce((items, savedItem) => {
      const menuItem = MENU_ITEMS.find((item) => item.id === Number(savedItem.id));
      const quantity = Number(savedItem.qty);
      if (menuItem && Number.isInteger(quantity) && quantity > 0) {
        items.push({
          id: menuItem.id,
          name: menuItem.name,
          price: Number(menuItem.price),
          qty: quantity
        });
      }
      return items;
    }, []);
  } catch (error) {
    console.error("Unable to read the saved CampusCafe cart:", error);
    return [];
  }
}

let cart = loadCart();
let activeCategory = "all";

function renderMenu() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  menuGrid.innerHTML = "";

  if (filteredItems.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-state";
    emptyMessage.textContent = "No menu items match your search.";
    menuGrid.appendChild(emptyMessage);
    return;
  }

  filteredItems.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.name;
    card.appendChild(image);

    const header = document.createElement("div");
    header.className = "card-header";
    const category = document.createElement("span");
    category.className = "category-tag";
    category.textContent = item.category;
    const price = document.createElement("span");
    price.className = "price";
    price.textContent = `₹${item.price}`;
    header.append(category, price);
    card.appendChild(header);

    const name = document.createElement("h3");
    name.textContent = item.name;
    card.appendChild(name);

    const description = document.createElement("p");
    description.style.fontSize = "0.85rem";
    description.style.color = "#6b7280";
    description.textContent = item.description;
    card.appendChild(description);

    const addButton = document.createElement("button");
    addButton.className = "btn btn-primary add-btn";
    addButton.dataset.id = item.id;
    addButton.textContent = "Add to Cart";
    addButton.addEventListener("click", () => addToCart(item.id));
    card.appendChild(addButton);

    menuGrid.appendChild(card);
  });
}

function addToCart(itemId) {
  const found = MENU_ITEMS.find((item) => item.id === itemId);
  if (!found) return;

  const existingItem = cart.find((item) => item.id === itemId);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      id: found.id,
      name: found.name,
      price: Number(found.price),
      qty: 1
    });
  }

  cartMsgEl.textContent = "";
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function renderCart() {
  cartList.innerHTML = "";
  let totalQuantity = 0;
  const subtotal = cart.reduce((sum, item) => {
    totalQuantity += item.qty;
    return sum + Number(item.price) * item.qty;
  }, 0);

  if (cart.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty-state";
    emptyItem.textContent = "Your cart is empty.";
    cartList.appendChild(emptyItem);
  } else {
    cart.forEach((item) => {
      const row = document.createElement("li");
      row.className = "cart-row";

      const name = document.createElement("span");
      name.textContent = item.name;

      const controls = document.createElement("div");
      controls.className = "qty-controls";

      const decreaseButton = document.createElement("button");
      decreaseButton.type = "button";
      decreaseButton.className = "qty-btn";
      decreaseButton.dataset.action = "decrease";
      decreaseButton.dataset.id = item.id;
      decreaseButton.setAttribute("aria-label", `Remove one ${item.name}`);
      decreaseButton.textContent = "−";

      const quantity = document.createElement("span");
      quantity.textContent = `×${item.qty}`;

      const increaseButton = document.createElement("button");
      increaseButton.type = "button";
      increaseButton.className = "qty-btn";
      increaseButton.dataset.action = "increase";
      increaseButton.dataset.id = item.id;
      increaseButton.setAttribute("aria-label", `Add one ${item.name}`);
      increaseButton.textContent = "+";

      const itemTotal = document.createElement("span");
      itemTotal.textContent = `₹${(Number(item.price) * item.qty).toFixed(2)}`;

      controls.append(decreaseButton, quantity, increaseButton, itemTotal);
      row.append(name, controls);
      cartList.appendChild(row);
    });
  }

  cartSubtotalEl.textContent = subtotal.toFixed(2);
  cartCountEl.textContent = totalQuantity;
}

cartList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const itemId = Number(button.dataset.id);
  const item = cart.find((cartItem) => cartItem.id === itemId);
  if (!item) return;

  if (button.dataset.action === "increase") {
    item.qty += 1;
  } else if (button.dataset.action === "decrease") {
    item.qty -= 1;
    if (item.qty === 0) {
      cart = cart.filter((cartItem) => cartItem.id !== itemId);
    }
  }

  saveCart();
  renderCart();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    filterButtons.forEach((filterButton) => {
      filterButton.classList.toggle("active", filterButton === button);
    });
    renderMenu();
  });
});

searchInput.addEventListener("input", renderMenu);

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    cartMsgEl.textContent = "Add an item to your cart before checking out.";
    return;
  }
  window.location.href = "pages/checkout.html";
});

renderMenu();
renderCart();
