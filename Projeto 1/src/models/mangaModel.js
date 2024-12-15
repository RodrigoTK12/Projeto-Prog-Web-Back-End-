const fs = require('fs/promises')
const path = require('path')
const MANGAS_FILE = path.join(__dirname, '../../data/mangas.json')

//Função para ler os dados do arquivo de mangas
const readMangas = async () => {
  try {
    const data = await fs.readFile(MANGAS_FILE, 'utf8')
    return JSON.parse(data || '[]')
  } catch (error) {
    //Se o arquivo não existir, cria um arquivo vazio
    if (error.code === 'ENOENT') {
      await fs.writeFile(MANGAS_FILE, '[]')
      return []
    }
    throw error
  }
}

//Função para salvar os dados no arquivo de mangas
const writeMangas = async (mangas) => {
  await fs.writeFile(MANGAS_FILE, JSON.stringify(mangas, null, 2))
}

module.exports = { readMangas, writeMangas }