const fs = require('fs/promises')
const path = require('path')
const USERS_FILE = path.join(__dirname, '../../data/users.json')

//Função para ler os dados do arquivo de usuários
const readUsers = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8')
    return JSON.parse(data || '[]')
  } catch (error) {
    //Se o arquivo não existir, cria um arquivo vazio
    if (error.code === 'ENOENT') {
      await fs.writeFile(USERS_FILE, '[]')
      return []
    }
    throw error
  }
}

//Função para salvar os dados no arquivo de usuários
const writeUsers = async (users) => {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2))
}

module.exports = { readUsers, writeUsers }