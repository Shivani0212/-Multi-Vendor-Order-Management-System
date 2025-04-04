# -Multi-Vendor-Order-Management-System

A full-featured backend system built with **Node.js**, **Express**, and **MongoDB** to manage a **multi-vendor order management system**.  
This backend supports multiple roles — customers, vendors, and admins — and includes smart order processing, analytics, and inventory management.

---

## Overview

Building the backend for a **Multi-Vendor Order Management System**, where:

- Vendors can manage products.
- Customers can place orders across multiple vendors.
- Orders are automatically split per vendor.
- The system tracks revenue and product performance.

---

## Key Features

### Authentication & RBAC

- **Sign Up / Login** using JWT.
- User roles:
  - `customer`
  - `vendor`
  - `admin`
  - Middleware-based *Role-Based Access Control (RBAC)* for protected routes.
---

### Product Management (Vendor Only)

- Vendors can:
  - Create new products
  - Update existing products
  - Delete products
- Product schema:
  - `name`
  - `price`
  - `stock`
  - `vendorId`
  - `category`
  - `createdAt`

---

### Order Management (Customer)

- Customers can:
  - Place a single order with products from multiple vendors.
- Backend Responsibilities:
  - Validate stock before processing
  - Deduct stock (transaction-safe using MongoDB Transactions)
  - Split order into vendor-specific sub-orders
  - Generate a **master order** containing all sub-orders

---

### Analytics (Admin & Vendor Dashboards)

#### **Admin APIs**
- `GET /api/admin/revenue`: Revenue per vendor (last 30 days)
- `GET /api/admin/top-products`: Top 5 products by sales
- `GET /api/admin/avg-order-value`: Average order value

#### **Vendor APIs**
- `GET /api/vendor/sales`: Daily sales (last 7 days)
- `GET /api/vendor/low-stock`: List of low-stock products (`stock < 5`)

---

## Tech Stack & Tools

| Feature            | Stack / Tool        |
|--------------------|---------------------|
| Backend Runtime    | Node.js             |
| Framework          | Express.js          |
| Database           | MongoDB + Mongoose  |
| Auth               | JWT + Bcrypt        |
| Dev testing        | Swagger             |

---

## Project Structure

-`/controllers`→ Logic for Admin, Vendor, and Customer

-`/models` → Mongoose Schemas

-`/routes` → Express Routers

-`/middleware` → Auth, RBAC

-`.env` → Environment variables

---

## Setup & Run Locally

### 1. Clone the Repo

```bash
git clone https://github.com/Shivani0212/-Multi-Vendor-Order-Management-System.git
```

### 2. Install Dependencies
```bash 
npm install

```
### 3. Environment Variables
Create a .env file at the root of the project and add:

-`PORT=`

-`MONGODB_URI=`

-`JWT_SECRET=`


### 4. Run Server
```bash
npm run dev
```

---
### API Testing

Created Swagger UI for testing APIs:-

```bash
http://localhost:5000/api-docs

```
