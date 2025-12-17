# Hostify - Homestay Booking Platform

A modern homestay booking application built with Next.js 16, featuring secure authentication, property listing and viewing.

## Getting Started

### Prerequisites

- Node.js 20+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/shishir-hub/hostify.git
cd hostify
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# JWT Secret (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# Node Environment
NODE_ENV=development

# App URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Authentication Flow

### Signup Flow

```
┌─────────┐      ┌──────────────┐      ┌─────────────┐      ┌──────────┐
│  User   │─────▶│ Register Page│─────▶│  API Route  │─────▶│ Database │
└─────────┘      └──────────────┘      └─────────────┘      └──────────┘
                        │       email          │
                        │       password       │ Hash password
                        │     confirmpassword  │ Create user
                        │                      │ Generate JWT
                        │                      │
                        │◀─────────────────────┘
                        │
                        ▼
                  Set HTTP-only
                     cookie
                        │
                        ▼
                  Redirect to
                   home page
```

### Login Flow

```
1. User submits credentials (email + password)
   │
   ▼
2. POST /api/auth/login
   │
   ▼
3. Validate credentials
   - Find user by email
   - Compare password hash
   │
   ▼
4. Generate JWT token
   - Payload: { id, name, email, is_super_host, ... }
   - Sign with JWT_SECRET
   │
   ▼
5. Set HTTP-only cookie
   - Name: "token"
   - HttpOnly: true
   - SameSite: "strict"
   - Secure: true (production)
   │
   ▼
6. Return user data (without password)
   │
   ▼
7. Client updates Zustand store
   │
   ▼
8. Redirect to intended page or home
```

### Protected Route Flow

```
User requests /property/1/book
   │
   ▼
Middleware intercepts request
   │
   ├─ No token? ──────────────────▶ Redirect to /login?redirect=/property/1/book
   │
   ├─ Token exists
   │  └─ Verify token signature
   │     │
   │     ├─ Invalid? ─────────────▶ Redirect to /login
   │     │
   │     └─ Valid ────────────────▶ Allow access to page
   │
   ▼
Page renders with user data
```

## Folder Structure

```
hostify/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   └── auth/
│   │       ├── login/
│   │       │   └── route.ts      # POST /api/auth/login
│   │       └── register/
│   │           └── route.ts      # POST /api/auth/register
│   ├── property/                 # Property pages
│   │   └── [id]/
│   │       ├── page.tsx          # Property detail page
│   │       └── book/
│   │           └── page.tsx      # Booking page (protected)
│   ├── login/                    # Login page
│   ├── signup/                   # Signup page
|   ├── favicon.ico               # Site's favicon
|   ├── global.css                # Global css file
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── not-found.tsx             # Custom 404 page
│   └── NotFound.scss             # Scss file for not-found page
├── components/                   # Reusable as well as destructured components
│   ├── Alert/                    # Toast notification component
│   ├── Button/                   # Custom resuable button
│   ├── Footer/                   # Site's Footer component
│   ├── Home/                     # Contains all the components for home page
│   ├── LikeButton/               # Custom reusable Like Button
│   ├── Navbar/                   # Navigation bar
│   ├── PropertyDetails/          # Contains components used in property details page
│   └── UserForm/                 # Contains custom input field for user forms
├── data/                         # Data storage
│   ├── db.ts                     # JSON file read/write utilities
│   └── users.json                # User data (demo)
├── lib/                          # Utility functions
│   ├── authentication.ts         # JWT token generation/verification
│   ├── password.ts               # Password hashing/comparison
│   └── validator.ts              # Zod validators for login and signup inputs
├── store/                        # Zustand state management
│   ├── userStore.ts              # User state
│   └── alertStore.ts             # Alert state
├── middleware.ts                 # Route protection middleware
├── .env                          # Environment variables (create this)
├── next.config.js                # Next.js configuration
├── package.json                  # Package JSON file
├── README.md                     # Project's descriptions
└── tsconfig.json                 # TypeScript configuration
```

## 📡 API Documentation

### Authentication Endpoints

#### Sigup/Create New User

**Endpoint:** `POST /api/auth/signup`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password@123"
}
```

**Success Response (201):**

```json
{
  "message": "Sign-up success.",
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "image": "/user-images/1.jpg",
    "email": "john@example.com",
    "created_at": "2025-12-17T10:30:00Z",
    "is_super_host": false
  },
  "token": "jwt-signed-token"
}
```

**Error Responses:**

| Status | Response                                                        |
| ------ | --------------------------------------------------------------- |
| 400    | `{ "message": "Email is required." }`                           |
| 400    | `{ "message": "Password must be at least 8 characters long." }` |
| 400    | `{ "message": "User with this email already exists." }`         |

---

#### Login User

**Endpoint:** `POST /api/auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "Password@123"
}
```

**Success Response (200):**

```json
{
  "message": "Sign-in success.",
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "image": "/user-images/1.jpg",
    "email": "john@example.com",
    "created_at": "2025-12-17T10:30:00Z",
    "is_super_host": false
  },
  "token": "jwt-signed-token"
}
```

**Notes:**

- JWT token is automatically set as HTTP-only cookie
- Cookie name: `token`
- Cookie expires: 2 days

**Error Responses:**

| Status | Response                                                        |
| ------ | --------------------------------------------------------------- |
| 400    | `{ "message": "Email is required." }`                           |
| 400    | `{ "message": "Password is required." }`                        |
| 400    | `{ "message": "Password must be at least 8 characters long." }` |
| 404    | `{ "message": "User with this email not found." }`              |
| 400    | `{ "message": "Password is incorrect." }`                       |

---

### Property Endpoints (Example)

#### Get All Properties

**Endpoint:** `GET /api/properties`

**Query Parameters:**

| Parameter | Type   | Description                         | Example         |
| --------- | ------ | ----------------------------------- | --------------- | --------------------------- |
| search    | string | Search by property name or location | `?search=beach` | (NOTE: Not emplemented yet) |
| page      | number | current page number                 | `?page=1`       |
| limit     | number | limit of items per page             | `?limit=16`     |

**Success Response (200):**

```json
{
  "message": "Properties fetched.",
  "properties": [
    {
      "id": "1",
      "name": "Cozy Beach House",
      "image": "/host-images/1.jpg",
      "location_tag": "Malibu, CA",
      "rate": 150,
      "is_super_host": true,
      "ratings": 4.9
    }
  ],
  "totalPages": 3,
  "page": 1,
  "limit": 16
}
```

---

#### Get Property by ID

**Endpoint:** `GET /api/properties/:id`

**Path Parameters:**

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| id        | string | Property ID |

**Success Response (200):**

```json
{
  "message": "Property data fetched.",
  "property": {
    "id": "1",
    "name": "Brightwoods Cabins",
    "image": "/host-images/1.jpg",
    "gallery": [
      "/host-images/1.jpg",
      "/host-images/1-2.jpg",
      "/host-images/1-3.jpg",
      "/host-images/1-4.jpg",
      "/host-images/1-5.jpg"
    ],
    "location_tag": "Bridlepath, Ontario, Canada",
    "latitude": 43.7359,
    "longitude": -79.3719,
    "rate": 658,
    "host_id": "b06c50e0-621d-426a-8d72-38ca14b2f443",
    "amenities": [
      "Lakeside",
      "WiFi",
      "Hot water",
      "Freezer",
      "Kitchen",
      "Free parking"
    ],
    "ratings": 4.9,
    "total_reviews": 200,
    "booking": {
      "best_time_to_book": true,
      "dedicated_work_space": true,
      "self_check_in": true,
      "free_cancellation": true
    },
    "surroundings": {
      "weather": {
        "status": "sun-cloud",
        "temperature": "20°C",
        "condition": "Broken clouds"
      },
      "map_location": "The Bridle Path"
    },
    "short_description": "Welcome to our cozy cabin retreat nestled in the heart of Bridlepath, Ontario! Surrounded by lush landscapes and tranquil trails, this charming getaway offers the perfect blend of rustic elegance and modern comfort.",
    "descriptions": [
      {
        "text": "Welcome to Brightwoods Cabin, your idyllic retreat nestled in the heart of Bridlepath, Ontario! Our cozy cabin, surrounded by the tranquility of nature's embrace, is designed to provide the ultimate relaxing getaway."
      },
      {
        "title": "Living Space",
        "text": "This charming cabin boasts a spacious living area adorned with rustic decor and modern amenities. Enjoy the warmth of the wood-burning fireplace, relax on the plush sofas, and make yourself at home with our entertainment center featuring a flat-screen TV, WiFi, and more."
      }
    ]
  },
  "similarStays": [
    {
      "id": "1",
      "name": "Cozy Beach House",
      "image": "/host-images/1.jpg",
      "location_tag": "Malibu, CA",
      "rate": 150,
      "is_super_host": true,
      "ratings": 4.9
    }
  ]
}
```

**Error Response (404):**

```json
{
  "message": "Property not found."
}
```
