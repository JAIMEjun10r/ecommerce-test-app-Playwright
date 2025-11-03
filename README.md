# E-commerce Test Automation with Playwright

This project contains end-to-end automated tests for an e-commerce application using Playwright and TypeScript. The tests follow the Page Object Model (POM) design pattern for better maintainability and reusability.

## 🎯 Project Overview

This test automation framework validates critical functionalities of an e-commerce web application, including:

- User authentication (login/logout)
- Product browsing and filtering
- Shopping cart operations
- Wishlist management
- Checkout process
- Order management
- User profile management

## 🏗️ Architecture

The project follows the **Page Object Model (POM)** pattern:

```
├── pages/                    # Page Object classes
│   ├── loginPage.ts         # Login page actions and validations
│   ├── productPage.ts       # Product listing and filtering
│   └── cartFunctionality.ts # Shopping cart operations
├── tests/
│   ├── e2e/                 # End-to-end test scenarios
│   │   ├── login.spec.ts
│   │   ├── products.spec.ts
│   │   └── cartFunctionality.spec.ts
│   └── fixtures/            # Test data
│       └── users.ts
├── support/
│   └── index.ts             # Test fixture extensions
└── playwright.config.ts     # Playwright configuration
```

## 🧪 Test Coverage

### Authentication Tests
- ✅ Admin login with valid credentials
- ✅ Customer login with valid credentials
- ✅ Login with invalid credentials
- ✅ Email format validation
- ✅ Required field validation
- ✅ Admin dashboard access control

### Product Tests
- ✅ Display product list
- ✅ Filter products by category
- ✅ Sort products by price
- ✅ Combine multiple filters
- ✅ Clear all filters

### Cart Tests
- ✅ Add items to cart
- ✅ Update item quantity
- ✅ Remove items from cart
- ✅ Apply valid coupon codes
- ✅ Handle invalid coupons
- ✅ Cart total calculations

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JAIMEjun10r/ecommerce-test-app-Playwright.git
cd ecommerce-test-app-Playwright
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

### Running the Application

The test application is located in the `app/` directory. You need to start the application server before running the tests.

1. Navigate to the app directory:
```bash
cd app
```

2. Install app dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🧪 Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test Suite
```bash
npx playwright test tests/e2e/login.spec.ts
npx playwright test tests/e2e/products.spec.ts
npx playwright test tests/e2e/cartFunctionality.spec.ts
```

### Run Tests in Headed Mode
```bash
npx playwright test --headed
```

### Run Tests in UI Mode
```bash
npx playwright test --ui
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### Run Tests with Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## 📊 Test Reports

After running tests, you can view the HTML report:

```bash
npx playwright show-report
```

The report will open in your default browser showing:
- Test execution results
- Screenshots of failures
- Detailed test traces
- Execution timeline

## 🔧 Configuration

Test configuration is managed in `playwright.config.ts`:

- **Base URL**: `http://localhost:3000`
- **Timeout**: Default timeout for test operations
- **Retries**: Configured for CI environments
- **Workers**: Parallel test execution
- **Browsers**: Chromium, Firefox, WebKit

## 📝 Test Data

Test users are defined in `tests/fixtures/users.ts`:

**Admin User:**
- Email: `user@test.com`
- Password: `password123`

**Customer User:**
- Email: `cliente@test.com`
- Password: `password456`

**Coupon Codes:**
- `DEZOFF` - 10% discount
- `VINTEOFF` - R$ 20 fixed discount
- `FRETEGRATIS` - Free shipping

## 🎯 Best Practices

This project follows Playwright best practices:

1. **Page Object Model**: All page interactions are encapsulated in page objects
2. **No Assertions in Tests**: All `expect` statements are inside page object methods
3. **Data-Test-IDs**: Uses `data-test-id` attributes for stable element selection
4. **Wait Strategies**: Implements proper waiting mechanisms (no hard waits)
5. **Independent Tests**: Each test can run independently
6. **Parallel Execution**: Tests can run in parallel safely

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-test`)
3. Commit your changes (`git commit -m 'Add new test scenario'`)
4. Push to the branch (`git push origin feature/new-test`)
5. Open a Pull Request

## 📄 License

ISC

## 👤 Author

JAIMEjun10r

## 🔗 Links

- Repository: [https://github.com/JAIMEjun10r/ecommerce-test-app-Playwright](https://github.com/JAIMEjun10r/ecommerce-test-app-Playwright)
- Issues: [https://github.com/JAIMEjun10r/ecommerce-test-app-Playwright/issues](https://github.com/JAIMEjun10r/ecommerce-test-app-Playwright/issues)