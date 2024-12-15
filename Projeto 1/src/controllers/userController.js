const { readUsers, writeUsers } = require('../models/userModel')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

//Função para criar o hash de uma senha
//Usa SHA-256 para gerar um hash único e seguro
const createHash = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex')
}

//Função para registrar um novo usuário
const registerUser = async (req, res) => {
  const { username, password, isAdmin } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' })
  }

  //Lê os usuários existentes
  const users = await readUsers()

  //Verifica se o nome de usuário já existe
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ error: 'Usuário já existe.' })
  }

  //Cria o hash da senha para armazenar de forma segura
  const hashedPassword = createHash(password)

  //Cria o novo usuário e adiciona à lista
  users.push({ id: Date.now(), username, password: hashedPassword, isAdmin: !!isAdmin })

  //Salva os usuários atualizados no arquivo
  await writeUsers(users)

  res.status(201).json({ message: 'Usuário registrado com sucesso.' })
}

//Função para login de um usuário
const loginUser = async (req, res) => {
  const { username, password } = req.body
  const users = await readUsers()

  //Busca o usuário pelo nome
  const user = users.find((u) => u.username === username)

  //Verifica se o usuário existe e se a senha está correta
  if (!user || user.password !== createHash(password)) {
    return res.status(401).json({ error: 'Credenciais inválidas.' })
  }

  //Gera um token JWT com os dados do usuário
  const token = jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRATION } //Define a validade do token
  )

  //Retorna o token ao cliente
  res.json({ token })
}

module.exports = { registerUser, loginUser }