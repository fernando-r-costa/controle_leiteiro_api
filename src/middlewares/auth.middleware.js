import jwt from 'jsonwebtoken'

const authorizeMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).send({ error: 'Acesso negado.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(400).send({ error: 'Token inválido.' })
  }
}

export default authorizeMiddleware
