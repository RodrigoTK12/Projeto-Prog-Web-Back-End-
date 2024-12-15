const fs = require('fs/promises')
const path = require('path')
const NOVELS_FILE = path.join(__dirname, '../../data/novels.json')

//Função para ler os dados do arquivo de novels
const readNovels = async () => {
  try {
    const data = await fs.readFile(NOVELS_FILE, 'utf8')
    return JSON.parse(data || '[]')
  } catch (error) {
    //Se o arquivo não existir, cria um arquivo vazio
    if (error.code === 'ENOENT') {
      await fs.writeFile(NOVELS_FILE, '[]')
      return []
    }
    throw error
  }
}

//Função para salvar os dados no arquivo de novels
const writeNovels = async (novels) => {
  await fs.writeFile(NOVELS_FILE, JSON.stringify(novels, null, 2))
}

module.exports = { readNovels, writeNovels }