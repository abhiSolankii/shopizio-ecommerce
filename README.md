# Shopizio - E-Commerce Platform

## Project Links:

- Live Application: https://shopizio.netlify.app/
- GitHub Repository: https://github.com/abhiSolankii/shopizio-ecommerce.git

## Credentials to test the application:

- Email: test@gmail.com
- Password: testtest

**Shopizio** is a modern e-commerce web application built with React, Tailwind CSS, and Firebase. It provides a seamless shopping experience with features like product browsing, search, cart management, favorites, user authentication, and order placement. The app is designed to be responsive, user-friendly, and visually appealing, with a focus on clean code and maintainable architecture.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Project](#running-the-project)
- [Available Scripts](#available-scripts)
- [Functionalities](#functionalities)
  - [User Authentication](#user-authentication)
  - [Product Browsing](#product-browsing)
  - [Search Functionality](#search-functionality)
  - [Cart and Favorites](#cart-and-favorites)
  - [Order Placement](#order-placement)
  - [Protected Routes](#protected-routes)
  - [Not Found Page](#not-found-page)
- [API Integration](#api-integration)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Features

- **User Authentication**: Sign up, log in, and log out using email/password or Google authentication via Firebase.
- **Product Browsing**: View products by category, filter by price, and sort by price or newest.
- **Search Functionality**: Search for products by title using an API-driven search bar.
- **Cart Management**: Add products to the cart, adjust quantities, and view the cart.
- **Favorites**: Mark products as favorites and view them on a dedicated page.
- **Order Placement**: Place an order with a mock confirmation page (e.g., "Congratulations, Your Order is Placed").
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop screens.
- **Protected Routes**: Restrict access to certain pages (e.g., cart, favorites, profile) for authenticated users only.
- **Not Found Page**: Custom 404 page for invalid routes with a "Continue Shopping" option.
- **Loading States**: Display loading indicators during API calls for a better user experience.

---

## Technologies Used

- **Frontend**:

  - [React](https://reactjs.org/) - JavaScript library for building user interfaces.
  - [React Router](https://reactrouter.com/) - For client-side routing.
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling.
  - [Lucide React](https://lucide.dev/) - Icon library for consistent and modern icons.
  - [React Hot Toast](https://react-hot-toast.com/) - For toast notifications.

- **Backend & API**:

  - [Fake Store API](https://api.escuelajs.co/api/v1) - Mock API for products, categories, and orders.
  - [Axios](https://axios-http.com/) - HTTP client for making API requests.

- **Authentication**:

  - [Firebase Authentication](https://firebase.google.com/docs/auth) - For user authentication (email/password and Google sign-in).

- **State Management**:

  - React Context API - For managing global state (e.g., products, cart, favorites, authentication).

- **Other Tools**:
  - [Vite](https://vitejs.dev/) - Build tool for fast development and production builds.
  - [ESLint](https://eslint.org/) - For linting and maintaining code quality.
  - [Prettier](https://prettier.io/) - For code formatting.

---

## Project Structure

```
shopizio/
├── public/                   # Static assets (e.g., logo, images)
│   ├── logo.webp
│   └── assets/
│       └── carousel-images/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── common/           # Common components (e.g., Loader)
│   │   │   └── Loader.jsx
│   │   ├── ProductCard.jsx
│   │   ├── OrderConfirmation.jsx
│   │   └── ProtectedRoute.jsx
│   ├── config/               # Configuration files
│   │   ├── axiosConfig.js    # Axios setup with base URL
│   │   └── firebaseConfig.js # Firebase configuration
│   ├── context/              # React Context for state management
│   │   ├── AuthContext.js    # Authentication context
│   │   └── ProductContext.js # Product, cart, and favorites context
│   ├── hooks/                # Custom hooks
│   │   └── useApiRequest.js  # Hook for making API requests
│   ├── pages/                # Page components
│   │   ├── Cart.jsx
│   │   ├── Favourites.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── ProductPage.jsx
│   │   └── Profile.jsx
│   ├── services/             # API service files
│   │   ├── productService.js
│   │   ├── categoryService.js
│   │
│   ├── utils/                # Utility functions and mock data
│   │   ├── data.js           # Mock data (e.g., generalProducts)
│   │   └── handlers.js       # Error handling utilities
│   ├── App.jsx               # Main app component with routing
│   ├── main.jsx              # Entry point
│   ├── Navbar.jsx            # Navigation bar component
│   ├── Footer.jsx            # Footer component
│   ├── ScrollProgressBar.jsx # Scroll progress bar component
│   └── OtherRoutes.jsx       # Route definitions
├── .env                      # Environment variables
├── .eslintrc.cjs             # ESLint configuration
├── .prettierrc               # Prettier configuration
├── vite.config.js            # Vite configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation
```

---

## Setup Instructions

### Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (npm is used in this guide)
- [Firebase Account](https://firebase.google.com/) (for authentication)
- A code editor like [VS Code](https://code.visualstudio.com/)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/abhiSolankii/shopizio-ecommerce.git
   cd shopizio-ecommerce
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Firebase**:

   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project (e.g., "Shopizio").
   - Enable Authentication and set up the following sign-in methods:
     - Email/Password
     - Google
   - Copy your Firebase configuration (e.g., `apiKey`, `authDomain`, etc.) and add it to `src/config/firebaseConfig.js`.

   Example `firebaseConfig.js`:

   ```javascript
   import { initializeApp } from "firebase/app";
   import { getAuth } from "firebase/auth";

   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     storageBucket: "your-storage-bucket",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id",
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   ```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
# Firebase Configuration (replace with your Firebase project details)
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# API Base URL (Fake Store API)
VITE_BASE_URL=https://api.escuelajs.co
```

**Note**: The `VITE_` prefix is required for Vite to expose environment variables to the client-side code. Access these variables in your code using `import.meta.env.VITE_FIREBASE_API_KEY`, for example.

### Running the Project

1. **Start the Development Server**:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

2. **Build for Production**:

   ```bash
   npm run build
   ```

3. **Preview the Production Build**:
   ```bash
   npm run preview
   ```

---

## Available Scripts

In the project directory, you can run the following scripts:

- `npm run dev`: Starts the development server with hot reloading.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run preview`: Serves the production build locally for testing.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run format`: Formats the code using Prettier.

---

## Functionalities

### User Authentication

- **Sign Up/Login**: Users can sign up or log in using email/password or Google authentication via Firebase.
- **Profile Page**: Displays the user’s email and username (extracted from email, e.g., `abc` from `abc@gmail.com`).
- **Logout**: Clears the user session, cart, and favorites, then redirects to the login page.

### Product Browsing

- **Home Page**: Displays a banner carousel, popular categories, and a product grid.
- **Category Filtering**: Filter products by category (e.g., Shoes, Electronics).
- **Price Filtering**: Filter products by price range (e.g., $50-$100).
- **Sorting**: Sort products by price (low to high, high to low) or newest.
- **Pagination**: Paginate products with a custom pagination component.

### Search Functionality

- **Search Bar**: Available in the navbar (desktop and mobile).
- **API-Driven Search**: Fetches products from the API and filters them by title.
- **Dropdown Results**: Displays up to 5 matching products with images and prices.

### Cart and Favorites

- **Cart**: Add products to the cart, adjust quantities, and view the cart page.
- **Favorites**: Mark products as favorites and view them on the favorites page.
- **Persistence**: Cart and favorites are stored in the `ProductContext` (not persisted across sessions in this version).

### Order Placement

- **Buy Now**: On the product page, clicking "Buy Now" simulates order placement and navigates to the `OrderConfirmation` page.
- **Order Confirmation**: Displays a mock confirmation message with a "Continue Shopping" button that redirects to the homepage.

### Protected Routes

- Routes like `/cart`, `/favourites`, `/profile`, and `/product/:id` are protected using the `ProtectedRoute` component.
- Unauthenticated users are redirected to `/auth/login`.

### Not Found Page

- A custom 404 page is displayed for invalid routes (e.g., `/random-page`).
- Includes a "Continue Shopping" button to redirect to the homepage.

---

## API Integration

The app uses the [Fake Store API](https://api.escuelajs.co/api/v1) for product and category data. API calls are organized into service files:

- `productService.js`: Handles product-related API calls (e.g., fetch all products, search products).
- `categoryService.js`: Fetches categories.
- `userService.js`: Manages user-related API calls (e.g., create user, update user).
- `orderService.js`: Simulates order creation and retrieval.

**Base URL**: `https://api.escuelajs.co/api/v1` (configured in `axiosConfig.js`).

**Example API Call**:

- Fetch a product by ID: `GET /products/4`
- Search products: `GET /products` (filtered on the client side by title).

---

## Future Improvements

- **Persistent Cart/Favorites**: Store cart and favorites in local storage or a backend database to persist across sessions.
- **Real Order Placement**: Integrate with a payment gateway (e.g., Stripe) and a backend to handle real orders.
- **Advanced Search**: Add server-side search with query parameters (e.g., `/products?title=query`) for better performance.
- **Product Reviews**: Allow users to add and view product reviews.
- **User Dashboard**: Expand the profile page to include order history and account settings.
- **Loading Skeletons**: Replace simple loading indicators with skeleton screens for a better UX.
- **Testing**: Add unit and integration tests using Jest and React Testing Library.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Thanks to the [Fake Store API](https://api.escuelajs.co/api/v1) for providing a free mock API for testing.
- Built with ❤️ by Abhishek.

---

This `README.md` provides a comprehensive overview of the Shopizio project, making it easy for developers to understand, set up, and contribute to the project. Let me know if you’d like to add more sections or details!
