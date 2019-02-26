exports.controller = (req, res, provider, user, err) => {
  const io = req.app.get('io') 
  io.in(req.session.socketId).emit(provider, {err: err ? err.message : null, user: user})
  res.end()
}
