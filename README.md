# SYNCUP Realtime Feed Application

A realtime coaching/news feed application built using Next.js, Node.js, Express.js, PostgreSQL, Redis, and Socket.IO.

---

# Features

## Backend
- GET `/feed` API
- POST `/feed` API
- PostgreSQL database storage
- Redis caching
- Socket.IO realtime broadcasting

## Frontend
- Modern responsive UI
- Realtime live feed updates
- Admin dashboard to publish feeds
- Socket connection status
- Loading states
- Duplicate socket event prevention

---

# Tech Stack

## Frontend
- Next.js
- Tailwind CSS
- Axios
- Socket.IO Client

## Backend
- Node.js
- Express.js
- PostgreSQL
- Redis
- Socket.IO

---

# Project Structure

```text
syncup-realtime-feed/
│
├── backend/
│
└── frontend/
```

---

# Backend Setup

## 1. Navigate to backend

```bash
cd backend
```

## 2. Install dependencies

```bash
npm install
```

---

# PostgreSQL Setup

## 1. Open pgAdmin

Login using your PostgreSQL password.

---

## 2. Create Database

Open Query Tool and run:

```sql
CREATE DATABASE syncup;
```

---

## 3. Create feeds table

Select the `syncup` database.

Open Query Tool again and run:

```sql
CREATE TABLE feeds (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Redis Setup

Ensure Redis server is installed and running locally.

Default Redis URL:

```text
redis://localhost:6379
```

---

# Environment Variables

Create a `.env` file inside:

```text
backend/
```

Add:

```env
PORT=5000

DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/syncup

REDIS_URL=redis://localhost:6379
```

Replace:

```text
YOUR_PASSWORD
```

with your PostgreSQL password.

Example:

```env
DATABASE_URL=postgresql://postgres:root123@localhost:5432/syncup
```

---

# Start Backend Server

Inside backend folder:

```bash
npm run dev
```

Expected console:

```text
Redis Connected
PostgreSQL Connected
Server running on port 5000
```

---

# Frontend Setup

## 1. Navigate to frontend

```bash
cd frontend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

# Application Routes

## Home Page

```text
http://localhost:3000
```

Displays realtime feed updates.

---

## Admin Page

```text
http://localhost:3000/admin
```

Allows admin to create new feed updates.

---

# How Realtime Updates Work

1. Admin publishes a feed update
2. Backend stores data in PostgreSQL
3. Redis cache is cleared
4. Socket.IO emits realtime event
5. Frontend receives event instantly
6. Feed updates without page refresh

---

# API Endpoints

## GET /feed

Fetch all feeds.

### Endpoint

```text
GET http://localhost:5000/feed
```

---

## POST /feed

Create a new feed.

### Endpoint

```text
POST http://localhost:5000/feed
```

### Request Body

```json
{
  "title": "React Workshop",
  "message": "Starts tomorrow at 6 PM"
}
```

---

# Testing Functionality

## Test REST APIs

Use Postman:

### GET feeds

```text
http://localhost:5000/feed
```

### POST feed

```text
http://localhost:5000/feed
```

Request body:

```json
{
  "title": "Realtime Test",
  "message": "Socket.IO working"
}
```

---

# Test Realtime Functionality

1. Open Home Page
2. Open Admin Page in another tab
3. Publish a new feed
4. Observe Home Page updating instantly without refresh

---

# Reconnect Handling

Socket.IO reconnects automatically if connection is lost.

Connection status is displayed in the UI.

---

# Redis Caching Strategy

## Cache Flow

- GET `/feed`
  - Checks Redis cache first
  - Falls back to PostgreSQL if cache miss

## Cache Invalidation

- POST `/feed`
  - Clears Redis cache after new feed creation

---

# Bonus Features Implemented

- Realtime updates
- Socket reconnect handling
- Duplicate socket event prevention
- Responsive modern UI
- Loading states
- Connection status indicator

