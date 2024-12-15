//Importação de bibliotecas e configurações
const express = require('express')
const dotenv = require('dotenv')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

//Importação das rotas
const mangaRoutes = require('./src/routes/mangaRoutes')
const novelRoutes = require('./src/routes/novelRoutes')
const userRoutes = require('./src/routes/userRoutes')
const installRoutes = require('./src/routes/installRoutes')
const authorRoutes = require('./src/routes/authorRoutes')

dotenv.config() //Carrega as variáveis de ambiente

const app = express()
app.use(express.json()) //Middleware para processar JSON

//Rotas
app.use('/mangas', mangaRoutes)
app.use('/novels', novelRoutes)
app.use('/users', userRoutes)
app.use('/install', installRoutes)
app.use('/authors', authorRoutes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//Inicializa o servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
  console.log(`Documentação disponível em http://localhost:${PORT}/docs`)
})

module.exports = app