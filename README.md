# Playwright Test Framework for Magento Demo Store

## Target Website

https://magento.softwaretestingboard.com/

## Project Overview

This framework uses Playwirght with Typescript to test an e-commerce website. It covers navigation, product selection, cart operations, filtering, discount codes, and checkout flow.

The framework includes:
- Page Object Model (POM) for reusable code
- Fixtures for POM setup and ad-blocking
- Random test data generation using `@faker-js/faker`: random product preferences (size, color, quantity), random shipping info for the Netherlands

## Features Covered

### Navigation Menu Tests

**File:** `navigation.spec.ts`

- **Validate Category Navigation**  
  Checks that each menu item leads to the correct URL and page title.

- **Go to First Product in Random Category**  
  Navigates to a random category and checks the product name on the detail page.

- **Go to Random Product in Random Category**  
  Same as above, but selects a random product from the list.

---
### Product Details Tests

**File:** `product.details.spec.ts`

- **Top Clothing Product Preferences**  
  Configures a top product with size, color, and quantity and verifies values.

- **Bottom Clothing Product Preferences**  
  Same as above but for bottom products.

- **Add to Cart and Check Quantity**  
  Adds a top product to cart and checks the cart icon shows the correct quantity.

- **Add to Cart Without Preferences Validation**
  Attempts to add a top product to the cart without selecting size or color and verifies that appropriate error messages are displayed.
---

### Product Filtering Tests

**File:** `product.filtering.spec.ts`

- **Category Filter Verification**  
  Applies filters (size, color) to categories and verifies the filters are applied.

---

### Checkout Tests

**File:** `checkout.spec.ts`

- **View and Edit Cart After Adding Product**  
  Adds a product to the cart and verifies product name, size, and color.

- **Apply Discount Code and Validate Discount**  
  Applies a valid discount code (`20poff`) and checks that it is applied.

- **Proceed to Checkout and Validate Shipping Step**  
  Ensures the checkout page loads after proceeding from the cart.

- **Fill Shipping Form and Place Order**  
  Fills out shipping information with random Dutch data and places an order.

---

### End-to-End Flow

**File:** `e2e.spec.ts`

This test simulates a full user journey:
1. Navigate to home page
2. Go to a category
3. Select and configure a product
4. Add product to cart
5. Apply discount
6. Proceed to checkout
7. Fill shipping info
8. Place the order
9. Validate confirmation

---

## Running the Tests

Install dependencies:

```bash
npm install
```

Run tests:
```bash
npx run test
```
View the test report:
```bash
npx playwright show-report
```
