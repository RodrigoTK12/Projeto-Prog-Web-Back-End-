const express = require('express')
const { getAllNovels, createNovel } = require('../controllers/novelController')
const { verifyToken } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', getAllNovels)
router.post('/', verifyToken, createNovel)
router.delete('/:id', verifyToken, deleteNovel)

module.exports = router