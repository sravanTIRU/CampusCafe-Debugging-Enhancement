## SECTION 1: STUDENT DETAILS

- **Student Name:** T G Sravan Teja
- **Roll Number:** 2612FB04042
- **Course:** Ist M.Tech – CSE

## SECTION 2: ORIGINAL ASSIGNMENT

# CampusCafe — AI-Generated Project Debugging & Enhancement Task

## Scenario

An AI assistant generated this 2-page **CampusCafe** web application using **HTML, CSS, and JavaScript**. However, when you open `index.html` in a browser, the layout, images, scripts, checkout page, and calculations are broken—and several requested features are incomplete.

---

## Your Objectives

### Part 1: Fix Folder Structure, Resource Links & Existing Bugs

1. Inspect the project folder structure and fix all broken **CSS**, **JavaScript**, **image**, and **page navigation** paths across both `index.html` and `pages/checkout.html` (including CSS `url(...)` paths and `<script>` loading order).
2. Fix all broken icons on the menu cards so every item displays its proper SVG graphic.
3. Fix the JavaScript bugs preventing:
   - All "Add to Cart" buttons from working properly
   - Cart totals from calculating numerically (currently concatenating values)
   - Saved cart items from appearing on `pages/checkout.html`
   - Grand Total from displaying on the checkout page

### Part 2: Add Missing Logic

1. **Menu Filtering & Search (`index.html`)**:
   - Clicking `All`, `Drinks`, or `Snacks` should filter the menu items and highlight the active button.
   - Typing in the search box should filter items by name in real time (combined with the active category).
2. **Cart Quantity Controls & Empty Check (`index.html`)**:
   - Adding the same item again should increase its quantity instead of duplicating rows.
   - Add working `+` and `-` quantity buttons in the cart (removing the item if quantity reaches `0`).
   - Update the top-right `Cart: X items` badge with the total item quantity.
   - Block navigation to checkout and display a helpful message if the cart is empty.
3. **Student Promo Code Logic (`pages/checkout.html`)**:
   - Code `STUDENT15` gives **15% off the subtotal** only when the subtotal is **₹150 or more**.
   - Show a clear error message if the subtotal is under ₹150 or if the promo code is invalid (and reset discount to `0`).
4. **Order Confirmation Validation (`pages/checkout.html`)**:
   - Require both **Full Name** and **Roll Number** before confirming an order (and disallow confirming an empty cart).
   - On valid submission, display an order confirmation message with a generated Order ID and clear the saved cart.

---

## Reflection Question (To Include in Your Submission)

Why couldn't pasting a single file into a standard online chat window solve all of these bugs immediately, whereas workspace-aware AI tools (like **GitHub Copilot** or **Antigravity**) can locate and fix them accurately?

## SECTION 3: ACTUAL PROJECT DOCUMENTATION

### 1. Project Overview

CampusCafe is a two-page static web application for browsing a student cafe menu, managing a cart, and confirming an order. Cart data is shared between the menu and checkout pages using browser `localStorage`.

### 2. Project Objectives

- Repair resource paths and page navigation.
- Make menu filtering, search, cart management, and totals work reliably.
- Add the requested student promo code and order validation.
- Preserve the existing lightweight HTML, CSS, and JavaScript structure.

### 3. Technologies Used

| Technology             | Use                                        |
| ---------------------- | ------------------------------------------ |
| HTML5                  | Menu and checkout page structure           |
| CSS3                   | Layout, theme, and responsive presentation |
| JavaScript             | Menu, cart, promo, and order behavior      |
| Browser `localStorage` | Persisting cart items between pages        |
| SVG                    | Menu item icons and background pattern     |

### 4. Project Folder Structure

```text
CampusCafe/
├── assets/
│   ├── bg-pattern.svg
│   └── icons/
│       ├── coffee.svg
│       ├── juice.svg
│       ├── muffin.svg
│       └── sandwich.svg
├── pages/
│   └── checkout.html
├── scripts/
│   ├── app.js
│   ├── checkout.js
│   └── menuData.js
├── styles/
│   ├── main.css
│   └── theme.css
├── index.html
├── README.md
└── Project_Report.docx
```

### 5. Features and Functionality

- Browse menu items and filter by **All**, **Drinks**, or **Snacks**.
- Search item names in real time; search combines with the selected category.
- Add items to the cart, adjust quantities, and see an updated item count and subtotal.
- Continue to checkout only when the cart contains items.
- Review the saved cart, apply `STUDENT15` to eligible subtotals, and view the order total.
- Confirm an order only after entering a full name and roll number; receive an Order ID.

### 6. Setup and Execution Instructions

**Prerequisites:** Python 3 and a modern web browser. No additional application dependencies or build step are required.

1. Open a terminal in the project root (the folder containing `index.html`).
2. Start Python's local HTTP server:

   ```bash
   python -m http.server 8000
   ```

3. Open the application at [http://localhost:8000/](http://localhost:8000/).
4. Use **Proceed to Checkout** to open checkout. Stop the server with `Ctrl+C` when finished.

Serving the folder over HTTP allows the browser to load the pages and static resources from a consistent local origin.

### 7. Debugging and Fixes Implemented

- Corrected stylesheet and script URLs, checkout-relative paths, the background SVG URL, and the checkout back link.
- Loaded menu data before the menu application script.
- Fixed all menu icon references and made menu prices numeric.
- Used the same `campus_cart` storage key on both pages and corrected the grand-total element reference.
- Corrected cart totals to use item price multiplied by quantity.

### 8. Enhancements Implemented

- Added category filtering, active filter highlighting, and combined real-time name search.
- Made every Add to Cart button work and merged repeated items by increasing quantity.
- Added `+` and `−` cart controls; an item is removed at quantity zero.
- Updated the cart badge to show total quantity and blocked checkout for an empty cart.
- Added `STUDENT15` for a 15% subtotal discount when subtotal is at least ₹150. Invalid or ineligible codes show an error and leave the discount at zero.
- Required both student fields and a non-empty cart before confirmation; successful confirmation displays an Order ID and clears saved cart data.
- Retained the existing checkout display and calculation of 5% GST; no additional tax rule was introduced.

Open `Project_Report.docx` to view the detailed implementation changes and their outcomes.

### 9. Testing Summary

The following scenarios were manually verified for the completed application:

| Scenario                                    | Verified result                                                                                         |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Menu assets, page resources, and navigation | Pages, styles, scripts, SVGs, and page links load from their project paths.                             |
| Category filtering and search               | Each category filters the menu; live search works together with the active category.                    |
| Cart additions and quantity controls        | All menu items can be added; repeated additions increment quantity; `+` and `−` update or remove items. |
| Cart totals and badge                       | Subtotal reflects price × quantity, and the badge reflects total quantity.                              |
| Empty-cart checkout and order               | Checkout navigation and confirmation are blocked when the cart is empty with a helpful message.         |
| Shared cart and checkout totals             | Saved items appear on checkout; subtotal, existing GST, discount, and grand total display.              |
| Promo code                                  | `STUDENT15` is rejected below ₹150, applies 15% at or above ₹150, and invalid codes reset the discount. |
| Student details and order confirmation      | Missing details are rejected; valid details generate an Order ID and clear saved cart data.             |

These are recorded as **manual verification**. No automated browser test or browser-console inspection is claimed here.

### 10. Reflection Question and Answer

**Question:** Why couldn't pasting a single file into a standard online chat window solve all of these bugs immediately, whereas workspace-aware AI tools (like GitHub Copilot or Antigravity) can locate and fix them accurately?

**Answer:** The bugs depended on relationships across multiple files: relative paths, script load order, shared cart storage, and matching HTML element IDs. A single pasted file does not show the full folder structure or dependent pages and assets. A workspace-aware tool can inspect those files together, trace how they interact, and make coordinated corrections based on the actual project.
