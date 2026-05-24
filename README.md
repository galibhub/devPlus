DevPulse 🚀
Internal Tech Issue & Feature Tracker

A role-based backend API system where contributors can report bugs/feature requests and maintainers can manage issues and monitor system metrics.

🌐 Live Features

✅ User Registration
✅ User Login with JWT
✅ Password Hashing using bcrypt
✅ Role-Based Authorization
✅ Create Issue
✅ Get All Issues
✅ Get Single Issue
✅ Update Issue
✅ Delete Issue
✅ Filtering & Sorting
✅ Reporter Information
✅ Metrics API for Maintainers

🛠️ Technology Stack
Technology	Usage
Node.js	Runtime Environment
Express.js	Backend Framework
TypeScript	Type Safety
PostgreSQL	Database
pg	Native PostgreSQL Driver
bcryptjs	Password Hashing
jsonwebtoken	JWT Authentication
dotenv	Environment Variables
📁 Project Structure
src
├── app.ts
├── server.ts
├── config
│   └── index.ts
├── db
│   └── index.ts
├── middleware
│   └── auth.ts
└── modules
    ├── auth
    │   ├── auth.controller.ts
    │   ├── auth.route.ts
    │   ├── auth.service.ts
    │   └── auth.interface.ts
    └── issue
        ├── issue.controller.ts
        ├── issue.route.ts
        ├── issue.service.ts
        └── issue.interface.ts
⚙️ Environment Variables

Create a .env file in the root directory:

PORT=5000

CONNECTIONSTRING=your_postgresql_connection_string

JWT_SECRET=your_secret_key
🚀 Installation & Setup
1️⃣ Clone Repository
git clone <repository_url>
2️⃣ Install Dependencies
npm install
3️⃣ Run Development Server
npm run dev
🗄️ Database Tables
Users Table
Field	Type
id	SERIAL PRIMARY KEY
name	VARCHAR
email	UNIQUE VARCHAR
password	TEXT
role	contributor / maintainer
created_at	TIMESTAMP
updated_at	TIMESTAMP
Issues Table
Field	Type
id	SERIAL PRIMARY KEY
title	VARCHAR
description	TEXT
type	bug / feature_request
status	open / in_progress / resolved
reporter_id	INTEGER
created_at	TIMESTAMP
updated_at	TIMESTAMP
🔐 Authentication System

JWT-based authentication system is implemented.

Login Flow
User Login
→ Validate Credentials
→ Generate JWT Token
→ Client Stores Token
→ Protected Routes Verify Token
👥 Roles & Permissions
Role	Permissions
contributor	Create and view issues
maintainer	Full issue management + metrics access
📌 API Endpoints
🔑 Authentication Routes
Register User
POST /api/auth/signup
Login User
POST /api/auth/login
🐞 Issue Routes
Create Issue
POST /api/issues

🔒 Protected Route

Get All Issues
GET /api/issues
Query Support
?sort=newest
?sort=oldest
?type=bug
?status=open
Get Single Issue
GET /api/issues/:id
Update Issue
PATCH /api/issues/:id

🔒 Protected Route

Delete Issue
DELETE /api/issues/:id

🔒 Maintainer Only

Metrics API
GET /api/issues/metrics

🔒 Maintainer Only

🔍 Filtering & Sorting

Supported query parameters:

Query	Example
sort	newest / oldest
type	bug / feature_request
status	open / in_progress / resolved

Example:

/api/issues?type=bug&status=open
🔒 Security Features

✅ Password hashing using bcrypt
✅ JWT authentication
✅ Protected routes
✅ Role-based authorization
✅ Input validation logic
✅ No password exposure in responses

📌 Special Assignment Constraints Followed

✅ Raw SQL only
✅ No ORM used
✅ No SQL JOIN used
✅ PostgreSQL native pg driver used
✅ Modular architecture maintained

👨‍💻 Author
Ibrahim Ahmed Galib

Backend Developer | MERN & TypeScript Learner 🚀
