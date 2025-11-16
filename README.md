# D&D Shop — React + Vite Project

A simple e-commerce style application for browsing and managing Dungeons & Dragons–themed products.
Built using React, Vite, React Router, Context API, custom hooks, and a JSON Server backend.

## Features
- Product Browsing

View a catalog of products (Books & Dice sets).

- Animated product cards:

- Minimal compact view.

- Expand on hover to show additional details (description, stock, price, and “View Details”).

- Click a product card to view full details on a separate page.

### Admin Panel (CRUD)

Administrators can:

- Create a new product

- Edit existing products

- Delete products

And all changes sync to the JSON server backend.

#### Backend API (JSON Server)

The app uses a lightweight REST API at:

http://localhost:3001/products

Supports:
- GET all products
- POST new products
- PATCH updates
- DELETE products

##### React Architecture

- Custom Hook: useProducts manages all API interactions (GET, POST, PATCH, DELETE).
- Context API (optional depending on your structure).
- React Router v6 for page navigation.
- Reusable Components like ProductCard.

###### Vitest + Testing Library

- Includes:
- Component tests (ProductCard)
- Hook tests (useProducts)
- JSDOM environment support

####### Project Structure
summative/
│
├── db.json                  # JSON server database
├── index.html               # Root HTML
├── package.json
├── vite.config.js           # Vite configuration
│
├── src/
│   ├── App.jsx              # Base application routes/layout
│   ├── main.jsx             # Entry point
│   │
│   ├── components/
│   │   └── ProductCard.jsx
│   │
│   ├── context/
│   │   └── ProductContext.jsx (optional)
│   │
│   ├── hooks/
│   │   └── useProducts.js   # Custom hook for API interactions
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   └── AdminPage.jsx    # CRUD operations UI
│   │
│   ├── styles/
│   │   └── styles.css       # Card animations + layout styling
│   │
│   ├── tests/
│   │   ├── setup.js         # JSDOM + Fetch mock setup
│   │   ├── ProductCard.test.jsx
│   │   └── UseProduct.test.jsx
│
└── public/                  # Static assets

######## Getting Started
1. Install dependencies
npm install

2. Start the JSON Server backend

In a separate terminal:

json-server --watch db.json --port 3001

{-I had the below issue during creation, testing, and use, chatGPT walked me through the below steps to solve-}
If you get EADDRINUSE, that means the port is already taken.
Fix:

sudo lsof -i :3001
kill -9 <PID>

3. Start the React App
npm run dev


The site runs at:
👉 http://localhost:5173

######### Running Tests
Run all tests:
npm test

Test stack:

Vitest (test runner)

@testing-library/react

JSDOM environment

What is covered:

ProductCard rendering

useProducts fetching & API logic

Component behavior via MemoryRouter

########## Styling & Animations
Product card hover effect:

Cards are compact by default (image + title + category).

On hover:

Card expands vertically

Additional .product-info content fades in

Subtle movement & shadow increase

This is implemented in styles/styles.css:

.product-card { transition: max-height 0.3s ease, box-shadow 0.3s ease; }
.product-info { opacity: 0; transition: opacity 0.25s ease; }
.product-card:hover .product-info { opacity: 1; }

########### API Overview
GET all products
GET /products

POST new product
POST /products
Content-Type: application/json

PATCH update product
PATCH /products/:id

DELETE product
DELETE /products/:id


The custom React hook useProducts() wraps these for easy use in components.

############ Tech Stack
Layer	Technology
Frontend	React, Vite, React Router
State Management	React Context (optional), Custom Hooks
Testing	Vitest + React Testing Library
Backend	JSON Server
Styling	CSS (with hover animations & grid layout)

############# Deployment Notes

This project uses:

A Vite dev server

A separate JSON server
These will need to be adapted for production if deployed.

Possible deployment options:

Use an Express backend instead of JSON server

Replace static API URL with environment variables

Host React app on Netlify/Vercel

Host backend on Render/Heroku
