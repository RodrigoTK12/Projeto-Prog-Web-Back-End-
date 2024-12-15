const jwt = require('jsonwebtoken')

//Middleware para verificar o token de autenticação
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]

  //Verifica se o token foi fornecido
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido.' })
  }

  try {
    //Decodifica e verifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded //Adiciona os dados do usuário à requisição
    next() //Continua para o próximo middleware ou rota
  } catch {
    res.status(401).json({ error: 'Token inválido ou expirado.' })
  }
}

module.exports = { verifyToken }