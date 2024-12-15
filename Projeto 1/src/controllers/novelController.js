const { readNovels, writeNovels } = require('../models/novelModel')
const { readAuthors } = require('../models/authorModel')

//Lista todos as novels com paginação
const getAllNovels = async (req, res) => {
  const { limit = 5, page = 1 } = req.query
  const parsedLimit = parseInt(limit)
  const parsedPage = parseInt(page)

  //Valida os parâmetros de paginação
  if (![5, 10, 30].includes(parsedLimit) || parsedPage < 1) {
    return res.status(400).json({ error: 'Parâmetros inválidos para paginação.' })
  }

  const Novels = await readNovels()
  const startIndex = (parsedPage - 1) * parsedLimit
  const paginatedNovels = Novels.slice(startIndex, startIndex + parsedLimit)

  res.json({ Novels: paginatedNovels, total: Novels.length })
}

//Cria uma nova novel
const createNovel = async (req, res) => {
  const { title, authorId } = req.body

  //Valida os campos obrigatórios
  if (!title || !authorId) {
    return res.status(400).json({ error: 'Título e autor são obrigatórios.' })
  }

  //Valida se o autor existe
  const authors = await readAuthors()
  const authorExists = authors.find((author) => author.id === parseInt(authorId))
  if (!authorExists) {
    return res.status(404).json({ error: 'Autor não encontrado.' })
  }

  const novels = await readNovels()
  const newNovel = { id: Date.now(), title, authorId: parseInt(authorId) }
  novels.push(newNovel)
  await writeNovels(novels)

  res.status(201).json({ message: 'Novel criada com sucesso.', novel: newNovel })
}

//Deleta uma novel pelo ID
const deleteNovel = async (req, res) => {
  const { id } = req.params

  const Novels = await readNovels()
  const updatedNovels = Novels.filter((m) => m.id !== parseInt(id))

  if (Novels.length === updatedNovels.length) {
    return res.status(404).json({ error: 'Novel não encontrada.' })
  }

  await writeNovels(updatedNovels)
  res.json({ message: 'Novel deletada com sucesso.' })
}

module.exports = { getAllNovels, createNovel, deleteNovel }