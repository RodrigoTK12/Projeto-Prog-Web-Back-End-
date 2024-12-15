const express = require('express')
const { readUsers, writeUsers } = require('../models/userModel')
const crypto = require('crypto')

const router = express.Router()

const createHash = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex')
}

router.get('/', async (req, res) => {
  try {
    const users = await readUsers()
    const adminExists = users.some((user) => user.role === 'admin')

    if (adminExists) {
      return res.status(400).json({ error: 'Usuário administrador já existe.' })
    }

    const hashedPassword = createHash('admin123')
    const adminUser = {
      id: Date.now(),
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
    }

    users.push(adminUser)
    await writeUsers(users)

    res.status(201).json({
      message: 'Usuário administrador criado com sucesso.',
      user: { username: adminUser.username, role: adminUser.role },
    })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao instalar o sistema.' })
  }
})

module.exports = router