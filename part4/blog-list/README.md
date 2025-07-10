# Blog List Backend - Full Stack Open Part 4

A REST API for managing a blog list where users can store and manage blog posts with information about title, author, URL, and likes.

## Technical Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Testing**: Jest with Supertest
- **Code Quality**: ESLint
- **Environment Management**: dotenv
- **Request Logging**: Morgan
- **Development**: Nodemon for hot reloading

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blogs` | Get all blog posts |
| GET | `/api/blogs/:id` | Get a specific blog post |
| POST | `/api/blogs` | Add a new blog post |
| PUT | `/api/blogs/:id` | Update an existing blog post |
| DELETE | `/api/blogs/:id` | Delete a blog post |
| GET | `/info` | Get blog list statistics |
| GET | `/health` | Health check for monitoring |

## Blog Data Structure

Each blog post contains:
- **title** (string, required): The title of the blog post
- **author** (string, optional): The author of the blog post (defaults to "Anonymous")
- **url** (string, required): The URL of the blog post
- **likes** (number, optional): Number of likes (defaults to 0)

### Example Blog Object

```json
{
  "id": "64f5b2c8e1234567890abcde",
  "title": "React patterns",
  "author": "Michael Chan",
  "url": "https://reactpatterns.com/",
  "likes": 7
}
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (free tier works great)
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-list
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
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bloglist?retryWrites=true&w=majority
   PORT=3003
   NODE_ENV=development
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3003`

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Validation Rules

The API implements validation for blog data:
- **Title**: Required, minimum 1 character
- **URL**: Required, minimum 1 character
- **Author**: Optional string (defaults to "Anonymous")
- **Likes**: Optional number, minimum 0 (defaults to 0)

## Project Structure

```
├── index.js              # Main server file
├── models/
│   └── blog.js           # Mongoose blog schema
├── utils/
│   ├── config.js         # Environment configuration
│   ├── db.js            # Database connection
│   ├── middleware.js    # Custom middleware functions
│   └── validators.js    # Input validation helpers
├── .env.example         # Environment variables template
├── eslint.config.js     # ESLint configuration
└── package.json         # Dependencies and scripts
```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm test` - Run the test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint and fix issues automatically

## Development Notes

This project follows the same architectural patterns as the Part 3 phonebook backend:
- Modular utility functions for configuration, database, middleware, and validation
- Proper error handling with custom middleware
- Request logging with Morgan
- ESLint for code quality
- Environment-based configuration

The API is designed to handle blog post management operations and provides a solid foundation for building a full-stack blog application. 