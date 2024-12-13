const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const novelRoutes = require('./src/routes/novelRoutes')
const userRoutes = require('./src/routes/userRoutes')
const mangaRoutes = require('./src/routes/mangaRoutes')
const installRoutes = require('./src/routes/installRoutes')

dotenv.config()

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/novels', novelRoutes)
app.use('/users', userRoutes)
app.use('/mangas', mangaRoutes)
app.use('/install', installRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando em localhost:${PORT}`)
  })

module.exports = app