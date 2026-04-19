# 🛒 Products API (Node.js + Express + PostgreSQL)

A scalable REST API built with Node.js, Express, and PostgreSQL following a **layered architecture pattern** used in production backend systems.

---

# 🚀 Architecture Overview

This project follows a clean separation of concerns:


Client → Routes → Controllers → Services → Repositories → Database


Each layer has a single responsibility, making the codebase scalable, testable, and maintainable.

---

# 🧱 Folder Structure


project-root/
│
├── api/
│ ├── controllers/ # HTTP request/response handling
│ ├── services/ # Business logic layer
│ ├── repositories/ # Database queries (SQL layer)
│ ├── routes/ # API endpoints
│
├── config/
│ ├── env.js # Loads environment variables
│ ├── db.js # PostgreSQL connection pool
│
├── app.js # Express application setup
├── start.js # Application entry/startup file
├── .env # Environment variables
├── package.json


---

# 🧠 Layer Responsibilities

## 🔹 Routes
Defines API endpoints and maps them to controllers.

```js
router.get('/products', getProducts);
🔹 Controllers

Handles HTTP logic only:

Request validation (basic)
Calling services
Sending responses
export const getProducts = async (req, res) => {
    const products = await productService.getAllProducts();
    res.json(products);
};
🔹 Services (Business Logic Layer)

Contains core application logic:

validation rules
transformations
business decisions
export const getAllProducts = async () => {
    return await productRepository.findAll();
};
🔹 Repositories (Database Layer)

Handles all database queries using PostgreSQL.

export const findAll = async () => {
    const result = await db.query('SELECT * FROM products');
    return result.rows;
};
🔹 Config Layer

Handles application configuration.

Environment Loader

Loads .env variables using dotenv.

import dotenv from 'dotenv';
dotenv.config();
Database Connection

Creates PostgreSQL connection pool.

⚙️ Application Startup Flow

The application uses a controlled startup sequence:

start.js
   ↓
Load environment variables
   ↓
Initialize database connection
   ↓
Create Express app
   ↓
Start HTTP server

This ensures:

predictable startup order
database is ready before server starts
environment variables are always loaded first
🚀 How to Run the Project
1. Install dependencies
npm install
2. Setup environment variables

Create a .env file:

DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=productsdb
DB_HOST=localhost
DB_PORT=5432
PORT=3000
3. Create database
CREATE DATABASE productsdb;
4. Start server (development)
npm run dev
📡 API Endpoints
🔹 Get all products
GET /products
🔹 Get product by ID
GET /products/:id
🔹 Create product
POST /products

Body:

{
  "name": "Laptop",
  "price": 1200
}
🔹 Update product
PATCH /products/:id
🔹 Delete product
DELETE /products/:id
🧠 Key Design Principles

✔ Separation of concerns
✔ Single responsibility per layer
✔ Database abstraction via repositories
✔ Business logic isolated in services
✔ Clean and testable architecture

🔐 Security Notes
Uses parameterized queries to prevent SQL injection
Environment variables used for sensitive data
Input validation handled at service/controller level (can be extended with Zod/Joi)
📈 Future Improvements
 Add authentication (JWT)
 Add input validation (Zod/Joi)
 Add centralized error handling middleware
 Add unit/integration tests
 Add Docker support
 Add logging system (Winston/Pino)
🎯 Purpose of this project

This project is designed to demonstrate:

real-world backend architecture
scalable Node.js project structure
PostgreSQL integration
separation of concerns (production pattern)
🤝 Author

Built for learning and backend architecture practice