const { readMangas, writeMangas } = require('../models/mangaModel')
const { readAuthors } = require('../models/authorModel')

//Lista todos os mangas com paginação
const getAllMangas = async (req, res) => {
  const { limit = 5, page = 1 } = req.query
  const parsedLimit = parseInt(limit)
  const parsedPage = parseInt(page)

  //Valida os parâmetros de paginação
  if (![5, 10, 30].includes(parsedLimit) || parsedPage < 1) {
    return res.status(400).json({ error: 'Parâmetros inválidos para paginação.' })
  }

  const mangas = await readMangas()
  const startIndex = (parsedPage - 1) * parsedLimit
  const paginatedMangas = mangas.slice(startIndex, startIndex + parsedLimit)

  res.json({ mangas: paginatedMangas, total: mangas.length })
}

// Cria um novo manga
const createManga = async (req, res) => {
  const { title, authorId } = req.body

  // Valida os campos obrigatórios
  if (!title || !authorId) {
    return res.status(400).json({ error: 'Título e autor são obrigatórios.' })
  }

  // Valida se o autor existe
  const authors = await readAuthors()
  const authorExists = authors.find((author) => author.id === parseInt(authorId))
  if (!authorExists) {
    return res.status(404).json({ error: 'Autor não encontrado.' })
  }

  const mangas = await readMangas()
  const newManga = { id: Date.now(), title, authorId: parseInt(authorId) }
  mangas.push(newManga)
  await writeMangas(mangas)

  res.status(201).json({ message: 'Mangá criado com sucesso.', manga: newManga })
}

//Deleta um manga pelo ID
const deleteManga = async (req, res) => {
  const { id } = req.params

  const mangas = await readMangas()
  const updatedMangas = mangas.filter((m) => m.id !== parseInt(id))

  if (mangas.length === updatedMangas.length) {
    return res.status(404).json({ error: 'Mangá não encontrado.' })
  }

  await writeMangas(updatedMangas)
  res.json({ message: 'Mangá deletado com sucesso.' })
}

module.exports = { getAllMangas, createManga, deleteManga }