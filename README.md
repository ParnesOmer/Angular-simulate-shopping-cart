# BMC Shop – Angular Home Assignment

A mini e-commerce application built with Angular, implementing user registration, authentication, product browsing, and shopping cart functionality according to the BMC Home Test requirements.

## Requirements Summary

This project implements all main requirements from the BMC Home Test:

- **Registration Page** – Email, password, and confirm password fields with comprehensive validation
- **Login Page** – Email and password authentication with error handling
- **Application Page** – Protected by Authentication Guard, accessible only after login
- **Products List** – Displays products with name, price, and images, each with an "Add to cart" button
- **Shopping Cart** – Full cart management with quantity controls, subtotals, and order summary
- **Bonus: Cart Persistence** – Cart state persists across browser sessions using LocalStorage
- **Bonus: Lazy Loading** – Auth and Shop modules are lazy-loaded for optimal performance
- **Playwright E2E Tests** – Comprehensive test suite covering registration, login, cart operations, and auth guard

## Features Implemented

### Authentication
- **Registration Form** with validations:
  - Email format validation
  - Password minimum length (6 characters)
  - Password must contain uppercase letter
  - Password confirmation matching
  - Duplicate user detection
- **Login Form** with error handling for invalid credentials
- **Authentication Guard** protecting `/app/*` routes, redirecting unauthenticated users to login
- **Session Management** using LocalStorage to track current user

### Shopping Experience
- **Products Page**:
  - Responsive grid layout displaying product cards
  - Real product images with lazy loading
  - Product name, price, and "Add to cart" button
  - Modern card-based UI with hover effects
- **Shopping Cart Page**:
  - Product cards with images and details
  - Quantity controls (+/- buttons)
  - Per-item subtotal calculation
  - Remove item functionality
  - Clear cart button
  - Order summary panel with total items count and total price
  - Layout with product image, unit price, and quantity display
- **Header Navigation**:
  - Logo and navigation links (Products, Cart)
  - Current user email display
  - Logout functionality

### Data Persistence
- **User Management**: Users stored in LocalStorage
- **Password Security**: Passwords are stored using a simple deterministic hash (demo-only). In a real production environment, secure server-side hashing such as bcrypt/argon2 with salt would be used.
- **Per-User Cart**: Each user has their own cart, persisted separately using keys based on user email
- **Cart Persistence**: Cart state survives page reloads and browser sessions

## Architecture

This project uses Angular standalone components architecture. All components are standalone, and lazy-loaded feature modules (AuthModule, ShopModule) are used only as routing containers for organizing and lazy-loading feature areas.

## Technologies Used

- **Angular** – Built with Angular CLI and TypeScript
- **Angular Standalone Components** – Modern component architecture
- **Lazy-Loaded Feature Areas** – Auth and Shop modules loaded on-demand
- **Playwright** – End-to-end testing framework
- **LocalStorage API** – Client-side data persistence
- **CSS3** – Custom styling without external UI frameworks

## Project Structure

```
bmc-shop/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   └── auth-guard.ts          # Route protection guard
│   │   │   ├── models/
│   │   │   │   ├── user.model.ts          # User interface
│   │   │   │   ├── product.model.ts       # Product interface
│   │   │   │   └── cart-item.model.ts     # Cart item interface
│   │   │   └── services/
│   │   │       ├── auth.ts                # Authentication service
│   │   │       ├── cart.ts                # Shopping cart service
│   │   │       └── local-storage.ts       # LocalStorage wrapper
│   │   ├── auth/
│   │   │   ├── auth-module.ts             # Lazy-loaded auth module
│   │   │   ├── auth-routing-module.ts     # Auth routes
│   │   │   ├── auth-shared.css            # Shared auth styles
│   │   │   └── pages/
│   │   │       ├── login/                 # Login component
│   │   │       └── register/              # Registration component
│   │   ├── shop/
│   │   │   ├── shop-module.ts             # Lazy-loaded shop module
│   │   │   ├── shop-routing-module.ts     # Shop routes
│   │   │   ├── components/
│   │   │   │   └── header/                # Header navigation component
│   │   │   └── pages/
│   │   │       ├── products/               # Products list component
│   │   │       └── cart/                   # Shopping cart component
│   │   ├── app.config.ts                   # Application configuration
│   │   ├── app.routes.ts                   # Root routing configuration
│   │   ├── app.ts                          # Root component
│   │   └── app.html                        # Root template
│   ├── index.html
│   ├── main.ts                             # Application bootstrap
│   └── styles.css                          # Global styles
├── tests/
│   ├── auth-register.spec.ts              # Registration flow test
│   ├── auth-login.spec.ts                 # Login flow test
│   ├── auth-guard.spec.ts                 # Auth guard protection test
│   ├── cart-add-view.spec.ts             # Add to cart & view cart test
│   └── example.spec.ts                    # Root redirect test
├── public/
│   └── favicon.ico
├── angular.json                            # Angular CLI configuration
├── package.json                            # Project dependencies
├── playwright.config.ts                    # Playwright configuration
├── tsconfig.json                           # TypeScript configuration
├── tsconfig.app.json                       # TypeScript app config
└── tsconfig.spec.json                      # TypeScript test config
```

## How to Run the Application

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```
   Or alternatively:
   ```bash
   ng serve
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:4200
   ```

4. **First-time usage**:
   - The app will redirect to the login page
   - Click "Register" to create a new account
   - After registration, log in with your credentials
   - Browse products and add items to your cart

## How to Run Playwright Tests

1. **Install Playwright browsers** (first time only):
   ```bash
   npx playwright install
   ```

2. **Start the Angular development server** (in a separate terminal):
   ```bash
   npm start
   ```

3. **Run all tests**:
   ```bash
   npx playwright test
   ```

4. **Run a specific test**:
   ```bash
   npx playwright test tests/auth-register.spec.ts
   ```

5. **View test report**:
   ```bash
   npx playwright show-report
   ```

### Available Tests

- **Registration Test** (`auth-register.spec.ts`) – Tests user registration flow and localStorage persistence
- **Login Test** (`auth-login.spec.ts`) – Tests login flow and redirect to products page
- **Auth Guard Test** (`auth-guard.spec.ts`) – Verifies unauthenticated users are redirected from protected routes
- **Cart Test** (`cart-add-view.spec.ts`) – Tests adding products to cart, viewing cart, and persistence after reload
- **Root Redirect Test** (`example.spec.ts`) – Verifies root URL redirects to login page

All tests use `data-testid` attributes for stable, maintainable selectors that are resilient to UI changes.

## Implementation Notes

- **CartService** manages cart state and persists to LocalStorage using per-user keys (`cart_<email>`)
- **AuthService** handles user registration, login, and session management. Passwords use a simple deterministic hash for demo purposes only.
- **Header Component** displays the current user's email and provides navigation
- **Lazy Loading**: AuthModule and ShopModule are loaded on-demand to improve initial load time
- **Images**: Product images use `loading="lazy"` for performance optimization
- **Standalone Components**: All components use Angular's standalone architecture
- **Separation of Concerns**: Business logic in services, UI in components, routing in modules

## Final Remarks

This project was built specifically for the BMC Home Test assignment, implementing all required features plus bonus functionality. The codebase follows Angular best practices with a clean architecture, comprehensive testing, and a modern, responsive user interface.

Thank you for reviewing this submission.
