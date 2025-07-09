# Phonebook Backend - Full Stack Open Part 3


## Technical Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Render
- **Code Quality**: ESLint
- **Environment Management**: dotenv
- **Request Logging**: Morgan
- **Development**: Nodemon for hot reloading

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/persons` | Get all contacts |
| GET | `/api/persons/:id` | Get a specific contact |
| POST | `/api/persons` | Add a new contact |
| PUT | `/api/persons/:id` | Update an existing contact |
| DELETE | `/api/persons/:id` | Delete a contact |
| GET | `/info` | Get phonebook statistics |
| GET | `/health` | Health check for monitoring |

## Getting Started

### Prerequisites
- Node.js (I used v18+)
- MongoDB Atlas account (free tier works great)
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd phonebook-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/phonebook?retryWrites=true&w=majority
   PORT=3001
   NODE_ENV=development
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3001`

## Validation Rules

I implemented proper validation based on the course requirements:
- **Name**: Required, minimum 3 characters
- **Phone Number**: Required, minimum 8 characters, must follow format XX-XXXXXXX or XXX-XXXXXXX

## Project Structure

```
├── index.js              # Main server file
├── models/
│   └── person.js         # Mongoose person schema
├── utils/
│   ├── config.js         # Environment configuration
│   ├── db.js            # Database connection
│   ├── middleware.js    # Custom middleware functions
│   └── validators.js    # Input validation helpers
├── dist/                # Frontend build files
├── .env.example         # Environment variables template
├── render.yaml          # Render deployment config
└── package.json         # Dependencies and scripts
```

## Live Demo

The application is deployed and running at: **[https://phonebook-backend-o8y7.onrender.com](https://phonebook-backend-o8y7.onrender.com)**

You can test the API endpoints using the base URL above. The frontend is also served from the same URL.

