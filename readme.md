# 🛒 Products API (Node.js + Express + PostgreSQL)

## 📌 Overview

This project is a **RESTful API** built using **Node.js** and **Express**, connected to a **PostgreSQL** database. It demonstrates a clean and scalable backend architecture using:

* Routes
* Controllers
* Models
* Database connection layer

The API allows you to perform basic **CRUD operations** (Create, Read, Delete) on products.

---

## 🚀 Tech Stack

* **Node.js** – JavaScript runtime
* **Express.js** – Web framework
* **PostgreSQL** – Relational database
* **pg** – PostgreSQL client for Node.js

---

## 📁 Project Structure

```
api/
│
├── config/
│   └── db.js                # Database connection
│
├── models/
│   └── productModel.js     # Database queries
│
├── controllers/
│   └── productController.js # Business logic
│
├── routes/
│   └── products.js         # API routes
│
├── app.js                  # Express app setup
└── server.js               # Server entry point
```

---

## 🧠 Architecture Explanation

The application follows a **layered architecture**:

```
Client → Route → Controller → Service → Model → Database
```

### 🔹 Routes

* Define API endpoints
* Forward requests to controllers

### 🔹 Controllers

* Handle request/response logic
* Validate input
* Call model functions


### 🔹 Services
* Business logic layer
* Validation rules
* Orchestration between models

### 🔹 Models

* Contain SQL queries
* Interact directly with the database

### 🔹 Database

* Stores product data using PostgreSQL

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure database

Create a PostgreSQL database:

```sql
CREATE DATABASE productsdb;
```

Create a table:

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL
);
```

### 4. Configure environment (optional but recommended)

You can store DB credentials in a `.env` file:

```
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=productsdb
DB_PORT=5432
```

---

## 🔌 Database Connection

The app uses a connection pool via `pg`:

```js
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'productsdb',
    password: 'your_password',
    port: 5432,
});
```

---

## ▶️ Running the Server

```bash
node server.js
```

Server runs on:

```
http://localhost:3000
```

---

## 📡 API Endpoints

### ✅ GET all products

```
GET /products
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "Laptop",
    "price": "1200"
  }
]
```

---

### ✅ CREATE a product

```
POST /products
```

**Body:**

```json
{
  "name": "Phone",
  "price": 500
}
```

---

### ✅ DELETE a product

```
DELETE /products/:id
```

---

## 🔐 Security Notes

* Uses **parameterized queries** (`$1, $2`) to prevent SQL injection
* Input validation is partially implemented (can be improved)

---

## ⚠️ Improvements to Consider

* Add **PUT/PATCH** (update product)
* Add **input validation** (Joi or Zod)
* Add **error handling middleware**
* Add **authentication (JWT)**
* Use **environment variables** for sensitive data

---

## 🎯 Learning Goals

This project helps you understand:

* How Express apps are structured
* How to connect Node.js to PostgreSQL
* How to write SQL queries in a backend
* Separation of concerns (routes/controllers/models)

---

## 📌 Conclusion

This is a solid foundation for building scalable backend applications. The structure used here is close to what is used in real-world production systems.

---

## 🤝 Contributing

Feel free to fork the project and improve it by adding new features or optimizing existing code.

---

## 📄 License

This project is open-source and available under the MIT License.
