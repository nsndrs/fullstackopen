# Phonebook Backend

Express.js backend for the Full Stack Open phonebook application.

## Features

- REST API for managing phonebook entries
- CRUD operations (Create, Read, Update, Delete)
- CORS enabled for frontend integration
- Request logging with Morgan
- Error handling and validation

## API Endpoints

- `GET /persons` - Get all persons
- `GET /persons/:id` - Get a specific person
- `POST /persons` - Create a new person
- `PUT /persons/:id` - Update a person
- `DELETE /persons/:id` - Delete a person
- `GET /info` - Get phonebook info

## Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Start the production server:
   ```bash
   npm start
   ```

The server will run on port 3001 by default.

## Deployment

### Deploy to Render

1. Create a new account at [render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Configure the build and start commands

### Live Application

🌐 **Live API**: https://phonebook-backend-o8y7.onrender.com

## License

ISC 