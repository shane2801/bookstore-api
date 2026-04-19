# 📚 Bookstore API

A RESTful Bookstore API built with Node.js, Express, and PostgreSQL using a clean layered architecture.  
This project is designed to simulate a real-world backend system with scalable structure, separation of concerns, and proper data modeling.

---

## 🚀 Features

### 📦 Products
- Create, read, update, and delete books
- Stored in a PostgreSQL database
- Input validation for safe data handling

### 🛒 Orders
- Create and manage orders linked to products
- Relational database structure (orders ↔ products)
- Supports partial updates (PATCH)
- DELETE orders

### 🔍 Data Enrichment
- Orders return full product details (not just IDs)
- JOIN queries for easier debugging and frontend integration

---

## 🧱 Architecture

This project follows a **layered architecture pattern**:

Client → Routes → Controllers → Services → Repositories → Database

### 🔹 Routes
Define API endpoints and map them to controllers.

### 🔹 Controllers
Handle HTTP requests and responses.

### 🔹 Services
Contain business logic and validation rules.

### 🔹 Repositories
Handle direct database queries (PostgreSQL).

### 🔹 Database
Stores products and orders with relational structure.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)
- Zod (validation)
- Nodemon (development)

---

## 📁 Project Structure


```bash
api/
│
├── config/
│ ├── db.js
│ └── env.js
│
├── controllers/
│ ├── productController.js
│ └── orderController.js
│
├── services/
│ ├── productService.js
│ └── orderService.js
│
├── repositories/
│ ├── productRepository.js
│ └── orderRepository.js
│
├── validators/
│ ├── productValidator.js
│ └── orderValidator.js
│
├── routes/
│ ├── products.js
│ └── orders.js
│
├── app.js
├── start.js
└── server.js
```

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/bookstore-api.git
cd bookstore-api

```

### 2. Install dependencies

```bash
npm install
```

### 3. Create PostgreSQL database

```bash
CREATE DATABASE bookstore;
4. Create tables
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### 5. Configure environment variables

Create a .env file:
```bash
DB_USER=your_user
DB_HOST=localhost
DB_NAME=bookstore
DB_PASSWORD=your_password
DB_PORT=5432

PORT=3000
```
### 6. Run the server
```bash
npm start
```
Server runs on:

```bash
http://localhost:3000
```


# 📡 API Endpoints
### 🟢 Products


| Method | Endpoint      | Description        |
| ------ | ------------- | ------------------ |
| GET    | /products     | Get all products   |
| GET    | /products/:id | Get single product |
| POST   | /products     | Create product     |
| PATCH  | /products/:id | Update product     |
| DELETE | /products/:id | Delete product     |


### 🟡 Orders

| Method | Endpoint    | Description      |
| ------ | ----------- | ---------------- |
| GET    | /orders     | Get all orders   |
| GET    | /orders/:id | Get single order |
| POST   | /orders     | Create order     |
| PATCH  | /orders/:id | Update order     |
| DELETE | /orders/:id | Delete order     |



## 🧠 What This Project Demonstrates

This project is built to demonstrate:

* RESTful API design
* Layered backend architecture
* PostgreSQL relational database design
* Input validation using Zod
* Clean separation of concerns
* Real-world backend structuring patterns
## 🔮 Future Improvements

This project is actively evolving. Planned features include:

#### 🔐 Authentication & Authorization
* JWT-based login system
* Role-based access control (admin/user)
#### 👤 Customer System
* Customer accounts
* Orders linked to users
#### 💳 Payments
* Payment flow simulation
* Order confirmation system

#### 📊 Advanced Features
* Pagination
* Filtering & search
* Sorting
* Rate limiting
* Logging system

#### 🚀 Production Enhancements
* Docker support
* Unit & integration testing
* CI/CD pipeline
* Deployment (Render / Railway / AWS)

### 🎯 Purpose

The goal of this project is to simulate a real-world backend system, focusing on scalability, maintainability, and clean architecture principles.

This is an ongoing project and will continue to grow with more advanced backend features.
