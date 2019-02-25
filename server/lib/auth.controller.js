exports.controller = (req, res, provider) => {
  console.log(res)
  const io = req.app.get('io') 
  const user = req.user
  io.in(req.session.socketId).emit(provider, user)
  res.end()
}
