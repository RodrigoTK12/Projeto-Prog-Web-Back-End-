const fs = require('fs/promises')
const path = require('path')
const AUTHORS_FILE = path.join(__dirname, '../../data/authors.json')

//Função para ler os dados do arquivo de autores
const readAuthors = async () => {
  try {
    const data = await fs.readFile(AUTHORS_FILE, 'utf8')
    return JSON.parse(data || '[]')
  } catch (error) {
    //Se o arquivo não existir, cria um arquivo vazio
    if (error.code === 'ENOENT') {
      await fs.writeFile(AUTHORS_FILE, '[]')
      return []
    }
    throw error
  }
}

//Função para salvar os dados no arquivo de autores
const writeAuthors = async (authors) => {
  await fs.writeFile(AUTHORS_FILE, JSON.stringify(authors, null, 2))
}

module.exports = { readAuthors, writeAuthors }