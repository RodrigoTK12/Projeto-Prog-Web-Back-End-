const express = require('express')
const { getAllAuthors, createAuthor, deleteAuthor } = require('../controllers/authorController')
const { verifyToken } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', getAllAuthors) 
router.post('/', verifyToken, createAuthor)
router.delete('/:id', verifyToken, deleteAuthor)

module.exports = router