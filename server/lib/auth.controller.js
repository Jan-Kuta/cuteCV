exports.controller = (req, res) => {
  const io = req.app.get('io') 
  const user = req.user
  io.in(req.session.socketId).emit(user.provider, user)
  res.end()
}
