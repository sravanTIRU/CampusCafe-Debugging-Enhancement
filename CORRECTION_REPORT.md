# CampusCafe Project Report

*Debugging and Enhancement*

## 1. Student Details

| Field | Details |
| --- | --- |
| Student Name | T G Sravan Teja |
| Roll Number | 261FB04042 |
| Course | 1st MTech - CSE |

## 2. Introduction

CampusCafe is a small, static student-cafe ordering application. The assigned work addressed broken links and incomplete cart and checkout logic across its menu and checkout pages. This report summarizes the existing structure, implemented changes, and manually verified functional scenarios.

## 3. Project Overview

The menu page is `index.html`. It renders products from `scripts/menuData.js` and uses `scripts/app.js` for filtering, cart interaction, and persistence. The checkout page is `pages/checkout.html`, with calculations and order handling in `scripts/checkout.js`. Both pages share cart state through browser `localStorage` under the `campus_cart` key.

- Styling is shared through `styles/main.css` and `styles/theme.css`.
- Product icons and the page background are SVG files under `assets/`.
- The application uses plain HTML, CSS, and JavaScript; no framework or build step is required.

## 4. Technologies Used

| Technology | Application |
| --- | --- |
| HTML5 | Page structure, menu, and checkout form |
| CSS3 | Layout, colors, responsive presentation, and component styling |
| JavaScript | Menu filtering, cart state, calculations, promo handling, and order confirmation |
| `localStorage` | Cart persistence between the two pages |
| SVG | Menu icons and subtle background pattern |

## 5. Existing Project Analysis

The original project had a compact two-page structure, but several links did not match the actual directory layout. JavaScript on the menu page also depended on menu data that was loaded afterward. Cart behavior was incomplete, and checkout used a different storage key and an incorrect grand-total element ID.

| Area | Original condition |
| --- | --- |
| Resource references | Stylesheets, scripts, background, menu SVGs, and checkout return link used invalid relative paths. |
| Menu/cart behavior | Only one Add to Cart button was wired; filtering, search, quantity controls, and empty-cart guard were incomplete. |
| Calculations/state | Subtotal omitted quantity and string prices could concatenate; menu and checkout used different storage keys. |
| Checkout | Grand-total lookup was incorrect; promo code and order validation were placeholders. |

## 6. Issues Identified

- Incorrect CSS, script, icon, background, and navigation paths prevented resources or pages from loading.
- Menu data was referenced before its script was loaded.
- Cart item rows could duplicate, quantity and badge behavior were missing, and totals were not calculated from quantity.
- Checkout could not read the menu page's saved cart and did not update the grand-total field.
- Promo eligibility, validation messages, student detail checks, order confirmation, and cart clearing were not implemented.

## 7. Debugging and Fixes Implemented

| Issue | Implemented fix and outcome |
| --- | --- |
| Broken resource/page paths | Corrected root-relative and checkout-relative stylesheet, script, SVG, background, and back-navigation paths; both pages now reference existing project resources. |
| Script load order and icons | Loaded `menuData.js` before `app.js` and pointed menu items at their matching SVG files. |
| Numeric cart totals | Stored menu prices as numbers and calculate subtotal from each unit price multiplied by its quantity. |
| Cart persistence and grand total | Standardized both pages on `campus_cart` and corrected the grand-total element reference. |

## 8. Enhancements Implemented

- Menu filters for All, Drinks, and Snacks highlight the active category; live name search combines with that category.
- All product buttons add items. Adding an existing product increments its quantity rather than creating another row.
- Cart `+`/`−` controls update quantities and remove an item at zero. The top badge shows total quantity, and the menu subtotal updates numerically.
- Checkout navigation is blocked for an empty cart and displays a helpful message.
- `STUDENT15` provides a 15% subtotal discount only when the subtotal is at least ₹150. Invalid codes and below-threshold attempts show an error and set discount to zero.
- Checkout validates a non-empty cart and both Full Name and Roll Number. A valid order displays a generated Order ID and clears saved cart data.
- The existing 5% GST calculation and display were retained; no additional tax rate was introduced.

## 9. Testing and Validation

The following scenarios were manually verified for the completed application:

| Scenario | Verified result |
| --- | --- |
| Resources and navigation | Menu and checkout pages, CSS, JavaScript, SVGs, checkout navigation, and return link resolve to the project resources. |
| Filtering and search | All category filters work and indicate the active filter; live search combines with the selected category. |
| Cart operations | All products can be added; repeated products merge; `+`/`−` controls adjust quantity and remove at zero. |
| Cart totals and empty cart | Subtotal and total-quantity badge update correctly; empty-cart checkout and order confirmation are prevented. |
| Checkout calculations | Saved cart appears; subtotal, existing 5% GST, discount, and grand total display and calculate. |
| Promo code | Below-₹150 subtotal is rejected; ₹150 or more receives 15% off subtotal; invalid code resets discount to zero. |
| Order confirmation | Missing student fields are rejected; valid details show an Order ID and clear the stored cart. |

These results are documented as manual verification. No automated browser test or browser-console inspection is claimed.

## 10. Reflection Question and Answer

**Question:** Why could not pasting a single file into a standard online chat window solve all of these bugs immediately, whereas workspace-aware AI tools (like GitHub Copilot or Antigravity) can locate and fix them accurately?

**Answer:** The defects crossed file boundaries: paths depended on folder locations, script order depended on another file, and cart data and element IDs had to match across pages. A single pasted file does not reveal those relationships or the complete set of assets. A workspace-aware tool can inspect the project files together, trace how they depend on one another, and make coordinated corrections based on the actual structure.

## 11. Conclusion

The project's broken resource references and incomplete menu, cart, and checkout behavior were corrected within its existing static architecture. The documented manual scenarios cover the assigned features, including cart calculations, promo eligibility, required student details, successful order confirmation, and cart clearing.
