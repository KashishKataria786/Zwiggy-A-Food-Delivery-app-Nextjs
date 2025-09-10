# 🍽️ Swiggy (Next.js Project)

A full-stack **Next.js web application** that replicates the core functionality of food delivery platforms like **Swiggy**.  
The platform contains two main views:  

- **Customer View** – search for restaurants, browse menus, place orders, and track them in real time.  
- **Restaurant Dashboard** – manage orders, update statuses, and view analytics.  

---

## 🚀 Features

### 👤 Customer Side
- 🔐 Register / Login / Logout  
- 🔍 Search restaurants by **location** or **name**  
- 📋 Browse restaurants and menus  
- 🛒 Place new orders  
- 👀 Watch and track existing orders in real-time  

### 🏢 Restaurant Dashboard
- 🔐 Register / Login / Logout  
- ➕ Add, ✏️ Edit, ❌ Delete menu items  
- 📦 Manage incoming orders  
- 🔄 Update order statuses (Pending, Accepted, Preparing, Out for Delivery, Completed, etc.)  
- 📊 View dashboard analytics (total orders, revenue, status breakdown, etc.)  

---

## 🛠️ Tech Stack
- **Frontend**: [Next.js](https://nextjs.org/), React, Tailwind CSS  
- **Backend**: Next.js API Routes (Node.js)  
- **Database**: MongoDB (Mongoose ORM)  
- **Authentication**: JWT / NextAuth  
- **State Management**: React Context API / Redux Toolkit  

---

## 📂 Project Structure
```bash
swiggy-nextjs/
├── pages/               # Next.js pages (routes)
│   ├── customer/        # Customer-facing views
│   ├── restaurant/      # Restaurant dashboard
│   ├── api/             # API routes for auth, orders, restaurants
│   └── index.js         # Landing page
├── components/          # Shared React components
├── lib/                 # Database connection, utilities
├── models/              # Mongoose models (User, Restaurant, Order)
├── styles/              # Global styles (Tailwind)
├── public/              # Static assets
└── README.md
