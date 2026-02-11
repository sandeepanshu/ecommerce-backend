# Ecommerce Backend

A Node.js/Express-based backend API for an ecommerce application.

## Project Structure

```
ecommerce-backend/
├── src/
│   ├── config/          # Configuration files (database, environment)
│   ├── models/          # Database models (User, Product, Cart, Order)
│   ├── controllers/     # Business logic controllers
│   ├── routes/          # API route definitions
│   ├── middlewares/     # Express middlewares
│   └── app.js           # Main application file
├── bruno/               # API collection (for Bruno API testing)
├── package.json         # Project dependencies
└── README.md            # This file
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

## API Endpoints

- Authentication routes: `/api/auth`
- Product routes: `/api/products`
- Cart routes: `/api/cart`
- Order routes: `/api/orders`
