========================================================
                FakeStore React Application
========================================================

A simple CRUD (Create, Read, Update, Delete) application 
built with React and React Bootstrap. This application 
interacts with the FakeStoreAPI to display, create, 
update, and delete product information.

This project was built as a learning exercise to work with:
- React Router
- REST API calls (GET, POST, PUT, DELETE)
- Axios
- React Bootstrap UI components
- Component-based UI design
- State management with useState and useEffect

========================================================
                     FEATURES
========================================================

1. Home Page
   - Displays a welcome message and navigation options.
   - Includes buttons to view products or add a new product.

2. Product Listing Page
   - Fetches and displays all products from FakeStoreAPI.
   - Each product includes a button to view details.

3. Product Detail Page
   - Loads a single product based on ID from URL.
   - Displays product information (image, title, price, etc.).
   - Includes buttons to add to cart, edit product, and delete product.

4. Add Product Page
   - Allows users to create new products (POST request).
   - Shows success message on completion.
   - Redirects back to the homepage after creation.

5. Edit Product Page
   - Pre-fills a form with existing product data.
   - Allows users to update the product (PUT request).
   - Displays success message before redirecting.
   - Includes a confirmation modal for deleting the product.

6. Navigation Bar
   - Fully responsive using React Bootstrap.
   - Contains links to Home, Product List, and Add Product.
   - Fixed at the top and stretches full width.

7. Loading & Error Handling
   - Displays loading indicators during API calls.
   - User-friendly error messages when requests fail.

========================================================
                  TECHNOLOGIES USED
========================================================

- React.js
- React Router DOM
- Axios
- React Bootstrap
- JavaScript (ES6+)
- CSS / Bootstrap styling
- FakeStoreAPI (https://fakestoreapi.com)

========================================================
                  HOW TO RUN THE PROJECT
========================================================

1. Clone or download the project.

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev

4. Open your browser and go to:
   http://localhost:5173
   (Or the URL shown in the terminal)


========================================================
                     API NOTE
========================================================

FakeStoreAPI is a testing / mock-based API.
- POST, PUT, DELETE requests return success responses
  but the data DOES NOT persist.
- GET requests always return the original sample dataset.

This behavior is normal and expected.

========================================================
                 AUTHOR / CREDITS
========================================================

This project was created as part of a React learning module.

Feel free to modify, improve, or build on top of it.

========================================================
"# FakestoreApp" 
