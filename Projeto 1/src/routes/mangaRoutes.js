const express = require('express')
const { getAllMangas, createManga, deleteManga } = require('../controllers/mangaController')
const { verifyToken } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', getAllMangas)
router.post('/', verifyToken, createManga)
router.delete('/:id', verifyToken, deleteManga)

module.exports = router