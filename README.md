# Brainly - Your Personal Second Brain

**Brainly** is a powerful personal knowledge management system designed to help you organize your digital life. Save, categorize, and revisit your most important web content, including YouTube videos and PDF documents, all in one sleek, modern interface.

---

## Features

- **Lightning Fast**: Built with Vite and React 19 for a smooth, responsive experience.
- **YouTube Integration**: Embed and watch your favorite educational or inspirational videos directly in your dashboard.
- **PDF Management**: Upload and view PDF documents with a built-in previewer.
- **Secure Authentication**: JWT-based authentication ensuring your data stays private.
- **Cloud Storage**: Seamless integration with Cloudinary for robust file management.
- **Modern UI**: A clean, glassmorphic design built with Tailwind CSS v4 and Framer Motion animations.
- **Shareable Content**: Share your "Second Brain" collections with others via unique links.

---

## Tech Stack

### Frontend
- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icon Library
- **Axios** - API Client

### Backend
- **Node.js & Express** - Server Framework
- **TypeScript** - Language
- **MongoDB & Mongoose** - Database & ODM
- **Cloudinary** - File Hosting
- **Zod** - Schema Validation
- **JSON Web Token (JWT)** - Authentication

---

## Project Structure

```text
├── brainly/               # Backend Server (Node/Express/TS)
│   ├── src/               # Backend Source Code
│   │   ├── middleware/    # Auth & File Upload Middlewares
│   │   ├── models/        # Mongoose Models
│   │   └── utils/         # Helper functions
│   └── tsconfig.json      # Backend TS Config
│
├── Brainly-main-fe/       # Frontend Application (Vite/React/TS)
│   └── vite-project/      # Main UI Workspace
│       ├── src/           # Frontend Source Code
│       │   ├── components/# Reusable UI Components
│       │   ├── Icons/     # Custom SVG Icons
│       │   └── hooks/     # Custom React Hooks
│       └── public/        # Static Assets
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- [Cloudinary Account](https://cloudinary.com/) (For PDF uploads)

### Setup Backend

1. Navigate to the backend directory:
   ```bash
   cd brainly
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your credentials:
   ```env
   MONGO_URL=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Setup Frontend

1. Navigate to the frontend directory:
   ```bash
   cd Brainly-main-fe/vite-project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Create a `.env` file:
   ```env
   VITE_BACKEND_URL=http://localhost:3000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---
