const role = (admin) => {
  return (req, res, next) => {
    const farmerId = parseInt(req.params.id || req.body.farmerId, 10)

    if (admin && req.user.role !== 'admin') {
      return res.status(403).send({ error: 'Acesso restrito a administradores.' })
    }

    if (req.user.role === 'admin' || req.user.farmerId === farmerId) {
      return next()
    }

    return res.status(403).send({ error: 'Você não tem permissão para esta ação.' })
  }
}

export default role
