exports.controller = (req, res, provider) => {
  const io = req.app.get('io') 
  console.log('REQ', req)
  io.in(req.session.socketId).emit(provider, {err: err ? err.message : null, user: req.user})
  res.end()
}
