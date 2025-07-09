# Phonebook Backend

Backend API for the Full Stack Open Phonebook application, deployed on Render.

## Live Demo
🌐 **Deployed Application**: https://phonebook-backend-o8y7.onrender.com

## Features

- RESTful API for managing phonebook entries
- MongoDB Atlas database integration
- Input validation and error handling
- CORS enabled for frontend integration
- Request logging with Morgan
- ESLint code quality enforcement

## API Endpoints

- `GET /api/persons` - Get all persons
- `GET /api/persons/:id` - Get a specific person
- `POST /api/persons` - Add a new person
- `PUT /api/persons/:id` - Update a person
- `DELETE /api/persons/:id` - Delete a person
- `GET /info` - Get info about the phonebook

## Local Development

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas account
- Git

### Setup

1. Clone the repository
```bash
git clone <repository-url>
cd phonebook-backend
```

2. Install dependencies
```bash
npm install
```

3. Create environment variables
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/phonebook?retryWrites=true&w=majority
PORT=3001
NODE_ENV=development
```

5. Start the development server
```bash
npm run dev
```

The server will start on http://localhost:3001

## Deployment on Render

### Environment Variables in Render Dashboard
Set these environment variables in your Render service:

- `MONGODB_URI`: Your MongoDB Atlas connection string
- `NODE_ENV`: `production`
- `PORT`: (Auto-set by Render)

### Build & Deploy Settings
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Node Version**: 18+ (Latest LTS recommended)

## Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run build:ui` - Build and copy frontend assets

## Project Structure

```
├── index.js              # Main server file
├── models/
│   └── person.js         # Mongoose person model
├── utils/
│   ├── config.js         # Environment configuration
│   ├── db.js            # Database connection
│   ├── middleware.js    # Express middleware
│   └── validators.js    # Input validation utilities
├── .env.example         # Environment variables template
├── render.yaml          # Render deployment configuration
└── Procfile            # Process file for deployments
```

## Technologies Used

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Render
- **Code Quality**: ESLint
- **Logging**: Morgan
- **Environment**: dotenv 