const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'API Biblioteca',
    description: 'API para gerenciar Mangás, Novels e Autores.',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  definitions: {
    Manga: {
      id: 1,
      title: 'Naruto',
      authorId: 123,
    },
    Novel: {
      id: 1,
      title: 'The Great Gatsby',
      authorId: 456,
    },
    Author: {
      id: 123,
      name: 'Masashi Kishimoto',
    },
    User: {
      id: 1,
      username: 'admin',
      password: 'hashed_password',
      isAdmin: true,
    },
    LoginRequest: {
      username: 'admin',
      password: 'password123',
    },
    TokenResponse: {
      token: 'eyJhbGc...rest_of_token',
    },
  },
}

const outputFile = './swagger_output.json'
const endpointsFiles = [
  './src/routes/mangaRoutes.js', 
  './src/routes/novelRoutes.js', 
  './src/routes/authorRoutes.js', 
  './src/routes/userRoutes.js', 
  './src/routes/installRoutes.js',
]

swaggerAutogen(outputFile, endpointsFiles, doc)