const { readAuthors, writeAuthors } = require('../models/authorModel')

//Lista todos os autores
const getAllAuthors = async (req, res) => {
  const { limit = 5, page = 1 } = req.query
  const parsedLimit = parseInt(limit)
  const parsedPage = parseInt(page)

  //Valida os parâmetros de paginação
  if (![5, 10, 30].includes(parsedLimit) || parsedPage < 1) {
    return res.status(400).json({ error: 'Parâmetros inválidos para paginação.' })
  }

  const authors = await readAuthors()
  const startIndex = (parsedPage - 1) * parsedLimit
  const paginatedAuthors = authors.slice(startIndex, startIndex + parsedLimit)

  res.json({ authors: paginatedAuthors, total: authors.length })
}

//Cria um novo autor
const createAuthor = async (req, res) => {
  const { name } = req.body

  //Valida o nome do autor
  if (!name) {
    return res.status(400).json({ error: 'Nome do autor é obrigatório.' })
  }

  const authors = await readAuthors()
  const newAuthor = { id: Date.now(), name }
  authors.push(newAuthor)
  await writeAuthors(authors)

  res.status(201).json({ message: 'Autor criado com sucesso.', author: newAuthor })
}

//Deleta um autor pelo ID
const deleteAuthor = async (req, res) => {
  const { id } = req.params

  const authors = await readAuthors()
  const updatedAuthors = authors.filter((a) => a.id !== parseInt(id))

  if (authors.length === updatedAuthors.length) {
    return res.status(404).json({ error: 'Autor não encontrado.' })
  }

  await writeAuthors(updatedAuthors)
  res.json({ message: 'Autor deletado com sucesso.' })
}

module.exports = { getAllAuthors, createAuthor, deleteAuthor }