const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'API Biblioteca',
    description: 'API para gerenciar Novels e Mangás.',
  },
  host: 'localhost:3000',
  schemes: ['http'],
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./app.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app')
})