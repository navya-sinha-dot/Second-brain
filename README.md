# Second Brain — Curated Link Collections

A full-stack web application that lets users create, organize, and share curated link collections called Brains.  
These Brains are collaborative, shareable, and help users build a personal knowledge hub which is your own Second Brain.

---

## Features

- Create and manage curated link collections (Brains)
- Add, edit, and delete links with descriptions
- Share Brains with other users
- Upload images using Cloudinary
- Secure authentication using JWT
- Responsive UI built with TailwindCSS
- Fast development workflow using Vite

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- TailwindCSS

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB (Atlas)
- Cloudinary
- JWT Authentication

---

## Project Structure

### Frontend Structure
Brainly-main-fe/
└── vite-project/
├── public/
└── src/
├── components/
├── pages/
├── context/
├── utils/
├── assets/
└── App.tsx

### Backend Structure

brainly/
└── src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── config/
├── utils/
└── index.ts


---

## Backend Environment Variables

Create a `.env` file inside the `brainly/` directory:
MONGO_URL="your_mongo_connection_string"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
JWT_SECRET="your_jwt_secret_key"
PORT=5000


---

## Running the Project Locally

### 1. Clone the Repository
git clone https://github.com/navya-sinha-dot/Second-brain.git
cd Second-brain


---

## Backend Setup

cd brainly
npm install
npm run dev


Backend runs at:
http://localhost:5000


---

## Frontend Setup


cd Brainly-main-fe/vite-project
npm install
npm run dev


Frontend runs at:

http://localhost:5173

---

## Screenshots

Add your screenshots inside a `/screenshots` folder:

/screenshots
├── home.png
├── brain-view.png
└── create-brain.png

---
