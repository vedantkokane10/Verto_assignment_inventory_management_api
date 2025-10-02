# 📦 Inventory Management System API

## Verto ASE Hiring Challenge Submission

> A robust backend API for warehouse inventory tracking and management

## 🎥 Video Walkthrough

Watch a detailed explanation of this project: [Loom Video](https://www.loom.com/share/8c6d6eed19ac4b4fb6ec01bb54d068f6?sid=dedd2fda-a21c-40f5-b22e-50bf1be7f056)

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Testing](#-testing)
- [Design Decisions](#-design-decisions)
- [Project Structure](#-project-structure)

---

## 🎯 Project Overview

This is a backend-heavy REST API built for the Verto ASE Challenge. The system manages warehouse inventory with full CRUD operations, stock tracking, and low-stock alerts. It ensures robust business logic with proper validation and error handling.

### Core Requirements Met ✅

- ✅ Full CRUD operations for products
- ✅ Stock quantity validation (cannot go below zero)
- ✅ Stock increment/decrement endpoints
- ✅ Comprehensive error handling
- ✅ Low stock threshold monitoring (Bonus)
- ✅ Unit tests with edge cases (Bonus)

---

## ✨ Features

### Core Features

1. **Product Management**
   - Create, Read, Update, and Delete products
   - Each product has: name, description, and stock quantity

2. **Inventory Logic**
   - Stock quantity validation (min: 0)
   - Safe stock increment operations
   - Safe stock decrement with availability checks
   - Proper error responses for insufficient stock

3. **Pagination Support**
   - Efficient data retrieval with page and limit parameters
   - Next/previous page indicators

### Bonus Features ⭐

4. **Low Stock Alerts**
   - Configurable `lowStockThreshold` per product
   - Dedicated endpoint to fetch products below threshold

5. **Comprehensive Testing**
   - Unit tests for all critical operations
   - Edge case coverage (insufficient stock, invalid inputs)
   - Automated test suite with Jest & Supertest

---

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Prisma
- **Testing**: Jest + Supertest
- **Language**: JavaScript (ES6+)

---

## 📥 Installation

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/vedantkokane10/Verto_assignment_inventory_management_api
   cd inventory-management-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/Inventory"
   PORT=3000
   ```

4. **Set up the database**
   ```bash
   # Create database
   npx prisma db push
   
   # Generate Prisma Client
   npx prisma generate
   ```

---

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The server will start on `http://localhost:3000` (or your configured PORT)

### Production Mode

```bash
npm start
```

---

## 🔌 API Endpoints

### Product Management

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/products` | Get all products (paginated) | Query: `page`, `limit` |
| `GET` | `/products/:id` | Get product by ID | - |
| `POST` | `/products` | Create new product | `name`, `description`, `stockQuantity`, `lowStockThreshold?` |
| `PUT` | `/products/:id` | Update product | `name?`, `description?`, `stockQuantity?`, `lowStockThreshold?` |
| `DELETE` | `/products/:id` | Delete product | - |

### Stock Management

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `PATCH` | `/products/:id/increase` | Increase stock quantity | `{ "amount": number }` |
| `PATCH` | `/products/:id/decrease` | Decrease stock quantity | `{ "amount": number }` |

### Low Stock Monitoring

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/products/low-stock` | Get products below threshold | - |

### Example Requests

**Create Product:**
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "Dell XPS 15",
    "stockQuantity": 50,
    "lowStockThreshold": 10
  }'
```

**Increase Stock:**
```bash
curl -X PATCH http://localhost:3000/products/1/increase \
  -H "Content-Type: application/json" \
  -d '{ "amount": 20 }'
```

**Decrease Stock:**
```bash
curl -X PATCH http://localhost:3000/products/1/decrease \
  -H "Content-Type: application/json" \
  -d '{ "amount": 5 }'
```

---

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Test Coverage

The test suite includes:

- ✅ Product creation with validation
- ✅ Fetching all products
- ✅ Stock increment operations
- ✅ Stock decrement operations
- ✅ Insufficient stock handling
- ✅ Low stock product retrieval
- ✅ Product deletion
- ✅ Invalid input validation

### Test Output Example

```
PASS  tests/product.test.js
  Product Controller
    ✓ POST /products - create product (150ms)
    ✓ POST /products - fail if fields missing (45ms)
    ✓ GET /products - fetch all products (60ms)
    ✓ PATCH /products/:id/increase - increase stock (70ms)
    ✓ PATCH /products/:id/decrease - decrease stock (65ms)
    ✓ GET /products/low-stock - fetch low stock (55ms)
    ✓ DELETE /products/:id - delete product (50ms)
```

---

## 💡 Design Decisions & Assumptions

### Architecture Choices

1. **Service Layer Pattern**
   - Separation of concerns between controllers and business logic
   - `ProductService` handles all database operations
   - Controllers focus on request/response handling

2. **Error Handling Strategy**
   - Proper HTTP status codes (400, 404, 500)
   - Descriptive error messages
   - Graceful handling of edge cases

3. **Validation Approach**
   - Input validation at controller level
   - Business logic validation in service layer
   - Stock quantity cannot be negative

4. **Database Design**
   - Auto-incrementing ID as primary key
   - Default values for `stockQuantity` (0) and `lowStockThreshold` (5)
   - Simple schema for maintainability

### Assumptions

- Stock quantity is always an integer
- Product names don't need to be unique
- Default low stock threshold is 5 units
- Pagination defaults: page=1, limit=5
- All endpoints are public (no authentication required for challenge)
- Concurrent stock updates are handled by database-level operations

### Future Enhancements

- Add authentication & authorization
- Implement product categories
- Add transaction history tracking
- Support bulk operations
- Add inventory value calculations
- Implement real-time notifications for low stock

---

## 📁 Project Structure

```
inventory-management-api/
├── controllers/
│   └── Inventory.controller.js    # Request handlers (Business logic)
├── services/
│   └── Product.service.js         # DB operations
├── routes/
│   └── product.routes.js          # API route definitions
├── prisma/
│   └── schema.prisma              # Database schema
├── tests/
│   └── product.test.js            # Test suite
├── server.js                      # App initialization
├── .env                           # Environment variables
├── package.json                   # Dependencies
└── README.md                      # Documentation
```

---

## 👨‍💻 Author

Submitted for the **Verto ASE Challenge**

- **Position**: Associate Software Engineer
- **Location**: Pune, Hybrid
- **Submission Date**: October 2025

---

## 📝 License

This project is created as part of the Verto hiring process.

---

## 🙏 Acknowledgments

Special thanks to the Verto team for creating this engaging challenge that allowed me to demonstrate real-world problem-solving skills!

---

